package com.pharmacy.service.impl;

import com.pharmacy.dto.CreateCustomerRequest;
import com.pharmacy.dto.CustomerResponse;
import com.pharmacy.exception.ResourceNotFoundException;
import com.pharmacy.model.Customer;
import com.pharmacy.repository.CustomerRepository;
import com.pharmacy.service.CustomerService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    @Transactional
    public CustomerResponse createCustomer(CreateCustomerRequest request) {
        // Check if customer with same phone already exists
        if (customerRepository.existsByPhone(request.getPhone())) {
            throw new IllegalArgumentException("Customer with phone number '" + request.getPhone() + "' already exists");
        }
        
        // Check if customer with same email already exists (if email is provided)
        if (request.getEmail() != null && !request.getEmail().trim().isEmpty() &&
            customerRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Customer with email '" + request.getEmail() + "' already exists");
        }

        Customer customer = new Customer();
        BeanUtils.copyProperties(request, customer, "id", "createdAt", "totalPurchases", "loyaltyPoints");
        customer.setTotalPurchases(0.0);
        customer.setLoyaltyPoints(0);
        customer.setActive(true);
        
        Customer savedCustomer = customerRepository.save(customer);
        return convertToResponse(savedCustomer);
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerResponse getCustomerById(String id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
        return convertToResponse(customer);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CustomerResponse> getAllCustomers(Pageable pageable) {
        return customerRepository.findByIsActiveTrue(pageable)
                .map(this::convertToResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CustomerResponse> searchActiveCustomers(String searchTerm, Pageable pageable) {
        return customerRepository.searchActiveCustomers(searchTerm, pageable)
                .map(this::convertToResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerResponse> getActiveCustomers() {
        return customerRepository.findByIsActiveTrue()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CustomerResponse updateCustomer(String id, CreateCustomerRequest request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));

        // Check if another customer with same phone exists
        if (!customer.getPhone().equals(request.getPhone()) &&
            customerRepository.existsByPhone(request.getPhone())) {
            throw new IllegalArgumentException("Customer with phone number '" + request.getPhone() + "' already exists");
        }

        // Check if another customer with same email exists (if email is provided)
        if (request.getEmail() != null && !request.getEmail().trim().isEmpty() &&
            !request.getEmail().equals(customer.getEmail()) &&
            customerRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Customer with email '" + request.getEmail() + "' already exists");
        }

        BeanUtils.copyProperties(request, customer, "id", "createdAt", "totalPurchases", "loyaltyPoints");
        Customer updatedCustomer = customerRepository.save(customer);
        return convertToResponse(updatedCustomer);
    }

    @Override
    @Transactional
    public void deleteCustomer(String id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
        
        // Soft delete by setting isActive to false
        customer.setActive(false);
        customerRepository.save(customer);
    }

    @Override
    @Transactional
    public CustomerResponse toggleCustomerStatus(String id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
        
        customer.setActive(!customer.isActive());
        Customer updatedCustomer = customerRepository.save(customer);
        return convertToResponse(updatedCustomer);
    }

    @Override
    @Transactional
    public CustomerResponse updateLoyaltyPoints(String customerId, int points) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + customerId));
        
        customer.setLoyaltyPoints(customer.getLoyaltyPoints() + points);
        Customer updatedCustomer = customerRepository.save(customer);
        return convertToResponse(updatedCustomer);
    }

    @Override
    @Transactional
    public CustomerResponse updateTotalPurchases(String customerId, double amount) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + customerId));
        
        customer.setTotalPurchases(customer.getTotalPurchases() + amount);
        Customer updatedCustomer = customerRepository.save(customer);
        return convertToResponse(updatedCustomer);
    }

    private CustomerResponse convertToResponse(Customer customer) {
        CustomerResponse response = new CustomerResponse();
        BeanUtils.copyProperties(customer, response);
        return response;
    }
}
