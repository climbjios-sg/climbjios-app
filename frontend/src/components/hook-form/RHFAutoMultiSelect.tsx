// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, Autocomplete, TextFieldProps, Checkbox } from '@mui/material';
import { Option } from 'src/@types';
import Iconify from '../Iconify';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options?: Option[];
};
type Props = IProps & TextFieldProps;

const icon = <Iconify icon={'carbon:checkbox'} />;
const checkedIcon = <Iconify icon={'carbon:checkbox-checked-filled'} />;

export default function RHFAutoMultiSelect({ name, options = [], ...other }: Props) {
  const { control, setValue, getValues } = useFormContext();
  const selectedOptions = useMemo(() => {
    const selectedValues = new Set(getValues(name));
    return options.filter((option) => selectedValues.has(option.value));
  }, [getValues, name, options]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          options={options}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          onChange={(event, value) => {
            setValue(
              name,
              value.map((option) => option.value)
            );
          }}
          value={selectedOptions}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...field}
              {...params}
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              {...other}
            />
          )}
        />
      )}
    />
  );
}
