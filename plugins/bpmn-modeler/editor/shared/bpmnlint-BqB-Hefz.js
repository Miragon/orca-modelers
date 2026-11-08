import { a as __toESM, i as __toCommonJS, n as __esmMin, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-7_rZTKki.js";
import { m as _defineProperty } from "./editorLayout-DyS83izk.js";
import { r as surfaceModeSupports } from "../bpmn/main.js";
import { D as map, _ as init_dist$1, g as has, h as groupBy, i as assign, j as reduce, n as escapeHTML, r as domify, s as dist_exports$1, x as isNil } from "./EscapeUtil-3RypN4fl.js";
import { a as dist_exports$2, c as init_dist$4, g as tags, i as init_dist$2, m as styleTags, n as ExternalTokenizer, p as init_dist$3, r as LRParser, t as ContextTracker } from "./dist-CAwPjkp6.js";
import { a as is$1, i as init_ModelUtil } from "./ModelUtil-Qz7TgySP.js";
import { a as moddle_utils_exports, c as require_static_resolver, i as init_moddle_utils, n as dist_exports$3, r as init_dist$5, s as require_semver_compare } from "./dist-CS7WyDVh.js";
//#region ../../libs/modeler-types/src/lint.ts
var LIVE_MODDLE_PREFIXES = new Set([
	"bpmn",
	"bpmndi",
	"dc",
	"di",
	"camunda",
	"zeebe",
	"modeler"
]);
function staticUnresolvedModdleExtensions(config) {
	const declared = config.moddleExtensions;
	if (!declared || typeof declared !== "object") return [];
	const unresolved = [];
	for (const [prefix, value] of Object.entries(declared)) if (!(value != null && typeof value === "object" && LIVE_MODDLE_PREFIXES.has(prefix))) unresolved.push(`moddleExtension:${prefix}`);
	return unresolved;
}
//#endregion
//#region ../../node_modules/bpmnlint/lib/traverse.js
var require_traverse = __commonJSMin(((exports, module) => {
	function isSimpleType(type) {
		return [
			"String",
			"Boolean",
			"Integer",
			"Real"
		].includes(type);
	}
	module.exports = function traverse(element, options) {
		const enter = options.enter;
		const leave = options.leave;
		const enterSubTree = enter && enter(element);
		const descriptor = element.$descriptor;
		if (enterSubTree !== false && !descriptor.isGeneric) descriptor.properties.filter((p) => {
			return !p.isAttr && !p.isReference && !isSimpleType(p.type);
		}).forEach((p) => {
			if (p.name in element) {
				const propertyValue = element[p.name];
				if (p.isMany) propertyValue.forEach((child) => {
					traverse(child, options);
				});
				else traverse(propertyValue, options);
			}
		});
		leave && leave(element);
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/lib/test-rule.js
var require_test_rule = __commonJSMin(((exports, module) => {
	var traverse = require_traverse();
	var { isArray, isObject, isFunction } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var Reporter = class {
		constructor({ moddleRoot, rule }) {
			this.rule = rule;
			this.moddleRoot = moddleRoot;
			this.messages = [];
			this.report = this.report.bind(this);
		}
		report(id, message, path) {
			let report = {
				id,
				message
			};
			if (path && isArray(path)) report = {
				...report,
				path
			};
			if (path && isObject(path)) report = {
				...report,
				...path
			};
			this.messages.push(report);
		}
	};
	module.exports = function testRule({ moddleRoot, rule }) {
		const reporter = new Reporter({
			rule,
			moddleRoot
		});
		const check = rule.check || {};
		const leave = "leave" in check ? check.leave : void 0;
		const enter = "enter" in check ? check.enter : isFunction(check) ? check : void 0;
		if (!enter && !leave) throw new Error("no check implemented");
		traverse(moddleRoot, {
			enter: enter ? (node) => enter(node, reporter) : void 0,
			leave: leave ? (node) => leave(node, reporter) : void 0
		});
		return reporter.messages;
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/lib/linter.js
var require_linter = __commonJSMin(((exports, module) => {
	var testRule = require_test_rule();
	var noopTransformRule = (rule, options) => {
		return rule;
	};
	var categoryMap = {
		0: "off",
		1: "warn",
		2: "error",
		3: "info"
	};
	var ruleErrorCategory = "rule-error";
	function Linter(options) {
		const { config = {}, resolver, transformRule = noopTransformRule } = options || {};
		if (typeof resolver === "undefined") throw new Error("must provide <options.resolver>");
		this.config = config;
		this.resolver = resolver;
		this.transformRule = transformRule;
		this.cachedRules = {};
		this.cachedConfigs = {};
	}
	module.exports = Linter;
	Linter.prototype.applyRule = function applyRule(moddleRoot, ruleDefinition) {
		const { config, rule, category, name } = ruleDefinition;
		try {
			return testRule({
				moddleRoot,
				rule,
				config
			}).map(function(report) {
				return {
					...report,
					meta: rule.meta,
					category
				};
			});
		} catch (e) {
			console.error("rule <" + name + "> failed with error: ", e);
			return [{
				message: e.message,
				category: ruleErrorCategory
			}];
		}
	};
	Linter.prototype.resolveRule = function(name, config) {
		const { pkg, ruleName } = this.parseRuleName(name);
		const id = `${pkg}-${ruleName}`;
		const rule = this.cachedRules[id];
		if (rule) return Promise.resolve(rule);
		return Promise.resolve(this.resolver.resolveRule(pkg, ruleName)).then((ruleFactory) => {
			if (!ruleFactory) throw new Error(`unknown rule <${name}>`);
			return this.cachedRules[id] = this.transformRule(ruleFactory(config), {
				pkg,
				ruleName
			});
		});
	};
	Linter.prototype.resolveConfig = function(name) {
		const { pkg, configName } = this.parseConfigName(name);
		const id = `${pkg}-${configName}`;
		const config = this.cachedConfigs[id];
		if (config) return Promise.resolve(config);
		return Promise.resolve(this.resolver.resolveConfig(pkg, configName)).then((config) => {
			if (!config) throw new Error(`unknown config <${name}>`);
			return this.cachedConfigs[id] = this.normalizeConfig(config, pkg);
		});
	};
	Linter.prototype.resolveRules = function(config) {
		return this.resolveConfiguredRules(config).then((rulesConfig) => {
			const loaders = Object.entries(rulesConfig).map(([name, value]) => {
				const { category, config } = this.parseRuleValue(value);
				return {
					name,
					category,
					config
				};
			}).filter((definition) => definition.category !== "off").map((definition) => {
				const { name, config } = definition;
				return this.resolveRule(name, config).then(function(rule) {
					return {
						...definition,
						rule
					};
				});
			});
			return Promise.all(loaders);
		});
	};
	Linter.prototype.resolveConfiguredRules = function(config) {
		let parents = config.extends;
		if (typeof parents === "string") parents = [parents];
		if (typeof parents === "undefined") parents = [];
		return Promise.all(parents.map((configName) => {
			return this.resolveConfig(configName).then((config) => {
				return this.resolveConfiguredRules(config);
			});
		})).then((inheritedRules) => {
			const overrideRules = this.normalizeConfig(config, "bpmnlint").rules;
			return [...inheritedRules, overrideRules].reduce((rules, currentRules) => {
				return {
					...rules,
					...currentRules
				};
			}, {});
		});
	};
	Linter.prototype.lint = function(moddleRoot, config) {
		config = config || this.config;
		return this.resolveRules(config).then((ruleDefinitions) => {
			const allReports = {};
			ruleDefinitions.forEach((ruleDefinition) => {
				const { name } = ruleDefinition;
				const reports = this.applyRule(moddleRoot, ruleDefinition);
				if (reports.length) allReports[name] = reports;
			});
			return allReports;
		});
	};
	Linter.prototype.parseRuleValue = function(value) {
		let category;
		let config;
		if (Array.isArray(value)) {
			category = value[0];
			config = value[1];
		} else {
			category = value;
			config = {};
		}
		if (typeof category === "string") category = category.toLowerCase();
		category = categoryMap[category] || category;
		return {
			config,
			category
		};
	};
	Linter.prototype.parseRuleName = function(name, localPackage = "bpmnlint") {
		const match = /^(?:(?:(@[^/]+)\/)?([^@]{1}[^/]*)\/)?([^/]+)$/.exec(name);
		if (!match) throw new Error(`unparseable rule name <${name}>`);
		const [_, ns, packageName, ruleName] = match;
		if (!packageName) return {
			pkg: localPackage,
			ruleName
		};
		return {
			pkg: `${ns ? ns + "/" : ""}${prefixPackage(packageName)}`,
			ruleName
		};
	};
	Linter.prototype.parseConfigName = function(name) {
		const match = /^(?:(?:plugin:(?:(@[^/]+)\/)?([^@]{1}[^/]*)\/)|bpmnlint:)([^/]+)$/.exec(name);
		if (!match) throw new Error(`unparseable config name <${name}>`);
		const [_, ns, packageName, configName] = match;
		if (!packageName) return {
			pkg: "bpmnlint",
			configName
		};
		return {
			pkg: `${ns ? ns + "/" : ""}${prefixPackage(packageName)}`,
			configName
		};
	};
	Linter.prototype.getSimplePackageName = function(name) {
		const match = /^(?:(@[^/]+)\/)?([^/]+)$/.exec(name);
		if (!match) throw new Error(`unparseable package name <${name}>`);
		const [_, ns, packageName] = match;
		return `${ns ? ns + "/" : ""}${unprefixPackage(packageName)}`;
	};
	Linter.prototype.normalizeConfig = function(config, localPackage) {
		const rules = config.rules || {};
		const validatedRules = Object.keys(rules).reduce((normalizedRules, name) => {
			const value = rules[name];
			const { pkg, ruleName } = this.parseRuleName(name, localPackage);
			const normalizedName = pkg === "bpmnlint" ? ruleName : `${this.getSimplePackageName(pkg)}/${ruleName}`;
			normalizedRules[normalizedName] = value;
			return normalizedRules;
		}, {});
		return {
			...config,
			rules: validatedRules
		};
	};
	function prefixPackage(pkg) {
		if (pkg === "bpmnlint") return "bpmnlint";
		if (pkg.startsWith("bpmnlint-plugin-")) return pkg;
		return `bpmnlint-plugin-${pkg}`;
	}
	function unprefixPackage(pkg) {
		if (pkg.startsWith("bpmnlint-plugin-")) return pkg.substring(16);
		return pkg;
	}
}));
//#endregion
//#region ../../node_modules/bpmn-js-bpmnlint/dist/index.esm.js
var import_lib = __commonJSMin(((exports, module) => {
	module.exports = { Linter: require_linter() };
}))();
init_dist$1();
init_ModelUtil();
function EditorActions(injector, linting) {
	var editorActions = injector.get("editorActions", false);
	editorActions && editorActions.register({ toggleLinting: function() {
		linting.toggle();
	} });
}
EditorActions.$inject = ["injector", "linting"];
var ErrorSvg = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg\n   version=\"1.1\"\n   viewBox=\"0 0 512 512\"\n   xmlns=\"http://www.w3.org/2000/svg\"\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\n  <path\n     d=\"M 339.07183,256.00001 463.66713,131.4047 c 15.28961,-15.2896 15.28961,-40.079175 0,-55.381227 l -27.6906,-27.690611 c -15.28961,-15.289602 -40.07917,-15.289602 -55.38123,0 L 256,172.92818 131.4047,48.332862 c -15.2896,-15.289602 -40.079177,-15.289602 -55.381228,0 L 48.332861,76.023473 c -15.2896,15.2896 -15.2896,40.079177 0,55.381227 L 172.92815,256.00001 48.332861,380.59531 c -15.2896,15.2896 -15.2896,40.07917 0,55.38123 l 27.690611,27.69061 c 15.289601,15.28959 40.091628,15.28959 55.381228,0 L 256,339.07184 380.5953,463.66715 c 15.2896,15.28959 40.09162,15.28959 55.38123,0 l 27.6906,-27.69061 c 15.28961,-15.2896 15.28961,-40.07918 0,-55.38123 z\"\n     fill=\"currentColor\" />\n</svg>\n";
var WarningSvg = "<svg version=\"1.1\" viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"m256 323.95c-45.518 0-82.419 34.576-82.419 77.229 0 42.652 36.9 77.229 82.419 77.229 45.518 0 82.419-34.577 82.419-77.23 0-42.652-36.9-77.229-82.419-77.229zm-80.561-271.8 11.61 204.35c.544 9.334 8.78 16.64 18.755 16.64h100.39c9.975 0 18.211-7.306 18.754-16.64l11.611-204.35c.587-10.082-7.98-18.56-18.754-18.56h-123.62c-10.775 0-19.34 8.478-18.753 18.56z\" fill=\"currentColor\"/>\n</svg>\n";
var SuccessSvg = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg\n   viewBox=\"0 0 512 512\"\n   version=\"1.1\"\n   xmlns=\"http://www.w3.org/2000/svg\"\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\n  <path\n     fill=\"currentColor\"\n     d=\"m 173.898,439.40356 -166.4,-166.4 c -9.997,-9.997 -9.997,-26.206 0,-36.204 l 36.203,-36.204 c 9.997,-9.998 26.207,-9.998 36.204,0 L 192,312.68956 432.095,72.595562 c 9.997,-9.997 26.207,-9.997 36.204,0 l 36.203,36.203998 c 9.997,9.997 9.997,26.206 0,36.204 l -294.4,294.401 c -9.998,9.997 -26.207,9.997 -36.204,-10e-4 z\" />\n</svg>\n";
var InfoSvg = "<svg\n  viewBox=\"3.5 3.5 9 9\"\n  version=\"1.1\"\n  xmlns=\"http://www.w3.org/2000/svg\">\n  <path\n    fill=\"currentColor\" d=\"M6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z\"></path>\n</svg>";
var OFFSET_TOP = -7;
var OFFSET_RIGHT = -7;
var LOW_PRIORITY = 500;
var emptyConfig = {
	resolver: { resolveRule: function() {
		return null;
	} },
	config: {}
};
var stateToIcon = {
	error: ErrorSvg,
	warning: WarningSvg,
	success: SuccessSvg,
	info: InfoSvg,
	inactive: SuccessSvg
};
function Linting(bpmnjs, canvas, config, elementRegistry, eventBus, overlays, translate) {
	this._bpmnjs = bpmnjs;
	this._canvas = canvas;
	this._elementRegistry = elementRegistry;
	this._eventBus = eventBus;
	this._overlays = overlays;
	this._translate = translate;
	this._issues = {};
	this._active = config && config.active || false;
	this._linterConfig = emptyConfig;
	this._overlayIds = {};
	var self = this;
	eventBus.on([
		"import.done",
		"elements.changed",
		"linting.configChanged",
		"linting.toggle"
	], LOW_PRIORITY, function(e) {
		self.update();
	});
	eventBus.on("linting.toggle", function(event) {
		if (!event.active) {
			self._clearIssues();
			self._updateButton();
		}
	});
	eventBus.on("diagram.clear", function() {
		self._clearIssues();
	});
	var linterConfig = config && config.bpmnlint;
	linterConfig && eventBus.once("diagram.init", function() {
		if (self.getLinterConfig() !== emptyConfig) return;
		try {
			self.setLinterConfig(linterConfig);
		} catch (err) {
			console.error("[bpmn-js-bpmnlint] Invalid lint rules configured. Please doublecheck your linting.bpmnlint configuration, cf. https://github.com/bpmn-io/bpmn-js-bpmnlint#configure-lint-rules");
		}
	});
	this._init();
}
Linting.prototype.setLinterConfig = function(linterConfig) {
	if (!linterConfig.config || !linterConfig.resolver) throw new Error("Expected linterConfig = { config, resolver }");
	this._linterConfig = linterConfig;
	this._eventBus.fire("linting.configChanged");
};
Linting.prototype.getLinterConfig = function() {
	return this._linterConfig;
};
Linting.prototype._init = function() {
	this._createButton();
	this._updateButton();
};
Linting.prototype.isActive = function() {
	return this._active;
};
Linting.prototype._formatIssues = function(issues) {
	let self = this;
	let reports = reduce(issues, function(reports, ruleReports, rule) {
		return reports.concat(ruleReports.map(function(report) {
			report.rule = rule;
			return report;
		}));
	}, []);
	const participantBos = self._elementRegistry.filter((ele) => {
		return is$1(ele, "bpmn:Participant");
	}).map((ele) => {
		return ele.businessObject;
	});
	reports = map(reports, function(report) {
		if (!self._elementRegistry.get(report.id)) {
			report.isChildIssue = true;
			report.actualElementId = report.id;
			const referringParticipant = participantBos.filter((ele) => {
				return ele.processRef && ele.processRef.id && ele.processRef.id === report.id;
			});
			if (referringParticipant.length) report.id = referringParticipant[0].id;
			else report.id = self._canvas.getRootElement().id;
		}
		return report;
	});
	reports = groupBy(reports, function(report) {
		return report.id;
	});
	return reports;
};
Linting.prototype.toggle = function(newActive) {
	newActive = typeof newActive === "undefined" ? !this.isActive() : newActive;
	this._setActive(newActive);
	return newActive;
};
Linting.prototype._setActive = function(active) {
	if (this._active === active) return;
	this._active = active;
	this._eventBus.fire("linting.toggle", { active });
};
Linting.prototype.update = function() {
	var self = this;
	if (!this._bpmnjs.getDefinitions()) return;
	var lintStart = this._lintStart = Math.random();
	this.lint().then(function(newIssues) {
		if (self._lintStart !== lintStart) return;
		newIssues = self._formatIssues(newIssues);
		var remove = {}, update = {}, add = {};
		for (var id1 in self._issues) if (!newIssues[id1]) remove[id1] = self._issues[id1];
		for (var id2 in newIssues) if (!self._issues[id2]) add[id2] = newIssues[id2];
		else if (newIssues[id2] !== self._issues[id2]) update[id2] = newIssues[id2];
		remove = assign(remove, update);
		add = assign(add, update);
		self._clearOverlays();
		if (self.isActive()) self._createIssues(add);
		self._issues = newIssues;
		self._updateButton();
		self._fireComplete(newIssues);
	});
};
Linting.prototype._fireComplete = function(issues) {
	this._eventBus.fire("linting.completed", { issues });
};
Linting.prototype._createIssues = function(issues) {
	for (var id in issues) this._createElementIssues(id, issues[id]);
};
Linting.prototype._createElementIssues = function(elementId, elementIssues) {
	var element = this._elementRegistry.get(elementId);
	if (!element) return;
	var plane = this._elementRegistry.get(elementId + "_plane");
	if (plane) this._createElementIssues(plane.id, elementIssues);
	var menuPosition;
	var position;
	var isRoot = !element.parent;
	if (isRoot && is$1(element, "bpmn:Process")) {
		menuPosition = "bottom-right";
		position = {
			top: 20,
			left: 150
		};
	} else if (isRoot && is$1(element, "bpmn:SubProcess")) {
		menuPosition = "bottom-right";
		position = {
			top: 50,
			left: 150
		};
	} else {
		menuPosition = "top-right";
		position = {
			top: OFFSET_TOP,
			left: OFFSET_RIGHT
		};
	}
	var issuesByType = groupBy(elementIssues, function(elementIssue) {
		return (elementIssue.isChildIssue ? "child" : "") + elementIssue.category;
	});
	var errors = issuesByType.error, warnings = issuesByType.warn, infos = issuesByType.info, childErrors = issuesByType.childerror, childWarnings = issuesByType.childwarn, childInfos = issuesByType.childinfo;
	if (!infos && !errors && !warnings && !childErrors && !childWarnings && !childInfos) return;
	var $html = domify("<div class=\"bjsl-overlay bjsl-issues-" + menuPosition + "\"></div>");
	var $icon = errors || childErrors ? domify("<div class=\"bjsl-icon bjsl-icon-error\">" + ErrorSvg + "</div>") : warnings || childWarnings ? domify("<div class=\"bjsl-icon bjsl-icon-warning\">" + WarningSvg + "</div>") : domify("<div class=\"bjsl-icon bjsl-icon-info\">" + InfoSvg + "</div>");
	var $dropdown = domify("<div class=\"bjsl-dropdown\"></div>");
	var $dropdownContent = domify("<div class=\"bjsl-dropdown-content\"></div>");
	var $issueContainer = domify("<div class=\"bjsl-issues\"></div>");
	var $issues = domify("<div class=\"bjsl-current-element-issues\"></div>");
	var $issueList = domify("<ul></ul>");
	$html.appendChild($icon);
	$html.appendChild($dropdown);
	$dropdown.appendChild($dropdownContent);
	$dropdownContent.appendChild($issueContainer);
	$issueContainer.appendChild($issues);
	$issues.appendChild($issueList);
	if (errors) this._addErrors($issueList, errors);
	if (warnings) this._addWarnings($issueList, warnings);
	if (infos) this._addInfos($issueList, infos);
	if (childErrors || childWarnings || childInfos) {
		var $childIssues = domify("<div class=\"bjsl-child-issues\"></div>");
		var $childIssueList = domify("<ul></ul>");
		var childLabel = this._translate("Issues for child elements");
		var $childIssueLabel = domify("<a class=\"bjsl-issue-heading\">" + childLabel + ":</a>");
		if (childErrors) this._addErrors($childIssueList, childErrors);
		if (childWarnings) this._addWarnings($childIssueList, childWarnings);
		if (childInfos) this._addInfos($childIssueList, childInfos);
		if (errors || warnings) {
			var $childIssuesSeparator = domify("<hr/>");
			$childIssues.appendChild($childIssuesSeparator);
		}
		$childIssues.appendChild($childIssueLabel);
		$childIssues.appendChild($childIssueList);
		$issueContainer.appendChild($childIssues);
	}
	this._overlayIds[elementId] = this._overlays.add(element, "linting", {
		position,
		html: $html,
		scale: { min: .7 }
	});
};
Linting.prototype._addErrors = function($ul, errors) {
	var self = this;
	errors.forEach(function(error) {
		self._addEntry($ul, "error", error);
	});
};
Linting.prototype._addWarnings = function($ul, warnings) {
	var self = this;
	warnings.forEach(function(error) {
		self._addEntry($ul, "warning", error);
	});
};
Linting.prototype._addInfos = function($ul, infos) {
	var self = this;
	infos.forEach(function(error) {
		self._addEntry($ul, "info", error);
	});
};
Linting.prototype._addEntry = function($ul, state, entry) {
	var rule = entry.rule, documentationUrl = entry.meta?.documentation.url, message = this._translate(entry.message), actualElementId = entry.actualElementId;
	var icon = stateToIcon[state];
	var $entry = domify(`
    <li class="${state}" data-rule="${escapeHTML(rule)}">
      <span class="icon">${icon}</span>
      <span class="message">${escapeHTML(message)}</span>
      <span class="rule">(${documentationUrl ? `<a href="${escapeHTML(documentationUrl)}" target="_blank">${escapeHTML(rule)}</a>` : escapeHTML(rule)})</span>
      ${actualElementId ? `<span class="bjsl-id-hint"><code>${escapeHTML(actualElementId)}</code></span>` : ""}
    </li>
  `);
	$ul.appendChild($entry);
};
Linting.prototype._clearOverlays = function() {
	this._overlays.remove({ type: "linting" });
	this._overlayIds = {};
};
Linting.prototype._clearIssues = function() {
	this._issues = {};
	this._clearOverlays();
};
Linting.prototype._setButtonState = function(issues) {
	var { errors, warnings, infos } = issues;
	var button = this._button;
	var state = errors && "error" || warnings && "warning" || "success";
	var html = `
    <span class="icon">${stateToIcon[state]}</span>
    <span>${this._translate(errors || warnings ? "{errors} Errors, {warnings} Warnings" : "No Issues", {
		errors: String(errors),
		warnings: String(warnings),
		infos: String(infos)
	})}</span>`;
	state = this.isActive() ? state : "inactive";
	[
		"error",
		"inactive",
		"success",
		"warning"
	].forEach(function(s) {
		if (state === s) button.classList.add("bjsl-button-" + s);
		else button.classList.remove("bjsl-button-" + s);
	});
	button.innerHTML = html;
};
Linting.prototype._updateButton = function() {
	var errors = 0, warnings = 0, infos = 0;
	for (var id in this._issues) this._issues[id].forEach(function(issue) {
		if (issue.category === "error") errors++;
		else if (issue.category === "warn") warnings++;
		else if (issue.category === "info") infos++;
	});
	this._setButtonState({
		errors,
		warnings,
		infos
	});
};
Linting.prototype._createButton = function() {
	var self = this;
	this._button = domify("<button class=\"bjsl-button bjsl-button-inactive\" title=\"" + this._translate("Toggle linting overlays") + "\"></button>");
	this._button.addEventListener("click", function() {
		self.toggle();
	});
	this._canvas.getContainer().appendChild(this._button);
};
Linting.prototype.lint = function() {
	var definitions = this._bpmnjs.getDefinitions();
	return new import_lib.Linter(this._linterConfig).lint(definitions);
};
Linting.$inject = [
	"bpmnjs",
	"canvas",
	"config.linting",
	"elementRegistry",
	"eventBus",
	"overlays",
	"translate"
];
var index = {
	__init__: ["linting", "lintingEditorActions"],
	linting: ["type", Linting],
	lintingEditorActions: ["type", EditorActions]
};
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-5Z2DQ3NL.js
var __defProp = Object.defineProperty;
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};
function defineRule(declaration, RuleClass) {
	const factory = (config) => {
		const rule = new RuleClass(config);
		return { check: (node, reporter) => rule.check(node, reporter) };
	};
	return Object.assign(factory, declaration);
}
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-THB6PM2P.js
var bboxOfPoints = (points) => points.reduce((box, point) => ({
	minX: Math.min(box.minX, point.x),
	minY: Math.min(box.minY, point.y),
	maxX: Math.max(box.maxX, point.x),
	maxY: Math.max(box.maxY, point.y)
}), {
	minX: Infinity,
	minY: Infinity,
	maxX: -Infinity,
	maxY: -Infinity
});
var bboxOfRect = (rect) => ({
	minX: rect.x,
	minY: rect.y,
	maxX: rect.x + rect.width,
	maxY: rect.y + rect.height
});
var bboxDisjoint = (first, second) => first.maxX < second.minX || second.maxX < first.minX || first.maxY < second.minY || second.maxY < first.minY;
var isFiniteSpan = (low, high) => high - low >= 0 && high - low < Infinity;
var isWellFormedBbox = (box) => isFiniteSpan(box.minX, box.maxX) && isFiniteSpan(box.minY, box.maxY);
var BboxIndex = class {
	constructor(boxes) {
		_defineProperty(this, "boxes", void 0);
		_defineProperty(this, "extent", void 0);
		_defineProperty(this, "cellsPerAxis", void 0);
		_defineProperty(this, "cellWidth", void 0);
		_defineProperty(this, "cellHeight", void 0);
		_defineProperty(this, "cells", void 0);
		_defineProperty(this, "allIndices", void 0);
		_defineProperty(this, "unfiledIndices", []);
		this.boxes = boxes;
		this.extent = bboxOfPoints(boxes.filter(isWellFormedBbox).flatMap((box) => [{
			x: box.minX,
			y: box.minY
		}, {
			x: box.maxX,
			y: box.maxY
		}]));
		this.cellsPerAxis = Math.ceil(Math.sqrt(boxes.length)) || 1;
		this.cellWidth = (this.extent.maxX - this.extent.minX) / this.cellsPerAxis || 1;
		this.cellHeight = (this.extent.maxY - this.extent.minY) / this.cellsPerAxis || 1;
		this.cells = Array.from({ length: this.cellsPerAxis * this.cellsPerAxis }, () => []);
		this.allIndices = Array.from(boxes.keys());
		for (const index of this.allIndices) {
			const covered = this.cellsOfLocalBox(boxes[index]);
			if (covered) covered.forEach((cell) => cell.push(index));
			else this.unfiledIndices.push(index);
		}
	}
	overlapping(query) {
		const overlapsQuery = (index) => !bboxDisjoint(this.boxes[index], query);
		const covered = this.cellsOfLocalBox(query);
		if (!covered) return this.allIndices.filter(overlapsQuery);
		const filedOverlaps = new Set(covered.flat().filter(overlapsQuery));
		return [...this.unfiledIndices.filter(overlapsQuery), ...filedOverlaps].sort((first, second) => first - second);
	}
	cellAlongAxis(offset, cellSize) {
		const cell = Math.floor(offset / cellSize);
		return cell > 0 ? Math.min(cell, this.cellsPerAxis - 1) : 0;
	}
	cellsOfLocalBox(box) {
		if (!isWellFormedBbox(box)) return;
		const firstColumn = this.cellAlongAxis(box.minX - this.extent.minX, this.cellWidth);
		const lastColumn = this.cellAlongAxis(box.maxX - this.extent.minX, this.cellWidth);
		const firstRow = this.cellAlongAxis(box.minY - this.extent.minY, this.cellHeight);
		const lastRow = this.cellAlongAxis(box.maxY - this.extent.minY, this.cellHeight);
		if ((lastColumn - firstColumn + 1) * (lastRow - firstRow + 1) > this.cellsPerAxis) return;
		const covered = [];
		for (let row = firstRow; row <= lastRow; row++) for (let column = firstColumn; column <= lastColumn; column++) covered.push(this.cells[row * this.cellsPerAxis + column]);
		return covered;
	}
};
var near = (first, second, tolerance) => Math.abs(first - second) <= tolerance;
var withinSpan = (value, low, high, tolerance) => value >= low - tolerance && value <= high + tolerance;
function attachSide(point, rect, tolerance = 5) {
	const right = rect.x + rect.width;
	const bottom = rect.y + rect.height;
	const sides = [];
	if (near(point.x, rect.x, tolerance) && withinSpan(point.y, rect.y, bottom, tolerance)) sides.push("left");
	if (near(point.x, right, tolerance) && withinSpan(point.y, rect.y, bottom, tolerance)) sides.push("right");
	if (near(point.y, rect.y, tolerance) && withinSpan(point.x, rect.x, right, tolerance)) sides.push("top");
	if (near(point.y, bottom, tolerance) && withinSpan(point.x, rect.x, right, tolerance)) sides.push("bottom");
	return sides.length === 1 ? sides[0] : null;
}
var OUTWARD_NORMAL = {
	left: {
		x: -1,
		y: 0
	},
	right: {
		x: 1,
		y: 0
	},
	top: {
		x: 0,
		y: -1
	},
	bottom: {
		x: 0,
		y: 1
	}
};
var stubLength = (dock, next, side) => {
	const normal = OUTWARD_NORMAL[side];
	return (next.x - dock.x) * normal.x + (next.y - dock.y) * normal.y;
};
var verticalCenter = (rect) => rect.y + rect.height / 2;
var horizontalCenter = (rect) => rect.x + rect.width / 2;
var isBackwardFlow = (source, target, tolerance = 10) => horizontalCenter(target) < horizontalCenter(source) - tolerance;
var sameRow = (first, second, tolerance = 10) => Math.abs(verticalCenter(first) - verticalCenter(second)) <= tolerance;
function gatewayTipSide(point, rect, tolerance = 5) {
	const centerX = horizontalCenter(rect);
	const centerY = verticalCenter(rect);
	const tips = {
		top: {
			x: centerX,
			y: rect.y
		},
		right: {
			x: rect.x + rect.width,
			y: centerY
		},
		bottom: {
			x: centerX,
			y: rect.y + rect.height
		},
		left: {
			x: rect.x,
			y: centerY
		}
	};
	let best = null;
	let bestDist = Infinity;
	for (const side of Object.keys(tips)) {
		const tip = tips[side];
		const dist = Math.hypot(point.x - tip.x, point.y - tip.y);
		if (dist < bestDist) {
			bestDist = dist;
			best = side;
		}
	}
	return bestDist <= tolerance ? best : null;
}
var sideOfLine = (lineStart, lineEnd, point) => Math.sign((lineEnd.x - lineStart.x) * (point.y - lineStart.y) - (lineEnd.y - lineStart.y) * (point.x - lineStart.x));
var segments = (waypoints) => waypoints.slice(0, -1).map((point, index) => [point, waypoints[index + 1]]);
function segmentsCross(firstStart, firstEnd, secondStart, secondEnd) {
	const secondStartSide = sideOfLine(firstStart, firstEnd, secondStart);
	const secondEndSide = sideOfLine(firstStart, firstEnd, secondEnd);
	const firstStartSide = sideOfLine(secondStart, secondEnd, firstStart);
	const firstEndSide = sideOfLine(secondStart, secondEnd, firstEnd);
	return secondStartSide * secondEndSide < 0 && firstStartSide * firstEndSide < 0;
}
function isOrthogonalPath(waypoints, toleranceDeg = 10) {
	const maxRatio = Math.tan(toleranceDeg * Math.PI / 180);
	for (const [start, end] of segments(waypoints)) {
		const deltaX = Math.abs(end.x - start.x);
		const deltaY = Math.abs(end.y - start.y);
		const shorter = Math.min(deltaX, deltaY);
		const longer = Math.max(deltaX, deltaY);
		if (longer < 1e-6) continue;
		if (shorter / longer > maxRatio) return false;
	}
	return true;
}
var isInside = (point, rect, padding = 1) => point.x > rect.x + padding && point.x < rect.x + rect.width - padding && point.y > rect.y + padding && point.y < rect.y + rect.height - padding;
function segThroughRect(start, end, rect) {
	if (isInside(start, rect) || isInside(end, rect)) return true;
	const corners = [
		{
			x: rect.x,
			y: rect.y
		},
		{
			x: rect.x + rect.width,
			y: rect.y
		},
		{
			x: rect.x + rect.width,
			y: rect.y + rect.height
		},
		{
			x: rect.x,
			y: rect.y + rect.height
		}
	];
	return corners.some((corner, index) => segmentsCross(start, end, corner, corners[(index + 1) % corners.length]));
}
function circleOverlapsRect(center, radius, rect) {
	const nearestX = Math.min(Math.max(center.x, rect.x), rect.x + rect.width);
	const nearestY = Math.min(Math.max(center.y, rect.y), rect.y + rect.height);
	return Math.hypot(center.x - nearestX, center.y - nearestY) < radius;
}
__export({}, {
	BboxIndex: () => BboxIndex,
	attachSide: () => attachSide,
	bboxDisjoint: () => bboxDisjoint,
	bboxOfPoints: () => bboxOfPoints,
	bboxOfRect: () => bboxOfRect,
	circleOverlapsRect: () => circleOverlapsRect,
	gatewayTipSide: () => gatewayTipSide,
	isBackwardFlow: () => isBackwardFlow,
	isOrthogonalPath: () => isOrthogonalPath,
	sameRow: () => sameRow,
	segThroughRect: () => segThroughRect,
	segments: () => segments,
	segmentsCross: () => segmentsCross,
	stubLength: () => stubLength
});
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-FPYC763H.js
var DiagramPlane = class _DiagramPlane {
	constructor(shapes, edges) {
		_defineProperty(this, "shapes", void 0);
		_defineProperty(this, "edges", void 0);
		_defineProperty(this, "sequenceFlows", void 0);
		_defineProperty(this, "shapeById", void 0);
		this.shapes = shapes;
		this.edges = edges;
		this.sequenceFlows = edges.filter((edge) => edge.el.$type === "bpmn:SequenceFlow");
		this.shapeById = new Map(shapes.map((shape) => [shape.el.id, shape]));
	}
	static allOf(definitions) {
		const planes = [];
		for (const diagram of definitions.diagrams || []) if (diagram.plane) planes.push(_DiagramPlane.fromBpmnPlane(diagram.plane));
		return planes;
	}
	static fromBpmnPlane(plane) {
		const shapes = [];
		const edges = [];
		for (const planeElement of plane.planeElement || []) {
			const el = planeElement.bpmnElement;
			if (!el) continue;
			const { $type: type, bounds, waypoint } = planeElement;
			if (type === "bpmndi:BPMNShape" && bounds) shapes.push({
				el,
				bounds,
				isExpanded: planeElement.isExpanded === true
			});
			else if (type === "bpmndi:BPMNEdge" && waypoint && waypoint.length > 1) edges.push({
				el,
				waypoints: waypoint
			});
		}
		return new _DiagramPlane(shapes, edges);
	}
	shapeOf(id) {
		return this.shapeById.get(id);
	}
	boundsOf(id) {
		return this.shapeById.get(id)?.bounds;
	}
};
var PlaneRule = class {
	check(node, reporter) {
		if (node.$type !== "bpmn:Definitions") return;
		for (const plane of DiagramPlane.allOf(node)) this.checkPlane(plane, reporter);
	}
};
var inst = (el, type) => !!el && typeof el.$instanceOf === "function" && el.$instanceOf(type);
function isEnclosingContainer(el, isExpanded) {
	if (inst(el, "bpmn:Participant") || inst(el, "bpmn:Lane") || inst(el, "bpmn:Group")) return true;
	if (inst(el, "bpmn:SubProcess")) return isExpanded === true;
	return false;
}
function isPassableShape(el, isExpanded) {
	return isEnclosingContainer(el, isExpanded) || inst(el, "bpmn:BoundaryEvent") || inst(el, "bpmn:Artifact") || inst(el, "bpmn:ItemAwareElement");
}
var flowEndpointIds = (flow) => [flow.sourceRef && flow.sourceRef.id, flow.targetRef && flow.targetRef.id].filter(Boolean);
var MARKER_ROW = {
	offsetFromBottom: 20,
	height: 13
};
var SINGLE_MARKER_REACH = 8;
var NEIGHBOUR_MARKER_REACH = 25;
var TASK_TYPE_ICON = {
	x: 5,
	y: 5,
	width: 21,
	height: 18
};
function markerRowZone({ el, bounds, isExpanded }) {
	const isAdHoc = inst(el, "bpmn:AdHocSubProcess");
	const isCollapsed = inst(el, "bpmn:CallActivity") || inst(el, "bpmn:SubProcess") && !isExpanded;
	const hasLoop = !!el.loopCharacteristics;
	if (!isAdHoc && !isCollapsed && !hasLoop) return null;
	const loopSitsLeftOfNeighbour = hasLoop && (isCollapsed || isAdHoc);
	const adHocSitsRightOfNeighbour = isAdHoc && isCollapsed;
	const reachLeft = loopSitsLeftOfNeighbour ? NEIGHBOUR_MARKER_REACH : SINGLE_MARKER_REACH;
	const reachRight = adHocSitsRightOfNeighbour ? NEIGHBOUR_MARKER_REACH : SINGLE_MARKER_REACH;
	return {
		x: bounds.x + bounds.width / 2 - reachLeft,
		y: bounds.y + bounds.height - MARKER_ROW.offsetFromBottom,
		width: reachLeft + reachRight,
		height: MARKER_ROW.height
	};
}
var hasTaskTypeIcon = (el) => inst(el, "bpmn:Task") && el.$type !== "bpmn:Task";
function markerZones(shape) {
	const zones = [];
	const markerRow = markerRowZone(shape);
	if (markerRow) zones.push({
		label: "activity marker",
		zone: markerRow
	});
	if (hasTaskTypeIcon(shape.el)) zones.push({
		label: "task type icon",
		zone: {
			...TASK_TYPE_ICON,
			x: shape.bounds.x + TASK_TYPE_ICON.x,
			y: shape.bounds.y + TASK_TYPE_ICON.y
		}
	});
	return zones;
}
__export({}, {
	DiagramPlane: () => DiagramPlane,
	PlaneRule: () => PlaneRule,
	flowEndpointIds: () => flowEndpointIds,
	inst: () => inst,
	isPassableShape: () => isPassableShape,
	markerZones: () => markerZones
});
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-XEGT6JGH.js
var DEFAULT_EXEMPT_TYPES = ["bpmn:Gateway", "bpmn:BoundaryEvent"];
var FlowTargetAlignment = class extends PlaneRule {
	constructor(config) {
		super();
		_defineProperty(this, "exemptTypes", void 0);
		this.exemptTypes = config?.exemptTypes ?? DEFAULT_EXEMPT_TYPES;
	}
	checkPlane(plane, reporter) {
		for (const flow of plane.sequenceFlows) {
			const source = flow.el.sourceRef;
			const target = flow.el.targetRef;
			if (!source || !target || this.isExempt(source) || this.isExempt(target)) continue;
			const sourceRect = this.readingLineRect(source, plane);
			const targetRect = this.readingLineRect(target, plane);
			if (!sourceRect || !targetRect) continue;
			if (!sameRow(sourceRect, targetRect)) reporter.report(flow.el.id, `Sequence flow connects <${source.id}> to <${target.id}> at a different height; an outgoing flow's target should sit at the same height as its source`);
		}
	}
	isExempt(el) {
		return this.exemptTypes.some((type) => inst(el, type));
	}
	readingLineRect(el, plane) {
		const shape = plane.shapeOf(el.id);
		if (!shape) return null;
		if (inst(el, "bpmn:SubProcess") && shape.isExpanded) return this.innerStartEventBounds(el, plane);
		return shape.bounds;
	}
	innerStartEventBounds(subProcess, plane) {
		const starts = (subProcess.flowElements ?? []).filter((child) => inst(child, "bpmn:StartEvent"));
		if (starts.length !== 1) return null;
		return plane.boundsOf(starts[0].id) ?? null;
	}
};
var flow_target_alignment_default = defineRule({
	ruleName: "flow-target-alignment",
	kind: "layout-hint"
}, FlowTargetAlignment);
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-4VVBP7SW.js
var FlowThroughElement = class extends PlaneRule {
	checkPlane(plane, reporter) {
		const obstacles = plane.shapes.filter((shape) => !isPassableShape(shape.el, shape.isExpanded));
		const obstacleIndex = new BboxIndex(obstacles.map((shape) => bboxOfRect(shape.bounds)));
		for (const flow of plane.sequenceFlows) {
			const connected = this.connectedShapeIds(flow);
			const flowSegments = segments(flow.waypoints);
			for (const index of obstacleIndex.overlapping(bboxOfPoints(flow.waypoints))) {
				const shape = obstacles[index];
				if (connected.has(shape.el.id)) continue;
				if (flowSegments.some(([start, end]) => segThroughRect(start, end, shape.bounds))) reporter.report(flow.el.id, `Sequence flow is routed through element <${shape.el.id}>`);
			}
		}
	}
	connectedShapeIds(flow) {
		const connected = new Set(flowEndpointIds(flow.el));
		for (const ref of [flow.el.sourceRef, flow.el.targetRef]) if (inst(ref, "bpmn:BoundaryEvent") && ref.attachedToRef) connected.add(ref.attachedToRef.id);
		return connected;
	}
};
var flow_through_element_default = defineRule({
	ruleName: "flow-through-element",
	kind: "layout-hint"
}, FlowThroughElement);
//#endregion
//#region ../../node_modules/bpmnlint-utils/dist/index.esm.js
var index_esm_exports = __exportAll({
	is: () => is,
	isAny: () => isAny
});
function is(node, type) {
	if (type.indexOf(":") === -1) type = "bpmn:" + type;
	return typeof node.$instanceOf === "function" ? node.$instanceOf(type) : node.$type === type;
}
function isAny(node, types) {
	return types.some(function(type) {
		return is(node, type);
	});
}
var init_index_esm = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-YJEQYLP2.js
init_index_esm();
var CASES = {
	PascalCase: {
		pattern: /^[A-Z][A-Za-z0-9]*$/,
		label: "PascalCase"
	},
	camelCase: {
		pattern: /^[a-z][A-Za-z0-9]*$/,
		label: "camelCase"
	},
	snake_case: {
		pattern: /^[a-z0-9]+(_[a-z0-9]+)*$/,
		label: "snake_case"
	},
	"kebab-case": {
		pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
		label: "kebab-case"
	},
	any: {
		pattern: /^.+$/,
		label: "any"
	}
};
var PASCAL_CASE = CASES.PascalCase;
function resolveCase(caseName) {
	return (Object.prototype.hasOwnProperty.call(CASES, caseName) ? CASES[caseName] : void 0) ?? PASCAL_CASE;
}
var EVENT_DEFINITION_SUFFIX = "EventDefinition";
function qualifierOf(definition) {
	const type = definition.$type ?? "";
	const local = type.slice(type.indexOf(":") + 1);
	if (!local.endsWith(EVENT_DEFINITION_SUFFIX) || local.length === EVENT_DEFINITION_SUFFIX.length) return null;
	const name = local.slice(0, -EVENT_DEFINITION_SUFFIX.length);
	return name.charAt(0).toLowerCase() + name.slice(1);
}
function eventQualifiers(node) {
	const qualifiers = (node.eventDefinitions ?? []).map(qualifierOf).filter((qualifier) => qualifier !== null);
	return [...new Set(qualifiers)];
}
function qualify(qualifier, prefix) {
	return `${qualifier}${prefix.charAt(0).toUpperCase()}${prefix.slice(1)}`;
}
var DEFAULT_PREFIXES = {
	"bpmn:StartEvent": "startEvent_",
	"bpmn:EndEvent": "endEvent_",
	"bpmn:BoundaryEvent": "event_",
	"bpmn:IntermediateCatchEvent": "event_",
	"bpmn:IntermediateThrowEvent": "event_",
	"bpmn:ServiceTask": "serviceTask_",
	"bpmn:UserTask": "userTask_",
	"bpmn:SendTask": "sendTask_",
	"bpmn:ReceiveTask": "receiveTask_",
	"bpmn:ManualTask": "manualTask_",
	"bpmn:ScriptTask": "scriptTask_",
	"bpmn:BusinessRuleTask": "businessRuleTask_",
	"bpmn:Task": "task_",
	"bpmn:CallActivity": "callActivity_",
	"bpmn:SubProcess": "subProcess_",
	"bpmn:Gateway": "gateway_",
	"bpmn:SequenceFlow": "flow_",
	"bpmn:MessageFlow": "messageFlow_",
	"bpmn:Collaboration": "collaboration_",
	"bpmn:Participant": "participant_",
	"bpmn:Lane": "lane_",
	"bpmn:DataObjectReference": "dataObject_",
	"bpmn:DataStoreReference": "dataStore_",
	"bpmn:TextAnnotation": "textAnnotation_",
	"bpmn:Group": "group_",
	"bpmn:Association": "association_",
	"bpmn:DataInputAssociation": "association_",
	"bpmn:DataOutputAssociation": "association_"
};
var FALLBACK_ORDER = [
	"bpmn:BoundaryEvent",
	"bpmn:StartEvent",
	"bpmn:EndEvent",
	"bpmn:IntermediateCatchEvent",
	"bpmn:IntermediateThrowEvent",
	"bpmn:ServiceTask",
	"bpmn:UserTask",
	"bpmn:SendTask",
	"bpmn:ReceiveTask",
	"bpmn:ManualTask",
	"bpmn:ScriptTask",
	"bpmn:BusinessRuleTask",
	"bpmn:CallActivity",
	"bpmn:SubProcess",
	"bpmn:Task",
	"bpmn:ExclusiveGateway",
	"bpmn:ParallelGateway",
	"bpmn:InclusiveGateway",
	"bpmn:EventBasedGateway",
	"bpmn:ComplexGateway",
	"bpmn:Gateway",
	"bpmn:SequenceFlow"
];
var QUALIFIER_MODES = new Set([
	"off",
	"optional",
	"required"
]);
var KNOWN_EVENT_QUALIFIERS = [
	"message",
	"timer",
	"signal",
	"conditional",
	"escalation",
	"error",
	"link",
	"terminate",
	"compensate"
];
var ElementIdConvention = class {
	constructor(config) {
		_defineProperty(this, "prefixes", void 0);
		_defineProperty(this, "namingCase", void 0);
		_defineProperty(this, "qualifierMode", void 0);
		const { prefixes: overrides = {}, case: caseName = "camelCase" } = config ?? {};
		const mode = config?.eventDefinitionQualifier;
		this.prefixes = {
			...DEFAULT_PREFIXES,
			...overrides
		};
		this.namingCase = resolveCase(caseName);
		this.qualifierMode = mode !== void 0 && QUALIFIER_MODES.has(mode) ? mode : "optional";
	}
	get case() {
		return this.namingCase;
	}
	get qualifier() {
		return this.qualifierMode;
	}
	violationOf(node) {
		if (!node.id) return null;
		const prefix = this.prefixOf(node);
		if (!prefix) return null;
		const accepted = this.acceptedPrefixes(node, prefix);
		const matches = (candidate) => node.id.startsWith(candidate) && this.namingCase.pattern.test(node.id.slice(candidate.length));
		if (accepted.some(matches)) return null;
		const lie = this.qualifierMode !== "off" ? this.lyingQualifier(node, prefix) : null;
		if (lie) return `Element id claims a ${lie} event, but this element has no ${lie} event definition`;
		return `Element id must match the naming convention ${accepted.map((candidate) => `<${candidate}${this.namingCase.label}>`).join(" or ")}`;
	}
	prefixOf(node) {
		const configured = (type2) => Object.prototype.hasOwnProperty.call(this.prefixes, type2);
		const type = configured(node.$type) ? node.$type : FALLBACK_ORDER.find((fallback) => configured(fallback) && is(node, fallback));
		return type && this.prefixes[type] || null;
	}
	prefixesFor(node) {
		const prefix = this.prefixOf(node);
		return prefix ? this.acceptedPrefixes(node, prefix) : [];
	}
	acceptedPrefixes(node, prefix) {
		if (this.qualifierMode === "off" || !is(node, "bpmn:Event")) return [prefix];
		const qualified = eventQualifiers(node).map((qualifier) => qualify(qualifier, prefix));
		if (this.qualifierMode === "required") return qualified.length ? [...new Set(qualified)] : [prefix];
		return [...new Set([prefix, ...qualified])];
	}
	lyingQualifier(node, prefix) {
		if (!is(node, "bpmn:Event")) return null;
		const actual = new Set(eventQualifiers(node));
		return KNOWN_EVENT_QUALIFIERS.find((qualifier) => !actual.has(qualifier) && node.id.startsWith(qualify(qualifier, prefix))) ?? null;
	}
};
var ValueNamingScheme = class {
	constructor(config) {
		_defineProperty(this, "prefix", void 0);
		_defineProperty(this, "separator", void 0);
		_defineProperty(this, "case", void 0);
		_defineProperty(this, "segments", void 0);
		const { prefix = "", separator = ".", case: caseName = "camelCase", segments } = config ?? {};
		this.prefix = prefix;
		this.separator = separator;
		this.case = resolveCase(caseName);
		this.segments = Number.isInteger(segments) && segments > 0 ? segments : void 0;
	}
	matches(value) {
		if (!value.startsWith(this.lead)) return false;
		const name = value.slice(this.lead.length);
		const segments = this.separator ? name.split(this.separator) : [name];
		return (this.segments === void 0 || segments.length === this.segments) && segments.every((segment) => this.case.pattern.test(segment));
	}
	describe() {
		const placeholder = `<${this.case.label}>`;
		const name = Array.from({ length: this.segments ?? 1 }, () => placeholder).join(this.separator);
		return `${this.lead}${name}`;
	}
	get lead() {
		return this.prefix ? `${this.prefix}${this.separator}` : "";
	}
};
function isExpression(value) {
	return value.startsWith("=") || value.includes("${") || value.includes("#{");
}
function isGeneratedId(id) {
	return /^[A-Za-z][A-Za-z0-9]*_(?=[a-z0-9]{6,8}$)(?=[a-z0-9]*[a-z])(?=[a-z0-9]*[0-9])[a-z0-9]+$/.test(id) || /^[A-Za-z][A-Za-z0-9]*_[0-9]+$/.test(id);
}
__export({}, {
	DEFAULT_PREFIXES: () => DEFAULT_PREFIXES,
	ElementIdConvention: () => ElementIdConvention,
	ValueNamingScheme: () => ValueNamingScheme,
	isExpression: () => isExpression,
	isGeneratedId: () => isGeneratedId,
	resolveCase: () => resolveCase
});
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-I6VHC4O2.js
init_index_esm();
var MessageNameNaming = class {
	constructor(config) {
		_defineProperty(this, "scheme", void 0);
		this.scheme = new ValueNamingScheme(config);
	}
	check(node, reporter) {
		if (!is(node, "bpmn:Message") || !node.name || isExpression(node.name)) return;
		if (!this.scheme.matches(node.name)) reporter.report(node.id, `Message name <${node.name}> must match ${this.scheme.describe()}`);
	}
};
var message_name_naming_default = defineRule({
	ruleName: "message-name-naming",
	kind: "scheme"
}, MessageNameNaming);
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-6ZPKGIQ5.js
init_index_esm();
var CHECKED = [
	"bpmn:FlowNode",
	"bpmn:SequenceFlow",
	"bpmn:Participant",
	"bpmn:Lane"
];
var NoGeneratedIds = class {
	check(node, reporter) {
		if (!node.id || !isAny(node, CHECKED)) return;
		if (isGeneratedId(node.id)) reporter.report(node.id, "Element id looks generated — give it a readable, stable name");
	}
};
var no_generated_ids_default = defineRule({
	ruleName: "no-generated-ids",
	kind: "convention"
}, NoGeneratedIds);
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-L7MYX2XQ.js
init_index_esm();
var EXTERNAL_TASK_TYPES = [
	"bpmn:ServiceTask",
	"bpmn:BusinessRuleTask",
	"bpmn:SendTask"
];
var EXTERNAL_TASK_NAMESPACES = ["camunda", "operaton"];
var WorkerTopicNaming = class {
	constructor(config) {
		_defineProperty(this, "scheme", void 0);
		this.scheme = new ValueNamingScheme(config);
	}
	check(node, reporter) {
		for (const topic of this.workerTopicsOf(node)) if (!this.scheme.matches(topic)) reporter.report(node.id, `Worker topic <${topic}> must match ${this.scheme.describe()}`);
	}
	workerTopicsOf(node) {
		return [...this.externalTaskImplementationsOf(node).map((implementation) => this.externalTaskTopicOf(implementation)), this.jobTypeOf(node)].filter((topic) => Boolean(topic) && !isExpression(topic));
	}
	externalTaskImplementationsOf(node) {
		if (isAny(node, EXTERNAL_TASK_TYPES)) return [node];
		if (!is(node, "bpmn:Event")) return [];
		return (node.eventDefinitions ?? []).filter((definition) => is(definition, "bpmn:MessageEventDefinition"));
	}
	externalTaskTopicOf(implementation) {
		const namespace = EXTERNAL_TASK_NAMESPACES.find((candidate) => implementation.get(`${candidate}:type`) === "external");
		return namespace && implementation.get(`${namespace}:topic`);
	}
	jobTypeOf(node) {
		const taskDefinition = (node.extensionElements?.values ?? []).find((extension) => extension.$type?.toLowerCase() === "zeebe:taskdefinition");
		return taskDefinition?.type ?? taskDefinition?.$attrs?.type;
	}
};
var worker_topic_naming_default = defineRule({
	ruleName: "worker-topic-naming",
	kind: "scheme"
}, WorkerTopicNaming);
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-F63MJQ4D.js
init_index_esm();
var CAMUNDA_7_NAMESPACE = "http://camunda.org/schema/1.0/bpmn";
var CAMUNDA_7_EXECUTION_PLATFORM = "Camunda Platform";
var REMOTE_CALL_TASKS = [
	"bpmn:ServiceTask",
	"bpmn:ScriptTask",
	"bpmn:SendTask"
];
var EXTERNAL_CAPABLE_TASKS = [
	"bpmn:ServiceTask",
	"bpmn:SendTask",
	"bpmn:BusinessRuleTask"
];
var MESSAGE_THROW_EVENTS = ["bpmn:IntermediateThrowEvent", "bpmn:EndEvent"];
var NATIVE_WAIT_STATES = [
	"bpmn:UserTask",
	"bpmn:ReceiveTask",
	"bpmn:IntermediateCatchEvent",
	"bpmn:EventBasedGateway"
];
var JOIN_GATEWAYS = ["bpmn:ParallelGateway", "bpmn:InclusiveGateway"];
var MESSAGES = {
	serviceTasks: "Add camunda:asyncBefore so a failing call rolls back to this task, not the last wait state",
	userTasks: "Add camunda:asyncAfter so completing the task commits before the following steps run",
	startEvents: "Add camunda:asyncBefore so the caller gets the instance back before work starts",
	joins: "Add camunda:asyncBefore so joining paths do not collide with an OptimisticLockingException",
	multiInstance: "Add camunda:asyncBefore so the instances start in their own transaction, not the caller one",
	waitStates: "Remove camunda:asyncBefore: a wait state already commits, the extra job is only overhead"
};
var AsyncContinuations = class {
	constructor(config) {
		_defineProperty(this, "checks", void 0);
		this.checks = {
			serviceTasks: true,
			userTasks: true,
			startEvents: true,
			joins: true,
			multiInstance: true,
			waitStates: true,
			...config
		};
	}
	check(node, reporter) {
		if (!node.id || !is(node, "bpmn:FlowNode") || !this.isCamunda7Diagram(node)) return;
		if (this.hasAsyncBefore(node)) {
			if (this.checks.waitStates && this.isWaitState(node) && !this.isMultiInstance(node)) reporter.report(node.id, MESSAGES.waitStates);
		} else {
			const message = this.missingAsyncBeforeMessage(node);
			if (message) reporter.report(node.id, message);
		}
		if (this.checks.userTasks && is(node, "bpmn:UserTask") && !this.hasAsyncAfter(node)) reporter.report(node.id, MESSAGES.userTasks);
	}
	missingAsyncBeforeMessage(node) {
		if (this.checks.multiInstance && this.isMultiInstance(node)) return MESSAGES.multiInstance;
		if (this.checks.serviceTasks && this.isRemoteCall(node)) return MESSAGES.serviceTasks;
		if (this.checks.startEvents && this.isProcessStartEvent(node)) return MESSAGES.startEvents;
		if (this.checks.joins && this.isJoin(node)) return MESSAGES.joins;
	}
	isFlagSet(value) {
		return value === true || value === "true";
	}
	hasAsyncBefore(node) {
		return this.isFlagSet(node.get("camunda:asyncBefore")) || this.isFlagSet(node.get("camunda:async"));
	}
	hasAsyncAfter(node) {
		return this.isFlagSet(node.get("camunda:asyncAfter"));
	}
	definitionsOf(node) {
		let current = node;
		while (current && !is(current, "bpmn:Definitions")) current = current.$parent;
		return current;
	}
	declaresCamunda7Namespace(definitions) {
		return Object.entries(definitions.$attrs ?? {}).some(([name, value]) => name.startsWith("xmlns:") && value === CAMUNDA_7_NAMESPACE);
	}
	isCamunda7Diagram(node) {
		const definitions = this.definitionsOf(node);
		if (!definitions) return false;
		const executionPlatform = definitions.get("modeler:executionPlatform");
		if (executionPlatform !== void 0) return executionPlatform === CAMUNDA_7_EXECUTION_PLATFORM;
		return this.declaresCamunda7Namespace(definitions);
	}
	messageEventDefinitionOf(node) {
		return (node.eventDefinitions ?? []).find((definition) => is(definition, "bpmn:MessageEventDefinition"));
	}
	isMessageThrowEvent(node) {
		return isAny(node, MESSAGE_THROW_EVENTS) && this.messageEventDefinitionOf(node) !== void 0;
	}
	isExternalTask(node) {
		if (isAny(node, EXTERNAL_CAPABLE_TASKS)) return node.get("camunda:type") === "external";
		return this.isMessageThrowEvent(node) && this.messageEventDefinitionOf(node).get("camunda:type") === "external";
	}
	isWaitState(node) {
		return isAny(node, NATIVE_WAIT_STATES) || this.isExternalTask(node);
	}
	isMultiInstance(node) {
		return node.loopCharacteristics !== void 0 && is(node.loopCharacteristics, "bpmn:MultiInstanceLoopCharacteristics");
	}
	isRemoteCall(node) {
		return (isAny(node, REMOTE_CALL_TASKS) || this.isMessageThrowEvent(node)) && !this.isExternalTask(node);
	}
	isProcessStartEvent(node) {
		return is(node, "bpmn:StartEvent") && is(node.$parent, "bpmn:Process");
	}
	isJoin(node) {
		return isAny(node, JOIN_GATEWAYS) && (node.incoming ?? []).length > 1;
	}
};
var async_continuations_default = defineRule({
	ruleName: "async-continuations",
	kind: "engine-specific",
	targetEngine: "c7"
}, AsyncContinuations);
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-66ZXDBLO.js
var GRAZE_TOLERANCE = 3;
var BoundaryEventMarkerOverlap = class extends PlaneRule {
	checkPlane(plane, reporter) {
		const boundaryEvents = plane.shapes.filter((shape) => inst(shape.el, "bpmn:BoundaryEvent"));
		for (const { el, bounds } of boundaryEvents) {
			const host = plane.shapeOf(el.attachedToRef?.id);
			if (!host) continue;
			const center = {
				x: bounds.x + bounds.width / 2,
				y: bounds.y + bounds.height / 2
			};
			const coveringRadius = bounds.width / 2 - GRAZE_TOLERANCE;
			for (const { label, zone } of markerZones(host)) if (circleOverlapsRect(center, coveringRadius, zone)) reporter.report(el.id, `Boundary event covers the ${label} of <${host.el.id}>; move it along the border`);
		}
	}
};
var boundary_event_marker_overlap_default = defineRule({
	ruleName: "boundary-event-marker-overlap",
	kind: "layout-hint"
}, BoundaryEventMarkerOverlap);
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-4ONQ6JWU.js
var ElementIdNaming = class {
	constructor(config) {
		_defineProperty(this, "convention", void 0);
		this.convention = new ElementIdConvention(config);
	}
	check(node, reporter) {
		const violation = this.convention.violationOf(node);
		if (violation) reporter.report(node.id, violation);
	}
};
var element_id_naming_default = defineRule({
	ruleName: "element-id-naming",
	kind: "convention"
}, ElementIdNaming);
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-QTDA2IJN.js
var ExclusiveGatewayMarkerVisible = class {
	check(node, reporter) {
		if (node.$type !== "bpmn:Definitions") return;
		for (const diagram of node.diagrams || []) for (const planeElement of diagram.plane?.planeElement || []) {
			const el = planeElement.bpmnElement;
			if (planeElement.$type === "bpmndi:BPMNShape" && inst(el, "bpmn:ExclusiveGateway") && planeElement.isMarkerVisible !== true) reporter.report(el.id, "Exclusive gateway is drawn without its X marker — set isMarkerVisible=\"true\"");
		}
	}
};
var exclusive_gateway_marker_visible_default = defineRule({
	ruleName: "exclusive-gateway-marker-visible",
	kind: "misdrawn"
}, ExclusiveGatewayMarkerVisible);
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-IMVAOBJZ.js
var POLICY = {
	incoming: {
		event: ["left"],
		activity: ["left"],
		gateway: [
			"top",
			"bottom",
			"left"
		]
	},
	outgoing: {
		event: [
			"top",
			"right",
			"bottom"
		],
		activity: ["right"],
		gateway: [
			"top",
			"right",
			"bottom"
		]
	}
};
var CATEGORY_LABEL = {
	event: "an event",
	gateway: "a gateway",
	activity: "an activity"
};
var MIRROR = {
	left: "right",
	right: "left",
	top: "top",
	bottom: "bottom"
};
var FlowConnectionSide = class extends PlaneRule {
	constructor(config) {
		super();
		_defineProperty(this, "allowBackwardsFlow", void 0);
		_defineProperty(this, "minStubLength", void 0);
		const { allowBackwardsFlow = true, minStubLength = 20 } = config ?? {};
		this.allowBackwardsFlow = allowBackwardsFlow;
		this.minStubLength = minStubLength;
	}
	checkPlane(plane, reporter) {
		const returnTargets = this.returnTargetIds(plane);
		for (const flow of plane.sequenceFlows) {
			const source = flow.el.sourceRef;
			const target = flow.el.targetRef;
			const backward = this.isReturnFlow(plane, source, target);
			const route = {
				flowId: flow.el.id,
				backward,
				sourceIsChainMember: backward && !!source && returnTargets.has(source.id)
			};
			this.checkEndpoint(plane, reporter, route, {
				direction: "outgoing",
				ref: source,
				point: flow.waypoints[0],
				neighbor: flow.waypoints[1]
			});
			this.checkEndpoint(plane, reporter, route, {
				direction: "incoming",
				ref: target,
				point: flow.waypoints.at(-1),
				neighbor: flow.waypoints.at(-2)
			});
		}
	}
	returnTargetIds(plane) {
		const returnTargets = new Set();
		for (const flow of plane.sequenceFlows) {
			const target = flow.el.targetRef;
			if (target && this.isReturnFlow(plane, flow.el.sourceRef, target)) returnTargets.add(target.id);
		}
		return returnTargets;
	}
	isReturnFlow(plane, source, target) {
		if (!this.allowBackwardsFlow || !source || !target) return false;
		const sourceBounds = plane.boundsOf(source.id);
		const targetBounds = plane.boundsOf(target.id);
		return !!sourceBounds && !!targetBounds && isBackwardFlow(sourceBounds, targetBounds);
	}
	checkEndpoint(plane, reporter, route, { direction, ref, point, neighbor }) {
		if (!ref || !point) return;
		const bounds = plane.boundsOf(ref.id);
		const category = this.categoryOf(ref);
		if (!bounds || !category) return;
		const side = category === "gateway" ? gatewayTipSide(point, bounds) : attachSide(point, bounds);
		if (side === null) {
			if (category === "gateway") reporter.report(route.flowId, `Sequence flow connects to <${ref.id}> on a diagonal; a gateway must connect at one of its four tips`);
			return;
		}
		const allowed = this.allowedSidesFor(direction, category, route);
		if (!allowed.includes(side)) {
			reporter.report(route.flowId, this.wrongSideMessage(direction, ref.id, side, category, allowed));
			return;
		}
		if (this.minStubLength > 0 && neighbor) {
			const stub = stubLength(point, neighbor, side);
			if (stub < this.minStubLength) reporter.report(route.flowId, this.shortStubMessage(direction, ref.id, side, stub));
		}
	}
	allowedSidesFor(direction, category, route) {
		const policy = POLICY[direction][category];
		const mirrored = policy.map((side) => MIRROR[side]);
		if (direction === "incoming") return route.backward ? mirrored : policy;
		if (category === "activity") return route.sourceIsChainMember ? mirrored : policy;
		return route.backward ? [...new Set([...policy, ...mirrored])] : policy;
	}
	categoryOf(el) {
		if (inst(el, "bpmn:BoundaryEvent")) return null;
		if (inst(el, "bpmn:Event")) return "event";
		if (inst(el, "bpmn:Gateway")) return "gateway";
		if (inst(el, "bpmn:Activity")) return "activity";
		return null;
	}
	wrongSideMessage(direction, id, side, category, allowed) {
		const sides = allowed.length <= 1 ? allowed[0] ?? "" : `${allowed.slice(0, -1).join(", ")} or ${allowed.at(-1)}`;
		return direction === "incoming" ? `Sequence flow enters <${id}> from the ${side}; ${CATEGORY_LABEL[category]} must be entered from the ${sides}` : `Sequence flow leaves <${id}> to the ${side}; ${CATEGORY_LABEL[category]} must exit to the ${sides}`;
	}
	shortStubMessage(direction, id, side, stub) {
		const stubPx = Math.max(0, Math.round(stub));
		const min = this.minStubLength;
		return direction === "incoming" ? `Sequence flow enters <${id}> from the ${side} with only a ${stubPx}px stub; it must run at least ${min}px straight in before turning` : `Sequence flow leaves <${id}> to the ${side} with only a ${stubPx}px stub; it must run at least ${min}px straight out before turning`;
	}
};
var flow_connection_side_default = defineRule({
	ruleName: "flow-connection-side",
	kind: "layout-hint"
}, FlowConnectionSide);
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-IHMAUEFH.js
var FlowCrossing = class extends PlaneRule {
	checkPlane(plane, reporter) {
		const flows = plane.sequenceFlows.map((edge) => ({
			el: edge.el,
			endpoints: new Set(flowEndpointIds(edge.el)),
			bbox: bboxOfPoints(edge.waypoints),
			segments: segments(edge.waypoints)
		}));
		const flowIndex = new BboxIndex(flows.map((flow) => flow.bbox));
		for (let outer = 0; outer < flows.length; outer++) {
			const first = flows[outer];
			const laterOverlappingFlows = flowIndex.overlapping(first.bbox).filter((inner) => inner > outer);
			for (const inner of laterOverlappingFlows) {
				const second = flows[inner];
				if (this.shareNode(first, second)) continue;
				if (this.cross(first, second)) {
					reporter.report(first.el.id, `Sequence flow crosses <${second.el.id}>`);
					reporter.report(second.el.id, `Sequence flow crosses <${first.el.id}>`);
				}
			}
		}
	}
	shareNode(first, second) {
		return [...first.endpoints].some((nodeId) => second.endpoints.has(nodeId));
	}
	cross(first, second) {
		return first.segments.some(([firstStart, firstEnd]) => second.segments.some(([secondStart, secondEnd]) => segmentsCross(firstStart, firstEnd, secondStart, secondEnd)));
	}
};
var flow_crossing_default = defineRule({
	ruleName: "flow-crossing",
	kind: "layout-hint"
}, FlowCrossing);
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-OS6MHAOA.js
var FlowOrthogonal = class extends PlaneRule {
	checkPlane(plane, reporter) {
		for (const flow of plane.sequenceFlows) if (!isOrthogonalPath(flow.waypoints)) reporter.report(flow.el.id, `Sequence flow <${flow.el.id}> runs diagonally; use only horizontal and vertical segments`);
	}
};
var flow_orthogonal_default = defineRule({
	ruleName: "flow-orthogonal",
	kind: "layout-hint"
}, FlowOrthogonal);
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/chunk-ZXIBBZQY.js
var SEVERITY_BY_KIND = {
	"layout-hint": {
		"recommended-for-modeling": "warn",
		"recommended-for-automation": "warn",
		all: "error"
	},
	misdrawn: {
		"recommended-for-modeling": "error",
		"recommended-for-automation": "warn",
		all: "error"
	},
	convention: {
		"recommended-for-modeling": "off",
		"recommended-for-automation": "warn",
		all: "error"
	},
	scheme: {
		"recommended-for-modeling": "off",
		"recommended-for-automation": "off",
		all: "error"
	},
	"engine-specific": {
		"recommended-for-modeling": "off",
		"recommended-for-automation": "off",
		all: "error"
	}
};
var SeverityPolicy = class {
	constructor(pluginName, kindByRuleName) {
		_defineProperty(this, "pluginName", void 0);
		_defineProperty(this, "kindByRuleName", void 0);
		this.pluginName = pluginName;
		this.kindByRuleName = kindByRuleName;
	}
	ruleSetFor(layerName) {
		return Object.fromEntries(Object.entries(this.kindByRuleName).map(([ruleName, { kind }]) => [`${this.pluginName}/${ruleName}`, SEVERITY_BY_KIND[kind][layerName]]));
	}
};
var MIRAGON_PLUGIN = "@miragon/bpmnlint-plugin-rules";
var MIRAGON_NAME = "@miragon/rules";
var miragonRuleFactories = {
	[no_generated_ids_default.ruleName]: no_generated_ids_default,
	[element_id_naming_default.ruleName]: element_id_naming_default,
	[worker_topic_naming_default.ruleName]: worker_topic_naming_default,
	[message_name_naming_default.ruleName]: message_name_naming_default,
	[flow_through_element_default.ruleName]: flow_through_element_default,
	[flow_connection_side_default.ruleName]: flow_connection_side_default,
	[flow_target_alignment_default.ruleName]: flow_target_alignment_default,
	[flow_crossing_default.ruleName]: flow_crossing_default,
	[flow_orthogonal_default.ruleName]: flow_orthogonal_default,
	[boundary_event_marker_overlap_default.ruleName]: boundary_event_marker_overlap_default,
	[exclusive_gateway_marker_visible_default.ruleName]: exclusive_gateway_marker_visible_default,
	[async_continuations_default.ruleName]: async_continuations_default
};
var severityPolicy = new SeverityPolicy(MIRAGON_NAME, miragonRuleFactories);
var miragonLayers = {
	"recommended-for-modeling": { rules: {
		"bpmnlint/standard-size": "warn",
		...severityPolicy.ruleSetFor("recommended-for-modeling")
	} },
	"recommended-for-automation": { rules: {
		"bpmnlint/standard-size": "warn",
		...severityPolicy.ruleSetFor("recommended-for-automation")
	} },
	all: { rules: severityPolicy.ruleSetFor("all") }
};
var resolverEntries = {
	...Object.fromEntries(Object.entries(miragonLayers).map(([layerName, layer]) => [`config:${MIRAGON_PLUGIN}/${layerName}`, layer])),
	...Object.fromEntries(Object.entries(miragonRuleFactories).map(([name, factory]) => [`rule:${MIRAGON_PLUGIN}/${name}`, factory]))
};
//#endregion
//#region ../../node_modules/bpmnlint/config/recommended.js
var require_recommended = __commonJSMin(((exports, module) => {
	module.exports = { rules: {
		"ad-hoc-sub-process": "error",
		"conditional-flows": "error",
		"end-event-required": "error",
		"event-based-gateway": "error",
		"event-sub-process-typed-start-event": "error",
		"fake-join": "warn",
		"global": "warn",
		"label-required": "error",
		"link-event": "error",
		"no-bpmndi": "error",
		"no-complex-gateway": "error",
		"no-disconnected": "error",
		"no-duplicate-sequence-flows": "error",
		"no-gateway-join-fork": "error",
		"no-implicit-split": "error",
		"no-implicit-end": "error",
		"no-implicit-start": "error",
		"no-inclusive-gateway": "warn",
		"no-overlapping-elements": "warn",
		"single-blank-start-event": "error",
		"single-event-definition": "error",
		"start-event-required": "error",
		"sub-process-blank-start-event": "error",
		"superfluous-gateway": "warn",
		"superfluous-label": "warn",
		"superfluous-termination": "warn"
	} };
}));
//#endregion
//#region ../../node_modules/bpmnlint/config/all.js
var require_all = __commonJSMin(((exports, module) => {
	module.exports = { rules: [
		"ad-hoc-sub-process",
		"conditional-event",
		"conditional-flows",
		"end-event-required",
		"event-based-gateway",
		"event-sub-process-typed-start-event",
		"fake-join",
		"global",
		"label-required",
		"link-event",
		"no-bpmndi",
		"no-complex-gateway",
		"no-disconnected",
		"no-duplicate-sequence-flows",
		"no-gateway-join-fork",
		"no-implicit-end",
		"no-implicit-split",
		"no-implicit-start",
		"no-inclusive-gateway",
		"no-overlapping-elements",
		"single-blank-start-event",
		"single-event-definition",
		"standard-size",
		"start-event-required",
		"sub-process-blank-start-event",
		"superfluous-gateway",
		"superfluous-label",
		"superfluous-termination"
	].reduce(function(rules, ruleName) {
		rules[ruleName] = "error";
		return rules;
	}, {}) };
}));
//#endregion
//#region ../../node_modules/bpmnlint/config/correctness.js
var require_correctness = __commonJSMin(((exports, module) => {
	module.exports = { rules: {
		"ad-hoc-sub-process": "error",
		"conditional-event": "error",
		"event-based-gateway": "error",
		"event-sub-process-typed-start-event": "error",
		"link-event": "error",
		"no-duplicate-sequence-flows": "warn",
		"sub-process-blank-start-event": "error",
		"single-blank-start-event": "error"
	} };
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/helper.js
var require_helper$1 = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	function checkDiscouragedNodeType(type, ruleName) {
		return function() {
			function check(node, reporter) {
				if (is(node, type)) reporter.report(node.id, "Element type <" + type + "> is discouraged");
			}
			return annotateRule(ruleName, { check });
		};
	}
	module.exports.checkDiscouragedNodeType = checkDiscouragedNodeType;
	function findParent(node, type) {
		if (!node) return null;
		const parent = node.$parent;
		if (!parent) return node;
		if (is(parent, type)) return parent;
		return findParent(parent, type);
	}
	module.exports.findParent = findParent;
	function isInExecutableProcess(node) {
		const process = findParent(node, "bpmn:Process");
		return process && process.isExecutable;
	}
	module.exports.isInExecutableProcess = isInExecutableProcess;
	var documentationBaseUrl = "https://github.com/bpmn-io/bpmnlint/blob/main/docs/rules";
	function annotateRule(ruleName, options) {
		const { meta: { documentation = {}, ...restMeta } = {}, ...restOptions } = options;
		return {
			meta: {
				documentation: {
					url: `${documentationBaseUrl}/${ruleName}.md`,
					...documentation
				},
				...restMeta
			},
			...restOptions
		};
	}
	module.exports.annotateRule = annotateRule;
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/ad-hoc-sub-process.js
var require_ad_hoc_sub_process$1 = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:AdHocSubProcess")) return;
			(node.flowElements || []).forEach(function(flowElement) {
				if (is(flowElement, "bpmn:StartEvent")) reporter.report(flowElement.id, "A <Start Event> is not allowed in <Ad Hoc Sub Process>");
				if (is(flowElement, "bpmn:EndEvent")) reporter.report(flowElement.id, "An <End Event> is not allowed in <Ad Hoc Sub Process>");
			});
		}
		return annotateRule("ad-hoc-sub-process", { check });
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/conditional-event.js
var require_conditional_event = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule, isInExecutableProcess } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!isInExecutableProcess(node)) return;
			const eventDefinition = getConditionalEventDefinition(node);
			if (!eventDefinition) return;
			if (!hasCondition(eventDefinition)) reporter.report(node.id, "Conditional event is missing a condition", ["condition"]);
		}
		return annotateRule("conditional-event", { check });
	};
	function getConditionalEventDefinition(node) {
		if (!is(node, "bpmn:Event")) return;
		return (node.eventDefinitions || []).find((def) => is(def, "bpmn:ConditionalEventDefinition"));
	}
	function hasCondition(eventDefinition) {
		return !!eventDefinition.condition?.body;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/conditional-flows.js
var require_conditional_flows = __commonJSMin(((exports, module) => {
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!isConditionalForking(node)) return;
			(node.outgoing || []).forEach((flow) => {
				if (!hasCondition(flow) && !isDefaultFlow(node, flow)) reporter.report(flow.id, "Sequence flow is missing condition", ["conditionExpression"]);
			});
		}
		return annotateRule("conditional-flows", { check });
	};
	function isConditionalForking(node) {
		const defaultFlow = node["default"];
		const outgoing = node.outgoing || [];
		return defaultFlow || outgoing.find(hasCondition);
	}
	function hasCondition(flow) {
		return !!flow.conditionExpression;
	}
	function isDefaultFlow(node, flow) {
		return node["default"] === flow;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/end-event-required.js
var require_end_event_required = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function hasEndEvent(node) {
			return (node.flowElements || []).some((node) => is(node, "bpmn:EndEvent"));
		}
		function check(node, reporter) {
			if (!isAny(node, ["bpmn:Process", "bpmn:SubProcess"]) || is(node, "bpmn:AdHocSubProcess")) return;
			if (!hasEndEvent(node)) {
				const type = is(node, "bpmn:SubProcess") ? "Sub process" : "Process";
				reporter.report(node.id, type + " is missing end event");
			}
		}
		return annotateRule("end-event-required", { check });
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/event-based-gateway.js
var require_event_based_gateway = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:EventBasedGateway")) return;
			const outgoing = node.outgoing || [];
			if (outgoing.length < 2) reporter.report(node.id, "An <Event-based Gateway> must have at least 2 outgoing <Sequence Flows>");
			outgoing.forEach((flow) => {
				if (hasCondition(flow)) reporter.report(flow.id, "A <Sequence Flow> outgoing from an <Event-based Gateway> must not be conditional");
			});
		}
		return annotateRule("event-based-gateway", { check });
	};
	function hasCondition(flow) {
		return !!flow.conditionExpression;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/event-sub-process-typed-start-event.js
var require_event_sub_process_typed_start_event = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:SubProcess") || !node.triggeredByEvent) return;
			(node.flowElements || []).forEach(function(flowElement) {
				if (!is(flowElement, "bpmn:StartEvent")) return false;
				if ((flowElement.eventDefinitions || []).length === 0) reporter.report(flowElement.id, "Start event is missing event definition", ["eventDefinitions"]);
			});
		}
		return annotateRule("event-sub-process-typed-start-event", { check });
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/fake-join.js
var require_fake_join = __commonJSMin(((exports, module) => {
	var { isAny } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!isAny(node, ["bpmn:Activity", "bpmn:Event"])) return;
			if ((node.incoming || []).length > 1) reporter.report(node.id, "Incoming flows do not join");
		}
		return annotateRule("fake-join", { check });
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/global.js
var require_global = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:Definitions")) return false;
			const rootElements = getRootElements(node);
			const referencingElements = getReferencingElements(node);
			rootElements.forEach((rootElement) => {
				if (!hasName(rootElement)) reporter.report(rootElement.id, "Element is missing name");
				if (!isReferenced(rootElement, referencingElements)) reporter.report(rootElement.id, "Element is unused");
				if (!isUnique(rootElement, rootElements)) reporter.report(rootElement.id, "Element name is not unique");
			});
		}
		return annotateRule("global", { check });
		function getRootElements(definitions) {
			return definitions.rootElements.filter((node) => isAny(node, [
				"bpmn:Error",
				"bpmn:Escalation",
				"bpmn:Message",
				"bpmn:Signal"
			]));
		}
		function getReferencingElements(definitions) {
			const referencingElements = [];
			function traverse(element) {
				if (is(element, "bpmn:Definitions") && element.get("rootElements").length) element.get("rootElements").forEach(traverse);
				if (is(element, "bpmn:FlowElementsContainer") && element.get("flowElements").length) element.get("flowElements").forEach(traverse);
				if (is(element, "bpmn:Event") && element.get("eventDefinitions").length) element.get("eventDefinitions").forEach((eventDefinition) => referencingElements.push(eventDefinition));
				if (is(element, "bpmn:Collaboration") && element.get("messageFlows").length) element.get("messageFlows").forEach(traverse);
				if (isAny(element, [
					"bpmn:MessageFlow",
					"bpmn:ReceiveTask",
					"bpmn:SendTask"
				])) referencingElements.push(element);
			}
			traverse(definitions);
			return referencingElements;
		}
		function hasName(event) {
			return event.name?.trim() !== "";
		}
		function isReferenced(rootElement, referencingElements) {
			if (is(rootElement, "bpmn:Error")) return referencingElements.some((referencingElement) => {
				return is(referencingElement, "bpmn:ErrorEventDefinition") && rootElement.get("id") === referencingElement.get("errorRef")?.get("id");
			});
			if (is(rootElement, "bpmn:Escalation")) return referencingElements.some((referencingElement) => {
				return is(referencingElement, "bpmn:EscalationEventDefinition") && rootElement.get("id") === referencingElement.get("escalationRef")?.get("id");
			});
			if (is(rootElement, "bpmn:Message")) return referencingElements.some((referencingElement) => {
				return isAny(referencingElement, [
					"bpmn:MessageEventDefinition",
					"bpmn:MessageFlow",
					"bpmn:ReceiveTask",
					"bpmn:SendTask"
				]) && rootElement.get("id") === referencingElement.get("messageRef")?.get("id");
			});
			if (is(rootElement, "bpmn:Signal")) return referencingElements.some((referencingElement) => {
				return is(referencingElement, "bpmn:SignalEventDefinition") && rootElement.get("id") === referencingElement.get("signalRef")?.get("id");
			});
		}
		function isUnique(rootElement, rootElements) {
			return rootElements.filter((otherRootElement) => is(otherRootElement, rootElement.$type) && rootElement.name === otherRootElement.name).length === 1;
		}
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/label-required.js
var require_label_required = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (isAny(node, ["bpmn:ParallelGateway", "bpmn:EventBasedGateway"])) return;
			if (is(node, "bpmn:Gateway") && !isForking(node)) return;
			if (is(node, "bpmn:SubProcess")) return;
			if (is(node, "bpmn:SequenceFlow") && !hasCondition(node)) return;
			if (isAny(node, [
				"bpmn:FlowNode",
				"bpmn:SequenceFlow",
				"bpmn:Participant",
				"bpmn:Lane"
			])) {
				if ((node.name || "").trim().length === 0) reporter.report(node.id, "Element is missing label/name", ["name"]);
			}
		}
		return annotateRule("label-required", { check });
	};
	function isForking(node) {
		return (node.outgoing || []).length > 1;
	}
	function hasCondition(node) {
		return node.conditionExpression;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/link-event.js
var require_link_event$1 = __commonJSMin(((exports, module) => {
	var { groupBy } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:FlowElementsContainer")) return;
			const links = (node.flowElements || []).filter(isLinkEvent);
			for (const link of links) if (!getLinkName(link)) reporter.report(link.id, "Link event is missing link name");
			const names = groupBy(links, (link) => getLinkName(link));
			for (const [name, events] of Object.entries(names)) {
				if (!name) continue;
				if (events.length === 1) {
					const event = events[0];
					reporter.report(event.id, `Link ${isThrowEvent(event) ? "catch" : "throw"} event with link name <${name}> missing in scope`);
					continue;
				}
				const catchEvents = events.filter(isCatchEvent);
				if (catchEvents.length > 1) for (const event of catchEvents) reporter.report(event.id, `Duplicate link catch event with link name <${name}> in scope`);
				else if (catchEvents.length === 0) for (const event of events) reporter.report(event.id, `Link catch event with link name <${name}> missing in scope`);
			}
		}
		return annotateRule("link-event", { check });
	};
	function isLinkEvent(node) {
		var eventDefinitions = node.eventDefinitions || [];
		if (!is(node, "bpmn:Event")) return false;
		return eventDefinitions.some((definition) => is(definition, "bpmn:LinkEventDefinition"));
	}
	function getLinkName(linkEvent) {
		return linkEvent.get("eventDefinitions").find((def) => is(def, "bpmn:LinkEventDefinition")).name;
	}
	function isThrowEvent(node) {
		return is(node, "bpmn:ThrowEvent");
	}
	function isCatchEvent(node) {
		return is(node, "bpmn:CatchEvent");
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/no-bpmndi.js
var require_no_bpmndi = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { flatten } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:Definitions")) return false;
			const visualBpmnElements = getAllBpmnElements(node.rootElements).filter(hasVisualRepresentation);
			const referencedBpmnElementIds = getReferencedBpmnElementIds(node);
			visualBpmnElements.forEach((element) => {
				if (!referencedBpmnElementIds.has(element.id)) reporter.report(element.id, "Element is missing bpmndi");
			});
		}
		return annotateRule("no-bpmndi", { check });
	};
	function getAllBpmnElements(rootElements) {
		return flatten(rootElements.map((rootElement) => {
			const laneSet = rootElement.laneSets && rootElement.laneSets[0] || rootElement.childLaneSet;
			const elements = flatten([
				rootElement.flowElements || [],
				rootElement.flowElements && getAllBpmnElements(rootElement.flowElements.filter(hasFlowElements)) || [],
				rootElement.participants || [],
				rootElement.artifacts || [],
				laneSet && laneSet.lanes || [],
				laneSet && laneSet.lanes && getAllBpmnElements(laneSet.lanes.filter(hasChildLaneSet)) || [],
				rootElement.messageFlows || []
			]);
			if (elements.length > 0) return elements.map((element) => {
				return {
					id: element.id,
					$type: element.$type
				};
			});
			else return [];
		}));
	}
	function getReferencedBpmnElementIds(definitionsNode) {
		return new Set(flatten(definitionsNode.get("diagrams").map((diagram) => {
			return (diagram.plane.planeElement || []).map((element) => {
				return element.bpmnElement?.id;
			});
		})));
	}
	function hasVisualRepresentation(element) {
		return ["bpmn:DataObject"].includes(element.$type) ? false : true;
	}
	function hasFlowElements(element) {
		return element.flowElements ? true : false;
	}
	function hasChildLaneSet(element) {
		return element.childLaneSet ? true : false;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/no-complex-gateway.js
var require_no_complex_gateway = __commonJSMin(((exports, module) => {
	var checkDiscouragedNodeType = require_helper$1().checkDiscouragedNodeType;
	module.exports = checkDiscouragedNodeType("bpmn:ComplexGateway", "no-complex-gateway");
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/no-disconnected.js
var require_no_disconnected = __commonJSMin(((exports, module) => {
	var { isAny, is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!isAny(node, [
				"bpmn:Task",
				"bpmn:Gateway",
				"bpmn:SubProcess",
				"bpmn:Event"
			]) || node.triggeredByEvent) return;
			if (isCompensationLinked(node)) return;
			if (is(node.$parent, "bpmn:AdHocSubProcess")) return;
			const incoming = node.incoming || [];
			const outgoing = node.outgoing || [];
			if (!incoming.length && !outgoing.length) reporter.report(node.id, "Element is not connected");
		}
		return annotateRule("no-disconnected", { check });
	};
	function isCompensationBoundary(node) {
		var eventDefinitions = node.eventDefinitions;
		if (!is(node, "bpmn:BoundaryEvent")) return false;
		if (!eventDefinitions || eventDefinitions.length !== 1) return false;
		return is(eventDefinitions[0], "bpmn:CompensateEventDefinition");
	}
	function isCompensationActivity(node) {
		return node.isForCompensation;
	}
	function isCompensationLinked(node) {
		var source = isCompensationBoundary(node);
		var target = isCompensationActivity(node);
		return source || target;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/no-duplicate-sequence-flows.js
var require_no_duplicate_sequence_flows = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		const keyed = {};
		const outgoingReported = {};
		const incomingReported = {};
		function check(node, reporter) {
			if (!is(node, "bpmn:SequenceFlow")) return;
			const key = flowKey(node);
			if (key in keyed) {
				reporter.report(node.id, "SequenceFlow is a duplicate");
				const sourceId = node.sourceRef.id;
				const targetId = node.targetRef.id;
				if (!outgoingReported[sourceId]) {
					reporter.report(sourceId, "Duplicate outgoing sequence flows");
					outgoingReported[sourceId] = true;
				}
				if (!incomingReported[targetId]) {
					reporter.report(targetId, "Duplicate incoming sequence flows");
					incomingReported[targetId] = true;
				}
			} else keyed[key] = node;
		}
		return annotateRule("no-duplicate-sequence-flows", { check });
	};
	function flowKey(flow) {
		const conditionExpression = flow.conditionExpression;
		const condition = conditionExpression ? conditionExpression.body : "";
		const source = flow.sourceRef ? flow.sourceRef.id : flow.id;
		const target = flow.targetRef ? flow.targetRef.id : flow.id;
		return source + "#" + target + "#" + condition;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/no-gateway-join-fork.js
var require_no_gateway_join_fork = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:Gateway")) return;
			const incoming = node.incoming || [];
			const outgoing = node.outgoing || [];
			if (incoming.length > 1 && outgoing.length > 1) reporter.report(node.id, "Gateway forks and joins");
		}
		return annotateRule("no-gateway-join-fork", { check });
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/no-implicit-end.js
var require_no_implicit_end = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { findParent, annotateRule } = require_helper$1();
	module.exports = function() {
		function isLinkEvent(node) {
			const eventDefinitions = node.eventDefinitions || [];
			return eventDefinitions.length && eventDefinitions.every((definition) => is(definition, "bpmn:LinkEventDefinition"));
		}
		function isCompensationEvent(node) {
			const eventDefinitions = node.eventDefinitions || [];
			return eventDefinitions.length && eventDefinitions.every((definition) => is(definition, "bpmn:CompensateEventDefinition"));
		}
		function hasCompensationActivity(node) {
			return (findParent(node, "bpmn:Process").artifacts || []).some((element) => {
				if (!is(element, "bpmn:Association")) return false;
				return element.sourceRef.id === node.id;
			});
		}
		function isForCompensation(node) {
			return node.isForCompensation;
		}
		function isImplicitEnd(node) {
			const outgoing = node.outgoing || [];
			if (is(node, "bpmn:SubProcess") && node.triggeredByEvent) return false;
			if (is(node, "bpmn:IntermediateThrowEvent") && isLinkEvent(node)) return false;
			if (is(node.$parent, "bpmn:AdHocSubProcess")) return false;
			if (is(node, "bpmn:EndEvent")) return false;
			if (is(node, "bpmn:BoundaryEvent") && isCompensationEvent(node) && hasCompensationActivity(node)) return false;
			if (is(node, "bpmn:Activity") && isForCompensation(node)) return false;
			return outgoing.length === 0;
		}
		function check(node, reporter) {
			if (!isAny(node, [
				"bpmn:Event",
				"bpmn:Activity",
				"bpmn:Gateway"
			])) return;
			if (isImplicitEnd(node)) reporter.report(node.id, "Element is an implicit end");
		}
		return annotateRule("no-implicit-end", { check });
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/no-implicit-split.js
var require_no_implicit_split = __commonJSMin(((exports, module) => {
	var { isAny } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!isAny(node, ["bpmn:Activity", "bpmn:Event"])) return;
			if ((node.outgoing || []).filter((flow) => {
				return !hasCondition(flow) && !isDefaultFlow(node, flow);
			}).length > 1) reporter.report(node.id, "Flow splits implicitly");
		}
		return annotateRule("no-implicit-split", { check });
	};
	function hasCondition(flow) {
		return !!flow.conditionExpression;
	}
	function isDefaultFlow(node, flow) {
		return node["default"] === flow;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/no-implicit-start.js
var require_no_implicit_start = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function isLinkEvent(node) {
			const eventDefinitions = node.eventDefinitions || [];
			return eventDefinitions.length && eventDefinitions.every((definition) => is(definition, "bpmn:LinkEventDefinition"));
		}
		function isForCompensation(node) {
			return node.isForCompensation;
		}
		function isImplicitStart(node) {
			const incoming = node.incoming || [];
			if (is(node, "bpmn:Activity") && isForCompensation(node)) return false;
			if (is(node.$parent, "bpmn:AdHocSubProcess")) return false;
			if (is(node, "bpmn:SubProcess") && node.triggeredByEvent) return false;
			if (is(node, "bpmn:IntermediateCatchEvent") && isLinkEvent(node)) return false;
			if (isAny(node, ["bpmn:StartEvent", "bpmn:BoundaryEvent"])) return false;
			return incoming.length === 0;
		}
		function check(node, reporter) {
			if (!isAny(node, [
				"bpmn:Event",
				"bpmn:Activity",
				"bpmn:Gateway"
			])) return;
			if (isImplicitStart(node)) reporter.report(node.id, "Element is an implicit start");
		}
		return annotateRule("no-implicit-start", { check });
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/no-inclusive-gateway.js
var require_no_inclusive_gateway = __commonJSMin(((exports, module) => {
	var checkDiscouragedNodeType = require_helper$1().checkDiscouragedNodeType;
	module.exports = checkDiscouragedNodeType("bpmn:InclusiveGateway", "no-inclusive-gateway");
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/no-overlapping-elements.js
var require_no_overlapping_elements = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:Definitions")) return;
			const rootElements = node.rootElements || [];
			const elementsToReport = new Set();
			const elementsOutsideToReport = new Set();
			const diObjects = getAllDiObjects(node);
			const processElementsParentDiMap = new Map();
			rootElements.filter((element) => is(element, "bpmn:Collaboration")).forEach((collaboration) => {
				const participants = collaboration.participants || [];
				checkElementsArray(participants, elementsToReport, diObjects);
				participants.forEach((participant) => {
					processElementsParentDiMap.set(participant.processRef, diObjects.get(participant));
				});
			});
			rootElements.filter((element) => is(element, "bpmn:Process")).forEach((process) => {
				const parentDi = processElementsParentDiMap.get(process) || {};
				checkProcess(process, elementsToReport, elementsOutsideToReport, diObjects, parentDi);
			});
			elementsToReport.forEach((element) => reporter.report(element.id, "Element overlaps with other element"));
			elementsOutsideToReport.forEach((element) => reporter.report(element.id, "Element is outside of parent boundary"));
		}
		return annotateRule("no-overlapping-elements", { check });
	};
	function checkProcess(node, elementsToReport, elementsOutsideToReport, diObjects, parentDi) {
		const flowElements = node.flowElements || [];
		const flowElementsWithDi = flowElements.filter((element) => diObjects.has(element));
		checkElementsArray(flowElementsWithDi, elementsToReport, diObjects);
		flowElementsWithDi.forEach((element) => {
			if (!is(element, "bpmn:DataStoreReference") && isOutsideParentBoundary(diObjects.get(element).bounds, parentDi.bounds)) elementsOutsideToReport.add(element);
		});
		flowElements.filter((element) => is(element, "bpmn:SubProcess")).forEach((subProcess) => {
			const subProcessDi = diObjects.get(subProcess) || {};
			checkProcess(subProcess, elementsToReport, elementsOutsideToReport, diObjects, subProcessDi.isExpanded ? subProcessDi : {});
		});
	}
	function checkElementsArray(elements, elementsToReport, diObjects) {
		const shapes = getShapes(elements, diObjects).sort((a, b) => a.left - b.left);
		const overlapping = new Set();
		for (let i = 0; i < shapes.length; i++) {
			const shape = shapes[i];
			for (let j = i + 1; j < shapes.length && shapes[j].left <= shape.right; j++) {
				const otherShape = shapes[j];
				if (!isCollision(shape, otherShape)) continue;
				if (shape.element.attachedToRef === otherShape.element || otherShape.element.attachedToRef === shape.element) continue;
				overlapping.add(shape.element);
				overlapping.add(otherShape.element);
			}
		}
		elements.forEach((element) => {
			if (overlapping.has(element)) elementsToReport.add(element);
		});
	}
	function getShapes(elements, diObjects) {
		const shapes = [];
		elements.forEach((element) => {
			const bounds = diObjects.get(element)?.bounds;
			if (!isValidShapeElement(bounds)) return;
			const left = bounds.x;
			const right = bounds.x + bounds.width;
			if (Number.isNaN(left) || Number.isNaN(right)) return;
			shapes.push({
				element,
				left,
				right,
				top: bounds.y,
				bottom: bounds.y + bounds.height
			});
		});
		return shapes;
	}
	function isOutsideParentBoundary(childBounds, parentBounds) {
		if (!isValidShapeElement(childBounds) || !isValidShapeElement(parentBounds)) return false;
		const isTopLeftCornerInside = childBounds.x >= parentBounds.x && childBounds.y >= parentBounds.y;
		const isBottomRightCornerInside = childBounds.x + childBounds.width <= parentBounds.x + parentBounds.width && childBounds.y + childBounds.height <= parentBounds.y + parentBounds.height;
		return !(isTopLeftCornerInside && isBottomRightCornerInside);
	}
	function isCollision(firstShape, secondShape) {
		const collisionX = firstShape.right >= secondShape.left && secondShape.right >= firstShape.left;
		const collisionY = firstShape.bottom >= secondShape.top && secondShape.bottom >= firstShape.top;
		return collisionX && collisionY;
	}
	function isValidShapeElement(bounds) {
		return !!bounds && is(bounds, "dc:Bounds") && typeof bounds.x === "number" && typeof bounds.y === "number" && typeof bounds.width === "number" && typeof bounds.height === "number";
	}
	function getAllDiObjects(node) {
		const diObjects = new Map();
		(node.diagrams || []).filter((diagram) => !!diagram.plane).forEach((diagram) => {
			(diagram.plane.planeElement || []).filter((planeElement) => !!planeElement.bpmnElement).forEach((planeElement) => {
				diObjects.set(planeElement.bpmnElement, planeElement);
			});
		});
		return diObjects;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/single-blank-start-event.js
var require_single_blank_start_event = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:FlowElementsContainer")) return;
			if ((node.flowElements || []).filter(function(flowElement) {
				if (!is(flowElement, "bpmn:StartEvent")) return false;
				return (flowElement.eventDefinitions || []).length === 0;
			}).length > 1) {
				const type = is(node, "bpmn:SubProcess") ? "Sub process" : "Process";
				reporter.report(node.id, type + " has multiple blank start events");
			}
		}
		return annotateRule("single-blank-start-event", { check });
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/single-event-definition.js
var require_single_event_definition = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:Event")) return;
			if ((node.eventDefinitions || []).length > 1) reporter.report(node.id, "Event has multiple event definitions", ["eventDefinitions"]);
		}
		return annotateRule("single-event-definition", { check });
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/standard-size.js
var require_standard_size = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	var DEFAULT_SIZES = {
		"bpmn:Task": {
			width: 100,
			height: 80
		},
		"bpmn:CallActivity": {
			width: 100,
			height: 80
		},
		"bpmn:SubProcess": {
			width: 100,
			height: 80
		},
		"bpmn:Gateway": {
			width: 50,
			height: 50
		},
		"bpmn:Event": {
			width: 36,
			height: 36
		},
		"bpmn:DataObjectReference": {
			width: 36,
			height: 50
		},
		"bpmn:DataStoreReference": {
			width: 50,
			height: 50
		},
		"bpmn:Participant": {
			width: 60,
			height: 60
		}
	};
	var CHECKED_TYPES = [
		"bpmn:SubProcess",
		"bpmn:CallActivity",
		"bpmn:Task",
		"bpmn:Gateway",
		"bpmn:Event",
		"bpmn:DataObjectReference",
		"bpmn:DataStoreReference"
	];
	module.exports = function(config) {
		const sizes = {
			...DEFAULT_SIZES,
			...config || {}
		};
		function check(node, reporter) {
			if (!is(node, "bpmndi:BPMNShape")) return;
			const element = node.bpmnElement;
			const bounds = node.bounds;
			if (!element || !isValidBounds(bounds)) return;
			const expected = getExpectedSize(element, node, sizes);
			if (!expected || typeof expected !== "object") return;
			const widthMismatch = typeof expected.width === "number" && bounds.width !== expected.width;
			const heightMismatch = typeof expected.height === "number" && bounds.height !== expected.height;
			if (!widthMismatch && !heightMismatch) return;
			reporter.report(element.id, getMessage(expected));
		}
		return annotateRule("standard-size", { check });
	};
	function getExpectedSize(element, di, sizes) {
		if (is(element, "bpmn:Participant")) {
			if (element.processRef) return null;
			const horizontal = isHorizontal(di);
			const participantSize = sizes["bpmn:Participant"] || {};
			const value = horizontal ? participantSize.height : participantSize.width;
			if (typeof value !== "number") return null;
			return horizontal ? { height: value } : { width: value };
		}
		if (is(element, "bpmn:Lane")) return null;
		if (is(element, "bpmn:SubProcess") && isExpanded(di)) return null;
		const type = CHECKED_TYPES.find((type) => is(element, type));
		if (!type) return null;
		return sizes[type];
	}
	function getMessage(expected) {
		if (typeof expected.height !== "number") return `Element has a non-standard width; expected width of ${expected.width}`;
		if (typeof expected.width !== "number") return `Element has a non-standard height; expected height of ${expected.height}`;
		return `Element has a non-standard size; expected ${expected.width}x${expected.height}`;
	}
	function isExpanded(di) {
		return !!di && !!di.isExpanded;
	}
	function isHorizontal(di) {
		return !di || di.isHorizontal === void 0 || di.isHorizontal === true;
	}
	function isValidBounds(bounds) {
		return !!bounds && is(bounds, "dc:Bounds") && typeof bounds.width === "number" && typeof bounds.height === "number";
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/start-event-required.js
var require_start_event_required = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function hasStartEvent(node) {
			return (node.flowElements || []).some((node) => is(node, "bpmn:StartEvent"));
		}
		function check(node, reporter) {
			if (!isAny(node, ["bpmn:Process", "bpmn:SubProcess"]) || is(node, "bpmn:AdHocSubProcess")) return;
			if (!hasStartEvent(node)) {
				const type = is(node, "bpmn:SubProcess") ? "Sub process" : "Process";
				reporter.report(node.id, type + " is missing start event");
			}
		}
		return annotateRule("start-event-required", { check });
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/sub-process-blank-start-event.js
var require_sub_process_blank_start_event = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:SubProcess") || node.triggeredByEvent) return;
			(node.flowElements || []).forEach(function(flowElement) {
				if (!is(flowElement, "bpmn:StartEvent")) return false;
				if ((flowElement.eventDefinitions || []).length > 0) reporter.report(flowElement.id, "Start event must be blank", ["eventDefinitions"]);
			});
		}
		return annotateRule("sub-process-blank-start-event", { check });
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/superfluous-gateway.js
var require_superfluous_gateway = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:Gateway")) return;
			const incoming = node.incoming || [];
			const outgoing = node.outgoing || [];
			if (incoming.length === 1 && outgoing.length === 1) reporter.report(node.id, "Gateway is superfluous. It only has one source and target.");
		}
		return annotateRule("superfluous-gateway", { check });
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/superfluous-label.js
var require_superfluous_label = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:SequenceFlow")) return;
			if (!(node.name || "").trim()) return;
			if (hasCondition(node) || isDefaultFlow(node) || isGatewayFork(node)) return;
			reporter.report(node.id, "Sequence flow has superfluous label", ["name"]);
		}
		return annotateRule("superfluous-label", { check });
	};
	function hasCondition(flow) {
		return !!flow.conditionExpression;
	}
	function isDefaultFlow(flow) {
		const source = flow.sourceRef;
		return source && source["default"] === flow;
	}
	function isGatewayFork(flow) {
		const source = flow.sourceRef;
		if (!source) return false;
		return (is(source, "bpmn:ExclusiveGateway") || is(source, "bpmn:InclusiveGateway")) && (source.outgoing || []).length > 1;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint/rules/superfluous-termination.js
var require_superfluous_termination = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { annotateRule } = require_helper$1();
	module.exports = function() {
		function check(node, reporter) {
			if (!isAny(node, ["bpmn:Process", "bpmn:SubProcess"])) return;
			const ends = (node.flowElements || []).filter((element) => is(element, "bpmn:FlowNode") && (element.outgoing || []).length === 0);
			const terminateEnds = ends.filter(isTerminateEnd);
			if (terminateEnds.length !== 1) return;
			if (ends.every((end) => isInterruptingEventSub(end) || isTerminateEnd(end))) for (const node of terminateEnds) reporter.report(node.id, "Termination is superfluous.");
		}
		return annotateRule("superfluous-termination", { check });
	};
	function isTerminateEnd(element) {
		return is(element, "bpmn:EndEvent") && (element.eventDefinitions || []).some((eventDefinition) => is(eventDefinition, "bpmn:TerminateEventDefinition"));
	}
	function isInterruptingEventSub(element) {
		return is(element, "bpmn:SubProcess") && element.triggeredByEvent && (element.flowElements || []).some((element) => is(element, "bpmn:StartEvent") && element.isInterrupting);
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/index.js
var require_bpmnlint_plugin_camunda_compat = __commonJSMin(((exports, module) => {
	var { omit } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var camundaCloud10Rules = withConfig({
		"implementation": "error",
		"called-element": "error",
		"collapsed-subprocess": "error",
		"duplicate-task-headers": "error",
		"element-type": "error",
		"error-reference": "error",
		"event-based-gateway-target": "error",
		"executable-process": "error",
		"loop-characteristics": "error",
		"message-reference": "error",
		"io-mapping": "error",
		"no-binding-type": "error",
		"no-business-id": "error",
		"no-candidate-users": "error",
		"no-cancel-execution-listener": "error",
		"no-execution-listener-headers": "error",
		"no-execution-listeners": "error",
		"no-expression": "error",
		"no-job-priority-definition": "error",
		"no-loop": "error",
		"no-multiple-none-start-events": "error",
		"no-priority-definition": "error",
		"no-propagate-all-parent-variables": "error",
		"no-task-listeners": "error",
		"no-task-schedule": "error",
		"no-template": "error",
		"no-version-tag": "error",
		"no-zeebe-properties": "error",
		"no-zeebe-user-task": "error",
		"sequence-flow-condition": "error",
		"start-event-form": "error",
		"subscription": "error",
		"timer": "error",
		"user-task-definition": "warn",
		"user-task-form": "error",
		"variable-name": "error",
		"feel": "error",
		"feel-compatibility": "error",
		"bpmnlint/start-event-required": "error"
	}, { version: "1.0" });
	var camundaCloud11Rules = withConfig(camundaCloud10Rules, { version: "1.1" });
	var camundaCloud12Rules = withConfig(camundaCloud11Rules, { version: "1.2" });
	var camundaCloud13Rules = withConfig(camundaCloud12Rules, { version: "1.3" });
	var camundaCloud80Rules = withConfig({
		...omit(camundaCloud13Rules, "no-template"),
		"connector-properties": "warn"
	}, { version: "8.0" });
	var camundaCloud81Rules = withConfig({
		...omit(camundaCloud80Rules, "no-zeebe-properties"),
		"inclusive-gateway": "error"
	}, { version: "8.1" });
	var camundaCloud82Rules = withConfig({
		...omit(camundaCloud81Rules, [
			"no-candidate-users",
			"no-propagate-all-parent-variables",
			"no-task-schedule"
		]),
		"escalation-boundary-event-attached-to-ref": "error",
		"escalation-reference": "error",
		"link-event": "error",
		"no-signal-event-sub-process": "error",
		"task-schedule": "error"
	}, { version: "8.2" });
	var camundaCloud83Rules = withConfig({
		...omit(camundaCloud82Rules, "no-signal-event-sub-process"),
		"secrets": "warn",
		"signal-reference": "error"
	}, { version: "8.3" });
	var camundaCloud84Rules = withConfig(omit(camundaCloud83Rules, "collapsed-subprocess"), { version: "8.4" });
	var camundaCloud85Rules = withConfig({
		...omit(camundaCloud83Rules, ["collapsed-subprocess", "no-zeebe-user-task"]),
		"wait-for-completion": "error"
	}, { version: "8.5" });
	var camundaCloud86Rules = withConfig({
		...omit(camundaCloud85Rules, [
			"inclusive-gateway",
			"no-binding-type",
			"no-execution-listeners",
			"no-priority-definition",
			"no-version-tag"
		]),
		"duplicate-execution-listeners": "error",
		"execution-listener": "error",
		"no-before-all-execution-listener": "error",
		"priority-definition": "error",
		"version-tag": "error",
		"zeebe-user-task": "warn"
	}, { version: "8.6" });
	var camundaCloud87Rules = withConfig({
		...camundaCloud86Rules,
		"ad-hoc-sub-process": "error",
		"no-interrupting-event-subprocess": "error"
	}, { version: "8.7" });
	var camundaCloud88Rules = withConfig({
		...omit(camundaCloud87Rules, ["no-task-listeners"]),
		"agent-tool-documentation": "warn",
		"agent-tool-output-key": "warn",
		"agent-fromai-contract": "error",
		"task-listener": "error"
	}, { version: "8.8" });
	var camundaCloud89Rules = withConfig({
		...camundaCloud88Rules,
		"start-event-form-embedded": "warn"
	}, { version: "8.9" });
	var camundaCloud810Rules = withConfig({
		...omit(camundaCloud89Rules, [
			"no-business-id",
			"no-execution-listener-headers",
			"no-before-all-execution-listener",
			"no-cancel-execution-listener",
			"no-job-priority-definition"
		]),
		"before-all-execution-listener": "error",
		"cancel-execution-listener": "error",
		"duplicate-execution-listener-headers": "error",
		"unresolvable-secret-reference": "error"
	}, { version: "8.10" });
	var camundaPlatform719Rules = withConfig({ "history-time-to-live": "info" }, {
		platform: "camunda-platform",
		version: "7.19"
	});
	var camundaPlatform720Rules = withConfig(camundaPlatform719Rules, {
		platform: "camunda-platform",
		version: "7.20"
	});
	var camundaPlatform721Rules = withConfig(camundaPlatform720Rules, {
		platform: "camunda-platform",
		version: "7.21"
	});
	var camundaPlatform722Rules = withConfig(camundaPlatform721Rules, {
		platform: "camunda-platform",
		version: "7.22"
	});
	var camundaPlatform723Rules = withConfig(camundaPlatform721Rules, {
		platform: "camunda-platform",
		version: "7.23"
	});
	var camundaPlatform724Rules = withConfig(camundaPlatform723Rules, {
		platform: "camunda-platform",
		version: "7.24"
	});
	var rules = {
		"ad-hoc-sub-process": "./rules/camunda-cloud/ad-hoc-sub-process",
		"agent-fromai-contract": "./rules/camunda-cloud/agent-fromai-contract",
		"agent-tool-documentation": "./rules/camunda-cloud/agent-tool-documentation",
		"agent-tool-output-key": "./rules/camunda-cloud/agent-tool-output-key",
		"before-all-execution-listener": "./rules/camunda-cloud/before-all-execution-listener",
		"element-type": "./rules/camunda-cloud/element-type",
		"cancel-execution-listener": "./rules/camunda-cloud/cancel-execution-listener",
		"called-element": "./rules/camunda-cloud/called-element",
		"collapsed-subprocess": "./rules/camunda-cloud/collapsed-subprocess",
		"connector-properties": "./rules/camunda-cloud/connector-properties",
		"duplicate-execution-listener-headers": "./rules/camunda-cloud/duplicate-execution-listener-headers",
		"duplicate-execution-listeners": "./rules/camunda-cloud/duplicate-execution-listeners",
		"duplicate-task-headers": "./rules/camunda-cloud/duplicate-task-headers",
		"error-reference": "./rules/camunda-cloud/error-reference",
		"escalation-boundary-event-attached-to-ref": "./rules/camunda-cloud/escalation-boundary-event-attached-to-ref",
		"escalation-reference": "./rules/camunda-cloud/escalation-reference",
		"event-based-gateway-target": "./rules/camunda-cloud/event-based-gateway-target",
		"executable-process": "./rules/camunda-cloud/executable-process",
		"execution-listener": "./rules/camunda-cloud/execution-listener",
		"feel": "./rules/camunda-cloud/feel",
		"feel-compatibility": "./rules/camunda-cloud/feel-compatibility",
		"history-time-to-live": "./rules/camunda-platform/history-time-to-live",
		"implementation": "./rules/camunda-cloud/implementation",
		"inclusive-gateway": "./rules/camunda-cloud/inclusive-gateway",
		"link-event": "./rules/camunda-cloud/link-event",
		"loop-characteristics": "./rules/camunda-cloud/loop-characteristics",
		"io-mapping": "./rules/camunda-cloud/io-mapping",
		"message-reference": "./rules/camunda-cloud/message-reference",
		"no-binding-type": "./rules/camunda-cloud/no-binding-type",
		"no-business-id": "./rules/camunda-cloud/no-business-id",
		"no-before-all-execution-listener": "./rules/camunda-cloud/no-before-all-execution-listener",
		"no-candidate-users": "./rules/camunda-cloud/no-candidate-users",
		"no-cancel-execution-listener": "./rules/camunda-cloud/no-cancel-execution-listener",
		"no-execution-listener-headers": "./rules/camunda-cloud/no-execution-listener-headers",
		"no-execution-listeners": "./rules/camunda-cloud/no-execution-listeners",
		"no-expression": "./rules/camunda-cloud/no-expression",
		"no-interrupting-event-subprocess": "./rules/camunda-cloud/no-interrupting-event-subprocess",
		"no-job-priority-definition": "./rules/camunda-cloud/no-job-priority-definition",
		"no-loop": "./rules/camunda-cloud/no-loop",
		"no-multiple-none-start-events": "./rules/camunda-cloud/no-multiple-none-start-events",
		"no-priority-definition": "./rules/camunda-cloud/no-priority-definition",
		"no-propagate-all-parent-variables": "./rules/camunda-cloud/no-propagate-all-parent-variables",
		"no-signal-event-sub-process": "./rules/camunda-cloud/no-signal-event-sub-process",
		"no-task-schedule": "./rules/camunda-cloud/no-task-schedule",
		"no-task-listeners": "./rules/camunda-cloud/no-task-listeners",
		"no-template": "./rules/camunda-cloud/no-template",
		"no-version-tag": "./rules/camunda-cloud/no-version-tag",
		"no-zeebe-properties": "./rules/camunda-cloud/no-zeebe-properties",
		"no-zeebe-user-task": "./rules/camunda-cloud/no-zeebe-user-task",
		"priority-definition": "./rules/camunda-cloud/priority-definition",
		"zeebe-user-task": "./rules/camunda-cloud/zeebe-user-task",
		"secrets": "./rules/camunda-cloud/secrets",
		"sequence-flow-condition": "./rules/camunda-cloud/sequence-flow-condition",
		"signal-reference": "./rules/camunda-cloud/signal-reference",
		"start-event-form": "./rules/camunda-cloud/start-event-form",
		"start-event-form-embedded": "./rules/camunda-cloud/start-event-form-embedded",
		"subscription": "./rules/camunda-cloud/subscription",
		"task-listener": "./rules/camunda-cloud/task-listener",
		"task-schedule": "./rules/camunda-cloud/task-schedule",
		"timer": "./rules/camunda-cloud/timer",
		"unresolvable-secret-reference": "./rules/camunda-cloud/unresolvable-secret-reference",
		"user-task-definition": "./rules/camunda-cloud/user-task-definition",
		"user-task-form": "./rules/camunda-cloud/user-task-form",
		"variable-name": "./rules/camunda-cloud/variable-name",
		"version-tag": "./rules/camunda-cloud/version-tag",
		"wait-for-completion": "./rules/camunda-cloud/wait-for-completion",
		...["bpmnlint/start-event-required"].reduce((rules, rule) => {
			rules[rule] = rule;
			return rules;
		}, {})
	};
	var configs = {
		"camunda-cloud-1-0": { rules: camundaCloud10Rules },
		"camunda-cloud-1-1": { rules: camundaCloud11Rules },
		"camunda-cloud-1-2": { rules: camundaCloud12Rules },
		"camunda-cloud-1-3": { rules: camundaCloud13Rules },
		"camunda-cloud-8-0": { rules: camundaCloud80Rules },
		"camunda-cloud-8-1": { rules: camundaCloud81Rules },
		"camunda-cloud-8-2": { rules: camundaCloud82Rules },
		"camunda-cloud-8-3": { rules: camundaCloud83Rules },
		"camunda-cloud-8-4": { rules: camundaCloud84Rules },
		"camunda-cloud-8-5": { rules: camundaCloud85Rules },
		"camunda-cloud-8-6": { rules: camundaCloud86Rules },
		"camunda-cloud-8-7": { rules: camundaCloud87Rules },
		"camunda-cloud-8-8": { rules: camundaCloud88Rules },
		"camunda-cloud-8-9": { rules: camundaCloud89Rules },
		"camunda-cloud-8-10": { rules: camundaCloud810Rules },
		"camunda-platform-7-19": { rules: camundaPlatform719Rules },
		"camunda-platform-7-20": { rules: camundaPlatform720Rules },
		"camunda-platform-7-21": { rules: camundaPlatform721Rules },
		"camunda-platform-7-22": { rules: camundaPlatform722Rules },
		"camunda-platform-7-23": { rules: camundaPlatform723Rules },
		"camunda-platform-7-24": { rules: camundaPlatform724Rules }
	};
	module.exports = {
		configs: {
			...configs,
			"all": { rules: Object.keys(rules).reduce((allRules, rule) => {
				return {
					...allRules,
					[rule]: Object.values(configs).reduce((type, { rules }) => {
						if (type) return type;
						if (rules[rule]) return Array.isArray(rules[rule]) ? rules[rule][0] : rules[rule];
						return type;
					}, null)
				};
			}, {}) }
		},
		rules
	};
	function withConfig(rules, config) {
		let rulesWithConfig = {};
		for (let name in rules) rulesWithConfig[name] = [Array.isArray(rules[name]) ? rules[name][0] : rules[name], config];
		return rulesWithConfig;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/utils/version.js
var require_version = __commonJSMin(((exports, module) => {
	var cmp = require_semver_compare();
	module.exports.greaterOrEqual = function(version, allowedVersion) {
		if (!version) throw new Error("Rule requires { version } config, e.g. [ \"warn\", { \"version\": \"8.0\" } ]");
		return cmp(version, allowedVersion) !== -1;
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/utils/rule.js
var require_rule = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { greaterOrEqual } = require_version();
	function skipInNonExecutableProcess(ruleFactory) {
		return function(config = {}) {
			const rule = ruleFactory(config);
			const { version, platform = "camunda-cloud" } = config;
			function check(node, reporter) {
				if (platform === "camunda-cloud" && version && greaterOrEqual(version, "8.2") && isNonExecutableProcess(node)) return false;
				if (platform === "camunda-platform" && isNonExecutableProcess(node)) return false;
				return rule.check(node, reporter);
			}
			return {
				...rule,
				check
			};
		};
	}
	module.exports = { skipInNonExecutableProcess };
	function isNonExecutableProcess(node) {
		let process;
		if (is(node, "bpmn:Process")) process = node;
		if (is(node, "bpmndi:BPMNPlane") && is(node.get("bpmnElement"), "bpmn:Process")) process = node.get("bpmnElement");
		return process && !process.get("isExecutable");
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/utils/error-types.js
var require_error_types = __commonJSMin(((exports, module) => {
	module.exports.ERROR_TYPES = Object.freeze({
		CHILD_ELEMENT_OF_TYPE_REQUIRED: "camunda.childElementOfTypeRequired",
		CHILD_ELEMENT_TYPE_NOT_ALLOWED: "camunda.childElementTypeNotAllowed",
		CONNECTORS_PROPERTY_VALUE_NOT_ALLOWED: "camunda.connectors.propertyValueNotAllowed",
		ELEMENT_COLLAPSED_NOT_ALLOWED: "camunda.elementCollapsedNotAllowed",
		ELEMENT_MULTIPLE_NOT_ALLOWED: "camunda.elementMultipleNotAllowed",
		ELEMENT_TYPE_NOT_ALLOWED: "camunda.elementTypeNotAllowed",
		ELEMENT_PROPERTY_VALUE_DUPLICATED: "camunda.elementPropertyValueDuplicated",
		EVENT_BASED_GATEWAY_TARGET_NOT_ALLOWED: "camunda.eventBasedGatewayTargetNotAllowed",
		EXPRESSION_NOT_ALLOWED: "camunda.expressionNotAllowed",
		EXPRESSION_REQUIRED: "camunda.expressionRequired",
		EXPRESSION_VALUE_NOT_ALLOWED: "camunda.expressionValueNotAllowed",
		EXTENSION_ELEMENT_NOT_ALLOWED: "camunda.extensionElementNotAllowed",
		EXTENSION_ELEMENT_REQUIRED: "camunda.extensionElementRequired",
		FEEL_EXPRESSION_INVALID: "camunda.feelExpressionInvalid",
		FEEL_EXPRESSION_UNSUPPORTED_FUNCTION: "camunda.feelExpressionUnsupportedFunction",
		LOOP_NOT_ALLOWED: "camunda.loopNotAllowed",
		ATTACHED_TO_REF_ELEMENT_TYPE_NOT_ALLOWED: "camunda.attachedToRefElementTypeNotAllowed",
		PROPERTY_DEPENDENT_REQUIRED: "camunda.propertyDependentRequired",
		PROPERTY_NOT_ALLOWED: "camunda.propertyNotAllowed",
		PROPERTY_DEPRECATED: "camunda.propertyDeprecated",
		PROPERTY_REQUIRED: "camunda.propertyRequired",
		PROPERTY_TYPE_NOT_ALLOWED: "camunda.propertyTypeNotAllowed",
		PROPERTY_VALUE_DUPLICATED: "camunda.propertyValueDuplicated",
		PROPERTY_VALUES_DUPLICATED: "camunda.propertiesValuesDuplicated",
		PROPERTY_VALUE_NOT_ALLOWED: "camunda.propertyValueNotAllowed",
		PROPERTY_VALUE_REQUIRED: "camunda.propertyValueRequired",
		SECRET_EXPRESSION_FORMAT_DEPRECATED: "camunda.secretExpressionFormatDeprecated",
		SECRET_EXPRESSION_FORMAT_LEGACY: "camunda.secretExpressionFormatLegacy",
		SECRET_REFERENCE_STRING_LITERAL_NOT_ALLOWED: "camunda.secretReferenceStringLiteralNotAllowed",
		SECRET_REFERENCE_INSIDE_LIST_NOT_ALLOWED: "camunda.secretReferenceInsideListNotAllowed",
		SECRET_REFERENCE_INSIDE_IF_BRANCH_CONTEXT_NOT_ALLOWED: "camunda.secretReferenceInsideIfBranchContextNotAllowed",
		AGENT_FEEL_FUNCTION_NAME_INVALID: "camunda.agentFeelFunctionNameInvalid",
		AGENT_FEEL_KEY_MISSING: "camunda.agentFeelKeyMissing",
		AGENT_FEEL_KEY_TYPE_INVALID: "camunda.agentFeelKeyTypeInvalid",
		AGENT_FEEL_KEY_PREFIX_MISSING: "camunda.agentFeelKeyPrefixMissing",
		AGENT_FEEL_DESCRIPTION_TYPE_INVALID: "camunda.agentFeelDescriptionTypeInvalid",
		AGENT_FEEL_WRONG_CONTEXT: "camunda.agentFeelWrongContext",
		AGENT_FEEL_KEY_SEGMENTS_INVALID: "camunda.agentFeelKeySegmentsInvalid",
		AGENT_FEEL_KEY_DUPLICATE: "camunda.agentFeelKeyDuplicate",
		AGENT_FEEL_NON_ENTRY_ELEMENT: "camunda.agentFeelNonEntryElement",
		AGENT_TOOL_OUTPUT_KEY_INVALID: "camunda.agentToolOutputKeyInvalid",
		AGENT_TOOL_OUTPUT_KEY_CASING_INVALID: "camunda.agentToolOutputKeyCasingInvalid",
		AGENT_TOOL_OUTPUT_KEY_OVERWRITE: "camunda.agentToolOutputKeyOverwrite",
		AGENT_TOOL_RESULT_MISSING: "camunda.agentToolResultMissing",
		AGENT_TOOL_DOCUMENTATION_MISSING: "camunda.agentToolDocumentationMissing"
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/utils/element.js
var require_element = __commonJSMin(((exports, module) => {
	var { filter, isArray, isDefined, isFunction, isNil, isObject, isString, isUndefined, matchPattern, some } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { getPath, pathConcat } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { ERROR_TYPES } = require_error_types();
	var { greaterOrEqual } = require_version();
	module.exports.ERROR_TYPES = ERROR_TYPES;
	function leafPaths(nodes, propertyName, parentNode = null) {
		const paths = nodes.map((node) => getPath(node, parentNode)).filter((path) => isArray(path)).map((path) => pathConcat(path, propertyName));
		return paths.length ? { paths } : {};
	}
	function getReferencePath({ element, referenceHolder, referenceProperty, referencedRoot, node }) {
		return pathConcat(getPath(referenceHolder, element), referenceProperty, getPath(node, referencedRoot));
	}
	module.exports.getReferencePath = getReferencePath;
	function getEventDefinition(node) {
		const eventDefinitions = node.get("eventDefinitions");
		if (eventDefinitions) return eventDefinitions[0];
	}
	module.exports.getEventDefinition = getEventDefinition;
	module.exports.getMessageEventDefinition = function(node) {
		if (is(node, "bpmn:ReceiveTask")) return node;
		return getEventDefinition(node);
	};
	function findExtensionElements(node, types) {
		const extensionElements = node.get("extensionElements");
		if (!extensionElements) return;
		const values = extensionElements.get("values");
		if (!values || !values.length) return;
		if (!isArray(types)) types = [types];
		return values.filter((value) => isAny(value, types));
	}
	module.exports.findExtensionElements = findExtensionElements;
	function findExtensionElement(node, types) {
		const extensionElements = findExtensionElements(node, types);
		if (extensionElements && extensionElements.length) return extensionElements[0];
	}
	module.exports.findExtensionElement = findExtensionElement;
	function formatNames(names, exclusive = false) {
		return names.reduce((string, name, index) => {
			if (index === 0) return `<${name}>`;
			if (index === names.length - 1) return `${string} ${exclusive ? "or" : "and"} <${name}>`;
			return `${string}, <${name}>`;
		}, "");
	}
	module.exports.formatNames = formatNames;
	module.exports.hasDuplicatedPropertyValues = function(node, propertiesName, propertyName, parentNode = null) {
		const properties = node.get(propertiesName);
		const propertyValues = properties.map((property) => property.get(propertyName));
		const duplicates = propertyValues.reduce((duplicates, propertyValue, index) => {
			if (propertyValues.indexOf(propertyValue) !== index && !duplicates.includes(propertyValue)) return [...duplicates, propertyValue];
			return duplicates;
		}, []);
		if (duplicates.length) return duplicates.map((duplicate) => {
			const duplicateProperties = properties.filter((property) => property.get(propertyName) === duplicate);
			return {
				message: `Properties of type <${duplicateProperties[0].$type}> have property <${propertyName}> with duplicate value of <${duplicate}>`,
				path: null,
				...leafPaths(duplicateProperties, propertyName, parentNode),
				data: {
					type: ERROR_TYPES.PROPERTY_VALUE_DUPLICATED,
					node,
					parentNode: parentNode == node ? null : parentNode,
					duplicatedProperty: propertyName,
					duplicatedPropertyValue: duplicate,
					properties: duplicateProperties,
					propertiesName
				}
			};
		});
		return [];
	};
	module.exports.hasDuplicatedPropertiesValues = function(node, containerPropertyName, propertiesNames, parentNode = null) {
		const properties = node.get(containerPropertyName);
		const duplicates = properties.reduce((foundDuplicates, property, index) => {
			if (properties.slice(0, index).find((p) => propertiesNames.every((propertyName) => p.get(propertyName) === property.get(propertyName)))) return foundDuplicates.concat(property);
			return foundDuplicates;
		}, []);
		if (duplicates.length) return duplicates.map((duplicate) => {
			const propertiesMap = {};
			for (const property of propertiesNames) propertiesMap[property] = duplicate.get(property);
			const duplicateProperties = filter(properties, matchPattern(propertiesMap));
			const duplicatesSummary = propertiesNames.map((propertyName) => `property <${propertyName}> with duplicate value of <${propertiesMap[propertyName]}>`).join(", ");
			return {
				message: `Properties of type <${duplicate.$type}> have properties with duplicate values (${duplicatesSummary})`,
				path: null,
				...leafPaths(duplicateProperties, "type", parentNode),
				data: {
					type: ERROR_TYPES.PROPERTY_VALUES_DUPLICATED,
					node,
					parentNode: parentNode == node ? null : parentNode,
					duplicatedProperties: propertiesMap,
					properties: duplicateProperties,
					propertiesName: containerPropertyName
				}
			};
		});
		return [];
	};
	module.exports.hasProperties = function(node, properties, parentNode = null, nodePath) {
		return Object.entries(properties).reduce((results, property) => {
			const [propertyName, propertyChecks] = property;
			const { allowedVersion = null } = propertyChecks;
			const path = nodePath === void 0 ? getPath(node, parentNode) : nodePath;
			const propertyValue = node.get(propertyName);
			if (propertyChecks.required && isEmptyValue(propertyValue)) return [...results, {
				message: allowedVersion ? `Element of type <${node.$type}> without property <${propertyName}> only allowed by Camunda ${allowedVersion} or newer` : `Element of type <${node.$type}> must have property <${propertyName}>`,
				path: pathConcat(path || [], propertyName),
				data: addAllowedVersion({
					type: ERROR_TYPES.PROPERTY_REQUIRED,
					node,
					parentNode: parentNode == node ? null : parentNode,
					requiredProperty: propertyName
				}, allowedVersion)
			}];
			if (propertyChecks.dependentRequired) {
				if (node.get(propertyChecks.dependentRequired) && isEmptyValue(propertyValue)) return [...results, {
					message: `Element of type <${node.$type}> must have property <${propertyName}> if it has property <${propertyChecks.dependentRequired}>`,
					path: pathConcat(path || [], propertyName),
					data: {
						type: ERROR_TYPES.PROPERTY_DEPENDENT_REQUIRED,
						node,
						parentNode: parentNode == node ? null : parentNode,
						property: propertyChecks.dependentRequired,
						dependentRequiredProperty: propertyName
					}
				}];
			}
			if (propertyChecks.type && propertyValue && (!propertyValue.$instanceOf || !isArray(propertyChecks.type) && !propertyValue.$instanceOf(propertyChecks.type) || isArray(propertyChecks.type) && !some(propertyChecks.type, (type) => propertyValue.$instanceOf(type)))) return [...results, {
				message: allowedVersion ? `Property <${propertyName}> of type <${propertyValue.$type}> only allowed by Camunda ${allowedVersion} or newer` : `Property <${propertyName}> of type <${propertyValue.$type}> not allowed`,
				path: pathConcat(path || [], propertyName),
				data: addAllowedVersion({
					type: ERROR_TYPES.PROPERTY_TYPE_NOT_ALLOWED,
					node,
					parentNode: parentNode == node ? null : parentNode,
					property: propertyName,
					allowedPropertyType: propertyChecks.type
				}, allowedVersion)
			}];
			if ("value" in propertyChecks && propertyChecks.value !== propertyValue) return [...results, {
				message: `Property <${propertyName}> must have value of <${propertyChecks.value}>`,
				path: pathConcat(path || [], propertyName),
				data: {
					type: ERROR_TYPES.PROPERTY_VALUE_REQUIRED,
					node,
					parentNode: parentNode == node ? null : parentNode,
					property: propertyName,
					requiredValue: propertyChecks.value
				}
			}];
			if (propertyChecks.allowed === false && isDefined(propertyValue) && !isNil(propertyValue)) return [...results, {
				message: allowedVersion ? `Property <${propertyName}> only allowed by Camunda ${allowedVersion} or newer` : `Property <${propertyName}> not allowed`,
				path: pathConcat(path || [], propertyName),
				data: addAllowedVersion({
					type: ERROR_TYPES.PROPERTY_NOT_ALLOWED,
					node,
					parentNode: parentNode == node ? null : parentNode,
					property: propertyName
				}, allowedVersion)
			}];
			if (isFunction(propertyChecks.allowed) && !propertyChecks.allowed(propertyValue)) return [...results, {
				message: allowedVersion ? `Property value of <${truncate(propertyValue)}> only allowed by Camunda ${allowedVersion} or newer` : `Property value of <${truncate(propertyValue)}> not allowed`,
				path: pathConcat(path || [], propertyName),
				data: addAllowedVersion({
					type: ERROR_TYPES.PROPERTY_VALUE_NOT_ALLOWED,
					node,
					parentNode: parentNode == node ? null : parentNode,
					property: propertyName
				}, allowedVersion)
			}];
			return results;
		}, []);
	};
	module.exports.hasProperty = function(node, propertyNames, parentNode = null) {
		propertyNames = isArray(propertyNames) ? propertyNames : [propertyNames];
		if (findProperties(node, propertyNames).length !== 1) return [{
			message: `Element of type <${node.$type}> must have property ${formatNames(propertyNames, true)}`,
			path: getPath(node, parentNode),
			data: {
				type: ERROR_TYPES.PROPERTY_REQUIRED,
				node,
				parentNode: parentNode == node ? null : parentNode,
				requiredProperty: propertyNames
			}
		}];
		return [];
	};
	function findProperties(node, propertyNames) {
		const properties = [];
		for (const propertyName of propertyNames) if (!isEmptyValue(node.get(propertyName))) properties.push(node.get(propertyName));
		return properties;
	}
	module.exports.hasExtensionElement = function(node, types, parentNode = null) {
		const typesArray = isArray(types) ? types : [types];
		const extensionElements = findExtensionElements(node, typesArray);
		if (!extensionElements || extensionElements.length !== 1) return [{
			message: `Element of type <${node.$type}> must have one extension element of type ${formatNames(typesArray, true)}`,
			path: getPath(node, parentNode),
			data: {
				type: ERROR_TYPES.EXTENSION_ELEMENT_REQUIRED,
				node,
				parentNode: parentNode == node ? null : parentNode,
				requiredExtensionElement: types
			}
		}];
		return [];
	};
	module.exports.hasNoExtensionElement = function(node, type, parentNode = null, allowedVersion = null) {
		const extensionElement = findExtensionElement(node, type);
		if (extensionElement) return [{
			message: allowedVersion ? `Extension element of type <${type}> only allowed by Camunda ${allowedVersion}` : `Extension element of type <${type}> not allowed`,
			path: getPath(extensionElement, parentNode),
			data: addAllowedVersion({
				type: ERROR_TYPES.EXTENSION_ELEMENT_NOT_ALLOWED,
				node,
				parentNode: parentNode == node ? null : parentNode,
				extensionElement
			}, allowedVersion)
		}];
		return [];
	};
	module.exports.hasExpression = function(node, propertyName, check, parentNode = null) {
		const expression = node.get(propertyName);
		if (!expression) throw new Error("Expression not found");
		let propertyValue = expression;
		if (is(expression, "bpmn:Expression")) propertyValue = expression.get("body");
		const path = getPath(node, parentNode);
		if (!propertyValue) {
			if (check.required !== false) return [{
				message: `Property <${propertyName}> must have expression value`,
				path: pathConcat(path, propertyName),
				data: {
					type: ERROR_TYPES.EXPRESSION_REQUIRED,
					node: is(expression, "bpmn:Expression") ? expression : node,
					parentNode,
					property: propertyName
				}
			}];
			return [];
		}
		const allowed = check.allowed(propertyValue);
		if (allowed !== true) {
			let allowedVersion = null;
			if (isObject(allowed)) ({allowedVersion} = allowed);
			return [{
				message: allowedVersion ? `Expression value of <${propertyValue}> only allowed by Camunda ${allowedVersion}` : `Expression value of <${propertyValue}> not allowed`,
				path: pathConcat(path, propertyName),
				data: addAllowedVersion({
					type: ERROR_TYPES.EXPRESSION_VALUE_NOT_ALLOWED,
					node: is(expression, "bpmn:Expression") ? expression : node,
					parentNode,
					property: propertyName
				}, allowedVersion)
			}];
		}
		return [];
	};
	function isExactly(node, type) {
		const { $model } = node;
		return $model.getType(node.$type) === $model.getType(type);
	}
	module.exports.isExactly = isExactly;
	module.exports.isAnyExactly = function(node, types) {
		return some(types, (type) => isExactly(node, type));
	};
	function truncate(string, maxLength = 10) {
		const stringified = `${string}`;
		return stringified.length > maxLength ? `${stringified.slice(0, maxLength)}...` : stringified;
	}
	function addAllowedVersion(data, allowedVersion) {
		if (!allowedVersion) return data;
		return {
			...data,
			allowedVersion
		};
	}
	function findAncestorAdHocSubProcess(node) {
		let el = node.$parent;
		while (el) {
			if (is(el, "bpmn:AdHocSubProcess")) return el;
			el = el.$parent;
		}
		return null;
	}
	module.exports.findAncestorAdHocSubProcess = findAncestorAdHocSubProcess;
	var TOOL_CONTAINER_PROPERTY = "io.camunda.agenticai.toolContainer";
	var LEGACY_AI_AGENT_TEMPLATE = "io.camunda.connectors.agenticai.aiagent.jobworker.v1";
	var AI_AGENT_JOB_WORKER_TYPE_PREFIX = "io.camunda.agenticai:aiagent-job-worker:";
	function hasAiAgentJobWorkerType(node) {
		const taskDefinition = findExtensionElement(node, "zeebe:TaskDefinition");
		const type = taskDefinition && taskDefinition.get("type");
		return !!type && type.startsWith(AI_AGENT_JOB_WORKER_TYPE_PREFIX);
	}
	module.exports.hasAiAgentJobWorkerType = hasAiAgentJobWorkerType;
	function hasToolContainerProperty(node) {
		const properties = findExtensionElement(node, "zeebe:Properties");
		if (!properties) return false;
		return (properties.get("properties") || []).some((property) => property.get("name") === TOOL_CONTAINER_PROPERTY && property.get("value") === "true");
	}
	module.exports.hasToolContainerProperty = hasToolContainerProperty;
	function isAgenticAdHocSubProcess(ahsp, version) {
		if (hasToolContainerProperty(ahsp)) return true;
		if (ahsp.get("modelerTemplate") === LEGACY_AI_AGENT_TEMPLATE) return true;
		if (hasAiAgentJobWorkerType(ahsp)) return true;
		return !!version && greaterOrEqual(version, "8.10") && !!findExtensionElement(ahsp, "zeebe:AgentDefinition");
	}
	module.exports.isAgenticAdHocSubProcess = isAgenticAdHocSubProcess;
	function isAgenticToolElement(node, version) {
		return is(node, "bpmn:Activity") && !(is(node, "bpmn:SubProcess") && node.get("triggeredByEvent")) && (node.get("incoming") || []).length === 0 && is(node.$parent, "bpmn:AdHocSubProcess") && isAgenticAdHocSubProcess(node.$parent, version);
	}
	module.exports.isAgenticToolElement = isAgenticToolElement;
	function findParent(node, type) {
		if (!node) return null;
		const parent = node.$parent;
		if (!parent) return node;
		if (is(parent, type)) return parent;
		return findParent(parent, type);
	}
	module.exports.findParent = findParent;
	function findParentNode(node) {
		while (node && !isAny(node, ["bpmn:FlowElement", "bpmn:FlowElementsContainer"])) node = node.$parent;
		return node;
	}
	module.exports.findParentNode = findParentNode;
	function isEmptyString(value) {
		return isString(value) && value.trim() === "";
	}
	function isEmptyValue(value) {
		return isUndefined(value) || isNil(value) || isEmptyString(value);
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/utils/reporter.js
var require_reporter = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { isArray } = (init_dist$1(), __toCommonJS(dist_exports$1));
	module.exports.reportErrors = function(node, reporter, errors) {
		if (!isArray(errors)) errors = [errors];
		errors.forEach(({ message, ...options }) => {
			const name = getName(node);
			if (name) options = {
				...options,
				name
			};
			reporter.report(node.get("id"), message, options);
		});
	};
	function getName(node) {
		if (is(node, "bpmn:TextAnnotation")) return node.get("text");
		if (is(node, "bpmn:Group")) {
			const categoryValueRef = node.get("categoryValueRef");
			return categoryValueRef && categoryValueRef.get("value");
		}
		return node.get("name");
	}
	module.exports.getName = getName;
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-platform/history-time-to-live.js
var require_history_time_to_live = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { skipInNonExecutableProcess } = require_rule();
	var { hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:Process")) return;
			const errors = hasProperties(node, { historyTimeToLive: { required: true } }, node).map((error) => ({
				...error,
				message: "Property <historyTimeToLive> should be configured on <bpmn:Process> or engine level."
			}));
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return {
			meta: { documentation: { url: "https://docs.camunda.org/manual/latest/modeler/history-time-to-live/" } },
			check
		};
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/ad-hoc-sub-process.js
var require_ad_hoc_sub_process = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { ERROR_TYPES, hasProperties, findExtensionElement } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { greaterOrEqual } = require_version();
	var COMPLETION_ALLOWED_VERSION = "8.8";
	var OUTPUT_COLLECTION_ALLOWED_VERSION = "8.8";
	module.exports = skipInNonExecutableProcess(function({ version }) {
		function check(node, reporter) {
			if (!is(node, "bpmn:AdHocSubProcess")) return;
			const errors = [];
			if (!node.get("flowElements").some(isActivity)) errors.push({
				message: "Element of type <bpmn:AdHocSubProcess> must contain at least one activity",
				data: {
					type: ERROR_TYPES.CHILD_ELEMENT_OF_TYPE_REQUIRED,
					node,
					parentNode: null,
					requiredType: "bpmn:Activity"
				}
			});
			if (!greaterOrEqual(version, COMPLETION_ALLOWED_VERSION)) errors.push(...hasProperties(node, {
				completionCondition: {
					allowed: false,
					allowedVersion: COMPLETION_ALLOWED_VERSION
				},
				cancelRemainingInstances: {
					allowed: (value) => value !== false,
					allowedVersion: COMPLETION_ALLOWED_VERSION
				}
			}, node));
			const adHoc = findExtensionElement(node, "zeebe:AdHoc");
			if (adHoc) {
				const allowed = greaterOrEqual(version, OUTPUT_COLLECTION_ALLOWED_VERSION);
				errors.push(...hasProperties(adHoc, {
					outputCollection: {
						allowed,
						allowedVersion: OUTPUT_COLLECTION_ALLOWED_VERSION
					},
					outputElement: {
						allowed,
						allowedVersion: OUTPUT_COLLECTION_ALLOWED_VERSION
					}
				}, node));
				if (errors.length) {
					reportErrors(node, reporter, errors);
					return;
				}
				errors.push(...hasProperties(adHoc, {
					outputCollection: { dependentRequired: "outputElement" },
					outputElement: { dependentRequired: "outputCollection" }
				}, node));
			}
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
	function isActivity(element) {
		return is(element, "bpmn:Activity");
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/node_modules/@bpmn-io/lezer-feel/dist/index.js
var dist_exports = __exportAll({
	VariableContext: () => VariableContext,
	normalizeContextKey: () => normalizeContextKey,
	parser: () => parser,
	trackVariables: () => trackVariables
});
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
var init_dist = __esmMin((() => {
	init_dist$2();
	init_dist$1();
	init_dist$3();
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
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/utils/feel.js
var require_feel$1 = __commonJSMin(((exports, module) => {
	var { isString } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var { parser } = (init_dist(), __toCommonJS(dist_exports));
	var IGNORED_PROPERTIES = ["name"];
	var IGNORED_PROPERTIES_BY_TYPE = {
		"zeebe:Input": ["target"],
		"zeebe:Output": ["target"],
		"zeebe:Header": ["key", "value"],
		"zeebe:Property": ["name", "value"],
		"zeebe:CalledDecision": ["resultVariable"],
		"zeebe:Script": ["resultVariable"]
	};
	var isIgnoredProperty = (node, propertyName) => {
		if (propertyName.startsWith("$") || IGNORED_PROPERTIES.includes(propertyName)) return true;
		const ignoredForType = IGNORED_PROPERTIES_BY_TYPE[node.$type];
		return ignoredForType && ignoredForType.includes(propertyName);
	};
	var isFeelProperty = (node, propertyName, value) => {
		return !isIgnoredProperty(node, propertyName) && isString(value) && value.startsWith("=");
	};
	var CORRECT_NAME = "fromAi";
	var NAME_ALIASES = ["fromai", "fromAI"];
	var PARAMETER_NAMES = [
		"value",
		"description",
		"type",
		"schema",
		"options"
	];
	function findFunctionInvocations(expr) {
		const tree = parser.parse(expr);
		const result = [];
		function visit(node) {
			if (node.type.name === "FunctionInvocation") {
				const nameNode = node.firstChild;
				if (nameNode && nameNode.type.name === "VariableName") {
					const name = expr.slice(nameNode.from, nameNode.to);
					if (name.toLowerCase() === CORRECT_NAME.toLowerCase()) result.push({
						name,
						node
					});
				}
			}
			let child = node.firstChild;
			while (child) {
				visit(child);
				child = child.nextSibling;
			}
		}
		visit(tree.topNode);
		return result;
	}
	var nextArgNode = (node) => {
		while (node && node.type.isSkipped) node = node.nextSibling;
		return node;
	};
	function getArgs(invocationNode, expr) {
		const toArg = (node) => ({
			type: node.type.name,
			text: expr.slice(node.from, node.to)
		});
		let child = invocationNode.firstChild;
		while (child) {
			if (child.type.name === "PositionalParameters") {
				const args = [];
				let arg = nextArgNode(child.firstChild);
				while (arg) {
					args.push(toArg(arg));
					arg = nextArgNode(arg.nextSibling);
				}
				return args;
			}
			if (child.type.name === "NamedParameters") {
				const args = [];
				let param = child.firstChild;
				while (param) {
					if (param.type.name === "NamedParameter") {
						const nameNode = param.firstChild;
						const valueNode = nameNode && nextArgNode(nameNode.nextSibling);
						if (nameNode && nameNode.type.name === "ParameterName" && valueNode) {
							const index = PARAMETER_NAMES.indexOf(expr.slice(nameNode.from, nameNode.to));
							if (index !== -1) args[index] = toArg(valueNode);
						}
					}
					param = param.nextSibling;
				}
				return args;
			}
			child = child.nextSibling;
		}
		return [];
	}
	var camundaFeelParser = parser.configure({ dialect: "camunda" });
	var SECRET_REFERENCE_LITERAL_PATTERN = /camunda\.secrets\.[\w-]+/;
	function containsSecretReferenceLiteral(value) {
		return SECRET_REFERENCE_LITERAL_PATTERN.test(value);
	}
	function hasErrorNode(node) {
		if (node.type.isError) return true;
		let child = node.firstChild;
		while (child) {
			if (hasErrorNode(child)) return true;
			child = child.nextSibling;
		}
		return false;
	}
	function getChildren(node) {
		const children = [];
		let child = node.firstChild;
		while (child) {
			children.push(child);
			child = child.nextSibling;
		}
		return children;
	}
	function isSecretReferenceNode(node, expr) {
		if (node.type.name !== "PathExpression") return false;
		if (node.parent && node.parent.type.name === "PathExpression" && node.parent.firstChild === node) return false;
		const children = getChildren(node);
		if (children.length !== 2 || children[1].type.name !== "VariableName") return false;
		const [base] = children;
		if (base.type.name !== "PathExpression") return false;
		const baseChildren = getChildren(base);
		if (baseChildren.length !== 2 || baseChildren[0].type.name !== "VariableName" || baseChildren[1].type.name !== "VariableName") return false;
		return expr.slice(baseChildren[0].from, baseChildren[0].to) === "camunda" && expr.slice(baseChildren[1].from, baseChildren[1].to) === "secrets";
	}
	function containsSecretReference(node, expr) {
		if (isSecretReferenceNode(node, expr)) return true;
		let child = node.firstChild;
		while (child) {
			if (containsSecretReference(child, expr)) return true;
			child = child.nextSibling;
		}
		return false;
	}
	function getContextEntryValues(node) {
		return getChildren(node).filter((child) => child.type.name === "ContextEntry").map((entry) => getChildren(entry).pop()).filter(Boolean);
	}
	function getIfBranches(node) {
		const children = getChildren(node);
		const thenIndex = children.findIndex((c) => c.type.name === "then");
		const elseIndex = children.findIndex((c) => c.type.name === "else");
		return [thenIndex >= 0 ? children[thenIndex + 1] : null, elseIndex >= 0 ? children[elseIndex + 1] : null];
	}
	function findImpreciseContainerKind(node, expr) {
		if (!node) return null;
		if (node.type.name === "List") return containsSecretReference(node, expr) ? "list" : null;
		if (node.type.name === "Context") return containsSecretReference(node, expr) ? "context" : null;
		if (node.type.name === "IfExpression") {
			const [thenNode, elseNode] = getIfBranches(node);
			return findImpreciseContainerKind(thenNode, expr) || findImpreciseContainerKind(elseNode, expr);
		}
		return null;
	}
	function findImpreciseReferenceKind(node, expr) {
		if (node.type.name === "Context") {
			for (const value of getContextEntryValues(node)) {
				const kind = findImpreciseReferenceKind(value, expr);
				if (kind) return kind;
			}
			return null;
		}
		return findImpreciseContainerKind(node, expr);
	}
	function findSecretReferenceViolations(expr) {
		const violations = {
			stringLiteral: false,
			insideList: false,
			insideIfBranchContext: false
		};
		const topNode = camundaFeelParser.parse(expr).topNode;
		if (hasErrorNode(topNode)) return violations;
		function visit(node) {
			if (node.type.name === "StringLiteral") {
				if (containsSecretReferenceLiteral(expr.slice(node.from + 1, node.to - 1))) violations.stringLiteral = true;
			}
			let child = node.firstChild;
			while (child) {
				visit(child);
				child = child.nextSibling;
			}
		}
		visit(topNode);
		const impreciseKind = findImpreciseReferenceKind(topNode.firstChild, expr);
		if (impreciseKind === "list") violations.insideList = true;
		else if (impreciseKind === "context") violations.insideIfBranchContext = true;
		return violations;
	}
	module.exports = {
		isFeelProperty,
		findSecretReferenceViolations,
		containsSecretReferenceLiteral,
		CORRECT_NAME,
		NAME_ALIASES,
		findFunctionInvocations,
		getArgs
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/helper.js
var require_helper = __commonJSMin(((exports, module) => {
	var modelingGuidanceBaseUrl = "https://docs.camunda.io/docs/components/modeler/reference/modeling-guidance/rules";
	function annotateRule(ruleName, options) {
		const { meta: { documentation = {}, ...restMeta } = {}, ...restOptions } = options;
		return {
			meta: {
				documentation: {
					url: `${modelingGuidanceBaseUrl}/${ruleName}/`,
					...documentation
				},
				...restMeta
			},
			...restOptions
		};
	}
	module.exports.annotateRule = annotateRule;
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/agent-fromai-contract.js
var require_agent_fromai_contract = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { getPath, pathConcat } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { findExtensionElement, findAncestorAdHocSubProcess, isAgenticAdHocSubProcess } = require_element();
	var { CORRECT_NAME, NAME_ALIASES, findFunctionInvocations, getArgs } = require_feel$1();
	var { reportErrors } = require_reporter();
	var { ERROR_TYPES } = require_error_types();
	var { skipInNonExecutableProcess } = require_rule();
	var { annotateRule } = require_helper();
	function validateKeyArg(arg) {
		switch (arg.type) {
			case "StringLiteral": return {
				message: `fromAi() key must be a FEEL path, not a string literal. Remove the quotes around ${arg.text}.`,
				data: { type: ERROR_TYPES.AGENT_FEEL_KEY_TYPE_INVALID }
			};
			case "null": return {
				message: "fromAi() key must be a FEEL path starting with \"toolCall.\", not null.",
				data: { type: ERROR_TYPES.AGENT_FEEL_KEY_TYPE_INVALID }
			};
			case "NumericLiteral": return {
				message: "fromAi() key must be a FEEL path starting with \"toolCall.\", not a number.",
				data: { type: ERROR_TYPES.AGENT_FEEL_KEY_TYPE_INVALID }
			};
			case "ArithmeticExpression": return {
				message: "fromAi() key must be a FEEL path starting with \"toolCall.\", not an arithmetic expression.",
				data: { type: ERROR_TYPES.AGENT_FEEL_KEY_TYPE_INVALID }
			};
			case "FilterExpression": return {
				message: "fromAi() key must use dot notation, not bracket notation. Use toolCall.name instead of toolCall[\"name\"].",
				data: { type: ERROR_TYPES.AGENT_FEEL_KEY_TYPE_INVALID }
			};
			case "VariableName": return {
				message: `fromAi() key must start with "toolCall.". Use toolCall.${arg.text} instead of a bare name.`,
				data: { type: ERROR_TYPES.AGENT_FEEL_KEY_PREFIX_MISSING }
			};
			case "PathExpression": {
				if (!arg.text.startsWith("toolCall.")) return {
					message: `fromAi() key must start with "toolCall.". Got ${arg.text}.`,
					data: { type: ERROR_TYPES.AGENT_FEEL_KEY_PREFIX_MISSING }
				};
				const segments = arg.text.split(".");
				if (segments.length > 2) return {
					message: `fromAi() key must be a single name under toolCall. Use toolCall.${segments[segments.length - 1]} instead of ${arg.text}.`,
					data: { type: ERROR_TYPES.AGENT_FEEL_KEY_SEGMENTS_INVALID }
				};
				return null;
			}
			case "IfExpression": return {
				message: "fromAi() key must be a FEEL path starting with \"toolCall.\", not a conditional expression. The connector requires a plain reference regardless of which branch would apply at runtime.",
				data: { type: ERROR_TYPES.AGENT_FEEL_KEY_TYPE_INVALID }
			};
			default: return {
				message: `fromAi() key must be a FEEL path starting with "toolCall.", not a ${arg.type}.`,
				data: { type: ERROR_TYPES.AGENT_FEEL_KEY_TYPE_INVALID }
			};
		}
	}
	function validateDescriptionTypeInvalid(arg) {
		if (arg.type !== "StringLiteral") return {
			message: "fromAi() description must be a string literal: a quoted string describing what the agent should provide.",
			data: { type: ERROR_TYPES.AGENT_FEEL_DESCRIPTION_TYPE_INVALID }
		};
		return null;
	}
	module.exports = skipInNonExecutableProcess(function(config = {}) {
		const { version } = config;
		function check(node, reporter) {
			if (is(node, "bpmn:Activity")) {
				checkDuplicateKeys(node, reporter);
				return;
			}
			if (is(node, "zeebe:Output")) {
				checkOutputSurface(node, reporter);
				return;
			}
			if (is(node, "bpmn:SequenceFlow")) {
				checkConditionSurface(node, reporter);
				return;
			}
			if (!is(node, "zeebe:Input")) return;
			const source = node.get("source");
			if (!source || !source.startsWith("=")) return;
			const expr = source.substring(1).trim();
			const invocations = findFunctionInvocations(expr);
			if (invocations.length === 0) return;
			const task = node.$parent && node.$parent.$parent && node.$parent.$parent.$parent;
			if (!task || !is(task, "bpmn:FlowNode")) return;
			const path = pathConcat(getPath(node, task), "source");
			const ahsp = findAncestorAdHocSubProcess(task);
			if (!ahsp) {
				reportErrors(task, reporter, invocations.map(() => ({
					message: "fromAi() should only be used inside an agentic sub-process.",
					data: { type: ERROR_TYPES.AGENT_FEEL_WRONG_CONTEXT },
					path
				})));
				return;
			}
			if (!isAgenticAdHocSubProcess(ahsp, version)) {
				const ahspLabel = ahsp.get("name") || ahsp.get("id");
				reportErrors(task, reporter, invocations.map(() => ({
					message: `The "${ahspLabel}" sub-process is not marked as agentic, so fromAi() has no effect.`,
					data: { type: ERROR_TYPES.AGENT_FEEL_WRONG_CONTEXT },
					path
				})));
				return;
			}
			if ((task.get("incoming") || []).length > 0 || task.$parent !== ahsp) {
				reportErrors(task, reporter, invocations.map(() => ({
					message: "fromAi() is ignored here: only the tool's entry element defines AI inputs. Define it there and read the toolCall variable directly.",
					data: { type: ERROR_TYPES.AGENT_FEEL_NON_ENTRY_ELEMENT },
					path
				})));
				return;
			}
			const errors = [];
			for (const inv of invocations) {
				if (inv.name !== CORRECT_NAME && NAME_ALIASES.includes(inv.name.toLowerCase())) {
					errors.push({
						message: `Wrong function name "${inv.name}". Use ${CORRECT_NAME} (case-sensitive).`,
						data: { type: ERROR_TYPES.AGENT_FEEL_FUNCTION_NAME_INVALID }
					});
					continue;
				}
				const args = getArgs(inv.node, expr);
				if (!args[0]) {
					errors.push({
						message: "fromAi() requires a key argument: a FEEL path like toolCall.url.",
						data: { type: ERROR_TYPES.AGENT_FEEL_KEY_MISSING }
					});
					continue;
				}
				const keyError = validateKeyArg(args[0]);
				if (keyError) errors.push(keyError);
				if (args[1]) {
					const descriptionError = validateDescriptionTypeInvalid(args[1]);
					if (descriptionError) errors.push(descriptionError);
				}
			}
			if (errors.length) reportErrors(task, reporter, errors.map((error) => ({
				...error,
				path
			})));
		}
		return annotateRule("agent-fromai-contract", { check });
		function checkDuplicateKeys(task, reporter) {
			if ((task.get("incoming") || []).length > 0) return;
			const ahsp = findAncestorAdHocSubProcess(task);
			if (!ahsp || !isAgenticAdHocSubProcess(ahsp, version)) return;
			if (task.$parent !== ahsp) return;
			const ioMapping = findExtensionElement(task, "zeebe:IoMapping");
			if (!ioMapping) return;
			const keyOccurrences = {};
			for (const input of ioMapping.get("inputParameters") || []) {
				const source = input.get("source");
				if (!source || !source.startsWith("=")) continue;
				const expr = source.substring(1).trim();
				for (const inv of findFunctionInvocations(expr)) {
					const key = getArgs(inv.node, expr)[0];
					if (key && key.type === "PathExpression" && key.text.startsWith("toolCall.")) (keyOccurrences[key.text] = keyOccurrences[key.text] || []).push(input);
				}
			}
			const duplicates = Object.keys(keyOccurrences).filter((key) => keyOccurrences[key].length > 1);
			if (duplicates.length) reportErrors(task, reporter, duplicates.map((key) => ({
				message: `fromAi() key ${key} is declared more than once in this tool. Declare it once and reference it directly elsewhere.`,
				data: { type: ERROR_TYPES.AGENT_FEEL_KEY_DUPLICATE },
				paths: keyOccurrences[key].map((input) => pathConcat(getPath(input, task), "source"))
			})));
		}
		function checkOutputSurface(node, reporter) {
			const source = node.get("source");
			if (!source || !source.startsWith("=")) return;
			const invocations = findFunctionInvocations(source.substring(1).trim());
			if (!invocations.length) return;
			const task = node.$parent && node.$parent.$parent && node.$parent.$parent.$parent;
			if (!task || !is(task, "bpmn:FlowNode")) return;
			const ahsp = findAncestorAdHocSubProcess(task);
			if (!ahsp || !isAgenticAdHocSubProcess(ahsp, version)) return;
			const path = pathConcat(getPath(node, task), "source");
			reportErrors(task, reporter, invocations.map(() => ({
				message: "fromAi() defines a tool input and has no effect in an output mapping. Define it in an input mapping on the tool's entry element.",
				data: { type: ERROR_TYPES.AGENT_FEEL_WRONG_CONTEXT },
				path
			})));
		}
		function checkConditionSurface(node, reporter) {
			const condition = node.get("conditionExpression");
			const body = condition && condition.get("body");
			if (!body || !body.startsWith("=")) return;
			const invocations = findFunctionInvocations(body.substring(1).trim());
			if (!invocations.length) return;
			const ahsp = findAncestorAdHocSubProcess(node);
			if (!ahsp || !isAgenticAdHocSubProcess(ahsp, version)) return;
			reportErrors(node, reporter, invocations.map(() => ({
				message: "fromAi() defines a tool input and cannot be used in a sequence flow condition. Define it in an input mapping on the tool's entry element.",
				data: { type: ERROR_TYPES.AGENT_FEEL_WRONG_CONTEXT },
				path: getPath(condition, node)
			})));
		}
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/agent-tool-documentation.js
var require_agent_tool_documentation = __commonJSMin(((exports, module) => {
	var { isAgenticToolElement } = require_element();
	var { reportErrors } = require_reporter();
	var { ERROR_TYPES } = require_error_types();
	var { skipInNonExecutableProcess } = require_rule();
	var { annotateRule } = require_helper();
	module.exports = skipInNonExecutableProcess(function(config = {}) {
		const { version } = config;
		function check(node, reporter) {
			if (!isAgenticToolElement(node, version)) return;
			if (!(node.get("documentation") || []).map((d) => d.get("text") || "").join("").trim()) reportErrors(node, reporter, [{
				message: "Tool documentation is missing.",
				data: { type: ERROR_TYPES.AGENT_TOOL_DOCUMENTATION_MISSING },
				path: ["documentation"]
			}]);
		}
		return annotateRule("agent-tool-documentation", { check });
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/agent-tool-output-key.js
var require_agent_tool_output_key = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { getPath, pathConcat } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { isAgenticToolElement } = require_element();
	var { reportErrors, getName } = require_reporter();
	var { ERROR_TYPES } = require_error_types();
	var { skipInNonExecutableProcess } = require_rule();
	var { annotateRule } = require_helper();
	module.exports = skipInNonExecutableProcess(function(config = {}) {
		const { version } = config;
		function check(node, reporter) {
			if (!isAgenticToolElement(node, version)) return;
			const { channels, linear } = collectResultChannels(node);
			if (!channels.length) {
				reportErrors(node, reporter, {
					message: "Tool returns nothing to the agent. Set a \"toolCallResult\" (at minimum, note the task completed).",
					data: { type: ERROR_TYPES.AGENT_TOOL_RESULT_MISSING },
					path: getOutputsPath(node)
				});
				return;
			}
			if (!channels.some(isToolCallResultChannel)) {
				for (const channel of channels) if (isToolCallResultCasingMismatch(channel)) reportErrors(channel.element, reporter, {
					message: `Wrong casing "${getCasingMismatchText(channel)}": use toolCallResult (case-sensitive).`,
					data: { type: ERROR_TYPES.AGENT_TOOL_OUTPUT_KEY_CASING_INVALID },
					path: getChannelPath(channel)
				});
				else reportErrors(channel.element, reporter, {
					message: "\"toolCallResult\" output is not mapped.",
					data: { type: ERROR_TYPES.AGENT_TOOL_OUTPUT_KEY_INVALID },
					path: getChannelPath(channel)
				});
				return;
			}
			for (const channel of channels) if (isToolCallResultCasingMismatch(channel)) reportErrors(channel.element, reporter, {
				message: `Wrong casing "${getCasingMismatchText(channel)}": use toolCallResult (case-sensitive).`,
				data: { type: ERROR_TYPES.AGENT_TOOL_OUTPUT_KEY_CASING_INVALID },
				path: getChannelPath(channel)
			});
			if (linear) {
				const fullWrites = channels.filter(isToolCallResultChannel).filter(isFullOverwriteChannel);
				for (let i = 1; i < fullWrites.length; i++) {
					const overwriter = fullWrites[i];
					const overwritten = fullWrites[i - 1];
					const overwrittenLabel = getName(overwritten.element) || overwritten.element.get("id");
					reportErrors(overwriter.element, reporter, {
						message: `This overwrites the "toolCallResult" value set on "${overwrittenLabel}".`,
						data: { type: ERROR_TYPES.AGENT_TOOL_OUTPUT_KEY_OVERWRITE },
						path: getChannelPath(overwriter)
					});
				}
			}
		}
		return annotateRule("agent-tool-output-key", { check });
	});
	function collectResultChannels(entry) {
		const channels = [], visited = new Set(), queue = [entry];
		let linear = true;
		while (queue.length) {
			const element = queue.shift();
			const id = element.get("id");
			if (id && visited.has(id)) continue;
			visited.add(id);
			collectElementChannels(element, channels);
			const outgoing = element.get("outgoing") || [];
			const incoming = element.get("incoming") || [];
			if (outgoing.length > 1 || incoming.length > 1) linear = false;
			for (const flow of outgoing) {
				const target = flow.get("targetRef");
				if (target) queue.push(target);
			}
			const parent = element.$parent;
			const siblings = parent && parent.get && parent.get("flowElements");
			for (const boundary of siblings || []) if (is(boundary, "bpmn:BoundaryEvent") && boundary.get("attachedToRef") === element) {
				linear = false;
				queue.push(boundary);
			}
			if (is(element, "bpmn:SubProcess")) {
				for (const child of element.get("flowElements") || []) if (is(child, "bpmn:FlowNode")) queue.push(child);
			}
		}
		return {
			channels,
			linear
		};
	}
	function collectElementChannels(element, channels) {
		const extensionElements = element.get("extensionElements");
		if (!extensionElements) return;
		for (const value of extensionElements.get("values")) {
			if (is(value, "zeebe:IoMapping")) for (const output of value.get("outputParameters") || []) channels.push({
				kind: "output",
				value: output.get("target") || "",
				source: output.get("source"),
				element,
				node: output,
				property: "target"
			});
			if (is(value, "zeebe:Script") || is(value, "zeebe:CalledDecision")) {
				const resultVariable = value.get("resultVariable");
				if (resultVariable) channels.push({
					kind: "resultVariable",
					value: resultVariable,
					element,
					node: value,
					property: "resultVariable"
				});
			}
			if (is(value, "zeebe:TaskHeaders")) for (const header of value.get("values") || []) {
				const key = header.get("key");
				if (key === "resultVariable") channels.push({
					kind: "resultVariable",
					value: header.get("value") || "",
					element,
					node: header,
					property: "value"
				});
				if (key === "resultExpression") channels.push({
					kind: "resultExpression",
					value: header.get("value") || "",
					element,
					node: header,
					property: "value"
				});
			}
		}
	}
	function getChannelPath(channel) {
		return pathConcat(getPath(channel.node, channel.element), channel.property);
	}
	function getOutputsPath(element) {
		const extensionElements = element.get("extensionElements");
		if (!extensionElements) return null;
		const ioMapping = (extensionElements.get("values") || []).find((value) => is(value, "zeebe:IoMapping"));
		if (!ioMapping) return null;
		return pathConcat(getPath(ioMapping, element), "outputParameters");
	}
	function isToolCallResultChannel({ kind, value }) {
		if (kind === "resultExpression") return /\btoolCallResult\b/.test(value);
		return value === "toolCallResult" || value.startsWith("toolCallResult.");
	}
	function isToolCallResultCasingMismatch({ kind, value }) {
		if (kind === "resultExpression") return !!getResultExpressionCasingMismatch(value);
		const lower = value.toLowerCase();
		return (lower === "toolcallresult" || lower.startsWith("toolcallresult.")) && !isToolCallResultChannel({
			kind,
			value
		});
	}
	function getResultExpressionCasingMismatch(value) {
		return (value.match(/\btoolcallresult\b/gi) || []).find((token) => token !== "toolCallResult") || null;
	}
	function getCasingMismatchText({ kind, value }) {
		if (kind === "resultExpression") return getResultExpressionCasingMismatch(value) || value;
		return value;
	}
	var CONTEXT_PUT_TOOL_CALL_RESULT = /^=?\s*context\s+put\s*\(\s*toolCallResult\s*,/;
	function isFullOverwriteChannel({ kind, value, source }) {
		if (kind === "resultExpression" || kind === "resultVariable") return true;
		if (value !== "toolCallResult") return false;
		return !CONTEXT_PUT_TOOL_CALL_RESULT.test(source || "");
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/before-all-execution-listener.js
var require_before_all_execution_listener = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { getPath, pathConcat } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { ERROR_TYPES, findExtensionElement } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (isMultiInstance(node)) return;
			const executionListeners = findExtensionElement(node, "zeebe:ExecutionListeners");
			if (!executionListeners) return;
			const errors = executionListeners.get("listeners").flatMap((listener) => {
				if (listener.get("eventType") !== "beforeAll") return [];
				return [{
					message: "Property <eventType> of <zeebe:ExecutionListener> with value <beforeAll> only allowed on multi-instance elements",
					path: pathConcat(getPath(listener, node), "eventType"),
					data: {
						type: ERROR_TYPES.PROPERTY_VALUE_NOT_ALLOWED,
						node: listener,
						parentNode: node,
						property: "eventType"
					}
				}];
			});
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
	function isMultiInstance(node) {
		const loopCharacteristics = node.get("loopCharacteristics");
		return !!loopCharacteristics && is(loopCharacteristics, "bpmn:MultiInstanceLoopCharacteristics");
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/called-element.js
var require_called_element = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { findExtensionElement, hasExtensionElement, hasProperties } = require_element();
	var { annotateRule } = require_helper();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { greaterOrEqual } = require_version();
	var BUSINESS_ID_ALLOWED_VERSION = "8.10";
	var MAX_BUSINESS_ID_LENGTH = 256;
	module.exports = skipInNonExecutableProcess(function({ version }) {
		function check(node, reporter) {
			if (!is(node, "bpmn:CallActivity")) return;
			let errors = hasExtensionElement(node, "zeebe:CalledElement", node);
			if (errors && errors.length) {
				reportErrors(node, reporter, errors);
				return;
			}
			errors = hasProperties(findExtensionElement(node, "zeebe:CalledElement"), {
				processId: { required: true },
				businessId: { allowed: (value) => isValidBusinessId(value, version) }
			}, node);
			if (errors && errors.length) reportErrors(node, reporter, errors);
		}
		return annotateRule("called-element", { check });
	});
	function isValidBusinessId(value, version) {
		if (!value || value.startsWith("=")) return true;
		if (!greaterOrEqual(version, BUSINESS_ID_ALLOWED_VERSION)) return true;
		return value.length < MAX_BUSINESS_ID_LENGTH;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/cancel-execution-listener.js
var require_cancel_execution_listener = __commonJSMin(((exports, module) => {
	var { isAny } = __toCommonJS(index_esm_exports);
	var { findExtensionElement, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (isAny(node, ["bpmn:Process", "bpmn:Participant"])) return;
			const executionListeners = findExtensionElement(node, "zeebe:ExecutionListeners");
			if (!executionListeners) return;
			const errors = executionListeners.get("listeners").flatMap((listener) => hasProperties(listener, { eventType: { allowed: (value) => value !== "cancel" } }, node));
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/connector-properties/config.js
var require_config$3 = __commonJSMin(((exports, module) => {
	var { getPath, pathConcat } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { findExtensionElement } = require_element();
	var { ERROR_TYPES } = require_error_types();
	var INBOUND_CONNECTOR_PROPERTY = "inbound.type";
	module.exports = {
		messageTtl: {
			version: "8.6",
			getError: (node) => getInboundConnectorError(node, "messageTtl", "8.6"),
			getProperty: (node) => getZeebeProperty(node, "messageTtl"),
			isConnector: (node) => isInboundConnector(node, [
				"io.camunda:webhook:1",
				"io.camunda:connector-rabbitmq-inbound:1",
				"io.camunda:http-polling:1",
				"io.camunda:connector-kafka-inbound:1",
				"io.camunda:slack-webhook:1",
				"io.camunda:aws-sqs-inbound:1",
				"io.camunda:aws-sns-webhook:1"
			])
		},
		consumeUnmatchedEvents: {
			version: "8.6",
			getError: (node) => getInboundConnectorError(node, "consumeUnmatchedEvents", "8.6"),
			getProperty: (node) => getZeebeProperty(node, "consumeUnmatchedEvents"),
			isConnector: (node) => isInboundConnector(node, [
				"io.camunda:webhook:1",
				"io.camunda:connector-rabbitmq-inbound:1",
				"io.camunda:http-polling:1",
				"io.camunda:connector-kafka-inbound:1",
				"io.camunda:slack-webhook:1",
				"io.camunda:aws-sqs-inbound:1",
				"io.camunda:aws-sns-webhook:1"
			])
		},
		deduplicationModeManualFlag: {
			version: "8.6",
			getError: (node) => getInboundConnectorError(node, "deduplicationModeManualFlag", "8.6"),
			getProperty: (node) => getZeebeProperty(node, "deduplicationModeManualFlag"),
			isConnector: (node) => isInboundConnector(node, [
				"io.camunda:connector-rabbitmq-inbound:1",
				"io.camunda:http-polling:1",
				"io.camunda:connector-kafka-inbound:1",
				"io.camunda:aws-sqs-inbound:1"
			])
		}
	};
	function isInboundConnector(node, names) {
		const zeebeProperty = getZeebeProperty(node, INBOUND_CONNECTOR_PROPERTY);
		return zeebeProperty && names.includes(zeebeProperty.get("value"));
	}
	function getZeebeProperty(node, propertyName) {
		const zeebeProperties = findExtensionElement(node, "zeebe:Properties");
		if (!zeebeProperties) return false;
		return zeebeProperties.get("properties").find((property) => {
			return property.get("name") === propertyName;
		});
	}
	function getInboundConnectorError(node, propertyName, allowedVersion) {
		const property = getZeebeProperty(node, propertyName);
		const connectorProperty = getZeebeProperty(node, INBOUND_CONNECTOR_PROPERTY);
		const path = getPath(property, node);
		return {
			message: `Connector property <name> with value <${propertyName}> only allowed by Camunda ${allowedVersion} or newer.`,
			path: pathConcat(path || [], "name"),
			data: {
				type: ERROR_TYPES.CONNECTORS_PROPERTY_VALUE_NOT_ALLOWED,
				node: property,
				parentNode: node,
				property: "name",
				allowedVersion,
				connectorProperty: {
					node: connectorProperty,
					properties: ["name", "value"]
				}
			}
		};
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/connector-properties/index.js
var require_connector_properties = __commonJSMin(((exports, module) => {
	var { isAny } = __toCommonJS(index_esm_exports);
	var config = require_config$3();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { greaterOrEqual } = require_version();
	module.exports = skipInNonExecutableProcess(function({ version }) {
		function check(node, reporter) {
			if (!isAny(node, ["bpmn:FlowElement", "bpmn:FlowElementsContainer"])) return;
			const errors = Object.entries(config).reduce((errors, [propertyName, { getError, getProperty, isConnector, version: allowedVersion }]) => {
				if (greaterOrEqual(version, allowedVersion) || !isConnector(node)) return errors;
				if (getProperty(node)) return [...errors, getError(node)];
				return errors;
			}, []);
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/duplicate-execution-listener-headers.js
var require_duplicate_execution_listener_headers = __commonJSMin(((exports, module) => {
	var { findExtensionElement, hasDuplicatedPropertyValues } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			const executionListeners = findExtensionElement(node, "zeebe:ExecutionListeners");
			if (!executionListeners) return;
			const errors = executionListeners.get("listeners").flatMap((listener) => {
				const headers = listener.get("headers");
				if (!headers) return [];
				return hasDuplicatedPropertyValues(headers, "values", "key", node) || [];
			});
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/duplicate-execution-listeners.js
var require_duplicate_execution_listeners = __commonJSMin(((exports, module) => {
	var { findExtensionElement, hasDuplicatedPropertiesValues } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			const executionListeners = findExtensionElement(node, "zeebe:ExecutionListeners");
			if (!executionListeners) return;
			const errors = hasDuplicatedExecutionListeners(executionListeners, node);
			if (errors && errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
	function hasDuplicatedExecutionListeners(executionListeners, parentNode = null) {
		return hasDuplicatedPropertiesValues(executionListeners, "listeners", ["eventType", "type"], parentNode);
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/duplicate-task-headers.js
var require_duplicate_task_headers = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { findExtensionElement, getMessageEventDefinition, hasDuplicatedPropertyValues } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:UserTask") && !isZeebeServiceTask(node)) return;
			const taskHeaders = findExtensionElement(node, "zeebe:TaskHeaders");
			if (!taskHeaders) return;
			const errors = hasDuplicatedPropertyValues(taskHeaders, "values", "key", node);
			if (errors && errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
	function isZeebeServiceTask(element) {
		if (is(element, "zeebe:ZeebeServiceTask")) return true;
		if (isAny(element, ["bpmn:EndEvent", "bpmn:IntermediateThrowEvent"])) return getMessageEventDefinition(element);
		if (is(element, "bpmn:BusinessRuleTask")) return findExtensionElement(element, "zeebe:TaskDefinition");
		return false;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/element-type/config.js
var require_config$2 = __commonJSMin(((exports, module) => {
	module.exports = {
		"bpmn:Association": "1.0",
		"bpmn:BoundaryEvent": {
			"bpmn:CompensateEventDefinition": "8.5",
			"bpmn:ConditionalEventDefinition": "8.9",
			"bpmn:ErrorEventDefinition": "1.0",
			"bpmn:EscalationEventDefinition": "8.2",
			"bpmn:MessageEventDefinition": "1.0",
			"bpmn:TimerEventDefinition": "1.0",
			"bpmn:SignalEventDefinition": "8.3"
		},
		"bpmn:BusinessRuleTask": "1.1",
		"bpmn:CallActivity": "1.0",
		"bpmn:Collaboration": "1.0",
		"bpmn:DataObject": "8.0",
		"bpmn:DataObjectReference": "8.0",
		"bpmn:DataStoreReference": "8.0",
		"bpmn:Definitions": "1.0",
		"bpmn:EndEvent": {
			"_": "1.0",
			"bpmn:CompensateEventDefinition": "8.5",
			"bpmn:ErrorEventDefinition": "1.0",
			"bpmn:EscalationEventDefinition": "8.2",
			"bpmn:MessageEventDefinition": "1.2",
			"bpmn:SignalEventDefinition": "8.3",
			"bpmn:TerminateEventDefinition": "8.1"
		},
		"bpmn:EventBasedGateway": "1.0",
		"bpmn:ExclusiveGateway": "1.0",
		"bpmn:Group": "1.0",
		"bpmn:InclusiveGateway": "8.1",
		"bpmn:IntermediateCatchEvent": {
			"bpmn:ConditionalEventDefinition": "8.9",
			"bpmn:MessageEventDefinition": "1.0",
			"bpmn:LinkEventDefinition": "8.2",
			"bpmn:TimerEventDefinition": "1.0",
			"bpmn:SignalEventDefinition": "8.3"
		},
		"bpmn:IntermediateThrowEvent": {
			"_": "1.1",
			"bpmn:CompensateEventDefinition": "8.5",
			"bpmn:EscalationEventDefinition": "8.2",
			"bpmn:LinkEventDefinition": "8.2",
			"bpmn:MessageEventDefinition": "1.2",
			"bpmn:SignalEventDefinition": "8.3"
		},
		"bpmn:ManualTask": "1.1",
		"bpmn:MessageFlow": "1.0",
		"bpmn:ParallelGateway": "1.0",
		"bpmn:Participant": "1.0",
		"bpmn:Process": "1.0",
		"bpmn:ReceiveTask": "1.0",
		"bpmn:ScriptTask": "1.1",
		"bpmn:SendTask": "1.1",
		"bpmn:SequenceFlow": "1.0",
		"bpmn:ServiceTask": "1.0",
		"bpmn:StartEvent": {
			"_": "1.0",
			"bpmn:ConditionalEventDefinition": "8.9",
			"bpmn:ErrorEventDefinition": "1.0",
			"bpmn:EscalationEventDefinition": "8.2",
			"bpmn:MessageEventDefinition": "1.0",
			"bpmn:SignalEventDefinition": "8.2",
			"bpmn:TimerEventDefinition": "1.0"
		},
		"bpmn:SubProcess": "1.0",
		"bpmn:Task": "8.2",
		"bpmn:TextAnnotation": "1.0",
		"bpmn:UserTask": "1.0",
		"bpmn:AdHocSubProcess": "8.7"
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/element-type/index.js
var require_element_type = __commonJSMin(((exports, module) => {
	var { isString } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var { isAny } = __toCommonJS(index_esm_exports);
	var config = require_config$2();
	var { greaterOrEqual } = require_version();
	var { getEventDefinition } = require_element();
	var { ERROR_TYPES } = require_error_types();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { annotateRule } = require_helper();
	module.exports = skipInNonExecutableProcess(function({ version }) {
		function check(node, reporter) {
			if (!isAny(node, ["bpmn:FlowElement", "bpmn:FlowElementsContainer"])) return;
			const element = config[node.$type];
			if (!element || isString(element) && !greaterOrEqual(version, element)) {
				const allowedVersion = element || null;
				let message = `Element of type <${node.$type}> not allowed`;
				let data = {
					type: ERROR_TYPES.ELEMENT_TYPE_NOT_ALLOWED,
					node,
					parentNode: null
				};
				if (allowedVersion) {
					message = `Element of type <${node.$type}> only allowed by Camunda ${allowedVersion} or newer`;
					data = {
						...data,
						allowedVersion
					};
				}
				reportErrors(node, reporter, {
					message,
					path: null,
					data
				});
				return;
			}
			if (!isAny(node, ["bpmn:CatchEvent", "bpmn:ThrowEvent"])) return;
			const eventDefinition = getEventDefinition(node);
			if (eventDefinition) {
				if (!element[eventDefinition.$type] || !greaterOrEqual(version, element[eventDefinition.$type])) {
					const allowedVersion = element[eventDefinition.$type] || null;
					let message = `Element of type <${node.$type}> with event definition of type <${eventDefinition.$type}> not allowed`;
					let data = {
						type: ERROR_TYPES.ELEMENT_TYPE_NOT_ALLOWED,
						node,
						parentNode: null,
						eventDefinition
					};
					if (allowedVersion) {
						message = `Element of type <${node.$type}> with event definition of type <${eventDefinition.$type}> only allowed by Camunda ${allowedVersion} or newer`;
						data = {
							...data,
							allowedVersion
						};
					}
					reportErrors(node, reporter, {
						message,
						path: null,
						data
					});
				}
			} else if (!element["_"] || !greaterOrEqual(version, element["_"])) {
				const allowedVersion = element["_"] || null;
				let message = `Element of type <${node.$type}> with no event definition not allowed`;
				let data = {
					type: ERROR_TYPES.ELEMENT_TYPE_NOT_ALLOWED,
					node,
					parentNode: null,
					eventDefinition
				};
				if (allowedVersion) {
					message = `Element of type <${node.$type}> with no event definition only allowed by Camunda ${allowedVersion} or newer`;
					data = {
						...data,
						allowedVersion
					};
				}
				reportErrors(node, reporter, {
					message,
					path: null,
					data
				});
			}
		}
		return annotateRule("element-type", { check });
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/error-reference.js
var require_error_reference = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { getEventDefinition, getReferencePath, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { greaterOrEqual } = require_version();
	var { annotateRule } = require_helper();
	var NO_ERROR_REF_ALLOWED_VERSION = "8.2";
	module.exports = skipInNonExecutableProcess(function({ version }) {
		function check(node, reporter) {
			if (!isAny(node, ["bpmn:CatchEvent", "bpmn:ThrowEvent"])) return;
			const eventDefinition = getEventDefinition(node);
			if (!eventDefinition || !is(eventDefinition, "bpmn:ErrorEventDefinition")) return;
			let errors = [];
			if (!isNoErrorRefAllowed(node, version)) {
				errors = hasProperties(eventDefinition, { errorRef: {
					required: true,
					allowedVersion: "8.2"
				} }, node);
				if (errors.length) {
					reportErrors(node, reporter, errors);
					return;
				}
			}
			const errorRef = eventDefinition.get("errorRef");
			if (!errorRef) return;
			errors = hasProperties(errorRef, { errorCode: { required: true } }, node, getReferencePath({
				element: node,
				referenceHolder: eventDefinition,
				referenceProperty: "errorRef",
				referencedRoot: errorRef,
				node: errorRef
			}));
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return annotateRule("error-reference", { check });
	});
	function isNoErrorRefAllowed(node, version) {
		return is(node, "bpmn:CatchEvent") && greaterOrEqual(version, NO_ERROR_REF_ALLOWED_VERSION);
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/escalation-boundary-event-attached-to-ref.js
var require_escalation_boundary_event_attached_to_ref = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { getEventDefinition } = require_element();
	var { ERROR_TYPES } = require_error_types();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!isAny(node, ["bpmn:CatchEvent", "bpmn:ThrowEvent"])) return;
			const eventDefinition = getEventDefinition(node);
			if (!eventDefinition || !is(eventDefinition, "bpmn:EscalationEventDefinition")) return;
			const attachedToRef = node.get("attachedToRef");
			if (attachedToRef && is(attachedToRef, "bpmn:Task")) reportErrors(node, reporter, {
				message: `Element of type <bpmn:BoundaryEvent> with event definition of type <bpmn:EscalationEventDefinition> is not allowed to be attached to element of type <${attachedToRef.$type}>`,
				path: null,
				data: {
					type: ERROR_TYPES.ATTACHED_TO_REF_ELEMENT_TYPE_NOT_ALLOWED,
					node,
					parentNode: null,
					attachedToRef
				}
			});
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/escalation-reference.js
var require_escalation_reference = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { getEventDefinition, getReferencePath, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { annotateRule } = require_helper();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!isAny(node, ["bpmn:CatchEvent", "bpmn:ThrowEvent"])) return;
			const eventDefinition = getEventDefinition(node);
			if (!eventDefinition || !is(eventDefinition, "bpmn:EscalationEventDefinition")) return;
			let errors = [];
			if (!isNoEscalationRefAllowed(node)) {
				errors = hasProperties(eventDefinition, { escalationRef: { required: true } }, node);
				if (errors.length) {
					reportErrors(node, reporter, errors);
					return;
				}
			}
			const escalationRef = eventDefinition.get("escalationRef");
			if (!escalationRef) return;
			errors = hasProperties(escalationRef, { escalationCode: { required: true } }, node, getReferencePath({
				element: node,
				referenceHolder: eventDefinition,
				referenceProperty: "escalationRef",
				referencedRoot: escalationRef,
				node: escalationRef
			}));
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return annotateRule("escalation-reference", { check });
	});
	function isNoEscalationRefAllowed(node) {
		return isAny(node, ["bpmn:CatchEvent", "bpmn:BoundaryEvent"]);
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/event-based-gateway-target.js
var require_event_based_gateway_target = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { ERROR_TYPES } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:ReceiveTask")) return;
			if (node.get("incoming").some((sequenceFlow) => {
				return is(sequenceFlow.get("sourceRef"), "bpmn:EventBasedGateway");
			})) reportErrors(node, reporter, {
				message: "Element of type <bpmn:ReceiveTask> not allowed as event-based gateway target",
				path: null,
				data: {
					type: ERROR_TYPES.EVENT_BASED_GATEWAY_TARGET_NOT_ALLOWED,
					node,
					parentNode: null
				}
			});
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/executable-process.js
var require_executable_process = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:Definitions")) return;
			const rootElements = node.get("rootElements"), collaboration = rootElements.find((rootElement) => is(rootElement, "bpmn:Collaboration")), processes = rootElements.filter((rootElement) => is(rootElement, "bpmn:Process"));
			let errors = [];
			for (const process of processes) {
				const parentNode = getParentNode(process, collaboration);
				errors = [...errors, ...hasProperties(process, { isExecutable: { value: true } }, parentNode)];
			}
			if (errors.length > processes.length - 1) errors.forEach((error) => {
				const { data } = error;
				const { node: process } = data;
				reportErrors(getParentNode(process, collaboration), reporter, error);
			});
		}
		return { check };
	};
	function getParentNode(process, collaboration) {
		if (!collaboration) return process;
		const participant = collaboration.get("participants").find((participant) => participant.get("processRef") === process);
		if (participant) return participant;
		return process;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/execution-listener.js
var require_execution_listener = __commonJSMin(((exports, module) => {
	var { findExtensionElement, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			const executionListeners = findExtensionElement(node, "zeebe:ExecutionListeners");
			if (!executionListeners) return;
			const errors = executionListeners.get("listeners").flatMap((listener) => hasProperties(listener, { type: { required: true } }, node));
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/@camunda/feel-builtins/dist/index.cjs
var require_dist = __commonJSMin(((exports) => {
	var feelBuiltins = [
		{
			"name": "not",
			"type": "function",
			"params": [{ "name": "negand" }],
			"info": "<p>Returns the logical negation of the given value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">not(negand: boolean): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">not(true)\n// false\n\nnot(null)\n// null\n</code></pre>\n"
		},
		{
			"name": "get value",
			"type": "function",
			"params": [{ "name": "context" }, { "name": "key" }],
			"info": "<p>Returns the value of the context entry with the given key.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">get value(context: context, key: string): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">get value({foo: 123}, &quot;foo&quot;)\n// 123\n\nget value({a: 1}, &quot;b&quot;)\n// null\n</code></pre>\n"
		},
		{
			"name": "get entries",
			"type": "function",
			"params": [{ "name": "context" }],
			"info": "<p>Returns the entries of the context as a list of key-value-pairs.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">get entries(context: context): list&lt;context&gt;\n</code></pre>\n<p>The return value is a list of contexts. Each context contains two entries for &quot;key&quot; and &quot;value&quot;.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">get entries({foo: 123})\n// [{key: &quot;foo&quot;, value: 123}]\n</code></pre>\n"
		},
		{
			"name": "context put",
			"type": "function",
			"params": [
				{ "name": "context" },
				{ "name": "keys" },
				{ "name": "value" }
			],
			"info": "<p>Adds a new entry with the given value to the context. The path of the entry is defined by the keys. Returns a new context that includes the entry.</p>\n<p>If <code>keys</code> contains the keys <code>[k1, k2]</code> then it adds the nested entry <code>k1.k2 = value</code> to the context.</p>\n<p>If an entry for the same keys already exists in the context, it overrides the value.</p>\n<p>If <code>keys</code> are empty, it returns <code>null</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">context put(context: context, keys: list&lt;string&gt;, value: Any): context\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">context put({x:1}, [&quot;y&quot;], 2)\n// {x:1, y:2}\n\ncontext put({x:1, y: {z:0}}, [&quot;y&quot;, &quot;z&quot;], 2)\n// {x:1, y: {z:2}}\n\ncontext put({x:1}, [&quot;y&quot;, &quot;z&quot;], 2)\n// {x:1, y: {z:2}}\n</code></pre>\n"
		},
		{
			"name": "string",
			"type": "function",
			"params": [{ "name": "from" }],
			"info": "<p>Returns the given value as a string representation.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">string(from: Any): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">string(1.1)\n// &quot;1.1&quot;\n\nstring(date(&quot;2012-12-25&quot;))\n// &quot;2012-12-25&quot;\n</code></pre>\n"
		},
		{
			"name": "number",
			"type": "function",
			"params": [{ "name": "from" }],
			"info": "<p>Parses the given string to a number.</p>\n<p>Returns <code>null</code> if the string is not a number.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">number(from: string): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">number(&quot;1500.5&quot;)\n// 1500.5\n</code></pre>\n"
		},
		{
			"name": "number",
			"type": "function",
			"params": [{ "name": "from" }, { "name": "grouping separator" }],
			"info": "<p>Parses the given string to a number using the specified grouping separator.</p>\n<p>Returns <code>null</code> if the string is not a number.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">number(from: string, grouping separator: string): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">number(&quot;1,500&quot;, &quot;,&quot;)\n// 1500\n</code></pre>\n"
		},
		{
			"name": "number",
			"type": "function",
			"params": [
				{ "name": "from" },
				{ "name": "grouping separator" },
				{ "name": "decimal separator" }
			],
			"info": "<p>Parses the given string to a number using the specified grouping and decimal separators.</p>\n<p>Returns <code>null</code> if the string is not a number.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">number(from: string, grouping separator: string, decimal separator: string): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">number(&quot;1 500.5&quot;, &quot; &quot;, &quot;.&quot;)\n// 1500.5\n</code></pre>\n"
		},
		{
			"name": "context",
			"type": "function",
			"params": [{ "name": "entries" }],
			"info": "<p>Constructs a context of the given list of key-value pairs. It is the reverse function to <a href=\"https://docs.camunda.io/docs/components/modeler/feel/builtin-functions/feel-built-in-functions-context#get-entriescontext\">get entries()</a>.</p>\n<p>Each key-value pair must be a context with two entries: <code>key</code> and <code>value</code>. The entry with name <code>key</code> must have a value of the type <code>string</code>.</p>\n<p>It might override context entries if the keys are equal. The entries are overridden in the same order as the contexts in the given list.</p>\n<p>Returns <code>null</code> if one of the entries is not a context or if a context doesn&#39;t contain the required entries.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">context(entries: list&lt;context&gt;): context\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">context([{&quot;key&quot;:&quot;a&quot;, &quot;value&quot;:1}, {&quot;key&quot;:&quot;b&quot;, &quot;value&quot;:2}])\n// {a:1, b:2}\n</code></pre>\n"
		},
		{
			"name": "date",
			"type": "function",
			"params": [{ "name": "from" }],
			"info": "<p>Returns a date from the given value.</p>\n<p>Returns <code>null</code> if the string is not a valid calendar date. For example, <code>&quot;2024-06-31&quot;</code> is invalid because June has\nonly 30 days.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">date(from: string): date\n</code></pre>\n<p>Parses the given string into a date.</p>\n<pre><code class=\"language-feel\">date(from: date and time): date\n</code></pre>\n<p>Extracts the date component from the given date and time.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">date(&quot;2018-04-29&quot;)\n// date(&quot;2018-04-29&quot;)\n\ndate(date and time(&quot;2012-12-25T11:00:00&quot;))\n// date(&quot;2012-12-25&quot;)\n</code></pre>\n"
		},
		{
			"name": "date",
			"type": "function",
			"params": [
				{ "name": "year" },
				{ "name": "month" },
				{ "name": "day" }
			],
			"info": "<p>Returns a date from the given components.</p>\n<p>Returns <code>null</code> if the components don&#39;t represent a valid calendar date. For example, <code>2024,6,31</code> is invalid because\nJune has only 30 days.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">date(year: number, month: number, day: number): date\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">date(2012, 12, 25)\n// date(&quot;2012-12-25&quot;)\n</code></pre>\n"
		},
		{
			"name": "time",
			"type": "function",
			"params": [{ "name": "from" }],
			"info": "<p>Returns a time from the given value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">time(from: string): time\n</code></pre>\n<p>Parses the given string into a time.</p>\n<pre><code class=\"language-feel\">time(from: date and time): time\n</code></pre>\n<p>Extracts the time component from the given date and time.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">time(&quot;12:00:00&quot;)\n// time(&quot;12:00:00&quot;)\n\ntime(date and time(&quot;2012-12-25T11:00:00&quot;))\n// time(&quot;11:00:00&quot;)\n</code></pre>\n"
		},
		{
			"name": "time",
			"type": "function",
			"params": [
				{ "name": "hour" },
				{ "name": "minute" },
				{ "name": "second" }
			],
			"info": "<p>Returns a time from the given components.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">time(hour: number, minute: number, second: number): time\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">time(23, 59, 0)\n// time(&quot;23:59:00&quot;)\n</code></pre>\n"
		},
		{
			"name": "time",
			"type": "function",
			"params": [
				{ "name": "hour" },
				{ "name": "minute" },
				{ "name": "second" },
				{ "name": "offset" }
			],
			"info": "<p>Returns a time from the given components, including a timezone offset.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">time(hour: number, minute: number, second: number, offset: days and time duration): time\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">time(14, 30, 0, duration(&quot;PT1H&quot;))\n// time(&quot;14:30:00+01:00&quot;)\n</code></pre>\n"
		},
		{
			"name": "date and time",
			"type": "function",
			"params": [{ "name": "from" }],
			"info": "<p>Parses the given string into a date and time. The function supports strings in the format <code>YYYY-MM-DDThh:mm:ss</code> with\noptional timezone information either as offset (e.g., <code>+01:00</code> or <code>Z</code>), as IANA timezone ID (e.g., <code>@Europe/Berlin</code>), or\nas a combination of both (e.g., <code>+01:00[Europe/Berlin]</code>).</p>\n<p>Returns <code>null</code> if the string is not a valid calendar date. For example, <code>&quot;2024-06-31T10:00:00&quot;</code> is invalid because\nJune has only 30 days.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">date and time(from: string): date and time\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">date and time(&quot;2018-04-29T09:30:00&quot;)\n// date and time(&quot;2018-04-29T09:30:00&quot;)\n\ndate and time(&quot;2018-04-29T09:30:00+02:00&quot;)\n// date and time(&quot;2018-04-29T09:30:00+02:00&quot;)\n\ndate and time(&quot;2018-04-29T09:30:00@Europe/Berlin&quot;)\n// date and time(&quot;2018-04-29T09:30:00@Europe/Berlin&quot;)\n\ndate and time(&quot;2018-04-29T09:30:00+02:00[Europe/Berlin]&quot;)\n// date and time(&quot;2018-04-29T09:30:00@Europe/Berlin&quot;)\n</code></pre>\n"
		},
		{
			"name": "date and time",
			"type": "function",
			"params": [{ "name": "date" }, { "name": "time" }],
			"info": "<p>Returns a date and time from the given components.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">date and time(date: date, time: time): date and time\n</code></pre>\n<pre><code class=\"language-feel\">date and time(date: date and time, time: time): date and time\n</code></pre>\n<p>Returns a date and time value that consists of the date component of <code>date</code> combined with <code>time</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">date and time(date(&quot;2012-12-24&quot;),time(&quot;T23:59:00&quot;))\n// date and time(&quot;2012-12-24T23:59:00&quot;)\n\ndate and time(date and time(&quot;2012-12-25T11:00:00&quot;),time(&quot;T23:59:00&quot;))\n// date and time(&quot;2012-12-25T23:59:00&quot;)\n</code></pre>\n"
		},
		{
			"name": "duration",
			"type": "function",
			"params": [{ "name": "from" }],
			"info": "<p>Parses the given string into a duration. The duration is either a days and time duration or a years and months duration.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">duration(from: string): days and time duration\n</code></pre>\n<pre><code class=\"language-feel\">duration(from: string): years and months duration\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">duration(&quot;P5D&quot;)\n// duration(&quot;P5D&quot;)\n\nduration(&quot;P32Y&quot;)\n// duration(&quot;P32Y&quot;)\n</code></pre>\n"
		},
		{
			"name": "years and months duration",
			"type": "function",
			"params": [{ "name": "from" }, { "name": "to" }],
			"info": "<p>Returns the years and months duration between <code>from</code> and <code>to</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">years and months duration(from: date, to: date): years and months duration\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">years and months duration(date(&quot;2011-12-22&quot;), date(&quot;2013-08-24&quot;))\n// duration(&quot;P1Y8M&quot;)\n</code></pre>\n"
		},
		{
			"name": "from json",
			"type": "function",
			"params": [{ "name": "value" }],
			"info": "<p>Parses a JSON string into a FEEL value. The function converts JSON primitives, objects, and arrays into their corresponding FEEL types.</p>\n<p>Returns <code>null</code> if the string is not a valid JSON value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">from json(value: string): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">from json(&quot;{\\&quot;a\\&quot;: 1, \\&quot;b\\&quot;: 2}&quot;)\n// {a: 1, b: 2}\n\nfrom json(&quot;true&quot;)\n// true\n\nfrom json(&quot;\\&quot;2023-06-14\\&quot;&quot;)\n// &quot;2023-06-14&quot;\n</code></pre>\n",
			"engines": { "camunda": ">=8.9" }
		},
		{
			"name": "to json",
			"type": "function",
			"params": [{ "name": "value" }],
			"info": "<p>Converts a FEEL value into a JSON string. The function converts FEEL primitives, contexts, and lists into their\ncorresponding JSON types. Temporal values are converted to their ISO 8601 string representation, including timezone\ninformation for date and time values (format: <code>2025-11-24T10:00:00+01:00[Europe/Berlin]</code>).</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">to json(value: Any): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">to json({a: 1, b: 2})\n// &quot;{\\&quot;a\\&quot;:1,\\&quot;b\\&quot;:2}&quot;\n\nto json(true)\n// &quot;true&quot;\n\nto json(@&quot;2023-06-14&quot;)\n// &quot;\\&quot;2023-06-14\\&quot;&quot;\n\nto json(@&quot;2025-11-24T10:00:00@Europe/Berlin&quot;)\n// &quot;\\&quot;2025-11-24T10:00:00+01:00[Europe/Berlin]\\&quot;&quot;\n\nto json(@&quot;P3Y&quot;)\n// &quot;\\&quot;P3Y\\&quot;&quot;\n</code></pre>\n",
			"engines": { "camunda": ">=8.9" }
		},
		{
			"name": "list contains",
			"type": "function",
			"params": [{ "name": "list" }, { "name": "element" }],
			"info": "<p>Returns <code>true</code> if the given list contains the element. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">list contains(list: list, element: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">list contains([1,2,3], 2)\n// true\n</code></pre>\n"
		},
		{
			"name": "count",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns the number of elements of the given list.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">count(list: list): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">count([1,2,3])\n// 3\n</code></pre>\n"
		},
		{
			"name": "min",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns the minimum of the given list.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">min(list: list): Any\n</code></pre>\n<p>All elements in <code>list</code> should have the same type and be comparable.</p>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">min([1,2,3])\n// 1\n\nmin(1,2,3)\n// 1\n</code></pre>\n"
		},
		{
			"name": "max",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns the maximum of the given list.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">max(list: list): Any\n</code></pre>\n<p>All elements in <code>list</code> should have the same type and be comparable.</p>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">max([1,2,3])\n// 3\n\nmax(1,2,3)\n// 3\n</code></pre>\n"
		},
		{
			"name": "sum",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns the sum of the given list of numbers.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">sum(list: list&lt;number&gt;): number\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">sum([1,2,3])\n// 6\n\nsum(1,2,3)\n// 6\n</code></pre>\n"
		},
		{
			"name": "product",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns the product of the given list of numbers.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">product(list: list&lt;number&gt;): number\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">product([2, 3, 4])\n// 24\n\nproduct(2, 3, 4)\n// 24\n</code></pre>\n"
		},
		{
			"name": "mean",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns the arithmetic mean (i.e. average) of the given list of numbers.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">mean(list: list&lt;number&gt;): number\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">mean([1,2,3])\n// 2\n\nmean(1,2,3)\n// 2\n</code></pre>\n"
		},
		{
			"name": "median",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns the median element of the given list of numbers.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">median(list: list&lt;number&gt;): number\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">median(8, 2, 5, 3, 4)\n// 4\n\nmedian([6, 1, 2, 3])\n// 2.5\n</code></pre>\n"
		},
		{
			"name": "stddev",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns the standard deviation of the given list of numbers.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">stddev(list: list&lt;number&gt;): number\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">stddev(2, 4, 7, 5)\n// 2.0816659994661326\n\nstddev([2, 4, 7, 5])\n// 2.0816659994661326\n</code></pre>\n"
		},
		{
			"name": "mode",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns the mode of the given list of numbers.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">mode(list: list&lt;number&gt;): number\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">mode(6, 3, 9, 6, 6)\n// [6]\n\nmode([6, 1, 9, 6, 1])\n// [1, 6]\n</code></pre>\n"
		},
		{
			"name": "all",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns <code>false</code> if any element of the given list is <code>false</code>. Otherwise, returns <code>true</code>.</p>\n<p>If the given list is empty, it returns <code>true</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">all(list: list&lt;boolean&gt;): boolean\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">all([true,false])\n// false\n\nall(false,null,true)\n// false\n</code></pre>\n<p>:::info\nThe function <code>all()</code> replaced the previous function <code>and()</code>. The previous function is deprecated and\nshould not be used anymore.\n:::</p>\n"
		},
		{
			"name": "any",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns <code>true</code> if any element of the given list is <code>true</code>. Otherwise, returns <code>false</code>.</p>\n<p>If the given list is empty, it returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">any(list: list&lt;boolean&gt;): boolean\n</code></pre>\n<p>The parameter <code>list</code> can be passed as a list or as a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">any([false,true])\n// true\n\nany(false,null,true)\n// true\n</code></pre>\n<p>:::info\nThe function <code>any()</code> replaced the previous function <code>or()</code>. The previous function is deprecated and\nshould not be used anymore.\n:::</p>\n"
		},
		{
			"name": "sublist",
			"type": "function",
			"params": [{ "name": "list" }, { "name": "start position" }],
			"info": "<p>Returns a partial list of the given value starting at <code>start position</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">sublist(list: list, start position: number): list\n</code></pre>\n<p>The <code>start position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">sublist([1,2,3], 2)\n// [2,3]\n</code></pre>\n"
		},
		{
			"name": "sublist",
			"type": "function",
			"params": [
				{ "name": "list" },
				{ "name": "start position" },
				{ "name": "length" }
			],
			"info": "<p>Returns a partial list of the given value starting at <code>start position</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">sublist(list: list, start position: number, length: number): list\n</code></pre>\n<p>The <code>start position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">sublist([1,2,3], 1, 2)\n// [1,2]\n</code></pre>\n"
		},
		{
			"name": "append",
			"type": "function",
			"params": [{ "name": "list" }, { "name": "items" }],
			"info": "<p>Returns the given list with all <code>items</code> appended.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">append(list: list, items: Any): list\n</code></pre>\n<p>The parameter <code>items</code> can be a single element or a sequence of elements.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">append([1], 2, 3)\n// [1,2,3]\n</code></pre>\n"
		},
		{
			"name": "concatenate",
			"type": "function",
			"params": [{ "name": "lists" }],
			"info": "<p>Returns a list that includes all elements of the given lists.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">concatenate(lists: list): list\n</code></pre>\n<p>The parameter <code>lists</code> is a sequence of lists.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">concatenate([1,2],[3])\n// [1,2,3]\n\nconcatenate([1],[2],[3])\n// [1,2,3]\n</code></pre>\n"
		},
		{
			"name": "insert before",
			"type": "function",
			"params": [
				{ "name": "list" },
				{ "name": "position" },
				{ "name": "newItem" }
			],
			"info": "<p>Returns the given list with <code>newItem</code> inserted at <code>position</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">insert before(list: list, position: number, newItem: Any): list\n</code></pre>\n<p>The <code>position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">insert before([1,3],1,2)\n// [2,1,3]\n</code></pre>\n"
		},
		{
			"name": "remove",
			"type": "function",
			"params": [{ "name": "list" }, { "name": "position" }],
			"info": "<p>Returns the given list without the element at <code>position</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">remove(list: list, position: number): list\n</code></pre>\n<p>The <code>position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">remove([1,2,3], 2)\n// [1,3]\n</code></pre>\n"
		},
		{
			"name": "reverse",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns the given list in revered order.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">reverse(list: list): list\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">reverse([1,2,3])\n// [3,2,1]\n</code></pre>\n"
		},
		{
			"name": "index of",
			"type": "function",
			"params": [{ "name": "list" }, { "name": "match" }],
			"info": "<p>Returns an ascending list of positions containing <code>match</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">index of(list: list, match: Any): list&lt;number&gt;\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">index of([1,2,3,2],2)\n// [2,4]\n</code></pre>\n"
		},
		{
			"name": "union",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns a list that includes all elements of the given lists without duplicates.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">union(list: list): list\n</code></pre>\n<p>The parameter <code>list</code> is a sequence of lists.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">union([1,2],[2,3])\n// [1,2,3]\n</code></pre>\n"
		},
		{
			"name": "distinct values",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns the given list without duplicates.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">distinct values(list: list): list\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">distinct values([1,2,3,2,1])\n// [1,2,3]\n</code></pre>\n"
		},
		{
			"name": "flatten",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Returns a list that includes all elements of the given list without nested lists.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">flatten(list: list): list\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">flatten([[1,2],[[3]], 4])\n// [1,2,3,4]\n</code></pre>\n"
		},
		{
			"name": "sort",
			"type": "function",
			"params": [{ "name": "list" }, { "name": "precedes" }],
			"info": "<p>Returns the given list sorted by the <code>precedes</code> function.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">sort(list: list, precedes: function&lt;(Any, Any) -&gt; boolean&gt;): list\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">sort(list: [3,1,4,5,2], precedes: function(x,y) x &lt; y)\n// [1,2,3,4,5]\n</code></pre>\n"
		},
		{
			"name": "string join",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p>Joins a list of strings into a single string. This is similar to\nJava&#39;s <a href=\"https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html#joining(java.lang.CharSequence,java.lang.CharSequence,java.lang.CharSequence)\">joining</a>\nfunction.</p>\n<p>If an item of the list is <code>null</code>, the item is ignored for the result string. If an item is\nneither a string nor <code>null</code>, the function returns <code>null</code> instead of a string.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">string join(list: list&lt;string&gt;): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">string join([&quot;a&quot;,&quot;b&quot;,&quot;c&quot;])\n// &quot;abc&quot;\n\nstring join([&quot;a&quot;,null,&quot;c&quot;])\n// &quot;ac&quot;\n\nstring join([])\n// &quot;&quot;\n</code></pre>\n"
		},
		{
			"name": "string join",
			"type": "function",
			"params": [{ "name": "list" }, { "name": "delimiter" }],
			"info": "<p>Joins a list of strings into a single string. This is similar to\nJava&#39;s <a href=\"https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html#joining(java.lang.CharSequence,java.lang.CharSequence,java.lang.CharSequence)\">joining</a>\nfunction.</p>\n<p>If an item of the list is <code>null</code>, the item is ignored for the result string. If an item is\nneither a string nor <code>null</code>, the function returns <code>null</code> instead of a string.</p>\n<p>The resulting string contains a <code>delimiter</code> between each element.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">string join(list: list&lt;string&gt;, delimiter: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">string join([&quot;a&quot;], &quot;X&quot;)\n// &quot;a&quot;\n\nstring join([&quot;a&quot;,&quot;b&quot;,&quot;c&quot;], &quot;, &quot;)\n// &quot;a, b, c&quot;\n</code></pre>\n"
		},
		{
			"name": "decimal",
			"type": "function",
			"params": [{ "name": "n" }, { "name": "scale" }],
			"info": "<p>Rounds the given value at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">decimal(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">decimal(1/3, 2)\n// .33\n\ndecimal(1.5, 0)\n// 2\n</code></pre>\n"
		},
		{
			"name": "floor",
			"type": "function",
			"params": [{ "name": "n" }],
			"info": "<p>Rounds the given value with rounding mode flooring.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">floor(n: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">floor(1.5)\n// 1\n\nfloor(-1.5)\n// -2\n</code></pre>\n"
		},
		{
			"name": "floor",
			"type": "function",
			"params": [{ "name": "n" }, { "name": "scale" }],
			"info": "<p>Rounds the given value with rounding mode flooring at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">floor(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">floor(-1.56, 1)\n// -1.6\n</code></pre>\n"
		},
		{
			"name": "ceiling",
			"type": "function",
			"params": [{ "name": "n" }],
			"info": "<p>Rounds the given value with rounding mode ceiling.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">ceiling(n: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">ceiling(1.5)\n// 2\n\nceiling(-1.5)\n// -1\n</code></pre>\n"
		},
		{
			"name": "ceiling",
			"type": "function",
			"params": [{ "name": "n" }, { "name": "scale" }],
			"info": "<p>Rounds the given value with rounding mode ceiling at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">ceiling(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">ceiling(-1.56, 1)\n// -1.5\n</code></pre>\n"
		},
		{
			"name": "round up",
			"type": "function",
			"params": [{ "name": "n" }, { "name": "scale" }],
			"info": "<p>Rounds the given value with the rounding mode round-up at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">round up(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">round up(5.5)\n// 6\n\nround up(-5.5)\n// -6\n\nround up(1.121, 2)\n// 1.13\n\nround up(-1.126, 2)\n// -1.13\n</code></pre>\n"
		},
		{
			"name": "round down",
			"type": "function",
			"params": [{ "name": "n" }, { "name": "scale" }],
			"info": "<p>Rounds the given value with the rounding mode round-down at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">round down(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">round down(5.5, 0)\n// 5\n\nround down (-5.5, 0)\n// -5\n\nround down (1.121, 2)\n// 1.12\n\nround down (-1.126, 2)\n// -1.12\n</code></pre>\n"
		},
		{
			"name": "round half up",
			"type": "function",
			"params": [{ "name": "n" }, { "name": "scale" }],
			"info": "<p>Rounds the given value with the rounding mode round-half-up at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">round half up(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">round half up(5.5, 0)\n// 6\n\nround half up(-5.5, 0)\n// -6\n\nround half up(1.121, 2)\n// 1.12\n\nround half up(-1.126, 2)\n// -1.13\n</code></pre>\n"
		},
		{
			"name": "round half down",
			"type": "function",
			"params": [{ "name": "n" }, { "name": "scale" }],
			"info": "<p>Rounds the given value with the rounding mode round-half-down at the given scale.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">round half down(n: number, scale: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">round half down (5.5, 0)\n// 5\n\nround half down (-5.5, 0)\n// -5\n\nround half down (1.121, 2)\n// 1.12\n\nround half down (-1.126, 2)\n// -1.13\n</code></pre>\n"
		},
		{
			"name": "abs",
			"type": "function",
			"params": [{ "name": "number" }],
			"info": "<p>Returns the absolute value of the given numeric value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">abs(number: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">abs(10)\n// 10\n\nabs(-10)\n// 10\n</code></pre>\n"
		},
		{
			"name": "modulo",
			"type": "function",
			"params": [{ "name": "dividend" }, { "name": "divisor" }],
			"info": "<p>Returns the remainder of the division of dividend by divisor.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">modulo(dividend: number, divisor: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">modulo(12, 5)\n// 2\n</code></pre>\n"
		},
		{
			"name": "sqrt",
			"type": "function",
			"params": [{ "name": "number" }],
			"info": "<p>Returns the square root of the given value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">sqrt(number: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">sqrt(16)\n// 4\n</code></pre>\n"
		},
		{
			"name": "log",
			"type": "function",
			"params": [{ "name": "number" }],
			"info": "<p>Returns the natural logarithm (base e) of the given value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">log(number: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">log(10)\n// 2.302585092994046\n</code></pre>\n"
		},
		{
			"name": "exp",
			"type": "function",
			"params": [{ "name": "number" }],
			"info": "<p>Returns the Euler’s number e raised to the power of the given number .</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">exp(number: number): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">exp(5)\n// 148.4131591025766\n</code></pre>\n"
		},
		{
			"name": "odd",
			"type": "function",
			"params": [{ "name": "number" }],
			"info": "<p>Returns <code>true</code> if the given value is odd. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">odd(number: number): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">odd(5)\n// true\n\nodd(2)\n// false\n</code></pre>\n"
		},
		{
			"name": "even",
			"type": "function",
			"params": [{ "name": "number" }],
			"info": "<p>Returns <code>true</code> if the given is even. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">even(number: number): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">even(5)\n// false\n\neven(2)\n// true\n</code></pre>\n"
		},
		{
			"name": "before",
			"type": "function",
			"params": [{ "name": "point1" }, { "name": "point2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">before(point1: Any, point2: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">before(1, 10)\n// true\n\nbefore(10, 1)\n// false\n</code></pre>\n"
		},
		{
			"name": "before",
			"type": "function",
			"params": [{ "name": "range" }, { "name": "point" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">before(range: range, point: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">before([1..5], 10)\n// true\n</code></pre>\n"
		},
		{
			"name": "before",
			"type": "function",
			"params": [{ "name": "point" }, { "name": "range" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">before(point: Any, range: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">before(1, [2..5])\n// true\n</code></pre>\n"
		},
		{
			"name": "before",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">before(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">before([1..5], [6..10])\n// true\n\nbefore([1..5),[5..10])\n// true\n</code></pre>\n"
		},
		{
			"name": "after",
			"type": "function",
			"params": [{ "name": "point1" }, { "name": "point2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">after(point1: Any, point2: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">after(10, 1)\n// true\n\nafter(1, 10)\n// false\n</code></pre>\n"
		},
		{
			"name": "after",
			"type": "function",
			"params": [{ "name": "range" }, { "name": "point" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">after(range: range, point: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">after([1..5], 10)\n// false\n</code></pre>\n"
		},
		{
			"name": "after",
			"type": "function",
			"params": [{ "name": "point" }, { "name": "range" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">after(point: Any, range: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">after(12, [2..5])\n// true\n</code></pre>\n"
		},
		{
			"name": "after",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">after(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">after([6..10], [1..5])\n// true\n\nafter([5..10], [1..5))\n// true\n</code></pre>\n"
		},
		{
			"name": "meets",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">meets(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">meets([1..5], [5..10])\n// true\n\nmeets([1..3], [4..6])\n// false\n\nmeets([1..3], [3..5])\n// true\n\nmeets([1..5], (5..8])\n// false\n</code></pre>\n"
		},
		{
			"name": "met by",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">met by(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">met by([5..10], [1..5])\n// true\n\nmet by([3..4], [1..2])\n// false\n\nmet by([3..5], [1..3])\n// true\n\nmet by((5..8], [1..5))\n// false\n\nmet by([5..10], [1..5))\n// false\n</code></pre>\n"
		},
		{
			"name": "overlaps",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">overlaps(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">overlaps([5..10], [1..6])\n// true\n\noverlaps((3..7], [1..4])\n// true\n\noverlaps([1..3], (3..6])\n// false\n\noverlaps((5..8], [1..5))\n// false\n\noverlaps([4..10], [1..5))\n// true\n</code></pre>\n"
		},
		{
			"name": "overlaps before",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">overlaps before(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">overlaps before([1..5], [4..10])\n// true\n\noverlaps before([3..4], [1..2])\n// false\n\noverlaps before([1..3], (3..5])\n// false\n\noverlaps before([1..5), (3..8])\n// true\n\noverlaps before([1..5), [5..10])\n// false\n</code></pre>\n"
		},
		{
			"name": "overlaps after",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">overlaps after(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">overlaps after([4..10], [1..5])\n// true\n\noverlaps after([3..4], [1..2])\n// false\n\noverlaps after([3..5], [1..3))\n// false\n\noverlaps after((5..8], [1..5))\n// false\n\noverlaps after([4..10], [1..5))\n// true\n</code></pre>\n"
		},
		{
			"name": "finishes",
			"type": "function",
			"params": [{ "name": "point" }, { "name": "range" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">finishes(point: Any, range: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">finishes(5, [1..5])\n// true\n\nfinishes(10, [1..7])\n// false\n</code></pre>\n"
		},
		{
			"name": "finishes",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">finishes(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">finishes([3..5], [1..5])\n// true\n\nfinishes((1..5], [1..5))\n// false\n\nfinishes([5..10], [1..10))\n// false\n</code></pre>\n"
		},
		{
			"name": "finished by",
			"type": "function",
			"params": [{ "name": "range" }, { "name": "point" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">finished by(range: range, point: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">finished by([5..10], 10)\n// true\n\nfinished by([3..4], 2)\n// false\n</code></pre>\n"
		},
		{
			"name": "finished by",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">finished by(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">finished by([1..5], [3..5])\n// true\n\nfinished by((5..8], [1..5))\n// false\n\nfinished by([5..10], (1..10))\n// false\n</code></pre>\n"
		},
		{
			"name": "includes",
			"type": "function",
			"params": [{ "name": "range" }, { "name": "point" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">includes(range: range, point: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">includes([5..10], 6)\n// true\n\nincludes([3..4], 5)\n// false\n</code></pre>\n"
		},
		{
			"name": "includes",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">includes(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">includes([1..10], [4..6])\n// true\n\nincludes((5..8], [1..5))\n// false\n\nincludes([1..10], [1..5))\n// true\n</code></pre>\n"
		},
		{
			"name": "during",
			"type": "function",
			"params": [{ "name": "point" }, { "name": "range" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">during(point: Any, range: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">during(5, [1..10])\n// true\n\nduring(12, [1..10])\n// false\n\nduring(1, (1..10])\n// false\n</code></pre>\n"
		},
		{
			"name": "during",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">during(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">during([4..6], [1..10))\n// true\n\nduring((1..5], (1..10])\n// true\n</code></pre>\n"
		},
		{
			"name": "starts",
			"type": "function",
			"params": [{ "name": "point" }, { "name": "range" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">starts(point: Any, range: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">starts(1, [1..5])\n// true\n\nstarts(1, (1..8])\n// false\n</code></pre>\n"
		},
		{
			"name": "starts",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">starts(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">starts((1..5], [1..5])\n// false\n\nstarts([1..10], [1..5])\n// false\n\nstarts((1..5), (1..10))\n// true\n</code></pre>\n"
		},
		{
			"name": "started by",
			"type": "function",
			"params": [{ "name": "range" }, { "name": "point" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">started by(range: range, point: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">started by([1..10], 1)\n// true\n\nstarted by((1..10], 1)\n// false\n</code></pre>\n"
		},
		{
			"name": "started by",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">started by(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">started by([1..10], [1..5])\n// true\n\nstarted by((1..10], [1..5))\n// false\n\nstarted by([1..10], [1..10))\n// true\n</code></pre>\n"
		},
		{
			"name": "coincides",
			"type": "function",
			"params": [{ "name": "point1" }, { "name": "point2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">coincides(point1: Any, point2: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">coincides(5, 5)\n// true\n\ncoincides(3, 4)\n// false\n</code></pre>\n"
		},
		{
			"name": "coincides",
			"type": "function",
			"params": [{ "name": "range1" }, { "name": "range2" }],
			"info": "<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">coincides(range1: range, range2: range): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">coincides([1..5], [1..5])\n// true\n\ncoincides((1..5], [1..5))\n// false\n\ncoincides([1..5], [2..6])\n// false\n</code></pre>\n"
		},
		{
			"name": "substring",
			"type": "function",
			"params": [{ "name": "string" }, { "name": "start position" }],
			"info": "<p>Returns a substring of the given value starting at <code>start position</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">substring(string: string, start position: number): string\n</code></pre>\n<p>The <code>start position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">substring(&quot;foobar&quot;, 3)\n// &quot;obar&quot;\n\nsubstring(&quot;foobar&quot;, -2)\n// &quot;ar&quot;\n</code></pre>\n"
		},
		{
			"name": "substring",
			"type": "function",
			"params": [
				{ "name": "string" },
				{ "name": "start position" },
				{ "name": "length" }
			],
			"info": "<p>Returns a substring of the given value, starting at <code>start position</code> with the given <code>length</code>. If <code>length</code> is greater than\nthe remaining characters of the value, it returns all characters from <code>start position</code> until the end.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">substring(string: string, start position: number, length: number): string\n</code></pre>\n<p>The <code>start position</code> starts at the index <code>1</code>. The last position is <code>-1</code>.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">substring(&quot;foobar&quot;, 3, 3)\n// &quot;oba&quot;\n\nsubstring(&quot;foobar&quot;, -3, 2)\n// &quot;ba&quot;\n\nsubstring(&quot;foobar&quot;, 3, 10)\n// &quot;obar&quot;\n</code></pre>\n"
		},
		{
			"name": "string length",
			"type": "function",
			"params": [{ "name": "string" }],
			"info": "<p>Returns the number of characters in the given value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">string length(string: string): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">string length(&quot;foo&quot;)\n// 3\n</code></pre>\n"
		},
		{
			"name": "upper case",
			"type": "function",
			"params": [{ "name": "string" }],
			"info": "<p>Returns the given value with all characters are uppercase.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">upper case(string: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">upper case(&quot;aBc4&quot;)\n// &quot;ABC4&quot;\n</code></pre>\n"
		},
		{
			"name": "lower case",
			"type": "function",
			"params": [{ "name": "string" }],
			"info": "<p>Returns the given value with all characters are lowercase.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">lower case(string: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">lower case(&quot;aBc4&quot;)\n// &quot;abc4&quot;\n</code></pre>\n"
		},
		{
			"name": "substring before",
			"type": "function",
			"params": [{ "name": "string" }, { "name": "match" }],
			"info": "<p>Returns a substring of the given value that contains all characters before <code>match</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">substring before(string: string, match: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">substring before(&quot;foobar&quot;, &quot;bar&quot;)\n// &quot;foo&quot;\n</code></pre>\n"
		},
		{
			"name": "substring after",
			"type": "function",
			"params": [{ "name": "string" }, { "name": "match" }],
			"info": "<p>Returns a substring of the given value that contains all characters after <code>match</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">substring after(string: string, match: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">substring after(&quot;foobar&quot;, &quot;ob&quot;)\n// &quot;ar&quot;\n</code></pre>\n"
		},
		{
			"name": "contains",
			"type": "function",
			"params": [{ "name": "string" }, { "name": "match" }],
			"info": "<p>Returns <code>true</code> if the given value contains the substring <code>match</code>. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">contains(string: string, match: string): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">contains(&quot;foobar&quot;, &quot;of&quot;)\n// false\n</code></pre>\n"
		},
		{
			"name": "starts with",
			"type": "function",
			"params": [{ "name": "string" }, { "name": "match" }],
			"info": "<p>Returns <code>true</code> if the given value starts with the substring <code>match</code>. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">starts with(string: string, match: string): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">starts with(&quot;foobar&quot;, &quot;fo&quot;)\n// true\n</code></pre>\n"
		},
		{
			"name": "ends with",
			"type": "function",
			"params": [{ "name": "string" }, { "name": "match" }],
			"info": "<p>Returns <code>true</code> if the given value ends with the substring <code>match</code>. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">ends with(string: string, match: string): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">ends with(&quot;foobar&quot;, &quot;r&quot;)\n// true\n</code></pre>\n"
		},
		{
			"name": "matches",
			"type": "function",
			"params": [{ "name": "input" }, { "name": "pattern" }],
			"info": "<p>Returns <code>true</code> if the given value matches the <code>pattern</code>. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">matches(input: string, pattern: string): boolean\n</code></pre>\n<p>The <code>pattern</code> is a string that contains a regular expression.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">matches(&quot;foobar&quot;, &quot;^fo*bar&quot;)\n// true\n</code></pre>\n"
		},
		{
			"name": "matches",
			"type": "function",
			"params": [
				{ "name": "input" },
				{ "name": "pattern" },
				{ "name": "flags" }
			],
			"info": "<p>Returns <code>true</code> if the given value matches the <code>pattern</code>. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">matches(input: string, pattern: string, flags: string): boolean\n</code></pre>\n<p>The <code>pattern</code> is a string that contains a regular expression.</p>\n<p>The <code>flags</code> can contain one or more of the following characters:</p>\n<ul>\n<li><code>s</code> (dot-all)</li>\n<li><code>m</code> (multi-line)</li>\n<li><code>i</code> (case insensitive)</li>\n<li><code>x</code> (comments)</li>\n</ul>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">matches(&quot;FooBar&quot;, &quot;foo&quot;, &quot;i&quot;)\n// true\n</code></pre>\n"
		},
		{
			"name": "replace",
			"type": "function",
			"params": [
				{ "name": "input" },
				{ "name": "pattern" },
				{ "name": "replacement" }
			],
			"info": "<p>Returns the resulting string after replacing all occurrences of <code>pattern</code> with <code>replacement</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">replace(input: string, pattern: string, replacement: string): string\n</code></pre>\n<p>The <code>pattern</code> is a string that contains a regular expression.</p>\n<p>The <code>replacement</code> can access the match groups by using <code>$</code> and the number of the group, for example,\n<code>$1</code> to access the first group.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">replace(&quot;abcd&quot;, &quot;(ab)|(a)&quot;, &quot;[1=$1][2=$2]&quot;)\n// &quot;[1=ab][2=]cd&quot;\n\nreplace(&quot;0123456789&quot;, &quot;(\\d{3})(\\d{3})(\\d{4})&quot;, &quot;($1) $2-$3&quot;)\n// &quot;(012) 345-6789&quot;\n</code></pre>\n"
		},
		{
			"name": "replace",
			"type": "function",
			"params": [
				{ "name": "input" },
				{ "name": "pattern" },
				{ "name": "replacement" },
				{ "name": "flags" }
			],
			"info": "<p>Returns the resulting string after replacing all occurrences of <code>pattern</code> with <code>replacement</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">replace(input: string, pattern: string, replacement: string, flags: string): string\n</code></pre>\n<p>The <code>pattern</code> is a string that contains a regular expression.</p>\n<p>The <code>replacement</code> can access the match groups by using <code>$</code> and the number of the group, for example,\n<code>$1</code> to access the first group.</p>\n<p>The <code>flags</code> can contain one or more of the following characters:</p>\n<ul>\n<li><code>s</code> (dot-all)</li>\n<li><code>m</code> (multi-line)</li>\n<li><code>i</code> (case insensitive)</li>\n<li><code>x</code> (comments)</li>\n</ul>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">replace(&quot;How do you feel?&quot;, &quot;Feel&quot;, &quot;FEEL&quot;, &quot;i&quot;)\n// &quot;How do you FEEL?&quot;\n</code></pre>\n"
		},
		{
			"name": "split",
			"type": "function",
			"params": [{ "name": "string" }, { "name": "delimiter" }],
			"info": "<p>Splits the given value into a list of substrings, breaking at each occurrence of the <code>delimiter</code> pattern.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">split(string: string, delimiter: string): list&lt;string&gt;\n</code></pre>\n<p>The <code>delimiter</code> is a string that contains a regular expression.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">split(&quot;John Doe&quot;, &quot;\\s&quot; )\n// [&quot;John&quot;, &quot;Doe&quot;]\n\nsplit(&quot;a;b;c;;&quot;, &quot;;&quot;)\n// [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;&quot;, &quot;&quot;]\n</code></pre>\n"
		},
		{
			"name": "now",
			"type": "function",
			"params": [],
			"info": "<p>Returns the current date and time including the timezone.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">now(): date and time\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">now()\n// date and time(&quot;2020-07-31T14:27:30@Europe/Berlin&quot;)\n</code></pre>\n"
		},
		{
			"name": "today",
			"type": "function",
			"params": [],
			"info": "<p>Returns the current date.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">today(): date\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">today()\n// date(&quot;2020-07-31&quot;)\n</code></pre>\n"
		},
		{
			"name": "day of week",
			"type": "function",
			"params": [{ "name": "date" }],
			"info": "<p>Returns the day of the week according to the Gregorian calendar. Note that it always returns the English name of the day.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">day of week(date: date): string\n</code></pre>\n<pre><code class=\"language-feel\">day of week(date: date and time): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">day of week(date(&quot;2019-09-17&quot;))\n// &quot;Tuesday&quot;\n\nday of week(date and time(&quot;2019-09-17T12:00:00&quot;))\n// &quot;Tuesday&quot;\n</code></pre>\n"
		},
		{
			"name": "day of year",
			"type": "function",
			"params": [{ "name": "date" }],
			"info": "<p>Returns the Gregorian number of the day within the year.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">day of year(date: date): number\n</code></pre>\n<pre><code class=\"language-feel\">day of year(date: date and time): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">day of year(date(&quot;2019-09-17&quot;))\n// 260\n\nday of year(date and time(&quot;2019-09-17T12:00:00&quot;))\n// 260\n</code></pre>\n"
		},
		{
			"name": "week of year",
			"type": "function",
			"params": [{ "name": "date" }],
			"info": "<p>Returns the Gregorian number of the week within the year, according to ISO 8601.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">week of year(date: date): number\n</code></pre>\n<pre><code class=\"language-feel\">week of year(date: date and time): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">week of year(date(&quot;2019-09-17&quot;))\n// 38\n\nweek of year(date and time(&quot;2019-09-17T12:00:00&quot;))\n// 38\n</code></pre>\n"
		},
		{
			"name": "month of year",
			"type": "function",
			"params": [{ "name": "date" }],
			"info": "<p>Returns the month of the year according to the Gregorian calendar. Note that it always returns the English name of the month.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">month of year(date: date): string\n</code></pre>\n<pre><code class=\"language-feel\">month of year(date: date and time): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">month of year(date(&quot;2019-09-17&quot;))\n// &quot;September&quot;\n\nmonth of year(date and time(&quot;2019-09-17T12:00:00&quot;))\n// &quot;September&quot;\n</code></pre>\n"
		},
		{
			"name": "abs",
			"type": "function",
			"params": [{ "name": "n" }],
			"info": "<p>Returns the absolute value of a given duration.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">abs(n: days and time duration): days and time duration\n</code></pre>\n<pre><code class=\"language-feel\">abs(n: years and months duration): years and months duration\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">abs(duration(&quot;-PT5H&quot;))\n// &quot;duration(&quot;PT5H&quot;)&quot;\n\nabs(duration(&quot;PT5H&quot;))\n// &quot;duration(&quot;PT5H&quot;)&quot;\n\nabs(duration(&quot;-P2M&quot;))\n// duration(&quot;P2M&quot;)\n</code></pre>\n"
		}
	];
	var camundaExtensions = [
		{
			"name": "fromAi",
			"type": "function",
			"params": [{ "name": "value" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the unmodified <code>value</code> parameter, which must be a FEEL variable reference in the form <code>toolCall.&lt;parameterName&gt;</code> (for example, <code>toolCall.userId</code>).</p>\n<ul>\n<li>The purpose of this function is solely to tag the value as being generated by an AI integration.</li>\n<li>The actual handling is not performed by the FEEL engine, but by a custom integration such as a connector or a job worker.</li>\n</ul>\n<p>The main use case of this function is for <a href=\"https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions\">tool definitions</a> used by the <a href=\"https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent\">AI Agent connector</a>.</p>\n<p>See the following function overloads for additional function parameters.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">fromAi(value: Any): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">fromAi(toolCall.searchQuery)\n// toolCall.searchQuery contents\n\nfromAi(toolCall.userId)\n// toolCall.userId contents\n</code></pre>\n",
			"engines": { "camunda": ">=8.8" }
		},
		{
			"name": "fromAi",
			"type": "function",
			"params": [{ "name": "value" }, { "name": "description" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the unmodified <code>value</code> parameter, which must be a FEEL variable reference in the form <code>toolCall.&lt;parameterName&gt;</code> (for example, <code>toolCall.userId</code>).</p>\n<p>In addition to the previous overload, it also accepts an optional <code>description</code> parameter to provide a textual description of the value. The description must be <code>null</code> or a string constant.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">fromAi(value: Any, description: string): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">fromAi(toolCall.searchQuery, &quot;The search query used to find the best match.&quot;)\n// toolCall.searchQuery contents\n\nfromAi(toolCall.searchQuery, null)\n// toolCall.searchQuery contents\n</code></pre>\n",
			"engines": { "camunda": ">=8.8" }
		},
		{
			"name": "fromAi",
			"type": "function",
			"params": [
				{ "name": "value" },
				{ "name": "description" },
				{ "name": "type" }
			],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the unmodified <code>value</code> parameter, which must be a FEEL variable reference in the form <code>toolCall.&lt;parameterName&gt;</code> (for example, <code>toolCall.userId</code>).</p>\n<p>In addition to the previous overload, it also accepts an optional <code>type</code> parameter to provide type information about the value. The type must be <code>null</code> or a string constant.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">fromAi(value: Any, description: string, type: string): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">fromAi(toolCall.searchQuery, &quot;The search query used to find the best match.&quot;, &quot;string&quot;)\n// toolCall.searchQuery contents\n\nfromAi(toolCall.userId, &quot;The user&#39;s ID&quot;, &quot;number&quot;)\n// toolCall.userId contents\n\nfromAi(toolCall.userId, null, &quot;number&quot;)\n// toolCall.userId contents\n\nfromAi(value: toolCall.userId, type: &quot;number&quot;)\n// toolCall.userId contents\n</code></pre>\n",
			"engines": { "camunda": ">=8.8" }
		},
		{
			"name": "fromAi",
			"type": "function",
			"params": [
				{ "name": "value" },
				{ "name": "description" },
				{ "name": "type" },
				{ "name": "schema" }
			],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the unmodified <code>value</code> parameter, which must be a FEEL variable reference in the form <code>toolCall.&lt;parameterName&gt;</code> (for example, <code>toolCall.userId</code>).</p>\n<p>In addition to the previous overload, it also accepts an optional <code>schema</code> parameter to provide a (partial) <a href=\"https://json-schema.org/\">JSON schema</a> for the value.</p>\n<ul>\n<li>The schema must be <code>null</code> or a context (map) containing only constant values. For example, function calls within the schema are not supported.</li>\n<li>The schema is not validated by the FEEL engine but might be by a custom integration consuming the information.</li>\n<li>From the engine side it is possible to specify both a <code>type</code> and a <code>schema</code>, and it depends on the integration as to which value takes precedence. The <a href=\"https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent\">AI Agent connector</a> will override any type specified in the schema if the <code>type</code> parameter is also provided.</li>\n</ul>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">fromAi(value: Any, description: string, type: string, schema: context): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">fromAi(toolCall.documentType, &quot;The document type to provide&quot;, &quot;string&quot;, {\n  enum: [&quot;invoice&quot;, &quot;receipt&quot;, &quot;contract&quot;]\n})\n// toolCall.documentType contents\n\nfromAi(value: toolCall.documentType, description: &quot;The document type to provide&quot;, schema: {\n  type: &quot;string&quot;,\n  enum: [&quot;invoice&quot;, &quot;receipt&quot;, &quot;contract&quot;]\n})\n// toolCall.documentType contents\n\nfromAi(toolCall.tags, &quot;Tags to apply to the blog post&quot;, &quot;array&quot;, {\n  items: {\n    type: &quot;string&quot;\n  }\n})\n// toolCall.tags contents\n</code></pre>\n",
			"engines": { "camunda": ">=8.8" }
		},
		{
			"name": "fromAi",
			"type": "function",
			"params": [
				{ "name": "value" },
				{ "name": "description" },
				{ "name": "type" },
				{ "name": "schema" },
				{ "name": "options" }
			],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the unmodified <code>value</code> parameter, which must be a FEEL variable reference in the form <code>toolCall.&lt;parameterName&gt;</code> (for example, <code>toolCall.userId</code>).</p>\n<p>In addition to the previous overload, it also accepts an optional <code>options</code> parameter to provide additional options for the integration handling the value definition.</p>\n<ul>\n<li>The options parameter must be <code>null</code> or a context (map) containing only constant values. For example, function calls within options are not supported.</li>\n</ul>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">fromAi(value: Any, description: string, type: string, schema: context, options: context): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">fromAi(toolCall.documentType, &quot;The document type to provide&quot;, &quot;string&quot;, null, {\n  required: false\n})\n// toolCall.documentType contents\n\nfromAi(value: toolCall.documentType, options: {\n  required: false\n})\n// toolCall.documentType contents\n</code></pre>\n",
			"engines": { "camunda": ">=8.8" }
		},
		{
			"name": "is defined",
			"type": "function",
			"params": [{ "name": "value" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Checks if a given value is not <code>null</code>. If the value is <code>null</code> then the function returns <code>false</code>.\nOtherwise, the function returns <code>true</code>.</p>\n<p>The function requires one argument. Calling <code>is defined()</code> without an argument is invalid.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">is defined(value: Any): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">is defined(1)\n// true\n\nis defined(null)\n// false\n\nis defined(x)\n// false - if no variable &quot;x&quot; exists\n\nis defined(x.y)\n// false - if no variable &quot;x&quot; exists or it doesn&#39;t have a property &quot;y&quot;\n\nis defined()\n// error - expected one argument\n</code></pre>\n<p>:::caution Breaking change</p>\n<p>This function worked differently in previous versions. It returned <code>true</code> if the value was <code>null</code>.\nSince this version, the function returns <code>false</code> if the value is <code>null</code>.</p>\n<p>:::</p>\n"
		},
		{
			"name": "get or else",
			"type": "function",
			"params": [{ "name": "value" }, { "name": "default" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Return the provided value parameter if not <code>null</code>, otherwise return the default parameter</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">get or else(value: Any, default: Any): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">get or else(&quot;this&quot;, &quot;default&quot;)\n// &quot;this&quot;\n\nget or else(null, &quot;default&quot;)\n// &quot;default&quot;\n\nget or else(null, null)\n// null\n</code></pre>\n",
			"engines": { "camunda": ">=8.3" }
		},
		{
			"name": "assert",
			"type": "function",
			"params": [{ "name": "value" }, { "name": "condition" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Verify that the given condition is met. If the condition is <code>true</code>, the function returns the value.\nOtherwise, the evaluation fails with an error.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">assert(value: Any, condition: Any)\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">assert(x, x != null)\n// &quot;value&quot; - if x is &quot;value&quot;\n// error - if x is null or doesn&#39;t exist\n\nassert(x, x &gt;= 0)\n// 4 - if x is 4\n// error - if x is less than zero\n</code></pre>\n",
			"engines": { "camunda": ">=8.3" }
		},
		{
			"name": "assert",
			"type": "function",
			"params": [
				{ "name": "value" },
				{ "name": "condition" },
				{ "name": "cause" }
			],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Verify that the given condition is met. If the condition is <code>true</code>, the function returns the value.\nOtherwise, the evaluation fails with an error containing the given message.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">assert(value: Any, condition: Any, cause: String)\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">assert(x, x != null, &quot;&#39;x&#39; should not be null&quot;)\n// &quot;value&quot; - if x is &quot;value&quot;\n// error(&#39;x&#39; should not be null) - if x is null or doesn&#39;t exist\n\nassert(x, x &gt;= 0, &quot;&#39;x&#39; should be positive&quot;)\n// 4 - if x is 4\n// error(&#39;x&#39; should be positive) - if x is less than zero\n</code></pre>\n",
			"engines": { "camunda": ">=8.3" }
		},
		{
			"name": "get value",
			"type": "function",
			"params": [{ "name": "context" }, { "name": "keys" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the value of the context entry for a context path defined by the given keys.</p>\n<p>If <code>keys</code> contains the keys <code>[k1, k2]</code> then it returns the value at the nested entry <code>k1.k2</code> of the context.</p>\n<p>If <code>keys</code> are empty or the nested entry defined by the keys doesn&#39;t exist in the context, it returns <code>null</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">get value(context: context, keys: list&lt;string&gt;): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">get value({x:1, y: {z:0}}, [&quot;y&quot;, &quot;z&quot;])\n// 0\n\nget value({x: {y: {z:0}}}, [&quot;x&quot;, &quot;y&quot;])\n// {z:0}\n\nget value({a: {b: 3}}, [&quot;b&quot;])\n// null\n</code></pre>\n"
		},
		{
			"name": "context put",
			"type": "function",
			"params": [
				{ "name": "context" },
				{ "name": "key" },
				{ "name": "value" }
			],
			"info": "<p>Adds a new entry with the given key and value to the context. Returns a new context that includes the entry.</p>\n<p>If an entry for the same key already exists in the context, it overrides the value.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">context put(context: context, key: string, value: Any): context\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">context put({x:1}, &quot;y&quot;, 2)\n// {x:1, y:2}\n</code></pre>\n<p>:::info\nThe function <code>context put()</code> replaced the previous function <code>put()</code> (Camunda Extension). The\nprevious function is deprecated and should not be used anymore.\n:::</p>\n"
		},
		{
			"name": "context merge",
			"type": "function",
			"params": [{ "name": "contexts" }],
			"info": "<p>Union the given contexts. Returns a new context that includes all entries of the given contexts.</p>\n<p>If an entry for the same key already exists in a context, it overrides the value. The entries are overridden in the same order as in the list of contexts.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">context merge(contexts: list&lt;context&gt;): context\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">context merge([{x:1}, {y:2}])\n// {x:1, y:2}\n\ncontext merge([{x:1, y: 0}, {y:2}])\n// {x:1, y:2}\n</code></pre>\n<p>:::info\nThe function <code>context merge()</code> replaced the previous function <code>put all()</code> (Camunda Extension). The\nprevious function is deprecated and should not be used anymore.\n:::</p>\n",
			"engines": { "camunda": ">=8.2" }
		},
		{
			"name": "date and time",
			"type": "function",
			"params": [{ "name": "date" }, { "name": "timezone" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the given date and time value at the given timezone.</p>\n<p>If <code>date</code> has a different timezone than <code>timezone</code> then it adjusts the time to match the local time of <code>timezone</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">date and time(date: date and time, timezone: string): date and time\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">date and time(@&quot;2020-07-31T14:27:30@Europe/Berlin&quot;, &quot;America/Los_Angeles&quot;)\n// date and time(&quot;2020-07-31T05:27:30@America/Los_Angeles&quot;)\n\ndate and time(@&quot;2020-07-31T14:27:30&quot;, &quot;Z&quot;)\n// date and time(&quot;2020-07-31T12:27:30Z&quot;)\n</code></pre>\n"
		},
		{
			"name": "duplicate values",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns all duplicate values of the given list.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">duplicate values(list: list): list\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">duplicate values([1,2,3,2,1])\n// [1,2]\n</code></pre>\n",
			"engines": { "camunda": ">=8.3" }
		},
		{
			"name": "string join",
			"type": "function",
			"params": [
				{ "name": "list" },
				{ "name": "delimiter" },
				{ "name": "prefix" },
				{ "name": "suffix" }
			],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Joins a list of strings into a single string. This is similar to\nJava&#39;s <a href=\"https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html#joining(java.lang.CharSequence,java.lang.CharSequence,java.lang.CharSequence)\">joining</a>\nfunction.</p>\n<p>If an item of the list is <code>null</code>, the item is ignored for the result string. If an item is\nneither a string nor <code>null</code>, the function returns <code>null</code> instead of a string.</p>\n<p>The resulting string starts with <code>prefix</code>, contains a <code>delimiter</code> between each element, and ends\nwith <code>suffix</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">string join(list: list&lt;string&gt;, delimiter: string, prefix: string, suffix: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">string join([&quot;a&quot;,&quot;b&quot;,&quot;c&quot;], &quot;, &quot;, &quot;[&quot;, &quot;]&quot;)\n// &quot;[a, b, c]&quot;\n</code></pre>\n"
		},
		{
			"name": "is empty",
			"type": "function",
			"params": [{ "name": "list" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns <code>true</code> if the given list is empty. Otherwise, returns <code>false</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">is empty(list: list): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">is empty([])\n// true\n\nis empty([1,2,3])\n// false\n</code></pre>\n",
			"engines": { "camunda": ">=8.6" }
		},
		{
			"name": "partition",
			"type": "function",
			"params": [{ "name": "list" }, { "name": "size" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns consecutive sublists of a list, each of the same size (the final list may be smaller).</p>\n<p>If <code>size</code> is less than <code>0</code>, it returns <code>null</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">partition(list: list, size: number): list\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">partition([1,2,3,4,5], 2)\n// [[1,2], [3,4], [5]]\n\npartition([], 2)\n// []\n\npartition([1,2], 0)\n// null\n</code></pre>\n",
			"engines": { "camunda": ">=8.7" }
		},
		{
			"name": "random number",
			"type": "function",
			"params": [],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns a random number between <code>0</code> and <code>1</code>.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">random number(): number\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">random number()\n// 0.9701618132579795\n</code></pre>\n",
			"engines": { "camunda": ">=8.2" }
		},
		{
			"name": "extract",
			"type": "function",
			"params": [{ "name": "string" }, { "name": "pattern" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns all matches of the pattern in the given string. Returns an empty list if the pattern doesn&#39;t\nmatch.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">extract(string: string, pattern: string): list&lt;string&gt;\n</code></pre>\n<p>The <code>pattern</code> is a string that contains a regular expression.</p>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">extract(&quot;references are 1234, 1256, 1378&quot;, &quot;12[0-9]*&quot;)\n// [&quot;1234&quot;,&quot;1256&quot;]\n</code></pre>\n"
		},
		{
			"name": "trim",
			"type": "function",
			"params": [{ "name": "string" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the given string without leading and trailing spaces.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">trim(string: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">trim(&quot;  hello world  &quot;)\n// &quot;hello world&quot;\n\ntrim(&quot;hello   world &quot;)\n// &quot;hello   world&quot;\n</code></pre>\n",
			"engines": { "camunda": ">=8.6" }
		},
		{
			"name": "uuid",
			"type": "function",
			"params": [],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns a UUID (Universally Unique Identifier) with 36 characters.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">uuid(): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">uuid()\n// &quot;7793aab1-d761-4d38-916b-b7270e309894&quot;\n</code></pre>\n",
			"engines": { "camunda": ">=8.6" }
		},
		{
			"name": "to base64",
			"type": "function",
			"params": [{ "name": "value" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the given string encoded in Base64 format.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">to base64(value: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">to base64(&quot;FEEL&quot;)\n// &quot;RkVFTA==&quot;\n</code></pre>\n",
			"engines": { "camunda": ">=8.6" }
		},
		{
			"name": "from base64",
			"type": "function",
			"params": [{ "name": "value" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns the given Base64 encoded string decoded to a plain string.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">from base64(value: string): string\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">from base64(&quot;RkVFTA==&quot;)\n// &quot;FEEL&quot;\n</code></pre>\n",
			"engines": { "camunda": ">=8.9" }
		},
		{
			"name": "is blank",
			"type": "function",
			"params": [{ "name": "string" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Returns <code>true</code> if the given string is blank (empty or contains only whitespaces).</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">is blank(string: string): boolean\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">is blank(&quot;&quot;)\n// true\n\nis blank(&quot; &quot;)\n// true\n\nis blank(&quot;hello world&quot;)\n// false\n</code></pre>\n",
			"engines": { "camunda": ">=8.8" }
		},
		{
			"name": "last day of month",
			"type": "function",
			"params": [{ "name": "date" }],
			"info": "<p><em>Camunda Extension</em></p>\n<p>Takes the month of the given date or date-time value and returns the last day of this month.</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">last day of month(date: date): date\n</code></pre>\n<pre><code class=\"language-feel\">last day of month(date: date and time): date\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">last day of month(date(&quot;2022-10-01&quot;))\n// date(&quot;2022-10-31&quot;))\n\nlast day of month(date and time(&quot;2022-10-16T12:00:00&quot;))\n// date(&quot;2022-10-31&quot;))\n</code></pre>\n",
			"engines": { "camunda": ">=8.2" }
		}
	];
	var camundaBuiltins = [...feelBuiltins, ...camundaExtensions];
	var camundaReservedNameBuiltins = [{
		"name": "get or else",
		"type": "function",
		"params": [{ "name": "value" }, { "name": "default" }],
		"info": "<p><em>Camunda Extension</em></p>\n<p>Return the provided value parameter if not <code>null</code>, otherwise return the default parameter</p>\n<p><strong>Function signature</strong></p>\n<pre><code class=\"language-feel\">get or else(value: Any, default: Any): Any\n</code></pre>\n<p><strong>Examples</strong></p>\n<pre><code class=\"language-feel\">get or else(&quot;this&quot;, &quot;default&quot;)\n// &quot;this&quot;\n\nget or else(null, &quot;default&quot;)\n// &quot;default&quot;\n\nget or else(null, null)\n// null\n</code></pre>\n",
		"engines": { "camunda": ">=8.3" }
	}];
	exports.camundaBuiltins = camundaBuiltins;
	exports.camundaExtensions = camundaExtensions;
	exports.camundaReservedNameBuiltins = camundaReservedNameBuiltins;
	exports.feelBuiltins = feelBuiltins;
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/feel.js
var require_feel = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { getPath, pathConcat } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { FeelAnalyzer } = (init_dist$5(), __toCommonJS(dist_exports$3));
	var { camundaReservedNameBuiltins } = require_dist();
	var { reportErrors } = require_reporter();
	var { ERROR_TYPES } = require_error_types();
	var { skipInNonExecutableProcess } = require_rule();
	var { annotateRule } = require_helper();
	var { findParentNode } = require_element();
	var { isFeelProperty } = require_feel$1();
	module.exports = skipInNonExecutableProcess(function() {
		const feelAnalyzer = new FeelAnalyzer({
			parserDialect: "camunda",
			reservedNameBuiltins: camundaReservedNameBuiltins
		});
		function check(node, reporter) {
			if (is(node, "bpmn:Expression")) return;
			const parentNode = findParentNode(node);
			if (!parentNode) return;
			const errors = [];
			Object.entries(node).forEach(([propertyName, propertyValue]) => {
				if (propertyValue && is(propertyValue, "bpmn:Expression")) propertyValue = propertyValue.get("body");
				if (!isFeelProperty(node, propertyName, propertyValue)) return;
				const { valid } = feelAnalyzer.analyzeExpression(propertyValue.substring(1));
				if (!valid) {
					const path = getPath(node, parentNode);
					errors.push({
						message: `Property <${propertyName}> is not a valid FEEL expression`,
						path: pathConcat(path || [], propertyName),
						data: {
							type: ERROR_TYPES.FEEL_EXPRESSION_INVALID,
							node,
							parentNode,
							property: propertyName
						}
					});
				}
			});
			if (errors && errors.length) reportErrors(parentNode, reporter, errors);
		}
		return annotateRule("feel", { check });
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/feel-compatibility.js
var require_feel_compatibility = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { getPath, pathConcat } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { camundaBuiltins, camundaReservedNameBuiltins } = require_dist();
	var { FeelAnalyzer } = (init_dist$5(), __toCommonJS(dist_exports$3));
	var { isCompatible } = (init_dist$4(), __toCommonJS(dist_exports$2));
	var { reportErrors } = require_reporter();
	var { ERROR_TYPES } = require_error_types();
	var { skipInNonExecutableProcess } = require_rule();
	var { findParentNode } = require_element();
	var { isFeelProperty } = require_feel$1();
	module.exports = skipInNonExecutableProcess(function(config = {}) {
		const { version } = config;
		const unavailableByName = getUnavailableBuiltins([...camundaBuiltins, ...camundaReservedNameBuiltins], version);
		const feelAnalyzer = new FeelAnalyzer({
			parserDialect: "camunda",
			builtins: camundaBuiltins,
			reservedNameBuiltins: camundaReservedNameBuiltins
		});
		function check(node, reporter) {
			if (is(node, "bpmn:Expression")) return;
			if (!unavailableByName.size) return;
			const parentNode = findParentNode(node);
			if (!parentNode) return;
			const errors = [];
			Object.entries(node).forEach(([propertyName, propertyValue]) => {
				if (propertyValue && is(propertyValue, "bpmn:Expression")) propertyValue = propertyValue.get("body");
				if (!isFeelProperty(node, propertyName, propertyValue)) return;
				const expression = propertyValue.substring(1);
				const { valid, functions = [] } = feelAnalyzer.analyzeExpression(expression);
				if (!valid) return;
				const unsupported = functions.find(({ name, type }) => type === "builtin" && unavailableByName.has(name));
				if (unsupported) {
					const builtin = unavailableByName.get(unsupported.name);
					const path = getPath(node, parentNode);
					errors.push({
						message: `FEEL function <${builtin.name}> requires Camunda ${builtin.engines.camunda}`,
						path: pathConcat(path || [], propertyName),
						data: {
							type: ERROR_TYPES.FEEL_EXPRESSION_UNSUPPORTED_FUNCTION,
							node,
							parentNode,
							property: propertyName
						}
					});
				}
			});
			if (errors && errors.length) reportErrors(parentNode, reporter, errors);
		}
		return { check };
	});
	function getUnavailableBuiltins(builtins, version) {
		const unavailable = new Map();
		if (!version) return unavailable;
		for (const builtin of builtins) {
			if (unavailable.has(builtin.name)) continue;
			if (builtin.engines && !isCompatible(builtin.engines, { camunda: version })) unavailable.set(builtin.name, builtin);
		}
		return unavailable;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/implementation/config.js
var require_config$1 = __commonJSMin(((exports, module) => {
	module.exports = {
		calledDecision: { "bpmn:BusinessRuleTask": "1.3" },
		taskDefinition: {
			"bpmn:AdHocSubProcess": "8.8",
			"bpmn:BusinessRuleTask": "1.1",
			"bpmn:IntermediateThrowEvent": { "bpmn:MessageEventDefinition": "1.2" },
			"bpmn:EndEvent": { "bpmn:MessageEventDefinition": "1.2" },
			"bpmn:ScriptTask": "1.1",
			"bpmn:SendTask": "1.1",
			"bpmn:ServiceTask": "1.0"
		},
		script: { "bpmn:ScriptTask": "8.2" }
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/implementation/index.js
var require_implementation = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { getPath } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { isString } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var config = require_config$1();
	var elementTypeConfig = require_config$2();
	var { greaterOrEqual } = require_version();
	var { findExtensionElement, getEventDefinition, hasExtensionElement, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { ERROR_TYPES } = require_error_types();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function({ version }) {
		function check(node, reporter) {
			const element = elementTypeConfig[node.$type];
			if (!element || isString(element) && !greaterOrEqual(version, element)) return;
			const eventDefinition = isAny(node, ["bpmn:CatchEvent", "bpmn:ThrowEvent"]) && getEventDefinition(node);
			if (eventDefinition && (!element[eventDefinition.$type] || !greaterOrEqual(version, element[eventDefinition.$type]))) return;
			if (is(node, "bpmn:ThrowEvent") && !eventDefinition) return;
			const calledDecisionConfig = config.calledDecision[node.$type];
			const scriptConfig = config.script[node.$type];
			const taskDefinitionConfig = config.taskDefinition[node.$type];
			let errors;
			const calledDecision = findExtensionElement(node, "zeebe:CalledDecision"), script = findExtensionElement(node, "zeebe:Script"), taskDefinition = findExtensionElement(node, "zeebe:TaskDefinition");
			if (calledDecision && !script && !taskDefinition) {
				if (!isCalledDecisionAllowed(node, version)) {
					const allowedVersion = getAllowedVersion(calledDecisionConfig, node);
					reportErrors(node, reporter, {
						message: allowedVersion ? `Extension element of type <zeebe:CalledDecision> only allowed by Camunda ${allowedVersion} or newer` : "Extension element of type <zeebe:CalledDecision> not allowed",
						path: getPath(calledDecision, node),
						data: {
							type: ERROR_TYPES.EXTENSION_ELEMENT_NOT_ALLOWED,
							node,
							parentNode: null,
							extensionElement: calledDecision,
							allowedVersion
						}
					});
					return;
				}
				errors = hasProperties(calledDecision, {
					decisionId: { required: true },
					resultVariable: { required: true }
				}, node);
				if (errors && errors.length) {
					reportErrors(node, reporter, errors);
					return;
				}
			}
			if (!calledDecision && script && !taskDefinition) {
				if (!isScriptAllowed(node, version)) {
					const allowedVersion = getAllowedVersion(scriptConfig, node);
					reportErrors(node, reporter, {
						message: allowedVersion ? `Extension element of type <zeebe:Script> only allowed by Camunda ${allowedVersion} or newer` : "Extension element of type <zeebe:Script> not allowed",
						path: getPath(script, node),
						data: {
							type: ERROR_TYPES.EXTENSION_ELEMENT_NOT_ALLOWED,
							node,
							parentNode: null,
							extensionElement: script,
							allowedVersion
						}
					});
					return;
				}
				errors = hasProperties(script, {
					expression: { required: true },
					resultVariable: { required: true }
				}, node);
				if (errors && errors.length) {
					reportErrors(node, reporter, errors);
					return;
				}
			}
			if (!calledDecision && !script && taskDefinition) {
				if (!isTaskDefinitionAllowed(node, version)) {
					const allowedVersion = getAllowedVersion(taskDefinitionConfig, node);
					reportErrors(node, reporter, {
						message: allowedVersion ? `Extension element of type <zeebe:TaskDefinition> only allowed by Camunda ${allowedVersion} or newer` : "Extension element of type <zeebe:TaskDefinition> not allowed",
						path: getPath(taskDefinition, node),
						data: {
							type: ERROR_TYPES.EXTENSION_ELEMENT_NOT_ALLOWED,
							node,
							parentNode: null,
							extensionElement: taskDefinition,
							allowedVersion
						}
					});
					return;
				}
				errors = hasProperties(taskDefinition, { type: { required: true } }, node);
				if (errors && errors.length) {
					reportErrors(node, reporter, errors);
					return;
				}
			}
			const allowedTypes = [
				isCalledDecisionAllowed(node, version) ? "zeebe:CalledDecision" : false,
				isScriptAllowed(node, version) ? "zeebe:Script" : false,
				isTaskDefinitionAllowed(node, version) ? "zeebe:TaskDefinition" : false
			].filter((isAllowed) => isAllowed);
			if (allowedTypes.length === 0) return;
			else if (allowedTypes.length === 1 && !canHaveExtensionlessImplementation(node)) errors = hasExtensionElement(node, allowedTypes[0], node);
			else if (!canHaveExtensionlessImplementation(node)) errors = hasExtensionElement(node, allowedTypes, node);
			if (errors && errors.length) {
				reportErrors(node, reporter, errors);
				return;
			}
		}
		return { check };
	});
	function isCalledDecisionAllowed(node, version) {
		const { calledDecision } = config;
		const allowedVersion = getAllowedVersion(calledDecision[node.$type], node);
		return calledDecision[node.$type] && greaterOrEqual(version, allowedVersion);
	}
	function isScriptAllowed(node, version) {
		const { script } = config;
		const allowedVersion = getAllowedVersion(script[node.$type], node);
		return allowedVersion && greaterOrEqual(version, allowedVersion);
	}
	function isTaskDefinitionAllowed(node, version) {
		const { taskDefinition } = config;
		const allowedVersion = getAllowedVersion(taskDefinition[node.$type], node);
		return allowedVersion && greaterOrEqual(version, allowedVersion);
	}
	function getAllowedVersion(config, node) {
		if (!config) return null;
		if (isString(config)) return config;
		const eventDefinition = getEventDefinition(node);
		return eventDefinition && config[eventDefinition.$type];
	}
	function canHaveExtensionlessImplementation(node) {
		return is(node, "bpmn:AdHocSubProcess");
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/io-mapping.js
var require_io_mapping = __commonJSMin(((exports, module) => {
	var { findExtensionElement, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { greaterOrEqual } = require_version();
	var ALLOWED_VERSION_NO_INPUT_SOURCE = "8.8";
	module.exports = skipInNonExecutableProcess(function({ version }) {
		function check(node, reporter) {
			const ioMapping = findExtensionElement(node, "zeebe:IoMapping");
			if (!ioMapping) return [];
			const errors = [];
			const inputParameters = ioMapping.get("inputParameters");
			errors.push(...inputParameters.flatMap((parameter) => hasProperties(parameter, {
				source: {
					required: !greaterOrEqual(version, ALLOWED_VERSION_NO_INPUT_SOURCE),
					allowedVersion: ALLOWED_VERSION_NO_INPUT_SOURCE
				},
				target: { required: true }
			}, node)));
			const outputParameters = ioMapping.get("outputParameters");
			errors.push(...outputParameters.flatMap((parameter) => hasProperties(parameter, {
				source: { required: true },
				target: { required: true }
			}, node)));
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/link-event.js
var require_link_event = __commonJSMin(((exports, module) => {
	var { getPath, pathConcat } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { getEventDefinition, hasProperties } = require_element();
	var { ERROR_TYPES } = require_error_types();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (is(node, "bpmn:Process")) {
				const linkCatchEvents = getLinkCatchEvents(node);
				const { duplicateNames } = linkCatchEvents.reduce(({ duplicateNames, names }, linkCatchEvent, index) => {
					const name = getEventDefinition(linkCatchEvent, "bpmn:LinkEventDefinition").get("name");
					names = [...names, name];
					if (!name) return {
						duplicateNames,
						names
					};
					if (names.indexOf(name) !== index && !duplicateNames.includes(name)) duplicateNames = [...duplicateNames, name];
					return {
						duplicateNames,
						names
					};
				}, {
					duplicateNames: [],
					names: []
				});
				duplicateNames.forEach((name) => {
					linkCatchEvents.filter((linkCatchEvent) => {
						return getEventDefinition(linkCatchEvent, "bpmn:LinkEventDefinition").get("name") === name;
					}).forEach((linkCatchEvent) => {
						const linkEventDefinition = getEventDefinition(linkCatchEvent, "bpmn:LinkEventDefinition");
						const path = getPath(linkEventDefinition, linkCatchEvent);
						reportErrors(linkCatchEvent, reporter, {
							message: `Property of type <bpmn:LinkEventDefinition> has property <name> with duplicate value of <${name}>`,
							path: pathConcat(path || [], "name"),
							data: {
								type: ERROR_TYPES.ELEMENT_PROPERTY_VALUE_DUPLICATED,
								node: linkEventDefinition,
								parentNode: linkCatchEvent,
								duplicatedProperty: "name",
								duplicatedPropertyValue: name
							}
						});
					});
				});
			}
			if (isLinkEvent(node)) {
				const errors = hasProperties(getEventDefinition(node), { name: { required: true } }, node);
				if (errors.length) reportErrors(node, reporter, errors);
			}
		}
		return { check };
	});
	function isLinkEvent(element) {
		const eventDefinition = getEventDefinition(element);
		return isAny(element, ["bpmn:IntermediateCatchEvent", "bpmn:IntermediateThrowEvent"]) && eventDefinition && is(eventDefinition, "bpmn:LinkEventDefinition");
	}
	function isLinkCatchEvent(element) {
		const eventDefinition = getEventDefinition(element);
		return is(element, "bpmn:IntermediateCatchEvent") && eventDefinition && is(eventDefinition, "bpmn:LinkEventDefinition");
	}
	function getLinkCatchEvents(flowElementsContainer) {
		return flowElementsContainer.get("flowElements").reduce((linkCatchEvents, flowElement) => {
			if (isLinkCatchEvent(flowElement)) return [...linkCatchEvents, flowElement];
			else if (is(flowElement, "bpmn:SubProcess")) return [...linkCatchEvents, ...getLinkCatchEvents(flowElement)];
			return linkCatchEvents;
		}, []);
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/loop-characteristics.js
var require_loop_characteristics = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { findExtensionElement, hasProperties, hasExtensionElement } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:Activity")) return;
			let loopCharacteristics = node.get("loopCharacteristics");
			if (!loopCharacteristics) return;
			let errors = hasProperties(node, { loopCharacteristics: { type: "bpmn:MultiInstanceLoopCharacteristics" } }, node);
			if (errors && errors.length) {
				reportErrors(node, reporter, errors);
				return;
			}
			errors = hasExtensionElement(loopCharacteristics, "zeebe:LoopCharacteristics", node);
			if (errors && errors.length) {
				reportErrors(node, reporter, errors);
				return;
			}
			loopCharacteristics = findExtensionElement(loopCharacteristics, "zeebe:LoopCharacteristics");
			errors = hasProperties(loopCharacteristics, {
				inputCollection: { required: true },
				outputCollection: { dependentRequired: "outputElement" },
				outputElement: { dependentRequired: "outputCollection" }
			}, node);
			if (errors && errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/message-reference.js
var require_message_reference = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { getEventDefinition, getReferencePath, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { annotateRule } = require_helper();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!isAny(node, ["bpmn:CatchEvent", "bpmn:ReceiveTask"])) return;
			let eventDefinitionOrReceiveTask = node;
			if (!is(node, "bpmn:ReceiveTask")) {
				const eventDefinition = getEventDefinition(node);
				if (!eventDefinition || !is(eventDefinition, "bpmn:MessageEventDefinition")) return;
				eventDefinitionOrReceiveTask = eventDefinition;
			}
			let errors = hasProperties(eventDefinitionOrReceiveTask, { messageRef: { required: true } }, node);
			if (errors && errors.length) {
				reportErrors(node, reporter, errors);
				return;
			}
			const messageRef = eventDefinitionOrReceiveTask.get("messageRef");
			errors = hasProperties(messageRef, { name: { required: true } }, node, getReferencePath({
				element: node,
				referenceHolder: eventDefinitionOrReceiveTask,
				referenceProperty: "messageRef",
				referencedRoot: messageRef,
				node: messageRef
			}));
			if (errors && errors.length) reportErrors(node, reporter, errors);
		}
		return annotateRule("message-reference", { check });
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/no-expression.js
var require_no_expression = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { getPath, pathConcat } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { ERROR_TYPES, getEventDefinition } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var handlersMap = {
		"1.0": [checkErrorCode],
		"1.1": [checkErrorCode],
		"1.2": [checkErrorCode],
		"1.3": [checkErrorCode],
		"8.0": [checkErrorCode],
		"8.1": [checkErrorCode],
		"8.2": [checkErrorCatchEvent, checkEscalationCatchEvent],
		"8.3": [checkErrorCatchEvent, checkEscalationCatchEvent]
	};
	module.exports = skipInNonExecutableProcess(noExpressionRule);
	function noExpressionRule({ version }) {
		function check(node, reporter) {
			const errors = checkForVersion(node, version);
			if (errors && errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	}
	function checkForVersion(node, version) {
		const handlers = handlersMap[version];
		if (!handlers) return [];
		return handlers.reduce((errors, handler) => {
			const handlerErrors = handler(node) || [];
			return errors.concat(handlerErrors);
		}, []);
	}
	function noExpression(node, propertyName, parentNode, allowedVersion) {
		const path = getPath(node, parentNode), propertyValue = node.get(propertyName);
		if (!isExpression(propertyValue)) return;
		let message = `Expression statement <${truncate(propertyValue)}> not supported`;
		let data = {
			type: ERROR_TYPES.EXPRESSION_NOT_ALLOWED,
			node,
			parentNode: parentNode == node ? null : parentNode,
			property: propertyName
		};
		if (allowedVersion) {
			message = `Expression statement <${truncate(propertyValue)}> only supported by Camunda ${allowedVersion} or newer`;
			data = {
				...data,
				allowedVersion
			};
		}
		return {
			message,
			path: pathConcat(path || [], propertyName),
			data
		};
	}
	function isExpression(value) {
		return value && value.startsWith("=");
	}
	function checkErrorCode(node) {
		if (!is(node, "bpmn:Event")) return;
		const eventDefinition = getEventDefinition(node);
		if (!eventDefinition || !is(eventDefinition, "bpmn:ErrorEventDefinition")) return;
		const errorRef = eventDefinition.get("errorRef");
		if (!errorRef) return;
		if (is(node, "bpmn:CatchEvent")) return noExpression(errorRef, "errorCode", node, null);
		else return noExpression(errorRef, "errorCode", node, "8.2");
	}
	function checkErrorCatchEvent(node) {
		if (!is(node, "bpmn:CatchEvent")) return;
		return checkErrorCode(node);
	}
	function checkEscalationCatchEvent(node) {
		if (!is(node, "bpmn:CatchEvent")) return;
		const eventDefinition = getEventDefinition(node);
		if (!eventDefinition || !is(eventDefinition, "bpmn:EscalationEventDefinition")) return;
		const escalationRef = eventDefinition.get("escalationRef");
		if (!escalationRef) return;
		return noExpression(escalationRef, "escalationCode", node, null);
	}
	function truncate(string, maxLength = 10) {
		const stringified = `${string}`;
		return stringified.length > maxLength ? `${stringified.slice(0, maxLength)}...` : stringified;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/no-interrupting-event-subprocess.js
var require_no_interrupting_event_subprocess = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { reportErrors } = require_reporter();
	var { hasProperties } = require_element();
	module.exports = function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:StartEvent")) return;
			const parent = node.$parent;
			if (!parent || !isEventSubProcess(parent)) return;
			const grandparent = parent.$parent;
			if (!grandparent || !is(grandparent, "bpmn:AdHocSubProcess")) return;
			const errors = hasProperties(node, { isInterrupting: { value: false } }, node);
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	};
	function isEventSubProcess(node) {
		return is(node, "bpmn:SubProcess") && node.get("triggeredByEvent");
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/no-loop.js
var require_no_loop = __commonJSMin(((exports, module) => {
	var { isString } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var { is } = __toCommonJS(index_esm_exports);
	var { findExtensionElement, findParent, isAnyExactly } = require_element();
	var { reportErrors } = require_reporter();
	var { ERROR_TYPES } = require_error_types();
	var { skipInNonExecutableProcess } = require_rule();
	var { annotateRule } = require_helper();
	var LOOP_REQUIRED_ELEMENT_TYPES = [
		"bpmn:CallActivity",
		"bpmn:ManualTask",
		"bpmn:Task"
	];
	var LOOP_ELEMENT_TYPES = [
		...LOOP_REQUIRED_ELEMENT_TYPES,
		"bpmn:StartEvent",
		"bpmn:EndEvent",
		"bpmn:ManualTask",
		"bpmn:ExclusiveGateway",
		"bpmn:InclusiveGateway",
		"bpmn:ParallelGateway",
		"bpmn:SubProcess",
		"bpmn:Task"
	];
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:Process")) return;
			const errors = findLoops(simplifyGraph(getFlowElements(node).filter((flowElement) => {
				return isAnyExactly(flowElement, LOOP_ELEMENT_TYPES);
			})), node);
			if (errors) reportErrors(node, reporter, errors);
		}
		return annotateRule("no-loop", { check });
	});
	function simplifyGraph(flowElements) {
		const graph = elementsToGraph(flowElements);
		breadthFirstSearch(graph, (node) => {
			const { element, outgoing } = node;
			if (!isAnyExactly(element, LOOP_REQUIRED_ELEMENT_TYPES)) connectNodes(graph, node);
			return Array.from(outgoing.keys(), (key) => graph.get(key));
		});
		graph.forEach(({ incoming, outgoing }) => {
			incoming.forEach((_, key) => {
				if (!graph.has(key)) incoming.delete(key);
			});
			outgoing.forEach((_, key) => {
				if (!graph.has(key)) outgoing.delete(key);
			});
		});
		return graph;
	}
	function findLoops(graph, root) {
		const errors = [];
		breadthFirstSearch(graph, (node) => {
			const { element, outgoing, path = [] } = node;
			const nextElements = [];
			outgoing.forEach((connectionPath, nextElement) => {
				const newPath = [
					...path,
					element,
					...connectionPath
				];
				if (newPath.includes(nextElement)) errors.push(handleLoop(newPath, nextElement, root));
				else {
					const nextNode = graph.get(nextElement);
					nextNode.path = nextNode.path || newPath;
					nextElements.push(nextNode);
				}
			});
			return nextElements;
		});
		return errors.filter(Boolean);
	}
	var handleLoop = (path, currentNode, root) => {
		const loop = path.slice(path.indexOf(currentNode));
		if (isIgnoredLoop(loop)) return null;
		return {
			message: `Loop detected: ${loop.map(({ id }) => id).join(" -> ")} -> ${currentNode.id}`,
			path: null,
			data: {
				type: ERROR_TYPES.LOOP_NOT_ALLOWED,
				node: root,
				parentNode: null,
				elements: loop.map(({ id }) => id)
			}
		};
	};
	function getFlowElements(node) {
		return node.get("flowElements").reduce((flowElements, flowElement) => {
			if (is(flowElement, "bpmn:FlowElementsContainer")) return [
				...flowElements,
				flowElement,
				...getFlowElements(flowElement)
			];
			return [...flowElements, flowElement];
		}, []);
	}
	function getNextFlowElements(flowElement) {
		if (is(flowElement, "bpmn:CallActivity")) {
			const calledElement = findExtensionElement(flowElement, "zeebe:CalledElement");
			if (calledElement) {
				const processId = calledElement.get("processId");
				if (isString(processId) && !isFeel(processId)) {
					const process = findParent(flowElement, "bpmn:Process");
					if (process && process.get("id") === processId) return process.get("flowElements").filter((flowElement) => is(flowElement, "bpmn:StartEvent"));
				}
			}
		} else if (is(flowElement, "bpmn:SubProcess")) return flowElement.get("flowElements").filter((flowElement) => is(flowElement, "bpmn:StartEvent"));
		else if (is(flowElement, "bpmn:EndEvent")) {
			const parent = flowElement.$parent;
			if (is(parent, "bpmn:SubProcess")) flowElement = parent;
		}
		return flowElement.get("outgoing").filter((outgoing) => is(outgoing, "bpmn:SequenceFlow")).map((sequenceFlow) => sequenceFlow.get("targetRef"));
	}
	function isIgnoredLoop(elements) {
		return !elements.some((element) => isAnyExactly(element, LOOP_REQUIRED_ELEMENT_TYPES));
	}
	function isFeel(value) {
		return isString(value) && value.startsWith("=");
	}
	var getOrSet = (map, key, defaultValue) => {
		if (!map.has(key)) map.set(key, defaultValue);
		return map.get(key);
	};
	var setIfAbsent = (map, key, value) => {
		map.has(key) || map.set(key, value);
	};
	function elementsToGraph(flowElements) {
		return flowElements.reduce((currentMap, element) => {
			const currentNode = getOrSet(currentMap, element, {
				element,
				incoming: new Map(),
				outgoing: new Map()
			});
			getNextFlowElements(element).forEach((nextElement) => {
				getOrSet(currentMap, nextElement, {
					element: nextElement,
					incoming: new Map(),
					outgoing: new Map()
				}).incoming.set(element, []);
				currentNode.outgoing.set(nextElement, []);
			});
			return currentMap;
		}, new Map());
	}
	function connectNodes(graph, node) {
		const { element, incoming, outgoing } = node;
		incoming.forEach((fromPath, fromKey) => {
			outgoing.forEach((toPath, toKey) => {
				const fromNode = graph.get(fromKey);
				const toNode = graph.get(toKey);
				if (!fromNode || !toNode) return;
				setIfAbsent(fromNode.outgoing, toKey, [
					...fromPath,
					element,
					...toPath
				]);
				setIfAbsent(toNode.incoming, fromKey, [
					...fromPath,
					element,
					...toPath
				]);
			});
		});
		graph.delete(element);
	}
	function breadthFirstSearch(graph, iterationCallback) {
		const unvisited = new Set(graph.values());
		while (unvisited.size) {
			let firstElement = unvisited.values().next().value;
			unvisited.delete(firstElement);
			const elementsToVisit = [firstElement];
			while (elementsToVisit.length) iterationCallback(elementsToVisit.shift()).forEach((nextElement) => {
				if (!unvisited.has(nextElement)) return;
				unvisited.delete(nextElement);
				elementsToVisit.push(nextElement);
			});
		}
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/no-multiple-none-start-events.js
var require_no_multiple_none_start_events = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { reportErrors } = require_reporter();
	var { ERROR_TYPES } = require_element();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:Process")) return;
			const noneStartEvents = (node.get("flowElements") || []).filter((flowElement) => {
				return is(flowElement, "bpmn:StartEvent") && !flowElement.get("eventDefinitions").length;
			});
			if (noneStartEvents.length <= 1) return;
			noneStartEvents.forEach((startEvent) => {
				reportErrors(startEvent, reporter, {
					message: "Multiple elements of type <bpmn:StartEvent> with no event definition not allowed as children of <bpmn:Process>",
					path: null,
					data: {
						type: ERROR_TYPES.ELEMENT_MULTIPLE_NOT_ALLOWED,
						node: startEvent,
						parent: null
					}
				});
			});
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/priority-definition.js
var require_priority_definition = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { isDefined } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var { findExtensionElement, hasExpression } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:UserTask")) return;
			const priorityDefinition = findExtensionElement(node, "zeebe:PriorityDefinition");
			if (!priorityDefinition) return;
			const priority = priorityDefinition.get("priority");
			let errors = [];
			if (isDefined(priority)) errors = [...errors, ...hasExpression(priorityDefinition, "priority", { allowed: (value) => isValidPriority(`${value}`) }, node)];
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
	function isValidPriority(value) {
		return isExpression(value) || isIntegerStringBetween(value, 0, 100);
	}
	function isExpression(value) {
		return value.startsWith("=");
	}
	function isIntegerStringBetween(value, min, max) {
		if (/^\d+$/.test(value)) {
			const number = parseInt(value, 10);
			return number >= min && number <= max;
		}
		return false;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/secrets.js
var require_secrets = __commonJSMin(((exports, module) => {
	var { isString } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var { is } = __toCommonJS(index_esm_exports);
	var { getPath, pathConcat } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { findExtensionElement, getEventDefinition } = require_element();
	var { ERROR_TYPES } = require_error_types();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { greaterOrEqual } = require_version();
	var CAMUNDA_SECRETS_FORMAT_ALLOWED_VERSION = "8.10";
	module.exports = skipInNonExecutableProcess(function({ version }) {
		function check(node, reporter) {
			const errors = [
				validateIoMapping,
				validateProperties,
				validateSubscription
			].reduce((errors, validationFunction) => {
				return [...errors, ...validationFunction(node)];
			}, []);
			if (errors.length) reportErrors(node, reporter, errors);
		}
		function validateIoMapping(node) {
			const ioMapping = findExtensionElement(node, "zeebe:IoMapping");
			if (!ioMapping) return [];
			return ioMapping.get("inputParameters").map((inputParameter) => {
				const format = getInvalidSecretFormat(inputParameter.get("source"));
				return format && getReport("source", inputParameter, node, format);
			}).filter(Boolean);
		}
		function validateProperties(node) {
			const properties = findExtensionElement(node, "zeebe:Properties");
			if (!properties) return [];
			return properties.get("properties").map((property) => {
				const format = getInvalidSecretFormat(property.get("value"));
				return format && getReport("value", property, node, format);
			}).filter(Boolean);
		}
		function validateSubscription(node) {
			let message;
			if (is(node, "bpmn:ReceiveTask")) message = node.get("messageRef");
			else {
				const messageEventDefinition = getEventDefinition(node, "bpmn:MessageEventDefinition");
				if (!messageEventDefinition) return [];
				message = messageEventDefinition.get("messageRef");
			}
			if (!message) return [];
			const subscription = findExtensionElement(message, "zeebe:Subscription");
			if (!subscription) return [];
			const format = getInvalidSecretFormat(subscription.get("correlationKey"));
			return format ? [getReport("correlationKey", subscription, node, format)] : [];
		}
		function getInvalidSecretFormat(value) {
			if (!value || !isString(value) || !value.includes("secrets.")) return null;
			if (/camunda\.secrets\.(?:[\w-]+|`[^`]+`)/.test(value)) return null;
			const isLegacyFormat = /{{\s*secrets\.[\w-]+\s*}}/.test(value);
			if (greaterOrEqual(version, CAMUNDA_SECRETS_FORMAT_ALLOWED_VERSION)) return isLegacyFormat ? "legacy" : "deprecated";
			return isLegacyFormat ? null : "deprecated";
		}
		const meta = {};
		if (greaterOrEqual(version, CAMUNDA_SECRETS_FORMAT_ALLOWED_VERSION)) meta.documentation = { url: "https://docs.camunda.io/docs/components/connectors/use-connectors/migrate-secrets/" };
		return {
			meta,
			check
		};
	});
	function getReport(propertyName, node, parentNode, format) {
		const path = getPath(node, parentNode);
		const isLegacy = format === "legacy";
		return {
			message: `Property <${propertyName}> uses ${isLegacy ? "legacy" : "deprecated"} secret expression format`,
			path: pathConcat(path || [], propertyName),
			data: {
				type: isLegacy ? ERROR_TYPES.SECRET_EXPRESSION_FORMAT_LEGACY : ERROR_TYPES.SECRET_EXPRESSION_FORMAT_DEPRECATED,
				node,
				parentNode,
				property: propertyName,
				allowedVersion: CAMUNDA_SECRETS_FORMAT_ALLOWED_VERSION
			}
		};
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/sequence-flow-condition.js
var require_sequence_flow_condition = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { ERROR_TYPES, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (isAny(node, ["bpmn:ExclusiveGateway", "bpmn:InclusiveGateway"])) {
				const outgoing = node.get("outgoing");
				if (outgoing && outgoing.length > 1) {
					for (let sequenceFlow of outgoing) if (node.get("default") !== sequenceFlow) {
						const errors = hasProperties(sequenceFlow, { conditionExpression: { required: true } }, sequenceFlow);
						if (errors.length) reportErrors(sequenceFlow, reporter, errors);
					}
				}
			} else if (is(node, "bpmn:SequenceFlow")) {
				const source = node.get("sourceRef"), conditionExpression = node.get("conditionExpression");
				if (source && !isAny(source, ["bpmn:ExclusiveGateway", "bpmn:InclusiveGateway"]) && conditionExpression) reportErrors(node, reporter, {
					message: "Property <conditionExpression> only allowed if source is of type <bpmn:ExclusiveGateway> or <bpmn:InclusiveGateway>",
					path: ["conditionExpression"],
					data: {
						type: ERROR_TYPES.PROPERTY_NOT_ALLOWED,
						node,
						parentNode: null,
						property: "conditionExpression"
					}
				});
			}
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/signal-reference.js
var require_signal_reference = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { getEventDefinition, getReferencePath, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!isAny(node, [
				"bpmn:StartEvent",
				"bpmn:IntermediateThrowEvent",
				"bpmn:IntermediateCatchEvent",
				"bpmn:EndEvent",
				"bpmn:BoundaryEvent"
			])) return;
			const eventDefinition = getEventDefinition(node);
			if (!eventDefinition || !is(eventDefinition, "bpmn:SignalEventDefinition")) return;
			let errors = hasProperties(eventDefinition, { signalRef: { required: true } }, node);
			if (errors.length) {
				reportErrors(node, reporter, errors);
				return;
			}
			const signalRef = eventDefinition.get("signalRef");
			if (!signalRef) return;
			errors = hasProperties(signalRef, { name: { required: true } }, node, getReferencePath({
				element: node,
				referenceHolder: eventDefinition,
				referenceProperty: "signalRef",
				referencedRoot: signalRef,
				node: signalRef
			}));
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/start-event-form.js
var require_start_event_form = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { findExtensionElement, findExtensionElements, findParent, hasProperties, hasProperty } = require_element();
	var { hasNoExtensionElement } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { greaterOrEqual } = require_version();
	var ALLOWED_VERSION = "8.3";
	module.exports = skipInNonExecutableProcess(function({ version }) {
		function check(node, reporter) {
			if (!is(node, "bpmn:StartEvent")) return;
			if (!greaterOrEqual(version, ALLOWED_VERSION)) {
				let errors = hasNoExtensionElement(node, "zeebe:FormDefinition", node, ALLOWED_VERSION);
				if (errors.length) reportErrors(node, reporter, errors);
				return;
			}
			const formDefinition = findExtensionElement(node, "zeebe:FormDefinition");
			if (!formDefinition) return;
			let errors = hasProperty(formDefinition, ["formKey", "formId"], node);
			if (errors.length) {
				reportErrors(node, reporter, errors);
				return;
			}
			const userTaskForm = findUserTaskForm(node, formDefinition.get("formKey"));
			if (!userTaskForm) return;
			errors = hasProperties(userTaskForm, { body: { required: true } }, node);
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
	function findUserTaskForm(node, formKey) {
		const process = findParent(node, "bpmn:Process");
		if (!process) return;
		const userTaskForms = findExtensionElements(process, "zeebe:UserTaskForm");
		if (userTaskForms && userTaskForms.length) return userTaskForms.find((userTaskForm) => {
			return `camunda-forms:bpmn:${userTaskForm.get("id")}` === formKey;
		});
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/start-event-form-embedded.js
var require_start_event_form_embedded = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { findExtensionElement } = require_element();
	var { getPath } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { ERROR_TYPES } = require_error_types();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!node || !is(node, "bpmn:StartEvent")) return;
			const formDefinition = findExtensionElement(node, "zeebe:FormDefinition");
			if (!formDefinition) return;
			const formKey = formDefinition.get("formKey");
			if (!formKey || !formKey.startsWith("camunda-forms:bpmn:")) return;
			reportErrors(node, reporter, [{
				message: "Embedded forms on start events are deprecated; use a linked form instead",
				path: getPath(formDefinition, node),
				data: {
					type: ERROR_TYPES.PROPERTY_DEPRECATED,
					node: formDefinition,
					parentNode: node,
					property: "formKey"
				}
			}]);
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/subscription.js
var require_subscription = __commonJSMin(((exports, module) => {
	var { is, isAny } = __toCommonJS(index_esm_exports);
	var { findExtensionElement, getEventDefinition, getReferencePath, hasExtensionElement, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!isAny(node, [
				"bpmn:CatchEvent",
				"bpmn:ThrowEvent",
				"bpmn:ReceiveTask"
			]) || is(node, "bpmn:StartEvent") && !is(node.$parent, "bpmn:SubProcess")) return;
			let eventDefinitionOrReceiveTask = node;
			if (!is(node, "bpmn:ReceiveTask")) {
				const eventDefinition = getEventDefinition(node);
				if (!eventDefinition || !is(eventDefinition, "bpmn:MessageEventDefinition")) return;
				eventDefinitionOrReceiveTask = eventDefinition;
			}
			const messageRef = eventDefinitionOrReceiveTask.get("messageRef");
			if (!messageRef) return;
			let errors = hasExtensionElement(messageRef, "zeebe:Subscription", node);
			if (errors && errors.length) {
				reportErrors(node, reporter, errors);
				return;
			}
			const subscription = findExtensionElement(messageRef, "zeebe:Subscription");
			errors = hasProperties(subscription, { correlationKey: { required: true } }, node, getReferencePath({
				element: node,
				referenceHolder: eventDefinitionOrReceiveTask,
				referenceProperty: "messageRef",
				referencedRoot: messageRef,
				node: subscription
			}));
			if (errors && errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/task-listener.js
var require_task_listener = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { findExtensionElement, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:UserTask")) return;
			const taskListeners = findExtensionElement(node, "zeebe:TaskListeners");
			if (!taskListeners) return;
			const errors = taskListeners.get("listeners").flatMap((listener) => hasProperties(listener, { type: { required: true } }, node));
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/utils/iso8601.js
var require_iso8601 = __commonJSMin(((exports, module) => {
	var ISO_DATE = `(?<date>\\d{4}-(?<month>0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]))T(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](Z|([+-](0[0-9]|1[0-3]):[0-5][0-9](\\[[^\\]]+\\])?))`;
	var ISO_DATE_REGEX = new RegExp(`^${ISO_DATE}$`);
	var ISO_DURATION = "P(?!$)(\\d+(\\.\\d+)?[Yy])?(\\d+(\\.\\d+)?[Mm])?(\\d+(\\.\\d+)?[Ww])?(\\d+(\\.\\d+)?[Dd])?(T(?!$)(\\d+(\\.\\d+)?[Hh])?(\\d+(\\.\\d+)?[Mm])?(\\d+(\\.\\d+)?[Ss])?)?$";
	var ISO_DURATION_REGEX = new RegExp(`^${ISO_DURATION}$`);
	var ISO_CYCLE = `R(-1|\\d+)?/(${ISO_DATE}/)?${ISO_DURATION}`;
	var ISO_CYCLE_REGEX = new RegExp(`^${ISO_CYCLE}$`);
	module.exports = {
		validateCycle,
		validateDate,
		validateDuration
	};
	function validateCycle(value) {
		return ISO_CYCLE_REGEX.test(value);
	}
	function validateDate(value) {
		const result = ISO_DATE_REGEX.exec(value);
		if (!result) return false;
		return isDateValid(result);
	}
	function validateDuration(value) {
		return ISO_DURATION_REGEX.test(value);
	}
	function isDateValid(result) {
		const { date, month } = result.groups;
		return new Date(date).getMonth() + 1 === Number.parseInt(month, 10);
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/task-schedule.js
var require_task_schedule = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { isDefined } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var { findExtensionElement, hasExpression } = require_element();
	var { validateDate: validateISO8601Date } = require_iso8601();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:UserTask")) return;
			const taskSchedule = findExtensionElement(node, "zeebe:TaskSchedule");
			if (!taskSchedule) return;
			const dueDate = taskSchedule.get("dueDate");
			let errors = [];
			if (isDefined(dueDate)) errors = [...errors, ...hasExpression(taskSchedule, "dueDate", { allowed: (date) => isValidDate(date) }, node)];
			if (isDefined(taskSchedule.get("followUpDate"))) errors = [...errors, ...hasExpression(taskSchedule, "followUpDate", { allowed: (date) => isValidDate(date) }, node)];
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
	function isValidDate(value) {
		return isExpression(value) || validateISO8601Date(value);
	}
	function isExpression(value) {
		return value.startsWith("=");
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/timer/config.js
var require_config = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	module.exports = {
		expressionType: {
			"cron": "8.1",
			"iso8601": "1.0"
		},
		elementType: {
			"bpmn:StartEvent": {
				"timeCycle": (isInterrupting, parent) => {
					if (!isInterrupting || !isEventSubProcess(parent)) return "1.0";
					return null;
				},
				"timeDate": () => "1.0",
				"timeDuration": (_, parent) => {
					if (isEventSubProcess(parent)) return "1.0";
					return null;
				}
			},
			"bpmn:BoundaryEvent": {
				"timeCycle": (cancelActivity) => {
					if (!cancelActivity) return "1.0";
					return null;
				},
				"timeDate": () => "8.3",
				"timeDuration": () => "1.0"
			},
			"bpmn:IntermediateCatchEvent": {
				"timeCycle": () => null,
				"timeDate": () => "8.3",
				"timeDuration": () => "1.0"
			}
		}
	};
	function isEventSubProcess(element) {
		return is(element, "bpmn:SubProcess") && element.get("triggeredByEvent") === true;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/utils/cron.js
var require_cron = __commonJSMin(((exports, module) => {
	var MACRO_REGEX = new RegExp(`^(${[
		"@yearly",
		"@annually",
		"@monthly",
		"@weekly",
		"@daily",
		"@midnight",
		"@hourly"
	].join("|")})$`);
	function validateMacro(text) {
		return MACRO_REGEX.test(text);
	}
	var ASTERISK = "\\*";
	var QUESTION_MARK = "\\?";
	var COMMA = ",";
	var SECOND = "([0-5]?[0-9])";
	var MINUTE = "([0-5]?[0-9])";
	var HOUR = "([01]?[0-9]|2[0-3])";
	var DAY_OF_MONTH = or(`L(-${or("[0-2]?[0-9]", "3[0-1]")})?`, "[0-2]?[0-9]", "3[0-1]", dayOfMonthSuffix(or("L", "[0-2]?[0-9]", "3[0-1]")));
	var MONTH = or("[0]?[1-9]", "1[0-2]", ...[
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC"
	]);
	var DAY_OF_WEEK = or("[0-7]", ...[
		"MON",
		"TUE",
		"WED",
		"THU",
		"FRI",
		"SAT",
		"SUN"
	]);
	var SECOND_REGEX = or(ASTERISK, interval(ASTERISK), commaSeparated(or(interval(SECOND), optionalRange(SECOND))));
	var MINUTE_REGEX = or(ASTERISK, interval(ASTERISK), commaSeparated(or(interval(MINUTE), optionalRange(MINUTE))));
	var HOUR_REGEX = or(ASTERISK, interval(ASTERISK), commaSeparated(or(interval(HOUR), optionalRange(HOUR))));
	var DAY_OF_MONTH_REGEX = or(ASTERISK, QUESTION_MARK, commaSeparated(optionalRange(DAY_OF_MONTH)));
	var MONTH_REGEX = or(ASTERISK, commaSeparated(optionalRange(MONTH)));
	var DAY_OF_WEEK_REGEX = or(ASTERISK, QUESTION_MARK, commaSeparated(or(optionalRange(DAY_OF_WEEK), dayOfWeekSuffix(DAY_OF_WEEK))));
	var CRON_REGEX = new RegExp(`^${SECOND_REGEX} ${MINUTE_REGEX} ${HOUR_REGEX} ${DAY_OF_MONTH_REGEX} ${MONTH_REGEX} ${DAY_OF_WEEK_REGEX}$`, "i");
	function validateCron(value) {
		return CRON_REGEX.test(value);
	}
	module.exports.validateCronExpression = function(value) {
		return validateMacro(value) || validateCron(value);
	};
	function or(...patterns) {
		return `(${patterns.join("|")})`;
	}
	function optionalRange(pattern) {
		return `${pattern}(-${pattern})?`;
	}
	function commaSeparated(pattern) {
		return `${pattern}(${COMMA}${pattern})*`;
	}
	function interval(pattern) {
		return `${pattern}/\\d+`;
	}
	function dayOfMonthSuffix(pattern) {
		return `${pattern}W`;
	}
	function dayOfWeekSuffix(pattern) {
		return `${pattern}(#[1-5]|L)`;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/timer/index.js
var require_timer = __commonJSMin(((exports, module) => {
	var { isNil } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var { is } = __toCommonJS(index_esm_exports);
	var { elementType: elementTypeConfig, expressionType: expressionTypeConfig } = require_config();
	var { greaterOrEqual } = require_version();
	var { getEventDefinition, hasExpression, hasProperties, hasProperty } = require_element();
	var { validateCronExpression } = require_cron();
	var { validateCycle: validateISO8601Cycle, validateDate: validateISO8601Date, validateDuration: validateISO8601Duration } = require_iso8601();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function({ version }) {
		function check(node, reporter) {
			if (!is(node, "bpmn:Event")) return;
			const eventDefinition = getEventDefinition(node);
			if (!eventDefinition || !is(eventDefinition, "bpmn:TimerEventDefinition")) return;
			let errors = checkTimePropertyExists(eventDefinition, node, version);
			if (errors && errors.length) {
				reportErrors(node, reporter, errors);
				return;
			}
			errors = checkTimeProperty(eventDefinition, node, version);
			if (errors && errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
	function checkTimePropertyExists(eventDefinition, node, version) {
		const timePropertyName = getTimePropertyName(eventDefinition);
		if (timePropertyName) {
			const allowedVersion = getAllowedVersionForTimeProperty(node, timePropertyName), allowed = isNil(allowedVersion) ? false : greaterOrEqual(version, allowedVersion);
			return hasProperties(eventDefinition, { [timePropertyName]: {
				allowed,
				allowedVersion
			} }, node);
		}
		return hasProperty(eventDefinition, getAllowedTimePropertiesForVersion(node, version), node);
	}
	function checkTimeProperty(eventDefinition, event, version) {
		const timeCycle = eventDefinition.get("timeCycle"), timeDate = eventDefinition.get("timeDate"), timeDuration = eventDefinition.get("timeDuration");
		if (timeCycle) return hasExpression(eventDefinition, "timeCycle", { allowed: (cycle) => validateCycle(cycle, version) }, event);
		else if (timeDate) return hasExpression(eventDefinition, "timeDate", { allowed: (date) => validateDate(date, version) }, event);
		else if (timeDuration) return hasExpression(eventDefinition, "timeDuration", { allowed: (duration) => validateDuration(duration, version) }, event);
	}
	function validateCycle(cycle, version) {
		if (validateExpression(cycle)) return true;
		if (validateISO8601Cycle(cycle)) return greaterOrEqual(version, expressionTypeConfig.iso8601);
		if (validateCronExpression(cycle)) return greaterOrEqual(version, expressionTypeConfig.cron) || { allowedVersion: expressionTypeConfig.cron };
	}
	function validateDate(date, version) {
		if (validateExpression(date)) return true;
		if (validateISO8601Date(date)) return greaterOrEqual(version, expressionTypeConfig.iso8601);
	}
	function validateDuration(duration, version) {
		if (validateExpression(duration)) return true;
		if (validateISO8601Duration(duration)) return greaterOrEqual(version, expressionTypeConfig.iso8601);
	}
	function validateExpression(text) {
		if (text.startsWith("=")) return true;
	}
	function getTimePropertyName(eventDefinition) {
		if (eventDefinition.get("timeCycle")) return "timeCycle";
		if (eventDefinition.get("timeDate")) return "timeDate";
		if (eventDefinition.get("timeDuration")) return "timeDuration";
		return null;
	}
	function getAllowedTimePropertiesForVersion(element, version) {
		const config = elementTypeConfig[element.$type];
		return Object.keys(config).filter((property) => {
			const allowedVersion = config[property](isInterrupting(element), element.$parent);
			return allowedVersion && greaterOrEqual(version, allowedVersion);
		});
	}
	function getAllowedVersionForTimeProperty(element, property) {
		return elementTypeConfig[element.$type][property](isInterrupting(element), element.$parent);
	}
	function isInterrupting(element) {
		if (is(element, "bpmn:BoundaryEvent")) return element.get("cancelActivity") !== false;
		return element.get("isInterrupting") !== false;
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/unresolvable-secret-reference.js
var require_unresolvable_secret_reference = __commonJSMin(((exports, module) => {
	var { isString } = (init_dist$1(), __toCommonJS(dist_exports$1));
	var { getPath, pathConcat } = (init_moddle_utils(), __toCommonJS(moddle_utils_exports));
	var { findExtensionElement } = require_element();
	var { ERROR_TYPES } = require_error_types();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { findSecretReferenceViolations, containsSecretReferenceLiteral } = require_feel$1();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			const errors = [...checkInputSources(node), ...checkPropertyValues(node)];
			if (errors.length) reportErrors(node, reporter, errors);
		}
		function checkInputSources(node) {
			const ioMapping = findExtensionElement(node, "zeebe:IoMapping");
			if (!ioMapping) return [];
			return ioMapping.get("inputParameters").reduce((errors, inputParameter) => {
				const source = inputParameter.get("source");
				errors.push(...getStringLiteralErrors("source", source, inputParameter, node));
				if (isString(source) && source.includes("secrets.") && isFeelExpression(source)) {
					const violations = findSecretReferenceViolations(source.substring(1));
					if (violations.insideList) errors.push(getInsideListReport("source", inputParameter, node));
					if (violations.insideIfBranchContext) errors.push(getInsideIfBranchContextReport("source", inputParameter, node));
				}
				return errors;
			}, []);
		}
		function checkPropertyValues(node) {
			const properties = findExtensionElement(node, "zeebe:Properties");
			if (!properties) return [];
			return properties.get("properties").reduce((errors, property) => {
				return [...errors, ...getStringLiteralErrors("value", property.get("value"), property, node)];
			}, []);
		}
		function getStringLiteralErrors(propertyName, value, node, parentNode) {
			if (!isString(value) || !value.includes("secrets.")) return [];
			if (!isFeelExpression(value)) return containsSecretReferenceLiteral(value) ? [getStringLiteralReport(propertyName, node, parentNode)] : [];
			return findSecretReferenceViolations(value.substring(1)).stringLiteral ? [getStringLiteralReport(propertyName, node, parentNode)] : [];
		}
		function isFeelExpression(value) {
			return isString(value) && value.startsWith("=");
		}
		return {
			meta: { documentation: { url: "https://docs.camunda.io/docs/next/components/concepts/variables/#secret-references-in-input-mappings" } },
			check
		};
	});
	function getStringLiteralReport(propertyName, node, parentNode) {
		const path = getPath(node, parentNode);
		return {
			message: `Property <${propertyName}> must use a secret reference as an expression (e.g. =camunda.secrets.NAME), not as a string literal`,
			path: pathConcat(path || [], propertyName),
			data: {
				type: ERROR_TYPES.SECRET_REFERENCE_STRING_LITERAL_NOT_ALLOWED,
				node,
				parentNode,
				property: propertyName
			}
		};
	}
	function getInsideListReport(propertyName, node, parentNode) {
		const path = getPath(node, parentNode);
		return {
			message: `Property <${propertyName}> must not assign a secret reference inside a list`,
			path: pathConcat(path || [], propertyName),
			data: {
				type: ERROR_TYPES.SECRET_REFERENCE_INSIDE_LIST_NOT_ALLOWED,
				node,
				parentNode,
				property: propertyName
			}
		};
	}
	function getInsideIfBranchContextReport(propertyName, node, parentNode) {
		const path = getPath(node, parentNode);
		return {
			message: `Property <${propertyName}> must not assign a secret reference inside a context returned by an if expression branch`,
			path: pathConcat(path || [], propertyName),
			data: {
				type: ERROR_TYPES.SECRET_REFERENCE_INSIDE_IF_BRANCH_CONTEXT_NOT_ALLOWED,
				node,
				parentNode,
				property: propertyName
			}
		};
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/user-task-definition.js
var require_user_task_definition = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { hasExtensionElement } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:UserTask")) return;
			let errors = hasExtensionElement(node, "zeebe:FormDefinition", node);
			if (errors && errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/user-task-form.js
var require_user_task_form = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { findExtensionElement, findExtensionElements, findParent, hasProperties, hasProperty } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { greaterOrEqual } = require_version();
	var FORM_ID_ALLOWED_VERSIONS = {
		desktop: "8.4",
		web: "8.0"
	};
	var ZEEBE_USER_TASK_VERSION = "8.5";
	module.exports = skipInNonExecutableProcess(function({ modeler = "desktop", version }) {
		function check(node, reporter) {
			if (!is(node, "bpmn:UserTask")) return;
			const formDefinition = findExtensionElement(node, "zeebe:FormDefinition");
			if (!formDefinition) return;
			if (isZeebeUserTask(node)) {
				if (!greaterOrEqual(version, ZEEBE_USER_TASK_VERSION)) return;
				const errors = hasProperty(formDefinition, ["externalReference", "formId"], node) || [];
				if (errors.length) reportErrors(node, reporter, errors);
				return;
			}
			let errors;
			const formIdAllowedVersion = FORM_ID_ALLOWED_VERSIONS[modeler];
			if (isFormIdAllowed(version, formIdAllowedVersion)) errors = hasProperty(formDefinition, ["formKey", "formId"], node);
			else {
				errors = hasProperties(formDefinition, { formId: {
					allowed: false,
					allowedVersion: formIdAllowedVersion
				} }, node);
				if (errors.length) {
					reportErrors(node, reporter, errors);
					return;
				}
				errors = hasProperties(formDefinition, { formKey: { required: true } }, node);
			}
			if (errors.length) {
				reportErrors(node, reporter, errors);
				return;
			}
			const userTaskForm = findUserTaskForm(node, formDefinition.get("formKey"));
			if (!userTaskForm) return;
			errors = hasProperties(userTaskForm, { body: { required: true } }, node);
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
	function findUserTaskForm(node, formKey) {
		const process = findParent(node, "bpmn:Process");
		if (!process) return;
		const userTaskForms = findExtensionElements(process, "zeebe:UserTaskForm");
		if (userTaskForms && userTaskForms.length) return userTaskForms.find((userTaskForm) => {
			return `camunda-forms:bpmn:${userTaskForm.get("id")}` === formKey;
		});
	}
	function isFormIdAllowed(version, formIdAllowedVersion) {
		return greaterOrEqual(version, formIdAllowedVersion);
	}
	function isZeebeUserTask(node) {
		return !!findExtensionElement(node, "zeebe:UserTask");
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/utils/variable-name.js
var require_variable_name$1 = __commonJSMin(((exports, module) => {
	var VARIABLE_NAME_PATTERN = /^[a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*)*$/;
	module.exports.isValidVariableName = function isValidVariableName(value) {
		return VARIABLE_NAME_PATTERN.test(value);
	};
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/variable-name.js
var require_variable_name = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { findExtensionElement, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { isValidVariableName } = require_variable_name$1();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			const errors = [];
			const ioMapping = findExtensionElement(node, "zeebe:IoMapping");
			if (ioMapping) {
				const inputParameters = ioMapping.get("inputParameters") || [];
				const outputParameters = ioMapping.get("outputParameters") || [];
				inputParameters.forEach((input) => {
					errors.push(...hasProperties(input, { target: { allowed: isValidVariableName } }, node));
				});
				outputParameters.forEach((output) => {
					errors.push(...hasProperties(output, { target: { allowed: isValidVariableName } }, node));
				});
			}
			const loopCharacteristics = node.get("loopCharacteristics");
			if (loopCharacteristics && is(loopCharacteristics, "bpmn:MultiInstanceLoopCharacteristics")) {
				const zeebeLoopCharacteristics = findExtensionElement(loopCharacteristics, "zeebe:LoopCharacteristics");
				if (zeebeLoopCharacteristics) errors.push(...hasProperties(zeebeLoopCharacteristics, {
					inputElement: { allowed: isValidVariableName },
					outputCollection: { allowed: isValidVariableName }
				}, node));
			}
			if (is(node, "bpmn:ScriptTask")) {
				const script = findExtensionElement(node, "zeebe:Script");
				if (script) errors.push(...hasProperties(script, { resultVariable: { allowed: isValidVariableName } }, node));
			}
			if (is(node, "bpmn:BusinessRuleTask")) {
				const calledDecision = findExtensionElement(node, "zeebe:CalledDecision");
				if (calledDecision) errors.push(...hasProperties(calledDecision, { resultVariable: { allowed: isValidVariableName } }, node));
			}
			if (is(node, "bpmn:AdHocSubProcess")) {
				const adHoc = findExtensionElement(node, "zeebe:AdHoc");
				if (adHoc) errors.push(...hasProperties(adHoc, { outputCollection: { allowed: isValidVariableName } }, node));
			}
			if (errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/version-tag.js
var require_version_tag = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { findExtensionElement, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { greaterOrEqual } = require_version();
	var DMN_VERSION_TAG_EXPRESSION = "8.10";
	module.exports = skipInNonExecutableProcess(function(config = {}) {
		const { version } = config;
		function check(node, reporter) {
			if (is(node, "bpmn:Process")) {
				const versionTag = findExtensionElement(node, "zeebe:VersionTag");
				if (!versionTag) return;
				const errors = hasProperties(versionTag, { value: { required: true } }, node);
				if (errors && errors.length) reportErrors(node, reporter, errors);
			}
			let extensionElement;
			if (is(node, "bpmn:BusinessRuleTask")) extensionElement = findExtensionElement(node, "zeebe:CalledDecision");
			else if (is(node, "bpmn:CallActivity")) extensionElement = findExtensionElement(node, "zeebe:CalledElement");
			else if (is(node, "bpmn:UserTask")) extensionElement = findExtensionElement(node, "zeebe:FormDefinition");
			if (extensionElement && extensionElement.get("bindingType") === "versionTag") {
				const errors = hasProperties(extensionElement, { versionTag: { required: true } }, node);
				if (is(node, "bpmn:BusinessRuleTask") && !greaterOrEqual(version, DMN_VERSION_TAG_EXPRESSION)) errors.push(...hasProperties(extensionElement, { versionTag: {
					allowed: (value) => !value || !value.startsWith("="),
					allowedVersion: DMN_VERSION_TAG_EXPRESSION
				} }, node));
				if (errors && errors.length) reportErrors(node, reporter, errors);
			}
		}
		return { check };
	});
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/wait-for-completion.js
var require_wait_for_completion = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { getEventDefinition, hasProperties } = require_element();
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	module.exports = skipInNonExecutableProcess(waitForCompletion);
	function waitForCompletion() {
		function check(node, reporter) {
			if (!is(node, "bpmn:ThrowEvent")) return;
			const eventDefinition = getEventDefinition(node);
			if (!eventDefinition || !is(eventDefinition, "bpmn:CompensateEventDefinition")) return;
			const errors = hasProperties(eventDefinition, { waitForCompletion: { value: true } }, node);
			if (errors && errors.length) reportErrors(node, reporter, errors);
		}
		return { check };
	}
}));
//#endregion
//#region ../../node_modules/bpmnlint-plugin-camunda-compat/rules/camunda-cloud/zeebe-user-task.js
var require_zeebe_user_task = __commonJSMin(((exports, module) => {
	var { is } = __toCommonJS(index_esm_exports);
	var { reportErrors } = require_reporter();
	var { skipInNonExecutableProcess } = require_rule();
	var { hasExtensionElement } = require_element();
	module.exports = skipInNonExecutableProcess(function() {
		function check(node, reporter) {
			if (!is(node, "bpmn:UserTask")) return;
			const errors = hasExtensionElement(node, "zeebe:UserTask", node);
			if (errors && errors.length) reportErrors(node, reporter, errors);
		}
		return {
			meta: { documentation: { url: "https://docs.camunda.io/docs/apis-tools/migration-manuals/migrate-to-camunda-user-tasks" } },
			check
		};
	});
}));
//#endregion
//#region ../../node_modules/@miragon/bpmnlint-plugin-rules/dist/index.js
var import_static_resolver = __toESM(require_static_resolver(), 1);
var import_recommended = __toESM(require_recommended(), 1);
var import_all = __toESM(require_all(), 1);
var import_correctness = __toESM(require_correctness(), 1);
var import_ad_hoc_sub_process = __toESM(require_ad_hoc_sub_process$1(), 1);
var import_conditional_event = __toESM(require_conditional_event(), 1);
var import_conditional_flows = __toESM(require_conditional_flows(), 1);
var import_end_event_required = __toESM(require_end_event_required(), 1);
var import_event_based_gateway = __toESM(require_event_based_gateway(), 1);
var import_event_sub_process_typed_start_event = __toESM(require_event_sub_process_typed_start_event(), 1);
var import_fake_join = __toESM(require_fake_join(), 1);
var import_global = __toESM(require_global(), 1);
var import_label_required = __toESM(require_label_required(), 1);
var import_link_event = __toESM(require_link_event$1(), 1);
var import_no_bpmndi = __toESM(require_no_bpmndi(), 1);
var import_no_complex_gateway = __toESM(require_no_complex_gateway(), 1);
var import_no_disconnected = __toESM(require_no_disconnected(), 1);
var import_no_duplicate_sequence_flows = __toESM(require_no_duplicate_sequence_flows(), 1);
var import_no_gateway_join_fork = __toESM(require_no_gateway_join_fork(), 1);
var import_no_implicit_end = __toESM(require_no_implicit_end(), 1);
var import_no_implicit_split = __toESM(require_no_implicit_split(), 1);
var import_no_implicit_start = __toESM(require_no_implicit_start(), 1);
var import_no_inclusive_gateway = __toESM(require_no_inclusive_gateway(), 1);
var import_no_overlapping_elements = __toESM(require_no_overlapping_elements(), 1);
var import_single_blank_start_event = __toESM(require_single_blank_start_event(), 1);
var import_single_event_definition = __toESM(require_single_event_definition(), 1);
var import_standard_size = __toESM(require_standard_size(), 1);
var import_start_event_required = __toESM(require_start_event_required(), 1);
var import_sub_process_blank_start_event = __toESM(require_sub_process_blank_start_event(), 1);
var import_superfluous_gateway = __toESM(require_superfluous_gateway(), 1);
var import_superfluous_label = __toESM(require_superfluous_label(), 1);
var import_superfluous_termination = __toESM(require_superfluous_termination(), 1);
var import_bpmnlint_plugin_camunda_compat = __toESM(require_bpmnlint_plugin_camunda_compat(), 1);
var import_history_time_to_live = __toESM(require_history_time_to_live(), 1);
var import_ad_hoc_sub_process$1 = __toESM(require_ad_hoc_sub_process(), 1);
var import_agent_fromai_contract = __toESM(require_agent_fromai_contract(), 1);
var import_agent_tool_documentation = __toESM(require_agent_tool_documentation(), 1);
var import_agent_tool_output_key = __toESM(require_agent_tool_output_key(), 1);
var import_before_all_execution_listener = __toESM(require_before_all_execution_listener(), 1);
var import_called_element = __toESM(require_called_element(), 1);
var import_cancel_execution_listener = __toESM(require_cancel_execution_listener(), 1);
var import_connector_properties = __toESM(require_connector_properties(), 1);
var import_duplicate_execution_listener_headers = __toESM(require_duplicate_execution_listener_headers(), 1);
var import_duplicate_execution_listeners = __toESM(require_duplicate_execution_listeners(), 1);
var import_duplicate_task_headers = __toESM(require_duplicate_task_headers(), 1);
var import_element_type = __toESM(require_element_type(), 1);
var import_error_reference = __toESM(require_error_reference(), 1);
var import_escalation_boundary_event_attached_to_ref = __toESM(require_escalation_boundary_event_attached_to_ref(), 1);
var import_escalation_reference = __toESM(require_escalation_reference(), 1);
var import_event_based_gateway_target = __toESM(require_event_based_gateway_target(), 1);
var import_executable_process = __toESM(require_executable_process(), 1);
var import_execution_listener = __toESM(require_execution_listener(), 1);
var import_feel = __toESM(require_feel(), 1);
var import_feel_compatibility = __toESM(require_feel_compatibility(), 1);
var import_implementation = __toESM(require_implementation(), 1);
var import_io_mapping = __toESM(require_io_mapping(), 1);
var import_link_event$1 = __toESM(require_link_event(), 1);
var import_loop_characteristics = __toESM(require_loop_characteristics(), 1);
var import_message_reference = __toESM(require_message_reference(), 1);
var import_no_expression = __toESM(require_no_expression(), 1);
var import_no_interrupting_event_subprocess = __toESM(require_no_interrupting_event_subprocess(), 1);
var import_no_loop = __toESM(require_no_loop(), 1);
var import_no_multiple_none_start_events = __toESM(require_no_multiple_none_start_events(), 1);
var import_priority_definition = __toESM(require_priority_definition(), 1);
var import_secrets = __toESM(require_secrets(), 1);
var import_sequence_flow_condition = __toESM(require_sequence_flow_condition(), 1);
var import_signal_reference = __toESM(require_signal_reference(), 1);
var import_start_event_form = __toESM(require_start_event_form(), 1);
var import_start_event_form_embedded = __toESM(require_start_event_form_embedded(), 1);
var import_subscription = __toESM(require_subscription(), 1);
var import_task_listener = __toESM(require_task_listener(), 1);
var import_task_schedule = __toESM(require_task_schedule(), 1);
var import_timer = __toESM(require_timer(), 1);
var import_unresolvable_secret_reference = __toESM(require_unresolvable_secret_reference(), 1);
var import_user_task_definition = __toESM(require_user_task_definition(), 1);
var import_user_task_form = __toESM(require_user_task_form(), 1);
var import_variable_name = __toESM(require_variable_name(), 1);
var import_version_tag = __toESM(require_version_tag(), 1);
var import_wait_for_completion = __toESM(require_wait_for_completion(), 1);
var import_zeebe_user_task = __toESM(require_zeebe_user_task(), 1);
var _BundledResolver2;
var extendsLayer = "bpmnlint:recommended";
var commonRules = import_recommended.default;
var resolverEntries2 = {
	"config:bpmnlint/recommended": import_recommended.default,
	"config:bpmnlint/all": import_all.default,
	"config:bpmnlint/correctness": import_correctness.default,
	"rule:bpmnlint/ad-hoc-sub-process": import_ad_hoc_sub_process.default,
	"rule:bpmnlint/conditional-event": import_conditional_event.default,
	"rule:bpmnlint/conditional-flows": import_conditional_flows.default,
	"rule:bpmnlint/end-event-required": import_end_event_required.default,
	"rule:bpmnlint/event-based-gateway": import_event_based_gateway.default,
	"rule:bpmnlint/event-sub-process-typed-start-event": import_event_sub_process_typed_start_event.default,
	"rule:bpmnlint/fake-join": import_fake_join.default,
	"rule:bpmnlint/global": import_global.default,
	"rule:bpmnlint/label-required": import_label_required.default,
	"rule:bpmnlint/link-event": import_link_event.default,
	"rule:bpmnlint/no-bpmndi": import_no_bpmndi.default,
	"rule:bpmnlint/no-complex-gateway": import_no_complex_gateway.default,
	"rule:bpmnlint/no-disconnected": import_no_disconnected.default,
	"rule:bpmnlint/no-duplicate-sequence-flows": import_no_duplicate_sequence_flows.default,
	"rule:bpmnlint/no-gateway-join-fork": import_no_gateway_join_fork.default,
	"rule:bpmnlint/no-implicit-end": import_no_implicit_end.default,
	"rule:bpmnlint/no-implicit-split": import_no_implicit_split.default,
	"rule:bpmnlint/no-implicit-start": import_no_implicit_start.default,
	"rule:bpmnlint/no-inclusive-gateway": import_no_inclusive_gateway.default,
	"rule:bpmnlint/no-overlapping-elements": import_no_overlapping_elements.default,
	"rule:bpmnlint/single-blank-start-event": import_single_blank_start_event.default,
	"rule:bpmnlint/single-event-definition": import_single_event_definition.default,
	"rule:bpmnlint/standard-size": import_standard_size.default,
	"rule:bpmnlint/start-event-required": import_start_event_required.default,
	"rule:bpmnlint/sub-process-blank-start-event": import_sub_process_blank_start_event.default,
	"rule:bpmnlint/superfluous-gateway": import_superfluous_gateway.default,
	"rule:bpmnlint/superfluous-label": import_superfluous_label.default,
	"rule:bpmnlint/superfluous-termination": import_superfluous_termination.default
};
var camunda_default = {
	name: "Camunda",
	uri: "http://camunda.org/schema/1.0/bpmn",
	prefix: "camunda",
	xml: { tagAlias: "lowerCase" },
	associations: [],
	types: [
		{
			name: "Definitions",
			isAbstract: true,
			extends: ["bpmn:Definitions"],
			properties: [{
				name: "diagramRelationId",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "InOutBinding",
			superClass: ["Element"],
			isAbstract: true,
			properties: [
				{
					name: "source",
					isAttr: true,
					type: "String"
				},
				{
					name: "sourceExpression",
					isAttr: true,
					type: "String"
				},
				{
					name: "target",
					isAttr: true,
					type: "String"
				},
				{
					name: "businessKey",
					isAttr: true,
					type: "String"
				},
				{
					name: "local",
					isAttr: true,
					type: "Boolean",
					default: false
				},
				{
					name: "variables",
					isAttr: true,
					type: "String"
				}
			]
		},
		{
			name: "In",
			superClass: ["InOutBinding"],
			meta: { allowedIn: ["bpmn:CallActivity", "bpmn:SignalEventDefinition"] }
		},
		{
			name: "Out",
			superClass: ["InOutBinding"],
			meta: { allowedIn: ["bpmn:CallActivity"] }
		},
		{
			name: "AsyncCapable",
			isAbstract: true,
			extends: [
				"bpmn:Activity",
				"bpmn:Gateway",
				"bpmn:Event"
			],
			properties: [
				{
					name: "async",
					isAttr: true,
					type: "Boolean",
					default: false
				},
				{
					name: "asyncBefore",
					isAttr: true,
					type: "Boolean",
					default: false
				},
				{
					name: "asyncAfter",
					isAttr: true,
					type: "Boolean",
					default: false
				},
				{
					name: "exclusive",
					isAttr: true,
					type: "Boolean",
					default: true
				}
			]
		},
		{
			name: "JobPriorized",
			isAbstract: true,
			extends: ["bpmn:Process", "camunda:AsyncCapable"],
			properties: [{
				name: "jobPriority",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "SignalEventDefinitionExtension",
			isAbstract: true,
			extends: ["bpmn:SignalEventDefinition"],
			properties: [{
				name: "async",
				isAttr: true,
				type: "Boolean",
				default: false
			}]
		},
		{
			name: "ErrorEventDefinitionExtension",
			isAbstract: true,
			extends: ["bpmn:ErrorEventDefinition"],
			properties: [{
				name: "errorCodeVariable",
				isAttr: true,
				type: "String"
			}, {
				name: "errorMessageVariable",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "ErrorEventDefinition",
			superClass: ["bpmn:ErrorEventDefinition", "Element"],
			properties: [{
				name: "expression",
				isAttr: true,
				type: "String"
			}],
			meta: { allowedIn: ["bpmn:ServiceTask"] }
		},
		{
			name: "Error",
			isAbstract: true,
			extends: ["bpmn:Error"],
			properties: [{
				name: "camunda:errorMessage",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "PotentialStarter",
			superClass: ["Element"],
			properties: [{
				name: "resourceAssignmentExpression",
				type: "bpmn:ResourceAssignmentExpression"
			}]
		},
		{
			name: "FormSupported",
			isAbstract: true,
			extends: ["bpmn:StartEvent", "bpmn:UserTask"],
			properties: [
				{
					name: "formHandlerClass",
					isAttr: true,
					type: "String"
				},
				{
					name: "formKey",
					isAttr: true,
					type: "String"
				},
				{
					name: "formRef",
					isAttr: true,
					type: "String"
				},
				{
					name: "formRefBinding",
					isAttr: true,
					type: "String"
				},
				{
					name: "formRefVersion",
					isAttr: true,
					type: "String"
				}
			]
		},
		{
			name: "TemplateSupported",
			isAbstract: true,
			extends: [
				"bpmn:Collaboration",
				"bpmn:Process",
				"bpmn:FlowElement"
			],
			properties: [{
				name: "modelerTemplate",
				isAttr: true,
				type: "String"
			}, {
				name: "modelerTemplateVersion",
				isAttr: true,
				type: "Integer"
			}]
		},
		{
			name: "Initiator",
			isAbstract: true,
			extends: ["bpmn:StartEvent"],
			properties: [{
				name: "initiator",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "ScriptTask",
			isAbstract: true,
			extends: ["bpmn:ScriptTask"],
			properties: [{
				name: "resultVariable",
				isAttr: true,
				type: "String"
			}, {
				name: "resource",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "Process",
			isAbstract: true,
			extends: ["bpmn:Process"],
			properties: [
				{
					name: "candidateStarterGroups",
					isAttr: true,
					type: "String"
				},
				{
					name: "candidateStarterUsers",
					isAttr: true,
					type: "String"
				},
				{
					name: "versionTag",
					isAttr: true,
					type: "String"
				},
				{
					name: "historyTimeToLive",
					isAttr: true,
					type: "String"
				},
				{
					name: "isStartableInTasklist",
					isAttr: true,
					type: "Boolean",
					default: true
				}
			]
		},
		{
			name: "EscalationEventDefinitionExtension",
			isAbstract: true,
			extends: ["bpmn:EscalationEventDefinition"],
			properties: [{
				name: "escalationCodeVariable",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "FormalExpression",
			isAbstract: true,
			extends: ["bpmn:FormalExpression"],
			properties: [{
				name: "resource",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "Assignable",
			extends: ["bpmn:UserTask"],
			properties: [
				{
					name: "assignee",
					isAttr: true,
					type: "String"
				},
				{
					name: "candidateUsers",
					isAttr: true,
					type: "String"
				},
				{
					name: "candidateGroups",
					isAttr: true,
					type: "String"
				},
				{
					name: "dueDate",
					isAttr: true,
					type: "String"
				},
				{
					name: "followUpDate",
					isAttr: true,
					type: "String"
				},
				{
					name: "priority",
					isAttr: true,
					type: "String"
				}
			]
		},
		{
			name: "CallActivity",
			extends: ["bpmn:CallActivity"],
			properties: [
				{
					name: "calledElementBinding",
					isAttr: true,
					type: "String",
					default: "latest"
				},
				{
					name: "calledElementVersion",
					isAttr: true,
					type: "String"
				},
				{
					name: "calledElementVersionTag",
					isAttr: true,
					type: "String"
				},
				{
					name: "calledElementTenantId",
					isAttr: true,
					type: "String"
				},
				{
					name: "caseRef",
					isAttr: true,
					type: "String"
				},
				{
					name: "caseBinding",
					isAttr: true,
					type: "String",
					default: "latest"
				},
				{
					name: "caseVersion",
					isAttr: true,
					type: "String"
				},
				{
					name: "caseTenantId",
					isAttr: true,
					type: "String"
				},
				{
					name: "variableMappingClass",
					isAttr: true,
					type: "String"
				},
				{
					name: "variableMappingDelegateExpression",
					isAttr: true,
					type: "String"
				}
			]
		},
		{
			name: "ServiceTaskLike",
			extends: [
				"bpmn:ServiceTask",
				"bpmn:BusinessRuleTask",
				"bpmn:SendTask",
				"bpmn:MessageEventDefinition"
			],
			properties: [
				{
					name: "expression",
					isAttr: true,
					type: "String"
				},
				{
					name: "class",
					isAttr: true,
					type: "String"
				},
				{
					name: "delegateExpression",
					isAttr: true,
					type: "String"
				},
				{
					name: "resultVariable",
					isAttr: true,
					type: "String"
				}
			]
		},
		{
			name: "DmnCapable",
			extends: ["bpmn:BusinessRuleTask"],
			properties: [
				{
					name: "decisionRef",
					isAttr: true,
					type: "String"
				},
				{
					name: "decisionRefBinding",
					isAttr: true,
					type: "String",
					default: "latest"
				},
				{
					name: "decisionRefVersion",
					isAttr: true,
					type: "String"
				},
				{
					name: "mapDecisionResult",
					isAttr: true,
					type: "String",
					default: "resultList"
				},
				{
					name: "decisionRefTenantId",
					isAttr: true,
					type: "String"
				}
			]
		},
		{
			name: "ExternalCapable",
			extends: ["camunda:ServiceTaskLike"],
			properties: [{
				name: "type",
				isAttr: true,
				type: "String"
			}, {
				name: "topic",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "TaskPriorized",
			extends: ["bpmn:Process", "camunda:ExternalCapable"],
			properties: [{
				name: "taskPriority",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "Properties",
			superClass: ["Element"],
			meta: { allowedIn: ["*"] },
			properties: [{
				name: "values",
				type: "Property",
				isMany: true
			}]
		},
		{
			name: "Property",
			superClass: ["Element"],
			properties: [
				{
					name: "id",
					type: "String",
					isAttr: true
				},
				{
					name: "name",
					type: "String",
					isAttr: true
				},
				{
					name: "value",
					type: "String",
					isAttr: true
				}
			]
		},
		{
			name: "Connector",
			superClass: ["Element"],
			meta: { allowedIn: ["camunda:ServiceTaskLike"] },
			properties: [{
				name: "inputOutput",
				type: "InputOutput"
			}, {
				name: "connectorId",
				type: "String"
			}]
		},
		{
			name: "InputOutput",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:FlowNode", "camunda:Connector"] },
			properties: [
				{
					name: "inputOutput",
					type: "InputOutput"
				},
				{
					name: "connectorId",
					type: "String"
				},
				{
					name: "inputParameters",
					isMany: true,
					type: "InputParameter"
				},
				{
					name: "outputParameters",
					isMany: true,
					type: "OutputParameter"
				}
			]
		},
		{
			name: "InputOutputParameter",
			properties: [
				{
					name: "name",
					isAttr: true,
					type: "String"
				},
				{
					name: "value",
					isBody: true,
					type: "String"
				},
				{
					name: "definition",
					type: "InputOutputParameterDefinition"
				}
			]
		},
		{
			name: "InputOutputParameterDefinition",
			isAbstract: true
		},
		{
			name: "List",
			superClass: ["InputOutputParameterDefinition"],
			properties: [{
				name: "items",
				isMany: true,
				type: "InputOutputParameterDefinition"
			}]
		},
		{
			name: "Map",
			superClass: ["InputOutputParameterDefinition"],
			properties: [{
				name: "entries",
				isMany: true,
				type: "Entry"
			}]
		},
		{
			name: "Entry",
			properties: [
				{
					name: "key",
					isAttr: true,
					type: "String"
				},
				{
					name: "value",
					isBody: true,
					type: "String"
				},
				{
					name: "definition",
					type: "InputOutputParameterDefinition"
				}
			]
		},
		{
			name: "Value",
			superClass: ["InputOutputParameterDefinition"],
			properties: [
				{
					name: "id",
					isAttr: true,
					type: "String"
				},
				{
					name: "name",
					isAttr: true,
					type: "String"
				},
				{
					name: "value",
					isBody: true,
					type: "String"
				}
			]
		},
		{
			name: "Script",
			superClass: ["InputOutputParameterDefinition"],
			properties: [
				{
					name: "scriptFormat",
					isAttr: true,
					type: "String"
				},
				{
					name: "resource",
					isAttr: true,
					type: "String"
				},
				{
					name: "value",
					isBody: true,
					type: "String"
				}
			]
		},
		{
			name: "Field",
			superClass: ["Element"],
			meta: { allowedIn: [
				"camunda:ServiceTaskLike",
				"camunda:ExecutionListener",
				"camunda:TaskListener"
			] },
			properties: [
				{
					name: "name",
					isAttr: true,
					type: "String"
				},
				{
					name: "expression",
					type: "String"
				},
				{
					name: "stringValue",
					isAttr: true,
					type: "String"
				},
				{
					name: "string",
					type: "String"
				}
			]
		},
		{
			name: "InputParameter",
			superClass: ["InputOutputParameter"]
		},
		{
			name: "OutputParameter",
			superClass: ["InputOutputParameter"]
		},
		{
			name: "Collectable",
			isAbstract: true,
			extends: ["bpmn:MultiInstanceLoopCharacteristics"],
			superClass: ["camunda:AsyncCapable"],
			properties: [{
				name: "collection",
				isAttr: true,
				type: "String"
			}, {
				name: "elementVariable",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "FailedJobRetryTimeCycle",
			superClass: ["Element"],
			meta: { allowedIn: ["camunda:AsyncCapable", "bpmn:MultiInstanceLoopCharacteristics"] },
			properties: [{
				name: "body",
				isBody: true,
				type: "String"
			}]
		},
		{
			name: "ExecutionListener",
			superClass: ["Element"],
			meta: { allowedIn: [
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
			properties: [
				{
					name: "expression",
					isAttr: true,
					type: "String"
				},
				{
					name: "class",
					isAttr: true,
					type: "String"
				},
				{
					name: "delegateExpression",
					isAttr: true,
					type: "String"
				},
				{
					name: "event",
					isAttr: true,
					type: "String"
				},
				{
					name: "script",
					type: "Script"
				},
				{
					name: "fields",
					type: "Field",
					isMany: true
				}
			]
		},
		{
			name: "TaskListener",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:UserTask"] },
			properties: [
				{
					name: "expression",
					isAttr: true,
					type: "String"
				},
				{
					name: "class",
					isAttr: true,
					type: "String"
				},
				{
					name: "delegateExpression",
					isAttr: true,
					type: "String"
				},
				{
					name: "event",
					isAttr: true,
					type: "String"
				},
				{
					name: "script",
					type: "Script"
				},
				{
					name: "fields",
					type: "Field",
					isMany: true
				},
				{
					name: "id",
					type: "String",
					isAttr: true
				},
				{
					name: "eventDefinitions",
					type: "bpmn:TimerEventDefinition",
					isMany: true
				}
			]
		},
		{
			name: "FormProperty",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:StartEvent", "bpmn:UserTask"] },
			properties: [
				{
					name: "id",
					type: "String",
					isAttr: true
				},
				{
					name: "name",
					type: "String",
					isAttr: true
				},
				{
					name: "type",
					type: "String",
					isAttr: true
				},
				{
					name: "required",
					type: "String",
					isAttr: true
				},
				{
					name: "readable",
					type: "String",
					isAttr: true
				},
				{
					name: "writable",
					type: "String",
					isAttr: true
				},
				{
					name: "variable",
					type: "String",
					isAttr: true
				},
				{
					name: "expression",
					type: "String",
					isAttr: true
				},
				{
					name: "datePattern",
					type: "String",
					isAttr: true
				},
				{
					name: "default",
					type: "String",
					isAttr: true
				},
				{
					name: "values",
					type: "Value",
					isMany: true
				}
			]
		},
		{
			name: "FormData",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:StartEvent", "bpmn:UserTask"] },
			properties: [{
				name: "fields",
				type: "FormField",
				isMany: true
			}, {
				name: "businessKey",
				type: "String",
				isAttr: true
			}]
		},
		{
			name: "FormField",
			superClass: ["Element"],
			properties: [
				{
					name: "id",
					type: "String",
					isAttr: true
				},
				{
					name: "label",
					type: "String",
					isAttr: true
				},
				{
					name: "type",
					type: "String",
					isAttr: true
				},
				{
					name: "datePattern",
					type: "String",
					isAttr: true
				},
				{
					name: "defaultValue",
					type: "String",
					isAttr: true
				},
				{
					name: "properties",
					type: "Properties"
				},
				{
					name: "validation",
					type: "Validation"
				},
				{
					name: "values",
					type: "Value",
					isMany: true
				}
			]
		},
		{
			name: "Validation",
			superClass: ["Element"],
			properties: [{
				name: "constraints",
				type: "Constraint",
				isMany: true
			}]
		},
		{
			name: "Constraint",
			superClass: ["Element"],
			properties: [{
				name: "name",
				type: "String",
				isAttr: true
			}, {
				name: "config",
				type: "String",
				isAttr: true
			}]
		},
		{
			name: "ConditionalEventDefinitionExtension",
			isAbstract: true,
			extends: ["bpmn:ConditionalEventDefinition"],
			properties: [{
				name: "variableName",
				isAttr: true,
				type: "String"
			}, {
				name: "variableEvents",
				isAttr: true,
				type: "String"
			}]
		}
	],
	emumerations: []
};
var PLUGIN = "bpmnlint-plugin-camunda-compat";
var CONFIG = "camunda-platform-7-24";
var extendsLayer2 = `plugin:camunda-compat/${CONFIG}`;
var moddleExtension = {
	prefix: "camunda",
	descriptor: camunda_default
};
var camunda7Rules = import_bpmnlint_plugin_camunda_compat.default.configs[CONFIG];
var resolverEntries3 = {
	[`config:${PLUGIN}/${CONFIG}`]: import_bpmnlint_plugin_camunda_compat.default.configs[CONFIG],
	[`rule:${PLUGIN}/history-time-to-live`]: import_history_time_to_live.default
};
var zeebe_default = {
	name: "zeebe",
	prefix: "zeebe",
	uri: "http://camunda.org/schema/zeebe/1.0",
	xml: { tagAlias: "lowerCase" },
	associations: [],
	types: [
		{
			name: "ZeebeServiceTask",
			extends: [
				"bpmn:ServiceTask",
				"bpmn:BusinessRuleTask",
				"bpmn:ScriptTask",
				"bpmn:SendTask",
				"bpmn:EndEvent",
				"bpmn:IntermediateThrowEvent",
				"bpmn:AdHocSubProcess"
			],
			properties: [{
				name: "retryCounter",
				type: "String",
				isAttr: true
			}]
		},
		{
			name: "IoMapping",
			superClass: ["Element"],
			properties: [
				{
					name: "ioMapping",
					type: "IoMapping"
				},
				{
					name: "inputParameters",
					isMany: true,
					type: "Input"
				},
				{
					name: "outputParameters",
					isMany: true,
					type: "Output"
				}
			],
			meta: { allowedIn: [
				"bpmn:CallActivity",
				"bpmn:Event",
				"bpmn:ReceiveTask",
				"zeebe:ZeebeServiceTask",
				"bpmn:SubProcess",
				"bpmn:UserTask"
			] }
		},
		{
			name: "InputOutputParameter",
			properties: [{
				name: "source",
				isAttr: true,
				type: "String"
			}, {
				name: "target",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "Subscription",
			superClass: ["Element"],
			properties: [{
				name: "correlationKey",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "Input",
			superClass: ["InputOutputParameter"],
			meta: { allowedIn: [
				"bpmn:CallActivity",
				"zeebe:ZeebeServiceTask",
				"bpmn:SubProcess",
				"bpmn:UserTask"
			] }
		},
		{
			name: "Output",
			superClass: ["InputOutputParameter"],
			meta: { allowedIn: [
				"bpmn:CallActivity",
				"bpmn:Event",
				"bpmn:ReceiveTask",
				"zeebe:ZeebeServiceTask",
				"bpmn:SubProcess",
				"bpmn:UserTask"
			] }
		},
		{
			name: "TaskHeaders",
			superClass: ["Element"],
			meta: { allowedIn: [
				"bpmn:UserTask",
				"zeebe:ExecutionListener",
				"zeebe:ZeebeServiceTask"
			] },
			properties: [{
				name: "values",
				type: "Header",
				isMany: true
			}]
		},
		{
			name: "Header",
			superClass: ["Element"],
			properties: [
				{
					name: "id",
					type: "String",
					isAttr: true
				},
				{
					name: "key",
					type: "String",
					isAttr: true
				},
				{
					name: "value",
					type: "String",
					isAttr: true
				}
			]
		},
		{
			name: "TaskDefinition",
			superClass: ["Element"],
			meta: { allowedIn: ["zeebe:ZeebeServiceTask"] },
			properties: [{
				name: "type",
				type: "String",
				isAttr: true
			}, {
				name: "retries",
				type: "String",
				isAttr: true
			}]
		},
		{
			name: "LoopCharacteristics",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:MultiInstanceLoopCharacteristics"] },
			properties: [
				{
					name: "inputCollection",
					type: "String",
					isAttr: true
				},
				{
					name: "inputElement",
					type: "String",
					isAttr: true
				},
				{
					name: "outputCollection",
					type: "String",
					isAttr: true
				},
				{
					name: "outputElement",
					type: "String",
					isAttr: true
				}
			]
		},
		{
			name: "CalledElement",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:CallActivity"] },
			properties: [
				{
					name: "processId",
					type: "String",
					isAttr: true
				},
				{
					name: "processIdExpression",
					type: "String",
					isAttr: true
				},
				{
					name: "propagateAllChildVariables",
					isAttr: true,
					type: "Boolean"
				},
				{
					name: "propagateAllParentVariables",
					isAttr: true,
					type: "Boolean",
					default: true
				},
				{
					name: "businessId",
					isAttr: true,
					type: "String"
				}
			]
		},
		{
			name: "UserTaskForm",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:Process"] },
			properties: [{
				name: "id",
				type: "String",
				isAttr: true
			}, {
				name: "body",
				type: "String",
				isBody: true
			}]
		},
		{
			name: "FormDefinition",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:UserTask", "bpmn:StartEvent"] },
			properties: [
				{
					name: "formKey",
					type: "String",
					isAttr: true
				},
				{
					name: "formId",
					type: "String",
					isAttr: true
				},
				{
					name: "externalReference",
					type: "String",
					isAttr: true
				}
			]
		},
		{
			name: "LinkedResource",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:ServiceTask"] },
			properties: [
				{
					name: "resourceId",
					type: "String",
					isAttr: true
				},
				{
					name: "resourceType",
					type: "String",
					isAttr: true
				},
				{
					name: "linkName",
					type: "String",
					isAttr: true
				}
			]
		},
		{
			name: "LinkedResources",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:ServiceTask"] },
			properties: [{
				name: "values",
				type: "LinkedResource",
				isMany: true
			}]
		},
		{
			name: "UserTask",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:UserTask"] },
			properties: []
		},
		{
			name: "CalledDecision",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:BusinessRuleTask"] },
			properties: [{
				name: "decisionId",
				type: "String",
				isAttr: true
			}, {
				name: "resultVariable",
				type: "String",
				isAttr: true
			}]
		},
		{
			name: "AssignmentDefinition",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:UserTask"] },
			properties: [
				{
					name: "assignee",
					type: "String",
					isAttr: true
				},
				{
					name: "candidateGroups",
					type: "String",
					isAttr: true
				},
				{
					name: "candidateUsers",
					type: "String",
					isAttr: true
				}
			]
		},
		{
			name: "PriorityDefinition",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:UserTask"] },
			properties: [{
				name: "priority",
				type: "String",
				isAttr: true
			}]
		},
		{
			name: "JobPriorityDefinition",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:Process", "zeebe:ZeebeServiceTask"] },
			properties: [{
				name: "priority",
				type: "String",
				isAttr: true
			}]
		},
		{
			name: "TaskSchedule",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:UserTask"] },
			properties: [{
				name: "dueDate",
				type: "String",
				isAttr: true
			}, {
				name: "followUpDate",
				type: "String",
				isAttr: true
			}]
		},
		{
			name: "Properties",
			superClass: ["Element"],
			properties: [{
				name: "properties",
				type: "Property",
				isMany: true
			}]
		},
		{
			name: "Property",
			properties: [{
				name: "name",
				type: "String",
				isAttr: true
			}, {
				name: "value",
				type: "String",
				isAttr: true
			}]
		},
		{
			name: "TemplateSupported",
			isAbstract: true,
			extends: [
				"bpmn:Collaboration",
				"bpmn:Process",
				"bpmn:FlowElement"
			],
			properties: [
				{
					name: "modelerTemplate",
					isAttr: true,
					type: "String"
				},
				{
					name: "modelerTemplateVersion",
					isAttr: true,
					type: "Integer"
				},
				{
					name: "modelerTemplateIcon",
					isAttr: true,
					type: "String"
				}
			]
		},
		{
			name: "ConfigurationSupported",
			isAbstract: true,
			extends: ["zeebe:Input", "zeebe:Property"],
			properties: [{
				name: "modelerConfigurationTemplate",
				isAttr: true,
				type: "String"
			}, {
				name: "modelerConfigurationName",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "TemplatedRootElement",
			isAbstract: true,
			extends: [
				"bpmn:Error",
				"bpmn:Escalation",
				"bpmn:Message",
				"bpmn:Signal"
			],
			properties: [{
				name: "modelerTemplate",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "Script",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:ScriptTask"] },
			properties: [{
				name: "expression",
				type: "String",
				isAttr: true
			}, {
				name: "resultVariable",
				type: "String",
				isAttr: true
			}]
		},
		{
			name: "ExecutionListeners",
			superClass: ["Element"],
			meta: { allowedIn: [
				"bpmn:Event",
				"bpmn:Activity",
				"bpmn:Process",
				"bpmn:ExclusiveGateway",
				"bpmn:InclusiveGateway",
				"bpmn:ParallelGateway",
				"bpmn:EventBasedGateway"
			] },
			properties: [{
				name: "listeners",
				type: "ExecutionListener",
				isMany: true
			}]
		},
		{
			name: "ExecutionListener",
			superClass: ["Element"],
			meta: { allowedIn: ["zeebe:ExecutionListeners"] },
			properties: [
				{
					name: "eventType",
					type: "String",
					isAttr: true
				},
				{
					name: "retries",
					type: "String",
					isAttr: true
				},
				{
					name: "type",
					type: "String",
					isAttr: true
				},
				{
					name: "headers",
					type: "TaskHeaders"
				}
			]
		},
		{
			name: "TaskListeners",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:UserTask"] },
			properties: [{
				name: "listeners",
				type: "TaskListener",
				isMany: true
			}]
		},
		{
			name: "TaskListener",
			superClass: ["Element"],
			meta: { allowedIn: ["zeebe:TaskListeners"] },
			properties: [
				{
					name: "eventType",
					type: "String",
					isAttr: true
				},
				{
					name: "retries",
					type: "String",
					isAttr: true
				},
				{
					name: "type",
					type: "String",
					isAttr: true
				}
			]
		},
		{
			name: "VersionTag",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:Process"] },
			properties: [{
				name: "value",
				type: "String",
				isAttr: true
			}]
		},
		{
			name: "BindingTypeSupported",
			isAbstract: true,
			extends: [
				"zeebe:CalledDecision",
				"zeebe:CalledElement",
				"zeebe:FormDefinition",
				"zeebe:LinkedResource"
			],
			properties: [{
				name: "bindingType",
				isAttr: true,
				type: "String",
				default: "latest"
			}, {
				name: "versionTag",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "AdHoc",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:AdHocSubProcess"] },
			properties: [
				{
					name: "activeElementsCollection",
					isAttr: true,
					type: "String"
				},
				{
					name: "outputCollection",
					isAttr: true,
					type: "String"
				},
				{
					name: "outputElement",
					isAttr: true,
					type: "String"
				}
			]
		},
		{
			name: "ConditionalFilter",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:ConditionalEventDefinition"] },
			properties: [{
				name: "variableNames",
				isAttr: true,
				type: "String"
			}, {
				name: "variableEvents",
				isAttr: true,
				type: "String"
			}]
		},
		{
			name: "AgentDefinition",
			superClass: ["Element"],
			meta: { allowedIn: ["bpmn:ServiceTask", "bpmn:AdHocSubProcess"] },
			properties: [{
				name: "agentType",
				type: "String",
				isAttr: true
			}]
		}
	]
};
var PLUGIN2 = "bpmnlint-plugin-camunda-compat";
var CONFIG2 = "camunda-cloud-8-10";
var extendsLayer3 = `plugin:camunda-compat/${CONFIG2}`;
var moddleExtension2 = {
	prefix: "zeebe",
	descriptor: zeebe_default
};
var camunda8Rules = import_bpmnlint_plugin_camunda_compat.default.configs[CONFIG2];
var resolverEntries4 = {
	[`config:${PLUGIN2}/${CONFIG2}`]: import_bpmnlint_plugin_camunda_compat.default.configs[CONFIG2],
	[`rule:${PLUGIN2}/ad-hoc-sub-process`]: import_ad_hoc_sub_process$1.default,
	[`rule:${PLUGIN2}/agent-fromai-contract`]: import_agent_fromai_contract.default,
	[`rule:${PLUGIN2}/agent-tool-documentation`]: import_agent_tool_documentation.default,
	[`rule:${PLUGIN2}/agent-tool-output-key`]: import_agent_tool_output_key.default,
	[`rule:${PLUGIN2}/before-all-execution-listener`]: import_before_all_execution_listener.default,
	[`rule:${PLUGIN2}/called-element`]: import_called_element.default,
	[`rule:${PLUGIN2}/cancel-execution-listener`]: import_cancel_execution_listener.default,
	[`rule:${PLUGIN2}/connector-properties`]: import_connector_properties.default,
	[`rule:${PLUGIN2}/duplicate-execution-listener-headers`]: import_duplicate_execution_listener_headers.default,
	[`rule:${PLUGIN2}/duplicate-execution-listeners`]: import_duplicate_execution_listeners.default,
	[`rule:${PLUGIN2}/duplicate-task-headers`]: import_duplicate_task_headers.default,
	[`rule:${PLUGIN2}/element-type`]: import_element_type.default,
	[`rule:${PLUGIN2}/error-reference`]: import_error_reference.default,
	[`rule:${PLUGIN2}/escalation-boundary-event-attached-to-ref`]: import_escalation_boundary_event_attached_to_ref.default,
	[`rule:${PLUGIN2}/escalation-reference`]: import_escalation_reference.default,
	[`rule:${PLUGIN2}/event-based-gateway-target`]: import_event_based_gateway_target.default,
	[`rule:${PLUGIN2}/executable-process`]: import_executable_process.default,
	[`rule:${PLUGIN2}/execution-listener`]: import_execution_listener.default,
	[`rule:${PLUGIN2}/feel`]: import_feel.default,
	[`rule:${PLUGIN2}/feel-compatibility`]: import_feel_compatibility.default,
	[`rule:${PLUGIN2}/implementation`]: import_implementation.default,
	[`rule:${PLUGIN2}/io-mapping`]: import_io_mapping.default,
	[`rule:${PLUGIN2}/link-event`]: import_link_event$1.default,
	[`rule:${PLUGIN2}/loop-characteristics`]: import_loop_characteristics.default,
	[`rule:${PLUGIN2}/message-reference`]: import_message_reference.default,
	[`rule:${PLUGIN2}/no-expression`]: import_no_expression.default,
	[`rule:${PLUGIN2}/no-interrupting-event-subprocess`]: import_no_interrupting_event_subprocess.default,
	[`rule:${PLUGIN2}/no-loop`]: import_no_loop.default,
	[`rule:${PLUGIN2}/no-multiple-none-start-events`]: import_no_multiple_none_start_events.default,
	[`rule:${PLUGIN2}/priority-definition`]: import_priority_definition.default,
	[`rule:${PLUGIN2}/secrets`]: import_secrets.default,
	[`rule:${PLUGIN2}/sequence-flow-condition`]: import_sequence_flow_condition.default,
	[`rule:${PLUGIN2}/signal-reference`]: import_signal_reference.default,
	[`rule:${PLUGIN2}/start-event-form`]: import_start_event_form.default,
	[`rule:${PLUGIN2}/start-event-form-embedded`]: import_start_event_form_embedded.default,
	[`rule:${PLUGIN2}/subscription`]: import_subscription.default,
	[`rule:${PLUGIN2}/task-listener`]: import_task_listener.default,
	[`rule:${PLUGIN2}/task-schedule`]: import_task_schedule.default,
	[`rule:${PLUGIN2}/timer`]: import_timer.default,
	[`rule:${PLUGIN2}/unresolvable-secret-reference`]: import_unresolvable_secret_reference.default,
	[`rule:${PLUGIN2}/user-task-definition`]: import_user_task_definition.default,
	[`rule:${PLUGIN2}/user-task-form`]: import_user_task_form.default,
	[`rule:${PLUGIN2}/variable-name`]: import_variable_name.default,
	[`rule:${PLUGIN2}/version-tag`]: import_version_tag.default,
	[`rule:${PLUGIN2}/wait-for-completion`]: import_wait_for_completion.default,
	[`rule:${PLUGIN2}/zeebe-user-task`]: import_zeebe_user_task.default
};
var BundledResolver = (_BundledResolver2 = class _BundledResolver {
	static create() {
		return new import_static_resolver.default(_BundledResolver.entries);
	}
}, _defineProperty(_BundledResolver2, "entries", {
	...resolverEntries2,
	...resolverEntries3,
	...resolverEntries4,
	...resolverEntries
}), _BundledResolver2);
var MIRAGON_LAYER = {
	modeling: `plugin:${MIRAGON_NAME}/recommended-for-modeling`,
	automation: `plugin:${MIRAGON_NAME}/recommended-for-automation`
};
var ENGINE_LAYER = {
	c7: {
		extendsLayer: extendsLayer2,
		moddleExtension,
		rules: camunda7Rules
	},
	c8: {
		extendsLayer: extendsLayer3,
		moddleExtension: moddleExtension2,
		rules: camunda8Rules
	}
};
var EngineConfig = class {
	static defaultLintConfig(options = {}) {
		const { engine } = options;
		const base = [extendsLayer, MIRAGON_LAYER[options.preset ?? (engine ? "automation" : "modeling")]];
		if (!engine) return { extends: base };
		const { extendsLayer: extendsLayer4, moddleExtension: moddleExtension3 } = ENGINE_LAYER[engine];
		return {
			extends: [...base, extendsLayer4],
			moddleExtensions: { [moddleExtension3.prefix]: moddleExtension3.descriptor }
		};
	}
	static rulesForEngine(engine) {
		return engine ? ENGINE_LAYER[engine].rules : commonRules;
	}
};
`${MIRAGON_NAME}`;
`${MIRAGON_NAME}`;
`${MIRAGON_NAME}`;
Object.fromEntries(Object.keys(miragonRuleFactories).map((name) => [name, `./rules/miragon/${name}.cjs`]));
var createBundledResolver = BundledResolver.create;
BundledResolver.entries;
var getDefaultLintConfig = EngineConfig.defaultLintConfig;
EngineConfig.rulesForEngine;
//#endregion
//#region ../../packages/bpmn-modeler/src/bpmnlint/browserResolver.ts
var NOOP_RULE = () => ({ check: () => void 0 });
var NOOP_CONFIG = { rules: {} };
var RecordingBrowserResolver = class {
	constructor() {
		_defineProperty(this, "unresolved", []);
		_defineProperty(this, "bundled", createBundledResolver());
	}
	resolveRule(pkg, ruleName) {
		const resolved = this.tryResolve(() => this.bundled.resolveRule(pkg, ruleName));
		if (resolved != null) return resolved;
		this.unresolved.push(`${pkg}/${ruleName}`);
		return NOOP_RULE;
	}
	resolveConfig(pkg, configName) {
		const resolved = this.tryResolve(() => this.bundled.resolveConfig(pkg, configName));
		if (resolved != null) return resolved;
		this.unresolved.push(`plugin:${pkg}/${configName}`);
		return NOOP_CONFIG;
	}
	reset() {
		this.unresolved.length = 0;
	}
	tryResolve(resolve) {
		try {
			const resolved = resolve();
			return resolved != null ? resolved : void 0;
		} catch {
			return;
		}
	}
};
//#endregion
//#region ../../packages/bpmn-modeler/src/bpmnlint/browserLinter.ts
var BrowserLinter = class {
	constructor(config) {
		_defineProperty(this, "config", void 0);
		_defineProperty(this, "resolver", new RecordingBrowserResolver());
		_defineProperty(this, "staticUnresolved", void 0);
		this.config = config;
		this.staticUnresolved = staticUnresolvedModdleExtensions(this.config);
	}
	async run(definitions) {
		this.resolver.reset();
		return {
			results: await new import_lib.Linter({
				config: this.config,
				resolver: this.resolver
			}).lint(definitions),
			unresolved: [...this.resolver.unresolved, ...this.staticUnresolved]
		};
	}
};
//#endregion
//#region ../../packages/bpmn-modeler/src/bpmnlint/lintConfigResolution.ts
function isLintConfigByMode(config) {
	return "design" in config || "implement" in config;
}
function resolveLintConfig(mode, engine, config) {
	if (config !== void 0 && !isLintConfigByMode(config)) return config;
	const perMode = config?.[mode];
	if (perMode !== void 0) return perMode;
	return getDefaultLintConfig({
		engine: surfaceModeSupports(mode, "engineLintRules") ? engine : void 0,
		preset: "modeling"
	});
}
//#endregion
//#region ../../packages/bpmn-modeler/src/bpmnlint/lintTierMachine.ts
var ACTIVATE_IN_PAGE = { kind: "activateInPage" };
var RENDER_DISABLED = { kind: "renderDisabled" };
function startLintTier(init, diagramLoaded) {
	const state = {
		tier: init.tier === "in-page" ? "in-page" : "external",
		mode: init.mode,
		engine: init.engine,
		explicitConfig: init.config
	};
	return {
		state,
		effects: state.tier === "in-page" ? lintInPage(state, diagramLoaded) : []
	};
}
function lintsInPage(state) {
	return state.tier === "in-page";
}
function reduceLintTier(state, event, diagramLoaded) {
	switch (event.type) {
		case "diagramImported": return {
			state,
			effects: state.tier === "in-page" ? [ACTIVATE_IN_PAGE] : []
		};
		case "inPageLintingRequested": return requestInPageLinting(state, event.config, event.configToken, diagramLoaded);
		case "modeChanged": return changeMode(state, event.mode, diagramLoaded);
		case "hostResultsPushed": return {
			state: {
				...state,
				tier: "external"
			},
			effects: [{
				kind: "renderResults",
				results: event.results
			}]
		};
		case "hostDisabledLinting": return {
			state: {
				...state,
				tier: "external"
			},
			effects: [RENDER_DISABLED]
		};
		case "userTurnedLintingOff": return state.tier === "in-page" ? {
			state: {
				...state,
				tier: "in-page-disabled"
			},
			effects: [RENDER_DISABLED]
		} : {
			state,
			effects: []
		};
		case "userTurnedLintingOn": return state.tier === "in-page-disabled" ? turnOnInPage(state) : {
			state,
			effects: []
		};
	}
}
function requestInPageLinting(state, config, configToken, diagramLoaded) {
	if (state.tier === "in-page-disabled") return {
		state: {
			...state,
			hostConfig: config,
			configToken
		},
		effects: []
	};
	if (state.tier === "in-page" && repeatsLiveConfig(state, config, configToken)) return {
		state,
		effects: []
	};
	const next = {
		...state,
		tier: "in-page",
		hostConfig: config,
		configToken
	};
	return {
		state: next,
		effects: lintInPage(next, diagramLoaded)
	};
}
function repeatsLiveConfig(state, config, configToken) {
	if (configToken !== void 0) return configToken === state.configToken;
	return config === void 0 && state.hostConfig === void 0;
}
function changeMode(state, mode, diagramLoaded) {
	if (mode === state.mode) return {
		state,
		effects: []
	};
	const next = {
		...state,
		mode
	};
	return {
		state: next,
		effects: next.tier === "in-page" && next.hostConfig === void 0 ? lintInPage(next, diagramLoaded) : []
	};
}
function turnOnInPage(state) {
	const next = {
		...state,
		tier: "in-page"
	};
	return {
		state: next,
		effects: [buildLinter(next), ACTIVATE_IN_PAGE]
	};
}
function lintInPage(state, diagramLoaded) {
	return diagramLoaded ? [buildLinter(state), ACTIVATE_IN_PAGE] : [buildLinter(state)];
}
function buildLinter(state) {
	return {
		kind: "buildLinter",
		config: state.hostConfig ?? resolveLintConfig(state.mode, state.engine, state.explicitConfig)
	};
}
//#endregion
//#region ../../packages/bpmn-modeler/src/bpmnlint/LintConfigService.ts
var OFF_ICON = `<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><line x1="4" y1="4" x2="12" y2="12"/></svg>`;
var LintConfigService = class {
	constructor(linting, tierInit, callbacks, translate, canvas, bpmnjs, eventBus) {
		_defineProperty(this, "linting", void 0);
		_defineProperty(this, "callbacks", void 0);
		_defineProperty(this, "translate", void 0);
		_defineProperty(this, "canvas", void 0);
		_defineProperty(this, "bpmnjs", void 0);
		_defineProperty(this, "state", void 0);
		_defineProperty(this, "browserLinter", void 0);
		_defineProperty(this, "results", {});
		_defineProperty(this, "toolbar", void 0);
		_defineProperty(this, "offButton", void 0);
		_defineProperty(this, "disabledChip", void 0);
		this.linting = linting;
		this.callbacks = callbacks;
		this.translate = translate;
		this.canvas = canvas;
		this.bpmnjs = bpmnjs;
		const start = startLintTier(tierInit, this.isDiagramLoaded());
		this.state = start.state;
		this.linting.lint = () => this.runLint();
		eventBus.on("import.done", () => {
			this.dispatch({ type: "diagramImported" });
		});
		this.runEffects(start.effects);
	}
	startInPageLinting(config, configToken) {
		this.dispatch({
			type: "inPageLintingRequested",
			config,
			configToken
		});
	}
	setMode(mode) {
		this.dispatch({
			type: "modeChanged",
			mode
		});
	}
	applyLintResults(results) {
		this.dispatch({
			type: "hostResultsPushed",
			results
		});
	}
	applyLintingDisabled() {
		this.dispatch({ type: "hostDisabledLinting" });
	}
	dispatch(event) {
		const transition = reduceLintTier(this.state, event, this.isDiagramLoaded());
		this.state = transition.state;
		this.runEffects(transition.effects);
	}
	runEffects(effects) {
		for (const effect of effects) switch (effect.kind) {
			case "buildLinter":
				this.browserLinter = new BrowserLinter(effect.config);
				break;
			case "activateInPage":
				this.activateInPage();
				break;
			case "renderResults":
				this.render(effect.results);
				break;
			case "renderDisabled": this.renderDisabled();
		}
	}
	isDiagramLoaded() {
		return Boolean(this.bpmnjs.getDefinitions());
	}
	async runLint() {
		if (lintsInPage(this.state) && this.browserLinter) {
			const event = await this.browserLinter.run(this.bpmnjs.getDefinitions());
			this.callbacks.onLintResults?.(event);
			return event.results;
		}
		return this.results;
	}
	activateInPage() {
		this.hideDisabledChip();
		this.canvas.getContainer().classList.add("bpmnlint-active");
		if (this.linting.isActive()) this.linting.update();
		else this.linting.toggle(true);
		this.showOffButton();
	}
	render(results) {
		this.hideDisabledChip();
		if (!results) {
			this.results = {};
			if (this.linting.isActive()) this.linting.toggle(false);
			this.canvas.getContainer().classList.remove("bpmnlint-active");
			this.hideOffButton();
			return;
		}
		this.results = results;
		this.canvas.getContainer().classList.add("bpmnlint-active");
		if (this.linting.isActive()) this.linting.update();
		else this.linting.toggle(true);
		this.showOffButton();
	}
	renderDisabled() {
		this.results = {};
		if (this.linting.isActive()) this.linting.toggle(false);
		this.canvas.getContainer().classList.remove("bpmnlint-active");
		this.hideOffButton();
		this.showDisabledChip();
	}
	handleOffClick() {
		this.callbacks.onLintingToggled?.(false);
		this.dispatch({ type: "userTurnedLintingOff" });
	}
	handleEnableClick() {
		this.callbacks.onLintingToggled?.(true);
		this.dispatch({ type: "userTurnedLintingOn" });
	}
	pill() {
		return this.canvas.getContainer().querySelector(".bjsl-button");
	}
	ensureToolbar() {
		const pill = this.pill();
		if (!pill || !pill.parentElement) return null;
		if (!this.toolbar) {
			this.toolbar = document.createElement("div");
			this.toolbar.className = "lint-toolbar";
		}
		if (pill.parentElement !== this.toolbar) {
			pill.parentElement.appendChild(this.toolbar);
			this.toolbar.appendChild(pill);
		}
		return this.toolbar;
	}
	showOffButton() {
		const toolbar = this.ensureToolbar();
		if (!toolbar) return;
		if (!this.offButton) {
			const button = document.createElement("button");
			button.type = "button";
			button.className = "lint-off-button";
			button.innerHTML = OFF_ICON;
			const label = this.translate("Turn off linting");
			button.title = label;
			button.setAttribute("aria-label", label);
			button.addEventListener("click", () => {
				this.handleOffClick();
			});
			this.offButton = button;
		}
		if (this.offButton.parentElement !== toolbar) toolbar.appendChild(this.offButton);
		this.offButton.hidden = false;
	}
	hideOffButton() {
		if (this.offButton) this.offButton.hidden = true;
	}
	showDisabledChip() {
		const pill = this.pill();
		const container = pill?.parentElement === this.toolbar ? this.toolbar?.parentElement : pill?.parentElement;
		if (!container) return;
		if (!this.disabledChip) {
			const chip = document.createElement("div");
			chip.className = "lint-disabled-chip";
			const text = document.createElement("span");
			text.className = "lint-disabled-text";
			text.textContent = this.translate("Linting off");
			const enable = document.createElement("button");
			enable.type = "button";
			enable.className = "lint-enable-button";
			enable.textContent = this.translate("Enable");
			enable.addEventListener("click", () => {
				this.handleEnableClick();
			});
			chip.appendChild(text);
			chip.appendChild(enable);
			this.disabledChip = chip;
		}
		if (this.disabledChip.parentElement !== container) container.appendChild(this.disabledChip);
		this.disabledChip.hidden = false;
		this.canvas.getContainer().classList.add("bpmnlint-disabled");
	}
	hideDisabledChip() {
		this.canvas.getContainer().classList.remove("bpmnlint-disabled");
		if (this.disabledChip) this.disabledChip.hidden = true;
	}
};
_defineProperty(LintConfigService, "$inject", [
	"linting",
	"lintTier",
	"lintCallbacks",
	"translate",
	"canvas",
	"bpmnjs",
	"eventBus"
]);
//#endregion
//#region ../../packages/bpmn-modeler/src/bpmnlint/lintPopoverPlacement.ts
function choosePopoverPlacement(anchor, popover, bounds) {
	const roomAbove = anchor.top - bounds.top;
	const roomBelow = bounds.bottom - anchor.bottom;
	const roomRight = bounds.right - anchor.left;
	const roomLeft = anchor.right - bounds.left;
	return {
		vertical: popover.height <= roomAbove || roomAbove >= roomBelow ? "above" : "below",
		horizontal: popover.width <= roomRight || roomRight >= roomLeft ? "right" : "left"
	};
}
//#endregion
//#region ../../packages/bpmn-modeler/src/bpmnlint/LintIssuePopover.ts
var LINTING_OVERLAY_TYPE = "linting";
var OVERLAY_SELECTOR = ".bjsl-overlay";
var ICON_SELECTOR = ".bjsl-icon";
var DROPDOWN_SELECTOR = ".bjsl-dropdown";
var DROPDOWN_CONTENT_SELECTOR = ".bjsl-dropdown-content";
var PINNED_CLASS = "open";
var LintIssuePopover = class {
	constructor(eventBus, canvas, overlays, translate) {
		_defineProperty(this, "canvas", void 0);
		_defineProperty(this, "overlays", void 0);
		_defineProperty(this, "translate", void 0);
		_defineProperty(this, "pinnedElementId", void 0);
		_defineProperty(this, "handleMouseOver", (event) => {
			const overlayNode = closestLintOverlay(event.target);
			if (!overlayNode || overlayNode.contains(event.relatedTarget)) return;
			this.placeDropdown(overlayNode);
		});
		_defineProperty(this, "handleClick", (event) => {
			if (!isLintIcon(event.target)) return;
			const overlayNode = closestLintOverlay(event.target);
			if (overlayNode) this.togglePin(overlayNode);
		});
		_defineProperty(this, "handleKeydown", (event) => {
			const overlayNode = closestLintOverlay(event.target);
			if (!overlayNode) return;
			if ((event.key === "Enter" || event.key === " ") && isLintIcon(event.target)) {
				event.preventDefault();
				this.togglePin(overlayNode);
				return;
			}
			if (event.key === "Escape" && this.pinnedElementId !== void 0) {
				event.preventDefault();
				event.stopPropagation();
				this.unpin();
			}
		});
		_defineProperty(this, "handleDocumentPointerDown", (event) => {
			const pinnedNode = this.pinnedOverlayNode();
			if (pinnedNode && !pinnedNode.contains(event.target)) this.unpin();
		});
		this.canvas = canvas;
		this.overlays = overlays;
		this.translate = translate;
		const container = canvas.getContainer();
		container.addEventListener("mouseover", this.handleMouseOver);
		container.addEventListener("click", this.handleClick);
		container.addEventListener("keydown", this.handleKeydown);
		document.addEventListener("pointerdown", this.handleDocumentPointerDown, true);
		eventBus.on("linting.completed", () => this.restoreAfterRelint());
		eventBus.on("linting.toggle", ({ active }) => {
			if (!active) this.pinnedElementId = void 0;
		});
		eventBus.on("diagram.clear", () => {
			this.pinnedElementId = void 0;
		});
		eventBus.on("diagram.destroy", () => {
			document.removeEventListener("pointerdown", this.handleDocumentPointerDown, true);
		});
	}
	togglePin(overlayNode) {
		const elementId = this.findOverlay(overlayNode)?.elementId;
		if (elementId === void 0) return;
		const wasPinned = this.pinnedElementId === elementId;
		this.unpin();
		if (!wasPinned) {
			this.pinnedElementId = elementId;
			this.setOpen(overlayNode, true);
		}
	}
	unpin() {
		const pinnedNode = this.pinnedOverlayNode();
		if (pinnedNode) this.setOpen(pinnedNode, false);
		this.pinnedElementId = void 0;
	}
	restoreAfterRelint() {
		for (const { node } of this.lintOverlays()) this.makeKeyboardAccessible(node);
		const pinnedNode = this.pinnedOverlayNode();
		if (pinnedNode) this.setOpen(pinnedNode, true);
		else this.pinnedElementId = void 0;
	}
	makeKeyboardAccessible(overlayNode) {
		const icon = overlayNode.querySelector(ICON_SELECTOR);
		if (icon) {
			icon.tabIndex = 0;
			icon.setAttribute("role", "button");
			icon.setAttribute("aria-expanded", "false");
			icon.setAttribute("aria-label", this.translate("Show lint issues"));
		}
		overlayNode.querySelector(DROPDOWN_SELECTOR)?.setAttribute("tabindex", "-1");
	}
	setOpen(overlayNode, open) {
		overlayNode.querySelector(DROPDOWN_SELECTOR)?.classList.toggle(PINNED_CLASS, open);
		overlayNode.querySelector(ICON_SELECTOR)?.setAttribute("aria-expanded", String(open));
		if (open) this.placeDropdown(overlayNode);
	}
	placeDropdown(overlayNode) {
		if (this.findOverlay(overlayNode)?.isRoot !== false) return;
		const icon = overlayNode.querySelector(ICON_SELECTOR);
		const dropdown = overlayNode.querySelector(DROPDOWN_SELECTOR);
		const content = overlayNode.querySelector(DROPDOWN_CONTENT_SELECTOR);
		if (!icon || !dropdown || !content) return;
		const wasOpen = dropdown.classList.contains(PINNED_CLASS);
		dropdown.classList.add(PINNED_CLASS);
		const popoverBox = content.getBoundingClientRect();
		dropdown.classList.toggle(PINNED_CLASS, wasOpen);
		const placement = choosePopoverPlacement(icon.getBoundingClientRect(), popoverBox, this.canvas.getContainer().getBoundingClientRect());
		overlayNode.classList.toggle("bjsl-issues-top-right", placement.vertical === "above");
		overlayNode.classList.toggle("bjsl-issues-bottom-right", placement.vertical === "below");
		overlayNode.classList.toggle("lint-popover-left", placement.horizontal === "left");
	}
	pinnedOverlayNode() {
		if (this.pinnedElementId === void 0) return;
		return this.lintOverlays().find(({ elementId }) => elementId === this.pinnedElementId)?.node;
	}
	findOverlay(overlayNode) {
		return this.lintOverlays().find(({ node }) => node === overlayNode);
	}
	lintOverlays() {
		return this.overlays.get({ type: LINTING_OVERLAY_TYPE }).flatMap(({ html, element }) => {
			if (!(html instanceof HTMLElement) || typeof element === "string") return [];
			return [{
				node: html,
				elementId: element.id,
				isRoot: !element.parent
			}];
		});
	}
};
_defineProperty(LintIssuePopover, "$inject", [
	"eventBus",
	"canvas",
	"overlays",
	"translate"
]);
function closestLintOverlay(target) {
	return target instanceof Element ? target.closest(OVERLAY_SELECTOR) : null;
}
function isLintIcon(target) {
	return target instanceof Element && target.closest(ICON_SELECTOR) !== null;
}
//#endregion
//#region ../../packages/bpmn-modeler/src/bpmnlint/lintIssueDiff.ts
function issueContentKey(elementIssues) {
	return JSON.stringify(elementIssues.map((issue) => [
		issue.rule,
		issue.category,
		issue.message,
		issue.actualElementId,
		issue.isChildIssue,
		issue.meta?.documentation?.url
	]));
}
function diffElementIssues(previous, next, isRendered) {
	const staleElementIds = [];
	const freshElementIds = [];
	for (const elementId of Object.keys(previous)) if (next[elementId] === void 0) staleElementIds.push(elementId);
	for (const [elementId, elementIssues] of Object.entries(next)) if (previous[elementId] === void 0) freshElementIds.push(elementId);
	else if (!isRendered(elementId) || issueContentKey(previous[elementId]) !== issueContentKey(elementIssues)) {
		staleElementIds.push(elementId);
		freshElementIds.push(elementId);
	}
	return {
		staleElementIds,
		freshElementIds
	};
}
//#endregion
//#region ../../packages/bpmn-modeler/src/bpmnlint/upstreamInternals/lintingInternals.ts
var VENDOR_METHODS = [
	"lint",
	"update",
	"isActive",
	"_formatIssues",
	"_createElementIssues",
	"_clearOverlays",
	"_updateButton",
	"_fireComplete"
];
var VENDOR_STATE = ["_issues", "_overlayIds"];
function assertVendorLinting(linting) {
	const candidate = linting;
	const missingMember = [...VENDOR_METHODS.filter((name) => typeof candidate?.[name] !== "function"), ...VENDOR_STATE.filter((name) => typeof candidate?.[name] !== "object" || candidate[name] === null)];
	if (missingMember.length > 0) throw new Error(`bpmn-js-bpmnlint linting internal shape changed: missing ${missingMember.join(", ")}. Update lintingInternals.ts and its shape test.`);
}
var LintingInternals = class {
	constructor(linting) {
		_defineProperty(this, "linting", void 0);
		assertVendorLinting(linting);
		this.linting = linting;
	}
	replaceUpdate(update) {
		this.linting.update = update;
	}
	lint() {
		return this.linting.lint();
	}
	isActive() {
		return this.linting.isActive();
	}
	formatIssues(results) {
		return this.linting._formatIssues(results);
	}
	renderedIssues() {
		return this.linting._issues;
	}
	storeIssues(issues) {
		this.linting._issues = issues;
	}
	overlayIdOf(overlayKey) {
		return this.linting._overlayIds[overlayKey];
	}
	forgetOverlayId(overlayKey) {
		delete this.linting._overlayIds[overlayKey];
	}
	createElementOverlays(elementId, elementIssues) {
		this.linting._createElementIssues(elementId, elementIssues);
	}
	clearOverlays() {
		this.linting._clearOverlays();
	}
	updateButton() {
		this.linting._updateButton();
	}
	fireComplete(issues) {
		this.linting._fireComplete(issues);
	}
};
//#endregion
//#region ../../packages/bpmn-modeler/src/bpmnlint/lintRunScheduler.ts
var MIN_QUIET_PERIOD_MS = 300;
var MAX_QUIET_PERIOD_MS = 5e3;
var IDLE_TIMEOUT_MS = 1e3;
function browserTimers() {
	return {
		now: () => performance.now(),
		setTimeout: (callback, delayMs) => globalThis.setTimeout(callback, delayMs),
		clearTimeout: (handle) => globalThis.clearTimeout(handle),
		...typeof globalThis.requestIdleCallback === "function" && {
			requestIdleCallback: (callback, options) => globalThis.requestIdleCallback(callback, options),
			cancelIdleCallback: (handle) => globalThis.cancelIdleCallback(handle)
		}
	};
}
var LintRunScheduler = class {
	constructor(run, timers = browserTimers()) {
		_defineProperty(this, "run", void 0);
		_defineProperty(this, "timers", void 0);
		_defineProperty(this, "cancelPendingStep", void 0);
		_defineProperty(this, "runInFlight", false);
		_defineProperty(this, "trailingRunRequested", false);
		_defineProperty(this, "generation", 0);
		_defineProperty(this, "lastRunDurationMs", 0);
		this.run = run;
		this.timers = timers;
	}
	request() {
		if (this.runInFlight) {
			this.trailingRunRequested = true;
			return;
		}
		this.clearPendingStep();
		this.afterTimeout(0, () => this.afterTimeout(this.quietPeriodMs(), () => this.whenIdle(() => void this.start())));
	}
	cancel() {
		this.generation++;
		this.trailingRunRequested = false;
		this.clearPendingStep();
	}
	quietPeriodMs() {
		return Math.min(MAX_QUIET_PERIOD_MS, Math.max(MIN_QUIET_PERIOD_MS, this.lastRunDurationMs));
	}
	async start() {
		this.cancelPendingStep = void 0;
		this.runInFlight = true;
		const runGeneration = this.generation;
		const startedAt = this.timers.now();
		try {
			await this.run(() => runGeneration === this.generation);
		} finally {
			this.lastRunDurationMs = this.timers.now() - startedAt;
			this.runInFlight = false;
			if (this.trailingRunRequested) {
				this.trailingRunRequested = false;
				this.request();
			}
		}
	}
	afterTimeout(delayMs, next) {
		const handle = this.timers.setTimeout(next, delayMs);
		this.cancelPendingStep = () => this.timers.clearTimeout(handle);
	}
	whenIdle(next) {
		const timers = this.timers;
		if (!timers.requestIdleCallback || !timers.cancelIdleCallback) {
			this.afterTimeout(0, next);
			return;
		}
		const handle = timers.requestIdleCallback(next, { timeout: IDLE_TIMEOUT_MS });
		this.cancelPendingStep = () => timers.cancelIdleCallback?.(handle);
	}
	clearPendingStep() {
		this.cancelPendingStep?.();
		this.cancelPendingStep = void 0;
	}
};
//#endregion
//#region ../../packages/bpmn-modeler/src/bpmnlint/LintUpdateService.ts
var PLANE_SUFFIX = "_plane";
function copyLintResults(results) {
	const copy = {};
	for (const [rule, reports] of Object.entries(results)) copy[rule] = reports.map((report) => ({ ...report }));
	return copy;
}
function sharesPlaneOverlaySlot(...issueMaps) {
	const elementIds = new Set(issueMaps.flatMap((issues) => Object.keys(issues)));
	return [...elementIds].some((elementId) => elementIds.has(`${elementId}${PLANE_SUFFIX}`));
}
var LintUpdateService = class {
	constructor(linting, overlays, eventBus, bpmnjs) {
		_defineProperty(this, "overlays", void 0);
		_defineProperty(this, "bpmnjs", void 0);
		_defineProperty(this, "linting", void 0);
		_defineProperty(this, "scheduler", new LintRunScheduler((isCurrent) => this.relint(isCurrent)));
		this.overlays = overlays;
		this.bpmnjs = bpmnjs;
		this.linting = new LintingInternals(linting);
		this.linting.replaceUpdate(() => this.scheduler.request());
		eventBus.on(["diagram.clear", "diagram.destroy"], () => {
			this.scheduler.cancel();
		});
	}
	async relint(isCurrent) {
		if (!this.bpmnjs.getDefinitions()) return;
		const results = await this.linting.lint();
		if (!isCurrent()) return;
		const issues = this.linting.formatIssues(copyLintResults(results));
		if (!this.linting.isActive()) this.linting.clearOverlays();
		else if (sharesPlaneOverlaySlot(this.linting.renderedIssues(), issues)) this.redrawAllElements(issues);
		else this.redrawChangedElements(issues);
		this.linting.storeIssues(issues);
		this.linting.updateButton();
		this.linting.fireComplete(issues);
	}
	redrawAllElements(issues) {
		this.linting.clearOverlays();
		for (const [elementId, elementIssues] of Object.entries(issues)) this.linting.createElementOverlays(elementId, elementIssues);
	}
	redrawChangedElements(issues) {
		const { staleElementIds, freshElementIds } = diffElementIssues(this.linting.renderedIssues(), issues, (elementId) => this.isRendered(elementId));
		for (const elementId of staleElementIds) {
			this.removeOverlay(elementId);
			this.removeOverlay(`${elementId}${PLANE_SUFFIX}`);
		}
		for (const elementId of freshElementIds) this.linting.createElementOverlays(elementId, issues[elementId]);
	}
	isRendered(elementId) {
		const planeOverlayId = this.linting.overlayIdOf(`${elementId}${PLANE_SUFFIX}`);
		return this.isLive(this.linting.overlayIdOf(elementId)) && (planeOverlayId === void 0 || this.isLive(planeOverlayId));
	}
	isLive(overlayId) {
		return overlayId !== void 0 && this.overlays.get(overlayId) != null;
	}
	removeOverlay(overlayKey) {
		const overlayId = this.linting.overlayIdOf(overlayKey);
		if (overlayId === void 0) return;
		this.overlays.remove(overlayId);
		this.linting.forgetOverlayId(overlayKey);
	}
};
_defineProperty(LintUpdateService, "$inject", [
	"linting",
	"overlays",
	"eventBus",
	"bpmnjs"
]);
//#endregion
//#region ../../packages/bpmn-modeler/src/bpmnlint/index.ts
function createLintModule(tier, callbacks) {
	return {
		__depends__: [index],
		__init__: [
			"lintUpdate",
			"bpmnLintConfig",
			"lintIssuePopover"
		],
		lintUpdate: ["type", LintUpdateService],
		bpmnLintConfig: ["type", LintConfigService],
		lintIssuePopover: ["type", LintIssuePopover],
		lintTier: ["value", tier],
		lintCallbacks: ["value", callbacks]
	};
}
//#endregion
export { createLintModule };

//# sourceMappingURL=bpmnlint-BqB-Hefz.js.map