package com.pharmacy.dto;

public class AuthResponse {
    private String token;
    private String employeeId;
    private String role;
    private String fullName;

    public AuthResponse() {}
    public AuthResponse(String token, String employeeId, String role, String fullName) {
        this.token = token;
        this.employeeId = employeeId;
        this.role = role;
        this.fullName = fullName;
    }

    public static AuthResponseBuilder builder() {
        return new AuthResponseBuilder();
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public static class AuthResponseBuilder {
        private String token, employeeId, role, fullName;

        public AuthResponseBuilder token(String token) { this.token = token; return this; }
        public AuthResponseBuilder employeeId(String employeeId) { this.employeeId = employeeId; return this; }
        public AuthResponseBuilder role(String role) { this.role = role; return this; }
        public AuthResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }

        public AuthResponse build() {
            return new AuthResponse(token, employeeId, role, fullName);
        }
    }
}
