package com.pharmacy.service.impl;

import com.pharmacy.dto.BillingReceiptResponse;
import com.pharmacy.dto.PrintInvoiceResponse;
import com.pharmacy.exception.ResourceNotFoundException;
import com.pharmacy.model.Invoice;
import com.pharmacy.model.InvoiceItem;
import com.pharmacy.repository.InvoiceRepository;
import com.pharmacy.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Override
    @Transactional(readOnly = true)
    public PrintInvoiceResponse getPrintInvoiceData(String invoiceId) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + invoiceId));

        PrintInvoiceResponse response = new PrintInvoiceResponse();
        
        // Basic invoice info
        response.setInvoiceNumber(invoice.getInvoiceNumber());
        response.setDate(invoice.getCreatedAt());
        response.setSubtotal(invoice.getSubtotal());
        response.setDiscountAmount(invoice.getDiscountAmount());
        response.setTaxAmount(invoice.getTaxAmount());
        response.setTotalAmount(invoice.getTotalAmount());
        response.setPaymentMethod(invoice.getPaymentMethod());
        response.setStaffName(invoice.getStaffId()); // You might want to fetch staff name from user service

        // Pharmacy info (hardcoded for now, you can fetch from settings)
        response.setPharmacyName("MediCare Pharmacy");
        response.setPharmacyAddress("123 Health Street, Medical City, MC 12345");
        response.setPharmacyPhone("+1 (555) 123-4567");
        response.setInvoiceFooterNote("Thank you for your purchase! Please keep this receipt for your records.");

        // Customer info
        PrintInvoiceResponse.CustomerInfo customer = new PrintInvoiceResponse.CustomerInfo();
        customer.setName("Walk-in Customer"); // You can fetch actual customer if customerId exists
        customer.setPhone("N/A");
        customer.setEmail("N/A");
        customer.setAddress("N/A");
        response.setCustomer(customer);

        // Invoice items
        List<PrintInvoiceResponse.InvoiceItemInfo> items = invoice.getItems().stream()
                .map(this::convertToInvoiceItemInfo)
                .collect(Collectors.toList());
        response.setItems(items);

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public Invoice getInvoiceById(String id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Invoice> getAllInvoices(Pageable pageable) {
        return invoiceRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Invoice> getInvoicesByCustomerId(String customerId) {
        return invoiceRepository.findByCustomerId(customerId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Invoice> getInvoicesByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return invoiceRepository.findByDateRange(startDate, endDate);
    }

    @Override
    @Transactional
    public Invoice createInvoice(Invoice invoice) {
        // Generate invoice number if not provided
        if (invoice.getInvoiceNumber() == null || invoice.getInvoiceNumber().isEmpty()) {
            invoice.setInvoiceNumber(generateInvoiceNumber());
        }
        
        // Validate invoice number uniqueness
        if (invoiceRepository.existsByInvoiceNumber(invoice.getInvoiceNumber())) {
            throw new IllegalArgumentException("Invoice number already exists: " + invoice.getInvoiceNumber());
        }

        return invoiceRepository.save(invoice);
    }

    @Override
    @Transactional
    public Invoice updateInvoice(String id, Invoice invoice) {
        Invoice existingInvoice = getInvoiceById(id);
        
        // Update fields (excluding invoice number and creation date)
        existingInvoice.setCustomerId(invoice.getCustomerId());
        existingInvoice.setStaffId(invoice.getStaffId());
        existingInvoice.setSubtotal(invoice.getSubtotal());
        existingInvoice.setTaxAmount(invoice.getTaxAmount());
        existingInvoice.setDiscountAmount(invoice.getDiscountAmount());
        existingInvoice.setTotalAmount(invoice.getTotalAmount());
        existingInvoice.setPaymentMethod(invoice.getPaymentMethod());
        
        return invoiceRepository.save(existingInvoice);
    }

    @Override
    @Transactional
    public void deleteInvoice(String id) {
        Invoice invoice = getInvoiceById(id);
        invoiceRepository.delete(invoice);
    }

    @Override
    @Transactional(readOnly = true)
    public String generateInvoiceNumber() {
        String prefix = "INV";
        LocalDateTime now = LocalDateTime.now();
        String dateStr = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        
        // Find the last invoice number for today
        String todayPrefix = prefix + dateStr;
        List<Invoice> todayInvoices = invoiceRepository.findByDateRange(
                now.toLocalDate().atStartOfDay(),
                now.toLocalDate().atTime(23, 59, 59)
        );
        
        int sequence = todayInvoices.size() + 1;
        return String.format("%s%04d", todayPrefix, sequence);
    }

    private PrintInvoiceResponse.InvoiceItemInfo convertToInvoiceItemInfo(InvoiceItem item) {
        PrintInvoiceResponse.InvoiceItemInfo itemInfo = new PrintInvoiceResponse.InvoiceItemInfo();
        itemInfo.setMedicineName(item.getMedicineName());
        itemInfo.setQuantity(item.getQuantity());
        itemInfo.setUnitPrice(item.getUnitPrice());
        itemInfo.setTotalPrice(item.getTotalPrice());
        return itemInfo;
    }

    @Override
    @Transactional(readOnly = true)
    public BillingReceiptResponse getBillingReceipt(String invoiceId) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + invoiceId));

        BillingReceiptResponse response = new BillingReceiptResponse();
        response.setId(invoice.getId());
        response.setInvoiceNumber(invoice.getInvoiceNumber());
        response.setCreatedAt(invoice.getCreatedAt());
        response.setCustomerName("Walk-in Customer"); // Default if no customer
        response.setCustomerPhone("");
        response.setStaffName("Pharmacy Staff"); // Default if no staff
        response.setPaymentMethod(invoice.getPaymentMethod());
        response.setPaymentStatus(invoice.getPaymentStatus());
        response.setSubtotal(invoice.getSubtotal());
        response.setTaxAmount(invoice.getTaxAmount());
        response.setDiscountAmount(invoice.getDiscountAmount());
        response.setTotalAmount(invoice.getTotalAmount());
        response.setAmountPaid(invoice.getTotalAmount()); // Assuming full payment
        response.setBalanceDue(0.0);

        List<BillingReceiptResponse.ReceiptItem> receiptItems = invoice.getItems().stream()
                .map(this::convertToReceiptItem)
                .collect(Collectors.toList());
        response.setItems(receiptItems);

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] downloadBillingReceipt(String invoiceId, String format) {
        BillingReceiptResponse receipt = getBillingReceipt(invoiceId);
        
        StringBuilder content = new StringBuilder();
        content.append("========================================\n");
        content.append("           PHARMACY RECEIPT           \n");
        content.append("========================================\n\n");
        content.append("Invoice #: ").append(receipt.getInvoiceNumber()).append("\n");
        content.append("Date: ").append(receipt.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))).append("\n");
        content.append("Payment Method: ").append(receipt.getPaymentMethod()).append("\n");
        content.append("Payment Status: ").append(receipt.getPaymentStatus()).append("\n\n");
        
        content.append("Customer: ").append(receipt.getCustomerName()).append("\n");
        content.append("Staff: ").append(receipt.getStaffName()).append("\n\n");
        
        content.append("----------------------------------------\n");
        content.append("               ITEMS                   \n");
        content.append("----------------------------------------\n");
        
        for (BillingReceiptResponse.ReceiptItem item : receipt.getItems()) {
            content.append(String.format("%-20s %3d x %8.2f = %8.2f\n", 
                    item.getMedicineName(), 
                    item.getQuantity(), 
                    item.getUnitPrice(), 
                    item.getTotalPrice()));
        }
        
        content.append("----------------------------------------\n");
        content.append(String.format("Subtotal: %35.2f\n", receipt.getSubtotal()));
        content.append(String.format("Tax: %38.2f\n", receipt.getTaxAmount()));
        content.append(String.format("Discount: %34.2f\n", receipt.getDiscountAmount()));
        content.append(String.format("Total: %37.2f\n", receipt.getTotalAmount()));
        content.append(String.format("Amount Paid: %32.2f\n", receipt.getAmountPaid()));
        content.append(String.format("Balance Due: %32.2f\n", receipt.getBalanceDue()));
        content.append("========================================\n");
        content.append("        Thank you for your visit!       \n");
        content.append("========================================\n");
        
        return content.toString().getBytes();
    }

    private BillingReceiptResponse.ReceiptItem convertToReceiptItem(InvoiceItem item) {
        BillingReceiptResponse.ReceiptItem receiptItem = new BillingReceiptResponse.ReceiptItem();
        receiptItem.setMedicineName(item.getMedicineName());
        receiptItem.setCategory(""); // Category not available in InvoiceItem
        receiptItem.setQuantity(item.getQuantity());
        receiptItem.setUnitPrice(item.getUnitPrice());
        receiptItem.setTotalPrice(item.getTotalPrice());
        receiptItem.setDiscount(0.0); // Discount not available in InvoiceItem
        return receiptItem;
    }
}
