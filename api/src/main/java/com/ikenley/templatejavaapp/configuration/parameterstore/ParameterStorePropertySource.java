package com.ikenley.templatejavaapp.configuration.parameterstore;

import java.util.Map;
import java.util.HashMap;

import com.amazonaws.services.simplesystemsmanagement.AWSSimpleSystemsManagement;
import com.amazonaws.services.simplesystemsmanagement.model.GetParametersByPathRequest;
import com.amazonaws.services.simplesystemsmanagement.model.ParameterNotFoundException;
import com.amazonaws.services.simplesystemsmanagement.model.Parameter;
import org.springframework.core.env.PropertySource;

// Fetches AWS SSM Parameter Store parameters
// Loads all parameters matching a prefix
// Converts from /AWS/param/store key format into idiomatic.spring.format
// Based on https://spring.io/blog/2020/04/23/spring-tips-configuration

public class ParameterStorePropertySource extends PropertySource<AWSSimpleSystemsManagement> {
    private String paramPrefix;

    private Map<String, String> parameterMap;

    public ParameterStorePropertySource(String name, AWSSimpleSystemsManagement source, String paramPrefix) {
        super(name, source);
        this.paramPrefix = paramPrefix;
    }

    @Override
    public Object getProperty(String parameterName) {
        var map = getParameterMap();

        if (map.containsKey(parameterName)) {
            return map.get(parameterName);
        }

        return null;
    }

    private Map<String, String> getParameterMap() {
        try {
            if (this.parameterMap == null) {
                var request = new GetParametersByPathRequest().withPath(paramPrefix).withRecursive(true);
                var result = source.getParametersByPath(request);

                this.parameterMap = new HashMap<String, String>();
                var parameters = result.getParameters();
                for (Parameter param : parameters) {
                    String propertyName = convertKeyToPropertyName(param.getName());
                    String value = param.getValue();
                    this.parameterMap.put(propertyName, value);
                }
            }
            return this.parameterMap;
        } catch (ParameterNotFoundException exception) {
            return null;
        }
    }

    // Converts AWS Parameter key into Spring property name format
    // Example "/my-parameter-prefix/parent/child" => "parent.child"
    private String convertKeyToPropertyName(String key) {
        String keyWithoutPrefix = key.replaceFirst(this.paramPrefix, "");
        String keyWithoutLeadingSlash = keyWithoutPrefix.replaceFirst("/", "");
        String propertyName = keyWithoutLeadingSlash.replace("/", ".");
        return propertyName;
    }
}