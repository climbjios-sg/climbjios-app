import { useState } from 'react';

// ----------------------------------------------------------------------

  export default function useTabs<T extends string | number>(defaultValues: T) {
  const [currentTab, setCurrentTab] = useState(defaultValues);

  return {
    currentTab,
    onChangeTab: (_event: React.SyntheticEvent<Element, Event>, newValue: T) => {
      setCurrentTab(newValue);
    },
    setCurrentTab,
  };
}
