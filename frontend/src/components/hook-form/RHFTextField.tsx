// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { DEFAULT_TRANSFORM, Transform } from 'src/utils/form';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  transform?: Transform;
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({ name, transform = DEFAULT_TRANSFORM, ...other }: Props) {
  const { control, getValues } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        // Note: Have to take out the ref for ref to passed successfully
        // TODO: check if this field is required and automatically toggle `required` prop
        <TextField
          {...field}
          inputRef={ref}
          fullWidth
          onChange={(e) => field.onChange(transform.output(e))}
          value={transform.input(getValues(name))}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
