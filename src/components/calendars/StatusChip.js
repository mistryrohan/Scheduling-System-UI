import { Box } from '@mui/joy';
import Chip from '@mui/joy/Chip';
import React from 'react';

export default function StatusChip() {
  return <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
    <Chip size="sm" variant="solid">Completed</Chip>
  </Box>;
}
