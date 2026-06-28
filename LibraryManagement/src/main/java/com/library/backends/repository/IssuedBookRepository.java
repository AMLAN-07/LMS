package com.library.backends.repository;

import com.library.backends.entity.IssuedBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssuedBookRepository extends JpaRepository<IssuedBook, Long> {
    long countByStatus(String status);
    List<IssuedBook> findByStudentId(Long studentId);
    boolean existsByStudentId(Long studentId);
}
