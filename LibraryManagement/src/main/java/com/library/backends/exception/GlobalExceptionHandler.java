package com.library.backends.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourcesNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleNotFound(ResourcesNotFoundException ex) {
    Map<String, String> body = new HashMap<>();
    body.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body); // 404
  }

  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<Map<String, String>> handleIllegalState(IllegalStateException ex) {
    Map<String, String> body = new HashMap<>();
    body.put("message", ex.getMessage());
    return ResponseEntity.status(HttpStatus.CONFLICT).body(body); // 409
  }
}