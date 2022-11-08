import { Stack } from '@mui/material';

export interface MenuItemWithIconProps {
  icon: React.ReactElement;
  iconColor?: string;
  text: string;
}

export default function MenuItemWithIcon({ icon, text }: MenuItemWithIconProps) {
  return (
    <Stack direction={'row'} spacing={1} alignItems="center">
      {icon}
      <span>{text}</span>
    </Stack>
  );
}
