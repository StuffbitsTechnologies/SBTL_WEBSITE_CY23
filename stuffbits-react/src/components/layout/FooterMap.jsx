import { useEffect, useRef } from 'react'

const LOCATION = {
  coords: { lat: 18.50577344399995, lng: 73.93404613969308 },
  plusCode: 'GW4M+2GQ',
  address: 'Malwadi, Hadapsar, Pune, Maharashtra 411028',
}
const MAP_ZOOM = 12

export default function FooterMap({ tall = false }) {
  const mapRef = useRef(null)
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const hasRealKey = apiKey && apiKey !== 'your_api_key_here'
  const frameH = tall ? 'h-80 md:h-96' : 'h-64'
  const clip = tall ? 'rounded-none' : 'rounded-lg'

  useEffect(() => {
    // If there is no real API key configured, fall back to simple iframe embed
    if (!hasRealKey || !mapRef.current) return

    const initMap = () => {
      if (!window.google) return
      const map = new window.google.maps.Map(mapRef.current, {
        center: LOCATION.coords,
        zoom: MAP_ZOOM,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#1a2757' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#0d1220' }] },
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      })
      new window.google.maps.Marker({
        position: LOCATION.coords,
        map,
        title: 'StuffBits Technologies Pvt. Ltd.',
      })
      const trafficLayer = new window.google.maps.TrafficLayer()
      trafficLayer.setMap(map)
    }

    if (window.google?.maps) {
      initMap()
      return
    }

    // Avoid loading the Maps JS API multiple times
    if (document.querySelector('#footer-google-maps-script')) {
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=window.__footerMapInit`
    script.async = true
    script.defer = true
    script.id = 'footer-google-maps-script'
    window.__footerMapInit = () => {
      initMap()
      delete window.__footerMapInit
    }
    document.head.appendChild(script)
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [hasRealKey])

  if (!hasRealKey) {
    const query = `${LOCATION.plusCode}, ${LOCATION.address}`
    const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${MAP_ZOOM}&output=embed`
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
    return (
      <div className="relative w-full">
        <iframe
          title="StuffBits location"
          src={embedSrc}
          className={`block w-full border-0 ${frameH}`}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 px-3 py-1.5 bg-navy text-gold text-xs font-medium rounded hover:bg-none hover:bg-gold hover:text-navy transition-colors"
        >
          Open in Google Maps →
        </a>
      </div>
    )
  }

  return <div ref={mapRef} className={`w-full overflow-hidden bg-navy-light ${frameH} ${clip}`} />
}

