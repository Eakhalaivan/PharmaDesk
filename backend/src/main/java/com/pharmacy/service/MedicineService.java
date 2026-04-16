package com.pharmacy.service;

import com.pharmacy.dto.MedicineRequestDTO;
import com.pharmacy.dto.MedicineResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MedicineService {
    Page<MedicineResponseDTO> getAllMedicines(Pageable pageable);
    MedicineResponseDTO getMedicineById(String id);
    List<MedicineResponseDTO> searchMedicines(String name);
    MedicineResponseDTO createMedicine(MedicineRequestDTO request);
    MedicineResponseDTO updateMedicine(String id, MedicineRequestDTO request);
    void deleteMedicine(String id);
    List<MedicineResponseDTO> getLowStockMedicines();
}
