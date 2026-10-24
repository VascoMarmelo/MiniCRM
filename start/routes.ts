/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'
import LeadsController from '#controllers/leads_controller'

router.on('/').renderInertia('home', {}).as('home')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('/dashboard').renderInertia('dashboard', {}).as('dashboard')
    router.post('logout', [controllers.Session, 'destroy'])
    router.on('/dashboard/leads').renderInertia('leads/index', {}).as('leads')

    // APIs
    router.get('/leads', [LeadsController, 'index'])
    router.get('/leads/:id', [LeadsController, 'show'])
    router.post('/leads', [LeadsController, 'store'])
    router.put('/leads/:id', [LeadsController, 'update'])
    router.delete('/leads/:id', [LeadsController, 'destroy'])
  })
  .use(middleware.auth())
