package com.pharmacy.service;

import com.pharmacy.dto.TaxReportResponse;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public interface TaxReportService {
    
    TaxReportResponse generateTaxReport(
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    );
    
    TaxReportResponse generateMonthlyTaxReport(int year, int month);
    
    TaxReportResponse generateYearlyTaxReport(int year);
    
    byte[] downloadTaxReport(
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
            String format
    );
}
