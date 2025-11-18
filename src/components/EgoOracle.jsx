import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
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

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`

const failShake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
`

const successBounce = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
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
  max-width: 600px;
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

const ArchetypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ArchetypeCard = styled.button`
  background: linear-gradient(145deg, ${COLORS.gold}15, ${COLORS.vitalYellow}15);
  border: 2px solid ${COLORS.gold}44;
  border-radius: 16px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${COLORS.gold};
    box-shadow: 0 8px 24px ${COLORS.gold}44;
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -200%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${COLORS.gold}22,
      transparent
    );
    animation: ${shimmer} 3s infinite;
  }
`;

const ArchetypeEmoji = styled.div`
  font-size: 48px;
  z-index: 1;
`;

const ArchetypeName = styled.div`
  color: ${COLORS.white};
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  z-index: 1;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLORS.black}dd;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
  border: 2px solid ${COLORS.gold};
  border-radius: 24px;
  padding: 32px 24px;
  max-width: 500px;
  width: 100%;
  display: grid;
  gap: 24px;
  box-shadow: 0 16px 48px ${COLORS.gold}44;
  animation: ${fadeIn} 0.4s ease-out 0.1s both;
`;

const ModalEmoji = styled.div`
  font-size: 72px;
  text-align: center;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: ${COLORS.gold};
  font-size: 28px;
  text-align: center;
`;

const ModalDescription = styled.p`
  margin: 0;
  color: ${COLORS.white}dd;
  font-size: 15px;
  line-height: 1.7;
  text-align: center;
`;

const MissionBox = styled.div`
  background: ${COLORS.fireOrange}11;
  border: 2px solid ${COLORS.fireOrange}66;
  border-radius: 16px;
  padding: 20px;
`;

const MissionLabel = styled.div`
  color: ${COLORS.fireOrange};
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`;

const MissionText = styled.div`
  color: ${COLORS.white};
  font-size: 16px;
  line-height: 1.6;
  font-weight: 500;
`;

const InfoBox = styled.div`
  background: ${COLORS.gold}11;
  border: 1px solid ${COLORS.gold}44;
  border-radius: 12px;
  padding: 16px;
  color: ${COLORS.white}cc;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
`;

const TimerDisplay = styled.div`
  font-size: 64px;
  font-weight: 800;
  text-align: center;
  background: linear-gradient(135deg, ${COLORS.gold}, ${COLORS.vitalYellow});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 24px 0;
`;

const TimerLabel = styled.div`
  text-align: center;
  color: ${COLORS.white}cc;
  font-size: 16px;
  margin-top: -16px;
  margin-bottom: 24px;
`;

const MissionCard = styled.div`
  background: linear-gradient(145deg, ${COLORS.fireOrange}22, ${COLORS.vitalYellow}22);
  border: 2px solid ${COLORS.gold};
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 8px 24px ${COLORS.gold}44;
`;

const MissionCardEmoji = styled.div`
  font-size: 56px;
  margin-bottom: 16px;
`;

const MissionCardTitle = styled.h3`
  margin: 0 0 16px;
  color: ${COLORS.gold};
  font-size: 24px;
`;

const MissionCardText = styled.p`
  margin: 0;
  color: ${COLORS.white};
  font-size: 16px;
  line-height: 1.6;
`;

const ProgressRing = styled.svg`
  transform: rotate(-90deg);
  width: 120px;
  height: 120px;
  margin: 0 auto;
  display: block;
`;

const ProgressCircle = styled.circle`
  fill: none;
  stroke: ${COLORS.gold}33;
  stroke-width: 8;
`;

const ProgressCircleActive = styled.circle`
  fill: none;
  stroke: ${COLORS.gold};
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s linear;
`;

const FailCard = styled(MissionCard)`
  background: linear-gradient(145deg, #3a1a1a, #2a0d0d);
  border-color: #ff5555;
  animation: ${failShake} 0.6s ease-out;
`;

const SuccessCard = styled(MissionCard)`
  animation: ${successBounce} 0.6s ease-out;
`;

