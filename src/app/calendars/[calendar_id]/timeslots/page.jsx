import MainTemplate from '@/components/main/MainTemplate';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from '@mui/joy/Link';

export default function Default() {

    // The page(s) where an arbitrary user adds their timeslots (availability).
    //  /calendars/<calendar_id>/timeslots/
    // /calendars/timeslots/<timeslot_id>/

  return (
    <MainTemplate title="Default"
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
            Default
          </Link>
        </>
      }>

      

    </MainTemplate>
  );
}