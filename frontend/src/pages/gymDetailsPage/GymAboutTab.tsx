// @mui
import {
  Card,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
} from '@mui/material';
import { GymDetails } from 'src/@types/gymDetails';
import { IconStyle } from 'src/utils/common';
import IconTextRow from 'src/components/gymDetailsPage/IconTextRow';
import palette from 'src/theme/palette';
import { Stack } from '@mui/system';
import { useState } from 'react';

export default function GymAboutTab({ gymDetails }: { gymDetails: GymDetails }) {
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

  const [operatingHoursDialogOpen, setOperatingHoursDialogOpen] = useState(false);

  return (
    <Stack padding={2}>
      <Card sx={{ padding: 2, pl: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6">About</Typography>
          {gymDetails.address && (
            <Stack direction="row">
              <IconStyle icon="material-symbols:route-outline" color={palette.light.grey[700]} />
              <Link
                target="_blank"
                href={'https://www.google.com/maps/search/?api=1&query=' + gymDetails.address}
                variant="overline"
              >
                {gymDetails.address}
                <IconStyle
                  icon="mingcute:external-link-line"
                  color={palette.light.grey[700]}
                  sx={{ ml: 1, verticalAlign: 'text-bottom' }}
                />
              </Link>
            </Stack>
          )}
          {gymDetails.socialUrl && (
            <Link target="_blank" href={gymDetails.socialUrl}>
              <IconTextRow
                icon={<IconStyle icon="mdi:instagram" color="#d62976" />}
                textVariant="body2"
                text={`@${gymDetails.socialUrl.split('.com/')[1].split('?')[0]}`}
                sx={{ textDecoration: 'underline' }}
              />
            </Link>
          )}
          {gymDetails.website && (
            <Link target="_blank" href={gymDetails.website}>
              <IconTextRow
                icon={<IconStyle icon="mdi:search-globe" />}
                textVariant="body2"
                text="Website"
                sx={{ textDecoration: 'underline' }}
              />
            </Link>
          )}
          <Link style={{ cursor: 'pointer' }} onClick={() => setOperatingHoursDialogOpen(true)}>
            <IconTextRow
              icon={<IconStyle icon="mdi:shop-hours-outline" />}
              textVariant="body2"
              text={gymDetails.openNow}
              sx={{ textDecoration: 'underline' }}
            />
          </Link>
          <Dialog
            open={operatingHoursDialogOpen}
            onClose={() => setOperatingHoursDialogOpen(false)}
          >
            <DialogTitle>
              Operating Hours
              <Typography variant="subtitle2" fontSize={10}>
                Sourced from Google
              </Typography>
            </DialogTitle>
            <DialogContent>
              <List>
                {gymDetails.operatingHours.map((hours, index) => (
                  <ListItem key={index}>{hours}</ListItem>
                ))}
              </List>
            </DialogContent>
          </Dialog>
          {climbingTypes.length > 0 && (
            <IconTextRow
              icon={
                <IconStyle icon="mdi:checkbox-multiple-outline" color={palette.light.grey[700]} />
              }
              headerVariant="subtitle2"
              headerText="Routes offered"
              textVariant="body2"
              text={climbingTypes.join(', ')}
            />
          )}
          {gymDetails.passSharing && (
            <IconTextRow
              icon={<IconStyle icon="mingcute:coupon-fill" color="#b281e3" />}
              headerVariant="subtitle2"
              headerText="Pass-sharing conditions"
              textVariant="body2"
              text={gymDetails.passSharing}
            />
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
