import { SxProps } from '@mui/material';
import { Stack } from '@mui/system';
import Iconify from 'src/components/Iconify';

export interface SelectLabelProps {
  icon?: string;
  text?: string;
  iconColor?: string;
  sx?: SxProps;
}

export default function SelectLabel({
  icon = '',
  text = '',
  iconColor = '',
  sx,
}: SelectLabelProps) {
  return (
    <Stack
      sx={{
        position: 'absolute',
        left: 10,
        top: 8,
        pointerEvents: 'none',
        userSelect: 'none',
        cursor: 'pointer',
        ...sx,
      }}
      direction="row"
      alignItems="center"
      spacing={0.8}
    >
      <Iconify icon={icon} width={20} height={20} color={iconColor} />
      <span style={{ color: 'gray' }}>{text}</span>
    </Stack>
  );
}
