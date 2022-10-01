import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';

// ----------------------------------------------------------------------

const useAuth = () => useContext(AuthContext);

export default useAuth;
