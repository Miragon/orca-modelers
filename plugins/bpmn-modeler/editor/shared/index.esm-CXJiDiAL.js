import { Bt as clear, H as IdGenerator, Ht as create, It as append, Jt as all, Rt as attr$1, Vt as clone, Wt as remove, Xt as attr, Zt as classes, rn as query, rt as getVisual, tn as event, zt as classes$1 } from "./jsxRuntime.module-awBdvHUy.js";
import { C as isObject, S as isNumber, _ as init_dist, c as every, i as assign, t as escapeCSS } from "./EscapeUtil-B1jzPlMc.js";
// ../../node_modules/diagram-js-minimap/dist/index.esm.js
init_dist();
var MINIMAP_VIEWBOX_PADDING = 50;
var IDS = new IdGenerator();
var RANGE = {
	min: .2,
	max: 4
};
var NUM_STEPS = 10;
var DELTA_THRESHOLD = .1;
var LOW_PRIORITY = 250;
var DEFAULT_DEBOUNCE_DELAY = 100;
var DEFAULT_DEBOUNCE_SKIP_DELAY = 2e3;
function Minimap(config, injector, eventBus, canvas, elementRegistry) {
	var self = this;
	this._canvas = canvas;
	this._elementRegistry = elementRegistry;
	this._eventBus = eventBus;
	this._injector = injector;
	this._config = config || {};
	this._updateTimeout = null;
	this._firstDebounceTime = null;
	this._dirty = false;
	this._state = {
		isOpen: void 0,
		isDragging: false,
		initialDragPosition: null,
		offsetViewport: null,
		cachedViewbox: null,
		dragger: null,
		svgClientRect: null,
		parentClientRect: null,
		zoomDelta: 0
	};
	this._minimapId = IDS.next();
	this._init();
	this.toggle(this._config.open || false);
	function centerViewbox(point) {
		if (!self._state._svgClientRect || isZeroDimensional(self._state._svgClientRect)) self._state._svgClientRect = self._svg.getBoundingClientRect();
		setViewboxCenteredAroundPoint(mapMousePositionToDiagramPoint({
			x: point.x - self._state._svgClientRect.left,
			y: point.y - self._state._svgClientRect.top
		}, self._svg, self._lastViewbox), self._canvas);
		self._update();
	}
	function mousedown(center) {
		return function onMousedown(event$1) {
			var point = getPoint(event$1);
			if (!self._state._svgClientRect || isZeroDimensional(self._state._svgClientRect)) self._state._svgClientRect = self._svg.getBoundingClientRect();
			if (center) centerViewbox(point);
			var diagramPoint = mapMousePositionToDiagramPoint({
				x: point.x - self._state._svgClientRect.left,
				y: point.y - self._state._svgClientRect.top
			}, self._svg, self._lastViewbox);
			var viewbox = canvas.viewbox();
			var offsetViewport = getOffsetViewport(diagramPoint, viewbox);
			var initialViewportDomRect = self._viewportDom.getBoundingClientRect();
			var offsetViewportDom = {
				x: point.x - initialViewportDomRect.left + 1,
				y: point.y - initialViewportDomRect.top + 1
			};
			assign(self._state, {
				cachedViewbox: viewbox,
				initialDragPosition: {
					x: point.x,
					y: point.y
				},
				isDragging: true,
				offsetViewport,
				offsetViewportDom,
				viewportClientRect: self._viewport.getBoundingClientRect(),
				parentClientRect: self._parent.getBoundingClientRect()
			});
			event.bind(document, "mousemove", onMousemove);
			event.bind(document, "mouseup", onMouseup);
		};
	}
	function onMousemove(event) {
		var point = getPoint(event);
		if (self._state.isDragging) {
			if (!self._state._svgClientRect || isZeroDimensional(self._state._svgClientRect)) self._state._svgClientRect = self._svg.getBoundingClientRect();
			var offsetViewportDom = self._state.offsetViewportDom, viewportClientRect = self._state.viewportClientRect, parentClientRect = self._state.parentClientRect;
			assign(self._viewportDom.style, {
				top: point.y - offsetViewportDom.y - parentClientRect.top + "px",
				left: point.x - offsetViewportDom.x - parentClientRect.left + "px"
			});
			var clipPath = getOverlayClipPath(parentClientRect, {
				top: point.y - offsetViewportDom.y - parentClientRect.top,
				left: point.x - offsetViewportDom.x - parentClientRect.left,
				width: viewportClientRect.width,
				height: viewportClientRect.height
			});
			assign(self._overlay.style, { clipPath });
			var diagramPoint = mapMousePositionToDiagramPoint({
				x: point.x - self._state._svgClientRect.left,
				y: point.y - self._state._svgClientRect.top
			}, self._svg, self._lastViewbox);
			setViewboxCenteredAroundPoint({
				x: diagramPoint.x - self._state.offsetViewport.x,
				y: diagramPoint.y - self._state.offsetViewport.y
			}, self._canvas);
		}
	}
	function onMouseup(event$1) {
		var point = getPoint(event$1);
		if (self._state.isDragging) {
			if (self._state.initialDragPosition.x === point.x && self._state.initialDragPosition.y === point.y) centerViewbox(event$1);
			self._update();
			assign(self._state, {
				cachedViewbox: null,
				initialDragPosition: null,
				isDragging: false,
				offsetViewport: null,
				offsetViewportDom: null
			});
			event.unbind(document, "mousemove", onMousemove);
			event.unbind(document, "mouseup", onMouseup);
		}
	}
	event.bind(this._viewportDom, "mousedown", mousedown(false));
	event.bind(this._svg, "mousedown", mousedown(true));
	event.bind(this._parent, "wheel", function(event) {
		event.preventDefault();
		event.stopPropagation();
		if (!event.ctrlKey) return;
		if (!self._state._svgClientRect || isZeroDimensional(self._state._svgClientRect)) self._state._svgClientRect = self._svg.getBoundingClientRect();
		if (!isPointInside(event, self._state._svgClientRect)) return;
		var factor = event.deltaMode === 0 ? .02 : .32;
		var delta = Math.sqrt(Math.pow(event.deltaY, 2) + Math.pow(event.deltaX, 2)) * sign(event.deltaY) * -factor;
		self._state.zoomDelta += delta;
		if (Math.abs(self._state.zoomDelta) > DELTA_THRESHOLD) {
			var direction = delta > 0 ? 1 : -1;
			var currentLinearZoomLevel = Math.log(canvas.zoom()) / Math.log(10);
			var stepSize = getStepSize(RANGE, NUM_STEPS * 2);
			var newLinearZoomLevel = Math.round(currentLinearZoomLevel / stepSize) * stepSize;
			newLinearZoomLevel += stepSize * direction;
			var newLogZoomLevel = Math.pow(10, newLinearZoomLevel);
			canvas.zoom(cap(RANGE, newLogZoomLevel), diagramPoint);
			self._state.zoomDelta = 0;
			var diagramPoint = mapMousePositionToDiagramPoint({
				x: event.clientX - self._state._svgClientRect.left,
				y: event.clientY - self._state._svgClientRect.top
			}, self._svg, self._lastViewbox);
			setViewboxCenteredAroundPoint(diagramPoint, self._canvas);
			self._update();
		}
	});
	event.bind(this._toggle, "click", function(event) {
		event.preventDefault();
		event.stopPropagation();
		self.toggle();
	});
	eventBus.on(["shape.added", "connection.added"], function(context) {
		if (!self.isOpen()) {
			self._dirty = true;
			return;
		}
		self._addElement(context.element);
		self._scheduleUpdate();
	});
	eventBus.on(["shape.removed", "connection.removed"], function(context) {
		if (!self.isOpen()) {
			self._dirty = true;
			return;
		}
		self._removeElement(context.element);
		self._scheduleUpdate();
	});
	eventBus.on("elements.changed", LOW_PRIORITY, function(context) {
		if (!self.isOpen()) {
			self._dirty = true;
			return;
		}
		context.elements.forEach(function(element) {
			self._updateElement(element);
		});
		self._scheduleUpdate();
	});
	eventBus.on("element.updateId", function(context) {
		var element = context.element, newId = context.newId;
		self._updateElementId(element, newId);
	});
	eventBus.on("canvas.viewbox.changed", function() {
		if (!self._state.isDragging) self._update();
	});
	eventBus.on("canvas.resized", function() {
		if (document.body.contains(self._parent)) {
			if (!self._state.isDragging) self._update();
			self._state._svgClientRect = self._svg.getBoundingClientRect();
		}
	});
	eventBus.on(["root.set", "plane.set"], function(event) {
		if (!self.isOpen()) {
			self._dirty = true;
			return;
		}
		self._clear();
		(event.element || event.plane.rootElement).children.forEach(function(el) {
			self._addElement(el);
		});
		self._update();
	});
	eventBus.on("diagram.destroy", function() {
		if (self._updateTimeout) {
			clearTimeout(self._updateTimeout);
			self._updateTimeout = null;
		}
	});
}
Minimap.$inject = [
	"config.minimap",
	"injector",
	"eventBus",
	"canvas",
	"elementRegistry"
];
Minimap.prototype._init = function() {
	var container = this._canvas.getContainer();
	var parent = this._parent = document.createElement("div");
	classes(parent).add("djs-minimap").add("bio-theme-parent");
	container.appendChild(parent);
	var toggle = this._toggle = document.createElement("button");
	classes(toggle).add("toggle");
	attr(toggle, "type", "button");
	parent.appendChild(toggle);
	var map = this._map = document.createElement("div");
	classes(map).add("map");
	parent.appendChild(map);
	var svg = this._svg = create("svg");
	attr$1(svg, {
		width: "100%",
		height: "100%"
	});
	append(map, svg);
	var elementsGroup = this._elementsGroup = create("g");
	append(svg, elementsGroup);
	var viewportGroup = this._viewportGroup = create("g");
	append(svg, viewportGroup);
	var viewport = this._viewport = create("rect");
	classes$1(viewport).add("viewport");
	append(viewportGroup, viewport);
	event.bind(parent, "mousedown", function(event) {
		event.stopPropagation();
	});
	var viewportDom = this._viewportDom = document.createElement("div");
	classes(viewportDom).add("viewport-dom");
	this._parent.appendChild(viewportDom);
	var overlay = this._overlay = document.createElement("div");
	classes(overlay).add("overlay");
	this._parent.appendChild(overlay);
};
Minimap.prototype._scheduleUpdate = function() {
	var self = this;
	if (!this.isOpen()) return;
	var debounceDelay = isNumber(this._config.debounceDelay) ? this._config.debounceDelay : DEFAULT_DEBOUNCE_DELAY;
	var debounceSkipDelay = isNumber(this._config.debounceSkipDelay) ? this._config.debounceSkipDelay : DEFAULT_DEBOUNCE_SKIP_DELAY;
	var now = Date.now();
	if (this._firstDebounceTime && now - this._firstDebounceTime >= debounceSkipDelay) {
		this._update();
		return;
	}
	if (this._updateTimeout) clearTimeout(this._updateTimeout);
	this._firstDebounceTime = this._firstDebounceTime || now;
	this._updateTimeout = setTimeout(function() {
		self._update();
	}, debounceDelay);
};
Minimap.prototype._rebuild = function() {
	this._clear();
	var canvas = this._canvas;
	var root = canvas.getRootElement && canvas.getRootElement();
	if (root && root.children) {
		var self = this;
		root.children.forEach(function(element) {
			self._addElement(element);
		});
	}
};
Minimap.prototype._update = function() {
	if (!this.isOpen()) return;
	if (this._updateTimeout) {
		clearTimeout(this._updateTimeout);
		this._updateTimeout = null;
	}
	this._firstDebounceTime = null;
	var viewbox = this._canvas.viewbox(), innerViewbox = viewbox.inner, outerViewbox = viewbox.outer;
	if (!validViewbox(viewbox)) return;
	var x, y, width, height;
	var widthDifference = outerViewbox.width - innerViewbox.width, heightDifference = outerViewbox.height - innerViewbox.height;
	if (innerViewbox.width < outerViewbox.width) {
		x = innerViewbox.x - widthDifference / 2;
		width = outerViewbox.width;
		if (innerViewbox.x + innerViewbox.width < outerViewbox.width) x = Math.min(0, innerViewbox.x);
	} else {
		x = innerViewbox.x;
		width = innerViewbox.width;
	}
	if (innerViewbox.height < outerViewbox.height) {
		y = innerViewbox.y - heightDifference / 2;
		height = outerViewbox.height;
		if (innerViewbox.y + innerViewbox.height < outerViewbox.height) y = Math.min(0, innerViewbox.y);
	} else {
		y = innerViewbox.y;
		height = innerViewbox.height;
	}
	x = x - MINIMAP_VIEWBOX_PADDING;
	y = y - MINIMAP_VIEWBOX_PADDING;
	width = width + MINIMAP_VIEWBOX_PADDING * 2;
	height = height + MINIMAP_VIEWBOX_PADDING * 2;
	this._lastViewbox = {
		x,
		y,
		width,
		height
	};
	attr$1(this._svg, { viewBox: x + ", " + y + ", " + width + ", " + height });
	attr$1(this._viewport, {
		x: viewbox.x,
		y: viewbox.y,
		width: viewbox.width,
		height: viewbox.height
	});
	var parentClientRect = this._state._parentClientRect = this._parent.getBoundingClientRect();
	var viewportClientRect = this._viewport.getBoundingClientRect();
	var withoutParentOffset = {
		top: viewportClientRect.top - parentClientRect.top,
		left: viewportClientRect.left - parentClientRect.left,
		width: viewportClientRect.width,
		height: viewportClientRect.height
	};
	assign(this._viewportDom.style, {
		top: withoutParentOffset.top + "px",
		left: withoutParentOffset.left + "px",
		width: withoutParentOffset.width + "px",
		height: withoutParentOffset.height + "px"
	});
	var clipPath = getOverlayClipPath(parentClientRect, withoutParentOffset);
	assign(this._overlay.style, { clipPath });
};
Minimap.prototype.open = function() {
	assign(this._state, { isOpen: true });
	classes(this._parent).add("open");
	var translate = this._injector.get("translate", false) || function(s) {
		return s;
	};
	attr(this._toggle, "title", translate("Close minimap"));
	attr(this._toggle, "aria-expanded", "true");
	if (this._dirty) {
		this._rebuild();
		this._dirty = false;
	}
	this._update();
	this._eventBus.fire("minimap.toggle", { open: true });
};
Minimap.prototype.close = function() {
	assign(this._state, { isOpen: false });
	classes(this._parent).remove("open");
	var translate = this._injector.get("translate", false) || function(s) {
		return s;
	};
	attr(this._toggle, "title", translate("Open minimap"));
	attr(this._toggle, "aria-expanded", "false");
	this._eventBus.fire("minimap.toggle", { open: false });
};
Minimap.prototype.toggle = function(open) {
	var currentOpen = this.isOpen();
	if (typeof open === "undefined") open = !currentOpen;
	if (open == currentOpen) return;
	if (open) this.open();
	else this.close();
};
Minimap.prototype.isOpen = function() {
	return this._state.isOpen;
};
Minimap.prototype._updateElement = function(element) {
	try {
		if (element.parent !== void 0 && element.parent !== null) {
			this._removeElement(element);
			this._addElement(element);
		}
	} catch (error) {
		console.warn("Minimap#_updateElement errored", error);
	}
};
Minimap.prototype._updateElementId = function(element, newId) {
	try {
		var elementGfx = query("#" + escapeCSS(this._prefixId(element.id)), this._elementsGroup);
		if (elementGfx) elementGfx.id = this._prefixId(newId);
	} catch (error) {
		console.warn("Minimap#_updateElementId errored", error);
	}
};
Minimap.prototype.isOnActivePlane = function(element) {
	var canvas = this._canvas;
	if (canvas.findRoot) return canvas.findRoot(element) === canvas.getRootElement();
	if (canvas.findPlane) return canvas.findPlane(element) === canvas.getActivePlane();
	return true;
};
Minimap.prototype._addElement = function(element) {
	var self = this;
	this._removeElement(element);
	if (!this.isOnActivePlane(element)) return;
	if (element.hidden) return;
	var parent, x, y;
	var newElementGfx = this._createElement(element);
	var newElementParentGfx = query("#" + escapeCSS(this._prefixId(element.parent.id)), this._elementsGroup);
	if (newElementGfx) {
		var index = getIndexOfChildInParent(element);
		if (index !== -1) {
			if (newElementParentGfx) insertChildAtIndex(newElementGfx, newElementParentGfx, index);
			else this._elementsGroup.appendChild(newElementGfx);
		} else this._elementsGroup.appendChild(newElementGfx);
		if (isConnection(element)) {
			parent = element.parent;
			x = 0;
			y = 0;
			if (typeof parent.x !== "undefined" && typeof parent.y !== "undefined") {
				x = -parent.x;
				y = -parent.y;
			}
			attr$1(newElementGfx, { transform: "translate(" + x + " " + y + ")" });
		} else {
			x = element.x;
			y = element.y;
			if (newElementParentGfx) {
				parent = element.parent;
				x -= parent.x;
				y -= parent.y;
			}
			attr$1(newElementGfx, { transform: "translate(" + x + " " + y + ")" });
		}
		if (element.children && element.children.length) element.children.forEach(function(child) {
			self._addElement(child);
		});
		return newElementGfx;
	}
};
Minimap.prototype._removeElement = function(element) {
	var elementGfx = this._svg.getElementById(this._prefixId(element.id));
	if (elementGfx) remove(elementGfx);
};
Minimap.prototype._createElement = function(element) {
	var gfx = this._elementRegistry.getGraphics(element), visual;
	if (gfx) {
		visual = getVisual(gfx);
		if (visual) {
			var elementGfx = sanitize(clone(visual));
			attr$1(elementGfx, { id: this._prefixId(element.id) });
			return elementGfx;
		}
	}
};
Minimap.prototype._clear = function() {
	clear(this._elementsGroup);
};
Minimap.prototype._prefixId = function(id) {
	return "djs-minimap-" + id + "-" + this._minimapId;
};
function isConnection(element) {
	return element.waypoints;
}
function getOffsetViewport(diagramPoint, viewbox) {
	var viewboxCenter = {
		x: viewbox.x + viewbox.width / 2,
		y: viewbox.y + viewbox.height / 2
	};
	return {
		x: diagramPoint.x - viewboxCenter.x,
		y: diagramPoint.y - viewboxCenter.y
	};
}
function mapMousePositionToDiagramPoint(position, svg, lastViewbox) {
	var boundingClientRect = svg.getBoundingClientRect();
	var bBox = fitAspectRatio(lastViewbox, boundingClientRect.width / boundingClientRect.height);
	return {
		x: map(position.x, 0, boundingClientRect.width, bBox.x, bBox.x + bBox.width),
		y: map(position.y, 0, boundingClientRect.height, bBox.y, bBox.y + bBox.height)
	};
}
function setViewboxCenteredAroundPoint(point, canvas) {
	var cachedViewbox = canvas.viewbox(), cachedViewboxWidth = cachedViewbox.width, cachedViewboxHeight = cachedViewbox.height;
	canvas.viewbox({
		x: point.x - cachedViewboxWidth / 2,
		y: point.y - cachedViewboxHeight / 2,
		width: cachedViewboxWidth,
		height: cachedViewboxHeight
	});
}
function fitAspectRatio(bounds, targetAspectRatio) {
	var aspectRatio = bounds.width / bounds.height;
	var newBounds = assign({}, {
		x: bounds.x,
		y: bounds.y,
		width: bounds.width,
		height: bounds.height
	});
	if (aspectRatio > targetAspectRatio) {
		var height = newBounds.width * (1 / targetAspectRatio), y = newBounds.y - (height - newBounds.height) / 2;
		assign(newBounds, {
			y,
			height
		});
	} else if (aspectRatio < targetAspectRatio) {
		var width = newBounds.height * targetAspectRatio, x = newBounds.x - (width - newBounds.width) / 2;
		assign(newBounds, {
			x,
			width
		});
	}
	return newBounds;
}
function map(x, inMin, inMax, outMin, outMax) {
	var inRange = inMax - inMin, outRange = outMax - outMin;
	return (x - inMin) * outRange / inRange + outMin;
}
function getIndexOfChildInParent(element) {
	var parent = element.parent;
	if (!parent || !parent.children) return -1;
	return parent.children.indexOf(element);
}
function insertChildAtIndex(childGfx, parentGfx, index) {
	var childAtIndex = getMinimapChildElements(parentGfx)[index];
	if (childAtIndex) parentGfx.insertBefore(childGfx, childAtIndex);
	else parentGfx.appendChild(childGfx);
}
function getMinimapChildElements(parentGfx) {
	return Array.from(parentGfx.childNodes).filter(function(node) {
		return node.id;
	});
}
function isZeroDimensional(clientRect) {
	return clientRect.width === 0 && clientRect.height === 0;
}
function isPointInside(point, rect) {
	return point.x > rect.left && point.x < rect.left + rect.width && point.y > rect.top && point.y < rect.top + rect.height;
}
var sign = Math.sign || function(n) {
	return n >= 0 ? 1 : -1;
};
function getStepSize(range, steps) {
	var minLinearRange = Math.log(range.min) / Math.log(10), maxLinearRange = Math.log(range.max) / Math.log(10);
	return (Math.abs(minLinearRange) + Math.abs(maxLinearRange)) / steps;
}
function cap(range, scale) {
	return Math.max(range.min, Math.min(range.max, scale));
}
function getOverlayClipPath(outer, inner) {
	return "polygon(" + [
		toCoordinatesString(inner.left, inner.top),
		toCoordinatesString(inner.left + inner.width, inner.top),
		toCoordinatesString(inner.left + inner.width, inner.top + inner.height),
		toCoordinatesString(inner.left, inner.top + inner.height),
		toCoordinatesString(inner.left, outer.height),
		toCoordinatesString(outer.width, outer.height),
		toCoordinatesString(outer.width, 0),
		toCoordinatesString(0, 0),
		toCoordinatesString(0, outer.height),
		toCoordinatesString(inner.left, outer.height)
	].join(", ") + ")";
}
function toCoordinatesString(x, y) {
	return x + "px " + y + "px";
}
function validViewbox(viewBox) {
	return every(viewBox, function(value) {
		if (isObject(value)) return validViewbox(value);
		return isNumber(value) && isFinite(value);
	});
}
function getPoint(event) {
	if (event.center) return event.center;
	return {
		x: event.clientX,
		y: event.clientY
	};
}
function sanitize(gfx) {
	all("[id]", gfx).forEach(function(element) {
		element.remove();
	});
	return gfx;
}
var index = {
	__init__: ["minimap"],
	minimap: ["type", Minimap]
};
export { index as t };

//# sourceMappingURL=index.esm-CXJiDiAL.js.map