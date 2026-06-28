package com.library.backends.repository;

import com.library.backends.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book,Long> {
    @Query("select coalesce(sum(b.bookcopy), 0) from Book b")
    long totalAvailableCopies();
}
