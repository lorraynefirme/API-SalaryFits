import { z } from "zod"

const launchUpdateSchema = z.object({
    static_fire_date_utc: z.string().optional(),
    static_fire_date_unix: z.number().optional(),
    net: z.boolean().optional(),
    window: z.number().optional(),
    rocket: z.string().optional(),
    success: z.boolean().optional(),
    details: z.string().optional(),
    launchpad: z.string().optional(),
    flight_number: z.number().optional(),
    name: z.string().optional(),
    date_utc: z.string().optional(),
    date_unix: z.number().optional(),
    date_local: z.string().optional(),
    date_precision: z.string().optional(),
    upcoming: z.boolean().optional(),
})

export default launchUpdateSchema