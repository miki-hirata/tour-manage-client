import { mixinMaxWidth } from '../setting';
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';

export function Loading() {

  return (
    <LoadingStyle>
      <CircularProgress />
    </LoadingStyle>
  );
}

const LoadingStyle = styled.div`
${mixinMaxWidth}
display: flex;
justify-content: center;
padding-top: 50px;
`;