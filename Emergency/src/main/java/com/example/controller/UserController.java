package com.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.repository.UserRepository;
import com.example.model.User;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React frontend
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ User Sign-Up (Register)
    @PostMapping("/signup")
    public ResponseEntity<String> signupUser(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password cannot be empty!");
        }

        // Check for existing user
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(409).body("User already exists with this email!");
        }

        // Save new user
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    // ✅ User Login (Authenticate)
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password cannot be empty!");
        }

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(401).body("User not found!");
        }

        if (!existingUser.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password!");
        }

        return ResponseEntity.ok("Login successful!");
    }

    // ✅ Get All Users (Optional for testing)
    @GetMapping
    public ResponseEntity<Iterable<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // ✅ Test Endpoint (Check Backend Connectivity)
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Emergency Backend is connected!");
    }
}
