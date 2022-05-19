import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllRecordDetails, recordDetails } from 'src/app/model/transaction';
import { DataSharingService } from 'src/app/service/data-sharing.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  data!:AllRecordDetails
  imgPie!:any;
  imgBar!:any;
  topTxnList!:any;

  constructor(private router: Router,
    private dataSharingService: DataSharingService,
    private http:HttpClient) { }

  ngOnInit(): void {
    this.data = this.dataSharingService.txnRecords;
    this.getPieImage();
    this.getBarImage();
    this.getTopTransactions();
  }

  getTopTransactions(): void {
    let url = `http://127.0.0.1:8000/gettoptxnsv1`;
    let response = this.http.post(url, this.data, { responseType: 'json' });
    response.subscribe((res)=>{
      this.topTxnList = res;
      console.log(this.topTxnList);
    })
  }

  getPieImage(): void {
    let url = `http://127.0.0.1:8000/pie`;
    let response = this.http.post(url, this.data, { responseType: 'blob' });
    response.subscribe((res)=>{
      const reader = new FileReader();
    reader.readAsDataURL(res); 
    reader.onload = _event => {
        let url = reader.result; 
        this.imgPie = url
    };
    })
  }

  getBarImage(): void {
    let url = `http://127.0.0.1:8000/bar`;
    let response = this.http.post(url, this.data, { responseType: 'blob' });
    response.subscribe((res)=>{
      const reader = new FileReader();
    reader.readAsDataURL(res); 
    reader.onload = _event => {
        let url = reader.result; 
        this.imgBar = url
    };
    })
    
  }

}
