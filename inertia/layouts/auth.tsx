import Logo from '~/components/logo'
import { type ReactNode } from 'react'
import FlashToasts from '~/components/flash_toasts'
import ThemeToggle from '~/components/theme_toggle'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="auth">
        <div className="auth__form-col">
          <Logo size={28} />
          <div className="auth__form-wrap">{children}</div>
          <div style={{ height: 20 }} />
        </div>

        <aside className="auth__aside">
          <div className="auth__aside-top">
            <ThemeToggle />
          </div>

          <p className="auth__quote">
            MiniCRM Auth, kept intentionally minimal ...
          </p>

          <div>
            <div className="pitch__t">Looking for new Leads?</div>
            <p className="pitch__p">
              Check out Lead Discovery app, from out suite of apps!
            </p>
            <a
              className="il pitch__a"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              Explore Suite →
            </a>
          </div>
        </aside>
      </div>
      <FlashToasts />
    </>
  )
}
