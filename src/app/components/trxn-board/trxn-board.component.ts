import { AfterViewInit, Component, ViewChild, OnInit, Input, ElementRef } from '@angular/core';
import { AllRecordDetails, IdCategoryRecord, recordDetails, trxnRequests } from 'src/app/model/transaction';
import { HttpServiceService } from '../../service/http-service.service'
import { Location } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DataSharingService } from 'src/app/service/data-sharing.service';
import { User } from 'src/app/model/User';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trxn-board',
  templateUrl: './trxn-board.component.html',
  styleUrls: ['./trxn-board.component.scss']
})
export class TrxnBoardComponent implements OnInit {
  displayedColumns: string[] = ['description', 'date', 'amount', 'currency'];
  userName!: string;
  totaltxnsCount!: number;
  displayText!: trxnRequests
  txnRecords = new AllRecordDetails();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild("btnid")
  elem!: ElementRef;
  dataSource!: MatTableDataSource<recordDetails>;
  categories$!: Observable<boolean>;
  btnDisable = false;
  dontUpdateTransaction = false;
  userCategory!:string;
  userLoggedIn!:User;

  constructor(private httpService: HttpServiceService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private toastr:ToastrService,
    private http:HttpClient,
    private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.userName = id as unknown as string;
    if(!this.dontUpdateTransaction){
      this.getAccount(id);
      this.txnRecords.data = []
    }
    
  }
  
  getAccount(id: number) {
    this.httpService.getTransactionRecords(id).subscribe(
      (data) => {
        this.displayText = data;
        this.totaltxnsCount = this.displayText.transaction_requests_with_charges.length;
        let newDates = trxnRequests.getMockDates(this.totaltxnsCount);
        let count = 0;
        this.displayText.transaction_requests_with_charges.map(
          (record) => {
            let recordData = new recordDetails();
            recordData.description = record.details.description,
              recordData.currency = record.details.value.currency,
              recordData.txnDate = newDates[count];
            recordData.id = record.id,
              count++;
            // recordData.txnDate = record.start_date,
            recordData.value = record.details.value.amount
            recordData.category = "";
            this.txnRecords.data.push(recordData);
            this.dataSource = new MatTableDataSource<recordDetails>(this.txnRecords.data);
            this.dataSource.paginator = this.paginator;
          }
        )        
      }
    )
  }

  addColumn() {
    this.httpService.sendToModel((this.txnRecords)).subscribe(
      (response) => {
        console.log(" data incoming")
        this.categories$ = of(true);
        this.dontUpdateTransaction = true;
        response.data.map(
          (txnRecord) => {
            // let record = this.txnRecords.data.find(r => {
            //   r.id === txnRecord.id              
            // })
            let record = this.txnRecords.data.find(r => r.id == txnRecord.id)
            if (record?.category == "") {
              record.category = txnRecord.category;
            }
          }
        )
        this.displayedColumns.push("categories");
        this.dataSource = new MatTableDataSource<recordDetails>(this.txnRecords.data);
        this.dataSource.paginator = this.paginator;
        this.btnDisable = !this.btnDisable
        this.dataSharingService.txnRecords = this.txnRecords;
        this.setUserCategory(this.txnRecords);   
        console.log(this.dataSharingService.txnRecords);    
        this.toastr.success("Categories generated successfully")
      }
    );

  }

  redirect(): void {
    this.location.back()
  }

  setUserCategory(records:AllRecordDetails): void {
    let url = `http://127.0.0.1:8000/getusercategory`;
    let response = this.http.post(url, records, { responseType: 'json' });
    response.subscribe((res:any)=>{
      this.dataSharingService.user.type = res;
    })
  }


}
