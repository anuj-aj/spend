import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/model/User';
import { DataSharingService } from '../../service/data-sharing.service'
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {
  @Input()
  isLoggedin!: boolean;
  opened: boolean = false;
  user = User;
  events: string[] = [];
  userName!: string;
  constructor(private router: Router,
    private dataSharingService: DataSharingService) {
    if (this.dataSharingService.isUserLoggedIn) {
      this.opened = true;

    };
    this.dataSharingService.onMainEvent.subscribe(
      (loggedIn)=>{
        this.isLoggedin = loggedIn;
        this.opened = loggedIn;
      }
    )
    // this.dataSharingService.username.subscribe(value => {
    //     this.userName = value      
    // });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isLoggedin']){
      this.isLoggedin = true;
      this.opened = true;
    }
  }


  ngOnInit(): void {
    const id = localStorage.getItem('accountId');
    this.isLoggedin = localStorage.getItem('isLogged') == 'true' ? true : false;
    console.log(this.isLoggedin)
    this.userName = localStorage.getItem('isLogged') == 'true' ? id as unknown as string : "";
    console.log(this.userName)
    if (this.isLoggedin) {
      this.router.navigate([`/dashboard/${id}`])
      this.opened = true;
      console.log("user logged in")
    }
  }

  logOut(): void {
    this.dataSharingService.isUserLoggedIn = false;
    this.dataSharingService.username = ""
    this.dataSharingService.user = new User()
    this.opened = false
    if (localStorage.getItem('isLogged') == 'true') {
      localStorage.setItem('isLogged', 'false');
      localStorage.removeItem('accountId');
      this.isLoggedin = false;
    }
    this.dataSharingService.onMainEvent.emit(false);
    this.userName = "";
    this.router.navigate(['login'])
  }

  redirect(): void {
    const id = localStorage.getItem('accountId');
    this.router.navigate([`dashboard/${id}`])
  }

  goToProfile(): void {
    const id = localStorage.getItem('accountId');
    this.router.navigate([`profile/${id}`])
  }

  goToAnalytics():void {
    this.router.navigate([`analytics`])
  }
}
