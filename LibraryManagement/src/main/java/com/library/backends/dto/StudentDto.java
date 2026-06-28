package com.library.backends.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class StudentDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String course;
    private String rollNumber;
    private String organizationName;
    private boolean active;
}
