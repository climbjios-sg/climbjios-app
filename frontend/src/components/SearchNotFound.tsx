import { Paper, PaperProps, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends PaperProps {
  searchQuery?: string;
}

export default function SearchNotFound({ searchQuery = '', ...other }: Props) {
  return searchQuery ? (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or using complete words.
      </Typography>
    </Paper>
  ) : (
    <></>
  );
}
