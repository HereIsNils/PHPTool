import {v4 as uuidv4} from 'uuid';

// Array with all users
// One user is stored as UserData
export interface UsersProps {
    users: UserDataProps[];
}
// Props for one user
export interface UserDataProps {
    name: string;
    password: string;
    uuid?: string;
}
// props for all test users
export interface AllTestUsersProps {
    testUsers: SingleTestUserProps[];
}
// Props for one Test user
export interface SingleTestUserProps {
  uuid?: string; // unique id   
  name: string; // name of dentist
  sn: number; // serialnumber 
  praxis: string; // name of praxis
  version: string; // newest version dentist has access to
}
// class for managing all users that have logged in
export class Users {
    private _users: UserData[];

    constructor(props?: UsersProps){
        if(props === undefined){
            this._users = [];
            return;
        }
        this._users = props.users.map(u => new UserData(u));
    }

    get users(): UserData[]{
        return this._users;
    }

    set users(newUsers: UserData[]) {
        this._users = newUsers;
    }

    getProps(): UsersProps {
        return {
            users: this.users.map(u => u.getProps())
        };
    }
}
// class for a single user
export class UserData {
    private _uuid: string;
    private _password: string;
    private _name: string;

    constructor(props: UserDataProps){
        this._name = props.name;
        this._password = props.password;
        this._uuid = props.uuid ?? uuidv4();
    }

    get uuid(): string {
        return this._uuid;
    }

    get name(): string {
        return this._name;
    }
    
    set name(newName: string) {
        this._name = newName;
    }

    get password():string {
        return this._password;
    }

    set password(newPassword: string) {
        this._password = newPassword;
    }

    getProps(): UserDataProps {
        return {
            name: this.name,
            password: this.password,
            uuid: this.uuid
        }
    }
}
// class for all test customers
export class AllTestCustomers {
    private _testUsers: SingleTestUser[];

    constructor(props?: AllTestUsersProps){
        if(props === undefined){
            this._testUsers = [];
            return;
        }
        this._testUsers = props.testUsers.map(t => new SingleTestUser(t))
    }

    get testUsers(): SingleTestUser[] {
        return this._testUsers;
    }

    set testUsers(newTestUsers: SingleTestUser[]) {
        this._testUsers = newTestUsers;
    }

    getProps(): AllTestUsersProps {
        return {
            testUsers: this.testUsers.map(t => t.getProps())
        };
    }
}
// class for a single test user
export class SingleTestUser {
    private _uuid: string;
    private _name: string;
    private _sn: number;
    private _praxis: string;
    private _version: string;

    constructor(props: SingleTestUserProps){
        this._uuid = props.uuid ?? uuidv4();
        this._name = props.name;
        this._sn = props.sn;
        this._praxis = props.praxis;
        this._version = props.version;
    }

    get uuid(): string {
        return this._uuid;
    }

    get name(): string {
        return this._name;
    }
    set name(newName: string) {
        this._name = newName
    }
    
    get sn(): number {
        return this._sn;
    }
    set sn(newSn: number) {
        this._sn = newSn;
    }

    get praxis(): string {
        return this._praxis;
    }
    set praxis(newPraxis: string) {
        this._praxis = newPraxis;
    }

    get version(): string {
        return this._version;
    }
    set version(newVersion: string) {
        this._version = newVersion;
    }

    getProps(): SingleTestUserProps {
        return {
            uuid: this._uuid,
            name: this._name,
            sn: this._sn,
            praxis: this._praxis,
            version: this._version
        }
    }
}