import styled from 'styled-components'
import { COLORS } from '../../colors.js'

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid ${props => props.error ? '#ff4444' : '#2a2a2a'};
  background: linear-gradient(145deg, #0f0f0f, #1a1a1a);
  color: ${COLORS.white};
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.gold};
    box-shadow: 0 0 0 3px ${COLORS.gold}22;
    transform: translateY(-2px);
  }

  &:hover:not(:focus) {
    border-color: #3a3a3a;
  }
`

export const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid #2a2a2a;
  background: linear-gradient(145deg, #0f0f0f, #1a1a1a);
  color: ${COLORS.white};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:focus {
    outline: none;
    border-color: ${COLORS.gold};
    box-shadow: 0 0 0 3px ${COLORS.gold}22;
  }

  &:hover {
    border-color: #3a3a3a;
  }

  option {
    background: #1a1a1a;
    color: ${COLORS.white};
  }
`

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${COLORS.vitalYellow};
  margin-bottom: 8px;
  transition: color 0.3s;
`
