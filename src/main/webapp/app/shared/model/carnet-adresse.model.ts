export interface ICarnetAdresse {
  id?: number;
  lastname?: string;
  firstname?: string;
  email?: string;
}

export class CarnetAdresse implements ICarnetAdresse {
  constructor(public id?: number, public lastname?: string, public firstname?: string, public email?: string) {}
}
