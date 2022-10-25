// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { DEFAULT_TRANSFORM, SANITIZE_EMPTY_VALUE, Transform } from 'src/utils/form';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  children: React.ReactNode;
  transform?: Transform;
  shouldSanitizeEmptyValue?: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFSelect({
  name,
  children,
  transform = DEFAULT_TRANSFORM,
  shouldSanitizeEmptyValue = false,
  ...other
}: Props) {
  const { control, getValues } = useFormContext();
  const sanitizeEmptyValue = (value: unknown) => {
    const { output } = SANITIZE_EMPTY_VALUE;
    if (!shouldSanitizeEmptyValue) {
      return value;
    }
    return output(value);
  };

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
          defaultValue={transform.input(getValues(name))}
          onChange={(e) => field.onChange(sanitizeEmptyValue(transform.output(e.target.value)))}
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
