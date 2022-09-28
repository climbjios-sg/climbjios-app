import { forwardRef, ReactNode } from 'react';
// @mui
import { Variant } from '@mui/material/styles/createTypography';
import { Typography, TypographyProps, LinkProps, Link } from '@mui/material';
// utils
import GetFontValue from '../utils/getFontValue';

// ----------------------------------------------------------------------

type IProps = TypographyProps & LinkProps;

interface Props extends IProps {
  line?: number;
  asLink?: boolean;
  persistent?: boolean;
  children: ReactNode;
  variant?: Variant;
}

const TextMaxLine = forwardRef<HTMLAnchorElement, Props>(
  ({ asLink, variant = 'body1', line = 2, persistent = false, children, sx, ...other }, ref) => {
    const { lineHeight } = GetFontValue(variant);

    const style = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: line,
      WebkitBoxOrient: 'vertical',
      ...(persistent && {
        height: lineHeight * line,
      }),
      ...sx,
    } as const;

    if (asLink) {
      return (
        <Link color="inherit" ref={ref} variant={variant} sx={{ ...style }} {...other}>
          {children}
        </Link>
      );
    }

    return (
      <Typography ref={ref} variant={variant} sx={{ ...style }} {...other}>
        {children}
      </Typography>
    );
  }
);

export default TextMaxLine;
