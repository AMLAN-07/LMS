package com.library.backends.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="students")

public class Student {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name="first_name")
    @NotBlank(message = "First name is required")
    private String firstName;

    @Column(name="last_name")
    @NotBlank(message = "Last name is required")
    private String lastName;

    @Column(name="email_id",nullable = false,unique = true)
    @Email(message = "Enter a valid email")
    @NotBlank(message = "Email is required")
    private String email;

    @Column(nullable = false)
    private String course = "BCA";

    @Column(name = "roll_number", unique = true)
    private String rollNumber;

    @Column(nullable = false)
    private boolean active = true;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_email")
    private User user;
}
