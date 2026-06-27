package com.library.backends.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentBookDto {
    private Long studentId;
    private String studentName;
    private String bookTitle;
    private String author;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private String status;
}