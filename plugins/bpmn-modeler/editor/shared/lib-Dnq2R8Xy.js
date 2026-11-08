import { w as createReviver } from "./reporting-DDWAsQPl.js";
//#region ../../node_modules/bpmn-js-create-append-anything/dist/index.es.js
var nativeToString$2 = Object.prototype.toString;
var nativeHasOwnProperty$2 = Object.prototype.hasOwnProperty;
function isUndefined$2(obj) {
	return obj === void 0;
}
function isNil$2(obj) {
	return obj == null;
}
function isArray$2(obj) {
	return nativeToString$2.call(obj) === "[object Array]";
}
function isFunction$2(obj) {
	const tag = nativeToString$2.call(obj);
	return tag === "[object Function]" || tag === "[object AsyncFunction]" || tag === "[object GeneratorFunction]" || tag === "[object AsyncGeneratorFunction]" || tag === "[object Proxy]";
}
function has$2(target, key) {
	return !isNil$2(target) && nativeHasOwnProperty$2.call(target, key);
}
function find$1(collection, matcher) {
	const matchFn = toMatcher$1(matcher);
	let match;
	forEach$2(collection, function(val, key) {
		if (matchFn(val, key)) {
			match = val;
			return false;
		}
	});
	return match;
}
function forEach$2(collection, iterator) {
	let val, result;
	if (isUndefined$2(collection)) return;
	const convertKey = isArray$2(collection) ? toNum$2 : identity$2;
	for (let key in collection) if (has$2(collection, key)) {
		val = collection[key];
		result = iterator(val, convertKey(key));
		if (result === false) return val;
	}
}
function toMatcher$1(matcher) {
	return isFunction$2(matcher) ? matcher : (e) => {
		return e === matcher;
	};
}
function identity$2(arg) {
	return arg;
}
function toNum$2(arg) {
	return Number(arg);
}
function assign(target, ...others) {
	return Object.assign(target, ...others);
}
var componentEvent = {};
var hasRequiredComponentEvent;
function requireComponentEvent() {
	if (hasRequiredComponentEvent) return componentEvent;
	hasRequiredComponentEvent = 1;
	var bind, unbind, prefix;
	function detect() {
		bind = window.addEventListener ? "addEventListener" : "attachEvent";
		unbind = window.removeEventListener ? "removeEventListener" : "detachEvent";
		prefix = bind !== "addEventListener" ? "on" : "";
	}
	componentEvent.bind = function(el, type, fn, capture) {
		if (!bind) detect();
		el[bind](prefix + type, fn, capture || false);
		return fn;
	};
	componentEvent.unbind = function(el, type, fn, capture) {
		if (!unbind) detect();
		el[unbind](prefix + type, fn, capture || false);
		return fn;
	};
	return componentEvent;
}
requireComponentEvent();
function query(selector, el) {
	el = el || document;
	return el.querySelector(selector);
}
var nativeToString$1 = Object.prototype.toString;
var nativeHasOwnProperty$1 = Object.prototype.hasOwnProperty;
function isUndefined$1(obj) {
	return obj === void 0;
}
function isNil$1(obj) {
	return obj == null;
}
function isArray$1(obj) {
	return nativeToString$1.call(obj) === "[object Array]";
}
function isObject(obj) {
	return nativeToString$1.call(obj) === "[object Object]";
}
function isNumber(obj) {
	return nativeToString$1.call(obj) === "[object Number]";
}
function isFunction$1(obj) {
	const tag = nativeToString$1.call(obj);
	return tag === "[object Function]" || tag === "[object AsyncFunction]" || tag === "[object GeneratorFunction]" || tag === "[object AsyncGeneratorFunction]" || tag === "[object Proxy]";
}
function has$1(target, key) {
	return !isNil$1(target) && nativeHasOwnProperty$1.call(target, key);
}
function forEach$1(collection, iterator) {
	let val, result;
	if (isUndefined$1(collection)) return;
	const convertKey = isArray$1(collection) ? toNum$1 : identity$1;
	for (let key in collection) if (has$1(collection, key)) {
		val = collection[key];
		result = iterator(val, convertKey(key));
		if (result === false) return val;
	}
}
function identity$1(arg) {
	return arg;
}
function toNum$1(arg) {
	return Number(arg);
}
var KEYS_COPY = ["c", "C"];
var KEYS_PASTE = ["v", "V"];
var KEYS_DUPLICATE = ["d", "D"];
var KEYS_CUT = ["x", "X"];
var KEYS_REDO = ["y", "Y"];
var KEYS_UNDO = ["z", "Z"];
function isCmd(event) {
	if (event.altKey) return false;
	return event.ctrlKey || event.metaKey;
}
function isKey(keys, event) {
	keys = isArray$1(keys) ? keys : [keys];
	return keys.indexOf(event.key) !== -1 || keys.indexOf(event.code) !== -1;
}
function isShift(event) {
	return event.shiftKey;
}
function isCopy(event) {
	return isCmd(event) && isKey(KEYS_COPY, event);
}
function isPaste(event) {
	return isCmd(event) && isKey(KEYS_PASTE, event);
}
function isDuplicate(event) {
	return isCmd(event) && isKey(KEYS_DUPLICATE, event);
}
function isCut(event) {
	return isCmd(event) && isKey(KEYS_CUT, event);
}
function isUndo(event) {
	return isCmd(event) && !isShift(event) && isKey(KEYS_UNDO, event);
}
function isRedo(event) {
	return isCmd(event) && (isKey(KEYS_REDO, event) || isKey(KEYS_UNDO, event) && isShift(event));
}
function isLabel(value) {
	return isObject(value) && has$1(value, "labelTarget");
}
var nativeToString = Object.prototype.toString;
var nativeHasOwnProperty = Object.prototype.hasOwnProperty;
function isUndefined(obj) {
	return obj === void 0;
}
function isNil(obj) {
	return obj == null;
}
function isArray(obj) {
	return nativeToString.call(obj) === "[object Array]";
}
function isFunction(obj) {
	const tag = nativeToString.call(obj);
	return tag === "[object Function]" || tag === "[object AsyncFunction]" || tag === "[object GeneratorFunction]" || tag === "[object AsyncGeneratorFunction]" || tag === "[object Proxy]";
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
function some(collection, matcher) {
	return !!find(collection, matcher);
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
function isExpanded(element, di) {
	if (is(element, "bpmn:CallActivity")) return false;
	if (is(element, "bpmn:SubProcess")) {
		di = di || getDi(element);
		if (di && is(di, "bpmndi:BPMNPlane")) return true;
		return di && !!di.isExpanded;
	}
	if (is(element, "bpmn:Participant")) return !!getBusinessObject(element).processRef;
	return true;
}
function isDifferentType(element) {
	return function(entry) {
		var target = entry.target;
		var businessObject = getBusinessObject(element), eventDefinition = businessObject.eventDefinitions && businessObject.eventDefinitions[0];
		var isTypeEqual = businessObject.$type === target.type;
		var isEventDefinitionEqual = (eventDefinition && eventDefinition.$type) === target.eventDefinitionType;
		var isTriggeredByEventEqual = !!target.triggeredByEvent === !!businessObject.triggeredByEvent;
		var isExpandedEqual = target.isExpanded === void 0 || target.isExpanded === isExpanded(element);
		return !isTypeEqual || !isEventDefinitionEqual || !isTriggeredByEventEqual || !isExpandedEqual;
	};
}
var PopupEntries = {
	"task": {
		label: "Task",
		className: "bpmn-icon-task",
		target: { type: "bpmn:Task" }
	},
	"user-task": {
		label: "User task",
		className: "bpmn-icon-user",
		target: { type: "bpmn:UserTask" }
	},
	"service-task": {
		label: "Service task",
		className: "bpmn-icon-service",
		target: { type: "bpmn:ServiceTask" }
	},
	"send-task": {
		label: "Send task",
		className: "bpmn-icon-send",
		target: { type: "bpmn:SendTask" }
	},
	"receive-task": {
		label: "Receive task",
		className: "bpmn-icon-receive",
		target: { type: "bpmn:ReceiveTask" }
	},
	"manual-task": {
		label: "Manual task",
		className: "bpmn-icon-manual",
		target: { type: "bpmn:ManualTask" }
	},
	"rule-task": {
		label: "Business rule task",
		className: "bpmn-icon-business-rule",
		target: { type: "bpmn:BusinessRuleTask" }
	},
	"script-task": {
		label: "Script task",
		className: "bpmn-icon-script",
		target: { type: "bpmn:ScriptTask" }
	},
	"call-activity": {
		label: "Call activity",
		className: "bpmn-icon-call-activity",
		target: { type: "bpmn:CallActivity" }
	},
	"transaction": {
		label: "Transaction",
		className: "bpmn-icon-transaction",
		target: {
			type: "bpmn:Transaction",
			isExpanded: true
		}
	},
	"event-subprocess": {
		label: "Event sub-process",
		className: "bpmn-icon-event-subprocess-expanded",
		target: {
			type: "bpmn:SubProcess",
			triggeredByEvent: true,
			isExpanded: true
		}
	},
	"collapsed-subprocess": {
		label: "Sub-process (collapsed)",
		className: "bpmn-icon-subprocess-collapsed",
		target: {
			type: "bpmn:SubProcess",
			isExpanded: false
		}
	},
	"expanded-subprocess": {
		label: "Sub-process (expanded)",
		className: "bpmn-icon-subprocess-expanded",
		target: {
			type: "bpmn:SubProcess",
			isExpanded: true
		}
	},
	"collapsed-ad-hoc-subprocess": {
		label: "Ad-hoc sub-process (collapsed)",
		className: "bpmn-icon-subprocess-collapsed",
		target: {
			type: "bpmn:AdHocSubProcess",
			isExpanded: false
		}
	},
	"expanded-ad-hoc-subprocess": {
		label: "Ad-hoc sub-process (expanded)",
		className: "bpmn-icon-subprocess-expanded",
		target: {
			type: "bpmn:AdHocSubProcess",
			isExpanded: true
		}
	},
	"exclusive-gateway": {
		label: "Exclusive gateway",
		className: "bpmn-icon-gateway-xor",
		target: { type: "bpmn:ExclusiveGateway" }
	},
	"parallel-gateway": {
		label: "Parallel gateway",
		className: "bpmn-icon-gateway-parallel",
		target: { type: "bpmn:ParallelGateway" }
	},
	"inclusive-gateway": {
		label: "Inclusive gateway",
		className: "bpmn-icon-gateway-or",
		target: { type: "bpmn:InclusiveGateway" }
	},
	"complex-gateway": {
		label: "Complex gateway",
		className: "bpmn-icon-gateway-complex",
		target: { type: "bpmn:ComplexGateway" }
	},
	"event-based-gateway": {
		label: "Event-based gateway",
		className: "bpmn-icon-gateway-eventbased",
		target: {
			type: "bpmn:EventBasedGateway",
			instantiate: false,
			eventGatewayType: "Exclusive"
		}
	},
	"data-store-reference": {
		label: "Data store reference",
		className: "bpmn-icon-data-store",
		target: { type: "bpmn:DataStoreReference" }
	},
	"data-object-reference": {
		label: "Data object reference",
		className: "bpmn-icon-data-object",
		target: { type: "bpmn:DataObjectReference" }
	},
	"expanded-pool": {
		label: "Expanded pool/participant",
		className: "bpmn-icon-participant",
		target: {
			type: "bpmn:Participant",
			isExpanded: true
		}
	},
	"collapsed-pool": {
		label: "Empty pool/participant",
		className: "bpmn-icon-lane",
		target: {
			type: "bpmn:Participant",
			isExpanded: false
		}
	},
	"none-start-event": {
		label: "Start event",
		className: "bpmn-icon-start-event-none",
		target: { type: "bpmn:StartEvent" }
	},
	"none-intermediate-throwing": {
		label: "Intermediate throw event",
		className: "bpmn-icon-intermediate-event-none",
		target: { type: "bpmn:IntermediateThrowEvent" }
	},
	"none-boundary-event": {
		label: "Boundary event",
		className: "bpmn-icon-intermediate-event-none",
		target: { type: "bpmn:BoundaryEvent" }
	},
	"none-end-event": {
		label: "End event",
		className: "bpmn-icon-end-event-none",
		target: { type: "bpmn:EndEvent" }
	},
	"message-start": {
		label: "Message start event",
		className: "bpmn-icon-start-event-message",
		target: {
			type: "bpmn:StartEvent",
			eventDefinitionType: "bpmn:MessageEventDefinition",
			isInterrupting: true
		}
	},
	"timer-start": {
		label: "Timer start event",
		className: "bpmn-icon-start-event-timer",
		target: {
			type: "bpmn:StartEvent",
			eventDefinitionType: "bpmn:TimerEventDefinition",
			isInterrupting: true
		}
	},
	"conditional-start": {
		label: "Conditional start event",
		className: "bpmn-icon-start-event-condition",
		target: {
			type: "bpmn:StartEvent",
			eventDefinitionType: "bpmn:ConditionalEventDefinition",
			isInterrupting: true
		}
	},
	"signal-start": {
		label: "Signal start event",
		className: "bpmn-icon-start-event-signal",
		target: {
			type: "bpmn:StartEvent",
			eventDefinitionType: "bpmn:SignalEventDefinition",
			isInterrupting: true
		}
	},
	"error-start": {
		label: "Error start event",
		className: "bpmn-icon-start-event-error",
		target: {
			type: "bpmn:StartEvent",
			eventDefinitionType: "bpmn:ErrorEventDefinition",
			isInterrupting: true
		}
	},
	"escalation-start": {
		label: "Escalation start event",
		className: "bpmn-icon-start-event-escalation",
		target: {
			type: "bpmn:StartEvent",
			eventDefinitionType: "bpmn:EscalationEventDefinition",
			isInterrupting: true
		}
	},
	"compensation-start": {
		label: "Compensation start event",
		className: "bpmn-icon-start-event-compensation",
		target: {
			type: "bpmn:StartEvent",
			eventDefinitionType: "bpmn:CompensateEventDefinition",
			isInterrupting: true
		}
	},
	"non-interrupting-message-start": {
		label: "Message start event (non-interrupting)",
		className: "bpmn-icon-start-event-non-interrupting-message",
		target: {
			type: "bpmn:StartEvent",
			eventDefinitionType: "bpmn:MessageEventDefinition",
			isInterrupting: false
		}
	},
	"non-interrupting-timer-start": {
		label: "Timer start event (non-interrupting)",
		className: "bpmn-icon-start-event-non-interrupting-timer",
		target: {
			type: "bpmn:StartEvent",
			eventDefinitionType: "bpmn:TimerEventDefinition",
			isInterrupting: false
		}
	},
	"non-interrupting-conditional-start": {
		label: "Conditional start event (non-interrupting)",
		className: "bpmn-icon-start-event-non-interrupting-condition",
		target: {
			type: "bpmn:StartEvent",
			eventDefinitionType: "bpmn:ConditionalEventDefinition",
			isInterrupting: false
		}
	},
	"non-interrupting-signal-start": {
		label: "Signal start event (non-interrupting)",
		className: "bpmn-icon-start-event-non-interrupting-signal",
		target: {
			type: "bpmn:StartEvent",
			eventDefinitionType: "bpmn:SignalEventDefinition",
			isInterrupting: false
		}
	},
	"non-interrupting-escalation-start": {
		label: "Escalation start event (non-interrupting)",
		className: "bpmn-icon-start-event-non-interrupting-escalation",
		target: {
			type: "bpmn:StartEvent",
			eventDefinitionType: "bpmn:EscalationEventDefinition",
			isInterrupting: false
		}
	},
	"message-intermediate-catch": {
		label: "Message intermediate catch event",
		className: "bpmn-icon-intermediate-event-catch-message",
		target: {
			type: "bpmn:IntermediateCatchEvent",
			eventDefinitionType: "bpmn:MessageEventDefinition"
		}
	},
	"message-intermediate-throw": {
		label: "Message intermediate throw event",
		className: "bpmn-icon-intermediate-event-throw-message",
		target: {
			type: "bpmn:IntermediateThrowEvent",
			eventDefinitionType: "bpmn:MessageEventDefinition"
		}
	},
	"timer-intermediate-catch": {
		label: "Timer intermediate catch event",
		className: "bpmn-icon-intermediate-event-catch-timer",
		target: {
			type: "bpmn:IntermediateCatchEvent",
			eventDefinitionType: "bpmn:TimerEventDefinition"
		}
	},
	"escalation-intermediate-throw": {
		label: "Escalation intermediate throw event",
		className: "bpmn-icon-intermediate-event-throw-escalation",
		target: {
			type: "bpmn:IntermediateThrowEvent",
			eventDefinitionType: "bpmn:EscalationEventDefinition"
		}
	},
	"conditional-intermediate-catch": {
		label: "Conditional intermediate catch event",
		className: "bpmn-icon-intermediate-event-catch-condition",
		target: {
			type: "bpmn:IntermediateCatchEvent",
			eventDefinitionType: "bpmn:ConditionalEventDefinition"
		}
	},
	"link-intermediate-catch": {
		label: "Link intermediate catch event",
		className: "bpmn-icon-intermediate-event-catch-link",
		target: {
			type: "bpmn:IntermediateCatchEvent",
			eventDefinitionType: "bpmn:LinkEventDefinition",
			eventDefinitionAttrs: { name: "" }
		}
	},
	"link-intermediate-throw": {
		label: "Link intermediate throw event",
		className: "bpmn-icon-intermediate-event-throw-link",
		target: {
			type: "bpmn:IntermediateThrowEvent",
			eventDefinitionType: "bpmn:LinkEventDefinition",
			eventDefinitionAttrs: { name: "" }
		}
	},
	"compensation-intermediate-throw": {
		label: "Compensation intermediate throw event",
		className: "bpmn-icon-intermediate-event-throw-compensation",
		target: {
			type: "bpmn:IntermediateThrowEvent",
			eventDefinitionType: "bpmn:CompensateEventDefinition"
		}
	},
	"signal-intermediate-catch": {
		label: "Signal intermediate catch event",
		className: "bpmn-icon-intermediate-event-catch-signal",
		target: {
			type: "bpmn:IntermediateCatchEvent",
			eventDefinitionType: "bpmn:SignalEventDefinition"
		}
	},
	"signal-intermediate-throw": {
		label: "Signal intermediate throw event",
		className: "bpmn-icon-intermediate-event-throw-signal",
		target: {
			type: "bpmn:IntermediateThrowEvent",
			eventDefinitionType: "bpmn:SignalEventDefinition"
		}
	},
	"message-boundary": {
		label: "Message boundary event",
		className: "bpmn-icon-intermediate-event-catch-message",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:MessageEventDefinition",
			cancelActivity: true
		}
	},
	"timer-boundary": {
		label: "Timer boundary event",
		className: "bpmn-icon-intermediate-event-catch-timer",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:TimerEventDefinition",
			cancelActivity: true
		}
	},
	"escalation-boundary": {
		label: "Escalation boundary event",
		className: "bpmn-icon-intermediate-event-catch-escalation",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:EscalationEventDefinition",
			cancelActivity: true
		}
	},
	"conditional-boundary": {
		label: "Conditional boundary event",
		className: "bpmn-icon-intermediate-event-catch-condition",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:ConditionalEventDefinition",
			cancelActivity: true
		}
	},
	"error-boundary": {
		label: "Error boundary event",
		className: "bpmn-icon-intermediate-event-catch-error",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:ErrorEventDefinition",
			cancelActivity: true
		}
	},
	"cancel-boundary": {
		label: "Cancel boundary event",
		className: "bpmn-icon-intermediate-event-catch-cancel",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:CancelEventDefinition",
			cancelActivity: true
		}
	},
	"signal-boundary": {
		label: "Signal boundary event",
		className: "bpmn-icon-intermediate-event-catch-signal",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:SignalEventDefinition",
			cancelActivity: true
		}
	},
	"compensation-boundary": {
		label: "Compensation boundary event",
		className: "bpmn-icon-intermediate-event-catch-compensation",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:CompensateEventDefinition",
			cancelActivity: true
		}
	},
	"non-interrupting-message-boundary": {
		label: "Message boundary event (non-interrupting)",
		className: "bpmn-icon-intermediate-event-catch-non-interrupting-message",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:MessageEventDefinition",
			cancelActivity: false
		}
	},
	"non-interrupting-timer-boundary": {
		label: "Timer boundary event (non-interrupting)",
		className: "bpmn-icon-intermediate-event-catch-non-interrupting-timer",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:TimerEventDefinition",
			cancelActivity: false
		}
	},
	"non-interrupting-escalation-boundary": {
		label: "Escalation boundary event (non-interrupting)",
		className: "bpmn-icon-intermediate-event-catch-non-interrupting-escalation",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:EscalationEventDefinition",
			cancelActivity: false
		}
	},
	"non-interrupting-conditional-boundary": {
		label: "Conditional boundary event (non-interrupting)",
		className: "bpmn-icon-intermediate-event-catch-non-interrupting-condition",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:ConditionalEventDefinition",
			cancelActivity: false
		}
	},
	"non-interrupting-signal-boundary": {
		label: "Signal boundary event (non-interrupting)",
		className: "bpmn-icon-intermediate-event-catch-non-interrupting-signal",
		target: {
			type: "bpmn:BoundaryEvent",
			eventDefinitionType: "bpmn:SignalEventDefinition",
			cancelActivity: false
		}
	},
	"message-end": {
		label: "Message end event",
		className: "bpmn-icon-end-event-message",
		target: {
			type: "bpmn:EndEvent",
			eventDefinitionType: "bpmn:MessageEventDefinition"
		}
	},
	"escalation-end": {
		label: "Escalation end event",
		className: "bpmn-icon-end-event-escalation",
		target: {
			type: "bpmn:EndEvent",
			eventDefinitionType: "bpmn:EscalationEventDefinition"
		}
	},
	"error-end": {
		label: "Error end event",
		className: "bpmn-icon-end-event-error",
		target: {
			type: "bpmn:EndEvent",
			eventDefinitionType: "bpmn:ErrorEventDefinition"
		}
	},
	"cancel-end": {
		label: "Cancel end event",
		className: "bpmn-icon-end-event-cancel",
		target: {
			type: "bpmn:EndEvent",
			eventDefinitionType: "bpmn:CancelEventDefinition"
		}
	},
	"compensation-end": {
		label: "Compensation end event",
		className: "bpmn-icon-end-event-compensation",
		target: {
			type: "bpmn:EndEvent",
			eventDefinitionType: "bpmn:CompensateEventDefinition"
		}
	},
	"signal-end": {
		label: "Signal end event",
		className: "bpmn-icon-end-event-signal",
		target: {
			type: "bpmn:EndEvent",
			eventDefinitionType: "bpmn:SignalEventDefinition"
		}
	},
	"terminate-end": {
		label: "Terminate end event",
		className: "bpmn-icon-end-event-terminate",
		target: {
			type: "bpmn:EndEvent",
			eventDefinitionType: "bpmn:TerminateEventDefinition"
		}
	}
};
function replaceWith(id, extra = {}) {
	var entry = PopupEntries[id];
	if (!entry) throw new Error("unknown popup entry <" + id + ">");
	return {
		...entry,
		actionName: "replace-with-" + id,
		...extra
	};
}
var START_EVENT = [
	replaceWith("none-start-event", { actionName: "replace-with-none-start" }),
	replaceWith("none-intermediate-throwing"),
	replaceWith("none-end-event", { actionName: "replace-with-none-end" }),
	replaceWith("message-start"),
	replaceWith("timer-start"),
	replaceWith("conditional-start"),
	replaceWith("signal-start")
];
var START_EVENT_SUB_PROCESS = [
	replaceWith("none-start-event", { actionName: "replace-with-none-start" }),
	replaceWith("none-intermediate-throwing"),
	replaceWith("none-end-event", { actionName: "replace-with-none-end" })
];
var INTERMEDIATE_EVENT = [
	replaceWith("none-start-event", { actionName: "replace-with-none-start" }),
	replaceWith("none-intermediate-throwing", { actionName: "replace-with-none-intermediate-throw" }),
	replaceWith("none-end-event", { actionName: "replace-with-none-end" }),
	replaceWith("message-intermediate-catch"),
	replaceWith("message-intermediate-throw"),
	replaceWith("timer-intermediate-catch"),
	replaceWith("escalation-intermediate-throw"),
	replaceWith("conditional-intermediate-catch"),
	replaceWith("link-intermediate-catch"),
	replaceWith("link-intermediate-throw"),
	replaceWith("compensation-intermediate-throw"),
	replaceWith("signal-intermediate-catch"),
	replaceWith("signal-intermediate-throw")
];
var END_EVENT = [
	replaceWith("none-start-event", { actionName: "replace-with-none-start" }),
	replaceWith("none-intermediate-throwing", { actionName: "replace-with-none-intermediate-throw" }),
	replaceWith("none-end-event", { actionName: "replace-with-none-end" }),
	replaceWith("message-end"),
	replaceWith("escalation-end"),
	replaceWith("error-end"),
	replaceWith("cancel-end"),
	replaceWith("compensation-end"),
	replaceWith("signal-end"),
	replaceWith("terminate-end")
];
var GATEWAY$1 = [
	replaceWith("exclusive-gateway"),
	replaceWith("parallel-gateway"),
	replaceWith("inclusive-gateway"),
	replaceWith("complex-gateway"),
	replaceWith("event-based-gateway")
];
var SUBPROCESS_EXPANDED = [
	replaceWith("transaction"),
	replaceWith("event-subprocess"),
	replaceWith("expanded-ad-hoc-subprocess", {
		actionName: "replace-with-ad-hoc-subprocess",
		label: "Ad-hoc sub-process"
	}),
	replaceWith("collapsed-subprocess")
];
var AD_HOC_SUBPROCESS_EXPANDED = [
	replaceWith("expanded-subprocess", {
		actionName: "replace-with-subprocess",
		label: "Sub-process"
	}),
	replaceWith("transaction"),
	replaceWith("event-subprocess"),
	replaceWith("collapsed-ad-hoc-subprocess")
];
var TRANSACTION = [
	replaceWith("transaction"),
	replaceWith("expanded-subprocess", {
		actionName: "replace-with-subprocess",
		label: "Sub-process"
	}),
	replaceWith("expanded-ad-hoc-subprocess", {
		actionName: "replace-with-ad-hoc-subprocess",
		label: "Ad-hoc sub-process"
	}),
	replaceWith("event-subprocess")
];
var EVENT_SUB_PROCESS = TRANSACTION;
var TASK$1 = [
	replaceWith("task"),
	replaceWith("user-task"),
	replaceWith("service-task"),
	replaceWith("send-task"),
	replaceWith("receive-task"),
	replaceWith("manual-task"),
	replaceWith("rule-task"),
	replaceWith("script-task"),
	replaceWith("call-activity"),
	replaceWith("collapsed-subprocess"),
	replaceWith("expanded-subprocess"),
	replaceWith("collapsed-ad-hoc-subprocess"),
	replaceWith("expanded-ad-hoc-subprocess", { actionName: "replace-with-ad-hoc-subprocess" })
];
var DATA_OBJECT_REFERENCE = [replaceWith("data-store-reference")];
var DATA_STORE_REFERENCE = [replaceWith("data-object-reference")];
var BOUNDARY_EVENT = [
	replaceWith("message-boundary"),
	replaceWith("timer-boundary"),
	replaceWith("escalation-boundary"),
	replaceWith("conditional-boundary"),
	replaceWith("error-boundary"),
	replaceWith("cancel-boundary"),
	replaceWith("signal-boundary"),
	replaceWith("compensation-boundary"),
	replaceWith("non-interrupting-message-boundary"),
	replaceWith("non-interrupting-timer-boundary"),
	replaceWith("non-interrupting-escalation-boundary"),
	replaceWith("non-interrupting-conditional-boundary"),
	replaceWith("non-interrupting-signal-boundary")
];
var EVENT_SUB_PROCESS_START_EVENT = [
	replaceWith("message-start"),
	replaceWith("timer-start"),
	replaceWith("conditional-start"),
	replaceWith("signal-start"),
	replaceWith("error-start"),
	replaceWith("escalation-start"),
	replaceWith("compensation-start"),
	replaceWith("non-interrupting-message-start"),
	replaceWith("non-interrupting-timer-start"),
	replaceWith("non-interrupting-conditional-start"),
	replaceWith("non-interrupting-signal-start"),
	replaceWith("non-interrupting-escalation-start")
];
var SEQUENCE_FLOW = [
	{
		label: "Sequence flow",
		actionName: "replace-with-sequence-flow",
		className: "bpmn-icon-connection"
	},
	{
		label: "Default flow",
		actionName: "replace-with-default-flow",
		className: "bpmn-icon-default-flow"
	},
	{
		label: "Conditional flow",
		actionName: "replace-with-conditional-flow",
		className: "bpmn-icon-conditional-flow"
	}
];
var PARTICIPANT$1 = [replaceWith("expanded-pool"), replaceWith("collapsed-pool", { label: function(element) {
	var label = "Empty pool/participant";
	if (element.children && element.children.length) label += " (removes content)";
	return label;
} })];
var TYPED_EVENT = {
	"bpmn:MessageEventDefinition": [
		replaceWith("message-start"),
		replaceWith("message-intermediate-catch"),
		replaceWith("message-intermediate-throw"),
		replaceWith("message-end")
	],
	"bpmn:TimerEventDefinition": [replaceWith("timer-start"), replaceWith("timer-intermediate-catch")],
	"bpmn:ConditionalEventDefinition": [replaceWith("conditional-start"), replaceWith("conditional-intermediate-catch")],
	"bpmn:SignalEventDefinition": [
		replaceWith("signal-start"),
		replaceWith("signal-intermediate-catch"),
		replaceWith("signal-intermediate-throw"),
		replaceWith("signal-end")
	],
	"bpmn:ErrorEventDefinition": [replaceWith("error-start"), replaceWith("error-end")],
	"bpmn:EscalationEventDefinition": [
		replaceWith("escalation-start"),
		replaceWith("escalation-intermediate-throw"),
		replaceWith("escalation-end")
	],
	"bpmn:CompensateEventDefinition": [
		replaceWith("compensation-start"),
		replaceWith("compensation-intermediate-throw"),
		replaceWith("compensation-end")
	]
};
var replaceOptions = Object.freeze({
	__proto__: null,
	AD_HOC_SUBPROCESS_EXPANDED,
	BOUNDARY_EVENT,
	DATA_OBJECT_REFERENCE,
	DATA_STORE_REFERENCE,
	END_EVENT,
	EVENT_SUB_PROCESS,
	EVENT_SUB_PROCESS_START_EVENT,
	GATEWAY: GATEWAY$1,
	INTERMEDIATE_EVENT,
	PARTICIPANT: PARTICIPANT$1,
	SEQUENCE_FLOW,
	START_EVENT,
	START_EVENT_SUB_PROCESS,
	SUBPROCESS_EXPANDED,
	TASK: TASK$1,
	TRANSACTION,
	TYPED_EVENT
});
var createOption = (id, extra = {}) => {
	const entry = PopupEntries[id];
	if (!entry) throw new Error("unknown popup entry <" + id + ">");
	return {
		...entry,
		actionName: id,
		...extra
	};
};
var EVENT_GROUP = {
	id: "events",
	name: "Events"
};
var TASK_GROUP = {
	id: "tasks",
	name: "Tasks"
};
var GATEWAY_GROUP = {
	id: "gateways",
	name: "Gateways"
};
var SUBPROCESS_GROUP = {
	id: "subprocess",
	name: "Sub-processes"
};
var DATA_GROUP = {
	id: "data",
	name: "Data"
};
var PARTICIPANT_GROUP = {
	id: "participants",
	name: "Participants"
};
var NONE_EVENTS = [
	createOption("none-start-event", { group: EVENT_GROUP }),
	createOption("none-intermediate-throwing", { group: EVENT_GROUP }),
	createOption("none-boundary-event", { group: EVENT_GROUP }),
	createOption("none-end-event", { group: EVENT_GROUP })
];
var TYPED_START_EVENTS = [
	createOption("message-start", { group: EVENT_GROUP }),
	createOption("timer-start", { group: EVENT_GROUP }),
	createOption("conditional-start", { group: EVENT_GROUP }),
	createOption("signal-start", { group: EVENT_GROUP })
];
var TYPED_NON_INTERRUPTING_START_EVENTS = [
	createOption("non-interrupting-message-start", {
		group: EVENT_GROUP,
		actionName: "replace-with-non-interrupting-message-start",
		rank: -1
	}),
	createOption("non-interrupting-timer-start", {
		group: EVENT_GROUP,
		actionName: "replace-with-non-interrupting-timer-start",
		rank: -1
	}),
	createOption("non-interrupting-conditional-start", {
		group: EVENT_GROUP,
		actionName: "replace-with-non-interrupting-conditional-start",
		rank: -1
	}),
	createOption("non-interrupting-signal-start", {
		group: EVENT_GROUP,
		actionName: "replace-with-non-interrupting-signal-start",
		rank: -1
	}),
	createOption("non-interrupting-escalation-start", {
		group: EVENT_GROUP,
		actionName: "replace-with-non-interrupting-escalation-start",
		rank: -1
	})
];
var TYPED_INTERMEDIATE_EVENT = [
	createOption("message-intermediate-catch", { group: EVENT_GROUP }),
	createOption("message-intermediate-throw", { group: EVENT_GROUP }),
	createOption("timer-intermediate-catch", { group: EVENT_GROUP }),
	createOption("escalation-intermediate-throw", { group: EVENT_GROUP }),
	createOption("conditional-intermediate-catch", { group: EVENT_GROUP }),
	createOption("link-intermediate-catch", { group: EVENT_GROUP }),
	createOption("link-intermediate-throw", { group: EVENT_GROUP }),
	createOption("compensation-intermediate-throw", { group: EVENT_GROUP }),
	createOption("signal-intermediate-catch", { group: EVENT_GROUP }),
	createOption("signal-intermediate-throw", { group: EVENT_GROUP })
];
var TYPED_BOUNDARY_EVENT = [
	createOption("message-boundary", { group: EVENT_GROUP }),
	createOption("timer-boundary", { group: EVENT_GROUP }),
	createOption("escalation-boundary", { group: EVENT_GROUP }),
	createOption("conditional-boundary", { group: EVENT_GROUP }),
	createOption("error-boundary", { group: EVENT_GROUP }),
	createOption("cancel-boundary", { group: EVENT_GROUP }),
	createOption("signal-boundary", { group: EVENT_GROUP }),
	createOption("compensation-boundary", { group: EVENT_GROUP }),
	createOption("non-interrupting-message-boundary", { group: EVENT_GROUP }),
	createOption("non-interrupting-timer-boundary", { group: EVENT_GROUP }),
	createOption("non-interrupting-escalation-boundary", { group: EVENT_GROUP }),
	createOption("non-interrupting-conditional-boundary", { group: EVENT_GROUP }),
	createOption("non-interrupting-signal-boundary", { group: EVENT_GROUP })
];
var TYPED_END_EVENT = [
	createOption("message-end", { group: EVENT_GROUP }),
	createOption("escalation-end", { group: EVENT_GROUP }),
	createOption("error-end", { group: EVENT_GROUP }),
	createOption("cancel-end", { group: EVENT_GROUP }),
	createOption("compensation-end", { group: EVENT_GROUP }),
	createOption("signal-end", { group: EVENT_GROUP }),
	createOption("terminate-end", { group: EVENT_GROUP })
];
var GATEWAY = [
	createOption("exclusive-gateway", { group: GATEWAY_GROUP }),
	createOption("parallel-gateway", { group: GATEWAY_GROUP }),
	createOption("inclusive-gateway", {
		group: GATEWAY_GROUP,
		search: "or",
		rank: -1
	}),
	createOption("complex-gateway", {
		group: GATEWAY_GROUP,
		rank: -1
	}),
	createOption("event-based-gateway", { group: GATEWAY_GROUP })
];
var SUBPROCESS = [
	createOption("call-activity", { group: SUBPROCESS_GROUP }),
	createOption("transaction", { group: SUBPROCESS_GROUP }),
	createOption("event-subprocess", {
		group: SUBPROCESS_GROUP,
		search: "subprocess"
	}),
	createOption("collapsed-subprocess", {
		group: SUBPROCESS_GROUP,
		search: "subprocess"
	}),
	createOption("expanded-subprocess", {
		group: SUBPROCESS_GROUP,
		search: "subprocess"
	}),
	createOption("collapsed-ad-hoc-subprocess", {
		group: SUBPROCESS_GROUP,
		search: "adhoc subprocess"
	}),
	createOption("expanded-ad-hoc-subprocess", {
		group: SUBPROCESS_GROUP,
		search: "adhoc subprocess"
	})
];
var TASK = [
	createOption("task", { group: TASK_GROUP }),
	createOption("user-task", { group: TASK_GROUP }),
	createOption("service-task", { group: TASK_GROUP }),
	createOption("send-task", {
		group: TASK_GROUP,
		rank: -1
	}),
	createOption("receive-task", {
		group: TASK_GROUP,
		rank: -1
	}),
	createOption("manual-task", {
		group: TASK_GROUP,
		rank: -1
	}),
	createOption("rule-task", { group: TASK_GROUP }),
	createOption("script-task", { group: TASK_GROUP })
];
var DATA_OBJECTS = [createOption("data-store-reference", { group: DATA_GROUP }), createOption("data-object-reference", { group: DATA_GROUP })];
var PARTICIPANT = [createOption("expanded-pool", {
	group: PARTICIPANT_GROUP,
	search: "Non-empty pool/participant"
}), createOption("collapsed-pool", {
	group: PARTICIPANT_GROUP,
	search: "Collapsed pool/participant"
})];
var ALL_EVENTS = [
	...NONE_EVENTS,
	...TYPED_START_EVENTS,
	...TYPED_NON_INTERRUPTING_START_EVENTS,
	...TYPED_INTERMEDIATE_EVENT,
	...TYPED_BOUNDARY_EVENT,
	...TYPED_END_EVENT
];
var CREATE_OPTIONS = [
	...TASK,
	...GATEWAY,
	...SUBPROCESS,
	...ALL_EVENTS,
	...DATA_OBJECTS,
	...PARTICIPANT
];
function buildMenuEntries(options, config) {
	const entries = {};
	options.forEach((option) => {
		if (!config.filter || config.filter(option)) entries[`${config.idPrefix}-${option.actionName}`] = toActionEntry(option, config);
	});
	return entries;
}
function toActionEntry(option, { translate, createAction }) {
	return {
		label: option.label && translate(option.label),
		className: option.className,
		description: option.description && translate(option.description),
		group: option.group && {
			...option.group,
			name: translate(option.group.name)
		},
		search: option.search,
		rank: option.rank,
		action: createAction(option)
	};
}
function AppendMenuProvider(elementFactory, popupMenu, create, autoPlace, rules, mouse, translate, modeling, selection) {
	this._elementFactory = elementFactory;
	this._popupMenu = popupMenu;
	this._create = create;
	this._autoPlace = autoPlace;
	this._rules = rules;
	this._mouse = mouse;
	this._translate = translate;
	this._modeling = modeling;
	this._selection = selection;
	this.register();
}
AppendMenuProvider.$inject = [
	"elementFactory",
	"popupMenu",
	"create",
	"autoPlace",
	"rules",
	"mouse",
	"translate",
	"modeling",
	"selection"
];
AppendMenuProvider.prototype.register = function() {
	this._popupMenu.registerProvider("bpmn-append", this);
};
AppendMenuProvider.prototype.getPopupMenuEntries = function(element) {
	if (!this._rules.allowed("shape.append", { element })) return {};
	return buildMenuEntries(CREATE_OPTIONS, {
		idPrefix: "append",
		translate: this._translate,
		filter: (option) => this._includeOption(option),
		createAction: (option) => this._createEntryAction(element, option.target)
	});
};
AppendMenuProvider.prototype._includeOption = function(option) {
	const { type, eventDefinitionType } = option.target;
	if (["bpmn:StartEvent", "bpmn:Participant"].includes(type)) return false;
	if (type === "bpmn:BoundaryEvent" && isUndefined$2(eventDefinitionType)) return false;
	return true;
};
AppendMenuProvider.prototype._createEntryAction = function(element, target) {
	const elementFactory = this._elementFactory;
	const autoPlace = this._autoPlace;
	const create = this._create;
	const mouse = this._mouse;
	const modeling = this._modeling;
	const selection = this._selection;
	const autoPlaceElement = (newElement) => {
		autoPlace.append(element, newElement);
	};
	const autoAttach = (newElement) => {
		const attachPosition = getBoundaryElementAttachPosition(element);
		const createdElements = modeling.createElements(newElement, attachPosition, element, { attach: true });
		selection.select(createdElements[0]);
	};
	const manualPlaceElement = (event, newElement) => {
		if (event instanceof KeyboardEvent) event = mouse.getLastMoveEvent();
		return create.start(event, newElement, { source: element });
	};
	const clickActionHandler = (event) => {
		const newElement = elementFactory.create("shape", target);
		if (this._canAutoAttach(element, newElement, target)) autoAttach(newElement);
		else if (this._canAutoPlaceElement(target)) autoPlaceElement(newElement);
		else manualPlaceElement(event, newElement);
	};
	const dragActionHandler = (event) => {
		const newElement = elementFactory.create("shape", target);
		manualPlaceElement(event, newElement);
	};
	return {
		click: clickActionHandler,
		dragstart: dragActionHandler
	};
};
AppendMenuProvider.prototype._canAutoAttach = function(element, newElement, target) {
	if (target.type === "bpmn:BoundaryEvent") {
		const attachPosition = getBoundaryElementAttachPosition(element);
		return this._rules.allowed("shape.attach", {
			shape: newElement,
			target: element,
			position: attachPosition
		}) === "attach" && (!element.attachers || element.attachers.length === 0);
	}
	return false;
};
AppendMenuProvider.prototype._canAutoPlaceElement = (target) => {
	const { type } = target;
	if (type === "bpmn:BoundaryEvent") return false;
	if (type === "bpmn:SubProcess" && target.triggeredByEvent) return false;
	if (type === "bpmn:IntermediateCatchEvent" && target.eventDefinitionType === "bpmn:LinkEventDefinition") return false;
	return true;
};
var getBoundaryElementAttachPosition = (targetElement) => {
	return {
		x: targetElement.x + targetElement.width / 2,
		y: targetElement.y + targetElement.height
	};
};
var appendIcon = `<svg width="22" height="22" viewBox="0 0 5.82 5.82" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
  <path d="M1.3 3.4c.3 0 .5-.2.5-.5s-.2-.4-.5-.4c-.2 0-.4.1-.4.4 0 .3.2.5.4.5zM3 3.4c.2 0 .4-.2.4-.5s-.2-.4-.4-.4c-.3 0-.5.1-.5.4 0 .3.2.5.5.5zM4.6 3.4c.2 0 .4-.2.4-.5s-.2-.4-.4-.4c-.3 0-.5.1-.5.4 0 .3.2.5.5.5z"/>
</svg>`;
var createIcon = `<svg width="46" height="46" viewBox="-2 -2 9.82 9.82" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
  <path d="M1.3 3.4c.3 0 .5-.2.5-.5s-.2-.4-.5-.4c-.2 0-.4.1-.4.4 0 .3.2.5.4.5zM3 3.4c.2 0 .4-.2.4-.5s-.2-.4-.4-.4c-.3 0-.5.1-.5.4 0 .3.2.5.5.5zM4.6 3.4c.2 0 .4-.2.4-.5s-.2-.4-.4-.4c-.3 0-.5.1-.5.4 0 .3.2.5.5.5z"/>
</svg>`;
function AppendContextPadProvider(contextPad, popupMenu, translate, canvas, rules) {
	this._contextPad = contextPad;
	this._popupMenu = popupMenu;
	this._translate = translate;
	this._canvas = canvas;
	this._rules = rules;
	this.register();
}
AppendContextPadProvider.$inject = [
	"contextPad",
	"popupMenu",
	"translate",
	"canvas",
	"rules"
];
AppendContextPadProvider.prototype.register = function() {
	this._contextPad.registerProvider(this);
};
AppendContextPadProvider.prototype.getContextPadEntries = function(element) {
	const popupMenu = this._popupMenu;
	const translate = this._translate;
	const rules = this._rules;
	const getAppendMenuPosition = this._getAppendMenuPosition.bind(this);
	if (rules.allowed("shape.append", { element })) return { "append": {
		group: "model",
		html: `<div class="entry">${appendIcon}</div>`,
		title: translate("Append element"),
		action: { click: function(event, element) {
			const position = assign(getAppendMenuPosition(element), { cursor: {
				x: event.x,
				y: event.y
			} });
			popupMenu.open(element, "bpmn-append", position, {
				title: translate("Append element"),
				width: "var(--bpmn-append-popup-width, 300px)",
				search: true
			});
		} }
	} };
};
AppendContextPadProvider.prototype._getAppendMenuPosition = function(element) {
	const X_OFFSET = 5;
	const padRect = this._canvas.getContainer().querySelector(".djs-context-pad").getBoundingClientRect();
	return {
		x: padRect.right + X_OFFSET,
		y: padRect.top
	};
};
function e(e, t) {
	t && (e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: {
		value: e,
		enumerable: false,
		writable: true,
		configurable: true
	} }));
}
var DEFAULT_PRIORITY = 1e3;
function CommandInterceptor(eventBus) {
	this._eventBus = eventBus;
}
CommandInterceptor.$inject = ["eventBus"];
function unwrapEvent(fn, that) {
	return function(event) {
		return fn.call(that || null, event.context, event.command, event);
	};
}
CommandInterceptor.prototype.on = function(events, hook, priority, handlerFn, unwrap, that) {
	if (isFunction$1(hook) || isNumber(hook)) {
		that = unwrap;
		unwrap = handlerFn;
		handlerFn = priority;
		priority = hook;
		hook = null;
	}
	if (isFunction$1(priority)) {
		that = unwrap;
		unwrap = handlerFn;
		handlerFn = priority;
		priority = DEFAULT_PRIORITY;
	}
	if (isObject(unwrap)) {
		that = unwrap;
		unwrap = false;
	}
	if (!isFunction$1(handlerFn)) throw new Error("handlerFn must be a function");
	if (!isArray$1(events)) events = [events];
	var eventBus = this._eventBus;
	forEach$1(events, function(event) {
		var fullEvent = [
			"commandStack",
			event,
			hook
		].filter(function(e) {
			return e;
		}).join(".");
		eventBus.on(fullEvent, priority, unwrap ? unwrapEvent(handlerFn, that) : handlerFn, that);
	});
};
CommandInterceptor.prototype.canExecute = createHook("canExecute");
CommandInterceptor.prototype.preExecute = createHook("preExecute");
CommandInterceptor.prototype.preExecuted = createHook("preExecuted");
CommandInterceptor.prototype.execute = createHook("execute");
CommandInterceptor.prototype.executed = createHook("executed");
CommandInterceptor.prototype.postExecute = createHook("postExecute");
CommandInterceptor.prototype.postExecuted = createHook("postExecuted");
CommandInterceptor.prototype.revert = createHook("revert");
CommandInterceptor.prototype.reverted = createHook("reverted");
function createHook(hook) {
	const hookFn = function(events, priority, handlerFn, unwrap, that) {
		if (isFunction$1(events) || isNumber(events)) {
			that = unwrap;
			unwrap = handlerFn;
			handlerFn = priority;
			priority = events;
			events = null;
		}
		this.on(events, hook, priority, handlerFn, unwrap, that);
	};
	return hookFn;
}
function RuleProvider(eventBus) {
	CommandInterceptor.call(this, eventBus);
	this.init();
}
RuleProvider.$inject = ["eventBus"];
e(RuleProvider, CommandInterceptor);
RuleProvider.prototype.addRule = function(actions, priority, fn) {
	var self = this;
	if (typeof actions === "string") actions = [actions];
	actions.forEach(function(action) {
		self.canExecute(action, priority, function(context, action, event) {
			return fn(context);
		}, true);
	});
};
RuleProvider.prototype.init = function() {};
function AppendRules(eventBus) {
	RuleProvider.call(this, eventBus);
}
e(AppendRules, RuleProvider);
AppendRules.$inject = ["eventBus"];
AppendRules.prototype.init = function() {
	this.addRule("shape.append", function(context) {
		const source = context.element;
		const businessObject = getBusinessObject(source);
		if (isLabel(source)) return false;
		if (isAny(source, [
			"bpmn:EndEvent",
			"bpmn:Group",
			"bpmn:TextAnnotation",
			"bpmn:Lane",
			"bpmn:Participant",
			"bpmn:DataStoreReference",
			"bpmn:DataObjectReference"
		])) return false;
		if (isConnection(source)) return false;
		if (businessObject.isForCompensation) return false;
		if (is(source, "bpmn:IntermediateThrowEvent") && hasEventDefinition(source, "bpmn:LinkEventDefinition")) return false;
		if (is(source, "bpmn:SubProcess") && businessObject.triggeredByEvent) return false;
	});
};
function hasEventDefinition(element, eventDefinition) {
	return !!find$1(getBusinessObject(element).eventDefinitions || [], function(definition) {
		return is(definition, eventDefinition);
	});
}
function isConnection(element) {
	return element.waypoints;
}
var AppendMenuModule = {
	__init__: [
		"appendMenuProvider",
		"appendContextPadProvider",
		"appendRules"
	],
	appendMenuProvider: ["type", AppendMenuProvider],
	appendContextPadProvider: ["type", AppendContextPadProvider],
	appendRules: ["type", AppendRules]
};
function CreateMenuProvider(elementFactory, popupMenu, create, autoPlace, mouse, translate) {
	this._elementFactory = elementFactory;
	this._popupMenu = popupMenu;
	this._create = create;
	this._autoPlace = autoPlace;
	this._mouse = mouse;
	this._translate = translate;
	this.register();
}
CreateMenuProvider.$inject = [
	"elementFactory",
	"popupMenu",
	"create",
	"autoPlace",
	"mouse",
	"translate"
];
CreateMenuProvider.prototype.register = function() {
	this._popupMenu.registerProvider("bpmn-create", this);
};
CreateMenuProvider.prototype.getPopupMenuEntries = function() {
	return buildMenuEntries(CREATE_OPTIONS, {
		idPrefix: "create",
		translate: this._translate,
		createAction: (option) => {
			const targetAction = this._createEntryAction(option.target);
			return {
				click: targetAction,
				dragstart: targetAction
			};
		}
	});
};
CreateMenuProvider.prototype._createEntryAction = function(target) {
	const create = this._create;
	const mouse = this._mouse;
	const popupMenu = this._popupMenu;
	const elementFactory = this._elementFactory;
	let newElement;
	return (event) => {
		popupMenu.close();
		if (target.type === "bpmn:Participant") newElement = elementFactory.createParticipantShape(target);
		else newElement = elementFactory.create("shape", target);
		if (event instanceof KeyboardEvent) event = mouse.getLastMoveEvent();
		return create.start(event, newElement);
	};
};
var LOWER_PRIORITY = 900;
function CreatePaletteProvider(palette, translate, popupMenu, canvas, mouse) {
	this._palette = palette;
	this._translate = translate;
	this._popupMenu = popupMenu;
	this._canvas = canvas;
	this._mouse = mouse;
	this.register();
}
CreatePaletteProvider.$inject = [
	"palette",
	"translate",
	"popupMenu",
	"canvas",
	"mouse"
];
CreatePaletteProvider.prototype.register = function() {
	this._palette.registerProvider(LOWER_PRIORITY, this);
};
CreatePaletteProvider.prototype.getPaletteEntries = function(element) {
	const translate = this._translate, popupMenu = this._popupMenu, canvas = this._canvas, mouse = this._mouse;
	const getPosition = (event) => {
		const X_OFFSET = 35;
		const Y_OFFSET = 10;
		if (event instanceof KeyboardEvent) {
			event = mouse.getLastMoveEvent();
			return {
				x: event.x,
				y: event.y
			};
		}
		const target = event && event.target || query(".djs-palette [data-action=\"create\"]");
		const targetPosition = target.getBoundingClientRect();
		return target && {
			x: targetPosition.left + targetPosition.width / 2 + X_OFFSET,
			y: targetPosition.top + targetPosition.height / 2 + Y_OFFSET
		};
	};
	return { "create": {
		group: "create",
		html: `<div class="entry"> ${createIcon}</div>`,
		title: translate("Create element"),
		shortcut: "N",
		action: { click: function(event) {
			const position = getPosition(event);
			const element = canvas.getRootElement();
			popupMenu.open(element, "bpmn-create", position, {
				title: translate("Create element"),
				width: "var(--bpmn-create-popup-width, 300px)",
				search: true
			});
		} }
	} };
};
var CreateMenuModule = {
	__init__: ["createMenuProvider", "createPaletteProvider"],
	createMenuProvider: ["type", CreateMenuProvider],
	createPaletteProvider: ["type", CreatePaletteProvider]
};
function CreateAppendEditorActions(injector) {
	this._injector = injector;
	this.registerActions();
}
CreateAppendEditorActions.$inject = ["injector"];
CreateAppendEditorActions.prototype.registerActions = function() {
	const editorActions = this._injector.get("editorActions", false);
	const selection = this._injector.get("selection", false);
	const contextPad = this._injector.get("contextPad", false);
	const palette = this._injector.get("palette", false);
	const popupMenu = this._injector.get("popupMenu", false);
	const actions = {};
	if (selection && contextPad && palette && popupMenu && palette) assign(actions, { "appendElement": function(event) {
		const selected = selection && selection.get();
		if (selected.length == 1 && !popupMenu.isEmpty(selected[0], "bpmn-append")) contextPad.triggerEntry("append", "click", event);
		else palette.triggerEntry("create", "click", event);
	} });
	if (palette) assign(actions, { "createElement": function(event) {
		palette.triggerEntry("create", "click", event);
	} });
	editorActions && editorActions.register(actions);
};
var EditorActionsModule = {
	__depends__: [AppendMenuModule, CreateMenuModule],
	__init__: ["createAppendEditorActions"],
	createAppendEditorActions: ["type", CreateAppendEditorActions]
};
var LOW_PRIORITY = 500;
function KeyboardBindings(eventBus, keyboard) {
	var self = this;
	eventBus.on("editorActions.init", LOW_PRIORITY, function(event) {
		var editorActions = event.editorActions;
		self.registerBindings(keyboard, editorActions);
	});
}
KeyboardBindings.$inject = ["eventBus", "keyboard"];
KeyboardBindings.prototype.registerBindings = function(keyboard, editorActions) {
	function addListener(action, fn) {
		if (editorActions.isRegistered(action)) keyboard.addListener(fn);
	}
	addListener("undo", function(context) {
		var event = context.keyEvent;
		if (isUndo(event)) {
			editorActions.trigger("undo");
			return true;
		}
	});
	addListener("redo", function(context) {
		var event = context.keyEvent;
		if (isRedo(event)) {
			editorActions.trigger("redo");
			return true;
		}
	});
	addListener("copy", function(context) {
		var event = context.keyEvent;
		if (isCopy(event)) {
			editorActions.trigger("copy");
			return true;
		}
	});
	addListener("paste", function(context) {
		var event = context.keyEvent;
		if (isPaste(event)) {
			editorActions.trigger("paste");
			return true;
		}
	});
	addListener("duplicate", function(context) {
		var event = context.keyEvent;
		if (isDuplicate(event)) {
			editorActions.trigger("duplicate");
			return true;
		}
	});
	addListener("cut", function(context) {
		var event = context.keyEvent;
		if (isCut(event)) {
			editorActions.trigger("cut");
			return true;
		}
	});
	addListener("stepZoom", function(context) {
		var event = context.keyEvent;
		if (isKey([
			"+",
			"Add",
			"="
		], event) && isCmd(event)) {
			editorActions.trigger("stepZoom", { value: 1 });
			return true;
		}
	});
	addListener("stepZoom", function(context) {
		var event = context.keyEvent;
		if (isKey(["-", "Subtract"], event) && isCmd(event)) {
			editorActions.trigger("stepZoom", { value: -1 });
			return true;
		}
	});
	addListener("zoom", function(context) {
		var event = context.keyEvent;
		if (isKey("0", event) && isCmd(event)) {
			editorActions.trigger("zoom", { value: 1 });
			return true;
		}
	});
	addListener("removeSelection", function(context) {
		var event = context.keyEvent;
		if (isKey([
			"Backspace",
			"Delete",
			"Del"
		], event)) {
			editorActions.trigger("removeSelection");
			return true;
		}
	});
};
function CreateAppendKeyboardBindings(injector) {
	this._injector = injector;
	this._keyboard = this._injector.get("keyboard", false);
	this._editorActions = this._injector.get("editorActions", false);
	if (this._keyboard) this._injector.invoke(KeyboardBindings, this);
}
e(CreateAppendKeyboardBindings, KeyboardBindings);
CreateAppendKeyboardBindings.$inject = ["injector"];
CreateAppendKeyboardBindings.prototype.registerBindings = function() {
	const keyboard = this._keyboard;
	const editorActions = this._editorActions;
	KeyboardBindings.prototype.registerBindings.call(this, keyboard, editorActions);
	function addListener(action, fn) {
		if (editorActions && editorActions.isRegistered(action)) keyboard && keyboard.addListener(fn);
	}
	addListener("appendElement", function(context) {
		const event = context.keyEvent;
		if (keyboard && keyboard.hasModifier(event)) return;
		if (keyboard && keyboard.isKey(["a", "A"], event)) {
			editorActions && editorActions.trigger("appendElement", event);
			return true;
		}
	});
	addListener("createElement", function(context) {
		const event = context.keyEvent;
		if (keyboard && keyboard.hasModifier(event)) return;
		if (keyboard && keyboard.isKey(["n", "N"], event)) {
			editorActions && editorActions.trigger("createElement", event);
			return true;
		}
	});
};
var index$1 = { __depends__: [
	AppendMenuModule,
	CreateMenuModule,
	EditorActionsModule,
	{
		__depends__: [AppendMenuModule, CreateMenuModule],
		__init__: ["createAppendKeyboardBindings"],
		createAppendKeyboardBindings: ["type", CreateAppendKeyboardBindings]
	}
] };
function templateToEntry(template, action, overrides = {}) {
	const { icon = {}, category } = template;
	return buildEntry({
		label: template.name,
		description: template.description,
		documentationRef: template.documentationRef,
		imageUrl: icon.contents,
		search: template.keywords,
		...overrides,
		...category && { group: category }
	}, template, action);
}
function buildEntry(entry, node, action) {
	if (!node.steps?.length) return {
		...entry,
		action: action(node.presetId)
	};
	const entries = node.steps.reduce((entries, step, index) => {
		const nextEntry = {
			label: step.name,
			description: step.description,
			imageUrl: entry.imageUrl,
			search: step.keywords
		};
		entries[`step-${index}`] = buildEntry(nextEntry, step, action);
		return entries;
	}, {});
	return {
		...entry,
		entries
	};
}
function ElementTemplatesAppendProvider(popupMenu, translate, elementTemplates, autoPlace, create, mouse, rules) {
	this._popupMenu = popupMenu;
	this._translate = translate;
	this._elementTemplates = elementTemplates;
	this._autoPlace = autoPlace;
	this._create = create;
	this._mouse = mouse;
	this._rules = rules;
	this.register();
}
ElementTemplatesAppendProvider.$inject = [
	"popupMenu",
	"translate",
	"elementTemplates",
	"autoPlace",
	"create",
	"move",
	"rules"
];
ElementTemplatesAppendProvider.prototype.register = function() {
	this._popupMenu.registerProvider("bpmn-append", this);
};
ElementTemplatesAppendProvider.prototype.getPopupMenuEntries = function(element) {
	return (entries) => {
		if (!this._rules.allowed("shape.append", { element })) return [];
		const filteredTemplates = this._filterTemplates(this._elementTemplates.getLatest());
		assign(entries, this.getTemplateEntries(element, filteredTemplates));
		return entries;
	};
};
ElementTemplatesAppendProvider.prototype.getTemplateEntries = function(element, templates) {
	const defaultGroup = {
		id: "templates",
		name: this._translate("Templates")
	};
	return templates.reduce((entries, template) => {
		entries[`append.template-${template.id}`] = templateToEntry(template, this._getAction(element, template), { group: defaultGroup });
		return entries;
	}, {});
};
ElementTemplatesAppendProvider.prototype._getAction = function(element, template) {
	const elementTemplates = this._elementTemplates;
	const autoPlace = this._autoPlace;
	const create = this._create;
	const mouse = this._mouse;
	return (presetId) => {
		const autoPlaceElement = () => {
			const newElement = elementTemplates.createElement(template, { presetId });
			autoPlace.append(element, newElement);
		};
		const manualPlaceElement = (event) => {
			const newElement = elementTemplates.createElement(template, { presetId });
			if (event instanceof KeyboardEvent) event = mouse.getLastMoveEvent();
			return create.start(event, newElement, { source: element });
		};
		return {
			click: canAutoPlaceElement(template) ? autoPlaceElement : manualPlaceElement,
			dragstart: manualPlaceElement
		};
	};
};
ElementTemplatesAppendProvider.prototype._filterTemplates = function(templates) {
	return templates.filter((template) => {
		const { appliesTo, elementType } = template;
		const type = elementType && elementType.value || appliesTo[0];
		if (["bpmn:StartEvent", "bpmn:Participant"].includes(type)) return false;
		if ("bpmn:SequenceFlow" === type) return false;
		return true;
	});
};
function canAutoPlaceElement(elementTemplate) {
	const { appliesTo = [], elementType = {} } = elementTemplate;
	const type = elementType.value || appliesTo[0];
	if (type === "bpmn:BoundaryEvent") return false;
	if (type === "bpmn:IntermediateCatchEvent" && elementType.eventDefinition === "bpmn:LinkEventDefinition") return false;
	return true;
}
var AppendElementTemplatesModule = {
	__init__: ["elementTemplatesAppendProvider"],
	elementTemplatesAppendProvider: ["type", ElementTemplatesAppendProvider]
};
function ElementTemplatesCreateProvider(popupMenu, translate, elementTemplates, mouse, create) {
	this._popupMenu = popupMenu;
	this._translate = translate;
	this._elementTemplates = elementTemplates;
	this._mouse = mouse;
	this._create = create;
	this.register();
}
ElementTemplatesCreateProvider.$inject = [
	"popupMenu",
	"translate",
	"elementTemplates",
	"mouse",
	"create"
];
ElementTemplatesCreateProvider.prototype.register = function() {
	this._popupMenu.registerProvider("bpmn-create", this);
};
ElementTemplatesCreateProvider.prototype.getPopupMenuEntries = function(element) {
	return (entries) => {
		assign(entries, this.getTemplateEntries());
		return entries;
	};
};
ElementTemplatesCreateProvider.prototype.getTemplateEntries = function() {
	const elementTemplates = this._elementTemplates;
	const create = this._create;
	const popupMenu = this._popupMenu;
	const mouse = this._mouse;
	const defaultGroup = {
		id: "templates",
		name: this._translate("Templates")
	};
	return this._elementTemplates.getLatest().reduce((entries, template) => {
		const action = (presetId) => {
			const startCreate = (event) => {
				popupMenu.close();
				const newElement = elementTemplates.createElement(template, { presetId });
				if (event instanceof KeyboardEvent) event = mouse.getLastMoveEvent();
				return create.start(event, newElement);
			};
			return {
				click: startCreate,
				dragstart: startCreate
			};
		};
		entries[`create.template-${template.id}`] = templateToEntry(template, action, { group: defaultGroup });
		return entries;
	}, {});
};
var CreateElementTemplatesModule = {
	__init__: ["elementTemplatesCreateProvider"],
	elementTemplatesCreateProvider: ["type", ElementTemplatesCreateProvider]
};
function ElementTemplatesReplaceProvider(popupMenu, translate, elementTemplates) {
	this._popupMenu = popupMenu;
	this._translate = translate;
	this._elementTemplates = elementTemplates;
	this.register();
}
ElementTemplatesReplaceProvider.$inject = [
	"popupMenu",
	"translate",
	"elementTemplates"
];
ElementTemplatesReplaceProvider.prototype.register = function() {
	this._popupMenu.registerProvider("bpmn-replace", this);
};
ElementTemplatesReplaceProvider.prototype.getPopupMenuEntries = function(element) {
	return (entries) => {
		assign(entries, this.getTemplateEntries(element));
		return entries;
	};
};
ElementTemplatesReplaceProvider.prototype.getTemplateEntries = function(element) {
	const elementTemplates = this._elementTemplates;
	const defaultGroup = {
		id: "templates",
		name: this._translate("Templates")
	};
	return this._getMatchingTemplates(element).reduce((entries, template) => {
		const action = (presetId) => () => {
			elementTemplates.applyTemplate(element, template, { presetId });
		};
		entries[`replace.template-${template.id}`] = templateToEntry(template, action, { group: defaultGroup });
		return entries;
	}, {});
};
ElementTemplatesReplaceProvider.prototype._getMatchingTemplates = function(element) {
	return this._elementTemplates.getLatest(element).filter((template) => {
		if (template.steps?.length) return true;
		return !isTemplateApplied(element, template);
	});
};
function isTemplateApplied(element, template) {
	const businessObject = getBusinessObject(element);
	if (businessObject) return businessObject.get("zeebe:modelerTemplate") === template.id;
	return false;
}
var ReplaceElementTemplatesModule = {
	__init__: ["elementTemplatesReplaceProvider"],
	elementTemplatesReplaceProvider: ["type", ElementTemplatesReplaceProvider]
};
var ALL_OPTIONS = Object.values(replaceOptions);
function getReplaceOptionGroups() {
	return ALL_OPTIONS;
}
function RemoveTemplateReplaceProvider(popupMenu, translate, elementTemplates) {
	this._popupMenu = popupMenu;
	this._translate = translate;
	this._elementTemplates = elementTemplates;
	this.register();
}
RemoveTemplateReplaceProvider.$inject = [
	"popupMenu",
	"translate",
	"elementTemplates"
];
RemoveTemplateReplaceProvider.prototype.register = function() {
	this._popupMenu.registerProvider("bpmn-replace", this);
};
RemoveTemplateReplaceProvider.prototype.getPopupMenuEntries = function(element) {
	return (entries) => {
		let entrySet = Object.entries(entries);
		if (this._elementTemplates && this._elementTemplates.get(element)) this.addPlainElementEntry(element, entrySet, this._translate, this._elementTemplates);
		return entrySet.reduce((entries, [key, value]) => {
			entries[key] = value;
			return entries;
		}, {});
	};
};
RemoveTemplateReplaceProvider.prototype.addPlainElementEntry = function(element, entries, translate, elementTemplates) {
	const replaceOption = this.getPlainEntry(element, entries, translate, elementTemplates);
	if (!replaceOption) return;
	const [insertIndex, entry] = replaceOption;
	entries.splice(insertIndex, 0, [entry.id, entry]);
};
RemoveTemplateReplaceProvider.prototype.getPlainEntry = function(element, entries, translate, elementTemplates) {
	const { options, option, optionIndex } = findReplaceOptions(element) || {};
	if (!options) return null;
	const entry = {
		id: "replace-remove-element-template",
		action: () => {
			elementTemplates.removeTemplate(element);
		},
		label: translate(option.label),
		className: option.className
	};
	const previousIndex = getOptionIndex(options, optionIndex - 1, entries);
	if (previousIndex) return [previousIndex + 1, entry];
	const nextIndex = getOptionIndex(options, optionIndex + 1, entries);
	if (nextIndex) return [nextIndex, entry];
	return [0, entry];
};
function findReplaceOptions(element) {
	const isSameType = (element, option) => option.target && !isDifferentType(element)(option);
	return getReplaceOptionGroups().reduce((result, options) => {
		if (result) return result;
		const optionIndex = options.findIndex((option) => isSameType(element, option));
		if (optionIndex === -1) return;
		return {
			options,
			option: options[optionIndex],
			optionIndex
		};
	}, null);
}
function getOptionIndex(options, index, entries) {
	const option = options[index];
	if (!option) return false;
	return entries.findIndex(([key]) => key === option.actionName);
}
var RemoveTemplatesModule = {
	__init__: ["removeTemplateReplaceProvider"],
	removeTemplateReplaceProvider: ["type", RemoveTemplateReplaceProvider]
};
var index = { __depends__: [
	AppendElementTemplatesModule,
	CreateElementTemplatesModule,
	ReplaceElementTemplatesModule,
	RemoveTemplatesModule
] };
//#endregion
//#region ../../node_modules/bpmn-js-native-copy-paste/lib/NativeCopyPaste.js
var HIGHER_PRIORITY = 2050;
var PREFIX = "bpmn-js-clip----";
var NativeCopyPaste = class {
	constructor(eventBus, copyPaste, moddle) {
		this._eventBus = eventBus;
		this._handleCopied = (context) => {
			if (context.hints?.clip !== false) {
				navigator.clipboard.writeText(PREFIX + JSON.stringify(context.tree)).catch((err) => {
					this._handleError("failed to populate clipboard", err);
				});
				context.hints.clip = false;
			}
		};
		this._handlePaste = (context) => {
			if (context.tree) return;
			const contextCopy = { ...context };
			navigator.clipboard.readText().then((text) => {
				if (!text?.startsWith(PREFIX)) return;
				const tree = JSON.parse(text.substring(16), createReviver(moddle));
				copyPaste.paste({
					...contextCopy,
					tree
				});
			}).catch((err) => {
				this._handleError("failed to paste from clipboard", err);
			});
			return false;
		};
		this._handleError = (message, error) => {
			console.error("[native-copy-paste]", message, error);
			this._eventBus.fire("native-copy-paste:error", {
				message,
				error
			});
		};
		this.toggle(typeof navigator.clipboard !== "undefined");
	}
	toggle(active) {
		if (this._active === active) return;
		if (active) {
			this._eventBus.on("copyPaste.elementsCopied", HIGHER_PRIORITY, this._handleCopied);
			this._eventBus.on("copyPaste.pasteElements", HIGHER_PRIORITY, this._handlePaste);
		} else {
			this._eventBus.off("copyPaste.elementsCopied", this._handleCopied);
			this._eventBus.off("copyPaste.pasteElements", this._handlePaste);
		}
		this._active = active;
	}
};
NativeCopyPaste.$inject = [
	"eventBus",
	"copyPaste",
	"moddle"
];
//#endregion
//#region ../../node_modules/bpmn-js-native-copy-paste/lib/index.js
var lib_default = {
	__init__: ["nativeCopyPaste"],
	nativeCopyPaste: ["type", NativeCopyPaste]
};
//#endregion
export { index$1 as i, RemoveTemplatesModule as n, index as r, lib_default as t };

//# sourceMappingURL=lib-Dnq2R8Xy.js.map