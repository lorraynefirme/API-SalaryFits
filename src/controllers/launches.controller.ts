import type { Request, Response } from 'express'
import { readingLaunchesPast, readingLaunchesUpcoming } from '../models/launches.models'

export const readLaunchPastController = async (req: Request, res: Response): Promise<void> => {
    const resp = await readingLaunchesPast()
    if (!resp.success)
        res.status(400).send("Ocorreu um erro")
    else
        res.send(resp.data)    
}
  
export const readLaunchFutureController = async (req: Request, res: Response): Promise<void> => {
    const resp = await readingLaunchesUpcoming()
    if (!resp.success)
        res.status(400).send("Ocorreu um erro")
    else
        res.send(resp.data)   
}