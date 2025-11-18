import styled from 'styled-components'
import { COLORS } from '../../colors.js'

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${props => props.error ? '#ff4444' : `${COLORS.white}20`};
  background: ${COLORS.white}08;
  backdrop-filter: blur(10px);
  color: ${COLORS.white};
  font-size: 17px;
  font-weight: 400;
  letter-spacing: -0.01em;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  
  &::placeholder {
    color: ${COLORS.white}40;
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.white}40;
    background: ${COLORS.white}12;
    box-shadow: 0 0 0 4px ${COLORS.white}05;
  }

  &:hover:not(:focus) {
    border-color: ${COLORS.white}30;
    background: ${COLORS.white}10;
  }
`

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${COLORS.white}20;
  background: ${COLORS.white}08;
  backdrop-filter: blur(10px);
  color: ${COLORS.white};
  font-size: 17px;
  font-weight: 400;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:focus {
    outline: none;
    border-color: ${COLORS.white}40;
    background: ${COLORS.white}12;
    box-shadow: 0 0 0 4px ${COLORS.white}05;
  }

  &:hover {
    border-color: ${COLORS.white}30;
    background: ${COLORS.white}10;
  }

  option {
    background: #1a1a1a;
    color: ${COLORS.white};
  }
`

export const Label = styled.label`
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: ${COLORS.white};
  letter-spacing: -0.01em;
  margin-bottom: 8px;
  transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`
