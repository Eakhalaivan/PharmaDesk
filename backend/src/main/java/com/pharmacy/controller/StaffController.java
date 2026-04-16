package com.pharmacy.controller;

import com.pharmacy.dto.CreateStaffRequest;
import com.pharmacy.dto.StaffResponse;
import com.pharmacy.service.StaffService;
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
@RequestMapping("/api/v1/staff")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StaffResponse> createStaff(@Valid @RequestBody CreateStaffRequest request) {
        StaffResponse response = staffService.createStaff(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<StaffResponse> getStaffById(@PathVariable String id) {
        StaffResponse response = staffService.getStaffById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<Page<StaffResponse>> getAllStaff(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir) {
        
        // Provide defaults if parameters are not provided
        int pageNum = (page != null) ? page : 0;
        int sizeNum = (size != null) ? size : 10;
        String sortField = (sortBy != null) ? sortBy : "fullName";
        String sortDirection = (sortDir != null) ? sortDir : "asc";
        
        Sort sort = sortDirection.equalsIgnoreCase("desc") ? 
                Sort.by(sortField).descending() : Sort.by(sortField).ascending();
        Pageable pageable = PageRequest.of(pageNum, sizeNum, sort);
        
        Page<StaffResponse> response = staffService.getAllStaff(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/active")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<List<StaffResponse>> getActiveStaff() {
        List<StaffResponse> response = staffService.getActiveStaff();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/simple")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<List<StaffResponse>> getAllStaffSimple() {
        List<StaffResponse> response = staffService.getActiveStaff();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StaffResponse> updateStaff(
            @PathVariable String id, 
            @Valid @RequestBody CreateStaffRequest request) {
        StaffResponse response = staffService.updateStaff(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteStaff(@PathVariable String id) {
        staffService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/toggle-status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StaffResponse> toggleStaffStatus(@PathVariable String id) {
        StaffResponse response = staffService.toggleStaffStatus(id);
        return ResponseEntity.ok(response);
    }
}
