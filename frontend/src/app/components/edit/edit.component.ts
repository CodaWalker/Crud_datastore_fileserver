import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import {Injectable} from "@angular/core";
import { CardService } from '../../card.service';
import {Card} from "../../card.model";
import {createComponent} from "@angular/compiler/src/core";
import {CreateComponent} from "../create/create.component";

@Injectable()
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  id: number;
  IDs: string;
  card: any = {};
  updateForm: FormGroup;
  lastEditDay: string = moment().format('L');
  cards: Card[];

  // tslint:disable-next-line:max-line-length
  constructor(private cardService: CardService, private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private fb: FormBuilder, private create: CreateComponent) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.cardService.getCardById(this.id).subscribe(res => {
          this.card = res;
          this.updateForm.get('account').setValue(this.card.account);
          this.updateForm.get('fio').setValue(this.card.author.fio);
          this.updateForm.get('post').setValue(this.card.author.post);
          this.updateForm.get('status').setValue(this.card.status);
          this.updateForm.get('createdAt').setValue(this.card.createdAt);
          this.IDs = this.card.IDs;
        },
        error => {
          if(error.status === 404){
            this.router.navigateByUrl('/not-found/'+ this.id, {replaceUrl: true});
          }
          else
            this.router.navigateByUrl('/', {replaceUrl: true});
          console.log(error)
        }
      );

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

  updateCard(account, fio, post, status, createdAt) {
    this.cardService.updateCard(this.id, this.IDs, account, {
      fio: fio,
      post: post
    }, status, createdAt, this.lastEditDay).subscribe(() => {
      this.snackBar.open('Card ' + fio + ' updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

  copyInCard(account, fio, post, status, createdAt) {
    this.create.addDataStoreCard(status,account,fio,post, createdAt);
        this.snackBar.open('Card '+ fio +' copied in DS successfully', 'OK', {
          duration: 3000
        });

    }


  }

