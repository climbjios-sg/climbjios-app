import { ReactNode, createContext, useState, useEffect } from 'react';
// hooks
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------

export type CollapseDrawerContextProps = {
  isCollapse: boolean;
  collapseClick: boolean;
  collapseHover: boolean;
  onToggleCollapse: VoidFunction;
  onHoverEnter: VoidFunction;
  onHoverLeave: VoidFunction;
};

const initialState: CollapseDrawerContextProps = {
  isCollapse: false,
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => {},
  onHoverEnter: () => {},
  onHoverLeave: () => {},
};

const CollapseDrawerContext = createContext(initialState);

type CollapseDrawerProviderProps = {
  children: ReactNode;
};

function CollapseDrawerProvider({ children }: CollapseDrawerProviderProps) {
  const isDesktop = useResponsive('up', 'lg');

  const [collapse, setCollapse] = useState({
    click: false,
    hover: false,
  });

  useEffect(() => {
    if (!isDesktop) {
      setCollapse({
        click: false,
        hover: false,
      });
    }
  }, [isDesktop]);

  const handleToggleCollapse = () => {
    setCollapse({ ...collapse, click: !collapse.click });
  };

  const handleHoverEnter = () => {
    if (collapse.click) {
      setCollapse({ ...collapse, hover: true });
    }
  };

  const handleHoverLeave = () => {
    setCollapse({ ...collapse, hover: false });
  };

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        collapseClick: collapse.click,
        collapseHover: collapse.hover,
        onToggleCollapse: handleToggleCollapse,
        onHoverEnter: handleHoverEnter,
        onHoverLeave: handleHoverLeave,
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  );
}

export { CollapseDrawerProvider, CollapseDrawerContext };
