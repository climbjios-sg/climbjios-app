import SettingsDrawer from './drawer';
//
import ThemeContrast from './ThemeContrast';
import ThemeRtlLayout from './ThemeRtlLayout';
import ThemeColorPresets from './ThemeColorPresets';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeSettings({ children }: Props) {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
        <ThemeRtlLayout>
          {children}
          <SettingsDrawer />
        </ThemeRtlLayout>
      </ThemeContrast>
    </ThemeColorPresets>
  );
}
