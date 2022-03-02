import { Injectable } from "@angular/core";
import {
  AllDevUsers,
  AllTestUsers,
  SingleDevUser,
  SingleDevUserProps,
  SingleTestUser,
  SingleTestUserProps,
  UserData,
  UserDataProps,
  Users,
} from "../models/php-tool";

@Injectable({
  providedIn: "root",
})
export class PhpToolService {
  private _users: Users;
  private _testUsers: AllTestUsers;
  private _devUsers: AllDevUsers;

  constructor() {
    this._users = new Users();
    this._testUsers = new AllTestUsers();
    this._devUsers = new AllDevUsers();
  }

  // adding users to class that contains all users
  addUser(props: UserDataProps): UserData {
    let user = new UserData(props);

    this._users.users.push(user);
    return user;
  }

  addTestUser(props: SingleTestUserProps): SingleTestUser {
    let testUser = new SingleTestUser(props);

    this._testUsers.testUsers.push(testUser);
    return testUser;
  }

  addDevUser(props: SingleDevUserProps): SingleDevUser {
    let devUser = new SingleDevUser(props);

    this._devUsers.devUsers.push(devUser);
    return devUser;
  }



  // removing users from class that contains all users
  // id is the uuid
  removeUser(id: string) {
    this._users.users = this._users.users.filter((u) => u.uuid !== id);
  }

  removeTestUser(id: string) {
    this._testUsers.testUsers = this._testUsers.testUsers.filter(
      (t) => t.uuid !== id
    );
  }

  removeDevUser(id: string) {
    this._devUsers.devUsers = this._devUsers.devUsers.filter(
      (d) => d.uuid !== id
    );
  }



  // updates a user
  updateUser(props: UserDataProps, id: string) {
    let storedUser = new UserData(props);
    let i = this._users.users.findIndex(u => u.uuid === id);
    if (i === -1) return;

    this._users.users[i] = storedUser;
  }

  updateTestUser(props: SingleTestUserProps, id: string) {
    let storedTestUser = new SingleTestUser(props);
    let i = this._users.users.findIndex(u => u.uuid === id);
    if (i === -1) return;

    this._testUsers.testUsers[i] = storedTestUser;
  }

  updateDevUser(props: SingleDevUserProps, id: string) {
    let storedDevUser = new SingleDevUser(props);
    let i = this._devUsers.devUsers.findIndex(u => u.uuid === id);
    if (i === -1) return;

    this._devUsers.devUsers[i] = storedDevUser;
  }
}
