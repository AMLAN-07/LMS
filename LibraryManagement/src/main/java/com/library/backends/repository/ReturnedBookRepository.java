package com.library.backends.repository;

import com.library.backends.entity.ReturnedBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReturnedBookRepository extends JpaRepository<ReturnedBook, Long> {
}
