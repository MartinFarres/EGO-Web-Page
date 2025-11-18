import styled, { css, keyframes } from 'styled-components'
import { COLORS } from '../../colors.js'

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

const StyledButton = styled.button`
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  ${props => props.$variant === 'primary' && css`
    background: ${COLORS.white}90;
    color: ${COLORS.black};
    
    @media (hover: hover) {
      &:hover {
        background: ${COLORS.white};
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(255, 255, 255, 0.15);
      }
    }

    &:active {
      transform: scale(0.98);
    }
  `}

  ${props => props.$variant === 'secondary' && css`
    background: ${COLORS.white}15;
    color: ${COLORS.white};
    backdrop-filter: blur(10px);
    
    @media (hover: hover) {
      &:hover {
        background: ${COLORS.white}25;
        transform: translateY(-2px);
      }
    }
  `}

  ${props => props.$variant === 'outline' && css`
    background: transparent;
    color: ${COLORS.white};
    border: 1px solid ${COLORS.white}30;
    
    @media (hover: hover) {
      &:hover {
        background: ${COLORS.white}10;
        border-color: ${COLORS.white}50;
        transform: translateY(-2px);
      }
    }
  `}

  ${props => props.$animate && css`
    animation: ${pulse} 2s ease-in-out infinite;
  `}

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1) translate(-50%, -50%);
    transform-origin: 50% 50%;
  }

  &:focus:not(:active)::after {
    animation: ${ripple} 0.6s ease-out;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
  }
`

export function Button({ children, variant = 'primary', animate = false, ...props }) {
  return (
    <StyledButton $variant={variant} $animate={animate} {...props}>
      {children}
    </StyledButton>
  )
}
