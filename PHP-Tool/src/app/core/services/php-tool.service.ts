import { Injectable } from '@angular/core';
import { UserData, UserDataProps, Users } from '../models/php-tool';

@Injectable({
  providedIn: 'root'
})
export class PhpToolService {
  private _users: Users;

  constructor() { 
    this._users = new Users
  }

  addUser(props: UserDataProps): UserData {
    let user = new UserData(props);

    this._users.users.push(user)
    return user;
  }
}
