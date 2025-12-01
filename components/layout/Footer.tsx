export default function Footer() {
  return (
    <footer className="py-8 border-t border-amber-200 bg-white/50 backdrop-blur-sm text-neutral mt-12">
      <div className="container-max">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 text-neutral font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 text-white">💰</span>
              GoldCheck
            </div>
            <p className="text-neutral/70 text-sm mt-3 max-w-xs">Powered by Premium Gold Calculator</p>
          </div>
          <div>
            <h4 className="text-neutral font-semibold">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-neutral/80">
              <li><a className="hover:text-neutral" href="/calculator">Calculator</a></li>
              <li><a className="hover:text-neutral" href="/blog">Blog</a></li>
              <li><a className="hover:text-neutral" href="/about-us">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-neutral font-semibold">Legal</h4>
            <ul className="mt-3 space-y-2 text-neutral/80">
              <li><a className="hover:text-neutral" href="/privacy-policy">Privacy Policy</a></li>
              <li><a className="hover:text-neutral" href="/terms-and-conditions">Terms &amp; Conditions</a></li>
              <li><a className="hover:text-neutral" href="/contact-us">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-neutral font-semibold">Status</h4>
            <p className="text-neutral/70 text-sm mt-3">Prices are indicative and may vary with market conditions.</p>
          </div>
        </div>
        <div className="pt-8 border-t border-amber-200 text-xs text-neutral/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p>© {new Date().getFullYear()} GoldCheck. All rights reserved.</p>
          <p className="sm:text-right">Use at your own discretion; not financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
