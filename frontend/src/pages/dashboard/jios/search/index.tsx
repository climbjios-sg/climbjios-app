import { useNavigate } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useDispatch, useSelector } from 'src/store';
import { clearJiosSearchForm, setJiosSearchForm } from 'src/store/reducers/jiosSearchForm';
import JiosSearchForm from '../forms/JiosSearchForm';
import { JioSearchFormValues } from '../forms/utils';

export default function JiosSearch() {
  const dispatch = useDispatch();
  const jioFormValues = useSelector((state) => state.jioSearchForm.data);
  const navigate = useNavigate();

  const handleSearch = async (data: JioSearchFormValues) => {
    dispatch(setJiosSearchForm(data));
    navigate(PATH_DASHBOARD.general.jios.root);
  };

  return (
    <JiosSearchForm
      onClear={() => {
        dispatch(clearJiosSearchForm());
        navigate(PATH_DASHBOARD.general.jios.root);
      }}
      onSubmit={handleSearch}
      submitLabel="Search"
      submitIcon={<Iconify icon={'eva:search-outline'} width={24} height={24} />}
      defaultValues={jioFormValues || undefined}
    />
  );
}
