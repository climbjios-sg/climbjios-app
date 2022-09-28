import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { Link } from '@mui/material';
//
import { NavListProps } from '../type';
import { PaperStyle } from './style';
import NavItem from './NavItem';
import { getActive, isExternalLink } from '..';

// ----------------------------------------------------------------------

type NavListRootProps = {
  data: NavListProps;
  depth: number;
  hasChildren: boolean;
};

export default function NavList({ data, depth, hasChildren }: NavListRootProps) {
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const active = getActive(data.path, pathname);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickItem = () => {
    if (!hasChildren) {
      navigate(data.path);
    }
  };

  return (
    <>
      {isExternalLink(data.path) ? (
        <Link href={data.path} target="_blank" rel="noopener" underline="none">
          <NavItem item={data} depth={depth} open={open} active={active} />
        </Link>
      ) : (
        <NavItem
          item={data}
          depth={depth}
          open={open}
          active={active}
          ref={menuRef}
          onClick={handleClickItem}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />
      )}

      {hasChildren && (
        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={
            depth === 1
              ? { vertical: 'bottom', horizontal: 'left' }
              : { vertical: 'center', horizontal: 'right' }
          }
          transformOrigin={
            depth === 1
              ? { vertical: 'top', horizontal: 'left' }
              : { vertical: 'center', horizontal: 'left' }
          }
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          <NavSubList data={data.children} depth={depth} />
        </PaperStyle>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
};

function NavSubList({ data, depth }: NavListSubProps) {
  return (
    <>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChildren={!!list.children}
        />
      ))}
    </>
  );
}
