package com.pharmacy.service.impl;

import com.pharmacy.dto.CreateManufacturerRequest;
import com.pharmacy.dto.ManufacturerResponse;
import com.pharmacy.exception.ResourceNotFoundException;
import com.pharmacy.model.Manufacturer;
import com.pharmacy.repository.ManufacturerRepository;
import com.pharmacy.service.ManufacturerService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ManufacturerServiceImpl implements ManufacturerService {

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Override
    @Transactional
    public ManufacturerResponse createManufacturer(CreateManufacturerRequest request) {
        // Check if manufacturer with same name or license already exists
        if (manufacturerRepository.existsByNameIgnoreCase(request.getName())) {
            throw new IllegalArgumentException("Manufacturer with name '" + request.getName() + "' already exists");
        }
        
        if (request.getLicenseNumber() != null && 
            manufacturerRepository.existsByLicenseNumberIgnoreCase(request.getLicenseNumber())) {
            throw new IllegalArgumentException("Manufacturer with license number '" + request.getLicenseNumber() + "' already exists");
        }

        Manufacturer manufacturer = new Manufacturer();
        BeanUtils.copyProperties(request, manufacturer);
        manufacturer.setActive(true);
        
        Manufacturer savedManufacturer = manufacturerRepository.save(manufacturer);
        return convertToResponse(savedManufacturer);
    }

    @Override
    public ManufacturerResponse getManufacturerById(String id) {
        Manufacturer manufacturer = manufacturerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Manufacturer not found with id: " + id));
        return convertToResponse(manufacturer);
    }

    @Override
    public Page<ManufacturerResponse> getAllManufacturers(Pageable pageable) {
        return manufacturerRepository.findByIsActiveTrue(pageable)
                .map(this::convertToResponse);
    }

    @Override
    public List<ManufacturerResponse> getAllActiveManufacturers() {
        return manufacturerRepository.findByIsActiveTrue()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ManufacturerResponse updateManufacturer(String id, CreateManufacturerRequest request) {
        Manufacturer manufacturer = manufacturerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Manufacturer not found with id: " + id));

        // Check if another manufacturer with same name exists
        if (!manufacturer.getName().equalsIgnoreCase(request.getName()) &&
            manufacturerRepository.existsByNameIgnoreCase(request.getName())) {
            throw new IllegalArgumentException("Manufacturer with name '" + request.getName() + "' already exists");
        }

        // Check if another manufacturer with same license exists
        if (request.getLicenseNumber() != null && 
            !manufacturer.getLicenseNumber().equalsIgnoreCase(request.getLicenseNumber()) &&
            manufacturerRepository.existsByLicenseNumberIgnoreCase(request.getLicenseNumber())) {
            throw new IllegalArgumentException("Manufacturer with license number '" + request.getLicenseNumber() + "' already exists");
        }

        BeanUtils.copyProperties(request, manufacturer, "id", "createdAt");
        Manufacturer updatedManufacturer = manufacturerRepository.save(manufacturer);
        return convertToResponse(updatedManufacturer);
    }

    @Override
    @Transactional
    public void deleteManufacturer(String id) {
        Manufacturer manufacturer = manufacturerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Manufacturer not found with id: " + id));
        
        // Check if manufacturer has associated medicines
        // You might want to add this check when Medicine entity is properly set up
        manufacturerRepository.delete(manufacturer);
    }

    @Override
    @Transactional
    public ManufacturerResponse toggleManufacturerStatus(String id) {
        Manufacturer manufacturer = manufacturerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Manufacturer not found with id: " + id));
        
        manufacturer.setActive(!manufacturer.isActive());
        Manufacturer updatedManufacturer = manufacturerRepository.save(manufacturer);
        return convertToResponse(updatedManufacturer);
    }

    private ManufacturerResponse convertToResponse(Manufacturer manufacturer) {
        ManufacturerResponse response = new ManufacturerResponse();
        BeanUtils.copyProperties(manufacturer, response);
        return response;
    }
}
