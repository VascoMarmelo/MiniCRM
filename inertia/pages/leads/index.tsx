import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Link, router, usePage } from '@inertiajs/react'
import { Plus, Menu, Pencil, Trash, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'

type PageProps = {
  flash?: {
    success?: string
    error?: string
  }
}

type Props = {
  leads: Lead[]
}

const statusStyles: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
  Contacted: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400',
  Qualified: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400',
  Converted: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400',
  Lost: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
}

export default function LeadIndex({ leads }: Props) {
  const { flash } = usePage<PageProps>().props

  const [promptDelete, setPromptDelete] = useState(false)
  const [selectedLead, setSelectedLead] = useState<number | null>(null)

  useEffect(() => {
    if (flash?.success) toast.success(flash.success)
    if (flash?.error) toast.error(flash.error)
  }, [flash?.success, flash?.error])

  return (
    <Page title="Leads" hideTitle>
      <div className="grow space-y-8 rounded-2xl border border-neutral-200 bg-(--card) p-6 md:p-10 dark:border-white/10 dark:bg-[#111114]">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="pb-2 text-2xl font-bold">Leads List</h2>
            <p className="text-sm text-muted-foreground">
              Manage and track your leads.
            </p>
          </div>

          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/leads/form">
              <Plus className="mr-1 h-4 w-4" />
              Add Lead
            </Link>
          </Button>
        </div>

        {/* Lead count */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-xl shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="mt-2 text-3xl font-bold">{leads.length}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Leads in your CRM
                </p>
              </div>
              <Users className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>

        {/* Lead cards */}
        {leads.length === 0 ? (
          <Card className="rounded-xl shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
              <Users className="mb-3 h-10 w-10 text-muted-foreground" />
              <h3 className="text-lg font-semibold">No leads yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first lead to get started.
              </p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/leads/form">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Lead
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {leads.map((lead) => (
              <Card
                key={lead.id}
                className="rounded-xl shadow-sm transition-colors hover:border-neutral-400 dark:hover:border-white/20"
              >
                <CardContent className="space-y-5 p-5">
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold">
                        {lead.name}
                      </h3>
                      <p className="mt-1 break-all text-sm text-muted-foreground">
                        {lead.email}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="outline" size="icon" aria-label={`Actions for ${lead.name}`}>
                            <Menu className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuGroup>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/leads/form/${lead.id}`}>
                              Edit
                              <DropdownMenuShortcut>
                                <Pencil className="h-4 w-4" />
                              </DropdownMenuShortcut>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {
                              setSelectedLead(lead.id)
                              setPromptDelete(true)
                            }}
                          >
                            Delete
                            <DropdownMenuShortcut>
                              <Trash className="h-4 w-4 text-red-500" />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Lead details */}
                  <div className="space-y-3 border-t border-neutral-200 pt-4 dark:border-white/10">
                    <div className="flex items-start justify-between gap-3 text-sm">
                      <Label className="shrink-0 text-muted-foreground">
                        Company
                      </Label>
                      <span className="text-right font-medium">
                        {lead.company || '—'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm">
                      <Label className="text-muted-foreground">Status</Label>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          statusStyles[lead.status] ??
                          'bg-neutral-100 text-neutral-700 dark:bg-white/10 dark:text-neutral-300'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      <AlertDialog
        open={promptDelete}
        onOpenChange={(open) => {
          setPromptDelete(open)
          if (!open) setSelectedLead(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete lead?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this lead? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                if (selectedLead === null) return

                router.delete(`/leads/${selectedLead}`, {
                  preserveScroll: true,
                  onSuccess: () => {
                    setPromptDelete(false)
                    setSelectedLead(null)
                    toast.success('Lead deleted successfully!')
                  },
                  onError: () => {
                    toast.error('Failed to delete lead.')
                  },
                })
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Page>
  )
}

LeadIndex.layout = [AppLayout]