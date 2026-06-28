package com.library.backends.controller;

import com.library.backends.dto.AuthResponse;
import com.library.backends.entity.User;
import com.library.backends.request.LoginRequest;
import com.library.backends.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class UserController {

    private static final String DEFAULT_ORGANIZATION = "Centurion university technology and management";

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public AuthResponse loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.authenticateUser(loginRequest);
        if (user == null) {
            return new AuthResponse(false, null, null, null, null, null, "Invalid email or password");
        }
        String tokenText = loginRequest.getEmail() + ":library-token";
        String token = Base64.getEncoder().encodeToString(tokenText.getBytes(StandardCharsets.UTF_8));
        String role = user.getRole() == null || user.getRole().isBlank() ? "STUDENT" : user.getRole().toUpperCase();
        String organizationName = user.getOrganizationName() == null || user.getOrganizationName().isBlank()
                ? DEFAULT_ORGANIZATION
                : user.getOrganizationName();
        return new AuthResponse(true, token, role, user.getEmail(), user.getName(), organizationName, "Login successful");
    }
}
