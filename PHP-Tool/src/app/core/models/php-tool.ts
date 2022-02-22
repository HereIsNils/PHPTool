import {v4 as uuidv4} from 'uuid';

export interface UserDataProps {
    name: string;
    password: string;
    uuid?: string;
}

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