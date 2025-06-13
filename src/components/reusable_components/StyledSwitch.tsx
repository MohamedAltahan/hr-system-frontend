// components/StyledSwitch.jsx
import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { green, grey } from '@mui/material/colors';

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[600],
  },
  '& .MuiSwitch-track': {
    backgroundColor: grey[300],
  },
}));

export default function CustomToggle({ checked, onChange }) {
  return (
    <StyledSwitch
      checked={checked}
      onChange={onChange}
      inputProps={{ 'aria-label': 'toggle active status' }}
      onClick={(e) => e.stopPropagation()} // ⛔ prevent row navigation
    />
  );
}
