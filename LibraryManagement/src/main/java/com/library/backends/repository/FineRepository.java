package com.library.backends.repository;

import com.library.backends.entity.Fine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FineRepository extends JpaRepository<Fine, Long> {
    List<Fine> findByStudentId(Long studentId);
}
