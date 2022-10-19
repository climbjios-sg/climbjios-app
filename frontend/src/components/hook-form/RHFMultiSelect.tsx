// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextFieldProps } from '@mui/material';
import Select from 'react-select';
import { Option } from 'src/@types';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options?: Option[];
  isLoading?: boolean;
};

type Props = IProps & TextFieldProps;

// TODO: find an MUI alternative of react-select
export default function RHFMultiSelect({ name, options = [], isLoading = false }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <Select
          options={options}
          isLoading={isLoading}
          onChange={onChange}
          isMulti={true}
          onBlur={onBlur}
          value={value}
          name={name}
          ref={ref}
        />
      )}
    />
  );
}
