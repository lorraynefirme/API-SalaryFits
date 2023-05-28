import express from 'express';
import { readLaunchesPastController, readLaunchesUpcomingController, findLaunchController, deleteLaunchController, updateLaunchController } from '../controllers/launches.controller'

const router = express.Router()

router.get('/launchesPast', readLaunchesPastController)
router.get('/launchesUpcoming', readLaunchesUpcomingController)
router.get('/launch/:id', findLaunchController)
router.delete('/launch/:id', deleteLaunchController)
router.put('/launch/:id', updateLaunchController)

export default router
