package com.pharmacy.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PrintInvoiceResponse {
    private String invoiceNumber;
    private LocalDateTime date;
    private String pharmacyName;
    private String pharmacyAddress;
    private String pharmacyPhone;
    private CustomerInfo customer;
    private List<InvoiceItemInfo> items;
    private double subtotal;
    private double discountAmount;
    private double taxAmount;
    private double totalAmount;
    private String paymentMethod;
    private String staffName;
    private String invoiceFooterNote;

    // Customer info inner class
    public static class CustomerInfo {
        private String name;
        private String phone;
        private String email;
        private String address;

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
    }

    // Invoice item info inner class
    public static class InvoiceItemInfo {
        private String medicineName;
        private int quantity;
        private double unitPrice;
        private double totalPrice;

        // Getters and Setters
        public String getMedicineName() { return medicineName; }
        public void setMedicineName(String medicineName) { this.medicineName = medicineName; }
        
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
        
        public double getUnitPrice() { return unitPrice; }
        public void setUnitPrice(double unitPrice) { this.unitPrice = unitPrice; }
        
        public double getTotalPrice() { return totalPrice; }
        public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
    }

    // Main class getters and setters
    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }
    
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    
    public String getPharmacyName() { return pharmacyName; }
    public void setPharmacyName(String pharmacyName) { this.pharmacyName = pharmacyName; }
    
    public String getPharmacyAddress() { return pharmacyAddress; }
    public void setPharmacyAddress(String pharmacyAddress) { this.pharmacyAddress = pharmacyAddress; }
    
    public String getPharmacyPhone() { return pharmacyPhone; }
    public void setPharmacyPhone(String pharmacyPhone) { this.pharmacyPhone = pharmacyPhone; }
    
    public CustomerInfo getCustomer() { return customer; }
    public void setCustomer(CustomerInfo customer) { this.customer = customer; }
    
    public List<InvoiceItemInfo> getItems() { return items; }
    public void setItems(List<InvoiceItemInfo> items) { this.items = items; }
    
    public double getSubtotal() { return subtotal; }
    public void setSubtotal(double subtotal) { this.subtotal = subtotal; }
    
    public double getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(double discountAmount) { this.discountAmount = discountAmount; }
    
    public double getTaxAmount() { return taxAmount; }
    public void setTaxAmount(double taxAmount) { this.taxAmount = taxAmount; }
    
    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
    
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    
    public String getStaffName() { return staffName; }
    public void setStaffName(String staffName) { this.staffName = staffName; }
    
    public String getInvoiceFooterNote() { return invoiceFooterNote; }
    public void setInvoiceFooterNote(String invoiceFooterNote) { this.invoiceFooterNote = invoiceFooterNote; }
}
