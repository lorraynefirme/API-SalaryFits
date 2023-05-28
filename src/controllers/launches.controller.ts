import type { Request, Response } from 'express'
import { readingLaunchesPast, readingLaunchesUpcoming, findingLaunchById, deletingLaunchById, updatingLaunchById } from '../models/launches.models'
import { z } from "zod";
import { fromZodError } from 'zod-validation-error';

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
});

export const readLaunchesPastController = async (req: Request, res: Response): Promise<void> => {
    const resp = await readingLaunchesPast()
    if (!resp.success)
        res.status(400).send({error : resp.error})
    else
        res.send(resp.data)    
}
  
export const readLaunchesUpcomingController = async (req: Request, res: Response): Promise<void> => {
    const resp = await readingLaunchesUpcoming()
    if (!resp.success)
        res.status(400).send({error: resp.error})
    else
        res.send(resp.data)   
}

export const findLaunchController = async (req: Request, res: Response): Promise<void> => {
    const resp = await findingLaunchById(req.params.id)
    if (!resp.success)
        res.status(400).send({error: resp.error})
    else if(!resp.data){
        resp.error = "Id inválido."
        res.status(400).send({error: resp.error})
    }
    else
        res.send(resp.data)   
}

export const deleteLaunchController = async (req: Request, res: Response): Promise<void> => {
    const resp = await deletingLaunchById(req.params.id)
    if (!resp.success)
        res.status(400).send({error : resp.error})
    else
        res.send(resp.data)   
}

export const updateLaunchController = async (req: Request, res: Response): Promise<void> => {   
    try {
        const validateBody = launchUpdateSchema.parse(req.body);

        if(!Object.keys(validateBody).length && Object.keys(req.body).length)
            res.send({ error: "Dados inválido." })
        else if(!Object.keys(validateBody).length)
            res.send({ message: "Nenhum dado enviado para atualização." })
        else{
            const resp = await updatingLaunchById(req.params.id, validateBody)
            if (!resp.success)
                res.status(400).send({error : resp.error})
            else
                res.send(resp.data) 
        }   
    } catch (err : any) {
        const validationError = fromZodError(err); 
        const message = validationError.details[0].message;
        const variable = validationError.details[0].path;
        res.status(400).send({error: ` ${ variable } : ${ message }`})  
    }
}