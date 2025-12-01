"use client"
import { motion } from 'framer-motion'
const MotionDiv: any = motion.div
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="footer-dark">
      <div className="container-max section-spacing">
        <MotionDiv initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center text-base-100">
          <h3 className="text-base-100 text-xl font-semibold">Start Calculating</h3>
          <p className="mt-2 text-base-100/80">
            Use the calculator below to check your gold deal within seconds.
          </p>
          <div className="mt-6">
            <Link href="/calculator" className="gold-btn">Go to Calculator</Link>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
