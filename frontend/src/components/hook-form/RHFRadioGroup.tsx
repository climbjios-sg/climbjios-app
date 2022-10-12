// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Radio,
  RadioGroup,
  FormHelperText,
  RadioGroupProps,
  FormControlLabel,
} from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  options: {
    label: string;
    value: any;
  }[];
};

type Props = IProps & RadioGroupProps;

export default function RHFRadioGroup({ name, options, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <div ref={ref}>
          <RadioGroup {...field} {...other}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error >
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
