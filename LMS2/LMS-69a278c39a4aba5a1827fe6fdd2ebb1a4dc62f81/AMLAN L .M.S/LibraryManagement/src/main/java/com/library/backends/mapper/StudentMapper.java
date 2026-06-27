package com.library.backends.mapper;

import com.library.backends.dto.StudentDto;
import com.library.backends.entity.Student;

public class StudentMapper {

    public static StudentDto mapToStudentDto(Student student) {
        return new StudentDto(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getRegdNo(),
                student.getEmail()
        );
    }

    public static Student mapToStudent(StudentDto studentDto) {
        return new Student(
                studentDto.getId(),
                studentDto.getFirstName(),
                studentDto.getLastName(),
                studentDto.getRegdNo(),
                studentDto.getEmail()
        );
    }
}
