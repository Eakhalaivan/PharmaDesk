package com.pharmacy.service;

import com.pharmacy.dto.CreateCustomerRequest;
import com.pharmacy.dto.CustomerResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomerService {
    
    CustomerResponse createCustomer(CreateCustomerRequest request);
    
    CustomerResponse getCustomerById(String id);
    
    Page<CustomerResponse> getAllCustomers(Pageable pageable);
    
    Page<CustomerResponse> searchActiveCustomers(String searchTerm, Pageable pageable);
    
    List<CustomerResponse> getActiveCustomers();
    
    CustomerResponse updateCustomer(String id, CreateCustomerRequest request);
    
    void deleteCustomer(String id);
    
    CustomerResponse toggleCustomerStatus(String id);
    
    CustomerResponse updateLoyaltyPoints(String customerId, int points);
    
    CustomerResponse updateTotalPurchases(String customerId, double amount);
}
