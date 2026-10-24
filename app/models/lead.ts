import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { LeadSchema } from '#database/schema'

export default class Lead extends LeadSchema {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @column()
    declare email: string

    @column()
    declare company: string
    
    @column()
    declare status: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}