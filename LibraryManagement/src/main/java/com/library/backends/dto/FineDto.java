package com.library.backends.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FineDto {
    private Long fineId;
    private Long studentId;
    private String studentName;
    private Long issueId;
    private double amount;
    private String status;
}
