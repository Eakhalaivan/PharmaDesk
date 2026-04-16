import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '../services/axiosClient';
import { format } from 'date-fns';

const PrintInvoice = ({ invoiceId, onClose }) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch invoice print data
  const { data, error, isLoading: queryLoading } = useQuery({
    queryKey: ['invoice-print', invoiceId],
    queryFn: async () => {
      const response = await axiosClient.get(`/api/v1/invoices/${invoiceId}/print`);
      return response.data;
    },
    enabled: !!invoiceId,
    onSuccess: (data) => {
      setInvoiceData(data);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching invoice data:', error);
      setIsLoading(false);
    }
  });

  const handlePrint = () => {
    if (invoiceData) {
      window.print();
    }
  };

  useEffect(() => {
    // Add print-specific styles when component mounts
    const printStyles = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-invoice, .print-invoice * {
          visibility: visible;
        }
        .print-invoice {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = printStyles;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  if (queryLoading || isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading invoice data...</p>
        </div>
      </div>
    );
  }

  if (error || !invoiceData) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Error Loading Invoice</h3>
          <p className="text-slate-500 mb-4">Failed to load invoice data. Please try again.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Print Controls */}
      <div className="no-print sticky top-0 bg-white border-b border-slate-200 p-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Print Invoice</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Invoice
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="print-invoice max-w-4xl mx-auto p-8 bg-white">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{invoiceData.pharmacyName}</h1>
              <p className="text-slate-600">{invoiceData.pharmacyAddress}</p>
              <p className="text-slate-600">{invoiceData.pharmacyPhone}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-slate-900">INVOICE</h2>
              <p className="text-slate-600">#{invoiceData.invoiceNumber}</p>
              <p className="text-slate-600">
                Date: {format(new Date(invoiceData.date), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
        </div>

        {/* Customer & Staff Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Bill To:</h3>
            <p className="text-slate-600">{invoiceData.customer.name}</p>
            <p className="text-slate-600">{invoiceData.customer.phone}</p>
            <p className="text-slate-600">{invoiceData.customer.email}</p>
            <p className="text-slate-600">{invoiceData.customer.address}</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Staff:</h3>
            <p className="text-slate-600">{invoiceData.staffName}</p>
            <p className="text-slate-600">Payment Method: {invoiceData.paymentMethod}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-900">Medicine</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-900">Quantity</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-900">Unit Price</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-900">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index} className="border-b border-slate-200">
                  <td className="py-3 px-4 text-slate-700">{item.medicineName}</td>
                  <td className="py-3 px-4 text-center text-slate-700">{item.quantity}</td>
                  <td className="py-3 px-4 text-right text-slate-700">
                    ${item.unitPrice.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700">
                    ${item.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Subtotal:</span>
              <span className="font-semibold text-slate-900">
                ${invoiceData.subtotal.toFixed(2)}
              </span>
            </div>
            {invoiceData.discountAmount > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Discount:</span>
                <span className="font-semibold text-slate-900">
                  -${invoiceData.discountAmount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Tax:</span>
              <span className="font-semibold text-slate-900">
                ${invoiceData.taxAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-slate-200">
              <span className="font-bold text-slate-900">Total:</span>
              <span className="font-bold text-slate-900 text-lg">
                ${invoiceData.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-center text-slate-600 mb-4">{invoiceData.invoiceFooterNote}</p>
          <p className="text-center text-slate-500 text-sm">
            Thank you for choosing {invoiceData.pharmacyName}!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintInvoice;
