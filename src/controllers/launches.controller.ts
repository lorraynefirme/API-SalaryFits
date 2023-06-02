import type { Request, Response } from 'express'
import { readingLaunchesPast, readingLaunchesUpcoming, findingLaunchById, deletingLaunchById, updatingLaunchById } from '../models/launches.models'
import { fromZodError } from 'zod-validation-error'
import launchUpdateSchema from '../types/launchUpdateSchema';

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
            res.send({ error: "Dados inválidos." })
        else if(!Object.keys(req.body).length)
            res.send({ message: "Nenhum dado enviado para atualização." })
        else{
            const resp = await updatingLaunchById(req.params.id, validateBody)
            if (!resp.success)
                res.status(400).send({error : resp.error})
            else
                res.send(resp.data) 
        }   
    } catch (error : any) {
        const validationError = fromZodError(error); 
        const message = validationError.details[0].message;
        const variable = validationError.details[0].path;
        res.status(400).send({error: ` ${ variable } : ${ message }`})  
    }
}