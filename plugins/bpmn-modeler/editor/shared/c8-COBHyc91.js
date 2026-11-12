import { Gt as BaseRenderer, Ht as create, It as append, Kt as e, Rt as attr, gt as isLabel, k as CommandInterceptor, qt as Ids } from "./jsxRuntime.module-awBdvHUy.js";
import { a as is, i as init_ModelUtil, n as getBusinessObject, o as isAny } from "./ModelUtil-BGe9jbj7.js";
import { B as without, C as isObject, P as some, T as isUndefined, _ as init_dist, g as has, u as find, y as isDefined } from "./EscapeUtil-B1jzPlMc.js";
import { a as VariableProvider, d as index$1, f as useService, h as removeExtensionElements, i as ZeebeVariableResolverModule, l as TooltipProvider$1, m as getExtensionElementsList, n as colors_default, p as DeleteParticipantBehaviour, s as index$1$1, t as composeUpstreamModules } from "./sharedModules-BzDoO-Q2.js";
import { U as m } from "./clipboard-Bznk3d97.js";
import { P as isEdited$8, f as Group, h as JsonEditorEntry } from "./index.esm-DgBSptNj.js";
import { i as index$1$2, r as index } from "./lib-CHaSAubE.js";
var zeebe_default = {
	name: "zeebe",
	prefix: "zeebe",
	uri: "http://camunda.org/schema/zeebe/1.0",
	xml: { "tagAlias": "lowerCase" },
	associations: [],
	types: [
		{
			"name": "ZeebeServiceTask",
			"extends": [
				"bpmn:ServiceTask",
				"bpmn:BusinessRuleTask",
				"bpmn:ScriptTask",
				"bpmn:SendTask",
				"bpmn:EndEvent",
				"bpmn:IntermediateThrowEvent",
				"bpmn:AdHocSubProcess"
			],
			"properties": [{
				"name": "retryCounter",
				"type": "String",
				"isAttr": true
			}]
		},
		{
			"name": "IoMapping",
			"superClass": ["Element"],
			"properties": [
				{
					"name": "ioMapping",
					"type": "IoMapping"
				},
				{
					"name": "inputParameters",
					"isMany": true,
					"type": "Input"
				},
				{
					"name": "outputParameters",
					"isMany": true,
					"type": "Output"
				}
			],
			"meta": { "allowedIn": [
				"bpmn:CallActivity",
				"bpmn:Event",
				"bpmn:ReceiveTask",
				"zeebe:ZeebeServiceTask",
				"bpmn:SubProcess",
				"bpmn:UserTask"
			] }
		},
		{
			"name": "InputOutputParameter",
			"properties": [{
				"name": "source",
				"isAttr": true,
				"type": "String"
			}, {
				"name": "target",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "Subscription",
			"superClass": ["Element"],
			"properties": [{
				"name": "correlationKey",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "Input",
			"superClass": ["InputOutputParameter"],
			"meta": { "allowedIn": [
				"bpmn:CallActivity",
				"zeebe:ZeebeServiceTask",
				"bpmn:SubProcess",
				"bpmn:UserTask"
			] }
		},
		{
			"name": "Output",
			"superClass": ["InputOutputParameter"],
			"meta": { "allowedIn": [
				"bpmn:CallActivity",
				"bpmn:Event",
				"bpmn:ReceiveTask",
				"zeebe:ZeebeServiceTask",
				"bpmn:SubProcess",
				"bpmn:UserTask"
			] }
		},
		{
			"name": "TaskHeaders",
			"superClass": ["Element"],
			"meta": { "allowedIn": [
				"bpmn:UserTask",
				"zeebe:ExecutionListener",
				"zeebe:ZeebeServiceTask"
			] },
			"properties": [{
				"name": "values",
				"type": "Header",
				"isMany": true
			}]
		},
		{
			"name": "Header",
			"superClass": ["Element"],
			"properties": [
				{
					"name": "id",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "key",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "value",
					"type": "String",
					"isAttr": true
				}
			]
		},
		{
			"name": "TaskDefinition",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["zeebe:ZeebeServiceTask"] },
			"properties": [{
				"name": "type",
				"type": "String",
				"isAttr": true
			}, {
				"name": "retries",
				"type": "String",
				"isAttr": true
			}]
		},
		{
			"name": "LoopCharacteristics",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:MultiInstanceLoopCharacteristics"] },
			"properties": [
				{
					"name": "inputCollection",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "inputElement",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "outputCollection",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "outputElement",
					"type": "String",
					"isAttr": true
				}
			]
		},
		{
			"name": "CalledElement",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:CallActivity"] },
			"properties": [
				{
					"name": "processId",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "processIdExpression",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "propagateAllChildVariables",
					"isAttr": true,
					"type": "Boolean"
				},
				{
					"name": "propagateAllParentVariables",
					"isAttr": true,
					"type": "Boolean",
					"default": true
				},
				{
					"name": "businessId",
					"isAttr": true,
					"type": "String"
				}
			]
		},
		{
			"name": "UserTaskForm",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:Process"] },
			"properties": [{
				"name": "id",
				"type": "String",
				"isAttr": true
			}, {
				"name": "body",
				"type": "String",
				"isBody": true
			}]
		},
		{
			"name": "FormDefinition",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:UserTask", "bpmn:StartEvent"] },
			"properties": [
				{
					"name": "formKey",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "formId",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "externalReference",
					"type": "String",
					"isAttr": true
				}
			]
		},
		{
			"name": "LinkedResource",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:ServiceTask"] },
			"properties": [
				{
					"name": "resourceId",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "resourceType",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "linkName",
					"type": "String",
					"isAttr": true
				}
			]
		},
		{
			"name": "LinkedResources",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:ServiceTask"] },
			"properties": [{
				"name": "values",
				"type": "LinkedResource",
				"isMany": true
			}]
		},
		{
			"name": "UserTask",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:UserTask"] },
			"properties": []
		},
		{
			"name": "CalledDecision",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:BusinessRuleTask"] },
			"properties": [{
				"name": "decisionId",
				"type": "String",
				"isAttr": true
			}, {
				"name": "resultVariable",
				"type": "String",
				"isAttr": true
			}]
		},
		{
			"name": "AssignmentDefinition",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:UserTask"] },
			"properties": [
				{
					"name": "assignee",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "candidateGroups",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "candidateUsers",
					"type": "String",
					"isAttr": true
				}
			]
		},
		{
			"name": "PriorityDefinition",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:UserTask"] },
			"properties": [{
				"name": "priority",
				"type": "String",
				"isAttr": true
			}]
		},
		{
			"name": "JobPriorityDefinition",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:Process", "zeebe:ZeebeServiceTask"] },
			"properties": [{
				"name": "priority",
				"type": "String",
				"isAttr": true
			}]
		},
		{
			"name": "TaskSchedule",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:UserTask"] },
			"properties": [{
				"name": "dueDate",
				"type": "String",
				"isAttr": true
			}, {
				"name": "followUpDate",
				"type": "String",
				"isAttr": true
			}]
		},
		{
			"name": "Properties",
			"superClass": ["Element"],
			"properties": [{
				"name": "properties",
				"type": "Property",
				"isMany": true
			}]
		},
		{
			"name": "Property",
			"properties": [{
				"name": "name",
				"type": "String",
				"isAttr": true
			}, {
				"name": "value",
				"type": "String",
				"isAttr": true
			}]
		},
		{
			"name": "TemplateSupported",
			"isAbstract": true,
			"extends": [
				"bpmn:Collaboration",
				"bpmn:Process",
				"bpmn:FlowElement"
			],
			"properties": [
				{
					"name": "modelerTemplate",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "modelerTemplateVersion",
					"isAttr": true,
					"type": "Integer"
				},
				{
					"name": "modelerTemplateIcon",
					"isAttr": true,
					"type": "String"
				}
			]
		},
		{
			"name": "ConfigurationSupported",
			"isAbstract": true,
			"extends": ["zeebe:Input", "zeebe:Property"],
			"properties": [{
				"name": "modelerConfigurationTemplate",
				"isAttr": true,
				"type": "String"
			}, {
				"name": "modelerConfigurationName",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "TemplatedRootElement",
			"isAbstract": true,
			"extends": [
				"bpmn:Error",
				"bpmn:Escalation",
				"bpmn:Message",
				"bpmn:Signal"
			],
			"properties": [{
				"name": "modelerTemplate",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "Script",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:ScriptTask"] },
			"properties": [{
				"name": "expression",
				"type": "String",
				"isAttr": true
			}, {
				"name": "resultVariable",
				"type": "String",
				"isAttr": true
			}]
		},
		{
			"name": "ExecutionListeners",
			"superClass": ["Element"],
			"meta": { "allowedIn": [
				"bpmn:Event",
				"bpmn:Activity",
				"bpmn:Process",
				"bpmn:ExclusiveGateway",
				"bpmn:InclusiveGateway",
				"bpmn:ParallelGateway",
				"bpmn:EventBasedGateway"
			] },
			"properties": [{
				"name": "listeners",
				"type": "ExecutionListener",
				"isMany": true
			}]
		},
		{
			"name": "ExecutionListener",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["zeebe:ExecutionListeners"] },
			"properties": [
				{
					"name": "eventType",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "retries",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "type",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "headers",
					"type": "TaskHeaders"
				}
			]
		},
		{
			"name": "TaskListeners",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:UserTask"] },
			"properties": [{
				"name": "listeners",
				"type": "TaskListener",
				"isMany": true
			}]
		},
		{
			"name": "TaskListener",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["zeebe:TaskListeners"] },
			"properties": [
				{
					"name": "eventType",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "retries",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "type",
					"type": "String",
					"isAttr": true
				}
			]
		},
		{
			"name": "VersionTag",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:Process"] },
			"properties": [{
				"name": "value",
				"type": "String",
				"isAttr": true
			}]
		},
		{
			"name": "BindingTypeSupported",
			"isAbstract": true,
			"extends": [
				"zeebe:CalledDecision",
				"zeebe:CalledElement",
				"zeebe:FormDefinition",
				"zeebe:LinkedResource"
			],
			"properties": [{
				"name": "bindingType",
				"isAttr": true,
				"type": "String",
				"default": "latest"
			}, {
				"name": "versionTag",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "AdHoc",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:AdHocSubProcess"] },
			"properties": [
				{
					"name": "activeElementsCollection",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "outputCollection",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "outputElement",
					"isAttr": true,
					"type": "String"
				}
			]
		},
		{
			"name": "ConditionalFilter",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:ConditionalEventDefinition"] },
			"properties": [{
				"name": "variableNames",
				"isAttr": true,
				"type": "String"
			}, {
				"name": "variableEvents",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "AgentDefinition",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:ServiceTask", "bpmn:AdHocSubProcess"] },
			"properties": [{
				"name": "agentType",
				"type": "String",
				"isAttr": true
			}]
		}
	]
};
// ../../node_modules/@bpmn-io/element-template-icon-renderer/src/util/index.js
init_dist();
init_ModelUtil();
function getModelerTemplateIcon(element, iconProperty) {
	iconProperty = iconProperty || "zeebe:modelerTemplateIcon";
	return getBusinessObject(element).get(iconProperty);
}
// ../../node_modules/@bpmn-io/element-template-icon-renderer/src/ElementTemplateIconRenderer.js
init_ModelUtil();
var HIGH_PRIORITY$10 = 1250;
function ElementTemplateIconRenderer(config, bpmnRenderer, eventBus) {
	this._bpmnRenderer = bpmnRenderer;
	this._iconProperty = config && config.iconProperty;
	BaseRenderer.call(this, eventBus, HIGH_PRIORITY$10);
}
e(ElementTemplateIconRenderer, BaseRenderer);
ElementTemplateIconRenderer.prototype.canRender = function(element) {
	if (isLabel(element)) return false;
	return !!(isAny(element, ["bpmn:Activity", "bpmn:Event"]) && this._getIcon(element));
};
ElementTemplateIconRenderer.prototype._getIcon = function(element) {
	return getModelerTemplateIcon(element, this._iconProperty);
};
ElementTemplateIconRenderer.prototype.drawShape = function(parentGfx, element, attrs = {}) {
	var renderer = this._bpmnRenderer.handlers[[
		"bpmn:BoundaryEvent",
		"bpmn:CallActivity",
		"bpmn:EndEvent",
		"bpmn:IntermediateCatchEvent",
		"bpmn:IntermediateThrowEvent",
		"bpmn:StartEvent",
		"bpmn:Task",
		"bpmn:AdHocSubProcess",
		"bpmn:Transaction",
		"bpmn:SubProcess"
	].find((t) => is(element, t))];
	var gfx = renderer(parentGfx, element, {
		...attrs,
		renderIcon: false
	});
	var icon = this._getIcon(element);
	var size = 18;
	var padding = is(element, "bpmn:Activity") ? {
		x: 5,
		y: 5
	} : {
		x: (element.width - size) / 2,
		y: (element.height - size) / 2
	};
	var img = create("image");
	attr(img, {
		href: icon,
		width: size,
		height: size,
		...padding
	});
	append(parentGfx, img);
	return gfx;
};
ElementTemplateIconRenderer.$inject = [
	"config.elementTemplateIconRenderer",
	"bpmnRenderer",
	"eventBus"
];
// ../../node_modules/@bpmn-io/element-template-icon-renderer/src/index.js
var src_default = {
	__init__: ["elementTemplateIconRenderer"],
	elementTemplateIconRenderer: ["type", ElementTemplateIconRenderer]
};
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CleanUpAdHocSubProcessBehavior.js
init_ModelUtil();
var HIGH_PRIORITY$9 = 5e3;
var CleanUpAdHocSubProcessBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling) {
		super(eventBus);
		this.postExecute("element.updateModdleProperties", HIGH_PRIORITY$9, function(context) {
			const { element, moddleElement } = context;
			const businessObject = getBusinessObject(element);
			if (!is(businessObject, "bpmn:AdHocSubProcess") || !is(moddleElement, "bpmn:ExtensionElements") || !getTaskDefinition$4(element)) return;
			modeling.updateModdleProperties(element, businessObject, {
				cancelRemainingInstances: void 0,
				completionCondition: void 0
			});
			const adHoc = getAdHoc(element);
			if (adHoc) modeling.updateModdleProperties(element, adHoc, { activeElementsCollection: void 0 });
		}, true);
		this.postExecute("element.updateModdleProperties", HIGH_PRIORITY$9, function(context) {
			const { element, moddleElement } = context;
			if (!is(element, "bpmn:AdHocSubProcess") || !is(moddleElement, "bpmn:ExtensionElements") || getTaskDefinition$4(element)) return;
			const taskHeaders = getTaskHeaders$1(element);
			if (taskHeaders) modeling.updateModdleProperties(element, moddleElement, { values: without(moddleElement.get("values"), taskHeaders) });
		}, true);
	}
};
CleanUpAdHocSubProcessBehavior.$inject = ["eventBus", "modeling"];
function getAdHoc(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:AdHoc")[0];
}
function getTaskHeaders$1(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:TaskHeaders")[0];
}
function getTaskDefinition$4(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:TaskDefinition")[0];
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CleanUpBusinessRuleTaskBehavior.js
init_ModelUtil();
init_dist();
var HIGH_PRIORITY$8 = 5e3;
var CleanUpBusinessRuleTaskBehavior = class extends CommandInterceptor {
	constructor(commandStack, eventBus) {
		super(eventBus);
		this.preExecute("element.updateModdleProperties", HIGH_PRIORITY$8, function(context) {
			const { element, moddleElement, properties } = context;
			if (!is(element, "bpmn:BusinessRuleTask") || !is(moddleElement, "bpmn:ExtensionElements") || !properties.values) return;
			const calledDecision = getCalledDecision$1(element), taskDefinition = getTaskDefinition$3(element);
			if (calledDecision && !taskDefinition && properties.values.find((value) => is(value, "zeebe:CalledDecision")) && properties.values.find((value) => is(value, "zeebe:TaskDefinition"))) properties.values = without(properties.values, calledDecision);
		}, true);
		this.preExecute("element.updateModdleProperties", HIGH_PRIORITY$8, function(context) {
			const { element, moddleElement, properties } = context;
			if (!is(element, "bpmn:BusinessRuleTask") || !is(moddleElement, "bpmn:ExtensionElements") || !properties.values) return;
			const calledDecision = getCalledDecision$1(element), taskDefinition = getTaskDefinition$3(element), taskHeaders = getTaskHeaders(element);
			if (!calledDecision && (taskDefinition || taskHeaders) && properties.values.find((value) => is(value, "zeebe:CalledDecision")) && properties.values.find((value) => is(value, "zeebe:TaskDefinition") || is(value, "zeebe:TaskHeaders"))) properties.values = without(properties.values, (value) => value === taskDefinition || value === taskHeaders);
		}, true);
	}
};
CleanUpBusinessRuleTaskBehavior.$inject = ["commandStack", "eventBus"];
function getCalledDecision$1(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:CalledDecision")[0];
}
function getTaskDefinition$3(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:TaskDefinition")[0];
}
function getTaskHeaders(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:TaskHeaders")[0];
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/util/EventDefinition.js
init_ModelUtil();
function getEventDefinition(element, type) {
	if (!is(element, "bpmn:Event")) return null;
	return (getBusinessObject(element).get("eventDefinitions") || []).find((definition) => is(definition, type)) || null;
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CleanUpJobPriorityDefinitionBehavior.js
init_ModelUtil();
init_dist();
var HIGH_PRIORITY$7 = 5e3;
var OPTIONAL_JOB_WORKER_ELEMENTS = [
	"bpmn:AdHocSubProcess",
	"bpmn:BusinessRuleTask",
	"bpmn:ScriptTask"
];
var CleanUpJobPriorityDefinitionBehavior = class extends CommandInterceptor {
	constructor(commandStack, eventBus) {
		super(eventBus);
		this.postExecuted("shape.replace", HIGH_PRIORITY$7, function(context) {
			const element = context.newShape;
			if (is(element, "bpmn:Process") || isZeebeServiceTask(element)) return;
			const businessObject = getBusinessObject(element);
			const jobPriorityDefinition = getJobPriorityDefinition(element);
			if (jobPriorityDefinition) removeExtensionElements(element, businessObject, jobPriorityDefinition, commandStack);
		}, true);
		this.postExecuted("element.updateModdleProperties", HIGH_PRIORITY$7, function(context) {
			const { element, moddleElement, properties } = context;
			if (!is(moddleElement, "bpmn:ExtensionElements") || !properties.values) return;
			if (!isAny(element, OPTIONAL_JOB_WORKER_ELEMENTS)) return;
			const taskDefinition = getTaskDefinition$2(element);
			const jobPriorityDefinition = getJobPriorityDefinition(element);
			if (!taskDefinition && jobPriorityDefinition) {
				const businessObject = getBusinessObject(element);
				removeExtensionElements(element, businessObject, jobPriorityDefinition, commandStack);
			}
		}, true);
		this.postExecuted("element.updateModdleProperties", HIGH_PRIORITY$7, function(context) {
			const { element, moddleElement } = context;
			if (!is(moddleElement, "zeebe:JobPriorityDefinition")) return;
			const jobPriorityDefinition = moddleElement;
			if (isUndefined(jobPriorityDefinition.get("zeebe:priority"))) {
				const businessObject = getBusinessObject(element);
				removeExtensionElements(element, businessObject, jobPriorityDefinition, commandStack);
			}
		}, true);
	}
};
CleanUpJobPriorityDefinitionBehavior.$inject = ["commandStack", "eventBus"];
function getJobPriorityDefinition(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:JobPriorityDefinition")[0];
}
function getTaskDefinition$2(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:TaskDefinition")[0];
}
function isZeebeServiceTask(element) {
	if (!is(element, "zeebe:ZeebeServiceTask")) return false;
	if (is(element, "bpmn:EndEvent") || is(element, "bpmn:IntermediateThrowEvent")) return !!getEventDefinition(element, "bpmn:MessageEventDefinition");
	if (isAny(element, OPTIONAL_JOB_WORKER_ELEMENTS) && !getTaskDefinition$2(element)) return false;
	return true;
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CleanUpConditionalEventBehavior.js
init_ModelUtil();
var CleanUpConditionalEventBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling) {
		super(eventBus);
		this.postExecuted(["shape.move", "shape.create"], function({ context }) {
			const { shape } = context;
			cleanUpConditionalEvent(shape, modeling);
		});
		this.postExecuted("shape.replace", function({ context }) {
			const { newShape } = context;
			cleanUpConditionalEvent(newShape, modeling);
		});
	}
};
CleanUpConditionalEventBehavior.$inject = ["eventBus", "modeling"];
function cleanUpConditionalEvent(element, modeling) {
	if (!is(element, "bpmn:Event")) return;
	const conditionalEventDefinition = getEventDefinition(element, "bpmn:ConditionalEventDefinition");
	if (!conditionalEventDefinition) return;
	if (!shouldCleanUpVariableEvents(element)) return;
	const conditionalFilter = getConditionalFilter(conditionalEventDefinition);
	if (!conditionalFilter) return;
	if (!conditionalFilter.get("variableEvents")) return;
	modeling.updateModdleProperties(element, conditionalFilter, { variableEvents: void 0 });
}
function getConditionalFilter(conditionalEventDefinition) {
	return getExtensionElementsList(conditionalEventDefinition, "zeebe:ConditionalFilter")[0];
}
function shouldCleanUpVariableEvents(element) {
	return isRootLevelEvent(element) && !is(element, "bpmn:IntermediateCatchEvent") && !is(element, "bpmn:BoundaryEvent");
}
function isRootLevelEvent(element) {
	const parent = getBusinessObject(element).$parent;
	return parent && is(parent, "bpmn:Process");
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CleanUpEndEventBehavior.js
init_ModelUtil();
init_dist();
var CleanUpEndEventBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling) {
		super(eventBus);
		this.postExecuted("shape.replace", function(event) {
			const { context } = event;
			const { newShape } = context;
			if (!is(newShape, "bpmn:EndEvent") || !getErrorEventDefinition(newShape)) return;
			const ioMapping = getIoMapping$1(newShape);
			if (!ioMapping) return;
			const extensionElements = getBusinessObject(newShape).get("extensionElements"), values = without(extensionElements.get("values"), ioMapping);
			modeling.updateModdleProperties(newShape, extensionElements, { values });
		});
	}
};
CleanUpEndEventBehavior.$inject = ["eventBus", "modeling"];
function getErrorEventDefinition(element) {
	return getEventDefinition(element, "bpmn:ErrorEventDefinition");
}
function getIoMapping$1(element) {
	const extensionElements = getBusinessObject(element).get("extensionElements");
	if (!extensionElements) return null;
	const values = extensionElements.get("values");
	if (!values) return null;
	return find(values, (value) => is(value, "zeebe:IoMapping"));
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CleanUpExecutionListenersBehavior.js
init_ModelUtil();
init_dist();
var DISALLOWED_START_LISTENER_TYPES = ["bpmn:StartEvent", "bpmn:BoundaryEvent"];
var CleanUpExecutionListenersBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling) {
		super(eventBus);
		this.postExecuted("shape.replace", function(event) {
			const element = event.context.newShape;
			const executionListenersContainer = getExecutionListenersContainer(element);
			if (!executionListenersContainer) return;
			const listeners = executionListenersContainer.get("listeners");
			const newListeners = withoutDisallowedListeners$1(element, listeners);
			if (newListeners.length !== listeners.length) modeling.updateModdleProperties(element, executionListenersContainer, { listeners: newListeners });
		});
		this.postExecuted(["element.updateProperties", "element.updateModdleProperties"], function(event) {
			const { element, properties } = event.context;
			if (!("loopCharacteristics" in properties)) return;
			if (isMultiInstance(element)) return;
			const executionListenersContainer = getExecutionListenersContainer(element);
			if (!executionListenersContainer) return;
			const listeners = executionListenersContainer.get("listeners");
			const newListeners = withoutBeforeAllListeners(listeners);
			if (newListeners.length !== listeners.length) modeling.updateModdleProperties(element, executionListenersContainer, { listeners: newListeners });
		});
		this.postExecuted("element.updateModdleProperties", function(event) {
			const { element, moddleElement } = event.context;
			if (!is(moddleElement, "zeebe:ExecutionListeners")) return;
			if (moddleElement.get("listeners").length) return;
			const extensionElements = moddleElement.$parent;
			modeling.updateModdleProperties(element, extensionElements, { values: without(extensionElements.get("values"), moddleElement) });
		});
	}
};
CleanUpExecutionListenersBehavior.$inject = ["eventBus", "modeling"];
function withoutDisallowedListeners$1(element, listeners) {
	listeners = withoutDisallowedStartListeners(element, listeners);
	listeners = withoutDisallowedEndListeners(element, listeners);
	listeners = withoutDisallowedBeforeAllListeners(element, listeners);
	return listeners;
}
function withoutDisallowedStartListeners(element, listeners) {
	if (isAny(element, DISALLOWED_START_LISTENER_TYPES)) return listeners.filter((listener) => listener.eventType !== "start");
	return listeners;
}
function withoutDisallowedEndListeners(element, listeners) {
	if (shouldRemoveEndListeners(element)) return listeners.filter((listener) => listener.eventType !== "end");
	return listeners;
}
function withoutDisallowedBeforeAllListeners(element, listeners) {
	if (isMultiInstance(element)) return listeners;
	return withoutBeforeAllListeners(listeners);
}
function withoutBeforeAllListeners(listeners) {
	return listeners.filter((listener) => listener.eventType !== "beforeAll");
}
function shouldRemoveEndListeners(element) {
	if (is(element, "bpmn:BoundaryEvent") && isCompensationEvent(element) || is(element, "bpmn:EndEvent") && isErrorEvent(element) || is(element, "bpmn:Gateway")) return true;
}
function isMultiInstance(element) {
	const loopCharacteristics = getBusinessObject(element).get("loopCharacteristics");
	return !!loopCharacteristics && is(loopCharacteristics, "bpmn:MultiInstanceLoopCharacteristics");
}
function isCompensationEvent(element) {
	return !!getEventDefinition(element, "bpmn:CompensateEventDefinition");
}
function isErrorEvent(element) {
	return !!getEventDefinition(element, "bpmn:ErrorEventDefinition");
}
function getExecutionListenersContainer(element) {
	return getExtensionElementsList(element, "zeebe:ExecutionListeners")[0];
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CleanUpMessageRefBehavior.js
init_ModelUtil();
var CleanUpMessageRefBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling) {
		super(eventBus, modeling);
		this.postExecuted("shape.replace", function(event) {
			const newShape = event.context.newShape;
			if (!is(newShape, "bpmn:ThrowEvent")) return;
			const messageEventDefinition = getMessageEventDefinition$1(newShape);
			if (!messageEventDefinition) return;
			if (!messageEventDefinition.get("messageRef")) return;
			modeling.updateModdleProperties(newShape, messageEventDefinition, { messageRef: void 0 });
		});
		this.postExecuted("shape.replace", function(event) {
			const newShape = event.context.newShape, bo = getBusinessObject(newShape);
			if (!is(bo, "bpmn:SendTask")) return;
			if (!bo.get("messageRef")) return;
			modeling.updateProperties(newShape, { messageRef: void 0 });
		});
	}
};
CleanUpMessageRefBehavior.$inject = ["eventBus", "modeling"];
function getMessageEventDefinition$1(element) {
	return getEventDefinition(element, "bpmn:MessageEventDefinition");
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CleanUpTaskListenersBehavior.js
init_ModelUtil();
init_dist();
var CleanUpTaskListenersBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling) {
		super(eventBus);
		this.postExecuted("shape.replace", function(event) {
			const element = event.context.newShape;
			updateListeners(element, modeling);
		});
		this.postExecuted("element.updateModdleProperties", function(event) {
			const element = event.context.element;
			if (!is(element, "bpmn:UserTask")) return;
			updateListeners(element, modeling);
		});
		this.postExecuted("element.updateModdleProperties", function(event) {
			const { element, moddleElement } = event.context;
			if (!is(moddleElement, "zeebe:TaskListeners")) return;
			if (moddleElement.get("listeners").length) return;
			const extensionElements = moddleElement.$parent;
			modeling.updateModdleProperties(element, extensionElements, { values: without(extensionElements.get("values"), moddleElement) });
		});
	}
};
CleanUpTaskListenersBehavior.$inject = ["eventBus", "modeling"];
function updateListeners(element, modeling) {
	const taskListenersContainer = getTaskListenersContainer(element);
	if (!taskListenersContainer) return;
	const listeners = taskListenersContainer.get("listeners");
	const newListeners = withoutDisallowedListeners(element, listeners);
	if (newListeners.length !== listeners.length) modeling.updateModdleProperties(element, taskListenersContainer, { listeners: newListeners });
}
function withoutDisallowedListeners(element, listeners) {
	return listeners.filter((listener) => {
		if (!is(element, "bpmn:UserTask") || !hasZeebeTaskExtensionElement(element)) return false;
		return true;
	});
}
function getTaskListenersContainer(element) {
	return getExtensionElementsList(element, "zeebe:TaskListeners")[0];
}
function hasZeebeTaskExtensionElement(element) {
	return getExtensionElementsList(element, "zeebe:UserTask").length > 0;
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CleanUpSubscriptionBehavior.js
init_ModelUtil();
var CleanUpSubscriptionBehavior = class extends CommandInterceptor {
	constructor(eventBus, commandStack) {
		super(eventBus);
		this.postExecuted(["element.updateProperties", "element.updateModdleProperties"], (context) => {
			const element = context.shape || context.newShape || context.element;
			if (element.labelTarget) return;
			if (!is(element, "bpmn:Event")) return;
			const messageEventDefinition = getMessageEventDefinition(element);
			if (!messageEventDefinition) return;
			const message = messageEventDefinition.get("messageRef");
			if (!message) return;
			const subscription = getSubscription(message);
			if (!subscription) return;
			if (!hasNoProperties(subscription)) return;
			removeExtensionElements(element, message, subscription, commandStack);
		}, true);
	}
};
CleanUpSubscriptionBehavior.$inject = ["eventBus", "commandStack"];
function getMessageEventDefinition(event) {
	return getEventDefinition(event, "bpmn:MessageEventDefinition");
}
function getSubscription(message) {
	return getExtensionElementsList(message, "zeebe:Subscription")[0];
}
function hasNoProperties(element) {
	return element.$descriptor.properties.every((property) => {
		return element.get(property.name) === void 0;
	});
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/util/TimerUtil.js
init_ModelUtil();
var TIMER_PROPERTIES = [
	"timeCycle",
	"timeDate",
	"timeDuration"
];
function getTimerEventDefinition(element) {
	return getEventDefinition(element, "bpmn:TimerEventDefinition");
}
function isTimerExpressionTypeSupported(type, element) {
	const businessObject = getBusinessObject(element);
	switch (type) {
		case "timeDate": return isAny(element, [
			"bpmn:BoundaryEvent",
			"bpmn:IntermediateCatchEvent",
			"bpmn:StartEvent"
		]);
		case "timeCycle":
			if (is(element, "bpmn:StartEvent") && !hasParentEventSubProcess(businessObject) || !isInterrupting(businessObject)) return true;
			if (is(element, "bpmn:BoundaryEvent") && !isInterrupting(businessObject)) return true;
			return false;
		case "timeDuration":
			if (isAny(element, ["bpmn:BoundaryEvent", "bpmn:IntermediateCatchEvent"])) return true;
			if (is(element, "bpmn:StartEvent") && hasParentEventSubProcess(businessObject)) return true;
			return false;
		default: return false;
	}
}
function isInterrupting(businessObject) {
	if (is(businessObject, "bpmn:BoundaryEvent")) return businessObject.get("cancelActivity") !== false;
	return businessObject.get("isInterrupting") !== false;
}
function hasParentEventSubProcess(businessObject) {
	const parent = businessObject.$parent;
	return parent && is(parent, "bpmn:SubProcess") && parent.get("triggeredByEvent");
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CleanUpTimerExpressionBehavior.js
init_ModelUtil();
var CleanUpTimerExpressionBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling) {
		super(eventBus);
		this._modeling = modeling;
		this.postExecuted([
			"shape.move",
			"shape.replace",
			"shape.create",
			"element.updateProperties",
			"element.updateModdleProperties"
		], (context) => {
			const element = context.shape || context.newShape || context.element;
			this.cleanUpTimerProperties(element);
		}, true);
	}
	cleanUpTimerProperties(element) {
		if (!is(element, "bpmn:Event")) return;
		const timerEventDefinition = getTimerEventDefinition(element);
		if (!timerEventDefinition) return;
		const propertiesUpdate = TIMER_PROPERTIES.reduce((acc, type) => {
			if (timerEventDefinition.get(type) && !isTimerExpressionTypeSupported(type, element)) acc[type] = void 0;
			return acc;
		}, {});
		if (Object.keys(propertiesUpdate).length) this._modeling.updateModdleProperties(element, timerEventDefinition, propertiesUpdate);
	}
};
CleanUpTimerExpressionBehavior.$inject = ["eventBus", "modeling"];
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CopyPasteBehavior.js
init_dist();
init_ModelUtil();
var WILDCARD = "*";
var zeebeServiceTaskProperties = [
	"zeebe:Input",
	"zeebe:LoopCharacteristics",
	"zeebe:TaskDefinition",
	"zeebe:TaskHeaders",
	"zeebe:Subscription"
];
var ZeebeModdleExtension = class {
	constructor(eventBus) {
		eventBus.on("moddleCopy.canCopyProperty", (context) => {
			const { parent, property, propertyName } = context;
			return this.canCopyProperty(property, parent, propertyName);
		});
	}
	canCopyProperty(property, parent, propertyName) {
		if (isObject(property) && !isAllowedInParent(property, parent)) return false;
		if (!this.canHostServiceTaskLikeProperties(property, parent)) return false;
		if (!this.canHostTimerExpression(parent, propertyName)) return false;
	}
	canHostServiceTaskLikeProperties(property, parent) {
		if (isAllowedInZeebeServiceTask(property)) {
			const serviceTaskLike = getParent(parent, "bpmn:IntermediateThrowEvent") || getParent(parent, "bpmn:EndEvent");
			if (serviceTaskLike) return isMessageEvent(serviceTaskLike);
		}
		return true;
	}
	canHostTimerExpression(parent, propertyName) {
		if (!TIMER_PROPERTIES.includes(propertyName)) return true;
		return is(parent, "bpmn:TimerEventDefinition");
	}
};
ZeebeModdleExtension.$inject = ["eventBus"];
function getParent(element, type) {
	if (!type) return element.$parent;
	if (is(element, type)) return element;
	if (!element.$parent) return;
	return getParent(element.$parent, type);
}
function isAllowedInParent(property, parent) {
	const descriptor = property.$type && property.$model.getTypeDescriptor(property.$type);
	const allowedIn = descriptor && descriptor.meta && descriptor.meta.allowedIn;
	if (!allowedIn || isWildcard(allowedIn)) return true;
	return some(allowedIn, function(type) {
		return getParent(parent, type);
	});
}
function isWildcard(allowedIn) {
	return allowedIn.indexOf(WILDCARD) !== -1;
}
function isMessageEvent(event) {
	return event.get("eventDefinitions").some((eventDefinition) => {
		return is(eventDefinition, "bpmn:MessageEventDefinition");
	});
}
function isAllowedInZeebeServiceTask(property) {
	return zeebeServiceTaskProperties.some((propertyType) => {
		return is(property, propertyType);
	});
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/util/ElementUtil.js
function createElement(elementType, properties, parent, factory) {
	var element = factory.create(elementType, properties);
	element.$parent = parent;
	return element;
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CreateZeebeBusinessRuleTaskBehavior.js
init_ModelUtil();
var HIGH_PRIORITY$6 = 5e3;
var CreateZeebeBusinessRuleTaskBehavior = class extends CommandInterceptor {
	constructor(bpmnFactory, eventBus, modeling) {
		super(eventBus);
		this.postExecuted(["shape.create", "shape.replace"], HIGH_PRIORITY$6, function(context) {
			const shape = context.shape || context.newShape;
			const explicitlyDisabled = context.hints && context.hints.createElementsBehavior === false;
			if (!is(shape, "bpmn:BusinessRuleTask") || explicitlyDisabled) return;
			if (getCalledDecision(shape) || getTaskDefinition$1(shape)) return;
			const businessObject = getBusinessObject(shape);
			let extensionElements = businessObject.get("extensionElements");
			if (!extensionElements) {
				extensionElements = createElement("bpmn:ExtensionElements", { values: [] }, businessObject, bpmnFactory);
				modeling.updateProperties(shape, { extensionElements });
			}
			const calledDecision = createElement("zeebe:CalledDecision", {}, extensionElements, bpmnFactory);
			modeling.updateModdleProperties(shape, extensionElements, { values: [...extensionElements.values || [], calledDecision] });
		}, true);
	}
};
CreateZeebeBusinessRuleTaskBehavior.$inject = [
	"bpmnFactory",
	"eventBus",
	"modeling"
];
function getCalledDecision(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:CalledDecision")[0] || null;
}
function getTaskDefinition$1(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:TaskDefinition")[0] || null;
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/util/InputOutputUtil.js
init_ModelUtil();
function getIoMapping(element) {
	const extensionElements = getBusinessObject(element).get("extensionElements");
	if (!extensionElements) return;
	return extensionElements.get("values").find((value) => {
		return is(value, "zeebe:IoMapping");
	});
}
function getOutputParameters(element) {
	const ioMapping = getIoMapping(element);
	if (ioMapping) return ioMapping.get("zeebe:outputParameters");
	return [];
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/util/CalledElementUtil.js
init_ModelUtil();
function getCalledElement(element) {
	return getCalledElements(element)[0];
}
function getCalledElements(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:CalledElement");
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CreateZeebeCallActivityBehavior.js
init_dist();
init_ModelUtil();
var HIGH_PRIORITY$5 = 5e3;
var CreateZeebeCallActivityBehavior = class extends CommandInterceptor {
	constructor(bpmnFactory, eventBus, modeling) {
		super(eventBus);
		this.postExecuted("shape.create", HIGH_PRIORITY$5, function(context) {
			const { shape } = context;
			if (!is(shape, "bpmn:CallActivity")) return;
			const businessObject = getBusinessObject(shape);
			let calledElement = getCalledElement(businessObject);
			if (!calledElement) {
				let extensionElements = businessObject.get("extensionElements");
				if (!extensionElements) {
					extensionElements = createElement("bpmn:ExtensionElements", { values: [] }, businessObject, bpmnFactory);
					modeling.updateProperties(shape, { extensionElements });
				}
				calledElement = createElement("zeebe:CalledElement", { propagateAllChildVariables: false }, extensionElements, bpmnFactory);
				modeling.updateModdleProperties(shape, extensionElements, { values: [...extensionElements.values || [], calledElement] });
			} else if (!has(calledElement, "propagateAllChildVariables")) modeling.updateModdleProperties(shape, calledElement, { propagateAllChildVariables: false });
		}, true);
	}
};
CreateZeebeCallActivityBehavior.$inject = [
	"bpmnFactory",
	"eventBus",
	"modeling"
];
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CreateZeebeScriptTaskBehavior.js
init_ModelUtil();
var HIGH_PRIORITY$4 = 5e3;
var CreateZeebeScriptTaskBehavior = class extends CommandInterceptor {
	constructor(bpmnFactory, eventBus, modeling) {
		super(eventBus);
		this.postExecuted(["shape.create", "shape.replace"], HIGH_PRIORITY$4, function(context) {
			const shape = context.shape || context.newShape;
			const explicitlyDisabled = context.hints && context.hints.createElementsBehavior === false;
			if (!is(shape, "bpmn:ScriptTask") || explicitlyDisabled) return;
			if (getScript(shape) || getTaskDefinition(shape)) return;
			const businessObject = getBusinessObject(shape);
			let extensionElements = businessObject.get("extensionElements");
			if (!extensionElements) {
				extensionElements = createElement("bpmn:ExtensionElements", { values: [] }, businessObject, bpmnFactory);
				modeling.updateProperties(shape, { extensionElements });
			}
			const script = createElement("zeebe:Script", {}, extensionElements, bpmnFactory);
			modeling.updateModdleProperties(shape, extensionElements, { values: [...extensionElements.values || [], script] });
		}, true);
	}
};
CreateZeebeScriptTaskBehavior.$inject = [
	"bpmnFactory",
	"eventBus",
	"modeling"
];
function getScript(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:Script")[0] || null;
}
function getTaskDefinition(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:TaskDefinition")[0] || null;
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CreateZeebeUserTaskBehavior.js
init_ModelUtil();
var HIGH_PRIORITY$3 = 5e3;
var CreateZeebeUserTaskBehavior = class extends CommandInterceptor {
	constructor(bpmnFactory, eventBus, modeling) {
		super(eventBus);
		this.postExecuted(["shape.create", "shape.replace"], HIGH_PRIORITY$3, function(context) {
			const shape = context.shape || context.newShape;
			const explicitlyDisabled = context.hints && context.hints.createElementsBehavior === false;
			if (!is(shape, "bpmn:UserTask") || explicitlyDisabled) return;
			let userTaskElement = getZeebeUserTask(shape);
			if (userTaskElement) return;
			const businessObject = getBusinessObject(shape);
			let extensionElements = businessObject.get("extensionElements");
			if (!extensionElements) {
				extensionElements = createElement("bpmn:ExtensionElements", { values: [] }, businessObject, bpmnFactory);
				modeling.updateProperties(shape, { extensionElements });
			}
			userTaskElement = createElement("zeebe:UserTask", {}, extensionElements, bpmnFactory);
			modeling.updateModdleProperties(shape, extensionElements, { values: [...extensionElements.values || [], userTaskElement] });
		}, true);
	}
};
CreateZeebeUserTaskBehavior.$inject = [
	"bpmnFactory",
	"eventBus",
	"modeling"
];
function getZeebeUserTask(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:UserTask")[0] || null;
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/util/IdsUtil.js
var ids = new Ids([
	32,
	32,
	1
]);
function getPrefixedId(prefix) {
	return ids.nextPrefixed(prefix);
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/util/FormsUtil.js
init_ModelUtil();
var FORM_KEY_PREFIX = "camunda-forms:bpmn:";
var USER_TASK_FORM_ID_PREFIX = "UserTaskForm_";
function getFormDefinition(element) {
	const businessObject = getBusinessObject(element);
	return getExtensionElementsList(businessObject, "zeebe:FormDefinition")[0];
}
function getUserTaskForm(element, options = {}) {
	let { formKey, rootElement } = options;
	rootElement = rootElement || getRootElement(element);
	if (!formKey) {
		const formDefinition = getFormDefinition(element);
		if (!formDefinition) return;
		formKey = formDefinition.get("formKey");
	}
	return getExtensionElementsList(rootElement, "zeebe:UserTaskForm").find((userTaskForm) => {
		return userTaskFormIdToFormKey(userTaskForm.get("id")) === formKey;
	});
}
function userTaskFormIdToFormKey(userTaskFormId) {
	return `${FORM_KEY_PREFIX}${userTaskFormId}`;
}
function formKeyToUserTaskFormId(formKey) {
	return formKey.replace(FORM_KEY_PREFIX, "");
}
function isUserTaskFormKey(formKey) {
	return formKey && formKey.startsWith(FORM_KEY_PREFIX);
}
function createUserTaskFormId() {
	return getPrefixedId(USER_TASK_FORM_ID_PREFIX);
}
function getRootElement(element) {
	let parent = getBusinessObject(element);
	while (parent.$parent && !is(parent, "bpmn:Process")) parent = parent.$parent;
	return parent;
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/FormsBehavior.js
init_dist();
init_ModelUtil();
var FormsBehavior = class extends CommandInterceptor {
	constructor(bpmnFactory, elementRegistry, eventBus, modeling) {
		super(eventBus);
		this._modeling = modeling;
		function removeUserTaskForm(element, moddleElement, userTaskForm) {
			const extensionElements = moddleElement.get("extensionElements");
			const values = without(extensionElements.get("values"), userTaskForm);
			modeling.updateModdleProperties(element, extensionElements, { values });
			if (!values.length) modeling.updateModdleProperties(element, moddleElement, { extensionElements: void 0 });
		}
		function removeFormDefinition(element, formDefinition) {
			const bo = getBusinessObject(element);
			const extensionElements = bo.get("extensionElements");
			const values = without(extensionElements.get("values"), formDefinition);
			modeling.updateModdleProperties(element, extensionElements, { values });
			if (!values.length) modeling.updateModdleProperties(element, bo, { extensionElements: void 0 });
		}
		this.postExecute("shape.delete", function(context) {
			const { labelTarget, oldParent, shape } = context;
			if (labelTarget) return;
			const rootElement = getRootElement(oldParent);
			const userTaskForm = getUserTaskForm(shape, { rootElement });
			if (!is(shape, "bpmn:UserTask") && !is(shape, "bpmn:StartEvent") || !userTaskForm) return;
			removeUserTaskForm(shape, rootElement, userTaskForm);
		}, true);
		this.postExecuted(["shape.move", "shape.create"], function(event) {
			const { context } = event;
			const { shape } = context;
			const parent = context.newParent || context.parent;
			if (shape.labelTarget) return;
			if (!is(shape, "bpmn:StartEvent") || !is(parent, "bpmn:SubProcess")) return;
			const formDefinition = getFormDefinition(shape);
			if (!formDefinition) return;
			removeFormDefinition(shape, formDefinition);
		});
		this.postExecuted("shape.replace", function(event) {
			const { context } = event;
			const { newShape } = context;
			if (!is(newShape, "bpmn:StartEvent")) return;
			const eventDefinitions = getBusinessObject(newShape).get("eventDefinitions");
			if (!eventDefinitions || !eventDefinitions.length) return;
			const formDefinition = getFormDefinition(newShape);
			if (!formDefinition) return;
			removeFormDefinition(newShape, formDefinition);
		});
		this.postExecute("shape.create", function(context) {
			const { shape } = context;
			if (shape.labelTarget) return;
			if (!is(shape, "bpmn:UserTask") && !is(shape, "bpmn:StartEvent")) return;
			const oldFormDefinition = getFormDefinition(shape);
			if (!oldFormDefinition) return;
			const oldUserTaskForm = getUserTaskForm(shape);
			if (!oldUserTaskForm) return;
			if (!elementRegistry.filter((element) => {
				if (element === shape) return false;
				const formDefinition = getFormDefinition(element);
				return formDefinition && formDefinition.get("formKey") && formKeyToUserTaskFormId(formDefinition.get("formKey")) === oldUserTaskForm.get("id");
			}).length) return;
			const rootElement = getRootElement(shape);
			let extensionElements = rootElement.get("extensionElements");
			if (!extensionElements) {
				extensionElements = createElement("bpmn:ExtensionElements", { values: [] }, rootElement, bpmnFactory);
				modeling.updateModdleProperties(shape, rootElement, { extensionElements });
			}
			const userTaskFormId = createUserTaskFormId();
			const userTaskForm = createElement("zeebe:UserTaskForm", {
				id: userTaskFormId,
				body: oldUserTaskForm.get("body")
			}, extensionElements, bpmnFactory);
			modeling.updateModdleProperties(shape, extensionElements, { values: [...extensionElements.get("values") || [], userTaskForm] });
			modeling.updateModdleProperties(shape, oldFormDefinition, { formKey: userTaskFormIdToFormKey(userTaskFormId) });
		}, true);
		this.preExecute("element.updateModdleProperties", function(context) {
			const { moddleElement, properties } = context;
			if (is(moddleElement, "zeebe:FormDefinition")) {
				if ("formId" in properties) {
					properties.formKey = void 0;
					properties.externalReference = void 0;
				} else if ("formKey" in properties) {
					properties.formId = void 0;
					properties.externalReference = void 0;
					properties.bindingType = void 0;
				} else if ("externalReference" in properties) {
					properties.formId = void 0;
					properties.formKey = void 0;
					properties.bindingType = void 0;
				}
				if ("bindingType" in properties && !("formId" in properties) && !moddleElement.get("formId")) {
					properties.externalReference = void 0;
					properties.formId = "";
					properties.formKey = void 0;
				}
			}
		}, true);
		this.postExecute("element.updateModdleProperties", function(context) {
			const { element, moddleElement, oldProperties } = context;
			if (is(moddleElement, "zeebe:FormDefinition")) {
				const formKey = moddleElement.get("formKey");
				if (!formKey || !isUserTaskFormKey(formKey)) {
					const userTaskForm = getUserTaskForm(element, { formKey: oldProperties.formKey });
					if (userTaskForm) removeUserTaskForm(element, getRootElement(element), userTaskForm);
				}
			} else if (isExtensionElementRemoved(context, "zeebe:FormDefinition")) {
				const userTaskForm = getUserTaskForm(element, { formKey: oldProperties.values.find((value) => is(value, "zeebe:FormDefinition")).get("formKey") });
				if (userTaskForm) removeUserTaskForm(element, getRootElement(element), userTaskForm);
				if (!moddleElement.get("values").length) modeling.updateProperties(element, { extensionElements: void 0 });
			}
		}, true);
		this._registerZeebeUserTaskSupport();
	}
	_registerZeebeUserTaskSupport() {
		this.postExecute("element.updateModdleProperties", ({ element }) => {
			if (!is(element, "bpmn:UserTask") || !hasZeebeUserTask(element)) return;
			const formDefinition = getFormDefinition(element);
			if (!formDefinition) return;
			const formKey = formDefinition.get("formKey");
			if (isUndefined(formKey)) return;
			if (isUserTaskFormKey(formKey)) this._modeling.updateModdleProperties(element, formDefinition, { formKey: void 0 });
			else this._modeling.updateModdleProperties(element, formDefinition, { externalReference: formKey });
		}, true);
		this.postExecute("element.updateModdleProperties", ({ element }) => {
			if (!is(element, "bpmn:UserTask") || hasZeebeUserTask(element)) return;
			const formDefinition = getFormDefinition(element);
			if (!formDefinition) return;
			const externalReference = formDefinition.get("externalReference");
			if (isUndefined(externalReference)) return;
			this._modeling.updateModdleProperties(element, formDefinition, {
				externalReference: void 0,
				formKey: externalReference
			});
		}, true);
	}
};
FormsBehavior.$inject = [
	"bpmnFactory",
	"elementRegistry",
	"eventBus",
	"modeling"
];
function isExtensionElementRemoved(context, type) {
	const { moddleElement, oldProperties, properties } = context;
	return is(moddleElement, "bpmn:ExtensionElements") && "values" in oldProperties && "values" in properties && oldProperties.values.find((value) => is(value, type)) && !properties.values.find((value) => is(value, type));
}
function hasZeebeUserTask(userTask) {
	return getExtensionElementsList(userTask, "zeebe:UserTask").length;
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/RemoveAssignmentDefinitionBehavior.js
init_ModelUtil();
init_dist();
var HIGH_PRIORITY$2 = 5e3;
var RemoveAssignmentDefinitionBehavior = class extends CommandInterceptor {
	constructor(commandStack, eventBus) {
		super(eventBus);
		this.postExecuted("element.updateModdleProperties", HIGH_PRIORITY$2, function(context) {
			const { element, moddleElement } = context;
			if (!is(moddleElement, "zeebe:AssignmentDefinition")) return;
			const assignmentDefinition = moddleElement;
			if (is(element, "bpmn:UserTask") && isUndefined(assignmentDefinition.get("zeebe:assignee")) && isUndefined(assignmentDefinition.get("zeebe:candidateGroups")) && isUndefined(assignmentDefinition.get("zeebe:candidateUsers"))) {
				const businessObject = getBusinessObject(element);
				removeExtensionElements(element, businessObject, assignmentDefinition, commandStack);
			}
		}, true);
	}
};
RemoveAssignmentDefinitionBehavior.$inject = ["commandStack", "eventBus"];
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/RemoveTaskScheduleBehavior.js
init_ModelUtil();
init_dist();
var HIGH_PRIORITY$1 = 5e3;
var RemoveTaskScheduleBehavior = class extends CommandInterceptor {
	constructor(commandStack, eventBus) {
		super(eventBus);
		this.postExecuted("element.updateModdleProperties", HIGH_PRIORITY$1, function(context) {
			const { element, moddleElement } = context;
			if (!is(moddleElement, "zeebe:TaskSchedule")) return;
			const taskSchedule = moddleElement;
			if (is(element, "bpmn:UserTask") && isUndefined(taskSchedule.get("zeebe:dueDate")) && isUndefined(taskSchedule.get("zeebe:followUpDate"))) {
				const businessObject = getBusinessObject(element);
				removeExtensionElements(element, businessObject, taskSchedule, commandStack);
			}
		}, true);
	}
};
RemoveTaskScheduleBehavior.$inject = ["commandStack", "eventBus"];
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/CallActivityVariablesPropagationBehavior.js
init_ModelUtil();
var HIGH_PRIORITY = 5e3;
var CallActivityVariablesPropagationBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling) {
		super(eventBus);
		this.postExecute("element.updateModdleProperties", HIGH_PRIORITY, function(context) {
			const { element, moddleElement, properties = {} } = context;
			const propagateAllChildVariables = properties.propagateAllChildVariables || properties["zeebe:propagateAllChildVariables"];
			if (!is(element, "bpmn:CallActivity") || !is(moddleElement, "zeebe:CalledElement") || !propagateAllChildVariables) return;
			const outputParameters = getOutputParameters(element);
			if (!outputParameters || !outputParameters.length) return;
			const ioMapping = getIoMapping(element);
			modeling.updateModdleProperties(element, ioMapping, { "zeebe:outputParameters": [] });
		}, true);
	}
};
CallActivityVariablesPropagationBehavior.$inject = ["eventBus", "modeling"];
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/VersionTagBehavior.js
init_dist();
init_ModelUtil();
var VersionTagBehavior = class extends CommandInterceptor {
	constructor(eventBus, commandStack) {
		super(eventBus);
		this.preExecute("element.updateModdleProperties", function(context) {
			const { moddleElement, properties } = context;
			if (!isAny(moddleElement, [
				"zeebe:CalledDecision",
				"zeebe:CalledElement",
				"zeebe:FormDefinition"
			])) return;
			if ("bindingType" in properties && properties.bindingType !== "versionTag" && isDefined(moddleElement.get("versionTag"))) properties.versionTag = void 0;
			if (isDefined(properties.versionTag) && moddleElement.get("bindingType") !== "versionTag") properties.bindingType = "versionTag";
		}, true);
		this.postExecuted("element.updateModdleProperties", function(context) {
			const { element, moddleElement } = context;
			if (!is(moddleElement, "zeebe:VersionTag")) return;
			let businessObject = getBusinessObject(element);
			if (is(element, "bpmn:Participant")) businessObject = businessObject.get("processRef");
			if (isEmpty(moddleElement.get("value"))) removeExtensionElements(element, businessObject, moddleElement, commandStack);
		}, true);
	}
};
VersionTagBehavior.$inject = ["eventBus", "commandStack"];
function isEmpty(value) {
	return value == void 0 || value === "";
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-cloud/index.js
var camunda_cloud_default = {
	__init__: [
		"callActivityVariablesPropagationBehavior",
		"cleanUpAdHocSubProcessBehavior",
		"cleanUpBusinessRuleTaskBehavior",
		"cleanUpJobPriorityDefinitionBehavior",
		"cleanUpConditionalEventBehavior",
		"cleanUpEndEventBehavior",
		"cleanUpExecutionListenersBehavior",
		"cleanUpMessageRefBehavior",
		"cleanUpTaskListenersBehavior",
		"cleanUpSubscriptionBehavior",
		"cleanUpTimerExpressionBehavior",
		"copyPasteBehavior",
		"createZeebeBusinessRuleTaskBehavior",
		"createZeebeCallActivityBehavior",
		"createZeebeScriptTaskBehavior",
		"createZeebeUserTaskBehavior",
		"deleteParticipantBehaviour",
		"formsBehavior",
		"removeAssignmentDefinitionBehavior",
		"removeTaskScheduleBehavior",
		"versionTagBehavior"
	],
	callActivityVariablesPropagationBehavior: ["type", CallActivityVariablesPropagationBehavior],
	cleanUpAdHocSubProcessBehavior: ["type", CleanUpAdHocSubProcessBehavior],
	cleanUpBusinessRuleTaskBehavior: ["type", CleanUpBusinessRuleTaskBehavior],
	cleanUpJobPriorityDefinitionBehavior: ["type", CleanUpJobPriorityDefinitionBehavior],
	cleanUpConditionalEventBehavior: ["type", CleanUpConditionalEventBehavior],
	cleanUpEndEventBehavior: ["type", CleanUpEndEventBehavior],
	cleanUpExecutionListenersBehavior: ["type", CleanUpExecutionListenersBehavior],
	cleanUpMessageRefBehavior: ["type", CleanUpMessageRefBehavior],
	cleanUpTaskListenersBehavior: ["type", CleanUpTaskListenersBehavior],
	cleanUpSubscriptionBehavior: ["type", CleanUpSubscriptionBehavior],
	cleanUpTimerExpressionBehavior: ["type", CleanUpTimerExpressionBehavior],
	copyPasteBehavior: ["type", ZeebeModdleExtension],
	createZeebeBusinessRuleTaskBehavior: ["type", CreateZeebeBusinessRuleTaskBehavior],
	createZeebeCallActivityBehavior: ["type", CreateZeebeCallActivityBehavior],
	createZeebeScriptTaskBehavior: ["type", CreateZeebeScriptTaskBehavior],
	createZeebeUserTaskBehavior: ["type", CreateZeebeUserTaskBehavior],
	deleteParticipantBehaviour: ["type", DeleteParticipantBehaviour],
	formsBehavior: ["type", FormsBehavior],
	removeAssignmentDefinitionBehavior: ["type", RemoveAssignmentDefinitionBehavior],
	removeTaskScheduleBehavior: ["type", RemoveTaskScheduleBehavior],
	versionTagBehavior: ["type", VersionTagBehavior]
};
// ../../node_modules/@camunda/example-data-properties-provider/lib/util/jsonDataUtil.js
init_ModelUtil();
var EXAMPLE_JSON_PROPERTY_NAME = "camundaModeler:exampleOutputJson";
function getExampleJson(element) {
	const property = getZeebeProperty(element, EXAMPLE_JSON_PROPERTY_NAME);
	if (property) return property.get("value");
}
function getZeebeProperty(element, name) {
	const allProperties = getExtensionElements(element, "zeebe:Properties");
	if (allProperties.length === 0) return;
	return allProperties[0].get("properties").find((p) => p.get("name") === name);
}
function getExtensionElements(element, type) {
	const bo = getBusinessObject(element);
	let elements = [];
	const extensionElements = bo.get("extensionElements");
	if (typeof extensionElements !== "undefined") {
		const extensionValues = extensionElements.get("values");
		if (typeof extensionValues !== "undefined") elements = extensionValues.filter((e) => is(e, type));
	}
	return elements;
}
// ../../node_modules/@camunda/example-data-properties-provider/lib/variableProvider/ExampleJsonProvider.js
var ExampleJsonProvider = class extends VariableProvider {
	getVariables(element) {
		const data = getExampleJson(element);
		if (!data) return;
		return getVariablesFromString(data);
	}
};
function getVariablesFromString(data) {
	try {
		return toInternalFormat(JSON.parse(data));
	} catch (e) {
		return [];
	}
}
function toInternalFormat(data = {}) {
	if (typeof data !== "object" || data === null) return;
	return Object.keys(data).map((key) => {
		let value = data[key];
		const newElement = {
			name: key,
			info: JSON.stringify(value, null, 2)
		};
		if (Array.isArray(value)) {
			newElement.isList = true;
			newElement.type = "List";
			if (value.length > 0) newElement.entries = toInternalFormat(value[0]);
			return newElement;
		}
		newElement.type = getType(value);
		newElement.entries = toInternalFormat(value);
		return newElement;
	});
}
function getType(value) {
	if (value === null) return "";
	const type = typeof value;
	if (type === "object") return "Context";
	return capitalize(type);
}
function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
// ../../node_modules/@camunda/example-data-properties-provider/lib/variableProvider/index.js
var variableProvider_default = {
	__init__: ["exampleProvider"],
	exampleProvider: ["type", ExampleJsonProvider]
};
// ../../node_modules/@camunda/example-data-properties-provider/lib/propertiesPanel/ExampleDataProperty.js
init_ModelUtil();
var ExampleDataProperty = (props) => {
	const { element } = props;
	const debounce = useService("debounceInput");
	const translate = useService("translate");
	const commandStack = useService("commandStack");
	const moddle = useService("moddle");
	const injector = useService("injector");
	const getValue = () => {
		return getExampleJson(element);
	};
	const setValue = (value) => {
		const commands = [];
		const { commands: createZeebePropertiesCmds, zeebeProperties } = ensureZeebeProperties(element, injector);
		commands.push(...createZeebePropertiesCmds);
		const existingData = getZeebeProperty(element, EXAMPLE_JSON_PROPERTY_NAME);
		if (existingData) {
			if (value) commands.push({
				cmd: "element.updateModdleProperties",
				context: {
					element,
					moddleElement: existingData,
					properties: { value }
				}
			});
			else commands.push({
				cmd: "element.updateModdleProperties",
				context: {
					element,
					moddleElement: zeebeProperties,
					properties: { properties: withoutOutData(zeebeProperties.get("properties")) }
				}
			});
		} else commands.push({
			cmd: "element.updateModdleProperties",
			context: {
				element,
				moddleElement: zeebeProperties,
				properties: { properties: [...zeebeProperties.get("properties"), createOutData(value, moddle)] }
			}
		});
		commandStack.execute("properties-panel.multi-command-executor", commands);
	};
	return JsonEditorEntry({
		element,
		placeholder: "{ }",
		label: translate("Example output"),
		tooltip: translate("A JSON object — each key represents a variable produced by this element."),
		id: "exampleJson",
		getValue,
		setValue,
		debounce
	});
};
var ensureZeebeProperties = (element, injector) => {
	const commands = [];
	const bo = getBusinessObject(element);
	const bpmnFactory = injector.get("bpmnFactory");
	let extensionElements = bo.get("extensionElements");
	if (!extensionElements) {
		extensionElements = bpmnFactory.create("bpmn:ExtensionElements", { values: [] });
		extensionElements.$parent = bo;
		commands.push({
			cmd: "element.updateModdleProperties",
			context: {
				element,
				moddleElement: bo,
				properties: { extensionElements }
			}
		});
	}
	let zeebeProperties = extensionElements.get("values").find((v) => v.$type === "zeebe:Properties");
	if (!zeebeProperties) {
		zeebeProperties = bpmnFactory.create("zeebe:Properties", { properties: [] });
		zeebeProperties.$parent = extensionElements;
		commands.push({
			cmd: "element.updateModdleProperties",
			context: {
				element,
				moddleElement: extensionElements,
				properties: { values: [...extensionElements.get("values"), zeebeProperties] }
			}
		});
	}
	return {
		zeebeProperties,
		commands
	};
};
function createOutData(data, moddle) {
	return moddle.create("zeebe:Property", {
		name: EXAMPLE_JSON_PROPERTY_NAME,
		value: data
	});
}
function withoutOutData(zeebeProperties) {
	return zeebeProperties.filter((p) => p.get("name") !== EXAMPLE_JSON_PROPERTY_NAME);
}
// ../../node_modules/@camunda/example-data-properties-provider/lib/propertiesPanel/DataPropertiesProvider.js
var VERY_LOW_PRIORITY = 100;
var DataPropertiesProvider = class {
	constructor(propertiesPanel, injector) {
		this._injector = injector;
		propertiesPanel.registerProvider(VERY_LOW_PRIORITY, this);
	}
	getGroups(element) {
		const translate = this._injector.get("translate");
		const elementTemplates = this._injector.get("elementTemplates", false);
		let template = null;
		if (elementTemplates) template = elementTemplates.get(element);
		const shouldHide = !!template;
		return (groups) => {
			if (shouldHide) return groups;
			const group = {
				id: "additionalDataGroup",
				label: translate("Example data"),
				tooltip: m`
          Provide example data related to this element. Used for editor intelligence, not process execution. <a href="https://docs.camunda.io/docs/components/modeler/data-handling/#defining-example-data" target="_blank" rel="noopener" title=${translate("Example data documentation")}>
            ${translate("Learn more")}
          </a>`,
				entries: [{
					id: "exampleJson",
					component: ExampleDataProperty,
					isEdited: isEdited$8
				}],
				component: Group
			};
			groups.push(group);
			return groups;
		};
	}
};
DataPropertiesProvider.$inject = ["propertiesPanel", "injector"];
// ../../node_modules/@camunda/example-data-properties-provider/lib/index.js
var lib_default = { __depends__: [variableProvider_default, {
	__init__: ["dataPropertiesProvider"],
	dataPropertiesProvider: ["type", DataPropertiesProvider]
}] };
// ../../packages/bpmn-modeler/src/engineStacks/c8.ts
var FEEL_POPUP_LINKS = {
	feel: {
		title: "Learn FEEL expressions",
		href: "https://docs.camunda.io/docs/components/modeler/feel/what-is-feel/"
	},
	feelers: {
		title: "Learn templating",
		href: "https://docs.camunda.io/docs/components/modeler/forms/configuration/forms-config-templating-syntax/"
	}
};
var JOB_WORKER_KEYWORDS = ["Job worker"];
var c8Stack = {
	upstreamModules: composeUpstreamModules([
		src_default,
		camunda_cloud_default,
		index$1,
		index$1$1,
		index$1$2,
		index,
		colors_default,
		ZeebeVariableResolverModule,
		lib_default
	]),
	engineModules: [],
	moddleExtensions: { zeebe: zeebe_default },
	propertiesPanelDefaults: {
		tooltip: TooltipProvider$1,
		getFeelPopupLinks: (type) => {
			const link = FEEL_POPUP_LINKS[type];
			return link ? [link] : void 0;
		}
	},
	popupMenuAnnotations: {
		descriptions: { "service-task": "Automated work carried out by a job worker or connector" },
		additionalKeywords: {
			"service-task": JOB_WORKER_KEYWORDS,
			"script-task": JOB_WORKER_KEYWORDS,
			"send-task": JOB_WORKER_KEYWORDS,
			"message-intermediate-throw": JOB_WORKER_KEYWORDS,
			"message-end": JOB_WORKER_KEYWORDS
		}
	}
};
export { c8Stack };

//# sourceMappingURL=c8-COBHyc91.js.map