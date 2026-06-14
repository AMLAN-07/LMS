package com.library.backends.service;

import com.library.backends.dto.StudentDto;

import java.util.List;


public interface StudentService {
    StudentDto createStudent(StudentDto studentDto);

    StudentDto getStudentById(Long id);

    List<StudentDto> getAllStudents();

    StudentDto updateStudent(Long id, StudentDto updatedStudent);

    void deleteStudent(Long id);
}
