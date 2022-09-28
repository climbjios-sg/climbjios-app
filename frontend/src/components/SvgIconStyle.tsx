import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  src: string;
}

export default function SvgIconStyle({ src, sx }: Props) {
  return (
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  );
}
