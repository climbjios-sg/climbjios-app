import { useSelector } from 'src/store';

const useAuthProvider = () => useSelector((state) => state.auth.authProvider);

export default useAuthProvider;


