package com.ikenley.templatejavaapp.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;

@RestController
public class AuthorizationController {

    @Value("${test.property}")
    private String testValue;

    // Simple check of whether user is authenticated
    @GetMapping("/authorization")
    public String status() {
        return "valid";
    }

}
