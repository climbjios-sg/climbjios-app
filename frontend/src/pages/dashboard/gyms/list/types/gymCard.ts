export interface GymCardData {
  id: number;
  name: string;
  logoUrl?: string | undefined;
  gymOutlets: GymOutletData[];
}

export interface GymOutletData {
  isClosed: boolean;
  gymId: number;
  name: string;
  address: string;
}
