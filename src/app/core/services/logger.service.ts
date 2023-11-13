import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  get log() {
    return console.log.bind(console);
  }

  get info() {
    return console.info.bind(console);
  }

  get warn() {
    return console.warn.bind(console);
  }

  get error() {
    return console.error.bind(console);
  }

  get debug() {
    return console.debug.bind(console);
  }
}
