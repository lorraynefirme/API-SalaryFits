import express from 'express'
import router from './src/routes/routes'
import { writingLaunches } from './src/models/launches.models'
import dotenv from "dotenv"

const main = async () => {
    dotenv.config()
    const app = express()
    app.use(express.json())
    app.use(router)
    await writingLaunches()
    console.log(`-- API pronta para uso na porta ${process.env.APIPORT}`)
    app.listen(process.env.APIPORT)
}
  
main()
  
  