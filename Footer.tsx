import { LogoMark } from './icons';

export default function Footer() {
  return (
    <footer className="border-t border-line/60">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <LogoMark className="h-8 w-8" />
            <span className="font-semibold tracking-tight">Niche Network</span>
          </div>
          <p className="mt-3 text-sm text-white/60 max-w-md">
            The social app for traders. Meet traders near you, build real friendships,
            and grow your edge together.
          </p>
          <div className="mt-4 flex gap-2">
            <Social label="Twitter" href="#" path="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.2 4.8a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.7 3.3 4.1-.4.1-.8.2-1.2.2l-.9-.1c.6 1.6 2.1 2.8 4 2.9A8.2 8.2 0 0 1 2 18.6a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />
            <Social label="Instagram" href="#" path="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm5.2-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
            <Social label="TikTok" href="#" path="M14 3v10.5a3.5 3.5 0 1 1-3.5-3.5h.5V12a1.5 1.5 0 1 0 1.5 1.5V3h2c.2 2 1.5 3.8 4 4v2c-1.6 0-3-.5-4-1.3V3z" />
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wide text-white/40 font-semibold">Product</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#preview" className="hover:text-white">App preview</a></li>
            <li><a href="#videos" className="hover:text-white">Videos</a></li>
            <li><a href="#waitlist" className="hover:text-white">Waitlist</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wide text-white/40 font-semibold">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white">Privacy policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of service</a></li>
            <li><a href="mailto:hello@nichenetwork.app" className="hover:text-white">hello@nichenetwork.app</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/60">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Niche Network. All rights reserved.</div>
          <div>Made for traders, by traders.</div>
        </div>
      </div>
    </footer>
  );
}

function Social({ label, href, path }: { label: string; href: string; path: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-9 w-9 rounded-xl border border-line bg-bg-card hover:bg-white/5 transition flex items-center justify-center text-white/70 hover:text-white"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d={path} />
      </svg>
    </a>
  );
}
