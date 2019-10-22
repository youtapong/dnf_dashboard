import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpaddrService {

  public ip_addr: string = 'http://10.255.254.159/';
  //public ip_addr: string = 'http://1.10.184.234:8159/';

  constructor() { }
  public use_ip() {
    return this.ip_addr;
  }
}
