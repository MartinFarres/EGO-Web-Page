import styled, { keyframes } from 'styled-components'
import { COLORS } from '../colors.js'
import logoImage from '../assets/logo-ego.png'
import { useState, useEffect } from 'react'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`

const glow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 10px ${COLORS.gold}66) drop-shadow(0 0 20px ${COLORS.fireOrange}33);
  }
  50% {
    filter: drop-shadow(0 0 20px ${COLORS.gold}99) drop-shadow(0 0 40px ${COLORS.fireOrange}66);
  }
`

const Wrapper = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 20px 40px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, ${COLORS.gold}05 0%, transparent 50%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${COLORS.white}10, transparent);
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  text-align: center;
  position: relative;
  z-index: 1;
  flex: 1;
  max-width: 980px;
  margin: 0 auto;
`;

const LogoWrapper = styled.div`
  position: relative;
  z-index: 1;
  animation: ${scaleIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
`;

const Logo = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  opacity: 0.95;
  filter: drop-shadow(0 4px 20px rgba(0,0,0,0.5));
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  
  @media (max-width: 480px) {
    width: 160px;
    height: 160px;
  }

  @media (hover: hover) {
    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 8px 30px rgba(0,0,0,0.6));
    }
  }
`;const Title = styled.h1`
  margin: 0;
  font-size: clamp(28px, 5vw, 48px);
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${COLORS.white};
  max-width: 800px;
  animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards;
  text-align: center;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    font-size: clamp(24px, 6vw, 36px);
    line-height: 1.2;
  }
`;

const Subtitle = styled.p`
  margin: 16px 0 0;
  font-size: clamp(17px, 2.5vw, 21px);
  line-height: 1.4;
  font-weight: 400;
  color: ${COLORS.white}99;
  animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards;
  text-align: center;
  letter-spacing: -0.01em;
  max-width: 600px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    font-size: clamp(15px, 3vw, 19px);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { 
    transform: translateY(0) rotate(-135deg); 
  }
  40% { 
    transform: translateY(-8px) rotate(-135deg); 
  }
  60% { 
    transform: translateY(-4px) rotate(-135deg); 
  }
`;

const ChevronWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  padding: 20px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards;
  opacity: ${props => props.$hidden ? 0 : 1};
  pointer-events: ${props => props.$hidden ? 'none' : 'auto'};
  z-index: 10;

  @media (hover: hover) {
    &:hover {
      transform: translateX(-50%) translateY(2px);
    }
  }

  &:active {
    transform: translateX(-50%) scale(0.95);
  }
`;

const Chevron = styled.div`
  width: 24px;
  height: 24px;
  border-right: 2px solid ${COLORS.white};
  border-bottom: 2px solid ${COLORS.white};
  transform: rotate(-135deg);
  animation: ${bounce} 2.5s ease-in-out infinite;
  opacity: 0.7;
`;

function Landing() {
  const [chevronHidden, setChevronHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setChevronHidden(true)
      } else {
        setChevronHidden(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToGames = () => {
    window.scrollTo({ 
      top: window.innerHeight, 
      behavior: 'smooth' 
    })
  }

  return (
    <Wrapper>
      <Center>
        <LogoWrapper>
          <Logo src={logoImage} alt="EGO" />
        </LogoWrapper>
        <div>
          <Title>
            El ego es nuestra máscara social, es el papel que estamos desempeñando.
          </Title>
          <Subtitle>Descubre tu verdadero yo</Subtitle>
        </div>
      </Center>
      <ChevronWrapper 
        onClick={scrollToGames} 
        aria-label="Desplázate para ver los juegos"
        $hidden={chevronHidden}
      >
        <Chevron aria-hidden="true" />
      </ChevronWrapper>
    </Wrapper>
  )
}

export default Landing
