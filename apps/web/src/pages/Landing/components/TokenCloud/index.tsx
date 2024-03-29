import PoissonDiskSampling from 'poisson-disk-sampling'
import { useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { defaultCoin, staticCoins, staticCollections } from '../../assets/staticTokens'
import { Token } from './Token'
import { isInBounds, mixArrays, randomFloat, randomInt } from './utils'

const Container = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  top: 0;
`
const Inner = styled.div`
  width: 3000px;
  flex-shrink: 0;
  height: 800px;
  position: relative;
  overflow: visible;
`

type Token = {
  address: string
  color: string
  logoUrl: string
  PricePercentChange: number
  symbol: string
  type: string
}

export type TokenPoint = Token & {
  x: number
  y: number
  blur: number
  size: number
  color: string
  logoUrl: string
  opacity: number
  rotation: number
  delay: number
  floatDuration: number
  ticker: string
}

const w = 3000
const h = 800 - 72

const centerRect = {
  x: w / 2 - 250,
  y: 0,
  w: w / 2 + 250,
  h,
}

const poissonConfig = {
  shape: [w, h],
  minDistance: 225,
  maxDistance: 350,
  tries: 10,
}

export function TokenCloud() {
  const pts = useMemo(() => {
    const tokenList = mixArrays(staticCoins, staticCollections, 0.33)

    const poissonDiskSampling = new PoissonDiskSampling(poissonConfig)
    const points = poissonDiskSampling
      .fill()
      // Remove points inside center rectangle which is occupied by the headline and swap interface
      .filter(([x, y]) => !isInBounds(x, y, centerRect.x, centerRect.y, centerRect.w, centerRect.h))
      // Order by distance from center, ie idx = 0 is closest to center
      .sort((a, b) => Math.abs(a[0] - w / 2) - Math.abs(b[0] - w / 2))
      .map(([x, y], idx: number) => {
        const token = !tokenList[idx] ? defaultCoin : tokenList[idx]

        const size = randomInt(40, 96)

        return {
          x,
          y,
          blur: (1 / size) * 1000, // make blur bigger for smaller icons
          size,
          color: token.color,
          logoUrl: token.logoUrl,
          opacity: randomFloat(0.5, 1.0),
          rotation: randomInt(-20, 20),
          delay: Math.abs(x - w / 2) / 800,
          floatDuration: randomFloat(3, 6),
          ticker: token.symbol,
          PricePercentChange: token.PricePercentChange,
          type: token.type,
          address: token.address,
        }
      })
      .map((p) => {
        return {
          ...p,
          y: p.y - 0.5 * p.size,
          x: p.x - 0.5 * p.size,
        }
      })

    return points as TokenPoint[]
  }, [])

  const constraintsRef = useRef(null)
  const [cursor, setCursor] = useState(-1)

  return (
    <Container ref={constraintsRef}>
      <Inner>
        {pts.map((point: TokenPoint, idx) => {
          return <Token key={`token-${idx}`} point={point} idx={idx} cursor={cursor} setCursor={setCursor} />
        })}
      </Inner>
    </Container>
  )
}
