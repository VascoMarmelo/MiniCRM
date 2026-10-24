import Page from '~/components/page'
import { LayoutGrid } from 'lucide-react'
import AppLayout from '~/layouts/app'
import {Card} from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from '@inertiajs/react'

export default function Lead() {
  return (
    <Page title="Leads" hideTitle>
      <div className="empty">
        <Button variant="outline" className="border-1 bg-amber-300">
          <Link href="dashboard/leads/form">
            <Plus/>
          </Link>
        </Button>
      </div>
    </Page>
  )
}

Lead.layout = [AppLayout]
