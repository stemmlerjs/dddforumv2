
export class LoadingState {
  private _isLoading: boolean;
  private loadSuccess: boolean;
  private loadError: string;

  constructor () {
    this._isLoading = false;
    this.loadSuccess = false;
    this.loadError = '';
  }

  setLoading () {
    this._isLoading = true;
    this.loadSuccess = false;
    this.loadError = '';
  }

  setLoadSuccess () {
    this._isLoading = false;
    this.loadSuccess = true;
    this.loadError = '';
  }

  setLoadError (errorMessage: string) {
    this._isLoading = true;
    this.loadSuccess = true;
    this.loadError = errorMessage;
  }

  getLoadError () {
    return this.loadError;
  }

  isLoading () {
    return this._isLoading
  }

  wasLoadSuccessful () {
    return this.loadSuccess;
  }
}