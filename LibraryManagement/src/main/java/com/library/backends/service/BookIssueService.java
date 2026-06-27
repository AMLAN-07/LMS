package com.library.backends.service;

import com.library.backends.dto.OverdueBookDto;
import com.library.backends.dto.StudentBookDto;

import java.util.List;

public interface BookIssueService {
    List<OverdueBookDto> getOverdueBooks();
    List<StudentBookDto> getStudentBookReport();
}