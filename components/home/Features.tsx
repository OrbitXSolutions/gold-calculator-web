"use client"
import { Shield, TrendingUp, CheckCircle2, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
const MotionDiv: any = motion.div
const MotionH2: any = motion.h2

function FeatureCard({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) {
  return (
    <div className="card-feature">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="text-neutral font-semibold">{title}</h3>
        <p className="text-neutral/70 text-sm mt-1">{subtitle}</p>
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <section className="section-spacing">
      <div className="container-max">
        {/* Stylish divider */}
        <div className="flex items-center justify-center mt-2">
          <div className="h-px w-14 bg-gradient-to-r from-amber-200 to-transparent" />
          <div className="mx-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-700 shadow-sm">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="h-px w-14 bg-gradient-to-l from-amber-200 to-transparent" />
        </div>
        <MotionH2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35 }}
          className="text-center text-neutral text-2xl md:text-3xl font-semibold mt-3"
        >
          Why Use Our Calculator?
        </MotionH2>
        <MotionDiv
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0, y: 8 },
            show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4"
        >
          <MotionDiv variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
            <FeatureCard icon={Shield} title="Avoid overpaying for gold" subtitle="Know exactly what you're paying for" />
          </MotionDiv>
          <MotionDiv variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
            <FeatureCard icon={TrendingUp} title="Know the real market rate instantly" subtitle="Up-to-date prices for all karats" />
          </MotionDiv>
          <MotionDiv variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
            <FeatureCard icon={CheckCircle2} title="Understand making charges clearly" subtitle="See shop profit breakdown per gram" />
          </MotionDiv>
          <MotionDiv variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
            <FeatureCard icon={Zap} title="Make smarter buying decisions" subtitle="Get instant analysis and recommendations" />
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  )
}
