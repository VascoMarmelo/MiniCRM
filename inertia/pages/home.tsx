import { Head, Link } from '@inertiajs/react'
import { ArrowRight, Users, Target, CheckCircle2 } from 'lucide-react'
import DashboardPreview from '~/components/custom_ui/dashboardPreview'
import Logo from '~/components/logo'
import MarketingLayout from '~/layouts/marketing'

const features = [
  {
    icon: Users,
    title: 'Manage your leads',
    description: 'Keep all your leads information in one place.',
  },
  {
    icon: Target,
    title: 'Track opportunities',
    description: 'Know which leads are new, qualified, contacted, or lost.',
  },
  {
    icon: CheckCircle2,
    title: 'Stay organized',
    description: 'Update records, filter by status or names, and keep the pipeline moving.',
  },
]

const stats = [
  { label: 'Total leads', value: '128' },
  { label: 'In progress', value: '32' },
  { label: 'Converted', value: '18' },
]


function Home() {
  return (
    <>
      <Head title="Simple lead management" />

      <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pb-24 sm:pt-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line-2)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium text-[var(--ink-2)]">
              <span className="h-2 w-2 rounded-full bg-[var(--ok)]" />
              Simple CRM for your workflow
            </div>

            <h1 className="mt-7 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Your leads.
              <br />
              <span className="text-[var(--subtle)]">
                All in one place.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-[var(--ink-2)] sm:text-lg">
              MiniCRM helps you manage contacts, track opportunities, and keep
              your customer relationships organized without unnecessary
              complexity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-[var(--r)] bg-[var(--btn)] px-5 py-3 text-sm  font-medium text-[var(--btn-fg)] transition-opacity hover:opacity-80"
              >
                Get started
                <ArrowRight size={16} />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center rounded-[var(--r)] border border-[var(--line-2)] bg-[var(--card)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--muted)]"
              >
                Explore features
              </a>
            </div>
          </div>
        </section>

        {/* Dashboard preview */}
        <div className="mb-10">
          <DashboardPreview/>
        </div>
        {/* Features */}
        <section
          id="features"
          className="border-t border-[var(--line-2)] bg-[var(--card)]"
        >
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--subtle)]">
                Essential tools
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Everything you need. Nothing you don't.
              </h2>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                <div key={title}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-[var(--r)] border border-[var(--line-2)]">
                    <Icon size={19} strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-2)]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--line-2)]">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-6">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-sm font-semibold">MiniCRM</span>
            </div>

            <p className="text-xs text-[var(--subtle)]">
              Simple lead management.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}

Home.layout = [MarketingLayout]

export default Home