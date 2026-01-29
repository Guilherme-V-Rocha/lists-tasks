import { z } from 'zod'

const baseSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter pelo menos 3 caracteres')
    .max(50, 'O título deve ter no máximo 50 caracteres'),
  description: z
    .string()
    .min(5, 'A descrição deve ser mais detalhada')
    .max(200, 'A descrição deve ter no máximo 200 caracteres'),
})

export const addTaskSchema = baseSchema

export const listTaskSchema = baseSchema.extend({
  id: z.string(),
  checked: z.boolean(),
  status: z.enum(['pending', 'complete']),
})
export type AddTaskSchema = z.infer<typeof addTaskSchema>
export type ListTaskSchema = z.infer<typeof listTaskSchema>
