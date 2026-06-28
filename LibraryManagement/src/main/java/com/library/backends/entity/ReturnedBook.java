package com.library.backends.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "returned_books")
public class ReturnedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long returnId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id", nullable = false, unique = true)
    private IssuedBook issuedBook;

    @Column(nullable = false)
    private LocalDate returnDate = LocalDate.now();

    private long lateDays;

    private double fineAmount;
}
