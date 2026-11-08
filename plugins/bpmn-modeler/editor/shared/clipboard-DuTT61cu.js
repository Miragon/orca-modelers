import { $t as closest, A as isCmd, At as getParents, B as delta, Bt as clear$1, C as outline_default, Ct as add, Dt as getBBox, E as keyboard_default, F as install, G as hasPrimaryModifier, H as IdGenerator, Ht as create, I as set, It as append, J as getOriginal$1, Jt as all, K as hasSecondaryModifier, Kt as e$2, L as unset, O as CommandInterceptor, Ot as getClosure, Pt as createLine, Qt as clear, Rt as attr$1, St as pointsOnLine, Tt as remove$2, U as selection_default, V as overlays_default, Vt as clone, W as interaction_events_default, Wt as remove, X as toPoint, Xt as attr, Y as stopPropagation$1, Z as translate_default, Zt as classes, _t as findPathIntersections, at as isModelElement, ct as asTRBL, dt as getMid, en as delegate, et as rotate, ft as getOrientation, gt as isLabel, ht as isConnection, in as remove$1, j as isKey, jt as selfAndAllChildren, kt as getEnclosedElements, lt as filterRedundantWaypoints, mt as roundPoint, nn as matches, nt as translate, pt as roundBounds, q as isPrimaryButton, rn as query, rt as getVisual, st as asBounds, tn as event, tt as transform, ut as getElementLineIntersection, vt as getMidPoint, wt as indexOf, xt as pointsAligned, yt as pointDistance, z as center, zt as classes$1 } from "./jsxRuntime.module-C_nqa6u-.js";
import { A as pick, C as isObject, D as map, F as sortBy, N as size, P as some, R as uniqueBy, S as isNumber, _ as init_dist, a as bind, b as isFunction, f as flatten, h as groupBy, i as assign, j as reduce, k as omit, l as filter, n as escapeHTML, o as debounce, p as forEach, r as domify, t as escapeCSS, u as find, v as isArray, w as isString, x as isNil, y as isDefined, z as values } from "./EscapeUtil-3RypN4fl.js";
//#region ../../node_modules/diagram-js/lib/features/search-pad/SearchPad.js
var SCROLL_TO_ELEMENT_PADDING = 300;
function SearchPad(canvas, eventBus, selection, translate) {
	this._open = false;
	this._results = {};
	this._eventMaps = [];
	this._cachedRootElement = null;
	this._cachedSelection = null;
	this._cachedViewbox = null;
	this._canvas = canvas;
	this._eventBus = eventBus;
	this._selection = selection;
	this._translate = translate;
	this._container = this._getBoxHtml();
	this._searchInput = query(SearchPad.INPUT_SELECTOR, this._container);
	this._resultsContainer = query(SearchPad.RESULTS_CONTAINER_SELECTOR, this._container);
	this._canvas.getContainer().appendChild(this._container);
	eventBus.on([
		"canvas.destroy",
		"diagram.destroy",
		"drag.init",
		"elements.changed"
	], this.close, this);
}
SearchPad.$inject = [
	"canvas",
	"eventBus",
	"selection",
	"translate"
];
SearchPad.prototype._bindEvents = function() {
	var self = this;
	function listen(el, selector, type, fn) {
		self._eventMaps.push({
			el,
			type,
			listener: delegate.bind(el, selector, type, fn)
		});
	}
	listen(document, "html", "click", function(e) {
		self.close(false);
	});
	listen(this._container, SearchPad.INPUT_SELECTOR, "click", function(e) {
		e.stopPropagation();
		e.delegateTarget.focus();
	});
	listen(this._container, SearchPad.RESULT_SELECTOR, "mouseover", function(e) {
		e.stopPropagation();
		self._scrollToNode(e.delegateTarget);
		self._preselect(e.delegateTarget);
	});
	listen(this._container, SearchPad.RESULT_SELECTOR, "click", function(e) {
		e.stopPropagation();
		self._select(e.delegateTarget);
	});
	listen(this._container, SearchPad.INPUT_SELECTOR, "keydown", function(e) {
		if (isKey("ArrowUp", e)) e.preventDefault();
		if (isKey("ArrowDown", e)) e.preventDefault();
	});
	listen(this._container, SearchPad.INPUT_SELECTOR, "keyup", function(e) {
		if (isKey("Escape", e)) return self.close();
		if (isKey("Enter", e)) {
			var selected = self._getCurrentResult();
			return selected ? self._select(selected) : self.close(false);
		}
		if (isKey("ArrowUp", e)) return self._scrollToDirection(true);
		if (isKey("ArrowDown", e)) return self._scrollToDirection();
		if (isKey(["ArrowLeft", "ArrowRight"], e)) return;
		self._search(e.delegateTarget.value);
	});
};
SearchPad.prototype._unbindEvents = function() {
	this._eventMaps.forEach(function(m) {
		delegate.unbind(m.el, m.type, m.listener);
	});
};
SearchPad.prototype._search = function(pattern) {
	var self = this;
	this._clearResults();
	if (!pattern.trim()) return;
	var searchResults = this._searchProvider.find(pattern);
	searchResults = searchResults.filter(function(searchResult) {
		return !self._canvas.getRootElements().includes(searchResult.element);
	});
	if (!searchResults.length) {
		this._selection.select(null);
		return;
	}
	searchResults.forEach(function(result) {
		var id = result.element.id;
		var node = self._createResultNode(result, id);
		self._results[id] = {
			element: result.element,
			node
		};
	});
	var node = query(SearchPad.RESULT_SELECTOR, this._resultsContainer);
	this._scrollToNode(node);
	this._preselect(node);
};
SearchPad.prototype._scrollToDirection = function(previous) {
	var selected = this._getCurrentResult();
	if (!selected) return;
	var node = previous ? selected.previousElementSibling : selected.nextElementSibling;
	if (node) {
		this._scrollToNode(node);
		this._preselect(node);
	}
};
SearchPad.prototype._scrollToNode = function(node) {
	if (!node || node === this._getCurrentResult()) return;
	var nodeOffset = node.offsetTop;
	var containerScroll = this._resultsContainer.scrollTop;
	var bottomScroll = nodeOffset - this._resultsContainer.clientHeight + node.clientHeight;
	if (nodeOffset < containerScroll) this._resultsContainer.scrollTop = nodeOffset;
	else if (containerScroll < bottomScroll) this._resultsContainer.scrollTop = bottomScroll;
};
SearchPad.prototype._clearResults = function() {
	clear(this._resultsContainer);
	this._results = {};
	this._eventBus.fire("searchPad.cleared");
};
SearchPad.prototype._getCurrentResult = function() {
	return query(SearchPad.RESULT_SELECTED_SELECTOR, this._resultsContainer);
};
SearchPad.prototype._createResultNode = function(result, id) {
	var node = domify(SearchPad.RESULT_HTML);
	if (result.primaryTokens.length > 0) createInnerTextNode(node, result.primaryTokens, SearchPad.RESULT_PRIMARY_HTML);
	createInnerTextNode(node, result.secondaryTokens, SearchPad.RESULT_SECONDARY_HTML);
	attr(node, SearchPad.RESULT_ID_ATTRIBUTE, id);
	this._resultsContainer.appendChild(node);
	return node;
};
SearchPad.prototype.registerProvider = function(provider) {
	this._searchProvider = provider;
};
SearchPad.prototype.open = function() {
	if (!this._searchProvider) throw new Error("no search provider registered");
	if (this.isOpen()) return;
	this._cachedRootElement = this._canvas.getRootElement();
	this._cachedSelection = this._selection.get();
	this._cachedViewbox = this._canvas.viewbox();
	this._selection.select(null);
	this._bindEvents();
	this._open = true;
	classes(this._canvas.getContainer()).add("djs-search-open");
	classes(this._container).add("open");
	this._searchInput.focus();
	this._eventBus.fire("searchPad.opened");
};
SearchPad.prototype.close = function(restoreCached = true) {
	if (!this.isOpen()) return;
	if (restoreCached) {
		if (this._cachedRootElement) this._canvas.setRootElement(this._cachedRootElement);
		if (this._cachedSelection) this._selection.select(this._cachedSelection);
		if (this._cachedViewbox) this._canvas.viewbox(this._cachedViewbox);
		this._eventBus.fire("searchPad.restored");
	}
	this._cachedRootElement = null;
	this._cachedSelection = null;
	this._cachedViewbox = null;
	this._unbindEvents();
	this._open = false;
	classes(this._canvas.getContainer()).remove("djs-search-open");
	classes(this._container).remove("open");
	this._clearResults();
	this._searchInput.value = "";
	this._searchInput.blur();
	this._eventBus.fire("searchPad.closed");
	this._canvas.restoreFocus();
};
SearchPad.prototype.toggle = function() {
	this.isOpen() ? this.close() : this.open();
};
SearchPad.prototype.isOpen = function() {
	return this._open;
};
SearchPad.prototype._preselect = function(node) {
	var selectedNode = this._getCurrentResult();
	if (node === selectedNode) return;
	if (selectedNode) classes(selectedNode).remove(SearchPad.RESULT_SELECTED_CLASS);
	var id = attr(node, SearchPad.RESULT_ID_ATTRIBUTE);
	var element = this._results[id].element;
	classes(node).add(SearchPad.RESULT_SELECTED_CLASS);
	this._canvas.scrollToElement(element, { top: SCROLL_TO_ELEMENT_PADDING });
	this._selection.select(element);
	this._eventBus.fire("searchPad.preselected", element);
};
SearchPad.prototype._select = function(node) {
	var id = attr(node, SearchPad.RESULT_ID_ATTRIBUTE);
	var element = this._results[id].element;
	this._cachedSelection = null;
	this._cachedViewbox = null;
	this.close(false);
	this._canvas.scrollToElement(element, { top: SCROLL_TO_ELEMENT_PADDING });
	this._selection.select(element);
	this._eventBus.fire("searchPad.selected", element);
};
SearchPad.prototype._getBoxHtml = function() {
	const box = domify(SearchPad.BOX_HTML);
	const input = query(SearchPad.INPUT_SELECTOR, box);
	if (input) input.setAttribute("aria-label", this._translate("Search in diagram"));
	return box;
};
function createInnerTextNode(parentNode, tokens, template) {
	var text = createHtmlText(tokens);
	var childNode = domify(template);
	childNode.innerHTML = text;
	parentNode.appendChild(childNode);
}
function createHtmlText(tokens) {
	var htmlText = "";
	tokens.forEach(function(t) {
		var text = escapeHTML(t.value || t.matched || t.normal);
		if (t.match || t.matched) htmlText += "<b class=\"" + SearchPad.RESULT_HIGHLIGHT_CLASS + "\">" + text + "</b>";
		else htmlText += text;
	});
	return htmlText !== "" ? htmlText : null;
}
SearchPad.CONTAINER_SELECTOR = ".djs-search-container";
SearchPad.INPUT_SELECTOR = ".djs-search-input input";
SearchPad.RESULTS_CONTAINER_SELECTOR = ".djs-search-results";
SearchPad.RESULT_SELECTOR = ".djs-search-result";
SearchPad.RESULT_SELECTED_CLASS = "djs-search-result-selected";
SearchPad.RESULT_SELECTED_SELECTOR = "." + SearchPad.RESULT_SELECTED_CLASS;
SearchPad.RESULT_ID_ATTRIBUTE = "data-result-id";
SearchPad.RESULT_HIGHLIGHT_CLASS = "djs-search-highlight";
SearchPad.BOX_HTML = `<div class="djs-search-container djs-scrollable">
  <div class="djs-search-input">
    <svg class="djs-search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0325 8.5H9.625L13.3675 12.25L12.25 13.3675L8.5 9.625V9.0325L8.2975 8.8225C7.4425 9.5575 6.3325 10 5.125 10C2.4325 10 0.25 7.8175 0.25 5.125C0.25 2.4325 2.4325 0.25 5.125 0.25C7.8175 0.25 10 2.4325 10 5.125C10 6.3325 9.5575 7.4425 8.8225 8.2975L9.0325 8.5ZM1.75 5.125C1.75 6.9925 3.2575 8.5 5.125 8.5C6.9925 8.5 8.5 6.9925 8.5 5.125C8.5 3.2575 6.9925 1.75 5.125 1.75C3.2575 1.75 1.75 3.2575 1.75 5.125Z" fill="#22242A"/>
    </svg>
    <input type="text" spellcheck="false" />
  </div>
  <div class="djs-search-results" />
</div>`;
SearchPad.RESULT_HTML = "<div class=\"djs-search-result\"></div>";
SearchPad.RESULT_PRIMARY_HTML = "<div class=\"djs-search-result-primary\"></div>";
SearchPad.RESULT_SECONDARY_HTML = "<p class=\"djs-search-result-secondary\"></p>";
//#endregion
//#region ../../node_modules/diagram-js/lib/features/search-pad/index.js
var search_pad_default = {
	__depends__: [
		translate_default,
		overlays_default,
		selection_default
	],
	searchPad: ["type", SearchPad]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/align-elements/AlignElements.js
init_dist();
function last(arr) {
	return arr && arr[arr.length - 1];
}
function sortTopOrMiddle(element) {
	return element.y;
}
function sortLeftOrCenter(element) {
	return element.x;
}
var ALIGNMENT_SORTING = {
	left: sortLeftOrCenter,
	center: sortLeftOrCenter,
	right: function(element) {
		return element.x + element.width;
	},
	top: sortTopOrMiddle,
	middle: sortTopOrMiddle,
	bottom: function(element) {
		return element.y + element.height;
	}
};
function AlignElements$1(modeling, rules) {
	this._modeling = modeling;
	this._rules = rules;
}
AlignElements$1.$inject = ["modeling", "rules"];
AlignElements$1.prototype._getOrientationDetails = function(type) {
	var vertical = [
		"top",
		"bottom",
		"middle"
	], axis = "x", dimension = "width";
	if (vertical.indexOf(type) !== -1) {
		axis = "y";
		dimension = "height";
	}
	return {
		axis,
		dimension
	};
};
AlignElements$1.prototype._isType = function(type, types) {
	return types.indexOf(type) !== -1;
};
AlignElements$1.prototype._alignmentPosition = function(type, sortedElements) {
	var orientation = this._getOrientationDetails(type), axis = orientation.axis, dimension = orientation.dimension, alignment = {}, centers = {}, hasSharedCenters = false, centeredElements, firstElement, lastElement;
	function getMiddleOrTop(first, last) {
		return Math.round((first[axis] + last[axis] + last[dimension]) / 2);
	}
	if (this._isType(type, ["left", "top"])) alignment[type] = sortedElements[0][axis];
	else if (this._isType(type, ["right", "bottom"])) {
		lastElement = last(sortedElements);
		alignment[type] = lastElement[axis] + lastElement[dimension];
	} else if (this._isType(type, ["center", "middle"])) {
		forEach(sortedElements, function(element) {
			var center = element[axis] + Math.round(element[dimension] / 2);
			if (centers[center]) centers[center].elements.push(element);
			else centers[center] = {
				elements: [element],
				center
			};
		});
		centeredElements = sortBy(centers, function(center) {
			if (center.elements.length > 1) hasSharedCenters = true;
			return center.elements.length;
		});
		if (hasSharedCenters) {
			alignment[type] = last(centeredElements).center;
			return alignment;
		}
		firstElement = sortedElements[0];
		sortedElements = sortBy(sortedElements, function(element) {
			return element[axis] + element[dimension];
		});
		lastElement = last(sortedElements);
		alignment[type] = getMiddleOrTop(firstElement, lastElement);
	}
	return alignment;
};
AlignElements$1.prototype.trigger = function(elements, type) {
	var modeling = this._modeling, allowed;
	var filteredElements = filter(elements, function(element) {
		return !(element.waypoints || element.host || element.labelTarget);
	});
	allowed = this._rules.allowed("elements.align", { elements: filteredElements });
	if (isArray(allowed)) filteredElements = allowed;
	if (filteredElements.length < 2 || !allowed) return;
	var sortFn = ALIGNMENT_SORTING[type];
	var sortedElements = sortBy(filteredElements, sortFn);
	var alignment = this._alignmentPosition(type, sortedElements);
	modeling.alignElements(sortedElements, alignment);
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/align-elements/index.js
var align_elements_default = {
	__init__: ["alignElements"],
	alignElements: ["type", AlignElements$1]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/auto-place/AutoPlaceUtil.js
init_dist();
var PLACEMENT_DETECTION_PAD = 10;
var DEFAULT_MAX_DISTANCE = 250;
function findFreePosition(source, element, position, getNextPosition) {
	var connectedAtPosition;
	while (connectedAtPosition = getConnectedAtPosition(source, position, element)) position = getNextPosition(element, position, connectedAtPosition);
	return position;
}
function generateGetNextPosition(nextPositionDirection) {
	return function(element, previousPosition, connectedAtPosition) {
		var nextPosition = {
			x: previousPosition.x,
			y: previousPosition.y
		};
		["x", "y"].forEach(function(axis) {
			var nextPositionDirectionForAxis = nextPositionDirection[axis];
			if (!nextPositionDirectionForAxis) return;
			var dimension = axis === "x" ? "width" : "height";
			var margin = nextPositionDirectionForAxis.margin, minDistance = nextPositionDirectionForAxis.minDistance;
			if (margin < 0) nextPosition[axis] = Math.min(connectedAtPosition[axis] + margin - element[dimension] / 2, previousPosition[axis] - minDistance + margin);
			else nextPosition[axis] = Math.max(connectedAtPosition[axis] + connectedAtPosition[dimension] + margin + element[dimension] / 2, previousPosition[axis] + minDistance + margin);
		});
		return nextPosition;
	};
}
function getConnectedAtPosition(source, position, element) {
	var bounds = {
		x: position.x - element.width / 2,
		y: position.y - element.height / 2,
		width: element.width,
		height: element.height
	};
	var closure = getAutoPlaceClosure(source);
	return find(closure, function(target) {
		if (target === element) return false;
		return getOrientation(target, bounds, PLACEMENT_DETECTION_PAD) === "intersect";
	});
}
function getConnectedDistance(source, hints) {
	if (!hints) hints = {};
	function getDefaultWeight(connection) {
		return connection.source === source ? 1 : -1;
	}
	var defaultDistance = hints.defaultDistance || 50, direction = hints.direction || "e", filter = hints.filter, getWeight = hints.getWeight || getDefaultWeight, maxDistance = hints.maxDistance || DEFAULT_MAX_DISTANCE, reference = hints.reference || "start";
	if (!filter) filter = noneFilter;
	function getDistance(a, b) {
		if (direction === "n") {
			if (reference === "start") return asTRBL(a).top - asTRBL(b).bottom;
			else if (reference === "center") return asTRBL(a).top - getMid(b).y;
			else return asTRBL(a).top - asTRBL(b).top;
		} else if (direction === "w") {
			if (reference === "start") return asTRBL(a).left - asTRBL(b).right;
			else if (reference === "center") return asTRBL(a).left - getMid(b).x;
			else return asTRBL(a).left - asTRBL(b).left;
		} else if (direction === "s") {
			if (reference === "start") return asTRBL(b).top - asTRBL(a).bottom;
			else if (reference === "center") return getMid(b).y - asTRBL(a).bottom;
			else return asTRBL(b).bottom - asTRBL(a).bottom;
		} else if (reference === "start") return asTRBL(b).left - asTRBL(a).right;
		else if (reference === "center") return getMid(b).x - asTRBL(a).right;
		else return asTRBL(b).right - asTRBL(a).right;
	}
	var sourcesDistances = source.incoming.filter(filter).map(function(connection) {
		var weight = getWeight(connection);
		var distance = weight < 0 ? getDistance(connection.source, source) : getDistance(source, connection.source);
		return {
			id: connection.source.id,
			distance,
			weight
		};
	});
	var targetsDistances = source.outgoing.filter(filter).map(function(connection) {
		var weight = getWeight(connection);
		var distance = weight > 0 ? getDistance(source, connection.target) : getDistance(connection.target, source);
		return {
			id: connection.target.id,
			distance,
			weight
		};
	});
	var distances = sourcesDistances.concat(targetsDistances).reduce(function(accumulator, currentValue) {
		accumulator[currentValue.id + "__weight_" + currentValue.weight] = currentValue;
		return accumulator;
	}, {});
	return reduce(distances, function(accumulator, currentValue) {
		var distance = currentValue.distance, weight = currentValue.weight;
		if (distance < 0 || distance > maxDistance) return accumulator;
		if (!accumulator[String(distance)]) accumulator[String(distance)] = 0;
		accumulator[String(distance)] += 1 * weight;
		if (!accumulator.distance || accumulator[accumulator.distance] < accumulator[String(distance)]) accumulator.distance = distance;
		return accumulator;
	}, {}).distance || defaultDistance;
}
function getAutoPlaceClosure(source) {
	var allConnected = getConnected(source);
	if (source.host) allConnected = allConnected.concat(getConnected(source.host));
	if (source.attachers) allConnected = allConnected.concat(source.attachers.reduce(function(shapes, attacher) {
		return shapes.concat(getConnected(attacher));
	}, []));
	return allConnected;
}
function getConnected(element) {
	return getTargets(element).concat(getSources(element));
}
function getSources(shape) {
	return shape.incoming.map(function(connection) {
		return connection.source;
	});
}
function getTargets(shape) {
	return shape.outgoing.map(function(connection) {
		return connection.target;
	});
}
function noneFilter() {
	return true;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/auto-place/AutoPlace.js
var LOW_PRIORITY$8 = 100;
function AutoPlace(eventBus, modeling, canvas) {
	eventBus.on("autoPlace", LOW_PRIORITY$8, function(context) {
		var shape = context.shape, source = context.source;
		return getNewShapePosition(source, shape);
	});
	eventBus.on("autoPlace.end", function(event) {
		canvas.scrollToElement(event.shape);
	});
	this.append = function(source, shape, hints) {
		eventBus.fire("autoPlace.start", {
			source,
			shape
		});
		var position = eventBus.fire("autoPlace", {
			source,
			shape
		});
		var newShape = modeling.appendShape(source, shape, position, source.parent, hints);
		eventBus.fire("autoPlace.end", {
			source,
			shape: newShape
		});
		return newShape;
	};
}
AutoPlace.$inject = [
	"eventBus",
	"modeling",
	"canvas"
];
function getNewShapePosition(source, element, hints) {
	if (!hints) hints = {};
	var distance = hints.defaultDistance || 50;
	var sourceMid = getMid(source);
	return {
		x: asTRBL(source).right + distance + element.width / 2,
		y: sourceMid.y
	};
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/auto-place/AutoPlaceSelectionBehavior.js
function AutoPlaceSelectionBehavior(eventBus, selection) {
	eventBus.on("autoPlace.end", 500, function(e) {
		selection.select(e.shape);
	});
}
AutoPlaceSelectionBehavior.$inject = ["eventBus", "selection"];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/auto-place/index.js
var auto_place_default = {
	__init__: ["autoPlaceSelectionBehavior"],
	autoPlace: ["type", AutoPlace],
	autoPlaceSelectionBehavior: ["type", AutoPlaceSelectionBehavior]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/hover-fix/HoverFix.js
var HIGH_PRIORITY$6 = 1500;
function HoverFix(elementRegistry, eventBus, injector) {
	var self = this;
	var dragging = injector.get("dragging", false);
	function ensureHover(event) {
		if (event.hover) return;
		var originalEvent = event.originalEvent;
		var gfx = self._findTargetGfx(originalEvent);
		var element = gfx && elementRegistry.get(gfx);
		if (gfx && element) {
			event.stopPropagation();
			dragging.hover({
				element,
				gfx
			});
			dragging.move(originalEvent);
		}
	}
	if (dragging) eventBus.on("drag.start", function(event) {
		eventBus.once("drag.move", HIGH_PRIORITY$6, function(event) {
			ensureHover(event);
		});
	});
	(function() {
		var hoverGfx;
		var hover;
		eventBus.on("element.hover", function(event) {
			hoverGfx = event.gfx;
			hover = event.element;
		});
		eventBus.on("element.hover", HIGH_PRIORITY$6, function(event) {
			if (hover) eventBus.fire("element.out", {
				element: hover,
				gfx: hoverGfx
			});
		});
		eventBus.on("element.out", function() {
			hoverGfx = null;
			hover = null;
		});
	})();
	this._findTargetGfx = function(event) {
		var position, target;
		if (!(event instanceof MouseEvent)) return;
		position = toPoint(event);
		target = document.elementFromPoint(position.x, position.y);
		return getGfx(target);
	};
}
HoverFix.$inject = [
	"elementRegistry",
	"eventBus",
	"injector"
];
function getGfx(target) {
	return closest(target, "svg, .djs-element", true);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/hover-fix/index.js
var hover_fix_default = {
	__init__: ["hoverFix"],
	hoverFix: ["type", HoverFix]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/dragging/Dragging.js
init_dist();
var round$8 = Math.round;
var DRAG_ACTIVE_CLS = "djs-drag-active";
var LOW_PRIORITY$7 = 500;
function preventDefault$1(event) {
	event.preventDefault();
}
function isTouchEvent(event) {
	return typeof TouchEvent !== "undefined" && event instanceof TouchEvent;
}
function getLength(point) {
	return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
}
function Dragging(eventBus, canvas, selection, elementRegistry) {
	var defaultOptions = {
		threshold: 5,
		trapClick: true
	};
	var context;
	function toLocalPoint(globalPosition) {
		var viewbox = canvas.viewbox();
		var clientRect = canvas._container.getBoundingClientRect();
		return {
			x: viewbox.x + (globalPosition.x - clientRect.left) / viewbox.scale,
			y: viewbox.y + (globalPosition.y - clientRect.top) / viewbox.scale
		};
	}
	function fire(type, dragContext) {
		dragContext = dragContext || context;
		var event = eventBus.createEvent(assign({}, dragContext.payload, dragContext.data, { isTouch: dragContext.isTouch }));
		if (eventBus.fire("drag." + type, event) === false) return false;
		return eventBus.fire(dragContext.prefix + "." + type, event);
	}
	function restoreSelection(previousSelection) {
		var existingSelection = previousSelection.filter(function(element) {
			return elementRegistry.get(element.id);
		});
		existingSelection.length && selection.select(existingSelection);
	}
	function move(event, activate) {
		var payload = context.payload, displacement = context.displacement;
		var globalStart = context.globalStart, globalCurrent = toPoint(event), globalDelta = delta(globalCurrent, globalStart);
		var localStart = context.localStart, localCurrent = toLocalPoint(globalCurrent), localDelta = delta(localCurrent, localStart);
		if (!context.active && (activate || getLength(globalDelta) > context.threshold)) {
			assign(payload, {
				x: round$8(localStart.x + displacement.x),
				y: round$8(localStart.y + displacement.y),
				dx: 0,
				dy: 0
			}, { originalEvent: event });
			if (false === fire("start")) return cancel();
			context.active = true;
			if (!context.keepSelection) {
				payload.previousSelection = selection.get();
				selection.select(null);
			}
			if (context.cursor) set(context.cursor);
			canvas.addMarker(canvas.getRootElement(), DRAG_ACTIVE_CLS);
		}
		stopPropagation$1(event);
		if (context.active) {
			assign(payload, {
				x: round$8(localCurrent.x + displacement.x),
				y: round$8(localCurrent.y + displacement.y),
				dx: round$8(localDelta.x),
				dy: round$8(localDelta.y)
			}, { originalEvent: event });
			fire("move");
		}
	}
	function end(event) {
		var previousContext, returnValue = true;
		if (context.active) {
			if (event) {
				context.payload.originalEvent = event;
				stopPropagation$1(event);
			}
			returnValue = fire("end");
		}
		if (returnValue === false) fire("rejected");
		previousContext = cleanup(returnValue !== true);
		fire("ended", previousContext);
	}
	function cancelOnError() {
		cancel();
	}
	function checkCancel(event) {
		if (isKey("Escape", event)) {
			preventDefault$1(event);
			cancel();
		}
	}
	function trapClickAndEnd(event) {
		var untrap;
		if (context.active) {
			untrap = install(eventBus);
			setTimeout(untrap, 400);
			preventDefault$1(event);
		}
		end(event);
	}
	function trapTouch(event) {
		move(event);
	}
	function hover(event) {
		var payload = context.payload;
		payload.hoverGfx = event.gfx;
		payload.hover = event.element;
		fire("hover");
	}
	function out(event) {
		fire("out");
		var payload = context.payload;
		payload.hoverGfx = null;
		payload.hover = null;
	}
	function cancel(restore) {
		var previousContext;
		if (!context) return;
		var wasActive = context.active;
		eventBus.off("error", cancelOnError);
		try {
			if (wasActive) fire("cancel");
		} finally {
			previousContext = cleanup(restore);
		}
		if (wasActive) fire("canceled", previousContext);
	}
	function cleanup(restore) {
		var previousContext;
		eventBus.off("error", cancelOnError);
		try {
			fire("cleanup");
		} finally {
			previousContext = finishCleanup(restore);
		}
		return previousContext;
	}
	function finishCleanup(restore) {
		var previousContext, endDrag;
		unset();
		if (context.trapClick) endDrag = trapClickAndEnd;
		else endDrag = end;
		event.unbind(document, "mousemove", move);
		event.unbind(document, "dragstart", preventDefault$1);
		event.unbind(document, "selectstart", preventDefault$1);
		event.unbind(document, "mousedown", endDrag, true);
		event.unbind(document, "mouseup", endDrag, true);
		event.unbind(document, "keyup", checkCancel);
		event.unbind(document, "touchstart", trapTouch, true);
		event.unbind(document, "touchcancel", cancel, true);
		event.unbind(document, "touchmove", move, true);
		event.unbind(document, "touchend", end, true);
		eventBus.off("element.hover", hover);
		eventBus.off("element.out", out);
		canvas.removeMarker(canvas.getRootElement(), DRAG_ACTIVE_CLS);
		var previousSelection = context.payload.previousSelection;
		previousContext = context;
		context = null;
		if (restore !== false && previousSelection && !selection.get().length) restoreSelection(previousSelection);
		return previousContext;
	}
	function init(event$1, relativeTo, prefix, options) {
		if (context) cancel(false);
		if (typeof relativeTo === "string") {
			options = prefix;
			prefix = relativeTo;
			relativeTo = null;
		}
		options = assign({}, defaultOptions, options || {});
		var data = options.data || {}, originalEvent, globalStart, localStart, endDrag, isTouch;
		if (options.trapClick) endDrag = trapClickAndEnd;
		else endDrag = end;
		if (event$1) {
			originalEvent = getOriginal$1(event$1) || event$1;
			globalStart = toPoint(event$1);
			stopPropagation$1(event$1);
			if (originalEvent.type === "dragstart") preventDefault$1(originalEvent);
		} else {
			originalEvent = null;
			globalStart = {
				x: 0,
				y: 0
			};
		}
		localStart = toLocalPoint(globalStart);
		if (!relativeTo) relativeTo = localStart;
		isTouch = isTouchEvent(originalEvent);
		context = assign({
			prefix,
			data,
			payload: {},
			globalStart,
			displacement: delta(relativeTo, localStart),
			localStart,
			isTouch
		}, options);
		eventBus.once("error", LOW_PRIORITY$7, cancelOnError);
		if (!options.manual) {
			if (isTouch) {
				event.bind(document, "touchstart", trapTouch, true);
				event.bind(document, "touchcancel", cancel, true);
				event.bind(document, "touchmove", move, true);
				event.bind(document, "touchend", end, true);
			} else {
				event.bind(document, "mousemove", move);
				event.bind(document, "dragstart", preventDefault$1);
				event.bind(document, "selectstart", preventDefault$1);
				event.bind(document, "mousedown", endDrag, true);
				event.bind(document, "mouseup", endDrag, true);
			}
			event.bind(document, "keyup", checkCancel);
			eventBus.on("element.hover", hover);
			eventBus.on("element.out", out);
		}
		if (fire("init") === false) {
			cancel();
			return false;
		}
		if (options.autoActivate) move(event$1, true);
	}
	eventBus.on("diagram.destroy", cancel);
	this.init = init;
	this.move = move;
	this.hover = hover;
	this.out = out;
	this.end = end;
	this.cancel = cancel;
	this.context = function() {
		return context;
	};
	this.setOptions = function(options) {
		assign(defaultOptions, options);
	};
}
Dragging.$inject = [
	"eventBus",
	"canvas",
	"selection",
	"elementRegistry"
];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/dragging/index.js
var dragging_default = {
	__depends__: [hover_fix_default, selection_default],
	dragging: ["type", Dragging]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/auto-scroll/AutoScroll.js
init_dist();
function AutoScroll(config, eventBus, canvas) {
	this._canvas = canvas;
	this._opts = assign({
		scrollThresholdIn: [
			20,
			20,
			20,
			20
		],
		scrollThresholdOut: [
			0,
			0,
			0,
			0
		],
		scrollRepeatTimeout: 15,
		scrollStep: 10
	}, config);
	var self = this;
	eventBus.on("drag.move", function(e) {
		var point = self._toBorderPoint(e);
		self.startScroll(point);
	});
	eventBus.on(["drag.cleanup"], function() {
		self.stopScroll();
	});
}
AutoScroll.$inject = [
	"config.autoScroll",
	"eventBus",
	"canvas"
];
AutoScroll.prototype.startScroll = function(point) {
	var canvas = this._canvas;
	var opts = this._opts;
	var self = this;
	var clientRect = canvas.getContainer().getBoundingClientRect();
	var diff = [
		point.x,
		point.y,
		clientRect.width - point.x,
		clientRect.height - point.y
	];
	this.stopScroll();
	var dx = 0, dy = 0;
	for (var i = 0; i < 4; i++) if (between(diff[i], opts.scrollThresholdOut[i], opts.scrollThresholdIn[i])) {
		if (i === 0) dx = opts.scrollStep;
		else if (i == 1) dy = opts.scrollStep;
		else if (i == 2) dx = -opts.scrollStep;
		else if (i == 3) dy = -opts.scrollStep;
	}
	if (dx !== 0 || dy !== 0) {
		canvas.scroll({
			dx,
			dy
		});
		this._scrolling = setTimeout(function() {
			self.startScroll(point);
		}, opts.scrollRepeatTimeout);
	}
};
function between(val, start, end) {
	if (start < val && val < end) return true;
	return false;
}
AutoScroll.prototype.stopScroll = function() {
	clearTimeout(this._scrolling);
};
AutoScroll.prototype.setOptions = function(options) {
	this._opts = assign({}, this._opts, options);
};
AutoScroll.prototype._toBorderPoint = function(event) {
	var clientRect = this._canvas._container.getBoundingClientRect();
	var globalPosition = toPoint(event.originalEvent);
	return {
		x: globalPosition.x - clientRect.left,
		y: globalPosition.y - clientRect.top
	};
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/auto-scroll/index.js
var auto_scroll_default = {
	__depends__: [dragging_default],
	__init__: ["autoScroll"],
	autoScroll: ["type", AutoScroll]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/rules/Rules.js
function Rules(injector) {
	this._commandStack = injector.get("commandStack", false);
}
Rules.$inject = ["injector"];
Rules.prototype.allowed = function(action, context) {
	var allowed = true;
	var commandStack = this._commandStack;
	if (commandStack) allowed = commandStack.canExecute(action, context);
	return allowed === void 0 ? true : allowed;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/rules/index.js
var rules_default = {
	__init__: ["rules"],
	rules: ["type", Rules]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/util/LineIntersection.js
var round$7 = Math.round;
var max$2 = Math.max;
function circlePath(center, r) {
	return [
		[
			"M",
			center.x,
			center.y
		],
		[
			"m",
			0,
			-r
		],
		[
			"a",
			r,
			r,
			0,
			1,
			1,
			0,
			2 * r
		],
		[
			"a",
			r,
			r,
			0,
			1,
			1,
			0,
			-2 * r
		],
		["z"]
	];
}
function linePath(points) {
	var segments = [];
	points.forEach(function(p, idx) {
		segments.push([
			idx === 0 ? "M" : "L",
			p.x,
			p.y
		]);
	});
	return segments;
}
var INTERSECTION_THRESHOLD = 10;
function getBendpointIntersection(waypoints, reference) {
	var i = 0, w;
	for (; w = waypoints[i]; i++) if (pointDistance(w, reference) <= INTERSECTION_THRESHOLD) return {
		point: waypoints[i],
		bendpoint: true,
		index: i
	};
	return null;
}
function getPathIntersection(waypoints, reference) {
	var intersections = findPathIntersections(circlePath(reference, INTERSECTION_THRESHOLD), linePath(waypoints));
	var a = intersections[0], b = intersections[intersections.length - 1], idx;
	if (!a) return null;
	if (a !== b) {
		if (a.segment2 !== b.segment2) {
			idx = max$2(a.segment2, b.segment2) - 1;
			return {
				point: waypoints[idx],
				bendpoint: true,
				index: idx
			};
		}
		return {
			point: {
				x: round$7(a.x + b.x) / 2,
				y: round$7(a.y + b.y) / 2
			},
			index: a.segment2
		};
	}
	return {
		point: {
			x: round$7(a.x),
			y: round$7(a.y)
		},
		index: a.segment2
	};
}
function getApproxIntersection(waypoints, reference) {
	return getBendpointIntersection(waypoints, reference) || getPathIntersection(waypoints, reference);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/bendpoints/GeometricUtil.js
function vectorLength(vector) {
	return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}
function getAngle(line) {
	return Math.atan((line[1].y - line[0].y) / (line[1].x - line[0].x));
}
function rotateVector(vector, angle) {
	return !angle ? vector : {
		x: Math.cos(angle) * vector.x - Math.sin(angle) * vector.y,
		y: Math.sin(angle) * vector.x + Math.cos(angle) * vector.y
	};
}
function solveLambaSystem(a, b, c) {
	var system = [{
		n: a[0] - c[0],
		lambda: b[0]
	}, {
		n: a[1] - c[1],
		lambda: b[1]
	}];
	var n = system[0].n * b[0] + system[1].n * b[1], l = system[0].lambda * b[0] + system[1].lambda * b[1];
	return -n / l;
}
function perpendicularFoot(point, line) {
	var a = line[0], b = line[1];
	var bd = {
		x: b.x - a.x,
		y: b.y - a.y
	};
	var r = solveLambaSystem([a.x, a.y], [bd.x, bd.y], [point.x, point.y]);
	return {
		x: a.x + r * bd.x,
		y: a.y + r * bd.y
	};
}
function getDistancePointLine(point, line) {
	var pfPoint = perpendicularFoot(point, line);
	return vectorLength({
		x: pfPoint.x - point.x,
		y: pfPoint.y - point.y
	});
}
function getDistancePointPoint(point1, point2) {
	return vectorLength({
		x: point1.x - point2.x,
		y: point1.y - point2.y
	});
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/bendpoints/BendpointUtil.js
var BENDPOINT_CLS = "djs-bendpoint";
var SEGMENT_DRAGGER_CLS = "djs-segment-dragger";
function toCanvasCoordinates(canvas, event) {
	var position = toPoint(event), clientRect = canvas._container.getBoundingClientRect(), offset = {
		x: clientRect.left,
		y: clientRect.top
	};
	var viewbox = canvas.viewbox();
	return {
		x: viewbox.x + (position.x - offset.x) / viewbox.scale,
		y: viewbox.y + (position.y - offset.y) / viewbox.scale
	};
}
function getConnectionIntersection(canvas, waypoints, event) {
	return getApproxIntersection(waypoints, toCanvasCoordinates(canvas, event));
}
function addBendpoint(parentGfx, cls) {
	var groupGfx = create("g");
	classes$1(groupGfx).add(BENDPOINT_CLS);
	append(parentGfx, groupGfx);
	var visual = create("circle");
	attr$1(visual, {
		cx: 0,
		cy: 0,
		r: 4
	});
	classes$1(visual).add("djs-visual");
	append(groupGfx, visual);
	var hit = create("circle");
	attr$1(hit, {
		cx: 0,
		cy: 0,
		r: 10
	});
	classes$1(hit).add("djs-hit");
	append(groupGfx, hit);
	if (cls) classes$1(groupGfx).add(cls);
	return groupGfx;
}
function createParallelDragger(parentGfx, segmentStart, segmentEnd, alignment) {
	var draggerGfx = create("g");
	append(parentGfx, draggerGfx);
	var width = 18, height = 6, padding = 11, hitWidth = calculateHitWidth(segmentStart, segmentEnd, alignment), hitHeight = height + padding;
	var visual = create("rect");
	attr$1(visual, {
		x: -width / 2,
		y: -height / 2,
		rx: 3,
		width,
		height
	});
	classes$1(visual).add("djs-visual");
	append(draggerGfx, visual);
	var hit = create("rect");
	attr$1(hit, {
		x: -hitWidth / 2,
		y: -hitHeight / 2,
		width: hitWidth,
		height: hitHeight
	});
	classes$1(hit).add("djs-hit");
	append(draggerGfx, hit);
	rotate(draggerGfx, alignment === "v" ? 90 : 0, 0, 0);
	return draggerGfx;
}
function addSegmentDragger(parentGfx, segmentStart, segmentEnd) {
	var groupGfx = create("g"), mid = getMidPoint(segmentStart, segmentEnd), alignment = pointsAligned(segmentStart, segmentEnd);
	append(parentGfx, groupGfx);
	createParallelDragger(groupGfx, segmentStart, segmentEnd, alignment);
	classes$1(groupGfx).add(SEGMENT_DRAGGER_CLS);
	classes$1(groupGfx).add(alignment === "h" ? "horizontal" : "vertical");
	translate(groupGfx, mid.x, mid.y);
	return groupGfx;
}
function calculateSegmentMoveRegion(segmentLength) {
	return Math.abs(Math.round(segmentLength * 2 / 3));
}
function getClosestPointOnConnection(position, connection) {
	return perpendicularFoot(position, getClosestSegment(position, connection));
}
function calculateHitWidth(segmentStart, segmentEnd, alignment) {
	var segmentLengthXAxis = segmentEnd.x - segmentStart.x, segmentLengthYAxis = segmentEnd.y - segmentStart.y;
	return alignment === "h" ? calculateSegmentMoveRegion(segmentLengthXAxis) : calculateSegmentMoveRegion(segmentLengthYAxis);
}
function getClosestSegment(position, connection) {
	var waypoints = connection.waypoints;
	var minDistance = Infinity, segmentIndex;
	for (var i = 0; i < waypoints.length - 1; i++) {
		var start = waypoints[i], end = waypoints[i + 1], distance = getDistancePointLine(position, [start, end]);
		if (distance < minDistance) {
			minDistance = distance;
			segmentIndex = i;
		}
	}
	return [waypoints[segmentIndex], waypoints[segmentIndex + 1]];
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/bendpoints/Bendpoints.js
init_dist();
function Bendpoints(eventBus, canvas, interactionEvents, bendpointMove, connectionSegmentMove) {
	function isIntersectionMiddle(intersection, waypoints, treshold) {
		var idx = intersection.index, p = intersection.point, p0, p1, mid, aligned, xDelta, yDelta;
		if (idx <= 0 || intersection.bendpoint) return false;
		p0 = waypoints[idx - 1];
		p1 = waypoints[idx];
		mid = getMidPoint(p0, p1), aligned = pointsAligned(p0, p1);
		xDelta = Math.abs(p.x - mid.x);
		yDelta = Math.abs(p.y - mid.y);
		return aligned && xDelta <= treshold && yDelta <= treshold;
	}
	function calculateIntersectionThreshold(connection, intersection) {
		var waypoints = connection.waypoints, relevantSegment, alignment, segmentLength, threshold;
		if (intersection.index <= 0 || intersection.bendpoint) return null;
		relevantSegment = {
			start: waypoints[intersection.index - 1],
			end: waypoints[intersection.index]
		};
		alignment = pointsAligned(relevantSegment.start, relevantSegment.end);
		if (!alignment) return null;
		if (alignment === "h") segmentLength = relevantSegment.end.x - relevantSegment.start.x;
		else segmentLength = relevantSegment.end.y - relevantSegment.start.y;
		threshold = calculateSegmentMoveRegion(segmentLength) / 2;
		return threshold;
	}
	function activateBendpointMove(event, connection) {
		var waypoints = connection.waypoints, intersection = getConnectionIntersection(canvas, waypoints, event), threshold;
		if (!intersection) return;
		threshold = calculateIntersectionThreshold(connection, intersection);
		var result;
		if (isIntersectionMiddle(intersection, waypoints, threshold)) result = connectionSegmentMove.start(event, connection, intersection.index);
		else result = bendpointMove.start(event, connection, intersection.index, !intersection.bendpoint);
		if (result !== false) return true;
	}
	function bindInteractionEvents(node, eventName, element) {
		event.bind(node, eventName, function(event) {
			interactionEvents.triggerMouseEvent(eventName, event, element);
			event.stopPropagation();
		});
	}
	function getBendpointsContainer(element, create$1) {
		var layer = canvas.getLayer("overlays"), gfx = query(".djs-bendpoints[data-element-id=\"" + escapeCSS(element.id) + "\"]", layer);
		if (!gfx && create$1) {
			gfx = create("g");
			attr$1(gfx, { "data-element-id": element.id });
			classes$1(gfx).add("djs-bendpoints");
			append(layer, gfx);
			bindInteractionEvents(gfx, "mousedown", element);
			bindInteractionEvents(gfx, "click", element);
			bindInteractionEvents(gfx, "dblclick", element);
		}
		return gfx;
	}
	function getSegmentDragger(idx, parentGfx) {
		return query(".djs-segment-dragger[data-segment-idx=\"" + idx + "\"]", parentGfx);
	}
	function createBendpoints(gfx, connection) {
		connection.waypoints.forEach(function(p, idx) {
			var bendpoint = addBendpoint(gfx);
			append(gfx, bendpoint);
			translate(bendpoint, p.x, p.y);
		});
		addBendpoint(gfx, "floating");
	}
	function createSegmentDraggers(gfx, connection) {
		var waypoints = connection.waypoints;
		var segmentStart, segmentEnd, segmentDraggerGfx;
		for (var i = 1; i < waypoints.length; i++) {
			segmentStart = waypoints[i - 1];
			segmentEnd = waypoints[i];
			if (pointsAligned(segmentStart, segmentEnd)) {
				segmentDraggerGfx = addSegmentDragger(gfx, segmentStart, segmentEnd);
				attr$1(segmentDraggerGfx, { "data-segment-idx": i });
				bindInteractionEvents(segmentDraggerGfx, "mousemove", connection);
			}
		}
	}
	function clearBendpoints(gfx) {
		forEach(all("." + BENDPOINT_CLS, gfx), function(node) {
			remove(node);
		});
	}
	function clearSegmentDraggers(gfx) {
		forEach(all("." + SEGMENT_DRAGGER_CLS, gfx), function(node) {
			remove(node);
		});
	}
	function addHandles(connection) {
		var gfx = getBendpointsContainer(connection);
		if (!gfx) {
			gfx = getBendpointsContainer(connection, true);
			createBendpoints(gfx, connection);
			createSegmentDraggers(gfx, connection);
		}
		return gfx;
	}
	function updateHandles(connection) {
		var gfx = getBendpointsContainer(connection);
		if (gfx) {
			clearSegmentDraggers(gfx);
			clearBendpoints(gfx);
			createSegmentDraggers(gfx, connection);
			createBendpoints(gfx, connection);
		}
	}
	function updateFloatingBendpointPosition(parentGfx, intersection) {
		var floating = query(".floating", parentGfx), point = intersection.point;
		if (!floating) return;
		translate(floating, point.x, point.y);
		classes$1(floating).add("positioned");
	}
	function updateSegmentDraggerPosition(parentGfx, intersection, waypoints) {
		var draggerGfx = getSegmentDragger(intersection.index, parentGfx), segmentStart = waypoints[intersection.index - 1], segmentEnd = waypoints[intersection.index], point = intersection.point, mid = getMidPoint(segmentStart, segmentEnd), alignment = pointsAligned(segmentStart, segmentEnd), draggerVisual, relativePosition;
		if (!draggerGfx) return;
		draggerVisual = getDraggerVisual(draggerGfx);
		relativePosition = {
			x: point.x - mid.x,
			y: point.y - mid.y
		};
		if (alignment === "v") relativePosition = {
			x: relativePosition.y,
			y: relativePosition.x
		};
		translate(draggerVisual, relativePosition.x, relativePosition.y);
	}
	eventBus.on("connection.changed", function(event) {
		updateHandles(event.element);
	});
	eventBus.on("connection.remove", function(event) {
		var gfx = getBendpointsContainer(event.element);
		if (gfx) remove(gfx);
	});
	eventBus.on("element.marker.update", function(event) {
		var element = event.element, bendpointsGfx;
		if (!element.waypoints) return;
		bendpointsGfx = addHandles(element);
		if (event.add) classes$1(bendpointsGfx).add(event.marker);
		else classes$1(bendpointsGfx).remove(event.marker);
	});
	eventBus.on("element.mousemove", function(event) {
		var element = event.element, waypoints = element.waypoints, bendpointsGfx, intersection;
		if (waypoints) {
			bendpointsGfx = getBendpointsContainer(element, true);
			intersection = getConnectionIntersection(canvas, waypoints, event.originalEvent);
			if (!intersection) return;
			updateFloatingBendpointPosition(bendpointsGfx, intersection);
			if (!intersection.bendpoint) updateSegmentDraggerPosition(bendpointsGfx, intersection, waypoints);
		}
	});
	eventBus.on("element.mousedown", function(event) {
		if (!isPrimaryButton(event)) return;
		var originalEvent = event.originalEvent, element = event.element;
		if (!element.waypoints) return;
		return activateBendpointMove(originalEvent, element);
	});
	eventBus.on("selection.changed", function(event) {
		var primary = event.newSelection[0];
		if (primary && primary.waypoints) addHandles(primary);
	});
	eventBus.on("element.hover", function(event) {
		var element = event.element;
		if (element.waypoints) addHandles(element);
	});
	eventBus.on("element.out", function(event) {
		var element = event.element;
		if (!element.waypoints) return;
		var bendpointsGfx = getBendpointsContainer(element);
		if (!bendpointsGfx) return;
		var floating = query(".floating", bendpointsGfx);
		if (floating) classes$1(floating).remove("positioned");
	});
	eventBus.on("element.updateId", function(context) {
		var element = context.element, newId = context.newId;
		if (element.waypoints) {
			var bendpointContainer = getBendpointsContainer(element);
			if (bendpointContainer) attr$1(bendpointContainer, { "data-element-id": newId });
		}
	});
	this.addHandles = addHandles;
	this.updateHandles = updateHandles;
	this.getBendpointsContainer = getBendpointsContainer;
	this.getSegmentDragger = getSegmentDragger;
}
Bendpoints.$inject = [
	"eventBus",
	"canvas",
	"interactionEvents",
	"bendpointMove",
	"connectionSegmentMove"
];
function getDraggerVisual(draggerGfx) {
	return query(".djs-visual", draggerGfx);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/bendpoints/BendpointMove.js
var round$6 = Math.round;
var RECONNECT_START$1 = "reconnectStart";
var RECONNECT_END$1 = "reconnectEnd";
var UPDATE_WAYPOINTS$1 = "updateWaypoints";
function BendpointMove(injector, eventBus, canvas, dragging, rules, modeling) {
	this._injector = injector;
	this.start = function(event, connection, bendpointIndex, insert) {
		var gfx = canvas.getGraphics(connection), source = connection.source, target = connection.target, waypoints = connection.waypoints, type;
		if (!insert && bendpointIndex === 0) type = RECONNECT_START$1;
		else if (!insert && bendpointIndex === waypoints.length - 1) type = RECONNECT_END$1;
		else type = UPDATE_WAYPOINTS$1;
		var command = type === UPDATE_WAYPOINTS$1 ? "connection.updateWaypoints" : "connection.reconnect";
		var allowed = rules.allowed(command, {
			connection,
			source,
			target
		});
		if (allowed === false) allowed = rules.allowed(command, {
			connection,
			source: target,
			target: source
		});
		if (allowed === false) return;
		return dragging.init(event, "bendpoint.move", { data: {
			connection,
			connectionGfx: gfx,
			context: {
				allowed,
				bendpointIndex,
				connection,
				source,
				target,
				insert,
				type
			}
		} });
	};
	eventBus.on("bendpoint.move.hover", function(event) {
		var context = event.context, connection = context.connection, source = connection.source, target = connection.target, hover = event.hover, type = context.type;
		context.hover = hover;
		var allowed;
		if (!hover) return;
		var command = type === UPDATE_WAYPOINTS$1 ? "connection.updateWaypoints" : "connection.reconnect";
		allowed = context.allowed = rules.allowed(command, {
			connection,
			source: type === RECONNECT_START$1 ? hover : source,
			target: type === RECONNECT_END$1 ? hover : target
		});
		if (allowed) {
			context.source = type === RECONNECT_START$1 ? hover : source;
			context.target = type === RECONNECT_END$1 ? hover : target;
			return;
		}
		if (allowed === false) allowed = context.allowed = rules.allowed(command, {
			connection,
			source: type === RECONNECT_END$1 ? hover : target,
			target: type === RECONNECT_START$1 ? hover : source
		});
		if (allowed) {
			context.source = type === RECONNECT_END$1 ? hover : target;
			context.target = type === RECONNECT_START$1 ? hover : source;
		}
	});
	eventBus.on(["bendpoint.move.out", "bendpoint.move.cleanup"], function(event) {
		var context = event.context, type = context.type;
		context.hover = null;
		context.source = null;
		context.target = null;
		if (type !== UPDATE_WAYPOINTS$1) context.allowed = false;
	});
	eventBus.on("bendpoint.move.end", function(event) {
		var context = event.context, allowed = context.allowed, bendpointIndex = context.bendpointIndex, connection = context.connection, insert = context.insert, newWaypoints = connection.waypoints.slice(), source = context.source, target = context.target, type = context.type, hints = context.hints || {};
		var docking = {
			x: round$6(event.x),
			y: round$6(event.y)
		};
		if (!allowed) return false;
		if (type === UPDATE_WAYPOINTS$1) {
			if (insert) newWaypoints.splice(bendpointIndex, 0, docking);
			else newWaypoints[bendpointIndex] = docking;
			hints.bendpointMove = {
				insert,
				bendpointIndex
			};
			newWaypoints = this.cropWaypoints(connection, newWaypoints);
			modeling.updateWaypoints(connection, filterRedundantWaypoints(newWaypoints), hints);
		} else {
			if (type === RECONNECT_START$1) {
				hints.docking = "source";
				if (isReverse$1(context)) {
					hints.docking = "target";
					hints.newWaypoints = newWaypoints.reverse();
				}
			} else if (type === RECONNECT_END$1) {
				hints.docking = "target";
				if (isReverse$1(context)) {
					hints.docking = "source";
					hints.newWaypoints = newWaypoints.reverse();
				}
			}
			modeling.reconnect(connection, source, target, docking, hints);
		}
	}, this);
}
BendpointMove.$inject = [
	"injector",
	"eventBus",
	"canvas",
	"dragging",
	"rules",
	"modeling"
];
BendpointMove.prototype.cropWaypoints = function(connection, newWaypoints) {
	var connectionDocking = this._injector.get("connectionDocking", false);
	if (!connectionDocking) return newWaypoints;
	var waypoints = connection.waypoints;
	connection.waypoints = newWaypoints;
	connection.waypoints = connectionDocking.getCroppedWaypoints(connection);
	newWaypoints = connection.waypoints;
	connection.waypoints = waypoints;
	return newWaypoints;
};
function isReverse$1(context) {
	var hover = context.hover, source = context.source, target = context.target, type = context.type;
	if (type === RECONNECT_START$1) return hover && target && hover === target && source !== target;
	if (type === RECONNECT_END$1) return hover && source && hover === source && source !== target;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/bendpoints/BendpointMovePreview.js
var RECONNECT_START = "reconnectStart";
var RECONNECT_END = "reconnectEnd";
var UPDATE_WAYPOINTS = "updateWaypoints";
var MARKER_OK$3 = "connect-ok";
var MARKER_NOT_OK$3 = "connect-not-ok";
var MARKER_CONNECT_HOVER$1 = "connect-hover";
var MARKER_CONNECT_UPDATING$1 = "djs-updating";
var MARKER_DRAGGER = "djs-dragging";
var HIGH_PRIORITY$5 = 1100;
function BendpointMovePreview(bendpointMove, injector, eventBus, canvas) {
	this._injector = injector;
	var connectionPreview = injector.get("connectionPreview", false);
	eventBus.on("bendpoint.move.start", function(event) {
		var context = event.context, bendpointIndex = context.bendpointIndex, connection = context.connection, insert = context.insert, waypoints = connection.waypoints, newWaypoints = waypoints.slice();
		context.waypoints = waypoints;
		if (insert) newWaypoints.splice(bendpointIndex, 0, {
			x: event.x,
			y: event.y
		});
		connection.waypoints = newWaypoints;
		var draggerGfx = context.draggerGfx = addBendpoint(canvas.getLayer("overlays"));
		classes$1(draggerGfx).add("djs-dragging");
		canvas.addMarker(connection, MARKER_DRAGGER);
		canvas.addMarker(connection, MARKER_CONNECT_UPDATING$1);
	});
	eventBus.on("bendpoint.move.hover", function(event) {
		var context = event.context, allowed = context.allowed, hover = context.hover, type = context.type;
		if (hover) {
			canvas.addMarker(hover, MARKER_CONNECT_HOVER$1);
			if (type === UPDATE_WAYPOINTS) return;
			if (allowed) {
				canvas.removeMarker(hover, MARKER_NOT_OK$3);
				canvas.addMarker(hover, MARKER_OK$3);
			} else if (allowed === false) {
				canvas.removeMarker(hover, MARKER_OK$3);
				canvas.addMarker(hover, MARKER_NOT_OK$3);
			}
		}
	});
	eventBus.on(["bendpoint.move.out", "bendpoint.move.cleanup"], HIGH_PRIORITY$5, function(event) {
		var context = event.context, hover = context.hover, target = context.target;
		if (hover) {
			canvas.removeMarker(hover, MARKER_CONNECT_HOVER$1);
			canvas.removeMarker(hover, target ? MARKER_OK$3 : MARKER_NOT_OK$3);
		}
	});
	eventBus.on("bendpoint.move.move", function(event) {
		var context = event.context, allowed = context.allowed, bendpointIndex = context.bendpointIndex, draggerGfx = context.draggerGfx, hover = context.hover, type = context.type, connection = context.connection, source = connection.source, target = connection.target, newWaypoints = connection.waypoints.slice(), bendpoint = {
			x: event.x,
			y: event.y
		}, hints = context.hints || {}, drawPreviewHints = {};
		if (connectionPreview) {
			if (hints.connectionStart) drawPreviewHints.connectionStart = hints.connectionStart;
			if (hints.connectionEnd) drawPreviewHints.connectionEnd = hints.connectionEnd;
			if (type === RECONNECT_START) {
				if (isReverse$1(context)) {
					drawPreviewHints.connectionEnd = drawPreviewHints.connectionEnd || bendpoint;
					drawPreviewHints.source = target;
					drawPreviewHints.target = hover || source;
					newWaypoints = newWaypoints.reverse();
				} else {
					drawPreviewHints.connectionStart = drawPreviewHints.connectionStart || bendpoint;
					drawPreviewHints.source = hover || source;
					drawPreviewHints.target = target;
				}
			} else if (type === RECONNECT_END) {
				if (isReverse$1(context)) {
					drawPreviewHints.connectionStart = drawPreviewHints.connectionStart || bendpoint;
					drawPreviewHints.source = hover || target;
					drawPreviewHints.target = source;
					newWaypoints = newWaypoints.reverse();
				} else {
					drawPreviewHints.connectionEnd = drawPreviewHints.connectionEnd || bendpoint;
					drawPreviewHints.source = source;
					drawPreviewHints.target = hover || target;
				}
			} else {
				drawPreviewHints.noCropping = true;
				drawPreviewHints.noLayout = true;
				newWaypoints[bendpointIndex] = bendpoint;
			}
			if (type === UPDATE_WAYPOINTS) newWaypoints = bendpointMove.cropWaypoints(connection, newWaypoints);
			drawPreviewHints.waypoints = newWaypoints;
			connectionPreview.drawPreview(context, allowed, drawPreviewHints);
		}
		translate(draggerGfx, event.x, event.y);
	}, this);
	eventBus.on(["bendpoint.move.end", "bendpoint.move.cancel"], HIGH_PRIORITY$5, function(event) {
		var context = event.context, connection = context.connection, draggerGfx = context.draggerGfx, hover = context.hover, target = context.target;
		connection.waypoints = context.waypoints;
		remove(draggerGfx);
		canvas.removeMarker(connection, MARKER_CONNECT_UPDATING$1);
		canvas.removeMarker(connection, MARKER_DRAGGER);
		if (hover) {
			canvas.removeMarker(hover, MARKER_OK$3);
			canvas.removeMarker(hover, target ? MARKER_OK$3 : MARKER_NOT_OK$3);
		}
		if (connectionPreview) connectionPreview.cleanUp(context);
	});
}
BendpointMovePreview.$inject = [
	"bendpointMove",
	"injector",
	"eventBus",
	"canvas"
];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/bendpoints/ConnectionSegmentMove.js
var MARKER_CONNECT_HOVER = "connect-hover";
var MARKER_CONNECT_UPDATING = "djs-updating";
function axisAdd(point, axis, delta) {
	return axisSet(point, axis, point[axis] + delta);
}
function axisSet(point, axis, value) {
	return {
		x: axis === "x" ? value : point.x,
		y: axis === "y" ? value : point.y
	};
}
function axisFenced(position, segmentStart, segmentEnd, axis) {
	var maxValue = Math.max(segmentStart[axis], segmentEnd[axis]), minValue = Math.min(segmentStart[axis], segmentEnd[axis]);
	var padding = 20;
	return axisSet(segmentStart, axis, Math.min(Math.max(minValue + padding, position[axis]), maxValue - padding));
}
function flipAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getDocking$1(point, referenceElement, moveAxis) {
	var referenceMid, inverseAxis;
	if (point.original) return point.original;
	else {
		referenceMid = getMid(referenceElement);
		inverseAxis = flipAxis(moveAxis);
		return axisSet(point, inverseAxis, referenceMid[inverseAxis]);
	}
}
function ConnectionSegmentMove(injector, eventBus, canvas, dragging, graphicsFactory, modeling) {
	var connectionDocking = injector.get("connectionDocking", false);
	this.start = function(event, connection, idx) {
		var context, gfx = canvas.getGraphics(connection), segmentStartIndex = idx - 1, segmentEndIndex = idx, waypoints = connection.waypoints, segmentStart = waypoints[segmentStartIndex], segmentEnd = waypoints[segmentEndIndex], intersection = getConnectionIntersection(canvas, waypoints, event), direction = pointsAligned(segmentStart, segmentEnd), axis, dragPosition;
		if (!direction) return;
		axis = direction === "v" ? "x" : "y";
		if (segmentStartIndex === 0) segmentStart = getDocking$1(segmentStart, connection.source, axis);
		if (segmentEndIndex === waypoints.length - 1) segmentEnd = getDocking$1(segmentEnd, connection.target, axis);
		if (intersection) dragPosition = intersection.point;
		else dragPosition = {
			x: (segmentStart.x + segmentEnd.x) / 2,
			y: (segmentStart.y + segmentEnd.y) / 2
		};
		context = {
			connection,
			segmentStartIndex,
			segmentEndIndex,
			segmentStart,
			segmentEnd,
			axis,
			dragPosition
		};
		return dragging.init(event, dragPosition, "connectionSegment.move", {
			cursor: axis === "x" ? "resize-ew" : "resize-ns",
			data: {
				connection,
				connectionGfx: gfx,
				context
			}
		});
	};
	function cropConnection(connection, newWaypoints) {
		if (!connectionDocking) return newWaypoints;
		var oldWaypoints = connection.waypoints, croppedWaypoints;
		connection.waypoints = newWaypoints;
		croppedWaypoints = connectionDocking.getCroppedWaypoints(connection);
		connection.waypoints = oldWaypoints;
		return croppedWaypoints;
	}
	function redrawConnection(data) {
		graphicsFactory.update("connection", data.connection, data.connectionGfx);
	}
	function updateDragger(context, segmentOffset, event) {
		var newWaypoints = context.newWaypoints, segmentStart = newWaypoints[context.segmentStartIndex + segmentOffset], segmentEnd = newWaypoints[context.segmentEndIndex + segmentOffset];
		var draggerPosition = axisFenced(event, segmentStart, segmentEnd, flipAxis(context.axis));
		translate(context.draggerGfx, draggerPosition.x, draggerPosition.y);
	}
	function filterRedundantWaypoints(waypoints, segmentStartIndex) {
		var segmentOffset = 0;
		return {
			waypoints: waypoints.filter(function(r, idx) {
				if (pointsOnLine(waypoints[idx - 1], waypoints[idx + 1], r)) {
					segmentOffset = idx <= segmentStartIndex ? segmentOffset - 1 : segmentOffset;
					return false;
				}
				return true;
			}),
			segmentOffset
		};
	}
	eventBus.on("connectionSegment.move.start", function(event) {
		var context = event.context, connection = event.connection, layer = canvas.getLayer("overlays");
		context.originalWaypoints = connection.waypoints.slice();
		context.draggerGfx = addSegmentDragger(layer, context.segmentStart, context.segmentEnd);
		classes$1(context.draggerGfx).add("djs-dragging");
		canvas.addMarker(connection, MARKER_CONNECT_UPDATING);
	});
	eventBus.on("connectionSegment.move.move", function(event) {
		var context = event.context, connection = context.connection, segmentStartIndex = context.segmentStartIndex, segmentEndIndex = context.segmentEndIndex, segmentStart = context.segmentStart, segmentEnd = context.segmentEnd, axis = context.axis;
		var newWaypoints = context.originalWaypoints.slice(), newSegmentStart = axisAdd(segmentStart, axis, event["d" + axis]), newSegmentEnd = axisAdd(segmentEnd, axis, event["d" + axis]);
		var waypointCount = newWaypoints.length, segmentOffset = 0;
		newWaypoints[segmentStartIndex] = newSegmentStart;
		newWaypoints[segmentEndIndex] = newSegmentEnd;
		var sourceToSegmentOrientation, targetToSegmentOrientation;
		if (segmentStartIndex < 2) {
			sourceToSegmentOrientation = getOrientation(connection.source, newSegmentStart);
			if (segmentStartIndex === 1) {
				if (sourceToSegmentOrientation === "intersect") {
					newWaypoints.shift();
					newWaypoints[0] = newSegmentStart;
					segmentOffset--;
				}
			} else if (sourceToSegmentOrientation !== "intersect") {
				newWaypoints.unshift(segmentStart);
				segmentOffset++;
			}
		}
		if (segmentEndIndex > waypointCount - 3) {
			targetToSegmentOrientation = getOrientation(connection.target, newSegmentEnd);
			if (segmentEndIndex === waypointCount - 2) {
				if (targetToSegmentOrientation === "intersect") {
					newWaypoints.pop();
					newWaypoints[newWaypoints.length - 1] = newSegmentEnd;
				}
			} else if (targetToSegmentOrientation !== "intersect") newWaypoints.push(segmentEnd);
		}
		context.newWaypoints = connection.waypoints = cropConnection(connection, newWaypoints);
		updateDragger(context, segmentOffset, event);
		context.newSegmentStartIndex = segmentStartIndex + segmentOffset;
		redrawConnection(event);
	});
	eventBus.on("connectionSegment.move.hover", function(event) {
		event.context.hover = event.hover;
		canvas.addMarker(event.hover, MARKER_CONNECT_HOVER);
	});
	eventBus.on(["connectionSegment.move.out", "connectionSegment.move.cleanup"], function(event) {
		var hover = event.context.hover;
		if (hover) canvas.removeMarker(hover, MARKER_CONNECT_HOVER);
	});
	eventBus.on("connectionSegment.move.cleanup", function(event) {
		var context = event.context, connection = context.connection;
		if (context.draggerGfx) remove(context.draggerGfx);
		canvas.removeMarker(connection, MARKER_CONNECT_UPDATING);
	});
	eventBus.on(["connectionSegment.move.cancel", "connectionSegment.move.end"], function(event) {
		var context = event.context, connection = context.connection;
		connection.waypoints = context.originalWaypoints;
		redrawConnection(event);
	});
	eventBus.on("connectionSegment.move.end", function(event) {
		var context = event.context, connection = context.connection, newWaypoints = context.newWaypoints, newSegmentStartIndex = context.newSegmentStartIndex;
		newWaypoints = newWaypoints.map(function(p) {
			return {
				original: p.original,
				x: Math.round(p.x),
				y: Math.round(p.y)
			};
		});
		var filtered = filterRedundantWaypoints(newWaypoints, newSegmentStartIndex);
		var filteredWaypoints = filtered.waypoints, croppedWaypoints = cropConnection(connection, filteredWaypoints), segmentOffset = filtered.segmentOffset;
		var hints = { segmentMove: {
			segmentStartIndex: context.segmentStartIndex,
			newSegmentStartIndex: newSegmentStartIndex + segmentOffset
		} };
		modeling.updateWaypoints(connection, croppedWaypoints, hints);
	});
}
ConnectionSegmentMove.$inject = [
	"injector",
	"eventBus",
	"canvas",
	"dragging",
	"graphicsFactory",
	"modeling"
];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/snapping/SnapUtil.js
var abs$1 = Math.abs;
var round$5 = Math.round;
function snapTo(value, values, tolerance) {
	tolerance = tolerance === void 0 ? 10 : tolerance;
	var idx = 0, snapValue;
	for (; idx < values.length; idx++) {
		snapValue = values[idx];
		if (abs$1(snapValue - value) <= tolerance) return snapValue;
	}
}
function topLeft(bounds) {
	return {
		x: bounds.x,
		y: bounds.y
	};
}
function bottomRight(bounds) {
	return {
		x: bounds.x + bounds.width,
		y: bounds.y + bounds.height
	};
}
function mid$1(bounds, defaultValue) {
	if (!bounds || isNaN(bounds.x) || isNaN(bounds.y)) return defaultValue;
	return {
		x: round$5(bounds.x + bounds.width / 2),
		y: round$5(bounds.y + bounds.height / 2)
	};
}
function isSnapped(event, axis) {
	var snapped = event.snapped;
	if (!snapped) return false;
	if (typeof axis === "string") return snapped[axis];
	return snapped.x && snapped.y;
}
function setSnapped(event, axis, value) {
	if (typeof axis !== "string") throw new Error("axis must be in [x, y]");
	if (typeof value !== "number" && value !== false) throw new Error("value must be Number or false");
	var delta, previousValue = event[axis];
	var snapped = event.snapped = event.snapped || {};
	if (value === false) snapped[axis] = false;
	else {
		snapped[axis] = true;
		delta = value - previousValue;
		event[axis] += delta;
		event["d" + axis] += delta;
	}
	return previousValue;
}
function getChildren(parent) {
	return parent.children || [];
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/bendpoints/BendpointSnapping.js
init_dist();
var abs = Math.abs;
var round$4 = Math.round;
var TOLERANCE = 10;
function BendpointSnapping(eventBus) {
	function snapTo(values, value) {
		if (isArray(values)) {
			var i = values.length;
			while (i--) if (abs(values[i] - value) <= TOLERANCE) return values[i];
		} else {
			values = +values;
			var rem = value % values;
			if (rem < TOLERANCE) return value - rem;
			if (rem > values - TOLERANCE) return value - rem + values;
		}
		return value;
	}
	function getSnapPoint(element, event) {
		if (element.waypoints) return getClosestPointOnConnection(event, element);
		if (element.width) return {
			x: round$4(element.width / 2 + element.x),
			y: round$4(element.height / 2 + element.y)
		};
	}
	function getConnectionSegmentSnaps(event) {
		var context = event.context, snapPoints = context.snapPoints, connection = context.connection, waypoints = connection.waypoints, segmentStart = context.segmentStart, segmentStartIndex = context.segmentStartIndex, segmentEnd = context.segmentEnd, segmentEndIndex = context.segmentEndIndex, axis = context.axis;
		if (snapPoints) return snapPoints;
		var referenceWaypoints = [
			waypoints[segmentStartIndex - 1],
			segmentStart,
			segmentEnd,
			waypoints[segmentEndIndex + 1]
		];
		if (segmentStartIndex < 2) referenceWaypoints.unshift(getSnapPoint(connection.source, event));
		if (segmentEndIndex > waypoints.length - 3) referenceWaypoints.unshift(getSnapPoint(connection.target, event));
		context.snapPoints = snapPoints = {
			horizontal: [],
			vertical: []
		};
		forEach(referenceWaypoints, function(p) {
			if (p) {
				p = p.original || p;
				if (axis === "y") snapPoints.horizontal.push(p.y);
				if (axis === "x") snapPoints.vertical.push(p.x);
			}
		});
		return snapPoints;
	}
	eventBus.on("connectionSegment.move.move", 1500, function(event) {
		var snapPoints = getConnectionSegmentSnaps(event), x = event.x, y = event.y, sx, sy;
		if (!snapPoints) return;
		sx = snapTo(snapPoints.vertical, x);
		sy = snapTo(snapPoints.horizontal, y);
		var cx = x - sx, cy = y - sy;
		assign(event, {
			dx: event.dx - cx,
			dy: event.dy - cy,
			x: sx,
			y: sy
		});
		if (cx || snapPoints.vertical.indexOf(x) !== -1) setSnapped(event, "x", sx);
		if (cy || snapPoints.horizontal.indexOf(y) !== -1) setSnapped(event, "y", sy);
	});
	function getBendpointSnaps(context) {
		var snapPoints = context.snapPoints, waypoints = context.connection.waypoints, bendpointIndex = context.bendpointIndex;
		if (snapPoints) return snapPoints;
		var referenceWaypoints = [waypoints[bendpointIndex - 1], waypoints[bendpointIndex + 1]];
		context.snapPoints = snapPoints = {
			horizontal: [],
			vertical: []
		};
		forEach(referenceWaypoints, function(p) {
			if (p) {
				p = p.original || p;
				snapPoints.horizontal.push(p.y);
				snapPoints.vertical.push(p.x);
			}
		});
		return snapPoints;
	}
	eventBus.on([
		"connect.hover",
		"connect.move",
		"connect.end"
	], 1500, function(event) {
		var hover = event.context.hover, hoverMid = hover && getSnapPoint(hover, event);
		if (!isConnection(hover) || !hoverMid || !hoverMid.x || !hoverMid.y) return;
		setSnapped(event, "x", hoverMid.x);
		setSnapped(event, "y", hoverMid.y);
	});
	eventBus.on(["bendpoint.move.move", "bendpoint.move.end"], 1500, function(event) {
		var context = event.context, snapPoints = getBendpointSnaps(context), hover = context.hover, hoverMid = hover && getSnapPoint(hover, event), x = event.x, y = event.y, sx, sy;
		if (!snapPoints) return;
		sx = snapTo(hoverMid ? snapPoints.vertical.concat([hoverMid.x]) : snapPoints.vertical, x);
		sy = snapTo(hoverMid ? snapPoints.horizontal.concat([hoverMid.y]) : snapPoints.horizontal, y);
		var cx = x - sx, cy = y - sy;
		assign(event, {
			dx: event.dx - cx,
			dy: event.dy - cy,
			x: event.x - cx,
			y: event.y - cy
		});
		if (cx || snapPoints.vertical.indexOf(x) !== -1) setSnapped(event, "x", sx);
		if (cy || snapPoints.horizontal.indexOf(y) !== -1) setSnapped(event, "y", sy);
	});
}
BendpointSnapping.$inject = ["eventBus"];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/bendpoints/index.js
var bendpoints_default = {
	__depends__: [dragging_default, rules_default],
	__init__: [
		"bendpoints",
		"bendpointSnapping",
		"bendpointMovePreview"
	],
	bendpoints: ["type", Bendpoints],
	bendpointMove: ["type", BendpointMove],
	bendpointMovePreview: ["type", BendpointMovePreview],
	connectionSegmentMove: ["type", ConnectionSegmentMove],
	bendpointSnapping: ["type", BendpointSnapping]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/connect/Connect.js
init_dist();
function Connect(eventBus, dragging, modeling, rules) {
	function canConnect(source, target) {
		return rules.allowed("connection.create", {
			source,
			target
		});
	}
	function canConnectReverse(source, target) {
		return canConnect(target, source);
	}
	eventBus.on("connect.hover", function(event) {
		var context = event.context, start = context.start, hover = event.hover, canExecute;
		context.hover = hover;
		canExecute = context.canExecute = canConnect(start, hover);
		if (isNil(canExecute)) return;
		if (canExecute !== false) {
			context.source = start;
			context.target = hover;
			return;
		}
		canExecute = context.canExecute = canConnectReverse(start, hover);
		if (isNil(canExecute)) return;
		if (canExecute !== false) {
			context.source = hover;
			context.target = start;
		}
	});
	eventBus.on(["connect.out", "connect.cleanup"], function(event) {
		var context = event.context;
		context.hover = null;
		context.source = null;
		context.target = null;
		context.canExecute = false;
	});
	eventBus.on("connect.end", function(event) {
		var context = event.context, canExecute = context.canExecute, connectionStart = context.connectionStart, connectionEnd = {
			x: event.x,
			y: event.y
		}, source = context.source, target = context.target;
		if (!canExecute) return false;
		var attrs = null, hints = {
			connectionStart: isReverse(context) ? connectionEnd : connectionStart,
			connectionEnd: isReverse(context) ? connectionStart : connectionEnd
		};
		if (isObject(canExecute)) attrs = canExecute;
		context.connection = modeling.connect(source, target, attrs, hints);
	});
	this.start = function(event, start, connectionStart, autoActivate) {
		if (!isObject(connectionStart)) {
			autoActivate = connectionStart;
			connectionStart = getMid(start);
		}
		dragging.init(event, "connect", {
			autoActivate,
			data: {
				shape: start,
				context: {
					start,
					connectionStart
				}
			}
		});
	};
}
Connect.$inject = [
	"eventBus",
	"dragging",
	"modeling",
	"rules"
];
function isReverse(context) {
	var hover = context.hover, source = context.source, target = context.target;
	return hover && source && hover === source && source !== target;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/connect/ConnectPreview.js
var HIGH_PRIORITY$4 = 1100;
var LOW_PRIORITY$6 = 900;
var MARKER_OK$2 = "connect-ok";
var MARKER_NOT_OK$2 = "connect-not-ok";
function ConnectPreview(injector, eventBus, canvas) {
	var connectionPreview = injector.get("connectionPreview", false);
	connectionPreview && eventBus.on("connect.move", function(event) {
		var context = event.context, canConnect = context.canExecute, hover = context.hover, source = context.source, start = context.start, startPosition = context.startPosition, target = context.target, connectionStart = context.connectionStart || startPosition, connectionEnd = context.connectionEnd || {
			x: event.x,
			y: event.y
		}, previewStart = connectionStart, previewEnd = connectionEnd;
		if (isReverse(context)) {
			previewStart = connectionEnd;
			previewEnd = connectionStart;
		}
		connectionPreview.drawPreview(context, canConnect, {
			source: source || start,
			target: target || hover,
			connectionStart: previewStart,
			connectionEnd: previewEnd
		});
	});
	eventBus.on("connect.hover", LOW_PRIORITY$6, function(event) {
		var context = event.context, hover = event.hover, canExecute = context.canExecute;
		if (canExecute === null) return;
		canvas.addMarker(hover, canExecute ? MARKER_OK$2 : MARKER_NOT_OK$2);
	});
	eventBus.on(["connect.out", "connect.cleanup"], HIGH_PRIORITY$4, function(event) {
		var hover = event.hover;
		if (hover) {
			canvas.removeMarker(hover, MARKER_OK$2);
			canvas.removeMarker(hover, MARKER_NOT_OK$2);
		}
	});
	connectionPreview && eventBus.on("connect.cleanup", function(event) {
		connectionPreview.cleanUp(event.context);
	});
}
ConnectPreview.$inject = [
	"injector",
	"eventBus",
	"canvas"
];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/connect/index.js
var connect_default = {
	__depends__: [
		selection_default,
		rules_default,
		dragging_default
	],
	__init__: ["connectPreview"],
	connect: ["type", Connect],
	connectPreview: ["type", ConnectPreview]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/preview-support/PreviewSupport.js
var cloneIds = new IdGenerator("ps");
var MARKER_TYPES = [
	"marker-start",
	"marker-mid",
	"marker-end"
];
var NODES_CAN_HAVE_MARKER = [
	"circle",
	"ellipse",
	"line",
	"path",
	"polygon",
	"polyline",
	"path",
	"rect"
];
function PreviewSupport(elementRegistry, eventBus, canvas, styles) {
	this._elementRegistry = elementRegistry;
	this._canvas = canvas;
	this._styles = styles;
}
PreviewSupport.$inject = [
	"elementRegistry",
	"eventBus",
	"canvas",
	"styles"
];
PreviewSupport.prototype.cleanUp = function() {
	console.warn("PreviewSupport#cleanUp is deprecated and will be removed in future versions. You do not need to manually clean up previews anymore. cf. https://github.com/bpmn-io/diagram-js/pull/906");
};
PreviewSupport.prototype.getGfx = function(element) {
	return this._elementRegistry.getGraphics(element);
};
PreviewSupport.prototype.addDragger = function(element, group, gfx, className = "djs-dragger") {
	gfx = gfx || this.getGfx(element);
	var dragger = clone(gfx);
	this._cloneMarkers(getVisual(dragger), className);
	attr$1(dragger, this._styles.cls(className, []));
	append(group, dragger);
	attr$1(dragger, "data-preview-support-element-id", element.id);
	return dragger;
};
PreviewSupport.prototype.addFrame = function(shape, group) {
	var frame = create("rect", {
		class: "djs-resize-overlay",
		width: shape.width,
		height: shape.height,
		x: shape.x,
		y: shape.y
	});
	append(group, frame);
	attr$1(frame, "data-preview-support-element-id", shape.id);
	return frame;
};
PreviewSupport.prototype._cloneMarkers = function(gfx, className = "djs-dragger", rootGfx = gfx) {
	var self = this;
	if (gfx.childNodes) gfx.childNodes.forEach((childNode) => {
		self._cloneMarkers(childNode, className, rootGfx);
	});
	if (!canHaveMarker(gfx)) return;
	MARKER_TYPES.forEach(function(markerType) {
		if (attr$1(gfx, markerType)) {
			var marker = getMarker(gfx, markerType, self._canvas.getContainer());
			marker && self._cloneMarker(rootGfx, gfx, marker, markerType, className);
		}
	});
};
PreviewSupport.prototype._cloneMarker = function(parentGfx, gfx, marker, markerType, className = "djs-dragger") {
	var clonedMarkerId = [
		marker.id,
		className,
		cloneIds.next()
	].join("-");
	var copiedMarker = query("marker#" + marker.id, parentGfx);
	parentGfx = parentGfx || this._canvas._svg;
	var clonedMarker = copiedMarker || clone(marker);
	clonedMarker.id = clonedMarkerId;
	classes$1(clonedMarker).add(className);
	var defs = query(":scope > defs", parentGfx);
	if (!defs) {
		defs = create("defs");
		append(parentGfx, defs);
	}
	append(defs, clonedMarker);
	var reference = idToReference(clonedMarker.id);
	attr$1(gfx, markerType, reference);
};
function getMarker(node, markerType, parentNode) {
	var id = referenceToId(attr$1(node, markerType));
	return query("marker#" + id, parentNode || document);
}
function referenceToId(reference) {
	return reference.match(/url\(['"]?#([^'"]*)['"]?\)/)[1];
}
function idToReference(id) {
	return "url(#" + id + ")";
}
function canHaveMarker(node) {
	return NODES_CAN_HAVE_MARKER.indexOf(node.nodeName) !== -1;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/preview-support/index.js
var preview_support_default = {
	__init__: ["previewSupport"],
	previewSupport: ["type", PreviewSupport]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/create/Create.js
init_dist();
var MARKER_OK$1 = "drop-ok";
var MARKER_NOT_OK$1 = "drop-not-ok";
var MARKER_ATTACH$1 = "attach-ok";
var MARKER_NEW_PARENT$1 = "new-parent";
var PREFIX = "create";
var HIGH_PRIORITY$3 = 2e3;
function Create(canvas, dragging, eventBus, modeling, rules) {
	function canCreate(elements, target, position, source, hints) {
		if (!target) return false;
		elements = filter(elements, function(element) {
			var labelTarget = element.labelTarget;
			return !element.parent && !(isLabel(element) && elements.indexOf(labelTarget) !== -1);
		});
		var shape = find(elements, function(element) {
			return !isConnection(element);
		});
		var attach = false, connect = false, create = false;
		if (isSingleShape(elements)) attach = rules.allowed("shape.attach", {
			position,
			shape,
			target
		});
		if (!attach) {
			if (isSingleShape(elements)) create = rules.allowed("shape.create", {
				position,
				shape,
				source,
				target
			});
			else create = rules.allowed("elements.create", {
				elements,
				position,
				target
			});
		}
		var connectionTarget = hints.connectionTarget;
		if (create || attach) {
			if (shape && source) connect = rules.allowed("connection.create", {
				source: connectionTarget === source ? shape : source,
				target: connectionTarget === source ? source : shape,
				hints: {
					targetParent: target,
					targetAttach: attach
				}
			});
			return {
				attach,
				connect
			};
		}
		if (create === null || attach === null) return null;
		return false;
	}
	function setMarker(element, marker) {
		[
			MARKER_ATTACH$1,
			MARKER_OK$1,
			MARKER_NOT_OK$1,
			MARKER_NEW_PARENT$1
		].forEach(function(m) {
			if (m === marker) canvas.addMarker(element, m);
			else canvas.removeMarker(element, m);
		});
	}
	eventBus.on(["create.move", "create.hover"], function(event) {
		var context = event.context, elements = context.elements, hover = event.hover, source = context.source, hints = context.hints || {};
		if (!hover) {
			context.canExecute = false;
			context.target = null;
			return;
		}
		ensureConstraints$1(event);
		var position = {
			x: event.x,
			y: event.y
		};
		var canExecute = context.canExecute = hover && canCreate(elements, hover, position, source, hints);
		if (hover && canExecute !== null) {
			context.target = hover;
			if (canExecute && canExecute.attach) setMarker(hover, MARKER_ATTACH$1);
			else setMarker(hover, canExecute ? MARKER_NEW_PARENT$1 : MARKER_NOT_OK$1);
		}
	});
	eventBus.on([
		"create.end",
		"create.out",
		"create.cleanup"
	], function(event) {
		var hover = event.hover;
		if (hover) setMarker(hover, null);
	});
	eventBus.on("create.end", function(event) {
		var context = event.context, source = context.source, shape = context.shape, elements = context.elements, target = context.target, canExecute = context.canExecute, attach = canExecute && canExecute.attach, connect = canExecute && canExecute.connect, hints = context.hints || {};
		if (canExecute === false || !target) return false;
		ensureConstraints$1(event);
		var position = {
			x: event.x,
			y: event.y
		};
		if (connect) shape = modeling.appendShape(source, shape, position, target, {
			attach,
			connection: connect === true ? {} : connect,
			connectionTarget: hints.connectionTarget
		});
		else {
			elements = modeling.createElements(elements, position, target, assign({}, hints, { attach }));
			shape = find(elements, function(element) {
				return !isConnection(element);
			});
		}
		assign(context, {
			elements,
			shape
		});
		assign(event, {
			elements,
			shape
		});
	});
	function cancel() {
		var context = dragging.context();
		if (context && context.prefix === PREFIX) dragging.cancel();
	}
	eventBus.on("create.init", function() {
		eventBus.on("elements.changed", cancel);
		eventBus.once(["create.cancel", "create.end"], HIGH_PRIORITY$3, function() {
			eventBus.off("elements.changed", cancel);
		});
	});
	this.start = function(event, elements, context) {
		if (!isArray(elements)) elements = [elements];
		var shape = find(elements, function(element) {
			return !isConnection(element);
		});
		if (!shape) return;
		context = assign({
			elements,
			hints: {},
			shape
		}, context || {});
		forEach(elements, function(element) {
			if (!isNumber(element.x)) element.x = 0;
			if (!isNumber(element.y)) element.y = 0;
		});
		var visibleElements = filter(elements, function(element) {
			return !element.hidden;
		});
		var bbox = getBBox(visibleElements);
		forEach(elements, function(element) {
			if (isConnection(element)) element.waypoints = map(element.waypoints, function(waypoint) {
				return {
					x: waypoint.x - bbox.x - bbox.width / 2,
					y: waypoint.y - bbox.y - bbox.height / 2
				};
			});
			assign(element, {
				x: element.x - bbox.x - bbox.width / 2,
				y: element.y - bbox.y - bbox.height / 2
			});
		});
		dragging.init(event, PREFIX, {
			cursor: "grabbing",
			autoActivate: true,
			data: {
				shape,
				elements,
				context
			}
		});
	};
}
Create.$inject = [
	"canvas",
	"dragging",
	"eventBus",
	"modeling",
	"rules"
];
function ensureConstraints$1(event) {
	var createConstraints = event.context.createConstraints;
	if (!createConstraints) return;
	if (createConstraints.left) event.x = Math.max(event.x, createConstraints.left);
	if (createConstraints.right) event.x = Math.min(event.x, createConstraints.right);
	if (createConstraints.top) event.y = Math.max(event.y, createConstraints.top);
	if (createConstraints.bottom) event.y = Math.min(event.y, createConstraints.bottom);
}
function isSingleShape(elements) {
	return elements && elements.length === 1 && !isConnection(elements[0]);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/create/CreatePreview.js
var LOW_PRIORITY$5 = 750;
function CreatePreview(canvas, eventBus, graphicsFactory, previewSupport, styles) {
	function createDragGroup(elements) {
		var dragGroup = create("g");
		attr$1(dragGroup, styles.cls("djs-drag-group", ["no-events"]));
		var childrenGfx = create("g");
		elements.forEach(function(element) {
			var gfx;
			if (element.hidden) return;
			if (element.waypoints) {
				gfx = graphicsFactory._createContainer("connection", childrenGfx);
				graphicsFactory.drawConnection(getVisual(gfx), element);
			} else {
				gfx = graphicsFactory._createContainer("shape", childrenGfx);
				graphicsFactory.drawShape(getVisual(gfx), element);
				translate(gfx, element.x, element.y);
			}
			previewSupport.addDragger(element, dragGroup, gfx);
		});
		return dragGroup;
	}
	eventBus.on("create.move", LOW_PRIORITY$5, function(event) {
		var hover = event.hover, context = event.context, elements = context.elements, dragGroup = context.dragGroup;
		if (!dragGroup) dragGroup = context.dragGroup = createDragGroup(elements);
		var activeLayer;
		if (hover) {
			if (!dragGroup.parentNode) {
				activeLayer = canvas.getActiveLayer();
				append(activeLayer, dragGroup);
			}
			translate(dragGroup, event.x, event.y);
		} else remove(dragGroup);
	});
	eventBus.on("create.cleanup", function(event) {
		var dragGroup = event.context.dragGroup;
		if (dragGroup) remove(dragGroup);
	});
}
CreatePreview.$inject = [
	"canvas",
	"eventBus",
	"graphicsFactory",
	"previewSupport",
	"styles"
];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/create/index.js
var create_default = {
	__depends__: [
		dragging_default,
		preview_support_default,
		rules_default,
		selection_default
	],
	__init__: ["create", "createPreview"],
	create: ["type", Create],
	createPreview: ["type", CreatePreview]
};
//#endregion
//#region ../../node_modules/preact/dist/preact.module.js
var n$1;
var l$1;
var u$1;
var i$1;
var r$2;
var o$1;
var e$1;
var f$1;
var c$1;
var a$1;
var s$1;
var h$1;
var p$1;
var v$1;
var d$1 = {};
var w$1 = [];
var _$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var g = Array.isArray;
function m$2(n, l) {
	for (var u in l) n[u] = l[u];
	return n;
}
function b(n) {
	n && n.parentNode && n.parentNode.removeChild(n);
}
function k$1(l, u, t) {
	var i, r, o, e = {};
	for (o in u) "key" == o ? i = u[o] : "ref" == o ? r = u[o] : e[o] = u[o];
	if (arguments.length > 2 && (e.children = arguments.length > 3 ? n$1.call(arguments, 2) : t), "function" == typeof l && null != l.defaultProps) for (o in l.defaultProps) void 0 === e[o] && (e[o] = l.defaultProps[o]);
	return x(l, e, i, r, null);
}
function x(n, t, i, r, o) {
	var e = {
		type: n,
		props: t,
		key: i,
		ref: r,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: null == o ? ++u$1 : o,
		__i: -1,
		__u: 0
	};
	return null == o && null != l$1.vnode && l$1.vnode(e), e;
}
function S(n) {
	return n.children;
}
function C$1(n, l) {
	this.props = n, this.context = l;
}
function $(n, l) {
	if (null == l) return n.__ ? $(n.__, n.__i + 1) : null;
	for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
	return "function" == typeof n.type ? $(n) : null;
}
function I(n) {
	if (n.__P && n.__d) {
		var u = n.__v, t = u.__e, i = [], r = [], o = m$2({}, u);
		o.__v = u.__v + 1, l$1.vnode && l$1.vnode(o), q$1(n.__P, o, u, n.__n, n.__P.namespaceURI, 32 & u.__u ? [t] : null, i, null == t ? $(u) : t, !!(32 & u.__u), r), o.__v = u.__v, o.__.__k[o.__i] = o, D$1(i, o, r), u.__e = u.__ = null, o.__e != t && P(o);
	}
}
function P(n) {
	if (null != (n = n.__) && null != n.__c) return n.__e = n.__c.base = null, n.__k.some(function(l) {
		if (null != l && null != l.__e) return n.__e = n.__c.base = l.__e;
	}), P(n);
}
function A$1(n) {
	(!n.__d && (n.__d = !0) && i$1.push(n) && !H.__r++ || r$2 != l$1.debounceRendering) && ((r$2 = l$1.debounceRendering) || o$1)(H);
}
function H() {
	try {
		for (var n, l = 1; i$1.length;) i$1.length > l && i$1.sort(e$1), n = i$1.shift(), l = i$1.length, I(n);
	} finally {
		i$1.length = H.__r = 0;
	}
}
function L(n, l, u, t, i, r, o, e, f, c, a) {
	var s, h, p, v, y, _, g = t && t.__k || w$1, m = l.length;
	for (f = T$1(u, l, g, f, m), s = 0; s < m; s++) null != (p = u.__k[s]) && (h = -1 != p.__i && g[p.__i] || d$1, p.__i = s, _ = q$1(n, p, h, i, r, o, e, f, c, a), v = p.__e, p.ref && h.ref != p.ref && (h.ref && J(h.ref, null, p), a.push(p.ref, p.__c || v, p)), null == y && null != v && (y = v), 4 & p.__u ? (f = j$1(p, f, n), h.__e && (h.__e = null)) : "function" == typeof p.type && void 0 !== _ ? f = _ : v && (f = v.nextSibling), p.__u &= -7);
	return u.__e = y, f;
}
function T$1(n, l, u, t, i) {
	var r, o, e, f, c, a = u.length, s = a, h = 0;
	for (n.__k = new Array(i), r = 0; r < i; r++) null != (o = l[r]) && "boolean" != typeof o && "function" != typeof o ? ("string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? o = n.__k[r] = x(null, o, null, null, null) : g(o) ? o = n.__k[r] = x(S, { children: o }, null, null, null) : void 0 === o.constructor && o.__b > 0 ? o = n.__k[r] = x(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : n.__k[r] = o, f = r + h, o.__ = n, o.__b = n.__b + 1, e = null, -1 != (c = o.__i = O(o, u, f, s)) && (s--, (e = u[c]) && (e.__u |= 2)), null == e || null == e.__v ? (-1 == c && (i > a ? h-- : i < a && h++), "function" != typeof o.type && (o.__u |= 4)) : c != f && (c == f - 1 ? h-- : c == f + 1 ? h++ : (c > f ? h-- : h++, o.__u |= 4))) : n.__k[r] = null;
	if (s) for (r = 0; r < a; r++) null != (e = u[r]) && 0 == (2 & e.__u) && (e.__e == t && (t = $(e)), K(e, e));
	return t;
}
function j$1(n, l, u) {
	var t, i;
	if ("function" == typeof n.type) {
		for (t = n.__k, i = 0; t && i < t.length; i++) t[i] && (t[i].__ = n, l = j$1(t[i], l, u));
		return l;
	}
	n.__e != l && (l && n.type && !l.parentNode && (l = $(n)), l = u.insertBefore(n.__e, l || null));
	do
		l = l && l.nextSibling;
	while (null != l && 8 == l.nodeType);
	return l;
}
function O(n, l, u, t) {
	var i, r, o, e = n.key, f = n.type, c = l[u], a = null != c && 0 == (2 & c.__u);
	if (null === c && null == e || a && e == c.key && f == c.type) return u;
	if (t > (a ? 1 : 0)) {
		for (i = u - 1, r = u + 1; i >= 0 || r < l.length;) if (null != (c = l[o = i >= 0 ? i-- : r++]) && 0 == (2 & c.__u) && e == c.key && f == c.type) return o;
	}
	return -1;
}
function z$1(n, l, u) {
	"-" == l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || _$1.test(l) ? u : u + "px";
}
function N(n, l, u, t, i) {
	var r, o;
	n: if ("style" == l) if ("string" == typeof u) n.style.cssText = u;
	else {
		if ("string" == typeof t && (n.style.cssText = t = ""), t) for (l in t) u && l in u || z$1(n.style, l, "");
		if (u) for (l in u) t && u[l] == t[l] || z$1(n.style, l, u[l]);
	}
	else if ("o" == l[0] && "n" == l[1]) r = l != (l = l.replace(s$1, "$1")), o = l.toLowerCase(), l = o in n || "onFocusOut" == l || "onFocusIn" == l ? o.slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? t ? u[a$1] = t[a$1] : (u[a$1] = h$1, n.addEventListener(l, r ? v$1 : p$1, r)) : n.removeEventListener(l, r ? v$1 : p$1, r);
	else {
		if ("http://www.w3.org/2000/svg" == i) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if ("width" != l && "height" != l && "href" != l && "list" != l && "form" != l && "tabIndex" != l && "download" != l && "rowSpan" != l && "colSpan" != l && "role" != l && "popover" != l && l in n) try {
			n[l] = null == u ? "" : u;
			break n;
		} catch (n) {}
		"function" == typeof u || (null == u || !1 === u && "-" != l[4] ? n.removeAttribute(l) : n.setAttribute(l, "popover" == l && 1 == u ? "" : u));
	}
}
function V(n) {
	return function(u) {
		if (this.l) {
			var t = this.l[u.type + n];
			if (null == u[c$1]) u[c$1] = h$1++;
			else if (u[c$1] < t[a$1]) return;
			return t(l$1.event ? l$1.event(u) : u);
		}
	};
}
function q$1(n, u, t, i, r, o, e, f, c, a) {
	var s, h, p, v, y, d, _, k, x, M, I, P, A, H, T, j, F = u.type;
	if (void 0 !== u.constructor) return null;
	128 & t.__u && (c = !!(32 & t.__u), o = [f = u.__e = t.__e]), (s = l$1.__b) && s(u);
	n: if ("function" == typeof F) {
		h = e.length;
		try {
			if (x = u.props, M = F.prototype && F.prototype.render, I = (s = F.contextType) && i[s.__c], P = s ? I ? I.props.value : s.__ : i, t.__c ? k = (p = u.__c = t.__c).__ = p.__E : (M ? u.__c = p = new F(x, P) : (u.__c = p = new C$1(x, P), p.constructor = F, p.render = Q), I && I.sub(p), p.state || (p.state = {}), p.__n = i, v = p.__d = !0, p.__h = [], p._sb = []), M && null == p.__s && (p.__s = p.state), M && null != F.getDerivedStateFromProps && (p.__s == p.state && (p.__s = m$2({}, p.__s)), m$2(p.__s, F.getDerivedStateFromProps(x, p.__s))), y = p.props, d = p.state, p.__v = u, v) M && null == F.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), M && null != p.componentDidMount && p.__h.push(p.componentDidMount);
			else {
				if (M && null == F.getDerivedStateFromProps && x !== y && null != p.componentWillReceiveProps && p.componentWillReceiveProps(x, P), u.__v == t.__v || !p.__e && null != p.shouldComponentUpdate && !1 === p.shouldComponentUpdate(x, p.__s, P)) {
					u.__v != t.__v && (p.props = x, p.state = p.__s, p.__d = !1), u.__e = t.__e, u.__k = t.__k, u.__k.some(function(n) {
						n && (n.__ = u);
					}), w$1.push.apply(p.__h, p._sb), p._sb = [], p.__h.length && e.push(p), f = $(t);
					break n;
				}
				null != p.componentWillUpdate && p.componentWillUpdate(x, p.__s, P), M && null != p.componentDidUpdate && p.__h.push(function() {
					p.componentDidUpdate(y, d, _);
				});
			}
			if (p.context = P, p.props = x, p.__P = n, p.__e = !1, A = l$1.__r, H = 0, M) p.state = p.__s, p.__d = !1, A && A(u), s = p.render(p.props, p.state, p.context), w$1.push.apply(p.__h, p._sb), p._sb = [];
			else do
				p.__d = !1, A && A(u), s = p.render(p.props, p.state, p.context), p.state = p.__s;
			while (p.__d && ++H < 25);
			p.state = p.__s, null != p.getChildContext && (i = m$2(m$2({}, i), p.getChildContext())), M && !v && null != p.getSnapshotBeforeUpdate && (_ = p.getSnapshotBeforeUpdate(y, d)), T = null != s && s.type === S && null == s.key ? E(s.props.children) : s, f = L(n, g(T) ? T : [T], u, t, i, r, o, e, f, c, a), p.base = u.__e, u.__u &= -161, p.__h.length && e.push(p), k && (p.__E = p.__ = null);
		} catch (n) {
			if (e.length = h, u.__v = null, c || null != o) {
				if (n.then) {
					for (u.__u |= c ? 160 : 128; f && 8 == f.nodeType && f.nextSibling;) f = f.nextSibling;
					null != o && (o[o.indexOf(f)] = null), u.__e = f;
				} else if (null != o) for (j = o.length; j--;) b(o[j]);
			} else u.__e = t.__e;
			u.__k ??= t.__k || [], n.then || B$1(u), l$1.__e(n, u, t);
		}
	} else null == o && u.__v == t.__v ? (u.__k = t.__k, u.__e = t.__e) : f = u.__e = G(t.__e, u, t, i, r, o, e, c, a);
	return (s = l$1.diffed) && s(u), 128 & u.__u ? void 0 : f;
}
function B$1(n) {
	n && (n.__c && (n.__c.__e = !0), n.__k && n.__k.some(B$1));
}
function D$1(n, u, t) {
	for (var i = 0; i < t.length; i++) J(t[i], t[++i], t[++i]);
	l$1.__c && l$1.__c(u, n), n.some(function(u) {
		try {
			n = u.__h, u.__h = [], n.some(function(n) {
				n.call(u);
			});
		} catch (n) {
			l$1.__e(n, u.__v);
		}
	});
}
function E(n) {
	return "object" != typeof n || null == n || n.__b > 0 ? n : g(n) ? n.map(E) : void 0 !== n.constructor ? null : m$2({}, n);
}
function G(u, t, i, r, o, e, f, c, a) {
	var s, h, p, v, y, w, _, m = i.props || d$1, k = t.props, x = t.type;
	if ("svg" == x ? o = "http://www.w3.org/2000/svg" : "math" == x ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), null != e) {
		for (s = 0; s < e.length; s++) if ((y = e[s]) && "setAttribute" in y == !!x && (x ? y.localName == x : 3 == y.nodeType)) {
			u = y, e[s] = null;
			break;
		}
	}
	if (null == u) {
		if (null == x) return document.createTextNode(k);
		u = document.createElementNS(o, x, k.is && k), c && (l$1.__m && l$1.__m(t, e), c = !1), e = null;
	}
	if (null == x) m === k || c && u.data == k || (u.data = k);
	else {
		if (e = "textarea" == x && null != k.defaultValue ? null : e && n$1.call(u.childNodes), !c && null != e) for (m = {}, s = 0; s < u.attributes.length; s++) m[(y = u.attributes[s]).name] = y.value;
		for (s in m) y = m[s], "dangerouslySetInnerHTML" == s ? p = y : "children" == s || s in k || "value" == s && "defaultValue" in k || "checked" == s && "defaultChecked" in k || N(u, s, null, y, o);
		for (s in k) y = k[s], "children" == s ? v = y : "dangerouslySetInnerHTML" == s ? h = y : "value" == s ? w = y : "checked" == s ? _ = y : c && "function" != typeof y || m[s] === y || N(u, s, y, m[s], o);
		if (h) c || p && (h.__html == p.__html || h.__html == u.innerHTML) || (u.innerHTML = h.__html), t.__k = [];
		else if (p && (u.innerHTML = ""), L("template" == t.type ? u.content : u, g(v) ? v : [v], t, i, r, "foreignObject" == x ? "http://www.w3.org/1999/xhtml" : o, e, f, e ? e[0] : i.__k && $(i, 0), c, a), null != e) for (s = e.length; s--;) b(e[s]);
		c && "textarea" != x || (s = "value", "progress" == x && null == w ? u.removeAttribute("value") : null != w && (w !== u[s] || "progress" == x && !w || "option" == x && w != m[s]) && N(u, s, w, m[s], o), s = "checked", null != _ && _ != u[s] && N(u, s, _, m[s], o));
	}
	return u;
}
function J(n, u, t) {
	try {
		if ("function" == typeof n) {
			var i = "function" == typeof n.__u;
			i && n.__u(), i && null == u || (n.__u = n(u));
		} else n.current = u;
	} catch (n) {
		l$1.__e(n, t);
	}
}
function K(n, u, t) {
	var i, r;
	if (l$1.unmount && l$1.unmount(n), (i = n.ref) && (i.current && i.current != n.__e || J(i, null, u)), null != (i = n.__c)) {
		if (i.componentWillUnmount) try {
			i.componentWillUnmount();
		} catch (n) {
			l$1.__e(n, u);
		}
		i.base = i.__P = i.__n = null;
	}
	if (i = n.__k) for (r = 0; r < i.length; r++) i[r] && K(i[r], u, t || "function" != typeof n.type);
	t || b(n.__e), n.__c = n.__ = n.__e = void 0;
}
function Q(n, l, u) {
	return this.constructor(n, u);
}
function R(u, t, i) {
	var r, o, e, f;
	t == document && (t = document.documentElement), l$1.__ && l$1.__(u, t), o = (r = "function" == typeof i) ? null : i && i.__k || t.__k, e = [], f = [], q$1(t, u = (!r && i || t).__k = k$1(S, null, [u]), o || d$1, d$1, t.namespaceURI, !r && i ? [i] : o ? null : t.firstChild ? n$1.call(t.childNodes) : null, e, !r && i ? i : o ? o.__e : t.firstChild, r, f), D$1(e, u, f), u.props.children = null;
}
n$1 = w$1.slice, l$1 = { __e: function(n, l, u, t) {
	for (var i, r, o; l = l.__;) if ((i = l.__c) && !i.__) try {
		if ((r = i.constructor) && null != r.getDerivedStateFromError && (i.setState(r.getDerivedStateFromError(n)), o = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), o = i.__d), o) return i.__E = i;
	} catch (l) {
		n = l;
	}
	throw n;
} }, u$1 = 0, C$1.prototype.setState = function(n, l) {
	var u = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$2({}, this.state);
	"function" == typeof n && (n = n(m$2({}, u), this.props)), n && m$2(u, n), null != n && this.__v && (l && this._sb.push(l), A$1(this));
}, C$1.prototype.forceUpdate = function(n) {
	this.__v && (this.__e = !0, n && this.__h.push(n), A$1(this));
}, C$1.prototype.render = S, i$1 = [], o$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$1 = function(n, l) {
	return n.__v.__b - l.__v.__b;
}, H.__r = 0, f$1 = Math.random().toString(8), c$1 = "__d" + f$1, a$1 = "__a" + f$1, s$1 = /(PointerCapture)$|Capture$/i, h$1 = 0, p$1 = V(!1), v$1 = V(!0);
//#endregion
//#region ../../node_modules/htm/dist/htm.module.js
var n = function(t, s, r, e) {
	var u;
	s[0] = 0;
	for (var h = 1; h < s.length; h++) {
		var p = s[h++], a = s[h] ? (s[0] |= p ? 1 : 2, r[s[h++]]) : s[++h];
		3 === p ? e[0] = a : 4 === p ? e[1] = Object.assign(e[1] || {}, a) : 5 === p ? (e[1] = e[1] || {})[s[++h]] = a : 6 === p ? e[1][s[++h]] += a + "" : p ? (u = t.apply(a, n(t, a, r, ["", null])), e.push(u), a[0] ? s[0] |= 2 : (s[h - 2] = 0, s[h] = u)) : e.push(a);
	}
	return e;
};
var t$1 = new Map();
function htm_module_default(s) {
	var r = t$1.get(this);
	return r || (r = new Map(), t$1.set(this, r)), (r = n(this, r.get(s) || (r.set(s, r = function(n) {
		for (var t, s, r = 1, e = "", u = "", h = [0], p = function(n) {
			1 === r && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h.push(0, n, e) : 3 === r && (n || e) ? (h.push(3, n, e), r = 2) : 2 === r && "..." === e && n ? h.push(4, n, 0) : 2 === r && e && !n ? h.push(5, 0, !0, e) : r >= 5 && ((e || !n && 5 === r) && (h.push(r, 0, e, s), r = 6), n && (h.push(r, n, 0, s), r = 6)), e = "";
		}, a = 0; a < n.length; a++) {
			a && (1 === r && p(), p(a));
			for (var l = 0; l < n[a].length; l++) t = n[a][l], 1 === r ? "<" === t ? (p(), h = [h], r = 3) : e += t : 4 === r ? "--" === e && ">" === t ? (r = 1, e = "") : e = t + e[0] : u ? t === u ? u = "" : e += t : "\"" === t || "'" === t ? u = t : ">" === t ? (p(), r = 1) : r && ("=" === t ? (r = 5, s = e, e = "") : "/" === t && (r < 5 || ">" === n[a][l + 1]) ? (p(), 3 === r && (h = h[0]), r = h, (h = h[0]).push(2, 0, r), r = 0) : " " === t || "	" === t || "\n" === t || "\r" === t ? (p(), r = 2) : e += t), 3 === r && "!--" === e && (r = 4, h = h[0]);
		}
		return p(), h;
	}(s)), r), arguments, [])).length > 1 ? r : r[0];
}
//#endregion
//#region ../../node_modules/htm/preact/index.module.js
var m$1 = htm_module_default.bind(k$1);
//#endregion
//#region ../../node_modules/preact/hooks/dist/hooks.module.js
var t;
var r$1;
var u;
var i;
var o = 0;
var f = [];
var c = l$1;
var e = c.__b;
var a = c.__r;
var v = c.diffed;
var l = c.__c;
var m = c.unmount;
var p = c.__;
function s(n, t) {
	c.__h && c.__h(r$1, n, o || t), o = 0;
	var u = r$1.__H || (r$1.__H = {
		__: [],
		__h: []
	});
	return n >= u.__.length && u.__.push({}), u.__[n];
}
function d(n) {
	return o = 1, y(D, n);
}
function y(n, u, i) {
	var o = s(t++, 2);
	if (o.t = n, !o.__c && (o.__ = [i ? i(u) : D(void 0, u), function(n) {
		var t = o.__N ? o.__N[0] : o.__[0], r = o.t(t, n);
		t !== r && (o.__N = [r, o.__[1]], o.__c.setState({}));
	}], o.__c = r$1, !r$1.__f)) {
		var f = function(n, t, r) {
			if (!o.__c.__H) return !0;
			var u = !1, i = o.__c.props !== n;
			if (o.__c.__H.__.some(function(n) {
				if (n.__N) {
					u = !0;
					var t = n.__[0];
					n.__ = n.__N, n.__N = void 0, t !== n.__[0] && (i = !0);
				}
			}), c) {
				var f = c.call(this, n, t, r);
				return u ? f || i : f;
			}
			return !u || i;
		};
		r$1.__f = !0;
		var c = r$1.shouldComponentUpdate, e = r$1.componentWillUpdate;
		r$1.componentWillUpdate = function(n, t, r) {
			if (this.__e) {
				var u = c;
				c = void 0, f(n, t, r), c = u;
			}
			e && e.call(this, n, t, r);
		}, r$1.shouldComponentUpdate = f;
	}
	return o.__N || o.__;
}
function h(n, u) {
	var i = s(t++, 3);
	!c.__s && C(i.__H, u) && (i.__ = n, i.u = u, r$1.__H.__h.push(i));
}
function _(n, u) {
	var i = s(t++, 4);
	!c.__s && C(i.__H, u) && (i.__ = n, i.u = u, r$1.__h.push(i));
}
function A(n) {
	return o = 5, T(function() {
		return { current: n };
	}, []);
}
function T(n, r) {
	var u = s(t++, 7);
	return C(u.__H, r) && (u.__ = n(), u.__H = r, u.__h = n), u.__;
}
function q(n, t) {
	return o = 8, T(function() {
		return n;
	}, t);
}
function j() {
	for (var n; n = f.shift();) {
		var t = n.__H;
		if (n.__P && t) try {
			t.__h.some(z), t.__h.some(B), t.__h = [];
		} catch (r) {
			t.__h = [], c.__e(r, n.__v);
		}
	}
}
c.__b = function(n) {
	r$1 = null, e && e(n);
}, c.__ = function(n, t) {
	n && t.__k && t.__k.__m && (n.__m = t.__k.__m), p && p(n, t);
}, c.__r = function(n) {
	a && a(n), t = 0;
	var i = (r$1 = n.__c).__H;
	i && (u === r$1 ? (i.__h = [], r$1.__h = [], i.__.some(function(n) {
		n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
	})) : (i.__h.some(z), i.__h.some(B), i.__h = [], t = 0)), u = r$1;
}, c.diffed = function(n) {
	v && v(n);
	var t = n.__c;
	t && t.__H && (t.__H.__h.length && (1 !== f.push(t) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w)(j)), t.__H.__.some(function(n) {
		n.u && (n.__H = n.u, n.u = void 0);
	})), u = r$1 = null;
}, c.__c = function(n, t) {
	t.some(function(n) {
		try {
			n.__h.some(z), n.__h = n.__h.filter(function(n) {
				return !n.__ || B(n);
			});
		} catch (r) {
			t.some(function(n) {
				n.__h && (n.__h = []);
			}), t = [], c.__e(r, n.__v);
		}
	}), l && l(n, t);
}, c.unmount = function(n) {
	m && m(n);
	var t, r = n.__c;
	r && r.__H && (r.__H.__.some(function(n) {
		try {
			z(n);
		} catch (n) {
			t = n;
		}
	}), r.__H = void 0, t && c.__e(t, r.__v));
};
var k = "function" == typeof requestAnimationFrame;
function w(n) {
	var t, r = function() {
		clearTimeout(u), k && cancelAnimationFrame(t), setTimeout(n);
	}, u = setTimeout(r, 35);
	k && (t = requestAnimationFrame(r));
}
function z(n) {
	var t = r$1, u = n.__c;
	"function" == typeof u && (n.__c = void 0, u()), r$1 = t;
}
function B(n) {
	var t = r$1;
	n.__c = n.__(), r$1 = t;
}
function C(n, t) {
	return !n || n.length !== t.length || t.some(function(t, r) {
		return t !== n[r];
	});
}
function D(n, t) {
	return "function" == typeof t ? t(n) : t;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/popup-menu/PopupMenuBreadcrumbs.js
function PopupMenuBreadcrumbs(props) {
	const { navigationStack, setNavigationStack } = props;
	const breadcrumbs = T(() => {
		if (navigationStack.length <= 1) return [];
		return navigationStack.slice(0, -1).map((entry, index) => ({
			label: entry.label,
			onClick: () => setNavigationStack((stack) => stack.slice(0, index + 1))
		}));
	}, [navigationStack, setNavigationStack]);
	const handleBackClick = navigationStack.length > 0 ? () => setNavigationStack([]) : null;
	const currentLabel = navigationStack.length > 0 ? navigationStack[navigationStack.length - 1].label : null;
	return m$1`
    <div class="djs-popup-breadcrumbs">
      ${handleBackClick && m$1`
        <button
          type="button"
          class="djs-popup-breadcrumbs-item djs-popup-breadcrumbs-item--back"
          title="Back"
          aria-label="Back"
          onClick=${handleBackClick}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.03033 1.46967C8.32322 1.76256 8.32322 2.23744 8.03033 2.53033L4.56066 6L8.03033 9.46967C8.32322 9.76256 8.32322 10.2374 8.03033 10.5303C7.73744 10.8232 7.26256 10.8232 6.96967 10.5303L2.96967 6.53033C2.67678 6.23744 2.67678 5.76256 2.96967 5.46967L6.96967 1.46967C7.26256 1.17678 7.73744 1.17678 8.03033 1.46967Z" fill="currentColor"/>
          </svg>
        </button>
      `}
      ${breadcrumbs.map((crumb, i) => m$1`
        <button
          key=${i}
          type="button"
          class="djs-popup-breadcrumbs-item"
          onClick=${crumb.onClick}
          title=${crumb.label}
        >
          ${crumb.label}
        </button>
        <span class="djs-popup-breadcrumbs-item--separator" aria-hidden="true"></span>
      `)}
      ${currentLabel && m$1`
        <span class="djs-popup-breadcrumbs-item djs-popup-breadcrumbs-item--current" title=${currentLabel}>
          ${currentLabel}
        </span>
      `}
    </div>
  `;
}
//#endregion
//#region ../../node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/popup-menu/PopupMenuHeader.js
function PopupMenuHeader(props) {
	const { headerEntries, onSelect, selectedEntry, setSelectedEntry, title } = props;
	const groups = T(() => groupEntries$1(headerEntries), [headerEntries]);
	const isActionable = (entry) => {
		return entry.action && !entry.disabled;
	};
	const handleClick = (event, entry) => {
		if (!isActionable(entry)) return;
		return onSelect(event, entry);
	};
	return m$1`
    <div class="djs-popup-header">
      <h3 class="djs-popup-title" title=${title}>${title}</h3>
      ${groups.map((group) => m$1`
        <ul key=${group.id} class="djs-popup-header-group" data-header-group=${group.id}>

          ${group.entries.map((entry) => m$1`
            <li key=${entry.id}>
              <${isActionable(entry) ? "button" : "span"}
                class=${getHeaderClasses(entry, entry === selectedEntry)}
                onClick=${(event) => handleClick(event, entry)}
                title=${entry.title || entry.label}
                data-id=${entry.id}
                aria-disabled=${entry.disabled || void 0}
                onMouseEnter=${() => isActionable(entry) && setSelectedEntry(entry)}
                onMouseLeave=${() => isActionable(entry) && setSelectedEntry(null)}
                onFocus=${() => isActionable(entry) && setSelectedEntry(entry)}
                onBlur=${() => isActionable(entry) && setSelectedEntry(null)}
              >
                ${entry.imageUrl && m$1`<img class="djs-popup-entry-icon" src=${entry.imageUrl} alt="" />` || entry.imageHtml && m$1`<div class="djs-popup-entry-icon" dangerouslySetInnerHTML=${{ __html: entry.imageHtml }} />`}
                ${entry.label ? m$1`
                  <span class="djs-popup-label">${entry.label}</span>
                ` : null}
              </${entry.action ? "button" : "span"}>
            </li>
          `)}
        </ul>
      `)}
    </div>
  `;
}
function groupEntries$1(entries) {
	return entries.reduce((groups, entry) => {
		const groupId = entry.group || "default";
		const group = groups.find((group) => group.id === groupId);
		if (group) group.entries.push(entry);
		else groups.push({
			id: groupId,
			entries: [entry]
		});
		return groups;
	}, []);
}
function getHeaderClasses(entry, selected) {
	return clsx("entry", entry.className, entry.active ? "active" : "", entry.disabled ? "disabled" : "", selected ? "selected" : "");
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/popup-menu/PopupMenuItem.js
function getPopupMenuItemId(idPrefix, entry) {
	return `${idPrefix}-entry-${entry.id}`;
}
function PopupMenuItem(props) {
	const { idPrefix, entry, selected, onMouseEnter, onMouseMove, onMouseLeave, onAction } = props;
	const handleClick = (event, action) => {
		if (entry.disabled) return;
		return onAction(event, entry, action);
	};
	const draggable = !entry.entries;
	return m$1`
    <li
      class=${clsx("entry", {
		selected,
		disabled: entry.disabled
	})}
      data-id=${entry.id}
      id=${getPopupMenuItemId(idPrefix, entry)}
      role="option"
      aria-selected=${selected || void 0}
      aria-haspopup=${entry.entries ? "true" : void 0}
      title=${entry.title}
      aria-disabled=${entry.disabled || void 0}
      onClick=${handleClick}
      onMouseEnter=${onMouseEnter}
      onMouseMove=${onMouseMove}
      onMouseLeave=${onMouseLeave}
      onDragStart=${(event) => draggable && handleClick(event, "dragstart")}
      draggable=${draggable}
    >
      <div class="djs-popup-entry-content">
        <span
          class=${clsx("djs-popup-entry-name", entry.className)}
        >
          ${entry.imageUrl && m$1`<img class="djs-popup-entry-icon" src=${entry.imageUrl} alt="" />` || entry.imageHtml && m$1`<div class="djs-popup-entry-icon" dangerouslySetInnerHTML=${{ __html: entry.imageHtml }} />`}

          ${entry.label ? m$1`
            <span class="djs-popup-label">
              ${entry.label}
            </span>
          ` : null}
        </span>
        ${entry.description && m$1`
          <span
            class="djs-popup-entry-description"
          >
            ${entry.description}
          </span>
        `}
      </div>
      ${(entry.documentationRef || entry.entries) && m$1`
        <div class="djs-popup-entry-actions">
          ${entry.documentationRef && m$1`
            <a
              class="djs-popup-entry-docs"
              href=${entry.documentationRef}
              onClick=${(event) => event.stopPropagation()}
              title="Open entry documentation"
              tabIndex="-1"
              aria-hidden="true"
              target="_blank"
              rel="noopener"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6368 10.6375V5.91761H11.9995V10.6382C11.9995 10.9973 11.8623 11.3141 11.5878 11.5885C11.3134 11.863 10.9966 12.0002 10.6375 12.0002H1.36266C0.982345 12.0002 0.660159 11.8681 0.396102 11.6041C0.132044 11.34 1.52588e-05 11.0178 1.52588e-05 10.6375V1.36267C1.52588e-05 0.98236 0.132044 0.660173 0.396102 0.396116C0.660159 0.132058 0.982345 2.95639e-05 1.36266 2.95639e-05H5.91624V1.36267H1.36266V10.6375H10.6368ZM12 0H7.2794L7.27873 1.36197H9.68701L3.06507 7.98391L4.01541 8.93425L10.6373 2.31231V4.72059H12V0Z" fill="currentColor"/>
              </svg>
            </a>
          `}
          ${entry.entries && m$1`
            <div class="djs-popup-entry-chevron" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.96967 1.46967C4.26256 1.17678 4.73744 1.17678 5.03033 1.46967L9.03033 5.46967C9.32322 5.76256 9.32322 6.23744 9.03033 6.53033L5.03033 10.5303C4.73744 10.8232 4.26256 10.8232 3.96967 10.5303C3.67678 10.2374 3.67678 9.76256 3.96967 9.46967L7.43934 6L3.96967 2.53033C3.67678 2.23744 3.67678 1.76256 3.96967 1.46967Z" fill="currentColor"/>
              </svg>
            </div>
          `}
        </div>
      `}
    </li>
  `;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/popup-menu/PopupMenuList.js
function PopupMenuList(props) {
	const { selectedEntry, setSelectedEntry, groupedEntries, keyboardSelection, onPointerInteraction, idPrefix, id, ariaLabel, tabIndex, ariaActivedescendant, ...restProps } = props;
	const resultsRef = A();
	_(() => {
		if (!keyboardSelection || !keyboardSelection.current) return;
		const containerEl = resultsRef.current;
		if (!containerEl) return;
		const selectedEl = containerEl.querySelector(".selected");
		if (selectedEl) scrollIntoView$1(selectedEl);
	}, [selectedEntry]);
	const handleMouseMove = () => {
		keyboardSelection.current = false;
		onPointerInteraction();
	};
	const handleEntryMouseMove = (entry) => {
		if (entry !== selectedEntry) setSelectedEntry(entry);
	};
	const handleEntryMouseEnter = (entry) => {
		if (keyboardSelection.current) return;
		setSelectedEntry(entry);
	};
	const handleEntryMouseLeave = () => {
		if (keyboardSelection.current) return;
		setSelectedEntry(null);
	};
	return m$1`
    <div
      class="djs-popup-results"
      ref=${resultsRef}
      id=${id}
      role="listbox"
      aria-label=${ariaLabel}
      tabIndex=${tabIndex}
      aria-activedescendant=${ariaActivedescendant}
      onMouseMove=${handleMouseMove}
    >
      ${groupedEntries.map((group) => m$1`
        ${group.name && m$1`
          <div key=${group.id} id=${getGroupHeaderId(idPrefix, group)} class="entry-header" title=${group.name}>
            ${group.name}
          </div>
        `}
        <ul
          class="djs-popup-group"
          data-group=${group.id}
          role="group"
          aria-labelledby=${group.name ? getGroupHeaderId(idPrefix, group) : void 0}
        >
          ${group.entries.map((entry) => m$1`
            <${PopupMenuItem}
              key=${entry.id}
              idPrefix=${idPrefix}
              entry=${entry}
              selected=${entry === selectedEntry}
              onMouseEnter=${() => handleEntryMouseEnter(entry)}
              onMouseMove=${() => handleEntryMouseMove(entry)}
              onMouseLeave=${handleEntryMouseLeave}
              ...${restProps}
            />
          `)}
        </ul>
      `)}
    </div>
  `;
}
function getGroupHeaderId(idPrefix, group) {
	return `${idPrefix}-group-${group.id}`;
}
function scrollIntoView$1(el) {
	if (typeof el.scrollIntoViewIfNeeded === "function") el.scrollIntoViewIfNeeded();
	else el.scrollIntoView({
		scrollMode: "if-needed",
		block: "nearest"
	});
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/popup-menu/PopupMenuComponent.js
init_dist();
var ids = new IdGenerator("djs-popup");
function PopupMenuComponent(props) {
	const { onClose, onSelect, className, headerEntries, position, title, width, scale, search, emptyPlaceholder, searchFn, entries, onOpened, onClosed, defaultTab } = props;
	const [navigationStack, setNavigationStack] = d([]);
	h(() => {
		setNavigationStack([]);
		setActiveTab(null);
	}, [entries]);
	const tabs = T(() => {
		const tabbed = [];
		const seen = new Set();
		let hasUntagged = false;
		entries.forEach(({ tab }) => {
			if (!tab) {
				hasUntagged = true;
				return;
			}
			if (!seen.has(tab.id)) {
				seen.add(tab.id);
				tabbed.push(tab);
			}
		});
		if (!tabbed.length) return [];
		if (hasUntagged && !defaultTab) return [];
		if (!hasUntagged) return tabbed;
		return [defaultTab, ...tabbed.filter((tab) => tab.id !== defaultTab.id)];
	}, [entries, defaultTab]);
	const [activeTabOverride, setActiveTab] = d(null);
	const activeTabId = tabs.some((tab) => tab.id === activeTabOverride) ? activeTabOverride : tabs.length ? tabs[0].id : null;
	const tabsRef = A();
	_(() => {
		const tabsEl = tabsRef.current;
		if (!tabsEl) return;
		const activeTabEl = tabsEl.querySelector("[aria-selected=\"true\"]");
		if (activeTabEl) scrollIntoView(activeTabEl);
	}, [activeTabId]);
	const [overflow, setOverflow] = d({
		start: false,
		end: false
	});
	const updateOverflow = q(() => {
		const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
		setOverflow({
			start: scrollLeft > 0,
			end: scrollWidth - clientWidth - scrollLeft > 1
		});
	}, []);
	const handleWheel = q((event) => {
		const tabsEl = tabsRef.current;
		const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
		if (!delta) return;
		const { scrollLeft, scrollWidth, clientWidth } = tabsEl;
		if (scrollWidth - clientWidth < 1) return;
		event.preventDefault();
		tabsEl.scrollLeft = scrollLeft + delta;
		updateOverflow();
	}, [updateOverflow]);
	_(() => {
		const tabsEl = tabsRef.current;
		if (!tabsEl) return;
		updateOverflow();
		tabsEl.addEventListener("scroll", updateOverflow);
		tabsEl.addEventListener("wheel", handleWheel, { passive: false });
		return () => {
			tabsEl.removeEventListener("scroll", updateOverflow);
			tabsEl.removeEventListener("wheel", handleWheel);
		};
	}, [
		tabs,
		activeTabId,
		updateOverflow,
		handleWheel
	]);
	const scrollTabs = q((direction) => {
		const tabsEl = tabsRef.current;
		const tabEls = direction > 0 ? [...tabsEl.children] : [...tabsEl.children].reverse();
		const stripBounds = tabsEl.getBoundingClientRect();
		const cutOff = tabEls.find((tabEl) => {
			const bounds = tabEl.getBoundingClientRect();
			return direction > 0 ? bounds.right > stripBounds.right + 1 : bounds.left < stripBounds.left - 1;
		});
		if (cutOff) {
			scrollIntoView(cutOff);
			updateOverflow();
		}
	}, [updateOverflow]);
	const getEntryTabId = q((entry) => {
		return entry.tab && entry.tab.id || defaultTab && defaultTab.id;
	}, [defaultTab]);
	const [searchValue, setSearchValue] = d("");
	const isSearching = searchValue.trim().length > 0;
	const actionableEntries = T(() => getActionableEntries(entries), [entries]);
	const searchable = T(() => {
		if (!isDefined(search)) return false;
		return actionableEntries.length > 5;
	}, [search, actionableEntries]);
	const entriesToShow = T(() => {
		const availableEntries = navigationStack.length ? navigationStack[navigationStack.length - 1].entries : tabs.length > 1 ? entries.filter((entry) => getEntryTabId(entry) === activeTabId) : entries;
		if (!searchable) return availableEntries;
		if (isSearching) return searchFn(actionableEntries.filter(({ searchable }) => searchable !== false), searchValue, { keys: [
			"label",
			"search",
			"description"
		] }).map(({ item }) => item);
		return availableEntries.filter(({ rank = 0 }) => rank >= 0);
	}, [
		searchable,
		isSearching,
		actionableEntries,
		searchValue,
		searchFn,
		navigationStack,
		entries,
		tabs,
		activeTabId,
		getEntryTabId
	]);
	const groupedEntries = T(() => {
		if (isSearching) return entriesToShow.length ? [{
			id: "default",
			entries: entriesToShow
		}] : [];
		return groupEntries(entriesToShow);
	}, [entriesToShow, isSearching]);
	const [selectedEntry, setSelectedEntry] = d(entriesToShow[0]);
	const restoreSelection = A(null);
	const keyboardSelection = A(false);
	const [interactionMode, setInteractionMode] = d("keyboard");
	const handleKeyboardInteraction = q(() => {
		setInteractionMode("keyboard");
	}, []);
	const handlePointerInteraction = q(() => {
		setInteractionMode("pointer");
	}, []);
	const idPrefix = T(() => ids.next(), []);
	const resultsId = `${idPrefix}-results`;
	const activeDescendantId = selectedEntry && getPopupMenuItemId(idPrefix, selectedEntry);
	h(() => {
		const restore = restoreSelection.current;
		if (restore && entriesToShow.includes(restore)) setSelectedEntry(restore);
		else setSelectedEntry(entriesToShow[0]);
		restoreSelection.current = null;
	}, [entriesToShow]);
	const keyboardSelect = q((direction) => {
		const entries = getOrderedEntries(groupedEntries);
		let nextIdx = entries.indexOf(selectedEntry) + direction;
		if (nextIdx < 0) nextIdx = entries.length - 1;
		if (nextIdx >= entries.length) nextIdx = 0;
		keyboardSelection.current = true;
		setSelectedEntry(entries[nextIdx]);
	}, [groupedEntries, selectedEntry]);
	const keyboardDrilldown = q((direction) => {
		if (direction > 0 && selectedEntry && selectedEntry.entries) {
			keyboardSelection.current = true;
			setNavigationStack((stack) => [...stack, selectedEntry]);
		}
		if (direction < 0 && navigationStack.length > 0) {
			keyboardSelection.current = true;
			restoreSelection.current = navigationStack[navigationStack.length + direction];
			setNavigationStack((stack) => stack.slice(0, direction));
		}
	}, [selectedEntry, navigationStack]);
	const handleEntryAction = q((event, entry, action) => {
		if (!entry || entry.disabled) return;
		if (entry.entries) {
			event.preventDefault();
			return keyboardDrilldown(1);
		}
		return onSelect(event, entry, action);
	}, [onSelect, keyboardDrilldown]);
	const handleKeyDown = q((event) => {
		if (event.key === "Enter" && selectedEntry) {
			const target = event.target;
			if (!!closest(target, "a, button", true)) return;
			if (selectedEntry.disabled) return;
			return handleEntryAction(event, selectedEntry);
		}
		if (event.key === "Backspace") {
			const target = event.target;
			if (!(matches(target, "input") && target.value !== "")) {
				keyboardDrilldown(-1);
				return event.preventDefault();
			}
		}
		if (event.key === "ArrowUp") {
			keyboardSelect(-1);
			return event.preventDefault();
		}
		if (event.key === "ArrowDown") {
			keyboardSelect(1);
			return event.preventDefault();
		}
		if (event.key === "ArrowRight") {
			keyboardDrilldown(1);
			return event.preventDefault();
		}
		if (event.key === "ArrowLeft") {
			keyboardDrilldown(-1);
			return event.preventDefault();
		}
	}, [
		selectedEntry,
		keyboardSelect,
		keyboardDrilldown,
		handleEntryAction
	]);
	const selectTab = q((event, tabId) => {
		setActiveTab(tabId);
		if (!event.detail) return;
		const popupEl = closest(event.currentTarget, ".djs-popup", true);
		const inputEl = popupEl && popupEl.querySelector("input");
		inputEl && inputEl.focus();
	}, []);
	const handleTabKeyDown = q((event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.stopPropagation();
			return;
		}
		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			const popupEl = closest(event.currentTarget, ".djs-popup", true);
			const focusEl = popupEl.querySelector("input") || popupEl.querySelector("[role=\"listbox\"]");
			focusEl && focusEl.focus();
			return;
		}
		const idx = tabs.findIndex((tab) => tab.id === activeTabId);
		let nextIdx;
		if (event.key === "ArrowLeft") nextIdx = (idx - 1 + tabs.length) % tabs.length;
		else if (event.key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
		else if (event.key === "Home") nextIdx = 0;
		else if (event.key === "End") nextIdx = tabs.length - 1;
		else return;
		event.preventDefault();
		event.stopPropagation();
		setActiveTab(tabs[nextIdx].id);
		const strip = event.currentTarget.parentNode;
		const nextButton = strip && strip.children[nextIdx];
		nextButton && nextButton.focus();
	}, [tabs, activeTabId]);
	const handleKey = q((event) => {
		if (matches(event.target, "input")) setSearchValue(() => event.target.value);
	}, [setSearchValue]);
	h(() => {
		onOpened();
		return () => {
			onClosed();
		};
	}, []);
	const displayBreadcrumbs = !isSearching && navigationStack.length > 0;
	const displayTabs = tabs.length > 1 && !isSearching && navigationStack.length === 0;
	return m$1`
    <${PopupMenuWrapper}
      onClose=${onClose}
      onKeyup=${handleKey}
      onKeydown=${handleKeyDown}
      className=${className}
      position=${position}
      width=${width}
      scale=${scale}
      navigationStack=${navigationStack}
      interactionMode=${interactionMode}
      onKeyboardInteraction=${handleKeyboardInteraction}
    >
      ${(title || headerEntries.length > 0) && !displayBreadcrumbs && m$1`
        <${PopupMenuHeader}
          headerEntries=${headerEntries}
          onSelect=${onSelect}
          selectedEntry=${selectedEntry}
          setSelectedEntry=${setSelectedEntry}
          title=${title}
        />
      `}
      ${displayBreadcrumbs && m$1`
        <${PopupMenuBreadcrumbs}
          navigationStack=${navigationStack}
          setNavigationStack=${setNavigationStack}
        />
      `}
      ${entries.length > 0 && m$1`
        <div class="djs-popup-body">

          ${searchable && m$1`
          <div class="djs-popup-search">
            <svg class="djs-popup-search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.0325 8.5H9.625L13.3675 12.25L12.25 13.3675L8.5 9.625V9.0325L8.2975 8.8225C7.4425 9.5575 6.3325 10 5.125 10C2.4325 10 0.25 7.8175 0.25 5.125C0.25 2.4325 2.4325 0.25 5.125 0.25C7.8175 0.25 10 2.4325 10 5.125C10 6.3325 9.5575 7.4425 8.8225 8.2975L9.0325 8.5ZM1.75 5.125C1.75 6.9925 3.2575 8.5 5.125 8.5C6.9925 8.5 8.5 6.9925 8.5 5.125C8.5 3.2575 6.9925 1.75 5.125 1.75C3.2575 1.75 1.75 3.2575 1.75 5.125Z" fill="#22242A"/>
            </svg>
            <input
              type="text"
              spellcheck=${false}
              role="combobox"
              aria-label="${title || "Search"}"
              aria-expanded="true"
              aria-controls=${resultsId}
              aria-activedescendant=${activeDescendantId || void 0}
              aria-autocomplete="list"
            />
          </div>
          `}

          ${displayTabs && m$1`
            <div class="djs-popup-tabs-container">
              <div class="djs-popup-tabs" ref=${tabsRef} role="tablist">
                ${tabs.map((tab) => m$1`
                  <button
                    type="button"
                    class="djs-popup-tab"
                    role="tab"
                    title=${tab.title || void 0}
                    aria-controls=${resultsId}
                    aria-selected=${tab.id === activeTabId}
                    tabIndex=${tab.id === activeTabId ? 0 : -1}
                    onClick=${(event) => selectTab(event, tab.id)}
                    onKeydown=${handleTabKeyDown}
                  >${tab.label}</button>
                `)}
              </div>

              ${""}
              ${[-1, 1].map((direction) => (direction < 0 ? overflow.start : overflow.end) && m$1`
                <button
                  type="button"
                  class=${`djs-popup-tabs-scroll djs-popup-tabs-scroll-${direction < 0 ? "start" : "end"}`}
                  aria-hidden="true"
                  tabIndex="-1"
                  onMousedown=${(event) => event.preventDefault()}
                  onClick=${() => scrollTabs(direction)}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.96967 1.46967C4.26256 1.17678 4.73744 1.17678 5.03033 1.46967L9.03033 5.46967C9.32322 5.76256 9.32322 6.23744 9.03033 6.53033L5.03033 10.5303C4.73744 10.8232 4.26256 10.8232 3.96967 10.5303C3.67678 10.2374 3.67678 9.76256 3.96967 9.46967L7.43934 6L3.96967 2.53033C3.67678 2.23744 3.67678 1.76256 3.96967 1.46967Z" fill="currentColor"/>
                  </svg>
                </button>
              `)}
            </div>
          `}

          ${isSearching && m$1`
            <div class="djs-popup-search-count" aria-live="polite">
              ${entriesToShow.length} ${entriesToShow.length === 1 ? "result" : "results"} found
            </div>
          `}

          <${PopupMenuList}
            groupedEntries=${groupedEntries}
            selectedEntry=${selectedEntry}
            setSelectedEntry=${setSelectedEntry}
            keyboardSelection=${keyboardSelection}
            onPointerInteraction=${handlePointerInteraction}
            onAction=${handleEntryAction}
            idPrefix=${idPrefix}
            id=${resultsId}
            ariaLabel=${title || "Results"}
            tabIndex=${searchable ? -1 : 0}
            ariaActivedescendant=${searchable ? void 0 : activeDescendantId || void 0}
          />

          ${selectedEntry && selectedEntry.documentationRef && m$1`
            <div class="djs-popup-footer">
              <a
                class="djs-popup-footer-docs"
                href=${selectedEntry.documentationRef}
                onClick=${(event) => event.stopPropagation()}
                aria-label=${selectedEntry.label ? `Open entry documentation for ${selectedEntry.label}` : "Open entry documentation"}
                target="_blank"
                rel="noopener"
              >
                Open entry documentation

                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6368 10.6375V5.91761H11.9995V10.6382C11.9995 10.9973 11.8623 11.3141 11.5878 11.5885C11.3134 11.863 10.9966 12.0002 10.6375 12.0002H1.36266C0.982345 12.0002 0.660159 11.8681 0.396102 11.6041C0.132044 11.34 1.52588e-05 11.0178 1.52588e-05 10.6375V1.36267C1.52588e-05 0.98236 0.132044 0.660173 0.396102 0.396116C0.660159 0.132058 0.982345 2.95639e-05 1.36266 2.95639e-05H5.91624V1.36267H1.36266V10.6375H10.6368ZM12 0H7.2794L7.27873 1.36197H9.68701L3.06507 7.98391L4.01541 8.93425L10.6373 2.31231V4.72059H12V0Z" fill="#818798"/>
                </svg>
              </a>
            </div>
          `}
        </div>
      `}
    ${emptyPlaceholder && entriesToShow.length === 0 && m$1`
      <div class="djs-popup-no-results">${isFunction(emptyPlaceholder) ? emptyPlaceholder(searchValue) : emptyPlaceholder}</div>
    `}
    </${PopupMenuWrapper}>
  `;
}
function scrollIntoView(el) {
	if (typeof el.scrollIntoViewIfNeeded === "function") el.scrollIntoViewIfNeeded();
	else el.scrollIntoView({
		scrollMode: "if-needed",
		block: "nearest",
		inline: "nearest"
	});
}
function PopupMenuWrapper(props) {
	const { onClose, onKeydown, onKeyup, onKeyboardInteraction, className, children, navigationStack, interactionMode, position: positionGetter } = props;
	const popupRef = A();
	_(() => {
		if (typeof positionGetter !== "function") return;
		const popupEl = popupRef.current;
		const position = positionGetter(popupEl);
		popupEl.style.left = `${position.x}px`;
		popupEl.style.top = `${position.y}px`;
	}, [popupRef.current, positionGetter]);
	_(() => {
		const popupEl = popupRef.current;
		if (!popupEl) return;
		(popupEl.querySelector("input") || popupEl.querySelector("[role=\"listbox\"]") || popupEl).focus();
	}, [navigationStack]);
	h(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				return onClose();
			}
		};
		const handleClick = (event) => {
			if (closest(event.target, ".djs-popup", true)) return;
			return onClose();
		};
		document.documentElement.addEventListener("keydown", handleKeyDown);
		document.body.addEventListener("click", handleClick, true);
		return () => {
			document.documentElement.removeEventListener("keydown", handleKeyDown);
			document.body.removeEventListener("click", handleClick, true);
		};
	}, []);
	return m$1`
    <div
      class=${clsx("djs-popup", className, { "djs-popup--pointer": interactionMode === "pointer" })}
      style=${getPopupStyle(props)}
      onKeydownCapture=${onKeyboardInteraction}
      onKeydown=${onKeydown}
      onKeyup=${onKeyup}
      ref=${popupRef}
      tabIndex="-1"
    >
      ${children}
    </div>
  `;
}
function getPopupStyle(props) {
	const { width } = props;
	const normalizedWidth = typeof width === "number" ? `${width}px` : width;
	return {
		transform: `scale(${props.scale})`,
		width: isDefined(width) ? normalizedWidth : void 0,
		maxWidth: isDefined(width) ? "unset" : void 0,
		"transform-origin": "top left"
	};
}
function getOrderedEntries(groupedEntries) {
	const entries = [];
	groupedEntries.forEach((group) => {
		group.entries.forEach((entry) => {
			entries.push(entry);
		});
	});
	return entries;
}
function getActionableEntries(entries) {
	const leaves = [];
	function walk(entries) {
		entries.forEach((entry) => {
			if (entry.entries) {
				walk(entry.entries);
				return;
			}
			leaves.push(entry);
		});
	}
	walk(entries);
	return leaves;
}
function groupEntries(entries) {
	const groups = [];
	const getGroup = (group) => groups.find((elem) => group.id === elem.id);
	const containsGroup = (group) => !!getGroup(group);
	const formatGroup = (group) => typeof group === "string" ? { id: group } : group;
	entries.forEach((entry) => {
		const group = entry.group ? formatGroup(entry.group) : { id: "default" };
		if (!containsGroup(group)) groups.push({
			...group,
			entries: [entry]
		});
		else getGroup(group).entries.push(entry);
	});
	return groups;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/popup-menu/PopupMenu.js
init_dist();
var DATA_REF = "data-id";
var CLOSE_EVENTS = [
	"contextPad.close",
	"canvas.viewbox.changing",
	"commandStack.changed"
];
var DEFAULT_PRIORITY$1 = 1e3;
function PopupMenu(config, eventBus, canvas, search) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	this._search = search;
	this._current = null;
	var scale = isDefined(config && config.scale) ? config.scale : {
		min: 1,
		max: 1
	};
	this._config = {
		scale,
		defaultTab: config && config.defaultTab
	};
	eventBus.on("diagram.destroy", () => {
		this.close();
	});
	eventBus.on("element.changed", (event) => {
		const element = this.isOpen() && this._current.target;
		if (event.element === element) this.refresh();
	});
}
PopupMenu.$inject = [
	"config.popupMenu",
	"eventBus",
	"canvas",
	"search"
];
PopupMenu.prototype._render = function() {
	const { position: _position, providerId: className, entries, headerEntries, emptyPlaceholder, options } = this._current;
	const entriesArray = flattenEntries(entries);
	const headerEntriesArray = Object.entries(headerEntries).map(([key, value]) => ({
		id: key,
		...value
	}));
	const position = _position && ((container) => this._ensureVisible(container, _position));
	const scale = this._updateScale(this._current.container);
	const onClose = (result) => this.close(result);
	const onSelect = (event, entry, action) => this.trigger(event, entry, action);
	R(m$1`
      <${PopupMenuComponent}
        onClose=${onClose}
        onSelect=${onSelect}
        position=${position}
        className=${className}
        entries=${entriesArray}
        headerEntries=${headerEntriesArray}
        emptyPlaceholder=${emptyPlaceholder}
        scale=${scale}
        onOpened=${this._onOpened.bind(this)}
        onClosed=${this._onClosed.bind(this)}
        searchFn=${this._search}
        defaultTab=${this._config.defaultTab}
        ...${{ ...options }}
      />
    `, this._current.container);
};
PopupMenu.prototype.open = function(target, providerId, position, options) {
	if (!target) throw new Error("target is missing");
	if (!providerId) throw new Error("providers for <" + providerId + "> not found");
	if (!position) throw new Error("position is missing");
	if (this._eventBus.fire("popupMenu.open.allowed", {
		target,
		providerId
	}) === false) return;
	if (this.isOpen()) this.close();
	const { entries, headerEntries, emptyPlaceholder } = this._getContext(target, providerId);
	this._current = {
		position,
		providerId,
		target,
		entries,
		headerEntries,
		emptyPlaceholder,
		container: this._createContainer({ provider: providerId }),
		options
	};
	this._emit("open");
	this._bindAutoClose();
	this._render();
};
PopupMenu.prototype.refresh = function() {
	if (!this.isOpen()) return;
	const { target, providerId } = this._current;
	const { entries, headerEntries, emptyPlaceholder } = this._getContext(target, providerId);
	this._current = {
		...this._current,
		entries,
		headerEntries,
		emptyPlaceholder
	};
	this._emit("refresh");
	this._render();
};
PopupMenu.prototype._getContext = function(target, provider) {
	const providers = this._getProviders(provider);
	if (!providers || !providers.length) throw new Error("provider for <" + provider + "> not found");
	const entries = this._getEntries(target, providers);
	const headerEntries = this._getHeaderEntries(target, providers);
	return {
		entries,
		headerEntries,
		emptyPlaceholder: this._getEmptyPlaceholder(providers),
		empty: !(Object.keys(entries).length || Object.keys(headerEntries).length)
	};
};
PopupMenu.prototype.close = function() {
	if (!this.isOpen()) return;
	this._emit("close");
	this.reset();
	this._canvas.restoreFocus();
	this._current = null;
};
PopupMenu.prototype.reset = function() {
	const container = this._current.container;
	R(null, container);
	remove$1(container);
};
PopupMenu.prototype._emit = function(event, payload) {
	this._eventBus.fire(`popupMenu.${event}`, payload);
};
PopupMenu.prototype._onOpened = function() {
	this._emit("opened");
};
PopupMenu.prototype._onClosed = function() {
	this._emit("closed");
};
PopupMenu.prototype._createContainer = function(config) {
	var parent = this._canvas.getContainer();
	const container = domify(`<div class="djs-popup-parent djs-scrollable" data-popup=${config.provider}></div>`);
	parent.appendChild(container);
	return container;
};
PopupMenu.prototype._bindAutoClose = function() {
	this._eventBus.once(CLOSE_EVENTS, this.close, this);
};
PopupMenu.prototype._unbindAutoClose = function() {
	this._eventBus.off(CLOSE_EVENTS, this.close, this);
};
PopupMenu.prototype._updateScale = function() {
	var zoom = this._canvas.zoom();
	var scaleConfig = this._config.scale, minScale, maxScale, scale = zoom;
	if (scaleConfig !== true) {
		if (scaleConfig === false) {
			minScale = 1;
			maxScale = 1;
		} else {
			minScale = scaleConfig.min;
			maxScale = scaleConfig.max;
		}
		if (isDefined(minScale) && zoom < minScale) scale = minScale;
		if (isDefined(maxScale) && zoom > maxScale) scale = maxScale;
	}
	return scale;
};
PopupMenu.prototype._ensureVisible = function(container, position) {
	var documentBounds = document.documentElement.getBoundingClientRect();
	var containerBounds = container.getBoundingClientRect();
	var overAxis = {}, left = position.x, top = position.y;
	if (position.x + containerBounds.width > documentBounds.width) overAxis.x = true;
	if (position.y + containerBounds.height > documentBounds.height) overAxis.y = true;
	if (overAxis.x && overAxis.y) {
		left = position.x - containerBounds.width;
		top = position.y - containerBounds.height;
	} else if (overAxis.x) {
		left = position.x - containerBounds.width;
		top = position.y;
	} else if (overAxis.y && position.y < containerBounds.height) {
		left = position.x;
		top = 10;
	} else if (overAxis.y) {
		left = position.x;
		top = position.y - containerBounds.height;
	}
	if (position.y < documentBounds.top) top = position.y + containerBounds.height;
	return {
		x: left,
		y: top
	};
};
PopupMenu.prototype.isEmpty = function(target, providerId) {
	if (!target) throw new Error("target is missing");
	if (!providerId) throw new Error("provider ID is missing");
	const providers = this._getProviders(providerId);
	if (!providers || !providers.length) return true;
	return this._getContext(target, providerId).empty;
};
PopupMenu.prototype.registerProvider = function(id, priority, provider) {
	if (!provider) {
		provider = priority;
		priority = DEFAULT_PRIORITY$1;
	}
	this._eventBus.on("popupMenu.getProviders." + id, priority, function(event) {
		event.providers.push(provider);
	});
};
PopupMenu.prototype._getProviders = function(id) {
	var event = this._eventBus.createEvent({
		type: "popupMenu.getProviders." + id,
		providers: []
	});
	this._eventBus.fire(event);
	return event.providers;
};
PopupMenu.prototype._getEntries = function(target, providers) {
	var entries = {};
	forEach(providers, function(provider) {
		if (!provider.getPopupMenuEntries) {
			forEach(provider.getEntries(target), function(entry) {
				var id = entry.id;
				if (!id) throw new Error("entry ID is missing");
				entries[id] = omit(entry, ["id"]);
			});
			return;
		}
		var entriesOrUpdater = provider.getPopupMenuEntries(target);
		if (isFunction(entriesOrUpdater)) entries = entriesOrUpdater(entries);
		else forEach(entriesOrUpdater, function(entry, id) {
			entries[id] = entry;
		});
	});
	return entries;
};
PopupMenu.prototype._getHeaderEntries = function(target, providers) {
	var entries = {};
	forEach(providers, function(provider) {
		if (!provider.getPopupMenuHeaderEntries) {
			if (!provider.getHeaderEntries) return;
			forEach(provider.getHeaderEntries(target), function(entry) {
				var id = entry.id;
				if (!id) throw new Error("entry ID is missing");
				entries[id] = omit(entry, ["id"]);
			});
			return;
		}
		var entriesOrUpdater = provider.getPopupMenuHeaderEntries(target);
		if (isFunction(entriesOrUpdater)) entries = entriesOrUpdater(entries);
		else forEach(entriesOrUpdater, function(entry, id) {
			entries[id] = entry;
		});
	});
	return entries;
};
PopupMenu.prototype._getEmptyPlaceholder = function(providers) {
	const provider = providers.find((provider) => isFunction(provider.getEmptyPlaceholder));
	return provider && provider.getEmptyPlaceholder();
};
PopupMenu.prototype.isOpen = function() {
	return !!this._current;
};
PopupMenu.prototype.trigger = function(event, entry, action = "click") {
	event.preventDefault();
	if (!entry) {
		let element = closest(event.delegateTarget || event.target, ".entry", true);
		let entryId = attr(element, DATA_REF);
		entry = {
			id: entryId,
			...this._getEntry(entryId)
		};
	}
	const handler = entry.action;
	if (this._emit("trigger", {
		entry,
		event
	}) === false) return;
	if (isFunction(handler)) {
		if (action === "click") return handler(event, entry);
	} else if (handler[action]) return handler[action](event, entry);
};
PopupMenu.prototype._getEntry = function(entryId) {
	var entry = this._current.entries[entryId] || this._current.headerEntries[entryId];
	if (!entry) throw new Error("entry not found");
	return entry;
};
function flattenEntries(entriesMap, search = []) {
	return Object.entries(entriesMap).map(([id, value]) => {
		const entry = {
			id,
			...value
		};
		if (entry.entries) entry.entries = flattenEntries(entry.entries, [...search, ...asArray(entry.search)]);
		else if (search.length) entry.search = [...search, ...asArray(entry.search)];
		return entry;
	});
}
function asArray(value) {
	if (!value) return [];
	return isArray(value) ? value : [value];
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/search/search.js
init_dist();
function search(items, pattern, options) {
	const { keys } = options;
	pattern = pattern.trim().toLowerCase();
	if (!pattern) throw new Error("<pattern> must not be empty");
	const words = pattern.trim().toLowerCase().split(/\s+/);
	return items.flatMap((item) => {
		const tokens = matchItem(item, words, keys);
		if (!tokens) return [];
		return {
			item,
			tokens
		};
	}).sort(createResultSorter(keys));
}
function matchItem(item, words, keys) {
	const { matchedWords, tokens } = keys.reduce((result, key) => {
		const itemValue = item[key];
		const { tokens, matchedWords } = isArray(itemValue) ? itemValue.reduce((result, itemString) => {
			const { tokens, matchedWords } = matchString(itemString, words);
			return {
				tokens: [...result.tokens, tokens],
				matchedWords: {
					...result.matchedWords,
					...matchedWords
				}
			};
		}, {
			matchedWords: {},
			tokens: []
		}) : matchString(itemValue, words);
		return {
			tokens: {
				...result.tokens,
				[key]: tokens
			},
			matchedWords: {
				...result.matchedWords,
				...matchedWords
			}
		};
	}, {
		matchedWords: {},
		tokens: {}
	});
	if (Object.keys(matchedWords).length !== words.length) return null;
	return tokens;
}
function createResultSorter(keys) {
	return (resultA, resultB) => {
		let comparison = 0;
		let modifier = 1;
		for (const key of keys) {
			const tokenComparison = compareTokens(resultA.tokens[key], resultB.tokens[key]);
			if (tokenComparison !== 0) {
				comparison += tokenComparison * modifier;
				modifier *= DECAY_MODIFIER;
				continue;
			}
			const stringComparison = compareStrings(resultA.item[key], resultB.item[key]);
			if (stringComparison !== 0) {
				comparison += stringComparison * modifier;
				modifier *= DECAY_MODIFIER;
				continue;
			}
		}
		return comparison;
	};
}
function compareTokens(tokensA, tokensB) {
	return scoreTokens(tokensB) - scoreTokens(tokensA);
}
var DECAY_MODIFIER = .5;
var TOKEN_MATCH_SCORES = {
	FULL: 131.9,
	START_FULL_WORD: 8,
	START_WORD_PART: 7.87,
	WORD_START: 2.19,
	WORD_PART: 1,
	NO_MATCH: -.07
};
function scoreTokens(tokens) {
	const baseScore = tokens.reduce((sum, token) => sum + scoreToken(token), 0);
	const flatTokens = tokens.flat();
	const totalLength = flatTokens.reduce((sum, token) => sum + token.value.length, 0);
	const matchedLength = flatTokens.reduce((sum, token) => sum + (token.match ? token.value.length : 0), 0);
	return baseScore * (1 + (totalLength ? matchedLength / totalLength : 0));
}
function scoreToken(token) {
	if (isArray(token)) return Math.max(...token.map(scoreToken));
	const modifier = Math.log(token.value.length);
	if (!token.match) return TOKEN_MATCH_SCORES.NO_MATCH * modifier;
	return (token.start ? token.end ? TOKEN_MATCH_SCORES.FULL : token.wordEnd ? TOKEN_MATCH_SCORES.START_FULL_WORD : TOKEN_MATCH_SCORES.START_WORD_PART : token.wordStart ? TOKEN_MATCH_SCORES.WORD_START : TOKEN_MATCH_SCORES.WORD_PART) * modifier;
}
function stringJoin(str = "") {
	return isArray(str) ? str.join(", ") : str;
}
function compareStrings(a, b) {
	return stringJoin(a).localeCompare(stringJoin(b));
}
function matchString(string, words) {
	if (!string) return {
		tokens: [],
		matchedWords: {}
	};
	const tokens = [];
	const matchedWords = {};
	const wordsEscaped = words.map(escapeRegexp);
	const regexpString = [`(?<all>${wordsEscaped.join("\\s+")})`, ...wordsEscaped].join("|");
	const regexp = new RegExp(regexpString, "ig");
	let match;
	let lastIndex = 0;
	while (match = regexp.exec(string)) {
		const [value] = match;
		const startIndex = match.index;
		const endIndex = match.index + value.length;
		const start = startIndex === 0;
		const end = endIndex === string.length;
		const all = !!match.groups?.all;
		const wordStart = start || /\s/.test(string.charAt(startIndex - 1));
		const wordEnd = end || /\s/.test(string.charAt(endIndex));
		if (match.index > lastIndex) tokens.push({
			value: string.slice(lastIndex, match.index),
			index: lastIndex
		});
		tokens.push({
			value,
			index: match.index,
			match: true,
			wordStart,
			wordEnd,
			start,
			end,
			all
		});
		const newMatchedWords = all ? words : [value];
		for (const word of newMatchedWords) matchedWords[word.toLowerCase()] = true;
		lastIndex = match.index + value.length;
	}
	if (lastIndex < string.length) tokens.push({
		value: string.slice(lastIndex),
		index: lastIndex
	});
	return {
		tokens,
		matchedWords
	};
}
function escapeRegexp(string) {
	return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/search/index.js
var search_default = { search: ["value", search] };
//#endregion
//#region ../../node_modules/diagram-js/lib/features/popup-menu/index.js
var popup_menu_default = {
	__depends__: [search_default],
	__init__: ["popupMenu"],
	popupMenu: ["type", PopupMenu]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/replace/Replace.js
init_dist();
var round$3 = Math.round;
function Replace(modeling, eventBus) {
	this._modeling = modeling;
	this._eventBus = eventBus;
}
Replace.$inject = ["modeling", "eventBus"];
Replace.prototype.replaceElement = function(oldElement, attrs, hints) {
	if (oldElement.waypoints) return null;
	var modeling = this._modeling;
	var eventBus = this._eventBus;
	eventBus.fire("replace.start", {
		element: oldElement,
		attrs,
		hints
	});
	var width = attrs.width || oldElement.width, height = attrs.height || oldElement.height, x = attrs.x || oldElement.x, y = attrs.y || oldElement.y, centerX = round$3(x + width / 2), centerY = round$3(y + height / 2);
	var newElement = modeling.replaceShape(oldElement, assign({}, attrs, {
		x: centerX,
		y: centerY,
		width,
		height
	}), hints);
	eventBus.fire("replace.end", {
		element: oldElement,
		newElement,
		hints
	});
	return newElement;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/replace/ReplaceSelectionBehavior.js
function ReplaceSelectionBehavior(selection, eventBus) {
	eventBus.on("replace.end", 500, function(event) {
		const { newElement, hints = {} } = event;
		if (hints.select === false) return;
		selection.select(newElement);
	});
}
ReplaceSelectionBehavior.$inject = ["selection", "eventBus"];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/replace/index.js
var replace_default = {
	__init__: ["replace", "replaceSelectionBehavior"],
	replaceSelectionBehavior: ["type", ReplaceSelectionBehavior],
	replace: ["type", Replace]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/connection-preview/ConnectionPreview.js
init_dist();
var MARKER_CONNECTION_PREVIEW = "djs-dragger";
function ConnectionPreview(injector, canvas, graphicsFactory, elementFactory) {
	this._canvas = canvas;
	this._graphicsFactory = graphicsFactory;
	this._elementFactory = elementFactory;
	this._connectionDocking = injector.get("connectionDocking", false);
	this._layouter = injector.get("layouter", false);
}
ConnectionPreview.$inject = [
	"injector",
	"canvas",
	"graphicsFactory",
	"elementFactory"
];
ConnectionPreview.prototype.drawPreview = function(context, canConnect, hints) {
	hints = hints || {};
	var connectionPreviewGfx = context.connectionPreviewGfx, getConnection = context.getConnection, source = hints.source, target = hints.target, waypoints = hints.waypoints, connectionStart = hints.connectionStart, connectionEnd = hints.connectionEnd, noLayout = hints.noLayout, noCropping = hints.noCropping, noNoop = hints.noNoop, connection;
	var self = this;
	if (!connectionPreviewGfx) connectionPreviewGfx = context.connectionPreviewGfx = this.createConnectionPreviewGfx();
	clear$1(connectionPreviewGfx);
	if (!getConnection) getConnection = context.getConnection = cacheReturnValues(function(canConnect, source, target) {
		return self.getConnection(canConnect, source, target);
	});
	if (canConnect) connection = getConnection(canConnect, source, target);
	if (!connection) {
		!noNoop && this.drawNoopPreview(connectionPreviewGfx, hints);
		return;
	}
	connection.waypoints = waypoints || [];
	if (this._layouter && !noLayout) connection.waypoints = this._layouter.layoutConnection(connection, {
		source,
		target,
		connectionStart,
		connectionEnd,
		waypoints: hints.waypoints || connection.waypoints
	});
	if (!connection.waypoints || !connection.waypoints.length) connection.waypoints = [source ? getMid(source) : connectionStart, target ? getMid(target) : connectionEnd];
	if (this._connectionDocking && (source || target) && !noCropping) connection.waypoints = this._connectionDocking.getCroppedWaypoints(connection, source, target);
	this._graphicsFactory.drawConnection(connectionPreviewGfx, connection, { stroke: "var(--element-dragger-color)" });
};
ConnectionPreview.prototype.drawNoopPreview = function(connectionPreviewGfx, hints) {
	var source = hints.source, target = hints.target, start = hints.connectionStart || getMid(source), end = hints.connectionEnd || getMid(target);
	var waypoints = this.cropWaypoints(start, end, source, target);
	var connection = this.createNoopConnection(waypoints[0], waypoints[1]);
	append(connectionPreviewGfx, connection);
};
ConnectionPreview.prototype.cropWaypoints = function(start, end, source, target) {
	var graphicsFactory = this._graphicsFactory, sourcePath = source && graphicsFactory.getShapePath(source), targetPath = target && graphicsFactory.getShapePath(target), connectionPath = graphicsFactory.getConnectionPath({ waypoints: [start, end] });
	start = source && getElementLineIntersection(sourcePath, connectionPath, true) || start;
	end = target && getElementLineIntersection(targetPath, connectionPath, false) || end;
	return [start, end];
};
ConnectionPreview.prototype.cleanUp = function(context) {
	if (context && context.connectionPreviewGfx) remove(context.connectionPreviewGfx);
};
ConnectionPreview.prototype.getConnection = function(canConnect) {
	var attrs = ensureConnectionAttrs(canConnect);
	return this._elementFactory.createConnection(attrs);
};
ConnectionPreview.prototype.createConnectionPreviewGfx = function() {
	var gfx = create("g");
	attr$1(gfx, { pointerEvents: "none" });
	classes$1(gfx).add(MARKER_CONNECTION_PREVIEW);
	append(this._canvas.getActiveLayer(), gfx);
	return gfx;
};
ConnectionPreview.prototype.createNoopConnection = function(start, end) {
	return createLine([start, end], {
		"stroke": "#333",
		"strokeDasharray": [1],
		"strokeWidth": 2,
		"pointer-events": "none"
	});
};
function cacheReturnValues(fn) {
	var returnValues = {};
	return function(firstArgument) {
		var key = JSON.stringify(firstArgument);
		var returnValue = returnValues[key];
		if (!returnValue) returnValue = returnValues[key] = fn.apply(null, arguments);
		return returnValue;
	};
}
function ensureConnectionAttrs(canConnect) {
	if (isObject(canConnect)) return canConnect;
	else return {};
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/connection-preview/index.js
var connection_preview_default = {
	__init__: ["connectionPreview"],
	connectionPreview: ["type", ConnectionPreview]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/distribute-elements/DistributeElements.js
init_dist();
var AXIS_DIMENSIONS = {
	horizontal: ["x", "width"],
	vertical: ["y", "height"]
};
var THRESHOLD = 5;
function DistributeElements$1(modeling, rules) {
	this._modeling = modeling;
	this._filters = [];
	this.registerFilter(function(elements) {
		var allowed = rules.allowed("elements.distribute", { elements });
		if (isArray(allowed)) return allowed;
		return allowed ? elements : [];
	});
}
DistributeElements$1.$inject = ["modeling", "rules"];
DistributeElements$1.prototype.registerFilter = function(filterFn) {
	if (typeof filterFn !== "function") throw new Error("the filter has to be a function");
	this._filters.push(filterFn);
};
DistributeElements$1.prototype.trigger = function(elements, orientation) {
	var modeling = this._modeling;
	var groups, distributableElements;
	if (elements.length < 3) return;
	this._setOrientation(orientation);
	distributableElements = this._filterElements(elements);
	groups = this._createGroups(distributableElements);
	if (groups.length <= 2) return;
	modeling.distributeElements(groups, this._axis, this._dimension);
	return groups;
};
DistributeElements$1.prototype._filterElements = function(elements) {
	var filters = this._filters, axis = this._axis, dimension = this._dimension, distributableElements = [].concat(elements);
	if (!filters.length) return elements;
	forEach(filters, function(filterFn) {
		distributableElements = filterFn(distributableElements, axis, dimension);
	});
	return distributableElements;
};
DistributeElements$1.prototype._createGroups = function(elements) {
	var rangeGroups = [], self = this, axis = this._axis, dimension = this._dimension;
	if (!axis) throw new Error("must have a defined \"axis\" and \"dimension\"");
	var sortedElements = sortBy(elements, axis);
	forEach(sortedElements, function(element, idx) {
		var elementRange = self._findRange(element, axis, dimension), range;
		var previous = rangeGroups[rangeGroups.length - 1];
		if (previous && self._hasIntersection(previous.range, elementRange)) rangeGroups[rangeGroups.length - 1].elements.push(element);
		else {
			range = {
				range: elementRange,
				elements: [element]
			};
			rangeGroups.push(range);
		}
	});
	return rangeGroups;
};
DistributeElements$1.prototype._setOrientation = function(direction) {
	var orientation = AXIS_DIMENSIONS[direction];
	this._axis = orientation[0];
	this._dimension = orientation[1];
};
DistributeElements$1.prototype._hasIntersection = function(rangeA, rangeB) {
	return Math.max(rangeA.min, rangeA.max) >= Math.min(rangeB.min, rangeB.max) && Math.min(rangeA.min, rangeA.max) <= Math.max(rangeB.min, rangeB.max);
};
DistributeElements$1.prototype._findRange = function(element) {
	var axis = element[this._axis], dimension = element[this._dimension];
	return {
		min: axis + THRESHOLD,
		max: axis + dimension - THRESHOLD
	};
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/distribute-elements/index.js
var distribute_elements_default = {
	__init__: ["distributeElements"],
	distributeElements: ["type", DistributeElements$1]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/editor-actions/EditorActions.js
init_dist();
var NOT_REGISTERED_ERROR = "is not a registered action";
var IS_REGISTERED_ERROR = "is already registered";
function EditorActions(eventBus, injector) {
	this._eventBus = eventBus;
	this._actions = {};
	var self = this;
	eventBus.on("diagram.init", function() {
		self._registerDefaultActions(injector);
		eventBus.fire("editorActions.init", { editorActions: self });
	});
}
EditorActions.$inject = ["eventBus", "injector"];
EditorActions.prototype._registerDefaultActions = function(injector) {
	var commandStack = injector.get("commandStack", false);
	var modeling = injector.get("modeling", false);
	var selection = injector.get("selection", false);
	var zoomScroll = injector.get("zoomScroll", false);
	var copyPaste = injector.get("copyPaste", false);
	var canvas = injector.get("canvas", false);
	var rules = injector.get("rules", false);
	var keyboardMove = injector.get("keyboardMove", false);
	var keyboardMoveSelection = injector.get("keyboardMoveSelection", false);
	if (commandStack) {
		this.register("undo", function() {
			commandStack.undo();
		});
		this.register("redo", function() {
			commandStack.redo();
		});
	}
	if (copyPaste && selection) this.register("copy", function() {
		var selectedElements = selection.get();
		if (selectedElements.length) return copyPaste.copy(selectedElements);
	});
	if (copyPaste && selection) this.register("duplicate", function() {
		var selectedElements = selection.get();
		if (selectedElements.length) return copyPaste.duplicate(selectedElements);
	});
	if (copyPaste) this.register("paste", function() {
		copyPaste.paste();
	});
	if (copyPaste && selection && rules) this.register("cut", function() {
		var selectedElements = selection.get();
		if (!selectedElements.length) return;
		var allowed = rules.allowed("elements.delete", { elements: selectedElements });
		if (allowed === false) return;
		var cuttableElements = isArray(allowed) ? allowed : selectedElements;
		return copyPaste.cut(cuttableElements.slice());
	});
	if (zoomScroll) this.register("stepZoom", function(opts) {
		zoomScroll.stepZoom(opts.value);
	});
	if (canvas) this.register("zoom", function(opts) {
		canvas.zoom(opts.value);
	});
	if (modeling && selection && rules) this.register("removeSelection", function() {
		var selectedElements = selection.get();
		if (!selectedElements.length) return;
		var allowed = rules.allowed("elements.delete", { elements: selectedElements }), removableElements;
		if (allowed === false) return;
		else if (isArray(allowed)) removableElements = allowed;
		else removableElements = selectedElements;
		if (removableElements.length) modeling.removeElements(removableElements.slice());
	});
	if (keyboardMove) this.register("moveCanvas", function(opts) {
		keyboardMove.moveCanvas(opts);
	});
	if (keyboardMoveSelection) this.register("moveSelection", function(opts) {
		keyboardMoveSelection.moveSelection(opts.direction, opts.accelerated);
	});
};
EditorActions.prototype.trigger = function(action, opts) {
	if (!this._actions[action]) throw error(action, NOT_REGISTERED_ERROR);
	if (this._eventBus.fire("editorActions.allowed", {
		action,
		opts
	}) === false) return;
	return this._actions[action](opts);
};
EditorActions.prototype.register = function(actions, listener) {
	var self = this;
	if (typeof actions === "string") return this._registerAction(actions, listener);
	forEach(actions, function(listener, action) {
		self._registerAction(action, listener);
	});
};
EditorActions.prototype._registerAction = function(action, listener) {
	if (this.isRegistered(action)) throw error(action, IS_REGISTERED_ERROR);
	this._actions[action] = listener;
};
EditorActions.prototype.unregister = function(action) {
	if (!this.isRegistered(action)) throw error(action, NOT_REGISTERED_ERROR);
	this._actions[action] = void 0;
};
EditorActions.prototype.getActions = function() {
	return Object.keys(this._actions);
};
EditorActions.prototype.isRegistered = function(action) {
	return !!this._actions[action];
};
function error(action, message) {
	return new Error(action + " " + message);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/editor-actions/index.js
var editor_actions_default = {
	__init__: ["editorActions"],
	editorActions: ["type", EditorActions]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/grid-snapping/behavior/ResizeBehavior.js
init_dist();
function ResizeBehavior(eventBus, gridSnapping) {
	CommandInterceptor.call(this, eventBus);
	this._gridSnapping = gridSnapping;
	var self = this;
	this.preExecute("shape.resize", function(event) {
		var context = event.context, autoResize = (context.hints || {}).autoResize;
		if (!autoResize) return;
		var shape = context.shape, newBounds = context.newBounds;
		if (isString(autoResize)) context.newBounds = self.snapComplex(newBounds, autoResize);
		else context.newBounds = self.snapSimple(shape, newBounds);
	});
}
ResizeBehavior.$inject = [
	"eventBus",
	"gridSnapping",
	"modeling"
];
e$2(ResizeBehavior, CommandInterceptor);
ResizeBehavior.prototype.snapSimple = function(shape, newBounds) {
	var gridSnapping = this._gridSnapping;
	newBounds.width = gridSnapping.snapValue(newBounds.width, { min: newBounds.width });
	newBounds.height = gridSnapping.snapValue(newBounds.height, { min: newBounds.height });
	newBounds.x = shape.x + shape.width / 2 - newBounds.width / 2;
	newBounds.y = shape.y + shape.height / 2 - newBounds.height / 2;
	return newBounds;
};
ResizeBehavior.prototype.snapComplex = function(newBounds, directions) {
	if (/w|e/.test(directions)) newBounds = this.snapHorizontally(newBounds, directions);
	if (/n|s/.test(directions)) newBounds = this.snapVertically(newBounds, directions);
	return newBounds;
};
ResizeBehavior.prototype.snapHorizontally = function(newBounds, directions) {
	var gridSnapping = this._gridSnapping, west = /w/.test(directions), east = /e/.test(directions);
	var snappedNewBounds = {};
	snappedNewBounds.width = gridSnapping.snapValue(newBounds.width, { min: newBounds.width });
	if (east) {
		if (west) {
			snappedNewBounds.x = gridSnapping.snapValue(newBounds.x, { max: newBounds.x });
			snappedNewBounds.width += gridSnapping.snapValue(newBounds.x - snappedNewBounds.x, { min: newBounds.x - snappedNewBounds.x });
		} else newBounds.x = newBounds.x + newBounds.width - snappedNewBounds.width;
	}
	assign(newBounds, snappedNewBounds);
	return newBounds;
};
ResizeBehavior.prototype.snapVertically = function(newBounds, directions) {
	var gridSnapping = this._gridSnapping, north = /n/.test(directions), south = /s/.test(directions);
	var snappedNewBounds = {};
	snappedNewBounds.height = gridSnapping.snapValue(newBounds.height, { min: newBounds.height });
	if (north) {
		if (south) {
			snappedNewBounds.y = gridSnapping.snapValue(newBounds.y, { max: newBounds.y });
			snappedNewBounds.height += gridSnapping.snapValue(newBounds.y - snappedNewBounds.y, { min: newBounds.y - snappedNewBounds.y });
		} else newBounds.y = newBounds.y + newBounds.height - snappedNewBounds.height;
	}
	assign(newBounds, snappedNewBounds);
	return newBounds;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/grid-snapping/behavior/SpaceToolBehavior.js
var HIGH_PRIORITY$2 = 2e3;
function SpaceToolBehavior(eventBus, gridSnapping) {
	eventBus.on(["spaceTool.move", "spaceTool.end"], HIGH_PRIORITY$2, function(event) {
		var context = event.context;
		if (!context.initialized) return;
		var axis = context.axis;
		var snapped;
		if (axis === "x") {
			snapped = gridSnapping.snapValue(event.dx);
			event.x = event.x + snapped - event.dx;
			event.dx = snapped;
		} else {
			snapped = gridSnapping.snapValue(event.dy);
			event.y = event.y + snapped - event.dy;
			event.dy = snapped;
		}
	});
}
SpaceToolBehavior.$inject = ["eventBus", "gridSnapping"];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/grid-snapping/behavior/index.js
var behavior_default = {
	__init__: ["gridSnappingResizeBehavior", "gridSnappingSpaceToolBehavior"],
	gridSnappingResizeBehavior: ["type", ResizeBehavior],
	gridSnappingSpaceToolBehavior: ["type", SpaceToolBehavior]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/grid-snapping/GridUtil.js
function quantize(value, quantum, fn) {
	if (!fn) fn = "round";
	return Math[fn](value / quantum) * quantum;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/grid-snapping/GridSnapping.js
init_dist();
var LOWER_PRIORITY = 1200;
var LOW_PRIORITY$4 = 800;
function GridSnapping(elementRegistry, eventBus, config) {
	var active = !config || config.active !== false;
	this._eventBus = eventBus;
	var self = this;
	eventBus.on("diagram.init", LOW_PRIORITY$4, function() {
		self.setActive(active);
	});
	eventBus.on([
		"create.move",
		"create.end",
		"bendpoint.move.move",
		"bendpoint.move.end",
		"connect.move",
		"connect.end",
		"connectionSegment.move.move",
		"connectionSegment.move.end",
		"resize.move",
		"resize.end",
		"shape.move.move",
		"shape.move.end"
	], LOWER_PRIORITY, function(event) {
		var originalEvent = event.originalEvent;
		if (!self.active || originalEvent && isCmd(originalEvent)) return;
		var context = event.context, gridSnappingContext = context.gridSnappingContext;
		if (!gridSnappingContext) gridSnappingContext = context.gridSnappingContext = {};
		["x", "y"].forEach(function(axis) {
			var options = {};
			var snapOffset = getSnapOffset(event, axis, elementRegistry);
			if (snapOffset) options.offset = snapOffset;
			var snapConstraints = getSnapConstraints(event, axis);
			if (snapConstraints) assign(options, snapConstraints);
			if (!isSnapped(event, axis)) self.snapEvent(event, axis, options);
		});
	});
}
GridSnapping.prototype.snapEvent = function(event, axis, options) {
	setSnapped(event, axis, this.snapValue(event[axis], options));
};
GridSnapping.prototype.getGridSpacing = function() {
	return 10;
};
GridSnapping.prototype.snapValue = function(value, options) {
	var offset = 0;
	if (options && options.offset) offset = options.offset;
	value += offset;
	value = quantize(value, 10);
	var min, max;
	if (options && options.min) {
		min = options.min;
		if (isNumber(min)) {
			min = quantize(min + offset, 10, "ceil");
			value = Math.max(value, min);
		}
	}
	if (options && options.max) {
		max = options.max;
		if (isNumber(max)) {
			max = quantize(max + offset, 10, "floor");
			value = Math.min(value, max);
		}
	}
	value -= offset;
	return value;
};
GridSnapping.prototype.isActive = function() {
	return this.active;
};
GridSnapping.prototype.setActive = function(active) {
	this.active = active;
	this._eventBus.fire("gridSnapping.toggle", { active });
};
GridSnapping.prototype.toggleActive = function() {
	this.setActive(!this.active);
};
GridSnapping.$inject = [
	"elementRegistry",
	"eventBus",
	"config.gridSnapping"
];
function getSnapConstraints(event, axis) {
	var context = event.context, createConstraints = context.createConstraints, resizeConstraints = context.resizeConstraints || {}, gridSnappingContext = context.gridSnappingContext, snapConstraints = gridSnappingContext.snapConstraints;
	if (snapConstraints && snapConstraints[axis]) return snapConstraints[axis];
	if (!snapConstraints) snapConstraints = gridSnappingContext.snapConstraints = {};
	if (!snapConstraints[axis]) snapConstraints[axis] = {};
	var direction = context.direction;
	if (createConstraints) {
		if (isHorizontal$1(axis)) {
			snapConstraints.x.min = createConstraints.left;
			snapConstraints.x.max = createConstraints.right;
		} else {
			snapConstraints.y.min = createConstraints.top;
			snapConstraints.y.max = createConstraints.bottom;
		}
	}
	var minResizeConstraints = resizeConstraints.min, maxResizeConstraints = resizeConstraints.max;
	if (minResizeConstraints) {
		if (isHorizontal$1(axis)) {
			if (isWest(direction)) snapConstraints.x.max = minResizeConstraints.left;
			else snapConstraints.x.min = minResizeConstraints.right;
		} else if (isNorth(direction)) snapConstraints.y.max = minResizeConstraints.top;
		else snapConstraints.y.min = minResizeConstraints.bottom;
	}
	if (maxResizeConstraints) {
		if (isHorizontal$1(axis)) {
			if (isWest(direction)) snapConstraints.x.min = maxResizeConstraints.left;
			else snapConstraints.x.max = maxResizeConstraints.right;
		} else if (isNorth(direction)) snapConstraints.y.min = maxResizeConstraints.top;
		else snapConstraints.y.max = maxResizeConstraints.bottom;
	}
	return snapConstraints[axis];
}
function getSnapOffset(event, axis, elementRegistry) {
	var context = event.context, shape = event.shape, gridSnappingContext = context.gridSnappingContext, snapLocation = gridSnappingContext.snapLocation, snapOffset = gridSnappingContext.snapOffset;
	if (snapOffset && isNumber(snapOffset[axis])) return snapOffset[axis];
	if (!snapOffset) snapOffset = gridSnappingContext.snapOffset = {};
	if (!isNumber(snapOffset[axis])) snapOffset[axis] = 0;
	if (!shape) return snapOffset[axis];
	if (!elementRegistry.get(shape.id)) {
		if (isHorizontal$1(axis)) snapOffset[axis] += shape[axis] + shape.width / 2;
		else snapOffset[axis] += shape[axis] + shape.height / 2;
	}
	if (!snapLocation) return snapOffset[axis];
	if (axis === "x") {
		if (/left/.test(snapLocation)) snapOffset[axis] -= shape.width / 2;
		else if (/right/.test(snapLocation)) snapOffset[axis] += shape.width / 2;
	} else if (/top/.test(snapLocation)) snapOffset[axis] -= shape.height / 2;
	else if (/bottom/.test(snapLocation)) snapOffset[axis] += shape.height / 2;
	return snapOffset[axis];
}
function isHorizontal$1(axis) {
	return axis === "x";
}
function isNorth(direction) {
	return direction.indexOf("n") !== -1;
}
function isWest(direction) {
	return direction.indexOf("w") !== -1;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/grid-snapping/index.js
var grid_snapping_default = {
	__depends__: [behavior_default],
	__init__: ["gridSnapping"],
	gridSnapping: ["type", GridSnapping]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/keyboard-move-selection/KeyboardMoveSelection.js
init_dist();
var DEFAULT_CONFIG = {
	moveSpeed: 1,
	moveSpeedAccelerated: 10
};
var HIGHER_PRIORITY$2 = 1500;
var KEY_TO_DIRECTION = {
	ArrowLeft: "left",
	ArrowUp: "up",
	ArrowRight: "right",
	ArrowDown: "down"
};
var DIRECTIONS_DELTA = {
	left: function(speed) {
		return {
			x: -speed,
			y: 0
		};
	},
	up: function(speed) {
		return {
			x: 0,
			y: -speed
		};
	},
	right: function(speed) {
		return {
			x: speed,
			y: 0
		};
	},
	down: function(speed) {
		return {
			x: 0,
			y: speed
		};
	}
};
function KeyboardMoveSelection(config, keyboard, modeling, rules, selection) {
	var self = this;
	this._config = assign({}, DEFAULT_CONFIG, config || {});
	keyboard.addListener(HIGHER_PRIORITY$2, function(event) {
		var keyEvent = event.keyEvent;
		var direction = KEY_TO_DIRECTION[keyEvent.key];
		if (!direction) return;
		if (keyboard.isCmd(keyEvent)) return;
		var accelerated = keyboard.isShift(keyEvent);
		self.moveSelection(direction, accelerated);
		return true;
	});
	this.moveSelection = function(direction, accelerated) {
		var selectedElements = selection.get();
		if (!selectedElements.length) return;
		var speed = this._config[accelerated ? "moveSpeedAccelerated" : "moveSpeed"];
		var delta = DIRECTIONS_DELTA[direction](speed);
		if (rules.allowed("elements.move", {
			shapes: selectedElements,
			hints: { keyboardMove: true }
		})) modeling.moveElements(selectedElements, delta);
	};
}
KeyboardMoveSelection.$inject = [
	"config.keyboardMoveSelection",
	"keyboard",
	"modeling",
	"rules",
	"selection"
];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/keyboard-move-selection/index.js
var keyboard_move_selection_default = {
	__depends__: [keyboard_default, selection_default],
	__init__: ["keyboardMoveSelection"],
	keyboardMoveSelection: ["type", KeyboardMoveSelection]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/command/CommandStack.js
init_dist();
function CommandStack(eventBus, injector) {
	this._handlerMap = {};
	this._stack = [];
	this._stackIdx = -1;
	this._currentExecution = {
		actions: [],
		dirty: [],
		trigger: null
	};
	this._injector = injector;
	this._eventBus = eventBus;
	this._uid = 1;
	eventBus.on(["diagram.destroy", "diagram.clear"], function() {
		this.clear(false);
	}, this);
}
CommandStack.$inject = ["eventBus", "injector"];
CommandStack.prototype.execute = function(command, context) {
	if (!command) throw new Error("command required");
	this._currentExecution.trigger = "execute";
	const action = {
		command,
		context
	};
	this._pushAction(action);
	this._internalExecute(action);
	this._popAction();
};
CommandStack.prototype.canExecute = function(command, context) {
	const action = {
		command,
		context
	};
	const handler = this._getHandler(command);
	let result = this._fire(command, "canExecute", action);
	if (result === void 0) {
		if (!handler) return false;
		if (handler.canExecute) result = handler.canExecute(context);
	}
	return result;
};
CommandStack.prototype.clear = function(emit) {
	this._stack.length = 0;
	this._stackIdx = -1;
	if (emit !== false) this._fire("changed", { trigger: "clear" });
};
CommandStack.prototype.undo = function() {
	let action = this._getUndoAction(), next;
	if (action) {
		this._currentExecution.trigger = "undo";
		this._pushAction(action);
		while (action) {
			this._internalUndo(action);
			next = this._getUndoAction();
			if (!next || next.id !== action.id) break;
			action = next;
		}
		this._popAction();
	}
};
CommandStack.prototype.redo = function() {
	let action = this._getRedoAction(), next;
	if (action) {
		this._currentExecution.trigger = "redo";
		this._pushAction(action);
		while (action) {
			this._internalExecute(action, true);
			next = this._getRedoAction();
			if (!next || next.id !== action.id) break;
			action = next;
		}
		this._popAction();
	}
};
CommandStack.prototype.register = function(command, handler) {
	this._setHandler(command, handler);
};
CommandStack.prototype.registerHandler = function(command, handlerCls) {
	if (!command || !handlerCls) throw new Error("command and handlerCls must be defined");
	const handler = this._injector.instantiate(handlerCls);
	this.register(command, handler);
};
CommandStack.prototype.canUndo = function() {
	return !!this._getUndoAction();
};
CommandStack.prototype.canRedo = function() {
	return !!this._getRedoAction();
};
CommandStack.prototype._getRedoAction = function() {
	return this._stack[this._stackIdx + 1];
};
CommandStack.prototype._getUndoAction = function() {
	return this._stack[this._stackIdx];
};
CommandStack.prototype._internalUndo = function(action) {
	const command = action.command, context = action.context;
	const handler = this._getHandler(command);
	this._atomicDo(() => {
		this._fire(command, "revert", action);
		if (handler.revert) this._markDirty(handler.revert(context));
		this._revertedAction(action);
		this._fire(command, "reverted", action);
	});
};
CommandStack.prototype._fire = function(command, qualifier, event) {
	if (arguments.length < 3) {
		event = qualifier;
		qualifier = null;
	}
	const names = qualifier ? [command + "." + qualifier, qualifier] : [command];
	let result;
	event = this._eventBus.createEvent(event);
	for (const name of names) {
		result = this._eventBus.fire("commandStack." + name, event);
		if (event.cancelBubble) break;
	}
	return result;
};
CommandStack.prototype._createId = function() {
	return this._uid++;
};
CommandStack.prototype._atomicDo = function(fn) {
	const execution = this._currentExecution;
	execution.atomic = true;
	try {
		fn();
	} finally {
		execution.atomic = false;
	}
};
CommandStack.prototype._internalExecute = function(action, redo) {
	const command = action.command, context = action.context;
	const handler = this._getHandler(command);
	if (!handler) throw new Error("no command handler registered for <" + command + ">");
	this._pushAction(action);
	if (!redo) {
		this._fire(command, "preExecute", action);
		if (handler.preExecute) handler.preExecute(context);
		this._fire(command, "preExecuted", action);
	}
	this._atomicDo(() => {
		this._fire(command, "execute", action);
		if (handler.execute) this._markDirty(handler.execute(context));
		this._executedAction(action, redo);
		this._fire(command, "executed", action);
	});
	if (!redo) {
		this._fire(command, "postExecute", action);
		if (handler.postExecute) handler.postExecute(context);
		this._fire(command, "postExecuted", action);
	}
	this._popAction();
};
CommandStack.prototype._pushAction = function(action) {
	const execution = this._currentExecution, actions = execution.actions;
	const baseAction = actions[0];
	if (execution.atomic) throw new Error("illegal invocation in <execute> or <revert> phase (action: " + action.command + ")");
	if (!action.id) action.id = baseAction && baseAction.id || this._createId();
	actions.push(action);
};
CommandStack.prototype._popAction = function() {
	const execution = this._currentExecution, trigger = execution.trigger, actions = execution.actions, dirty = execution.dirty;
	actions.pop();
	if (!actions.length) {
		this._eventBus.fire("elements.changed", { elements: uniqueBy("id", dirty.reverse()) });
		dirty.length = 0;
		this._fire("changed", { trigger });
		execution.trigger = null;
	}
};
CommandStack.prototype._markDirty = function(elements) {
	const execution = this._currentExecution;
	if (!elements) return;
	elements = isArray(elements) ? elements : [elements];
	execution.dirty = execution.dirty.concat(elements);
};
CommandStack.prototype._executedAction = function(action, redo) {
	const stackIdx = ++this._stackIdx;
	if (!redo) this._stack.splice(stackIdx, this._stack.length, action);
};
CommandStack.prototype._revertedAction = function(action) {
	this._stackIdx--;
};
CommandStack.prototype._getHandler = function(command) {
	return this._handlerMap[command];
};
CommandStack.prototype._setHandler = function(command, handler) {
	if (!command || !handler) throw new Error("command and handler required");
	if (this._handlerMap[command]) throw new Error("overriding handler for command <" + command + ">");
	this._handlerMap[command] = handler;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/command/index.js
var command_default = { commandStack: ["type", CommandStack] };
//#endregion
//#region ../../node_modules/diagram-js-direct-editing/lib/TextBox.js
init_dist();
var min$1 = Math.min;
var max$1 = Math.max;
function preventDefault(e) {
	e.preventDefault();
}
function stopPropagation(e) {
	e.stopPropagation();
}
function isTextNode(node) {
	return node.nodeType === Node.TEXT_NODE;
}
function toArray(nodeList) {
	return [].slice.call(nodeList);
}
function TextBox(options) {
	this.container = options.container;
	this.parent = domify("<div class=\"djs-direct-editing-parent\"><div class=\"djs-direct-editing-content\" contenteditable=\"true\"></div></div>");
	this.content = query("[contenteditable]", this.parent);
	this.keyHandler = options.keyHandler || function() {};
	this.resizeHandler = options.resizeHandler || function() {};
	this.focusoutHandler = options.focusoutHandler || function() {};
	this.autoResize = bind(this.autoResize, this);
	this.handlePaste = bind(this.handlePaste, this);
}
TextBox.prototype.create = function(bounds, style, value, options) {
	var self = this;
	var parent = this.parent, content = this.content, container = this.container;
	options = this.options = options || {};
	style = this.style = style || {};
	var parentStyle = pick(style, [
		"width",
		"height",
		"maxWidth",
		"maxHeight",
		"minWidth",
		"minHeight",
		"left",
		"top",
		"backgroundColor",
		"position",
		"overflow",
		"border",
		"wordWrap",
		"textAlign",
		"outline",
		"transform"
	]);
	assign(parent.style, {
		width: bounds.width + "px",
		height: bounds.height + "px",
		maxWidth: bounds.maxWidth + "px",
		maxHeight: bounds.maxHeight + "px",
		minWidth: bounds.minWidth + "px",
		minHeight: bounds.minHeight + "px",
		left: bounds.x + "px",
		top: bounds.y + "px",
		backgroundColor: "#ffffff",
		position: "absolute",
		overflow: "visible",
		border: "1px solid #ccc",
		boxSizing: "border-box",
		wordWrap: "normal",
		textAlign: "center",
		outline: "none"
	}, parentStyle);
	var contentStyle = pick(style, [
		"fontFamily",
		"fontSize",
		"fontWeight",
		"lineHeight",
		"padding",
		"paddingTop",
		"paddingRight",
		"paddingBottom",
		"paddingLeft"
	]);
	assign(content.style, {
		boxSizing: "border-box",
		width: "100%",
		outline: "none",
		wordWrap: "break-word"
	}, contentStyle);
	if (options.centerVertically) assign(content.style, {
		position: "absolute",
		top: "50%",
		transform: "translate(0, -50%)"
	}, contentStyle);
	content.innerText = value;
	event.bind(content, "keydown", this.keyHandler);
	event.bind(content, "mousedown", stopPropagation);
	event.bind(content, "paste", self.handlePaste);
	event.bind(content, "focusout", this.focusoutHandler);
	if (options.autoResize) event.bind(content, "input", this.autoResize);
	if (options.resizable) this.resizable(style);
	container.appendChild(parent);
	this.setSelection(content.lastChild, content.lastChild && content.lastChild.length);
	return parent;
};
TextBox.prototype.handlePaste = function(e) {
	var options = this.options, style = this.style;
	e.preventDefault();
	var text;
	if (e.clipboardData) text = e.clipboardData.getData("text/plain");
	else text = window.clipboardData.getData("Text");
	this.insertText(text);
	if (options.autoResize) {
		var hasResized = this.autoResize(style);
		if (hasResized) this.resizeHandler(hasResized);
	}
};
TextBox.prototype.insertText = function(text) {
	text = normalizeEndOfLineSequences(text);
	if (document.execCommand("insertText", false, text)) return;
	this._insertTextIE(text);
};
TextBox.prototype._insertTextIE = function(text) {
	var range = this.getSelection(), startContainer = range.startContainer, endContainer = range.endContainer, startOffset = range.startOffset, endOffset = range.endOffset, commonAncestorContainer = range.commonAncestorContainer;
	var childNodesArray = toArray(commonAncestorContainer.childNodes);
	var container, offset;
	if (isTextNode(commonAncestorContainer)) {
		var containerTextContent = startContainer.textContent;
		startContainer.textContent = containerTextContent.substring(0, startOffset) + text + containerTextContent.substring(endOffset);
		container = startContainer;
		offset = startOffset + text.length;
	} else if (startContainer === this.content && endContainer === this.content) {
		var textNode = document.createTextNode(text);
		this.content.insertBefore(textNode, childNodesArray[startOffset]);
		container = textNode;
		offset = textNode.textContent.length;
	} else {
		var startContainerChildIndex = childNodesArray.indexOf(startContainer), endContainerChildIndex = childNodesArray.indexOf(endContainer);
		childNodesArray.forEach(function(childNode, index) {
			if (index === startContainerChildIndex) childNode.textContent = startContainer.textContent.substring(0, startOffset) + text + endContainer.textContent.substring(endOffset);
			else if (index > startContainerChildIndex && index <= endContainerChildIndex) remove$1(childNode);
		});
		container = startContainer;
		offset = startOffset + text.length;
	}
	if (container && offset !== void 0) setTimeout(function() {
		self.setSelection(container, offset);
	});
};
TextBox.prototype.autoResize = function() {
	var parent = this.parent, content = this.content;
	var fontSize = parseInt(this.style.fontSize) || 12;
	if (content.scrollHeight > parent.offsetHeight || content.scrollHeight < parent.offsetHeight - fontSize) {
		var bounds = parent.getBoundingClientRect();
		var height = content.scrollHeight;
		parent.style.height = height + "px";
		this.resizeHandler({
			width: bounds.width,
			height: bounds.height,
			dx: 0,
			dy: height - bounds.height
		});
	}
};
TextBox.prototype.resizable = function() {
	var self = this;
	var parent = this.parent, resizeHandle = this.resizeHandle;
	var minWidth = parseInt(this.style.minWidth) || 0, minHeight = parseInt(this.style.minHeight) || 0, maxWidth = parseInt(this.style.maxWidth) || Infinity, maxHeight = parseInt(this.style.maxHeight) || Infinity;
	if (!resizeHandle) {
		resizeHandle = this.resizeHandle = domify("<div class=\"djs-direct-editing-resize-handle\"></div>");
		var startX, startY, startWidth, startHeight;
		var onMouseDown = function(e) {
			preventDefault(e);
			stopPropagation(e);
			startX = e.clientX;
			startY = e.clientY;
			var bounds = parent.getBoundingClientRect();
			startWidth = bounds.width;
			startHeight = bounds.height;
			event.bind(document, "mousemove", onMouseMove);
			event.bind(document, "mouseup", onMouseUp);
		};
		var onMouseMove = function(e) {
			preventDefault(e);
			stopPropagation(e);
			var newWidth = min$1(max$1(startWidth + e.clientX - startX, minWidth), maxWidth);
			var newHeight = min$1(max$1(startHeight + e.clientY - startY, minHeight), maxHeight);
			parent.style.width = newWidth + "px";
			parent.style.height = newHeight + "px";
			self.resizeHandler({
				width: startWidth,
				height: startHeight,
				dx: e.clientX - startX,
				dy: e.clientY - startY
			});
		};
		var onMouseUp = function(e) {
			preventDefault(e);
			stopPropagation(e);
			event.unbind(document, "mousemove", onMouseMove, false);
			event.unbind(document, "mouseup", onMouseUp, false);
		};
		event.bind(resizeHandle, "mousedown", onMouseDown);
	}
	assign(resizeHandle.style, {
		position: "absolute",
		bottom: "0px",
		right: "0px",
		cursor: "nwse-resize",
		width: "0",
		height: "0",
		borderTop: (parseInt(this.style.fontSize) / 4 || 3) + "px solid transparent",
		borderRight: (parseInt(this.style.fontSize) / 4 || 3) + "px solid #ccc",
		borderBottom: (parseInt(this.style.fontSize) / 4 || 3) + "px solid #ccc",
		borderLeft: (parseInt(this.style.fontSize) / 4 || 3) + "px solid transparent"
	});
	parent.appendChild(resizeHandle);
};
TextBox.prototype.destroy = function() {
	var parent = this.parent, content = this.content, resizeHandle = this.resizeHandle;
	content.innerText = "";
	parent.removeAttribute("style");
	content.removeAttribute("style");
	event.unbind(content, "keydown", this.keyHandler);
	event.unbind(content, "mousedown", stopPropagation);
	event.unbind(content, "input", this.autoResize);
	event.unbind(content, "paste", this.handlePaste);
	event.unbind(content, "focusout", this.focusoutHandler);
	if (resizeHandle) {
		resizeHandle.removeAttribute("style");
		remove$1(resizeHandle);
	}
	remove$1(parent);
};
TextBox.prototype.getValue = function() {
	return this.content.innerText.trim();
};
TextBox.prototype.getSelection = function() {
	return window.getSelection().getRangeAt(0);
};
TextBox.prototype.setSelection = function(container, offset) {
	var range = document.createRange();
	if (container === null) range.selectNodeContents(this.content);
	else {
		range.setStart(container, offset);
		range.setEnd(container, offset);
	}
	var selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
};
function normalizeEndOfLineSequences(string) {
	return string.replace(/\r\n|\r|\n/g, "\n");
}
//#endregion
//#region ../../node_modules/diagram-js-direct-editing/lib/DirectEditing.js
init_dist();
function DirectEditing(eventBus, canvas) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	this._providers = [];
	this._active = null;
	this._textbox = new TextBox({
		container: canvas.getContainer(),
		keyHandler: bind(this._handleKey, this),
		resizeHandler: bind(this._handleResize, this),
		focusoutHandler: bind(this._handleFocusout, this)
	});
	eventBus.on(["diagram.clear", "diagram.destroy"], () => this._cleanup());
}
DirectEditing.$inject = ["eventBus", "canvas"];
DirectEditing.prototype.registerProvider = function(provider) {
	this._providers.push(provider);
};
DirectEditing.prototype.isActive = function(element) {
	return !!(this._active && (!element || this._active.element === element));
};
DirectEditing.prototype.cancel = function() {
	if (!this._active) return;
	this._fire("cancel");
	this.close();
};
DirectEditing.prototype._fire = function(event, context) {
	this._eventBus.fire("directEditing." + event, context || { active: this._active });
};
DirectEditing.prototype.close = function() {
	this._fire("deactivate");
	this._cleanup();
	this._canvas.restoreFocus && this._canvas.restoreFocus();
};
DirectEditing.prototype._cleanup = function() {
	if (!this._active) return;
	this._textbox.destroy();
	this._active = null;
	this.resizable = void 0;
};
DirectEditing.prototype.complete = function() {
	var active = this._active;
	if (!active) return;
	var containerBounds, previousBounds = active.context.bounds, newBounds = this.$textbox.getBoundingClientRect(), newText = this.getValue();
	if (newText !== active.context.text || newBounds.height !== previousBounds.height || newBounds.width !== previousBounds.width) {
		containerBounds = this._textbox.container.getBoundingClientRect();
		active.provider.update(active.element, newText, active.context.text, {
			x: newBounds.left - containerBounds.left,
			y: newBounds.top - containerBounds.top,
			width: newBounds.width,
			height: newBounds.height
		});
	}
	this._fire("complete");
	this.close();
};
DirectEditing.prototype.getValue = function() {
	return this._textbox.getValue();
};
DirectEditing.prototype._handleKey = function(e) {
	e.stopPropagation();
	var key = e.keyCode || e.charCode;
	if (key === 27) {
		e.preventDefault();
		return this.cancel();
	}
	if (key === 13 && !e.shiftKey) {
		e.preventDefault();
		return this.complete();
	}
};
DirectEditing.prototype._handleResize = function(event) {
	this._fire("resize", event);
};
DirectEditing.prototype._handleFocusout = function(event) {
	if (event.relatedTarget && this._textbox.parent.contains(event.relatedTarget)) return;
	this.complete();
};
DirectEditing.prototype.activate = function(element) {
	if (this.isActive()) this.cancel();
	if (this._eventBus.fire("directEditing.activate.allowed", { element }) === false) return false;
	var context;
	var provider = find(this._providers, function(p) {
		return (context = p.activate(element)) ? p : null;
	});
	if (context) {
		this.$textbox = this._textbox.create(context.bounds, context.style, context.text, context.options);
		this._active = {
			element,
			context,
			provider
		};
		if (context.options && context.options.resizable) this.resizable = true;
		this._fire("activate");
	}
	return !!context;
};
//#endregion
//#region ../../node_modules/diagram-js-direct-editing/lib/index.js
var lib_default = {
	__depends__: [interaction_events_default],
	__init__: ["directEditing"],
	directEditing: ["type", DirectEditing]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/rules/RuleProvider.js
function RuleProvider(eventBus) {
	CommandInterceptor.call(this, eventBus);
	this.init();
}
RuleProvider.$inject = ["eventBus"];
e$2(RuleProvider, CommandInterceptor);
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
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/AlignElementsHandler.js
init_dist();
function AlignElements(modeling, canvas) {
	this._modeling = modeling;
	this._canvas = canvas;
}
AlignElements.$inject = ["modeling", "canvas"];
AlignElements.prototype.preExecute = function(context) {
	var modeling = this._modeling;
	var elements = context.elements, alignment = context.alignment;
	forEach(elements, function(element) {
		var delta = {
			x: 0,
			y: 0
		};
		if (isDefined(alignment.left)) delta.x = alignment.left - element.x;
		else if (isDefined(alignment.right)) delta.x = alignment.right - element.width - element.x;
		else if (isDefined(alignment.center)) delta.x = alignment.center - Math.round(element.width / 2) - element.x;
		else if (isDefined(alignment.top)) delta.y = alignment.top - element.y;
		else if (isDefined(alignment.bottom)) delta.y = alignment.bottom - element.height - element.y;
		else if (isDefined(alignment.middle)) delta.y = alignment.middle - Math.round(element.height / 2) - element.y;
		modeling.moveElements([element], delta, element.parent);
	});
};
AlignElements.prototype.postExecute = function(context) {};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/AppendShapeHandler.js
init_dist();
function AppendShapeHandler(modeling) {
	this._modeling = modeling;
}
AppendShapeHandler.$inject = ["modeling"];
AppendShapeHandler.prototype.preExecute = function(context) {
	var source = context.source;
	if (!source) throw new Error("source required");
	var target = context.target || source.parent, shape = context.shape, hints = context.hints || {};
	shape = context.shape = this._modeling.createShape(shape, context.position, target, { attach: hints.attach });
	context.shape = shape;
};
AppendShapeHandler.prototype.postExecute = function(context) {
	var hints = context.hints || {};
	if (!existsConnection(context.source, context.shape)) {
		if (hints.connectionTarget === context.source) this._modeling.connect(context.shape, context.source, context.connection);
		else this._modeling.connect(context.source, context.shape, context.connection);
	}
};
function existsConnection(source, target) {
	return some(source.outgoing, function(c) {
		return c.target === target;
	});
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/CreateConnectionHandler.js
function CreateConnectionHandler(canvas, layouter) {
	this._canvas = canvas;
	this._layouter = layouter;
}
CreateConnectionHandler.$inject = ["canvas", "layouter"];
CreateConnectionHandler.prototype.execute = function(context) {
	var connection = context.connection, source = context.source, target = context.target, parent = context.parent, parentIndex = context.parentIndex, hints = context.hints;
	if (!source || !target) throw new Error("source and target required");
	if (!parent) throw new Error("parent required");
	connection.source = source;
	connection.target = target;
	if (!connection.waypoints) connection.waypoints = this._layouter.layoutConnection(connection, hints);
	this._canvas.addConnection(connection, parent, parentIndex);
	return connection;
};
CreateConnectionHandler.prototype.revert = function(context) {
	var connection = context.connection;
	this._canvas.removeConnection(connection);
	connection.source = null;
	connection.target = null;
	return connection;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/CreateElementsHandler.js
init_dist();
var round$2 = Math.round;
function CreateElementsHandler(modeling) {
	this._modeling = modeling;
}
CreateElementsHandler.$inject = ["modeling"];
CreateElementsHandler.prototype.preExecute = function(context) {
	var elements = context.elements, parent = context.parent, parentIndex = context.parentIndex, position = context.position, hints = context.hints;
	var modeling = this._modeling;
	forEach(elements, function(element) {
		if (!isNumber(element.x)) element.x = 0;
		if (!isNumber(element.y)) element.y = 0;
	});
	var visibleElements = filter(elements, function(element) {
		return !element.hidden;
	});
	var bbox = getBBox(visibleElements);
	forEach(elements, function(element) {
		if (isConnection(element)) element.waypoints = map(element.waypoints, function(waypoint) {
			return {
				x: round$2(waypoint.x - bbox.x - bbox.width / 2 + position.x),
				y: round$2(waypoint.y - bbox.y - bbox.height / 2 + position.y)
			};
		});
		assign(element, {
			x: round$2(element.x - bbox.x - bbox.width / 2 + position.x),
			y: round$2(element.y - bbox.y - bbox.height / 2 + position.y)
		});
	});
	var parentsSet = new Set(getParents(elements));
	var cache = {};
	forEach(elements, function(element) {
		if (isConnection(element)) {
			cache[element.id] = isNumber(parentIndex) ? modeling.createConnection(cache[element.source.id], cache[element.target.id], parentIndex, element, element.parent || parent, hints) : modeling.createConnection(cache[element.source.id], cache[element.target.id], element, element.parent || parent, hints);
			return;
		}
		var createShapeHints = assign({}, hints);
		if (!parentsSet.has(element)) createShapeHints.autoResize = false;
		if (isLabel(element)) createShapeHints = omit(createShapeHints, ["attach"]);
		cache[element.id] = isNumber(parentIndex) ? modeling.createShape(element, pick(element, [
			"x",
			"y",
			"width",
			"height"
		]), element.parent || parent, parentIndex, createShapeHints) : modeling.createShape(element, pick(element, [
			"x",
			"y",
			"width",
			"height"
		]), element.parent || parent, createShapeHints);
	});
	context.elements = values(cache);
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/CreateShapeHandler.js
init_dist();
var round$1 = Math.round;
function CreateShapeHandler(canvas) {
	this._canvas = canvas;
}
CreateShapeHandler.$inject = ["canvas"];
CreateShapeHandler.prototype.execute = function(context) {
	var shape = context.shape, positionOrBounds = context.position, parent = context.parent, parentIndex = context.parentIndex;
	if (!parent) throw new Error("parent required");
	if (!positionOrBounds) throw new Error("position required");
	if (positionOrBounds.width !== void 0) assign(shape, positionOrBounds);
	else assign(shape, {
		x: positionOrBounds.x - round$1(shape.width / 2),
		y: positionOrBounds.y - round$1(shape.height / 2)
	});
	this._canvas.addShape(shape, parent, parentIndex);
	return shape;
};
CreateShapeHandler.prototype.revert = function(context) {
	var shape = context.shape;
	this._canvas.removeShape(shape);
	return shape;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/CreateLabelHandler.js
function CreateLabelHandler(canvas) {
	CreateShapeHandler.call(this, canvas);
}
e$2(CreateLabelHandler, CreateShapeHandler);
CreateLabelHandler.$inject = ["canvas"];
var originalExecute = CreateShapeHandler.prototype.execute;
CreateLabelHandler.prototype.execute = function(context) {
	var label = context.shape;
	ensureValidDimensions(label);
	label.labelTarget = context.labelTarget;
	return originalExecute.call(this, context);
};
var originalRevert = CreateShapeHandler.prototype.revert;
CreateLabelHandler.prototype.revert = function(context) {
	context.shape.labelTarget = null;
	return originalRevert.call(this, context);
};
function ensureValidDimensions(label) {
	["width", "height"].forEach(function(prop) {
		if (typeof label[prop] === "undefined") label[prop] = 0;
	});
}
//#endregion
//#region ../../node_modules/diagram-js/lib/util/Removal.js
function saveClear(collection, removeFn) {
	if (typeof removeFn !== "function") throw new Error("removeFn iterator must be a function");
	if (!collection) return [];
	var e;
	while (e = collection[0]) removeFn(e);
	return collection;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/DeleteConnectionHandler.js
function DeleteConnectionHandler(canvas, modeling) {
	this._canvas = canvas;
	this._modeling = modeling;
}
DeleteConnectionHandler.$inject = ["canvas", "modeling"];
DeleteConnectionHandler.prototype.preExecute = function(context) {
	var modeling = this._modeling;
	var connection = context.connection;
	saveClear(connection.incoming, function(connection) {
		modeling.removeConnection(connection, { nested: true });
	});
	saveClear(connection.outgoing, function(connection) {
		modeling.removeConnection(connection, { nested: true });
	});
};
DeleteConnectionHandler.prototype.execute = function(context) {
	var connection = context.connection, parent = connection.parent;
	context.parent = parent;
	context.parentIndex = indexOf(parent.children, connection);
	context.source = connection.source;
	context.target = connection.target;
	this._canvas.removeConnection(connection);
	connection.source = null;
	connection.target = null;
	return connection;
};
DeleteConnectionHandler.prototype.revert = function(context) {
	var connection = context.connection, parent = context.parent, parentIndex = context.parentIndex;
	connection.source = context.source;
	connection.target = context.target;
	add(parent.children, connection, parentIndex);
	this._canvas.addConnection(connection, parent);
	return connection;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/DeleteElementsHandler.js
init_dist();
function DeleteElementsHandler(modeling, elementRegistry) {
	this._modeling = modeling;
	this._elementRegistry = elementRegistry;
}
DeleteElementsHandler.$inject = ["modeling", "elementRegistry"];
DeleteElementsHandler.prototype.postExecute = function(context) {
	var modeling = this._modeling, elementRegistry = this._elementRegistry, elements = context.elements;
	forEach(elements, function(element) {
		if (!elementRegistry.get(element.id)) return;
		if (element.waypoints) modeling.removeConnection(element);
		else modeling.removeShape(element);
	});
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/DeleteShapeHandler.js
function DeleteShapeHandler(canvas, modeling) {
	this._canvas = canvas;
	this._modeling = modeling;
}
DeleteShapeHandler.$inject = ["canvas", "modeling"];
DeleteShapeHandler.prototype.preExecute = function(context) {
	var modeling = this._modeling;
	var shape = context.shape;
	saveClear(shape.incoming, function(connection) {
		modeling.removeConnection(connection, { nested: true });
	});
	saveClear(shape.outgoing, function(connection) {
		modeling.removeConnection(connection, { nested: true });
	});
	saveClear(shape.children, function(child) {
		if (isConnection(child)) modeling.removeConnection(child, { nested: true });
		else modeling.removeShape(child, { nested: true });
	});
};
DeleteShapeHandler.prototype.execute = function(context) {
	var canvas = this._canvas;
	var shape = context.shape, oldParent = shape.parent;
	context.oldParent = oldParent;
	context.oldParentIndex = indexOf(oldParent.children, shape);
	canvas.removeShape(shape);
	return shape;
};
DeleteShapeHandler.prototype.revert = function(context) {
	var canvas = this._canvas;
	var shape = context.shape, oldParent = context.oldParent, oldParentIndex = context.oldParentIndex;
	add(oldParent.children, shape, oldParentIndex);
	canvas.addShape(shape, oldParent);
	return shape;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/DistributeElementsHandler.js
init_dist();
function DistributeElements(modeling) {
	this._modeling = modeling;
}
DistributeElements.$inject = ["modeling"];
var OFF_AXIS = {
	x: "y",
	y: "x"
};
DistributeElements.prototype.preExecute = function(context) {
	var modeling = this._modeling;
	var groups = context.groups, axis = context.axis, dimension = context.dimension;
	function updateRange(group, element) {
		group.range.min = Math.min(element[axis], group.range.min);
		group.range.max = Math.max(element[axis] + element[dimension], group.range.max);
	}
	function center(element) {
		return element[axis] + element[dimension] / 2;
	}
	function lastIdx(arr) {
		return arr.length - 1;
	}
	function rangeDiff(range) {
		return range.max - range.min;
	}
	function centerElement(refCenter, element) {
		var delta = { y: 0 };
		delta[axis] = refCenter - center(element);
		if (delta[axis]) {
			delta[OFF_AXIS[axis]] = 0;
			modeling.moveElements([element], delta, element.parent);
		}
	}
	var firstGroup = groups[0], lastGroupIdx = lastIdx(groups), lastGroup = groups[lastGroupIdx];
	var margin, spaceInBetween, groupsSize = 0;
	forEach(groups, function(group, idx) {
		var sortedElements, refElem, refCenter;
		if (group.elements.length < 2) {
			if (idx && idx !== groups.length - 1) {
				updateRange(group, group.elements[0]);
				groupsSize += rangeDiff(group.range);
			}
			return;
		}
		sortedElements = sortBy(group.elements, axis);
		refElem = sortedElements[0];
		if (idx === lastGroupIdx) refElem = sortedElements[lastIdx(sortedElements)];
		refCenter = center(refElem);
		group.range = null;
		forEach(sortedElements, function(element) {
			centerElement(refCenter, element);
			if (group.range === null) {
				group.range = {
					min: element[axis],
					max: element[axis] + element[dimension]
				};
				return;
			}
			updateRange(group, element);
		});
		if (idx && idx !== groups.length - 1) groupsSize += rangeDiff(group.range);
	});
	spaceInBetween = Math.abs(lastGroup.range.min - firstGroup.range.max);
	margin = Math.round((spaceInBetween - groupsSize) / (groups.length - 1));
	if (margin < groups.length - 1) return;
	forEach(groups, function(group, groupIdx) {
		var delta = {}, prevGroup;
		if (group === firstGroup || group === lastGroup) return;
		prevGroup = groups[groupIdx - 1];
		group.range.max = 0;
		forEach(group.elements, function(element, idx) {
			delta[OFF_AXIS[axis]] = 0;
			delta[axis] = prevGroup.range.max - element[axis] + margin;
			if (group.range.min !== element[axis]) delta[axis] += element[axis] - group.range.min;
			if (delta[axis]) modeling.moveElements([element], delta, element.parent);
			group.range.max = Math.max(element[axis] + element[dimension], idx ? group.range.max : 0);
		});
	});
};
DistributeElements.prototype.postExecute = function(context) {};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/LayoutConnectionHandler.js
init_dist();
function LayoutConnectionHandler(layouter, canvas) {
	this._layouter = layouter;
	this._canvas = canvas;
}
LayoutConnectionHandler.$inject = ["layouter", "canvas"];
LayoutConnectionHandler.prototype.execute = function(context) {
	var connection = context.connection;
	var oldWaypoints = connection.waypoints;
	assign(context, { oldWaypoints });
	connection.waypoints = this._layouter.layoutConnection(connection, context.hints);
	return connection;
};
LayoutConnectionHandler.prototype.revert = function(context) {
	var connection = context.connection;
	connection.waypoints = context.oldWaypoints;
	return connection;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/MoveConnectionHandler.js
init_dist();
function MoveConnectionHandler() {}
MoveConnectionHandler.prototype.execute = function(context) {
	var connection = context.connection, delta = context.delta;
	var newParent = context.newParent || connection.parent, newParentIndex = context.newParentIndex, oldParent = connection.parent;
	context.oldParent = oldParent;
	context.oldParentIndex = remove$2(oldParent.children, connection);
	add(newParent.children, connection, newParentIndex);
	connection.parent = newParent;
	forEach(connection.waypoints, function(p) {
		p.x += delta.x;
		p.y += delta.y;
		if (p.original) {
			p.original.x += delta.x;
			p.original.y += delta.y;
		}
	});
	return connection;
};
MoveConnectionHandler.prototype.revert = function(context) {
	var connection = context.connection, newParent = connection.parent, oldParent = context.oldParent, oldParentIndex = context.oldParentIndex, delta = context.delta;
	remove$2(newParent.children, connection);
	add(oldParent.children, connection, oldParentIndex);
	connection.parent = oldParent;
	forEach(connection.waypoints, function(p) {
		p.x -= delta.x;
		p.y -= delta.y;
		if (p.original) {
			p.original.x -= delta.x;
			p.original.y -= delta.y;
		}
	});
	return connection;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/util/AttachUtil.js
function getNewAttachPoint(point, oldBounds, newBounds) {
	var oldCenter = center(oldBounds), newCenter = center(newBounds), oldDelta = delta(point, oldCenter);
	var newDelta = {
		x: oldDelta.x * (newBounds.width / oldBounds.width),
		y: oldDelta.y * (newBounds.height / oldBounds.height)
	};
	return roundPoint({
		x: newCenter.x + newDelta.x,
		y: newCenter.y + newDelta.y
	});
}
function getNewAttachShapeDelta(shape, oldBounds, newBounds) {
	var shapeCenter = center(shape), oldCenter = center(oldBounds), newCenter = center(newBounds), shapeDelta = delta(shape, shapeCenter), oldCenterDelta = delta(shapeCenter, oldCenter), stickyPositionDelta = getStickyPositionDelta(shapeCenter, oldBounds, newBounds);
	if (stickyPositionDelta) return stickyPositionDelta;
	var newCenterDelta = {
		x: oldCenterDelta.x * (newBounds.width / oldBounds.width),
		y: oldCenterDelta.y * (newBounds.height / oldBounds.height)
	};
	var newShapeCenter = {
		x: newCenter.x + newCenterDelta.x,
		y: newCenter.y + newCenterDelta.y
	};
	return roundPoint({
		x: newShapeCenter.x + shapeDelta.x - shape.x,
		y: newShapeCenter.y + shapeDelta.y - shape.y
	});
}
function getStickyPositionDelta(oldShapeCenter, oldBounds, newBounds) {
	var oldTRBL = asTRBL(oldBounds), newTRBL = asTRBL(newBounds);
	if (isMoved(oldTRBL, newTRBL)) return null;
	var oldOrientation = getOrientation(oldBounds, oldShapeCenter), stickyPositionDelta, newShapeCenter, newOrientation;
	if (oldOrientation === "top") stickyPositionDelta = {
		x: 0,
		y: newTRBL.bottom - oldTRBL.bottom
	};
	else if (oldOrientation === "bottom") stickyPositionDelta = {
		x: 0,
		y: newTRBL.top - oldTRBL.top
	};
	else if (oldOrientation === "right") stickyPositionDelta = {
		x: newTRBL.left - oldTRBL.left,
		y: 0
	};
	else if (oldOrientation === "left") stickyPositionDelta = {
		x: newTRBL.right - oldTRBL.right,
		y: 0
	};
	else return null;
	newShapeCenter = {
		x: oldShapeCenter.x + stickyPositionDelta.x,
		y: oldShapeCenter.y + stickyPositionDelta.y
	};
	newOrientation = getOrientation(newBounds, newShapeCenter);
	if (newOrientation !== oldOrientation) return null;
	return stickyPositionDelta;
}
function isMoved(oldTRBL, newTRBL) {
	return isHorizontallyMoved(oldTRBL, newTRBL) || isVerticallyMoved(oldTRBL, newTRBL);
}
function isHorizontallyMoved(oldTRBL, newTRBL) {
	return oldTRBL.right !== newTRBL.right && oldTRBL.left !== newTRBL.left;
}
function isVerticallyMoved(oldTRBL, newTRBL) {
	return oldTRBL.top !== newTRBL.top && oldTRBL.bottom !== newTRBL.bottom;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/helper/AnchorsHelper.js
init_dist();
function getResizedSourceAnchor(connection, shape, oldBounds) {
	var waypoints = safeGetWaypoints(connection), waypointsInsideNewBounds = getWaypointsInsideBounds(waypoints, shape), oldAnchor = waypoints[0];
	if (waypointsInsideNewBounds.length) return waypointsInsideNewBounds[waypointsInsideNewBounds.length - 1];
	return getNewAttachPoint(oldAnchor.original || oldAnchor, oldBounds, shape);
}
function getResizedTargetAnchor(connection, shape, oldBounds) {
	var waypoints = safeGetWaypoints(connection), waypointsInsideNewBounds = getWaypointsInsideBounds(waypoints, shape), oldAnchor = waypoints[waypoints.length - 1];
	if (waypointsInsideNewBounds.length) return waypointsInsideNewBounds[0];
	return getNewAttachPoint(oldAnchor.original || oldAnchor, oldBounds, shape);
}
function getMovedSourceAnchor(connection, source, moveDelta) {
	var waypoints = safeGetWaypoints(connection), oldBounds = subtract(source, moveDelta), oldAnchor = waypoints[0];
	return getNewAttachPoint(oldAnchor.original || oldAnchor, oldBounds, source);
}
function getMovedTargetAnchor(connection, target, moveDelta) {
	var waypoints = safeGetWaypoints(connection), oldBounds = subtract(target, moveDelta), oldAnchor = waypoints[waypoints.length - 1];
	return getNewAttachPoint(oldAnchor.original || oldAnchor, oldBounds, target);
}
function subtract(bounds, delta) {
	return {
		x: bounds.x - delta.x,
		y: bounds.y - delta.y,
		width: bounds.width,
		height: bounds.height
	};
}
function safeGetWaypoints(connection) {
	var waypoints = connection.waypoints;
	if (!waypoints.length) throw new Error("connection#" + connection.id + ": no waypoints");
	return waypoints;
}
function getWaypointsInsideBounds(waypoints, bounds) {
	var originalWaypoints = map(waypoints, getOriginal);
	return filter(originalWaypoints, function(waypoint) {
		return isInsideBounds(waypoint, bounds);
	});
}
function isInsideBounds(point, bounds) {
	return getOrientation(bounds, point, 1) === "intersect";
}
function getOriginal(point) {
	return point.original || point;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/helper/MoveClosure.js
init_dist();
function MoveClosure() {
	this.allShapes = {};
	this.allConnections = {};
	this.enclosedElements = {};
	this.enclosedConnections = {};
	this.topLevel = {};
}
MoveClosure.prototype.add = function(element, isTopLevel) {
	return this.addAll([element], isTopLevel);
};
MoveClosure.prototype.addAll = function(elements, isTopLevel) {
	var newClosure = getClosure(elements, !!isTopLevel, this);
	assign(this, newClosure);
	return this;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/helper/MoveHelper.js
init_dist();
function MoveHelper(modeling) {
	this._modeling = modeling;
}
MoveHelper.prototype.moveRecursive = function(elements, delta, newParent) {
	if (!elements) return [];
	else return this.moveClosure(this.getClosure(elements), delta, newParent);
};
MoveHelper.prototype.moveClosure = function(closure, delta, newParent, newHost, primaryShape) {
	var modeling = this._modeling;
	var allShapes = closure.allShapes, allConnections = closure.allConnections, enclosedConnections = closure.enclosedConnections, topLevel = closure.topLevel, keepParent = false;
	if (primaryShape && primaryShape.parent === newParent) keepParent = true;
	forEach(allShapes, function(shape) {
		modeling.moveShape(shape, delta, topLevel[shape.id] && !keepParent && newParent, {
			recurse: false,
			layout: false
		});
	});
	forEach(allConnections, function(c) {
		var sourceMoved = !!allShapes[c.source.id], targetMoved = !!allShapes[c.target.id];
		if (enclosedConnections[c.id] && sourceMoved && targetMoved) modeling.moveConnection(c, delta, topLevel[c.id] && !keepParent && newParent);
		else modeling.layoutConnection(c, {
			connectionStart: sourceMoved && getMovedSourceAnchor(c, c.source, delta),
			connectionEnd: targetMoved && getMovedTargetAnchor(c, c.target, delta)
		});
	});
};
MoveHelper.prototype.getClosure = function(elements) {
	return new MoveClosure().addAll(elements, true);
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/MoveElementsHandler.js
function MoveElementsHandler(modeling) {
	this._helper = new MoveHelper(modeling);
}
MoveElementsHandler.$inject = ["modeling"];
MoveElementsHandler.prototype.preExecute = function(context) {
	context.closure = this._helper.getClosure(context.shapes);
};
MoveElementsHandler.prototype.postExecute = function(context) {
	var hints = context.hints, primaryShape;
	if (hints && hints.primaryShape) {
		primaryShape = hints.primaryShape;
		hints.oldParent = primaryShape.parent;
	}
	this._helper.moveClosure(context.closure, context.delta, context.newParent, context.newHost, primaryShape);
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/MoveShapeHandler.js
init_dist();
function MoveShapeHandler(modeling) {
	this._modeling = modeling;
	this._helper = new MoveHelper(modeling);
}
MoveShapeHandler.$inject = ["modeling"];
MoveShapeHandler.prototype.execute = function(context) {
	var shape = context.shape, delta = context.delta, newParent = context.newParent || shape.parent, newParentIndex = context.newParentIndex, oldParent = shape.parent;
	context.oldBounds = pick(shape, [
		"x",
		"y",
		"width",
		"height"
	]);
	context.oldParent = oldParent;
	context.oldParentIndex = remove$2(oldParent.children, shape);
	add(newParent.children, shape, newParentIndex);
	assign(shape, {
		parent: newParent,
		x: shape.x + delta.x,
		y: shape.y + delta.y
	});
	return shape;
};
MoveShapeHandler.prototype.postExecute = function(context) {
	var shape = context.shape, delta = context.delta, hints = context.hints;
	var modeling = this._modeling;
	if (hints.layout !== false) {
		forEach(shape.incoming, function(c) {
			modeling.layoutConnection(c, { connectionEnd: getMovedTargetAnchor(c, shape, delta) });
		});
		forEach(shape.outgoing, function(c) {
			modeling.layoutConnection(c, { connectionStart: getMovedSourceAnchor(c, shape, delta) });
		});
	}
	if (hints.recurse !== false) this.moveChildren(context);
};
MoveShapeHandler.prototype.revert = function(context) {
	var shape = context.shape, oldParent = context.oldParent, oldParentIndex = context.oldParentIndex, delta = context.delta;
	add(oldParent.children, shape, oldParentIndex);
	assign(shape, {
		parent: oldParent,
		x: shape.x - delta.x,
		y: shape.y - delta.y
	});
	return shape;
};
MoveShapeHandler.prototype.moveChildren = function(context) {
	var delta = context.delta, shape = context.shape;
	this._helper.moveRecursive(shape.children, delta, null);
};
MoveShapeHandler.prototype.getNewParent = function(context) {
	return context.newParent || context.shape.parent;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/ReconnectConnectionHandler.js
init_dist();
function ReconnectConnectionHandler(modeling) {
	this._modeling = modeling;
}
ReconnectConnectionHandler.$inject = ["modeling"];
ReconnectConnectionHandler.prototype.execute = function(context) {
	var newSource = context.newSource, newTarget = context.newTarget, connection = context.connection, dockingOrPoints = context.dockingOrPoints;
	if (!newSource && !newTarget) throw new Error("newSource or newTarget required");
	if (isArray(dockingOrPoints)) {
		context.oldWaypoints = connection.waypoints;
		connection.waypoints = dockingOrPoints;
	}
	if (newSource) {
		context.oldSource = connection.source;
		connection.source = newSource;
	}
	if (newTarget) {
		context.oldTarget = connection.target;
		connection.target = newTarget;
	}
	return connection;
};
ReconnectConnectionHandler.prototype.postExecute = function(context) {
	var connection = context.connection, newSource = context.newSource, newTarget = context.newTarget, dockingOrPoints = context.dockingOrPoints, hints = context.hints || {};
	var layoutConnectionHints = {};
	if (hints.connectionStart) layoutConnectionHints.connectionStart = hints.connectionStart;
	if (hints.connectionEnd) layoutConnectionHints.connectionEnd = hints.connectionEnd;
	if (hints.layoutConnection === false) return;
	if (newSource && (!newTarget || hints.docking === "source")) layoutConnectionHints.connectionStart = layoutConnectionHints.connectionStart || getDocking(isArray(dockingOrPoints) ? dockingOrPoints[0] : dockingOrPoints);
	if (newTarget && (!newSource || hints.docking === "target")) layoutConnectionHints.connectionEnd = layoutConnectionHints.connectionEnd || getDocking(isArray(dockingOrPoints) ? dockingOrPoints[dockingOrPoints.length - 1] : dockingOrPoints);
	if (hints.newWaypoints) layoutConnectionHints.waypoints = hints.newWaypoints;
	this._modeling.layoutConnection(connection, layoutConnectionHints);
};
ReconnectConnectionHandler.prototype.revert = function(context) {
	var oldSource = context.oldSource, oldTarget = context.oldTarget, oldWaypoints = context.oldWaypoints, connection = context.connection;
	if (oldSource) connection.source = oldSource;
	if (oldTarget) connection.target = oldTarget;
	if (oldWaypoints) connection.waypoints = oldWaypoints;
	return connection;
};
function getDocking(point) {
	return point.original || point;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/ReplaceShapeHandler.js
init_dist();
function ReplaceShapeHandler(modeling, rules) {
	this._modeling = modeling;
	this._rules = rules;
}
ReplaceShapeHandler.$inject = ["modeling", "rules"];
ReplaceShapeHandler.prototype.preExecute = function(context) {
	var self = this, modeling = this._modeling, rules = this._rules;
	var oldShape = context.oldShape, newData = context.newData, hints = context.hints || {}, newShape;
	function canReconnect(source, target, connection) {
		return rules.allowed("connection.reconnect", {
			connection,
			source,
			target
		});
	}
	var position = {
		x: newData.x,
		y: newData.y
	};
	var oldBounds = {
		x: oldShape.x,
		y: oldShape.y,
		width: oldShape.width,
		height: oldShape.height
	};
	newShape = context.newShape = context.newShape || self.createShape(newData, position, oldShape.parent, hints);
	if (oldShape.host) modeling.updateAttachment(newShape, oldShape.host);
	var children;
	if (hints.moveChildren !== false) {
		children = oldShape.children.slice();
		modeling.moveElements(children, {
			x: 0,
			y: 0
		}, newShape, hints);
	}
	var incoming = oldShape.incoming.slice(), outgoing = oldShape.outgoing.slice();
	forEach(incoming, function(connection) {
		var source = connection.source;
		if (canReconnect(source, newShape, connection)) self.reconnectEnd(connection, newShape, getResizedTargetAnchor(connection, newShape, oldBounds), hints);
	});
	forEach(outgoing, function(connection) {
		var target = connection.target;
		if (canReconnect(newShape, target, connection)) self.reconnectStart(connection, newShape, getResizedSourceAnchor(connection, newShape, oldBounds), hints);
	});
};
ReplaceShapeHandler.prototype.postExecute = function(context) {
	var oldShape = context.oldShape;
	this._modeling.removeShape(oldShape);
};
ReplaceShapeHandler.prototype.execute = function(context) {};
ReplaceShapeHandler.prototype.revert = function(context) {};
ReplaceShapeHandler.prototype.createShape = function(shape, position, target, hints) {
	return this._modeling.createShape(shape, position, target, hints);
};
ReplaceShapeHandler.prototype.reconnectStart = function(connection, newSource, dockingPoint, hints) {
	this._modeling.reconnectStart(connection, newSource, dockingPoint, hints);
};
ReplaceShapeHandler.prototype.reconnectEnd = function(connection, newTarget, dockingPoint, hints) {
	this._modeling.reconnectEnd(connection, newTarget, dockingPoint, hints);
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/ResizeShapeHandler.js
init_dist();
function ResizeShapeHandler(modeling) {
	this._modeling = modeling;
}
ResizeShapeHandler.$inject = ["modeling"];
ResizeShapeHandler.prototype.execute = function(context) {
	var shape = context.shape, newBounds = context.newBounds, minBounds = context.minBounds;
	if (newBounds.x === void 0 || newBounds.y === void 0 || newBounds.width === void 0 || newBounds.height === void 0) throw new Error("newBounds must have {x, y, width, height} properties");
	if (minBounds && (newBounds.width < minBounds.width || newBounds.height < minBounds.height)) throw new Error("width and height cannot be less than minimum height and width");
	else if (!minBounds && newBounds.width < 10 || newBounds.height < 10) throw new Error("width and height cannot be less than 10px");
	context.oldBounds = {
		width: shape.width,
		height: shape.height,
		x: shape.x,
		y: shape.y
	};
	assign(shape, {
		width: newBounds.width,
		height: newBounds.height,
		x: newBounds.x,
		y: newBounds.y
	});
	return shape;
};
ResizeShapeHandler.prototype.postExecute = function(context) {
	var modeling = this._modeling;
	var shape = context.shape, oldBounds = context.oldBounds;
	if ((context.hints || {}).layout === false) return;
	forEach(shape.incoming, function(c) {
		modeling.layoutConnection(c, { connectionEnd: getResizedTargetAnchor(c, shape, oldBounds) });
	});
	forEach(shape.outgoing, function(c) {
		modeling.layoutConnection(c, { connectionStart: getResizedSourceAnchor(c, shape, oldBounds) });
	});
};
ResizeShapeHandler.prototype.revert = function(context) {
	var shape = context.shape, oldBounds = context.oldBounds;
	assign(shape, {
		width: oldBounds.width,
		height: oldBounds.height,
		x: oldBounds.x,
		y: oldBounds.y
	});
	return shape;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/space-tool/SpaceUtil.js
init_dist();
function getDirection(axis, delta) {
	if (axis === "x") {
		if (delta > 0) return "e";
		if (delta < 0) return "w";
	}
	if (axis === "y") {
		if (delta > 0) return "s";
		if (delta < 0) return "n";
	}
	return null;
}
function getWaypointsUpdatingConnections(movingShapes, resizingShapes) {
	var waypointsUpdatingConnections = [];
	var adjustedShapes = new Set(movingShapes);
	forEach(resizingShapes, function(shape) {
		adjustedShapes.add(shape);
	});
	var seenConnections = new Set();
	adjustedShapes.forEach(function(shape) {
		var incoming = shape.incoming, outgoing = shape.outgoing;
		forEach(incoming.concat(outgoing), function(connection) {
			var source = connection.source, target = connection.target;
			if (adjustedShapes.has(source) || adjustedShapes.has(target)) {
				if (!seenConnections.has(connection)) {
					seenConnections.add(connection);
					waypointsUpdatingConnections.push(connection);
				}
			}
		});
	});
	return waypointsUpdatingConnections;
}
function resizeBounds$1(bounds, direction, delta) {
	var x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height, dx = delta.x, dy = delta.y;
	switch (direction) {
		case "n": return {
			x,
			y: y + dy,
			width,
			height: height - dy
		};
		case "s": return {
			x,
			y,
			width,
			height: height + dy
		};
		case "w": return {
			x: x + dx,
			y,
			width: width - dx,
			height
		};
		case "e": return {
			x,
			y,
			width: width + dx,
			height
		};
		default: throw new Error("unknown direction: " + direction);
	}
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/SpaceToolHandler.js
init_dist();
function SpaceToolHandler(modeling) {
	this._modeling = modeling;
}
SpaceToolHandler.$inject = ["modeling"];
SpaceToolHandler.prototype.preExecute = function(context) {
	var delta = context.delta, direction = context.direction, movingShapes = context.movingShapes, resizingShapes = context.resizingShapes, start = context.start, oldBounds = {};
	this.moveShapes(movingShapes, delta);
	forEach(resizingShapes, function(shape) {
		oldBounds[shape.id] = getBounds(shape);
	});
	this.resizeShapes(resizingShapes, delta, direction);
	this.updateConnectionWaypoints(getWaypointsUpdatingConnections(movingShapes, resizingShapes), delta, direction, start, movingShapes, resizingShapes, oldBounds);
};
SpaceToolHandler.prototype.execute = function() {};
SpaceToolHandler.prototype.revert = function() {};
SpaceToolHandler.prototype.moveShapes = function(shapes, delta) {
	var self = this;
	forEach(shapes, function(element) {
		self._modeling.moveShape(element, delta, null, {
			autoResize: false,
			layout: false,
			recurse: false
		});
	});
};
SpaceToolHandler.prototype.resizeShapes = function(shapes, delta, direction) {
	var self = this;
	forEach(shapes, function(shape) {
		var newBounds = resizeBounds$1(shape, direction, delta);
		self._modeling.resizeShape(shape, newBounds, null, {
			attachSupport: false,
			autoResize: false,
			layout: false
		});
	});
};
SpaceToolHandler.prototype.updateConnectionWaypoints = function(connections, delta, direction, start, movingShapes, resizingShapes, oldBounds) {
	var self = this, movingShapesSet = new Set(movingShapes), resizingShapesSet = new Set(resizingShapes);
	forEach(connections, function(connection) {
		var source = connection.source, target = connection.target, waypoints = copyWaypoints(connection), axis = getAxisFromDirection(direction), layoutHints = {};
		var sourceAffected = movingShapesSet.has(source) || resizingShapesSet.has(source), targetAffected = movingShapesSet.has(target) || resizingShapesSet.has(target);
		if (sourceAffected && targetAffected) {
			waypoints = map(waypoints, function(waypoint) {
				if (shouldMoveWaypoint(waypoint, start, direction)) waypoint[axis] = waypoint[axis] + delta[axis];
				if (waypoint.original && shouldMoveWaypoint(waypoint.original, start, direction)) waypoint.original[axis] = waypoint.original[axis] + delta[axis];
				return waypoint;
			});
			self._modeling.updateWaypoints(connection, waypoints, { labelBehavior: false });
		} else if (sourceAffected || targetAffected) {
			if (movingShapesSet.has(source)) layoutHints.connectionStart = getMovedSourceAnchor(connection, source, delta);
			else if (movingShapesSet.has(target)) layoutHints.connectionEnd = getMovedTargetAnchor(connection, target, delta);
			else if (resizingShapesSet.has(source)) layoutHints.connectionStart = getResizedSourceAnchor(connection, source, oldBounds[source.id]);
			else if (resizingShapesSet.has(target)) layoutHints.connectionEnd = getResizedTargetAnchor(connection, target, oldBounds[target.id]);
			self._modeling.layoutConnection(connection, layoutHints);
		}
	});
};
function copyWaypoint(waypoint) {
	return assign({}, waypoint);
}
function copyWaypoints(connection) {
	return map(connection.waypoints, function(waypoint) {
		waypoint = copyWaypoint(waypoint);
		if (waypoint.original) waypoint.original = copyWaypoint(waypoint.original);
		return waypoint;
	});
}
function getAxisFromDirection(direction) {
	switch (direction) {
		case "n": return "y";
		case "w": return "x";
		case "s": return "y";
		case "e": return "x";
	}
}
function shouldMoveWaypoint(waypoint, start, direction) {
	var relevantAxis = getAxisFromDirection(direction);
	if (/e|s/.test(direction)) return waypoint[relevantAxis] > start;
	else if (/n|w/.test(direction)) return waypoint[relevantAxis] < start;
}
function getBounds(shape) {
	return {
		x: shape.x,
		y: shape.y,
		height: shape.height,
		width: shape.width
	};
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/ToggleShapeCollapseHandler.js
init_dist();
function ToggleShapeCollapseHandler(modeling) {
	this._modeling = modeling;
}
ToggleShapeCollapseHandler.$inject = ["modeling"];
ToggleShapeCollapseHandler.prototype.execute = function(context) {
	var shape = context.shape, children = shape.children;
	context.oldChildrenVisibility = getElementsVisibilityRecursive(children);
	shape.collapsed = !shape.collapsed;
	var result = setHiddenRecursive(children, shape.collapsed);
	return [shape].concat(result);
};
ToggleShapeCollapseHandler.prototype.revert = function(context) {
	var shape = context.shape, oldChildrenVisibility = context.oldChildrenVisibility;
	var children = shape.children;
	var result = restoreVisibilityRecursive(children, oldChildrenVisibility);
	shape.collapsed = !shape.collapsed;
	return [shape].concat(result);
};
function getElementsVisibilityRecursive(elements) {
	var result = {};
	forEach(elements, function(element) {
		result[element.id] = element.hidden;
		if (element.children) result = assign({}, result, getElementsVisibilityRecursive(element.children));
	});
	return result;
}
function setHiddenRecursive(elements, newHidden) {
	var result = [];
	forEach(elements, function(element) {
		element.hidden = newHidden;
		result = result.concat(element);
		if (element.children) result = result.concat(setHiddenRecursive(element.children, element.collapsed || newHidden));
	});
	return result;
}
function restoreVisibilityRecursive(elements, lastState) {
	var result = [];
	forEach(elements, function(element) {
		element.hidden = lastState[element.id];
		result = result.concat(element);
		if (element.children) result = result.concat(restoreVisibilityRecursive(element.children, lastState));
	});
	return result;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/UpdateAttachmentHandler.js
function UpdateAttachmentHandler(modeling) {
	this._modeling = modeling;
}
UpdateAttachmentHandler.$inject = ["modeling"];
UpdateAttachmentHandler.prototype.execute = function(context) {
	var shape = context.shape, newHost = context.newHost, oldHost = shape.host;
	context.oldHost = oldHost;
	context.attacherIdx = removeAttacher(oldHost, shape);
	addAttacher(newHost, shape);
	shape.host = newHost;
	return shape;
};
UpdateAttachmentHandler.prototype.revert = function(context) {
	var shape = context.shape, newHost = context.newHost, oldHost = context.oldHost, attacherIdx = context.attacherIdx;
	shape.host = oldHost;
	removeAttacher(newHost, shape);
	addAttacher(oldHost, shape, attacherIdx);
	return shape;
};
function removeAttacher(host, attacher) {
	return remove$2(host && host.attachers, attacher);
}
function addAttacher(host, attacher, idx) {
	if (!host) return;
	var attachers = host.attachers;
	if (!attachers) host.attachers = attachers = [];
	add(attachers, attacher, idx);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/cmd/UpdateWaypointsHandler.js
function UpdateWaypointsHandler() {}
UpdateWaypointsHandler.prototype.execute = function(context) {
	var connection = context.connection, newWaypoints = context.newWaypoints;
	context.oldWaypoints = connection.waypoints;
	connection.waypoints = newWaypoints;
	return connection;
};
UpdateWaypointsHandler.prototype.revert = function(context) {
	var connection = context.connection;
	connection.waypoints = context.oldWaypoints;
	return connection;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/modeling/Modeling.js
init_dist();
function Modeling(eventBus, elementFactory, commandStack) {
	this._eventBus = eventBus;
	this._elementFactory = elementFactory;
	this._commandStack = commandStack;
	var self = this;
	eventBus.on("diagram.init", function() {
		self.registerHandlers(commandStack);
	});
}
Modeling.$inject = [
	"eventBus",
	"elementFactory",
	"commandStack"
];
Modeling.prototype.getHandlers = function() {
	return {
		"shape.append": AppendShapeHandler,
		"shape.create": CreateShapeHandler,
		"shape.delete": DeleteShapeHandler,
		"shape.move": MoveShapeHandler,
		"shape.resize": ResizeShapeHandler,
		"shape.replace": ReplaceShapeHandler,
		"shape.toggleCollapse": ToggleShapeCollapseHandler,
		"spaceTool": SpaceToolHandler,
		"label.create": CreateLabelHandler,
		"connection.create": CreateConnectionHandler,
		"connection.delete": DeleteConnectionHandler,
		"connection.move": MoveConnectionHandler,
		"connection.layout": LayoutConnectionHandler,
		"connection.updateWaypoints": UpdateWaypointsHandler,
		"connection.reconnect": ReconnectConnectionHandler,
		"elements.create": CreateElementsHandler,
		"elements.move": MoveElementsHandler,
		"elements.delete": DeleteElementsHandler,
		"elements.distribute": DistributeElements,
		"elements.align": AlignElements,
		"element.updateAttachment": UpdateAttachmentHandler
	};
};
Modeling.prototype.registerHandlers = function(commandStack) {
	forEach(this.getHandlers(), function(handler, id) {
		commandStack.registerHandler(id, handler);
	});
};
Modeling.prototype.moveShape = function(shape, delta, newParent, newParentIndex, hints) {
	if (typeof newParentIndex === "object") {
		hints = newParentIndex;
		newParentIndex = null;
	}
	var context = {
		shape,
		delta,
		newParent,
		newParentIndex,
		hints: hints || {}
	};
	this._commandStack.execute("shape.move", context);
};
Modeling.prototype.updateAttachment = function(shape, newHost) {
	var context = {
		shape,
		newHost
	};
	this._commandStack.execute("element.updateAttachment", context);
};
Modeling.prototype.moveElements = function(shapes, delta, target, hints) {
	hints = hints || {};
	var attach = hints.attach;
	var newParent = target, newHost;
	if (attach === true) {
		newHost = target;
		newParent = target.parent;
	} else if (attach === false) newHost = null;
	var context = {
		shapes,
		delta,
		newParent,
		newHost,
		hints
	};
	this._commandStack.execute("elements.move", context);
};
Modeling.prototype.moveConnection = function(connection, delta, newParent, newParentIndex, hints) {
	if (typeof newParentIndex === "object") {
		hints = newParentIndex;
		newParentIndex = void 0;
	}
	var context = {
		connection,
		delta,
		newParent,
		newParentIndex,
		hints: hints || {}
	};
	this._commandStack.execute("connection.move", context);
};
Modeling.prototype.layoutConnection = function(connection, hints) {
	var context = {
		connection,
		hints: hints || {}
	};
	this._commandStack.execute("connection.layout", context);
};
Modeling.prototype.createConnection = function(source, target, parentIndex, connection, parent, hints) {
	if (typeof parentIndex === "object") {
		hints = parent;
		parent = connection;
		connection = parentIndex;
		parentIndex = void 0;
	}
	connection = this._create("connection", connection);
	var context = {
		source,
		target,
		parent,
		parentIndex,
		connection,
		hints
	};
	this._commandStack.execute("connection.create", context);
	return context.connection;
};
Modeling.prototype.createShape = function(shape, position, target, parentIndex, hints) {
	if (typeof parentIndex !== "number") {
		hints = parentIndex;
		parentIndex = void 0;
	}
	hints = hints || {};
	var attach = hints.attach, parent, host;
	shape = this._create("shape", shape);
	if (attach) {
		parent = target.parent;
		host = target;
	} else parent = target;
	var context = {
		position,
		shape,
		parent,
		parentIndex,
		host,
		hints
	};
	this._commandStack.execute("shape.create", context);
	return context.shape;
};
Modeling.prototype.createElements = function(elements, position, parent, parentIndex, hints) {
	if (!isArray(elements)) elements = [elements];
	if (typeof parentIndex !== "number") {
		hints = parentIndex;
		parentIndex = void 0;
	}
	hints = hints || {};
	var context = {
		position,
		elements,
		parent,
		parentIndex,
		hints
	};
	this._commandStack.execute("elements.create", context);
	return context.elements;
};
Modeling.prototype.createLabel = function(labelTarget, position, label, parent) {
	label = this._create("label", label);
	var context = {
		labelTarget,
		position,
		parent: parent || labelTarget.parent,
		shape: label
	};
	this._commandStack.execute("label.create", context);
	return context.shape;
};
Modeling.prototype.appendShape = function(source, shape, position, target, hints) {
	hints = hints || {};
	shape = this._create("shape", shape);
	var context = {
		source,
		position,
		target,
		shape,
		connection: hints.connection,
		connectionParent: hints.connectionParent,
		hints
	};
	this._commandStack.execute("shape.append", context);
	return context.shape;
};
Modeling.prototype.removeElements = function(elements) {
	var context = { elements };
	this._commandStack.execute("elements.delete", context);
};
Modeling.prototype.distributeElements = function(groups, axis, dimension) {
	var context = {
		groups,
		axis,
		dimension
	};
	this._commandStack.execute("elements.distribute", context);
};
Modeling.prototype.removeShape = function(shape, hints) {
	var context = {
		shape,
		hints: hints || {}
	};
	this._commandStack.execute("shape.delete", context);
};
Modeling.prototype.removeConnection = function(connection, hints) {
	var context = {
		connection,
		hints: hints || {}
	};
	this._commandStack.execute("connection.delete", context);
};
Modeling.prototype.replaceShape = function(oldShape, newShape, hints) {
	var context = {
		oldShape,
		newData: newShape,
		hints: hints || {}
	};
	this._commandStack.execute("shape.replace", context);
	return context.newShape;
};
Modeling.prototype.alignElements = function(elements, alignment) {
	var context = {
		elements,
		alignment
	};
	this._commandStack.execute("elements.align", context);
};
Modeling.prototype.resizeShape = function(shape, newBounds, minBounds, hints) {
	var context = {
		shape,
		newBounds,
		minBounds,
		hints
	};
	this._commandStack.execute("shape.resize", context);
};
Modeling.prototype.createSpace = function(movingShapes, resizingShapes, delta, direction, start) {
	var context = {
		delta,
		direction,
		movingShapes,
		resizingShapes,
		start
	};
	this._commandStack.execute("spaceTool", context);
};
Modeling.prototype.updateWaypoints = function(connection, newWaypoints, hints) {
	var context = {
		connection,
		newWaypoints,
		hints: hints || {}
	};
	this._commandStack.execute("connection.updateWaypoints", context);
};
Modeling.prototype.reconnect = function(connection, source, target, dockingOrPoints, hints) {
	var context = {
		connection,
		newSource: source,
		newTarget: target,
		dockingOrPoints,
		hints: hints || {}
	};
	this._commandStack.execute("connection.reconnect", context);
};
Modeling.prototype.reconnectStart = function(connection, newSource, dockingOrPoints, hints) {
	if (!hints) hints = {};
	this.reconnect(connection, newSource, connection.target, dockingOrPoints, assign(hints, { docking: "source" }));
};
Modeling.prototype.reconnectEnd = function(connection, newTarget, dockingOrPoints, hints) {
	if (!hints) hints = {};
	this.reconnect(connection, connection.source, newTarget, dockingOrPoints, assign(hints, { docking: "target" }));
};
Modeling.prototype.connect = function(source, target, attrs, hints) {
	return this.createConnection(source, target, attrs || {}, source.parent, hints);
};
Modeling.prototype._create = function(type, attrs) {
	if (isModelElement(attrs)) return attrs;
	else return this._elementFactory.create(type, attrs);
};
Modeling.prototype.toggleCollapse = function(shape, hints) {
	var context = {
		shape,
		hints: hints || {}
	};
	this._commandStack.execute("shape.toggleCollapse", context);
};
//#endregion
//#region ../../node_modules/diagram-js/lib/layout/BaseLayouter.js
function BaseLayouter() {}
BaseLayouter.prototype.layoutConnection = function(connection, hints) {
	hints = hints || {};
	return [hints.connectionStart || getMid(hints.source || connection.source), hints.connectionEnd || getMid(hints.target || connection.target)];
};
//#endregion
//#region ../../node_modules/diagram-js/lib/layout/CroppingConnectionDocking.js
init_dist();
function dockingToPoint(docking) {
	return assign({ original: docking.point.original || docking.point }, docking.actual);
}
function CroppingConnectionDocking(elementRegistry, graphicsFactory) {
	this._elementRegistry = elementRegistry;
	this._graphicsFactory = graphicsFactory;
}
CroppingConnectionDocking.$inject = ["elementRegistry", "graphicsFactory"];
CroppingConnectionDocking.prototype.getCroppedWaypoints = function(connection, source, target) {
	source = source || connection.source;
	target = target || connection.target;
	var sourceDocking = this.getDockingPoint(connection, source, true), targetDocking = this.getDockingPoint(connection, target);
	var croppedWaypoints = connection.waypoints.slice(sourceDocking.idx + 1, targetDocking.idx);
	croppedWaypoints.unshift(dockingToPoint(sourceDocking));
	croppedWaypoints.push(dockingToPoint(targetDocking));
	return croppedWaypoints;
};
CroppingConnectionDocking.prototype.getDockingPoint = function(connection, shape, dockStart) {
	var waypoints = connection.waypoints, dockingIdx = dockStart ? 0 : waypoints.length - 1, dockingPoint = waypoints[dockingIdx];
	return {
		point: dockingPoint,
		actual: this._getIntersection(shape, connection, dockStart) || dockingPoint,
		idx: dockingIdx
	};
};
CroppingConnectionDocking.prototype._getIntersection = function(shape, connection, takeFirst) {
	var shapePath = this._getShapePath(shape), connectionPath = this._getConnectionPath(connection);
	return getElementLineIntersection(shapePath, connectionPath, takeFirst);
};
CroppingConnectionDocking.prototype._getConnectionPath = function(connection) {
	return this._graphicsFactory.getConnectionPath(connection);
};
CroppingConnectionDocking.prototype._getShapePath = function(shape) {
	return this._graphicsFactory.getShapePath(shape);
};
CroppingConnectionDocking.prototype._getGfx = function(element) {
	return this._elementRegistry.getGraphics(element);
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/move/Move.js
init_dist();
var LOW_PRIORITY$3 = 500;
var MEDIUM_PRIORITY = 1250;
var HIGH_PRIORITY$1 = 1500;
var round = Math.round;
function mid(element) {
	return {
		x: element.x + round(element.width / 2),
		y: element.y + round(element.height / 2)
	};
}
function MoveEvents(eventBus, dragging, modeling, selection, rules) {
	function canMove(shapes, delta, position, target) {
		return rules.allowed("elements.move", {
			shapes,
			delta,
			position,
			target
		});
	}
	eventBus.on("shape.move.start", HIGH_PRIORITY$1, function(event) {
		var context = event.context, shape = event.shape, shapes = selection.get().slice();
		if (shapes.indexOf(shape) === -1) shapes = [shape];
		shapes = removeNested(shapes);
		assign(context, {
			shapes,
			validatedShapes: shapes,
			shape
		});
	});
	eventBus.on("shape.move.start", MEDIUM_PRIORITY, function(event) {
		var context = event.context, validatedShapes = context.validatedShapes;
		if (!(context.canExecute = canMove(validatedShapes))) return false;
	});
	eventBus.on("shape.move.move", LOW_PRIORITY$3, function(event) {
		var context = event.context, validatedShapes = context.validatedShapes, hover = event.hover, delta = {
			x: event.dx,
			y: event.dy
		}, canExecute = canMove(validatedShapes, delta, {
			x: event.x,
			y: event.y
		}, hover);
		context.delta = delta;
		context.canExecute = canExecute;
		if (canExecute === null) {
			context.target = null;
			return;
		}
		context.target = hover;
	});
	eventBus.on("shape.move.end", function(event) {
		var context = event.context;
		var delta = context.delta, canExecute = context.canExecute, isAttach = canExecute === "attach", shapes = context.shapes;
		if (canExecute === false) return false;
		delta.x = round(delta.x);
		delta.y = round(delta.y);
		if (delta.x === 0 && delta.y === 0) return;
		modeling.moveElements(shapes, delta, context.target, {
			primaryShape: context.shape,
			attach: isAttach
		});
	});
	eventBus.on("element.mousedown", function(event) {
		if (!isPrimaryButton(event)) return;
		var originalEvent = getOriginal$1(event);
		if (!originalEvent) throw new Error("must supply DOM mousedown event");
		return start(originalEvent, event.element);
	});
	function start(event, element, activate, context) {
		if (isObject(activate)) {
			context = activate;
			activate = false;
		}
		if (element.waypoints || !element.parent) return;
		if (classes$1(event.target).has("djs-hit-no-move")) return;
		var referencePoint = mid(element);
		if (dragging.init(event, referencePoint, "shape.move", {
			cursor: "grabbing",
			autoActivate: activate,
			data: {
				shape: element,
				context: context || {}
			}
		}) !== false) return true;
	}
	this.start = start;
}
MoveEvents.$inject = [
	"eventBus",
	"dragging",
	"modeling",
	"selection",
	"rules"
];
function removeNested(elements) {
	var ids = groupBy(elements, "id");
	return filter(elements, function(element) {
		while (element = element.parent) if (ids[element.id]) return false;
		return true;
	});
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/move/MovePreview.js
init_dist();
var LOW_PRIORITY$2 = 499;
var MARKER_DRAGGING = "djs-dragging";
var MARKER_OK = "drop-ok";
var MARKER_NOT_OK = "drop-not-ok";
var MARKER_NEW_PARENT = "new-parent";
var MARKER_ATTACH = "attach-ok";
function MovePreview(eventBus, canvas, styles, previewSupport) {
	function getVisualDragShapes(shapes) {
		return removeEdges(getAllDraggedElements(shapes));
	}
	function getAllDraggedElements(shapes) {
		var allShapes = selfAndAllChildren(shapes);
		var allConnections = allShapes.flatMap((shape) => (shape.incoming || []).concat(shape.outgoing || []));
		var allElements = allShapes.concat(allConnections);
		return [...new Set(allElements)];
	}
	function setMarker(element, marker) {
		[
			MARKER_ATTACH,
			MARKER_OK,
			MARKER_NOT_OK,
			MARKER_NEW_PARENT
		].forEach(function(m) {
			if (m === marker) canvas.addMarker(element, m);
			else canvas.removeMarker(element, m);
		});
	}
	function makeDraggable(context, element, addMarker) {
		previewSupport.addDragger(element, context.dragGroup);
		if (addMarker) canvas.addMarker(element, MARKER_DRAGGING);
		if (context.allDraggedElements) context.allDraggedElements.push(element);
		else context.allDraggedElements = [element];
	}
	eventBus.on("shape.move.start", LOW_PRIORITY$2, function(event) {
		var context = event.context, dragShapes = context.shapes, allDraggedElements = context.allDraggedElements;
		var visuallyDraggedShapes = getVisualDragShapes(dragShapes);
		if (!context.dragGroup) {
			var dragGroup = create("g");
			attr$1(dragGroup, styles.cls("djs-drag-group", ["no-events"]));
			var activeLayer = canvas.getActiveLayer();
			append(activeLayer, dragGroup);
			context.dragGroup = dragGroup;
		}
		visuallyDraggedShapes.forEach(function(shape) {
			previewSupport.addDragger(shape, context.dragGroup);
		});
		if (!allDraggedElements) allDraggedElements = getAllDraggedElements(dragShapes);
		else allDraggedElements = flatten([allDraggedElements, getAllDraggedElements(dragShapes)]);
		forEach(allDraggedElements, function(e) {
			canvas.addMarker(e, MARKER_DRAGGING);
		});
		context.allDraggedElements = allDraggedElements;
		context.differentParents = haveDifferentParents(dragShapes);
	});
	eventBus.on("shape.move.move", LOW_PRIORITY$2, function(event) {
		var context = event.context, dragGroup = context.dragGroup, target = context.target, parent = context.shape.parent, canExecute = context.canExecute;
		if (target) {
			if (canExecute === "attach") setMarker(target, MARKER_ATTACH);
			else if (context.canExecute && parent && target.id !== parent.id) setMarker(target, MARKER_NEW_PARENT);
			else setMarker(target, context.canExecute ? MARKER_OK : MARKER_NOT_OK);
		}
		translate(dragGroup, event.dx, event.dy);
	});
	eventBus.on(["shape.move.out", "shape.move.cleanup"], function(event) {
		var target = event.context.target;
		if (target) setMarker(target, null);
	});
	eventBus.on("shape.move.cleanup", function(event) {
		var context = event.context, allDraggedElements = context.allDraggedElements, dragGroup = context.dragGroup;
		forEach(allDraggedElements, function(e) {
			canvas.removeMarker(e, MARKER_DRAGGING);
		});
		if (dragGroup) remove(dragGroup);
	});
	this.makeDraggable = makeDraggable;
}
MovePreview.$inject = [
	"eventBus",
	"canvas",
	"styles",
	"previewSupport"
];
function removeEdges(elements) {
	var elementIds = new Set();
	elements.forEach(function(element) {
		elementIds.add(element.id);
	});
	return filter(elements, function(element) {
		if (!isConnection(element)) return true;
		else return elementIds.has(element.source.id) && elementIds.has(element.target.id);
	});
}
function haveDifferentParents(elements) {
	return size(groupBy(elements, function(e) {
		return e.parent && e.parent.id;
	})) !== 1;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/move/index.js
var move_default = {
	__depends__: [
		interaction_events_default,
		selection_default,
		outline_default,
		rules_default,
		dragging_default,
		preview_support_default
	],
	__init__: ["move", "movePreview"],
	move: ["type", MoveEvents],
	movePreview: ["type", MovePreview]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/hover-tooltip/HoverTooltip.js
var SHOW_DELAY = 300;
function HoverTooltip(canvas) {
	this._canvas = canvas;
	this._mount = null;
	this._current = null;
	this._showTimer = null;
}
HoverTooltip.$inject = ["canvas"];
HoverTooltip.prototype.add = function(config) {
	const { container, selector, showDelay = SHOW_DELAY } = config;
	delegate.bind(container, selector, "mouseover", (event) => this._show(event.delegateTarget, config, showDelay));
	delegate.bind(container, selector, "mouseout", (event) => {
		const { delegateTarget, relatedTarget } = event;
		if (relatedTarget && delegateTarget.contains(relatedTarget)) return;
		this._hide();
	});
};
HoverTooltip.prototype._show = function(target, config, showDelay) {
	const content = config.getContent(target);
	if (!content) return;
	this._current = {
		target,
		content,
		getPosition: config.getPosition
	};
	clearTimeout(this._showTimer);
	this._showTimer = setTimeout(() => this._render(), showDelay);
};
HoverTooltip.prototype._hide = function() {
	clearTimeout(this._showTimer);
	this._current = null;
	this._render();
};
HoverTooltip.prototype._render = function() {
	const mount = this._getMount();
	if (!this._current) {
		R(null, mount);
		return;
	}
	const { target, content, getPosition } = this._current;
	const { x, y, placement = "right" } = getPosition(target);
	R(m$1`<div
      class="djs-hover-tooltip djs-hover-tooltip--${placement}"
      style=${{
		left: `${x}px`,
		top: `${y}px`
	}}
    >${content}</div>`, mount);
};
HoverTooltip.prototype._getMount = function() {
	if (!this._mount) {
		this._mount = domify("<div class=\"djs-hover-tooltip-container\"></div>");
		this._canvas.getContainer().appendChild(this._mount);
	}
	return this._mount;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/hover-tooltip/index.js
var hover_tooltip_default = {
	__init__: ["hoverTooltip"],
	hoverTooltip: ["type", HoverTooltip]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/palette/Palette.js
init_dist();
var TOGGLE_SELECTOR = ".djs-palette-toggle";
var ENTRY_SELECTOR = ".entry";
var ELEMENT_SELECTOR = TOGGLE_SELECTOR + ", " + ENTRY_SELECTOR;
var PALETTE_PREFIX = "djs-palette-";
var PALETTE_SHOWN_CLS = "shown";
var PALETTE_OPEN_CLS = "open";
var PALETTE_TWO_COLUMN_CLS = "two-column";
var DEFAULT_PRIORITY = 1e3;
function Palette(eventBus, canvas) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	var self = this;
	eventBus.on("tool-manager.update", function(event) {
		var tool = event.tool;
		self.updateToolHighlight(tool);
	});
	eventBus.on("i18n.changed", function() {
		self._update();
	});
	eventBus.on("diagram.init", function() {
		self._diagramInitialized = true;
		self._rebuild();
	});
}
Palette.$inject = ["eventBus", "canvas"];
Palette.prototype.registerProvider = function(priority, provider) {
	if (!provider) {
		provider = priority;
		priority = DEFAULT_PRIORITY;
	}
	this._eventBus.on("palette.getProviders", priority, function(event) {
		event.providers.push(provider);
	});
	this._rebuild();
};
Palette.prototype.getEntries = function() {
	return this._getProviders().reduce(addPaletteEntries, {});
};
Palette.prototype._rebuild = function() {
	if (!this._diagramInitialized) return;
	if (!this._getProviders().length) return;
	if (!this._container) this._init();
	this._update();
};
Palette.prototype._init = function() {
	var self = this;
	var eventBus = this._eventBus;
	var parentContainer = this._getParentContainer();
	var container = this._container = domify(Palette.HTML_MARKUP);
	parentContainer.appendChild(container);
	classes(parentContainer).add(PALETTE_PREFIX + PALETTE_SHOWN_CLS);
	delegate.bind(container, ELEMENT_SELECTOR, "click", function(event) {
		var target = event.delegateTarget;
		if (matches(target, TOGGLE_SELECTOR)) return self.toggle();
		self.trigger("click", event);
	});
	event.bind(container, "mousedown", function(event) {
		event.stopPropagation();
	});
	delegate.bind(container, ENTRY_SELECTOR, "dragstart", function(event) {
		self.trigger("dragstart", event);
	});
	eventBus.on("canvas.resized", this._layoutChanged, this);
	eventBus.fire("palette.create", { container });
};
Palette.prototype._getProviders = function(id) {
	var event = this._eventBus.createEvent({
		type: "palette.getProviders",
		providers: []
	});
	this._eventBus.fire(event);
	return event.providers;
};
Palette.prototype._toggleState = function(state) {
	state = state || {};
	var parent = this._getParentContainer(), container = this._container;
	var eventBus = this._eventBus;
	var twoColumn;
	var cls = classes(container), parentCls = classes(parent);
	if ("twoColumn" in state) twoColumn = state.twoColumn;
	else twoColumn = this._needsCollapse(parent.clientHeight, this._entries || {});
	cls.toggle(PALETTE_TWO_COLUMN_CLS, twoColumn);
	parentCls.toggle(PALETTE_PREFIX + PALETTE_TWO_COLUMN_CLS, twoColumn);
	if ("open" in state) {
		cls.toggle(PALETTE_OPEN_CLS, state.open);
		parentCls.toggle(PALETTE_PREFIX + PALETTE_OPEN_CLS, state.open);
	}
	eventBus.fire("palette.changed", {
		twoColumn,
		open: this.isOpen()
	});
};
Palette.prototype._update = function() {
	var entriesContainer = query(".djs-palette-entries", this._container), entries = this._entries = this.getEntries();
	clear(entriesContainer);
	forEach(entries, function(entry, id) {
		var grouping = entry.group || "default";
		var container = query("[data-group=" + escapeCSS(grouping) + "]", entriesContainer);
		if (!container) {
			container = domify("<div class=\"group\"></div>");
			attr(container, "data-group", grouping);
			entriesContainer.appendChild(container);
		}
		var html = entry.html || (entry.separator ? "<hr class=\"separator\" />" : "<div class=\"entry\" draggable=\"true\"></div>");
		var control = domify(html);
		container.appendChild(control);
		if (!entry.separator) {
			attr(control, "data-action", id);
			if (entry.title) {
				attr(control, "aria-label", entry.title);
				attr(control, "role", "button");
			}
			if (entry.className) addClasses(control, entry.className);
			if (entry.imageUrl) {
				var image = domify("<img>");
				attr(image, "src", entry.imageUrl);
				control.appendChild(image);
			}
		}
	});
	this.open();
};
Palette.prototype.trigger = function(action, event, autoActivate) {
	var entry, originalEvent, button = event.delegateTarget || event.target;
	if (!button) return event.preventDefault();
	entry = attr(button, "data-action");
	originalEvent = event.originalEvent || event;
	return this.triggerEntry(entry, action, originalEvent, autoActivate);
};
Palette.prototype.triggerEntry = function(entryId, action, event, autoActivate) {
	var entry = this._entries[entryId], handler;
	if (!entry) return;
	handler = entry.action;
	if (this._eventBus.fire("palette.trigger", {
		entry,
		event
	}) === false) return;
	if (isFunction(handler)) {
		if (action === "click") return handler(event, autoActivate);
	} else if (handler[action]) return handler[action](event, autoActivate);
	event.preventDefault();
};
Palette.prototype._layoutChanged = function() {
	this._toggleState({});
};
Palette.prototype._needsCollapse = function(availableHeight, entries) {
	return availableHeight < Object.keys(entries).length * 46 + 50;
};
Palette.prototype.close = function() {
	this._toggleState({
		open: false,
		twoColumn: false
	});
};
Palette.prototype.open = function() {
	this._toggleState({ open: true });
};
Palette.prototype.toggle = function() {
	if (this.isOpen()) this.close();
	else this.open();
};
Palette.prototype.isActiveTool = function(tool) {
	return tool && this._activeTool === tool;
};
Palette.prototype.updateToolHighlight = function(name) {
	var entriesContainer, toolsContainer;
	if (!this._toolsContainer) {
		entriesContainer = query(".djs-palette-entries", this._container);
		this._toolsContainer = query("[data-group=tools]", entriesContainer);
	}
	toolsContainer = this._toolsContainer;
	forEach(toolsContainer.children, function(tool) {
		var actionName = tool.getAttribute("data-action");
		if (!actionName) return;
		var toolClasses = classes(tool);
		actionName = actionName.replace("-tool", "");
		if (toolClasses.contains("entry") && actionName === name) toolClasses.add("highlighted-entry");
		else toolClasses.remove("highlighted-entry");
	});
};
Palette.prototype.isOpen = function() {
	return classes(this._container).has(PALETTE_OPEN_CLS);
};
Palette.prototype._getParentContainer = function() {
	return this._canvas.getContainer();
};
Palette.HTML_MARKUP = "<div class=\"djs-palette\"><div class=\"djs-palette-entries\"></div><div class=\"djs-palette-toggle\"></div></div>";
function addClasses(element, classNames) {
	var classes$2 = classes(element);
	(isArray(classNames) ? classNames : classNames.split(/\s+/g)).forEach(function(cls) {
		classes$2.add(cls);
	});
}
function addPaletteEntries(entries, provider) {
	var entriesOrUpdater = provider.getPaletteEntries();
	if (isFunction(entriesOrUpdater)) return entriesOrUpdater(entries);
	forEach(entriesOrUpdater, function(entry, id) {
		entries[id] = entry;
	});
	return entries;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/palette/PaletteTooltipComponent.js
function PaletteTooltipComponent(props) {
	const { title, shortcut } = props;
	return m$1`
    <span class="djs-palette-tooltip-label">${title}</span>
    ${shortcut ? m$1`<kbd class="djs-palette-tooltip-shortcut">${shortcut}</kbd>` : null}
  `;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/palette/PaletteTooltip.js
var PALETTE_ENTRY_SELECTOR = ".djs-palette-entries .entry";
var ENTRY_GAP = 8;
function PaletteTooltip(eventBus, palette, hoverTooltip) {
	this._palette = palette;
	this._hoverTooltip = hoverTooltip;
	this._entries = {};
	eventBus.on("palette.create", (event) => this._init(event.container));
	eventBus.on("palette.changed", () => this._updateEntries());
}
PaletteTooltip.$inject = [
	"eventBus",
	"palette",
	"hoverTooltip"
];
PaletteTooltip.prototype._init = function(container) {
	this._updateEntries();
	this._hoverTooltip.add({
		container,
		selector: PALETTE_ENTRY_SELECTOR,
		getContent: (target) => {
			const entry = this._entries[attr(target, "data-action")];
			if (!entry || !entry.title) return null;
			return m$1`<${PaletteTooltipComponent}
        title=${entry.title}
        shortcut=${entry.shortcut}
      />`;
		},
		getPosition: (target) => {
			const bounds = target.getBoundingClientRect();
			return {
				x: bounds.right + ENTRY_GAP,
				y: bounds.top + bounds.height / 2,
				placement: "right"
			};
		}
	});
};
PaletteTooltip.prototype._updateEntries = function() {
	this._entries = this._palette.getEntries();
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/palette/index.js
var palette_default = {
	__depends__: [hover_tooltip_default],
	__init__: ["palette", "paletteTooltip"],
	palette: ["type", Palette],
	paletteTooltip: ["type", PaletteTooltip]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/tool-manager/ToolManager.js
init_dist();
var LOW_PRIORITY$1 = 250;
function ToolManager(eventBus) {
	this._eventBus = eventBus;
	this._tools = [];
	this._active = null;
}
ToolManager.$inject = ["eventBus"];
ToolManager.prototype.registerTool = function(name, events) {
	var tools = this._tools;
	if (!events) throw new Error("A tool has to be registered with it's \"events\"");
	tools.push(name);
	this.bindEvents(name, events);
};
ToolManager.prototype.isActive = function(tool) {
	return tool && this._active === tool;
};
ToolManager.prototype.length = function(tool) {
	return this._tools.length;
};
ToolManager.prototype.setActive = function(tool) {
	var eventBus = this._eventBus;
	if (this._active !== tool) {
		this._active = tool;
		eventBus.fire("tool-manager.update", { tool });
	}
};
ToolManager.prototype.bindEvents = function(name, events) {
	var eventBus = this._eventBus;
	var eventsToRegister = [];
	eventBus.on(events.tool + ".init", function(event) {
		if (!event.context.reactivate && this.isActive(name)) {
			this.setActive(null);
			return;
		}
		this.setActive(name);
	}, this);
	forEach(events, function(event) {
		eventsToRegister.push(event + ".ended");
		eventsToRegister.push(event + ".canceled");
	});
	eventBus.on(eventsToRegister, LOW_PRIORITY$1, function(event) {
		if (!this._active) return;
		if (isPaletteClick(event)) return;
		this.setActive(null);
	}, this);
};
function isPaletteClick(event) {
	var target = event.originalEvent && event.originalEvent.target;
	return target && closest(target, ".group[data-group=\"tools\"]");
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/tool-manager/index.js
var tool_manager_default = {
	__depends__: [dragging_default],
	__init__: ["toolManager"],
	toolManager: ["type", ToolManager]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/mouse/Mouse.js
function Mouse(eventBus) {
	var self = this;
	this._lastMoveEvent = null;
	function setLastMoveEvent(mousemoveEvent) {
		self._lastMoveEvent = mousemoveEvent;
	}
	eventBus.on("canvas.init", function(context) {
		(self._svg = context.svg).addEventListener("mousemove", setLastMoveEvent);
	});
	eventBus.on("canvas.destroy", function() {
		self._lastMouseEvent = null;
		self._svg.removeEventListener("mousemove", setLastMoveEvent);
	});
}
Mouse.$inject = ["eventBus"];
Mouse.prototype.getLastMoveEvent = function() {
	return this._lastMoveEvent || createMoveEvent(0, 0);
};
function createMoveEvent(x, y) {
	var event = document.createEvent("MouseEvent");
	var screenX = x, screenY = y, clientX = x, clientY = y;
	if (event.initMouseEvent) event.initMouseEvent("mousemove", true, true, window, 0, screenX, screenY, clientX, clientY, false, false, false, false, 0, null);
	return event;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/mouse/index.js
var mouse_default = {
	__init__: ["mouse"],
	mouse: ["type", Mouse]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/lasso-tool/LassoTool.js
init_dist();
var LASSO_TOOL_CURSOR = "crosshair";
var MARKER_SELECTED = "selected";
var LASSO_ACTIVE_CLS = "djs-dragging-active-lasso";
function LassoTool(eventBus, canvas, dragging, elementRegistry, selection, toolManager, mouse) {
	this._selection = selection;
	this._dragging = dragging;
	this._mouse = mouse;
	var self = this;
	var visuals = {
		create: function(context) {
			var container = canvas.getActiveLayer();
			var frame = context.frame = create("rect");
			attr$1(frame, {
				class: "djs-lasso-overlay",
				width: 1,
				height: 1,
				x: 0,
				y: 0
			});
			append(container, frame);
			toggleLassoMarkerClass(true);
			this.update(context);
		},
		update: function(context) {
			var frame = context.frame, bbox = context.bbox;
			if (frame && bbox) attr$1(frame, {
				x: bbox.x,
				y: bbox.y,
				width: bbox.width,
				height: bbox.height
			});
			var currentlyMarked = context.marked, lastMarked = context.lastMarked;
			if (currentlyMarked && lastMarked) {
				for (const e of lastMarked) if (!currentlyMarked.has(e)) canvas.removeMarker(e, MARKER_SELECTED);
				for (const e of currentlyMarked) if (!lastMarked.has(e)) canvas.addMarker(e, MARKER_SELECTED);
			}
		},
		remove: function(context) {
			this.update(context);
			if (context.frame) remove(context.frame);
			toggleLassoMarkerClass(false);
		}
	};
	function toggleLassoMarkerClass(enabled) {
		classes$1(canvas.getContainer()).toggle(LASSO_ACTIVE_CLS, enabled);
	}
	function getAllEnclosedElements(bbox) {
		var allElements = elementRegistry.getAll();
		return new Set(values(getEnclosedElements(allElements, bbox)));
	}
	toolManager.registerTool("lasso", {
		tool: "lasso.selection",
		dragging: "lasso"
	});
	eventBus.on("lasso.selection.end", function(event) {
		var target = event.originalEvent.target;
		if (!event.hover && !(target instanceof SVGElement)) return;
		eventBus.once("lasso.selection.ended", function() {
			self.activateLasso(event.originalEvent, true);
		});
	});
	eventBus.on("lasso.end", 0, function(event) {
		var context = event.context;
		self._select(Array.from(context.marked));
	});
	eventBus.on("lasso.start", function(event) {
		var context = event.context;
		context.bbox = toBBox(event);
		context.add = hasSecondaryModifier(event);
		context.lastMarked = new Set(selection.get());
		if (context.add) context.marked = context.lastMarked;
		else context.marked = new Set();
		context.initialMarked = context.marked;
		visuals.create(context);
	});
	eventBus.on("lasso.move", function(event) {
		var context = event.context;
		var enclosedElements = getAllEnclosedElements(context.bbox = toBBox(event));
		var marked = context.initialMarked.union(enclosedElements);
		context.lastMarked = context.marked;
		context.marked = marked;
		visuals.update(context);
	});
	eventBus.on("lasso.cleanup", function(event) {
		var context = event.context;
		context.lastMarked = context.marked;
		context.marked = new Set(selection.get());
		visuals.remove(event.context);
	});
	eventBus.on("element.mousedown", 1500, function(event) {
		if (!hasSecondaryModifier(event)) return;
		self.activateLasso(event.originalEvent);
		return true;
	});
}
LassoTool.$inject = [
	"eventBus",
	"canvas",
	"dragging",
	"elementRegistry",
	"selection",
	"toolManager",
	"mouse"
];
LassoTool.prototype.activateLasso = function(event, autoActivate) {
	this._dragging.init(event, "lasso", {
		autoActivate,
		cursor: LASSO_TOOL_CURSOR,
		data: { context: {} },
		keepSelection: true
	});
};
LassoTool.prototype.activateSelection = function(event, autoActivate) {
	this._dragging.init(event, "lasso.selection", {
		trapClick: false,
		autoActivate,
		cursor: LASSO_TOOL_CURSOR,
		data: { context: {} },
		keepSelection: true
	});
};
LassoTool.prototype._select = function(elements) {
	this._selection.select(elements);
};
LassoTool.prototype.select = function(elements, bbox, previousSelection = []) {
	var selectedElements = values(getEnclosedElements(elements, bbox));
	this._select([...previousSelection, ...selectedElements]);
};
LassoTool.prototype.toggle = function() {
	if (this.isActive()) return this._dragging.cancel();
	var mouseEvent = this._mouse.getLastMoveEvent();
	this.activateSelection(mouseEvent, !!mouseEvent);
};
LassoTool.prototype.isActive = function() {
	var context = this._dragging.context();
	return context && /^lasso/.test(context.prefix);
};
function toBBox(event) {
	var start = {
		x: event.x - event.dx,
		y: event.y - event.dy
	};
	var end = {
		x: event.x,
		y: event.y
	};
	var bbox;
	if (start.x <= end.x && start.y < end.y || start.x < end.x && start.y <= end.y) bbox = {
		x: start.x,
		y: start.y,
		width: end.x - start.x,
		height: end.y - start.y
	};
	else if (start.x >= end.x && start.y < end.y || start.x > end.x && start.y <= end.y) bbox = {
		x: end.x,
		y: start.y,
		width: start.x - end.x,
		height: end.y - start.y
	};
	else if (start.x <= end.x && start.y > end.y || start.x < end.x && start.y >= end.y) bbox = {
		x: start.x,
		y: end.y,
		width: end.x - start.x,
		height: start.y - end.y
	};
	else if (start.x >= end.x && start.y > end.y || start.x > end.x && start.y >= end.y) bbox = {
		x: end.x,
		y: end.y,
		width: start.x - end.x,
		height: start.y - end.y
	};
	else bbox = {
		x: end.x,
		y: end.y,
		width: 0,
		height: 0
	};
	return bbox;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/lasso-tool/index.js
var lasso_tool_default = {
	__depends__: [tool_manager_default, mouse_default],
	__init__: ["lassoTool"],
	lassoTool: ["type", LassoTool]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/hand-tool/HandTool.js
var HIGH_PRIORITY = 1500;
var HAND_CURSOR = "grab";
function HandTool(eventBus, canvas, dragging, injector, toolManager, mouse) {
	this._dragging = dragging;
	this._mouse = mouse;
	var self = this, keyboard = injector.get("keyboard", false);
	toolManager.registerTool("hand", {
		tool: "hand",
		dragging: "hand.move"
	});
	eventBus.on("element.mousedown", HIGH_PRIORITY, function(event) {
		if (!hasPrimaryModifier(event)) return;
		self.activateMove(event.originalEvent, true);
		return false;
	});
	keyboard && keyboard.addListener(HIGH_PRIORITY, function(e) {
		if (!isSpace(e.keyEvent) || self.isActive()) return;
		var mouseEvent = self._mouse.getLastMoveEvent();
		self.activateMove(mouseEvent, !!mouseEvent);
	}, "keyboard.keydown");
	keyboard && keyboard.addListener(HIGH_PRIORITY, function(e) {
		if (!isSpace(e.keyEvent) || !self.isActive()) return;
		self.toggle();
	}, "keyboard.keyup");
	eventBus.on("hand.end", function(event) {
		var target = event.originalEvent.target;
		if (!event.hover && !(target instanceof SVGElement)) return false;
		eventBus.once("hand.ended", function() {
			self.activateMove(event.originalEvent, { reactivate: true });
		});
	});
	eventBus.on("hand.move.move", function(event) {
		var scale = canvas.viewbox().scale;
		canvas.scroll({
			dx: event.dx * scale,
			dy: event.dy * scale
		});
	});
	eventBus.on("hand.move.end", function(event) {
		var reactivate = event.context.reactivate;
		if (!hasPrimaryModifier(event) && reactivate) eventBus.once("hand.move.ended", function(event) {
			self.activateHand(event.originalEvent, true, true);
		});
		return false;
	});
}
HandTool.$inject = [
	"eventBus",
	"canvas",
	"dragging",
	"injector",
	"toolManager",
	"mouse"
];
HandTool.prototype.activateMove = function(event, autoActivate, context) {
	if (typeof autoActivate === "object") {
		context = autoActivate;
		autoActivate = false;
	}
	this._dragging.init(event, "hand.move", {
		autoActivate,
		cursor: HAND_CURSOR,
		data: { context: context || {} }
	});
};
HandTool.prototype.activateHand = function(event, autoActivate, reactivate) {
	this._dragging.init(event, "hand", {
		trapClick: false,
		autoActivate,
		cursor: HAND_CURSOR,
		data: { context: { reactivate } }
	});
};
HandTool.prototype.toggle = function() {
	if (this.isActive()) return this._dragging.cancel();
	var mouseEvent = this._mouse.getLastMoveEvent();
	this.activateHand(mouseEvent, !!mouseEvent);
};
HandTool.prototype.isActive = function() {
	var context = this._dragging.context();
	if (context) return /^(hand|hand\.move)$/.test(context.prefix);
	return false;
};
function isSpace(keyEvent) {
	return isKey("Space", keyEvent);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/hand-tool/index.js
var hand_tool_default = {
	__depends__: [tool_manager_default, mouse_default],
	__init__: ["handTool"],
	handTool: ["type", HandTool]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/resize/ResizeUtil.js
init_dist();
var max = Math.max;
var min = Math.min;
var DEFAULT_CHILD_BOX_PADDING = 20;
function substractTRBL(trblA, trblB) {
	return {
		top: trblA.top - trblB.top,
		right: trblA.right - trblB.right,
		bottom: trblA.bottom - trblB.bottom,
		left: trblA.left - trblB.left
	};
}
function resizeBounds(bounds, direction, delta) {
	var dx = delta.x, dy = delta.y;
	var newBounds = {
		x: bounds.x,
		y: bounds.y,
		width: bounds.width,
		height: bounds.height
	};
	if (direction.indexOf("n") !== -1) {
		newBounds.y = bounds.y + dy;
		newBounds.height = bounds.height - dy;
	} else if (direction.indexOf("s") !== -1) newBounds.height = bounds.height + dy;
	if (direction.indexOf("e") !== -1) newBounds.width = bounds.width + dx;
	else if (direction.indexOf("w") !== -1) {
		newBounds.x = bounds.x + dx;
		newBounds.width = bounds.width - dx;
	}
	return newBounds;
}
function resizeTRBL(bounds, resize) {
	return {
		x: bounds.x + (resize.left || 0),
		y: bounds.y + (resize.top || 0),
		width: bounds.width - (resize.left || 0) + (resize.right || 0),
		height: bounds.height - (resize.top || 0) + (resize.bottom || 0)
	};
}
function applyConstraints(attr, trbl, resizeConstraints) {
	var value = trbl[attr], minValue = resizeConstraints.min && resizeConstraints.min[attr], maxValue = resizeConstraints.max && resizeConstraints.max[attr];
	if (isNumber(minValue)) value = (/top|left/.test(attr) ? min : max)(value, minValue);
	if (isNumber(maxValue)) value = (/top|left/.test(attr) ? max : min)(value, maxValue);
	return value;
}
function ensureConstraints(currentBounds, resizeConstraints) {
	if (!resizeConstraints) return currentBounds;
	var currentTrbl = asTRBL(currentBounds);
	return asBounds({
		top: applyConstraints("top", currentTrbl, resizeConstraints),
		right: applyConstraints("right", currentTrbl, resizeConstraints),
		bottom: applyConstraints("bottom", currentTrbl, resizeConstraints),
		left: applyConstraints("left", currentTrbl, resizeConstraints)
	});
}
function getMinResizeBounds(direction, currentBounds, minDimensions, childrenBounds) {
	var currentBox = asTRBL(currentBounds);
	var minBox = {
		top: /n/.test(direction) ? currentBox.bottom - minDimensions.height : currentBox.top,
		left: /w/.test(direction) ? currentBox.right - minDimensions.width : currentBox.left,
		bottom: /s/.test(direction) ? currentBox.top + minDimensions.height : currentBox.bottom,
		right: /e/.test(direction) ? currentBox.left + minDimensions.width : currentBox.right
	};
	var childrenBox = childrenBounds ? asTRBL(childrenBounds) : minBox;
	var combinedBox = {
		top: min(minBox.top, childrenBox.top),
		left: min(minBox.left, childrenBox.left),
		bottom: max(minBox.bottom, childrenBox.bottom),
		right: max(minBox.right, childrenBox.right)
	};
	return asBounds(combinedBox);
}
function asPadding(mayBePadding, defaultValue) {
	if (typeof mayBePadding !== "undefined") return mayBePadding;
	else return DEFAULT_CHILD_BOX_PADDING;
}
function addPadding(bbox, padding) {
	var left, right, top, bottom;
	if (typeof padding === "object") {
		left = asPadding(padding.left);
		right = asPadding(padding.right);
		top = asPadding(padding.top);
		bottom = asPadding(padding.bottom);
	} else left = right = top = bottom = asPadding(padding);
	return {
		x: bbox.x - left,
		y: bbox.y - top,
		width: bbox.width + left + right,
		height: bbox.height + top + bottom
	};
}
function isBBoxChild(element) {
	if (element.waypoints) return false;
	if (element.type === "label") return false;
	return true;
}
function computeChildrenBBox(shapeOrChildren, padding) {
	var elements;
	if (shapeOrChildren.length === void 0) elements = filter(shapeOrChildren.children, isBBoxChild);
	else elements = shapeOrChildren;
	if (elements.length) return addPadding(getBBox(elements), padding);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/resize/Resize.js
init_dist();
var DEFAULT_MIN_WIDTH = 10;
function Resize(eventBus, rules, modeling, dragging) {
	this._dragging = dragging;
	this._rules = rules;
	var self = this;
	function handleMove(context, delta) {
		var shape = context.shape, direction = context.direction, resizeConstraints = context.resizeConstraints, newBounds;
		context.delta = delta;
		newBounds = resizeBounds(shape, direction, delta);
		context.newBounds = ensureConstraints(newBounds, resizeConstraints);
		context.canExecute = self.canResize(context);
	}
	function handleStart(context) {
		var resizeConstraints = context.resizeConstraints, minBounds = context.minBounds;
		if (resizeConstraints !== void 0) return;
		if (minBounds === void 0) minBounds = self.computeMinResizeBox(context);
		context.resizeConstraints = { min: asTRBL(minBounds) };
	}
	function handleEnd(context) {
		var shape = context.shape, canExecute = context.canExecute, newBounds = context.newBounds;
		if (canExecute) {
			newBounds = roundBounds(newBounds);
			if (!boundsChanged(shape, newBounds)) return;
			modeling.resizeShape(shape, newBounds);
		}
	}
	eventBus.on("resize.start", function(event) {
		handleStart(event.context);
	});
	eventBus.on("resize.move", function(event) {
		var delta = {
			x: event.dx,
			y: event.dy
		};
		handleMove(event.context, delta);
	});
	eventBus.on("resize.end", function(event) {
		handleEnd(event.context);
	});
}
Resize.prototype.canResize = function(context) {
	var rules = this._rules;
	var ctx = pick(context, [
		"newBounds",
		"shape",
		"delta",
		"direction"
	]);
	return rules.allowed("shape.resize", ctx);
};
Resize.prototype.activate = function(event, shape, contextOrDirection) {
	var dragging = this._dragging, context, direction;
	if (typeof contextOrDirection === "string") contextOrDirection = { direction: contextOrDirection };
	context = assign({ shape }, contextOrDirection);
	direction = context.direction;
	if (!direction) throw new Error("must provide a direction (n|w|s|e|nw|se|ne|sw)");
	dragging.init(event, getReferencePoint(shape, direction), "resize", {
		autoActivate: true,
		cursor: getCursor(direction),
		data: {
			shape,
			context
		}
	});
};
Resize.prototype.computeMinResizeBox = function(context) {
	var shape = context.shape, direction = context.direction;
	return getMinResizeBounds(direction, shape, context.minDimensions || {
		width: DEFAULT_MIN_WIDTH,
		height: DEFAULT_MIN_WIDTH
	}, computeChildrenBBox(shape, context.childrenBoxPadding));
};
Resize.$inject = [
	"eventBus",
	"rules",
	"modeling",
	"dragging"
];
function boundsChanged(shape, newBounds) {
	return shape.x !== newBounds.x || shape.y !== newBounds.y || shape.width !== newBounds.width || shape.height !== newBounds.height;
}
function getReferencePoint(shape, direction) {
	var mid = getMid(shape), trbl = asTRBL(shape);
	var referencePoint = {
		x: mid.x,
		y: mid.y
	};
	if (direction.indexOf("n") !== -1) referencePoint.y = trbl.top;
	else if (direction.indexOf("s") !== -1) referencePoint.y = trbl.bottom;
	if (direction.indexOf("e") !== -1) referencePoint.x = trbl.right;
	else if (direction.indexOf("w") !== -1) referencePoint.x = trbl.left;
	return referencePoint;
}
function getCursor(direction) {
	var prefix = "resize-";
	if (direction === "n" || direction === "s") return prefix + "ns";
	else if (direction === "e" || direction === "w") return prefix + "ew";
	else if (direction === "nw" || direction === "se") return prefix + "nwse";
	else return prefix + "nesw";
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/resize/ResizePreview.js
var MARKER_RESIZING = "djs-resizing";
var MARKER_RESIZE_NOT_OK = "resize-not-ok";
var LOW_PRIORITY = 500;
function ResizePreview(eventBus, canvas, previewSupport) {
	function updateFrame(context) {
		var shape = context.shape, bounds = context.newBounds, frame = context.frame;
		if (!frame) {
			frame = context.frame = previewSupport.addFrame(shape, canvas.getActiveLayer());
			canvas.addMarker(shape, MARKER_RESIZING);
		}
		if (bounds.width > 5) attr$1(frame, {
			x: bounds.x,
			width: bounds.width
		});
		if (bounds.height > 5) attr$1(frame, {
			y: bounds.y,
			height: bounds.height
		});
		if (context.canExecute) classes$1(frame).remove(MARKER_RESIZE_NOT_OK);
		else classes$1(frame).add(MARKER_RESIZE_NOT_OK);
	}
	function removeFrame(context) {
		var shape = context.shape;
		if (context.frame) remove(context.frame);
		canvas.removeMarker(shape, MARKER_RESIZING);
	}
	eventBus.on("resize.move", LOW_PRIORITY, function(event) {
		updateFrame(event.context);
	});
	eventBus.on("resize.cleanup", function(event) {
		removeFrame(event.context);
	});
}
ResizePreview.$inject = [
	"eventBus",
	"canvas",
	"previewSupport"
];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/resize/ResizeHandles.js
init_dist();
var HANDLE_OFFSET = -6;
var HANDLE_SIZE = 8;
var HANDLE_HIT_SIZE = 20;
var CLS_RESIZER = "djs-resizer";
var directions = [
	"n",
	"w",
	"s",
	"e",
	"nw",
	"ne",
	"se",
	"sw"
];
function ResizeHandles(eventBus, canvas, selection, resize) {
	this._resize = resize;
	this._canvas = canvas;
	var self = this;
	eventBus.on("selection.changed", function(e) {
		var newSelection = e.newSelection;
		self.removeResizers();
		if (newSelection.length === 1) forEach(newSelection, bind(self.addResizer, self));
	});
	eventBus.on("shape.changed", function(e) {
		var shape = e.element;
		if (selection.isSelected(shape)) {
			self.removeResizers();
			self.addResizer(shape);
		}
	});
}
ResizeHandles.prototype.makeDraggable = function(element, gfx, direction) {
	var resize = this._resize;
	function startResize(event) {
		if (isPrimaryButton(event)) resize.activate(event, element, direction);
	}
	event.bind(gfx, "mousedown", startResize);
	event.bind(gfx, "touchstart", startResize);
};
ResizeHandles.prototype._createResizer = function(element, x, y, direction) {
	var resizersParent = this._getResizersParent();
	var offset = getHandleOffset(direction);
	var group = create("g");
	classes$1(group).add(CLS_RESIZER);
	classes$1(group).add(CLS_RESIZER + "-" + element.id);
	classes$1(group).add(CLS_RESIZER + "-" + direction);
	append(resizersParent, group);
	var visual = create("rect");
	attr$1(visual, {
		x: -HANDLE_SIZE / 2 + offset.x,
		y: -HANDLE_SIZE / 2 + offset.y,
		rx: 2,
		width: HANDLE_SIZE,
		height: HANDLE_SIZE
	});
	classes$1(visual).add(CLS_RESIZER + "-visual");
	append(group, visual);
	var hit = create("rect");
	attr$1(hit, {
		x: -HANDLE_HIT_SIZE / 2 + offset.x,
		y: -HANDLE_HIT_SIZE / 2 + offset.y,
		width: HANDLE_HIT_SIZE,
		height: HANDLE_HIT_SIZE
	});
	classes$1(hit).add(CLS_RESIZER + "-hit");
	append(group, hit);
	transform(group, x, y);
	return group;
};
ResizeHandles.prototype.createResizer = function(element, direction) {
	var point = getReferencePoint(element, direction);
	var resizer = this._createResizer(element, point.x, point.y, direction);
	this.makeDraggable(element, resizer, direction);
};
ResizeHandles.prototype.addResizer = function(element) {
	var self = this;
	if (isConnection(element)) return;
	forEach(directions, function(direction) {
		if (self._resize.canResize({
			shape: element,
			direction
		})) self.createResizer(element, direction);
	});
};
ResizeHandles.prototype.removeResizers = function() {
	var resizersParent = this._getResizersParent();
	clear$1(resizersParent);
};
ResizeHandles.prototype._getResizersParent = function() {
	return this._canvas.getLayer("resizers");
};
ResizeHandles.$inject = [
	"eventBus",
	"canvas",
	"selection",
	"resize"
];
function getHandleOffset(direction) {
	var offset = {
		x: 0,
		y: 0
	};
	if (direction.indexOf("e") !== -1) offset.x = -HANDLE_OFFSET;
	else if (direction.indexOf("w") !== -1) offset.x = HANDLE_OFFSET;
	if (direction.indexOf("s") !== -1) offset.y = -HANDLE_OFFSET;
	else if (direction.indexOf("n") !== -1) offset.y = HANDLE_OFFSET;
	return offset;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/resize/index.js
var resize_default = {
	__depends__: [
		rules_default,
		dragging_default,
		preview_support_default
	],
	__init__: [
		"resize",
		"resizePreview",
		"resizeHandles"
	],
	resize: ["type", Resize],
	resizePreview: ["type", ResizePreview],
	resizeHandles: ["type", ResizeHandles]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/snapping/SnapContext.js
init_dist();
function SnapContext() {
	this._targets = {};
	this._snapOrigins = {};
	this._snapLocations = [];
	this._defaultSnaps = {};
}
SnapContext.prototype.getSnapOrigin = function(snapLocation) {
	return this._snapOrigins[snapLocation];
};
SnapContext.prototype.setSnapOrigin = function(snapLocation, snapOrigin) {
	this._snapOrigins[snapLocation] = snapOrigin;
	if (this._snapLocations.indexOf(snapLocation) === -1) this._snapLocations.push(snapLocation);
};
SnapContext.prototype.addDefaultSnap = function(snapLocation, point) {
	var snapValues = this._defaultSnaps[snapLocation];
	if (!snapValues) snapValues = this._defaultSnaps[snapLocation] = [];
	snapValues.push(point);
};
SnapContext.prototype.getSnapLocations = function() {
	return this._snapLocations;
};
SnapContext.prototype.setSnapLocations = function(snapLocations) {
	this._snapLocations = snapLocations;
};
SnapContext.prototype.pointsForTarget = function(target) {
	var targetId = target.id || target;
	var snapPoints = this._targets[targetId];
	if (!snapPoints) {
		snapPoints = this._targets[targetId] = new SnapPoints();
		snapPoints.initDefaults(this._defaultSnaps);
	}
	return snapPoints;
};
function SnapPoints() {
	this._snapValues = {};
}
SnapPoints.prototype.add = function(snapLocation, point) {
	var snapValues = this._snapValues[snapLocation];
	if (!snapValues) snapValues = this._snapValues[snapLocation] = {
		x: [],
		y: []
	};
	if (snapValues.x.indexOf(point.x) === -1) snapValues.x.push(point.x);
	if (snapValues.y.indexOf(point.y) === -1) snapValues.y.push(point.y);
};
SnapPoints.prototype.snap = function(point, snapLocation, axis, tolerance) {
	var snappingValues = this._snapValues[snapLocation];
	return snappingValues && snapTo(point[axis], snappingValues[axis], tolerance);
};
SnapPoints.prototype.initDefaults = function(defaultSnaps) {
	var self = this;
	forEach(defaultSnaps || {}, function(snapPoints, snapLocation) {
		forEach(snapPoints, function(point) {
			self.add(snapLocation, point);
		});
	});
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/snapping/CreateMoveSnapping.js
init_dist();
var HIGHER_PRIORITY$1 = 1250;
function CreateMoveSnapping(elementRegistry, eventBus, snapping) {
	var self = this;
	this._elementRegistry = elementRegistry;
	eventBus.on(["create.start", "shape.move.start"], function(event) {
		self.initSnap(event);
	});
	eventBus.on([
		"create.move",
		"create.end",
		"shape.move.move",
		"shape.move.end"
	], HIGHER_PRIORITY$1, function(event) {
		var context = event.context, shape = context.shape, snapContext = context.snapContext, target = context.target;
		if (event.originalEvent && isCmd(event.originalEvent)) return;
		if (isSnapped(event) || !target) return;
		var snapPoints = snapContext.pointsForTarget(target);
		if (!snapPoints.initialized) {
			snapPoints = self.addSnapTargetPoints(snapPoints, shape, target);
			snapPoints.initialized = true;
		}
		snapping.snap(event, snapPoints);
	});
	eventBus.on(["create.cleanup", "shape.move.cleanup"], function() {
		snapping.hide();
	});
}
CreateMoveSnapping.$inject = [
	"elementRegistry",
	"eventBus",
	"snapping"
];
CreateMoveSnapping.prototype.initSnap = function(event) {
	var elementRegistry = this._elementRegistry;
	var context = event.context, shape = context.shape, snapContext = context.snapContext;
	if (!snapContext) snapContext = context.snapContext = new SnapContext();
	var shapeMid;
	if (elementRegistry.get(shape.id)) shapeMid = mid$1(shape, event);
	else shapeMid = {
		x: event.x + mid$1(shape).x,
		y: event.y + mid$1(shape).y
	};
	var shapeTopLeft = {
		x: shapeMid.x - shape.width / 2,
		y: shapeMid.y - shape.height / 2
	}, shapeBottomRight = {
		x: shapeMid.x + shape.width / 2,
		y: shapeMid.y + shape.height / 2
	};
	snapContext.setSnapOrigin("mid", {
		x: shapeMid.x - event.x,
		y: shapeMid.y - event.y
	});
	if (isLabel(shape)) return snapContext;
	snapContext.setSnapOrigin("top-left", {
		x: shapeTopLeft.x - event.x,
		y: shapeTopLeft.y - event.y
	});
	snapContext.setSnapOrigin("bottom-right", {
		x: shapeBottomRight.x - event.x,
		y: shapeBottomRight.y - event.y
	});
	return snapContext;
};
CreateMoveSnapping.prototype.addSnapTargetPoints = function(snapPoints, shape, target) {
	var snapTargets = this.getSnapTargets(shape, target);
	forEach(snapTargets, function(snapTarget) {
		if (isLabel(snapTarget)) {
			if (isLabel(shape)) snapPoints.add("mid", mid$1(snapTarget));
			return;
		}
		if (isConnection(snapTarget)) {
			if (snapTarget.waypoints.length < 3) return;
			var waypoints = snapTarget.waypoints.slice(1, -1);
			forEach(waypoints, function(waypoint) {
				snapPoints.add("mid", waypoint);
			});
			return;
		}
		snapPoints.add("mid", mid$1(snapTarget));
	});
	if (!isNumber(shape.x) || !isNumber(shape.y)) return snapPoints;
	if (this._elementRegistry.get(shape.id)) snapPoints.add("mid", mid$1(shape));
	return snapPoints;
};
CreateMoveSnapping.prototype.getSnapTargets = function(shape, target) {
	return getChildren(target).filter(function(child) {
		return !isHidden$1(child);
	});
};
function isHidden$1(element) {
	return !!element.hidden;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/snapping/ResizeSnapping.js
init_dist();
var HIGHER_PRIORITY = 1250;
function ResizeSnapping(eventBus, snapping) {
	var self = this;
	eventBus.on(["resize.start"], function(event) {
		self.initSnap(event);
	});
	eventBus.on(["resize.move", "resize.end"], HIGHER_PRIORITY, function(event) {
		var context = event.context, shape = context.shape, parent = shape.parent, direction = context.direction, snapContext = context.snapContext;
		if (event.originalEvent && isCmd(event.originalEvent)) return;
		if (isSnapped(event)) return;
		var snapPoints = snapContext.pointsForTarget(parent);
		if (!snapPoints.initialized) {
			snapPoints = self.addSnapTargetPoints(snapPoints, shape, parent, direction);
			snapPoints.initialized = true;
		}
		if (isHorizontal(direction)) setSnapped(event, "x", event.x);
		if (isVertical(direction)) setSnapped(event, "y", event.y);
		snapping.snap(event, snapPoints);
	});
	eventBus.on(["resize.cleanup"], function() {
		snapping.hide();
	});
}
ResizeSnapping.prototype.initSnap = function(event) {
	var context = event.context, shape = context.shape, direction = context.direction, snapContext = context.snapContext;
	if (!snapContext) snapContext = context.snapContext = new SnapContext();
	var snapOrigin = getSnapOrigin(shape, direction);
	snapContext.setSnapOrigin("corner", {
		x: snapOrigin.x - event.x,
		y: snapOrigin.y - event.y
	});
	return snapContext;
};
ResizeSnapping.prototype.addSnapTargetPoints = function(snapPoints, shape, target, direction) {
	var snapTargets = this.getSnapTargets(shape, target);
	forEach(snapTargets, function(snapTarget) {
		snapPoints.add("corner", bottomRight(snapTarget));
		snapPoints.add("corner", topLeft(snapTarget));
	});
	snapPoints.add("corner", getSnapOrigin(shape, direction));
	return snapPoints;
};
ResizeSnapping.$inject = ["eventBus", "snapping"];
ResizeSnapping.prototype.getSnapTargets = function(shape, target) {
	return getChildren(target).filter(function(child) {
		return !isAttached(child, shape) && !isConnection(child) && !isHidden(child) && !isLabel(child);
	});
};
function getSnapOrigin(shape, direction) {
	var mid = getMid(shape), trbl = asTRBL(shape);
	var snapOrigin = {
		x: mid.x,
		y: mid.y
	};
	if (direction.indexOf("n") !== -1) snapOrigin.y = trbl.top;
	else if (direction.indexOf("s") !== -1) snapOrigin.y = trbl.bottom;
	if (direction.indexOf("e") !== -1) snapOrigin.x = trbl.right;
	else if (direction.indexOf("w") !== -1) snapOrigin.x = trbl.left;
	return snapOrigin;
}
function isAttached(element, host) {
	return element.host === host;
}
function isHidden(element) {
	return !!element.hidden;
}
function isHorizontal(direction) {
	return direction === "n" || direction === "s";
}
function isVertical(direction) {
	return direction === "e" || direction === "w";
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/snapping/Snapping.js
init_dist();
var SNAP_TOLERANCE = 7;
var SNAP_LINE_HIDE_DELAY = 1e3;
function Snapping(canvas) {
	this._canvas = canvas;
	this._asyncHide = debounce(bind(this.hide, this), SNAP_LINE_HIDE_DELAY);
}
Snapping.$inject = ["canvas"];
Snapping.prototype.snap = function(event, snapPoints) {
	var snapContext = event.context.snapContext, snapLocations = snapContext.getSnapLocations();
	var snapping = {
		x: isSnapped(event, "x"),
		y: isSnapped(event, "y")
	};
	forEach(snapLocations, function(location) {
		var snapOrigin = snapContext.getSnapOrigin(location);
		var snapCurrent = {
			x: event.x + snapOrigin.x,
			y: event.y + snapOrigin.y
		};
		forEach(["x", "y"], function(axis) {
			var locationSnapping;
			if (!snapping[axis]) {
				locationSnapping = snapPoints.snap(snapCurrent, location, axis, SNAP_TOLERANCE);
				if (locationSnapping !== void 0) snapping[axis] = {
					value: locationSnapping,
					originValue: locationSnapping - snapOrigin[axis]
				};
			}
		});
		if (snapping.x && snapping.y) return false;
	});
	this.showSnapLine("vertical", snapping.x && snapping.x.value);
	this.showSnapLine("horizontal", snapping.y && snapping.y.value);
	forEach(["x", "y"], function(axis) {
		var axisSnapping = snapping[axis];
		if (isObject(axisSnapping)) setSnapped(event, axis, axisSnapping.originValue);
	});
};
Snapping.prototype._createLine = function(orientation) {
	var root = this._canvas.getLayer("snap");
	var line = create("path");
	attr$1(line, { d: "M0,0 L0,0" });
	classes$1(line).add("djs-snap-line");
	append(root, line);
	return { update: function(position) {
		if (!isNumber(position)) attr$1(line, { display: "none" });
		else if (orientation === "horizontal") attr$1(line, {
			d: "M-100000," + position + " L+100000," + position,
			display: ""
		});
		else attr$1(line, {
			d: "M " + position + ",-100000 L " + position + ", +100000",
			display: ""
		});
	} };
};
Snapping.prototype._createSnapLines = function() {
	this._snapLines = {
		horizontal: this._createLine("horizontal"),
		vertical: this._createLine("vertical")
	};
};
Snapping.prototype.showSnapLine = function(orientation, position) {
	var line = this.getSnapLine(orientation);
	if (line) line.update(position);
	this._asyncHide();
};
Snapping.prototype.getSnapLine = function(orientation) {
	if (!this._snapLines) this._createSnapLines();
	return this._snapLines[orientation];
};
Snapping.prototype.hide = function() {
	forEach(this._snapLines, function(snapLine) {
		snapLine.update();
	});
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/snapping/index.js
var snapping_default = {
	__init__: [
		"createMoveSnapping",
		"resizeSnapping",
		"snapping"
	],
	createMoveSnapping: ["type", CreateMoveSnapping],
	resizeSnapping: ["type", ResizeSnapping],
	snapping: ["type", Snapping]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/clipboard/Clipboard.js
function Clipboard() {}
Clipboard.prototype.get = function() {
	return this._data;
};
Clipboard.prototype.set = function(data) {
	this._data = data;
};
Clipboard.prototype.clear = function() {
	var data = this._data;
	delete this._data;
	return data;
};
Clipboard.prototype.isEmpty = function() {
	return !this._data;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/clipboard/index.js
var clipboard_default = { clipboard: ["type", Clipboard] };
//#endregion
export { isSnapped as $, editor_actions_default as A, d as B, RuleProvider as C, keyboard_move_selection_default as D, CommandStack as E, popup_menu_default as F, S as G, q as H, search_default as I, create_default as J, k$1 as K, A as L, distribute_elements_default as M, connection_preview_default as N, grid_snapping_default as O, replace_default as P, bottomRight as Q, T as R, saveClear as S, command_default as T, m$1 as U, h as V, R as W, connect_default as X, preview_support_default as Y, bendpoints_default as Z, getDirection as _, computeChildrenBBox as a, rotateVector as at, getNewAttachPoint as b, hand_tool_default as c, auto_scroll_default as ct, tool_manager_default as d, findFreePosition as dt, mid$1 as et, palette_default as f, generateGetNextPosition as ft, Modeling as g, BaseLayouter as h, search_pad_default as ht, resize_default as i, getDistancePointPoint as it, EditorActions as j, quantize as k, lasso_tool_default as l, dragging_default as lt, CroppingConnectionDocking as m, align_elements_default as mt, snapping_default as n, topLeft as nt, resizeTRBL as o, getApproxIntersection as ot, move_default as p, getConnectedDistance as pt, l$1 as q, CreateMoveSnapping as r, getAngle as rt, substractTRBL as s, rules_default as st, clipboard_default as t, setSnapped as tt, mouse_default as u, auto_place_default as ut, getResizedSourceAnchor as v, lib_default as w, getNewAttachShapeDelta as x, getResizedTargetAnchor as y, _ as z };

//# sourceMappingURL=clipboard-DuTT61cu.js.map