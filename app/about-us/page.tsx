"use client"
import { Target, TrendingUp, GraduationCap, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutUsPage() {
  const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }
  return (
    <div className="section-spacing">
      <div className="container-max">
        <motion.h1 initial={fade.initial} animate={fade.animate} transition={{ duration: 0.4 }} className="text-neutral text-xl font-semibold">
          About Us
        </motion.h1>

        <motion.div initial={fade.initial} animate={fade.animate} transition={{ duration: 0.5, delay: 0.05 }} className="bg-base-100 rounded-xl shadow-card p-6 mt-4">
          <p className="text-neutral/80 leading-relaxed">
            We created this platform to help buyers in the UAE and GCC understand gold pricing clearly and transparently. Gold is a valuable purchase, and many buyers pay more than necessary because they don't know the actual market price.
          </p>

          <div className="mt-6">
            <h3 className="text-neutral font-semibold">Our Mission:</h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2"><span className="text-primary">•</span><span className="text-neutral">Provide accurate gold price data</span></li>
              <li className="flex items-start gap-2"><span className="text-primary">•</span><span className="text-neutral">Offer a smart, easy calculator</span></li>
              <li className="flex items-start gap-2"><span className="text-primary">•</span><span className="text-neutral">Help customers avoid overpriced deals</span></li>
              <li className="flex items-start gap-2"><span className="text-primary">•</span><span className="text-neutral">Increase transparency in the gold market</span></li>
            </ul>
            <p className="text-neutral/60 italic mt-4">We are continuously adding new features such as alerts, charts, and educational articles.</p>
          </div>
        </motion.div>

        <motion.div initial={fade.initial} animate={fade.animate} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="card-feature">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-neutral font-semibold">Accuracy</h3>
              <p className="text-neutral/70 text-sm mt-1">Providing real-time, accurate gold prices</p>
            </div>
          </div>
          <div className="card-feature">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-neutral font-semibold">Transparency</h3>
              <p className="text-neutral/70 text-sm mt-1">Clear breakdown of costs and margins</p>
            </div>
          </div>
          <div className="card-feature">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-neutral font-semibold">Education</h3>
              <p className="text-neutral/70 text-sm mt-1">Helping users understand gold pricing</p>
            </div>
          </div>
          <div className="card-feature">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-neutral font-semibold">Community</h3>
              <p className="text-neutral/70 text-sm mt-1">Building trust with UAE gold buyers</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
