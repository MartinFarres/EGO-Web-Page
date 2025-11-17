import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // IMPORTANT: set base to repo name for GitHub Project Pages
  // https://<username>.github.io/<repo>/ -> base must be '/<repo>/'
  base: '/EGO-Web-Page/',
  plugins: [react()],
})
