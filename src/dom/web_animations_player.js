/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AUTO_STYLE } from '@angular/core/index';
import { isPresent } from '../facade/lang';
import { getDOM } from './dom_adapter';
export class WebAnimationsPlayer {
    /**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @param {?=} previousPlayers
     */
    constructor(element, keyframes, options, previousPlayers = []) {
        this.element = element;
        this.keyframes = keyframes;
        this.options = options;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._initialized = false;
        this._finished = false;
        this._started = false;
        this._destroyed = false;
        this.parentPlayer = null;
        this._duration = options['duration'];
        this.previousStyles = {};
        previousPlayers.forEach(player => {
            let styles = player._captureStyles();
            Object.keys(styles).forEach(prop => this.previousStyles[prop] = styles[prop]);
        });
    }
    /**
     * @return {?}
     */
    _onFinish() {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach(fn => fn());
            this._onDoneFns = [];
        }
    }
    /**
     * @return {?}
     */
    init() {
        if (this._initialized)
            return;
        this._initialized = true;
        const /** @type {?} */ keyframes = this.keyframes.map(styles => {
            const /** @type {?} */ formattedKeyframe = {};
            Object.keys(styles).forEach((prop, index) => {
                let /** @type {?} */ value = styles[prop];
                if (value == AUTO_STYLE) {
                    value = _computeStyle(this.element, prop);
                }
                if (value != undefined) {
                    formattedKeyframe[prop] = value;
                }
            });
            return formattedKeyframe;
        });
        const /** @type {?} */ previousStyleProps = Object.keys(this.previousStyles);
        if (previousStyleProps.length) {
            let /** @type {?} */ startingKeyframe = keyframes[0];
            let /** @type {?} */ missingStyleProps = [];
            previousStyleProps.forEach(prop => {
                if (!isPresent(startingKeyframe[prop])) {
                    missingStyleProps.push(prop);
                }
                startingKeyframe[prop] = this.previousStyles[prop];
            });
            if (missingStyleProps.length) {
                for (let /** @type {?} */ i = 1; i < keyframes.length; i++) {
                    let /** @type {?} */ kf = keyframes[i];
                    missingStyleProps.forEach(prop => { kf[prop] = _computeStyle(this.element, prop); });
                }
            }
        }
        this._player = this._triggerWebAnimation(this.element, keyframes, this.options);
        this._finalKeyframe = _copyKeyframeStyles(keyframes[keyframes.length - 1]);
        // this is required so that the player doesn't start to animate right away
        this._resetDomPlayerState();
        this._player.addEventListener('finish', () => this._onFinish());
    }
    /**
     * \@internal
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @return {?}
     */
    _triggerWebAnimation(element, keyframes, options) {
        return (element.animate(keyframes, options));
    }
    /**
     * @return {?}
     */
    get domPlayer() { return this._player; }
    /**
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) { this._onStartFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) { this._onDoneFns.push(fn); }
    /**
     * @return {?}
     */
    play() {
        this.init();
        if (!this.hasStarted()) {
            this._onStartFns.forEach(fn => fn());
            this._onStartFns = [];
            this._started = true;
        }
        this._player.play();
    }
    /**
     * @return {?}
     */
    pause() {
        this.init();
        this._player.pause();
    }
    /**
     * @return {?}
     */
    finish() {
        this.init();
        this._onFinish();
        this._player.finish();
    }
    /**
     * @return {?}
     */
    reset() {
        this._resetDomPlayerState();
        this._destroyed = false;
        this._finished = false;
        this._started = false;
    }
    /**
     * @return {?}
     */
    _resetDomPlayerState() {
        if (this._player) {
            this._player.cancel();
        }
    }
    /**
     * @return {?}
     */
    restart() {
        this.reset();
        this.play();
    }
    /**
     * @return {?}
     */
    hasStarted() { return this._started; }
    /**
     * @return {?}
     */
    destroy() {
        if (!this._destroyed) {
            this._resetDomPlayerState();
            this._onFinish();
            this._destroyed = true;
        }
    }
    /**
     * @return {?}
     */
    get totalTime() { return this._duration; }
    /**
     * @param {?} p
     * @return {?}
     */
    setPosition(p) { this._player.currentTime = p * this.totalTime; }
    /**
     * @return {?}
     */
    getPosition() { return this._player.currentTime / this.totalTime; }
    /**
     * @return {?}
     */
    _captureStyles() {
        const /** @type {?} */ styles = {};
        if (this.hasStarted()) {
            Object.keys(this._finalKeyframe).forEach(prop => {
                if (prop != 'offset') {
                    styles[prop] =
                        this._finished ? this._finalKeyframe[prop] : _computeStyle(this.element, prop);
                }
            });
        }
        return styles;
    }
}
function WebAnimationsPlayer_tsickle_Closure_declarations() {
    /** @type {?} */
    WebAnimationsPlayer.prototype._onDoneFns;
    /** @type {?} */
    WebAnimationsPlayer.prototype._onStartFns;
    /** @type {?} */
    WebAnimationsPlayer.prototype._player;
    /** @type {?} */
    WebAnimationsPlayer.prototype._duration;
    /** @type {?} */
    WebAnimationsPlayer.prototype._initialized;
    /** @type {?} */
    WebAnimationsPlayer.prototype._finished;
    /** @type {?} */
    WebAnimationsPlayer.prototype._started;
    /** @type {?} */
    WebAnimationsPlayer.prototype._destroyed;
    /** @type {?} */
    WebAnimationsPlayer.prototype._finalKeyframe;
    /** @type {?} */
    WebAnimationsPlayer.prototype.parentPlayer;
    /** @type {?} */
    WebAnimationsPlayer.prototype.previousStyles;
    /** @type {?} */
    WebAnimationsPlayer.prototype.element;
    /** @type {?} */
    WebAnimationsPlayer.prototype.keyframes;
    /** @type {?} */
    WebAnimationsPlayer.prototype.options;
}
/**
 * @param {?} element
 * @param {?} prop
 * @return {?}
 */
function _computeStyle(element, prop) {
    return getDOM().getComputedStyle(element)[prop];
}
/**
 * @param {?} styles
 * @return {?}
 */
function _copyKeyframeStyles(styles) {
    const /** @type {?} */ newStyles = {};
    Object.keys(styles).forEach(prop => {
        if (prop != 'offset') {
            newStyles[prop] = styles[prop];
        }
    });
    return newStyles;
}
//# sourceMappingURL=web_animations_player.js.map