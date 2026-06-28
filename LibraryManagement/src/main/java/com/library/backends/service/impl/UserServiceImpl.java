package com.library.backends.service.impl;

import com.library.backends.entity.User;
import com.library.backends.repository.UserRepository;
import com.library.backends.request.LoginRequest;
import com.library.backends.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {

    private static final String DEFAULT_ORGANIZATION = "Centurion university technology and management";

    @Autowired
    UserRepository userRepository;

    @Override
    public User createUser(User user){
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("STUDENT");
        }
        if (user.getOrganizationName() == null || user.getOrganizationName().isBlank()) {
            user.setOrganizationName(DEFAULT_ORGANIZATION);
        }
        return userRepository.save(user);
    }
    @Override
    public  Boolean LoginUser( LoginRequest loginRequest){
        return authenticateUser(loginRequest) != null;
    }

    @Override
    public User authenticateUser(LoginRequest loginRequest) {
        Optional<User> user=userRepository.findById(loginRequest.getEmail());

        if(!user.isPresent()){
            return null;
        }
        User user1=user.get();
        if(!user1.getPassword().equals(loginRequest.getPassword())){
            return null;
        }
        if (!user1.isActive() || !user1.getEmail().equals(loginRequest.getEmail())) {
            return null;
        }
        return user1;
    }
}
