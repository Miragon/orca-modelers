import { A as pick, C as isObject, F as sortBy, M as set$2, O as matchPattern, S as isNumber, T as isUndefined$1, _ as init_dist, a as bind$1, b as isFunction, c as every, d as findIndex, g as has, h as groupBy, i as assign$1, j as reduce, l as filter, o as debounce, p as forEach, r as domify, t as escapeCSS, u as find, v as isArray$2, w as isString, x as isNil, y as isDefined } from "./EscapeUtil-3RypN4fl.js";
//#region ../../libs/modeler-types/src/errors.ts
var NoModelerError = class extends Error {
	constructor() {
		super("Modeler is not initialized!");
	}
};
var UnsupportedEngineError = class extends Error {
	constructor(engine) {
		super(`Unsupported engine: ${engine}`);
	}
};
//#endregion
//#region ../../libs/modeler-types/src/canvasResize.ts
function isUsableViewbox(viewbox) {
	if (!viewbox) return false;
	const { x, y, width, height } = viewbox;
	return Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(width) && width > 0 && Number.isFinite(height) && height > 0;
}
function observeCanvasSize(canvas, container, options = {}) {
	const createObserver = options.createObserver ?? defaultObserverFactory();
	if (!createObserver) return () => void 0;
	let applied = options.applyInitialViewport === void 0;
	const observer = createObserver(() => {
		canvas.resized();
		if (!applied) applied = options.applyInitialViewport();
	});
	observer.observe(container);
	return () => observer.disconnect();
}
function defaultObserverFactory() {
	const Observer = globalThis.ResizeObserver;
	return Observer ? (onResize) => new Observer(onResize) : void 0;
}
//#endregion
//#region ../../libs/modeler-types/src/disposableStore.ts
var DisposableStore = class {
	constructor() {
		this.disposers = [];
		this.disposed = false;
	}
	get isDisposed() {
		return this.disposed;
	}
	add(...disposers) {
		if (this.disposed) {
			for (let index = disposers.length - 1; index >= 0; index--) disposers[index]();
			return;
		}
		this.disposers.push(...disposers);
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		const pending = this.disposers.splice(0).reverse();
		let firstError;
		let failed = false;
		for (const disposer of pending) try {
			disposer();
		} catch (error) {
			if (!failed) {
				failed = true;
				firstError = error;
			}
		}
		if (failed) throw firstError;
	}
};
var MutableDisposable = class {
	constructor() {
		this.disposed = false;
	}
	set(disposer) {
		const previous = this.current;
		this.current = void 0;
		previous?.();
		if (disposer === void 0) return;
		if (this.disposed) {
			disposer();
			return;
		}
		this.current = disposer;
	}
	dispose() {
		this.disposed = true;
		const previous = this.current;
		this.current = void 0;
		previous?.();
	}
};
function subscribe(bus, event, handler) {
	bus.on(event, handler);
	return () => bus.off(event, handler);
}
//#endregion
//#region ../../libs/modeler-types/src/canvasFocusIndicator.ts
var FOCUS_WEAK_SVG = `<svg class="canvas-focus-indicator__off" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M367-367q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm169.5-56.5Q560-447 560-480t-23.5-56.5Q513-560 480-560t-56.5 23.5Q400-513 400-480t23.5 56.5Q447-400 480-400t56.5-23.5ZM480-480ZM200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80Z"/></svg>`;
var FOCUS_STRONG_SVG = `<svg class="canvas-focus-indicator__on" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80ZM338.5-338.5Q280-397 280-480t58.5-141.5Q397-680 480-680t141.5 58.5Q680-563 680-480t-58.5 141.5Q563-280 480-280t-141.5-58.5Z"/></svg>`;
function installCanvasFocusIndicator(deps) {
	const root = document.createElement("div");
	root.className = "canvas-focus-indicator";
	root.setAttribute("aria-hidden", "true");
	root.innerHTML = FOCUS_WEAK_SVG + FOCUS_STRONG_SVG;
	let focused = deps.isFocused();
	let hasSelection = deps.hasSelection();
	const render = () => {
		root.classList.toggle("is-focused", focused && !hasSelection);
	};
	render();
	deps.onFocusChanged((nowFocused) => {
		focused = nowFocused;
		render();
	});
	deps.onSelectionChanged((nowHasSelection) => {
		hasSelection = nowHasSelection;
		render();
	});
	deps.parent.append(root);
	return () => root.remove();
}
//#endregion
//#region ../../libs/modeler-types/src/surfaceTheme.ts
var ThemeController = class {
	constructor(scopeRoots, attribute) {
		this.scopeRoots = scopeRoots;
		this.attribute = attribute;
		this.disposed = false;
	}
	setMode(mode) {
		if (this.disposed || mode === this.mode) return;
		this.mode = mode;
		if (mode === "automatic") this.startFollowingPreferredScheme();
		else {
			this.stopFollowingPreferredScheme();
			this.apply(mode);
		}
	}
	dispose() {
		this.disposed = true;
		this.stopFollowingPreferredScheme();
		for (const root of this.scopeRoots) root.removeAttribute(this.attribute);
	}
	apply(kind) {
		for (const root of this.scopeRoots) root.setAttribute(this.attribute, kind);
		applyLegacyThemeLink(kind);
	}
	startFollowingPreferredScheme() {
		const query = window.matchMedia("(prefers-color-scheme: dark)");
		this.apply(query.matches ? "dark" : "light");
		if (this.mediaListener) return;
		this.mediaQuery = query;
		this.mediaListener = (event) => {
			if (this.mode === "automatic") this.apply(event.matches ? "dark" : "light");
		};
		this.mediaQuery.addEventListener("change", this.mediaListener);
	}
	stopFollowingPreferredScheme() {
		if (this.mediaQuery && this.mediaListener) this.mediaQuery.removeEventListener("change", this.mediaListener);
		this.mediaQuery = void 0;
		this.mediaListener = void 0;
	}
};
function applyLegacyThemeLink(kind) {
	const theme = document.querySelector("#theme-link");
	if (!theme) return;
	const href = theme.href;
	const css = href.split("/").pop();
	if (kind === "dark" && css === "lightTheme.css") theme.href = href.replace(/lightTheme\.css$/, "darkTheme.css");
	else if (kind === "light" && css === "darkTheme.css") theme.href = href.replace(/darkTheme\.css$/, "lightTheme.css");
}
//#endregion
//#region ../../node_modules/diagram-js/lib/core/EventBus.js
init_dist();
var FN_REF = "__fn";
var DEFAULT_PRIORITY$4 = 1e3;
var slice$1 = Array.prototype.slice;
function EventBus() {
	this._listeners = {};
	this.on("diagram.destroy", 1, this._destroy, this);
}
EventBus.prototype.on = function(events, priority, callback, that) {
	events = isArray$2(events) ? events : [events];
	if (isFunction(priority)) {
		that = callback;
		callback = priority;
		priority = DEFAULT_PRIORITY$4;
	}
	if (!isNumber(priority)) throw new Error("priority must be a number");
	var actualCallback = callback;
	if (that) {
		actualCallback = bind$1(callback, that);
		actualCallback[FN_REF] = callback[FN_REF] || callback;
	}
	var self = this;
	events.forEach(function(e) {
		self._addListener(e, {
			priority,
			callback: actualCallback,
			next: null
		});
	});
};
EventBus.prototype.once = function(events, priority, callback, that) {
	var self = this;
	if (isFunction(priority)) {
		that = callback;
		callback = priority;
		priority = DEFAULT_PRIORITY$4;
	}
	if (!isNumber(priority)) throw new Error("priority must be a number");
	function wrappedCallback() {
		wrappedCallback.__isTomb = true;
		var result = callback.apply(that, arguments);
		self.off(events, wrappedCallback);
		return result;
	}
	wrappedCallback[FN_REF] = callback;
	this.on(events, priority, wrappedCallback);
};
EventBus.prototype.off = function(events, callback) {
	events = isArray$2(events) ? events : [events];
	var self = this;
	events.forEach(function(event) {
		self._removeListener(event, callback);
	});
};
EventBus.prototype.createEvent = function(data) {
	var event = new InternalEvent();
	event.init(data);
	return event;
};
EventBus.prototype.fire = function(type, data) {
	var event, firstListener, returnValue, args = slice$1.call(arguments);
	if (typeof type === "object") {
		data = type;
		type = data.type;
	}
	if (!type) throw new Error("no event type specified");
	firstListener = this._listeners[type];
	if (!firstListener) return;
	if (data instanceof InternalEvent) event = data;
	else event = this.createEvent(data);
	args[0] = event;
	var originalType = event.type;
	if (type !== originalType) event.type = type;
	try {
		returnValue = this._invokeListeners(event, args, firstListener);
	} finally {
		if (type !== originalType) event.type = originalType;
	}
	if (returnValue === void 0 && event.defaultPrevented) returnValue = false;
	return returnValue;
};
EventBus.prototype.handleError = function(error) {
	return this.fire("error", { error }) === false;
};
EventBus.prototype._destroy = function() {
	this._listeners = {};
};
EventBus.prototype._invokeListeners = function(event, args, listener) {
	var returnValue;
	while (listener) {
		if (event.cancelBubble) break;
		returnValue = this._invokeListener(event, args, listener);
		listener = listener.next;
	}
	return returnValue;
};
EventBus.prototype._invokeListener = function(event, args, listener) {
	var returnValue;
	if (listener.callback.__isTomb) return returnValue;
	try {
		returnValue = invokeFunction(listener.callback, args);
		if (returnValue !== void 0) {
			event.returnValue = returnValue;
			event.stopPropagation();
		}
		if (returnValue === false) event.preventDefault();
	} catch (error) {
		if (!this.handleError(error)) {
			console.error("unhandled error in event listener", error);
			throw error;
		}
	}
	return returnValue;
};
EventBus.prototype._addListener = function(event, newListener) {
	var listener = this._getListeners(event), previousListener;
	if (!listener) {
		this._setListeners(event, newListener);
		return;
	}
	while (listener) {
		if (listener.priority < newListener.priority) {
			newListener.next = listener;
			if (previousListener) previousListener.next = newListener;
			else this._setListeners(event, newListener);
			return;
		}
		previousListener = listener;
		listener = listener.next;
	}
	previousListener.next = newListener;
};
EventBus.prototype._getListeners = function(name) {
	return this._listeners[name];
};
EventBus.prototype._setListeners = function(name, listener) {
	this._listeners[name] = listener;
};
EventBus.prototype._removeListener = function(event, callback) {
	var listener = this._getListeners(event), nextListener, previousListener, listenerCallback;
	if (!callback) {
		this._setListeners(event, null);
		return;
	}
	while (listener) {
		nextListener = listener.next;
		listenerCallback = listener.callback;
		if (listenerCallback === callback || listenerCallback[FN_REF] === callback) {
			if (previousListener) previousListener.next = nextListener;
			else this._setListeners(event, nextListener);
		}
		previousListener = listener;
		listener = nextListener;
	}
};
function InternalEvent() {}
InternalEvent.prototype.stopPropagation = function() {
	this.cancelBubble = true;
};
InternalEvent.prototype.preventDefault = function() {
	this.defaultPrevented = true;
};
InternalEvent.prototype.init = function(data) {
	assign$1(this, data || {});
};
function invokeFunction(fn, args) {
	return fn.apply(null, args);
}
//#endregion
//#region ../../node_modules/moddle/dist/index.js
init_dist();
function Base() {}
Base.prototype.get = function(name) {
	return this.$model.properties.get(this, name);
};
Base.prototype.set = function(name, value) {
	this.$model.properties.set(this, name, value);
};
function Factory(model, properties) {
	this.model = model;
	this.properties = properties;
}
Factory.prototype.createType = function(descriptor) {
	var model = this.model;
	var props = this.properties, prototype = Object.create(Base.prototype);
	forEach(descriptor.properties, function(p) {
		if (!p.isMany && p.default !== void 0) prototype[p.name] = p.default;
	});
	props.defineModel(prototype, model);
	props.defineDescriptor(prototype, descriptor);
	var name = descriptor.ns.name;
	function ModdleElement(attrs) {
		props.define(this, "$type", {
			value: name,
			enumerable: true
		});
		props.define(this, "$attrs", { value: {} });
		props.define(this, "$parent", { writable: true });
		forEach(attrs, bind$1(function(val, key) {
			this.set(key, val);
		}, this));
	}
	ModdleElement.prototype = prototype;
	ModdleElement.hasType = prototype.$instanceOf = this.model.hasType;
	props.defineModel(ModdleElement, model);
	props.defineDescriptor(ModdleElement, descriptor);
	return ModdleElement;
};
var BUILTINS = assign$1(Object.create(null), {
	String: true,
	Boolean: true,
	Integer: true,
	Real: true,
	Element: true
});
var TYPE_CONVERTERS = assign$1(Object.create(null), {
	String: function(s) {
		return s;
	},
	Boolean: function(s) {
		return s === "true";
	},
	Integer: function(s) {
		return parseInt(s, 10);
	},
	Real: function(s) {
		return parseFloat(s);
	}
});
function coerceType(type, value) {
	var converter = TYPE_CONVERTERS[type];
	if (converter) return converter(value);
	else return value;
}
function isBuiltIn(type) {
	return !!BUILTINS[type];
}
function isSimple(type) {
	return !!TYPE_CONVERTERS[type];
}
function parseName(name, defaultPrefix) {
	var parts = name.split(/:/), localName, prefix;
	if (parts.length === 1) {
		localName = name;
		prefix = defaultPrefix;
	} else if (parts.length === 2) {
		localName = parts[1];
		prefix = parts[0];
	} else throw new Error("expected <prefix:localName> or <localName>, got " + name);
	name = (prefix ? prefix + ":" : "") + localName;
	return {
		name,
		prefix,
		localName
	};
}
function DescriptorBuilder(nameNs) {
	this.ns = nameNs;
	this.name = nameNs.name;
	this.allTypes = [];
	this.allTypesByName = Object.create(null);
	this.properties = [];
	this.propertiesByName = Object.create(null);
}
DescriptorBuilder.prototype.build = function() {
	return pick(this, [
		"ns",
		"name",
		"allTypes",
		"allTypesByName",
		"properties",
		"propertiesByName",
		"bodyProperty",
		"idProperty"
	]);
};
DescriptorBuilder.prototype.addProperty = function(p, idx, validate) {
	if (typeof idx === "boolean") {
		validate = idx;
		idx = void 0;
	}
	this.addNamedProperty(p, validate !== false);
	var properties = this.properties;
	if (idx !== void 0) properties.splice(idx, 0, p);
	else properties.push(p);
};
DescriptorBuilder.prototype.replaceProperty = function(oldProperty, newProperty, replace) {
	var oldNameNs = oldProperty.ns;
	var props = this.properties, propertiesByName = this.propertiesByName, rename = oldProperty.name !== newProperty.name;
	if (oldProperty.isId) {
		if (!newProperty.isId) throw new Error("property <" + newProperty.ns.name + "> must be id property to refine <" + oldProperty.ns.name + ">");
		this.setIdProperty(newProperty, false);
	}
	if (oldProperty.isBody) {
		if (!newProperty.isBody) throw new Error("property <" + newProperty.ns.name + "> must be body property to refine <" + oldProperty.ns.name + ">");
		this.setBodyProperty(newProperty, false);
	}
	var idx = props.indexOf(oldProperty);
	if (idx === -1) throw new Error("property <" + oldNameNs.name + "> not found in property list");
	props.splice(idx, 1);
	this.addProperty(newProperty, replace ? void 0 : idx, rename);
	propertiesByName[oldNameNs.name] = propertiesByName[oldNameNs.localName] = newProperty;
};
DescriptorBuilder.prototype.redefineProperty = function(p, targetPropertyName, replace) {
	var nsPrefix = p.ns.prefix;
	var parts = targetPropertyName.split("#");
	var name = parseName(parts[0], nsPrefix);
	var attrName = parseName(parts[1], name.prefix).name;
	var redefinedProperty = this.propertiesByName[attrName];
	if (!redefinedProperty) throw new Error("refined property <" + attrName + "> not found");
	else this.replaceProperty(redefinedProperty, p, replace);
	delete p.redefines;
};
DescriptorBuilder.prototype.addNamedProperty = function(p, validate) {
	var ns = p.ns, propsByName = this.propertiesByName;
	if (validate) {
		this.assertNotDefined(p, ns.name);
		this.assertNotDefined(p, ns.localName);
	}
	propsByName[ns.name] = propsByName[ns.localName] = p;
};
DescriptorBuilder.prototype.removeNamedProperty = function(p) {
	var ns = p.ns, propsByName = this.propertiesByName;
	delete propsByName[ns.name];
	delete propsByName[ns.localName];
};
DescriptorBuilder.prototype.setBodyProperty = function(p, validate) {
	if (validate && this.bodyProperty) throw new Error("body property defined multiple times (<" + this.bodyProperty.ns.name + ">, <" + p.ns.name + ">)");
	this.bodyProperty = p;
};
DescriptorBuilder.prototype.setIdProperty = function(p, validate) {
	if (validate && this.idProperty) throw new Error("id property defined multiple times (<" + this.idProperty.ns.name + ">, <" + p.ns.name + ">)");
	this.idProperty = p;
};
DescriptorBuilder.prototype.assertNotTrait = function(typeDescriptor) {
	if ((typeDescriptor.extends || []).length) throw new Error(`cannot create <${typeDescriptor.name}> extending <${typeDescriptor.extends}>`);
};
DescriptorBuilder.prototype.assertNotDefined = function(p, name) {
	var propertyName = p.name, definedProperty = this.propertiesByName[propertyName];
	if (definedProperty) throw new Error("property <" + propertyName + "> already defined; override of <" + definedProperty.definedBy.ns.name + "#" + definedProperty.ns.name + "> by <" + p.definedBy.ns.name + "#" + p.ns.name + "> not allowed without redefines");
};
DescriptorBuilder.prototype.hasProperty = function(name) {
	return this.propertiesByName[name];
};
DescriptorBuilder.prototype.addTrait = function(t, inherited) {
	if (inherited) this.assertNotTrait(t);
	var typesByName = this.allTypesByName, types = this.allTypes;
	var typeName = t.name;
	if (typeName in typesByName) return;
	forEach(t.properties, bind$1(function(p) {
		p = assign$1({}, p, {
			name: p.ns.localName,
			inherited
		});
		Object.defineProperty(p, "definedBy", { value: t });
		var replaces = p.replaces, redefines = p.redefines;
		if (replaces || redefines) this.redefineProperty(p, replaces || redefines, replaces);
		else {
			if (p.isBody) this.setBodyProperty(p);
			if (p.isId) this.setIdProperty(p);
			this.addProperty(p);
		}
	}, this));
	types.push(t);
	typesByName[typeName] = t;
};
function Registry(packages, properties) {
	this.packageMap = Object.create(null);
	this.typeMap = Object.create(null);
	this.packages = [];
	this.properties = properties;
	forEach(packages, bind$1(this.registerPackage, this));
}
Registry.prototype.getPackage = function(uriOrPrefix) {
	return this.packageMap[uriOrPrefix];
};
Registry.prototype.getPackages = function() {
	return this.packages;
};
Registry.prototype.registerPackage = function(pkg) {
	pkg = assign$1({}, pkg);
	var pkgMap = this.packageMap;
	ensureAvailable(pkgMap, pkg, "prefix");
	ensureAvailable(pkgMap, pkg, "uri");
	forEach(pkg.types, bind$1(function(descriptor) {
		this.registerType(descriptor, pkg);
	}, this));
	pkgMap[pkg.uri] = pkgMap[pkg.prefix] = pkg;
	this.packages.push(pkg);
};
Registry.prototype.registerType = function(type, pkg) {
	type = assign$1({}, type, {
		superClass: (type.superClass || []).slice(),
		extends: (type.extends || []).slice(),
		properties: (type.properties || []).slice(),
		meta: assign$1({}, type.meta || {})
	});
	var ns = parseName(type.name, pkg.prefix), name = ns.name, propertiesByName = Object.create(null);
	forEach(type.properties, bind$1(function(p) {
		var propertyNs = parseName(p.name, ns.prefix), propertyName = propertyNs.name;
		if (!isBuiltIn(p.type)) p.type = parseName(p.type, propertyNs.prefix).name;
		assign$1(p, {
			ns: propertyNs,
			name: propertyName
		});
		propertiesByName[propertyName] = p;
	}, this));
	assign$1(type, {
		ns,
		name,
		propertiesByName
	});
	forEach(type.extends, bind$1(function(extendsName) {
		var extendsNameNs = parseName(extendsName, ns.prefix);
		var extended = this.typeMap[extendsNameNs.name];
		extended.traits = extended.traits || [];
		extended.traits.push(name);
	}, this));
	this.definePackage(type, pkg);
	this.typeMap[name] = type;
};
Registry.prototype.mapTypes = function(nsName, iterator, trait) {
	var type = isBuiltIn(nsName.name) ? { name: nsName.name } : this.typeMap[nsName.name];
	var self = this;
	function traverse(cls, trait) {
		var parentNs = parseName(cls, isBuiltIn(cls) ? "" : nsName.prefix);
		self.mapTypes(parentNs, iterator, trait);
	}
	function traverseTrait(cls) {
		return traverse(cls, true);
	}
	function traverseSuper(cls) {
		return traverse(cls, false);
	}
	if (!type) throw new Error("unknown type <" + nsName.name + ">");
	forEach(type.superClass, trait ? traverseTrait : traverseSuper);
	iterator(type, !trait);
	forEach(type.traits, traverseTrait);
};
Registry.prototype.getEffectiveDescriptor = function(name) {
	var nsName = parseName(name);
	var builder = new DescriptorBuilder(nsName);
	this.mapTypes(nsName, function(type, inherited) {
		builder.addTrait(type, inherited);
	});
	var descriptor = builder.build();
	this.definePackage(descriptor, descriptor.allTypes[descriptor.allTypes.length - 1].$pkg);
	return descriptor;
};
Registry.prototype.definePackage = function(target, pkg) {
	this.properties.define(target, "$pkg", { value: pkg });
};
function ensureAvailable(packageMap, pkg, identifierKey) {
	var value = pkg[identifierKey];
	if (value in packageMap) throw new Error("package with " + identifierKey + " <" + value + "> already defined");
}
function Properties(model) {
	this.model = model;
}
Properties.prototype.set = function(target, name, value) {
	if (!isString(name) || !name.length) throw new TypeError("property name must be a non-empty string");
	var property = this.getProperty(target, name);
	var propertyName = property && property.name;
	if (isUndefined(value)) {
		if (property) delete target[propertyName];
		else delete target.$attrs[stripGlobal(name)];
	} else if (property) {
		if (propertyName in target) target[propertyName] = value;
		else defineProperty$1(target, property, value);
	} else target.$attrs[stripGlobal(name)] = value;
};
Properties.prototype.get = function(target, name) {
	var property = this.getProperty(target, name);
	if (!property) return target.$attrs[stripGlobal(name)];
	var propertyName = property.name;
	if (!target[propertyName] && property.isMany) defineProperty$1(target, property, []);
	return target[propertyName];
};
Properties.prototype.define = function(target, name, options) {
	if (!options.writable) {
		var value = options.value;
		options = assign$1({}, options, { get: function() {
			return value;
		} });
		delete options.value;
	}
	Object.defineProperty(target, name, options);
};
Properties.prototype.defineDescriptor = function(target, descriptor) {
	this.define(target, "$descriptor", { value: descriptor });
};
Properties.prototype.defineModel = function(target, model) {
	this.define(target, "$model", { value: model });
};
Properties.prototype.getProperty = function(target, name) {
	var model = this.model;
	var property = model.getPropertyDescriptor(target, name);
	if (property) return property;
	if (name.includes(":")) return null;
	const strict = model.config.strict;
	if (typeof strict !== "undefined") {
		const error = new TypeError(`unknown property <${name}> on <${target.$type}>`);
		if (strict) throw error;
		else typeof console !== "undefined" && console.warn(error);
	}
	return null;
};
function isUndefined(val) {
	return typeof val === "undefined";
}
function defineProperty$1(target, property, value) {
	Object.defineProperty(target, property.name, {
		enumerable: !property.isReference,
		writable: true,
		value,
		configurable: true
	});
}
function stripGlobal(name) {
	return name.replace(/^:/, "");
}
function Moddle(packages, config = {}) {
	this.properties = new Properties(this);
	this.factory = new Factory(this, this.properties);
	this.registry = new Registry(packages, this.properties);
	this.typeCache = Object.create(null);
	this.config = config;
}
Moddle.prototype.create = function(descriptor, attrs) {
	var Type = this.getType(descriptor);
	if (!Type) throw new Error("unknown type <" + descriptor + ">");
	return new Type(attrs);
};
Moddle.prototype.getType = function(descriptor) {
	var cache = this.typeCache;
	var name = isString(descriptor) ? descriptor : descriptor.ns.name;
	var type = cache[name];
	if (!type) {
		descriptor = this.registry.getEffectiveDescriptor(name);
		type = cache[name] = this.factory.createType(descriptor);
	}
	return type;
};
Moddle.prototype.createAny = function(name, nsUri, properties) {
	var nameNs = parseName(name);
	var element = {
		$type: name,
		$instanceOf: function(type) {
			return type === this.$type;
		},
		get: function(key) {
			return this[key];
		},
		set: function(key, value) {
			set$2(this, [key], value);
		}
	};
	var descriptor = {
		name,
		isGeneric: true,
		ns: {
			prefix: nameNs.prefix,
			localName: nameNs.localName,
			uri: nsUri
		}
	};
	this.properties.defineDescriptor(element, descriptor);
	this.properties.defineModel(element, this);
	this.properties.define(element, "get", {
		enumerable: false,
		writable: true
	});
	this.properties.define(element, "set", {
		enumerable: false,
		writable: true
	});
	this.properties.define(element, "$parent", {
		enumerable: false,
		writable: true
	});
	this.properties.define(element, "$instanceOf", {
		enumerable: false,
		writable: true
	});
	forEach(properties, function(a, key) {
		if (isObject(a) && a.value !== void 0) element[a.name] = a.value;
		else element[key] = a;
	});
	return element;
};
Moddle.prototype.getPackage = function(uriOrPrefix) {
	return this.registry.getPackage(uriOrPrefix);
};
Moddle.prototype.getPackages = function() {
	return this.registry.getPackages();
};
Moddle.prototype.getElementDescriptor = function(element) {
	return element.$descriptor;
};
Moddle.prototype.hasType = function(element, type) {
	if (type === void 0) {
		type = element;
		element = this;
	}
	var descriptor = element.$model.getElementDescriptor(element);
	return type in descriptor.allTypesByName;
};
Moddle.prototype.getPropertyDescriptor = function(element, property) {
	return this.getElementDescriptor(element).propertiesByName[property];
};
Moddle.prototype.getTypeDescriptor = function(type) {
	return this.registry.typeMap[type];
};
//#endregion
//#region ../../node_modules/saxen/dist/index.js
var fromCharCode = String.fromCharCode;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var ENTITY_PATTERN = /&#(\d+);|&#x([0-9a-f]+);|&(\w+);/gi;
var ENTITY_MAPPING = {
	"amp": "&",
	"apos": "'",
	"gt": ">",
	"lt": "<",
	"quot": "\""
};
Object.keys(ENTITY_MAPPING).forEach(function(k) {
	ENTITY_MAPPING[k.toUpperCase()] = ENTITY_MAPPING[k];
});
function replaceEntities(_, d, x, z) {
	if (z) {
		if (hasOwnProperty$1.call(ENTITY_MAPPING, z)) return ENTITY_MAPPING[z];
		else return "&" + z + ";";
	}
	if (d) return fromCharCode(d);
	return fromCharCode(parseInt(x, 16));
}
function decodeEntities(s) {
	if (s.length > 3 && s.indexOf("&") !== -1) return s.replace(ENTITY_PATTERN, replaceEntities);
	return s;
}
var NON_WHITESPACE_OUTSIDE_ROOT_NODE = "non-whitespace outside of root node";
function error$1(msg) {
	return new Error(msg);
}
function missingNamespaceForPrefix(prefix) {
	return "missing namespace for prefix <" + prefix + ">";
}
function getter(getFn) {
	return {
		"get": getFn,
		"enumerable": true
	};
}
function setNsEntry(nsMatrix, changes, key, value) {
	if (!(key in changes)) changes[key] = key in nsMatrix ? nsMatrix[key] : null;
	nsMatrix[key] = value;
}
function restoreNsMatrix(nsMatrix, changes) {
	var key, value;
	for (key in changes) {
		value = changes[key];
		if (value === null) delete nsMatrix[key];
		else nsMatrix[key] = value;
	}
}
function uriPrefix(prefix) {
	return prefix + "$uri";
}
function buildNsMatrix(nsUriToPrefix) {
	var nsMatrix = Object.create(null), uri, prefix;
	for (uri in nsUriToPrefix) {
		prefix = nsUriToPrefix[uri];
		nsMatrix[prefix] = prefix;
		nsMatrix[uriPrefix(prefix)] = uri;
	}
	return nsMatrix;
}
function noopGetContext() {
	return {
		line: 0,
		column: 0
	};
}
function throwFunc(err) {
	throw err;
}
function Parser(options) {
	if (!this) return new Parser(options);
	var proxy = options && options["proxy"];
	var onText, onOpenTag, onCloseTag, onCDATA, onError = throwFunc, onWarning, onComment, onQuestion, onAttention;
	var getContext = noopGetContext;
	var streaming = false;
	var rootTagFound = false;
	var leftoverXml = "";
	var maybeNS = false;
	var isNamespace = false;
	var returnError = null;
	var parseStop = false;
	var nsChangesStack, nsMatrix, nodeStack;
	var nsUriToPrefix;
	function handleError(err) {
		if (!(err instanceof Error)) err = error$1(err);
		returnError = err;
		onError(err, getContext);
	}
	function handleWarning(err) {
		if (!onWarning) return;
		if (!(err instanceof Error)) err = error$1(err);
		onWarning(err, getContext);
	}
	this["on"] = function(name, cb) {
		if (typeof cb !== "function") throw error$1("required args <name, cb>");
		switch (name) {
			case "openTag":
				onOpenTag = cb;
				break;
			case "text":
				onText = cb;
				break;
			case "closeTag":
				onCloseTag = cb;
				break;
			case "error":
				onError = cb;
				break;
			case "warn":
				onWarning = cb;
				break;
			case "cdata":
				onCDATA = cb;
				break;
			case "attention":
				onAttention = cb;
				break;
			case "question":
				onQuestion = cb;
				break;
			case "comment":
				onComment = cb;
				break;
			default: throw error$1("unsupported event: " + name);
		}
		return this;
	};
	this["ns"] = function(nsMap) {
		if (typeof nsMap === "undefined") nsMap = {};
		if (typeof nsMap !== "object") throw error$1("required args <nsMap={}>");
		var _nsUriToPrefix = Object.create(null), k;
		for (k in nsMap) _nsUriToPrefix[k] = nsMap[k];
		isNamespace = true;
		nsUriToPrefix = _nsUriToPrefix;
		return this;
	};
	function resetState() {
		nsChangesStack = isNamespace ? [] : null;
		nsMatrix = isNamespace ? buildNsMatrix(nsUriToPrefix) : null;
		nodeStack = [];
		getContext = noopGetContext;
		parseStop = false;
		returnError = null;
		rootTagFound = false;
		leftoverXml = "";
	}
	this["parse"] = function(xml) {
		if (typeof xml !== "string") throw error$1("required args <xml=string>");
		if (streaming) throw error$1("parse during stream; call end() first");
		resetState();
		parse(xml);
		getContext = noopGetContext;
		parseStop = false;
		return returnError;
	};
	this["write"] = function(xml) {
		if (typeof xml !== "string") throw error$1("required args <xml=string>");
		if (!streaming) {
			resetState();
			streaming = true;
		}
		if (!returnError) leftoverXml = parse(leftoverXml + xml, true) || "";
		return this;
	};
	this["end"] = function() {
		if (!streaming) resetState();
		streaming = false;
		if (!returnError) parse(leftoverXml);
		leftoverXml = "";
		getContext = noopGetContext;
		parseStop = false;
		return returnError;
	};
	this["stop"] = function() {
		parseStop = true;
	};
	function parse(xml, streaming = false) {
		var elNameCache = null;
		var nsChanges, nsSnapshot, anonymousNsCount = 0, tagStart = false, tagEnd = false, i = 0, j = 0, x, y, q, w, v, xmlns, elementName, _elementName, elementProxy;
		var attrsString = "", attrsStart = 0, cachedAttrs;
		function normalizeAttrName(name, defaultAlias) {
			var w = name.indexOf(":");
			if (w === -1) return name;
			var nsName = nsMatrix[name.substring(0, w)];
			if (!nsName) {
				handleWarning(missingNamespaceForPrefix(name.substring(0, w)));
				return null;
			}
			return defaultAlias === nsName ? name.substr(w + 1) : nsName + name.substr(w);
		}
		function getAttrs() {
			if (cachedAttrs !== null) return cachedAttrs;
			var nsUri, nsUriPrefix, defaultAlias = isNamespace && nsMatrix["xmlns"], attrList = isNamespace && maybeNS ? [] : null, i = attrsStart, s = attrsString, l = s.length, newalias, value, alias, name, attrs = {}, seenAttrs = new Set(), skipAttr, w, j;
			parseAttr: for (; i < l; i++) {
				skipAttr = false;
				w = s.charCodeAt(i);
				if (w === 32 || w < 14 && w > 8) continue;
				if (w < 65 || w > 122 || w > 90 && w < 97) {
					if (w !== 95 && w !== 58) {
						handleWarning("illegal first char attribute name");
						skipAttr = true;
					}
				}
				for (j = i + 1; j < l; j++) {
					w = s.charCodeAt(j);
					if (w > 96 && w < 123 || w > 64 && w < 91 || w > 47 && w < 59 || w === 46 || w === 45 || w === 95) continue;
					if (w === 32 || w < 14 && w > 8) {
						handleWarning("missing attribute value");
						i = j;
						continue parseAttr;
					}
					if (w === 61) break;
					handleWarning("illegal attribute name char");
					skipAttr = true;
				}
				name = s.substring(i, j);
				if (name === "xmlns:xmlns") {
					handleWarning("illegal declaration of xmlns");
					skipAttr = true;
				}
				w = s.charCodeAt(j + 1);
				if (w === 34) {
					j = s.indexOf("\"", i = j + 2);
					if (j === -1) {
						j = s.indexOf("'", i);
						if (j !== -1) {
							handleWarning("attribute value quote missmatch");
							skipAttr = true;
						}
					}
				} else if (w === 39) {
					j = s.indexOf("'", i = j + 2);
					if (j === -1) {
						j = s.indexOf("\"", i);
						if (j !== -1) {
							handleWarning("attribute value quote missmatch");
							skipAttr = true;
						}
					}
				} else {
					handleWarning("missing attribute value quotes");
					skipAttr = true;
					for (j = j + 1; j < l; j++) {
						w = s.charCodeAt(j + 1);
						if (w === 32 || w < 14 && w > 8) break;
					}
				}
				if (j === -1) {
					handleWarning("missing closing quotes");
					j = l;
					skipAttr = true;
				}
				if (!skipAttr) value = s.substring(i, j);
				if (name === "xmlns:xml" && value !== "http://www.w3.org/XML/1998/namespace") handleError("illegal value of xmlns:xml");
				i = j;
				for (; j + 1 < l; j++) {
					w = s.charCodeAt(j + 1);
					if (w === 32 || w < 14 && w > 8) break;
					if (i === j) {
						handleWarning("illegal character after attribute end");
						skipAttr = true;
					}
				}
				i = j + 1;
				if (skipAttr) continue parseAttr;
				if (seenAttrs.has(name)) {
					handleWarning("attribute <" + name + "> already defined");
					continue;
				}
				seenAttrs.add(name);
				if (!isNamespace) {
					attrs[name] = value;
					continue;
				}
				if (maybeNS) {
					newalias = name === "xmlns" ? "xmlns" : name.charCodeAt(0) === 120 && name.substr(0, 6) === "xmlns:" ? name.substr(6) : null;
					if (newalias !== null) {
						nsUri = decodeEntities(value);
						nsUriPrefix = uriPrefix(newalias);
						alias = nsUriToPrefix[nsUri];
						if (!alias) {
							if (newalias === "xmlns" || nsUriPrefix in nsMatrix && nsMatrix[nsUriPrefix] !== nsUri) do
								alias = "ns" + anonymousNsCount++;
							while (typeof nsMatrix[alias] !== "undefined");
							else alias = newalias;
							nsUriToPrefix[nsUri] = alias;
						}
						if (nsMatrix[newalias] !== alias) {
							if (!nsChanges) nsChanges = Object.create(null);
							elNameCache = null;
							nsSnapshot = null;
							setNsEntry(nsMatrix, nsChanges, newalias, alias);
							if (newalias === "xmlns") {
								setNsEntry(nsMatrix, nsChanges, uriPrefix(alias), nsUri);
								defaultAlias = alias;
							}
							setNsEntry(nsMatrix, nsChanges, nsUriPrefix, nsUri);
						}
						attrs[name] = value;
						continue;
					}
					attrList.push(name, value);
					continue;
				}
				name = normalizeAttrName(name, defaultAlias);
				if (name === null) continue;
				attrs[name] = value;
			}
			if (maybeNS) for (i = 0, l = attrList.length; i < l; i++) {
				name = normalizeAttrName(attrList[i++], defaultAlias);
				value = attrList[i];
				if (name === null) continue;
				attrs[name] = value;
			}
			return cachedAttrs = attrs;
		}
		function getParseContext() {
			var splitsRe = /(\r\n|\r|\n)/g;
			var line = 0;
			var column = 0;
			var startOfLine = 0;
			var endOfLine = j;
			var match;
			var data;
			while (i >= startOfLine) {
				match = splitsRe.exec(xml);
				if (!match) break;
				endOfLine = match[0].length + match.index;
				if (endOfLine > i) break;
				line += 1;
				startOfLine = endOfLine;
			}
			if (i == -1) {
				column = endOfLine;
				data = xml.substring(j);
			} else if (j === 0) data = xml.substring(j, i);
			else {
				column = i - startOfLine;
				data = j == -1 ? xml.substring(i) : xml.substring(i, j + 1);
			}
			return {
				"data": data,
				"line": line,
				"column": column
			};
		}
		getContext = getParseContext;
		if (proxy) elementProxy = Object.create({}, {
			"name": getter(function() {
				return elementName;
			}),
			"originalName": getter(function() {
				return _elementName;
			}),
			"attrs": getter(getAttrs),
			"ns": getter(function() {
				if (!nsSnapshot) nsSnapshot = Object.assign(Object.create(null), nsMatrix);
				return nsSnapshot;
			})
		});
		while (j !== -1) {
			if (xml.charCodeAt(j) === 60) i = j;
			else i = xml.indexOf("<", j);
			if (i === -1) {
				if (streaming) return xml.substring(j);
				if (nodeStack.length) return handleError("unexpected end of file");
				if (!rootTagFound) return handleError("missing start tag");
				if (j < xml.length) {
					if (xml.substring(j).trim()) handleWarning(NON_WHITESPACE_OUTSIDE_ROOT_NODE);
				}
				return;
			}
			if (!rootTagFound) rootTagFound = true;
			if (j !== i) {
				if (nodeStack.length) {
					if (onText) {
						onText(xml.substring(j, i), decodeEntities, getContext);
						if (parseStop) return;
					}
				} else if (xml.substring(j, i).trim()) {
					handleWarning(NON_WHITESPACE_OUTSIDE_ROOT_NODE);
					if (parseStop) return;
				}
			}
			w = xml.charCodeAt(i + 1);
			if (w === 33) {
				q = xml.charCodeAt(i + 2);
				if (q === 91 && xml.substr(i + 3, 6) === "CDATA[") {
					j = xml.indexOf("]]>", i);
					if (j === -1) {
						if (streaming) return xml.substring(i);
						return handleError("unclosed cdata");
					}
					if (onCDATA) {
						onCDATA(xml.substring(i + 9, j), getContext);
						if (parseStop) return;
					}
					j += 3;
					continue;
				}
				if (q === 45 && xml.charCodeAt(i + 3) === 45) {
					j = xml.indexOf("-->", i);
					if (j === -1) {
						if (streaming) return xml.substring(i);
						return handleError("unclosed comment");
					}
					if (onComment) {
						onComment(xml.substring(i + 4, j), decodeEntities, getContext);
						if (parseStop) return;
					}
					j += 3;
					continue;
				}
			}
			if (w === 63) {
				j = xml.indexOf("?>", i);
				if (j === -1) {
					if (streaming) return xml.substring(i);
					return handleError("unclosed question");
				}
				if (onQuestion) {
					onQuestion(xml.substring(i, j + 2), getContext);
					if (parseStop) return;
				}
				j += 2;
				continue;
			}
			for (x = i + 1;; x++) {
				v = xml.charCodeAt(x);
				if (isNaN(v)) {
					if (streaming) return xml.substring(i);
					j = -1;
					return handleError("unclosed tag");
				}
				if (v === 34) {
					q = xml.indexOf("\"", x + 1);
					x = q !== -1 ? q : x;
				} else if (v === 39) {
					q = xml.indexOf("'", x + 1);
					x = q !== -1 ? q : x;
				} else if (v === 62) {
					j = x;
					break;
				}
			}
			if (w === 33) {
				if (onAttention) {
					onAttention(xml.substring(i, j + 1), decodeEntities, getContext);
					if (parseStop) return;
				}
				j += 1;
				continue;
			}
			cachedAttrs = {};
			if (w === 47) {
				tagStart = false;
				tagEnd = true;
				if (!nodeStack.length) return handleError("missing open tag");
				x = elementName = nodeStack.pop();
				q = i + 2 + x.length;
				if (xml.substring(i + 2, q) !== x) return handleError("closing tag mismatch");
				for (; q < j; q++) {
					w = xml.charCodeAt(q);
					if (w === 32 || w > 8 && w < 14) continue;
					return handleError("close tag");
				}
			} else {
				if (xml.charCodeAt(j - 1) === 47) {
					x = elementName = xml.substring(i + 1, j - 1);
					tagStart = true;
					tagEnd = true;
				} else {
					x = elementName = xml.substring(i + 1, j);
					tagStart = true;
					tagEnd = false;
				}
				if (!(w > 96 && w < 123 || w > 64 && w < 91 || w === 95 || w === 58)) return handleError("illegal first char nodeName");
				for (q = 1, y = x.length; q < y; q++) {
					w = x.charCodeAt(q);
					if (w > 96 && w < 123 || w > 64 && w < 91 || w > 47 && w < 59 || w === 45 || w === 95 || w == 46) continue;
					if (w === 32 || w < 14 && w > 8) {
						elementName = x.substring(0, q);
						cachedAttrs = null;
						break;
					}
					return handleError("invalid nodeName");
				}
				if (!tagEnd) nodeStack.push(elementName);
			}
			if (isNamespace) {
				if (tagStart) {
					nsChanges = null;
					if (cachedAttrs === null) {
						if (maybeNS = x.indexOf("xmlns", q) !== -1) {
							attrsStart = q;
							attrsString = x;
							getAttrs();
							maybeNS = false;
						}
					}
					if (!tagEnd) nsChangesStack.push(nsChanges);
				}
				_elementName = elementName;
				if (elNameCache === null) elNameCache = Object.create(null);
				var _cachedName = elNameCache[elementName];
				if (_cachedName !== void 0) elementName = _cachedName;
				else {
					w = elementName.indexOf(":");
					if (w !== -1) {
						xmlns = nsMatrix[elementName.substring(0, w)];
						if (!xmlns) return handleError("missing namespace on <" + _elementName + ">");
						elementName = elementName.substr(w + 1);
					} else xmlns = nsMatrix["xmlns"];
					if (xmlns) elementName = xmlns + ":" + elementName;
					elNameCache[_elementName] = elementName;
				}
			}
			if (tagStart) {
				attrsStart = q;
				attrsString = x;
				if (onOpenTag) {
					if (proxy) onOpenTag(elementProxy, decodeEntities, tagEnd, getContext);
					else onOpenTag(elementName, getAttrs, decodeEntities, tagEnd, getContext);
					if (parseStop) return;
				}
			}
			if (tagEnd) {
				if (onCloseTag) {
					onCloseTag(proxy ? elementProxy : elementName, decodeEntities, tagStart, getContext);
					if (parseStop) return;
				}
				if (isNamespace) {
					if (!tagStart) nsChanges = nsChangesStack.pop();
					if (nsChanges) {
						restoreNsMatrix(nsMatrix, nsChanges);
						nsChanges = null;
						elNameCache = null;
						nsSnapshot = null;
					}
				}
			}
			j += 1;
		}
	}
}
//#endregion
//#region ../../node_modules/moddle-xml/dist/index.js
init_dist();
function hasLowerCaseAlias(pkg) {
	return pkg.xml && pkg.xml.tagAlias === "lowerCase";
}
var DEFAULT_NS_MAP = {
	"xsi": "http://www.w3.org/2001/XMLSchema-instance",
	"xml": "http://www.w3.org/XML/1998/namespace"
};
var SERIALIZE_PROPERTY = "property";
function getSerialization(element) {
	return element.xml && element.xml.serialize;
}
function getSerializationType(element) {
	const type = getSerialization(element);
	return type !== SERIALIZE_PROPERTY && (type || null);
}
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
function aliasToName(aliasNs, pkg) {
	if (!hasLowerCaseAlias(pkg)) return aliasNs.name;
	return aliasNs.prefix + ":" + capitalize(aliasNs.localName);
}
function prefixedToName(nameNs, pkg) {
	var name = nameNs.name, localName = nameNs.localName;
	var typePrefix = pkg && pkg.xml && pkg.xml.typePrefix;
	if (typePrefix && localName.indexOf(typePrefix) === 0) return nameNs.prefix + ":" + localName.slice(typePrefix.length);
	else return name;
}
function normalizeTypeName(name, nsMap, model) {
	const nameNs = parseName(name, nsMap.xmlns);
	const normalizedNameNs = parseName(`${nsMap[nameNs.prefix] || nameNs.prefix}:${nameNs.localName}`);
	return prefixedToName(normalizedNameNs, model.getPackage(normalizedNameNs.prefix));
}
function error(message) {
	return new Error(message);
}
function getModdleDescriptor(element) {
	return element.$descriptor;
}
function Context(options) {
	assign$1(this, options);
	this.elementsById = {};
	this.references = [];
	this.warnings = [];
	this.addReference = function(reference) {
		this.references.push(reference);
	};
	this.addElement = function(element) {
		if (!element) throw error("expected element");
		var elementsById = this.elementsById;
		var idProperty = getModdleDescriptor(element).idProperty, id;
		if (idProperty) {
			id = element.get(idProperty.name);
			if (id) {
				if (!/^([a-z][\w-.]*:)?[a-z_][\w-.]*$/i.test(id)) throw new Error("illegal ID <" + id + ">");
				if (elementsById[id]) throw error("duplicate ID <" + id + ">");
				elementsById[id] = element;
			}
		}
	};
	this.addWarning = function(warning) {
		this.warnings.push(warning);
	};
}
function BaseHandler() {}
BaseHandler.prototype.handleEnd = function() {};
BaseHandler.prototype.handleText = function() {};
BaseHandler.prototype.handleNode = function() {};
function NoopHandler() {}
NoopHandler.prototype = Object.create(BaseHandler.prototype);
NoopHandler.prototype.handleNode = function() {
	return this;
};
function BodyHandler() {}
BodyHandler.prototype = Object.create(BaseHandler.prototype);
BodyHandler.prototype.handleText = function(text) {
	this.body = (this.body || "") + text;
};
function ReferenceHandler(property, context) {
	this.property = property;
	this.context = context;
}
ReferenceHandler.prototype = Object.create(BodyHandler.prototype);
ReferenceHandler.prototype.handleNode = function(node) {
	if (this.element) throw error("expected no sub nodes");
	else this.element = this.createReference(node);
	return this;
};
ReferenceHandler.prototype.handleEnd = function() {
	this.element.id = this.body;
};
ReferenceHandler.prototype.createReference = function(node) {
	return {
		property: this.property.ns.name,
		id: ""
	};
};
function ValueHandler(propertyDesc, element) {
	this.element = element;
	this.propertyDesc = propertyDesc;
}
ValueHandler.prototype = Object.create(BodyHandler.prototype);
ValueHandler.prototype.handleEnd = function() {
	var value = this.body || "", element = this.element, propertyDesc = this.propertyDesc;
	value = coerceType(propertyDesc.type, value);
	if (propertyDesc.isMany) element.get(propertyDesc.name).push(value);
	else element.set(propertyDesc.name, value);
};
function BaseElementHandler() {}
BaseElementHandler.prototype = Object.create(BodyHandler.prototype);
BaseElementHandler.prototype.handleNode = function(node) {
	var parser = this, element = this.element;
	if (!element) {
		element = this.element = this.createElement(node);
		this.context.addElement(element);
	} else parser = this.handleChild(node);
	return parser;
};
function ElementHandler(model, typeName, context) {
	this.model = model;
	this.type = model.getType(typeName);
	this.context = context;
}
ElementHandler.prototype = Object.create(BaseElementHandler.prototype);
ElementHandler.prototype.addReference = function(reference) {
	this.context.addReference(reference);
};
ElementHandler.prototype.handleText = function(text) {
	var element = this.element;
	if (!getModdleDescriptor(element).bodyProperty) throw error("unexpected body text <" + text + ">");
	BodyHandler.prototype.handleText.call(this, text);
};
ElementHandler.prototype.handleEnd = function() {
	var value = this.body, element = this.element, bodyProperty = getModdleDescriptor(element).bodyProperty;
	if (bodyProperty && value !== void 0) {
		value = coerceType(bodyProperty.type, value);
		element.set(bodyProperty.name, value);
	}
};
ElementHandler.prototype.createElement = function(node) {
	var attributes = node.attributes, Type = this.type, descriptor = getModdleDescriptor(Type), context = this.context, instance = new Type({}), model = this.model, propNameNs;
	forEach(attributes, function(value, name) {
		var prop = descriptor.propertiesByName[name], values;
		if (prop && prop.isReference) {
			if (!prop.isMany) context.addReference({
				element: instance,
				property: prop.ns.name,
				id: value
			});
			else {
				values = value.split(" ");
				forEach(values, function(v) {
					context.addReference({
						element: instance,
						property: prop.ns.name,
						id: v
					});
				});
			}
		} else {
			if (prop) value = coerceType(prop.type, value);
			else if (name === "xmlns") name = ":" + name;
			else {
				propNameNs = parseName(name, descriptor.ns.prefix);
				if (model.getPackage(propNameNs.prefix)) context.addWarning({
					message: "unknown attribute <" + name + ">",
					element: instance,
					property: name,
					value
				});
			}
			instance.set(name, value);
		}
	});
	return instance;
};
ElementHandler.prototype.getPropertyForNode = function(node) {
	var name = node.name;
	var nameNs = parseName(name);
	var type = this.type, model = this.model, descriptor = getModdleDescriptor(type);
	var propertyName = nameNs.name, property = descriptor.propertiesByName[propertyName];
	if (property && !property.isAttr) {
		const serializationType = getSerializationType(property);
		if (serializationType) {
			const elementTypeName = node.attributes[serializationType];
			if (elementTypeName) {
				const normalizedTypeName = normalizeTypeName(elementTypeName, node.ns, model);
				const elementType = model.getType(normalizedTypeName);
				return assign$1({}, property, { effectiveType: getModdleDescriptor(elementType).name });
			}
		}
		return property;
	}
	var pkg = model.getPackage(nameNs.prefix);
	if (pkg) {
		const elementTypeName = aliasToName(nameNs, pkg);
		const elementType = model.getType(elementTypeName);
		property = find(descriptor.properties, function(p) {
			return !p.isVirtual && !p.isReference && !p.isAttribute && elementType.hasType(p.type);
		});
		if (property) return assign$1({}, property, { effectiveType: getModdleDescriptor(elementType).name });
	} else {
		property = find(descriptor.properties, function(p) {
			return !p.isReference && !p.isAttribute && p.type === "Element";
		});
		if (property) return property;
	}
	throw error("unrecognized element <" + nameNs.name + ">");
};
ElementHandler.prototype.toString = function() {
	return "ElementDescriptor[" + getModdleDescriptor(this.type).name + "]";
};
ElementHandler.prototype.valueHandler = function(propertyDesc, element) {
	return new ValueHandler(propertyDesc, element);
};
ElementHandler.prototype.referenceHandler = function(propertyDesc) {
	return new ReferenceHandler(propertyDesc, this.context);
};
ElementHandler.prototype.handler = function(type) {
	if (type === "Element") return new GenericElementHandler(this.model, type, this.context);
	else return new ElementHandler(this.model, type, this.context);
};
ElementHandler.prototype.handleChild = function(node) {
	var propertyDesc = this.getPropertyForNode(node), type, element = this.element, childHandler;
	type = propertyDesc.effectiveType || propertyDesc.type;
	if (isSimple(type)) return this.valueHandler(propertyDesc, element);
	if (propertyDesc.isReference) childHandler = this.referenceHandler(propertyDesc).handleNode(node);
	else childHandler = this.handler(type).handleNode(node);
	var newElement = childHandler.element;
	if (newElement !== void 0) {
		if (propertyDesc.isMany) element.get(propertyDesc.name).push(newElement);
		else element.set(propertyDesc.name, newElement);
		if (propertyDesc.isReference) {
			assign$1(newElement, { element });
			this.context.addReference(newElement);
		} else newElement.$parent = element;
	}
	return childHandler;
};
function RootElementHandler(model, typeName, context) {
	ElementHandler.call(this, model, typeName, context);
}
RootElementHandler.prototype = Object.create(ElementHandler.prototype);
RootElementHandler.prototype.createElement = function(node) {
	var name = node.name, nameNs = parseName(name), model = this.model, type = this.type, pkg = model.getPackage(nameNs.prefix), typeName = pkg && aliasToName(nameNs, pkg) || name;
	if (!type.hasType(typeName)) throw error("unexpected element <" + node.originalName + ">");
	return ElementHandler.prototype.createElement.call(this, node);
};
function GenericElementHandler(model, typeName, context) {
	this.model = model;
	this.context = context;
}
GenericElementHandler.prototype = Object.create(BaseElementHandler.prototype);
GenericElementHandler.prototype.createElement = function(node) {
	var name = node.name, prefix = parseName(name).prefix, uri = node.ns[prefix + "$uri"], attributes = node.attributes;
	return this.model.createAny(name, uri, attributes);
};
GenericElementHandler.prototype.handleChild = function(node) {
	var handler = new GenericElementHandler(this.model, "Element", this.context).handleNode(node), element = this.element;
	var newElement = handler.element, children;
	if (newElement !== void 0) {
		children = element.$children = element.$children || [];
		children.push(newElement);
		newElement.$parent = element;
	}
	return handler;
};
GenericElementHandler.prototype.handleEnd = function() {
	if (this.body) this.element.$body = this.body;
};
function Reader(options) {
	if (options instanceof Moddle) options = { model: options };
	assign$1(this, { lax: false }, options);
}
Reader.prototype.fromXML = function(xml, options, done) {
	var rootHandler = options.rootHandler;
	if (options instanceof ElementHandler) {
		rootHandler = options;
		options = {};
	} else if (typeof options === "string") {
		rootHandler = this.handler(options);
		options = {};
	} else if (typeof rootHandler === "string") rootHandler = this.handler(rootHandler);
	var model = this.model, lax = this.lax;
	var context = new Context(assign$1({}, options, { rootHandler })), parser = new Parser({ proxy: true }), stack = createStack();
	rootHandler.context = context;
	stack.push(rootHandler);
	function handleError(err, getContext, lax) {
		var ctx = getContext();
		var line = ctx.line, column = ctx.column, data = ctx.data;
		if (data.charAt(0) === "<" && data.indexOf(" ") !== -1) data = data.slice(0, data.indexOf(" ")) + ">";
		var message = "unparsable content " + (data ? data + " " : "") + "detected\n	line: " + line + "\n	column: " + column + "\n	nested error: " + err.message;
		if (lax) {
			context.addWarning({
				message,
				error: err
			});
			return true;
		} else throw error(message);
	}
	function handleWarning(err, getContext) {
		return handleError(err, getContext, true);
	}
	function resolveReferences() {
		var elementsById = context.elementsById;
		var references = context.references;
		var i = 0, r;
		for (; r = references[i]; i++) {
			var element = r.element;
			var reference = elementsById[r.id];
			var property = getModdleDescriptor(element).propertiesByName[r.property];
			if (!reference) context.addWarning({
				message: "unresolved reference <" + r.id + ">",
				element: r.element,
				property: r.property,
				value: r.id
			});
			if (property.isMany) {
				var collection = element.get(property.name), idx = collection.indexOf(r);
				if (idx === -1) idx = collection.length;
				if (!reference) collection.splice(idx, 1);
				else collection[idx] = reference;
			} else element.set(property.name, reference);
		}
	}
	function handleClose() {
		stack.pop().handleEnd();
	}
	var PREAMBLE_START_PATTERN = /^<\?xml /i;
	var ENCODING_PATTERN = / encoding="([^"]+)"/i;
	var UTF_8_PATTERN = /^utf-8$/i;
	function handleQuestion(question) {
		if (!PREAMBLE_START_PATTERN.test(question)) return;
		var match = ENCODING_PATTERN.exec(question);
		var encoding = match && match[1];
		if (!encoding || UTF_8_PATTERN.test(encoding)) return;
		context.addWarning({ message: "unsupported document encoding <" + encoding + ">, falling back to UTF-8" });
	}
	function handleOpen(node, getContext) {
		var handler = stack.peek();
		try {
			stack.push(handler.handleNode(node));
		} catch (err) {
			if (handleError(err, getContext, lax)) stack.push(new NoopHandler());
		}
	}
	function handleCData(text, getContext) {
		try {
			stack.peek().handleText(text);
		} catch (err) {
			handleWarning(err, getContext);
		}
	}
	function handleText(text, getContext) {
		if (!text.trim()) return;
		handleCData(text, getContext);
	}
	var uriMap = model.getPackages().reduce(function(uriMap, p) {
		uriMap[p.uri] = p.prefix;
		return uriMap;
	}, Object.entries(DEFAULT_NS_MAP).reduce(function(map, [prefix, url]) {
		map[url] = prefix;
		return map;
	}, model.config && model.config.nsMap || {}));
	parser.ns(uriMap).on("openTag", function(obj, decodeStr, selfClosing, getContext) {
		var attrs = obj.attrs || {};
		var decodedAttrs = Object.keys(attrs).reduce(function(d, key) {
			d[key] = decodeStr(attrs[key]);
			return d;
		}, {});
		handleOpen({
			name: obj.name,
			originalName: obj.originalName,
			attributes: decodedAttrs,
			ns: obj.ns
		}, getContext);
	}).on("question", handleQuestion).on("closeTag", handleClose).on("cdata", handleCData).on("text", function(text, decodeEntities, getContext) {
		handleText(decodeEntities(text), getContext);
	}).on("error", handleError).on("warn", handleWarning);
	return new Promise(function(resolve, reject) {
		var err;
		try {
			parser.parse(xml);
			resolveReferences();
		} catch (e) {
			err = e;
		}
		var rootElement = rootHandler.element;
		if (!err && !rootElement) err = error("failed to parse document as <" + rootHandler.type.$descriptor.name + ">");
		var warnings = context.warnings;
		var references = context.references;
		var elementsById = context.elementsById;
		if (err) {
			err.warnings = warnings;
			return reject(err);
		} else return resolve({
			rootElement,
			elementsById,
			references,
			warnings
		});
	});
};
Reader.prototype.handler = function(name) {
	return new RootElementHandler(this.model, name);
};
function createStack() {
	var stack = [];
	Object.defineProperty(stack, "peek", { value: function() {
		return this[this.length - 1];
	} });
	return stack;
}
var XML_PREAMBLE = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
var ESCAPE_ATTR_CHARS = /<|>|'|"|&|\n\r|\n/g;
var ESCAPE_CHARS = /<|>|&/g;
function Namespaces(parent) {
	this.prefixMap = {};
	this.uriMap = {};
	this.used = {};
	this.wellknown = [];
	this.custom = [];
	this.parent = parent;
	this.defaultPrefixMap = parent && parent.defaultPrefixMap || {};
}
Namespaces.prototype.mapDefaultPrefixes = function(defaultPrefixMap) {
	this.defaultPrefixMap = defaultPrefixMap;
};
Namespaces.prototype.defaultUriByPrefix = function(prefix) {
	return this.defaultPrefixMap[prefix];
};
Namespaces.prototype.resolve = function(fn) {
	var scope = this;
	while (scope) {
		var resolved = fn(scope);
		if (resolved) return resolved;
		scope = scope.parent;
	}
};
Namespaces.prototype.eachScope = function(fn) {
	var scope = this;
	while (scope) {
		fn(scope);
		scope = scope.parent;
	}
};
Namespaces.prototype.byUri = function(uri) {
	return this.resolve(function(scope) {
		return scope.uriMap[uri];
	});
};
Namespaces.prototype.add = function(ns, isWellknown) {
	this.uriMap[ns.uri] = ns;
	if (isWellknown) this.wellknown.push(ns);
	else this.custom.push(ns);
	this.mapPrefix(ns.prefix, ns.uri);
};
Namespaces.prototype.uriByPrefix = function(prefix) {
	var key = prefix || "xmlns";
	return this.resolve(function(scope) {
		return scope.prefixMap[key];
	});
};
Namespaces.prototype.mapPrefix = function(prefix, uri) {
	this.prefixMap[prefix || "xmlns"] = uri;
};
Namespaces.prototype.getNSKey = function(ns) {
	return ns.prefix !== void 0 ? ns.uri + "|" + ns.prefix : ns.uri;
};
Namespaces.prototype.logUsed = function(ns) {
	var uri = ns.uri;
	var nsKey = this.getNSKey(ns);
	var resolved = this.byUri(uri);
	this.eachScope(function(scope) {
		scope.used[nsKey] = resolved;
	});
};
Namespaces.prototype.getUsed = function(ns) {
	return [].concat(this.wellknown, this.custom).filter((ns) => {
		var nsKey = this.getNSKey(ns);
		return this.used[nsKey];
	});
};
function lower(string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}
function nameToAlias(name, pkg) {
	if (hasLowerCaseAlias(pkg)) return lower(name);
	else return name;
}
function inherits(ctor, superCtor) {
	ctor.super_ = superCtor;
	ctor.prototype = Object.create(superCtor.prototype, { constructor: {
		value: ctor,
		enumerable: false,
		writable: true,
		configurable: true
	} });
}
function nsName(ns) {
	if (isString(ns)) return ns;
	else return (ns.prefix ? ns.prefix + ":" : "") + ns.localName;
}
function getNsAttrs(namespaces) {
	return namespaces.getUsed().filter(function(ns) {
		return ns.prefix !== "xml";
	}).map(function(ns) {
		return {
			name: "xmlns" + (ns.prefix ? ":" + ns.prefix : ""),
			value: ns.uri
		};
	});
}
function getElementNs(ns, descriptor) {
	if (descriptor.isGeneric) return assign$1({ localName: descriptor.ns.localName }, ns);
	else return assign$1({ localName: nameToAlias(descriptor.ns.localName, descriptor.$pkg) }, ns);
}
function getPropertyNs(ns, descriptor) {
	return assign$1({ localName: descriptor.ns.localName }, ns);
}
function getSerializableProperties(element) {
	var descriptor = element.$descriptor;
	return filter(descriptor.properties, function(p) {
		var name = p.name;
		if (p.isVirtual) return false;
		if (!has(element, name)) return false;
		var value = element[name];
		if (value === p.default) return false;
		if (value === null) return false;
		return p.isMany ? value.length : true;
	});
}
var ESCAPE_ATTR_MAP = {
	"\n": "#10",
	"\n\r": "#10",
	"\"": "#34",
	"'": "#39",
	"<": "#60",
	">": "#62",
	"&": "#38"
};
var ESCAPE_MAP = {
	"<": "lt",
	">": "gt",
	"&": "amp"
};
function escape$1(str, charPattern, replaceMap) {
	str = isString(str) ? str : "" + str;
	return str.replace(charPattern, function(s) {
		return "&" + replaceMap[s] + ";";
	});
}
function escapeAttr(str) {
	return escape$1(str, ESCAPE_ATTR_CHARS, ESCAPE_ATTR_MAP);
}
function escapeBody(str) {
	return escape$1(str, ESCAPE_CHARS, ESCAPE_MAP);
}
function filterAttributes(props) {
	return filter(props, function(p) {
		return p.isAttr;
	});
}
function filterContained(props) {
	return filter(props, function(p) {
		return !p.isAttr;
	});
}
function ReferenceSerializer(tagName) {
	this.tagName = tagName;
}
ReferenceSerializer.prototype.build = function(element) {
	this.element = element;
	return this;
};
ReferenceSerializer.prototype.serializeTo = function(writer) {
	writer.appendIndent().append("<" + this.tagName + ">" + this.element.id + "</" + this.tagName + ">").appendNewLine();
};
function BodySerializer() {}
BodySerializer.prototype.serializeValue = BodySerializer.prototype.serializeTo = function(writer) {
	writer.append(this.escape ? escapeBody(this.value) : this.value);
};
BodySerializer.prototype.build = function(prop, value) {
	this.value = value;
	if (prop.type === "String" && value.search(ESCAPE_CHARS) !== -1) this.escape = true;
	return this;
};
function ValueSerializer(tagName) {
	this.tagName = tagName;
}
inherits(ValueSerializer, BodySerializer);
ValueSerializer.prototype.serializeTo = function(writer) {
	writer.appendIndent().append("<" + this.tagName + ">");
	this.serializeValue(writer);
	writer.append("</" + this.tagName + ">").appendNewLine();
};
function ElementSerializer(parent, propertyDescriptor) {
	this.body = [];
	this.attrs = [];
	this.parent = parent;
	this.propertyDescriptor = propertyDescriptor;
}
ElementSerializer.prototype.build = function(element) {
	buildTree(this, element);
	return this;
};
ElementSerializer.prototype.enter = function(element) {
	this.element = element;
	var elementDescriptor = element.$descriptor, propertyDescriptor = this.propertyDescriptor;
	var isGeneric = elementDescriptor.isGeneric;
	if (isGeneric) this.otherAttrs = this.parseGenericNsAttributes(element);
	else this.otherAttrs = this.parseNsAttributes(element);
	if (propertyDescriptor) this.ns = this.nsPropertyTagName(propertyDescriptor);
	else this.ns = this.nsTagName(elementDescriptor);
	this.tagName = this.addTagName(this.ns);
	if (isGeneric) return this.collectGenericContainments(element);
	var properties = getSerializableProperties(element);
	this.parseAttributes(filterAttributes(properties));
	return this.collectContainments(filterContained(properties));
};
ElementSerializer.prototype.exit = function() {
	this.parseGenericAttributes(this.element, this.otherAttrs);
};
ElementSerializer.prototype.nsTagName = function(descriptor) {
	return getElementNs(this.logNamespaceUsed(descriptor.ns), descriptor);
};
ElementSerializer.prototype.nsPropertyTagName = function(descriptor) {
	return getPropertyNs(this.logNamespaceUsed(descriptor.ns), descriptor);
};
ElementSerializer.prototype.isLocalNs = function(ns) {
	return ns.uri === this.ns.uri;
};
ElementSerializer.prototype.nsAttributeName = function(element) {
	var ns;
	if (isString(element)) ns = parseName(element);
	else ns = element.ns;
	if (element.inherited) return { localName: ns.localName };
	var effectiveNs = this.logNamespaceUsed(ns);
	this.getNamespaces().logUsed(effectiveNs);
	if (this.isLocalNs(effectiveNs)) return { localName: ns.localName };
	else return assign$1({ localName: ns.localName }, effectiveNs);
};
ElementSerializer.prototype.parseGenericNsAttributes = function(element) {
	return Object.entries(element).filter(([key, value]) => !key.startsWith("$") && this.parseNsAttribute(element, key, value)).map(([key, value]) => ({
		name: key,
		value
	}));
};
ElementSerializer.prototype.collectGenericContainments = function(element) {
	var self = this, children = [];
	var bodyText = element.$body;
	if (bodyText) children.push({ create: function() {
		return new BodySerializer().build({ type: "String" }, bodyText);
	} });
	var genericChildren = element.$children;
	if (genericChildren) forEach(genericChildren, function(child) {
		children.push({
			create: function() {
				return new ElementSerializer(self);
			},
			element: child
		});
	});
	return children;
};
ElementSerializer.prototype.parseNsAttribute = function(element, name, value) {
	var model = element.$model;
	var nameNs = parseName(name);
	var ns;
	if (nameNs.prefix === "xmlns") ns = {
		prefix: nameNs.localName,
		uri: value
	};
	if (!nameNs.prefix && nameNs.localName === "xmlns") ns = { uri: value };
	if (!ns) return {
		name,
		value
	};
	if (model && model.getPackage(value)) this.logNamespace(ns, true, true);
	else {
		var actualNs = this.logNamespaceUsed(ns, true);
		this.getNamespaces().logUsed(actualNs);
	}
};
ElementSerializer.prototype.parseNsAttributes = function(element) {
	var self = this;
	var genericAttrs = element.$attrs;
	var attributes = [];
	forEach(genericAttrs, function(value, name) {
		var nonNsAttr = self.parseNsAttribute(element, name, value);
		if (nonNsAttr) attributes.push(nonNsAttr);
	});
	return attributes;
};
ElementSerializer.prototype.parseGenericAttributes = function(element, attributes) {
	var self = this;
	forEach(attributes, function(attr) {
		try {
			self.addAttribute(self.nsAttributeName(attr.name), attr.value);
		} catch (e) {
			typeof console !== "undefined" && console.warn(`missing namespace information for <${attr.name}=${attr.value}> on`, element, e);
		}
	});
};
ElementSerializer.prototype.collectContainments = function(properties) {
	var self = this, element = this.element, children = [];
	forEach(properties, function(p) {
		var value = element.get(p.name), isReference = p.isReference;
		if (!p.isMany) value = [value];
		if (p.isBody) children.push({ create: function() {
			return new BodySerializer().build(p, value[0]);
		} });
		else if (isSimple(p.type)) forEach(value, function(v) {
			children.push({ create: function() {
				return new ValueSerializer(self.addTagName(self.nsPropertyTagName(p))).build(p, v);
			} });
		});
		else if (isReference) forEach(value, function(v) {
			children.push({ create: function() {
				return new ReferenceSerializer(self.addTagName(self.nsPropertyTagName(p))).build(v);
			} });
		});
		else {
			var serialization = getSerialization(p);
			forEach(value, function(v) {
				children.push({
					create: function() {
						if (serialization) {
							if (serialization === SERIALIZE_PROPERTY) return new ElementSerializer(self, p);
							return new TypeSerializer(self, p, serialization);
						}
						return new ElementSerializer(self);
					},
					element: v
				});
			});
		}
	});
	return children;
};
ElementSerializer.prototype.getNamespaces = function(local) {
	var namespaces = this.namespaces;
	if (!namespaces) {
		var parentNamespaces = this.getParentNamespaces();
		if (local || !parentNamespaces) this.namespaces = namespaces = new Namespaces(parentNamespaces);
		else namespaces = parentNamespaces;
	}
	return namespaces;
};
ElementSerializer.prototype.getParentNamespaces = function() {
	if (this.parentNamespaces !== void 0) return this.parentNamespaces;
	var scope = null, ancestor = this.parent;
	while (ancestor) {
		if (ancestor.namespaces) {
			scope = ancestor.namespaces;
			break;
		}
		if (ancestor.parentNamespaces !== void 0) {
			scope = ancestor.parentNamespaces;
			break;
		}
		ancestor = ancestor.parent;
	}
	return this.parentNamespaces = scope;
};
ElementSerializer.prototype.logNamespace = function(ns, wellknown, local) {
	var namespaces = this.getNamespaces(local);
	var nsUri = ns.uri, nsPrefix = ns.prefix;
	if (!namespaces.byUri(nsUri) || local) namespaces.add(ns, wellknown);
	namespaces.mapPrefix(nsPrefix, nsUri);
	return ns;
};
ElementSerializer.prototype.logNamespaceUsed = function(ns, local) {
	var namespaces = this.getNamespaces(local);
	var prefix = ns.prefix, uri = ns.uri, newPrefix, idx, wellknownUri;
	if (!prefix && !uri) return { localName: ns.localName };
	wellknownUri = namespaces.defaultUriByPrefix(prefix);
	uri = uri || wellknownUri || namespaces.uriByPrefix(prefix);
	if (!uri) throw new Error("no namespace uri given for prefix <" + prefix + ">");
	ns = namespaces.byUri(uri);
	if (!ns && !prefix) ns = this.logNamespace({ uri }, wellknownUri === uri, true);
	if (!ns) {
		newPrefix = prefix;
		idx = 1;
		while (namespaces.uriByPrefix(newPrefix)) newPrefix = prefix + "_" + idx++;
		ns = this.logNamespace({
			prefix: newPrefix,
			uri
		}, wellknownUri === uri);
	}
	if (prefix) namespaces.mapPrefix(prefix, uri);
	return ns;
};
ElementSerializer.prototype.parseAttributes = function(properties) {
	var self = this, element = this.element;
	forEach(properties, function(p) {
		var value = element.get(p.name);
		if (p.isReference) {
			if (!p.isMany) value = value.id;
			else {
				var values = [];
				forEach(value, function(v) {
					values.push(v.id);
				});
				value = values.join(" ");
			}
		}
		self.addAttribute(self.nsAttributeName(p), value);
	});
};
ElementSerializer.prototype.addTagName = function(nsTagName) {
	var actualNs = this.logNamespaceUsed(nsTagName);
	this.getNamespaces().logUsed(actualNs);
	return nsName(nsTagName);
};
ElementSerializer.prototype.addAttribute = function(name, value) {
	var attrs = this.attrs;
	if (isString(value)) value = escapeAttr(value);
	var idx = findIndex(attrs, function(element) {
		return element.name.localName === name.localName && element.name.uri === name.uri && element.name.prefix === name.prefix;
	});
	var attr = {
		name,
		value
	};
	if (idx !== -1) attrs.splice(idx, 1, attr);
	else attrs.push(attr);
};
ElementSerializer.prototype.serializeAttributes = function(writer) {
	var attrs = this.attrs, namespaces = this.namespaces;
	if (namespaces) attrs = getNsAttrs(namespaces).concat(attrs);
	forEach(attrs, function(a) {
		writer.append(" ").append(nsName(a.name)).append("=\"").append(a.value).append("\"");
	});
};
ElementSerializer.prototype.serializeTo = function(writer) {
	serializeTree(this, writer);
};
function serializeTree(root, writer) {
	var stack = [{
		serializer: root,
		index: 0,
		opened: false,
		indent: false
	}];
	while (stack.length) {
		var frame = stack[stack.length - 1], serializer = frame.serializer;
		if (!frame.opened) {
			var firstBody = serializer.body[0];
			frame.indent = firstBody && firstBody.constructor !== BodySerializer;
			writer.appendIndent().append("<" + serializer.tagName);
			serializer.serializeAttributes(writer);
			writer.append(firstBody ? ">" : " />");
			frame.opened = true;
			if (!firstBody) {
				writer.appendNewLine();
				stack.pop();
				continue;
			}
			if (frame.indent) writer.appendNewLine().indent();
		}
		if (frame.index < serializer.body.length) {
			var child = serializer.body[frame.index++];
			if (child instanceof ElementSerializer) stack.push({
				serializer: child,
				index: 0,
				opened: false,
				indent: false
			});
			else child.serializeTo(writer);
			continue;
		}
		if (frame.indent) writer.unindent().appendIndent();
		writer.append("</" + serializer.tagName + ">").appendNewLine();
		stack.pop();
	}
}
function TypeSerializer(parent, propertyDescriptor, serialization) {
	ElementSerializer.call(this, parent, propertyDescriptor);
	this.serialization = serialization;
}
inherits(TypeSerializer, ElementSerializer);
TypeSerializer.prototype.parseNsAttributes = function(element) {
	var attributes = ElementSerializer.prototype.parseNsAttributes.call(this, element).filter((attr) => attr.name !== this.serialization);
	var descriptor = element.$descriptor;
	if (descriptor.name === this.propertyDescriptor.type) return attributes;
	var typeNs = this.typeNs = this.nsTagName(descriptor);
	this.getNamespaces().logUsed(this.typeNs);
	var pkg = element.$model.getPackage(typeNs.uri), typePrefix = pkg.xml && pkg.xml.typePrefix || "";
	this.addAttribute(this.nsAttributeName(this.serialization), (typeNs.prefix ? typeNs.prefix + ":" : "") + typePrefix + descriptor.ns.localName);
	return attributes;
};
TypeSerializer.prototype.isLocalNs = function(ns) {
	return ns.uri === (this.typeNs || this.ns).uri;
};
function SavingWriter() {
	this.value = "";
	this.write = function(str) {
		this.value += str;
	};
}
function FormatingWriter(out, format) {
	var indent = [""];
	this.append = function(str) {
		out.write(str);
		return this;
	};
	this.appendNewLine = function() {
		if (format) out.write("\n");
		return this;
	};
	this.appendIndent = function() {
		if (format) out.write(indent.join("  "));
		return this;
	};
	this.indent = function() {
		indent.push("");
		return this;
	};
	this.unindent = function() {
		indent.pop();
		return this;
	};
}
function Writer(options) {
	options = assign$1({
		format: false,
		preamble: true
	}, options || {});
	function toXML(tree, writer) {
		var internalWriter = writer || new SavingWriter();
		var formatingWriter = new FormatingWriter(internalWriter, options.format);
		if (options.preamble) formatingWriter.append(XML_PREAMBLE);
		var serializer = new ElementSerializer();
		var model = tree.$model;
		serializer.getNamespaces().mapDefaultPrefixes(getDefaultPrefixMappings(model));
		serializer.build(tree).serializeTo(formatingWriter);
		if (!writer) return internalWriter.value;
	}
	return { toXML };
}
function buildTree(rootSerializer, rootElement) {
	var stack = [{
		serializer: rootSerializer,
		children: rootSerializer.enter(rootElement),
		index: 0
	}];
	while (stack.length) {
		var frame = stack[stack.length - 1];
		if (frame.index >= frame.children.length) {
			frame.serializer.exit();
			stack.pop();
			continue;
		}
		var child = frame.children[frame.index++];
		var childSerializer = child.create();
		frame.serializer.body.push(childSerializer);
		if (child.element) stack.push({
			serializer: childSerializer,
			children: childSerializer.enter(child.element),
			index: 0
		});
	}
}
function getDefaultPrefixMappings(model) {
	const nsMap = model.config && model.config.nsMap || {};
	const prefixMap = {};
	for (const prefix in DEFAULT_NS_MAP) prefixMap[prefix] = DEFAULT_NS_MAP[prefix];
	for (const uri in nsMap) {
		const prefix = nsMap[uri];
		prefixMap[prefix] = uri;
	}
	for (const pkg of model.getPackages()) prefixMap[pkg.prefix] = pkg.uri;
	return prefixMap;
}
//#endregion
//#region ../../node_modules/min-dom/dist/index.js
init_dist();
function _mergeNamespaces(n, m) {
	m.forEach(function(e) {
		e && typeof e !== "string" && !Array.isArray(e) && Object.keys(e).forEach(function(k) {
			if (k !== "default" && !(k in n)) {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function() {
						return e[k];
					}
				});
			}
		});
	});
	return Object.freeze(n);
}
function assign(element, ...styleSources) {
	const target = element.style;
	forEach(styleSources, function(style) {
		if (!style) return;
		forEach(style, function(value, key) {
			target[key] = value;
		});
	});
	return element;
}
function attr$1(el, name, val) {
	if (arguments.length == 2) return el.getAttribute(name);
	if (val === null) return el.removeAttribute(name);
	el.setAttribute(name, val);
	return el;
}
var toString$1 = Object.prototype.toString;
function classes$1(el) {
	return new ClassList$1(el);
}
function ClassList$1(el) {
	if (!el || !el.nodeType) throw new Error("A DOM element reference is required");
	this.el = el;
	this.list = el.classList;
}
ClassList$1.prototype.add = function(name) {
	this.list.add(name);
	return this;
};
ClassList$1.prototype.remove = function(name) {
	if ("[object RegExp]" == toString$1.call(name)) return this.removeMatching(name);
	this.list.remove(name);
	return this;
};
ClassList$1.prototype.removeMatching = function(re) {
	const arr = this.array();
	for (let i = 0; i < arr.length; i++) if (re.test(arr[i])) this.remove(arr[i]);
	return this;
};
ClassList$1.prototype.toggle = function(name, force) {
	if ("undefined" !== typeof force) {
		if (force !== this.list.toggle(name, force)) this.list.toggle(name);
	} else this.list.toggle(name);
	return this;
};
ClassList$1.prototype.array = function() {
	return Array.from(this.list);
};
ClassList$1.prototype.has = ClassList$1.prototype.contains = function(name) {
	return this.list.contains(name);
};
function clear$1(element) {
	var child;
	while (child = element.firstChild) element.removeChild(child);
	return element;
}
function closest(element, selector, checkYourSelf) {
	var actualElement = checkYourSelf ? element : element.parentNode;
	return actualElement && typeof actualElement.closest === "function" && actualElement.closest(selector) || null;
}
function getDefaultExportFromCjs$1(x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
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
var componentEventExports = requireComponentEvent();
var event = _mergeNamespaces({
	__proto__: null,
	default: getDefaultExportFromCjs$1(componentEventExports)
}, [componentEventExports]);
var forceCaptureEvents = ["focus", "blur"];
function bind(el, selector, type, fn, capture) {
	if (forceCaptureEvents.indexOf(type) !== -1) capture = true;
	return event.bind(el, type, function(e) {
		e.delegateTarget = closest(e.target || e.srcElement, selector, true);
		if (e.delegateTarget) fn.call(el, e);
	}, capture);
}
function unbind(el, type, fn, capture) {
	if (forceCaptureEvents.indexOf(type) !== -1) capture = true;
	return event.unbind(el, type, fn, capture);
}
var delegate = {
	bind,
	unbind
};
function matches(element, selector) {
	return element && typeof element.matches === "function" && element.matches(selector) || false;
}
function query(selector, el) {
	el = el || document;
	return el.querySelector(selector);
}
function all(selector, el) {
	el = el || document;
	return el.querySelectorAll(selector);
}
function remove$2(el) {
	el.parentNode && el.parentNode.removeChild(el);
}
//#endregion
//#region ../../node_modules/ids/dist/index.js
function getDefaultExportFromCjs(x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var hat$1 = { exports: {} };
var hasRequiredHat;
function requireHat() {
	if (hasRequiredHat) return hat$1.exports;
	hasRequiredHat = 1;
	var hat = hat$1.exports = function(bits, base) {
		if (!base) base = 16;
		if (bits === void 0) bits = 128;
		if (bits <= 0) return "0";
		var digits = Math.log(Math.pow(2, bits)) / Math.log(base);
		for (var i = 2; digits === Infinity; i *= 2) digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
		var rem = digits - Math.floor(digits);
		var res = "";
		for (var i = 0; i < Math.floor(digits); i++) {
			var x = Math.floor(Math.random() * base).toString(base);
			res = x + res;
		}
		if (rem) {
			var x = Math.floor(Math.random() * Math.pow(base, rem)).toString(base);
			res = x + res;
		}
		var parsed = parseInt(res, base);
		if (parsed !== Infinity && parsed >= Math.pow(2, bits)) return hat(bits, base);
		else return res;
	};
	hat.rack = function(bits, base, expandBy) {
		var fn = function(data) {
			var iters = 0;
			do {
				if (iters++ > 10) {
					if (expandBy) bits += expandBy;
					else throw new Error("too many ID collisions, use more bits");
				}
				var id = hat(bits, base);
			} while (Object.hasOwnProperty.call(hats, id));
			hats[id] = data;
			return id;
		};
		var hats = fn.hats = {};
		fn.get = function(id) {
			return fn.hats[id];
		};
		fn.set = function(id, value) {
			fn.hats[id] = value;
			return fn;
		};
		fn.bits = bits || 128;
		fn.base = base || 16;
		return fn;
	};
	return hat$1.exports;
}
var hat = getDefaultExportFromCjs(requireHat());
function Ids$1(seed) {
	if (!(this instanceof Ids$1)) return new Ids$1(seed);
	seed = seed || [
		128,
		36,
		1
	];
	this._seed = seed.length ? hat.rack(seed[0], seed[1], seed[2]) : seed;
}
Ids$1.prototype.next = function(element) {
	return this._seed(element || true);
};
Ids$1.prototype.nextPrefixed = function(prefix, element) {
	var id;
	do
		id = prefix + this.next(true);
	while (this.assigned(id));
	this.claim(id, element);
	return id;
};
Ids$1.prototype.claim = function(id, element) {
	this._seed.set(id, element || true);
};
Ids$1.prototype.assigned = function(id) {
	return this._seed.get(id) || false;
};
Ids$1.prototype.unclaim = function(id) {
	delete this._seed.hats[id];
};
Ids$1.prototype.clear = function() {
	var hats = this._seed.hats, id;
	for (id in hats) this.unclaim(id);
};
//#endregion
//#region ../../node_modules/inherits-browser/dist/index.es.js
function e$2(e, t) {
	t && (e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: {
		value: e,
		enumerable: !1,
		writable: !0,
		configurable: !0
	} }));
}
//#endregion
//#region ../../node_modules/diagram-js/node_modules/didi/dist/index.js
var CLASS_PATTERN = /^class[ {]/;
function isClass(fn) {
	return CLASS_PATTERN.test(fn.toString());
}
function isArray$1(obj) {
	return Array.isArray(obj);
}
function hasOwnProp(obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}
function annotate(...args) {
	if (args.length === 1 && isArray$1(args[0])) args = args[0];
	args = [...args];
	const fn = args.pop();
	fn.$inject = args;
	return fn;
}
var CONSTRUCTOR_ARGS = /constructor\s*[^(]*\(\s*([^)]*)\)/m;
var FN_ARGS = /^(?:async\s+)?(?:function\s*[^(]*)?(?:\(\s*([^)]*)\)|(\w+))/m;
var FN_ARG = /\/\*([^*]*)\*\//m;
function parseAnnotations(fn) {
	if (typeof fn !== "function") throw new Error(`Cannot annotate "${fn}". Expected a function!`);
	const match = fn.toString().match(isClass(fn) ? CONSTRUCTOR_ARGS : FN_ARGS);
	if (!match) return [];
	const args = match[1] || match[2];
	return args && args.split(",").map((arg) => {
		const argMatch = arg.match(FN_ARG);
		return (argMatch && argMatch[1] || arg).trim();
	}) || [];
}
function Injector(modules, _parent) {
	const parent = _parent || { get: function(name, strict) {
		currentlyResolving.push(name);
		if (strict === false) return null;
		else throw error(`No provider for "${name}"!`);
	} };
	const currentlyResolving = [];
	const providers = this._providers = Object.create(parent._providers || null);
	const instances = this._instances = Object.create(null);
	const self = instances.injector = this;
	const error = function(msg) {
		const stack = currentlyResolving.join(" -> ");
		currentlyResolving.length = 0;
		return new Error(stack ? `${msg} (Resolving: ${stack})` : msg);
	};
	function get(name, strict) {
		if (!providers[name] && name.includes(".")) {
			const parts = name.split(".");
			let pivot = get(parts.shift());
			while (parts.length) pivot = pivot[parts.shift()];
			return pivot;
		}
		if (hasOwnProp(instances, name)) return instances[name];
		if (hasOwnProp(providers, name)) {
			if (currentlyResolving.indexOf(name) !== -1) {
				currentlyResolving.push(name);
				throw error("Cannot resolve circular dependency!");
			}
			currentlyResolving.push(name);
			instances[name] = providers[name][0](providers[name][1]);
			currentlyResolving.pop();
			return instances[name];
		}
		return parent.get(name, strict);
	}
	function fnDef(fn, locals) {
		if (typeof locals === "undefined") locals = {};
		if (typeof fn !== "function") {
			if (isArray$1(fn)) fn = annotate(fn.slice());
			else throw error(`Cannot invoke "${fn}". Expected a function!`);
		}
		const dependencies = (fn.$inject || parseAnnotations(fn)).map((dep) => {
			if (hasOwnProp(locals, dep)) return locals[dep];
			else return get(dep);
		});
		return {
			fn,
			dependencies
		};
	}
	function instantiate(type) {
		const { fn, dependencies } = fnDef(type);
		return new (Function.prototype.bind.call(fn, null, ...dependencies))();
	}
	function invoke(func, context, locals) {
		const { fn, dependencies } = fnDef(func, locals);
		return fn.apply(context, dependencies);
	}
	function createPrivateInjectorFactory(childInjector) {
		return annotate((key) => childInjector.get(key));
	}
	function createChild(modules, forceNewInstances) {
		if (forceNewInstances && forceNewInstances.length) {
			const fromParentModule = Object.create(null);
			const matchedScopes = Object.create(null);
			const privateInjectorsCache = [];
			const privateChildInjectors = [];
			const privateChildFactories = [];
			let provider;
			let cacheIdx;
			let privateChildInjector;
			let privateChildInjectorFactory;
			for (let name in providers) {
				provider = providers[name];
				if (forceNewInstances.indexOf(name) !== -1) {
					if (provider[2] === "private") {
						cacheIdx = privateInjectorsCache.indexOf(provider[3]);
						if (cacheIdx === -1) {
							privateChildInjector = provider[3].createChild([], forceNewInstances);
							privateChildInjectorFactory = createPrivateInjectorFactory(privateChildInjector);
							privateInjectorsCache.push(provider[3]);
							privateChildInjectors.push(privateChildInjector);
							privateChildFactories.push(privateChildInjectorFactory);
							fromParentModule[name] = [
								privateChildInjectorFactory,
								name,
								"private",
								privateChildInjector
							];
						} else fromParentModule[name] = [
							privateChildFactories[cacheIdx],
							name,
							"private",
							privateChildInjectors[cacheIdx]
						];
					} else fromParentModule[name] = [provider[2], provider[1]];
					matchedScopes[name] = true;
				}
				if ((provider[2] === "factory" || provider[2] === "type") && provider[1].$scope) forceNewInstances.forEach((scope) => {
					if (provider[1].$scope.indexOf(scope) !== -1) {
						fromParentModule[name] = [provider[2], provider[1]];
						matchedScopes[scope] = true;
					}
				});
			}
			forceNewInstances.forEach((scope) => {
				if (!matchedScopes[scope]) throw new Error("No provider for \"" + scope + "\". Cannot use provider from the parent!");
			});
			modules.unshift(fromParentModule);
		}
		return new Injector(modules, self);
	}
	const factoryMap = {
		factory: invoke,
		type: instantiate,
		value: function(value) {
			return value;
		}
	};
	function createInitializer(moduleDefinition, injector) {
		const initializers = moduleDefinition.__init__ || [];
		return function() {
			initializers.forEach((initializer) => {
				if (typeof initializer === "string") injector.get(initializer);
				else injector.invoke(initializer);
			});
		};
	}
	function loadModule(moduleDefinition) {
		const moduleExports = moduleDefinition.__exports__;
		if (moduleExports) {
			const nestedModules = moduleDefinition.__modules__;
			const clonedModule = Object.keys(moduleDefinition).reduce((clonedModule, key) => {
				if (key !== "__exports__" && key !== "__modules__" && key !== "__init__" && key !== "__depends__") clonedModule[key] = moduleDefinition[key];
				return clonedModule;
			}, Object.create(null));
			const privateInjector = createChild((nestedModules || []).concat(clonedModule));
			const getFromPrivateInjector = annotate(function(key) {
				return privateInjector.get(key);
			});
			moduleExports.forEach(function(key) {
				providers[key] = [
					getFromPrivateInjector,
					key,
					"private",
					privateInjector
				];
			});
			const initializers = (moduleDefinition.__init__ || []).slice();
			initializers.unshift(function() {
				privateInjector.init();
			});
			moduleDefinition = Object.assign({}, moduleDefinition, { __init__: initializers });
			return createInitializer(moduleDefinition, privateInjector);
		}
		Object.keys(moduleDefinition).forEach(function(key) {
			if (key === "__init__" || key === "__depends__") return;
			const typeDeclaration = moduleDefinition[key];
			if (typeDeclaration[2] === "private") {
				providers[key] = typeDeclaration;
				return;
			}
			const type = typeDeclaration[0];
			const value = typeDeclaration[1];
			providers[key] = [
				factoryMap[type],
				arrayUnwrap(type, value),
				type
			];
		});
		return createInitializer(moduleDefinition, self);
	}
	function resolveDependencies(moduleDefinitions, moduleDefinition) {
		if (moduleDefinitions.indexOf(moduleDefinition) !== -1) return moduleDefinitions;
		moduleDefinitions = (moduleDefinition.__depends__ || []).reduce(resolveDependencies, moduleDefinitions);
		if (moduleDefinitions.indexOf(moduleDefinition) !== -1) return moduleDefinitions;
		return moduleDefinitions.concat(moduleDefinition);
	}
	function bootstrap(moduleDefinitions) {
		const initializers = moduleDefinitions.reduce(resolveDependencies, []).map(loadModule);
		let initialized = false;
		return function() {
			if (initialized) return;
			initialized = true;
			initializers.forEach((initializer) => initializer());
		};
	}
	this.get = get;
	this.invoke = invoke;
	this.instantiate = instantiate;
	this.createChild = createChild;
	this.init = bootstrap(modules);
}
function arrayUnwrap(type, value) {
	if (type !== "value" && isArray$1(value)) value = annotate(value.slice());
	return value;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/draw/BaseRenderer.js
var DEFAULT_RENDER_PRIORITY$1 = 1e3;
function BaseRenderer(eventBus, renderPriority) {
	var self = this;
	renderPriority = renderPriority || DEFAULT_RENDER_PRIORITY$1;
	eventBus.on(["render.shape", "render.connection"], renderPriority, function(evt, context) {
		var type = evt.type, element = context.element, visuals = context.gfx, attrs = context.attrs;
		if (self.canRender(element)) {
			if (type === "render.shape") return self.drawShape(visuals, element, attrs);
			else return self.drawConnection(visuals, element, attrs);
		}
	});
	eventBus.on(["render.getShapePath", "render.getConnectionPath"], renderPriority, function(evt, element) {
		if (self.canRender(element)) {
			if (evt.type === "render.getShapePath") return self.getShapePath(element);
			else return self.getConnectionPath(element);
		}
	});
}
BaseRenderer.prototype.canRender = function(element) {};
BaseRenderer.prototype.drawShape = function(visuals, shape) {};
BaseRenderer.prototype.drawConnection = function(visuals, connection) {};
BaseRenderer.prototype.getShapePath = function(shape) {};
BaseRenderer.prototype.getConnectionPath = function(connection) {};
//#endregion
//#region ../../node_modules/tiny-svg/dist/index.js
function ensureImported(element, target) {
	if (element.ownerDocument !== target.ownerDocument) try {
		return target.ownerDocument.importNode(element, true);
	} catch (e) {}
	return element;
}
function appendTo(element, target) {
	return target.appendChild(ensureImported(element, target));
}
function append(target, node) {
	appendTo(node, target);
	return target;
}
var LENGTH_ATTR = 2;
var CSS_PROPERTIES = {
	"alignment-baseline": 1,
	"baseline-shift": 1,
	"clip": 1,
	"clip-path": 1,
	"clip-rule": 1,
	"color": 1,
	"color-interpolation": 1,
	"color-interpolation-filters": 1,
	"color-profile": 1,
	"color-rendering": 1,
	"cursor": 1,
	"direction": 1,
	"display": 1,
	"dominant-baseline": 1,
	"enable-background": 1,
	"fill": 1,
	"fill-opacity": 1,
	"fill-rule": 1,
	"filter": 1,
	"flood-color": 1,
	"flood-opacity": 1,
	"font": 1,
	"font-family": 1,
	"font-size": LENGTH_ATTR,
	"font-size-adjust": 1,
	"font-stretch": 1,
	"font-style": 1,
	"font-variant": 1,
	"font-weight": 1,
	"glyph-orientation-horizontal": 1,
	"glyph-orientation-vertical": 1,
	"image-rendering": 1,
	"kerning": 1,
	"letter-spacing": 1,
	"lighting-color": 1,
	"marker": 1,
	"marker-end": 1,
	"marker-mid": 1,
	"marker-start": 1,
	"mask": 1,
	"opacity": 1,
	"overflow": 1,
	"pointer-events": 1,
	"shape-rendering": 1,
	"stop-color": 1,
	"stop-opacity": 1,
	"stroke": 1,
	"stroke-dasharray": 1,
	"stroke-dashoffset": 1,
	"stroke-linecap": 1,
	"stroke-linejoin": 1,
	"stroke-miterlimit": 1,
	"stroke-opacity": 1,
	"stroke-width": LENGTH_ATTR,
	"text-anchor": 1,
	"text-decoration": 1,
	"text-rendering": 1,
	"unicode-bidi": 1,
	"visibility": 1,
	"word-spacing": 1,
	"writing-mode": 1
};
function getAttribute(node, name) {
	if (CSS_PROPERTIES[name]) return node.style[name];
	else return node.getAttributeNS(null, name);
}
function setAttribute(node, name, value) {
	var hyphenated = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
	var type = CSS_PROPERTIES[hyphenated];
	if (type) {
		if (type === LENGTH_ATTR && typeof value === "number") value = String(value) + "px";
		node.style[hyphenated] = value;
	} else node.setAttributeNS(null, name, value);
}
function setAttributes(node, attrs) {
	var names = Object.keys(attrs), i = 0, name;
	for (; name = names[i]; i++) setAttribute(node, name, attrs[name]);
}
function attr(node, name, value) {
	if (typeof name === "string") {
		if (value !== void 0) setAttribute(node, name, value);
		else return getAttribute(node, name);
	} else setAttributes(node, name);
	return node;
}
var toString = Object.prototype.toString;
function classes(el) {
	return new ClassList(el);
}
function ClassList(el) {
	if (!el || !el.nodeType) throw new Error("A DOM element reference is required");
	this.el = el;
	this.list = el.classList;
}
ClassList.prototype.add = function(name) {
	this.list.add(name);
	return this;
};
ClassList.prototype.remove = function(name) {
	if ("[object RegExp]" == toString.call(name)) return this.removeMatching(name);
	this.list.remove(name);
	return this;
};
ClassList.prototype.removeMatching = function(re) {
	const arr = this.array();
	for (let i = 0; i < arr.length; i++) if (re.test(arr[i])) this.remove(arr[i]);
	return this;
};
ClassList.prototype.toggle = function(name, force) {
	if ("undefined" !== typeof force) {
		if (force !== this.list.toggle(name, force)) this.list.toggle(name);
	} else this.list.toggle(name);
	return this;
};
ClassList.prototype.array = function() {
	return Array.from(this.list);
};
ClassList.prototype.has = ClassList.prototype.contains = function(name) {
	return this.list.contains(name);
};
function clear(element) {
	var child;
	while (child = element.firstChild) element.removeChild(child);
	return element;
}
function clone(element) {
	return element.cloneNode(true);
}
var ns = { svg: "http://www.w3.org/2000/svg" };
var SVG_START = "<svg xmlns=\"" + ns.svg + "\"";
function parse(svg) {
	var unwrap = false;
	if (svg.substring(0, 4) === "<svg") {
		if (svg.indexOf(ns.svg) === -1) svg = SVG_START + svg.substring(4);
	} else {
		svg = SVG_START + ">" + svg + "</svg>";
		unwrap = true;
	}
	var parsed = parseDocument(svg);
	if (!unwrap) return parsed;
	var fragment = document.createDocumentFragment();
	var parent = parsed.firstChild;
	while (parent.firstChild) fragment.appendChild(parent.firstChild);
	return fragment;
}
function parseDocument(svg) {
	var parser = new DOMParser();
	parser.async = false;
	return parser.parseFromString(svg, "text/xml");
}
function create$1(name, attrs) {
	var element;
	name = name.trim();
	if (name.charAt(0) === "<") {
		element = parse(name).firstChild;
		element = document.importNode(element, true);
	} else element = document.createElementNS(ns.svg, name);
	if (attrs) attr(element, attrs);
	return element;
}
var node = null;
function getNode() {
	if (node === null) node = create$1("svg");
	return node;
}
function extend$1(object, props) {
	var i, k, keys = Object.keys(props);
	for (i = 0; k = keys[i]; i++) object[k] = props[k];
	return object;
}
function createMatrix(a, b, c, d, e, f) {
	var matrix = getNode().createSVGMatrix();
	switch (arguments.length) {
		case 0: return matrix;
		case 1: return extend$1(matrix, a);
		case 6: return extend$1(matrix, {
			a,
			b,
			c,
			d,
			e,
			f
		});
	}
}
function createTransform(matrix) {
	if (matrix) return getNode().createSVGTransformFromMatrix(matrix);
	else return getNode().createSVGTransform();
}
var TEXT_ENTITIES = /([&<>]{1})/g;
var ATTR_ENTITIES = /([&<>\n\r"]{1})/g;
var ENTITY_REPLACEMENT = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "'"
};
function escape(str, pattern) {
	function replaceFn(match, entity) {
		return ENTITY_REPLACEMENT[entity] || entity;
	}
	return str.replace(pattern, replaceFn);
}
function serialize(node, output) {
	var i, len, attrMap, attrNode, childNodes;
	switch (node.nodeType) {
		case 3:
			output.push(escape(node.textContent, TEXT_ENTITIES));
			break;
		case 1:
			output.push("<", node.tagName);
			if (node.hasAttributes()) {
				attrMap = node.attributes;
				for (i = 0, len = attrMap.length; i < len; ++i) {
					attrNode = attrMap.item(i);
					output.push(" ", attrNode.name, "=\"", escape(attrNode.value, ATTR_ENTITIES), "\"");
				}
			}
			if (node.hasChildNodes()) {
				output.push(">");
				childNodes = node.childNodes;
				for (i = 0, len = childNodes.length; i < len; ++i) serialize(childNodes.item(i), output);
				output.push("</", node.tagName, ">");
			} else output.push("/>");
			break;
		case 8:
			output.push("<!--", escape(node.nodeValue, TEXT_ENTITIES), "-->");
			break;
		case 4:
			output.push("<![CDATA[", node.nodeValue, "]]>");
			break;
		default: throw new Error("unable to handle node " + node.nodeType);
	}
	return output;
}
function set$1(element, svg) {
	var parsed = parse(svg);
	clear(element);
	if (!svg) return;
	if (!isFragment(parsed)) parsed = parsed.documentElement;
	var nodes = slice(parsed.childNodes);
	for (var i = 0; i < nodes.length; i++) appendTo(nodes[i], element);
}
function get(element) {
	var child = element.firstChild, output = [];
	while (child) {
		serialize(child, output);
		child = child.nextSibling;
	}
	return output.join("");
}
function isFragment(node) {
	return node.nodeName === "#document-fragment";
}
function innerSVG(element, svg) {
	if (svg !== void 0) {
		try {
			set$1(element, svg);
		} catch (e) {
			throw new Error("error parsing SVG: " + e.message);
		}
		return element;
	} else return get(element);
}
function slice(arr) {
	return Array.prototype.slice.call(arr);
}
function remove$1(element) {
	var parent = element.parentNode;
	if (parent) parent.removeChild(element);
	return element;
}
function wrapMatrix(transformList, transform) {
	if (transform instanceof SVGMatrix) return transformList.createSVGTransformFromMatrix(transform);
	return transform;
}
function setTransforms(transformList, transforms) {
	var i, t;
	transformList.clear();
	for (i = 0; t = transforms[i]; i++) transformList.appendItem(wrapMatrix(transformList, t));
}
function transform$1(node, transforms) {
	var transformList = node.transform.baseVal;
	if (transforms) {
		if (!Array.isArray(transforms)) transforms = [transforms];
		setTransforms(transformList, transforms);
	}
	return transformList.consolidate();
}
//#endregion
//#region ../../node_modules/diagram-js/lib/util/RenderUtil.js
init_dist();
function componentsToPath(elements) {
	return elements.flat().join(",").replace(/,?([A-Za-z]),?/g, "$1");
}
function move(point) {
	return [
		"M",
		point.x,
		point.y
	];
}
function lineTo(point) {
	return [
		"L",
		point.x,
		point.y
	];
}
function curveTo(p1, p2, p3) {
	return [
		"C",
		p1.x,
		p1.y,
		p2.x,
		p2.y,
		p3.x,
		p3.y
	];
}
function drawPath(waypoints, cornerRadius) {
	const pointCount = waypoints.length;
	const path = [move(waypoints[0])];
	for (let i = 1; i < pointCount; i++) {
		const pointBefore = waypoints[i - 1];
		const point = waypoints[i];
		const pointAfter = waypoints[i + 1];
		if (!pointAfter || !cornerRadius) {
			path.push(lineTo(point));
			continue;
		}
		const effectiveRadius = Math.min(cornerRadius, vectorLength(point.x - pointBefore.x, point.y - pointBefore.y), vectorLength(pointAfter.x - point.x, pointAfter.y - point.y));
		if (!effectiveRadius) {
			path.push(lineTo(point));
			continue;
		}
		const beforePoint = getPointAtLength(point, pointBefore, effectiveRadius);
		const beforePoint2 = getPointAtLength(point, pointBefore, effectiveRadius * .5);
		const afterPoint = getPointAtLength(point, pointAfter, effectiveRadius);
		const afterPoint2 = getPointAtLength(point, pointAfter, effectiveRadius * .5);
		path.push(lineTo(beforePoint));
		path.push(curveTo(beforePoint2, afterPoint2, afterPoint));
	}
	return path;
}
function getPointAtLength(start, end, length) {
	const deltaX = end.x - start.x;
	const deltaY = end.y - start.y;
	const percent = length / vectorLength(deltaX, deltaY);
	return {
		x: start.x + deltaX * percent,
		y: start.y + deltaY * percent
	};
}
function vectorLength(x, y) {
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
function createLine(points, attrs, radius) {
	if (isNumber(attrs)) {
		radius = attrs;
		attrs = null;
	}
	if (!attrs) attrs = {};
	const line = create$1("path", attrs);
	if (isNumber(radius)) line.dataset.cornerRadius = String(radius);
	return updateLine(line, points);
}
function updateLine(gfx, points) {
	attr(gfx, { d: componentsToPath(drawPath(points, parseInt(gfx.dataset.cornerRadius, 10) || 0)) });
	return gfx;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/util/Elements.js
init_dist();
function getParents(elements) {
	var elementsSet = new Set(elements);
	return filter(elements, function(element) {
		var parent = element.parent;
		while (parent) {
			if (elementsSet.has(parent)) return false;
			parent = parent.parent;
		}
		return true;
	});
}
function eachElement(elements, fn, depth) {
	depth = depth || 0;
	if (!isArray$2(elements)) elements = [elements];
	forEach(elements, function(s, i) {
		var filter = fn(s, i, depth);
		if (isArray$2(filter) && filter.length) eachElement(filter, fn, depth + 1);
	});
}
function selfAndChildren(elements, unique, maxDepth) {
	var result = new Set(), processedChildren = new Set();
	eachElement(elements, function(element, i, depth) {
		result.add(element);
		var children = element.children;
		if (maxDepth === -1 || depth < maxDepth) {
			if (children && !processedChildren.has(children)) {
				processedChildren.add(children);
				return children;
			}
		}
	});
	return Array.from(result);
}
function selfAndAllChildren(elements, allowDuplicates) {
	return selfAndChildren(elements, true, -1);
}
function getClosure(elements, isTopLevel, closure) {
	if (isUndefined$1(isTopLevel)) isTopLevel = true;
	if (isObject(isTopLevel)) {
		closure = isTopLevel;
		isTopLevel = true;
	}
	closure = closure || {};
	var allShapes = copyObject(closure.allShapes), allConnections = copyObject(closure.allConnections), enclosedElements = copyObject(closure.enclosedElements), enclosedConnections = copyObject(closure.enclosedConnections);
	var topLevel = copyObject(closure.topLevel, isTopLevel && groupBy(elements, function(e) {
		return e.id;
	}));
	function handleConnection(c) {
		if (topLevel[c.source.id] && topLevel[c.target.id]) topLevel[c.id] = [c];
		if (allShapes[c.source.id] && allShapes[c.target.id]) enclosedConnections[c.id] = enclosedElements[c.id] = c;
		allConnections[c.id] = c;
	}
	function handleElement(element) {
		enclosedElements[element.id] = element;
		if (element.waypoints) enclosedConnections[element.id] = allConnections[element.id] = element;
		else {
			allShapes[element.id] = element;
			forEach(element.incoming, handleConnection);
			forEach(element.outgoing, handleConnection);
			return element.children;
		}
	}
	eachElement(elements, handleElement);
	return {
		allShapes,
		allConnections,
		topLevel,
		enclosedConnections,
		enclosedElements
	};
}
function getBBox(elements, stopRecursion) {
	stopRecursion = !!stopRecursion;
	if (!isArray$2(elements)) elements = [elements];
	var minX, minY, maxX, maxY;
	forEach(elements, function(element) {
		var bbox = element;
		if (element.waypoints && !stopRecursion) bbox = getBBox(element.waypoints, true);
		var x = bbox.x, y = bbox.y, height = bbox.height || 0, width = bbox.width || 0;
		if (x < minX || minX === void 0) minX = x;
		if (y < minY || minY === void 0) minY = y;
		if (x + width > maxX || maxX === void 0) maxX = x + width;
		if (y + height > maxY || maxY === void 0) maxY = y + height;
	});
	return {
		x: minX,
		y: minY,
		height: maxY - minY,
		width: maxX - minX
	};
}
function getEnclosedElements(elements, bbox) {
	var filteredElements = {};
	forEach(elements, function(element) {
		var e = element;
		if (e.waypoints) e = getBBox(e);
		if (!isNumber(bbox.y) && e.x > bbox.x) filteredElements[element.id] = element;
		if (!isNumber(bbox.x) && e.y > bbox.y) filteredElements[element.id] = element;
		if (e.x > bbox.x && e.y > bbox.y) {
			if (isNumber(bbox.width) && isNumber(bbox.height) && e.width + e.x < bbox.width + bbox.x && e.height + e.y < bbox.height + bbox.y) filteredElements[element.id] = element;
			else if (!isNumber(bbox.width) || !isNumber(bbox.height)) filteredElements[element.id] = element;
		}
	});
	return filteredElements;
}
function getType(element) {
	if ("waypoints" in element) return "connection";
	if ("x" in element) return "shape";
	return "root";
}
function isFrameElement(element) {
	return !!(element && element.isFrame);
}
function copyObject(src1, src2) {
	return assign$1({}, src1 || {}, src2 || {});
}
//#endregion
//#region ../../node_modules/diagram-js/lib/draw/DefaultRenderer.js
init_dist();
var DEFAULT_RENDER_PRIORITY = 1;
function DefaultRenderer(eventBus, styles) {
	BaseRenderer.call(this, eventBus, DEFAULT_RENDER_PRIORITY);
	this.CONNECTION_STYLE = styles.style(["no-fill"], {
		strokeWidth: 5,
		stroke: "fuchsia"
	});
	this.SHAPE_STYLE = styles.style({
		fill: "white",
		stroke: "fuchsia",
		strokeWidth: 2
	});
	this.FRAME_STYLE = styles.style(["no-fill"], {
		stroke: "fuchsia",
		strokeDasharray: 4,
		strokeWidth: 2
	});
}
e$2(DefaultRenderer, BaseRenderer);
DefaultRenderer.prototype.canRender = function() {
	return true;
};
DefaultRenderer.prototype.drawShape = function drawShape(visuals, element, attrs) {
	var rect = create$1("rect");
	attr(rect, {
		x: 0,
		y: 0,
		width: element.width || 0,
		height: element.height || 0
	});
	if (isFrameElement(element)) attr(rect, assign$1({}, this.FRAME_STYLE, attrs || {}));
	else attr(rect, assign$1({}, this.SHAPE_STYLE, attrs || {}));
	append(visuals, rect);
	return rect;
};
DefaultRenderer.prototype.drawConnection = function drawConnection(visuals, connection, attrs) {
	var line = createLine(connection.waypoints, assign$1({}, this.CONNECTION_STYLE, attrs || {}));
	append(visuals, line);
	return line;
};
DefaultRenderer.prototype.getShapePath = function getShapePath(shape) {
	var x = shape.x, y = shape.y, width = shape.width, height = shape.height;
	return componentsToPath([
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
	]);
};
DefaultRenderer.prototype.getConnectionPath = function getConnectionPath(connection) {
	var waypoints = connection.waypoints;
	var idx, point, connectionPath = [];
	for (idx = 0; point = waypoints[idx]; idx++) {
		point = point.original || point;
		connectionPath.push([
			idx === 0 ? "M" : "L",
			point.x,
			point.y
		]);
	}
	return componentsToPath(connectionPath);
};
DefaultRenderer.$inject = ["eventBus", "styles"];
//#endregion
//#region ../../node_modules/diagram-js/lib/draw/Styles.js
init_dist();
function Styles() {
	var defaultTraits = {
		"no-fill": { fill: "none" },
		"no-border": { strokeOpacity: 0 },
		"no-events": { pointerEvents: "none" }
	};
	var self = this;
	this.cls = function(className, traits, additionalAttrs) {
		var attrs = this.style(traits, additionalAttrs);
		return assign$1(attrs, { "class": className });
	};
	this.style = function(traits, additionalAttrs) {
		if (!isArray$2(traits) && !additionalAttrs) {
			additionalAttrs = traits;
			traits = [];
		}
		var attrs = reduce(traits, function(attrs, t) {
			return assign$1(attrs, defaultTraits[t] || {});
		}, {});
		return additionalAttrs ? assign$1(attrs, additionalAttrs) : attrs;
	};
	this.computeStyle = function(custom, traits, defaultStyles) {
		if (!isArray$2(traits)) {
			defaultStyles = traits;
			traits = [];
		}
		return self.style(traits || [], assign$1({}, defaultStyles, custom || {}));
	};
}
//#endregion
//#region ../../node_modules/diagram-js/lib/draw/index.js
var draw_default = {
	__init__: ["defaultRenderer"],
	defaultRenderer: ["type", DefaultRenderer],
	styles: ["type", Styles]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/util/Collections.js
function remove(collection, element) {
	if (!collection || !element) return -1;
	var idx = collection.indexOf(element);
	if (idx !== -1) collection.splice(idx, 1);
	return idx;
}
function add(collection, element, idx) {
	if (!collection || !element) return;
	if (typeof idx !== "number") idx = -1;
	var currentIdx = collection.indexOf(element);
	if (currentIdx !== -1) {
		if (currentIdx === idx) return;
		else if (idx !== -1) collection.splice(currentIdx, 1);
		else return;
	}
	if (idx !== -1) collection.splice(idx, 0, element);
	else collection.push(element);
}
function indexOf(collection, element) {
	if (!collection || !element) return -1;
	return collection.indexOf(element);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/util/Geometry.js
init_dist();
function pointDistance(a, b) {
	if (!a || !b) return -1;
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
function pointsOnLine(p, q, r, accuracy) {
	if (typeof accuracy === "undefined") accuracy = 5;
	if (!p || !q || !r) return false;
	var val = (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x), dist = pointDistance(p, q);
	return Math.abs(val / dist) <= accuracy;
}
var ALIGNED_THRESHOLD = 2;
function pointsAligned(a, b) {
	var points = Array.from(arguments).flat();
	for (const [axis, orientation] of Object.entries({
		"x": "v",
		"y": "h"
	})) if (pointsAlignedOnAxis(axis, points)) return orientation;
	return false;
}
function pointsAlignedOnAxis(axis, points) {
	const referencePoint = points[0];
	return every(points, function(point) {
		return Math.abs(referencePoint[axis] - point[axis]) <= ALIGNED_THRESHOLD;
	});
}
function pointInRect(p, rect, tolerance) {
	tolerance = tolerance || 0;
	return p.x > rect.x - tolerance && p.y > rect.y - tolerance && p.x < rect.x + rect.width + tolerance && p.y < rect.y + rect.height + tolerance;
}
function getMidPoint(p, q) {
	return {
		x: Math.round(p.x + (q.x - p.x) / 2),
		y: Math.round(p.y + (q.y - p.y) / 2)
	};
}
//#endregion
//#region ../../node_modules/path-intersection/intersect.js
var p2s = /,?([a-z]),?/gi;
var toFloat = parseFloat;
var math = Math;
var PI = math.PI;
var mmin = math.min;
var mmax = math.max;
var pow = math.pow;
var abs = math.abs;
var pathCommand = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?[\s]*,?[\s]*)+)/gi;
var pathValues = /(-?\d*\.?\d*(?:e[-+]?\d+)?)[\s]*,?[\s]*/gi;
var isArray = Array.isArray || function(o) {
	return o instanceof Array;
};
function hasProperty(obj, property) {
	return Object.prototype.hasOwnProperty.call(obj, property);
}
function repush(array, item) {
	for (var i = 0, ii = array.length; i < ii; i++) if (array[i] === item) return array.push(array.splice(i, 1)[0]);
}
function cacher(f) {
	function newf() {
		var args = Array.prototype.slice.call(arguments, 0).join("␀"), cache = newf.cache = newf.cache || {}, count = newf.count = newf.count || [];
		if (hasProperty(cache, args)) {
			repush(count, args);
			return cache[args];
		}
		count.length >= 1e3 && delete cache[count.shift()];
		count.push(args);
		cache[args] = f(...arguments);
		return cache[args];
	}
	return newf;
}
function parsePathString(pathString) {
	if (!pathString) return null;
	var paramCounts = {
		a: 7,
		c: 6,
		h: 1,
		l: 2,
		m: 2,
		q: 4,
		s: 4,
		t: 2,
		v: 1,
		z: 0
	}, pathComponents = [];
	String(pathString).replace(pathCommand, function(a, b, c) {
		var params = [], name = b.toLowerCase();
		c.replace(pathValues, function(a, b) {
			b && params.push(+b);
		});
		if (name == "m" && params.length > 2) {
			pathComponents.push([b, ...params.splice(0, 2)]);
			name = "l";
			b = b == "m" ? "l" : "L";
		}
		while (params.length >= paramCounts[name]) {
			pathComponents.push([b, ...params.splice(0, paramCounts[name])]);
			if (!paramCounts[name]) break;
		}
	});
	pathComponents.toString = pathToString;
	return pathComponents;
}
function isPathAbsolute(pathComponents) {
	for (var i = 0, ii = pathComponents.length; i < ii; i++) {
		var command = pathComponents[i][0];
		if (typeof command === "string" && command !== command.toUpperCase()) return false;
	}
	return true;
}
function isPathCurve(pathComponents) {
	for (var i = 0, ii = pathComponents.length; i < ii; i++) {
		var command = pathComponents[i][0];
		if (command !== "M" && command !== "C") return false;
	}
	return true;
}
function rectBBox(x, y, width, height) {
	if (arguments.length === 1) {
		y = x.y;
		width = x.width;
		height = x.height;
		x = x.x;
	}
	return {
		x,
		y,
		width,
		height,
		x2: x + width,
		y2: y + height
	};
}
function pathToString() {
	return this.join(",").replace(p2s, "$1");
}
function pathClone(pathComponents) {
	var pathComponentsClone = new Array(pathComponents.length);
	for (var i = 0, ii = pathComponents.length; i < ii; i++) {
		var component = pathComponents[i];
		var componentClone = pathComponentsClone[i] = new Array(component.length);
		for (var j = 0, jj = component.length; j < jj; j++) componentClone[j] = component[j];
	}
	pathComponentsClone.toString = pathToString;
	return pathComponentsClone;
}
function findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
	var t1 = 1 - t, t13 = pow(t1, 3), t12 = pow(t1, 2), t3 = t * t * t, x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x, y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y;
	return {
		x: fixError(x),
		y: fixError(y)
	};
}
function bezierBBox(points) {
	var bbox = curveBBox(...points);
	return rectBBox(bbox.x0, bbox.y0, bbox.x1 - bbox.x0, bbox.y1 - bbox.y0);
}
function isPointInsideBBox(bbox, x, y) {
	return x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height;
}
function isBBoxIntersect(bbox1, bbox2) {
	bbox1 = rectBBox(bbox1);
	bbox2 = rectBBox(bbox2);
	return isPointInsideBBox(bbox2, bbox1.x, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x, bbox1.y2) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y2) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y2) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
}
function base3(t, p1, p2, p3, p4) {
	return t * (t * (-3 * p1 + 9 * p2 - 9 * p3 + 3 * p4) + 6 * p1 - 12 * p2 + 6 * p3) - 3 * p1 + 3 * p2;
}
function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
	if (z == null) z = 1;
	z = z > 1 ? 1 : z < 0 ? 0 : z;
	var z2 = z / 2, n = 12, Tvalues = [
		-.1252,
		.1252,
		-.3678,
		.3678,
		-.5873,
		.5873,
		-.7699,
		.7699,
		-.9041,
		.9041,
		-.9816,
		.9816
	], Cvalues = [
		.2491,
		.2491,
		.2335,
		.2335,
		.2032,
		.2032,
		.1601,
		.1601,
		.1069,
		.1069,
		.0472,
		.0472
	], sum = 0;
	for (var i = 0; i < n; i++) {
		var ct = z2 * Tvalues[i] + z2, xbase = base3(ct, x1, x2, x3, x4), ybase = base3(ct, y1, y2, y3, y4), comb = xbase * xbase + ybase * ybase;
		sum += Cvalues[i] * math.sqrt(comb);
	}
	return z2 * sum;
}
function intersectLines(x1, y1, x2, y2, x3, y3, x4, y4) {
	if (mmax(x1, x2) < mmin(x3, x4) || mmin(x1, x2) > mmax(x3, x4) || mmax(y1, y2) < mmin(y3, y4) || mmin(y1, y2) > mmax(y3, y4)) return;
	var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
	if (!denominator) return;
	var px = fixError(nx / denominator), py = fixError(ny / denominator), px2 = +px.toFixed(2), py2 = +py.toFixed(2);
	if (px2 < +mmin(x1, x2).toFixed(2) || px2 > +mmax(x1, x2).toFixed(2) || px2 < +mmin(x3, x4).toFixed(2) || px2 > +mmax(x3, x4).toFixed(2) || py2 < +mmin(y1, y2).toFixed(2) || py2 > +mmax(y1, y2).toFixed(2) || py2 < +mmin(y3, y4).toFixed(2) || py2 > +mmax(y3, y4).toFixed(2)) return;
	return {
		x: px,
		y: py
	};
}
function fixError(number) {
	return Math.round(number * 1e11) / 1e11;
}
function findBezierIntersections(bez1, bez2, justCount) {
	if (!isBBoxIntersect(bezierBBox(bez1), bezierBBox(bez2))) return justCount ? 0 : [];
	var l1 = bezlen(...bez1), l2 = bezlen(...bez2), n1 = isLine(bez1) ? 1 : ~~(l1 / 5) || 1, n2 = isLine(bez2) ? 1 : ~~(l2 / 5) || 1, dots1 = new Array(n1 + 1), dots2 = new Array(n2 + 1), xy = {}, res = justCount ? 0 : [], i = 0, j;
	for (; i < n1 + 1; i++) {
		var p = findDotsAtSegment(...bez1, i / n1);
		dots1[i] = {
			x: p.x,
			y: p.y,
			t: i / n1
		};
	}
	for (i = 0; i < n2 + 1; i++) {
		p = findDotsAtSegment(...bez2, i / n2);
		dots2[i] = {
			x: p.x,
			y: p.y,
			t: i / n2
		};
	}
	for (i = 0; i < n1; i++) for (j = 0; j < n2; j++) {
		var di = dots1[i], di1 = dots1[i + 1], dj = dots2[j], dj1 = dots2[j + 1], ci = abs(di1.x - di.x) < .01 ? "y" : "x", cj = abs(dj1.x - dj.x) < .01 ? "y" : "x", is = intersectLines(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y), key;
		if (is) {
			key = is.x.toFixed(9) + "#" + is.y.toFixed(9);
			if (xy[key]) continue;
			xy[key] = true;
			var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t), t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
			if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
				if (justCount) res++;
				else res.push({
					x: is.x,
					y: is.y,
					t1,
					t2
				});
			}
		}
	}
	return res;
}
function findPathIntersections(path1, path2, justCount) {
	path1 = pathToCurve(path1);
	path2 = pathToCurve(path2);
	var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2, res = justCount ? 0 : [];
	for (var i = 0, ii = path1.length; i < ii; i++) {
		var pi = path1[i];
		if (pi[0] == "M") {
			x1 = x1m = pi[1];
			y1 = y1m = pi[2];
		} else {
			if (pi[0] == "C") {
				bez1 = [
					x1,
					y1,
					...pi.slice(1)
				];
				x1 = bez1[6];
				y1 = bez1[7];
			} else {
				bez1 = [
					x1,
					y1,
					x1,
					y1,
					x1m,
					y1m,
					x1m,
					y1m
				];
				x1 = x1m;
				y1 = y1m;
			}
			for (var j = 0, jj = path2.length; j < jj; j++) {
				var pj = path2[j];
				if (pj[0] == "M") {
					x2 = x2m = pj[1];
					y2 = y2m = pj[2];
				} else {
					if (pj[0] == "C") {
						bez2 = [
							x2,
							y2,
							...pj.slice(1)
						];
						x2 = bez2[6];
						y2 = bez2[7];
					} else {
						bez2 = [
							x2,
							y2,
							x2,
							y2,
							x2m,
							y2m,
							x2m,
							y2m
						];
						x2 = x2m;
						y2 = y2m;
					}
					var intr = findBezierIntersections(bez1, bez2, justCount);
					if (justCount) res += intr;
					else {
						for (var k = 0, kk = intr.length; k < kk; k++) {
							intr[k].segment1 = i;
							intr[k].segment2 = j;
							intr[k].bez1 = bez1;
							intr[k].bez2 = bez2;
						}
						res = res.concat(intr);
					}
				}
			}
		}
	}
	return res;
}
function isPathComponents(path) {
	return isArray(path) && isArray(path[0]);
}
function pathToAbsolute(pathComponents) {
	if (isPathAbsolute(pathComponents)) return pathComponents;
	var res = new Array(pathComponents.length), x = 0, y = 0, mx = 0, my = 0, start = 0, pa0;
	if (pathComponents[0][0] == "M") {
		x = +pathComponents[0][1];
		y = +pathComponents[0][2];
		mx = x;
		my = y;
		start++;
		res[0] = [
			"M",
			x,
			y
		];
	}
	for (var r, pa, i = start, ii = pathComponents.length; i < ii; i++) {
		pa = pathComponents[i];
		pa0 = pa[0];
		res[i] = r = new Array(pa.length);
		if (pa0 != pa0.toUpperCase()) {
			r[0] = pa0.toUpperCase();
			switch (r[0]) {
				case "A":
					r[1] = pa[1];
					r[2] = pa[2];
					r[3] = pa[3];
					r[4] = pa[4];
					r[5] = pa[5];
					r[6] = +pa[6] + x;
					r[7] = +pa[7] + y;
					break;
				case "V":
					r[1] = +pa[1] + y;
					break;
				case "H":
					r[1] = +pa[1] + x;
					break;
				case "M":
					mx = +pa[1] + x;
					my = +pa[2] + y;
				default: for (var j = 1, jj = pa.length; j < jj; j++) r[j] = +pa[j] + (j % 2 ? x : y);
			}
		} else for (var k = 0, kk = pa.length; k < kk; k++) r[k] = pa[k];
		pa0 = pa0.toUpperCase();
		switch (r[0]) {
			case "Z":
				x = +mx;
				y = +my;
				break;
			case "H":
				x = r[1];
				break;
			case "V":
				y = r[1];
				break;
			case "M":
				mx = r[r.length - 2];
				my = r[r.length - 1];
			default:
				x = r[r.length - 2];
				y = r[r.length - 1];
		}
	}
	res.toString = pathToString;
	return res;
}
function isLine(bez) {
	return bez[0] === bez[2] && bez[1] === bez[3] && bez[4] === bez[6] && bez[5] === bez[7];
}
function lineToCurve(x1, y1, x2, y2) {
	return [
		x1,
		y1,
		x2,
		y2,
		x2,
		y2
	];
}
function qubicToCurve(x1, y1, ax, ay, x2, y2) {
	var _13 = 1 / 3, _23 = 2 / 3;
	return [
		_13 * x1 + _23 * ax,
		_13 * y1 + _23 * ay,
		_13 * x2 + _23 * ax,
		_13 * y2 + _23 * ay,
		x2,
		y2
	];
}
function arcToCurve(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
	var _120 = PI * 120 / 180, rad = PI / 180 * (+angle || 0), res = [], xy, rotate = cacher(function(x, y, rad) {
		return {
			x: x * math.cos(rad) - y * math.sin(rad),
			y: x * math.sin(rad) + y * math.cos(rad)
		};
	});
	if (!recursive) {
		xy = rotate(x1, y1, -rad);
		x1 = xy.x;
		y1 = xy.y;
		xy = rotate(x2, y2, -rad);
		x2 = xy.x;
		y2 = xy.y;
		var x = (x1 - x2) / 2, y = (y1 - y2) / 2;
		var h = x * x / (rx * rx) + y * y / (ry * ry);
		if (h > 1) {
			h = math.sqrt(h);
			rx = h * rx;
			ry = h * ry;
		}
		var rx2 = rx * rx, ry2 = ry * ry, k = (large_arc_flag == sweep_flag ? -1 : 1) * math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))), cx = k * rx * y / ry + (x1 + x2) / 2, cy = k * -ry * x / rx + (y1 + y2) / 2, f1 = math.asin(((y1 - cy) / ry).toFixed(9)), f2 = math.asin(((y2 - cy) / ry).toFixed(9));
		f1 = x1 < cx ? PI - f1 : f1;
		f2 = x2 < cx ? PI - f2 : f2;
		f1 < 0 && (f1 = PI * 2 + f1);
		f2 < 0 && (f2 = PI * 2 + f2);
		if (sweep_flag && f1 > f2) f1 = f1 - PI * 2;
		if (!sweep_flag && f2 > f1) f2 = f2 - PI * 2;
	} else {
		f1 = recursive[0];
		f2 = recursive[1];
		cx = recursive[2];
		cy = recursive[3];
	}
	var df = f2 - f1;
	if (abs(df) > _120) {
		var f2old = f2, x2old = x2, y2old = y2;
		f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
		x2 = cx + rx * math.cos(f2);
		y2 = cy + ry * math.sin(f2);
		res = arcToCurve(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [
			f2,
			f2old,
			cx,
			cy
		]);
	}
	df = f2 - f1;
	var c1 = math.cos(f1), s1 = math.sin(f1), c2 = math.cos(f2), s2 = math.sin(f2), t = math.tan(df / 4), hx = 4 / 3 * rx * t, hy = 4 / 3 * ry * t, m1 = [x1, y1], m2 = [x1 + hx * s1, y1 - hy * c1], m3 = [x2 + hx * s2, y2 - hy * c2], m4 = [x2, y2];
	m2[0] = 2 * m1[0] - m2[0];
	m2[1] = 2 * m1[1] - m2[1];
	if (recursive) return [
		m2,
		m3,
		m4
	].concat(res);
	else {
		res = [
			m2,
			m3,
			m4
		].concat(res).join().split(",");
		var newres = [];
		for (var i = 0, ii = res.length; i < ii; i++) newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
		return newres;
	}
}
function curveBBox(x0, y0, x1, y1, x2, y2, x3, y3) {
	var tvalues = [], bounds = [[], []], a, b, c, t, t1, t2, b2ac, sqrtb2ac;
	for (var i = 0; i < 2; ++i) {
		if (i == 0) {
			b = 6 * x0 - 12 * x1 + 6 * x2;
			a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
			c = 3 * x1 - 3 * x0;
		} else {
			b = 6 * y0 - 12 * y1 + 6 * y2;
			a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
			c = 3 * y1 - 3 * y0;
		}
		if (abs(a) < 1e-12) {
			if (abs(b) < 1e-12) continue;
			t = -c / b;
			if (0 < t && t < 1) tvalues.push(t);
			continue;
		}
		b2ac = b * b - 4 * c * a;
		sqrtb2ac = math.sqrt(b2ac);
		if (b2ac < 0) continue;
		t1 = (-b + sqrtb2ac) / (2 * a);
		if (0 < t1 && t1 < 1) tvalues.push(t1);
		t2 = (-b - sqrtb2ac) / (2 * a);
		if (0 < t2 && t2 < 1) tvalues.push(t2);
	}
	var j = tvalues.length, jlen = j, mt;
	while (j--) {
		t = tvalues[j];
		mt = 1 - t;
		bounds[0][j] = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
		bounds[1][j] = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
	}
	bounds[0][jlen] = x0;
	bounds[1][jlen] = y0;
	bounds[0][jlen + 1] = x3;
	bounds[1][jlen + 1] = y3;
	bounds[0].length = bounds[1].length = jlen + 2;
	return {
		x0: mmin(...bounds[0]),
		y0: mmin(...bounds[1]),
		x1: mmax(...bounds[0]),
		y1: mmax(...bounds[1])
	};
}
function pathToCurve(path) {
	if (!isPathComponents(path)) path = parsePathString(path);
	if (isPathCurve(path)) return path;
	var curvedPath = pathClone(pathToAbsolute(path)), attrs = {
		x: 0,
		y: 0,
		bx: 0,
		by: 0,
		X: 0,
		Y: 0,
		qx: null,
		qy: null
	}, processPath = function(path, d, pathCommand) {
		var nx, ny;
		if (!path) return [
			"C",
			d.x,
			d.y,
			d.x,
			d.y,
			d.x,
			d.y
		];
		!(path[0] in {
			T: 1,
			Q: 1
		}) && (d.qx = d.qy = null);
		switch (path[0]) {
			case "M":
				d.X = path[1];
				d.Y = path[2];
				break;
			case "A":
				path = ["C", ...arcToCurve(d.x, d.y, ...path.slice(1))];
				break;
			case "S":
				if (pathCommand == "C" || pathCommand == "S") {
					nx = d.x * 2 - d.bx;
					ny = d.y * 2 - d.by;
				} else {
					nx = d.x;
					ny = d.y;
				}
				path = [
					"C",
					nx,
					ny,
					...path.slice(1)
				];
				break;
			case "T":
				if (pathCommand == "Q" || pathCommand == "T") {
					d.qx = d.x * 2 - d.qx;
					d.qy = d.y * 2 - d.qy;
				} else {
					d.qx = d.x;
					d.qy = d.y;
				}
				path = ["C", ...qubicToCurve(d.x, d.y, d.qx, d.qy, path[1], path[2])];
				break;
			case "Q":
				d.qx = path[1];
				d.qy = path[2];
				path = ["C", ...qubicToCurve(d.x, d.y, path[1], path[2], path[3], path[4])];
				break;
			case "L":
				path = ["C", ...lineToCurve(d.x, d.y, path[1], path[2])];
				break;
			case "H":
				path = ["C", ...lineToCurve(d.x, d.y, path[1], d.y)];
				break;
			case "V":
				path = ["C", ...lineToCurve(d.x, d.y, d.x, path[1])];
				break;
			case "Z": path = ["C", ...lineToCurve(d.x, d.y, d.X, d.Y)];
		}
		return path;
	}, fixArc = function(pp, i) {
		if (pp[i].length > 7) {
			pp[i].shift();
			var pi = pp[i];
			while (pi.length) {
				pathCommands[i] = "A";
				pp.splice(i++, 0, ["C", ...pi.splice(0, 6)]);
			}
			pp.splice(i, 1);
			ii = curvedPath.length;
		}
	}, pathCommands = [], pfirst = "", pathCommand = "";
	for (var i = 0, ii = curvedPath.length; i < ii; i++) {
		curvedPath[i] && (pfirst = curvedPath[i][0]);
		if (pfirst != "C") {
			pathCommands[i] = pfirst;
			i && (pathCommand = pathCommands[i - 1]);
		}
		curvedPath[i] = processPath(curvedPath[i], attrs, pathCommand);
		if (pathCommands[i] != "A" && pfirst == "C") pathCommands[i] = "C";
		fixArc(curvedPath, i);
		var seg = curvedPath[i], seglen = seg.length;
		attrs.x = seg[seglen - 2];
		attrs.y = seg[seglen - 1];
		attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
		attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
	}
	return curvedPath;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/util/ModelUtil.js
init_dist();
function isConnection(value) {
	return isObject(value) && has(value, "waypoints");
}
function isLabel(value) {
	return isObject(value) && has(value, "labelTarget");
}
function isRoot(value) {
	return isObject(value) && isNil(value.parent);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/layout/LayoutUtil.js
init_dist();
function roundBounds(bounds) {
	return {
		x: Math.round(bounds.x),
		y: Math.round(bounds.y),
		width: Math.round(bounds.width),
		height: Math.round(bounds.height)
	};
}
function roundPoint(point) {
	return {
		x: Math.round(point.x),
		y: Math.round(point.y)
	};
}
function asTRBL(bounds) {
	return {
		top: bounds.y,
		right: bounds.x + (bounds.width || 0),
		bottom: bounds.y + (bounds.height || 0),
		left: bounds.x
	};
}
function asBounds(trbl) {
	return {
		x: trbl.left,
		y: trbl.top,
		width: trbl.right - trbl.left,
		height: trbl.bottom - trbl.top
	};
}
function getBoundsMid(bounds) {
	return roundPoint({
		x: bounds.x + (bounds.width || 0) / 2,
		y: bounds.y + (bounds.height || 0) / 2
	});
}
function getConnectionMid(connection) {
	var waypoints = connection.waypoints;
	var parts = waypoints.reduce(function(parts, point, index) {
		var lastPoint = waypoints[index - 1];
		if (lastPoint) {
			var lastPart = parts[parts.length - 1];
			var startLength = lastPart && lastPart.endLength || 0;
			var length = distance(lastPoint, point);
			parts.push({
				start: lastPoint,
				end: point,
				startLength,
				endLength: startLength + length,
				length
			});
		}
		return parts;
	}, []);
	var midLength = parts.reduce(function(length, part) {
		return length + part.length;
	}, 0) / 2;
	var i = 0;
	var midSegment = parts[i];
	while (midSegment.endLength < midLength) midSegment = parts[++i];
	var segmentProgress = (midLength - midSegment.startLength) / midSegment.length;
	return {
		x: midSegment.start.x + (midSegment.end.x - midSegment.start.x) * segmentProgress,
		y: midSegment.start.y + (midSegment.end.y - midSegment.start.y) * segmentProgress
	};
}
function getMid(element) {
	if (isConnection(element)) return getConnectionMid(element);
	return getBoundsMid(element);
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
function getElementLineIntersection(elementPath, linePath, cropStart) {
	var intersections = getIntersections(elementPath, linePath);
	if (intersections.length === 1) return roundPoint(intersections[0]);
	else if (intersections.length === 2 && pointDistance(intersections[0], intersections[1]) < 1) return roundPoint(intersections[0]);
	else if (intersections.length > 1) {
		intersections = sortBy(intersections, function(i) {
			var distance = Math.floor(i.t2 * 100) || 1;
			distance = 100 - distance;
			distance = (distance < 10 ? "0" : "") + distance;
			return i.segment2 + "#" + distance;
		});
		return roundPoint(intersections[cropStart ? 0 : intersections.length - 1]);
	}
	return null;
}
function getIntersections(a, b) {
	return findPathIntersections(a, b);
}
function filterRedundantWaypoints(waypoints) {
	waypoints = waypoints.slice();
	var idx = 0, point, previousPoint, nextPoint;
	while (waypoints[idx]) {
		point = waypoints[idx];
		previousPoint = waypoints[idx - 1];
		nextPoint = waypoints[idx + 1];
		if (pointDistance(point, nextPoint) === 0 || pointsOnLine(previousPoint, nextPoint, point)) waypoints.splice(idx, 1);
		else idx++;
	}
	return waypoints;
}
function distance(a, b) {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
//#endregion
//#region ../../node_modules/diagram-js/lib/core/Canvas.js
init_dist();
function round(number, resolution) {
	return Math.round(number * resolution) / resolution;
}
function ensurePx(number) {
	return isNumber(number) ? number + "px" : number;
}
function findRoot(element) {
	while (element.parent) element = element.parent;
	return element;
}
function createContainer(options) {
	options = assign$1({}, {
		width: "100%",
		height: "100%"
	}, options);
	const container = options.container || document.body;
	const parent = document.createElement("div");
	parent.setAttribute("class", "djs-container djs-parent bio-theme-parent");
	assign(parent, {
		position: "relative",
		overflow: "hidden",
		width: ensurePx(options.width),
		height: ensurePx(options.height)
	});
	container.appendChild(parent);
	return parent;
}
function createGroup(parent, cls, childIndex) {
	const group = create$1("g");
	classes(group).add(cls);
	const index = childIndex !== void 0 ? childIndex : parent.childNodes.length - 1;
	parent.insertBefore(group, parent.childNodes[index] || null);
	return group;
}
var BASE_LAYER = "base";
var PLANE_LAYER_INDEX = 0;
var UTILITY_LAYER_INDEX = 1;
var REQUIRED_MODEL_ATTRS = {
	shape: [
		"x",
		"y",
		"width",
		"height"
	],
	connection: ["waypoints"]
};
function Canvas(config, eventBus, graphicsFactory, elementRegistry) {
	this._eventBus = eventBus;
	this._elementRegistry = elementRegistry;
	this._graphicsFactory = graphicsFactory;
	this._rootsIdx = 0;
	this._layers = {};
	this._planes = [];
	this._rootElement = null;
	this._focused = false;
	this._init(config || {});
}
Canvas.$inject = [
	"config.canvas",
	"eventBus",
	"graphicsFactory",
	"elementRegistry"
];
Canvas.prototype._init = function(config) {
	const eventBus = this._eventBus;
	const container = this._container = createContainer(config);
	const svg = this._svg = create$1("svg");
	attr(svg, {
		width: "100%",
		height: "100%"
	});
	attr$1(svg, "tabindex", 0);
	config.autoFocus && eventBus.on("element.hover", () => {
		this.restoreFocus();
	});
	eventBus.on("element.mousedown", 500, (event) => {
		this.focus();
	});
	svg.addEventListener("focusin", () => {
		this._setFocused(true);
	});
	svg.addEventListener("focusout", () => {
		this._setFocused(false);
	});
	svg.addEventListener("mouseover", () => {
		this._eventBus.fire("canvas.mouseover");
	});
	svg.addEventListener("mouseout", () => {
		this._eventBus.fire("canvas.mouseout");
	});
	append(container, svg);
	const viewport = this._viewport = createGroup(svg, "viewport");
	if (config.deferUpdate) this._viewboxChanged = debounce(this._viewboxChanged, 300);
	this._restoreFocus = debounce(this._restoreFocus, 0);
	eventBus.on("diagram.init", () => {
		eventBus.fire("canvas.init", {
			svg,
			viewport
		});
	});
	eventBus.on([
		"shape.added",
		"connection.added",
		"shape.removed",
		"connection.removed",
		"elements.changed",
		"root.set"
	], () => {
		delete this._cachedViewbox;
	});
	eventBus.on("diagram.destroy", 500, this._destroy, this);
	eventBus.on("diagram.clear", 500, this._clear, this);
};
Canvas.prototype._destroy = function() {
	this._restoreFocus.cancel();
	this._eventBus.fire("canvas.destroy", {
		svg: this._svg,
		viewport: this._viewport
	});
	const parent = this._container.parentNode;
	if (parent) parent.removeChild(this._container);
	delete this._svg;
	delete this._container;
	delete this._layers;
	delete this._planes;
	delete this._rootElement;
	delete this._viewport;
};
Canvas.prototype._setFocused = function(focused) {
	if (focused == this._focused) return;
	this._focused = focused;
	this._eventBus.fire("canvas.focus.changed", { focused });
};
Canvas.prototype._clear = function() {
	this._elementRegistry.getAll().forEach((element) => {
		const type = getType(element);
		if (type === "root") this.removeRootElement(element);
		else this._removeElement(element, type);
	});
	this._planes = [];
	this._rootElement = null;
	delete this._cachedViewbox;
};
Canvas.prototype.focus = function() {
	this._svg.focus({ preventScroll: true });
	this._setFocused(true);
};
Canvas.prototype.restoreFocus = function() {
	this._restoreFocus();
};
Canvas.prototype._restoreFocus = function() {
	if (document.activeElement === document.body) this.focus();
};
Canvas.prototype.isFocused = function() {
	return this._focused;
};
Canvas.prototype.getDefaultLayer = function() {
	return this.getLayer(BASE_LAYER, PLANE_LAYER_INDEX);
};
Canvas.prototype.getLayer = function(name, index) {
	if (!name) throw new Error("must specify a name");
	let layer = this._layers[name];
	if (!layer) layer = this._layers[name] = this._createLayer(name, index);
	if (typeof index !== "undefined" && layer.index !== index) throw new Error("layer <" + name + "> already created at index <" + index + ">");
	return layer.group;
};
Canvas.prototype._getChildIndex = function(index) {
	return reduce(this._layers, function(childIndex, layer) {
		if (layer.visible && index >= layer.index) childIndex++;
		return childIndex;
	}, 0);
};
Canvas.prototype._createLayer = function(name, index) {
	if (typeof index === "undefined") index = UTILITY_LAYER_INDEX;
	const childIndex = this._getChildIndex(index);
	return {
		group: createGroup(this._viewport, "layer-" + name, childIndex),
		index,
		visible: true
	};
};
Canvas.prototype.showLayer = function(name) {
	if (!name) throw new Error("must specify a name");
	const layer = this._layers[name];
	if (!layer) throw new Error("layer <" + name + "> does not exist");
	const viewport = this._viewport;
	const group = layer.group;
	const index = layer.index;
	if (layer.visible) return group;
	const childIndex = this._getChildIndex(index);
	viewport.insertBefore(group, viewport.childNodes[childIndex] || null);
	layer.visible = true;
	return group;
};
Canvas.prototype.hideLayer = function(name) {
	if (!name) throw new Error("must specify a name");
	const layer = this._layers[name];
	if (!layer) throw new Error("layer <" + name + "> does not exist");
	const group = layer.group;
	if (!layer.visible) return group;
	remove$1(group);
	layer.visible = false;
	return group;
};
Canvas.prototype._removeLayer = function(name) {
	const layer = this._layers[name];
	if (layer) {
		delete this._layers[name];
		remove$1(layer.group);
	}
};
Canvas.prototype.getActiveLayer = function() {
	const plane = this._findPlaneForRoot(this.getRootElement());
	if (!plane) return null;
	return plane.layer;
};
Canvas.prototype.findRoot = function(element) {
	const elements = this._resolveElements(element);
	let root;
	for (const element of elements) {
		const plane = this._findPlaneForRoot(findRoot(element));
		if (!plane) return;
		if (root && plane.rootElement !== root) return;
		root = plane.rootElement;
	}
	return root;
};
Canvas.prototype.getRootElements = function() {
	return this._planes.map(function(plane) {
		return plane.rootElement;
	});
};
Canvas.prototype._findPlaneForRoot = function(rootElement) {
	return find(this._planes, function(plane) {
		return plane.rootElement === rootElement;
	});
};
Canvas.prototype._resolveElement = function(element) {
	if (typeof element === "string") return this._elementRegistry.get(element);
	return element;
};
Canvas.prototype._resolveElements = function(elements) {
	if (!isArray$2(elements)) elements = [elements];
	return elements.map((element) => this._resolveElement(element)).filter(Boolean);
};
Canvas.prototype.getContainer = function() {
	return this._container;
};
Canvas.prototype._updateMarker = function(element, marker, add) {
	let container;
	element = this._resolveElement(element);
	element.markers = element.markers || new Set();
	container = this._elementRegistry._elements[element.id];
	if (!container) return;
	forEach([container.gfx, container.secondaryGfx], function(gfx) {
		if (gfx) {
			if (add) {
				element.markers.add(marker);
				classes(gfx).add(marker);
			} else {
				element.markers.delete(marker);
				classes(gfx).remove(marker);
			}
		}
	});
	this._eventBus.fire("element.marker.update", {
		element,
		gfx: container.gfx,
		marker,
		add: !!add
	});
};
Canvas.prototype.addMarker = function(element, marker) {
	this._updateMarker(element, marker, true);
};
Canvas.prototype.removeMarker = function(element, marker) {
	this._updateMarker(element, marker, false);
};
Canvas.prototype.hasMarker = function(element, marker) {
	element = this._resolveElement(element);
	if (!element.markers) return false;
	return element.markers.has(marker);
};
Canvas.prototype.toggleMarker = function(element, marker) {
	if (this.hasMarker(element, marker)) this.removeMarker(element, marker);
	else this.addMarker(element, marker);
};
Canvas.prototype.getRootElement = function() {
	const rootElement = this._rootElement;
	if (rootElement || this._planes.length) return rootElement;
	return this.setRootElement(this.addRootElement(null));
};
Canvas.prototype.addRootElement = function(rootElement) {
	const idx = this._rootsIdx++;
	if (!rootElement) rootElement = {
		id: "__implicitroot_" + idx,
		children: [],
		isImplicit: true
	};
	const layerName = rootElement.layer = "root-" + idx;
	this._ensureValid("root", rootElement);
	const layer = this.getLayer(layerName, PLANE_LAYER_INDEX);
	this.hideLayer(layerName);
	this._addRoot(rootElement, layer);
	this._planes.push({
		rootElement,
		layer
	});
	return rootElement;
};
Canvas.prototype.removeRootElement = function(rootElement) {
	rootElement = this._resolveElement(rootElement);
	if (!this._findPlaneForRoot(rootElement)) return;
	this._removeRoot(rootElement);
	this._removeLayer(rootElement.layer);
	this._planes = this._planes.filter(function(plane) {
		return plane.rootElement !== rootElement;
	});
	if (this._rootElement === rootElement) this._rootElement = null;
	return rootElement;
};
Canvas.prototype.setRootElement = function(rootElement) {
	if (rootElement === this._rootElement) return rootElement;
	let plane;
	if (!rootElement) throw new Error("rootElement required");
	plane = this._findPlaneForRoot(rootElement);
	if (!plane) rootElement = this.addRootElement(rootElement);
	this._setRoot(rootElement);
	return rootElement;
};
Canvas.prototype._removeRoot = function(element) {
	const elementRegistry = this._elementRegistry, eventBus = this._eventBus;
	eventBus.fire("root.remove", { element });
	eventBus.fire("root.removed", { element });
	elementRegistry.remove(element);
};
Canvas.prototype._addRoot = function(element, gfx) {
	const elementRegistry = this._elementRegistry, eventBus = this._eventBus;
	eventBus.fire("root.add", { element });
	elementRegistry.add(element, gfx);
	eventBus.fire("root.added", {
		element,
		gfx
	});
};
Canvas.prototype._setRoot = function(rootElement, layer) {
	const currentRoot = this._rootElement;
	if (currentRoot) {
		this._elementRegistry.updateGraphics(currentRoot, null, true);
		this.hideLayer(currentRoot.layer);
	}
	if (rootElement) {
		if (!layer) layer = this._findPlaneForRoot(rootElement).layer;
		this._elementRegistry.updateGraphics(rootElement, this._svg, true);
		this.showLayer(rootElement.layer);
	}
	this._rootElement = rootElement;
	this._eventBus.fire("root.set", { element: rootElement });
};
Canvas.prototype._ensureValid = function(type, element) {
	if (!element.id) throw new Error("element must have an id");
	if (this._elementRegistry.get(element.id)) throw new Error("element <" + element.id + "> already exists");
	const requiredAttrs = REQUIRED_MODEL_ATTRS[type];
	if (!every(requiredAttrs, function(attr) {
		return typeof element[attr] !== "undefined";
	})) throw new Error("must supply { " + requiredAttrs.join(", ") + " } with " + type);
};
Canvas.prototype._setParent = function(element, parent, parentIndex) {
	add(parent.children, element, parentIndex);
	element.parent = parent;
};
Canvas.prototype._addElement = function(type, element, parent, parentIndex) {
	parent = parent || this.getRootElement();
	const eventBus = this._eventBus, graphicsFactory = this._graphicsFactory;
	this._ensureValid(type, element);
	eventBus.fire(type + ".add", {
		element,
		parent
	});
	this._setParent(element, parent, parentIndex);
	const gfx = graphicsFactory.create(type, element, parentIndex);
	this._elementRegistry.add(element, gfx);
	graphicsFactory.update(type, element, gfx);
	eventBus.fire(type + ".added", {
		element,
		gfx
	});
	return element;
};
Canvas.prototype.addShape = function(shape, parent, parentIndex) {
	return this._addElement("shape", shape, parent, parentIndex);
};
Canvas.prototype.addConnection = function(connection, parent, parentIndex) {
	return this._addElement("connection", connection, parent, parentIndex);
};
Canvas.prototype._removeElement = function(element, type) {
	const elementRegistry = this._elementRegistry, graphicsFactory = this._graphicsFactory, eventBus = this._eventBus;
	element = elementRegistry.get(element.id || element);
	if (!element) return;
	eventBus.fire(type + ".remove", { element });
	graphicsFactory.remove(element);
	remove(element.parent && element.parent.children, element);
	element.parent = null;
	eventBus.fire(type + ".removed", { element });
	elementRegistry.remove(element);
	return element;
};
Canvas.prototype.removeShape = function(shape) {
	return this._removeElement(shape, "shape");
};
Canvas.prototype.removeConnection = function(connection) {
	return this._removeElement(connection, "connection");
};
Canvas.prototype.getGraphics = function(element, secondary) {
	return this._elementRegistry.getGraphics(element, secondary);
};
Canvas.prototype._changeViewbox = function(changeFn) {
	this._eventBus.fire("canvas.viewbox.changing");
	changeFn.apply(this);
	this._cachedViewbox = null;
	this._viewboxChanged();
};
Canvas.prototype._viewboxChanged = function() {
	this._eventBus.fire("canvas.viewbox.changed", { viewbox: this.viewbox() });
};
Canvas.prototype.viewbox = function(box) {
	if (box === void 0 && this._cachedViewbox) return structuredClone(this._cachedViewbox);
	const viewport = this._viewport, outerBox = this.getSize();
	let innerBox, matrix, activeLayer, transform, scale, x, y;
	if (!box) {
		activeLayer = this._rootElement ? this.getActiveLayer() : null;
		innerBox = activeLayer && activeLayer.getBBox() || {};
		transform = transform$1(viewport);
		matrix = transform ? transform.matrix : createMatrix();
		scale = round(matrix.a, 1e3);
		x = round(-matrix.e || 0, 1e3);
		y = round(-matrix.f || 0, 1e3);
		box = this._cachedViewbox = {
			x: x ? x / scale : 0,
			y: y ? y / scale : 0,
			width: outerBox.width / scale,
			height: outerBox.height / scale,
			scale,
			inner: {
				width: innerBox.width || 0,
				height: innerBox.height || 0,
				x: innerBox.x || 0,
				y: innerBox.y || 0
			},
			outer: outerBox
		};
		return box;
	} else this._changeViewbox(function() {
		scale = Math.min(outerBox.width / box.width, outerBox.height / box.height);
		const matrix = this._svg.createSVGMatrix().scale(scale).translate(-box.x, -box.y);
		transform$1(viewport, matrix);
	});
	return box;
};
Canvas.prototype.scroll = function(delta) {
	const node = this._viewport;
	let matrix = node.getCTM();
	if (delta) this._changeViewbox(function() {
		delta = assign$1({
			dx: 0,
			dy: 0
		}, delta || {});
		matrix = this._svg.createSVGMatrix().translate(delta.dx, delta.dy).multiply(matrix);
		setCTM(node, matrix);
	});
	return {
		x: matrix.e,
		y: matrix.f
	};
};
Canvas.prototype.scrollToElement = function(element, padding) {
	let defaultPadding = 100;
	const elements = this._resolveElements(element);
	if (!elements.length) return;
	const rootElement = this.findRoot(elements);
	if (!rootElement) return;
	if (rootElement !== this.getRootElement()) this.setRootElement(rootElement);
	const visibleElements = elements.filter((e) => e != rootElement);
	if (!visibleElements.length) return;
	if (!padding) padding = {};
	if (typeof padding === "number") defaultPadding = padding;
	padding = {
		top: padding.top || defaultPadding,
		right: padding.right || defaultPadding,
		bottom: padding.bottom || defaultPadding,
		left: padding.left || defaultPadding
	};
	const elementBounds = getBBox(visibleElements), elementTrbl = asTRBL(elementBounds), viewboxBounds = this.viewbox(), zoom = this.zoom();
	let dx, dy;
	viewboxBounds.y += padding.top / zoom;
	viewboxBounds.x += padding.left / zoom;
	viewboxBounds.width -= (padding.right + padding.left) / zoom;
	viewboxBounds.height -= (padding.bottom + padding.top) / zoom;
	const viewboxTrbl = asTRBL(viewboxBounds);
	if (!(elementBounds.width < viewboxBounds.width && elementBounds.height < viewboxBounds.height)) {
		dx = elementBounds.x - viewboxBounds.x;
		dy = elementBounds.y - viewboxBounds.y;
	} else {
		const dRight = Math.max(0, elementTrbl.right - viewboxTrbl.right), dLeft = Math.min(0, elementTrbl.left - viewboxTrbl.left), dBottom = Math.max(0, elementTrbl.bottom - viewboxTrbl.bottom), dTop = Math.min(0, elementTrbl.top - viewboxTrbl.top);
		dx = dRight || dLeft;
		dy = dBottom || dTop;
	}
	this.scroll({
		dx: -dx * zoom,
		dy: -dy * zoom
	});
};
Canvas.prototype.zoom = function(newScale, center) {
	if (!newScale) return this.viewbox(newScale).scale;
	if (newScale === "fit-viewport") return this._fitViewport(center);
	let outer, matrix;
	this._changeViewbox(function() {
		if (typeof center !== "object") {
			outer = this.viewbox().outer;
			center = {
				x: outer.width / 2,
				y: outer.height / 2
			};
		}
		matrix = this._setZoom(newScale, center);
	});
	return round(matrix.a, 1e3);
};
function setCTM(node, m) {
	const mstr = "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.e + "," + m.f + ")";
	node.setAttribute("transform", mstr);
}
Canvas.prototype._fitViewport = function(center) {
	const vbox = this.viewbox(), outer = vbox.outer, inner = vbox.inner;
	let newScale, newViewbox;
	if (inner.x >= 0 && inner.y >= 0 && inner.x + inner.width <= outer.width && inner.y + inner.height <= outer.height && !center) newViewbox = {
		x: 0,
		y: 0,
		width: Math.max(inner.width + inner.x, outer.width),
		height: Math.max(inner.height + inner.y, outer.height)
	};
	else {
		newScale = Math.min(1, outer.width / inner.width, outer.height / inner.height);
		newViewbox = {
			x: inner.x + (center ? inner.width / 2 - outer.width / newScale / 2 : 0),
			y: inner.y + (center ? inner.height / 2 - outer.height / newScale / 2 : 0),
			width: outer.width / newScale,
			height: outer.height / newScale
		};
	}
	this.viewbox(newViewbox);
	return this.viewbox(false).scale;
};
Canvas.prototype._setZoom = function(scale, center) {
	const svg = this._svg, viewport = this._viewport;
	const matrix = svg.createSVGMatrix();
	const point = svg.createSVGPoint();
	let centerPoint, originalPoint, currentMatrix, scaleMatrix, newMatrix;
	currentMatrix = viewport.getCTM();
	const currentScale = currentMatrix.a;
	if (center) {
		centerPoint = assign$1(point, center);
		originalPoint = centerPoint.matrixTransform(currentMatrix.inverse());
		scaleMatrix = matrix.translate(originalPoint.x, originalPoint.y).scale(1 / currentScale * scale).translate(-originalPoint.x, -originalPoint.y);
		newMatrix = currentMatrix.multiply(scaleMatrix);
	} else newMatrix = matrix.scale(scale);
	setCTM(this._viewport, newMatrix);
	return newMatrix;
};
Canvas.prototype.getSize = function() {
	return {
		width: this._container.clientWidth,
		height: this._container.clientHeight
	};
};
Canvas.prototype.getAbsoluteBBox = function(element) {
	const vbox = this.viewbox();
	let bbox;
	if (element.waypoints) bbox = this.getGraphics(element).getBBox();
	else bbox = element;
	return {
		x: bbox.x * vbox.scale - vbox.x * vbox.scale,
		y: bbox.y * vbox.scale - vbox.y * vbox.scale,
		width: bbox.width * vbox.scale,
		height: bbox.height * vbox.scale
	};
};
Canvas.prototype.resized = function() {
	delete this._cachedViewbox;
	this._eventBus.fire("canvas.resized");
};
//#endregion
//#region ../../node_modules/diagram-js/lib/core/ElementRegistry.js
var ELEMENT_ID = "data-element-id";
function ElementRegistry(eventBus) {
	this._elements = {};
	this._eventBus = eventBus;
}
ElementRegistry.$inject = ["eventBus"];
ElementRegistry.prototype.add = function(element, gfx, secondaryGfx) {
	var id = element.id;
	this._validateId(id);
	attr(gfx, ELEMENT_ID, id);
	if (secondaryGfx) attr(secondaryGfx, ELEMENT_ID, id);
	this._elements[id] = {
		element,
		gfx,
		secondaryGfx
	};
};
ElementRegistry.prototype.remove = function(element) {
	var elements = this._elements, id = element.id || element, container = id && elements[id];
	if (container) {
		attr(container.gfx, ELEMENT_ID, "");
		if (container.secondaryGfx) attr(container.secondaryGfx, ELEMENT_ID, "");
		delete elements[id];
	}
};
ElementRegistry.prototype.updateId = function(element, newId) {
	this._validateId(newId);
	if (typeof element === "string") element = this.get(element);
	this._eventBus.fire("element.updateId", {
		element,
		newId
	});
	var gfx = this.getGraphics(element), secondaryGfx = this.getGraphics(element, true);
	this.remove(element);
	element.id = newId;
	this.add(element, gfx, secondaryGfx);
};
ElementRegistry.prototype.updateGraphics = function(filter, gfx, secondary) {
	var id = filter.id || filter;
	var container = this._elements[id];
	if (secondary) container.secondaryGfx = gfx;
	else container.gfx = gfx;
	if (gfx) attr(gfx, ELEMENT_ID, id);
	return gfx;
};
ElementRegistry.prototype.get = function(filter) {
	var id;
	if (typeof filter === "string") id = filter;
	else id = filter && attr(filter, ELEMENT_ID);
	var container = this._elements[id];
	return container && container.element;
};
ElementRegistry.prototype.filter = function(fn) {
	var filtered = [];
	this.forEach(function(element, gfx) {
		if (fn(element, gfx)) filtered.push(element);
	});
	return filtered;
};
ElementRegistry.prototype.find = function(fn) {
	var map = this._elements, keys = Object.keys(map);
	for (var i = 0; i < keys.length; i++) {
		var container = map[keys[i]], element = container.element, gfx = container.gfx;
		if (fn(element, gfx)) return element;
	}
};
ElementRegistry.prototype.getAll = function() {
	return this.filter(function(e) {
		return e;
	});
};
ElementRegistry.prototype.forEach = function(fn) {
	var map = this._elements;
	Object.keys(map).forEach(function(id) {
		var container = map[id], element = container.element, gfx = container.gfx;
		return fn(element, gfx);
	});
};
ElementRegistry.prototype.getGraphics = function(filter, secondary) {
	var id = filter.id || filter;
	var container = this._elements[id];
	return container && (secondary ? container.secondaryGfx : container.gfx);
};
ElementRegistry.prototype._validateId = function(id) {
	if (!id) throw new Error("element must have an id");
	if (this._elements[id]) throw new Error("element with id " + id + " already added");
};
//#endregion
//#region ../../node_modules/object-refs/dist/index.js
function extend(collection, refs, property, target) {
	var inverseProperty = property.inverse;
	Object.defineProperty(collection, "remove", { value: function(element) {
		var idx = this.indexOf(element);
		if (idx !== -1) {
			this.splice(idx, 1);
			refs.unset(element, inverseProperty, target);
		}
		return element;
	} });
	Object.defineProperty(collection, "contains", { value: function(element) {
		return this.indexOf(element) !== -1;
	} });
	Object.defineProperty(collection, "add", { value: function(element, idx) {
		var currentIdx = this.indexOf(element);
		if (typeof idx === "undefined") {
			if (currentIdx !== -1) return;
			idx = this.length;
		}
		if (currentIdx !== -1) this.splice(currentIdx, 1);
		this.splice(idx, 0, element);
		if (currentIdx === -1) refs.set(element, inverseProperty, target);
	} });
	Object.defineProperty(collection, "__refs_collection", { value: true });
	return collection;
}
function isExtended(collection) {
	return collection.__refs_collection === true;
}
function hasOwnProperty(e, property) {
	return Object.prototype.hasOwnProperty.call(e, property.name || property);
}
function defineCollectionProperty(ref, property, target) {
	var collection = extend(target[property.name] || [], ref, property, target);
	Object.defineProperty(target, property.name, {
		enumerable: property.enumerable,
		value: collection
	});
	if (collection.length) collection.forEach(function(o) {
		ref.set(o, property.inverse, target);
	});
}
function defineProperty(ref, property, target) {
	var inverseProperty = property.inverse;
	var _value = target[property.name];
	Object.defineProperty(target, property.name, {
		configurable: property.configurable,
		enumerable: property.enumerable,
		get: function() {
			return _value;
		},
		set: function(value) {
			if (value === _value) return;
			var old = _value;
			_value = null;
			if (old) ref.unset(old, inverseProperty, target);
			_value = value;
			ref.set(_value, inverseProperty, target);
		}
	});
}
function Refs(a, b) {
	if (!(this instanceof Refs)) return new Refs(a, b);
	a.inverse = b;
	b.inverse = a;
	this.props = {};
	this.props[a.name] = a;
	this.props[b.name] = b;
}
Refs.prototype.bind = function(target, property) {
	if (typeof property === "string") {
		if (!this.props[property]) throw new Error("no property <" + property + "> in ref");
		property = this.props[property];
	}
	if (property.collection) defineCollectionProperty(this, property, target);
	else defineProperty(this, property, target);
};
Refs.prototype.ensureRefsCollection = function(target, property) {
	var collection = target[property.name];
	if (!isExtended(collection)) defineCollectionProperty(this, property, target);
	return collection;
};
Refs.prototype.ensureBound = function(target, property) {
	if (!hasOwnProperty(target, property)) this.bind(target, property);
};
Refs.prototype.unset = function(target, property, value) {
	if (target) {
		this.ensureBound(target, property);
		if (property.collection) this.ensureRefsCollection(target, property).remove(value);
		else target[property.name] = void 0;
	}
};
Refs.prototype.set = function(target, property, value) {
	if (target) {
		this.ensureBound(target, property);
		if (property.collection) this.ensureRefsCollection(target, property).add(value);
		else target[property.name] = value;
	}
};
//#endregion
//#region ../../node_modules/diagram-js/lib/model/index.js
init_dist();
var parentRefs = new Refs({
	name: "children",
	enumerable: true,
	collection: true
}, { name: "parent" });
var labelRefs = new Refs({
	name: "labels",
	enumerable: true,
	collection: true
}, { name: "labelTarget" });
var attacherRefs = new Refs({
	name: "attachers",
	collection: true
}, { name: "host" });
var outgoingRefs = new Refs({
	name: "outgoing",
	collection: true
}, { name: "source" });
var incomingRefs = new Refs({
	name: "incoming",
	collection: true
}, { name: "target" });
function ElementImpl() {
	Object.defineProperty(this, "businessObject", { writable: true });
	Object.defineProperty(this, "label", {
		get: function() {
			return this.labels[0];
		},
		set: function(newLabel) {
			var label = this.label, labels = this.labels;
			if (!newLabel && label) labels.remove(label);
			else labels.add(newLabel, 0);
		}
	});
	parentRefs.bind(this, "parent");
	labelRefs.bind(this, "labels");
	outgoingRefs.bind(this, "outgoing");
	incomingRefs.bind(this, "incoming");
}
function ShapeImpl() {
	ElementImpl.call(this);
	parentRefs.bind(this, "children");
	attacherRefs.bind(this, "host");
	attacherRefs.bind(this, "attachers");
}
e$2(ShapeImpl, ElementImpl);
function RootImpl() {
	ElementImpl.call(this);
	parentRefs.bind(this, "children");
}
e$2(RootImpl, ShapeImpl);
function LabelImpl() {
	ShapeImpl.call(this);
	labelRefs.bind(this, "labelTarget");
}
e$2(LabelImpl, ShapeImpl);
function ConnectionImpl() {
	ElementImpl.call(this);
	outgoingRefs.bind(this, "source");
	incomingRefs.bind(this, "target");
}
e$2(ConnectionImpl, ElementImpl);
var types = {
	connection: ConnectionImpl,
	shape: ShapeImpl,
	label: LabelImpl,
	root: RootImpl
};
function create(type, attrs) {
	var Type = types[type];
	if (!Type) throw new Error("unknown type: <" + type + ">");
	return assign$1(new Type(), attrs);
}
function isModelElement(obj) {
	return obj instanceof ElementImpl;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/core/ElementFactory.js
init_dist();
function ElementFactory() {
	this._uid = 12;
}
ElementFactory.prototype.createRoot = function(attrs) {
	return this.create("root", attrs);
};
ElementFactory.prototype.createLabel = function(attrs) {
	return this.create("label", attrs);
};
ElementFactory.prototype.createShape = function(attrs) {
	return this.create("shape", attrs);
};
ElementFactory.prototype.createConnection = function(attrs) {
	return this.create("connection", attrs);
};
ElementFactory.prototype.create = function(type, attrs) {
	attrs = assign$1({}, attrs || {});
	if (!attrs.id) attrs.id = type + "_" + this._uid++;
	return create(type, attrs);
};
//#endregion
//#region ../../node_modules/diagram-js/lib/util/GraphicsUtil.js
function getVisual(gfx) {
	return gfx.childNodes[0];
}
function getChildren(gfx) {
	return gfx.parentNode.childNodes[1];
}
//#endregion
//#region ../../node_modules/diagram-js/lib/util/SvgTransformUtil.js
function transform(gfx, x, y, angle, amount) {
	var translate = createTransform();
	translate.setTranslate(x, y);
	var rotate = createTransform();
	rotate.setRotate(angle || 0, 0, 0);
	var scale = createTransform();
	scale.setScale(amount || 1, amount || 1);
	transform$1(gfx, [
		translate,
		rotate,
		scale
	]);
}
function translate$1(gfx, x, y) {
	var translate = createTransform();
	translate.setTranslate(x, y);
	transform$1(gfx, translate);
}
function rotate(gfx, angle) {
	var rotate = createTransform();
	rotate.setRotate(angle, 0, 0);
	transform$1(gfx, rotate);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/core/GraphicsFactory.js
init_dist();
function GraphicsFactory(eventBus, elementRegistry) {
	this._eventBus = eventBus;
	this._elementRegistry = elementRegistry;
}
GraphicsFactory.$inject = ["eventBus", "elementRegistry"];
GraphicsFactory.prototype._getChildrenContainer = function(element) {
	var gfx = this._elementRegistry.getGraphics(element);
	var childrenGfx;
	if (!element.parent) childrenGfx = gfx;
	else {
		childrenGfx = getChildren(gfx);
		if (!childrenGfx) {
			childrenGfx = create$1("g");
			classes(childrenGfx).add("djs-children");
			append(gfx.parentNode, childrenGfx);
		}
	}
	return childrenGfx;
};
GraphicsFactory.prototype._clear = function(gfx) {
	var visual = getVisual(gfx);
	clear$1(visual);
	return visual;
};
GraphicsFactory.prototype._createContainer = function(type, childrenGfx, parentIndex, isFrame) {
	var outerGfx = create$1("g");
	classes(outerGfx).add("djs-group");
	if (typeof parentIndex !== "undefined") prependTo(outerGfx, childrenGfx, childrenGfx.childNodes[parentIndex]);
	else append(childrenGfx, outerGfx);
	var gfx = create$1("g");
	classes(gfx).add("djs-element");
	classes(gfx).add("djs-" + type);
	if (isFrame) classes(gfx).add("djs-frame");
	append(outerGfx, gfx);
	var visual = create$1("g");
	classes(visual).add("djs-visual");
	append(gfx, visual);
	return gfx;
};
GraphicsFactory.prototype.create = function(type, element, parentIndex) {
	var childrenGfx = this._getChildrenContainer(element.parent);
	return this._createContainer(type, childrenGfx, parentIndex, isFrameElement(element));
};
GraphicsFactory.prototype.updateContainments = function(elements) {
	var self = this, elementRegistry = this._elementRegistry, parents = reduce(elements, function(map, e) {
		if (e.parent) map[e.parent.id] = e.parent;
		return map;
	}, {});
	forEach(parents, function(parent) {
		var children = parent.children;
		if (!children) return;
		var childrenGfx = self._getChildrenContainer(parent);
		var expected = childrenGfx.firstChild;
		forEach(children, function(child) {
			var childGfx = elementRegistry.getGraphics(child).parentNode;
			if (childGfx === expected) expected = expected.nextSibling;
			else childrenGfx.insertBefore(childGfx, expected);
		});
	});
};
GraphicsFactory.prototype.drawShape = function(visual, element, attrs = {}) {
	return this._eventBus.fire("render.shape", {
		gfx: visual,
		element,
		attrs
	});
};
GraphicsFactory.prototype.getShapePath = function(element) {
	return this._eventBus.fire("render.getShapePath", element);
};
GraphicsFactory.prototype.drawConnection = function(visual, element, attrs = {}) {
	return this._eventBus.fire("render.connection", {
		gfx: visual,
		element,
		attrs
	});
};
GraphicsFactory.prototype.getConnectionPath = function(connection) {
	return this._eventBus.fire("render.getConnectionPath", connection);
};
GraphicsFactory.prototype.update = function(type, element, gfx) {
	if (!element.parent) return;
	var visual = this._clear(gfx);
	if (type === "shape") {
		this.drawShape(visual, element);
		translate$1(gfx, element.x, element.y);
	} else if (type === "connection") this.drawConnection(visual, element);
	else throw new Error("unknown type: " + type);
	if (element.hidden) attr(gfx, "display", "none");
	else attr(gfx, "display", "block");
};
GraphicsFactory.prototype.remove = function(element) {
	remove$1(this._elementRegistry.getGraphics(element).parentNode);
};
function prependTo(newNode, parentNode, siblingNode) {
	var node = siblingNode || parentNode.firstChild;
	if (newNode === node) return;
	parentNode.insertBefore(newNode, node);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/core/index.js
var core_default = {
	__depends__: [draw_default],
	__init__: ["canvas"],
	canvas: ["type", Canvas],
	elementRegistry: ["type", ElementRegistry],
	elementFactory: ["type", ElementFactory],
	eventBus: ["type", EventBus],
	graphicsFactory: ["type", GraphicsFactory]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/Diagram.js
function bootstrap(modules) {
	var injector = new Injector(modules);
	injector.init();
	return injector;
}
function createInjector(options) {
	options = options || {};
	return bootstrap([{ "config": ["value", options] }, core_default].concat(options.modules || []));
}
function Diagram(options, injector) {
	this._injector = injector || createInjector(options);
	this.get("eventBus").fire("diagram.init");
}
Diagram.prototype.get = function(name, strict) {
	return this._injector.get(name, strict);
};
Diagram.prototype.invoke = function(func, context, locals) {
	return this._injector.invoke(func, context, locals);
};
Diagram.prototype.destroy = function() {
	this.get("eventBus").fire("diagram.destroy");
};
Diagram.prototype.clear = function() {
	this.get("eventBus").fire("diagram.clear");
};
//#endregion
//#region ../../node_modules/diagram-js/lib/util/Text.js
init_dist();
var DEFAULT_BOX_PADDING = 0;
var DEFAULT_LABEL_SIZE = {
	width: 150,
	height: 50
};
function parseAlign(align) {
	var parts = align.split("-");
	return {
		horizontal: parts[0] || "center",
		vertical: parts[1] || "top"
	};
}
function parsePadding(padding) {
	if (isObject(padding)) return assign$1({
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}, padding);
	else return {
		top: padding,
		left: padding,
		right: padding,
		bottom: padding
	};
}
var _canvasContext = null;
function getCanvasContext() {
	if (!_canvasContext) _canvasContext = document.createElement("canvas").getContext("2d");
	return _canvasContext;
}
function buildFont(style) {
	var parts = [];
	if (style.fontStyle) parts.push(style.fontStyle);
	if (style.fontVariant) parts.push(style.fontVariant);
	if (style.fontWeight) parts.push(style.fontWeight);
	if (style.fontStretch) parts.push(style.fontStretch);
	parts.push(buildLength(style.fontSize) || "12px");
	parts.push(style.fontFamily || "sans-serif");
	return parts.join(" ");
}
function buildLength(value) {
	if (value == null) return;
	if (typeof value === "number" || /^-?\d+(\.\d+)?$/.test(value)) return value + "px";
	return value;
}
function getTextBBox(text, style) {
	var ctx = getCanvasContext();
	if (!ctx) return {
		width: 0,
		height: 0
	};
	ctx.font = buildFont(style);
	if ("letterSpacing" in ctx) ctx.letterSpacing = buildLength(style.letterSpacing) || "0px";
	var emptyLine = text === "";
	var measurable = emptyLine ? "dummy" : text.replace(/\s+$/, "");
	var metrics = ctx.measureText(measurable);
	return {
		width: emptyLine ? 0 : metrics.width,
		height: "fontBoundingBoxAscent" in metrics ? metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent : metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
	};
}
function layoutNext(lines, maxWidth, style) {
	var originalLine = lines.shift(), fitLine = originalLine;
	var textBBox;
	for (;;) {
		textBBox = getTextBBox(fitLine, style);
		textBBox.width = fitLine ? textBBox.width : 0;
		if (fitLine === " " || fitLine === "" || textBBox.width <= maxWidth || fitLine.length < 2) return fit(lines, fitLine, originalLine, textBBox);
		fitLine = shortenLine(fitLine, textBBox.width, maxWidth);
	}
}
function fit(lines, fitLine, originalLine, textBBox) {
	if (fitLine.length < originalLine.length) {
		var remainder = originalLine.slice(fitLine.length).trim();
		lines.unshift(remainder);
	}
	return {
		width: textBBox.width,
		height: textBBox.height,
		text: fitLine
	};
}
var SOFT_BREAK = "­";
function semanticShorten(line, maxLength) {
	var parts = line.split(/(\s|-|\u00AD)/g), part, shortenedParts = [], length = 0;
	if (parts.length > 1) while (part = parts.shift()) if (part.length + length < maxLength) {
		shortenedParts.push(part);
		length += part.length;
	} else {
		if (part === "-" || part === SOFT_BREAK) shortenedParts.pop();
		break;
	}
	var last = shortenedParts[shortenedParts.length - 1];
	if (last && last === SOFT_BREAK) shortenedParts[shortenedParts.length - 1] = "-";
	return shortenedParts.join("");
}
function shortenLine(line, width, maxWidth) {
	var length = Math.max(line.length * (maxWidth / width), 1);
	var shortenedLine = semanticShorten(line, length);
	if (!shortenedLine) shortenedLine = line.slice(0, Math.max(Math.round(length - 1), 1));
	return shortenedLine;
}
function Text(config) {
	this._config = assign$1({}, {
		size: DEFAULT_LABEL_SIZE,
		padding: DEFAULT_BOX_PADDING,
		style: {},
		align: "center-top"
	}, config || {});
}
Text.prototype.createText = function(text, options) {
	return this.layoutText(text, options).element;
};
Text.prototype.getDimensions = function(text, options) {
	return this.layoutText(text, options).dimensions;
};
Text.prototype.layoutText = function(text, options) {
	var box = assign$1({}, this._config.size, options.box), style = assign$1({}, this._config.style, options.style), align = parseAlign(options.align || this._config.align), padding = parsePadding(options.padding !== void 0 ? options.padding : this._config.padding), fitBox = options.fitBox || false;
	var lineHeight = getLineHeight(style);
	var lines = text.split(/\u00AD?\r?\n/), layouted = [];
	var maxWidth = box.width - padding.left - padding.right;
	while (lines.length) layouted.push(layoutNext(lines, maxWidth, style));
	if (align.vertical === "middle") padding.top = padding.bottom = 0;
	var totalHeight = reduce(layouted, function(sum, line, idx) {
		return sum + (lineHeight || line.height);
	}, 0) + padding.top + padding.bottom;
	var maxLineWidth = reduce(layouted, function(sum, line, idx) {
		return line.width > sum ? line.width : sum;
	}, 0);
	var y = padding.top;
	if (align.vertical === "middle") y += (box.height - totalHeight) / 2;
	y -= (lineHeight || layouted[0].height) / 4;
	var textElement = create$1("text");
	attr(textElement, style);
	forEach(layouted, function(line) {
		var x;
		y += lineHeight || line.height;
		switch (align.horizontal) {
			case "left":
				x = padding.left;
				break;
			case "right":
				x = (fitBox ? maxLineWidth : maxWidth) - padding.right - line.width;
				break;
			default: x = Math.max(((fitBox ? maxLineWidth : maxWidth) - line.width) / 2 + padding.left, 0);
		}
		var tspan = create$1("tspan");
		attr(tspan, {
			x,
			y
		});
		tspan.textContent = line.text;
		append(textElement, tspan);
	});
	return {
		dimensions: {
			width: maxLineWidth,
			height: totalHeight
		},
		element: textElement
	};
};
function getLineHeight(style) {
	if ("fontSize" in style && "lineHeight" in style) return style.lineHeight * parseInt(style.fontSize, 10);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/i18n/translate/translate.js
function translate(template, replacements) {
	replacements = replacements || {};
	return template.replace(/{([^}]+)}/g, function(_, key) {
		return replacements[key] || "{" + key + "}";
	});
}
//#endregion
//#region ../../node_modules/diagram-js/lib/i18n/translate/index.js
var translate_default = { translate: ["value", translate] };
//#endregion
//#region ../../node_modules/diagram-js/lib/util/Event.js
function __stopPropagation(event) {
	if (!event || typeof event.stopPropagation !== "function") return;
	event.stopPropagation();
}
function getOriginal(event) {
	return event.originalEvent || event.srcEvent;
}
function stopPropagation(event) {
	__stopPropagation(event);
	__stopPropagation(getOriginal(event));
}
function toPoint(event) {
	if (event.pointers && event.pointers.length) event = event.pointers[0];
	if (event.touches && event.touches.length) event = event.touches[0];
	return event ? {
		x: event.clientX,
		y: event.clientY
	} : null;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/util/Platform.js
function isMac() {
	return /mac/i.test(navigator.platform);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/util/Mouse.js
function isButton(event, button) {
	return (getOriginal(event) || event).button === button;
}
function isPrimaryButton(event) {
	return isButton(event, 0);
}
function isAuxiliaryButton(event) {
	return isButton(event, 1);
}
function hasPrimaryModifier(event) {
	var originalEvent = getOriginal(event) || event;
	if (!isPrimaryButton(event)) return false;
	if (isMac()) return originalEvent.metaKey;
	else return originalEvent.ctrlKey;
}
function hasSecondaryModifier(event) {
	var originalEvent = getOriginal(event) || event;
	return isPrimaryButton(event) && originalEvent.shiftKey;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/interaction-events/InteractionEvents.js
init_dist();
function allowAll(event) {
	return true;
}
function allowPrimaryAndAuxiliary(event) {
	return isPrimaryButton(event) || isAuxiliaryButton(event);
}
var LOW_PRIORITY$3 = 500;
function InteractionEvents(eventBus, elementRegistry, styles) {
	var self = this;
	function fire(type, event, element) {
		if (isIgnored(type, event)) return;
		var target, gfx, returnValue;
		if (!element) {
			target = event.delegateTarget || event.target;
			if (target) {
				gfx = target;
				element = elementRegistry.get(gfx);
			}
		} else gfx = elementRegistry.getGraphics(element);
		if (!gfx || !element) return;
		returnValue = eventBus.fire(type, {
			element,
			gfx,
			originalEvent: event
		});
		if (returnValue === false) {
			event.stopPropagation();
			event.preventDefault();
		}
	}
	var handlers = {};
	function mouseHandler(localEventName) {
		return handlers[localEventName];
	}
	function isIgnored(localEventName, event) {
		return !(ignoredFilters[localEventName] || isPrimaryButton)(event);
	}
	var bindings = {
		click: "element.click",
		contextmenu: "element.contextmenu",
		dblclick: "element.dblclick",
		mousedown: "element.mousedown",
		mousemove: "element.mousemove",
		mouseover: "element.hover",
		mouseout: "element.out",
		mouseup: "element.mouseup"
	};
	var ignoredFilters = {
		"element.contextmenu": allowAll,
		"element.mousedown": allowPrimaryAndAuxiliary,
		"element.mouseup": allowPrimaryAndAuxiliary,
		"element.click": allowPrimaryAndAuxiliary,
		"element.dblclick": allowPrimaryAndAuxiliary
	};
	function triggerMouseEvent(eventName, event, targetElement) {
		var localEventName = bindings[eventName];
		if (!localEventName) throw new Error("unmapped DOM event name <" + eventName + ">");
		return fire(localEventName, event, targetElement);
	}
	var ELEMENT_SELECTOR = "svg, .djs-element";
	function registerEvent(node, event, localEvent, ignoredFilter) {
		var handler = handlers[localEvent] = function(event) {
			fire(localEvent, event);
		};
		if (ignoredFilter) ignoredFilters[localEvent] = ignoredFilter;
		handler.$delegate = delegate.bind(node, ELEMENT_SELECTOR, event, handler);
	}
	function unregisterEvent(node, event, localEvent) {
		var handler = mouseHandler(localEvent);
		if (!handler) return;
		delegate.unbind(node, event, handler.$delegate);
	}
	function registerEvents(svg) {
		forEach(bindings, function(val, key) {
			registerEvent(svg, key, val);
		});
	}
	function unregisterEvents(svg) {
		forEach(bindings, function(val, key) {
			unregisterEvent(svg, key, val);
		});
	}
	eventBus.on("canvas.destroy", function(event) {
		unregisterEvents(event.svg);
	});
	eventBus.on("canvas.init", function(event) {
		registerEvents(event.svg);
	});
	eventBus.on(["shape.added", "connection.added"], function(event) {
		var element = event.element, gfx = event.gfx;
		eventBus.fire("interactionEvents.createHit", {
			element,
			gfx
		});
	});
	eventBus.on(["shape.changed", "connection.changed"], LOW_PRIORITY$3, function(event) {
		var element = event.element, gfx = event.gfx;
		eventBus.fire("interactionEvents.updateHit", {
			element,
			gfx
		});
	});
	eventBus.on("interactionEvents.createHit", LOW_PRIORITY$3, function(event) {
		var element = event.element, gfx = event.gfx;
		self.createDefaultHit(element, gfx);
	});
	eventBus.on("interactionEvents.updateHit", function(event) {
		var element = event.element, gfx = event.gfx;
		self.updateDefaultHit(element, gfx);
	});
	var STROKE_HIT_STYLE = createHitStyle("djs-hit djs-hit-stroke");
	var CLICK_STROKE_HIT_STYLE = createHitStyle("djs-hit djs-hit-click-stroke");
	var HIT_TYPES = {
		"all": createHitStyle("djs-hit djs-hit-all"),
		"click-stroke": CLICK_STROKE_HIT_STYLE,
		"stroke": STROKE_HIT_STYLE,
		"no-move": createHitStyle("djs-hit djs-hit-no-move")
	};
	function createHitStyle(classNames, attrs) {
		attrs = assign$1({
			stroke: "white",
			strokeWidth: 15
		}, attrs || {});
		return styles.cls(classNames, ["no-fill", "no-border"], attrs);
	}
	function applyStyle(hit, type) {
		var attrs = HIT_TYPES[type];
		if (!attrs) throw new Error("invalid hit type <" + type + ">");
		attr(hit, attrs);
		return hit;
	}
	function appendHit(gfx, hit) {
		append(gfx, hit);
	}
	this.removeHits = function(gfx) {
		var hits = all(".djs-hit", gfx);
		forEach(hits, remove$1);
	};
	this.createDefaultHit = function(element, gfx) {
		var waypoints = element.waypoints, isFrame = element.isFrame, boxType;
		if (waypoints) return this.createWaypointsHit(gfx, waypoints);
		else {
			boxType = isFrame ? "stroke" : "all";
			return this.createBoxHit(gfx, boxType, {
				width: element.width,
				height: element.height
			});
		}
	};
	this.createWaypointsHit = function(gfx, waypoints) {
		var hit = createLine(waypoints);
		applyStyle(hit, "stroke");
		appendHit(gfx, hit);
		return hit;
	};
	this.createBoxHit = function(gfx, type, attrs) {
		attrs = assign$1({
			x: 0,
			y: 0
		}, attrs);
		var hit = create$1("rect");
		applyStyle(hit, type);
		attr(hit, attrs);
		appendHit(gfx, hit);
		return hit;
	};
	this.updateDefaultHit = function(element, gfx) {
		var hit = query(".djs-hit", gfx);
		if (!hit) return;
		if (element.waypoints) updateLine(hit, element.waypoints);
		else attr(hit, {
			width: element.width,
			height: element.height
		});
		return hit;
	};
	this.fire = fire;
	this.triggerMouseEvent = triggerMouseEvent;
	this.mouseHandler = mouseHandler;
	this.registerEvent = registerEvent;
	this.unregisterEvent = unregisterEvent;
}
InteractionEvents.$inject = [
	"eventBus",
	"elementRegistry",
	"styles"
];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/interaction-events/index.js
var interaction_events_default = {
	__init__: ["interactionEvents"],
	interactionEvents: ["type", InteractionEvents]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/selection/Selection.js
init_dist();
function Selection(eventBus, canvas) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	this._selectedElements = new Set();
	var self = this;
	eventBus.on(["shape.remove", "connection.remove"], function(e) {
		var element = e.element;
		self.deselect(element);
	});
	eventBus.on(["diagram.clear", "root.set"], function(e) {
		self.select(null);
	});
}
Selection.$inject = ["eventBus", "canvas"];
Selection.prototype.deselect = function(element) {
	if (!this._selectedElements.has(element)) return;
	var oldSelection = this.get();
	this._selectedElements.delete(element);
	this._eventBus.fire("selection.changed", {
		oldSelection,
		newSelection: this.get()
	});
};
Selection.prototype.get = function() {
	return Array.from(this._selectedElements);
};
Selection.prototype.isSelected = function(element) {
	return this._selectedElements.has(element);
};
Selection.prototype.select = function(elements, add) {
	var oldSelection = this.get();
	if (!isArray$2(elements)) elements = elements ? [elements] : [];
	var canvas = this._canvas;
	var rootElement = canvas.getRootElement();
	elements = elements.filter(function(element) {
		return rootElement === canvas.findRoot(element);
	});
	if (add) forEach(elements, (element) => {
		this._selectedElements.add(element);
	});
	else this._selectedElements = new Set(elements);
	this._eventBus.fire("selection.changed", {
		oldSelection,
		newSelection: this.get()
	});
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/selection/SelectionVisuals.js
var MARKER_HOVER = "hover";
var MARKER_SELECTED = "selected";
function SelectionVisuals(canvas, eventBus) {
	this._canvas = canvas;
	function addMarker(e, cls) {
		canvas.addMarker(e, cls);
	}
	function removeMarker(e, cls) {
		canvas.removeMarker(e, cls);
	}
	eventBus.on("element.hover", function(event) {
		addMarker(event.element, MARKER_HOVER);
	});
	eventBus.on("element.out", function(event) {
		removeMarker(event.element, MARKER_HOVER);
	});
	eventBus.on("selection.changed", function(event) {
		function deselect(s) {
			removeMarker(s, MARKER_SELECTED);
		}
		function select(s) {
			addMarker(s, MARKER_SELECTED);
		}
		var oldSelection = new Set(event.oldSelection), newSelection = new Set(event.newSelection);
		for (let e of oldSelection) if (!newSelection.has(e)) deselect(e);
		for (let e of newSelection) if (!oldSelection.has(e)) select(e);
	});
}
SelectionVisuals.$inject = ["canvas", "eventBus"];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/selection/SelectionBehavior.js
init_dist();
function SelectionBehavior(eventBus, selection, canvas, elementRegistry) {
	eventBus.on("create.end", 500, function(event) {
		var context = event.context, canExecute = context.canExecute, elements = context.elements, autoSelect = (context.hints || {}).autoSelect;
		if (canExecute) {
			if (autoSelect === false) return;
			if (isArray$2(autoSelect)) selection.select(autoSelect);
			else selection.select(elements.filter(isShown));
		}
	});
	eventBus.on("connect.end", 500, function(event) {
		var connection = event.context.connection;
		if (connection) selection.select(connection);
	});
	eventBus.on("shape.move.end", 500, function(event) {
		var previousSelection = event.previousSelection || [];
		var shape = elementRegistry.get(event.context.shape.id);
		if (!find(previousSelection, function(selectedShape) {
			return shape.id === selectedShape.id;
		})) selection.select(shape);
	});
	eventBus.on("element.click", function(event) {
		if (!isPrimaryButton(event)) return;
		var element = event.element;
		if (element === canvas.getRootElement()) element = null;
		var isSelected = selection.isSelected(element), isMultiSelect = selection.get().length > 1;
		var add = hasSecondaryModifier(event);
		if (isSelected && isMultiSelect) {
			if (add) return selection.deselect(element);
			else return selection.select(element);
		} else if (!isSelected) selection.select(element, add);
		else selection.deselect(element);
	});
}
SelectionBehavior.$inject = [
	"eventBus",
	"selection",
	"canvas",
	"elementRegistry"
];
function isShown(element) {
	return !element.hidden;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/selection/index.js
var selection_default = {
	__init__: ["selectionVisuals", "selectionBehavior"],
	__depends__: [interaction_events_default],
	selection: ["type", Selection],
	selectionVisuals: ["type", SelectionVisuals],
	selectionBehavior: ["type", SelectionBehavior]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/util/IdGenerator.js
function IdGenerator(prefix) {
	this._counter = 0;
	this._prefix = (prefix ? prefix + "-" : "") + Math.floor(Math.random() * 1e9) + "-";
}
IdGenerator.prototype.next = function() {
	return this._prefix + ++this._counter;
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/overlays/Overlays.js
init_dist();
var ids = new IdGenerator("ov");
var LOW_PRIORITY$2 = 500;
function Overlays(config, eventBus, canvas, elementRegistry) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	this._elementRegistry = elementRegistry;
	this._ids = ids;
	this._overlayDefaults = assign$1({
		show: null,
		scale: true
	}, config && config.defaults);
	this._overlays = {};
	this._overlayContainers = [];
	this._overlayRoot = createRoot(canvas.getContainer());
	this._init();
}
Overlays.$inject = [
	"config.overlays",
	"eventBus",
	"canvas",
	"elementRegistry"
];
Overlays.prototype.get = function(search) {
	if (isString(search)) search = { id: search };
	if (isString(search.element)) search.element = this._elementRegistry.get(search.element);
	if (search.element) {
		var container = this._getOverlayContainer(search.element, true);
		if (container) return search.type ? filter(container.overlays, matchPattern({ type: search.type })) : container.overlays.slice();
		else return [];
	} else if (search.type) return filter(this._overlays, matchPattern({ type: search.type }));
	else return search.id ? this._overlays[search.id] : null;
};
Overlays.prototype.add = function(element, type, overlay) {
	if (isObject(type)) {
		overlay = type;
		type = null;
	}
	if (!element.id) element = this._elementRegistry.get(element);
	if (!overlay.position) throw new Error("must specifiy overlay position");
	if (!overlay.html) throw new Error("must specifiy overlay html");
	if (!element) throw new Error("invalid element specified");
	var id = this._ids.next();
	overlay = assign$1({}, this._overlayDefaults, overlay, {
		id,
		type,
		element,
		html: overlay.html
	});
	this._addOverlay(overlay);
	return id;
};
Overlays.prototype.remove = function(filter) {
	var overlays = this.get(filter) || [];
	if (!isArray$2(overlays)) overlays = [overlays];
	var self = this;
	forEach(overlays, function(overlay) {
		var container = self._getOverlayContainer(overlay.element, true);
		if (overlay) {
			remove$2(overlay.html);
			remove$2(overlay.htmlContainer);
			delete overlay.htmlContainer;
			delete overlay.element;
			delete self._overlays[overlay.id];
		}
		if (container) {
			var idx = container.overlays.indexOf(overlay);
			if (idx !== -1) container.overlays.splice(idx, 1);
		}
	});
};
Overlays.prototype.isShown = function() {
	return this._overlayRoot.style.display !== "none";
};
Overlays.prototype.show = function() {
	setVisible(this._overlayRoot);
};
Overlays.prototype.hide = function() {
	setVisible(this._overlayRoot, false);
};
Overlays.prototype.clear = function() {
	this._overlays = {};
	this._overlayContainers = [];
	clear$1(this._overlayRoot);
};
Overlays.prototype._updateOverlayContainer = function(container) {
	var element = container.element, html = container.html;
	var x = element.x, y = element.y;
	if (element.waypoints) {
		var bbox = getBBox(element);
		x = bbox.x;
		y = bbox.y;
	}
	setPosition(html, x, y);
	attr$1(container.html, "data-container-id", element.id);
};
Overlays.prototype._updateOverlay = function(overlay) {
	var position = overlay.position, htmlContainer = overlay.htmlContainer, element = overlay.element;
	var left = position.left, top = position.top;
	if (position.right !== void 0) {
		var width;
		if (element.waypoints) width = getBBox(element).width;
		else width = element.width;
		left = position.right * -1 + width;
	}
	if (position.bottom !== void 0) {
		var height;
		if (element.waypoints) height = getBBox(element).height;
		else height = element.height;
		top = position.bottom * -1 + height;
	}
	setPosition(htmlContainer, left || 0, top || 0);
	this._updateOverlayVisibilty(overlay, this._canvas.viewbox());
};
Overlays.prototype._createOverlayContainer = function(element) {
	var html = domify("<div class=\"djs-overlays\" />");
	assign(html, { position: "absolute" });
	this._overlayRoot.appendChild(html);
	var container = {
		html,
		element,
		overlays: []
	};
	this._updateOverlayContainer(container);
	this._overlayContainers.push(container);
	return container;
};
Overlays.prototype._updateRoot = function(viewbox) {
	var scale = viewbox.scale || 1;
	var matrix = "matrix(" + [
		scale,
		0,
		0,
		scale,
		-1 * viewbox.x * scale,
		-1 * viewbox.y * scale
	].join(",") + ")";
	setTransform(this._overlayRoot, matrix);
};
Overlays.prototype._getOverlayContainer = function(element, raw) {
	var container = find(this._overlayContainers, function(c) {
		return c.element === element;
	});
	if (!container && !raw) return this._createOverlayContainer(element);
	return container;
};
Overlays.prototype._addOverlay = function(overlay) {
	var id = overlay.id, element = overlay.element, html = overlay.html, htmlContainer, overlayContainer;
	if (html.get && html.constructor.prototype.jquery) html = html.get(0);
	if (isString(html)) html = domify(html);
	overlayContainer = this._getOverlayContainer(element);
	htmlContainer = domify("<div class=\"djs-overlay\" data-overlay-id=\"" + id + "\">");
	assign(htmlContainer, { position: "absolute" });
	htmlContainer.appendChild(html);
	if (overlay.type) classes$1(htmlContainer).add("djs-overlay-" + overlay.type);
	var elementRoot = this._canvas.findRoot(element);
	var activeRoot = this._canvas.getRootElement();
	setVisible(htmlContainer, elementRoot === activeRoot);
	overlay.htmlContainer = htmlContainer;
	overlayContainer.overlays.push(overlay);
	overlayContainer.html.appendChild(htmlContainer);
	this._overlays[id] = overlay;
	this._updateOverlay(overlay);
	this._updateOverlayVisibilty(overlay, this._canvas.viewbox());
};
Overlays.prototype._updateOverlayVisibilty = function(overlay, viewbox) {
	var show = overlay.show, rootElement = this._canvas.findRoot(overlay.element), minZoom = show && show.minZoom, maxZoom = show && show.maxZoom, htmlContainer = overlay.htmlContainer, activeRootElement = this._canvas.getRootElement(), visible = true;
	if (rootElement !== activeRootElement) visible = false;
	else if (show) {
		if (isDefined(minZoom) && minZoom > viewbox.scale || isDefined(maxZoom) && maxZoom < viewbox.scale) visible = false;
	}
	setVisible(htmlContainer, visible);
	this._updateOverlayScale(overlay, viewbox);
};
Overlays.prototype._updateOverlayScale = function(overlay, viewbox) {
	var shouldScale = overlay.scale, minScale, maxScale, htmlContainer = overlay.htmlContainer;
	var scale, transform = "";
	if (shouldScale !== true) {
		if (shouldScale === false) {
			minScale = 1;
			maxScale = 1;
		} else {
			minScale = shouldScale.min;
			maxScale = shouldScale.max;
		}
		if (isDefined(minScale) && viewbox.scale < minScale) scale = (1 / viewbox.scale || 1) * minScale;
		if (isDefined(maxScale) && viewbox.scale > maxScale) scale = (1 / viewbox.scale || 1) * maxScale;
	}
	if (isDefined(scale)) transform = "scale(" + scale + "," + scale + ")";
	setTransform(htmlContainer, transform);
};
Overlays.prototype._updateOverlaysVisibilty = function(viewbox) {
	var self = this;
	forEach(this._overlays, function(overlay) {
		self._updateOverlayVisibilty(overlay, viewbox);
	});
};
Overlays.prototype._init = function() {
	var eventBus = this._eventBus;
	var self = this;
	function updateViewbox(viewbox) {
		self._updateRoot(viewbox);
		self._updateOverlaysVisibilty(viewbox);
		self.show();
	}
	eventBus.on("canvas.viewbox.changing", function(event) {
		self.hide();
	});
	eventBus.on("canvas.viewbox.changed", function(event) {
		updateViewbox(event.viewbox);
	});
	eventBus.on(["shape.remove", "connection.remove"], function(e) {
		var element = e.element;
		var overlays = self.get({ element });
		forEach(overlays, function(o) {
			self.remove(o.id);
		});
		var container = self._getOverlayContainer(element);
		if (container) {
			remove$2(container.html);
			var i = self._overlayContainers.indexOf(container);
			if (i !== -1) self._overlayContainers.splice(i, 1);
		}
	});
	eventBus.on("element.changed", LOW_PRIORITY$2, function(e) {
		var element = e.element;
		var container = self._getOverlayContainer(element, true);
		if (container) {
			forEach(container.overlays, function(overlay) {
				self._updateOverlay(overlay);
			});
			self._updateOverlayContainer(container);
		}
	});
	eventBus.on("element.marker.update", function(e) {
		var container = self._getOverlayContainer(e.element, true);
		if (container) classes$1(container.html)[e.add ? "add" : "remove"](e.marker);
	});
	eventBus.on("root.set", function() {
		self._updateOverlaysVisibilty(self._canvas.viewbox());
	});
	eventBus.on("diagram.clear", this.clear, this);
};
function createRoot(parentNode) {
	var root = domify("<div class=\"djs-overlay-container\" />");
	assign(root, {
		position: "absolute",
		width: 0,
		height: 0
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
function setTransform(el, transform) {
	el.style["transform-origin"] = "top left";
	[
		"",
		"-ms-",
		"-webkit-"
	].forEach(function(prefix) {
		el.style[prefix + "transform"] = transform;
	});
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/overlays/index.js
var overlays_default = {
	__init__: ["overlays"],
	overlays: ["type", Overlays]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/util/PositionUtil.js
function center(bounds) {
	return {
		x: bounds.x + bounds.width / 2,
		y: bounds.y + bounds.height / 2
	};
}
function delta(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y
	};
}
//#endregion
//#region ../../node_modules/diagram-js/lib/util/Math.js
function log10(x) {
	return Math.log(x) / Math.log(10);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/navigation/zoomscroll/ZoomUtil.js
function getStepSize(range, steps) {
	var minLinearRange = log10(range.min), maxLinearRange = log10(range.max);
	return (Math.abs(minLinearRange) + Math.abs(maxLinearRange)) / steps;
}
function cap(range, scale) {
	return Math.max(range.min, Math.min(range.max, scale));
}
//#endregion
//#region ../../node_modules/diagram-js/lib/navigation/zoomscroll/ZoomScroll.js
init_dist();
var sign = Math.sign || function(n) {
	return n >= 0 ? 1 : -1;
};
var RANGE = {
	min: .2,
	max: 4
};
var NUM_STEPS = 10;
var DELTA_THRESHOLD = .1;
var DEFAULT_SCALE = .75;
function ZoomScroll(config, eventBus, canvas) {
	config = config || {};
	this._enabled = false;
	this._canvas = canvas;
	this._container = canvas._container;
	this._handleWheel = bind$1(this._handleWheel, this);
	this._totalDelta = 0;
	this._scale = config.scale || DEFAULT_SCALE;
	var self = this;
	eventBus.on("canvas.mouseover", function() {
		self._init(config.enabled !== false);
	});
	eventBus.on("canvas.mouseout", function() {
		self._init(false);
	});
}
ZoomScroll.$inject = [
	"config.zoomScroll",
	"eventBus",
	"canvas"
];
ZoomScroll.prototype.scroll = function scroll(delta) {
	this._canvas.scroll(delta);
};
ZoomScroll.prototype.reset = function reset() {
	this._canvas.zoom("fit-viewport");
};
ZoomScroll.prototype.zoom = function zoom(delta, position) {
	var stepSize = getStepSize(RANGE, NUM_STEPS * 2);
	this._totalDelta += delta;
	if (Math.abs(this._totalDelta) > DELTA_THRESHOLD) {
		this._zoom(delta, position, stepSize);
		this._totalDelta = 0;
	}
};
ZoomScroll.prototype._handleWheel = function handleWheel(event) {
	if (!this._enabled) return;
	var element = this._container;
	event.preventDefault();
	var isZoom = event.ctrlKey || isMac() && event.metaKey;
	var isHorizontalScroll = event.shiftKey;
	var factor = -1 * this._scale, delta;
	if (isZoom) factor *= event.deltaMode === 0 ? .02 : .32;
	else factor *= event.deltaMode === 0 ? 1 : 16;
	if (isZoom) {
		var elementRect = element.getBoundingClientRect();
		var offset = {
			x: event.clientX - elementRect.left,
			y: event.clientY - elementRect.top
		};
		delta = Math.sqrt(Math.pow(event.deltaY, 2) + Math.pow(event.deltaX, 2)) * sign(event.deltaY) * factor;
		this.zoom(delta, offset);
	} else {
		if (isHorizontalScroll) delta = {
			dx: factor * event.deltaY,
			dy: 0
		};
		else delta = {
			dx: factor * event.deltaX,
			dy: factor * event.deltaY
		};
		this.scroll(delta);
	}
};
ZoomScroll.prototype.stepZoom = function stepZoom(delta, position) {
	var stepSize = getStepSize(RANGE, NUM_STEPS);
	this._zoom(delta, position, stepSize);
};
ZoomScroll.prototype._zoom = function(delta, position, stepSize) {
	var canvas = this._canvas;
	var direction = delta > 0 ? 1 : -1;
	var currentLinearZoomLevel = log10(canvas.zoom());
	var newLinearZoomLevel = Math.round(currentLinearZoomLevel / stepSize) * stepSize;
	newLinearZoomLevel += stepSize * direction;
	var newLogZoomLevel = Math.pow(10, newLinearZoomLevel);
	canvas.zoom(cap(RANGE, newLogZoomLevel), position);
};
ZoomScroll.prototype.toggle = function toggle(newEnabled) {
	var element = this._container;
	var handleWheel = this._handleWheel;
	var oldEnabled = this._enabled;
	if (typeof newEnabled === "undefined") newEnabled = !oldEnabled;
	if (oldEnabled !== newEnabled) event[newEnabled ? "bind" : "unbind"](element, "wheel", handleWheel, false);
	this._enabled = newEnabled;
	return newEnabled;
};
ZoomScroll.prototype._init = function(newEnabled) {
	this.toggle(newEnabled);
};
//#endregion
//#region ../../node_modules/diagram-js/lib/navigation/zoomscroll/index.js
var zoomscroll_default = {
	__init__: ["zoomScroll"],
	zoomScroll: ["type", ZoomScroll]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/util/Cursor.js
var CURSOR_CLS_PATTERN = /^djs-cursor-.*$/;
function set(mode) {
	var classes = classes$1(document.body);
	classes.removeMatching(CURSOR_CLS_PATTERN);
	if (mode) classes.add("djs-cursor-" + mode);
}
function unset() {
	set(null);
}
//#endregion
//#region ../../node_modules/diagram-js/lib/util/ClickTrap.js
var TRAP_PRIORITY = 5e3;
function install(eventBus, eventName) {
	eventName = eventName || "element.click";
	function trap() {
		return false;
	}
	eventBus.once(eventName, TRAP_PRIORITY, trap);
	return function() {
		eventBus.off(eventName, trap);
	};
}
//#endregion
//#region ../../node_modules/diagram-js/lib/navigation/movecanvas/MoveCanvas.js
var THRESHOLD = 15;
function MoveCanvas(eventBus, canvas) {
	var context;
	function handleMousedown(event) {
		return handleStart(event.originalEvent);
	}
	eventBus.on("canvas.focus.changed", function(event) {
		if (event.focused) eventBus.on("element.mousedown", 500, handleMousedown);
		else eventBus.off("element.mousedown", handleMousedown);
	});
	eventBus.on("diagram.destroy", function() {
		if (context) handleEnd();
	});
	function handleMove(event) {
		var start = context.start, button = context.button, position = toPoint(event), delta$1 = delta(position, start);
		if (!context.dragging && length(delta$1) > THRESHOLD) {
			context.dragging = true;
			if (button === 0) install(eventBus);
			set("grab");
		}
		if (context.dragging) {
			delta$1 = delta(position, context.last || context.start);
			canvas.scroll({
				dx: delta$1.x,
				dy: delta$1.y
			});
			context.last = position;
		}
		event.preventDefault();
	}
	function handleEnd(event$1) {
		event.unbind(document, "mousemove", handleMove);
		event.unbind(document, "mouseup", handleEnd);
		context = null;
		unset();
	}
	function handleStart(event$2) {
		if (closest(event$2.target, ".djs-draggable")) return;
		var button = event$2.button;
		if (button >= 2 || event$2.ctrlKey || event$2.shiftKey || event$2.altKey) return;
		context = {
			button,
			start: toPoint(event$2)
		};
		event.bind(document, "mousemove", handleMove);
		event.bind(document, "mouseup", handleEnd);
		return true;
	}
	this.isActive = function() {
		return !!context;
	};
}
MoveCanvas.$inject = ["eventBus", "canvas"];
function length(point) {
	return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
}
//#endregion
//#region ../../node_modules/diagram-js/lib/navigation/movecanvas/index.js
var movecanvas_default = {
	__init__: ["moveCanvas"],
	moveCanvas: ["type", MoveCanvas]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/keyboard/KeyboardUtil.js
init_dist();
var KEYS_COPY = ["c", "C"];
var KEYS_PASTE = ["v", "V"];
var KEYS_DUPLICATE = ["d", "D"];
var KEYS_CUT = ["x", "X"];
var KEYS_REDO = ["y", "Y"];
var KEYS_UNDO = ["z", "Z"];
function hasModifier(event) {
	return event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
}
function isCmd(event) {
	if (event.altKey) return false;
	return event.ctrlKey || event.metaKey;
}
function isKey(keys, event) {
	keys = isArray$2(keys) ? keys : [keys];
	return keys.indexOf(event.key) !== -1 || keys.indexOf(event.code) !== -1 || keys.indexOf(getPhysicalLetter(event)) !== -1;
}
var NON_LATIN_LETTER = /^(?!\p{Script_Extensions=Latin}|\p{Script=Common})\p{Letter}$/u;
var NON_LETTER = /^\P{Letter}$/u;
function getPhysicalLetter(event) {
	var key = event.key, match = /^Key([A-Z])$/.exec(event.code || "");
	if (!match || typeof key !== "string") return null;
	var letter = match[1];
	if (NON_LATIN_LETTER.test(key)) return event.shiftKey ? letter : letter.toLowerCase();
	if (event.shiftKey && NON_LETTER.test(key) && event.keyCode === letter.charCodeAt(0)) return letter;
	return null;
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
//#endregion
//#region ../../node_modules/diagram-js/lib/features/scheduler/Scheduler.js
var Ids = new IdGenerator();
function Scheduler(eventBus) {
	this._scheduled = {};
	eventBus.on("diagram.destroy", () => {
		Object.keys(this._scheduled).forEach((id) => {
			this.cancel(id);
		});
	});
}
Scheduler.$inject = ["eventBus"];
Scheduler.prototype.schedule = function(taskFn, id = Ids.next()) {
	this.cancel(id);
	const newScheduled = this._schedule(taskFn, id);
	this._scheduled[id] = newScheduled;
	return newScheduled.promise;
};
Scheduler.prototype._schedule = function(taskFn, id) {
	const deferred = defer();
	return {
		executionId: setTimeout(() => {
			try {
				this._scheduled[id] = null;
				try {
					deferred.resolve(taskFn());
				} catch (error) {
					deferred.reject(error);
				}
			} catch (error) {
				console.error("Scheduler#_schedule execution failed", error);
			}
		}),
		promise: deferred.promise
	};
};
Scheduler.prototype.cancel = function(id) {
	const scheduled = this._scheduled[id];
	if (scheduled) {
		this._cancel(scheduled);
		this._scheduled[id] = null;
	}
};
Scheduler.prototype._cancel = function(scheduled) {
	clearTimeout(scheduled.executionId);
};
function defer() {
	const deferred = {};
	deferred.promise = new Promise((resolve, reject) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});
	return deferred;
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/scheduler/index.js
var scheduler_default = { scheduler: ["type", Scheduler] };
//#endregion
//#region ../../node_modules/diagram-js/lib/features/context-pad/ContextPad.js
init_dist();
var MARKER_HIDDEN = "djs-element-hidden";
var entrySelector = ".entry";
var DEFAULT_PRIORITY$3 = 1e3;
var CONTEXT_PAD_MARGIN = 8;
var HOVER_DELAY = 300;
function ContextPad(canvas, elementRegistry, eventBus, scheduler) {
	this._canvas = canvas;
	this._elementRegistry = elementRegistry;
	this._eventBus = eventBus;
	this._scheduler = scheduler;
	this._current = null;
	this._init();
}
ContextPad.$inject = [
	"canvas",
	"elementRegistry",
	"eventBus",
	"scheduler"
];
ContextPad.prototype._init = function() {
	var self = this;
	this._eventBus.on("selection.changed", function(event) {
		var selection = event.newSelection;
		var target = selection.length ? selection.length === 1 ? selection[0] : selection : null;
		if (target) self.open(target, true);
		else self.close();
	});
	this._eventBus.on("elements.changed", function(event) {
		var elements = event.elements, current = self._current;
		if (!current) return;
		var target = current.target;
		var targets = isArray$2(target) ? target : [target];
		if (targets.filter(function(element) {
			return elements.includes(element);
		}).length) {
			self.close();
			var targetsNew = targets.filter(function(element) {
				return self._elementRegistry.get(element.id);
			});
			if (targetsNew.length) self._updateAndOpen(targetsNew.length > 1 ? targetsNew : targetsNew[0]);
		}
	});
	this._eventBus.on("canvas.viewbox.changed", function() {
		self._updatePosition();
	});
	this._eventBus.on("element.marker.update", function(event) {
		if (!self.isOpen()) return;
		var element = event.element;
		var current = self._current;
		if (!(isArray$2(current.target) ? current.target : [current.target]).includes(element)) return;
		self._updateVisibility();
	});
	this._container = this._createContainer();
};
ContextPad.prototype._createContainer = function() {
	var container = domify("<div class=\"djs-context-pad-parent\"></div>");
	this._canvas.getContainer().appendChild(container);
	return container;
};
ContextPad.prototype.registerProvider = function(priority, provider) {
	if (!provider) {
		provider = priority;
		priority = DEFAULT_PRIORITY$3;
	}
	this._eventBus.on("contextPad.getProviders", priority, function(event) {
		event.providers.push(provider);
	});
};
ContextPad.prototype.getEntries = function(target) {
	var providers = this._getProviders();
	var provideFn = isArray$2(target) ? "getMultiElementContextPadEntries" : "getContextPadEntries";
	var entries = {};
	forEach(providers, function(provider) {
		if (!isFunction(provider[provideFn])) return;
		var entriesOrUpdater = provider[provideFn](target);
		if (isFunction(entriesOrUpdater)) entries = entriesOrUpdater(entries);
		else forEach(entriesOrUpdater, function(entry, id) {
			entries[id] = entry;
		});
	});
	return entries;
};
ContextPad.prototype.trigger = function(action, event, autoActivate) {
	var self = this;
	var entry, originalEvent, button = event.delegateTarget || event.target;
	if (!button) return event.preventDefault();
	entry = attr$1(button, "data-action");
	originalEvent = event.originalEvent || event;
	if (action === "mouseover") {
		this._timeout = setTimeout(function() {
			self._mouseout = self.triggerEntry(entry, "hover", originalEvent, autoActivate);
		}, HOVER_DELAY);
		return;
	} else if (action === "mouseout") {
		clearTimeout(this._timeout);
		if (this._mouseout) {
			this._mouseout();
			this._mouseout = null;
		}
		return;
	}
	return this.triggerEntry(entry, action, originalEvent, autoActivate);
};
ContextPad.prototype.triggerEntry = function(entryId, action, event, autoActivate) {
	if (!this.isShown()) return;
	var target = this._current.target;
	var entry = this._current.entries[entryId];
	if (!entry) return;
	var handler = entry.action;
	if (this._eventBus.fire("contextPad.trigger", {
		entry,
		event
	}) === false) return;
	if (isFunction(handler)) {
		if (action === "click") return handler(event, target, autoActivate);
	} else if (handler[action]) return handler[action](event, target, autoActivate);
	event.preventDefault();
};
ContextPad.prototype.open = function(target, force) {
	if (!force && this.isOpen(target)) return;
	if (this._eventBus.fire("contextPad.open.allowed", { target }) === false) return;
	this.close();
	this._updateAndOpen(target);
};
ContextPad.prototype._getProviders = function() {
	var event = this._eventBus.createEvent({
		type: "contextPad.getProviders",
		providers: []
	});
	this._eventBus.fire(event);
	return event.providers;
};
ContextPad.prototype._updateAndOpen = function(target) {
	var entries = this.getEntries(target), html = this._createHtml(target), image;
	forEach(entries, function(entry, id) {
		var grouping = entry.group || "default", control = domify(entry.html || "<div class=\"entry\" draggable=\"true\"></div>"), container;
		attr$1(control, "data-action", id);
		container = query("[data-group=" + escapeCSS(grouping) + "]", html);
		if (!container) {
			container = domify("<div class=\"group\"></div>");
			attr$1(container, "data-group", grouping);
			html.appendChild(container);
		}
		container.appendChild(control);
		if (entry.className) addClasses(control, entry.className);
		if (entry.title) attr$1(control, "title", entry.title);
		if (entry.imageUrl) {
			image = domify("<img>");
			attr$1(image, "src", entry.imageUrl);
			image.style.width = "100%";
			image.style.height = "100%";
			control.appendChild(image);
		}
	});
	classes$1(html).add("open");
	this._current = {
		entries,
		html,
		target
	};
	this._updatePosition();
	this._updateVisibility();
	this._eventBus.fire("contextPad.open", { current: this._current });
};
ContextPad.prototype._createHtml = function(target) {
	var self = this;
	var html = domify("<div class=\"djs-context-pad\"></div>");
	delegate.bind(html, entrySelector, "click", function(event) {
		self.trigger("click", event);
	});
	delegate.bind(html, entrySelector, "dragstart", function(event) {
		self.trigger("dragstart", event);
	});
	delegate.bind(html, entrySelector, "mouseover", function(event) {
		self.trigger("mouseover", event);
	});
	delegate.bind(html, entrySelector, "mouseout", function(event) {
		self.trigger("mouseout", event);
	});
	event.bind(html, "mousedown", function(event) {
		event.stopPropagation();
	});
	this._container.appendChild(html);
	this._eventBus.fire("contextPad.create", {
		target,
		pad: html
	});
	return html;
};
ContextPad.prototype.getPad = function(target) {
	console.warn(new Error("ContextPad#getPad is deprecated and will be removed in future library versions, cf. https://github.com/bpmn-io/diagram-js/pull/888"));
	let html;
	if (this.isOpen() && targetsEqual(this._current.target, target)) html = this._current.html;
	else html = this._createHtml(target);
	return { html };
};
ContextPad.prototype.close = function() {
	if (!this.isOpen()) return;
	clearTimeout(this._timeout);
	this._container.innerHTML = "";
	this._eventBus.fire("contextPad.close", { current: this._current });
	this._current = null;
};
ContextPad.prototype.isOpen = function(target) {
	var current = this._current;
	if (!current) return false;
	if (!target) return true;
	var currentTarget = current.target;
	if (isArray$2(target) !== isArray$2(currentTarget)) return false;
	if (isArray$2(target)) return target.length === currentTarget.length && every(target, function(element) {
		return currentTarget.includes(element);
	});
	else return currentTarget === target;
};
ContextPad.prototype.isShown = function() {
	return this.isOpen() && classes$1(this._current.html).has("open");
};
ContextPad.prototype.show = function() {
	if (!this.isOpen()) return;
	classes$1(this._current.html).add("open");
	this._updatePosition();
	this._eventBus.fire("contextPad.show", { current: this._current });
};
ContextPad.prototype.hide = function() {
	if (!this.isOpen()) return;
	classes$1(this._current.html).remove("open");
	this._eventBus.fire("contextPad.hide", { current: this._current });
};
ContextPad.prototype._getPosition = function(target) {
	if (!isArray$2(target) && isConnection(target)) {
		var viewbox = this._canvas.viewbox();
		var lastWaypoint = getLastWaypoint(target);
		var x = lastWaypoint.x * viewbox.scale - viewbox.x * viewbox.scale, y = lastWaypoint.y * viewbox.scale - viewbox.y * viewbox.scale;
		return {
			left: x + CONTEXT_PAD_MARGIN * this._canvas.zoom(),
			top: y
		};
	}
	var containerBounds = this._canvas.getContainer().getBoundingClientRect();
	var targetBounds = this._getTargetBounds(target);
	return {
		left: targetBounds.right - containerBounds.left + CONTEXT_PAD_MARGIN * this._canvas.zoom(),
		top: targetBounds.top - containerBounds.top
	};
};
ContextPad.prototype._updatePosition = function() {
	const updateFn = () => {
		if (!this.isOpen()) return;
		var html = this._current.html;
		var position = this._getPosition(this._current.target);
		if ("x" in position && "y" in position) {
			html.style.left = position.x + "px";
			html.style.top = position.y + "px";
		} else [
			"top",
			"right",
			"bottom",
			"left"
		].forEach(function(key) {
			if (key in position) html.style[key] = position[key] + "px";
		});
	};
	this._scheduler.schedule(updateFn, "ContextPad#_updatePosition");
};
ContextPad.prototype._updateVisibility = function() {
	const updateFn = () => {
		if (!this.isOpen()) return;
		var self = this;
		var target = this._current.target;
		if ((isArray$2(target) ? target : [target]).some(function(target) {
			return self._canvas.hasMarker(target, MARKER_HIDDEN);
		})) self.hide();
		else self.show();
	};
	this._scheduler.schedule(updateFn, "ContextPad#_updateVisibility");
};
ContextPad.prototype._getTargetBounds = function(target) {
	var self = this;
	return (isArray$2(target) ? target : [target]).map(function(element) {
		return self._canvas.getGraphics(element);
	}).reduce(function(bounds, elementGfx) {
		const elementBounds = elementGfx.getBoundingClientRect();
		bounds.top = Math.min(bounds.top, elementBounds.top);
		bounds.right = Math.max(bounds.right, elementBounds.right);
		bounds.bottom = Math.max(bounds.bottom, elementBounds.bottom);
		bounds.left = Math.min(bounds.left, elementBounds.left);
		bounds.x = bounds.left;
		bounds.y = bounds.top;
		bounds.width = bounds.right - bounds.left;
		bounds.height = bounds.bottom - bounds.top;
		return bounds;
	}, {
		top: Infinity,
		right: -Infinity,
		bottom: -Infinity,
		left: Infinity
	});
};
function addClasses(element, classNames) {
	var classes = classes$1(element);
	classNames = isArray$2(classNames) ? classNames : classNames.split(/\s+/g);
	classNames.forEach(function(cls) {
		classes.add(cls);
	});
}
function getLastWaypoint(connection) {
	return connection.waypoints[connection.waypoints.length - 1];
}
function targetsEqual(target, otherTarget) {
	target = isArray$2(target) ? target : [target];
	otherTarget = isArray$2(otherTarget) ? otherTarget : [otherTarget];
	return target.length === otherTarget.length && every(target, function(element) {
		return otherTarget.includes(element);
	});
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/context-pad/index.js
var context_pad_default = {
	__depends__: [
		interaction_events_default,
		scheduler_default,
		overlays_default
	],
	contextPad: ["type", ContextPad]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/command/CommandInterceptor.js
init_dist();
var DEFAULT_PRIORITY$2 = 1e3;
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
	if (isFunction(hook) || isNumber(hook)) {
		that = unwrap;
		unwrap = handlerFn;
		handlerFn = priority;
		priority = hook;
		hook = null;
	}
	if (isFunction(priority)) {
		that = unwrap;
		unwrap = handlerFn;
		handlerFn = priority;
		priority = DEFAULT_PRIORITY$2;
	}
	if (isObject(unwrap)) {
		that = unwrap;
		unwrap = false;
	}
	if (!isFunction(handlerFn)) throw new Error("handlerFn must be a function");
	if (!isArray$2(events)) events = [events];
	var eventBus = this._eventBus;
	forEach(events, function(event) {
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
		if (isFunction(events) || isNumber(events)) {
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
//#endregion
//#region ../../node_modules/diagram-js/lib/features/keyboard/Keyboard.js
init_dist();
var KEYDOWN_EVENT = "keyboard.keydown";
var KEYUP_EVENT = "keyboard.keyup";
var DEFAULT_PRIORITY$1 = 1e3;
var compatMessage = "Keyboard binding is now implicit; explicit binding to an element got removed. For more information, see https://github.com/bpmn-io/diagram-js/issues/661";
function Keyboard(config, eventBus) {
	var self = this;
	this._config = config = config || {};
	this._eventBus = eventBus;
	this._keydownHandler = this._keydownHandler.bind(this);
	this._keyupHandler = this._keyupHandler.bind(this);
	eventBus.on("diagram.destroy", function() {
		self._fire("destroy");
		self.unbind();
	});
	if (config.bindTo) console.error("unsupported configuration <keyboard.bindTo>", new Error(compatMessage));
	var bind = config && config.bind !== false;
	eventBus.on("canvas.init", function(event) {
		self._target = event.svg;
		if (bind) self.bind();
		self._fire("init");
	});
}
Keyboard.$inject = ["config.keyboard", "eventBus"];
Keyboard.prototype._keydownHandler = function(event) {
	this._keyHandler(event, KEYDOWN_EVENT);
};
Keyboard.prototype._keyupHandler = function(event) {
	this._keyHandler(event, KEYUP_EVENT);
};
Keyboard.prototype._keyHandler = function(event, type) {
	var eventBusResult;
	if (this._isEventIgnored(event)) return;
	var context = { keyEvent: event };
	eventBusResult = this._eventBus.fire(type || KEYDOWN_EVENT, context);
	if (eventBusResult) event.preventDefault();
};
Keyboard.prototype._isEventIgnored = function(event) {
	return false;
};
Keyboard.prototype.bind = function(node) {
	if (node) console.error("unsupported argument <node>", new Error(compatMessage));
	this.unbind();
	node = this._node = this._target;
	event.bind(node, "keydown", this._keydownHandler);
	event.bind(node, "keyup", this._keyupHandler);
	this._fire("bind");
};
Keyboard.prototype.getBinding = function() {
	return this._node;
};
Keyboard.prototype.unbind = function() {
	var node = this._node;
	if (node) {
		this._fire("unbind");
		event.unbind(node, "keydown", this._keydownHandler);
		event.unbind(node, "keyup", this._keyupHandler);
	}
	this._node = null;
};
Keyboard.prototype._fire = function(event) {
	this._eventBus.fire("keyboard." + event, { node: this._node });
};
Keyboard.prototype.addListener = function(priority, listener, type) {
	if (isFunction(priority)) {
		type = listener;
		listener = priority;
		priority = DEFAULT_PRIORITY$1;
	}
	this._eventBus.on(type || KEYDOWN_EVENT, priority, listener);
};
Keyboard.prototype.removeListener = function(listener, type) {
	this._eventBus.off(type || KEYDOWN_EVENT, listener);
};
Keyboard.prototype.hasModifier = hasModifier;
Keyboard.prototype.isCmd = isCmd;
Keyboard.prototype.isShift = isShift;
Keyboard.prototype.isKey = isKey;
//#endregion
//#region ../../node_modules/diagram-js/lib/features/keyboard/KeyboardBindings.js
var LOW_PRIORITY$1 = 500;
function KeyboardBindings(eventBus, keyboard) {
	var self = this;
	eventBus.on("editorActions.init", LOW_PRIORITY$1, function(event) {
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
		if (isKey(["+", "="], event) && isCmd(event)) {
			editorActions.trigger("stepZoom", { value: 1 });
			return true;
		}
	});
	addListener("stepZoom", function(context) {
		var event = context.keyEvent;
		if (isKey("-", event) && isCmd(event)) {
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
		if (isKey(["Backspace", "Delete"], event)) {
			editorActions.trigger("removeSelection");
			return true;
		}
	});
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/keyboard/index.js
var keyboard_default = {
	__init__: ["keyboard", "keyboardBindings"],
	keyboard: ["type", Keyboard],
	keyboardBindings: ["type", KeyboardBindings]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/navigation/keyboard-move/KeyboardMove.js
init_dist();
var DEFAULT_CONFIG = {
	moveSpeed: 50,
	moveSpeedAccelerated: 200
};
function KeyboardMove(config, keyboard, canvas) {
	var self = this;
	this._config = assign$1({}, DEFAULT_CONFIG, config || {});
	keyboard.addListener(arrowsListener);
	function arrowsListener(context) {
		var event = context.keyEvent, config = self._config;
		if (!keyboard.isCmd(event)) return;
		if (keyboard.isKey([
			"ArrowLeft",
			"ArrowUp",
			"ArrowDown",
			"ArrowRight"
		], event)) {
			var speed = keyboard.isShift(event) ? config.moveSpeedAccelerated : config.moveSpeed;
			var direction;
			switch (event.key) {
				case "ArrowLeft":
					direction = "left";
					break;
				case "ArrowUp":
					direction = "up";
					break;
				case "ArrowRight":
					direction = "right";
					break;
				case "ArrowDown": direction = "down";
			}
			self.moveCanvas({
				speed,
				direction
			});
			return true;
		}
	}
	this.moveCanvas = function(options) {
		var dx = 0, dy = 0;
		var actualSpeed = options.speed / Math.min(Math.sqrt(canvas.viewbox().scale), 1);
		switch (options.direction) {
			case "left":
				dx = actualSpeed;
				break;
			case "up":
				dy = actualSpeed;
				break;
			case "right":
				dx = -actualSpeed;
				break;
			case "down": dy = -actualSpeed;
		}
		canvas.scroll({
			dx,
			dy
		});
	};
}
KeyboardMove.$inject = [
	"config.keyboardMove",
	"keyboard",
	"canvas"
];
//#endregion
//#region ../../node_modules/diagram-js/lib/navigation/keyboard-move/index.js
var keyboard_move_default = {
	__depends__: [keyboard_default],
	__init__: ["keyboardMove"],
	keyboardMove: ["type", KeyboardMove]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/change-support/ChangeSupport.js
function ChangeSupport(eventBus, canvas, elementRegistry, graphicsFactory) {
	eventBus.on("element.changed", function(event) {
		var element = event.element;
		if (element.parent || element === canvas.getRootElement()) event.gfx = elementRegistry.getGraphics(element);
		if (!event.gfx) return;
		eventBus.fire(getType(element) + ".changed", event);
	});
	eventBus.on("elements.changed", function(event) {
		var elements = event.elements;
		elements.forEach(function(e) {
			eventBus.fire("element.changed", { element: e });
		});
		graphicsFactory.updateContainments(elements);
	});
	eventBus.on("shape.changed", function(event) {
		graphicsFactory.update("shape", event.element, event.gfx);
	});
	eventBus.on("connection.changed", function(event) {
		graphicsFactory.update("connection", event.element, event.gfx);
	});
}
ChangeSupport.$inject = [
	"eventBus",
	"canvas",
	"elementRegistry",
	"graphicsFactory"
];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/change-support/index.js
var change_support_default = {
	__init__: ["changeSupport"],
	changeSupport: ["type", ChangeSupport]
};
//#endregion
//#region ../../node_modules/diagram-js/lib/features/outline/Outline.js
init_dist();
var LOW_PRIORITY = 500;
var DEFAULT_PRIORITY = 1e3;
function Outline(eventBus, styles, elementRegistry) {
	this._eventBus = eventBus;
	this._elementRegistry = elementRegistry;
	this._outlineOffset = 5;
	this._outlineStyle = styles.cls("djs-outline", ["no-fill"]);
	var self = this;
	function createElementOutline(element) {
		if (isRoot(element)) return;
		self.createOutline(element);
	}
	eventBus.on("element.hover", function(event) {
		createElementOutline(event.element);
	});
	eventBus.on("selection.changed", function(event) {
		forEach(event.newSelection, createElementOutline);
	});
	eventBus.on(["shape.changed", "connection.changed"], LOW_PRIORITY, function(event) {
		var element = event.element, gfx = event.gfx;
		var outline = query(".djs-outline", gfx);
		if (outline) self.updateOutline(element, outline);
	});
}
Outline.prototype.createOutline = function(element) {
	var gfx = this._elementRegistry.getGraphics(element);
	if (!gfx) throw new Error("cannot create outline for non-rendered element");
	var outline = query(".djs-outline", gfx);
	if (!outline) {
		outline = this.getOutline(element) || this._createOutlineGfx();
		append(gfx, outline);
		this.updateOutline(element, outline);
	}
	return outline;
};
Outline.prototype._createOutlineGfx = function() {
	var outline = create$1("rect");
	attr(outline, assign$1({
		x: 0,
		y: 0,
		rx: 4,
		width: 100,
		height: 100
	}, this._outlineStyle));
	return outline;
};
Outline.prototype.updateOutline = function(element, outline) {
	if (element.waypoints) this.updateConnectionOutline(outline, element);
	else this.updateShapeOutline(outline, element);
};
Outline.prototype.updateShapeOutline = function(outline, element) {
	var updated = false;
	var providers = this._getProviders();
	if (providers.length) forEach(providers, function(provider) {
		updated = updated || provider.updateOutline(element, outline);
	});
	if (!updated) attr(outline, {
		x: -this._outlineOffset,
		y: -this._outlineOffset,
		width: element.width + this._outlineOffset * 2,
		height: element.height + this._outlineOffset * 2
	});
};
Outline.prototype.updateConnectionOutline = function(outline, connection) {
	var bbox = getBBox(connection);
	attr(outline, {
		x: bbox.x - this._outlineOffset,
		y: bbox.y - this._outlineOffset,
		width: bbox.width + this._outlineOffset * 2,
		height: bbox.height + this._outlineOffset * 2
	});
};
Outline.prototype.registerProvider = function(priority, provider) {
	if (!provider) {
		provider = priority;
		priority = DEFAULT_PRIORITY;
	}
	this._eventBus.on("outline.getProviders", priority, function(event) {
		event.providers.push(provider);
	});
};
Outline.prototype._getProviders = function() {
	var event = this._eventBus.createEvent({
		type: "outline.getProviders",
		providers: []
	});
	this._eventBus.fire(event);
	return event.providers;
};
Outline.prototype.getOutline = function(element) {
	var outline;
	var providers = this._getProviders();
	forEach(providers, function(provider) {
		if (!isFunction(provider.getOutline)) return;
		outline = outline || provider.getOutline(element);
	});
	return outline;
};
Outline.$inject = [
	"eventBus",
	"styles",
	"elementRegistry"
];
//#endregion
//#region ../../node_modules/diagram-js/lib/features/outline/MultiSelectionOutline.js
init_dist();
var SELECTION_OUTLINE_PADDING = 6;
function MultiSelectionOutline(eventBus, canvas, selection) {
	this._canvas = canvas;
	var self = this;
	eventBus.on("element.changed", function(event) {
		if (selection.isSelected(event.element)) self._updateMultiSelectionOutline(selection.get());
	});
	eventBus.on("selection.changed", function(event) {
		var newSelection = event.newSelection;
		self._updateMultiSelectionOutline(newSelection);
	});
}
MultiSelectionOutline.prototype._updateMultiSelectionOutline = function(selection) {
	var layer = this._canvas.getLayer("selectionOutline");
	clear(layer);
	var enabled = selection.length > 1;
	classes(this._canvas.getContainer())[enabled ? "add" : "remove"]("djs-multi-select");
	if (!enabled) return;
	var bBox = addSelectionOutlinePadding(getBBox(selection));
	var rect = create$1("rect");
	attr(rect, assign$1({ rx: 3 }, bBox));
	classes(rect).add("djs-selection-outline");
	append(layer, rect);
};
MultiSelectionOutline.$inject = [
	"eventBus",
	"canvas",
	"selection"
];
function addSelectionOutlinePadding(bBox) {
	return {
		x: bBox.x - SELECTION_OUTLINE_PADDING,
		y: bBox.y - SELECTION_OUTLINE_PADDING,
		width: bBox.width + SELECTION_OUTLINE_PADDING * 2,
		height: bBox.height + SELECTION_OUTLINE_PADDING * 2
	};
}
//#endregion
//#region ../../node_modules/diagram-js/lib/features/outline/index.js
var outline_default = {
	__depends__: [selection_default],
	__init__: ["outline", "multiSelectionOutline"],
	outline: ["type", Outline],
	multiSelectionOutline: ["type", MultiSelectionOutline]
};
//#endregion
//#region ../../node_modules/@bpmn-io/properties-panel/preact/dist/preact.module.js
var n;
var l$1;
var u$2;
var i$2;
var r$1;
var o$1;
var e$1;
var f$2;
var c$1;
var a$1;
var s$1;
var h$1;
var p$1;
var v$1;
var y$1;
var d$1 = {};
var w$1 = [];
var _$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var g$1 = Array.isArray;
function m$1(n, l) {
	for (var u in l) n[u] = l[u];
	return n;
}
function b(n) {
	n && n.parentNode && n.parentNode.removeChild(n);
}
function k$1(l, u, t) {
	var i, r, o, e = {};
	for (o in u) "key" == o ? i = u[o] : "ref" == o ? r = u[o] : e[o] = u[o];
	if (arguments.length > 2 && (e.children = arguments.length > 3 ? n.call(arguments, 2) : t), "function" == typeof l && null != l.defaultProps) for (o in l.defaultProps) void 0 === e[o] && (e[o] = l.defaultProps[o]);
	return x$1(l, e, i, r, null);
}
function x$1(n, t, i, r, o) {
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
		__v: null == o ? ++u$2 : o,
		__i: -1,
		__u: 0
	};
	return null == o && null != l$1.vnode && l$1.vnode(e), e;
}
function M() {
	return { current: null };
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
		var u = n.__v, t = u.__e, i = [], r = [], o = m$1({}, u);
		o.__v = u.__v + 1, l$1.vnode && l$1.vnode(o), q$1(n.__P, o, u, n.__n, n.__P.namespaceURI, 32 & u.__u ? [t] : null, i, null == t ? $(u) : t, !!(32 & u.__u), r), o.__v = u.__v, o.__.__k[o.__i] = o, D$1(i, o, r), u.__e = u.__ = null, o.__e != t && P$1(o);
	}
}
function P$1(n) {
	if (null != (n = n.__) && null != n.__c) return n.__e = n.__c.base = null, n.__k.some(function(l) {
		if (null != l && null != l.__e) return n.__e = n.__c.base = l.__e;
	}), P$1(n);
}
function A$1(n) {
	(!n.__d && (n.__d = !0) && i$2.push(n) && !H.__r++ || r$1 != l$1.debounceRendering) && ((r$1 = l$1.debounceRendering) || o$1)(H);
}
function H() {
	try {
		for (var n, l = 1; i$2.length;) i$2.length > l && i$2.sort(e$1), n = i$2.shift(), l = i$2.length, I(n);
	} finally {
		i$2.length = H.__r = 0;
	}
}
function L(n, l, u, t, i, r, o, e, f, c, a) {
	var s, h, p, v, y, _, g = t && t.__k || w$1, m = l.length;
	for (f = T$1(u, l, g, f, m), s = 0; s < m; s++) null != (p = u.__k[s]) && (h = -1 != p.__i && g[p.__i] || d$1, p.__i = s, _ = q$1(n, p, h, i, r, o, e, f, c, a), v = p.__e, p.ref && h.ref != p.ref && (h.ref && J(h.ref, null, p), a.push(p.ref, p.__c || v, p)), null == y && null != v && (y = v), 4 & p.__u ? (f = j$1(p, f, n), h.__e && (h.__e = null)) : "function" == typeof p.type && void 0 !== _ ? f = _ : v && (f = v.nextSibling), p.__u &= -7);
	return u.__e = y, f;
}
function T$1(n, l, u, t, i) {
	var r, o, e, f, c, a = u.length, s = a, h = 0;
	for (n.__k = new Array(i), r = 0; r < i; r++) null != (o = l[r]) && "boolean" != typeof o && "function" != typeof o ? ("string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? o = n.__k[r] = x$1(null, o, null, null, null) : g$1(o) ? o = n.__k[r] = x$1(S, { children: o }, null, null, null) : void 0 === o.constructor && o.__b > 0 ? o = n.__k[r] = x$1(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : n.__k[r] = o, f = r + h, o.__ = n, o.__b = n.__b + 1, e = null, -1 != (c = o.__i = O(o, u, f, s)) && (s--, (e = u[c]) && (e.__u |= 2)), null == e || null == e.__v ? (-1 == c && (i > a ? h-- : i < a && h++), "function" != typeof o.type && (o.__u |= 4)) : c != f && (c == f - 1 ? h-- : c == f + 1 ? h++ : (c > f ? h-- : h++, o.__u |= 4))) : n.__k[r] = null;
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
function F$1(n, l) {
	return l = l || [], null == n || "boolean" == typeof n || (g$1(n) ? n.some(function(n) {
		F$1(n, l);
	}) : l.push(n)), l;
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
			if (x = u.props, M = F.prototype && F.prototype.render, I = (s = F.contextType) && i[s.__c], P = s ? I ? I.props.value : s.__ : i, t.__c ? k = (p = u.__c = t.__c).__ = p.__E : (M ? u.__c = p = new F(x, P) : (u.__c = p = new C$1(x, P), p.constructor = F, p.render = Q), I && I.sub(p), p.state || (p.state = {}), p.__n = i, v = p.__d = !0, p.__h = [], p._sb = []), M && null == p.__s && (p.__s = p.state), M && null != F.getDerivedStateFromProps && (p.__s == p.state && (p.__s = m$1({}, p.__s)), m$1(p.__s, F.getDerivedStateFromProps(x, p.__s))), y = p.props, d = p.state, p.__v = u, v) M && null == F.getDerivedStateFromProps && null != p.componentWillMount && p.componentWillMount(), M && null != p.componentDidMount && p.__h.push(p.componentDidMount);
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
			p.state = p.__s, null != p.getChildContext && (i = m$1(m$1({}, i), p.getChildContext())), M && !v && null != p.getSnapshotBeforeUpdate && (_ = p.getSnapshotBeforeUpdate(y, d)), T = null != s && s.type === S && null == s.key ? E(s.props.children) : s, f = L(n, g$1(T) ? T : [T], u, t, i, r, o, e, f, c, a), p.base = u.__e, u.__u &= -161, p.__h.length && e.push(p), k && (p.__E = p.__ = null);
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
	return "object" != typeof n || null == n || n.__b > 0 ? n : g$1(n) ? n.map(E) : void 0 !== n.constructor ? null : m$1({}, n);
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
		if (e = "textarea" == x && null != k.defaultValue ? null : e && n.call(u.childNodes), !c && null != e) for (m = {}, s = 0; s < u.attributes.length; s++) m[(y = u.attributes[s]).name] = y.value;
		for (s in m) y = m[s], "dangerouslySetInnerHTML" == s ? p = y : "children" == s || s in k || "value" == s && "defaultValue" in k || "checked" == s && "defaultChecked" in k || N(u, s, null, y, o);
		for (s in k) y = k[s], "children" == s ? v = y : "dangerouslySetInnerHTML" == s ? h = y : "value" == s ? w = y : "checked" == s ? _ = y : c && "function" != typeof y || m[s] === y || N(u, s, y, m[s], o);
		if (h) c || p && (h.__html == p.__html || h.__html == u.innerHTML) || (u.innerHTML = h.__html), t.__k = [];
		else if (p && (u.innerHTML = ""), L("template" == t.type ? u.content : u, g$1(v) ? v : [v], t, i, r, "foreignObject" == x ? "http://www.w3.org/1999/xhtml" : o, e, f, e ? e[0] : i.__k && $(i, 0), c, a), null != e) for (s = e.length; s--;) b(e[s]);
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
	t == document && (t = document.documentElement), l$1.__ && l$1.__(u, t), o = (r = "function" == typeof i) ? null : i && i.__k || t.__k, e = [], f = [], q$1(t, u = (!r && i || t).__k = k$1(S, null, [u]), o || d$1, d$1, t.namespaceURI, !r && i ? [i] : o ? null : t.firstChild ? n.call(t.childNodes) : null, e, !r && i ? i : o ? o.__e : t.firstChild, r, f), D$1(e, u, f), u.props.children = null;
}
function U(n, l) {
	R(n, l, U);
}
function W(l, u, t) {
	var i, r, o, e, f = m$1({}, l.props);
	for (o in l.type && l.type.defaultProps && (e = l.type.defaultProps), u) "key" == o ? i = u[o] : "ref" == o ? r = u[o] : f[o] = void 0 === u[o] && null != e ? e[o] : u[o];
	return arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : t), x$1(l.type, f, i || l.key, r || l.ref, null);
}
function X(n) {
	function l(n) {
		var u, t;
		return this.getChildContext || (u = new Set(), (t = {})[l.__c] = this, this.getChildContext = function() {
			return t;
		}, this.componentWillUnmount = function() {
			u = null;
		}, this.shouldComponentUpdate = function(n) {
			this.props.value != n.value && u.forEach(function(n) {
				n.__e = !0, A$1(n);
			});
		}, this.sub = function(n) {
			u.add(n);
			var l = n.componentWillUnmount;
			n.componentWillUnmount = function() {
				u && u.delete(n), l && l.call(n);
			};
		}), n.children;
	}
	return l.__c = "__cC" + y$1++, l.__ = n, l.Provider = l.__l = (l.Consumer = function(n, l) {
		return n.children(l);
	}).contextType = l, l;
}
n = w$1.slice, l$1 = { __e: function(n, l, u, t) {
	for (var i, r, o; l = l.__;) if ((i = l.__c) && !i.__) try {
		if ((r = i.constructor) && null != r.getDerivedStateFromError && (i.setState(r.getDerivedStateFromError(n)), o = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), o = i.__d), o) return i.__E = i;
	} catch (l) {
		n = l;
	}
	throw n;
} }, u$2 = 0, C$1.prototype.setState = function(n, l) {
	var u = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$1({}, this.state);
	"function" == typeof n && (n = n(m$1({}, u), this.props)), n && m$1(u, n), null != n && this.__v && (l && this._sb.push(l), A$1(this));
}, C$1.prototype.forceUpdate = function(n) {
	this.__v && (this.__e = !0, n && this.__h.push(n), A$1(this));
}, C$1.prototype.render = S, i$2 = [], o$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$1 = function(n, l) {
	return n.__v.__b - l.__v.__b;
}, H.__r = 0, f$2 = Math.random().toString(8), c$1 = "__d" + f$2, a$1 = "__a" + f$2, s$1 = /(PointerCapture)$|Capture$/i, h$1 = 0, p$1 = V(!1), v$1 = V(!0), y$1 = 0;
//#endregion
//#region ../../node_modules/@bpmn-io/properties-panel/preact/hooks/dist/hooks.module.js
var t;
var r;
var u$1;
var i$1;
var o = 0;
var f$1 = [];
var c = l$1;
var e = c.__b;
var a = c.__r;
var v = c.diffed;
var l = c.__c;
var m = c.unmount;
var p = c.__;
function s(n, t) {
	c.__h && c.__h(r, n, o || t), o = 0;
	var u = r.__H || (r.__H = {
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
	}], o.__c = r, !r.__f)) {
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
		r.__f = !0;
		var c = r.shouldComponentUpdate, e = r.componentWillUpdate;
		r.componentWillUpdate = function(n, t, r) {
			if (this.__e) {
				var u = c;
				c = void 0, f(n, t, r), c = u;
			}
			e && e.call(this, n, t, r);
		}, r.shouldComponentUpdate = f;
	}
	return o.__N || o.__;
}
function h(n, u) {
	var i = s(t++, 3);
	!c.__s && C(i.__H, u) && (i.__ = n, i.u = u, r.__H.__h.push(i));
}
function _(n, u) {
	var i = s(t++, 4);
	!c.__s && C(i.__H, u) && (i.__ = n, i.u = u, r.__h.push(i));
}
function A(n) {
	return o = 5, T(function() {
		return { current: n };
	}, []);
}
function F(n, t, r) {
	o = 6, _(function() {
		if ("function" == typeof n) {
			var r = n(t());
			return function() {
				n(null), r && "function" == typeof r && r();
			};
		}
		if (n) return n.current = t(), function() {
			return n.current = null;
		};
	}, null == r ? r : r.concat(n));
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
function x(n) {
	var u = r.context[n.__c], i = s(t++, 9);
	return i.c = n, u ? (i.__ ?? (i.__ = !0, u.sub(r)), u.props.value) : n.__;
}
function P(n, t) {
	c.useDebugValue && c.useDebugValue(t ? t(n) : n);
}
function g() {
	var n = s(t++, 11);
	if (!n.__) {
		for (var u = r.__v; null !== u && !u.__m && null !== u.__;) u = u.__;
		var i = u.__m || (u.__m = [0, 0]);
		n.__ = "P" + i[0] + "-" + i[1]++;
	}
	return n.__;
}
function j() {
	for (var n; n = f$1.shift();) {
		var t = n.__H;
		if (n.__P && t) try {
			t.__h.some(z), t.__h.some(B), t.__h = [];
		} catch (r) {
			t.__h = [], c.__e(r, n.__v);
		}
	}
}
c.__b = function(n) {
	r = null, e && e(n);
}, c.__ = function(n, t) {
	n && t.__k && t.__k.__m && (n.__m = t.__k.__m), p && p(n, t);
}, c.__r = function(n) {
	a && a(n), t = 0;
	var i = (r = n.__c).__H;
	i && (u$1 === r ? (i.__h = [], r.__h = [], i.__.some(function(n) {
		n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
	})) : (i.__h.some(z), i.__h.some(B), i.__h = [], t = 0)), u$1 = r;
}, c.diffed = function(n) {
	v && v(n);
	var t = n.__c;
	t && t.__H && (t.__H.__h.length && (1 !== f$1.push(t) && i$1 === c.requestAnimationFrame || ((i$1 = c.requestAnimationFrame) || w)(j)), t.__H.__.some(function(n) {
		n.u && (n.__H = n.u, n.u = void 0);
	})), u$1 = r = null;
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
	var t = r, u = n.__c;
	"function" == typeof u && (n.__c = void 0, u()), r = t;
}
function B(n) {
	var t = r;
	n.__c = n.__(), r = t;
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
//#region ../../node_modules/@bpmn-io/properties-panel/preact/jsx-runtime/dist/jsxRuntime.module.js
var f = 0;
Array.isArray;
function u(e, t, n, o, i, u) {
	t || (t = {});
	var a, c, p = t;
	if ("ref" in p) for (c in p = {}, t) "ref" == c ? a = t[c] : p[c] = t[c];
	var l = {
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
	return l$1.vnode && l$1.vnode(l), l;
}
//#endregion
export { Diagram as $, closest as $t, isCmd as A, getParents as At, delta as B, clear as Bt, outline_default as C, add as Ct, KeyboardBindings as D, getBBox as Dt, keyboard_default as E, eachElement as Et, install as F, updateLine as Ft, hasPrimaryModifier as G, BaseRenderer as Gt, IdGenerator as H, create$1 as Ht, set as I, append as It, getOriginal as J, all as Jt, hasSecondaryModifier as K, e$2 as Kt, unset as L, appendTo as Lt, isRedo as M, selfAndChildren as Mt, isUndo as N, componentsToPath as Nt, CommandInterceptor as O, getClosure as Ot, movecanvas_default as P, createLine as Pt, Text as Q, clear$1 as Qt, zoomscroll_default as R, attr as Rt, l$1 as S, pointsOnLine as St, keyboard_move_default as T, remove as Tt, selection_default as U, innerSVG as Ut, overlays_default as V, clone as Vt, interaction_events_default as W, remove$1 as Wt, toPoint as X, attr$1 as Xt, stopPropagation as Y, assign as Yt, translate_default as Z, classes$1 as Zt, S as _, UnsupportedEngineError as _n, findPathIntersections as _t, T as a, Reader as an, isModelElement as at, X as b, pointInRect as bt, g as c, EventBus as cn, asTRBL as ct, x as d, DisposableStore as dn, getMid as dt, delegate as en, rotate as et, y as f, MutableDisposable as fn, getOrientation as ft, R as g, NoModelerError as gn, isLabel as gt, M as h, observeCanvasSize as hn, isConnection as ht, P as i, remove$2 as in, ElementFactory as it, isKey as j, selfAndAllChildren as jt, context_pad_default as k, getEnclosedElements as kt, h as l, ThemeController as ln, filterRedundantWaypoints as lt, F$1 as m, isUsableViewbox as mn, roundPoint as mt, A as n, matches as nn, translate$1 as nt, _ as o, Writer as on, Refs as ot, C$1 as p, subscribe as pn, roundBounds as pt, isPrimaryButton as q, Ids$1 as qt, F as r, query as rn, getVisual as rt, d as s, Moddle as sn, asBounds as st, u as t, event as tn, transform as tt, q as u, installCanvasFocusIndicator as un, getElementLineIntersection as ut, U as v, getMidPoint as vt, change_support_default as w, indexOf as wt, k$1 as x, pointsAligned as xt, W as y, pointDistance as yt, center as z, classes as zt };

//# sourceMappingURL=jsxRuntime.module-C_nqa6u-.js.map