import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Link, router, usePage } from '@inertiajs/react'
import { Plus, Menu, Pencil, Trash, Users, Loader2, AlertCircle } from 'lucide-react'
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

import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Search, Filter } from 'lucide-react'
import { LeadsCardEmpty, LeadsLoading } from '~/components/custom_ui/leadCard'


import { TEST_LOADING, TEST_ERROR } from '~/testing_config/testing'


const statusStyles: Record<string, string> = {
  New: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
  Contacted: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400',
  Qualified: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400',
  Converted: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400',
  Lost: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
}

type PageProps = {
  flash?: {
    success?: string
    error?: string
  }
}

type Props = {
  leads: Lead[]
}



export default function LeadIndex({ leads }: Props) {

  // Pop up message
  const { flash } = usePage<PageProps>().props

  useEffect(() => {
    if (flash?.success) toast.success(flash.success)
    if (flash?.error) toast.error(flash.error)
  }, [flash?.success, flash?.error])


  // Prompt for lead deletion
  const [promptDelete, setPromptDelete] = useState(false)
  const [selectedLead, setSelectedLead] = useState<number | null>(null)

  // Search Query
  //// Search Filter
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
    
  //// Status list
  const statuses = [...new Set(leads.map((lead) => lead.status))]

  //// Filter function
  const filteredLeads = leads.filter((lead) => {
    const searchTerm = search.toLowerCase().trim()

    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm)

    const matchesStatus =
      statusFilter === 'All' || lead.status === statusFilter

    return matchesSearch && matchesStatus
  })


  // Loading State
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [pageError, setPageError] = useState<string | null>(null)

  // Track Inertia page visits
  useEffect(() => {
    const removeStart = router.on('start', () => {
      setIsLoading(true)
      setPageError(null)
    })

    const removeFinish = router.on('finish', (event) => {
      setIsLoading(false)

      if (event.detail.visit.completed === false) {
        setPageError('Unable to load the page. Please try again.')
      }
    })

    return () => {
      removeStart()
      removeFinish()
    }
  }, [])

  return (
    <Page title="Leads" hideTitle>
      <div className="grow space-y-8 rounded-2xl p-6 md:p-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="pb-2 text-2xl font-bold">Leads List</h2>
            <p className="text-sm text-muted-foreground">
              Manage and track your leads.
            </p>
          </div>

          <Button asChild variant="outline" className="dark:border-(--ink-3)" size="sm">
            <Link href="/dashboard/leads/form" className='flex items-center'>
              <Plus className="mr-1 h-4 w-4" />
              Create new Lead
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


        {/* Search and filters */}
        <Card className="flex flex-col gap-3 sm:flex-row sm:items-center p-2 rounded-2xl ">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground dark:text-white" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value ?? 'All')}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground dark:text-white" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>

              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>


        {/* Lead cards */}
          {TEST_LOADING || isLoading ? (
            // Loading State
            <LeadsLoading />
          ) : TEST_ERROR || pageError ? (
            // Error State
            <Card className="rounded-xl shadow-sm">
              <CardContent className="flex flex-col items-center p-10 text-center">
                <AlertCircle className="mb-3 h-10 w-10 text-destructive" />

                <h3 className="text-lg font-semibold">
                  Something went wrong
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {pageError}
                </p>

                <Button
                  variant="outline"
                  className="mt-5"
                  onClick={() => router.reload()}
                >
                  Try again
                </Button>
              </CardContent>
            </Card>
          ) : filteredLeads.length === 0 ? (
            /* Empty state */
            <LeadsCardEmpty empty={leads.length === 0} />
            
          ) : (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredLeads.map((lead) => (
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
                      <DropdownMenuContent align="end" className="w-36" className="dark:bg-[var(--ink-3)] dark:text-white  ">
                        <DropdownMenuGroup>
                          <DropdownMenuItem asChild className="hover:bg-[var(--ink-2)]">
                            <Link href={`/dashboard/leads/form/${lead.id}`} className='flex justify-between grow '>
                              Edit
                              <DropdownMenuShortcut>
                                <Pencil className="h-4 w-4" />
                              </DropdownMenuShortcut>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="hover:!bg-red-500 hover:cursor-pointer"
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
                disabled={isDeleting || selectedLead === null}
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  if (selectedLead === null || isDeleting) return

                  setIsDeleting(true)

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

                    onFinish: () => {
                      setIsDeleting(false)
                    },
                  })
                }}
              >
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isDeleting ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Page>
  )
}

LeadIndex.layout = [AppLayout]