import { Divider } from '@mui/material';

export default function ExceptLastDivider({ length, index }: { length: number; index: number }) {
  return <div>{index < length - 1 && <Divider />}</div>;
}
