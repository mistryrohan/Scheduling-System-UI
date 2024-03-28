// @ts-nocheck
import { Box } from '@mui/joy';
import Chip from '@mui/joy/Chip';
import React from 'react';

export default function StatusChip(props) {

  const { owner, user, respondants, hasMeeting, allResponded } = props;

  let variant = 'solid';
  let chipText = 'Completed';
  let color = 'primary';

  if (!respondants.includes(user)){ // user has not responded
    chipText = "Response Required";
    color="danger";
  }
  else if (!allResponded){ // not all respondants have responded
    chipText = owner == user ? "Awaiting Responses" : "Awaiting Host" ;
  } // all have responded, but no meeting has been made
  else if(!hasMeeting && owner == user){
    chipText = "Finalize";
    color="danger"
  }
  else if(!hasMeeting){
    chipText = "Awaiting Host" ;
  }


  return <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <Chip size="sm" variant={variant} color={color}>{chipText}</Chip>
  </Box>;
}
