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
  background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
  padding: 80px 20px 100px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${COLORS.white}10, transparent);
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
  color: ${COLORS.white};
  animation: ${fadeInUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1);
`;

const Description = styled.p`
  text-align: center;
  color: ${COLORS.white}99;
  margin: 0 auto 56px;
  max-width: 600px;
  font-size: clamp(17px, 2.5vw, 21px);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.4;
  animation: ${fadeInUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s backwards;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const Card = styled(Link)`
  position: relative;
  display: grid;
  gap: 16px;
  align-content: center;
  justify-items: center;
  min-height: 200px;
  border-radius: 20px;
  padding: 32px 20px;
  background: ${props => props.$primary 
    ? 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
    : 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
  };
  color: ${COLORS.white};
  font-weight: 600;
  text-align: center;
  border: 1px solid ${COLORS.white}10;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  animation: ${fadeInUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${props => props.$delay}s backwards;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(135deg, ${COLORS.gold}40, transparent);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
      border-color: ${COLORS.gold}40;

      &::before {
        opacity: 1;
      }
    }
  }

  &:active {
    transform: translateY(-4px) scale(0.98);
  }

  @media (max-width: 480px) {
    min-height: 180px;
    padding: 28px 16px;
  }
`;

const IconWrapper = styled.div`
  font-size: 48px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  @media (hover: hover) {
    ${Card}:hover & {
      transform: scale(1.1);
    }
  }
`;

const CardTitle = styled.div`
  font-size: 19px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.01em;
  
  @media (max-width: 480px) {
    font-size: 17px;
  }
`;

const CardDescription = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${COLORS.white}99;
  letter-spacing: -0.005em;
  line-height: 1.3;
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

function GameMenu() {
  return (
    <Section id="games">
      <Title>Elige tu Juego</Title>
      <Description>Seis experiencias únicas para romper el hielo y conectar</Description>
      <Grid>
        <Card to="/game/sticker-match" $primary $delay={0.4} aria-label="Ir a Sticker Match">
          <IconWrapper>💥</IconWrapper>
          <div>
            <CardTitle>Sticker Match</CardTitle>
            <CardDescription>Encuentra tu match perfecto</CardDescription>
          </div>
        </Card>
        <Card to="/game/trago-del-destino" $delay={0.5} aria-label="Ir a Tu Trago del Destino">
          <IconWrapper>🍹</IconWrapper>
          <div>
            <CardTitle>Tu Trago del Destino</CardTitle>
            <CardDescription>Descubre tu desafío zodiacal</CardDescription>
          </div>
        </Card>
        <Card to="/game/two-truths" $primary $delay={0.6} aria-label="Ir a Dos Verdades y una Máscara">
          <IconWrapper>🎭</IconWrapper>
          <div>
            <CardTitle>Dos Verdades y una Máscara</CardTitle>
            <CardDescription>¿Puedes adivinar la mentira?</CardDescription>
          </div>
        </Card>
        <Card to="/game/qr-challenge" $delay={0.7} aria-label="Ir a Treasure Hunt">
          <IconWrapper>🏴‍☠️</IconWrapper>
          <div>
            <CardTitle>Treasure Hunt</CardTitle>
            <CardDescription>Encuentra los tesoros escondidos</CardDescription>
          </div>
        </Card>
        <Card to="/game/social-bingo" $primary $delay={0.8} aria-label="Ir a Social Bingo">
          <IconWrapper>🎯</IconWrapper>
          <div>
            <CardTitle>Social Bingo</CardTitle>
            <CardDescription>Completa las tareas sociales</CardDescription>
          </div>
        </Card>
        <Card to="/game/ego-oracle" $delay={0.9} aria-label="Ir a EGO Oracle">
          <IconWrapper>🔮</IconWrapper>
          <div>
            <CardTitle>EGO Oracle</CardTitle>
            <CardDescription>Descubre tu arquetipo</CardDescription>
          </div>
        </Card>
      </Grid>
    </Section>
  )
}

export default GameMenu
