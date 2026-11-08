import { n as __esmMin, r as __exportAll } from "./rolldown-runtime-7_rZTKki.js";
//#region ../../node_modules/min-dash/dist/index.js
var dist_exports = __exportAll({
	assign: () => assign,
	bind: () => bind,
	debounce: () => debounce,
	ensureArray: () => ensureArray,
	every: () => every,
	filter: () => filter,
	find: () => find,
	findIndex: () => findIndex,
	flatten: () => flatten,
	forEach: () => forEach,
	get: () => get,
	groupBy: () => groupBy,
	has: () => has,
	isArray: () => isArray,
	isDefined: () => isDefined,
	isFunction: () => isFunction,
	isNil: () => isNil,
	isNumber: () => isNumber,
	isObject: () => isObject,
	isString: () => isString,
	isUndefined: () => isUndefined,
	keys: () => keys,
	map: () => map,
	matchPattern: () => matchPattern,
	merge: () => merge,
	omit: () => omit,
	pick: () => pick,
	reduce: () => reduce,
	set: () => set,
	size: () => size,
	some: () => some,
	sortBy: () => sortBy,
	throttle: () => throttle,
	unionBy: () => unionBy,
	uniqueBy: () => uniqueBy,
	values: () => values,
	without: () => without
});
function flatten(arr) {
	return Array.prototype.concat.apply([], arr);
}
function isUndefined(obj) {
	return obj === void 0;
}
function isDefined(obj) {
	return obj !== void 0;
}
function isNil(obj) {
	return obj == null;
}
function isArray(obj) {
	return nativeToString.call(obj) === "[object Array]";
}
function isObject(obj) {
	return nativeToString.call(obj) === "[object Object]";
}
function isNumber(obj) {
	return nativeToString.call(obj) === "[object Number]";
}
function isFunction(obj) {
	const tag = nativeToString.call(obj);
	return tag === "[object Function]" || tag === "[object AsyncFunction]" || tag === "[object GeneratorFunction]" || tag === "[object AsyncGeneratorFunction]" || tag === "[object Proxy]";
}
function isString(obj) {
	return nativeToString.call(obj) === "[object String]";
}
function ensureArray(obj) {
	if (isArray(obj)) return;
	throw new Error("must supply array");
}
function has(target, key) {
	return !isNil(target) && nativeHasOwnProperty.call(target, key);
}
function find(collection, matcher) {
	const matchFn = toMatcher(matcher);
	let match;
	forEach(collection, function(val, key) {
		if (matchFn(val, key)) {
			match = val;
			return false;
		}
	});
	return match;
}
function findIndex(collection, matcher) {
	const matchFn = toMatcher(matcher);
	let idx = isArray(collection) ? -1 : void 0;
	forEach(collection, function(val, key) {
		if (matchFn(val, key)) {
			idx = key;
			return false;
		}
	});
	return idx;
}
function filter(collection, matcher) {
	const matchFn = toMatcher(matcher);
	let result = [];
	forEach(collection, function(val, key) {
		if (matchFn(val, key)) result.push(val);
	});
	return result;
}
function forEach(collection, iterator) {
	let val, result;
	if (isUndefined(collection)) return;
	const convertKey = isArray(collection) ? toNum : identity;
	for (let key in collection) if (has(collection, key)) {
		val = collection[key];
		result = iterator(val, convertKey(key));
		if (result === false) return val;
	}
}
function without(arr, matcher) {
	if (isUndefined(arr)) return [];
	ensureArray(arr);
	const matchFn = toMatcher(matcher);
	return arr.filter(function(el, idx) {
		return !matchFn(el, idx);
	});
}
function reduce(collection, iterator, result) {
	forEach(collection, function(value, idx) {
		result = iterator(result, value, idx);
	});
	return result;
}
function every(collection, matcher) {
	return !!reduce(collection, function(matches, val, key) {
		return matches && matcher(val, key);
	}, true);
}
function some(collection, matcher) {
	return !!find(collection, matcher);
}
function map(collection, fn) {
	let result = [];
	forEach(collection, function(val, key) {
		result.push(fn(val, key));
	});
	return result;
}
function keys(collection) {
	return collection && Object.keys(collection) || [];
}
function size(collection) {
	return keys(collection).length;
}
function values(collection) {
	return map(collection, (val) => val);
}
function groupBy(collection, extractor, grouped = {}) {
	extractor = toExtractor(extractor);
	forEach(collection, function(val) {
		let discriminator = extractor(val) || "_";
		let group = grouped[discriminator];
		if (!group) group = grouped[discriminator] = [];
		group.push(val);
	});
	return grouped;
}
function uniqueBy(extractor, ...collections) {
	extractor = toExtractor(extractor);
	let grouped = {};
	forEach(collections, (c) => groupBy(c, extractor, grouped));
	return map(grouped, function(val, key) {
		return val[0];
	});
}
function sortBy(collection, extractor) {
	extractor = toExtractor(extractor);
	let sorted = [];
	forEach(collection, function(value, key) {
		let disc = extractor(value, key);
		let entry = {
			d: disc,
			v: value
		};
		for (var idx = 0; idx < sorted.length; idx++) {
			let { d } = sorted[idx];
			if (disc < d) {
				sorted.splice(idx, 0, entry);
				return;
			}
		}
		sorted.push(entry);
	});
	return map(sorted, (e) => e.v);
}
function matchPattern(pattern) {
	return function(el) {
		return every(pattern, function(val, key) {
			return el[key] === val;
		});
	};
}
function toExtractor(extractor) {
	return isFunction(extractor) ? extractor : (e) => {
		return e[extractor];
	};
}
function toMatcher(matcher) {
	return isFunction(matcher) ? matcher : (e) => {
		return e === matcher;
	};
}
function identity(arg) {
	return arg;
}
function toNum(arg) {
	return Number(arg);
}
function debounce(fn, timeout) {
	let timer;
	let lastArgs;
	let lastThis;
	let lastNow;
	function fire(force) {
		let now = Date.now();
		let scheduledDiff = force ? 0 : lastNow + timeout - now;
		if (scheduledDiff > 0) return schedule(scheduledDiff);
		fn.apply(lastThis, lastArgs);
		clear();
	}
	function schedule(timeout) {
		timer = setTimeout(fire, timeout);
	}
	function clear() {
		if (timer) clearTimeout(timer);
		timer = lastNow = lastArgs = lastThis = void 0;
	}
	function flush() {
		if (timer) fire(true);
		clear();
	}
	function callback(...args) {
		lastNow = Date.now();
		lastArgs = args;
		lastThis = this;
		if (!timer) schedule(timeout);
	}
	callback.flush = flush;
	callback.cancel = clear;
	return callback;
}
function throttle(fn, interval) {
	let throttling = false;
	return function(...args) {
		if (throttling) return;
		fn(...args);
		throttling = true;
		setTimeout(() => {
			throttling = false;
		}, interval);
	};
}
function bind(fn, target) {
	return fn.bind(target);
}
function assign(target, ...others) {
	return Object.assign(target, ...others);
}
function set(target, path, value) {
	let currentTarget = target;
	forEach(path, function(key, idx) {
		if (typeof key !== "number" && typeof key !== "string") throw new Error("illegal key type: " + typeof key + ". Key should be of type number or string.");
		if (key === "constructor") throw new Error("illegal key: constructor");
		if (key === "__proto__") throw new Error("illegal key: __proto__");
		let nextKey = path[idx + 1];
		let nextTarget = currentTarget[key];
		if (isDefined(nextKey) && isNil(nextTarget)) nextTarget = currentTarget[key] = isNaN(+nextKey) ? {} : [];
		if (isUndefined(nextKey)) {
			if (isUndefined(value)) delete currentTarget[key];
			else currentTarget[key] = value;
		} else currentTarget = nextTarget;
	});
	return target;
}
function get(target, path, defaultValue) {
	let currentTarget = target;
	forEach(path, function(key) {
		if (isNil(currentTarget)) {
			currentTarget = void 0;
			return false;
		}
		currentTarget = currentTarget[key];
	});
	return isUndefined(currentTarget) ? defaultValue : currentTarget;
}
function pick(target, properties) {
	let result = {};
	let obj = Object(target);
	forEach(properties, function(prop) {
		if (prop in obj) result[prop] = target[prop];
	});
	return result;
}
function omit(target, properties) {
	let result = {};
	forEach(Object(target), function(prop, key) {
		if (properties.indexOf(key) === -1) result[key] = prop;
	});
	return result;
}
function merge(target, ...sources) {
	if (!sources.length) return target;
	forEach(sources, function(source) {
		if (!source || !isObject(source)) return;
		forEach(source, function(sourceVal, key) {
			if (key === "__proto__") return;
			let targetVal = target[key];
			if (isObject(sourceVal)) {
				if (!isObject(targetVal)) targetVal = {};
				target[key] = merge(targetVal, sourceVal);
			} else target[key] = sourceVal;
		});
	});
	return target;
}
var nativeToString, nativeHasOwnProperty, unionBy;
var init_dist = __esmMin((() => {
	nativeToString = Object.prototype.toString;
	nativeHasOwnProperty = Object.prototype.hasOwnProperty;
	unionBy = uniqueBy;
}));
//#endregion
//#region ../../node_modules/domify/index.js
var wrapMap = {
	legend: [
		1,
		"<fieldset>",
		"</fieldset>"
	],
	tr: [
		2,
		"<table><tbody>",
		"</tbody></table>"
	],
	col: [
		2,
		"<table><tbody></tbody><colgroup>",
		"</colgroup></table>"
	],
	_default: [
		0,
		"",
		""
	]
};
wrapMap.td = wrapMap.th = [
	3,
	"<table><tbody><tr>",
	"</tr></tbody></table>"
];
wrapMap.option = wrapMap.optgroup = [
	1,
	"<select multiple=\"multiple\">",
	"</select>"
];
wrapMap.thead = wrapMap.tbody = wrapMap.colgroup = wrapMap.caption = wrapMap.tfoot = [
	1,
	"<table>",
	"</table>"
];
wrapMap.polyline = wrapMap.ellipse = wrapMap.polygon = wrapMap.circle = wrapMap.text = wrapMap.line = wrapMap.path = wrapMap.rect = wrapMap.g = [
	1,
	"<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">",
	"</svg>"
];
function domify(htmlString, document = globalThis.document) {
	if (typeof htmlString !== "string") throw new TypeError("String expected");
	const commentMatch = /^<!--(.*?)-->$/s.exec(htmlString);
	if (commentMatch) return document.createComment(commentMatch[1]);
	const tagName = /<([\w:]+)/.exec(htmlString)?.[1];
	if (!tagName) return document.createTextNode(htmlString);
	htmlString = htmlString.trim();
	if (tagName === "body") {
		const element = document.createElement("html");
		element.innerHTML = htmlString;
		const { lastChild } = element;
		lastChild.remove();
		return lastChild;
	}
	let [depth, prefix, suffix] = Object.hasOwn(wrapMap, tagName) ? wrapMap[tagName] : wrapMap._default;
	let element = document.createElement("div");
	element.innerHTML = prefix + htmlString + suffix;
	while (depth--) element = element.lastChild;
	if (element.firstChild === element.lastChild) {
		const { firstChild } = element;
		firstChild.remove();
		return firstChild;
	}
	const fragment = document.createDocumentFragment();
	fragment.append(...element.childNodes);
	return fragment;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/util/EscapeUtil.js
function escapeCSS(str) {
	return CSS.escape(str);
}
var HTML_ESCAPE_MAP = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
function escapeHTML(str) {
	str = "" + str;
	return str && str.replace(/[&<>"']/g, function(match) {
		return HTML_ESCAPE_MAP[match];
	});
}
//#endregion
export { pick as A, without as B, isObject as C, map as D, keys as E, sortBy as F, throttle as I, unionBy as L, set as M, size as N, matchPattern as O, some as P, uniqueBy as R, isNumber as S, isUndefined as T, init_dist as _, bind as a, isFunction as b, every as c, findIndex as d, flatten as f, has as g, groupBy as h, assign as i, reduce as j, omit as k, filter as l, get as m, escapeHTML as n, debounce as o, forEach as p, domify as r, dist_exports as s, escapeCSS as t, find as u, isArray as v, isString as w, isNil as x, isDefined as y, values as z };

//# sourceMappingURL=EscapeUtil-3RypN4fl.js.map