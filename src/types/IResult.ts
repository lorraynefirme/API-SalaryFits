import { LaunchesTable } from '@prisma/client'

export default interface IResult {
    success: boolean;
    data?: LaunchesTable | LaunchesTable[] | null;
    error?: string;
}
  