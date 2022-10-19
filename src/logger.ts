import debug from 'debug';

export class Logger {

  constructor() {
    this.printlf = debug('convergency');
    debug.enable('convergency')
  }

  private printlf: (t: string, ...args: any[]) => any;

  log(template: string, ...args: any[]) {
    this.printlf(template, ...args);
  }

  error(template: string, ...args: any[]){
    this.printlf(template, ...args);
  }
}