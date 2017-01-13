/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common/index';
import { Injectable } from '@angular/core/index';
import { getDOM } from '../../dom/dom_adapter';
import { supportsState } from './history';
/**
 * `PlatformLocation` encapsulates all of the direct calls to platform APIs.
 * This class should not be used directly by an application developer. Instead, use
 * {\@link Location}.
 */
export class BrowserPlatformLocation extends PlatformLocation {
    constructor() {
        super();
        this._init();
    }
    /**
     * \@internal
     * @return {?}
     */
    _init() {
        this._location = getDOM().getLocation();
        this._history = getDOM().getHistory();
    }
    /**
     * @return {?}
     */
    get location() { return this._location; }
    /**
     * @return {?}
     */
    getBaseHrefFromDOM() { return getDOM().getBaseHref(); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onPopState(fn) {
        getDOM().getGlobalEventTarget('window').addEventListener('popstate', fn, false);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onHashChange(fn) {
        getDOM().getGlobalEventTarget('window').addEventListener('hashchange', fn, false);
    }
    /**
     * @return {?}
     */
    get pathname() { return this._location.pathname; }
    /**
     * @return {?}
     */
    get search() { return this._location.search; }
    /**
     * @return {?}
     */
    get hash() { return this._location.hash; }
    /**
     * @param {?} newPath
     * @return {?}
     */
    set pathname(newPath) { this._location.pathname = newPath; }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    pushState(state, title, url) {
        if (supportsState()) {
            this._history.pushState(state, title, url);
        }
        else {
            this._location.hash = url;
        }
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    replaceState(state, title, url) {
        if (supportsState()) {
            this._history.replaceState(state, title, url);
        }
        else {
            this._location.hash = url;
        }
    }
    /**
     * @return {?}
     */
    forward() { this._history.forward(); }
    /**
     * @return {?}
     */
    back() { this._history.back(); }
}
BrowserPlatformLocation.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BrowserPlatformLocation.ctorParameters = () => [];
function BrowserPlatformLocation_tsickle_Closure_declarations() {
    /** @type {?} */
    BrowserPlatformLocation.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    BrowserPlatformLocation.ctorParameters;
    /** @type {?} */
    BrowserPlatformLocation.prototype._location;
    /** @type {?} */
    BrowserPlatformLocation.prototype._history;
}
//# sourceMappingURL=browser_platform_location.js.map