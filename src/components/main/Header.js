'use client';
import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { toggleSidebar } from './utils';

export default function Header() {
  return (
    <Sheet
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 1099,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
      }}
    >
      <GlobalStyles
        styles={{
          ':root': {
            '--Header-height': '52px'
          },
        }}
      />
      <IconButton
        onClick={() => toggleSidebar()}
        color="neutral"
        size="lg"
      >
        <MenuRoundedIcon />
      </IconButton>
    </Sheet>
  );
}