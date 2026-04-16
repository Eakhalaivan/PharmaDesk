package com.pharmacy.repository;

import com.pharmacy.model.TaxRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaxRateRepository extends JpaRepository<TaxRate, String> {
    
    List<TaxRate> findByIsActiveTrue();
    
    List<TaxRate> findByAppliesTo(String appliesTo);
}
