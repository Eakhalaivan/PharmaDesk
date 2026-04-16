package com.pharmacy.service.impl;

import com.pharmacy.dto.MedicineRequestDTO;
import com.pharmacy.dto.MedicineResponseDTO;
import com.pharmacy.exception.ResourceNotFoundException;
import com.pharmacy.model.Manufacturer;
import com.pharmacy.model.Medicine;
import com.pharmacy.repository.ManufacturerRepository;
import com.pharmacy.repository.MedicineRepository;
import com.pharmacy.service.AuditLogService;
import com.pharmacy.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Autowired
    private AuditLogService auditLogService;

    @Override
    public Page<MedicineResponseDTO> getAllMedicines(Pageable pageable) {
        return medicineRepository.findByIsActiveTrue(pageable)
                .map(this::mapToResponseDTO);
    }

    @Override
    public MedicineResponseDTO getMedicineById(String id) {
        Medicine medicine = medicineRepository.findById(id)
                .filter(Medicine::isActive)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine not found with id: " + id));
        return mapToResponseDTO(medicine);
    }

    @Override
    public List<MedicineResponseDTO> searchMedicines(String name) {
        return medicineRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(name)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MedicineResponseDTO createMedicine(MedicineRequestDTO request) {
        Medicine medicine = mapToEntity(request);
        Medicine savedMedicine = medicineRepository.save(medicine);
        
        auditLogService.log("CREATE_MEDICINE", "Created new medicine: " + savedMedicine.getName(), savedMedicine.getId());
        
        return mapToResponseDTO(savedMedicine);
    }

    @Override
    public MedicineResponseDTO updateMedicine(String id, MedicineRequestDTO request) {
        Medicine medicine = medicineRepository.findById(id)
                .filter(Medicine::isActive)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine not found with id: " + id));

        updateEntityFromDTO(medicine, request);
        Medicine updatedMedicine = medicineRepository.save(medicine);
        
        auditLogService.log("UPDATE_MEDICINE", "Updated medicine: " + updatedMedicine.getName(), updatedMedicine.getId());
        
        return mapToResponseDTO(updatedMedicine);
    }

    @Override
    public void deleteMedicine(String id) {
        Medicine medicine = medicineRepository.findById(id)
                .filter(Medicine::isActive)
                .orElseThrow(() -> new ResourceNotFoundException("Medicine not found with id: " + id));
        
        medicine.setActive(false);
        medicineRepository.save(medicine);
        
        auditLogService.log("DELETE_MEDICINE", "Soft deleted medicine: " + medicine.getName(), medicine.getId());
    }

    @Override
    public List<MedicineResponseDTO> getLowStockMedicines() {
        return medicineRepository.findLowStockMedicines()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private MedicineResponseDTO mapToResponseDTO(Medicine medicine) {
        return MedicineResponseDTO.builder()
                .id(medicine.getId())
                .name(medicine.getName())
                .description(medicine.getDescription())
                .price(medicine.getPrice())
                .image(medicine.getImage())
                .category(medicine.getCategory())
                .stockCount(medicine.getStockCount())
                .inStock(medicine.isInStock())
                .rating(medicine.getRating())
                .reviews(medicine.getReviews())
                .manufacturer(medicine.getManufacturer() != null ? medicine.getManufacturer().getName() : null)
                .expiryDate(medicine.getExpiryDate())
                .batchNumber(medicine.getBatchNumber())
                .lowStockThreshold(medicine.getLowStockThreshold())
                .isActive(medicine.isActive())
                .build();
    }

    private Medicine mapToEntity(MedicineRequestDTO request) {
        Medicine medicine = new Medicine();
        updateEntityFromDTO(medicine, request);
        return medicine;
    }

    private void updateEntityFromDTO(Medicine medicine, MedicineRequestDTO request) {
        medicine.setName(request.getName());
        medicine.setDescription(request.getDescription());
        medicine.setPrice(request.getPrice());
        medicine.setImage(request.getImage());
        medicine.setCategory(request.getCategory());
        medicine.setStockCount(request.getStockCount());
        medicine.setInStock(request.getStockCount() > 0);
        // Handle manufacturer mapping
        if (request.getManufacturer() != null) {
            Manufacturer manufacturer = manufacturerRepository.findByName(request.getManufacturer())
                    .orElseGet(() -> {
                        Manufacturer newManufacturer = new Manufacturer();
                        newManufacturer.setName(request.getManufacturer());
                        return manufacturerRepository.save(newManufacturer);
                    });
            medicine.setManufacturer(manufacturer);
        }
        medicine.setExpiryDate(request.getExpiryDate());
        medicine.setBatchNumber(request.getBatchNumber());
        medicine.setLowStockThreshold(request.getLowStockThreshold());
    }
}
