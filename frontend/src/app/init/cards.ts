import {Card} from "../card.model";
import {Observable} from "rxjs/index";
//import { HttpClient} from '@angular/common/http';
export class Init {
  constructor(){




            }
  uri = 'http://localhost:4000';

  // getCards():Observable<Card[]> {
  //   return this.http.get<Card[]>(`${this.uri}/cards`);
  // }






 load() {

    if(localStorage.getItem('cards') === null || localStorage.getItem('cards') == undefined) {
      //console.log('No Cards Found... Creating...');



      let cards =
        {"cards":[{
        lastEditDay: "12/02/2018",
        IDs: "39766_rand",
        account: "dataStore1",
        status: "ds",
        createdAt: "11/28/2018",
        author: {
          fio: "data",
          post: "store"
        },
        id: 1
      },
        {
          lastEditDay: "12/02/2018",
          IDs: "22222_rand",
          account: "dataStore2",
          status: "ds",
          createdAt: "11/28/2018",
          author: {
            fio: "data2",
            post: "store2"
          },
          id: 2
        },
      ]};


// JSON.stringify(cards)
      localStorage.setItem('cards',JSON.stringify(cards));
      return
    } else {
      console.log('Found Cards...');
    }
  }

}
