package com.pharmacy.controller;

import com.pharmacy.model.Medicine;
import com.pharmacy.model.Invoice;
import com.pharmacy.repository.MedicineRepository;
import com.pharmacy.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/analytics")
public class AnalyticsController {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @GetMapping("/status")
    public Map<String, Long> getInventoryStatus() {
        List<Medicine> all = medicineRepository.findAll();
        LocalDate today = LocalDate.now();
        LocalDate thirtyDaysFromNow = today.plusDays(30);

        long lowStockCount = all.stream()
                .filter(m -> m.getStockQuantity() > 0 && m.getStockQuantity() < m.getLowStockThreshold())
                .count();

        long outOfStockCount = all.stream()
                .filter(m -> m.getStockQuantity() == 0)
                .count();

        long expiringSoonCount = all.stream()
                .filter(m -> m.getExpiryDate() != null && 
                            m.getExpiryDate().isAfter(today) && 
                            m.getExpiryDate().isBefore(thirtyDaysFromNow))
                .count();

        long expiredCount = all.stream()
                .filter(m -> m.getExpiryDate() != null && 
                            (m.getExpiryDate().isBefore(today) || m.getExpiryDate().isEqual(today)))
                .count();

        Map<String, Long> status = new HashMap<>();
        status.put("lowStock", lowStockCount);
        status.put("outOfStock", outOfStockCount);
        status.put("expiringSoon", expiringSoonCount);
        status.put("expired", expiredCount);
        
        return status;
    }

    @GetMapping("/summary")
    public Map<String, Object> getFinancialSummary() {
        List<Invoice> all = invoiceRepository.findAll();
        double totalRevenue = all.stream()
                .filter(i -> "PAID".equalsIgnoreCase(i.getPaymentStatus()))
                .mapToDouble(Invoice::getTotalAmount).sum();
        
        double totalRefunds = all.stream()
                .filter(i -> "REFUNDED".equalsIgnoreCase(i.getPaymentStatus()))
                .mapToDouble(Invoice::getTotalAmount).sum();
        
        long totalOrders = all.size();

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalRevenue", totalRevenue);
        summary.put("totalRefunds", totalRefunds);
        summary.put("totalOrders", totalOrders);
        summary.put("averageOrderValue", totalOrders > 0 ? totalRevenue / totalOrders : 0);
        
        return summary;
    }
}
