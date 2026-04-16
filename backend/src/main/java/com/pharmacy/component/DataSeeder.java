package com.pharmacy.component;

import com.pharmacy.model.Medicine;
import com.pharmacy.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only seed data if repository is empty
        if (medicineRepository.count() == 0) {
            seedMedicines();
        }
    }

    private void seedMedicines() {
        List<Medicine> initialMedicines = Arrays.asList(
            createMedicine("Paracetamol 500mg", "tablets", 39.00, 
                "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?w=500&h=500&fit=crop",
                "Effective fever reducer and analgesic for mild to moderate pain relief.", 
                45, "PharmaCare Labs", LocalDate.now().plusMonths(18), "BN-9281", 20),
                
            createMedicine("Ibuprofen 400mg", "tablets", 109.00,
                "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=500&fit=crop",
                "NSAID anti-inflammatory for pain, fever and arthritis.",
                32, "MediCore Pharmaceuticals", LocalDate.now().plusMonths(24), "BN-9282", 15),
                
            createMedicine("Amoxicillin 500mg", "tablets", 189.00,
                "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=500&fit=crop",
                "Broad-spectrum antibiotic for bacterial infections.",
                28, "BioHealth Labs", LocalDate.now().plusMonths(12), "BN-9283", 10),
                
            createMedicine("Cetirizine 10mg", "tablets", 79.00,
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=500&fit=crop",
                "Antihistamine for allergy relief.",
                67, "AllergyCare Inc", LocalDate.now().plusMonths(30), "BN-9284", 25),
                
            createMedicine("Metformin 500mg", "tablets", 149.00,
                "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500&h=500&fit=crop",
                "Oral diabetes medication for type 2 diabetes.",
                54, "DiaMed Solutions", LocalDate.now().plusMonths(20), "BN-9285", 18)
        );

        medicineRepository.saveAll(initialMedicines);
        System.out.println("✅ Sample medicines seeded successfully!");
    }

    private Medicine createMedicine(String name, String category, double price, 
                                   String image, String description, int stockCount, 
                                   String manufacturer, LocalDate expiryDate, 
                                   String batchNumber, int lowStockThreshold) {
        Medicine medicine = new Medicine();
        medicine.setName(name);
        medicine.setCategory(category);
        medicine.setPrice(price);
        medicine.setImage(image);
        medicine.setDescription(description);
        medicine.setStockCount(stockCount);
        medicine.setExpiryDate(expiryDate);
        medicine.setBatchNumber(batchNumber);
        medicine.setLowStockThreshold(lowStockThreshold);
        medicine.setUnit("Tablet");
        medicine.setPrescriptionRequired(false);
        return medicine;
    }
}
