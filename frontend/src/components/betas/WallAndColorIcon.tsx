import { Stack } from '@mui/system';
import { useMemo } from 'react';
import Iconify from '../Iconify';
import { displayBetaColor } from './utils';

type WallAndColorIconProps = {
  color: string;
  wall: string;
};

export default function WallAndColorIcon({ color, wall }: WallAndColorIconProps) {
  const betaColor = displayBetaColor(color);

  const renderedIcon = useMemo(() => {
    switch (wall.toLowerCase()) {
      case 'vertical':
        return (
          <Iconify
            sx={{ transform: 'rotate(90deg)' }}
            icon={'icon-park-twotone:rectangle-one'}
            color={betaColor}
          />
        );
      case 'overhang': {
        return (
          <Iconify
            sx={{ transform: 'rotate(90deg)' }}
            icon={'icon-park-twotone:right-angle'}
            color={betaColor}
          />
        );
      }
      case 'slab': {
        return <Iconify icon={'icon-park-twotone:right-angle'} color={betaColor} />;
      }
      default:
        return <></>;
    }
  }, [betaColor, wall]);

  return <Stack sx={{ transform: 'translateY(2px)' }}>{renderedIcon}</Stack>;
}
