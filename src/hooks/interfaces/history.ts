// =============================== REQUEST ==================================



// =============================== RESPONSE =================================
// export interface IHistoryData extends IPaginationMeta {
//   results: ITransaction[];
// }

// =============================== INTERFACES ===============================
export interface ITransaction {
  id: string;
  amount: number;
  status: string;
  description: string;
  transaction: string;
  userId: string;
  type: string;
  currency: string;
  fee: number;
  createdAt: string;
}
