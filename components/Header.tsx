'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import styles from './Header.module.css'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        <motion.a 
          href="/"
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
        >
          <div className={styles.logoImage}>
            <Image 
              src="/images/image.png" 
              alt="Simrit Gyan Logo" 
              width={50} 
              height={50}
              priority
            />
          </div>
          <span className={styles.logoText}>SIMRIT GYAN</span>
        </motion.a>
        
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          {[
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'About', path: '/about' },
            { name: 'Pricing', path: '/pricing' },
            { name: 'Gallery', path: '/gallery' },
            { name: 'Contact', path: '/contact' }
          ].map((item, i) => (
            <motion.a
              key={item.name}
              href={item.path}
              className={styles.navLink}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </motion.a>
          ))}
        </nav>

        <button 
          className={styles.menuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </motion.header>
  )
}