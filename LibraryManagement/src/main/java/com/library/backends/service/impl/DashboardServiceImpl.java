package com.library.backends.service.impl;

import com.library.backends.dto.DashboardDto;
import com.library.backends.entity.Fine;
import com.library.backends.repository.*;
import com.library.backends.service.DashboardService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private StudentRepository studentRepository;
    private BookRepository bookRepository;
    private IssuedBookRepository issuedBookRepository;
    private ReturnedBookRepository returnedBookRepository;
    private FineRepository fineRepository;

    @Override
    public DashboardDto getDashboard() {
        double totalFines = fineRepository.findAll().stream().mapToDouble(Fine::getAmount).sum();
        return new DashboardDto(
                studentRepository.count(),
                studentRepository.countByActiveTrue(),
                bookRepository.count(),
                bookRepository.totalAvailableCopies(),
                issuedBookRepository.count(),
                returnedBookRepository.count(),
                issuedBookRepository.countByStatus("ISSUED"),
                totalFines
        );
    }
}
