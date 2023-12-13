import {ApplicationProperties} from "./d";


export class DataProvider {
  private readonly _file: string;
  private readonly _props: ApplicationProperties;

  constructor(file: string) {
    this._file = file;
    this._props = require(this._file);
  }

  get props(): ApplicationProperties {
    return this._props;
  }
}