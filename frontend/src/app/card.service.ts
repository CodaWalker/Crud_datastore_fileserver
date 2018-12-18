import {Injectable, Input} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Card} from "./card.model";
import {Observable} from "rxjs/index";
import { Init } from './init/cards'

@Injectable({
  providedIn: 'root'
})
export class CardService extends Init{
  @Input()
  card:Card[];
  uri = 'http://localhost:4000';
  private nextId: number;
  constructor(public http: HttpClient) {
    super();
    console.log('CardService works');
    this.load();

    let cards = this.getDataStoreCards();

    // if no todos, nextId is 0,
    // otherwise set to 1 more than last todo id
    if (cards.length == 0) {
      this.nextId = 0;
    } else {
      let maxId = cards[cards.length-1].id;
      this.nextId = maxId + 1;
    }




  }
  ngOnInit() {

  }

  getCards():Observable<Card[]> {
    return this.http.get<Card[]>(`${this.uri}/cards`);
  }

  getDataStoreCards() {
   // return this.http.get<Card[]>(`${this.uri}/cards`);
    let localStorageItem = JSON.parse(localStorage.getItem('cards'));
    return localStorageItem == null ? [] : localStorageItem.cards;
  }

  deleteDataStoreCard(id) {
    let cards = this.getDataStoreCards();
    cards = cards.filter((del_card)=> del_card.id != id);
    this.setLocalStorageCards(cards);
  }

  updateDataStoreCard(cards){
    console.log(cards);
    this.setLocalStorageCards(cards);
  }
  setLocalStorageCards(cards: Card[]): void {
    localStorage.setItem('cards', JSON.stringify({ cards: cards }));
  }

  getCardDSById(id) {
    let cards = this.getDataStoreCards();
    const Card = cards.find((del_card)=> del_card.id == id);
    if(!Card){return 0;}
    else if(Card){
      console.log(Card.id);
      return Card;
    }

  }

  getCardById(id) {
      return this.http.get(`${this.uri}/cards/${id}`)
  }
  addDataStoreCard(account, author, status, createdAt, lastEditDay) {

    let IDs = (Math.floor(Math.random() * (100000 - 1)) + 1) + '_rand';
    let id = this.nextId;
    const newCard = {
      IDs:IDs,
      id:id,
      account:account,
      author: author,
      status:status,
      createdAt: createdAt,
      lastEditDay:lastEditDay,
    };

    let cards = this.getDataStoreCards();
    cards.push(newCard);
    this.setLocalStorageCards(cards);
    this.nextId++;
  }
  addCard(account, author, status, createdAt, lastEditDay) {

    let IDs = (Math.floor(Math.random() * (100000 - 1)) + 1) + '_rand';
    const card = {
      lastEditDay:lastEditDay,
      IDs:IDs,
      account:account,
      status:status,
      createdAt: createdAt,
      author: author
    };
    return this.http.post(`${this.uri}/cards`, card)
  }

  updateCard(id, IDs, account, author, status, createdAt, lastEditDay) {
    const card = {
      lastEditDay:lastEditDay,
      IDs:IDs,
      account:account,
      status:status,
      createdAt: createdAt,
      author: author
    };
    return this.http.put(`${this.uri}/cards/${id}`, card);
  }

  deleteCard(id) {
    return this.http.delete(`${this.uri}/cards/${id}`);
  }
  clearCardsInDS(){
    localStorage.clear();
  }
  clearCardsInJSON(){
    //return this.http.delete(`${this.uri}/cards/${id}`);
  }
}
