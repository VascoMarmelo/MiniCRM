import Page from '~/components/page'
import { LayoutGrid } from 'lucide-react'
import AppLayout from '~/layouts/app'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from '@inertiajs/react'

export default function Lead() {
  return (
    <Page title="Leads" hideTitle>
      <div className="empty">
        
      </div>
    </Page>
  )
}

Lead.layout = [AppLayout]
