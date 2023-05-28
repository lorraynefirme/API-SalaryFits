import express from 'express'
import router from './src/routes/routes'
import { writingLaunches } from './src/models/launches.models'

const main = async () => {
    const app = express()
    app.use(express.json())
    app.use(router)
    await writingLaunches();
    console.log('----- API pronta para uso -----')
    app.listen(3000);
}
  
main()
  
  