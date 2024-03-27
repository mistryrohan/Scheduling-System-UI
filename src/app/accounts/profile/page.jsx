import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import MainTemplate from '@/components/main/MainTemplate';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FormCard from '@/components/main/FormCard';
import React from 'react';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export default function Profile() {
  return (
    <MainTemplate title="My Profile"
      breadcrumb={[
        { name: "My Account" }
      ]}>

      <FormCard
        title="Personal info"
        subtitle="Customize how your profile information will appear."
      >
        <form>
          <Stack spacing={1} sx={{ mb: 2 }}>
            <FormLabel>Username</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >

              <Input size="sm" placeholder="Username" defaultValue="defaultValue" />
            </FormControl>
          </Stack>

          <Stack spacing={1} sx={{ mb: 2 }}>
            <FormLabel>Name</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >

              <Input size="sm" placeholder="First Name" />
              <Input size="sm" placeholder="Last Name" sx={{ flexGrow: 1 }} />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                placeholder="Email"
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>New Password</FormLabel>
              <Input
                size="sm"
                type="password"
                startDecorator={<VpnKeyIcon />}

                placeholder="Password"
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                size="sm"
                type="password"
                startDecorator={<VpnKeyIcon />}

                placeholder="Password"
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
          </Stack>
        </form>
      </FormCard>
    </MainTemplate>
  );
}