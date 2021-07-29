package com.ikenley.templatejavaapp.status;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;

@RestController
public class StatusController {

    @Value("${test.property}")
    private String testValue;

    @GetMapping("/status")
    public String status() {
        return "{\"status\": \"ok\"}";
    }

    @GetMapping("/property")
    public String property() {
        return this.testValue;
    }

}
