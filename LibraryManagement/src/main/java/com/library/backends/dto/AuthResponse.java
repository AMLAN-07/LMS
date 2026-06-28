package com.library.backends.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private boolean success;
    private String token;
    private String role;
    private String email;
    private String name;
    private String message;
}
