import styled from "styled-components";
import { mixinMaxWidth } from '../setting';

export const TabArea = styled.div`
${mixinMaxWidth}
position: sticky;
top: 40px;
z-index: 1000;
width: 100%;
display: flex;
justify-content: center;
background-color: #fff;
`;

export const MainArea = styled.div`
${mixinMaxWidth}
`;