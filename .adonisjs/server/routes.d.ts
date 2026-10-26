import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'leads': { paramsTuple?: []; params?: {} }
    'leadsform': { paramsTuple?: [ParamValue?]; params?: {'id'?: ParamValue} }
    'leads.index': { paramsTuple?: []; params?: {} }
    'leads.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'leads.store': { paramsTuple?: []; params?: {} }
    'leads.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'leads.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'leads': { paramsTuple?: []; params?: {} }
    'leadsform': { paramsTuple?: [ParamValue?]; params?: {'id'?: ParamValue} }
    'leads.index': { paramsTuple?: []; params?: {} }
    'leads.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'leads': { paramsTuple?: []; params?: {} }
    'leadsform': { paramsTuple?: [ParamValue?]; params?: {'id'?: ParamValue} }
    'leads.index': { paramsTuple?: []; params?: {} }
    'leads.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'leads.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'leads.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'leads.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  OPTIONS: {
  }
  PATCH: {
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}