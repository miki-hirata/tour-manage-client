import { css } from 'styled-components';
import { pc, sp, tab } from './index';

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