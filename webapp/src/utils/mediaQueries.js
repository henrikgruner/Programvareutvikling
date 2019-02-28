// import { media } from "../../utils/mediaQueries";

import { css } from "styled-components";

export const media = {
  handheld: (...args) => css`
    @media screen and (max-width: 500px) {
      ${css(...args)};
    }
  `,
  tablet: (...args) => css`
    @media screen and (max-width: 800px) {
      ${css(...args)};
    }
  `
};
