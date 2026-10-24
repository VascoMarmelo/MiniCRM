import vine from '@vinejs/vine'

export const createLeadValidator = vine.create({
    name: vine.string().trim().minLength(2).maxLength(100),
    email: vine.string().trim().email(),
    company: vine.string().trim().maxLength(150),
    status: vine.enum(['New', 'Contacted', 'Qualified', 'Lost']),
})

export const updateLeadValidator = vine.create({
    name: vine.string().trim().minLength(2).maxLength(100),
    email: vine.string().trim().email(),
    company: vine.string().trim().maxLength(150),
    status: vine.enum(['New', 'Contacted', 'Qualified', 'Lost']),
})