package com.pharmacy.component;

import com.pharmacy.model.Role;
import com.pharmacy.model.User;
import com.pharmacy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class BootstrapUsers implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("--- BOOTSTRAPING DEMO USERS ---");
        
        createOrUpdateUser("ADMIN001", Role.ADMIN, "Admin User");
        createOrUpdateUser("EMP001", Role.EMPLOYEE, "Employee User");
        createOrUpdateUser("EMP002", Role.EMPLOYEE, "Staff User");
        
        System.out.println("--- BOOTSTRAPING COMPLETE ---");
    }

    private void createOrUpdateUser(String employeeId, Role role, String name) {
        userRepository.findByEmployeeId(employeeId).ifPresent(user -> userRepository.delete(user));
        
        User newUser = User.builder()
                .employeeId(employeeId)
                .password(passwordEncoder.encode("password"))
                .role(role)
                .fullName(name)
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .build();
        
        userRepository.save(newUser);
        System.out.println("Created/Reset user: " + employeeId + " with role: " + role);
    }
}
