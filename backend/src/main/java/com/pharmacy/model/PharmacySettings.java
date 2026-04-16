package com.pharmacy.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pharmacy_settings")
public class PharmacySettings {
    @Id
    private Integer id = 1;

    @Column(nullable = false)
    private String pharmacyName;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String phone;
    private String email;
    private String licenseNumber;

    @Column(columnDefinition = "TEXT")
    private String logoUrl;

    private String currencySymbol = "₹";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "default_tax_id")
    private TaxRate defaultTax;

    private int lowStockDefaultThreshold = 10;

    @Column(columnDefinition = "TEXT")
    private String invoiceFooterNote;

    private LocalDateTime updatedAt;
    private String updatedBy;

    public PharmacySettings() {}

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getPharmacyName() { return pharmacyName; }
    public void setPharmacyName(String pharmacyName) { this.pharmacyName = pharmacyName; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public String getCurrencySymbol() { return currencySymbol; }
    public void setCurrencySymbol(String currencySymbol) { this.currencySymbol = currencySymbol; }
    public TaxRate getDefaultTax() { return defaultTax; }
    public void setDefaultTax(TaxRate defaultTax) { this.defaultTax = defaultTax; }
    public int getLowStockDefaultThreshold() { return lowStockDefaultThreshold; }
    public void setLowStockDefaultThreshold(int lowStockDefaultThreshold) { this.lowStockDefaultThreshold = lowStockDefaultThreshold; }
    public String getInvoiceFooterNote() { return invoiceFooterNote; }
    public void setInvoiceFooterNote(String invoiceFooterNote) { this.invoiceFooterNote = invoiceFooterNote; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
