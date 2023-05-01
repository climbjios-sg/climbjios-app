// @mui
import { Typography } from '@mui/material';
import { Stack, SxProps } from '@mui/system';
import TextIconLabel from 'src/components/TextIconLabel';

type typographyVariant =
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'inherit'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | undefined;

const IconTextRow = ({
  icon,
  isEndIcon,
  textVariant,
  text,
  headerText,
  headerVariant,
  sx,
}: {
  icon: JSX.Element;
  isEndIcon?: boolean;
  textVariant: typographyVariant;
  text: string;
  headerText?: string;
  headerVariant?: typographyVariant;
  sx?: SxProps;
}) =>
  TextIconLabel({
    icon: icon,
    endIcon: isEndIcon,
    value: (
      <Stack>
        {headerText && <Typography variant={headerVariant}>{headerText}</Typography>}
        <Typography sx={sx} variant={textVariant}>
          {text}
        </Typography>
      </Stack>
    ),
  });

  export default IconTextRow