
// On définit participation
export interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}

// pays qui contient un tableau de participations
export interface Country {
  id: number;
  name: string;
  participations: Participation[];
}
  