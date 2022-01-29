import { format } from 'date-fns';
import ja from 'date-fns/locale/ja'
import styled from "styled-components";
import {  pc, sp, tab, mixinMaxWidth } from '../setting';

export function FormatDate({ date }) {
  let formatYear = format(new Date(date), 'yyyy');
  let formatMonth = format(new Date(date), 'MM');
  let formatDay = format(new Date(date), 'dd');
  let formatWeek = format(new Date(date), 'E', {locale: ja});
  return (
    <DateStyle>
      <div className="top">
        <span>{formatYear}.{formatMonth}</span>
      </div>
      <div className="bottom">
        <span className="day">{formatDay}</span>
        <span className="week">{formatWeek}</span>
      </div>
    </DateStyle>
  );
}

const DateStyle = styled.div`
margin-top: 4px;
margin-right: 2em;
${tab`
  margin-right: 1em;
`}
> .top {
  font-size: 14px;
  font-weight: bold;
  ${sp`
    font-size: 13px;
  `}
} //top
> .bottom {
  margin-top: -0.1em;
  text-align: center;
  > .day {
    font-size: 30px;
    font-weight: bold;
    ${tab`
      font-size: 24px;
    `}
    ${sp`
      font-size: 22px;
    `}
  }
  > .week {
    font-size: 12px;
    font-weight: bold;
    margin-left: 0.4em;
  }
}
`;