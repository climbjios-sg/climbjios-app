import { Avatar, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface NameAvatarProps {
  name: string;
  src?: string;
  sx?: SxProps<Theme>;
}

// NameAvatar generates an avatar based on name if image src is not found
export default function NameAvatar({ name, src, sx }: NameAvatarProps) {
  if (src) {
    return <Avatar src={src} alt={name} sx={sx} />;
  }

  return <Avatar sx={sx}>{name[0]}</Avatar>;
}
