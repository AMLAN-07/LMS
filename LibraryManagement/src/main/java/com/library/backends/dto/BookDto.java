package com.library.backends.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    //data member 
    private Long bookId;
    private String title;
    private String author;
    private int bookcopy;
}
