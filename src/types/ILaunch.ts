export default interface ILaunch {
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
