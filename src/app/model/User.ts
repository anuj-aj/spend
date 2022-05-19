import { AllRecordDetails } from "./transaction";

export class User {
    username: string = "";
    accountId: string = "";
    balance:string = "";
    type:string = "";
    email:string = "";
    imgUrl!:string
    static setUserType(allRecords:AllRecordDetails): string { 
        allRecords.data.filter(
            (record) =>{}            
        )
        return "";
      }
}