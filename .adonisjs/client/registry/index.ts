/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [[0,"/"]],
    types: placeholder as Registry['home']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [[0,"signup"]],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [[0,"signup"]],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['session.store']['types'],
  },
  'dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [[0,"dashboard"]],
    types: placeholder as Registry['dashboard']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [[0,"logout"]],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'leads': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/leads',
    tokens: [[0,"dashboard"],[0,"leads"]],
    types: placeholder as Registry['leads']['types'],
  },
  'leadsform': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/leads/form/:id?',
    tokens: [[0,"dashboard"],[0,"leads"],[0,"form"],[3,"id"]],
    types: placeholder as Registry['leadsform']['types'],
  },
  'leads.index': {
    methods: ["GET","HEAD"],
    pattern: '/leads',
    tokens: [[0,"leads"]],
    types: placeholder as Registry['leads.index']['types'],
  },
  'leads.show': {
    methods: ["GET","HEAD"],
    pattern: '/leads/:id',
    tokens: [[0,"leads"],[1,"id"]],
    types: placeholder as Registry['leads.show']['types'],
  },
  'leads.store': {
    methods: ["POST"],
    pattern: '/leads',
    tokens: [[0,"leads"]],
    types: placeholder as Registry['leads.store']['types'],
  },
  'leads.update': {
    methods: ["PUT"],
    pattern: '/leads/:id',
    tokens: [[0,"leads"],[1,"id"]],
    types: placeholder as Registry['leads.update']['types'],
  },
  'leads.destroy': {
    methods: ["DELETE"],
    pattern: '/leads/:id',
    tokens: [[0,"leads"],[1,"id"]],
    types: placeholder as Registry['leads.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
