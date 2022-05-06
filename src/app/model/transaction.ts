
export interface From {
    bank_id: string;
    account_id: string;
}

export interface Value {
    currency: string;
    amount: string;
}

export interface Details {
    value: Value;
    description: string;
}

export interface Value2 {
    currency: string;
    amount: string;
}

export interface Charge {
    summary: string;
    value: Value2;
}

export interface TransactionRequestsWithCharge {
    id: string;
    type: string;
    from: From;
    details: Details;
    transaction_ids: string[];
    status: string;
    start_date: Date;
    end_date: Date;
    challenge?: any;
    charge: Charge;
}

export class trxnRequests {
    transaction_requests_with_charges!: TransactionRequestsWithCharge[];
    static getMockDates(totalDatesCount:number): Date[] {
        let date = new Date('2022-01-01T00:00:00Z');
        let allDates:Date[] = [];
        // const divisionMaxCount = 1;
        const divisionMaxCount = totalDatesCount/12;
        let divisionCount = 0;
        let month = 0;
        for(let dateStart = 0; dateStart<totalDatesCount; ) {
            if(divisionCount >= divisionMaxCount){
                month++;
                divisionCount = 0;
            }
            date.setMonth(month);
            allDates.push(new Date(date));
            divisionCount++;
            dateStart++
        }
        return allDates;
    }
}

export class recordDetails {
    id!:string
    description!: string;
    value!:string;
    currency!:string;
    txnDate!:Date; 
    category!:string   
}
export class AllRecordDetails {
    data!: recordDetails[]
}

export class IdCategoryRecord {
    id!: string;
    category!:string;
}

export class IdCategoryRecordList {
    data!: IdCategoryRecord[];
}

