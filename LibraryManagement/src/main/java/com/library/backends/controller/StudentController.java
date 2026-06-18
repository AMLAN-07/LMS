package com.library.backends.controller;

import com.library.backends.dto.StudentDto;
import com.library.backends.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/students")
public class StudentController {
    private StudentService studentService;

    //build add student rest api
    @PostMapping
    public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto studentDto) {
        StudentDto savedStudent=studentService.createStudent(studentDto);
        return  new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    //get student REST API
    @GetMapping({"{id}"})
    public ResponseEntity<StudentDto> getStudentById(@PathVariable("id") Long studentId) {
        StudentDto studentDto=studentService.getStudentById(studentId);
        return  ResponseEntity.ok(studentDto);
    }

    //Build get All Rest Api
    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents(){
List<StudentDto> students=studentService.getAllStudents();
return  ResponseEntity.ok(students);
    }

    //Update Student REST API
    @PutMapping("{id}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable("id") Long studentId,
                                                    @RequestBody StudentDto updatedStudent) {
        StudentDto studentDto=studentService.updateStudent(studentId,updatedStudent);
        return  ResponseEntity.ok(studentDto);
    }

    //Delete Studennt REST Api
    @DeleteMapping("{id}")
    public  ResponseEntity<String>  deleteStudent(@PathVariable("id") Long studentId) {
        studentService.deleteStudent(studentId);

        return  ResponseEntity.ok("Deleted Student successfully");
    }
}
