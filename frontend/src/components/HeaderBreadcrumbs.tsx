import { ReactNode } from 'react';
// @mui
import { Box, Typography, Link } from '@mui/material';
//
import Breadcrumbs, { Props as BreadcrumbsProps } from './Breadcrumbs';

// ----------------------------------------------------------------------

interface Props extends BreadcrumbsProps {
  action?: ReactNode;
  heading?: string;
  description?: string;
  moreLink?: string | string[];
}

export default function HeaderBreadcrumbs({
  links,
  action,
  heading = '',
  description = '',
  moreLink = '' || [],
  sx,
  ...other
}: Props) {
  return (
    <Box sx={{ mb: 0, ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Breadcrumbs links={links} {...other} />
          <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
            {description}
          </Typography>
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {typeof moreLink === 'string' ? (
          <Link href={moreLink} target="_blank" rel="noopener" variant="body2">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
