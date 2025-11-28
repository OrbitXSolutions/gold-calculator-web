"use client"
import { FileText, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
const MotionDiv: any = motion.div

function Rule({ index, text }: { index: number; text: string }) {
  return (
    <div className="flex items-center gap-3 bg-neutral/5 rounded-lg px-4 py-3">
      <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-primary font-semibold">{index}</div>
      <span className="text-neutral/90">{text}</span>
    </div>
  )
}

export default function TermsConditionsPage() {
  const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }
  return (
    <div className="section-spacing">
      <div className="container-max">
        <MotionDiv initial={fade.initial} animate={fade.animate} transition={{ duration: 0.4 }} className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-neutral text-xl font-semibold">Terms & Conditions</h1>
        </MotionDiv>

        <MotionDiv initial={fade.initial} animate={fade.animate} transition={{ duration: 0.5, delay: 0.05 }} className="bg-base-100 rounded-xl shadow-card p-6 mt-4">
          <p className="text-neutral/90">By using this website, you agree to the following:</p>

          <div className="mt-5 space-y-3">
            <Rule index={1} text="Gold prices are obtained from reliable sources, but may vary slightly across markets." />
            <Rule index={2} text="The profit margin analysis is for informational purposes only." />
            <Rule index={3} text="We are not responsible for financial decisions made based on the calculator." />
            <Rule index={4} text="Users must verify prices with the gold shop before purchasing." />
            <Rule index={5} text="The website content may be updated at any time without prior notice." />
          </div>

          <div className="mt-6 bg-secondary border border-primary/30 text-neutral rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <p className="text-neutral/90">Important: Always verify gold prices and quality certificates with authorized dealers before making a purchase.</p>
          </div>

          <div className="mt-6 border-t border-neutral/10 pt-4 text-neutral/60 text-sm">Last updated: November 2025</div>
        </MotionDiv>
      </div>
    </div>
  )
}
