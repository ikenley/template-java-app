package com.ikenley.templatejavaapp.configuration.parameterstore;

import org.springframework.core.env.ConfigurableEnvironment;
import com.amazonaws.services.simplesystemsmanagement.AWSSimpleSystemsManagementClientBuilder;

public class ParameterStorePropertySourceBuilder {
    private static final String PROPERTY_SOURCE_NAME = "AwsSsmParameterStorePropertySource";

    public static ParameterStorePropertySource build(ConfigurableEnvironment env) {
        String paramPrefix = env.getProperty("parameterstore.param-prefix");
        paramPrefix = paramPrefix == null ? "/configuration/application" : paramPrefix;

        ParameterStorePropertySource ps = new ParameterStorePropertySource(PROPERTY_SOURCE_NAME,
                AWSSimpleSystemsManagementClientBuilder.defaultClient(), paramPrefix);
        return ps;
    }
}
