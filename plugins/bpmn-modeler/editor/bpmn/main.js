const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../shared/bpmnlint-BqB-Hefz.js","../shared/rolldown-runtime-7_rZTKki.js","../shared/editorLayout-DyS83izk.js","../shared/editorLayout-CNhIsaoN.css","../shared/EscapeUtil-3RypN4fl.js","../shared/dist-CAwPjkp6.js","../shared/ModelUtil-Qz7TgySP.js","../shared/dist-CS7WyDVh.js","../shared/bpmnlint-DoI7vgqE.css","../shared/viewer-C5QaYwqF.js","../shared/createSurface-B_CjPoQd.js","../shared/jsxRuntime.module-C_nqa6u-.js","../shared/provider-C6NTTYww.js","../shared/index.esm-QK7iS3an.js","../shared/index.esm-BwkTnPQM.js","../shared/design-BYjJHFm7.js","../shared/reporting-DDWAsQPl.js","../shared/clipboard-DuTT61cu.js","../shared/reporting-DXH2a9lW.css","../shared/lib-Dnq2R8Xy.js","../shared/design-5oiqdf5k.css","../shared/src-C0fWSej5.js","../shared/src-CU_wPvE9.css"])))=>i.map(i=>d[i]);
import { a as openOrcaSession, d as extras, i as followOrcaTheme, n as syncDocument, o as orcaLanguage, p as i18n, r as currentOrcaTheme, s as applyPageThemeScope, t as mountEditorLayout } from "../shared/editorLayout-DyS83izk.js";
//#region ../../libs/modeler-types/src/engine.ts
var ENGINES = ["c7", "c8"];
function isEngine(value) {
	return ENGINES.includes(value);
}
var ENGINE_EXECUTION_PLATFORM = {
	c7: "Camunda Platform",
	c8: "Camunda Cloud"
};
var ENGINE_CAPABILITIES = {
	c7: {
		verifiesDeployments: true,
		inlineScripting: true,
		transactionBoundaries: true,
		formReferenceStatus: false
	},
	c8: {
		verifiesDeployments: false,
		inlineScripting: false,
		transactionBoundaries: false,
		formReferenceStatus: true
	}
};
function engineSupports(engine, capability) {
	return engine !== void 0 && ENGINE_CAPABILITIES[engine][capability];
}
var MODELER_NAMESPACE_URI = "http://camunda.org/schema/modeler/1.0";
var MODELER_DEFAULT_PREFIX = "modeler";
var BYTE_ORDER_MARK = "﻿";
function detectEngine(xml) {
	const attributes = readDefinitionsStartTag(xml)?.attributes;
	if (!attributes) return;
	const names = executionPlatformAttributeNames(attributes);
	const executionPlatform = attributes.find((attribute) => attribute.name === names.platform)?.value;
	if (executionPlatform !== void 0) {
		for (const engine of Object.keys(ENGINE_EXECUTION_PLATFORM)) if (executionPlatform === ENGINE_EXECUTION_PLATFORM[engine]) return engine;
	}
	const versionMatch = (attributes.find((attribute) => attribute.name === names.version)?.value)?.match(/^([78])\./);
	if (versionMatch) return versionMatch[1] === "7" ? "c7" : "c8";
}
function executionPlatformAttributeNames(attributes) {
	const binding = attributes.find(({ name, value }) => name.startsWith("xmlns:") && value === "http://camunda.org/schema/modeler/1.0");
	const prefix = binding ? binding.name.slice(6) : MODELER_DEFAULT_PREFIX;
	return {
		namespace: `xmlns:${prefix}`,
		platform: `${prefix}:executionPlatform`,
		version: `${prefix}:executionPlatformVersion`
	};
}
function readDefinitionsStartTag(xml) {
	const tagStart = findRootTagStart(xml);
	if (tagStart === void 0) return;
	const startTag = readStartTag(xml, tagStart);
	return startTag && localName(startTag.name) === "definitions" ? startTag : void 0;
}
function readStartTag(xml, tagStart) {
	let cursor = tagStart + 1;
	const nameMatch = /^[^\s/>]+/.exec(xml.slice(cursor));
	if (!nameMatch) return;
	const name = nameMatch[0];
	cursor += name.length;
	const attributes = [];
	let attributesEnd = cursor;
	while (cursor < xml.length) {
		while (cursor < xml.length && isWhitespace(xml[cursor])) cursor++;
		if (cursor >= xml.length) return;
		const char = xml[cursor];
		if (char === ">") return {
			name,
			attributes,
			attributesEnd
		};
		if (char === "/") return xml[cursor + 1] === ">" ? {
			name,
			attributes,
			attributesEnd
		} : void 0;
		const attributeStart = cursor;
		const attributeNameMatch = /^[^\s=/>]+/.exec(xml.slice(cursor));
		if (!attributeNameMatch) return;
		const attributeName = attributeNameMatch[0];
		cursor += attributeName.length;
		while (cursor < xml.length && isWhitespace(xml[cursor])) cursor++;
		if (xml[cursor] !== "=") return;
		cursor++;
		while (cursor < xml.length && isWhitespace(xml[cursor])) cursor++;
		const quote = xml[cursor];
		if (quote !== "\"" && quote !== "'") return;
		const valueEnd = xml.indexOf(quote, cursor + 1);
		if (valueEnd === -1) return;
		attributesEnd = valueEnd + 1;
		attributes.push({
			name: attributeName,
			value: xml.slice(cursor + 1, valueEnd),
			start: attributeStart,
			end: attributesEnd
		});
		cursor = attributesEnd;
	}
}
function findRootTagStart(xml) {
	let cursor = xml.startsWith(BYTE_ORDER_MARK) ? 1 : 0;
	while (cursor < xml.length) {
		while (cursor < xml.length && isWhitespace(xml[cursor])) cursor++;
		if (cursor >= xml.length || xml[cursor] !== "<") return;
		if (xml.startsWith("<!--", cursor)) {
			const end = xml.indexOf("-->", cursor + 4);
			if (end === -1) return;
			cursor = end + 3;
		} else if (xml.startsWith("<![CDATA[", cursor)) {
			const end = xml.indexOf("]]>", cursor + 9);
			if (end === -1) return;
			cursor = end + 3;
		} else if (xml.startsWith("<?", cursor)) {
			const end = xml.indexOf("?>", cursor + 2);
			if (end === -1) return;
			cursor = end + 2;
		} else if (xml.startsWith("<!", cursor)) {
			const end = skipDoctype(xml, cursor);
			if (end === void 0) return;
			cursor = end;
		} else return cursor;
	}
}
function skipDoctype(xml, start) {
	let cursor = start + 2;
	while (cursor < xml.length) {
		const char = xml[cursor];
		if (char === "[") {
			const subsetEnd = xml.indexOf("]", cursor + 1);
			if (subsetEnd === -1) return;
			cursor = subsetEnd + 1;
		} else if (char === ">") return cursor + 1;
		else cursor++;
	}
}
function localName(qualifiedName) {
	const colon = qualifiedName.indexOf(":");
	return colon === -1 ? qualifiedName : qualifiedName.slice(colon + 1);
}
function isWhitespace(char) {
	return char === " " || char === "	" || char === "\n" || char === "\r";
}
//#endregion
//#region ../../libs/modeler-types/src/surfaceMode.ts
var SURFACE_MODES = [
	"view",
	"design",
	"implement"
];
var ENGINE_NEUTRAL = {
	engineProperties: false,
	elementTemplates: false,
	engineLintRules: false
};
var SURFACE_MODE_CAPABILITIES = {
	view: ENGINE_NEUTRAL,
	design: ENGINE_NEUTRAL,
	implement: {
		engineProperties: true,
		elementTemplates: true,
		engineLintRules: true
	}
};
function surfaceModeSupports(mode, capability) {
	return SURFACE_MODE_CAPABILITIES[mode][capability];
}
function parseEditableMode(setting) {
	return setting === "implement" ? "implement" : "design";
}
function isModeAvailable(mode, engine) {
	return mode === "implement" ? engine !== void 0 : true;
}
function defaultMode(engine, available = SURFACE_MODES) {
	const has = (mode) => available.includes(mode);
	if (engine !== void 0 && has("implement")) return "implement";
	if (has("design")) return "design";
	if (has("view")) return "view";
	return available[0] ?? "design";
}
function resolveInitialMode(requested, engine, available = SURFACE_MODES) {
	if (requested !== null && SURFACE_MODES.includes(requested) && available.includes(requested) && isModeAvailable(requested, engine)) return requested;
	return defaultMode(engine, available);
}
function planTransition(from, to, engine) {
	if (from === to) return "none";
	if (from !== "view" && to !== "view" && engine !== void 0) return "toggle";
	return "recreate";
}
//#endregion
//#region ../../packages/bpmn-modeler/src/modeSession/servingSurfaces.ts
function servingSurfaces(surfaces, engine) {
	const { view, design, implement } = surfaces;
	const onModeler = (mode) => engine !== void 0 && implement !== void 0 ? (context) => implement({
		...context,
		engine,
		mode
	}) : void 0;
	return {
		view,
		design: onModeler("design") ?? design,
		implement: onModeler("implement")
	};
}
//#endregion
//#region ../../packages/bpmn-modeler/src/modeSession/modeSession.ts
function canToggleMode(handle) {
	return "setMode" in handle;
}
function holdsPanelInput(handle) {
	return "flushPendingInput" in handle;
}
function holdsPendingSave(handle) {
	return "flushContentSaved" in handle;
}
async function createModeSession(options) {
	const { container, engine, surfaces } = options;
	let theme = options.theme ?? "automatic";
	const serving = servingSurfaces(surfaces, engine);
	const available = SURFACE_MODES.filter((mode) => isModeAvailable(mode, engine) && serving[mode] !== void 0);
	if (available.length === 0) throw new Error("createModeSession: no surface factory is available for this engine — supply at least one of view / design / implement.");
	let currentMode = resolveInitialMode(options.initialMode ?? null, engine, available);
	let handle = await buildSurface(currentMode);
	try {
		options.onSurfaceCreated?.(handle, currentMode);
	} catch (error) {
		handle.destroy();
		throw error;
	}
	let busy = false;
	let disposed = false;
	let inFlight = null;
	function safeDestroy(surface) {
		try {
			surface?.destroy();
		} catch (error) {
			if (!disposed) options.onError?.(error);
		}
	}
	function buildSurface(mode) {
		return serving[mode]({
			container,
			engine,
			theme
		});
	}
	function isAvailable(mode) {
		return available.includes(mode);
	}
	async function requestMode(target) {
		if (disposed || !isAvailable(target) || busy) return;
		const kind = planTransition(currentMode, target, engine);
		if (kind === "none") return;
		if (kind === "toggle" && canToggleMode(handle)) {
			handle.setMode(target);
			currentMode = handle.getMode();
			options.onModeChanged?.(currentMode, "toggle");
			return;
		}
		await recreate(target);
	}
	async function recreate(target) {
		busy = true;
		options.onSwitchStateChanged?.(true);
		inFlight = runSwitch(target);
		try {
			await inFlight;
		} finally {
			inFlight = null;
			busy = false;
			if (!disposed) options.onSwitchStateChanged?.(false);
		}
	}
	async function runSwitch(target) {
		const original = handle;
		let snapshot;
		let xml;
		try {
			if (holdsPanelInput(original)) original.flushPendingInput();
			snapshot = original.captureViewState();
			xml = await original.exportDiagram();
			if (disposed) {
				safeDestroy(original);
				return;
			}
			if (holdsPendingSave(original)) await original.flushContentSaved();
			if (disposed) {
				safeDestroy(original);
				return;
			}
			await options.beforeDestroy?.();
			if (disposed) {
				safeDestroy(original);
				return;
			}
		} catch (error) {
			if (disposed) {
				safeDestroy(original);
				return;
			}
			options.onError?.(error);
			return;
		}
		original.destroy();
		let candidate = null;
		try {
			candidate = await buildSurface(target);
			if (disposed) {
				safeDestroy(candidate);
				return;
			}
			handle = candidate;
			currentMode = target;
			handle.setTheme(theme);
			options.onSurfaceCreated?.(handle, target);
			await handle.loadDiagram(xml);
			if (disposed) {
				safeDestroy(candidate);
				return;
			}
			handle.applyViewState(snapshot);
			options.onModeChanged?.(target, "recreate");
		} catch (error) {
			safeDestroy(candidate);
			if (disposed) return;
			options.onError?.(error);
			await buildFallback(xml);
		}
	}
	async function buildFallback(xml) {
		const fallback = defaultMode(engine, available);
		let surface = null;
		try {
			surface = await buildSurface(fallback);
			if (disposed) {
				safeDestroy(surface);
				return;
			}
			handle = surface;
			currentMode = fallback;
			handle.setTheme(theme);
			options.onSurfaceCreated?.(handle, fallback);
			await handle.loadDiagram(xml);
			if (disposed) {
				safeDestroy(surface);
				return;
			}
			options.onModeChanged?.(fallback, "fallback");
		} catch (error) {
			safeDestroy(surface);
			if (!disposed) options.onError?.(error);
		}
	}
	return {
		getMode: () => currentMode,
		getHandle: () => handle,
		availableModes: () => available,
		isAvailable,
		requestMode,
		setTheme: (next) => {
			if (disposed) return;
			theme = next;
			handle.setTheme(next);
		},
		destroy: async () => {
			if (disposed) return;
			disposed = true;
			if (inFlight) await inFlight;
			else handle.destroy();
		}
	};
}
//#endregion
//#region ../../packages/bpmn-modeler/src/modeSession/modeStrip.ts
var MODE_LABEL = {
	view: "View",
	design: "Design",
	implement: "Implement"
};
var MODE_DESCRIPTION = {
	view: "Read-only",
	design: "Engine-neutral modeling",
	implement: "Camunda properties, templates and lint"
};
var IMPLEMENT_UNAVAILABLE_HINT = "Implement needs a Camunda execution platform — this model has none. Assign one to enable it.";
var CARET_SVG = "<svg class=\"mode-chip-caret\" viewBox=\"0 0 8 8\" aria-hidden=\"true\"><path d=\"M1 2.5l3 3 3-3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\"/></svg>";
var MENU_GAP = 4;
var TOGGLE_GAP = 8;
var VIEWPORT_MARGIN = 8;
function mountModeStrip(opts) {
	const modes = opts.modes ?? SURFACE_MODES;
	let translate = opts.translate;
	let labelDisposer;
	if (!translate) {
		i18n.extend(extras);
		translate = (template, replacements) => i18n.translate(template, replacements);
	}
	const t = translate;
	const registerLabelChange = opts.onLabelChange ?? ((apply) => labelDisposer = i18n.onChange(apply));
	const stampHost = (state) => {
		opts.host?.setAttribute("data-surface-mode", state.mode);
		opts.host?.setAttribute("aria-busy", state.busy ? "true" : "false");
	};
	if (modes.length < 2) return {
		render: stampHost,
		destroy: () => void 0
	};
	const chip = document.createElement("button");
	chip.type = "button";
	chip.className = "mode-chip";
	chip.setAttribute("aria-haspopup", "menu");
	chip.setAttribute("aria-expanded", "false");
	const chipLabel = document.createElement("span");
	chipLabel.className = "mode-chip-label";
	chip.appendChild(chipLabel);
	chip.insertAdjacentHTML("beforeend", CARET_SVG);
	opts.stripEl.appendChild(chip);
	const menu = document.createElement("div");
	menu.className = "mode-menu";
	menu.setAttribute("role", "menu");
	menu.hidden = true;
	opts.stripEl.appendChild(menu);
	const items = new Map();
	for (const mode of modes) {
		const item = document.createElement("button");
		item.type = "button";
		item.className = "mode-menu-item";
		item.dataset.mode = mode;
		item.setAttribute("role", "menuitemradio");
		item.innerHTML = "<span class=\"mode-menu-item-label\"></span><span class=\"mode-menu-item-description\"></span>";
		item.addEventListener("click", () => {
			if (item.getAttribute("aria-disabled") === "true") return;
			closeMenu();
			opts.onSelect(mode);
		});
		items.set(mode, item);
		menu.appendChild(item);
	}
	let lastState;
	let open = false;
	chip.addEventListener("click", (event) => {
		event.stopPropagation();
		if (open) closeMenu();
		else openMenu();
	});
	chip.addEventListener("keydown", (event) => {
		if (event.key === "ArrowDown" && !open) {
			event.preventDefault();
			openMenu();
		} else if (event.key === "Escape" && !open) opts.onEscape?.();
	});
	function openMenu() {
		open = true;
		chip.setAttribute("aria-expanded", "true");
		menu.hidden = false;
		placeMenu();
		(lastState && items.get(lastState.mode))?.focus();
		document.addEventListener("mousedown", onOutsidePress, true);
		window.addEventListener("resize", onViewportResize);
	}
	function closeMenu({ restoreFocus = true } = {}) {
		if (!open) return;
		open = false;
		chip.setAttribute("aria-expanded", "false");
		menu.hidden = true;
		document.removeEventListener("mousedown", onOutsidePress, true);
		window.removeEventListener("resize", onViewportResize);
		if (restoreFocus) chip.focus();
	}
	function placeMenu() {
		const anchor = chip.getBoundingClientRect();
		const { width, height } = menu.getBoundingClientRect();
		menu.style.left = `${clamp(anchor.left, window.innerWidth - width)}px`;
		menu.style.top = `${clamp(anchor.bottom + MENU_GAP, window.innerHeight - height)}px`;
	}
	function clamp(position, max) {
		return Math.max(VIEWPORT_MARGIN, Math.min(position, max - VIEWPORT_MARGIN));
	}
	function onOutsidePress(event) {
		const target = event.target;
		if (!menu.contains(target) && !chip.contains(target)) closeMenu({ restoreFocus: false });
	}
	function onViewportResize() {
		closeMenu({ restoreFocus: false });
	}
	menu.addEventListener("keydown", (event) => {
		const entries = [...items.values()];
		const current = entries.indexOf(document.activeElement);
		const targetByKey = {
			ArrowDown: (current + 1) % entries.length,
			ArrowUp: (current - 1 + entries.length) % entries.length,
			Home: 0,
			End: entries.length - 1
		};
		if (event.key in targetByKey) {
			event.preventDefault();
			entries[targetByKey[event.key]].focus();
		} else if (event.key === "Escape") {
			event.stopPropagation();
			closeMenu();
		} else if (event.key === "Tab") closeMenu({ restoreFocus: false });
	});
	const applyLabels = (state) => {
		const currentLabel = t(MODE_LABEL[state.mode]);
		const triggerLabel = t("Mode: {mode}", { mode: currentLabel });
		menu.setAttribute("aria-label", t("Mode"));
		chipLabel.textContent = currentLabel;
		chip.setAttribute("aria-label", triggerLabel);
		chip.title = triggerLabel;
		for (const [itemMode, item] of items) {
			item.querySelector(".mode-menu-item-label").textContent = t(MODE_LABEL[itemMode]);
			item.querySelector(".mode-menu-item-description").textContent = t(MODE_DESCRIPTION[itemMode]);
			item.setAttribute("aria-checked", itemMode === state.mode ? "true" : "false");
			if (isModeAvailable(itemMode, state.engine)) {
				item.removeAttribute("aria-disabled");
				item.removeAttribute("title");
			} else {
				item.setAttribute("aria-disabled", "true");
				item.title = t(IMPLEMENT_UNAVAILABLE_HINT);
			}
		}
	};
	let observedToggle;
	const toggleResize = typeof ResizeObserver === "undefined" ? void 0 : new ResizeObserver(() => alignBesideTokenSimulationToggle());
	const followToggle = (toggle) => {
		if (toggle === observedToggle) return;
		if (observedToggle) toggleResize?.unobserve(observedToggle);
		if (toggle) toggleResize?.observe(toggle);
		observedToggle = toggle;
	};
	const alignBesideTokenSimulationToggle = () => {
		const toggle = opts.stripEl.parentElement?.querySelector(".bts-toggle-mode") ?? void 0;
		followToggle(toggle);
		opts.stripEl.style.left = toggle ? `${toggle.offsetLeft + toggle.offsetWidth + TOGGLE_GAP}px` : "";
	};
	registerLabelChange(() => {
		if (lastState) applyLabels(lastState);
	});
	return {
		render(state) {
			lastState = state;
			stampHost(state);
			alignBesideTokenSimulationToggle();
			applyLabels(state);
		},
		destroy() {
			toggleResize?.disconnect();
			labelDisposer?.();
			closeMenu({ restoreFocus: false });
			chip.remove();
			menu.remove();
			items.clear();
		}
	};
}
//#endregion
//#region src/adapter/out/memoryClipboard.ts
function memoryClipboard() {
	let copied = "";
	return {
		requestClipboard: () => Promise.resolve(copied),
		writeClipboard: (text) => {
			copied = text;
		}
	};
}
//#endregion
//#region \0vite/preload-helper.js
var scriptRel = "modulepreload";
var assetsURL = function(dep, importerUrl) {
	return new URL(dep, importerUrl).href;
};
var seen = {};
var isCssPreloadUrl = function isCssPreloadUrl(url) {
	return url.pathname.endsWith(".css");
};
var preloadOnce = function preloadOnce(seen, href, preload) {
	if (href in seen) return seen[href];
	const promise = preload();
	if (!promise) {
		seen[href] = void 0;
		return;
	}
	const preloadPromise = promise.then(() => {
		seen[href] = void 0;
	}, (err) => {
		seen[href] = void 0;
		throw err;
	});
	seen[href] = preloadPromise;
	return preloadPromise;
};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		let preloadedHrefs;
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		function importMetaResolve(specifier) {
			if (import.meta.resolve) return new URL(import.meta.resolve(specifier));
			return new URL(specifier, import.meta.url);
		}
		promise = allSettled(deps.map((depString) => {
			depString = assetsURL(depString, importerUrl);
			const dep = importMetaResolve(depString);
			const isCss = isCssPreloadUrl(dep);
			return preloadOnce(seen, dep.href, () => {
				if (preloadedHrefs === void 0) {
					preloadedHrefs = {
						all: new Set(),
						styles: new Set()
					};
					const links = document.getElementsByTagName("link");
					for (let i = links.length - 1; i >= 0; i--) {
						const link = links[i];
						preloadedHrefs.all.add(link.href);
						if (link.rel === "stylesheet") preloadedHrefs.styles.add(link.href);
					}
				}
				if ((isCss ? preloadedHrefs.styles : preloadedHrefs.all).has(dep.href)) return;
				const link = document.createElement("link");
				link.rel = isCss ? "stylesheet" : scriptRel;
				if (!isCss) link.as = "script";
				link.crossOrigin = "";
				link.href = dep.href;
				if (cspNonce) link.setAttribute("nonce", cspNonce);
				document.head.appendChild(link);
				if (isCss) return new Promise((res, rej) => {
					link.addEventListener("load", res);
					link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
				});
			});
		}).filter((p) => p !== void 0));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
