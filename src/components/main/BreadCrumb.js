import React from 'react';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';


export default function BreadCrumb(props) {

    const { links } = props

    return (
        <>
            <Link
                underline="none"
                color="neutral"
                aria-label="Home"
                href={"/meetings/"}
            >
                <HomeRoundedIcon />
            </Link>
            {links.map((link, index) => (
                <Link
                    key={index}
                    underline="none"
                    color="neutral"
                    fontSize={12}
                    fontWeight={500}
                    aria-label={link.name}
                    href={link.href}
                >
                    {link.icon}
                    {link.name}
                </Link>
            ))}
        </>
    );
}