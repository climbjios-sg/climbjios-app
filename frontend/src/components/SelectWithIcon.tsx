import { SxProps } from '@mui/material';
import { Stack } from '@mui/system';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { Option } from 'src/@types';

interface SelectWithIconProps {
  options: Option<any>[];
  onChange: (option: SingleValue<Option<any>>, actionMeta: ActionMeta<Option<any>>) => void;
  icon: React.ReactElement;
  sx?: SxProps;
}
export function SelectWithIcon({ options, onChange, icon, sx }: SelectWithIconProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        border: 'solid 1px hsl(0, 0%, 80%)',
        borderRadius: 2,
        paddingLeft: 1,
        py: '1px',
        '& .custom_select': {
          width: '100%',
        },
        '& .custom_select__control': {
          border: 'none !important',
          boxShadow: 'none !important',
          background: 'none',
          minWidth: 240,
        },
        ...sx,
      }}
    >
      {icon}
      <Select
        className="custom_select"
        classNamePrefix="custom_select"
        options={options}
        onChange={onChange}
        isClearable
      />
    </Stack>
  );
}
