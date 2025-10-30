import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { COLORS } from '../colors.js'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
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

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`

const Section = styled.section`
  background: ${COLORS.black};
  padding: 48px 16px 64px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 16px;
  background: linear-gradient(135deg, ${COLORS.gold}, ${COLORS.vitalYellow});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Description = styled.p`
  text-align: center;
  color: ${COLORS.white}99;
  margin: 0 auto 40px;
  max-width: 500px;
  animation: ${fadeInUp} 0.8s ease-out 0.2s backwards;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 720px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const Card = styled(Link)`
  position: relative;
  display: grid;
  gap: 12px;
  align-content: center;
  justify-items: center;
  min-height: 180px;
  border-radius: 16px;
  padding: 24px 16px;
  background: linear-gradient(135deg, ${props => props.$primary ? COLORS.fireOrange : COLORS.vitalYellow}, ${props => props.$primary ? COLORS.vitalYellow : COLORS.gold});
  color: ${COLORS.black};
  font-weight: 800;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeInUp} 0.8s ease-out ${props => props.$delay}s backwards;
  overflow: hidden;
  cursor: pointer;

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
      rgba(255, 255, 255, 0.3),
      transparent
    );
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(135deg, ${COLORS.gold}, ${COLORS.white});
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-12px) scale(1.05);
    box-shadow: 0 16px 48px rgba(241, 107, 6, 0.5);
    animation: ${float} 2s ease-in-out infinite;

    &::before {
      left: 100%;
      transition: left 0.7s;
    }

    &::after {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-8px) scale(1.02);
  }

  @media (max-width: 480px) {
    min-height: 160px;
    padding: 20px 12px;
  }
`;

const IconWrapper = styled.div`
  font-size: 42px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s;

  ${Card}:hover & {
    transform: scale(1.2) rotate(5deg);
  }
`;

const CardTitle = styled.div`
  font-size: 18px;
  line-height: 1.3;
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const CardDescription = styled.div`
  font-size: 12px;
  font-weight: 500;
  opacity: 0.8;
  
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

function GameMenu() {
  return (
    <Section id="games">
      <Title>Elige tu Juego</Title>
      <Description>Dos experiencias únicas para romper el hielo y conectar</Description>
      <Grid>
        <Card to="/game/sticker-match" $primary $delay={0.4} aria-label="Ir a Sticker Match">
          <IconWrapper>💥</IconWrapper>
          <div>
            <CardTitle>Sticker Match</CardTitle>
            <CardDescription>Encuentra tu match perfecto</CardDescription>
          </div>
        </Card>
        <Card to="/game/trago-del-destino" $delay={0.6} aria-label="Ir a Tu Trago del Destino">
          <IconWrapper>🍹✨</IconWrapper>
          <div>
            <CardTitle>Tu Trago del Destino</CardTitle>
            <CardDescription>Descubre tu desafío zodiacal</CardDescription>
          </div>
        </Card>
      </Grid>
    </Section>
  )
}

export default GameMenu
