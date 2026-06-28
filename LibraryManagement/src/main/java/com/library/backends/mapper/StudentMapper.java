package com.library.backends.mapper;

import com.library.backends.dto.StudentDto;
import com.library.backends.entity.Student;

public class StudentMapper {

    public static StudentDto mapToStudentDto(Student student) {
        StudentDto dto = new StudentDto();
        dto.setId(student.getId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setCourse(student.getCourse());
        dto.setRollNumber(student.getRollNumber());
        dto.setOrganizationName(student.getOrganizationName());
        dto.setActive(student.isActive());
        return dto;
    }

    public static Student mapToStudent(StudentDto studentDto) {
        Student student = new Student();
        student.setId(studentDto.getId());
        student.setFirstName(studentDto.getFirstName());
        student.setLastName(studentDto.getLastName());
        student.setEmail(studentDto.getEmail());
        student.setCourse(studentDto.getCourse() == null ? "BCA" : studentDto.getCourse());
        student.setRollNumber(studentDto.getRollNumber());
        student.setOrganizationName(studentDto.getOrganizationName() == null || studentDto.getOrganizationName().isBlank()
                ? "Centurion university technology and management"
                : studentDto.getOrganizationName());
        student.setActive(studentDto.isActive());
        return student;
    }
}
