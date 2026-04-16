package com.pharmacy.controller;

import com.pharmacy.dto.CreateManufacturerRequest;
import com.pharmacy.dto.ManufacturerResponse;
import com.pharmacy.service.ManufacturerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/manufacturers")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ManufacturerController {

    @Autowired
    private ManufacturerService manufacturerService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ManufacturerResponse> createManufacturer(@Valid @RequestBody CreateManufacturerRequest request) {
        ManufacturerResponse response = manufacturerService.createManufacturer(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<ManufacturerResponse> getManufacturerById(@PathVariable String id) {
        ManufacturerResponse response = manufacturerService.getManufacturerById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<Page<ManufacturerResponse>> getAllManufacturers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<ManufacturerResponse> response = manufacturerService.getAllManufacturers(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/active")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<List<ManufacturerResponse>> getAllActiveManufacturers() {
        List<ManufacturerResponse> response = manufacturerService.getAllActiveManufacturers();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ManufacturerResponse> updateManufacturer(
            @PathVariable String id, 
            @Valid @RequestBody CreateManufacturerRequest request) {
        ManufacturerResponse response = manufacturerService.updateManufacturer(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteManufacturer(@PathVariable String id) {
        manufacturerService.deleteManufacturer(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/toggle-status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ManufacturerResponse> toggleManufacturerStatus(@PathVariable String id) {
        ManufacturerResponse response = manufacturerService.toggleManufacturerStatus(id);
        return ResponseEntity.ok(response);
    }
}
