/**
 * @typedef {Object} SavedBill2
 * @property {string} id - Unique identifier for the bill
 * @property {string} customer - Customer name
 * @property {string} address - Address name
 * @property {string} city - City name
 * @property {string} state - State name
 * @property {string} gstno - GST_NO
 * @property {string} invoice - Invoice number from form
 * @property {string} createdAt - Creation timestamp
 */

const BILLS_STORAGE_KEY = 'saved_bills02';

/**
 * Save a new bill to local storage
 * @param {Object} billData - Bill data without id, invoiceNumber, status, and createdAt
 * @returns {SavedBill2} The saved bill with generated fields
 */
export const saveBill2 = (billData) => {
  const bills = getSavedBills2();
  
  // Check for duplicate bill (same customer, address, city, and invoice)
  const isDuplicate = bills.some(bill => 
    bill.customer.toLowerCase() === billData.customer.toLowerCase() &&
    bill.address.toLowerCase() === billData.address.toLowerCase() &&
    bill.city.toLowerCase() === billData.city.toLowerCase() &&
    bill.invoice === billData.invoice
  );
  
  if (isDuplicate) {
    throw new Error('Bill with same customer details and invoice number already exists');
  }
  
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
 * @returns {SavedBill2} The updated bill
 */
export const updateBill2 = (id, billData) => {
  const bills = getSavedBills2();
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
 * @returns {Array<SavedBill2>} Array of saved bills
 */
export const getSavedBills2 = () => {
  const stored = localStorage.getItem(BILLS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

/**
 * Get a bill by its ID
 * @param {string} id - Bill ID
 * @returns {SavedBill2|null} The bill if found, null otherwise
 */
export const getBillById2 = (id) => {
  const bills = getSavedBills2();
  return bills.find(bill => bill.id === id) || null;
};

/**
 * Update the status of a bill
 * @param {string} id - Bill ID
 * @param {'Paid'|'Pending'|'Overdue'} status - New status
 */
export const updateBillStatus2 = (id, status) => {
  const bills = getSavedBills2();
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
export const deleteBill2 = (id) => {
  const bills = getSavedBills2();
  const billIndex = bills.findIndex(bill => bill.id === id);
  
  if (billIndex !== -1) {
    bills.splice(billIndex, 1);
    localStorage.setItem(BILLS_STORAGE_KEY, JSON.stringify(bills));
    return true;
  }
  
  return false;
};