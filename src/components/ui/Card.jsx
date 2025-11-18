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
  background: ${props => props.$gradient 
    ? `linear-gradient(135deg, ${COLORS.white}15 0%, ${COLORS.white}08 100%)`
    : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
  };
  border: 1px solid ${props => props.$borderColor || `${COLORS.white}10`};
  border-radius: 20px;
  padding: ${props => props.$padding || '24px'};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: backwards;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);

  ${props => props.$hover && `
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        transform: translateY(-4px) scale(1.01);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
        border-color: ${COLORS.white}20;
      }
    }

    &:active {
      transform: translateY(-2px) scale(0.99);
    }
  `}

  ${props => props.$glow && `
    &::after {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      background: linear-gradient(135deg, ${COLORS.gold}40, transparent);
      border-radius: 20px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @media (hover: hover) {
      &:hover::after {
        opacity: 1;
      }
    }
  `}
`

export const Container = styled.div`
  width: 100%;
  max-width: ${props => props.$maxWidth || '980px'};
  margin: 0 auto;
  padding: ${props => props.$padding || '20px'};
`

export const Panel = styled(Card)`
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  backdrop-filter: blur(20px);
  border: 1px solid ${COLORS.white}15;
`
