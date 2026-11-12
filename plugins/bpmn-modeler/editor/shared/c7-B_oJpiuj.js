import { i as __toCommonJS, t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { a as is, i as init_ModelUtil, n as getBusinessObject, o as isAny, t as ModelUtil_exports } from "./ModelUtil-BGe9jbj7.js";
import { C as isObject$1, O as matchPattern, P as some, T as isUndefined$1, _ as init_dist, g as has$1, u as find, y as isDefined } from "./EscapeUtil-B1jzPlMc.js";
import { Ct as add, Tt as remove, k as CommandInterceptor } from "./jsxRuntime.module-awBdvHUy.js";
import { c as TooltipProvider, h as removeExtensionElements, m as getExtensionElementsList, n as colors_default, o as index$2, p as DeleteParticipantBehaviour, r as CamundaVariableResolverModule, t as composeUpstreamModules, u as index } from "./sharedModules-BzDoO-Q2.js";
import { i as index$1, n as RemoveTemplatesModule, r as index$3 } from "./lib-CHaSAubE.js";
var camunda_default = {
	name: "Camunda",
	uri: "http://camunda.org/schema/1.0/bpmn",
	prefix: "camunda",
	xml: { "tagAlias": "lowerCase" },
	associations: [],
	types: [
		{
			"name": "Definitions",
			"isAbstract": true,
			"extends": ["bpmn:Definitions"],
			"properties": [{
				"name": "diagramRelationId",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "InOutBinding",
			"superClass": ["Element"],
			"isAbstract": true,
			"properties": [
				{
					"name": "source",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "sourceExpression",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "target",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "businessKey",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "local",
					"isAttr": true,
					"type": "Boolean",
					"default": false
				},
				{
					"name": "variables",
					"isAttr": true,
					"type": "String"
				}
			]
		},
		{
			"name": "In",
			"superClass": ["InOutBinding"],
			"meta": { "allowedIn": ["bpmn:CallActivity", "bpmn:SignalEventDefinition"] }
		},
		{
			"name": "Out",
			"superClass": ["InOutBinding"],
			"meta": { "allowedIn": ["bpmn:CallActivity"] }
		},
		{
			"name": "AsyncCapable",
			"isAbstract": true,
			"extends": [
				"bpmn:Activity",
				"bpmn:Gateway",
				"bpmn:Event"
			],
			"properties": [
				{
					"name": "async",
					"isAttr": true,
					"type": "Boolean",
					"default": false
				},
				{
					"name": "asyncBefore",
					"isAttr": true,
					"type": "Boolean",
					"default": false
				},
				{
					"name": "asyncAfter",
					"isAttr": true,
					"type": "Boolean",
					"default": false
				},
				{
					"name": "exclusive",
					"isAttr": true,
					"type": "Boolean",
					"default": true
				}
			]
		},
		{
			"name": "JobPriorized",
			"isAbstract": true,
			"extends": ["bpmn:Process", "camunda:AsyncCapable"],
			"properties": [{
				"name": "jobPriority",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "SignalEventDefinitionExtension",
			"isAbstract": true,
			"extends": ["bpmn:SignalEventDefinition"],
			"properties": [{
				"name": "async",
				"isAttr": true,
				"type": "Boolean",
				"default": false
			}]
		},
		{
			"name": "ErrorEventDefinitionExtension",
			"isAbstract": true,
			"extends": ["bpmn:ErrorEventDefinition"],
			"properties": [{
				"name": "errorCodeVariable",
				"isAttr": true,
				"type": "String"
			}, {
				"name": "errorMessageVariable",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "ErrorEventDefinition",
			"superClass": ["bpmn:ErrorEventDefinition", "Element"],
			"properties": [{
				"name": "expression",
				"isAttr": true,
				"type": "String"
			}],
			"meta": { "allowedIn": ["bpmn:ServiceTask"] }
		},
		{
			"name": "Error",
			"isAbstract": true,
			"extends": ["bpmn:Error"],
			"properties": [{
				"name": "camunda:errorMessage",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "PotentialStarter",
			"superClass": ["Element"],
			"properties": [{
				"name": "resourceAssignmentExpression",
				"type": "bpmn:ResourceAssignmentExpression"
			}]
		},
		{
			"name": "FormSupported",
			"isAbstract": true,
			"extends": ["bpmn:StartEvent", "bpmn:UserTask"],
			"properties": [
				{
					"name": "formHandlerClass",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "formKey",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "formRef",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "formRefBinding",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "formRefVersion",
					"isAttr": true,
					"type": "String"
				}
			]
		},
		{
			"name": "TemplateSupported",
			"isAbstract": true,
			"extends": [
				"bpmn:Collaboration",
				"bpmn:Process",
				"bpmn:FlowElement"
			],
			"properties": [{
				"name": "modelerTemplate",
				"isAttr": true,
				"type": "String"
			}, {
				"name": "modelerTemplateVersion",
				"isAttr": true,
				"type": "Integer"
			}]
		},
		{
			"name": "Initiator",
			"isAbstract": true,
			"extends": ["bpmn:StartEvent"],
			"properties": [{
				"name": "initiator",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "ScriptTask",
			"isAbstract": true,
			"extends": ["bpmn:ScriptTask"],
			"properties": [{
				"name": "resultVariable",
				"isAttr": true,
				"type": "String"
			}, {
				"name": "resource",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "Process",
			"isAbstract": true,
			"extends": ["bpmn:Process"],
			"properties": [
				{
					"name": "candidateStarterGroups",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "candidateStarterUsers",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "versionTag",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "historyTimeToLive",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "isStartableInTasklist",
					"isAttr": true,
					"type": "Boolean",
					"default": true
				}
			]
		},
		{
			"name": "EscalationEventDefinitionExtension",
			"isAbstract": true,
			"extends": ["bpmn:EscalationEventDefinition"],
			"properties": [{
				"name": "escalationCodeVariable",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "FormalExpression",
			"isAbstract": true,
			"extends": ["bpmn:FormalExpression"],
			"properties": [{
				"name": "resource",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "Assignable",
			"extends": ["bpmn:UserTask"],
			"properties": [
				{
					"name": "assignee",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "candidateUsers",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "candidateGroups",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "dueDate",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "followUpDate",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "priority",
					"isAttr": true,
					"type": "String"
				}
			]
		},
		{
			"name": "CallActivity",
			"extends": ["bpmn:CallActivity"],
			"properties": [
				{
					"name": "calledElementBinding",
					"isAttr": true,
					"type": "String",
					"default": "latest"
				},
				{
					"name": "calledElementVersion",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "calledElementVersionTag",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "calledElementTenantId",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "caseRef",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "caseBinding",
					"isAttr": true,
					"type": "String",
					"default": "latest"
				},
				{
					"name": "caseVersion",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "caseTenantId",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "variableMappingClass",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "variableMappingDelegateExpression",
					"isAttr": true,
					"type": "String"
				}
			]
		},
		{
			"name": "ServiceTaskLike",
			"extends": [
				"bpmn:ServiceTask",
				"bpmn:BusinessRuleTask",
				"bpmn:SendTask",
				"bpmn:MessageEventDefinition"
			],
			"properties": [
				{
					"name": "expression",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "class",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "delegateExpression",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "resultVariable",
					"isAttr": true,
					"type": "String"
				}
			]
		},
		{
			"name": "DmnCapable",
			"extends": ["bpmn:BusinessRuleTask"],
			"properties": [
				{
					"name": "decisionRef",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "decisionRefBinding",
					"isAttr": true,
					"type": "String",
					"default": "latest"
				},
				{
					"name": "decisionRefVersion",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "mapDecisionResult",
					"isAttr": true,
					"type": "String",
					"default": "resultList"
				},
				{
					"name": "decisionRefTenantId",
					"isAttr": true,
					"type": "String"
				}
			]
		},
		{
			"name": "ExternalCapable",
			"extends": ["camunda:ServiceTaskLike"],
			"properties": [{
				"name": "type",
				"isAttr": true,
				"type": "String"
			}, {
				"name": "topic",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "TaskPriorized",
			"extends": ["bpmn:Process", "camunda:ExternalCapable"],
			"properties": [{
				"name": "taskPriority",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "Properties",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["*"] },
			"properties": [{
				"name": "values",
				"type": "Property",
				"isMany": true
			}]
		},
		{
			"name": "Property",
			"superClass": ["Element"],
			"properties": [
				{
					"name": "id",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "name",
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
			"name": "Connector",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["camunda:ServiceTaskLike"] },
			"properties": [{
				"name": "inputOutput",
				"type": "InputOutput"
			}, {
				"name": "connectorId",
				"type": "String"
			}]
		},
		{
			"name": "InputOutput",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:FlowNode", "camunda:Connector"] },
			"properties": [
				{
					"name": "inputOutput",
					"type": "InputOutput"
				},
				{
					"name": "connectorId",
					"type": "String"
				},
				{
					"name": "inputParameters",
					"isMany": true,
					"type": "InputParameter"
				},
				{
					"name": "outputParameters",
					"isMany": true,
					"type": "OutputParameter"
				}
			]
		},
		{
			"name": "InputOutputParameter",
			"properties": [
				{
					"name": "name",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "value",
					"isBody": true,
					"type": "String"
				},
				{
					"name": "definition",
					"type": "InputOutputParameterDefinition"
				}
			]
		},
		{
			"name": "InputOutputParameterDefinition",
			"isAbstract": true
		},
		{
			"name": "List",
			"superClass": ["InputOutputParameterDefinition"],
			"properties": [{
				"name": "items",
				"isMany": true,
				"type": "InputOutputParameterDefinition"
			}]
		},
		{
			"name": "Map",
			"superClass": ["InputOutputParameterDefinition"],
			"properties": [{
				"name": "entries",
				"isMany": true,
				"type": "Entry"
			}]
		},
		{
			"name": "Entry",
			"properties": [
				{
					"name": "key",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "value",
					"isBody": true,
					"type": "String"
				},
				{
					"name": "definition",
					"type": "InputOutputParameterDefinition"
				}
			]
		},
		{
			"name": "Value",
			"superClass": ["InputOutputParameterDefinition"],
			"properties": [
				{
					"name": "id",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "name",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "value",
					"isBody": true,
					"type": "String"
				}
			]
		},
		{
			"name": "Script",
			"superClass": ["InputOutputParameterDefinition"],
			"properties": [
				{
					"name": "scriptFormat",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "resource",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "value",
					"isBody": true,
					"type": "String"
				}
			]
		},
		{
			"name": "Field",
			"superClass": ["Element"],
			"meta": { "allowedIn": [
				"camunda:ServiceTaskLike",
				"camunda:ExecutionListener",
				"camunda:TaskListener"
			] },
			"properties": [
				{
					"name": "name",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "expression",
					"type": "String"
				},
				{
					"name": "stringValue",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "string",
					"type": "String"
				}
			]
		},
		{
			"name": "InputParameter",
			"superClass": ["InputOutputParameter"]
		},
		{
			"name": "OutputParameter",
			"superClass": ["InputOutputParameter"]
		},
		{
			"name": "Collectable",
			"isAbstract": true,
			"extends": ["bpmn:MultiInstanceLoopCharacteristics"],
			"superClass": ["camunda:AsyncCapable"],
			"properties": [{
				"name": "collection",
				"isAttr": true,
				"type": "String"
			}, {
				"name": "elementVariable",
				"isAttr": true,
				"type": "String"
			}]
		},
		{
			"name": "FailedJobRetryTimeCycle",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["camunda:AsyncCapable", "bpmn:MultiInstanceLoopCharacteristics"] },
			"properties": [{
				"name": "body",
				"isBody": true,
				"type": "String"
			}]
		},
		{
			"name": "ExecutionListener",
			"superClass": ["Element"],
			"meta": { "allowedIn": [
				"bpmn:Task",
				"bpmn:ServiceTask",
				"bpmn:UserTask",
				"bpmn:BusinessRuleTask",
				"bpmn:ScriptTask",
				"bpmn:ReceiveTask",
				"bpmn:ManualTask",
				"bpmn:ExclusiveGateway",
				"bpmn:SequenceFlow",
				"bpmn:ParallelGateway",
				"bpmn:InclusiveGateway",
				"bpmn:EventBasedGateway",
				"bpmn:StartEvent",
				"bpmn:IntermediateCatchEvent",
				"bpmn:IntermediateThrowEvent",
				"bpmn:EndEvent",
				"bpmn:BoundaryEvent",
				"bpmn:CallActivity",
				"bpmn:SubProcess",
				"bpmn:Process"
			] },
			"properties": [
				{
					"name": "expression",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "class",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "delegateExpression",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "event",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "script",
					"type": "Script"
				},
				{
					"name": "fields",
					"type": "Field",
					"isMany": true
				}
			]
		},
		{
			"name": "TaskListener",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:UserTask"] },
			"properties": [
				{
					"name": "expression",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "class",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "delegateExpression",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "event",
					"isAttr": true,
					"type": "String"
				},
				{
					"name": "script",
					"type": "Script"
				},
				{
					"name": "fields",
					"type": "Field",
					"isMany": true
				},
				{
					"name": "id",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "eventDefinitions",
					"type": "bpmn:TimerEventDefinition",
					"isMany": true
				}
			]
		},
		{
			"name": "FormProperty",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:StartEvent", "bpmn:UserTask"] },
			"properties": [
				{
					"name": "id",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "name",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "type",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "required",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "readable",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "writable",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "variable",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "expression",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "datePattern",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "default",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "values",
					"type": "Value",
					"isMany": true
				}
			]
		},
		{
			"name": "FormData",
			"superClass": ["Element"],
			"meta": { "allowedIn": ["bpmn:StartEvent", "bpmn:UserTask"] },
			"properties": [{
				"name": "fields",
				"type": "FormField",
				"isMany": true
			}, {
				"name": "businessKey",
				"type": "String",
				"isAttr": true
			}]
		},
		{
			"name": "FormField",
			"superClass": ["Element"],
			"properties": [
				{
					"name": "id",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "label",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "type",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "datePattern",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "defaultValue",
					"type": "String",
					"isAttr": true
				},
				{
					"name": "properties",
					"type": "Properties"
				},
				{
					"name": "validation",
					"type": "Validation"
				},
				{
					"name": "values",
					"type": "Value",
					"isMany": true
				}
			]
		},
		{
			"name": "Validation",
			"superClass": ["Element"],
			"properties": [{
				"name": "constraints",
				"type": "Constraint",
				"isMany": true
			}]
		},
		{
			"name": "Constraint",
			"superClass": ["Element"],
			"properties": [{
				"name": "name",
				"type": "String",
				"isAttr": true
			}, {
				"name": "config",
				"type": "String",
				"isAttr": true
			}]
		},
		{
			"name": "ConditionalEventDefinitionExtension",
			"isAbstract": true,
			"extends": ["bpmn:ConditionalEventDefinition"],
			"properties": [{
				"name": "variableName",
				"isAttr": true,
				"type": "String"
			}, {
				"name": "variableEvents",
				"isAttr": true,
				"type": "String"
			}]
		}
	],
	emumerations: []
};
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/CopyPasteBehavior.js
init_ModelUtil();
init_dist();
var WILDCARD = "*";
var CopyPasteBehavior = class {
	constructor(eventBus) {
		eventBus.on("moddleCopy.canCopyProperty", (context) => {
			const { parent, property } = context;
			return this.canCopyProperty(property, parent);
		});
	}
	canCopyProperty(property, parent) {
		if (isObject$1(property) && !isAllowedInParent(property, parent)) return false;
		if (is(property, "camunda:InputOutput") && !this.canHostInputOutput(parent)) return false;
		if (isAny(property, ["camunda:Connector", "camunda:Field"]) && !this.canHostConnector(parent)) return false;
		if (is(property, "camunda:In") && !this.canHostIn(parent)) return false;
	}
	canHostInputOutput(parent) {
		if (getParent(parent, "camunda:Connector")) return true;
		const flowNode = getParent(parent, "bpmn:FlowNode");
		if (!flowNode) return false;
		if (isAny(flowNode, [
			"bpmn:StartEvent",
			"bpmn:Gateway",
			"bpmn:BoundaryEvent"
		])) return false;
		if (is(flowNode, "bpmn:SubProcess") && flowNode.get("triggeredByEvent")) return false;
		return true;
	}
	canHostConnector(parent) {
		const serviceTaskLike = getParent(parent, "camunda:ServiceTaskLike");
		if (is(serviceTaskLike, "bpmn:MessageEventDefinition")) return getParent(parent, "bpmn:IntermediateThrowEvent") || getParent(parent, "bpmn:EndEvent");
		return true;
	}
	canHostIn(parent) {
		if (getParent(parent, "bpmn:CallActivity")) return true;
		if (getParent(parent, "bpmn:SignalEventDefinition")) return getParent(parent, "bpmn:IntermediateThrowEvent") || getParent(parent, "bpmn:EndEvent");
		return true;
	}
};
CopyPasteBehavior.$inject = ["eventBus"];
function getParent(element, type) {
	if (!type) return element.$parent;
	if (is(element, type)) return element;
	if (!element.$parent) return;
	return getParent(element.$parent, type);
}
function isAllowedInParent(property, parent) {
	var descriptor = property.$type && property.$model.getTypeDescriptor(property.$type);
	var allowedIn = descriptor && descriptor.meta && descriptor.meta.allowedIn;
	if (!allowedIn || isWildcard(allowedIn)) return true;
	return some(allowedIn, function(type) {
		return getParent(parent, type);
	});
}
function isWildcard(allowedIn) {
	return allowedIn.includes(WILDCARD);
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/CopyPasteRootElementBehavior.js
init_dist();
init_ModelUtil();
var LOW_PRIORITY$2 = 500;
var CopyPasteRootElementBehavior = class extends CommandInterceptor {
	constructor(bpmnFactory, bpmnjs, eventBus, moddleCopy) {
		super(eventBus);
		function hasRootElement(rootElement) {
			const rootElements = bpmnjs.getDefinitions().get("rootElements");
			return !!find(rootElements, matchPattern({ id: rootElement.get("id") }));
		}
		this.executed("shape.create", (context) => {
			const { shape } = context;
			const businessObject = getBusinessObject(shape);
			if (!canHaveNestedRootElementReference(businessObject)) return;
			const referencedRootElements = getRootElements(businessObject, getReferencingElement(shape)), rootElements = bpmnjs.getDefinitions().get("rootElements");
			context.addedRootElements = [];
			referencedRootElements.forEach((reference) => {
				const { referencedElement } = reference;
				if (referencedElement && !hasRootElement(referencedElement)) {
					add(rootElements, referencedElement);
					context.addedRootElements.push(referencedElement);
				}
			});
		}, true);
		this.reverted("shape.create", (context) => {
			const { addedRootElements } = context;
			if (!addedRootElements) return;
			const rootElements = bpmnjs.getDefinitions().get("rootElements");
			addedRootElements.forEach((addedRootElement) => {
				remove(rootElements, addedRootElement);
			});
		}, true);
		eventBus.on("copyPaste.copyElement", function(context) {
			const { descriptor, element } = context;
			const businessObject = getBusinessObject(element);
			if (element.labelTarget || !canHaveNestedRootElementReference(businessObject)) return;
			const rootElements = getRootElements(businessObject, getReferencingElement(element));
			if (rootElements) descriptor.referencedRootElements = rootElements;
		});
		eventBus.on("copyPaste.pasteElement", LOW_PRIORITY$2, (context) => {
			const { descriptor } = context;
			const { businessObject, referencedRootElements } = descriptor;
			if (!referencedRootElements) return;
			referencedRootElements.forEach((reference) => {
				let { idx, referencedElement } = reference;
				if (!referencedElement) return;
				if (!hasRootElement(referencedElement)) referencedElement = moddleCopy.copyElement(referencedElement, bpmnFactory.create(referencedElement.$type));
				setRootElement(businessObject, referencedElement, idx);
			});
			delete descriptor.referencedRootElements;
		});
	}
};
CopyPasteRootElementBehavior.$inject = [
	"bpmnFactory",
	"bpmnjs",
	"eventBus",
	"moddleCopy"
];
function getReferencingElement(element) {
	if (is(element, "bpmn:ServiceTask")) return "camunda:ErrorEventDefinition";
}
function getRootElementReferencePropertyName(bo) {
	if (is(bo, "camunda:ErrorEventDefinition")) return "errorRef";
}
function canHaveNestedRootElementReference(businessObject) {
	return is(businessObject, "bpmn:ServiceTask") && businessObject.get("type") === "external";
}
function getRootElements(businessObject, extensionElementType) {
	const extensionElements = businessObject.get("extensionElements");
	if (!extensionElements) return [];
	return extensionElements.get("values").filter((element) => is(element, extensionElementType)).reduce((result, element) => {
		const referencedElement = element.get(getRootElementReferencePropertyName(element));
		if (referencedElement) result.push({
			idx: getExtensionElementId(businessObject, element),
			referencedElement
		});
		return result;
	}, []);
}
function setRootElement(businessObject, rootElement, index) {
	const extensionElement = businessObject.get("extensionElements").get("values")[index];
	extensionElement.set(getRootElementReferencePropertyName(extensionElement), rootElement);
}
function getExtensionElementId(businessObject, extensionElement) {
	const extensionElements = businessObject.get("extensionElements");
	if (!extensionElements) return -1;
	return extensionElements.get("values").indexOf(extensionElement);
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/DeleteErrorEventDefinitionBehavior.js
init_ModelUtil();
var HIGH_PRIORITY$3 = 5e3;
var DeleteErrorEventDefinitionBehavior = class extends CommandInterceptor {
	constructor(commandStack, eventBus) {
		super(eventBus);
		this.postExecute(["element.updateProperties", "element.updateModdleProperties"], HIGH_PRIORITY$3, function(context) {
			const { element, moddleElement, properties } = context;
			const businessObject = moddleElement || getBusinessObject(element);
			if (is(element, "camunda:ExternalCapable") && is(businessObject, "camunda:ExternalCapable") && properties["camunda:type"] !== "external") {
				const errorEventDefinitions = getExtensionElementsList(businessObject, "camunda:ErrorEventDefinition");
				if (errorEventDefinitions.length) removeExtensionElements(element, businessObject, errorEventDefinitions, commandStack);
			}
		}, true);
	}
};
DeleteErrorEventDefinitionBehavior.$inject = ["commandStack", "eventBus"];
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/DeleteRetryTimeCycleBehavior.js
init_ModelUtil();
var HIGH_PRIORITY$2 = 5e3;
var DeleteRetryTimeCycleBehavior = class extends CommandInterceptor {
	constructor(commandStack, eventBus) {
		super(eventBus);
		this.postExecute(["element.updateProperties", "element.updateModdleProperties"], HIGH_PRIORITY$2, function(context) {
			const { element, moddleElement, properties = {} } = context;
			const asyncAfter = properties["camunda:asyncAfter"], asyncBefore = properties["camunda:asyncBefore"];
			const businessObject = moddleElement || getBusinessObject(element);
			const failedJobRetryTimeCycle = getFailedJobRetryTimeCycle(element);
			if (!is(element, "camunda:AsyncCapable") || !is(businessObject, "camunda:AsyncCapable") || asyncAfter !== false && asyncBefore !== false || !failedJobRetryTimeCycle || getTimerEventDefinition(element) || isAsyncBefore$1(businessObject) || isAsyncAfter$1(businessObject)) return;
			removeExtensionElements(element, businessObject, failedJobRetryTimeCycle, commandStack);
		}, true);
	}
};
DeleteRetryTimeCycleBehavior.$inject = ["commandStack", "eventBus"];
function isAsyncBefore$1(businessObject) {
	return !!(businessObject.get("camunda:asyncBefore") || businessObject.get("camunda:async"));
}
function isAsyncAfter$1(businessObject) {
	return !!businessObject.get("camunda:asyncAfter");
}
function getFailedJobRetryTimeCycle(element) {
	return getExtensionElementsList(element, "camunda:FailedJobRetryTimeCycle")[0];
}
function getTimerEventDefinition(element) {
	return getEventDefinition(element, "bpmn:TimerEventDefinition");
}
function getEventDefinition(element, type) {
	const eventDefinitions = getBusinessObject(element).get("eventDefinitions");
	if (!eventDefinitions || !eventDefinitions.length) return;
	return eventDefinitions.find((eventDefinition) => {
		return is(eventDefinition, type);
	});
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/OrderExtensionElementsBehavior.js
init_ModelUtil();
var LOW_PRIORITY$1 = 250;
var OrderExtensionElementsBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling) {
		super(eventBus);
		this._modeling = modeling;
		this.postExecuted(["element.updateProperties", "element.updateModdleProperties"], LOW_PRIORITY$1, (context) => {
			const element = context.shape || context.newShape || context.element;
			if (is(element, "bpmn:CallActivity")) this.orderCallActivityExtensionElements(element);
		}, true);
	}
	orderCallActivityExtensionElements(element) {
		const extensionElements = element.businessObject.get("extensionElements");
		if (!extensionElements) return;
		const { input, output, rest } = getExtensionElementsList(element).reduce((acc, element) => {
			if (is(element, "camunda:In")) acc.input.push(element);
			else if (is(element, "camunda:Out")) acc.output.push(element);
			else acc.rest.push(element);
			return acc;
		}, {
			input: [],
			output: [],
			rest: []
		});
		shiftVariablesToFront(input);
		shiftVariablesToFront(output);
		const values = [
			...input,
			...output,
			...rest
		];
		const oldValues = extensionElements.get("values");
		if (JSON.stringify(oldValues) === JSON.stringify(values)) return;
		this._modeling.updateModdleProperties(element, extensionElements, { values });
	}
};
OrderExtensionElementsBehavior.$inject = ["eventBus", "modeling"];
function shiftVariablesToFront(array) {
	const variablesIndex = array.findIndex((item) => !!item.variables);
	if (variablesIndex > 0) {
		const variablesItem = array.splice(variablesIndex, 1)[0];
		array.unshift(variablesItem);
	}
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/RemoveInitiatorBehaviour.js
init_dist();
init_ModelUtil();
var RemoveInitiatorBehaviour = class extends CommandInterceptor {
	constructor(eventBus, modeling) {
		super(eventBus);
		this.postExecuted(["shape.create", "shape.move"], (context) => {
			const { shape, parent, newParent = parent } = context;
			const businessObject = getBusinessObject(shape);
			if (is(shape, "bpmn:StartEvent") && isDefined(businessObject.get("camunda:initiator"))) {
				if (is(newParent || parent, "bpmn:SubProcess")) modeling.updateProperties(shape, { "camunda:initiator": void 0 });
			}
		}, true);
	}
};
RemoveInitiatorBehaviour.$inject = ["eventBus", "modeling"];
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/RemoveVariableEventBehaviour.js
init_ModelUtil();
var RemoveVariableEventBehaviour = class extends CommandInterceptor {
	constructor(bpmnFactory, eventBus, moddleCopy, modeling) {
		super(eventBus);
		this.postExecuted(["shape.create", "shape.move"], (context) => {
			const { parent, newParent = parent, shape } = context;
			const newParentBusinessObject = getBusinessObject(newParent), shapeBusinessObject = getBusinessObject(shape);
			if (is(shape, "bpmn:StartEvent")) {
				if (!(is(newParent, "bpmn:SubProcess") && newParentBusinessObject.get("triggeredByEvent"))) {
					const eventDefinitions = shapeBusinessObject.get("eventDefinitions").slice();
					if (eventDefinitions.reduce((update, eventDefinition, index) => {
						if (!is(eventDefinition, "bpmn:ConditionalEventDefinition")) return;
						if (eventDefinition.get("camunda:variableEvents")) {
							const conditionalEventDefinition = bpmnFactory.create("bpmn:ConditionalEventDefinition");
							moddleCopy.copyElement(eventDefinition, conditionalEventDefinition);
							conditionalEventDefinition.$parent = eventDefinition.$parent;
							conditionalEventDefinition.variableEvents = void 0;
							eventDefinitions[index] = conditionalEventDefinition;
							return true;
						}
						return update;
					}, false)) modeling.updateProperties(shape, { eventDefinitions });
				}
			}
		}, true);
	}
};
RemoveVariableEventBehaviour.$inject = [
	"bpmnFactory",
	"eventBus",
	"moddleCopy",
	"modeling"
];
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/UpdateCamundaExclusiveBehavior.js
init_ModelUtil();
var HIGH_PRIORITY$1 = 5e3;
var UpdateCamundaExclusiveBehavior = class extends CommandInterceptor {
	constructor(eventBus) {
		super(eventBus);
		this.preExecute(["element.updateProperties", "element.updateModdleProperties"], HIGH_PRIORITY$1, function(context) {
			const { element, moddleElement, properties = {} } = context;
			const businessObject = moddleElement || getBusinessObject(element);
			const asyncAfter = properties["camunda:asyncAfter"], asyncBefore = properties["camunda:asyncBefore"];
			if (!is(element, "camunda:AsyncCapable") || !is(businessObject, "camunda:AsyncCapable") || asyncAfter !== false && asyncBefore !== false || isExclusive(businessObject) || isAsyncAfter(businessObject) && asyncAfter !== false || isAsyncBefore(businessObject) && asyncBefore !== false || asyncAfter === true || asyncBefore === true) return;
			properties["camunda:exclusive"] = true;
		}, true);
	}
};
UpdateCamundaExclusiveBehavior.$inject = ["eventBus"];
function isAsyncBefore(businessObject) {
	return !!(businessObject.get("camunda:asyncBefore") || businessObject.get("camunda:async"));
}
function isAsyncAfter(businessObject) {
	return !!businessObject.get("camunda:asyncAfter");
}
function isExclusive(businessObject) {
	return !!businessObject.get("camunda:exclusive");
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/util/InputOutputUtil.js
function getInputParameters(inputOutput) {
	return inputOutput.get("inputParameters");
}
function getOutputParameters(inputOutput) {
	return inputOutput.get("outputParameters");
}
function isInputOutputEmpty(inputOutput) {
	const inputParameters = getInputParameters(inputOutput);
	const outputParameters = getOutputParameters(inputOutput);
	return !inputParameters.length && !outputParameters.length;
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/UpdateInputOutputBehavior.js
init_ModelUtil();
var LOW_PRIORITY = 250;
var UpdateInputOutputBehavior = class extends CommandInterceptor {
	constructor(commandStack, eventBus) {
		super(eventBus);
		this.postExecuted("element.updateModdleProperties", LOW_PRIORITY, function(context) {
			const { element, moddleElement } = context;
			if (!is(moddleElement, "camunda:InputOutput")) return;
			if (isInputOutputEmpty(moddleElement)) removeExtensionElements(element, getBusinessObject(element), moddleElement, commandStack);
		}, true);
	}
};
UpdateInputOutputBehavior.$inject = ["commandStack", "eventBus"];
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/UpdateResultVariableBehavior.js
init_ModelUtil();
init_dist();
var HIGH_PRIORITY = 5e3;
var UpdateResultVariableBehavior = class extends CommandInterceptor {
	constructor(eventBus) {
		super(eventBus);
		this.preExecute(["element.updateProperties", "element.updateModdleProperties"], HIGH_PRIORITY, function(context) {
			const { element, moddleElement, properties } = context;
			const businessObject = moddleElement || getBusinessObject(element);
			if (is(element, "camunda:DmnCapable") && is(businessObject, "camunda:DmnCapable") && has$1(properties, "camunda:resultVariable") && isEmpty(properties["camunda:resultVariable"])) properties["camunda:mapDecisionResult"] = void 0;
		}, true);
	}
};
UpdateResultVariableBehavior.$inject = ["eventBus"];
function isEmpty(value) {
	return value == void 0 || value === "";
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/UserTaskFormsBehavior.js
init_ModelUtil();
init_dist();
var UserTaskFormsBehavior$1 = class extends CommandInterceptor {
	constructor(eventBus) {
		super(eventBus);
		this.preExecute(["element.updateProperties", "element.updateModdleProperties"], function(context) {
			const { element, moddleElement, properties } = context;
			const businessObject = moddleElement || getBusinessObject(element);
			if (has$1(properties, "camunda:formKey")) Object.assign(properties, {
				"camunda:formRef": void 0,
				"camunda:formRefBinding": void 0,
				"camunda:formRefVersion": void 0
			});
			else if (has$1(properties, "camunda:formRef")) {
				Object.assign(properties, { "camunda:formKey": void 0 });
				if (isUndefined$1(properties["camunda:formRef"])) Object.assign(properties, {
					"camunda:formRefBinding": void 0,
					"camunda:formRefVersion": void 0
				});
				if (!has$1(properties, "camunda:formRefBinding") && isUndefined$1(businessObject.get("camunda:formRefBinding"))) Object.assign(properties, { "camunda:formRefBinding": "latest" });
			}
			if (has$1(properties, "camunda:formRefBinding") && properties["camunda:formRefBinding"] !== "version") Object.assign(properties, { "camunda:formRefVersion": void 0 });
		}, true);
	}
};
UserTaskFormsBehavior$1.$inject = ["eventBus"];
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/UserTaskGeneratedFormsBehavior.js
init_ModelUtil();
init_dist();
var UserTaskFormsBehavior = class extends CommandInterceptor {
	constructor(eventBus, modeling) {
		super(eventBus);
		this.preExecute("element.updateModdleProperties", function(context) {
			const { moddleElement, properties } = context;
			if (!is(moddleElement, "camunda:FormField")) return;
			if ("type" in properties && properties["type"] !== "enum" || "camunda:type" in properties && properties["camunda:type"] !== "enum") properties["camunda:values"] = void 0;
		}, true);
		this.preExecute("element.updateModdleProperties", function(context) {
			const { element, moddleElement, properties } = context;
			if (!is(moddleElement, "camunda:FormField") || !has$1(properties, "id") && !has$1(properties, "camunda:id")) return;
			const formData = getFormData(element);
			if (!formData.get("camunda:businessKey")) return;
			if (isBusinessKey(moddleElement, formData)) modeling.updateModdleProperties(element, formData, { "camunda:businessKey": has$1(properties, "id") ? properties.id : properties["camunda:id"] });
		}, true);
		this.postExecute("element.updateModdleProperties", function(context) {
			const { element, moddleElement, properties } = context;
			if (!is(moddleElement, "camunda:FormData") || !has$1(properties, "fields")) return;
			const businessKey = moddleElement.get("camunda:businessKey");
			if (!businessKey) return;
			if (!moddleElement.get("fields").find((field) => {
				return field.get("camunda:id") === businessKey;
			})) modeling.updateModdleProperties(element, moddleElement, { "camunda:businessKey": void 0 });
		}, true);
	}
};
UserTaskFormsBehavior.$inject = ["eventBus", "modeling"];
function isBusinessKey(formField, formData) {
	return formField.get("camunda:id") === formData.get("camunda:businessKey");
}
function getFormData(element) {
	const extensionElements = getBusinessObject(element).get("extensionElements");
	if (!extensionElements) return;
	return extensionElements.get("values").find((value) => {
		return is(value, "camunda:FormData");
	});
}
// ../../node_modules/camunda-bpmn-js-behaviors/lib/camunda-platform/index.js
var camunda_platform_default = {
	__init__: [
		"copyPasteBehavior",
		"copyPasteRootElementBehavior",
		"deleteErrorEventDefinitionBehavior",
		"deleteParticipantBehaviour",
		"deleteRetryTimeCycleBehavior",
		"orderExtensionElementsBehavior",
		"removeInitiatorBehaviour",
		"removeVariableEventBehaviour",
		"updateCamundaExclusiveBehavior",
		"updateResultVariableBehavior",
		"updateInputOutputBehavior",
		"userTaskFormsBehavior",
		"userTaskGeneratedFormsBehavior"
	],
	copyPasteBehavior: ["type", CopyPasteBehavior],
	copyPasteRootElementBehavior: ["type", CopyPasteRootElementBehavior],
	deleteErrorEventDefinitionBehavior: ["type", DeleteErrorEventDefinitionBehavior],
	deleteParticipantBehaviour: ["type", DeleteParticipantBehaviour],
	deleteRetryTimeCycleBehavior: ["type", DeleteRetryTimeCycleBehavior],
	orderExtensionElementsBehavior: ["type", OrderExtensionElementsBehavior],
	removeInitiatorBehaviour: ["type", RemoveInitiatorBehaviour],
	removeVariableEventBehaviour: ["type", RemoveVariableEventBehaviour],
	updateCamundaExclusiveBehavior: ["type", UpdateCamundaExclusiveBehavior],
	updateResultVariableBehavior: ["type", UpdateResultVariableBehavior],
	updateInputOutputBehavior: ["type", UpdateInputOutputBehavior],
	userTaskFormsBehavior: ["type", UserTaskFormsBehavior$1],
	userTaskGeneratedFormsBehavior: ["type", UserTaskFormsBehavior]
};
// ../../node_modules/@miragon/create-append-c7/dist/ApplyTemplateOnShapeCreateBehavior.js
var require_ApplyTemplateOnShapeCreateBehavior = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ApplyTemplateOnShapeCreateBehavior = void 0;
	var APPLY_TEMPLATE_PRIORITY = 1500;
	var ApplyTemplateOnShapeCreateBehavior = class {
		constructor(eventBus, commandStack, templateElementFactory) {
			eventBus.on("commandStack.shape.create.postExecute", APPLY_TEMPLATE_PRIORITY, (event) => {
				const element = event.context.shape;
				const template = templateElementFactory.getPendingTemplate(element);
				if (!template) return;
				commandStack.execute("propertiesPanel.camunda.changeTemplate", {
					element,
					oldTemplate: null,
					newTemplate: omitElementType(template)
				});
				templateElementFactory.consumePendingTemplate(element);
			});
		}
	};
	exports.ApplyTemplateOnShapeCreateBehavior = ApplyTemplateOnShapeCreateBehavior;
	ApplyTemplateOnShapeCreateBehavior.$inject = [
		"eventBus",
		"commandStack",
		"c7TemplateElementFactory"
	];
	function omitElementType(template) {
		const { elementType: _elementType, ...templateWithoutElementType } = template;
		return templateWithoutElementType;
	}
}));
// ../../node_modules/@miragon/create-append-c7/dist/ExtendElementTemplates.js
var require_ExtendElementTemplates = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ExtendElementTemplates = void 0;
	var ExtendElementTemplates = class {
		constructor(elementTemplates, injector) {
			if (typeof elementTemplates.createElement === "function") return;
			const templateElementFactory = injector.get("c7TemplateElementFactory");
			injector.get("c7ApplyTemplateOnShapeCreateBehavior");
			elementTemplates.createElement = (template, options) => templateElementFactory.create(template, options);
		}
	};
	exports.ExtendElementTemplates = ExtendElementTemplates;
	ExtendElementTemplates.$inject = ["elementTemplates", "injector"];
}));
// ../../node_modules/@miragon/create-append-c7/dist/TemplateElementFactory.js
var require_TemplateElementFactory = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.TemplateElementFactory = void 0;
	var ModelUtil_1 = (init_ModelUtil(), __toCommonJS(ModelUtil_exports));
	var TemplateElementFactory = class {
		constructor(elementFactory) {
			this.pendingTemplates = new WeakMap();
			this.elementFactory = elementFactory;
		}
		create(template, options = {}) {
			if (!template) throw new Error("template is missing");
			if (options?.presetId !== void 0) throw new Error("C7 element template presets are not supported");
			const selectedTemplate = cloneTemplate(template);
			const type = selectedTemplate.elementType?.value ?? selectedTemplate.appliesTo?.[0];
			if (!type) throw new Error("template element type is missing");
			const attrs = { type };
			if (selectedTemplate.elementType?.eventDefinition) attrs.eventDefinitionType = selectedTemplate.elementType.eventDefinition;
			const element = this.elementFactory.createShape(attrs);
			const businessObject = (0, ModelUtil_1.getBusinessObject)(element);
			businessObject.set("camunda:modelerTemplate", selectedTemplate.id);
			businessObject.set("camunda:modelerTemplateVersion", selectedTemplate.version);
			this.pendingTemplates.set(element, selectedTemplate);
			return element;
		}
		getPendingTemplate(element) {
			return this.pendingTemplates.get(element);
		}
		consumePendingTemplate(element) {
			this.pendingTemplates.delete(element);
		}
	};
	exports.TemplateElementFactory = TemplateElementFactory;
	TemplateElementFactory.$inject = ["elementFactory"];
	function cloneTemplate(value) {
		if (Array.isArray(value)) return value.map((entry) => cloneTemplate(entry));
		if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneTemplate(entry)]));
		return value;
	}
}));
// ../../node_modules/camunda-transaction-boundaries/node_modules/min-dash/dist/index.esm.js
var import_dist = __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CreateAppendC7ElementTemplatesModule = void 0;
	var ApplyTemplateOnShapeCreateBehavior_1 = require_ApplyTemplateOnShapeCreateBehavior();
	var ExtendElementTemplates_1 = require_ExtendElementTemplates();
	var TemplateElementFactory_1 = require_TemplateElementFactory();
	exports.CreateAppendC7ElementTemplatesModule = {
		__init__: ["c7ExtendedElementTemplates"],
		c7ExtendedElementTemplates: ["type", ExtendElementTemplates_1.ExtendElementTemplates],
		c7TemplateElementFactory: ["type", TemplateElementFactory_1.TemplateElementFactory],
		c7ApplyTemplateOnShapeCreateBehavior: ["type", ApplyTemplateOnShapeCreateBehavior_1.ApplyTemplateOnShapeCreateBehavior]
	};
}))();
var nativeToString = Object.prototype.toString;
var nativeHasOwnProperty = Object.prototype.hasOwnProperty;
function isUndefined(obj) {
	return obj === void 0;
}
function isArray(obj) {
	return nativeToString.call(obj) === "[object Array]";
}
function isObject(obj) {
	return nativeToString.call(obj) === "[object Object]";
}
function has(target, key) {
	return nativeHasOwnProperty.call(target, key);
}
function forEach(collection, iterator) {
	var val, result;
	if (isUndefined(collection)) return;
	var convertKey = isArray(collection) ? toNum : identity;
	for (var key in collection) if (has(collection, key)) {
		val = collection[key];
		result = iterator(val, convertKey(key));
		if (result === false) return val;
	}
}
function identity(arg) {
	return arg;
}
function toNum(arg) {
	return Number(arg);
}
function _extends() {
	_extends = Object.assign || function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
function assign(target) {
	for (var _len = arguments.length, others = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) others[_key - 1] = arguments[_key];
	return _extends.apply(void 0, [target].concat(others));
}
// ../../node_modules/camunda-transaction-boundaries/lib/Util.js
function asTRBL(bounds) {
	return {
		top: bounds.y,
		right: bounds.x + (bounds.width || 0),
		bottom: bounds.y + (bounds.height || 0),
		left: bounds.x
	};
}
function getOrientation(rect, reference, padding) {
	padding = padding || 0;
	if (!isObject(padding)) padding = {
		x: padding,
		y: padding
	};
	var rectOrientation = asTRBL(rect), referenceOrientation = asTRBL(reference);
	var top = rectOrientation.bottom + padding.y <= referenceOrientation.top, right = rectOrientation.left - padding.x >= referenceOrientation.right, bottom = rectOrientation.top - padding.y >= referenceOrientation.bottom, left = rectOrientation.right + padding.x <= referenceOrientation.left;
	var vertical = top ? "top" : bottom ? "bottom" : null, horizontal = left ? "left" : right ? "right" : null;
	if (horizontal && vertical) return vertical + "-" + horizontal;
	else return horizontal || vertical || "intersect";
}
// ../../node_modules/camunda-transaction-boundaries/lib/TransactionBoundaries.js
function TransactionBoundaries(elementRegistry, overlays, eventBus, canvas) {
	this._overlays = overlays;
	this._elementRegistry = elementRegistry;
	this._canvas = canvas;
	this.active = false;
	this._renderedMarks = new Map();
	var self = this;
	eventBus.on("elements.changed", function() {
		if (self.active) self._sync();
	});
	eventBus.on("diagram.clear", function() {
		self._renderedMarks.clear();
	});
	eventBus.on("shape.remove", function(event) {
		self._renderedMarks.delete(event.element);
	});
}
TransactionBoundaries.$inject = [
	"elementRegistry",
	"overlays",
	"eventBus",
	"canvas"
];
TransactionBoundaries.prototype._getTransactionBoundaries = function(element) {
	var businessObject = element.businessObject, loopCharacteristics = businessObject.loopCharacteristics, eventDefinitions = businessObject.eventDefinitions || [], eventDefinitionType = eventDefinitions.length && eventDefinitions[0].$type;
	var isWaitStateTask = element.type === "bpmn:ReceiveTask" || element.type === "bpmn:UserTask" || element.type === "bpmn:ServiceTask" && businessObject.type === "external";
	var isWaitStateGateway = false;
	var isWaitStateEvent = element.type === "bpmn:IntermediateCatchEvent" && (eventDefinitionType === "bpmn:MessageEventDefinition" || eventDefinitionType === "bpmn:TimerEventDefinition" || eventDefinitionType === "bpmn:SignalEventDefinition" || eventDefinitionType === "bpmn:ConditionalEventDefinition");
	var isAsyncAfter = businessObject.asyncAfter || loopCharacteristics && loopCharacteristics.asyncAfter;
	var isAsyncBefore = businessObject.asyncBefore || loopCharacteristics && loopCharacteristics.asyncBefore;
	var boundariesBefore = isWaitStateTask || isWaitStateEvent || isWaitStateGateway || isAsyncBefore, boundariesAfter = isAsyncAfter;
	if (boundariesBefore || boundariesAfter) return {
		before: !!boundariesBefore,
		after: !!boundariesAfter
	};
};
TransactionBoundaries.prototype._getTransactionBoundaryElements = function() {
	var transactionBoundaryElements = [];
	var self = this;
	this._elementRegistry.forEach(function(element) {
		if (element.type === "label") return;
		var transactionBoundaries = self._getTransactionBoundaries(element);
		if (transactionBoundaries) transactionBoundaryElements.push(assign({ shape: element }, { boundaries: transactionBoundaries }));
	});
	return transactionBoundaryElements;
};
TransactionBoundaries.prototype._getMark = function(shape, waypoint) {
	var orientation = getOrientation(waypoint, shape, -7);
	if (orientation === "intersect") orientation = getOrientation(waypoint, shape, -20);
	var strokeWidth = 3, defaultLength = 20, margin = 0;
	var position = {};
	var height;
	var width;
	if (/left/.test(orientation)) {
		width = strokeWidth;
		height = defaultLength;
		position.left = -width - margin;
		position.top = waypoint.y - shape.y - defaultLength / 2;
	} else if (/right/.test(orientation)) {
		width = strokeWidth;
		height = defaultLength;
		position.right = shape.x + shape.width - waypoint.x - margin;
		position.top = waypoint.y - shape.y - defaultLength / 2;
	} else if (orientation === "top") {
		width = defaultLength;
		height = strokeWidth;
		position.left = waypoint.x - shape.x - defaultLength / 2;
		position.top = -height - margin;
	} else if (orientation === "bottom") {
		width = defaultLength;
		height = strokeWidth;
		position.bottom = -margin;
		position.left = waypoint.x - shape.x - defaultLength / 2;
	}
	return {
		position,
		width,
		height
	};
};
TransactionBoundaries.prototype._addOverlay = function(shape, mark) {
	return this._overlays.add(shape, "transaction-boundaries", {
		position: mark.position,
		html: "<div style=\"width: " + mark.width + "px; height: " + mark.height + "px; background: #ee0000; \"> </div>"
	});
};
TransactionBoundaries.prototype._getMarks = function(shape, boundaries) {
	var marks = [];
	var self = this;
	if (boundaries.before) {
		if (shape.incoming.length > 0) forEach(shape.incoming, function(connection) {
			if (connection.type !== "bpmn:SequenceFlow") return;
			var waypoint = connection.waypoints[connection.waypoints.length - 1];
			marks.push(self._getMark(shape, waypoint));
		});
		else marks.push(self._getMark(shape, {
			x: shape.x,
			y: shape.y + shape.height / 2
		}));
	}
	if (boundaries.after) {
		if (shape.outgoing.length > 0) forEach(shape.outgoing, function(connection) {
			if (connection.type !== "bpmn:SequenceFlow") return;
			var waypoint = connection.waypoints[0];
			marks.push(self._getMark(shape, waypoint));
		});
		else marks.push(self._getMark(shape, {
			x: shape.x + shape.width,
			y: shape.y + shape.height / 2
		}));
	}
	return marks;
};
TransactionBoundaries.prototype._sync = function() {
	var self = this;
	var staleShapes = new Set(this._renderedMarks.keys());
	forEach(this._getTransactionBoundaryElements(), function(element) {
		var shape = element.shape, marks = self._getMarks(shape, element.boundaries), key = JSON.stringify(marks), root = self._canvas.findRoot(shape), rendered = self._renderedMarks.get(shape);
		staleShapes.delete(shape);
		if (rendered && rendered.key === key && rendered.root === root) return;
		if (rendered) self._removeOverlays(rendered.overlayIds);
		self._renderedMarks.set(shape, {
			key,
			root,
			overlayIds: marks.map(function(mark) {
				return self._addOverlay(shape, mark);
			})
		});
	});
	staleShapes.forEach(function(shape) {
		self._removeOverlays(self._renderedMarks.get(shape).overlayIds);
		self._renderedMarks.delete(shape);
	});
};
TransactionBoundaries.prototype._removeOverlays = function(overlayIds) {
	var overlays = this._overlays;
	overlayIds.forEach(function(overlayId) {
		overlays.remove(overlayId);
	});
};
TransactionBoundaries.prototype.show = function() {
	this.active = true;
	this._sync();
};
TransactionBoundaries.prototype.hide = function() {
	this._overlays.remove({ type: "transaction-boundaries" });
	this._renderedMarks.clear();
	this.active = false;
};
TransactionBoundaries.prototype.toggle = function() {
	this.active ? this.hide() : this.show();
};
// ../../node_modules/camunda-transaction-boundaries/lib/index.js
var lib_default = {
	__init__: ["transactionBoundaries"],
	"transactionBoundaries": ["type", TransactionBoundaries]
};
// ../../packages/bpmn-modeler/src/engineStacks/c7.ts
var JAVA_IMPLEMENTATION_KEYWORDS = ["Java delegate", "External task"];
var c7Stack = {
	upstreamModules: composeUpstreamModules([
		camunda_platform_default,
		index,
		index$2,
		colors_default,
		index$1,
		CamundaVariableResolverModule,
		RemoveTemplatesModule
	]),
	engineModules: [
		index$3,
		import_dist.CreateAppendC7ElementTemplatesModule,
		lib_default
	],
	moddleExtensions: { camunda: camunda_default },
	propertiesPanelDefaults: { tooltip: TooltipProvider },
	popupMenuAnnotations: {
		descriptions: { "service-task": "Automated work carried out by a Java delegate, expression, or external task" },
		additionalKeywords: {
			"service-task": JAVA_IMPLEMENTATION_KEYWORDS,
			"send-task": JAVA_IMPLEMENTATION_KEYWORDS,
			"message-intermediate-throw": JAVA_IMPLEMENTATION_KEYWORDS,
			"message-end": JAVA_IMPLEMENTATION_KEYWORDS
		}
	}
};
export { c7Stack };

//# sourceMappingURL=c7-B_oJpiuj.js.map