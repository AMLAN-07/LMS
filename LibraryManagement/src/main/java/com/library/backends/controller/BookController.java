package com.library.backends.controller;


import com.library.backends.dto.BookDto;
import com.library.backends.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/books")
public class BookController {
    private BookService bookService;

    @PostMapping
    public ResponseEntity<BookDto> createBook(@RequestBody BookDto bookDto) {
        BookDto saveBook=bookService.createBook(bookDto);
        return  new ResponseEntity<>(saveBook, HttpStatus.CREATED);
    }
    @GetMapping("{id}")
    public ResponseEntity<BookDto> getBookById(@PathVariable("id") Long bookId) {
        BookDto bookDto=bookService.getBookById(bookId);
        return  ResponseEntity.ok(bookDto);
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks() {
        List<BookDto> bookList=bookService.getAllBooks();
        return  ResponseEntity.ok(bookList);
    }
    @PutMapping("{id}")
    public ResponseEntity<BookDto> updateBook(@PathVariable("id") Long bookId,
                                              @RequestBody BookDto updateBook) {
        BookDto bookDto=bookService.updateBook(bookId, updateBook);
        return  ResponseEntity.ok(bookDto);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBook(@PathVariable("id") Long bookId) {
        bookService.deleteBookById(bookId);
        return  ResponseEntity.ok("Book deleted Successfully");
    }
}
