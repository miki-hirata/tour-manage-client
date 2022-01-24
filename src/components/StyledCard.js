import styled from "styled-components";
import Card from '@mui/material/Card';

export const StyledCard = styled(Card)`
  margin-top: 0.75em;
  &:first-child{
    margin-top: 2em;
  }
`;

export const CardInner = styled.div`
  padding: 16px 16px 20px;

  dl{
    display: flex;
    line-height: 2;
    dt{
      width: 100px;
    }
  }
`;

export const CardInnerHead = styled(CardInner)`
  display: flex;
  align-items: center;
`;
