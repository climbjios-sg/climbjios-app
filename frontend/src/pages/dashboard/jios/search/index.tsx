import * as React from 'react';
import Iconify from 'src/components/Iconify';
import { useNavigate } from 'react-router-dom';
import JiosForm, { JioFormValues } from '../JiosForm';
import { useDispatch, useSelector } from 'src/store';
import { setJioFormValues } from 'src/store/reducers/jioFormValues';

export default function JiosSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jioFormValues = useSelector((state) => state.jioFormValues.data);

  const handleSearch = async (data: JioFormValues) => {
    dispatch(setJioFormValues(data));
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
