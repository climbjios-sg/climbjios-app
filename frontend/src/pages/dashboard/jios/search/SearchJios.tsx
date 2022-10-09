import { useNavigate } from 'react-router-dom';
import Iconify from '../../../../components/Iconify';
import { useDispatch, useSelector } from '../../../../store';
import { setJioSearchForm } from '../../../../store/reducers/jioSearchForm';
import JiosForm, { JioFormValues } from '../form/JiosForm';

export default function SearchJios() {
  const dispatch = useDispatch();
  const jioFormValues = useSelector((state) => state.jioSearchForm.data);
  const navigate = useNavigate();

  const handleSearch = async (data: JioFormValues) => {
    dispatch(setJioSearchForm(data));
    navigate('');
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
