// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { DEFAULT_TRANSFORM, Transform } from 'src/utils/form';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  children: React.ReactNode;
  transform?: Transform;
};

type Props = IProps & TextFieldProps;

export default function RHFSelect({
  name,
  children,
  transform = DEFAULT_TRANSFORM,
  ...other
}: Props) {
  const { control, getValues } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          inputRef={ref}
          select
          fullWidth
          SelectProps={{ native: true }}
          onChange={(e) => field.onChange(transform.output(e))}
          value={transform.input(getValues(name))}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
