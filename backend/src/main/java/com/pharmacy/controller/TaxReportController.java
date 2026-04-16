package com.pharmacy.controller;

import com.pharmacy.dto.TaxReportResponse;
import com.pharmacy.service.TaxReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/tax-reports")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TaxReportController {

    @Autowired
    private TaxReportService taxReportService;

    @PostMapping("/generate")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<TaxReportResponse> generateTaxReport(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        TaxReportResponse report = taxReportService.generateTaxReport(startDate, endDate);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/monthly/{year}/{month}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<TaxReportResponse> getMonthlyTaxReport(
            @PathVariable int year,
            @PathVariable int month) {
        TaxReportResponse report = taxReportService.generateMonthlyTaxReport(year, month);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/yearly/{year}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<TaxReportResponse> getYearlyTaxReport(@PathVariable int year) {
        TaxReportResponse report = taxReportService.generateYearlyTaxReport(year);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/download")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<byte[]> downloadTaxReport(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
            @RequestParam(defaultValue = "pdf") String format) {
        
        byte[] reportData = taxReportService.downloadTaxReport(startDate, endDate, format);
        
        String filename = "tax-report-" + startDate + "-to-" + endDate + "." + format;
        MediaType mediaType = format.equalsIgnoreCase("pdf") ? 
                MediaType.APPLICATION_PDF : 
                format.equalsIgnoreCase("excel") ? 
                MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") :
                MediaType.parseMediaType("text/csv");
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        headers.setContentDispositionFormData("attachment", filename);
        
        return new ResponseEntity<>(reportData, headers, HttpStatus.OK);
    }

    @GetMapping("/download/monthly/{year}/{month}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<byte[]> downloadMonthlyTaxReport(
            @PathVariable int year,
            @PathVariable int month,
            @RequestParam(defaultValue = "pdf") String format) {
        
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
        
        byte[] reportData = taxReportService.downloadTaxReport(startDate, endDate, format);
        
        String filename = "monthly-tax-report-" + year + "-" + month + "." + format;
        MediaType mediaType = format.equalsIgnoreCase("pdf") ? 
                MediaType.APPLICATION_PDF : 
                format.equalsIgnoreCase("excel") ? 
                MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") :
                MediaType.parseMediaType("text/csv");
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        headers.setContentDispositionFormData("attachment", filename);
        
        return new ResponseEntity<>(reportData, headers, HttpStatus.OK);
    }

    @GetMapping("/download/yearly/{year}")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<byte[]> downloadYearlyTaxReport(
            @PathVariable int year,
            @RequestParam(defaultValue = "pdf") String format) {
        
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year, 12, 31);
        
        byte[] reportData = taxReportService.downloadTaxReport(startDate, endDate, format);
        
        String filename = "yearly-tax-report-" + year + "." + format;
        MediaType mediaType = format.equalsIgnoreCase("pdf") ? 
                MediaType.APPLICATION_PDF : 
                format.equalsIgnoreCase("excel") ? 
                MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") :
                MediaType.parseMediaType("text/csv");
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        headers.setContentDispositionFormData("attachment", filename);
        
        return new ResponseEntity<>(reportData, headers, HttpStatus.OK);
    }
}
