import styled from "styled-components";
import { pc, sp, tab, mixinMaxWidth } from '../setting';
import Card from '@mui/material/Card';

export const StyledCard = styled(Card)`
  margin-top: 0.75em;
  margin-bottom: 2px;//一番下のカードの枠線が消えてしまうため追加
  &:first-child{
    margin-top: 2em;
  }
`;

export const CardInner = styled.div`
  padding: 30px 40px 34px;
  position: relative;

  ${tab`
    padding-left: 30px;
    padding-right: 30px;
  `}
  
  ${sp`
      padding: 16px 16px 20px;
  `}

  .font_main{
    font-size: 18px;
    font-weight: bold;
    
    ${sp`
        font-size: 16px;
    `}
  }
  .font_sub{
    font-size: 16px;
  }
  .font_add_cat{
    font-size: 13px;
    margin-top: 0.5em;
  }

  .bin_icon{
    position: absolute;
    bottom: 23px;
    right: 32px;
  }
  
`;

export const CardInnerHead = styled(CardInner)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 24px;

  ${sp`
    padding-top: 16px;
    padding-bottom: 18px;
  `}
  .inner_flex{
    width: 100%;
    display: flex;
    margin-right: 2em;
    align-items: center;
    justify-content: space-between;
    ${tab`
      margin-right: 1em;
    `}
    
    .main{
      display: flex;
      align-items: center;
    }
    .info{
      text-align: end;
      ${tab`
        width: 40%;
      `}
    }
  }  
  .memo_user{
    width: 60px;
    text-align: center;
  }
`;

