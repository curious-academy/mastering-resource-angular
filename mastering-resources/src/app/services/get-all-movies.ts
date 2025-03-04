import { Injectable } from "@angular/core";
import { initialValue, OnMovies } from "../models/movies";

@Injectable()
export class GetAllMovies {
  getAll(filter = ''): Promise<OnMovies> {
    return new Promise<OnMovies>(resolve => {
      console.info('0. Promise starting')
      setTimeout(() => {
        console.info('1. Promise resolve before')

        let table = [...initialValue]
        if(filter !== '') {
          table = table.filter(item => item.title.includes(filter))
        }

        resolve(table)
        console.info('2. Promise resolve after')
      }, 2500);
    })
  }
}
