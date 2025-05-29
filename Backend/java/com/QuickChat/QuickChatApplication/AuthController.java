package com.QuickChat.QuickChatApplication;

import com.QuickChat.QuickChatApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Signup Endpoint
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        System.out.println("Signup attempt for username: " + user.getUsername());

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            System.out.println("Username already exists!");
            return ResponseEntity.badRequest().body("Username already exists!");
        }

        // Hash password before saving
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        // Save user in database
        User savedUser = userRepository.save(user);
        System.out.println("User saved successfully with ID: " + savedUser.getId());

        return ResponseEntity.ok("User registered successfully!");
    }

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser.isPresent() && passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            // Login successful
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
    
   
}
