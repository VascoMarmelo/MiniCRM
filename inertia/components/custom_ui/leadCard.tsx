import { Card, CardContent } from "../ui/card"
import { Button } from '~/components/ui/button'
import { Link } from '@inertiajs/react'
import { Plus, Users} from 'lucide-react'

function LeadCardSkeleton() {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent
        className="animate-pulse space-y-5 p-5"
        aria-hidden="true"
      >
        <div className="space-y-2">
          <div className="h-5 w-2/3 rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
        </div>

        <div className="space-y-3 border-t pt-4">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}


function LeadsLoading(leads : Lead) {
  return (
    <div
      role="status"
      aria-label="Loading leads"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <LeadCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading leads...</span>
    </div>
  )
}

type LeadsCardEmptyProps = {
  empty: boolean
}

function LeadsCardEmpty({empty} : LeadsCardEmptyProps){

    return (
        <Card className="rounded-xl shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-10 text-center">
            <Users className="mb-3 h-10 w-10 text-muted-foreground" />

            <h3 className="text-lg font-semibold">
                {empty ? 'No leads yet' : 'No matching leads'}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
                {empty
                ? 'Create your first lead to get started.'
                : 'Try changing your search or status filter.'}
            </p>

            {empty && (
                <Button asChild variant="outline" className="dark:border-(--ink-3) mt-5" size="sm">
                    <Link href="/dashboard/leads/form" className='flex items-center'>
                    <Plus className="mr-1 h-4 w-4" />
                    Create new Lead
                    </Link>
                </Button>
            )}
            </CardContent>
        </Card>
    )
}

export {
  LeadCardSkeleton,
  LeadsLoading,
  LeadsCardEmpty,
}