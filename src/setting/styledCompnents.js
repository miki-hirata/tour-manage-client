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
      padding-left: 240px;
      padding-right: 40px;
  `}
  ${tab`
      padding: 0 30px;
  `}
  ${sp`
      padding: 0 15px;
  `}
`;