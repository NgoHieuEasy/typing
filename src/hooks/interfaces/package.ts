// =============================== REQUEST ==================================

// =============================== RESPONSE =================================

// export interface IPackageData extends IPaginationMeta {
//   results: IPackage[];
// }
// export interface IUserPackageData extends IPaginationMeta {
//   results: IUserPackage[];
// }
// export interface IStatictisData extends IPaginationMeta {
//   results: IStatistical[];
// }
// export interface ITradeData extends IPaginationMeta {
//   results: ITrade[];
// }

// =============================== INTERFACES ===============================

export interface IStaticItem {
  packageId: IPackage;
  amount: number;
  investPercent: number;

}

export interface IStatistical {
  data: IStaticItem[];
  createdAt: string;
  id: string;
}
export interface IPackage {
  totalInvest: number;
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  duration: number;
  isActived: boolean;
  interest: number;
  minRate: number;
  maxRate: number;
  max: number;
  min: number;
  createdAt: string;
}

export interface IPackageId extends IPackage {
  totalInvest: number;
  blockTime: number;
}

export interface IUserPackage {
  status: "SUCCESS" | "PENDING" | "FAILED";
  activatedAt: string;
  refund: "PENDING" | "APPROVED" | "REJECTED";
  blockTime: number;
  userId: string;
  packageId: IPackageId;
  amount: number;
  expiredAt: string;
  id: string;
}

export interface ITrade {
  amount: number;
  closePrice: number;
  entryPrice: number;
  leverage: number;
  percentage: number;
  profit: number;
  symbol: string;
  side: string;
  packageId: string;
  holdingQuantity: number;
  liquidation: number;
  margin: number;
  tradingFloor: string;
  type: string;
  tradingFloorImage: string;
  createdAt: string;
  closeTime: string;
  id: string;
}


export interface IListRef {
  id: string;
  wallet: string;
  commission: number;
}
