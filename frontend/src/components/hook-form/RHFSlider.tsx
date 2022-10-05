// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Slider, SliderProps } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & SliderProps;

export default function RHFSlider({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Slider {...field} valueLabelDisplay="auto" {...other} />}
    />
  );
}
