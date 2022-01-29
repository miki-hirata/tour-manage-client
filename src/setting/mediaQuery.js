import { css } from 'styled-components';
const TabWidth = 1024;//別ファイルにまとめると誤動作
const SpWidth = 560;

//styled-components用メディアクエリ
export const sp = (
  first,
  ...interpolations
) => css`
  @media (max-width: ${SpWidth}px) {
      ${css(first, ...interpolations)}
  }
`;

export const tab = (
  first,
  ...interpolations
) => css`
  @media (max-width: ${TabWidth}px) {
      ${css(first, ...interpolations)}
  }
`;
export const pc = (
  first,
  ...interpolations
) => css`
  @media (min-width: ${TabWidth + 1}px) {
      ${css(first, ...interpolations)}
  }
`;



//コンポーネント出し分け用メディアクエリ

export const onlyPC = `(min-width: ${TabWidth + 1}px)`;

export const onlyTab = `(max-width: ${TabWidth}px)`;

export const notSP = `(min-width: ${SpWidth + 1}px)`;

export const onlySP = `(max-width: ${SpWidth}px)`;
/* 使うときの書き方

import MediaQuery from "react-responsive";
import { onlyTab, onlyPC } from "../setting"
<MediaQuery query={onlyPC}></MediaQuery>
<MediaQuery query={onlyTab}></MediaQuery>
 */