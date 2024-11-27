'use client'

import { useEffect } from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'

export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker зарегистрирован с областью:', registration.scope)
          })
          .catch(error => {
            console.error('Ошибка регистрации Service Worker:', error)
          })
      })
    }
  }, [])
  useRouter().push('/admin/panel')
}