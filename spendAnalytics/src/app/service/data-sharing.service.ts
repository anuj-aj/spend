import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AllRecordDetails, recordDetails } from '../model/transaction';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public isUserLoggedIn: boolean = false;
  public username: string = "";
  public user!: User;
  public txnRecords!: AllRecordDetails
  onMainEvent: EventEmitter<boolean> = new EventEmitter();
  setUserTypeEvent: EventEmitter<string> = new EventEmitter();
}
