package com.pharmacy.service;

import com.pharmacy.dto.AuthResponse;
import com.pharmacy.dto.LoginRequest;
import com.pharmacy.model.User;
import com.pharmacy.repository.UserRepository;
import com.pharmacy.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmployeeId(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmployeeId(request.getEmployeeId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with Employee ID: " + request.getEmployeeId()));

        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .employeeId(user.getEmployeeId())
                .role(user.getRole().name())
                .fullName(user.getFullName())
                .build();
    }

    public String checkRole(String employeeId) {
        return userRepository.findByEmployeeId(employeeId)
                .map(user -> user.getRole().name())
                .orElse(null);
    }
}
