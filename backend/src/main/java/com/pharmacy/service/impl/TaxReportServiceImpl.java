package com.pharmacy.service.impl;

import com.pharmacy.dto.TaxReportResponse;
import com.pharmacy.model.Invoice;
import com.pharmacy.model.InvoiceItem;
import com.pharmacy.model.Medicine;
import com.pharmacy.model.TaxRate;
import com.pharmacy.repository.InvoiceRepository;
import com.pharmacy.repository.MedicineRepository;
import com.pharmacy.repository.TaxRateRepository;
import com.pharmacy.service.TaxReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TaxReportServiceImpl implements TaxReportService {

    @Autowired
    private InvoiceRepository invoiceRepository;
    
    @Autowired
    private MedicineRepository medicineRepository;
    
    @Autowired
    private TaxRateRepository taxRateRepository;

    @Override
    public TaxReportResponse generateTaxReport(LocalDate startDate, LocalDate endDate) {
        List<Invoice> invoices = invoiceRepository.findByDateRange(
                startDate.atStartOfDay(), 
                endDate.atStartOfDay().plusDays(1).minusSeconds(1)
        );

        TaxReportResponse report = new TaxReportResponse();
        report.setReportDate(LocalDate.now());
        report.setStartDate(startDate);
        report.setEndDate(endDate);

        // Calculate totals
        double totalSales = 0.0;
        double totalTax = 0.0;
        Map<String, TaxReportResponse.TaxReportItem> taxBreakdownMap = new HashMap<>();
        Map<String, TaxReportResponse.SalesReportItem> salesBreakdownMap = new HashMap<>();

        // Get active tax rates
        List<TaxRate> activeTaxRates = taxRateRepository.findByIsActiveTrue();

        for (Invoice invoice : invoices) {
            for (InvoiceItem item : invoice.getItems()) {
                Medicine medicine = item.getMedicine();
                if (medicine == null) continue;

                double itemTotal = item.getUnitPrice() * item.getQuantity();
                double itemTax = itemTotal * 0.18; // Assuming 18% tax for now
                totalSales += itemTotal;
                totalTax += itemTax;

                // Tax breakdown
                for (TaxRate taxRate : activeTaxRates) {
                    String taxKey = taxRate.getName();
                    TaxReportResponse.TaxReportItem taxItem = taxBreakdownMap.computeIfAbsent(taxKey, k -> {
                        TaxReportResponse.TaxReportItem newItem = new TaxReportResponse.TaxReportItem();
                        newItem.setTaxName(taxRate.getName());
                        newItem.setTaxPercentage(taxRate.getPercentage());
                        newItem.setTaxableAmount(0.0);
                        newItem.setTaxAmount(0.0);
                        return newItem;
                    });
                    
                    taxItem.setTaxableAmount(taxItem.getTaxableAmount() + itemTotal);
                    taxItem.setTaxAmount(taxItem.getTaxAmount() + itemTax);
                }

                // Sales breakdown by category
                String category = medicine.getCategory();
                TaxReportResponse.SalesReportItem salesItem = salesBreakdownMap.computeIfAbsent(category, k -> {
                    TaxReportResponse.SalesReportItem newItem = new TaxReportResponse.SalesReportItem();
                    newItem.setCategoryName(category);
                    newItem.setTotalSales(0.0);
                    newItem.setTaxAmount(0.0);
                    newItem.setItemCount(0);
                    return newItem;
                });
                
                salesItem.setTotalSales(salesItem.getTotalSales() + itemTotal);
                salesItem.setTaxAmount(salesItem.getTaxAmount() + itemTax);
                salesItem.setItemCount(salesItem.getItemCount() + item.getQuantity());
            }
        }

        report.setTotalSales(totalSales);
        report.setTotalTax(totalTax);
        report.setNetSales(totalSales - totalTax);
        report.setTaxBreakdown(new ArrayList<>(taxBreakdownMap.values()));
        report.setSalesBreakdown(new ArrayList<>(salesBreakdownMap.values()));

        return report;
    }

    @Override
    public TaxReportResponse generateMonthlyTaxReport(int year, int month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();
        return generateTaxReport(startDate, endDate);
    }

    @Override
    public TaxReportResponse generateYearlyTaxReport(int year) {
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year, 12, 31);
        return generateTaxReport(startDate, endDate);
    }

    @Override
    public byte[] downloadTaxReport(LocalDate startDate, LocalDate endDate, String format) {
        TaxReportResponse report = generateTaxReport(startDate, endDate);
        
        if ("pdf".equalsIgnoreCase(format)) {
            return generatePdfReport(report);
        } else if ("excel".equalsIgnoreCase(format)) {
            return generateExcelReport(report);
        } else {
            return generateCsvReport(report);
        }
    }

    private byte[] generatePdfReport(TaxReportResponse report) {
        try {
            com.itextpdf.text.Document document = new com.itextpdf.text.Document();
            java.io.ByteArrayOutputStream out = new java.io.ByteArrayOutputStream();
            com.itextpdf.text.pdf.PdfWriter.getInstance(document, out);
            document.open();
            
            document.add(new com.itextpdf.text.Paragraph("Pharmacy Tax Report"));
            document.add(new com.itextpdf.text.Paragraph("Period: " + report.getStartDate() + " to " + report.getEndDate()));
            document.add(new com.itextpdf.text.Paragraph("Generated: " + report.getReportDate()));
            document.add(new com.itextpdf.text.Paragraph("\n"));
            
            document.add(new com.itextpdf.text.Paragraph("Total Sales: ₹" + String.format("%.2f", report.getTotalSales())));
            document.add(new com.itextpdf.text.Paragraph("Total Tax: ₹" + String.format("%.2f", report.getTotalTax())));
            document.add(new com.itextpdf.text.Paragraph("Net Sales: ₹" + String.format("%.2f", report.getNetSales())));
            document.add(new com.itextpdf.text.Paragraph("\n"));
            
            document.add(new com.itextpdf.text.Paragraph("Tax Breakdown:"));
            for (TaxReportResponse.TaxReportItem item : report.getTaxBreakdown()) {
                document.add(new com.itextpdf.text.Paragraph("- " + item.getTaxName() + ": ₹" + String.format("%.2f", item.getTaxAmount())));
            }
            
            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF report", e);
        }
    }

    private byte[] generateExcelReport(TaxReportResponse report) {
        // Generate Excel report
        // For now, return CSV format
        return generateCsvReport(report);
    }

    private byte[] generateCsvReport(TaxReportResponse report) {
        StringBuilder csv = new StringBuilder();
        csv.append("Tax Report\n");
        csv.append("Period,").append(report.getStartDate()).append(" to ").append(report.getEndDate()).append("\n");
        csv.append("Generated,").append(report.getReportDate()).append("\n\n");
        csv.append("Total Sales,").append(String.format("%.2f", report.getTotalSales())).append("\n");
        csv.append("Total Tax,").append(String.format("%.2f", report.getTotalTax())).append("\n");
        csv.append("Net Sales,").append(String.format("%.2f", report.getNetSales())).append("\n\n");
        
        csv.append("Tax Breakdown\n");
        csv.append("Tax Name,Tax Percentage,Taxable Amount,Tax Amount\n");
        for (TaxReportResponse.TaxReportItem item : report.getTaxBreakdown()) {
            csv.append(item.getTaxName()).append(",")
               .append(item.getTaxPercentage()).append("%,")
               .append(String.format("%.2f", item.getTaxableAmount())).append(",")
               .append(String.format("%.2f", item.getTaxAmount())).append("\n");
        }
        
        return csv.toString().getBytes();
    }
}
