package com.pharmacy.repository;

import com.pharmacy.model.Manufacturer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ManufacturerRepository extends JpaRepository<Manufacturer, String> {
    Optional<Manufacturer> findByName(String name);
    Optional<Manufacturer> findByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCase(String name);
    Optional<Manufacturer> findByLicenseNumber(String licenseNumber);
    boolean existsByLicenseNumberIgnoreCase(String licenseNumber);
    List<Manufacturer> findByIsActiveTrue();
    
    Page<Manufacturer> findByIsActiveTrue(Pageable pageable);
}
