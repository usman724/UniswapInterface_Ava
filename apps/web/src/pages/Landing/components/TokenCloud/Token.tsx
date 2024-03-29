import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { TokenPoint } from '.'
import { Ticker } from './Ticker'
import { randomChoice } from './utils'

const TokenIconPositioner = styled(motion.div)<{ size: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  position: absolute;
  transform-origin: center center;
`

const floatAnimation = keyframes`
  0% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(8px);
  }
  100% {
    transform: translateY(-8px);
  }
`

const FloatContainer = styled.div<{ duration?: number }>`
  position: absolute;
  transform-origin: center center;
  animation-name: ${floatAnimation};
  animation-duration: ${(props) => 1000 * (props.duration ?? 0)}ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`

const rotateAnimation = keyframes`
  0% {
    transform: rotate(-22deg);
  }
  100% {
    transform: rotate(22deg);
  }
`

const RotateContainer = styled.div<{ duration?: number }>`
  position: absolute;
  transform-origin: center center;
  animation-fill-mode: forwards;
  animation-name: ${rotateAnimation};
  animation-duration: ${(props) => 1000 * (props.duration ?? 0)}ms;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate-reverse;
`
const TokenIconRing = styled(motion.div)<{
  size: number
  color: string
  type: string
  borderRadius: number
}>`
  border-radius: ${(props) => (props.type === 'COIN' ? '50%' : `${props.borderRadius}px`)}};
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background-color: rgba(0,0,0,0);
  border: 1px solid ${(props) => `${props.color}`};
  
  transform-origin: center center;
  position: absolute;
  pointer-events: all;
`
const TokenIcon = styled(motion.div)<{
  size: number
  blur: number
  color: string
  type: string
  rotation: number
  opacity: number
  borderRadius: number
  logoUrl: string
}>`
    border-radius: ${(props) => (props.type === 'COIN' ? '50%' : `${props.borderRadius}px`)}};
    width: ${(props) => `${props.size}px`};
    height: ${(props) => `${props.size}px`};
    background-color:${(props) => `${props.color}`};
    filter: blur(${(props) => `${props.blur}px`});
    background-image: url(${(props) => props.logoUrl});
    background-size: cover;
    background-position: center center;
    transition: filter 0.15s ease-in-out;
    transform-origin: center center;
    position: relative;
    &:hover {
        filter: blur(0);
        cursor: pointer;
    }
`
export function Token(props: { point: TokenPoint; idx: number; cursor: number; setCursor: (idx: number) => void }) {
  const { cursor, setCursor, idx, point } = props
  const {
    x,
    y,
    blur,
    size,
    rotation,
    opacity,
    delay,
    floatDuration,
    logoUrl,
    type,
    PricePercentChange,
    ticker,
    color,
    address,
  } = point

  const navigate = useNavigate()
  const handleOnClick = () => navigate(type === 'COIN' ? `/tokens/ethereum/${address}` : `/nfts/collection/${address}`)

  const borderRadius = size / 8

  const positionerVariants = {
    initial: { scale: 0.5, opacity: 0, rotateX: 15, left: x, top: y + 30 },
    animate: {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      left: x,
      top: y,
    },
  }

  const coinVariants = {
    rest: {
      color,
      opacity,
      scale: 1,
    },
    hover: {
      opacity: 1,
      scale: 1.2,
      rotate: randomChoice([0 - rotation, 0 - rotation]),
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
        delay: 0,
        duration: 0.3,
        type: 'spring',
        bounce: 0.5,
      },
    },
  }

  const iconRingVariant1 = {
    rest: { scale: 1, opacity: 0 },
    hover: {
      opacity: 0.3,
      scale: 1.2,
      transition: { duration: 0.3, type: 'spring', bounce: 0.5 },
    },
  }

  const iconRingVariant2 = {
    rest: { scale: 1, opacity: 0 },
    hover: {
      opacity: 0.1,
      scale: 1.4,
      transition: { duration: 0.3, type: 'spring', bounce: 0.5 },
    },
  }

  const hovered = cursor === idx
  const duration = 200 / (22 - rotation)

  return (
    <TokenIconPositioner
      key={`tokenIcon-${idx}`}
      variants={positionerVariants}
      initial="initial"
      animate="animate"
      transition={{ delay, duration: 0.8, type: 'spring', bounce: 0.6 }}
      size={size}
    >
      <FloatContainer duration={floatDuration} onMouseEnter={() => setCursor(idx)} onMouseLeave={() => setCursor(-1)}>
        <Ticker
          size={size}
          color={color}
          PricePercentChange={PricePercentChange}
          ticker={ticker}
          animate={hovered ? 'hover' : 'animate'}
        />
        <RotateContainer duration={duration}>
          <TokenIcon
            size={size}
            blur={blur}
            color={color}
            type={type}
            rotation={rotation}
            logoUrl={logoUrl}
            opacity={opacity}
            initial="rest"
            animate={hovered ? 'hover' : 'animate'}
            borderRadius={borderRadius}
            variants={coinVariants}
            transition={{ delay: 0 }}
            onClick={() => handleOnClick()}
          >
            <TokenIconRing
              variants={iconRingVariant1}
              size={size}
              type={type}
              color={color}
              borderRadius={borderRadius * 1.3}
            />
            <TokenIconRing
              variants={iconRingVariant2}
              size={size}
              type={type}
              color={color}
              borderRadius={borderRadius * 1.6}
            />
          </TokenIcon>
        </RotateContainer>
      </FloatContainer>
    </TokenIconPositioner>
  )
}
