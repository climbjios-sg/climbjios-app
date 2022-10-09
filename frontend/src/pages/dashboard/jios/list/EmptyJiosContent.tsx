import * as React from 'react';
import { Grid, Button } from '@mui/material';
import EmptyContent from 'src/components/EmptyContent';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Link } from 'react-router-dom';

export default function EmptyJiosContent() {
  return (
    <Grid sx={{ width: '100%', mt: 2 }} item>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <EmptyContent
          sx={{ py: 3 }}
          title="There's no Jios now."
          description="Create a Jio and it will show up here."
        />
        <Button component={Link} to={PATH_DASHBOARD.general.jios.create} variant="contained">
          Create a Jio
        </Button>
      </div>
    </Grid>
  );
}
