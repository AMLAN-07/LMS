package com.library.backends.repository;

import com.library.backends.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student,Long> {
    long countByActiveTrue();
}
