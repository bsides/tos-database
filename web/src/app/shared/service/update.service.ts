import {Injectable} from '@angular/core';
import {TOSRegion, TOSRegionService} from "../domain/tos-region";

const KEY_VERSION = 'version';
const VERSION_HOTFIX = 2;
const VERSION: { [key in TOSRegion]: string } = {
  'iTOS': 'patch_244684_release_244684', /* iTOS-needle */
  'jTOS': 'patch_244710_release_244710', /* jTOS-needle */
  'kTEST': 'patch_240560_release_240582', /* kTEST-needle */
  'kTOS': 'patch_241507_release_241507', /* kTOS-needle */
  'twTOS': 'patch_244546_release_244546', /* twTOS-needle */
};

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private region: TOSRegion;

  constructor() {
    this.region = TOSRegionService.get();
  }

  updateAvailable(): boolean { return this.version != this.versionOld }
  updateVersion(clear?: boolean) {
    let version = JSON.parse(localStorage.getItem(KEY_VERSION) || '{}');
        version[this.region] = clear ? '' : this.version;

    localStorage.setItem(KEY_VERSION, JSON.stringify(version));
  }

  get version() { return VERSION[this.region] + (VERSION_HOTFIX ? '_hotfix_' + VERSION_HOTFIX : ''); }
  get versionHuman() { return this.region && (this.region.toString() + ' • ' + this.version) }

  private get versionOld(): string { return JSON.parse(localStorage.getItem(KEY_VERSION) || '{}')[this.region]; }

}
