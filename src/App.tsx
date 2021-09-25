import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios'
import Card from './component/Card';

const GlobalStyle = createGlobalStyle`
  body{
    margin:0;
  }
`
const Wrapper = styled.div`
  margin: 0 auto;
  margin: 0;
  background-color: #223773;
  padding-top: 50px;
`
const Title = styled.div`
  width: 1080px;
  height: 100px;
  background-color:#3FBFB2;
  margin: 0px auto 50px;
  text-align: center;
  line-height: 100px;
  h1{
    margin:0;
    color: #223773;
    font-size: 40px;
  }
`
const Cards = styled.div`
  width: 1080px;
  margin:0 auto;
  background-color:#223773;
  position:relative;
`
const Buttons = styled.div`
  padding: 4px;
  padding-right: 14px;
  display:flex;
  justify-content:space-between;
`
interface Data {
  name: string;
  url: string;
}

function App() {
  const [flag, setFlag] = useState<number>(0);
  const [data, setData] = useState<Data[] | null>(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0')
      .then((res) => {
        setData(res.data.results)
        setFlag(25);
      })
  }, [])

  const loadNext = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=25&offset=${flag}`)
      .then((res) => {
        setData(res.data.results)
        setFlag(p => p + 25)
      })
  }

  return (
    <React.Fragment>
      <GlobalStyle></GlobalStyle>
      <Wrapper>
        <Title ><h1>이박사의 포켓몬 도감</h1></Title>
        <Cards>
          {data && data.map((v, i) => (
            <Card data={v} />
          ))}
          <Buttons>
            <button>이전</button>
            <button onClick={loadNext}>다음</button>
          </Buttons>
        </Cards>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
