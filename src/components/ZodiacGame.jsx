import { useMemo, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { COLORS } from '../colors.js'
import { Panel, Container } from './ui/Card.jsx'
import { Button } from './ui/Button.jsx'

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

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`

const sparkle = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.01) rotate(0.5deg);
    filter: brightness(1.05);
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
  background: linear-gradient(135deg, ${COLORS.vitalYellow}, ${COLORS.gold});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 26px;
`;

const Description = styled.p`
  margin: 8px 0 0;
  color: #bdbdbd;
  line-height: 1.5;
`;

const SelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  animation: ${props => props.$hiding ? fadeOut : fadeIn} 0.4s ease-out;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
`;

const SignButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 12px;
  background: linear-gradient(145deg, ${COLORS.gold}15, ${COLORS.vitalYellow}15);
  border: 2px solid ${COLORS.gold}44;
  border-radius: 16px;
  color: ${COLORS.white};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100px;
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${COLORS.gold};
    background: linear-gradient(145deg, ${COLORS.gold}25, ${COLORS.vitalYellow}25);
    box-shadow: 0 8px 20px ${COLORS.gold}33;
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 12px 8px;
    min-height: 90px;
  }
`;

const SignEmoji = styled.div`
  font-size: 32px;
  
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const SignName = styled.div`
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ResultCard = styled.div`
  background: linear-gradient(145deg, 
    ${COLORS.gold}15, 
    ${COLORS.vitalYellow}15
  );
  border: 2px solid ${COLORS.gold}66;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  animation: ${sparkle} 6s ease-in-out infinite, ${fadeIn} 0.5s ease-out;
  box-shadow: 0 8px 32px ${COLORS.gold}33;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      ${COLORS.gold}22,
      transparent
    );
    background-size: 200% 100%;
  animation: ${shimmer} 6s linear infinite;
  }
`;

const SignTitle = styled.div`
  color: ${COLORS.gold};
  font-weight: 800;
  font-size: 22px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
`;

const ContentText = styled.div`
  color: ${COLORS.white};
  line-height: 1.7;
  font-size: 16px;
  position: relative;
  z-index: 1;
  
  strong {
    color: ${COLORS.vitalYellow};
    display: block;
    margin-bottom: 8px;
  }
`;

const BackButton = styled.div`
  display: flex;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease-out 0.3s backwards;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${COLORS.white}66;
  font-style: italic;
`;

const zodiacData = {
  aries: [
    "Challenge: Compra un trago para alguien que no conozcas.",
    "Phrase: Tu energía hoy es magnética y contagiosa.",
    "Challenge: Propón un brindis al grupo más cercano.",
    "Phrase: La valentía te define, úsala para conectar."
  ],
  taurus: [
    "Challenge: Pregunta por el mejor lugar para comer cerca.",
    "Phrase: La paciencia te traerá una gran conversación.",
    "Challenge: Ofrece tu snack favorito a alguien nuevo.",
    "Phrase: Tu presencia reconfortante atrae a otros."
  ],
  gemini: [
    "Challenge: Conoce el nombre de 3 personas en 10 minutos.",
    "Phrase: Tu curiosidad abre puertas inesperadas.",
    "Challenge: Pide que te recomienden una canción.",
    "Phrase: Las palabras son tu superpoder, úsalas bien."
  ],
  cancer: [
    "Challenge: Comparte una historia emotiva con alguien.",
    "Phrase: Tu empatía crea vínculos profundos.",
    "Challenge: Pregunta por el mejor recuerdo de alguien.",
    "Phrase: Tu intuición te guía hacia las personas correctas."
  ],
  leo: [
    "Challenge: Inicia una mini ronda de fotos.",
    "Phrase: Brillas sin esfuerzo, ilumina a otros.",
    "Challenge: Halaga el outfit de alguien genuinamente.",
    "Phrase: Tu carisma es tu carta de presentación."
  ],
  virgo: [
    "Challenge: Ayuda a alguien con algo pequeño.",
    "Phrase: Tu atención al detalle es tu fortaleza.",
    "Challenge: Recomienda algo útil que hayas aprendido.",
    "Phrase: La perfección está en cómo conectas con otros."
  ],
  libra: [
    "Challenge: Junta a dos personas que no se conocen.",
    "Phrase: El balance te hace irresistible.",
    "Challenge: Pide una opinión sobre algo que te gusta.",
    "Phrase: Tu diplomacia crea armonía dondequiera."
  ],
  scorpio: [
    "Challenge: Comparte un secreto inofensivo.",
    "Phrase: Tu intensidad intriga y atrae.",
    "Challenge: Pregunta por la mayor pasión de alguien.",
    "Phrase: La profundidad es tu zona de confort."
  ],
  sagittarius: [
    "Challenge: Cuenta tu historia de viaje más loca.",
    "Phrase: Tu espíritu libre inspira aventuras.",
    "Challenge: Invita a alguien a probar algo nuevo.",
    "Phrase: El optimismo es tu superpoder contagioso."
  ],
  capricorn: [
    "Challenge: Comparte un logro del que estés orgulloso.",
    "Phrase: Tu determinación es admirable.",
    "Challenge: Pregunta por las metas de alguien.",
    "Phrase: La ambición te conecta con los soñadores."
  ],
  aquarius: [
    "Challenge: Propón una idea loca al grupo.",
    "Phrase: Tu originalidad rompe esquemas.",
    "Challenge: Pregunta por la opinión más controversial.",
    "Phrase: Ser diferente es tu mayor regalo."
  ],
  pisces: [
    "Challenge: Comparte una canción que te emocione.",
    "Phrase: Tu sensibilidad artística encanta.",
    "Challenge: Pregunta por los sueños de alguien.",
    "Phrase: La imaginación te hace único y fascinante."
  ],
}

const signs = [
  { key: 'aries', label: 'Aries', emoji: '♈' },
  { key: 'taurus', label: 'Tauro', emoji: '♉' },
  { key: 'gemini', label: 'Géminis', emoji: '♊' },
  { key: 'cancer', label: 'Cáncer', emoji: '♋' },
  { key: 'leo', label: 'Leo', emoji: '♌' },
  { key: 'virgo', label: 'Virgo', emoji: '♍' },
  { key: 'libra', label: 'Libra', emoji: '♎' },
  { key: 'scorpio', label: 'Escorpio', emoji: '♏' },
  { key: 'sagittarius', label: 'Sagitario', emoji: '♐' },
  { key: 'capricorn', label: 'Capricornio', emoji: '♑' },
  { key: 'aquarius', label: 'Acuario', emoji: '♒' },
  { key: 'pisces', label: 'Piscis', emoji: '♓' },
]

function ZodiacGame() {
  const [sign, setSign] = useState('')
  const [lastIndex, setLastIndex] = useState({})
  const [hiding, setHiding] = useState(false)

  const entry = useMemo(() => {
    if (!sign) return null
    const list = zodiacData[sign] || []
    if (!list.length) return null

    const prev = lastIndex[sign] ?? -1
    const next = (prev + 1) % list.length
    setLastIndex({ ...lastIndex, [sign]: next })
    return list[next]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sign])

  const currentSign = signs.find(s => s.key === sign)

  const handleSignSelect = (signKey) => {
    setHiding(true)
    setTimeout(() => {
      setSign(signKey)
      setHiding(false)
    }, 400)
  }

  const handleReset = () => {
    setSign('')
    setLastIndex({})
  }

  return (
    <Wrap>
      <StyledPanel $delay="0.2s">
        <div>
          <Title>🍹✨ Tu Trago del Destino</Title>
          <Description>
            {sign ? 'Tu destino ha sido revelado' : 'Selecciona tu signo zodiacal y descubre tu destino'}
          </Description>
        </div>

        {!sign ? (
          <SelectionGrid $hiding={hiding}>
            {signs.map(s => (
              <SignButton 
                key={s.key} 
                onClick={() => handleSignSelect(s.key)}
                aria-label={`Seleccionar ${s.label}`}
              >
                <SignEmoji>{s.emoji}</SignEmoji>
                <SignName>{s.label}</SignName>
              </SignButton>
            ))}
          </SelectionGrid>
        ) : (
          <>
            <ResultCard>
              <SignTitle>
                <span style={{ fontSize: '32px' }}>{currentSign?.emoji}</span>
                {currentSign?.label}
              </SignTitle>
              <ContentText>
                {entry?.startsWith('Challenge:') ? (
                  <>
                    <strong>🎯 Desafío</strong>
                    {entry.replace('Challenge: ', '')}
                  </>
                ) : (
                  <>
                    <strong>💫 Frase</strong>
                    {entry?.replace('Phrase: ', '')}
                  </>
                )}
              </ContentText>
            </ResultCard>
            <BackButton>
              <Button variant="secondary" onClick={handleReset}>
                ← Elegir otro signo
              </Button>
            </BackButton>
          </>
        )}
      </StyledPanel>
    </Wrap>
  )
}

export default ZodiacGame
