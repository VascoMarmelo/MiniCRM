import Page from '~/components/page'
import { LayoutGrid } from 'lucide-react'
import AppLayout from '~/layouts/app'

import { Head } from '@inertiajs/react'
import { Users, UserPlus, TrendingUp, Clock } from 'lucide-react'

type Lead = {
  id: number
  name: string
  email: string
  company: string
  status: string
  notes?: string | null
  createdAt: string
}

type Props = {
  leads: Lead[]
}

const statusStyles: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-yellow-100 text-yellow-700',
  Qualified: 'bg-green-100 text-green-700',
  Lost: 'bg-red-100 text-red-700',
  Converted: 'bg-purple-100 text-purple-700',
}

export default function Dashboard({leads} : Props) {

  // Total leads
  const totalLeads = leads.length

  // Count leads by status
  const leadsByStatus = leads.reduce<Record<string, number>>(
    (counts, lead) => {
      counts[lead.status] = (counts[lead.status] || 0) + 1
      return counts
    },
    {}
  )

  // Most recently created leads (latest 5)
  const recentLeads = [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5)


  return (
    <Page title="Dashboard" hideTitle>
      <Head title="Leads Dashboard" />

      <div className="space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Leads Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Overview of your sales pipeline.
          </p>
        </div>

        {/* Total leads */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Total Leads
              </p>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>

            <p className="mt-3 text-3xl font-bold">{totalLeads}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              All leads in your database
            </p>
          </div>

          {/* One card per status */}
          {Object.entries(leadsByStatus).map(([status, count]) => (
            <div
              key={status}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {status}
                </p>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>

              <p className="mt-3 text-3xl font-bold">{count}</p>

              <div className="mt-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    statusStyles[status] ?? 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {totalLeads > 0
                    ? `${Math.round((count / totalLeads) * 100)}% of leads`
                    : '0% of leads'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recently created leads */}
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b p-6">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <h2 className="text-lg font-semibold">
                Recently Created Leads
              </h2>
              <p className="text-sm text-muted-foreground">
                Your five newest leads
              </p>
            </div>
          </div>

          {recentLeads.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <UserPlus className="mx-auto mb-3 h-8 w-8" />
              <p>No leads yet.</p>
            </div>
          ) : (
            <div className="divide-y">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {lead.company || lead.email}
                    </p>
                    {lead.company && (
                      <p className="text-sm text-muted-foreground">
                        {lead.email}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[lead.status] ??
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {lead.status}
                    </span>

                    <span className="whitespace-nowrap text-xs text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Page>
  )
}

Dashboard.layout = [AppLayout]
