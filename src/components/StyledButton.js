import { BrowserRouter as Link } from "react-router-dom";
import { postPlace } from "../apis";

import styled from "styled-components";
import IconButton from '@mui/material/IconButton';

import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

export function StyledDeleteButton({ handleSubmit, onDelete }) {
  
  return (
    <DeleteButtonStyle>
      <form  onSubmit={handleSubmit(onDelete)}>
        <IconButton aria-label="delete" size="large" type="submit">
          <DeleteIcon />
        </IconButton>
      </form>
    </DeleteButtonStyle>
  );
}



const DeleteButtonStyle = styled.div`
position: absolute;
right: 20px;
bottom: 20px;
`;
