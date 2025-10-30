import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { COLORS } from '../colors.js'
import { Button } from './ui/Button.jsx'
import { Panel, Container } from './ui/Card.jsx'
import { QRCodeSVG } from 'react-qr-code'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

const QrContainer = styled.div`
  background: ${COLORS.white};
  padding: 24px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 24px ${COLORS.gold}33;
`;

const ChallengeCard = styled.div`
  background: linear-gradient(145deg, ${COLORS.fireOrange}22, ${COLORS.vitalYellow}22);
  border: 2px solid ${COLORS.gold}55;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
`;

const ChallengeEmoji = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ChallengeText = styled.div`
  color: ${COLORS.white};
  font-size: 18px;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ScannerContainer = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: ${COLORS.black};
  border: 2px solid ${COLORS.gold}66;
`;

const VideoElement = styled.video`
  width: 100%;
  max-width: 400px;
  height: auto;
  display: block;
`;

const ScannerOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 3px solid ${COLORS.vitalYellow};
  border-radius: 16px;
  box-shadow: 0 0 0 9999px ${COLORS.black}88;
  pointer-events: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 3px solid ${COLORS.gold};
  }
  
  &::before {
    top: -3px;
    left: -3px;
    border-right: none;
    border-bottom: none;
  }
  
  &::after {
    bottom: -3px;
    right: -3px;
    border-left: none;
    border-top: none;
  }
`;

const challenges = [
  { id: 1, emoji: '🎤', text: 'Canta una canción durante 30 segundos' },
  { id: 2, emoji: '🕺', text: 'Baila tu mejor paso de baile' },
  { id: 3, emoji: '🤡', text: 'Haz reír a alguien sin tocarle' },
  { id: 4, emoji: '🎭', text: 'Actúa como un animal durante 1 minuto' },
  { id: 5, emoji: '📱', text: 'Envía un mensaje de voz a un amigo con una voz rara' },
  { id: 6, emoji: '🧘', text: 'Mantén una pose de yoga por 30 segundos' },
  { id: 7, emoji: '🎨', text: 'Dibuja un autorretrato en 60 segundos' },
  { id: 8, emoji: '🗣️', text: 'Di un trabalenguas 3 veces seguidas' },
  { id: 9, emoji: '👻', text: 'Asusta a alguien del evento' },
  { id: 10, emoji: '🎯', text: 'Haz 10 cumplidos a personas diferentes' },
  { id: 11, emoji: '🤝', text: 'Presenta a dos personas que no se conocen' },
  { id: 12, emoji: '📸', text: 'Toma una selfie grupal con 5 desconocidos' },
]

function QrChallenge() {
  const [currentChallenge, setCurrentChallenge] = useState(() => {
    const randomIndex = Math.floor(Math.random() * challenges.length)
    return challenges[randomIndex]
  })
  const [mode, setMode] = useState('show') // 'show' | 'scan'
  const [isScanning, setIsScanning] = useState(false)

  const handleNewChallenge = () => {
    const randomIndex = Math.floor(Math.random() * challenges.length)
    setCurrentChallenge(challenges[randomIndex])
    setMode('show')
  }

  const handleStartScanning = async () => {
    setMode('scan')
    setIsScanning(true)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      
      const video = document.getElementById('qr-video')
      if (video) {
        video.srcObject = stream
        video.play()
      }

      // Simple QR detection simulation
      // In a real implementation, you'd use qr-scanner library here
      setTimeout(() => {
        alert('¡QR escaneado! Por favor, acepta el reto.')
        handleStopScanning()
        handleNewChallenge()
      }, 3000)
    } catch (error) {
      console.error('Camera access denied:', error)
      alert('No se pudo acceder a la cámara. Por favor verifica los permisos.')
      setIsScanning(false)
      setMode('show')
    }
  }

  const handleStopScanning = () => {
    const video = document.getElementById('qr-video')
    if (video && video.srcObject) {
      const stream = video.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
      video.srcObject = null
    }
    setIsScanning(false)
    setMode('show')
  }

  const qrData = JSON.stringify({
    type: 'ego-challenge',
    challengeId: currentChallenge.id,
    challenge: currentChallenge.text
  })

  return (
    <Wrap>
      <StyledPanel $delay="0.2s">
        <div>
          <Title>📱 QR Challenge</Title>
          <Description>
            {mode === 'show' 
              ? 'Muestra este código QR a otra persona para que lo escanee y acepte tu reto'
              : 'Escanea el código QR de otra persona para ver su desafío'}
          </Description>
        </div>

        {mode === 'show' ? (
          <>
            <ChallengeCard>
              <ChallengeEmoji>{currentChallenge.emoji}</ChallengeEmoji>
              <ChallengeText>{currentChallenge.text}</ChallengeText>
            </ChallengeCard>

            <QrContainer>
              <QRCodeSVG 
                value={qrData}
                size={200}
                level="H"
                includeMargin={true}
              />
            </QrContainer>

            <InfoBox>
              💡 Otra persona puede escanear este código para ver tu desafío
            </InfoBox>

            <ButtonGroup>
              <Button variant="primary" onClick={handleNewChallenge}>
                🎲 Nuevo Reto
              </Button>
              <Button variant="secondary" onClick={handleStartScanning}>
                📷 Escanear QR
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <>
            <ScannerContainer>
              <VideoElement id="qr-video" playsInline />
              <ScannerOverlay />
            </ScannerContainer>

            <InfoBox>
              📷 Apunta la cámara al código QR para escanearlo
            </InfoBox>

            <Button variant="outline" onClick={handleStopScanning}>
              ✕ Cancelar
            </Button>
          </>
        )}
      </StyledPanel>
    </Wrap>
  )
}

export default QrChallenge
