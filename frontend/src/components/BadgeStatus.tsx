// @mui
import { Theme, useTheme, styled } from '@mui/material/styles';
import { BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export type BadgeStatusEnum =
  | 'away'
  | 'busy'
  | 'unread'
  | 'online'
  | 'offline'
  | 'invisible'
  | string;

type BadgeSize = 'small' | 'medium' | 'large';

const RootStyle = styled('span')(
  ({
    theme,
    ownerState,
  }: {
    theme: Theme;
    ownerState: {
      size: BadgeSize;
      status: BadgeStatusEnum;
    };
  }) => {
    const { status, size } = ownerState;

    return {
      width: 10,
      height: 10,
      display: 'flex',
      borderRadius: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      '&:before, &:after': {
        content: "''",
        borderRadius: 1,
        backgroundColor: theme.palette.common.white,
      },

      ...(size === 'small' && { width: 8, height: 8 }),

      ...(size === 'large' && { width: 12, height: 12 }),

      ...(status === 'offline' && { backgroundColor: 'transparent' }),

      ...(status === 'away' && {
        backgroundColor: theme.palette.warning.main,
        '&:before': {
          width: 2,
          height: 4,
          transform: 'translateX(1px) translateY(-1px)',
        },
        '&:after': {
          width: 2,
          height: 4,
          transform: 'translateY(1px) rotate(125deg)',
        },
      }),

      ...(status === 'busy' && {
        backgroundColor: theme.palette.error.main,
        '&:before': { width: 6, height: 2 },
      }),

      ...(status === 'online' && {
        backgroundColor: theme.palette.success.main,
      }),

      ...(status === 'invisible' && {
        backgroundColor: theme.palette.text.disabled,
        '&:before': {
          width: 6,
          height: 6,
          borderRadius: '50%',
        },
      }),

      ...(status === 'unread' && {
        backgroundColor: theme.palette.info.main,
      }),
    };
  }
);

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  size?: BadgeSize;
  status?: BadgeStatusEnum;
}

export default function BadgeStatus({ size = 'medium', status = 'offline', sx }: Props) {
  const theme = useTheme();

  return <RootStyle ownerState={{ status, size }} sx={sx} theme={theme} />;
}
