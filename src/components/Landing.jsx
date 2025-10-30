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
  background: radial-gradient(ellipse at top, #1a1a1a 0%, ${COLORS.black} 50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px 40px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${COLORS.gold}08 1px, transparent 1px);
    background-size: 50px 50px;
    animation: ${float} 20s ease-in-out infinite;
    pointer-events: none;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  text-align: center;
  position: relative;
  z-index: 1;
  flex: 1;
`;

const LogoWrapper = styled.div`
    position: relative;
    z-index: 1;
`;

const Logo = styled.img`
  width: 280px;
  height: 280px;
  object-fit: contain;
  opacity: 0.92;
  mix-blend-mode: overlay;
  filter: drop-shadow(0 6px 24px rgba(0,0,0,0.6));
  
  @media (max-width: 480px) {
    width: 240px;
    height: 240px;
  }
`;const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 400;
  background: linear-gradient(135deg, ${COLORS.gold}, ${COLORS.vitalYellow});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  max-width: 90%;
  animation: ${fadeIn} 1s ease-out 0.3s backwards;
  text-shadow: 0 0 30px ${COLORS.gold}33;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: ${COLORS.white}99;
  animation: ${fadeIn} 1s ease-out 0.5s backwards;
  font-style: italic;
  text-align: center;
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
  padding: 16px;
  transition: all 0.3s;
  animation: ${fadeIn} 1s ease-out 0.7s backwards;
  opacity: ${props => props.$hidden ? 0 : 1};
  pointer-events: ${props => props.$hidden ? 'none' : 'auto'};
  z-index: 10;

  &:hover {
    transform: translateX(-50%) translateY(4px);
  }
`;

const Chevron = styled.div`
    width: 32px;
    height: 32px;
    border-right: 4px solid ${COLORS.vitalYellow};
    border-bottom: 4px solid ${COLORS.vitalYellow};
    transform: rotate(-135deg); /* point up */
  animation: ${bounce} 2s infinite;
  filter: drop-shadow(0 0 10px ${COLORS.vitalYellow}66);
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
