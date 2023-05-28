import express from 'express';
import { readLaunchPastController, readLaunchFutureController } from '../controllers/launches.controller'

const router = express.Router()

router.get('/launchesPast', readLaunchPastController)
router.get('/launchesUpcoming', readLaunchFutureController)

export default router