const ExampleBox = styled.div`
  background: ${COLORS.vitalYellow}11;
  border: 1px solid ${COLORS.vitalYellow}44;
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
`;

const ExampleLabel = styled.div`
  color: ${COLORS.vitalYellow};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const ExampleText = styled.div`
  color: ${COLORS.white}cc;
  font-size: 13px;
  line-height: 1.6;
  font-style: italic;
`;

const InfoButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${COLORS.gold}66;
  background: linear-gradient(145deg, ${COLORS.gold}22, ${COLORS.vitalYellow}22);
  color: ${COLORS.gold};
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10;
  
  &:hover {
    background: linear-gradient(145deg, ${COLORS.gold}44, ${COLORS.vitalYellow}44);
    border-color: ${COLORS.gold};
    transform: scale(1.1);
    box-shadow: 0 4px 12px ${COLORS.gold}44;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const HelpModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLORS.black}dd;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const HelpContent = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
  border: 2px solid ${COLORS.vitalYellow};
  border-radius: 20px;
  padding: 28px 24px;
  max-width: 450px;
  width: 100%;
  display: grid;
  gap: 20px;
  box-shadow: 0 16px 48px ${COLORS.vitalYellow}44;
  animation: ${fadeIn} 0.4s ease-out 0.1s both;
`;

const HelpTitle = styled.h3`
  margin: 0;
  color: ${COLORS.vitalYellow};
  font-size: 22px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const HelpText = styled.p`
  margin: 0;
  color: ${COLORS.white}dd;
  font-size: 15px;
  line-height: 1.7;
  text-align: left;
  font-style: italic;
