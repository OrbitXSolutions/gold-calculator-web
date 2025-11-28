 "use client"
 import { Shield, TrendingUp, CheckCircle2, Zap } from 'lucide-react'
 import { motion } from 'framer-motion'

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
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center text-neutral text-2xl font-semibold">Why Use Our Calculator?</motion.h2>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <FeatureCard icon={Shield} title="Avoid overpaying for gold" subtitle="Know exactly what you're paying for" />
          <FeatureCard icon={TrendingUp} title="Know the real market rate instantly" subtitle="Up-to-date prices for all karats" />
          <FeatureCard icon={CheckCircle2} title="Understand making charges clearly" subtitle="See shop profit breakdown per gram" />
          <FeatureCard icon={Zap} title="Make smarter buying decisions" subtitle="Get instant analysis and recommendations" />
        </motion.div>
      </div>
    </section>
  )
}
