import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    background-image: radial-gradient(#222222, #111111);
    color: ghostwhite;
  }
  code {
    font-family: 'Roboto', sans-serif;
  }
`;
export default GlobalStyle