import { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/store';
import { listGyms } from 'src/store/reducers/gyms';

const useGetGyms = () => {
  const state = useSelector((state) => state.gyms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGyms());
  }, [dispatch]);

  return state;
};

export default useGetGyms;
