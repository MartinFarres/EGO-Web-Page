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
  padding: 14px 24px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  ${props => props.$variant === 'primary' && css`
    background: linear-gradient(135deg, ${COLORS.fireOrange}, ${COLORS.vitalYellow});
    color: ${COLORS.black};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(241, 107, 6, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  `}

  ${props => props.$variant === 'secondary' && css`
    background: ${COLORS.gold};
    color: ${COLORS.black};
    
    &:hover {
      background: ${COLORS.vitalYellow};
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
    }
  `}

  ${props => props.$variant === 'outline' && css`
    background: transparent;
    color: ${COLORS.gold};
    border: 2px solid ${COLORS.gold};
    
    &:hover {
      background: ${COLORS.gold}22;
      transform: translateY(-2px);
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
    opacity: 0.5;
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
