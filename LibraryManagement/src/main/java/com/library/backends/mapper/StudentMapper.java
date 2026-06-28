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
        dto.setActive(student.isActive());
        return dto;
    }

    public static Student mapToStudent(StudentDto studentDto) {
        Student student = new Student();
<<<<<<< HEAD
        student.setFirstName(studentDto.getFirstName());
        student.setLastName(studentDto.getLastName());
        student.setEmail(studentDto.getEmail());
=======
        student.setId(studentDto.getId());
        student.setFirstName(studentDto.getFirstName());
        student.setLastName(studentDto.getLastName());
        student.setEmail(studentDto.getEmail());
        student.setCourse(studentDto.getCourse() == null ? "BCA" : studentDto.getCourse());
        student.setRollNumber(studentDto.getRollNumber());
        student.setActive(studentDto.isActive());
>>>>>>> a5db1ff (update both frontned and backend)
        return student;
    }
}