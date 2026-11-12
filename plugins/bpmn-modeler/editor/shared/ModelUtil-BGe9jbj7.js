import { n as __esmMin, r as __exportAll } from "./rolldown-runtime-DQp2zzRu.js";
import { P as some, _ as init_dist } from "./EscapeUtil-B1jzPlMc.js";
// ../../node_modules/bpmn-js/lib/util/ModelUtil.js
var ModelUtil_exports = __exportAll({
	getBusinessObject: () => getBusinessObject,
	getDi: () => getDi,
	is: () => is,
	isAny: () => isAny
});
function is(element, type) {
	var bo = getBusinessObject(element);
	return bo && typeof bo.$instanceOf === "function" && bo.$instanceOf(type);
}
function isAny(element, types) {
	return some(types, function(t) {
		return is(element, t);
	});
}
function getBusinessObject(element) {
	return element && element.businessObject || element;
}
function getDi(element) {
	return element && element.di;
}
var init_ModelUtil = __esmMin((() => {
	init_dist();
}));
export { is as a, init_ModelUtil as i, getBusinessObject as n, isAny as o, getDi as r, ModelUtil_exports as t };

//# sourceMappingURL=ModelUtil-BGe9jbj7.js.map