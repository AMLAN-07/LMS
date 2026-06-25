package com.library.backends.mapper;

import com.library.backends.dto.BookDto;
import com.library.backends.entity.Book;

public class BookMapper {
    public  static BookDto mapToBookDto(Book book) {
        return  new BookDto(
                book.getBookId(),
                book.getTitle(),
                book.getAuthor(),
                book.getBookcopy()
        );
    }
    public  static Book mapToBook(BookDto bookDto) {
        return  new Book(
                bookDto.getBookId(),
                bookDto.getTitle(),
                bookDto.getAuthor(),
                bookDto.getBookcopy()
        );
    }
}
