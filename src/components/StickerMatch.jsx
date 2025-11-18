import { useEffect, useMemo, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { COLORS } from '../colors.js'
import { Button } from './ui/Button.jsx'
import { Input, Label } from './ui/Input.jsx'
import { Panel, Container } from './ui/Card.jsx'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const celebrate = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(-5deg);
  }
  75% {
    transform: scale(1.1) rotate(5deg);
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
`;

const Title = styled.h2`
  margin: 0;
  background: linear-gradient(135deg, ${COLORS.vitalYellow}, ${COLORS.fireOrange});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 26px;
`;

const Hint = styled.p`
  margin: 0;
  font-size: 14px;
  color: #bdbdbd;
  line-height: 1.5;
`;

const FlipCardContainer = styled.div`
  perspective: 1000px;
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
  transform: ${props => props.$flipped ? 'rotateY(180deg)' : 'rotateY(0)'};
  will-change: transform;
`;

const FlipCardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

const FlipCardFront = styled(FlipCardFace)`
  background: linear-gradient(145deg, ${COLORS.fireOrange}22, ${COLORS.vitalYellow}22);
  border: 3px solid ${COLORS.gold}66;
`;

const FlipCardBack = styled(FlipCardFace)`
  background: linear-gradient(145deg, ${COLORS.gold}55, ${COLORS.vitalYellow}66);
  border: 3px solid ${COLORS.gold};
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  backdrop-filter: blur(10px);
  background-color: rgba(26, 26, 26, 0.95);
  background-blend-mode: overlay;
`;

const EmojiDisplay = styled.div`
  font-size: 96px;
  filter: drop-shadow(0 4px 12px rgba(250, 191, 60, 0.4));
`;

const CardLabel = styled.div`
  font-size: 18px;
  color: ${COLORS.vitalYellow};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CodeDisplay = styled.div`
  color: ${COLORS.gold};
  font-size: 42px;
  letter-spacing: 8px;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 20px ${COLORS.gold}99;
  font-weight: 900;
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
`;

const TapHint = styled.div`
  font-size: 13px;
  color: ${COLORS.white}66;
  text-align: center;
  margin-top: 8px;
  font-style: italic;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 10px;
`;

const SuccessBox = styled.div`
  background: linear-gradient(135deg, ${COLORS.gold}22, ${COLORS.vitalYellow}22);
  border: 2px solid ${COLORS.gold};
  border-radius: 16px;
  padding: 20px;
  animation: ${celebrate} 0.6s ease-out, ${fadeIn} 0.6s ease-out;
  box-shadow: 0 8px 24px ${COLORS.gold}44;
`;

const SuccessTitle = styled.strong`
  display: block;
  color: ${COLORS.vitalYellow};
  font-size: 20px;
  margin-bottom: 12px;
  text-align: center;
`;

const IcebreakerText = styled.div`
  color: ${COLORS.white};
  background: #0a0a0a;
  padding: 16px;
  border-radius: 12px;
  border-left: 4px solid ${COLORS.fireOrange};
  line-height: 1.6;
`;

const ErrorText = styled.div`
  color: #ff6b6b;
  background: #2a0a0a;
  padding: 12px;
  border-radius: 10px;
  border-left: 4px solid #ff6b6b;
  font-size: 14px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const InfoBox = styled.div`
  background: ${COLORS.fireOrange}11;
  border: 1px solid ${COLORS.fireOrange}44;
  border-radius: 12px;
  padding: 12px;
  font-size: 13px;
  color: ${COLORS.white}cc;
  text-align: center;
`;

const emojiList = ['🔥','⭐','💫','✨','🎯','🎉','🦁','🃏','🎭','💬','🍀','🌟']

const icebreakers = [
  '¿Cuál es tu serie favorita ahora mismo?',
  'Si pudieras viajar hoy, ¿a dónde irías?',
  '¿Qué canción no puedes sacar de tu cabeza?',
  '¿Equipo dulce o salado?',
  '¿Qué te trajo a este evento?',
  '¿Cuál es tu talento oculto?',
  '¿Café o té? ¿Por qué?',
  '¿Qué superpoder elegirías?'
]

// Pre-generated code pairs (100 pairs so multiple people can use the app)
// Each code has a unique partner code for matching
const CODE_PAIRS = [
  ['A8K3', 'B9L4'], ['C2M7', 'D6N8'], ['E4P9', 'F7Q2'], ['G3R6', 'H5S8'],
  ['J9T2', 'K4U7'], ['L8V3', 'M2W6'], ['N7X4', 'P3Y9'], ['Q6Z5', 'R8A2'],
  ['S4B7', 'T9C3'], ['U2D8', 'V6E4'], ['W3F9', 'X7G2'], ['Y5H8', 'Z4J3'],
  ['A9K6', 'B2L7'], ['C8M4', 'D3N9'], ['E7P2', 'F4Q8'], ['G9R3', 'H6S7'],
  ['J2T8', 'K7U4'], ['L3V9', 'M8W2'], ['N4X7', 'P9Y3'], ['Q2Z8', 'R7A4'],
  ['S9B2', 'T3C8'], ['U7D4', 'V2E9'], ['W8F3', 'X4G7'], ['Y9H2', 'Z3J8'],
  ['A4K9', 'B7L2'], ['C3M8', 'D9N4'], ['E2P7', 'F8Q3'], ['G7R9', 'H2S4'],
  ['J8T3', 'K3U9'], ['L9V4', 'M4W7'], ['N2X8', 'P7Y4'], ['Q8Z3', 'R3A9'],
  ['S2B8', 'T7C4'], ['U4D9', 'V9E2'], ['W3F8', 'X8G4'], ['Y2H7', 'Z8J4'],
  ['A7K2', 'B4L9'], ['C9M3', 'D2N7'], ['E8P4', 'F3Q9'], ['G2R8', 'H9S3'],
  ['J4T7', 'K9U2'], ['L2V8', 'M7W3'], ['N9X2', 'P4Y8'], ['Q3Z7', 'R9A3'],
  ['S8B4', 'T2C9'], ['U3D7', 'V8E3'], ['W9F2', 'X2G8'], ['Y7H4', 'Z2J9'],
  ['A3K7', 'B8L4'], ['C7M9', 'D4N2'], ['E3P8', 'F9Q4'], ['G8R2', 'H4S9'],
  ['J7T4', 'K2U8'], ['L4V7', 'M9W8'], ['N3X9', 'P8Y2'], ['Q9Z4', 'R4A7'],
  ['S3B9', 'T8C2'], ['U9D3', 'V4E8'], ['W2F7', 'X9G3'], ['Y4H9', 'Z7J2'],
  ['A2K8', 'B3L6'], ['C4M2', 'D8N6'], ['E9P3', 'F2Q7'], ['G4R7', 'H8S2'],
  ['J3T9', 'K8U3'], ['L7V2', 'M3W4'], ['N8X3', 'P2Y7'], ['Q4Z9', 'R2A8'],
  ['S7B3', 'T4C7'], ['U8D2', 'V3E7'], ['W7F4', 'X3G9'], ['Y8H3', 'Z9J7'],
  ['A6K4', 'B9L8'], ['C2M6', 'D7N3'], ['E4P6', 'F6Q2'], ['G3R4', 'H7S6'],
  ['J9T6', 'K4U6'], ['L6V8', 'M2W9'], ['N7X6', 'P6Y9'], ['Q3Z2', 'R6A4'],
  ['S4B6', 'T9C6'], ['U2D6', 'V7E6'], ['W6F9', 'X2G6'], ['Y3H6', 'Z4J6'],
  ['A8K7', 'B2L3'], ['C6M8', 'D3N5'], ['E7P5', 'F4Q6'], ['G5R8', 'H6S5'],
  ['J2T5', 'K7U5'], ['L8V5', 'M6W7'], ['N5X8', 'P3Y5'], ['Q7Z6', 'R5A2'],
  ['S6B7', 'T2C5'], ['U5D8', 'V6E5'], ['W5F7', 'X6G2'], ['Y5H8', 'Z6J5'],
  ['A5K6', 'B6L5'], ['C5M7', 'D5N8'], ['E6P8', 'F5Q5'], ['G6R5', 'H5S7']
]

function randomCode() {
  // Pick a random pair and randomly choose one of the two codes
  const pairIndex = Math.floor(Math.random() * CODE_PAIRS.length)
  const codeIndex = Math.floor(Math.random() * 2)
  return CODE_PAIRS[pairIndex][codeIndex]
}

function findPartner(code) {
  // Find the matching partner code
  for (const pair of CODE_PAIRS) {
    if (pair[0] === code) return pair[1]
    if (pair[1] === code) return pair[0]
  }
  return null
}

function StickerMatch() {
  const [myCode, setMyCode] = useState('')
  const [otherCode, setOtherCode] = useState('')
  const [matched, setMatched] = useState(false)
  const [question, setQuestion] = useState('')
  const [error, setError] = useState(false)
  const [flipped, setFlipped] = useState(false)

  const emoji = useMemo(() => emojiList[Math.floor(Math.random()*emojiList.length)], [])

  useEffect(() => {
    setMyCode(randomCode())
  }, [])

  const onConfirm = () => {
    const enteredCode = otherCode.trim().toUpperCase()
    const partnerCode = findPartner(myCode)
    const ok = enteredCode === partnerCode
    setMatched(ok)
    setError(!ok && otherCode.trim() !== '')
    if (ok) {
      const q = icebreakers[Math.floor(Math.random()*icebreakers.length)]
      setQuestion(q)
    }
  }

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  return (
    <Wrap>
      <StyledPanel $delay="0.2s">
        <div>
          <Title>💥 Sticker Match</Title>
          <Hint style={{ marginTop: '8px' }}>
            Toca la tarjeta para revelar tu código
          </Hint>
        </div>

        <FlipCardContainer>
          <FlipCardInner $flipped={flipped} onClick={handleFlip}>
            <FlipCardFront>
              <CardLabel>Tu Sticker</CardLabel>
              <EmojiDisplay>{emoji}</EmojiDisplay>
              <TapHint>👆 Toca para ver tu código</TapHint>
            </FlipCardFront>
            <FlipCardBack>
              <CardLabel>Tu Código</CardLabel>
              <CodeDisplay>{myCode}</CodeDisplay>
              <TapHint>👆 Toca para ver el sticker</TapHint>
            </FlipCardBack>
          </FlipCardInner>
        </FlipCardContainer>

        <FormGroup>
          <Label htmlFor="other">Código de la otra persona</Label>
          <Input
            id="other"
            placeholder={`Ejemplo: ${findPartner(myCode) || 'ABCD'}`}
            value={otherCode}
            onChange={(e) => {
              setOtherCode(e.target.value)
              setError(false)
            }}
            error={error}
            onKeyPress={(e) => e.key === 'Enter' && onConfirm()}
          />
          <InfoBox>
            💡 Para probar: ingresa <strong>{findPartner(myCode)}</strong> (código par de {myCode})
          </InfoBox>
        </FormGroup>

        <Button variant="primary" onClick={onConfirm} disabled={!otherCode.trim()}>
          Confirmar Match
        </Button>

        {matched && (
          <SuccessBox>
            <SuccessTitle>🎉 ¡Match Confirmado!</SuccessTitle>
            <IcebreakerText>
              <strong style={{ color: COLORS.vitalYellow }}>Icebreaker:</strong>
              <div style={{ marginTop: 8 }}>{question}</div>
            </IcebreakerText>
          </SuccessBox>
        )}

        {error && (
          <ErrorText>
            ❌ No hay match. Verifica que el código sea correcto.
          </ErrorText>
        )}
      </StyledPanel>
    </Wrap>
  )
}

export default StickerMatch
