import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../../card.model';
import { CardService } from '../../card.service';
import {MatColumnDef, MatSnackBar, MatSort, PageEvent, Sort} from '@angular/material';
import {MatPaginator, MatTableDataSource, MatSortModule} from '@angular/material';
import {CreateComponent} from "../create/create.component";
import * as moment from 'moment';

@Component({
  selector: 'app-listDS',
  templateUrl: './listDS.component.html',
  styleUrls: ['./listDS.component.css']
})
export class ListDSComponent implements OnInit {
  check:false;
  cards: Card[];
  fio: '';
  displayedColumnsAllCards = ['account', 'createdAt','status','actions'];
  displayedColumnsCards = ['account', 'fio', 'post', 'createdAt','status','actions'];
  listUserNames = [];
  lastEditDay: string = moment().format('L');
  displayedColumns = ['account'];

  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.init();

  }

  constructor(
              private router: Router,
              private cardService: CardService,
              private snackBar: MatSnackBar,
              private create: CreateComponent

  ) {
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
init(){

      this.fetchCardsDS();
}
  onRowClicked(row) {
   // console.log('Row clicked: ', row);
    // console.log('Sort: ', this.dataSource.sort);

  }

  // ngAfterViewInit() {
  //   this.sort.sort(this.sorting);
  //   this.columnDefs.map((def: MatColumnDef) => {
  //     this.table.addColumnDef(def);
  //   });
  // }
  getNext(event: PageEvent) {
    //event.length
    // event.rows = Number of rows to display in new page
    // event.page = Index of the new page
    // event.pageCount = Total number of pages
    console.log(event);        console.log(this.dataSource);

    //offset = event.pageSize * event.pageIndex
    // call your api function here with the offset
  }
  open(card){
    console.log(card.author);
    //this.displayedColumnsAllCards = this.displayedColumnsCards;
  }
  clearAllDS(){
    if(confirm('All clear DS?')){
      this.cardService.clearCardsInDS();
      this.init();
    }

  }
  copyCardsInJSON() {
    let res = this.cardService.getDataStoreCards();
      if (res.length == 0) {
        alert('Ничего нет');
      }
      else if(res.length > 0) {
        for (let i = 0; i < res.length; i++) {




          this.copyInCardJSON(res[i].account, res[i].author, res[i].status,res[i].createdAt);
          console.log(res[i].author.fio);
          this.listUserNames.push(''+res[i].author.fio);
        }
       let listUserNamesStr =  this.listUserNames.join(', ');
        console.log(listUserNamesStr);

        this.snackBar.open('Cards '+ this.listUserNames +' copied in DS successfully', 'OK', {
          duration: 3000
        });

      }
    this.listUserNames = [];

  }
  copyInCardJSON(account, author, status, createdAt) {
    let lastEditDay = this.lastEditDay;

    this.cardService.addCard(account,author, status,createdAt, lastEditDay).subscribe();
  }

  fetchCardsDS() {
    let cards:Card[] = this.cardService.getDataStoreCards();
    this.dataSource = new MatTableDataSource(cards);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editCard(id) {
      this.router.navigate([`/editDS/${id}`]);
  }
  deleteDataStoreCard(id,fio) {
    this.fio = fio;
    this.cardService.deleteDataStoreCard(id);
    if(this.dataSource.paginator.length-1 === this.dataSource.paginator.pageSize)
    {
      this.dataSource.paginator.pageIndex--;
    }
    this.snackBar.open('Card '+ this.fio +' deleted successfully', 'OK', {
      duration: 3000
    });
    this.fetchCardsDS();
    //this.closeForm();
  }
  deleteCard(id,fio) {
    this.fio = fio;
    this.cardService.deleteCard(id).subscribe(() => {
       if(this.dataSource.paginator.length-1 === this.dataSource.paginator.pageSize)
       {
         this.dataSource.paginator.pageIndex--;
       }
      this.fetchCardsDS();
      this.snackBar.open('Card '+ this.fio +' deleted successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
//
// const ELEMENT_DATA: Card[] = [{
//   lastEditDay: "11/28/2018",
//   IDs: "74725_rand",
//   status: "ddddddd",
//   createdAt: "11/28/2018",
//   author: {
//     account: "111",
//     fio: "asdasd",
//     post: "asdasd"
//   },
//   id: 7
// },{
//   lastEditDay: "11/28/2018",
//   IDs: "74725_rand",
//   status: "asdasd",
//   createdAt: "11/28/2018",
//   author: {
//     account: "sadsad",
//     fio: "asdasd",
//     post: "asdasd"
//   },
//   id: 7
// },{
//   lastEditDay: "11/28/2018",
//   IDs: "74725_rand",
//   status: "asdasd",
//   createdAt: "11/28/2018",
//   author: {
//     account: "sadsad",
//     fio: "asdasd",
//     post: "asdasd"
//   },
//   id: 7
// },{
//   lastEditDay: "11/28/2018",
//   IDs: "74725_rand",
//   status: "asdasd",
//   createdAt: "11/28/2018",
//   author: {
//     account: "sadsad",
//     fio: "asdasd",
//     post: "asdasd"
//   },
//   id: 7
// },{
//   lastEditDay: "11/28/2018",
//   IDs: "74725_rand",
//   status: "asdasd",
//   createdAt: "11/28/2018",
//   author: {
//     account: "sadsad",
//     fio: "asdasd",
//     post: "asdasd"
//   },
//   id: 7
// },{
//   lastEditDay: "11/28/2018",
//   IDs: "74725_rand",
//   status: "1",
//   createdAt: "11/28/2018",
//   author: {
//     account: "sadsad",
//     fio: "asdasd",
//     post: "asdasd"
//   },
//   id: 7
// },];
//
//
