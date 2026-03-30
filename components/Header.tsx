'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import styles from './Header.module.css'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Need a Tutor', path: '/need-a-tutor' },
  { name: 'About', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Join as Tutor', path: '/join-as-tutor' },
  { name: 'Contact', path: '/contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const close = () => setIsMobileMenuOpen(false)

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        {/* Logo */}
        <a href="/" className={styles.logo}>
          <div className={styles.logoImage}>
            <Image src="/images/image.png" alt="Simrit Gyan Logo" width={50} height={50} priority />
          </div>
          <span className={styles.logoText}>SIMRIT GYAN</span>
        </a>

        {/* Nav — plain <a> tags to avoid framer-motion DOM conflicts on mobile */}
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          {navLinks.map(item => (
            <a
              key={item.name}
              href={item.path}
              onClick={close}
              className={`${styles.navLink}
                ${item.name === 'Join as Tutor' ? styles.navHighlight : ''}
                ${item.name === 'Need a Tutor' ? styles.navNeedTutor : ''}`}
            >
              {item.name}
            </a>
          ))}

          {/* Teacher Login inside mobile menu */}
          <a href="/teacher/login" className={styles.teacherBtnMobile} onClick={close}>
            <GraduationCap size={18} />
            Teacher Login
          </a>
        </nav>

        {/* Teacher Login — desktop only */}
        <a href="/teacher/login" className={styles.teacherBtn}>
          <GraduationCap size={17} />
          <span>Teacher Login</span>
        </a>

        {/* Hamburger */}
        <button
          className={styles.menuButton}
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.header>
  )
}
