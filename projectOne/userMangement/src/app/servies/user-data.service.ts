import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "../../../node_modules/rxjs/Subject";

@Injectable()
export class UserDataService {
  public userList: any = [];
  public pages = [];
  pageSize = 5;
  updatedPerson : string;
  popStatus = false;
  constructor(private http: HttpClient) {}

  // fetching data from local JSON
  getUserList(): void {
    this.http.get("http://localhost:3000/users")
    .subscribe(
      data => {
        this.userList = data;
        this.calculatePages();
        console.log(this.userList);
      },
      error => {
        alert("server error");
      },
      () => {}
    );
  }

  updateUserDetails(payload) {
    const url = `${'http://localhost:3000/users'}/${payload.id}`;
    let headers =  new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.put(url,payload).subscribe(response => {
      this.popStatus = true;
      this.updatedPerson = payload.user;
    },
  (error)=> {
    alert('server error')
  })
  }

  calculatePages() {
    let l = this.userList.length;
    console.log(l / this.pageSize, l % this.pageSize);
    if (l / this.pageSize <= 1) {
      this.pages = [1];
    } else if (l / this.pageSize > 1) {
      this.pages = [];
      for (let i = 1; i <= Math.ceil(l / this.pageSize); i++) {
        this.pages.push(i);
      }
    }
  }
}
