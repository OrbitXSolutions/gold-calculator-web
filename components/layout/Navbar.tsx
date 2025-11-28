"use client"
import { useState } from 'react'
import { Menu, Globe } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="drawer">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" checked={open} onChange={() => setOpen(!open)} />
      <div className="drawer-content">
        <nav className="navbar container-max" style={{ height: 'var(--navbar-height)' }}>
          <div className="flex-1">
            <Link href="/" className="text-xl font-semibold text-neutral flex items-center gap-2">
              <Image src="/icon.svg" alt="GoldCheck" width={32} height={32} className="rounded-lg" />
              GoldCheck
            </Link>
          </div>
          <div className="flex-none hidden md:flex">
            <ul className="menu menu-horizontal px-1 text-neutral/90">
              <li><Link href="/">Home</Link></li>
              <li><Link href="#">Calculator</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/contact-us">Contact Us</Link></li>
            </ul>
            <div className="dropdown dropdown-end ml-2">
              <label tabIndex={0} className="btn btn-sm bg-base-100 border border-neutral/10 text-neutral/80">
                <Globe className="h-4 w-4" />
                العربية
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
                <li><button>English</button></li>
                <li><button>العربية</button></li>
              </ul>
            </div>
          </div>
          <div className="flex-none md:hidden">
            <label htmlFor="nav-drawer" className="btn btn-ghost" onClick={() => setOpen(true)}>
              <Menu className="h-6 w-6 text-neutral" />
            </label>
          </div>
        </nav>
      </div>
      <div className="drawer-side z-50">
        <label htmlFor="nav-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={() => setOpen(false)}></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-100 text-neutral">
          <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link href="#" onClick={() => setOpen(false)}>Calculator</Link></li>
          <li><Link href="#" onClick={() => setOpen(false)}>Blog</Link></li>
          <li><Link href="/about-us" onClick={() => setOpen(false)}>About Us</Link></li>
          <li><Link href="/contact-us" onClick={() => setOpen(false)}>Contact Us</Link></li>
          <div className="divider"></div>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-sm bg-base-100 border border-neutral/10 text-neutral/80 w-full justify-start">
              <Globe className="h-4 w-4" />
              العربية
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56">
              <li><button>English</button></li>
              <li><button>العربية</button></li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  )
}
