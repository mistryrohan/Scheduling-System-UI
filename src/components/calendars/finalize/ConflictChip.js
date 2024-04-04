// @ts-nocheck
import { Box } from '@mui/joy';
import Chip from '@mui/joy/Chip';
import React from 'react';

export default function ConflictChip(props) {

  const { has_conflict } = props;



  return <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
    {has_conflict ? <Chip size="sm" variant={'solid'} color={'danger'}>{'Conflict'}</Chip> : <></>}
  </Box>;
}
