package com.library.backends.service.impl;

import com.library.backends.dto.StudentDto;
import com.library.backends.entity.Student;
import com.library.backends.exception.ResourcesNotFoundException;
import com.library.backends.mapper.StudentMapper;
import com.library.backends.repository.StudentRepository;
import com.library.backends.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;


    @Override
    @Transactional
    public StudentDto createStudent(StudentDto studentDto) {

        Student student= StudentMapper.mapToStudent(studentDto);
        Student savedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentById(Long studentid) {
      Student student = studentRepository.findById(studentid)
                .orElseThrow(()->
                        new ResourcesNotFoundException("Student is not exists with given id : "+ studentid));

        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents() {
         List<Student> students = studentRepository.findAll();
        return students.stream().map((student)->StudentMapper.mapToStudentDto(student))
        .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StudentDto updateStudent(Long studentid, StudentDto updatedStudent) {

       Student student= studentRepository.findById(studentid).orElseThrow(
                ()->new ResourcesNotFoundException("Student is not exists with given id : "+ studentid)
        );

       student.setFirstName(updatedStudent.getFirstName());
       student.setLastName(updatedStudent.getLastName());
       student.setRegdNo(updatedStudent.getRegdNo());
       student.setEmail(updatedStudent.getEmail());

       Student updatedStudentObj= studentRepository.save(student);
        return StudentMapper.mapToStudentDto(updatedStudentObj);
    }

    @Override
    @Transactional
    public void deleteStudent(Long studentid) {
        Student student= studentRepository.findById(studentid).orElseThrow(
                ()->new ResourcesNotFoundException("Student is not exists with given id : "+ studentid)
        );

        studentRepository.deleteById(studentid);
    }
}
