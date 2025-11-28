import { CheckCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="section-spacing">
      <div className="container-max">
        <h1 className="hero-title">Live Gold Price & Profit Margin Calculator</h1>
        <p className="hero-subtitle">
          Welcome to the UAE's most accurate and easy-to-use gold profit margin calculator. Check today's gold prices,
          compare shop offers, and instantly know if you're getting a good deal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto">
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-neutral">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <span>Live gold price (24K, 22K, 21K, 18K, 14K)</span>
            </li>
            <li className="flex items-start gap-3 text-neutral">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <span>Smart analysis with low/medium/high margin labels</span>
            </li>
          </ul>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-neutral">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <span>Calculate shop profit per gram</span>
            </li>
            <li className="flex items-start gap-3 text-neutral">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <span>Arabic + English support</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="gold-btn">Go to Calculator</button>
        </div>
      </div>
    </section>
  )
}
