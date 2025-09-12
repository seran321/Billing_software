/**
 * @typedef {Object} SavedBill
 * @property {string} id - Unique identifier for the bill
 * @property {string} billtype- bill type
 * @property {string} customer - Customer name
 * @property {string} address - Address name
 * @property {string} city - City name
 * @property {string} state - State name
 * @property {string} gstno - GST_NO
 * @property {string} invoice - Invoice number from form
 * @property {string} date - Service date
 * @property {Array<{sno: string, name: string, hsn: string, units: string, price: string, gst: string, cgst: string, sgst: string, totalAmount: string , quantityType:string}>} additionalItems - Additional line items
 * @property {string} notes - Additional notes
 * @property {'Paid' | 'Pending' | 'Overdue'} status - Payment status
 * @property {string} createdAt - Creation timestamp
 * @property {string} subtotal - Bill subtotal amount
 * @property {string} taxAmount - Tax amount
 * @property {string} total - Bill total amount
 */

const BILLS_STORAGE_KEY = 'saved_bills';

/**
 * Save a new bill to local storage
 * @param {Object} billData - Bill data without id, invoiceNumber, status, and createdAt
 * @returns {SavedBill} The saved bill with generated fields
 */
export const saveBill = (billData) => {
  const bills = getSavedBills();
  const invoiceNumber = `INV-${new Date().getFullYear()}-${(bills.length + 1).toString().padStart(3, '0')}`;
  
  const newBill = {
    ...billData,
    id: Date.now().toString(),
    invoiceNumber,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  bills.push(newBill);
  localStorage.setItem(BILLS_STORAGE_KEY, JSON.stringify(bills));
  return newBill;
};

/**
 * Update an existing bill in local storage
 * @param {string} id - Bill ID to update
 * @param {Object} billData - Updated bill data
 * @returns {SavedBill} The updated bill
 */
export const updateBill = (id, billData) => {
  const bills = getSavedBills();
  const billIndex = bills.findIndex(bill => bill.id === id);
  
  if (billIndex === -1) {
    throw new Error('Bill not found');
  }

  const existingBill = bills[billIndex];
  const updatedBill = {
    ...existingBill,
    ...billData,
    id: existingBill.id, // Keep original ID
    invoiceNumber: existingBill.invoiceNumber, // Keep original invoice number
    createdAt: existingBill.createdAt, // Keep original creation date
    updatedAt: new Date().toISOString() // Add update timestamp
  };

  bills[billIndex] = updatedBill;
  localStorage.setItem(BILLS_STORAGE_KEY, JSON.stringify(bills));
  return updatedBill;
};

/**
 * Get all saved bills from local storage
 * @returns {Array<SavedBill>} Array of saved bills
 */
export const getSavedBills = () => {
  const stored = localStorage.getItem(BILLS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

/**
 * Get a bill by its ID
 * @param {string} id - Bill ID
 * @returns {SavedBill|null} The bill if found, null otherwise
 */
export const getBillById = (id) => {
  const bills = getSavedBills();
  return bills.find(bill => bill.id === id) || null;
};

/**
 * Update the status of a bill
 * @param {string} id - Bill ID
 * @param {'Paid'|'Pending'|'Overdue'} status - New status
 */
export const updateBillStatus = (id, status) => {
  const bills = getSavedBills();
  const billIndex = bills.findIndex(bill => bill.id === id);
  if (billIndex !== -1) {
    bills[billIndex].status = status;
    bills[billIndex].updatedAt = new Date().toISOString();
    localStorage.setItem(BILLS_STORAGE_KEY, JSON.stringify(bills));
  }
};

/**
 * Delete a bill from storage
 * @param {string} id - Bill ID to delete
 * @returns {boolean} True if bill was found and deleted, false otherwise
 */
export const deleteBill = (id) => {
  const bills = getSavedBills();
  const billIndex = bills.findIndex(bill => bill.id === id);
  
  if (billIndex !== -1) {
    bills.splice(billIndex, 1);
    localStorage.setItem(BILLS_STORAGE_KEY, JSON.stringify(bills));
    return true;
  }
  
  return false;
};