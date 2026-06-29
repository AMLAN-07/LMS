package com.library.backends.service.impl;


import com.library.backends.dto.BookDto;
import com.library.backends.entity.Book;
import com.library.backends.entity.Category;
import com.library.backends.exception.ResourcesNotFoundException;
import com.library.backends.mapper.BookMapper;
import com.library.backends.repository.BookRepository;
import com.library.backends.repository.CategoryRepository;
import com.library.backends.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;
    private CategoryRepository categoryRepository;

    @Override
    public BookDto createBook(BookDto bookDto) {

        Book book= BookMapper.mapToBook(bookDto);
        setCategory(book, bookDto.getCategoryId());
        Book savedBook = bookRepository.save(book);
        return BookMapper.mapToBookDto(savedBook);
    }

    @Override
    @Transactional(readOnly = true)
    public BookDto getBookById(Long bookid) {
        Book book= bookRepository.findById(bookid)
                .orElseThrow(()->
                        new ResourcesNotFoundException("Book with id " + bookid + " not found!"));
        return BookMapper.mapToBookDto(book);
    }
    @Override
    @Transactional(readOnly = true)
    public List<BookDto> getAllBooks() {
        List<Book> books= bookRepository.findAll();
        return books.stream().map((book)->BookMapper.mapToBookDto(book))
                .collect(Collectors.toList());
    }
    @Override
    public BookDto updateBook(Long bookid, BookDto updatedBook) {

        Book book= bookRepository.findById(bookid).orElseThrow(
                ()-> new ResourcesNotFoundException("Book with id " + bookid + " not exists!")
        );
        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setIsbn(updatedBook.getIsbn());
        book.setPublisher(updatedBook.getPublisher());
        book.setBookcopy(updatedBook.getBookcopy());
        setCategory(book, updatedBook.getCategoryId());

        Book updatedBookObj = bookRepository.save(book);
        return BookMapper.mapToBookDto(updatedBookObj);
    }

    @Override
    public void deleteBookById(Long bookid) {
        Book book= bookRepository.findById(bookid).orElseThrow(
                ()-> new ResourcesNotFoundException("Book with id " + bookid + " not exists!")
        );
        bookRepository.deleteById(bookid);

    }

    private void setCategory(Book book, Long categoryId) {
        if (categoryId == null) {
            book.setCategory(null);
            return;
        }
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourcesNotFoundException("Category with id " + categoryId + " not found!"));
        book.setCategory(category);
    }
}
