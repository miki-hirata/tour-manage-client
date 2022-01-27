import styled from "styled-components";
import { pc, sp, tab, shadow, mixinMaxWidth } from '../setting';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export const StyledTabs = styled(Tabs)`

${mixinMaxWidth}
/* width: 100%;
background-color: #fff;
height: 40px;
display: flex;
justify-content: center; */
`;


export const StyledTab = styled(Tab)`
  
  ${sp`
    min-width: 70px !important;
    padding: 14px 6px !important;
  `}
`;