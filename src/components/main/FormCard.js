import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

export default function FormCard(props) {

    // TODO: props to pass in cancel, save behaviour. cancel should be hidden if no behaviour is passed
    const { title, subtitle, children } = props;

    return (

        <Card>
            <Box sx={{ mb: 1 }}>
                <Typography level="title-md">{title}</Typography>
                <Typography level="body-sm">
                    {subtitle}
                </Typography>
            </Box>
            <Divider />
            <Stack
                direction="row"
                spacing={3}
                sx={{ my: 1 }}
            >
                <Stack spacing={2} sx={{ flexGrow: 1 }}>

                    {children}

                </Stack>
            </Stack>

            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                    <Button size="sm" variant="outlined" color="neutral">
                        Cancel
                    </Button>
                    <Button size="sm" variant="solid">
                        Save
                    </Button>
                </CardActions>
            </CardOverflow>
        </Card>

    );
}