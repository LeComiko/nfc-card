'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, Globe, Link } from 'lucide-react'
import { profile } from '@/config/profile'

const buttons = [
  { label: 'Appeler', href: `tel:${profile.phone}`, icon: Phone },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
  { label: 'Site web', href: profile.website, icon: Globe },
  { label: 'LinkedIn', href: profile.linkedin, icon: Link },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export function ActionButtons() {
  return (
    <motion.div
      className="mt-6 flex flex-col gap-3 px-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {buttons.map(({ label, href, icon: Icon }) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          variants={item}
          className="flex items-center gap-4 rounded-2xl bg-primary px-5 py-4 text-white shadow-sm transition-colors hover:bg-accent active:scale-95"
        >
          <Icon size={20} className="shrink-0" />
          <span className="text-sm font-semibold">{label}</span>
        </motion.a>
      ))}
    </motion.div>
  )
}
