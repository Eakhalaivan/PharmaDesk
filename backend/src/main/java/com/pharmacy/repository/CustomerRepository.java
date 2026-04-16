package com.pharmacy.repository;

import com.pharmacy.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    
    Optional<Customer> findByPhone(String phone);
    
    boolean existsByPhone(String phone);
    
    Optional<Customer> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<Customer> findByNameContainingIgnoreCaseAndIsActiveTrue(String name);
    
    List<Customer> findByPhoneContainingIgnoreCaseAndIsActiveTrue(String phone);
    
    List<Customer> findByIsActiveTrue();
    
    Page<Customer> findByIsActiveTrue(Pageable pageable);
    
    @Query("SELECT c FROM Customer c WHERE c.isActive = true AND (LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(c.phone) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Customer> searchActiveCustomers(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    @Query("SELECT COUNT(c) FROM Customer c WHERE c.isActive = true")
    long countActiveCustomers();
}