`;

const archetypes = [
  {
    id: 1,
    emoji: '🧭',
    name: 'El Explorador',
    description: 'Siempre buscando nuevas experiencias y aventuras. Tu curiosidad te lleva a descubrir territorios desconocidos.',
    mission: 'Encuentra a alguien que nunca hayas conocido y descubre una historia fascinante de su vida.',
    example: 'Ejemplo: Acércate a alguien y pregúntale: "¿Cuál es la aventura más loca que has vivido?" o "¿Qué te trajo aquí hoy?"'
  },
  {
    id: 2,
    emoji: '🎨',
    name: 'El Artista',
    description: 'Tu creatividad no tiene límites. Ves el mundo a través de colores, formas y posibilidades infinitas.',
    mission: 'Crea algo con lo que encuentres en el evento: un poema, un dibujo, una foto artística.',
    example: 'Ejemplo: Escribe un haiku sobre el momento, toma una foto artística del ambiente, o dibuja algo en una servilleta.'
  },
  {
    id: 3,
    emoji: '♟️',
    name: 'El Estratega',
    description: 'Piensas varios pasos adelante. Tu mente analítica encuentra patrones y soluciones donde otros ven caos.',
    mission: 'Ayuda a tres personas diferentes a resolver un problema o tomar una decisión.',
    example: 'Ejemplo: Ofrece consejo sobre qué bebida elegir, ayuda a alguien a decidir a quién hablarle, o sugiere un plan para el resto de la noche.'
  },
  {
    id: 4,
    emoji: '🔥',
    name: 'El Rebelde',
    description: 'Desafías las normas y creas tus propias reglas. Tu energía transforma lo ordinario en extraordinario.',
    mission: 'Haz algo que nunca harías normalmente en un evento social. Sal de tu zona de confort.',
    example: 'Ejemplo: Inicia una conversación con un extraño de forma poco convencional, propón un juego espontáneo, o baila cuando nadie más lo hace.'
  },
  {
    id: 5,
    emoji: '🎭',
    name: 'El Bufón',
    description: 'La vida es un escenario y tú eres la estrella. Tu humor y carisma iluminan cualquier espacio.',
    mission: 'Haz reír a cinco personas diferentes. Que tu energía sea contagiosa.',
    example: 'Ejemplo: Cuenta un chiste, haz una imitación divertida, comparte una anécdota graciosa, o inventa un juego de palabras.'
  },
  {
    id: 6,
    emoji: '🌟',
    name: 'El Visionario',
    description: 'Ves el futuro antes que los demás. Tus ideas inspiran y transforman a quienes te rodean.',
    mission: 'Comparte tu visión o sueño más grande con tres personas y escucha los suyos.',
    example: 'Ejemplo: Pregunta "Si pudieras crear algo que cambie el mundo, ¿qué sería?" y comparte tu propio sueño o proyecto.'
  }
]

function EgoOracle() {
  const [selectedArchetype, setSelectedArchetype] = useState(null)
  const [acceptedMission, setAcceptedMission] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [missionStatus, setMissionStatus] = useState(null) // 'success' | 'failed' | null
  const [showHelp, setShowHelp] = useState(false)

  const MISSION_DURATION = 300 // 5 minutes in seconds

  useEffect(() => {
    if (acceptedMission && timeRemaining > 0 && !missionStatus) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            setMissionStatus('failed')
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [acceptedMission, timeRemaining, missionStatus])

  const handleSelectArchetype = (archetype) => {
    setSelectedArchetype(archetype)
  }

  const handleClose = () => {
    setSelectedArchetype(null)
  }

  const handleAcceptMission = () => {
    setAcceptedMission(selectedArchetype)
    setTimeRemaining(MISSION_DURATION)
    setMissionStatus(null)
    setSelectedArchetype(null)
  }

  const handleSuccess = () => {
    setMissionStatus('success')
  }

  const handleNewMission = () => {
    setAcceptedMission(null)
    setTimeRemaining(0)
    setMissionStatus(null)
  }

  const handleRandomArchetype = () => {
    const randomIndex = Math.floor(Math.random() * archetypes.length)
    setSelectedArchetype(archetypes[randomIndex])
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = acceptedMission 
    ? ((MISSION_DURATION - timeRemaining) / MISSION_DURATION) * 100 
    : 0

  const circumference = 2 * Math.PI * 50
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference

  // If mission is accepted, show the appropriate view based on status
  if (acceptedMission) {
    // Success state
    if (missionStatus === 'success') {
      return (
        <Wrap>
          <StyledPanel $delay="0.2s">
            <div>
              <Title>🎉 ¡Misión Completada!</Title>
              <Description>
                Has demostrado ser un verdadero {acceptedMission.name}
              </Description>
            </div>

            <SuccessCard>
              <MissionCardEmoji>{acceptedMission.emoji}</MissionCardEmoji>
              <MissionCardTitle>¡Éxito!</MissionCardTitle>
              <MissionCardText>
                Completaste tu misión con {formatTime(timeRemaining)} restantes.
                <br />
                <br />
                {acceptedMission.mission}
              </MissionCardText>
            </SuccessCard>

            <InfoBox style={{ background: COLORS.gold + '22', borderColor: COLORS.gold + '88' }}>
              🌟 Has conectado, crecido y dejado tu marca en este evento. ¡Eres increíble!
            </InfoBox>

            <Button variant="primary" onClick={handleNewMission}>
              ✨ Intentar Nueva Misión
            </Button>
          </StyledPanel>
        </Wrap>
      )
    }

    // Failed state
    if (missionStatus === 'failed') {
      return (
        <Wrap>
          <StyledPanel $delay="0.2s">
            <div>
              <Title>⏰ Tiempo Agotado</Title>
              <Description>
                La misión no fue completada a tiempo
              </Description>
            </div>

            <FailCard>
              <MissionCardEmoji>😔</MissionCardEmoji>
              <MissionCardTitle>Misión Fallida</MissionCardTitle>
              <MissionCardText>
                El tiempo se acabó antes de completar tu misión.
                <br />
                <br />
                Pero no te preocupes, siempre puedes intentar otra misión y demostrar tu verdadero potencial.
              </MissionCardText>
            </FailCard>

            <InfoBox style={{ background: '#3a202022', borderColor: '#ff555544' }}>
              💭 Recuerda: No se trata de ganar o perder, sino de atreverte a salir de tu zona de confort.
            </InfoBox>

            <Button variant="primary" onClick={handleNewMission}>
              🔄 Intentar Otra Misión
            </Button>
          </StyledPanel>
        </Wrap>
      )
    }

    // Mission in progress
    return (
      <Wrap>
        <StyledPanel $delay="0.2s">
          <div>
            <Title>🔮 Misión en Progreso</Title>
            <Description>
              Completa tu misión antes de que termine el tiempo
            </Description>
          </div>

          <MissionCard style={{ position: 'relative' }}>
            {acceptedMission.example && (
              <InfoButton onClick={() => setShowHelp(true)} title="Ver ayuda">
                💡
              </InfoButton>
            )}
            <MissionCardEmoji>{acceptedMission.emoji}</MissionCardEmoji>
            <MissionCardTitle>{acceptedMission.name}</MissionCardTitle>
            <MissionCardText>{acceptedMission.mission}</MissionCardText>
          </MissionCard>

          <div style={{ textAlign: 'center' }}>
            <ProgressRing>
              <ProgressCircle
                cx="60"
                cy="60"
                r="50"
              />
              <ProgressCircleActive
                cx="60"
                cy="60"
                r="50"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </ProgressRing>
            <TimerDisplay>{formatTime(timeRemaining)}</TimerDisplay>
            <TimerLabel>Tiempo restante</TimerLabel>
          </div>

          <InfoBox>
            💪 Esta misión es tu oportunidad para conectar y crecer
          </InfoBox>

          <div style={{ display: 'grid', gap: '12px' }}>
            <Button variant="primary" onClick={handleSuccess}>
              ✅ ¡Misión Completada!
            </Button>
            <Button variant="outline" onClick={handleNewMission}>
              🔄 Cambiar Misión
            </Button>
          </div>
        </StyledPanel>

        {/* Help Modal */}
        {showHelp && acceptedMission?.example && (
          <HelpModal onClick={() => setShowHelp(false)}>
            <HelpContent onClick={(e) => e.stopPropagation()}>
              <HelpTitle>
                <span>💡</span>
                <span>Ayuda</span>
              </HelpTitle>
              <HelpText>{acceptedMission.example}</HelpText>
              <Button variant="primary" onClick={() => setShowHelp(false)}>
                Entendido
              </Button>
            </HelpContent>
          </HelpModal>
        )}
      </Wrap>
    )
  }

  return (
    <Wrap>
      <StyledPanel $delay="0.2s">
        <div>
          <Title>🔮 EGO Oracle</Title>
          <Description>
            Descubre tu arquetipo EGO y recibe una misión especial para el evento
          </Description>
        </div>

        <InfoBox>
          ✨ Elige el arquetipo que más resuene contigo o deja que el oráculo decida por ti
        </InfoBox>

        <ArchetypeGrid>
          {archetypes.map(archetype => (
            <ArchetypeCard
              key={archetype.id}
              onClick={() => handleSelectArchetype(archetype)}
            >
              <ArchetypeEmoji>{archetype.emoji}</ArchetypeEmoji>
              <ArchetypeName>{archetype.name}</ArchetypeName>
            </ArchetypeCard>
          ))}
        </ArchetypeGrid>

        <Button variant="secondary" onClick={handleRandomArchetype}>
          🎲 Sorpréndeme
        </Button>
      </StyledPanel>

      {selectedArchetype && (
        <Modal onClick={handleClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalEmoji>{selectedArchetype.emoji}</ModalEmoji>
            <ModalTitle>{selectedArchetype.name}</ModalTitle>
            <ModalDescription>{selectedArchetype.description}</ModalDescription>
            
            <MissionBox>
              <MissionLabel>Tu Misión</MissionLabel>
              <MissionText>{selectedArchetype.mission}</MissionText>
              {selectedArchetype.example && (
                <ExampleBox>
                  <ExampleLabel>💡 Ayuda</ExampleLabel>
                  <ExampleText>{selectedArchetype.example}</ExampleText>
                </ExampleBox>
              )}
            </MissionBox>

            <Button variant="primary" onClick={handleAcceptMission}>
              Aceptar Misión
            </Button>
          </ModalContent>
        </Modal>
      )}
    </Wrap>
  )
}

export default EgoOracle
