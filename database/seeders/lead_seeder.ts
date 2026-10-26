import { LeadFactory } from '#database/factories/lead_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await LeadFactory.createMany(100)
  }
}