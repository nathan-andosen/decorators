"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Event emitter class to dispatch custom events
 *
 * @export
 * @class EventEmitter
 */
var EventEmitter = /** @class */ (function () {
    function EventEmitter(target, options) {
        this.target = target;
        this.options = options;
    }
    EventEmitter.prototype.emit = function (data) {
        var eventDetails = __assign({ detail: data }, this.options);
        var event = new CustomEvent(eventDetails.eventName, eventDetails);
        this.target.dispatchEvent(event);
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
/**
 * Event property decorator to easily emit events
 *
 *
 * @param {(string|IEventOptions)} [options]
 * @returns
 */
exports.event = function (options) {
    return function (target, propertyName) {
        /**
         * Convert camel case to kebab (myEvent becomes my-event)
         *
         * @param {*} string
         * @returns
         */
        var camelToKebab = function (string) {
            return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
                .toLowerCase();
        };
        // do not use arrow function for getter, as this is the instance of the
        // class
        var getter = function () {
            var eventOptions;
            if (typeof options === 'string') {
                eventOptions = { eventName: options };
            }
            else if (options) {
                eventOptions = options;
            }
            else {
                eventOptions = {};
            }
            if (!eventOptions.eventName) {
                eventOptions.eventName = camelToKebab(propertyName);
            }
            return new EventEmitter(this, eventOptions);
        };
        // do not use arrow function for setter, as this is the instance of the
        // class
        var setter = function (newVal) { };
        // delete the property and re-assign it
        if (delete target[propertyName]) {
            Object.defineProperty(target, propertyName, {
                get: getter,
                set: setter,
                enumerable: false,
                configurable: false
            });
        }
    };
};
