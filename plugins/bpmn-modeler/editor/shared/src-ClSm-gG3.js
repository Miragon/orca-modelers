const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./c7-B_oJpiuj.js","./rolldown-runtime-DQp2zzRu.js","./ModelUtil-BGe9jbj7.js","./EscapeUtil-B1jzPlMc.js","./jsxRuntime.module-awBdvHUy.js","./sharedModules-BzDoO-Q2.js","./editorLayout-DZwh-cxt.js","./editorLayout-ThHr9A18.css","./createSurface-DyHVIhQM.js","../bpmn/main.js","./bpmn-DUImDDdd.css","./clipboard-Bznk3d97.js","./index.esm-DgBSptNj.js","./dist-BWHN8Och.js","./moddle-utils-CKD1iZGs.js","./lib-CHaSAubE.js","./reporting-CwIb-OB4.js","./reporting-DXH2a9lW.css","./index.esm-CXJiDiAL.js","./c8-COBHyc91.js"])))=>i.map(i=>d[i]);
import { d as extras, f as TranslateModule, m as _defineProperty, p as i18n } from "./editorLayout-DZwh-cxt.js";
import { a as MODELER_NAMESPACE_URI, c as isEngine, i as ENGINE_EXECUTION_PLATFORM, o as engineSupports, r as surfaceModeSupports, s as executionPlatformAttributeNames, t as __vitePreload } from "../bpmn/main.js";
import { C as templatePropertyDisplayText, E as modeler_default, O as Modeler, S as propertyDisplayLabel, T as templateIdOfEntryKey, _ as FlowNavigationModule, a as formatSurfaceDiagram, b as fallbackTranslate, c as subscribeFormatted, d as createPopupMenuAnnotationsModule, f as BPMN_TAB, g as createBpmnLayoutModule, h as createDefinitionSearchModule, i as createSurfaceLintHandle, l as wireContentSaved, m as buildLintModules, n as applyFavouriteBpmnElements, o as installClipboardSupport, p as ELEMENT_POPUP_MENUS, r as cleanupSurfaceDiagram, s as subscribeCommandStackChanged, t as createReporter, u as ReplaceTemplatesTabModule, v as AppendMenuModule, w as u, x as partitionVisibleProperties, y as extractImplementationDetail } from "./reporting-CwIb-OB4.js";
import { B as d, H as q, K as k, L as A, R as T, V as h, W as R } from "./clipboard-Bznk3d97.js";
import { a as is, i as init_ModelUtil, n as getBusinessObject } from "./ModelUtil-BGe9jbj7.js";
import { a as exportSvg, f as CustomGroupsModule, i as exportFormattedXml, m as FlushableDebounceInputModule, n as SurfaceCore, o as importDiagram, p as ModeFilterModule, r as DrilldownFitModule, s as createModelNavigationModule, t as createSurface } from "./createSurface-DyHVIhQM.js";
import { _ as S, hn as subscribe, pn as DisposableStore, t as u$1, yn as UnsupportedEngineError } from "./jsxRuntime.module-awBdvHUy.js";
var VERSIONS = {
	c7: [
		"7.24.0",
		"7.23.0",
		"7.22.0",
		"7.21.0",
		"7.20.0",
		"7.19.0",
		"7.18.0",
		"7.17.0"
	],
	c8: [
		"8.9.0",
		"8.8.0",
		"8.7.0",
		"8.6.0",
		"8.5.0",
		"8.4.0",
		"8.3.0",
		"8.2.0",
		"8.1.0",
		"8.0.0"
	]
};
function getLatestVersion(platform) {
	return getVersions(platform)[0];
}
function getVersions(platform) {
	return VERSIONS[platform];
}
// ../../libs/modeler-types/src/elementTemplates.ts
function elementTemplateRefOf(template) {
	if (!isRecord(template) || typeof template.id !== "string") return;
	const version = elementTemplateVersionOf(template);
	return version === void 0 ? { id: template.id } : {
		id: template.id,
		version
	};
}
function elementTemplateVersionOf(template) {
	return isRecord(template) && typeof template.version === "number" ? template.version : void 0;
}
function elementTemplateRefKey(ref) {
	return JSON.stringify([ref.id, ref.version ?? null]);
}
function isSameElementTemplateRef(ref, other) {
	return elementTemplateRefKey(ref) === elementTemplateRefKey(other);
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
// ../../libs/modeler-types/src/scriptSurface.ts
var SCRIPT_SURFACES = {
	"script-task": {
		listenerType: void 0,
		propertyNames: {
			content: "script",
			format: "scriptFormat"
		}
	},
	"execution-listener": {
		listenerType: "camunda:ExecutionListener",
		propertyNames: {
			content: "value",
			format: "scriptFormat"
		}
	},
	"task-listener": {
		listenerType: "camunda:TaskListener",
		propertyNames: {
			content: "value",
			format: "scriptFormat"
		}
	}
};
function scriptPropertyName(kind, field) {
	return SCRIPT_SURFACES[kind].propertyNames[field];
}
function describeScriptSurface(elementId, kind, listenerIndex) {
	const { listenerType } = SCRIPT_SURFACES[kind];
	if (listenerType === void 0) return elementId;
	return `${listenerType} #${listenerIndex} on ${elementId}`;
}
function findListenerAt(element, kind, listenerIndex) {
	if (listenerIndex === void 0) return;
	const { listenerType } = SCRIPT_SURFACES[kind];
	return (element?.extensionElements?.values ?? []).filter((listener) => listener.$type === listenerType)[listenerIndex];
}
function resolveScriptWriteTarget(element, kind, listenerIndex, field) {
	const propertyName = scriptPropertyName(kind, field);
	if (kind === "script-task") {
		if (element.$type !== "bpmn:ScriptTask") return;
		return {
			moddleElement: element,
			propertyName
		};
	}
	const script = findListenerAt(element, kind, listenerIndex)?.script;
	if (!script) return;
	return {
		moddleElement: script,
		propertyName
	};
}
// ../../libs/modeler-types/src/implementation.ts
function implementationStatusKey(activityId, reference) {
	return `${activityId}::${reference}`;
}
// ../../node_modules/minisearch/dist/es/index.js
var ENTRIES = "ENTRIES";
var KEYS = "KEYS";
var VALUES = "VALUES";
var LEAF = "";
var TreeIterator = class {
	constructor(set, type) {
		const node = set._tree;
		const keys = Array.from(node.keys());
		this.set = set;
		this._type = type;
		this._path = keys.length > 0 ? [{
			node,
			keys
		}] : [];
	}
	next() {
		const value = this.dive();
		this.backtrack();
		return value;
	}
	dive() {
		if (this._path.length === 0) return {
			done: true,
			value: void 0
		};
		const { node, keys } = last$1(this._path);
		if (last$1(keys) === LEAF) return {
			done: false,
			value: this.result()
		};
		const child = node.get(last$1(keys));
		this._path.push({
			node: child,
			keys: Array.from(child.keys())
		});
		return this.dive();
	}
	backtrack() {
		if (this._path.length === 0) return;
		const keys = last$1(this._path).keys;
		keys.pop();
		if (keys.length > 0) return;
		this._path.pop();
		this.backtrack();
	}
	key() {
		return this.set._prefix + this._path.map(({ keys }) => last$1(keys)).filter((key) => key !== LEAF).join("");
	}
	value() {
		return last$1(this._path).node.get(LEAF);
	}
	result() {
		switch (this._type) {
			case VALUES: return this.value();
			case KEYS: return this.key();
			default: return [this.key(), this.value()];
		}
	}
	[Symbol.iterator]() {
		return this;
	}
};
var last$1 = (array) => {
	return array[array.length - 1];
};
var fuzzySearch = (node, query, maxDistance) => {
	const results = new Map();
	if (query === void 0) return results;
	const n = query.length + 1;
	const m = n + maxDistance;
	const matrix = new Uint8Array(m * n).fill(maxDistance + 1);
	for (let j = 0; j < n; ++j) matrix[j] = j;
	for (let i = 1; i < m; ++i) matrix[i * n] = i;
	recurse(node, query, maxDistance, results, matrix, 1, n, "");
	return results;
};
var recurse = (node, query, maxDistance, results, matrix, m, n, prefix) => {
	const offset = m * n;
	key: for (const key of node.keys()) if (key === LEAF) {
		const distance = matrix[offset - 1];
		if (distance <= maxDistance) results.set(prefix, [node.get(key), distance]);
	} else {
		let i = m;
		for (let pos = 0; pos < key.length; ++pos, ++i) {
			const char = key[pos];
			const thisRowOffset = n * i;
			const prevRowOffset = thisRowOffset - n;
			let minDistance = matrix[thisRowOffset];
			const jmin = Math.max(0, i - maxDistance - 1);
			const jmax = Math.min(n - 1, i + maxDistance);
			for (let j = jmin; j < jmax; ++j) {
				const different = char !== query[j];
				const rpl = matrix[prevRowOffset + j] + +different;
				const del = matrix[prevRowOffset + j + 1] + 1;
				const ins = matrix[thisRowOffset + j] + 1;
				const dist = matrix[thisRowOffset + j + 1] = Math.min(rpl, del, ins);
				if (dist < minDistance) minDistance = dist;
			}
			if (minDistance > maxDistance) continue key;
		}
		recurse(node.get(key), query, maxDistance, results, matrix, i, n, prefix + key);
	}
};
var SearchableMap = class SearchableMap {
	constructor(tree = new Map(), prefix = "") {
		this._size = void 0;
		this._tree = tree;
		this._prefix = prefix;
	}
	atPrefix(prefix) {
		if (!prefix.startsWith(this._prefix)) throw new Error("Mismatched prefix");
		const [node, path] = trackDown(this._tree, prefix.slice(this._prefix.length));
		if (node === void 0) {
			const [parentNode, key] = last(path);
			for (const k of parentNode.keys()) if (k !== LEAF && k.startsWith(key)) {
				const node = new Map();
				node.set(k.slice(key.length), parentNode.get(k));
				return new SearchableMap(node, prefix);
			}
		}
		return new SearchableMap(node, prefix);
	}
	clear() {
		this._size = void 0;
		this._tree.clear();
	}
	delete(key) {
		this._size = void 0;
		return remove(this._tree, key);
	}
	entries() {
		return new TreeIterator(this, ENTRIES);
	}
	forEach(fn) {
		for (const [key, value] of this) fn(key, value, this);
	}
	fuzzyGet(key, maxEditDistance) {
		return fuzzySearch(this._tree, key, maxEditDistance);
	}
	get(key) {
		const node = lookup(this._tree, key);
		return node !== void 0 ? node.get(LEAF) : void 0;
	}
	has(key) {
		const node = lookup(this._tree, key);
		return node !== void 0 && node.has(LEAF);
	}
	keys() {
		return new TreeIterator(this, KEYS);
	}
	set(key, value) {
		if (typeof key !== "string") throw new Error("key must be a string");
		this._size = void 0;
		createPath(this._tree, key).set(LEAF, value);
		return this;
	}
	get size() {
		if (this._size) return this._size;
		this._size = 0;
		const iter = this.entries();
		while (!iter.next().done) this._size += 1;
		return this._size;
	}
	update(key, fn) {
		if (typeof key !== "string") throw new Error("key must be a string");
		this._size = void 0;
		const node = createPath(this._tree, key);
		node.set(LEAF, fn(node.get(LEAF)));
		return this;
	}
	fetch(key, initial) {
		if (typeof key !== "string") throw new Error("key must be a string");
		this._size = void 0;
		const node = createPath(this._tree, key);
		let value = node.get(LEAF);
		if (value === void 0) node.set(LEAF, value = initial());
		return value;
	}
	values() {
		return new TreeIterator(this, VALUES);
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	static from(entries) {
		const tree = new SearchableMap();
		for (const [key, value] of entries) tree.set(key, value);
		return tree;
	}
	static fromObject(object) {
		return SearchableMap.from(Object.entries(object));
	}
};
var trackDown = (tree, key, path = []) => {
	if (key.length === 0 || tree == null) return [tree, path];
	for (const k of tree.keys()) if (k !== LEAF && key.startsWith(k)) {
		path.push([tree, k]);
		return trackDown(tree.get(k), key.slice(k.length), path);
	}
	path.push([tree, key]);
	return trackDown(void 0, "", path);
};
var lookup = (tree, key) => {
	if (key.length === 0 || tree == null) return tree;
	for (const k of tree.keys()) if (k !== LEAF && key.startsWith(k)) return lookup(tree.get(k), key.slice(k.length));
};
var createPath = (node, key) => {
	const keyLength = key.length;
	outer: for (let pos = 0; node && pos < keyLength;) {
		for (const k of node.keys()) if (k !== LEAF && key[pos] === k[0]) {
			const len = Math.min(keyLength - pos, k.length);
			let offset = 1;
			while (offset < len && key[pos + offset] === k[offset]) ++offset;
			const child = node.get(k);
			if (offset === k.length) node = child;
			else {
				const intermediate = new Map();
				intermediate.set(k.slice(offset), child);
				node.set(key.slice(pos, pos + offset), intermediate);
				node.delete(k);
				node = intermediate;
			}
			pos += offset;
			continue outer;
		}
		const child = new Map();
		node.set(key.slice(pos), child);
		return child;
	}
	return node;
};
var remove = (tree, key) => {
	const [node, path] = trackDown(tree, key);
	if (node === void 0) return;
	node.delete(LEAF);
	if (node.size === 0) cleanup(path);
	else if (node.size === 1) {
		const [key, value] = node.entries().next().value;
		merge(path, key, value);
	}
};
var cleanup = (path) => {
	if (path.length === 0) return;
	const [node, key] = last(path);
	node.delete(key);
	if (node.size === 0) cleanup(path.slice(0, -1));
	else if (node.size === 1) {
		const [key, value] = node.entries().next().value;
		if (key !== LEAF) merge(path.slice(0, -1), key, value);
	}
};
var merge = (path, key, value) => {
	if (path.length === 0) return;
	const [node, nodeKey] = last(path);
	node.set(nodeKey + key, value);
	node.delete(nodeKey);
};
var last = (array) => {
	return array[array.length - 1];
};
var OR = "or";
var AND = "and";
var AND_NOT = "and_not";
var MiniSearch = class MiniSearch {
	constructor(options) {
		if ((options === null || options === void 0 ? void 0 : options.fields) == null) throw new Error("MiniSearch: option \"fields\" must be provided");
		const autoVacuum = options.autoVacuum == null || options.autoVacuum === true ? defaultAutoVacuumOptions : options.autoVacuum;
		this._options = {
			...defaultOptions,
			...options,
			autoVacuum,
			searchOptions: {
				...defaultSearchOptions,
				...options.searchOptions || {}
			},
			autoSuggestOptions: {
				...defaultAutoSuggestOptions,
				...options.autoSuggestOptions || {}
			}
		};
		this._index = new SearchableMap();
		this._documentCount = 0;
		this._documentIds = new Map();
		this._idToShortId = new Map();
		this._fieldIds = {};
		this._fieldLength = new Map();
		this._avgFieldLength = [];
		this._nextId = 0;
		this._storedFields = new Map();
		this._dirtCount = 0;
		this._currentVacuum = null;
		this._enqueuedVacuum = null;
		this._enqueuedVacuumConditions = defaultVacuumConditions;
		this.addFields(this._options.fields);
	}
	add(document) {
		const { extractField, stringifyField, tokenize, processTerm, fields, idField } = this._options;
		const id = extractField(document, idField);
		if (id == null) throw new Error(`MiniSearch: document does not have ID field "${idField}"`);
		if (this._idToShortId.has(id)) throw new Error(`MiniSearch: duplicate ID ${id}`);
		const shortDocumentId = this.addDocumentId(id);
		this.saveStoredFields(shortDocumentId, document);
		for (const field of fields) {
			const fieldValue = extractField(document, field);
			if (fieldValue == null) continue;
			const tokens = tokenize(stringifyField(fieldValue, field), field);
			const fieldId = this._fieldIds[field];
			const uniqueTerms = new Set(tokens).size;
			this.addFieldLength(shortDocumentId, fieldId, this._documentCount - 1, uniqueTerms);
			for (const term of tokens) {
				const processedTerm = processTerm(term, field);
				if (Array.isArray(processedTerm)) for (const t of processedTerm) this.addTerm(fieldId, shortDocumentId, t);
				else if (processedTerm) this.addTerm(fieldId, shortDocumentId, processedTerm);
			}
		}
	}
	addAll(documents) {
		for (const document of documents) this.add(document);
	}
	addAllAsync(documents, options = {}) {
		const { chunkSize = 10 } = options;
		const acc = {
			chunk: [],
			promise: Promise.resolve()
		};
		const { chunk, promise } = documents.reduce(({ chunk, promise }, document, i) => {
			chunk.push(document);
			if ((i + 1) % chunkSize === 0) return {
				chunk: [],
				promise: promise.then(() => new Promise((resolve) => setTimeout(resolve, 0))).then(() => this.addAll(chunk))
			};
			else return {
				chunk,
				promise
			};
		}, acc);
		return promise.then(() => this.addAll(chunk));
	}
	remove(document) {
		const { tokenize, processTerm, extractField, stringifyField, fields, idField } = this._options;
		const id = extractField(document, idField);
		if (id == null) throw new Error(`MiniSearch: document does not have ID field "${idField}"`);
		const shortId = this._idToShortId.get(id);
		if (shortId == null) throw new Error(`MiniSearch: cannot remove document with ID ${id}: it is not in the index`);
		for (const field of fields) {
			const fieldValue = extractField(document, field);
			if (fieldValue == null) continue;
			const tokens = tokenize(stringifyField(fieldValue, field), field);
			const fieldId = this._fieldIds[field];
			const uniqueTerms = new Set(tokens).size;
			this.removeFieldLength(shortId, fieldId, this._documentCount, uniqueTerms);
			for (const term of tokens) {
				const processedTerm = processTerm(term, field);
				if (Array.isArray(processedTerm)) for (const t of processedTerm) this.removeTerm(fieldId, shortId, t);
				else if (processedTerm) this.removeTerm(fieldId, shortId, processedTerm);
			}
		}
		this._storedFields.delete(shortId);
		this._documentIds.delete(shortId);
		this._idToShortId.delete(id);
		this._fieldLength.delete(shortId);
		this._documentCount -= 1;
	}
	removeAll(documents) {
		if (documents) for (const document of documents) this.remove(document);
		else if (arguments.length > 0) throw new Error("Expected documents to be present. Omit the argument to remove all documents.");
		else {
			this._index = new SearchableMap();
			this._documentCount = 0;
			this._documentIds = new Map();
			this._idToShortId = new Map();
			this._fieldLength = new Map();
			this._avgFieldLength = [];
			this._storedFields = new Map();
			this._nextId = 0;
		}
	}
	discard(id) {
		const shortId = this._idToShortId.get(id);
		if (shortId == null) throw new Error(`MiniSearch: cannot discard document with ID ${id}: it is not in the index`);
		this._idToShortId.delete(id);
		this._documentIds.delete(shortId);
		this._storedFields.delete(shortId);
		(this._fieldLength.get(shortId) || []).forEach((fieldLength, fieldId) => {
			this.removeFieldLength(shortId, fieldId, this._documentCount, fieldLength);
		});
		this._fieldLength.delete(shortId);
		this._documentCount -= 1;
		this._dirtCount += 1;
		this.maybeAutoVacuum();
	}
	maybeAutoVacuum() {
		if (this._options.autoVacuum === false) return;
		const { minDirtFactor, minDirtCount, batchSize, batchWait } = this._options.autoVacuum;
		this.conditionalVacuum({
			batchSize,
			batchWait
		}, {
			minDirtCount,
			minDirtFactor
		});
	}
	discardAll(ids) {
		const autoVacuum = this._options.autoVacuum;
		try {
			this._options.autoVacuum = false;
			for (const id of ids) this.discard(id);
		} finally {
			this._options.autoVacuum = autoVacuum;
		}
		this.maybeAutoVacuum();
	}
	replace(updatedDocument) {
		const { idField, extractField } = this._options;
		const id = extractField(updatedDocument, idField);
		this.discard(id);
		this.add(updatedDocument);
	}
	vacuum(options = {}) {
		return this.conditionalVacuum(options);
	}
	conditionalVacuum(options, conditions) {
		if (this._currentVacuum) {
			this._enqueuedVacuumConditions = this._enqueuedVacuumConditions && conditions;
			if (this._enqueuedVacuum != null) return this._enqueuedVacuum;
			this._enqueuedVacuum = this._currentVacuum.then(() => {
				const conditions = this._enqueuedVacuumConditions;
				this._enqueuedVacuumConditions = defaultVacuumConditions;
				return this.performVacuuming(options, conditions);
			});
			return this._enqueuedVacuum;
		}
		if (this.vacuumConditionsMet(conditions) === false) return Promise.resolve();
		this._currentVacuum = this.performVacuuming(options);
		return this._currentVacuum;
	}
	async performVacuuming(options, conditions) {
		const initialDirtCount = this._dirtCount;
		if (this.vacuumConditionsMet(conditions)) {
			const batchSize = options.batchSize || defaultVacuumOptions.batchSize;
			const batchWait = options.batchWait || defaultVacuumOptions.batchWait;
			let i = 1;
			for (const [term, fieldsData] of this._index) {
				for (const [fieldId, fieldIndex] of fieldsData) for (const [shortId] of fieldIndex) {
					if (this._documentIds.has(shortId)) continue;
					if (fieldIndex.size <= 1) fieldsData.delete(fieldId);
					else fieldIndex.delete(shortId);
				}
				if (this._index.get(term).size === 0) this._index.delete(term);
				if (i % batchSize === 0) await new Promise((resolve) => setTimeout(resolve, batchWait));
				i += 1;
			}
			this._dirtCount -= initialDirtCount;
		}
		await null;
		this._currentVacuum = this._enqueuedVacuum;
		this._enqueuedVacuum = null;
	}
	vacuumConditionsMet(conditions) {
		if (conditions == null) return true;
		let { minDirtCount, minDirtFactor } = conditions;
		minDirtCount = minDirtCount || defaultAutoVacuumOptions.minDirtCount;
		minDirtFactor = minDirtFactor || defaultAutoVacuumOptions.minDirtFactor;
		return this.dirtCount >= minDirtCount && this.dirtFactor >= minDirtFactor;
	}
	get isVacuuming() {
		return this._currentVacuum != null;
	}
	get dirtCount() {
		return this._dirtCount;
	}
	get dirtFactor() {
		return this._dirtCount / (1 + this._documentCount + this._dirtCount);
	}
	has(id) {
		return this._idToShortId.has(id);
	}
	getStoredFields(id) {
		const shortId = this._idToShortId.get(id);
		if (shortId == null) return;
		return this._storedFields.get(shortId);
	}
	search(query, searchOptions = {}) {
		const { searchOptions: globalSearchOptions } = this._options;
		const searchOptionsWithDefaults = {
			...globalSearchOptions,
			...searchOptions
		};
		const rawResults = this.executeQuery(query, searchOptions);
		const results = [];
		for (const [docId, { score, terms, match }] of rawResults) {
			const quality = terms.length || 1;
			const result = {
				id: this._documentIds.get(docId),
				score: score * quality,
				terms: Object.keys(match),
				queryTerms: terms,
				match
			};
			Object.assign(result, this._storedFields.get(docId));
			if (searchOptionsWithDefaults.filter == null || searchOptionsWithDefaults.filter(result)) results.push(result);
		}
		if (query === MiniSearch.wildcard && searchOptionsWithDefaults.boostDocument == null) return results;
		results.sort(byScore);
		return results;
	}
	autoSuggest(queryString, options = {}) {
		options = {
			...this._options.autoSuggestOptions,
			...options
		};
		const suggestions = new Map();
		for (const { score, terms } of this.search(queryString, options)) {
			const phrase = terms.join(" ");
			const suggestion = suggestions.get(phrase);
			if (suggestion != null) {
				suggestion.score += score;
				suggestion.count += 1;
			} else suggestions.set(phrase, {
				score,
				terms,
				count: 1
			});
		}
		const results = [];
		for (const [suggestion, { score, terms, count }] of suggestions) results.push({
			suggestion,
			terms,
			score: score / count
		});
		results.sort(byScore);
		return results;
	}
	get documentCount() {
		return this._documentCount;
	}
	get termCount() {
		return this._index.size;
	}
	static loadJSON(json, options) {
		if (options == null) throw new Error("MiniSearch: loadJSON should be given the same options used when serializing the index");
		return this.loadJS(JSON.parse(json), options);
	}
	static async loadJSONAsync(json, options) {
		if (options == null) throw new Error("MiniSearch: loadJSON should be given the same options used when serializing the index");
		return this.loadJSAsync(JSON.parse(json), options);
	}
	static getDefault(optionName) {
		if (defaultOptions.hasOwnProperty(optionName)) return getOwnProperty(defaultOptions, optionName);
		else throw new Error(`MiniSearch: unknown option "${optionName}"`);
	}
	static loadJS(js, options) {
		const { index, documentIds, fieldLength, storedFields, serializationVersion } = js;
		const miniSearch = this.instantiateMiniSearch(js, options);
		miniSearch._documentIds = objectToNumericMap(documentIds);
		miniSearch._fieldLength = objectToNumericMap(fieldLength);
		miniSearch._storedFields = objectToNumericMap(storedFields);
		for (const [shortId, id] of miniSearch._documentIds) miniSearch._idToShortId.set(id, shortId);
		for (const [term, data] of index) {
			const dataMap = new Map();
			for (const fieldId of Object.keys(data)) {
				let indexEntry = data[fieldId];
				if (serializationVersion === 1) indexEntry = indexEntry.ds;
				dataMap.set(parseInt(fieldId, 10), objectToNumericMap(indexEntry));
			}
			miniSearch._index.set(term, dataMap);
		}
		return miniSearch;
	}
	static async loadJSAsync(js, options) {
		const { index, documentIds, fieldLength, storedFields, serializationVersion } = js;
		const miniSearch = this.instantiateMiniSearch(js, options);
		miniSearch._documentIds = await objectToNumericMapAsync(documentIds);
		miniSearch._fieldLength = await objectToNumericMapAsync(fieldLength);
		miniSearch._storedFields = await objectToNumericMapAsync(storedFields);
		for (const [shortId, id] of miniSearch._documentIds) miniSearch._idToShortId.set(id, shortId);
		let count = 0;
		for (const [term, data] of index) {
			const dataMap = new Map();
			for (const fieldId of Object.keys(data)) {
				let indexEntry = data[fieldId];
				if (serializationVersion === 1) indexEntry = indexEntry.ds;
				dataMap.set(parseInt(fieldId, 10), await objectToNumericMapAsync(indexEntry));
			}
			if (++count % 1e3 === 0) await wait(0);
			miniSearch._index.set(term, dataMap);
		}
		return miniSearch;
	}
	static instantiateMiniSearch(js, options) {
		const { documentCount, nextId, fieldIds, averageFieldLength, dirtCount, serializationVersion } = js;
		if (serializationVersion !== 1 && serializationVersion !== 2) throw new Error("MiniSearch: cannot deserialize an index created with an incompatible version");
		const miniSearch = new MiniSearch(options);
		miniSearch._documentCount = documentCount;
		miniSearch._nextId = nextId;
		miniSearch._idToShortId = new Map();
		miniSearch._fieldIds = fieldIds;
		miniSearch._avgFieldLength = averageFieldLength;
		miniSearch._dirtCount = dirtCount || 0;
		miniSearch._index = new SearchableMap();
		return miniSearch;
	}
	executeQuery(query, searchOptions = {}) {
		if (query === MiniSearch.wildcard) return this.executeWildcardQuery(searchOptions);
		if (typeof query !== "string") {
			const options = {
				...searchOptions,
				...query,
				queries: void 0
			};
			const results = query.queries.map((subquery) => this.executeQuery(subquery, options));
			return this.combineResults(results, options.combineWith);
		}
		const { tokenize, processTerm, searchOptions: globalSearchOptions } = this._options;
		const options = {
			tokenize,
			processTerm,
			...globalSearchOptions,
			...searchOptions
		};
		const { tokenize: searchTokenize, processTerm: searchProcessTerm } = options;
		const results = searchTokenize(query).flatMap((term) => searchProcessTerm(term)).filter((term) => !!term).map(termToQuerySpec(options)).map((query) => this.executeQuerySpec(query, options));
		return this.combineResults(results, options.combineWith);
	}
	executeQuerySpec(query, searchOptions) {
		const options = {
			...this._options.searchOptions,
			...searchOptions
		};
		const boosts = (options.fields || this._options.fields).reduce((boosts, field) => ({
			...boosts,
			[field]: getOwnProperty(options.boost, field) || 1
		}), {});
		const { boostDocument, weights, maxFuzzy, bm25: bm25params } = options;
		const { fuzzy: fuzzyWeight, prefix: prefixWeight } = {
			...defaultSearchOptions.weights,
			...weights
		};
		const data = this._index.get(query.term);
		const results = this.termResults(query.term, query.term, 1, query.termBoost, data, boosts, boostDocument, bm25params);
		let prefixMatches;
		let fuzzyMatches;
		if (query.prefix) prefixMatches = this._index.atPrefix(query.term);
		if (query.fuzzy) {
			const fuzzy = query.fuzzy === true ? .2 : query.fuzzy;
			const maxDistance = fuzzy < 1 ? Math.min(maxFuzzy, Math.round(query.term.length * fuzzy)) : fuzzy;
			if (maxDistance) fuzzyMatches = this._index.fuzzyGet(query.term, maxDistance);
		}
		if (prefixMatches) for (const [term, data] of prefixMatches) {
			const distance = term.length - query.term.length;
			if (!distance) continue;
			fuzzyMatches === null || fuzzyMatches === void 0 || fuzzyMatches.delete(term);
			const weight = prefixWeight * term.length / (term.length + .3 * distance);
			this.termResults(query.term, term, weight, query.termBoost, data, boosts, boostDocument, bm25params, results);
		}
		if (fuzzyMatches) for (const term of fuzzyMatches.keys()) {
			const [data, distance] = fuzzyMatches.get(term);
			if (!distance) continue;
			const weight = fuzzyWeight * term.length / (term.length + distance);
			this.termResults(query.term, term, weight, query.termBoost, data, boosts, boostDocument, bm25params, results);
		}
		return results;
	}
	executeWildcardQuery(searchOptions) {
		const results = new Map();
		const options = {
			...this._options.searchOptions,
			...searchOptions
		};
		for (const [shortId, id] of this._documentIds) {
			const score = options.boostDocument ? options.boostDocument(id, "", this._storedFields.get(shortId)) : 1;
			results.set(shortId, {
				score,
				terms: [],
				match: {}
			});
		}
		return results;
	}
	combineResults(results, combineWith = OR) {
		if (results.length === 0) return new Map();
		const combinator = combinators[combineWith.toLowerCase()];
		if (!combinator) throw new Error(`Invalid combination operator: ${combineWith}`);
		return results.reduce(combinator) || new Map();
	}
	toJSON() {
		const index = [];
		for (const [term, fieldIndex] of this._index) {
			const data = {};
			for (const [fieldId, freqs] of fieldIndex) data[fieldId] = Object.fromEntries(freqs);
			index.push([term, data]);
		}
		return {
			documentCount: this._documentCount,
			nextId: this._nextId,
			documentIds: Object.fromEntries(this._documentIds),
			fieldIds: this._fieldIds,
			fieldLength: Object.fromEntries(this._fieldLength),
			averageFieldLength: this._avgFieldLength,
			storedFields: Object.fromEntries(this._storedFields),
			dirtCount: this._dirtCount,
			index,
			serializationVersion: 2
		};
	}
	termResults(sourceTerm, derivedTerm, termWeight, termBoost, fieldTermData, fieldBoosts, boostDocumentFn, bm25params, results = new Map()) {
		if (fieldTermData == null) return results;
		for (const field of Object.keys(fieldBoosts)) {
			const fieldBoost = fieldBoosts[field];
			const fieldId = this._fieldIds[field];
			const fieldTermFreqs = fieldTermData.get(fieldId);
			if (fieldTermFreqs == null) continue;
			let matchingFields = fieldTermFreqs.size;
			const avgFieldLength = this._avgFieldLength[fieldId];
			for (const docId of fieldTermFreqs.keys()) {
				if (!this._documentIds.has(docId)) {
					this.removeTerm(fieldId, docId, derivedTerm);
					matchingFields -= 1;
					continue;
				}
				const docBoost = boostDocumentFn ? boostDocumentFn(this._documentIds.get(docId), derivedTerm, this._storedFields.get(docId)) : 1;
				if (!docBoost) continue;
				const termFreq = fieldTermFreqs.get(docId);
				const fieldLength = this._fieldLength.get(docId)[fieldId];
				const rawScore = calcBM25Score(termFreq, matchingFields, this._documentCount, fieldLength, avgFieldLength, bm25params);
				const weightedScore = termWeight * termBoost * fieldBoost * docBoost * rawScore;
				const result = results.get(docId);
				if (result) {
					result.score += weightedScore;
					assignUniqueTerm(result.terms, sourceTerm);
					const match = getOwnProperty(result.match, derivedTerm);
					if (match) match.push(field);
					else result.match[derivedTerm] = [field];
				} else results.set(docId, {
					score: weightedScore,
					terms: [sourceTerm],
					match: { [derivedTerm]: [field] }
				});
			}
		}
		return results;
	}
	addTerm(fieldId, documentId, term) {
		const indexData = this._index.fetch(term, createMap);
		let fieldIndex = indexData.get(fieldId);
		if (fieldIndex == null) {
			fieldIndex = new Map();
			fieldIndex.set(documentId, 1);
			indexData.set(fieldId, fieldIndex);
		} else {
			const docs = fieldIndex.get(documentId);
			fieldIndex.set(documentId, (docs || 0) + 1);
		}
	}
	removeTerm(fieldId, documentId, term) {
		if (!this._index.has(term)) {
			this.warnDocumentChanged(documentId, fieldId, term);
			return;
		}
		const indexData = this._index.fetch(term, createMap);
		const fieldIndex = indexData.get(fieldId);
		if (fieldIndex == null || fieldIndex.get(documentId) == null) this.warnDocumentChanged(documentId, fieldId, term);
		else if (fieldIndex.get(documentId) <= 1) {
			if (fieldIndex.size <= 1) indexData.delete(fieldId);
			else fieldIndex.delete(documentId);
		} else fieldIndex.set(documentId, fieldIndex.get(documentId) - 1);
		if (this._index.get(term).size === 0) this._index.delete(term);
	}
	warnDocumentChanged(shortDocumentId, fieldId, term) {
		for (const fieldName of Object.keys(this._fieldIds)) if (this._fieldIds[fieldName] === fieldId) {
			this._options.logger("warn", `MiniSearch: document with ID ${this._documentIds.get(shortDocumentId)} has changed before removal: term "${term}" was not present in field "${fieldName}". Removing a document after it has changed can corrupt the index!`, "version_conflict");
			return;
		}
	}
	addDocumentId(documentId) {
		const shortDocumentId = this._nextId;
		this._idToShortId.set(documentId, shortDocumentId);
		this._documentIds.set(shortDocumentId, documentId);
		this._documentCount += 1;
		this._nextId += 1;
		return shortDocumentId;
	}
	addFields(fields) {
		for (let i = 0; i < fields.length; i++) this._fieldIds[fields[i]] = i;
	}
	addFieldLength(documentId, fieldId, count, length) {
		let fieldLengths = this._fieldLength.get(documentId);
		if (fieldLengths == null) this._fieldLength.set(documentId, fieldLengths = []);
		fieldLengths[fieldId] = length;
		const totalFieldLength = (this._avgFieldLength[fieldId] || 0) * count + length;
		this._avgFieldLength[fieldId] = totalFieldLength / (count + 1);
	}
	removeFieldLength(documentId, fieldId, count, length) {
		if (count === 1) {
			this._avgFieldLength[fieldId] = 0;
			return;
		}
		const totalFieldLength = this._avgFieldLength[fieldId] * count - length;
		this._avgFieldLength[fieldId] = totalFieldLength / (count - 1);
	}
	saveStoredFields(documentId, doc) {
		const { storeFields, extractField } = this._options;
		if (storeFields == null || storeFields.length === 0) return;
		let documentFields = this._storedFields.get(documentId);
		if (documentFields == null) this._storedFields.set(documentId, documentFields = {});
		for (const fieldName of storeFields) {
			const fieldValue = extractField(doc, fieldName);
			if (fieldValue !== void 0) documentFields[fieldName] = fieldValue;
		}
	}
};
MiniSearch.wildcard = Symbol("*");
var getOwnProperty = (object, property) => Object.prototype.hasOwnProperty.call(object, property) ? object[property] : void 0;
var combinators = {
	[OR]: (a, b) => {
		for (const docId of b.keys()) {
			const existing = a.get(docId);
			if (existing == null) a.set(docId, b.get(docId));
			else {
				const { score, terms, match } = b.get(docId);
				existing.score = existing.score + score;
				existing.match = Object.assign(existing.match, match);
				assignUniqueTerms(existing.terms, terms);
			}
		}
		return a;
	},
	[AND]: (a, b) => {
		const combined = new Map();
		for (const docId of b.keys()) {
			const existing = a.get(docId);
			if (existing == null) continue;
			const { score, terms, match } = b.get(docId);
			assignUniqueTerms(existing.terms, terms);
			combined.set(docId, {
				score: existing.score + score,
				terms: existing.terms,
				match: Object.assign(existing.match, match)
			});
		}
		return combined;
	},
	[AND_NOT]: (a, b) => {
		for (const docId of b.keys()) a.delete(docId);
		return a;
	}
};
var defaultBM25params = {
	k: 1.2,
	b: .7,
	d: .5
};
var calcBM25Score = (termFreq, matchingCount, totalCount, fieldLength, avgFieldLength, bm25params) => {
	const { k, b, d } = bm25params;
	return Math.log(1 + (totalCount - matchingCount + .5) / (matchingCount + .5)) * (d + termFreq * (k + 1) / (termFreq + k * (1 - b + b * fieldLength / avgFieldLength)));
};
var termToQuerySpec = (options) => (term, i, terms) => {
	return {
		term,
		fuzzy: typeof options.fuzzy === "function" ? options.fuzzy(term, i, terms) : options.fuzzy || false,
		prefix: typeof options.prefix === "function" ? options.prefix(term, i, terms) : options.prefix === true,
		termBoost: typeof options.boostTerm === "function" ? options.boostTerm(term, i, terms) : 1
	};
};
var defaultOptions = {
	idField: "id",
	extractField: (document, fieldName) => document[fieldName],
	stringifyField: (fieldValue, fieldName) => fieldValue.toString(),
	tokenize: (text) => text.split(SPACE_OR_PUNCTUATION),
	processTerm: (term) => term.toLowerCase(),
	fields: void 0,
	searchOptions: void 0,
	storeFields: [],
	logger: (level, message) => {
		if (typeof (console === null || console === void 0 ? void 0 : console[level]) === "function") console[level](message);
	},
	autoVacuum: true
};
var defaultSearchOptions = {
	combineWith: OR,
	prefix: false,
	fuzzy: false,
	maxFuzzy: 6,
	boost: {},
	weights: {
		fuzzy: .45,
		prefix: .375
	},
	bm25: defaultBM25params
};
var defaultAutoSuggestOptions = {
	combineWith: AND,
	prefix: (term, i, terms) => i === terms.length - 1
};
var defaultVacuumOptions = {
	batchSize: 1e3,
	batchWait: 10
};
var defaultVacuumConditions = {
	minDirtFactor: .1,
	minDirtCount: 20
};
var defaultAutoVacuumOptions = {
	...defaultVacuumOptions,
	...defaultVacuumConditions
};
var assignUniqueTerm = (target, term) => {
	if (!target.includes(term)) target.push(term);
};
var assignUniqueTerms = (target, source) => {
	for (const term of source) if (!target.includes(term)) target.push(term);
};
var byScore = ({ score: a }, { score: b }) => b - a;
var createMap = () => new Map();
var objectToNumericMap = (object) => {
	const map = new Map();
	for (const key of Object.keys(object)) map.set(parseInt(key, 10), object[key]);
	return map;
};
var objectToNumericMapAsync = async (object) => {
	const map = new Map();
	let count = 0;
	for (const key of Object.keys(object)) {
		map.set(parseInt(key, 10), object[key]);
		if (++count % 1e3 === 0) await wait(0);
	}
	return map;
};
var wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var SPACE_OR_PUNCTUATION = /[\n\r\p{Z}\p{P}]+/u;
// ../../libs/element-template-chooser/src/search.ts
function normalizeTerm(term) {
	return term.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}
var TemplateSearchIndex = class {
	constructor(templates) {
		this.templates = templates;
		this.index = new MiniSearch({
			fields: [
				"name",
				"keywords",
				"category",
				"description"
			],
			processTerm: normalizeTerm,
			searchOptions: {
				combineWith: "AND",
				fuzzy: .2,
				prefix: true,
				boost: {
					name: 5,
					keywords: 3,
					category: 2,
					description: 1
				}
			}
		});
		this.index.addAll(templates.map((template, i) => ({
			id: i,
			name: template.name,
			keywords: template.keywords?.join(" ") ?? "",
			category: template.category?.name ?? "",
			description: template.description ?? ""
		})));
	}
	search(query) {
		if (!query.trim()) return this.templates;
		return this.index.search(query).map((result) => this.templates[result.id]);
	}
};
// ../../libs/element-template-chooser/src/components/TemplatePreview.tsx
function TemplatePreview({ template, translate, onApply }) {
	const { properties, inputs, outputs } = partitionVisibleProperties(template.properties);
	const implDetail = extractImplementationDetail(template.properties);
	return u("div", {
		class: "etc-preview",
		children: [u("div", {
			class: "etc-preview-scroll",
			children: [
				u("div", {
					class: "etc-preview-sticky",
					children: [u("h3", {
						class: "etc-preview-name",
						children: template.name
					}), implDetail && u("div", {
						class: "etc-impl-detail",
						children: [u("span", {
							class: "etc-impl-label",
							children: translate(implDetail.label)
						}), u("code", {
							class: "etc-impl-value",
							children: implDetail.value
						})]
					})]
				}),
				u("div", {
					class: "etc-preview-details",
					children: [
						template.description && u("p", {
							class: "etc-preview-desc",
							children: template.description
						}),
						template.documentationRef && u("a", {
							class: "etc-preview-docs-link",
							href: template.documentationRef,
							target: "_blank",
							rel: "noopener noreferrer",
							children: [u("svg", {
								width: "12",
								height: "12",
								viewBox: "0 0 16 16",
								fill: "currentColor",
								children: [u("path", { d: "M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" }), u("path", { d: "M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z" })]
							}), translate("Documentation")]
						}),
						u("div", {
							class: "etc-preview-meta",
							children: [template.category && u("span", {
								class: "etc-badge etc-badge--category",
								children: template.category.name
							}), u("span", {
								class: "etc-preview-id",
								children: template.id
							})]
						})
					]
				}),
				u("div", {
					class: "etc-preview-params",
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
						properties.length === 0 && inputs.length === 0 && outputs.length === 0 && u("div", {
							class: "etc-preview-no-params",
							children: u("p", { children: translate("No visible parameters") })
						})
					]
				})
			]
		}), u("div", {
			class: "etc-preview-footer",
			children: u("button", {
				class: "etc-apply-btn",
				onClick: onApply,
				type: "button",
				children: translate("Apply Template")
			})
		})]
	});
}
function ParameterSection({ title, items, translate }) {
	return u("div", {
		class: "etc-param-section",
		children: [u("h4", {
			class: "etc-param-title",
			children: title
		}), u("ul", {
			class: "etc-param-list",
			children: items.map((p, i) => {
				const displayText = templatePropertyDisplayText(p);
				return u("li", {
					class: "etc-param-item",
					children: [
						u("div", {
							class: "etc-param-header",
							children: [u("span", {
								class: "etc-param-label",
								children: propertyDisplayLabel(p) ?? translate("Unnamed")
							}), u("div", {
								class: "etc-param-badges",
								children: [
									p.constraints?.notEmpty && u("span", {
										class: "etc-badge etc-badge--required",
										children: translate("required")
									}),
									p.editable === false && u("span", {
										class: "etc-badge etc-badge--readonly",
										children: translate("read-only")
									}),
									p.optional && u("span", {
										class: "etc-badge etc-badge--optional",
										children: translate("optional")
									})
								]
							})]
						}),
						p.description && u("p", {
							class: "etc-param-desc",
							children: p.description
						}),
						displayText && u("code", {
							class: "etc-param-value",
							children: displayText
						})
					]
				}, i);
			})
		})]
	});
}
// ../../libs/element-template-chooser/src/components/ChooserOverlay.tsx
function ChooserOverlay({ templates, translate, onSelect, onCancel }) {
	const [search, setSearch] = d("");
	const [activeCategory, setActiveCategory] = d(null);
	const [selectedId, setSelectedId] = d(null);
	const [focusIndex, setFocusIndex] = d(-1);
	const searchRef = A(null);
	const listRef = A(null);
	const categories = T(() => {
		const seen = new Map();
		for (const t of templates) if (t.category) seen.set(t.category.id, t.category.name);
		return Array.from(seen.entries()).map(([id, name]) => ({
			id,
			name
		}));
	}, [templates]);
	const searchIndex = T(() => new TemplateSearchIndex(templates), [templates]);
	const filtered = T(() => {
		const results = searchIndex.search(search);
		return activeCategory ? results.filter((t) => t.category?.id === activeCategory) : results;
	}, [
		searchIndex,
		search,
		activeCategory
	]);
	const selectedTemplate = T(() => filtered.find((t) => t.id === selectedId) ?? null, [filtered, selectedId]);
	h(() => {
		searchRef.current?.focus();
	}, []);
	h(() => {
		setFocusIndex(-1);
	}, [filtered]);
	h(() => {
		const handleKey = (e) => {
			if (e.key === "Escape") {
				e.stopPropagation();
				onCancel();
			}
		};
		document.addEventListener("keydown", handleKey, true);
		return () => document.removeEventListener("keydown", handleKey, true);
	}, [onCancel]);
	const focusTemplateAt = q((index) => {
		setFocusIndex(index);
		setSelectedId(filtered[index]?.id ?? null);
	}, [filtered]);
	const handleKeyDown = q((e) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			focusTemplateAt(Math.min(focusIndex + 1, filtered.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			focusTemplateAt(Math.max(focusIndex - 1, 0));
		} else if (e.key === "Enter" && selectedTemplate) {
			e.preventDefault();
			onSelect(selectedTemplate);
		}
	}, [
		focusIndex,
		filtered.length,
		focusTemplateAt,
		selectedTemplate,
		onSelect
	]);
	h(() => {
		if (focusIndex >= 0 && listRef.current) listRef.current.querySelectorAll(".etc-template-card")[focusIndex]?.scrollIntoView({ block: "nearest" });
	}, [focusIndex]);
	const visiblePropertyCount = (t) => t.properties.filter((p) => p.type !== "Hidden").length;
	const propertyCountLabel = (t) => {
		const count = visiblePropertyCount(t);
		return translate(count === 1 ? "{count} property" : "{count} properties", { count: String(count) });
	};
	return u("div", {
		class: "etc-backdrop",
		onClick: onCancel,
		children: u("div", {
			class: "etc-modal",
			onClick: (e) => e.stopPropagation(),
			onKeyDown: handleKeyDown,
			children: [
				u("div", {
					class: "etc-header",
					children: [u("h2", {
						class: "etc-title",
						children: translate("Element Templates")
					}), u("button", {
						class: "etc-close-btn",
						onClick: onCancel,
						"aria-label": translate("Close"),
						type: "button",
						children: u("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 16 16",
							fill: "currentColor",
							children: u("path", { d: "M8 8.707l3.646 3.647.708-.708L8.707 8l3.647-3.646-.708-.708L8 7.293 4.354 3.646l-.708.708L7.293 8l-3.647 3.646.708.708L8 8.707z" })
						})
					})]
				}),
				u("div", {
					class: "etc-search-wrapper",
					children: [
						u("svg", {
							class: "etc-search-icon",
							width: "14",
							height: "14",
							viewBox: "0 0 16 16",
							fill: "currentColor",
							children: u("path", { d: "M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.156a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" })
						}),
						u("input", {
							ref: searchRef,
							class: "etc-search-input",
							type: "text",
							placeholder: translate("Search templates..."),
							value: search,
							onInput: (e) => setSearch(e.target.value)
						}),
						search && u("button", {
							class: "etc-search-clear",
							onClick: () => {
								setSearch("");
								searchRef.current?.focus();
							},
							type: "button",
							"aria-label": translate("Clear search"),
							children: "×"
						})
					]
				}),
				categories.length > 0 && u("div", {
					class: "etc-filters",
					children: [u("button", {
						class: `etc-chip ${activeCategory === null ? "etc-chip--active" : ""}`,
						onClick: () => setActiveCategory(null),
						type: "button",
						children: translate("All")
					}), categories.map((cat) => u("button", {
						class: `etc-chip ${activeCategory === cat.id ? "etc-chip--active" : ""}`,
						onClick: () => setActiveCategory(activeCategory === cat.id ? null : cat.id),
						type: "button",
						children: cat.name
					}, cat.id))]
				}),
				u("div", {
					class: "etc-body",
					children: [u("div", {
						class: "etc-list-panel",
						ref: listRef,
						children: filtered.length === 0 ? u("div", {
							class: "etc-empty",
							children: [u("p", {
								class: "etc-empty-text",
								children: translate("No templates found")
							}), search && u("p", {
								class: "etc-empty-hint",
								children: translate("Try a different search term")
							})]
						}) : filtered.map((t, idx) => u("div", {
							class: [
								"etc-template-card",
								selectedId === t.id ? "etc-template-card--selected" : "",
								focusIndex === idx ? "etc-template-card--focused" : ""
							].filter(Boolean).join(" "),
							onClick: () => focusTemplateAt(idx),
							onDblClick: () => onSelect(t),
							children: [u("div", {
								class: "etc-card-header",
								children: [t.icon?.contents ? u("img", {
									class: "etc-card-icon",
									src: t.icon.contents,
									alt: ""
								}) : u("div", {
									class: "etc-card-icon-placeholder",
									children: u("svg", {
										width: "16",
										height: "16",
										viewBox: "0 0 16 16",
										fill: "currentColor",
										children: u("path", { d: "M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4zm1 2h6v1H5V3zm0 3h6v1H5V6zm0 3h4v1H5V9z" })
									})
								}), u("div", {
									class: "etc-card-text",
									children: [
										u("span", {
											class: "etc-card-name",
											children: t.name
										}),
										(() => {
											const impl = extractImplementationDetail(t.properties);
											return impl ? u("span", {
												class: "etc-card-impl",
												children: [
													translate(impl.label),
													":",
													u("code", { children: impl.value })
												]
											}) : null;
										})(),
										t.description && u("span", {
											class: "etc-card-desc",
											children: t.description
										})
									]
								})]
							}), u("div", {
								class: "etc-card-meta",
								children: [t.category && u("span", {
									class: "etc-badge etc-badge--category",
									children: t.category.name
								}), u("span", {
									class: "etc-badge etc-badge--props",
									children: propertyCountLabel(t)
								})]
							})]
						}, t.id))
					}), u("div", {
						class: "etc-preview-panel",
						children: selectedTemplate ? u(TemplatePreview, {
							template: selectedTemplate,
							translate,
							onApply: () => onSelect(selectedTemplate)
						}) : u("div", {
							class: "etc-preview-empty",
							children: [u("svg", {
								width: "48",
								height: "48",
								viewBox: "0 0 16 16",
								fill: "currentColor",
								opacity: "0.2",
								children: u("path", { d: "M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4zm1 2h6v1H5V3zm0 3h6v1H5V6zm0 3h4v1H5V9z" })
							}), u("p", { children: translate("Select a template to see its details") })]
						})
					})]
				})
			]
		})
	});
}
// ../../libs/element-template-chooser/src/ElementTemplateChooser.ts
init_ModelUtil();
var _ElementTemplateChooser;
var ElementTemplateChooser = class {
	constructor(config, eventBus, elementTemplates, canvas, injector) {
		if (!(!config || config.elementTemplateChooser !== false)) return;
		const translate = injector.get("translate", false) ?? fallbackTranslate;
		const offer = injector.get("elementTemplateOffer", false);
		eventBus.on("elementTemplates.select", (event) => {
			const { element } = event;
			this.open(element, elementTemplates, canvas, translate, offer).then((template) => {
				elementTemplates.applyTemplate(element, template);
			}).catch((err) => {
				if (err !== "user-canceled") console.error("elementTemplate.select :: error", err);
			});
		});
	}
	open(element, elementTemplates, canvas, translate, offer) {
		return new Promise((resolve, reject) => {
			const templates = elementTemplates.getLatest(element).filter((t) => !isTemplateApplied(element, t)).filter((t) => offer?.isOffered(t) ?? true);
			const container = document.createElement("div");
			container.className = "etc-overlay-root";
			const canvasContainer = canvas.getContainer();
			const themeKind = canvasContainer.closest("[data-bpmn-theme]")?.getAttribute("data-bpmn-theme");
			if (themeKind) container.setAttribute("data-bpmn-theme", themeKind);
			canvasContainer.parentElement.appendChild(container);
			const close = () => {
				R(null, container);
				container.remove();
			};
			const onSelect = (template) => {
				close();
				resolve(template);
			};
			const onCancel = () => {
				close();
				reject("user-canceled");
			};
			R(k(ChooserOverlay, {
				templates,
				translate,
				onSelect,
				onCancel
			}), container);
		});
	}
};
_ElementTemplateChooser = ElementTemplateChooser;
_ElementTemplateChooser.$inject = [
	"config.connectorsExtension",
	"eventBus",
	"elementTemplates",
	"canvas",
	"injector"
];
function isTemplateApplied(element, template) {
	const bo = getBusinessObject(element);
	return bo ? bo.get("modelerTemplate") === template.id : false;
}
// ../../libs/element-template-chooser/src/index.ts
var ElementTemplateChooserModule = {
	__init__: ["elementTemplateChooser"],
	elementTemplateChooser: ["type", ElementTemplateChooser]
};
// ../../libs/inline-scripting/src/scriptEditorEvents.ts
var OPEN_SCRIPT_EDITOR_EVENT = "scriptEditor.open";
// ../../libs/inline-scripting/src/editorIcon.ts
var EDITOR_ICON_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
</svg>`;
// ../../libs/inline-scripting/src/scriptTaskContextPad.ts
var _ScriptTaskContextPadProvider;
var ScriptTaskContextPadProvider = class {
	constructor(contextPad, opener) {
		this.opener = opener;
		contextPad.registerProvider(this);
	}
	getContextPadEntries(element) {
		const bo = element.businessObject;
		if (!bo || bo.$type !== "bpmn:ScriptTask") return {};
		return { "edit-script": {
			group: "edit",
			html: `<div class="entry edit-script-entry" draggable="true">${EDITOR_ICON_SVG}</div>`,
			title: "Edit Script",
			action: { click: () => {
				this.opener.openScriptTask(element);
			} }
		} };
	}
};
_ScriptTaskContextPadProvider = ScriptTaskContextPadProvider;
_ScriptTaskContextPadProvider.$inject = ["contextPad", "scriptEditorOpener"];
var ScriptTaskContextPadModule = {
	__init__: ["scriptTaskContextPadProvider"],
	scriptTaskContextPadProvider: ["type", ScriptTaskContextPadProvider]
};
// ../../libs/inline-scripting/src/scriptModel.ts
var LEGACY_SCRIPT_TASK_FORMAT_ATTRIBUTE = "camunda:scriptFormat";
function readScriptField(holder, kind, field) {
	const propertyName = scriptPropertyName(kind, field);
	return holder?.get?.(propertyName) ?? holder?.[propertyName];
}
function readScriptContent(elementRegistry, elementId, kind, listenerIndex) {
	const businessObject = elementRegistry.get(elementId)?.businessObject;
	if (!businessObject) return;
	const contentTarget = resolveScriptWriteTarget(businessObject, kind, listenerIndex, "content");
	if (!contentTarget) return;
	return contentTarget.moddleElement[contentTarget.propertyName] ?? "";
}
function readScriptTaskFormat(bo) {
	return readScriptField(bo, "script-task", "format") || bo?.get?.(LEGACY_SCRIPT_TASK_FORMAT_ATTRIBUTE) || "";
}
function scriptTaskOpenEvent(elementId, bo) {
	return {
		elementId,
		kind: "script-task",
		listenerIndex: void 0,
		eventName: void 0,
		scriptFormat: readScriptTaskFormat(bo),
		content: readScriptField(bo, "script-task", "content") ?? ""
	};
}
var PANEL_LISTENER_TYPES = ["executionListener", "taskListener"];
function listenerScriptKind(panelListenerType) {
	return panelListenerType === "executionListener" ? "execution-listener" : "task-listener";
}
function listenerScriptOpenEvent(elementId, kind, listenerIndex, listener) {
	const script = listener.script;
	return {
		elementId,
		kind,
		listenerIndex,
		eventName: listener.get?.("event") ?? listener.event ?? void 0,
		scriptFormat: readScriptField(script, kind, "format") ?? "",
		content: readScriptField(script, kind, "content") ?? ""
	};
}
function collectInlineScriptTasks(elementRegistry) {
	const scripts = [];
	for (const element of elementRegistry.getAll()) {
		if (element.type === "label") continue;
		const bo = element.businessObject;
		if (!bo || bo.$type !== "bpmn:ScriptTask") continue;
		if (bo.get?.("camunda:resource") || bo.resource) continue;
		scripts.push({
			elementId: element.id,
			scriptFormat: readScriptTaskFormat(bo),
			content: readScriptField(bo, "script-task", "content") ?? ""
		});
	}
	return scripts;
}
// ../../libs/inline-scripting/src/scriptEditorOpener.ts
var _ScriptEditorOpener;
var ScriptEditorOpener = class {
	constructor(eventBus, elementRegistry, modeling, bpmnFactory) {
		this.eventBus = eventBus;
		this.elementRegistry = elementRegistry;
		this.modeling = modeling;
		this.bpmnFactory = bpmnFactory;
	}
	openFirstScript(element) {
		if (this.openScriptTask(element)) return true;
		for (const listenerType of PANEL_LISTENER_TYPES) if (findListenerAt(element?.businessObject, listenerScriptKind(listenerType), 0)) return this.openListener(element.id, listenerType, 0);
		return false;
	}
	openScriptTask(element) {
		const bo = element?.businessObject;
		if (!bo || bo.$type !== "bpmn:ScriptTask") return false;
		this.eventBus.fire(OPEN_SCRIPT_EDITOR_EVENT, scriptTaskOpenEvent(element.id, bo));
		return true;
	}
	openListener(elementId, listenerType, listenerIndex) {
		const element = this.elementRegistry.get(elementId);
		const kind = listenerScriptKind(listenerType);
		const listener = findListenerAt(element?.businessObject, kind, listenerIndex);
		if (!element || !listener) return false;
		this.ensureInlineScript(element, kind, listener);
		this.eventBus.fire(OPEN_SCRIPT_EDITOR_EVENT, listenerScriptOpenEvent(elementId, kind, listenerIndex, listener));
		return true;
	}
	ensureInlineScript(element, kind, listener) {
		const existingScript = listener.script;
		if (typeof readScriptField(existingScript, kind, "content") === "string") return;
		const contentProperty = scriptPropertyName(kind, "content");
		if (existingScript) {
			this.modeling.updateModdleProperties(element, listener, {
				class: void 0,
				expression: void 0,
				delegateExpression: void 0
			});
			this.modeling.updateModdleProperties(element, existingScript, {
				resource: void 0,
				[contentProperty]: ""
			});
			return;
		}
		const script = this.bpmnFactory.create("camunda:Script", {
			[scriptPropertyName(kind, "format")]: "",
			[contentProperty]: ""
		});
		this.modeling.updateModdleProperties(element, listener, {
			class: void 0,
			expression: void 0,
			delegateExpression: void 0,
			script
		});
	}
};
_ScriptEditorOpener = ScriptEditorOpener;
_ScriptEditorOpener.$inject = [
	"eventBus",
	"elementRegistry",
	"modeling",
	"bpmnFactory"
];
var ScriptEditorOpenerModule = { scriptEditorOpener: ["type", ScriptEditorOpener] };
// ../../libs/inline-scripting/src/scriptEditorButtons.ts
var _ScriptEditorButtons;
var SCRIPT_GROUP_ID = "group-CamundaPlatform__Script";
var LISTENER_ENTRY_ID_PATTERN = new RegExp(`^(.+)-(${PANEL_LISTENER_TYPES.join("|")})-(\\d+)$`);
var INJECTED_MARKER = "data-script-btn-injected";
var ScriptEditorButtons = class {
	constructor(eventBus, selection, opener, injector) {
		this.eventBus = eventBus;
		this.selection = selection;
		this.opener = opener;
		this.store = new DisposableStore();
		this.panelRoot = injector.get("propertiesPanelRoot", false) ?? document.querySelector("#js-properties-panel");
		this.startObserving();
		this.eventBus.on("diagram.destroy", () => this.store.dispose());
	}
	startObserving() {
		const container = this.panelRoot;
		if (!container) return;
		this.injectButtons(container);
		this.observer = new MutationObserver(() => this.injectButtons(container));
		this.observer.observe(container, {
			childList: true,
			subtree: true
		});
		this.store.add(() => {
			this.observer?.disconnect();
			this.observer = void 0;
		});
	}
	injectButtons(container) {
		this.injectScriptGroupHeaderButton(container);
		this.injectListenerItemButtons(container);
	}
	injectScriptGroupHeaderButton(container) {
		const groupEl = container.querySelector(`[data-group-id="${SCRIPT_GROUP_ID}"]`);
		if (!groupEl) return;
		const buttonsContainer = groupEl.querySelector(".bio-properties-panel-group-header-buttons");
		if (!buttonsContainer || buttonsContainer.hasAttribute(INJECTED_MARKER)) return;
		const button = this.createButton("bio-properties-panel-group-header-button script-editor-button");
		button.addEventListener("click", (event) => {
			event.stopPropagation();
			this.handleScriptHeaderClick();
		});
		buttonsContainer.insertBefore(button, buttonsContainer.firstChild);
		buttonsContainer.setAttribute(INJECTED_MARKER, "true");
	}
	injectListenerItemButtons(container) {
		const entries = container.querySelectorAll("[data-entry-id]");
		for (const entry of Array.from(entries)) {
			const id = entry.getAttribute("data-entry-id");
			if (!id) continue;
			if (!LISTENER_ENTRY_ID_PATTERN.test(id)) continue;
			const header = entry.querySelector(".bio-properties-panel-collapsible-entry-header");
			if (!header || header.hasAttribute(INJECTED_MARKER)) continue;
			const button = this.createButton("script-editor-button is-list-item");
			button.addEventListener("click", (event) => {
				event.stopPropagation();
				this.handleListenerItemClick(button);
			});
			const removeBtn = header.querySelector(".bio-properties-panel-remove-entry");
			if (removeBtn) header.insertBefore(button, removeBtn);
			else header.appendChild(button);
			header.setAttribute(INJECTED_MARKER, "true");
		}
	}
	createButton(className) {
		const button = document.createElement("button");
		button.type = "button";
		button.title = "Open script in editor";
		button.className = className;
		button.innerHTML = EDITOR_ICON_SVG;
		return button;
	}
	handleScriptHeaderClick() {
		const selected = this.selection.get();
		if (!selected || selected.length === 0) return;
		this.opener.openScriptTask(selected[0]);
	}
	handleListenerItemClick(button) {
		const id = button.closest("[data-entry-id]")?.getAttribute("data-entry-id") ?? "";
		const match = LISTENER_ENTRY_ID_PATTERN.exec(id);
		if (!match) return;
		this.opener.openListener(match[1], match[2], parseInt(match[3], 10));
	}
};
_ScriptEditorButtons = ScriptEditorButtons;
_ScriptEditorButtons.$inject = [
	"eventBus",
	"selection",
	"scriptEditorOpener",
	"injector"
];
var ScriptEditorButtonsModule = {
	__init__: ["scriptEditorButtons"],
	scriptEditorButtons: ["type", ScriptEditorButtons]
};
// ../../libs/inline-scripting/src/scriptEditorKeyboard.ts
var _ScriptEditorKeyboard;
var ScriptEditorKeyboard = class {
	constructor(keyboard, selection, opener, injector) {
		keyboard.addListener((ctx) => this.handleKeyDown(ctx.keyEvent, keyboard, selection, opener, injector));
	}
	handleKeyDown(event, keyboard, selection, opener, injector) {
		if (event.key !== "o") return void 0;
		if (keyboard.isCmd(event) || event.altKey || keyboard.isShift(event)) return void 0;
		if (injector.get("directEditing", false)?.isActive()) return void 0;
		if (injector.get("popupMenu", false)?.isOpen()) return void 0;
		const selected = selection.get();
		if (selected.length !== 1) return void 0;
		return opener.openFirstScript(selected[0]) ? true : void 0;
	}
};
_ScriptEditorKeyboard = ScriptEditorKeyboard;
_ScriptEditorKeyboard.$inject = [
	"keyboard",
	"selection",
	"scriptEditorOpener",
	"injector"
];
var ScriptEditorKeyboardModule = {
	__init__: ["scriptEditorKeyboard"],
	scriptEditorKeyboard: ["type", ScriptEditorKeyboard]
};
// ../../libs/inline-scripting/src/openScriptEditorsStore.ts
var _OpenScriptEditorsStore;
var OPEN_SCRIPT_EDITORS_CHANGED_EVENT = "openScriptEditors.changed";
function openScriptKey(elementId, kind, listenerIndex) {
	return `${elementId}::${kind}::${listenerIndex ?? 0}`;
}
var OpenScriptEditorsStore = class {
	constructor(eventBus) {
		this.eventBus = eventBus;
		this.openByKey = new Map();
	}
	set(refs) {
		this.openByKey.clear();
		for (const ref of refs) this.openByKey.set(openScriptKey(ref.elementId, ref.kind, ref.listenerIndex), ref);
		this.eventBus.fire(OPEN_SCRIPT_EDITORS_CHANGED_EVENT);
		this.eventBus.fire("propertiesPanel.providersChanged");
	}
	all() {
		return [...this.openByKey.values()];
	}
	get(elementId, kind, listenerIndex) {
		return this.openByKey.get(openScriptKey(elementId, kind, listenerIndex));
	}
};
_OpenScriptEditorsStore = OpenScriptEditorsStore;
_OpenScriptEditorsStore.$inject = ["eventBus"];
var OpenScriptEditorsStoreModule = {
	__init__: ["openScriptEditorsStore"],
	openScriptEditorsStore: ["type", OpenScriptEditorsStore]
};
// ../../libs/inline-scripting/src/scriptLockPropertiesProvider.ts
var _ScriptLockPropertiesProvider;
var LOCK_PROVIDER_PRIORITY = 250;
var SCRIPT_VALUE_SUFFIX = "scriptValue";
var MIN_ROWS = 2;
var MAX_ROWS = 16;
function LockIcon() {
	return u$1("svg", {
		"class": "script-lock-badge-icon",
		"width": "10",
		"height": "10",
		"viewBox": "0 0 16 16",
		"aria-hidden": "true",
		"children": u$1("path", {
			fill: "currentColor",
			d: "M8 1a3 3 0 0 0-3 3v2H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3zm1.5 5h-3V4a1.5 1.5 0 0 1 3 0v2z"
		})
	});
}
function clampRows(value) {
	const lineCount = value ? value.split("\n").length : MIN_ROWS;
	return Math.min(MAX_ROWS, Math.max(MIN_ROWS, lineCount));
}
function LockedScriptEntry(props) {
	const { id, lockGetValue, lockLabel, lockBadgeText, lockHintText, lockReveal } = props;
	const value = lockGetValue();
	const inputId = `bio-properties-panel-${id}`;
	const badge = u$1("span", {
		class: "script-lock-badge",
		title: lockHintText,
		children: [LockIcon(), lockBadgeText]
	});
	const label = u$1("label", {
		for: inputId,
		class: "bio-properties-panel-label",
		children: [lockLabel, badge]
	});
	const textarea = u$1("textarea", {
		"id": inputId,
		"name": id,
		"class": "bio-properties-panel-input bio-properties-panel-input-monospace",
		"readOnly": true,
		"spellCheck": false,
		"rows": clampRows(value),
		value,
		"title": lockHintText,
		"data-gramm": "false"
	});
	const field = u$1("div", {
		class: "bio-properties-panel-textarea script-lock-textarea",
		children: [label, textarea]
	});
	const entry = u$1("div", {
		"class": "bio-properties-panel-entry",
		"data-entry-id": id,
		"children": field
	});
	const hint = u$1("div", {
		class: "bio-properties-panel-description script-lock-hint",
		role: "button",
		tabIndex: 0,
		title: lockHintText,
		onClick: lockReveal,
		onKeyDown: (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				lockReveal();
			}
		},
		children: lockHintText
	});
	return u$1(S, { children: [entry, hint] });
}
var ScriptLockPropertiesProvider = class {
	constructor(propertiesPanel, store, eventBus, translate) {
		this.store = store;
		this.eventBus = eventBus;
		this.translate = translate;
		propertiesPanel.registerProvider(LOCK_PROVIDER_PRIORITY, this);
	}
	getGroups(element) {
		return (groups) => this.lockGroups(element, groups);
	}
	lockGroups(element, groups) {
		for (const group of groups) {
			if (!group) continue;
			if (group.id === "CamundaPlatform__Script" && Array.isArray(group.entries)) this.lockEntry(group.entries, SCRIPT_VALUE_SUFFIX, element, element.id, "script-task", void 0);
			else if (this.isListenerGroup(group) && Array.isArray(group.items)) for (const item of group.items) {
				const match = LISTENER_ENTRY_ID_PATTERN.exec(item?.id ?? "");
				if (!match || !Array.isArray(item.entries)) continue;
				this.lockEntry(item.entries, `${item.id}${SCRIPT_VALUE_SUFFIX}`, element, match[1], listenerScriptKind(match[2]), parseInt(match[3], 10));
			}
		}
		return groups;
	}
	isListenerGroup(group) {
		return group.id === "CamundaPlatform__ExecutionListener" || group.id === "CamundaPlatform__TaskListener";
	}
	lockEntry(entries, entryId, element, elementId, kind, listenerIndex) {
		const ref = this.store.get(elementId, kind, listenerIndex);
		if (!ref) return;
		const entry = entries.find((candidate) => candidate && candidate.id === entryId);
		if (!entry) return;
		entry.component = LockedScriptEntry;
		entry.lockLabel = this.translate("Script");
		entry.lockBadgeText = this.translate("Read-only");
		entry.lockHintText = `${this.translate("Being edited in")} ${ref.fileName} — ${this.translate("click to focus")}`;
		entry.lockGetValue = () => this.readScriptValue(element, kind, entry.script);
		entry.lockReveal = () => {
			const payload = this.buildOpenEvent(element, kind, listenerIndex);
			if (payload) this.eventBus.fire(OPEN_SCRIPT_EDITOR_EVENT, payload);
		};
	}
	readScriptValue(element, kind, script) {
		return readScriptField(script ?? element?.businessObject, kind, "content") ?? "";
	}
	buildOpenEvent(element, kind, listenerIndex) {
		const bo = element?.businessObject;
		if (!bo) return;
		if (kind === "script-task") return scriptTaskOpenEvent(element.id, bo);
		const listener = findListenerAt(bo, kind, listenerIndex ?? 0);
		if (!listener?.script) return;
		return listenerScriptOpenEvent(element.id, kind, listenerIndex, listener);
	}
};
_ScriptLockPropertiesProvider = ScriptLockPropertiesProvider;
_ScriptLockPropertiesProvider.$inject = [
	"propertiesPanel",
	"openScriptEditorsStore",
	"eventBus",
	"translate"
];
var ScriptLockPropertiesProviderModule = {
	__init__: ["scriptLockPropertiesProvider"],
	scriptLockPropertiesProvider: ["type", ScriptLockPropertiesProvider]
};
// ../../libs/inline-scripting/src/scriptSourceWatcher.ts
var _ScriptSourceWatcher;
var SCRIPT_SOURCE_CHANGED_EVENT = "scriptEditor.sourceChanged";
var ScriptSourceWatcher = class {
	constructor(eventBus, elementRegistry, store) {
		this.eventBus = eventBus;
		this.elementRegistry = elementRegistry;
		this.store = store;
		this.lastKnown = new Map();
		this.diagramImported = false;
		eventBus.on(OPEN_SCRIPT_EDITORS_CHANGED_EVENT, () => this.rebaseline());
		eventBus.on("commandStack.changed", () => this.detectChanges());
		eventBus.on("import.done", (event) => {
			if (!event?.error) this.diagramImported = true;
			this.detectChanges();
		});
	}
	noteApplied(elementId, kind, listenerIndex, content) {
		const key = openScriptKey(elementId, kind, listenerIndex);
		if (this.lastKnown.has(key)) this.lastKnown.set(key, content);
	}
	rebaseline() {
		const stillOpen = new Map();
		for (const ref of this.store.all()) {
			const key = openScriptKey(ref.elementId, ref.kind, ref.listenerIndex);
			if (this.lastKnown.has(key)) stillOpen.set(key, this.lastKnown.get(key));
		}
		this.lastKnown = stillOpen;
		this.baselineNewlyOpened();
	}
	baselineNewlyOpened() {
		for (const ref of this.store.all()) {
			const key = openScriptKey(ref.elementId, ref.kind, ref.listenerIndex);
			if (this.lastKnown.has(key)) continue;
			const current = this.read(ref);
			if (current === void 0 && !this.diagramImported) continue;
			this.lastKnown.set(key, current);
			if (current === void 0) this.reportSourceChanged(ref, void 0);
		}
	}
	detectChanges() {
		this.baselineNewlyOpened();
		for (const ref of this.store.all()) {
			const key = openScriptKey(ref.elementId, ref.kind, ref.listenerIndex);
			const current = this.read(ref);
			if (!this.lastKnown.has(key) || this.lastKnown.get(key) === current) continue;
			this.lastKnown.set(key, current);
			this.reportSourceChanged(ref, current);
		}
	}
	reportSourceChanged(ref, content) {
		const event = {
			elementId: ref.elementId,
			kind: ref.kind,
			listenerIndex: ref.listenerIndex,
			content
		};
		this.eventBus.fire(SCRIPT_SOURCE_CHANGED_EVENT, event);
	}
	read(ref) {
		return readScriptContent(this.elementRegistry, ref.elementId, ref.kind, ref.listenerIndex);
	}
};
_ScriptSourceWatcher = ScriptSourceWatcher;
_ScriptSourceWatcher.$inject = [
	"eventBus",
	"elementRegistry",
	"openScriptEditorsStore"
];
var ScriptSourceWatcherModule = {
	__init__: ["scriptSourceWatcher"],
	scriptSourceWatcher: ["type", ScriptSourceWatcher]
};
// ../../libs/inline-scripting/src/inlineScriptingPortForwarder.ts
var _InlineScriptingPortForwarder;
var InlineScriptingPortForwarder = class {
	constructor(eventBus, port) {
		eventBus.on(OPEN_SCRIPT_EDITOR_EVENT, (event) => port.openScriptEditor(event));
		eventBus.on(SCRIPT_SOURCE_CHANGED_EVENT, (event) => port.scriptSourceChanged(event));
	}
};
_InlineScriptingPortForwarder = InlineScriptingPortForwarder;
_InlineScriptingPortForwarder.$inject = ["eventBus", "inlineScriptingPort"];
// ../../libs/inline-scripting/src/index.ts
function createInlineScriptingModules(port) {
	return [
		ScriptTaskContextPadModule,
		ScriptEditorOpenerModule,
		ScriptEditorButtonsModule,
		ScriptEditorKeyboardModule,
		OpenScriptEditorsStoreModule,
		ScriptLockPropertiesProviderModule,
		ScriptSourceWatcherModule,
		{
			__init__: ["inlineScriptingPortForwarder"],
			inlineScriptingPortForwarder: ["type", InlineScriptingPortForwarder],
			inlineScriptingPort: ["value", port]
		}
	];
}
// ../../libs/code-link/src/extractImplementation.ts
function asNonEmptyString(value) {
	return typeof value === "string" && value.length > 0 ? value : void 0;
}
function findExtensionElement(businessObject, type) {
	return businessObject.extensionElements?.values?.find((element) => element.$type === type);
}
function extractImplementation(businessObject) {
	if (!businessObject) return;
	const javaClass = asNonEmptyString(businessObject.get("camunda:class"));
	if (javaClass) return {
		kind: "javaClass",
		reference: javaClass
	};
	const delegateExpression = asNonEmptyString(businessObject.get("camunda:delegateExpression"));
	if (delegateExpression) return {
		kind: "delegateExpression",
		reference: delegateExpression
	};
	const expression = asNonEmptyString(businessObject.get("camunda:expression"));
	if (expression) return {
		kind: "expression",
		reference: expression
	};
	if (businessObject.get("camunda:type") === "external") {
		const topic = asNonEmptyString(businessObject.get("camunda:topic"));
		if (topic) return {
			kind: "externalTopic",
			reference: topic
		};
	}
	const jobType = asNonEmptyString(findExtensionElement(businessObject, "zeebe:TaskDefinition")?.type);
	if (jobType) return {
		kind: "jobType",
		reference: jobType
	};
}
// ../../libs/code-link/src/collectImplementations.ts
init_ModelUtil();
var IMPLEMENTABLE_TYPES = [
	"bpmn:ServiceTask",
	"bpmn:SendTask",
	"bpmn:BusinessRuleTask"
];
function collectImplementations(elementRegistry) {
	const entries = [];
	for (const element of elementRegistry.getAll()) {
		if (!element.id || !IMPLEMENTABLE_TYPES.some((type) => is(element, type))) continue;
		const implementation = extractImplementation(element.businessObject);
		if (!implementation) continue;
		entries.push({
			activityId: element.id,
			kind: implementation.kind,
			reference: implementation.reference
		});
	}
	return entries.sort((a, b) => a.activityId.localeCompare(b.activityId));
}
// ../../libs/code-link/src/CodeLinkContextPadProvider.ts
init_ModelUtil();
var _CodeLinkContextPadProvider;
var CODE_ICON_SVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
var CodeLinkContextPadProvider = class {
	constructor(contextPad, translate, codeLinkPort, codeLinkMapClient) {
		this.translate = translate;
		this.port = codeLinkPort;
		this.client = codeLinkMapClient;
		contextPad.registerProvider(this);
	}
	getContextPadEntries(element) {
		if (!this.isImplementableTask(element)) return {};
		if (!extractImplementation(element.businessObject)) return {};
		if (!this.client.isResolved(element)) return {};
		return { "go-to-implementation": {
			group: "connect",
			html: `<div class="entry">${CODE_ICON_SVG}</div>`,
			title: this.translate("Go to implementation"),
			action: { click: (_event, clickedElement) => {
				const current = extractImplementation(clickedElement.businessObject);
				if (current) this.port.navigateToImplementation(current.reference, current.kind);
			} }
		} };
	}
	isImplementableTask(element) {
		return IMPLEMENTABLE_TYPES.some((type) => is(element, type));
	}
};
_CodeLinkContextPadProvider = CodeLinkContextPadProvider;
_CodeLinkContextPadProvider.$inject = [
	"contextPad",
	"translate",
	"codeLinkPort",
	"codeLinkMapClient"
];
// ../../libs/code-link/src/CodeLinkMapClient.ts
var _CodeLinkMapClient;
var SYNC_DEBOUNCE_MS = 400;
function singleTarget(current) {
	const target = current?.target;
	if (!target || Array.isArray(target)) return;
	return target;
}
var CodeLinkMapClient = class {
	constructor(eventBus, elementRegistry, contextPad, codeLinkPort) {
		this.statusByKey = new Map();
		this.store = new DisposableStore();
		this.elementRegistry = elementRegistry;
		this.contextPad = contextPad;
		this.port = codeLinkPort;
		eventBus.on("import.done", () => this.sendNow());
		eventBus.on("commandStack.changed", () => this.sendDebounced());
		eventBus.on("contextPad.open", (event) => {
			this.currentPadTarget = singleTarget(event?.current);
		});
		eventBus.on("contextPad.close", () => {
			this.currentPadTarget = void 0;
		});
		this.store.add(() => {
			if (this.syncTimer !== void 0) {
				clearTimeout(this.syncTimer);
				this.syncTimer = void 0;
			}
		});
		eventBus.on("diagram.destroy", () => this.store.dispose());
	}
	applyStatus(resolved) {
		const previous = this.statusByKey;
		const next = new Map(Object.entries(resolved));
		const target = this.currentPadTarget;
		const flipped = target !== void 0 && this.lookup(previous, target) !== this.lookup(next, target);
		this.statusByKey = next;
		if (flipped && target && this.contextPad.isOpen()) this.contextPad.open(target, true);
	}
	isResolved(element) {
		return this.lookup(this.statusByKey, element);
	}
	lookup(status, element) {
		const implementation = extractImplementation(element.businessObject);
		if (!element.id || !implementation) return true;
		const cached = status.get(implementationStatusKey(element.id, implementation.reference));
		return cached === void 0 ? true : cached;
	}
	sendDebounced() {
		if (this.store.isDisposed) return;
		if (this.syncTimer !== void 0) clearTimeout(this.syncTimer);
		this.syncTimer = setTimeout(() => {
			this.syncTimer = void 0;
			this.sendNow();
		}, SYNC_DEBOUNCE_MS);
	}
	sendNow() {
		if (this.store.isDisposed) return;
		const entries = collectImplementations(this.elementRegistry);
		const signature = JSON.stringify(entries);
		if (signature === this.lastSentSignature) return;
		this.lastSentSignature = signature;
		this.port.syncActivities(entries);
	}
};
_CodeLinkMapClient = CodeLinkMapClient;
_CodeLinkMapClient.$inject = [
	"eventBus",
	"elementRegistry",
	"contextPad",
	"codeLinkPort"
];
// ../../libs/code-link/src/index.ts
function createCodeLinkModule(port) {
	return {
		__init__: ["codeLinkMapClient", "codeLinkContextPadProvider"],
		codeLinkMapClient: ["type", CodeLinkMapClient],
		codeLinkContextPadProvider: ["type", CodeLinkContextPadProvider],
		codeLinkPort: ["value", port]
	};
}
// ../../packages/bpmn-modeler/src/capabilityModules.ts
function capabilityModules(engine, capabilities) {
	const modules = [];
	if (capabilities?.modelNavigation) modules.push(createModelNavigationModule(capabilities.modelNavigation));
	if (capabilities?.codeLink) modules.push(createCodeLinkModule(capabilities.codeLink));
	if (capabilities?.definitionSearch) modules.push(createDefinitionSearchModule(capabilities.definitionSearch));
	if (engineSupports(engine, "inlineScripting") && capabilities?.scripting) modules.push(...createInlineScriptingModules(capabilities.scripting));
	return modules;
}
// ../../packages/bpmn-modeler/src/engines.ts
function deriveEngines(definitionsAttributes) {
	const names = executionPlatformAttributeNames(Object.entries(definitionsAttributes).map(([name, value]) => ({
		name,
		value
	})));
	const platform = definitionsAttributes[names.platform];
	const version = definitionsAttributes[names.version];
	if (platform === ENGINE_EXECUTION_PLATFORM.c8 && version) return { camunda: version };
	return {};
}
// ../../packages/bpmn-modeler/src/executionPlatformAttributes.ts
function executionPlatformAttributes(definitions) {
	const registeredPrefix = definitions.$model.getPackage(MODELER_NAMESPACE_URI)?.prefix;
	if (registeredPrefix === void 0) return definitions.$attrs;
	const names = executionPlatformAttributeNames([{
		name: `xmlns:${registeredPrefix}`,
		value: MODELER_NAMESPACE_URI
	}]);
	const attributes = { [names.namespace]: MODELER_NAMESPACE_URI };
	for (const name of [names.platform, names.version]) {
		const value = definitions.get(name);
		if (typeof value === "string") attributes[name] = value;
	}
	return attributes;
}
// ../../packages/bpmn-modeler/src/engineStacks/index.ts
var ENGINE_STACK_LOADERS = {
	c7: async () => (await __vitePreload(async () => {
		const { c7Stack } = await import("./c7-B_oJpiuj.js");
		return { c7Stack };
	}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]), import.meta.url)).c7Stack,
	c8: async () => (await __vitePreload(async () => {
		const { c8Stack } = await import("./c8-COBHyc91.js");
		return { c8Stack };
	}, __vite__mapDeps([19,4,3,1,2,5,6,7,8,9,10,11,12,13,14,15,16,17,18]), import.meta.url)).c8Stack
};
async function loadEngineStack(engine) {
	if (!isEngine(engine)) throw new UnsupportedEngineError(engine);
	return ENGINE_STACK_LOADERS[engine]();
}
// ../../packages/bpmn-modeler/src/initialDiagram.ts
function initialDiagram(engine, executionPlatformVersion) {
	return `<?xml version="1.0" encoding="UTF-8"?><bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:modeler="http://camunda.org/schema/modeler/1.0" targetNamespace="http://bpmn.io/schema/bpmn" id="Definitions_1" modeler:executionPlatform="${ENGINE_EXECUTION_PLATFORM[engine]}" modeler:executionPlatformVersion="${executionPlatformVersion}"><bpmn:process id="Process_1" isExecutable="true"><bpmn:startEvent id="StartEvent_1"/></bpmn:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1"><bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1"><dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>`;
}
// ../../packages/bpmn-modeler/src/mode/mode.ts
var MODE_ATTRIBUTE = "data-bpmn-mode";
function normalizeMode(mode) {
	return mode ?? "implement";
}
function applyMode(ports, mode) {
	if (ports.getFilterMode() === mode) return;
	ports.setFilterMode(mode);
	ports.setModeAttribute(mode);
	ports.setLintMode(mode);
	ports.onModeChanged?.(mode);
}
// ../../packages/bpmn-modeler/src/mode/modeModules.ts
var POPUP_MODE_FILTER_PRIORITY = 100;
var TEMPLATE_SELECT_GUARD_PRIORITY = 1e4;
function stripTemplateEntries(entries) {
	const nonTemplateEntries = {};
	for (const [key, entry] of Object.entries(entries)) {
		if (templateIdOfEntryKey(key) !== void 0) continue;
		if (entry?.group?.id === "templates") continue;
		nonTemplateEntries[key] = entry;
	}
	return nonTemplateEntries;
}
var PopupMenuModeFilter = class {
	constructor(popupMenu, eventBus, injector) {
		_defineProperty(this, "injector", void 0);
		this.injector = injector;
		for (const id of ELEMENT_POPUP_MENUS) popupMenu.registerProvider(id, POPUP_MODE_FILTER_PRIORITY, this);
		eventBus.on("elementTemplates.select", TEMPLATE_SELECT_GUARD_PRIORITY, (event) => {
			if (!this.offersTemplates()) event.stopPropagation();
		});
	}
	getPopupMenuEntries(_target) {
		return (entries) => this.offersTemplates() ? entries : stripTemplateEntries(entries);
	}
	offersTemplates() {
		return surfaceModeSupports(this.mode(), "elementTemplates");
	}
	mode() {
		return this.injector.get("propertiesPanelModeFilter", false)?.getMode() ?? "implement";
	}
};
_defineProperty(PopupMenuModeFilter, "$inject", [
	"popupMenu",
	"eventBus",
	"injector"
]);
var ModeUiModule = {
	__init__: ["popupMenuModeFilter"],
	popupMenuModeFilter: ["type", PopupMenuModeFilter]
};
// ../../packages/bpmn-modeler/src/elementTemplateOffer/hiddenTemplates.ts
var _HiddenTemplates;
var HiddenTemplates = class HiddenTemplates {
	static of(refs) {
		return new HiddenTemplates(new Set(refs.map(elementTemplateRefKey)));
	}
	constructor(hiddenKeys) {
		_defineProperty(this, "hiddenKeys", void 0);
		this.hiddenKeys = hiddenKeys;
	}
	offers(template, latestOfItsId) {
		return !this.hides(template) && !this.hides(latestOfItsId);
	}
	offersTo(template, latestOfItsId, appliedTemplate) {
		return this.offers(template, latestOfItsId) || isSameTemplate(template, appliedTemplate) && isSameTemplate(template, latestOfItsId);
	}
	hides(template) {
		const ref = elementTemplateRefOf(template);
		return ref !== void 0 && this.hiddenKeys.has(elementTemplateRefKey(ref));
	}
};
_HiddenTemplates = HiddenTemplates;
_defineProperty(HiddenTemplates, "NONE", new _HiddenTemplates(new Set()));
function isSameTemplate(template, other) {
	const ref = elementTemplateRefOf(template);
	const otherRef = elementTemplateRefOf(other);
	return ref !== void 0 && otherRef !== void 0 && isSameElementTemplateRef(ref, otherRef);
}
// ../../packages/bpmn-modeler/src/elementTemplateOffer/ElementTemplateOffer.ts
var ElementTemplateOffer = class {
	constructor(elementTemplates) {
		_defineProperty(this, "elementTemplates", void 0);
		_defineProperty(this, "hidden", HiddenTemplates.NONE);
		this.elementTemplates = elementTemplates;
		elementTemplates.getDefault = (element) => elementTemplates.getAll(element).find((template) => template.isDefault && this.isOffered(template)) ?? null;
	}
	setHidden(refs) {
		this.hidden = HiddenTemplates.of(refs);
	}
	isOffered(template) {
		const ref = elementTemplateRefOf(template);
		return this.hidden.offers(template, ref && this.latestOf(ref.id));
	}
	isTemplateIdOffered(templateId) {
		return this.isOffered(this.latestOf(templateId));
	}
	isTemplateIdOfferedTo(element, templateId) {
		const latest = this.latestOf(templateId);
		return this.hidden.offersTo(latest, latest, this.elementTemplates.get(element));
	}
	latestOf(templateId) {
		return this.elementTemplates.getLatest(templateId, { deprecated: true })?.[0];
	}
};
_defineProperty(ElementTemplateOffer, "$inject", ["elementTemplates"]);
// ../../packages/bpmn-modeler/src/elementTemplateOffer/HiddenTemplatePopupFilter.ts
var FILTER_PRIORITY = 100;
var HiddenTemplatePopupFilter = class {
	constructor(popupMenu, offer) {
		_defineProperty(this, "offer", void 0);
		this.offer = offer;
		for (const menu of ELEMENT_POPUP_MENUS) popupMenu.registerProvider(menu, FILTER_PRIORITY, { getPopupMenuEntries: (target) => this.entriesFilter(menu, target) });
	}
	entriesFilter(menu, target) {
		const isOffered = menu === "bpmn-replace" ? (templateId) => this.offer.isTemplateIdOfferedTo(target, templateId) : (templateId) => this.offer.isTemplateIdOffered(templateId);
		return (entries) => {
			const offeredEntries = {};
			for (const [key, entry] of Object.entries(entries)) {
				const templateId = templateIdOfEntryKey(key);
				if (templateId === void 0 || isOffered(templateId)) offeredEntries[key] = entry;
			}
			return offeredEntries;
		};
	}
};
_defineProperty(HiddenTemplatePopupFilter, "$inject", ["popupMenu", "elementTemplateOffer"]);
// ../../packages/bpmn-modeler/src/elementTemplateOffer/index.ts
var ElementTemplateOfferModule = {
	__init__: ["elementTemplateOffer", "hiddenTemplatePopupFilter"],
	elementTemplateOffer: ["type", ElementTemplateOffer],
	hiddenTemplatePopupFilter: ["type", HiddenTemplatePopupFilter]
};
// ../../packages/bpmn-modeler/src/modeler.ts
var DEFAULT_SETTINGS = {
	alignToOrigin: false,
	showTransactionBoundaries: true,
	colorTheme: "automatic"
};
var ALIGN_TO_ORIGIN_OPTIONS = {
	alignOnSave: false,
	offset: 150,
	tolerance: 50
};
var BpmnModeler = class {
	constructor(container, options) {
		_defineProperty(this, "container", void 0);
		_defineProperty(this, "options", void 0);
		_defineProperty(this, "settings", { ...DEFAULT_SETTINGS });
		_defineProperty(this, "engine", void 0);
		_defineProperty(this, "core", void 0);
		_defineProperty(this, "reporter", void 0);
		_defineProperty(this, "lintHandle", void 0);
		_defineProperty(this, "store", new DisposableStore());
		_defineProperty(this, "deliverPendingContentSave", () => Promise.resolve());
		_defineProperty(this, "hiddenElementTemplates", []);
		this.container = container;
		this.options = options;
		this.core = new SurfaceCore(container, [container, options.propertiesPanel.parent]);
		this.reporter = createReporter({
			onWarning: options.onWarning,
			onError: options.onError
		});
		this.lintHandle = createSurfaceLintHandle(this.core, this.reporter);
	}
	get viewport() {
		return this.core.viewport;
	}
	get selection() {
		return this.core.selection;
	}
	get rootElement() {
		return this.core.rootElement;
	}
	captureViewState() {
		return this.core.captureViewState();
	}
	applyViewState(state) {
		this.core.applyViewState(state);
	}
	async init() {
		const engine = this.options.engine;
		this.store.dispose();
		const store = new DisposableStore();
		this.store = store;
		const engineStack = await loadEngineStack(engine);
		if (this.store !== store || store.isDisposed) return;
		const propertiesPanelRootModule = { propertiesPanelRoot: ["value", this.options.propertiesPanel.parent] };
		const commonModules = [
			TranslateModule,
			modeler_default,
			...buildLintModules(this.options.linting, {
				engine,
				mode: normalizeMode(this.options.mode)
			}, {
				onLintResults: this.options.onLintResults,
				onLintingToggled: this.options.onLintingToggled
			}),
			ElementTemplateChooserModule,
			AppendMenuModule,
			createPopupMenuAnnotationsModule(engineStack.popupMenuAnnotations),
			ReplaceTemplatesTabModule,
			FlowNavigationModule,
			createBpmnLayoutModule(),
			propertiesPanelRootModule,
			ModeFilterModule,
			CustomGroupsModule,
			FlushableDebounceInputModule,
			ModeUiModule,
			ElementTemplateOfferModule,
			DrilldownFitModule
		];
		const capModules = capabilityModules(engine, this.options.capabilities);
		const clipModules = installClipboardSupport(this.store, this.options.clipboard, [this.container, this.options.propertiesPanel.parent]);
		const extra = this.options.additionalModules ?? [];
		const modelerOptions = {
			container: this.container,
			propertiesPanel: {
				...engineStack.propertiesPanelDefaults,
				parent: this.options.propertiesPanel.parent,
				feelPopupContainer: this.container
			},
			popupMenu: { defaultTab: BPMN_TAB },
			alignToOrigin: ALIGN_TO_ORIGIN_OPTIONS,
			moddleExtensions: {
				...engineStack.moddleExtensions,
				...this.options.moddleExtensions
			},
			propertiesPanelMode: normalizeMode(this.options.mode)
		};
		this.engine = engine;
		const additionalModules = [
			...engineStack.upstreamModules,
			...commonModules,
			...engineStack.engineModules,
			...capModules,
			...clipModules,
			...extra
		];
		this.core.allocate(this.store, () => this.constructModeler(modelerOptions, additionalModules), {
			extraRoots: [this.options.propertiesPanel.parent],
			handleGlobalEscape: this.options.handleGlobalEscape ?? false,
			hasSearchPad: true
		});
		this.applyHiddenElementTemplates();
		const onElementTemplatesErrors = this.options.onElementTemplatesErrors;
		if (onElementTemplatesErrors) this.store.add(subscribe(this.getModeler(), "elementTemplates.errors", (event) => {
			onElementTemplatesErrors(event.errors ?? []);
		}));
		const onContentSaved = this.options.onContentSaved;
		if (onContentSaved) this.deliverPendingContentSave = wireContentSaved({
			store: this.store,
			eventBus: this.core.service("eventBus"),
			exportDiagram: () => this.exportDiagram(),
			onContentSaved,
			reporter: this.reporter
		});
		this.setModeAttribute(normalizeMode(this.options.mode));
		this.store.add(() => {
			this.container.removeAttribute(MODE_ATTRIBUTE);
			this.options.propertiesPanel.parent.removeAttribute(MODE_ATTRIBUTE);
		});
	}
	constructModeler(modelerOptions, additionalModules) {
		return new Modeler({
			...modelerOptions,
			additionalModules
		});
	}
	applyLintResults(results) {
		this.lintHandle.applyLintResults(results);
	}
	applyLintingDisabled() {
		this.lintHandle.applyLintingDisabled();
	}
	startInPageLinting(config, configToken) {
		this.lintHandle.startInPageLinting(config, configToken);
	}
	destroy() {
		this.store.dispose();
		this.core.releaseManagers();
	}
	onCommandStackChanged(listener) {
		return subscribeCommandStackChanged(this.core, listener);
	}
	onFormatted(listener) {
		return subscribeFormatted(this.core, listener);
	}
	hasPendingInput() {
		return this.core.hasPendingInput();
	}
	flushPendingInput() {
		this.core.flushPendingInput();
	}
	flushContentSaved() {
		return this.deliverPendingContentSave();
	}
	getDefinitions() {
		return this.getModeler().getDefinitions();
	}
	collectInlineScriptTasks() {
		return collectInlineScriptTasks(this.getService("elementRegistry"));
	}
	async newDiagram() {
		const version = this.options.engineVersion ?? getLatestVersion(this.engine);
		const result = await this.getModeler().importXML(initialDiagram(this.engine, version));
		this.refreshAfterImport();
		return result;
	}
	async loadDiagram(bpmn) {
		const result = await importDiagram(this.getModeler(), bpmn);
		this.refreshAfterImport();
		return result;
	}
	refreshAfterImport() {
		this.showTransactionBoundariesIfEnabled();
		this.applyEnginesFromDefinitions();
		this.core.armInitialViewport();
	}
	showTransactionBoundariesIfEnabled() {
		if (engineSupports(this.engine, "transactionBoundaries") && this.settings.showTransactionBoundaries) this.getModeler().get("transactionBoundaries").show();
	}
	async exportDiagram() {
		return exportFormattedXml(this.getModeler());
	}
	async getDiagramSvg() {
		return exportSvg(this.getModeler());
	}
	async formatDiagram() {
		return formatSurfaceDiagram(this.core);
	}
	cleanupDiagram(options) {
		return cleanupSurfaceDiagram(this.core, options);
	}
	setElementTemplates(templates) {
		this.getModeler().get("elementTemplatesLoader").setTemplates(templates);
	}
	setHiddenElementTemplates(refs) {
		this.hiddenElementTemplates = [...refs];
		this.applyHiddenElementTemplates();
	}
	applyHiddenElementTemplates() {
		this.getModeler().get("elementTemplateOffer").setHidden(this.hiddenElementTemplates);
	}
	setSettings(settings) {
		if (!settings) return;
		this.getModeler();
		this.settings = {
			...this.settings,
			...settings
		};
		const showTransactionBoundaries = settings.showTransactionBoundaries;
		if (engineSupports(this.engine, "transactionBoundaries") && showTransactionBoundaries !== void 0) {
			const transactionBoundaries = this.getModeler().get("transactionBoundaries");
			if (showTransactionBoundaries !== transactionBoundaries.active) {
				if (showTransactionBoundaries) transactionBoundaries.show();
				else transactionBoundaries.hide();
			}
		}
		if (settings.favouriteBpmnElements !== void 0) applyFavouriteBpmnElements(this.core, settings.favouriteBpmnElements);
	}
	setFavouriteBpmnElements(types) {
		this.setSettings({ favouriteBpmnElements: [...types] });
	}
	alignElementsToOrigin() {
		if (this.settings.alignToOrigin) this.getModeler().get("alignToOrigin").align();
	}
	getService(name) {
		return this.core.service(name);
	}
	updateScriptFormat(elementId, kind, listenerIndex, scriptFormat) {
		const element = this.findScriptElement(elementId);
		if (element) this.writeScriptField(element, elementId, kind, listenerIndex, "format", scriptFormat);
	}
	updateScriptContent(elementId, kind, listenerIndex, content) {
		const element = this.findScriptElement(elementId);
		if (!element) return;
		this.getModeler().get("scriptSourceWatcher", false)?.noteApplied(elementId, kind, listenerIndex, content);
		this.writeScriptField(element, elementId, kind, listenerIndex, "content", content);
	}
	findScriptElement(elementId) {
		const element = this.getModeler().get("elementRegistry").get(elementId);
		if (!element) this.reporter.warn(`Element not found: ${elementId}`);
		return element;
	}
	writeScriptField(element, elementId, kind, listenerIndex, field, value) {
		const target = resolveScriptWriteTarget(element.businessObject, kind, listenerIndex, field);
		if (!target) {
			this.reporter.warn(`${describeScriptSurface(elementId, kind, listenerIndex)} has no inline script`);
			return;
		}
		this.getModeler().get("modeling").updateModdleProperties(element, target.moddleElement, { [target.propertyName]: value });
	}
	applyOpenScriptEditors(refs) {
		this.getModeler().get("openScriptEditorsStore", false)?.set(refs);
	}
	setTheme(theme) {
		this.core.setTheme(this.store, theme);
	}
	setMode(mode) {
		applyMode(this.modePorts(), mode);
	}
	getMode() {
		return this.getModeler().get("propertiesPanelModeFilter").getMode();
	}
	modePorts() {
		const filter = this.getModeler().get("propertiesPanelModeFilter");
		return {
			getFilterMode: () => filter.getMode(),
			setFilterMode: (mode) => filter.setMode(mode),
			setModeAttribute: (mode) => this.setModeAttribute(mode),
			setLintMode: (mode) => this.getModeler().get("bpmnLintConfig", false)?.setMode(mode),
			onModeChanged: this.options.onModeChanged
		};
	}
	setModeAttribute(mode) {
		this.container.setAttribute(MODE_ATTRIBUTE, mode);
		this.options.propertiesPanel.parent.setAttribute(MODE_ATTRIBUTE, mode);
	}
	applyImplementationStatus(resolved) {
		this.getModeler().get("codeLinkMapClient", false)?.applyStatus(resolved);
	}
	applyEnginesFromDefinitions() {
		const definitions = this.getModeler().getDefinitions();
		const engines = deriveEngines(definitions ? executionPlatformAttributes(definitions) : {});
		this.getModeler().get("elementTemplates", false)?.setEngines(engines);
	}
	getModeler() {
		return this.core.instance;
	}
};
// ../../packages/bpmn-modeler/src/createModeler.ts
async function createModeler(container, options) {
	i18n.extend(extras);
	return createSurface(() => new BpmnModeler(container, options), async (modeler) => {
		await modeler.init();
		if (options.elementTemplates) modeler.setElementTemplates(options.elementTemplates);
		if (options.settings) modeler.setSettings(options.settings);
		modeler.setTheme(options.theme ?? "automatic");
		if (options.locale) i18n.setLanguage(options.locale);
	});
}
export { createModeler };

//# sourceMappingURL=src-ClSm-gG3.js.map