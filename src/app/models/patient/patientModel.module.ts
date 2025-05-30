import { Timestamp } from "rxjs";

export class patientModel {
  id: string | undefined;
  firstName: string | undefined;
  middleName: string | undefined;
  lastName: string | undefined;
  tutor: boolean | undefined;
  dateOfBirth: Date | undefined;
}
