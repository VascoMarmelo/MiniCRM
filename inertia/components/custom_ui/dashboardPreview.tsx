import { Link } from '@inertiajs/react'
import {
  Users,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from 'lucide-react'
import { Card } from '~/components/ui/card'

const previewStats = [
  { label: 'Total Leads', count: 128, detail: 'All leads in your database' },
  { label: 'New', count: 42, detail: '33% of leads', status: 'New' },
  { label: 'Qualified', count: 32, detail: '25% of leads', status: 'Qualified' },
  { label: 'Converted', count: 18, detail: '14% of leads', status: 'Converted' },
  { label: 'Lost', count: 5, detail: '14% of leads', status: 'Converted' },
]

const previewLeads = [
  {
    name: 'Olivia Martin',
    company: 'Acme Inc.',
    email: 'olivia@acme.com',
    status: 'New',
    date: '10/22/2026',
  },
  {
    name: 'Jackson Lee',
    company: 'Tech Solutions',
    email: 'jackson@tech.com',
    status: 'Contacted',
    date: '10/21/2026',
  },
  {
    name: 'Isabella Nguyen',
    company: 'Design Studio',
    email: 'isabella@design.com',
    status: 'Qualified',
    date: '10/20/2026',
  },
  {
    name: 'William Kim',
    company: 'Growth Labs',
    email: 'william@growth.com',
    status: 'Converted',
    date: '10/19/2026',
  },
]

const statusStyles: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-yellow-100 text-yellow-700',
  Qualified: 'bg-green-100 text-green-700',
  Lost: 'bg-red-100 text-red-700',
  Converted: 'bg-purple-100 text-purple-700',
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Outer browser frame */}
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
        <div className="flex h-10 items-center gap-2 border-b border-border bg-muted/40 px-4">
          <span className="h-2.5 w-2.5 rounded-full border border-border" />
          <span className="h-2.5 w-2.5 rounded-full border border-border" />
          <span className="h-2.5 w-2.5 rounded-full border border-border" />
          <div className="ml-3 rounded-md border border-border bg-background px-3 py-1 text-[10px] text-muted-foreground">
            app.minicrm.com/dashboard
          </div>
        </div>

        {/* Keep the dashboard at desktop proportions */}
        <div className="overflow-hidden bg-(--paper)">
          <div className="min-w-[680px] space-y-5 p-6 text-left sm:p-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Leads Dashboard
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Overview of your sales pipeline.
              </p>
            </div>

            {/* Same statistics card layout */}
            <div className="grid grid-cols-4 gap-3">
              {previewStats.map((stat) => (
                <Card key={stat.label} className="min-w-0 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    {stat.label === 'Total Leads' ? (
                      <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <TrendingUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </div>

                  <p className="mt-2 text-2xl font-bold">{stat.count}</p>

                  {stat.status ? (
                    <div className="mt-2">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-[10px] font-medium ${
                          statusStyles[stat.status]
                        }`}
                      >
                        {stat.detail}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-2 text-[10px] text-muted-foreground">
                      {stat.detail}
                    </p>
                  )}
                </Card>
              ))}
            </div>

            {/* Same recently created leads panel */}
            <Card className="bg-card">
              <div className="flex items-center gap-3 border-b p-5">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="text-base font-semibold">
                    Recently Created Leads
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Your five newest leads
                  </p>
                </div>
              </div>

              <div className="divide-y">
                {previewLeads.map((lead) => (
                  <div
                    key={lead.email}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {lead.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {lead.company}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {lead.email}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                          statusStyles[lead.status]
                        }`}
                      >
                        {lead.status}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {lead.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Subtle decorative accent that doesn't alter the dashboard */}
      <div className="pointer-events-none absolute -right-3 -top-3 -z-10 h-24 w-24 rounded-full bg-muted/70 blur-2xl" />
    </div>
  )
}

export default DashboardPreview