package com.pharmacy.service;

import com.pharmacy.dto.CreateManufacturerRequest;
import com.pharmacy.dto.ManufacturerResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ManufacturerService {
    
    ManufacturerResponse createManufacturer(CreateManufacturerRequest request);
    
    ManufacturerResponse getManufacturerById(String id);
    
    Page<ManufacturerResponse> getAllManufacturers(Pageable pageable);
    
    List<ManufacturerResponse> getAllActiveManufacturers();
    
    ManufacturerResponse updateManufacturer(String id, CreateManufacturerRequest request);
    
    void deleteManufacturer(String id);
    
    ManufacturerResponse toggleManufacturerStatus(String id);
}
