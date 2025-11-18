import { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { COLORS } from '../colors.js'
import { Button } from './ui/Button.jsx'
import { Panel, Container } from './ui/Card.jsx'
import QRCode from 'react-qr-code'
// Static imports for qr-scanner to ensure worker path is registered before usage
import QrScanner from 'qr-scanner'
import qrScannerWorkerPath from 'qr-scanner/qr-scanner-worker.min.js?url'
QrScanner.WORKER_PATH = qrScannerWorkerPath

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

const celebrationBounce = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(-10deg);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
  }
  70% {
    transform: scale(0.95) rotate(-2deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`

const gradientPulse = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`

const confettiFall = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
`

const shakeWiggle = keyframes`
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px) rotate(-5deg);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px) rotate(5deg);
  }
`

const sadPulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.98);
  }
`

const victoryPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
`

const trophySpin = keyframes`
  0% {
    transform: rotate(0deg) scale(0.3);
    opacity: 0;
  }
  60% {
    transform: rotate(360deg) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 1;
  }
`

const goldenShine = keyframes`
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

const ErrorBox = styled.div`
  background: #3b0d0d;
  border: 1px solid #ff5555aa;
  color: #ffdddd;
  padding: 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.black}aa;
  backdrop-filter: blur(4px);
  color: ${COLORS.white};
  font-weight: 600;
  font-size: 16px;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 6px solid ${COLORS.gold}44;
  border-top-color: ${COLORS.gold};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const scannerPulse = keyframes`
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 0 0 ${COLORS.vitalYellow}66, 0 0 0 9999px ${COLORS.black}88;
  }
  50% {
    opacity: 0.85;
    box-shadow: 0 0 0 8px ${COLORS.vitalYellow}00, 0 0 0 9999px ${COLORS.black}88;
  }
`;

const scanLine = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
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
  animation: ${scannerPulse} 2s ease-in-out infinite;
  
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

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, ${COLORS.vitalYellow}, transparent);
  animation: ${scanLine} 2s linear infinite;
`;

const SuccessCard = styled(ChallengeCard)`
  animation: ${celebrationBounce} 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
  overflow: hidden;
`;

const PrizeText = styled.strong`
  display: inline-block;
  background: linear-gradient(
    90deg,
    ${COLORS.vitalYellow},
    ${COLORS.fireOrange},
    ${COLORS.gold},
    ${COLORS.vitalYellow}
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradientPulse} 2s ease-in-out infinite;
  font-size: 22px;
`;

const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
`;

const Confetti = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${props => props.$color};
  top: -20px;
  left: ${props => props.$left}%;
  animation: ${confettiFall} ${props => props.$duration}s linear forwards;
  animation-delay: ${props => props.$delay}s;
  border-radius: 2px;
  opacity: 0.9;
`;

const FakeCard = styled(ChallengeCard)`
  animation: ${shakeWiggle} 0.6s ease-in-out;
  background: linear-gradient(145deg, #2a1a1a, #3a2020);
  border: 2px solid #ff555588;
`;

const FakeEmoji = styled(ChallengeEmoji)`
  animation: ${sadPulse} 1.5s ease-in-out infinite;
`;

const FakeMessage = styled.div`
  color: #ffdddd;
  font-size: 18px;
  line-height: 1.6;
  font-weight: 500;
  margin-top: 12px;
`;

const VictoryCard = styled(ChallengeCard)`
  animation: ${victoryPulse} 2s ease-in-out infinite;
  background: linear-gradient(
    145deg,
    ${COLORS.gold}44,
    ${COLORS.vitalYellow}44,
    ${COLORS.fireOrange}44
  );
  background-size: 200% 200%;
  border: 3px solid ${COLORS.gold};
  box-shadow: 0 0 40px ${COLORS.gold}88;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent,
      ${COLORS.gold}33,
      transparent
    );
    animation: ${goldenShine} 3s linear infinite;
  }
`;

