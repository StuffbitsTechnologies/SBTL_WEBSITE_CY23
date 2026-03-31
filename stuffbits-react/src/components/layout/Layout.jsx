import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-14">
        <Outlet />
      </main>
      <Footer />
      {/* Elfsight: fixed wrapper so injected widget doesn’t add height below footer
      <div className="fixed bottom-0 right-0 z-[100] w-0 h-0 overflow-visible">
        <div
          className="elfsight-app-60802da7-3db2-4f0f-95b2-c24a2b6a2dfa"
          data-elfsight-app-lazy
        />
      </div> */}
    </div>
  )
}
