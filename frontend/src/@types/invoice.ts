// ----------------------------------------------------------------------

export type InvoiceAddress = {
  id: string;
  name: string;
  address: string;
  company: string;
  email: string;
  phone: string;
};

export type InvoiceItem = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  service: string;
};

export type Invoice = {
  id: string;
  sent: number;
  status: string;
  totalPrice: number;
  invoiceNumber: string;
  subTotalPrice: number;
  taxes: number | string;
  discount: number | string;
  invoiceFrom: InvoiceAddress;
  invoiceTo: InvoiceAddress;
  createDate: Date | number;
  dueDate: Date | number;
  items: InvoiceItem[];
};
