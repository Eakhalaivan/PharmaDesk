package com.pharmacy.dto;

import java.time.LocalDate;

public class MedicineResponseDTO {
    private String id;
    private String name;
    private String description;
    private double price;
    private String image;
    private String category;
    private int stockCount;
    private boolean inStock;
    private double rating;
    private int reviews;
    private String manufacturer;
    private LocalDate expiryDate;
    private String batchNumber;
    private int lowStockThreshold;
    private boolean isActive;

    public MedicineResponseDTO() {}

    public MedicineResponseDTO(String id, String name, String description, double price, String image, String category, int stockCount, boolean inStock, double rating, int reviews, String manufacturer, LocalDate expiryDate, String batchNumber, int lowStockThreshold, boolean isActive) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.category = category;
        this.stockCount = stockCount;
        this.inStock = inStock;
        this.rating = rating;
        this.reviews = reviews;
        this.manufacturer = manufacturer;
        this.expiryDate = expiryDate;
        this.batchNumber = batchNumber;
        this.lowStockThreshold = lowStockThreshold;
        this.isActive = isActive;
    }

    public static MedicineResponseDTOBuilder builder() {
        return new MedicineResponseDTOBuilder();
    }

    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public double getPrice() { return price; }
    public String getImage() { return image; }
    public String getCategory() { return category; }
    public int getStockCount() { return stockCount; }
    public boolean isInStock() { return inStock; }
    public double getRating() { return rating; }
    public int getReviews() { return reviews; }
    public String getManufacturer() { return manufacturer; }
    public LocalDate getExpiryDate() { return expiryDate; }
    public String getBatchNumber() { return batchNumber; }
    public int getLowStockThreshold() { return lowStockThreshold; }
    public boolean isActive() { return isActive; }

    public static class MedicineResponseDTOBuilder {
        private String id, name, description, image, category, manufacturer, batchNumber;
        private double price, rating;
        private int stockCount, reviews, lowStockThreshold;
        private boolean inStock, isActive;
        private LocalDate expiryDate;

        public MedicineResponseDTOBuilder id(String id) { this.id = id; return this; }
        public MedicineResponseDTOBuilder name(String name) { this.name = name; return this; }
        public MedicineResponseDTOBuilder description(String description) { this.description = description; return this; }
        public MedicineResponseDTOBuilder price(double price) { this.price = price; return this; }
        public MedicineResponseDTOBuilder image(String image) { this.image = image; return this; }
        public MedicineResponseDTOBuilder category(String category) { this.category = category; return this; }
        public MedicineResponseDTOBuilder stockCount(int stockCount) { this.stockCount = stockCount; return this; }
        public MedicineResponseDTOBuilder inStock(boolean inStock) { this.inStock = inStock; return this; }
        public MedicineResponseDTOBuilder rating(double rating) { this.rating = rating; return this; }
        public MedicineResponseDTOBuilder reviews(int reviews) { this.reviews = reviews; return this; }
        public MedicineResponseDTOBuilder manufacturer(String manufacturer) { this.manufacturer = manufacturer; return this; }
        public MedicineResponseDTOBuilder expiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; return this; }
        public MedicineResponseDTOBuilder batchNumber(String batchNumber) { this.batchNumber = batchNumber; return this; }
        public MedicineResponseDTOBuilder lowStockThreshold(int lowStockThreshold) { this.lowStockThreshold = lowStockThreshold; return this; }
        public MedicineResponseDTOBuilder isActive(boolean isActive) { this.isActive = isActive; return this; }

        public MedicineResponseDTO build() {
            return new MedicineResponseDTO(id, name, description, price, image, category, stockCount, inStock, rating, reviews, manufacturer, expiryDate, batchNumber, lowStockThreshold, isActive);
        }
    }
}
