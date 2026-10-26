// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import Lead from "#models/lead"
import { createLeadValidator, updateLeadValidator } from '#validators/lead'

export default class LeadsController {

    async index({ inertia }: HttpContext) {

        const leads = await Lead.all()

        return inertia.render('leads/index', { leads })
    }

    async dashboard_data({ inertia }: HttpContext) {
        const leads = await Lead.all()

        return inertia.render('dashboard', {
            leads: leads.map((lead) => lead.serialize()),
        })
    }

    // Get one lead
    async show({ params, inertia, response }: HttpContext) {
        let lead: Lead | null = null

        if (params.id) {
            const foundLead = await Lead.find(params.id)

            if (!foundLead) {
                return response.notFound({ message: 'Lead not found' })
            }

            lead = foundLead.serialize() as Lead
        }

        return inertia.render('leads/form', { lead })
    }

    // Create a lead
    async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(createLeadValidator)

        await Lead.create(data)

        return response.redirect('/dashboard/leads')
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

        return response.redirect('/dashboard/leads')
    }

    // Delete a lead
    async destroy({ params, response }: HttpContext) {
        const lead = await Lead.find(params.id)

        if (!lead) {
            return response.notFound({ message: 'Lead not found' })
        }

        // Temporary delay for testing the deletion loading spinner
        //await new Promise((resolve) => setTimeout(resolve, 3000))

        await lead.delete()

        return response.redirect('/dashboard/leads')
    }
}