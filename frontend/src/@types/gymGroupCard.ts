import { GymPreviewData } from "src/@types/gymData";
import { GymGroup } from "src/@types/gymGroup";

export type GymGroupCardData = Omit<GymGroup, "id" | "gymOutlets"> & {
  id: string;
  gymOutlets: GymGroupCardOutletData[];
}

export type GymGroupCardOutletData = Omit<GymPreviewData, "id"> & {
  id: string;
}
