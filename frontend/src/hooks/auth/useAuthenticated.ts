import { useEffect } from 'react';
import useCheckAuth from './useCheckAuth';

const useAuthenticated = () => {
  const checkAuth = useCheckAuth();

  // useEffect(()=>{

  //   checkAuth()

  // })
};

export default useAuthenticated;
