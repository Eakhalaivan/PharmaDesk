package com.pharmacy.service;

import com.pharmacy.dto.BillingReceiptResponse;
import com.pharmacy.dto.PrintInvoiceResponse;
import com.pharmacy.model.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface InvoiceService {
    
    PrintInvoiceResponse getPrintInvoiceData(String invoiceId);
    
    Invoice getInvoiceById(String id);
    
    Page<Invoice> getAllInvoices(Pageable pageable);
    
    List<Invoice> getInvoicesByCustomerId(String customerId);
    
    List<Invoice> getInvoicesByDateRange(java.time.LocalDateTime startDate, java.time.LocalDateTime endDate);
    
    Invoice createInvoice(Invoice invoice);
    
    Invoice updateInvoice(String id, Invoice invoice);
    
    void deleteInvoice(String id);
    
    String generateInvoiceNumber();
    
    BillingReceiptResponse getBillingReceipt(String invoiceId);
    
    byte[] downloadBillingReceipt(String invoiceId, String format);
}
