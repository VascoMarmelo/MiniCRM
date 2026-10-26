import { Link } from '@adonisjs/inertia/react'
import { Users } from 'lucide-react'

export default function Logo({ size = 26 }: { size?: number }) {
  return (
    <Link
      route="home"
      aria-label="Logo"
      style={{ display: 'inline-flex', color: 'var(--ink)' }}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--btn)] text-[var(--btn-fg)]">
        <Users size={17} strokeWidth={2} />
      </div>
    </Link>
  )
}

