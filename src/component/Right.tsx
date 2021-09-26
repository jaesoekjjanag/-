import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import styled from 'styled-components'
import axios from 'axios'
import Acard from './Card';

const Wrapper = styled.div`
  margin: 0;
  background-color: #223773;
  padding-top: 50px;
  width:50vw;
`
interface Data {
  name: string;
  url: string;
}

export default function Right() {
  const [flag, setFlag] = useState<number>(0);
  const [data, setData] = useState<Data[] | null>(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=28&offset=0')
      .then((res) => {
        setData(res.data.results)
      })
  }, [])

  const fetchData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let res;
    if (e.currentTarget.innerText === "다음") {
      res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=28&offset=${flag + 28}`)
      setFlag(p => p + 28)
    } else {
      if (flag <= 0) return;
      res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=28&offset=${flag - 28}`)
      setFlag(p => p - 28)
    }
    setData(res.data.results)
  }
  return (
    <Wrapper>
      <div style={{ textAlign: 'center', height: '100px', lineHeight: '100px' }}>
        <Typography variant='h2' color="secondary" fontWeight="600">
          이박사의 포켓몬 도감
        </Typography>
      </div>
      <Grid container>
        {data && data.map((v, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3}><Acard data={v} /></Grid>
        ))}
        <Grid container sx={{ m: 1, justifyContent: "space-between" }}>
          <Grid item><Button variant="contained" color="secondary" onClick={fetchData}>이전</Button ></Grid>
          <Grid item><Button variant="contained" color="secondary" onClick={fetchData}>다음</Button ></Grid>
        </Grid>
      </Grid>
    </Wrapper >
  )
}
