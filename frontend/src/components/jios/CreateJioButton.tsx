import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../Iconify';

export default function CreateJioButton() {
  return (
    <Button
      size="large"
      component={Link}
      startIcon={<Iconify icon={'eva:plus-outline'} color='white' />}
      to={PATH_DASHBOARD.general.jios.create}
      variant="contained"
      fullWidth
    >
      Create A Jio
    </Button>
  );
}
