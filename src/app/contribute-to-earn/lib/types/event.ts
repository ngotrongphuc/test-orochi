export type TEvent = {
    event: string
    startDate: string
    endDate: string
    status: string
    result: string
  }
  
  export enum EEventStatus {
    Done = 'done',
    OnGoing = 'on-going',
    Upcoming = 'upcoming',
  }