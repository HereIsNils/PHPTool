import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AllAccounts, AllUserGroups, SingleAccount, SingleAccountProps, UserGroup, UserGroupProps, UserGroupSettings, UserGroupSettingsProps } from '../models/php-tool2';

@Injectable({
  providedIn: 'root'
})
export class PhpTool2Service {
  //private _userGroup: UserGroup;
  private _allUserGroups: AllUserGroups;
  private _allAcconuts: AllAccounts;

  private dataChanged = new Subject<object>();

  constructor() {
    //this._userGroup = new UserGroup();
    this._allUserGroups = new AllUserGroups();
    this._allAcconuts = new AllAccounts();

    this.dataChanged.subscribe();
  }

  onDataChaged(): Observable<object> {
    return this.dataChanged.asObservable();
  }


  /*---------- get ------------*/

  getUserGroups(): UserGroup[] {
    return this._allUserGroups.userGroups;
  }

  getAccounts(): SingleAccount[] {
    return this._allAcconuts.accounts;
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


  /*---------- update ------------*/

  updateUserGroup(id: string, props: UserGroupProps) {
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

  updateUserGroupSettings(id: string, props: UserGroupSettingsProps) {
    let storedSettings = new UserGroupSettings(props);
    let i = this._allUserGroups.userGroups.findIndex(u => u.uuid === id);

    this._allUserGroups.userGroups[i].settings = storedSettings;
    this.dataChanged.next({});
  }
}

