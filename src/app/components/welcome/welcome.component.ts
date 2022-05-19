import { ChangeDetectorRef, Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { User } from 'src/app/model/User';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  accountIdNumber!: number;
  @ViewChild("accId") accId!: ElementRef;
  @Output()
  userLogged!: boolean;

  constructor(
    private router: Router,
    private httpService: HttpServiceService,
    private toastr: ToastrService,
    private dataSharingService: DataSharingService 
  ) { }



  ngOnInit(): void {
  }

  selectUser(value: number): void{
    this.accountIdNumber = value;
  }

  BankLogin(): void {
    if (this.httpService.accountValidator(this.accountIdNumber)) {
      this.dataSharingService.isUserLoggedIn = true
      this.dataSharingService.user = new User();
      this.dataSharingService.setUser(this.accountIdNumber);
      this.dataSharingService.user.accountId = this.accountIdNumber as unknown as string;
      localStorage.setItem("isLogged",'true');
      localStorage.setItem('accountId',this.accountIdNumber as unknown as string)
      this.router.navigate([`/dashboard/${this.accountIdNumber}`])
      this.userLogged = this.dataSharingService.isUserLoggedIn;
      this.dataSharingService.onMainEvent.emit(true);
    } else {
      this.toastr.error("Please login using valid credentials !")
    }

  }

  


}
