import { useEffect } from 'react';
import { UseFormWatch, FieldValues } from 'react-hook-form';
import { isDevelopment } from 'src/config';

const useDevWatchForm = <TFieldValues extends FieldValues>(watch: UseFormWatch<TFieldValues>) => {
  const formData = watch();
  useEffect(() => {
    if (!isDevelopment) {
      return;
    }

    console.log(formData);
  }, [formData]);
};

export default useDevWatchForm;
