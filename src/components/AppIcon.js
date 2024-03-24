import * as React from 'react';
import Image from 'next/image'
import { Box } from '@mui/joy';

export default function AppIcon({dim}) {
    return (
            <div style={{ width: dim, height: dim, position: 'relative' }}>
                <Image
                    alt='OneToOne Icon'
                    src='/icon.png'
                    layout='fill'
                    objectFit='contain'
                />
            </div>
    );
}