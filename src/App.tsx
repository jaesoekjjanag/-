import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Left from './component/Left';
import Right from './component/Right';

const GlobalStyle = createGlobalStyle`
  body{
    margin:0;
  }
`
const AppWrapper = styled.div`
  display:flex;
`

function App() {

  return (
    <AppWrapper>
      <GlobalStyle></GlobalStyle>
      <Left />
      <Right />
    </AppWrapper>
  );
}

export default App;
