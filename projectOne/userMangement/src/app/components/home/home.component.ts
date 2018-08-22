import { Component, OnInit, AfterViewInit } from "@angular/core";
import { UserDataService } from "../../servies/user-data.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormControlName,
  Validators
} from "@angular/forms";
import { Observable } from "../../../../node_modules/rxjs/Observable";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  currentPage: number = 1;
  pageSize = this.userService.pageSize;
  users = [];
  userForm: FormGroup;
  showForm = false;
  currentUser;
  word: string;
  searchWord: string;
  person$: Observable<string>;
  constructor(private userService: UserDataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.userService.getUserList();
    this.users = [...this.userService.userList];
  }

  get userDetails() {
    return (this.users = [...this.userService.userList].splice(
      (this.currentPage - 1) * this.pageSize,
      this.pageSize
    ));
  }

  get pages() {
    return this.userService.pages;
  }

  onChangePage(pageNumber) {
    this.showForm = false;
    // update current page of items
    let temp = (pageNumber - 1) * this.pageSize;
    this.users = [...this.userService.userList].splice(
      temp,
      temp + this.pageSize
    );
    this.currentPage = pageNumber;
    console.log(pageNumber);
  }
  previous() {
    this.showForm = false;
    if(this.currentPage>1){
      this.onChangePage(this.currentPage-1)
    }
  }

  next() {
    this.showForm = false;
    if(this.currentPage<this.userService.pages.length){
      this.onChangePage(this.currentPage+1)
    }
  }

  rowHandler(user) {
    this.showForm = true;
    this.currentUser = user;
    this.userForm = new FormGroup({
      'contactNumber': new FormControl(
        user.contactdetails.number
      ),
      'email': new FormControl(user.contactdetails.email),
      'streetNumber': new FormControl(
        user.addressdetails.number
      ),
      'streetname': new FormControl(
        user.addressdetails.street
      ),
      'suburb': new FormControl(user.addressdetails.suburb, Validators.required),
      'postalCode': new FormControl(
        user.addressdetails.postalcode
      )
    });

  }
  saveUser() {
    console.log(this.userForm.value);
    let userUpdatedObject = {
      "contactdetails": {
        "number": this.userForm.controls['contactNumber'].value,
        "email": this.userForm.controls['email'].value
      },
      "addressdetails": {
        "number": this.userForm.controls['streetNumber'].value,
        "street": this.userForm.controls['streetname'].value,
        "suburb": this.userForm.controls['suburb'].value,
        "postalcode": this.userForm.controls['postalCode'].value
      }
    }
    this.userService.updateUserDetails(Object.assign(this.currentUser,userUpdatedObject));
  }

  set userDetails(value) {
    this.users = value;
  }
  
  search(word) {
   this.word = this.searchWord;
  }
  closePop() {
    this.userService.popStatus = false;
  }
  
}
