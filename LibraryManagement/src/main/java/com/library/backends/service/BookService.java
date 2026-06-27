package com.library.backends.service;

import com.library.backends.dto.BookDto;

import java.util.List;

public interface BookService {
    BookDto createBook(BookDto bookDto);
    BookDto getBookById(Long id);
    List<BookDto> getAllBooks();

    BookDto updateBook(Long bookid, BookDto updatedBook);

    void deleteBookById(Long id);
}
