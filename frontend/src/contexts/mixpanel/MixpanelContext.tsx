import mixpanel, { Config, OverridedMixpanel } from 'mixpanel-browser';
import { createContext, useContext } from 'react';

const MIXPANEL_CONFIG: Partial<Config> = {};
const MIXPANEL_TOKEN = process.env.REACT_APP_MIXPANEL_TOKEN || '';

const MixpanelContext = createContext<OverridedMixpanel>({} as OverridedMixpanel);

/**
 * Provider for Mixpanel.
 *
 * Implementation referenced from https://github.com/apancutt/react-mixpanel-browser
 */
export const MixpanelProvider = ({ children }: { children: React.ReactNode }) => {
  mixpanel.init(MIXPANEL_TOKEN, MIXPANEL_CONFIG);

  return <MixpanelContext.Provider value={mixpanel}>{children}</MixpanelContext.Provider>;
};

export const useMixpanel = () => useContext(MixpanelContext);
