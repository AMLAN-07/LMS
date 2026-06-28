package com.library.backends.service.impl;

import com.library.backends.dto.StudentDto;
import com.library.backends.entity.Student;
import com.library.backends.exception.ResourcesNotFoundException;
import com.library.backends.mapper.StudentMapper;
import com.library.backends.repository.BookIssueRepository;
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
    private final BookIssueRepository bookIssueRepository;


    @Override
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
    public StudentDto updateStudent(Long studentid, StudentDto updatedStudent) {

       Student student= studentRepository.findById(studentid).orElseThrow(
                ()->new ResourcesNotFoundException("Student is not exists with given id : "+ studentid)
        );

       student.setFirstName(updatedStudent.getFirstName());
       student.setLastName(updatedStudent.getLastName());
       student.setEmail(updatedStudent.getEmail());

       Student updatedStudentObj= studentRepository.save(student);
        return StudentMapper.mapToStudentDto(updatedStudentObj);
    }

    // In StudentServiceImpl.java — update the deleteStudent method to look like this.
// You'll need to inject BookIssueRepository as a constructor dependency
// (add it alongside your existing StudentRepository field).

    @Override
    public void deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourcesNotFoundException("Student not found with id: " + studentId));

        boolean hasActiveLoan = bookIssueRepository.findByStudent_Id(studentId)
                .stream()
                .anyMatch(issue -> issue.getReturnDate() == null);

        if (hasActiveLoan) {
            throw new IllegalStateException(
                    "Cannot delete " + student.getFirstName() + " " + student.getLastName() +
                            " — they currently have a book issued. Please return it first."
            );
        }

        studentRepository.deleteById(studentId);
    }
}
