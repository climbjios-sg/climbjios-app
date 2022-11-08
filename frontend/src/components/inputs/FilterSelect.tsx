import {
  styled,
  TextField,
  MenuItem,
  IconButton,
  Box,
  TextFieldProps,
  IconButtonProps,
} from '@mui/material';
import { Stack, SxProps } from '@mui/system';
import Iconify from 'src/components/Iconify';
import SelectLabel, { SelectLabelProps } from 'src/components/inputs/SelectLabel';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& fieldset': { border: 'solid 1px hsl(0, 0%, 80%) !important', borderRadius: '16px' },
  '& .MuiTextField-root': {
    padding: 0,
  },
}));

interface FilterSelectProps {
  sx?: SxProps;
  value: TextFieldProps['value'];
  onChange: TextFieldProps['onChange'];
  onClear: IconButtonProps['onClick'];
  labelProps: SelectLabelProps;
  options: {
    value: any;
    label: any;
  }[];
}

export default function FilterSelect({
  sx,
  value,
  onChange,
  onClear,
  labelProps,
  options,
}: FilterSelectProps) {
  return (
    <Stack sx={{ position: 'relative', cursor: 'pointer', ...sx }}>
      <>
        <StyledTextField
          select
          size="small"
          fullWidth
          value={value}
          SelectProps={{
            // Hide icon if value is present
            // Box is a placeholder
            IconComponent: value ? Box : undefined,
          }}
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledTextField>
        {value && (
          <IconButton
            sx={{
              position: 'absolute',
              right: 2,
              height: '32px',
              top: '4px',
              background: 'white',
            }}
            onClick={onClear}
          >
            <Iconify icon="eva:close-outline" width={20} />
          </IconButton>
        )}
        {!value && (
          <SelectLabel
            icon={labelProps.icon}
            iconColor={labelProps.iconColor}
            text={labelProps.text}
          />
        )}
      </>
    </Stack>
  );
}
