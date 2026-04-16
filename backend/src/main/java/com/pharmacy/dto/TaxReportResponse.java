package com.pharmacy.dto;

import java.time.LocalDate;
import java.util.List;

public class TaxReportResponse {
    private LocalDate reportDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private double totalSales;
    private double totalTax;
    private double netSales;
    private List<TaxReportItem> taxBreakdown;
    private List<SalesReportItem> salesBreakdown;

    // Getters and Setters
    public LocalDate getReportDate() { return reportDate; }
    public void setReportDate(LocalDate reportDate) { this.reportDate = reportDate; }
    
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    
    public double getTotalSales() { return totalSales; }
    public void setTotalSales(double totalSales) { this.totalSales = totalSales; }
    
    public double getTotalTax() { return totalTax; }
    public void setTotalTax(double totalTax) { this.totalTax = totalTax; }
    
    public double getNetSales() { return netSales; }
    public void setNetSales(double netSales) { this.netSales = netSales; }
    
    public List<TaxReportItem> getTaxBreakdown() { return taxBreakdown; }
    public void setTaxBreakdown(List<TaxReportItem> taxBreakdown) { this.taxBreakdown = taxBreakdown; }
    
    public List<SalesReportItem> getSalesBreakdown() { return salesBreakdown; }
    public void setSalesBreakdown(List<SalesReportItem> salesBreakdown) { this.salesBreakdown = salesBreakdown; }

    // Inner classes
    public static class TaxReportItem {
        private String taxName;
        private double taxPercentage;
        private double taxableAmount;
        private double taxAmount;

        public String getTaxName() { return taxName; }
        public void setTaxName(String taxName) { this.taxName = taxName; }
        
        public double getTaxPercentage() { return taxPercentage; }
        public void setTaxPercentage(double taxPercentage) { this.taxPercentage = taxPercentage; }
        
        public double getTaxableAmount() { return taxableAmount; }
        public void setTaxableAmount(double taxableAmount) { this.taxableAmount = taxableAmount; }
        
        public double getTaxAmount() { return taxAmount; }
        public void setTaxAmount(double taxAmount) { this.taxAmount = taxAmount; }
    }

    public static class SalesReportItem {
        private String categoryName;
        private double totalSales;
        private double taxAmount;
        private int itemCount;

        public String getCategoryName() { return categoryName; }
        public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
        
        public double getTotalSales() { return totalSales; }
        public void setTotalSales(double totalSales) { this.totalSales = totalSales; }
        
        public double getTaxAmount() { return taxAmount; }
        public void setTaxAmount(double taxAmount) { this.taxAmount = taxAmount; }
        
        public int getItemCount() { return itemCount; }
        public void setItemCount(int itemCount) { this.itemCount = itemCount; }
    }
}
