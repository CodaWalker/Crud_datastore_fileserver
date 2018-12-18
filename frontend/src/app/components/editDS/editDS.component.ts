import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import {Injectable} from "@angular/core";
import { CardService } from '../../card.service';
import {Card} from "../../card.model";
import {CreateComponent} from "../create/create.component";

@Injectable()
@Component({
  selector: 'app-editDS',
  templateUrl: './editDS.component.html',
  styleUrls: ['./editDS.component.css']
})

export class EditDSComponent implements OnInit {
  id: number;
  IDs: string;
  card: any = {};
  updateForm: FormGroup;
  lastEditDay: string = moment().format('L');
  cards: Card[];

  // tslint:disable-next-line:max-line-length
  constructor(private cardService: CardService, private router: Router,
              private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder,
              private create: CreateComponent) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      //DataStore
      this.card = this.cardService.getCardDSById(this.id);
      if (this.card == 0) {
        this.router.navigateByUrl('/not-found/' + this.id, {replaceUrl: true});
      }
      else {
        this.updateForm.get('account').setValue(this.card.account);
        this.updateForm.get('fio').setValue(this.card.author.fio);
        this.updateForm.get('post').setValue(this.card.author.post);
        this.updateForm.get('status').setValue(this.card.status);
        this.updateForm.get('createdAt').setValue(this.card.createdAt);
        this.IDs = this.card.IDs;
      }
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      account: ['', Validators.required],
      fio: ['', Validators.required],
      post: ['', Validators.required],
      createdAt: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  copyInCard(account, fio, post, status, createdAt) {
      this.create.addCard(status,account,fio,post);
      this.snackBar.open('Card ' + fio + ' copied in JSON FILE successfully', 'OK', {
        duration: 3000
      });
    //});
  }

  updateDataStoreCard(account, fio, post, status, createdAt) {
    //console.log(this.id);
    let cards = this.cardService.getDataStoreCards();
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].id == this.id) {
        cards[i].status = status;
        cards[i].account = account;
        cards[i].author.fio = fio;
        cards[i].author.post = post;
        cards[i].createdAt = createdAt;
        cards[i].lastEditDay = this.lastEditDay;
      }
      this.cardService.updateDataStoreCard(cards);


      // this.cardService.updateDataStoreCard(this.id, this.IDs,account,{fio:fio,post:post},status, createdAt, this.lastEditDay).subscribe(() => {
      //   this.snackBar.open('Card '+ fio +' updated successfully', 'OK', {
      //     duration: 3000
      //   });
      // });
    }


  }
}
