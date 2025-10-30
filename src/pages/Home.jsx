import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Landing from '../components/Landing.jsx'
import GameMenu from '../components/GameMenu.jsx'

function Home() {
  const location = useLocation()

  useEffect(() => {
    // If URL contains #games, scroll to the GameMenu after render
    if (location.hash === '#games') {
      // small timeout to allow layout to finish
      setTimeout(() => {
        const el = document.getElementById('games')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
    }
  }, [location])

  return (
    <>
      <Landing />
      <GameMenu />
    </>
  )
}

export default Home
