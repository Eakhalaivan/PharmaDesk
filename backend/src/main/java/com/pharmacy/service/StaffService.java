package com.pharmacy.service;

import com.pharmacy.dto.CreateStaffRequest;
import com.pharmacy.dto.StaffResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StaffService {
    
    StaffResponse createStaff(CreateStaffRequest request);
    
    StaffResponse getStaffById(String id);
    
    Page<StaffResponse> getAllStaff(Pageable pageable);
    
    List<StaffResponse> getActiveStaff();
    
    StaffResponse updateStaff(String id, CreateStaffRequest request);
    
    void deleteStaff(String id);
    
    StaffResponse toggleStaffStatus(String id);
}
