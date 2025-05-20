import routes from './routes'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from "./components/Header"

function App() {
  return (
    <>
      <Header />
      <main className='container mx-auto px-4 py-6'>
        <Routes>
          {routes.map(({ path, element }, idx) => (
            <Route key={idx} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </>
  )
}

export default App
