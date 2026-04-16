package com.pharmacy.repository;

import com.pharmacy.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, String> {
    List<AuditLog> findByEmployeeId(String employeeId);
    List<AuditLog> findByResourceId(String resourceId);
}
