/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getDOM } from '../dom/dom_adapter';
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular 2 application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 */
export class Title {
    /**
     * Get the title of the current HTML document.
     * @return {?}
     */
    getTitle() { return getDOM().getTitle(); }
    /**
     * Set the title of the current HTML document.
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(newTitle) { getDOM().setTitle(newTitle); }
}
//# sourceMappingURL=title.js.map