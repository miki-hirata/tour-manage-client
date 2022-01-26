import { BrowserRouter as Link } from "react-router-dom";

import styled from "styled-components";

import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';


export function StyledEditButton({ toggleEdit }) {
  return (
    <EditButtonStyle>
      <button onClick={toggleEdit}>
        <Fab size="medium" color="primary" aria-label="edit">
          <EditIcon />
        </Fab>
      </button>
    </EditButtonStyle>
  );
}


const EditButtonStyle = styled.div`
position: fixed;
left: 20px;
bottom: 20px;
`;
