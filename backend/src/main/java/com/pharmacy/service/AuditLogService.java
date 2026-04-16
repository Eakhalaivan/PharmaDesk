package com.pharmacy.service;

import com.pharmacy.model.AuditLog;
import com.pharmacy.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public void log(String action, String details, String resourceId) {
        String username = SecurityContextHolder.getContext().getAuthentication() != null 
                ? SecurityContextHolder.getContext().getAuthentication().getName() 
                : "SYSTEM";

        AuditLog log = AuditLog.builder()
                .action(action)
                .employeeId(username)
                .details(details)
                .resourceId(resourceId)
                .timestamp(LocalDateTime.now())
                .build();

        auditLogRepository.save(log);
    }
}
