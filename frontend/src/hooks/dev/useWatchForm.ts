import { useEffect } from 'react';
import { UseFormWatch, FieldValues } from 'react-hook-form';

const useWatchForm = (watch: UseFormWatch<FieldValues>) => {
  const formData = watch();
  useEffect(() => {
    console.log(formData);
  }, [formData]);
};

export default useWatchForm;
