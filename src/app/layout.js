import * as React from 'react';
import ThemeRegistry from '../components/ThemeRegistry';

export const metadata = {
  title: 'OneToOne',
  description: 'CSC309 Project',
};

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
        {props.children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
