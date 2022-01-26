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



export const shadow = css`
  box-shadow: 2px 2px 4px -4px rgba(0,0,0,0.6);
`;

export const mixinMaxWidth = css`
  ${pc`
      padding-left: 150px;
      padding-right: 150px;
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