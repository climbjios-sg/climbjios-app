import { useNavigate } from 'react-router-dom';
import Iconify from '../../../../components/Iconify';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useDispatch, useSelector } from '../../../../store';
import { setJioSearchForm } from '../../../../store/reducers/jioSearchForm';
import JiosForm, { JioFormValues } from '../form/JiosForm';

export default function JiosSearch() {
  const dispatch = useDispatch();
  const jioFormValues = useSelector((state) => state.jioSearchForm.data);
  const navigate = useNavigate();

  const handleSearch = async (data: JioFormValues) => {
    dispatch(setJioSearchForm(data));
    navigate(PATH_DASHBOARD.general.jios.root);
  };

  return (
    <JiosForm
      isSearch
      onSubmit={handleSearch}
      submitLabel="Search"
      submitIcon={<Iconify icon={'eva:search-outline'} width={24} height={24} />}
      defaultValues={jioFormValues || undefined}
    />
  );
}
