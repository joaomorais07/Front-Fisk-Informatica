import { createGlobalStyle, keyframes, styled } from "styled-components";

export const fadeIn = keyframes`
0% {
  opacity: 0;
}
20% {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Inter', cursive;
    font-weight: 400;
    -webkit-tap-highlight-color: transparent; 

    ::-webkit-scrollbar {
      width: 0;
    }

    @media screen and (min-width: 1024px) {
      ::-webkit-scrollbar {
        width: 8px;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #7f2f80;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-track {
        background-color: #f0f0f0;
        border-radius: 4px;
      }
    }
  }

  html, body, #root {
    background-color: #19191f;
    height: 100svh;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, button {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
      font-family: 'Inter', cursive;
      color: ${({ theme }) => theme.colors.text};
  }
  h1, h2, h3, h4, h5, h6, p, span {
    line-height: 1.4;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }
  table {
      border-collapse: collapse;
      border-spacing: 0;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    -webkit-tap-highlight-color: transparent; 
    font-family: 'Inter', cursive;
    border: none;
    background-color: transparent;
    padding: 0;
    cursor: pointer;

    &:focus {
      outline: none;
    
    }
  }
  input {
    outline: none;
    font-family: 'Inter', cursive;
  }
  div {
    display: flex;
  }
  img {
    pointer-events: none;
  }
  a {
    -webkit-tap-highlight-color: transparent; 
  }
`;

export const GlobalContainer = styled.div`
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
`;
