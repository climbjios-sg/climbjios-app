import { Grid } from '@mui/material';
import EmptyContent from '../../../../components/EmptyContent';
import SupportButton from '../../../../components/SupportButton';

export default function ErrorContent() {
  return (
    <Grid sx={{ width: '100%', mt: 2 }} item>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <EmptyContent sx={{ py: 3 }} title="We have an error! That's embarassing 😢" />
        <SupportButton />
      </div>
    </Grid>
  );
}
