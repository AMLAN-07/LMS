package com.library.backends.service.impl;

import com.library.backends.dto.OverdueBookDto;
import com.library.backends.dto.StudentBookDto;
import com.library.backends.entity.BookIssue;
import com.library.backends.repository.BookIssueRepository;
import com.library.backends.service.BookIssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookIssueServiceImpl implements BookIssueService {

    private final BookIssueRepository bookIssueRepository;

    @Override
    public List<OverdueBookDto> getOverdueBooks() {
        LocalDate today = LocalDate.now();
        List<BookIssue> overdue = bookIssueRepository.findOverdueIssues(today);

        return overdue.stream()
                .map(bi -> new OverdueBookDto(
                        bi.getId(),
                        bi.getBook().getTitle(),
                        bi.getBook().getAuthor(),
                        bi.getStudent().getFirstName() + " " + bi.getStudent().getLastName(),
                        bi.getStudent().getEmail(),
                        bi.getIssueDate(),
                        bi.getDueDate(),
                        ChronoUnit.DAYS.between(bi.getDueDate(), today)
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<StudentBookDto> getStudentBookReport() {
        List<BookIssue> active = bookIssueRepository.findAllActiveIssues();
        LocalDate today = LocalDate.now();

        return active.stream()
                .map(bi -> new StudentBookDto(
                        bi.getStudent().getId(),
                        bi.getStudent().getFirstName() + " " + bi.getStudent().getLastName(),
                        bi.getBook().getTitle(),
                        bi.getBook().getAuthor(),
                        bi.getIssueDate(),
                        bi.getDueDate(),
                        bi.getDueDate().isBefore(today) ? "OVERDUE" : "ISSUED"
                ))
                .collect(Collectors.toList());
    }
}