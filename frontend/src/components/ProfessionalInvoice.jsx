import React, { useEffect } from 'react';

const ProfessionalInvoice = ({ invoiceData, onClose }) => {
  useEffect(() => {
    console.log('ProfessionalInvoice mounted with data:', invoiceData);
  }, [invoiceData]);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', month: 'numeric', day: 'numeric' 
  });

  const subtotal = invoiceData.subtotal || 0;
  const tax = invoiceData.tax || invoiceData.taxAmount || 0;
  const totalAmount = invoiceData.totalAmount || 0;
  
  const pstAmount = tax / 2;
  const gstAmount = tax / 2;

  // Mock barcode generation
  const renderBarcode = (w = "100%", h = "30px") => (
    <svg width={w} height={h} preserveAspectRatio="none" viewBox="0 0 100 30" style={{ shapeRendering: 'crispEdges' }}>
      {[...Array(20)].map((_, i) => (
        <rect key={i} x={i * 5 + (Math.random() * 2)} y="0" width={Math.random() * 2 + 1} height="30" fill="#000"/>
      ))}
    </svg>
  );

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            background: white;
            font-family: 'Courier New', Courier, monospace;
            color: #000;
          }
          .no-print {
            display: none !important;
          }
        }
        
        .po-font {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 11px;
          color: #000;
          line-height: 1.4;
        }
        .po-bold { font-weight: bold; }
        .po-border-bottom { border-bottom: 1px solid #777; }
        .po-border-top { border-top: 1px solid #777; }
        .po-table { width: 100%; border-collapse: collapse; }
        .po-table th { border-bottom: 1px solid #777; text-align: left; padding: 4px 2px; font-size: 11px; font-weight: bold; }
        .po-table td { padding: 4px 2px; vertical-align: top; font-size: 11px; }
      `}</style>

      {/* Screen Overlay */}
      <div className="print-modal-wrapper fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-full">
          
          {/* Header Actions */}
          <div className="no-print border-b border-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50">
             <div>
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Purchase Order View</h3>
               <p className="text-slate-500 font-medium text-sm">Classic PO receipt layout loaded.</p>
             </div>
             <div className="flex gap-3 w-full sm:w-auto">
                <button onClick={onClose} className="flex-1 sm:flex-none border border-slate-200 bg-white text-slate-600 px-6 py-2.5 rounded-xl hover:bg-slate-50 font-bold transition-colors">
                  Cancel
                </button>
                <button onClick={handlePrint} className="flex-1 sm:flex-none bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-500 flex items-center justify-center gap-2 font-bold transition-all shadow-md hover:shadow-emerald-500/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                  Print / Download
                </button>
             </div>
          </div>

          {/* Scrollable Preview Area */}
          <div className="overflow-y-auto p-4 sm:p-8 bg-slate-100/50 flex-1 flex justify-center">
             
             {/* THE ACTUAL INVOICE TARGET */}
             <div className="print-container w-full max-w-[210mm] bg-white p-8 shadow-sm border border-slate-200 po-font">
                
                {/* Top Address */}
                <div style={{ marginBottom: '20px' }}>
                  <div>PharmaDesk Store</div>
                  <div>123 Medical Complex</div>
                  <div>Mumbai, MH</div>
                  <div>400001</div>
                </div>

                {/* Title */}
                <div className="text-center" style={{ marginBottom: '5px' }}>
                   <span style={{ fontSize: '15px', textDecoration: 'underline' }}>Order</span>
                </div>

                {/* From / Ship To */}
                <div className="flex justify-between" style={{ marginBottom: '40px' }}>
                   <div style={{ width: '45%' }}>
                      <div><span className="po-bold">From:</span></div>
                      <div style={{ marginTop: '10px' }}>
                         {invoiceData.customerName || invoiceData.customerId || "Walk-in Customer"}
                      </div>
                   </div>
                   <div style={{ width: '45%' }}>
                      <div><span className="po-bold">Ship To:</span></div>
                      <div style={{ marginTop: '10px' }}>
                         {invoiceData.customerName || invoiceData.customerId || "Walk-in Customer"}<br/>
                         Same as billing
                      </div>
                   </div>
                </div>

                {/* Purchase Order Line */}
                <div className="flex justify-between items-end po-border-bottom" style={{ paddingBottom: '5px', marginBottom: '10px' }}>
                   <div><span className="po-bold">Purchase Order#: {invoiceData.invoiceNumber || '9085'}</span></div>
                   <div className="flex items-center gap-4">
                      <div><span className="po-bold">Order #: {invoiceData.id?.slice(-4) || '2899'} [Open]</span></div>
                      <div style={{ width: '100px' }}>{renderBarcode('100%', '20px')}</div>
                   </div>
                </div>

                {/* Meta 3-Cols */}
                <div className="flex po-border-bottom" style={{ paddingBottom: '10px', marginBottom: '20px', fontSize: '10px' }}>
                   <div style={{ flex: 1 }}>
                     <div>Program: <span className="po-bold">pharmacyOS</span></div>
                     <div>Created on: <span className="po-bold">{currentDate}</span></div>
                     <div>Shipping Agent: <span className="po-bold">[None]</span></div>
                     <div>Total Items: <span className="po-bold">{invoiceData.items?.length || 0}</span></div>
                     <div>Resource: </div>
                   </div>
                   <div style={{ flex: 1 }}>
                     <div>Job: </div>
                     <div>Order Date: <span className="po-bold">{currentDate}</span></div>
                     <div>Package Tracking#: </div>
                     <div>Total Net Weight: <span className="po-bold">0.5</span></div>
                     <div>Comment: <span className="po-bold">Express Handover</span></div>
                   </div>
                   <div style={{ flex: 1 }}>
                     <div>Site: </div>
                     <div>Due: <span className="po-bold">{currentDate}</span></div>
                     <div>Service Type: </div>
                     <div>Total Gross Weight: <span className="po-bold">0.6</span></div>
                     <div>Total Volume: <span className="po-bold">0</span></div>
                   </div>
                </div>

                {/* Items Table */}
                <table className="po-table" style={{ marginBottom: '30px' }}>
                   <thead>
                      <tr>
                        <th style={{ width: '15%' }}>Item Part#</th>
                        <th style={{ width: '5%' }}>-</th>
                        <th style={{ width: '15%' }}>Item Part#</th>
                        <th style={{ width: '25%' }}>Description</th>
                        <th style={{ width: '8%', textAlign: 'center' }}>Quantity</th>
                        <th style={{ width: '10%' }}>Unit of Measure</th>
                        <th style={{ width: '8%', textAlign: 'right' }}>Unit Price</th>
                        <th style={{ width: '8%', textAlign: 'right' }}>Net Price</th>
                        <th style={{ width: '8%', textAlign: 'right' }}>Extended Price</th>
                      </tr>
                   </thead>
                   <tbody>
                      {invoiceData.items?.map((item, i) => {
                        const price = (item.unitPrice || item.price || 0);
                        const extPrice = price * item.quantity;
                        return (
                          <React.Fragment key={i}>
                            <tr>
                              <td rowSpan="2" style={{ paddingRight: '10px' }}>
                                 <div style={{ marginTop: '5px' }}>{renderBarcode('100%', '30px')}</div>
                              </td>
                              <td style={{ textAlign: 'center' }}>[None]</td>
                              <td>{item.batchNumber || `LS-${i+2}`}</td>
                              <td>{item.medicineName || item.productName}</td>
                              <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                              <td>Each</td>
                              <td style={{ textAlign: 'right' }}>{price.toFixed(2)}</td>
                              <td style={{ textAlign: 'right' }}>{price.toFixed(2)}</td>
                              <td style={{ textAlign: 'right' }}>{extPrice.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td colSpan="8" style={{ height: '30px' }}></td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                   </tbody>
                </table>

                {/* Totals Section */}
                <div className="flex justify-end">
                   <div style={{ width: '300px' }}>
                     <div className="po-border-bottom po-bold" style={{ textAlign: 'right', marginBottom: '5px' }}>
                       <span style={{ textDecoration: 'underline' }}>Total Charges</span>
                     </div>
                     <table style={{ width: '100%', fontSize: '11px', textAlign: 'right' }}>
                        <tbody>
                          <tr>
                            <td className="po-bold" style={{ textAlign: 'left' }}>Item Subtotal</td>
                            <td>{invoiceData.items?.length || 1}</td>
                            <td>{subtotal.toFixed(2)}</td>
                            <td>{subtotal.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td className="po-bold" style={{ textAlign: 'left' }}>Shipping</td>
                            <td>1</td>
                            <td>0.00</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td className="po-bold" style={{ textAlign: 'left' }}>Cartons</td>
                            <td>0</td>
                            <td>0.00</td>
                            <td>0.00</td>
                          </tr>
                        </tbody>
                     </table>

                     <div className="po-border-top" style={{ marginTop: '10px', paddingTop: '5px' }}>
                        <div className="flex justify-between" style={{ marginBottom: '2px' }}>
                          <span className="po-bold">Order Charges Total:</span>
                          <span className="po-bold">{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between" style={{ marginBottom: '2px' }}>
                          <span>Discount ({(invoiceData.discountAmount ? (invoiceData.discountAmount/subtotal*100).toFixed(2) : '0.00')}%):</span>
                          <span>{invoiceData.discountAmount ? invoiceData.discountAmount.toFixed(2) : '0'}</span>
                        </div>
                        <div className="flex justify-between" style={{ marginBottom: '2px' }}>
                          <span>Net Discount:</span>
                          <span>{invoiceData.discountAmount ? invoiceData.discountAmount.toFixed(2) : '0'}</span>
                        </div>
                        <div className="flex justify-between" style={{ marginBottom: '2px' }}>
                          <span className="po-bold">Sub Total:</span>
                          <span className="po-bold">{(subtotal - (invoiceData.discountAmount || 0)).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between" style={{ marginBottom: '2px' }}>
                          <span>PST (8%):</span>
                          <span>{pstAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between" style={{ marginBottom: '2px', paddingBottom: '10px' }}>
                          <span>GST (6%):</span>
                          <span>{gstAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between po-border-top" style={{ paddingTop: '5px' }}>
                          <span className="po-bold">Total:</span>
                          <span className="po-bold">{totalAmount.toFixed(2)}</span>
                        </div>
                     </div>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalInvoice;
