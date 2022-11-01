import * as React from 'react';
import { Grid } from '@mui/material';
import EmptyContent from 'src/components/EmptyContent';
import CreateJioButton from './CreateJioButton';

interface EmptyJiosContentProps {
  title: string;
  description: string;
}

export default function EmptyJiosContent({ title, description }: EmptyJiosContentProps) {
  return (
    <Grid sx={{ width: '100%', mt: 2 }} item>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <EmptyContent sx={{ py: 3, pb: 0 }} title={title} description={description} />
        <CreateJioButton />
      </div>
    </Grid>
  );
}
