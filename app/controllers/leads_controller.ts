// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import Lead from "#models/lead"
import { createLeadValidator, updateLeadValidator } from '#validators/lead'

export default class LeadsController {

    async index({ response }: HttpContext) {
        const leads = await Lead.all()

        return response.ok(leads)
    }

    // Get one lead
    async show({ params, response }: HttpContext) {
        const lead = await Lead.find(params.id)

        if (!lead) {
            return response.notFound({ message: 'Lead not found' })
        }

        return response.ok(lead)
    }

    // Create a lead
    async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(createLeadValidator)

        const lead = await Lead.create(data)

        return response.created(lead)
    }

    // Update a lead
    async update({ params, request, response }: HttpContext) {
        const lead = await Lead.find(params.id)

        if (!lead) {
            return response.notFound({ message: 'Lead not found' })
        }

        const data = await request.validateUsing(updateLeadValidator)

        lead.merge(data)
        await lead.save()

        return response.ok(lead)
    }

    // Delete a lead
    async destroy({ params, response }: HttpContext) {
        const lead = await Lead.find(params.id)

        if (!lead) {
            return response.notFound({ message: 'Lead not found' })
        }

        await lead.delete()

        return response.noContent()
    }
}