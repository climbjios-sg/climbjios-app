import { SxProps, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { useMemo } from 'react';
import { Color } from '../../@types/color';
import { Wall, WallName } from '../../@types/wall';
import Iconify from '../Iconify';
import { displayBetaColor } from './utils';

type WallIconProps = {
  wall: Wall['name'];
  color?: Color['name'];
  sx?: SxProps;
};

export default function WallIcon({ color, wall, sx }: WallIconProps) {
  const theme = useTheme();
  const betaColor = displayBetaColor(color ? color.toLowerCase() : theme.palette.primary.main);

  const renderedIcon = useMemo(() => {
    switch (wall) {
      case WallName.Vertical:
        return (
          <Iconify
            sx={{ transform: 'rotate(90deg)' }}
            icon={'icon-park-twotone:rectangle-one'}
            color={betaColor}
          />
        );
      case WallName.Overhang: {
        return (
          <Iconify
            sx={{ transform: 'rotate(90deg)' }}
            icon={'icon-park-twotone:right-angle'}
            color={betaColor}
          />
        );
      }
      case WallName.Slab: {
        return <Iconify icon={'icon-park-twotone:right-angle'} color={betaColor} />;
      }
      default:
        return <></>;
    }
  }, [betaColor, wall]);

  return <Stack sx={sx}>{renderedIcon}</Stack>;
}
