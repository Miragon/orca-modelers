import { n as __esmMin, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { T as isUndefined, _ as init_dist, w as isString, x as isNil } from "./EscapeUtil-B1jzPlMc.js";
// ../../node_modules/semver-compare/index.js
var require_semver_compare = __commonJSMin(((exports, module) => {
	module.exports = function cmp(a, b) {
		var pa = a.split(".");
		var pb = b.split(".");
		for (var i = 0; i < 3; i++) {
			var na = Number(pa[i]);
			var nb = Number(pb[i]);
			if (na > nb) return 1;
			if (nb > na) return -1;
			if (!isNaN(na) && isNaN(nb)) return 1;
			if (isNaN(na) && !isNaN(nb)) return -1;
		}
		return 0;
	};
}));
// ../../node_modules/@bpmn-io/moddle-utils/index.js
var moddle_utils_exports = __exportAll({
	getPath: () => getPath,
	pathConcat: () => pathConcat,
	pathEquals: () => pathEquals,
	pathParse: () => pathParse,
	pathStringify: () => pathStringify
});
function getPath(moddleElement, parentModdleElement) {
	if (!moddleElement) return null;
	if (moddleElement === parentModdleElement) return [];
	let path = [], parent;
	do {
		parent = moddleElement.$parent;
		if (!parent) {
			if (moddleElement.$instanceOf("bpmn:Definitions")) break;
			else return null;
		}
		path = [...getPropertyName(moddleElement, parent), ...path];
		moddleElement = parent;
		if (parentModdleElement && moddleElement === parentModdleElement) break;
	} while (parent);
	return path;
}
function getPropertyName(moddleElement, parentModdleElement) {
	for (let property of Object.values(parentModdleElement.$descriptor.propertiesByName)) if (property.isMany) {
		if (parentModdleElement.get(property.name).includes(moddleElement)) return [property.name, parentModdleElement.get(property.name).indexOf(moddleElement)];
	} else if (parentModdleElement.get(property.name) === moddleElement) return [property.name];
	return [];
}
function pathConcat(...paths) {
	let concatenatedPaths = [];
	for (let path of paths) {
		if (isNil(path) || isUndefined(path)) return null;
		if (isString(path)) path = [path];
		concatenatedPaths = concatenatedPaths.concat(path);
	}
	return concatenatedPaths;
}
function pathEquals(a, b, separator = ".") {
	if (isNil(a) || isUndefined(a) || isNil(b) || isUndefined(b)) return false;
	if (!isString(a)) a = pathStringify(a, separator);
	if (!isString(b)) b = pathStringify(b, separator);
	return a === b;
}
function pathParse(path, separator = ".") {
	if (isNil(path) || isUndefined(path)) return null;
	return path.split(separator).map((string) => isNaN(string) ? string : parseInt(string));
}
function pathStringify(path, separator = ".") {
	if (isNil(path) || isUndefined(path)) return null;
	return path.join(separator);
}
var init_moddle_utils = __esmMin((() => {
	init_dist();
}));
export { require_semver_compare as i, moddle_utils_exports as n, pathEquals as r, init_moddle_utils as t };

//# sourceMappingURL=moddle-utils-CKD1iZGs.js.map