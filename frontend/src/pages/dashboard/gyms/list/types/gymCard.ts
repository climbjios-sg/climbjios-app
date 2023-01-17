export interface GymCardData {
  id: string;
  name: string;
  logoUrl?: string | undefined;
  gymOutlets: GymOutletData[];
}

export interface GymOutletData {
  isClosed: boolean;
  gymId: string;
  name: string;
  address: string;
}
