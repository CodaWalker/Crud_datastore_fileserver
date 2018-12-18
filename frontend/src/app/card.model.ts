export class Card {
  constructor (
    //public id:number,
    public account:string,
    public author:
      {
        fio:string,
        post:string
      },
    public id:number,
    public IDs:string,
    public status:string,
    public createdAt:string,
    public lastEditDay:string

  )
  {}
}
