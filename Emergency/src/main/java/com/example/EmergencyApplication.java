package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class EmergencyApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmergencyApplication.class, args);
    }
}

@RestController
@RequestMapping("/")
class HelloController {
    @GetMapping
    public String hello() {
        return "Hello from Emergency Project!";
    }
}
