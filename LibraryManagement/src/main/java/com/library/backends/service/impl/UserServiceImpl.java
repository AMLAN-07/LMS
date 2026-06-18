package com.library.backends.service.impl;

import com.library.backends.entity.User;
import com.library.backends.repository.UserRepository;
import com.library.backends.request.LoginRequest;
import com.library.backends.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User createUser(User user){
        return userRepository.save(user);
    }
    @Override
    public  Boolean LoginUser( LoginRequest loginRequest){
        User user=userRepository.findById(loginRequest.getEmail()).get();

        if(user==null){
            return false;
        }
        if(!user.getPassword().equals(loginRequest.getPassword())){
            return false;
        }
        return true;
    }
}
