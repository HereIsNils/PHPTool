import {v4 as uuidv4} from 'uuid';

//Array with all users
//one user is stored as UserData
export interface UsersProps {
    users: UserDataProps[];
}
//Props for one user
export interface UserDataProps {
    name: string;
    password: string;
    uuid?: string;
}
//class for all users
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
//class for a single user
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