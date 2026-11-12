import { m as _defineProperty } from "./editorLayout-DZwh-cxt.js";
import { a as exportSvg, c as base_default, d as TOGGLE_MODE_EVENT, f as CustomGroupsModule, g as NavigatedViewer, h as outline_default, i as exportFormattedXml, l as ToggleOffIcon, n as SurfaceCore, o as importDiagram, p as ModeFilterModule, s as createModelNavigationModule, t as createSurface, u as ToggleOnIcon } from "./createSurface-DyHVIhQM.js";
import { O as context_pad_default, Zt as classes, pn as DisposableStore, rn as query, tn as event } from "./jsxRuntime.module-awBdvHUy.js";
import { r as domify } from "./EscapeUtil-B1jzPlMc.js";
import { t as index } from "./index.esm-CXJiDiAL.js";
import { n as render_default, t as provider_default } from "./provider-Dq4DRXTy.js";
// ../../node_modules/bpmn-js-token-simulation/lib/features/toggle-mode/viewer/ToggleMode.js
function ToggleMode(eventBus, canvas, translate) {
	this._eventBus = eventBus;
	this._canvas = canvas;
	this._translate = translate;
	this._active = false;
	eventBus.on("diagram.init", () => {
		this._canvasParent = this._canvas.getContainer().parentNode;
		this._init();
	});
	eventBus.on("import.parse.start", () => {
		if (this._active) {
			this.toggleMode(false);
			eventBus.once("import.done", () => {
				this.toggleMode(true);
			});
		}
	});
}
ToggleMode.prototype._init = function() {
	this._container = domify(`
    <div class="bts-toggle-mode">
      <span class="bts-label"></span> <span class="bts-toggle">${ToggleOffIcon()}</span>
    </div>
  `);
	this._label = query(".bts-label", this._container);
	this._toggle = query(".bts-toggle", this._container);
	this._label.textContent = this._translate("Token Simulation");
	event.bind(this._container, "click", () => this.toggleMode());
	this._canvas.getContainer().appendChild(this._container);
};
ToggleMode.prototype._toggleIcon = function(active) {
	this._toggle.innerHTML = active ? ToggleOnIcon() : ToggleOffIcon();
};
ToggleMode.prototype.toggleMode = function(active = !this._active) {
	if (active === this._active) return;
	if (active) classes(this._canvasParent).add("simulation");
	else classes(this._canvasParent).remove("simulation");
	this._toggleIcon(active);
	this._eventBus.fire(TOGGLE_MODE_EVENT, { active });
	this._active = active;
};
ToggleMode.$inject = [
	"eventBus",
	"canvas",
	"translate"
];
// ../../node_modules/bpmn-js-token-simulation/lib/viewer.js
var viewer_default = { __depends__: [base_default, {
	__init__: ["toggleMode"],
	toggleMode: ["type", ToggleMode]
}] };
// ../../packages/bpmn-modeler/src/viewer/viewer.ts
var BpmnViewer = class {
	constructor(container, options) {
		_defineProperty(this, "container", void 0);
		_defineProperty(this, "options", void 0);
		_defineProperty(this, "core", void 0);
		_defineProperty(this, "store", new DisposableStore());
		this.container = container;
		this.options = options;
		const panel = options.propertiesPanel;
		this.core = new SurfaceCore(container, panel ? [container, panel.parent] : [container]);
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
		const panel = this.options.propertiesPanel;
		const navigationPort = this.options.capabilities?.modelNavigation;
		const capModules = navigationPort ? [context_pad_default, createModelNavigationModule(navigationPort)] : [];
		this.core.allocate(this.store, () => this.constructViewer(panel, capModules), {
			extraRoots: panel ? [panel.parent] : [],
			hasSearchPad: false
		});
	}
	constructViewer(panel, capModules) {
		return new NavigatedViewer({
			container: this.container,
			moddleExtensions: this.options.moddleExtensions,
			minimap: { open: false },
			...panel && { propertiesPanel: {
				parent: panel.parent,
				feelPopupContainer: this.container
			} },
			additionalModules: [
				outline_default,
				index,
				viewer_default,
				...panel ? [
					render_default,
					provider_default,
					ModeFilterModule,
					CustomGroupsModule
				] : [],
				...capModules,
				...this.options.additionalModules ?? []
			]
		});
	}
	async loadDiagram(xml) {
		const result = await importDiagram(this.core.instance, xml);
		this.core.armInitialViewport();
		return result;
	}
	async exportDiagram() {
		return exportFormattedXml(this.core.instance);
	}
	async getDiagramSvg() {
		return exportSvg(this.core.instance);
	}
	setTheme(theme) {
		this.core.setTheme(this.store, theme);
	}
	getService(name) {
		return this.core.service(name);
	}
	destroy() {
		this.store.dispose();
		this.core.releaseManagers();
	}
};
// ../../packages/bpmn-modeler/src/viewer/createViewer.ts
async function createViewer(container, options = {}) {
	return createSurface(() => new BpmnViewer(container, options), async (viewer) => {
		await viewer.init();
		viewer.setTheme(options.theme ?? "automatic");
	});
}
export { createViewer };

//# sourceMappingURL=viewer-CJWCHXS_.js.map