package com.pharmacy.repository;

import com.pharmacy.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmployeeId(String employeeId);
    
    boolean existsByEmployeeId(String employeeId);
    
    List<User> findByIsActiveTrue();
    
    Page<User> findByIsActiveTrue(Pageable pageable);
}
