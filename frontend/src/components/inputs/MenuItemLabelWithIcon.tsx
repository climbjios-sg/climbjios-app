import { Stack } from '@mui/material';

export interface MenuItemWithIconProps {
  icon: React.ReactElement;
  iconColor?: string;
  text: string;
}

export default function MenuItemWithIcon({ icon, text }: MenuItemWithIconProps) {
  return (
    <Stack direction={'row'} spacing={0.6} alignItems="center" sx={{ width: 100, overflow: 'hidden' }}>
      {icon}
      <span>{text}</span>
    </Stack>
  );
}
