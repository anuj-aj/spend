import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AllRecordDetails, recordDetails } from '../model/transaction';
import { User } from '../model/User';
import { UserServiceService } from './user-service/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  
  public isUserLoggedIn: boolean = false;
  public username: string = "";
  public user!: User;
  public userDetails!: User;
  public txnRecords!: AllRecordDetails
  onMainEvent: EventEmitter<boolean> = new EventEmitter();
  setUserTypeEvent: EventEmitter<string> = new EventEmitter();

  constructor(private userService:UserServiceService) { }

  setUser(accountIdNumber: number) {
    this.user.accountId = accountIdNumber as unknown as string;
    this.userDetails = this.userService.getUser(this.user.accountId);
    this.user.email = this.userDetails.email;
    this.user.imgUrl = this.userDetails.imgUrl;
    this.user.balance = this.userDetails.balance;
    this.user.username = this.userDetails.username;
  }
}
