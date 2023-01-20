// @mui
import { Card, Typography, Link } from '@mui/material';
import { Stack } from '@mui/system';
import { GymData } from 'src/@types/gymData';
import { IconStyle } from 'src/utils/common';
import palette from 'src/theme/palette';

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
  textVariant,
  text,
  headerText,
  headerVariant,
}: {
  icon: JSX.Element;
  textVariant: typographyVariant;
  text: string;
  headerText?: string;
  headerVariant?: typographyVariant;
}) => (
  <Stack direction="row" alignItems="center">
    {icon}
    <Stack>
      {headerText && <Typography variant={headerVariant}>{headerText}</Typography>}
      <Typography variant={textVariant}>{text}</Typography>
    </Stack>
  </Stack>
);

export default function GymAbout({ gymDetails }: { gymDetails: GymData }) {
  const climbingTypes = [];
  if (gymDetails.boulder) {
    climbingTypes.push('boulder');
  }
  if (gymDetails.autoBelay) {
    climbingTypes.push('auto belay');
  }
  if (gymDetails.topRope) {
    climbingTypes.push('top rope');
  }
  if (gymDetails.lead) {
    climbingTypes.push('lead');
  }

  return (
    <Stack padding={2}>
      <Card sx={{ padding: 2, pl: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6">About</Typography>
          <Stack direction="row">
            <IconStyle icon="material-symbols:route-outline" color={palette.light.grey[700]} />
            <Link
              target="_blank"
              href={'https://www.google.com/maps/search/?api=1&query=' + gymDetails.address}
              variant="overline"
            >
              {gymDetails.address}
              <IconStyle
                icon={'mingcute:external-link-line'}
                color={palette.light.grey[700]}
                sx={{ ml: 1, verticalAlign: 'text-bottom' }}
              />
            </Link>
          </Stack>
          <IconTextRow
            icon={
              <IconStyle icon={'mdi:checkbox-multiple-outline'} color={palette.light.grey[700]} />
            }
            headerVariant="subtitle2"
            headerText="Routes offered"
            textVariant="body2"
            text={climbingTypes.join(', ')}
          />
          <IconTextRow
            icon={<IconStyle icon={'mingcute:coupon-fill'} color="#b281e3" />}
            headerVariant="subtitle2"
            headerText="Pass-sharing conditions"
            textVariant="body2"
            text={gymDetails.passSharing}
          />
        </Stack>
      </Card>
    </Stack>
  );
}