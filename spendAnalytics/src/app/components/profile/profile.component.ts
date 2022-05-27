import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!:User;
  imgf!:any;
  constructor(private dataSharingService: DataSharingService,private http:HttpClient) { 
    this.dataSharingService.onMainEvent.subscribe(
      (loggedIn) =>{
        if(loggedIn){
          this.user.username =  this.dataSharingService.user.username;
          this.user.accountId =  this.dataSharingService.user.accountId;
          this.user.type =  this.dataSharingService.user.type;
          console.log(this.user)
        }
      } 
    )
    
  // this.dataSharingService.username.subscribe(value => {
  //   this.user.username = value 
  // });
  }

  ngOnInit(): void {
    this.fetchProfileImage();
    this.user =  this.dataSharingService.user;
    console.log(this.user);
  }
  fetchProfileImage(): void {
    let url = `http://127.0.0.1:8000/graph`;
    console.log("Profile image URL is " + url);
    let response = this.http.get(url, { responseType: 'blob' });
    response.subscribe((res)=>{
      const reader = new FileReader();
    reader.readAsDataURL(res); 
    reader.onload = _event => {
        let url = reader.result; 
        this.imgf = url
    };
    })
    
  }
}
