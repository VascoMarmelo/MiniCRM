import Page from '~/components/page'
import { useForm, router } from '@inertiajs/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import AppLayout from '~/layouts/app'

import { toast } from 'sonner'
import Lead from '#models/lead'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { TEST_LOADING } from '~/testing_config/testing'

type LeadFormData = {
  name: string
  email: string
  company: string
  status: string
}

type Props = {
  lead: Lead
}

export default function LeadForm({ lead }: Props) {

  console.log(lead)

  const { data, setData, post, put, processing, errors } = useForm<LeadFormData>({
    name: lead ? lead.name : '',
    email: lead ? lead.email : '',
    company: lead ? lead.company : '',
    status: lead ? lead.status : 'New'
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Update
    if (lead){
      put(`/leads/${lead.id}`, {
        onSuccess: () => {
          toast.success('Lead updated successfully!')
          router.visit('/dashboard/leads')
        },
        onError: () => {
          toast.error('Failed to update lead. Please check your inputs.')
        },
      })
    }
    // Create
    else{
      post('/leads', {
        onSuccess: () => {
          toast.success('Lead added successfully!')

          router.visit('/dashboard/leads')
        },
        onError: () => {
          toast.error('Failed to create lead. Please check your inputs.')
        },
      })
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const [pageError, setPageError] = useState<string | null>(null)

  useEffect(() => {
    const removeStart = router.on('start', () => {
      setIsLoading(true)
    })

    const removeFinish = router.on('finish', () => {
      setIsLoading(false)
    })

    return () => {
      removeStart()
      removeFinish()
    }
  }, [])

  function testLoading() {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }



  return (
    <Page title="">
      <Card className="flex w-full" hideTitle>
         {(isLoading) && (
            <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-background/70 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading lead...</p>
              </div>
            </div>
          )}
        <div className="bg-(--card) p-10 rounded-2xl border-neutral-200 dark:border-white/10 dark:bg-[#111114]">
          <CardHeader className='mb-5'>
            <CardTitle className="text-xl">Create lead</CardTitle>
            <CardDescription>
              Add a new lead to your sales pipeline.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="">
                <div className="space-y-2 ">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    aria-invalid={!!errors.name}
                    placeholder="Jane"
                    maxLength={50}
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    aria-invalid={!!errors.email}
                    placeholder="jane@company.com"
                    maxLength={50}
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={data.company}
                  onChange={(e) => setData('company', e.target.value)}
                  placeholder="Acme Inc."
                  maxLength={50}
                  required
                />
                {errors.company && (
                  <p className="text-sm text-red-600">{errors.company}</p>
                )}
              </div>

              <div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={data.status}
                    onValueChange={(value) => setData('status', value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Qualified">Qualified</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-sm text-red-600">{errors.status}</p>
                  )}
                </div>
              </div>
            </CardContent>

            <div className="justify-end gap-3 flex pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
                disabled={processing}
                className="dark:border-(--ink-3)"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={processing} className="dark:bg-(--ink-3)">
                {processing ? 'Creating...' : 'Create lead'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
      {TEST_LOADING && (
        <Button
          type="button"
          className="mt-10"
          variant="outline"
          onClick={testLoading}
        >
          Test loading overlay
        </Button>
      )}
    </Page>
  )
}

LeadForm.layout = [AppLayout]