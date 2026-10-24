/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  dashboard: typeof routes['dashboard']
  leads: typeof routes['leads'] & {
    index: typeof routes['leads.index']
    show: typeof routes['leads.show']
    store: typeof routes['leads.store']
    update: typeof routes['leads.update']
    destroy: typeof routes['leads.destroy']
  }
}
