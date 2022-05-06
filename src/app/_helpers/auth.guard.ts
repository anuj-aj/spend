import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpServiceService } from '../service/http-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    currentUser!: User;
    loggedIn: boolean = false;
   

    constructor(
        private router: Router,
        private toastr:ToastrService,
        private httpService: HttpServiceService

    ) 
    { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :boolean{
        if(localStorage.getItem("isLogged") == 'true'){
            const id = localStorage.getItem('accountId')
            var response = this.httpService.accountValidator(Number(id));
            if (  response) {            
                return true;
            }
            else {            
                this.toastr.error("Please login using valid credentials !")
            }            
            this.router.navigate(['login']);
        }  
        return false;      
    }
}