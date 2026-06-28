package com.library.backends.service.impl;

import com.library.backends.dto.StudentDto;
import com.library.backends.entity.Student;
import com.library.backends.exception.ResourcesNotFoundException;
import com.library.backends.mapper.StudentMapper;
import com.library.backends.repository.IssuedBookRepository;
import com.library.backends.repository.StudentRepository;
import com.library.backends.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final IssuedBookRepository issuedBookRepository;

    @Override
    public StudentDto createStudent(StudentDto studentDto) {
        Student student = StudentMapper.mapToStudent(studentDto);
        Student savedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentById(Long studentid) {
        Student student = studentRepository.findById(studentid)
                .orElseThrow(() -> new ResourcesNotFoundException("Student is not exists with given id : " + studentid));

        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream().map(StudentMapper::mapToStudentDto)
                .collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long studentid, StudentDto updatedStudent) {
        Student student = studentRepository.findById(studentid).orElseThrow(
                () -> new ResourcesNotFoundException("Student is not exists with given id : " + studentid)
        );

        student.setFirstName(updatedStudent.getFirstName());
        student.setLastName(updatedStudent.getLastName());
        student.setEmail(updatedStudent.getEmail());
        student.setCourse(updatedStudent.getCourse());
        student.setRollNumber(updatedStudent.getRollNumber());
        student.setOrganizationName(updatedStudent.getOrganizationName());
        student.setActive(updatedStudent.isActive());

        Student updatedStudentObj = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(updatedStudentObj);
    }

    @Override
    public void deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourcesNotFoundException("Student not found with id: " + studentId));

        if (issuedBookRepository.existsByStudentId(studentId)) {
            student.setActive(false);
            studentRepository.save(student);
            return;
        }

        studentRepository.deleteById(studentId);
    }
}
