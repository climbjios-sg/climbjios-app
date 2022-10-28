import { getCreatorBetas } from '../../services/betas';
import { ListBetasRequest } from '../../@types/beta';
import { useSelector } from '../../store';

type UseGetCreatorBetasProps = {
  // True iff the user is the creator
  isMine: boolean;
};

export default function useGetCreatorBetas({ isMine }: UseGetCreatorBetasProps) {
  const myLocalBetaVideos = useSelector((state) => state.myLocalBetaVideos.data);

  return async (creatorId: string, params: ListBetasRequest) => {
    const betas = await getCreatorBetas(creatorId, params);
    // If user is not the creator, then there can't be any matching local beta videos, hence just return early
    if (!isMine) {
      return betas;
    }

    betas.data.data.results.forEach((beta) => {
      if (beta.id in myLocalBetaVideos) {
        beta.videoUrl = myLocalBetaVideos[beta.id];
      }
    });
    return betas;
  };
}
