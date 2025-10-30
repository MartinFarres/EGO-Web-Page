import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { COLORS } from '../colors.js'
import { Button } from './ui/Button.jsx'
import { Input, Label } from './ui/Input.jsx'
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

const Description = styled.p`
  margin: 8px 0 0;
  color: #bdbdbd;
  line-height: 1.5;
  font-size: 14px;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 10px;
`;

const StatementsList = styled.div`
  display: grid;
  gap: 16px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const StatementCard = styled.div`
  background: linear-gradient(145deg, ${COLORS.gold}15, ${COLORS.vitalYellow}15);
  border: 2px solid ${COLORS.gold}44;
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s;
  
  &:hover {
    transform: translateX(4px);
    border-color: ${COLORS.gold}88;
  }
`;

const StatementNumber = styled.div`
  color: ${COLORS.gold};
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
`;

const StatementText = styled.div`
  color: ${COLORS.white};
  font-size: 16px;
  line-height: 1.6;
`;

const HintBox = styled.div`
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

const STORAGE_KEY = 'ego-two-truths-mask'

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function TwoTruthsOneMask() {
  const [truth1, setTruth1] = useState('')
  const [truth2, setTruth2] = useState('')
  const [mask, setMask] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [shuffledStatements, setShuffledStatements] = useState([])

  useEffect(() => {
    // Load saved statements from localStorage
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setTruth1(data.truth1 || '')
        setTruth2(data.truth2 || '')
        setMask(data.mask || '')
        if (data.truth1 && data.truth2 && data.mask) {
          setIsPlaying(true)
          setShuffledStatements(shuffleArray([
            { id: 1, text: data.truth1 },
            { id: 2, text: data.truth2 },
            { id: 3, text: data.mask }
          ]))
        }
      } catch (e) {
        console.error('Failed to load saved statements', e)
      }
    }
  }, [])

  const handleSaveAndPlay = () => {
    if (!truth1.trim() || !truth2.trim() || !mask.trim()) {
      alert('Por favor completa las tres frases')
      return
    }

    const data = { truth1, truth2, mask }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    
    const statements = shuffleArray([
      { id: 1, text: truth1 },
      { id: 2, text: truth2 },
      { id: 3, text: mask }
    ])
    
    setShuffledStatements(statements)
    setIsPlaying(true)
  }

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres reiniciar y editar tus frases?')) {
      setIsPlaying(false)
    }
  }

  const handleClearAll = () => {
    if (confirm('¿Estás seguro de que quieres borrar todo y empezar de nuevo?')) {
      localStorage.removeItem(STORAGE_KEY)
      setTruth1('')
      setTruth2('')
      setMask('')
      setIsPlaying(false)
      setShuffledStatements([])
    }
  }

  return (
    <Wrap>
      <StyledPanel $delay="0.2s">
        <div>
          <Title>🎭 Dos Verdades y una Máscara</Title>
          <Description>
            {isPlaying 
              ? 'Muestra tu pantalla a otra persona y deja que adivine cuál es tu máscara'
              : 'Crea tu juego: dos verdades sobre ti y una mentira (tu máscara)'}
          </Description>
        </div>

        {!isPlaying ? (
          <>
            <FormGroup>
              <Label htmlFor="truth1">Verdad 1</Label>
              <Input
                id="truth1"
                placeholder="Ejemplo: He viajado a 10 países"
                value={truth1}
                onChange={(e) => setTruth1(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="truth2">Verdad 2</Label>
              <Input
                id="truth2"
                placeholder="Ejemplo: Tengo un gato llamado Whiskers"
                value={truth2}
                onChange={(e) => setTruth2(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="mask">Tu Máscara (Mentira)</Label>
              <Input
                id="mask"
                placeholder="Ejemplo: Sé tocar la guitarra"
                value={mask}
                onChange={(e) => setMask(e.target.value)}
              />
            </FormGroup>

            <HintBox>
              💡 Tip: Haz tu máscara creíble para que sea más difícil de adivinar
            </HintBox>

            <Button 
              variant="primary" 
              onClick={handleSaveAndPlay}
              disabled={!truth1.trim() || !truth2.trim() || !mask.trim()}
            >
              Guardar y Jugar
            </Button>
          </>
        ) : (
          <>
            <StatementsList>
              {shuffledStatements.map((statement, index) => (
                <StatementCard key={statement.id}>
                  <StatementNumber>Frase {index + 1}</StatementNumber>
                  <StatementText>{statement.text}</StatementText>
                </StatementCard>
              ))}
            </StatementsList>

            <HintBox>
              🎯 La otra persona debe adivinar cuál de las tres frases es la máscara
            </HintBox>

            <ButtonGroup>
              <Button variant="secondary" onClick={handleReset}>
                ✏️ Editar
              </Button>
              <Button variant="outline" onClick={handleClearAll}>
                🔄 Reiniciar Todo
              </Button>
            </ButtonGroup>
          </>
        )}
      </StyledPanel>
    </Wrap>
  )
}

export default TwoTruthsOneMask
