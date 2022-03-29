import { v4 as uuidv4 } from "uuid";

/*---------- interfaces ------------*/

// Props for all User Groups
export interface AllUserGroupsProps {
    userGroups: UserGroupProps[]; // Array with all User Groups
}

// Props for a User Group
export interface UserGroupProps {
    uuid?: string; // Unique id to identify the User Group
    name: string; // Name of the User Group
    users: SingleUserProps[]; // Array with all Users
    settings: UserGroupSettingsProps; // Settings for the User Group
}

// Props for the settings of a User Group
export interface UserGroupSettingsProps {
    path: string; // Path on the FTP Server
    limit: number; // Limit for how many users can download the file
}

// Props for a Single User
export interface SingleUserProps {
    uuid?: string; // Unique id to identify the dentist
    name: string; // Name of dentist
    sn: number; // Boxes serialnumber
    praxis: string; // Name of praxis
    version: string; // Newest version dentist has access to
}

// Props for all Accounts
export interface AllAccountsProps {
    accounts: SingleAccountProps[]; // Array with all Accounts
}

// Props for an Account
export interface SingleAccountProps {
    uuid?: string; // Unique id to identify the account
    name: string; // Name of account
    password: string; // Password of account
}

/*---------- classes ------------*/

export class AllUserGroups {
    private _userGroups: UserGroup[]

    constructor(props?: AllUserGroupsProps) {
        if (props === undefined) {
            this._userGroups = [];
            return;
        }

        this._userGroups = props.userGroups.map(u => new UserGroup(u));
    }

    get userGroups(): UserGroup[] {
        return this._userGroups;
    }

    set userGroups(newUG: UserGroup[]) {
        this._userGroups = newUG;
    }

    getProps(): AllUserGroupsProps {
        return {
            userGroups: this.userGroups.map(u => u.getProps())
        }
    }
}

export class UserGroup {
    private _uuid: string;
    private _name: string;
    private _users: SingleUser[];
    private _settings: UserGroupSettings;

    constructor(props: UserGroupProps) {

        /*if (props === undefined) {
            this._uuid = "";
            this._name = "";
            this._users = [];
            this._settings = {} as UserGroupSettings;

            return;
        }*/

        this._uuid = props.uuid ?? uuidv4();
        this._name = props.name;
        this._users = props.users.map(u => new SingleUser(u));
        this._settings = props.settings = new UserGroupSettings(props.settings);
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

    get settings(): UserGroupSettings {
        return this._settings;
    }
    set settings(newSettings: UserGroupSettings) {
        this._settings = newSettings;
    }

    get users(): SingleUser[] {
        return this._users;
    }
    set users(newUsers: SingleUser[]) {
        this._users = newUsers;
    }

    getProps(): UserGroupProps {
        return {
            uuid: this.uuid,
            name: this.name,
            settings: this.settings,
            users: this.users.map(u => u.getProps())
        }
    }
}

export class UserGroupSettings {
    private _path: string;
    private _limit: number;

    constructor(props: UserGroupSettingsProps) {
        this._path = props.path;
        this._limit = props.limit;
    }

    get path(): string {
        return this._path;
    }
    set path(newPath: string) {
        this._path = newPath;
    }

    get limit(): number {
        return this._limit;
    }
    set limit(newLimit: number) {
        this._limit = newLimit;
    }

    getProps(): UserGroupSettingsProps {
        return {
            path: this.path,
            limit: this.limit
        }
    }
}

export class SingleUser {
    private _uuid: string;
    private _name: string;
    private _sn: number;
    private _praxis: string;
    private _version: string;

    constructor(props: SingleUserProps) {
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
        this._name = newName;
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

    getProps(): SingleUserProps {
        return {
            uuid: this.uuid,
            name: this.name,
            sn: this.sn,
            praxis: this.praxis,
            version: this.version,
        };
    }
}


export class SingleAccount {
    private _uuid: string;
    private _name: string;
    private _password: string;

    constructor(props: SingleAccountProps) {
        this._uuid = props.uuid ?? uuidv4();
        this._name = props.name;
        this._password = props.password;
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

    get password(): string {
        return this._password;
    }

    set password(newPassword: string) {
        this._password = newPassword;
    }

    getProps(): SingleAccountProps {
        return {
            uuid: this.uuid,
            name: this.name,
            password: this.password,
        };
    }
}

export class AllAccounts {
    private _accounts: SingleAccount[];


    constructor(props?: AllAccountsProps) {
        if (props === undefined) {
            this._accounts = [];
            return;
        }
        this._accounts = props.accounts.map(a => new SingleAccount(a));
    }

    get accounts(): SingleAccount[] {
        return this._accounts;
    }

    set accounts(newAccs: SingleAccount[]) {
        this._accounts = newAccs;
    }

    getProps(): AllAccountsProps {
        return {
            accounts: this.accounts.map(a => a.getProps())
        }
    }
}