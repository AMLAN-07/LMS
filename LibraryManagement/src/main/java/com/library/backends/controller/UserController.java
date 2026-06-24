package com.library.backends.controller;

import com.library.backends.entity.User;
import com.library.backends.request.LoginRequest;
import com.library.backends.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/api/createUser")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/api/loginUser")
    public Boolean loginUser(@RequestBody LoginRequest loginRequest) {
    return userService.LoginUser(loginRequest);
    }
}
