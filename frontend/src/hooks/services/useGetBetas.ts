import { ListBetasRequest } from '../../@types/beta';
import { getBetas } from 'src/services/betas';
import { useSelector } from '../../store';

export default function useGetBetas() {
  const myLocalBetaVideos = useSelector((state) => state.myLocalBetaVideos.data);

  return async (params: ListBetasRequest) => {
    const betas = await getBetas(params);
    betas.data.data.results.forEach((beta) => {
      if (beta.id in myLocalBetaVideos) {
        beta.videoUrl = myLocalBetaVideos[beta.id];
      }
    });
    return betas;
  };
}
