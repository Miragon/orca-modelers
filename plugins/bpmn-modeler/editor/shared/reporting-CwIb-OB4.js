const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./createSurface-DyHVIhQM.js","./rolldown-runtime-DQp2zzRu.js","./editorLayout-DZwh-cxt.js","./editorLayout-ThHr9A18.css","./jsxRuntime.module-awBdvHUy.js","./EscapeUtil-B1jzPlMc.js","../bpmn/main.js","./bpmn-DUImDDdd.css","./ModelUtil-BGe9jbj7.js","./dist-CpxBSnUu.js"])))=>i.map(i=>d[i]);
import { r as __exportAll } from "./rolldown-runtime-DQp2zzRu.js";
import { m as _defineProperty, u as asyncDebounce } from "./editorLayout-DZwh-cxt.js";
import { A as hasExternalLabel, B as isInterrupting, C as getCirclePath, D as DEFAULT_LABEL_SIZE, E as getElementAnnotations, F as hasEscalationEventDefinition, I as hasEventDefinition$2, L as isEventSubProcess, M as setLabel, N as hasCompensateEventDefinition, O as getExternalLabelMid, P as hasErrorEventDefinition, R as isExpanded, S as toPlaneId, T as collectElementsAnnotations, V as BaseViewer, _ as keep_selection_visible_default, b as getShapeIdFromPlane, c as base_default, d as TOGGLE_MODE_EVENT, g as NavigatedViewer, h as outline_default, j as isLabelExternal, k as getLabel, l as ToggleOffIcon, u as ToggleOnIcon, v as Viewer, w as getRoundRectPath, x as isPlane, y as getPlaneIdFromShape, z as isHorizontal$1 } from "./createSurface-DyHVIhQM.js";
import { A as isCmd, At as getParents$1, B as delta, Bt as clear, C as outline_default$1, Ct as add, D as KeyboardBindings$1, Dt as getBBox, E as keyboard_default$1, Et as eachElement, Ft as updateLine, G as hasPrimaryModifier, H as IdGenerator, Ht as create, I as set, It as append, Jt as all, K as hasSecondaryModifier, Kt as e, Mt as selfAndChildren, O as context_pad_default$1, P as movecanvas_default, Pt as createLine, R as zoomscroll_default, Rt as attr, St as pointsOnLine, T as keyboard_move_default, Tt as remove, U as selection_default, Wt as remove$1, Xt as attr$1, Yt as assign, Z as translate_default, Zt as classes$1, bt as pointInRect, ct as asTRBL, dt as getMid, en as delegate, ft as getOrientation, gt as isLabel, hn as subscribe, ht as isConnection, in as remove$2, it as ElementFactory$1, jt as selfAndAllChildren, k as CommandInterceptor, kt as getEnclosedElements, l as h, mt as roundPoint, n as A, nt as translate, pn as DisposableStore, pt as roundBounds, qt as Ids, rn as query, rt as getVisual, s as d, t as u$1, tn as event, ut as getElementLineIntersection, w as change_support_default, wt as indexOf, xt as pointsAligned, yt as pointDistance, zt as classes } from "./jsxRuntime.module-awBdvHUy.js";
import { t as __vitePreload } from "../bpmn/main.js";
import { A as pick, B as without, C as isObject, D as map, E as keys, F as sortBy, L as unionBy, O as matchPattern, P as some, S as isNumber, T as isUndefined, _ as init_dist, c as every, d as findIndex, f as flatten, g as has, h as groupBy, i as assign$1, j as reduce, k as omit, l as filter, p as forEach, r as domify, t as escapeCSS, u as find, v as isArray, w as isString, x as isNil, y as isDefined, z as values } from "./EscapeUtil-B1jzPlMc.js";
import { $ as isSnapped, A as editor_actions_default$2, B as d$1, C as saveClear, D as keyboard_move_selection_default, F as popup_menu_default$1, G as S, H as q, I as search_default$1, J as create_default, K as k, L as A$1, M as distribute_elements_default$1, N as connection_preview_default, O as grid_snapping_default$1, P as replace_default$1, Q as bottomRight, R as T, S as getNewAttachShapeDelta, T as command_default, V as h$1, W as R, X as connect_default, Y as preview_support_default, Z as bendpoints_default, _ as Modeling$1, _t as align_elements_default$1, a as computeChildrenBBox, at as rotateVector, b as getResizedTargetAnchor, c as hand_tool_default, ct as dragging_default, d as tool_manager_default, dt as rules_default$1, et as mid$1, f as palette_default$1, ft as AutoResize, g as BaseLayouter, gt as getConnectedDistance, h as CroppingConnectionDocking, ht as generateGetNextPosition, i as resize_default, it as getDistancePointPoint, j as EditorActions$1, l as lasso_tool_default, lt as AutoResizeProvider, m as move_default, mt as findFreePosition, n as snapping_default$1, nt as topLeft, o as resizeTRBL, ot as getApproxIntersection, p as OrderingProvider, pt as auto_place_default$1, q as l, r as CreateMoveSnapping, rt as getAngle, s as substractTRBL, st as auto_scroll_default, t as clipboard_default, tt as setSnapped, u as mouse_default, ut as RuleProvider, v as getDirection, vt as search_pad_default, w as lib_default$1, x as getNewAttachPoint, y as getResizedSourceAnchor, z as _ } from "./clipboard-Bznk3d97.js";
import { a as is, i as init_ModelUtil, n as getBusinessObject, o as isAny, r as getDi } from "./ModelUtil-BGe9jbj7.js";
// ../../libs/modeler-types/src/textEditingSurface.ts
function isTextEditingSurface(el) {
	if (el instanceof HTMLInputElement) return true;
	if (el instanceof HTMLTextAreaElement) return true;
	if (el instanceof HTMLElement && el.contentEditable === "true") return true;
	return false;
}
// ../../libs/modeler-types/src/workspaceDefinitions.ts
var DEFINITION_KINDS = [
	"message",
	"signal",
	"error",
	"escalation"
];
// ../../node_modules/bpmn-js/lib/BaseModeler.js
function BaseModeler(options) {
	BaseViewer.call(this, options);
	this.on("import.parse.complete", function(event) {
		if (!event.error) this._collectIds(event.definitions, event.elementsById);
	}, this);
	this.on("diagram.destroy", function() {
		this.get("moddle").ids.clear();
	}, this);
}
e(BaseModeler, BaseViewer);
BaseModeler.prototype._createModdle = function(options) {
	var moddle = BaseViewer.prototype._createModdle.call(this, options);
	moddle.ids = new Ids([
		32,
		36,
		1
	]);
	return moddle;
};
BaseModeler.prototype._collectIds = function(definitions, elementsById) {
	var ids = definitions.$model.ids, id;
	ids.clear();
	for (id in elementsById) ids.claim(id, elementsById[id]);
};
// ../../node_modules/bpmn-js/lib/features/align-elements/AlignElementsIcons.js
init_dist();
var icons$1 = {
	align: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000">
              <line x1="200" y1="150" x2="200" y2="1850" style="stroke:currentColor;stroke-width:100;stroke-linecap:round;"/>
              <rect x="500" y="150" width="1300" height="700" rx="1" style="fill:none;stroke:currentColor;stroke-width:100;"></rect>
              <rect x="500" y="1150" width="700" height="700" rx="1" style="fill:currentColor;stroke:currentColor;stroke-width:100;opacity:.5;"></rect>
          </svg>`,
	bottom: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1800">
            <line x1="150" y1="1650" x2="1650" y2="1650" style="stroke:currentColor;stroke-width:100;stroke-linecap:round;"/>
            <rect x="150" y="350" width="600" height="1300" rx="1" style="fill:none;stroke:currentColor;stroke-width:100;"></rect>
            <rect x="1050" y="850" width="600" height="800" rx="1" style="fill:currentColor;stroke:currentColor;stroke-width:100;opacity:.5;"></rect>
          </svg>`,
	center: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1800">
            <line x1="900" y1="150" x2="900" y2="1650" style="stroke:currentColor;stroke-width:100;stroke-linecap:round;"/>
            <rect x="250" y="150" width="1300" height="600" rx="1" style="fill:none;stroke:currentColor;stroke-width:100;"></rect>
            <rect x="500" y="1050" width="800" height="600" rx="1" style="fill:currentColor;stroke:currentColor;stroke-width:100;opacity:.5;"></rect>
          </svg>`,
	left: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1800">
            <line x1="100" y1="150" x2="100" y2="1650" style="stroke:currentColor;stroke-width:100;stroke-linecap:round;"/>
            <rect x="100" y="150" width="1300" height="600" rx="1" style="fill:none;stroke:currentColor;stroke-width:100;"></rect>
            <rect x="100" y="1050" width="800" height="600" rx="1" style="fill:currentColor;stroke:currentColor;stroke-width:100;opacity:.5;"></rect>
          </svg>`,
	right: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1800">
            <line x1="1650" y1="150" x2="1650" y2="1650" style="stroke:currentColor;stroke-width:100;stroke-linecap:round;"/>
            <rect x="350" y="150" width="1300" height="600" rx="1" style="fill:none;stroke:currentColor;stroke-width:100;"></rect>
            <rect x="850" y="1050" width="800" height="600" rx="1" style="fill:currentColor;stroke:currentColor;stroke-width:100;opacity:.5;"></rect>
          </svg>`,
	top: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1800">
            <line x1="150" y1="150" x2="1650" y2="150" style="stroke:currentColor;stroke-width:100;stroke-linecap:round;"/>
            <rect x="150" y="150" width="600" height="1300" rx="1" style="fill:none;stroke:currentColor;stroke-width:100;"></rect>
            <rect x="1050" y="150" width="600" height="800" rx="1" style="fill:currentColor;stroke:currentColor;stroke-width:100;opacity:.5;"></rect>
          </svg>`,
	middle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1800">
            <line x1="150" y1="900" x2="1650" y2="900" style="stroke:currentColor;stroke-width:100;stroke-linecap:round;"/>
            <rect x="150" y="250" width="600" height="1300" rx="1" style="fill:none;stroke:currentColor;stroke-width:100;"></rect>
            <rect x="1050" y="500" width="600" height="800" rx="1" style="fill:currentColor;stroke:currentColor;stroke-width:100;opacity:.5;"></rect>
          </svg>`
};
// ../../node_modules/bpmn-js/lib/features/align-elements/AlignElementsContextPadProvider.js
var LOW_PRIORITY$15 = 900;
function AlignElementsContextPadProvider(contextPad, popupMenu, translate, canvas) {
	contextPad.registerProvider(LOW_PRIORITY$15, this);
	this._contextPad = contextPad;
	this._popupMenu = popupMenu;
	this._translate = translate;
	this._canvas = canvas;
}
AlignElementsContextPadProvider.$inject = [
	"contextPad",
	"popupMenu",
	"translate",
	"canvas"
];
AlignElementsContextPadProvider.prototype.getMultiElementContextPadEntries = function(elements) {
	var actions = {};
	if (this._isAllowed(elements)) assign$1(actions, this._getEntries(elements));
	return actions;
};
AlignElementsContextPadProvider.prototype._isAllowed = function(elements) {
	return !this._popupMenu.isEmpty(elements, "align-elements");
};
AlignElementsContextPadProvider.prototype._getEntries = function() {
	var self = this;
	return { "align-elements": {
		group: "align-elements",
		title: self._translate("Align elements"),
		html: `<div class="entry">${icons$1["align"]}</div>`,
		action: { click: function(event, target) {
			var position = self._getMenuPosition(target);
			assign$1(position, { cursor: {
				x: event.x,
				y: event.y
			} });
			self._popupMenu.open(target, "align-elements", position);
		} }
	} };
};
AlignElementsContextPadProvider.prototype._getMenuPosition = function(elements) {
	var Y_OFFSET = 5;
	var padRect = this._contextPad.getPad(elements).html.getBoundingClientRect();
	return {
		x: padRect.left,
		y: padRect.bottom + Y_OFFSET
	};
};
// ../../node_modules/bpmn-js/lib/features/align-elements/AlignElementsMenuProvider.js
init_dist();
var ALIGNMENT_OPTIONS = [
	"left",
	"center",
	"right",
	"top",
	"middle",
	"bottom"
];
function AlignElementsMenuProvider(popupMenu, alignElements, translate, rules) {
	this._alignElements = alignElements;
	this._translate = translate;
	this._popupMenu = popupMenu;
	this._rules = rules;
	popupMenu.registerProvider("align-elements", this);
}
AlignElementsMenuProvider.$inject = [
	"popupMenu",
	"alignElements",
	"translate",
	"rules"
];
AlignElementsMenuProvider.prototype.getPopupMenuEntries = function(target) {
	var entries = {};
	if (this._isAllowed(target)) assign$1(entries, this._getEntries(target));
	return entries;
};
AlignElementsMenuProvider.prototype._isAllowed = function(target) {
	return this._rules.allowed("elements.align", { elements: target });
};
AlignElementsMenuProvider.prototype._getEntries = function(target) {
	var alignElements = this._alignElements, translate = this._translate, popupMenu = this._popupMenu;
	var entries = {};
	forEach(ALIGNMENT_OPTIONS, function(alignment) {
		entries["align-elements-" + alignment] = {
			group: "align",
			title: translate("Align elements " + alignment),
			className: "bjs-align-elements-menu-entry",
			imageHtml: icons$1[alignment],
			action: function() {
				alignElements.trigger(target, alignment);
				popupMenu.close();
			}
		};
	});
	return entries;
};
// ../../node_modules/bpmn-js/lib/features/align-elements/BpmnAlignElements.js
init_dist();
function BpmnAlignElements(eventBus) {
	RuleProvider.call(this, eventBus);
}
BpmnAlignElements.$inject = ["eventBus"];
e(BpmnAlignElements, RuleProvider);
BpmnAlignElements.prototype.init = function() {
	this.addRule("elements.align", function(context) {
		var elements = context.elements;
		var filteredElements = filter(elements, function(element) {
			return !(element.waypoints || element.host || element.labelTarget);
		});
		filteredElements = getParents$1(filteredElements);
		if (filteredElements.length < 2) return false;
		return filteredElements;
	});
};
// ../../node_modules/bpmn-js/lib/features/align-elements/index.js
var align_elements_default = {
	__depends__: [
		align_elements_default$1,
		context_pad_default$1,
		popup_menu_default$1
	],
	__init__: [
		"alignElementsContextPadProvider",
		"alignElementsMenuProvider",
		"bpmnAlignElements"
	],
	alignElementsContextPadProvider: ["type", AlignElementsContextPadProvider],
	alignElementsMenuProvider: ["type", AlignElementsMenuProvider],
	bpmnAlignElements: ["type", BpmnAlignElements]
};
// ../../node_modules/bpmn-js/lib/features/modeling/util/ModelingUtil.js
init_dist();
init_ModelUtil();
function getParent(element, anyType) {
	if (isString(anyType)) anyType = [anyType];
	while (element = element.parent) if (isAny(element, anyType)) return element;
	return null;
}
function isDirectionHorizontal(element, elementRegistry) {
	var parent = getParent(element, "bpmn:Process");
	if (parent) return true;
	var types = ["bpmn:Participant", "bpmn:Lane"];
	parent = getParent(element, types);
	if (parent) return isHorizontal$1(parent);
	else if (isAny(element, types)) return isHorizontal$1(element);
	var process = getBusinessObject(element);
	for (; process; process = process.$parent) if (is(process, "bpmn:Process")) break;
	if (!elementRegistry) return true;
	var pool = elementRegistry.find(function(shape) {
		var businessObject = getBusinessObject(shape);
		return businessObject && businessObject.get("processRef") === process;
	});
	if (!pool) return true;
	return isHorizontal$1(pool);
}
// ../../node_modules/bpmn-js/lib/features/auto-place/BpmnAutoPlaceUtil.js
init_ModelUtil();
function getNewShapePosition(source, element, elementRegistry) {
	var placeHorizontally = isDirectionHorizontal(source, elementRegistry);
	if (is(element, "bpmn:TextAnnotation")) return getTextAnnotationPosition(source, element, placeHorizontally);
	if (isAny(element, ["bpmn:DataObjectReference", "bpmn:DataStoreReference"])) return getDataElementPosition(source, element, placeHorizontally);
	if (is(element, "bpmn:FlowNode")) return getFlowNodePosition(source, element, placeHorizontally);
}
function getFlowNodePosition(source, element, placeHorizontally) {
	var sourceTrbl = asTRBL(source);
	var sourceMid = getMid(source);
	var placement = placeHorizontally ? {
		directionHint: "e",
		minDistance: 80,
		baseOrientation: "left",
		boundaryOrientation: "top",
		start: "top",
		end: "bottom"
	} : {
		directionHint: "s",
		minDistance: 90,
		baseOrientation: "top",
		boundaryOrientation: "left",
		start: "left",
		end: "right"
	};
	var connectedDistance = getConnectedDistance(source, {
		filter: function(connection) {
			return is(connection, "bpmn:SequenceFlow");
		},
		direction: placement.directionHint
	});
	var margin = 30, minDistance = placement.minDistance, orientation = placement.baseOrientation;
	if (is(source, "bpmn:BoundaryEvent")) {
		orientation = getOrientation(source, source.host, -25);
		if (orientation.indexOf(placement.boundaryOrientation) !== -1) margin *= -1;
	}
	var position = placeHorizontally ? {
		x: sourceTrbl.right + connectedDistance + element.width / 2,
		y: sourceMid.y + getDistance$2(orientation, minDistance, placement)
	} : {
		x: sourceMid.x + getDistance$2(orientation, minDistance, placement),
		y: sourceTrbl.bottom + connectedDistance + element.height / 2
	};
	var nextPosition = {
		margin,
		minDistance
	};
	return findFreePosition(source, element, position, generateGetNextPosition(placeHorizontally ? { y: nextPosition } : { x: nextPosition }));
}
function getDistance$2(orientation, minDistance, placement) {
	if (orientation.includes(placement.start)) return -1 * minDistance;
	else if (orientation.includes(placement.end)) return minDistance;
	else return 0;
}
function getTextAnnotationPosition(source, element, placeHorizontally) {
	var sourceTrbl = asTRBL(source);
	var position = placeHorizontally ? {
		x: sourceTrbl.right + element.width / 2,
		y: sourceTrbl.top - 50 - element.height / 2
	} : {
		x: sourceTrbl.right + 50 + element.width / 2,
		y: sourceTrbl.bottom + element.height / 2
	};
	if (isConnection(source)) {
		position = getMid(source);
		if (placeHorizontally) {
			position.x += 100;
			position.y -= 50;
		} else {
			position.x += 100;
			position.y += 50;
		}
	}
	var nextPosition = {
		margin: placeHorizontally ? -30 : 30,
		minDistance: 20
	};
	return findFreePosition(source, element, position, generateGetNextPosition(placeHorizontally ? { y: nextPosition } : { x: nextPosition }));
}
function getDataElementPosition(source, element, placeHorizontally) {
	var sourceTrbl = asTRBL(source);
	var position = placeHorizontally ? {
		x: sourceTrbl.right - 10 + element.width / 2,
		y: sourceTrbl.bottom + 40 + element.width / 2
	} : {
		x: sourceTrbl.left - 40 - element.width / 2,
		y: sourceTrbl.bottom - 10 + element.height / 2
	};
	var nextPosition = {
		margin: 30,
		minDistance: 30
	};
	return findFreePosition(source, element, position, generateGetNextPosition(placeHorizontally ? { x: nextPosition } : { y: nextPosition }));
}
// ../../node_modules/bpmn-js/lib/features/auto-place/BpmnAutoPlace.js
function AutoPlace(eventBus, elementRegistry) {
	eventBus.on("autoPlace", function(context) {
		var shape = context.shape, source = context.source;
		return getNewShapePosition(source, shape, elementRegistry);
	});
}
AutoPlace.$inject = ["eventBus", "elementRegistry"];
// ../../node_modules/bpmn-js/lib/features/auto-place/index.js
var auto_place_default = {
	__depends__: [auto_place_default$1],
	__init__: ["bpmnAutoPlace"],
	bpmnAutoPlace: ["type", AutoPlace]
};
// ../../node_modules/bpmn-js/lib/features/auto-resize/BpmnAutoResize.js
init_ModelUtil();
function BpmnAutoResize(injector) {
	injector.invoke(AutoResize, this);
}
BpmnAutoResize.$inject = ["injector"];
e(BpmnAutoResize, AutoResize);
BpmnAutoResize.prototype.resize = function(target, newBounds, hints) {
	if (is(target, "bpmn:Participant")) this._modeling.resizeLane(target, newBounds, null, hints);
	else this._modeling.resizeShape(target, newBounds, null, hints);
};
// ../../node_modules/bpmn-js/lib/features/auto-resize/BpmnAutoResizeProvider.js
init_ModelUtil();
init_dist();
function BpmnAutoResizeProvider(eventBus, modeling) {
	AutoResizeProvider.call(this, eventBus);
	this._modeling = modeling;
}
e(BpmnAutoResizeProvider, AutoResizeProvider);
BpmnAutoResizeProvider.$inject = ["eventBus", "modeling"];
BpmnAutoResizeProvider.prototype.canResize = function(elements, target) {
	if (is(target.di, "bpmndi:BPMNPlane")) return false;
	if (!is(target, "bpmn:Participant") && !is(target, "bpmn:Lane") && !is(target, "bpmn:SubProcess")) return false;
	var canResize = true;
	forEach(elements, function(element) {
		if (is(element, "bpmn:Lane") || isLabel(element)) {
			canResize = false;
			return;
		}
	});
	return canResize;
};
// ../../node_modules/bpmn-js/lib/features/auto-resize/index.js
var auto_resize_default = {
	__init__: ["bpmnAutoResize", "bpmnAutoResizeProvider"],
	bpmnAutoResize: ["type", BpmnAutoResize],
	bpmnAutoResizeProvider: ["type", BpmnAutoResizeProvider]
};
// ../../node_modules/diagram-js/lib/features/complex-preview/ComplexPreview.js
var LAYER_NAME = "complex-preview";
var ComplexPreview = class {
	constructor(canvas, graphicsFactory, previewSupport) {
		this._canvas = canvas;
		this._graphicsFactory = graphicsFactory;
		this._previewSupport = previewSupport;
		this._markers = [];
	}
	create(options) {
		this.cleanUp();
		const { created = [], moved = [], removed = [], resized = [] } = options;
		const layer = this._canvas.getLayer(LAYER_NAME);
		created.filter((element) => !isHidden(element)).forEach((element) => {
			let gfx;
			if (isConnection(element)) {
				gfx = this._graphicsFactory._createContainer("connection", create("g"));
				this._graphicsFactory.drawConnection(getVisual(gfx), element);
			} else {
				gfx = this._graphicsFactory._createContainer("shape", create("g"));
				this._graphicsFactory.drawShape(getVisual(gfx), element);
				translate(gfx, element.x, element.y);
			}
			this._previewSupport.addDragger(element, layer, gfx);
		});
		moved.forEach(({ element, delta }) => {
			this._previewSupport.addDragger(element, layer, void 0, "djs-dragging");
			this._canvas.addMarker(element, "djs-element-hidden");
			this._markers.push([element, "djs-element-hidden"]);
			const dragger = this._previewSupport.addDragger(element, layer);
			if (isConnection(element)) translate(dragger, delta.x, delta.y);
			else translate(dragger, element.x + delta.x, element.y + delta.y);
		});
		removed.forEach((element) => {
			this._previewSupport.addDragger(element, layer, void 0, "djs-dragging");
			this._canvas.addMarker(element, "djs-element-hidden");
			this._markers.push([element, "djs-element-hidden"]);
		});
		resized.forEach(({ shape, bounds }) => {
			this._canvas.addMarker(shape, "djs-hidden");
			this._markers.push([shape, "djs-hidden"]);
			this._previewSupport.addDragger(shape, layer, void 0, "djs-dragging");
			const gfx = this._graphicsFactory._createContainer("shape", create("g"));
			this._graphicsFactory.drawShape(getVisual(gfx), shape, {
				width: bounds.width,
				height: bounds.height
			});
			translate(gfx, bounds.x, bounds.y);
			this._previewSupport.addDragger(shape, layer, gfx);
		});
	}
	cleanUp() {
		clear(this._canvas.getLayer(LAYER_NAME));
		this._markers.forEach(([element, marker]) => this._canvas.removeMarker(element, marker));
		this._markers = [];
	}
	show() {
		this._canvas.showLayer(LAYER_NAME);
	}
	hide() {
		this._canvas.hideLayer(LAYER_NAME);
	}
};
ComplexPreview.$inject = [
	"canvas",
	"graphicsFactory",
	"previewSupport"
];
function isHidden(element) {
	return element.hidden;
}
// ../../node_modules/diagram-js/lib/features/complex-preview/index.js
var complex_preview_default = {
	__depends__: [preview_support_default],
	__init__: ["complexPreview"],
	complexPreview: ["type", ComplexPreview]
};
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/AdaptiveLabelPositioningBehavior.js
init_ModelUtil();
var ALIGNMENTS = [
	"top",
	"bottom",
	"left",
	"right"
];
var ELEMENT_LABEL_DISTANCE = 10;
function AdaptiveLabelPositioningBehavior(eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	this.postExecuted([
		"connection.create",
		"connection.layout",
		"connection.updateWaypoints"
	], function(event) {
		var context = event.context, connection = context.connection, source = connection.source, target = connection.target;
		if ((context.hints || {}).createElementsBehavior !== false) {
			checkLabelAdjustment(source);
			checkLabelAdjustment(target);
		}
	});
	this.postExecuted(["label.create"], function(event) {
		var context = event.context, shape = context.shape;
		if ((context.hints || {}).createElementsBehavior !== false) checkLabelAdjustment(shape.labelTarget);
	});
	this.postExecuted(["elements.create"], function(event) {
		var context = event.context, elements = context.elements;
		if ((context.hints || {}).createElementsBehavior !== false) elements.forEach(function(element) {
			checkLabelAdjustment(element);
		});
	});
	function checkLabelAdjustment(element) {
		if (!hasExternalLabel(element)) return;
		if (isConnection(element)) return;
		if (is(element, "bpmn:Group")) return;
		var optimalPosition = getOptimalPosition(element);
		if (!optimalPosition) return;
		adjustLabelPosition(element, optimalPosition);
	}
	function adjustLabelPosition(element, orientation) {
		var elementMid = getMid(element), label = element.label, labelMid = getMid(label);
		if (!label.parent) return;
		var elementTrbl = asTRBL(element);
		var newLabelMid;
		switch (orientation) {
			case "top":
				newLabelMid = {
					x: elementMid.x,
					y: elementTrbl.top - ELEMENT_LABEL_DISTANCE - label.height / 2
				};
				break;
			case "left":
				newLabelMid = {
					x: elementTrbl.left - ELEMENT_LABEL_DISTANCE - label.width / 2,
					y: elementMid.y
				};
				break;
			case "bottom":
				newLabelMid = {
					x: elementMid.x,
					y: elementTrbl.bottom + ELEMENT_LABEL_DISTANCE + label.height / 2
				};
				break;
			case "right": newLabelMid = {
				x: elementTrbl.right + ELEMENT_LABEL_DISTANCE + label.width / 2,
				y: elementMid.y
			};
		}
		var delta$1 = delta(newLabelMid, labelMid);
		modeling.moveShape(label, delta$1);
	}
}
e(AdaptiveLabelPositioningBehavior, CommandInterceptor);
AdaptiveLabelPositioningBehavior.$inject = ["eventBus", "modeling"];
function getTakenHostAlignments(element) {
	var hostElement = element.host, elementMid = getMid(element), hostOrientation = getOrientation(elementMid, hostElement);
	var freeAlignments;
	if (hostOrientation.indexOf("-") >= 0) freeAlignments = hostOrientation.split("-");
	else freeAlignments = [hostOrientation];
	return ALIGNMENTS.filter(function(alignment) {
		return freeAlignments.indexOf(alignment) === -1;
	});
}
function getTakenConnectionAlignments(element) {
	var elementMid = getMid(element);
	return [].concat(element.incoming.map(function(c) {
		return c.waypoints[c.waypoints.length - 2];
	}), element.outgoing.map(function(c) {
		return c.waypoints[1];
	})).map(function(point) {
		return getApproximateOrientation(elementMid, point);
	});
}
function getOptimalPosition(element) {
	var labelMid = getMid(element.label);
	var labelOrientation = getApproximateOrientation(getMid(element), labelMid);
	if (!isAligned(labelOrientation)) return;
	var takenAlignments = getTakenConnectionAlignments(element);
	if (element.host) {
		var takenHostAlignments = getTakenHostAlignments(element);
		takenAlignments = takenAlignments.concat(takenHostAlignments);
	}
	var freeAlignments = ALIGNMENTS.filter(function(alignment) {
		return takenAlignments.indexOf(alignment) === -1;
	});
	if (freeAlignments.indexOf(labelOrientation) !== -1) {
		if (getOrientation(element.label, element) !== "intersect") return;
		return labelOrientation;
	}
	return freeAlignments[0];
}
function getApproximateOrientation(p0, p1) {
	return getOrientation(p1, p0, 5);
}
function isAligned(orientation) {
	return ALIGNMENTS.indexOf(orientation) !== -1;
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/AppendBehavior.js
init_ModelUtil();
function AppendBehavior(eventBus) {
	CommandInterceptor.call(this, eventBus);
	this.preExecute("shape.append", function(context) {
		var source = context.source, shape = context.shape;
		if (!context.position) {
			if (is(shape, "bpmn:TextAnnotation")) context.position = {
				x: source.x + source.width / 2 + 75,
				y: source.y - 50 - shape.height / 2
			};
			else context.position = {
				x: source.x + source.width + 80 + shape.width / 2,
				y: source.y + source.height / 2
			};
		}
	}, true);
}
e(AppendBehavior, CommandInterceptor);
AppendBehavior.$inject = ["eventBus"];
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/ArtifactBehavior.js
init_ModelUtil();
init_dist();
var HIGH_PRIORITY$16 = 1500;
function ArtifactBehavior(injector, eventBus, canvas) {
	injector.invoke(CommandInterceptor, this);
	this.preExecute("elements.delete", HIGH_PRIORITY$16, function(event) {
		var context = event.context, elements = context.elements;
		var enclosedArtifacts = getEnclosedArtifacts(elements);
		if (enclosedArtifacts.length) context.elements = elements.concat(enclosedArtifacts);
	});
	eventBus.on("shape.move.start", function(event) {
		var shapes = event.context.shapes;
		var enclosedArtifacts = getEnclosedArtifacts(shapes);
		if (enclosedArtifacts.length) event.context.shapes = shapes.concat(enclosedArtifacts);
	});
	function getEnclosedArtifacts(elements) {
		var containerElements = filter(elements, (e) => is(e, "bpmn:Participant") || is(e, "bpmn:SubProcess"));
		if (!containerElements.length) return [];
		var canvasRoot = canvas.getRootElement();
		var remainingArtifacts = new Set(canvasRoot.children.filter((child) => is(child, "bpmn:Artifact")));
		var enclosedArtifacts = new Set();
		forEach(containerElements, (containerElement) => {
			const newEnclosedArtifacts = new Set(values(getEnclosedElements(Array.from(remainingArtifacts), getBBox(containerElement))));
			enclosedArtifacts = enclosedArtifacts.union(newEnclosedArtifacts);
			remainingArtifacts = remainingArtifacts.difference(newEnclosedArtifacts);
		});
		return Array.from(enclosedArtifacts);
	}
}
e(ArtifactBehavior, CommandInterceptor);
ArtifactBehavior.$inject = [
	"injector",
	"eventBus",
	"canvas"
];
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/AssociationBehavior.js
init_ModelUtil();
init_dist();
function AssociationBehavior(injector, modeling) {
	injector.invoke(CommandInterceptor, this);
	this.postExecute("shape.move", function(context) {
		var newParent = context.newParent, shape = context.shape;
		var associations = filter(shape.incoming.concat(shape.outgoing), function(connection) {
			return is(connection, "bpmn:Association");
		});
		forEach(associations, function(association) {
			modeling.moveConnection(association, {
				x: 0,
				y: 0
			}, newParent);
		});
	}, true);
}
e(AssociationBehavior, CommandInterceptor);
AssociationBehavior.$inject = ["injector", "modeling"];
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/AttachEventBehavior.js
init_ModelUtil();
var LOW_PRIORITY$14 = 500;
function AttachEventBehavior(bpmnReplace, injector) {
	injector.invoke(CommandInterceptor, this);
	this._bpmnReplace = bpmnReplace;
	var self = this;
	this.postExecuted("elements.create", LOW_PRIORITY$14, function(context) {
		var elements = context.elements;
		elements = elements.filter(function(shape) {
			var host = shape.host;
			return shouldReplace$1(shape, host);
		});
		if (elements.length !== 1) return;
		elements.map(function(element) {
			return elements.indexOf(element);
		}).forEach(function(index) {
			var host = elements[index];
			context.elements[index] = self._replaceShape(elements[index], host);
		});
	}, true);
	this.preExecute("elements.move", LOW_PRIORITY$14, function(context) {
		var shapes = context.shapes, host = context.newHost;
		if (shapes.length !== 1) return;
		var shape = shapes[0];
		if (shouldReplace$1(shape, host)) context.shapes = [self._replaceShape(shape, host)];
	}, true);
}
AttachEventBehavior.$inject = ["bpmnReplace", "injector"];
e(AttachEventBehavior, CommandInterceptor);
AttachEventBehavior.prototype._replaceShape = function(shape, host) {
	var eventDefinition = getEventDefinition$1(shape);
	var boundaryEvent = {
		type: "bpmn:BoundaryEvent",
		host
	};
	if (eventDefinition) boundaryEvent.eventDefinitionType = eventDefinition.$type;
	return this._bpmnReplace.replaceElement(shape, boundaryEvent, { layoutConnection: false });
};
function getEventDefinition$1(element) {
	var eventDefinitions = getBusinessObject(element).eventDefinitions;
	return eventDefinitions && eventDefinitions[0];
}
function shouldReplace$1(shape, host) {
	return !isLabel(shape) && isAny(shape, ["bpmn:IntermediateThrowEvent", "bpmn:IntermediateCatchEvent"]) && !!host;
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/BoundaryEventBehavior.js
init_ModelUtil();
init_dist();
function BoundaryEventBehavior(eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	function getBoundaryEvents(element) {
		return filter(element.attachers, function(attacher) {
			return is(attacher, "bpmn:BoundaryEvent");
		});
	}
	this.postExecute("connection.create", function(event) {
		var source = event.context.source, target = event.context.target, boundaryEvents = getBoundaryEvents(target);
		if (is(source, "bpmn:EventBasedGateway") && is(target, "bpmn:ReceiveTask") && boundaryEvents.length > 0) modeling.removeElements(boundaryEvents);
	});
	this.postExecute("connection.reconnect", function(event) {
		var oldSource = event.context.oldSource, newSource = event.context.newSource;
		if (is(oldSource, "bpmn:Gateway") && is(newSource, "bpmn:EventBasedGateway")) forEach(newSource.outgoing, function(connection) {
			var target = connection.target, attachedboundaryEvents = getBoundaryEvents(target);
			if (is(target, "bpmn:ReceiveTask") && attachedboundaryEvents.length > 0) modeling.removeElements(attachedboundaryEvents);
		});
	});
}
BoundaryEventBehavior.$inject = ["eventBus", "modeling"];
e(BoundaryEventBehavior, CommandInterceptor);
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/util/CategoryUtil.js
function createCategory(bpmnFactory) {
	return bpmnFactory.create("bpmn:Category");
}
function createCategoryValue(bpmnFactory) {
	return bpmnFactory.create("bpmn:CategoryValue");
}
function getOrCreateCategoryValueForGroup(bpmnFactory, groupBo) {
	var categoryValue = groupBo.get("categoryValueRef");
	if (!categoryValue) categoryValue = groupBo.categoryValueRef = createCategoryValue(bpmnFactory);
	if (!categoryValue.$parent) categoryValue.$parent = createCategory(bpmnFactory);
	return categoryValue;
}
function linkCategoryValue(categoryValue, category, definitions) {
	add(category.get("categoryValue"), categoryValue);
	categoryValue.$parent = category;
	add(definitions.get("rootElements"), category);
	category.$parent = definitions;
	return categoryValue;
}
function unlinkCategoryValue(categoryValue) {
	var category = categoryValue.$parent;
	if (category) {
		remove(category.get("categoryValue"), categoryValue);
		categoryValue.$parent = null;
	}
	return categoryValue;
}
function unlinkCategory(category) {
	var definitions = category.$parent;
	if (definitions) {
		remove(definitions.get("rootElements"), category);
		category.$parent = null;
	}
	return category;
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/CategoryRootElementReferenceBehavior.js
init_ModelUtil();
var LOW_PRIORITY$13 = 500;
function CategoryRootElementReferenceBehavior(bpmnjs, elementRegistry, injector) {
	injector.invoke(CommandInterceptor, this);
	function getGroupBusinessObjects(ignoredBusinessObject) {
		return elementRegistry.filter(function(element) {
			return is(element, "bpmn:Group") && !element.labelTarget;
		}).map(getBusinessObject).filter(function(businessObject) {
			return businessObject !== ignoredBusinessObject;
		});
	}
	function isCategoryValueReferenced(categoryValue, ignoredBusinessObject) {
		return getGroupBusinessObjects(ignoredBusinessObject).some(function(businessObject) {
			return businessObject.get("categoryValueRef") === categoryValue;
		});
	}
	function isCategoryReferenced(category, ignoredBusinessObject) {
		return getGroupBusinessObjects(ignoredBusinessObject).some(function(businessObject) {
			var categoryValue = businessObject.get("categoryValueRef");
			return categoryValue && categoryValue.$parent === category;
		});
	}
	function link(categoryValue, category) {
		if (categoryValue && category) linkCategoryValue(categoryValue, category, bpmnjs.getDefinitions());
	}
	function unlink(categoryValue, category, ignoredBusinessObject) {
		if (category && !isCategoryReferenced(category, ignoredBusinessObject)) unlinkCategory(category);
		if (categoryValue && !isCategoryValueReferenced(categoryValue, ignoredBusinessObject)) unlinkCategoryValue(categoryValue);
	}
	this.executed(["shape.create", "label.create"], function(context) {
		var shape = context.labelTarget || context.shape;
		if (!is(shape, "bpmn:Group") || shape.labelTarget) return;
		link(context.categoryValue, context.category);
	}, true);
	this.reverted(["shape.create", "label.create"], function(context) {
		var shape = context.labelTarget || context.shape;
		if (!is(shape, "bpmn:Group") || shape.labelTarget) return;
		unlink(context.categoryValue, context.category, getBusinessObject(shape));
	}, true);
	this.executed(["shape.move", "shape.resize"], LOW_PRIORITY$13, function(context) {
		link(context.categoryValue, context.category);
	}, true);
	this.reverted(["shape.move", "shape.resize"], function(context) {
		var shape = context.shape;
		if (context.categoryValue) unlink(context.categoryValue, context.category, getBusinessObject(shape));
	}, true);
	this.executed("group.updateRefs", function(context) {
		getGroupUpdates(context).forEach(function(update) {
			link(update.categoryValue, update.category);
		});
	}, true);
	this.reverted("group.updateRefs", function(context) {
		getGroupUpdates(context).forEach(function(update) {
			unlink(update.categoryValue, update.category, getBusinessObject(update.groupShape));
		});
	}, true);
	this.executed("shape.delete", function(context) {
		var shape = context.shape;
		if (!is(shape, "bpmn:Group") || shape.labelTarget) return;
		unlink(context.categoryValue, context.category, getBusinessObject(shape));
	}, true);
	this.reverted("shape.delete", function(context) {
		var shape = context.shape;
		if (!is(shape, "bpmn:Group") || shape.labelTarget) return;
		link(context.categoryValue, context.category);
	}, true);
}
CategoryRootElementReferenceBehavior.$inject = [
	"bpmnjs",
	"elementRegistry",
	"injector"
];
e(CategoryRootElementReferenceBehavior, CommandInterceptor);
function getGroupUpdates(context) {
	return context.updates?.groups || [];
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/CompensateBoundaryEventBehavior.js
init_ModelUtil();
function CompensateBoundaryEventBehavior(eventBus, modeling, bpmnRules) {
	CommandInterceptor.call(this, eventBus);
	this.preExecute("shape.replace", handleReplacement, true);
	this.postExecuted("shape.replace", handleReplacementPostExecuted, true);
	this.preExecute("connection.create", handleNewConnection, true);
	this.postExecuted("connection.delete", handleConnectionRemoval, true);
	this.postExecuted("connection.reconnect", handleReconnection, true);
	this.postExecuted("element.updateProperties", handlePropertiesUpdate, true);
	function handleConnectionRemoval(context) {
		const source = context.source, target = context.target;
		if (isCompensationBoundaryEvent$1(source) && isForCompensation$2(target)) removeIsForCompensationProperty(target);
	}
	function handleNewConnection(context) {
		const connection = context.connection, source = context.source, target = context.target;
		if (isCompensationBoundaryEvent$1(source) && isForCompensationAllowed(target)) {
			addIsForCompensationProperty(target);
			removeExistingAssociations(source, [connection]);
		}
	}
	function handleReconnection(context) {
		const newTarget = context.newTarget, oldSource = context.oldSource, oldTarget = context.oldTarget;
		if (oldTarget !== newTarget) {
			const source = oldSource;
			if (isForCompensation$2(oldTarget)) removeIsForCompensationProperty(oldTarget);
			if (isCompensationBoundaryEvent$1(source) && isForCompensationAllowed(newTarget)) addIsForCompensationProperty(newTarget);
		}
	}
	function handlePropertiesUpdate(context) {
		const { element } = context;
		if (isForCompensation$2(element)) {
			removeDisallowedConnections(element);
			removeAttachments(element);
		} else if (isForCompensationAllowed(element)) removeIncomingCompensationAssociations(element);
	}
	function handleReplacement(context) {
		const { newData, oldShape } = context;
		if (isCompensationBoundaryEvent$1(context.oldShape) && newData.eventDefinitionType !== "bpmn:CompensateEventDefinition" || newData.type !== "bpmn:BoundaryEvent") {
			const targetConnection = oldShape.outgoing.find(({ target }) => isForCompensation$2(target));
			if (targetConnection && targetConnection.target) context._connectionTarget = targetConnection.target;
		} else if (!isCompensationBoundaryEvent$1(context.oldShape) && newData.eventDefinitionType === "bpmn:CompensateEventDefinition" && newData.type === "bpmn:BoundaryEvent") {
			const targetConnection = oldShape.outgoing.find(({ target }) => isForCompensationAllowed(target));
			if (targetConnection && targetConnection.target) context._connectionTarget = targetConnection.target;
			removeOutgoingSequenceFlows(oldShape);
		}
	}
	function handleReplacementPostExecuted(context) {
		const { _connectionTarget: target, newShape } = context;
		if (target) modeling.connect(newShape, target);
	}
	function addIsForCompensationProperty(target) {
		modeling.updateProperties(target, { isForCompensation: true });
	}
	function removeIsForCompensationProperty(target) {
		modeling.updateProperties(target, { isForCompensation: void 0 });
	}
	function removeDisallowedConnections(element) {
		for (const connection of element.incoming) if (!bpmnRules.canConnect(connection.source, element)) modeling.removeConnection(connection);
		for (const connection of element.outgoing) if (!bpmnRules.canConnect(element, connection.target)) modeling.removeConnection(connection);
	}
	function removeExistingAssociations(boundaryEvent, ignoredAssociations) {
		boundaryEvent.outgoing.filter((connection) => is(connection, "bpmn:Association")).filter((association) => {
			return isForCompensation$2(association.target) && !ignoredAssociations.includes(association);
		}).forEach((association) => modeling.removeConnection(association));
	}
	function removeAttachments(element) {
		const attachments = element.attachers.slice();
		if (!attachments.length) return;
		modeling.removeElements(attachments);
	}
	function removeIncomingCompensationAssociations(element) {
		const compensationAssociations = element.incoming.filter((connection) => isCompensationBoundaryEvent$1(connection.source));
		modeling.removeElements(compensationAssociations);
	}
	function removeOutgoingSequenceFlows(element) {
		const sequenceFlows = element.outgoing.filter((connection) => is(connection, "bpmn:SequenceFlow"));
		modeling.removeElements(sequenceFlows);
	}
}
e(CompensateBoundaryEventBehavior, CommandInterceptor);
CompensateBoundaryEventBehavior.$inject = [
	"eventBus",
	"modeling",
	"bpmnRules"
];
function isForCompensation$2(element) {
	const bo = getBusinessObject(element);
	return bo && bo.get("isForCompensation");
}
function isCompensationBoundaryEvent$1(element) {
	return element && is(element, "bpmn:BoundaryEvent") && hasEventDefinition$2(element, "bpmn:CompensateEventDefinition");
}
function isForCompensationAllowed(element) {
	return element && is(element, "bpmn:Activity") && !isEventSubProcess(element);
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/CreateBehavior.js
init_ModelUtil();
function CreateBehavior(injector) {
	injector.invoke(CommandInterceptor, this);
	this.preExecute("shape.create", 1500, function(event) {
		var context = event.context, parent = context.parent, shape = context.shape;
		if (is(parent, "bpmn:Lane") && !is(shape, "bpmn:Lane")) context.parent = getParent(parent, "bpmn:Participant");
	});
}
CreateBehavior.$inject = ["injector"];
e(CreateBehavior, CommandInterceptor);
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/CreateDataObjectBehavior.js
init_ModelUtil();
function CreateDataObjectBehavior(eventBus, bpmnFactory) {
	CommandInterceptor.call(this, eventBus);
	this.preExecute("shape.create", function(event) {
		var shape = event.context.shape;
		if (is(shape, "bpmn:DataObjectReference") && shape.type !== "label") {
			var dataObject = bpmnFactory.create("bpmn:DataObject");
			dataObject.isCollection = shape.businessObject.dataObjectRef?.isCollection || false;
			shape.businessObject.dataObjectRef = dataObject;
		}
	});
}
CreateDataObjectBehavior.$inject = ["eventBus", "bpmnFactory"];
e(CreateDataObjectBehavior, CommandInterceptor);
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/CreateParticipantBehavior.js
init_ModelUtil();
init_dist();
var HORIZONTAL_PARTICIPANT_PADDING = 20;
var VERTICAL_PARTICIPANT_PADDING = 20;
var HIGH_PRIORITY$15 = 2e3;
function CreateParticipantBehavior(canvas, eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	eventBus.on(["create.start", "shape.move.start"], HIGH_PRIORITY$15, function(event) {
		var context = event.context, shape = context.shape, rootElement = canvas.getRootElement();
		if (!is(shape, "bpmn:Participant") || !is(rootElement, "bpmn:Process") || !rootElement.children.length) return;
		var children = rootElement.children.filter(function(element) {
			return !is(element, "bpmn:Group") && !isLabel(element) && !isConnection(element);
		});
		if (!children.length) return;
		var childrenBBox = getBBox(children);
		var participantBounds = getParticipantBounds(shape, childrenBBox);
		assign$1(shape, participantBounds);
		context.createConstraints = getParticipantCreateConstraints(shape, childrenBBox);
	});
	eventBus.on("create.start", HIGH_PRIORITY$15, function(event) {
		var shape = event.context.shape, rootElement = canvas.getRootElement(), rootElementGfx = canvas.getGraphics(rootElement);
		function ensureHoveringProcess(event) {
			event.element = rootElement;
			event.gfx = rootElementGfx;
		}
		if (is(shape, "bpmn:Participant") && is(rootElement, "bpmn:Process")) {
			eventBus.on("element.hover", HIGH_PRIORITY$15, ensureHoveringProcess);
			eventBus.once("create.cleanup", function() {
				eventBus.off("element.hover", ensureHoveringProcess);
			});
		}
	});
	function getOrCreateCollaboration() {
		var rootElement = canvas.getRootElement();
		if (is(rootElement, "bpmn:Collaboration")) return rootElement;
		return modeling.makeCollaboration();
	}
	this.preExecute("elements.create", HIGH_PRIORITY$15, function(context) {
		var elements = context.elements, parent = context.parent, participant = findParticipant(elements), hints;
		if (participant && is(parent, "bpmn:Process")) {
			context.parent = getOrCreateCollaboration();
			hints = context.hints = context.hints || {};
			hints.participant = participant;
			hints.process = parent;
			hints.processRef = getBusinessObject(participant).get("processRef");
		}
	}, true);
	this.preExecute("shape.create", function(context) {
		var parent = context.parent, shape = context.shape;
		if (is(shape, "bpmn:Participant") && is(parent, "bpmn:Process")) {
			context.parent = getOrCreateCollaboration();
			context.process = parent;
			context.processRef = getBusinessObject(shape).get("processRef");
		}
	}, true);
	this.execute("shape.create", function(context) {
		var hints = context.hints || {}, process = context.process || hints.process, shape = context.shape, participant = hints.participant;
		if (process && (!participant || shape === participant)) getBusinessObject(shape).set("processRef", getBusinessObject(process));
	}, true);
	this.revert("shape.create", function(context) {
		var hints = context.hints || {}, process = context.process || hints.process, processRef = context.processRef || hints.processRef, shape = context.shape, participant = hints.participant;
		if (process && (!participant || shape === participant)) getBusinessObject(shape).set("processRef", processRef);
	}, true);
	this.postExecute("shape.create", function(context) {
		var hints = context.hints || {}, process = context.process || context.hints.process, shape = context.shape, participant = hints.participant;
		if (process) {
			var children = process.children.slice();
			if (!participant) modeling.moveElements(children, {
				x: 0,
				y: 0
			}, shape);
			else if (shape === participant) modeling.moveElements(children, {
				x: 0,
				y: 0
			}, participant);
		}
	}, true);
}
CreateParticipantBehavior.$inject = [
	"canvas",
	"eventBus",
	"modeling"
];
e(CreateParticipantBehavior, CommandInterceptor);
function getParticipantBounds(shape, childrenBBox) {
	childrenBBox = {
		width: childrenBBox.width + HORIZONTAL_PARTICIPANT_PADDING * 2 + 30,
		height: childrenBBox.height + VERTICAL_PARTICIPANT_PADDING * 2
	};
	var width = Math.max(shape.width, childrenBBox.width), height = Math.max(shape.height, childrenBBox.height);
	return {
		x: -width / 2,
		y: -height / 2,
		width,
		height
	};
}
function getParticipantCreateConstraints(shape, childrenBBox) {
	childrenBBox = asTRBL(childrenBBox);
	return {
		bottom: childrenBBox.top + shape.height / 2 - VERTICAL_PARTICIPANT_PADDING,
		left: childrenBBox.right - shape.width / 2 + HORIZONTAL_PARTICIPANT_PADDING,
		top: childrenBBox.bottom - shape.height / 2 + VERTICAL_PARTICIPANT_PADDING,
		right: childrenBBox.left + shape.width / 2 - HORIZONTAL_PARTICIPANT_PADDING - 30
	};
}
function findParticipant(elements) {
	return find(elements, function(element) {
		return is(element, "bpmn:Participant");
	});
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/DataInputAssociationBehavior.js
init_dist();
init_ModelUtil();
var TARGET_REF_PLACEHOLDER_NAME = "__targetRef_placeholder";
function DataInputAssociationBehavior(eventBus, bpmnFactory) {
	CommandInterceptor.call(this, eventBus);
	this.executed([
		"connection.create",
		"connection.delete",
		"connection.move",
		"connection.reconnect"
	], ifDataInputAssociation(fixTargetRef));
	this.reverted([
		"connection.create",
		"connection.delete",
		"connection.move",
		"connection.reconnect"
	], ifDataInputAssociation(fixTargetRef));
	function usesTargetRef(element, targetRef, removedConnection) {
		var inputAssociations = element.get("dataInputAssociations");
		return find(inputAssociations, function(association) {
			return association !== removedConnection && association.targetRef === targetRef;
		});
	}
	function getTargetRef(element, create) {
		var properties = element.get("properties");
		var targetRefProp = find(properties, function(p) {
			return p.name === TARGET_REF_PLACEHOLDER_NAME;
		});
		if (!targetRefProp && create) {
			targetRefProp = bpmnFactory.create("bpmn:Property", { name: TARGET_REF_PLACEHOLDER_NAME });
			add(properties, targetRefProp);
		}
		return targetRefProp;
	}
	function cleanupTargetRef(element, connection) {
		var targetRefProp = getTargetRef(element);
		if (!targetRefProp) return;
		if (!usesTargetRef(element, targetRefProp, connection)) remove(element.get("properties"), targetRefProp);
	}
	function fixTargetRef(event) {
		var context = event.context, connection = context.connection, connectionBo = connection.businessObject, target = connection.target, targetBo = target && target.businessObject, newTarget = context.newTarget, newTargetBo = newTarget && newTarget.businessObject, oldTarget = context.oldTarget || context.target, oldTargetBo = oldTarget && oldTarget.businessObject;
		var dataAssociation = connection.businessObject, targetRefProp;
		if (oldTargetBo && oldTargetBo !== targetBo) cleanupTargetRef(oldTargetBo, connectionBo);
		if (newTargetBo && newTargetBo !== targetBo) cleanupTargetRef(newTargetBo, connectionBo);
		if (targetBo) {
			targetRefProp = getTargetRef(targetBo, true);
			dataAssociation.targetRef = targetRefProp;
		} else dataAssociation.targetRef = null;
	}
}
DataInputAssociationBehavior.$inject = ["eventBus", "bpmnFactory"];
e(DataInputAssociationBehavior, CommandInterceptor);
function ifDataInputAssociation(fn) {
	return function(event) {
		var connection = event.context.connection;
		if (is(connection, "bpmn:DataInputAssociation")) return fn(event);
	};
}
// ../../node_modules/bpmn-js/lib/features/modeling/cmd/UpdateSemanticParentHandler.js
function UpdateSemanticParentHandler(bpmnUpdater) {
	this._bpmnUpdater = bpmnUpdater;
}
UpdateSemanticParentHandler.$inject = ["bpmnUpdater"];
UpdateSemanticParentHandler.prototype.execute = function(context) {
	var dataStoreBo = context.dataStoreBo, dataStoreDi = context.dataStoreDi, newSemanticParent = context.newSemanticParent, newDiParent = context.newDiParent;
	context.oldSemanticParent = dataStoreBo.$parent;
	context.oldDiParent = dataStoreDi.$parent;
	this._bpmnUpdater.updateSemanticParent(dataStoreBo, newSemanticParent);
	this._bpmnUpdater.updateDiParent(dataStoreDi, newDiParent);
	return [];
};
UpdateSemanticParentHandler.prototype.revert = function(context) {
	var dataStoreBo = context.dataStoreBo, dataStoreDi = context.dataStoreDi, oldSemanticParent = context.oldSemanticParent, oldDiParent = context.oldDiParent;
	this._bpmnUpdater.updateSemanticParent(dataStoreBo, oldSemanticParent);
	this._bpmnUpdater.updateDiParent(dataStoreDi, oldDiParent);
	return [];
};
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/DataStoreBehavior.js
init_ModelUtil();
function DataStoreBehavior(canvas, commandStack, elementRegistry, eventBus) {
	CommandInterceptor.call(this, eventBus);
	commandStack.registerHandler("dataStore.updateContainment", UpdateSemanticParentHandler);
	function getFirstParticipantWithProcessRef() {
		return elementRegistry.filter(function(element) {
			return is(element, "bpmn:Participant") && getBusinessObject(element).processRef;
		})[0];
	}
	function getDataStores(element) {
		return element.children.filter(function(child) {
			return is(child, "bpmn:DataStoreReference") && !child.labelTarget;
		});
	}
	function updateDataStoreParent(dataStore, newDataStoreParent) {
		var dataStoreBo = dataStore.businessObject || dataStore;
		newDataStoreParent = newDataStoreParent || getFirstParticipantWithProcessRef();
		if (newDataStoreParent) {
			var newDataStoreParentBo = newDataStoreParent.businessObject || newDataStoreParent;
			commandStack.execute("dataStore.updateContainment", {
				dataStoreBo,
				dataStoreDi: getDi(dataStore),
				newSemanticParent: newDataStoreParentBo.processRef || newDataStoreParentBo,
				newDiParent: getDi(newDataStoreParent)
			});
		}
	}
	this.preExecute("shape.create", function(event) {
		var context = event.context, shape = context.shape;
		if (is(shape, "bpmn:DataStoreReference") && shape.type !== "label") {
			if (!context.hints) context.hints = {};
			context.hints.autoResize = false;
		}
	});
	this.preExecute("elements.move", function(event) {
		var context = event.context, shapes = context.shapes;
		if (shapes.filter(function(shape) {
			return is(shape, "bpmn:DataStoreReference");
		}).length) {
			if (!context.hints) context.hints = {};
			context.hints.autoResize = shapes.filter(function(shape) {
				return !is(shape, "bpmn:DataStoreReference");
			});
		}
	});
	this.postExecute("shape.create", function(event) {
		var shape = event.context.shape, parent = shape.parent;
		if (is(shape, "bpmn:DataStoreReference") && shape.type !== "label" && is(parent, "bpmn:Collaboration")) updateDataStoreParent(shape);
	});
	this.postExecute("shape.move", function(event) {
		var context = event.context, shape = context.shape, oldParent = context.oldParent, parent = shape.parent;
		if (is(oldParent, "bpmn:Collaboration")) return;
		if (is(shape, "bpmn:DataStoreReference") && shape.type !== "label" && is(parent, "bpmn:Collaboration")) updateDataStoreParent(shape, is(oldParent, "bpmn:Participant") ? oldParent : getAncestor(oldParent, "bpmn:Participant"));
	});
	this.postExecute("shape.delete", function(event) {
		var shape = event.context.shape, rootElement = canvas.getRootElement();
		if (isAny(shape, ["bpmn:Participant", "bpmn:SubProcess"]) && is(rootElement, "bpmn:Collaboration")) getDataStores(rootElement).filter(function(dataStore) {
			return isDescendant(dataStore, shape);
		}).forEach(function(dataStore) {
			updateDataStoreParent(dataStore);
		});
	});
	this.postExecute("canvas.updateRoot", function(event) {
		var context = event.context, oldRoot = context.oldRoot, newRoot = context.newRoot;
		getDataStores(oldRoot).forEach(function(dataStore) {
			if (is(newRoot, "bpmn:Process")) updateDataStoreParent(dataStore, newRoot);
		});
	});
}
DataStoreBehavior.$inject = [
	"canvas",
	"commandStack",
	"elementRegistry",
	"eventBus"
];
e(DataStoreBehavior, CommandInterceptor);
function isDescendant(descendant, ancestor) {
	var descendantBo = descendant.businessObject || descendant, ancestorBo = ancestor.businessObject || ancestor;
	while (descendantBo.$parent) {
		if (descendantBo.$parent === ancestorBo.processRef || ancestorBo) return true;
		descendantBo = descendantBo.$parent;
	}
	return false;
}
function getAncestor(element, type) {
	while (element.parent) {
		if (is(element.parent, type)) return element.parent;
		element = element.parent;
	}
}
// ../../node_modules/bpmn-js/lib/features/modeling/util/LaneUtil.js
init_ModelUtil();
var abs$4 = Math.abs;
function getTRBLResize(oldBounds, newBounds) {
	return substractTRBL(asTRBL(newBounds), asTRBL(oldBounds));
}
var LANE_PARENTS = [
	"bpmn:Participant",
	"bpmn:Process",
	"bpmn:SubProcess"
];
function collectLanes(shape, collectedShapes) {
	collectedShapes = collectedShapes || [];
	shape.children.filter(function(s) {
		if (is(s, "bpmn:Lane")) {
			collectLanes(s, collectedShapes);
			collectedShapes.push(s);
		}
	});
	return collectedShapes;
}
function getChildLanes(shape) {
	return shape.children.filter(function(c) {
		return is(c, "bpmn:Lane");
	});
}
function getLanesRoot(shape) {
	return getParent(shape, LANE_PARENTS) || shape;
}
function computeLanesResize(shape, newBounds) {
	var rootElement = getLanesRoot(shape);
	var allLanes = collectLanes(rootElement, is(rootElement, "bpmn:Process") ? [] : [rootElement]), shapeTrbl = asTRBL(shape), shapeNewTrbl = asTRBL(newBounds), trblResize = getTRBLResize(shape, newBounds), resizeNeeded = [];
	var isHorizontalLane = isHorizontal$1(shape);
	allLanes.forEach(function(other) {
		if (other === shape) return;
		var topResize = isHorizontalLane ? 0 : trblResize.top, rightResize = isHorizontalLane ? trblResize.right : 0, bottomResize = isHorizontalLane ? 0 : trblResize.bottom, leftResize = isHorizontalLane ? trblResize.left : 0;
		var otherTrbl = asTRBL(other);
		if (trblResize.top) {
			if (abs$4(otherTrbl.bottom - shapeTrbl.top) < 10) bottomResize = shapeNewTrbl.top - otherTrbl.bottom;
			if (abs$4(otherTrbl.top - shapeTrbl.top) < 5) topResize = shapeNewTrbl.top - otherTrbl.top;
		}
		if (trblResize.left) {
			if (abs$4(otherTrbl.right - shapeTrbl.left) < 10) rightResize = shapeNewTrbl.left - otherTrbl.right;
			if (abs$4(otherTrbl.left - shapeTrbl.left) < 5) leftResize = shapeNewTrbl.left - otherTrbl.left;
		}
		if (trblResize.bottom) {
			if (abs$4(otherTrbl.top - shapeTrbl.bottom) < 10) topResize = shapeNewTrbl.bottom - otherTrbl.top;
			if (abs$4(otherTrbl.bottom - shapeTrbl.bottom) < 5) bottomResize = shapeNewTrbl.bottom - otherTrbl.bottom;
		}
		if (trblResize.right) {
			if (abs$4(otherTrbl.left - shapeTrbl.right) < 10) leftResize = shapeNewTrbl.right - otherTrbl.left;
			if (abs$4(otherTrbl.right - shapeTrbl.right) < 5) rightResize = shapeNewTrbl.right - otherTrbl.right;
		}
		if (topResize || rightResize || bottomResize || leftResize) resizeNeeded.push({
			shape: other,
			newBounds: resizeTRBL(other, {
				top: topResize,
				right: rightResize,
				bottom: bottomResize,
				left: leftResize
			})
		});
	});
	return resizeNeeded;
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/DeleteLaneBehavior.js
init_ModelUtil();
var LOW_PRIORITY$12 = 500;
function DeleteLaneBehavior(eventBus, spaceTool) {
	CommandInterceptor.call(this, eventBus);
	function compensateLaneDelete(shape, oldParent) {
		var isHorizontalLane = isHorizontal$1(shape);
		var siblings = getChildLanes(oldParent);
		var topAffected = [];
		var bottomAffected = [];
		var leftAffected = [];
		var rightAffected = [];
		eachElement(siblings, function(element) {
			if (isHorizontalLane) {
				if (element.y > shape.y) bottomAffected.push(element);
				else topAffected.push(element);
			} else if (element.x > shape.x) rightAffected.push(element);
			else leftAffected.push(element);
			return element.children;
		});
		if (!siblings.length) return;
		var offset;
		if (isHorizontalLane) {
			if (bottomAffected.length && topAffected.length) offset = shape.height / 2;
			else offset = shape.height;
		} else if (rightAffected.length && leftAffected.length) offset = shape.width / 2;
		else offset = shape.width;
		var topAdjustments, bottomAdjustments, leftAdjustments, rightAdjustments;
		if (topAffected.length) {
			topAdjustments = spaceTool.calculateAdjustments(topAffected, "y", offset, shape.y - 10);
			spaceTool.makeSpace(topAdjustments.movingShapes, topAdjustments.resizingShapes, {
				x: 0,
				y: offset
			}, "s");
		}
		if (bottomAffected.length) {
			bottomAdjustments = spaceTool.calculateAdjustments(bottomAffected, "y", -offset, shape.y + shape.height + 10);
			spaceTool.makeSpace(bottomAdjustments.movingShapes, bottomAdjustments.resizingShapes, {
				x: 0,
				y: -offset
			}, "n");
		}
		if (leftAffected.length) {
			leftAdjustments = spaceTool.calculateAdjustments(leftAffected, "x", offset, shape.x - 10);
			spaceTool.makeSpace(leftAdjustments.movingShapes, leftAdjustments.resizingShapes, {
				x: offset,
				y: 0
			}, "e");
		}
		if (rightAffected.length) {
			rightAdjustments = spaceTool.calculateAdjustments(rightAffected, "x", -offset, shape.x + shape.width + 10);
			spaceTool.makeSpace(rightAdjustments.movingShapes, rightAdjustments.resizingShapes, {
				x: -offset,
				y: 0
			}, "w");
		}
	}
	this.postExecuted("shape.delete", LOW_PRIORITY$12, function(event) {
		var context = event.context, hints = context.hints, shape = context.shape, oldParent = context.oldParent;
		if (!is(shape, "bpmn:Lane")) return;
		if (hints && hints.nested) return;
		compensateLaneDelete(shape, oldParent);
	});
}
DeleteLaneBehavior.$inject = ["eventBus", "spaceTool"];
e(DeleteLaneBehavior, CommandInterceptor);
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/DetachEventBehavior.js
init_ModelUtil();
var LOW_PRIORITY$11 = 500;
function DetachEventBehavior(bpmnReplace, injector) {
	injector.invoke(CommandInterceptor, this);
	this._bpmnReplace = bpmnReplace;
	var self = this;
	this.postExecuted("elements.create", LOW_PRIORITY$11, function(context) {
		var elements = context.elements;
		elements.filter(function(shape) {
			var host = shape.host;
			return shouldReplace(shape, host);
		}).map(function(shape) {
			return elements.indexOf(shape);
		}).forEach(function(index) {
			context.elements[index] = self._replaceShape(elements[index]);
		});
	}, true);
	this.preExecute("elements.move", LOW_PRIORITY$11, function(context) {
		var shapes = context.shapes, newHost = context.newHost;
		shapes.forEach(function(shape, index) {
			var host = shape.host;
			if (shouldReplace(shape, includes$3(shapes, host) ? host : newHost)) shapes[index] = self._replaceShape(shape);
		});
	}, true);
}
DetachEventBehavior.$inject = ["bpmnReplace", "injector"];
e(DetachEventBehavior, CommandInterceptor);
DetachEventBehavior.prototype._replaceShape = function(shape) {
	var eventDefinition = getEventDefinition(shape), intermediateEvent;
	if (eventDefinition) intermediateEvent = {
		type: "bpmn:IntermediateCatchEvent",
		eventDefinitionType: eventDefinition.$type
	};
	else intermediateEvent = { type: "bpmn:IntermediateThrowEvent" };
	return this._bpmnReplace.replaceElement(shape, intermediateEvent, { layoutConnection: false });
};
function getEventDefinition(element) {
	var eventDefinitions = getBusinessObject(element).eventDefinitions;
	return eventDefinitions && eventDefinitions[0];
}
function shouldReplace(shape, host) {
	return !isLabel(shape) && is(shape, "bpmn:BoundaryEvent") && !host;
}
function includes$3(array, item) {
	return array.indexOf(item) !== -1;
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/DropOnFlowBehavior.js
init_dist();
function DropOnFlowBehavior(eventBus, bpmnRules, modeling) {
	CommandInterceptor.call(this, eventBus);
	function insertShape(shape, targetFlow, positionOrBounds) {
		var waypoints = targetFlow.waypoints, waypointsBefore, waypointsAfter, dockingPoint, source, target, incomingConnection, outgoingConnection, oldOutgoing = shape.outgoing.slice(), oldIncoming = shape.incoming.slice();
		var mid;
		if (isNumber(positionOrBounds.width)) mid = getMid(positionOrBounds);
		else mid = positionOrBounds;
		var intersection = getApproxIntersection(waypoints, mid);
		if (intersection) {
			waypointsBefore = waypoints.slice(0, intersection.index);
			waypointsAfter = waypoints.slice(intersection.index + (intersection.bendpoint ? 1 : 0));
			if (!waypointsBefore.length || !waypointsAfter.length) return;
			dockingPoint = intersection.bendpoint ? waypoints[intersection.index] : mid;
			if (waypointsBefore.length === 1 || !isPointInsideBBox(shape, waypointsBefore[waypointsBefore.length - 1])) waypointsBefore.push(copy(dockingPoint));
			if (waypointsAfter.length === 1 || !isPointInsideBBox(shape, waypointsAfter[0])) waypointsAfter.unshift(copy(dockingPoint));
		}
		source = targetFlow.source;
		target = targetFlow.target;
		if (bpmnRules.canConnect(source, shape, targetFlow)) {
			modeling.reconnectEnd(targetFlow, shape, waypointsBefore || mid);
			incomingConnection = targetFlow;
		}
		if (bpmnRules.canConnect(shape, target, targetFlow)) {
			if (!incomingConnection) {
				modeling.reconnectStart(targetFlow, shape, waypointsAfter || mid);
				outgoingConnection = targetFlow;
			} else outgoingConnection = modeling.connect(shape, target, {
				type: targetFlow.type,
				waypoints: waypointsAfter
			});
		}
		var duplicateConnections = [].concat(incomingConnection && filter(oldIncoming, function(connection) {
			return connection.source === incomingConnection.source;
		}) || [], outgoingConnection && filter(oldOutgoing, function(connection) {
			return connection.target === outgoingConnection.target;
		}) || []);
		if (duplicateConnections.length) modeling.removeElements(duplicateConnections);
	}
	this.preExecute("elements.move", function(context) {
		var newParent = context.newParent, shapes = context.shapes, delta = context.delta, shape = shapes[0];
		if (!shape || !newParent) return;
		if (newParent && newParent.waypoints) context.newParent = newParent = newParent.parent;
		var shapeMid = getMid(shape);
		var newShapeMid = {
			x: shapeMid.x + delta.x,
			y: shapeMid.y + delta.y
		};
		var connection = find(newParent.children, function(element) {
			return bpmnRules.canInsert(shapes, element) && getApproxIntersection(element.waypoints, newShapeMid);
		});
		if (connection) {
			context.targetFlow = connection;
			context.position = newShapeMid;
		}
	}, true);
	this.postExecuted("elements.move", function(context) {
		var shapes = context.shapes, targetFlow = context.targetFlow, position = context.position;
		if (targetFlow) insertShape(shapes[0], targetFlow, position);
	}, true);
	this.preExecute("shape.create", function(context) {
		var parent = context.parent, shape = context.shape;
		if (bpmnRules.canInsert(shape, parent)) {
			context.targetFlow = parent;
			context.parent = parent.parent;
		}
	}, true);
	this.postExecuted("shape.create", function(context) {
		var shape = context.shape, targetFlow = context.targetFlow, positionOrBounds = context.position;
		if (targetFlow) insertShape(shape, targetFlow, positionOrBounds);
	}, true);
}
e(DropOnFlowBehavior, CommandInterceptor);
DropOnFlowBehavior.$inject = [
	"eventBus",
	"bpmnRules",
	"modeling"
];
function isPointInsideBBox(bbox, point) {
	var x = point.x, y = point.y;
	return x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height;
}
function copy(obj) {
	return assign$1({}, obj);
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/EventBasedGatewayBehavior.js
init_ModelUtil();
function EventBasedGatewayBehavior(eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	this.preExecuted("connection.create", function(event) {
		var context = event.context, connection = context.connection, source = context.source, target = context.target, hints = context.hints;
		if (hints && hints.createElementsBehavior === false) return;
		if (!isSequenceFlow$1(connection)) return;
		var sequenceFlows = [];
		if (is(source, "bpmn:EventBasedGateway")) sequenceFlows = target.incoming.filter((flow) => flow !== connection && isSequenceFlow$1(flow));
		else sequenceFlows = target.incoming.filter((flow) => flow !== connection && isSequenceFlow$1(flow) && is(flow.source, "bpmn:EventBasedGateway"));
		sequenceFlows.forEach(function(sequenceFlow) {
			modeling.removeConnection(sequenceFlow);
		});
	});
	this.preExecuted("shape.replace", function(event) {
		var newShape = event.context.newShape;
		if (!is(newShape, "bpmn:EventBasedGateway")) return;
		newShape.outgoing.filter(isSequenceFlow$1).reduce(function(targets, sequenceFlow) {
			if (!targets.includes(sequenceFlow.target)) return targets.concat(sequenceFlow.target);
			return targets;
		}, []).forEach(function(target) {
			target.incoming.filter(isSequenceFlow$1).forEach(function(sequenceFlow) {
				const sequenceFlowsFromNewShape = target.incoming.filter(isSequenceFlow$1).filter(function(sequenceFlow) {
					return sequenceFlow.source === newShape;
				});
				if (sequenceFlow.source !== newShape || sequenceFlowsFromNewShape.length > 1) modeling.removeConnection(sequenceFlow);
			});
		});
	});
}
EventBasedGatewayBehavior.$inject = ["eventBus", "modeling"];
e(EventBasedGatewayBehavior, CommandInterceptor);
function isSequenceFlow$1(connection) {
	return is(connection, "bpmn:SequenceFlow");
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/FixHoverBehavior.js
init_ModelUtil();
var HIGH_PRIORITY$14 = 1500;
var HIGHEST_PRIORITY = 2e3;
function FixHoverBehavior(elementRegistry, eventBus, canvas) {
	eventBus.on([
		"create.hover",
		"create.move",
		"create.out",
		"create.end",
		"shape.move.hover",
		"shape.move.move",
		"shape.move.out",
		"shape.move.end"
	], HIGH_PRIORITY$14, function(event) {
		var shape = event.context.shape || event.shape, hover = event.hover;
		if (is(hover, "bpmn:Lane") && !isAny(shape, ["bpmn:Lane", "bpmn:Participant"])) {
			event.hover = getLanesRoot(hover);
			event.hoverGfx = elementRegistry.getGraphics(event.hover);
		}
		var rootElement = canvas.getRootElement();
		if (hover && hover !== rootElement && (shape.labelTarget || isAny(shape, ["bpmn:Group", "bpmn:TextAnnotation"]))) {
			event.hover = rootElement;
			event.hoverGfx = elementRegistry.getGraphics(event.hover);
		}
	});
	eventBus.on([
		"connect.hover",
		"connect.out",
		"connect.end",
		"connect.cleanup",
		"global-connect.hover",
		"global-connect.out",
		"global-connect.end",
		"global-connect.cleanup"
	], HIGH_PRIORITY$14, function(event) {
		var hover = event.hover;
		if (is(hover, "bpmn:Lane")) {
			event.hover = getLanesRoot(hover) || hover;
			event.hoverGfx = elementRegistry.getGraphics(event.hover);
		}
	});
	eventBus.on(["bendpoint.move.hover"], HIGH_PRIORITY$14, function(event) {
		var context = event.context, hover = event.hover, type = context.type;
		if (is(hover, "bpmn:Lane") && /reconnect/.test(type)) {
			event.hover = getLanesRoot(hover) || hover;
			event.hoverGfx = elementRegistry.getGraphics(event.hover);
		}
	});
	eventBus.on(["connect.start"], HIGH_PRIORITY$14, function(event) {
		var context = event.context, start = context.start;
		if (is(start, "bpmn:Lane")) context.start = getLanesRoot(start) || start;
	});
	eventBus.on("shape.move.start", HIGHEST_PRIORITY, function(event) {
		var shape = event.shape;
		if (is(shape, "bpmn:Lane")) event.shape = getLanesRoot(shape) || shape;
	});
	eventBus.on("spaceTool.move", HIGHEST_PRIORITY, function(event) {
		var hover = event.hover;
		if (hover && is(hover, "bpmn:Lane")) event.hover = getLanesRoot(hover);
	});
}
FixHoverBehavior.$inject = [
	"elementRegistry",
	"eventBus",
	"canvas"
];
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/GroupBehavior.js
init_ModelUtil();
var LOWER_PRIORITY = 770;
function GroupBehavior(bpmnFactory, eventBus, injector, moddleCopy) {
	injector.invoke(CommandInterceptor, this);
	function setCategoryValue(element, context) {
		var businessObject = getBusinessObject(element), categoryValue = context.categoryValue || businessObject.categoryValueRef;
		if (!categoryValue) categoryValue = getOrCreateCategoryValueForGroup(bpmnFactory, businessObject);
		var category = context.category || categoryValue.$parent || createCategory(bpmnFactory);
		businessObject.categoryValueRef = categoryValue;
		categoryValue.$parent = category;
		context.categoryValue = categoryValue;
		context.category = category;
	}
	function unsetCategoryValue(element, context) {
		var businessObject = getBusinessObject(element), categoryValue = context.categoryValue || businessObject.categoryValueRef, category = context.category || categoryValue && categoryValue.$parent;
		if (categoryValue) {
			context.categoryValue = categoryValue;
			context.category = category;
			businessObject.categoryValueRef = null;
		}
	}
	this.execute("label.create", function(event) {
		var context = event.context, labelTarget = context.labelTarget;
		if (!is(labelTarget, "bpmn:Group")) return;
		setCategoryValue(labelTarget, context);
	});
	this.revert("label.create", function(event) {
		var context = event.context, labelTarget = context.labelTarget;
		if (!is(labelTarget, "bpmn:Group")) return;
		unsetCategoryValue(labelTarget, context);
	});
	this.execute("shape.delete", function(event) {
		var context = event.context, shape = context.shape, businessObject = getBusinessObject(shape);
		if (!is(shape, "bpmn:Group") || shape.labelTarget) return;
		var categoryValue = context.categoryValue = businessObject.categoryValueRef;
		if (categoryValue) {
			context.category = categoryValue.$parent;
			businessObject.categoryValueRef = null;
		}
	});
	this.reverted("shape.delete", function(event) {
		var context = event.context, shape = context.shape;
		if (!is(shape, "bpmn:Group") || shape.labelTarget) return;
		var category = context.category, categoryValue = context.categoryValue, businessObject = getBusinessObject(shape);
		if (categoryValue) {
			businessObject.categoryValueRef = categoryValue;
			categoryValue.$parent = category;
		}
	});
	this.execute("shape.create", function(event) {
		var context = event.context, shape = context.shape, hints = context.hints || {};
		if (!is(shape, "bpmn:Group") || shape.labelTarget) return;
		if (hints.createElementsBehavior === false && !getBusinessObject(shape).categoryValueRef && !context.categoryValue) return;
		setCategoryValue(shape, context);
	});
	this.reverted("shape.create", function(event) {
		var context = event.context, shape = context.shape, hints = context.hints || {};
		if (!is(shape, "bpmn:Group") || shape.labelTarget) return;
		if (hints.createElementsBehavior === false && !getBusinessObject(shape).categoryValueRef && !context.categoryValue) return;
		unsetCategoryValue(shape, context);
	});
	this.executed(["shape.move", "shape.resize"], function(event) {
		var context = event.context, shape = context.shape;
		if (!is(shape, "bpmn:Group") || shape.labelTarget || getBusinessObject(shape).categoryValueRef) return;
		setCategoryValue(shape, context);
	});
	this.reverted(["shape.move", "shape.resize"], function(event) {
		var context = event.context, shape = context.shape;
		if (!is(shape, "bpmn:Group") || shape.labelTarget || !context.categoryValue) return;
		unsetCategoryValue(shape, context);
	});
	function copy(bo, clone) {
		var targetBo = bpmnFactory.create(bo.$type);
		return moddleCopy.copyElement(bo, targetBo, null, clone);
	}
	eventBus.on("copyPaste.copyElement", LOWER_PRIORITY, function(context) {
		var descriptor = context.descriptor, element = context.element;
		if (!is(element, "bpmn:Group") || element.labelTarget) return;
		var groupBo = getBusinessObject(element);
		if (groupBo.categoryValueRef) {
			var categoryValue = groupBo.categoryValueRef;
			descriptor.categoryValue = copy(categoryValue, true);
			if (categoryValue.$parent) descriptor.category = copy(categoryValue.$parent, true);
		}
	});
	eventBus.on("copyPaste.pasteElement", LOWER_PRIORITY, function(context) {
		var descriptor = context.descriptor, businessObject = descriptor.businessObject, categoryValue = descriptor.categoryValue, category = descriptor.category;
		if (categoryValue) categoryValue = businessObject.categoryValueRef = copy(categoryValue);
		if (category) categoryValue.$parent = copy(category);
		delete descriptor.category;
		delete descriptor.categoryValue;
	});
}
GroupBehavior.$inject = [
	"bpmnFactory",
	"eventBus",
	"injector",
	"moddleCopy"
];
e(GroupBehavior, CommandInterceptor);
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/util/LineIntersect.js
function lineIntersect(l1s, l1e, l2s, l2e) {
	var denominator = (l2e.y - l2s.y) * (l1e.x - l1s.x) - (l2e.x - l2s.x) * (l1e.y - l1s.y), a, b, c, numerator;
	if (denominator == 0) return null;
	a = l1s.y - l2s.y;
	b = l1s.x - l2s.x;
	numerator = (l2e.x - l2s.x) * a - (l2e.y - l2s.y) * b;
	c = numerator / denominator;
	return {
		x: Math.round(l1s.x + c * (l1e.x - l1s.x)),
		y: Math.round(l1s.y + c * (l1e.y - l1s.y))
	};
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/ImportDockingFix.js
function ImportDockingFix(eventBus) {
	function adjustDocking(startPoint, nextPoint, elementMid) {
		var elementTop = {
			x: elementMid.x,
			y: elementMid.y - 50
		};
		var elementLeft = {
			x: elementMid.x - 50,
			y: elementMid.y
		};
		var verticalIntersect = lineIntersect(startPoint, nextPoint, elementMid, elementTop), horizontalIntersect = lineIntersect(startPoint, nextPoint, elementMid, elementLeft);
		var centerIntersect;
		if (verticalIntersect && horizontalIntersect) {
			if (getDistance$1(verticalIntersect, elementMid) > getDistance$1(horizontalIntersect, elementMid)) centerIntersect = horizontalIntersect;
			else centerIntersect = verticalIntersect;
		} else centerIntersect = verticalIntersect || horizontalIntersect;
		startPoint.original = centerIntersect;
	}
	function fixDockings(connection) {
		var waypoints = connection.waypoints;
		adjustDocking(waypoints[0], waypoints[1], getMid(connection.source));
		adjustDocking(waypoints[waypoints.length - 1], waypoints[waypoints.length - 2], getMid(connection.target));
	}
	eventBus.on("bpmnElement.added", function(e) {
		var element = e.element;
		if (element.waypoints) fixDockings(element);
	});
}
ImportDockingFix.$inject = ["eventBus"];
function getDistance$1(p1, p2) {
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/IsHorizontalFix.js
init_ModelUtil();
function IsHorizontalFix(eventBus) {
	CommandInterceptor.call(this, eventBus);
	var elementTypesToUpdate = ["bpmn:Participant", "bpmn:Lane"];
	this.executed([
		"shape.move",
		"shape.create",
		"shape.resize"
	], function(event) {
		var shape = event.context.shape, bo = getBusinessObject(shape), di = getDi(shape);
		if (isAny(bo, elementTypesToUpdate)) {
			var isHorizontal = di.get("isHorizontal");
			if (isHorizontal === void 0) isHorizontal = true;
			di.set("isHorizontal", isHorizontal);
		}
	});
}
IsHorizontalFix.$inject = ["eventBus"];
e(IsHorizontalFix, CommandInterceptor);
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/util/LineAttachmentUtil.js
var sqrt = Math.sqrt;
var min$1 = Math.min;
var max$3 = Math.max;
var abs$3 = Math.abs;
function sq(n) {
	return Math.pow(n, 2);
}
function getDistance(p1, p2) {
	return sqrt(sq(p1.x - p2.x) + sq(p1.y - p2.y));
}
function getAttachment(point, line) {
	var idx = 0, segmentStart, segmentEnd, segmentStartDistance, segmentEndDistance, attachmentPosition, minDistance, intersections, attachment, attachmentDistance, closestAttachmentDistance, closestAttachment;
	for (idx = 0; idx < line.length - 1; idx++) {
		segmentStart = line[idx];
		segmentEnd = line[idx + 1];
		if (pointsEqual(segmentStart, segmentEnd)) intersections = [segmentStart];
		else {
			segmentStartDistance = getDistance(point, segmentStart);
			segmentEndDistance = getDistance(point, segmentEnd);
			minDistance = min$1(segmentStartDistance, segmentEndDistance);
			intersections = getCircleSegmentIntersections(segmentStart, segmentEnd, point, minDistance);
		}
		if (intersections.length < 1) throw new Error("expected between [1, 2] circle -> line intersections");
		if (intersections.length === 1) attachment = {
			type: "bendpoint",
			position: intersections[0],
			segmentIndex: idx,
			bendpointIndex: pointsEqual(segmentStart, intersections[0]) ? idx : idx + 1
		};
		if (intersections.length === 2) {
			attachmentPosition = mid(intersections[0], intersections[1]);
			attachment = {
				type: "segment",
				position: attachmentPosition,
				segmentIndex: idx,
				relativeLocation: getDistance(segmentStart, attachmentPosition) / getDistance(segmentStart, segmentEnd)
			};
		}
		attachmentDistance = getDistance(attachment.position, point);
		if (!closestAttachment || closestAttachmentDistance > attachmentDistance) {
			closestAttachment = attachment;
			closestAttachmentDistance = attachmentDistance;
		}
	}
	return closestAttachment;
}
function getCircleSegmentIntersections(s1, s2, cc, cr) {
	var baX = s2.x - s1.x;
	var baY = s2.y - s1.y;
	var caX = cc.x - s1.x;
	var caY = cc.y - s1.y;
	var a = baX * baX + baY * baY;
	var bBy2 = baX * caX + baY * caY;
	var c = caX * caX + caY * caY - cr * cr;
	var pBy2 = bBy2 / a;
	var q = c / a;
	var disc = pBy2 * pBy2 - q;
	if (disc < 0 && disc > -1e-6) disc = 0;
	if (disc < 0) return [];
	var tmpSqrt = sqrt(disc);
	var abScalingFactor1 = -pBy2 + tmpSqrt;
	var abScalingFactor2 = -pBy2 - tmpSqrt;
	var i1 = {
		x: s1.x - baX * abScalingFactor1,
		y: s1.y - baY * abScalingFactor1
	};
	if (disc === 0) return [i1];
	return [i1, {
		x: s1.x - baX * abScalingFactor2,
		y: s1.y - baY * abScalingFactor2
	}].filter(function(p) {
		return isPointInSegment(p, s1, s2);
	});
}
function isPointInSegment(p, segmentStart, segmentEnd) {
	return fenced(p.x, segmentStart.x, segmentEnd.x) && fenced(p.y, segmentStart.y, segmentEnd.y);
}
function fenced(n, rangeStart, rangeEnd) {
	return n >= min$1(rangeStart, rangeEnd) - EQUAL_THRESHOLD && n <= max$3(rangeStart, rangeEnd) + EQUAL_THRESHOLD;
}
function mid(p1, p2) {
	return {
		x: (p1.x + p2.x) / 2,
		y: (p1.y + p2.y) / 2
	};
}
var EQUAL_THRESHOLD = .1;
function pointsEqual(p1, p2) {
	return abs$3(p1.x - p2.x) <= EQUAL_THRESHOLD && abs$3(p1.y - p2.y) <= EQUAL_THRESHOLD;
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/util/LayoutUtil.js
function findNewLineStartIndex(oldWaypoints, newWaypoints, attachment, hints) {
	var index = attachment.segmentIndex;
	var offset = newWaypoints.length - oldWaypoints.length;
	if (hints.segmentMove) {
		var oldSegmentStartIndex = hints.segmentMove.segmentStartIndex, newSegmentStartIndex = hints.segmentMove.newSegmentStartIndex;
		if (index === oldSegmentStartIndex) return newSegmentStartIndex;
		if (index >= newSegmentStartIndex) return index + offset < newSegmentStartIndex ? newSegmentStartIndex : index + offset;
		return index;
	}
	if (hints.bendpointMove) {
		var insert = hints.bendpointMove.insert, bendpointIndex = hints.bendpointMove.bendpointIndex, newIndex;
		if (offset === 0) return index;
		if (index >= bendpointIndex) newIndex = insert ? index + 1 : index - 1;
		if (index < bendpointIndex) {
			newIndex = index;
			if (insert && attachment.type !== "bendpoint" && bendpointIndex - 1 === index) {
				if (relativePositionMidWaypoint(newWaypoints, bendpointIndex) < attachment.relativeLocation) newIndex++;
			}
		}
		return newIndex;
	}
	if (offset === 0) return index;
	if (hints.connectionStart && index === 0) return 0;
	if (hints.connectionEnd && index === oldWaypoints.length - 2) return newWaypoints.length - 2;
	return Math.floor((newWaypoints.length - 2) / 2);
}
function getAnchorPointAdjustment(position, newWaypoints, oldWaypoints, hints) {
	var dx = 0, dy = 0;
	var oldPosition = {
		point: position,
		delta: {
			x: 0,
			y: 0
		}
	};
	var attachment = getAttachment(position, oldWaypoints), oldLabelLineIndex = attachment.segmentIndex, newLabelLineIndex = findNewLineStartIndex(oldWaypoints, newWaypoints, attachment, hints);
	if (newLabelLineIndex < 0 || newLabelLineIndex > newWaypoints.length - 2 || newLabelLineIndex === null) return oldPosition;
	var oldLabelLine = getLine(oldWaypoints, oldLabelLineIndex), newLabelLine = getLine(newWaypoints, newLabelLineIndex), oldFoot = attachment.position;
	var relativeFootPosition = getRelativeFootPosition(oldLabelLine, oldFoot), angleDelta = getAngleDelta(oldLabelLine, newLabelLine);
	if (attachment.type === "bendpoint") {
		var offset = newWaypoints.length - oldWaypoints.length, oldBendpointIndex = attachment.bendpointIndex, oldBendpoint = oldWaypoints[oldBendpointIndex];
		if (newWaypoints.indexOf(oldBendpoint) !== -1) return oldPosition;
		if (offset === 0) {
			var newBendpoint = newWaypoints[oldBendpointIndex];
			dx = newBendpoint.x - attachment.position.x, dy = newBendpoint.y - attachment.position.y;
			return {
				delta: {
					x: dx,
					y: dy
				},
				point: {
					x: position.x + dx,
					y: position.y + dy
				}
			};
		}
		if (offset < 0 && oldBendpointIndex !== 0 && oldBendpointIndex < oldWaypoints.length - 1) relativeFootPosition = relativePositionMidWaypoint(oldWaypoints, oldBendpointIndex);
	}
	var newFoot = {
		x: (newLabelLine[1].x - newLabelLine[0].x) * relativeFootPosition + newLabelLine[0].x,
		y: (newLabelLine[1].y - newLabelLine[0].y) * relativeFootPosition + newLabelLine[0].y
	};
	var newLabelVector = rotateVector({
		x: position.x - oldFoot.x,
		y: position.y - oldFoot.y
	}, angleDelta);
	dx = newFoot.x + newLabelVector.x - position.x;
	dy = newFoot.y + newLabelVector.y - position.y;
	return {
		point: roundPoint(newFoot),
		delta: roundPoint({
			x: dx,
			y: dy
		})
	};
}
function relativePositionMidWaypoint(waypoints, idx) {
	var distanceSegment1 = getDistancePointPoint(waypoints[idx - 1], waypoints[idx]);
	return distanceSegment1 / (distanceSegment1 + getDistancePointPoint(waypoints[idx], waypoints[idx + 1]));
}
function getAngleDelta(l1, l2) {
	var a1 = getAngle(l1);
	return getAngle(l2) - a1;
}
function getLine(waypoints, idx) {
	return [waypoints[idx], waypoints[idx + 1]];
}
function getRelativeFootPosition(line, foot) {
	var length = getDistancePointPoint(line[0], line[1]), lengthToFoot = getDistancePointPoint(line[0], foot);
	return length === 0 ? 0 : lengthToFoot / length;
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/util/LabelLayoutUtil.js
function getLabelAdjustment(label, newWaypoints, oldWaypoints, hints) {
	return getAnchorPointAdjustment(getMid(label), newWaypoints, oldWaypoints, hints).delta;
}
// ../../node_modules/bpmn-js/lib/util/LineUtil.js
init_dist();
function getReferencePoint(point, lines) {
	if (!lines.length) return;
	return getClosestPointOnLine(point, getNearestLine(point, lines));
}
function asEdges(bounds) {
	return [
		[{
			x: bounds.x,
			y: bounds.y
		}, {
			x: bounds.x + (bounds.width || 0),
			y: bounds.y
		}],
		[{
			x: bounds.x + (bounds.width || 0),
			y: bounds.y
		}, {
			x: bounds.x + (bounds.width || 0),
			y: bounds.y + (bounds.height || 0)
		}],
		[{
			x: bounds.x,
			y: bounds.y + (bounds.height || 0)
		}, {
			x: bounds.x + (bounds.width || 0),
			y: bounds.y + (bounds.height || 0)
		}],
		[{
			x: bounds.x,
			y: bounds.y
		}, {
			x: bounds.x,
			y: bounds.y + (bounds.height || 0)
		}]
	];
}
function asLines(waypoints) {
	var lines = [];
	for (var i = 0; i < waypoints.length - 1; i++) lines.push([waypoints[i], waypoints[i + 1]]);
	return lines;
}
function getNearestLine(point, lines) {
	var distances = lines.map(function(line) {
		return {
			line,
			distance: getDistancePointPoint(point, getClosestPointOnLine(point, line))
		};
	});
	return sortBy(distances, "distance")[0].line;
}
function getClosestPointOnLine(point, line) {
	var start = line[0], end = line[1];
	var dx = end.x - start.x, dy = end.y - start.y;
	var lengthSquared = dx * dx + dy * dy;
	if (lengthSquared === 0) return {
		x: start.x,
		y: start.y
	};
	var t = ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared;
	t = Math.max(0, Math.min(1, t));
	return {
		x: start.x + t * dx,
		y: start.y + t * dy
	};
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/LabelBehavior.js
init_dist();
init_ModelUtil();
var NAME_PROPERTY = "name";
var TEXT_PROPERTY = "text";
function LabelBehavior(eventBus, modeling, bpmnFactory, textRenderer) {
	CommandInterceptor.call(this, eventBus);
	this.postExecute("element.updateProperties", onPropertyUpdate);
	this.postExecute("element.updateModdleProperties", (e) => {
		if (getBusinessObject(e.context.element) === e.context.moddleElement) onPropertyUpdate(e);
	});
	function onPropertyUpdate(e) {
		var context = e.context, element = context.element, properties = context.properties;
		if (NAME_PROPERTY in properties) modeling.updateLabel(element, properties[NAME_PROPERTY]);
		if (TEXT_PROPERTY in properties && is(element, "bpmn:TextAnnotation")) {
			var newBounds = textRenderer.getTextAnnotationBounds({
				x: element.x,
				y: element.y,
				width: element.width,
				height: element.height
			}, properties[TEXT_PROPERTY] || "");
			modeling.updateLabel(element, properties.text, newBounds);
		}
	}
	this.postExecute(["shape.create", "connection.create"], function(e) {
		var context = e.context;
		if ((context.hints || {}).createElementsBehavior === false) return;
		var element = context.shape || context.connection;
		if (isLabel(element) || !isLabelExternal(element)) return;
		if (!getLabel(element)) return;
		modeling.updateLabel(element, getLabel(element));
	});
	this.postExecute("shape.delete", function(event) {
		var context = event.context, labelTarget = context.labelTarget, hints = context.hints || {};
		if (labelTarget && hints.unsetLabel !== false) modeling.updateLabel(labelTarget, null, null, { removeShape: false });
	});
	function getVisibleLabelAdjustment(event) {
		var context = event.context, connection = context.connection, label = connection.label, hints = assign$1({}, context.hints), newWaypoints = context.newWaypoints || connection.waypoints, oldWaypoints = context.oldWaypoints;
		if (typeof hints.startChanged === "undefined") hints.startChanged = !!hints.connectionStart;
		if (typeof hints.endChanged === "undefined") hints.endChanged = !!hints.connectionEnd;
		return getLabelAdjustment(label, newWaypoints, oldWaypoints, hints);
	}
	this.postExecute(["connection.layout", "connection.updateWaypoints"], function(event) {
		var context = event.context;
		if ((context.hints || {}).labelBehavior === false) return;
		var label = context.connection.label, labelAdjustment;
		if (!label || !label.parent) return;
		labelAdjustment = getVisibleLabelAdjustment(event);
		modeling.moveShape(label, labelAdjustment);
	});
	this.postExecute(["shape.replace"], function(event) {
		var context = event.context, newShape = context.newShape, oldShape = context.oldShape;
		var businessObject = getBusinessObject(newShape);
		if (businessObject && isLabelExternal(businessObject) && oldShape.label && newShape.label) {
			newShape.label.x = oldShape.label.x;
			newShape.label.y = oldShape.label.y;
		}
	});
	this.preExecute("shape.resize", function(event) {
		var context = event.context, shape = context.shape, hints = context.hints || {};
		if (!isLabel(shape) || hints.autoResize) return;
		var newBounds = context.newBounds;
		var dimensions = textRenderer.getDimensions(getLabel(shape) || "", {
			box: newBounds,
			style: textRenderer.getExternalStyle()
		});
		var height = Math.ceil(dimensions.height);
		var topEdgeMoved = newBounds.y !== shape.y;
		var bottom = shape.y + shape.height;
		context.newBounds = {
			width: newBounds.width,
			height,
			x: newBounds.x,
			y: topEdgeMoved ? bottom - height : newBounds.y
		};
	});
	this.postExecute("shape.resize", function(event) {
		var context = event.context, shape = context.shape, newBounds = context.newBounds, oldBounds = context.oldBounds;
		if (!hasExternalLabel(shape)) return;
		var label = shape.label;
		var delta = getReferencePointDelta(getReferencePoint(getMid(label), asEdges(oldBounds)), oldBounds, newBounds);
		modeling.moveShape(label, delta);
	});
}
e(LabelBehavior, CommandInterceptor);
LabelBehavior.$inject = [
	"eventBus",
	"modeling",
	"bpmnFactory",
	"textRenderer"
];
function getReferencePointDelta(referencePoint, oldBounds, newBounds) {
	var newReferencePoint = getNewAttachPoint(referencePoint, oldBounds, newBounds);
	return roundPoint(delta(newReferencePoint, referencePoint));
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/util/ConnectionLayoutUtil.js
function getConnectionAdjustment(position, newWaypoints, oldWaypoints, hints) {
	return getAnchorPointAdjustment(position, newWaypoints, oldWaypoints, hints).point;
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/LayoutConnectionBehavior.js
init_dist();
function LayoutConnectionBehavior(eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	function getnewAnchorPoint(event, point) {
		var context = event.context, connection = context.connection, hints = assign$1({}, context.hints), newWaypoints = context.newWaypoints || connection.waypoints, oldWaypoints = context.oldWaypoints;
		if (typeof hints.startChanged === "undefined") hints.startChanged = !!hints.connectionStart;
		if (typeof hints.endChanged === "undefined") hints.endChanged = !!hints.connectionEnd;
		return getConnectionAdjustment(point, newWaypoints, oldWaypoints, hints);
	}
	this.postExecute(["connection.layout", "connection.updateWaypoints"], function(event) {
		var connection = event.context.connection, outgoing = connection.outgoing;
		connection.incoming.forEach(function(connection) {
			var endPoint = connection.waypoints[connection.waypoints.length - 1];
			var newEndpoint = getnewAnchorPoint(event, endPoint);
			var newWaypoints = [].concat(connection.waypoints.slice(0, -1), [newEndpoint]);
			modeling.updateWaypoints(connection, newWaypoints);
		});
		outgoing.forEach(function(connection) {
			var startpoint = connection.waypoints[0];
			var newStartpoint = getnewAnchorPoint(event, startpoint);
			var newWaypoints = [].concat([newStartpoint], connection.waypoints.slice(1));
			modeling.updateWaypoints(connection, newWaypoints);
		});
	});
	this.postExecute(["connection.move"], function(event) {
		var context = event.context;
		var connection = context.connection, outgoing = connection.outgoing, incoming = connection.incoming, delta = context.delta;
		incoming.forEach(function(connection) {
			var endPoint = connection.waypoints[connection.waypoints.length - 1];
			var newEndpoint = {
				x: endPoint.x + delta.x,
				y: endPoint.y + delta.y
			};
			var newWaypoints = [].concat(connection.waypoints.slice(0, -1), [newEndpoint]);
			modeling.updateWaypoints(connection, newWaypoints);
		});
		outgoing.forEach(function(connection) {
			var startpoint = connection.waypoints[0];
			var newStartpoint = {
				x: startpoint.x + delta.x,
				y: startpoint.y + delta.y
			};
			var newWaypoints = [].concat([newStartpoint], connection.waypoints.slice(1));
			modeling.updateWaypoints(connection, newWaypoints);
		});
	});
}
e(LayoutConnectionBehavior, CommandInterceptor);
LayoutConnectionBehavior.$inject = ["eventBus", "modeling"];
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/MessageFlowBehavior.js
init_ModelUtil();
function MessageFlowBehavior(eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	this.postExecute("shape.replace", function(context) {
		var oldShape = context.oldShape, newShape = context.newShape;
		if (!isParticipantCollapse(oldShape, newShape)) return;
		var messageFlows = getMessageFlows(oldShape);
		messageFlows.incoming.forEach(function(incoming) {
			var anchor = getResizedTargetAnchor(incoming, newShape, oldShape);
			modeling.reconnectEnd(incoming, newShape, anchor);
		});
		messageFlows.outgoing.forEach(function(outgoing) {
			var anchor = getResizedSourceAnchor(outgoing, newShape, oldShape);
			modeling.reconnectStart(outgoing, newShape, anchor);
		});
	}, true);
}
MessageFlowBehavior.$inject = ["eventBus", "modeling"];
e(MessageFlowBehavior, CommandInterceptor);
function isParticipantCollapse(oldShape, newShape) {
	return is(oldShape, "bpmn:Participant") && isExpanded(oldShape) && is(newShape, "bpmn:Participant") && !isExpanded(newShape);
}
function getMessageFlows(parent) {
	var elements = selfAndAllChildren([parent], false);
	var incoming = [], outgoing = [];
	elements.forEach(function(element) {
		if (element === parent) return;
		element.incoming.forEach(function(connection) {
			if (is(connection, "bpmn:MessageFlow")) incoming.push(connection);
		});
		element.outgoing.forEach(function(connection) {
			if (is(connection, "bpmn:MessageFlow")) outgoing.push(connection);
		});
	}, []);
	return {
		incoming,
		outgoing
	};
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/util/NonInterruptingUtil.js
init_ModelUtil();
var NON_INTERRUPTING_EVENT_TYPES = [
	"bpmn:MessageEventDefinition",
	"bpmn:TimerEventDefinition",
	"bpmn:EscalationEventDefinition",
	"bpmn:ConditionalEventDefinition",
	"bpmn:SignalEventDefinition"
];
function canBeNonInterrupting(shape) {
	const businessObject = getBusinessObject(shape);
	if (!is(businessObject, "bpmn:BoundaryEvent") && !(is(businessObject, "bpmn:StartEvent") && isEventSubProcess(businessObject.$parent))) return false;
	const eventDefinitions = businessObject.get("eventDefinitions");
	if (!eventDefinitions || !eventDefinitions.length) return false;
	return NON_INTERRUPTING_EVENT_TYPES.some((event) => is(eventDefinitions[0], event));
}
function getInterruptingProperty(shape) {
	return is(shape, "bpmn:BoundaryEvent") ? "cancelActivity" : "isInterrupting";
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/NonInterruptingBehavior.js
init_ModelUtil();
function NonInterruptingBehavior(injector, modeling) {
	injector.invoke(CommandInterceptor, this);
	this.postExecuted("shape.replace", function(event) {
		const oldShape = event.context.oldShape;
		const newShape = event.context.newShape;
		const hints = event.context.hints;
		if (!canBeNonInterrupting(newShape)) return;
		const property = getInterruptingProperty(newShape);
		if (hints.targetElement && hints.targetElement[property] !== void 0) return;
		const isOldInterrupting = getBusinessObject(oldShape).get(property);
		if (isOldInterrupting === getBusinessObject(newShape).get(property)) return;
		modeling.updateProperties(newShape, { [property]: isOldInterrupting });
	});
}
NonInterruptingBehavior.$inject = ["injector", "modeling"];
e(NonInterruptingBehavior, CommandInterceptor);
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/RemoveEmbeddedLabelBoundsBehavior.js
init_ModelUtil();
function RemoveEmbeddedLabelBoundsBehavior(eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	this.preExecute("shape.resize", function(context) {
		var shape = context.shape;
		var di = getDi(shape), label = di && di.get("label");
		if (label && label.get("bounds")) modeling.updateModdleProperties(shape, label, { bounds: void 0 });
	}, true);
}
e(RemoveEmbeddedLabelBoundsBehavior, CommandInterceptor);
RemoveEmbeddedLabelBoundsBehavior.$inject = ["eventBus", "modeling"];
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/RemoveElementBehavior.js
init_ModelUtil();
function RemoveElementBehavior(eventBus, bpmnRules, modeling) {
	CommandInterceptor.call(this, eventBus);
	this.preExecute("shape.delete", function(e) {
		var shape = e.context.shape;
		if (shape.incoming.length !== 1 || shape.outgoing.length !== 1) return;
		var inConnection = shape.incoming[0], outConnection = shape.outgoing[0];
		if (!is(inConnection, "bpmn:SequenceFlow") || !is(outConnection, "bpmn:SequenceFlow")) return;
		if (bpmnRules.canConnect(inConnection.source, outConnection.target, inConnection)) {
			var newWaypoints = getNewWaypoints(inConnection.waypoints, outConnection.waypoints);
			modeling.reconnectEnd(inConnection, outConnection.target, newWaypoints);
		}
	});
}
e(RemoveElementBehavior, CommandInterceptor);
RemoveElementBehavior.$inject = [
	"eventBus",
	"bpmnRules",
	"modeling"
];
function getDocking(point) {
	return point.original || point;
}
function getNewWaypoints(inWaypoints, outWaypoints) {
	var intersection = lineIntersect(getDocking(inWaypoints[inWaypoints.length - 2]), getDocking(inWaypoints[inWaypoints.length - 1]), getDocking(outWaypoints[1]), getDocking(outWaypoints[0]));
	if (intersection) return [].concat(inWaypoints.slice(0, inWaypoints.length - 1), [intersection], outWaypoints.slice(1));
	else return [getDocking(inWaypoints[0]), getDocking(outWaypoints[outWaypoints.length - 1])];
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/RemoveParticipantBehavior.js
init_ModelUtil();
function RemoveParticipantBehavior(eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	this.preExecute("shape.delete", function(context) {
		var shape = context.shape, parent = shape.parent;
		if (is(shape, "bpmn:Participant")) context.collaborationRoot = parent;
	}, true);
	this.postExecute("shape.delete", function(context) {
		var collaborationRoot = context.collaborationRoot;
		if (collaborationRoot && !collaborationRoot.businessObject.participants.length) {
			var process = modeling.makeProcess();
			var children = collaborationRoot.children.slice();
			modeling.moveElements(children, {
				x: 0,
				y: 0
			}, process);
		}
	}, true);
}
RemoveParticipantBehavior.$inject = ["eventBus", "modeling"];
e(RemoveParticipantBehavior, CommandInterceptor);
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/ReplaceConnectionBehavior.js
init_dist();
init_ModelUtil();
function ReplaceConnectionBehavior(eventBus, modeling, bpmnRules, injector) {
	CommandInterceptor.call(this, eventBus);
	var dragging = injector.get("dragging", false);
	function fixConnection(connection) {
		var source = connection.source, target = connection.target;
		if (!connection.parent) return;
		var replacementType, remove;
		if (is(connection, "bpmn:SequenceFlow")) {
			if (!bpmnRules.canConnectSequenceFlow(source, target)) remove = true;
			if (bpmnRules.canConnectMessageFlow(source, target)) replacementType = "bpmn:MessageFlow";
		}
		if (is(connection, "bpmn:MessageFlow")) {
			if (!bpmnRules.canConnectMessageFlow(source, target)) remove = true;
			if (bpmnRules.canConnectSequenceFlow(source, target)) replacementType = "bpmn:SequenceFlow";
		}
		if (remove) modeling.removeConnection(connection);
		if (replacementType) modeling.connect(source, target, {
			type: replacementType,
			waypoints: connection.waypoints.slice()
		});
	}
	function replaceReconnectedConnection(event) {
		var context = event.context, connection = context.connection, source = context.newSource || connection.source, target = context.newTarget || connection.target, allowed = bpmnRules.canConnect(source, target), replacement;
		if (!allowed || allowed.type === connection.type) return;
		replacement = modeling.connect(source, target, {
			type: allowed.type,
			associationDirection: allowed.associationDirection,
			waypoints: connection.waypoints.slice()
		});
		if (connection.parent) modeling.removeConnection(connection);
		context.connection = replacement;
		if (dragging) cleanDraggingSelection(connection, replacement);
	}
	function cleanDraggingSelection(oldConnection, newConnection) {
		var context = dragging.context(), previousSelection = context && context.payload.previousSelection, index;
		if (!previousSelection || !previousSelection.length) return;
		index = previousSelection.indexOf(oldConnection);
		if (index === -1) return;
		previousSelection.splice(index, 1, newConnection);
	}
	this.postExecuted("elements.move", function(context) {
		var allConnections = context.closure.allConnections;
		forEach(allConnections, fixConnection);
	}, true);
	this.preExecute("connection.reconnect", replaceReconnectedConnection);
	this.postExecuted("element.updateProperties", function(event) {
		var context = event.context, properties = context.properties, element = context.element, businessObject = element.businessObject, connection;
		if (properties.default) {
			connection = find(element.outgoing, matchPattern({ id: element.businessObject.default.id }));
			if (connection) modeling.updateProperties(connection, { conditionExpression: void 0 });
		}
		if (properties.conditionExpression && businessObject.sourceRef.default === businessObject) modeling.updateProperties(element.source, { default: void 0 });
	});
}
e(ReplaceConnectionBehavior, CommandInterceptor);
ReplaceConnectionBehavior.$inject = [
	"eventBus",
	"modeling",
	"bpmnRules",
	"injector"
];
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/ReplaceElementBehaviour.js
init_dist();
function ReplaceElementBehaviour(bpmnReplace, bpmnRules, elementRegistry, injector, modeling, selection) {
	injector.invoke(CommandInterceptor, this);
	this._bpmnReplace = bpmnReplace;
	this._elementRegistry = elementRegistry;
	this._selection = selection;
	this.postExecuted(["elements.create"], 500, function(event) {
		var context = event.context, target = context.parent, elements = context.elements;
		var elementReplacements = reduce(elements, function(replacements, element) {
			var canReplace = bpmnRules.canReplace([element], element.host || element.parent || target);
			return canReplace ? replacements.concat(canReplace.replacements) : replacements;
		}, []);
		if (elementReplacements.length) this._replaceElements(elements, elementReplacements);
	}, this);
	this.postExecuted(["elements.move"], 500, function(event) {
		var context = event.context, target = context.newParent, newHost = context.newHost, elements = [];
		forEach(context.closure.topLevel, function(topLevelElements) {
			if (isEventSubProcess(topLevelElements)) elements = elements.concat(topLevelElements.children);
			else elements = elements.concat(topLevelElements);
		});
		if (elements.length === 1 && newHost) target = newHost;
		var canReplace = bpmnRules.canReplace(elements, target);
		if (canReplace) this._replaceElements(elements, canReplace.replacements, newHost);
	}, this);
	this.postExecute(["shape.replace"], 1500, function(e) {
		var context = e.context, oldShape = context.oldShape, newShape = context.newShape, attachers = oldShape.attachers, canReplace;
		if (attachers && attachers.length) {
			canReplace = bpmnRules.canReplace(attachers, newShape);
			this._replaceElements(attachers, canReplace.replacements);
		}
	}, this);
	this.postExecuted(["shape.replace"], 1500, function(e) {
		var context = e.context, oldShape = context.oldShape, newShape = context.newShape;
		modeling.unclaimId(oldShape.businessObject.id, oldShape.businessObject);
		modeling.updateProperties(newShape, { id: oldShape.id });
	});
}
e(ReplaceElementBehaviour, CommandInterceptor);
ReplaceElementBehaviour.prototype._replaceElements = function(elements, newElements) {
	var elementRegistry = this._elementRegistry, bpmnReplace = this._bpmnReplace, selection = this._selection;
	forEach(newElements, function(replacement) {
		var newElement = { type: replacement.newElementType };
		var oldElement = elementRegistry.get(replacement.oldElementId);
		var idx = elements.indexOf(oldElement);
		elements[idx] = bpmnReplace.replaceElement(oldElement, newElement, { select: false });
	});
	if (newElements) selection.select(elements);
};
ReplaceElementBehaviour.$inject = [
	"bpmnReplace",
	"bpmnRules",
	"elementRegistry",
	"injector",
	"modeling",
	"selection"
];
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/ResizeBehavior.js
init_ModelUtil();
var HIGH_PRIORITY$13 = 1500;
var GROUP_MIN_DIMENSIONS = {
	width: 140,
	height: 120
};
var LANE_MIN_DIMENSIONS = {
	width: 300,
	height: 60
};
var VERTICAL_LANE_MIN_DIMENSIONS = {
	width: 60,
	height: 300
};
var PARTICIPANT_MIN_DIMENSIONS = {
	width: 300,
	height: 150
};
var VERTICAL_PARTICIPANT_MIN_DIMENSIONS = {
	width: 150,
	height: 300
};
var SUB_PROCESS_MIN_DIMENSIONS = {
	width: 140,
	height: 120
};
var TEXT_ANNOTATION_MIN_DIMENSIONS = {
	width: 100,
	height: 40
};
function ResizeBehavior(eventBus) {
	eventBus.on("resize.start", HIGH_PRIORITY$13, function(event) {
		var context = event.context, shape = context.shape, direction = context.direction, balanced = context.balanced;
		if (is(shape, "bpmn:Lane") || is(shape, "bpmn:Participant")) context.resizeConstraints = getParticipantResizeConstraints(shape, direction, balanced);
		if (is(shape, "bpmn:SubProcess") && isExpanded(shape)) context.minDimensions = SUB_PROCESS_MIN_DIMENSIONS;
		if (is(shape, "bpmn:TextAnnotation")) context.minDimensions = TEXT_ANNOTATION_MIN_DIMENSIONS;
	});
}
ResizeBehavior.$inject = ["eventBus"];
var abs$2 = Math.abs;
var min = Math.min;
var max$2 = Math.max;
function addToTrbl(trbl, attr, value, choice) {
	var current = trbl[attr];
	trbl[attr] = current === void 0 ? value : choice(value, current);
}
function addMin(trbl, attr, value) {
	return addToTrbl(trbl, attr, value, min);
}
function addMax(trbl, attr, value) {
	return addToTrbl(trbl, attr, value, max$2);
}
var LANE_PADDING = {
	top: 20,
	left: 50,
	right: 20,
	bottom: 20
};
var VERTICAL_LANE_PADDING = {
	top: 50,
	left: 20,
	right: 20,
	bottom: 20
};
function getParticipantResizeConstraints(laneShape, resizeDirection, balanced) {
	var lanesRoot = getLanesRoot(laneShape);
	var isFirst = true, isLast = true;
	var allLanes = collectLanes(lanesRoot, [lanesRoot]);
	var laneTrbl = asTRBL(laneShape);
	var maxTrbl = {}, minTrbl = {};
	var isHorizontalLane = isHorizontal$1(laneShape);
	var minDimensions = isHorizontalLane ? LANE_MIN_DIMENSIONS : VERTICAL_LANE_MIN_DIMENSIONS;
	if (/n/.test(resizeDirection)) minTrbl.top = laneTrbl.bottom - minDimensions.height;
	else if (/e/.test(resizeDirection)) minTrbl.right = laneTrbl.left + minDimensions.width;
	else if (/s/.test(resizeDirection)) minTrbl.bottom = laneTrbl.top + minDimensions.height;
	else if (/w/.test(resizeDirection)) minTrbl.left = laneTrbl.right - minDimensions.width;
	allLanes.forEach(function(other) {
		var otherTrbl = asTRBL(other);
		if (isHorizontalLane) {
			if (otherTrbl.top < laneTrbl.top - 10) isFirst = false;
			if (otherTrbl.bottom > laneTrbl.bottom + 10) isLast = false;
		} else {
			if (otherTrbl.left < laneTrbl.left - 10) isFirst = false;
			if (otherTrbl.right > laneTrbl.right + 10) isLast = false;
		}
		if (/n/.test(resizeDirection)) {
			if (balanced && abs$2(laneTrbl.top - otherTrbl.bottom) < 10) addMax(maxTrbl, "top", otherTrbl.top + minDimensions.height);
			if (abs$2(laneTrbl.top - otherTrbl.top) < 5) addMin(minTrbl, "top", otherTrbl.bottom - minDimensions.height);
		}
		if (/e/.test(resizeDirection)) {
			if (balanced && abs$2(laneTrbl.right - otherTrbl.left) < 10) addMin(maxTrbl, "right", otherTrbl.right - minDimensions.width);
			if (abs$2(laneTrbl.right - otherTrbl.right) < 5) addMax(minTrbl, "right", otherTrbl.left + minDimensions.width);
		}
		if (/s/.test(resizeDirection)) {
			if (balanced && abs$2(laneTrbl.bottom - otherTrbl.top) < 10) addMin(maxTrbl, "bottom", otherTrbl.bottom - minDimensions.height);
			if (abs$2(laneTrbl.bottom - otherTrbl.bottom) < 5) addMax(minTrbl, "bottom", otherTrbl.top + minDimensions.height);
		}
		if (/w/.test(resizeDirection)) {
			if (balanced && abs$2(laneTrbl.left - otherTrbl.right) < 10) addMax(maxTrbl, "left", otherTrbl.left + minDimensions.width);
			if (abs$2(laneTrbl.left - otherTrbl.left) < 5) addMin(minTrbl, "left", otherTrbl.right - minDimensions.width);
		}
	});
	var flowElements = lanesRoot.children.filter(function(s) {
		return !s.hidden && !s.waypoints && (is(s, "bpmn:FlowElement") || is(s, "bpmn:Artifact"));
	});
	var padding = isHorizontalLane ? LANE_PADDING : VERTICAL_LANE_PADDING;
	flowElements.forEach(function(flowElement) {
		var flowElementTrbl = asTRBL(flowElement);
		if (/n/.test(resizeDirection) && (!isHorizontalLane || isFirst)) addMin(minTrbl, "top", flowElementTrbl.top - padding.top);
		if (/e/.test(resizeDirection) && (isHorizontalLane || isLast)) addMax(minTrbl, "right", flowElementTrbl.right + padding.right);
		if (/s/.test(resizeDirection) && (!isHorizontalLane || isLast)) addMax(minTrbl, "bottom", flowElementTrbl.bottom + padding.bottom);
		if (/w/.test(resizeDirection) && (isHorizontalLane || isFirst)) addMin(minTrbl, "left", flowElementTrbl.left - padding.left);
	});
	return {
		min: minTrbl,
		max: maxTrbl
	};
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/ResizeLaneBehavior.js
init_ModelUtil();
var SLIGHTLY_HIGHER_PRIORITY = 1001;
function ResizeLaneBehavior(eventBus, modeling) {
	eventBus.on("resize.start", SLIGHTLY_HIGHER_PRIORITY + 500, function(event) {
		var context = event.context, shape = context.shape;
		if (is(shape, "bpmn:Lane") || is(shape, "bpmn:Participant")) context.balanced = !hasPrimaryModifier(event);
	});
	eventBus.on("resize.end", SLIGHTLY_HIGHER_PRIORITY, function(event) {
		var context = event.context, shape = context.shape, canExecute = context.canExecute, newBounds = context.newBounds;
		if (is(shape, "bpmn:Lane") || is(shape, "bpmn:Participant")) {
			if (canExecute) {
				newBounds = roundBounds(newBounds);
				modeling.resizeLane(shape, newBounds, context.balanced);
			}
			return false;
		}
	});
}
ResizeLaneBehavior.$inject = ["eventBus", "modeling"];
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/RootElementReferenceBehavior.js
init_dist();
init_ModelUtil();
var LOW_PRIORITY$10 = 500;
function RootElementReferenceBehavior(bpmnjs, eventBus, injector, moddleCopy, bpmnFactory) {
	injector.invoke(CommandInterceptor, this);
	function canHaveRootElementReference(element) {
		return isAny(element, ["bpmn:ReceiveTask", "bpmn:SendTask"]) || hasAnyEventDefinition(element, [
			"bpmn:ErrorEventDefinition",
			"bpmn:EscalationEventDefinition",
			"bpmn:MessageEventDefinition",
			"bpmn:SignalEventDefinition"
		]);
	}
	function hasRootElement(rootElement) {
		var rootElements = bpmnjs.getDefinitions().get("rootElements");
		return !!find(rootElements, matchPattern({ id: rootElement.id }));
	}
	function getRootElementReferencePropertyName(eventDefinition) {
		if (is(eventDefinition, "bpmn:ErrorEventDefinition")) return "errorRef";
		else if (is(eventDefinition, "bpmn:EscalationEventDefinition")) return "escalationRef";
		else if (is(eventDefinition, "bpmn:MessageEventDefinition")) return "messageRef";
		else if (is(eventDefinition, "bpmn:SignalEventDefinition")) return "signalRef";
	}
	function getRootElement(businessObject) {
		if (isAny(businessObject, ["bpmn:ReceiveTask", "bpmn:SendTask"])) return businessObject.get("messageRef");
		var eventDefinition = businessObject.get("eventDefinitions")[0];
		return eventDefinition.get(getRootElementReferencePropertyName(eventDefinition));
	}
	function setRootElement(businessObject, rootElement) {
		if (isAny(businessObject, ["bpmn:ReceiveTask", "bpmn:SendTask"])) return businessObject.set("messageRef", rootElement);
		var eventDefinition = businessObject.get("eventDefinitions")[0];
		return eventDefinition.set(getRootElementReferencePropertyName(eventDefinition), rootElement);
	}
	this.executed([
		"shape.create",
		"element.updateProperties",
		"element.updateModdleProperties"
	], function(context) {
		var shape = context.shape || context.element;
		if (!canHaveRootElementReference(shape)) return;
		var rootElement = getRootElement(getBusinessObject(shape)), rootElements;
		if (rootElement && !hasRootElement(rootElement)) {
			rootElements = bpmnjs.getDefinitions().get("rootElements");
			add(rootElements, rootElement);
			context.addedRootElement = rootElement;
		}
	}, true);
	this.reverted([
		"shape.create",
		"element.updateProperties",
		"element.updateModdleProperties"
	], function(context) {
		var addedRootElement = context.addedRootElement;
		if (!addedRootElement) return;
		var rootElements = bpmnjs.getDefinitions().get("rootElements");
		remove(rootElements, addedRootElement);
	}, true);
	eventBus.on("copyPaste.copyElement", function(context) {
		var descriptor = context.descriptor, element = context.element;
		if (element.labelTarget || !canHaveRootElementReference(element)) return;
		var rootElement = getRootElement(getBusinessObject(element));
		if (rootElement) descriptor.referencedRootElement = rootElement;
	});
	eventBus.on("copyPaste.pasteElement", LOW_PRIORITY$10, function(context) {
		var descriptor = context.descriptor, businessObject = descriptor.businessObject, referencedRootElement = descriptor.referencedRootElement;
		if (!referencedRootElement) return;
		if (!hasRootElement(referencedRootElement)) referencedRootElement = moddleCopy.copyElement(referencedRootElement, bpmnFactory.create(referencedRootElement.$type));
		setRootElement(businessObject, referencedRootElement);
		delete descriptor.referencedRootElement;
	});
}
RootElementReferenceBehavior.$inject = [
	"bpmnjs",
	"eventBus",
	"injector",
	"moddleCopy",
	"bpmnFactory"
];
e(RootElementReferenceBehavior, CommandInterceptor);
function hasAnyEventDefinition(element, types) {
	if (!isArray(types)) types = [types];
	return some(types, function(type) {
		return hasEventDefinition$2(element, type);
	});
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/SpaceToolBehavior.js
init_dist();
init_ModelUtil();
var max$1 = Math.max;
function SpaceToolBehavior(eventBus) {
	eventBus.on("spaceTool.getMinDimensions", function(context) {
		var shapes = context.shapes, axis = context.axis, start = context.start, minDimensions = {};
		forEach(shapes, function(shape) {
			var id = shape.id;
			if (is(shape, "bpmn:Participant")) minDimensions[id] = getParticipantMinDimensions(shape, axis, start);
			if (is(shape, "bpmn:Lane")) minDimensions[id] = isHorizontal$1(shape) ? LANE_MIN_DIMENSIONS : VERTICAL_LANE_MIN_DIMENSIONS;
			if (is(shape, "bpmn:SubProcess") && isExpanded(shape)) minDimensions[id] = SUB_PROCESS_MIN_DIMENSIONS;
			if (is(shape, "bpmn:TextAnnotation")) minDimensions[id] = TEXT_ANNOTATION_MIN_DIMENSIONS;
			if (is(shape, "bpmn:Group")) minDimensions[id] = GROUP_MIN_DIMENSIONS;
		});
		return minDimensions;
	});
}
SpaceToolBehavior.$inject = ["eventBus"];
function isHorizontalAxis(axis) {
	return axis === "x";
}
function getParticipantMinDimensions(participant, axis, start) {
	var isHorizontalLane = isHorizontal$1(participant);
	if (!hasChildLanes(participant)) return isHorizontalLane ? PARTICIPANT_MIN_DIMENSIONS : VERTICAL_PARTICIPANT_MIN_DIMENSIONS;
	var isHorizontalResize = isHorizontalAxis(axis);
	var minDimensions = {};
	if (isHorizontalResize) {
		if (isHorizontalLane) minDimensions = PARTICIPANT_MIN_DIMENSIONS;
		else minDimensions = {
			width: getParticipantMinWidth(participant, start, isHorizontalResize),
			height: VERTICAL_PARTICIPANT_MIN_DIMENSIONS.height
		};
	} else if (isHorizontalLane) minDimensions = {
		width: PARTICIPANT_MIN_DIMENSIONS.width,
		height: getParticipantMinHeight(participant, start, isHorizontalResize)
	};
	else minDimensions = VERTICAL_PARTICIPANT_MIN_DIMENSIONS;
	return minDimensions;
}
function getParticipantMinHeight(participant, start, isHorizontalResize) {
	var lanesMinHeight = getLanesMinHeight(participant, start, isHorizontalResize);
	return max$1(PARTICIPANT_MIN_DIMENSIONS.height, lanesMinHeight);
}
function getParticipantMinWidth(participant, start, isHorizontalResize) {
	var lanesMinWidth = getLanesMinWidth(participant, start, isHorizontalResize);
	return max$1(VERTICAL_PARTICIPANT_MIN_DIMENSIONS.width, lanesMinWidth);
}
function hasChildLanes(element) {
	return !!getChildLanes(element).length;
}
function getLanesMinHeight(participant, resizeStart, isHorizontalResize) {
	var resizedLane = findResizedLane(getChildLanes(participant), resizeStart, isHorizontalResize);
	return participant.height - resizedLane.height + LANE_MIN_DIMENSIONS.height;
}
function getLanesMinWidth(participant, resizeStart, isHorizontalResize) {
	var resizedLane = findResizedLane(getChildLanes(participant), resizeStart, isHorizontalResize);
	return participant.width - resizedLane.width + VERTICAL_LANE_MIN_DIMENSIONS.width;
}
function findResizedLane(lanes, resizeStart, isHorizontalResize) {
	var i = 0, lane, childLanes;
	for (; i < lanes.length; i++) {
		lane = lanes[i];
		if (!isHorizontalResize && resizeStart >= lane.y && resizeStart <= lane.y + lane.height || isHorizontalResize && resizeStart >= lane.x && resizeStart <= lane.x + lane.width) {
			childLanes = getChildLanes(lane);
			if (childLanes.length) return findResizedLane(childLanes, resizeStart, isHorizontalResize);
			return lane;
		}
	}
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/SubProcessPlaneBehavior.js
init_dist();
init_ModelUtil();
var LOW_PRIORITY$9 = 400;
var HIGH_PRIORITY$12 = 600;
var DEFAULT_POSITION = {
	x: 180,
	y: 160
};
function SubProcessPlaneBehavior(canvas, eventBus, modeling, elementFactory, bpmnFactory, bpmnjs, elementRegistry) {
	CommandInterceptor.call(this, eventBus);
	this._canvas = canvas;
	this._eventBus = eventBus;
	this._modeling = modeling;
	this._elementFactory = elementFactory;
	this._bpmnFactory = bpmnFactory;
	this._bpmnjs = bpmnjs;
	this._elementRegistry = elementRegistry;
	var self = this;
	function isCollapsedSubProcess(element) {
		return is(element, "bpmn:SubProcess") && !isExpanded(element);
	}
	function createRoot(context) {
		var shape = context.shape, rootElement = context.newRootElement;
		var businessObject = getBusinessObject(shape);
		rootElement = self._addDiagram(rootElement || businessObject);
		context.newRootElement = canvas.addRootElement(rootElement);
	}
	function removeRoot(context) {
		var shape = context.shape;
		var businessObject = getBusinessObject(shape);
		self._removeDiagram(businessObject);
		var rootElement = context.newRootElement = elementRegistry.get(getPlaneIdFromShape(businessObject));
		canvas.removeRootElement(rootElement);
	}
	this.executed("shape.create", function(context) {
		var shape = context.shape;
		if (!isCollapsedSubProcess(shape)) return;
		createRoot(context);
	}, true);
	this.postExecuted("elements.create", function(context) {
		var elements = context.elements;
		forEach(elements, function(element) {
			if (!isCollapsedSubProcess(element)) return;
			var rootElement = elementRegistry.get(getPlaneIdFromShape(element));
			if (!rootElement || !element.children || !element.children.length) return;
			var children = getSubProcessChildren(element);
			self._showRecursively(children);
			self._moveChildrenToShape(children, rootElement);
		});
	}, true);
	this.reverted("shape.create", function(context) {
		var shape = context.shape;
		if (!isCollapsedSubProcess(shape)) return;
		removeRoot(context);
	}, true);
	this.preExecute("shape.delete", function(context) {
		var shape = context.shape;
		if (!is(shape, "bpmn:SubProcess") || !isExpanded(shape)) return;
		forEach(collectElementsAnnotations([shape]), (entry) => {
			modeling.removeShape(entry.annotation);
		});
	}, true);
	this.preExecuted("shape.delete", function(context) {
		var shape = context.shape;
		if (!isCollapsedSubProcess(shape)) return;
		var attachedRoot = elementRegistry.get(getPlaneIdFromShape(shape));
		if (!attachedRoot) return;
		modeling.removeElements(attachedRoot.children.slice());
	}, true);
	this.executed("shape.delete", function(context) {
		var shape = context.shape;
		if (!isCollapsedSubProcess(shape)) return;
		removeRoot(context);
	}, true);
	this.reverted("shape.delete", function(context) {
		var shape = context.shape;
		if (!isCollapsedSubProcess(shape)) return;
		createRoot(context);
	}, true);
	this.preExecuted("shape.replace", function(context) {
		var oldShape = context.oldShape;
		var newShape = context.newShape;
		if (!isCollapsedSubProcess(oldShape) || !isCollapsedSubProcess(newShape)) return;
		context.oldRoot = canvas.removeRootElement(getPlaneIdFromShape(oldShape));
	}, true);
	this.postExecuted("shape.replace", function(context) {
		var newShape = context.newShape, source = context.oldRoot, target = canvas.findRoot(getPlaneIdFromShape(newShape));
		if (!source || !target) return;
		var elements = source.children;
		modeling.moveElements(elements, {
			x: 0,
			y: 0
		}, target);
	}, true);
	this.executed("element.updateProperties", function(context) {
		var shape = context.element;
		if (!is(shape, "bpmn:SubProcess")) return;
		var properties = context.properties;
		var oldId = context.oldProperties.id, newId = properties.id;
		if (oldId === newId) return;
		if (isPlane(shape)) {
			elementRegistry.updateId(shape, toPlaneId(newId));
			elementRegistry.updateId(oldId, newId);
			return;
		}
		if (!elementRegistry.get(toPlaneId(oldId))) return;
		elementRegistry.updateId(toPlaneId(oldId), toPlaneId(newId));
	}, true);
	this.reverted("element.updateProperties", function(context) {
		var shape = context.element;
		if (!is(shape, "bpmn:SubProcess")) return;
		var properties = context.properties;
		var oldId = context.oldProperties.id, newId = properties.id;
		if (oldId === newId) return;
		if (isPlane(shape)) {
			elementRegistry.updateId(shape, toPlaneId(oldId));
			elementRegistry.updateId(newId, oldId);
			return;
		}
		var planeElement = elementRegistry.get(toPlaneId(newId));
		if (!planeElement) return;
		elementRegistry.updateId(planeElement, toPlaneId(oldId));
	}, true);
	eventBus.on("element.changed", function(context) {
		var element = context.element;
		if (!isPlane(element)) return;
		var plane = element;
		var primaryShape = elementRegistry.get(getShapeIdFromPlane(plane));
		if (!primaryShape || primaryShape === plane) return;
		eventBus.fire("element.changed", { element: primaryShape });
	});
	this.executed("shape.toggleCollapse", LOW_PRIORITY$9, function(context) {
		var shape = context.shape;
		if (!is(shape, "bpmn:SubProcess")) return;
		if (!isExpanded(shape)) {
			createRoot(context);
			self._showRecursively(shape.children);
		} else removeRoot(context);
	}, true);
	this.reverted("shape.toggleCollapse", LOW_PRIORITY$9, function(context) {
		var shape = context.shape;
		if (!is(shape, "bpmn:SubProcess")) return;
		if (!isExpanded(shape)) {
			createRoot(context);
			self._showRecursively(shape.children);
		} else removeRoot(context);
	}, true);
	this.postExecuted("shape.toggleCollapse", HIGH_PRIORITY$12, function(context) {
		var shape = context.shape;
		if (!is(shape, "bpmn:SubProcess")) return;
		var rootElement = context.newRootElement;
		if (!rootElement) return;
		if (!isExpanded(shape)) {
			self._disconnectSharedAnnotations(shape);
			var children = getSubProcessChildren(shape);
			self._moveChildrenToShape(children, rootElement);
		} else {
			self._moveChildrenToShape(rootElement.children.slice(), shape);
			forEach(collectElementsAnnotations(shape.children), (entry) => {
				modeling.moveShape(entry.annotation, {
					x: 0,
					y: 0
				}, shape.parent);
				forEach(entry.associations, (association) => {
					modeling.moveConnection(association, {
						x: 0,
						y: 0
					}, shape.parent);
				});
			});
		}
	}, true);
	eventBus.on("copyPaste.createTree", function(context) {
		var element = context.element, children = context.children;
		if (!isCollapsedSubProcess(element)) return;
		var id = getPlaneIdFromShape(element);
		var parent = elementRegistry.get(id);
		if (parent) children.push.apply(children, parent.children);
	});
	eventBus.on("copyPaste.copyElement", function(context) {
		var descriptor = context.descriptor, element = context.element, elements = context.elements;
		var parent = element.parent;
		if (!is(getDi(parent), "bpmndi:BPMNPlane")) return;
		var parentId = getShapeIdFromPlane(parent);
		var referencedShape = find(elements, function(element) {
			return element.id === parentId;
		});
		if (!referencedShape) return;
		descriptor.parent = referencedShape.id;
	});
	eventBus.on("copyPaste.pasteElement", function(context) {
		var descriptor = context.descriptor;
		if (!descriptor.parent) return;
		if (isCollapsedSubProcess(descriptor.parent) || descriptor.parent.hidden) descriptor.hidden = true;
	});
}
e(SubProcessPlaneBehavior, CommandInterceptor);
SubProcessPlaneBehavior.prototype._moveChildrenToShape = function(children, target) {
	var modeling = this._modeling;
	if (!children.length) return;
	var visibleChildren = children.filter(function(child) {
		return !child.hidden;
	});
	if (!visibleChildren.length) {
		modeling.moveElements(children, {
			x: 0,
			y: 0
		}, target, { autoResize: false });
		return;
	}
	var childrenBounds = getBBox(visibleChildren);
	var offset;
	if (!target.x) offset = {
		x: DEFAULT_POSITION.x - childrenBounds.x,
		y: DEFAULT_POSITION.y - childrenBounds.y
	};
	else {
		var targetMid = getMid(target);
		var childrenMid = getMid(childrenBounds);
		offset = {
			x: targetMid.x - childrenMid.x,
			y: targetMid.y - childrenMid.y
		};
	}
	modeling.moveElements(children, offset, target, { autoResize: false });
};
SubProcessPlaneBehavior.prototype._disconnectSharedAnnotations = function(shape) {
	var modeling = this._modeling;
	var sharedAnnotations = new Set(getElementAnnotations(shape).map((entry) => entry.annotation));
	if (!sharedAnnotations.size) return;
	forEach(collectElementsAnnotations(shape.children), (entry) => {
		if (sharedAnnotations.has(entry.annotation)) forEach(entry.associations, (association) => {
			modeling.removeConnection(association);
		});
	});
};
SubProcessPlaneBehavior.prototype._showRecursively = function(elements, hidden) {
	var self = this;
	var result = [];
	elements.forEach(function(element) {
		element.hidden = !!hidden;
		result = result.concat(element);
		if (element.children) result = result.concat(self._showRecursively(element.children, element.collapsed || hidden));
	});
	return result;
};
SubProcessPlaneBehavior.prototype._addDiagram = function(planeElement) {
	var diagrams = this._bpmnjs.getDefinitions().diagrams;
	if (!planeElement.businessObject) planeElement = this._createNewDiagram(planeElement);
	diagrams.push(planeElement.di.$parent);
	return planeElement;
};
SubProcessPlaneBehavior.prototype._createNewDiagram = function(bpmnElement) {
	var bpmnFactory = this._bpmnFactory, elementFactory = this._elementFactory;
	var diPlane = bpmnFactory.create("bpmndi:BPMNPlane", { bpmnElement });
	diPlane.$parent = bpmnFactory.create("bpmndi:BPMNDiagram", { plane: diPlane });
	return elementFactory.createRoot({
		id: getPlaneIdFromShape(bpmnElement),
		type: bpmnElement.$type,
		di: diPlane,
		businessObject: bpmnElement,
		collapsed: true
	});
};
SubProcessPlaneBehavior.prototype._removeDiagram = function(rootElement) {
	var diagrams = this._bpmnjs.getDefinitions().diagrams;
	var removedDiagram = find(diagrams, function(diagram) {
		return diagram.plane.bpmnElement.id === rootElement.id;
	});
	diagrams.splice(diagrams.indexOf(removedDiagram), 1);
	return removedDiagram;
};
SubProcessPlaneBehavior.$inject = [
	"canvas",
	"eventBus",
	"modeling",
	"elementFactory",
	"bpmnFactory",
	"bpmnjs",
	"elementRegistry"
];
function collectAnnotationElements(elements) {
	var result = [];
	forEach(collectElementsAnnotations(elements), (entry) => {
		result.push(entry.annotation);
		result.push.apply(result, entry.associations);
	});
	return result;
}
function getSubProcessChildren(element) {
	return element.children.slice().concat(collectAnnotationElements(element.children)).concat(getExternalLabels(element));
}
function getExternalLabels(element) {
	return selfAndChildren(element.children || [], true, -1).reduce(function(labels, child) {
		if (child.label && child.label.parent !== element) labels.push(child.label);
		return labels;
	}, []);
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/SubProcessStartEventBehavior.js
init_ModelUtil();
function SubProcessStartEventBehavior(injector, modeling) {
	injector.invoke(CommandInterceptor, this);
	this.postExecuted("shape.replace", function(event) {
		var oldShape = event.context.oldShape, newShape = event.context.newShape;
		if (!is(newShape, "bpmn:SubProcess") || is(newShape, "bpmn:AdHocSubProcess") || !(is(oldShape, "bpmn:Task") || is(oldShape, "bpmn:CallActivity")) || !isExpanded(newShape)) return;
		var position = getStartEventPosition(newShape);
		modeling.createShape({ type: "bpmn:StartEvent" }, position, newShape);
	});
}
SubProcessStartEventBehavior.$inject = ["injector", "modeling"];
e(SubProcessStartEventBehavior, CommandInterceptor);
function getStartEventPosition(shape) {
	return {
		x: shape.x + shape.width / 6,
		y: shape.y + shape.height / 2
	};
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/TextAnnotationBehavior.js
init_ModelUtil();
function TextAnnotationBehavior(eventBus, textRenderer) {
	CommandInterceptor.call(this, eventBus);
	this.preExecute("connection.create", function(context) {
		const { target } = context;
		if (!is(target, "bpmn:TextAnnotation")) return;
		context.parent = target.parent;
	}, true);
	this.preExecute([
		"shape.create",
		"shape.resize",
		"elements.move"
	], function(context) {
		const shapes = context.shapes || [context.shape];
		if (shapes.length === 1 && is(shapes[0], "bpmn:TextAnnotation")) {
			context.hints = context.hints || {};
			context.hints.autoResize = false;
		}
	}, true);
	this.preExecute("shape.resize", function(event) {
		var context = event.context, shape = context.shape, hints = context.hints || {};
		if (!is(shape, "bpmn:TextAnnotation") || hints.autoResize) return;
		var newBounds = context.newBounds;
		var resizeBounds = textRenderer.getTextAnnotationBounds(newBounds, getLabel(shape) || "");
		var topEdgeMoved = newBounds.y !== shape.y && Math.abs(newBounds.y + newBounds.height - (shape.y + shape.height)) <= 1;
		var bottom = shape.y + shape.height;
		context.newBounds = {
			width: newBounds.width,
			height: resizeBounds.height,
			x: newBounds.x,
			y: topEdgeMoved ? bottom - resizeBounds.height : newBounds.y
		};
	});
}
e(TextAnnotationBehavior, CommandInterceptor);
TextAnnotationBehavior.$inject = ["eventBus", "textRenderer"];
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/ToggleCollapseConnectionBehaviour.js
init_dist();
init_ModelUtil();
function ToggleCollapseConnectionBehaviour(eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	this.postExecuted("shape.toggleCollapse", 1500, function(context) {
		var shape = context.shape;
		if (isExpanded(shape)) return;
		var allChildren = selfAndAllChildren(shape);
		allChildren.forEach(function(child) {
			var incomingConnections = child.incoming.slice(), outgoingConnections = child.outgoing.slice();
			forEach(incomingConnections, function(c) {
				handleConnection(c, true);
			});
			forEach(outgoingConnections, function(c) {
				handleConnection(c, false);
			});
		});
		function handleConnection(c, incoming) {
			if (allChildren.indexOf(c.source) !== -1 && allChildren.indexOf(c.target) !== -1) return;
			if (is(c, "bpmn:Association") && (is(c.source, "bpmn:TextAnnotation") || is(c.target, "bpmn:TextAnnotation"))) return;
			if (incoming) modeling.reconnectEnd(c, shape, getMid(shape));
			else modeling.reconnectStart(c, shape, getMid(shape));
		}
	}, true);
}
e(ToggleCollapseConnectionBehaviour, CommandInterceptor);
ToggleCollapseConnectionBehaviour.$inject = ["eventBus", "modeling"];
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/ToggleElementCollapseBehaviour.js
init_ModelUtil();
var LOW_PRIORITY$8 = 500;
function ToggleElementCollapseBehaviour(eventBus, elementFactory, modeling) {
	CommandInterceptor.call(this, eventBus);
	function hideEmptyLabels(children) {
		if (children.length) children.forEach(function(child) {
			if (child.type === "label" && !child.businessObject.name) child.hidden = true;
		});
	}
	function expandedBounds(shape, defaultSize) {
		var children = shape.children, newBounds = defaultSize, visibleElements = filterVisible(children).concat([shape]), visibleBBox = computeChildrenBBox(visibleElements);
		if (visibleBBox) {
			newBounds.width = Math.max(visibleBBox.width, newBounds.width);
			newBounds.height = Math.max(visibleBBox.height, newBounds.height);
			newBounds.x = visibleBBox.x + (visibleBBox.width - newBounds.width) / 2;
			newBounds.y = visibleBBox.y + (visibleBBox.height - newBounds.height) / 2;
		} else {
			newBounds.x = shape.x + (shape.width - newBounds.width) / 2;
			newBounds.y = shape.y + (shape.height - newBounds.height) / 2;
		}
		return newBounds;
	}
	function collapsedBounds(shape, defaultSize) {
		return {
			x: shape.x + (shape.width - defaultSize.width) / 2,
			y: shape.y + (shape.height - defaultSize.height) / 2,
			width: defaultSize.width,
			height: defaultSize.height
		};
	}
	this.executed(["shape.toggleCollapse"], LOW_PRIORITY$8, function(e) {
		var shape = e.context.shape;
		if (!is(shape, "bpmn:SubProcess")) return;
		if (!shape.collapsed) {
			hideEmptyLabels(shape.children);
			getDi(shape).isExpanded = true;
		} else getDi(shape).isExpanded = false;
	});
	this.reverted(["shape.toggleCollapse"], LOW_PRIORITY$8, function(e) {
		var shape = e.context.shape;
		if (!shape.collapsed) getDi(shape).isExpanded = true;
		else getDi(shape).isExpanded = false;
	});
	this.postExecuted(["shape.toggleCollapse"], LOW_PRIORITY$8, function(e) {
		var shape = e.context.shape, defaultSize = elementFactory.getDefaultSize(shape), newBounds;
		if (shape.collapsed) newBounds = collapsedBounds(shape, defaultSize);
		else newBounds = expandedBounds(shape, defaultSize);
		modeling.resizeShape(shape, newBounds, null, { autoResize: shape.collapsed ? false : "nwse" });
	});
}
e(ToggleElementCollapseBehaviour, CommandInterceptor);
ToggleElementCollapseBehaviour.$inject = [
	"eventBus",
	"elementFactory",
	"modeling"
];
function filterVisible(elements) {
	return elements.filter(function(e) {
		return !e.hidden;
	});
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/UnclaimIdBehavior.js
init_ModelUtil();
function UnclaimIdBehavior(canvas, injector, moddle, modeling) {
	injector.invoke(CommandInterceptor, this);
	this.preExecute("shape.delete", function(event) {
		var shape = event.context.shape, shapeBo = shape.businessObject;
		if (isLabel(shape)) return;
		if (is(shape, "bpmn:Participant") && isExpanded(shape)) moddle.ids.unclaim(shapeBo.processRef.id);
		modeling.unclaimId(shapeBo.id, shapeBo);
	});
	this.preExecute("connection.delete", function(event) {
		var connectionBo = event.context.connection.businessObject;
		modeling.unclaimId(connectionBo.id, connectionBo);
	});
	this.preExecute("canvas.updateRoot", function() {
		var rootElement = canvas.getRootElement(), rootElementBo = rootElement.businessObject;
		if (is(rootElement, "bpmn:Collaboration")) moddle.ids.unclaim(rootElementBo.id);
	});
}
e(UnclaimIdBehavior, CommandInterceptor);
UnclaimIdBehavior.$inject = [
	"canvas",
	"injector",
	"moddle",
	"modeling"
];
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/UnsetDefaultFlowBehavior.js
init_ModelUtil();
function DeleteSequenceFlowBehavior(eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	this.preExecute("connection.delete", function(event) {
		var connection = event.context.connection, source = connection.source;
		if (isDefaultFlow(connection, source)) modeling.updateProperties(source, { "default": null });
	});
}
e(DeleteSequenceFlowBehavior, CommandInterceptor);
DeleteSequenceFlowBehavior.$inject = ["eventBus", "modeling"];
function isDefaultFlow(connection, source) {
	if (!is(connection, "bpmn:SequenceFlow")) return false;
	var sourceBo = getBusinessObject(source), sequenceFlow = getBusinessObject(connection);
	return sourceBo.get("default") === sequenceFlow;
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/UpdateFlowNodeRefsBehavior.js
init_ModelUtil();
var LOW_PRIORITY$7 = 500;
var HIGH_PRIORITY$11 = 5e3;
var laneRefShapeEvents = [
	"shape.create",
	"shape.delete",
	"shape.move",
	"shape.resize"
];
var laneRefUpdateEvents = [
	...laneRefShapeEvents,
	"spaceTool",
	"lane.add",
	"lane.resize",
	"lane.split",
	"elements.create",
	"elements.delete",
	"elements.move"
];
function UpdateFlowNodeRefsBehavior(eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	var context;
	function initContext() {
		context = context || new UpdateContext$1();
		context.enter();
		return context;
	}
	function getContext() {
		if (!context) throw new Error("out of bounds release");
		return context;
	}
	function releaseContext() {
		if (!context) throw new Error("out of bounds release");
		var triggerUpdate = context.leave();
		if (triggerUpdate) {
			modeling.updateLaneRefs(context.flowNodes, context.lanes);
			context = null;
		}
		return triggerUpdate;
	}
	this.preExecute(laneRefUpdateEvents, HIGH_PRIORITY$11, function() {
		initContext();
	});
	this.postExecuted(laneRefUpdateEvents, LOW_PRIORITY$7, function() {
		releaseContext();
	});
	this.preExecute(laneRefShapeEvents, function(event) {
		var shape = event.context.shape;
		var updateContext = getContext();
		if (!shape || shape.labelTarget) return;
		if (is(shape, "bpmn:Lane")) updateContext.addLane(shape);
		if (is(shape, "bpmn:FlowNode")) updateContext.addFlowNode(shape);
	});
}
UpdateFlowNodeRefsBehavior.$inject = ["eventBus", "modeling"];
e(UpdateFlowNodeRefsBehavior, CommandInterceptor);
function UpdateContext$1() {
	this.flowNodes = [];
	this.lanes = [];
	this.counter = 0;
	this.addLane = function(lane) {
		this.lanes.push(lane);
	};
	this.addFlowNode = function(flowNode) {
		this.flowNodes.push(flowNode);
	};
	this.enter = function() {
		this.counter++;
	};
	this.leave = function() {
		this.counter--;
		return !this.counter;
	};
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/UpdateCategoryValueRefsBehavior.js
init_ModelUtil();
var LOW_PRIORITY$6 = 500;
var HIGH_PRIORITY$10 = 5e3;
var categoryValueRefShapeAndConnectionEvents = [
	"connection.create",
	"connection.delete",
	"connection.layout",
	"connection.move",
	"connection.reconnect",
	"connection.updateWaypoints",
	"shape.create",
	"shape.delete",
	"shape.move",
	"shape.resize"
];
var categoryValueRefUpdateEvents = [
	...categoryValueRefShapeAndConnectionEvents,
	"elements.create",
	"elements.delete",
	"elements.move",
	"label.create",
	"spaceTool"
];
function UpdateCategoryValueRefsBehavior(eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	var context;
	function initContext() {
		context = context || new UpdateContext();
		context.enter();
		return context;
	}
	function getContext() {
		if (!context) throw new Error("out of bounds release");
		return context;
	}
	function releaseContext() {
		if (!context) throw new Error("out of bounds release");
		var triggerUpdate = context.leave();
		if (triggerUpdate) {
			modeling.updateCategoryValueRefs(Array.from(context.affectedFlowElements), Array.from(context.affectedGroupEntries.values()));
			context = null;
		}
		return triggerUpdate;
	}
	this.preExecute(categoryValueRefUpdateEvents, HIGH_PRIORITY$10, function() {
		initContext();
	});
	this.postExecuted(categoryValueRefUpdateEvents, LOW_PRIORITY$6, function() {
		releaseContext();
	});
	this.preExecute(categoryValueRefShapeAndConnectionEvents, function(event) {
		var shape = event.context.connection || event.context.shape, updateContext = getContext();
		if (!shape || shape.labelTarget) return;
		if (is(shape, "bpmn:FlowElement")) updateContext.addFlowElement(shape);
		if (is(shape, "bpmn:Group")) updateContext.addGroup(shape);
	});
	this.preExecute("label.create", function(event) {
		var labelTarget = event.context.labelTarget;
		if (is(labelTarget, "bpmn:Group")) getContext().addGroup(labelTarget);
	});
}
UpdateCategoryValueRefsBehavior.$inject = ["eventBus", "modeling"];
e(UpdateCategoryValueRefsBehavior, CommandInterceptor);
function UpdateContext() {
	this.affectedFlowElements = new Set();
	this.affectedGroupEntries = new Map();
	this.counter = 0;
	this.addFlowElement = function(flowElement) {
		this.affectedFlowElements.add(flowElement);
	};
	this.addGroup = function(group) {
		if (!this.affectedGroupEntries.has(group)) this.affectedGroupEntries.set(group, {
			categoryValue: group.businessObject.categoryValueRef,
			groupShape: group
		});
	};
	this.enter = function() {
		this.counter++;
	};
	this.leave = function() {
		this.counter--;
		return !this.counter;
	};
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/SetCompensationActivityAfterPasteBehavior.js
init_ModelUtil();
function SetCompensationActivityAfterPasteBehavior(eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	this.postExecuted("elements.create", function(event) {
		const elements = event.context.elements;
		for (const element of elements) if (isForCompensation$1(element) && !isConnectedToCompensationBoundaryEvent(element)) modeling.updateProperties(element, { isForCompensation: void 0 });
	});
}
e(SetCompensationActivityAfterPasteBehavior, CommandInterceptor);
SetCompensationActivityAfterPasteBehavior.$inject = ["eventBus", "modeling"];
function isForCompensation$1(element) {
	const bo = getBusinessObject(element);
	return bo && bo.isForCompensation;
}
function isCompensationBoundaryEvent(element) {
	return element && is(element, "bpmn:BoundaryEvent") && hasEventDefinition$2(element, "bpmn:CompensateEventDefinition");
}
function isConnectedToCompensationBoundaryEvent(element) {
	if (element.incoming.filter((connection) => isCompensationBoundaryEvent(connection.source)).length > 0) return true;
	return false;
}
// ../../node_modules/bpmn-js/lib/features/modeling/behavior/index.js
var behavior_default$1 = {
	__init__: [
		"adaptiveLabelPositioningBehavior",
		"appendBehavior",
		"artifactBehavior",
		"associationBehavior",
		"attachEventBehavior",
		"boundaryEventBehavior",
		"categoryRootElementReferenceBehavior",
		"compensateBoundaryEventBehaviour",
		"createBehavior",
		"createDataObjectBehavior",
		"createParticipantBehavior",
		"dataInputAssociationBehavior",
		"dataStoreBehavior",
		"deleteLaneBehavior",
		"detachEventBehavior",
		"dropOnFlowBehavior",
		"eventBasedGatewayBehavior",
		"fixHoverBehavior",
		"groupBehavior",
		"importDockingFix",
		"isHorizontalFix",
		"labelBehavior",
		"layoutConnectionBehavior",
		"messageFlowBehavior",
		"nonInterruptingBehavior",
		"removeElementBehavior",
		"removeEmbeddedLabelBoundsBehavior",
		"removeParticipantBehavior",
		"replaceConnectionBehavior",
		"replaceElementBehaviour",
		"resizeBehavior",
		"resizeLaneBehavior",
		"rootElementReferenceBehavior",
		"spaceToolBehavior",
		"subProcessPlaneBehavior",
		"subProcessStartEventBehavior",
		"textAnnotationBehavior",
		"toggleCollapseConnectionBehaviour",
		"toggleElementCollapseBehaviour",
		"unclaimIdBehavior",
		"updateFlowNodeRefsBehavior",
		"updateCategoryValueRefsBehavior",
		"unsetDefaultFlowBehavior",
		"setCompensationActivityAfterPasteBehavior"
	],
	adaptiveLabelPositioningBehavior: ["type", AdaptiveLabelPositioningBehavior],
	appendBehavior: ["type", AppendBehavior],
	associationBehavior: ["type", AssociationBehavior],
	attachEventBehavior: ["type", AttachEventBehavior],
	artifactBehavior: ["type", ArtifactBehavior],
	boundaryEventBehavior: ["type", BoundaryEventBehavior],
	categoryRootElementReferenceBehavior: ["type", CategoryRootElementReferenceBehavior],
	compensateBoundaryEventBehaviour: ["type", CompensateBoundaryEventBehavior],
	createBehavior: ["type", CreateBehavior],
	createDataObjectBehavior: ["type", CreateDataObjectBehavior],
	createParticipantBehavior: ["type", CreateParticipantBehavior],
	dataInputAssociationBehavior: ["type", DataInputAssociationBehavior],
	dataStoreBehavior: ["type", DataStoreBehavior],
	deleteLaneBehavior: ["type", DeleteLaneBehavior],
	detachEventBehavior: ["type", DetachEventBehavior],
	dropOnFlowBehavior: ["type", DropOnFlowBehavior],
	eventBasedGatewayBehavior: ["type", EventBasedGatewayBehavior],
	fixHoverBehavior: ["type", FixHoverBehavior],
	groupBehavior: ["type", GroupBehavior],
	importDockingFix: ["type", ImportDockingFix],
	isHorizontalFix: ["type", IsHorizontalFix],
	labelBehavior: ["type", LabelBehavior],
	layoutConnectionBehavior: ["type", LayoutConnectionBehavior],
	messageFlowBehavior: ["type", MessageFlowBehavior],
	nonInterruptingBehavior: ["type", NonInterruptingBehavior],
	removeElementBehavior: ["type", RemoveElementBehavior],
	removeEmbeddedLabelBoundsBehavior: ["type", RemoveEmbeddedLabelBoundsBehavior],
	removeParticipantBehavior: ["type", RemoveParticipantBehavior],
	replaceConnectionBehavior: ["type", ReplaceConnectionBehavior],
	replaceElementBehaviour: ["type", ReplaceElementBehaviour],
	resizeBehavior: ["type", ResizeBehavior],
	resizeLaneBehavior: ["type", ResizeLaneBehavior],
	rootElementReferenceBehavior: ["type", RootElementReferenceBehavior],
	spaceToolBehavior: ["type", SpaceToolBehavior],
	subProcessPlaneBehavior: ["type", SubProcessPlaneBehavior],
	subProcessStartEventBehavior: ["type", SubProcessStartEventBehavior],
	textAnnotationBehavior: ["type", TextAnnotationBehavior],
	toggleCollapseConnectionBehaviour: ["type", ToggleCollapseConnectionBehaviour],
	toggleElementCollapseBehaviour: ["type", ToggleElementCollapseBehaviour],
	unclaimIdBehavior: ["type", UnclaimIdBehavior],
	unsetDefaultFlowBehavior: ["type", DeleteSequenceFlowBehavior],
	updateFlowNodeRefsBehavior: ["type", UpdateFlowNodeRefsBehavior],
	updateCategoryValueRefsBehavior: ["type", UpdateCategoryValueRefsBehavior],
	setCompensationActivityAfterPasteBehavior: ["type", SetCompensationActivityAfterPasteBehavior]
};
// ../../node_modules/bpmn-js/lib/features/snapping/BpmnSnappingUtil.js
function getBoundaryAttachment(position, targetBounds) {
	var orientation = getOrientation(position, targetBounds, -15);
	if (orientation !== "intersect") return orientation;
	else return null;
}
// ../../node_modules/bpmn-js/lib/features/rules/BpmnRules.js
init_dist();
init_ModelUtil();
function BpmnRules(eventBus) {
	RuleProvider.call(this, eventBus);
}
e(BpmnRules, RuleProvider);
BpmnRules.$inject = ["eventBus"];
BpmnRules.prototype.init = function() {
	this.addRule("connection.start", function(context) {
		var source = context.source;
		return canStartConnection(source);
	});
	this.addRule("connection.create", function(context) {
		var source = context.source, target = context.target, hints = context.hints || {}, targetParent = hints.targetParent;
		if (hints.targetAttach) return false;
		if (targetParent) target.parent = targetParent;
		try {
			return canConnect(source, target);
		} finally {
			if (targetParent) target.parent = null;
		}
	});
	this.addRule("connection.reconnect", function(context) {
		var connection = context.connection, source = context.source, target = context.target;
		return canConnect(source, target, connection);
	});
	this.addRule("connection.updateWaypoints", function(context) {
		return { type: context.connection.type };
	});
	this.addRule("shape.resize", function(context) {
		var shape = context.shape, newBounds = context.newBounds, direction = context.direction;
		return canResize(shape, newBounds, direction);
	});
	this.addRule("elements.create", function(context) {
		var elements = context.elements, position = context.position, target = context.target;
		if (isConnection(target) && !canInsert(elements, target, position)) return false;
		return every(elements, function(element) {
			if (isConnection(element)) return canConnect(element.source, element.target, element);
			if (element.host) return canAttach(element, element.host, null, position);
			return canCreate(element, target, null, position);
		});
	});
	this.addRule("elements.move", function(context) {
		var target = context.target, shapes = context.shapes, position = context.position;
		if (context.hints?.keyboardMove) {
			if (shapes.some(function(shape) {
				return isBoundaryEvent(shape) && !shapes.includes(shape.host);
			})) return false;
		}
		return canAttach(shapes, target, null, position) || canReplace(shapes, target, position) || canMove(shapes, target, position) || canInsert(shapes, target, position);
	});
	this.addRule("shape.create", function(context) {
		return canCreate(context.shape, context.target, context.source, context.position);
	});
	this.addRule("shape.attach", function(context) {
		return canAttach(context.shape, context.target, null, context.position);
	});
	this.addRule("element.copy", function(context) {
		var element = context.element, elements = context.elements;
		return canCopy(elements, element);
	});
};
BpmnRules.prototype.canConnectMessageFlow = canConnectMessageFlow;
BpmnRules.prototype.canConnectSequenceFlow = canConnectSequenceFlow;
BpmnRules.prototype.canConnectDataAssociation = canConnectDataAssociation;
BpmnRules.prototype.canConnectAssociation = canConnectAssociation;
BpmnRules.prototype.canConnectCompensationAssociation = canConnectCompensationAssociation;
BpmnRules.prototype.canMove = canMove;
BpmnRules.prototype.canAttach = canAttach;
BpmnRules.prototype.canReplace = canReplace;
BpmnRules.prototype.canDrop = canDrop;
BpmnRules.prototype.canInsert = canInsert;
BpmnRules.prototype.canCreate = canCreate;
BpmnRules.prototype.canConnect = canConnect;
BpmnRules.prototype.canResize = canResize;
BpmnRules.prototype.canCopy = canCopy;
function canStartConnection(element) {
	if (nonExistingOrLabel(element)) return null;
	return isAny(element, [
		"bpmn:FlowNode",
		"bpmn:InteractionNode",
		"bpmn:DataObjectReference",
		"bpmn:DataStoreReference",
		"bpmn:Group",
		"bpmn:TextAnnotation"
	]);
}
function nonExistingOrLabel(element) {
	return !element || isLabel(element);
}
function getOrganizationalParent(element) {
	do {
		if (is(element, "bpmn:Process")) return getBusinessObject(element);
		if (is(element, "bpmn:Participant")) return getBusinessObject(element).processRef || getBusinessObject(element);
	} while (element = element.parent);
}
function isTextAnnotation(element) {
	return is(element, "bpmn:TextAnnotation");
}
function isGroup(element) {
	return is(element, "bpmn:Group") && !element.labelTarget;
}
function isCompensationBoundary(element) {
	return is(element, "bpmn:BoundaryEvent") && hasEventDefinition$1(element, "bpmn:CompensateEventDefinition");
}
function isForCompensation(element) {
	return getBusinessObject(element).isForCompensation;
}
function isSameOrganization(a, b) {
	return getOrganizationalParent(a) === getOrganizationalParent(b);
}
function isMessageFlowSource(element) {
	return is(element, "bpmn:InteractionNode") && !is(element, "bpmn:BoundaryEvent") && (!is(element, "bpmn:Event") || is(element, "bpmn:ThrowEvent") && hasEventDefinitionOrNone(element, "bpmn:MessageEventDefinition"));
}
function isMessageFlowTarget(element) {
	return is(element, "bpmn:InteractionNode") && !isForCompensation(element) && (!is(element, "bpmn:Event") || is(element, "bpmn:CatchEvent") && hasEventDefinitionOrNone(element, "bpmn:MessageEventDefinition")) && !(is(element, "bpmn:BoundaryEvent") && !hasEventDefinition$1(element, "bpmn:MessageEventDefinition"));
}
function getScopeParent(element) {
	var parent = element;
	while (parent = parent.parent) {
		if (is(parent, "bpmn:FlowElementsContainer")) return getBusinessObject(parent);
		if (is(parent, "bpmn:Participant")) return getBusinessObject(parent).processRef;
	}
	return null;
}
function isSameScope(a, b) {
	return getScopeParent(a) === getScopeParent(b);
}
function hasEventDefinition$1(element, eventDefinition) {
	var businessObject = getBusinessObject(element);
	return !!find(businessObject.eventDefinitions || [], function(definition) {
		return is(definition, eventDefinition);
	});
}
function hasEventDefinitionOrNone(element, eventDefinition) {
	return (getBusinessObject(element).eventDefinitions || []).every(function(definition) {
		return is(definition, eventDefinition);
	});
}
function isSequenceFlowSource(element) {
	return is(element, "bpmn:FlowNode") && !is(element, "bpmn:EndEvent") && !isEventSubProcess(element) && !(is(element, "bpmn:IntermediateThrowEvent") && hasEventDefinition$1(element, "bpmn:LinkEventDefinition")) && !isCompensationBoundary(element) && !isForCompensation(element);
}
function isSequenceFlowTarget(element) {
	return is(element, "bpmn:FlowNode") && !is(element, "bpmn:StartEvent") && !is(element, "bpmn:BoundaryEvent") && !isEventSubProcess(element) && !(is(element, "bpmn:IntermediateCatchEvent") && hasEventDefinition$1(element, "bpmn:LinkEventDefinition")) && !isForCompensation(element);
}
function isEventBasedTarget(element) {
	return is(element, "bpmn:ReceiveTask") || is(element, "bpmn:IntermediateCatchEvent") && (hasEventDefinition$1(element, "bpmn:MessageEventDefinition") || hasEventDefinition$1(element, "bpmn:TimerEventDefinition") || hasEventDefinition$1(element, "bpmn:ConditionalEventDefinition") || hasEventDefinition$1(element, "bpmn:SignalEventDefinition"));
}
function getParents(element) {
	var parents = [];
	while (element) {
		element = element.parent;
		if (element) parents.push(element);
	}
	return parents;
}
function isParent(possibleParent, element) {
	return getParents(element).indexOf(possibleParent) !== -1;
}
function canConnect(source, target, connection) {
	if (nonExistingOrLabel(source) || nonExistingOrLabel(target)) return null;
	if (!is(connection, "bpmn:DataAssociation")) {
		if (canConnectMessageFlow(source, target)) return { type: "bpmn:MessageFlow" };
		if (canConnectSequenceFlow(source, target)) return { type: "bpmn:SequenceFlow" };
	}
	var connectDataAssociation = canConnectDataAssociation(source, target);
	if (connectDataAssociation) return connectDataAssociation;
	if (canConnectCompensationAssociation(source, target)) return {
		type: "bpmn:Association",
		associationDirection: "One"
	};
	if (canConnectAssociation(source, target)) return {
		type: "bpmn:Association",
		associationDirection: "None"
	};
	return false;
}
function canDrop(element, target) {
	if (isLabel(element) || isGroup(element)) return true;
	if (is(target, "bpmn:Participant") && !isExpanded(target)) return false;
	if (is(element, "bpmn:Participant")) return is(target, "bpmn:Process") || is(target, "bpmn:Collaboration");
	if (isAny(element, ["bpmn:DataInput", "bpmn:DataOutput"])) {
		if (element.parent) return target === element.parent;
	}
	if (is(element, "bpmn:Lane")) return is(target, "bpmn:Participant") || is(target, "bpmn:Lane");
	if (is(element, "bpmn:BoundaryEvent") && !isDroppableBoundaryEvent(element)) return false;
	if (is(element, "bpmn:FlowElement") && !is(element, "bpmn:DataStoreReference")) {
		if (is(target, "bpmn:FlowElementsContainer")) return isExpanded(target);
		return isAny(target, ["bpmn:Participant", "bpmn:Lane"]);
	}
	if (is(element, "bpmn:DataStoreReference") && is(target, "bpmn:Collaboration")) return some(getBusinessObject(target).get("participants"), function(participant) {
		return !!participant.get("processRef");
	});
	if (isAny(element, [
		"bpmn:Artifact",
		"bpmn:DataAssociation",
		"bpmn:DataStoreReference"
	])) return isAny(target, [
		"bpmn:Collaboration",
		"bpmn:Lane",
		"bpmn:Participant",
		"bpmn:Process",
		"bpmn:SubProcess"
	]);
	if (is(element, "bpmn:MessageFlow")) return is(target, "bpmn:Collaboration") || element.source.parent == target || element.target.parent == target;
	return false;
}
function isDroppableBoundaryEvent(event) {
	return getBusinessObject(event).cancelActivity && (hasNoEventDefinition(event) || hasCommonBoundaryIntermediateEventDefinition(event));
}
function isBoundaryEvent(element) {
	return !isLabel(element) && is(element, "bpmn:BoundaryEvent");
}
function isLane(element) {
	return is(element, "bpmn:Lane");
}
function isBoundaryCandidate(element) {
	if (isBoundaryEvent(element)) return true;
	if (is(element, "bpmn:IntermediateThrowEvent") && hasNoEventDefinition(element)) return true;
	return is(element, "bpmn:IntermediateCatchEvent") && hasCommonBoundaryIntermediateEventDefinition(element);
}
function hasNoEventDefinition(element) {
	var businessObject = getBusinessObject(element);
	return businessObject && !(businessObject.eventDefinitions && businessObject.eventDefinitions.length);
}
function hasCommonBoundaryIntermediateEventDefinition(element) {
	return hasOneOfEventDefinitions(element, [
		"bpmn:MessageEventDefinition",
		"bpmn:TimerEventDefinition",
		"bpmn:SignalEventDefinition",
		"bpmn:ConditionalEventDefinition"
	]);
}
function hasOneOfEventDefinitions(element, eventDefinitions) {
	return eventDefinitions.some(function(definition) {
		return hasEventDefinition$1(element, definition);
	});
}
function isReceiveTaskAfterEventBasedGateway(element) {
	return is(element, "bpmn:ReceiveTask") && find(element.incoming, function(incoming) {
		return is(incoming.source, "bpmn:EventBasedGateway");
	});
}
function canAttach(elements, target, source, position) {
	if (!Array.isArray(elements)) elements = [elements];
	if (elements.length !== 1) return false;
	var element = elements[0];
	if (isLabel(element)) return false;
	if (!isBoundaryCandidate(element)) return false;
	if (isEventSubProcess(target)) return false;
	if (!is(target, "bpmn:Activity") || isForCompensation(target)) return false;
	if (position && !getBoundaryAttachment(position, target)) return false;
	if (isReceiveTaskAfterEventBasedGateway(target)) return false;
	return "attach";
}
function canReplace(elements, target, position) {
	if (!target) return false;
	var canExecute = { replacements: [] };
	forEach(elements, function(element) {
		if (!isEventSubProcess(target)) {
			if (is(element, "bpmn:StartEvent") && element.type !== "label" && canDrop(element, target)) {
				if (!isInterrupting(element)) canExecute.replacements.push({
					oldElementId: element.id,
					newElementType: "bpmn:StartEvent"
				});
				if (hasErrorEventDefinition(element) || hasEscalationEventDefinition(element) || hasCompensateEventDefinition(element)) canExecute.replacements.push({
					oldElementId: element.id,
					newElementType: "bpmn:StartEvent"
				});
				if (hasOneOfEventDefinitions(element, [
					"bpmn:MessageEventDefinition",
					"bpmn:TimerEventDefinition",
					"bpmn:SignalEventDefinition",
					"bpmn:ConditionalEventDefinition"
				]) && is(target, "bpmn:SubProcess")) canExecute.replacements.push({
					oldElementId: element.id,
					newElementType: "bpmn:StartEvent"
				});
			}
		}
		if (!is(target, "bpmn:Transaction")) {
			if (hasEventDefinition$1(element, "bpmn:CancelEventDefinition") && element.type !== "label") {
				if (is(element, "bpmn:EndEvent") && canDrop(element, target)) canExecute.replacements.push({
					oldElementId: element.id,
					newElementType: "bpmn:EndEvent"
				});
				if (is(element, "bpmn:BoundaryEvent") && canAttach(element, target, null, position)) canExecute.replacements.push({
					oldElementId: element.id,
					newElementType: "bpmn:BoundaryEvent"
				});
			}
		}
	});
	return canExecute.replacements.length ? canExecute : false;
}
function canMove(elements, target) {
	if (some(elements, isLane)) return false;
	if (target === void 0) return true;
	if (target === null) return false;
	return elements.every(function(element) {
		return canDrop(element, target);
	});
}
function canCreate(shape, target, source, position) {
	if (!target) return false;
	if (isLabel(shape) || isGroup(shape)) return true;
	return canDrop(shape, target, position) || canInsert(shape, target, position);
}
function canResize(shape, newBounds, direction) {
	if (is(shape, "bpmn:SubProcess")) return isExpanded(shape) && (!newBounds || newBounds.width >= 100 && newBounds.height >= 80);
	if (is(shape, "bpmn:Lane")) return true;
	if (is(shape, "bpmn:Participant")) return true;
	if (isTextAnnotation(shape)) {
		if (direction) return direction === "e" || direction === "w";
		return true;
	}
	if (isGroup(shape)) return true;
	if (isLabel(shape)) {
		if (direction) return direction === "e" || direction === "w";
		return true;
	}
	return false;
}
function isOneTextAnnotation(source, target) {
	var sourceTextAnnotation = isTextAnnotation(source), targetTextAnnotation = isTextAnnotation(target);
	return (sourceTextAnnotation || targetTextAnnotation) && sourceTextAnnotation !== targetTextAnnotation;
}
function canConnectAssociation(source, target) {
	if (isParent(target, source) || isParent(source, target)) return false;
	if (isOneTextAnnotation(source, target)) return true;
	return !!canConnectDataAssociation(source, target);
}
function canConnectCompensationAssociation(source, target) {
	return isSameScope(source, target) && isCompensationBoundary(source) && is(target, "bpmn:Activity") && !isHostOfElement(target, source) && !isEventSubProcess(target);
}
function canConnectMessageFlow(source, target) {
	if (getRootElement(source) && !getRootElement(target)) return false;
	return isMessageFlowSource(source) && isMessageFlowTarget(target) && !isSameOrganization(source, target);
}
function canConnectSequenceFlow(source, target) {
	return isSequenceFlowSource(source) && isSequenceFlowTarget(target) && isSameScope(source, target) && !(is(source, "bpmn:EventBasedGateway") && !isEventBasedTarget(target));
}
function canConnectDataAssociation(source, target) {
	if (isAny(source, ["bpmn:DataObjectReference", "bpmn:DataStoreReference"]) && isAny(target, ["bpmn:Activity", "bpmn:ThrowEvent"])) return { type: "bpmn:DataInputAssociation" };
	if (isAny(target, ["bpmn:DataObjectReference", "bpmn:DataStoreReference"]) && isAny(source, ["bpmn:Activity", "bpmn:CatchEvent"])) return { type: "bpmn:DataOutputAssociation" };
	return false;
}
function canInsert(shape, connection, position) {
	if (!connection) return false;
	if (Array.isArray(shape)) {
		if (shape.length !== 1) return false;
		shape = shape[0];
	}
	if (connection.source === shape || connection.target === shape) return false;
	return isAny(connection, ["bpmn:SequenceFlow", "bpmn:MessageFlow"]) && !isLabel(connection) && is(shape, "bpmn:FlowNode") && !is(shape, "bpmn:BoundaryEvent") && canDrop(shape, connection.parent, position);
}
function includes$2(elements, element) {
	return elements && element && elements.indexOf(element) !== -1;
}
function canCopy(elements, element) {
	if (isLabel(element)) return true;
	if (is(element, "bpmn:Lane") && !includes$2(elements, element.parent)) return false;
	if (is(element, "bpmn:MessageFlow") && !canCopyMessageFlow(elements, element)) return false;
	return true;
}
function canCopyMessageFlow(elements, connection) {
	var sourceParticipant = getParticipant(connection.source), targetParticipant = getParticipant(connection.target);
	return includes$2(elements, sourceParticipant) && includes$2(elements, targetParticipant);
}
function getParticipant(element) {
	for (; element; element = element.parent) if (is(element, "bpmn:Participant")) return element;
	return null;
}
function getRootElement(element) {
	return getParent(element, "bpmn:Process") || getParent(element, "bpmn:Collaboration");
}
function isHostOfElement(potentialHost, element) {
	return potentialHost.attachers.includes(element);
}
// ../../node_modules/bpmn-js/lib/features/rules/index.js
var rules_default = {
	__depends__: [rules_default$1],
	__init__: ["bpmnRules"],
	bpmnRules: ["type", BpmnRules]
};
// ../../node_modules/bpmn-js/lib/features/di-ordering/BpmnDiOrdering.js
init_ModelUtil();
init_dist();
var HIGH_PRIORITY$9 = 2e3;
function BpmnDiOrdering(eventBus, canvas) {
	eventBus.on("saveXML.start", HIGH_PRIORITY$9, orderDi);
	function orderDi() {
		var rootElements = canvas.getRootElements();
		forEach(rootElements, function(root) {
			var rootDi = getDi(root), elements = selfAndAllChildren([root], false), diElements;
			elements = filter(elements, function(element) {
				return element !== root && !element.labelTarget;
			});
			diElements = map(elements, getDi);
			rootDi.set("planeElement", diElements);
		});
	}
}
BpmnDiOrdering.$inject = ["eventBus", "canvas"];
// ../../node_modules/bpmn-js/lib/features/di-ordering/index.js
var di_ordering_default = {
	__init__: ["bpmnDiOrdering"],
	bpmnDiOrdering: ["type", BpmnDiOrdering]
};
// ../../node_modules/bpmn-js/lib/features/ordering/BpmnOrderingProvider.js
init_dist();
function BpmnOrderingProvider(eventBus, canvas) {
	OrderingProvider.call(this, eventBus);
	var orders = [
		{
			type: "bpmn:SubProcess",
			order: { level: 6 }
		},
		{
			type: "bpmn:SequenceFlow",
			order: {
				level: 9,
				containers: ["bpmn:Participant", "bpmn:FlowElementsContainer"]
			}
		},
		{
			type: "bpmn:DataAssociation",
			order: {
				level: 9,
				containers: ["bpmn:Collaboration", "bpmn:FlowElementsContainer"]
			}
		},
		{
			type: "bpmn:TextAnnotation",
			order: { level: 9 }
		},
		{
			type: "bpmn:MessageFlow",
			order: {
				level: 9,
				containers: ["bpmn:Collaboration"]
			}
		},
		{
			type: "bpmn:Association",
			order: {
				level: 6,
				containers: [
					"bpmn:Participant",
					"bpmn:FlowElementsContainer",
					"bpmn:Collaboration"
				]
			}
		},
		{
			type: "bpmn:BoundaryEvent",
			order: { level: 8 }
		},
		{
			type: "bpmn:Group",
			order: {
				level: 10,
				containers: ["bpmn:Collaboration", "bpmn:FlowElementsContainer"]
			}
		},
		{
			type: "bpmn:FlowElement",
			order: { level: 5 }
		},
		{
			type: "bpmn:Participant",
			order: { level: -2 }
		},
		{
			type: "bpmn:Lane",
			order: { level: -1 }
		}
	];
	function computeOrder(element) {
		if (element.labelTarget) return { level: 10 };
		var entry = find(orders, function(o) {
			return isAny(element, [o.type]);
		});
		return entry && entry.order || { level: 1 };
	}
	function getOrder(element) {
		var order = element.order;
		if (!order) element.order = order = computeOrder(element);
		if (!order) throw new Error(`no order for <${element.id}>`);
		return order;
	}
	function findActualParent(element, newParent, containers) {
		var actualParent = newParent;
		while (actualParent) {
			if (isAny(actualParent, containers)) break;
			actualParent = actualParent.parent;
		}
		if (!actualParent) throw new Error(`no parent for <${element.id}> in <${newParent && newParent.id}>`);
		return actualParent;
	}
	this.getOrdering = function(element, newParent) {
		if (element.labelTarget || is(element, "bpmn:TextAnnotation")) return {
			parent: canvas.findRoot(newParent) || canvas.getRootElement(),
			index: -1
		};
		var elementOrder = getOrder(element);
		if (elementOrder.containers) newParent = findActualParent(element, newParent, elementOrder.containers);
		var currentIndex = newParent.children.indexOf(element);
		var insertIndex = findIndex(newParent.children, function(child) {
			if (!element.labelTarget && child.labelTarget) return false;
			return elementOrder.level < getOrder(child).level;
		});
		if (insertIndex !== -1) {
			if (currentIndex !== -1 && currentIndex < insertIndex) insertIndex -= 1;
		}
		return {
			index: insertIndex,
			parent: newParent
		};
	};
}
BpmnOrderingProvider.$inject = ["eventBus", "canvas"];
e(BpmnOrderingProvider, OrderingProvider);
// ../../node_modules/bpmn-js/lib/features/ordering/index.js
var ordering_default = {
	__init__: ["bpmnOrderingProvider"],
	bpmnOrderingProvider: ["type", BpmnOrderingProvider]
};
// ../../node_modules/diagram-js/lib/features/copy-paste/CopyPaste.js
init_dist();
var HIGH_PRIORITY$8 = 2e3;
function CopyPaste(canvas, create, clipboard, elementFactory, eventBus, modeling, mouse, rules) {
	this._canvas = canvas;
	this._create = create;
	this._elementFactory = elementFactory;
	this._eventBus = eventBus;
	this._modeling = modeling;
	this._mouse = mouse;
	this._rules = rules;
	eventBus.on("copyPaste.copyElement", function(context) {
		var descriptor = context.descriptor, element = context.element, elementsSet = context.elementsSet;
		descriptor.priority = 1;
		descriptor.id = element.id;
		if (elementsSet.has(element.parent)) descriptor.parent = element.parent.id;
		if (isAttacher$2(element)) {
			descriptor.priority = 2;
			descriptor.host = element.host.id;
		}
		if (isConnection(element)) {
			descriptor.priority = 3;
			descriptor.source = element.source.id;
			descriptor.target = element.target.id;
			descriptor.waypoints = copyWaypoints(element);
		}
		if (isLabel(element)) {
			descriptor.priority = 4;
			descriptor.labelTarget = element.labelTarget.id;
		}
		forEach([
			"x",
			"y",
			"width",
			"height"
		], function(property) {
			if (isNumber(element[property])) descriptor[property] = element[property];
		});
		descriptor.hidden = element.hidden;
		descriptor.collapsed = element.collapsed;
	});
	eventBus.on("copyPaste.elementsCopied", HIGH_PRIORITY$8, function(context) {
		if (context.hints?.clip !== false) clipboard.set(context.tree);
	});
	eventBus.on("copyPaste.pasteElements", HIGH_PRIORITY$8, function(context) {
		if (!context.tree) context.tree = clipboard.get();
	});
	eventBus.on("copyPaste.pasteElements", function(context) {
		var hints = context.hints;
		assign$1(hints, { createElementsBehavior: false });
	});
}
CopyPaste.$inject = [
	"canvas",
	"create",
	"clipboard",
	"elementFactory",
	"eventBus",
	"modeling",
	"mouse",
	"rules"
];
CopyPaste.prototype.copy = function(elements, hints = {}) {
	var allowed, tree;
	if (!isArray(elements)) elements = elements ? [elements] : [];
	allowed = this._eventBus.fire("copyPaste.canCopyElements", { elements });
	if (allowed === false) tree = {};
	else tree = this.createTree(isArray(allowed) ? allowed : elements);
	this._eventBus.fire("copyPaste.elementsCopied", {
		elements,
		tree,
		hints
	});
	return tree;
};
CopyPaste.prototype.paste = function(context = {}) {
	var pasteEvent = this._eventBus.createEvent({
		type: "copyPaste.pasteElements",
		hints: {},
		...context
	});
	if (this._eventBus.fire(pasteEvent) === false) return;
	var tree = pasteEvent.tree;
	if (!tree) return;
	var hints = pasteEvent.hints;
	var elements = this._createElements(tree);
	if (pasteEvent.element && pasteEvent.point) return this._paste(elements, pasteEvent.element, pasteEvent.point, hints);
	this._create.start(this._mouse.getLastMoveEvent(), elements, { hints });
};
CopyPaste.prototype.duplicate = function(elements, pasteContext = {}) {
	var tree = this.copy(elements, { clip: false });
	return this.paste({
		...pasteContext,
		tree
	});
};
CopyPaste.prototype.cut = function(elements) {
	var tree = this.copy(elements);
	var copiedElementIds = this._getElementIdsFromTree(tree);
	var elementsToCut = elements.filter(function(element) {
		return copiedElementIds[element.id];
	});
	if (elementsToCut.length > 0) this._modeling.removeElements(elementsToCut);
	return tree;
};
CopyPaste.prototype._getElementIdsFromTree = function(tree) {
	var elementIds = {};
	forEach(tree, function(branch) {
		forEach(branch, function(descriptor) {
			if (descriptor.id) elementIds[descriptor.id] = true;
		});
	});
	return elementIds;
};
CopyPaste.prototype._paste = function(elements, target, position, hints) {
	forEach(elements, function(element) {
		if (!isNumber(element.x)) element.x = 0;
		if (!isNumber(element.y)) element.y = 0;
	});
	var bbox = getBBox(elements);
	forEach(elements, function(element) {
		if (isConnection(element)) element.waypoints = map(element.waypoints, function(waypoint) {
			return {
				x: waypoint.x - bbox.x - bbox.width / 2,
				y: waypoint.y - bbox.y - bbox.height / 2
			};
		});
		assign$1(element, {
			x: element.x - bbox.x - bbox.width / 2,
			y: element.y - bbox.y - bbox.height / 2
		});
	});
	return this._modeling.createElements(elements, position, target, assign$1({}, hints));
};
CopyPaste.prototype._createElements = function(tree) {
	var self = this;
	var eventBus = this._eventBus;
	var cache = {};
	var elements = [];
	forEach(tree, function(branch, depth) {
		depth = parseInt(depth, 10);
		branch = sortBy(branch, "priority");
		forEach(branch, function(descriptor) {
			var attrs = assign$1({}, omit(descriptor, ["priority"]));
			if (cache[descriptor.parent]) attrs.parent = cache[descriptor.parent];
			else delete attrs.parent;
			eventBus.fire("copyPaste.pasteElement", {
				cache,
				descriptor: attrs
			});
			var element;
			if (isConnection(attrs)) {
				attrs.source = cache[descriptor.source];
				attrs.target = cache[descriptor.target];
				element = cache[descriptor.id] = self.createConnection(attrs);
				elements.push(element);
				return;
			}
			if (isLabel(attrs)) {
				attrs.labelTarget = cache[attrs.labelTarget];
				element = cache[descriptor.id] = self.createLabel(attrs);
				elements.push(element);
				return;
			}
			if (attrs.host) attrs.host = cache[attrs.host];
			element = cache[descriptor.id] = self.createShape(attrs);
			elements.push(element);
		});
	});
	return elements;
};
CopyPaste.prototype.createConnection = function(attrs) {
	return this._elementFactory.createConnection(omit(attrs, ["id"]));
};
CopyPaste.prototype.createLabel = function(attrs) {
	return this._elementFactory.createLabel(omit(attrs, ["id"]));
};
CopyPaste.prototype.createShape = function(attrs) {
	return this._elementFactory.createShape(omit(attrs, ["id"]));
};
CopyPaste.prototype.hasRelations = function(element, elements, elementsSet) {
	if (!elementsSet) elementsSet = new Set(elements);
	if (isConnection(element)) {
		if (!elementsSet.has(element.source) || !elementsSet.has(element.target)) return false;
	}
	if (isLabel(element)) {
		if (!elementsSet.has(element.labelTarget)) return false;
	}
	return true;
};
CopyPaste.prototype.createTree = function(elements) {
	var rules = this._rules, self = this;
	var tree = {}, elementsData = [];
	var elementsDataMap = new Map();
	var parents = getParents$1(elements);
	function canCopy(element, elements) {
		return rules.allowed("element.copy", {
			element,
			elements
		});
	}
	function addElementData(element, depth) {
		var foundElementData = elementsDataMap.get(element);
		if (!foundElementData) {
			var elementData = {
				element,
				depth
			};
			elementsData.push(elementData);
			elementsDataMap.set(element, elementData);
			return;
		}
		if (foundElementData.depth < depth) {
			elementsData = removeElementData(foundElementData, elementsData);
			var updatedElementData = {
				element: foundElementData.element,
				depth
			};
			elementsData.push(updatedElementData);
			elementsDataMap.set(element, updatedElementData);
		}
	}
	function removeElementData(elementData, elementsData) {
		var index = elementsData.indexOf(elementData);
		if (index !== -1) elementsData.splice(index, 1);
		return elementsData;
	}
	eachElement(parents, function(element, _index, depth) {
		if (isLabel(element)) return;
		forEach(element.labels, function(label) {
			addElementData(label, depth);
		});
		function addRelatedElements(elements) {
			elements && elements.length && forEach(elements, function(element) {
				forEach(element.labels, function(label) {
					addElementData(label, depth);
				});
				addElementData(element, depth);
			});
		}
		forEach([
			element.attachers,
			element.incoming,
			element.outgoing
		], addRelatedElements);
		addElementData(element, depth);
		var children = [];
		if (element.children) children = element.children.slice();
		self._eventBus.fire("copyPaste.createTree", {
			element,
			children
		});
		return children;
	});
	elements = map(elementsData, function(elementData) {
		return elementData.element;
	});
	var elementsSet = new Set(elements);
	elementsData = map(elementsData, function(elementData) {
		elementData.descriptor = {};
		self._eventBus.fire("copyPaste.copyElement", {
			descriptor: elementData.descriptor,
			element: elementData.element,
			elements,
			elementsSet
		});
		return elementData;
	});
	elementsData = sortBy(elementsData, function(elementData) {
		return elementData.descriptor.priority;
	});
	elements = map(elementsData, function(elementData) {
		return elementData.element;
	});
	forEach(elementsData, function(elementData) {
		var depth = elementData.depth;
		if (!self.hasRelations(elementData.element, elements, elementsSet)) {
			removeElement(elementData.element, elements);
			elementsSet.delete(elementData.element);
			return;
		}
		if (!canCopy(elementData.element, elements)) {
			removeElement(elementData.element, elements);
			elementsSet.delete(elementData.element);
			return;
		}
		if (!tree[depth]) tree[depth] = [];
		tree[depth].push(elementData.descriptor);
	});
	return tree;
};
function isAttacher$2(element) {
	return !!element.host;
}
function copyWaypoints(element) {
	return map(element.waypoints, function(waypoint) {
		waypoint = copyWaypoint(waypoint);
		if (waypoint.original) waypoint.original = copyWaypoint(waypoint.original);
		return waypoint;
	});
}
function copyWaypoint(waypoint) {
	return assign$1({}, waypoint);
}
function removeElement(element, elements) {
	var index = elements.indexOf(element);
	if (index === -1) return elements;
	return elements.splice(index, 1);
}
// ../../node_modules/diagram-js/lib/features/copy-paste/index.js
var copy_paste_default$1 = {
	__depends__: [
		clipboard_default,
		create_default,
		mouse_default,
		rules_default$1
	],
	__init__: ["copyPaste"],
	copyPaste: ["type", CopyPaste]
};
// ../../node_modules/bpmn-js/lib/features/copy-paste/BpmnCopyPaste.js
init_ModelUtil();
init_dist();
function copyProperties$1(source, target, properties) {
	if (!isArray(properties)) properties = [properties];
	forEach(properties, function(property) {
		if (!isUndefined(source[property])) target[property] = source[property];
	});
}
var LOW_PRIORITY$5 = 750;
function BpmnCopyPaste(bpmnFactory, eventBus, moddleCopy) {
	function copy(bo, clone) {
		var targetBo = bpmnFactory.create(bo.$type);
		return moddleCopy.copyElement(bo, targetBo, null, clone);
	}
	eventBus.on("copyPaste.copyElement", LOW_PRIORITY$5, function(context) {
		var descriptor = context.descriptor, element = context.element, businessObject = getBusinessObject(element);
		if (isLabel(element)) return descriptor;
		var businessObjectCopy = descriptor.businessObject = copy(businessObject, true);
		var diCopy = descriptor.di = copy(getDi(element), true);
		diCopy.bpmnElement = businessObjectCopy;
		copyProperties$1(businessObjectCopy, descriptor, "name");
		copyProperties$1(diCopy, descriptor, "isExpanded");
		if (businessObject.default) descriptor.default = businessObject.default.id;
	});
	var referencesKey = "-bpmn-js-refs";
	function getReferences(cache) {
		return cache[referencesKey] = cache[referencesKey] || {};
	}
	function setReferences(cache, references) {
		cache[referencesKey] = references;
	}
	function resolveReferences(descriptor, cache, references) {
		var businessObject = getBusinessObject(descriptor);
		if (descriptor.default) references[descriptor.default] = {
			element: businessObject,
			property: "default"
		};
		if (descriptor.host) getBusinessObject(descriptor).attachedToRef = getBusinessObject(cache[descriptor.host]);
		return omit(references, reduce(references, function(array, reference, key) {
			var element = reference.element, property = reference.property;
			if (key === descriptor.id) {
				element.set(property, businessObject);
				array.push(descriptor.id);
			}
			return array;
		}, []));
	}
	eventBus.on("copyPaste.pasteElement", function(context) {
		var cache = context.cache, descriptor = context.descriptor, businessObject = descriptor.businessObject, di = descriptor.di;
		if (isLabel(descriptor)) {
			descriptor.businessObject = getBusinessObject(cache[descriptor.labelTarget]);
			descriptor.di = getDi(cache[descriptor.labelTarget]);
			return;
		}
		businessObject = descriptor.businessObject = copy(businessObject);
		di = descriptor.di = copy(di);
		di.bpmnElement = businessObject;
		copyProperties$1(descriptor, businessObject, ["isExpanded", "name"]);
		descriptor.type = businessObject.$type;
	});
	eventBus.on("copyPaste.copyElement", LOW_PRIORITY$5, function(context) {
		var descriptor = context.descriptor, element = context.element;
		if (!is(element, "bpmn:Participant")) return;
		var participantBo = getBusinessObject(element);
		if (participantBo.processRef) descriptor.processRef = copy(participantBo.processRef, true);
	});
	eventBus.on("copyPaste.pasteElement", function(context) {
		var descriptor = context.descriptor, processRef = descriptor.processRef;
		if (processRef) descriptor.processRef = copy(processRef);
	});
	eventBus.on("copyPaste.createTree", function(context) {
		var element = context.element, children = context.children;
		if (!is(element, "bpmn:SubProcess")) return;
		forEach(collectElementsAnnotations(children), (entry) => {
			children.push(entry.annotation);
		});
	});
	eventBus.on("copyPaste.pasteElement", LOW_PRIORITY$5, function(context) {
		var cache = context.cache, descriptor = context.descriptor;
		setReferences(cache, resolveReferences(descriptor, cache, getReferences(cache)));
	});
}
BpmnCopyPaste.$inject = [
	"bpmnFactory",
	"eventBus",
	"moddleCopy"
];
// ../../node_modules/bpmn-js/lib/features/copy-paste/ModdleCopy.js
init_dist();
init_ModelUtil();
var DISALLOWED_PROPERTIES = [
	"artifacts",
	"dataInputAssociations",
	"dataOutputAssociations",
	"default",
	"flowElements",
	"lanes",
	"incoming",
	"outgoing",
	"categoryValue"
];
var ALLOWED_REFERENCES = [
	"errorRef",
	"escalationRef",
	"messageRef",
	"signalRef",
	"dataObjectRef"
];
function ModdleCopy(eventBus, bpmnFactory, moddle) {
	this._bpmnFactory = bpmnFactory;
	this._eventBus = eventBus;
	this._moddle = moddle;
	eventBus.on("moddleCopy.canCopyProperties", (context) => {
		const { propertyNames } = context;
		if (!propertyNames || !propertyNames.length) return;
		return sortBy(propertyNames, (propertyName) => {
			return propertyName === "extensionElements";
		});
	});
	eventBus.on("moddleCopy.canCopyProperty", (context) => {
		const { parent, property, propertyName } = context;
		const parentDescriptor = isObject(parent) && parent.$descriptor;
		if (propertyName && ALLOWED_REFERENCES.includes(propertyName)) return property;
		if (propertyName && DISALLOWED_PROPERTIES.includes(propertyName)) return false;
		if (propertyName && parentDescriptor && !find(parentDescriptor.properties, matchPattern({ name: propertyName }))) return false;
	});
	eventBus.on("moddleCopy.canSetCopiedProperty", (context) => {
		const { property } = context;
		if (is(property, "bpmn:ExtensionElements") && (!property.values || !property.values.length)) return false;
	});
}
ModdleCopy.$inject = [
	"eventBus",
	"bpmnFactory",
	"moddle"
];
ModdleCopy.prototype.copyElement = function(sourceElement, targetElement, propertyNames, clone = false) {
	if (propertyNames && !isArray(propertyNames)) propertyNames = [propertyNames];
	propertyNames = propertyNames || getPropertyNames(sourceElement.$descriptor);
	const canCopyProperties = this._eventBus.fire("moddleCopy.canCopyProperties", {
		propertyNames,
		sourceElement,
		targetElement,
		clone
	});
	if (canCopyProperties === false) return targetElement;
	if (isArray(canCopyProperties)) propertyNames = canCopyProperties;
	forEach(propertyNames, (propertyName) => {
		let sourceProperty;
		if (has(sourceElement, propertyName)) sourceProperty = sourceElement.get(propertyName);
		const copiedProperty = this.copyProperty(sourceProperty, targetElement, propertyName, clone);
		if (!isDefined(copiedProperty)) return;
		if (this._eventBus.fire("moddleCopy.canSetCopiedProperty", {
			parent: targetElement,
			property: copiedProperty,
			propertyName
		}) === false) return;
		targetElement.set(propertyName, copiedProperty);
	});
	return targetElement;
};
ModdleCopy.prototype.copyProperty = function(property, parent, propertyName, clone = false) {
	let copiedProperty = this._eventBus.fire("moddleCopy.canCopyProperty", {
		parent,
		property,
		propertyName,
		clone
	});
	if (copiedProperty === false) return;
	if (copiedProperty) {
		if (isObject(copiedProperty) && copiedProperty.$type && !copiedProperty.$parent) copiedProperty.$parent = parent;
		return copiedProperty;
	}
	const propertyDescriptor = this._moddle.getPropertyDescriptor(parent, propertyName);
	if (propertyDescriptor.isReference) return;
	if (propertyDescriptor.isId) return property && this._copyId(property, parent, clone);
	if (isArray(property)) return reduce(property, (childProperties, childProperty) => {
		const copiedProperty = this.copyProperty(childProperty, parent, propertyName, clone);
		if (copiedProperty) return childProperties.concat(copiedProperty);
		return childProperties;
	}, []);
	if (isObject(property) && property.$type) {
		if (this._moddle.getElementDescriptor(property).isGeneric) return;
		copiedProperty = this._bpmnFactory.create(property.$type);
		copiedProperty.$parent = parent;
		copiedProperty = this.copyElement(property, copiedProperty, null, clone);
		return copiedProperty;
	}
	return property;
};
ModdleCopy.prototype._copyId = function(id, element, clone = false) {
	if (clone) return id;
	if (this._moddle.ids.assigned(id)) return;
	else {
		this._moddle.ids.claim(id, element);
		return id;
	}
};
function getPropertyNames(descriptor, keepDefaultProperties) {
	return reduce(descriptor.properties, (properties, property) => {
		if (keepDefaultProperties && property.default) return properties;
		return properties.concat(property.name);
	}, []);
}
// ../../node_modules/bpmn-js/lib/features/copy-paste/index.js
var copy_paste_default = {
	__depends__: [copy_paste_default$1],
	__init__: ["bpmnCopyPaste", "moddleCopy"],
	bpmnCopyPaste: ["type", BpmnCopyPaste],
	moddleCopy: ["type", ModdleCopy]
};
// ../../node_modules/bpmn-js/lib/features/replace/BpmnReplace.js
init_dist();
init_ModelUtil();
function copyProperties(source, target, properties) {
	if (!isArray(properties)) properties = [properties];
	forEach(properties, function(property) {
		if (!isUndefined(source[property])) target[property] = source[property];
	});
}
var CUSTOM_PROPERTIES = [
	"cancelActivity",
	"instantiate",
	"eventGatewayType",
	"triggeredByEvent",
	"isInterrupting"
];
function shouldToggleCollapsed(element, targetElement) {
	var oldCollapsed = element && has(element, "collapsed") ? element.collapsed : !isExpanded(element);
	var targetCollapsed;
	if (targetElement && (has(targetElement, "collapsed") || has(targetElement, "isExpanded"))) targetCollapsed = has(targetElement, "collapsed") ? targetElement.collapsed : !targetElement.isExpanded;
	else targetCollapsed = oldCollapsed;
	if (oldCollapsed !== targetCollapsed) return true;
	return false;
}
function BpmnReplace(bpmnFactory, elementFactory, moddleCopy, modeling, replace, rules) {
	function replaceElement(element, targetElement, hints) {
		hints = hints || {};
		var type = targetElement.type, oldBusinessObject = element.businessObject;
		if (isSubProcess(oldBusinessObject) && (type === "bpmn:SubProcess" || type === "bpmn:AdHocSubProcess")) {
			if (shouldToggleCollapsed(element, targetElement)) {
				modeling.toggleCollapse(element);
				return element;
			}
		}
		var newBusinessObject = bpmnFactory.create(type);
		var newElement = {
			type,
			businessObject: newBusinessObject
		};
		newElement.di = {};
		if (type === "bpmn:ExclusiveGateway") newElement.di.isMarkerVisible = true;
		copyProperties(element.di, newElement.di, [
			"fill",
			"stroke",
			"background-color",
			"border-color",
			"color"
		]);
		var copyProps = intersection(getPropertyNames(oldBusinessObject.$descriptor), getPropertyNames(newBusinessObject.$descriptor, true));
		assign$1(newBusinessObject, pick(targetElement, CUSTOM_PROPERTIES));
		var properties = filter(copyProps, function(propertyName) {
			if (propertyName === "eventDefinitions") return hasEventDefinition(element, targetElement.eventDefinitionType);
			if (propertyName === "loopCharacteristics") return !isEventSubProcess(newBusinessObject);
			if (has(newBusinessObject, propertyName)) return false;
			if (propertyName === "processRef" && targetElement.isExpanded === false) return false;
			if (propertyName === "triggeredByEvent") return false;
			if (propertyName === "isForCompensation") return !isEventSubProcess(newBusinessObject);
			return true;
		});
		newBusinessObject = moddleCopy.copyElement(oldBusinessObject, newBusinessObject, properties);
		if (targetElement.eventDefinitionType) {
			if (!hasEventDefinition(newBusinessObject, targetElement.eventDefinitionType)) {
				newElement.eventDefinitionType = targetElement.eventDefinitionType;
				newElement.eventDefinitionAttrs = targetElement.eventDefinitionAttrs;
			}
		}
		if (is(oldBusinessObject, "bpmn:Activity")) {
			if (isSubProcess(oldBusinessObject)) newElement.isExpanded = isExpanded(element);
			else if (targetElement && has(targetElement, "isExpanded")) {
				newElement.isExpanded = targetElement.isExpanded;
				var defaultSize = elementFactory.getDefaultSize(newBusinessObject, { isExpanded: newElement.isExpanded });
				newElement.width = defaultSize.width;
				newElement.height = defaultSize.height;
				newElement.x = element.x - (newElement.width - element.width) / 2;
				newElement.y = element.y - (newElement.height - element.height) / 2;
			}
			if (isExpanded(element) && !is(oldBusinessObject, "bpmn:Task") && newElement.isExpanded) {
				newElement.width = element.width;
				newElement.height = element.height;
			}
		}
		if (isSubProcess(oldBusinessObject) && !isSubProcess(newBusinessObject)) hints.moveChildren = false;
		if (is(oldBusinessObject, "bpmn:Participant")) {
			if (targetElement.isExpanded === true) newBusinessObject.processRef = bpmnFactory.create("bpmn:Process");
			else hints.moveChildren = false;
			var isHorizontalPool = isHorizontal$1(element);
			if (!getDi(element).isHorizontal) getDi(newElement).isHorizontal = isHorizontalPool;
			newElement.width = isHorizontalPool ? element.width : elementFactory.getDefaultSize(newElement).width;
			newElement.height = isHorizontalPool ? elementFactory.getDefaultSize(newElement).height : element.height;
		}
		if (!rules.allowed("shape.resize", { shape: newBusinessObject })) {
			newElement.height = elementFactory.getDefaultSize(newElement).height;
			newElement.width = elementFactory.getDefaultSize(newElement).width;
		}
		newBusinessObject.name = oldBusinessObject.name;
		if (isAny(oldBusinessObject, [
			"bpmn:ExclusiveGateway",
			"bpmn:InclusiveGateway",
			"bpmn:Activity"
		]) && isAny(newBusinessObject, [
			"bpmn:ExclusiveGateway",
			"bpmn:InclusiveGateway",
			"bpmn:Activity"
		])) newBusinessObject.default = oldBusinessObject.default;
		if (targetElement.host && !is(oldBusinessObject, "bpmn:BoundaryEvent") && is(newBusinessObject, "bpmn:BoundaryEvent")) newElement.host = targetElement.host;
		if (newElement.type === "bpmn:DataStoreReference" || newElement.type === "bpmn:DataObjectReference") newElement.x = element.x + (element.width - newElement.width) / 2;
		return replace.replaceElement(element, newElement, {
			...hints,
			targetElement
		});
	}
	this.replaceElement = replaceElement;
}
BpmnReplace.$inject = [
	"bpmnFactory",
	"elementFactory",
	"moddleCopy",
	"modeling",
	"replace",
	"rules"
];
function isSubProcess(businessObject) {
	return is(businessObject, "bpmn:SubProcess");
}
function hasEventDefinition(element, type) {
	var businessObject = getBusinessObject(element);
	return type && businessObject.get("eventDefinitions").some(function(definition) {
		return is(definition, type);
	});
}
function intersection(a, b) {
	return a.filter(function(item) {
		return b.includes(item);
	});
}
// ../../node_modules/bpmn-js/lib/features/replace/index.js
var replace_default = {
	__depends__: [
		copy_paste_default,
		replace_default$1,
		selection_default
	],
	bpmnReplace: ["type", BpmnReplace]
};
// ../../node_modules/diagram-js/lib/features/space-tool/SpaceTool.js
init_dist();
var abs$1 = Math.abs;
var round$2 = Math.round;
var AXIS_TO_DIMENSION = {
	x: "width",
	y: "height"
};
var CURSOR_CROSSHAIR = "crosshair";
var DIRECTION_TO_TRBL = {
	n: "top",
	w: "left",
	s: "bottom",
	e: "right"
};
var HIGH_PRIORITY$7 = 1500;
var DIRECTION_TO_OPPOSITE = {
	n: "s",
	w: "e",
	s: "n",
	e: "w"
};
var PADDING = 20;
function SpaceTool(canvas, dragging, eventBus, modeling, rules, toolManager, mouse) {
	this._canvas = canvas;
	this._dragging = dragging;
	this._eventBus = eventBus;
	this._modeling = modeling;
	this._rules = rules;
	this._toolManager = toolManager;
	this._mouse = mouse;
	var self = this;
	toolManager.registerTool("space", {
		tool: "spaceTool.selection",
		dragging: "spaceTool"
	});
	eventBus.on("spaceTool.selection.end", function(event) {
		eventBus.once("spaceTool.selection.ended", function() {
			self.activateMakeSpace(event.originalEvent);
		});
	});
	eventBus.on("spaceTool.move", HIGH_PRIORITY$7, function(event) {
		var context = event.context, initialized = context.initialized;
		if (!initialized) initialized = context.initialized = self.init(event, context);
		if (initialized) ensureConstraints(event);
	});
	eventBus.on("spaceTool.end", function(event) {
		var context = event.context, axis = context.axis, direction = context.direction, movingShapes = context.movingShapes, resizingShapes = context.resizingShapes, start = context.start;
		if (!context.initialized) return;
		ensureConstraints(event);
		var delta = {
			x: 0,
			y: 0
		};
		delta[axis] = round$2(event["d" + axis]);
		self.makeSpace(movingShapes, resizingShapes, delta, direction, start);
		eventBus.once("spaceTool.ended", function(event) {
			self.activateSelection(event.originalEvent, true, true);
		});
	});
}
SpaceTool.$inject = [
	"canvas",
	"dragging",
	"eventBus",
	"modeling",
	"rules",
	"toolManager",
	"mouse"
];
SpaceTool.prototype.activateSelection = function(event, autoActivate, reactivate) {
	this._dragging.init(event, "spaceTool.selection", {
		autoActivate,
		cursor: CURSOR_CROSSHAIR,
		data: { context: { reactivate } },
		trapClick: false
	});
};
SpaceTool.prototype.activateMakeSpace = function(event) {
	this._dragging.init(event, "spaceTool", {
		autoActivate: true,
		cursor: CURSOR_CROSSHAIR,
		data: { context: {} }
	});
};
SpaceTool.prototype.makeSpace = function(movingShapes, resizingShapes, delta, direction, start) {
	return this._modeling.createSpace(movingShapes, resizingShapes, delta, direction, start);
};
SpaceTool.prototype.init = function(event, context) {
	var axis = abs$1(event.dx) > abs$1(event.dy) ? "x" : "y", delta = event["d" + axis], start = event[axis] - delta;
	if (abs$1(delta) < 5) return false;
	if (delta < 0) delta *= -1;
	if (hasPrimaryModifier(event)) delta *= -1;
	var direction = getDirection(axis, delta);
	var root = this._canvas.getRootElement();
	if (!hasSecondaryModifier(event) && event.hover) root = event.hover;
	var children = [...selfAndAllChildren(root), ...root.attachers || []];
	var elements = this.calculateAdjustments(children, axis, delta, start);
	var spaceToolConstraints = getSpaceToolConstraints(elements, axis, direction, start, this._eventBus.fire("spaceTool.getMinDimensions", {
		axis,
		direction,
		shapes: elements.resizingShapes,
		start
	}));
	assign$1(context, elements, {
		axis,
		direction,
		spaceToolConstraints,
		start
	});
	set("resize-" + (axis === "x" ? "ew" : "ns"));
	return true;
};
SpaceTool.prototype.calculateAdjustments = function(elements, axis, delta, start) {
	var rules = this._rules;
	var movingShapes = [], resizingShapes = [];
	var movingShapesSet = new Set(), resizingShapesSet = new Set();
	var attachers = [], connections = [];
	function moveShape(shape) {
		if (!movingShapesSet.has(shape)) {
			movingShapesSet.add(shape);
			movingShapes.push(shape);
		}
		var label = shape.label;
		if (label && !movingShapesSet.has(label)) {
			movingShapesSet.add(label);
			movingShapes.push(label);
		}
	}
	function resizeShape(shape) {
		if (!resizingShapesSet.has(shape)) {
			resizingShapesSet.add(shape);
			resizingShapes.push(shape);
		}
	}
	forEach(elements, function(element) {
		if (!element.parent || isLabel(element)) return;
		if (isConnection(element)) {
			connections.push(element);
			return;
		}
		var shapeStart = element[axis], shapeEnd = shapeStart + element[AXIS_TO_DIMENSION[axis]];
		if (isAttacher$1(element) && (delta > 0 && getMid(element)[axis] > start || delta < 0 && getMid(element)[axis] < start)) {
			attachers.push(element);
			return;
		}
		if (delta > 0 && shapeStart > start || delta < 0 && shapeEnd < start) {
			moveShape(element);
			return;
		}
		if (shapeStart < start && shapeEnd > start && rules.allowed("shape.resize", { shape: element })) {
			resizeShape(element);
			return;
		}
	});
	forEach(movingShapes, function(shape) {
		var attachers = shape.attachers;
		if (attachers) forEach(attachers, function(attacher) {
			moveShape(attacher);
		});
	});
	forEach(attachers, function(attacher) {
		var host = attacher.host;
		if (movingShapesSet.has(host) || resizingShapesSet.has(host)) moveShape(attacher);
	});
	forEach(connections, function(connection) {
		var source = connection.source, target = connection.target, label = connection.label;
		if ((movingShapesSet.has(source) || resizingShapesSet.has(source)) && (movingShapesSet.has(target) || resizingShapesSet.has(target)) && label) moveShape(label);
	});
	return {
		movingShapes,
		resizingShapes
	};
};
SpaceTool.prototype.toggle = function() {
	if (this.isActive()) return this._dragging.cancel();
	var mouseEvent = this._mouse.getLastMoveEvent();
	this.activateSelection(mouseEvent, !!mouseEvent);
};
SpaceTool.prototype.isActive = function() {
	var context = this._dragging.context();
	if (context) return /^spaceTool/.test(context.prefix);
	return false;
};
function addPadding(trbl) {
	return {
		top: trbl.top - PADDING,
		right: trbl.right + PADDING,
		bottom: trbl.bottom + PADDING,
		left: trbl.left - PADDING
	};
}
function ensureConstraints(event) {
	var spaceToolConstraints = event.context.spaceToolConstraints;
	if (!spaceToolConstraints) return;
	var x, y;
	if (isNumber(spaceToolConstraints.left)) {
		x = Math.max(event.x, spaceToolConstraints.left);
		event.dx = event.dx + x - event.x;
		event.x = x;
	}
	if (isNumber(spaceToolConstraints.right)) {
		x = Math.min(event.x, spaceToolConstraints.right);
		event.dx = event.dx + x - event.x;
		event.x = x;
	}
	if (isNumber(spaceToolConstraints.top)) {
		y = Math.max(event.y, spaceToolConstraints.top);
		event.dy = event.dy + y - event.y;
		event.y = y;
	}
	if (isNumber(spaceToolConstraints.bottom)) {
		y = Math.min(event.y, spaceToolConstraints.bottom);
		event.dy = event.dy + y - event.y;
		event.y = y;
	}
}
function getSpaceToolConstraints(elements, axis, direction, start, minDimensions) {
	var movingShapes = elements.movingShapes, resizingShapes = elements.resizingShapes;
	if (!resizingShapes.length) return;
	var spaceToolConstraints = {}, min, max;
	var movingShapesSet = new Set(movingShapes), resizingShapesSet = new Set(resizingShapes);
	forEach(resizingShapes, function(resizingShape) {
		var attachers = resizingShape.attachers, children = resizingShape.children;
		var resizingShapeBBox = asTRBL(resizingShape);
		var nonMovingResizingChildren = filter(children, function(child) {
			return !isConnection(child) && !isLabel(child) && !movingShapesSet.has(child) && !resizingShapesSet.has(child);
		});
		var movingChildren = filter(children, function(child) {
			return !isConnection(child) && !isLabel(child) && movingShapesSet.has(child);
		});
		var minOrMax, nonMovingResizingChildrenBBox, movingChildrenBBox, movingAttachers = [], nonMovingAttachers = [], movingAttachersBBox, movingAttachersConstraint, nonMovingAttachersBBox, nonMovingAttachersConstraint;
		if (nonMovingResizingChildren.length) {
			nonMovingResizingChildrenBBox = addPadding(asTRBL(getBBox(nonMovingResizingChildren)));
			minOrMax = start - resizingShapeBBox[DIRECTION_TO_TRBL[direction]] + nonMovingResizingChildrenBBox[DIRECTION_TO_TRBL[direction]];
			if (direction === "n") spaceToolConstraints.bottom = max = isNumber(max) ? Math.min(max, minOrMax) : minOrMax;
			else if (direction === "w") spaceToolConstraints.right = max = isNumber(max) ? Math.min(max, minOrMax) : minOrMax;
			else if (direction === "s") spaceToolConstraints.top = min = isNumber(min) ? Math.max(min, minOrMax) : minOrMax;
			else if (direction === "e") spaceToolConstraints.left = min = isNumber(min) ? Math.max(min, minOrMax) : minOrMax;
		}
		if (movingChildren.length) {
			movingChildrenBBox = addPadding(asTRBL(getBBox(movingChildren)));
			minOrMax = start - movingChildrenBBox[DIRECTION_TO_TRBL[DIRECTION_TO_OPPOSITE[direction]]] + resizingShapeBBox[DIRECTION_TO_TRBL[DIRECTION_TO_OPPOSITE[direction]]];
			if (direction === "n") spaceToolConstraints.bottom = max = isNumber(max) ? Math.min(max, minOrMax) : minOrMax;
			else if (direction === "w") spaceToolConstraints.right = max = isNumber(max) ? Math.min(max, minOrMax) : minOrMax;
			else if (direction === "s") spaceToolConstraints.top = min = isNumber(min) ? Math.max(min, minOrMax) : minOrMax;
			else if (direction === "e") spaceToolConstraints.left = min = isNumber(min) ? Math.max(min, minOrMax) : minOrMax;
		}
		if (attachers && attachers.length) {
			attachers.forEach(function(attacher) {
				if (movingShapesSet.has(attacher)) movingAttachers.push(attacher);
				else nonMovingAttachers.push(attacher);
			});
			if (movingAttachers.length) {
				movingAttachersBBox = asTRBL(getBBox(movingAttachers.map(getMid)));
				movingAttachersConstraint = resizingShapeBBox[DIRECTION_TO_TRBL[DIRECTION_TO_OPPOSITE[direction]]] - (movingAttachersBBox[DIRECTION_TO_TRBL[DIRECTION_TO_OPPOSITE[direction]]] - start);
			}
			if (nonMovingAttachers.length) {
				nonMovingAttachersBBox = asTRBL(getBBox(nonMovingAttachers.map(getMid)));
				nonMovingAttachersConstraint = nonMovingAttachersBBox[DIRECTION_TO_TRBL[direction]] - (resizingShapeBBox[DIRECTION_TO_TRBL[direction]] - start);
			}
			if (direction === "n") {
				minOrMax = Math.min(movingAttachersConstraint || Infinity, nonMovingAttachersConstraint || Infinity);
				spaceToolConstraints.bottom = max = isNumber(max) ? Math.min(max, minOrMax) : minOrMax;
			} else if (direction === "w") {
				minOrMax = Math.min(movingAttachersConstraint || Infinity, nonMovingAttachersConstraint || Infinity);
				spaceToolConstraints.right = max = isNumber(max) ? Math.min(max, minOrMax) : minOrMax;
			} else if (direction === "s") {
				minOrMax = Math.max(movingAttachersConstraint || -Infinity, nonMovingAttachersConstraint || -Infinity);
				spaceToolConstraints.top = min = isNumber(min) ? Math.max(min, minOrMax) : minOrMax;
			} else if (direction === "e") {
				minOrMax = Math.max(movingAttachersConstraint || -Infinity, nonMovingAttachersConstraint || -Infinity);
				spaceToolConstraints.left = min = isNumber(min) ? Math.max(min, minOrMax) : minOrMax;
			}
		}
		var resizingShapeMinDimensions = minDimensions && minDimensions[resizingShape.id];
		if (resizingShapeMinDimensions) {
			if (direction === "n") {
				minOrMax = start + resizingShape[AXIS_TO_DIMENSION[axis]] - resizingShapeMinDimensions[AXIS_TO_DIMENSION[axis]];
				spaceToolConstraints.bottom = max = isNumber(max) ? Math.min(max, minOrMax) : minOrMax;
			} else if (direction === "w") {
				minOrMax = start + resizingShape[AXIS_TO_DIMENSION[axis]] - resizingShapeMinDimensions[AXIS_TO_DIMENSION[axis]];
				spaceToolConstraints.right = max = isNumber(max) ? Math.min(max, minOrMax) : minOrMax;
			} else if (direction === "s") {
				minOrMax = start - resizingShape[AXIS_TO_DIMENSION[axis]] + resizingShapeMinDimensions[AXIS_TO_DIMENSION[axis]];
				spaceToolConstraints.top = min = isNumber(min) ? Math.max(min, minOrMax) : minOrMax;
			} else if (direction === "e") {
				minOrMax = start - resizingShape[AXIS_TO_DIMENSION[axis]] + resizingShapeMinDimensions[AXIS_TO_DIMENSION[axis]];
				spaceToolConstraints.left = min = isNumber(min) ? Math.max(min, minOrMax) : minOrMax;
			}
		}
	});
	return spaceToolConstraints;
}
function isAttacher$1(element) {
	return !!element.host;
}
// ../../node_modules/diagram-js/lib/features/space-tool/SpaceToolPreview.js
init_dist();
var MARKER_DRAGGING = "djs-dragging";
var MARKER_RESIZING = "djs-resizing";
var LOW_PRIORITY$4 = 250;
var max = Math.max;
function SpaceToolPreview(eventBus, elementRegistry, canvas, styles, previewSupport) {
	function addPreviewGfx(collection, dragGroup) {
		forEach(collection, function(element) {
			previewSupport.addDragger(element, dragGroup);
			canvas.addMarker(element, MARKER_DRAGGING);
		});
	}
	eventBus.on("spaceTool.selection.start", function(event) {
		var space = canvas.getLayer("space"), context = event.context;
		var orientation = {
			x: "M 0,-10000 L 0,10000",
			y: "M -10000,0 L 10000,0"
		};
		var crosshairGroup = create("g");
		attr(crosshairGroup, styles.cls("djs-crosshair-group", ["no-events"]));
		append(space, crosshairGroup);
		var pathX = create("path");
		attr(pathX, "d", orientation.x);
		classes(pathX).add("djs-crosshair");
		append(crosshairGroup, pathX);
		var pathY = create("path");
		attr(pathY, "d", orientation.y);
		classes(pathY).add("djs-crosshair");
		append(crosshairGroup, pathY);
		context.crosshairGroup = crosshairGroup;
	});
	eventBus.on("spaceTool.selection.move", function(event) {
		var crosshairGroup = event.context.crosshairGroup;
		translate(crosshairGroup, event.x, event.y);
	});
	eventBus.on("spaceTool.selection.cleanup", function(event) {
		var crosshairGroup = event.context.crosshairGroup;
		if (crosshairGroup) remove$1(crosshairGroup);
	});
	eventBus.on("spaceTool.move", LOW_PRIORITY$4, function(event) {
		var context = event.context, line = context.line, axis = context.axis, movingShapes = context.movingShapes, resizingShapes = context.resizingShapes;
		if (!context.initialized) return;
		if (!context.dragGroup) {
			var spaceLayer = canvas.getLayer("space");
			line = create("path");
			attr(line, "d", "M0,0 L0,0");
			classes(line).add("djs-crosshair");
			append(spaceLayer, line);
			context.line = line;
			var dragGroup = create("g");
			attr(dragGroup, styles.cls("djs-drag-group", ["no-events"]));
			append(canvas.getActiveLayer(), dragGroup);
			addPreviewGfx(movingShapes, dragGroup);
			var adjustedShapes = new Set(movingShapes);
			forEach(resizingShapes, function(shape) {
				adjustedShapes.add(shape);
			});
			var seenConnections = new Set();
			var movingConnections = context.movingConnections = [];
			adjustedShapes.forEach(function(shape) {
				forEach(shape.outgoing, function(connection) {
					if (seenConnections.has(connection) || !isConnection(connection) || !adjustedShapes.has(connection.target)) return;
					seenConnections.add(connection);
					movingConnections.push(connection);
				});
			});
			addPreviewGfx(movingConnections, dragGroup);
			context.dragGroup = dragGroup;
		}
		if (!context.frameGroup) {
			var frameGroup = create("g");
			attr(frameGroup, styles.cls("djs-frame-group", ["no-events"]));
			append(canvas.getActiveLayer(), frameGroup);
			var frames = [];
			forEach(resizingShapes, function(shape) {
				var frame = previewSupport.addFrame(shape, frameGroup);
				var initialBounds = frame.getBBox();
				frames.push({
					element: frame,
					initialBounds
				});
				canvas.addMarker(shape, MARKER_RESIZING);
			});
			context.frameGroup = frameGroup;
			context.frames = frames;
		}
		var orientation = {
			x: "M" + event.x + ", -10000 L" + event.x + ", 10000",
			y: "M -10000, " + event.y + " L 10000, " + event.y
		};
		attr(line, { d: orientation[axis] });
		var opposite = {
			x: "y",
			y: "x"
		};
		var delta = {
			x: event.dx,
			y: event.dy
		};
		delta[opposite[context.axis]] = 0;
		translate(context.dragGroup, delta.x, delta.y);
		forEach(context.frames, function(frame) {
			var element = frame.element, initialBounds = frame.initialBounds, width, height;
			if (context.direction === "e") attr(element, { width: max(initialBounds.width + delta.x, 5) });
			else {
				width = max(initialBounds.width - delta.x, 5);
				attr(element, {
					width,
					x: initialBounds.x + initialBounds.width - width
				});
			}
			if (context.direction === "s") attr(element, { height: max(initialBounds.height + delta.y, 5) });
			else {
				height = max(initialBounds.height - delta.y, 5);
				attr(element, {
					height,
					y: initialBounds.y + initialBounds.height - height
				});
			}
		});
	});
	eventBus.on("spaceTool.cleanup", function(event) {
		var context = event.context, movingShapes = context.movingShapes, movingConnections = context.movingConnections, resizingShapes = context.resizingShapes, line = context.line, dragGroup = context.dragGroup, frameGroup = context.frameGroup;
		forEach(movingShapes, function(shape) {
			canvas.removeMarker(shape, MARKER_DRAGGING);
		});
		forEach(movingConnections, function(connection) {
			canvas.removeMarker(connection, MARKER_DRAGGING);
		});
		if (dragGroup) {
			remove$1(line);
			remove$1(dragGroup);
		}
		forEach(resizingShapes, function(shape) {
			canvas.removeMarker(shape, MARKER_RESIZING);
		});
		if (frameGroup) remove$1(frameGroup);
	});
}
SpaceToolPreview.$inject = [
	"eventBus",
	"elementRegistry",
	"canvas",
	"styles",
	"previewSupport"
];
// ../../node_modules/diagram-js/lib/features/space-tool/index.js
var space_tool_default$1 = {
	__init__: ["spaceToolPreview"],
	__depends__: [
		dragging_default,
		rules_default$1,
		tool_manager_default,
		preview_support_default,
		mouse_default
	],
	spaceTool: ["type", SpaceTool],
	spaceToolPreview: ["type", SpaceToolPreview]
};
// ../../node_modules/bpmn-js/lib/features/space-tool/BpmnSpaceTool.js
init_ModelUtil();
init_dist();
function BpmnSpaceTool(injector, canvas) {
	injector.invoke(SpaceTool, this);
	this._canvas = canvas;
}
BpmnSpaceTool.$inject = ["injector", "canvas"];
e(BpmnSpaceTool, SpaceTool);
BpmnSpaceTool.prototype.calculateAdjustments = function(elements, axis, delta, start) {
	var canvasRoot = this._canvas.getRootElement(), spaceRoot = elements[0] === canvasRoot ? null : elements[0], enclosedArtifacts = [];
	if (spaceRoot) enclosedArtifacts = values(getEnclosedElements(canvasRoot.children.filter((child) => is(child, "bpmn:Artifact")), getBBox(spaceRoot)));
	const elementsToMove = [...elements, ...enclosedArtifacts];
	var adjustments = SpaceTool.prototype.calculateAdjustments.call(this, elementsToMove, axis, delta, start);
	adjustments.resizingShapes = adjustments.resizingShapes.filter(function(shape) {
		if (is(shape, "bpmn:TextAnnotation")) return false;
		if (isCollapsedPool$1(shape)) {
			if (axis === "y" && isHorizontal$1(shape) || axis === "x" && !isHorizontal$1(shape)) return false;
		}
		return true;
	});
	return adjustments;
};
function isCollapsedPool$1(shape) {
	return is(shape, "bpmn:Participant") && !getBusinessObject(shape).processRef;
}
// ../../node_modules/bpmn-js/lib/features/space-tool/index.js
var space_tool_default = {
	__depends__: [space_tool_default$1],
	spaceTool: ["type", BpmnSpaceTool]
};
// ../../node_modules/diagram-js/lib/features/label-support/LabelSupport.js
init_dist();
var LOW_PRIORITY$3 = 250;
var HIGH_PRIORITY$6 = 1400;
function LabelSupport(injector, eventBus, modeling) {
	CommandInterceptor.call(this, eventBus);
	var movePreview = injector.get("movePreview", false);
	eventBus.on("shape.move.start", HIGH_PRIORITY$6, function(e) {
		var context = e.context, shapes = context.shapes, validatedShapes = context.validatedShapes;
		context.shapes = removeLabels(shapes);
		context.validatedShapes = removeLabels(validatedShapes);
	});
	movePreview && eventBus.on("shape.move.start", LOW_PRIORITY$3, function(e) {
		var context = e.context, shapeSet = new Set(context.shapes), labelSet = new Set();
		for (const shape of shapeSet) for (const label of shape.labels) {
			if (!label.hidden && !shapeSet.has(label)) labelSet.add(label);
			if (shape.labelTarget) labelSet.add(shape);
		}
		for (const label of labelSet) movePreview.makeDraggable(context, label, true);
	});
	this.preExecuted("elements.move", HIGH_PRIORITY$6, function(e) {
		var closure = e.context.closure, enclosedElements = closure.enclosedElements;
		var enclosedLabels = [];
		forEach(enclosedElements, function(element) {
			forEach(element.labels, function(label) {
				if (!enclosedElements[label.id]) enclosedLabels.push(label);
			});
		});
		closure.addAll(enclosedLabels);
	});
	this.preExecute(["connection.delete", "shape.delete"], function(e) {
		var context = e.context, element = context.connection || context.shape;
		saveClear(element.labels, function(label) {
			modeling.removeShape(label, { nested: true });
		});
	});
	this.execute("shape.delete", function(e) {
		var context = e.context, shape = context.shape, labelTarget = shape.labelTarget;
		if (labelTarget) {
			context.labelTargetIndex = indexOf(labelTarget.labels, shape);
			context.labelTarget = labelTarget;
			shape.labelTarget = null;
		}
	});
	this.revert("shape.delete", function(e) {
		var context = e.context, shape = context.shape, labelTarget = context.labelTarget, labelTargetIndex = context.labelTargetIndex;
		if (labelTarget) {
			add(labelTarget.labels, shape, labelTargetIndex);
			shape.labelTarget = labelTarget;
		}
	});
}
e(LabelSupport, CommandInterceptor);
LabelSupport.$inject = [
	"injector",
	"eventBus",
	"modeling"
];
function removeLabels(elements) {
	var elementsSet = new Set(elements);
	return filter(elements, function(element) {
		return !elementsSet.has(element.labelTarget);
	});
}
// ../../node_modules/diagram-js/lib/features/label-support/index.js
var label_support_default = {
	__init__: ["labelSupport"],
	labelSupport: ["type", LabelSupport]
};
// ../../node_modules/diagram-js/lib/features/attach-support/AttachSupport.js
init_dist();
var LOW_PRIORITY$2 = 251;
var HIGH_PRIORITY$5 = 1401;
var MARKER_ATTACH = "attach-ok";
function AttachSupport(injector, eventBus, canvas, rules, modeling) {
	CommandInterceptor.call(this, eventBus);
	var movePreview = injector.get("movePreview", false);
	eventBus.on("shape.move.start", HIGH_PRIORITY$5, function(e) {
		var context = e.context, shapes = context.shapes, validatedShapes = context.validatedShapes;
		context.shapes = addAttached(shapes);
		context.validatedShapes = removeAttached(validatedShapes);
	});
	movePreview && eventBus.on("shape.move.start", LOW_PRIORITY$2, function(e) {
		var context = e.context, shapes = context.shapes, attachers = getAttachers(shapes);
		forEach(attachers, function(attacher) {
			movePreview.makeDraggable(context, attacher, true);
			forEach(attacher.labels, function(label) {
				movePreview.makeDraggable(context, label, true);
			});
		});
	});
	movePreview && eventBus.on("shape.move.start", function(event) {
		var shapes = event.context.shapes;
		if (shapes.length !== 1) return;
		var host = shapes[0].host;
		if (host) {
			canvas.addMarker(host, MARKER_ATTACH);
			eventBus.once(["shape.move.out", "shape.move.cleanup"], function() {
				canvas.removeMarker(host, MARKER_ATTACH);
			});
		}
	});
	this.preExecuted("elements.move", HIGH_PRIORITY$5, function(e) {
		var context = e.context, closure = context.closure, shapes = context.shapes, attachers = getAttachers(shapes);
		forEach(attachers, function(attacher) {
			closure.add(attacher, closure.topLevel[attacher.host.id]);
		});
	});
	this.postExecuted("elements.move", function(e) {
		var context = e.context, shapes = context.shapes, newHost = context.newHost, attachers;
		if (newHost && shapes.length !== 1) return;
		if (newHost) attachers = shapes;
		else attachers = filter(shapes, function(shape) {
			var host = shape.host;
			return isAttacher(shape) && !includes$1(shapes, host);
		});
		forEach(attachers, function(attacher) {
			modeling.updateAttachment(attacher, newHost);
		});
	});
	this.postExecuted("elements.move", function(e) {
		var shapes = e.context.shapes;
		forEach(shapes, function(shape) {
			forEach(shape.attachers, function(attacher) {
				forEach(attacher.outgoing.slice(), function(connection) {
					if (!rules.allowed("connection.reconnect", {
						connection,
						source: connection.source,
						target: connection.target
					})) modeling.removeConnection(connection);
				});
				forEach(attacher.incoming.slice(), function(connection) {
					if (!rules.allowed("connection.reconnect", {
						connection,
						source: connection.source,
						target: connection.target
					})) modeling.removeConnection(connection);
				});
			});
		});
	});
	this.postExecute("shape.create", function(e) {
		var context = e.context, shape = context.shape, host = context.host;
		if (host) modeling.updateAttachment(shape, host);
	});
	this.postExecute("shape.replace", function(e) {
		var context = e.context, oldShape = context.oldShape, newShape = context.newShape;
		saveClear(oldShape.attachers, function(attacher) {
			if (rules.allowed("elements.move", {
				target: newShape,
				shapes: [attacher]
			}) === "attach") modeling.updateAttachment(attacher, newShape);
			else modeling.removeShape(attacher);
		});
		if (newShape.attachers.length) forEach(newShape.attachers, function(attacher) {
			var delta = getNewAttachShapeDelta(attacher, oldShape, newShape);
			modeling.moveShape(attacher, delta, attacher.parent);
		});
	});
	this.postExecute("shape.resize", function(event) {
		var context = event.context, shape = context.shape, oldBounds = context.oldBounds, newBounds = context.newBounds, attachers = shape.attachers;
		if ((context.hints || {}).attachSupport === false) return;
		forEach(attachers, function(attacher) {
			var delta = getNewAttachShapeDelta(attacher, oldBounds, newBounds);
			modeling.moveShape(attacher, delta, attacher.parent);
			forEach(attacher.labels, function(label) {
				modeling.moveShape(label, delta, label.parent);
			});
		});
	});
	this.preExecute("shape.delete", function(event) {
		var shape = event.context.shape;
		saveClear(shape.attachers, function(attacher) {
			modeling.removeShape(attacher);
		});
		if (shape.host) modeling.updateAttachment(shape, null);
	});
}
e(AttachSupport, CommandInterceptor);
AttachSupport.$inject = [
	"injector",
	"eventBus",
	"canvas",
	"rules",
	"modeling"
];
function getAttachers(shapes) {
	return flatten(map(shapes, function(s) {
		return s.attachers || [];
	}));
}
function addAttached(elements) {
	var attachers = getAttachers(elements);
	return unionBy("id", elements, attachers);
}
function removeAttached(elements) {
	var ids = groupBy(elements, "id");
	return filter(elements, function(element) {
		while (element) {
			if (element.host && ids[element.host.id]) return false;
			element = element.parent;
		}
		return true;
	});
}
function isAttacher(shape) {
	return !!shape.host;
}
function includes$1(array, item) {
	return array.indexOf(item) !== -1;
}
// ../../node_modules/diagram-js/lib/features/attach-support/index.js
var attach_support_default = {
	__depends__: [rules_default$1],
	__init__: ["attachSupport"],
	attachSupport: ["type", AttachSupport]
};
// ../../node_modules/bpmn-js/lib/features/modeling/BpmnFactory.js
init_dist();
init_ModelUtil();
function BpmnFactory(moddle) {
	this._model = moddle;
}
BpmnFactory.$inject = ["moddle"];
BpmnFactory.prototype._needsId = function(element) {
	return isAny(element, [
		"bpmn:RootElement",
		"bpmn:FlowElement",
		"bpmn:MessageFlow",
		"bpmn:DataAssociation",
		"bpmn:Artifact",
		"bpmn:Participant",
		"bpmn:Lane",
		"bpmn:LaneSet",
		"bpmn:Process",
		"bpmn:Collaboration",
		"bpmndi:BPMNShape",
		"bpmndi:BPMNEdge",
		"bpmndi:BPMNDiagram",
		"bpmndi:BPMNPlane",
		"bpmn:Property",
		"bpmn:CategoryValue"
	]);
};
BpmnFactory.prototype._ensureId = function(element) {
	if (element.id) {
		this._model.ids.claim(element.id, element);
		return;
	}
	var prefix;
	if (is(element, "bpmn:Activity")) prefix = "Activity";
	else if (is(element, "bpmn:Event")) prefix = "Event";
	else if (is(element, "bpmn:Gateway")) prefix = "Gateway";
	else if (isAny(element, ["bpmn:SequenceFlow", "bpmn:MessageFlow"])) prefix = "Flow";
	else prefix = (element.$type || "").replace(/^[^:]*:/g, "");
	prefix += "_";
	if (!element.id && this._needsId(element)) element.id = this._model.ids.nextPrefixed(prefix, element);
};
BpmnFactory.prototype.create = function(type, attrs) {
	var element = this._model.create(type, attrs || {});
	this._ensureId(element);
	return element;
};
BpmnFactory.prototype.createDiLabel = function() {
	return this.create("bpmndi:BPMNLabel", { bounds: this.createDiBounds() });
};
BpmnFactory.prototype.createDiShape = function(semantic, attrs) {
	return this.create("bpmndi:BPMNShape", assign$1({
		bpmnElement: semantic,
		bounds: this.createDiBounds()
	}, attrs));
};
BpmnFactory.prototype.createDiBounds = function(bounds) {
	return this.create("dc:Bounds", bounds);
};
BpmnFactory.prototype.createDiWaypoints = function(waypoints) {
	var self = this;
	return map(waypoints, function(pos) {
		return self.createDiWaypoint(pos);
	});
};
BpmnFactory.prototype.createDiWaypoint = function(point) {
	return this.create("dc:Point", pick(point, ["x", "y"]));
};
BpmnFactory.prototype.createDiEdge = function(semantic, attrs) {
	return this.create("bpmndi:BPMNEdge", assign$1({
		bpmnElement: semantic,
		waypoint: this.createDiWaypoints([])
	}, attrs));
};
BpmnFactory.prototype.createDiPlane = function(semantic, attrs) {
	return this.create("bpmndi:BPMNPlane", assign$1({ bpmnElement: semantic }, attrs));
};
// ../../node_modules/bpmn-js/lib/features/modeling/BpmnUpdater.js
init_dist();
init_ModelUtil();
function BpmnUpdater(eventBus, bpmnFactory, connectionDocking) {
	CommandInterceptor.call(this, eventBus);
	this._bpmnFactory = bpmnFactory;
	var self = this;
	function cropConnection(e) {
		var context = e.context, hints = context.hints || {}, connection;
		if (!context.cropped && hints.createElementsBehavior !== false) {
			connection = context.connection;
			connection.waypoints = connectionDocking.getCroppedWaypoints(connection);
			context.cropped = true;
		}
	}
	this.executed(["connection.layout", "connection.create"], cropConnection);
	this.reverted(["connection.layout"], function(e) {
		delete e.context.cropped;
	});
	function updateParent(e) {
		var context = e.context;
		self.updateParent(context.shape || context.connection, context.oldParent);
	}
	function reverseUpdateParent(e) {
		var context = e.context;
		var element = context.shape || context.connection, oldParent = context.parent || context.newParent;
		self.updateParent(element, oldParent);
	}
	this.executed([
		"shape.move",
		"shape.create",
		"shape.delete",
		"connection.create",
		"connection.move",
		"connection.delete"
	], ifBpmn(updateParent));
	this.reverted([
		"shape.move",
		"shape.create",
		"shape.delete",
		"connection.create",
		"connection.move",
		"connection.delete"
	], ifBpmn(reverseUpdateParent));
	function updateRoot(event) {
		var children = event.context.oldRoot.children;
		forEach(children, function(child) {
			if (is(child, "bpmn:BaseElement")) self.updateParent(child);
		});
	}
	this.executed(["canvas.updateRoot"], updateRoot);
	this.reverted(["canvas.updateRoot"], updateRoot);
	function updateBounds(e) {
		var shape = e.context.shape;
		if (!is(shape, "bpmn:BaseElement")) return;
		self.updateBounds(shape);
	}
	this.executed([
		"shape.move",
		"shape.create",
		"shape.resize"
	], ifBpmn(function(event) {
		if (event.context.shape.type === "label") return;
		updateBounds(event);
	}));
	this.reverted([
		"shape.move",
		"shape.create",
		"shape.resize"
	], ifBpmn(function(event) {
		if (event.context.shape.type === "label") return;
		updateBounds(event);
	}));
	eventBus.on("shape.changed", function(event) {
		if (event.element.type === "label") updateBounds({ context: { shape: event.element } });
	});
	function updateConnection(e) {
		self.updateConnection(e.context);
	}
	this.executed([
		"connection.create",
		"connection.move",
		"connection.delete",
		"connection.reconnect"
	], ifBpmn(updateConnection));
	this.reverted([
		"connection.create",
		"connection.move",
		"connection.delete",
		"connection.reconnect"
	], ifBpmn(updateConnection));
	function updateConnectionWaypoints(e) {
		self.updateConnectionWaypoints(e.context.connection);
	}
	this.executed([
		"connection.layout",
		"connection.move",
		"connection.updateWaypoints"
	], ifBpmn(updateConnectionWaypoints));
	this.reverted([
		"connection.layout",
		"connection.move",
		"connection.updateWaypoints"
	], ifBpmn(updateConnectionWaypoints));
	this.executed("connection.reconnect", ifBpmn(function(event) {
		var context = event.context, connection = context.connection, oldSource = context.oldSource, newSource = context.newSource, connectionBo = getBusinessObject(connection), oldSourceBo = getBusinessObject(oldSource), newSourceBo = getBusinessObject(newSource);
		if (connectionBo.conditionExpression && !isAny(newSourceBo, [
			"bpmn:Activity",
			"bpmn:ExclusiveGateway",
			"bpmn:InclusiveGateway"
		])) {
			context.oldConditionExpression = connectionBo.conditionExpression;
			delete connectionBo.conditionExpression;
		}
		if (oldSource !== newSource && oldSourceBo.default === connectionBo) {
			context.oldDefault = oldSourceBo.default;
			delete oldSourceBo.default;
		}
	}));
	this.reverted("connection.reconnect", ifBpmn(function(event) {
		var context = event.context, connection = context.connection, oldSource = context.oldSource, newSource = context.newSource, connectionBo = getBusinessObject(connection), oldSourceBo = getBusinessObject(oldSource), newSourceBo = getBusinessObject(newSource);
		if (context.oldConditionExpression) connectionBo.conditionExpression = context.oldConditionExpression;
		if (context.oldDefault) {
			oldSourceBo.default = context.oldDefault;
			delete newSourceBo.default;
		}
	}));
	function updateAttachment(e) {
		self.updateAttachment(e.context);
	}
	this.executed(["element.updateAttachment"], ifBpmn(updateAttachment));
	this.reverted(["element.updateAttachment"], ifBpmn(updateAttachment));
	this.executed("element.updateLabel", ifBpmn(updateBPMNLabel));
	this.reverted("element.updateLabel", ifBpmn(updateBPMNLabel));
	function updateBPMNLabel(event) {
		const { element } = event.context, label = getLabel(element);
		const di = getDi(element), diLabel = di && di.get("label");
		if (isLabelExternal(element) || isPlane(element)) return;
		if (label && !diLabel) di.set("label", bpmnFactory.create("bpmndi:BPMNLabel"));
		else if (!label && diLabel) di.set("label", void 0);
	}
	this.executed("shape.delete", ifBpmn(function(event) {
		const context = event.context, labelTarget = context.labelTarget, di = labelTarget && getDi(labelTarget), diLabel = di && di.get("label");
		if (!diLabel) return;
		context.oldDiLabel = diLabel;
		di.set("label", void 0);
	}));
	this.reverted("shape.delete", ifBpmn(function(event) {
		const { labelTarget, oldDiLabel } = event.context;
		if (oldDiLabel) getDi(labelTarget).set("label", oldDiLabel);
	}));
}
e(BpmnUpdater, CommandInterceptor);
BpmnUpdater.$inject = [
	"eventBus",
	"bpmnFactory",
	"connectionDocking"
];
BpmnUpdater.prototype.updateAttachment = function(context) {
	var shape = context.shape, businessObject = shape.businessObject, host = shape.host;
	businessObject.attachedToRef = host && host.businessObject;
};
BpmnUpdater.prototype.updateParent = function(element, oldParent) {
	if (isLabel(element)) return;
	if (is(element, "bpmn:DataStoreReference") && element.parent && is(element.parent, "bpmn:Collaboration")) return;
	var parentShape = element.parent;
	var businessObject = element.businessObject, di = getDi(element), parentBusinessObject = parentShape && parentShape.businessObject, parentDi = getDi(parentShape);
	if (is(element, "bpmn:FlowNode")) this.updateFlowNodeRefs(businessObject, parentBusinessObject, oldParent && oldParent.businessObject);
	if (is(element, "bpmn:DataOutputAssociation")) {
		if (element.source) parentBusinessObject = element.source.businessObject;
		else parentBusinessObject = null;
	}
	if (is(element, "bpmn:DataInputAssociation")) {
		if (element.target) parentBusinessObject = element.target.businessObject;
		else parentBusinessObject = null;
	}
	this.updateSemanticParent(businessObject, parentBusinessObject);
	if (is(element, "bpmn:DataObjectReference") && businessObject.dataObjectRef) this.updateSemanticParent(businessObject.dataObjectRef, parentBusinessObject);
	this.updateDiParent(di, parentDi);
};
BpmnUpdater.prototype.updateBounds = function(shape) {
	var di = getDi(shape), embeddedLabelBounds = getEmbeddedLabelBounds(shape);
	if (embeddedLabelBounds) {
		var embeddedLabelBoundsDelta = delta(embeddedLabelBounds, di.get("bounds"));
		assign$1(embeddedLabelBounds, {
			x: shape.x + embeddedLabelBoundsDelta.x,
			y: shape.y + embeddedLabelBoundsDelta.y
		});
	}
	var target = isLabel(shape) ? this._getLabel(di) : di;
	var bounds = target.bounds;
	if (!bounds) {
		bounds = this._bpmnFactory.createDiBounds();
		target.set("bounds", bounds);
	}
	assign$1(bounds, {
		x: shape.x,
		y: shape.y,
		width: shape.width,
		height: shape.height
	});
};
BpmnUpdater.prototype.updateFlowNodeRefs = function(businessObject, newContainment, oldContainment) {
	if (oldContainment === newContainment) return;
	var oldRefs, newRefs;
	if (is(oldContainment, "bpmn:Lane")) {
		oldRefs = oldContainment.get("flowNodeRef");
		remove(oldRefs, businessObject);
	}
	if (is(newContainment, "bpmn:Lane")) {
		newRefs = newContainment.get("flowNodeRef");
		add(newRefs, businessObject);
	}
};
BpmnUpdater.prototype.updateDiConnection = function(connection, newSource, newTarget) {
	var connectionDi = getDi(connection), newSourceDi = getDi(newSource), newTargetDi = getDi(newTarget);
	if (connectionDi.sourceElement && connectionDi.sourceElement.bpmnElement !== getBusinessObject(newSource)) connectionDi.sourceElement = newSource && newSourceDi;
	if (connectionDi.targetElement && connectionDi.targetElement.bpmnElement !== getBusinessObject(newTarget)) connectionDi.targetElement = newTarget && newTargetDi;
};
BpmnUpdater.prototype.updateDiParent = function(di, parentDi) {
	if (parentDi && !is(parentDi, "bpmndi:BPMNPlane")) parentDi = parentDi.$parent;
	if (di.$parent === parentDi) return;
	var planeElements = (parentDi || di.$parent).get("planeElement");
	if (parentDi) {
		planeElements.push(di);
		di.$parent = parentDi;
	} else {
		remove(planeElements, di);
		di.$parent = null;
	}
};
function getDefinitions(element) {
	while (element && !is(element, "bpmn:Definitions")) element = element.$parent;
	return element;
}
BpmnUpdater.prototype.getLaneSet = function(container) {
	var laneSet, laneSets;
	if (is(container, "bpmn:Lane")) {
		laneSet = container.childLaneSet;
		if (!laneSet) {
			laneSet = this._bpmnFactory.create("bpmn:LaneSet");
			container.childLaneSet = laneSet;
			laneSet.$parent = container;
		}
		return laneSet;
	}
	if (is(container, "bpmn:Participant")) container = container.processRef;
	laneSets = container.get("laneSets");
	laneSet = laneSets[0];
	if (!laneSet) {
		laneSet = this._bpmnFactory.create("bpmn:LaneSet");
		laneSet.$parent = container;
		laneSets.push(laneSet);
	}
	return laneSet;
};
BpmnUpdater.prototype.updateSemanticParent = function(businessObject, newParent, visualParent) {
	var containment;
	if (businessObject.$parent === newParent) return;
	if (is(businessObject, "bpmn:DataInput") || is(businessObject, "bpmn:DataOutput")) {
		if (is(newParent, "bpmn:Participant") && "processRef" in newParent) newParent = newParent.processRef;
		if ("ioSpecification" in newParent && newParent.ioSpecification === businessObject.$parent) return;
	}
	if (is(businessObject, "bpmn:Lane")) {
		if (newParent) newParent = this.getLaneSet(newParent);
		containment = "lanes";
	} else if (is(businessObject, "bpmn:FlowElement")) {
		if (newParent) {
			if (is(newParent, "bpmn:Participant")) newParent = newParent.processRef;
			else if (is(newParent, "bpmn:Lane")) do
				newParent = newParent.$parent.$parent;
			while (is(newParent, "bpmn:Lane"));
		}
		containment = "flowElements";
	} else if (is(businessObject, "bpmn:Artifact")) {
		while (newParent && !is(newParent, "bpmn:Process") && !is(newParent, "bpmn:SubProcess") && !is(newParent, "bpmn:Collaboration")) if (is(newParent, "bpmn:Participant")) {
			newParent = newParent.processRef;
			break;
		} else newParent = newParent.$parent;
		containment = "artifacts";
	} else if (is(businessObject, "bpmn:MessageFlow")) containment = "messageFlows";
	else if (is(businessObject, "bpmn:Participant")) {
		containment = "participants";
		var process = businessObject.processRef, definitions;
		if (process) {
			definitions = getDefinitions(businessObject.$parent || newParent);
			if (businessObject.$parent) {
				remove(definitions.get("rootElements"), process);
				process.$parent = null;
			}
			if (newParent) {
				add(definitions.get("rootElements"), process);
				process.$parent = definitions;
			}
		}
	} else if (is(businessObject, "bpmn:DataOutputAssociation")) containment = "dataOutputAssociations";
	else if (is(businessObject, "bpmn:DataInputAssociation")) containment = "dataInputAssociations";
	if (!containment) throw new Error(`no parent for <${businessObject.id}> in <${newParent.id}>`);
	var children;
	if (businessObject.$parent) {
		children = businessObject.$parent.get(containment);
		remove(children, businessObject);
	}
	if (!newParent) businessObject.$parent = null;
	else {
		children = newParent.get(containment);
		children.push(businessObject);
		businessObject.$parent = newParent;
	}
	if (visualParent) {
		var diChildren = visualParent.get(containment);
		remove(children, businessObject);
		if (newParent) {
			if (!diChildren) {
				diChildren = [];
				newParent.set(containment, diChildren);
			}
			diChildren.push(businessObject);
		}
	}
};
BpmnUpdater.prototype.updateConnectionWaypoints = function(connection) {
	getDi(connection).set("waypoint", this._bpmnFactory.createDiWaypoints(connection.waypoints));
};
BpmnUpdater.prototype.updateConnection = function(context) {
	var connection = context.connection, businessObject = getBusinessObject(connection), newSource = connection.source, newSourceBo = getBusinessObject(newSource), newTarget = connection.target, newTargetBo = getBusinessObject(connection.target), visualParent;
	if (!is(businessObject, "bpmn:DataAssociation")) {
		var inverseSet = is(businessObject, "bpmn:SequenceFlow");
		if (businessObject.sourceRef !== newSourceBo) {
			if (inverseSet) {
				remove(businessObject.sourceRef && businessObject.sourceRef.get("outgoing"), businessObject);
				if (newSourceBo && newSourceBo.get("outgoing")) newSourceBo.get("outgoing").push(businessObject);
			}
			businessObject.sourceRef = newSourceBo;
		}
		if (businessObject.targetRef !== newTargetBo) {
			if (inverseSet) {
				remove(businessObject.targetRef && businessObject.targetRef.get("incoming"), businessObject);
				if (newTargetBo && newTargetBo.get("incoming")) newTargetBo.get("incoming").push(businessObject);
			}
			businessObject.targetRef = newTargetBo;
		}
	} else if (is(businessObject, "bpmn:DataInputAssociation")) {
		businessObject.get("sourceRef")[0] = newSourceBo;
		visualParent = context.parent || context.newParent || newTargetBo;
		this.updateSemanticParent(businessObject, newTargetBo, visualParent);
	} else if (is(businessObject, "bpmn:DataOutputAssociation")) {
		visualParent = context.parent || context.newParent || newSourceBo;
		this.updateSemanticParent(businessObject, newSourceBo, visualParent);
		businessObject.targetRef = newTargetBo;
	}
	this.updateConnectionWaypoints(connection);
	this.updateDiConnection(connection, newSource, newTarget);
};
BpmnUpdater.prototype._getLabel = function(di) {
	if (!di.label) di.label = this._bpmnFactory.createDiLabel();
	return di.label;
};
function ifBpmn(fn) {
	return function(event) {
		var context = event.context, element = context.shape || context.connection || context.element;
		if (is(element, "bpmn:BaseElement")) fn(event);
	};
}
function getEmbeddedLabelBounds(shape) {
	if (!is(shape, "bpmn:Activity")) return;
	var di = getDi(shape);
	if (!di) return;
	var label = di.get("label");
	if (!label) return;
	return label.get("bounds");
}
// ../../node_modules/bpmn-js/lib/util/ElementSizeUtil.js
init_ModelUtil();
var DEFAULT_SIZE = {
	width: 100,
	height: 80
};
var DEFAULT_TASK_SIZE = {
	width: 100,
	height: 80
};
var DEFAULT_GATEWAY_SIZE = {
	width: 50,
	height: 50
};
var DEFAULT_EVENT_SIZE = {
	width: 36,
	height: 36
};
var DEFAULT_SUB_PROCESS_SIZE = {
	width: 350,
	height: 200
};
var DEFAULT_COLLAPSED_SUB_PROCESS_SIZE = {
	width: 100,
	height: 80
};
var DEFAULT_PARTICIPANT_SIZE = {
	width: 600,
	height: 250
};
var DEFAULT_VERTICAL_PARTICIPANT_SIZE = {
	width: 250,
	height: 600
};
var DEFAULT_COLLAPSED_PARTICIPANT_SIZE = {
	width: 400,
	height: 60
};
var DEFAULT_VERTICAL_COLLAPSED_PARTICIPANT_SIZE = {
	width: 60,
	height: 400
};
var DEFAULT_LANE_SIZE = {
	width: 400,
	height: 100
};
var DEFAULT_DATA_OBJECT_REFERENCE_SIZE = {
	width: 36,
	height: 50
};
var DEFAULT_DATA_STORE_REFERENCE_SIZE = {
	width: 50,
	height: 50
};
var DEFAULT_TEXT_ANNOTATION_SIZE = {
	width: 100,
	height: 40
};
var DEFAULT_GROUP_SIZE = {
	width: 300,
	height: 300
};
function getDefaultSize(element, di) {
	const bo = getBusinessObject(element);
	di = di || getDi(element);
	if (is(bo, "bpmn:SubProcess")) {
		if (isExpanded(bo, di)) return { ...DEFAULT_SUB_PROCESS_SIZE };
		else return { ...DEFAULT_COLLAPSED_SUB_PROCESS_SIZE };
	}
	if (is(bo, "bpmn:Task")) return { ...DEFAULT_TASK_SIZE };
	if (is(bo, "bpmn:Gateway")) return { ...DEFAULT_GATEWAY_SIZE };
	if (is(bo, "bpmn:Event")) return { ...DEFAULT_EVENT_SIZE };
	if (is(bo, "bpmn:Participant")) {
		const isHorizontalPool = !di || di.isHorizontal === void 0 || di.isHorizontal === true;
		if (isExpanded(bo, di)) {
			if (isHorizontalPool) return { ...DEFAULT_PARTICIPANT_SIZE };
			return { ...DEFAULT_VERTICAL_PARTICIPANT_SIZE };
		} else {
			if (isHorizontalPool) return { ...DEFAULT_COLLAPSED_PARTICIPANT_SIZE };
			return { ...DEFAULT_VERTICAL_COLLAPSED_PARTICIPANT_SIZE };
		}
	}
	if (is(bo, "bpmn:Lane")) return { ...DEFAULT_LANE_SIZE };
	if (is(bo, "bpmn:DataObjectReference")) return { ...DEFAULT_DATA_OBJECT_REFERENCE_SIZE };
	if (is(bo, "bpmn:DataStoreReference")) return { ...DEFAULT_DATA_STORE_REFERENCE_SIZE };
	if (is(bo, "bpmn:TextAnnotation")) return { ...DEFAULT_TEXT_ANNOTATION_SIZE };
	if (is(bo, "bpmn:Group")) return { ...DEFAULT_GROUP_SIZE };
	return { ...DEFAULT_SIZE };
}
// ../../node_modules/bpmn-js/lib/features/modeling/ElementFactory.js
init_dist();
init_ModelUtil();
function ElementFactory(bpmnFactory, moddle) {
	ElementFactory$1.call(this);
	this._bpmnFactory = bpmnFactory;
	this._moddle = moddle;
}
e(ElementFactory, ElementFactory$1);
ElementFactory.$inject = ["bpmnFactory", "moddle"];
ElementFactory.prototype._baseCreate = ElementFactory$1.prototype.create;
ElementFactory.prototype.create = function(elementType, attrs) {
	if (elementType === "label") {
		var di = attrs.di || this._bpmnFactory.createDiLabel();
		return this._baseCreate(elementType, assign$1({
			type: "label",
			di
		}, DEFAULT_LABEL_SIZE, attrs));
	}
	return this.createElement(elementType, attrs);
};
ElementFactory.prototype.createElement = function(elementType, attrs) {
	attrs = assign$1({}, attrs || {});
	var size;
	var businessObject = attrs.businessObject, di = attrs.di;
	if (!businessObject) {
		if (!attrs.type) throw new Error("no shape type specified");
		businessObject = this._bpmnFactory.create(attrs.type);
	}
	if (!isModdleDi(di)) {
		var diAttrs = assign$1({}, di || {}, { id: businessObject.id + "_di" });
		if (elementType === "root") di = this._bpmnFactory.createDiPlane(businessObject, diAttrs);
		else if (elementType === "connection") di = this._bpmnFactory.createDiEdge(businessObject, diAttrs);
		else di = this._bpmnFactory.createDiShape(businessObject, diAttrs);
	}
	if (is(businessObject, "bpmn:Group")) attrs = assign$1({ isFrame: true }, attrs);
	attrs = applyAttributes(businessObject, attrs, [
		"processRef",
		"isInterrupting",
		"associationDirection",
		"isForCompensation"
	]);
	if (attrs.isExpanded) attrs = applyAttribute(di, attrs, "isExpanded");
	if (isAny(businessObject, ["bpmn:Lane", "bpmn:Participant"])) attrs = applyAttribute(di, attrs, "isHorizontal");
	if (is(businessObject, "bpmn:SubProcess")) attrs.collapsed = !isExpanded(businessObject, di);
	if (is(businessObject, "bpmn:ExclusiveGateway")) {
		if (has(di, "isMarkerVisible")) {
			if (di.isMarkerVisible === void 0) di.isMarkerVisible = false;
		} else di.isMarkerVisible = true;
	}
	if (isDefined(attrs.triggeredByEvent)) {
		businessObject.triggeredByEvent = attrs.triggeredByEvent;
		delete attrs.triggeredByEvent;
	}
	if (isDefined(attrs.cancelActivity)) {
		businessObject.cancelActivity = attrs.cancelActivity;
		delete attrs.cancelActivity;
	}
	var eventDefinitions, newEventDefinition;
	if (attrs.eventDefinitionType) {
		eventDefinitions = businessObject.get("eventDefinitions") || [];
		newEventDefinition = this._bpmnFactory.create(attrs.eventDefinitionType, attrs.eventDefinitionAttrs);
		if (attrs.eventDefinitionType === "bpmn:ConditionalEventDefinition") newEventDefinition.condition = this._bpmnFactory.create("bpmn:FormalExpression");
		eventDefinitions.push(newEventDefinition);
		newEventDefinition.$parent = businessObject;
		businessObject.eventDefinitions = eventDefinitions;
		delete attrs.eventDefinitionType;
	}
	size = this.getDefaultSize(businessObject, di);
	attrs = assign$1({ id: businessObject.id }, size, attrs, {
		businessObject,
		di
	});
	return this._baseCreate(elementType, attrs);
};
ElementFactory.prototype.getDefaultSize = function(element, di) {
	return getDefaultSize(element, di);
};
ElementFactory.prototype.createParticipantShape = function(attrs) {
	if (!isObject(attrs)) attrs = { isExpanded: attrs };
	attrs = assign$1({ type: "bpmn:Participant" }, attrs || {});
	if (attrs.isExpanded !== false) attrs.processRef = this._bpmnFactory.create("bpmn:Process");
	return this.createShape(attrs);
};
function applyAttributes(element, attrs, attributeNames) {
	forEach(attributeNames, function(property) {
		attrs = applyAttribute(element, attrs, property);
	});
	return attrs;
}
function applyAttribute(element, attrs, attributeName) {
	if (attrs[attributeName] === void 0) return attrs;
	element[attributeName] = attrs[attributeName];
	return omit(attrs, [attributeName]);
}
function isModdleDi(element) {
	return isAny(element, [
		"bpmndi:BPMNShape",
		"bpmndi:BPMNEdge",
		"bpmndi:BPMNDiagram",
		"bpmndi:BPMNPlane"
	]);
}
// ../../node_modules/bpmn-js/lib/features/modeling/cmd/UpdateModdlePropertiesHandler.js
init_dist();
init_ModelUtil();
function UpdateModdlePropertiesHandler(elementRegistry) {
	this._elementRegistry = elementRegistry;
}
UpdateModdlePropertiesHandler.$inject = ["elementRegistry"];
UpdateModdlePropertiesHandler.prototype.execute = function(context) {
	var element = context.element, moddleElement = context.moddleElement, properties = context.properties;
	if (!moddleElement) throw new Error("<moddleElement> required");
	var changed = context.changed || this._getVisualReferences(moddleElement).concat(element);
	var oldProperties = context.oldProperties || getModdleProperties(moddleElement, keys(properties));
	setModdleProperties(moddleElement, properties);
	context.oldProperties = oldProperties;
	context.changed = changed;
	return changed;
};
UpdateModdlePropertiesHandler.prototype.revert = function(context) {
	var oldProperties = context.oldProperties, moddleElement = context.moddleElement, changed = context.changed;
	setModdleProperties(moddleElement, oldProperties);
	return changed;
};
UpdateModdlePropertiesHandler.prototype._getVisualReferences = function(moddleElement) {
	var elementRegistry = this._elementRegistry;
	if (is(moddleElement, "bpmn:DataObject")) return getAllDataObjectReferences(moddleElement, elementRegistry);
	return [];
};
function getModdleProperties(moddleElement, propertyNames) {
	return reduce(propertyNames, function(result, key) {
		result[key] = moddleElement.get(key);
		return result;
	}, {});
}
function setModdleProperties(moddleElement, properties) {
	forEach(properties, function(value, key) {
		moddleElement.set(key, value);
	});
}
function getAllDataObjectReferences(dataObject, elementRegistry) {
	return elementRegistry.filter(function(element) {
		return is(element, "bpmn:DataObjectReference") && getBusinessObject(element).dataObjectRef === dataObject;
	});
}
// ../../node_modules/bpmn-js/lib/features/modeling/cmd/UpdatePropertiesHandler.js
init_dist();
init_ModelUtil();
var DEFAULT_FLOW = "default";
var ID = "id";
var DI = "di";
var NULL_DIMENSIONS$1 = {
	width: 0,
	height: 0
};
function UpdatePropertiesHandler(elementRegistry, moddle, modeling, textRenderer) {
	this._elementRegistry = elementRegistry;
	this._moddle = moddle;
	this._modeling = modeling;
	this._textRenderer = textRenderer;
}
UpdatePropertiesHandler.$inject = [
	"elementRegistry",
	"moddle",
	"modeling",
	"textRenderer"
];
UpdatePropertiesHandler.prototype.execute = function(context) {
	var element = context.element, changed = [element];
	if (!element) throw new Error("element required");
	var elementRegistry = this._elementRegistry, ids = this._moddle.ids;
	var businessObject = element.businessObject, properties = unwrapBusinessObjects(context.properties), oldProperties = context.oldProperties || getProperties(element, properties);
	if (isIdChange(properties, businessObject)) {
		ids.unclaim(businessObject[ID]);
		elementRegistry.updateId(element, properties[ID]);
		ids.claim(properties[ID], businessObject);
	}
	if (DEFAULT_FLOW in properties) {
		if (properties[DEFAULT_FLOW]) changed.push(elementRegistry.get(properties[DEFAULT_FLOW].id));
		if (businessObject[DEFAULT_FLOW]) changed.push(elementRegistry.get(businessObject[DEFAULT_FLOW].id));
	}
	setProperties(element, properties);
	context.oldProperties = oldProperties;
	context.changed = changed;
	return changed;
};
UpdatePropertiesHandler.prototype.postExecute = function(context) {
	var label = context.element.label;
	var text = label && getBusinessObject(label).name;
	if (!text) return;
	var newLabelBounds = this._textRenderer.getExternalLabelBounds(label, text);
	this._modeling.resizeShape(label, newLabelBounds, NULL_DIMENSIONS$1);
};
UpdatePropertiesHandler.prototype.revert = function(context) {
	var element = context.element, properties = context.properties, oldProperties = context.oldProperties, businessObject = element.businessObject, elementRegistry = this._elementRegistry, ids = this._moddle.ids;
	setProperties(element, oldProperties);
	if (isIdChange(properties, businessObject)) {
		ids.unclaim(properties[ID]);
		elementRegistry.updateId(element, oldProperties[ID]);
		ids.claim(oldProperties[ID], businessObject);
	}
	return context.changed;
};
function isIdChange(properties, businessObject) {
	return ID in properties && properties[ID] !== businessObject[ID];
}
function getProperties(element, properties) {
	var propertyNames = keys(properties), businessObject = element.businessObject, di = getDi(element);
	return reduce(propertyNames, function(result, key) {
		if (key !== DI) result[key] = businessObject.get(key);
		else result[key] = getDiProperties(di, keys(properties.di));
		return result;
	}, {});
}
function getDiProperties(di, propertyNames) {
	return reduce(propertyNames, function(result, key) {
		result[key] = di && di.get(key);
		return result;
	}, {});
}
function setProperties(element, properties) {
	var businessObject = element.businessObject, di = getDi(element);
	forEach(properties, function(value, key) {
		if (key !== DI) businessObject.set(key, value);
		else if (di) setDiProperties(di, value);
	});
}
function setDiProperties(di, properties) {
	forEach(properties, function(value, key) {
		di.set(key, value);
	});
}
var referencePropertyNames = ["default"];
function unwrapBusinessObjects(properties) {
	var unwrappedProps = assign$1({}, properties);
	referencePropertyNames.forEach(function(name) {
		if (name in properties) unwrappedProps[name] = getBusinessObject(unwrappedProps[name]);
	});
	return unwrappedProps;
}
// ../../node_modules/bpmn-js/lib/features/modeling/cmd/UpdateCanvasRootHandler.js
init_ModelUtil();
function UpdateCanvasRootHandler(canvas, modeling) {
	this._canvas = canvas;
	this._modeling = modeling;
}
UpdateCanvasRootHandler.$inject = ["canvas", "modeling"];
UpdateCanvasRootHandler.prototype.execute = function(context) {
	var canvas = this._canvas;
	var newRoot = context.newRoot, newRootBusinessObject = newRoot.businessObject, oldRoot = canvas.getRootElement(), oldRootBusinessObject = oldRoot.businessObject, bpmnDefinitions = oldRootBusinessObject.$parent, diPlane = getDi(oldRoot);
	canvas.setRootElement(newRoot);
	canvas.removeRootElement(oldRoot);
	add(bpmnDefinitions.rootElements, newRootBusinessObject);
	newRootBusinessObject.$parent = bpmnDefinitions;
	remove(bpmnDefinitions.rootElements, oldRootBusinessObject);
	oldRootBusinessObject.$parent = null;
	oldRoot.di = null;
	diPlane.bpmnElement = newRootBusinessObject;
	newRoot.di = diPlane;
	context.oldRoot = oldRoot;
	return [];
};
UpdateCanvasRootHandler.prototype.revert = function(context) {
	var canvas = this._canvas;
	var newRoot = context.newRoot, newRootBusinessObject = newRoot.businessObject, oldRoot = context.oldRoot, oldRootBusinessObject = oldRoot.businessObject, bpmnDefinitions = newRootBusinessObject.$parent, diPlane = getDi(newRoot);
	canvas.setRootElement(oldRoot);
	canvas.removeRootElement(newRoot);
	remove(bpmnDefinitions.rootElements, newRootBusinessObject);
	newRootBusinessObject.$parent = null;
	add(bpmnDefinitions.rootElements, oldRootBusinessObject);
	oldRootBusinessObject.$parent = bpmnDefinitions;
	newRoot.di = null;
	diPlane.bpmnElement = oldRootBusinessObject;
	oldRoot.di = diPlane;
	return [];
};
// ../../node_modules/bpmn-js/lib/features/modeling/cmd/AddLaneHandler.js
init_dist();
function AddLaneHandler(modeling, spaceTool) {
	this._modeling = modeling;
	this._spaceTool = spaceTool;
}
AddLaneHandler.$inject = ["modeling", "spaceTool"];
AddLaneHandler.prototype.preExecute = function(context) {
	var spaceTool = this._spaceTool, modeling = this._modeling;
	var shape = context.shape, location = context.location;
	var lanesRoot = getLanesRoot(shape);
	var isRoot = lanesRoot === shape, laneParent = isRoot ? shape : shape.parent;
	var existingChildLanes = getChildLanes(laneParent);
	var isHorizontalLane = isHorizontal$1(shape);
	if (isHorizontalLane) {
		if (location === "left") location = "top";
		else if (location === "right") location = "bottom";
	} else if (location === "top") location = "left";
	else if (location === "bottom") location = "right";
	if (!existingChildLanes.length) {
		var siblingPosition = isHorizontalLane ? {
			x: shape.x + 30,
			y: shape.y,
			width: shape.width - 30,
			height: shape.height
		} : {
			x: shape.x,
			y: shape.y + 30,
			width: shape.width,
			height: shape.height - 30
		};
		modeling.createShape({
			type: "bpmn:Lane",
			isHorizontal: isHorizontalLane
		}, siblingPosition, laneParent);
	}
	var allAffected = [];
	eachElement(lanesRoot, function(element) {
		allAffected.push(element);
		if (element.label) allAffected.push(element.label);
		if (element === shape) return [];
		return filter(element.children, function(c) {
			return c !== shape;
		});
	});
	var offset, lanePosition, spacePos, direction, axis;
	if (location === "top") {
		offset = -120;
		lanePosition = shape.y;
		spacePos = lanePosition + 10;
		direction = "n";
		axis = "y";
	} else if (location === "left") {
		offset = -120;
		lanePosition = shape.x;
		spacePos = lanePosition + 10;
		direction = "w";
		axis = "x";
	} else if (location === "bottom") {
		offset = 120;
		lanePosition = shape.y + shape.height;
		spacePos = lanePosition - 10;
		direction = "s";
		axis = "y";
	} else if (location === "right") {
		offset = 120;
		lanePosition = shape.x + shape.width;
		spacePos = lanePosition - 10;
		direction = "e";
		axis = "x";
	}
	var adjustments = spaceTool.calculateAdjustments(allAffected, axis, offset, spacePos);
	var delta = isHorizontalLane ? {
		x: 0,
		y: offset
	} : {
		x: offset,
		y: 0
	};
	spaceTool.makeSpace(adjustments.movingShapes, adjustments.resizingShapes, delta, direction, spacePos);
	var newLanePosition = isHorizontalLane ? {
		x: shape.x + (isRoot ? 30 : 0),
		y: lanePosition - (location === "top" ? 120 : 0),
		width: shape.width - (isRoot ? 30 : 0),
		height: 120
	} : {
		x: lanePosition - (location === "left" ? 120 : 0),
		y: shape.y + (isRoot ? 30 : 0),
		width: 120,
		height: shape.height - (isRoot ? 30 : 0)
	};
	context.newLane = modeling.createShape({
		type: "bpmn:Lane",
		isHorizontal: isHorizontalLane
	}, newLanePosition, laneParent);
};
// ../../node_modules/bpmn-js/lib/features/modeling/cmd/SplitLaneHandler.js
function SplitLaneHandler(modeling) {
	this._modeling = modeling;
}
SplitLaneHandler.$inject = ["modeling"];
SplitLaneHandler.prototype.preExecute = function(context) {
	var modeling = this._modeling;
	var shape = context.shape, newLanesCount = context.count;
	var childLanes = getChildLanes(shape), existingLanesCount = childLanes.length;
	if (existingLanesCount > newLanesCount) throw new Error(`more than <${newLanesCount}> child lanes`);
	var isHorizontalLane = isHorizontal$1(shape);
	var laneBaseSize = isHorizontalLane ? shape.height : shape.width;
	var newLanesSize = Math.round(laneBaseSize / newLanesCount);
	var laneSize, laneBounds, newLaneAttrs, idx = 0;
	for (; idx < newLanesCount; idx++) {
		if (idx === newLanesCount - 1) laneSize = laneBaseSize - newLanesSize * idx;
		else laneSize = newLanesSize;
		laneBounds = isHorizontalLane ? {
			x: shape.x + 30,
			y: shape.y + idx * newLanesSize,
			width: shape.width - 30,
			height: laneSize
		} : {
			x: shape.x + idx * newLanesSize,
			y: shape.y + 30,
			width: laneSize,
			height: shape.height - 30
		};
		if (idx < existingLanesCount) modeling.resizeShape(childLanes[idx], laneBounds);
		else {
			newLaneAttrs = {
				type: "bpmn:Lane",
				isHorizontal: isHorizontalLane
			};
			modeling.createShape(newLaneAttrs, laneBounds, shape);
		}
	}
};
// ../../node_modules/bpmn-js/lib/features/modeling/cmd/ResizeLaneHandler.js
init_ModelUtil();
function ResizeLaneHandler(modeling, spaceTool) {
	this._modeling = modeling;
	this._spaceTool = spaceTool;
}
ResizeLaneHandler.$inject = ["modeling", "spaceTool"];
ResizeLaneHandler.prototype.preExecute = function(context) {
	var shape = context.shape, newBounds = context.newBounds;
	if (context.balanced !== false) this.resizeBalanced(shape, newBounds);
	else this.resizeSpace(shape, newBounds);
};
ResizeLaneHandler.prototype.resizeBalanced = function(shape, newBounds) {
	var modeling = this._modeling;
	var resizeNeeded = computeLanesResize(shape, newBounds);
	modeling.resizeShape(shape, newBounds);
	resizeNeeded.forEach(function(r) {
		modeling.resizeShape(r.shape, r.newBounds);
	});
};
ResizeLaneHandler.prototype.resizeSpace = function(shape, newBounds) {
	var spaceTool = this._spaceTool;
	var shapeTrbl = asTRBL(shape), newTrbl = asTRBL(newBounds);
	var trblDiff = substractTRBL(newTrbl, shapeTrbl);
	var lanesRoot = getLanesRoot(shape);
	var allAffected = [], allLanes = [];
	eachElement(lanesRoot, function(element) {
		allAffected.push(element);
		if (is(element, "bpmn:Lane") || is(element, "bpmn:Participant")) allLanes.push(element);
		return element.children;
	});
	var change, spacePos, direction, offset, adjustments;
	if (trblDiff.bottom || trblDiff.top) {
		change = trblDiff.bottom || trblDiff.top;
		spacePos = shape.y + (trblDiff.bottom ? shape.height : 0) + (trblDiff.bottom ? -10 : 10);
		direction = trblDiff.bottom ? "s" : "n";
		offset = trblDiff.top > 0 || trblDiff.bottom < 0 ? -change : change;
		adjustments = spaceTool.calculateAdjustments(allAffected, "y", offset, spacePos);
		spaceTool.makeSpace(adjustments.movingShapes, adjustments.resizingShapes, {
			x: 0,
			y: change
		}, direction);
	}
	if (trblDiff.left || trblDiff.right) {
		change = trblDiff.right || trblDiff.left;
		spacePos = shape.x + (trblDiff.right ? shape.width : 0) + (trblDiff.right ? -10 : 100);
		direction = trblDiff.right ? "e" : "w";
		offset = trblDiff.left > 0 || trblDiff.right < 0 ? -change : change;
		adjustments = spaceTool.calculateAdjustments(allLanes, "x", offset, spacePos);
		spaceTool.makeSpace(adjustments.movingShapes, adjustments.resizingShapes, {
			x: change,
			y: 0
		}, direction);
	}
};
// ../../node_modules/bpmn-js/lib/features/modeling/cmd/UpdateFlowNodeRefsHandler.js
init_ModelUtil();
var FLOW_NODE_REFS_ATTR = "flowNodeRef";
var LANES_ATTR = "lanes";
function UpdateFlowNodeRefsHandler() {}
UpdateFlowNodeRefsHandler.prototype._computeUpdates = function(flowNodeShapes, laneShapes) {
	var handledNodes = [];
	var updates = [];
	var participantCache = {};
	var allFlowNodeShapes = [];
	function isInLaneShape(element, laneShape) {
		var laneTrbl = asTRBL(laneShape);
		var elementMid = {
			x: element.x + element.width / 2,
			y: element.y + element.height / 2
		};
		return elementMid.x > laneTrbl.left && elementMid.x < laneTrbl.right && elementMid.y > laneTrbl.top && elementMid.y < laneTrbl.bottom;
	}
	function addFlowNodeShape(flowNodeShape) {
		if (handledNodes.indexOf(flowNodeShape) === -1) {
			allFlowNodeShapes.push(flowNodeShape);
			handledNodes.push(flowNodeShape);
		}
	}
	function getAllLaneShapes(flowNodeShape) {
		var root = getLanesRoot(flowNodeShape);
		if (!participantCache[root.id]) participantCache[root.id] = collectLanes(root);
		return participantCache[root.id];
	}
	function getNewLanes(flowNodeShape) {
		if (!flowNodeShape.parent) return [];
		return getAllLaneShapes(flowNodeShape).filter(function(l) {
			return isInLaneShape(flowNodeShape, l);
		}).map(function(shape) {
			return shape.businessObject;
		});
	}
	laneShapes.forEach(function(laneShape) {
		var root = getLanesRoot(laneShape);
		if (!root || handledNodes.indexOf(root) !== -1) return;
		root.children.filter(function(c) {
			return is(c, "bpmn:FlowNode");
		}).forEach(addFlowNodeShape);
		handledNodes.push(root);
	});
	flowNodeShapes.forEach(addFlowNodeShape);
	allFlowNodeShapes.forEach(function(flowNodeShape) {
		var flowNode = flowNodeShape.businessObject;
		var remove = flowNode.get(LANES_ATTR).slice(), add = getNewLanes(flowNodeShape);
		updates.push({
			flowNode,
			remove,
			add
		});
	});
	laneShapes.forEach(function(laneShape) {
		var lane = laneShape.businessObject;
		if (!laneShape.parent) lane.get(FLOW_NODE_REFS_ATTR).forEach(function(flowNode) {
			updates.push({
				flowNode,
				remove: [lane],
				add: []
			});
		});
	});
	return updates;
};
UpdateFlowNodeRefsHandler.prototype.execute = function(context) {
	var updates = context.updates;
	if (!updates) updates = context.updates = this._computeUpdates(context.flowNodeShapes, context.laneShapes);
	updates.forEach(function(update) {
		var flowNode = update.flowNode, lanes = flowNode.get(LANES_ATTR);
		update.remove.forEach(function(oldLane) {
			remove(lanes, oldLane);
			remove(oldLane.get(FLOW_NODE_REFS_ATTR), flowNode);
		});
		update.add.forEach(function(newLane) {
			add(lanes, newLane);
			add(newLane.get(FLOW_NODE_REFS_ATTR), flowNode);
		});
	});
	return [];
};
UpdateFlowNodeRefsHandler.prototype.revert = function(context) {
	context.updates.forEach(function(update) {
		var flowNode = update.flowNode, lanes = flowNode.get(LANES_ATTR);
		update.add.forEach(function(newLane) {
			remove(lanes, newLane);
			remove(newLane.get(FLOW_NODE_REFS_ATTR), flowNode);
		});
		update.remove.forEach(function(oldLane) {
			add(lanes, oldLane);
			add(oldLane.get(FLOW_NODE_REFS_ATTR), flowNode);
		});
	});
	return [];
};
// ../../node_modules/bpmn-js/lib/features/modeling/cmd/UpdateCategoryValueRefsHandler.js
init_ModelUtil();
var CATEGORY_VALUE_REFS_ATTR = "categoryValueRef";
function UpdateCategoryValueRefsHandler(bpmnFactory, elementRegistry) {
	this._bpmnFactory = bpmnFactory;
	this._elementRegistry = elementRegistry;
}
UpdateCategoryValueRefsHandler.$inject = ["bpmnFactory", "elementRegistry"];
UpdateCategoryValueRefsHandler.prototype._computeUpdates = function(affectedFlowElements, affectedGroupEntries) {
	var elementRegistry = this._elementRegistry, bpmnFactory = this._bpmnFactory;
	var flowElementBusinessObjects = new Map();
	var groupUpdates = [];
	var categoryGroups = new Map();
	function addGroup(groupShape, categoryValue, isPresent) {
		if (!categoryValue) return;
		var categoryGroup = categoryGroups.get(groupShape);
		if (!categoryGroup) {
			categoryGroup = {};
			categoryGroups.set(groupShape, categoryGroup);
		}
		if (isPresent && categoryGroup.present) return;
		if (!isPresent && categoryGroup.past) return;
		if (isPresent) categoryGroup.present = {
			categoryValue,
			root: getRoot(groupShape)
		};
		else categoryGroup.past = { categoryValue };
	}
	function addFlowElement(flowElement) {
		flowElementBusinessObjects.set(flowElement, getBusinessObject(flowElement));
	}
	function addAllFlowElements() {
		elementRegistry.filter(function(element) {
			return is(element, "bpmn:FlowElement") && !isLabel(element) && element.parent;
		}).forEach(addFlowElement);
	}
	function getCategoryValue(groupShape) {
		var groupBo = getBusinessObject(groupShape), categoryValue = groupBo.get("categoryValueRef");
		if (!categoryValue) {
			categoryValue = getOrCreateCategoryValueForGroup(bpmnFactory, groupBo);
			groupUpdates.push(createGroupUpdate(groupShape, categoryValue));
		}
		return categoryValue;
	}
	function getElementsByRoot(elements) {
		return elements.reduce(function(elementsByRoot, element) {
			var root = getRoot(element), elementsInRoot = elementsByRoot.get(root);
			if (!elementsInRoot) {
				elementsInRoot = [];
				elementsByRoot.set(root, elementsInRoot);
			}
			elementsInRoot.push(element);
			return elementsByRoot;
		}, new Map());
	}
	affectedFlowElements = Array.from(affectedFlowElements || []);
	var affectedFlowElementsByRoot = getElementsByRoot(affectedFlowElements);
	if (affectedGroupEntries.length) addAllFlowElements();
	affectedFlowElements.forEach(addFlowElement);
	elementRegistry.filter(function(element) {
		return is(element, "bpmn:Group") && !isLabel(element) && element.parent;
	}).forEach(function(groupShape) {
		var categoryValue = getBusinessObject(groupShape).get("categoryValueRef");
		if (!categoryValue) {
			var groupRoot = getRoot(groupShape), affectedFlowElementsInRoot = affectedFlowElementsByRoot.get(groupRoot) || [], enclosedAffectedFlowElements = getEnclosedElements(affectedFlowElementsInRoot, groupShape);
			if (Object.keys(enclosedAffectedFlowElements).length > 0) categoryValue = getCategoryValue(groupShape);
		}
		addGroup(groupShape, categoryValue, true);
	});
	affectedGroupEntries.forEach(function(groupEntry) {
		addGroup(groupEntry.groupShape, groupEntry.categoryValue, false);
	});
	if (groupUpdates.length) addAllFlowElements();
	var flowElements = Array.from(flowElementBusinessObjects.keys());
	var managedCategoryValues = Array.from(categoryGroups.values()).reduce(function(set, group) {
		if (group.present) set.add(group.present.categoryValue);
		if (group.past) set.add(group.past.categoryValue);
		return set;
	}, new Set());
	var categoryValuesByFlowElement = new Map(), flowElementsByRoot = getElementsByRoot(flowElements);
	categoryGroups.forEach(function(categoryGroup, groupShape) {
		var presentGroup = categoryGroup.present;
		if (!presentGroup) return;
		var flowElementsInRoot = flowElementsByRoot.get(presentGroup.root) || [], enclosedFlowElements = getEnclosedElements(flowElementsInRoot, groupShape);
		flowElementsInRoot.forEach(function(flowElement) {
			if (!enclosedFlowElements[flowElement.id]) return;
			var categoryValues = categoryValuesByFlowElement.get(flowElement);
			if (!categoryValues) {
				categoryValues = new Set();
				categoryValuesByFlowElement.set(flowElement, categoryValues);
			}
			categoryValues.add(presentGroup.categoryValue);
		});
	});
	return {
		flowElements: flowElements.reduce(function(flowElementUpdates, flowElement) {
			var flowElementBo = flowElementBusinessObjects.get(flowElement), categoryValueRefs = flowElementBo.get(CATEGORY_VALUE_REFS_ATTR), categoryValueRefSet = new Set(categoryValueRefs), enclosingCategoryValues = categoryValuesByFlowElement.get(flowElement) || new Set(), categoryValuesToAdd = Array.from(enclosingCategoryValues).filter(function(categoryValue) {
				return !categoryValueRefSet.has(categoryValue);
			}), categoryValuesToRemove = categoryValueRefs.filter(function(categoryValue) {
				return managedCategoryValues.has(categoryValue) && !enclosingCategoryValues.has(categoryValue);
			});
			if (categoryValuesToAdd.length || categoryValuesToRemove.length) flowElementUpdates.push({
				businessObject: flowElementBo,
				categoryValuesToAdd,
				categoryValuesToRemove
			});
			return flowElementUpdates;
		}, []),
		groups: groupUpdates
	};
};
UpdateCategoryValueRefsHandler.prototype.execute = function(context) {
	var updates = context.updates;
	if (!updates) updates = context.updates = this._computeUpdates(context.affectedFlowElements, context.affectedGroupEntries);
	applyGroupUpdates(updates.groups);
	applyFlowElementUpdates(updates.flowElements);
	return [];
};
UpdateCategoryValueRefsHandler.prototype.revert = function(context) {
	var updates = context.updates;
	revertFlowElementUpdates(updates.flowElements);
	revertGroupUpdates(updates.groups);
	return [];
};
function createGroupUpdate(groupShape, categoryValue) {
	return {
		groupShape,
		categoryValue,
		category: categoryValue.$parent
	};
}
function applyGroupUpdates(groupUpdates) {
	groupUpdates.forEach(function(groupUpdate) {
		getBusinessObject(groupUpdate.groupShape).categoryValueRef = groupUpdate.categoryValue;
		groupUpdate.categoryValue.$parent = groupUpdate.category;
	});
}
function revertGroupUpdates(groupUpdates) {
	groupUpdates.forEach(function(groupUpdate) {
		getBusinessObject(groupUpdate.groupShape).categoryValueRef = null;
	});
}
function applyFlowElementUpdates(flowElementUpdates) {
	flowElementUpdates.forEach(function(flowElementUpdate) {
		var categoryValueRefs = flowElementUpdate.businessObject.get(CATEGORY_VALUE_REFS_ATTR);
		flowElementUpdate.categoryValuesToRemove.forEach(function(categoryValue) {
			remove(categoryValueRefs, categoryValue);
		});
		flowElementUpdate.categoryValuesToAdd.forEach(function(categoryValue) {
			add(categoryValueRefs, categoryValue, true);
		});
	});
}
function revertFlowElementUpdates(flowElementUpdates) {
	flowElementUpdates.forEach(function(flowElementUpdate) {
		var categoryValueRefs = flowElementUpdate.businessObject.get(CATEGORY_VALUE_REFS_ATTR);
		flowElementUpdate.categoryValuesToAdd.forEach(function(categoryValue) {
			remove(categoryValueRefs, categoryValue);
		});
		flowElementUpdate.categoryValuesToRemove.forEach(function(categoryValue) {
			add(categoryValueRefs, categoryValue, true);
		});
	});
}
function getRoot(element) {
	while (element.parent) element = element.parent;
	return element;
}
// ../../node_modules/bpmn-js/lib/features/modeling/cmd/IdClaimHandler.js
function IdClaimHandler(moddle) {
	this._moddle = moddle;
}
IdClaimHandler.$inject = ["moddle"];
IdClaimHandler.prototype.execute = function(context) {
	var ids = this._moddle.ids, id = context.id, element = context.element;
	if (context.claiming) ids.claim(id, element);
	else ids.unclaim(id);
	return [];
};
IdClaimHandler.prototype.revert = function(context) {
	var ids = this._moddle.ids, id = context.id, element = context.element;
	if (context.claiming) ids.unclaim(id);
	else ids.claim(id, element);
	return [];
};
// ../../node_modules/bpmn-js/lib/features/modeling/cmd/SetColorHandler.js
init_dist();
init_ModelUtil();
var DEFAULT_COLORS = {
	fill: void 0,
	stroke: void 0
};
function SetColorHandler(commandStack) {
	this._commandStack = commandStack;
	this._normalizeColor = function(color) {
		if (!color) return;
		if (isString(color)) {
			var hexColor = colorToHex(color);
			if (hexColor) return hexColor;
		}
		throw new Error(`invalid color value: ${color}`);
	};
}
SetColorHandler.$inject = ["commandStack"];
SetColorHandler.prototype.postExecute = function(context) {
	var elements = context.elements, colors = context.colors || DEFAULT_COLORS;
	var self = this;
	var di = {};
	if ("fill" in colors) assign$1(di, { "background-color": this._normalizeColor(colors.fill) });
	if ("stroke" in colors) assign$1(di, { "border-color": this._normalizeColor(colors.stroke) });
	forEach(elements, function(element) {
		var assignedDi = isConnection(element) ? pick(di, ["border-color"]) : di, elementDi = getDi(element);
		ensureLegacySupport(assignedDi);
		if (isLabel(element)) {
			if (!elementDi || !is(elementDi.label, "bpmndi:BPMNLabel")) return;
			self._commandStack.execute("element.updateModdleProperties", {
				element,
				moddleElement: elementDi.label,
				properties: { color: di["border-color"] }
			});
		} else {
			if (!isAny(elementDi, ["bpmndi:BPMNEdge", "bpmndi:BPMNShape"])) return;
			self._commandStack.execute("element.updateProperties", {
				element,
				properties: { di: assignedDi }
			});
		}
	});
};
function colorToHex(color) {
	var context = document.createElement("canvas").getContext("2d");
	context.fillStyle = "transparent";
	context.fillStyle = color;
	return /^#[0-9a-fA-F]{6}$/.test(context.fillStyle) ? context.fillStyle : null;
}
function ensureLegacySupport(di) {
	if ("border-color" in di) di.stroke = di["border-color"];
	if ("background-color" in di) di.fill = di["background-color"];
}
// ../../node_modules/bpmn-js/lib/features/label-editing/cmd/UpdateLabelHandler.js
init_ModelUtil();
var NULL_DIMENSIONS = {
	width: 0,
	height: 0
};
function UpdateLabelHandler(modeling, textRenderer, bpmnFactory) {
	function setText(element, text) {
		var label = element.label || element;
		var labelTarget = element.labelTarget || element;
		setLabel(label, text, labelTarget !== label);
		return [label, labelTarget];
	}
	function preExecute(ctx) {
		var element = ctx.element, businessObject = element.businessObject, newLabel = ctx.newLabel;
		if (!isLabel(element) && isLabelExternal(element) && !hasExternalLabel(element) && !isEmptyText$1(newLabel)) {
			var paddingTop = 7;
			var labelCenter = getExternalLabelMid(element);
			labelCenter = {
				x: labelCenter.x,
				y: labelCenter.y + paddingTop
			};
			modeling.createLabel(element, labelCenter, {
				id: businessObject.id + "_label",
				businessObject,
				di: element.di
			});
		}
	}
	function execute(ctx) {
		ctx.oldLabel = getLabel(ctx.element);
		return setText(ctx.element, ctx.newLabel);
	}
	function revert(ctx) {
		return setText(ctx.element, ctx.oldLabel);
	}
	function postExecute(ctx) {
		var element = ctx.element, label = element.label || element, newLabel = ctx.newLabel, newBounds = ctx.newBounds, hints = ctx.hints || {};
		if (!isLabel(label) && !is(label, "bpmn:TextAnnotation")) return;
		if (isLabel(label) && isEmptyText$1(newLabel)) {
			if (hints.removeShape !== false) modeling.removeShape(label, { unsetLabel: false });
			return;
		}
		var text = getLabel(element);
		if (typeof newBounds === "undefined") newBounds = textRenderer.getExternalLabelBounds(label, text);
		if (newBounds) modeling.resizeShape(label, newBounds, NULL_DIMENSIONS);
	}
	this.preExecute = preExecute;
	this.execute = execute;
	this.revert = revert;
	this.postExecute = postExecute;
}
UpdateLabelHandler.$inject = [
	"modeling",
	"textRenderer",
	"bpmnFactory"
];
function isEmptyText$1(label) {
	return !label || !label.trim();
}
// ../../node_modules/bpmn-js/lib/features/modeling/Modeling.js
function Modeling(eventBus, elementFactory, commandStack, bpmnRules) {
	Modeling$1.call(this, eventBus, elementFactory, commandStack);
	this._bpmnRules = bpmnRules;
}
e(Modeling, Modeling$1);
Modeling.$inject = [
	"eventBus",
	"elementFactory",
	"commandStack",
	"bpmnRules"
];
Modeling.prototype.getHandlers = function() {
	var handlers = Modeling$1.prototype.getHandlers.call(this);
	handlers["element.updateModdleProperties"] = UpdateModdlePropertiesHandler;
	handlers["element.updateProperties"] = UpdatePropertiesHandler;
	handlers["canvas.updateRoot"] = UpdateCanvasRootHandler;
	handlers["lane.add"] = AddLaneHandler;
	handlers["lane.resize"] = ResizeLaneHandler;
	handlers["lane.split"] = SplitLaneHandler;
	handlers["lane.updateRefs"] = UpdateFlowNodeRefsHandler;
	handlers["group.updateRefs"] = UpdateCategoryValueRefsHandler;
	handlers["id.updateClaim"] = IdClaimHandler;
	handlers["element.setColor"] = SetColorHandler;
	handlers["element.updateLabel"] = UpdateLabelHandler;
	return handlers;
};
Modeling.prototype.updateLabel = function(element, newLabel, newBounds, hints) {
	this._commandStack.execute("element.updateLabel", {
		element,
		newLabel,
		newBounds,
		hints: hints || {}
	});
};
Modeling.prototype.connect = function(source, target, attrs, hints) {
	var bpmnRules = this._bpmnRules;
	if (!attrs) attrs = bpmnRules.canConnect(source, target);
	if (!attrs) return;
	return this.createConnection(source, target, attrs, source.parent, hints);
};
Modeling.prototype.updateModdleProperties = function(element, moddleElement, properties) {
	this._commandStack.execute("element.updateModdleProperties", {
		element,
		moddleElement,
		properties
	});
};
Modeling.prototype.updateProperties = function(element, properties) {
	this._commandStack.execute("element.updateProperties", {
		element,
		properties
	});
};
Modeling.prototype.resizeLane = function(laneShape, newBounds, balanced) {
	this._commandStack.execute("lane.resize", {
		shape: laneShape,
		newBounds,
		balanced
	});
};
Modeling.prototype.addLane = function(targetLaneShape, location) {
	var context = {
		shape: targetLaneShape,
		location
	};
	this._commandStack.execute("lane.add", context);
	return context.newLane;
};
Modeling.prototype.splitLane = function(targetLane, count) {
	this._commandStack.execute("lane.split", {
		shape: targetLane,
		count
	});
};
Modeling.prototype.makeCollaboration = function() {
	var collaborationElement = this._create("root", { type: "bpmn:Collaboration" });
	var context = { newRoot: collaborationElement };
	this._commandStack.execute("canvas.updateRoot", context);
	return collaborationElement;
};
Modeling.prototype.makeProcess = function() {
	var processElement = this._create("root", { type: "bpmn:Process" });
	var context = { newRoot: processElement };
	this._commandStack.execute("canvas.updateRoot", context);
	return processElement;
};
Modeling.prototype.updateLaneRefs = function(flowNodeShapes, laneShapes) {
	this._commandStack.execute("lane.updateRefs", {
		flowNodeShapes,
		laneShapes
	});
};
Modeling.prototype.updateCategoryValueRefs = function(affectedFlowElements, affectedGroupEntries) {
	this._commandStack.execute("group.updateRefs", {
		affectedFlowElements,
		affectedGroupEntries
	});
};
Modeling.prototype.claimId = function(id, moddleElement) {
	this._commandStack.execute("id.updateClaim", {
		id,
		element: moddleElement,
		claiming: true
	});
};
Modeling.prototype.unclaimId = function(id, moddleElement) {
	this._commandStack.execute("id.updateClaim", {
		id,
		element: moddleElement
	});
};
Modeling.prototype.setColor = function(elements, colors) {
	if (!elements.length) elements = [elements];
	this._commandStack.execute("element.setColor", {
		elements,
		colors
	});
};
// ../../node_modules/diagram-js/lib/layout/ManhattanLayout.js
init_dist();
var MIN_SEGMENT_LENGTH = 20;
var POINT_ORIENTATION_PADDING = 5;
var round$1 = Math.round;
var INTERSECTION_THRESHOLD = 20;
var ORIENTATION_THRESHOLD = {
	"h:h": 20,
	"v:v": 20,
	"h:v": -10,
	"v:h": -10
};
function needsTurn(orientation, startDirection) {
	return !{
		t: /top/,
		r: /right/,
		b: /bottom/,
		l: /left/,
		h: /./,
		v: /./
	}[startDirection].test(orientation);
}
function canLayoutStraight(direction, targetOrientation) {
	return {
		t: /top/,
		r: /right/,
		b: /bottom/,
		l: /left/,
		h: /left|right/,
		v: /top|bottom/
	}[direction].test(targetOrientation);
}
function getSegmentBendpoints(a, b, directions) {
	var orientation = getOrientation(b, a, POINT_ORIENTATION_PADDING);
	var startDirection = directions.split(":")[0];
	var xmid = round$1((b.x - a.x) / 2 + a.x), ymid = round$1((b.y - a.y) / 2 + a.y);
	var segmentEnd, segmentDirections;
	var layoutStraight = canLayoutStraight(startDirection, orientation), layoutHorizontal = /h|r|l/.test(startDirection), layoutTurn = false;
	var turnNextDirections = false;
	if (layoutStraight) {
		segmentEnd = layoutHorizontal ? {
			x: xmid,
			y: a.y
		} : {
			x: a.x,
			y: ymid
		};
		segmentDirections = layoutHorizontal ? "h:h" : "v:v";
	} else {
		layoutTurn = needsTurn(orientation, startDirection);
		segmentDirections = layoutHorizontal ? "h:v" : "v:h";
		if (layoutTurn) {
			if (layoutHorizontal) {
				turnNextDirections = ymid === a.y;
				segmentEnd = {
					x: a.x + MIN_SEGMENT_LENGTH * (/l/.test(startDirection) ? -1 : 1),
					y: turnNextDirections ? ymid + MIN_SEGMENT_LENGTH : ymid
				};
			} else {
				turnNextDirections = xmid === a.x;
				segmentEnd = {
					x: turnNextDirections ? xmid + MIN_SEGMENT_LENGTH : xmid,
					y: a.y + MIN_SEGMENT_LENGTH * (/t/.test(startDirection) ? -1 : 1)
				};
			}
		} else segmentEnd = {
			x: xmid,
			y: ymid
		};
	}
	return {
		waypoints: getBendpoints(a, segmentEnd, segmentDirections).concat(segmentEnd),
		directions: segmentDirections,
		turnNextDirections
	};
}
function getStartSegment(a, b, directions) {
	return getSegmentBendpoints(a, b, directions);
}
function getEndSegment(a, b, directions) {
	var invertedSegment = getSegmentBendpoints(b, a, invertDirections(directions));
	return {
		waypoints: invertedSegment.waypoints.slice().reverse(),
		directions: invertDirections(invertedSegment.directions),
		turnNextDirections: invertedSegment.turnNextDirections
	};
}
function getMidSegment(startSegment, endSegment) {
	var startDirection = startSegment.directions.split(":")[1], endDirection = endSegment.directions.split(":")[0];
	if (startSegment.turnNextDirections) startDirection = startDirection == "h" ? "v" : "h";
	if (endSegment.turnNextDirections) endDirection = endDirection == "h" ? "v" : "h";
	var directions = startDirection + ":" + endDirection;
	return {
		waypoints: getBendpoints(startSegment.waypoints[startSegment.waypoints.length - 1], endSegment.waypoints[0], directions),
		directions
	};
}
function invertDirections(directions) {
	return directions.split(":").reverse().join(":");
}
function getSimpleBendpoints(a, b, directions) {
	var xmid = round$1((b.x - a.x) / 2 + a.x), ymid = round$1((b.y - a.y) / 2 + a.y);
	if (directions === "h:v") return [{
		x: b.x,
		y: a.y
	}];
	if (directions === "v:h") return [{
		x: a.x,
		y: b.y
	}];
	if (directions === "h:h") return [{
		x: xmid,
		y: a.y
	}, {
		x: xmid,
		y: b.y
	}];
	if (directions === "v:v") return [{
		x: a.x,
		y: ymid
	}, {
		x: b.x,
		y: ymid
	}];
	throw new Error("invalid directions: can only handle varians of [hv]:[hv]");
}
function getBendpoints(a, b, directions) {
	directions = directions || "h:h";
	if (!isValidDirections(directions)) throw new Error("unknown directions: <" + directions + ">: must be specified as <start>:<end> with start/end in { h,v,t,r,b,l }");
	if (isExplicitDirections(directions)) {
		var startSegment = getStartSegment(a, b, directions), endSegment = getEndSegment(a, b, directions), midSegment = getMidSegment(startSegment, endSegment);
		return [].concat(startSegment.waypoints, midSegment.waypoints, endSegment.waypoints);
	}
	return getSimpleBendpoints(a, b, directions);
}
function connectPoints(a, b, directions) {
	var points = getBendpoints(a, b, directions);
	points.unshift(a);
	points.push(b);
	return withoutRedundantPoints(points);
}
function connectRectangles(source, target, start, end, hints) {
	var preferredLayouts = hints && hints.preferredLayouts || [];
	var preferredLayout = without(preferredLayouts, "straight")[0] || "h:h";
	var threshold = ORIENTATION_THRESHOLD[preferredLayout] || 0;
	var orientation = getOrientation(source, target, threshold);
	var directions = getDirections(orientation, preferredLayout);
	start = start || getMid(source);
	end = end || getMid(target);
	var directionSplit = directions.split(":");
	return connectPoints(getDockingPoint(start, source, directionSplit[0], invertOrientation(orientation)), getDockingPoint(end, target, directionSplit[1], orientation), directions);
}
function repairConnection(source, target, start, end, waypoints, hints) {
	if (isArray(start)) {
		waypoints = start;
		hints = end;
		start = getMid(source);
		end = getMid(target);
	}
	hints = assign$1({ preferredLayouts: [] }, hints);
	waypoints = waypoints || [];
	var repairedWaypoints = hints.preferredLayouts.indexOf("straight") !== -1 && tryLayoutStraight(source, target, start, end, hints);
	if (repairedWaypoints) return repairedWaypoints;
	repairedWaypoints = hints.connectionEnd && tryRepairConnectionEnd(target, source, end, waypoints);
	if (repairedWaypoints) return repairedWaypoints;
	repairedWaypoints = hints.connectionStart && tryRepairConnectionStart(source, target, start, waypoints);
	if (repairedWaypoints) return repairedWaypoints;
	if (!hints.connectionStart && !hints.connectionEnd && waypoints && waypoints.length) return waypoints;
	return connectRectangles(source, target, start, end, hints);
}
function inRange(a, start, end) {
	return a >= start && a <= end;
}
function isInRange(axis, a, b) {
	return inRange(a[axis], b[axis], b[axis] + b[{
		x: "width",
		y: "height"
	}[axis]]);
}
function tryLayoutStraight(source, target, start, end, hints) {
	var axis = {}, primaryAxis, orientation = getOrientation(source, target);
	if (!/^(top|bottom|left|right)$/.test(orientation)) return null;
	if (/top|bottom/.test(orientation)) primaryAxis = "x";
	if (/left|right/.test(orientation)) primaryAxis = "y";
	if (hints.preserveDocking === "target") {
		if (!isInRange(primaryAxis, end, source)) return null;
		axis[primaryAxis] = end[primaryAxis];
		return [{
			x: axis.x !== void 0 ? axis.x : start.x,
			y: axis.y !== void 0 ? axis.y : start.y,
			original: {
				x: axis.x !== void 0 ? axis.x : start.x,
				y: axis.y !== void 0 ? axis.y : start.y
			}
		}, {
			x: end.x,
			y: end.y
		}];
	} else {
		if (!isInRange(primaryAxis, start, target)) return null;
		axis[primaryAxis] = start[primaryAxis];
		return [{
			x: start.x,
			y: start.y
		}, {
			x: axis.x !== void 0 ? axis.x : end.x,
			y: axis.y !== void 0 ? axis.y : end.y,
			original: {
				x: axis.x !== void 0 ? axis.x : end.x,
				y: axis.y !== void 0 ? axis.y : end.y
			}
		}];
	}
}
function tryRepairConnectionStart(moved, other, newDocking, points) {
	return _tryRepairConnectionSide(moved, other, newDocking, points);
}
function tryRepairConnectionEnd(moved, other, newDocking, points) {
	var waypoints = points.slice().reverse();
	waypoints = _tryRepairConnectionSide(moved, other, newDocking, waypoints);
	return waypoints ? waypoints.reverse() : null;
}
function _tryRepairConnectionSide(moved, other, newDocking, points) {
	function needsRelayout(points) {
		if (points.length < 3) return true;
		if (points.length > 4) return false;
		return !!find(points, function(p, idx) {
			var q = points[idx - 1];
			return q && pointDistance(p, q) < 3;
		});
	}
	function repairBendpoint(candidate, oldPeer, newPeer) {
		switch (pointsAligned(oldPeer, candidate)) {
			case "v": return {
				x: newPeer.x,
				y: candidate.y
			};
			case "h": return {
				x: candidate.x,
				y: newPeer.y
			};
		}
		return {
			x: candidate.x,
			y: candidate.y
		};
	}
	function removeOverlapping(points, a, b) {
		var i = points.length - 2;
		for (; i !== 0; i--) if (pointInRect(points[i], a, INTERSECTION_THRESHOLD) || pointInRect(points[i], b, INTERSECTION_THRESHOLD)) return points.slice(i);
		return points;
	}
	if (needsRelayout(points)) return null;
	var oldDocking = points[0], newPoints = points.slice(), slicedPoints;
	newPoints[0] = newDocking;
	newPoints[1] = repairBendpoint(newPoints[1], oldDocking, newDocking);
	slicedPoints = removeOverlapping(newPoints, moved, other);
	if (slicedPoints !== newPoints) newPoints = _tryRepairConnectionSide(moved, other, newDocking, slicedPoints);
	if (newPoints && pointsAligned(newPoints)) return null;
	return newPoints;
}
function getDirections(orientation, defaultLayout) {
	if (isExplicitDirections(defaultLayout)) return defaultLayout;
	switch (orientation) {
		case "intersect": return "t:t";
		case "top":
		case "bottom": return "v:v";
		case "left":
		case "right": return "h:h";
		default: return defaultLayout;
	}
}
function isValidDirections(directions) {
	return directions && /^h|v|t|r|b|l:h|v|t|r|b|l$/.test(directions);
}
function isExplicitDirections(directions) {
	return directions && /t|r|b|l/.test(directions);
}
function invertOrientation(orientation) {
	return {
		"top": "bottom",
		"bottom": "top",
		"left": "right",
		"right": "left",
		"top-left": "bottom-right",
		"bottom-right": "top-left",
		"top-right": "bottom-left",
		"bottom-left": "top-right"
	}[orientation];
}
function getDockingPoint(point, rectangle, dockingDirection, targetOrientation) {
	if (dockingDirection === "h") dockingDirection = /left/.test(targetOrientation) ? "l" : "r";
	if (dockingDirection === "v") dockingDirection = /top/.test(targetOrientation) ? "t" : "b";
	if (dockingDirection === "t") return {
		original: point,
		x: point.x,
		y: rectangle.y
	};
	if (dockingDirection === "r") return {
		original: point,
		x: rectangle.x + rectangle.width,
		y: point.y
	};
	if (dockingDirection === "b") return {
		original: point,
		x: point.x,
		y: rectangle.y + rectangle.height
	};
	if (dockingDirection === "l") return {
		original: point,
		x: rectangle.x,
		y: point.y
	};
	throw new Error("unexpected dockingDirection: <" + dockingDirection + ">");
}
function withoutRedundantPoints(waypoints) {
	return waypoints.reduce(function(points, p, idx) {
		var previous = points[points.length - 1], next = waypoints[idx + 1];
		if (!pointsOnLine(previous, next, p, 0)) points.push(p);
		return points;
	}, []);
}
// ../../node_modules/bpmn-js/lib/features/modeling/BpmnLayouter.js
init_dist();
init_ModelUtil();
var ATTACH_ORIENTATION_PADDING = -10;
var BOUNDARY_TO_HOST_THRESHOLD$1 = 40;
var PREFERRED_LAYOUTS_HORIZONTAL = {
	default: ["h:h"],
	fromGateway: ["v:h"],
	toGateway: ["h:v"],
	loop: {
		fromTop: ["t:r"],
		fromRight: ["r:b"],
		fromLeft: ["l:t"],
		fromBottom: ["b:l"]
	},
	boundaryLoop: {
		alternateHorizontalSide: "b",
		alternateVerticalSide: "l",
		default: "v"
	},
	messageFlow: ["straight", "v:v"],
	subProcess: ["straight", "h:h"],
	isHorizontal: true
};
var PREFERRED_LAYOUTS_VERTICAL = {
	default: ["v:v"],
	fromGateway: ["h:v"],
	toGateway: ["v:h"],
	loop: {
		fromTop: ["t:l"],
		fromRight: ["r:t"],
		fromLeft: ["l:b"],
		fromBottom: ["b:r"]
	},
	boundaryLoop: {
		alternateHorizontalSide: "t",
		alternateVerticalSide: "r",
		default: "h"
	},
	messageFlow: ["straight", "h:h"],
	subProcess: ["straight", "v:v"],
	isHorizontal: false
};
var oppositeOrientationMapping = {
	"top": "bottom",
	"top-right": "bottom-left",
	"top-left": "bottom-right",
	"right": "left",
	"bottom": "top",
	"bottom-right": "top-left",
	"bottom-left": "top-right",
	"left": "right"
};
var orientationDirectionMapping = {
	top: "t",
	right: "r",
	bottom: "b",
	left: "l"
};
function BpmnLayouter(elementRegistry) {
	this._elementRegistry = elementRegistry;
}
e(BpmnLayouter, BaseLayouter);
BpmnLayouter.prototype.layoutConnection = function(connection, hints) {
	if (!hints) hints = {};
	var source = hints.source || connection.source, target = hints.target || connection.target, waypoints = hints.waypoints || connection.waypoints, connectionStart = hints.connectionStart, connectionEnd = hints.connectionEnd, elementRegistry = this._elementRegistry;
	var manhattanOptions, updatedWaypoints;
	if (!connectionStart) connectionStart = getConnectionDocking(waypoints && waypoints[0], source);
	if (!connectionEnd) connectionEnd = getConnectionDocking(waypoints && waypoints[waypoints.length - 1], target);
	if (is(connection, "bpmn:Association") || is(connection, "bpmn:DataAssociation")) {
		if (waypoints && !isCompensationAssociation(source, target)) return [].concat([connectionStart], waypoints.slice(1, -1), [connectionEnd]);
	}
	var layout = isDirectionHorizontal(source, elementRegistry) ? PREFERRED_LAYOUTS_HORIZONTAL : PREFERRED_LAYOUTS_VERTICAL;
	if (is(connection, "bpmn:MessageFlow")) manhattanOptions = getMessageFlowManhattanOptions(source, target, layout);
	else if (is(connection, "bpmn:SequenceFlow") || isCompensationAssociation(source, target)) {
		if (source === target) manhattanOptions = { preferredLayouts: getLoopPreferredLayout(source, connection, layout) };
		else if (is(source, "bpmn:BoundaryEvent")) manhattanOptions = { preferredLayouts: getBoundaryEventPreferredLayouts(source, target, connectionEnd, layout) };
		else if (isExpandedSubProcess$1(source) || isExpandedSubProcess$1(target)) manhattanOptions = {
			preferredLayouts: layout.subProcess,
			preserveDocking: getSubProcessPreserveDocking(source)
		};
		else if (is(source, "bpmn:Gateway")) manhattanOptions = { preferredLayouts: layout.fromGateway };
		else if (is(target, "bpmn:Gateway")) manhattanOptions = { preferredLayouts: layout.toGateway };
		else manhattanOptions = { preferredLayouts: layout.default };
	}
	if (manhattanOptions) {
		manhattanOptions = assign$1(manhattanOptions, hints);
		updatedWaypoints = withoutRedundantPoints(repairConnection(source, target, connectionStart, connectionEnd, waypoints, manhattanOptions));
	}
	return updatedWaypoints || [connectionStart, connectionEnd];
};
function getAttachOrientation(attachedElement) {
	var hostElement = attachedElement.host;
	return getOrientation(getMid(attachedElement), hostElement, ATTACH_ORIENTATION_PADDING);
}
function getMessageFlowManhattanOptions(source, target, layout) {
	return {
		preferredLayouts: layout.messageFlow,
		preserveDocking: getMessageFlowPreserveDocking(source, target)
	};
}
function getMessageFlowPreserveDocking(source, target) {
	if (is(target, "bpmn:Participant")) return "source";
	if (is(source, "bpmn:Participant")) return "target";
	if (isExpandedSubProcess$1(target)) return "source";
	if (isExpandedSubProcess$1(source)) return "target";
	if (is(target, "bpmn:Event")) return "target";
	if (is(source, "bpmn:Event")) return "source";
	return null;
}
function getSubProcessPreserveDocking(source) {
	return isExpandedSubProcess$1(source) ? "target" : "source";
}
function getConnectionDocking(point, shape) {
	return point ? point.original || point : getMid(shape);
}
function isCompensationAssociation(source, target) {
	return is(target, "bpmn:Activity") && is(source, "bpmn:BoundaryEvent") && target.businessObject.isForCompensation;
}
function isExpandedSubProcess$1(element) {
	return is(element, "bpmn:SubProcess") && isExpanded(element);
}
function isSame(a, b) {
	return a === b;
}
function isAnyOrientation(orientation, orientations) {
	return orientations.indexOf(orientation) !== -1;
}
function getHorizontalOrientation(orientation) {
	var matches = /right|left/.exec(orientation);
	return matches && matches[0];
}
function getVerticalOrientation(orientation) {
	var matches = /top|bottom/.exec(orientation);
	return matches && matches[0];
}
function isOppositeOrientation(a, b) {
	return oppositeOrientationMapping[a] === b;
}
function isOppositeHorizontalOrientation(a, b) {
	var oppositeHorizontalOrientation = oppositeOrientationMapping[getHorizontalOrientation(a)];
	return b.indexOf(oppositeHorizontalOrientation) !== -1;
}
function isOppositeVerticalOrientation(a, b) {
	var oppositeVerticalOrientation = oppositeOrientationMapping[getVerticalOrientation(a)];
	return b.indexOf(oppositeVerticalOrientation) !== -1;
}
function isHorizontalOrientation(orientation) {
	return orientation === "right" || orientation === "left";
}
function getLoopPreferredLayout(source, connection, layout) {
	var waypoints = connection.waypoints;
	var orientation = waypoints && waypoints.length && getOrientation(waypoints[0], source);
	if (orientation === "top") return layout.loop.fromTop;
	else if (orientation === "right") return layout.loop.fromRight;
	else if (orientation === "left") return layout.loop.fromLeft;
	return layout.loop.fromBottom;
}
function getBoundaryEventPreferredLayouts(source, target, end, layout) {
	var sourceMid = getMid(source), targetMid = getMid(target), attachOrientation = getAttachOrientation(source), sourceLayout, targetLayout;
	var isLoop = isSame(source.host, target);
	var attachedToSide = isAnyOrientation(attachOrientation, [
		"top",
		"right",
		"bottom",
		"left"
	]);
	var targetOrientation = getOrientation(targetMid, sourceMid, {
		x: source.width / 2 + target.width / 2,
		y: source.height / 2 + target.height / 2
	});
	if (isLoop) return getBoundaryEventLoopLayout(attachOrientation, attachedToSide, source, target, end, layout);
	sourceLayout = getBoundaryEventSourceLayout(attachOrientation, targetOrientation, attachedToSide, layout.isHorizontal);
	targetLayout = getBoundaryEventTargetLayout(attachOrientation, targetOrientation, attachedToSide, layout.isHorizontal);
	return [sourceLayout + ":" + targetLayout];
}
function getBoundaryEventLoopLayout(attachOrientation, attachedToSide, source, target, end, layout) {
	var sourceLayout = orientationDirectionMapping[attachedToSide ? attachOrientation : layout.isHorizontal ? getVerticalOrientation(attachOrientation) : getHorizontalOrientation(attachOrientation)], targetLayout;
	if (attachedToSide) {
		if (isHorizontalOrientation(attachOrientation)) targetLayout = shouldConnectToSameSide("y", source, target, end) ? "h" : layout.boundaryLoop.alternateHorizontalSide;
		else targetLayout = shouldConnectToSameSide("x", source, target, end) ? "v" : layout.boundaryLoop.alternateVerticalSide;
	} else targetLayout = layout.boundaryLoop.default;
	return [sourceLayout + ":" + targetLayout];
}
function shouldConnectToSameSide(axis, source, target, end) {
	var threshold = BOUNDARY_TO_HOST_THRESHOLD$1;
	return !(areCloseOnAxis(axis, end, target, threshold) || areCloseOnAxis(axis, end, {
		x: target.x + target.width,
		y: target.y + target.height
	}, threshold) || areCloseOnAxis(axis, end, getMid(source), threshold));
}
function areCloseOnAxis(axis, a, b, threshold) {
	return Math.abs(a[axis] - b[axis]) < threshold;
}
function getBoundaryEventSourceLayout(attachOrientation, targetOrientation, attachedToSide, isHorizontal) {
	if (attachedToSide) return orientationDirectionMapping[attachOrientation];
	var verticalAttachOrientation = getVerticalOrientation(attachOrientation), horizontalAttachOrientation = getHorizontalOrientation(attachOrientation), verticalTargetOrientation = getVerticalOrientation(targetOrientation), horizontalTargetOrientation = getHorizontalOrientation(targetOrientation);
	if (isHorizontal) {
		if (isSame(verticalAttachOrientation, verticalTargetOrientation) || isOppositeOrientation(horizontalAttachOrientation, horizontalTargetOrientation)) return orientationDirectionMapping[verticalAttachOrientation];
	} else if (isSame(horizontalAttachOrientation, horizontalTargetOrientation) || isOppositeOrientation(verticalAttachOrientation, verticalTargetOrientation)) return orientationDirectionMapping[horizontalAttachOrientation];
	return orientationDirectionMapping[isHorizontal ? horizontalAttachOrientation : verticalAttachOrientation];
}
function getBoundaryEventTargetLayout(attachOrientation, targetOrientation, attachedToSide, isHorizontal) {
	if (attachedToSide) {
		if (isHorizontalOrientation(attachOrientation)) {
			if (isOppositeHorizontalOrientation(attachOrientation, targetOrientation) || isSame(attachOrientation, targetOrientation)) return "h";
			return "v";
		} else {
			if (isOppositeVerticalOrientation(attachOrientation, targetOrientation) || isSame(attachOrientation, targetOrientation)) return "v";
			return "h";
		}
	}
	var verticalAttachOrientation = getVerticalOrientation(attachOrientation), horizontalAttachOrientation = getHorizontalOrientation(attachOrientation), verticalTargetOrientation = getVerticalOrientation(targetOrientation), horizontalTargetOrientation = getHorizontalOrientation(targetOrientation);
	if (verticalTargetOrientation && !horizontalTargetOrientation) return "v";
	if (horizontalTargetOrientation && !verticalTargetOrientation) return "h";
	if (isHorizontal) {
		if (isSame(verticalAttachOrientation, verticalTargetOrientation)) return "h";
		else return "v";
	} else if (isSame(horizontalAttachOrientation, horizontalTargetOrientation)) return "v";
	else return "h";
}
BpmnLayouter.$inject = ["elementRegistry"];
// ../../node_modules/bpmn-js/lib/features/modeling/index.js
var modeling_default = {
	__init__: ["modeling", "bpmnUpdater"],
	__depends__: [
		behavior_default$1,
		rules_default,
		di_ordering_default,
		ordering_default,
		replace_default,
		command_default,
		label_support_default,
		attach_support_default,
		selection_default,
		change_support_default,
		space_tool_default
	],
	bpmnFactory: ["type", BpmnFactory],
	bpmnUpdater: ["type", BpmnUpdater],
	elementFactory: ["type", ElementFactory],
	modeling: ["type", Modeling],
	layouter: ["type", BpmnLayouter],
	connectionDocking: ["type", CroppingConnectionDocking]
};
// ../../node_modules/bpmn-js/lib/features/append-preview/AppendPreview.js
init_dist();
var round = Math.round;
function AppendPreview(complexPreview, connectionDocking, elementFactory, eventBus, layouter, rules) {
	this._complexPreview = complexPreview;
	this._connectionDocking = connectionDocking;
	this._elementFactory = elementFactory;
	this._eventBus = eventBus;
	this._layouter = layouter;
	this._rules = rules;
}
AppendPreview.prototype.create = function(source, type, options) {
	const complexPreview = this._complexPreview, connectionDocking = this._connectionDocking, elementFactory = this._elementFactory, eventBus = this._eventBus, layouter = this._layouter, rules = this._rules;
	const shape = elementFactory.createShape(assign$1({ type }, options));
	const position = eventBus.fire("autoPlace", {
		source,
		shape
	});
	if (!position) return;
	assign$1(shape, {
		x: position.x - round(shape.width / 2),
		y: position.y - round(shape.height / 2)
	});
	const connectionCreateAllowed = rules.allowed("connection.create", {
		source,
		target: shape,
		hints: { targetParent: source.parent }
	});
	let connection = null;
	if (connectionCreateAllowed) {
		connection = elementFactory.createConnection(connectionCreateAllowed);
		connection.waypoints = layouter.layoutConnection(connection, {
			source,
			target: shape
		});
		connection.waypoints = connectionDocking.getCroppedWaypoints(connection, source, shape);
	}
	complexPreview.create({ created: [shape, connection].filter((element) => !isNil(element)) });
};
AppendPreview.prototype.cleanUp = function() {
	this._complexPreview.cleanUp();
};
AppendPreview.$inject = [
	"complexPreview",
	"connectionDocking",
	"elementFactory",
	"eventBus",
	"layouter",
	"rules"
];
// ../../node_modules/bpmn-js/lib/features/append-preview/index.js
var append_preview_default = {
	__depends__: [
		auto_place_default,
		complex_preview_default,
		modeling_default
	],
	__init__: ["appendPreview"],
	appendPreview: ["type", AppendPreview]
};
// ../../node_modules/bpmn-js/lib/features/popup-menu/util/TypeUtil.js
init_ModelUtil();
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
// ../../node_modules/bpmn-js/lib/features/popup-menu/PopupEntries.js
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
// ../../node_modules/bpmn-js/lib/features/replace/ReplaceOptions.js
var ReplaceOptions_exports = __exportAll({
	AD_HOC_SUBPROCESS_EXPANDED: () => AD_HOC_SUBPROCESS_EXPANDED,
	BOUNDARY_EVENT: () => BOUNDARY_EVENT,
	DATA_OBJECT_REFERENCE: () => DATA_OBJECT_REFERENCE,
	DATA_STORE_REFERENCE: () => DATA_STORE_REFERENCE,
	END_EVENT: () => END_EVENT,
	EVENT_SUB_PROCESS: () => EVENT_SUB_PROCESS,
	EVENT_SUB_PROCESS_START_EVENT: () => EVENT_SUB_PROCESS_START_EVENT,
	GATEWAY: () => GATEWAY,
	INTERMEDIATE_EVENT: () => INTERMEDIATE_EVENT,
	PARTICIPANT: () => PARTICIPANT,
	SEQUENCE_FLOW: () => SEQUENCE_FLOW,
	START_EVENT: () => START_EVENT,
	START_EVENT_SUB_PROCESS: () => START_EVENT_SUB_PROCESS,
	SUBPROCESS_EXPANDED: () => SUBPROCESS_EXPANDED,
	TASK: () => TASK,
	TRANSACTION: () => TRANSACTION,
	TYPED_EVENT: () => TYPED_EVENT
});
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
var GATEWAY = [
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
var TASK = [
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
var PARTICIPANT = [replaceWith("expanded-pool"), replaceWith("collapsed-pool", { label: function(element) {
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
// ../../node_modules/bpmn-js/lib/features/popup-menu/util/Icons.js
var Icons_default = {
	"start-event-non-interrupting": `
  <svg viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0 995.64)">
      <path d="m1899 28.357c21.545 567.43-598.38 1023.5-1133.6 835.92-548.09-147.21-801.57-873.95-463.59-1330 302.62-480.3 1071.7-507.54 1407.6-49.847 122.14 153.12 190.07 348.07 189.59 543.91z" fill="none" stroke="currentColor" stroke-dasharray="418.310422, 361.2328165" stroke-linecap="round" stroke-width="100"/>
    </g>
  </svg>`,
	"intermediate-event-non-interrupting": `
  <svg viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
     <g transform="translate(0 995.64)" fill="none" stroke="currentColor" stroke-linecap="round">
        <circle cx="1024" cy="28.357" r="875" stroke-dasharray="418.310422, 361.2328165" stroke-width="100"/>
        <circle cx="1024" cy="28.357" r="685" stroke-dasharray="348.31044857,261.23283643" stroke-dashoffset="500" stroke-width="100"/>
     </g>
  </svg>`
};
// ../../node_modules/bpmn-js/lib/features/popup-menu/ReplaceMenuProvider.js
init_ModelUtil();
init_dist();
function ReplaceMenuProvider(bpmnFactory, popupMenu, modeling, moddle, bpmnReplace, rules, translate, moddleCopy) {
	this._bpmnFactory = bpmnFactory;
	this._popupMenu = popupMenu;
	this._modeling = modeling;
	this._moddle = moddle;
	this._bpmnReplace = bpmnReplace;
	this._rules = rules;
	this._translate = translate;
	this._moddleCopy = moddleCopy;
	this._register();
}
ReplaceMenuProvider.$inject = [
	"bpmnFactory",
	"popupMenu",
	"modeling",
	"moddle",
	"bpmnReplace",
	"rules",
	"translate",
	"moddleCopy"
];
ReplaceMenuProvider.prototype._register = function() {
	this._popupMenu.registerProvider("bpmn-replace", this);
};
ReplaceMenuProvider.prototype.getPopupMenuEntries = function(target) {
	var businessObject = target.businessObject;
	var rules = this._rules;
	var sameTypeEventOptions = [], eventDefinitionType;
	var filteredReplaceOptions = [];
	if (isArray(target) || !rules.allowed("shape.replace", { element: target })) return {};
	var differentType = isDifferentType(target);
	if (is(businessObject, "bpmn:DataObjectReference")) return this._createEntries(target, DATA_OBJECT_REFERENCE);
	if (is(businessObject, "bpmn:DataStoreReference") && !is(target.parent, "bpmn:Collaboration")) return this._createEntries(target, DATA_STORE_REFERENCE);
	if (is(businessObject, "bpmn:Event") && !is(businessObject, "bpmn:BoundaryEvent")) {
		eventDefinitionType = businessObject.get("eventDefinitions")[0]?.$type;
		sameTypeEventOptions = TYPED_EVENT[eventDefinitionType] || [];
		if (!isEventSubProcess(businessObject.$parent) && is(businessObject.$parent, "bpmn:SubProcess")) sameTypeEventOptions = filter(sameTypeEventOptions, function(option) {
			return option.target.type !== "bpmn:StartEvent";
		});
	}
	if (is(businessObject, "bpmn:StartEvent") && !is(businessObject.$parent, "bpmn:SubProcess")) {
		filteredReplaceOptions = filter(START_EVENT.concat(sameTypeEventOptions), differentType);
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (is(businessObject, "bpmn:Participant")) {
		filteredReplaceOptions = filter(PARTICIPANT, function(replaceOption) {
			return isExpanded(target) !== replaceOption.target.isExpanded;
		});
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (is(businessObject, "bpmn:StartEvent") && isEventSubProcess(businessObject.$parent)) {
		filteredReplaceOptions = filter(EVENT_SUB_PROCESS_START_EVENT.concat(sameTypeEventOptions), function(replaceOption) {
			var isInterrupting = replaceOption.target.isInterrupting !== false;
			var isInterruptingEqual = businessObject.isInterrupting === isInterrupting;
			return differentType(replaceOption) || !differentType(replaceOption) && !isInterruptingEqual;
		});
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (is(businessObject, "bpmn:StartEvent") && !isEventSubProcess(businessObject.$parent) && is(businessObject.$parent, "bpmn:SubProcess")) {
		filteredReplaceOptions = filter(START_EVENT_SUB_PROCESS.concat(sameTypeEventOptions), differentType);
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (is(businessObject, "bpmn:EndEvent")) {
		filteredReplaceOptions = filter(END_EVENT.concat(sameTypeEventOptions), function(replaceOption) {
			if (replaceOption.target.eventDefinitionType == "bpmn:CancelEventDefinition" && !is(businessObject.$parent, "bpmn:Transaction")) return false;
			return differentType(replaceOption);
		});
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (is(businessObject, "bpmn:BoundaryEvent")) {
		filteredReplaceOptions = filter(BOUNDARY_EVENT, function(replaceOption) {
			var target = replaceOption.target;
			if (target.eventDefinitionType == "bpmn:CancelEventDefinition" && !is(businessObject.attachedToRef, "bpmn:Transaction")) return false;
			var cancelActivity = target.cancelActivity !== false;
			var isCancelActivityEqual = businessObject.cancelActivity == cancelActivity;
			return differentType(replaceOption) || !differentType(replaceOption) && !isCancelActivityEqual;
		});
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (is(businessObject, "bpmn:IntermediateCatchEvent") || is(businessObject, "bpmn:IntermediateThrowEvent")) {
		filteredReplaceOptions = filter(INTERMEDIATE_EVENT.concat(sameTypeEventOptions), differentType);
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (is(businessObject, "bpmn:Gateway")) {
		filteredReplaceOptions = filter(GATEWAY, differentType);
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (is(businessObject, "bpmn:Transaction")) {
		filteredReplaceOptions = filter(TRANSACTION, differentType);
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (isEventSubProcess(businessObject) && isExpanded(target)) {
		filteredReplaceOptions = filter(EVENT_SUB_PROCESS, differentType);
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (is(businessObject, "bpmn:AdHocSubProcess") && isExpanded(target)) {
		filteredReplaceOptions = filter(AD_HOC_SUBPROCESS_EXPANDED, differentType);
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (is(businessObject, "bpmn:SubProcess") && isExpanded(target)) {
		filteredReplaceOptions = filter(SUBPROCESS_EXPANDED, differentType);
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (is(businessObject, "bpmn:SubProcess") && !isExpanded(target)) {
		filteredReplaceOptions = filter(TASK, function(replaceOption) {
			return replaceOption.target.type === target.type === (replaceOption.target.isExpanded === true);
		});
		return this._createEntries(target, filteredReplaceOptions);
	}
	if (is(businessObject, "bpmn:SequenceFlow")) return this._createSequenceFlowEntries(target, SEQUENCE_FLOW);
	if (is(businessObject, "bpmn:FlowNode")) {
		filteredReplaceOptions = filter(TASK, differentType);
		return this._createEntries(target, filteredReplaceOptions);
	}
	return {};
};
ReplaceMenuProvider.prototype.getPopupMenuHeaderEntries = function(target) {
	var headerEntries = {};
	if (is(target, "bpmn:Activity") && !isEventSubProcess(target)) headerEntries = {
		...headerEntries,
		...this._getLoopCharacteristicsHeaderEntries(target)
	};
	if (is(target, "bpmn:DataObjectReference")) headerEntries = {
		...headerEntries,
		...this._getCollectionHeaderEntries(target)
	};
	if (is(target, "bpmn:Participant")) headerEntries = {
		...headerEntries,
		...this._getParticipantMultiplicityHeaderEntries(target)
	};
	if (canBeNonInterrupting(target)) headerEntries = {
		...headerEntries,
		...this._getNonInterruptingHeaderEntries(target)
	};
	return headerEntries;
};
ReplaceMenuProvider.prototype._createEntries = function(target, replaceOptions) {
	var entries = {};
	var self = this;
	forEach(replaceOptions, function(replaceOption) {
		entries[replaceOption.actionName] = self._createEntry(replaceOption, target);
	});
	return entries;
};
ReplaceMenuProvider.prototype._createSequenceFlowEntries = function(target, replaceOptions) {
	var businessObject = getBusinessObject(target);
	var entries = {};
	var modeling = this._modeling, moddle = this._moddle;
	var self = this;
	forEach(replaceOptions, function(replaceOption) {
		switch (replaceOption.actionName) {
			case "replace-with-default-flow":
				if (businessObject.sourceRef.default !== businessObject && (is(businessObject.sourceRef, "bpmn:ExclusiveGateway") || is(businessObject.sourceRef, "bpmn:InclusiveGateway") || is(businessObject.sourceRef, "bpmn:ComplexGateway") || is(businessObject.sourceRef, "bpmn:Activity"))) entries = {
					...entries,
					[replaceOption.actionName]: self._createEntry(replaceOption, target, function() {
						modeling.updateProperties(target.source, { default: businessObject });
					})
				};
				break;
			case "replace-with-conditional-flow":
				if (!businessObject.conditionExpression && is(businessObject.sourceRef, "bpmn:Activity")) entries = {
					...entries,
					[replaceOption.actionName]: self._createEntry(replaceOption, target, function() {
						var conditionExpression = moddle.create("bpmn:FormalExpression", { body: "" });
						modeling.updateProperties(target, { conditionExpression });
					})
				};
				break;
			default:
				if (is(businessObject.sourceRef, "bpmn:Activity") && businessObject.conditionExpression) entries = {
					...entries,
					[replaceOption.actionName]: self._createEntry(replaceOption, target, function() {
						modeling.updateProperties(target, { conditionExpression: void 0 });
					})
				};
				if ((is(businessObject.sourceRef, "bpmn:ExclusiveGateway") || is(businessObject.sourceRef, "bpmn:InclusiveGateway") || is(businessObject.sourceRef, "bpmn:ComplexGateway") || is(businessObject.sourceRef, "bpmn:Activity")) && businessObject.sourceRef.default === businessObject) entries = {
					...entries,
					[replaceOption.actionName]: self._createEntry(replaceOption, target, function() {
						modeling.updateProperties(target.source, { default: void 0 });
					})
				};
		}
	});
	return entries;
};
ReplaceMenuProvider.prototype._createEntry = function(replaceOption, target, action) {
	var translate = this._translate;
	var replaceElement = this._bpmnReplace.replaceElement;
	var replaceAction = function() {
		return replaceElement(target, replaceOption.target);
	};
	var label = replaceOption.label;
	if (label && typeof label === "function") label = label(target);
	action = action || replaceAction;
	return {
		label: translate(label),
		className: replaceOption.className,
		action
	};
};
ReplaceMenuProvider.prototype._getLoopCharacteristicsHeaderEntries = function(target) {
	var self = this;
	var translate = this._translate;
	function toggleLoopCharacteristics(event, entry) {
		if (entry.active) {
			self._modeling.updateProperties(target, { loopCharacteristics: void 0 });
			return;
		}
		var loopCharacteristics = target.businessObject.get("loopCharacteristics");
		if (loopCharacteristics && is(loopCharacteristics, entry.options.loopCharacteristics)) self._modeling.updateModdleProperties(target, loopCharacteristics, { isSequential: entry.options.isSequential });
		else {
			loopCharacteristics = self._moddle.create(entry.options.loopCharacteristics, { isSequential: entry.options.isSequential });
			self._modeling.updateProperties(target, { loopCharacteristics });
		}
	}
	var loopCharacteristics = getBusinessObject(target).loopCharacteristics;
	var isSequential, isLoop, isParallel;
	if (loopCharacteristics) {
		isSequential = loopCharacteristics.isSequential;
		isLoop = loopCharacteristics.isSequential === void 0;
		isParallel = loopCharacteristics.isSequential !== void 0 && !loopCharacteristics.isSequential;
	}
	return {
		"toggle-parallel-mi": {
			className: "bpmn-icon-parallel-mi-marker",
			title: translate("Parallel multi-instance"),
			active: isParallel,
			action: toggleLoopCharacteristics,
			options: {
				loopCharacteristics: "bpmn:MultiInstanceLoopCharacteristics",
				isSequential: false
			}
		},
		"toggle-sequential-mi": {
			className: "bpmn-icon-sequential-mi-marker",
			title: translate("Sequential multi-instance"),
			active: isSequential,
			action: toggleLoopCharacteristics,
			options: {
				loopCharacteristics: "bpmn:MultiInstanceLoopCharacteristics",
				isSequential: true
			}
		},
		"toggle-loop": {
			className: "bpmn-icon-loop-marker",
			title: translate("Loop"),
			active: isLoop,
			action: toggleLoopCharacteristics,
			options: { loopCharacteristics: "bpmn:StandardLoopCharacteristics" }
		}
	};
};
ReplaceMenuProvider.prototype._getCollectionHeaderEntries = function(target) {
	var self = this;
	var translate = this._translate;
	var dataObject = target.businessObject.dataObjectRef;
	if (!dataObject) return {};
	function toggleIsCollection(event, entry) {
		self._modeling.updateModdleProperties(target, dataObject, { isCollection: !entry.active });
	}
	var isCollection = dataObject.isCollection;
	return { "toggle-is-collection": {
		className: "bpmn-icon-parallel-mi-marker",
		title: translate("Collection"),
		active: isCollection,
		action: toggleIsCollection
	} };
};
ReplaceMenuProvider.prototype._getParticipantMultiplicityHeaderEntries = function(target) {
	var self = this;
	var bpmnFactory = this._bpmnFactory;
	var translate = this._translate;
	function toggleParticipantMultiplicity(event, entry) {
		var isActive = entry.active;
		var participantMultiplicity;
		if (!isActive) participantMultiplicity = bpmnFactory.create("bpmn:ParticipantMultiplicity");
		self._modeling.updateProperties(target, { participantMultiplicity });
	}
	var participantMultiplicity = target.businessObject.participantMultiplicity;
	return { "toggle-participant-multiplicity": {
		className: "bpmn-icon-parallel-mi-marker",
		title: translate("Participant multiplicity"),
		active: !!participantMultiplicity,
		action: toggleParticipantMultiplicity
	} };
};
ReplaceMenuProvider.prototype._getNonInterruptingHeaderEntries = function(element) {
	const translate = this._translate;
	const businessObject = getBusinessObject(element);
	const self = this;
	const interruptingProperty = getInterruptingProperty(element);
	const icon = is(element, "bpmn:BoundaryEvent") ? Icons_default["intermediate-event-non-interrupting"] : Icons_default["start-event-non-interrupting"];
	const isNonInterrupting = !businessObject[interruptingProperty];
	return { "toggle-non-interrupting": {
		imageHtml: icon,
		title: translate("Toggle non-interrupting"),
		active: isNonInterrupting,
		action: function() {
			self._modeling.updateProperties(element, { [interruptingProperty]: !!isNonInterrupting });
		}
	} };
};
// ../../node_modules/bpmn-js/lib/features/popup-menu/index.js
var popup_menu_default = {
	__depends__: [
		popup_menu_default$1,
		replace_default,
		auto_place_default
	],
	__init__: ["replaceMenuProvider"],
	replaceMenuProvider: ["type", ReplaceMenuProvider]
};
// ../../node_modules/bpmn-js/lib/features/context-pad/ContextPadProvider.js
init_dist();
init_ModelUtil();
function ContextPadProvider(config, injector, eventBus, contextPad, modeling, elementFactory, connect, create, popupMenu, canvas, rules, translate, appendPreview) {
	config = config || {};
	contextPad.registerProvider(this);
	this._contextPad = contextPad;
	this._modeling = modeling;
	this._elementFactory = elementFactory;
	this._connect = connect;
	this._create = create;
	this._popupMenu = popupMenu;
	this._canvas = canvas;
	this._rules = rules;
	this._translate = translate;
	this._eventBus = eventBus;
	this._appendPreview = appendPreview;
	if (config.autoPlace !== false) this._autoPlace = injector.get("autoPlace", false);
	eventBus.on("create.end", 250, function(event) {
		var shape = event.context.shape;
		if (!hasPrimaryModifier(event) || !contextPad.isOpen(shape)) return;
		var entries = contextPad.getEntries(shape);
		if (entries.replace) entries.replace.action.click(event, shape);
	});
	eventBus.on("contextPad.close", function() {
		appendPreview.cleanUp();
	});
}
ContextPadProvider.$inject = [
	"config.contextPad",
	"injector",
	"eventBus",
	"contextPad",
	"modeling",
	"elementFactory",
	"connect",
	"create",
	"popupMenu",
	"canvas",
	"rules",
	"translate",
	"appendPreview"
];
ContextPadProvider.prototype.getMultiElementContextPadEntries = function(elements) {
	var modeling = this._modeling;
	var actions = {};
	if (this._isDeleteAllowed(elements)) assign$1(actions, { "delete": {
		group: "edit",
		className: "bpmn-icon-trash",
		title: this._translate("Delete"),
		action: { click: function(event, elements) {
			modeling.removeElements(elements.slice());
		} }
	} });
	return actions;
};
ContextPadProvider.prototype._isDeleteAllowed = function(elements) {
	var baseAllowed = this._rules.allowed("elements.delete", { elements });
	if (isArray(baseAllowed)) return every(elements, (el) => baseAllowed.includes(el));
	return baseAllowed;
};
ContextPadProvider.prototype.getContextPadEntries = function(element) {
	var contextPad = this._contextPad, modeling = this._modeling, elementFactory = this._elementFactory, connect = this._connect, create = this._create, popupMenu = this._popupMenu, autoPlace = this._autoPlace, translate = this._translate, appendPreview = this._appendPreview;
	var actions = {};
	if (element.type === "label") {
		if (this._isDeleteAllowed([element])) assign$1(actions, deleteAction());
		return actions;
	}
	var businessObject = element.businessObject;
	function startConnect(event, element) {
		connect.start(event, element);
	}
	function removeElement(e, element) {
		modeling.removeElements([element]);
	}
	function deleteAction() {
		return { "delete": {
			group: "edit",
			className: "bpmn-icon-trash",
			title: translate("Delete"),
			action: { click: removeElement }
		} };
	}
	function getReplaceMenuPosition(element) {
		var Y_OFFSET = 5;
		var padRect = contextPad.getPad(element).html.getBoundingClientRect();
		return {
			x: padRect.left,
			y: padRect.bottom + Y_OFFSET
		};
	}
	function appendAction(type, className, title, options) {
		function appendStart(event, element) {
			var shape = elementFactory.createShape(assign$1({ type }, options));
			create.start(event, shape, { source: element });
		}
		return {
			group: "model",
			className,
			title,
			action: {
				dragstart: appendStart,
				click: autoPlace ? function(_, element) {
					var shape = elementFactory.createShape(assign$1({ type }, options));
					autoPlace.append(element, shape);
				} : appendStart,
				hover: autoPlace ? function(_, element) {
					appendPreview.create(element, type, options);
					return () => {
						appendPreview.cleanUp();
					};
				} : null
			}
		};
	}
	function splitLaneHandler(count) {
		return function(_, element) {
			modeling.splitLane(element, count);
			contextPad.open(element, true);
		};
	}
	if (isAny(businessObject, ["bpmn:Lane", "bpmn:Participant"]) && isExpanded(element)) {
		var childLanes = getChildLanes(element);
		assign$1(actions, { "lane-insert-above": {
			group: "lane-insert-above",
			className: "bpmn-icon-lane-insert-above",
			title: translate("Add lane above"),
			action: { click: function(event, element) {
				modeling.addLane(element, "top");
			} }
		} });
		if (childLanes.length < 2) {
			if (isHorizontal$1(element) ? element.height >= 120 : element.width >= 120) assign$1(actions, { "lane-divide-two": {
				group: "lane-divide",
				className: "bpmn-icon-lane-divide-two",
				title: translate("Divide into two lanes"),
				action: { click: splitLaneHandler(2) }
			} });
			if (isHorizontal$1(element) ? element.height >= 180 : element.width >= 180) assign$1(actions, { "lane-divide-three": {
				group: "lane-divide",
				className: "bpmn-icon-lane-divide-three",
				title: translate("Divide into three lanes"),
				action: { click: splitLaneHandler(3) }
			} });
		}
		assign$1(actions, { "lane-insert-below": {
			group: "lane-insert-below",
			className: "bpmn-icon-lane-insert-below",
			title: translate("Add lane below"),
			action: { click: function(event, element) {
				modeling.addLane(element, "bottom");
			} }
		} });
	}
	if (is(businessObject, "bpmn:FlowNode")) {
		if (is(businessObject, "bpmn:EventBasedGateway")) assign$1(actions, {
			"append.receive-task": appendAction("bpmn:ReceiveTask", "bpmn-icon-receive-task", translate("Append receive task")),
			"append.message-intermediate-event": appendAction("bpmn:IntermediateCatchEvent", "bpmn-icon-intermediate-event-catch-message", translate("Append message intermediate catch event"), { eventDefinitionType: "bpmn:MessageEventDefinition" }),
			"append.timer-intermediate-event": appendAction("bpmn:IntermediateCatchEvent", "bpmn-icon-intermediate-event-catch-timer", translate("Append timer intermediate catch event"), { eventDefinitionType: "bpmn:TimerEventDefinition" }),
			"append.condition-intermediate-event": appendAction("bpmn:IntermediateCatchEvent", "bpmn-icon-intermediate-event-catch-condition", translate("Append conditional intermediate catch event"), { eventDefinitionType: "bpmn:ConditionalEventDefinition" }),
			"append.signal-intermediate-event": appendAction("bpmn:IntermediateCatchEvent", "bpmn-icon-intermediate-event-catch-signal", translate("Append signal intermediate catch event"), { eventDefinitionType: "bpmn:SignalEventDefinition" })
		});
		else if (isEventType(businessObject, "bpmn:BoundaryEvent", "bpmn:CompensateEventDefinition")) assign$1(actions, { "append.compensation-activity": appendAction("bpmn:Task", "bpmn-icon-task", translate("Append compensation activity"), { isForCompensation: true }) });
		else if (!is(businessObject, "bpmn:EndEvent") && !businessObject.isForCompensation && !isEventType(businessObject, "bpmn:IntermediateThrowEvent", "bpmn:LinkEventDefinition") && !isEventSubProcess(businessObject)) assign$1(actions, {
			"append.end-event": appendAction("bpmn:EndEvent", "bpmn-icon-end-event-none", translate("Append end event")),
			"append.gateway": appendAction("bpmn:ExclusiveGateway", "bpmn-icon-gateway-none", translate("Append gateway")),
			"append.append-task": appendAction("bpmn:Task", "bpmn-icon-task", translate("Append task")),
			"append.intermediate-event": appendAction("bpmn:IntermediateThrowEvent", "bpmn-icon-intermediate-event-none", translate("Append intermediate/boundary event"))
		});
	}
	if (!popupMenu.isEmpty(element, "bpmn-replace")) assign$1(actions, { "replace": {
		group: "edit",
		className: "bpmn-icon-screw-wrench",
		title: translate("Change element"),
		action: { click: function(event, element) {
			var position = assign$1(getReplaceMenuPosition(element), { cursor: {
				x: event.x,
				y: event.y
			} });
			popupMenu.open(element, "bpmn-replace", position, {
				title: translate("Change element"),
				width: "var(--bpmn-replace-popup-width, 300px)",
				search: true
			});
		} }
	} });
	if (is(businessObject, "bpmn:SequenceFlow")) assign$1(actions, { "append.text-annotation": appendAction("bpmn:TextAnnotation", "bpmn-icon-text-annotation", translate("Add text annotation")) });
	if (is(businessObject, "bpmn:MessageFlow")) assign$1(actions, { "append.text-annotation": appendAction("bpmn:TextAnnotation", "bpmn-icon-text-annotation", translate("Add text annotation")) });
	if (isAny(businessObject, [
		"bpmn:FlowNode",
		"bpmn:InteractionNode",
		"bpmn:DataObjectReference",
		"bpmn:DataStoreReference"
	])) assign$1(actions, {
		"append.text-annotation": appendAction("bpmn:TextAnnotation", "bpmn-icon-text-annotation", translate("Add text annotation")),
		"connect": {
			group: "connect",
			className: "bpmn-icon-connection-multi",
			title: translate("Connect to other element"),
			action: {
				click: startConnect,
				dragstart: startConnect
			}
		}
	});
	if (is(businessObject, "bpmn:TextAnnotation")) assign$1(actions, { "connect": {
		group: "connect",
		className: "bpmn-icon-connection-multi",
		title: translate("Connect using association"),
		action: {
			click: startConnect,
			dragstart: startConnect
		}
	} });
	if (isAny(businessObject, ["bpmn:DataObjectReference", "bpmn:DataStoreReference"])) assign$1(actions, { "connect": {
		group: "connect",
		className: "bpmn-icon-connection-multi",
		title: translate("Connect using data input association"),
		action: {
			click: startConnect,
			dragstart: startConnect
		}
	} });
	if (is(businessObject, "bpmn:Group")) assign$1(actions, { "append.text-annotation": appendAction("bpmn:TextAnnotation", "bpmn-icon-text-annotation", translate("Add text annotation")) });
	if (this._isDeleteAllowed([element])) assign$1(actions, deleteAction());
	return actions;
};
function isEventType(businessObject, type, eventDefinitionType) {
	var isType = businessObject.$instanceOf(type);
	var isDefinition = false;
	var definitions = businessObject.eventDefinitions || [];
	forEach(definitions, function(def) {
		if (def.$type === eventDefinitionType) isDefinition = true;
	});
	return isType && isDefinition;
}
// ../../node_modules/bpmn-js/lib/features/context-pad/index.js
var context_pad_default = {
	__depends__: [
		append_preview_default,
		lib_default$1,
		context_pad_default$1,
		selection_default,
		connect_default,
		create_default,
		popup_menu_default
	],
	__init__: ["contextPadProvider"],
	contextPadProvider: ["type", ContextPadProvider]
};
// ../../node_modules/bpmn-js/lib/features/distribute-elements/BpmnDistributeElements.js
init_dist();
function BpmnDistributeElements(eventBus) {
	RuleProvider.call(this, eventBus);
}
BpmnDistributeElements.$inject = ["eventBus"];
e(BpmnDistributeElements, RuleProvider);
BpmnDistributeElements.prototype.init = function() {
	this.addRule("elements.distribute", function(context) {
		var elements = context.elements;
		elements = filter(elements, function(element) {
			var cannotDistribute = isAny(element, [
				"bpmn:Association",
				"bpmn:BoundaryEvent",
				"bpmn:DataInputAssociation",
				"bpmn:DataOutputAssociation",
				"bpmn:Lane",
				"bpmn:MessageFlow",
				"bpmn:SequenceFlow",
				"bpmn:TextAnnotation"
			]);
			return !(element.labelTarget || cannotDistribute);
		});
		elements = getParents$1(elements);
		if (elements.length < 3) return false;
		return elements;
	});
};
// ../../node_modules/bpmn-js/lib/features/distribute-elements/DistributeElementsIcons.js
var icons = {
	horizontal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1800">
                <polyline points="450 400 450 150 1350 150 1350 400" style="fill:none;stroke:currentColor;stroke-width:100;stroke-linejoin:round;"/>
                <rect x="150" y="450" width="600" height="1200" rx="1" style="fill:none;stroke:currentColor;stroke-width:100;"></rect>
                <rect x="1050" y="450" width="600" height="800" rx="1" style="fill:currentColor;stroke:currentColor;stroke-width:100;opacity:.5;"></rect>
              </svg>`,
	vertical: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1800">
              <polyline points="400 1350 150 1350 150 450 400 450" style="fill:none;stroke:currentColor;stroke-width:100;stroke-linejoin:round;"/>
              <rect x="450" y="150" width="1200" height="600" rx="1" style="fill:none;stroke:currentColor;stroke-width:100;"></rect>
              <rect x="450" y="1050" width="800" height="600" rx="1" style="fill:currentColor;stroke:currentColor;stroke-width:100;opacity:.5;"></rect>
            </svg>`
};
// ../../node_modules/bpmn-js/lib/features/distribute-elements/DistributeElementsMenuProvider.js
init_dist();
var LOW_PRIORITY$1 = 900;
function DistributeElementsMenuProvider(popupMenu, distributeElements, translate, rules) {
	this._distributeElements = distributeElements;
	this._translate = translate;
	this._popupMenu = popupMenu;
	this._rules = rules;
	popupMenu.registerProvider("align-elements", LOW_PRIORITY$1, this);
}
DistributeElementsMenuProvider.$inject = [
	"popupMenu",
	"distributeElements",
	"translate",
	"rules"
];
DistributeElementsMenuProvider.prototype.getPopupMenuEntries = function(target) {
	var entries = {};
	if (this._isAllowed(target)) assign$1(entries, this._getEntries(target));
	return entries;
};
DistributeElementsMenuProvider.prototype._isAllowed = function(elements) {
	return this._rules.allowed("elements.distribute", { elements });
};
DistributeElementsMenuProvider.prototype._getEntries = function(elements) {
	var distributeElements = this._distributeElements, translate = this._translate, popupMenu = this._popupMenu;
	return {
		"distribute-elements-horizontal": {
			group: "distribute",
			title: translate("Distribute elements horizontally"),
			className: "bjs-align-elements-menu-entry",
			imageHtml: icons["horizontal"],
			action: function(event, entry) {
				distributeElements.trigger(elements, "horizontal");
				popupMenu.close();
			}
		},
		"distribute-elements-vertical": {
			group: "distribute",
			title: translate("Distribute elements vertically"),
			imageHtml: icons["vertical"],
			action: function(event, entry) {
				distributeElements.trigger(elements, "vertical");
				popupMenu.close();
			}
		}
	};
};
// ../../node_modules/bpmn-js/lib/features/distribute-elements/index.js
var distribute_elements_default = {
	__depends__: [popup_menu_default$1, distribute_elements_default$1],
	__init__: ["bpmnDistributeElements", "distributeElementsMenuProvider"],
	bpmnDistributeElements: ["type", BpmnDistributeElements],
	distributeElementsMenuProvider: ["type", DistributeElementsMenuProvider]
};
// ../../node_modules/bpmn-js/lib/features/editor-actions/BpmnEditorActions.js
init_dist();
init_ModelUtil();
function BpmnEditorActions(injector) {
	injector.invoke(EditorActions$1, this);
}
e(BpmnEditorActions, EditorActions$1);
BpmnEditorActions.$inject = ["injector"];
BpmnEditorActions.prototype._registerDefaultActions = function(injector) {
	EditorActions$1.prototype._registerDefaultActions.call(this, injector);
	var canvas = injector.get("canvas", false);
	var elementRegistry = injector.get("elementRegistry", false);
	var selection = injector.get("selection", false);
	var spaceTool = injector.get("spaceTool", false);
	var lassoTool = injector.get("lassoTool", false);
	var handTool = injector.get("handTool", false);
	var globalConnect = injector.get("globalConnect", false);
	var distributeElements = injector.get("distributeElements", false);
	var alignElements = injector.get("alignElements", false);
	var directEditing = injector.get("directEditing", false);
	var searchPad = injector.get("searchPad", false);
	var modeling = injector.get("modeling", false);
	var contextPad = injector.get("contextPad", false);
	if (canvas && elementRegistry && selection) this._registerAction("selectElements", function() {
		var rootElement = canvas.getRootElement();
		var elements = elementRegistry.filter(function(element) {
			return element !== rootElement;
		});
		selection.select(elements);
		return elements;
	});
	if (spaceTool) this._registerAction("spaceTool", function() {
		spaceTool.toggle();
	});
	if (lassoTool) this._registerAction("lassoTool", function() {
		lassoTool.toggle();
	});
	if (handTool) this._registerAction("handTool", function() {
		handTool.toggle();
	});
	if (globalConnect) this._registerAction("globalConnectTool", function() {
		globalConnect.toggle();
	});
	if (selection && distributeElements) this._registerAction("distributeElements", function(opts) {
		var currentSelection = selection.get(), type = opts.type;
		if (currentSelection.length) distributeElements.trigger(currentSelection, type);
	});
	if (selection && alignElements) this._registerAction("alignElements", function(opts) {
		var currentSelection = selection.get(), aligneableElements = [], type = opts.type;
		if (currentSelection.length) {
			aligneableElements = filter(currentSelection, function(element) {
				return !is(element, "bpmn:Lane");
			});
			alignElements.trigger(aligneableElements, type);
		}
	});
	if (selection && modeling) this._registerAction("setColor", function(opts) {
		var currentSelection = selection.get();
		if (currentSelection.length) modeling.setColor(currentSelection, opts);
	});
	if (selection && directEditing) this._registerAction("directEditing", function() {
		var currentSelection = selection.get();
		if (currentSelection.length) directEditing.activate(currentSelection[0]);
	});
	if (searchPad) this._registerAction("find", function() {
		searchPad.toggle();
	});
	if (canvas && modeling) this._registerAction("moveToOrigin", function() {
		var rootElement = canvas.getRootElement(), boundingBox, elements;
		if (is(rootElement, "bpmn:Collaboration")) elements = elementRegistry.filter(function(element) {
			return is(element.parent, "bpmn:Collaboration");
		});
		else elements = elementRegistry.filter(function(element) {
			return element !== rootElement && !is(element.parent, "bpmn:SubProcess");
		});
		boundingBox = getBBox(elements);
		modeling.moveElements(elements, {
			x: -boundingBox.x,
			y: -boundingBox.y
		}, rootElement);
	});
	if (selection && contextPad) this._registerAction("replaceElement", function(event) {
		contextPad.triggerEntry("replace", "click", event);
	});
};
// ../../node_modules/bpmn-js/lib/features/editor-actions/index.js
var editor_actions_default$1 = {
	__depends__: [editor_actions_default$2],
	editorActions: ["type", BpmnEditorActions]
};
// ../../node_modules/bpmn-js/lib/features/grid-snapping/BpmnGridSnapping.js
function BpmnGridSnapping(eventBus) {
	eventBus.on(["create.init", "shape.move.init"], function(event) {
		var context = event.context, shape = event.shape;
		if (isAny(shape, [
			"bpmn:Participant",
			"bpmn:SubProcess",
			"bpmn:TextAnnotation"
		])) {
			if (!context.gridSnappingContext) context.gridSnappingContext = {};
			context.gridSnappingContext.snapLocation = "top-left";
		}
	});
}
BpmnGridSnapping.$inject = ["eventBus"];
// ../../node_modules/bpmn-js/lib/features/grid-snapping/behavior/GridSnappingAutoPlaceBehavior.js
init_ModelUtil();
var HIGH_PRIORITY$4 = 2e3;
function GridSnappingAutoPlaceBehavior(eventBus, gridSnapping, elementRegistry) {
	eventBus.on("autoPlace", HIGH_PRIORITY$4, function(context) {
		var source = context.source, sourceMid = getMid(source), shape = context.shape;
		var position = getNewShapePosition(source, shape, elementRegistry);
		["x", "y"].forEach(function(axis) {
			var options = {};
			if (position[axis] === sourceMid[axis]) return;
			if (position[axis] > sourceMid[axis]) options.min = position[axis];
			else options.max = position[axis];
			if (is(shape, "bpmn:TextAnnotation")) {
				if (isHorizontal(axis)) options.offset = -shape.width / 2;
				else options.offset = -shape.height / 2;
			}
			position[axis] = gridSnapping.snapValue(position[axis], options);
		});
		return position;
	});
}
GridSnappingAutoPlaceBehavior.$inject = [
	"eventBus",
	"gridSnapping",
	"elementRegistry"
];
function isHorizontal(axis) {
	return axis === "x";
}
// ../../node_modules/bpmn-js/lib/features/grid-snapping/behavior/GridSnappingParticipantBehavior.js
init_ModelUtil();
var HIGHER_PRIORITY$1 = 1750;
function GridSnappingParticipantBehavior(canvas, eventBus, gridSnapping) {
	eventBus.on(["create.start", "shape.move.start"], HIGHER_PRIORITY$1, function(event) {
		var context = event.context, shape = context.shape, rootElement = canvas.getRootElement();
		if (!is(shape, "bpmn:Participant") || !is(rootElement, "bpmn:Process") || !rootElement.children.length) return;
		if (!context.createConstraints) return;
		shape.width = gridSnapping.snapValue(shape.width, { min: shape.width });
		shape.height = gridSnapping.snapValue(shape.height, { min: shape.height });
	});
}
GridSnappingParticipantBehavior.$inject = [
	"canvas",
	"eventBus",
	"gridSnapping"
];
// ../../node_modules/bpmn-js/lib/features/grid-snapping/behavior/GridSnappingLayoutConnectionBehavior.js
init_dist();
var HIGH_PRIORITY$3 = 3e3;
function GridSnappingLayoutConnectionBehavior(eventBus, gridSnapping, modeling) {
	CommandInterceptor.call(this, eventBus);
	this._gridSnapping = gridSnapping;
	var self = this;
	this.postExecuted(["connection.create", "connection.layout"], HIGH_PRIORITY$3, function(event) {
		var context = event.context, connection = context.connection, hints = context.hints || {}, waypoints = connection.waypoints;
		if (hints.connectionStart || hints.connectionEnd || hints.createElementsBehavior === false) return;
		if (!hasMiddleSegments(waypoints)) return;
		modeling.updateWaypoints(connection, self.snapMiddleSegments(waypoints));
	});
}
GridSnappingLayoutConnectionBehavior.$inject = [
	"eventBus",
	"gridSnapping",
	"modeling"
];
e(GridSnappingLayoutConnectionBehavior, CommandInterceptor);
GridSnappingLayoutConnectionBehavior.prototype.snapMiddleSegments = function(waypoints) {
	var gridSnapping = this._gridSnapping, snapped;
	waypoints = waypoints.slice();
	for (var i = 1; i < waypoints.length - 2; i++) {
		snapped = snapSegment(gridSnapping, waypoints[i], waypoints[i + 1]);
		waypoints[i] = snapped[0];
		waypoints[i + 1] = snapped[1];
	}
	return waypoints;
};
function hasMiddleSegments(waypoints) {
	return waypoints.length > 3;
}
function horizontallyAligned(aligned) {
	return aligned === "h";
}
function verticallyAligned(aligned) {
	return aligned === "v";
}
function snapSegment(gridSnapping, segmentStart, segmentEnd) {
	var aligned = pointsAligned(segmentStart, segmentEnd);
	var snapped = {};
	if (horizontallyAligned(aligned)) snapped.y = gridSnapping.snapValue(segmentStart.y);
	if (verticallyAligned(aligned)) snapped.x = gridSnapping.snapValue(segmentStart.x);
	if ("x" in snapped || "y" in snapped) {
		segmentStart = assign$1({}, segmentStart, snapped);
		segmentEnd = assign$1({}, segmentEnd, snapped);
	}
	return [segmentStart, segmentEnd];
}
// ../../node_modules/bpmn-js/lib/features/grid-snapping/index.js
var grid_snapping_default = {
	__depends__: [grid_snapping_default$1, {
		__init__: [
			"gridSnappingAutoPlaceBehavior",
			"gridSnappingParticipantBehavior",
			"gridSnappingLayoutConnectionBehavior"
		],
		gridSnappingAutoPlaceBehavior: ["type", GridSnappingAutoPlaceBehavior],
		gridSnappingParticipantBehavior: ["type", GridSnappingParticipantBehavior],
		gridSnappingLayoutConnectionBehavior: ["type", GridSnappingLayoutConnectionBehavior]
	}],
	__init__: ["bpmnGridSnapping"],
	bpmnGridSnapping: ["type", BpmnGridSnapping]
};
// ../../node_modules/bpmn-js/lib/features/interaction-events/BpmnInteractionEvents.js
init_ModelUtil();
var LABEL_WIDTH = 30;
var LABEL_HEIGHT = 30;
function BpmnInteractionEvents(eventBus, interactionEvents) {
	this._interactionEvents = interactionEvents;
	var self = this;
	eventBus.on(["interactionEvents.createHit", "interactionEvents.updateHit"], function(context) {
		var element = context.element, gfx = context.gfx;
		if (is(element, "bpmn:Lane")) return self._createParticipantHit(element, gfx);
		else if (is(element, "bpmn:Participant")) {
			if (isExpanded(element)) return self._createParticipantHit(element, gfx);
			else return self._createDefaultHit(element, gfx);
		} else if (is(element, "bpmn:SubProcess")) {
			if (isExpanded(element)) return self._createSubProcessHit(element, gfx);
			else return self._createDefaultHit(element, gfx);
		}
	});
}
BpmnInteractionEvents.$inject = ["eventBus", "interactionEvents"];
BpmnInteractionEvents.prototype._createDefaultHit = function(element, gfx) {
	this._interactionEvents.removeHits(gfx);
	this._interactionEvents.createDefaultHit(element, gfx);
	return true;
};
BpmnInteractionEvents.prototype._createParticipantHit = function(element, gfx) {
	this._interactionEvents.removeHits(gfx);
	this._interactionEvents.createBoxHit(gfx, "no-move", {
		width: element.width,
		height: element.height
	});
	this._interactionEvents.createBoxHit(gfx, "click-stroke", {
		width: element.width,
		height: element.height
	});
	var box = isHorizontal$1(element) ? {
		width: LABEL_WIDTH,
		height: element.height
	} : {
		width: element.width,
		height: LABEL_HEIGHT
	};
	this._interactionEvents.createBoxHit(gfx, "all", box);
	return true;
};
BpmnInteractionEvents.prototype._createSubProcessHit = function(element, gfx) {
	this._interactionEvents.removeHits(gfx);
	this._interactionEvents.createBoxHit(gfx, "no-move", {
		width: element.width,
		height: element.height
	});
	this._interactionEvents.createBoxHit(gfx, "click-stroke", {
		width: element.width,
		height: element.height
	});
	this._interactionEvents.createBoxHit(gfx, "all", {
		width: element.width,
		height: LABEL_HEIGHT
	});
	return true;
};
// ../../node_modules/bpmn-js/lib/features/interaction-events/index.js
var interaction_events_default = {
	__init__: ["bpmnInteractionEvents"],
	bpmnInteractionEvents: ["type", BpmnInteractionEvents]
};
// ../../node_modules/bpmn-js/lib/features/keyboard/BpmnKeyboardBindings.js
init_dist();
function BpmnKeyboardBindings(injector) {
	injector.invoke(KeyboardBindings$1, this);
}
e(BpmnKeyboardBindings, KeyboardBindings$1);
BpmnKeyboardBindings.$inject = ["injector"];
var SHORTCUTS_KEY_BINDINGS = {
	selectElements: {
		key: "A",
		modifier: "cmd"
	},
	find: {
		key: "F",
		modifier: "cmd"
	},
	spaceTool: { key: "S" },
	lassoTool: { key: "L" },
	handTool: { key: "H" },
	globalConnectTool: { key: "C" },
	directEditing: { key: "E" },
	replaceElement: { key: "R" }
};
BpmnKeyboardBindings.prototype.registerBindings = function(keyboard, editorActions) {
	KeyboardBindings$1.prototype.registerBindings.call(this, keyboard, editorActions);
	forEach(SHORTCUTS_KEY_BINDINGS, function(binding, action) {
		if (!editorActions.isRegistered(action)) return;
		var keys = [binding.key.toLowerCase(), binding.key.toUpperCase()], requiresCmd = binding.modifier === "cmd";
		keyboard.addListener(function(context) {
			var event = context.keyEvent;
			if (!keyboard.isKey(keys, event)) return;
			if (requiresCmd) {
				if (!keyboard.isCmd(event)) return;
			} else if (keyboard.hasModifier(event)) return;
			editorActions.trigger(action, event);
			return true;
		});
	});
};
// ../../node_modules/bpmn-js/lib/features/keyboard/index.js
var keyboard_default = {
	__depends__: [keyboard_default$1],
	__init__: ["keyboardBindings"],
	keyboardBindings: ["type", BpmnKeyboardBindings]
};
// ../../node_modules/bpmn-js/lib/features/label-editing/LabelEditingProvider.js
init_dist();
init_ModelUtil();
var HIGH_PRIORITY$2 = 2e3;
function LabelEditingProvider(eventBus, bpmnFactory, canvas, directEditing, modeling, resizeHandles, textRenderer) {
	this._bpmnFactory = bpmnFactory;
	this._canvas = canvas;
	this._modeling = modeling;
	this._textRenderer = textRenderer;
	directEditing.registerProvider(this);
	eventBus.on("element.dblclick", function(event) {
		activateDirectEdit(event.element, true);
	});
	eventBus.on([
		"autoPlace.start",
		"canvas.viewbox.changing",
		"drag.init",
		"element.mousedown",
		"popupMenu.open",
		"root.set",
		"selection.changed"
	], function() {
		if (directEditing.isActive()) directEditing.complete();
	});
	eventBus.on(["shape.remove", "connection.remove"], HIGH_PRIORITY$2, function(event) {
		if (directEditing.isActive(event.element)) directEditing.cancel();
	});
	eventBus.on(["commandStack.changed"], function(e) {
		if (directEditing.isActive()) directEditing.cancel();
	});
	eventBus.on("directEditing.activate", function(event) {
		resizeHandles.removeResizers();
	});
	eventBus.on("create.end", 500, function(event) {
		var context = event.context, element = context.shape, canExecute = event.context.canExecute;
		if (event.isTouch) return;
		if (!canExecute) return;
		if (context.hints && context.hints.createElementsBehavior === false) return;
		activateDirectEdit(element);
	});
	eventBus.on("autoPlace.end", 500, function(event) {
		activateDirectEdit(event.shape);
	});
	function activateDirectEdit(element, force) {
		if (force || isAny(element, [
			"bpmn:Activity",
			"bpmn:Event",
			"bpmn:TextAnnotation",
			"bpmn:Participant"
		])) directEditing.activate(element);
	}
}
LabelEditingProvider.$inject = [
	"eventBus",
	"bpmnFactory",
	"canvas",
	"directEditing",
	"modeling",
	"resizeHandles",
	"textRenderer"
];
LabelEditingProvider.prototype.activate = function(element) {
	var text = getLabel(element);
	if (text === void 0) return;
	var context = { text };
	var bounds = this.getEditingBBox(element);
	assign$1(context, bounds);
	var options = {};
	var style = context.style || {};
	assign$1(style, {
		backgroundColor: null,
		border: null
	});
	if (isAny(element, [
		"bpmn:Task",
		"bpmn:Participant",
		"bpmn:Lane",
		"bpmn:CallActivity"
	]) || isCollapsedSubProcess(element)) assign$1(options, { centerVertically: true });
	if (isLabelExternal(element)) {
		assign$1(options, {
			resizable: true,
			autoResize: true
		});
		assign$1(style, {
			backgroundColor: "#ffffff",
			border: "1px solid #ccc"
		});
	}
	if (is(element, "bpmn:TextAnnotation")) {
		assign$1(options, {
			resizable: true,
			autoResize: true
		});
		assign$1(style, {
			backgroundColor: "#ffffff",
			border: "1px solid #ccc"
		});
	}
	assign$1(context, {
		options,
		style
	});
	return context;
};
LabelEditingProvider.prototype.getEditingBBox = function(element) {
	var canvas = this._canvas;
	var target = element.label || element;
	var bbox = canvas.getAbsoluteBBox(target);
	var mid = {
		x: bbox.x + bbox.width / 2,
		y: bbox.y + bbox.height / 2
	};
	var bounds = {
		x: bbox.x,
		y: bbox.y
	};
	var zoom = canvas.zoom();
	var defaultStyle = this._textRenderer.getDefaultStyle(), externalStyle = this._textRenderer.getExternalStyle();
	var externalFontSize = externalStyle.fontSize * zoom, externalLineHeight = externalStyle.lineHeight, defaultFontSize = defaultStyle.fontSize * zoom, defaultLineHeight = defaultStyle.lineHeight;
	var style = {
		fontFamily: this._textRenderer.getDefaultStyle().fontFamily,
		fontWeight: this._textRenderer.getDefaultStyle().fontWeight
	};
	if (is(element, "bpmn:Lane") || isExpandedPool(element)) {
		var isHorizontalLane = isHorizontal$1(element);
		var laneBounds = isHorizontalLane ? {
			width: bbox.height,
			height: 30 * zoom,
			x: bbox.x - bbox.height / 2 + 15 * zoom,
			y: mid.y - 30 * zoom / 2
		} : {
			width: bbox.width,
			height: 30 * zoom
		};
		assign$1(bounds, laneBounds);
		assign$1(style, {
			fontSize: defaultFontSize + "px",
			lineHeight: defaultLineHeight,
			paddingTop: 7 * zoom + "px",
			paddingBottom: 7 * zoom + "px",
			paddingLeft: 5 * zoom + "px",
			paddingRight: 5 * zoom + "px",
			transform: isHorizontalLane ? "rotate(-90deg)" : null
		});
	}
	if (isCollapsedPool(element)) {
		var isHorizontalPool = isHorizontal$1(element);
		var poolBounds = isHorizontalPool ? {
			width: bbox.width,
			height: bbox.height
		} : {
			width: bbox.height,
			height: bbox.width,
			x: mid.x - bbox.height / 2,
			y: mid.y - bbox.width / 2
		};
		assign$1(bounds, poolBounds);
		assign$1(style, {
			fontSize: defaultFontSize + "px",
			lineHeight: defaultLineHeight,
			paddingTop: 7 * zoom + "px",
			paddingBottom: 7 * zoom + "px",
			paddingLeft: 5 * zoom + "px",
			paddingRight: 5 * zoom + "px",
			transform: isHorizontalPool ? null : "rotate(-90deg)"
		});
	}
	if (isAny(element, ["bpmn:Task", "bpmn:CallActivity"]) || isCollapsedSubProcess(element)) {
		assign$1(bounds, {
			width: bbox.width,
			height: bbox.height
		});
		assign$1(style, {
			fontSize: defaultFontSize + "px",
			lineHeight: defaultLineHeight,
			paddingTop: 7 * zoom + "px",
			paddingBottom: 7 * zoom + "px",
			paddingLeft: 5 * zoom + "px",
			paddingRight: 5 * zoom + "px"
		});
	}
	if (isExpandedSubProcess(element)) {
		assign$1(bounds, {
			width: bbox.width,
			x: bbox.x
		});
		assign$1(style, {
			fontSize: defaultFontSize + "px",
			lineHeight: defaultLineHeight,
			paddingTop: 7 * zoom + "px",
			paddingBottom: 7 * zoom + "px",
			paddingLeft: 5 * zoom + "px",
			paddingRight: 5 * zoom + "px"
		});
	}
	var BORDER_WIDTH = 1;
	var width = bbox.width + 2 * BORDER_WIDTH;
	if (target.labelTarget) {
		assign$1(bounds, {
			width,
			height: bbox.height + 2 * BORDER_WIDTH,
			x: bbox.x - BORDER_WIDTH,
			y: bbox.y - BORDER_WIDTH
		});
		assign$1(style, {
			fontSize: externalFontSize + "px",
			lineHeight: externalLineHeight
		});
	}
	if (isLabelExternal(target) && !hasExternalLabel(target) && !isLabel(target)) {
		var externalLabelMid = getExternalLabelMid(element);
		var absoluteBBox = canvas.getAbsoluteBBox({
			x: externalLabelMid.x,
			y: externalLabelMid.y,
			width: 0,
			height: 0
		});
		var height = externalFontSize;
		var newLabelWidth = DEFAULT_LABEL_SIZE.width * zoom + 2 * BORDER_WIDTH;
		assign$1(bounds, {
			width: newLabelWidth,
			height: height + 2 * BORDER_WIDTH,
			x: absoluteBBox.x - newLabelWidth / 2,
			y: absoluteBBox.y - height / 2 - BORDER_WIDTH
		});
		assign$1(style, {
			fontSize: externalFontSize + "px",
			lineHeight: externalLineHeight
		});
	}
	if (is(element, "bpmn:TextAnnotation")) {
		assign$1(bounds, {
			width: bbox.width + 2 * BORDER_WIDTH,
			height: bbox.height + 2 * BORDER_WIDTH,
			x: bbox.x - BORDER_WIDTH,
			y: bbox.y - BORDER_WIDTH,
			minWidth: 30 * zoom,
			minHeight: 10 * zoom
		});
		assign$1(style, {
			textAlign: "left",
			paddingTop: 7 * zoom + "px",
			paddingBottom: 7 * zoom + "px",
			paddingLeft: 7 * zoom + "px",
			paddingRight: 7 * zoom + "px",
			fontSize: defaultFontSize + "px",
			lineHeight: defaultLineHeight
		});
	}
	return {
		bounds,
		style
	};
};
LabelEditingProvider.prototype.update = function(element, newLabel, activeContextText, bounds) {
	var newBounds, bbox;
	if (is(element, "bpmn:TextAnnotation")) {
		bbox = this._canvas.getAbsoluteBBox(element);
		newBounds = {
			x: element.x,
			y: element.y,
			width: element.width / bbox.width * bounds.width,
			height: element.height / bbox.height * bounds.height
		};
	}
	if (isEmptyText(newLabel)) newLabel = null;
	this._modeling.updateLabel(element, newLabel, newBounds);
};
function isCollapsedSubProcess(element) {
	return is(element, "bpmn:SubProcess") && !isExpanded(element);
}
function isExpandedSubProcess(element) {
	return is(element, "bpmn:SubProcess") && isExpanded(element);
}
function isCollapsedPool(element) {
	return is(element, "bpmn:Participant") && !isExpanded(element);
}
function isExpandedPool(element) {
	return is(element, "bpmn:Participant") && isExpanded(element);
}
function isEmptyText(label) {
	return !label || !label.trim();
}
// ../../node_modules/bpmn-js/lib/features/label-editing/LabelEditingPreview.js
init_ModelUtil();
var MARKER_HIDDEN = "djs-element-hidden";
var MARKER_LABEL_HIDDEN = "djs-label-hidden";
function LabelEditingPreview(eventBus, canvas, pathMap) {
	var self = this;
	var defaultLayer = canvas.getDefaultLayer();
	var element, absoluteElementBBox, gfx;
	eventBus.on("directEditing.activate", function(context) {
		var activeProvider = context.active;
		element = activeProvider.element.label || activeProvider.element;
		if (is(element, "bpmn:TextAnnotation")) {
			absoluteElementBBox = canvas.getAbsoluteBBox(element);
			gfx = create("g");
			var textPathData = pathMap.getScaledPath("TEXT_ANNOTATION", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: element.width,
				containerHeight: element.height,
				position: {
					mx: 0,
					my: 0
				}
			});
			var path = self.path = create("path");
			attr(path, {
				d: textPathData,
				strokeWidth: 2,
				stroke: getStrokeColor(element)
			});
			append(gfx, path);
			append(defaultLayer, gfx);
			translate(gfx, element.x, element.y);
		}
		if (is(element, "bpmn:TextAnnotation") || element.labelTarget) canvas.addMarker(element, MARKER_HIDDEN);
		else if (is(element, "bpmn:Task") || is(element, "bpmn:CallActivity") || is(element, "bpmn:SubProcess") || is(element, "bpmn:Participant") || is(element, "bpmn:Lane")) canvas.addMarker(element, MARKER_LABEL_HIDDEN);
	});
	eventBus.on("directEditing.resize", function(context) {
		if (is(element, "bpmn:TextAnnotation")) {
			var height = context.height, dy = context.dy;
			var newElementHeight = Math.max(element.height / absoluteElementBBox.height * (height + dy), 0);
			var textPathData = pathMap.getScaledPath("TEXT_ANNOTATION", {
				xScaleFactor: 1,
				yScaleFactor: 1,
				containerWidth: element.width,
				containerHeight: newElementHeight,
				position: {
					mx: 0,
					my: 0
				}
			});
			attr(self.path, { d: textPathData });
		}
	});
	eventBus.on(["directEditing.complete", "directEditing.cancel"], function(context) {
		var activeProvider = context.active;
		if (activeProvider) {
			canvas.removeMarker(activeProvider.element.label || activeProvider.element, MARKER_HIDDEN);
			canvas.removeMarker(element, MARKER_LABEL_HIDDEN);
		}
		element = void 0;
		absoluteElementBBox = void 0;
		if (gfx) {
			remove$1(gfx);
			gfx = void 0;
		}
	});
}
LabelEditingPreview.$inject = [
	"eventBus",
	"canvas",
	"pathMap"
];
function getStrokeColor(element, defaultColor) {
	return getDi(element).get("stroke") || defaultColor || "black";
}
// ../../node_modules/bpmn-js/lib/features/label-editing/index.js
var label_editing_default = {
	__depends__: [
		change_support_default,
		resize_default,
		lib_default$1
	],
	__init__: ["labelEditingProvider", "labelEditingPreview"],
	labelEditingProvider: ["type", LabelEditingProvider],
	labelEditingPreview: ["type", LabelEditingPreview]
};
// ../../node_modules/bpmn-js/lib/features/label-link/LabelLink.js
var ALLOWED_ELEMENTS = [
	"bpmn:Event",
	"bpmn:SequenceFlow",
	"bpmn:Gateway"
];
var LINE_STYLE = {
	class: "bjs-label-link",
	stroke: "var(--element-selected-outline-secondary-stroke-color)",
	strokeDasharray: "5, 5"
};
var DISTANCE_THRESHOLD = 15;
var PATH_OFFSET = 2;
function LabelLink(eventBus, canvas, graphicsFactory, outline, selection) {
	const layer = canvas.getLayer("overlays");
	eventBus.on(["selection.changed", "shape.changed"], function() {
		cleanUp();
	});
	eventBus.on("selection.changed", function({ newSelection }) {
		const allowedElements = newSelection.filter((element) => isAny(element, ALLOWED_ELEMENTS));
		if (allowedElements.length === 1) {
			const element = allowedElements[0];
			if (isLabel(element)) createLink(element, element.labelTarget);
			else if (element.labels?.length) createLink(element.labels[0], element);
		}
		if (allowedElements.length === 2) {
			const label = allowedElements.find(isLabel);
			const target = allowedElements.find((el) => el.labels?.includes(label));
			if (label && target) createLink(label, target);
		}
	});
	eventBus.on("shape.changed", function({ element }) {
		if (!isAny(element, ALLOWED_ELEMENTS) || !isElementSelected(element)) return;
		if (isLabel(element)) createLink(element, element.labelTarget);
		else if (element.labels?.length) createLink(element.labels[0], element);
	});
	function createLink(label, target) {
		const labelMid = getMid(label);
		const targetReference = isConnection(target) ? getReferencePoint(labelMid, asLines(target.waypoints)) : getMid(target);
		const line = createLine([targetReference, labelMid], LINE_STYLE);
		const linePath = line.getAttribute("d");
		const labelPath = selection.isSelected(label) ? getElementOutlinePath(label) : getElementPath(label);
		const labelInter = getElementLineIntersection(labelPath, linePath);
		if (!labelInter) return;
		let targetInter;
		if (isConnection(target)) targetInter = targetReference;
		else {
			const targetPath = selection.isSelected(target) ? getElementOutlinePath(target) : getElementPath(target);
			targetInter = getElementLineIntersection(targetPath, linePath) || getMid(target);
		}
		if (getDistancePointPoint(targetInter, labelInter) < DISTANCE_THRESHOLD) return;
		updateLine(line, [targetInter, labelInter]);
		append(layer, line);
	}
	function cleanUp() {
		all(`.${LINE_STYLE.class}`, layer).forEach(remove$1);
	}
	function getElementOutlinePath(element) {
		const outlineShape = outline.getOutline(element);
		if (!outlineShape) return getElementPath(element);
		if (outlineShape.x) {
			const shape = {
				x: element.x + parseSvgNumAttr(outlineShape, "x") - PATH_OFFSET,
				y: element.y + parseSvgNumAttr(outlineShape, "y") - PATH_OFFSET,
				width: parseSvgNumAttr(outlineShape, "width") + 4,
				height: parseSvgNumAttr(outlineShape, "height") + 4
			};
			return getRoundRectPath(shape, parseSvgNumAttr(outlineShape, "rx"));
		}
		if (outlineShape.cx) {
			const radius = parseSvgNumAttr(outlineShape, "r");
			const shape = {
				x: element.x + parseSvgNumAttr(outlineShape, "cx") - radius,
				y: element.y + parseSvgNumAttr(outlineShape, "cy") - radius,
				width: radius * 2,
				height: radius * 2
			};
			return getCirclePath(shape);
		}
	}
	function getElementPath(element) {
		return graphicsFactory.getShapePath(element);
	}
	function isElementSelected(element) {
		return selection.isSelected(element);
	}
}
LabelLink.$inject = [
	"eventBus",
	"canvas",
	"graphicsFactory",
	"outline",
	"selection"
];
function parseSvgNumAttr(node, attr$2) {
	return parseFloat(attr(node, attr$2) || 0);
}
// ../../node_modules/bpmn-js/lib/features/label-link/index.js
var label_link_default = {
	__depends__: [selection_default, outline_default$1],
	__init__: ["labelLink"],
	labelLink: ["type", LabelLink]
};
// ../../node_modules/diagram-js/lib/features/tooltips/Tooltips.js
init_dist();
var ids = new IdGenerator("tt");
function createRoot(parentNode) {
	var root = domify("<div class=\"djs-tooltip-container\" />");
	assign(root, {
		position: "absolute",
		width: "0",
		height: "0"
	});
	parentNode.insertBefore(root, parentNode.firstChild);
	return root;
}
function setPosition(el, x, y) {
	assign(el, {
		left: x + "px",
		top: y + "px"
	});
}
function setVisible(el, visible) {
	el.style.display = visible === false ? "none" : "";
}
var tooltipClass = "djs-tooltip";
var tooltipSelector = "." + tooltipClass;
function Tooltips(eventBus, canvas) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	this._ids = ids;
	this._tooltipDefaults = { show: {
		minZoom: .7,
		maxZoom: 5
	} };
	this._tooltips = {};
	this._tooltipRoot = createRoot(canvas.getContainer());
	var self = this;
	delegate.bind(this._tooltipRoot, tooltipSelector, "mousedown", function(event) {
		event.stopPropagation();
	});
	delegate.bind(this._tooltipRoot, tooltipSelector, "mouseover", function(event) {
		self.trigger("mouseover", event);
	});
	delegate.bind(this._tooltipRoot, tooltipSelector, "mouseout", function(event) {
		self.trigger("mouseout", event);
	});
	this._init();
}
Tooltips.$inject = ["eventBus", "canvas"];
Tooltips.prototype.add = function(tooltip) {
	if (!tooltip.position) throw new Error("must specifiy tooltip position");
	if (!tooltip.html) throw new Error("must specifiy tooltip html");
	var id = this._ids.next();
	tooltip = assign$1({}, this._tooltipDefaults, tooltip, { id });
	this._addTooltip(tooltip);
	if (tooltip.timeout) this.setTimeout(tooltip);
	return id;
};
Tooltips.prototype.trigger = function(action, event) {
	var node = event.delegateTarget || event.target;
	var tooltip = this.get(attr$1(node, "data-tooltip-id"));
	if (!tooltip) return;
	if (action === "mouseover" && tooltip.timeout) this.clearTimeout(tooltip);
	if (action === "mouseout" && tooltip.timeout) {
		tooltip.timeout = 1e3;
		this.setTimeout(tooltip);
	}
};
Tooltips.prototype.get = function(id) {
	if (typeof id !== "string") id = id.id;
	return this._tooltips[id];
};
Tooltips.prototype.clearTimeout = function(tooltip) {
	tooltip = this.get(tooltip);
	if (!tooltip) return;
	var removeTimer = tooltip.removeTimer;
	if (removeTimer) {
		clearTimeout(removeTimer);
		tooltip.removeTimer = null;
	}
};
Tooltips.prototype.setTimeout = function(tooltip) {
	tooltip = this.get(tooltip);
	if (!tooltip) return;
	this.clearTimeout(tooltip);
	var self = this;
	tooltip.removeTimer = setTimeout(function() {
		self.remove(tooltip);
	}, tooltip.timeout);
};
Tooltips.prototype.remove = function(id) {
	var tooltip = this.get(id);
	if (tooltip) {
		remove$2(tooltip.html);
		remove$2(tooltip.htmlContainer);
		delete tooltip.htmlContainer;
		delete this._tooltips[tooltip.id];
	}
};
Tooltips.prototype.show = function() {
	setVisible(this._tooltipRoot);
};
Tooltips.prototype.hide = function() {
	setVisible(this._tooltipRoot, false);
};
Tooltips.prototype._updateRoot = function(viewbox) {
	var a = viewbox.scale || 1;
	var d = viewbox.scale || 1;
	var matrix = "matrix(" + a + ",0,0," + d + "," + -1 * viewbox.x * a + "," + -1 * viewbox.y * d + ")";
	this._tooltipRoot.style.transform = matrix;
	this._tooltipRoot.style["-ms-transform"] = matrix;
};
Tooltips.prototype._addTooltip = function(tooltip) {
	var id = tooltip.id, html = tooltip.html, htmlContainer, tooltipRoot = this._tooltipRoot;
	if (html.get && html.constructor.prototype.jquery) html = html.get(0);
	if (isString(html)) html = domify(html);
	htmlContainer = domify("<div data-tooltip-id=\"" + id + "\" class=\"" + tooltipClass + "\">");
	assign(htmlContainer, { position: "absolute" });
	htmlContainer.appendChild(html);
	if (tooltip.type) classes$1(htmlContainer).add("djs-tooltip-" + tooltip.type);
	if (tooltip.className) classes$1(htmlContainer).add(tooltip.className);
	tooltip.htmlContainer = htmlContainer;
	tooltipRoot.appendChild(htmlContainer);
	this._tooltips[id] = tooltip;
	this._updateTooltip(tooltip);
};
Tooltips.prototype._updateTooltip = function(tooltip) {
	var position = tooltip.position, htmlContainer = tooltip.htmlContainer;
	setPosition(htmlContainer, position.x, position.y);
};
Tooltips.prototype._updateTooltipVisibilty = function(viewbox) {
	forEach(this._tooltips, function(tooltip) {
		var show = tooltip.show, htmlContainer = tooltip.htmlContainer, visible = true;
		if (show) {
			if (show.minZoom > viewbox.scale || show.maxZoom < viewbox.scale) visible = false;
			setVisible(htmlContainer, visible);
		}
	});
};
Tooltips.prototype._init = function() {
	var self = this;
	function updateViewbox(viewbox) {
		self._updateRoot(viewbox);
		self._updateTooltipVisibilty(viewbox);
		self.show();
	}
	this._eventBus.on("canvas.viewbox.changing", function(event) {
		self.hide();
	});
	this._eventBus.on("canvas.viewbox.changed", function(event) {
		updateViewbox(event.viewbox);
	});
};
// ../../node_modules/diagram-js/lib/features/tooltips/index.js
var tooltips_default = {
	__init__: ["tooltips"],
	tooltips: ["type", Tooltips]
};
// ../../node_modules/bpmn-js/lib/features/modeling-feedback/ModelingFeedback.js
init_ModelUtil();
var COLLAB_ERR_MSG = "flow elements must be children of pools/participants";
var DATA_OBJECT_ERR_MSG = "Data object must be placed within a pool/participant.";
function ModelingFeedback(eventBus, tooltips, translate) {
	function showError(position, message, timeout) {
		tooltips.add({
			position: {
				x: position.x + 5,
				y: position.y + 5
			},
			type: "error",
			timeout: timeout || 2e3,
			html: "<div>" + message + "</div>"
		});
	}
	eventBus.on(["shape.move.rejected", "create.rejected"], function(event) {
		var context = event.context, shape = context.shape, target = context.target;
		if (is(target, "bpmn:Collaboration")) {
			if (is(shape, "bpmn:FlowNode")) showError(event, translate(COLLAB_ERR_MSG));
			else if (is(shape, "bpmn:DataObjectReference")) showError(event, translate(DATA_OBJECT_ERR_MSG));
		}
	});
}
ModelingFeedback.$inject = [
	"eventBus",
	"tooltips",
	"translate"
];
// ../../node_modules/bpmn-js/lib/features/modeling-feedback/index.js
var modeling_feedback_default = {
	__depends__: [tooltips_default],
	__init__: ["modelingFeedback"],
	modelingFeedback: ["type", ModelingFeedback]
};
// ../../node_modules/diagram-js/lib/features/global-connect/GlobalConnect.js
var MARKER_OK = "connect-ok";
var MARKER_NOT_OK = "connect-not-ok";
function GlobalConnect(eventBus, dragging, connect, canvas, toolManager, rules, mouse) {
	var self = this;
	this._dragging = dragging;
	this._rules = rules;
	this._mouse = mouse;
	toolManager.registerTool("global-connect", {
		tool: "global-connect",
		dragging: "global-connect.drag"
	});
	eventBus.on("global-connect.hover", function(event) {
		var context = event.context, startTarget = event.hover;
		var canStartConnect = context.canStartConnect = self.canStartConnect(startTarget);
		if (canStartConnect === null) return;
		context.startTarget = startTarget;
		canvas.addMarker(startTarget, canStartConnect ? MARKER_OK : MARKER_NOT_OK);
	});
	eventBus.on(["global-connect.out", "global-connect.cleanup"], function(event) {
		var startTarget = event.context.startTarget, canStartConnect = event.context.canStartConnect;
		if (startTarget) canvas.removeMarker(startTarget, canStartConnect ? MARKER_OK : MARKER_NOT_OK);
	});
	eventBus.on(["global-connect.ended"], function(event) {
		var startTarget = event.context.startTarget, startPosition = {
			x: event.x,
			y: event.y
		};
		if (!self.canStartConnect(startTarget)) return;
		eventBus.once("element.out", function() {
			eventBus.once(["connect.ended", "connect.canceled"], function() {
				eventBus.fire("global-connect.drag.ended");
			});
			connect.start(null, startTarget, startPosition);
		});
		return false;
	});
}
GlobalConnect.$inject = [
	"eventBus",
	"dragging",
	"connect",
	"canvas",
	"toolManager",
	"rules",
	"mouse"
];
GlobalConnect.prototype.start = function(event, autoActivate) {
	this._dragging.init(event, "global-connect", {
		autoActivate,
		trapClick: false,
		data: { context: {} }
	});
};
GlobalConnect.prototype.toggle = function() {
	if (this.isActive()) return this._dragging.cancel();
	var mouseEvent = this._mouse.getLastMoveEvent();
	return this.start(mouseEvent, !!mouseEvent);
};
GlobalConnect.prototype.isActive = function() {
	var context = this._dragging.context();
	return context && /^global-connect/.test(context.prefix);
};
GlobalConnect.prototype.canStartConnect = function(startTarget) {
	return this._rules.allowed("connection.start", { source: startTarget });
};
// ../../node_modules/diagram-js/lib/features/global-connect/index.js
var global_connect_default = {
	__depends__: [
		connect_default,
		rules_default$1,
		dragging_default,
		tool_manager_default,
		mouse_default
	],
	globalConnect: ["type", GlobalConnect]
};
// ../../node_modules/bpmn-js/lib/features/palette/PaletteProvider.js
init_dist();
function PaletteProvider(palette, create, elementFactory, spaceTool, lassoTool, handTool, globalConnect, translate) {
	this._palette = palette;
	this._create = create;
	this._elementFactory = elementFactory;
	this._spaceTool = spaceTool;
	this._lassoTool = lassoTool;
	this._handTool = handTool;
	this._globalConnect = globalConnect;
	this._translate = translate;
	palette.registerProvider(this);
}
PaletteProvider.$inject = [
	"palette",
	"create",
	"elementFactory",
	"spaceTool",
	"lassoTool",
	"handTool",
	"globalConnect",
	"translate"
];
PaletteProvider.prototype.getPaletteEntries = function() {
	var actions = {}, create = this._create, elementFactory = this._elementFactory, spaceTool = this._spaceTool, lassoTool = this._lassoTool, handTool = this._handTool, globalConnect = this._globalConnect, translate = this._translate;
	function createAction(type, group, className, title, options) {
		function createListener(event) {
			var shape = elementFactory.createShape(assign$1({ type }, options));
			create.start(event, shape);
		}
		return {
			group,
			className,
			title,
			action: {
				dragstart: createListener,
				click: createListener
			}
		};
	}
	function createSubprocess(event) {
		var subProcess = elementFactory.createShape({
			type: "bpmn:SubProcess",
			x: 0,
			y: 0,
			isExpanded: true
		});
		var startEvent = elementFactory.createShape({
			type: "bpmn:StartEvent",
			x: 40,
			y: 82,
			parent: subProcess
		});
		create.start(event, [subProcess, startEvent], { hints: { autoSelect: [subProcess] } });
	}
	function createParticipant(event) {
		create.start(event, elementFactory.createParticipantShape());
	}
	assign$1(actions, {
		"hand-tool": {
			group: "tools",
			className: "bpmn-icon-hand-tool",
			title: translate("Activate hand tool"),
			shortcut: SHORTCUTS_KEY_BINDINGS.handTool.key,
			action: { click: function(event) {
				handTool.activateHand(event);
			} }
		},
		"lasso-tool": {
			group: "tools",
			className: "bpmn-icon-lasso-tool",
			title: translate("Activate lasso tool"),
			shortcut: SHORTCUTS_KEY_BINDINGS.lassoTool.key,
			action: { click: function(event) {
				lassoTool.activateSelection(event);
			} }
		},
		"space-tool": {
			group: "tools",
			className: "bpmn-icon-space-tool",
			title: translate("Activate create/remove space tool"),
			shortcut: SHORTCUTS_KEY_BINDINGS.spaceTool.key,
			action: { click: function(event) {
				spaceTool.activateSelection(event);
			} }
		},
		"global-connect-tool": {
			group: "tools",
			className: "bpmn-icon-connection-multi",
			title: translate("Activate global connect tool"),
			shortcut: SHORTCUTS_KEY_BINDINGS.globalConnectTool.key,
			action: { click: function(event) {
				globalConnect.start(event);
			} }
		},
		"tool-separator": {
			group: "tools",
			separator: true
		},
		"create.start-event": createAction("bpmn:StartEvent", "event", "bpmn-icon-start-event-none", translate("Create start event")),
		"create.intermediate-event": createAction("bpmn:IntermediateThrowEvent", "event", "bpmn-icon-intermediate-event-none", translate("Create intermediate/boundary event")),
		"create.end-event": createAction("bpmn:EndEvent", "event", "bpmn-icon-end-event-none", translate("Create end event")),
		"create.exclusive-gateway": createAction("bpmn:ExclusiveGateway", "gateway", "bpmn-icon-gateway-none", translate("Create gateway")),
		"create.task": createAction("bpmn:Task", "activity", "bpmn-icon-task", translate("Create task")),
		"create.data-object": createAction("bpmn:DataObjectReference", "data-object", "bpmn-icon-data-object", translate("Create data object reference")),
		"create.data-store": createAction("bpmn:DataStoreReference", "data-store", "bpmn-icon-data-store", translate("Create data store reference")),
		"create.subprocess-expanded": {
			group: "activity",
			className: "bpmn-icon-subprocess-expanded",
			title: translate("Create expanded sub-process"),
			action: {
				dragstart: createSubprocess,
				click: createSubprocess
			}
		},
		"create.participant-expanded": {
			group: "collaboration",
			className: "bpmn-icon-participant",
			title: translate("Create pool/participant"),
			action: {
				dragstart: createParticipant,
				click: createParticipant
			}
		},
		"create.group": createAction("bpmn:Group", "artifact", "bpmn-icon-group", translate("Create group"))
	});
	return actions;
};
// ../../node_modules/bpmn-js/lib/features/palette/index.js
var palette_default = {
	__depends__: [
		palette_default$1,
		create_default,
		space_tool_default,
		lasso_tool_default,
		hand_tool_default,
		global_connect_default,
		translate_default
	],
	__init__: ["paletteProvider"],
	paletteProvider: ["type", PaletteProvider]
};
// ../../node_modules/bpmn-js/lib/features/replace-preview/BpmnReplacePreview.js
init_dist();
var LOW_PRIORITY = 250;
function BpmnReplacePreview(eventBus, elementRegistry, elementFactory, canvas, previewSupport) {
	CommandInterceptor.call(this, eventBus);
	function replaceVisual(context) {
		var replacements = context.canExecute.replacements;
		forEach(replacements, function(replacement) {
			var id = replacement.oldElementId;
			var newElement = { type: replacement.newElementType };
			if (context.visualReplacements[id]) return;
			var element = elementRegistry.get(id);
			assign$1(newElement, {
				x: element.x,
				y: element.y
			});
			var tempShape = elementFactory.createShape(newElement);
			canvas.addShape(tempShape, element.parent);
			var gfx = query("[data-element-id=\"" + escapeCSS(element.id) + "\"]", context.dragGroup);
			if (gfx) attr(gfx, { display: "none" });
			var dragger = previewSupport.addDragger(tempShape, context.dragGroup);
			context.visualReplacements[id] = dragger;
			canvas.removeShape(tempShape);
		});
	}
	function restoreVisual(context) {
		var visualReplacements = context.visualReplacements;
		forEach(visualReplacements, function(dragger, id) {
			var originalGfx = query("[data-element-id=\"" + escapeCSS(id) + "\"]", context.dragGroup);
			if (originalGfx) attr(originalGfx, { display: "inline" });
			dragger.remove();
			if (visualReplacements[id]) delete visualReplacements[id];
		});
	}
	eventBus.on("shape.move.move", LOW_PRIORITY, function(event) {
		var context = event.context, canExecute = context.canExecute;
		if (!context.visualReplacements) context.visualReplacements = {};
		if (canExecute && canExecute.replacements) replaceVisual(context);
		else restoreVisual(context);
	});
}
BpmnReplacePreview.$inject = [
	"eventBus",
	"elementRegistry",
	"elementFactory",
	"canvas",
	"previewSupport"
];
e(BpmnReplacePreview, CommandInterceptor);
// ../../node_modules/bpmn-js/lib/features/replace-preview/index.js
var replace_preview_default = {
	__depends__: [preview_support_default],
	__init__: ["bpmnReplacePreview"],
	bpmnReplacePreview: ["type", BpmnReplacePreview]
};
// ../../node_modules/bpmn-js/lib/features/snapping/BpmnConnectSnapping.js
init_ModelUtil();
init_dist();
var HIGHER_PRIORITY = 1250;
var BOUNDARY_TO_HOST_THRESHOLD = 40;
var TARGET_BOUNDS_PADDING = 20;
var TASK_BOUNDS_PADDING = 10;
var TARGET_CENTER_PADDING = 20;
var AXES = ["x", "y"];
var abs = Math.abs;
function BpmnConnectSnapping(eventBus) {
	eventBus.on([
		"connect.hover",
		"connect.move",
		"connect.end"
	], HIGHER_PRIORITY, function(event) {
		var context = event.context, canExecute = context.canExecute, start = context.start, hover = context.hover, source = context.source, target = context.target;
		if (event.originalEvent && isCmd(event.originalEvent)) return;
		if (!context.initialConnectionStart) context.initialConnectionStart = context.connectionStart;
		if (canExecute && hover) snapToShape(event, hover, getTargetBoundsPadding(hover));
		if (hover && isAnyType(canExecute, [
			"bpmn:Association",
			"bpmn:DataInputAssociation",
			"bpmn:DataOutputAssociation",
			"bpmn:SequenceFlow"
		])) {
			context.connectionStart = mid$1(start);
			if (isAny(hover, ["bpmn:Event", "bpmn:Gateway"])) snapToPosition(event, mid$1(hover));
			if (isAny(hover, ["bpmn:Task", "bpmn:SubProcess"])) snapToTargetMid(event, hover);
			if (is(source, "bpmn:BoundaryEvent") && target === source.host) snapBoundaryEventLoop(event);
		} else if (isType(canExecute, "bpmn:MessageFlow")) {
			if (is(start, "bpmn:Event")) context.connectionStart = mid$1(start);
			if (is(hover, "bpmn:Event")) snapToPosition(event, mid$1(hover));
		} else context.connectionStart = context.initialConnectionStart;
	});
}
BpmnConnectSnapping.$inject = ["eventBus"];
function snapToShape(event, target, padding) {
	AXES.forEach(function(axis) {
		var dimensionForAxis = getDimensionForAxis(axis, target);
		if (event[axis] < target[axis] + padding) setSnapped(event, axis, target[axis] + padding);
		else if (event[axis] > target[axis] + dimensionForAxis - padding) setSnapped(event, axis, target[axis] + dimensionForAxis - padding);
	});
}
function snapToTargetMid(event, target) {
	var targetMid = mid$1(target);
	AXES.forEach(function(axis) {
		if (isMid(event, target, axis)) setSnapped(event, axis, targetMid[axis]);
	});
}
function snapBoundaryEventLoop(event) {
	var context = event.context, source = context.source, target = context.target;
	if (isReverse(context)) return;
	var sourceMid = mid$1(source), orientation = getOrientation(sourceMid, target, -10), axes = [];
	if (/top|bottom/.test(orientation)) axes.push("x");
	if (/left|right/.test(orientation)) axes.push("y");
	axes.forEach(function(axis) {
		var coordinate = event[axis], newCoordinate;
		if (abs(coordinate - sourceMid[axis]) < BOUNDARY_TO_HOST_THRESHOLD) {
			if (coordinate > sourceMid[axis]) newCoordinate = sourceMid[axis] + BOUNDARY_TO_HOST_THRESHOLD;
			else newCoordinate = sourceMid[axis] - BOUNDARY_TO_HOST_THRESHOLD;
			setSnapped(event, axis, newCoordinate);
		}
	});
}
function snapToPosition(event, position) {
	setSnapped(event, "x", position.x);
	setSnapped(event, "y", position.y);
}
function isType(attrs, type) {
	return attrs && attrs.type === type;
}
function isAnyType(attrs, types) {
	return some(types, function(type) {
		return isType(attrs, type);
	});
}
function getDimensionForAxis(axis, element) {
	return axis === "x" ? element.width : element.height;
}
function getTargetBoundsPadding(target) {
	if (is(target, "bpmn:Task")) return TASK_BOUNDS_PADDING;
	else return TARGET_BOUNDS_PADDING;
}
function isMid(event, target, axis) {
	return event[axis] > target[axis] + TARGET_CENTER_PADDING && event[axis] < target[axis] + getDimensionForAxis(axis, target) - TARGET_CENTER_PADDING;
}
function isReverse(context) {
	var hover = context.hover, source = context.source;
	return hover && source && hover === source;
}
// ../../node_modules/bpmn-js/lib/features/snapping/BpmnCreateMoveSnapping.js
init_ModelUtil();
init_dist();
var HIGH_PRIORITY$1 = 1500;
function BpmnCreateMoveSnapping(eventBus, injector) {
	injector.invoke(CreateMoveSnapping, this);
	eventBus.on(["create.move", "create.end"], HIGH_PRIORITY$1, setSnappedIfConstrained);
	eventBus.on([
		"create.move",
		"create.end",
		"shape.move.move",
		"shape.move.end"
	], HIGH_PRIORITY$1, function(event) {
		var context = event.context, canExecute = context.canExecute, target = context.target;
		if (canExecute && (canExecute === "attach" || canExecute.attach) && !isSnapped(event)) snapBoundaryEvent(event, target);
	});
}
e(BpmnCreateMoveSnapping, CreateMoveSnapping);
BpmnCreateMoveSnapping.$inject = ["eventBus", "injector"];
BpmnCreateMoveSnapping.prototype.initSnap = function(event) {
	var snapContext = CreateMoveSnapping.prototype.initSnap.call(this, event);
	var shape = event.shape;
	var isMove = !!this._elementRegistry.get(shape.id);
	forEach(shape.outgoing, function(connection) {
		var docking = connection.waypoints[0];
		docking = docking.original || docking;
		snapContext.setSnapOrigin(connection.id + "-docking", getDockingSnapOrigin(docking, isMove, event));
	});
	forEach(shape.incoming, function(connection) {
		var docking = connection.waypoints[connection.waypoints.length - 1];
		docking = docking.original || docking;
		snapContext.setSnapOrigin(connection.id + "-docking", getDockingSnapOrigin(docking, isMove, event));
	});
	if (is(shape, "bpmn:Participant")) snapContext.setSnapLocations([
		"top-left",
		"bottom-right",
		"mid"
	]);
	return snapContext;
};
BpmnCreateMoveSnapping.prototype.addSnapTargetPoints = function(snapPoints, shape, target) {
	CreateMoveSnapping.prototype.addSnapTargetPoints.call(this, snapPoints, shape, target);
	var snapTargets = this.getSnapTargets(shape, target);
	forEach(snapTargets, function(snapTarget) {
		if (isContainer(snapTarget) || areAll([shape, snapTarget], "bpmn:TextAnnotation")) {
			snapPoints.add("top-left", topLeft(snapTarget));
			snapPoints.add("bottom-right", bottomRight(snapTarget));
		}
	});
	var elementRegistry = this._elementRegistry;
	forEach(shape.incoming, function(connection) {
		if (elementRegistry.get(shape.id)) {
			if (!includes(snapTargets, connection.source)) snapPoints.add("mid", getMid(connection.source));
			var docking = connection.waypoints[0];
			snapPoints.add(connection.id + "-docking", docking.original || docking);
		}
	});
	forEach(shape.outgoing, function(connection) {
		if (elementRegistry.get(shape.id)) {
			if (!includes(snapTargets, connection.target)) snapPoints.add("mid", getMid(connection.target));
			var docking = connection.waypoints[connection.waypoints.length - 1];
			snapPoints.add(connection.id + "-docking", docking.original || docking);
		}
	});
	if (is(target, "bpmn:SequenceFlow")) snapPoints = this.addSnapTargetPoints(snapPoints, shape, target.parent);
	return snapPoints;
};
BpmnCreateMoveSnapping.prototype.getSnapTargets = function(shape, target) {
	var snapTargets = CreateMoveSnapping.prototype.getSnapTargets.call(this, shape, target);
	if (shape.labelTarget && shape.labelTarget.parent && shape.labelTarget.parent !== target) snapTargets = snapTargets.concat(CreateMoveSnapping.prototype.getSnapTargets.call(this, shape, shape.labelTarget.parent));
	return snapTargets.filter(function(snapTarget, index) {
		return !is(snapTarget, "bpmn:Lane") && snapTargets.indexOf(snapTarget) === index;
	});
};
function snapBoundaryEvent(event, target) {
	var targetTRBL = asTRBL(target);
	var direction = getBoundaryAttachment(event, target);
	var shape = event.context.shape;
	var offset;
	if (shape.parent) offset = {
		x: 0,
		y: 0
	};
	else offset = getMid(shape);
	if (/top/.test(direction)) setSnapped(event, "y", targetTRBL.top - offset.y);
	else if (/bottom/.test(direction)) setSnapped(event, "y", targetTRBL.bottom - offset.y);
	if (/left/.test(direction)) setSnapped(event, "x", targetTRBL.left - offset.x);
	else if (/right/.test(direction)) setSnapped(event, "x", targetTRBL.right - offset.x);
}
function areAll(elements, type) {
	return elements.every(function(el) {
		return is(el, type);
	});
}
function isContainer(element) {
	if (is(element, "bpmn:SubProcess") && isExpanded(element)) return true;
	return is(element, "bpmn:Participant");
}
function setSnappedIfConstrained(event) {
	var createConstraints = event.context.createConstraints;
	if (!createConstraints) return;
	var top = createConstraints.top, right = createConstraints.right, bottom = createConstraints.bottom, left = createConstraints.left;
	if (left && left >= event.x || right && right <= event.x) setSnapped(event, "x", event.x);
	if (top && top >= event.y || bottom && bottom <= event.y) setSnapped(event, "y", event.y);
}
function includes(array, value) {
	return array.indexOf(value) !== -1;
}
function getDockingSnapOrigin(docking, isMove, event) {
	return isMove ? {
		x: docking.x - event.x,
		y: docking.y - event.y
	} : {
		x: docking.x,
		y: docking.y
	};
}
// ../../node_modules/bpmn-js/lib/features/snapping/index.js
var snapping_default = {
	__depends__: [snapping_default$1],
	__init__: ["connectSnapping", "createMoveSnapping"],
	connectSnapping: ["type", BpmnConnectSnapping],
	createMoveSnapping: ["type", BpmnCreateMoveSnapping]
};
// ../../node_modules/bpmn-js/lib/features/search/BpmnSearchProvider.js
function BpmnSearchProvider(elementRegistry, searchPad, canvas, search) {
	this._elementRegistry = elementRegistry;
	this._canvas = canvas;
	this._search = search;
	searchPad.registerProvider(this);
}
BpmnSearchProvider.$inject = [
	"elementRegistry",
	"searchPad",
	"canvas",
	"search"
];
BpmnSearchProvider.prototype.find = function(pattern) {
	var rootElements = this._canvas.getRootElements();
	var elements = this._elementRegistry.filter(function(element) {
		return !isLabel(element) && !rootElements.includes(element);
	});
	return this._search(elements.map((element) => {
		return {
			element,
			label: getLabel(element),
			id: element.id
		};
	}), pattern, { keys: ["label", "id"] }).map(toSearchPadResult);
};
function toSearchPadResult(result) {
	const { item: { element }, tokens } = result;
	return {
		element,
		primaryTokens: tokens.label,
		secondaryTokens: tokens.id
	};
}
// ../../node_modules/bpmn-js/lib/features/search/index.js
var search_default = {
	__depends__: [search_pad_default, search_default$1],
	__init__: ["bpmnSearch"],
	bpmnSearch: ["type", BpmnSearchProvider]
};
// ../../node_modules/bpmn-js/lib/Modeler.js
var initialDiagram = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><bpmn:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" targetNamespace=\"http://bpmn.io/schema/bpmn\" id=\"Definitions_1\"><bpmn:process id=\"Process_1\" isExecutable=\"false\"><bpmn:startEvent id=\"StartEvent_1\"/></bpmn:process><bpmndi:BPMNDiagram id=\"BPMNDiagram_1\"><bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_1\"><bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\"><dc:Bounds height=\"36.0\" width=\"36.0\" x=\"173.0\" y=\"102.0\"/></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>";
function Modeler(options) {
	BaseModeler.call(this, options);
}
e(Modeler, BaseModeler);
Modeler.Viewer = Viewer;
Modeler.NavigatedViewer = NavigatedViewer;
Modeler.prototype.createDiagram = function createDiagram() {
	return this.importXML(initialDiagram);
};
Modeler.prototype._interactionModules = [
	keep_selection_visible_default,
	keyboard_move_default,
	movecanvas_default,
	zoomscroll_default
];
Modeler.prototype._modelingModules = [
	align_elements_default,
	auto_place_default,
	auto_scroll_default,
	auto_resize_default,
	bendpoints_default,
	connect_default,
	connection_preview_default,
	context_pad_default,
	copy_paste_default,
	create_default,
	distribute_elements_default,
	editor_actions_default$1,
	grid_snapping_default,
	interaction_events_default,
	keyboard_default,
	keyboard_move_selection_default,
	label_editing_default,
	label_link_default,
	modeling_default,
	modeling_feedback_default,
	move_default,
	palette_default,
	replace_preview_default,
	resize_default,
	snapping_default,
	search_default,
	outline_default
];
Modeler.prototype._modules = [].concat(Viewer.prototype._modules, Modeler.prototype._interactionModules, Modeler.prototype._modelingModules);
// ../../node_modules/bpmn-js-native-copy-paste/lib/PasteUtil.js
init_dist();
function createReviver(moddle) {
	const elementCache = {};
	return function(key, object) {
		if (isObject(object) && isString(object.$type)) {
			const { id } = object;
			if (id && elementCache[id]) return elementCache[id];
			const type = object.$type;
			const attrs = Object.assign({}, object);
			delete attrs.$type;
			if (!moddle.getTypeDescriptor(type)) return;
			const newElement = moddle.create(type, attrs);
			if (id) elementCache[id] = newElement;
			return newElement;
		}
		return object;
	};
}
// ../../node_modules/@bpmn-io/diagram-js-canvas-lock/lib/CanvasLock.js
function CanvasLock(eventBus, canvas) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	this._locked = false;
}
CanvasLock.$inject = ["eventBus", "canvas"];
CanvasLock.prototype.lock = function() {
	if (this._locked) return;
	this._locked = true;
	this._canvas.getContainer().classList.add("djs-canvas-locked");
	this._eventBus.fire("canvasLock.changed", { locked: true });
};
CanvasLock.prototype.unlock = function() {
	if (!this._locked) return;
	this._locked = false;
	this._canvas.getContainer().classList.remove("djs-canvas-locked");
	this._eventBus.fire("canvasLock.changed", { locked: false });
};
CanvasLock.prototype.isLocked = function() {
	return this._locked;
};
// ../../node_modules/@bpmn-io/diagram-js-canvas-lock/lib/CanvasLockBehavior.js
var VERY_HIGH_PRIORITY$1 = 1e4;
var BLOCKED_EVENTS = [
	"drag.init",
	"contextPad.open.allowed",
	"popupMenu.open.allowed",
	"directEditing.activate.allowed"
];
var ALLOWED_EDITOR_ACTIONS = [
	"stepZoom",
	"zoom",
	"moveCanvas"
];
function CanvasLockBehavior(eventBus, canvasLock, injector) {
	BLOCKED_EVENTS.forEach(function(event) {
		eventBus.on(event, VERY_HIGH_PRIORITY$1, function(e) {
			if (canvasLock.isLocked()) return false;
		});
	});
	eventBus.on("editorActions.allowed", VERY_HIGH_PRIORITY$1, function(event) {
		if (canvasLock.isLocked() && !ALLOWED_EDITOR_ACTIONS.includes(event.action)) return false;
	});
	eventBus.on("canvasLock.changed", function(event) {
		var contextPad = injector.get("contextPad", false);
		var directEditing = injector.get("directEditing", false);
		var dragging = injector.get("dragging", false);
		var popupMenu = injector.get("popupMenu", false);
		if (event.locked) {
			if (contextPad && contextPad.isOpen()) contextPad.close();
			if (directEditing && directEditing.isActive()) directEditing.cancel();
			if (dragging && dragging.context()) dragging.cancel();
			if (popupMenu && popupMenu.isOpen()) popupMenu.close();
		} else {
			var selection = injector.get("selection", false);
			if (contextPad && selection) {
				var selectedElements = selection.get();
				if (selectedElements.length) contextPad.open(selectedElements.length === 1 ? selectedElements[0] : selectedElements);
			}
		}
	});
}
CanvasLockBehavior.$inject = [
	"eventBus",
	"canvasLock",
	"injector"
];
// ../../node_modules/@bpmn-io/diagram-js-canvas-lock/lib/index.js
var lib_default = {
	__init__: ["canvasLock", "canvasLockBehavior"],
	canvasLock: ["type", CanvasLock],
	canvasLockBehavior: ["type", CanvasLockBehavior]
};
// ../../node_modules/bpmn-js-token-simulation/lib/features/disable-modeling/DisableModeling.js
var HIGH_PRIORITY = 10001;
var SIMULATION_EDITOR_ACTIONS = [
	"toggleTokenSimulation",
	"toggleTokenSimulationLog",
	"togglePauseTokenSimulation",
	"resetTokenSimulation"
];
function DisableModeling(eventBus, canvasLock) {
	eventBus.on(TOGGLE_MODE_EVENT, function(event) {
		if (event.active) canvasLock.lock();
		else canvasLock.unlock();
	});
	eventBus.on("editorActions.allowed", HIGH_PRIORITY, function(event) {
		if (SIMULATION_EDITOR_ACTIONS.includes(event.action)) return true;
	});
}
DisableModeling.$inject = ["eventBus", "canvasLock"];
// ../../node_modules/bpmn-js-token-simulation/lib/features/disable-modeling/index.js
var disable_modeling_default = {
	__init__: ["disableModeling"],
	disableModeling: ["type", DisableModeling]
};
// ../../node_modules/bpmn-js-token-simulation/lib/features/toggle-mode/modeler/ToggleMode.js
function ToggleMode(eventBus, canvas, selection, contextPad, translate) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	this._selection = selection;
	this._contextPad = contextPad;
	this._translate = translate;
	this._active = false;
	eventBus.on("import.parse.start", () => {
		if (this._active) {
			this.toggleMode(false);
			eventBus.once("import.done", () => {
				this.toggleMode(true);
			});
		}
	});
	eventBus.on("diagram.init", () => {
		this._canvasParent = this._canvas.getContainer().parentNode;
		this._palette = query(".djs-palette", this._canvas.getContainer());
		this._init();
	});
}
ToggleMode.prototype._init = function() {
	this._container = domify(`
    <div class="bts-toggle-mode">
      <span class="bts-label"></span> <span class="bts-toggle">${ToggleOffIcon()}</span>
    </div>
  `);
	this._label = query(".bts-label", this._container);
	this._label.textContent = this._translate("Token Simulation");
	this._toggle = query(".bts-toggle", this._container);
	event.bind(this._container, "click", () => this.toggleMode());
	this._canvas.getContainer().appendChild(this._container);
};
ToggleMode.prototype._toggleIcon = function(active) {
	this._toggle.innerHTML = active ? ToggleOnIcon() : ToggleOffIcon();
};
ToggleMode.prototype.toggleMode = function(active = !this._active) {
	if (active === this._active) return;
	if (active) {
		classes$1(this._canvasParent).add("simulation");
		classes$1(this._palette).add("hidden");
	} else {
		classes$1(this._canvasParent).remove("simulation");
		classes$1(this._palette).remove("hidden");
		const elements = this._selection.get();
		if (elements.length === 1) this._contextPad.open(elements[0]);
	}
	this._toggleIcon(active);
	this._eventBus.fire(TOGGLE_MODE_EVENT, { active });
	this._active = active;
};
ToggleMode.$inject = [
	"eventBus",
	"canvas",
	"selection",
	"contextPad",
	"translate"
];
// ../../node_modules/bpmn-js-token-simulation/lib/features/toggle-mode/modeler/index.js
var modeler_default$1 = {
	__init__: ["toggleMode"],
	toggleMode: ["type", ToggleMode]
};
// ../../node_modules/bpmn-js-token-simulation/lib/features/editor-actions/EditorActions.js
function EditorActions(eventBus, toggleMode, pauseSimulation, resetSimulation, editorActions, injector) {
	var active = false;
	editorActions.register({ toggleTokenSimulation: function() {
		toggleMode.toggleMode();
	} });
	editorActions.register({ togglePauseTokenSimulation: function() {
		active && pauseSimulation.toggle();
	} });
	editorActions.register({ resetTokenSimulation: function() {
		active && resetSimulation.resetSimulation();
	} });
	const log = injector.get("log", false);
	log && editorActions.register({ toggleTokenSimulationLog: function() {
		log.toggle();
	} });
	eventBus.on(TOGGLE_MODE_EVENT, (event) => {
		active = event.active;
	});
}
EditorActions.$inject = [
	"eventBus",
	"toggleMode",
	"pauseSimulation",
	"resetSimulation",
	"editorActions",
	"injector"
];
// ../../node_modules/bpmn-js-token-simulation/lib/features/editor-actions/index.js
var editor_actions_default = {
	__init__: ["tokenSimulationEditorActions"],
	tokenSimulationEditorActions: ["type", EditorActions]
};
// ../../node_modules/bpmn-js-token-simulation/lib/features/keyboard-bindings/KeyboardBindings.js
var VERY_HIGH_PRIORITY = 1e4;
function KeyboardBindings(eventBus, injector) {
	var editorActions = injector.get("editorActions", false), keyboard = injector.get("keyboard", false);
	if (!keyboard || !editorActions) return;
	var isActive = false;
	function handleKeyEvent(keyEvent) {
		if (isKey(["t", "T"], keyEvent)) {
			editorActions.trigger("toggleTokenSimulation");
			return true;
		}
		if (!isActive) return;
		if (isKey(["l", "L"], keyEvent)) {
			editorActions.trigger("toggleTokenSimulationLog");
			return true;
		}
		if (isKey([" ", "Spacebar"], keyEvent)) {
			editorActions.trigger("togglePauseTokenSimulation");
			return true;
		}
		if (isKey(["r", "R"], keyEvent)) {
			editorActions.trigger("resetTokenSimulation");
			return true;
		}
	}
	eventBus.on("keyboard.init", function() {
		keyboard.addListener(VERY_HIGH_PRIORITY, function(event) {
			var keyEvent = event.keyEvent;
			return handleKeyEvent(keyEvent);
		});
	});
	eventBus.on(TOGGLE_MODE_EVENT, function(context) {
		if (context.active) isActive = true;
		else isActive = false;
	});
}
KeyboardBindings.$inject = ["eventBus", "injector"];
function isKey(keys, event) {
	return keys.indexOf(event.key) > -1;
}
// ../../node_modules/bpmn-js-token-simulation/lib/modeler.js
var modeler_default = { __depends__: [
	base_default,
	lib_default,
	disable_modeling_default,
	modeler_default$1,
	editor_actions_default,
	{
		__init__: ["tokenSimulationKeyboardBindings"],
		tokenSimulationKeyboardBindings: ["type", KeyboardBindings]
	}
] };
// ../../libs/append-menu/src/templateEntryKey.ts
var TEMPLATE_MARKER = "template-";
function templateMarkerIndex(key) {
	if (key.startsWith(TEMPLATE_MARKER)) return 0;
	const dotted = key.indexOf(`.${TEMPLATE_MARKER}`);
	return dotted < 0 ? -1 : dotted + 1;
}
function templateIdOfEntryKey(key) {
	const at = templateMarkerIndex(key);
	if (at < 0) return;
	const id = key.slice(at + 9);
	return id === "" ? void 0 : id;
}
// ../../libs/append-menu/src/types.ts
function isTemplateEntry(key, entry) {
	return isTemplateKey(key) || !!entry.imageUrl;
}
function isTemplateKey(key) {
	return templateIdOfEntryKey(key) !== void 0;
}
function flattenTemplateEntry(id, entry, template, node = template) {
	if (!entry.entries) return [{
		id,
		entry,
		template,
		presetId: node?.presetId
	}];
	return Object.entries(entry.entries).flatMap(([stepKey, step], index) => flattenTemplateEntry(`${id}/${stepKey}`, {
		...step,
		label: `${entry.label} › ${step.label}`,
		description: step.description ?? entry.description,
		documentationRef: step.documentationRef ?? entry.documentationRef,
		search: [...searchTermsOf$1(entry), ...searchTermsOf$1(step)]
	}, template, node?.steps?.[index]));
}
function classifyEntries(entries, allTemplates = []) {
	const templates = [];
	const groupMap = new Map();
	const templateIndex = new Map();
	for (const t of allTemplates) templateIndex.set(t.id, t);
	const classify = (key, entry, inheritedGroup) => {
		if (entry.entries && !isTemplateKey(key)) {
			const categoryGroup = {
				id: key,
				name: entry.label
			};
			for (const [childKey, child] of Object.entries(entry.entries)) classify(childKey, child, categoryGroup);
			return;
		}
		if (isTemplateEntry(key, entry)) {
			const templateId = templateIdOfEntryKey(key);
			const template = templateId ? templateIndex.get(templateId) : void 0;
			templates.push(...flattenTemplateEntry(key, entry, template));
			return;
		}
		if (!entry.action) return;
		const group = entry.group ?? inheritedGroup;
		const groupId = group?.id ?? "other";
		const groupName = group?.name ?? "Other";
		let bpmnGroup = groupMap.get(groupId);
		if (!bpmnGroup) {
			bpmnGroup = {
				id: groupId,
				name: groupName,
				entries: []
			};
			groupMap.set(groupId, bpmnGroup);
		}
		bpmnGroup.entries.push({
			id: key,
			entry
		});
	};
	for (const [key, entry] of Object.entries(entries)) classify(key, entry);
	return {
		templates,
		bpmnGroups: Array.from(groupMap.values())
	};
}
function searchTermsOf$1(entry) {
	if (entry.search === void 0) return [];
	return typeof entry.search === "string" ? [entry.search] : entry.search;
}
function executeEntryAction(action, event) {
	if (!action) return;
	if (typeof action === "function") action(event);
	else if (action.click) action.click(event);
}
var BPMN_TYPE_ICON_MAP = {
	"bpmn:Task": "bpmn-icon-task",
	"bpmn:UserTask": "bpmn-icon-user",
	"bpmn:ServiceTask": "bpmn-icon-service",
	"bpmn:SendTask": "bpmn-icon-send",
	"bpmn:ReceiveTask": "bpmn-icon-receive",
	"bpmn:ManualTask": "bpmn-icon-manual",
	"bpmn:BusinessRuleTask": "bpmn-icon-business-rule",
	"bpmn:ScriptTask": "bpmn-icon-script",
	"bpmn:CallActivity": "bpmn-icon-call-activity",
	"bpmn:SubProcess": "bpmn-icon-subprocess-collapsed",
	"bpmn:Transaction": "bpmn-icon-transaction",
	"bpmn:StartEvent": "bpmn-icon-start-event-none",
	"bpmn:EndEvent": "bpmn-icon-end-event-none",
	"bpmn:IntermediateThrowEvent": "bpmn-icon-intermediate-event-none",
	"bpmn:IntermediateCatchEvent": "bpmn-icon-intermediate-event-none",
	"bpmn:BoundaryEvent": "bpmn-icon-intermediate-event-none",
	"bpmn:ExclusiveGateway": "bpmn-icon-gateway-xor",
	"bpmn:ParallelGateway": "bpmn-icon-gateway-parallel",
	"bpmn:InclusiveGateway": "bpmn-icon-gateway-or",
	"bpmn:ComplexGateway": "bpmn-icon-gateway-complex",
	"bpmn:EventBasedGateway": "bpmn-icon-gateway-eventbased",
	"bpmn:DataObjectReference": "bpmn-icon-data-object",
	"bpmn:DataStoreReference": "bpmn-icon-data-store",
	"bpmn:Participant": "bpmn-icon-participant"
};
function bpmnTypeToIconClass(bpmnType) {
	return BPMN_TYPE_ICON_MAP[bpmnType] ?? "bpmn-icon-task";
}
var BPMN_TYPE_BY_PLAIN_ACTION = new Map(Object.entries({
	"bpmn:Task": "task",
	"bpmn:UserTask": "user-task",
	"bpmn:ServiceTask": "service-task",
	"bpmn:SendTask": "send-task",
	"bpmn:ReceiveTask": "receive-task",
	"bpmn:ManualTask": "manual-task",
	"bpmn:BusinessRuleTask": "rule-task",
	"bpmn:ScriptTask": "script-task",
	"bpmn:CallActivity": "call-activity",
	"bpmn:SubProcess": "expanded-subprocess",
	"bpmn:AdHocSubProcess": "expanded-ad-hoc-subprocess",
	"bpmn:Transaction": "transaction",
	"bpmn:StartEvent": "none-start-event",
	"bpmn:IntermediateThrowEvent": "none-intermediate-throwing",
	"bpmn:BoundaryEvent": "none-boundary-event",
	"bpmn:EndEvent": "none-end-event",
	"bpmn:ExclusiveGateway": "exclusive-gateway",
	"bpmn:ParallelGateway": "parallel-gateway",
	"bpmn:InclusiveGateway": "inclusive-gateway",
	"bpmn:ComplexGateway": "complex-gateway",
	"bpmn:EventBasedGateway": "event-based-gateway",
	"bpmn:DataObjectReference": "data-object-reference",
	"bpmn:DataStoreReference": "data-store-reference",
	"bpmn:Participant": "collapsed-pool"
}).map(([bpmnType, action]) => [action, bpmnType]));
var UPSTREAM_ENTRY_ID = /^(?:append|create)-(.+)$/;
function bpmnTypeOfPlainEntry(entryId) {
	const action = UPSTREAM_ENTRY_ID.exec(entryId)?.[1];
	return action === void 0 ? void 0 : BPMN_TYPE_BY_PLAIN_ACTION.get(action);
}
// ../../libs/append-menu/src/filtering.ts
function bpmnTypeToLabel(bpmnType) {
	return (bpmnType.split(":")[1] ?? bpmnType).replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}
function filterTemplates(entries, search, activeCategory) {
	const q = search.toLowerCase().trim();
	return entries.filter(({ entry, template }) => {
		if (activeCategory && template?.category?.id !== activeCategory) return false;
		if (!q) return true;
		const appliesToLabels = (template?.appliesTo ?? []).map(bpmnTypeToLabel);
		return fieldsInclude([
			entry.label,
			entry.description ?? "",
			template?.category?.name ?? "",
			...searchTermsOf$1(entry),
			...appliesToLabels
		], q);
	});
}
function fieldsInclude(fields, query) {
	return fields.join(" ").toLowerCase().includes(query);
}
function extractCategories(entries) {
	const seen = new Map();
	for (const { template } of entries) if (template?.category) seen.set(template.category.id, template.category.name);
	return Array.from(seen.entries()).map(([id, name]) => ({
		id,
		name
	}));
}
function entryCreatesOneOf(entry, bpmnTypes) {
	const bpmnType = bpmnTypeOfPlainEntry(entry.id);
	return bpmnType !== void 0 && bpmnTypes.has(bpmnType);
}
function resolveSelectedType(entryId, appliesTo) {
	const bpmnType = bpmnTypeOfPlainEntry(entryId);
	return bpmnType !== void 0 && appliesTo.includes(bpmnType) ? bpmnType : void 0;
}
function entryMatchesSearch(entry, query) {
	return fieldsInclude([
		entry.label,
		entry.description ?? "",
		...searchTermsOf$1(entry)
	], query);
}
function findFavouriteEntry(entries, bpmnType) {
	return entries.find((e) => bpmnTypeOfPlainEntry(e.id) === bpmnType);
}
function processPaletteGroups(groups, favourites, search, appliesToFilter) {
	const query = search.toLowerCase().trim();
	const processedGroups = groups.map((group) => ({
		...group,
		entries: group.entries.map((entry) => ({
			...entry,
			disabled: false,
			hidden: (appliesToFilter ? !entryCreatesOneOf(entry, appliesToFilter) : false) || (query ? !entryMatchesSearch(entry.entry, query) : false)
		}))
	}));
	if (favourites.length === 0) return {
		favouriteEntries: [],
		groups: processedGroups
	};
	const allEntries = processedGroups.flatMap((g) => g.entries);
	return {
		favouriteEntries: favourites.map((type) => findFavouriteEntry(allEntries, type)).filter((e) => e !== void 0),
		groups: processedGroups
	};
}
function favouriteNavKey(entryId) {
	return `fav:${entryId}`;
}
function groupNavKey(groupId, entryId) {
	return `grp:${groupId}:${entryId}`;
}
function isEntryDisabled(processed) {
	return processed.disabled || !!processed.entry.disabled;
}
function flattenPaletteItems(processed) {
	const items = [];
	for (const e of processed.favouriteEntries) items.push({
		key: favouriteNavKey(e.id),
		id: e.id,
		entry: e.entry,
		disabled: isEntryDisabled(e),
		hidden: e.hidden
	});
	for (const group of processed.groups) for (const e of group.entries) items.push({
		key: groupNavKey(group.id, e.id),
		id: e.id,
		entry: e.entry,
		disabled: isEntryDisabled(e),
		hidden: e.hidden
	});
	return items;
}
// ../../libs/append-menu/src/navigation.ts
function indexInColumn(h, column) {
	return h?.column === column ? h.index : -1;
}
function itemsOf(cols, column) {
	return column === "templates" ? cols.templates : cols.palette;
}
function firstEnabled(items) {
	for (let i = 0; i < items.length; i++) if (!items[i].disabled) return i;
	return -1;
}
function nearestEnabled(items, preferred) {
	const len = items.length;
	if (len === 0) return -1;
	const start = Math.min(Math.max(preferred, 0), len - 1);
	if (!items[start].disabled) return start;
	for (let d = 1; d < len; d++) {
		const down = start + d;
		if (down < len && !items[down].disabled) return down;
		const up = start - d;
		if (up >= 0 && !items[up].disabled) return up;
	}
	return -1;
}
function initialHighlight(cols) {
	const t = firstEnabled(cols.templates);
	if (t >= 0) return {
		column: "templates",
		index: t
	};
	const p = firstEnabled(cols.palette);
	if (p >= 0) return {
		column: "palette",
		index: p
	};
	return null;
}
function moveVertical(h, dir, cols) {
	const items = itemsOf(cols, h.column);
	const len = items.length;
	if (len === 0) return h;
	let next = h.index;
	for (let step = 0; step < len; step++) {
		next = (next + dir + len) % len;
		if (!items[next].disabled) return {
			column: h.column,
			index: next
		};
	}
	return h;
}
function moveHorizontal(h, dir, cols) {
	const target = dir > 0 ? "palette" : "templates";
	if (target === h.column) return h;
	const index = nearestEnabled(itemsOf(cols, target), h.index);
	if (index < 0) return h;
	return {
		column: target,
		index
	};
}
// ../../libs/append-menu/src/positioning.ts
var EDGE_GAP = 8;
var HOVER_CARD_WIDTH = 300;
var HOVER_CARD_MIN_HEIGHT = 200;
function clampToCanvas(anchor, panelSize, canvasBounds) {
	return {
		left: clampToCanvasAxis(anchor.x, panelSize.width, canvasBounds.left, canvasBounds.right),
		top: clampToCanvasAxis(anchor.y, panelSize.height, canvasBounds.top, canvasBounds.bottom)
	};
}
function clampToCanvasAxis(anchor, panelExtent, canvasStart, canvasEnd) {
	const min = canvasStart + EDGE_GAP;
	const max = canvasEnd - panelExtent - EDGE_GAP;
	return max < min ? Math.max(EDGE_GAP, max) : Math.min(Math.max(anchor, min), max);
}
function hoverCardPosition(anchor, viewport) {
	const left = hoverCardLeft(anchor, viewport.width);
	const top = Math.max(EDGE_GAP, Math.min(anchor.cardTop, viewport.height - HOVER_CARD_MIN_HEIGHT));
	return {
		top,
		left,
		maxHeight: viewport.height - top - EDGE_GAP
	};
}
function hoverCardLeft({ panelLeft, panelRight }, viewportWidth) {
	const leftOfPanel = panelLeft - HOVER_CARD_WIDTH - EDGE_GAP;
	if (leftOfPanel >= EDGE_GAP) return leftOfPanel;
	if (panelRight !== void 0 && panelRight + HOVER_CARD_WIDTH + 16 <= viewportWidth) return panelRight + EDGE_GAP;
	return EDGE_GAP;
}
// ../../libs/append-menu/src/templateTypeAction.ts
function offersTypePick(template) {
	return !!template && !template.elementType && template.appliesTo.length > 1;
}
var NON_AUTO_PLACEABLE = new Set(["bpmn:BoundaryEvent"]);
function executeTemplateTypeAction(services, context, template, bpmnType, event, presetId) {
	const { elementTemplates, autoPlace, create, mouse } = services;
	const { providerId, target } = context;
	const typed = {
		...template,
		elementType: { value: bpmnType }
	};
	const newElement = elementTemplates.createElement(typed, { presetId });
	if (providerId === "bpmn-append" && autoPlace && !NON_AUTO_PLACEABLE.has(bpmnType)) {
		autoPlace.append(target, newElement);
		return;
	}
	const startEvent = event instanceof KeyboardEvent ? mouse?.getLastMoveEvent() ?? event : event;
	create.start(startEvent, newElement, providerId === "bpmn-append" ? { source: target } : void 0);
}
// ../../node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var f = 0;
Array.isArray;
function u(e, t, n, o, i, u) {
	t || (t = {});
	var a, c, p = t;
	if ("ref" in p) for (c in p = {}, t) "ref" == c ? a = t[c] : p[c] = t[c];
	var l$1 = {
		type: e,
		props: p,
		key: n,
		ref: a,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: --f,
		__i: -1,
		__u: 0,
		__source: i,
		__self: u
	};
	if ("function" == typeof e && (a = e.defaultProps)) for (c in a) void 0 === p[c] && (p[c] = a[c]);
	return l.vnode && l.vnode(l$1), l$1;
}
// ../../libs/append-menu/src/components/ExpandableTemplateCard.tsx
function ExpandableTemplateCard({ enrichedEntry, focused, selected, onClick, onHoverChange }) {
	const { entry, template } = enrichedEntry;
	const appliesTo = template?.appliesTo ?? [];
	return u("div", {
		class: [
			"am-template-card",
			focused ? "am-template-card--focused" : "",
			selected ? "am-template-card--selected" : ""
		].filter(Boolean).join(" "),
		onMouseEnter: () => onHoverChange(true),
		onMouseLeave: () => onHoverChange(false),
		onClick: (e) => onClick(e),
		children: u("div", {
			class: "am-card-header",
			children: [
				appliesTo.length === 1 ? u("span", { class: `am-card-bpmn-icon ${bpmnTypeToIconClass(appliesTo[0])}` }) : u("span", { class: "am-card-bpmn-icon bpmn-icon-task" }),
				u("div", {
					class: "am-card-text",
					children: [u("span", {
						class: "am-card-name",
						children: entry.label
					}), template?.category && u("span", {
						class: "am-badge am-badge--category",
						children: template.category.name
					})]
				}),
				entry.imageUrl && u("img", {
					class: "am-card-template-icon",
					src: entry.imageUrl,
					alt: ""
				})
			]
		})
	});
}
// ../../libs/element-template-chooser/src/types.ts
var fallbackTranslate = (template, replacements = {}) => template.replace(/{([^}]+)}/g, (_, key) => replacements[key] ?? `{${key}}`);
function applyTemplatePreset(template, presetId) {
	const preset = presetId ? template.presets?.find(({ id }) => id === presetId) : void 0;
	if (!preset) return template;
	return {
		...template,
		properties: template.properties.map((property) => property.id !== void 0 && Object.prototype.hasOwnProperty.call(preset.properties, property.id) ? {
			...property,
			value: preset.properties[property.id]
		} : property)
	};
}
function templatePropertyValue(property) {
	const { choices, optional, type, value } = property;
	if (value === void 0 && type === "Dropdown" && !optional && choices?.length) return choices[0].value;
	return value;
}
function templatePropertyDisplayText(property) {
	const value = templatePropertyValue(property);
	return value === void 0 || value === "" ? void 0 : String(value);
}
var IMPLEMENTATION_BINDINGS = [
	{
		label: "Topic",
		bindingType: "property",
		bindingName: "camunda:topic"
	},
	{
		label: "Delegate",
		bindingType: "property",
		bindingName: "camunda:delegateExpression"
	},
	{
		label: "Java class",
		bindingType: "property",
		bindingName: "camunda:class"
	},
	{
		label: "Expression",
		bindingType: "property",
		bindingName: "camunda:expression"
	},
	{
		label: "Called element",
		bindingType: "property",
		bindingName: "calledElement"
	},
	{
		label: "Task Type",
		bindingType: "zeebe:taskDefinition:type"
	},
	{
		label: "Task Type",
		bindingType: "zeebe:taskDefinition",
		bindingProperty: "type"
	}
];
function extractImplementationDetail(properties) {
	for (const { label, bindingType, bindingName, bindingProperty } of IMPLEMENTATION_BINDINGS) {
		const value = properties.filter((p) => p.binding.type === bindingType && (!bindingName || p.binding.name === bindingName) && (!bindingProperty || p.binding.property === bindingProperty)).map(templatePropertyDisplayText).find((text) => text !== void 0);
		if (value) return {
			label,
			value
		};
	}
}
function classifyBinding(binding) {
	const type = binding.type;
	if (type === "camunda:out" || type === "camunda:outputParameter" || type === "zeebe:output") return "output";
	if (type === "camunda:in" || type === "camunda:inputParameter" || type === "camunda:in:businessKey" || type === "zeebe:input") return "input";
	if (type === "property" || type === "zeebe:property") return "property";
	if (type === "zeebe:taskHeader") return "property";
	return "hidden";
}
function partitionVisibleProperties(properties) {
	const visible = properties.filter((property) => property.type !== "Hidden");
	const inDirection = (direction) => visible.filter((property) => classifyBinding(property.binding) === direction);
	return {
		properties: inDirection("property"),
		inputs: inDirection("input"),
		outputs: inDirection("output")
	};
}
function propertyDisplayLabel(property) {
	return property.label ?? property.binding.name ?? property.binding.key;
}
// ../../libs/append-menu/src/components/HoverCard.tsx
function HoverCard({ position, id, role, onHoverChange, children }) {
	return u("div", {
		id,
		role,
		class: "am-hover-card",
		style: {
			position: "fixed",
			top: `${position.top}px`,
			left: `${position.left}px`,
			maxHeight: `${position.maxHeight}px`
		},
		onMouseEnter: () => onHoverChange(true),
		onMouseLeave: () => onHoverChange(false),
		children: u("div", {
			class: "am-hover-card-scroll",
			children
		})
	});
}
// ../../libs/append-menu/src/components/TemplateHoverCard.tsx
function TemplateHoverCard({ enrichedEntry, translate, position, onHoverChange }) {
	const { entry, presetId } = enrichedEntry;
	const template = enrichedEntry.template && applyTemplatePreset(enrichedEntry.template, presetId);
	const implDetail = template ? extractImplementationDetail(template.properties) : void 0;
	const { properties, inputs, outputs } = partitionVisibleProperties(template?.properties ?? []);
	return u(HoverCard, {
		position,
		onHoverChange,
		children: [
			u("div", {
				class: "am-hover-card-header",
				children: [u("h4", {
					class: "am-hover-card-name",
					children: entry.label
				}), implDetail && u("div", {
					class: "am-impl-detail",
					children: [u("span", {
						class: "am-impl-label",
						children: translate(implDetail.label)
					}), u("code", {
						class: "am-impl-value",
						children: implDetail.value
					})]
				})]
			}),
			u("div", {
				class: "am-hover-card-details",
				children: [
					entry.description && u("p", {
						class: "am-hover-card-desc",
						children: entry.description
					}),
					entry.documentationRef && u("a", {
						class: "am-card-docs-link",
						href: entry.documentationRef,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: (e) => e.stopPropagation(),
						children: [u("svg", {
							width: "12",
							height: "12",
							viewBox: "0 0 16 16",
							fill: "currentColor",
							children: [u("path", { d: "M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" }), u("path", { d: "M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z" })]
						}), translate("Documentation")]
					}),
					u("div", {
						class: "am-hover-card-meta",
						children: [template?.category && u("span", {
							class: "am-badge am-badge--category",
							children: template.category.name
						}), template && u("span", {
							class: "am-hover-card-id",
							children: template.id
						})]
					})
				]
			}),
			u("div", {
				class: "am-hover-card-params",
				children: [
					properties.length > 0 && u(ParameterSection, {
						title: translate("Properties"),
						items: properties,
						translate
					}),
					inputs.length > 0 && u(ParameterSection, {
						title: translate("Input Parameters"),
						items: inputs,
						translate
					}),
					outputs.length > 0 && u(ParameterSection, {
						title: translate("Output Parameters"),
						items: outputs,
						translate
					}),
					properties.length === 0 && inputs.length === 0 && outputs.length === 0 && u("p", {
						class: "am-hover-card-no-params",
						children: translate("No visible parameters")
					})
				]
			})
		]
	});
}
function ParameterSection({ title, items, translate }) {
	return u("div", {
		class: "am-hover-param-section",
		children: [u("h5", {
			class: "am-hover-param-title",
			children: title
		}), u("ul", {
			class: "am-hover-param-list",
			children: items.map((p, i) => {
				const displayText = templatePropertyDisplayText(p);
				return u("li", {
					class: "am-hover-param-item",
					children: [
						u("div", {
							class: "am-hover-param-header",
							children: [u("span", {
								class: "am-hover-param-label",
								children: propertyDisplayLabel(p) ?? translate("Unnamed")
							}), u("div", {
								class: "am-hover-param-badges",
								children: [
									p.constraints?.notEmpty && u("span", {
										class: "am-badge am-badge--required",
										children: translate("required")
									}),
									p.editable === false && u("span", {
										class: "am-badge am-badge--readonly",
										children: translate("read-only")
									}),
									p.optional && u("span", {
										class: "am-badge am-badge--optional",
										children: translate("optional")
									})
								]
							})]
						}),
						p.description && u("p", {
							class: "am-hover-param-desc",
							children: p.description
						}),
						displayText && u("code", {
							class: "am-hover-param-value",
							children: displayText
						})
					]
				}, i);
			})
		})]
	});
}
// ../../libs/append-menu/src/components/useHoverCardPosition.ts
function useHoverCardPosition(anchorRef, scrollRef, findPreviewed, { mayOpenRight = false } = {}) {
	const [position, setPosition] = d$1(null);
	const findPreviewedRef = A$1(findPreviewed);
	findPreviewedRef.current = findPreviewed;
	const measure = q(() => {
		const anchor = anchorRef.current;
		const scrollContainer = scrollRef.current;
		const previewed = scrollContainer ? findPreviewedRef.current(scrollContainer) : null;
		const anchorRect = anchor?.getBoundingClientRect();
		const measured = anchorRect && previewed ? hoverCardPosition({
			panelLeft: anchorRect.left,
			panelRight: mayOpenRight ? anchorRect.right : void 0,
			cardTop: previewed.getBoundingClientRect().top
		}, {
			width: window.innerWidth,
			height: window.innerHeight
		}) : null;
		setPosition((current) => isSamePosition(current, measured) ? current : measured);
	}, [
		anchorRef,
		scrollRef,
		mayOpenRight
	]);
	_(measure);
	h$1(() => {
		const scrollContainer = scrollRef.current;
		scrollContainer?.addEventListener("scroll", measure);
		return () => scrollContainer?.removeEventListener("scroll", measure);
	}, [measure, scrollRef]);
	return position;
}
function isSamePosition(a, b) {
	return a?.top === b?.top && a?.left === b?.left && a?.maxHeight === b?.maxHeight;
}
// ../../libs/append-menu/src/components/TemplatePanel.tsx
function TemplatePanel({ entries, categories, translate, search, activeCategory, selectedTemplateId, highlightedIndex, previewIndex, onCategoryChange, onTemplateClick, onCardHover, onPreviewHover }) {
	const panelRef = A$1(null);
	const listRef = A$1(null);
	h$1(() => {
		if (highlightedIndex >= 0 && listRef.current) listRef.current.querySelectorAll(".am-template-card")[highlightedIndex]?.scrollIntoView({ block: "nearest" });
	}, [highlightedIndex]);
	const previewPosition = useHoverCardPosition(panelRef, listRef, (list) => list.querySelectorAll(".am-template-card")[previewIndex]);
	const previewedEntry = previewIndex >= 0 ? entries[previewIndex] : void 0;
	return u("div", {
		class: "am-template-panel",
		ref: panelRef,
		children: [
			categories.length > 0 && u("div", {
				class: "am-filters",
				children: [u("button", {
					class: `am-chip ${activeCategory === null ? "am-chip--active" : ""}`,
					onClick: () => onCategoryChange(null),
					type: "button",
					children: translate("All")
				}), categories.map((cat) => u("button", {
					class: `am-chip ${activeCategory === cat.id ? "am-chip--active" : ""}`,
					onClick: () => onCategoryChange(activeCategory === cat.id ? null : cat.id),
					type: "button",
					children: cat.name
				}, cat.id))]
			}),
			u("div", {
				class: "am-template-list",
				ref: listRef,
				children: entries.length === 0 ? u("div", {
					class: "am-empty",
					children: [u("p", {
						class: "am-empty-text",
						children: translate("No templates found")
					}), search && u("p", {
						class: "am-empty-hint",
						children: translate("Try a different search term")
					})]
				}) : entries.map((enriched, idx) => u(ExpandableTemplateCard, {
					enrichedEntry: enriched,
					focused: highlightedIndex === idx,
					selected: selectedTemplateId === enriched.id,
					onClick: (event) => onTemplateClick(enriched, event),
					onHoverChange: (hovered) => onCardHover(idx, hovered)
				}, enriched.id))
			}),
			previewedEntry && previewPosition && u(TemplateHoverCard, {
				enrichedEntry: previewedEntry,
				translate,
				position: previewPosition,
				onHoverChange: onPreviewHover
			})
		]
	});
}
// ../../libs/append-menu/src/components/ElementDescriptionCard.tsx
function ElementDescriptionCard({ id, entry, position, onHoverChange }) {
	return u(HoverCard, {
		id,
		role: "tooltip",
		position,
		onHoverChange,
		children: [u("h4", {
			class: "am-hover-card-name",
			children: entry.label
		}), u("p", {
			class: "am-hover-card-desc",
			children: entry.description
		})]
	});
}
// ../../libs/append-menu/src/components/BpmnElementPalette.tsx
var descriptionCardCount = 0;
function BpmnElementPalette({ favouriteEntries, groups, translate, expanded, highlightedKey, previewedItem, previewAnchorRef, onToggleExpand, onPeekChange, onEntryHover, onPreviewHover, onSelect }) {
	const contentRef = A$1(null);
	const [descriptionCardId] = d$1(() => `am-element-description-${++descriptionCardCount}`);
	h$1(() => {
		if (highlightedKey && contentRef.current) contentRef.current.querySelector(`[data-nav-key="${highlightedKey}"]`)?.scrollIntoView({ block: "nearest" });
	}, [highlightedKey]);
	const describedItem = previewedItem?.entry.description ? previewedItem : null;
	const descriptionPosition = useHoverCardPosition(previewAnchorRef, contentRef, (content) => describedItem ? content.querySelector(`[data-nav-key="${describedItem.key}"]`) : null, { mayOpenRight: true });
	const renderButton = (processed, navKey) => u(PaletteButton, {
		processed,
		navKey,
		expanded,
		focused: navKey === highlightedKey,
		describedBy: navKey === describedItem?.key ? descriptionCardId : void 0,
		onHoverChange: (hovered) => onEntryHover(navKey, hovered),
		onSelect
	}, navKey);
	return u(S, { children: [u("div", {
		class: `am-palette-panel ${expanded ? "am-palette-panel--expanded" : ""}`,
		onMouseEnter: () => onPeekChange?.(true),
		onMouseLeave: () => onPeekChange?.(false),
		children: [u("div", {
			class: "am-palette-header",
			children: [u("h3", {
				class: "am-palette-title",
				children: translate("BPMN")
			}), u("button", {
				class: "am-palette-toggle",
				onClick: onToggleExpand,
				title: expanded ? translate("Collapse") : translate("Expand"),
				type: "button",
				children: u("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 16 16",
					fill: "currentColor",
					children: expanded ? u("path", { d: "M11.354 8.354a.5.5 0 0 0 0-.708l-4-4a.5.5 0 1 0-.708.708L10.293 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4z" }) : u("path", { d: "M4.646 7.646a.5.5 0 0 1 .708 0L8 10.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708zM4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z" })
				})
			})]
		}), u("div", {
			class: "am-palette-content",
			ref: contentRef,
			children: [favouriteEntries.length > 0 && u("div", {
				class: "am-bpmn-group am-bpmn-group--favourites",
				children: [expanded && u("h4", {
					class: "am-bpmn-group-title",
					children: translate("Favourites")
				}), u("div", {
					class: `am-bpmn-grid ${expanded ? "" : "am-bpmn-grid--compact"}`,
					children: favouriteEntries.filter((processed) => !processed.hidden).map((processed) => renderButton(processed, favouriteNavKey(processed.id)))
				})]
			}), groups.map((group) => {
				const visibleEntries = group.entries.filter((e) => !e.hidden);
				if (visibleEntries.length === 0) return null;
				return u("div", {
					class: "am-bpmn-group",
					children: [expanded && u("h4", {
						class: "am-bpmn-group-title",
						children: group.id === "other" ? translate(group.name) : group.name
					}), u("div", {
						class: `am-bpmn-grid ${expanded ? "" : "am-bpmn-grid--compact"}`,
						children: visibleEntries.map((processed) => renderButton(processed, groupNavKey(group.id, processed.id)))
					})]
				}, group.id);
			})]
		})]
	}), describedItem && descriptionPosition && u(ElementDescriptionCard, {
		id: descriptionCardId,
		entry: describedItem.entry,
		position: descriptionPosition,
		onHoverChange: onPreviewHover
	})] });
}
function PaletteButton({ processed, navKey, expanded, focused, describedBy, onHoverChange, onSelect }) {
	const { entry } = processed;
	const isDisabled = isEntryDisabled(processed);
	return u("button", {
		"data-nav-key": navKey,
		class: `am-bpmn-button ${isDisabled ? "am-bpmn-button--disabled" : ""} ${focused ? "am-bpmn-button--focused" : ""} ${expanded ? "" : "am-bpmn-button--icon-only"}`,
		disabled: isDisabled,
		"aria-describedby": describedBy,
		onClick: (e) => onSelect(processed, e),
		onMouseEnter: () => onHoverChange(true),
		onMouseLeave: () => onHoverChange(false),
		title: entry.label,
		type: "button",
		children: [entry.className && u("span", { class: `am-bpmn-icon ${entry.className}` }), expanded && u("span", {
			class: "am-bpmn-label",
			children: entry.label
		})]
	});
}
// ../../libs/append-menu/src/components/useHoverPreview.ts
var HOVER_HIDE_DELAY = 150;
function useHoverPreview() {
	const [hovered, setHovered] = d$1(null);
	const hideTimeoutRef = A$1(0);
	const hideAfterDelay = q(() => {
		window.clearTimeout(hideTimeoutRef.current);
		hideTimeoutRef.current = window.setTimeout(() => setHovered(null), HOVER_HIDE_DELAY);
	}, []);
	const hoverItem = q((target, entering) => {
		if (entering) {
			window.clearTimeout(hideTimeoutRef.current);
			setHovered(target);
		} else hideAfterDelay();
	}, [hideAfterDelay]);
	const hoverCard = q((entering) => {
		if (entering) window.clearTimeout(hideTimeoutRef.current);
		else hideAfterDelay();
	}, [hideAfterDelay]);
	const clear = q(() => {
		window.clearTimeout(hideTimeoutRef.current);
		setHovered(null);
	}, []);
	h$1(() => () => window.clearTimeout(hideTimeoutRef.current), []);
	return T(() => ({
		hovered,
		hoverItem,
		hoverCard,
		clear
	}), [
		hovered,
		hoverItem,
		hoverCard,
		clear
	]);
}
// ../../libs/append-menu/src/components/AppendMenuOverlay.tsx
function AppendMenuOverlay({ templateEntries, bpmnGroups, favourites, translate, position, canvasBounds, onSelect, onTemplateTypeSelect, onCancel }) {
	const hasTemplates = templateEntries.length > 0;
	const [search, setSearch] = d$1("");
	const [activeCategory, setActiveCategory] = d$1(null);
	const [selectedTemplate, setSelectedTemplate] = d$1(null);
	const [paletteExpanded, setPaletteExpanded] = d$1(!hasTemplates);
	const [palettePeek, setPalettePeek] = d$1(false);
	const [highlight, setHighlight] = d$1(null);
	const hoverPreview = useHoverPreview();
	const searchRef = A$1(null);
	const panelRef = A$1(null);
	const [panelStyle, setPanelStyle] = d$1(null);
	const appliesToFilter = T(() => {
		if (!selectedTemplate?.template) return null;
		return new Set(selectedTemplate.template.appliesTo);
	}, [selectedTemplate]);
	const filteredTemplates = T(() => filterTemplates(templateEntries, search, activeCategory), [
		templateEntries,
		search,
		activeCategory
	]);
	const categories = T(() => extractCategories(templateEntries), [templateEntries]);
	const processedPalette = T(() => processPaletteGroups(bpmnGroups, favourites, search, appliesToFilter), [
		bpmnGroups,
		favourites,
		search,
		appliesToFilter
	]);
	const paletteItems = T(() => flattenPaletteItems(processedPalette), [processedPalette]);
	const paletteNav = T(() => paletteItems.filter((i) => !i.hidden), [paletteItems]);
	const navColumns = T(() => ({
		templates: filteredTemplates.map(() => ({ disabled: false })),
		palette: paletteNav.map((i) => ({ disabled: i.disabled }))
	}), [filteredTemplates, paletteNav]);
	const navColumnsRef = A$1(navColumns);
	navColumnsRef.current = navColumns;
	const selectedTemplateRef = A$1(selectedTemplate);
	selectedTemplateRef.current = selectedTemplate;
	h$1(() => {
		if (panelRef.current) {
			const rect = panelRef.current.getBoundingClientRect();
			setPanelStyle(clampToCanvas(position, rect, canvasBounds));
		}
	}, [position, canvasBounds]);
	h$1(() => {
		searchRef.current?.focus();
	}, []);
	const listsSignature = T(() => filteredTemplates.map((t) => t.id).join("|") + "##" + paletteNav.map((i) => i.key).join("|"), [filteredTemplates, paletteNav]);
	h$1(() => {
		setHighlight(initialHighlight(navColumnsRef.current));
	}, [listsSignature]);
	h$1(hoverPreview.clear, [listsSignature, hoverPreview.clear]);
	h$1(() => {
		if (!selectedTemplate) return;
		setPaletteExpanded(true);
		const idx = navColumnsRef.current.palette.findIndex((i) => !i.disabled);
		if (idx >= 0) setHighlight({
			column: "palette",
			index: idx
		});
	}, [selectedTemplate]);
	h$1(() => {
		const handleKey = (e) => {
			if (e.key !== "Escape") return;
			e.stopPropagation();
			if (selectedTemplateRef.current) {
				setSelectedTemplate(null);
				setHighlight(initialHighlight(navColumnsRef.current));
			} else onCancel();
		};
		document.addEventListener("keydown", handleKey, true);
		return () => document.removeEventListener("keydown", handleKey, true);
	}, [onCancel]);
	const handleTemplateClick = q((enriched, event) => {
		if (!offersTypePick(enriched.template)) onSelect(enriched.entry.action, event);
		else {
			setSelectedTemplate(enriched);
			setSearch("");
		}
	}, [onSelect]);
	const handleBpmnSelect = q((item, event) => {
		if (selectedTemplate?.template) {
			const bpmnType = resolveSelectedType(item.id, selectedTemplate.template.appliesTo);
			if (bpmnType) {
				onTemplateTypeSelect(selectedTemplate.template, bpmnType, event, selectedTemplate.presetId);
				return;
			}
			onSelect(selectedTemplate.entry.action, event);
			return;
		}
		onSelect(item.entry.action, event);
	}, [
		onSelect,
		onTemplateTypeSelect,
		selectedTemplate
	]);
	const activateHighlight = q((event) => {
		if (!highlight) return;
		if (highlight.column === "templates") {
			const enriched = filteredTemplates[highlight.index];
			if (enriched) handleTemplateClick(enriched, event);
		} else {
			const item = paletteNav[highlight.index];
			if (item && !item.disabled) handleBpmnSelect(item, event);
		}
	}, [
		highlight,
		filteredTemplates,
		paletteNav,
		handleTemplateClick,
		handleBpmnSelect
	]);
	const handlePanelKeyDown = q((e) => {
		if (!highlight) return;
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setHighlight(moveVertical(highlight, 1, navColumns));
				break;
			case "ArrowUp":
				e.preventDefault();
				setHighlight(moveVertical(highlight, -1, navColumns));
				break;
			case "ArrowRight": {
				e.preventDefault();
				const next = moveHorizontal(highlight, 1, navColumns);
				setHighlight(next);
				if (next.column === "palette" && !paletteExpanded) setPaletteExpanded(true);
				break;
			}
			case "ArrowLeft":
				e.preventDefault();
				setHighlight(moveHorizontal(highlight, -1, navColumns));
				break;
			case "Enter":
				e.preventDefault();
				activateHighlight(e);
		}
	}, [
		highlight,
		navColumns,
		paletteExpanded,
		activateHighlight
	]);
	const paletteExpandedVisual = paletteExpanded || palettePeek;
	const handlePaletteHover = q((navKey, hovered) => {
		const index = paletteNav.findIndex((item) => item.key === navKey);
		hoverPreview.hoverItem({
			column: "palette",
			index
		}, hovered);
	}, [paletteNav, hoverPreview.hoverItem]);
	const highlightedTemplateIndex = indexInColumn(highlight, "templates");
	const highlightedPaletteKey = paletteNav[indexInColumn(highlight, "palette")]?.key ?? null;
	const previewed = hoverPreview.hovered ?? highlight;
	const previewedTemplateIndex = indexInColumn(previewed, "templates");
	const previewedPaletteItem = paletteNav[indexInColumn(previewed, "palette")] ?? null;
	return u("div", {
		class: "am-click-away",
		onClick: onCancel,
		children: u("div", {
			ref: panelRef,
			class: `am-panel ${hasTemplates ? "" : "am-panel--palette-only"}`,
			style: panelStyle ? {
				left: `${panelStyle.left}px`,
				top: `${panelStyle.top}px`
			} : {
				left: `${position.x}px`,
				top: `${position.y}px`
			},
			onClick: (e) => e.stopPropagation(),
			onKeyDown: handlePanelKeyDown,
			children: [u("div", {
				class: "am-search-wrapper",
				children: [
					u("svg", {
						class: "am-search-icon",
						width: "14",
						height: "14",
						viewBox: "0 0 16 16",
						fill: "currentColor",
						children: u("path", { d: "M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.156a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" })
					}),
					u("input", {
						ref: searchRef,
						class: "am-search-input",
						type: "text",
						placeholder: translate("Search..."),
						value: search,
						onInput: (e) => setSearch(e.target.value)
					}),
					search && u("button", {
						class: "am-search-clear",
						onClick: () => {
							setSearch("");
							searchRef.current?.focus();
						},
						type: "button",
						"aria-label": translate("Clear search"),
						children: "×"
					})
				]
			}), u("div", {
				class: "am-body",
				children: [hasTemplates && u(TemplatePanel, {
					entries: filteredTemplates,
					categories,
					translate,
					search,
					activeCategory,
					selectedTemplateId: selectedTemplate?.id ?? null,
					highlightedIndex: highlightedTemplateIndex,
					previewIndex: previewedTemplateIndex,
					onCategoryChange: setActiveCategory,
					onTemplateClick: handleTemplateClick,
					onCardHover: (index, hovered) => hoverPreview.hoverItem({
						column: "templates",
						index
					}, hovered),
					onPreviewHover: hoverPreview.hoverCard
				}), u(BpmnElementPalette, {
					favouriteEntries: processedPalette.favouriteEntries,
					groups: processedPalette.groups,
					translate,
					expanded: paletteExpandedVisual,
					highlightedKey: highlightedPaletteKey,
					previewedItem: previewedPaletteItem,
					previewAnchorRef: panelRef,
					onToggleExpand: () => setPaletteExpanded((prev) => !prev),
					onPeekChange: setPalettePeek,
					onEntryHover: handlePaletteHover,
					onPreviewHover: hoverPreview.hoverCard,
					onSelect: handleBpmnSelect
				})]
			})]
		})
	});
}
// ../../libs/append-menu/src/upstreamInternals/popupMenuInternals.ts
function getPopupMenuContext(popupMenu, target, providerId) {
	const getContext = popupMenu?._getContext;
	if (typeof getContext !== "function") throw new Error("diagram-js popupMenu internal shape changed: expected `popupMenu._getContext` to be a function. Update popupMenuInternals.ts and its shape test.");
	const context = getContext.call(popupMenu, target, providerId);
	if (!context || typeof context.entries !== "object" || context.entries === null) throw new Error("diagram-js popupMenu._getContext result shape changed: expected an object carrying `entries`. Update popupMenuInternals.ts and its shape test.");
	return context;
}
// ../../libs/append-menu/src/AppendMenuOverride.ts
var _AppendMenuOverride;
var INTERCEPTED_PROVIDERS = new Set(["bpmn-append", "bpmn-create"]);
var MAX_FAVOURITES = 6;
var AppendMenuOverride = class {
	setFavourites(types) {
		this.favourites = types.slice(0, MAX_FAVOURITES);
	}
	constructor(popupMenu, canvas, eventBus, injector) {
		this.favourites = [];
		const elementTemplates = injector.get("elementTemplates", false);
		const translate = injector.get("translate", false) ?? fallbackTranslate;
		const originalOpen = popupMenu.open.bind(popupMenu);
		const originalClose = popupMenu.close.bind(popupMenu);
		const originalIsOpen = popupMenu.isOpen.bind(popupMenu);
		let customMenuOpen = false;
		let closeCustomMenu = null;
		const destroyCustomMenu = () => {
			if (closeCustomMenu) {
				closeCustomMenu();
				closeCustomMenu = null;
			}
			customMenuOpen = false;
		};
		popupMenu.open = (target, providerId, position, options) => {
			if (!INTERCEPTED_PROVIDERS.has(providerId)) return originalOpen(target, providerId, position, options);
			if (customMenuOpen) destroyCustomMenu();
			else if (originalIsOpen()) originalClose();
			const context = getPopupMenuContext(popupMenu, target, providerId);
			let allTemplates = [];
			if (elementTemplates) try {
				allTemplates = elementTemplates.getLatest();
			} catch {}
			const classified = classifyEntries(context.entries, allTemplates);
			const canvasContainer = canvas.getContainer();
			const container = document.createElement("div");
			container.className = "am-overlay-root";
			const themeKind = canvasContainer.closest("[data-bpmn-theme]")?.getAttribute("data-bpmn-theme");
			if (themeKind) container.setAttribute("data-bpmn-theme", themeKind);
			document.body.appendChild(container);
			const close = () => {
				R(null, container);
				container.remove();
			};
			const finishSelection = (run) => {
				close();
				customMenuOpen = false;
				closeCustomMenu = null;
				run();
				queueMicrotask(() => {
					if (injector.get("directEditing", false)?.isActive?.()) return;
					canvas.focus();
				});
			};
			const handleSelect = (action, event) => {
				finishSelection(() => executeEntryAction(action, event));
			};
			const handleTemplateTypeSelect = (template, bpmnType, event, presetId) => {
				const create = injector.get("create", false);
				if (!elementTemplates || !create) return;
				finishSelection(() => executeTemplateTypeAction({
					elementTemplates,
					autoPlace: injector.get("autoPlace", false) || void 0,
					create,
					mouse: injector.get("mouse", false) || void 0
				}, {
					providerId,
					target
				}, template, bpmnType, event, presetId));
			};
			const handleCancel = () => {
				close();
				customMenuOpen = false;
				closeCustomMenu = null;
				canvas.focus();
			};
			const canvasBounds = canvasContainer.getBoundingClientRect();
			R(k(AppendMenuOverlay, {
				templateEntries: classified.templates,
				bpmnGroups: classified.bpmnGroups,
				favourites: this.favourites,
				translate,
				position: {
					x: position.x,
					y: position.y
				},
				canvasBounds: {
					left: canvasBounds.left,
					top: canvasBounds.top,
					right: canvasBounds.right,
					bottom: canvasBounds.bottom
				},
				onSelect: handleSelect,
				onTemplateTypeSelect: handleTemplateTypeSelect,
				onCancel: handleCancel
			}), container);
			customMenuOpen = true;
			closeCustomMenu = close;
		};
		popupMenu.isOpen = () => {
			return customMenuOpen || originalIsOpen();
		};
		popupMenu.close = () => {
			if (customMenuOpen) destroyCustomMenu();
			originalClose();
		};
		eventBus.on([
			"contextPad.close",
			"canvas.viewbox.changing",
			"commandStack.changed"
		], () => {
			if (customMenuOpen) destroyCustomMenu();
		});
	}
};
_AppendMenuOverride = AppendMenuOverride;
_AppendMenuOverride.$inject = [
	"popupMenu",
	"canvas",
	"eventBus",
	"injector"
];
// ../../libs/append-menu/src/index.ts
var AppendMenuModule = {
	__init__: ["appendMenuOverride"],
	appendMenuOverride: ["type", AppendMenuOverride]
};
// ../../libs/flow-navigation/src/contextPadMenu.ts
var SHORTCUT_HINTS = {
	"append": "A",
	"replace": "R",
	"delete": "Del",
	"navigate-to-referenced-model": "G",
	"go-to-implementation": "G",
	"edit-script": "O"
};
function buildMenuEntries(padEntries, trigger) {
	const result = {};
	for (const [id, entry] of Object.entries(padEntries)) {
		if (!hasClickAction(entry)) continue;
		const menuEntry = {
			label: entry.title ?? id,
			action: () => trigger(id)
		};
		if (entry.className) menuEntry.className = entry.className;
		if (entry.imageUrl) menuEntry.imageUrl = entry.imageUrl;
		if (SHORTCUT_HINTS[id]) menuEntry.description = SHORTCUT_HINTS[id];
		result[id] = menuEntry;
	}
	return result;
}
function hasClickAction(entry) {
	if (typeof entry.action === "function") return true;
	if (entry.action && typeof entry.action === "object" && typeof entry.action.click === "function") return true;
	return false;
}
// ../../libs/flow-navigation/src/ContextPadKeyboard.ts
var _ContextPadKeyboard;
var ContextPadKeyboard = class {
	constructor(keyboard, selection, contextPad, popupMenu, _canvas, injector, translate) {
		this.contextPad = contextPad;
		this.translate = translate;
		popupMenu.registerProvider("context-pad-actions", this);
		keyboard.addListener((ctx) => this.handleKeyDown(ctx.keyEvent, keyboard, selection, popupMenu, injector));
	}
	getPopupMenuEntries(target) {
		const contextPad = this.contextPad;
		return buildMenuEntries(contextPad.getEntries(target), (id) => {
			if (!contextPad.isShown()) contextPad.open(target, true);
			contextPad.triggerEntry(id, "click", new Event("click"));
		});
	}
	handleKeyDown(event, keyboard, selection, popupMenu, injector) {
		if (event.key !== "m") return void 0;
		if (keyboard.isCmd(event) || event.altKey) return void 0;
		if (injector.get("directEditing", false)?.isActive()) return void 0;
		if (popupMenu.isOpen()) return void 0;
		const selected = selection.get();
		if (selected.length !== 1) return void 0;
		const target = selected[0];
		const entries = this.getPopupMenuEntries(target);
		if (Object.keys(entries).length === 0) return void 0;
		const rect = this.contextPad.getPad(target).html.getBoundingClientRect();
		const position = {
			x: rect.left,
			y: rect.bottom + 6
		};
		popupMenu.open(target, "context-pad-actions", position, {
			title: this.translate("Element actions"),
			search: true,
			width: 300
		});
		return true;
	}
};
_ContextPadKeyboard = ContextPadKeyboard;
_ContextPadKeyboard.$inject = [
	"keyboard",
	"selection",
	"contextPad",
	"popupMenu",
	"canvas",
	"injector",
	"translate"
];
// ../../libs/flow-navigation/src/traversal.ts
function normalize(el) {
	if (el.type === "label" && el.labelTarget) return el.labelTarget;
	return el;
}
function isSequenceFlow(el) {
	return el.type === "bpmn:SequenceFlow";
}
function sequenceFlows(connections) {
	return connections.filter(isSequenceFlow);
}
function byBounds(a, b) {
	const dy = a.y - b.y;
	return dy !== 0 ? dy : a.x - b.x;
}
function representative(candidate) {
	return candidate.target ?? candidate;
}
function fanOutCandidates(shape) {
	const flows = sequenceFlows(shape.outgoing);
	const boundaries = shape.attachers ?? [];
	return [...flows, ...boundaries].sort((a, b) => byBounds(representative(a), representative(b)));
}
function toStepResult(candidate) {
	return {
		element: candidate,
		boundaryCandidate: candidate.source == null && candidate.host != null
	};
}
function sortByEndpoint(flows, endpoint) {
	return [...flows].sort((a, b) => byBounds(a[endpoint], b[endpoint]));
}
function cycleBy(items, keyOf, current, direction) {
	const sorted = [...items].sort((a, b) => byBounds(keyOf(a), keyOf(b)));
	return sorted[(sorted.findIndex((item) => item.id === current.id) + (direction === "forward" ? 1 : -1) + sorted.length) % sorted.length];
}
function stepFromShape(shape, direction) {
	if (direction === "forward") {
		const candidates = fanOutCandidates(shape);
		if (candidates.length === 0) return null;
		if (candidates.length === 1) {
			const only = candidates[0];
			if (only.target) return {
				element: only.target,
				boundaryCandidate: false
			};
			return {
				element: only,
				boundaryCandidate: false
			};
		}
		return toStepResult(candidates[0]);
	}
	const inc = sequenceFlows(shape.incoming);
	if (inc.length === 0) return shape.host ? {
		element: shape.host,
		boundaryCandidate: false
	} : null;
	return {
		element: sortByEndpoint(inc, "source")[0].source,
		boundaryCandidate: false
	};
}
function stepFromFlow(flow, direction) {
	const srcCandidates = fanOutCandidates(flow.source);
	if (srcCandidates.length > 1) return toStepResult(cycleBy(srcCandidates, representative, flow, direction));
	return direction === "forward" ? {
		element: flow.target,
		boundaryCandidate: false
	} : {
		element: flow.source,
		boundaryCandidate: false
	};
}
function gatherFlowNodes(children) {
	const nodes = [];
	for (const el of children) {
		if (el.type === "label" || el.source != null) continue;
		if (el.type === "bpmn:Participant" && el.children) nodes.push(...gatherFlowNodes(el.children));
		else nodes.push(el);
	}
	return nodes;
}
function resolveStep(current, direction, currentIsBoundaryCandidate = false) {
	const el = normalize(current);
	if (currentIsBoundaryCandidate && el.host) {
		const hostCandidates = fanOutCandidates(el.host);
		if (hostCandidates.length > 1) return toStepResult(cycleBy(hostCandidates, representative, el, direction));
	}
	if (el.source != null && el.target != null) return stepFromFlow(el, direction);
	return stepFromShape(el, direction);
}
function resolveFollow(current, direction, currentIsBoundaryCandidate = false) {
	const el = normalize(current);
	if (el.type === "bpmn:SequenceFlow" && el.source && el.target) return {
		element: direction === "forward" ? el.target : el.source,
		boundaryCandidate: false
	};
	if (currentIsBoundaryCandidate) return {
		element: el,
		boundaryCandidate: false
	};
	return null;
}
function resolveDeleteAnchor(deleted) {
	if (deleted.length === 0) return null;
	const deletedIds = new Set(deleted.map((el) => el.id));
	const primary = normalize(deleted[0]);
	if (primary.source != null && primary.target != null) {
		if (!deletedIds.has(primary.source.id)) return primary.source;
		if (!deletedIds.has(primary.target.id)) return primary.target;
		return null;
	}
	const inc = sortByEndpoint(sequenceFlows(primary.incoming), "source");
	for (const f of inc) if (!deletedIds.has(f.source.id)) return f.source;
	const out = sortByEndpoint(sequenceFlows(primary.outgoing), "target");
	for (const f of out) if (!deletedIds.has(f.target.id)) return f.target;
	if (primary.host && !deletedIds.has(primary.host.id)) return primary.host;
	return null;
}
function resolveEntry(rootChildren, direction) {
	const nodes = gatherFlowNodes(rootChildren);
	if (nodes.length === 0) return null;
	if (direction === "forward") {
		const starts = nodes.filter((n) => n.type === "bpmn:StartEvent").sort(byBounds);
		if (starts.length > 0) return starts[0];
		const noIncoming = nodes.filter((n) => sequenceFlows(n.incoming).length === 0).sort(byBounds);
		if (noIncoming.length > 0) return noIncoming[0];
		return [...nodes].sort(byBounds)[0];
	}
	const ends = nodes.filter((n) => n.type === "bpmn:EndEvent").sort(byBounds);
	if (ends.length > 0) return ends[0];
	const noOutgoing = nodes.filter((n) => sequenceFlows(n.outgoing).length === 0).sort(byBounds);
	if (noOutgoing.length > 0) return noOutgoing[0];
	return [...nodes].sort(byBounds)[0];
}
// ../../libs/flow-navigation/src/DeleteSelectionBehavior.ts
var _DeleteSelectionBehavior;
var DeleteSelectionBehavior = class {
	constructor(eventBus, selection, canvas, elementRegistry) {
		eventBus.on("commandStack.elements.delete.preExecute", (e) => {
			const anchor = resolveDeleteAnchor(e.context.elements);
			if (anchor) e.context.selectionAnchorId = anchor.id;
		});
		eventBus.on("commandStack.elements.delete.postExecuted", 250, (e) => {
			const anchorId = e.context.selectionAnchorId;
			if (!anchorId) return;
			const element = elementRegistry.get(anchorId);
			if (!element) return;
			selection.select(element);
			canvas.scrollToElement(element);
		});
	}
};
_DeleteSelectionBehavior = DeleteSelectionBehavior;
_DeleteSelectionBehavior.$inject = [
	"eventBus",
	"selection",
	"canvas",
	"elementRegistry"
];
// ../../libs/flow-navigation/src/FlowNavigation.ts
var _FlowNavigation;
var FlowNavigation = class {
	constructor(keyboard, selection, canvas, injector, eventBus) {
		this.boundaryCandidateId = null;
		this.applyingSelection = false;
		this.keyboard = keyboard;
		this.selection = selection;
		this.canvas = canvas;
		this.injector = injector;
		keyboard.addListener((ctx) => this.handleKeyDown(ctx.keyEvent));
		eventBus.on("selection.changed", () => {
			if (!this.applyingSelection) this.boundaryCandidateId = null;
		});
	}
	handleKeyDown(event) {
		if (event.key !== "Tab" && event.key !== "Enter") return void 0;
		if (this.keyboard.isCmd(event) || event.altKey) return void 0;
		if (this.injector.get("directEditing", false)?.isActive()) return void 0;
		if (this.injector.get("popupMenu", false)?.isOpen()) return void 0;
		const direction = this.keyboard.isShift(event) ? "backward" : "forward";
		const selected = this.selection.get();
		const root = this.canvas.getRootElement();
		if (selected.length === 0) return this.handleEmpty(root, direction, event.key);
		const anchor = selected[selected.length - 1];
		if (anchor.parent) {
			let anchorRoot = anchor;
			while (anchorRoot.parent) anchorRoot = anchorRoot.parent;
			if (anchorRoot.id !== root.id) return this.handleEmpty(root, direction, event.key);
		}
		if (event.key === "Tab") return this.handleTab(anchor, direction);
		return this.handleEnter(anchor, direction);
	}
	handleEmpty(root, direction, key) {
		const entry = resolveEntry(root.children ?? [], direction);
		if (entry) this.applySelection({
			element: entry,
			boundaryCandidate: false
		});
		return key === "Tab" ? true : void 0;
	}
	handleTab(anchor, direction) {
		const next = resolveStep(anchor, direction, anchor.id === this.boundaryCandidateId);
		if (next) this.applySelection(next);
		return true;
	}
	handleEnter(anchor, direction) {
		const next = resolveFollow(anchor, direction, anchor.id === this.boundaryCandidateId);
		if (!next) return void 0;
		this.applySelection(next);
		return true;
	}
	applySelection(result) {
		this.boundaryCandidateId = result.boundaryCandidate ? result.element.id : null;
		this.applyingSelection = true;
		try {
			this.selection.select(result.element);
		} finally {
			this.applyingSelection = false;
		}
		this.canvas.scrollToElement(result.element);
	}
};
_FlowNavigation = FlowNavigation;
_FlowNavigation.$inject = [
	"keyboard",
	"selection",
	"canvas",
	"injector",
	"eventBus"
];
// ../../libs/flow-navigation/src/LinkNavigation.ts
var _LinkNavigation;
var LINK_ENTRY_IDS = ["navigate-to-referenced-model", "go-to-implementation"];
var LinkNavigation = class {
	constructor(keyboard, selection, contextPad, injector) {
		keyboard.addListener((ctx) => this.handleKeyDown(ctx.keyEvent, keyboard, selection, contextPad, injector));
	}
	handleKeyDown(event, keyboard, selection, contextPad, injector) {
		if (event.key !== "g") return void 0;
		if (keyboard.isCmd(event) || event.altKey || keyboard.isShift(event)) return void 0;
		if (injector.get("directEditing", false)?.isActive()) return void 0;
		if (injector.get("popupMenu", false)?.isOpen()) return void 0;
		const selected = selection.get();
		if (selected.length !== 1) return void 0;
		const target = selected[0];
		const entries = contextPad.getEntries(target);
		const id = LINK_ENTRY_IDS.find((candidate) => candidate in entries);
		if (!id) return void 0;
		if (!contextPad.isShown()) contextPad.open(target, true);
		contextPad.triggerEntry(id, "click", new Event("click"));
		return true;
	}
};
_LinkNavigation = LinkNavigation;
_LinkNavigation.$inject = [
	"keyboard",
	"selection",
	"contextPad",
	"injector"
];
// ../../libs/flow-navigation/src/PlaneNavigation.ts
var _PlaneNavigation;
var PLANE_SUFFIX = "_plane";
var PlaneNavigation = class {
	constructor(keyboard, selection, canvas, elementRegistry, injector) {
		this.keyboard = keyboard;
		this.selection = selection;
		this.canvas = canvas;
		this.elementRegistry = elementRegistry;
		this.injector = injector;
		keyboard.addListener((ctx) => this.handleKeyDown(ctx.keyEvent));
	}
	handleKeyDown(event) {
		if (event.key !== "Enter" && event.key !== "u") return void 0;
		if (this.keyboard.isCmd(event) || event.altKey) return void 0;
		if (this.injector.get("directEditing", false)?.isActive()) return void 0;
		if (this.injector.get("popupMenu", false)?.isOpen()) return void 0;
		if (event.key === "Enter") return this.drillIn(event);
		return this.drillOut();
	}
	drillIn(event) {
		if (this.keyboard.isShift(event)) return void 0;
		const selected = this.selection.get();
		if (selected.length !== 1) return void 0;
		const plane = this.canvas.findRoot(selected[0].id + PLANE_SUFFIX);
		if (!plane) return void 0;
		this.canvas.setRootElement(plane);
		const entry = resolveEntry(plane.children ?? [], "forward");
		if (entry) {
			this.selection.select(entry);
			this.canvas.scrollToElement(entry);
		}
		return true;
	}
	drillOut() {
		const rootId = this.canvas.getRootElement().id;
		if (!rootId.endsWith(PLANE_SUFFIX)) return void 0;
		const shape = this.elementRegistry.get(rootId.slice(0, -6));
		if (!shape) return void 0;
		let parentRoot = shape;
		while (parentRoot.parent) parentRoot = parentRoot.parent;
		this.canvas.setRootElement(parentRoot);
		this.selection.select(shape);
		this.canvas.scrollToElement(shape);
		return true;
	}
};
_PlaneNavigation = PlaneNavigation;
_PlaneNavigation.$inject = [
	"keyboard",
	"selection",
	"canvas",
	"elementRegistry",
	"injector"
];
// ../../libs/flow-navigation/src/index.ts
var FlowNavigationModule = {
	__init__: [
		"flowNavigation",
		"deleteSelectionBehavior",
		"contextPadKeyboard",
		"planeNavigation",
		"linkNavigation"
	],
	flowNavigation: ["type", FlowNavigation],
	deleteSelectionBehavior: ["type", DeleteSelectionBehavior],
	contextPadKeyboard: ["type", ContextPadKeyboard],
	planeNavigation: ["type", PlaneNavigation],
	linkNavigation: ["type", LinkNavigation]
};
// ../../libs/bpmn-layout/src/apply/LayoutApplyHandler.ts
var _LayoutApplyHandler;
var MOVE_HINTS = {
	layout: false,
	recurse: false
};
var RESIZE_HINTS = {
	layout: false,
	attachSupport: false
};
var WAYPOINT_HINTS = { createElementsBehavior: false };
var LayoutApplyHandler = class {
	constructor(modeling, elementRegistry) {
		this.modeling = modeling;
		this.elementRegistry = elementRegistry;
	}
	preExecute(context) {
		for (const operation of context.operations) {
			const element = this.elementRegistry.get(operation.id);
			if (!element) continue;
			switch (operation.kind) {
				case "move":
					this.modeling.moveShape(element, operation.delta, void 0, MOVE_HINTS);
					break;
				case "resize":
					this.modeling.resizeShape(element, operation.bounds, void 0, RESIZE_HINTS);
					break;
				case "waypoints":
					this.modeling.updateWaypoints(element, operation.waypoints, WAYPOINT_HINTS);
					break;
				case "move-label": this.modeling.moveShape(element, operation.delta);
			}
		}
	}
};
_LayoutApplyHandler = LayoutApplyHandler;
_LayoutApplyHandler.$inject = ["modeling", "elementRegistry"];
// ../../libs/bpmn-layout/src/apply/CleanupHandlers.ts
var _CleanupApplyHandler;
var CLEANUP_COMMAND = "layout.cleanup";
var CLEANUP_MODDLE_COMMAND = "layout.cleanupModdle";
var CleanupApplyHandler = class {
	constructor(modeling, elementRegistry, commandStack) {
		this.modeling = modeling;
		this.elementRegistry = elementRegistry;
		this.commandStack = commandStack;
	}
	preExecute(context) {
		const elements = [];
		const moddleActions = [];
		for (const action of context.actions) switch (action.kind) {
			case "remove-element": {
				const element = this.elementRegistry.get(action.id);
				if (element) elements.push(element);
				break;
			}
			case "set-waypoints": {
				const element = this.elementRegistry.get(action.id);
				if (element) this.modeling.updateWaypoints(element, action.waypoints, WAYPOINT_HINTS);
				break;
			}
			default: moddleActions.push(action);
		}
		if (elements.length > 0) this.modeling.removeElements(elements);
		if (moddleActions.length > 0) this.commandStack.execute(CLEANUP_MODDLE_COMMAND, { actions: moddleActions });
	}
};
_CleanupApplyHandler = CleanupApplyHandler;
_CleanupApplyHandler.$inject = [
	"modeling",
	"elementRegistry",
	"commandStack"
];
var CleanupModdleHandler = class {
	execute(context) {
		const applied = [];
		for (const action of context.actions) if (action.kind === "splice") {
			const index = action.array.indexOf(action.node);
			if (index < 0) continue;
			action.array.splice(index, 1);
			applied.push({
				kind: "splice",
				array: action.array,
				index,
				node: action.node
			});
		} else if (action.kind === "unset") {
			if (!(action.property in action.owner)) continue;
			const value = action.owner[action.property];
			delete action.owner[action.property];
			applied.push({
				kind: "unset",
				owner: action.owner,
				property: action.property,
				value
			});
		}
		context.applied = applied;
		return [];
	}
	revert(context) {
		for (const action of [...context.applied ?? []].reverse()) if (action.kind === "splice") action.array.splice(action.index, 0, action.node);
		else action.owner[action.property] = action.value;
		context.applied = [];
		return [];
	}
};
// ../../libs/bpmn-layout/src/cleanup/rules.ts
var WAYPOINT_EPSILON = .5;
var COLLINEAR_EPSILON = 1;
var CONNECTION_TYPES = new Set([
	"bpmn:SequenceFlow",
	"bpmn:MessageFlow",
	"bpmn:Association",
	"bpmn:DataInputAssociation",
	"bpmn:DataOutputAssociation"
]);
var STANDALONE_ALLOWED = new Set([
	"bpmn:StartEvent",
	"bpmn:EndEvent",
	"bpmn:TextAnnotation",
	"bpmn:Group",
	"bpmn:DataObjectReference",
	"bpmn:DataStoreReference",
	"bpmn:DataObject",
	"bpmn:DataStore"
]);
var LITERAL_CONTAINMENT_PROPERTIES = [
	"rootElements",
	"flowElements",
	"artifacts",
	"laneSets",
	"lanes",
	"childLaneSet",
	"participants",
	"messageFlows",
	"dataInputAssociations",
	"dataOutputAssociations",
	"ioSpecification",
	"dataInputs",
	"dataOutputs"
];
var DI_NAMESPACE_PREFIXES = [
	"bpmndi:",
	"dc:",
	"di:"
];
var ENDPOINT_PROPERTIES = ["sourceRef", "targetRef"];
function descriptorProperties(node) {
	const properties = node.$descriptor?.properties;
	return Array.isArray(properties) ? properties : void 0;
}
function containmentProperties(node) {
	const properties = descriptorProperties(node);
	if (!properties) return LITERAL_CONTAINMENT_PROPERTIES;
	return properties.filter((property) => !property.isAttr && !property.isReference && property.type?.includes(":") && !DI_NAMESPACE_PREFIXES.some((prefix) => property.type?.startsWith(prefix))).map((property) => property.name);
}
function forEachChild(node, visit) {
	for (const key of containmentProperties(node)) {
		const value = node[key];
		if (Array.isArray(value)) value.forEach((child) => visit(child));
		else if (value && typeof value === "object") visit(value);
	}
}
function asArray$1(value) {
	return Array.isArray(value) ? value : [];
}
function refId$1(value) {
	if (typeof value === "string") return value;
	if (value && typeof value === "object") {
		const id = value.id;
		return typeof id === "string" ? id : void 0;
	}
}
function referencedIds(node, property) {
	const value = node[property];
	if (value === void 0 || value === null) return [];
	return (Array.isArray(value) ? value : [value]).map(refId$1).filter((id) => id !== void 0);
}
function isSingleValued(node, property) {
	const descriptor = descriptorProperties(node)?.find((entry) => entry.name === property);
	if (!descriptor) return !Array.isArray(node[property]);
	return !descriptor.isMany;
}
function describe(node) {
	const name = typeof node.name === "string" && node.name ? ` “${node.name}”` : "";
	return `${node.$type}${name}${node.id ? ` (${node.id})` : ""}`;
}
function spliceAction(array, node) {
	const index = array.indexOf(node);
	return index < 0 ? void 0 : {
		kind: "splice",
		array,
		index,
		node
	};
}
function indexModelElements(definitions) {
	const index = new Map();
	const visit = (node) => {
		if (node.id && !index.has(node.id)) index.set(node.id, node);
		forEachChild(node, visit);
	};
	visit(definitions);
	return index;
}
function connectedIds(index) {
	const connected = new Set();
	for (const node of index.values()) {
		if (!CONNECTION_TYPES.has(node.$type)) continue;
		for (const property of ENDPOINT_PROPERTIES) for (const id of referencedIds(node, property)) connected.add(id);
	}
	return connected;
}
function idsWithDi(definitions) {
	const withDi = new Set();
	for (const diagram of asArray$1(definitions.diagrams)) {
		const plane = diagram.plane;
		if (!plane) continue;
		const planeElementId = refId$1(plane.bpmnElement);
		if (planeElementId) withDi.add(planeElementId);
		for (const element of asArray$1(plane.planeElement)) {
			const id = refId$1(element.bpmnElement);
			if (id) withDi.add(id);
		}
	}
	return withDi;
}
function isDuplicatePoint(a, b) {
	return Math.abs(a.x - b.x) < WAYPOINT_EPSILON && Math.abs(a.y - b.y) < WAYPOINT_EPSILON;
}
function isRedundantBend(previous, point, next) {
	const ax = point.x - previous.x;
	const ay = point.y - previous.y;
	const bx = next.x - point.x;
	const by = next.y - point.y;
	if (Math.abs(ax * by - ay * bx) >= COLLINEAR_EPSILON) return false;
	const withinX = point.x >= Math.min(previous.x, next.x) - WAYPOINT_EPSILON && point.x <= Math.max(previous.x, next.x) + WAYPOINT_EPSILON;
	const withinY = point.y >= Math.min(previous.y, next.y) - WAYPOINT_EPSILON && point.y <= Math.max(previous.y, next.y) + WAYPOINT_EPSILON;
	return withinX && withinY;
}
function tidyWaypoints(waypoints) {
	if (waypoints.length < 2) return waypoints;
	const withoutDuplicates = [waypoints[0]];
	for (let i = 1; i < waypoints.length; i++) {
		const point = waypoints[i];
		const isLast = i === waypoints.length - 1;
		if (!isDuplicatePoint(withoutDuplicates[withoutDuplicates.length - 1], point) || isLast) withoutDuplicates.push(point);
	}
	const tidied = [withoutDuplicates[0]];
	for (let i = 1; i < withoutDuplicates.length - 1; i++) {
		const previous = tidied[tidied.length - 1];
		if (isRedundantBend(previous, withoutDuplicates[i], withoutDuplicates[i + 1])) continue;
		tidied.push(withoutDuplicates[i]);
	}
	tidied.push(withoutDuplicates[withoutDuplicates.length - 1]);
	return tidied;
}
function inspectWaypoints(edge, elementId, label) {
	const waypoints = asArray$1(edge.waypoint);
	if (waypoints.length < 2) return [];
	const findings = [];
	const tidied = tidyWaypoints(waypoints);
	if (tidied.length === waypoints.length) return findings;
	const hasDuplicate = waypoints.some((point, i) => i > 0 && isDuplicatePoint(waypoints[i - 1], point));
	const action = {
		kind: "set-waypoints",
		id: elementId,
		waypoints: tidied
	};
	if (hasDuplicate) findings.push({
		item: {
			kind: "duplicate-waypoints",
			id: elementId,
			label: `Duplicate waypoint on ${label}`
		},
		actions: [action]
	});
	else findings.push({
		item: {
			kind: "collinear-waypoints",
			id: elementId,
			label: `Redundant bend on ${label}`
		},
		actions: [action]
	});
	return findings;
}
function inspectDi(definitions, index) {
	const findings = [];
	const diagrams = asArray$1(definitions.diagrams);
	for (const diagram of diagrams) {
		const plane = diagram.plane;
		if (!plane) continue;
		const planeElementId = refId$1(plane.bpmnElement);
		if (!planeElementId || !index.has(planeElementId)) {
			const action = spliceAction(diagrams, diagram);
			findings.push({
				item: {
					kind: "dangling-plane",
					id: diagram.id,
					label: planeElementId ? `Diagram plane for missing element ${planeElementId}` : "Diagram plane without an element reference"
				},
				actions: action ? [action] : []
			});
			continue;
		}
		const planeElements = asArray$1(plane.planeElement);
		const seen = new Set();
		for (const element of planeElements) {
			const id = refId$1(element.bpmnElement);
			if (!id || !index.has(id)) {
				const action = spliceAction(planeElements, element);
				findings.push({
					item: {
						kind: "orphan-di",
						id: element.id,
						label: `${element.$type} without a model element`
					},
					actions: action ? [action] : []
				});
				continue;
			}
			if (seen.has(id)) {
				const action = spliceAction(planeElements, element);
				findings.push({
					item: {
						kind: "duplicate-di",
						id: element.id,
						label: `Second ${element.$type} for ${id}`
					},
					actions: action ? [action] : []
				});
				continue;
			}
			seen.add(id);
			const label = element.label;
			if (label) {
				const bounds = label.bounds;
				if (!bounds || bounds.width === 0 && bounds.height === 0) findings.push({
					item: {
						kind: "empty-label-di",
						id,
						label: `Empty label bounds on ${id}`
					},
					actions: [{
						kind: "unset",
						owner: element,
						property: "label",
						value: label
					}]
				});
			}
			if (element.$type === "bpmndi:BPMNEdge") findings.push(...inspectWaypoints(element, id, describe(index.get(id))));
		}
	}
	return findings;
}
function hasUnresolvedEndpoint(node, index) {
	return ENDPOINT_PROPERTIES.some((property) => {
		const ids = referencedIds(node, property);
		if (ids.length === 0) return isSingleValued(node, property);
		return ids.some((id) => !index.has(id));
	});
}
function inspectSemantics(definitions, index, connected, withDi) {
	const findings = [];
	for (const node of index.values()) {
		if (CONNECTION_TYPES.has(node.$type)) {
			if (hasUnresolvedEndpoint(node, index)) findings.push({
				item: {
					kind: "dangling-flow",
					id: node.id,
					label: `${describe(node)} with an unresolved endpoint`
				},
				actions: node.id ? [{
					kind: "remove-element",
					id: node.id
				}] : []
			});
			continue;
		}
		if (node.$type === "bpmn:Lane") {
			const refs = asArray$1(node.flowNodeRef);
			const stale = refs.filter((ref) => {
				const id = refId$1(ref);
				return !id || !index.has(id);
			});
			if (stale.length > 0) findings.push({
				item: {
					kind: "stale-flow-node-ref",
					id: node.id,
					label: `${stale.length} stale flow node reference(s) on ${describe(node)}`
				},
				actions: stale.map((ref) => spliceAction(refs, ref)).filter((action) => Boolean(action)).sort((a, b) => b.index - a.index)
			});
			continue;
		}
		if (node.$type === "bpmn:LaneSet" && asArray$1(node.lanes).length === 0) {
			const owner = node.$parent;
			const action = owner ? spliceAction(asArray$1(owner.laneSets), node) : void 0;
			findings.push({
				item: {
					kind: "empty-container",
					id: node.id,
					label: `Empty lane set${node.id ? ` (${node.id})` : ""}`
				},
				actions: action ? [action] : []
			});
			continue;
		}
		if (!node.id || STANDALONE_ALLOWED.has(node.$type)) continue;
		if (node.$type === "bpmn:BoundaryEvent" && refId$1(node.attachedToRef)) continue;
		if (connected.has(node.id)) continue;
		if (withDi.has(node.id)) continue;
		if (!isFlowNode(node)) continue;
		findings.push({
			item: {
				kind: "isolated-node",
				id: node.id,
				label: `${describe(node)} is unconnected and has no diagram shape`
			},
			actions: [{
				kind: "remove-element",
				id: node.id
			}]
		});
	}
	findings.push(...inspectEmptyExtensions(definitions));
	return findings;
}
function inspectEmptyExtensions(definitions) {
	const findings = [];
	const visit = (node) => {
		const extensions = node.extensionElements;
		if (extensions && asArray$1(extensions.values).length === 0) findings.push({
			item: {
				kind: "empty-container",
				id: node.id,
				label: `Empty extension elements on ${describe(node)}`
			},
			actions: [{
				kind: "unset",
				owner: node,
				property: "extensionElements",
				value: extensions
			}]
		});
		forEachChild(node, visit);
	};
	visit(definitions);
	return findings;
}
function isFlowNode(node) {
	if (!node.$type.startsWith("bpmn:")) return false;
	return /Task$/.test(node.$type) || /Event$/.test(node.$type) || /Gateway$/.test(node.$type) || node.$type === "bpmn:CallActivity";
}
function collectFindings(definitions) {
	const index = indexModelElements(definitions);
	return [...inspectDi(definitions, index), ...inspectSemantics(definitions, index, connectedIds(index), idsWithDi(definitions))];
}
function findCleanupCandidates(definitions) {
	return collectFindings(definitions).map((finding) => finding.item);
}
function planCleanupActions(definitions) {
	return collectFindings(definitions).flatMap((finding) => finding.actions);
}
// ../../libs/bpmn-layout/src/apply/CleanupService.ts
var _CleanupService;
var CleanupService = class {
	constructor(elementRegistry, commandStack, bpmnjs) {
		this.elementRegistry = elementRegistry;
		this.commandStack = commandStack;
		this.bpmnjs = bpmnjs;
	}
	inspect() {
		return this.guard("reported", () => findCleanupCandidates(this.definitions()));
	}
	apply() {
		return this.guard("applied", () => {
			const definitions = this.definitions();
			const items = findCleanupCandidates(definitions);
			if (items.length === 0) return [];
			const actions = this.resolve(definitions, planCleanupActions(definitions));
			if (actions.length === 0) return [];
			this.commandStack.execute(CLEANUP_COMMAND, { actions });
			return items;
		});
	}
	guard(status, run) {
		try {
			return {
				status,
				items: run()
			};
		} catch (error) {
			return {
				status: "failed",
				items: [],
				message: error instanceof Error ? error.message : String(error)
			};
		}
	}
	resolve(definitions, actions) {
		let index;
		return actions.flatMap((action) => {
			if (action.kind !== "remove-element") return [action];
			if (this.elementRegistry.get(action.id)) return [action];
			index ??= indexModelElements(definitions);
			const node = index.get(action.id);
			const parent = node?.$parent;
			if (!node || !parent) return [];
			for (const value of Object.values(parent)) {
				if (!Array.isArray(value)) continue;
				const at = value.indexOf(node);
				if (at >= 0) return [{
					kind: "splice",
					array: value,
					index: at,
					node
				}];
			}
			return [];
		});
	}
	definitions() {
		return this.bpmnjs.getDefinitions();
	}
};
_CleanupService = CleanupService;
_CleanupService.$inject = [
	"elementRegistry",
	"commandStack",
	"bpmnjs"
];
// ../../libs/bpmn-layout/src/apply/LayoutKeyboard.ts
var _LayoutKeyboard;
var FORMAT_KEY = "l";
var LayoutKeyboard = class {
	constructor(keyboard, injector) {
		this.injector = injector;
		if (!this.injector.get("commandStack", false)) return;
		keyboard.addListener(({ keyEvent }) => this.handle(keyEvent));
	}
	handle(event) {
		if (event.key !== FORMAT_KEY) return;
		if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
		const layouter = this.injector.get("bpmnLayouter", false);
		if (!layouter) return;
		layouter.format();
		return true;
	}
};
_LayoutKeyboard = LayoutKeyboard;
_LayoutKeyboard.$inject = ["keyboard", "injector"];
// ../../libs/bpmn-layout/src/apply/LayoutPaletteProvider.ts
var _LayoutPaletteProvider;
var ANCHOR = "global-connect-tool";
var FORMAT_ICON_HTML = `<div class="entry" draggable="false" style="display:flex;align-items:center;justify-content:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="9" width="5" height="6" rx="1"/><rect x="17" y="3" width="5" height="5" rx="1"/><rect x="17" y="16" width="5" height="5" rx="1"/><path d="M7 12h4"/><path d="M11 12V5.5h6"/><path d="M11 12v6.5h6"/></svg></div>`;
var LayoutPaletteProvider = class {
	constructor(palette, translate, injector) {
		this.translate = translate;
		this.injector = injector;
		if (!this.injector.get("commandStack", false)) return;
		palette.registerProvider(this);
	}
	getPaletteEntries() {
		const entry = {
			group: "tools",
			html: FORMAT_ICON_HTML,
			title: this.translate("Format diagram"),
			action: { click: () => {
				const layouter = this.injector.get("bpmnLayouter", false);
				if (layouter) layouter.format();
			} }
		};
		return (entries) => {
			const ids = Object.keys(entries);
			const at = ids.indexOf(ANCHOR);
			if (at < 0) return {
				...entries,
				"format-diagram": entry
			};
			const reordered = {};
			ids.forEach((id, index) => {
				reordered[id] = entries[id];
				if (index === at) reordered["format-diagram"] = entry;
			});
			return reordered;
		};
	}
};
_LayoutPaletteProvider = LayoutPaletteProvider;
_LayoutPaletteProvider.$inject = [
	"palette",
	"translate",
	"injector"
];
// ../../libs/bpmn-layout/src/plan.ts
var EPSILON = .5;
function samePoint(a, b) {
	return Math.abs(a.x - b.x) < EPSILON && Math.abs(a.y - b.y) < EPSILON;
}
function sameSize(a, b) {
	return Math.abs(a.width - b.width) < EPSILON && Math.abs(a.height - b.height) < EPSILON;
}
function sameWaypoints(a, b) {
	return a.length === b.length && a.every((point, i) => samePoint(point, b[i]));
}
function isAssociation(type) {
	return type.includes("Association");
}
function polylineMidpoint(waypoints) {
	if (waypoints.length === 0) return {
		x: 0,
		y: 0
	};
	if (waypoints.length === 1) return { ...waypoints[0] };
	const segments = waypoints.slice(1).map((point, i) => {
		const previous = waypoints[i];
		return Math.hypot(point.x - previous.x, point.y - previous.y);
	});
	const total = segments.reduce((sum, length) => sum + length, 0);
	if (total === 0) return { ...waypoints[0] };
	let travelled = 0;
	for (let i = 0; i < segments.length; i++) {
		const length = segments[i];
		if (travelled + length >= total / 2) {
			const ratio = length === 0 ? 0 : (total / 2 - travelled) / length;
			const from = waypoints[i];
			const to = waypoints[i + 1];
			return {
				x: from.x + (to.x - from.x) * ratio,
				y: from.y + (to.y - from.y) * ratio
			};
		}
		travelled += length;
	}
	return { ...waypoints[waypoints.length - 1] };
}
function computeLayoutPlan(snapshot, target) {
	const byId = new Map(snapshot.map((element) => [element.id, element]));
	const shapeOperations = [];
	const shapeDeltas = new Map();
	for (const shape of target.shapes) {
		const current = byId.get(shape.id);
		if (!current || current.waypoints) continue;
		const moved = !samePoint(current, shape);
		const resized = !sameSize(current, shape);
		if (!moved && !resized) continue;
		shapeDeltas.set(shape.id, {
			x: shape.x - current.x,
			y: shape.y - current.y
		});
		if (resized) shapeOperations.push({
			kind: "resize",
			id: shape.id,
			bounds: clampSize(shape)
		});
		else shapeOperations.push({
			kind: "move",
			id: shape.id,
			delta: {
				x: shape.x - current.x,
				y: shape.y - current.y
			}
		});
	}
	const edgeOperations = [];
	const associationOperations = [];
	const edgeDeltas = new Map();
	for (const edge of target.edges) {
		const current = byId.get(edge.id);
		if (!current?.waypoints) continue;
		if (sameWaypoints(current.waypoints, edge.waypoints)) continue;
		const before = polylineMidpoint(current.waypoints);
		const after = polylineMidpoint(edge.waypoints);
		edgeDeltas.set(edge.id, {
			x: after.x - before.x,
			y: after.y - before.y
		});
		const operation = {
			kind: "waypoints",
			id: edge.id,
			waypoints: edge.waypoints
		};
		if (isAssociation(current.type)) associationOperations.push(operation);
		else edgeOperations.push(operation);
	}
	const labelOperations = [];
	for (const element of snapshot) {
		if (!element.labelTargetId) continue;
		const delta = shapeDeltas.get(element.labelTargetId) ?? edgeDeltas.get(element.labelTargetId);
		if (!delta || samePoint(delta, {
			x: 0,
			y: 0
		})) continue;
		labelOperations.push({
			kind: "move-label",
			id: element.id,
			delta
		});
	}
	return [
		...shapeOperations,
		...edgeOperations,
		...associationOperations,
		...labelOperations
	];
}
function clampSize(bounds) {
	return {
		x: bounds.x,
		y: bounds.y,
		width: Math.max(10, bounds.width),
		height: Math.max(10, bounds.height)
	};
}
// ../../libs/bpmn-layout/src/preflight.ts
function analyzeLayoutability(model) {
	if (!model.editable) return "UNSUPPORTED_SURFACE";
	if (model.elementCount === 0) return "EMPTY_DIAGRAM";
}
// ../../libs/bpmn-layout/src/apply/Layouter.ts
var _Layouter;
var INVALIDATING_EVENTS = [
	"commandStack.changed",
	"import.done",
	"diagram.clear"
];
var LAYOUT_APPLY_COMMAND = "layout.apply";
var LAYOUT_FORMATTED_EVENT = "layout.formatted";
var STALE_OUTCOME = {
	status: "failed",
	code: "DIAGRAM_CHANGED",
	diagnostics: []
};
var Layouter = class {
	constructor(injector, elementRegistry, commandStack, eventBus, layoutEngine, bpmnjs) {
		this.injector = injector;
		this.elementRegistry = elementRegistry;
		this.commandStack = commandStack;
		this.eventBus = eventBus;
		this.layoutEngine = layoutEngine;
		this.bpmnjs = bpmnjs;
		this.revision = 0;
		this.lifecycle = new DisposableStore();
		for (const event of INVALIDATING_EVENTS) this.eventBus.on(event, () => {
			this.revision++;
		});
		this.eventBus.on("diagram.destroy", () => this.lifecycle.dispose());
	}
	async format() {
		if (this.inFlight) return this.inFlight;
		this.inFlight = this.runAndAnnounce();
		try {
			return await this.inFlight;
		} finally {
			this.inFlight = void 0;
		}
	}
	async runAndAnnounce() {
		let outcome;
		try {
			outcome = await this.runFormat();
		} catch (error) {
			outcome = {
				status: "failed",
				code: "APPLY_FAILED",
				message: messageOf$1(error),
				diagnostics: []
			};
		}
		if (!this.lifecycle.isDisposed) this.eventBus.fire(LAYOUT_FORMATTED_EVENT, outcome);
		return outcome;
	}
	async runFormat() {
		const refusal = analyzeLayoutability(this.describeSurface());
		if (refusal) return {
			status: "failed",
			code: refusal,
			diagnostics: []
		};
		const startedAt = this.revision;
		let xml;
		try {
			const exported = await this.bpmnjs.saveXML({ format: false });
			if (!exported.xml) throw new Error("the modeler produced no XML");
			xml = exported.xml;
		} catch (error) {
			return {
				status: "failed",
				code: "ENGINE_FAILED",
				message: messageOf$1(error),
				diagnostics: []
			};
		}
		if (this.isStale(startedAt)) return STALE_OUTCOME;
		const snapshot = this.snapshot();
		let target;
		try {
			target = await this.layoutEngine.computeLayout(xml);
		} catch (error) {
			return {
				status: "failed",
				code: "ENGINE_FAILED",
				message: messageOf$1(error),
				diagnostics: []
			};
		}
		if (this.isStale(startedAt)) return STALE_OUTCOME;
		const operations = computeLayoutPlan(snapshot, target);
		if (operations.length === 0) return {
			status: "unchanged",
			diagnostics: target.diagnostics
		};
		this.commandStack.execute(LAYOUT_APPLY_COMMAND, { operations });
		return {
			status: "formatted",
			diagnostics: target.diagnostics
		};
	}
	isStale(startedAt) {
		return this.lifecycle.isDisposed || this.revision !== startedAt;
	}
	describeSurface() {
		return {
			editable: Boolean(this.injector.get("modeling", false) && this.injector.get("commandStack", false)),
			elementCount: this.elementRegistry.getAll().filter((element) => element.type !== "label" && element.parent).length
		};
	}
	snapshot() {
		return this.elementRegistry.getAll().map((element) => ({
			id: element.id,
			type: element.type,
			x: element.x ?? 0,
			y: element.y ?? 0,
			width: element.width ?? 0,
			height: element.height ?? 0,
			parentId: element.parent?.id,
			waypoints: element.waypoints?.map((point) => ({
				x: point.x,
				y: point.y
			})),
			labelTargetId: element.labelTarget?.id
		}));
	}
};
_Layouter = Layouter;
_Layouter.$inject = [
	"injector",
	"elementRegistry",
	"commandStack",
	"eventBus",
	"layoutEngine",
	"bpmnjs"
];
function messageOf$1(error) {
	return error instanceof Error ? error.message : String(error);
}
// ../../libs/bpmn-layout/src/port.ts
var LayoutEngineError = class extends Error {
	constructor(message, reason) {
		super(message);
		this.reason = reason;
		this.name = "LayoutEngineError";
	}
};
// ../../libs/bpmn-layout/src/engine/autoLayoutEngine.ts
function asArray(value) {
	return Array.isArray(value) ? value : [];
}
function refId(value) {
	if (typeof value === "string") return value;
	if (value && typeof value === "object") {
		const id = value.id;
		return typeof id === "string" ? id : void 0;
	}
}
function toNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
async function parse(xml) {
	const moddleMod = await __vitePreload(() => import("./createSurface-DyHVIhQM.js").then((n) => n.U), __vite__mapDeps([0,1,2,3,4,5,6,7,8]), import.meta.url);
	const createModdle = moddleMod.default ?? moddleMod.BpmnModdle;
	if (!createModdle) throw new Error("bpmn-moddle exposes no factory");
	const { rootElement } = await createModdle().fromXML(xml);
	return rootElement;
}
function collectGeometry(definitions) {
	const shapes = [];
	const edges = [];
	for (const diagram of asArray(definitions.diagrams)) {
		const plane = diagram.plane;
		if (!plane) continue;
		for (const element of asArray(plane.planeElement)) {
			const id = refId(element.bpmnElement);
			if (!id) continue;
			if (element.$type === "bpmndi:BPMNShape") {
				const bounds = element.bounds;
				const x = toNumber(bounds?.x);
				const y = toNumber(bounds?.y);
				const width = toNumber(bounds?.width);
				const height = toNumber(bounds?.height);
				if (x === void 0 || y === void 0 || width === void 0 || height === void 0) continue;
				shapes.push({
					id,
					x,
					y,
					width,
					height
				});
				continue;
			}
			if (element.$type === "bpmndi:BPMNEdge") {
				const waypoints = asArray(element.waypoint).map((point) => ({
					x: toNumber(point.x),
					y: toNumber(point.y)
				})).filter((point) => point.x !== void 0 && point.y !== void 0);
				if (waypoints.length >= 2) edges.push({
					id,
					waypoints
				});
			}
		}
	}
	return {
		shapes,
		edges
	};
}
function toDiagnostic(warning) {
	return {
		message: warning.message || warning.code || "Layout warning",
		elementId: warning.elementId
	};
}
var BpmnAutoLayoutEngine = class {
	async computeLayout(xml) {
		let laidOutXml;
		let diagnostics;
		const autoLayout = await __vitePreload(() => import("./dist-CpxBSnUu.js"), __vite__mapDeps([9,0,1,2,3,4,5,6,7,8]), import.meta.url).catch((error) => {
			throw new LayoutEngineError(`Could not load the layout engine: ${messageOf(error)}`, error);
		});
		try {
			const { xml: result, warnings } = await autoLayout.layoutProcess(xml);
			laidOutXml = result;
			diagnostics = warnings.map(toDiagnostic);
		} catch (error) {
			throw new LayoutEngineError(describeFailure(error, autoLayout.LayoutError), error);
		}
		try {
			const { shapes, edges } = collectGeometry(await parse(laidOutXml));
			return {
				shapes,
				edges,
				diagnostics
			};
		} catch (error) {
			throw new LayoutEngineError(`Could not read the generated diagram interchange: ${messageOf(error)}`, error);
		}
	}
};
function describeFailure(error, layoutErrorClass) {
	if (error instanceof layoutErrorClass) {
		const where = error.elementId ? ` (${error.elementId})` : "";
		return `${error.message || error.code}${where}`;
	}
	return messageOf(error);
}
function messageOf(error) {
	return error instanceof Error ? error.message : String(error);
}
// ../../libs/bpmn-layout/src/module.ts
var HANDLERS = {
	[LAYOUT_APPLY_COMMAND]: LayoutApplyHandler,
	[CLEANUP_COMMAND]: CleanupApplyHandler,
	[CLEANUP_MODDLE_COMMAND]: CleanupModdleHandler
};
function LayoutCommandInitializer(eventBus, injector) {
	const commandStack = injector.get("commandStack", false);
	if (!commandStack) return;
	eventBus.on("diagram.init", () => {
		for (const [command, handler] of Object.entries(HANDLERS)) commandStack.registerHandler(command, handler);
	});
}
LayoutCommandInitializer.$inject = ["eventBus", "injector"];
function createBpmnLayoutServiceModule(engine) {
	return {
		__init__: ["bpmnLayoutCommands"],
		bpmnLayoutCommands: ["type", LayoutCommandInitializer],
		bpmnLayouter: ["type", Layouter],
		bpmnCleanup: ["type", CleanupService],
		layoutEngine: ["value", engine ?? new BpmnAutoLayoutEngine()]
	};
}
function createBpmnLayoutUiModule() {
	return {
		__init__: ["layoutKeyboard", "layoutPaletteProvider"],
		layoutKeyboard: ["type", LayoutKeyboard],
		layoutPaletteProvider: ["type", LayoutPaletteProvider]
	};
}
function createBpmnLayoutModule(engine) {
	return {
		...createBpmnLayoutServiceModule(engine),
		...createBpmnLayoutUiModule(),
		__init__: [
			"bpmnLayoutCommands",
			"layoutKeyboard",
			"layoutPaletteProvider"
		]
	};
}
// ../../libs/definition-search/src/DefinitionSearchEntry.tsx
var SEARCH_DEBOUNCE_MS = 150;
var MAX_LISTED_USAGES = 3;
var HINTS = {
	searching: "Searching…",
	done: "No matches in other models",
	failed: "Search failed"
};
function DefinitionSearchEntry(props) {
	const { id, kind, search, pick, translate } = props;
	const [text, setText] = d("");
	const [open, setOpen] = d(false);
	const [results, setResults] = d([]);
	const [status, setStatus] = d("searching");
	const [activeIndex, setActiveIndex] = d(0);
	const latestRequest = A(0);
	const query = text.trim();
	const inputId = `bio-properties-panel-${id}`;
	const listId = `${inputId}-results`;
	const optionId = (index) => `${listId}-${index}`;
	const showList = open && query !== "";
	const isLatest = (request) => request === latestRequest.current;
	const runSearch = (request) => search({
		kind,
		text: query
	}).then((found) => {
		if (isLatest(request)) {
			setResults(found);
			setStatus("done");
		}
	}, () => {
		if (isLatest(request)) setStatus("failed");
	});
	const definitionLabel = ({ name, code }) => name && code ? `${name} (${code})` : name ?? code ?? "";
	const describeUsages = (usages) => {
		const byRole = (role) => {
			const names = usages.filter((usage) => usage.role === role).map((usage) => usage.elementName || usage.elementId);
			const listed = names.slice(0, MAX_LISTED_USAGES).join(", ");
			return names.length > MAX_LISTED_USAGES ? `${listed}, …` : listed;
		};
		const thrownBy = byRole("throw");
		const caughtBy = byRole("catch");
		return [thrownBy && translate("thrown by {elements}", { elements: thrownBy }), caughtBy && translate("caught by {elements}", { elements: caughtBy })].filter(Boolean).join(" · ");
	};
	const wrap = (index, length) => length === 0 ? 0 : (index + length) % length;
	h(() => {
		const request = ++latestRequest.current;
		setResults([]);
		setActiveIndex(0);
		setStatus("searching");
		if (!open || !query) return;
		const timer = setTimeout(() => runSearch(request), SEARCH_DEBOUNCE_MS);
		return () => clearTimeout(timer);
	}, [
		open,
		query,
		kind
	]);
	h(() => {
		if (open) document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: "nearest" });
	}, [
		open,
		activeIndex,
		results
	]);
	const close = () => setOpen(false);
	const choose = (definition) => {
		pick(definition);
		setText("");
		close();
	};
	const onKeyDown = (event) => {
		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault();
			setOpen(true);
			const step = event.key === "ArrowDown" ? 1 : -1;
			setActiveIndex((index) => wrap(index + step, results.length));
		} else if (event.key === "Enter" && showList && results[activeIndex]) {
			event.preventDefault();
			choose(results[activeIndex]);
		} else if (event.key === "Escape" && showList) {
			event.preventDefault();
			event.stopPropagation();
			close();
		}
	};
	return u$1("div", {
		class: "bio-properties-panel-entry definition-search",
		"data-entry-id": id,
		children: u$1("div", {
			class: "bio-properties-panel-textfield",
			children: [
				u$1("label", {
					for: inputId,
					class: "bio-properties-panel-label",
					children: translate("Search other models")
				}),
				u$1("input", {
					id: inputId,
					name: id,
					type: "text",
					class: "bio-properties-panel-input",
					role: "combobox",
					autoComplete: "off",
					spellcheck: false,
					placeholder: translate("Name or code"),
					"aria-autocomplete": "list",
					"aria-expanded": showList,
					"aria-controls": listId,
					"aria-activedescendant": showList && results[activeIndex] ? optionId(activeIndex) : void 0,
					value: text,
					onInput: (event) => {
						setText(event.target.value);
						setOpen(true);
					},
					onFocus: () => setOpen(true),
					onClick: () => setOpen(true),
					onBlur: close,
					onKeyDown
				}),
				showList && u$1("ul", {
					id: listId,
					role: "listbox",
					class: "definition-search-results",
					"aria-busy": status === "searching",
					onMouseDown: (event) => event.preventDefault(),
					children: [results.length === 0 && u$1("li", {
						role: "option",
						"aria-disabled": "true",
						class: "definition-search-hint",
						children: translate(HINTS[status])
					}), results.map((definition, index) => {
						const usages = describeUsages(definition.usages);
						return u$1("li", {
							id: optionId(index),
							role: "option",
							"aria-selected": index === activeIndex,
							class: `definition-search-result${index === activeIndex ? " is-active" : ""}`,
							title: [definition.source.path, usages].filter(Boolean).join("\n"),
							onClick: () => choose(definition),
							onMouseEnter: () => setActiveIndex(index),
							children: [u$1("span", {
								class: "definition-search-name",
								children: definitionLabel(definition)
							}), u$1("span", {
								class: "definition-search-detail",
								children: [definition.source.label, usages].filter(Boolean).join(" · ")
							})]
						}, `${definition.source.path}#${index}`);
					})]
				})
			]
		})
	});
}
// ../../libs/definition-search/src/linkDefinition.ts
init_ModelUtil();
var ROOT_ELEMENT_TYPE = {
	message: "bpmn:Message",
	signal: "bpmn:Signal",
	error: "bpmn:Error",
	escalation: "bpmn:Escalation"
};
var EVENT_DEFINITION_TYPE = {
	message: "bpmn:MessageEventDefinition",
	signal: "bpmn:SignalEventDefinition",
	error: "bpmn:ErrorEventDefinition",
	escalation: "bpmn:EscalationEventDefinition"
};
var CODE_PROPERTY = {
	error: "errorCode",
	escalation: "escalationCode"
};
function linkDefinition(element, definition, { bpmnFactory, commandStack }) {
	const { kind } = definition;
	const holder = findReferenceHolder(element, kind);
	const definitions = holder && findDefinitions(holder);
	if (!holder || !definitions) return;
	const commands = [];
	let rootElement = findEqualRootElement(definitions, definition);
	if (!rootElement) {
		rootElement = bpmnFactory.create(ROOT_ELEMENT_TYPE[kind], definitionProperties(definition));
		rootElement.$parent = definitions;
		commands.push({
			cmd: "element.updateModdleProperties",
			context: {
				element,
				moddleElement: definitions,
				properties: { rootElements: [...rootElementsOf(definitions), rootElement] }
			}
		});
	}
	commands.push({
		cmd: "element.updateModdleProperties",
		context: {
			element,
			moddleElement: holder,
			properties: { [`${kind}Ref`]: rootElement }
		}
	});
	commandStack.execute("properties-panel.multi-command-executor", commands);
}
function findReferenceHolder(element, kind) {
	const businessObject = getBusinessObject(element);
	if (kind === "message" && (is(element, "bpmn:ReceiveTask") || is(element, "bpmn:SendTask"))) return businessObject;
	return (businessObject?.get("eventDefinitions") ?? []).find((eventDefinition) => is(eventDefinition, EVENT_DEFINITION_TYPE[kind]));
}
function findDefinitions(moddleElement) {
	let current = moddleElement;
	while (current && !is(current, "bpmn:Definitions")) current = current.$parent;
	return current;
}
function rootElementsOf(definitions) {
	return definitions.get("rootElements") ?? [];
}
function findEqualRootElement(definitions, definition) {
	const codeProperty = CODE_PROPERTY[definition.kind];
	return rootElementsOf(definitions).find((rootElement) => is(rootElement, ROOT_ELEMENT_TYPE[definition.kind]) && (rootElement.get("name") || void 0) === definition.name && (!codeProperty || (rootElement.get(codeProperty) || void 0) === definition.code));
}
function definitionProperties(definition) {
	const codeProperty = CODE_PROPERTY[definition.kind];
	return {
		...definition.name && { name: definition.name },
		...codeProperty && definition.code && { [codeProperty]: definition.code }
	};
}
// ../../libs/definition-search/src/DefinitionSearchPropertiesProvider.ts
var _DefinitionSearchPropertiesProvider;
var DEFINITION_SEARCH_PRIORITY = 200;
var DefinitionSearchPropertiesProvider = class {
	constructor(propertiesPanel, bpmnFactory, commandStack, translate, port) {
		this.bpmnFactory = bpmnFactory;
		this.commandStack = commandStack;
		this.translate = translate;
		this.port = port;
		propertiesPanel.registerProvider(DEFINITION_SEARCH_PRIORITY, this);
	}
	getGroups(element) {
		return (groups) => {
			for (const kind of DEFINITION_KINDS) {
				const entries = groups.find((group) => group?.id === kind)?.entries;
				if (!entries?.some((entry) => entry?.id === `${kind}Ref`)) continue;
				const searchEntry = {
					id: `${kind}Search`,
					component: DefinitionSearchEntry,
					isEdited: () => false,
					kind,
					search: (query) => this.port.search(query),
					pick: (definition) => linkDefinition(element, definition, {
						bpmnFactory: this.bpmnFactory,
						commandStack: this.commandStack
					}),
					translate: this.translate
				};
				entries.push(searchEntry);
			}
			return groups;
		};
	}
};
_DefinitionSearchPropertiesProvider = DefinitionSearchPropertiesProvider;
_DefinitionSearchPropertiesProvider.$inject = [
	"propertiesPanel",
	"bpmnFactory",
	"commandStack",
	"translate",
	"definitionSearchPort"
];
// ../../libs/definition-search/src/index.ts
function createDefinitionSearchModule(port) {
	return {
		__init__: ["definitionSearchPropertiesProvider"],
		definitionSearchPropertiesProvider: ["type", DefinitionSearchPropertiesProvider],
		definitionSearchPort: ["value", port]
	};
}
// ../../packages/bpmn-modeler/src/lintModules.ts
var migrationNoticeShown = false;
function buildLintModules(linting, init, callbacks, opts = {}) {
	if (linting === void 0) {
		if ((opts.nudgeWhenOmitted ?? true) && !migrationNoticeShown) {
			migrationNoticeShown = true;
			console.info("@miragon/bpmn-modeler: linting is off because no lint module was supplied. Pass `linting: { module: await import(\"@miragon/bpmn-modeler/lint\") }` to enable in-page linting, or `linting: false` to silence this notice.");
		}
		return [];
	}
	if (linting === false) return [];
	let tier = "in-page";
	let config;
	if (linting.results === "external") tier = "external";
	else config = linting.config;
	return [linting.module.createLintModule({
		tier,
		engine: init.engine,
		mode: init.mode,
		config
	}, callbacks)];
}
// ../../packages/bpmn-modeler/src/popupMenuAnnotations/popupMenuAnnotations.ts
var MENU_PREFIX = /^(?:create|append)-/;
var REPLACE_PREFIX = /^replace-with-/;
var REPLACE_ACTION_ALIASES = new Map([
	["subprocess", "expanded-subprocess"],
	["ad-hoc-subprocess", "expanded-ad-hoc-subprocess"],
	["none-start", "none-start-event"],
	["none-end", "none-end-event"],
	["none-intermediate-throw", "none-intermediate-throwing"]
]);
function popupEntryKeyOf(entryId) {
	const key = entryId.replace(MENU_PREFIX, "").replace(REPLACE_PREFIX, "");
	if (key === entryId) return;
	return REPLACE_ACTION_ALIASES.get(key) ?? key;
}
var PopupMenuAnnotations = class PopupMenuAnnotations {
	constructor(descriptions, keywords) {
		_defineProperty(this, "descriptions", void 0);
		_defineProperty(this, "keywords", void 0);
		this.descriptions = descriptions;
		this.keywords = keywords;
	}
	static of(descriptions, keywords) {
		return new PopupMenuAnnotations(new Map(Object.entries(descriptions)), new Map(Object.entries(keywords)));
	}
	withOverrides(overrides) {
		const descriptions = new Map(this.descriptions);
		for (const [key, description] of Object.entries(overrides.descriptions ?? {})) descriptions.set(key, description);
		const keywords = new Map(this.keywords);
		for (const [key, additionalKeywords] of Object.entries(overrides.additionalKeywords ?? {})) keywords.set(key, [...keywords.get(key) ?? [], ...additionalKeywords]);
		return new PopupMenuAnnotations(descriptions, keywords);
	}
	translatableTexts() {
		return [...new Set([...this.descriptions.values(), ...[...this.keywords.values()].flat()])];
	}
	forEntry(entryId) {
		const key = popupEntryKeyOf(entryId);
		return key === void 0 ? void 0 : this.forKey(key);
	}
	forKey(key) {
		const description = this.descriptions.get(key);
		const keywords = this.keywords.get(key) ?? [];
		if (description === void 0 && keywords.length === 0) return;
		return description === void 0 ? { keywords } : {
			description,
			keywords
		};
	}
};
function annotateEntry(entry, annotation, translate) {
	const description = entry.description ?? (annotation.description === void 0 ? void 0 : translate(annotation.description));
	const search = annotation.keywords.length === 0 ? entry.search : [...new Set([
		...searchTermsOf(entry),
		...annotation.keywords,
		...annotation.keywords.map(translate)
	])];
	return {
		...entry,
		...description === void 0 ? {} : { description },
		...search === void 0 ? {} : { search }
	};
}
function searchTermsOf(entry) {
	if (entry.search === void 0) return [];
	return typeof entry.search === "string" ? [entry.search] : entry.search;
}
var BASE_POPUP_MENU_ANNOTATIONS = PopupMenuAnnotations.of({
	"task": "An unspecified step, often used as a placeholder",
	"user-task": "Work that needs to be done by a person",
	"service-task": "Automated work carried out by a system",
	"send-task": "Publishes a message to a receiver",
	"receive-task": "Waits for a message to be received",
	"manual-task": "A task done by a person without any tooling or UI",
	"rule-task": "Evaluates a business rule, typically a DMN decision",
	"script-task": "Runs a script",
	"call-activity": "Calls another process as a reusable subprocess",
	"transaction": "A subprocess that completes as a whole, or is compensated",
	"event-subprocess": "A subprocess triggered by an event in its scope",
	"collapsed-subprocess": "Groups elements into a subprocess, shown collapsed",
	"expanded-subprocess": "Groups elements into a subprocess, shown inline",
	"collapsed-ad-hoc-subprocess": "Activities run in any order; shown collapsed",
	"expanded-ad-hoc-subprocess": "Activities run in any order, any number of times",
	"exclusive-gateway": "Routes the token down one path, based on data",
	"parallel-gateway": "Splits the flow into parallel paths, or joins them",
	"inclusive-gateway": "Takes every outgoing path whose condition is met",
	"complex-gateway": "Models complex branching or merging behavior",
	"event-based-gateway": "Follows the path of whichever event occurs first",
	"data-store-reference": "Data that persists beyond the process instance",
	"data-object-reference": "Data created and used within a process instance",
	"expanded-pool": "A participant with its process shown inside",
	"collapsed-pool": "A participant shown as a black box",
	"none-start-event": "Where the process begins",
	"none-intermediate-throwing": "Marks a point in the flow",
	"none-boundary-event": "Handles an event that occurs while an activity is active",
	"none-end-event": "Ends the current path",
	"message-start": "Starts the process when a message is received",
	"timer-start": "Starts the process on a defined timer",
	"conditional-start": "Starts the process when a condition is met",
	"signal-start": "Starts the process when a matching signal is broadcast",
	"error-start": "Starts an event subprocess when an error is thrown",
	"escalation-start": "Starts an event subprocess on an escalation",
	"compensation-start": "Starts an event subprocess to handle compensation",
	"non-interrupting-message-start": "Starts an event subprocess on a message, without interrupting",
	"non-interrupting-timer-start": "Starts an event subprocess on a timer, without interrupting",
	"non-interrupting-conditional-start": "Starts an event subprocess when a condition is met, without interrupting",
	"non-interrupting-signal-start": "Starts an event subprocess on a signal, without interrupting",
	"non-interrupting-escalation-start": "Starts an event subprocess on an escalation, without interrupting",
	"message-intermediate-catch": "Waits until a message is received",
	"message-intermediate-throw": "Sends a message",
	"timer-intermediate-catch": "Waits for a defined time or duration",
	"escalation-intermediate-throw": "Raises an escalation to a higher scope",
	"conditional-intermediate-catch": "Waits until a condition is met",
	"link-intermediate-catch": "Continues from a matching link event",
	"link-intermediate-throw": "Jumps to a matching link event",
	"compensation-intermediate-throw": "Triggers compensation of completed activities",
	"signal-intermediate-catch": "Waits for a matching signal to be broadcast",
	"signal-intermediate-throw": "Broadcasts a signal",
	"message-boundary": "Interrupts the activity when a message is received",
	"timer-boundary": "Interrupts the activity on a defined timer",
	"escalation-boundary": "Interrupts the activity on an escalation",
	"conditional-boundary": "Interrupts the activity when a condition is met",
	"error-boundary": "Interrupts the activity when it throws an error",
	"cancel-boundary": "Reacts when a transaction is canceled",
	"signal-boundary": "Interrupts the activity on a matching signal",
	"compensation-boundary": "Attaches a compensation handler to the activity",
	"non-interrupting-message-boundary": "Reacts to a message while the activity continues",
	"non-interrupting-timer-boundary": "Fires on a timer while the activity continues",
	"non-interrupting-escalation-boundary": "Reacts to an escalation while the activity continues",
	"non-interrupting-conditional-boundary": "Reacts when a condition is met; activity continues",
	"non-interrupting-signal-boundary": "Reacts to a signal while the activity continues",
	"message-end": "Ends the path and sends a message",
	"escalation-end": "Ends the path and raises an escalation",
	"error-end": "Ends the path by throwing an error",
	"cancel-end": "Cancels the transaction and ends the path",
	"compensation-end": "Ends the path and triggers compensation",
	"signal-end": "Ends the path and broadcasts a signal",
	"terminate-end": "Immediately ends all active paths in the scope",
	"sequence-flow": "Connects one element to the next in the flow",
	"default-flow": "The default path, taken when no other path condition is met",
	"conditional-flow": "Taken only when its condition is met"
}, {
	"call-activity": ["Child process"],
	"receive-task": ["Message"],
	"rule-task": ["DMN decision"],
	"user-task": ["Form", "Human"]
});
// ../../packages/bpmn-modeler/src/popupMenus.ts
var ELEMENT_POPUP_MENUS = [
	"bpmn-replace",
	"bpmn-append",
	"bpmn-create"
];
// ../../packages/bpmn-modeler/src/popupMenuAnnotations/PopupMenuAnnotationProvider.ts
var ANNOTATION_PRIORITY = 500;
var REMOVE_TEMPLATE_ENTRY_ID = "replace-remove-element-template";
var ALL_REPLACE_OPTIONS = Object.values(ReplaceOptions_exports).filter((options) => Array.isArray(options)).flat();
function ownTypeKeyOf(element) {
	const differsFromElement = isDifferentType(element);
	const ownTypeOption = ALL_REPLACE_OPTIONS.find((option) => option.target !== void 0 && !differsFromElement(option));
	return ownTypeOption && popupEntryKeyOf(ownTypeOption.actionName);
}
var PopupMenuAnnotationProvider = class {
	constructor(popupMenu, translate, annotations) {
		_defineProperty(this, "translate", void 0);
		_defineProperty(this, "annotations", void 0);
		this.translate = translate;
		this.annotations = annotations;
		for (const menuId of ELEMENT_POPUP_MENUS) popupMenu.registerProvider(menuId, ANNOTATION_PRIORITY, this);
	}
	getPopupMenuEntries(target) {
		return (entries) => {
			const annotatedEntries = {};
			for (const [entryId, entry] of Object.entries(entries)) {
				const annotation = this.annotationOf(entryId, target);
				annotatedEntries[entryId] = annotation ? annotateEntry(entry, annotation, this.translate) : entry;
			}
			return annotatedEntries;
		};
	}
	annotationOf(entryId, target) {
		if (entryId !== REMOVE_TEMPLATE_ENTRY_ID) return this.annotations.forEntry(entryId);
		const ownTypeKey = ownTypeKeyOf(target);
		return ownTypeKey === void 0 ? void 0 : this.annotations.forKey(ownTypeKey);
	}
};
_defineProperty(PopupMenuAnnotationProvider, "$inject", [
	"popupMenu",
	"translate",
	"popupMenuAnnotations"
]);
// ../../packages/bpmn-modeler/src/popupMenuAnnotations/ReplaceTemplatesTabProvider.ts
var BPMN_TAB = {
	id: "bpmn",
	label: "BPMN"
};
var TEMPLATES_TAB_ID = "templates";
var TAB_PRIORITY = 400;
var ReplaceTemplatesTabProvider = class {
	constructor(popupMenu, translate) {
		_defineProperty(this, "translate", void 0);
		this.translate = translate;
		popupMenu.registerProvider("bpmn-replace", TAB_PRIORITY, this);
	}
	getPopupMenuEntries() {
		return (entries) => {
			const templatesTab = {
				id: TEMPLATES_TAB_ID,
				label: this.translate("Templates")
			};
			const tabbedEntries = {};
			for (const [entryId, entry] of Object.entries(entries)) tabbedEntries[entryId] = templateIdOfEntryKey(entryId) !== void 0 ? {
				...entry,
				tab: templatesTab
			} : entry;
			return tabbedEntries;
		};
	}
};
_defineProperty(ReplaceTemplatesTabProvider, "$inject", ["popupMenu", "translate"]);
// ../../packages/bpmn-modeler/src/popupMenuAnnotations/index.ts
function createPopupMenuAnnotationsModule(engineOverrides = {}) {
	return {
		__init__: ["popupMenuAnnotationProvider"],
		popupMenuAnnotations: ["value", BASE_POPUP_MENU_ANNOTATIONS.withOverrides(engineOverrides)],
		popupMenuAnnotationProvider: ["type", PopupMenuAnnotationProvider]
	};
}
var ReplaceTemplatesTabModule = {
	__init__: ["replaceTemplatesTabProvider"],
	replaceTemplatesTabProvider: ["type", ReplaceTemplatesTabProvider]
};
// ../../packages/bpmn-modeler/src/contentSaved.ts
function createContentSavedNotifier(wiring) {
	return asyncDebounce(async () => {
		try {
			await wiring.onContentSaved({ xml: await wiring.exportDiagram() });
		} catch (error) {
			if (wiring.isDisposed()) return;
			wiring.reporter.reportError(error);
		}
	}, 300, { maxWait: 1e3 });
}
function wireContentSaved(options) {
	const notifier = createContentSavedNotifier({
		exportDiagram: options.exportDiagram,
		onContentSaved: options.onContentSaved,
		reporter: options.reporter,
		isDisposed: () => options.store.isDisposed
	});
	const unsubscribe = subscribe(options.eventBus, "commandStack.changed", () => void notifier());
	options.store.add(() => {
		unsubscribe();
		notifier.cancel();
	});
	return () => notifier.flush();
}
// ../../libs/bpmn-clipboard/src/BridgedClipboardModule.ts
var _BridgedClipboard;
var CLIP_PREFIX = "bpmn-js-clip----";
function isTextEditingElement(element) {
	return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element?.isContentEditable === true;
}
var BridgedClipboard = class {
	constructor(bridge, eventBus, copyPaste, moddle, nativeCopyPaste, canvas) {
		nativeCopyPaste.toggle(false);
		const { requestClipboard, writeClipboard } = bridge;
		let pendingClipData = null;
		const onDocumentCopy = (e) => {
			const elementsPayload = pendingClipData;
			pendingClipData = null;
			if (!elementsPayload || !canvas.isFocused()) return;
			e.preventDefault();
			e.stopImmediatePropagation();
			e.clipboardData?.setData("text/plain", elementsPayload);
		};
		document.addEventListener("copy", onDocumentCopy, true);
		eventBus.on("diagram.destroy", () => {
			document.removeEventListener("copy", onDocumentCopy, true);
		});
		eventBus.on("copyPaste.elementsCopied", 2051, (context) => {
			const serialized = CLIP_PREFIX + JSON.stringify(context.tree);
			pendingClipData = serialized;
			writeClipboard(serialized);
			context.hints = context.hints || {};
			context.hints.clip = false;
		});
		eventBus.on("copyPaste.pasteElements", 2051, (context) => {
			if (context.tree) return;
			const contextSnapshot = { ...context };
			requestClipboard().then((text) => {
				if (!text || !text.startsWith(CLIP_PREFIX)) return;
				try {
					const json = text.substring(16);
					const tree = JSON.parse(json, createReviver(moddle));
					copyPaste.paste({
						...contextSnapshot,
						tree
					});
				} catch (error) {
					console.error("Failed to deserialise clipboard content", error);
				}
			});
			return false;
		});
		eventBus.on("selection.changed", () => {
			requestAnimationFrame(() => {
				if (!document.hasFocus()) return;
				if (isTextEditingElement(document.activeElement)) return;
				canvas.focus();
			});
		});
	}
};
_BridgedClipboard = BridgedClipboard;
_BridgedClipboard.$inject = [
	"elementClipboardBridge",
	"eventBus",
	"copyPaste",
	"moddle",
	"nativeCopyPaste",
	"canvas"
];
var BridgedClipboardModule = {
	__init__: ["bridgedClipboard"],
	bridgedClipboard: ["type", BridgedClipboard]
};
// ../../libs/bpmn-clipboard/src/upstreamInternals/directEditingInternals.ts
function getDirectEditingContent(directEditing) {
	const content = directEditing?._textbox?.content;
	if (!(content instanceof HTMLElement)) throw new Error("diagram-js-direct-editing internal shape changed: expected `directEditing._textbox.content` to be an HTMLElement. Update directEditingInternals.ts and its shape test.");
	return content;
}
// ../../libs/bpmn-clipboard/src/LabelClipboardModule.ts
var _LabelClipboard;
function dispatchPasteOrInsert$1(text) {
	const target = document.activeElement;
	if (!target) return;
	const event = new ClipboardEvent("paste", {
		bubbles: true,
		cancelable: true,
		clipboardData: new DataTransfer()
	});
	event.clipboardData.setData("text/plain", text);
	if (!!target.dispatchEvent(event)) document.execCommand("insertText", false, text);
}
var LabelClipboard = class {
	constructor(bridge, eventBus, directEditing) {
		this.keydownHandler = null;
		this.activeElement = null;
		const { requestClipboard, writeClipboard } = bridge;
		eventBus.on("directEditing.activate", () => {
			let content;
			try {
				content = getDirectEditingContent(directEditing);
			} catch (err) {
				console.error(err);
				return;
			}
			this.keydownHandler = (e) => {
				if (!(e.metaKey || e.ctrlKey)) return;
				if (e.key === "c") {
					const text = window.getSelection()?.toString() ?? "";
					if (text) writeClipboard(text);
				} else if (e.key === "v") {
					e.preventDefault();
					requestClipboard().then((text) => {
						if (text) dispatchPasteOrInsert$1(text);
					});
				} else if (e.key === "a") {
					e.preventDefault();
					const selection = window.getSelection();
					if (selection) {
						const range = document.createRange();
						range.selectNodeContents(content);
						selection.removeAllRanges();
						selection.addRange(range);
					}
				}
			};
			this.activeElement = content;
			content.addEventListener("keydown", this.keydownHandler, true);
		});
		eventBus.on("directEditing.deactivate", () => {
			if (this.activeElement && this.keydownHandler) this.activeElement.removeEventListener("keydown", this.keydownHandler, true);
			this.keydownHandler = null;
			this.activeElement = null;
		});
	}
};
_LabelClipboard = LabelClipboard;
_LabelClipboard.$inject = [
	"textClipboardBridge",
	"eventBus",
	"directEditing"
];
var LabelClipboardModule = {
	__init__: ["labelClipboard"],
	labelClipboard: ["type", LabelClipboard]
};
// ../../libs/bpmn-clipboard/src/createClipboardModules.ts
function createClipboardModules(bridges) {
	return [
		BridgedClipboardModule,
		LabelClipboardModule,
		{
			elementClipboardBridge: ["value", bridges.element],
			textClipboardBridge: ["value", bridges.text ?? bridges.element]
		}
	];
}
// ../../packages/bpmn-modeler/src/lintHandle.ts
function createLintHandleMethods(resolveService, warn) {
	const ignore = (action) => warn(`${action} ignored: this surface was created without a lint module`);
	return {
		applyLintResults(results) {
			const service = resolveService();
			if (!service) {
				ignore("applyLintResults");
				return;
			}
			service.applyLintResults(results);
		},
		applyLintingDisabled() {
			const service = resolveService();
			if (!service) {
				ignore("applyLintingDisabled");
				return;
			}
			service.applyLintingDisabled();
		},
		startInPageLinting(config, configToken) {
			const service = resolveService();
			if (!service) {
				ignore("startInPageLinting");
				return;
			}
			service.startInPageLinting(config, configToken);
		}
	};
}
// ../../packages/bpmn-modeler/src/propertiesPanelClipboard.ts
function handleCopy(writeClipboard) {
	const text = window.getSelection()?.toString() ?? "";
	if (text) writeClipboard(text);
}
function handlePaste(el, requestClipboard) {
	requestClipboard().then((text) => {
		if (text) dispatchPasteOrInsert(el, text);
	});
}
var rootRegistry = new Map();
var uninstallDocumentHooks;
var handled = false;
function markHandled() {
	handled = true;
	setTimeout(() => {
		handled = false;
	}, 200);
}
function resolveCallbacks(target) {
	let node = target instanceof HTMLElement ? target : null;
	while (node) {
		const callbacks = rootRegistry.get(node);
		if (callbacks) return callbacks;
		node = node.parentElement;
	}
}
function installContentEditableClipboardPolyfill(roots, callbacks) {
	for (const root of roots) rootRegistry.set(root, callbacks);
	uninstallDocumentHooks ??= installDocumentHooks();
	let disposed = false;
	return () => {
		if (disposed) return;
		disposed = true;
		for (const root of roots) if (rootRegistry.get(root) === callbacks) rootRegistry.delete(root);
		if (rootRegistry.size === 0) {
			uninstallDocumentHooks?.();
			uninstallDocumentHooks = void 0;
		}
	};
}
function installDocumentHooks() {
	const onClipboardKeydown = (e) => {
		const el = document.activeElement;
		if (!(el instanceof HTMLElement)) return;
		if (!(e.metaKey || e.ctrlKey)) return;
		if (el.contentEditable !== "true") return;
		if (e.key !== "v" && e.key !== "c") return;
		const callbacks = resolveCallbacks(el);
		if (!callbacks) return;
		markHandled();
		if (el.closest(".djs-direct-editing-content")) return;
		if (e.key === "v") {
			e.preventDefault();
			handlePaste(el, callbacks.requestClipboard);
		} else handleCopy(callbacks.writeClipboard);
	};
	const onSelectAllKeydown = (e) => {
		if (!(e.metaKey || e.ctrlKey)) return;
		if (e.key !== "a") return;
		e.stopPropagation();
		const el = document.activeElement;
		if (!isTextEditingSurface(el)) return;
		e.stopImmediatePropagation();
		if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) el.select();
	};
	const nativeExecCommand = Document.prototype.execCommand;
	const patchedExecCommand = function(command, showUI, value) {
		const el = document.activeElement;
		if (el instanceof HTMLElement && el.contentEditable === "true") {
			const callbacks = resolveCallbacks(el);
			if (callbacks) {
				if (command === "paste") {
					if (handled) return true;
					handlePaste(el, callbacks.requestClipboard);
					return true;
				}
				if (command === "copy") {
					if (handled) return true;
					handleCopy(callbacks.writeClipboard);
					return true;
				}
			}
		}
		return nativeExecCommand?.call(document, command, showUI, value) ?? false;
	};
	document.addEventListener("keydown", onClipboardKeydown, true);
	document.addEventListener("keydown", onSelectAllKeydown, false);
	Object.defineProperty(document, "execCommand", {
		value: patchedExecCommand,
		writable: true,
		configurable: true
	});
	return () => {
		document.removeEventListener("keydown", onClipboardKeydown, true);
		document.removeEventListener("keydown", onSelectAllKeydown, false);
		if (Object.getOwnPropertyDescriptor(document, "execCommand")?.value === patchedExecCommand) delete document.execCommand;
		handled = false;
	};
}
function dispatchPasteOrInsert(el, text) {
	const dt = new DataTransfer();
	dt.setData("text/plain", text);
	const event = new ClipboardEvent("paste", {
		clipboardData: dt,
		bubbles: true,
		cancelable: true
	});
	el.dispatchEvent(event);
	if (!event.defaultPrevented) Document.prototype.execCommand?.call(document, "insertText", false, text);
}
// ../../packages/bpmn-modeler/src/editableSurface.ts
function installClipboardSupport(store, clipboard, roots) {
	if (!clipboard) return [];
	const textBridge = clipboard.text ?? clipboard.bridge;
	store.add(installContentEditableClipboardPolyfill(roots, {
		requestClipboard: () => textBridge.requestClipboard(),
		writeClipboard: (text) => {
			textBridge.writeClipboard(text);
		}
	}));
	return createClipboardModules({
		element: clipboard.bridge,
		text: clipboard.text
	});
}
function formatSurfaceDiagram(surface) {
	return surface.service("bpmnLayouter").format();
}
function subscribeCommandStackChanged(surface, listener) {
	return subscribe(surface.service("eventBus"), "commandStack.changed", () => {
		listener();
	});
}
function subscribeFormatted(surface, listener) {
	return subscribe(surface.service("eventBus"), LAYOUT_FORMATTED_EVENT, (event) => {
		listener(layoutOutcomeOf(event));
	});
}
function layoutOutcomeOf({ status, code, message, diagnostics }) {
	const outcome = {
		status,
		diagnostics
	};
	if (code !== void 0) outcome.code = code;
	if (message !== void 0) outcome.message = message;
	return outcome;
}
function cleanupSurfaceDiagram(surface, options) {
	const cleanup = surface.service("bpmnCleanup");
	return options?.apply ? cleanup.apply() : cleanup.inspect();
}
function applyFavouriteBpmnElements(surface, types) {
	surface.optionalService("appendMenuOverride")?.setFavourites([...types]);
}
function createSurfaceLintHandle(surface, reporter) {
	return createLintHandleMethods(() => surface.optionalService("bpmnLintConfig"), (message) => reporter.warn(message));
}
// ../../packages/bpmn-modeler/src/reporting/reporting.ts
function createReporter(sinks) {
	return {
		warn(message) {
			console.warn(message);
			sinks.onWarning?.(message);
		},
		reportError(error) {
			if (sinks.onError) sinks.onError(error);
			else console.error(error);
		}
	};
}
export { templatePropertyDisplayText as C, createReviver as D, modeler_default as E, Modeler as O, propertyDisplayLabel as S, templateIdOfEntryKey as T, FlowNavigationModule as _, formatSurfaceDiagram as a, fallbackTranslate as b, subscribeFormatted as c, createPopupMenuAnnotationsModule as d, BPMN_TAB as f, createBpmnLayoutModule as g, createDefinitionSearchModule as h, createSurfaceLintHandle as i, wireContentSaved as l, buildLintModules as m, applyFavouriteBpmnElements as n, installClipboardSupport as o, ELEMENT_POPUP_MENUS as p, cleanupSurfaceDiagram as r, subscribeCommandStackChanged as s, createReporter as t, ReplaceTemplatesTabModule as u, AppendMenuModule as v, u as w, partitionVisibleProperties as x, extractImplementationDetail as y };

//# sourceMappingURL=reporting-CwIb-OB4.js.map