//#endregion
//#region src/adapter/out/bpmnCanvas.ts
function surfaceFactories(panelParent, clipboard) {
	const linting = async () => ({ linting: { module: await __vitePreload(() => import("../shared/bpmnlint-BqB-Hefz.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8]), import.meta.url) } });
	return {
		view: async ({ container, theme }) => {
			const { createViewer } = await __vitePreload(async () => {
				const { createViewer } = await import("../shared/viewer-C5QaYwqF.js");
				return { createViewer };
			}, __vite__mapDeps([9,2,1,3,10,11,4,6,12,13,5,14]), import.meta.url);
			return createViewer(container, {
				theme,
				propertiesPanel: { parent: panelParent }
			});
		},
		design: async ({ container, theme }) => {
			const { createDesigner } = await __vitePreload(async () => {
				const { createDesigner } = await import("../shared/design-BYjJHFm7.js");
				return { createDesigner };
			}, __vite__mapDeps([15,2,1,3,10,11,4,6,16,17,18,12,13,5,19,14,20]), import.meta.url);
			return createDesigner(container, {
				theme,
				clipboard,
				propertiesPanel: { parent: panelParent },
				...await linting()
			});
		},
		implement: async ({ container, theme, mode, engine }) => {
			const { createModeler } = await __vitePreload(async () => {
				const { createModeler } = await import("../shared/src-C0fWSej5.js");
				return { createModeler };
			}, __vite__mapDeps([21,2,1,3,10,11,4,6,16,17,18,22]), import.meta.url);
			return createModeler(container, {
				engine,
				mode,
				theme,
				clipboard,
				propertiesPanel: { parent: panelParent },
				...await linting()
			});
		}
	};
}
function hasCommandStack(handle) {
	return "onCommandStackChanged" in handle;
}
function holdsPendingInput(handle) {
	return "flushPendingInput" in handle;
}
function createBpmnCanvas(options) {
	const factories = surfaceFactories(options.panelParent, { bridge: memoryClipboard() });
	const surfaces = options.readOnly ? { view: factories.view } : factories;
	const editListeners = new Set();
	let theme = options.theme;
	let engine;
	let session;
	let strip;
	let stopListening = () => void 0;
	let shownOnce = false;
	const renderStrip = (busy) => {
		if (session) strip?.render({
			mode: session.getMode(),
			engine,
			busy
		});
	};
	function listenTo(handle) {
		stopListening();
		stopListening = hasCommandStack(handle) ? handle.onCommandStackChanged(() => editListeners.forEach((listener) => listener())) : () => void 0;
	}
	async function startSession(nextEngine) {
		await session?.destroy();
		engine = nextEngine;
		session = await createModeSession({
			container: options.container,
			engine,
			surfaces,
			theme,
			onSurfaceCreated: listenTo,
			onModeChanged: () => renderStrip(false),
			onSwitchStateChanged: renderStrip,
			onError: (error) => console.warn("Unable to switch the BPMN mode", error)
		});
		const liveSession = session;
		strip ??= mountModeStrip({
			host: options.strip.host,
			stripEl: options.strip.el,
			modes: SURFACE_MODES,
			translate: (template, replacements) => i18n.translate(template, replacements),
			onLabelChange: (apply) => i18n.onChange(apply),
			onSelect: (mode) => void session?.requestMode(mode)
		});
		renderStrip(false);
		return liveSession;
	}
	async function show(text) {
		const nextEngine = detectEngine(text);
		const kept = session !== void 0 && nextEngine === engine;
		const surface = (kept ? session : await startSession(nextEngine)).getHandle();
		if (!text.trim() && "newDiagram" in surface) {
			await surface.newDiagram();
			return;
		}
		const view = shownOnce && kept ? surface.captureViewState() : void 0;
		await surface.loadDiagram(text);
		if (view) surface.applyViewState(view);
	}
	return {
		async importText(text) {
			try {
				await show(text);
				shownOnce = true;
				return true;
			} catch (error) {
				console.warn("Unable to open the BPMN diagram", error);
				return false;
			}
		},
		exportText: () => session.getHandle().exportDiagram(),
		applyPendingInput: () => {
			const surface = session?.getHandle();
			if (surface && holdsPendingInput(surface)) surface.flushPendingInput();
		},
		onEdit: (listener) => {
			editListeners.add(listener);
			return () => editListeners.delete(listener);
		},
		setTheme: (next) => {
			theme = next;
			session?.setTheme(next);
		}
	};
}
//#endregion
//#region src/composition/bpmnEditor.ts
async function startBpmnEditor(root) {
	i18n.extend(extras);
	i18n.setLanguage(orcaLanguage());
	const session = await openOrcaSession();
	const layout = mountEditorLayout(root, "bpmn");
	layout.panelHost.classList.add("panel-host");
	const strip = document.createElement("div");
	strip.className = "mode-strip";
	layout.canvas.prepend(strip);
	const canvas = createBpmnCanvas({
		container: layout.canvas,
		panelParent: layout.panelMount,
		strip: {
			el: strip,
			host: layout.panelHost
		},
		readOnly: session.readOnly,
		theme: currentOrcaTheme()
	});
	followOrcaTheme((theme) => {
		applyPageThemeScope("data-bpmn-theme", theme);
		canvas.setTheme(theme);
	});
	return syncDocument(session, canvas);
}
//#endregion
//#region src/bpmn.ts
startBpmnEditor(document.getElementById("app"));
//#endregion
export { MODELER_NAMESPACE_URI as a, isEngine as c, ENGINE_EXECUTION_PLATFORM as i, parseEditableMode as n, engineSupports as o, surfaceModeSupports as r, executionPlatformAttributeNames as s, __vitePreload as t };

//# sourceMappingURL=main.js.map