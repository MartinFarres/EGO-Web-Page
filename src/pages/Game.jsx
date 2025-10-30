import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import StickerMatch from '../components/StickerMatch.jsx'
import ZodiacGame from '../components/ZodiacGame.jsx'
import TwoTruthsOneMask from '../components/TwoTruthsOneMask.jsx'
import QrChallenge from '../components/QrChallenge.jsx'
import SocialBingo from '../components/SocialBingo.jsx'
import EgoOracle from '../components/EgoOracle.jsx'
import { COLORS } from '../colors.js'
import { Button } from '../components/ui/Button.jsx'

const Wrapper = styled.div`
  min-height: 100vh;
  background: radial-gradient(ellipse at top, #1a1a1a 0%, ${COLORS.black} 50%);
`

const Header = styled.div`
  padding: 20px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: sticky;
  top: 0;
  background: ${COLORS.black}ee;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #1d1d1d;
  z-index: 100;
`

const NotFound = styled.div`
  padding: 40px 16px;
  text-align: center;
  color: ${COLORS.white}99;
`

function Game() {
  const { gameId } = useParams()

  const renderGame = () => {
    if (gameId === 'sticker-match') return <StickerMatch />
    if (gameId === 'trago-del-destino') return <ZodiacGame />
    if (gameId === 'two-truths') return <TwoTruthsOneMask />
    if (gameId === 'qr-challenge') return <QrChallenge />
    if (gameId === 'social-bingo') return <SocialBingo />
    if (gameId === 'ego-oracle') return <EgoOracle />
    return (
      <NotFound>
        <p style={{ fontSize: '48px', margin: '0 0 16px' }}>🤔</p>
        <p>Juego no encontrado.</p>
      </NotFound>
    )
  }

  return (
    <Wrapper>
      <Header>
        <Link to="/#games" style={{ textDecoration: 'none' }}>
          <Button variant="secondary">← Volver</Button>
        </Link>
      </Header>
      {renderGame()}
    </Wrapper>
  )
}

export default Game
