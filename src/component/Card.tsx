import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

interface CardProps {
  data: {
    name: string,
    url: string,
  }
}

const CardDiv = styled.div`
  height: 250px;
  width: 200px;
  border: 1px solid black;
  display: inline-block;
  margin:6px;
  background-color:white;
`
const Name = styled.div`
  padding-left: 8px;
  h3{
    margin:0;
  }
`
const Image = styled.img`
  height: 200px;
  width: 200px;
  display:block;
  border-top: 0.5px solid black;
  border-bottom: 0.5px solid black;
  cursor:pointer;

`
const TypesDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`


interface Types {
  slot: number;
  type: {
    name: string,
    url: string,
  }
}

interface Images {
  back_default?: string
  back_female?: string
  back_shiny?: string
  back_shiny_female?: string
  front_default?: string
  front_female?: string
  front_shiny?: string
  front_shiny_female?: string
}

export default function Card({ data }: CardProps) {
  const [image, setImage] = useState<Images | null>(null);
  const [types, setTypes] = useState<Types[] | null>(null);
  useEffect(() => {
    axios.get(`${data.url}`)
      .then(res => {
        setImage(res.data.sprites)
        setTypes(res.data.types)
        console.log(res.data)
      })
  }, [data])

  const flipImage = (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.currentTarget.src === `${image?.front_default}`) {
      e.currentTarget.src = `${image?.back_default}`
    } else {
      e.currentTarget.src = `${image?.front_default}`
    }
  }

  return (
    <CardDiv>
      <Name><h3>{data.name}</h3></Name>
      <Image onMouseEnter={flipImage} onMouseOut={flipImage} src={`${image?.front_default}`} alt="" />
      <TypesDiv>
        <span>{types && types[0].type.name}</span>
        , <span>{types && types[1]?.type.name}</span>
        <span></span>
      </TypesDiv>
    </CardDiv>
  )
}
