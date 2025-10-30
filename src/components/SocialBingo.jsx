import { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { COLORS } from '../colors.js'
import { Button } from './ui/Button.jsx'
import { Panel, Container } from './ui/Card.jsx'

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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

const Wrap = styled(Container)`
  padding: 24px 16px;
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledPanel = styled(Panel)`
  display: grid;
  gap: 24px;
  width: 100%;
  max-width: 500px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h2`
  margin: 0;
  background: linear-gradient(135deg, ${COLORS.vitalYellow}, ${COLORS.fireOrange});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 26px;
`;

const Description = styled.p`
  margin: 8px 0 0;
  color: #bdbdbd;
  line-height: 1.5;
  font-size: 14px;
`;

const BingoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const BingoSquare = styled.button`
  aspect-ratio: 1;
  background: ${props => props.$completed 
    ? `linear-gradient(145deg, ${COLORS.gold}44, ${COLORS.vitalYellow}44)`
    : `linear-gradient(145deg, ${COLORS.gold}11, ${COLORS.vitalYellow}11)`};
  border: 2px solid ${props => props.$completed ? COLORS.gold : COLORS.gold}44;
  border-radius: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${COLORS.gold}88;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  ${props => props.$completed && css`
    animation: ${pulse} 0.5s ease-out;
  `}
`;

const SquareEmoji = styled.div`
  font-size: 24px;
  
  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const SquareText = styled.div`
  color: ${COLORS.white};
  font-size: 10px;
  text-align: center;
  line-height: 1.2;
  font-weight: 500;
  
  @media (min-width: 768px) {
    font-size: 11px;
  }
`;

const CheckMark = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: ${COLORS.gold};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${COLORS.black};
  font-weight: bold;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${COLORS.gold}22;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${COLORS.gold}, ${COLORS.vitalYellow});
  width: ${props => props.$progress}%;
  transition: width 0.5s ease-out;
`;

const ProgressText = styled.div`
  text-align: center;
  color: ${COLORS.white}cc;
  font-size: 14px;
  font-weight: 600;
`;

const InfoBox = styled.div`
  background: ${COLORS.fireOrange}11;
  border: 1px solid ${COLORS.fireOrange}44;
  border-radius: 12px;
  padding: 16px;
  color: ${COLORS.white}cc;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const allTasks = [
  { id: 1, emoji: '🤝', text: 'Conoce a alguien nuevo' },
  { id: 2, emoji: '📸', text: 'Toma una selfie con alguien' },
  { id: 3, emoji: '😂', text: 'Haz reír a alguien' },
  { id: 4, emoji: '🎤', text: 'Canta una canción' },
  { id: 5, emoji: '💃', text: 'Baila durante 30s' },
  { id: 6, emoji: '🍕', text: 'Comparte tu comida favorita' },
  { id: 7, emoji: '✈️', text: 'Habla de un lugar que visitaste' },
  { id: 8, emoji: '🎮', text: 'Menciona tu juego favorito' },
  { id: 9, emoji: '🎬', text: 'Recomienda una película' },
  { id: 10, emoji: '📚', text: 'Habla de un libro' },
  { id: 11, emoji: '🎨', text: 'Muestra tu talento artístico' },
  { id: 12, emoji: '🐶', text: 'Habla de tu mascota o animal favorito' },
  { id: 13, emoji: '☕', text: 'Invita a alguien un café/bebida' },
  { id: 14, emoji: '🎯', text: 'Comparte tu meta del año' },
  { id: 15, emoji: '🌟', text: 'Da un cumplido sincero' },
  { id: 16, emoji: '🤔', text: 'Cuenta un dato curioso' },
  { id: 17, emoji: '🎵', text: 'Recomienda una canción' },
  { id: 18, emoji: '💪', text: 'Habla de tu logro más reciente' },
]

function shuffleTasks() {
  const shuffled = [...allTasks].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 9).map((task) => ({
    ...task,
    completed: false
  }))
}

function SocialBingo() {
  const [tasks, setTasks] = useState(() => shuffleTasks())

  const handleToggleTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  const handleNewCard = () => {
    setTasks(shuffleTasks())
  }

  const completedCount = tasks.filter(t => t.completed).length
  const progress = Math.round((completedCount / 9) * 100)

  return (
    <Wrap>
      <StyledPanel $delay="0.2s">
        <div>
          <Title>🎯 Social Bingo</Title>
          <Description>
            Completa las tareas sociales y marca los cuadros. ¡Sistema de honor!
          </Description>
        </div>

        <div>
          <ProgressBar>
            <ProgressFill $progress={progress} />
          </ProgressBar>
          <ProgressText>{completedCount} de 9 completadas</ProgressText>
        </div>

        <BingoGrid>
          {tasks.map(task => (
            <BingoSquare
              key={task.id}
              $completed={task.completed}
              onClick={() => handleToggleTask(task.id)}
            >
              <SquareEmoji>{task.emoji}</SquareEmoji>
              <SquareText>{task.text}</SquareText>
              {task.completed && <CheckMark>✓</CheckMark>}
            </BingoSquare>
          ))}
        </BingoGrid>

        {completedCount === 9 && (
          <InfoBox>
            🎉 ¡Felicidades! Completaste todas las tareas del Bingo Social
          </InfoBox>
        )}

        {completedCount < 9 && (
          <InfoBox>
            💡 Toca un cuadro cuando completes la tarea. ¡Es un sistema de honor!
          </InfoBox>
        )}

        <ButtonGroup>
          <Button variant="primary" onClick={handleNewCard}>
            🔄 Nueva Tarjeta
          </Button>
          {completedCount > 0 && (
            <Button variant="outline" onClick={() => setTasks(prev => prev.map(t => ({ ...t, completed: false })))}>
              ↺ Reiniciar
            </Button>
          )}
        </ButtonGroup>
      </StyledPanel>
    </Wrap>
  )
}

export default SocialBingo
