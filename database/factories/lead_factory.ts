import factory from '@adonisjs/lucid/factories'
import Lead from '#models/lead'

export const LeadFactory = factory
  .define(Lead, async ({ faker }) => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      company: faker.company.name(),
      status: faker.helpers.arrayElement([
        'New',
        'Contacted',
        'Qualified',
        'Lost',
      ]),
    }
  })
  .build()