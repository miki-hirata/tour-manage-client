import { css } from 'styled-components';

export const sp = (
  first,
  ...interpolations
) => css`
  @media (max-width: 560px) {
      ${css(first, ...interpolations)}
  }
`;

export const tab = (
  first,
  ...interpolations
) => css`
  @media (max-width: 1024px) {
      ${css(first, ...interpolations)}
  }
`;
export const pc = (
  first,
  ...interpolations
) => css`
  @media (min-width: 1025px) {
      ${css(first, ...interpolations)}
  }
`;

export const mixinColor = css`
  color: white;
  background: blue;
`;
//使うときは${mixinColor} 



export const mixinMaxWidth = css`
  ${pc`
      max-width: 950px;
      margin-left: auto;
      margin-right: auto;
  `}
  ${tab`
      padding-left: 30px;
      padding-right: 30px;
  `}
  ${sp`
      padding-left: 15px;
      padding-right: 15px;
  `}
`;