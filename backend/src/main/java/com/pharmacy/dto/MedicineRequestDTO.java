package com.pharmacy.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class MedicineRequestDTO {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @Positive(message = "Price must be greater than zero")
    private double price;

    private String image;

    @NotBlank(message = "Category is required")
    private String category;

    @Min(value = 0, message = "Stock count cannot be negative")
    private int stockCount;

    @NotBlank(message = "Manufacturer is required")
    private String manufacturer;

    @FutureOrPresent(message = "Expiry date cannot be in the past")
    private LocalDate expiryDate;

    private String batchNumber;

    @Min(value = 1, message = "Low stock threshold must be at least 1")
    private int lowStockThreshold;

    public MedicineRequestDTO() {}

    // Getters
    public String getName() { return name; }
    public String getDescription() { return description; }
    public double getPrice() { return price; }
    public String getImage() { return image; }
    public String getCategory() { return category; }
    public int getStockCount() { return stockCount; }
    public String getManufacturer() { return manufacturer; }
    public LocalDate getExpiryDate() { return expiryDate; }
    public String getBatchNumber() { return batchNumber; }
    public int getLowStockThreshold() { return lowStockThreshold; }

    // Setters
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(double price) { this.price = price; }
    public void setImage(String image) { this.image = image; }
    public void setCategory(String category) { this.category = category; }
    public void setStockCount(int stockCount) { this.stockCount = stockCount; }
    public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }
    public void setLowStockThreshold(int lowStockThreshold) { this.lowStockThreshold = lowStockThreshold; }
}
