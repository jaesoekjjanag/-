import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'

interface CardProps {
  data: {
    name: string,
    url: string,
  }
}


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

export default function Acard({ data }: CardProps) {
  const [image, setImage] = useState<Images | null>(null);
  const [types, setTypes] = useState<Types[] | null>(null);
  useEffect(() => {
    axios.get(`${data.url}`)
      .then(res => {
        setImage(res.data.sprites)
        setTypes(res.data.types)
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
    <Card sx={{ width: '170px', m: "auto", my: 1 }}>
      <CardMedia
        onMouseOver={flipImage}
        onMouseOut={flipImage}
        component="img"
        height="150"
        image={`${image?.front_default}`}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {types && types[0].type.name + " "}
          {types && types[1]?.type.name}
        </Typography>
      </CardContent>
    </Card>
  )
}
