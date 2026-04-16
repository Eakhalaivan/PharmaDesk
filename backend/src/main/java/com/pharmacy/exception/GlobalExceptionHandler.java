package com.pharmacy.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message("Validation Failed")
                .timestamp(LocalDateTime.now())
                .errors(errors)
                .build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        
        // Handle duplicate phone number
        if (ex.getMessage().contains("customers_phone_key") || ex.getMessage().contains("phone")) {
            errors.put("phone", "Phone number already registered");
        }
        // Handle duplicate email
        else if (ex.getMessage().contains("customers_email_key") || ex.getMessage().contains("email")) {
            errors.put("email", "Email already registered");
        }
        // Handle duplicate manufacturer name
        else if (ex.getMessage().contains("manufacturers_name_key") || ex.getMessage().contains("manufacturer")) {
            errors.put("name", "Manufacturer name already exists");
        }
        // Handle duplicate license number
        else if (ex.getMessage().contains("license")) {
            errors.put("licenseNumber", "License number already exists");
        }
        else {
            errors.put("general", "Data integrity violation occurred");
        }

        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.CONFLICT.value())
                .message("Data conflict occurred")
                .timestamp(LocalDateTime.now())
                .errors(errors)
                .build();
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        Map<String, String> errors = new HashMap<>();
        
        // Handle duplicate phone number from service layer
        if (ex.getMessage().contains("phone number")) {
            errors.put("phone", ex.getMessage());
        }
        // Handle duplicate email from service layer
        else if (ex.getMessage().contains("email")) {
            errors.put("email", ex.getMessage());
        }
        // Handle duplicate manufacturer name from service layer
        else if (ex.getMessage().contains("name") && ex.getMessage().contains("already exists")) {
            errors.put("name", ex.getMessage());
        }
        // Handle duplicate license number from service layer
        else if (ex.getMessage().contains("license")) {
            errors.put("licenseNumber", ex.getMessage());
        }
        else {
            errors.put("general", ex.getMessage());
        }

        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message("Validation error")
                .timestamp(LocalDateTime.now())
                .errors(errors)
                .build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("An unexpected error occurred: " + ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
