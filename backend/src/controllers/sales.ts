import { SaleI, Sales } from "../models/sales";

const ONE_WEEK_MS = 6.048e8;

const withinWeek = (sale: SaleI) => {
  return Date.now() - ONE_WEEK_MS <= sale.time;
};

export const getAllSalesWithinWeek = async (): Promise<SaleI[]> => {
  const sales = await Sales.find({}).exec();
  sales.filter(withinWeek);
  return sales;
};
