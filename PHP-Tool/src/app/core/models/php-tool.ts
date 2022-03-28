import { v4 as uuidv4 } from "uuid";

// Array with all users
// One user is stored as UserData
export interface AllUsersProps {
  users: SingleUserProps[];
}
// Props for one user
export interface SingleUserProps {
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
// props for all dev users
export interface AllDevUsersProps {
  devUsers: SingleDevUserProps[];
}
// props for one dev user
export interface SingleDevUserProps {
  uuid?: string; // unique id
  name: string; // name of dentist
  sn: number; // serialnumber
  praxis: string; // name of praxis
  version: string; // newest version dentist has access to
}
// props for test-version settings
export interface VersionSettingsProps {
  path: string;
  maxDownloads: number;
}



// class for managing all users that have logged in
export class AllUsers {
  private _users: SingleUser[];

  constructor(props?: AllUsersProps) {
    if (props === undefined) {
      this._users = [];
      return;
    }
    this._users = props.users.map((u) => new SingleUser(u));
  }

  get users(): SingleUser[] {
    return this._users;
  }

  set users(newUsers: SingleUser[]) {
    this._users = newUsers;
  }

  getProps(): AllUsersProps {
    return {
      users: this.users.map((u) => u.getProps()),
    };
  }
}

// class for a single user
export class SingleUser {
  private _uuid: string;
  private _password: string;
  private _name: string;

  constructor(props: SingleUserProps) {
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

  get password(): string {
    return this._password;
  }

  set password(newPassword: string) {
    this._password = newPassword;
  }

  getProps(): SingleUserProps {
    return {
      name: this.name,
      password: this.password,
      uuid: this.uuid,
    };
  }
}

// class for all test users
export class AllTestUsers {
  private _testUsers: SingleTestUser[];

  constructor(props?: AllTestUsersProps) {
    if (props === undefined) {
      this._testUsers = [];
      return;
    }
    this._testUsers = props.testUsers.map((t) => new SingleTestUser(t));
  }

  get testUsers(): SingleTestUser[] {
    return this._testUsers;
  }

  set testUsers(newTestUsers: SingleTestUser[]) {
    this._testUsers = newTestUsers;
  }

  getProps(): AllTestUsersProps {
    return {
      testUsers: this.testUsers.map((t) => t.getProps()),
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

  constructor(props: SingleTestUserProps) {
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

  getProps(): SingleTestUserProps {
    return {
      uuid: this._uuid,
      name: this._name,
      sn: this._sn,
      praxis: this._praxis,
      version: this._version,
    };
  }
}

// class for all dev users
export class AllDevUsers {
  private _devUsers: SingleDevUser[];

  constructor(props?: AllDevUsersProps) {
    if (props === undefined) {
      this._devUsers = [];
      return;
    }
    this._devUsers = props.devUsers.map((d) => new SingleDevUser(d));
  }

  get devUsers(): SingleDevUser[] {
    return this._devUsers;
  }

  set devUsers(newDevUsers: SingleDevUser[]) {
    this._devUsers = newDevUsers;
  }

  getProps(): AllDevUsersProps {
    return {
      devUsers: this.devUsers.map((d) => d.getProps()),
    };
  }
}

// class for one dev user
export class SingleDevUser {
  private _uuid: string;
  private _name: string;
  private _sn: number;
  private _praxis: string;
  private _version: string;

  constructor(props: SingleDevUserProps) {
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

  getProps(): SingleDevUserProps {
    return {
      uuid: this._uuid,
      name: this._name,
      sn: this._sn,
      praxis: this._praxis,
      version: this._version,
    };
  }
}

// class for test-version-settings
export class TestVersionSettings {
  private _path: string;
  private _maxDownloads: number;

  constructor(props?: VersionSettingsProps) {
    if (props === undefined) {
      this._path = "",
        this._maxDownloads = 0
      return;
    }
    this._path = props.path;
    this._maxDownloads = props.maxDownloads;
  }

  get path(): string {
    return this._path;
  }
  set path(newPath: string) {
    this._path = newPath;
  }

  get maxDownloads(): number {
    return this._maxDownloads;
  }
  set maxDownloads(newMD: number) {
    this._maxDownloads = newMD;
  }

  getProps(): VersionSettingsProps {
    return {
      path: this._path,
      maxDownloads: this._maxDownloads
    };
  }
}

// class for dev-version-settings
export class DevVersionSettings {
  private _path: string;
  private _maxDownloads: number;

  constructor(props?: VersionSettingsProps) {
    if (props === undefined) {
      this._path = "",
        this._maxDownloads = 0
      return;
    }
    this._path = props.path;
    this._maxDownloads = props.maxDownloads;
  }

  get path(): string {
    return this._path;
  }
  set path(newPath: string) {
    this._path = newPath;
  }

  get maxDownloads(): number {
    return this._maxDownloads;
  }
  set maxDownloads(newMD: number) {
    this._maxDownloads = newMD;
  }

  getProps(): VersionSettingsProps {
    return {
      path: this._path,
      maxDownloads: this._maxDownloads
    };
  }
}

// class for test-version-settings
export class PublicVersionSettings {
  private _path: string;
  private _maxDownloads: number;

  constructor(props?: VersionSettingsProps) {
    if (props === undefined) {
      this._path = "",
        this._maxDownloads = 0
      return;
    }
    this._path = props.path;
    this._maxDownloads = props.maxDownloads;
  }

  get path(): string {
    return this._path;
  }
  set path(newPath: string) {
    this._path = newPath;
  }

  get maxDownloads(): number {
    return this._maxDownloads;
  }
  set maxDownloads(newMD: number) {
    this._maxDownloads = newMD;
  }

  getProps(): VersionSettingsProps {
    return {
      path: this._path,
      maxDownloads: this._maxDownloads
    };
  }
}