import { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { COLORS } from '../colors.js'
import { Button } from './ui/Button.jsx'
import { Panel, Container } from './ui/Card.jsx'
import QRCode from 'react-qr-code'

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

// QR Hunt definitions (3 hidden codes in the event)
const HUNT_CODES = [
  { codeId: 'EGO-1', label: 'Código 1', prize: 'Shot gratis en la barra' },
  { codeId: 'EGO-2', label: 'Código 2', prize: 'Sticker pack EGO' },
  { codeId: 'EGO-3', label: 'Código 3', prize: 'Foto Polaroid VIP' },
]

function QrChallenge() {
  const [mode, setMode] = useState('intro') // 'intro' | 'scan' | 'found'
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState('')
  const [scanInfo, setScanInfo] = useState('')
  const [isLoadingScanner, setIsLoadingScanner] = useState(false)
  const [found, setFound] = useState(null) // { codeId, prize }
  const [progress, setProgress] = useState(() => {
    try {
      const raw = localStorage.getItem('ego-hunt-found')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const videoRef = useRef(null)
  const scannerRef = useRef(null)

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
        video: { facingMode: { ideal: 'environment' } }
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

      // Dynamically import qr-scanner and set worker path for Vite
      const qrModule = await import('qr-scanner')
      const QrScanner = qrModule.default
      // Attempt to set worker path (Vite will fingerprint the asset)
      try {
        QrScanner.WORKER_PATH = qrModule.WORKER_PATH || new URL('qr-scanner/qr-scanner-worker.min.js', import.meta.url).toString()
      } catch (_) {
        // Fallback: rely on internal worker if available
      }

      scannerRef.current = new QrScanner(
        videoRef.current,
        result => {
          if (!result) return
          const raw = result.data || result // Support detailed or plain result
          if (!raw) return
          // Accept JSON or URL. Preferred JSON payload:
          // { type: 'ego-hunt', codeId: 'EGO-1' }
          let payload = null
          try {
            payload = JSON.parse(raw)
          } catch (_) {
            // Link fallback: https://.../game/qr-challenge?type=ego-hunt&codeId=EGO-1
            try {
              const urlObj = new URL(raw)
              const type = urlObj.searchParams.get('type')
              const codeId = urlObj.searchParams.get('codeId')
              if (type === 'ego-hunt' && codeId) {
                payload = { type, codeId }
              }
            } catch {}
          }

          if (!payload || payload.type !== 'ego-hunt' || !payload.codeId) {
            setScanInfo('QR detectado, pero no es de la cacería EGO.')
            return
          }

          const match = HUNT_CODES.find(c => c.codeId === payload.codeId)
          if (!match) {
            setScanInfo('Código no válido para este evento.')
            return
          }

          // Mark as found and stop scanning
          addProgress(match.codeId)
          setFound({ codeId: match.codeId, prize: match.prize })
          handleStopScanning()
          setMode('found')
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          maxScansPerSecond: 4
        }
      )
      setScanInfo('Escaneando…')
      await scannerRef.current.start()
      setScanInfo('Buscando código…')
    } catch (err) {
      console.error(err)
      setError('No se pudo acceder a la cámara o iniciar el escáner.')
      setIsScanning(false)
      setMode('show')
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
    stopMediaTracks()
    setIsScanning(false)
    // don't change mode here; caller will decide
  }

  // Admin mode to print the 3 QR codes
  const params = new URLSearchParams(window.location.search)
  const isAdmin = params.get('admin') === '1'
  const adminCodes = HUNT_CODES.map(c => ({
    ...c,
    value: JSON.stringify({ type: 'ego-hunt', codeId: c.codeId })
  }))

  return (
    <Wrap>
      <StyledPanel $delay="0.2s">
        <div>
          {isAdmin ? (
            <>
              <Title>�️ Admin: QR Hunt</Title>
              <Description>Imprime estos 3 códigos y escóndelos en el evento. Quien los encuentre debe regresarlos al staff para canjear el premio.</Description>
            </>
          ) : (
            <>
              <Title>🔎 QR Hunt</Title>
              <Description>
                Encuentra los 3 códigos QR escondidos en el evento. Al escanear uno, verás tu premio. Para canjearlo, entrega el QR físico al staff.
              </Description>
            </>
          )}
        </div>

        {isAdmin ? (
          <>
            {adminCodes.map(code => (
              <ChallengeCard key={code.codeId}>
                <ChallengeEmoji>🏷️ {code.label}</ChallengeEmoji>
                <ChallengeText style={{ marginBottom: 16 }}>Premio: {code.prize}</ChallengeText>
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
              <ChallengeEmoji>🎯</ChallengeEmoji>
              <ChallengeText>
                Progreso: {progress.length}/3 encontrados
              </ChallengeText>
            </ChallengeCard>
            <ButtonGroup>
              <Button variant="secondary" onClick={handleStartScanning}>📷 Empezar a escanear</Button>
            </ButtonGroup>
          </>
        ) : mode === 'scan' ? (
          <>
            <ScannerContainer>
              <VideoElement ref={videoRef} playsInline muted />
              <ScannerOverlay />
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
                {isLoadingScanner ? 'Preparando escáner…' : scanInfo || '📷 Apunta la cámara a un QR de la cacería'}
              </InfoBox>
            )}
            {error && <ErrorBox>{error}</ErrorBox>}

            <Button variant="outline" onClick={() => { handleStopScanning(); setMode('intro') }}>✕ Cancelar</Button>
          </>
        ) : (
          <>
            <ChallengeCard>
              <ChallengeEmoji>🎉</ChallengeEmoji>
              <ChallengeText>
                ¡Código encontrado!
                <br />
                <strong>{found?.codeId}</strong>
                <br />
                Premio: {found?.prize}
              </ChallengeText>
            </ChallengeCard>
            <InfoBox>
              Para canjear tu premio, entrega el QR físico al staff del evento.
              {found && progress.filter(id => id === found.codeId).length > 0 && (
                <div style={{ marginTop: 8 }}>Este código ya quedó registrado en tu progreso.</div>
              )}
              <div style={{ marginTop: 8 }}>Progreso: {progress.length}/3</div>
            </InfoBox>
            <ButtonGroup>
              <Button variant="secondary" onClick={() => { setFound(null); setMode('intro') }}>Buscar otro QR</Button>
            </ButtonGroup>
          </>
        )}
      </StyledPanel>
    </Wrap>
  )
}

export default QrChallenge
