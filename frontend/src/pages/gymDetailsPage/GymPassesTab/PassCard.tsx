// @mui
import { Stack, Typography, Box, Link } from '@mui/material';
import { IconStyle } from 'src/utils/common';
import IconTextRow from 'src/components/gymDetailsPage/IconTextRow';
import TextIconLabel from 'src/components/TextIconLabel';
import { GymPass } from 'src/@types/gymPass';

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
        minWidth: 36,
        resize: 'none',
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
    <Link target="_blank" href={data.infoUrl}>
      <Stack direction="row" spacing={1.5}>
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

export default PassCard;
