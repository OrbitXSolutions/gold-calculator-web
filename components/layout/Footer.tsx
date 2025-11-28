export default function Footer() {
  return (
    <footer className="bg-neutral text-base-100">
      <div className="container-max py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-base-100 font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">💰</span>
              GoldCheck
            </div>
            <p className="text-base-100/70 text-sm mt-3">Powered by Premium Gold Calculator</p>
          </div>

          <div>
            <h4 className="text-base-100 font-semibold">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-base-100/80">
              <li><a className="hover:text-base-100" href="#">Calculator</a></li>
              <li><a className="hover:text-base-100" href="#">Blog</a></li>
              <li><a className="hover:text-base-100" href="#">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base-100 font-semibold">Legal</h4>
            <ul className="mt-3 space-y-2 text-base-100/80">
              <li><a className="hover:text-base-100" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-base-100" href="#">Terms & Conditions</a></li>
              <li><a className="hover:text-base-100" href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-base-100/10 pt-6 text-xs text-base-100/60">
          <p>Prices are indicative and may vary by market conditions</p>
          <p className="mt-2">© 2024 GoldCheck. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
