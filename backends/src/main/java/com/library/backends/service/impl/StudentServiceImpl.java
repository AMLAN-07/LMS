package com.library.backends.service.impl;

import com.library.backends.dto.StudentDto;
import com.library.backends.entity.Student;
import com.library.backends.mapper.StudentMapper;
import com.library.backends.repository.StudentRepository;
import com.library.backends.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;


    @Override
    public StudentDto createStudent(StudentDto studentDto) {

        Student student= StudentMapper.mapToStudent(studentDto);
        Student savedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(savedStudent);
    }
}
