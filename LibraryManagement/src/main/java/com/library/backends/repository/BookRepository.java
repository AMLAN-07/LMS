package com.library.backends.repository;

import com.library.backends.entity.Book;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book,Long> {
    @Override
    @EntityGraph(attributePaths = "category")
    List<Book> findAll();

    @Override
    @EntityGraph(attributePaths = "category")
    Optional<Book> findById(Long bookId);

    @Query("select coalesce(sum(b.bookcopy), 0) from Book b")
    long totalAvailableCopies();
}
