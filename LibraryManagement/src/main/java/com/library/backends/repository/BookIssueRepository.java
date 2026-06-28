package com.library.backends.repository;

import com.library.backends.entity.BookIssue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookIssueRepository extends JpaRepository<BookIssue, Long> {

    @Query("SELECT bi FROM BookIssue bi " +
            "WHERE bi.returnDate IS NULL AND bi.dueDate < :today " +
            "ORDER BY bi.dueDate ASC")
    List<BookIssue> findOverdueIssues(@Param("today") LocalDate today);

    @Query("SELECT bi FROM BookIssue bi WHERE bi.returnDate IS NULL ORDER BY bi.student.id")
    List<BookIssue> findAllActiveIssues();

    @Query("SELECT bi FROM BookIssue bi WHERE bi.returnDate IS NOT NULL ORDER BY bi.returnDate DESC")
    List<BookIssue> findAllReturnedIssues();

    List<BookIssue> findByStudent_Id(Long studentId);
    List<BookIssue> findByBook_BookId(Long bookId);
}