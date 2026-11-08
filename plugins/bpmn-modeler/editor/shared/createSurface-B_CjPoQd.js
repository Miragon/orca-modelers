import { a as __toESM, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-7_rZTKki.js";
import { l as createFlushableDebounceInput, m as _defineProperty } from "./editorLayout-DyS83izk.js";
import { $ as Diagram, C as outline_default$1, Dt as getBBox, Gt as BaseRenderer, Ht as create, It as append, Jt as all, Kt as e, Lt as appendTo, Mt as selfAndChildren, Nt as componentsToPath, O as CommandInterceptor, P as movecanvas_default, Pt as createLine, Q as Text, Qt as clear, R as zoomscroll_default, Rt as attr, T as keyboard_move_default, U as selection_default, Ut as innerSVG, V as overlays_default, Wt as remove$1, Yt as assign, Z as translate_default, Zt as classes, an as Reader, ct as asTRBL, dn as DisposableStore, dt as getMid, en as delegate, et as rotate, fn as MutableDisposable, gn as NoModelerError, gt as isLabel$3, hn as observeCanvasSize, in as remove, ln as ThemeController, mn as isUsableViewbox, nt as translate, on as Writer, qt as Ids, rn as query, sn as Moddle, st as asBounds, tn as event, tt as transform, un as installCanvasFocusIndicator, w as change_support_default, zt as classes$1 } from "./jsxRuntime.module-C_nqa6u-.js";
import { n as parseEditableMode, r as surfaceModeSupports } from "../bpmn/main.js";
import { C as isObject, D as map, P as some, S as isNumber, _ as init_dist, g as has, i as assign$1, k as omit, l as filter, n as escapeHTML, o as debounce, p as forEach, r as domify, u as find, w as isString } from "./EscapeUtil-3RypN4fl.js";
import { a as is$1, i as init_ModelUtil, n as getBusinessObject, o as isAny$1, r as getDi } from "./ModelUtil-Qz7TgySP.js";
//#region ../../libs/modeler-types/src/referenceKind.ts
var REFERENCE_KIND_CAPABILITIES = {
	process: {
		availabilityStatus: false,
		preview: false
	},
	decision: {
		availabilityStatus: false,
		preview: false
	},
	form: {
		availabilityStatus: true,
		preview: true
	}
};
function referenceKindSupports(kind, capability) {
	return REFERENCE_KIND_CAPABILITIES[kind][capability];
}
//#endregion
//#region ../../node_modules/bpmn-moddle/dist/index.js
var dist_exports = __exportAll({ BpmnModdle: () => SimpleBpmnModdle });
init_dist();
function BpmnModdle(packages, options) {
	Moddle.call(this, packages, options);
}
BpmnModdle.prototype = Object.create(Moddle.prototype);
BpmnModdle.prototype.fromXML = function(xmlStr, typeName, options) {
	if (!isString(typeName)) {
		options = typeName;
		typeName = "bpmn:Definitions";
	}
	var reader = new Reader(assign$1({
		model: this,
		lax: true
	}, options));
	var rootHandler = reader.handler(typeName);
	return reader.fromXML(xmlStr, rootHandler);
};
BpmnModdle.prototype.toXML = function(element, options) {
	var writer = new Writer(options);
	return new Promise(function(resolve, reject) {
		try {
			return resolve({ xml: writer.toXML(element) });
		} catch (err) {
			return reject(err);
		}
	});
};
var packages = {
	bpmn: {
		name: "BPMN20",
		uri: "http://www.omg.org/spec/BPMN/20100524/MODEL",
		prefix: "bpmn",
		associations: [],
		types: [
			{
				name: "Interface",
				superClass: ["RootElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "operations",
						type: "Operation",
						isMany: true
					},
					{
						name: "implementationRef",
						isAttr: true,
						type: "String"
					}
				]
			},
			{
				name: "Operation",
				superClass: ["BaseElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "inMessageRef",
						type: "Message",
						isReference: true
					},
					{
						name: "outMessageRef",
						type: "Message",
						isReference: true
					},
					{
						name: "errorRef",
						type: "Error",
						isMany: true,
						isReference: true
					},
					{
						name: "implementationRef",
						isAttr: true,
						type: "String"
					}
				]
			},
			{
				name: "EndPoint",
				superClass: ["RootElement"]
			},
			{
				name: "Auditing",
				superClass: ["BaseElement"]
			},
			{
				name: "GlobalTask",
				superClass: ["CallableElement"],
				properties: [{
					name: "resources",
					type: "ResourceRole",
					isMany: true
				}]
			},
			{
				name: "Monitoring",
				superClass: ["BaseElement"]
			},
			{
				name: "Performer",
				superClass: ["ResourceRole"]
			},
			{
				name: "Process",
				superClass: ["FlowElementsContainer", "CallableElement"],
				properties: [
					{
						name: "processType",
						type: "ProcessType",
						isAttr: true
					},
					{
						name: "isClosed",
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "auditing",
						type: "Auditing"
					},
					{
						name: "monitoring",
						type: "Monitoring"
					},
					{
						name: "properties",
						type: "Property",
						isMany: true
					},
					{
						name: "laneSets",
						isMany: true,
						replaces: "FlowElementsContainer#laneSets",
						type: "LaneSet"
					},
					{
						name: "flowElements",
						isMany: true,
						replaces: "FlowElementsContainer#flowElements",
						type: "FlowElement"
					},
					{
						name: "artifacts",
						type: "Artifact",
						isMany: true
					},
					{
						name: "resources",
						type: "ResourceRole",
						isMany: true
					},
					{
						name: "correlationSubscriptions",
						type: "CorrelationSubscription",
						isMany: true
					},
					{
						name: "supports",
						type: "Process",
						isMany: true,
						isReference: true
					},
					{
						name: "definitionalCollaborationRef",
						type: "Collaboration",
						isAttr: true,
						isReference: true
					},
					{
						name: "isExecutable",
						isAttr: true,
						type: "Boolean"
					}
				]
			},
			{
				name: "LaneSet",
				superClass: ["BaseElement"],
				properties: [{
					name: "lanes",
					type: "Lane",
					isMany: true
				}, {
					name: "name",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "Lane",
				superClass: ["BaseElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "partitionElementRef",
						type: "BaseElement",
						isAttr: true,
						isReference: true
					},
					{
						name: "partitionElement",
						type: "BaseElement"
					},
					{
						name: "flowNodeRef",
						type: "FlowNode",
						isMany: true,
						isReference: true
					},
					{
						name: "childLaneSet",
						type: "LaneSet",
						xml: { serialize: "xsi:type" }
					}
				]
			},
			{
				name: "GlobalManualTask",
				superClass: ["GlobalTask"]
			},
			{
				name: "ManualTask",
				superClass: ["Task"]
			},
			{
				name: "UserTask",
				superClass: ["Task"],
				properties: [{
					name: "renderings",
					type: "Rendering",
					isMany: true
				}, {
					name: "implementation",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "Rendering",
				superClass: ["BaseElement"]
			},
			{
				name: "HumanPerformer",
				superClass: ["Performer"]
			},
			{
				name: "PotentialOwner",
				superClass: ["HumanPerformer"]
			},
			{
				name: "GlobalUserTask",
				superClass: ["GlobalTask"],
				properties: [{
					name: "implementation",
					isAttr: true,
					type: "String"
				}, {
					name: "renderings",
					type: "Rendering",
					isMany: true
				}]
			},
			{
				name: "Gateway",
				isAbstract: true,
				superClass: ["FlowNode"],
				properties: [{
					name: "gatewayDirection",
					type: "GatewayDirection",
					"default": "Unspecified",
					isAttr: true
				}]
			},
			{
				name: "EventBasedGateway",
				superClass: ["Gateway"],
				properties: [{
					name: "instantiate",
					"default": false,
					isAttr: true,
					type: "Boolean"
				}, {
					name: "eventGatewayType",
					type: "EventBasedGatewayType",
					isAttr: true,
					"default": "Exclusive"
				}]
			},
			{
				name: "ComplexGateway",
				superClass: ["Gateway"],
				properties: [{
					name: "activationCondition",
					type: "Expression",
					xml: { serialize: "xsi:type" }
				}, {
					name: "default",
					type: "SequenceFlow",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "ExclusiveGateway",
				superClass: ["Gateway"],
				properties: [{
					name: "default",
					type: "SequenceFlow",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "InclusiveGateway",
				superClass: ["Gateway"],
				properties: [{
					name: "default",
					type: "SequenceFlow",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "ParallelGateway",
				superClass: ["Gateway"]
			},
			{
				name: "RootElement",
				isAbstract: true,
				superClass: ["BaseElement"]
			},
			{
				name: "Relationship",
				superClass: ["BaseElement"],
				properties: [
					{
						name: "type",
						isAttr: true,
						type: "String"
					},
					{
						name: "direction",
						type: "RelationshipDirection",
						isAttr: true
					},
					{
						name: "source",
						isMany: true,
						isReference: true,
						type: "Element"
					},
					{
						name: "target",
						isMany: true,
						isReference: true,
						type: "Element"
					}
				]
			},
			{
				name: "BaseElement",
				isAbstract: true,
				properties: [
					{
						name: "id",
						isAttr: true,
						type: "String",
						isId: true
					},
					{
						name: "documentation",
						type: "Documentation",
						isMany: true
					},
					{
						name: "extensionDefinitions",
						type: "ExtensionDefinition",
						isMany: true,
						isReference: true
					},
					{
						name: "extensionElements",
						type: "ExtensionElements"
					}
				]
			},
			{
				name: "Extension",
				properties: [{
					name: "mustUnderstand",
					"default": false,
					isAttr: true,
					type: "Boolean"
				}, {
					name: "definition",
					type: "ExtensionDefinition",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "ExtensionDefinition",
				properties: [{
					name: "name",
					isAttr: true,
					type: "String"
				}, {
					name: "extensionAttributeDefinitions",
					type: "ExtensionAttributeDefinition",
					isMany: true
				}]
			},
			{
				name: "ExtensionAttributeDefinition",
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "type",
						isAttr: true,
						type: "String"
					},
					{
						name: "isReference",
						"default": false,
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "extensionDefinition",
						type: "ExtensionDefinition",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "ExtensionElements",
				properties: [
					{
						name: "valueRef",
						isAttr: true,
						isReference: true,
						type: "Element"
					},
					{
						name: "values",
						type: "Element",
						isMany: true
					},
					{
						name: "extensionAttributeDefinition",
						type: "ExtensionAttributeDefinition",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "Documentation",
				superClass: ["BaseElement"],
				properties: [{
					name: "text",
					type: "String",
					isBody: true
				}, {
					name: "textFormat",
					"default": "text/plain",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "Event",
				isAbstract: true,
				superClass: ["FlowNode", "InteractionNode"],
				properties: [{
					name: "properties",
					type: "Property",
					isMany: true
				}]
			},
			{
				name: "IntermediateCatchEvent",
				superClass: ["CatchEvent"]
			},
			{
				name: "IntermediateThrowEvent",
				superClass: ["ThrowEvent"]
			},
			{
				name: "EndEvent",
				superClass: ["ThrowEvent"]
			},
			{
				name: "StartEvent",
				superClass: ["CatchEvent"],
				properties: [{
					name: "isInterrupting",
					"default": true,
					isAttr: true,
					type: "Boolean"
				}]
			},
			{
				name: "ThrowEvent",
				isAbstract: true,
				superClass: ["Event"],
				properties: [
					{
						name: "dataInputs",
						type: "DataInput",
						isMany: true
					},
					{
						name: "dataInputAssociations",
						type: "DataInputAssociation",
						isMany: true
					},
					{
						name: "inputSet",
						type: "InputSet"
					},
					{
						name: "eventDefinitions",
						type: "EventDefinition",
						isMany: true
					},
					{
						name: "eventDefinitionRef",
						type: "EventDefinition",
						isMany: true,
						isReference: true
					}
				]
			},
			{
				name: "CatchEvent",
				isAbstract: true,
				superClass: ["Event"],
				properties: [
					{
						name: "parallelMultiple",
						isAttr: true,
						type: "Boolean",
						"default": false
					},
					{
						name: "dataOutputs",
						type: "DataOutput",
						isMany: true
					},
					{
						name: "dataOutputAssociations",
						type: "DataOutputAssociation",
						isMany: true
					},
					{
						name: "outputSet",
						type: "OutputSet"
					},
					{
						name: "eventDefinitions",
						type: "EventDefinition",
						isMany: true
					},
					{
						name: "eventDefinitionRef",
						type: "EventDefinition",
						isMany: true,
						isReference: true
					}
				]
			},
			{
				name: "BoundaryEvent",
				superClass: ["CatchEvent"],
				properties: [{
					name: "cancelActivity",
					"default": true,
					isAttr: true,
					type: "Boolean"
				}, {
					name: "attachedToRef",
					type: "Activity",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "EventDefinition",
				isAbstract: true,
				superClass: ["RootElement"]
			},
			{
				name: "CancelEventDefinition",
				superClass: ["EventDefinition"]
			},
			{
				name: "ErrorEventDefinition",
				superClass: ["EventDefinition"],
				properties: [{
					name: "errorRef",
					type: "Error",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "TerminateEventDefinition",
				superClass: ["EventDefinition"]
			},
			{
				name: "EscalationEventDefinition",
				superClass: ["EventDefinition"],
				properties: [{
					name: "escalationRef",
					type: "Escalation",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "Escalation",
				properties: [
					{
						name: "structureRef",
						type: "ItemDefinition",
						isAttr: true,
						isReference: true
					},
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "escalationCode",
						isAttr: true,
						type: "String"
					}
				],
				superClass: ["RootElement"]
			},
			{
				name: "CompensateEventDefinition",
				superClass: ["EventDefinition"],
				properties: [{
					name: "waitForCompletion",
					isAttr: true,
					type: "Boolean",
					"default": true
				}, {
					name: "activityRef",
					type: "Activity",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "TimerEventDefinition",
				superClass: ["EventDefinition"],
				properties: [
					{
						name: "timeDate",
						type: "Expression",
						xml: { serialize: "xsi:type" }
					},
					{
						name: "timeCycle",
						type: "Expression",
						xml: { serialize: "xsi:type" }
					},
					{
						name: "timeDuration",
						type: "Expression",
						xml: { serialize: "xsi:type" }
					}
				]
			},
			{
				name: "LinkEventDefinition",
				superClass: ["EventDefinition"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "target",
						type: "LinkEventDefinition",
						isReference: true
					},
					{
						name: "source",
						type: "LinkEventDefinition",
						isMany: true,
						isReference: true
					}
				]
			},
			{
				name: "MessageEventDefinition",
				superClass: ["EventDefinition"],
				properties: [{
					name: "messageRef",
					type: "Message",
					isAttr: true,
					isReference: true
				}, {
					name: "operationRef",
					type: "Operation",
					isReference: true
				}]
			},
			{
				name: "ConditionalEventDefinition",
				superClass: ["EventDefinition"],
				properties: [{
					name: "condition",
					type: "Expression",
					xml: { serialize: "xsi:type" }
				}]
			},
			{
				name: "SignalEventDefinition",
				superClass: ["EventDefinition"],
				properties: [{
					name: "signalRef",
					type: "Signal",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "Signal",
				superClass: ["RootElement"],
				properties: [{
					name: "structureRef",
					type: "ItemDefinition",
					isAttr: true,
					isReference: true
				}, {
					name: "name",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "ImplicitThrowEvent",
				superClass: ["ThrowEvent"]
			},
			{
				name: "DataState",
				superClass: ["BaseElement"],
				properties: [{
					name: "name",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "ItemAwareElement",
				superClass: ["BaseElement"],
				properties: [{
					name: "itemSubjectRef",
					type: "ItemDefinition",
					isAttr: true,
					isReference: true
				}, {
					name: "dataState",
					type: "DataState"
				}]
			},
			{
				name: "DataAssociation",
				superClass: ["BaseElement"],
				properties: [
					{
						name: "sourceRef",
						type: "ItemAwareElement",
						isMany: true,
						isReference: true
					},
					{
						name: "targetRef",
						type: "ItemAwareElement",
						isReference: true
					},
					{
						name: "transformation",
						type: "FormalExpression",
						xml: { serialize: "property" }
					},
					{
						name: "assignment",
						type: "Assignment",
						isMany: true
					}
				]
			},
			{
				name: "DataInput",
				superClass: ["ItemAwareElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "isCollection",
						"default": false,
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "inputSetRef",
						type: "InputSet",
						isMany: true,
						isVirtual: true,
						isReference: true
					},
					{
						name: "inputSetWithOptional",
						type: "InputSet",
						isMany: true,
						isVirtual: true,
						isReference: true
					},
					{
						name: "inputSetWithWhileExecuting",
						type: "InputSet",
						isMany: true,
						isVirtual: true,
						isReference: true
					}
				]
			},
			{
				name: "DataOutput",
				superClass: ["ItemAwareElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "isCollection",
						"default": false,
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "outputSetRef",
						type: "OutputSet",
						isMany: true,
						isVirtual: true,
						isReference: true
					},
					{
						name: "outputSetWithOptional",
						type: "OutputSet",
						isMany: true,
						isVirtual: true,
						isReference: true
					},
					{
						name: "outputSetWithWhileExecuting",
						type: "OutputSet",
						isMany: true,
						isVirtual: true,
						isReference: true
					}
				]
			},
			{
				name: "InputSet",
				superClass: ["BaseElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "dataInputRefs",
						type: "DataInput",
						isMany: true,
						isReference: true
					},
					{
						name: "optionalInputRefs",
						type: "DataInput",
						isMany: true,
						isReference: true
					},
					{
						name: "whileExecutingInputRefs",
						type: "DataInput",
						isMany: true,
						isReference: true
					},
					{
						name: "outputSetRefs",
						type: "OutputSet",
						isMany: true,
						isReference: true
					}
				]
			},
			{
				name: "OutputSet",
				superClass: ["BaseElement"],
				properties: [
					{
						name: "dataOutputRefs",
						type: "DataOutput",
						isMany: true,
						isReference: true
					},
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "inputSetRefs",
						type: "InputSet",
						isMany: true,
						isReference: true
					},
					{
						name: "optionalOutputRefs",
						type: "DataOutput",
						isMany: true,
						isReference: true
					},
					{
						name: "whileExecutingOutputRefs",
						type: "DataOutput",
						isMany: true,
						isReference: true
					}
				]
			},
			{
				name: "Property",
				superClass: ["ItemAwareElement"],
				properties: [{
					name: "name",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "DataInputAssociation",
				superClass: ["DataAssociation"]
			},
			{
				name: "DataOutputAssociation",
				superClass: ["DataAssociation"]
			},
			{
				name: "InputOutputSpecification",
				superClass: ["BaseElement"],
				properties: [
					{
						name: "dataInputs",
						type: "DataInput",
						isMany: true
					},
					{
						name: "dataOutputs",
						type: "DataOutput",
						isMany: true
					},
					{
						name: "inputSets",
						type: "InputSet",
						isMany: true
					},
					{
						name: "outputSets",
						type: "OutputSet",
						isMany: true
					}
				]
			},
			{
				name: "DataObject",
				superClass: ["FlowElement", "ItemAwareElement"],
				properties: [{
					name: "isCollection",
					"default": false,
					isAttr: true,
					type: "Boolean"
				}]
			},
			{
				name: "InputOutputBinding",
				properties: [
					{
						name: "inputDataRef",
						type: "InputSet",
						isAttr: true,
						isReference: true
					},
					{
						name: "outputDataRef",
						type: "OutputSet",
						isAttr: true,
						isReference: true
					},
					{
						name: "operationRef",
						type: "Operation",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "Assignment",
				superClass: ["BaseElement"],
				properties: [{
					name: "from",
					type: "Expression",
					xml: { serialize: "xsi:type" }
				}, {
					name: "to",
					type: "Expression",
					xml: { serialize: "xsi:type" }
				}]
			},
			{
				name: "DataStore",
				superClass: ["RootElement", "ItemAwareElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "capacity",
						isAttr: true,
						type: "Integer"
					},
					{
						name: "isUnlimited",
						"default": true,
						isAttr: true,
						type: "Boolean"
					}
				]
			},
			{
				name: "DataStoreReference",
				superClass: ["ItemAwareElement", "FlowElement"],
				properties: [{
					name: "dataStoreRef",
					type: "DataStore",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "DataObjectReference",
				superClass: ["ItemAwareElement", "FlowElement"],
				properties: [{
					name: "dataObjectRef",
					type: "DataObject",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "ConversationLink",
				superClass: ["BaseElement"],
				properties: [
					{
						name: "sourceRef",
						type: "InteractionNode",
						isAttr: true,
						isReference: true
					},
					{
						name: "targetRef",
						type: "InteractionNode",
						isAttr: true,
						isReference: true
					},
					{
						name: "name",
						isAttr: true,
						type: "String"
					}
				]
			},
			{
				name: "ConversationAssociation",
				superClass: ["BaseElement"],
				properties: [{
					name: "innerConversationNodeRef",
					type: "ConversationNode",
					isAttr: true,
					isReference: true
				}, {
					name: "outerConversationNodeRef",
					type: "ConversationNode",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "CallConversation",
				superClass: ["ConversationNode"],
				properties: [{
					name: "calledCollaborationRef",
					type: "Collaboration",
					isAttr: true,
					isReference: true
				}, {
					name: "participantAssociations",
					type: "ParticipantAssociation",
					isMany: true
				}]
			},
			{
				name: "Conversation",
				superClass: ["ConversationNode"]
			},
			{
				name: "SubConversation",
				superClass: ["ConversationNode"],
				properties: [{
					name: "conversationNodes",
					type: "ConversationNode",
					isMany: true
				}]
			},
			{
				name: "ConversationNode",
				isAbstract: true,
				superClass: ["InteractionNode", "BaseElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "participantRef",
						type: "Participant",
						isMany: true,
						isReference: true
					},
					{
						name: "messageFlowRefs",
						type: "MessageFlow",
						isMany: true,
						isReference: true
					},
					{
						name: "correlationKeys",
						type: "CorrelationKey",
						isMany: true
					}
				]
			},
			{
				name: "GlobalConversation",
				superClass: ["Collaboration"]
			},
			{
				name: "PartnerEntity",
				superClass: ["RootElement"],
				properties: [{
					name: "name",
					isAttr: true,
					type: "String"
				}, {
					name: "participantRef",
					type: "Participant",
					isMany: true,
					isReference: true
				}]
			},
			{
				name: "PartnerRole",
				superClass: ["RootElement"],
				properties: [{
					name: "name",
					isAttr: true,
					type: "String"
				}, {
					name: "participantRef",
					type: "Participant",
					isMany: true,
					isReference: true
				}]
			},
			{
				name: "CorrelationProperty",
				superClass: ["RootElement"],
				properties: [
					{
						name: "correlationPropertyRetrievalExpression",
						type: "CorrelationPropertyRetrievalExpression",
						isMany: true
					},
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "type",
						type: "ItemDefinition",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "Error",
				superClass: ["RootElement"],
				properties: [
					{
						name: "structureRef",
						type: "ItemDefinition",
						isAttr: true,
						isReference: true
					},
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "errorCode",
						isAttr: true,
						type: "String"
					}
				]
			},
			{
				name: "CorrelationKey",
				superClass: ["BaseElement"],
				properties: [{
					name: "correlationPropertyRef",
					type: "CorrelationProperty",
					isMany: true,
					isReference: true
				}, {
					name: "name",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "Expression",
				superClass: ["BaseElement"],
				isAbstract: false,
				properties: [{
					name: "body",
					isBody: true,
					type: "String"
				}]
			},
			{
				name: "FormalExpression",
				superClass: ["Expression"],
				properties: [{
					name: "language",
					isAttr: true,
					type: "String"
				}, {
					name: "evaluatesToTypeRef",
					type: "ItemDefinition",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "Message",
				superClass: ["RootElement"],
				properties: [{
					name: "name",
					isAttr: true,
					type: "String"
				}, {
					name: "itemRef",
					type: "ItemDefinition",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "ItemDefinition",
				superClass: ["RootElement"],
				properties: [
					{
						name: "itemKind",
						type: "ItemKind",
						isAttr: true
					},
					{
						name: "structureRef",
						isAttr: true,
						type: "String"
					},
					{
						name: "isCollection",
						"default": false,
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "import",
						type: "Import",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "FlowElement",
				isAbstract: true,
				superClass: ["BaseElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "auditing",
						type: "Auditing"
					},
					{
						name: "monitoring",
						type: "Monitoring"
					},
					{
						name: "categoryValueRef",
						type: "CategoryValue",
						isMany: true,
						isReference: true
					}
				]
			},
			{
				name: "SequenceFlow",
				superClass: ["FlowElement"],
				properties: [
					{
						name: "isImmediate",
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "conditionExpression",
						type: "Expression",
						xml: { serialize: "xsi:type" }
					},
					{
						name: "sourceRef",
						type: "FlowNode",
						isAttr: true,
						isReference: true
					},
					{
						name: "targetRef",
						type: "FlowNode",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "FlowElementsContainer",
				isAbstract: true,
				superClass: ["BaseElement"],
				properties: [{
					name: "laneSets",
					type: "LaneSet",
					isMany: true
				}, {
					name: "flowElements",
					type: "FlowElement",
					isMany: true
				}]
			},
			{
				name: "CallableElement",
				isAbstract: true,
				superClass: ["RootElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "ioSpecification",
						type: "InputOutputSpecification",
						xml: { serialize: "property" }
					},
					{
						name: "supportedInterfaceRef",
						type: "Interface",
						isMany: true,
						isReference: true
					},
					{
						name: "ioBinding",
						type: "InputOutputBinding",
						isMany: true,
						xml: { serialize: "property" }
					}
				]
			},
			{
				name: "FlowNode",
				isAbstract: true,
				superClass: ["FlowElement"],
				properties: [
					{
						name: "incoming",
						type: "SequenceFlow",
						isMany: true,
						isReference: true
					},
					{
						name: "outgoing",
						type: "SequenceFlow",
						isMany: true,
						isReference: true
					},
					{
						name: "lanes",
						type: "Lane",
						isMany: true,
						isVirtual: true,
						isReference: true
					}
				]
			},
			{
				name: "CorrelationPropertyRetrievalExpression",
				superClass: ["BaseElement"],
				properties: [{
					name: "messagePath",
					type: "FormalExpression"
				}, {
					name: "messageRef",
					type: "Message",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "CorrelationPropertyBinding",
				superClass: ["BaseElement"],
				properties: [{
					name: "dataPath",
					type: "FormalExpression"
				}, {
					name: "correlationPropertyRef",
					type: "CorrelationProperty",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "Resource",
				superClass: ["RootElement"],
				properties: [{
					name: "name",
					isAttr: true,
					type: "String"
				}, {
					name: "resourceParameters",
					type: "ResourceParameter",
					isMany: true
				}]
			},
			{
				name: "ResourceParameter",
				superClass: ["BaseElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "isRequired",
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "type",
						type: "ItemDefinition",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "CorrelationSubscription",
				superClass: ["BaseElement"],
				properties: [{
					name: "correlationKeyRef",
					type: "CorrelationKey",
					isAttr: true,
					isReference: true
				}, {
					name: "correlationPropertyBinding",
					type: "CorrelationPropertyBinding",
					isMany: true
				}]
			},
			{
				name: "MessageFlow",
				superClass: ["BaseElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "sourceRef",
						type: "InteractionNode",
						isAttr: true,
						isReference: true
					},
					{
						name: "targetRef",
						type: "InteractionNode",
						isAttr: true,
						isReference: true
					},
					{
						name: "messageRef",
						type: "Message",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "MessageFlowAssociation",
				superClass: ["BaseElement"],
				properties: [{
					name: "innerMessageFlowRef",
					type: "MessageFlow",
					isAttr: true,
					isReference: true
				}, {
					name: "outerMessageFlowRef",
					type: "MessageFlow",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "InteractionNode",
				isAbstract: true,
				properties: [{
					name: "incomingConversationLinks",
					type: "ConversationLink",
					isMany: true,
					isVirtual: true,
					isReference: true
				}, {
					name: "outgoingConversationLinks",
					type: "ConversationLink",
					isMany: true,
					isVirtual: true,
					isReference: true
				}]
			},
			{
				name: "Participant",
				superClass: ["InteractionNode", "BaseElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "interfaceRef",
						type: "Interface",
						isMany: true,
						isReference: true
					},
					{
						name: "participantMultiplicity",
						type: "ParticipantMultiplicity"
					},
					{
						name: "endPointRefs",
						type: "EndPoint",
						isMany: true,
						isReference: true
					},
					{
						name: "processRef",
						type: "Process",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "ParticipantAssociation",
				superClass: ["BaseElement"],
				properties: [{
					name: "innerParticipantRef",
					type: "Participant",
					isAttr: true,
					isReference: true
				}, {
					name: "outerParticipantRef",
					type: "Participant",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "ParticipantMultiplicity",
				properties: [{
					name: "minimum",
					"default": 0,
					isAttr: true,
					type: "Integer"
				}, {
					name: "maximum",
					"default": 1,
					isAttr: true,
					type: "Integer"
				}],
				superClass: ["BaseElement"]
			},
			{
				name: "Collaboration",
				superClass: ["RootElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "isClosed",
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "participants",
						type: "Participant",
						isMany: true
					},
					{
						name: "messageFlows",
						type: "MessageFlow",
						isMany: true
					},
					{
						name: "artifacts",
						type: "Artifact",
						isMany: true
					},
					{
						name: "conversations",
						type: "ConversationNode",
						isMany: true
					},
					{
						name: "conversationAssociations",
						type: "ConversationAssociation"
					},
					{
						name: "participantAssociations",
						type: "ParticipantAssociation",
						isMany: true
					},
					{
						name: "messageFlowAssociations",
						type: "MessageFlowAssociation",
						isMany: true
					},
					{
						name: "correlationKeys",
						type: "CorrelationKey",
						isMany: true
					},
					{
						name: "choreographyRef",
						type: "Choreography",
						isMany: true,
						isReference: true
					},
					{
						name: "conversationLinks",
						type: "ConversationLink",
						isMany: true
					}
				]
			},
			{
				name: "ChoreographyActivity",
				isAbstract: true,
				superClass: ["FlowNode"],
				properties: [
					{
						name: "participantRef",
						type: "Participant",
						isMany: true,
						isReference: true
					},
					{
						name: "initiatingParticipantRef",
						type: "Participant",
						isAttr: true,
						isReference: true
					},
					{
						name: "correlationKeys",
						type: "CorrelationKey",
						isMany: true
					},
					{
						name: "loopType",
						type: "ChoreographyLoopType",
						"default": "None",
						isAttr: true
					}
				]
			},
			{
				name: "CallChoreography",
				superClass: ["ChoreographyActivity"],
				properties: [{
					name: "calledChoreographyRef",
					type: "Choreography",
					isAttr: true,
					isReference: true
				}, {
					name: "participantAssociations",
					type: "ParticipantAssociation",
					isMany: true
				}]
			},
			{
				name: "SubChoreography",
				superClass: ["ChoreographyActivity", "FlowElementsContainer"],
				properties: [{
					name: "artifacts",
					type: "Artifact",
					isMany: true
				}]
			},
			{
				name: "ChoreographyTask",
				superClass: ["ChoreographyActivity"],
				properties: [{
					name: "messageFlowRef",
					type: "MessageFlow",
					isMany: true,
					isReference: true
				}]
			},
			{
				name: "Choreography",
				superClass: ["Collaboration", "FlowElementsContainer"]
			},
			{
				name: "GlobalChoreographyTask",
				superClass: ["Choreography"],
				properties: [{
					name: "initiatingParticipantRef",
					type: "Participant",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "TextAnnotation",
				superClass: ["Artifact"],
				properties: [{
					name: "text",
					type: "String"
				}, {
					name: "textFormat",
					"default": "text/plain",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "Group",
				superClass: ["Artifact"],
				properties: [{
					name: "categoryValueRef",
					type: "CategoryValue",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "Association",
				superClass: ["Artifact"],
				properties: [
					{
						name: "associationDirection",
						type: "AssociationDirection",
						isAttr: true
					},
					{
						name: "sourceRef",
						type: "BaseElement",
						isAttr: true,
						isReference: true
					},
					{
						name: "targetRef",
						type: "BaseElement",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "Category",
				superClass: ["RootElement"],
				properties: [{
					name: "categoryValue",
					type: "CategoryValue",
					isMany: true
				}, {
					name: "name",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "Artifact",
				isAbstract: true,
				superClass: ["BaseElement"]
			},
			{
				name: "CategoryValue",
				superClass: ["BaseElement"],
				properties: [{
					name: "categorizedFlowElements",
					type: "FlowElement",
					isMany: true,
					isVirtual: true,
					isReference: true
				}, {
					name: "value",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "Activity",
				isAbstract: true,
				superClass: ["FlowNode"],
				properties: [
					{
						name: "isForCompensation",
						"default": false,
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "default",
						type: "SequenceFlow",
						isAttr: true,
						isReference: true
					},
					{
						name: "ioSpecification",
						type: "InputOutputSpecification",
						xml: { serialize: "property" }
					},
					{
						name: "boundaryEventRefs",
						type: "BoundaryEvent",
						isMany: true,
						isReference: true
					},
					{
						name: "properties",
						type: "Property",
						isMany: true
					},
					{
						name: "dataInputAssociations",
						type: "DataInputAssociation",
						isMany: true
					},
					{
						name: "dataOutputAssociations",
						type: "DataOutputAssociation",
						isMany: true
					},
					{
						name: "startQuantity",
						"default": 1,
						isAttr: true,
						type: "Integer"
					},
					{
						name: "resources",
						type: "ResourceRole",
						isMany: true
					},
					{
						name: "completionQuantity",
						"default": 1,
						isAttr: true,
						type: "Integer"
					},
					{
						name: "loopCharacteristics",
						type: "LoopCharacteristics"
					}
				]
			},
			{
				name: "ServiceTask",
				superClass: ["Task"],
				properties: [{
					name: "implementation",
					isAttr: true,
					type: "String"
				}, {
					name: "operationRef",
					type: "Operation",
					isAttr: true,
					isReference: true
				}]
			},
			{
				name: "SubProcess",
				superClass: [
					"Activity",
					"FlowElementsContainer",
					"InteractionNode"
				],
				properties: [{
					name: "triggeredByEvent",
					"default": false,
					isAttr: true,
					type: "Boolean"
				}, {
					name: "artifacts",
					type: "Artifact",
					isMany: true
				}]
			},
			{
				name: "LoopCharacteristics",
				isAbstract: true,
				superClass: ["BaseElement"]
			},
			{
				name: "MultiInstanceLoopCharacteristics",
				superClass: ["LoopCharacteristics"],
				properties: [
					{
						name: "isSequential",
						"default": false,
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "behavior",
						type: "MultiInstanceBehavior",
						"default": "All",
						isAttr: true
					},
					{
						name: "loopCardinality",
						type: "Expression",
						xml: { serialize: "xsi:type" }
					},
					{
						name: "loopDataInputRef",
						type: "ItemAwareElement",
						isReference: true
					},
					{
						name: "loopDataOutputRef",
						type: "ItemAwareElement",
						isReference: true
					},
					{
						name: "inputDataItem",
						type: "DataInput",
						xml: { serialize: "property" }
					},
					{
						name: "outputDataItem",
						type: "DataOutput",
						xml: { serialize: "property" }
					},
					{
						name: "complexBehaviorDefinition",
						type: "ComplexBehaviorDefinition",
						isMany: true
					},
					{
						name: "completionCondition",
						type: "Expression",
						xml: { serialize: "xsi:type" }
					},
					{
						name: "oneBehaviorEventRef",
						type: "EventDefinition",
						isAttr: true,
						isReference: true
					},
					{
						name: "noneBehaviorEventRef",
						type: "EventDefinition",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "StandardLoopCharacteristics",
				superClass: ["LoopCharacteristics"],
				properties: [
					{
						name: "testBefore",
						"default": false,
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "loopCondition",
						type: "Expression",
						xml: { serialize: "xsi:type" }
					},
					{
						name: "loopMaximum",
						type: "Integer",
						isAttr: true
					}
				]
			},
			{
				name: "CallActivity",
				superClass: ["Activity", "InteractionNode"],
				properties: [{
					name: "calledElement",
					type: "String",
					isAttr: true
				}]
			},
			{
				name: "Task",
				superClass: ["Activity", "InteractionNode"]
			},
			{
				name: "SendTask",
				superClass: ["Task"],
				properties: [
					{
						name: "implementation",
						isAttr: true,
						type: "String"
					},
					{
						name: "operationRef",
						type: "Operation",
						isAttr: true,
						isReference: true
					},
					{
						name: "messageRef",
						type: "Message",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "ReceiveTask",
				superClass: ["Task"],
				properties: [
					{
						name: "implementation",
						isAttr: true,
						type: "String"
					},
					{
						name: "instantiate",
						"default": false,
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "operationRef",
						type: "Operation",
						isAttr: true,
						isReference: true
					},
					{
						name: "messageRef",
						type: "Message",
						isAttr: true,
						isReference: true
					}
				]
			},
			{
				name: "ScriptTask",
				superClass: ["Task"],
				properties: [{
					name: "scriptFormat",
					isAttr: true,
					type: "String"
				}, {
					name: "script",
					type: "String"
				}]
			},
			{
				name: "BusinessRuleTask",
				superClass: ["Task"],
				properties: [{
					name: "implementation",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "AdHocSubProcess",
				superClass: ["SubProcess"],
				properties: [
					{
						name: "completionCondition",
						type: "Expression",
						xml: { serialize: "xsi:type" }
					},
					{
						name: "ordering",
						type: "AdHocOrdering",
						isAttr: true
					},
					{
						name: "cancelRemainingInstances",
						"default": true,
						isAttr: true,
						type: "Boolean"
					}
				]
			},
			{
				name: "Transaction",
				superClass: ["SubProcess"],
				properties: [{
					name: "protocol",
					isAttr: true,
					type: "String"
				}, {
					name: "method",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "GlobalScriptTask",
				superClass: ["GlobalTask"],
				properties: [{
					name: "scriptLanguage",
					isAttr: true,
					type: "String"
				}, {
					name: "script",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "GlobalBusinessRuleTask",
				superClass: ["GlobalTask"],
				properties: [{
					name: "implementation",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "ComplexBehaviorDefinition",
				superClass: ["BaseElement"],
				properties: [{
					name: "condition",
					type: "FormalExpression"
				}, {
					name: "event",
					type: "ImplicitThrowEvent"
				}]
			},
			{
				name: "ResourceRole",
				superClass: ["BaseElement"],
				properties: [
					{
						name: "resourceRef",
						type: "Resource",
						isReference: true
					},
					{
						name: "resourceParameterBindings",
						type: "ResourceParameterBinding",
						isMany: true
					},
					{
						name: "resourceAssignmentExpression",
						type: "ResourceAssignmentExpression"
					},
					{
						name: "name",
						isAttr: true,
						type: "String"
					}
				]
			},
			{
				name: "ResourceParameterBinding",
				properties: [{
					name: "expression",
					type: "Expression",
					xml: { serialize: "xsi:type" }
				}, {
					name: "parameterRef",
					type: "ResourceParameter",
					isAttr: true,
					isReference: true
				}],
				superClass: ["BaseElement"]
			},
			{
				name: "ResourceAssignmentExpression",
				properties: [{
					name: "expression",
					type: "Expression",
					xml: { serialize: "xsi:type" }
				}],
				superClass: ["BaseElement"]
			},
			{
				name: "Import",
				properties: [
					{
						name: "importType",
						isAttr: true,
						type: "String"
					},
					{
						name: "location",
						isAttr: true,
						type: "String"
					},
					{
						name: "namespace",
						isAttr: true,
						type: "String"
					}
				]
			},
			{
				name: "Definitions",
				superClass: ["BaseElement"],
				properties: [
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "targetNamespace",
						isAttr: true,
						type: "String"
					},
					{
						name: "expressionLanguage",
						"default": "http://www.w3.org/1999/XPath",
						isAttr: true,
						type: "String"
					},
					{
						name: "typeLanguage",
						"default": "http://www.w3.org/2001/XMLSchema",
						isAttr: true,
						type: "String"
					},
					{
						name: "imports",
						type: "Import",
						isMany: true
					},
					{
						name: "extensions",
						type: "Extension",
						isMany: true
					},
					{
						name: "rootElements",
						type: "RootElement",
						isMany: true
					},
					{
						name: "diagrams",
						isMany: true,
						type: "bpmndi:BPMNDiagram"
					},
					{
						name: "exporter",
						isAttr: true,
						type: "String"
					},
					{
						name: "relationships",
						type: "Relationship",
						isMany: true
					},
					{
						name: "exporterVersion",
						isAttr: true,
						type: "String"
					}
				]
			}
		],
		enumerations: [
			{
				name: "ProcessType",
				literalValues: [
					{ name: "None" },
					{ name: "Public" },
					{ name: "Private" }
				]
			},
			{
				name: "GatewayDirection",
				literalValues: [
					{ name: "Unspecified" },
					{ name: "Converging" },
					{ name: "Diverging" },
					{ name: "Mixed" }
				]
			},
			{
				name: "EventBasedGatewayType",
				literalValues: [{ name: "Parallel" }, { name: "Exclusive" }]
			},
			{
				name: "RelationshipDirection",
				literalValues: [
					{ name: "None" },
					{ name: "Forward" },
					{ name: "Backward" },
					{ name: "Both" }
				]
			},
			{
				name: "ItemKind",
				literalValues: [{ name: "Physical" }, { name: "Information" }]
			},
			{
				name: "ChoreographyLoopType",
				literalValues: [
					{ name: "None" },
					{ name: "Standard" },
					{ name: "MultiInstanceSequential" },
					{ name: "MultiInstanceParallel" }
				]
			},
			{
				name: "AssociationDirection",
				literalValues: [
					{ name: "None" },
					{ name: "One" },
					{ name: "Both" }
				]
			},
			{
				name: "MultiInstanceBehavior",
				literalValues: [
					{ name: "None" },
					{ name: "One" },
					{ name: "All" },
					{ name: "Complex" }
				]
			},
			{
				name: "AdHocOrdering",
				literalValues: [{ name: "Parallel" }, { name: "Sequential" }]
			}
		],
		xml: {
			tagAlias: "lowerCase",
			typePrefix: "t"
		}
	},
	bpmndi: {
		name: "BPMNDI",
		uri: "http://www.omg.org/spec/BPMN/20100524/DI",
		prefix: "bpmndi",
		types: [
			{
				name: "BPMNDiagram",
				properties: [{
					name: "plane",
					type: "BPMNPlane",
					redefines: "di:Diagram#rootElement"
				}, {
					name: "labelStyle",
					type: "BPMNLabelStyle",
					isMany: true
				}],
				superClass: ["di:Diagram"]
			},
			{
				name: "BPMNPlane",
				properties: [{
					name: "bpmnElement",
					isAttr: true,
					isReference: true,
					type: "bpmn:BaseElement",
					redefines: "di:DiagramElement#modelElement"
				}],
				superClass: ["di:Plane"]
			},
			{
				name: "BPMNShape",
				properties: [
					{
						name: "bpmnElement",
						isAttr: true,
						isReference: true,
						type: "bpmn:BaseElement",
						redefines: "di:DiagramElement#modelElement"
					},
					{
						name: "isHorizontal",
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "isExpanded",
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "isMarkerVisible",
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "label",
						type: "BPMNLabel"
					},
					{
						name: "isMessageVisible",
						isAttr: true,
						type: "Boolean"
					},
					{
						name: "participantBandKind",
						type: "ParticipantBandKind",
						isAttr: true
					},
					{
						name: "choreographyActivityShape",
						type: "BPMNShape",
						isAttr: true,
						isReference: true
					}
				],
				superClass: ["di:LabeledShape"]
			},
			{
				name: "BPMNEdge",
				properties: [
					{
						name: "label",
						type: "BPMNLabel"
					},
					{
						name: "bpmnElement",
						isAttr: true,
						isReference: true,
						type: "bpmn:BaseElement",
						redefines: "di:DiagramElement#modelElement"
					},
					{
						name: "sourceElement",
						isAttr: true,
						isReference: true,
						type: "di:DiagramElement",
						redefines: "di:Edge#source"
					},
					{
						name: "targetElement",
						isAttr: true,
						isReference: true,
						type: "di:DiagramElement",
						redefines: "di:Edge#target"
					},
					{
						name: "messageVisibleKind",
						type: "MessageVisibleKind",
						isAttr: true,
						"default": "initiating"
					}
				],
				superClass: ["di:LabeledEdge"]
			},
			{
				name: "BPMNLabel",
				properties: [{
					name: "labelStyle",
					type: "BPMNLabelStyle",
					isAttr: true,
					isReference: true,
					redefines: "di:DiagramElement#style"
				}],
				superClass: ["di:Label"]
			},
			{
				name: "BPMNLabelStyle",
				properties: [{
					name: "font",
					type: "dc:Font"
				}],
				superClass: ["di:Style"]
			}
		],
		enumerations: [{
			name: "ParticipantBandKind",
			literalValues: [
				{ name: "top_initiating" },
				{ name: "middle_initiating" },
				{ name: "bottom_initiating" },
				{ name: "top_non_initiating" },
				{ name: "middle_non_initiating" },
				{ name: "bottom_non_initiating" }
			]
		}, {
			name: "MessageVisibleKind",
			literalValues: [{ name: "initiating" }, { name: "non_initiating" }]
		}],
		associations: []
	},
	dc: {
		name: "DC",
		uri: "http://www.omg.org/spec/DD/20100524/DC",
		prefix: "dc",
		types: [
			{ name: "Boolean" },
			{ name: "Integer" },
			{ name: "Real" },
			{ name: "String" },
			{
				name: "Font",
				properties: [
					{
						name: "name",
						type: "String",
						isAttr: true
					},
					{
						name: "size",
						type: "Real",
						isAttr: true
					},
					{
						name: "isBold",
						type: "Boolean",
						isAttr: true
					},
					{
						name: "isItalic",
						type: "Boolean",
						isAttr: true
					},
					{
						name: "isUnderline",
						type: "Boolean",
						isAttr: true
					},
					{
						name: "isStrikeThrough",
						type: "Boolean",
						isAttr: true
					}
				]
			},
			{
				name: "Point",
				properties: [{
					name: "x",
					type: "Real",
					"default": "0",
					isAttr: true
				}, {
					name: "y",
					type: "Real",
					"default": "0",
					isAttr: true
				}]
			},
			{
				name: "Bounds",
				properties: [
					{
						name: "x",
						type: "Real",
						"default": "0",
						isAttr: true
					},
					{
						name: "y",
						type: "Real",
						"default": "0",
						isAttr: true
					},
					{
						name: "width",
						type: "Real",
						isAttr: true
					},
					{
						name: "height",
						type: "Real",
						isAttr: true
					}
				]
			}
		],
		associations: []
	},
	di: {
		name: "DI",
		uri: "http://www.omg.org/spec/DD/20100524/DI",
		prefix: "di",
		types: [
			{
				name: "DiagramElement",
				isAbstract: true,
				properties: [
					{
						name: "id",
						isAttr: true,
						isId: true,
						type: "String"
					},
					{
						name: "extension",
						type: "Extension"
					},
					{
						name: "owningDiagram",
						type: "Diagram",
						isReadOnly: true,
						isVirtual: true,
						isReference: true
					},
					{
						name: "owningElement",
						type: "DiagramElement",
						isReadOnly: true,
						isVirtual: true,
						isReference: true
					},
					{
						name: "modelElement",
						isReadOnly: true,
						isVirtual: true,
						isReference: true,
						type: "Element"
					},
					{
						name: "style",
						type: "Style",
						isReadOnly: true,
						isVirtual: true,
						isReference: true
					},
					{
						name: "ownedElement",
						type: "DiagramElement",
						isReadOnly: true,
						isMany: true,
						isVirtual: true
					}
				]
			},
			{
				name: "Node",
				isAbstract: true,
				superClass: ["DiagramElement"]
			},
			{
				name: "Edge",
				isAbstract: true,
				superClass: ["DiagramElement"],
				properties: [
					{
						name: "source",
						type: "DiagramElement",
						isReadOnly: true,
						isVirtual: true,
						isReference: true
					},
					{
						name: "target",
						type: "DiagramElement",
						isReadOnly: true,
						isVirtual: true,
						isReference: true
					},
					{
						name: "waypoint",
						isUnique: false,
						isMany: true,
						type: "dc:Point",
						xml: { serialize: "xsi:type" }
					}
				]
			},
			{
				name: "Diagram",
				isAbstract: true,
				properties: [
					{
						name: "id",
						isAttr: true,
						isId: true,
						type: "String"
					},
					{
						name: "rootElement",
						type: "DiagramElement",
						isReadOnly: true,
						isVirtual: true
					},
					{
						name: "name",
						isAttr: true,
						type: "String"
					},
					{
						name: "documentation",
						isAttr: true,
						type: "String"
					},
					{
						name: "resolution",
						isAttr: true,
						type: "Real"
					},
					{
						name: "ownedStyle",
						type: "Style",
						isReadOnly: true,
						isMany: true,
						isVirtual: true
					}
				]
			},
			{
				name: "Shape",
				isAbstract: true,
				superClass: ["Node"],
				properties: [{
					name: "bounds",
					type: "dc:Bounds"
				}]
			},
			{
				name: "Plane",
				isAbstract: true,
				superClass: ["Node"],
				properties: [{
					name: "planeElement",
					type: "DiagramElement",
					subsettedProperty: "DiagramElement-ownedElement",
					isMany: true
				}]
			},
			{
				name: "LabeledEdge",
				isAbstract: true,
				superClass: ["Edge"],
				properties: [{
					name: "ownedLabel",
					type: "Label",
					isReadOnly: true,
					subsettedProperty: "DiagramElement-ownedElement",
					isMany: true,
					isVirtual: true
				}]
			},
			{
				name: "LabeledShape",
				isAbstract: true,
				superClass: ["Shape"],
				properties: [{
					name: "ownedLabel",
					type: "Label",
					isReadOnly: true,
					subsettedProperty: "DiagramElement-ownedElement",
					isMany: true,
					isVirtual: true
				}]
			},
			{
				name: "Label",
				isAbstract: true,
				superClass: ["Node"],
				properties: [{
					name: "bounds",
					type: "dc:Bounds"
				}]
			},
			{
				name: "Style",
				isAbstract: true,
				properties: [{
					name: "id",
					isAttr: true,
					isId: true,
					type: "String"
				}]
			},
			{
				name: "Extension",
				properties: [{
					name: "values",
					isMany: true,
					type: "Element"
				}]
			}
		],
		associations: [],
		xml: { tagAlias: "lowerCase" }
	},
	bioc: {
		name: "bpmn.io colors for BPMN",
		uri: "http://bpmn.io/schema/bpmn/biocolor/1.0",
		prefix: "bioc",
		types: [{
			name: "ColoredShape",
			"extends": ["bpmndi:BPMNShape"],
			properties: [{
				name: "stroke",
				isAttr: true,
				type: "String"
			}, {
				name: "fill",
				isAttr: true,
				type: "String"
			}]
		}, {
			name: "ColoredEdge",
			"extends": ["bpmndi:BPMNEdge"],
			properties: [{
				name: "stroke",
				isAttr: true,
				type: "String"
			}, {
				name: "fill",
				isAttr: true,
				type: "String"
			}]
		}],
		enumerations: [],
		associations: []
	},
	color: {
		name: "BPMN in Color",
		uri: "http://www.omg.org/spec/BPMN/non-normative/color/1.0",
		prefix: "color",
		types: [
			{
				name: "ColoredLabel",
				"extends": ["bpmndi:BPMNLabel"],
				properties: [{
					name: "color",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "ColoredShape",
				"extends": ["bpmndi:BPMNShape"],
				properties: [{
					name: "background-color",
					isAttr: true,
					type: "String"
				}, {
					name: "border-color",
					isAttr: true,
					type: "String"
				}]
			},
			{
				name: "ColoredEdge",
				"extends": ["bpmndi:BPMNEdge"],
				properties: [{
					name: "border-color",
					isAttr: true,
					type: "String"
				}]
			}
		],
		enumerations: [],
		associations: []
	}
};
function SimpleBpmnModdle(additionalPackages, options) {
	return new BpmnModdle(assign$1({}, packages, additionalPackages), options);
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/import/Util.js
init_ModelUtil();
function elementToString(e) {
	if (!e) return "<null>";
	return "<" + e.$type + (e.id ? " id=\"" + e.id : "") + "\" />";
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/import/BpmnTreeWalker.js
init_dist();
function is(element, type) {
	return element.$instanceOf(type);
}
function findDisplayCandidate(definitions) {
	return find(definitions.rootElements, function(e) {
		return is(e, "bpmn:Process") || is(e, "bpmn:Collaboration");
	});
}
function BpmnTreeWalker(handler) {
	var handledElements = {};
	var deferred = [];
	var diMap = {};
	function contextual(fn, ctx) {
		return function(e) {
			fn(e, ctx);
		};
	}
	function handled(element) {
		handledElements[element.id] = element;
	}
	function isHandled(element) {
		return handledElements[element.id];
	}
	function visit(element, ctx) {
		if (element.gfx) throw new Error(`already rendered ${elementToString(element)}`);
		return handler.element(element, diMap[element.id], ctx);
	}
	function visitRoot(element, diagram) {
		return handler.root(element, diMap[element.id], diagram);
	}
	function visitIfDi(element, ctx) {
		try {
			var gfx = diMap[element.id] && visit(element, ctx);
			handled(element);
			return gfx;
		} catch (error) {
			logError(error.message, {
				element,
				error
			});
			console.error(`failed to import ${elementToString(element)}`, error);
		}
	}
	function logError(message, context) {
		handler.error(message, context);
	}
	var registerDi = this.registerDi = function registerDi(di) {
		var bpmnElement = di.bpmnElement;
		if (bpmnElement) {
			if (diMap[bpmnElement.id]) logError(`multiple DI elements defined for ${elementToString(bpmnElement)}`, { element: bpmnElement });
			else diMap[bpmnElement.id] = di;
		} else logError(`no bpmnElement referenced in ${elementToString(di)}`, { element: di });
	};
	function handleDiagram(diagram) {
		handlePlane(diagram.plane);
	}
	function handlePlane(plane) {
		registerDi(plane);
		forEach(plane.planeElement, handlePlaneElement);
	}
	function handlePlaneElement(planeElement) {
		registerDi(planeElement);
	}
	this.handleDefinitions = function handleDefinitions(definitions, diagram) {
		var diagrams = definitions.diagrams;
		if (diagram && diagrams.indexOf(diagram) === -1) throw new Error("diagram not part of <bpmn:Definitions />");
		if (!diagram && diagrams && diagrams.length) diagram = diagrams[0];
		if (!diagram) throw new Error("no diagram to display");
		diMap = {};
		handleDiagram(diagram);
		var plane = diagram.plane;
		if (!plane) throw new Error(`no plane for ${elementToString(diagram)}`);
		var rootElement = plane.bpmnElement;
		if (!rootElement) {
			rootElement = findDisplayCandidate(definitions);
			if (!rootElement) throw new Error("no process or collaboration to display");
			else {
				logError(`correcting missing bpmnElement on ${elementToString(plane)} to ${elementToString(rootElement)}`);
				plane.bpmnElement = rootElement;
				registerDi(plane);
			}
		}
		var ctx = visitRoot(rootElement, plane);
		if (is(rootElement, "bpmn:Process") || is(rootElement, "bpmn:SubProcess")) handleProcess(rootElement, ctx);
		else if (is(rootElement, "bpmn:Collaboration")) {
			handleCollaboration(rootElement, ctx);
			handleUnhandledProcesses(definitions.rootElements, ctx);
		} else throw new Error(`unsupported bpmnElement for ${elementToString(plane)}: ${elementToString(rootElement)}`);
		handleDeferred(deferred);
	};
	var handleDeferred = this.handleDeferred = function handleDeferred() {
		var fn;
		while (deferred.length) {
			fn = deferred.shift();
			fn();
		}
	};
	function handleProcess(process, context) {
		handleFlowElementsContainer(process, context);
		handleIoSpecification(process.ioSpecification, context);
		handleArtifacts(process.artifacts, context);
		handled(process);
	}
	function handleUnhandledProcesses(rootElements, ctx) {
		filter(rootElements, function(e) {
			return !isHandled(e) && is(e, "bpmn:Process") && e.laneSets;
		}).forEach(contextual(handleProcess, ctx));
	}
	function handleMessageFlow(messageFlow, context) {
		visitIfDi(messageFlow, context);
	}
	function handleMessageFlows(messageFlows, context) {
		forEach(messageFlows, contextual(handleMessageFlow, context));
	}
	function handleDataAssociation(association, context) {
		visitIfDi(association, context);
	}
	function handleDataInput(dataInput, context) {
		visitIfDi(dataInput, context);
	}
	function handleDataOutput(dataOutput, context) {
		visitIfDi(dataOutput, context);
	}
	function handleArtifact(artifact, context) {
		visitIfDi(artifact, context);
	}
	function handleArtifacts(artifacts, context) {
		forEach(artifacts, function(e) {
			if (is(e, "bpmn:Association")) deferred.push(function() {
				handleArtifact(e, context);
			});
			else handleArtifact(e, context);
		});
	}
	function handleIoSpecification(ioSpecification, context) {
		if (!ioSpecification) return;
		forEach(ioSpecification.dataInputs, contextual(handleDataInput, context));
		forEach(ioSpecification.dataOutputs, contextual(handleDataOutput, context));
	}
	var handleSubProcess = this.handleSubProcess = function handleSubProcess(subProcess, context) {
		handleFlowElementsContainer(subProcess, context);
		handleArtifacts(subProcess.artifacts, context);
	};
	function handleFlowNode(flowNode, context) {
		var childCtx = visitIfDi(flowNode, context);
		if (is(flowNode, "bpmn:SubProcess")) handleSubProcess(flowNode, childCtx || context);
		if (is(flowNode, "bpmn:Activity")) handleIoSpecification(flowNode.ioSpecification, context);
		deferred.push(function() {
			forEach(flowNode.dataInputAssociations, contextual(handleDataAssociation, context));
			forEach(flowNode.dataOutputAssociations, contextual(handleDataAssociation, context));
		});
	}
	function handleSequenceFlow(sequenceFlow, context) {
		visitIfDi(sequenceFlow, context);
	}
	function handleDataElement(dataObject, context) {
		visitIfDi(dataObject, context);
	}
	function handleLane(lane, context) {
		deferred.push(function() {
			var newContext = visitIfDi(lane, context);
			if (lane.childLaneSet) handleLaneSet(lane.childLaneSet, newContext || context);
			wireFlowNodeRefs(lane);
		});
	}
	function handleLaneSet(laneSet, context) {
		forEach(laneSet.lanes, contextual(handleLane, context));
	}
	function handleLaneSets(laneSets, context) {
		forEach(laneSets, contextual(handleLaneSet, context));
	}
	function handleFlowElementsContainer(container, context) {
		handleFlowElements(container.flowElements, context);
		if (container.laneSets) handleLaneSets(container.laneSets, context);
	}
	function handleFlowElements(flowElements, context) {
		forEach(flowElements, function(flowElement) {
			if (is(flowElement, "bpmn:SequenceFlow")) deferred.push(function() {
				handleSequenceFlow(flowElement, context);
			});
			else if (is(flowElement, "bpmn:BoundaryEvent")) deferred.unshift(function() {
				handleFlowNode(flowElement, context);
			});
			else if (is(flowElement, "bpmn:FlowNode")) handleFlowNode(flowElement, context);
			else if (is(flowElement, "bpmn:DataObject")) {} else if (is(flowElement, "bpmn:DataStoreReference")) handleDataElement(flowElement, context);
			else if (is(flowElement, "bpmn:DataObjectReference")) handleDataElement(flowElement, context);
			else logError(`unrecognized flowElement ${elementToString(flowElement)} in context ${elementToString(context && context.businessObject)}`, {
				element: flowElement,
				context
			});
		});
	}
	function handleParticipant(participant, context) {
		var newCtx = visitIfDi(participant, context);
		var process = participant.processRef;
		if (process) handleProcess(process, newCtx || context);
	}
	function handleCollaboration(collaboration, context) {
		forEach(collaboration.participants, contextual(handleParticipant, context));
		deferred.push(function() {
			handleMessageFlows(collaboration.messageFlows, context);
		});
		handleArtifacts(collaboration.artifacts, context);
	}
	function wireFlowNodeRefs(lane) {
		forEach(lane.flowNodeRef, function(flowNode) {
			var lanes = flowNode.get("lanes");
			if (lanes) lanes.push(lane);
		});
	}
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/import/Importer.js
init_dist();
function importBpmnDiagram(diagram, definitions, bpmnDiagram) {
	var importer, eventBus, canvas;
	var error, warnings = [];
	function render(definitions, bpmnDiagram) {
		var walker = new BpmnTreeWalker({
			root: function(element, di) {
				return importer.add(element, di);
			},
			element: function(element, di, parentShape) {
				return importer.add(element, di, parentShape);
			},
			error: function(message, context) {
				warnings.push({
					message,
					context
				});
			}
		});
		bpmnDiagram = bpmnDiagram || definitions.diagrams && definitions.diagrams[0];
		var diagramsToImport = getDiagramsToImport(definitions, bpmnDiagram);
		if (!diagramsToImport) throw new Error("no diagram to display");
		forEach(diagramsToImport, function(diagram) {
			walker.handleDefinitions(definitions, diagram);
		});
		var rootId = bpmnDiagram.plane.bpmnElement.id;
		canvas.setRootElement(canvas.findRoot(rootId + "_plane") || canvas.findRoot(rootId));
	}
	return new Promise(function(resolve, reject) {
		try {
			importer = diagram.get("bpmnImporter");
			eventBus = diagram.get("eventBus");
			canvas = diagram.get("canvas");
			eventBus.fire("import.render.start", { definitions });
			render(definitions, bpmnDiagram);
			eventBus.fire("import.render.complete", {
				error,
				warnings
			});
			return resolve({ warnings });
		} catch (e) {
			e.warnings = warnings;
			return reject(e);
		}
	});
}
function getDiagramsToImport(definitions, bpmnDiagram) {
	if (!bpmnDiagram || !bpmnDiagram.plane) return;
	var bpmnElement = bpmnDiagram.plane.bpmnElement, rootElement = bpmnElement;
	if (!is$1(bpmnElement, "bpmn:Process") && !is$1(bpmnElement, "bpmn:Collaboration")) rootElement = findRootProcess(bpmnElement);
	var collaboration;
	if (is$1(rootElement, "bpmn:Collaboration")) collaboration = rootElement;
	else collaboration = find(definitions.rootElements, function(element) {
		if (!is$1(element, "bpmn:Collaboration")) return;
		return find(element.participants, function(participant) {
			return participant.processRef === rootElement;
		});
	});
	var rootElements = [rootElement];
	if (collaboration) {
		rootElements = map(collaboration.participants, function(participant) {
			return participant.processRef;
		});
		rootElements.push(collaboration);
	}
	var allChildren = selfAndAllFlowElements(rootElements);
	var diagramsToImport = [bpmnDiagram];
	var handledElements = [bpmnElement];
	forEach(definitions.diagrams, function(diagram) {
		if (!diagram.plane) return;
		var businessObject = diagram.plane.bpmnElement;
		if (allChildren.indexOf(businessObject) !== -1 && handledElements.indexOf(businessObject) === -1) {
			diagramsToImport.push(diagram);
			handledElements.push(businessObject);
		}
	});
	return diagramsToImport;
}
function selfAndAllFlowElements(elements) {
	var result = [];
	forEach(elements, function(element) {
		if (!element) return;
		result.push(element);
		result = result.concat(selfAndAllFlowElements(element.flowElements));
	});
	return result;
}
function findRootProcess(element) {
	var parent = element;
	while (parent) {
		if (is$1(parent, "bpmn:Process")) return parent;
		parent = parent.$parent;
	}
}
var BPMNIO_IMG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 14.02 5.57\" width=\"53\" height=\"21\"><path fill=\"currentColor\" d=\"M1.88.92v.14c0 .41-.13.68-.4.8.33.14.46.44.46.86v.33c0 .61-.33.95-.95.95H0V0h.95c.65 0 .93.3.93.92zM.63.57v1.06h.24c.24 0 .38-.1.38-.43V.98c0-.28-.1-.4-.32-.4zm0 1.63v1.22h.36c.2 0 .32-.1.32-.39v-.35c0-.37-.12-.48-.4-.48H.63zM4.18.99v.52c0 .64-.31.98-.94.98h-.3V4h-.62V0h.92c.63 0 .94.35.94.99zM2.94.57v1.35h.3c.2 0 .3-.09.3-.37v-.6c0-.29-.1-.38-.3-.38h-.3zm2.89 2.27L6.25 0h.88v4h-.6V1.12L6.1 3.99h-.6l-.46-2.82v2.82h-.55V0h.87zM8.14 1.1V4h-.56V0h.79L9 2.4V0h.56v4h-.64zm2.49 2.29v.6h-.6v-.6zM12.12 1c0-.63.33-1 .95-1 .61 0 .95.37.95 1v2.04c0 .64-.34 1-.95 1-.62 0-.95-.37-.95-1zm.62 2.08c0 .28.13.39.33.39s.32-.1.32-.4V.98c0-.29-.12-.4-.32-.4s-.33.11-.33.4z\"/><path fill=\"currentColor\" d=\"M0 4.53h14.02v1.04H0zM11.08 0h.63v.62h-.63zm.63 4V1h-.63v2.98z\"/></svg>";
var LOGO_STYLES = { verticalAlign: "middle" };
var LINK_STYLES = { "color": "#404040" };
var LIGHTBOX_STYLES = {
	"zIndex": "1001",
	"position": "fixed",
	"top": "0",
	"left": "0",
	"right": "0",
	"bottom": "0"
};
var BACKDROP_STYLES = {
	"width": "100%",
	"height": "100%",
	"background": "rgba(40,40,40,0.2)"
};
var NOTICE_STYLES = {
	"position": "absolute",
	"left": "50%",
	"top": "40%",
	"transform": "translate(-50%)",
	"width": "260px",
	"padding": "10px",
	"background": "white",
	"boxShadow": "0 1px 4px rgba(0,0,0,0.3)",
	"fontFamily": "Helvetica, Arial, sans-serif",
	"fontSize": "14px",
	"display": "flex",
	"lineHeight": "1.3"
};
var LIGHTBOX_MARKUP = "<div class=\"bjs-powered-by-lightbox\"><div class=\"backdrop\"></div><div class=\"notice\"><a href=\"https://bpmn.io\" target=\"_blank\" rel=\"noopener\" class=\"link\">" + BPMNIO_IMG + "</a><span>Web-based tooling for BPMN, DMN and forms powered by <a href=\"https://bpmn.io\" target=\"_blank\" rel=\"noopener\">bpmn.io</a>.</span></div></div>";
var lightbox;
function createLightbox() {
	lightbox = domify(LIGHTBOX_MARKUP);
	assign(lightbox, LIGHTBOX_STYLES);
	assign(query("svg", lightbox), LOGO_STYLES);
	assign(query(".backdrop", lightbox), BACKDROP_STYLES);
	assign(query(".notice", lightbox), NOTICE_STYLES);
	assign(query(".link", lightbox), LINK_STYLES, {
		"margin": "15px 20px 15px 10px",
		"alignSelf": "center"
	});
}
function open() {
	if (!lightbox) {
		createLightbox();
		delegate.bind(lightbox, ".backdrop", "click", function(event) {
			document.body.removeChild(lightbox);
		});
	}
	document.body.appendChild(lightbox);
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/BaseViewer.js
init_dist();
var EXPORT_PADDING = 5;
var OUTLINE_HIDDEN_CLS = "djs-outline-hidden";
function BaseViewer(options) {
	options = assign$1({}, DEFAULT_OPTIONS, options);
	this._moddle = this._createModdle(options);
	this._container = this._createContainer(options);
	this._init(this._container, this._moddle, options);
	addProjectLogo(this._container);
}
e(BaseViewer, Diagram);
BaseViewer.prototype.importXML = async function importXML(xml, bpmnDiagram) {
	const self = this;
	function ParseCompleteEvent(data) {
		return self.get("eventBus").createEvent(data);
	}
	let aggregatedWarnings = [];
	try {
		xml = this._emit("import.parse.start", { xml }) || xml;
		let parseResult;
		try {
			parseResult = await this._moddle.fromXML(xml, "bpmn:Definitions");
		} catch (error) {
			this._emit("import.parse.complete", { error });
			throw error;
		}
		let definitions = parseResult.rootElement;
		const references = parseResult.references;
		const parseWarnings = parseResult.warnings;
		const elementsById = parseResult.elementsById;
		aggregatedWarnings = aggregatedWarnings.concat(parseWarnings);
		definitions = this._emit("import.parse.complete", ParseCompleteEvent({
			error: null,
			definitions,
			elementsById,
			references,
			warnings: aggregatedWarnings
		})) || definitions;
		const importResult = await this.importDefinitions(definitions, bpmnDiagram);
		aggregatedWarnings = aggregatedWarnings.concat(importResult.warnings);
		this._emit("import.done", {
			error: null,
			warnings: aggregatedWarnings
		});
		return { warnings: aggregatedWarnings };
	} catch (err) {
		let error = err;
		aggregatedWarnings = aggregatedWarnings.concat(error.warnings || []);
		addWarningsToError(error, aggregatedWarnings);
		error = checkValidationError(error);
		this._emit("import.done", {
			error,
			warnings: error.warnings
		});
		throw error;
	}
};
BaseViewer.prototype.importDefinitions = async function importDefinitions(definitions, bpmnDiagram) {
	this._setDefinitions(definitions);
	return { warnings: (await this.open(bpmnDiagram)).warnings };
};
BaseViewer.prototype.open = async function open(bpmnDiagramOrId) {
	const definitions = this._definitions;
	let bpmnDiagram = bpmnDiagramOrId;
	if (!definitions) {
		const error = new Error("no XML imported");
		addWarningsToError(error, []);
		throw error;
	}
	if (typeof bpmnDiagramOrId === "string") {
		bpmnDiagram = findBPMNDiagram(definitions, bpmnDiagramOrId);
		if (!bpmnDiagram) {
			const error = new Error("BPMNDiagram <" + bpmnDiagramOrId + "> not found");
			addWarningsToError(error, []);
			throw error;
		}
	}
	try {
		this.clear();
	} catch (error) {
		addWarningsToError(error, []);
		throw error;
	}
	const { warnings } = await importBpmnDiagram(this, definitions, bpmnDiagram);
	return { warnings };
};
BaseViewer.prototype.saveXML = async function saveXML(options) {
	options = options || {};
	let definitions = this._definitions, error, xml;
	try {
		if (!definitions) throw new Error("no definitions loaded");
		definitions = this._emit("saveXML.start", { definitions }) || definitions;
		xml = (await this._moddle.toXML(definitions, options)).xml;
		xml = this._emit("saveXML.serialized", { xml }) || xml;
	} catch (err) {
		error = err;
	}
	const result = error ? { error } : { xml };
	this._emit("saveXML.done", result);
	if (error) throw error;
	return result;
};
BaseViewer.prototype.saveSVG = async function saveSVG() {
	this._emit("saveSVG.start");
	let svg, err;
	try {
		const canvas = this.get("canvas");
		const contentNode = canvas.getActiveLayer(), defsNode = query(":scope > defs", canvas._svg);
		const contents = innerSVG(contentNode), defs = defsNode ? "<defs>" + innerSVG(defsNode) + "</defs>" : "";
		const container = canvas.getContainer();
		classes(container).add(OUTLINE_HIDDEN_CLS);
		let bbox;
		try {
			bbox = contentNode.getBBox();
		} finally {
			classes(container).remove(OUTLINE_HIDDEN_CLS);
		}
		const x = bbox.x - EXPORT_PADDING, y = bbox.y - EXPORT_PADDING, width = bbox.width + 10, height = bbox.height + 10;
		svg = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- created with bpmn-js / http://bpmn.io -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"" + width + "\" height=\"" + height + "\" viewBox=\"" + x + " " + y + " " + width + " " + height + "\" version=\"1.1\">" + defs + contents + "</svg>";
	} catch (e) {
		err = e;
	}
	this._emit("saveSVG.done", {
		error: err,
		svg
	});
	if (err) throw err;
	return { svg };
};
BaseViewer.prototype._setDefinitions = function(definitions) {
	this._definitions = definitions;
};
BaseViewer.prototype.getModules = function() {
	return this._modules;
};
BaseViewer.prototype.clear = function() {
	if (!this.getDefinitions()) return;
	Diagram.prototype.clear.call(this);
};
BaseViewer.prototype.destroy = function() {
	Diagram.prototype.destroy.call(this);
	remove(this._container);
};
BaseViewer.prototype.on = function(events, priority, callback, that) {
	return this.get("eventBus").on(events, priority, callback, that);
};
BaseViewer.prototype.off = function(events, callback) {
	this.get("eventBus").off(events, callback);
};
BaseViewer.prototype.attachTo = function(parentNode) {
	if (!parentNode) throw new Error("parentNode required");
	this.detach();
	if (parentNode.get && parentNode.constructor.prototype.jquery) parentNode = parentNode.get(0);
	if (typeof parentNode === "string") parentNode = query(parentNode);
	parentNode.appendChild(this._container);
	this._emit("attach", {});
	this.get("canvas").resized();
};
BaseViewer.prototype.getDefinitions = function() {
	return this._definitions;
};
BaseViewer.prototype.detach = function() {
	const container = this._container, parentNode = container.parentNode;
	if (!parentNode) return;
	this._emit("detach", {});
	parentNode.removeChild(container);
};
BaseViewer.prototype._init = function(container, moddle, options) {
	const baseModules = options.modules || this.getModules(options), additionalModules = options.additionalModules || [], staticModules = [{
		bpmnjs: ["value", this],
		moddle: ["value", moddle]
	}];
	const diagramModules = [].concat(staticModules, baseModules, additionalModules);
	const diagramOptions = assign$1(omit(options, ["additionalModules"]), {
		canvas: assign$1({}, options.canvas, { container }),
		modules: diagramModules
	});
	Diagram.call(this, diagramOptions);
	if (options && options.container) this.attachTo(options.container);
};
BaseViewer.prototype._emit = function(type, event) {
	return this.get("eventBus").fire(type, event);
};
BaseViewer.prototype._createContainer = function(options) {
	const container = domify("<div class=\"bjs-container bio-theme-parent\"></div>");
	assign(container, {
		width: ensureUnit(options.width),
		height: ensureUnit(options.height),
		position: options.position
	});
	return container;
};
BaseViewer.prototype._createModdle = function(options) {
	return new SimpleBpmnModdle(assign$1({}, this._moddleExtensions, options.moddleExtensions));
};
BaseViewer.prototype._modules = [];
function addWarningsToError(err, warningsAry) {
	err.warnings = warningsAry;
	return err;
}
function checkValidationError(err) {
	const match = /unparsable content <([^>]+)> detected([\s\S]*)$/.exec(err.message);
	if (match) err.message = "unparsable content <" + match[1] + "> detected; this may indicate an invalid BPMN 2.0 diagram file" + match[2];
	return err;
}
var DEFAULT_OPTIONS = {
	width: "100%",
	height: "100%",
	position: "relative"
};
function ensureUnit(val) {
	return val + (isNumber(val) ? "px" : "");
}
function findBPMNDiagram(definitions, diagramId) {
	if (!diagramId) return null;
	return find(definitions.diagrams, function(element) {
		return element.id === diagramId;
	}) || null;
}
function addProjectLogo(container) {
	const linkMarkup = "<a href=\"http://bpmn.io\" target=\"_blank\" class=\"bjs-powered-by\" title=\"Powered by bpmn.io\" >" + BPMNIO_IMG + "</a>";
	const linkElement = domify(linkMarkup);
	assign(query("svg", linkElement), LOGO_STYLES);
	assign(linkElement, LINK_STYLES, {
		position: "absolute",
		bottom: "15px",
		right: "15px",
		zIndex: "100"
	});
	container.appendChild(linkElement);
	event.bind(linkElement, "click", function(event) {
		open();
		event.preventDefault();
	});
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/util/DiUtil.js
init_ModelUtil();
init_dist();
function isExpanded(element, di) {
	if (is$1(element, "bpmn:CallActivity")) return false;
	if (is$1(element, "bpmn:SubProcess")) {
		di = di || getDi(element);
		if (di && is$1(di, "bpmndi:BPMNPlane")) return true;
		return di && !!di.isExpanded;
	}
	if (is$1(element, "bpmn:Participant")) return !!getBusinessObject(element).processRef;
	return true;
}
function isHorizontal(element) {
	if (!is$1(element, "bpmn:Participant") && !is$1(element, "bpmn:Lane")) return;
	var isHorizontal = getDi(element).isHorizontal;
	if (isHorizontal === void 0) return true;
	return isHorizontal;
}
function isInterrupting$1(element) {
	return element && getBusinessObject(element).isInterrupting !== false;
}
function isEventSubProcess$1(element) {
	return element && !!getBusinessObject(element).triggeredByEvent;
}
function hasEventDefinition(element, eventType) {
	var eventDefinitions = getBusinessObject(element).eventDefinitions;
	return some(eventDefinitions, function(event) {
		return is$1(event, eventType);
	});
}
function hasErrorEventDefinition(element) {
	return hasEventDefinition(element, "bpmn:ErrorEventDefinition");
}
function hasEscalationEventDefinition(element) {
	return hasEventDefinition(element, "bpmn:EscalationEventDefinition");
}
function hasCompensateEventDefinition(element) {
	return hasEventDefinition(element, "bpmn:CompensateEventDefinition");
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/util/LabelUtil.js
init_dist();
init_ModelUtil();
var DEFAULT_LABEL_SIZE = {
	width: 90,
	height: 20
};
function isLabelExternal(semantic) {
	return is$1(semantic, "bpmn:Event") || is$1(semantic, "bpmn:Gateway") || is$1(semantic, "bpmn:DataStoreReference") || is$1(semantic, "bpmn:DataObjectReference") || is$1(semantic, "bpmn:DataInput") || is$1(semantic, "bpmn:DataOutput") || is$1(semantic, "bpmn:SequenceFlow") || is$1(semantic, "bpmn:MessageFlow") || is$1(semantic, "bpmn:Group");
}
function hasExternalLabel(element) {
	return isLabel$3(element.label);
}
function getFlowLabelPosition(waypoints) {
	var mid = waypoints.length / 2 - 1;
	var first = waypoints[Math.floor(mid)];
	var second = waypoints[Math.ceil(mid + .01)];
	var position = getWaypointsMid(waypoints);
	var angle = Math.atan((second.y - first.y) / (second.x - first.x));
	var x = position.x, y = position.y;
	if (Math.abs(angle) < Math.PI / 2) y -= 15;
	else x += 15;
	return {
		x,
		y
	};
}
function getWaypointsMid(waypoints) {
	var mid = waypoints.length / 2 - 1;
	var first = waypoints[Math.floor(mid)];
	var second = waypoints[Math.ceil(mid + .01)];
	return {
		x: first.x + (second.x - first.x) / 2,
		y: first.y + (second.y - first.y) / 2
	};
}
function getExternalLabelMid(element) {
	if (element.waypoints) return getFlowLabelPosition(element.waypoints);
	else if (is$1(element, "bpmn:Group")) return {
		x: element.x + element.width / 2,
		y: element.y + DEFAULT_LABEL_SIZE.height / 2
	};
	else return {
		x: element.x + element.width / 2,
		y: element.y + element.height + DEFAULT_LABEL_SIZE.height / 2
	};
}
function getExternalLabelBounds(di, element) {
	var mid, size, bounds, label = di.label;
	if (label && label.bounds) {
		bounds = label.bounds;
		size = {
			width: Math.max(DEFAULT_LABEL_SIZE.width, bounds.width),
			height: bounds.height
		};
		mid = {
			x: bounds.x + bounds.width / 2,
			y: bounds.y + bounds.height / 2
		};
	} else {
		mid = getExternalLabelMid(element);
		size = DEFAULT_LABEL_SIZE;
	}
	return assign$1({
		x: mid.x - size.width / 2,
		y: mid.y - size.height / 2
	}, size);
}
function getLabelAttr(semantic) {
	if (is$1(semantic, "bpmn:FlowElement") || is$1(semantic, "bpmn:Participant") || is$1(semantic, "bpmn:Lane") || is$1(semantic, "bpmn:SequenceFlow") || is$1(semantic, "bpmn:MessageFlow") || is$1(semantic, "bpmn:DataInput") || is$1(semantic, "bpmn:DataOutput")) return "name";
	if (is$1(semantic, "bpmn:TextAnnotation")) return "text";
	if (is$1(semantic, "bpmn:Group")) return "categoryValueRef";
}
function getCategoryValue(semantic) {
	var categoryValueRef = semantic["categoryValueRef"];
	if (!categoryValueRef) return "";
	return categoryValueRef.value || "";
}
function getLabel(element) {
	var semantic = element.businessObject, attr = getLabelAttr(semantic);
	if (attr) {
		if (attr === "categoryValueRef") return getCategoryValue(semantic);
		return semantic[attr] || "";
	}
}
function setLabel(element, text) {
	var semantic = element.businessObject, attr = getLabelAttr(semantic);
	if (attr) {
		if (attr === "categoryValueRef") {
			if (!semantic[attr]) return element;
			semantic[attr].value = text;
		} else semantic[attr] = text;
	}
	return element;
}
function isExternalLabel(element) {
	return isLabel$3(element) && isLabelExternal(element.labelTarget);
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/util/AnnotationUtil.js
init_dist();
init_ModelUtil();
function getElementAnnotations(element) {
	let result = [];
	forEach(element.incoming, (connection) => {
		if (is$1(connection, "bpmn:Association") && is$1(connection.source, "bpmn:TextAnnotation")) result.push({
			annotation: connection.source,
			association: connection
		});
	});
	forEach(element.outgoing, (connection) => {
		if (is$1(connection, "bpmn:Association") && is$1(connection.target, "bpmn:TextAnnotation")) result.push({
			annotation: connection.target,
			association: connection
		});
	});
	return result;
}
function collectElementsAnnotations(elements) {
	const result = new Map();
	forEach(selfAndChildren(elements, true, -1), (element) => {
		forEach(getElementAnnotations(element), (entry) => {
			if (!result.has(entry.annotation)) result.set(entry.annotation, {
				annotation: entry.annotation,
				associations: []
			});
			result.get(entry.annotation).associations.push(entry.association);
		});
	});
	return [...result.values()];
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/draw/BpmnRenderUtil.js
init_dist();
init_ModelUtil();
var black = "hsl(225, 10%, 15%)";
function isTypedEvent$2(event, eventDefinitionType) {
	return some(event.eventDefinitions, function(definition) {
		return definition.$type === eventDefinitionType;
	});
}
function isThrowEvent(event) {
	return event.$type === "bpmn:IntermediateThrowEvent" || event.$type === "bpmn:EndEvent";
}
function isCollection(element) {
	var dataObject = element.dataObjectRef;
	return element.isCollection || dataObject && dataObject.isCollection;
}
function getFillColor(element, defaultColor, overrideColor) {
	var di = getDi(element);
	return overrideColor || di.get("color:background-color") || di.get("bioc:fill") || defaultColor || "white";
}
function getStrokeColor(element, defaultColor, overrideColor) {
	var di = getDi(element);
	return overrideColor || di.get("color:border-color") || di.get("bioc:stroke") || defaultColor || "hsl(225, 10%, 15%)";
}
function getLabelColor(element, defaultColor, defaultStrokeColor, overrideColor) {
	var label = getDi(element).get("label");
	return overrideColor || label && label.get("color:color") || defaultColor || getStrokeColor(element, defaultStrokeColor);
}
function getCirclePath(shape) {
	var cx = shape.x + shape.width / 2, cy = shape.y + shape.height / 2, radius = shape.width / 2;
	var circlePath = [
		[
			"M",
			cx,
			cy
		],
		[
			"m",
			0,
			-radius
		],
		[
			"a",
			radius,
			radius,
			0,
			1,
			1,
			0,
			2 * radius
		],
		[
			"a",
			radius,
			radius,
			0,
			1,
			1,
			0,
			-2 * radius
		],
		["z"]
	];
	return componentsToPath(circlePath);
}
function getRoundRectPath(shape, borderRadius) {
	var x = shape.x, y = shape.y, width = shape.width, height = shape.height;
	var roundRectPath = [
		[
			"M",
			x + borderRadius,
			y
		],
		[
			"l",
			width - borderRadius * 2,
			0
		],
		[
			"a",
			borderRadius,
			borderRadius,
			0,
			0,
			1,
			borderRadius,
			borderRadius
		],
		[
			"l",
			0,
			height - borderRadius * 2
		],
		[
			"a",
			borderRadius,
			borderRadius,
			0,
			0,
			1,
			-borderRadius,
			borderRadius
		],
		[
			"l",
			borderRadius * 2 - width,
			0
		],
		[
			"a",
			borderRadius,
			borderRadius,
			0,
			0,
			1,
			-borderRadius,
			-borderRadius
		],
		[
			"l",
			0,
			borderRadius * 2 - height
		],
		[
			"a",
			borderRadius,
			borderRadius,
			0,
			0,
			1,
			borderRadius,
			-borderRadius
		],
		["z"]
	];
	return componentsToPath(roundRectPath);
}
function getDiamondPath(shape) {
	var width = shape.width, height = shape.height, x = shape.x, y = shape.y, halfWidth = width / 2, halfHeight = height / 2;
	var diamondPath = [
		[
			"M",
			x + halfWidth,
			y
		],
		[
			"l",
			halfWidth,
			halfHeight
		],
		[
			"l",
			-halfWidth,
			halfHeight
		],
		[
			"l",
			-halfWidth,
			-halfHeight
		],
		["z"]
	];
	return componentsToPath(diamondPath);
}
function getRectPath(shape) {
	var x = shape.x, y = shape.y, width = shape.width, height = shape.height;
	var rectPath = [
		[
			"M",
			x,
			y
		],
		[
			"l",
			width,
			0
		],
		[
			"l",
			0,
			height
		],
		[
			"l",
			-width,
			0
		],
		["z"]
	];
	return componentsToPath(rectPath);
}
function getBounds(bounds, overrides = {}) {
	return {
		width: getWidth(bounds, overrides),
		height: getHeight(bounds, overrides)
	};
}
function getWidth(bounds, overrides = {}) {
	return has(overrides, "width") ? overrides.width : bounds.width;
}
function getHeight(bounds, overrides = {}) {
	return has(overrides, "height") ? overrides.height : bounds.height;
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/draw/BpmnRenderer.js
init_dist();
init_ModelUtil();
var markerIds = new Ids();
var ELEMENT_LABEL_DISTANCE = 10;
var INNER_OUTER_DIST = 3;
var PARTICIPANT_STROKE_WIDTH = 1.5;
var TASK_BORDER_RADIUS = 10;
var EXTERNAL_LABEL_BORDER_RADIUS = 4;
var DEFAULT_OPACITY = .95;
var FULL_OPACITY = 1;
var LOW_OPACITY = .25;
function BpmnRenderer(config, eventBus, styles, pathMap, canvas, textRenderer, priority) {
	BaseRenderer.call(this, eventBus, priority);
	var defaultFillColor = config && config.defaultFillColor, defaultStrokeColor = config && config.defaultStrokeColor, defaultLabelColor = config && config.defaultLabelColor;
	function shapeStyle(attrs) {
		return styles.computeStyle(attrs, {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			stroke: black,
			strokeWidth: 2,
			fill: "white"
		});
	}
	function lineStyle(attrs) {
		return styles.computeStyle(attrs, ["no-fill"], {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			stroke: black,
			strokeWidth: 2
		});
	}
	function addMarker(id, options) {
		var { ref = {
			x: 0,
			y: 0
		}, scale = 1, element, parentGfx = canvas._svg } = options;
		var marker = create("marker", {
			id,
			viewBox: "0 0 20 20",
			refX: ref.x,
			refY: ref.y,
			markerWidth: 20 * scale,
			markerHeight: 20 * scale,
			orient: "auto"
		});
		append(marker, element);
		var defs = query(":scope > defs", parentGfx);
		if (!defs) {
			defs = create("defs");
			append(parentGfx, defs);
		}
		append(defs, marker);
	}
	function marker(parentGfx, type, fill, stroke) {
		var id = markerIds.nextPrefixed("marker-");
		createMarker(parentGfx, id, type, fill, stroke);
		return "url(#" + id + ")";
	}
	function createMarker(parentGfx, id, type, fill, stroke) {
		if (type === "sequenceflow-end") addMarker(id, {
			element: create("path", {
				d: "M 1 5 L 11 10 L 1 15 Z",
				...shapeStyle({
					fill: stroke,
					stroke,
					strokeWidth: 1
				})
			}),
			ref: {
				x: 11,
				y: 10
			},
			scale: .5,
			parentGfx
		});
		if (type === "messageflow-start") addMarker(id, {
			element: create("circle", {
				cx: 6,
				cy: 6,
				r: 3.5,
				...shapeStyle({
					fill,
					stroke,
					strokeWidth: 1,
					strokeDasharray: [1e4, 1]
				})
			}),
			ref: {
				x: 6,
				y: 6
			},
			parentGfx
		});
		if (type === "messageflow-end") addMarker(id, {
			element: create("path", {
				d: "m 1 5 l 0 -3 l 7 3 l -7 3 z",
				...shapeStyle({
					fill,
					stroke,
					strokeWidth: 1,
					strokeDasharray: [1e4, 1]
				})
			}),
			ref: {
				x: 8.5,
				y: 5
			},
			parentGfx
		});
		if (type === "association-start") addMarker(id, {
			element: create("path", {
				d: "M 11 5 L 1 10 L 11 15",
				...lineStyle({
					fill: "none",
					stroke,
					strokeWidth: 1.5,
					strokeDasharray: [1e4, 1]
				})
			}),
			ref: {
				x: 1,
				y: 10
			},
			scale: .5,
			parentGfx
		});
		if (type === "association-end") addMarker(id, {
			element: create("path", {
				d: "M 1 5 L 11 10 L 1 15",
				...lineStyle({
					fill: "none",
					stroke,
					strokeWidth: 1.5,
					strokeDasharray: [1e4, 1]
				})
			}),
			ref: {
				x: 11,
				y: 10
			},
			scale: .5,
			parentGfx
		});
		if (type === "conditional-flow-marker") addMarker(id, {
			element: create("path", {
				d: "M 0 10 L 8 6 L 16 10 L 8 14 Z",
				...shapeStyle({
					fill,
					stroke
				})
			}),
			ref: {
				x: -1,
				y: 10
			},
			scale: .5,
			parentGfx
		});
		if (type === "conditional-default-flow-marker") addMarker(id, {
			element: create("path", {
				d: "M 6 4 L 10 16",
				...shapeStyle({
					stroke,
					fill: "none"
				})
			}),
			ref: {
				x: 0,
				y: 10
			},
			scale: .5,
			parentGfx
		});
	}
	function drawCircle(parentGfx, width, height, offset, attrs = {}) {
		if (isObject(offset)) {
			attrs = offset;
			offset = 0;
		}
		offset = offset || 0;
		attrs = shapeStyle(attrs);
		var cx = width / 2, cy = height / 2;
		var circle = create("circle", {
			cx,
			cy,
			r: Math.round((width + height) / 4 - offset),
			...attrs
		});
		append(parentGfx, circle);
		return circle;
	}
	function drawRect(parentGfx, width, height, r, offset, attrs) {
		if (isObject(offset)) {
			attrs = offset;
			offset = 0;
		}
		offset = offset || 0;
		attrs = shapeStyle(attrs);
		var rect = create("rect", {
			x: offset,
			y: offset,
			width: width - offset * 2,
			height: height - offset * 2,
			rx: r,
			ry: r,
			...attrs
		});
		append(parentGfx, rect);
		return rect;
	}
	function drawDiamond(parentGfx, width, height, attrs) {
		var x_2 = width / 2;
		var y_2 = height / 2;
		var pointsString = [
			{
				x: x_2,
				y: 0
			},
			{
				x: width,
				y: y_2
			},
			{
				x: x_2,
				y: height
			},
			{
				x: 0,
				y: y_2
			}
		].map(function(point) {
			return point.x + "," + point.y;
		}).join(" ");
		attrs = shapeStyle(attrs);
		var polygon = create("polygon", {
			...attrs,
			points: pointsString
		});
		append(parentGfx, polygon);
		return polygon;
	}
	function drawLine(parentGfx, waypoints, attrs, radius) {
		attrs = lineStyle(attrs);
		var line = createLine(waypoints, attrs, radius);
		append(parentGfx, line);
		return line;
	}
	function drawConnectionSegments(parentGfx, waypoints, attrs) {
		return drawLine(parentGfx, waypoints, attrs, 5);
	}
	function drawPath(parentGfx, d, attrs) {
		attrs = lineStyle(attrs);
		var path = create("path", {
			...attrs,
			d
		});
		append(parentGfx, path);
		return path;
	}
	function drawMarker(type, parentGfx, path, attrs) {
		return drawPath(parentGfx, path, assign$1({ "data-marker": type }, attrs));
	}
	function renderer(type) {
		return handlers[type];
	}
	function as(type) {
		return function(parentGfx, element, attrs) {
			return renderer(type)(parentGfx, element, attrs);
		};
	}
	var eventIconRenderers = {
		"bpmn:MessageEventDefinition": function(parentGfx, element, attrs = {}, isThrowing) {
			return drawPath(parentGfx, pathMap.getScaledPath("EVENT_MESSAGE", {
				xScaleFactor: .9,
				yScaleFactor: .9,
				containerWidth: attrs.width || element.width,
				containerHeight: attrs.height || element.height,
				position: {
					mx: .235,
					my: .315
				}
			}), {
				fill: isThrowing ? getStrokeColor(element, defaultStrokeColor, attrs.stroke) : getFillColor(element, defaultFillColor, attrs.fill),
				stroke: isThrowing ? getFillColor(element, defaultFillColor, attrs.fill) : getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
		},
		"bpmn:TimerEventDefinition": function(parentGfx, element, attrs = {}) {
			var baseWidth = attrs.width || element.width;
			var baseHeight = attrs.height || element.height;
			var strokeWidth = attrs.width ? 1 : 2;
			var circle = drawCircle(parentGfx, baseWidth, baseHeight, .2 * baseHeight, {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth
			});
			drawPath(parentGfx, pathMap.getScaledPath("EVENT_TIMER_WH", {
				xScaleFactor: .75,
				yScaleFactor: .75,
				containerWidth: baseWidth,
				containerHeight: baseHeight,
				position: {
					mx: .5,
					my: .5
				}
			}), {
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth
			});
			for (var i = 0; i < 12; i++) {
				var linePathData = pathMap.getScaledPath("EVENT_TIMER_LINE", {
					xScaleFactor: .75,
					yScaleFactor: .75,
					containerWidth: baseWidth,
					containerHeight: baseHeight,
					position: {
						mx: .5,
						my: .5
					}
				});
				var width = baseWidth / 2, height = baseHeight / 2;
				drawPath(parentGfx, linePathData, {
					strokeWidth: 1,
					stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
					transform: "rotate(" + i * 30 + "," + height + "," + width + ")"
				});
			}
			return circle;
		},
		"bpmn:EscalationEventDefinition": function(parentGfx, event, attrs = {}, isThrowing) {
			return drawPath(parentGfx, pathMap.getScaledPath("EVENT_ESCALATION", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: attrs.width || event.width,
				containerHeight: attrs.height || event.height,
				position: {
					mx: .5,
					my: .2
				}
			}), {
				fill: isThrowing ? getStrokeColor(event, defaultStrokeColor, attrs.stroke) : getFillColor(event, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(event, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
		},
		"bpmn:ConditionalEventDefinition": function(parentGfx, event, attrs = {}) {
			return drawPath(parentGfx, pathMap.getScaledPath("EVENT_CONDITIONAL", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: attrs.width || event.width,
				containerHeight: attrs.height || event.height,
				position: {
					mx: .5,
					my: .222
				}
			}), {
				fill: getFillColor(event, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(event, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
		},
		"bpmn:LinkEventDefinition": function(parentGfx, event, attrs = {}, isThrowing) {
			return drawPath(parentGfx, pathMap.getScaledPath("EVENT_LINK", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: event.width,
				containerHeight: event.height,
				position: {
					mx: .57,
					my: .263
				}
			}), {
				fill: isThrowing ? getStrokeColor(event, defaultStrokeColor, attrs.stroke) : getFillColor(event, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(event, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
		},
		"bpmn:ErrorEventDefinition": function(parentGfx, event, attrs = {}, isThrowing) {
			return drawPath(parentGfx, pathMap.getScaledPath("EVENT_ERROR", {
				xScaleFactor: 1.1,
				yScaleFactor: 1.1,
				containerWidth: attrs.width || event.width,
				containerHeight: attrs.height || event.height,
				position: {
					mx: .2,
					my: .722
				}
			}), {
				fill: isThrowing ? getStrokeColor(event, defaultStrokeColor, attrs.stroke) : getFillColor(event, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(event, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
		},
		"bpmn:CancelEventDefinition": function(parentGfx, event, attrs = {}, isThrowing) {
			var path = drawPath(parentGfx, pathMap.getScaledPath("EVENT_CANCEL_45", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: event.width,
				containerHeight: event.height,
				position: {
					mx: .638,
					my: -.055
				}
			}), {
				fill: isThrowing ? getStrokeColor(event, defaultStrokeColor, attrs.stroke) : "none",
				stroke: getStrokeColor(event, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			rotate(path, 45);
			return path;
		},
		"bpmn:CompensateEventDefinition": function(parentGfx, event, attrs = {}, isThrowing) {
			return drawPath(parentGfx, pathMap.getScaledPath("EVENT_COMPENSATION", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: attrs.width || event.width,
				containerHeight: attrs.height || event.height,
				position: {
					mx: .22,
					my: .5
				}
			}), {
				fill: isThrowing ? getStrokeColor(event, defaultStrokeColor, attrs.stroke) : getFillColor(event, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(event, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
		},
		"bpmn:SignalEventDefinition": function(parentGfx, event, attrs = {}, isThrowing) {
			return drawPath(parentGfx, pathMap.getScaledPath("EVENT_SIGNAL", {
				xScaleFactor: .9,
				yScaleFactor: .9,
				containerWidth: attrs.width || event.width,
				containerHeight: attrs.height || event.height,
				position: {
					mx: .5,
					my: .2
				}
			}), {
				strokeWidth: 1,
				fill: isThrowing ? getStrokeColor(event, defaultStrokeColor, attrs.stroke) : getFillColor(event, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(event, defaultStrokeColor, attrs.stroke)
			});
		},
		"bpmn:MultipleEventDefinition": function(parentGfx, event, attrs = {}, isThrowing) {
			return drawPath(parentGfx, pathMap.getScaledPath("EVENT_MULTIPLE", {
				xScaleFactor: 1.1,
				yScaleFactor: 1.1,
				containerWidth: attrs.width || event.width,
				containerHeight: attrs.height || event.height,
				position: {
					mx: .211,
					my: .36
				}
			}), {
				fill: isThrowing ? getStrokeColor(event, defaultStrokeColor, attrs.stroke) : getFillColor(event, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(event, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
		},
		"bpmn:ParallelMultipleEventDefinition": function(parentGfx, event, attrs = {}) {
			return drawPath(parentGfx, pathMap.getScaledPath("EVENT_PARALLEL_MULTIPLE", {
				xScaleFactor: 1.2,
				yScaleFactor: 1.2,
				containerWidth: attrs.width || event.width,
				containerHeight: attrs.height || event.height,
				position: {
					mx: .458,
					my: .194
				}
			}), {
				fill: getFillColor(event, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(event, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
		},
		"bpmn:TerminateEventDefinition": function(parentGfx, element, attrs = {}) {
			return drawCircle(parentGfx, element.width, element.height, 8, {
				fill: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 4
			});
		}
	};
	function renderEventIcon(element, parentGfx, attrs = {}, proxyElement) {
		var semantic = getBusinessObject(element), isThrowing = isThrowEvent(semantic);
		var nodeElement = proxyElement || element;
		if (semantic.get("eventDefinitions") && semantic.get("eventDefinitions").length > 1) {
			if (semantic.get("parallelMultiple")) return eventIconRenderers["bpmn:ParallelMultipleEventDefinition"](parentGfx, nodeElement, attrs, isThrowing);
			else return eventIconRenderers["bpmn:MultipleEventDefinition"](parentGfx, nodeElement, attrs, isThrowing);
		}
		if (isTypedEvent$2(semantic, "bpmn:MessageEventDefinition")) return eventIconRenderers["bpmn:MessageEventDefinition"](parentGfx, nodeElement, attrs, isThrowing);
		if (isTypedEvent$2(semantic, "bpmn:TimerEventDefinition")) return eventIconRenderers["bpmn:TimerEventDefinition"](parentGfx, nodeElement, attrs, isThrowing);
		if (isTypedEvent$2(semantic, "bpmn:ConditionalEventDefinition")) return eventIconRenderers["bpmn:ConditionalEventDefinition"](parentGfx, nodeElement, attrs, isThrowing);
		if (isTypedEvent$2(semantic, "bpmn:SignalEventDefinition")) return eventIconRenderers["bpmn:SignalEventDefinition"](parentGfx, nodeElement, attrs, isThrowing);
		if (isTypedEvent$2(semantic, "bpmn:EscalationEventDefinition")) return eventIconRenderers["bpmn:EscalationEventDefinition"](parentGfx, nodeElement, attrs, isThrowing);
		if (isTypedEvent$2(semantic, "bpmn:LinkEventDefinition")) return eventIconRenderers["bpmn:LinkEventDefinition"](parentGfx, nodeElement, attrs, isThrowing);
		if (isTypedEvent$2(semantic, "bpmn:ErrorEventDefinition")) return eventIconRenderers["bpmn:ErrorEventDefinition"](parentGfx, nodeElement, attrs, isThrowing);
		if (isTypedEvent$2(semantic, "bpmn:CancelEventDefinition")) return eventIconRenderers["bpmn:CancelEventDefinition"](parentGfx, nodeElement, attrs, isThrowing);
		if (isTypedEvent$2(semantic, "bpmn:CompensateEventDefinition")) return eventIconRenderers["bpmn:CompensateEventDefinition"](parentGfx, nodeElement, attrs, isThrowing);
		if (isTypedEvent$2(semantic, "bpmn:TerminateEventDefinition")) return eventIconRenderers["bpmn:TerminateEventDefinition"](parentGfx, nodeElement, attrs, isThrowing);
		return null;
	}
	var taskMarkerRenderers = {
		"ParticipantMultiplicityMarker": function(parentGfx, element, attrs = {}) {
			var width = getWidth(element, attrs), height = getHeight(element, attrs);
			drawMarker("participant-multiplicity", parentGfx, pathMap.getScaledPath("MARKER_PARALLEL", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: width,
				containerHeight: height,
				position: {
					mx: (width / 2 - 6) / width,
					my: (height - 15) / height
				}
			}), {
				strokeWidth: 2,
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke)
			});
		},
		"SubProcessMarker": function(parentGfx, element, attrs = {}) {
			var markerRect = drawRect(parentGfx, 14, 14, 0, {
				strokeWidth: 1,
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke)
			});
			translate(markerRect, element.width / 2 - 7.5, element.height - 20);
			drawMarker("sub-process", parentGfx, pathMap.getScaledPath("MARKER_SUB_PROCESS", {
				xScaleFactor: 1.5,
				yScaleFactor: 1.5,
				containerWidth: element.width,
				containerHeight: element.height,
				position: {
					mx: (element.width / 2 - 7.5) / element.width,
					my: (element.height - 20) / element.height
				}
			}), {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke)
			});
		},
		"ParallelMarker": function(parentGfx, element, attrs) {
			var width = getWidth(element, attrs), height = getHeight(element, attrs);
			drawMarker("parallel", parentGfx, pathMap.getScaledPath("MARKER_PARALLEL", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: width,
				containerHeight: height,
				position: {
					mx: (width / 2 + attrs.parallel) / width,
					my: (height - 20) / height
				}
			}), {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke)
			});
		},
		"SequentialMarker": function(parentGfx, element, attrs) {
			drawMarker("sequential", parentGfx, pathMap.getScaledPath("MARKER_SEQUENTIAL", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: element.width,
				containerHeight: element.height,
				position: {
					mx: (element.width / 2 + attrs.seq) / element.width,
					my: (element.height - 19) / element.height
				}
			}), {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke)
			});
		},
		"CompensationMarker": function(parentGfx, element, attrs) {
			drawMarker("compensation", parentGfx, pathMap.getScaledPath("MARKER_COMPENSATION", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: element.width,
				containerHeight: element.height,
				position: {
					mx: (element.width / 2 + attrs.compensation) / element.width,
					my: (element.height - 13) / element.height
				}
			}), {
				strokeWidth: 1,
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke)
			});
		},
		"LoopMarker": function(parentGfx, element, attrs) {
			var width = getWidth(element, attrs), height = getHeight(element, attrs);
			drawMarker("loop", parentGfx, pathMap.getScaledPath("MARKER_LOOP", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: width,
				containerHeight: height,
				position: {
					mx: (width / 2 + attrs.loop) / width,
					my: (height - 7) / height
				}
			}), {
				strokeWidth: 1.5,
				fill: "none",
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeMiterlimit: .5
			});
		},
		"AdhocMarker": function(parentGfx, element, attrs) {
			var width = getWidth(element, attrs), height = getHeight(element, attrs);
			drawMarker("adhoc", parentGfx, pathMap.getScaledPath("MARKER_ADHOC", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: width,
				containerHeight: height,
				position: {
					mx: (width / 2 + attrs.adhoc) / width,
					my: (height - 15) / height
				}
			}), {
				strokeWidth: 1,
				fill: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke)
			});
		}
	};
	function renderTaskMarker(type, parentGfx, element, attrs) {
		taskMarkerRenderers[type](parentGfx, element, attrs);
	}
	function renderTaskMarkers(parentGfx, element, taskMarkers = [], attrs = {}) {
		attrs = {
			fill: attrs.fill,
			stroke: attrs.stroke,
			width: getWidth(element, attrs),
			height: getHeight(element, attrs)
		};
		var semantic = getBusinessObject(element);
		var subprocess = taskMarkers.includes("SubProcessMarker");
		if (subprocess) attrs = {
			...attrs,
			seq: -21,
			parallel: -22,
			compensation: -25,
			loop: -18,
			adhoc: 10
		};
		else attrs = {
			...attrs,
			seq: -5,
			parallel: -6,
			compensation: -7,
			loop: 0,
			adhoc: -8
		};
		if (semantic.get("isForCompensation")) taskMarkers.push("CompensationMarker");
		if (is$1(semantic, "bpmn:AdHocSubProcess")) {
			taskMarkers.push("AdhocMarker");
			if (!subprocess) assign$1(attrs, { compensation: attrs.compensation - 18 });
		}
		var loopCharacteristics = semantic.get("loopCharacteristics"), isSequential = loopCharacteristics && loopCharacteristics.get("isSequential");
		if (loopCharacteristics) {
			assign$1(attrs, { compensation: attrs.compensation - 18 });
			if (taskMarkers.includes("AdhocMarker")) assign$1(attrs, {
				seq: -23,
				loop: -18,
				parallel: -24
			});
			if (isSequential === void 0) taskMarkers.push("LoopMarker");
			if (isSequential === false) taskMarkers.push("ParallelMarker");
			if (isSequential === true) taskMarkers.push("SequentialMarker");
		}
		if (taskMarkers.includes("CompensationMarker") && taskMarkers.length === 1) assign$1(attrs, { compensation: -8 });
		forEach(taskMarkers, function(marker) {
			renderTaskMarker(marker, parentGfx, element, attrs);
		});
	}
	function renderLabel(parentGfx, label, attrs = {}) {
		attrs = assign$1({ size: { width: 100 } }, attrs);
		var text = textRenderer.createText(label || "", attrs);
		classes$1(text).add("djs-label");
		append(parentGfx, text);
		return text;
	}
	function renderEmbeddedLabel(parentGfx, element, align, attrs = {}) {
		var semantic = getBusinessObject(element);
		var box = getBounds({
			x: element.x,
			y: element.y,
			width: element.width,
			height: element.height
		}, attrs);
		return renderLabel(parentGfx, semantic.name, {
			align,
			box,
			padding: 7,
			style: { fill: getLabelColor(element, defaultLabelColor, defaultStrokeColor, attrs.stroke) }
		});
	}
	function renderExternalLabel(parentGfx, element, attrs = {}) {
		var box = {
			width: element.width,
			height: element.height,
			x: element.width / 2 + element.x,
			y: element.height / 2 + element.y
		};
		return renderLabel(parentGfx, getLabel(element), {
			box,
			style: assign$1({}, textRenderer.getExternalStyle(), { fill: getLabelColor(element, defaultLabelColor, defaultStrokeColor, attrs.stroke) })
		});
	}
	function renderLaneLabel(parentGfx, text, element, attrs = {}) {
		var isHorizontalLane = isHorizontal(element);
		var textBox = renderLabel(parentGfx, text, {
			box: {
				height: 30,
				width: isHorizontalLane ? getHeight(element, attrs) : getWidth(element, attrs)
			},
			align: "center-middle",
			style: { fill: getLabelColor(element, defaultLabelColor, defaultStrokeColor, attrs.stroke) }
		});
		if (isHorizontalLane) {
			var top = -1 * getHeight(element, attrs);
			transform(textBox, 0, -top, 270);
		}
	}
	function renderActivity(parentGfx, element, attrs = {}) {
		var { width, height } = getBounds(element, attrs);
		return drawRect(parentGfx, width, height, TASK_BORDER_RADIUS, {
			...attrs,
			fill: getFillColor(element, defaultFillColor, attrs.fill),
			fillOpacity: DEFAULT_OPACITY,
			stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke)
		});
	}
	function renderAssociation(parentGfx, element, attrs = {}) {
		var semantic = getBusinessObject(element);
		var fill = getFillColor(element, defaultFillColor, attrs.fill), stroke = getStrokeColor(element, defaultStrokeColor, attrs.stroke);
		if (semantic.get("associationDirection") === "One" || semantic.get("associationDirection") === "Both") attrs.markerEnd = marker(parentGfx, "association-end", fill, stroke);
		if (semantic.get("associationDirection") === "Both") attrs.markerStart = marker(parentGfx, "association-start", fill, stroke);
		attrs = pickAttrs(attrs, ["markerStart", "markerEnd"]);
		return drawConnectionSegments(parentGfx, element.waypoints, {
			...attrs,
			stroke,
			strokeDasharray: "0, 5"
		});
	}
	function renderDataObject(parentGfx, element, attrs = {}) {
		var fill = getFillColor(element, defaultFillColor, attrs.fill), stroke = getStrokeColor(element, defaultStrokeColor, attrs.stroke);
		var dataObject = drawPath(parentGfx, pathMap.getScaledPath("DATA_OBJECT_PATH", {
			xScaleFactor: 1,
			yScaleFactor: 1,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: .474,
				my: .296
			}
		}), {
			fill,
			fillOpacity: DEFAULT_OPACITY,
			stroke
		});
		if (isCollection(getBusinessObject(element))) drawPath(parentGfx, pathMap.getScaledPath("DATA_OBJECT_COLLECTION_PATH", {
			xScaleFactor: 1,
			yScaleFactor: 1,
			containerWidth: element.width,
			containerHeight: element.height,
			position: {
				mx: .33,
				my: (element.height - 18) / element.height
			}
		}), {
			strokeWidth: 2,
			fill,
			stroke
		});
		return dataObject;
	}
	function renderEvent(parentGfx, element, attrs = {}) {
		return drawCircle(parentGfx, element.width, element.height, {
			fillOpacity: DEFAULT_OPACITY,
			...attrs,
			fill: getFillColor(element, defaultFillColor, attrs.fill),
			stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke)
		});
	}
	function renderGateway(parentGfx, element, attrs = {}) {
		return drawDiamond(parentGfx, element.width, element.height, {
			fill: getFillColor(element, defaultFillColor, attrs.fill),
			fillOpacity: DEFAULT_OPACITY,
			stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke)
		});
	}
	function renderLane(parentGfx, element, attrs = {}) {
		var lane = drawRect(parentGfx, getWidth(element, attrs), getHeight(element, attrs), 0, {
			fill: getFillColor(element, defaultFillColor, attrs.fill),
			fillOpacity: attrs.fillOpacity || DEFAULT_OPACITY,
			stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
			strokeWidth: 1.5
		});
		var semantic = getBusinessObject(element);
		if (is$1(semantic, "bpmn:Lane")) renderLaneLabel(parentGfx, semantic.get("name"), element, attrs);
		return lane;
	}
	function renderSubProcess(parentGfx, element, attrs = {}) {
		var activity = renderActivity(parentGfx, element, attrs);
		var expanded = isExpanded(element);
		if (isEventSubProcess$1(element)) {
			attr(activity, {
				strokeDasharray: "0, 5.5",
				strokeWidth: 2.5
			});
			if (!expanded) {
				var startEvents = (getBusinessObject(element).flowElements || []).filter((e) => is$1(e, "bpmn:StartEvent"));
				if (startEvents.length === 1) renderEventSubProcessIcon(startEvents[0], parentGfx, attrs, element);
			}
		}
		renderEmbeddedLabel(parentGfx, element, expanded ? "center-top" : "center-middle", attrs);
		if (expanded) renderTaskMarkers(parentGfx, element, void 0, attrs);
		else renderTaskMarkers(parentGfx, element, ["SubProcessMarker"], attrs);
		return activity;
	}
	function renderEventSubProcessIcon(startEvent, parentGfx, attrs, proxyElement) {
		var iconSize = 22;
		var proxyAttrs = {
			fill: getFillColor(proxyElement, defaultFillColor, attrs.fill),
			stroke: getStrokeColor(proxyElement, defaultStrokeColor, attrs.stroke),
			width: iconSize,
			height: iconSize
		};
		var interrupting = getBusinessObject(startEvent).isInterrupting;
		var strokeDasharray = interrupting ? 0 : 3;
		var strokeWidth = interrupting ? 1 : 1.2;
		var circleSize = 20;
		var shift = (iconSize - circleSize) / 2;
		var transform = "translate(" + shift + "," + shift + ")";
		drawCircle(parentGfx, circleSize, circleSize, {
			fill: proxyAttrs.fill,
			stroke: proxyAttrs.stroke,
			strokeWidth,
			strokeDasharray,
			transform
		});
		renderEventIcon(startEvent, parentGfx, proxyAttrs, proxyElement);
	}
	function renderTask(parentGfx, element, attrs = {}) {
		var activity = renderActivity(parentGfx, element, attrs);
		renderEmbeddedLabel(parentGfx, element, "center-middle", attrs);
		renderTaskMarkers(parentGfx, element, void 0, attrs);
		return activity;
	}
	var handlers = this.handlers = {
		"bpmn:AdHocSubProcess": function(parentGfx, element, attrs = {}) {
			if (isExpanded(element)) attrs = pickAttrs(attrs, [
				"fill",
				"stroke",
				"width",
				"height"
			]);
			else attrs = pickAttrs(attrs, ["fill", "stroke"]);
			return renderSubProcess(parentGfx, element, attrs);
		},
		"bpmn:Association": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			return renderAssociation(parentGfx, element, attrs);
		},
		"bpmn:BoundaryEvent": function(parentGfx, element, attrs = {}) {
			var { renderIcon = true } = attrs;
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var cancelActivity = getBusinessObject(element).get("cancelActivity");
			attrs = {
				strokeWidth: 1.5,
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				fillOpacity: FULL_OPACITY,
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke)
			};
			if (!cancelActivity) attrs.strokeDasharray = "6";
			var event = renderEvent(parentGfx, element, attrs);
			drawCircle(parentGfx, element.width, element.height, INNER_OUTER_DIST, {
				...attrs,
				fill: "none"
			});
			if (renderIcon) renderEventIcon(element, parentGfx, attrs);
			return event;
		},
		"bpmn:BusinessRuleTask": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var task = renderTask(parentGfx, element, attrs);
			var businessPath = drawPath(parentGfx, pathMap.getScaledPath("TASK_TYPE_BUSINESS_RULE_MAIN", { abspos: {
				x: 8,
				y: 8
			} }));
			attr(businessPath, {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			var businessHeaderPath = drawPath(parentGfx, pathMap.getScaledPath("TASK_TYPE_BUSINESS_RULE_HEADER", { abspos: {
				x: 8,
				y: 8
			} }));
			attr(businessHeaderPath, {
				fill: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			return task;
		},
		"bpmn:CallActivity": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			return renderSubProcess(parentGfx, element, {
				strokeWidth: 5,
				...attrs
			});
		},
		"bpmn:ComplexGateway": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var gateway = renderGateway(parentGfx, element, attrs);
			drawPath(parentGfx, pathMap.getScaledPath("GATEWAY_COMPLEX", {
				xScaleFactor: .5,
				yScaleFactor: .5,
				containerWidth: element.width,
				containerHeight: element.height,
				position: {
					mx: .46,
					my: .26
				}
			}), {
				fill: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			return gateway;
		},
		"bpmn:DataInput": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var arrowPathData = pathMap.getRawPath("DATA_ARROW");
			var dataObject = renderDataObject(parentGfx, element, attrs);
			drawPath(parentGfx, arrowPathData, {
				fill: "none",
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			return dataObject;
		},
		"bpmn:DataInputAssociation": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			return renderAssociation(parentGfx, element, {
				...attrs,
				markerEnd: marker(parentGfx, "association-end", getFillColor(element, defaultFillColor, attrs.fill), getStrokeColor(element, defaultStrokeColor, attrs.stroke))
			});
		},
		"bpmn:DataObject": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			return renderDataObject(parentGfx, element, attrs);
		},
		"bpmn:DataObjectReference": as("bpmn:DataObject"),
		"bpmn:DataOutput": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var arrowPathData = pathMap.getRawPath("DATA_ARROW");
			var dataObject = renderDataObject(parentGfx, element, attrs);
			drawPath(parentGfx, arrowPathData, {
				strokeWidth: 1,
				fill: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke)
			});
			return dataObject;
		},
		"bpmn:DataOutputAssociation": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			return renderAssociation(parentGfx, element, {
				...attrs,
				markerEnd: marker(parentGfx, "association-end", getFillColor(element, defaultFillColor, attrs.fill), getStrokeColor(element, defaultStrokeColor, attrs.stroke))
			});
		},
		"bpmn:DataStoreReference": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			return drawPath(parentGfx, pathMap.getScaledPath("DATA_STORE", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: element.width,
				containerHeight: element.height,
				position: {
					mx: 0,
					my: .133
				}
			}), {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				fillOpacity: DEFAULT_OPACITY,
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 2
			});
		},
		"bpmn:EndEvent": function(parentGfx, element, attrs = {}) {
			var { renderIcon = true } = attrs;
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var event = renderEvent(parentGfx, element, {
				...attrs,
				strokeWidth: 4
			});
			if (renderIcon) renderEventIcon(element, parentGfx, attrs);
			return event;
		},
		"bpmn:EventBasedGateway": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var semantic = getBusinessObject(element);
			var diamond = renderGateway(parentGfx, element, attrs);
			drawCircle(parentGfx, element.width, element.height, element.height * .2, {
				fill: getFillColor(element, "none", attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			var type = semantic.get("eventGatewayType"), instantiate = !!semantic.get("instantiate");
			function drawEvent() {
				drawPath(parentGfx, pathMap.getScaledPath("GATEWAY_EVENT_BASED", {
					xScaleFactor: .18,
					yScaleFactor: .18,
					containerWidth: element.width,
					containerHeight: element.height,
					position: {
						mx: .36,
						my: .44
					}
				}), {
					fill: "none",
					stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
					strokeWidth: 2
				});
			}
			if (type === "Parallel") drawPath(parentGfx, pathMap.getScaledPath("GATEWAY_PARALLEL", {
				xScaleFactor: .4,
				yScaleFactor: .4,
				containerWidth: element.width,
				containerHeight: element.height,
				position: {
					mx: .474,
					my: .296
				}
			}), {
				fill: "none",
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			else if (type === "Exclusive") {
				if (!instantiate) drawCircle(parentGfx, element.width, element.height, element.height * .26, {
					fill: "none",
					stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
					strokeWidth: 1
				});
				drawEvent();
			}
			return diamond;
		},
		"bpmn:ExclusiveGateway": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var gateway = renderGateway(parentGfx, element, attrs);
			var pathData = pathMap.getScaledPath("GATEWAY_EXCLUSIVE", {
				xScaleFactor: .4,
				yScaleFactor: .4,
				containerWidth: element.width,
				containerHeight: element.height,
				position: {
					mx: .32,
					my: .3
				}
			});
			if (getDi(element).get("isMarkerVisible")) drawPath(parentGfx, pathData, {
				fill: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			return gateway;
		},
		"bpmn:Gateway": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			return renderGateway(parentGfx, element, attrs);
		},
		"bpmn:Group": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, [
				"fill",
				"stroke",
				"width",
				"height"
			]);
			return drawRect(parentGfx, element.width, element.height, TASK_BORDER_RADIUS, {
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1.5,
				strokeDasharray: "10, 6, 0, 6",
				fill: "none",
				pointerEvents: "none",
				width: getWidth(element, attrs),
				height: getHeight(element, attrs)
			});
		},
		"bpmn:InclusiveGateway": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var gateway = renderGateway(parentGfx, element, attrs);
			drawCircle(parentGfx, element.width, element.height, element.height * .24, {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 2.5
			});
			return gateway;
		},
		"bpmn:IntermediateEvent": function(parentGfx, element, attrs = {}) {
			var { renderIcon = true } = attrs;
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var outer = renderEvent(parentGfx, element, {
				...attrs,
				strokeWidth: 1.5
			});
			drawCircle(parentGfx, element.width, element.height, INNER_OUTER_DIST, {
				fill: "none",
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1.5
			});
			if (renderIcon) renderEventIcon(element, parentGfx, attrs);
			return outer;
		},
		"bpmn:IntermediateCatchEvent": as("bpmn:IntermediateEvent"),
		"bpmn:IntermediateThrowEvent": as("bpmn:IntermediateEvent"),
		"bpmn:Lane": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, [
				"fill",
				"stroke",
				"width",
				"height"
			]);
			return renderLane(parentGfx, element, {
				...attrs,
				fillOpacity: LOW_OPACITY
			});
		},
		"bpmn:ManualTask": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var task = renderTask(parentGfx, element, attrs);
			drawPath(parentGfx, pathMap.getScaledPath("TASK_TYPE_MANUAL", { abspos: {
				x: 17,
				y: 15
			} }), {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: .5
			});
			return task;
		},
		"bpmn:MessageFlow": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var semantic = getBusinessObject(element), di = getDi(element);
			var fill = getFillColor(element, defaultFillColor, attrs.fill), stroke = getStrokeColor(element, defaultStrokeColor, attrs.stroke);
			var path = drawConnectionSegments(parentGfx, element.waypoints, {
				markerEnd: marker(parentGfx, "messageflow-end", fill, stroke),
				markerStart: marker(parentGfx, "messageflow-start", fill, stroke),
				stroke,
				strokeDasharray: "10, 11",
				strokeWidth: 1.5
			});
			if (semantic.get("messageRef")) {
				var midPoint = path.getPointAtLength(path.getTotalLength() / 2);
				var markerPathData = pathMap.getScaledPath("MESSAGE_FLOW_MARKER", { abspos: {
					x: midPoint.x,
					y: midPoint.y
				} });
				var messageAttrs = { strokeWidth: 1 };
				if (di.get("messageVisibleKind") === "initiating") {
					messageAttrs.fill = fill;
					messageAttrs.stroke = stroke;
				} else {
					messageAttrs.fill = stroke;
					messageAttrs.stroke = fill;
				}
				var message = drawPath(parentGfx, markerPathData, messageAttrs);
				var label = renderLabel(parentGfx, semantic.get("messageRef").get("name"), {
					align: "center-top",
					fitBox: true,
					style: { fill: stroke }
				});
				var messageBounds = message.getBBox(), labelBounds = label.getBBox();
				var translateX = midPoint.x - labelBounds.width / 2, translateY = midPoint.y + messageBounds.height / 2 + ELEMENT_LABEL_DISTANCE;
				transform(label, translateX, translateY, 0);
			}
			return path;
		},
		"bpmn:ParallelGateway": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var diamond = renderGateway(parentGfx, element, attrs);
			drawPath(parentGfx, pathMap.getScaledPath("GATEWAY_PARALLEL", {
				xScaleFactor: .6,
				yScaleFactor: .6,
				containerWidth: element.width,
				containerHeight: element.height,
				position: {
					mx: .46,
					my: .2
				}
			}), {
				fill: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			return diamond;
		},
		"bpmn:Participant": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, [
				"fill",
				"stroke",
				"width",
				"height"
			]);
			var participant = renderLane(parentGfx, element, attrs);
			var expandedParticipant = isExpanded(element);
			var horizontalParticipant = isHorizontal(element);
			var semantic = getBusinessObject(element), name = semantic.get("name");
			if (expandedParticipant) {
				drawLine(parentGfx, horizontalParticipant ? [{
					x: 30,
					y: 0
				}, {
					x: 30,
					y: getHeight(element, attrs)
				}] : [{
					x: 0,
					y: 30
				}, {
					x: getWidth(element, attrs),
					y: 30
				}], {
					stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
					strokeWidth: PARTICIPANT_STROKE_WIDTH
				});
				renderLaneLabel(parentGfx, name, element, attrs);
			} else {
				var bounds = getBounds(element, attrs);
				if (!horizontalParticipant) {
					bounds.height = getWidth(element, attrs);
					bounds.width = getHeight(element, attrs);
				}
				var textBox = renderLabel(parentGfx, name, {
					box: bounds,
					align: "center-middle",
					style: { fill: getLabelColor(element, defaultLabelColor, defaultStrokeColor, attrs.stroke) }
				});
				if (!horizontalParticipant) {
					var top = -1 * getHeight(element, attrs);
					transform(textBox, 0, -top, 270);
				}
			}
			if (semantic.get("participantMultiplicity")) renderTaskMarker("ParticipantMultiplicityMarker", parentGfx, element, attrs);
			return participant;
		},
		"bpmn:ReceiveTask": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var semantic = getBusinessObject(element);
			var task = renderTask(parentGfx, element, attrs);
			var pathData;
			if (semantic.get("instantiate")) {
				drawCircle(parentGfx, 28, 28, 4.4, {
					fill: getFillColor(element, defaultFillColor, attrs.fill),
					stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
					strokeWidth: 1
				});
				pathData = pathMap.getScaledPath("TASK_TYPE_INSTANTIATING_SEND", { abspos: {
					x: 7.77,
					y: 9.52
				} });
			} else pathData = pathMap.getScaledPath("TASK_TYPE_SEND", {
				xScaleFactor: .9,
				yScaleFactor: .9,
				containerWidth: 21,
				containerHeight: 14,
				position: {
					mx: .3,
					my: .4
				}
			});
			drawPath(parentGfx, pathData, {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			return task;
		},
		"bpmn:ScriptTask": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var task = renderTask(parentGfx, element, attrs);
			drawPath(parentGfx, pathMap.getScaledPath("TASK_TYPE_SCRIPT", { abspos: {
				x: 15,
				y: 20
			} }), {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			return task;
		},
		"bpmn:SendTask": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var task = renderTask(parentGfx, element, attrs);
			drawPath(parentGfx, pathMap.getScaledPath("TASK_TYPE_SEND", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: 21,
				containerHeight: 14,
				position: {
					mx: .285,
					my: .357
				}
			}), {
				fill: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				stroke: getFillColor(element, defaultFillColor, attrs.fill),
				strokeWidth: 1
			});
			return task;
		},
		"bpmn:SequenceFlow": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var fill = getFillColor(element, defaultFillColor, attrs.fill), stroke = getStrokeColor(element, defaultStrokeColor, attrs.stroke);
			var connection = drawConnectionSegments(parentGfx, element.waypoints, {
				markerEnd: marker(parentGfx, "sequenceflow-end", fill, stroke),
				stroke
			});
			var semantic = getBusinessObject(element);
			var { source } = element;
			if (source) {
				var sourceSemantic = getBusinessObject(source);
				if (semantic.get("conditionExpression") && is$1(sourceSemantic, "bpmn:Activity")) attr(connection, { markerStart: marker(parentGfx, "conditional-flow-marker", fill, stroke) });
				if (sourceSemantic.get("default") && (is$1(sourceSemantic, "bpmn:Gateway") || is$1(sourceSemantic, "bpmn:Activity")) && sourceSemantic.get("default") === semantic) attr(connection, { markerStart: marker(parentGfx, "conditional-default-flow-marker", fill, stroke) });
			}
			return connection;
		},
		"bpmn:ServiceTask": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var task = renderTask(parentGfx, element, attrs);
			drawCircle(parentGfx, 10, 10, {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: "none",
				transform: "translate(6, 6)"
			});
			drawPath(parentGfx, pathMap.getScaledPath("TASK_TYPE_SERVICE", { abspos: {
				x: 12,
				y: 18
			} }), {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			drawCircle(parentGfx, 10, 10, {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: "none",
				transform: "translate(11, 10)"
			});
			drawPath(parentGfx, pathMap.getScaledPath("TASK_TYPE_SERVICE", { abspos: {
				x: 17,
				y: 22
			} }), {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1
			});
			return task;
		},
		"bpmn:StartEvent": function(parentGfx, element, attrs = {}) {
			var { renderIcon = true } = attrs;
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			if (!getBusinessObject(element).get("isInterrupting")) attrs = {
				...attrs,
				strokeDasharray: "6"
			};
			var event = renderEvent(parentGfx, element, attrs);
			if (renderIcon) renderEventIcon(element, parentGfx, attrs);
			return event;
		},
		"bpmn:SubProcess": function(parentGfx, element, attrs = {}) {
			if (isExpanded(element)) attrs = pickAttrs(attrs, [
				"fill",
				"stroke",
				"width",
				"height"
			]);
			else attrs = pickAttrs(attrs, ["fill", "stroke"]);
			return renderSubProcess(parentGfx, element, attrs);
		},
		"bpmn:Task": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			return renderTask(parentGfx, element, attrs);
		},
		"bpmn:TextAnnotation": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var { width, height } = getBounds(element, attrs);
			var textElement = drawRect(parentGfx, width, height, 0, 0, {
				fill: "none",
				stroke: "none"
			});
			drawPath(parentGfx, pathMap.getScaledPath("TEXT_ANNOTATION", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: width,
				containerHeight: height,
				position: {
					mx: 0,
					my: 0
				}
			}), { stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke) });
			renderLabel(parentGfx, getBusinessObject(element).get("text") || "", {
				align: "left-top",
				box: getBounds(element, attrs),
				padding: 7,
				style: { fill: getLabelColor(element, defaultLabelColor, defaultStrokeColor, attrs.stroke) }
			});
			return textElement;
		},
		"bpmn:Transaction": function(parentGfx, element, attrs = {}) {
			if (isExpanded(element)) attrs = pickAttrs(attrs, [
				"fill",
				"stroke",
				"width",
				"height"
			]);
			else attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var outer = renderSubProcess(parentGfx, element, {
				strokeWidth: 1.5,
				...attrs
			});
			var innerAttrs = styles.style(["no-fill", "no-events"], {
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: 1.5
			});
			if (!isExpanded(element)) attrs = {};
			drawRect(parentGfx, getWidth(element, attrs), getHeight(element, attrs), TASK_BORDER_RADIUS - INNER_OUTER_DIST, INNER_OUTER_DIST, innerAttrs);
			return outer;
		},
		"bpmn:UserTask": function(parentGfx, element, attrs = {}) {
			attrs = pickAttrs(attrs, ["fill", "stroke"]);
			var task = renderTask(parentGfx, element, attrs);
			var x = 15;
			var y = 12;
			drawPath(parentGfx, pathMap.getScaledPath("TASK_TYPE_USER_1", { abspos: {
				x,
				y
			} }), {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: .5
			});
			drawPath(parentGfx, pathMap.getScaledPath("TASK_TYPE_USER_2", { abspos: {
				x,
				y
			} }), {
				fill: getFillColor(element, defaultFillColor, attrs.fill),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: .5
			});
			drawPath(parentGfx, pathMap.getScaledPath("TASK_TYPE_USER_3", { abspos: {
				x,
				y
			} }), {
				fill: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				stroke: getStrokeColor(element, defaultStrokeColor, attrs.stroke),
				strokeWidth: .5
			});
			return task;
		},
		"label": function(parentGfx, element, attrs = {}) {
			return renderExternalLabel(parentGfx, element, attrs);
		}
	};
	this._drawPath = drawPath;
	this._renderer = renderer;
}
e(BpmnRenderer, BaseRenderer);
BpmnRenderer.$inject = [
	"config.bpmnRenderer",
	"eventBus",
	"styles",
	"pathMap",
	"canvas",
	"textRenderer"
];
BpmnRenderer.prototype.canRender = function(element) {
	return is$1(element, "bpmn:BaseElement");
};
BpmnRenderer.prototype.drawShape = function(parentGfx, shape, attrs = {}) {
	var { type } = shape;
	return this._renderer(type)(parentGfx, shape, attrs);
};
BpmnRenderer.prototype.drawConnection = function(parentGfx, connection, attrs = {}) {
	var { type } = connection;
	return this._renderer(type)(parentGfx, connection, attrs);
};
BpmnRenderer.prototype.getShapePath = function(shape) {
	if (isLabel$3(shape)) return getRoundRectPath(shape, EXTERNAL_LABEL_BORDER_RADIUS);
	if (is$1(shape, "bpmn:Event")) return getCirclePath(shape);
	if (is$1(shape, "bpmn:Activity")) return getRoundRectPath(shape, TASK_BORDER_RADIUS);
	if (is$1(shape, "bpmn:Gateway")) return getDiamondPath(shape);
	return getRectPath(shape);
};
function pickAttrs(attrs, keys = []) {
	return keys.reduce((pickedAttrs, key) => {
		if (attrs[key]) pickedAttrs[key] = attrs[key];
		return pickedAttrs;
	}, {});
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/draw/TextRenderer.js
init_dist();
var DEFAULT_FONT_SIZE = 12;
var LINE_HEIGHT_RATIO = 1.2;
var MIN_TEXT_ANNOTATION_HEIGHT = 40;
function TextRenderer(config) {
	var defaultStyle = assign$1({
		fontFamily: "Arial, sans-serif",
		fontSize: DEFAULT_FONT_SIZE,
		fontWeight: "normal",
		lineHeight: LINE_HEIGHT_RATIO
	}, config && config.defaultStyle || {});
	var fontSize = parseInt(defaultStyle.fontSize, 10) - 1;
	var externalStyle = assign$1({}, defaultStyle, { fontSize }, config && config.externalStyle || {});
	var textUtil = new Text({ style: defaultStyle });
	this.getExternalLabelBounds = function(bounds, text) {
		var dimensions = getTextboxDimensions(text, {
			width: Math.max(bounds.width, DEFAULT_LABEL_SIZE.width),
			height: 30
		}, { style: externalStyle });
		return {
			x: Math.round(bounds.x + bounds.width / 2 - dimensions.width / 2),
			y: bounds.y,
			width: Math.ceil(dimensions.width),
			height: Math.ceil(dimensions.height)
		};
	};
	this.getTextAnnotationBounds = function(bounds, text) {
		var dimensions = getTextboxDimensions(text, bounds, {
			style: defaultStyle,
			align: "left-top",
			padding: 7
		});
		return {
			x: bounds.x,
			y: bounds.y,
			width: bounds.width,
			height: Math.max(MIN_TEXT_ANNOTATION_HEIGHT, Math.round(dimensions.height))
		};
	};
	this.getDimensions = function(text, options) {
		return textUtil.getDimensions(text, options || {});
	};
	function getTextboxDimensions(text, box, layoutOptions) {
		return textUtil.getDimensions(text, assign$1({ box }, layoutOptions));
	}
	this.createText = function(text, options) {
		return textUtil.createText(text, options || {});
	};
	this.getDefaultStyle = function() {
		return defaultStyle;
	};
	this.getExternalStyle = function() {
		return externalStyle;
	};
}
TextRenderer.$inject = ["config.textRenderer"];
//#endregion
//#region ../../node_modules/bpmn-js/lib/draw/PathMap.js
function PathMap() {
	this.pathMap = {
		"EVENT_MESSAGE": {
			d: "m {mx},{my} l 0,{e.y1} l {e.x1},0 l 0,-{e.y1} z l {e.x0},{e.y0} l {e.x0},-{e.y0}",
			height: 36,
			width: 36,
			heightElements: [6, 14],
			widthElements: [10.5, 21]
		},
		"EVENT_SIGNAL": {
			d: "M {mx},{my} l {e.x0},{e.y0} l -{e.x1},0 Z",
			height: 36,
			width: 36,
			heightElements: [18],
			widthElements: [10, 20]
		},
		"EVENT_ESCALATION": {
			d: "M {mx},{my} l {e.x0},{e.y0} l -{e.x0},-{e.y1} l -{e.x0},{e.y1} Z",
			height: 36,
			width: 36,
			heightElements: [20, 7],
			widthElements: [8]
		},
		"EVENT_CONDITIONAL": {
			d: "M {e.x0},{e.y0} l {e.x1},0 l 0,{e.y2} l -{e.x1},0 Z M {e.x2},{e.y3} l {e.x0},0 M {e.x2},{e.y4} l {e.x0},0 M {e.x2},{e.y5} l {e.x0},0 M {e.x2},{e.y6} l {e.x0},0 M {e.x2},{e.y7} l {e.x0},0 M {e.x2},{e.y8} l {e.x0},0 ",
			height: 36,
			width: 36,
			heightElements: [
				8.5,
				14.5,
				18,
				11.5,
				14.5,
				17.5,
				20.5,
				23.5,
				26.5
			],
			widthElements: [
				10.5,
				14.5,
				12.5
			]
		},
		"EVENT_LINK": {
			d: "m {mx},{my} 0,{e.y0} -{e.x1},0 0,{e.y1} {e.x1},0 0,{e.y0} {e.x0},-{e.y2} -{e.x0},-{e.y2} z",
			height: 36,
			width: 36,
			heightElements: [
				4.4375,
				6.75,
				7.8125
			],
			widthElements: [9.84375, 13.5]
		},
		"EVENT_ERROR": {
			d: "m {mx},{my} {e.x0},-{e.y0} {e.x1},-{e.y1} {e.x2},{e.y2} {e.x3},-{e.y3} -{e.x4},{e.y4} -{e.x5},-{e.y5} z",
			height: 36,
			width: 36,
			heightElements: [
				.023,
				8.737,
				8.151,
				16.564,
				10.591,
				8.714
			],
			widthElements: [
				.085,
				6.672,
				6.97,
				4.273,
				5.337,
				6.636
			]
		},
		"EVENT_CANCEL_45": {
			d: "m {mx},{my} -{e.x1},0 0,{e.x0} {e.x1},0 0,{e.y1} {e.x0},0 0,-{e.y1} {e.x1},0 0,-{e.y0} -{e.x1},0 0,-{e.y1} -{e.x0},0 z",
			height: 36,
			width: 36,
			heightElements: [4.75, 8.5],
			widthElements: [4.75, 8.5]
		},
		"EVENT_COMPENSATION": {
			d: "m {mx},{my} {e.x0},-{e.y0} 0,{e.y1} z m {e.x1},-{e.y2} {e.x2},-{e.y3} 0,{e.y1} -{e.x2},-{e.y3} z",
			height: 36,
			width: 36,
			heightElements: [
				6.5,
				13,
				.4,
				6.1
			],
			widthElements: [
				9,
				9.3,
				8.7
			]
		},
		"EVENT_TIMER_WH": {
			d: "M {mx},{my} l {e.x0},-{e.y0} m -{e.x0},{e.y0} l {e.x1},{e.y1} ",
			height: 36,
			width: 36,
			heightElements: [10, 2],
			widthElements: [3, 7]
		},
		"EVENT_TIMER_LINE": {
			d: "M {mx},{my} m {e.x0},{e.y0} l -{e.x1},{e.y1} ",
			height: 36,
			width: 36,
			heightElements: [10, 3],
			widthElements: [0, 0]
		},
		"EVENT_MULTIPLE": {
			d: "m {mx},{my} {e.x1},-{e.y0} {e.x1},{e.y0} -{e.x0},{e.y1} -{e.x2},0 z",
			height: 36,
			width: 36,
			heightElements: [6.28099, 12.56199],
			widthElements: [
				3.1405,
				9.42149,
				12.56198
			]
		},
		"EVENT_PARALLEL_MULTIPLE": {
			d: "m {mx},{my} {e.x0},0 0,{e.y1} {e.x1},0 0,{e.y0} -{e.x1},0 0,{e.y1} -{e.x0},0 0,-{e.y1} -{e.x1},0 0,-{e.y0} {e.x1},0 z",
			height: 36,
			width: 36,
			heightElements: [2.56228, 7.68683],
			widthElements: [2.56228, 7.68683]
		},
		"GATEWAY_EXCLUSIVE": {
			d: "m {mx},{my} {e.x0},{e.y0} {e.x1},{e.y0} {e.x2},0 {e.x4},{e.y2} {e.x4},{e.y1} {e.x2},0 {e.x1},{e.y3} {e.x0},{e.y3} {e.x3},0 {e.x5},{e.y1} {e.x5},{e.y2} {e.x3},0 z",
			height: 17.5,
			width: 17.5,
			heightElements: [
				8.5,
				6.5312,
				-6.5312,
				-8.5
			],
			widthElements: [
				6.5,
				-6.5,
				3,
				-3,
				5,
				-5
			]
		},
		"GATEWAY_PARALLEL": {
			d: "m {mx},{my} 0,{e.y1} -{e.x1},0 0,{e.y0} {e.x1},0 0,{e.y1} {e.x0},0 0,-{e.y1} {e.x1},0 0,-{e.y0} -{e.x1},0 0,-{e.y1} -{e.x0},0 z",
			height: 30,
			width: 30,
			heightElements: [5, 12.5],
			widthElements: [5, 12.5]
		},
		"GATEWAY_EVENT_BASED": {
			d: "m {mx},{my} {e.x0},{e.y0} {e.x0},{e.y1} {e.x1},{e.y2} {e.x2},0 z",
			height: 11,
			width: 11,
			heightElements: [
				-6,
				6,
				12,
				-12
			],
			widthElements: [
				9,
				-3,
				-12
			]
		},
		"GATEWAY_COMPLEX": {
			d: "m {mx},{my} 0,{e.y0} -{e.x0},-{e.y1} -{e.x1},{e.y2} {e.x0},{e.y1} -{e.x2},0 0,{e.y3} {e.x2},0  -{e.x0},{e.y1} l {e.x1},{e.y2} {e.x0},-{e.y1} 0,{e.y0} {e.x3},0 0,-{e.y0} {e.x0},{e.y1} {e.x1},-{e.y2} -{e.x0},-{e.y1} {e.x2},0 0,-{e.y3} -{e.x2},0 {e.x0},-{e.y1} -{e.x1},-{e.y2} -{e.x0},{e.y1} 0,-{e.y0} -{e.x3},0 z",
			height: 17.125,
			width: 17.125,
			heightElements: [
				4.875,
				3.4375,
				2.125,
				3
			],
			widthElements: [
				3.4375,
				2.125,
				4.875,
				3
			]
		},
		"DATA_OBJECT_PATH": {
			d: "m 0,0 {e.x1},0 {e.x0},{e.y0} 0,{e.y1} -{e.x2},0 0,-{e.y2} {e.x1},0 0,{e.y0} {e.x0},0",
			height: 61,
			width: 51,
			heightElements: [
				10,
				50,
				60
			],
			widthElements: [
				10,
				40,
				50,
				60
			]
		},
		"DATA_OBJECT_COLLECTION_PATH": {
			d: "m{mx},{my} m 3,2 l 0,10 m 3,-10 l 0,10 m 3,-10 l 0,10",
			height: 10,
			width: 10,
			heightElements: [],
			widthElements: []
		},
		"DATA_ARROW": {
			d: "m 5,9 9,0 0,-3 5,5 -5,5 0,-3 -9,0 z",
			height: 61,
			width: 51,
			heightElements: [],
			widthElements: []
		},
		"DATA_STORE": {
			d: "m  {mx},{my} l  0,{e.y2} c  {e.x0},{e.y1} {e.x1},{e.y1}  {e.x2},0 l  0,-{e.y2} c -{e.x0},-{e.y1} -{e.x1},-{e.y1} -{e.x2},0c  {e.x0},{e.y1} {e.x1},{e.y1}  {e.x2},0 m  -{e.x2},{e.y0}c  {e.x0},{e.y1} {e.x1},{e.y1} {e.x2},0m  -{e.x2},{e.y0}c  {e.x0},{e.y1} {e.x1},{e.y1}  {e.x2},0",
			height: 61,
			width: 61,
			heightElements: [
				7,
				10,
				45
			],
			widthElements: [
				2,
				58,
				60
			]
		},
		"TEXT_ANNOTATION": {
			d: "m {mx}, {my} m 10,0 l -10,0 l 0,{e.y0} l 10,0",
			height: 30,
			width: 10,
			heightElements: [30],
			widthElements: [10]
		},
		"MARKER_SUB_PROCESS": {
			d: "m{mx},{my} m 7,2 l 0,10 m -5,-5 l 10,0",
			height: 10,
			width: 10,
			heightElements: [],
			widthElements: []
		},
		"MARKER_PARALLEL": {
			d: "m{mx},{my} m 3,2 l 0,10 m 3,-10 l 0,10 m 3,-10 l 0,10",
			height: 10,
			width: 10,
			heightElements: [],
			widthElements: []
		},
		"MARKER_SEQUENTIAL": {
			d: "m{mx},{my} m 0,3 l 10,0 m -10,3 l 10,0 m -10,3 l 10,0",
			height: 10,
			width: 10,
			heightElements: [],
			widthElements: []
		},
		"MARKER_COMPENSATION": {
			d: "m {mx},{my} 7,-5 0,10 z m 7.1,-0.3 6.9,-4.7 0,10 -6.9,-4.7 z",
			height: 10,
			width: 21,
			heightElements: [],
			widthElements: []
		},
		"MARKER_LOOP": {
			d: "m {mx},{my} c 3.526979,0 6.386161,-2.829858 6.386161,-6.320661 0,-3.490806 -2.859182,-6.320661 -6.386161,-6.320661 -3.526978,0 -6.38616,2.829855 -6.38616,6.320661 0,1.745402 0.714797,3.325567 1.870463,4.469381 0.577834,0.571908 1.265885,1.034728 2.029916,1.35457 l -0.718163,-3.909793 m 0.718163,3.909793 -3.885211,0.802902",
			height: 13.9,
			width: 13.7,
			heightElements: [],
			widthElements: []
		},
		"MARKER_ADHOC": {
			d: "m {mx},{my} m 0.84461,2.64411 c 1.05533,-1.23780996 2.64337,-2.07882 4.29653,-1.97997996 2.05163,0.0805 3.85579,1.15803 5.76082,1.79107 1.06385,0.34139996 2.24454,0.1438 3.18759,-0.43767 0.61743,-0.33642 1.2775,-0.64078 1.7542,-1.17511 0,0.56023 0,1.12046 0,1.6807 -0.98706,0.96237996 -2.29792,1.62393996 -3.6918,1.66181996 -1.24459,0.0927 -2.46671,-0.2491 -3.59505,-0.74812 -1.35789,-0.55965 -2.75133,-1.33436996 -4.27027,-1.18121996 -1.37741,0.14601 -2.41842,1.13685996 -3.44288,1.96782996 z",
			height: 4,
			width: 15,
			heightElements: [],
			widthElements: []
		},
		"TASK_TYPE_SEND": {
			d: "m {mx},{my} l 0,{e.y1} l {e.x1},0 l 0,-{e.y1} z l {e.x0},{e.y0} l {e.x0},-{e.y0}",
			height: 14,
			width: 21,
			heightElements: [6, 14],
			widthElements: [10.5, 21]
		},
		"TASK_TYPE_SCRIPT": {
			d: "m {mx},{my} c 9.966553,-6.27276 -8.000926,-7.91932 2.968968,-14.938 l -8.802728,0 c -10.969894,7.01868 6.997585,8.66524 -2.968967,14.938 z m -7,-12 l 5,0 m -4.5,3 l 4.5,0 m -3,3 l 5,0m -4,3 l 5,0",
			height: 15,
			width: 12.6,
			heightElements: [6, 14],
			widthElements: [10.5, 21]
		},
		"TASK_TYPE_USER_1": { d: "m {mx},{my} c 0.909,-0.845 1.594,-2.049 1.594,-3.385 0,-2.554 -1.805,-4.62199999 -4.357,-4.62199999 -2.55199998,0 -4.28799998,2.06799999 -4.28799998,4.62199999 0,1.348 0.974,2.562 1.89599998,3.405 -0.52899998,0.187 -5.669,2.097 -5.794,4.7560005 v 6.718 h 17 v -6.718 c 0,-2.2980005 -5.5279996,-4.5950005 -6.0509996,-4.7760005 zm -8,6 l 0,5.5 m 11,0 l 0,-5" },
		"TASK_TYPE_USER_2": { d: "m {mx},{my} m 2.162,1.009 c 0,2.4470005 -2.158,4.4310005 -4.821,4.4310005 -2.66499998,0 -4.822,-1.981 -4.822,-4.4310005 " },
		"TASK_TYPE_USER_3": { d: "m {mx},{my} m -6.9,-3.80 c 0,0 2.25099998,-2.358 4.27399998,-1.177 2.024,1.181 4.221,1.537 4.124,0.965 -0.098,-0.57 -0.117,-3.79099999 -4.191,-4.13599999 -3.57499998,0.001 -4.20799998,3.36699999 -4.20699998,4.34799999 z" },
		"TASK_TYPE_MANUAL": { d: "m {mx},{my} c 0.234,-0.01 5.604,0.008 8.029,0.004 0.808,0 1.271,-0.172 1.417,-0.752 0.227,-0.898 -0.334,-1.314 -1.338,-1.316 -2.467,-0.01 -7.886,-0.004 -8.108,-0.004 -0.014,-0.079 0.016,-0.533 0,-0.61 0.195,-0.042 8.507,0.006 9.616,0.002 0.877,-0.007 1.35,-0.438 1.353,-1.208 0.003,-0.768 -0.479,-1.09 -1.35,-1.091 -2.968,-0.002 -9.619,-0.013 -9.619,-0.013 v -0.591 c 0,0 5.052,-0.016 7.225,-0.016 0.888,-0.002 1.354,-0.416 1.351,-1.193 -0.006,-0.761 -0.492,-1.196 -1.361,-1.196 -3.473,-0.005 -10.86,-0.003 -11.0829995,-0.003 -0.022,-0.047 -0.045,-0.094 -0.069,-0.139 0.3939995,-0.319 2.0409995,-1.626 2.4149995,-2.017 0.469,-0.4870005 0.519,-1.1650005 0.162,-1.6040005 -0.414,-0.511 -0.973,-0.5 -1.48,-0.236 -1.4609995,0.764 -6.5999995,3.6430005 -7.7329995,4.2710005 -0.9,0.499 -1.516,1.253 -1.882,2.19 -0.37000002,0.95 -0.17,2.01 -0.166,2.979 0.004,0.718 -0.27300002,1.345 -0.055,2.063 0.629,2.087 2.425,3.312 4.859,3.318 4.6179995,0.014 9.2379995,-0.139 13.8569995,-0.158 0.755,-0.004 1.171,-0.301 1.182,-1.033 0.012,-0.754 -0.423,-0.969 -1.183,-0.973 -1.778,-0.01 -5.824,-0.004 -6.04,-0.004 10e-4,-0.084 0.003,-0.586 10e-4,-0.67 z" },
		"TASK_TYPE_INSTANTIATING_SEND": { d: "m {mx},{my} l 0,8.4 l 12.6,0 l 0,-8.4 z l 6.3,3.6 l 6.3,-3.6" },
		"TASK_TYPE_SERVICE": { d: "m {mx},{my} v -1.71335 c 0.352326,-0.0705 0.703932,-0.17838 1.047628,-0.32133 0.344416,-0.14465 0.665822,-0.32133 0.966377,-0.52145 l 1.19431,1.18005 1.567487,-1.57688 -1.195028,-1.18014 c 0.403376,-0.61394 0.683079,-1.29908 0.825447,-2.01824 l 1.622133,-0.01 v -2.2196 l -1.636514,0.01 c -0.07333,-0.35153 -0.178319,-0.70024 -0.323564,-1.04372 -0.145244,-0.34406 -0.321407,-0.6644 -0.522735,-0.96217 l 1.131035,-1.13631 -1.583305,-1.56293 -1.129598,1.13589 c -0.614052,-0.40108 -1.302883,-0.68093 -2.022633,-0.82247 l 0.0093,-1.61852 h -2.241173 l 0.0042,1.63124 c -0.353763,0.0736 -0.705369,0.17977 -1.049785,0.32371 -0.344415,0.14437 -0.665102,0.32092 -0.9635006,0.52046 l -1.1698628,-1.15823 -1.5667691,1.5792 1.1684265,1.15669 c -0.4026573,0.61283 -0.68308,1.29797 -0.8247287,2.01713 l -1.6588041,0.003 v 2.22174 l 1.6724648,-0.006 c 0.073327,0.35077 0.1797598,0.70243 0.3242851,1.04472 0.1452428,0.34448 0.3214064,0.6644 0.5227339,0.96066 l -1.1993431,1.19723 1.5840256,1.56011 1.1964668,-1.19348 c 0.6140517,0.40346 1.3028827,0.68232 2.0233517,0.82331 l 7.19e-4,1.69892 h 2.226848 z m 0.221462,-3.9957 c -1.788948,0.7502 -3.8576,-0.0928 -4.6097055,-1.87438 -0.7521065,-1.78321 0.090598,-3.84627 1.8802645,-4.59604 1.78823,-0.74936 3.856881,0.0929 4.608987,1.87437 0.752106,1.78165 -0.0906,3.84612 -1.879546,4.59605 z" },
		"TASK_TYPE_SERVICE_FILL": { d: "m {mx},{my} c -1.788948,0.7502 -3.8576,-0.0928 -4.6097055,-1.87438 -0.7521065,-1.78321 0.090598,-3.84627 1.8802645,-4.59604 1.78823,-0.74936 3.856881,0.0929 4.608987,1.87437 0.752106,1.78165 -0.0906,3.84612 -1.879546,4.59605 z" },
		"TASK_TYPE_BUSINESS_RULE_HEADER": { d: "m {mx},{my} 0,4 20,0 0,-4 z" },
		"TASK_TYPE_BUSINESS_RULE_MAIN": { d: "m {mx},{my} 0,12 20,0 0,-12 zm 0,8 l 20,0 m -13,-4 l 0,8" },
		"MESSAGE_FLOW_MARKER": { d: "m {mx},{my} m -10.5 ,-7 l 0,14 l 21,0 l 0,-14 z l 10.5,6 l 10.5,-6" }
	};
	this.getRawPath = function getRawPath(pathId) {
		return this.pathMap[pathId].d;
	};
	this.getScaledPath = function getScaledPath(pathId, param) {
		var rawPath = this.pathMap[pathId];
		var mx, my;
		if (param.abspos) {
			mx = param.abspos.x;
			my = param.abspos.y;
		} else {
			mx = param.containerWidth * param.position.mx;
			my = param.containerHeight * param.position.my;
		}
		var coordinates = {};
		if (param.position) {
			var heightRatio = param.containerHeight / rawPath.height * param.yScaleFactor;
			var widthRatio = param.containerWidth / rawPath.width * param.xScaleFactor;
			for (var heightIndex = 0; heightIndex < rawPath.heightElements.length; heightIndex++) coordinates["y" + heightIndex] = rawPath.heightElements[heightIndex] * heightRatio;
			for (var widthIndex = 0; widthIndex < rawPath.widthElements.length; widthIndex++) coordinates["x" + widthIndex] = rawPath.widthElements[widthIndex] * widthRatio;
		}
		return format(rawPath.d, {
			mx,
			my,
			e: coordinates
		});
	};
}
var tokenRegex = /\{([^{}]+)\}/g;
var objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g;
function replacer(all, key, obj) {
	var res = obj;
	key.replace(objNotationRegex, function(all, name, quote, quotedName, isFunc) {
		name = name || quotedName;
		if (res) {
			if (name in res) res = res[name];
			typeof res == "function" && isFunc && (res = res());
		}
	});
	res = (res == null || res == obj ? all : res) + "";
	return res;
}
function format(str, obj) {
	return String(str).replace(tokenRegex, function(all, key) {
		return replacer(all, key, obj);
	});
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/draw/index.js
var draw_default = {
	__init__: ["bpmnRenderer"],
	bpmnRenderer: ["type", BpmnRenderer],
	textRenderer: ["type", TextRenderer],
	pathMap: ["type", PathMap]
};
//#endregion
//#region ../../node_modules/bpmn-js/lib/import/BpmnImporter.js
init_dist();
init_ModelUtil();
function elementData(semantic, di, attrs) {
	return assign$1({
		id: semantic.id,
		type: semantic.$type,
		businessObject: semantic,
		di
	}, attrs);
}
function getWaypoints(di, source, target) {
	var waypoints = di.waypoint;
	if (!waypoints || waypoints.length < 2) return [getMid(source), getMid(target)];
	return waypoints.map(function(p) {
		return {
			x: p.x,
			y: p.y
		};
	});
}
function notYetDrawn(semantic, refSemantic, property) {
	return new Error(`element ${elementToString(refSemantic)} referenced by ${elementToString(semantic)}#${property} not yet drawn`);
}
function BpmnImporter(eventBus, canvas, elementFactory, elementRegistry, textRenderer) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	this._elementFactory = elementFactory;
	this._elementRegistry = elementRegistry;
	this._textRenderer = textRenderer;
}
BpmnImporter.$inject = [
	"eventBus",
	"canvas",
	"elementFactory",
	"elementRegistry",
	"textRenderer"
];
BpmnImporter.prototype.add = function(semantic, di, parentElement) {
	var element, hidden;
	var parentIndex;
	if (is$1(di, "bpmndi:BPMNPlane")) {
		var attrs = is$1(semantic, "bpmn:SubProcess") ? { id: semantic.id + "_plane" } : {};
		element = this._elementFactory.createRoot(elementData(semantic, di, attrs));
		this._canvas.addRootElement(element);
	} else if (is$1(di, "bpmndi:BPMNShape")) {
		var collapsed = !isExpanded(semantic, di), isFrame = isFrameElement(semantic);
		hidden = parentElement && (parentElement.hidden || parentElement.collapsed);
		var bounds = di.bounds;
		element = this._elementFactory.createShape(elementData(semantic, di, {
			collapsed,
			hidden,
			x: Math.round(bounds.x),
			y: Math.round(bounds.y),
			width: Math.round(bounds.width),
			height: Math.round(bounds.height),
			isFrame
		}));
		if (is$1(semantic, "bpmn:BoundaryEvent")) this._attachBoundary(semantic, element);
		if (is$1(semantic, "bpmn:Lane")) parentIndex = 0;
		if (is$1(semantic, "bpmn:DataStoreReference")) {
			if (!isPointInsideBBox(parentElement, getMid(bounds))) parentElement = this._canvas.findRoot(parentElement);
		}
		this._canvas.addShape(element, parentElement, parentIndex);
	} else if (is$1(di, "bpmndi:BPMNEdge")) {
		var source = this._getSource(semantic), target = this._getTarget(semantic);
		hidden = parentElement && (parentElement.hidden || parentElement.collapsed);
		element = this._elementFactory.createConnection(elementData(semantic, di, {
			hidden,
			source,
			target,
			waypoints: getWaypoints(di, source, target)
		}));
		if (is$1(semantic, "bpmn:DataAssociation")) parentElement = this._canvas.findRoot(parentElement);
		this._canvas.addConnection(element, parentElement, parentIndex);
	} else throw new Error(`unknown di ${elementToString(di)} for element ${elementToString(semantic)}`);
	if (isLabelExternal(semantic) && getLabel(element)) this.addLabel(semantic, di, element);
	this._eventBus.fire("bpmnElement.added", { element });
	return element;
};
BpmnImporter.prototype._attachBoundary = function(boundarySemantic, boundaryElement) {
	var hostSemantic = boundarySemantic.attachedToRef;
	if (!hostSemantic) throw new Error(`missing ${elementToString(boundarySemantic)}#attachedToRef`);
	var host = this._elementRegistry.get(hostSemantic.id), attachers = host && host.attachers;
	if (!host) throw notYetDrawn(boundarySemantic, hostSemantic, "attachedToRef");
	boundaryElement.host = host;
	if (!attachers) host.attachers = attachers = [];
	if (attachers.indexOf(boundaryElement) === -1) attachers.push(boundaryElement);
};
BpmnImporter.prototype.addLabel = function(semantic, di, element) {
	var bounds = getExternalLabelBounds(di, element), text = getLabel(element), label;
	if (text) bounds = this._textRenderer.getExternalLabelBounds(bounds, text);
	label = this._elementFactory.createLabel(elementData(semantic, di, {
		id: semantic.id + "_label",
		labelTarget: element,
		type: "label",
		hidden: element.hidden || !getLabel(element),
		x: Math.round(bounds.x),
		y: Math.round(bounds.y),
		width: Math.round(bounds.width),
		height: Math.round(bounds.height)
	}));
	return this._canvas.addShape(label, element.parent);
};
BpmnImporter.prototype._getConnectedElement = function(semantic, side) {
	var element, refSemantic, type = semantic.$type;
	refSemantic = semantic[side + "Ref"];
	if (side === "source" && type === "bpmn:DataInputAssociation") refSemantic = refSemantic && refSemantic[0];
	if (side === "source" && type === "bpmn:DataOutputAssociation" || side === "target" && type === "bpmn:DataInputAssociation") refSemantic = semantic.$parent;
	element = refSemantic && this._getElement(refSemantic);
	if (element) return element;
	if (refSemantic) throw notYetDrawn(semantic, refSemantic, side + "Ref");
	else throw new Error(`${elementToString(semantic)}#${side} Ref not specified`);
};
BpmnImporter.prototype._getSource = function(semantic) {
	return this._getConnectedElement(semantic, "source");
};
BpmnImporter.prototype._getTarget = function(semantic) {
	return this._getConnectedElement(semantic, "target");
};
BpmnImporter.prototype._getElement = function(semantic) {
	return this._elementRegistry.get(semantic.id);
};
function isPointInsideBBox(bbox, point) {
	var x = point.x, y = point.y;
	return x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height;
}
function isFrameElement(semantic) {
	return is$1(semantic, "bpmn:Group");
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/core/index.js
var core_default = { __depends__: [draw_default, {
	__depends__: [translate_default],
	bpmnImporter: ["type", BpmnImporter]
}] };
//#endregion
//#region ../../node_modules/diagram-js/lib/features/root-elements/RootElementsBehavior.js
function RootElementsBehavior(canvas, injector) {
	injector.invoke(CommandInterceptor, this);
	this.executed(function(event) {
		var context = event.context;
		if (context.rootElement) canvas.setRootElement(context.rootElement);
		else context.rootElement = canvas.getRootElement();
	});
	this.revert(function(event) {
		var context = event.context;
		if (context.rootElement) canvas.setRootElement(context.rootElement);
	});
}
e(RootElementsBehavior, CommandInterceptor);
RootElementsBehavior.$inject = ["canvas", "injector"];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/root-elements/index.js
var root_elements_default = {
	__init__: ["rootElementsBehavior"],
	rootElementsBehavior: ["type", RootElementsBehavior]
};
//#endregion
//#region ../../node_modules/bpmn-js/lib/util/DrilldownUtil.js
init_ModelUtil();
var planeSuffix = "_plane";
function getShapeIdFromPlane(element) {
	var id = element.id;
	return removePlaneSuffix(id);
}
function getPlaneIdFromShape(element) {
	var id = element.id;
	if (is$1(element, "bpmn:SubProcess")) return addPlaneSuffix(id);
	return id;
}
function toPlaneId(id) {
	return addPlaneSuffix(id);
}
function isPlane(element) {
	var di = getDi(element);
	return is$1(di, "bpmndi:BPMNPlane");
}
function addPlaneSuffix(id) {
	return id + planeSuffix;
}
function removePlaneSuffix(id) {
	return id.replace(new RegExp(planeSuffix + "$"), "");
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/features/drilldown/DrilldownBreadcrumbs.js
init_dist();
init_ModelUtil();
var OPEN_CLASS = "bjs-breadcrumbs-shown";
function DrilldownBreadcrumbs(eventBus, elementRegistry, canvas) {
	var breadcrumbs = domify("<ul class=\"bjs-breadcrumbs\"></ul>");
	var container = canvas.getContainer();
	var containerClasses = classes(container);
	container.appendChild(breadcrumbs);
	var businessObjectParents = [];
	eventBus.on("element.changed", function(event) {
		var shape = event.element, businessObject = getBusinessObject(shape);
		if (!find(businessObjectParents, function(element) {
			return element === businessObject;
		})) return;
		updateBreadcrumbs();
	});
	function updateBreadcrumbs(element) {
		if (element) businessObjectParents = getBusinessObjectParentChain(element);
		var path = businessObjectParents.flatMap(function(parent) {
			var parentPlane = canvas.findRoot(getPlaneIdFromShape(parent)) || canvas.findRoot(parent.id);
			if (!parentPlane && is$1(parent, "bpmn:Process")) {
				var participant = elementRegistry.find(function(element) {
					var businessObject = getBusinessObject(element);
					return businessObject && businessObject.get("processRef") === parent;
				});
				parentPlane = participant && canvas.findRoot(participant.id);
			}
			if (!parentPlane) return [];
			return [{
				parent,
				parentPlane
			}];
		});
		breadcrumbs.innerHTML = "";
		var visible = path.length > 1;
		containerClasses.toggle(OPEN_CLASS, visible);
		path.forEach(function(entry, index) {
			var parent = entry.parent, parentPlane = entry.parentPlane, title = escapeHTML(parent.name || parent.id);
			var isCurrent = index === path.length - 1;
			var crumb;
			if (isCurrent) crumb = domify("<li><span class=\"bjs-crumb\" title=\"" + title + "\">" + title + "</span></li>");
			else {
				var href = "#" + escapeHTML(parent.id);
				crumb = domify("<li><a class=\"bjs-crumb\" href=\"" + href + "\" title=\"" + title + "\">" + title + "</a></li>");
				crumb.addEventListener("click", function(event) {
					event.preventDefault();
					canvas.setRootElement(parentPlane);
				});
			}
			breadcrumbs.appendChild(crumb);
		});
	}
	eventBus.on("root.set", function(event) {
		updateBreadcrumbs(event.element);
	});
}
DrilldownBreadcrumbs.$inject = [
	"eventBus",
	"elementRegistry",
	"canvas"
];
function getBusinessObjectParentChain(child) {
	var businessObject = getBusinessObject(child);
	var parents = [];
	for (var element = businessObject; element; element = element.$parent) if (is$1(element, "bpmn:SubProcess") || is$1(element, "bpmn:Process")) parents.push(element);
	return parents.reverse();
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/features/drilldown/DrilldownCentering.js
init_ModelUtil();
function DrilldownCentering(eventBus, canvas) {
	var currentRoot = null;
	var positionMap = new Map$1();
	eventBus.on("root.set", function(event) {
		var newRoot = event.element;
		var currentViewbox = canvas.viewbox();
		var storedViewbox = positionMap.get(newRoot);
		positionMap.set(currentRoot, {
			x: currentViewbox.x,
			y: currentViewbox.y,
			zoom: currentViewbox.scale
		});
		currentRoot = newRoot;
		if (!is$1(newRoot, "bpmn:SubProcess") && !storedViewbox) return;
		storedViewbox = storedViewbox || {
			x: 0,
			y: 0,
			zoom: 1
		};
		var dx = (currentViewbox.x - storedViewbox.x) * currentViewbox.scale, dy = (currentViewbox.y - storedViewbox.y) * currentViewbox.scale;
		if (dx !== 0 || dy !== 0) canvas.scroll({
			dx,
			dy
		});
		if (storedViewbox.zoom !== currentViewbox.scale) canvas.zoom(storedViewbox.zoom, {
			x: 0,
			y: 0
		});
	});
	eventBus.on("diagram.clear", function() {
		positionMap.clear();
		currentRoot = null;
	});
}
DrilldownCentering.$inject = ["eventBus", "canvas"];
function Map$1() {
	this._entries = [];
	this.set = function(key, value) {
		var found = false;
		for (var k in this._entries) if (this._entries[k][0] === key) {
			this._entries[k][1] = value;
			found = true;
			break;
		}
		if (!found) this._entries.push([key, value]);
	};
	this.get = function(key) {
		for (var k in this._entries) if (this._entries[k][0] === key) return this._entries[k][1];
		return null;
	};
	this.clear = function() {
		this._entries.length = 0;
	};
	this.remove = function(key) {
		var idx = -1;
		for (var k in this._entries) if (this._entries[k][0] === key) {
			idx = k;
			break;
		}
		if (idx !== -1) this._entries.splice(idx, 1);
	};
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/features/drilldown/SubprocessCompatibility.js
init_ModelUtil();
var DEFAULT_POSITION = {
	x: 180,
	y: 160
};
function SubprocessCompatibility(eventBus, moddle) {
	this._eventBus = eventBus;
	this._moddle = moddle;
	var self = this;
	eventBus.on("import.render.start", 1500, function(e, context) {
		self._handleImport(context.definitions);
	});
}
SubprocessCompatibility.prototype._handleImport = function(definitions) {
	if (!definitions.diagrams) return;
	var self = this;
	this._definitions = definitions;
	this._processToDiagramMap = {};
	definitions.diagrams.forEach(function(diagram) {
		if (!diagram.plane || !diagram.plane.bpmnElement) return;
		self._processToDiagramMap[diagram.plane.bpmnElement.id] = diagram;
	});
	definitions.diagrams.filter((diagram) => diagram.plane).flatMap((diagram) => self._createNewDiagrams(diagram.plane)).forEach(function(diagram) {
		self._movePlaneElementsToOrigin(diagram.plane);
	});
};
SubprocessCompatibility.prototype._createNewDiagrams = function(plane) {
	var self = this;
	var collapsedElements = [];
	var elementsToMove = [];
	plane.get("planeElement").forEach(function(diElement) {
		var businessObject = diElement.bpmnElement;
		if (!businessObject) return;
		var parent = businessObject.$parent;
		if (is$1(businessObject, "bpmn:SubProcess") && !diElement.isExpanded) collapsedElements.push(businessObject);
		if (shouldMoveToPlane(businessObject, plane)) elementsToMove.push({
			diElement,
			parent
		});
	});
	var newDiagrams = [];
	collapsedElements.forEach(function(element) {
		if (!self._processToDiagramMap[element.id]) {
			var diagram = self._createDiagram(element);
			self._processToDiagramMap[element.id] = diagram;
			newDiagrams.push(diagram);
		}
	});
	elementsToMove.forEach(function(element) {
		var diElement = element.diElement;
		var parent = element.parent;
		while (parent && collapsedElements.indexOf(parent) === -1) parent = parent.$parent;
		if (!parent) return;
		var diagram = self._processToDiagramMap[parent.id];
		self._moveToDiPlane(diElement, diagram.plane);
	});
	return newDiagrams;
};
SubprocessCompatibility.prototype._movePlaneElementsToOrigin = function(plane) {
	var elements = plane.get("planeElement");
	var planeBounds = getPlaneBounds(plane);
	var offset = {
		x: planeBounds.x - DEFAULT_POSITION.x,
		y: planeBounds.y - DEFAULT_POSITION.y
	};
	elements.forEach(function(diElement) {
		if (diElement.waypoint) diElement.waypoint.forEach(function(waypoint) {
			waypoint.x = waypoint.x - offset.x;
			waypoint.y = waypoint.y - offset.y;
		});
		else if (diElement.bounds) {
			diElement.bounds.x = diElement.bounds.x - offset.x;
			diElement.bounds.y = diElement.bounds.y - offset.y;
		}
	});
};
SubprocessCompatibility.prototype._moveToDiPlane = function(diElement, newPlane) {
	var parentPlaneElement = findRootDiagram(diElement).plane.get("planeElement");
	parentPlaneElement.splice(parentPlaneElement.indexOf(diElement), 1);
	newPlane.get("planeElement").push(diElement);
};
SubprocessCompatibility.prototype._createDiagram = function(businessObject) {
	var plane = this._moddle.create("bpmndi:BPMNPlane", { bpmnElement: businessObject });
	var diagram = this._moddle.create("bpmndi:BPMNDiagram", { plane });
	plane.$parent = diagram;
	plane.bpmnElement = businessObject;
	diagram.$parent = this._definitions;
	this._definitions.diagrams.push(diagram);
	return diagram;
};
SubprocessCompatibility.$inject = ["eventBus", "moddle"];
function findRootDiagram(element) {
	if (is$1(element, "bpmndi:BPMNDiagram")) return element;
	else return findRootDiagram(element.$parent);
}
function getPlaneBounds(plane) {
	var planeTrbl = {
		top: Infinity,
		right: -Infinity,
		bottom: -Infinity,
		left: Infinity
	};
	plane.planeElement.forEach(function(element) {
		if (!element.bounds) return;
		var trbl = asTRBL(element.bounds);
		planeTrbl.top = Math.min(trbl.top, planeTrbl.top);
		planeTrbl.left = Math.min(trbl.left, planeTrbl.left);
	});
	return asBounds(planeTrbl);
}
function shouldMoveToPlane(businessObject, plane) {
	var parent = businessObject.$parent;
	if (!is$1(parent, "bpmn:SubProcess") || parent === plane.bpmnElement) return false;
	if (isAny$1(businessObject, ["bpmn:DataInputAssociation", "bpmn:DataOutputAssociation"])) return false;
	return true;
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/features/drilldown/DrilldownOverlayBehavior.js
init_ModelUtil();
var LOW_PRIORITY$2 = 250;
var ARROW_DOWN_SVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M4.81801948,3.50735931 L10.4996894,9.1896894 L10.5,4 L12,4 L12,12 L4,12 L4,10.5 L9.6896894,10.4996894 L3.75735931,4.56801948 C3.46446609,4.27512627 3.46446609,3.80025253 3.75735931,3.50735931 C4.05025253,3.21446609 4.52512627,3.21446609 4.81801948,3.50735931 Z\"/></svg>";
var EMPTY_MARKER = "bjs-drilldown-empty";
function DrilldownOverlayBehavior(canvas, eventBus, elementRegistry, overlays, translate) {
	CommandInterceptor.call(this, eventBus);
	this._canvas = canvas;
	this._eventBus = eventBus;
	this._elementRegistry = elementRegistry;
	this._overlays = overlays;
	this._translate = translate;
	var self = this;
	this.executed("shape.toggleCollapse", LOW_PRIORITY$2, function(context) {
		var shape = context.shape;
		if (self._canDrillDown(shape)) self._addOverlay(shape);
		else self._removeOverlay(shape);
	}, true);
	this.reverted("shape.toggleCollapse", LOW_PRIORITY$2, function(context) {
		var shape = context.shape;
		if (self._canDrillDown(shape)) self._addOverlay(shape);
		else self._removeOverlay(shape);
	}, true);
	this.executed([
		"shape.create",
		"shape.move",
		"shape.delete"
	], LOW_PRIORITY$2, function(context) {
		var oldParent = context.oldParent, newParent = context.newParent || context.parent, shape = context.shape;
		if (self._canDrillDown(shape)) self._addOverlay(shape);
		self._updateDrilldownOverlay(oldParent);
		self._updateDrilldownOverlay(newParent);
		self._updateDrilldownOverlay(shape);
	}, true);
	this.reverted([
		"shape.create",
		"shape.move",
		"shape.delete"
	], LOW_PRIORITY$2, function(context) {
		var oldParent = context.oldParent, newParent = context.newParent || context.parent, shape = context.shape;
		if (self._canDrillDown(shape)) self._addOverlay(shape);
		self._updateDrilldownOverlay(oldParent);
		self._updateDrilldownOverlay(newParent);
		self._updateDrilldownOverlay(shape);
	}, true);
	eventBus.on("import.render.complete", function() {
		elementRegistry.filter(function(e) {
			return self._canDrillDown(e);
		}).map(function(el) {
			self._addOverlay(el);
		});
	});
}
e(DrilldownOverlayBehavior, CommandInterceptor);
DrilldownOverlayBehavior.prototype._updateDrilldownOverlay = function(shape) {
	var canvas = this._canvas;
	if (!shape) return;
	var root = canvas.findRoot(shape);
	if (root) this._updateOverlayVisibility(root);
};
DrilldownOverlayBehavior.prototype._canDrillDown = function(element) {
	var canvas = this._canvas;
	return is$1(element, "bpmn:SubProcess") && canvas.findRoot(getPlaneIdFromShape(element));
};
DrilldownOverlayBehavior.prototype._updateOverlayVisibility = function(element) {
	var overlays = this._overlays;
	var businessObject = getBusinessObject(element);
	var overlay = overlays.get({
		element: businessObject.id,
		type: "drilldown"
	})[0];
	if (!overlay) return;
	var hasFlowElements = businessObject && businessObject.get("flowElements") && businessObject.get("flowElements").length;
	classes(overlay.html).toggle(EMPTY_MARKER, !hasFlowElements);
};
DrilldownOverlayBehavior.prototype._addOverlay = function(element) {
	var canvas = this._canvas, overlays = this._overlays, bo = getBusinessObject(element);
	if (overlays.get({
		element,
		type: "drilldown"
	}).length) this._removeOverlay(element);
	var button = domify("<button type=\"button\" class=\"bjs-drilldown\">" + ARROW_DOWN_SVG + "</button>"), elementName = bo.get("name") || bo.get("id"), title = this._translate("Open {element}", { element: elementName });
	button.setAttribute("title", title);
	button.addEventListener("click", function() {
		canvas.setRootElement(canvas.findRoot(getPlaneIdFromShape(element)));
	});
	overlays.add(element, "drilldown", {
		position: {
			bottom: -7,
			right: -8
		},
		html: button
	});
	this._updateOverlayVisibility(element);
};
DrilldownOverlayBehavior.prototype._removeOverlay = function(element) {
	this._overlays.remove({
		element,
		type: "drilldown"
	});
};
DrilldownOverlayBehavior.$inject = [
	"canvas",
	"eventBus",
	"elementRegistry",
	"overlays",
	"translate"
];
//#endregion
//#region ../../node_modules/bpmn-js/lib/features/drilldown/index.js
var drilldown_default = {
	__depends__: [
		overlays_default,
		change_support_default,
		root_elements_default
	],
	__init__: [
		"drilldownBreadcrumbs",
		"drilldownOverlayBehavior",
		"drilldownCentering",
		"subprocessCompatibility"
	],
	drilldownBreadcrumbs: ["type", DrilldownBreadcrumbs],
	drilldownCentering: ["type", DrilldownCentering],
	drilldownOverlayBehavior: ["type", DrilldownOverlayBehavior],
	subprocessCompatibility: ["type", SubprocessCompatibility]
};
//#endregion
//#region ../../node_modules/bpmn-js/lib/Viewer.js
function Viewer(options) {
	BaseViewer.call(this, options);
}
e(Viewer, BaseViewer);
Viewer.prototype._modules = [
	core_default,
	drilldown_default,
	overlays_default,
	selection_default,
	translate_default
];
Viewer.prototype._moddleExtensions = {};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/keep-selection-visible/KeepSelectionVisible.js
init_dist();
var UPDATE_DEBOUNCE_INTERVAL = 300;
function KeepSelectionVisible(eventBus, canvas, selection) {
	this._selectionWasVisible = false;
	const updateSelectionVisible = debounce(() => {
		this._selectionWasVisible = isSelectionVisible();
	}, UPDATE_DEBOUNCE_INTERVAL);
	eventBus.on("canvas.viewbox.changed", updateSelectionVisible);
	eventBus.on("selection.changed", updateSelectionVisible);
	eventBus.on("diagram.destroy", () => {
		updateSelectionVisible.cancel();
	});
	eventBus.on("canvas.resized", () => {
		var selected = selection.get();
		if (!selected.length) return;
		if (!this._selectionWasVisible) return;
		if (isSelectionVisible()) return;
		var currentRoot = canvas.getRootElement();
		canvas.scrollToElement(selected.concat(currentRoot));
	});
	function isSelectionVisible() {
		var selected = selection.get();
		if (!selected.length) return false;
		var selectionBBox = getBBox(selected);
		var viewbox = canvas.viewbox();
		var elementTrbl = asTRBL(selectionBBox);
		var viewboxTrbl = asTRBL(viewbox);
		return elementTrbl.left >= viewboxTrbl.left && elementTrbl.right <= viewboxTrbl.right && elementTrbl.top >= viewboxTrbl.top && elementTrbl.bottom <= viewboxTrbl.bottom;
	}
	this._flush = updateSelectionVisible.flush;
}
KeepSelectionVisible.$inject = [
	"eventBus",
	"canvas",
	"selection"
];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/keep-selection-visible/index.js
var keep_selection_visible_default = {
	__init__: ["keepSelectionVisible"],
	__depends__: [selection_default],
	keepSelectionVisible: ["type", KeepSelectionVisible]
};
//#endregion
//#region ../../node_modules/bpmn-js/lib/NavigatedViewer.js
function NavigatedViewer(options) {
	Viewer.call(this, options);
}
e(NavigatedViewer, Viewer);
NavigatedViewer.prototype._navigationModules = [
	keep_selection_visible_default,
	keyboard_move_default,
	movecanvas_default,
	zoomscroll_default
];
NavigatedViewer.prototype._modules = [].concat(Viewer.prototype._modules, NavigatedViewer.prototype._navigationModules);
//#endregion
//#region ../../node_modules/bpmn-js/lib/features/outline/OutlineUtil.js
var DATA_OBJECT_REFERENCE_OUTLINE_PATH = "M44.7648 11.3263L36.9892 2.64074C36.0451 1.58628 34.5651 0.988708 33.1904 0.988708H5.98667C3.22688 0.988708 0.989624 3.34892 0.989624 6.26039V55.0235C0.989624 57.9349 3.22688 60.2952 5.98667 60.2952H40.966C43.7257 60.2952 45.963 57.9349 45.963 55.0235V14.9459C45.963 13.5998 45.6407 12.3048 44.7648 11.3263Z";
var DATA_STORE_REFERENCE_OUTLINE_PATH = "M1.03845 48.1347C1.03845 49.3511 1.07295 50.758 1.38342 52.064C1.69949 53.3938 2.32428 54.7154 3.56383 55.6428C6.02533 57.4841 10.1161 58.7685 14.8212 59.6067C19.5772 60.4538 25.1388 60.8738 30.6831 60.8738C36.2276 60.8738 41.7891 60.4538 46.545 59.6067C51.2504 58.7687 55.3412 57.4842 57.8028 55.6429C59.0424 54.7156 59.6673 53.3938 59.9834 52.064C60.2938 50.7579 60.3285 49.351 60.3285 48.1344V13.8415C60.3285 12.6249 60.2938 11.218 59.9834 9.91171C59.6673 8.58194 59.0423 7.2602 57.8027 6.33294C55.341 4.49168 51.2503 3.20723 46.545 2.36914C41.7891 1.522 36.2276 1.10204 30.6831 1.10205C25.1388 1.10206 19.5772 1.52206 14.8213 2.36923C10.1162 3.20734 6.02543 4.49183 3.5639 6.33314C2.32433 7.26038 1.69951 8.58206 1.38343 9.91181C1.07295 11.2179 1.03845 12.6247 1.03845 13.8411V48.1347Z";
var DATA_OBJECT_REFERENCE_STANDARD_SIZE = {
	width: 36,
	height: 50
};
var DATA_STORE_REFERENCE_STANDARD_SIZE = {
	width: 50,
	height: 50
};
function createPath(path, attrs, OUTLINE_STYLE) {
	return create("path", {
		d: path,
		strokeWidth: 2,
		transform: `translate(${attrs.x}, ${attrs.y})`,
		...OUTLINE_STYLE
	});
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/features/outline/OutlineProvider.js
init_dist();
init_ModelUtil();
var DEFAULT_OFFSET = 5;
function OutlineProvider(outline, styles) {
	this._styles = styles;
	outline.registerProvider(this);
}
OutlineProvider.$inject = ["outline", "styles"];
OutlineProvider.prototype.getOutline = function(element) {
	const OUTLINE_STYLE = this._styles.cls("djs-outline", ["no-fill"]);
	var outline;
	if (isExternalLabel(element)) {
		outline = create("rect");
		attr(outline, assign$1({
			x: -5,
			y: -5,
			rx: 4,
			width: element.width + 10,
			height: element.height + 10
		}, OUTLINE_STYLE));
		return outline;
	}
	if (isLabel$3(element)) return;
	if (is$1(element, "bpmn:Gateway")) {
		outline = create("rect");
		assign$1(outline.style, {
			"transform-box": "fill-box",
			"transform": "rotate(45deg)",
			"transform-origin": "center"
		});
		attr(outline, assign$1({
			x: 2,
			y: 2,
			rx: 4,
			width: element.width - 4,
			height: element.height - 4
		}, OUTLINE_STYLE));
	} else if (isAny$1(element, [
		"bpmn:Task",
		"bpmn:SubProcess",
		"bpmn:Group",
		"bpmn:CallActivity"
	])) {
		outline = create("rect");
		attr(outline, assign$1({
			x: -5,
			y: -5,
			rx: 14,
			width: element.width + 10,
			height: element.height + 10
		}, OUTLINE_STYLE));
	} else if (is$1(element, "bpmn:EndEvent")) {
		outline = create("circle");
		attr(outline, assign$1({
			cx: element.width / 2,
			cy: element.height / 2,
			r: element.width / 2 + DEFAULT_OFFSET + 1
		}, OUTLINE_STYLE));
	} else if (is$1(element, "bpmn:Event")) {
		outline = create("circle");
		attr(outline, assign$1({
			cx: element.width / 2,
			cy: element.height / 2,
			r: element.width / 2 + DEFAULT_OFFSET
		}, OUTLINE_STYLE));
	} else if (is$1(element, "bpmn:DataObjectReference") && isStandardSize(element, "bpmn:DataObjectReference")) outline = createPath(DATA_OBJECT_REFERENCE_OUTLINE_PATH, {
		x: -6,
		y: -6
	}, OUTLINE_STYLE);
	else if (is$1(element, "bpmn:DataStoreReference") && isStandardSize(element, "bpmn:DataStoreReference")) outline = createPath(DATA_STORE_REFERENCE_OUTLINE_PATH, {
		x: -6,
		y: -6
	}, OUTLINE_STYLE);
	return outline;
};
OutlineProvider.prototype.updateOutline = function(element, outline) {
	if (isLabel$3(element)) return;
	if (isAny$1(element, ["bpmn:SubProcess", "bpmn:Group"])) {
		attr(outline, {
			width: element.width + 10,
			height: element.height + 10
		});
		return true;
	} else if (isAny$1(element, [
		"bpmn:Event",
		"bpmn:Gateway",
		"bpmn:DataStoreReference",
		"bpmn:DataObjectReference"
	])) return true;
	return false;
};
function isStandardSize(element, type) {
	var standardSize;
	if (type === "bpmn:DataObjectReference") standardSize = DATA_OBJECT_REFERENCE_STANDARD_SIZE;
	else if (type === "bpmn:DataStoreReference") standardSize = DATA_STORE_REFERENCE_STANDARD_SIZE;
	return element.width === standardSize.width && element.height === standardSize.height;
}
//#endregion
//#region ../../node_modules/bpmn-js/lib/features/outline/index.js
var outline_default = {
	__depends__: [outline_default$1],
	__init__: ["outlineProvider"],
	outlineProvider: ["type", OutlineProvider]
};
//#endregion
//#region ../../libs/properties-panel/src/debounceInput/flushableDebounceInput.ts
var PANEL_INPUT_DEBOUNCE_MS = 600;
function debounceInputFactory() {
	return createFlushableDebounceInput(PANEL_INPUT_DEBOUNCE_MS);
}
var FlushableDebounceInputModule = { debounceInput: ["factory", debounceInputFactory] };
//#endregion
//#region ../../libs/properties-panel/src/modeFilter/engineGroupData.ts
var NEUTRAL_GROUP_IDS = [
	"general",
	"documentation",
	"compensation",
	"error",
	"link",
	"message",
	"multiInstance",
	"adHocCompletion",
	"signal",
	"escalation",
	"timer"
];
var ENGINE_APPENDED_ENTRY_IDS = {
	general: ["versionTag"],
	error: [
		"errorMessage",
		"errorCodeVariable",
		"errorMessageVariable"
	],
	escalation: ["escalationCodeVariable"]
};
var ENGINE_REPLACED_GROUP_IDS = ["timer", "multiInstance"];
var CAMUNDA_PLATFORM_GROUP_PREFIX = "CamundaPlatform__";
var ELEMENT_TEMPLATES_GROUP_PREFIX = "ElementTemplates__";
var ZEEBE_GROUP_PREFIX = "Zeebe__";
var BARE_ZEEBE_GROUP_IDS = new Set([
	"activeElements",
	"adHocSubProcessImplementation",
	"assignmentDefinition",
	"businessId",
	"businessRuleImplementation",
	"calledDecision",
	"calledElement",
	"condition",
	"form",
	"headers",
	"inputPropagation",
	"inputs",
	"jobPriorityDefinition",
	"outputCollection",
	"outputPropagation",
	"outputs",
	"script",
	"scriptImplementation",
	"taskDefinition",
	"userTaskImplementation"
]);
function isEngineGroupId(id) {
	return id.startsWith(CAMUNDA_PLATFORM_GROUP_PREFIX) || id.startsWith(ZEEBE_GROUP_PREFIX) || id.startsWith(ELEMENT_TEMPLATES_GROUP_PREFIX) || BARE_ZEEBE_GROUP_IDS.has(id);
}
function hasEngineGroups(groupIds) {
	return groupIds.some(isEngineGroupId);
}
//#endregion
//#region ../../libs/properties-panel/src/modeFilter/ModeFilterProvider.ts
var _ModeFilterProvider;
var MODE_FILTER_PRIORITY = 10;
var NEUTRAL_GROUP_ID_SET = new Set(NEUTRAL_GROUP_IDS);
var REPLACED_GROUP_ID_SET = new Set(ENGINE_REPLACED_GROUP_IDS);
function isEmptyGroup(group) {
	const entries = Array.isArray(group.entries) ? group.entries : [];
	const items = Array.isArray(group.items) ? group.items : [];
	return entries.length === 0 && items.length === 0;
}
var ModeFilterProvider = class {
	constructor(propertiesPanel, eventBus, injector) {
		this.eventBus = eventBus;
		this.injector = injector;
		this.mode = parseEditableMode(injector.get("config.propertiesPanelMode", false));
		propertiesPanel.registerProvider(MODE_FILTER_PRIORITY, this);
	}
	getMode() {
		return this.mode;
	}
	setMode(mode) {
		if (mode === this.mode) return;
		this.mode = mode;
		this.eventBus.fire("propertiesPanel.providersChanged");
	}
	getGroups(_element) {
		return (groups) => {
			if (surfaceModeSupports(this.mode, "engineProperties")) return groups;
			return this.filterDesignGroups(groups);
		};
	}
	customGroupIds() {
		const registry = this.injector.get("customPropertiesGroups", false);
		return registry ? new Set(registry.getIds()) : new Set();
	}
	filterDesignGroups(groups) {
		const custom = this.customGroupIds();
		const enginePresent = hasEngineGroups(groups.map((group) => group?.id));
		const kept = [];
		for (const group of groups) {
			if (!group) continue;
			const id = group.id;
			const isNeutral = NEUTRAL_GROUP_ID_SET.has(id);
			if (!isNeutral && !custom.has(id)) continue;
			if (enginePresent && REPLACED_GROUP_ID_SET.has(id)) continue;
			const appended = ENGINE_APPENDED_ENTRY_IDS[id];
			if (appended && Array.isArray(group.entries)) {
				const excluded = new Set(appended);
				group.entries = group.entries.filter((entry) => !entry || !excluded.has(entry.id));
			}
			if (isNeutral && isEmptyGroup(group)) continue;
			kept.push(group);
		}
		return kept;
	}
};
_ModeFilterProvider = ModeFilterProvider;
_ModeFilterProvider.$inject = [
	"propertiesPanel",
	"eventBus",
	"injector"
];
var ModeFilterModule = {
	__init__: ["propertiesPanelModeFilter"],
	propertiesPanelModeFilter: ["type", ModeFilterProvider]
};
//#endregion
//#region ../../libs/properties-panel/src/customGroups/CustomGroupsRegistry.ts
var _CustomGroupsRegistry;
var CustomGroupsRegistry = class {
	constructor(eventBus) {
		this.eventBus = eventBus;
		this.ids = new Set();
	}
	registerGroups(ids) {
		for (const id of ids) this.ids.add(id);
		this.eventBus.fire("propertiesPanel.providersChanged");
	}
	has(id) {
		return this.ids.has(id);
	}
	getIds() {
		return [...this.ids];
	}
};
_CustomGroupsRegistry = CustomGroupsRegistry;
_CustomGroupsRegistry.$inject = ["eventBus"];
var CustomGroupsModule = {
	__init__: ["customPropertiesGroups"],
	customPropertiesGroups: ["type", CustomGroupsRegistry]
};
var ScopeTraits = Object.freeze({
	ACTIVATED: 1,
	RUNNING: 2,
	ENDING: 4,
	ENDED: 8,
	DESTROYED: 16,
	FAILED: 32,
	TERMINATED: 64,
	CANCELED: 128,
	COMPLETED: 256,
	COMPENSABLE: 512,
	ACTIVE: 7,
	NOT_DEAD: 9
});
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/ScopeStates.js
var SELF = {};
function illegalTransition(state, target) {
	throw new Error(`illegal transition: ${state.name} -> ${target}`);
}
function orSelf(state, self) {
	if (state === SELF) return self;
	return state;
}
var ScopeState = class {
	constructor(name, traits, transitions = {}) {
		this.name = name;
		this.traits = traits;
		this.setTransitions(transitions);
	}
	setTransitions({ start, cancel, complete, destroy, fail, terminate, compensable }) {
		this._start = orSelf(start, this);
		this._compensable = orSelf(compensable, this);
		this._cancel = orSelf(cancel, this);
		this._complete = orSelf(complete, this);
		this._destroy = orSelf(destroy, this);
		this._fail = orSelf(fail, this);
		this._terminate = orSelf(terminate, this);
	}
	hasTrait(trait) {
		return (this.traits & trait) !== 0;
	}
	complete() {
		return this._complete || illegalTransition(this, "complete");
	}
	destroy() {
		return this._destroy || illegalTransition(this, "destroy");
	}
	cancel() {
		return this._cancel || illegalTransition(this, "cancel");
	}
	fail() {
		return this._fail || illegalTransition(this, "fail");
	}
	terminate() {
		return this._terminate || illegalTransition(this, "terminate");
	}
	compensable() {
		return this._compensable || illegalTransition(this, "compensable");
	}
	start() {
		return this._start || illegalTransition(this, "start");
	}
};
var FAILED = new ScopeState("failed", ScopeTraits.DESTROYED | ScopeTraits.FAILED);
var TERMINATED = new ScopeState("terminated", ScopeTraits.DESTROYED | ScopeTraits.TERMINATED | ScopeTraits.COMPLETED);
var COMPLETED = new ScopeState("completed", ScopeTraits.DESTROYED | ScopeTraits.COMPLETED);
var TERMINATING = new ScopeState("terminating", ScopeTraits.ENDING | ScopeTraits.TERMINATED | ScopeTraits.COMPLETED, { destroy: TERMINATED });
var CANCELING = new ScopeState("canceling", ScopeTraits.ENDING | ScopeTraits.FAILED | ScopeTraits.CANCELED, {
	destroy: FAILED,
	complete: SELF,
	terminate: TERMINATING
});
var COMPLETING = new ScopeState("completing", ScopeTraits.ENDING | ScopeTraits.COMPLETED, {
	destroy: COMPLETED,
	cancel: CANCELING,
	terminate: TERMINATING
});
var FAILING = new ScopeState("failing", ScopeTraits.ENDING | ScopeTraits.FAILED, {
	cancel: CANCELING,
	complete: COMPLETING,
	destroy: FAILED,
	terminate: TERMINATING
});
var COMPENSABLE_COMPLETED = new ScopeState("compensable:completed", ScopeTraits.ENDED | ScopeTraits.COMPLETED);
var COMPENSABLE_COMPLETING = new ScopeState("compensable:completing", ScopeTraits.ENDING | ScopeTraits.COMPLETED, {
	destroy: COMPENSABLE_COMPLETED,
	terminate: TERMINATING,
	compensable: SELF
});
var COMPENSABLE_FAILING = new ScopeState("compensable:failing", ScopeTraits.ENDING | ScopeTraits.FAILED, {
	complete: COMPENSABLE_COMPLETING,
	terminate: TERMINATING,
	destroy: FAILED
});
COMPENSABLE_COMPLETED.setTransitions({
	cancel: CANCELING,
	fail: COMPENSABLE_FAILING,
	destroy: COMPLETED,
	compensable: SELF
});
var COMPENSABLE_RUNNING = new ScopeState("compensable:running", ScopeTraits.RUNNING | ScopeTraits.COMPENSABLE, {
	cancel: CANCELING,
	complete: COMPENSABLE_COMPLETING,
	compensable: SELF,
	destroy: COMPENSABLE_COMPLETED,
	fail: COMPENSABLE_FAILING,
	terminate: TERMINATING
});
var RUNNING = new ScopeState("running", ScopeTraits.RUNNING, {
	cancel: CANCELING,
	complete: COMPLETING,
	compensable: COMPENSABLE_RUNNING,
	destroy: TERMINATED,
	fail: FAILING,
	terminate: TERMINATING
});
var ACTIVATED = new ScopeState("activated", ScopeTraits.ACTIVATED, {
	start: RUNNING,
	destroy: TERMINATED
});
var ScopeStates = Object.freeze({
	ACTIVATED,
	RUNNING,
	CANCELING,
	COMPLETING,
	COMPLETED,
	FAILING,
	FAILED,
	TERMINATING,
	TERMINATED
});
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/Scope.js
var Scope = class {
	constructor(id, element, parent = null, initiator = null) {
		this.id = id;
		this.element = element;
		this.parent = parent;
		this.initiator = initiator;
		this.subscriptions = new Set();
		this.children = [];
		this.state = ScopeStates.ACTIVATED;
	}
	get running() {
		return this.hasTrait(ScopeTraits.RUNNING);
	}
	get destroyed() {
		return this.hasTrait(ScopeTraits.DESTROYED);
	}
	get completed() {
		return this.hasTrait(ScopeTraits.COMPLETED);
	}
	get canceled() {
		return this.hasTrait(ScopeTraits.CANCELED);
	}
	get failed() {
		return this.hasTrait(ScopeTraits.FAILED);
	}
	get active() {
		return this.hasTrait(ScopeTraits.ACTIVE);
	}
	hasTrait(trait) {
		return this.state.hasTrait(trait);
	}
	start() {
		this.state = this.state.start();
		return this;
	}
	compensable() {
		this.state = this.state.compensable();
		return this;
	}
	fail(initiator) {
		if (!this.failed) {
			this.state = this.state.fail();
			this.failInitiator = initiator;
		}
		return this;
	}
	cancel(initiator) {
		if (!this.canceled) {
			this.state = this.state.cancel();
			this.cancelInitiator = initiator;
		}
		return this;
	}
	terminate(initiator) {
		this.state = this.state.terminate();
		this.terminateInitiator = initiator;
		return this;
	}
	complete() {
		this.state = this.state.complete();
		return this;
	}
	destroy(initiator) {
		this.state = this.state.destroy();
		this.destroyInitiator = initiator;
		return this;
	}
	getTokens() {
		return this.children.filter((c) => !c.destroyed).length;
	}
	getTokensByElement(element) {
		return this.children.filter((c) => !c.destroyed && c.element === element).length;
	}
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/util/SetUtil.js
function filterSet(set, matchFn) {
	const matched = [];
	for (const el of set) if (matchFn(el)) matched.push(el);
	return matched;
}
function findSet(set, matchFn) {
	for (const el of set) if (matchFn(el)) return el;
	return null;
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/util/EventsUtil.js
function eventsMatch(a, b) {
	const attrMatch = [
		"type",
		"name",
		"iref"
	].every((attr) => !(attr in a) || a[attr] === b[attr]);
	const catchAllMatch = !b.ref && (b.type === "error" || b.type === "escalation");
	return attrMatch && (catchAllMatch || refsMatch(a, b));
}
function refsMatch(a, b) {
	const attr = "ref";
	return !(attr in a) || a[attr] === b[attr];
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/util/ModelUtil.js
init_ModelUtil();
init_dist();
function filterSequenceFlows(flows) {
	return flows.filter((f) => is$1(f, "bpmn:SequenceFlow"));
}
function isMessageFlow(element) {
	return is$1(element, "bpmn:MessageFlow");
}
function isSequenceFlow$1(element) {
	return is$1(element, "bpmn:SequenceFlow");
}
function isLinkCatch(element) {
	return isCatchEvent(element) && isTypedEvent$1(element, "bpmn:LinkEventDefinition");
}
function isLinkThrow(element) {
	return is$1(element, "bpmn:IntermediateThrowEvent") && isTypedEvent$1(element, "bpmn:LinkEventDefinition");
}
function isCompensationEvent(element) {
	return isCatchEvent(element) && isTypedEvent$1(element, "bpmn:CompensateEventDefinition");
}
function isCompensationActivity(element) {
	return is$1(element, "bpmn:Activity") && element.businessObject.isForCompensation;
}
function isCatchEvent(element) {
	return (is$1(element, "bpmn:CatchEvent") || is$1(element, "bpmn:ReceiveTask")) && !isLabel$2(element);
}
function isBoundaryEvent(element) {
	return is$1(element, "bpmn:BoundaryEvent") && !isLabel$2(element);
}
function isNoneStartEvent(element) {
	return isStartEvent(element) && !isTypedEvent$1(element);
}
function isImplicitStartEvent(element) {
	if (isLabel$2(element)) return false;
	if (!isAny(element, [
		"bpmn:Activity",
		"bpmn:IntermediateCatchEvent",
		"bpmn:IntermediateThrowEvent",
		"bpmn:Gateway",
		"bpmn:EndEvent"
	])) return false;
	if (isLinkCatch(element)) return false;
	if (element.incoming.find(isSequenceFlow$1)) return false;
	if (isCompensationActivity(element)) return false;
	if (isEventSubProcess(element)) return false;
	return true;
}
function isStartEvent(element) {
	return is$1(element, "bpmn:StartEvent") && !isLabel$2(element);
}
function isLabel$2(element) {
	return !!element.labelTarget;
}
function isEventSubProcess(element) {
	return getBusinessObject(element).triggeredByEvent;
}
function isInterrupting(element) {
	return is$1(element, "bpmn:StartEvent") && getBusinessObject(element).isInterrupting || is$1(element, "bpmn:BoundaryEvent") && getBusinessObject(element).cancelActivity;
}
function isAny(element, types) {
	return types.some((type) => is$1(element, type));
}
function isTypedEvent$1(event, eventDefinitionType) {
	return some(getBusinessObject(event).eventDefinitions, (definition) => {
		return eventDefinitionType ? is$1(definition, eventDefinitionType) : true;
	});
}
function getChildren(element, elementRegistry) {
	if (element.children && element.children.length !== 0) return element.children;
	if (is$1(element, "bpmn:SubProcess") && !element.di.isExpanded) return elementRegistry.get(getPlaneIdFromShape(element)).children;
	return [];
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/Simulator.js
function Simulator(injector, eventBus, elementRegistry) {
	const ids = injector.get("scopeIds", false) || new Ids([32, 36]);
	const configuration = {};
	const behaviors = {};
	const noopBehavior = new NoopBehavior();
	const changedElements = new Set();
	const jobs = [];
	const scopes = new Set();
	const subscriptions = new Set();
	on("tick", function() {
		for (const element of changedElements) emit("elementChanged", { element });
		changedElements.clear();
	});
	function queue(scope, task) {
		jobs.push([task, scope]);
		if (jobs.length !== 1) return;
		let next;
		while (next = jobs[0]) {
			const [task, scope] = next;
			if (!scope.destroyed) task();
			jobs.shift();
		}
		emit("tick");
	}
	function getBehavior(element) {
		return behaviors[element.type] || noopBehavior;
	}
	function signal(context) {
		const { element, parentScope, initiator = null, scope = initializeScope({
			element,
			parent: parentScope,
			initiator
		}) } = context;
		queue(scope, function() {
			if (!scope.running) scope.start();
			trace("signal", {
				...context,
				scope
			});
			getBehavior(element).signal({
				...context,
				scope
			});
			if (scope.parent) scopeChanged(scope.parent);
		});
		return scope;
	}
	function enter(context) {
		const { element, scope: parentScope, initiator = parentScope } = context;
		const scope = initializeScope({
			element,
			parent: parentScope,
			initiator
		});
		queue(scope, function() {
			if (!scope.running) scope.start();
			trace("enter", context);
			getBehavior(element).enter({
				...context,
				initiator,
				scope
			});
			if (scope.parent) scopeChanged(scope.parent);
		});
		return scope;
	}
	function exit(context) {
		const { element, scope, initiator = scope } = context;
		queue(scope, function() {
			trace("exit", context);
			getBehavior(element).exit({
				...context,
				initiator
			});
			if (scope.running) scope.complete();
			destroyScope(scope, initiator);
			scope.parent && scopeChanged(scope.parent);
		});
	}
	function trigger(context) {
		const { event: _event, initiator, scope } = context;
		const event = getEvent(_event);
		const subscriptions = scope.subscriptions;
		let matchingSubscriptions = filterSet(subscriptions, (subscription) => eventsMatch(event, subscription.event));
		if (event.type === "error" || event.type === "escalation") {
			const referenceSubscriptions = filterSet(matchingSubscriptions, (subscription) => refsMatch(event, subscription.event));
			if (matchingSubscriptions.every((subscription) => subscription.event.boundary) && referenceSubscriptions.some((subscription) => subscription.event.boundary) || referenceSubscriptions.some((subscription) => !subscription.event.boundary)) matchingSubscriptions = referenceSubscriptions;
		}
		const nonInterrupting = matchingSubscriptions.filter((subscription) => !subscription.event.interrupting);
		const interrupting = matchingSubscriptions.filter((subscription) => subscription.event.interrupting);
		if (!interrupting.length) return nonInterrupting.map((subscription) => subscription.triggerFn(initiator)).flat();
		const interrupt = interrupting.find((subscription) => !subscription.event.boundary) || interrupting[0];
		const remainingSubscriptions = filterSet(subscriptions, (subscription) => subscription.event.persistent || isRethrow(subscription.event, interrupt.event));
		subscriptions.forEach((subscription) => {
			if (!remainingSubscriptions.includes(subscription)) subscription.remove();
		});
		return [interrupt.triggerFn(initiator)].flat().filter((s) => s);
	}
	function subscribe(scope, event, triggerFn) {
		event = getEvent(event);
		const element = event.element;
		const subscription = {
			scope,
			event,
			element,
			triggerFn,
			remove() {
				unsubscribe(subscription);
			}
		};
		subscriptions.add(subscription);
		scope.subscriptions.add(subscription);
		if (element) elementChanged(element);
		return subscription;
	}
	function unsubscribe(subscription) {
		const { scope, event } = subscription;
		subscriptions.delete(subscription);
		scope.subscriptions.delete(subscription);
		if (event.element) elementChanged(event.element);
	}
	function createInternalRef(element) {
		if (is$1(element, "bpmn:StartEvent") || is$1(element, "bpmn:IntermediateCatchEvent") || is$1(element, "bpmn:ReceiveTask") || isSpecialBoundaryEvent(element)) return getBusinessObject(element).name || element.id;
		return null;
	}
	function getNoneEvent(element) {
		return {
			element,
			interrupting: false,
			boundary: false,
			iref: element.id,
			type: "none"
		};
	}
	function getEvent(element) {
		if (!element.businessObject) return element;
		const interrupting = isInterrupting(element);
		const boundary = isBoundaryEvent(element);
		const iref = createInternalRef(element);
		const baseEvent = {
			element,
			interrupting,
			boundary,
			...iref ? { iref } : {}
		};
		const eventDefinition = getEventDefinitions(element)[0];
		if (!eventDefinition) return {
			...baseEvent,
			type: isImplicitMessageCatch(element) ? "message" : "none"
		};
		if (is$1(eventDefinition, "bpmn:LinkEventDefinition")) return {
			...baseEvent,
			type: "link",
			name: eventDefinition.name
		};
		if (is$1(eventDefinition, "bpmn:SignalEventDefinition")) return {
			...baseEvent,
			type: "signal",
			ref: eventDefinition.signalRef
		};
		if (is$1(eventDefinition, "bpmn:TimerEventDefinition")) return {
			...baseEvent,
			type: "timer"
		};
		if (is$1(eventDefinition, "bpmn:ConditionalEventDefinition")) return {
			...baseEvent,
			type: "condition"
		};
		if (is$1(eventDefinition, "bpmn:EscalationEventDefinition")) return {
			...baseEvent,
			type: "escalation",
			ref: eventDefinition.escalationRef
		};
		if (is$1(eventDefinition, "bpmn:CancelEventDefinition")) return {
			...baseEvent,
			type: "cancel"
		};
		if (is$1(eventDefinition, "bpmn:ErrorEventDefinition")) return {
			...baseEvent,
			type: "error",
			ref: eventDefinition.errorRef
		};
		if (is$1(eventDefinition, "bpmn:MessageEventDefinition")) return {
			...baseEvent,
			type: "message",
			ref: eventDefinition.messageRef
		};
		if (is$1(eventDefinition, "bpmn:CompensateEventDefinition")) {
			let ref = eventDefinition.activityRef && elementRegistry.get(eventDefinition.activityRef.id);
			if (!ref) {
				if (isStartEvent(element) && isEventSubProcess(element.parent)) ref = element.parent.parent;
				else if (isBoundaryEvent(element)) ref = element.host;
				else ref = element.parent;
			}
			return {
				...baseEvent,
				type: "compensate",
				ref,
				persistent: true
			};
		}
		throw new Error("unknown event definition", eventDefinition);
	}
	function createScope(context, emitEvent = true) {
		const { element, parent: parentScope, initiator } = context;
		emitEvent && trace("createScope", {
			element,
			scope: parentScope
		});
		const scope = new Scope(ids.next(), element, parentScope, initiator);
		if (parentScope) parentScope.children.push(scope);
		scopes.add(scope);
		emitEvent && emit("createScope", { scope });
		elementChanged(element);
		if (parentScope) elementChanged(parentScope.element);
		return scope;
	}
	function subscriptionFilter(filter) {
		if (typeof filter === "function") return filter;
		const { event: _event, element, scope } = filter;
		const elements = filter.elements || element && [element];
		const event = _event && getEvent(_event);
		return ((subscription) => (!event || eventsMatch(event, subscription.event)) && (!elements || elements.includes(subscription.element)) && (!scope || scope === subscription.scope));
	}
	function scopeSubscriptionFilter(event) {
		const matchesSubscription = event === "function" ? event : subscriptionFilter(event);
		return ((scope) => Array.from(scope.subscriptions).some(matchesSubscription));
	}
	function scopeFilter(filter) {
		if (typeof filter === "function") return filter;
		const { element, waitsOnElement, parent, trait = ScopeTraits.RUNNING, subscribedTo } = filter;
		const isSubscribed = subscribedTo ? scopeSubscriptionFilter(subscribedTo) : () => true;
		return ((scope) => (!element || scope.element === element) && (!parent || scope.parent === parent) && (!waitsOnElement || scope.getTokensByElement(waitsOnElement) > 0) && scope.hasTrait(trait) && isSubscribed(scope));
	}
	function findSubscriptions(filter) {
		return filterSet(subscriptions, subscriptionFilter(filter));
	}
	function findSubscription(filter) {
		return findSet(subscriptions, subscriptionFilter(filter));
	}
	function findScopes(filter) {
		return filterSet(scopes, scopeFilter(filter));
	}
	function findScope(filter) {
		return findSet(scopes, scopeFilter(filter));
	}
	function destroyScope(scope, initiator = null) {
		if (scope.destroyed) return;
		scope.destroy(initiator);
		for (const subscription of scope.subscriptions) {
			const trait = subscription.event.traits || ScopeTraits.ACTIVE;
			if (!scope.hasTrait(trait)) unsubscribe(subscription);
		}
		if (scope.destroyed) {
			for (const childScope of scope.children) if (!childScope.destroyed) destroyScope(childScope, initiator);
			trace("destroyScope", {
				element: scope.element,
				scope
			});
			scopes.delete(scope);
			emit("destroyScope", { scope });
		}
		elementChanged(scope.element);
		if (scope.parent) elementChanged(scope.parent.element);
	}
	function trace(action, context) {
		emit("trace", {
			...context,
			action
		});
	}
	function elementChanged(element) {
		changedElements.add(element);
		if (!jobs.length) emit("tick");
	}
	function scopeChanged(scope) {
		emit("scopeChanged", { scope });
	}
	function emit(event, payload = {}) {
		return eventBus.fire(`tokenSimulation.simulator.${event}`, payload);
	}
	function on(event, callback) {
		eventBus.on("tokenSimulation.simulator." + event, callback);
	}
	function off(event, callback) {
		eventBus.off("tokenSimulation.simulator." + event, callback);
	}
	function setConfig(element, updatedConfig) {
		const existingConfig = getConfig(element);
		configuration[element.id || element] = {
			...existingConfig,
			...updatedConfig
		};
		elementChanged(element);
	}
	function initializeRootScopes() {
		const rootScopes = [];
		elementRegistry.forEach((element) => {
			if (!isAny(element, ["bpmn:Process", "bpmn:Participant"])) return;
			const scope = createScope({ element }, false);
			rootScopes.push(scope);
			const startEvents = element.children.filter(isStartEvent);
			const implicitStartEvents = element.children.filter(isImplicitStartEvent);
			for (const startEvent of startEvents) subscribe(scope, {
				...getEvent(startEvent),
				interrupting: false
			}, (initiator) => signal({
				element,
				startEvent,
				initiator
			}));
			if (!startEvents.length) for (const implicitStartEvent of implicitStartEvents) subscribe(scope, getNoneEvent(implicitStartEvent), (initiator) => signal({
				element,
				initiator
			}));
		});
		return rootScopes;
	}
	function initializeScope(context) {
		const { element } = context;
		const scope = createScope(context);
		const { attachers = [] } = element;
		const children = getChildren(element, elementRegistry);
		for (const childElement of children) if (isEventSubProcess(childElement)) {
			const startEvents = getChildren(childElement, elementRegistry).filter((element) => isStartEvent(element) && !isCompensationEvent(element));
			for (const startEvent of startEvents) subscribe(scope, startEvent, (initiator) => {
				return signal({
					element: childElement,
					parentScope: scope,
					startEvent,
					initiator
				});
			});
		}
		for (const attacher of attachers) if (isBoundaryEvent(attacher) && !isCompensationEvent(attacher)) subscribe(scope, attacher, (initiator) => {
			return signal({
				element: attacher,
				parentScope: scope.parent,
				hostScope: scope,
				initiator
			});
		});
		return scope;
	}
	function getConfig(element) {
		return configuration[element.id || element] || {};
	}
	function waitForScopes(scope, scopes) {
		if (!scopes.length) return;
		const event = {
			type: "all-completed",
			persistent: false
		};
		const remainingScopes = new Set(scopes);
		const destroyListener = (destroyEvent) => {
			remainingScopes.delete(destroyEvent.scope);
			if (remainingScopes.size === 0) {
				off("destroyScope", destroyListener);
				trigger({
					scope,
					event
				});
			}
		};
		on("destroyScope", destroyListener);
		return event;
	}
	function waitAtElement(element, wait = true) {
		setConfig(element, { wait });
	}
	function reset() {
		for (const scope of scopes) destroyScope(scope);
		for (const rootScope of initializeRootScopes()) scopes.add(rootScope);
		emit("tick");
		emit("reset");
	}
	this.createScope = createScope;
	this.destroyScope = destroyScope;
	this.findScope = findScope;
	this.findScopes = findScopes;
	this.findSubscription = findSubscription;
	this.findSubscriptions = findSubscriptions;
	this.waitAtElement = waitAtElement;
	this.waitForScopes = waitForScopes;
	this.setConfig = setConfig;
	this.getConfig = getConfig;
	this.signal = signal;
	this.enter = enter;
	this.exit = exit;
	this.subscribe = subscribe;
	this.trigger = trigger;
	this.reset = reset;
	this.on = on;
	this.off = off;
	this.registerBehavior = function(element, behavior) {
		behaviors[element] = behavior;
	};
}
Simulator.$inject = [
	"injector",
	"eventBus",
	"elementRegistry"
];
function NoopBehavior() {
	this.signal = function(context) {
		console.log("ignored #exit", context.element);
	};
	this.exit = function(context) {
		console.log("ignored #exit", context.element);
	};
	this.enter = function(context) {
		console.log("ignored #enter", context.element);
	};
}
function isRethrow(event, interrupt) {
	return event.boundary && !interrupt.boundary;
}
function isImplicitMessageCatch(element) {
	return is$1(element, "bpmn:ReceiveTask") || element.incoming.some((element) => is$1(element, "bpmn:MessageFlow"));
}
function isSpecialBoundaryEvent(element) {
	if (!isBoundaryEvent(element)) return false;
	const eventDefinitions = getEventDefinitions(element);
	return !eventDefinitions[0] || isAny(eventDefinitions[0], ["bpmn:ConditionalEventDefinition", "bpmn:TimerEventDefinition"]);
}
function getEventDefinitions(element) {
	return element.businessObject.get("eventDefinitions") || [];
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/StartEventBehavior.js
function StartEventBehavior(simulator, activityBehavior) {
	this._simulator = simulator;
	this._activityBehavior = activityBehavior;
	simulator.registerBehavior("bpmn:StartEvent", this);
}
StartEventBehavior.prototype.signal = function(context) {
	this._simulator.exit(context);
};
StartEventBehavior.prototype.exit = function(context) {
	this._activityBehavior.exit(context);
};
StartEventBehavior.$inject = ["simulator", "activityBehavior"];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/EndEventBehavior.js
function EndEventBehavior(simulator, scopeBehavior, intermediateThrowEventBehavior) {
	this._intermediateThrowEventBehavior = intermediateThrowEventBehavior;
	this._scopeBehavior = scopeBehavior;
	simulator.registerBehavior("bpmn:EndEvent", this);
}
EndEventBehavior.$inject = [
	"simulator",
	"scopeBehavior",
	"intermediateThrowEventBehavior"
];
EndEventBehavior.prototype.enter = function(context) {
	this._intermediateThrowEventBehavior.enter(context);
};
EndEventBehavior.prototype.signal = function(context) {
	this._intermediateThrowEventBehavior.signal(context);
};
EndEventBehavior.prototype.exit = function(context) {
	const { scope } = context;
	this._scopeBehavior.tryExit(scope.parent, scope);
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/BoundaryEventBehavior.js
function BoundaryEventBehavior(simulator, activityBehavior, scopeBehavior) {
	this._simulator = simulator;
	this._activityBehavior = activityBehavior;
	this._scopeBehavior = scopeBehavior;
	simulator.registerBehavior("bpmn:BoundaryEvent", this);
}
BoundaryEventBehavior.prototype.signal = function(context) {
	const { element, scope, hostScope = this._simulator.findScope({
		parent: scope.parent,
		element: element.host
	}) } = context;
	if (!hostScope) throw new Error("host scope not found");
	if (getBusinessObject(element).cancelActivity) {
		this._scopeBehavior.interrupt(hostScope, scope);
		const event = this._scopeBehavior.tryExit(hostScope, scope);
		if (event) {
			const subscription = this._simulator.subscribe(hostScope, event, (initiator) => {
				subscription.remove();
				return this._simulator.exit(context);
			});
			return;
		}
	}
	this._simulator.exit(context);
};
BoundaryEventBehavior.prototype.exit = function(context) {
	this._activityBehavior.exit(context);
};
BoundaryEventBehavior.$inject = [
	"simulator",
	"activityBehavior",
	"scopeBehavior"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/IntermediateCatchEventBehavior.js
function IntermediateCatchEventBehavior(simulator, activityBehavior) {
	this._activityBehavior = activityBehavior;
	this._simulator = simulator;
	simulator.registerBehavior("bpmn:IntermediateCatchEvent", this);
	simulator.registerBehavior("bpmn:ReceiveTask", this);
}
IntermediateCatchEventBehavior.$inject = ["simulator", "activityBehavior"];
IntermediateCatchEventBehavior.prototype.signal = function(context) {
	return this._simulator.exit(context);
};
IntermediateCatchEventBehavior.prototype.enter = function(context) {
	const { element } = context;
	return this._activityBehavior.signalOnEvent(context, element);
};
IntermediateCatchEventBehavior.prototype.exit = function(context) {
	this._activityBehavior.exit(context);
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/IntermediateThrowEventBehavior.js
function IntermediateThrowEventBehavior(simulator, activityBehavior, eventBehaviors) {
	this._simulator = simulator;
	this._activityBehavior = activityBehavior;
	this._eventBehaviors = eventBehaviors;
	simulator.registerBehavior("bpmn:IntermediateThrowEvent", this);
	simulator.registerBehavior("bpmn:SendTask", this);
}
IntermediateThrowEventBehavior.prototype.enter = function(context) {
	const { element } = context;
	const eventBehavior = this._eventBehaviors.get(element);
	if (eventBehavior) {
		const event = eventBehavior(context);
		if (event) return this._activityBehavior.signalOnEvent(context, event);
	}
	this._activityBehavior.enter(context);
};
IntermediateThrowEventBehavior.prototype.signal = function(context) {
	this._activityBehavior.signal(context);
};
IntermediateThrowEventBehavior.prototype.exit = function(context) {
	this._activityBehavior.exit(context);
};
IntermediateThrowEventBehavior.$inject = [
	"simulator",
	"activityBehavior",
	"eventBehaviors"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/ExclusiveGatewayBehavior.js
function ExclusiveGatewayBehavior(simulator, scopeBehavior) {
	this._scopeBehavior = scopeBehavior;
	this._simulator = simulator;
	simulator.registerBehavior("bpmn:ExclusiveGateway", this);
}
ExclusiveGatewayBehavior.prototype.enter = function(context) {
	this._simulator.exit(context);
};
ExclusiveGatewayBehavior.prototype.exit = function(context) {
	const { element, scope } = context;
	const outgoings = filterSequenceFlows(element.outgoing);
	if (outgoings.length === 1) return this._simulator.enter({
		element: outgoings[0],
		scope: scope.parent
	});
	const { activeOutgoing } = this._simulator.getConfig(element);
	const outgoing = outgoings.find((o) => o === activeOutgoing);
	if (!outgoing) return this._scopeBehavior.tryExit(scope.parent, scope);
	return this._simulator.enter({
		element: outgoing,
		scope: scope.parent
	});
};
ExclusiveGatewayBehavior.$inject = ["simulator", "scopeBehavior"];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/ParallelGatewayBehavior.js
function ParallelGatewayBehavior(simulator, activityBehavior) {
	this._simulator = simulator;
	this._activityBehavior = activityBehavior;
	simulator.registerBehavior("bpmn:ParallelGateway", this);
}
ParallelGatewayBehavior.prototype.enter = function(context) {
	const { scope } = context;
	const joiningScopes = this._findJoiningScopes(context);
	if (joiningScopes.length) {
		for (const childScope of joiningScopes) if (childScope !== scope) this._simulator.destroyScope(childScope.complete(), scope);
		this._simulator.exit(context);
	}
};
ParallelGatewayBehavior.prototype._findJoiningScopes = function(enterContext) {
	const { scope, element } = enterContext;
	const sequenceFlows = filterSequenceFlows(element.incoming);
	const { parent: parentScope } = scope;
	const elementScopes = this._simulator.findScopes({
		parent: parentScope,
		element
	});
	const matchingScopes = sequenceFlows.map((flow) => elementScopes.find((scope) => scope.initiator.element === flow)).filter((scope) => scope);
	if (matchingScopes.length === sequenceFlows.length) return matchingScopes;
	else return [];
};
ParallelGatewayBehavior.prototype.exit = function(context) {
	this._activityBehavior.exit(context);
};
ParallelGatewayBehavior.$inject = ["simulator", "activityBehavior"];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/EventBasedGatewayBehavior.js
function EventBasedGatewayBehavior(simulator) {
	this._simulator = simulator;
	simulator.registerBehavior("bpmn:EventBasedGateway", this);
}
EventBasedGatewayBehavior.$inject = ["simulator"];
EventBasedGatewayBehavior.prototype.enter = function(context) {
	const { element, scope } = context;
	const parentScope = scope.parent;
	const subscriptions = getTriggers(element).map((triggerElement) => this._simulator.subscribe(parentScope, triggerElement, (initiator) => {
		subscriptions.forEach((subscription) => subscription.remove());
		this._simulator.destroyScope(scope, initiator);
		return this._simulator.signal({
			element: triggerElement,
			parentScope,
			initiator
		});
	}));
};
function getTriggers(element) {
	return element.outgoing.map((outgoing) => outgoing.target).filter((activity) => isAny(activity, ["bpmn:IntermediateCatchEvent", "bpmn:ReceiveTask"]));
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/util/ElementHelper.js
init_dist();
init_ModelUtil();
function getEventDefinition(event, eventDefinitionType) {
	return find(getBusinessObject(event).eventDefinitions, (definition) => {
		return is$1(definition, eventDefinitionType);
	});
}
function isTypedEvent(event, eventDefinitionType) {
	return some(getBusinessObject(event).eventDefinitions, (definition) => {
		return is$1(definition, eventDefinitionType);
	});
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/InclusiveGatewayBehavior.js
function InclusiveGatewayBehavior(simulator, activityBehavior) {
	this._simulator = simulator;
	this._activityBehavior = activityBehavior;
	simulator.registerBehavior("bpmn:InclusiveGateway", this);
}
InclusiveGatewayBehavior.prototype.enter = function(context) {
	this._tryJoin(context);
};
InclusiveGatewayBehavior.prototype.exit = function(context) {
	const { element, scope } = context;
	if (filterSequenceFlows(element.outgoing).length > 1) {
		const { activeOutgoing = [] } = this._simulator.getConfig(element);
		if (!activeOutgoing.length) throw new Error("no outgoing configured");
		for (const outgoing of activeOutgoing) this._simulator.enter({
			element: outgoing,
			scope: scope.parent
		});
	} else this._activityBehavior.exit(context);
};
InclusiveGatewayBehavior.prototype._tryJoin = function(context) {
	var exclude = context.exclude || [];
	const { scope, element } = context;
	const { parent: parentScope } = scope;
	const incomingSequenceFlows = filterSequenceFlows(element.incoming);
	const gatewayScopes = this._simulator.findScopes({
		parent: parentScope,
		element
	}).filter((s) => !exclude.includes(s));
	const incomingFlowsWithoutToken = incomingSequenceFlows.filter((flow) => !gatewayScopes.find((s) => s.initiator.element === flow));
	const incomingFlowsWithToken = incomingSequenceFlows.filter((flow) => gatewayScopes.find((s) => s.initiator.element === flow));
	const requiredScopes = this._getRemainingScopes(context).filter((scope) => incomingFlowsWithoutToken.some((flow) => this._canReachElement(context, scope.element, flow))).filter((scope) => !incomingFlowsWithToken.some((flow) => this._canReachElement(context, scope.element, flow)));
	if (!requiredScopes.length) this._join(context, incomingFlowsWithToken, gatewayScopes, exclude);
	if (this._simulator.findScopes({
		parent: parentScope,
		element
	}).filter((s) => !exclude.includes(s))[0] !== scope) return;
	const event = this._simulator.waitForScopes(scope, requiredScopes);
	const subscription = this._simulator.subscribe(scope, event, () => {
		subscription.remove();
		this._tryJoin(context);
	});
};
InclusiveGatewayBehavior.prototype._getRemainingScopes = function(context) {
	const { scope, element } = context;
	const { parent: parentScope } = scope;
	return this._simulator.findScopes((scope) => scope.parent === parentScope && scope.element !== element);
};
InclusiveGatewayBehavior.prototype._join = function(context, incomingFlowsWithToken, gatewayScopes, exclude) {
	const { scope } = context;
	const consumeScopes = incomingFlowsWithToken.map((flow) => gatewayScopes.find((s) => s.initiator.element === flow));
	for (const childScope of consumeScopes) if (childScope !== scope) this._simulator.destroyScope(childScope.complete(), scope);
	this._simulator.exit(context);
	exclude.push(scope);
	const stayingScopes = gatewayScopes.filter((s) => !consumeScopes.includes(s));
	if (stayingScopes.length) this._tryJoin({
		initiator: stayingScopes[0].initiator,
		element: stayingScopes[0].element,
		scope: stayingScopes[0],
		exclude
	});
};
InclusiveGatewayBehavior.prototype._canReachElement = function(context, targetElement, currentElement, traversed = new Set()) {
	if (context.element === currentElement) return false;
	if (traversed.has(currentElement)) return false;
	traversed.add(currentElement);
	if (targetElement === currentElement) return true;
	if (isSequenceFlow$1(currentElement)) return this._canReachElement(context, targetElement, currentElement.source, traversed);
	if (isLinkCatch(currentElement)) return filterLinkThrowEvents(currentElement.parent.children, getLinkName(currentElement)).some((linkThrowEvent) => this._canReachElement(context, targetElement, linkThrowEvent, traversed));
	return filterSequenceFlows(currentElement.incoming).some((flow) => this._canReachElement(context, targetElement, flow, traversed));
};
function getLinkName(element) {
	return getEventDefinition(element, "bpmn:LinkEventDefinition").name;
}
function filterLinkThrowEvents(elements, linkName) {
	return elements.filter((e) => isLinkThrow(e) && getLinkName(e) === linkName);
}
InclusiveGatewayBehavior.$inject = ["simulator", "activityBehavior"];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/ActivityBehavior.js
function ActivityBehavior(simulator, scopeBehavior, transactionBehavior) {
	this._simulator = simulator;
	this._scopeBehavior = scopeBehavior;
	this._transactionBehavior = transactionBehavior;
	for (const element of [
		"bpmn:BusinessRuleTask",
		"bpmn:CallActivity",
		"bpmn:ManualTask",
		"bpmn:ScriptTask",
		"bpmn:ServiceTask",
		"bpmn:Task",
		"bpmn:UserTask"
	]) simulator.registerBehavior(element, this);
}
ActivityBehavior.$inject = [
	"simulator",
	"scopeBehavior",
	"transactionBehavior"
];
ActivityBehavior.prototype.signal = function(context) {
	const event = this._triggerMessages(context);
	if (event) return this.signalOnEvent(context, event);
	this._simulator.exit(context);
};
ActivityBehavior.prototype.enter = function(context) {
	const { element } = context;
	const continueEvent = this.waitAtElement(element);
	if (continueEvent) return this.signalOnEvent(context, continueEvent);
	const event = this._triggerMessages(context);
	if (event) return this.signalOnEvent(context, event);
	this._simulator.exit(context);
};
ActivityBehavior.prototype.exit = function(context) {
	const { element, scope } = context;
	const parentScope = scope.parent;
	const completing = scope.active && !scope.failed;
	if (completing && !isEventSubProcess(element)) this._transactionBehavior.registerCompensation(scope);
	const activatedFlows = completing ? element.outgoing.filter(isSequenceFlow$1) : [];
	activatedFlows.forEach((element) => this._simulator.enter({
		element,
		scope: parentScope
	}));
	if (activatedFlows.length === 0) this._scopeBehavior.tryExit(parentScope, scope);
};
ActivityBehavior.prototype.signalOnEvent = function(context, event) {
	const { scope, element } = context;
	const subscription = this._simulator.subscribe(scope, event, (initiator) => {
		subscription.remove();
		return this._simulator.signal({
			scope,
			element,
			initiator
		});
	});
};
ActivityBehavior.prototype.waitAtElement = function(element) {
	return this._simulator.getConfig(element).wait && {
		element,
		type: "continue",
		interrupting: false,
		boundary: false
	};
};
ActivityBehavior.prototype._getMessageContexts = function(element, after = null) {
	const filterAfter = after ? (ctx) => ctx.referencePoint.x > after.x : () => true;
	const sortByReference = (a, b) => a.referencePoint.x - b.referencePoint.x;
	return [...element.incoming.filter(isMessageFlow).map((flow) => ({
		incoming: flow,
		referencePoint: last(flow.waypoints)
	})), ...element.outgoing.filter(isMessageFlow).map((flow) => ({
		outgoing: flow,
		referencePoint: first(flow.waypoints)
	}))].sort(sortByReference).filter(filterAfter);
};
ActivityBehavior.prototype._triggerMessages = function(context) {
	const { element, initiator, scope } = context;
	let messageContexts = scope.messageContexts;
	if (!messageContexts) messageContexts = scope.messageContexts = this._getMessageContexts(element);
	const initiatingFlow = initiator && initiator.element;
	if (isMessageFlow(initiatingFlow)) {
		if (scope.expectedIncoming !== initiatingFlow) {
			console.debug("Simulator :: ActivityBehavior :: ignoring out-of-bounds message");
			return;
		}
	}
	while (messageContexts.length) {
		const { incoming, outgoing } = messageContexts.shift();
		if (incoming) {
			if (!initiator) continue;
			scope.expectedIncoming = incoming;
			return {
				element,
				type: "message",
				name: incoming.id,
				interrupting: false,
				boundary: false
			};
		}
		this._simulator.signal({ element: outgoing });
	}
};
function first(arr) {
	return arr && arr[0];
}
function last(arr) {
	return arr && arr[arr.length - 1];
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/SubProcessBehavior.js
function SubProcessBehavior(simulator, activityBehavior, scopeBehavior, transactionBehavior, elementRegistry) {
	this._simulator = simulator;
	this._activityBehavior = activityBehavior;
	this._scopeBehavior = scopeBehavior;
	this._transactionBehavior = transactionBehavior;
	this._elementRegistry = elementRegistry;
	simulator.registerBehavior("bpmn:SubProcess", this);
	simulator.registerBehavior("bpmn:Transaction", this);
	simulator.registerBehavior("bpmn:AdHocSubProcess", this);
}
SubProcessBehavior.$inject = [
	"simulator",
	"activityBehavior",
	"scopeBehavior",
	"transactionBehavior",
	"elementRegistry"
];
SubProcessBehavior.prototype.signal = function(context) {
	this._start(context);
};
SubProcessBehavior.prototype.enter = function(context) {
	const { element } = context;
	const continueEvent = this._activityBehavior.waitAtElement(element);
	if (continueEvent) return this._activityBehavior.signalOnEvent(context, continueEvent);
	this._start(context);
};
SubProcessBehavior.prototype.exit = function(context) {
	const { scope } = context;
	const parentScope = scope.parent;
	if (parentScope.failInitiator === scope) parentScope.complete();
	this._activityBehavior.exit(context);
};
SubProcessBehavior.prototype._start = function(context) {
	const { element, startEvent, scope } = context;
	const targetScope = scope.parent;
	if (isEventSubProcess(element)) {
		if (!startEvent) throw new Error("missing <startEvent>: required for event sub-process");
	} else if (startEvent) throw new Error("unexpected <startEvent>: not allowed for sub-process");
	if (targetScope.destroyed) throw new Error(`target scope <${targetScope.id}> destroyed`);
	if (isTransaction(element)) this._transactionBehavior.setup(context);
	if (startEvent && isInterrupting(startEvent)) this._scopeBehavior.interrupt(targetScope, scope);
	const startNodes = this._findStarts(element, startEvent);
	for (const element of startNodes) if (isStartEvent(element)) this._simulator.signal({
		element,
		parentScope: scope,
		initiator: scope
	});
	else this._simulator.enter({
		element,
		scope,
		initiator: scope
	});
	if (!startNodes.length) this._simulator.exit(context);
};
SubProcessBehavior.prototype._findStarts = function(element, startEvent) {
	const isStartEvent = startEvent ? (node) => startEvent === node : (node) => isNoneStartEvent(node);
	return getChildren(element, this._elementRegistry).filter((node) => isStartEvent(node) || isImplicitStartEvent(node));
};
function isTransaction(element) {
	return is$1(element, "bpmn:Transaction");
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/TransactionBehavior.js
var CANCEL_EVENT = {
	type: "cancel",
	interrupting: true,
	boundary: false,
	persistent: true
};
function TransactionBehavior(simulator, scopeBehavior, elementRegistry) {
	this._simulator = simulator;
	this._scopeBehavior = scopeBehavior;
	this._elementRegistry = elementRegistry;
}
TransactionBehavior.$inject = [
	"simulator",
	"scopeBehavior",
	"elementRegistry"
];
TransactionBehavior.prototype.setup = function(context) {
	const { scope } = context;
	const cancelSubscription = this._simulator.subscribe(scope, CANCEL_EVENT, (initiator) => {
		cancelSubscription.remove();
		return this.cancel({
			scope,
			initiator
		});
	});
	const compensateEvent = {
		type: "compensate",
		ref: scope.element,
		persistent: true,
		traits: ScopeTraits.NOT_DEAD
	};
	const compensateSubscription = this._simulator.subscribe(scope, compensateEvent, (initiator) => {
		if (!scope.canceled) return this._simulator.trigger({
			event: CANCEL_EVENT,
			scope
		});
		compensateSubscription.remove();
		return this.compensate({
			scope,
			element: scope.element,
			initiator
		});
	});
};
TransactionBehavior.prototype.cancel = function(context) {
	const { scope, initiator } = context;
	if (scope.destroyed) return;
	scope.cancel(initiator);
	this._simulator.trigger({
		event: {
			type: "compensate",
			ref: scope.element
		},
		initiator,
		scope
	});
	return this._simulator.trigger({
		scope,
		initiator,
		event: CANCEL_EVENT
	});
};
TransactionBehavior.prototype.registerCompensation = function(scope) {
	const { element } = scope;
	const compensateStartEvents = getChildren(element, this._elementRegistry).filter(isEventSubProcess).map((element) => getChildren(element, this._elementRegistry).find((element) => isStartEvent(element) && isCompensationEvent(element))).filter((s) => s);
	const compensateBoundaryEvents = element.attachers.filter(isCompensationEvent);
	if (!compensateStartEvents.length && !compensateBoundaryEvents.length) return;
	const transactionScope = this.findTransactionScope(scope);
	if (!is$1(transactionScope.element, "bpmn:Transaction")) this.makeCompensable(transactionScope);
	for (const startEvent of compensateStartEvents) {
		const compensationEvent = {
			element: startEvent,
			type: "compensate",
			persistent: true,
			interrupting: true,
			ref: element,
			traits: ScopeTraits.NOT_DEAD
		};
		const compensateEventSub = startEvent.parent;
		const subscription = this._simulator.subscribe(scope, compensationEvent, (initiator) => {
			subscription.remove();
			return this._simulator.signal({
				initiator,
				element: compensateEventSub,
				startEvent,
				parentScope: scope
			});
		});
	}
	for (const boundaryEvent of compensateBoundaryEvents) {
		const compensationEvent = {
			element: boundaryEvent,
			type: "compensate",
			persistent: true,
			ref: element,
			traits: ScopeTraits.NOT_DEAD
		};
		const compensateActivity = boundaryEvent.outgoing.map((outgoing) => outgoing.target).find(isCompensationActivity);
		if (!compensateActivity) continue;
		const subscription = this._simulator.subscribe(transactionScope, compensationEvent, (initiator) => {
			subscription.remove();
			return this._simulator.enter({
				initiator,
				element: compensateActivity,
				scope: transactionScope
			});
		});
	}
};
TransactionBehavior.prototype.makeCompensable = function(scope) {
	if (scope.hasTrait(ScopeTraits.COMPENSABLE) || !scope.parent) return;
	const compensateEvent = {
		type: "compensate",
		ref: scope.element,
		interrupting: true,
		persistent: true,
		traits: ScopeTraits.NOT_DEAD
	};
	scope.compensable();
	const scopeSub = this._simulator.subscribe(scope, compensateEvent, (initiator) => {
		scopeSub.remove();
		scope.fail(initiator);
		this.compensate({
			scope,
			element: scope.element,
			initiator
		});
		this._scopeBehavior.tryExit(scope, initiator);
		return scope;
	});
	const parentScope = scope.parent;
	if (!parentScope) return;
	const parentSub = this._simulator.subscribe(parentScope, compensateEvent, (initiator) => {
		parentSub.remove();
		return this._simulator.trigger({
			scope,
			event: compensateEvent,
			initiator
		});
	});
	this.makeCompensable(parentScope);
};
TransactionBehavior.prototype.findTransactionScope = function(scope) {
	let parentScope = scope;
	while (parentScope) {
		const element = parentScope.element;
		if (is$1(element, "bpmn:SubProcess") && !isEventSubProcess(element)) return parentScope;
		if (isAny(element, [
			"bpmn:Transaction",
			"bpmn:Process",
			"bpmn:Participant"
		])) return parentScope;
		parentScope = parentScope.parent;
	}
	throw noTransactionContext(scope);
};
TransactionBehavior.prototype.compensate = function(context) {
	const { scope, element } = context;
	const compensateSubscriptions = filterSet(scope.subscriptions, (subscription) => eventsMatch({ type: "compensate" }, subscription.event));
	const localSubscriptions = compensateSubscriptions.filter((subscription) => subscription.event.ref === element);
	const otherSubscriptions = compensateSubscriptions.filter((subscription) => subscription.event.ref !== element);
	for (const subscription of localSubscriptions) this._scopeBehavior.preExit(scope, (initiator) => {
		return this._simulator.trigger(subscription);
	});
	for (const subscription of otherSubscriptions.reverse()) this._scopeBehavior.preExit(scope, (initiator) => {
		return this._simulator.trigger(subscription);
	});
};
function noTransactionContext(scope) {
	throw new Error(`no transaction context for <${scope.id}>`);
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/SequenceFlowBehavior.js
function SequenceFlowBehavior(simulator, scopeBehavior) {
	this._simulator = simulator;
	this._scopeBehavior = scopeBehavior;
	simulator.registerBehavior("bpmn:SequenceFlow", this);
}
SequenceFlowBehavior.prototype.enter = function(context) {
	this._simulator.exit(context);
};
SequenceFlowBehavior.prototype.exit = function(context) {
	const { element, scope } = context;
	this._simulator.enter({
		initiator: scope,
		element: element.target,
		scope: scope.parent
	});
};
SequenceFlowBehavior.$inject = ["simulator", "scopeBehavior"];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/MessageFlowBehavior.js
function MessageFlowBehavior(simulator) {
	this._simulator = simulator;
	simulator.registerBehavior("bpmn:MessageFlow", this);
}
MessageFlowBehavior.$inject = ["simulator"];
MessageFlowBehavior.prototype.signal = function(context) {
	this._simulator.exit(context);
};
MessageFlowBehavior.prototype.exit = function(context) {
	const { element, scope: initiator } = context;
	const target = element.target;
	const event = isCatchEvent(target) ? target : {
		type: "message",
		element,
		name: element.id
	};
	const subscription = this._simulator.findSubscription({
		event,
		elements: [target, target.parent]
	});
	if (subscription) this._simulator.trigger({
		event,
		initiator,
		scope: subscription.scope
	});
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/EventBehaviors.js
function EventBehaviors(simulator, elementRegistry, scopeBehavior) {
	this._simulator = simulator;
	this._elementRegistry = elementRegistry;
	this._scopeBehavior = scopeBehavior;
}
EventBehaviors.$inject = [
	"simulator",
	"elementRegistry",
	"scopeBehavior"
];
EventBehaviors.prototype.get = function(element) {
	const entry = Object.entries({
		"bpmn:LinkEventDefinition": (context) => {
			const { element, scope } = context;
			const link = getLinkDefinition(element);
			const parentScope = scope.parent;
			const parentElement = parentScope.element;
			const linkTargets = getChildren(parentElement, this._elementRegistry).filter((element) => isLinkCatch(element) && getLinkDefinition(element).name === link.name);
			for (const linkTarget of linkTargets) this._simulator.signal({
				element: linkTarget,
				parentScope,
				initiator: scope
			});
		},
		"bpmn:SignalEventDefinition": (context) => {
			const { element, scope } = context;
			const subscriptions = this._simulator.findSubscriptions({ event: element });
			const signaledScopes = new Set();
			for (const subscription of subscriptions) {
				const signaledScope = subscription.scope;
				if (signaledScopes.has(signaledScope)) continue;
				signaledScopes.add(signaledScope);
				this._simulator.trigger({
					event: element,
					scope: signaledScope,
					initiator: scope
				});
			}
		},
		"bpmn:EscalationEventDefinition": (context) => {
			const { element, scope } = context;
			const scopes = this._simulator.findScopes({
				subscribedTo: { event: element },
				trait: ScopeTraits.ACTIVE
			});
			let triggerScope = scope;
			while (triggerScope = triggerScope.parent) if (scopes.includes(triggerScope)) {
				this._simulator.trigger({
					event: element,
					scope: triggerScope,
					initiator: scope
				});
				break;
			}
		},
		"bpmn:ErrorEventDefinition": (context) => {
			const { element, scope } = context;
			const scopes = this._simulator.findScopes({
				subscribedTo: { event: element },
				trait: ScopeTraits.ACTIVE
			});
			let triggerScope = scope;
			while (triggerScope = triggerScope.parent) if (scopes.includes(triggerScope)) {
				this._simulator.trigger({
					event: element,
					scope: triggerScope,
					initiator: scope
				});
				break;
			}
		},
		"bpmn:TerminateEventDefinition": (context) => {
			const { scope } = context;
			this._scopeBehavior.terminate(scope.parent, scope);
		},
		"bpmn:CancelEventDefinition": (context) => {
			const { scope, element } = context;
			this._simulator.trigger({
				event: element,
				initiator: scope,
				scope: findSubscriptionScope(scope)
			});
		},
		"bpmn:CompensateEventDefinition": (context) => {
			const { scope, element } = context;
			return this._simulator.waitForScopes(scope, this._simulator.trigger({
				event: element,
				scope: findSubscriptionScope(scope)
			}));
		}
	}).find((entry) => isTypedEvent(element, entry[0]));
	return entry && entry[1];
};
function getLinkDefinition(element) {
	return getEventDefinition(element, "bpmn:LinkEventDefinition");
}
function findSubscriptionScope(scope) {
	while (isEventSubProcess(scope.parent.element)) scope = scope.parent;
	return scope.parent;
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/ScopeBehavior.js
var PRE_EXIT_EVENT = {
	type: "pre-exit",
	persistent: true,
	interrupting: true,
	boundary: false
};
var EXIT_EVENT = {
	type: "exit",
	interrupting: true,
	boundary: false,
	persistent: true
};
function ScopeBehavior(simulator) {
	this._simulator = simulator;
}
ScopeBehavior.$inject = ["simulator"];
ScopeBehavior.prototype.isFinished = function(scope, excludeScope = null) {
	excludeScope = matchScope(excludeScope);
	return scope.children.every((c) => c.destroyed || c.completed || excludeScope(c));
};
ScopeBehavior.prototype.destroyChildren = function(scope, initiator, excludeScope = null) {
	excludeScope = matchScope(excludeScope);
	scope.children.filter((c) => !c.destroyed && !excludeScope(c)).map((c) => {
		this._simulator.destroyScope(c, initiator);
	});
};
ScopeBehavior.prototype.terminate = function(scope, initiator) {
	this.destroyChildren(scope, initiator);
	scope.terminate(initiator);
	this.tryExit(scope, initiator);
};
ScopeBehavior.prototype.interrupt = function(scope, initiator) {
	this.destroyChildren(scope, initiator, initiator);
	scope.fail(initiator);
};
ScopeBehavior.prototype.tryExit = function(scope, initiator) {
	if (!scope) throw new Error("missing <scope>");
	if (!initiator) initiator = scope;
	if (!this.isFinished(scope, initiator)) return EXIT_EVENT;
	const preExitSubscriptions = this._simulator.findSubscriptions({
		event: PRE_EXIT_EVENT,
		scope
	});
	for (const subscription of preExitSubscriptions) {
		const { event, scope } = subscription;
		if (this._simulator.trigger({
			event,
			scope,
			initiator
		}).length) return EXIT_EVENT;
	}
	this._simulator.trigger({
		event: EXIT_EVENT,
		scope,
		initiator
	});
	this.exit({
		scope,
		initiator
	});
};
ScopeBehavior.prototype.exit = function(context) {
	const { scope, initiator } = context;
	if (!initiator) throw new Error("missing <initiator>");
	this._simulator.exit({
		element: scope.element,
		scope,
		initiator
	});
};
ScopeBehavior.prototype.preExit = function(scope, triggerFn) {
	const subscription = this._simulator.subscribe(scope, PRE_EXIT_EVENT, (initiator) => {
		subscription.remove();
		return triggerFn(initiator);
	});
	return subscription;
};
function matchScope(fnOrScope) {
	if (typeof fnOrScope === "function") return fnOrScope;
	return (scope) => scope === fnOrScope;
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/ProcessBehavior.js
function ProcessBehavior(simulator, scopeBehavior) {
	this._simulator = simulator;
	this._scopeBehavior = scopeBehavior;
	simulator.registerBehavior("bpmn:Process", this);
	simulator.registerBehavior("bpmn:Participant", this);
}
ProcessBehavior.prototype.signal = function(context) {
	const { element, startEvent, startNodes = this._findStarts(element, startEvent), scope } = context;
	if (!startNodes.length) throw new Error("missing <startNodes> or <startEvent>");
	for (const startNode of startNodes) if (isStartEvent(startNode)) this._simulator.signal({
		element: startNode,
		parentScope: scope
	});
	else this._simulator.enter({
		element: startNode,
		scope
	});
};
ProcessBehavior.prototype.exit = function(context) {
	const { scope, initiator } = context;
	this._scopeBehavior.destroyChildren(scope, initiator);
};
ProcessBehavior.prototype._findStarts = function(element, startEvent) {
	const isStartEvent = startEvent ? (node) => startEvent === node : (node) => isNoneStartEvent(node);
	return element.children.filter((node) => isStartEvent(node) || isImplicitStartEvent(node));
};
ProcessBehavior.$inject = ["simulator", "scopeBehavior"];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/behaviors/index.js
var behaviors_default$1 = {
	__init__: [
		"startEventBehavior",
		"endEventBehavior",
		"boundaryEventBehavior",
		"intermediateCatchEventBehavior",
		"intermediateThrowEventBehavior",
		"exclusiveGatewayBehavior",
		"parallelGatewayBehavior",
		"eventBasedGatewayBehavior",
		"inclusiveGatewayBehavior",
		"subProcessBehavior",
		"sequenceFlowBehavior",
		"messageFlowBehavior",
		"processBehavior"
	],
	startEventBehavior: ["type", StartEventBehavior],
	endEventBehavior: ["type", EndEventBehavior],
	boundaryEventBehavior: ["type", BoundaryEventBehavior],
	intermediateCatchEventBehavior: ["type", IntermediateCatchEventBehavior],
	intermediateThrowEventBehavior: ["type", IntermediateThrowEventBehavior],
	exclusiveGatewayBehavior: ["type", ExclusiveGatewayBehavior],
	parallelGatewayBehavior: ["type", ParallelGatewayBehavior],
	eventBasedGatewayBehavior: ["type", EventBasedGatewayBehavior],
	inclusiveGatewayBehavior: ["type", InclusiveGatewayBehavior],
	activityBehavior: ["type", ActivityBehavior],
	subProcessBehavior: ["type", SubProcessBehavior],
	sequenceFlowBehavior: ["type", SequenceFlowBehavior],
	messageFlowBehavior: ["type", MessageFlowBehavior],
	eventBehaviors: ["type", EventBehaviors],
	scopeBehavior: ["type", ScopeBehavior],
	processBehavior: ["type", ProcessBehavior],
	transactionBehavior: ["type", TransactionBehavior]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/simulator/index.js
var HIGH_PRIORITY$3 = 5e3;
var simulator_default = {
	__depends__: [behaviors_default$1],
	__init__: [[
		"eventBus",
		"simulator",
		function(eventBus, simulator) {
			eventBus.on(["tokenSimulation.toggleMode", "tokenSimulation.resetSimulation"], HIGH_PRIORITY$3, (event) => {
				simulator.reset();
			});
		}
	]],
	simulator: ["type", Simulator]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/animation/behaviors/AnimatedMessageFlowBehavior.js
function AnimatedMessageFlowBehavior(injector, animation) {
	injector.invoke(MessageFlowBehavior, this);
	this._animation = animation;
}
e(AnimatedMessageFlowBehavior, MessageFlowBehavior);
AnimatedMessageFlowBehavior.$inject = ["injector", "animation"];
AnimatedMessageFlowBehavior.prototype.signal = function(context) {
	const { element, scope } = context;
	this._animation.animate(element, scope, () => {
		MessageFlowBehavior.prototype.signal.call(this, context);
	});
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/animation/behaviors/AnimatedSequenceFlowBehavior.js
function AnimatedSequenceFlowBehavior(injector, animation) {
	injector.invoke(SequenceFlowBehavior, this);
	this._animation = animation;
}
e(AnimatedSequenceFlowBehavior, SequenceFlowBehavior);
AnimatedSequenceFlowBehavior.$inject = ["injector", "animation"];
AnimatedSequenceFlowBehavior.prototype.enter = function(context) {
	const { element, scope } = context;
	this._animation.animate(element, scope, () => {
		SequenceFlowBehavior.prototype.enter.call(this, context);
	});
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/animation/behaviors/index.js
var behaviors_default = {
	sequenceFlowBehavior: ["type", AnimatedSequenceFlowBehavior],
	messageFlowBehavior: ["type", AnimatedMessageFlowBehavior]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/util/EventHelper.js
var TOGGLE_MODE_EVENT = "tokenSimulation.toggleMode";
var PLAY_SIMULATION_EVENT = "tokenSimulation.playSimulation";
var PAUSE_SIMULATION_EVENT = "tokenSimulation.pauseSimulation";
var RESET_SIMULATION_EVENT = "tokenSimulation.resetSimulation";
var ANIMATION_CREATED_EVENT = "tokenSimulation.animationCreated";
var ANIMATION_SPEED_CHANGED_EVENT = "tokenSimulation.animationSpeedChanged";
var ELEMENT_CHANGED_EVENT = "tokenSimulation.simulator.elementChanged";
var SCOPE_DESTROYED_EVENT = "tokenSimulation.simulator.destroyScope";
var SCOPE_CHANGED_EVENT = "tokenSimulation.simulator.scopeChanged";
var SCOPE_CREATE_EVENT = "tokenSimulation.simulator.createScope";
var SCOPE_FILTER_CHANGED_EVENT = "tokenSimulation.scopeFilterChanged";
var TRACE_EVENT = "tokenSimulation.simulator.trace";
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/scope-filter/ScopeFilter.js
var DEFAULT_SCOPE_FILTER = (s) => true;
function ScopeFilter(eventBus, simulator) {
	this._eventBus = eventBus;
	this._simulator = simulator;
	this._filter = DEFAULT_SCOPE_FILTER;
	eventBus.on([TOGGLE_MODE_EVENT, RESET_SIMULATION_EVENT], () => {
		this._filter = DEFAULT_SCOPE_FILTER;
	});
	eventBus.on(SCOPE_DESTROYED_EVENT, (event) => {
		const { scope } = event;
		if (this._scope === scope && scope.parent) this.toggle(scope.parent);
	});
	eventBus.on(SCOPE_CREATE_EVENT, (event) => {
		const { scope } = event;
		if (!scope.parent && this._scope && !isAncestor$1(this._scope, scope)) this.toggle(null);
	});
}
ScopeFilter.prototype.toggle = function(scope) {
	const setFilter = this._scope !== scope;
	this._scope = setFilter ? scope : null;
	this._filter = this._scope ? (s) => isAncestor$1(this._scope, s) : (s) => true;
	this._eventBus.fire(SCOPE_FILTER_CHANGED_EVENT, {
		filter: this._filter,
		scope: this._scope
	});
};
ScopeFilter.prototype.isShown = function(scope) {
	if (typeof scope === "string") scope = this._simulator.findScope((s) => s.id === scope);
	return scope && this._filter(scope);
};
ScopeFilter.prototype.isFocused = function(scope) {
	const id = scope.id || scope;
	return this._scope?.id === id;
};
ScopeFilter.prototype.findScope = function(options) {
	return this._simulator.findScopes(options).filter((s) => this.isShown(s))[0];
};
ScopeFilter.$inject = ["eventBus", "simulator"];
function isAncestor$1(parent, scope) {
	do
		if (parent === scope) return true;
	while (scope = scope.parent);
	return false;
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/scope-filter/index.js
var scope_filter_default = { scopeFilter: ["type", ScopeFilter] };
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/simulation-styles/SimulationStyles.js
var CONTAINER_CLASS = "bts-container";
function SimulationStyles(canvas) {
	this._canvas = canvas;
	this._cache = {};
	classes(canvas.getContainer()).add(CONTAINER_CLASS);
}
SimulationStyles.$inject = ["canvas"];
SimulationStyles.prototype.get = function(prop) {
	const cachedValue = this._cache[prop];
	if (cachedValue) return cachedValue;
	if (!this._computedStyle) this._computedStyle = this._getComputedStyle();
	return this._cache[prop] = this._computedStyle.getPropertyValue(prop).trim();
};
SimulationStyles.prototype._getComputedStyle = function() {
	return (typeof getComputedStyle === "function" ? getComputedStyle : getComputedStyleMock)(this._canvas.getContainer());
};
function getComputedStyleMock() {
	return { getPropertyValue() {
		return "";
	} };
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/simulation-styles/index.js
var simulation_styles_default = {
	__init__: ["simulationStyles"],
	simulationStyles: ["type", SimulationStyles]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/animation/Animation.js
var DEFAULT_PRIMARY_COLOR$1 = "--token-simulation-primary";
var DEFAULT_AUXILIARY_COLOR$1 = "--token-simulation-control-surface";
function noop() {}
function getSegmentEasing(index, waypoints) {
	if (waypoints.length === 2) return EASE_IN_OUT;
	if (index === 1) return EASE_IN;
	if (index === waypoints.length - 1) return EASE_OUT;
	return EASE_LINEAR;
}
var EASE_LINEAR = function(pos) {
	return pos;
};
var EASE_IN = function(pos) {
	return -Math.cos(pos * Math.PI / 2) + 1;
};
var EASE_OUT = function(pos) {
	return Math.sin(pos * Math.PI / 2);
};
var EASE_IN_OUT = function(pos) {
	return -Math.cos(pos * Math.PI) / 2 + .5;
};
var TOKEN_SIZE = 20;
function Animation(config, canvas, eventBus, scopeFilter, simulationStyles) {
	this._eventBus = eventBus;
	this._scopeFilter = scopeFilter;
	this._canvas = canvas;
	this._simulationStyles = simulationStyles;
	this._randomize = config && config.randomize !== false;
	this._animations = new Set();
	this._speed = 1;
	eventBus.on(["diagram.destroy", RESET_SIMULATION_EVENT], () => {
		this.clearAnimations();
	});
	eventBus.on(PAUSE_SIMULATION_EVENT, () => {
		this.pause();
	});
	eventBus.on(PLAY_SIMULATION_EVENT, () => {
		this.play();
	});
	eventBus.on(SCOPE_FILTER_CHANGED_EVENT, (event) => {
		this.each((animation) => {
			if (this._scopeFilter.isShown(animation.scope)) animation.show();
			else animation.hide();
		});
	});
	eventBus.on(SCOPE_DESTROYED_EVENT, (event) => {
		const { scope } = event;
		this.clearAnimations(scope);
	});
}
Animation.prototype.animate = function(connection, scope, done) {
	this.createAnimation(connection, scope, done);
};
Animation.prototype.pause = function() {
	this.each((animation) => animation.pause());
};
Animation.prototype.play = function() {
	this.each((animation) => animation.play());
};
Animation.prototype.each = function(fn) {
	this._animations.forEach(fn);
};
Animation.prototype.createAnimation = function(connection, scope, done = noop) {
	const group = this._getGroup(scope);
	if (!group) return;
	const animation = new TokenAnimation(this._createTokenGfx(group, scope), connection.waypoints, this._randomize, () => {
		this._clearAnimation(animation);
		done();
	});
	animation.setSpeed(this.getAnimationSpeed());
	if (!this._scopeFilter.isShown(scope)) animation.hide();
	animation.scope = scope;
	animation.element = connection;
	this._animations.add(animation);
	this._eventBus.fire(ANIMATION_CREATED_EVENT, { animation });
	animation.play();
	return animation;
};
Animation.prototype.setAnimationSpeed = function(speed) {
	this._speed = speed;
	this.each((animation) => animation.setSpeed(speed));
	this._eventBus.fire(ANIMATION_SPEED_CHANGED_EVENT, { speed });
};
Animation.prototype.getAnimationSpeed = function() {
	return this._speed;
};
Animation.prototype.clearAnimations = function(scope) {
	this.each((animation) => {
		if (!scope || animation.scope === scope) this._clearAnimation(animation);
	});
};
Animation.prototype._clearAnimation = function(animation) {
	animation.remove();
	this._animations.delete(animation);
};
Animation.prototype._createTokenGfx = function(group, scope) {
	const parent = create(this._getTokenSVG(scope).trim());
	return appendTo(parent, group);
};
Animation.prototype._getTokenSVG = function(scope) {
	const colors = scope.colors || {
		primary: this._simulationStyles.get(DEFAULT_PRIMARY_COLOR$1),
		auxiliary: this._simulationStyles.get(DEFAULT_AUXILIARY_COLOR$1)
	};
	return `
    <g class="bts-token">
      <circle
        class="bts-circle"
        r="${TOKEN_SIZE / 2}"
        cx="${TOKEN_SIZE / 2}"
        cy="${TOKEN_SIZE / 2}"
        fill="${colors.primary}"
      />
      <text
        class="bts-text"
        transform="translate(10, 14)"
        text-anchor="middle"
        fill="${colors.auxiliary}"
      >1</text>
    </g>
  `;
};
Animation.prototype._getGroup = function(scope) {
	var canvas = this._canvas;
	var layer, root;
	if ("findRoot" in canvas) {
		root = canvas.findRoot(scope.element);
		layer = canvas._findPlaneForRoot(root).layer;
	} else layer = query(".viewport", canvas._svg);
	var group = query(".bts-animation-tokens", layer);
	if (!group) {
		group = create("<g class=\"bts-animation-tokens\" />");
		appendTo(group, layer);
	}
	return group;
};
Animation.$inject = [
	"config.animation",
	"canvas",
	"eventBus",
	"scopeFilter",
	"simulationStyles"
];
function TokenAnimation(gfx, waypoints, randomize, done) {
	this.gfx = gfx;
	this.waypoints = waypoints;
	this.done = done;
	this.randomize = randomize;
	this._paused = true;
	this._t = 0;
	this._parts = [];
	this.create();
}
TokenAnimation.prototype.pause = function() {
	this._paused = true;
};
TokenAnimation.prototype.play = function() {
	if (this._paused) {
		this._paused = false;
		this.tick(0);
	}
	this.schedule();
};
TokenAnimation.prototype.schedule = function() {
	if (this._paused) return;
	if (this._scheduled) return;
	const last = Date.now();
	this._scheduled = true;
	requestAnimationFrame(() => {
		this._scheduled = false;
		if (this._paused) return;
		this.tick((Date.now() - last) * this._speed);
		this.schedule();
	});
};
TokenAnimation.prototype.tick = function(tElapsed) {
	const t = this._t = this._t + tElapsed;
	const part = this._parts.find((p) => p.startTime <= t && p.endTime > t);
	if (!part) return this.completed();
	const segmentTime = t - part.startTime;
	const segmentLength = part.length * part.easing(segmentTime / part.duration);
	const currentLength = part.startLength + segmentLength;
	const point = this._path.getPointAtLength(currentLength);
	this.move(point.x, point.y);
};
TokenAnimation.prototype.move = function(x, y) {
	attr(this.gfx, "transform", `translate(${x}, ${y})`);
};
TokenAnimation.prototype.create = function() {
	const waypoints = this.waypoints;
	const parts = waypoints.reduce((parts, point, index) => {
		const lastPoint = waypoints[index - 1];
		if (lastPoint) {
			const lastPart = parts[parts.length - 1];
			const startLength = lastPart && lastPart.endLength || 0;
			const length = distance(lastPoint, point);
			parts.push({
				startLength,
				endLength: startLength + length,
				length,
				easing: getSegmentEasing(index, waypoints)
			});
		}
		return parts;
	}, []);
	const totalLength = parts.reduce(function(length, part) {
		return length + part.length;
	}, 0);
	const d = waypoints.reduce((d, waypoint, index) => {
		const x = waypoint.x - TOKEN_SIZE / 2, y = waypoint.y - TOKEN_SIZE / 2;
		d.push([
			index > 0 ? "L" : "M",
			x,
			y
		]);
		return d;
	}, []).flat().join(" ");
	const totalDuration = getAnimationDuration(totalLength, this._randomize);
	this._parts = parts.reduce((parts, part, index) => {
		const duration = totalDuration / totalLength * part.length;
		const startTime = index > 0 ? parts[index - 1].endTime : 0;
		const endTime = startTime + duration;
		return [...parts, {
			...part,
			startTime,
			endTime,
			duration
		}];
	}, []);
	this._path = create(`<path d="${d}" />`);
	this._t = 0;
};
TokenAnimation.prototype.show = function() {
	attr(this.gfx, "display", "");
};
TokenAnimation.prototype.hide = function() {
	attr(this.gfx, "display", "none");
};
TokenAnimation.prototype.completed = function() {
	this.done();
};
TokenAnimation.prototype.remove = function() {
	this.pause();
	remove$1(this.gfx);
};
TokenAnimation.prototype.setSpeed = function(speed) {
	this._speed = speed;
};
function getAnimationDuration(length, randomize = false) {
	return Math.log(length) * (randomize ? randomBetween(250, 300) : 250);
}
function randomBetween(min, max) {
	return min + Math.floor(Math.random() * (max - min));
}
function distance(a, b) {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/animation/index.js
var animation_default = {
	__depends__: [
		simulator_default,
		behaviors_default,
		scope_filter_default,
		simulation_styles_default
	],
	animation: ["type", Animation]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/colored-scopes/ColoredScopes.js
var import_randomColor = __toESM(__commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof exports === "object") {
			var randomColor = factory();
			if (typeof module === "object" && module && module.exports) exports = module.exports = randomColor;
			exports.randomColor = randomColor;
		} else if (typeof define === "function" && define.amd) define([], factory);
		else root.randomColor = factory();
	})(exports, function() {
		var seed = null;
		var colorDictionary = {};
		loadColorBounds();
		var colorRanges = [];
		var randomColor = function(options) {
			options = options || {};
			if (options.seed !== void 0 && options.seed !== null && options.seed === parseInt(options.seed, 10)) seed = options.seed;
			else if (typeof options.seed === "string") seed = stringToInteger(options.seed);
			else if (options.seed !== void 0 && options.seed !== null) throw new TypeError("The seed value must be an integer or string");
			else seed = null;
			var H, S, B;
			if (options.count !== null && options.count !== void 0) {
				var totalColors = options.count, colors = [];
				for (var i = 0; i < options.count; i++) colorRanges.push(false);
				options.count = null;
				while (totalColors > colors.length) {
					var color = randomColor(options);
					if (seed !== null) options.seed = seed;
					colors.push(color);
				}
				options.count = totalColors;
				return colors;
			}
			H = pickHue(options);
			S = pickSaturation(H, options);
			B = pickBrightness(H, S, options);
			return setFormat([
				H,
				S,
				B
			], options);
		};
		function pickHue(options) {
			if (colorRanges.length > 0) {
				var hueRange = getRealHueRange(options.hue);
				var hue = randomWithin(hueRange);
				var step = (hueRange[1] - hueRange[0]) / colorRanges.length;
				var j = parseInt((hue - hueRange[0]) / step);
				if (colorRanges[j] === true) j = (j + 2) % colorRanges.length;
				else colorRanges[j] = true;
				hueRange = [(hueRange[0] + j * step) % 359, (hueRange[0] + (j + 1) * step) % 359];
				hue = randomWithin(hueRange);
				if (hue < 0) hue = 360 + hue;
				return hue;
			} else {
				var hueRange = getHueRange(options.hue);
				hue = randomWithin(hueRange);
				if (hue < 0) hue = 360 + hue;
				return hue;
			}
		}
		function pickSaturation(hue, options) {
			if (options.hue === "monochrome") return 0;
			if (options.luminosity === "random") return randomWithin([0, 100]);
			var saturationRange = getSaturationRange(hue);
			var sMin = saturationRange[0], sMax = saturationRange[1];
			switch (options.luminosity) {
				case "bright":
					sMin = 55;
					break;
				case "dark":
					sMin = sMax - 10;
					break;
				case "light": sMax = 55;
			}
			return randomWithin([sMin, sMax]);
		}
		function pickBrightness(H, S, options) {
			var bMin = getMinimumBrightness(H, S), bMax = 100;
			switch (options.luminosity) {
				case "dark":
					bMax = bMin + 20;
					break;
				case "light":
					bMin = (bMax + bMin) / 2;
					break;
				case "random":
					bMin = 0;
					bMax = 100;
			}
			return randomWithin([bMin, bMax]);
		}
		function setFormat(hsv, options) {
			switch (options.format) {
				case "hsvArray": return hsv;
				case "hslArray": return HSVtoHSL(hsv);
				case "hsl":
					var hsl = HSVtoHSL(hsv);
					return "hsl(" + hsl[0] + ", " + hsl[1] + "%, " + hsl[2] + "%)";
				case "hsla":
					var hslColor = HSVtoHSL(hsv);
					var alpha = options.alpha || Math.random();
					return "hsla(" + hslColor[0] + ", " + hslColor[1] + "%, " + hslColor[2] + "%, " + alpha + ")";
				case "rgbArray": return HSVtoRGB(hsv);
				case "rgb": return "rgb(" + HSVtoRGB(hsv).join(", ") + ")";
				case "rgba":
					var rgbColor = HSVtoRGB(hsv);
					var alpha = options.alpha || Math.random();
					return "rgba(" + rgbColor.join(", ") + ", " + alpha + ")";
				default: return HSVtoHex(hsv);
			}
		}
		function getMinimumBrightness(H, S) {
			var lowerBounds = getColorInfo(H).lowerBounds;
			for (var i = 0; i < lowerBounds.length - 1; i++) {
				var s1 = lowerBounds[i][0], v1 = lowerBounds[i][1];
				var s2 = lowerBounds[i + 1][0], v2 = lowerBounds[i + 1][1];
				if (S >= s1 && S <= s2) {
					var m = (v2 - v1) / (s2 - s1), b = v1 - m * s1;
					return m * S + b;
				}
			}
			return 0;
		}
		function getHueRange(colorInput) {
			if (typeof parseInt(colorInput) === "number") {
				var number = parseInt(colorInput);
				if (number < 360 && number > 0) return [number, number];
			}
			if (typeof colorInput === "string") {
				if (colorDictionary[colorInput]) {
					var color = colorDictionary[colorInput];
					if (color.hueRange) return color.hueRange;
				} else if (colorInput.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {
					var hue = HexToHSB(colorInput)[0];
					return [hue, hue];
				}
			}
			return [0, 360];
		}
		function getSaturationRange(hue) {
			return getColorInfo(hue).saturationRange;
		}
		function getColorInfo(hue) {
			if (hue >= 334 && hue <= 360) hue -= 360;
			for (var colorName in colorDictionary) {
				var color = colorDictionary[colorName];
				if (color.hueRange && hue >= color.hueRange[0] && hue <= color.hueRange[1]) return colorDictionary[colorName];
			}
			return "Color not found";
		}
		function randomWithin(range) {
			if (seed === null) {
				var golden_ratio = .618033988749895;
				var r = Math.random();
				r += golden_ratio;
				r %= 1;
				return Math.floor(range[0] + r * (range[1] + 1 - range[0]));
			} else {
				var max = range[1] || 1;
				var min = range[0] || 0;
				seed = (seed * 9301 + 49297) % 233280;
				var rnd = seed / 233280;
				return Math.floor(min + rnd * (max - min));
			}
		}
		function HSVtoHex(hsv) {
			var rgb = HSVtoRGB(hsv);
			function componentToHex(c) {
				var hex = c.toString(16);
				return hex.length == 1 ? "0" + hex : hex;
			}
			return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
		}
		function defineColor(name, hueRange, lowerBounds) {
			var sMin = lowerBounds[0][0], sMax = lowerBounds[lowerBounds.length - 1][0], bMin = lowerBounds[lowerBounds.length - 1][1], bMax = lowerBounds[0][1];
			colorDictionary[name] = {
				hueRange,
				lowerBounds,
				saturationRange: [sMin, sMax],
				brightnessRange: [bMin, bMax]
			};
		}
		function loadColorBounds() {
			defineColor("monochrome", null, [[0, 0], [100, 0]]);
			defineColor("red", [-26, 18], [
				[20, 100],
				[30, 92],
				[40, 89],
				[50, 85],
				[60, 78],
				[70, 70],
				[80, 60],
				[90, 55],
				[100, 50]
			]);
			defineColor("orange", [18, 46], [
				[20, 100],
				[30, 93],
				[40, 88],
				[50, 86],
				[60, 85],
				[70, 70],
				[100, 70]
			]);
			defineColor("yellow", [46, 62], [
				[25, 100],
				[40, 94],
				[50, 89],
				[60, 86],
				[70, 84],
				[80, 82],
				[90, 80],
				[100, 75]
			]);
			defineColor("green", [62, 178], [
				[30, 100],
				[40, 90],
				[50, 85],
				[60, 81],
				[70, 74],
				[80, 64],
				[90, 50],
				[100, 40]
			]);
			defineColor("blue", [178, 257], [
				[20, 100],
				[30, 86],
				[40, 80],
				[50, 74],
				[60, 60],
				[70, 52],
				[80, 44],
				[90, 39],
				[100, 35]
			]);
			defineColor("purple", [257, 282], [
				[20, 100],
				[30, 87],
				[40, 79],
				[50, 70],
				[60, 65],
				[70, 59],
				[80, 52],
				[90, 45],
				[100, 42]
			]);
			defineColor("pink", [282, 334], [
				[20, 100],
				[30, 90],
				[40, 86],
				[60, 84],
				[80, 80],
				[90, 75],
				[100, 73]
			]);
		}
		function HSVtoRGB(hsv) {
			var h = hsv[0];
			if (h === 0) h = 1;
			if (h === 360) h = 359;
			h = h / 360;
			var s = hsv[1] / 100, v = hsv[2] / 100;
			var h_i = Math.floor(h * 6), f = h * 6 - h_i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), r = 256, g = 256, b = 256;
			switch (h_i) {
				case 0:
					r = v;
					g = t;
					b = p;
					break;
				case 1:
					r = q;
					g = v;
					b = p;
					break;
				case 2:
					r = p;
					g = v;
					b = t;
					break;
				case 3:
					r = p;
					g = q;
					b = v;
					break;
				case 4:
					r = t;
					g = p;
					b = v;
					break;
				case 5:
					r = v;
					g = p;
					b = q;
			}
			return [
				Math.floor(r * 255),
				Math.floor(g * 255),
				Math.floor(b * 255)
			];
		}
		function HexToHSB(hex) {
			hex = hex.replace(/^#/, "");
			hex = hex.length === 3 ? hex.replace(/(.)/g, "$1$1") : hex;
			var red = parseInt(hex.substr(0, 2), 16) / 255, green = parseInt(hex.substr(2, 2), 16) / 255, blue = parseInt(hex.substr(4, 2), 16) / 255;
			var cMax = Math.max(red, green, blue), delta = cMax - Math.min(red, green, blue), saturation = cMax ? delta / cMax : 0;
			switch (cMax) {
				case red: return [
					60 * ((green - blue) / delta % 6) || 0,
					saturation,
					cMax
				];
				case green: return [
					60 * ((blue - red) / delta + 2) || 0,
					saturation,
					cMax
				];
				case blue: return [
					60 * ((red - green) / delta + 4) || 0,
					saturation,
					cMax
				];
			}
		}
		function HSVtoHSL(hsv) {
			var h = hsv[0], s = hsv[1] / 100, v = hsv[2] / 100, k = (2 - s) * v;
			return [
				h,
				Math.round(s * v / (k < 1 ? k : 2 - k) * 1e4) / 100,
				k / 2 * 100
			];
		}
		function stringToInteger(string) {
			var total = 0;
			for (var i = 0; i !== string.length; i++) {
				if (total >= Number.MAX_SAFE_INTEGER) break;
				total += string.charCodeAt(i);
			}
			return total;
		}
		function getRealHueRange(colorHue) {
			if (!isNaN(colorHue)) {
				var number = parseInt(colorHue);
				if (number < 360 && number > 0) return getColorInfo(colorHue).hueRange;
			} else if (typeof colorHue === "string") {
				if (colorDictionary[colorHue]) {
					var color = colorDictionary[colorHue];
					if (color.hueRange) return color.hueRange;
				} else if (colorHue.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {
					var hue = HexToHSB(colorHue)[0];
					return getColorInfo(hue).hueRange;
				}
			}
			return [0, 360];
		}
		return randomColor;
	});
}))());
var HIGH_PRIORITY$2 = 1500;
function ColoredScopes(eventBus) {
	const colors = (0, import_randomColor.default)({ count: 60 }).filter((c) => getContrastYIQ(c.substring(1)) < 200);
	function getContrastYIQ(hexcolor) {
		var r = parseInt(hexcolor.substr(0, 2), 16);
		var g = parseInt(hexcolor.substr(2, 2), 16);
		var b = parseInt(hexcolor.substr(4, 2), 16);
		return (r * 299 + g * 587 + b * 114) / 1e3;
	}
	let colorsIdx = 0;
	function getColors(scope) {
		const { element } = scope;
		if (element && element.type === "bpmn:MessageFlow") return {
			primary: "#999",
			auxiliary: "#FFF"
		};
		if (scope.parent) return scope.parent.colors;
		const primary = colors[colorsIdx++ % colors.length];
		return {
			primary,
			auxiliary: getContrastYIQ(primary) >= 128 ? "#111" : "#fff"
		};
	}
	eventBus.on(SCOPE_CREATE_EVENT, HIGH_PRIORITY$2, (event) => {
		const { scope } = event;
		scope.colors = getColors(scope);
	});
}
ColoredScopes.$inject = ["eventBus"];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/colored-scopes/index.js
var colored_scopes_default = {
	__init__: ["coloredScopes"],
	coloredScopes: ["type", ColoredScopes]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/icons/index.js
var LogSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z\"/></svg>";
var AngleRightSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z\"/></svg>";
var CheckCircleSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z\"/></svg>";
var ForkSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z\"/></svg>";
var ExclamationTriangleSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z\"/></svg>";
var InfoSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 192 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z\"/></svg>";
var PauseSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z\"/></svg>";
var RemovePauseSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 580.5 448\">\n  <path fill=\"currentColor\" d=\"M112 0C85 0 64 22 64 48v196l192-89V48c0-26-22-48-48-48zm256 0c-27 0-48 22-48 48v77l190-89c-5-21-24-36-46-36Zm144 105-192 89v70l192-89zM256 224 64 314v70l192-90zm256 21-192 89v66c0 27 21 48 48 48h96c26 0 48-21 48-48zM256 364 89 442c7 4 14 6 23 6h96c26 0 48-21 48-48z\"/>\n  <rect fill=\"currentColor\" width=\"63.3\" height=\"618.2\" x=\"311.5\" y=\"-469.4\" transform=\"rotate(65)\" rx=\"10\"/>\n</svg>\n";
var PlaySVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!-- Adapted from Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z\"/></svg>";
var ResetSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z\"/></svg>";
var TachometerSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M288 32C128.94 32 0 160.94 0 320c0 52.8 14.25 102.26 39.06 144.8 5.61 9.62 16.3 15.2 27.44 15.2h443c11.14 0 21.83-5.58 27.44-15.2C561.75 422.26 576 372.8 576 320c0-159.06-128.94-288-288-288zm0 64c14.71 0 26.58 10.13 30.32 23.65-1.11 2.26-2.64 4.23-3.45 6.67l-9.22 27.67c-5.13 3.49-10.97 6.01-17.64 6.01-17.67 0-32-14.33-32-32S270.33 96 288 96zM96 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm48-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm246.77-72.41l-61.33 184C343.13 347.33 352 364.54 352 384c0 11.72-3.38 22.55-8.88 32H232.88c-5.5-9.45-8.88-20.28-8.88-32 0-33.94 26.5-61.43 59.9-63.59l61.34-184.01c4.17-12.56 17.73-19.45 30.36-15.17 12.57 4.19 19.35 17.79 15.17 30.36zm14.66 57.2l15.52-46.55c3.47-1.29 7.13-2.23 11.05-2.23 17.67 0 32 14.33 32 32s-14.33 32-32 32c-11.38-.01-20.89-6.28-26.57-15.22zM480 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z\"/></svg>";
var TimesCircleSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z\"/></svg>";
var TimesSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 352 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z\"/></svg>";
var ToggleOffSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M384 64H192C85.961 64 0 149.961 0 256s85.961 192 192 192h192c106.039 0 192-85.961 192-192S490.039 64 384 64zM64 256c0-70.741 57.249-128 128-128 70.741 0 128 57.249 128 128 0 70.741-57.249 128-128 128-70.741 0-128-57.249-128-128zm320 128h-48.905c65.217-72.858 65.236-183.12 0-256H384c70.741 0 128 57.249 128 128 0 70.74-57.249 128-128 128z\"/></svg>";
var ToggleOnSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path fill=\"currentColor\" d=\"M384 64H192C86 64 0 150 0 256s86 192 192 192h192c106 0 192-86 192-192S490 64 384 64zm0 320c-70.8 0-128-57.3-128-128 0-70.8 57.3-128 128-128 70.8 0 128 57.3 128 128 0 70.8-57.3 128-128 128z\"/></svg>";
function createIcon(svg) {
	return function Icon(className = "") {
		return `<span class="bts-icon ${className}">${svg}</span>`;
	};
}
var LogIcon = createIcon(LogSVG);
var AngleRightIcon = createIcon(AngleRightSVG);
var CheckCircleIcon = createIcon(CheckCircleSVG);
var RemovePauseIcon = createIcon(RemovePauseSVG);
var ForkIcon = createIcon(ForkSVG);
var ExclamationTriangleIcon = createIcon(ExclamationTriangleSVG);
var InfoIcon = createIcon(InfoSVG);
var PauseIcon = createIcon(PauseSVG);
var PlayIcon = createIcon(PlaySVG);
var ResetIcon = createIcon(ResetSVG);
var TachometerIcon = createIcon(TachometerSVG);
var TimesCircleIcon = createIcon(TimesCircleSVG);
var TimesIcon = createIcon(TimesSVG);
var ToggleOffIcon = createIcon(ToggleOffSVG);
var ToggleOnIcon = createIcon(ToggleOnSVG);
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/context-pads/handler/ExclusiveGatewayHandler.js
init_ModelUtil();
function ExclusiveGatewayHandler(exclusiveGatewaySettings) {
	this._exclusiveGatewaySettings = exclusiveGatewaySettings;
}
ExclusiveGatewayHandler.prototype.createContextPads = function(element) {
	if (element.outgoing.filter(function(outgoing) {
		return is$1(outgoing, "bpmn:SequenceFlow");
	}).length < 2) return;
	const html = `
    <button class="bts-context-pad" title="Set Sequence Flow">
      ${ForkIcon()}
    </button>
  `;
	const action = () => {
		this._exclusiveGatewaySettings.setSequenceFlow(element);
	};
	return [{
		action,
		element,
		html
	}];
};
ExclusiveGatewayHandler.$inject = ["exclusiveGatewaySettings"];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/context-pads/handler/InclusiveGatewayHandler.js
init_ModelUtil();
function InclusiveGatewayHandler(inclusiveGatewaySettings) {
	this._inclusiveGatewaySettings = inclusiveGatewaySettings;
}
InclusiveGatewayHandler.prototype.createContextPads = function(element) {
	const outgoingFlows = element.outgoing.filter(isSequenceFlow$1);
	if (outgoingFlows.length < 2) return;
	const nonDefaultFlows = outgoingFlows.filter((outgoing) => {
		const flowBo = getBusinessObject(outgoing);
		return getBusinessObject(element).default !== flowBo;
	});
	const html = `
    <button class="bts-context-pad" title="Set Sequence Flow">
      ${ForkIcon()}
    </button>
  `;
	return nonDefaultFlows.map((sequenceFlow) => {
		const action = () => {
			this._inclusiveGatewaySettings.toggleSequenceFlow(element, sequenceFlow);
		};
		return {
			action,
			element: sequenceFlow,
			html
		};
	});
};
InclusiveGatewayHandler.$inject = ["inclusiveGatewaySettings"];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/context-pads/handler/PauseHandler.js
init_ModelUtil();
function PauseHandler(simulator) {
	this._simulator = simulator;
}
PauseHandler.prototype.createContextPads = function(element) {
	if (is$1(element, "bpmn:ReceiveTask") || is$1(element, "bpmn:SubProcess") && getBusinessObject(element).triggeredByEvent) return [];
	return [this.createPauseContextPad(element)];
};
PauseHandler.prototype.createPauseContextPad = function(element) {
	const contexts = () => this._findSubscriptions({ element });
	const wait = this._isPaused(element);
	const html = `
    <button class="bts-context-pad ${wait ? "" : "show-hover"}" title="${wait ? "Remove" : "Add"} pause point">
      ${(wait ? RemovePauseIcon : PauseIcon)("show-hover")}
      ${PauseIcon("hide-hover")}
    </button>
  `;
	const action = () => {
		this._togglePaused(element);
	};
	return {
		action,
		element,
		hideContexts: contexts,
		html
	};
};
PauseHandler.prototype._isPaused = function(element) {
	const { wait } = this._simulator.getConfig(element);
	return wait;
};
PauseHandler.prototype._togglePaused = function(element) {
	const wait = !this._isPaused(element);
	this._simulator.waitAtElement(element, wait);
};
PauseHandler.prototype._findSubscriptions = function(options) {
	return this._simulator.findSubscriptions(options);
};
PauseHandler.$inject = ["simulator"];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/context-pads/handler/TriggerHandler.js
function TriggerHandler(simulator) {
	this._simulator = simulator;
}
TriggerHandler.$inject = ["simulator"];
TriggerHandler.prototype.createContextPads = function(element) {
	return [this.createTriggerContextPad(element)];
};
TriggerHandler.prototype.createTriggerContextPad = function(element) {
	const contexts = () => {
		return this._findSubscriptions({ element }).slice().sort((a, b) => {
			return a.event.type === "none" ? 1 : -1;
		});
	};
	const html = `
    <button class="bts-context-pad" title="Trigger Event">
      ${PlayIcon()}
    </button>
  `;
	const action = (subscriptions) => {
		const { event, scope } = subscriptions[0];
		return this._simulator.trigger({
			event,
			scope
		});
	};
	return {
		action,
		element,
		html,
		contexts
	};
};
TriggerHandler.prototype._findSubscriptions = function(options) {
	return this._simulator.findSubscriptions(options);
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/context-pads/ContextPads.js
init_ModelUtil();
var LOW_PRIORITY$1 = 500;
var OFFSET_TOP$1 = -15;
var OFFSET_LEFT$1 = -15;
function ContextPads(eventBus, elementRegistry, overlays, injector, canvas, scopeFilter) {
	this._elementRegistry = elementRegistry;
	this._overlays = overlays;
	this._injector = injector;
	this._canvas = canvas;
	this._scopeFilter = scopeFilter;
	this._active = false;
	this._overlayCache = new Map();
	this._handlerIdx = 0;
	this._handlers = [];
	this.registerHandler("bpmn:ExclusiveGateway", ExclusiveGatewayHandler);
	this.registerHandler("bpmn:InclusiveGateway", InclusiveGatewayHandler);
	this.registerHandler("bpmn:Activity", PauseHandler);
	this.registerHandler("bpmn:Event", TriggerHandler);
	this.registerHandler("bpmn:Gateway", TriggerHandler);
	this.registerHandler("bpmn:Activity", TriggerHandler);
	eventBus.on(TOGGLE_MODE_EVENT, LOW_PRIORITY$1, (context) => {
		this._active = context.active;
		if (this._active) this.openContextPads();
		else this.closeContextPads();
	});
	eventBus.on(RESET_SIMULATION_EVENT, LOW_PRIORITY$1, () => {
		this.closeContextPads();
		this.openContextPads();
	});
	eventBus.on("root.set", LOW_PRIORITY$1, () => {
		if (this._active) this.openContextPads();
		else this.closeContextPads();
	});
	eventBus.on(SCOPE_FILTER_CHANGED_EVENT, (event) => {
		const showElements = all(".djs-overlay-bts-context-menu [data-scope-ids]", overlays._overlayRoot);
		for (const element of showElements) {
			const shown = element.dataset.scopeIds.split(",").some((id) => scopeFilter.isShown(id));
			classes(element).toggle("hidden", !shown);
		}
		const hideElements = all(".djs-overlay-bts-context-menu [data-hide-scope-ids]", overlays._overlayRoot);
		for (const element of hideElements) {
			const shown = element.dataset.hideScopeIds.split(",").some((id) => scopeFilter.isShown(id));
			classes(element).toggle("hidden", shown);
		}
	});
	eventBus.on(ELEMENT_CHANGED_EVENT, LOW_PRIORITY$1, (event) => {
		const { element } = event;
		this.updateElementContextPads(element);
	});
}
ContextPads.prototype.registerHandler = function(type, handlerCls) {
	const handler = this._injector.instantiate(handlerCls);
	handler.hash = String(this._handlerIdx++);
	this._handlers.push({
		handler,
		type
	});
};
ContextPads.prototype.getHandlers = function(element) {
	return this._handlers.filter(({ type }) => is$1(element, type)).map(({ handler }) => handler);
};
ContextPads.prototype.openContextPads = function(parent) {
	if (!parent) parent = this._canvas.getRootElement();
	this._elementRegistry.forEach((element) => {
		if (isAncestor(parent, element) && !isPlane(element)) this.updateElementContextPads(element);
	});
};
ContextPads.prototype._getOverlays = function(hash) {
	return this._overlayCache.get(hash) || [];
};
ContextPads.prototype._addOverlay = function(element, options) {
	const { handlerHash } = options;
	if (!handlerHash) throw new Error("<handlerHash> required");
	const overlayId = this._overlays.add(element, "bts-context-menu", {
		...options,
		position: {
			top: OFFSET_TOP$1,
			left: OFFSET_LEFT$1
		},
		show: { minZoom: .5 }
	});
	const overlay = this._overlays.get(overlayId);
	const overlayCache = this._overlayCache;
	if (!overlayCache.has(handlerHash)) overlayCache.set(handlerHash, []);
	overlayCache.get(handlerHash).push(overlay);
};
ContextPads.prototype._removeOverlay = function(overlay) {
	const { id, handlerHash } = overlay;
	this._overlays.remove(id);
	const overlays = this._overlayCache.get(handlerHash) || [];
	const idx = overlays.indexOf(overlay);
	if (idx !== -1) overlays.splice(idx, 1);
};
ContextPads.prototype.updateElementContextPads = function(element) {
	for (const handler of this.getHandlers(element)) this._updateElementContextPads(element, handler);
};
ContextPads.prototype._updateElementContextPads = function(element, handler) {
	const canvas = this._canvas;
	const contextPads = (handler.createContextPads(element) || []).filter((p) => p);
	const handlerHash = `${element.id}------${handler.hash}`;
	const existingOverlays = this._getOverlays(handlerHash);
	const updatedOverlays = [];
	for (const contextPad of contextPads) {
		const { element, contexts: _contexts, hideContexts: _hideContexts, action: _action, html: _html } = contextPad;
		const hash = `${contextPad.element.id}-------${_html}`;
		let existingOverlay = existingOverlays.find((o) => o.hash === hash);
		const html = existingOverlay && existingOverlay.html || domify(_html);
		if (_contexts) {
			const contexts = _contexts();
			html.dataset.scopeIds = contexts.map((c) => c.scope.id).join(",");
			const shownScopes = contexts.filter((c) => this._scopeFilter.isShown(c.scope));
			classes(html).toggle("hidden", shownScopes.length === 0);
		}
		if (_hideContexts) {
			const contexts = _hideContexts();
			html.dataset.hideScopeIds = contexts.map((c) => c.scope.id).join(",");
			const shownScopes = contexts.filter((c) => this._scopeFilter.isShown(c.scope));
			classes(html).toggle("hidden", shownScopes.length > 0);
		}
		if (existingOverlay) {
			updatedOverlays.push(existingOverlay);
			continue;
		}
		if (_action) {
			const triggerAction = () => {
				const contexts = _contexts ? _contexts().filter((c) => this._scopeFilter.isShown(c.scope)) : null;
				_action(contexts);
			};
			event.bind(html, "click", (event) => {
				event.preventDefault();
				triggerAction();
				if ("focus" in canvas) canvas.focus();
			});
			event.bind(html, "keydown", (event) => {
				if (!isKeyboardTrigger(event)) return;
				event.preventDefault();
				triggerAction();
			});
		}
		this._addOverlay(element, {
			hash,
			handlerHash,
			html
		});
	}
	for (const existingOverlay of existingOverlays) if (!updatedOverlays.includes(existingOverlay)) this._removeOverlay(existingOverlay);
};
ContextPads.prototype.closeContextPads = function() {
	for (const overlays of this._overlayCache.values()) for (const overlay of overlays) this._closeOverlay(overlay);
	this._overlayCache.clear();
};
ContextPads.prototype._closeOverlay = function(overlay) {
	this._overlays.remove(overlay.id);
};
ContextPads.$inject = [
	"eventBus",
	"elementRegistry",
	"overlays",
	"injector",
	"canvas",
	"scopeFilter"
];
function isAncestor(ancestor, descendant) {
	do {
		if (ancestor === descendant) return true;
		descendant = descendant.parent;
	} while (descendant);
	return false;
}
function isKeyboardTrigger(event) {
	return [
		"Enter",
		" ",
		"Spacebar"
	].includes(event.key);
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/context-pads/index.js
var context_pads_default = {
	__depends__: [scope_filter_default],
	__init__: ["contextPads"],
	contextPads: ["type", ContextPads]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/simulation-state/SimulationState.js
function SimulationState(eventBus, simulator, elementNotifications) {
	eventBus.on(SCOPE_DESTROYED_EVENT, (event) => {
		const { scope } = event;
		const { destroyInitiator, element: scopeElement } = scope;
		if (!scope.completed || !destroyInitiator) return;
		if (!["bpmn:Process", "bpmn:Participant"].includes(scopeElement.type)) return;
		elementNotifications.addElementNotification(destroyInitiator.element, {
			type: "success",
			icon: CheckCircleIcon(),
			text: "Finished",
			scope
		});
	});
}
SimulationState.$inject = [
	"eventBus",
	"simulator",
	"elementNotifications"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/element-notifications/ElementNotifications.js
var OFFSET_TOP = -15;
var OFFSET_RIGHT = 15;
function ElementNotifications(overlays, eventBus) {
	this._overlays = overlays;
	eventBus.on([
		RESET_SIMULATION_EVENT,
		SCOPE_CREATE_EVENT,
		TOGGLE_MODE_EVENT
	], () => {
		this.clear();
	});
}
ElementNotifications.prototype.addElementNotification = function(element, options) {
	const position = {
		top: OFFSET_TOP,
		right: OFFSET_RIGHT
	};
	const { type, icon, text, scope = {} } = options;
	const colors = scope.colors;
	const colorMarkup = colors ? `style="color: ${colors.auxiliary}; background: ${colors.primary}"` : "";
	const html = domify(`
    <div class="bts-element-notification ${type || ""}" ${colorMarkup}>
      ${icon || ""}
      <span class="bts-text">${text}</span>
    </div>
  `);
	this._overlays.add(element, "bts-element-notification", {
		position,
		html,
		show: { minZoom: .5 }
	});
};
ElementNotifications.prototype.clear = function() {
	this._overlays.remove({ type: "bts-element-notification" });
};
ElementNotifications.prototype.removeElementNotification = function(element) {
	this._overlays.remove({ element });
};
ElementNotifications.$inject = ["overlays", "eventBus"];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/element-notifications/index.js
var element_notifications_default = { elementNotifications: ["type", ElementNotifications] };
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/notifications/Notifications.js
var NOTIFICATION_TIME_TO_LIVE = 2e3;
var INFO_ICON = InfoIcon();
function Notifications(eventBus, canvas, scopeFilter) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	this._scopeFilter = scopeFilter;
	this._init();
	eventBus.on([TOGGLE_MODE_EVENT, RESET_SIMULATION_EVENT], (event) => {
		this.clear();
	});
}
Notifications.prototype._init = function() {
	this.container = domify("<div class=\"bts-notifications\"></div>");
	this._canvas.getContainer().appendChild(this.container);
};
Notifications.prototype.showNotification = function(options) {
	const { text, type = "info", icon = INFO_ICON, scope, ttl = NOTIFICATION_TIME_TO_LIVE } = options;
	if (scope && !this._scopeFilter.isShown(scope)) return;
	const iconMarkup = icon.startsWith("<") ? icon : `<i class="${icon}"></i>`;
	const colors = scope && scope.colors;
	const colorMarkup = colors ? `style="color: ${colors.auxiliary}; background: ${colors.primary}"` : "";
	const notification = domify(`
    <div class="bts-notification ${type}">
      <span class="bts-icon">${iconMarkup}</span>
      <span class="bts-text" title="${text}">${text}</span>
      ${scope ? `<span class="bts-scope" ${colorMarkup}>${scope.id}</span>` : ""}
    </div>
  `);
	this.container.appendChild(notification);
	while (this.container.children.length > 5) this.container.children[0].remove();
	setTimeout(function() {
		notification.remove();
	}, ttl);
};
Notifications.prototype.clear = function() {
	while (this.container.children.length) this.container.children[0].remove();
};
Notifications.$inject = [
	"eventBus",
	"canvas",
	"scopeFilter"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/notifications/index.js
var notifications_default = {
	__depends__: [scope_filter_default],
	notifications: ["type", Notifications]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/simulation-state/index.js
var simulation_state_default = {
	__depends__: [element_notifications_default, notifications_default],
	__init__: ["simulationState"],
	simulationState: ["type", SimulationState]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/show-scopes/ShowScopes.js
init_ModelUtil();
var FILL_COLOR$1 = "--token-simulation-highlighted-scope-fill-color";
var STROKE_COLOR$1 = "--token-simulation-highlighted-scope-stroke-color";
var ID$2 = "show-scopes";
var VERY_HIGH_PRIORITY$1 = 3e3;
function ShowScopes(eventBus, canvas, scopeFilter, elementColors, simulationStyles) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	this._scopeFilter = scopeFilter;
	this._elementColors = elementColors;
	this._simulationStyles = simulationStyles;
	this._highlight = null;
	this._init();
	eventBus.on(TOGGLE_MODE_EVENT, (event) => {
		if (event.active) classes(this._container).remove("hidden");
		else {
			classes(this._container).add("hidden");
			clear(this._container);
			this.unhighlightScope();
		}
	});
	eventBus.on(SCOPE_FILTER_CHANGED_EVENT, (event) => {
		const allElements = this.getScopeElements();
		for (const element of allElements) {
			const scopeId = element.dataset.scopeId;
			classes(element).toggle("inactive", !this._scopeFilter.isShown(scopeId));
			classes(element).toggle("focussed", this._scopeFilter.isFocused(scopeId));
			element.setAttribute("aria-pressed", String(this._scopeFilter.isFocused(scopeId)));
		}
	});
	eventBus.on(SCOPE_CREATE_EVENT, (event) => {
		this.addScope(event.scope);
	});
	eventBus.on(SCOPE_DESTROYED_EVENT, (event) => {
		this.removeScope(event.scope);
	});
	eventBus.on(SCOPE_CHANGED_EVENT, (event) => {
		this.updateScope(event.scope);
	});
	eventBus.on(RESET_SIMULATION_EVENT, () => {
		this.removeAllInstances();
	});
}
ShowScopes.prototype._init = function() {
	this._container = domify("<div class=\"bts-scopes hidden\"></div>");
	this._canvas.getContainer().appendChild(this._container);
};
ShowScopes.prototype.addScope = function(scope) {
	const processElements = [
		"bpmn:Process",
		"bpmn:SubProcess",
		"bpmn:Participant"
	];
	const { element: scopeElement } = scope;
	if (!isAny$1(scopeElement, processElements)) return;
	const colors = scope.colors;
	const colorMarkup = colors ? `style="color: ${colors.auxiliary}; background: ${colors.primary}; --scope-color: ${colors.primary}"` : "";
	const html = domify(`
    <button data-scope-id="${scope.id}" class="bts-scope"
         aria-pressed="false"
         title="Focus process instance ${scope.id}" ${colorMarkup}>
      ${scope.getTokens()}
    </button>
  `);
	event.bind(html, "click", () => {
		this._scopeFilter.toggle(scope);
	});
	event.bind(html, "mouseenter", () => {
		this.highlightScope(scopeElement);
	});
	event.bind(html, "mouseleave", () => {
		this.unhighlightScope();
	});
	if (!this._scopeFilter.isShown(scope)) classes(html).add("inactive");
	classes(html).toggle("focussed", this._scopeFilter.isFocused(scope));
	html.setAttribute("aria-pressed", String(this._scopeFilter.isFocused(scope)));
	this._container.appendChild(html);
};
ShowScopes.prototype.getScopeElements = function() {
	return all("[data-scope-id]", this._container);
};
ShowScopes.prototype.getScopeElement = function(scope) {
	return query(`[data-scope-id="${scope.id}"]`, this._container);
};
ShowScopes.prototype.updateScope = function(scope) {
	const element = this.getScopeElement(scope);
	if (element) element.textContent = scope.getTokens();
};
ShowScopes.prototype.removeScope = function(scope) {
	const element = this.getScopeElement(scope);
	if (element) element.remove();
};
ShowScopes.prototype.removeAllInstances = function() {
	this._container.innerHTML = "";
};
ShowScopes.prototype.highlightScope = function(element) {
	this.unhighlightScope();
	this._highlight = element;
	this._elementColors.add(element, ID$2, this._getHighlightColors(), VERY_HIGH_PRIORITY$1);
	if (!element.parent) classes(this._canvas.getContainer()).add("highlight");
};
ShowScopes.prototype.unhighlightScope = function() {
	if (!this._highlight) return;
	const element = this._highlight;
	this._elementColors.remove(element, ID$2);
	if (!element.parent) classes(this._canvas.getContainer()).remove("highlight");
	this._highlight = null;
};
ShowScopes.prototype._getHighlightColors = function() {
	return {
		fill: this._simulationStyles.get(FILL_COLOR$1),
		stroke: this._simulationStyles.get(STROKE_COLOR$1)
	};
};
ShowScopes.$inject = [
	"eventBus",
	"canvas",
	"scopeFilter",
	"elementColors",
	"simulationStyles"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/show-scopes/index.js
var show_scopes_default = {
	__depends__: [scope_filter_default, simulation_styles_default],
	__init__: ["showScopes"],
	showScopes: ["type", ShowScopes]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/log/Log.js
init_ModelUtil();
var ICON_INFO = InfoIcon();
function getElementName(element) {
	const name = element && element.businessObject.name;
	return name && escapeHTML(name);
}
function getIconForIntermediateEvent(element, throwOrCatch) {
	const eventTypeString = getEventTypeString(element);
	if (eventTypeString === "none") return "bpmn-icon-intermediate-event-none";
	return `bpmn-icon-intermediate-event-${throwOrCatch}-${eventTypeString}`;
}
function getEventTypeString(element) {
	const bo = getBusinessObject(element);
	if (bo.get("eventDefinitions").length === 0) return "none";
	const eventDefinition = bo.eventDefinitions[0];
	if (is$1(eventDefinition, "bpmn:MessageEventDefinition")) return "message";
	if (is$1(eventDefinition, "bpmn:TimerEventDefinition")) return "timer";
	if (is$1(eventDefinition, "bpmn:SignalEventDefinition")) return "signal";
	if (is$1(eventDefinition, "bpmn:ErrorEventDefinition")) return "error";
	if (is$1(eventDefinition, "bpmn:EscalationEventDefinition")) return "escalation";
	if (is$1(eventDefinition, "bpmn:CompensateEventDefinition")) return "compensation";
	if (is$1(eventDefinition, "bpmn:ConditionalEventDefinition")) return "condition";
	if (is$1(eventDefinition, "bpmn:LinkEventDefinition")) return "link";
	if (is$1(eventDefinition, "bpmn:CancelEventDefinition")) return "cancel";
	if (is$1(eventDefinition, "bpmn:TerminateEventDefinition")) return "terminate";
	return "none";
}
function Log(eventBus, notifications, tokenSimulationPalette, canvas, scopeFilter, simulator) {
	this._notifications = notifications;
	this._tokenSimulationPalette = tokenSimulationPalette;
	this._canvas = canvas;
	this._scopeFilter = scopeFilter;
	this._init();
	eventBus.on(SCOPE_FILTER_CHANGED_EVENT, (event) => {
		const allElements = all(".bts-entry[data-scope-id]", this._container);
		for (const element of allElements) {
			const scopeId = element.dataset.scopeId;
			classes(element).toggle("inactive", !this._scopeFilter.isShown(scopeId));
		}
	});
	eventBus.on(SCOPE_DESTROYED_EVENT, (event) => {
		const { scope } = event;
		const { element: scopeElement } = scope;
		const completed = scope.completed;
		if (!isAny$1(scopeElement, [
			"bpmn:Process",
			"bpmn:Participant",
			"bpmn:SubProcess"
		])) return;
		const text = `${is$1(scopeElement, "bpmn:SubProcess") ? getElementName(scopeElement) || "SubProcess" : "Process"} ${completed ? "finished" : "canceled"}`;
		this.log({
			text,
			icon: completed ? CheckCircleIcon() : TimesCircleIcon(),
			scope
		});
	});
	eventBus.on(SCOPE_CREATE_EVENT, (event) => {
		const { scope } = event;
		const { element: scopeElement } = scope;
		if (!isAny$1(scopeElement, [
			"bpmn:Process",
			"bpmn:Participant",
			"bpmn:SubProcess"
		])) return;
		const text = `${is$1(scopeElement, "bpmn:SubProcess") ? getElementName(scopeElement) || "SubProcess" : "Process"} started`;
		this.log({
			text,
			icon: CheckCircleIcon(),
			scope
		});
	});
	eventBus.on(TRACE_EVENT, (event) => {
		const { action, scope: elementScope, element } = event;
		if (action !== "exit") return;
		const scope = elementScope.parent;
		const elementName = getElementName(element);
		if (is$1(element, "bpmn:ServiceTask")) return this.log({
			text: elementName || "Service Task",
			icon: "bpmn-icon-service",
			scope
		});
		if (is$1(element, "bpmn:UserTask")) return this.log({
			text: elementName || "User Task",
			icon: "bpmn-icon-user",
			scope
		});
		if (is$1(element, "bpmn:CallActivity")) return this.log({
			text: elementName || "Call Activity",
			icon: "bpmn-icon-call-activity",
			scope
		});
		if (is$1(element, "bpmn:ScriptTask")) return this.log({
			text: elementName || "Script Task",
			icon: "bpmn-icon-script",
			scope
		});
		if (is$1(element, "bpmn:BusinessRuleTask")) return this.log({
			text: elementName || "Business Rule Task",
			icon: "bpmn-icon-business-rule",
			scope
		});
		if (is$1(element, "bpmn:ManualTask")) return this.log({
			text: elementName || "Manual Task",
			icon: "bpmn-icon-manual-task",
			scope
		});
		if (is$1(element, "bpmn:ReceiveTask")) return this.log({
			text: elementName || "Receive Task",
			icon: "bpmn-icon-receive",
			scope
		});
		if (is$1(element, "bpmn:SendTask")) return this.log({
			text: elementName || "Send Task",
			icon: "bpmn-icon-send",
			scope
		});
		if (is$1(element, "bpmn:Task")) return this.log({
			text: elementName || "Task",
			icon: "bpmn-icon-task",
			scope
		});
		if (is$1(element, "bpmn:ExclusiveGateway")) return this.log({
			text: elementName || "Exclusive Gateway",
			icon: "bpmn-icon-gateway-xor",
			scope
		});
		if (is$1(element, "bpmn:ParallelGateway")) return this.log({
			text: elementName || "Parallel Gateway",
			icon: "bpmn-icon-gateway-parallel",
			scope
		});
		if (is$1(element, "bpmn:InclusiveGateway")) return this.log({
			text: elementName || "Inclusive Gateway",
			icon: "bpmn-icon-gateway-or",
			scope
		});
		if (is$1(element, "bpmn:StartEvent")) return this.log({
			text: elementName || "Start Event",
			icon: `bpmn-icon-start-event-${getEventTypeString(element)}`,
			scope
		});
		if (is$1(element, "bpmn:IntermediateCatchEvent")) return this.log({
			text: elementName || "Intermediate Event",
			icon: getIconForIntermediateEvent(element, "catch"),
			scope
		});
		if (is$1(element, "bpmn:IntermediateThrowEvent")) return this.log({
			text: elementName || "Intermediate Event",
			icon: getIconForIntermediateEvent(element, "throw"),
			scope
		});
		if (is$1(element, "bpmn:BoundaryEvent")) return this.log({
			text: elementName || "Boundary Event",
			icon: getIconForIntermediateEvent(element, "catch"),
			scope
		});
		if (is$1(element, "bpmn:EndEvent")) return this.log({
			text: elementName || "End Event",
			icon: `bpmn-icon-end-event-${getEventTypeString(element)}`,
			scope
		});
	});
	eventBus.on([TOGGLE_MODE_EVENT, RESET_SIMULATION_EVENT], (event) => {
		this.clear();
		this.toggle(false);
	});
}
Log.prototype._init = function() {
	this._container = domify(`
    <div class="bts-log hidden djs-scrollable">
      <div class="bts-header">
        ${LogIcon("bts-log-icon")}
        Simulation Log
        <button class="bts-close" aria-label="Close">
          ${TimesIcon()}
        </button>
      </div>
      <div class="bts-content">
        <p class="bts-entry placeholder">No Entries</p>
      </div>
    </div>
  `);
	this._placeholder = query(".bts-placeholder", this._container);
	this._content = query(".bts-content", this._container);
	event.bind(this._content, "mousedown", (event) => {
		event.stopPropagation();
	});
	this._close = query(".bts-close", this._container);
	event.bind(this._close, "click", () => {
		this.toggle(false);
	});
	this._icon = query(".bts-log-icon", this._container);
	event.bind(this._icon, "click", () => {
		this.toggle();
	});
	this._canvas.getContainer().appendChild(this._container);
	this.paletteEntry = domify(`
    <button class="bts-entry" title="Toggle Simulation Log">
      ${LogIcon()}
    </button>
  `);
	event.bind(this.paletteEntry, "click", () => {
		this.toggle();
	});
	this._tokenSimulationPalette.addEntry(this.paletteEntry, 3);
};
Log.prototype.isShown = function() {
	const container = this._container;
	return !classes(container).has("hidden");
};
Log.prototype.toggle = function(shown = !this.isShown()) {
	const container = this._container;
	if (shown) classes(container).remove("hidden");
	else classes(container).add("hidden");
};
Log.prototype.log = function(options) {
	const { text, type = "info", icon = ICON_INFO, scope } = options;
	const content = this._content;
	classes(this._placeholder).add("hidden");
	if (!this.isShown()) this._notifications.showNotification(options);
	const iconMarkup = icon.startsWith("<") ? icon : `<i class="${icon}"></i>`;
	const colors = scope && scope.colors;
	const colorMarkup = colors ? `style="background: ${colors.primary}; color: ${colors.auxiliary}"` : "";
	const logEntry = domify(`
    <p class="bts-entry ${type} ${scope && this._scopeFilter.isShown(scope) ? "" : "inactive"}" ${scope ? `data-scope-id="${scope.id}"` : ""}>
      <span class="bts-icon">${iconMarkup}</span>
      <span class="bts-text" title="${text}">${text}</span>
      ${scope ? `<span class="bts-scope" data-scope-id="${scope.id}" ${colorMarkup}>${scope.id}</span>` : ""}
    </p>
  `);
	delegate.bind(logEntry, ".bts-scope[data-scope-id]", "click", (event) => {
		this._scopeFilter.toggle(scope);
	});
	const shouldScroll = Math.abs(content.clientHeight + content.scrollTop - content.scrollHeight) < 2;
	content.appendChild(logEntry);
	if (shouldScroll) content.scrollTop = content.scrollHeight;
};
Log.prototype.clear = function() {
	while (this._content.firstChild) this._content.removeChild(this._content.firstChild);
	this._placeholder = domify("<p class=\"bts-entry placeholder\">No Entries</p>");
	this._content.appendChild(this._placeholder);
};
Log.$inject = [
	"eventBus",
	"notifications",
	"tokenSimulationPalette",
	"canvas",
	"scopeFilter",
	"simulator"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/log/index.js
var log_default = {
	__depends__: [notifications_default, scope_filter_default],
	__init__: ["log"],
	log: ["type", Log]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/element-support/ElementSupport.js
init_ModelUtil();
var UNSUPPORTED_ELEMENTS = ["bpmn:ComplexGateway"];
function isLabel$1(element) {
	return element.labelTarget;
}
function ElementSupport(eventBus, elementRegistry, canvas, notifications, elementNotifications) {
	this._eventBus = eventBus;
	this._elementRegistry = elementRegistry;
	this._elementNotifications = elementNotifications;
	this._notifications = notifications;
	this._canvasParent = canvas.getContainer().parentNode;
	eventBus.on(TOGGLE_MODE_EVENT, (event) => {
		if (event.active) this.enable();
		else this.clear();
	});
}
ElementSupport.prototype.getUnsupportedElements = function() {
	return this._unsupportedElements;
};
ElementSupport.prototype.enable = function() {
	const unsupportedElements = [];
	this._elementRegistry.forEach((element) => {
		if (isLabel$1(element)) return;
		if (!isAny$1(element, UNSUPPORTED_ELEMENTS)) return;
		this.showWarning(element);
		unsupportedElements.push(element);
	});
	if (unsupportedElements.length) this._notifications.showNotification({
		text: "Found unsupported elements",
		icon: ExclamationTriangleIcon(),
		type: "warning",
		ttl: 5e3
	});
	this._unsupportedElements = unsupportedElements;
};
ElementSupport.prototype.clear = function() {
	classes(this._canvasParent).remove("warning");
};
ElementSupport.prototype.showWarning = function(element) {
	this._elementNotifications.addElementNotification(element, {
		type: "warning",
		icon: ExclamationTriangleIcon(),
		text: "Not supported"
	});
};
ElementSupport.$inject = [
	"eventBus",
	"elementRegistry",
	"canvas",
	"notifications",
	"elementNotifications"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/element-support/index.js
var element_support_default = {
	__depends__: [element_notifications_default, notifications_default],
	__init__: ["elementSupport"],
	elementSupport: ["type", ElementSupport]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/pause-simulation/PauseSimulation.js
var PLAY_MARKUP = PlayIcon();
var PAUSE_MARKUP = PauseIcon();
var HIGH_PRIORITY$1 = 1500;
function PauseSimulation(eventBus, tokenSimulationPalette, notifications, canvas) {
	this._eventBus = eventBus;
	this._tokenSimulationPalette = tokenSimulationPalette;
	this._notifications = notifications;
	this.canvasParent = canvas.getContainer().parentNode;
	this.isActive = false;
	this.isPaused = true;
	this._init();
	eventBus.on(SCOPE_CREATE_EVENT, HIGH_PRIORITY$1, (event) => {
		this.activate();
		this.unpause();
	});
	eventBus.on([RESET_SIMULATION_EVENT, TOGGLE_MODE_EVENT], () => {
		this.deactivate();
		this.pause();
	});
	eventBus.on(TRACE_EVENT, HIGH_PRIORITY$1, (event) => {
		this.unpause();
	});
}
PauseSimulation.prototype._init = function() {
	this.paletteEntry = domify(`
    <button class="bts-entry disabled" title="Play/Pause Simulation" disabled>
      ${PLAY_MARKUP}
    </button>
  `);
	event.bind(this.paletteEntry, "click", this.toggle.bind(this));
	this._tokenSimulationPalette.addEntry(this.paletteEntry, 1);
};
PauseSimulation.prototype.toggle = function() {
	if (this.isPaused) this.unpause();
	else this.pause();
};
PauseSimulation.prototype.pause = function() {
	if (!this.isActive) return;
	classes(this.paletteEntry).remove("active");
	classes(this.canvasParent).add("paused");
	this.paletteEntry.innerHTML = PLAY_MARKUP;
	this._eventBus.fire(PAUSE_SIMULATION_EVENT);
	this._notifications.showNotification({ text: "Pause Simulation" });
	this.isPaused = true;
};
PauseSimulation.prototype.unpause = function() {
	if (!this.isActive || !this.isPaused) return;
	classes(this.paletteEntry).add("active");
	classes(this.canvasParent).remove("paused");
	this.paletteEntry.innerHTML = PAUSE_MARKUP;
	this._eventBus.fire(PLAY_SIMULATION_EVENT);
	this._notifications.showNotification({ text: "Play Simulation" });
	this.isPaused = false;
};
PauseSimulation.prototype.activate = function() {
	this.isActive = true;
	classes(this.paletteEntry).remove("disabled");
	this.paletteEntry.removeAttribute("disabled");
};
PauseSimulation.prototype.deactivate = function() {
	this.isActive = false;
	classes(this.paletteEntry).remove("active");
	classes(this.paletteEntry).add("disabled");
	this.paletteEntry.setAttribute("disabled", "");
};
PauseSimulation.$inject = [
	"eventBus",
	"tokenSimulationPalette",
	"notifications",
	"canvas"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/pause-simulation/index.js
var pause_simulation_default = {
	__depends__: [notifications_default],
	__init__: ["pauseSimulation"],
	pauseSimulation: ["type", PauseSimulation]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/reset-simulation/ResetSimulation.js
function ResetSimulation(eventBus, tokenSimulationPalette, notifications) {
	this._eventBus = eventBus;
	this._tokenSimulationPalette = tokenSimulationPalette;
	this._notifications = notifications;
	this._init();
	eventBus.on(SCOPE_CREATE_EVENT, () => {
		classes(this._paletteEntry).remove("disabled");
		this._paletteEntry.removeAttribute("disabled");
	});
	eventBus.on(TOGGLE_MODE_EVENT, (event) => {
		if (!(this._active = event.active)) this.resetSimulation();
	});
}
ResetSimulation.prototype._init = function() {
	this._paletteEntry = domify(`
    <button class="bts-entry disabled" title="Reset Simulation" disabled>
      ${ResetIcon()}
    </button>
  `);
	event.bind(this._paletteEntry, "click", () => {
		this.resetSimulation();
		this._notifications.showNotification({
			text: "Reset Simulation",
			type: "info"
		});
	});
	this._tokenSimulationPalette.addEntry(this._paletteEntry, 2);
};
ResetSimulation.prototype.resetSimulation = function() {
	classes(this._paletteEntry).add("disabled");
	this._paletteEntry.setAttribute("disabled", "");
	this._eventBus.fire(RESET_SIMULATION_EVENT);
};
ResetSimulation.$inject = [
	"eventBus",
	"tokenSimulationPalette",
	"notifications"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/reset-simulation/index.js
var reset_simulation_default = {
	__depends__: [notifications_default],
	__init__: ["resetSimulation"],
	resetSimulation: ["type", ResetSimulation]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/token-count/TokenCount.js
init_ModelUtil();
var OFFSET_BOTTOM = 10;
var OFFSET_LEFT = -15;
var LOW_PRIORITY = 500;
var DEFAULT_PRIMARY_COLOR = "--token-simulation-primary";
var DEFAULT_AUXILIARY_COLOR = "--token-simulation-control-surface";
function TokenCount(eventBus, overlays, simulator, scopeFilter, simulationStyles) {
	this._overlays = overlays;
	this._scopeFilter = scopeFilter;
	this._simulator = simulator;
	this._simulationStyles = simulationStyles;
	this.overlayIds = {};
	eventBus.on(ELEMENT_CHANGED_EVENT, LOW_PRIORITY, (event) => {
		const { element } = event;
		this.removeTokenCounts(element);
		this.addTokenCounts(element);
	});
	eventBus.on(SCOPE_FILTER_CHANGED_EVENT, (event) => {
		const allElements = all(".bts-token-count[data-scope-id]", overlays._overlayRoot);
		for (const element of allElements) {
			const scopeId = element.dataset.scopeId;
			classes(element).toggle("inactive", !this._scopeFilter.isShown(scopeId));
		}
	});
}
TokenCount.prototype.addTokenCounts = function(element) {
	if (is$1(element, "bpmn:MessageFlow") || is$1(element, "bpmn:SequenceFlow")) return;
	const scopes = this._simulator.findScopes((scope) => {
		return !scope.destroyed && scope.children.some((c) => !c.destroyed && c.element === element);
	});
	this.addTokenCount(element, scopes);
};
TokenCount.prototype.addTokenCount = function(element, scopes) {
	if (!scopes.length) return;
	const tokenMarkup = scopes.map((scope) => {
		return this._getTokenHTML(element, scope);
	}).join("");
	const html = domify(`
    <div class="bts-token-count-parent">
      ${tokenMarkup}
    </div>
  `);
	const position = {
		bottom: OFFSET_BOTTOM,
		left: OFFSET_LEFT
	};
	const overlayId = this._overlays.add(element, "bts-token-count", {
		position,
		html,
		show: { minZoom: .5 }
	});
	this.overlayIds[element.id] = overlayId;
};
TokenCount.prototype.removeTokenCounts = function(element) {
	this.removeTokenCount(element);
};
TokenCount.prototype.removeTokenCount = function(element) {
	const overlayId = this.overlayIds[element.id];
	if (!overlayId) return;
	this._overlays.remove(overlayId);
	delete this.overlayIds[element.id];
};
TokenCount.prototype._getTokenHTML = function(element, scope) {
	const colors = scope.colors || this._getDefaultColors();
	return `
    <div data-scope-id="${scope.id}" class="bts-token-count waiting ${this._scopeFilter.isShown(scope) ? "" : "inactive"}"
         style="color: ${colors.auxiliary}; background: ${colors.primary}">
      ${scope.getTokensByElement(element)}
    </div>
  `;
};
TokenCount.prototype._getDefaultColors = function() {
	return {
		primary: this._simulationStyles.get(DEFAULT_PRIMARY_COLOR),
		auxiliary: this._simuationStyles.get(DEFAULT_AUXILIARY_COLOR)
	};
};
TokenCount.$inject = [
	"eventBus",
	"overlays",
	"simulator",
	"scopeFilter",
	"simulationStyles"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/token-count/index.js
var token_count_default = {
	__depends__: [scope_filter_default, simulation_styles_default],
	__init__: ["tokenCount"],
	tokenCount: ["type", TokenCount]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/set-animation-speed/SetAnimationSpeed.js
var SPEEDS = [
	["Slow", .5],
	["Normal", 1],
	["Fast", 2]
];
function SetAnimationSpeed(canvas, animation, eventBus) {
	this._canvas = canvas;
	this._animation = animation;
	this._eventBus = eventBus;
	this._init(animation.getAnimationSpeed());
	eventBus.on(TOGGLE_MODE_EVENT, (event) => {
		if (!event.active) classes(this._container).add("hidden");
		else classes(this._container).remove("hidden");
	});
	eventBus.on(ANIMATION_SPEED_CHANGED_EVENT, (event) => {
		this.setActive(event.speed);
	});
}
SetAnimationSpeed.prototype.getToggleSpeed = function(element) {
	return parseFloat(element.dataset.speed);
};
SetAnimationSpeed.prototype._init = function(animationSpeed) {
	this._container = domify(`
    <div class="bts-set-animation-speed hidden">
      ${TachometerIcon()}
      <div class="bts-animation-speed-buttons">
        ${SPEEDS.map(([label, speed], idx) => `
            <button title="Set animation speed = ${label}" data-speed="${speed}" class="bts-animation-speed-button ${speed === animationSpeed ? "active" : ""}">
              ${Array.from({ length: idx + 1 }).map(() => AngleRightIcon()).join("")}
            </button>
          `).join("")}
      </div>
    </div>
  `);
	delegate.bind(this._container, "[data-speed]", "click", (event) => {
		const toggle = event.delegateTarget;
		const speed = this.getToggleSpeed(toggle);
		this._animation.setAnimationSpeed(speed);
	});
	this._canvas.getContainer().appendChild(this._container);
};
SetAnimationSpeed.prototype.setActive = function(speed) {
	all("[data-speed]", this._container).forEach((toggle) => {
		const active = this.getToggleSpeed(toggle) === speed;
		classes(toggle)[active ? "add" : "remove"]("active");
	});
};
SetAnimationSpeed.$inject = [
	"canvas",
	"animation",
	"eventBus"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/set-animation-speed/index.js
var set_animation_speed_default = {
	__init__: ["setAnimationSpeed"],
	setAnimationSpeed: ["type", SetAnimationSpeed]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/exclusive-gateway-settings/ExclusiveGatewaySettings.js
init_ModelUtil();
var SELECTED_COLOR$1 = "--token-simulation-active-outgoing-flow-stroke-color";
var NOT_SELECTED_COLOR$1 = "--token-simulation-inactive-outgoing-flow-stroke-color";
function getNext(gateway, sequenceFlow) {
	var outgoing = gateway.outgoing.filter(isSequenceFlow);
	var index = outgoing.indexOf(sequenceFlow || gateway.sequenceFlow);
	if (outgoing[index + 1]) return outgoing[index + 1];
	else return outgoing[0];
}
function isSequenceFlow(connection) {
	return is$1(connection, "bpmn:SequenceFlow");
}
var ID$1 = "exclusive-gateway-settings";
var HIGH_PRIORITY = 2e3;
function ExclusiveGatewaySettings(eventBus, elementRegistry, elementColors, simulator, simulationStyles) {
	this._elementRegistry = elementRegistry;
	this._elementColors = elementColors;
	this._simulator = simulator;
	this._simulationStyles = simulationStyles;
	eventBus.on(TOGGLE_MODE_EVENT, (event) => {
		if (event.active) this.setSequenceFlowsDefault();
		else this.resetSequenceFlows();
	});
}
ExclusiveGatewaySettings.prototype.setSequenceFlowsDefault = function() {
	const exclusiveGateways = this._elementRegistry.filter((element) => {
		return is$1(element, "bpmn:ExclusiveGateway");
	});
	for (const gateway of exclusiveGateways) this.setSequenceFlow(gateway);
};
ExclusiveGatewaySettings.prototype.resetSequenceFlows = function() {
	this._elementRegistry.filter((element) => {
		return is$1(element, "bpmn:ExclusiveGateway");
	}).forEach((exclusiveGateway) => {
		if (exclusiveGateway.outgoing.filter(isSequenceFlow).length) this.resetSequenceFlow(exclusiveGateway);
	});
};
ExclusiveGatewaySettings.prototype.resetSequenceFlow = function(gateway) {
	this._simulator.setConfig(gateway, { activeOutgoing: void 0 });
};
ExclusiveGatewaySettings.prototype.setSequenceFlow = function(gateway) {
	const outgoing = gateway.outgoing.filter(isSequenceFlow);
	if (outgoing.length < 2) return;
	const { activeOutgoing } = this._simulator.getConfig(gateway);
	let newActiveOutgoing;
	if (activeOutgoing) newActiveOutgoing = getNext(gateway, activeOutgoing);
	else newActiveOutgoing = outgoing[0];
	this._simulator.setConfig(gateway, { activeOutgoing: newActiveOutgoing });
	gateway.outgoing.forEach((outgoing) => {
		const style = outgoing === newActiveOutgoing ? SELECTED_COLOR$1 : NOT_SELECTED_COLOR$1;
		const stroke = this._simulationStyles.get(style);
		this._elementColors.add(outgoing, ID$1, { stroke }, HIGH_PRIORITY);
	});
};
ExclusiveGatewaySettings.$inject = [
	"eventBus",
	"elementRegistry",
	"elementColors",
	"simulator",
	"simulationStyles"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/element-colors/ElementColors.js
init_ModelUtil();
var VERY_HIGH_PRIORITY = 5e4;
function ElementColors(elementRegistry, eventBus, graphicsFactory) {
	this._elementRegistry = elementRegistry;
	this._eventBus = eventBus;
	this._graphicsFactory = graphicsFactory;
	this._originalColors = {};
	this._customColors = {};
	eventBus.on(TOGGLE_MODE_EVENT, VERY_HIGH_PRIORITY, (event) => {
		if (event.active) this._saveOriginalColors();
		else {
			this._applyOriginalColors();
			this._originalColors = {};
			this._customColors = {};
		}
	});
	eventBus.on("saveXML.start", VERY_HIGH_PRIORITY, () => {
		this._applyOriginalColors();
		eventBus.once("saveXML.done", () => this._applyCustomColors());
	});
}
ElementColors.$inject = [
	"elementRegistry",
	"eventBus",
	"graphicsFactory"
];
ElementColors.prototype.add = function(element, id, colors, priority = 1e3) {
	let elementColors = this._customColors[element.id];
	if (!elementColors) elementColors = this._customColors[element.id] = {};
	elementColors[id] = {
		...colors,
		priority
	};
	this._applyHighestPriorityColor(element);
};
ElementColors.prototype.remove = function(element, id) {
	const elementColors = this._customColors[element.id];
	if (elementColors) {
		delete elementColors[id];
		if (!Object.keys(elementColors)) delete this._customColors[element.id];
	}
	this._applyHighestPriorityColor(element);
};
ElementColors.prototype._get = function(element) {
	const di = getDi(element);
	if (!di) return;
	if (isLabel(element)) return { stroke: di.label && di.label.get("color") };
	else if (isAny$1(di, ["bpmndi:BPMNEdge", "bpmndi:BPMNShape"])) return {
		fill: di.get("background-color"),
		stroke: di.get("border-color")
	};
};
ElementColors.prototype._set = function(element, colors = {}) {
	const { fill, stroke } = colors;
	const di = getDi(element);
	if (!di) return;
	if (isLabel(element)) di.label && di.label.set("color", stroke);
	else if (isAny$1(di, ["bpmndi:BPMNEdge", "bpmndi:BPMNShape"])) {
		di.set("background-color", fill);
		di.set("border-color", stroke);
	}
	this._forceRedraw(element);
};
ElementColors.prototype._saveOriginalColors = function() {
	this._originalColors = {};
	this._elementRegistry.forEach((element) => {
		this._originalColors[element.id] = this._get(element);
	});
};
ElementColors.prototype._applyOriginalColors = function() {
	this._elementRegistry.forEach((element) => {
		const colors = this._originalColors[element.id];
		if (colors) this._set(element, colors);
	});
};
ElementColors.prototype._applyCustomColors = function() {
	this._elementRegistry.forEach((element) => {
		const elementColors = this._customColors[element.id];
		if (elementColors) this._set(element, getColorsWithHighestPriority(elementColors));
	});
};
ElementColors.prototype._applyHighestPriorityColor = function(element) {
	const elementColors = this._customColors[element.id];
	if (!elementColors) {
		this._set(element, this._originalColors[element.id]);
		return;
	}
	this._set(element, getColorsWithHighestPriority(elementColors));
};
ElementColors.prototype._forceRedraw = function(element) {
	const gfx = this._elementRegistry.getGraphics(element);
	const type = element.waypoints ? "connection" : "shape";
	this._graphicsFactory.update(type, element, gfx);
};
function isLabel(element) {
	return "labelTarget" in element;
}
function getColorsWithHighestPriority(colors = {}) {
	const colorsWithHighestPriority = Object.values(colors).reduce((colorsWithHighestPriority, colors) => {
		const { priority = 1e3 } = colors;
		if (!colorsWithHighestPriority || priority > colorsWithHighestPriority.priority) return colors;
		return colorsWithHighestPriority;
	}, void 0);
	if (colorsWithHighestPriority) {
		const { priority, ...fillAndStroke } = colorsWithHighestPriority;
		return fillAndStroke;
	}
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/element-colors/index.js
var element_colors_default = { elementColors: ["type", ElementColors] };
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/exclusive-gateway-settings/index.js
var exclusive_gateway_settings_default = {
	__depends__: [element_colors_default, simulation_styles_default],
	exclusiveGatewaySettings: ["type", ExclusiveGatewaySettings]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/neutral-element-colors/NeutralElementColors.js
var ID = "neutral-element-colors";
var STROKE_COLOR = "--token-simulation-element-stroke-color";
var FILL_COLOR = "--token-simulation-element-fill-color";
function NeutralElementColors(eventBus, elementRegistry, elementColors, simulationStyles) {
	this._elementRegistry = elementRegistry;
	this._elementColors = elementColors;
	this._simulationStyles = simulationStyles;
	eventBus.on(TOGGLE_MODE_EVENT, (event) => {
		const { active } = event;
		if (active) this._setNeutralColors();
	});
}
NeutralElementColors.prototype._setNeutralColors = function() {
	const stroke = this._simulationStyles.get(STROKE_COLOR), fill = this._simulationStyles.get(FILL_COLOR);
	this._elementRegistry.forEach((element) => {
		this._elementColors.add(element, ID, {
			stroke,
			fill
		});
	});
};
NeutralElementColors.$inject = [
	"eventBus",
	"elementRegistry",
	"elementColors",
	"simulationStyles"
];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/neutral-element-colors/index.js
var neutral_element_colors_default = {
	__depends__: [element_colors_default, simulation_styles_default],
	__init__: ["neutralElementColors"],
	neutralElementColors: ["type", NeutralElementColors]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/inclusive-gateway-settings/InclusiveGatewaySettings.js
var SELECTED_COLOR = "--token-simulation-active-outgoing-flow-stroke-color";
var NOT_SELECTED_COLOR = "--token-simulation-inactive-outgoing-flow-stroke-color";
var COLOR_ID = "inclusive-gateway-settings";
function InclusiveGatewaySettings(eventBus, elementRegistry, elementColors, simulator, simulationStyles) {
	this._elementRegistry = elementRegistry;
	this._elementColors = elementColors;
	this._simulator = simulator;
	this._simulationStyles = simulationStyles;
	eventBus.on(TOGGLE_MODE_EVENT, (event) => {
		if (event.active) this.setDefaults();
		else this.reset();
	});
}
InclusiveGatewaySettings.prototype.setDefaults = function() {
	this._elementRegistry.filter((element) => {
		return is$1(element, "bpmn:InclusiveGateway");
	}).forEach((inclusiveGateway) => {
		if (inclusiveGateway.outgoing.filter(isSequenceFlow$1).length > 1) this._setGatewayDefaults(inclusiveGateway);
	});
};
InclusiveGatewaySettings.prototype.reset = function() {
	this._elementRegistry.filter((element) => {
		return is$1(element, "bpmn:InclusiveGateway");
	}).forEach((inclusiveGateway) => {
		if (inclusiveGateway.outgoing.filter(isSequenceFlow$1).length > 1) this._resetGateway(inclusiveGateway);
	});
};
InclusiveGatewaySettings.prototype.toggleSequenceFlow = function(gateway, sequenceFlow) {
	const activeOutgoing = this._getActiveOutgoing(gateway), defaultFlow = getDefaultFlow(gateway), nonDefaultFlows = getNonDefaultFlows(gateway);
	let newActiveOutgoing;
	if (activeOutgoing.includes(sequenceFlow)) newActiveOutgoing = without(activeOutgoing, sequenceFlow);
	else newActiveOutgoing = without(activeOutgoing, defaultFlow).concat(sequenceFlow);
	if (!newActiveOutgoing.length) {
		if (defaultFlow) newActiveOutgoing = [defaultFlow];
		else newActiveOutgoing = [nonDefaultFlows.find((flow) => flow !== sequenceFlow)];
	}
	this._setActiveOutgoing(gateway, newActiveOutgoing);
};
InclusiveGatewaySettings.prototype._getActiveOutgoing = function(gateway) {
	const { activeOutgoing } = this._simulator.getConfig(gateway);
	return activeOutgoing;
};
InclusiveGatewaySettings.prototype._setActiveOutgoing = function(gateway, activeOutgoing) {
	this._simulator.setConfig(gateway, { activeOutgoing });
	gateway.outgoing.filter(isSequenceFlow$1).forEach((outgoing) => {
		const style = !activeOutgoing || activeOutgoing.includes(outgoing) ? SELECTED_COLOR : NOT_SELECTED_COLOR;
		const stroke = this._simulationStyles.get(style);
		this._elementColors.add(outgoing, COLOR_ID, { stroke });
	});
};
InclusiveGatewaySettings.prototype._setGatewayDefaults = function(gateway) {
	const nonDefaultFlows = without(gateway.outgoing.filter(isSequenceFlow$1), getDefaultFlow(gateway));
	this._setActiveOutgoing(gateway, nonDefaultFlows);
};
InclusiveGatewaySettings.prototype._resetGateway = function(gateway) {
	this._simulator.setConfig(gateway, { activeOutgoing: void 0 });
};
InclusiveGatewaySettings.$inject = [
	"eventBus",
	"elementRegistry",
	"elementColors",
	"simulator",
	"simulationStyles"
];
function getDefaultFlow(gateway) {
	const defaultFlow = getBusinessObject(gateway).default;
	if (!defaultFlow) return;
	return gateway.outgoing.find((flow) => {
		return getBusinessObject(flow) === defaultFlow;
	});
}
function getNonDefaultFlows(gateway) {
	const defaultFlow = getDefaultFlow(gateway);
	return gateway.outgoing.filter((flow) => {
		return getBusinessObject(flow) !== defaultFlow;
	});
}
function without(array, element) {
	return array.filter((arrayElement) => arrayElement !== element);
}
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/inclusive-gateway-settings/index.js
var inclusive_gateway_settings_default = {
	__depends__: [element_colors_default, simulation_styles_default],
	inclusiveGatewaySettings: ["type", InclusiveGatewaySettings]
};
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/features/palette/Palette.js
function Palette(eventBus, canvas) {
	var self = this;
	this._canvas = canvas;
	this.entries = [];
	this._init();
	eventBus.on(TOGGLE_MODE_EVENT, function(context) {
		if (context.active) classes(self.container).remove("hidden");
		else classes(self.container).add("hidden");
	});
}
Palette.prototype._init = function() {
	this.container = domify("<div class=\"bts-palette hidden\"></div>");
	this._canvas.getContainer().appendChild(this.container);
};
Palette.prototype.addEntry = function(entry, index) {
	var childIndex = 0;
	this.entries.forEach(function(entry) {
		if (index >= entry.index) childIndex++;
	});
	this.container.insertBefore(entry, this.container.childNodes[childIndex]);
	this.entries.push({
		entry,
		index
	});
};
Palette.$inject = ["eventBus", "canvas"];
//#endregion
//#region ../../node_modules/bpmn-js-token-simulation/lib/base.js
var base_default = { __depends__: [
	simulator_default,
	animation_default,
	colored_scopes_default,
	context_pads_default,
	simulation_state_default,
	show_scopes_default,
	log_default,
	element_support_default,
	pause_simulation_default,
	reset_simulation_default,
	token_count_default,
	set_animation_speed_default,
	exclusive_gateway_settings_default,
	neutral_element_colors_default,
	inclusive_gateway_settings_default,
	{
		__init__: ["tokenSimulationPalette"],
		tokenSimulationPalette: ["type", Palette]
	}
] };
//#endregion
//#region ../../libs/model-navigation/src/qualifiedReference.ts
var NCNAME = "[A-Za-z_][\\w.-]*";
var PREFIXED_NAME = new RegExp(`^(${NCNAME}):(${NCNAME})$`);
function resolveQualifiedReference(rawReference, element) {
	const prefixedName = PREFIXED_NAME.exec(rawReference);
	if (!prefixedName) return { id: rawReference };
	const [, prefix, localName] = prefixedName;
	const namespace = namespaceBoundTo(prefix, element);
	return namespace ? {
		id: localName,
		namespace
	} : { id: localName };
}
function namespaceBoundTo(prefix, element) {
	for (let scope = element; scope; scope = scope.$parent) {
		const namespace = scope.$attrs?.[`xmlns:${prefix}`];
		if (typeof namespace === "string" && namespace.length > 0) return namespace;
	}
}
//#endregion
//#region ../../libs/model-navigation/src/extractReference.ts
var REFERENCE_SOURCES = {
	process: {
		attribute: "calledElement",
		extensionElement: {
			type: "zeebe:CalledElement",
			property: "processId"
		},
		qualifiedName: true
	},
	decision: {
		attribute: "camunda:decisionRef",
		extensionElement: {
			type: "zeebe:CalledDecision",
			property: "decisionId"
		},
		qualifiedName: false
	},
	form: {
		extensionElement: {
			type: "zeebe:FormDefinition",
			property: "formId"
		},
		qualifiedName: false
	}
};
function findExtensionElement(businessObject, type) {
	const values = businessObject.extensionElements?.values;
	if (!values) return;
	return values.find((extensionElement) => extensionElement.$type === type);
}
function nonEmptyString(value) {
	return typeof value === "string" && value.length > 0 ? value : void 0;
}
function extractReference(businessObject, kind) {
	if (!businessObject) return;
	const { attribute, extensionElement } = REFERENCE_SOURCES[kind];
	const camunda7Reference = attribute === void 0 ? void 0 : nonEmptyString(businessObject.get(attribute));
	const camunda8Element = findExtensionElement(businessObject, extensionElement.type);
	return camunda7Reference ?? nonEmptyString(camunda8Element?.[extensionElement.property]);
}
function extractModelReference(businessObject, kind) {
	const reference = extractReference(businessObject, kind);
	if (!businessObject || !reference) return;
	return REFERENCE_SOURCES[kind].qualifiedName ? {
		...resolveQualifiedReference(reference, businessObject),
		kind
	} : {
		id: reference,
		kind
	};
}
//#endregion
//#region ../../libs/model-navigation/src/FormReferenceStatusClient.ts
var _FormReferenceStatusClient;
function singleTarget(current) {
	const target = current?.target;
	return target && !Array.isArray(target) ? target : void 0;
}
var FormReferenceStatusClient = class {
	constructor(eventBus, contextPad, modelNavigationPort) {
		this.contextPad = contextPad;
		this.modelNavigationPort = modelNavigationPort;
		this.store = new DisposableStore();
		eventBus.on("contextPad.open", (event) => {
			this.currentPadTarget = singleTarget(event?.current);
		});
		eventBus.on("contextPad.close", () => {
			this.currentPadTarget = void 0;
		});
		const unsubscribe = modelNavigationPort.onReferenceAvailabilityChanged?.(() => this.refreshContextPad());
		if (unsubscribe) this.store.add(unsubscribe);
		eventBus.on("diagram.destroy", () => this.store.dispose());
	}
	isResolved(formId) {
		return this.modelNavigationPort.isReferenceAvailable?.({
			id: formId,
			kind: "form"
		}) ?? true;
	}
	refreshContextPad() {
		const target = this.currentPadTarget;
		if (target && extractReference(target.businessObject, "form") !== void 0 && this.contextPad.isOpen()) this.contextPad.open(target, true);
	}
};
_FormReferenceStatusClient = FormReferenceStatusClient;
_FormReferenceStatusClient.$inject = [
	"eventBus",
	"contextPad",
	"modelNavigationPort"
];
//#endregion
//#region ../../libs/model-navigation/src/formPreviewState.ts
function reduceFormPreview(state, event) {
	if (event.kind === "dismiss") return {
		state: {
			...state,
			dismissed: true,
			explicit: false
		},
		action: "close"
	};
	if (event.kind === "refresh") return {
		state: {
			...state,
			explicit: true
		},
		action: "keep"
	};
	if (event.kind === "manual") {
		if (event.target !== state.target || !state.reference || !event.available) return {
			state,
			action: "keep"
		};
		return {
			state: {
				...state,
				dismissed: false,
				attempted: true,
				explicit: true
			},
			action: "open",
			automatic: false
		};
	}
	const { target, reference, available, visible, automatic } = event;
	const changed = target !== state.target || reference !== state.reference;
	if (!changed && reference && (state.explicit || automatic && visible && state.available === available)) return {
		state,
		action: "keep"
	};
	const next = changed ? {
		target,
		reference,
		dismissed: false,
		attempted: false,
		explicit: false
	} : { ...state };
	const availabilityChanged = state.available !== available;
	next.available = available;
	if (!automatic) {
		next.attempted = false;
		return {
			state: next,
			action: "close"
		};
	}
	if (!reference || available === void 0) {
		next.attempted = false;
		return {
			state: next,
			action: "close"
		};
	}
	if (!next.dismissed && (changed || availabilityChanged || !next.attempted) && !available) {
		next.attempted = true;
		return {
			state: next,
			action: "indicate"
		};
	}
	if (availabilityChanged) next.attempted = false;
	if (!next.dismissed && !next.attempted) {
		next.attempted = true;
		return {
			state: next,
			action: "open",
			automatic: true
		};
	}
	return {
		state: next,
		action: "keep"
	};
}
//#endregion
//#region ../../libs/model-navigation/src/FormPreviewController.ts
init_ModelUtil();
var _FormPreviewController;
var FormPreviewController = class {
	constructor(eventBus, selection, canvas, contextPad, port, status) {
		this.selection = selection;
		this.canvas = canvas;
		this.contextPad = contextPad;
		this.port = port;
		this.status = status;
		this.state = {
			dismissed: false,
			attempted: false,
			explicit: false
		};
		this.visible = false;
		this.version = 0;
		this.disposed = false;
		const scheduleReposition = () => {
			if (!this.disposed) this.handle?.reposition();
		};
		eventBus.on("selection.changed", () => this.update());
		for (const name of ["elements.changed", "element.changed"]) eventBus.on(name, () => {
			this.update();
			scheduleReposition();
		});
		for (const name of ["canvas.viewbox.changed", "contextPad.open"]) eventBus.on(name, scheduleReposition);
		eventBus.on("canvas.resized", scheduleReposition);
		const unsubscribe = port.onReferenceAvailabilityChanged?.(() => this.update());
		const unsubscribeAutomatic = port.formPreview?.onAutomaticChanged?.(() => {
			if (this.disposed) return;
			this.update();
			this.refreshPad();
		});
		const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleReposition) : void 0;
		observer?.observe(canvas.getContainer());
		eventBus.on("diagram.destroy", () => {
			this.disposed = true;
			this.stop();
			unsubscribe?.();
			unsubscribeAutomatic?.();
			observer?.disconnect();
		});
	}
	isVisible(element) {
		return this.state.target === element && this.visible;
	}
	openManual(element) {
		if (this.disposed) return;
		this.transition({
			kind: "manual",
			target: element,
			available: !!this.state.reference && this.status.isResolved(this.state.reference)
		});
	}
	update() {
		if (this.disposed || !this.port.formPreview) return;
		const elements = this.selection.get();
		const target = elements.length === 1 && is$1(elements[0], "bpmn:UserTask") ? elements[0] : void 0;
		const reference = target && extractReference(target.businessObject, "form");
		this.transition({
			kind: "selection",
			automatic: this.port.formPreview.isAutomaticEnabled?.() ?? true,
			target,
			reference,
			available: this.port.isReferenceAvailabilityKnown?.() === false ? void 0 : !!reference && this.status.isResolved(reference),
			visible: this.visible
		});
	}
	transition(event) {
		const decision = reduceFormPreview(this.state, event);
		if (decision.action !== "keep") this.stop();
		this.state = decision.state;
		if (decision.action === "open") this.start(decision.automatic);
		if (decision.action === "indicate") this.start(true, true);
	}
	start(automatic, unavailable = false) {
		const target = this.state.target;
		const id = this.state.reference;
		if (!target || !id || !this.port.formPreview) return;
		const version = ++this.version;
		this.handle = this.port.formPreview.open({
			id,
			automatic,
			unavailable,
			anchor: () => {
				const container = this.canvas.getContainer();
				const viewport = container.getBoundingClientRect();
				const box = this.canvas.getAbsoluteBBox(target);
				const pad = container.querySelector(".djs-context-pad.open")?.getBoundingClientRect();
				return {
					canvas: viewport,
					task: {
						...box,
						x: viewport.x + box.x,
						y: viewport.y + box.y
					},
					contextPad: pad && pad.width > 0 ? pad : void 0
				};
			},
			onVisibilityChanged: (visible) => {
				if (version !== this.version) return;
				this.visible = visible;
				this.refreshPad();
			},
			onClose: () => {
				if (version !== this.version) return;
				this.transition({ kind: "dismiss" });
				this.refreshPad();
			},
			onExplicitRequest: () => {
				if (version === this.version) this.transition({ kind: "refresh" });
			},
			focusCanvas: () => this.canvas.focus()
		});
	}
	refreshPad() {
		if (this.state.target && this.contextPad.isOpen()) this.contextPad.open(this.state.target, true);
	}
	stop() {
		this.version++;
		this.handle?.close();
		this.handle = void 0;
		this.visible = false;
	}
};
_FormPreviewController = FormPreviewController;
_FormPreviewController.$inject = [
	"eventBus",
	"selection",
	"canvas",
	"contextPad",
	"modelNavigationPort",
	"formReferenceStatusClient"
];
//#endregion
//#region ../../libs/model-navigation/src/NavigateContextPadProvider.ts
init_ModelUtil();
var _NavigateContextPadProvider;
var NAVIGATE_ICON_SVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>`;
var NavigateContextPadProvider = class {
	constructor(contextPad, translate, modelNavigationPort, formReferenceStatusClient, formPreviewController) {
		this.formReferenceStatusClient = formReferenceStatusClient;
		this.formPreviewController = formPreviewController;
		this.translate = translate;
		this.port = modelNavigationPort;
		contextPad.registerProvider(this);
	}
	getContextPadEntries(element) {
		const kind = this.detectKind(element);
		if (!kind) return {};
		const reference = extractModelReference(element.businessObject, kind);
		if (!reference || !this.isAvailable(reference)) return {};
		const entries = { "navigate-to-referenced-model": {
			group: "connect",
			html: `<div class="entry">${NAVIGATE_ICON_SVG}</div>`,
			title: this.translate("Navigate to referenced model"),
			action: { click: (_event, clickedElement) => {
				const current = extractModelReference(clickedElement.businessObject, kind);
				if (current && this.isAvailable(current)) this.port.openReference(current);
			} }
		} };
		if (referenceKindSupports(kind, "preview") && this.port.formPreview && !this.formPreviewController?.isVisible(element)) {
			const title = this.translate("Preview linked form");
			entries["preview-linked-form"] = {
				group: "connect",
				html: `<button type="button" class="entry linked-form-preview-action" aria-label="${title.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")}"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg></button>`,
				title,
				action: { click: (_event, clickedElement) => {
					const current = extractReference(clickedElement.businessObject, kind);
					if (current && this.formReferenceStatusClient.isResolved(current)) this.formPreviewController?.openManual(clickedElement);
				} }
			};
		}
		return entries;
	}
	isAvailable(reference) {
		return !referenceKindSupports(reference.kind, "availabilityStatus") || this.formReferenceStatusClient.isResolved(reference.id);
	}
	detectKind(element) {
		if (is$1(element, "bpmn:CallActivity")) return "process";
		if (is$1(element, "bpmn:BusinessRuleTask")) return "decision";
		if (is$1(element, "bpmn:UserTask")) return "form";
	}
};
_NavigateContextPadProvider = NavigateContextPadProvider;
_NavigateContextPadProvider.$inject = [
	"contextPad",
	"translate",
	"modelNavigationPort",
	"formReferenceStatusClient",
	"formPreviewController"
];
//#endregion
//#region ../../libs/model-navigation/src/index.ts
function createModelNavigationModule(port) {
	return {
		__init__: [
			"formReferenceStatusClient",
			"formPreviewController",
			"navigateContextPadProvider"
		],
		formPreviewController: ["type", FormPreviewController],
		formReferenceStatusClient: ["type", FormReferenceStatusClient],
		navigateContextPadProvider: ["type", NavigateContextPadProvider],
		modelNavigationPort: ["value", port]
	};
}
//#endregion
//#region ../../packages/bpmn-modeler/src/diagramXml.ts
async function importDiagram(importer, xml) {
	try {
		return await importer.importXML(xml);
	} catch (error) {
		throw toImportError(error);
	}
}
function toImportError(error) {
	if (!error.warnings) return error;
	const importError = error;
	return new Error(`${importError.message} ${importError.warnings}`, { cause: error });
}
async function exportFormattedXml(exporter) {
	const { xml } = await exporter.saveXML({ format: true });
	return xml;
}
async function exportSvg(exporter) {
	const { svg } = await exporter.saveSVG();
	return svg;
}
//#endregion
//#region ../../packages/bpmn-modeler/src/keyboardFocus.ts
function installKeyboardFocus(deps) {
	const handler = (event) => {
		if (event.key !== "Escape") return;
		const target = event.target;
		const isWithinInstance = target instanceof Node && deps.roots.some((root) => root.contains(target));
		const isGlobalBody = deps.handleGlobalEscape === true && target === document.body;
		if (!isWithinInstance && !isGlobalBody) return;
		if (event.defaultPrevented) return;
		if (deps.isSearchPadOpen()) {
			deps.closeSearchPad();
			deps.focusCanvas();
			return;
		}
		if (deps.isCanvasFocused() && deps.hasSelection()) {
			deps.clearSelection();
			return;
		}
		deps.focusCanvas();
	};
	document.addEventListener("keydown", handler);
	return () => document.removeEventListener("keydown", handler);
}
//#endregion
//#region ../../packages/bpmn-modeler/src/focusFeatures.ts
function installSurfaceFocusFeatures(getService, options) {
	const canvas = getService("canvas");
	const canvasContainer = canvas.getContainer();
	const eventBus = () => getService("eventBus");
	const selection = () => getService("selection");
	const store = new DisposableStore();
	store.add(installKeyboardFocus({
		roots: [canvasContainer, ...options.extraRoots ?? []],
		handleGlobalEscape: options.handleGlobalEscape ?? false,
		focusCanvas: () => canvas.focus(),
		isCanvasFocused: () => canvas.isFocused(),
		hasSelection: () => selection().get().length > 0,
		clearSelection: () => selection().select(null),
		isSearchPadOpen: options.hasSearchPad ? () => getService("searchPad").isOpen() : () => false,
		closeSearchPad: options.hasSearchPad ? () => getService("searchPad").close() : () => {}
	}));
	store.add(installCanvasFocusIndicator({
		parent: canvasContainer,
		isFocused: () => canvas.isFocused(),
		onFocusChanged: (listener) => eventBus().on("canvas.focus.changed", (e) => listener(e.focused)),
		hasSelection: () => selection().get().length > 0,
		onSelectionChanged: (listener) => eventBus().on("selection.changed", (e) => listener(e.newSelection.length > 0))
	}));
	return () => store.dispose();
}
//#endregion
//#region ../../packages/bpmn-modeler/src/initialViewport.ts
var InitialViewportLatch = class {
	constructor(ports) {
		_defineProperty(this, "ports", void 0);
		_defineProperty(this, "decided", false);
		_defineProperty(this, "pending", void 0);
		this.ports = ports;
	}
	get isDecided() {
		return this.decided;
	}
	reset() {
		this.decided = false;
		this.pending = void 0;
	}
	markDecided() {
		this.decided = true;
		this.pending = void 0;
	}
	hold(viewport) {
		this.pending = viewport;
	}
	applyOnce() {
		if (this.decided) return true;
		const applied = this.pending !== void 0 ? this.ports.applyViewport(this.pending) : this.ports.fitViewport();
		if (applied) this.markDecided();
		return applied;
	}
};
function armInitialViewportPolicy(canvas, surface) {
	surface.resetInitialViewportDecision();
	const stop = observeCanvasSize(canvas, canvas.getContainer(), { applyInitialViewport: () => surface.applyInitialViewportOnce() });
	surface.fitViewport();
	return stop;
}
//#endregion
//#region ../../packages/bpmn-modeler/src/rootElement.ts
var IMPLICIT_ROOT_PREFIX = "__implicitroot";
var CanvasRootElementManager = class {
	constructor(getService) {
		_defineProperty(this, "getService", void 0);
		this.getService = getService;
	}
	getRootElementId() {
		const root = this.getService("canvas").getRootElement();
		if (!root || root.id.startsWith(IMPLICIT_ROOT_PREFIX)) return;
		return root.id;
	}
	setRootElementById(id) {
		if (!id) return false;
		const canvas = this.getService("canvas");
		if (canvas.getRootElement()?.id === id) return false;
		const element = this.getService("elementRegistry").get(id);
		if (!element) return false;
		canvas.setRootElement(element);
		return true;
	}
	onRootChanged(cb) {
		const eventBus = this.getService("eventBus");
		const handler = (event) => {
			const id = event.element?.id;
			cb(id && !id.startsWith(IMPLICIT_ROOT_PREFIX) ? id : void 0);
		};
		eventBus.on("root.set", handler);
		return () => eventBus.off("root.set", handler);
	}
};
//#endregion
//#region ../../packages/bpmn-modeler/src/selection.ts
var ElementSelectionManager = class {
	constructor(getService) {
		_defineProperty(this, "getService", void 0);
		this.getService = getService;
	}
	getSelectedElementIds() {
		return this.getService("selection").get().map((el) => el.id);
	}
	selectElementsByIds(ids) {
		const registry = this.getService("elementRegistry");
		const elements = ids.map((id) => registry.get(id)).filter(Boolean);
		this.getService("selection").select(elements);
	}
	onSelectionChanged(cb) {
		const eventBus = this.getService("eventBus");
		const handler = (event) => {
			cb((event.newSelection ?? []).map((el) => el.id));
		};
		eventBus.on("selection.changed", handler);
		return () => eventBus.off("selection.changed", handler);
	}
};
//#endregion
//#region ../../packages/bpmn-modeler/src/elementGeometry.ts
function centreOf(element) {
	if (typeof element.x === "number" && typeof element.y === "number") return {
		x: element.x + (element.width ?? 0) / 2,
		y: element.y + (element.height ?? 0) / 2
	};
	const wps = element.waypoints;
	if (wps && wps.length > 0) {
		let minX = wps[0].x;
		let maxX = wps[0].x;
		let minY = wps[0].y;
		let maxY = wps[0].y;
		for (let i = 1; i < wps.length; i++) {
			const p = wps[i];
			if (p.x < minX) minX = p.x;
			if (p.x > maxX) maxX = p.x;
			if (p.y < minY) minY = p.y;
			if (p.y > maxY) maxY = p.y;
		}
		return {
			x: (minX + maxX) / 2,
			y: (minY + maxY) / 2
		};
	}
}
//#endregion
//#region ../../packages/bpmn-modeler/src/viewport.ts
var MIN_FOCUS_ZOOM = .75;
var FIT_MARGIN = 40;
var UNMEASURED_PALETTE_EDGE = 30;
var CanvasViewportManager = class {
	constructor(getService) {
		_defineProperty(this, "getService", void 0);
		_defineProperty(this, "latch", new InitialViewportLatch({
			applyViewport: (viewport) => this.setViewport(viewport),
			fitViewport: () => this.fitViewport()
		}));
		this.getService = getService;
	}
	getViewport() {
		const { x, y, width, height, scale } = this.getService("canvas").viewbox();
		return {
			x,
			y,
			width,
			height,
			scale
		};
	}
	isCanvasSized() {
		const { outer } = this.getService("canvas").viewbox();
		return outer.width >= 40 && outer.height >= 40;
	}
	setViewport(viewport) {
		if (!isUsableViewbox(viewport)) {
			const fitted = this.fitViewport();
			if (fitted) this.latch.markDecided();
			return fitted;
		}
		if (!this.isCanvasSized()) {
			this.latch.hold(viewport);
			return false;
		}
		const canvas = this.getService("canvas");
		if (viewport.scale !== void 0 && Number.isFinite(viewport.scale) && viewport.scale > 0) {
			const { outer } = canvas.viewbox();
			canvas.viewbox({
				x: viewport.x,
				y: viewport.y,
				width: outer.width / viewport.scale,
				height: outer.height / viewport.scale
			});
		} else canvas.viewbox(viewport);
		this.latch.markDecided();
		return true;
	}
	applyInitialViewportOnce() {
		return this.latch.applyOnce();
	}
	resetInitialViewportDecision() {
		this.latch.reset();
	}
	fitViewport() {
		const canvas = this.getService("canvas");
		const { inner, outer } = canvas.viewbox();
		if (!this.isCanvasSized()) return false;
		if (!inner.width || !inner.height) {
			canvas.zoom("fit-viewport");
			return true;
		}
		const maxInsetX = outer.width / 4;
		const maxInsetY = outer.height / 4;
		const inset = {
			top: Math.min(FIT_MARGIN, maxInsetY),
			right: Math.min(FIT_MARGIN, maxInsetX),
			bottom: Math.min(FIT_MARGIN, maxInsetY),
			left: Math.min(paletteRightEdge(canvas.getContainer()) + FIT_MARGIN, maxInsetX)
		};
		const availableWidth = outer.width - inset.left - inset.right;
		const availableHeight = outer.height - inset.top - inset.bottom;
		const scale = Math.min(1, availableWidth / inner.width, availableHeight / inner.height);
		const marginX = inset.left + (availableWidth - inner.width * scale) / 2;
		const marginY = inset.top + (availableHeight - inner.height * scale) / 2;
		canvas.viewbox({
			x: inner.x - marginX / scale,
			y: inner.y - marginY / scale,
			width: outer.width / scale,
			height: outer.height / scale
		});
		return true;
	}
	centerOnElement(id) {
		const canvas = this.getService("canvas");
		const element = this.getService("elementRegistry").get(id);
		if (!element) return false;
		const centre = centreOf(element);
		if (!centre) return false;
		if (!this.isCanvasSized()) return false;
		const viewbox = canvas.viewbox();
		const scale = viewbox.width > 0 ? viewbox.outer.width / viewbox.width : MIN_FOCUS_ZOOM;
		const width = scale < MIN_FOCUS_ZOOM ? viewbox.outer.width / MIN_FOCUS_ZOOM : viewbox.width;
		const height = scale < MIN_FOCUS_ZOOM ? viewbox.outer.height / MIN_FOCUS_ZOOM : viewbox.height;
		canvas.viewbox({
			x: centre.x - width / 2,
			y: centre.y - height / 2,
			width,
			height
		});
		this.latch.markDecided();
		return true;
	}
	onViewportChanged(cb) {
		return subscribeViewboxChanged({
			eventBus: this.getService("eventBus"),
			map: ({ x, y, width, height, scale }) => ({
				x,
				y,
				width,
				height,
				scale
			}),
			onChange: cb
		});
	}
};
function subscribeViewboxChanged(options) {
	const { eventBus, debounceMs = 100, accept, map, onChange } = options;
	let timer;
	const handler = (event) => {
		if (accept && !accept(event)) {
			clearTimeout(timer);
			return;
		}
		const viewport = map(event.viewbox);
		if (!isUsableViewbox(viewport)) return;
		clearTimeout(timer);
		timer = setTimeout(() => onChange(viewport), debounceMs);
	};
	const dispose = () => {
		clearTimeout(timer);
		eventBus.off("canvas.viewbox.changed", handler);
		eventBus.off("diagram.destroy", dispose);
	};
	eventBus.on("canvas.viewbox.changed", handler);
	eventBus.on("diagram.destroy", dispose);
	return dispose;
}
function paletteRightEdge(container) {
	const palette = container.querySelector(".djs-palette");
	if (!palette) return UNMEASURED_PALETTE_EDGE;
	return palette.getBoundingClientRect().right - container.getBoundingClientRect().left;
}
//#endregion
//#region ../../packages/bpmn-modeler/src/viewState.ts
var SurfaceView = class {
	constructor(getService) {
		_defineProperty(this, "getService", void 0);
		_defineProperty(this, "viewport", void 0);
		_defineProperty(this, "selection", void 0);
		_defineProperty(this, "rootElement", void 0);
		_defineProperty(this, "initialFitObserver", new MutableDisposable());
		this.getService = getService;
		this.viewport = new CanvasViewportManager(getService);
		this.selection = new ElementSelectionManager(getService);
		this.rootElement = new CanvasRootElementManager(getService);
	}
	diagramLoaded() {
		this.initialFitObserver.set(armInitialViewportPolicy(this.getService("canvas"), this.viewport));
	}
	capture() {
		return {
			rootElementId: this.rootElement.getRootElementId(),
			viewport: this.viewport.getViewport(),
			selectedElementIds: this.selection.getSelectedElementIds()
		};
	}
	apply(state) {
		this.rootElement.setRootElementById(state.rootElementId);
		this.viewport.setViewport(state.viewport);
		this.selection.selectElementsByIds(state.selectedElementIds);
	}
	dispose() {
		this.initialFitObserver.dispose();
	}
};
var AFTER_DRILLDOWN_CENTERING = 500;
var DrilldownFit = class {
	constructor(eventBus, injector) {
		_defineProperty(this, "seen", new Set());
		_defineProperty(this, "viewport", void 0);
		this.viewport = new CanvasViewportManager((name) => injector.get(name));
		eventBus.on("root.set", AFTER_DRILLDOWN_CENTERING, ({ element }) => this.onRootSet(element));
		eventBus.on("diagram.clear", () => this.seen.clear());
	}
	onRootSet(root) {
		if (!root || !isSubProcessPlane(root) || this.seen.has(root.id)) return;
		this.seen.add(root.id);
		this.viewport.fitViewport();
	}
};
_defineProperty(DrilldownFit, "$inject", ["eventBus", "injector"]);
function isSubProcessPlane(root) {
	const businessObject = root.businessObject;
	return typeof businessObject?.$instanceOf === "function" && businessObject.$instanceOf("bpmn:SubProcess");
}
var DrilldownFitModule = {
	__init__: ["drilldownFit"],
	drilldownFit: ["type", DrilldownFit]
};
//#endregion
//#region ../../packages/bpmn-modeler/src/surfaceCore.ts
var THEME_ATTRIBUTE = "data-bpmn-theme";
var SurfaceCore = class {
	constructor(container, themeRoots) {
		_defineProperty(this, "container", void 0);
		_defineProperty(this, "themeRoots", void 0);
		_defineProperty(this, "liveInstance", void 0);
		_defineProperty(this, "view", void 0);
		_defineProperty(this, "themeController", void 0);
		this.container = container;
		this.themeRoots = themeRoots;
	}
	get instance() {
		if (!this.liveInstance) throw new NoModelerError();
		return this.liveInstance;
	}
	get viewport() {
		return this.liveView().viewport;
	}
	get selection() {
		return this.liveView().selection;
	}
	get rootElement() {
		return this.liveView().rootElement;
	}
	allocate(store, construct, focus) {
		try {
			this.liveInstance = construct();
		} catch (error) {
			this.container.replaceChildren();
			throw error;
		}
		store.add(() => {
			this.liveInstance?.destroy();
			this.liveInstance = void 0;
		});
		const accessor = (name) => this.service(name);
		const view = new SurfaceView(accessor);
		this.view = view;
		store.add(() => view.dispose());
		store.add(installSurfaceFocusFeatures(accessor, focus));
	}
	releaseManagers() {
		this.view = void 0;
	}
	service(name) {
		return this.instance.get(name);
	}
	optionalService(name) {
		return this.instance.get(name, false) ?? void 0;
	}
	captureViewState() {
		return this.liveView().capture();
	}
	applyViewState(state) {
		this.liveView().apply(state);
	}
	hasPendingInput() {
		return this.panelInput()?.hasPending() ?? false;
	}
	flushPendingInput() {
		this.panelInput()?.flush();
	}
	armInitialViewport() {
		this.liveView().diagramLoaded();
	}
	setTheme(store, theme) {
		if (store.isDisposed) return;
		if (!this.themeController) {
			this.themeController = new ThemeController(this.themeRoots, THEME_ATTRIBUTE);
			store.add(() => {
				this.themeController?.dispose();
				this.themeController = void 0;
			});
		}
		this.themeController.setMode(theme);
	}
	panelInput() {
		return this.liveInstance?.get("debounceInput", false) ?? void 0;
	}
	liveView() {
		if (!this.view) throw new NoModelerError();
		return this.view;
	}
};
//#endregion
//#region ../../packages/bpmn-modeler/src/createSurface.ts
async function createSurface(allocate, applyInitialOptions) {
	const surface = allocate();
	try {
		await applyInitialOptions(surface);
		return surface;
	} catch (error) {
		try {
			surface.destroy();
		} catch {}
		throw error;
	}
}
//#endregion
export { hasExternalLabel as A, isInterrupting$1 as B, getCirclePath as C, DEFAULT_LABEL_SIZE as D, getElementAnnotations as E, hasEscalationEventDefinition as F, SimpleBpmnModdle as H, hasEventDefinition as I, isEventSubProcess$1 as L, setLabel as M, hasCompensateEventDefinition as N, getExternalLabelMid as O, hasErrorEventDefinition as P, isExpanded as R, toPlaneId as S, collectElementsAnnotations as T, dist_exports as U, BaseViewer as V, keep_selection_visible_default as _, exportSvg as a, getShapeIdFromPlane as b, base_default as c, TOGGLE_MODE_EVENT as d, CustomGroupsModule as f, NavigatedViewer as g, outline_default as h, exportFormattedXml as i, isLabelExternal as j, getLabel as k, ToggleOffIcon as l, FlushableDebounceInputModule as m, SurfaceCore as n, importDiagram as o, ModeFilterModule as p, DrilldownFitModule as r, createModelNavigationModule as s, createSurface as t, ToggleOnIcon as u, Viewer as v, getRoundRectPath as w, isPlane as x, getPlaneIdFromShape as y, isHorizontal as z };

//# sourceMappingURL=createSurface-B_CjPoQd.js.map