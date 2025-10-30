import styled, { keyframes } from 'styled-components'
import { COLORS } from '../../colors.js'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

export const Card = styled.div`
  background: ${props => props.gradient 
    ? `linear-gradient(135deg, ${COLORS.fireOrange}, ${COLORS.vitalYellow})`
    : '#0a0a0a'
  };
  border: 1px solid ${props => props.borderColor || '#1d1d1d'};
  border-radius: 16px;
  padding: ${props => props.padding || '20px'};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: backwards;
  position: relative;
  overflow: hidden;

  ${props => props.hover && `
    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 16px 40px rgba(241, 107, 6, 0.3);
      border-color: ${COLORS.gold};
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      transition: left 0.5s;
    }

    &:hover::before {
      left: 100%;
    }
  `}

  ${props => props.glow && `
    &::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, ${COLORS.fireOrange}, ${COLORS.vitalYellow}, ${COLORS.gold});
      border-radius: 16px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s;
    }

    &:hover::after {
      opacity: 0.3;
      animation: ${shimmer} 2s linear infinite;
    }
  `}
`

export const Container = styled.div`
  width: 100%;
  max-width: ${props => props.maxWidth || '720px'};
  margin: 0 auto;
  padding: ${props => props.padding || '16px'};
`

export const Panel = styled(Card)`
  background: linear-gradient(145deg, #0a0a0a, #121212);
  backdrop-filter: blur(10px);
`
