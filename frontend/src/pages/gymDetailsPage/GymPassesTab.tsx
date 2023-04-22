// @mui
import { Stack, Card, Typography, Box, Link } from '@mui/material';
import { IconStyle } from 'src/utils/common';
import IconTextRow from 'src/components/gymDetailsPage/IconTextRow';
import TextIconLabel from 'src/components/TextIconLabel';
import { getGymPasses } from 'src/services/gyms';
import { GymPasses } from 'src/@types/gymPasses';
import JioCardLoader from 'src/components/jios/JioCardLoader';
import { GymPass } from 'src/@types/gymPass';
import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { useRequest } from 'ahooks';

export default function GymPassesTab({ gymId }: { gymId: number }) {
  const errorSnackbar = useCustomSnackbar();

  const { data, loading } = useRequest<GymPasses, any>(
    async () => (await getGymPasses(gymId)).data,
    {
      onError: () => errorSnackbar.enqueueError('Failed to load data.'),
    }
  );

  if (loading || !data) {
    return JioCardLoader();
  }

  console.log(data)

  const { gymOutletPasses, gymGroupPasses } = data!;

  if (gymOutletPasses.length === 0 && gymGroupPasses.length === 0) {
    return <Card sx={{ padding: 2, pl: 3 }}>We've got no data for this gym yet!</Card>;
  }

  const PassesCard = ({ title, data }: { title: string; data: GymPass[] }) => (
    <Card sx={{ padding: 2, pl: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h5">{title}</Typography>
        <Stack spacing={2}>
          {data.map((passData: GymPass, index) => (
            <Box key={index}>{PassCard(passData)}</Box>
          ))}
        </Stack>
      </Stack>
    </Card>
  );

  const PassCard = (data: GymPass) => {
    const lowerPassName = data.passName.toLowerCase();
    let mainIconText = '';
    let fontSize = 20;
    let bp = 0;
    if (lowerPassName.includes('multipass')) {
      mainIconText = `x${data.numberOfPasses.toString()}`;
      if (data.numberOfPasses >= 10) {
        fontSize = 18;
      }
    } else if (lowerPassName.includes('subscription')) {
      mainIconText = '∞';
      fontSize = 30;
      bp = 0.3;
    } else {
      mainIconText = 'x1';
    }

    const mainIcon = (
      <Box
        sx={{
          backgroundColor: '#3366FF',
          borderRadius: '8px',
          height: 36,
          width: 36,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: bp,
        }}
      >
        <Typography fontSize={fontSize} color="white" textAlign="center">
          {mainIconText}
        </Typography>
      </Box>
    );

    const priceText = (
      <div>
        <p>
          {data.discountedPrice ? (
            <span>
              <span style={{ textDecorationLine: 'line-through', color: '#FF4842' }}>
                ${data.price}
              </span>
              <span style={{ color: '#3366FF' }}> ${data.discountedPrice}</span>
            </span>
          ) : (
            <span style={{ color: '#3366FF' }}>${data.price}</span>
          )}
          <span style={{ color: '#3366FF' }}>{data.paymentFrequency}</span>
        </p>
        {data.initiationFee && (
          <p>
            <span>Initiation: </span>
            {data.discountedInitiationFee ? (
              <span>
                <span style={{ textDecorationLine: 'line-through', color: '#FF4842' }}>
                  ${data.initiationFee}
                </span>
                <span style={{ color: '#3366FF' }}> ${data.discountedInitiationFee}</span>
              </span>
            ) : (
              <span style={{ color: '#3366FF' }}>${data.initiationFee}</span>
            )}
          </p>
        )}
        {data.freezingFee && (
          <p>
            <span>Freezing: </span>
            <span style={{ color: '#3366FF' }}>${data.freezingFee}/month</span>{' '}
          </p>
        )}
      </div>
    );

    return (
      <Link
        target="_blank"
        href={data.infoUrl}
        // variant="overline"
      >
        <Stack direction="row" spacing={2}>
          {mainIcon}
          <Stack direction="column">
            <Typography variant="subtitle1">{data.passName}</Typography>
            <TextIconLabel icon={<IconStyle icon="entypo:price-tag" />} value={priceText} />
            {data.timeRestriction && (
              <IconTextRow
                icon={<IconStyle icon="ic:round-access-time" />}
                textVariant="body2"
                text={data.timeRestriction}
              />
            )}
            {data.ageRestriction && (
              <IconTextRow
                icon={<IconStyle icon="ic:baseline-child-care" />}
                textVariant="body2"
                text={data.ageRestriction}
              />
            )}
            {data.sharingPolicy && (
              <IconTextRow
                icon={<IconStyle icon="material-symbols:group-add-outline" />}
                textVariant="body2"
                text={data.sharingPolicy}
              />
            )}
            {data.validityPeriod && (
              <IconTextRow
                icon={<IconStyle icon="grommet-icons:validate" />}
                textVariant="body2"
                text={data.validityPeriod}
              />
            )}
            {data.remarks && (
              <IconTextRow
                icon={<IconStyle icon="bx:detail" />}
                textVariant="body2"
                text={data.remarks}
              />
            )}
          </Stack>
        </Stack>
      </Link>
    );
  };

  return (
    <div>
      {gymGroupPasses.length > 0 ? (
        <Stack padding={2} spacing={2}>
          {gymOutletPasses.length > 0 && (
            <PassesCard title="Outlet Passes" data={gymOutletPasses} />
          )}
          <PassesCard title="Multi-Gym Passes" data={gymGroupPasses} />
        </Stack>
      ) : (
        <PassesCard title="Gym Passes" data={gymOutletPasses} />
      )}
    </div>
  );
}
