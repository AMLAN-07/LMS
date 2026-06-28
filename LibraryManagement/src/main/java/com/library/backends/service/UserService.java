package com.library.backends.service;

import com.library.backends.entity.User;
import com.library.backends.request.LoginRequest;
import org.springframework.stereotype.Service;


@Service
public interface UserService {



public User createUser(User user);

public  Boolean LoginUser( LoginRequest loginRequest);

public User authenticateUser(LoginRequest loginRequest);

}
