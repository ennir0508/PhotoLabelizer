import React from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
}

const defaultTheme = createTheme();

export const Providers: React.FC<Props> = ({ children }: Props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}

