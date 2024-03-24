import MainTemplate from '@/components/main/MainTemplate';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from '@mui/joy/Link';

export default function Contacts() {
  return (
    <MainTemplate title="Contacts"
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

      

    </MainTemplate>
  );
}