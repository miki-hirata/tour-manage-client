import styled from "styled-components";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { mixinMaxWidth } from '../setting';


export const StyledTabs = styled(Tabs)`
${mixinMaxWidth}
position: fixed;
top: 40px;
left: 0;
z-index: 1000;
width: 100%;
background-color: #fff;
height: 40px;
`;


export const StyledTab = styled(Tab)`

`;
