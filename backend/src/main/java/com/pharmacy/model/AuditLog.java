package com.pharmacy.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String action;

    @Column(name = "employee_id", nullable = false)
    private String employeeId;

    private String details;
    private String resourceId;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public AuditLog() {}

    public AuditLog(String id, String action, String employeeId, String details, String resourceId, LocalDateTime timestamp) {
        this.id = id;
        this.action = action;
        this.employeeId = employeeId;
        this.details = details;
        this.resourceId = resourceId;
        this.timestamp = timestamp;
    }

    public static AuditLogBuilder builder() {
        return new AuditLogBuilder();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public String getResourceId() { return resourceId; }
    public void setResourceId(String resourceId) { this.resourceId = resourceId; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public static class AuditLogBuilder {
        private String id, action, employeeId, details, resourceId;
        private LocalDateTime timestamp;

        public AuditLogBuilder id(String id) { this.id = id; return this; }
        public AuditLogBuilder action(String action) { this.action = action; return this; }
        public AuditLogBuilder employeeId(String employeeId) { this.employeeId = employeeId; return this; }
        public AuditLogBuilder details(String details) { this.details = details; return this; }
        public AuditLogBuilder resourceId(String resourceId) { this.resourceId = resourceId; return this; }
        public AuditLogBuilder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }

        public AuditLog build() {
            return new AuditLog(id, action, employeeId, details, resourceId, timestamp);
        }
    }
}
