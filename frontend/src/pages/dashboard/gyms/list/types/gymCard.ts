export interface GymCardData {
  name: string;
  logoUrl: string
  gymLocations: GymOutletData[];
}

export interface GymOutletData {
  isClosed: boolean;
  gymId: number;
  name: string;
  address: string;
}
