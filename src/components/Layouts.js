import styled from "styled-components";
import { pc, sp, tab, shadow, mixinMaxWidth } from '../setting';

export const TabArea = styled.div`
${mixinMaxWidth}
position: sticky;
${pc`
  top: 60px;
`}
${tab`
  top: 50px;
`}
${sp`
  top: 40px;
`}
z-index: 1000;
width: 100%;
display: flex;
justify-content: center;
background-color: #fff;
${shadow}
`;

export const MainArea = styled.div`
${mixinMaxWidth}
`;


export const AddUl = styled.ul`
${pc`
    padding-left: 100px;
    padding-right: 100px;
`}
${tab`
    padding-left: 30px;
    padding-right: 30px;
`}
${sp`
    padding-left: 0;
    padding-right: 0;
`}

>li{
  margin-top: 1em;
}
.submit_button{
  margin-top: 2em;
}
.postal_code{
  p{
    padding-top: 1em;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 13px;
    color: gray;
  }
  input{
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  }
}
`;