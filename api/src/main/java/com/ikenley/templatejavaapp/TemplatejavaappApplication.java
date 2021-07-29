package com.ikenley.templatejavaapp;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.core.env.PropertySource;
import org.springframework.core.env.StandardEnvironment;

import com.ikenley.templatejavaapp.configuration.parameterstore.ParameterStorePropertySourceBuilder;

@SpringBootApplication
public class TemplatejavaappApplication {

	public static void main(String[] args) {
		// SpringApplication.run(TemplatejavaappApplication.class, args);

		new SpringApplicationBuilder().sources(TemplatejavaappApplication.class)
				.initializers(context -> context.getEnvironment().getPropertySources()
						// Register AWS SSM Parameter PropertySource early in lifecyle
						// https://spring.io/blog/2020/04/23/spring-tips-configuration
						// SSM Parameters should override application.yml but NOT env vars
						.addAfter(StandardEnvironment.SYSTEM_ENVIRONMENT_PROPERTY_SOURCE_NAME,
								ParameterStorePropertySourceBuilder.build(context.getEnvironment())))
				.run(args);
	}

}

class BootifulPropertySource extends PropertySource<String> {

	BootifulPropertySource() {
		super("bootiful");
	}

	@Override
	public Object getProperty(String name) {

		if (name.equalsIgnoreCase("bootiful-message")) {
			return "Hello from " + BootifulPropertySource.class.getSimpleName() + "!";
		}

		return null;
	}
}
