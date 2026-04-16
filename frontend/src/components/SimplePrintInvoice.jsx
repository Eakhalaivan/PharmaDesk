import React, { useEffect } from 'react';

const SimplePrintInvoice = ({ invoiceData, onClose }) => {
  const customerInfo = {
    phone: invoiceData.customerPhone || ''
  };

  useEffect(() => {
    console.log('PrintInvoice mounted with data:', invoiceData);
  }, [invoiceData]);

  const handlePrint = () => {
    console.log('Print button clicked');
    window.print();
  };

  return (
    <>
      {/* Print Styles */}
      <style>{`
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
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
          .print-invoice {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            line-height: 1.4;
          }
          .print-invoice .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .print-invoice .footer {
            text-align: center;
            border-top: 2px solid #000;
            padding-top: 10px;
            margin-top: 20px;
          }
          .print-invoice table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .print-invoice th,
          .print-invoice td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          .print-invoice th {
            background-color: #f5f5f5;
            font-weight: bold;
          }
          .print-invoice .text-right {
            text-align: right;
          }
          .print-invoice .text-center {
            text-align: center;
          }
          .print-invoice .bold {
            font-weight: bold;
          }
          .print-invoice .mb-20 {
            margin-bottom: 20px;
          }
          .print-invoice .mt-20 {
            margin-top: 20px;
          }
        }
      `}</style>

      {/* Print Controls */}
      <div className="no-print fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Invoice Ready to Print</h3>
          <p className="text-gray-600 mb-6">Click "Print Invoice" to generate a printable invoice. You can also save it as PDF.</p>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Invoice
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Printable Invoice */}
      <div className="print-invoice">
        {/* Header */}
        <div className="header">
          <h1 className="text-2xl font-bold mb-2">PHARMADESK PRO</h1>
          <p className="text-sm">Pharmacy Management System</p>
          <p className="text-sm">123 Healthcare Street, Medical District</p>
          <p className="text-sm">Phone: +91 98765 43210 | Email: info@pharmadesk.com</p>
          <p className="text-sm">GSTIN: 29AAAPL1234C1ZV | DL No: PHRM-2023-001</p>
        </div>

        {/* Invoice Info */}
        <div className="mb-20">
          <div className="flex justify-between mb-10">
            <div>
              <h2 className="text-xl font-bold mb-2">TAX INVOICE</h2>
              <p className="bold">Invoice #: {invoiceData.invoiceNumber}</p>
              <p>Date: {invoiceData.date}</p>
              <p>Time: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="text-right">
              <p className="bold">Bill To:</p>
              <p>{invoiceData.customerName}</p>
              <p>{customerInfo.phone || 'N/A'}</p>
              <p>Payment: CASH</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table className="mb-20">
          <thead>
            <tr>
              <th width="5%">#</th>
              <th width="40%">Medicine Name</th>
              <th width="15%">Qty</th>
              <th width="15%">Unit Price</th>
              <th width="15%">GST</th>
              <th width="10%" className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-right">Rs.{item.price.toFixed(2)}</td>
                <td className="text-right">Rs.{(item.price * 0.12).toFixed(2)}</td>
                <td className="text-right bold">Rs.{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-20">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span>Subtotal:</span>
              <span className="bold">Rs.{invoiceData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>SGST (6%):</span>
              <span>Rs.{(invoiceData.tax / 2).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>CGST (6%):</span>
              <span>Rs.{(invoiceData.tax / 2).toFixed(2)}</span>
            </div>
            {invoiceData.totalAmount - invoiceData.subtotal - invoiceData.tax > 0 && (
              <div className="flex justify-between py-2">
                <span>Service Charge:</span>
                <span>Rs.{(invoiceData.totalAmount - invoiceData.subtotal - invoiceData.tax).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-3 border-t-2 border-black font-bold text-lg">
              <span>Total Amount:</span>
              <span>Rs.{invoiceData.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Amount in Words:</span>
              <span className="text-sm italic">{numberToWords(invoiceData.totalAmount)} Rupees Only</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <p className="bold mb-2">Cashier:</p>
              <p>System Generated</p>
            </div>
            <div className="text-right">
              <p className="bold mb-2">Authorized Signatory</p>
              <p>_________________________</p>
            </div>
          </div>
          <p className="text-center text-sm mb-2">
            ** This is a computer generated invoice and does not require signature **
          </p>
          <p className="text-center text-sm">
            Thank you for visiting PharmaDesk Pro! | For queries, call: +91 98765 43210
          </p>
          <p className="text-center text-xs mt-4">
            * Medicine once sold will not be taken back * Please check medicines before leaving *
          </p>
        </div>
      </div>
    </>
  );
};

// Helper function to convert number to words
function numberToWords(num) {
  const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
  if (num === 0) return 'zero';
  if (num < 20) return a[Math.floor(num)];
  if (num < 100) return b[Math.floor(num / 10)] + ' ' + a[num % 10];
  if (num < 1000) return a[Math.floor(num / 100)] + ' hundred ' + numberToWords(num % 100);
  if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' thousand ' + numberToWords(num % 1000);
  return numberToWords(Math.floor(num / 100000)) + ' lakh ' + numberToWords(num % 100000);
}

export default SimplePrintInvoice;
