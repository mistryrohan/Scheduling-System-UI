import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import MainTemplate from '@/components/main/MainTemplate';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FormCard from '@/components/main/FormCard';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from '@mui/joy/Link';

export default function Profile() {
  return (
    <MainTemplate title="My Profile"
      breadcrumb={ // TODO: could be improved using component
        <>
          <Link
            underline="none"
            color="neutral"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="none"
            color="neutral"
            fontSize={12}
            fontWeight={500}
          >
            My Account
          </Link>
        </>
      }>

      <FormCard
        title="Personal info"
        subtitle="Customize how your profile information will appear."
        >
        <form>
          <Stack spacing={1} sx={{ mb: 1 }}>
            <FormLabel>Name</FormLabel>
            <FormControl
              sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
            >

              <Input size="sm" placeholder="First name" />
              <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input size="sm" defaultValue="UI Developer" />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                placeholder="email"
                defaultValue="siriwatk@test.com"
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
          </Stack>
        </form>
      </FormCard>

      <FormCard
        title="Bio"
        subtitle="Write a short introduction to be displayed on your profile.">
        <form>
          <Textarea
            size="sm"
            minRows={4}
            defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
          />
        </form>
      </FormCard>

    </MainTemplate>
  );
}