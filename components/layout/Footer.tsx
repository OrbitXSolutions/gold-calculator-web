export default function Footer() {
  return (
    <footer className="bg-base-100 text-neutral mt-12">
      <div className="container-max py-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1">
            <div className="flex items-center gap-2 text-neutral font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">💰</span>
              GoldCheck
            </div>
            <p className="text-neutral/70 text-sm mt-3 max-w-xs">Powered by Premium Gold Calculator</p>
          </div>
          <div>
            <h4 className="text-neutral font-semibold">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-neutral/80">
              <li><a className="hover:text-neutral" href="/">Home</a></li>
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
        <div className="mt-10 border-t border-neutral/10 pt-6 text-xs text-neutral/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p>© {new Date().getFullYear()} GoldCheck. All rights reserved.</p>
          <p className="sm:text-right">Use at your own discretion; not financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
