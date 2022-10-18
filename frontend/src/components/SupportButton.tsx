import { Button } from '@mui/material';
import { SUPPORT_TELEGRAM } from '../config';

export default function SupportButton() {
  return <Button href={SUPPORT_TELEGRAM} target="_blank" rel="noopener" variant="contained">Contact Support</Button>;
}
