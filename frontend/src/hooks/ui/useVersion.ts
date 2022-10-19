import { useSelector } from 'src/store';

const useVersion = () => useSelector((state) => state.ui.viewVersion);

export default useVersion;
