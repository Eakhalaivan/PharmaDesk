package com.pharmacy.repository;

import com.pharmacy.model.Medicine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, String> {
    
    @Query("SELECT m FROM Medicine m LEFT JOIN FETCH m.manufacturer WHERE m.isActive = true")
    Page<Medicine> findByIsActiveTrue(Pageable pageable);
    
    @Query("SELECT m FROM Medicine m LEFT JOIN FETCH m.manufacturer WHERE m.isActive = true AND LOWER(m.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Medicine> findByNameContainingIgnoreCaseAndIsActiveTrue(String name);
    
    @Query("SELECT m FROM Medicine m LEFT JOIN FETCH m.manufacturer WHERE m.isActive = true AND m.stockQuantity <= m.lowStockThreshold")
    List<Medicine> findLowStockMedicines();
}
