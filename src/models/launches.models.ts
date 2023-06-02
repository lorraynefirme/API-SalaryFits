import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import ILaunch from '../types/ILaunch';
import ILaunchUpdate from '../types/ILaunchUpdate';
import IResult from '../types/IResult';

const prisma = new PrismaClient()

export const launchesAxios = async (url: string): (Promise<ILaunch[] | null>) => {
    try {
      const response = await axios.get<ILaunch[]>(url)         
      const launches = response.data.map(( {static_fire_date_utc, static_fire_date_unix, net, window, rocket, success, details, launchpad, flight_number, name, date_utc, date_unix, date_local, date_precision, upcoming, id} ) => ( { static_fire_date_utc, static_fire_date_unix, net, window, rocket, success, details, launchpad, flight_number, name, date_utc, date_unix, date_local, date_precision, upcoming, id} ))
      
      return launches
    } catch (error) {
      console.log('Ocorreu um erro ao buscar os dados na API SpaceX.')
      return null
    }
}

export const writingLaunches = async (): Promise<void> => {
    console.log('-- Consultado os dados da API SpaceX')

    const launchesPastResponse = await launchesAxios('https://api.spacexdata.com/v4/launches/past')
    const launchesUpcomingResponse = await launchesAxios('https://api.spacexdata.com/v4/launches/upcoming')
    let launchesResponse: ILaunch[] = []

    console.log('-- Salvando os dados no banco de dados')
    if(launchesPastResponse && launchesUpcomingResponse)
       launchesResponse = [...launchesPastResponse, ...launchesUpcomingResponse]
  
    try {
      const { count } = await prisma.launchesTable.createMany(
        {
          data: launchesResponse,
          skipDuplicates: true,
        }
      )

      console.log("--", count, "Registros escritos no banco")  
      return
    } catch (error) {
      console.log("Erro ao salvar registros no banco.", error)
    }   
}
  
export const readingLaunchesPast = async(): Promise<IResult> => {
    try {
      const dbresp = await prisma.launchesTable.findMany({
        where: {
          upcoming: false,
        },
      })
      return { success: true, data: dbresp }
    } catch (error) {
      return { success: false, error: 'Erro ao buscar os lançamentos passados.' }
    }
}
  
export const readingLaunchesUpcoming = async(): Promise<IResult> => {
    try {
      const dbresp = await prisma.launchesTable.findMany({
        where: {
          upcoming: true,
        },
      })
      return { success: true, data: dbresp }
    } catch (error) {
      return { success: false, error: 'Erro ao buscar os próximos lançamentos.' }
    }
}

export const findingLaunchById = async(id : string): Promise<IResult> => {
  try {
    const dbresp = await prisma.launchesTable.findUnique({
      where: {
        id: id,
      },
    })
    return { success: true, data: dbresp }
  } catch (error) {
    return { success: false, error: 'Erro ao buscar o lançamento.' }
  }
}

export const deletingLaunchById = async(id : string): Promise<IResult> => {
  try {
    const dbresp = await prisma.launchesTable.delete({
      where: {
        id: id,
      },
    })
    return { success: true, data: dbresp }
  } catch (error) {
    return { success: false, error: 'Erro ao deletar o lançamento.' }
  }
}

export const updatingLaunchById = async(id : string, data: ILaunchUpdate): Promise<IResult> => {
  try {
    const dbresp = await prisma.launchesTable.update({
      where: {
        id: id,
      },
      data: data
    })
    return { success: true, data: dbresp }
  } catch (error) {
    return { success: false, error: 'Erro ao atualizar o lançamento.' }
  }
}



  