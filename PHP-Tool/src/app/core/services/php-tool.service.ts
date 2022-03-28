import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import {
  AllDevUsers,
  AllTestUsers,
  SingleDevUser,
  SingleDevUserProps,
  SingleTestUser,
  SingleTestUserProps,
  SingleUser,
  SingleUserProps,
  AllUsers,
  TestVersionSettings,
  DevVersionSettings,
  PublicVersionSettings,
  VersionSettingsProps,
} from "../models/php-tool";

@Injectable({
  providedIn: "root",
})
export class PhpToolService {
  private _users: AllUsers;
  private _testUsers: AllTestUsers;
  private _devUsers: AllDevUsers;

  private _testVersionSettings: TestVersionSettings;
  private _devVersionSettings: DevVersionSettings;
  private _publicVersionSettings: PublicVersionSettings;

  private userDataChanged = new Subject<object>(); // saving user, test user, dev user related data when it changes

  constructor() {
    this._users = new AllUsers();
    this._testUsers = new AllTestUsers();
    this._devUsers = new AllDevUsers();

    this._testVersionSettings = new TestVersionSettings();
    this._devVersionSettings = new DevVersionSettings();
    this._publicVersionSettings = new PublicVersionSettings();
    
    this.userDataChanged.subscribe();
  }

  onUserDataChange(): Observable<object> {
    return this.userDataChanged.asObservable();
  }
  

  saveSettings(props: VersionSettingsProps, flag: string): void {
    return;
  }

  // adding users to class that contains all users
  addUser(props: SingleUserProps): SingleUser {
    let user = new SingleUser(props);

    this._users.users.push(user);
    this.userDataChanged.next({});
    return user;
  }

  addTestUser(props: SingleTestUserProps): SingleTestUser {
    let testUser = new SingleTestUser(props);

    this._testUsers.testUsers.push(testUser);
    this.userDataChanged.next({});
    return testUser;
  }

  addDevUser(props: SingleDevUserProps): SingleDevUser {
    let devUser = new SingleDevUser(props);

    this._devUsers.devUsers.push(devUser);
    this.userDataChanged.next({});
    return devUser;
  }


  // removing users from class that contains all users
  // id is the uuid
  removeUser(id: string) {
    this._users.users = this._users.users.filter((u) => u.uuid !== id);
    this.userDataChanged.next({});
  }

  removeTestUser(id: string) {
    this._testUsers.testUsers = this._testUsers.testUsers.filter(
      (t) => t.uuid !== id
    );
    this.userDataChanged.next({});
  }

  removeDevUser(id: string) {
    this._devUsers.devUsers = this._devUsers.devUsers.filter(
      (d) => d.uuid !== id
    );
    this.userDataChanged.next({});
  }

  // updates a user
  updateUser(props: SingleUserProps, id: string) {
    let storedUser = new SingleUser(props);
    let i = this._users.users.findIndex((u) => u.uuid === id);
    if (i === -1) return;

    this._users.users[i] = storedUser;
    this.userDataChanged.next({});
  }

  updateTestUser(props: SingleTestUserProps, id: string) {
    let storedTestUser = new SingleTestUser(props);
    let i = this._testUsers.testUsers.findIndex((u) => u.uuid === id);
    if (i === -1) return;

    this._testUsers.testUsers[i] = storedTestUser;
    this.userDataChanged.next({});
  }

  updateDevUser(props: SingleDevUserProps, id: string) {
    let storedDevUser = new SingleDevUser(props);
    let i = this._devUsers.devUsers.findIndex((u) => u.uuid === id);
    if (i === -1) return;

    this._devUsers.devUsers[i] = storedDevUser;
    this.userDataChanged.next({});
  }



  // getters
  getUsers(): SingleUserProps[] {
    return this._users.users;
  }
  getTestUsers(): SingleTestUser[] {
    return this._testUsers.testUsers;
  }

  getDevUsers(): SingleDevUser[] {
    return this._devUsers.devUsers;
  }

  userDataUpdate(): void {
    this.userDataChanged.next({});
  }
}
