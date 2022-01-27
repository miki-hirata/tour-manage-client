import styled from "styled-components";
import { pc, sp, tab, mixinMaxWidth } from '../setting';

export const TabArea = styled.div`
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
box-shadow: 2px 2px 4px -4px rgba(0,0,0,0.6);
`;

export const MainArea = styled.div`
${mixinMaxWidth}
`;


export const AddUl = styled.ul`

li{
  margin-top: 1em;
  display: flex;
  margin-left: -1em;
  margin-right: -1em;
  .postal_code, .MuiFormControl-root, .MuiInputLabel-root{
    padding: 0 1em;
  }
}

${pc`
    padding-left: 40px;
    padding-right: 40px;
    li{
      margin-top: 1em;
      display: flex;
      margin-left: -1em;
      margin-right: -1em;
      .postal_code, .MuiFormControl-root, .MuiInputLabel-root{
        padding: 0 1em;
      }
    }
`}

${tab`
    padding-left: 30px;
    padding-right: 30px;
`}
${sp`
    padding-left: 0;
    padding-right: 0;
`}
.three{
  ${pc`
    width: 33.3333%;
  `}
  ${tab`
    width: 50%;
  `}
  ${sp`
    width: 100%;
  `}
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