import { PrismaClient, LaunchesTable } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

interface ILaunche {
    id: string;
    static_fire_date_utc?: string;
    static_fire_date_unix?: number;
    net?: boolean;
    window?: number;
    rocket?: string;
    success?: boolean;
    details?: string;
    launchpad?: string;
    flight_number?: number;
    name?: string;
    date_utc?: string;
    date_unix?: number;
    date_local?: string;
    date_precision?: string;
    upcoming: boolean;
}[]

interface ILauncheUpdate {
  static_fire_date_utc?: string;
  static_fire_date_unix?: number;
  net?: boolean;
  window?: number;
  rocket?: string;
  success?: boolean;
  details?: string;
  launchpad?: string;
  flight_number?: number;
  name?: string;
  date_utc?: string;
  date_unix?: number;
  date_local?: string;
  date_precision?: string;
  upcoming?: boolean;
}[]

interface IResult {
    success: boolean;
    data?: LaunchesTable |LaunchesTable[] | null;
    error?: string;
}
  
export const launchesAxios = async (url: string): (Promise<ILaunche[] | null>) => {
    try {
      const response = await axios.get<ILaunche[]>(url)      

      if (response.status !== 200) {
        throw new Error('Ocorreu um erro')
      }
      
      const launches = response.data.map(( {static_fire_date_utc, static_fire_date_unix, net, window, rocket, success, details, launchpad, flight_number, name, date_utc, date_unix, date_local, date_precision, upcoming, id} ) => ( { static_fire_date_utc, static_fire_date_unix, net, window, rocket, success, details, launchpad, flight_number, name, date_utc, date_unix, date_local, date_precision, upcoming, id} ))
      
      return launches
    } catch (error) {
      return null
    }
}

export const writingLaunches = async (): Promise<void> => {
    console.log('Consultado os dados da API SpaceX')

    const launchesPastResponse = await launchesAxios('https://api.spacexdata.com/v4/launches/past')
    const launchesUpcomingResponse = await launchesAxios('https://api.spacexdata.com/v4/launches/upcoming')
    let launchesResponse: ILaunche[] = []

    console.log('Salvando os dados no banco de dados')
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
      throw error
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
      return { success: false, error: 'Erro ao buscar os lançamentos passado.' }
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

export const updatingLaunchById = async(id : string, data: ILauncheUpdate): Promise<IResult> => {
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



  