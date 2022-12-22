import { LoanI, Loans } from "../models/loans";

export const getAllLoans = (): Promise<LoanI[]> => {
  return Loans.find({}).exec();
};

export const removeLoan = async (tokenId: number): Promise<void> => {
  const loan: LoanI = {
    _id: tokenId,
  };
  await Loans.deleteOne(loan).exec();
};
