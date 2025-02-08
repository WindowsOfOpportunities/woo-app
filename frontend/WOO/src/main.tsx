import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import Routes from './routes/index.tsx'

createRoot(document.getElementById('root')!).render(

  <Routes />
  ,
)
