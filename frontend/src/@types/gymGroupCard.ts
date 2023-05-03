import { GymPreviewData } from "src/@types/gymDetails";
import { GymGroup } from "src/@types/gymGroup";

export type GymGroupCardData = Omit<GymGroup, "id" | "gymOutlets"> & {
  id: string;
  gymOutlets: GymGroupCardOutletData[];
}

export type GymGroupCardOutletData = Omit<GymPreviewData, "id"> & {
  id: string;
}
