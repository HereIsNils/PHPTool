import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AllAccounts, AllUserGroups, SingleAccount, SingleAccountProps, SingleUser, SingleUserProps, UserGroup, UserGroupProps } from '../models/php-tool';

const xhttp = new XMLHttpRequest();

@Injectable({
  providedIn: 'root'
})


export class PhpToolService {
  private _allUserGroups: AllUserGroups;
  private _allAcconuts: AllAccounts;

  private dataChanged = new Subject<object>();

  constructor() {
    this._allUserGroups = new AllUserGroups();
    this._allAcconuts = new AllAccounts();
    // get all user groups from the database when the page gets loaded
    this.loadAllUserGroups();

    this.dataChanged.subscribe(() => this.saveDataJson());
  }

  onDataChaged(): Observable<object> {
    return this.dataChanged.asObservable();
  }

  /*---------- database stuff ------------*/

  saveDataJson(): void {
    let data = JSON.stringify(this._allUserGroups.getProps(), null, 2);
    try {
      xhttp.onload = function() {
        console.log("Data send:", data);
      }
      xhttp.open("POST", "setUserGroups.php");
      xhttp.setRequestHeader("Connect-type", "application/x-www-form-urlecoded");
      xhttp.send(data);
    } catch (err) {
      xhttp.abort();
      console.error(err); return;
    }
  }

  loadAllUserGroups(): void {
    const service = this;
      try {
        xhttp.onload = function(){
          console.log("post response", this.responseText)

          if(this.responseText === null || this.responseText === "") return;
          service._allUserGroups = new AllUserGroups(JSON.parse(this.responseText));
          service.dataChanged.next({});

          console.log("POST successful!", xhttp.status, this.status)
        }
        xhttp.open("POST", "getUserGroups.php");
        //xhttp.setRequestHeader("Connect-type", "application/x-www-form-urlecoded");
        xhttp.send()
        
      } catch (err) {
        xhttp.abort();
        console.error(err);
    }
  }

  /*---------- get ------------*/
  // returns all user groups
  getUserGroups(): UserGroup[] {
    return this._allUserGroups.userGroups;
  }
  // returns a single usergroup based on uuid
  getUserGroup(id?: string): UserGroup {
    if(id === undefined) return {} as UserGroup;

    let i = this._allUserGroups.userGroups.findIndex(u => u.uuid === id);
    return this._allUserGroups.userGroups[i];
  }

  getAccounts(): SingleAccount[] {
    return this._allAcconuts.accounts;
  }

  getAllUsers(idGroup?: string): SingleUser[] {
    if (idGroup === undefined) return {} as SingleUser[];
    let i = this._allUserGroups.userGroups.findIndex(u => u.uuid === idGroup);

    return this._allUserGroups.userGroups[i].users;
  }

  getUser(idUser: string, idGroup?: string): SingleUser {
    if (idGroup === undefined) return {} as SingleUser;
    let i = this._allUserGroups.userGroups.findIndex(u => u.uuid === idGroup);
    if (i === -1) return {} as SingleUser;
    let iUser = this._allUserGroups.userGroups[i].users.findIndex(u => u.uuid === idUser)
    if (iUser === -1) return {} as SingleUser;
    return this._allUserGroups.userGroups[i].users[i];
  }


  /*---------- create ------------*/

  createUserGroup(props: UserGroupProps): UserGroup {
    let userGroup = new UserGroup(props);
    this._allUserGroups.userGroups.push(userGroup);
    this.dataChanged.next({});

    return userGroup;
  }

  createAccount(props: SingleAccountProps): SingleAccount {
    let account = new SingleAccount(props);
    this._allAcconuts.accounts.push(account);
    this.dataChanged.next({});

    return account;
  }

  createUser(props: SingleUserProps, id?: string): SingleUser {
    let user = new SingleUser(props);
    let i = this._allUserGroups.userGroups.findIndex(u => u.uuid === id);
    if (i === -1) return user;
    this._allUserGroups.userGroups[i].users.push(user);
    this.dataChanged.next({});
    return user;
  }


  /*---------- update ------------*/

  updateUserGroup(props: UserGroupProps, id?: string) {
    if(id === undefined) return;
    let storedUserGroup = new UserGroup(props);
    let i = this._allUserGroups.userGroups.findIndex(u => u.uuid === id);
    if (i === -1) return;

    this._allUserGroups.userGroups[i] = storedUserGroup;
    this.dataChanged.next({});
  }

  updateAccount(id: string, props: SingleAccountProps) {
    let storedAccount = new SingleAccount(props);
    let i = this._allAcconuts.accounts.findIndex(a => a.uuid === id);
    if (i === -1) return;

    this._allAcconuts.accounts[i] = storedAccount;
    this.dataChanged.next({});
  }

  /*---------- remove ------------*/

  removeUser(idUser: string, idGroup?: string): void {
    if (idGroup === undefined) return;
    let i = this._allUserGroups.userGroups.findIndex(u => u.uuid === idGroup);
    if (i === -1) return;

    this._allUserGroups.userGroups[i].users = this._allUserGroups.userGroups[i].users.filter((u) => u.uuid !== idUser);
    this.dataChanged.next({});
  }

  removeUserGroup(id?: string) {
    if (id === undefined) return;
    let i = this._allUserGroups.userGroups.findIndex(u => u.uuid === id);
    if (i === -1) return;

    this._allUserGroups.userGroups = this._allUserGroups.userGroups.filter((u) => u.uuid !== id);
    this.dataChanged.next({});
  }
}

