"use client"
import { Shield, Cookie, User, ChartBar } from 'lucide-react'
import { motion } from 'framer-motion'
const MotionDiv: any = motion.div

function Item({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-3 bg-neutral/5 rounded-lg px-4 py-3">
      <Icon className="h-5 w-5 text-primary" />
      <span className="text-neutral/90">{text}</span>
    </div>
  )
}

export default function PrivacyPolicyPage() {
  const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }
  return (
    <div className="section-spacing">
      <div className="container-max">
        <MotionDiv initial={fade.initial} animate={fade.animate} transition={{ duration: 0.4 }} className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-neutral text-xl font-semibold">Privacy Policy</h1>
        </MotionDiv>

        <MotionDiv initial={fade.initial} animate={fade.animate} transition={{ duration: 0.5, delay: 0.05 }} className="bg-base-100 rounded-xl shadow-card p-6 mt-4">
          <p className="text-neutral/80">We respect your privacy.</p>
          <p className="text-neutral/80 mt-2">This website collects minimal information to improve your experience, including:</p>

          <div className="mt-5 space-y-3">
            <Item icon={ChartBar} text="Anonymous usage analytics" />
            <Item icon={User} text="Form submissions (when contacting us)" />
            <Item icon={Cookie} text="Cookies for user preferences" />
          </div>

          <ul className="mt-6 space-y-3 text-neutral/90">
            <li className="flex gap-2"><span className="text-primary">•</span> We do not sell or share your personal data with third parties.</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Your information is stored securely and used only for improving our services.</li>
            <li className="flex gap-2"><span className="text-primary">•</span> If you wish to delete your data, you may contact us anytime at support@goldcheck.com.</li>
          </ul>

          <div className="mt-6 border-t border-neutral/10 pt-4 text-neutral/60 text-sm">Last updated: November 2025</div>
        </MotionDiv>
      </div>
    </div>
  )
}
