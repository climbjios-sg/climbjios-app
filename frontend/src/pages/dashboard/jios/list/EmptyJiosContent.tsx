import * as React from 'react';
import { Grid, Button } from '@mui/material';
import EmptyContent from 'src/components/EmptyContent';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Link } from 'react-router-dom';

interface EmptyJiosContentProps {
  isSearching?: boolean;
}

export default function EmptyJiosContent({ isSearching }: EmptyJiosContentProps) {
  return (
    <Grid sx={{ width: '100%', mt: 2 }} item>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <EmptyContent
          sx={{ py: 3 }}
          title={isSearching ? "There're no Jios that match your search." : "There're no Jios now."}
          description={isSearching ? 'You can create one based on your search filters.' : ''}
        />
        <Button
          size="large"
          component={Link}
          to={PATH_DASHBOARD.general.jios.create}
          variant="contained"
          fullWidth
        >
          Create ClimbJio
        </Button>
      </div>
    </Grid>
  );
}
