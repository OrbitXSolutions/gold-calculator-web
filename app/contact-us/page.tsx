"use client"
import { Mail, MessageSquare, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
const MotionDiv: any = motion.div
const MotionP: any = motion.p
const MotionH1: any = motion.h1

function ContactCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-base-100 rounded-xl shadow-card p-5 flex items-center gap-4">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-neutral/70 text-sm">{label}</p>
        <p className="text-neutral mt-1 font-medium">{value}</p>
      </div>
    </div>
  )
}

export default function ContactUsPage() {
  const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }
  return (
    <div className="section-spacing">
      <div className="container-max">
        <MotionH1 initial={fade.initial} animate={fade.animate} transition={{ duration: 0.4 }} className="text-neutral text-xl font-semibold">
          Contact Us
        </MotionH1>
        <MotionP initial={fade.initial} animate={fade.animate} transition={{ duration: 0.5, delay: 0.05 }} className="text-neutral/80 mt-2">
          Have a question, suggestion, or partnership request? We'd love to hear from you.
        </MotionP>

        <MotionDiv initial={fade.initial} animate={fade.animate} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 space-y-4">
          <ContactCard icon={Mail} label="Email:" value="support@goldcheck.com" />
          <ContactCard icon={MessageSquare} label="WhatsApp:" value="+971 5X XXX XXXX" />
          <ContactCard icon={Clock} label="Business Hours:" value="9:00am – 6:00pm (GST)" />
        </MotionDiv>

        <MotionDiv initial={fade.initial} animate={fade.animate} transition={{ duration: 0.5, delay: 0.15 }} className="mt-6">
          <div className="bg-secondary rounded-xl border border-primary/20 p-4 text-neutral/80">
            We typically respond within 24 hours during business days.
          </div>
        </MotionDiv>
      </div>
    </div>
  )
}
