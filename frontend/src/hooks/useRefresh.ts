import { useCallback } from 'react';
import { useDispatch } from 'src/store';
import { refreshView } from 'src/store/reducers/ui';

const useRefresh = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(refreshView());
  }, [dispatch]);
};

export default useRefresh;
