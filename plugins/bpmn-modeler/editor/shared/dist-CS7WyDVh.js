import { n as __esmMin, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-7_rZTKki.js";
import { T as isUndefined, _ as init_dist$2, g as has, w as isString, x as isNil } from "./EscapeUtil-3RypN4fl.js";
import { g as tags, i as init_dist$3, m as styleTags, n as ExternalTokenizer, p as init_dist$4, r as LRParser, t as ContextTracker } from "./dist-CAwPjkp6.js";
//#region ../../node_modules/bpmnlint/lib/resolver/static-resolver.js
var require_static_resolver = __commonJSMin(((exports, module) => {
	function StaticResolver(cache) {
		this.cache = cache;
	}
	module.exports = StaticResolver;
	StaticResolver.prototype.resolveRule = function(pkg, ruleName) {
		return this.resolve("rule", pkg, ruleName);
	};
	StaticResolver.prototype.resolveConfig = function(pkg, configName) {
		return this.resolve("config", pkg, configName);
	};
	StaticResolver.prototype.resolve = function(type, pkg, name) {
		const id = `${pkg}/${name}`;
		const resolved = this.cache[`${type}:${id}`];
		if (!resolved) throw new Error(`unknown ${type} <${id}>`);
		return resolved;
	};
}));
//#endregion
//#region ../../node_modules/semver-compare/index.js
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
//#endregion
//#region ../../node_modules/@bpmn-io/moddle-utils/index.js
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
	init_dist$2();
}));
//#endregion
//#region ../../node_modules/@bpmn-io/feel-analyzer/node_modules/@bpmn-io/lezer-feel/dist/index.js
function chars(str) {
	return Array.from(str).map((s) => s.charCodeAt(0));
}
function isStartChar(ch) {
	return ch === 63 || ch >= 65 && ch <= 90 || ch === 95 || ch >= 97 && ch <= 122 || ch >= 192 && ch <= 214 || ch >= 216 && ch <= 246 || ch >= 248 && ch <= 767 || ch >= 880 && ch <= 893 || ch >= 895 && ch <= 8191 || ch >= 8204 && ch <= 8205 || ch >= 8304 && ch <= 8591 || ch >= 11264 && ch <= 12271 || ch >= 12289 && ch <= 55295 || ch >= 63744 && ch <= 64975 || ch >= 65008 && ch <= 65533 || ch >= 55296 && ch <= 56319 || ch >= 56320 && ch <= 57343;
}
function isAdditional(ch) {
	return additionalNameChars.includes(ch);
}
function isPartChar(ch) {
	return ch >= 48 && ch <= 57 || ch === 183 || ch >= 768 && ch <= 879 || ch >= 8255 && ch <= 8256;
}
function isSpace(ch) {
	return spaceChars.includes(ch);
}
function indent(str, spaces) {
	return spaces.concat(str.split(/\n/g).join("\n" + spaces));
}
function parseAdditionalSymbol(input, offset = 0) {
	const next = input.peek(offset);
	if (next === asterix && input.peek(offset + 1) === asterix) return {
		offset: 2,
		token: "**"
	};
	if (isAdditional(next)) return {
		offset: 1,
		token: String.fromCharCode(next)
	};
	return null;
}
function parseIdentifier(input, offset = 0, namePart = false) {
	for (let inside = false, chars = [], i = 0;; i++) {
		const next = input.peek(offset + i);
		if (isStartChar(next) || (inside || namePart) && isPartChar(next)) {
			if (!inside) inside = true;
			chars.push(next);
		} else {
			if (chars.length) return {
				token: String.fromCharCode(...chars),
				offset: i
			};
			return null;
		}
	}
}
function parseSpaces(input, offset) {
	for (let inside = false, i = 0;; i++) if (isSpace(input.peek(offset + i))) {
		if (!inside) inside = true;
	} else {
		if (inside) return {
			token: " ",
			offset: i
		};
		return null;
	}
}
function parseName(input, variables) {
	const { keys, prefixes } = variables.contextCache();
	const start = variables.tokens;
	for (let i = 0, tokens = [], nextMatch = null;;) {
		const namePart = start.length + tokens.length > 0;
		const maybeSpace = tokens.length > 0;
		const match = parseIdentifier(input, i, namePart) || namePart && parseAdditionalSymbol(input, i) || maybeSpace && parseSpaces(input, i);
		if (!match) return nextMatch;
		const { token, offset } = match;
		i += offset;
		if (token === " ") continue;
		tokens = [...tokens, token];
		const name = [...start, ...tokens].join(" ");
		if (keys.has(name)) {
			const token = tokens[0];
			nextMatch = {
				token,
				offset: token.length,
				term: nameIdentifier
			};
		}
		if (prefixes.has(name)) continue;
		if (dateTimeIdentifiers.some((el) => el === name)) {
			const token = tokens[0];
			nextMatch = {
				token,
				offset: token.length,
				term: identifier
			};
		}
		if (dateTimeIdentifiers.some((el) => el.startsWith(name))) continue;
		return nextMatch;
	}
}
function getPrefixes(str) {
	const prefixes = [];
	for (let i = 1; i <= str.length; i++) prefixes.push(str.substring(0, i));
	return prefixes;
}
function cacheKey(key, cache) {
	const normalizedKey = normalizeContextKey(key);
	const prefixes = getPrefixes(normalizedKey);
	cache.keys.add(normalizedKey);
	for (const prefix of prefixes) cache.prefixes.add(prefix);
	cache.originalMap.set(normalizedKey, key);
	return cache;
}
function computeContextCache(context) {
	const cache = createContextCache();
	for (const key of context.getKeys()) cacheKey(key, cache);
	return cache;
}
function createContextCache(from) {
	return {
		keys: new Set(from?.keys),
		prefixes: new Set(from?.prefixes),
		originalMap: new Map(from?.originalMap)
	};
}
function normalizeContextKey(name) {
	return name.replace(/\s*([./\-'+]|\*\*?)\s*/g, " $1 ").replace(/\s{2,}/g, " ").trim();
}
function wrap(variables, scopeName, code) {
	const parts = variables.children.filter((c) => c.name !== scopeName);
	const children = variables.children.filter((c) => c.name === scopeName);
	const namePart = parts[0];
	const valuePart = parts[Math.max(1, parts.length - 1)];
	const name = namePart?.computedValue();
	const value = valuePart?.computedValue() ?? null;
	return variables.assign({ children }).enterScope(scopeName).pushChildren(parts).exitScope(code).define(name, value);
}
function trackVariables(context = {}, Context = VariableContext) {
	const start = Variables.of({ context: Context.of(context) });
	return new ContextTracker({
		start,
		reduce(variables, term, stack, input) {
			if (term === IfExpression) {
				const [thenPart, elsePart] = variables.children.slice(-2);
				variables = variables.assign({ value: Context.of(thenPart?.computedValue(), elsePart?.computedValue()) });
			}
			if (term === List) variables = variables.assign({ value: Context.of(...variables.children.map((c) => c?.computedValue())) });
			if (term === FilterExpression) {
				const [sourcePart, _] = variables.children.slice(-2);
				variables = variables.assign({ value: sourcePart?.computedValue() });
			}
			if (term === FunctionInvocation) {
				const [name, ...args] = variables.children;
				if (name?.raw === "get value") variables = getContextValue(variables, args);
				else variables = variables.assign({ value: name?.computedValue() || Context.of(void 0) });
			}
			const start = contextStarts[term];
			if (start) return variables.enterScope(start);
			const prefixedStart = prefixedContextStarts[term];
			if (prefixedStart) {
				const { children: currentChildren, context: currentContext } = variables;
				const children = currentChildren.slice(0, -1);
				const lastChild = last(currentChildren);
				let newContext = null;
				if (term === pathExpressionStart) newContext = Context.of(lastChild?.computedValue());
				if (term === filterExpressionStart) newContext = Context.of(currentContext, lastChild?.computedValue()).set("item", lastChild?.computedValue());
				return variables.assign({ children }).enterScope(prefixedStart).pushChild(lastChild).assign({ context: newContext || currentContext });
			}
			const code = input.read(input.pos, stack.pos);
			if (contextEnds[term]) return variables.exitScope(code);
			if (term === ContextEntry) {
				const parts = variables.children.filter((c) => c.name !== "ContextEntry");
				const name = parts[0];
				const value = last(parts);
				return wrap(variables, "ContextEntry", code).assign({ value: Context.of(variables.value).set(name?.computedValue(), value?.computedValue()) });
			}
			if (term === ForInExpression || term === QuantifiedInExpression) return wrap(variables, "InExpression", code);
			if (term === forExpressionBodyStart) return variables.define("partial", ValueProducer.of((variables) => {
				return last(variables.children)?.computedValue();
			}));
			if (term === ParameterName) {
				const name = last(variables.children).computedValue();
				return variables.define(name, 1);
			}
			if (term === arithmeticPlusStart || term === arithmeticTimesStart || term === arithmeticExpStart) {
				const children = variables.children.slice(0, -1);
				const lastChild = last(variables.children);
				return variables.assign({ children }).enterScope("ArithmeticExpression").pushChild(lastChild);
			}
			if (term === arithmeticUnaryStart) return variables.enterScope("ArithmeticExpression");
			if (term === Identifier || term === AdditionalIdentifier || term === PropertyIdentifier) return variables.token(code);
			if (term === StringLiteral) return variables.literal(code.replace(/^"|"$/g, "").replace(/\\(["\\])/g, "$1"));
			if (term === BooleanLiteral) return variables.literal(code === "true" ? true : false);
			if (term === NumericLiteral) return variables.literal(parseFloat(code));
			if (term === nil) return variables.literal(null);
			if (term === VariableName) return variables.resolveName();
			if (term === Name || term === PropertyName) return variables.declareName();
			if (term === expression0 || term === PositiveUnaryTest) {
				if (variables.tokens.length > 0) throw new Error("uncleared name");
			}
			if (term === expression0) {
				let parent = variables;
				while (parent.parent) parent = parent.exitScope(code);
				return parent;
			}
			return variables;
		}
	});
}
function getContextValue(variables, args) {
	if (!args.length) return variables.assign({ value: null });
	if (args[0].name === "Name") args = extractNamedArgs(args, ["m", "key"]);
	if (args.length !== 2) return variables.assign({ value: null });
	const [context, key] = args;
	const keyValue = key?.computedValue();
	const contextValue = context?.computedValue();
	if (!contextValue || typeof contextValue !== "object" || typeof keyValue !== "string") return variables.assign({ value: null });
	return variables.assign({ value: [normalizeContextKey(keyValue), keyValue].reduce((value, keyValue) => {
		return contextValue.get(keyValue) || value;
	}, null) });
}
function extractNamedArgs(args, argNames) {
	const context = {};
	for (let i = 0; i < args.length; i += 2) {
		const [name, value] = args.slice(i, i + 2);
		context[name.value] = value;
	}
	return argNames.map((name) => context[name]);
}
function last(arr) {
	return arr[arr.length - 1];
}
var propertyIdentifier, identifier, nameIdentifier, insertSemi, expression0, ForExpression, forExpressionStart, ForInExpression, Name, Identifier, AdditionalIdentifier, forExpressionBodyStart, IfExpression, ifExpressionStart, QuantifiedExpression, quantifiedExpressionStart, QuantifiedInExpression, PositiveUnaryTest, ArithmeticExpression, arithmeticPlusStart, arithmeticTimesStart, arithmeticExpStart, arithmeticUnaryStart, VariableName, PathExpression, pathExpressionStart, FilterExpression, filterExpressionStart, FunctionInvocation, functionInvocationStart, ParameterName, nil, NumericLiteral, StringLiteral, BooleanLiteral, listStart, List, FunctionDefinition, functionDefinitionStart, Context, contextStart, ContextEntry, PropertyName, PropertyIdentifier, LOG_PARSE, LOG_PARSE_DEBUG, LOG_VARS, spaceChars, newlineChars, asterix, additionalNameChars, identifiersMap, identifiers, propertyIdentifiers, insertSemicolon, prefixedContextStarts, contextStarts, contextEnds, ValueProducer, dateTimeIdentifiers, VariableContext, Variables, variableTracker, feelHighlighting, spec_identifier, parser;
var init_dist$1 = __esmMin((() => {
	init_dist$3();
	init_dist$2();
	init_dist$4();
	propertyIdentifier = 121;
	identifier = 122;
	nameIdentifier = 123;
	insertSemi = 124;
	expression0 = 128;
	ForExpression = 4;
	forExpressionStart = 131;
	ForInExpression = 7;
	Name = 8;
	Identifier = 9;
	AdditionalIdentifier = 10;
	forExpressionBodyStart = 139;
	IfExpression = 19;
	ifExpressionStart = 140;
	QuantifiedExpression = 23;
	quantifiedExpressionStart = 141;
	QuantifiedInExpression = 27;
	PositiveUnaryTest = 37;
	ArithmeticExpression = 41;
	arithmeticPlusStart = 144;
	arithmeticTimesStart = 145;
	arithmeticExpStart = 146;
	arithmeticUnaryStart = 147;
	VariableName = 47;
	PathExpression = 68;
	pathExpressionStart = 153;
	FilterExpression = 70;
	filterExpressionStart = 154;
	FunctionInvocation = 72;
	functionInvocationStart = 155;
	ParameterName = 76;
	nil = 160;
	NumericLiteral = 79;
	StringLiteral = 80;
	BooleanLiteral = 81;
	listStart = 167;
	List = 89;
	FunctionDefinition = 90;
	functionDefinitionStart = 169;
	Context = 97;
	contextStart = 171;
	ContextEntry = 98;
	PropertyName = 100;
	PropertyIdentifier = 101;
	LOG_PARSE = typeof process != "undefined" && /\bfparse(:dbg)?\b/.test({}.LOG);
	LOG_PARSE_DEBUG = typeof process != "undefined" && /\bfparse:dbg\b/.test({}.LOG);
	LOG_VARS = typeof process != "undefined" && /\bcontext\b/.test({}.LOG);
	spaceChars = [
		9,
		11,
		12,
		32,
		133,
		160,
		5760,
		8192,
		8193,
		8194,
		8195,
		8196,
		8197,
		8198,
		8199,
		8200,
		8201,
		8202,
		8232,
		8233,
		8239,
		8287,
		12288
	];
	newlineChars = chars("\n\r");
	asterix = "*".charCodeAt(0);
	additionalNameChars = chars("'./-+*^");
	identifiersMap = {
		[identifier]: "identifier",
		[nameIdentifier]: "nameIdentifier"
	};
	identifiers = new ExternalTokenizer((input, stack) => {
		LOG_PARSE_DEBUG && console.log("%s: T <identifier | nameIdentifier>", input.pos);
		const nameMatch = parseName(input, stack.context);
		const start = stack.context.tokens;
		const match = nameMatch || parseIdentifier(input, 0, start.length > 0);
		if (match) {
			input.advance(match.offset);
			input.acceptToken(nameMatch ? nameMatch.term : identifier);
			LOG_PARSE && console.log("%s: MATCH <%s> <%s>", input.pos, nameMatch ? identifiersMap[nameMatch.term] : "identifier", match.token);
		}
	}, { contextual: true });
	propertyIdentifiers = new ExternalTokenizer((input, stack) => {
		LOG_PARSE_DEBUG && console.log("%s: T <propertyIdentifier>", input.pos);
		const start = stack.context.tokens;
		const match = parseIdentifier(input, 0, start.length > 0);
		if (match) {
			input.advance(match.offset);
			input.acceptToken(propertyIdentifier);
			LOG_PARSE && console.log("%s: MATCH <propertyIdentifier> <%s>", input.pos, match.token);
		}
	});
	insertSemicolon = new ExternalTokenizer((input, stack) => {
		LOG_PARSE_DEBUG && console.log("%s: T <insertSemi>", input.pos);
		let offset;
		let insert = false;
		for (offset = 0;; offset++) {
			const char = input.peek(offset);
			if (spaceChars.includes(char)) continue;
			if (newlineChars.includes(char)) insert = true;
			break;
		}
		if (insert) {
			const identifier = parseIdentifier(input, offset + 1);
			if (parseSpaces(input, offset + 1) || identifier && /^(then|else|return|satisfies)$/.test(identifier.token)) return;
			LOG_PARSE && console.log("%s: MATCH <insertSemi>", input.pos);
			input.acceptToken(insertSemi);
		}
	});
	prefixedContextStarts = {
		[functionInvocationStart]: "FunctionInvocation",
		[filterExpressionStart]: "FilterExpression",
		[pathExpressionStart]: "PathExpression"
	};
	contextStarts = {
		[contextStart]: "Context",
		[functionDefinitionStart]: "FunctionDefinition",
		[forExpressionStart]: "ForExpression",
		[listStart]: "List",
		[ifExpressionStart]: "IfExpression",
		[quantifiedExpressionStart]: "QuantifiedExpression"
	};
	contextEnds = {
		[Context]: "Context",
		[FunctionDefinition]: "FunctionDefinition",
		[ForExpression]: "ForExpression",
		[List]: "List",
		[IfExpression]: "IfExpression",
		[QuantifiedExpression]: "QuantifiedExpression",
		[PathExpression]: "PathExpression",
		[FunctionInvocation]: "FunctionInvocation",
		[FilterExpression]: "FilterExpression",
		[ArithmeticExpression]: "ArithmeticExpression"
	};
	ValueProducer = class ValueProducer {
		constructor(fn) {
			this.fn = fn;
		}
		get(variables) {
			return this.fn(variables);
		}
		static of(fn) {
			return new ValueProducer(fn);
		}
	};
	dateTimeIdentifiers = Object.keys({
		"date and time": 1,
		"date": 1,
		"time": 1,
		"duration": 1
	});
	VariableContext = class {
		constructor(value = {}) {
			this.value = value;
		}
		getKeys() {
			return Object.keys(this.value);
		}
		get(key) {
			const result = this.value[key];
			const constructor = this.constructor;
			if (constructor.isAtomic(result)) return result;
			return constructor.of(result);
		}
		set(key, value) {
			const constructor = this.constructor;
			return new constructor({
				...this.value,
				[key]: value
			});
		}
		merge(other) {
			const constructor = this.constructor;
			return new constructor(constructor.__merge(this.value, other));
		}
		static isAtomic(value) {
			return value === null || value === void 0 || value instanceof this || value instanceof ValueProducer || typeof value !== "object";
		}
		static of(...contexts) {
			const merged = contexts.reduce((context, otherContext) => {
				return this.__merge(context, otherContext);
			}, {});
			return new this(merged);
		}
		static __unwrap(context) {
			if (!context) return {};
			if (context instanceof this) return context.value;
			if (this.isAtomic(context)) return {};
			return context;
		}
		static __merge(context, other) {
			const merged = Object.assign({}, this.__unwrap(context));
			for (const [key, value] of Object.entries(this.__unwrap(other))) {
				if (value instanceof ValueProducer) {
					merged[key] = value;
					continue;
				}
				if (has(merged, key)) {
					merged[key] = this.__merge(merged[key], value);
					continue;
				}
				merged[key] = value;
			}
			return merged;
		}
	};
	Variables = class Variables {
		constructor({ name = "Expressions", tokens = [], children = [], parent = null, context, value, raw, __cache }) {
			this.name = name;
			this.tokens = tokens;
			this.children = children;
			this.parent = parent;
			this.context = context;
			this.value = value;
			this.raw = raw;
			this.__cache = __cache;
		}
		get root() {
			let current = this;
			while (current.parent) current = current.parent;
			return current;
		}
		get cache() {
			const root = this.root;
			if (!root.__cache) root.__cache = new WeakMap();
			return root.__cache;
		}
		enterScope(name) {
			const childScope = this.of({
				name,
				parent: this
			});
			LOG_VARS && console.log("[%s] enter", childScope.path, childScope.context);
			return childScope;
		}
		exitScope(str) {
			if (!this.parent) {
				LOG_VARS && console.log("[%s] NO exit %o\n%s", this.path, this.context, indent(str, "  "));
				return this;
			}
			LOG_VARS && console.log("[%s] exit %o\n%s", this.path, this.context, indent(str, "  "));
			return this.parent.pushChild(this);
		}
		token(part) {
			LOG_VARS && console.log("[%s] token <%s> + <%s>", this.path, this.tokens.join(" "), part);
			return this.assign({ tokens: [...this.tokens, part] });
		}
		literal(value) {
			LOG_VARS && console.log("[%s] literal %o", this.path, value);
			return this.pushChild(this.of({
				name: "Literal",
				value
			}));
		}
		computedValue() {
			for (let scope = this;; scope = last(scope.children)) {
				if (!scope) return null;
				if (!isNil(scope.value)) return scope.value;
			}
		}
		contextCache() {
			let cache = this.cache.get(this.context);
			if (!cache) {
				cache = computeContextCache(this.context);
				this.cache.set(this.context, cache);
			}
			return cache;
		}
		get path() {
			return this.parent?.path?.concat(" > ", this.name) || this.name;
		}
		get(variable) {
			const normalizedVariable = variable && normalizeContextKey(variable);
			const contextKey = this.contextCache().originalMap.get(normalizedVariable);
			if (typeof contextKey === "undefined") return;
			const val = this.context.get(contextKey);
			if (val instanceof ValueProducer) return val.get(this);
			else return val;
		}
		resolveName() {
			const variable = this.tokens.join(" ");
			const parentScope = this.assign({ tokens: [] });
			const variableScope = this.of({
				name: "VariableName",
				parent: parentScope,
				value: this.get(variable),
				raw: variable
			});
			LOG_VARS && console.log("[%s] resolve name <%s=%s>", variableScope.path, variable, this.get(variable));
			return parentScope.pushChild(variableScope);
		}
		pushChild(child) {
			if (!child) return this;
			const parent = this.assign({ children: [...this.children, child] });
			child.parent = parent;
			return parent;
		}
		pushChildren(children) {
			let parent = this;
			for (const child of children) parent = parent.pushChild(child);
			return parent;
		}
		declareName() {
			if (this.tokens.length === 0) throw Error("no tokens to declare name");
			const variableName = this.tokens.join(" ");
			LOG_VARS && console.log("[%s] declareName <%s>", this.path, variableName);
			return this.assign({ tokens: [] }).pushChild(this.of({
				name: "Name",
				value: variableName
			}));
		}
		define(name, value) {
			if (typeof name !== "string") {
				LOG_VARS && console.log("[%s] no define <%s=%s>", this.path, name, value);
				return this;
			}
			LOG_VARS && console.log("[%s] define <%s=%s>", this.path, name, value);
			const oldContext = this.context;
			const newContext = oldContext.set(name, value);
			const newCache = cacheKey(name, createContextCache(this.cache.get(oldContext) || computeContextCache(oldContext)));
			this.cache.set(newContext, newCache);
			return this.assign({ context: newContext });
		}
		assign(options = {}) {
			return Variables.of({
				...this,
				...options
			});
		}
		of(options = {}) {
			const defaultOptions = {
				context: this.context,
				parent: this.parent
			};
			return Variables.of({
				...defaultOptions,
				...options
			});
		}
		static of(options) {
			const { name, tokens = [], children = [], parent = null, context, value, raw, __cache } = options;
			if (!context) throw new Error("must provide <context>");
			return new Variables({
				name,
				tokens: [...tokens],
				children: [...children],
				context,
				parent,
				value,
				raw,
				__cache
			});
		}
	};
	variableTracker = trackVariables({});
	feelHighlighting = styleTags({
		StringLiteral: tags.string,
		NumericLiteral: tags.number,
		BooleanLiteral: tags.bool,
		"AtLiteral!": tags.special(tags.string),
		CompareOp: tags.compareOperator,
		ArithOp: tags.arithmeticOperator,
		"for if then else some every return": tags.controlKeyword,
		"in instance of and or satisfies between as": tags.operatorKeyword,
		function: tags.definitionKeyword,
		"Type/...": tags.typeName,
		"Wildcard!": tags.modifier,
		null: tags.null,
		LineComment: tags.lineComment,
		BlockComment: tags.blockComment,
		"VariableName!": tags.variableName,
		"\"?\"": tags.special(tags.variableName),
		"DateTimeConstructor! SpecialFunctionName!": tags.standard(tags.function(tags.variableName)),
		"FunctionInvocation/VariableName!": tags.function(tags.variableName),
		"Name!": tags.definition(tags.variableName),
		"Key/Name! ContextEntryType/Name!": tags.definition(tags.propertyName),
		"PathExpression/VariableName!": tags.propertyName,
		"FormalParameter/ParameterName!": tags.function(tags.definition(tags.variableName)),
		"( )": tags.paren,
		"[ ]": tags.squareBracket,
		"{ }": tags.brace,
		".": tags.derefOperator,
		", ;": tags.separator,
		"..": tags.punctuation
	});
	spec_identifier = {
		__proto__: null,
		for: 10,
		in: 32,
		return: 36,
		if: 40,
		then: 42,
		else: 44,
		some: 48,
		every: 50,
		satisfies: 56,
		or: 60,
		and: 64,
		between: 72,
		instance: 86,
		of: 89,
		days: 101,
		time: 103,
		duration: 105,
		years: 107,
		months: 109,
		date: 111,
		list: 117,
		context: 123,
		function: 130,
		null: 156,
		true: 330,
		false: 330,
		"?": 170,
		external: 186,
		not: 211
	};
	parser = LRParser.deserialize({
		version: 14,
		states: "CjO`QYOOO`QYOOO$yQYOOOOQU'#Ce'#CeO%TQYO'#C`O&^QYO'#FQOOQQ'#Fe'#FeO&hQYO'#FeO`QYO'#DVOOQU'#En'#EnO(_Q^O'#D]OOQU'#D^'#D^OOQU'#D]'#D]OOQO'#Fm'#FmO*[QWO'#DvOOQQ'#D}'#D}OOQQ'#EO'#EOOOQQ'#EP'#EPO*aOWO'#ESO*[QWO'#EQOOQQ'#EQ'#EQOOQQ'#Fs'#FsOOQQ'#Fq'#FqOOQQ'#Fy'#FyOOQQ'#EU'#EUO`QYO'#EWOOQQ'#FS'#FSO*iQ^O'#FSO,`QYO'#EXO,gQWO'#EYOOQP'#F}'#F}O,lQXO'#EaOOQQ'#Fz'#FzOOQQ'#FR'#FRQOQWOOOOQQ'#FT'#FTOOQQ'#F^'#F^O`QYO'#CoOOQQ'#F_'#F_O%TQYO'#CsO,zQYO'#DwOOQQ'#Fr'#FrO-PQYO'#EROOQO'#ER'#ERO`QYO'#EVO`QYO'#EUOOQO'#F{'#F{Q-XQWOOO-^QYO'#DRO.TQWO'#FaOOQO'#DT'#DTO.`QYO'#FeO.gQWOOO/^QYO'#CdO/kQYO'#FVOOQQ'#Cc'#CcO/pQYO'#FUOOQQ'#Cb'#CbO/xQYO,58zO`QYO,59iOOQQ'#Fb'#FbOOQQ'#Fc'#FcOOQQ'#Fd'#FdO`QYO,59qO`QYO,59qO`QYO,59qOOQQ'#Fk'#FkO/}QYO,5:^OOQQ'#Fl'#FlO`QYO,5:`O`QYO,59eO`QYO,59gO`QYO,59iO1|QYO,59iO2TQYO,59rOOQQ,5:i,5:iO2YQYO,59qOOQU-E8l-E8lO3|QYO'#FnOOQQ,5:b,5:bOOQQ,5:n,5:nOOQQ,5:l,5:lO4TQYO,5:rOOQQ,5;n,5;nO4_QYO,5:qO4lQWO,5:sO4qQYO,5:tOOQP'#Ee'#EeO5hQXO'#EdOOQO'#Ec'#EcO5oQWO'#EbO5tQWO'#GOO5|QWO,5:{O6RQYO,59ZOOQQ'#Cw'#CwO6YQYO'#F`OOQQ'#Cv'#CvO6bQYO,59_O6gQYO,5:cO6lQYO,5:mO4WQYO,5:qO6qQYO,5:pO`QYO'#EwQ-XQWOOO`QYO'#EmO7hQWO,5;{O`QYOOOOQR'#Cf'#CfOOQQ'#Ej'#EjO8bQYO,59OO`QYO,5;qOOQQ'#FY'#FYO%TQYO'#EkO8rQYO,5;pO`QYO1G.fOOQQ'#F]'#F]O9iQYO1G/TO<`QYO1G/]O<jQYO1G/]O<tQYO1G/]OOQQ1G/x1G/xO>hQYO1G/zO>oQYO1G/PO?xQYO1G/ROARQYO1G/TO`QYO1G/TOOQQ1G/T1G/TOAiQYO1G/^OBWQ^O'#CdOCjQYO'#FpOOQO'#Dz'#DzOCtQWO'#DyOCyQWO'#FoOOQO'#Dx'#DxOOQO'#D{'#D{ODRQWO,5<YOOQQ1G0^1G0^O`QYO1G0]O`QYO'#EsODWQWO,5<[OOQQ1G0_1G0_ODcQWO'#E[ODnQWO'#F|OOQO'#EZ'#EZODvQWO1G0`OOQP'#Eu'#EuOD{QXO,5;OO`QYO,5:|OESQXO'#EvOE_QWO,5<jOOQQ1G0g1G0gO`QYO1G.uO%TQYO'#ElOEgQYO,5;zO`QYO1G.yOEoQYO1G/}OOQO1G0X1G0XOOQO,5;c,5;cOOQO-E8u-E8uOOQO,5;X,5;XOOQO-E8k-E8kOEtQWOOOOQQ-E8h-E8hOEyQYO'#CmOOQQ1G1]1G1]OOQQ,5;V,5;VOOQQ-E8i-E8iOFZQYO7+$QOOQQ7+%f7+%fO`QYO7+$oOGQQYO,5:rOG_QWO7+$oOGdQYO'#D[OOQQ'#DZ'#DZOIWQYO'#D_OI]QYO'#D_OIbQYO'#D_OIgQ`O'#DgOIlQ`O'#DjOIqQ`O'#DnOOQQ7+$x7+$xO`QYO,5:eO%TQYO'#ErOIvQWO,5<ZOOQQ1G1t1G1tOJ|QYO7+%wOKZQYO,5;_OOQO-E8q-E8qOAiQYO,5:vO%TQYO'#EtOKhQWO,5<hOKpQYO7+%zOOQP-E8s-E8sOKwQYO1G0hOOQO,5;b,5;bOOQO-E8t-E8tOLRQYO7+$aOOQQ,5;W,5;WOOQQ-E8j-E8jOLYQYO7+$eOOQO7+%i7+%iO`QYO,59XOMPQYO<<HZOOQQ<<HZ<<HZO/}QYO'#EoONYQYO,59vO! |QYO,59yO!!RQYO,59yO!!WQYO,59yO!!]QYO,5:RO%TQYO,5:UO!!zQbO,5:YO!#RQYO1G0POOQO,5;^,5;^OOQO-E8p-E8pO!#]QYO<<IcOOQQ<<Ic<<IcOOQO1G0b1G0bOOQO,5;`,5;`OOQO-E8r-E8rO!&_QYO'#E^OOQQ<<If<<IfO`QYO<<IfO`QYO<<G{O!'UQYO1G.sOOQQ,5;Z,5;ZOOQQ-E8m-E8mO!'cQYO1G/eOOQQ1G/e1G/eO!'hQbO'#D]O!'yQ`O'#D[O!(UQ`O1G/mO!(ZQWO'#DmO!(`Q`O'#FgOOQO'#Dl'#DlO!(hQ`O1G/pOOQO'#Dq'#DqO!(mQ`O'#FiOOQO'#Dp'#DpO!(uQ`O1G/tOOQQAN?QAN?QO!(zQYOAN=gOOQQ7+%P7+%PO!)qQ`O,59vOOQQ7+%X7+%XO!!]QYO,5:XO%TQYO'#EpO!)|Q`O,5<ROOQQ7+%[7+%[O!!]QYO'#EqO!*UQ`O,5<TO!*^Q`O7+%`OOQO1G/s1G/sOOQO,5;[,5;[OOQO-E8n-E8nOOQO,5;],5;]OOQO-E8o-E8oOAiQYO<<HzOOQQAN>fAN>fO/}QYO'#EoO!!]QYO<<HzO!*cQ`O7+%`O!*hQ`O1G/tO!!zQbO,5:YO!*mQ`O'#Dn",
		stateData: "!+Q~O#rOS#sOSPOSQOS~OTsOZVO[UOdtOhvOivOr}Os}OviO!T{O!U{O!VxO!XzO!c!OO!g|O!igO!pyO!wjO#SnO#nRO#oRO$YZO$h_O$i`O$j`O$kaO$lbO~OTsO[UOdtOhvOivOr}Os}OviO!T{O!U{O!VxO!XzO!c!OO!g|O!igO!pyO!wjO#SnO#nRO#oRO$YZO$h_O$i`O$j`O$kaO$lbO~OZ!TO#]!UO~P#VO#nRO#oRO~OZ!^O[!^O]!_O^!_O_!`O`!kOn!hOp!iOr!]Os!]Ot!jO{!lO!i!fO#z!dOv$aX~O#l#tX$s#tX~P%]O$h!mOT$XXZ$XX[$XXd$XXh$XXi$XXr$XXs$XXv$XX!T$XX!U$XX!V$XX!X$XX!c$XX!g$XX!i$XX!p$XX!w$XX#S$XX#n$XX#o$XX$Y$XX$i$XX$j$XX$k$XX$l$XX~O#nRO#oROZ!PX[!PX]!PX^!PX_!PX`!PXn!PXp!PXr!PXs!PXt!PXv!PX{!PX!i!PX#l!PX#p!PX#z!PX$s!PX$O!PXx!PX#}!PX!g!PXe!PXb!PX#R!PXf!PXl!PX~Ov!pO~O$i`O$j`O~O#p!uOZ#vX[#vX]#vX^#vX_#vX`#vXn#vXp#vXr#vXs#vXt#vXv#vX{#vX!i#vX#l#vX#z#vX$s#vX$O#vXx#vX#}#vX!g#vXe#vXb#vX#R#vXf#vXl#vX~O!g$dP~P`Ov!xO~O#m!yO$i`O$j`O#R$rP~Op#UO~Op#VOv!uX~O$s#YO~O#luX$OuX$suXxuX#}uX!guXeuXbuX#RuXfuXluX~P%]O$O#[O#l$TXx$TX~O#l#[X~P&hOv#^O~OZ#_O[#_O]#_O^#_O_#_O#nRO#oRO#z#_O#{#_O$[WX~O`WXxWX$OWX~P.lO`#cO~O$O#dOb#xX~Ob#gO~O#nRO#oRO$YZO~OTsOZVO[UOdtOhvOivOr}Os}O!T{O!U{O!VxO!XzO!c!OO!g|O!igO!pyO!wjO#SnO#nRO#oRO$YZO$h_O$i`O$j`O$kaO$lbO~Ov#qO~P0YO|#sO~O{!lO!i!fO#z!dOZya[ya]ya^ya_ya`yanyapyaryasyatyav$aX#lya$sya$Oyaxya#}ya!gyaeyabya#Ryafyalya~Ox$dP~P`Ox#|O#}#}O~P%]O#}#}O$O$OO!g$dX~P%]O!g$QO~O#nRO#oROx$pP~OZ#_O[#_O]#_O^#_O_#_O#m!yO#z#_O#{#_O~O$[#WX~P4|O$[$XO~O$O$YO#R$rX~O#R$[O~Oe$]O~P%]O$O$^Ol$SX~Ol$`O~O!W$aO~O!T$bO~O#l!xa$s!xa$O!xax!xa#}!xa!g!xae!xab!xa#R!xaf!xal!xa~P%]O$O#[O#l$Tax$Ta~OZ#_O[#_O]#_O^#_O_#_O#nRO#oRO#z#_O#{#_O~O`Wa$[WaxWa$OWa~P7sO$O#dOb#xa~OZ!^O[!^O]!_O^!_O_!`O{!lO!i!fO#z!dOv$aX~O`qinqipqirqisqitqi#lqi$sqi$Oqixqi#}qi!gqieqibqi#Rqifqilqi~P8zO_!`O{!lO!i!fO#z!dOZyi[yi`yinyipyiryisyityiv$aX#lyi$syi$Oyixyi#}yi!gyieyibyi#Ryifyilyi~O]!_O^!_O~P:rO]yi^yi~P:rO{!lO!i!fO#z!dOZyi[yi]yi^yi_yi`yinyipyiryisyityiv$aX#lyi$syi$Oyixyi#}yi!gyieyibyi#Ryifyilyi~O!g$nO~P%]O`!kOp!iOr!]Os!]Ot!jOnmi#lmi$smi$Omixmi#}mi!gmiemibmi#Rmifmilmi~P8zO`!kOr!]Os!]Ot!jOnoipoi#loi$soi$Ooixoi#}oi!goieoiboi#Roifoiloi~P8zO`!kOn!hOp$oOr!]Os!]Ot!jO~P8zO!S$tO!V$uO!X$vO![$wO!_$xO!c$yO#nRO#oRO$YZO~OZ#bX[#bX]#bX^#bX_#bX`#bXn#bXp#bXr#bXs#bXt#bXv#bXx#bX{#bX!i#bX#n#bX#o#bX#p#bX#z#bX$O#bX~P.lO$O$OOx$dX~P%]O$[${O~O$O$|Ox$cX~Ox%OO~O$O$OO!g$dax$da~O$[%SOx#OX$O#OX~O$O%TOx$pX~Ox%VO~O$[#Wa~P4|O#m!yO$i`O$j`O~O$O$YO#R$ra~O$O$^Ol$Sa~O!U%`O~OxrO~O#}%aObaX$OaXlaX~P%]O#lSq$sSq$OSqxSq#}Sq!gSqeSqbSq#RSqfSqlSq~P%]Ox#|O#}#}O$OuX~P%]Ox%cO~O#z%dOZ!OX[!OX]!OX^!OX_!OX`!OXn!OXp!OXr!OXs!OXt!OXv!OX{!OX!i!OX#l!OX$s!OX$O!OXx!OX#}!OX!g!OXe!OXb!OX#R!OXf!OXl!OX~Op%fO~Op%gO~Op%hO~O!]%iO~O!]%jO~O!]%kO~O$O$|Ox$ca~OZ!^O[!^O]!_O^!_O_!`O`!kOn!hOp!iOr!]Os!]Ot!jO{!lO#z!dOv$aX~Ox%pO!g%pO!i%oO~PJOO!g#ga$O#gax#ga~P%]O$O%TOx$pa~O#P%vO~P`O#R#Ui$O#Ui~P%]Of%wO~P%]O#lgq$sgq$Ogqxgq#}gq!ggqegqbgq#Rgqfgqlgq~P%]O`qynqypqyrqysqytqy#lqy$sqy$Oqyxqy#}qy!gqyeqybqy#Rqyfqylqy~P8zO#z%dOZ!Oa[!Oa]!Oa^!Oa_!Oa`!Oan!Oap!Oar!Oas!Oat!Oav!Oa{!Oa!i!Oa#l!Oa$s!Oa$O!Oax!Oa#}!Oa!g!Oae!Oab!Oa#R!Oaf!Oal!Oa~O!T%{O~O!W%{O~O!T%|O~O!S$tO!V$uO!X$vO![$wO!_$xO!c&rO#nRO#oRO$YZO~O!Y$]P~P!!]Ox!mi$O!mi~P%]OT$`XZ$`X[$`X]!yy^!yy_!yy`!yyd$`Xh$`Xi$`Xn!yyp!yyr$`Xs$`Xt!yyv$`X{!yy!T$`X!U$`X!V$`X!X$`X!c$`X!g$`X!i$`X!p$`X!w$`X#S$`X#l!yy#n$`X#o$`X#z!yy$Y$`X$h$`X$i$`X$j$`X$k$`X$l$`X$s!yy$O!yyx!yy#}!yye!yyb!yy#R!yyf!yyl!yy~O#l#QX$s#QX$O#QXx#QX#}#QX!g#QXe#QXb#QX#R#QXf#QXl#QX~P%]Obai$Oailai~P%]O!U&[O~O#nRO#oRO!Y!PX#z!PX$O!PX~O#z&mO!Y!OX$O!OX~O!Y&^O~O$[&_O~O$O&`O!Y$ZX~O!Y&bO~O$O&cO!Y$]X~O!Y&eO~O#lc!R$sc!R$Oc!Rxc!R#}c!R!gc!Rec!Rbc!R#Rc!Rfc!Rlc!R~P%]O#z&mO!Y!Oa$O!Oa~O$O&`O!Y$Za~O$O&cO!Y$]a~O$^&kO~O$^&nO~O!Y&oO~O!]&qO~O$Y$i~$i$j_^$h#zQP]Q~",
		goto: "EX$sPPPP$tP%l%o%u&V'oPPPPPP'xP$tPPP$tPP'{(OP$tP$tP$tPPP(UP(aP$t$tPP(j)P)[*h)PPPPPPPP)PPP)PP+l+o)PP+u+{$tP$tP$t,S,z,}-T,zP-].T-]-]/S/zP$t0r$t1j1j2b2eP2kPP1j2q2w/O2{PP3TP3W3_3e3k3q4{5V5]5c5i5p5v5|6SPPPPPPPP6Y6c8g9_:V:YPP:bPP:e:h;`<W<Z<`<|=k>ZP?RP?UP?Y?z@lAdAjAm$tAsAsPPPPPBk8gCcDZD^EU!kjOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%wR![SQ!YSR$k#dW!WSw#d$^W#v!p!x$|%TT&Q%j&`#UXOPQWYilu|}!]!a!b!c!e!g!h!i!j!k#Y#[#^#b#f#q#s#}$O$X$]$`$o${%S%V%a%d%i%k%v%w%}&_&c&k&m&n&qb!VSw!x#d$^$|%T%j&`U#`!V#a#tR#t!pU#`!V#a#tT$V!z$WR$j#bR#TwQ#RwR%]$^U!RQ#^#qQ#r!kR$e#[QrQQ$g#^R$q#qQ$z#sQ%q%SQ&P%iU&U%k&c&qQ&f&_T&l&k&nc$s#s%S%i%k&_&c&k&n&q!jkOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%wQ#l!eU$r#s%S&kS%y%d&m]&O%i%k&_&c&n&q#T[OPQWilu|}!]!a!b!c!e!g!h!i!j!k!p#Y#[#^#b#f#q#s#}$O$X$]$`$o${%S%V%a%d%i%k%v%w&_&c&k&m&n&qR&T%jQ&R%jR&g&`Q&X%kR&p&qS&V%k&qR&i&c!k]OPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%wR#{!pQ#x!pR%m$|S#w!p$|T$R!x%T!keOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%w!jeOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%wQ!rbT!{o$Y!kcOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%w!kdOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%w!khOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%w!kpOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%wR$U!xQ$S!xR%r%TQ%u%VR&Y%vQ!}oR%Y$YT!|o$YS!zo$YT$V!z$WRrQS#a!V#tR$h#aQ#e!YR$l#eQ$_#RR%^$_Q#]!RR$f#]!tYOPQWilu|}!]!a!b!c!e!g!h!i!j!k!p#Y#[#^#b#f#q#s#}$O$X$]$`$o${%S%V%a%d%v%w&kS!oY%}_%}%i%k&_&c&m&n&qQ%e$rS%z%e&]R&]&OQ&a&RR&h&aQ&d&VR&j&dQ$}#xR%n$}S$P!v#uR%R$PQ%U$SR%s%UQ$W!zR%W$WQ$Z!}R%Z$ZQ#Z!PR$d#ZQrOQ!PPR$c#YUTOP#YW!QQ!k#[#^Q!nWQ!tiQ!vlQ#PuQ#W|Q#X}Q#h!]Q#i!aQ#j!bQ#k!cQ#m!gQ#n!hQ#o!iQ#p!jQ#u!pQ$i#bQ$m#fQ$p#qQ%P#}Q%Q$OQ%X$XQ%[$]Q%_$`Q%b$oQ%l${S%t%V%vQ%x%aR&Z%w!kqOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%w!kSOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%wR!ZSS!XS#dT#Qw$^R#b!WR#f![!kuOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%w!kwOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%wR#SwV!SQ#^#q!V!aT!Q!t!v#P#W#X#h#m#n#o#p#u$i$m$p%P%Q%X%[%_%b%l%t%x&Z!X!bT!Q!t!v#P#W#X#h#i#m#n#o#p#u$i$m$p%P%Q%X%[%_%b%l%t%x&Z!Z!cT!Q!t!v#P#W#X#h#i#j#m#n#o#p#u$i$m$p%P%Q%X%[%_%b%l%t%x&Z!kWOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%wR&S%jT&W%k&q!_!eT!Q!n!t!v#P#W#X#h#i#j#k#m#n#o#p#u$i$m$p%P%Q%X%[%_%b%l%t%x&Z!_!gT!Q!n!t!v#P#W#X#h#i#j#k#m#n#o#p#u$i$m$p%P%Q%X%[%_%b%l%t%x&Z!k^OPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%wQ!q^R!scR#y!pQ!wlR#z!p!kfOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%w!klOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%w!kmOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%wR$T!x!koOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#q#}$O$X$]$`$o${%V%a%v%wR#Oo",
		nodeNames: "⚠ LineComment BlockComment Expression ForExpression for InExpressions InExpression Name Identifier Identifier ArithOp ArithOp ArithOp ArithOp ArithOp in IterationContext return IfExpression if then else QuantifiedExpression some every InExpressions InExpression satisfies Disjunction or Conjunction and Comparison CompareOp CompareOp between PositiveUnaryTest ( PositiveUnaryTests ) ArithmeticExpression InstanceOfExpression instance of Type QualifiedName VariableName BacktickIdentifier SpecialType days time duration years months date > ListType list < ContextType context ContextEntryTypes ContextEntryType FunctionType function ArgumentTypes ArgumentType PathExpression ] FilterExpression [ FunctionInvocation SpecialFunctionName NamedParameters NamedParameter ParameterName PositionalParameters null NumericLiteral StringLiteral BooleanLiteral DateTimeLiteral DateTimeConstructor AtLiteral ? SimplePositiveUnaryTest Interval ParenthesizedExpression List FunctionDefinition FormalParameters FormalParameter external FunctionBody } { Context ContextEntry Key Name Identifier Expressions UnaryTests Wildcard not",
		maxTerm: 173,
		context: variableTracker,
		nodeProps: [
			[
				"group",
				-17,
				4,
				19,
				23,
				29,
				31,
				33,
				41,
				42,
				68,
				70,
				72,
				85,
				86,
				88,
				89,
				90,
				97,
				"Expr",
				47,
				"Expr Expr",
				-5,
				78,
				79,
				80,
				81,
				82,
				"Expr Literal"
			],
			[
				"closedBy",
				38,
				")",
				71,
				"]",
				96,
				"}"
			],
			[
				"openedBy",
				40,
				"(",
				69,
				"[",
				95,
				"{"
			]
		],
		propSources: [feelHighlighting],
		skippedNodes: [
			0,
			1,
			2
		],
		repeatNodeCount: 14,
		tokenData: ".v~RvXY#iYZ$^Z[#i]^$^pq#iqr$crs$nwx(Wxy(]yz(bz{(g{|(t|}(y}!O)O!O!P)]!P!Q*g!Q![,b![!],y!]!^-O!^!_-T!_!`$i!`!a-d!b!c-n!}#O-s#P#Q-x#Q#R(o#S#T-}#o#p.l#q#r.q$f$g#i#BY#BZ#i$IS$I_#i$I|$I}$^$I}$JO$^$JT$JU#i$KV$KW#i&FU&FV#i?HT?HU#i~#nY#r~XY#iZ[#ipq#i$f$g#i#BY#BZ#i$IS$I_#i$JT$JU#i$KV$KW#i&FU&FV#i?HT?HU#i~$cO#s~~$fP!_!`$i~$nOr~~$qXOY$nYZ%^Zr$nrs&zs#O$n#O#P'R#P;'S$n;'S;=`(Q<%lO$n~%aVOr%^rs%vs#O%^#O#P%{#P;'S%^;'S;=`&t<%lO%^~%{O$i~~&ORO;'S%^;'S;=`&X;=`O%^~&[WOr%^rs%vs#O%^#O#P%{#P;'S%^;'S;=`&t;=`<%l%^<%lO%^~&wP;=`<%l%^~'RO$i~$j~~'URO;'S$n;'S;=`'_;=`O$n~'bYOY$nYZ%^Zr$nrs&zs#O$n#O#P'R#P;'S$n;'S;=`(Q;=`<%l$n<%lO$n~(TP;=`<%l$n~(]O#{~~(bOv~~(gOx~~(lP^~z{(o~(tO_~~(yO[~~)OO$O~R)TPZP!`!a)WQ)]O$^Q~)bQ#z~!O!P)h!Q![)m~)mO#}~~)rR$h~!Q![)m!g!h){#X#Y){~*OR{|*X}!O*X!Q![*_~*[P!Q![*_~*dP$h~!Q![*_~*lQ]~z{*r!P!Q+y~*uTOz*rz{+U{;'S*r;'S;=`+s<%lO*r~+XVOz*rz{+U{!P*r!P!Q+n!Q;'S*r;'S;=`+s<%lO*r~+sOQ~~+vP;=`<%l*r~,OSP~OY+yZ;'S+y;'S;=`,[<%lO+y~,_P;=`<%l+y~,gS$h~!O!P,s!Q![,b!g!h){#X#Y){~,vP!Q![)m~-OO$[~~-TO$s~R-[P!]QsP!_!`-_P-dOsPR-kP!YQsP!_!`-_~-sO$l~~-xO!i~~-}O!g~~.QTO#S-}#S#T.a#T;'S-};'S;=`.f<%lO-}~.fO$Y~~.iP;=`<%l-}~.qO#S~~.vO#R~",
		tokenizers: [
			propertyIdentifiers,
			identifiers,
			insertSemicolon,
			0,
			1
		],
		topRules: {
			"Expression": [0, 3],
			"Expressions": [1, 102],
			"UnaryTests": [2, 103]
		},
		dialects: { camunda: 2564 },
		dynamicPrecedences: {
			"31": -1,
			"68": 1,
			"72": -1,
			"74": -1
		},
		specialized: [{
			term: 122,
			get: (value) => spec_identifier[value] || -1
		}],
		tokenPrec: 2567
	});
}));
//#endregion
//#region ../../node_modules/@bpmn-io/feel-analyzer/dist/index.js
var dist_exports = __exportAll({ FeelAnalyzer: () => FeelAnalyzer });
function stripBackticks(text) {
	return text.replace(/^`|`$/g, "");
}
function nodeText(node, source) {
	return stripBackticks(source.substring(node.from, node.to));
}
function isInScope(varName, scopes) {
	return scopes.some((scope) => scope.has(varName));
}
function withScope(scopes, initialNames, fn) {
	const scope = new Set(initialNames);
	scopes.push(scope);
	const result = fn(scope);
	scopes.pop();
	return result;
}
function forEachChild(node, callback) {
	let child = node.firstChild;
	while (child) {
		callback(child);
		child = child.nextSibling;
	}
}
function collectPathParts(node, source) {
	const parts = [];
	forEachChild(node, (child) => {
		if (child.name === "PathExpression") parts.push(...collectPathParts(child, source));
		else if (child.name === "VariableName") parts.push(nodeText(child, source));
	});
	return parts;
}
function hasContextBase(node) {
	const firstChild = node.firstChild;
	if (!firstChild) return false;
	if (firstChild.name === "Context") return true;
	if (firstChild.name === "PathExpression") return hasContextBase(firstChild);
	return false;
}
function extractContextKeys(contextNode, source) {
	const keys = [];
	forEachChild(contextNode, (child) => {
		if (child.name === "ContextEntry") {
			const keyName = child.getChild("Key")?.getChild("Name");
			if (keyName) keys.push(nodeText(keyName, source));
		}
	});
	return keys;
}
function collectIterationVariables(node, source) {
	const vars = [];
	const inExpressions = node.getChild("InExpressions");
	if (inExpressions) forEachChild(inExpressions, (child) => {
		if (child.name === "InExpression") {
			const id = child.getChild("Name")?.getChild("Identifier");
			if (id) vars.push(source.substring(id.from, id.to));
		}
	});
	return vars;
}
function collectFunctionParameters(node, source) {
	const params = [];
	const formalParams = node.getChild("FormalParameters");
	if (formalParams) forEachChild(formalParams, (child) => {
		if (child.name === "FormalParameter") {
			const id = child.getChild("ParameterName")?.getChild("Name")?.getChild("Identifier");
			if (id) params.push(source.substring(id.from, id.to));
		}
	});
	return params;
}
function findVariable(variables, name) {
	return variables.find((v) => v.name === name);
}
function findOrCreateVariable(variables, name) {
	let variable = findVariable(variables, name);
	if (!variable) {
		variable = { name };
		variables.push(variable);
	}
	return variable;
}
function buildNestedEntries(variables, pathParts) {
	const rootVar = findOrCreateVariable(variables, pathParts[0]);
	if (pathParts.length <= 1) return;
	if (!rootVar.type) {
		rootVar.type = "Context";
		rootVar.entries = rootVar.entries || [];
	}
	if (rootVar.type !== "Context") return;
	let currentLevel = rootVar.entries;
	for (let i = 1; i < pathParts.length; i++) {
		const part = pathParts[i];
		const isLast = i === pathParts.length - 1;
		let entry = findVariable(currentLevel, part);
		if (!entry) {
			entry = isLast ? { name: part } : {
				name: part,
				type: "Context",
				entries: []
			};
			currentLevel.push(entry);
		} else if (!isLast && !entry.type) {
			entry.type = "Context";
			entry.entries = entry.entries || [];
		}
		if (!isLast) {
			entry.entries = entry.entries || [];
			currentLevel = entry.entries;
		}
	}
}
function sortEntries(variable) {
	if (variable.entries) {
		variable.entries.sort((a, b) => a.name.localeCompare(b.name));
		for (const entry of variable.entries) sortEntries(entry);
	}
}
function extractInputNames(node, source, builtinNames) {
	const inputs = new Set();
	const localScopes = [new Set()];
	function isExternal(name, filterCtx) {
		return !isInScope(name, localScopes) && !builtinNames.has(name) && !(filterCtx !== "none" && name === "item");
	}
	const collectInputs = (node, filterCtx = "none") => {
		const { name: nodeName } = node;
		if (node.type.isError) return;
		if (nodeName === "FunctionInvocation") {
			const funcNameNode = node.getChild("VariableName");
			if (funcNameNode) {
				const funcName = nodeText(funcNameNode, source);
				if (isExternal(funcName, filterCtx)) inputs.add(funcName);
			}
			forEachChild(node, (child) => {
				if (child.name !== "VariableName" && child.name !== "(" && child.name !== ")") collectInputs(child, filterCtx);
			});
			return;
		}
		if (nodeName === "PathExpression") {
			if (hasContextBase(node)) forEachChild(node, (child) => collectInputs(child, filterCtx));
			else {
				const pathParts = collectPathParts(node, source);
				if (pathParts.length > 0 && isExternal(pathParts[0], filterCtx)) inputs.add(pathParts.join("."));
			}
			return;
		}
		if (nodeName === "VariableName" && node.parent?.name !== "PathExpression" && node.parent?.name !== "FunctionInvocation") {
			const varName = nodeText(node, source);
			const isImplicitFilterProp = filterCtx === "variable-list" && varName !== "item";
			if (isExternal(varName, filterCtx) && !isImplicitFilterProp) inputs.add(varName);
			return;
		}
		if (nodeName === "Context" && node.parent?.name !== "List") {
			withScope(localScopes, [], (scope) => {
				forEachChild(node, (child) => {
					if (child.name === "ContextEntry") {
						forEachChild(child, (entryChild) => {
							if (entryChild.name !== "Key") collectInputs(entryChild, filterCtx);
						});
						const keyName = child.getChild("Key")?.getChild("Name");
						if (keyName) scope.add(nodeText(keyName, source));
					}
				});
			});
			return;
		}
		if (nodeName === "FilterExpression") {
			let newFilterCtx = "none";
			const scopeNames = ["item"];
			const listNode = node.getChild("List");
			if (listNode) {
				forEachChild(listNode, (child) => {
					if (child.name === "Context") scopeNames.push(...extractContextKeys(child, source));
				});
				newFilterCtx = "list-literal";
			} else forEachChild(node, (child) => {
				if (child.name === "VariableName") {
					collectInputs(child, "none");
					newFilterCtx = "variable-list";
				}
			});
			withScope(localScopes, scopeNames, () => {
				forEachChild(node, (child) => {
					if (child.name === "Comparison" || child.name === "Expression") collectInputs(child, newFilterCtx);
				});
			});
			return;
		}
		if (nodeName === "ForExpression" || nodeName === "QuantifiedExpression") {
			const iterVars = collectIterationVariables(node, source);
			const inExp = node.getChild("InExpressions");
			if (inExp) forEachChild(inExp, (child) => {
				if (child.name === "InExpression") forEachChild(child, (innerChild) => {
					if (innerChild.name !== "Name" && innerChild.name !== "in" && innerChild.name !== "Identifier") collectInputs(innerChild, filterCtx);
				});
			});
			withScope(localScopes, iterVars, () => {
				forEachChild(node, (child) => {
					if (!ITERATION_KEYWORDS$1.has(child.name)) collectInputs(child, "none");
				});
			});
			return;
		}
		if (nodeName === "FunctionDefinition") {
			const params = collectFunctionParameters(node, source);
			withScope(localScopes, params, () => {
				const body = node.getChild("FunctionBody");
				if (body) collectInputs(body, "none");
			});
			return;
		}
		forEachChild(node, (child) => collectInputs(child, filterCtx));
	};
	collectInputs(node);
	return Array.from(inputs).sort();
}
function initializeInputVariables(collectedInputs) {
	const variables = [];
	for (const input of collectedInputs) buildNestedEntries(variables, input.split("."));
	return variables;
}
function checkLiteralsInNode(node) {
	let hasString = false;
	let hasNumber = false;
	forEachChild(node, (child) => {
		if (child.name === "StringLiteral") hasString = true;
		else if (child.name === "NumericLiteral") hasNumber = true;
		else if (child.name === "ArithmeticExpression") {
			const nested = checkLiteralsInNode(child);
			hasString = hasString || nested.hasString;
			hasNumber = hasNumber || nested.hasNumber;
		}
	});
	return {
		hasString,
		hasNumber
	};
}
function inferTypeForVariablesInNode(node, source, inputs, localScopes, inferredType) {
	if (node.name === "VariableName" && node.parent?.name !== "PathExpression") {
		const varName = nodeText(node, source);
		const variable = findVariable(inputs, varName);
		if (!isInScope(varName, localScopes) && variable && !variable.type) variable.type = inferredType;
	} else if (node.name === "PathExpression") {
		const pathParts = collectPathParts(node, source);
		if (pathParts.length > 0) {
			const rootVar = pathParts[0];
			const variable = findVariable(inputs, rootVar);
			if (!isInScope(rootVar, localScopes) && variable && !variable.type) variable.type = inferredType;
		}
	} else forEachChild(node, (child) => {
		inferTypeForVariablesInNode(child, source, inputs, localScopes, inferredType);
	});
}
function trackFilterItemProperties(node, source, listVarName, inputs, localScopes) {
	const listVar = listVarName ? findVariable(inputs, listVarName) : null;
	if (!listVar) return;
	const visit = (node) => {
		if (listVar.type !== "List") return;
		if (node.name === "PathExpression") {
			const pathParts = [];
			forEachChild(node, (child) => {
				if (child.name === "VariableName") pathParts.push(nodeText(child, source));
			});
			if (pathParts.length > 1 && pathParts[0] === "item") {
				const entries = listVar.entries || [];
				for (let i = 1; i < pathParts.length; i++) if (!findVariable(entries, pathParts[i])) entries.push({ name: pathParts[i] });
				listVar.entries = entries;
			}
		} else if (node.name === "VariableName") {
			const varName = nodeText(node, source);
			if (!isInScope(varName, localScopes) && varName !== "item" && node.parent?.name !== "PathExpression") {
				const entries = listVar.entries || [];
				if (!findVariable(entries, varName)) entries.push({ name: varName });
				listVar.entries = entries;
			}
		}
		forEachChild(node, visit);
	};
	visit(node);
}
function inferTypeFromComparison(varNode, literalNode, source, inputs, localScopes) {
	if (varNode.name !== "VariableName") return;
	const varName = nodeText(varNode, source);
	const variable = findVariable(inputs, varName);
	if (isInScope(varName, localScopes) || !variable) return;
	if (variable.type) return;
	const inferred = {
		NumericLiteral: "Number",
		StringLiteral: "String",
		BooleanLiteral: "Boolean"
	}[literalNode.name];
	if (inferred) variable.type = inferred;
}
function inferTypes(node, source, inputs, localScopes, filterCtx = "none") {
	const { name: nodeName } = node;
	if (nodeName === "PathExpression") {
		const first = node.firstChild;
		if (first?.name === "Context" || first?.name === "PathExpression") {
			inferTypes(first, source, inputs, localScopes, filterCtx);
			return;
		}
		const pathParts = collectPathParts(node, source);
		if (pathParts.length > 0) {
			const rootVar = pathParts[0];
			if (!isInScope(rootVar, localScopes) && !(filterCtx !== "none" && rootVar === "item") && findVariable(inputs, rootVar)) buildNestedEntries(inputs, pathParts);
		}
		return;
	}
	if (nodeName === "Context" && node.parent?.name !== "List") {
		withScope(localScopes, [], (scope) => {
			forEachChild(node, (child) => {
				if (child.name === "ContextEntry") {
					forEachChild(child, (innerChild) => {
						if (innerChild.name !== "Key") inferTypes(innerChild, source, inputs, localScopes, filterCtx);
					});
					const keyName = child.getChild("Key")?.getChild("Name");
					if (keyName) scope.add(nodeText(keyName, source));
				}
			});
		});
		return;
	}
	if (nodeName === "FilterExpression") {
		let newFilterCtx = "none";
		let listVarName = null;
		const scopeNames = ["item"];
		const listNode = node.getChild("List");
		if (listNode) {
			forEachChild(listNode, (child) => {
				if (child.name === "Context") scopeNames.push(...extractContextKeys(child, source));
			});
			newFilterCtx = "list-literal";
		} else forEachChild(node, (child) => {
			if (child.name === "VariableName") {
				listVarName = nodeText(child, source);
				const variable = findVariable(inputs, listVarName);
				if (!isInScope(listVarName, localScopes) && variable) {
					if (!variable.type) variable.type = "List";
				}
				newFilterCtx = "variable-list";
			}
		});
		withScope(localScopes, scopeNames, () => {
			forEachChild(node, (child) => {
				if (child.name === "Comparison" || child.name === "Expression") {
					trackFilterItemProperties(child, source, listVarName, inputs, localScopes);
					inferTypes(child, source, inputs, localScopes, newFilterCtx);
				}
			});
		});
		return;
	}
	if (nodeName === "Comparison") {
		const operands = [];
		forEachChild(node, (child) => {
			if (child.name !== "CompareOp") operands.push(child);
		});
		if (operands.length === 2) {
			inferTypeFromComparison(operands[0], operands[1], source, inputs, localScopes);
			inferTypeFromComparison(operands[1], operands[0], source, inputs, localScopes);
		}
	}
	if (nodeName === "ArithmeticExpression") {
		const { hasString, hasNumber } = checkLiteralsInNode(node);
		const inferredType = hasString && !hasNumber ? "String" : !hasString && hasNumber ? "Number" : null;
		if (inferredType) inferTypeForVariablesInNode(node, source, inputs, localScopes, inferredType);
		forEachChild(node, (child) => {
			if (![
				"ArithmeticExpression",
				"ArithOp",
				"NumericLiteral",
				"StringLiteral"
			].includes(child.name)) inferTypes(child, source, inputs, localScopes, filterCtx);
		});
		return;
	}
	if (nodeName === "ForExpression" || nodeName === "QuantifiedExpression") {
		const iterVars = collectIterationVariables(node, source);
		const inExp = node.getChild("InExpressions");
		if (inExp) forEachChild(inExp, (child) => {
			if (child.name === "InExpression") forEachChild(child, (innerChild) => {
				if (![
					"Name",
					"in",
					"Identifier"
				].includes(innerChild.name)) inferTypes(innerChild, source, inputs, localScopes, filterCtx);
			});
		});
		withScope(localScopes, iterVars, () => {
			forEachChild(node, (child) => {
				if (!ITERATION_KEYWORDS$1.has(child.name)) inferTypes(child, source, inputs, localScopes, "none");
			});
		});
		return;
	}
	if (nodeName === "FunctionDefinition") {
		withScope(localScopes, collectFunctionParameters(node, source), () => {
			const body = node.getChild("FunctionBody");
			if (body) inferTypes(body, source, inputs, localScopes, "none");
		});
		return;
	}
	forEachChild(node, (child) => {
		inferTypes(child, source, inputs, localScopes, filterCtx);
	});
}
function analyzeForInputs(node, source, builtinNames) {
	const inputs = initializeInputVariables(extractInputNames(node, source, builtinNames));
	inferTypes(node, source, inputs, [new Set()]);
	for (const variable of inputs) sortEntries(variable);
	inputs.sort((a, b) => a.name.localeCompare(b.name));
	return inputs;
}
function analyzeForFunctions(node, source, builtinNames) {
	const functions = new Map();
	const scopes = [];
	const recordInvocation = (funcNameNode) => {
		const name = nodeText(funcNameNode, source);
		const type = !isInScope(name, scopes) && builtinNames.has(name) ? "builtin" : "user";
		const existing = functions.get(name);
		if (!existing) {
			functions.set(name, {
				name,
				type
			});
			return;
		}
		if (existing.type === "builtin" && type === "user") existing.type = "user";
	};
	const walk = (n) => {
		const { name: nodeName } = n;
		if (nodeName === "Context") {
			withScope(scopes, [], (scope) => {
				forEachChild(n, (child) => {
					if (child.name !== "ContextEntry") return;
					forEachChild(child, (entryChild) => {
						if (entryChild.name !== "Key") walk(entryChild);
					});
					const keyName = child.getChild("Key")?.getChild("Name");
					if (keyName) scope.add(nodeText(keyName, source));
				});
			});
			return;
		}
		if (nodeName === "FunctionDefinition") {
			const params = collectFunctionParameters(n, source);
			withScope(scopes, params, () => {
				const body = n.getChild("FunctionBody");
				if (body) walk(body);
			});
			return;
		}
		if (nodeName === "ForExpression" || nodeName === "QuantifiedExpression") {
			const inExp = n.getChild("InExpressions");
			if (inExp) forEachChild(inExp, (child) => {
				if (child.name === "InExpression") forEachChild(child, (innerChild) => {
					if (innerChild.name !== "Name" && innerChild.name !== "in" && innerChild.name !== "Identifier") walk(innerChild);
				});
			});
			withScope(scopes, collectIterationVariables(n, source), () => {
				forEachChild(n, (child) => {
					if (!ITERATION_KEYWORDS.has(child.name)) walk(child);
				});
			});
			return;
		}
		if (nodeName === "FunctionInvocation") {
			const funcNameNode = n.getChild("VariableName");
			if (funcNameNode) recordInvocation(funcNameNode);
		}
		forEachChild(n, walk);
	};
	walk(node);
	return Array.from(functions.values()).sort((a, b) => a.name.localeCompare(b.name));
}
function analyzeForValidity(node) {
	return !containsErrorNodes(node);
}
function containsErrorNodes(node) {
	if (node.type.isError) return true;
	let child = node.firstChild;
	while (child) {
		if (containsErrorNodes(child)) return true;
		child = child.nextSibling;
	}
	return false;
}
function createContext(variables) {
	return variables.reduce((context, variable) => {
		context[variable.name] = () => {};
		return context;
	}, {});
}
var ITERATION_KEYWORDS$1, ITERATION_KEYWORDS, FeelAnalyzer;
var init_dist = __esmMin((() => {
	init_dist$1();
	ITERATION_KEYWORDS$1 = new Set([
		"for",
		"return",
		"some",
		"every",
		"InExpressions",
		"satisfies"
	]);
	ITERATION_KEYWORDS = new Set([
		"for",
		"return",
		"some",
		"every",
		"InExpressions",
		"satisfies"
	]);
	FeelAnalyzer = class {
		constructor(options = {}) {
			this.builtinNames = new Set(options.builtins?.map((b) => b.name) ?? []);
			const config = {
				top: options.dialect === "unaryTests" ? "UnaryTests" : "Expression",
				dialect: options.parserDialect
			};
			if (options.reservedNameBuiltins && options.reservedNameBuiltins.length > 0) config.contextTracker = trackVariables(createContext(options.reservedNameBuiltins));
			this.parser = parser.configure(config);
		}
		analyzeExpression(expression) {
			const tree = this.parser.parse(expression);
			return {
				valid: analyzeForValidity(tree.topNode),
				inputs: analyzeForInputs(tree.topNode, expression, this.builtinNames),
				functions: analyzeForFunctions(tree.topNode, expression, this.builtinNames)
			};
		}
	};
}));
//#endregion
export { moddle_utils_exports as a, require_static_resolver as c, init_moddle_utils as i, dist_exports as n, pathEquals as o, init_dist as r, require_semver_compare as s, FeelAnalyzer as t };

//# sourceMappingURL=dist-CS7WyDVh.js.map