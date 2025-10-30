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

function randomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random()*chars.length)]).join('')
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
    const ok = otherCode.trim().toUpperCase() === `${myCode}-MATCH`
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
            placeholder={`Ejemplo: ${myCode}-MATCH`}
            value={otherCode}
            onChange={(e) => {
              setOtherCode(e.target.value)
              setError(false)
            }}
            error={error}
            onKeyPress={(e) => e.key === 'Enter' && onConfirm()}
          />
          <InfoBox>
            💡 Para probar: ingresa <strong>{myCode}-MATCH</strong>
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
