class ScannerServiceConcrete {
  getScanner() {
    return this._scanner
  }

  setScanner(e) {
    this._scanner = e
  }
}

const createScannerService = () => new ScannerServiceConcrete;
export {createScannerService as c};