const TrophyEmoji = styled.div`
  font-size: 96px;
  animation: ${trophySpin} 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  filter: drop-shadow(0 0 20px ${COLORS.gold});
`;

const VictoryText = styled.div`
  color: ${COLORS.white};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

// Treasure Hunt definitions (3 hidden treasures in the event)
const HUNT_CODES = [
  { codeId: 'EGO-1', label: 'Tesoro de Oro', prize: 'Shot gratis en la barra' },
  { codeId: 'EGO-2', label: 'Tesoro de Plata', prize: 'Sticker pack EGO' },
  { codeId: 'EGO-3', label: 'Tesoro de Diamante', prize: 'Foto Polaroid VIP' },
]

// Fake QR codes (3 decoys with no prizes)
const FAKE_CODES = [
  { codeId: 'FAKE-1', label: 'Tesoro Falso 1', message: '¡Casi! Este es un tesoro falso 😜' },
  { codeId: 'FAKE-2', label: 'Tesoro Falso 2', message: '¡Upss! Cofre vacío, inténtalo de nuevo 🎭' },
  { codeId: 'FAKE-3', label: 'Tesoro Falso 3', message: '¡Trampa pirata! Sigue buscando 🏴‍☠️' },
]

function QrChallenge() {
  const [mode, setMode] = useState('intro') // 'intro' | 'scan' | 'found' | 'found-fake' | 'completed'
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState('')
  const [scanInfo, setScanInfo] = useState('')
  const [isLoadingScanner, setIsLoadingScanner] = useState(false)
  const [found, setFound] = useState(null) // { codeId, prize } or { codeId, message }
  const [attempts, setAttempts] = useState(0)
  const [progress, setProgress] = useState(() => {
    try {
      const raw = localStorage.getItem('ego-hunt-found')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  
  const isCompleted = progress.length >= 3
  const videoRef = useRef(null)
  const scannerRef = useRef(null)
  const manualFallbackTimeoutRef = useRef(null)
  const debug = new URLSearchParams(window.location.search).get('debug') === '1'

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop()
        scannerRef.current = null
      }
      stopMediaTracks()
    }
  }, [])

  const addProgress = codeId => {
    setProgress(prev => {
      if (prev.includes(codeId)) return prev
      const next = [...prev, codeId]
      try { localStorage.setItem('ego-hunt-found', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const stopMediaTracks = () => {
    const video = videoRef.current
    if (video && video.srcObject) {
      const stream = video.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
      video.srcObject = null
    }
  }

  const handleStartScanning = async () => {
    setError('')
    setScanInfo('')
    setMode('scan')
    setIsScanning(true)
    setIsLoadingScanner(true)
    setAttempts(0)

    // Secure context check (required for camera on mobile browsers)
    if (!window.isSecureContext) {
      setError('El acceso a la cámara requiere HTTPS o localhost. Usa una conexión segura (por ejemplo: https://) o un túnel como ngrok.')
      setIsScanning(false)
      setIsLoadingScanner(false)
      return
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Tu navegador no soporta acceso a la cámara.')
      setIsScanning(false)
      setIsLoadingScanner(false)
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // simpler facingMode improves compatibility on iOS
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      // Wait for video readiness
      await new Promise(resolve => {
        if (!videoRef.current) return resolve()
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
          resolve()
        }
      })

      const handleResult = rawResult => {
        if (!rawResult) return
        setAttempts(a => a + 1)
        const raw = rawResult.data || rawResult
        if (!raw) return
        let payload = null
        try {
          payload = JSON.parse(raw)
        } catch (_) {
          try {
            const urlObj = new URL(raw)
            const type = urlObj.searchParams.get('type')
            const codeId = urlObj.searchParams.get('codeId')
            if (type === 'ego-hunt' && codeId) payload = { type, codeId }
          } catch {}
        }
        if (!payload || payload.type !== 'ego-hunt' || !payload.codeId) {
          setScanInfo('QR detectado, pero no es de la cacería EGO.')
          return
        }
        
        // Check if it's a real prize code
        const realMatch = HUNT_CODES.find(c => c.codeId === payload.codeId)
        if (realMatch) {
          // Provide immediate visual feedback
          addProgress(realMatch.codeId)
          setFound({ codeId: realMatch.codeId, prize: realMatch.prize })
          
          // Check if this completes the hunt
          const currentProgress = JSON.parse(localStorage.getItem('ego-hunt-found') || '[]')
          if (currentProgress.length >= 3) {
            setMode('completed')
          } else {
            setMode('found')
          }
          
          // Cleanup scanner after state updates
          setTimeout(() => {
            handleStopScanning()
          }, 150)
          return
        }
        
        // Check if it's a fake code
        const fakeMatch = FAKE_CODES.find(c => c.codeId === payload.codeId)
        if (fakeMatch) {
          // Provide immediate visual feedback
          setFound({ codeId: fakeMatch.codeId, message: fakeMatch.message })
          setMode('found-fake')
          
          // Cleanup scanner after state updates
          setTimeout(() => {
            handleStopScanning()
          }, 150)
          return
        }
        
        // Unknown code
        setScanInfo('Código no válido para este evento.')
        return
      }

      scannerRef.current = new QrScanner(videoRef.current, handleResult, {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        maxScansPerSecond: 10, // Increased for faster detection
        calculateScanRegion: (video) => {
          // Optimize scan region for better performance
          const smallestDimension = Math.min(video.videoWidth, video.videoHeight)
          const scanRegionSize = Math.round(0.6 * smallestDimension)
          return {
            x: Math.round((video.videoWidth - scanRegionSize) / 2),
            y: Math.round((video.videoHeight - scanRegionSize) / 2),
            width: scanRegionSize,
            height: scanRegionSize,
          }
        }
      })
      setScanInfo('Escaneando…')
      await scannerRef.current.start()
      setScanInfo('Buscando código…')

      // Manual fallback: after 8s try one still-frame decode if nothing found
      manualFallbackTimeoutRef.current = setTimeout(async () => {
        if (found || mode !== 'scan' || !videoRef.current) return
        try {
          const stillResult = await QrScanner.scanImage(videoRef.current, {
            returnDetailedScanResult: true
          })
          if (stillResult) handleResult(stillResult)
          else setScanInfo('Sin lectura aún. Acerca el QR y mejora la iluminación.')
        } catch {
          setScanInfo('Intento manual sin éxito. Reacomoda el QR.')
        }
      }, 8000)
    } catch (err) {
      console.error(err)
      const maybeWorker = /Worker|script at|cannot be accessed|Failed to construct/i.test(String(err?.message || err))
      setError('No se pudo acceder a la cámara o iniciar el escáner.' + (maybeWorker ? ' Posible causa: el worker del lector no se está cargando. Intenta nuevamente; ya ajusté la ruta del worker para Vite.' : ''))
      setIsScanning(false)
      setMode('intro')
      stopMediaTracks()
    } finally {
      setIsLoadingScanner(false)
    }
  }

  const handleStopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop()
      scannerRef.current = null
    }
    if (manualFallbackTimeoutRef.current) {
      clearTimeout(manualFallbackTimeoutRef.current)
      manualFallbackTimeoutRef.current = null
    }
    stopMediaTracks()
    setIsScanning(false)
    // don't change mode here; caller will decide
  }

  // Admin mode to print the QR codes (real + fake)
  const params = new URLSearchParams(window.location.search)
  const isAdmin = params.get('admin') === '1'
  const adminCodes = HUNT_CODES.map(c => ({
    ...c,
    value: JSON.stringify({ type: 'ego-hunt', codeId: c.codeId }),
    isFake: false
  }))
  const adminFakeCodes = FAKE_CODES.map(c => ({
    ...c,
    value: JSON.stringify({ type: 'ego-hunt', codeId: c.codeId }),
    isFake: true
  }))
  const allAdminCodes = [...adminCodes, ...adminFakeCodes]

  return (
    <Wrap>
      <StyledPanel $delay="0.2s">
        <div>
          {isAdmin ? (
            <>
              <Title>🗝️ Admin: Treasure Hunt</Title>
              <Description>Imprime estos 3 tesoros y escóndelos en el evento. Los cazadores de tesoros deben encontrarlos y regresarlos al staff para canjear sus premios.</Description>
            </>
          ) : (
            <>
              <Title>🏴‍☠️ Treasure Hunt</Title>
              <Description>
                ¡Embárcate en la búsqueda del tesoro! Encuentra los 3 tesoros escondidos en el evento. Escanea cada uno para revelar tu premio y entrégalo al staff para canjearlo.
              </Description>
            </>
          )}
        </div>

        {isAdmin ? (
          <>
            {allAdminCodes.map(code => (
              <ChallengeCard key={code.codeId} style={{ background: code.isFake ? 'linear-gradient(145deg, #2a1a1a, #3a2020)' : undefined, borderColor: code.isFake ? '#ff555588' : undefined }}>
                <ChallengeEmoji>{code.isFake ? '�' : '�🏷️'} {code.label}</ChallengeEmoji>
                <ChallengeText style={{ marginBottom: 16 }}>
                  {code.isFake ? `Señuelo: ${code.message}` : `Premio: ${code.prize}`}
                </ChallengeText>
                <QrContainer>
                  <QRCode value={code.value} size={220} level="H" includeMargin={true} />
                </QrContainer>
                <InfoBox>Payload: {JSON.stringify({ type: 'ego-hunt', codeId: code.codeId })}</InfoBox>
              </ChallengeCard>
            ))}
            <Button variant="secondary" onClick={() => window.print()}>🖨️ Imprimir</Button>
          </>
        ) : mode === 'intro' ? (
          <>
            <ChallengeCard>
              <ChallengeEmoji>💎</ChallengeEmoji>
              <ChallengeText>
                Tesoros encontrados: {progress.length}/3
              </ChallengeText>
            </ChallengeCard>
            {!isCompleted ? (
              <ButtonGroup>
                <Button variant="secondary" onClick={handleStartScanning}>� Buscar Tesoros</Button>
              </ButtonGroup>
            ) : (
              <InfoBox style={{ background: COLORS.gold + '22', borderColor: COLORS.gold + '66' }}>
                🏆 ¡Completaste la búsqueda del tesoro! Has encontrado los 3 tesoros escondidos.
              </InfoBox>
            )}
          </>
        ) : mode === 'scan' ? (
          <>
            <ScannerContainer>
              <VideoElement ref={videoRef} playsInline muted />
              <ScannerOverlay>
                <ScanLine />
              </ScannerOverlay>
              {isLoadingScanner && (
                <LoadingOverlay>
                  <div style={{ display: 'grid', gap: '12px', placeItems: 'center' }}>
                    <Spinner />
                    <div>Iniciando cámara…</div>
                  </div>
                </LoadingOverlay>
              )}
            </ScannerContainer>
            {!error && (
              <InfoBox>
                {isLoadingScanner ? 'Preparando escáner…' : scanInfo || '� Apunta la cámara al tesoro escondido'}
                {debug && (
                  <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
                    Debug: intentos {attempts} | resolución tentativa {videoRef.current?.videoWidth}x{videoRef.current?.videoHeight}
                  </div>
                )}
              </InfoBox>
            )}
            {error && <ErrorBox>{error}</ErrorBox>}

            <Button variant="outline" onClick={() => { handleStopScanning(); setMode('intro') }}>✕ Cancelar</Button>
          </>
        ) : mode === 'found' ? (
          <>
            <ConfettiContainer>
              {Array.from({ length: 50 }).map((_, i) => (
                <Confetti
                  key={i}
                  $color={[COLORS.vitalYellow, COLORS.fireOrange, COLORS.gold, '#FF6B9D', '#C084FC'][i % 5]}
                  $left={Math.random() * 100}
                  $duration={2 + Math.random() * 2}
                  $delay={Math.random() * 0.5}
                />
              ))}
            </ConfettiContainer>
            <SuccessCard>
              <ChallengeEmoji>💎✨</ChallengeEmoji>
              <ChallengeText>
                ¡Tesoro encontrado!
                <br />
                <strong>{found?.codeId}</strong>
                <br />
                Premio: <PrizeText>{found?.prize}</PrizeText>
              </ChallengeText>
            </SuccessCard>
            <InfoBox>
              Para canjear tu premio, entrega el tesoro (QR físico) al staff del evento.
              {found && progress.filter(id => id === found.codeId).length > 0 && (
                <div style={{ marginTop: 8 }}>Este tesoro ya está en tu colección.</div>
              )}
              <div style={{ marginTop: 8 }}>Tesoros: {progress.length}/3</div>
            </InfoBox>
            <ButtonGroup>
              <Button variant="secondary" onClick={() => { setFound(null); setMode('intro') }}>🔍 Buscar otro Tesoro</Button>
            </ButtonGroup>
          </>
        ) : mode === 'found-fake' ? (
          <>
            <FakeCard>
              <FakeEmoji>😅</FakeEmoji>
              <FakeMessage>
                {found?.message || '¡Casi! Este es un señuelo'}
                <br />
                <div style={{ fontSize: 14, opacity: 0.8, marginTop: 8 }}>
                  Código: {found?.codeId}
                </div>
              </FakeMessage>
            </FakeCard>
            <InfoBox style={{ background: '#3a202022', borderColor: '#ff555544' }}>
              ¡Falsa alarma! Este no es un tesoro real, ¡pero sigue buscando! Los verdaderos tesoros están escondidos en el evento.
              <div style={{ marginTop: 8 }}>Tesoros reales: {progress.length}/3</div>
            </InfoBox>
            <ButtonGroup>
              <Button variant="secondary" onClick={() => { setFound(null); setMode('intro') }}>🔍 Seguir cazando</Button>
            </ButtonGroup>
          </>
        ) : mode === 'completed' ? (
          <>
            <ConfettiContainer>
              {Array.from({ length: 80 }).map((_, i) => (
                <Confetti
                  key={i}
                  $color={[COLORS.gold, COLORS.vitalYellow, COLORS.fireOrange, '#FFD700', '#FFA500'][i % 5]}
                  $left={Math.random() * 100}
                  $duration={3 + Math.random() * 2}
                  $delay={Math.random() * 0.8}
                />
              ))}
            </ConfettiContainer>
            <VictoryCard>
              <TrophyEmoji>�‍☠️</TrophyEmoji>
              <VictoryText>
                ¡TESOROS COMPLETADOS!
                <br />
                <div style={{ fontSize: 18, marginTop: 12, opacity: 0.9 }}>
                  ¡Encontraste los 3 tesoros escondidos!
                </div>
              </VictoryText>
            </VictoryCard>
            <InfoBox style={{ background: COLORS.gold + '22', borderColor: COLORS.gold + '88' }}>
              <strong style={{ color: COLORS.vitalYellow, fontSize: 16 }}>🎉 ¡Felicidades, cazador de tesoros legendario!</strong>
              <div style={{ marginTop: 8 }}>
                Has completado la búsqueda del tesoro. Ve al staff del evento con los 3 tesoros (QR físicos) para canjear tus premios.
              </div>
              <div style={{ marginTop: 12, fontSize: 13, opacity: 0.8 }}>
                Tesoros encontrados: {progress.join(', ')}
              </div>
            </InfoBox>
            <ButtonGroup>
              <Button variant="secondary" onClick={() => { setFound(null); setMode('intro') }}>💎 Ver colección</Button>
            </ButtonGroup>
          </>
        ) : null}
      </StyledPanel>
    </Wrap>
  )
}

export default QrChallenge
