import { useState, useRef, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { COLORS } from '../colors.js'
import { Button } from './ui/Button.jsx'
import { Panel, Container } from './ui/Card.jsx'
import QRCode from 'react-qr-code'
import QrScanner from 'qr-scanner'
import qrScannerWorkerPath from 'qr-scanner/qr-scanner-worker.min.js?url'
QrScanner.WORKER_PATH = qrScannerWorkerPath

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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
  border: 2px solid ${COLORS.gold}66;
  border-radius: 20px;
  padding: 24px;
  max-width: 450px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: grid;
  gap: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  animation: ${fadeIn} 0.4s ease-out;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: ${COLORS.vitalYellow};
  font-size: 22px;
  text-align: center;
`;

const ModalText = styled.p`
  margin: 0;
  color: ${COLORS.white}cc;
  line-height: 1.6;
  text-align: center;
  font-size: 15px;
`;

const QrContainer = styled.div`
  background: ${COLORS.white};
  padding: 20px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const ScannerContainer = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: ${COLORS.black};
  border: 2px solid ${COLORS.gold}66;
  width: 100%;
  max-width: 100%;
`;

const VideoElement = styled.video`
  width: 100%;
  height: auto;
  display: block;
  max-height: 400px;
  object-fit: cover;
`;

const ScannerOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  border: 3px solid ${COLORS.vitalYellow};
  border-radius: 12px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
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

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${COLORS.gold}33;
  border-top-color: ${COLORS.gold};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ScanStatus = styled.div`
  text-align: center;
  color: ${COLORS.white}cc;
  font-size: 14px;
  padding: 12px;
  background: ${COLORS.gold}11;
  border-radius: 8px;
`;

const ErrorText = styled.div`
  color: #ff6b6b;
  background: #2a0a0a;
  padding: 12px;
  border-radius: 10px;
  border-left: 4px solid #ff6b6b;
  font-size: 14px;
  text-align: center;
`;

const HelperSection = styled.div`
  background: linear-gradient(145deg, ${COLORS.gold}11, ${COLORS.vitalYellow}11);
  border: 2px solid ${COLORS.gold}44;
  border-radius: 16px;
  padding: 20px;
  display: grid;
  gap: 16px;
`;

const HelperTitle = styled.h4`
  margin: 0;
  color: ${COLORS.gold};
  font-size: 18px;
  text-align: center;
`;

const HelperText = styled.p`
  margin: 0;
  color: ${COLORS.white}cc;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
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
  const [tasks, setTasks] = useState(() => {
    // Load saved tasks from localStorage
    try {
      const saved = localStorage.getItem('ego-bingo-tasks')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.error('Error loading tasks:', e)
    }
    return shuffleTasks()
  })
  
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [showHelperModal, setShowHelperModal] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [scanError, setScanError] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [validationCode, setValidationCode] = useState('')
  
  const videoRef = useRef(null)
  const scannerRef = useRef(null)

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('ego-bingo-tasks', JSON.stringify(tasks))
    } catch (e) {
      console.error('Error saving tasks:', e)
    }
  }, [tasks])

  // Generate validation code on mount
  useEffect(() => {
    const code = generateValidationCode()
    setValidationCode(code)
  }, [])

  // Cleanup scanner on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop()
        scannerRef.current = null
      }
      stopMediaTracks()
    }
  }, [])

  const generateValidationCode = () => {
    // Generate a unique code for this user session
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 8)
    return `BINGO-${timestamp}-${random}`.toUpperCase()
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

  const handleTaskClick = (taskId) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return
    
    // If already completed, allow uncompleting without confirmation
    if (task.completed) {
      setTasks(prev => prev.map(t => 
        t.id === taskId 
          ? { ...t, completed: false }
          : t
      ))
      return
    }
    
    // Show confirmation modal for completing
    setSelectedTask(task)
    setShowConfirmModal(true)
  }

  const handleStartScanning = async () => {
    setScanError('')
    setShowScanner(true)
    setIsScanning(true)

    if (!window.isSecureContext) {
      setScanError('El acceso a la cámara requiere HTTPS o localhost.')
      setIsScanning(false)
      return
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setScanError('Tu navegador no soporta acceso a la cámara.')
      setIsScanning(false)
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      await new Promise(resolve => {
        if (!videoRef.current) return resolve()
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
          resolve()
        }
      })

      const handleResult = rawResult => {
        if (!rawResult) return
        const raw = rawResult.data || rawResult
        if (!raw) return
        
        let payload = null
        try {
          payload = JSON.parse(raw)
        } catch (_) {
          // Not JSON, might be invalid
        }
        
        if (!payload || payload.type !== 'ego-bingo-validation') {
          setScanError('QR no válido. Debe ser un código de validación del Bingo.')
          return
        }
        
        // Valid QR scanned! Complete the task
        if (selectedTask) {
          setTasks(prev => prev.map(t => 
            t.id === selectedTask.id 
              ? { ...t, completed: true }
              : t
          ))
        }
        
        handleStopScanning()
        setShowConfirmModal(false)
        setSelectedTask(null)
      }

      scannerRef.current = new QrScanner(videoRef.current, handleResult, {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        maxScansPerSecond: 5
      })
      
      await scannerRef.current.start()
    } catch (err) {
      console.error(err)
      setScanError('No se pudo acceder a la cámara.')
      setIsScanning(false)
    }
  }

  const handleStopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop()
      scannerRef.current = null
    }
    stopMediaTracks()
    setIsScanning(false)
    setShowScanner(false)
  }

  const handleCancelConfirmation = () => {
    setShowConfirmModal(false)
    setSelectedTask(null)
    setShowScanner(false)
    setScanError('')
    handleStopScanning()
  }

  const handleNewCard = () => {
    const newTasks = shuffleTasks()
    setTasks(newTasks)
  }

  const completedCount = tasks.filter(t => t.completed).length
  const progress = Math.round((completedCount / 9) * 100)

  return (
    <Wrap>
      <StyledPanel $delay="0.2s">
        <div>
          <Title>🎯 Social Bingo</Title>
          <Description>
            Completa las tareas sociales. Para confirmar un desafío, necesitas que alguien escanee tu QR.
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
              onClick={() => handleTaskClick(task.id)}
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

        <HelperSection>
          <HelperTitle>🤝 Ayuda a otros</HelperTitle>
          <HelperText>
            ¿Viste a alguien completar un desafío? ¡Ayúdales! Muestra este QR para que lo escaneen y confirmen su logro.
          </HelperText>
          <QrContainer>
            <QRCode 
              value={JSON.stringify({ type: 'ego-bingo-validation', code: validationCode })} 
              size={180} 
              level="H"
            />
          </QrContainer>
          <HelperText style={{ fontSize: '12px', opacity: 0.7 }}>
            Código: {validationCode}
          </HelperText>
        </HelperSection>

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

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && handleCancelConfirmation()}>
          <ModalContent>
            <ModalTitle>✅ Confirmar Desafío</ModalTitle>
            
            {selectedTask && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>{selectedTask.emoji}</div>
                <ModalText style={{ fontSize: '18px', fontWeight: '600', color: COLORS.white }}>
                  {selectedTask.text}
                </ModalText>
              </div>
            )}
            
            <ModalText>
              Para completar este desafío, necesitas que alguien que te vio completarlo escanee tu código QR con el botón de "Ayuda a otros".
            </ModalText>

            {!showScanner ? (
              <>
                <InfoBox>
                  💡 Pídele a alguien que escanee el QR de la sección "Ayuda a otros" en esta página
                </InfoBox>
                
                <ButtonGroup>
                  <Button variant="primary" onClick={handleStartScanning} style={{ flex: 1 }}>
                    📷 Escanear QR
                  </Button>
                  <Button variant="outline" onClick={handleCancelConfirmation} style={{ flex: 1 }}>
                    Cancelar
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <>
                <ScannerContainer>
                  <VideoElement ref={videoRef} playsInline muted />
                  <ScannerOverlay />
                </ScannerContainer>

                {isScanning && !scanError && (
                  <ScanStatus>
                    📷 Apunta la cámara al QR de validación
                  </ScanStatus>
                )}

                {scanError && <ErrorText>{scanError}</ErrorText>}

                <Button variant="outline" onClick={handleCancelConfirmation}>
                  ✕ Cancelar
                </Button>
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrap>
  )
}

export default SocialBingo
