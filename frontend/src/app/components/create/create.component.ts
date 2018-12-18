import {Component, Injectable, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from '../../card.service';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
@Injectable()
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  lastEditDay: string = moment().format('L');
  today: string = moment().format('L');
  createForm: FormGroup;

  constructor(private cardService: CardService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.createForm = this.fb.group({
      account: ['', Validators.required],
      fio: ['', Validators.required],
      post: ['', Validators.required],
      createdAt: '',
      status: ['', Validators.required],
    });
  }

  ngOnInit() {}

  addCard (status, account, fio, post) {

    this.cardService.addCard(account,{fio:fio,post:post},status,this.today, this.lastEditDay).subscribe(() => {
  this.snackBar.open('Card '+ fio +' created successfully', 'OK', {
  duration: 3000
});
this.router.navigate(['/list']);
});
}
  addDataStoreCard (status, account, fio, post, createdAt) {

    this.cardService.addDataStoreCard(account, {fio:fio,post:post}, status, createdAt, this.lastEditDay);
    this.snackBar.open('Product '+ fio +' created successfully', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/listDS']);

  }



 }
