package com.pharmacy.component;

import com.pharmacy.model.Medicine;
import com.pharmacy.repository.MedicineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class InventoryScheduler {

    private static final Logger logger = LoggerFactory.getLogger(InventoryScheduler.class);

    @Autowired
    private MedicineRepository medicineRepository;

    /**
     * Runs every day at midnight to check for expiring medicines.
     * Cron: 0 0 0 * * ?
     */
    @Scheduled(cron = "0 0 0 * * ?")
    public void checkForExpiringMedicines() {
        logger.info("Starting scheduled expiration check...");
        
        LocalDate thirtyDaysFromNow = LocalDate.now().plusDays(30);
        
        List<Medicine> expiringSoon = medicineRepository.findAll().stream()
                .filter(Medicine::isActive)
                .filter(m -> m.getExpiryDate() != null && m.getExpiryDate().isBefore(thirtyDaysFromNow))
                .collect(Collectors.toList());

        if (expiringSoon.isEmpty()) {
            logger.info("No medicines expiring within the next 30 days.");
        } else {
            logger.warn("FOUND {} MEDICINES EXPIRING WITHIN 30 DAYS:", expiringSoon.size());
            expiringSoon.forEach(m -> 
                logger.warn(" - {} (Batch: {}) expires on {}", m.getName(), m.getBatchNumber(), m.getExpiryDate())
            );
        }
    }

    /**
     * Runs every 6 hours to log low stock warnings.
     */
    @Scheduled(fixedRate = 21600000)
    public void logLowStockAlerts() {
        List<Medicine> lowStock = medicineRepository.findLowStockMedicines();
        if (!lowStock.isEmpty()) {
            logger.warn("LOW STOCK ALERT: {} items are below threshold.", lowStock.size());
        }
    }
}
