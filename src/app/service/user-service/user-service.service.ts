import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User';
import { user1,user2,user3 } from 'src/app/service/user-service/user-service.service.data';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  

  constructor() { }
  getUser(accountId: string):User {
    if(accountId === user1.accountId){
      return user1;
    }
    else if(accountId === user2.accountId){
      return user2;
    }
    else {
      return user3;
    }
  }
  
}
