import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import {AllRecordDetails, IdCategoryRecord, IdCategoryRecordList, recordDetails, trxnRequests} from './../model/transaction'

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  BASE_URL = `https://psd2-api.openbankproject.com/obp/v4.0.0/banks/psd201-bank-x--uk/accounts/`;
  BASE_URL_FastApi = `http://127.0.0.1:8000/predictcategory`;
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': 'DirectLogin token=eyJhbGciOiJIUzI1NiJ9.eyIiOiIifQ.FqWSv-sznrXIvEOkeY_KLX-MLW2IO4XCvEaVJTpPels'       })
  };
  httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private httpClient:HttpClient) { }

  getTransactionRecords(id:number): Observable<any> {
    return this.httpClient.get<trxnRequests>(this.BASE_URL + `${id}` + '/owner/transaction-requests',this.httpOptions).pipe(
      catchError(this.handleError<trxnRequests>('getTransactionRecords',new trxnRequests()))
    );
  }

  accountValidator(accountIdNumber:number): boolean {
    if (accountIdNumber == 1212121 || accountIdNumber == 3453453 || accountIdNumber == 789789) {
      return true;
    }
    return false;
  }

  sendToModel(data: AllRecordDetails): Observable<IdCategoryRecordList> {
    return this.httpClient.post<IdCategoryRecordList>(this.BASE_URL_FastApi ,data,this.httpOptions2).pipe(
      catchError(this.handleError<IdCategoryRecordList>('Model API',new IdCategoryRecordList))
    );
  }
  
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
