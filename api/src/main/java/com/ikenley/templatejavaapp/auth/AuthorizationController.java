package com.ikenley.templatejavaapp.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

@RestController
public class AuthorizationController {
    private static final Logger logger = LoggerFactory.getLogger(AuthorizationController.class);

    @Value("${test.property}")
    private String testValue;

    // Simple check of whether user is authenticated
    @GetMapping("/authorization")
    public String status(@AuthenticationPrincipal Jwt jwt) {
        // String holderName = jwt.getClaimAsString("name");
        // String email = jwt.getClaimAsString("email");
        String userId = jwt.getSubject();

        logger.info("/authorization jwt {} userId {}", jwt, userId);

        return "valid";
    }

}
