import { n as __esmMin, r as __exportAll } from "./rolldown-runtime-7_rZTKki.js";
//#region ../../node_modules/@lezer/common/dist/index.js
function checkSide(side, pos, from, to) {
	switch (side) {
		case -2: return from < pos;
		case -1: return to >= pos && from < pos;
		case 0: return from < pos && to > pos;
		case 1: return from <= pos && to > pos;
		case 2: return to > pos;
		case 4: return true;
	}
}
function resolveNode(node, pos, side, overlays) {
	var _a;
	while (node.from == node.to || (side < 1 ? node.from >= pos : node.from > pos) || (side > -1 ? node.to <= pos : node.to < pos)) {
		let parent = !overlays && node instanceof TreeNode && node.index < 0 ? null : node.parent;
		if (!parent) return node;
		node = parent;
	}
	let mode = overlays ? 0 : IterMode.IgnoreOverlays;
	if (overlays) {
		for (let scan = node, parent = scan.parent; parent; scan = parent, parent = scan.parent) if (scan instanceof TreeNode && scan.index < 0 && ((_a = parent.enter(pos, side, mode)) === null || _a === void 0 ? void 0 : _a.from) != scan.from) node = parent;
	}
	for (;;) {
		let inner = node.enter(pos, side, mode);
		if (!inner) return node;
		node = inner;
	}
}
function getChildren(node, type, before, after) {
	let cur = node.cursor(), result = [];
	if (!cur.firstChild()) return result;
	if (before != null) for (let found = false; !found;) {
		found = cur.type.is(before);
		if (!cur.nextSibling()) return result;
	}
	for (;;) {
		if (after != null && cur.type.is(after)) return result;
		if (cur.type.is(type)) result.push(cur.node);
		if (!cur.nextSibling()) return after == null ? result : [];
	}
}
function matchNodeContext(node, context, i = context.length - 1) {
	for (let p = node; i >= 0; p = p.parent) {
		if (!p) return false;
		if (!p.type.isAnonymous) {
			if (context[i] && context[i] != p.name) return false;
			i--;
		}
	}
	return true;
}
function iterStack(heads) {
	if (!heads.length) return null;
	let pick = 0, picked = heads[0];
	for (let i = 1; i < heads.length; i++) {
		let node = heads[i];
		if (node.from > picked.from || node.to < picked.to) {
			picked = node;
			pick = i;
		}
	}
	let next = picked instanceof TreeNode && picked.index < 0 ? null : picked.parent;
	let newHeads = heads.slice();
	if (next) newHeads[pick] = next;
	else newHeads.splice(pick, 1);
	return new StackIterator(newHeads, picked);
}
function stackIterator(tree, pos, side) {
	let inner = tree.resolveInner(pos, side), layers = null;
	for (let scan = inner instanceof TreeNode ? inner : inner.context.parent; scan; scan = scan.parent) if (scan.index < 0) {
		let parent = scan.parent;
		(layers || (layers = [inner])).push(parent.resolve(pos, side));
		scan = parent;
	} else {
		let mount = MountedTree.get(scan.tree);
		if (mount && mount.overlay && mount.overlay[0].from <= pos && mount.overlay[mount.overlay.length - 1].to >= pos) {
			let root = new TreeNode(mount.tree, mount.overlay[0].from + scan.from, -1, scan);
			(layers || (layers = [inner])).push(resolveNode(root, pos, side, false));
		}
	}
	return layers ? iterStack(layers) : inner;
}
function hasChild(tree) {
	return tree.children.some((ch) => ch instanceof TreeBuffer || !ch.type.isAnonymous || hasChild(ch));
}
function buildTree(data) {
	var _a;
	let { buffer, nodeSet, maxBufferLength = DefaultBufferLength, reused = [], minRepeatType = nodeSet.types.length } = data;
	let cursor = Array.isArray(buffer) ? new FlatBufferCursor(buffer, buffer.length) : buffer;
	let types = nodeSet.types;
	let contextHash = 0, lookAhead = 0;
	function takeNode(parentStart, minPos, children, positions, inRepeat, depth) {
		let { id, start, end, size } = cursor;
		let lookAheadAtStart = lookAhead, contextAtStart = contextHash;
		if (size < 0) {
			cursor.next();
			if (size == -1) {
				let node = reused[id];
				children.push(node);
				positions.push(start - parentStart);
				return;
			} else if (size == -3) {
				contextHash = id;
				return;
			} else if (size == -4) {
				lookAhead = id;
				return;
			} else throw new RangeError(`Unrecognized record size: ${size}`);
		}
		let type = types[id], node, buffer;
		let startPos = start - parentStart;
		if (end - start <= maxBufferLength && (buffer = findBufferSize(cursor.pos - minPos, inRepeat))) {
			let data = new Uint16Array(buffer.size - buffer.skip);
			let endPos = cursor.pos - buffer.size, index = data.length;
			while (cursor.pos > endPos) index = copyToBuffer(buffer.start, data, index);
			node = new TreeBuffer(data, end - buffer.start, nodeSet);
			startPos = buffer.start - parentStart;
		} else {
			let endPos = cursor.pos - size;
			cursor.next();
			let localChildren = [], localPositions = [];
			let localInRepeat = id >= minRepeatType ? id : -1;
			let lastGroup = 0, lastEnd = end;
			while (cursor.pos > endPos) if (localInRepeat >= 0 && cursor.id == localInRepeat && cursor.size >= 0) {
				if (cursor.end <= lastEnd - maxBufferLength) {
					makeRepeatLeaf(localChildren, localPositions, start, lastGroup, cursor.end, lastEnd, localInRepeat, lookAheadAtStart, contextAtStart);
					lastGroup = localChildren.length;
					lastEnd = cursor.end;
				}
				cursor.next();
			} else if (depth > 2500) takeFlatNode(start, endPos, localChildren, localPositions);
			else takeNode(start, endPos, localChildren, localPositions, localInRepeat, depth + 1);
			if (localInRepeat >= 0 && lastGroup > 0 && lastGroup < localChildren.length) makeRepeatLeaf(localChildren, localPositions, start, lastGroup, start, lastEnd, localInRepeat, lookAheadAtStart, contextAtStart);
			localChildren.reverse();
			localPositions.reverse();
			if (localInRepeat > -1 && lastGroup > 0) {
				let make = makeBalanced(type, contextAtStart);
				node = balanceRange(type, localChildren, localPositions, 0, localChildren.length, 0, end - start, make, make);
			} else node = makeTree(type, localChildren, localPositions, end - start, lookAheadAtStart - end, contextAtStart);
		}
		children.push(node);
		positions.push(startPos);
	}
	function takeFlatNode(parentStart, minPos, children, positions) {
		let nodes = [];
		let nodeCount = 0, stopAt = -1;
		while (cursor.pos > minPos) {
			let { id, start, end, size } = cursor;
			if (size > 4) cursor.next();
			else if (stopAt > -1 && start < stopAt) break;
			else {
				if (stopAt < 0) stopAt = end - maxBufferLength;
				nodes.push(id, start, end);
				nodeCount++;
				cursor.next();
			}
		}
		if (nodeCount) {
			let buffer = new Uint16Array(nodeCount * 4);
			let start = nodes[nodes.length - 2];
			for (let i = nodes.length - 3, j = 0; i >= 0; i -= 3) {
				buffer[j++] = nodes[i];
				buffer[j++] = nodes[i + 1] - start;
				buffer[j++] = nodes[i + 2] - start;
				buffer[j++] = j;
			}
			children.push(new TreeBuffer(buffer, nodes[2] - start, nodeSet));
			positions.push(start - parentStart);
		}
	}
	function makeBalanced(type, contextHash) {
		return (children, positions, length) => {
			let lookAhead = 0, lastI = children.length - 1, last, lookAheadProp;
			if (lastI >= 0 && (last = children[lastI]) instanceof Tree) {
				if (!lastI && last.type == type && last.length == length) return last;
				if (lookAheadProp = last.prop(NodeProp.lookAhead)) lookAhead = positions[lastI] + last.length + lookAheadProp;
			}
			return makeTree(type, children, positions, length, lookAhead, contextHash);
		};
	}
	function makeRepeatLeaf(children, positions, base, i, from, to, type, lookAhead, contextHash) {
		let localChildren = [], localPositions = [];
		while (children.length > i) {
			localChildren.push(children.pop());
			localPositions.push(positions.pop() + base - from);
		}
		children.push(makeTree(nodeSet.types[type], localChildren, localPositions, to - from, lookAhead - to, contextHash));
		positions.push(from - base);
	}
	function makeTree(type, children, positions, length, lookAhead, contextHash, props) {
		if (contextHash) {
			let pair = [NodeProp.contextHash, contextHash];
			props = props ? [pair].concat(props) : [pair];
		}
		if (lookAhead > 25) {
			let pair = [NodeProp.lookAhead, lookAhead];
			props = props ? [pair].concat(props) : [pair];
		}
		return new Tree(type, children, positions, length, props);
	}
	function findBufferSize(maxSize, inRepeat) {
		let fork = cursor.fork();
		let size = 0, start = 0, skip = 0, minStart = fork.end - maxBufferLength;
		let result = {
			size: 0,
			start: 0,
			skip: 0
		};
		scan: for (let minPos = fork.pos - maxSize; fork.pos > minPos;) {
			let nodeSize = fork.size;
			if (fork.id == inRepeat && nodeSize >= 0) {
				result.size = size;
				result.start = start;
				result.skip = skip;
				skip += 4;
				size += 4;
				fork.next();
				continue;
			}
			let startPos = fork.pos - nodeSize;
			if (nodeSize < 0 || startPos < minPos || fork.start < minStart) break;
			let localSkipped = fork.id >= minRepeatType ? 4 : 0;
			let nodeStart = fork.start;
			fork.next();
			while (fork.pos > startPos) {
				if (fork.size < 0) {
					if (fork.size == -3 || fork.size == -4) localSkipped += 4;
					else break scan;
				} else if (fork.id >= minRepeatType) localSkipped += 4;
				fork.next();
			}
			start = nodeStart;
			size += nodeSize;
			skip += localSkipped;
		}
		if (inRepeat < 0 || size == maxSize) {
			result.size = size;
			result.start = start;
			result.skip = skip;
		}
		return result.size > 4 ? result : void 0;
	}
	function copyToBuffer(bufferStart, buffer, index) {
		let { id, start, end, size } = cursor;
		cursor.next();
		if (size >= 0 && id < minRepeatType) {
			let startIndex = index;
			if (size > 4) {
				let endPos = cursor.pos - (size - 4);
				while (cursor.pos > endPos) index = copyToBuffer(bufferStart, buffer, index);
			}
			buffer[--index] = startIndex;
			buffer[--index] = end - bufferStart;
			buffer[--index] = start - bufferStart;
			buffer[--index] = id;
		} else if (size == -3) contextHash = id;
		else if (size == -4) lookAhead = id;
		return index;
	}
	let children = [], positions = [];
	while (cursor.pos > 0) takeNode(data.start || 0, data.bufferStart || 0, children, positions, -1, 0);
	let length = (_a = data.length) !== null && _a !== void 0 ? _a : children.length ? positions[0] + children[0].length : 0;
	return new Tree(types[data.topID], children.reverse(), positions.reverse(), length);
}
function nodeSize(balanceType, node) {
	if (!balanceType.isAnonymous || node instanceof TreeBuffer || node.type != balanceType) return 1;
	let size = nodeSizeCache.get(node);
	if (size == null) {
		size = 1;
		for (let child of node.children) {
			if (child.type != balanceType || !(child instanceof Tree)) {
				size = 1;
				break;
			}
			size += nodeSize(balanceType, child);
		}
		nodeSizeCache.set(node, size);
	}
	return size;
}
function balanceRange(balanceType, children, positions, from, to, start, length, mkTop, mkTree) {
	let total = 0;
	for (let i = from; i < to; i++) total += nodeSize(balanceType, children[i]);
	let maxChild = Math.ceil(total * 1.5 / 8);
	let localChildren = [], localPositions = [];
	function divide(children, positions, from, to, offset) {
		for (let i = from; i < to;) {
			let groupFrom = i, groupStart = positions[i], groupSize = nodeSize(balanceType, children[i]);
			i++;
			for (; i < to; i++) {
				let nextSize = nodeSize(balanceType, children[i]);
				if (groupSize + nextSize >= maxChild) break;
				groupSize += nextSize;
			}
			if (i == groupFrom + 1) {
				if (groupSize > maxChild) {
					let only = children[groupFrom];
					divide(only.children, only.positions, 0, only.children.length, positions[groupFrom] + offset);
					continue;
				}
				localChildren.push(children[groupFrom]);
			} else {
				let length = positions[i - 1] + children[i - 1].length - groupStart;
				localChildren.push(balanceRange(balanceType, children, positions, groupFrom, i, groupStart, length, null, mkTree));
			}
			localPositions.push(groupStart + offset - start);
		}
	}
	divide(children, positions, from, to, 0);
	return (mkTop || mkTree)(localChildren, localPositions, length);
}
function parseMixed(nest) {
	return (parse, input, fragments, ranges) => new MixedParse(parse, nest, input, fragments, ranges);
}
function checkRanges(ranges) {
	if (!ranges.length || ranges.some((r) => r.from >= r.to)) throw new RangeError("Invalid inner parse ranges given: " + JSON.stringify(ranges));
}
function checkCover(covered, from, to) {
	for (let range of covered) {
		if (range.from >= to) break;
		if (range.to > from) return range.from <= from && range.to >= to ? 2 : 1;
	}
	return 0;
}
function sliceBuf(buf, startI, endI, nodes, positions, off) {
	if (startI < endI) {
		let from = buf.buffer[startI + 1];
		nodes.push(buf.slice(startI, endI, from));
		positions.push(from - off);
	}
}
function materialize(cursor) {
	let { node } = cursor, stack = [];
	let buffer = node.context.buffer;
	do {
		stack.push(cursor.index);
		cursor.parent();
	} while (!cursor.tree);
	let base = cursor.tree, i = base.children.indexOf(buffer);
	let buf = base.children[i], b = buf.buffer, newStack = [i];
	function split(startI, endI, type, innerOffset, length, stackPos) {
		let targetI = stack[stackPos];
		let children = [], positions = [];
		sliceBuf(buf, startI, targetI, children, positions, innerOffset);
		let from = b[targetI + 1], to = b[targetI + 2];
		newStack.push(children.length);
		let child = stackPos ? split(targetI + 4, b[targetI + 3], buf.set.types[b[targetI]], from, to - from, stackPos - 1) : node.toTree();
		children.push(child);
		positions.push(from - innerOffset);
		sliceBuf(buf, b[targetI + 3], endI, children, positions, innerOffset);
		return new Tree(type, children, positions, length);
	}
	base.children[i] = split(0, b.length, NodeType.none, 0, buf.length, stack.length - 1);
	for (let index of newStack) {
		let tree = cursor.tree.children[index], pos = cursor.tree.positions[index];
		cursor.yield(new TreeNode(tree, pos + cursor.from, index, cursor._tree));
	}
}
function punchRanges(outer, ranges) {
	let copy = null, current = ranges;
	for (let i = 1, j = 0; i < outer.length; i++) {
		let gapFrom = outer[i - 1].to, gapTo = outer[i].from;
		for (; j < current.length; j++) {
			let r = current[j];
			if (r.from >= gapTo) break;
			if (r.to <= gapFrom) continue;
			if (!copy) current = copy = ranges.slice();
			if (r.from < gapFrom) {
				copy[j] = new Range(r.from, gapFrom);
				if (r.to > gapTo) copy.splice(j + 1, 0, new Range(gapTo, r.to));
			} else if (r.to > gapTo) copy[j--] = new Range(gapTo, r.to);
			else copy.splice(j--, 1);
		}
	}
	return current;
}
function findCoverChanges(a, b, from, to) {
	let iA = 0, iB = 0, inA = false, inB = false, pos = -1e9;
	let result = [];
	for (;;) {
		let nextA = iA == a.length ? 1e9 : inA ? a[iA].to : a[iA].from;
		let nextB = iB == b.length ? 1e9 : inB ? b[iB].to : b[iB].from;
		if (inA != inB) {
			let start = Math.max(pos, from), end = Math.min(nextA, nextB, to);
			if (start < end) result.push(new Range(start, end));
		}
		pos = Math.min(nextA, nextB);
		if (pos == 1e9) break;
		if (nextA == pos) {
			if (!inA) inA = true;
			else {
				inA = false;
				iA++;
			}
		}
		if (nextB == pos) {
			if (!inB) inB = true;
			else {
				inB = false;
				iB++;
			}
		}
	}
	return result;
}
function enterFragments(mounts, ranges) {
	let result = [];
	for (let { pos, mount, frag } of mounts) {
		let startPos = pos + (mount.overlay ? mount.overlay[0].from : 0), endPos = startPos + mount.tree.length;
		let from = Math.max(frag.from, startPos), to = Math.min(frag.to, endPos);
		if (mount.overlay) {
			let changes = findCoverChanges(ranges, mount.overlay.map((r) => new Range(r.from + pos, r.to + pos)), from, to);
			for (let i = 0, pos = from;; i++) {
				let last = i == changes.length, end = last ? to : changes[i].from;
				if (end > pos) result.push(new TreeFragment(pos, end, mount.tree, -startPos, frag.from >= pos || frag.openStart, frag.to <= end || frag.openEnd));
				if (last) break;
				pos = changes[i].to;
			}
		} else result.push(new TreeFragment(from, to, mount.tree, -startPos, frag.from >= startPos || frag.openStart, frag.to <= endPos || frag.openEnd));
	}
	return result;
}
var DefaultBufferLength, nextPropID, Range, NodeProp, MountedTree, noProps, NodeType, NodeSet, CachedNode, CachedInnerNode, IterMode, Tree, FlatBufferCursor, TreeBuffer, BaseNode, TreeNode, BufferContext, BufferNode, StackIterator, TreeCursor, nodeSizeCache, TreeFragment, Parser, StringInput, InnerParse, ActiveOverlay, stoppedInner, MixedParse, StructureCursor, FragmentCursor$1;
var init_dist$3 = __esmMin((() => {
	DefaultBufferLength = 1024;
	nextPropID = 0;
	Range = class {
		constructor(from, to) {
			this.from = from;
			this.to = to;
		}
	};
	NodeProp = class {
		constructor(config = {}) {
			this.id = nextPropID++;
			this.perNode = !!config.perNode;
			this.deserialize = config.deserialize || (() => {
				throw new Error("This node type doesn't define a deserialize function");
			});
			this.combine = config.combine || null;
		}
		add(match) {
			if (this.perNode) throw new RangeError("Can't add per-node props to node types");
			if (typeof match != "function") match = NodeType.match(match);
			return (type) => {
				let result = match(type);
				return result === void 0 ? null : [this, result];
			};
		}
	};
	NodeProp.closedBy = new NodeProp({ deserialize: (str) => str.split(" ") });
	NodeProp.openedBy = new NodeProp({ deserialize: (str) => str.split(" ") });
	NodeProp.group = new NodeProp({ deserialize: (str) => str.split(" ") });
	NodeProp.isolate = new NodeProp({ deserialize: (value) => {
		if (value && value != "rtl" && value != "ltr" && value != "auto") throw new RangeError("Invalid value for isolate: " + value);
		return value || "auto";
	} });
	NodeProp.contextHash = new NodeProp({ perNode: true });
	NodeProp.lookAhead = new NodeProp({ perNode: true });
	NodeProp.mounted = new NodeProp({ perNode: true });
	MountedTree = class {
		constructor(tree, overlay, parser, bracketed = false) {
			this.tree = tree;
			this.overlay = overlay;
			this.parser = parser;
			this.bracketed = bracketed;
		}
		static get(tree) {
			return tree && tree.props && tree.props[NodeProp.mounted.id];
		}
	};
	noProps = Object.create(null);
	NodeType = class NodeType {
		constructor(name, props, id, flags = 0) {
			this.name = name;
			this.props = props;
			this.id = id;
			this.flags = flags;
		}
		static define(spec) {
			let props = spec.props && spec.props.length ? Object.create(null) : noProps;
			let flags = (spec.top ? 1 : 0) | (spec.skipped ? 2 : 0) | (spec.error ? 4 : 0) | (spec.name == null ? 8 : 0);
			let type = new NodeType(spec.name || "", props, spec.id, flags);
			if (spec.props) for (let src of spec.props) {
				if (!Array.isArray(src)) src = src(type);
				if (src) {
					if (src[0].perNode) throw new RangeError("Can't store a per-node prop on a node type");
					props[src[0].id] = src[1];
				}
			}
			return type;
		}
		prop(prop) {
			return this.props[prop.id];
		}
		get isTop() {
			return (this.flags & 1) > 0;
		}
		get isSkipped() {
			return (this.flags & 2) > 0;
		}
		get isError() {
			return (this.flags & 4) > 0;
		}
		get isAnonymous() {
			return (this.flags & 8) > 0;
		}
		is(name) {
			if (typeof name == "string") {
				if (this.name == name) return true;
				let group = this.prop(NodeProp.group);
				return group ? group.indexOf(name) > -1 : false;
			}
			return this.id == name;
		}
		static match(map) {
			let direct = Object.create(null);
			for (let prop in map) for (let name of prop.split(" ")) direct[name] = map[prop];
			return (node) => {
				for (let groups = node.prop(NodeProp.group), i = -1; i < (groups ? groups.length : 0); i++) {
					let found = direct[i < 0 ? node.name : groups[i]];
					if (found) return found;
				}
			};
		}
	};
	NodeType.none = new NodeType("", Object.create(null), 0, 8);
	NodeSet = class NodeSet {
		constructor(types) {
			this.types = types;
			for (let i = 0; i < types.length; i++) if (types[i].id != i) throw new RangeError("Node type ids should correspond to array positions when creating a node set");
		}
		extend(...props) {
			let newTypes = [];
			for (let type of this.types) {
				let newProps = null;
				for (let source of props) {
					let add = source(type);
					if (add) {
						if (!newProps) newProps = Object.assign({}, type.props);
						let value = add[1], prop = add[0];
						if (prop.combine && prop.id in newProps) value = prop.combine(newProps[prop.id], value);
						newProps[prop.id] = value;
					}
				}
				newTypes.push(newProps ? new NodeType(type.name, newProps, type.id, type.flags) : type);
			}
			return new NodeSet(newTypes);
		}
	};
	CachedNode = new WeakMap();
	CachedInnerNode = new WeakMap();
	(function(IterMode) {
		IterMode[IterMode["ExcludeBuffers"] = 1] = "ExcludeBuffers";
		IterMode[IterMode["IncludeAnonymous"] = 2] = "IncludeAnonymous";
		IterMode[IterMode["IgnoreMounts"] = 4] = "IgnoreMounts";
		IterMode[IterMode["IgnoreOverlays"] = 8] = "IgnoreOverlays";
		IterMode[IterMode["EnterBracketed"] = 16] = "EnterBracketed";
	})(IterMode || (IterMode = {}));
	Tree = class Tree {
		constructor(type, children, positions, length, props) {
			this.type = type;
			this.children = children;
			this.positions = positions;
			this.length = length;
			this.props = null;
			if (props && props.length) {
				this.props = Object.create(null);
				for (let [prop, value] of props) this.props[typeof prop == "number" ? prop : prop.id] = value;
			}
		}
		toString() {
			let mounted = MountedTree.get(this);
			if (mounted && !mounted.overlay) return mounted.tree.toString();
			let children = "";
			for (let ch of this.children) {
				let str = ch.toString();
				if (str) {
					if (children) children += ",";
					children += str;
				}
			}
			return !this.type.name ? children : (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (children.length ? "(" + children + ")" : "");
		}
		cursor(mode = 0) {
			return new TreeCursor(this.topNode, mode);
		}
		cursorAt(pos, side = 0, mode = 0) {
			let scope = CachedNode.get(this) || this.topNode;
			let cursor = new TreeCursor(scope);
			cursor.moveTo(pos, side);
			CachedNode.set(this, cursor._tree);
			return cursor;
		}
		get topNode() {
			return new TreeNode(this, 0, 0, null);
		}
		resolve(pos, side = 0) {
			let node = resolveNode(CachedNode.get(this) || this.topNode, pos, side, false);
			CachedNode.set(this, node);
			return node;
		}
		resolveInner(pos, side = 0) {
			let node = resolveNode(CachedInnerNode.get(this) || this.topNode, pos, side, true);
			CachedInnerNode.set(this, node);
			return node;
		}
		resolveStack(pos, side = 0) {
			return stackIterator(this, pos, side);
		}
		iterate(spec) {
			let { enter, leave, from = 0, to = this.length } = spec;
			let mode = spec.mode || 0, anon = (mode & IterMode.IncludeAnonymous) > 0;
			for (let c = this.cursor(mode | IterMode.IncludeAnonymous);;) {
				let entered = false;
				if (c.from <= to && c.to >= from && (!anon && c.type.isAnonymous || enter(c) !== false)) {
					if (c.firstChild()) continue;
					entered = true;
				}
				for (;;) {
					if (entered && leave && (anon || !c.type.isAnonymous)) leave(c);
					if (c.nextSibling()) break;
					if (!c.parent()) return;
					entered = true;
				}
			}
		}
		prop(prop) {
			return !prop.perNode ? this.type.prop(prop) : this.props ? this.props[prop.id] : void 0;
		}
		get propValues() {
			let result = [];
			if (this.props) for (let id in this.props) result.push([+id, this.props[id]]);
			return result;
		}
		balance(config = {}) {
			return this.children.length <= 8 ? this : balanceRange(NodeType.none, this.children, this.positions, 0, this.children.length, 0, this.length, (children, positions, length) => new Tree(this.type, children, positions, length, this.propValues), config.makeTree || ((children, positions, length) => new Tree(NodeType.none, children, positions, length)));
		}
		static build(data) {
			return buildTree(data);
		}
	};
	Tree.empty = new Tree(NodeType.none, [], [], 0);
	FlatBufferCursor = class FlatBufferCursor {
		constructor(buffer, index) {
			this.buffer = buffer;
			this.index = index;
		}
		get id() {
			return this.buffer[this.index - 4];
		}
		get start() {
			return this.buffer[this.index - 3];
		}
		get end() {
			return this.buffer[this.index - 2];
		}
		get size() {
			return this.buffer[this.index - 1];
		}
		get pos() {
			return this.index;
		}
		next() {
			this.index -= 4;
		}
		fork() {
			return new FlatBufferCursor(this.buffer, this.index);
		}
	};
	TreeBuffer = class TreeBuffer {
		constructor(buffer, length, set) {
			this.buffer = buffer;
			this.length = length;
			this.set = set;
		}
		get type() {
			return NodeType.none;
		}
		toString() {
			let result = [];
			for (let index = 0; index < this.buffer.length;) {
				result.push(this.childString(index));
				index = this.buffer[index + 3];
			}
			return result.join(",");
		}
		childString(index) {
			let id = this.buffer[index], endIndex = this.buffer[index + 3];
			let type = this.set.types[id], result = type.name;
			if (/\W/.test(result) && !type.isError) result = JSON.stringify(result);
			index += 4;
			if (endIndex == index) return result;
			let children = [];
			while (index < endIndex) {
				children.push(this.childString(index));
				index = this.buffer[index + 3];
			}
			return result + "(" + children.join(",") + ")";
		}
		findChild(startIndex, endIndex, dir, pos, side) {
			let { buffer } = this, pick = -1;
			for (let i = startIndex; i != endIndex; i = buffer[i + 3]) if (checkSide(side, pos, buffer[i + 1], buffer[i + 2])) {
				pick = i;
				if (dir > 0) break;
			}
			return pick;
		}
		slice(startI, endI, from) {
			let b = this.buffer;
			let copy = new Uint16Array(endI - startI), len = 0;
			for (let i = startI, j = 0; i < endI;) {
				copy[j++] = b[i++];
				copy[j++] = b[i++] - from;
				let to = copy[j++] = b[i++] - from;
				copy[j++] = b[i++] - startI;
				len = Math.max(len, to);
			}
			return new TreeBuffer(copy, len, this.set);
		}
	};
	BaseNode = class {
		cursor(mode = 0) {
			return new TreeCursor(this, mode);
		}
		getChild(type, before = null, after = null) {
			let r = getChildren(this, type, before, after);
			return r.length ? r[0] : null;
		}
		getChildren(type, before = null, after = null) {
			return getChildren(this, type, before, after);
		}
		resolve(pos, side = 0) {
			return resolveNode(this, pos, side, false);
		}
		resolveInner(pos, side = 0) {
			return resolveNode(this, pos, side, true);
		}
		matchContext(context) {
			return matchNodeContext(this.parent, context);
		}
		enterUnfinishedNodesBefore(pos) {
			let scan = this.childBefore(pos), node = this;
			while (scan) {
				let last = scan.lastChild;
				if (!last || last.to != scan.to) break;
				if (last.type.isError && last.from == last.to) {
					node = scan;
					scan = last.prevSibling;
				} else scan = last;
			}
			return node;
		}
		get node() {
			return this;
		}
		get next() {
			return this.parent;
		}
	};
	TreeNode = class TreeNode extends BaseNode {
		constructor(_tree, from, index, _parent) {
			super();
			this._tree = _tree;
			this.from = from;
			this.index = index;
			this._parent = _parent;
		}
		get type() {
			return this._tree.type;
		}
		get name() {
			return this._tree.type.name;
		}
		get to() {
			return this.from + this._tree.length;
		}
		nextChild(i, dir, pos, side, mode = 0) {
			for (let parent = this;;) {
				for (let { children, positions } = parent._tree, e = dir > 0 ? children.length : -1; i != e; i += dir) {
					let next = children[i], start = positions[i] + parent.from, mounted;
					if (!(mode & IterMode.EnterBracketed && next instanceof Tree && (mounted = MountedTree.get(next)) && !mounted.overlay && mounted.bracketed && pos >= start && pos <= start + next.length) && !checkSide(side, pos, start, start + next.length)) continue;
					if (next instanceof TreeBuffer) {
						if (mode & IterMode.ExcludeBuffers) continue;
						let index = next.findChild(0, next.buffer.length, dir, pos - start, side);
						if (index > -1) return new BufferNode(new BufferContext(parent, next, i, start), null, index);
					} else if (mode & IterMode.IncludeAnonymous || !next.type.isAnonymous || hasChild(next)) {
						let mounted;
						if (!(mode & IterMode.IgnoreMounts) && (mounted = MountedTree.get(next)) && !mounted.overlay) return new TreeNode(mounted.tree, start, i, parent);
						let inner = new TreeNode(next, start, i, parent);
						return mode & IterMode.IncludeAnonymous || !inner.type.isAnonymous ? inner : inner.nextChild(dir < 0 ? next.children.length - 1 : 0, dir, pos, side, mode);
					}
				}
				if (mode & IterMode.IncludeAnonymous || !parent.type.isAnonymous) return null;
				if (parent.index >= 0) i = parent.index + dir;
				else i = dir < 0 ? -1 : parent._parent._tree.children.length;
				parent = parent._parent;
				if (!parent) return null;
			}
		}
		get firstChild() {
			return this.nextChild(0, 1, 0, 4);
		}
		get lastChild() {
			return this.nextChild(this._tree.children.length - 1, -1, 0, 4);
		}
		childAfter(pos) {
			return this.nextChild(0, 1, pos, 2);
		}
		childBefore(pos) {
			return this.nextChild(this._tree.children.length - 1, -1, pos, -2);
		}
		prop(prop) {
			return this._tree.prop(prop);
		}
		enter(pos, side, mode = 0) {
			let mounted;
			if (!(mode & IterMode.IgnoreOverlays) && (mounted = MountedTree.get(this._tree)) && mounted.overlay) {
				let rPos = pos - this.from, enterBracketed = mode & IterMode.EnterBracketed && mounted.bracketed;
				for (let { from, to } of mounted.overlay) if ((side > 0 || enterBracketed ? from <= rPos : from < rPos) && (side < 0 || enterBracketed ? to >= rPos : to > rPos)) return new TreeNode(mounted.tree, mounted.overlay[0].from + this.from, -1, this);
			}
			return this.nextChild(0, 1, pos, side, mode);
		}
		nextSignificantParent() {
			let val = this;
			while (val.type.isAnonymous && val._parent) val = val._parent;
			return val;
		}
		get parent() {
			return this._parent ? this._parent.nextSignificantParent() : null;
		}
		get nextSibling() {
			return this._parent && this.index >= 0 ? this._parent.nextChild(this.index + 1, 1, 0, 4) : null;
		}
		get prevSibling() {
			return this._parent && this.index >= 0 ? this._parent.nextChild(this.index - 1, -1, 0, 4) : null;
		}
		get tree() {
			return this._tree;
		}
		toTree() {
			return this._tree;
		}
		toString() {
			return this._tree.toString();
		}
	};
	BufferContext = class {
		constructor(parent, buffer, index, start) {
			this.parent = parent;
			this.buffer = buffer;
			this.index = index;
			this.start = start;
		}
	};
	BufferNode = class BufferNode extends BaseNode {
		get name() {
			return this.type.name;
		}
		get from() {
			return this.context.start + this.context.buffer.buffer[this.index + 1];
		}
		get to() {
			return this.context.start + this.context.buffer.buffer[this.index + 2];
		}
		constructor(context, _parent, index) {
			super();
			this.context = context;
			this._parent = _parent;
			this.index = index;
			this.type = context.buffer.set.types[context.buffer.buffer[index]];
		}
		child(dir, pos, side) {
			let { buffer } = this.context;
			let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, pos - this.context.start, side);
			return index < 0 ? null : new BufferNode(this.context, this, index);
		}
		get firstChild() {
			return this.child(1, 0, 4);
		}
		get lastChild() {
			return this.child(-1, 0, 4);
		}
		childAfter(pos) {
			return this.child(1, pos, 2);
		}
		childBefore(pos) {
			return this.child(-1, pos, -2);
		}
		prop(prop) {
			return this.type.prop(prop);
		}
		enter(pos, side, mode = 0) {
			if (mode & IterMode.ExcludeBuffers) return null;
			let { buffer } = this.context;
			let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], side > 0 ? 1 : -1, pos - this.context.start, side);
			return index < 0 ? null : new BufferNode(this.context, this, index);
		}
		get parent() {
			return this._parent || this.context.parent.nextSignificantParent();
		}
		externalSibling(dir) {
			return this._parent ? null : this.context.parent.nextChild(this.context.index + dir, dir, 0, 4);
		}
		get nextSibling() {
			let { buffer } = this.context;
			let after = buffer.buffer[this.index + 3];
			if (after < (this._parent ? buffer.buffer[this._parent.index + 3] : buffer.buffer.length)) return new BufferNode(this.context, this._parent, after);
			return this.externalSibling(1);
		}
		get prevSibling() {
			let { buffer } = this.context;
			let parentStart = this._parent ? this._parent.index + 4 : 0;
			if (this.index == parentStart) return this.externalSibling(-1);
			return new BufferNode(this.context, this._parent, buffer.findChild(parentStart, this.index, -1, 0, 4));
		}
		get tree() {
			return null;
		}
		toTree() {
			let children = [], positions = [];
			let { buffer } = this.context;
			let startI = this.index + 4, endI = buffer.buffer[this.index + 3];
			if (endI > startI) {
				let from = buffer.buffer[this.index + 1];
				children.push(buffer.slice(startI, endI, from));
				positions.push(0);
			}
			return new Tree(this.type, children, positions, this.to - this.from);
		}
		toString() {
			return this.context.buffer.childString(this.index);
		}
	};
	StackIterator = class {
		constructor(heads, node) {
			this.heads = heads;
			this.node = node;
		}
		get next() {
			return iterStack(this.heads);
		}
	};
	TreeCursor = class {
		get name() {
			return this.type.name;
		}
		constructor(node, mode = 0) {
			this.buffer = null;
			this.stack = [];
			this.index = 0;
			this.bufferNode = null;
			this.mode = mode & ~IterMode.EnterBracketed;
			if (node instanceof TreeNode) this.yieldNode(node);
			else {
				this._tree = node.context.parent;
				this.buffer = node.context;
				for (let n = node._parent; n; n = n._parent) this.stack.unshift(n.index);
				this.bufferNode = node;
				this.yieldBuf(node.index);
			}
		}
		yieldNode(node) {
			if (!node) return false;
			this._tree = node;
			this.type = node.type;
			this.from = node.from;
			this.to = node.to;
			return true;
		}
		yieldBuf(index, type) {
			this.index = index;
			let { start, buffer } = this.buffer;
			this.type = type || buffer.set.types[buffer.buffer[index]];
			this.from = start + buffer.buffer[index + 1];
			this.to = start + buffer.buffer[index + 2];
			return true;
		}
		yield(node) {
			if (!node) return false;
			if (node instanceof TreeNode) {
				this.buffer = null;
				return this.yieldNode(node);
			}
			this.buffer = node.context;
			return this.yieldBuf(node.index, node.type);
		}
		toString() {
			return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
		}
		enterChild(dir, pos, side) {
			if (!this.buffer) return this.yield(this._tree.nextChild(dir < 0 ? this._tree._tree.children.length - 1 : 0, dir, pos, side, this.mode));
			let { buffer } = this.buffer;
			let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, pos - this.buffer.start, side);
			if (index < 0) return false;
			this.stack.push(this.index);
			return this.yieldBuf(index);
		}
		firstChild() {
			return this.enterChild(1, 0, 4);
		}
		lastChild() {
			return this.enterChild(-1, 0, 4);
		}
		childAfter(pos) {
			return this.enterChild(1, pos, 2);
		}
		childBefore(pos) {
			return this.enterChild(-1, pos, -2);
		}
		enter(pos, side, mode = this.mode) {
			if (!this.buffer) return this.yield(this._tree.enter(pos, side, mode));
			return mode & IterMode.ExcludeBuffers ? false : this.enterChild(1, pos, side);
		}
		parent() {
			if (!this.buffer) return this.yieldNode(this.mode & IterMode.IncludeAnonymous ? this._tree._parent : this._tree.parent);
			if (this.stack.length) return this.yieldBuf(this.stack.pop());
			let parent = this.mode & IterMode.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
			this.buffer = null;
			return this.yieldNode(parent);
		}
		sibling(dir) {
			if (!this.buffer) return !this._tree._parent ? false : this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + dir, dir, 0, 4, this.mode));
			let { buffer } = this.buffer, d = this.stack.length - 1;
			if (dir < 0) {
				let parentStart = d < 0 ? 0 : this.stack[d] + 4;
				if (this.index != parentStart) return this.yieldBuf(buffer.findChild(parentStart, this.index, -1, 0, 4));
			} else {
				let after = buffer.buffer[this.index + 3];
				if (after < (d < 0 ? buffer.buffer.length : buffer.buffer[this.stack[d] + 3])) return this.yieldBuf(after);
			}
			return d < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + dir, dir, 0, 4, this.mode)) : false;
		}
		nextSibling() {
			return this.sibling(1);
		}
		prevSibling() {
			return this.sibling(-1);
		}
		atLastNode(dir) {
			let index, parent, { buffer } = this;
			if (buffer) {
				if (dir > 0) {
					if (this.index < buffer.buffer.buffer.length) return false;
				} else for (let i = 0; i < this.index; i++) if (buffer.buffer.buffer[i + 3] < this.index) return false;
				({index, parent} = buffer);
			} else ({index, _parent: parent} = this._tree);
			for (; parent; {index, _parent: parent} = parent) if (index > -1) for (let i = index + dir, e = dir < 0 ? -1 : parent._tree.children.length; i != e; i += dir) {
				let child = parent._tree.children[i];
				if (this.mode & IterMode.IncludeAnonymous || child instanceof TreeBuffer || !child.type.isAnonymous || hasChild(child)) return false;
			}
			return true;
		}
		move(dir, enter) {
			if (enter && this.enterChild(dir, 0, 4)) return true;
			for (;;) {
				if (this.sibling(dir)) return true;
				if (this.atLastNode(dir) || !this.parent()) return false;
			}
		}
		next(enter = true) {
			return this.move(1, enter);
		}
		prev(enter = true) {
			return this.move(-1, enter);
		}
		moveTo(pos, side = 0) {
			while (this.from == this.to || (side < 1 ? this.from >= pos : this.from > pos) || (side > -1 ? this.to <= pos : this.to < pos)) if (!this.parent()) break;
			while (this.enterChild(1, pos, side));
			return this;
		}
		get node() {
			if (!this.buffer) return this._tree;
			let cache = this.bufferNode, result = null, depth = 0;
			if (cache && cache.context == this.buffer) scan: for (let index = this.index, d = this.stack.length; d >= 0;) {
				for (let c = cache; c; c = c._parent) if (c.index == index) {
					if (index == this.index) return c;
					result = c;
					depth = d + 1;
					break scan;
				}
				index = this.stack[--d];
			}
			for (let i = depth; i < this.stack.length; i++) result = new BufferNode(this.buffer, result, this.stack[i]);
			return this.bufferNode = new BufferNode(this.buffer, result, this.index);
		}
		get tree() {
			return this.buffer ? null : this._tree._tree;
		}
		iterate(enter, leave) {
			for (let depth = 0;;) {
				let mustLeave = false;
				if (this.type.isAnonymous || enter(this) !== false) {
					if (this.firstChild()) {
						depth++;
						continue;
					}
					if (!this.type.isAnonymous) mustLeave = true;
				}
				for (;;) {
					if (mustLeave && leave) leave(this);
					mustLeave = this.type.isAnonymous;
					if (!depth) return;
					if (this.nextSibling()) break;
					this.parent();
					depth--;
					mustLeave = true;
				}
			}
		}
		matchContext(context) {
			if (!this.buffer) return matchNodeContext(this.node.parent, context);
			let { buffer } = this.buffer, { types } = buffer.set;
			for (let i = context.length - 1, d = this.stack.length - 1; i >= 0; d--) {
				if (d < 0) return matchNodeContext(this._tree, context, i);
				let type = types[buffer.buffer[this.stack[d]]];
				if (!type.isAnonymous) {
					if (context[i] && context[i] != type.name) return false;
					i--;
				}
			}
			return true;
		}
	};
	nodeSizeCache = new WeakMap();
	TreeFragment = class TreeFragment {
		constructor(from, to, tree, offset, openStart = false, openEnd = false) {
			this.from = from;
			this.to = to;
			this.tree = tree;
			this.offset = offset;
			this.open = (openStart ? 1 : 0) | (openEnd ? 2 : 0);
		}
		get openStart() {
			return (this.open & 1) > 0;
		}
		get openEnd() {
			return (this.open & 2) > 0;
		}
		static addTree(tree, fragments = [], partial = false) {
			let result = [new TreeFragment(0, tree.length, tree, 0, false, partial)];
			for (let f of fragments) if (f.to > tree.length) result.push(f);
			return result;
		}
		static applyChanges(fragments, changes, minGap = 128) {
			if (!changes.length) return fragments;
			let result = [];
			let fI = 1, nextF = fragments.length ? fragments[0] : null;
			for (let cI = 0, pos = 0, off = 0;; cI++) {
				let nextC = cI < changes.length ? changes[cI] : null;
				let nextPos = nextC ? nextC.fromA : 1e9;
				if (nextPos - pos >= minGap) while (nextF && nextF.from < nextPos) {
					let cut = nextF;
					if (pos >= cut.from || nextPos <= cut.to || off) {
						let fFrom = Math.max(cut.from, pos) - off, fTo = Math.min(cut.to, nextPos) - off;
						cut = fFrom >= fTo ? null : new TreeFragment(fFrom, fTo, cut.tree, cut.offset + off, cI > 0, !!nextC);
					}
					if (cut) result.push(cut);
					if (nextF.to > nextPos) break;
					nextF = fI < fragments.length ? fragments[fI++] : null;
				}
				if (!nextC) break;
				pos = nextC.toA;
				off = nextC.toA - nextC.toB;
			}
			return result;
		}
	};
	Parser = class {
		startParse(input, fragments, ranges) {
			if (typeof input == "string") input = new StringInput(input);
			ranges = !ranges ? [new Range(0, input.length)] : ranges.length ? ranges.map((r) => new Range(r.from, r.to)) : [new Range(0, 0)];
			return this.createParse(input, fragments || [], ranges);
		}
		parse(input, fragments, ranges) {
			let parse = this.startParse(input, fragments, ranges);
			for (;;) {
				let done = parse.advance();
				if (done) return done;
			}
		}
	};
	StringInput = class {
		constructor(string) {
			this.string = string;
		}
		get length() {
			return this.string.length;
		}
		chunk(from) {
			return this.string.slice(from);
		}
		get lineChunks() {
			return false;
		}
		read(from, to) {
			return this.string.slice(from, to);
		}
	};
	InnerParse = class {
		constructor(parser, parse, overlay, bracketed, target, from) {
			this.parser = parser;
			this.parse = parse;
			this.overlay = overlay;
			this.bracketed = bracketed;
			this.target = target;
			this.from = from;
		}
	};
	ActiveOverlay = class {
		constructor(parser, predicate, mounts, index, start, bracketed, target, prev) {
			this.parser = parser;
			this.predicate = predicate;
			this.mounts = mounts;
			this.index = index;
			this.start = start;
			this.bracketed = bracketed;
			this.target = target;
			this.prev = prev;
			this.depth = 0;
			this.ranges = [];
		}
	};
	stoppedInner = new NodeProp({ perNode: true });
	MixedParse = class {
		constructor(base, nest, input, fragments, ranges) {
			this.nest = nest;
			this.input = input;
			this.fragments = fragments;
			this.ranges = ranges;
			this.inner = [];
			this.innerDone = 0;
			this.baseTree = null;
			this.stoppedAt = null;
			this.baseParse = base;
		}
		advance() {
			if (this.baseParse) {
				let done = this.baseParse.advance();
				if (!done) return null;
				this.baseParse = null;
				this.baseTree = done;
				this.startInner();
				if (this.stoppedAt != null) for (let inner of this.inner) inner.parse.stopAt(this.stoppedAt);
			}
			if (this.innerDone == this.inner.length) {
				let result = this.baseTree;
				if (this.stoppedAt != null) result = new Tree(result.type, result.children, result.positions, result.length, result.propValues.concat([[stoppedInner, this.stoppedAt]]));
				return result;
			}
			let inner = this.inner[this.innerDone], done = inner.parse.advance();
			if (done) {
				this.innerDone++;
				let props = Object.assign(Object.create(null), inner.target.props);
				props[NodeProp.mounted.id] = new MountedTree(done, inner.overlay, inner.parser, inner.bracketed);
				inner.target.props = props;
			}
			return null;
		}
		get parsedPos() {
			if (this.baseParse) return 0;
			let pos = this.input.length;
			for (let i = this.innerDone; i < this.inner.length; i++) if (this.inner[i].from < pos) pos = Math.min(pos, this.inner[i].parse.parsedPos);
			return pos;
		}
		stopAt(pos) {
			this.stoppedAt = pos;
			if (this.baseParse) this.baseParse.stopAt(pos);
			else for (let i = this.innerDone; i < this.inner.length; i++) this.inner[i].parse.stopAt(pos);
		}
		startInner() {
			let fragmentCursor = new FragmentCursor$1(this.fragments);
			let overlay = null;
			let covered = null;
			let cursor = new TreeCursor(new TreeNode(this.baseTree, this.ranges[0].from, 0, null), IterMode.IncludeAnonymous | IterMode.IgnoreMounts);
			scan: for (let nest, isCovered;;) {
				let enter = true, range;
				if (this.stoppedAt != null && cursor.from >= this.stoppedAt) enter = false;
				else if (fragmentCursor.hasNode(cursor)) {
					if (overlay) {
						let match = overlay.mounts.find((m) => m.frag.from <= cursor.from && m.frag.to >= cursor.to && m.mount.overlay);
						if (match) for (let r of match.mount.overlay) {
							let from = r.from + match.pos, to = r.to + match.pos;
							if (from >= cursor.from && to <= cursor.to && !overlay.ranges.some((r) => r.from < to && r.to > from)) overlay.ranges.push({
								from,
								to
							});
						}
					}
					enter = false;
				} else if (covered && (isCovered = checkCover(covered.ranges, cursor.from, cursor.to))) enter = isCovered != 2;
				else if (!cursor.type.isAnonymous && (nest = this.nest(cursor, this.input)) && (cursor.from < cursor.to || !nest.overlay)) {
					if (!cursor.tree) {
						materialize(cursor);
						if (overlay) overlay.depth++;
						if (covered) covered.depth++;
					}
					let oldMounts = fragmentCursor.findMounts(cursor.from, nest.parser);
					if (typeof nest.overlay == "function") overlay = new ActiveOverlay(nest.parser, nest.overlay, oldMounts, this.inner.length, cursor.from, !!nest.bracketed, cursor.tree, overlay);
					else {
						let ranges = punchRanges(this.ranges, nest.overlay || (cursor.from < cursor.to ? [new Range(cursor.from, cursor.to)] : []));
						if (ranges.length) checkRanges(ranges);
						if (ranges.length || !nest.overlay) this.inner.push(new InnerParse(nest.parser, ranges.length ? nest.parser.startParse(this.input, enterFragments(oldMounts, ranges), ranges) : nest.parser.startParse(""), nest.overlay ? nest.overlay.map((r) => new Range(r.from - cursor.from, r.to - cursor.from)) : null, !!nest.bracketed, cursor.tree, ranges.length ? ranges[0].from : cursor.from));
						if (!nest.overlay) enter = false;
						else if (ranges.length) covered = {
							ranges,
							depth: 0,
							prev: covered
						};
					}
				} else if (overlay && (range = overlay.predicate(cursor))) {
					if (range === true) range = new Range(cursor.from, cursor.to);
					if (range.from < range.to) {
						let last = overlay.ranges.length - 1;
						if (last >= 0 && overlay.ranges[last].to == range.from) overlay.ranges[last] = {
							from: overlay.ranges[last].from,
							to: range.to
						};
						else overlay.ranges.push(range);
					}
				}
				if (enter && cursor.firstChild()) {
					if (overlay) overlay.depth++;
					if (covered) covered.depth++;
				} else for (;;) {
					if (cursor.nextSibling()) break;
					if (!cursor.parent()) break scan;
					if (overlay && !--overlay.depth) {
						let ranges = punchRanges(this.ranges, overlay.ranges);
						if (ranges.length) {
							checkRanges(ranges);
							this.inner.splice(overlay.index, 0, new InnerParse(overlay.parser, overlay.parser.startParse(this.input, enterFragments(overlay.mounts, ranges), ranges), overlay.ranges.map((r) => new Range(r.from - overlay.start, r.to - overlay.start)), overlay.bracketed, overlay.target, ranges[0].from));
						}
						overlay = overlay.prev;
					}
					if (covered && !--covered.depth) covered = covered.prev;
				}
			}
		}
	};
	StructureCursor = class {
		constructor(root, offset) {
			this.offset = offset;
			this.done = false;
			this.cursor = root.cursor(IterMode.IncludeAnonymous | IterMode.IgnoreMounts);
		}
		moveTo(pos) {
			let { cursor } = this, p = pos - this.offset;
			while (!this.done && cursor.from < p) if (cursor.to >= pos && cursor.enter(p, 1, IterMode.IgnoreOverlays | IterMode.ExcludeBuffers));
			else if (cursor.to <= pos) {
				if (!cursor.next(false)) this.done = true;
			} else break;
		}
		hasNode(cursor) {
			this.moveTo(cursor.from);
			if (!this.done && this.cursor.from + this.offset == cursor.from && this.cursor.tree) for (let tree = this.cursor.tree;;) {
				if (tree == cursor.tree) return true;
				if (tree.children.length && tree.positions[0] == 0 && tree.children[0] instanceof Tree) tree = tree.children[0];
				else break;
			}
			return false;
		}
	};
	FragmentCursor$1 = class {
		constructor(fragments) {
			var _a;
			this.fragments = fragments;
			this.curTo = 0;
			this.fragI = 0;
			if (fragments.length) {
				let first = this.curFrag = fragments[0];
				this.curTo = (_a = first.tree.prop(stoppedInner)) !== null && _a !== void 0 ? _a : first.to;
				this.inner = new StructureCursor(first.tree, -first.offset);
			} else this.curFrag = this.inner = null;
		}
		hasNode(node) {
			while (this.curFrag && node.from >= this.curTo) this.nextFrag();
			return this.curFrag && this.curFrag.from <= node.from && this.curTo >= node.to && this.inner.hasNode(node);
		}
		nextFrag() {
			var _a;
			this.fragI++;
			if (this.fragI == this.fragments.length) this.curFrag = this.inner = null;
			else {
				let frag = this.curFrag = this.fragments[this.fragI];
				this.curTo = (_a = frag.tree.prop(stoppedInner)) !== null && _a !== void 0 ? _a : frag.to;
				this.inner = new StructureCursor(frag.tree, -frag.offset);
			}
		}
		findMounts(pos, parser) {
			var _a;
			let result = [];
			if (this.inner) {
				this.inner.cursor.moveTo(pos, 1);
				for (let pos = this.inner.cursor.node; pos; pos = pos.parent) {
					let mount = (_a = pos.tree) === null || _a === void 0 ? void 0 : _a.prop(NodeProp.mounted);
					if (mount && mount.parser == parser) for (let i = this.fragI; i < this.fragments.length; i++) {
						let frag = this.fragments[i];
						if (frag.from >= pos.to) break;
						if (frag.tree == this.curFrag.tree) result.push({
							frag,
							pos: pos.from - frag.offset,
							mount
						});
					}
				}
			}
			return result;
		}
	};
}));
//#endregion
//#region ../../node_modules/@lezer/highlight/dist/index.js
function sameArray(a, b) {
	return a.length == b.length && a.every((x, i) => x == b[i]);
}
function powerSet(array) {
	let sets = [[]];
	for (let i = 0; i < array.length; i++) for (let j = 0, e = sets.length; j < e; j++) sets.push(sets[j].concat(array[i]));
	return sets.sort((a, b) => b.length - a.length);
}
function styleTags(spec) {
	let byName = Object.create(null);
	for (let prop in spec) {
		let tags = spec[prop];
		if (!Array.isArray(tags)) tags = [tags];
		for (let part of prop.split(" ")) if (part) {
			let pieces = [], mode = 2, rest = part;
			for (let pos = 0;;) {
				if (rest == "..." && pos > 0 && pos + 3 == part.length) {
					mode = 1;
					break;
				}
				let m = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(rest);
				if (!m) throw new RangeError("Invalid path: " + part);
				pieces.push(m[0] == "*" ? "" : m[0][0] == "\"" ? JSON.parse(m[0]) : m[0]);
				pos += m[0].length;
				if (pos == part.length) break;
				let next = part[pos++];
				if (pos == part.length && next == "!") {
					mode = 0;
					break;
				}
				if (next != "/") throw new RangeError("Invalid path: " + part);
				rest = part.slice(pos);
			}
			let last = pieces.length - 1, inner = pieces[last];
			if (!inner) throw new RangeError("Invalid path: " + part);
			byName[inner] = new Rule(tags, mode, last > 0 ? pieces.slice(0, last) : null).sort(byName[inner]);
		}
	}
	return ruleNodeProp.add(byName);
}
function tagHighlighter(tags, options) {
	let map = Object.create(null);
	for (let style of tags) if (!Array.isArray(style.tag)) map[style.tag.id] = style.class;
	else for (let tag of style.tag) map[tag.id] = style.class;
	let { scope, all = null } = options || {};
	return {
		style: (tags) => {
			let cls = all;
			for (let tag of tags) for (let sub of tag.set) {
				let tagClass = map[sub.id];
				if (tagClass) {
					cls = cls ? cls + " " + tagClass : tagClass;
					break;
				}
			}
			return cls;
		},
		scope
	};
}
function highlightTags(highlighters, tags) {
	let result = null;
	for (let highlighter of highlighters) {
		let value = highlighter.style(tags);
		if (value) result = result ? result + " " + value : value;
	}
	return result;
}
function highlightTree(tree, highlighter, putStyle, from = 0, to = tree.length) {
	let builder = new HighlightBuilder(from, Array.isArray(highlighter) ? highlighter : [highlighter], putStyle);
	builder.highlightRange(tree.cursor(), from, to, "", builder.highlighters);
	builder.flush(to);
}
function getStyleTags(node) {
	let rule = node.type.prop(ruleNodeProp);
	while (rule && rule.context && !node.matchContext(rule.context)) rule = rule.next;
	return rule || null;
}
var nextTagID, Tag, nextModifierID, Modifier, ruleNodeProp, Rule, HighlightBuilder, t, comment, name, typeName, propertyName, literal, string, number, content, heading, keyword, operator, punctuation, bracket, meta, tags;
var init_dist$2 = __esmMin((() => {
	init_dist$3();
	nextTagID = 0;
	Tag = class Tag {
		constructor(name, set, base, modified) {
			this.name = name;
			this.set = set;
			this.base = base;
			this.modified = modified;
			this.id = nextTagID++;
		}
		toString() {
			let { name } = this;
			for (let mod of this.modified) if (mod.name) name = `${mod.name}(${name})`;
			return name;
		}
		static define(nameOrParent, parent) {
			let name = typeof nameOrParent == "string" ? nameOrParent : "?";
			if (nameOrParent instanceof Tag) parent = nameOrParent;
			if (parent === null || parent === void 0 ? void 0 : parent.base) throw new Error("Can not derive from a modified tag");
			let tag = new Tag(name, [], null, []);
			tag.set.push(tag);
			if (parent) for (let t of parent.set) tag.set.push(t);
			return tag;
		}
		static defineModifier(name) {
			let mod = new Modifier(name);
			return (tag) => {
				if (tag.modified.indexOf(mod) > -1) return tag;
				return Modifier.get(tag.base || tag, tag.modified.concat(mod).sort((a, b) => a.id - b.id));
			};
		}
	};
	nextModifierID = 0;
	Modifier = class Modifier {
		constructor(name) {
			this.name = name;
			this.instances = [];
			this.id = nextModifierID++;
		}
		static get(base, mods) {
			if (!mods.length) return base;
			let exists = mods[0].instances.find((t) => t.base == base && sameArray(mods, t.modified));
			if (exists) return exists;
			let set = [], tag = new Tag(base.name, set, base, mods);
			for (let m of mods) m.instances.push(tag);
			let configs = powerSet(mods);
			for (let parent of base.set) if (!parent.modified.length) for (let config of configs) set.push(Modifier.get(parent, config));
			return tag;
		}
	};
	ruleNodeProp = new NodeProp({ combine(a, b) {
		let cur, root, take;
		while (a || b) {
			if (!a || b && a.depth >= b.depth) {
				take = b;
				b = b.next;
			} else {
				take = a;
				a = a.next;
			}
			if (cur && cur.mode == take.mode && !take.context && !cur.context) continue;
			let copy = new Rule(take.tags, take.mode, take.context);
			if (cur) cur.next = copy;
			else root = copy;
			cur = copy;
		}
		return root;
	} });
	Rule = class {
		constructor(tags, mode, context, next) {
			this.tags = tags;
			this.mode = mode;
			this.context = context;
			this.next = next;
		}
		get opaque() {
			return this.mode == 0;
		}
		get inherit() {
			return this.mode == 1;
		}
		sort(other) {
			if (!other || other.depth < this.depth) {
				this.next = other;
				return this;
			}
			other.next = this.sort(other.next);
			return other;
		}
		get depth() {
			return this.context ? this.context.length : 0;
		}
	};
	Rule.empty = new Rule([], 2, null);
	HighlightBuilder = class {
		constructor(at, highlighters, span) {
			this.at = at;
			this.highlighters = highlighters;
			this.span = span;
			this.class = "";
		}
		startSpan(at, cls) {
			if (cls != this.class) {
				this.flush(at);
				if (at > this.at) this.at = at;
				this.class = cls;
			}
		}
		flush(to) {
			if (to > this.at && this.class) this.span(this.at, to, this.class);
		}
		highlightRange(cursor, from, to, inheritedClass, highlighters) {
			let { type, from: start, to: end } = cursor;
			if (start >= to || end <= from) return;
			if (type.isTop) highlighters = this.highlighters.filter((h) => !h.scope || h.scope(type));
			let cls = inheritedClass;
			let rule = getStyleTags(cursor) || Rule.empty;
			let tagCls = highlightTags(highlighters, rule.tags);
			if (tagCls) {
				if (cls) cls += " ";
				cls += tagCls;
				if (rule.mode == 1) inheritedClass += (inheritedClass ? " " : "") + tagCls;
			}
			this.startSpan(Math.max(from, start), cls);
			if (rule.opaque) return;
			let mounted = cursor.tree && cursor.tree.prop(NodeProp.mounted);
			if (mounted && mounted.overlay) {
				let inner = cursor.node.enter(mounted.overlay[0].from + start, 1);
				let innerHighlighters = this.highlighters.filter((h) => !h.scope || h.scope(mounted.tree.type));
				let hasChild = cursor.firstChild();
				for (let i = 0, pos = start;; i++) {
					let next = i < mounted.overlay.length ? mounted.overlay[i] : null;
					let nextPos = next ? next.from + start : end;
					let rangeFrom = Math.max(from, pos), rangeTo = Math.min(to, nextPos);
					if (rangeFrom < rangeTo && hasChild) while (cursor.from < rangeTo) {
						this.highlightRange(cursor, rangeFrom, rangeTo, inheritedClass, highlighters);
						this.startSpan(Math.min(rangeTo, cursor.to), cls);
						if (cursor.to >= nextPos || !cursor.nextSibling()) break;
					}
					if (!next || nextPos > to) break;
					pos = next.to + start;
					if (pos > from) {
						this.highlightRange(inner.cursor(), Math.max(from, next.from + start), Math.min(to, pos), "", innerHighlighters);
						this.startSpan(Math.min(to, pos), cls);
					}
				}
				if (hasChild) cursor.parent();
			} else if (cursor.firstChild()) {
				if (mounted) inheritedClass = "";
				do {
					if (cursor.to <= from) continue;
					if (cursor.from >= to) break;
					this.highlightRange(cursor, from, to, inheritedClass, highlighters);
					this.startSpan(Math.min(to, cursor.to), cls);
				} while (cursor.nextSibling());
				cursor.parent();
			}
		}
	};
	t = Tag.define;
	comment = t();
	name = t();
	typeName = t(name);
	propertyName = t(name);
	literal = t();
	string = t(literal);
	number = t(literal);
	content = t();
	heading = t(content);
	keyword = t();
	operator = t();
	punctuation = t();
	bracket = t(punctuation);
	meta = t();
	tags = {
		comment,
		lineComment: t(comment),
		blockComment: t(comment),
		docComment: t(comment),
		name,
		variableName: t(name),
		typeName,
		tagName: t(typeName),
		propertyName,
		attributeName: t(propertyName),
		className: t(name),
		labelName: t(name),
		namespace: t(name),
		macroName: t(name),
		literal,
		string,
		docString: t(string),
		character: t(string),
		attributeValue: t(string),
		number,
		integer: t(number),
		float: t(number),
		bool: t(literal),
		regexp: t(literal),
		escape: t(literal),
		color: t(literal),
		url: t(literal),
		keyword,
		self: t(keyword),
		null: t(keyword),
		atom: t(keyword),
		unit: t(keyword),
		modifier: t(keyword),
		operatorKeyword: t(keyword),
		controlKeyword: t(keyword),
		definitionKeyword: t(keyword),
		moduleKeyword: t(keyword),
		operator,
		derefOperator: t(operator),
		arithmeticOperator: t(operator),
		logicOperator: t(operator),
		bitwiseOperator: t(operator),
		compareOperator: t(operator),
		updateOperator: t(operator),
		definitionOperator: t(operator),
		typeOperator: t(operator),
		controlOperator: t(operator),
		punctuation,
		separator: t(punctuation),
		bracket,
		angleBracket: t(bracket),
		squareBracket: t(bracket),
		paren: t(bracket),
		brace: t(bracket),
		content,
		heading,
		heading1: t(heading),
		heading2: t(heading),
		heading3: t(heading),
		heading4: t(heading),
		heading5: t(heading),
		heading6: t(heading),
		contentSeparator: t(content),
		list: t(content),
		quote: t(content),
		emphasis: t(content),
		strong: t(content),
		link: t(content),
		monospace: t(content),
		strikethrough: t(content),
		inserted: t(),
		deleted: t(),
		changed: t(),
		invalid: t(),
		meta,
		documentMeta: t(meta),
		annotation: t(meta),
		processingInstruction: t(meta),
		definition: Tag.defineModifier("definition"),
		constant: Tag.defineModifier("constant"),
		function: Tag.defineModifier("function"),
		standard: Tag.defineModifier("standard"),
		local: Tag.defineModifier("local"),
		special: Tag.defineModifier("special")
	};
	for (let name in tags) {
		let val = tags[name];
		if (val instanceof Tag) val.name = name;
	}
	tagHighlighter([
		{
			tag: tags.link,
			class: "tok-link"
		},
		{
			tag: tags.heading,
			class: "tok-heading"
		},
		{
			tag: tags.emphasis,
			class: "tok-emphasis"
		},
		{
			tag: tags.strong,
			class: "tok-strong"
		},
		{
			tag: tags.keyword,
			class: "tok-keyword"
		},
		{
			tag: tags.atom,
			class: "tok-atom"
		},
		{
			tag: tags.bool,
			class: "tok-bool"
		},
		{
			tag: tags.url,
			class: "tok-url"
		},
		{
			tag: tags.labelName,
			class: "tok-labelName"
		},
		{
			tag: tags.inserted,
			class: "tok-inserted"
		},
		{
			tag: tags.deleted,
			class: "tok-deleted"
		},
		{
			tag: tags.literal,
			class: "tok-literal"
		},
		{
			tag: tags.string,
			class: "tok-string"
		},
		{
			tag: tags.number,
			class: "tok-number"
		},
		{
			tag: [
				tags.regexp,
				tags.escape,
				tags.special(tags.string)
			],
			class: "tok-string2"
		},
		{
			tag: tags.variableName,
			class: "tok-variableName"
		},
		{
			tag: tags.local(tags.variableName),
			class: "tok-variableName tok-local"
		},
		{
			tag: tags.definition(tags.variableName),
			class: "tok-variableName tok-definition"
		},
		{
			tag: tags.special(tags.variableName),
			class: "tok-variableName2"
		},
		{
			tag: tags.definition(tags.propertyName),
			class: "tok-propertyName tok-definition"
		},
		{
			tag: tags.typeName,
			class: "tok-typeName"
		},
		{
			tag: tags.namespace,
			class: "tok-namespace"
		},
		{
			tag: tags.className,
			class: "tok-className"
		},
		{
			tag: tags.macroName,
			class: "tok-macroName"
		},
		{
			tag: tags.propertyName,
			class: "tok-propertyName"
		},
		{
			tag: tags.operator,
			class: "tok-operator"
		},
		{
			tag: tags.comment,
			class: "tok-comment"
		},
		{
			tag: tags.meta,
			class: "tok-meta"
		},
		{
			tag: tags.invalid,
			class: "tok-invalid"
		},
		{
			tag: tags.punctuation,
			class: "tok-punctuation"
		}
	]);
}));
//#endregion
//#region ../../node_modules/@bpmn-io/semver-compat/dist/index.js
var dist_exports = __exportAll({
	getCoerced: () => getCoerced,
	getCompatible: () => getCompatible,
	isCompatible: () => isCompatible,
	isSatisfied: () => isSatisfied
});
function requireConstants() {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;
	constants = {
		MAX_LENGTH: 256,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: 250,
		MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 9007199254740991,
		RELEASE_TYPES: [
			"major",
			"premajor",
			"minor",
			"preminor",
			"patch",
			"prepatch",
			"prerelease"
		],
		SEMVER_SPEC_VERSION: "2.0.0",
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
	return constants;
}
function requireDebug() {
	if (hasRequiredDebug) return debug_1;
	hasRequiredDebug = 1;
	debug_1 = typeof process === "object" && {}.NODE_DEBUG && /\bsemver\b/i.test({}.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {};
	return debug_1;
}
function requireRe() {
	if (hasRequiredRe) return re.exports;
	hasRequiredRe = 1;
	(function(module, exports$1) {
		const { MAX_SAFE_COMPONENT_LENGTH, MAX_SAFE_BUILD_LENGTH, MAX_LENGTH } = requireConstants();
		const debug = requireDebug();
		exports$1 = module.exports = {};
		const re = exports$1.re = [];
		const safeRe = exports$1.safeRe = [];
		const src = exports$1.src = [];
		const safeSrc = exports$1.safeSrc = [];
		const t = exports$1.t = {};
		let R = 0;
		const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
		const safeRegexReplacements = [
			["\\s", 1],
			["\\d", MAX_LENGTH],
			[LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
		];
		const makeSafeRegex = (value) => {
			for (const [token, max] of safeRegexReplacements) value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
			return value;
		};
		const createToken = (name, value, isGlobal) => {
			const safe = makeSafeRegex(value);
			const index = R++;
			debug(name, index, value);
			t[name] = index;
			src[index] = value;
			safeSrc[index] = safe;
			re[index] = new RegExp(value, isGlobal ? "g" : void 0);
			safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
		};
		createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
		createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
		createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
		createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
		createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
		createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
		createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
		createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
		createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
		createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
		createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
		createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
		createToken("FULL", `^${src[t.FULLPLAIN]}$`);
		createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
		createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
		createToken("GTLT", "((?:<|>)?=?)");
		createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
		createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
		createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
		createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
		createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
		createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
		createToken("COERCEPLAIN", `(^|[^\\d])(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
		createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
		createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
		createToken("COERCERTL", src[t.COERCE], true);
		createToken("COERCERTLFULL", src[t.COERCEFULL], true);
		createToken("LONETILDE", "(?:~>?)");
		createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
		exports$1.tildeTrimReplace = "$1~";
		createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
		createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
		createToken("LONECARET", "(?:\\^)");
		createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
		exports$1.caretTrimReplace = "$1^";
		createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
		createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
		createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
		createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
		createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
		exports$1.comparatorTrimReplace = "$1$2$3";
		createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
		createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
		createToken("STAR", "(<|>)?=?\\s*\\*");
		createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
		createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
	})(re, re.exports);
	return re.exports;
}
function requireParseOptions() {
	if (hasRequiredParseOptions) return parseOptions_1;
	hasRequiredParseOptions = 1;
	const looseOption = Object.freeze({ loose: true });
	const emptyOpts = Object.freeze({});
	const parseOptions = (options) => {
		if (!options) return emptyOpts;
		if (typeof options !== "object") return looseOption;
		return options;
	};
	parseOptions_1 = parseOptions;
	return parseOptions_1;
}
function requireIdentifiers() {
	if (hasRequiredIdentifiers) return identifiers;
	hasRequiredIdentifiers = 1;
	const numeric = /^[0-9]+$/;
	const compareIdentifiers = (a, b) => {
		if (typeof a === "number" && typeof b === "number") return a === b ? 0 : a < b ? -1 : 1;
		const anum = numeric.test(a);
		const bnum = numeric.test(b);
		if (anum && bnum) {
			a = +a;
			b = +b;
		}
		return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
	};
	const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
	identifiers = {
		compareIdentifiers,
		rcompareIdentifiers
	};
	return identifiers;
}
function requireSemver$1() {
	if (hasRequiredSemver$1) return semver$1;
	hasRequiredSemver$1 = 1;
	const debug = requireDebug();
	const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants();
	const { safeRe: re, t } = requireRe();
	const parseOptions = requireParseOptions();
	const { compareIdentifiers } = requireIdentifiers();
	class SemVer {
		constructor(version, options) {
			options = parseOptions(options);
			if (version instanceof SemVer) {
				if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) return version;
				else version = version.version;
			} else if (typeof version !== "string") throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
			if (version.length > MAX_LENGTH) throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
			debug("SemVer", version, options);
			this.options = options;
			this.loose = !!options.loose;
			this.includePrerelease = !!options.includePrerelease;
			const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
			if (!m) throw new TypeError(`Invalid Version: ${version}`);
			this.raw = version;
			this.major = +m[1];
			this.minor = +m[2];
			this.patch = +m[3];
			if (this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
			if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
			if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
			if (!m[4]) this.prerelease = [];
			else this.prerelease = m[4].split(".").map((id) => {
				if (/^[0-9]+$/.test(id)) {
					const num = +id;
					if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
				}
				return id;
			});
			this.build = m[5] ? m[5].split(".") : [];
			this.format();
		}
		format() {
			this.version = `${this.major}.${this.minor}.${this.patch}`;
			if (this.prerelease.length) this.version += `-${this.prerelease.join(".")}`;
			return this.version;
		}
		toString() {
			return this.version;
		}
		compare(other) {
			debug("SemVer.compare", this.version, this.options, other);
			if (!(other instanceof SemVer)) {
				if (typeof other === "string" && other === this.version) return 0;
				other = new SemVer(other, this.options);
			}
			if (other.version === this.version) return 0;
			return this.compareMain(other) || this.comparePre(other);
		}
		compareMain(other) {
			if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
			if (this.major < other.major) return -1;
			if (this.major > other.major) return 1;
			if (this.minor < other.minor) return -1;
			if (this.minor > other.minor) return 1;
			if (this.patch < other.patch) return -1;
			if (this.patch > other.patch) return 1;
			return 0;
		}
		comparePre(other) {
			if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
			if (this.prerelease.length && !other.prerelease.length) return -1;
			else if (!this.prerelease.length && other.prerelease.length) return 1;
			else if (!this.prerelease.length && !other.prerelease.length) return 0;
			let i = 0;
			do {
				const a = this.prerelease[i];
				const b = other.prerelease[i];
				debug("prerelease compare", i, a, b);
				if (a === void 0 && b === void 0) return 0;
				else if (b === void 0) return 1;
				else if (a === void 0) return -1;
				else if (a === b) continue;
				else return compareIdentifiers(a, b);
			} while (++i);
		}
		compareBuild(other) {
			if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
			let i = 0;
			do {
				const a = this.build[i];
				const b = other.build[i];
				debug("build compare", i, a, b);
				if (a === void 0 && b === void 0) return 0;
				else if (b === void 0) return 1;
				else if (a === void 0) return -1;
				else if (a === b) continue;
				else return compareIdentifiers(a, b);
			} while (++i);
		}
		inc(release, identifier, identifierBase) {
			if (release.startsWith("pre")) {
				if (!identifier && identifierBase === false) throw new Error("invalid increment argument: identifier is empty");
				if (identifier) {
					const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
					if (!match || match[1] !== identifier) throw new Error(`invalid identifier: ${identifier}`);
				}
			}
			switch (release) {
				case "premajor":
					this.prerelease.length = 0;
					this.patch = 0;
					this.minor = 0;
					this.major++;
					this.inc("pre", identifier, identifierBase);
					break;
				case "preminor":
					this.prerelease.length = 0;
					this.patch = 0;
					this.minor++;
					this.inc("pre", identifier, identifierBase);
					break;
				case "prepatch":
					this.prerelease.length = 0;
					this.inc("patch", identifier, identifierBase);
					this.inc("pre", identifier, identifierBase);
					break;
				case "prerelease":
					if (this.prerelease.length === 0) this.inc("patch", identifier, identifierBase);
					this.inc("pre", identifier, identifierBase);
					break;
				case "release":
					if (this.prerelease.length === 0) throw new Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
					break;
				case "major":
					if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
					this.minor = 0;
					this.patch = 0;
					this.prerelease = [];
					break;
				case "minor":
					if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
					this.patch = 0;
					this.prerelease = [];
					break;
				case "patch":
					if (this.prerelease.length === 0) this.patch++;
					this.prerelease = [];
					break;
				case "pre": {
					const base = Number(identifierBase) ? 1 : 0;
					if (this.prerelease.length === 0) this.prerelease = [base];
					else {
						let i = this.prerelease.length;
						while (--i >= 0) if (typeof this.prerelease[i] === "number") {
							this.prerelease[i]++;
							i = -2;
						}
						if (i === -1) {
							if (identifier === this.prerelease.join(".") && identifierBase === false) throw new Error("invalid increment argument: identifier already exists");
							this.prerelease.push(base);
						}
					}
					if (identifier) {
						let prerelease = [identifier, base];
						if (identifierBase === false) prerelease = [identifier];
						if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
							if (isNaN(this.prerelease[1])) this.prerelease = prerelease;
						} else this.prerelease = prerelease;
					}
					break;
				}
				default: throw new Error(`invalid increment argument: ${release}`);
			}
			this.raw = this.format();
			if (this.build.length) this.raw += `+${this.build.join(".")}`;
			return this;
		}
	}
	semver$1 = SemVer;
	return semver$1;
}
function requireParse() {
	if (hasRequiredParse) return parse_1;
	hasRequiredParse = 1;
	const SemVer = requireSemver$1();
	const parse = (version, options, throwErrors = false) => {
		if (version instanceof SemVer) return version;
		try {
			return new SemVer(version, options);
		} catch (er) {
			if (!throwErrors) return null;
			throw er;
		}
	};
	parse_1 = parse;
	return parse_1;
}
function requireValid$1() {
	if (hasRequiredValid$1) return valid_1;
	hasRequiredValid$1 = 1;
	const parse = requireParse();
	const valid = (version, options) => {
		const v = parse(version, options);
		return v ? v.version : null;
	};
	valid_1 = valid;
	return valid_1;
}
function requireClean() {
	if (hasRequiredClean) return clean_1;
	hasRequiredClean = 1;
	const parse = requireParse();
	const clean = (version, options) => {
		const s = parse(version.trim().replace(/^[=v]+/, ""), options);
		return s ? s.version : null;
	};
	clean_1 = clean;
	return clean_1;
}
function requireInc() {
	if (hasRequiredInc) return inc_1;
	hasRequiredInc = 1;
	const SemVer = requireSemver$1();
	const inc = (version, release, options, identifier, identifierBase) => {
		if (typeof options === "string") {
			identifierBase = identifier;
			identifier = options;
			options = void 0;
		}
		try {
			return new SemVer(version instanceof SemVer ? version.version : version, options).inc(release, identifier, identifierBase).version;
		} catch (er) {
			return null;
		}
	};
	inc_1 = inc;
	return inc_1;
}
function requireDiff() {
	if (hasRequiredDiff) return diff_1;
	hasRequiredDiff = 1;
	const parse = requireParse();
	const diff = (version1, version2) => {
		const v1 = parse(version1, null, true);
		const v2 = parse(version2, null, true);
		const comparison = v1.compare(v2);
		if (comparison === 0) return null;
		const v1Higher = comparison > 0;
		const highVersion = v1Higher ? v1 : v2;
		const lowVersion = v1Higher ? v2 : v1;
		const highHasPre = !!highVersion.prerelease.length;
		if (!!lowVersion.prerelease.length && !highHasPre) {
			if (!lowVersion.patch && !lowVersion.minor) return "major";
			if (lowVersion.compareMain(highVersion) === 0) {
				if (lowVersion.minor && !lowVersion.patch) return "minor";
				return "patch";
			}
		}
		const prefix = highHasPre ? "pre" : "";
		if (v1.major !== v2.major) return prefix + "major";
		if (v1.minor !== v2.minor) return prefix + "minor";
		if (v1.patch !== v2.patch) return prefix + "patch";
		return "prerelease";
	};
	diff_1 = diff;
	return diff_1;
}
function requireMajor() {
	if (hasRequiredMajor) return major_1;
	hasRequiredMajor = 1;
	const SemVer = requireSemver$1();
	const major = (a, loose) => new SemVer(a, loose).major;
	major_1 = major;
	return major_1;
}
function requireMinor() {
	if (hasRequiredMinor) return minor_1;
	hasRequiredMinor = 1;
	const SemVer = requireSemver$1();
	const minor = (a, loose) => new SemVer(a, loose).minor;
	minor_1 = minor;
	return minor_1;
}
function requirePatch() {
	if (hasRequiredPatch) return patch_1;
	hasRequiredPatch = 1;
	const SemVer = requireSemver$1();
	const patch = (a, loose) => new SemVer(a, loose).patch;
	patch_1 = patch;
	return patch_1;
}
function requirePrerelease() {
	if (hasRequiredPrerelease) return prerelease_1;
	hasRequiredPrerelease = 1;
	const parse = requireParse();
	const prerelease = (version, options) => {
		const parsed = parse(version, options);
		return parsed && parsed.prerelease.length ? parsed.prerelease : null;
	};
	prerelease_1 = prerelease;
	return prerelease_1;
}
function requireCompare() {
	if (hasRequiredCompare) return compare_1;
	hasRequiredCompare = 1;
	const SemVer = requireSemver$1();
	const compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
	compare_1 = compare;
	return compare_1;
}
function requireRcompare() {
	if (hasRequiredRcompare) return rcompare_1;
	hasRequiredRcompare = 1;
	const compare = requireCompare();
	const rcompare = (a, b, loose) => compare(b, a, loose);
	rcompare_1 = rcompare;
	return rcompare_1;
}
function requireCompareLoose() {
	if (hasRequiredCompareLoose) return compareLoose_1;
	hasRequiredCompareLoose = 1;
	const compare = requireCompare();
	const compareLoose = (a, b) => compare(a, b, true);
	compareLoose_1 = compareLoose;
	return compareLoose_1;
}
function requireCompareBuild() {
	if (hasRequiredCompareBuild) return compareBuild_1;
	hasRequiredCompareBuild = 1;
	const SemVer = requireSemver$1();
	const compareBuild = (a, b, loose) => {
		const versionA = new SemVer(a, loose);
		const versionB = new SemVer(b, loose);
		return versionA.compare(versionB) || versionA.compareBuild(versionB);
	};
	compareBuild_1 = compareBuild;
	return compareBuild_1;
}
function requireSort() {
	if (hasRequiredSort) return sort_1;
	hasRequiredSort = 1;
	const compareBuild = requireCompareBuild();
	const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
	sort_1 = sort;
	return sort_1;
}
function requireRsort() {
	if (hasRequiredRsort) return rsort_1;
	hasRequiredRsort = 1;
	const compareBuild = requireCompareBuild();
	const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
	rsort_1 = rsort;
	return rsort_1;
}
function requireGt() {
	if (hasRequiredGt) return gt_1;
	hasRequiredGt = 1;
	const compare = requireCompare();
	const gt = (a, b, loose) => compare(a, b, loose) > 0;
	gt_1 = gt;
	return gt_1;
}
function requireLt() {
	if (hasRequiredLt) return lt_1;
	hasRequiredLt = 1;
	const compare = requireCompare();
	const lt = (a, b, loose) => compare(a, b, loose) < 0;
	lt_1 = lt;
	return lt_1;
}
function requireEq() {
	if (hasRequiredEq) return eq_1;
	hasRequiredEq = 1;
	const compare = requireCompare();
	const eq = (a, b, loose) => compare(a, b, loose) === 0;
	eq_1 = eq;
	return eq_1;
}
function requireNeq() {
	if (hasRequiredNeq) return neq_1;
	hasRequiredNeq = 1;
	const compare = requireCompare();
	const neq = (a, b, loose) => compare(a, b, loose) !== 0;
	neq_1 = neq;
	return neq_1;
}
function requireGte() {
	if (hasRequiredGte) return gte_1;
	hasRequiredGte = 1;
	const compare = requireCompare();
	const gte = (a, b, loose) => compare(a, b, loose) >= 0;
	gte_1 = gte;
	return gte_1;
}
function requireLte() {
	if (hasRequiredLte) return lte_1;
	hasRequiredLte = 1;
	const compare = requireCompare();
	const lte = (a, b, loose) => compare(a, b, loose) <= 0;
	lte_1 = lte;
	return lte_1;
}
function requireCmp() {
	if (hasRequiredCmp) return cmp_1;
	hasRequiredCmp = 1;
	const eq = requireEq();
	const neq = requireNeq();
	const gt = requireGt();
	const gte = requireGte();
	const lt = requireLt();
	const lte = requireLte();
	const cmp = (a, op, b, loose) => {
		switch (op) {
			case "===":
				if (typeof a === "object") a = a.version;
				if (typeof b === "object") b = b.version;
				return a === b;
			case "!==":
				if (typeof a === "object") a = a.version;
				if (typeof b === "object") b = b.version;
				return a !== b;
			case "":
			case "=":
			case "==": return eq(a, b, loose);
			case "!=": return neq(a, b, loose);
			case ">": return gt(a, b, loose);
			case ">=": return gte(a, b, loose);
			case "<": return lt(a, b, loose);
			case "<=": return lte(a, b, loose);
			default: throw new TypeError(`Invalid operator: ${op}`);
		}
	};
	cmp_1 = cmp;
	return cmp_1;
}
function requireCoerce() {
	if (hasRequiredCoerce) return coerce_1;
	hasRequiredCoerce = 1;
	const SemVer = requireSemver$1();
	const parse = requireParse();
	const { safeRe: re, t } = requireRe();
	const coerce = (version, options) => {
		if (version instanceof SemVer) return version;
		if (typeof version === "number") version = String(version);
		if (typeof version !== "string") return null;
		options = options || {};
		let match = null;
		if (!options.rtl) match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
		else {
			const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
			let next;
			while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
				if (!match || next.index + next[0].length !== match.index + match[0].length) match = next;
				coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
			}
			coerceRtlRegex.lastIndex = -1;
		}
		if (match === null) return null;
		const major = match[2];
		const minor = match[3] || "0";
		const patch = match[4] || "0";
		const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
		const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
		return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
	};
	coerce_1 = coerce;
	return coerce_1;
}
function requireLrucache() {
	if (hasRequiredLrucache) return lrucache;
	hasRequiredLrucache = 1;
	class LRUCache {
		constructor() {
			this.max = 1e3;
			this.map = new Map();
		}
		get(key) {
			const value = this.map.get(key);
			if (value === void 0) return;
			else {
				this.map.delete(key);
				this.map.set(key, value);
				return value;
			}
		}
		delete(key) {
			return this.map.delete(key);
		}
		set(key, value) {
			if (!this.delete(key) && value !== void 0) {
				if (this.map.size >= this.max) {
					const firstKey = this.map.keys().next().value;
					this.delete(firstKey);
				}
				this.map.set(key, value);
			}
			return this;
		}
	}
	lrucache = LRUCache;
	return lrucache;
}
function requireRange() {
	if (hasRequiredRange) return range;
	hasRequiredRange = 1;
	const SPACE_CHARACTERS = /\s+/g;
	class Range {
		constructor(range, options) {
			options = parseOptions(options);
			if (range instanceof Range) {
				if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) return range;
				else return new Range(range.raw, options);
			}
			if (range instanceof Comparator) {
				this.raw = range.value;
				this.set = [[range]];
				this.formatted = void 0;
				return this;
			}
			this.options = options;
			this.loose = !!options.loose;
			this.includePrerelease = !!options.includePrerelease;
			this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
			this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
			if (!this.set.length) throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
			if (this.set.length > 1) {
				const first = this.set[0];
				this.set = this.set.filter((c) => !isNullSet(c[0]));
				if (this.set.length === 0) this.set = [first];
				else if (this.set.length > 1) {
					for (const c of this.set) if (c.length === 1 && isAny(c[0])) {
						this.set = [c];
						break;
					}
				}
			}
			this.formatted = void 0;
		}
		get range() {
			if (this.formatted === void 0) {
				this.formatted = "";
				for (let i = 0; i < this.set.length; i++) {
					if (i > 0) this.formatted += "||";
					const comps = this.set[i];
					for (let k = 0; k < comps.length; k++) {
						if (k > 0) this.formatted += " ";
						this.formatted += comps[k].toString().trim();
					}
				}
			}
			return this.formatted;
		}
		format() {
			return this.range;
		}
		toString() {
			return this.range;
		}
		parseRange(range) {
			const memoKey = ((this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE)) + ":" + range;
			const cached = cache.get(memoKey);
			if (cached) return cached;
			const loose = this.options.loose;
			const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
			range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
			debug("hyphen replace", range);
			range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
			debug("comparator trim", range);
			range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
			debug("tilde trim", range);
			range = range.replace(re[t.CARETTRIM], caretTrimReplace);
			debug("caret trim", range);
			let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
			if (loose) rangeList = rangeList.filter((comp) => {
				debug("loose invalid filter", comp, this.options);
				return !!comp.match(re[t.COMPARATORLOOSE]);
			});
			debug("range list", rangeList);
			const rangeMap = new Map();
			const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
			for (const comp of comparators) {
				if (isNullSet(comp)) return [comp];
				rangeMap.set(comp.value, comp);
			}
			if (rangeMap.size > 1 && rangeMap.has("")) rangeMap.delete("");
			const result = [...rangeMap.values()];
			cache.set(memoKey, result);
			return result;
		}
		intersects(range, options) {
			if (!(range instanceof Range)) throw new TypeError("a Range is required");
			return this.set.some((thisComparators) => {
				return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
					return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
						return rangeComparators.every((rangeComparator) => {
							return thisComparator.intersects(rangeComparator, options);
						});
					});
				});
			});
		}
		test(version) {
			if (!version) return false;
			if (typeof version === "string") try {
				version = new SemVer(version, this.options);
			} catch (er) {
				return false;
			}
			for (let i = 0; i < this.set.length; i++) if (testSet(this.set[i], version, this.options)) return true;
			return false;
		}
	}
	range = Range;
	const cache = new (requireLrucache())();
	const parseOptions = requireParseOptions();
	const Comparator = requireComparator();
	const debug = requireDebug();
	const SemVer = requireSemver$1();
	const { safeRe: re, t, comparatorTrimReplace, tildeTrimReplace, caretTrimReplace } = requireRe();
	const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = requireConstants();
	const isNullSet = (c) => c.value === "<0.0.0-0";
	const isAny = (c) => c.value === "";
	const isSatisfiable = (comparators, options) => {
		let result = true;
		const remainingComparators = comparators.slice();
		let testComparator = remainingComparators.pop();
		while (result && remainingComparators.length) {
			result = remainingComparators.every((otherComparator) => {
				return testComparator.intersects(otherComparator, options);
			});
			testComparator = remainingComparators.pop();
		}
		return result;
	};
	const parseComparator = (comp, options) => {
		comp = comp.replace(re[t.BUILD], "");
		debug("comp", comp, options);
		comp = replaceCarets(comp, options);
		debug("caret", comp);
		comp = replaceTildes(comp, options);
		debug("tildes", comp);
		comp = replaceXRanges(comp, options);
		debug("xrange", comp);
		comp = replaceStars(comp, options);
		debug("stars", comp);
		return comp;
	};
	const isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
	const replaceTildes = (comp, options) => {
		return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
	};
	const replaceTilde = (comp, options) => {
		const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
		return comp.replace(r, (_, M, m, p, pr) => {
			debug("tilde", comp, _, M, m, p, pr);
			let ret;
			if (isX(M)) ret = "";
			else if (isX(m)) ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
			else if (isX(p)) ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
			else if (pr) {
				debug("replaceTilde pr", pr);
				ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
			} else ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
			debug("tilde return", ret);
			return ret;
		});
	};
	const replaceCarets = (comp, options) => {
		return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
	};
	const replaceCaret = (comp, options) => {
		debug("caret", comp, options);
		const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
		const z = options.includePrerelease ? "-0" : "";
		return comp.replace(r, (_, M, m, p, pr) => {
			debug("caret", comp, _, M, m, p, pr);
			let ret;
			if (isX(M)) ret = "";
			else if (isX(m)) ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
			else if (isX(p)) {
				if (M === "0") ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
				else ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
			} else if (pr) {
				debug("replaceCaret pr", pr);
				if (M === "0") {
					if (m === "0") ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
					else ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
				} else ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
			} else {
				debug("no pr");
				if (M === "0") {
					if (m === "0") ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
					else ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
				} else ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
			}
			debug("caret return", ret);
			return ret;
		});
	};
	const replaceXRanges = (comp, options) => {
		debug("replaceXRanges", comp, options);
		return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
	};
	const replaceXRange = (comp, options) => {
		comp = comp.trim();
		const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
		return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
			debug("xRange", comp, ret, gtlt, M, m, p, pr);
			const xM = isX(M);
			const xm = xM || isX(m);
			const xp = xm || isX(p);
			const anyX = xp;
			if (gtlt === "=" && anyX) gtlt = "";
			pr = options.includePrerelease ? "-0" : "";
			if (xM) {
				if (gtlt === ">" || gtlt === "<") ret = "<0.0.0-0";
				else ret = "*";
			} else if (gtlt && anyX) {
				if (xm) m = 0;
				p = 0;
				if (gtlt === ">") {
					gtlt = ">=";
					if (xm) {
						M = +M + 1;
						m = 0;
						p = 0;
					} else {
						m = +m + 1;
						p = 0;
					}
				} else if (gtlt === "<=") {
					gtlt = "<";
					if (xm) M = +M + 1;
					else m = +m + 1;
				}
				if (gtlt === "<") pr = "-0";
				ret = `${gtlt + M}.${m}.${p}${pr}`;
			} else if (xm) ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
			else if (xp) ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
			debug("xRange return", ret);
			return ret;
		});
	};
	const replaceStars = (comp, options) => {
		debug("replaceStars", comp, options);
		return comp.trim().replace(re[t.STAR], "");
	};
	const replaceGTE0 = (comp, options) => {
		debug("replaceGTE0", comp, options);
		return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
	};
	const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
		if (isX(fM)) from = "";
		else if (isX(fm)) from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
		else if (isX(fp)) from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
		else if (fpr) from = `>=${from}`;
		else from = `>=${from}${incPr ? "-0" : ""}`;
		if (isX(tM)) to = "";
		else if (isX(tm)) to = `<${+tM + 1}.0.0-0`;
		else if (isX(tp)) to = `<${tM}.${+tm + 1}.0-0`;
		else if (tpr) to = `<=${tM}.${tm}.${tp}-${tpr}`;
		else if (incPr) to = `<${tM}.${tm}.${+tp + 1}-0`;
		else to = `<=${to}`;
		return `${from} ${to}`.trim();
	};
	const testSet = (set, version, options) => {
		for (let i = 0; i < set.length; i++) if (!set[i].test(version)) return false;
		if (version.prerelease.length && !options.includePrerelease) {
			for (let i = 0; i < set.length; i++) {
				debug(set[i].semver);
				if (set[i].semver === Comparator.ANY) continue;
				if (set[i].semver.prerelease.length > 0) {
					const allowed = set[i].semver;
					if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
				}
			}
			return false;
		}
		return true;
	};
	return range;
}
function requireComparator() {
	if (hasRequiredComparator) return comparator;
	hasRequiredComparator = 1;
	const ANY = Symbol("SemVer ANY");
	class Comparator {
		static get ANY() {
			return ANY;
		}
		constructor(comp, options) {
			options = parseOptions(options);
			if (comp instanceof Comparator) {
				if (comp.loose === !!options.loose) return comp;
				else comp = comp.value;
			}
			comp = comp.trim().split(/\s+/).join(" ");
			debug("comparator", comp, options);
			this.options = options;
			this.loose = !!options.loose;
			this.parse(comp);
			if (this.semver === ANY) this.value = "";
			else this.value = this.operator + this.semver.version;
			debug("comp", this);
		}
		parse(comp) {
			const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
			const m = comp.match(r);
			if (!m) throw new TypeError(`Invalid comparator: ${comp}`);
			this.operator = m[1] !== void 0 ? m[1] : "";
			if (this.operator === "=") this.operator = "";
			if (!m[2]) this.semver = ANY;
			else this.semver = new SemVer(m[2], this.options.loose);
		}
		toString() {
			return this.value;
		}
		test(version) {
			debug("Comparator.test", version, this.options.loose);
			if (this.semver === ANY || version === ANY) return true;
			if (typeof version === "string") try {
				version = new SemVer(version, this.options);
			} catch (er) {
				return false;
			}
			return cmp(version, this.operator, this.semver, this.options);
		}
		intersects(comp, options) {
			if (!(comp instanceof Comparator)) throw new TypeError("a Comparator is required");
			if (this.operator === "") {
				if (this.value === "") return true;
				return new Range(comp.value, options).test(this.value);
			} else if (comp.operator === "") {
				if (comp.value === "") return true;
				return new Range(this.value, options).test(comp.semver);
			}
			options = parseOptions(options);
			if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) return false;
			if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) return false;
			if (this.operator.startsWith(">") && comp.operator.startsWith(">")) return true;
			if (this.operator.startsWith("<") && comp.operator.startsWith("<")) return true;
			if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) return true;
			if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) return true;
			if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) return true;
			return false;
		}
	}
	comparator = Comparator;
	const parseOptions = requireParseOptions();
	const { safeRe: re, t } = requireRe();
	const cmp = requireCmp();
	const debug = requireDebug();
	const SemVer = requireSemver$1();
	const Range = requireRange();
	return comparator;
}
function requireSatisfies() {
	if (hasRequiredSatisfies) return satisfies_1;
	hasRequiredSatisfies = 1;
	const Range = requireRange();
	const satisfies = (version, range, options) => {
		try {
			range = new Range(range, options);
		} catch (er) {
			return false;
		}
		return range.test(version);
	};
	satisfies_1 = satisfies;
	return satisfies_1;
}
function requireToComparators() {
	if (hasRequiredToComparators) return toComparators_1;
	hasRequiredToComparators = 1;
	const Range = requireRange();
	const toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
	toComparators_1 = toComparators;
	return toComparators_1;
}
function requireMaxSatisfying() {
	if (hasRequiredMaxSatisfying) return maxSatisfying_1;
	hasRequiredMaxSatisfying = 1;
	const SemVer = requireSemver$1();
	const Range = requireRange();
	const maxSatisfying = (versions, range, options) => {
		let max = null;
		let maxSV = null;
		let rangeObj = null;
		try {
			rangeObj = new Range(range, options);
		} catch (er) {
			return null;
		}
		versions.forEach((v) => {
			if (rangeObj.test(v)) {
				if (!max || maxSV.compare(v) === -1) {
					max = v;
					maxSV = new SemVer(max, options);
				}
			}
		});
		return max;
	};
	maxSatisfying_1 = maxSatisfying;
	return maxSatisfying_1;
}
function requireMinSatisfying() {
	if (hasRequiredMinSatisfying) return minSatisfying_1;
	hasRequiredMinSatisfying = 1;
	const SemVer = requireSemver$1();
	const Range = requireRange();
	const minSatisfying = (versions, range, options) => {
		let min = null;
		let minSV = null;
		let rangeObj = null;
		try {
			rangeObj = new Range(range, options);
		} catch (er) {
			return null;
		}
		versions.forEach((v) => {
			if (rangeObj.test(v)) {
				if (!min || minSV.compare(v) === 1) {
					min = v;
					minSV = new SemVer(min, options);
				}
			}
		});
		return min;
	};
	minSatisfying_1 = minSatisfying;
	return minSatisfying_1;
}
function requireMinVersion() {
	if (hasRequiredMinVersion) return minVersion_1;
	hasRequiredMinVersion = 1;
	const SemVer = requireSemver$1();
	const Range = requireRange();
	const gt = requireGt();
	const minVersion = (range, loose) => {
		range = new Range(range, loose);
		let minver = new SemVer("0.0.0");
		if (range.test(minver)) return minver;
		minver = new SemVer("0.0.0-0");
		if (range.test(minver)) return minver;
		minver = null;
		for (let i = 0; i < range.set.length; ++i) {
			const comparators = range.set[i];
			let setMin = null;
			comparators.forEach((comparator) => {
				const compver = new SemVer(comparator.semver.version);
				switch (comparator.operator) {
					case ">":
						if (compver.prerelease.length === 0) compver.patch++;
						else compver.prerelease.push(0);
						compver.raw = compver.format();
					case "":
					case ">=":
						if (!setMin || gt(compver, setMin)) setMin = compver;
						break;
					case "<":
					case "<=": break;
					default: throw new Error(`Unexpected operation: ${comparator.operator}`);
				}
			});
			if (setMin && (!minver || gt(minver, setMin))) minver = setMin;
		}
		if (minver && range.test(minver)) return minver;
		return null;
	};
	minVersion_1 = minVersion;
	return minVersion_1;
}
function requireValid() {
	if (hasRequiredValid) return valid;
	hasRequiredValid = 1;
	const Range = requireRange();
	const validRange = (range, options) => {
		try {
			return new Range(range, options).range || "*";
		} catch (er) {
			return null;
		}
	};
	valid = validRange;
	return valid;
}
function requireOutside() {
	if (hasRequiredOutside) return outside_1;
	hasRequiredOutside = 1;
	const SemVer = requireSemver$1();
	const Comparator = requireComparator();
	const { ANY } = Comparator;
	const Range = requireRange();
	const satisfies = requireSatisfies();
	const gt = requireGt();
	const lt = requireLt();
	const lte = requireLte();
	const gte = requireGte();
	const outside = (version, range, hilo, options) => {
		version = new SemVer(version, options);
		range = new Range(range, options);
		let gtfn, ltefn, ltfn, comp, ecomp;
		switch (hilo) {
			case ">":
				gtfn = gt;
				ltefn = lte;
				ltfn = lt;
				comp = ">";
				ecomp = ">=";
				break;
			case "<":
				gtfn = lt;
				ltefn = gte;
				ltfn = gt;
				comp = "<";
				ecomp = "<=";
				break;
			default: throw new TypeError("Must provide a hilo val of \"<\" or \">\"");
		}
		if (satisfies(version, range, options)) return false;
		for (let i = 0; i < range.set.length; ++i) {
			const comparators = range.set[i];
			let high = null;
			let low = null;
			comparators.forEach((comparator) => {
				if (comparator.semver === ANY) comparator = new Comparator(">=0.0.0");
				high = high || comparator;
				low = low || comparator;
				if (gtfn(comparator.semver, high.semver, options)) high = comparator;
				else if (ltfn(comparator.semver, low.semver, options)) low = comparator;
			});
			if (high.operator === comp || high.operator === ecomp) return false;
			if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return false;
			else if (low.operator === ecomp && ltfn(version, low.semver)) return false;
		}
		return true;
	};
	outside_1 = outside;
	return outside_1;
}
function requireGtr() {
	if (hasRequiredGtr) return gtr_1;
	hasRequiredGtr = 1;
	const outside = requireOutside();
	const gtr = (version, range, options) => outside(version, range, ">", options);
	gtr_1 = gtr;
	return gtr_1;
}
function requireLtr() {
	if (hasRequiredLtr) return ltr_1;
	hasRequiredLtr = 1;
	const outside = requireOutside();
	const ltr = (version, range, options) => outside(version, range, "<", options);
	ltr_1 = ltr;
	return ltr_1;
}
function requireIntersects() {
	if (hasRequiredIntersects) return intersects_1;
	hasRequiredIntersects = 1;
	const Range = requireRange();
	const intersects = (r1, r2, options) => {
		r1 = new Range(r1, options);
		r2 = new Range(r2, options);
		return r1.intersects(r2, options);
	};
	intersects_1 = intersects;
	return intersects_1;
}
function requireSimplify() {
	if (hasRequiredSimplify) return simplify;
	hasRequiredSimplify = 1;
	const satisfies = requireSatisfies();
	const compare = requireCompare();
	simplify = (versions, range, options) => {
		const set = [];
		let first = null;
		let prev = null;
		const v = versions.sort((a, b) => compare(a, b, options));
		for (const version of v) if (satisfies(version, range, options)) {
			prev = version;
			if (!first) first = version;
		} else {
			if (prev) set.push([first, prev]);
			prev = null;
			first = null;
		}
		if (first) set.push([first, null]);
		const ranges = [];
		for (const [min, max] of set) if (min === max) ranges.push(min);
		else if (!max && min === v[0]) ranges.push("*");
		else if (!max) ranges.push(`>=${min}`);
		else if (min === v[0]) ranges.push(`<=${max}`);
		else ranges.push(`${min} - ${max}`);
		const simplified = ranges.join(" || ");
		const original = typeof range.raw === "string" ? range.raw : String(range);
		return simplified.length < original.length ? simplified : range;
	};
	return simplify;
}
function requireSubset() {
	if (hasRequiredSubset) return subset_1;
	hasRequiredSubset = 1;
	const Range = requireRange();
	const Comparator = requireComparator();
	const { ANY } = Comparator;
	const satisfies = requireSatisfies();
	const compare = requireCompare();
	const subset = (sub, dom, options = {}) => {
		if (sub === dom) return true;
		sub = new Range(sub, options);
		dom = new Range(dom, options);
		let sawNonNull = false;
		OUTER: for (const simpleSub of sub.set) {
			for (const simpleDom of dom.set) {
				const isSub = simpleSubset(simpleSub, simpleDom, options);
				sawNonNull = sawNonNull || isSub !== null;
				if (isSub) continue OUTER;
			}
			if (sawNonNull) return false;
		}
		return true;
	};
	const minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
	const minimumVersion = [new Comparator(">=0.0.0")];
	const simpleSubset = (sub, dom, options) => {
		if (sub === dom) return true;
		if (sub.length === 1 && sub[0].semver === ANY) {
			if (dom.length === 1 && dom[0].semver === ANY) return true;
			else if (options.includePrerelease) sub = minimumVersionWithPreRelease;
			else sub = minimumVersion;
		}
		if (dom.length === 1 && dom[0].semver === ANY) {
			if (options.includePrerelease) return true;
			else dom = minimumVersion;
		}
		const eqSet = new Set();
		let gt, lt;
		for (const c of sub) if (c.operator === ">" || c.operator === ">=") gt = higherGT(gt, c, options);
		else if (c.operator === "<" || c.operator === "<=") lt = lowerLT(lt, c, options);
		else eqSet.add(c.semver);
		if (eqSet.size > 1) return null;
		let gtltComp;
		if (gt && lt) {
			gtltComp = compare(gt.semver, lt.semver, options);
			if (gtltComp > 0) return null;
			else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) return null;
		}
		for (const eq of eqSet) {
			if (gt && !satisfies(eq, String(gt), options)) return null;
			if (lt && !satisfies(eq, String(lt), options)) return null;
			for (const c of dom) if (!satisfies(eq, String(c), options)) return false;
			return true;
		}
		let higher, lower;
		let hasDomLT, hasDomGT;
		let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
		let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
		if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) needDomLTPre = false;
		for (const c of dom) {
			hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
			hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
			if (gt) {
				if (needDomGTPre) {
					if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) needDomGTPre = false;
				}
				if (c.operator === ">" || c.operator === ">=") {
					higher = higherGT(gt, c, options);
					if (higher === c && higher !== gt) return false;
				} else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) return false;
			}
			if (lt) {
				if (needDomLTPre) {
					if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) needDomLTPre = false;
				}
				if (c.operator === "<" || c.operator === "<=") {
					lower = lowerLT(lt, c, options);
					if (lower === c && lower !== lt) return false;
				} else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) return false;
			}
			if (!c.operator && (lt || gt) && gtltComp !== 0) return false;
		}
		if (gt && hasDomLT && !lt && gtltComp !== 0) return false;
		if (lt && hasDomGT && !gt && gtltComp !== 0) return false;
		if (needDomGTPre || needDomLTPre) return false;
		return true;
	};
	const higherGT = (a, b, options) => {
		if (!a) return b;
		const comp = compare(a.semver, b.semver, options);
		return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
	};
	const lowerLT = (a, b, options) => {
		if (!a) return b;
		const comp = compare(a.semver, b.semver, options);
		return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
	};
	subset_1 = subset;
	return subset_1;
}
function requireSemver() {
	if (hasRequiredSemver) return semver;
	hasRequiredSemver = 1;
	const internalRe = requireRe();
	const constants = requireConstants();
	const SemVer = requireSemver$1();
	const identifiers = requireIdentifiers();
	semver = {
		parse: requireParse(),
		valid: requireValid$1(),
		clean: requireClean(),
		inc: requireInc(),
		diff: requireDiff(),
		major: requireMajor(),
		minor: requireMinor(),
		patch: requirePatch(),
		prerelease: requirePrerelease(),
		compare: requireCompare(),
		rcompare: requireRcompare(),
		compareLoose: requireCompareLoose(),
		compareBuild: requireCompareBuild(),
		sort: requireSort(),
		rsort: requireRsort(),
		gt: requireGt(),
		lt: requireLt(),
		eq: requireEq(),
		neq: requireNeq(),
		gte: requireGte(),
		lte: requireLte(),
		cmp: requireCmp(),
		coerce: requireCoerce(),
		Comparator: requireComparator(),
		Range: requireRange(),
		satisfies: requireSatisfies(),
		toComparators: requireToComparators(),
		maxSatisfying: requireMaxSatisfying(),
		minSatisfying: requireMinSatisfying(),
		minVersion: requireMinVersion(),
		validRange: requireValid(),
		outside: requireOutside(),
		gtr: requireGtr(),
		ltr: requireLtr(),
		intersects: requireIntersects(),
		simplifyRange: requireSimplify(),
		subset: requireSubset(),
		SemVer,
		re: internalRe.re,
		src: internalRe.src,
		tokens: internalRe.t,
		SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
		RELEASE_TYPES: constants.RELEASE_TYPES,
		compareIdentifiers: identifiers.compareIdentifiers,
		rcompareIdentifiers: identifiers.rcompareIdentifiers
	};
	return semver;
}
function isCompatible(required, provided) {
	for (const [name, range] of Object.entries(required)) {
		const version = provided[name];
		if (!version) continue;
		if (isSatisfied(range, version) === false) return false;
	}
	return true;
}
function getCompatible(required, provided) {
	const result = {};
	for (const [name, range] of Object.entries(required)) {
		const version = provided[name];
		if (!version) continue;
		if (isSatisfied(range, version) === true) result[name] = version;
	}
	return result;
}
function getCoerced(versions) {
	const result = {};
	for (const [name, version] of Object.entries(versions)) {
		const coerced = semverExports.coerce(version);
		if (coerced) result[name] = coerced.version;
	}
	return result;
}
function isSatisfied(range, version) {
	if (!semverExports.validRange(range)) return null;
	const coerced = semverExports.coerce(version);
	if (!coerced) return null;
	return semverExports.satisfies(coerced, range);
}
var re, constants, hasRequiredConstants, debug_1, hasRequiredDebug, hasRequiredRe, parseOptions_1, hasRequiredParseOptions, identifiers, hasRequiredIdentifiers, semver$1, hasRequiredSemver$1, parse_1, hasRequiredParse, valid_1, hasRequiredValid$1, clean_1, hasRequiredClean, inc_1, hasRequiredInc, diff_1, hasRequiredDiff, major_1, hasRequiredMajor, minor_1, hasRequiredMinor, patch_1, hasRequiredPatch, prerelease_1, hasRequiredPrerelease, compare_1, hasRequiredCompare, rcompare_1, hasRequiredRcompare, compareLoose_1, hasRequiredCompareLoose, compareBuild_1, hasRequiredCompareBuild, sort_1, hasRequiredSort, rsort_1, hasRequiredRsort, gt_1, hasRequiredGt, lt_1, hasRequiredLt, eq_1, hasRequiredEq, neq_1, hasRequiredNeq, gte_1, hasRequiredGte, lte_1, hasRequiredLte, cmp_1, hasRequiredCmp, coerce_1, hasRequiredCoerce, lrucache, hasRequiredLrucache, range, hasRequiredRange, comparator, hasRequiredComparator, satisfies_1, hasRequiredSatisfies, toComparators_1, hasRequiredToComparators, maxSatisfying_1, hasRequiredMaxSatisfying, minSatisfying_1, hasRequiredMinSatisfying, minVersion_1, hasRequiredMinVersion, valid, hasRequiredValid, outside_1, hasRequiredOutside, gtr_1, hasRequiredGtr, ltr_1, hasRequiredLtr, intersects_1, hasRequiredIntersects, simplify, hasRequiredSimplify, subset_1, hasRequiredSubset, semver, hasRequiredSemver, semverExports;
var init_dist$1 = __esmMin((() => {
	re = { exports: {} };
	semverExports = requireSemver();
}));
//#endregion
//#region ../../node_modules/@lezer/lr/dist/index.js
function decodeArray(input, Type = Uint16Array) {
	if (typeof input != "string") return input;
	let array = null;
	for (let pos = 0, out = 0; pos < input.length;) {
		let value = 0;
		for (;;) {
			let next = input.charCodeAt(pos++), stop = false;
			if (next == 126) {
				value = 65535;
				break;
			}
			if (next >= 92) next--;
			if (next >= 34) next--;
			let digit = next - 32;
			if (digit >= 46) {
				digit -= 46;
				stop = true;
			}
			value += digit;
			if (stop) break;
			value *= 46;
		}
		if (array) array[out++] = value;
		else array = new Type(value);
	}
	return array;
}
function readToken(data, input, stack, group, precTable, precOffset) {
	let state = 0, groupMask = 1 << group, { dialect } = stack.p.parser;
	scan: for (;;) {
		if ((groupMask & data[state]) == 0) break;
		let accEnd = data[state + 1];
		for (let i = state + 3; i < accEnd; i += 2) if ((data[i + 1] & groupMask) > 0) {
			let term = data[i];
			if (dialect.allows(term) && (input.token.value == -1 || input.token.value == term || overrides(term, input.token.value, precTable, precOffset))) {
				input.acceptToken(term);
				break;
			}
		}
		let next = input.next, low = 0, high = data[state + 2];
		if (input.next < 0 && high > low && data[accEnd + high * 3 - 3] == 65535) {
			state = data[accEnd + high * 3 - 1];
			continue scan;
		}
		for (; low < high;) {
			let mid = low + high >> 1;
			let index = accEnd + mid + (mid << 1);
			let from = data[index], to = data[index + 1] || 65536;
			if (next < from) high = mid;
			else if (next >= to) low = mid + 1;
			else {
				state = data[index + 2];
				input.advance();
				continue scan;
			}
		}
		break;
	}
}
function findOffset(data, start, term) {
	for (let i = start, next; (next = data[i]) != 65535; i++) if (next == term) return i - start;
	return -1;
}
function overrides(token, prev, tableData, tableOffset) {
	let iPrev = findOffset(tableData, tableOffset, prev);
	return iPrev < 0 || findOffset(tableData, tableOffset, token) < iPrev;
}
function cutAt(tree, pos, side) {
	let cursor = tree.cursor(IterMode.IncludeAnonymous);
	cursor.moveTo(pos);
	for (;;) if (!(side < 0 ? cursor.childBefore(pos) : cursor.childAfter(pos))) for (;;) {
		if ((side < 0 ? cursor.to < pos : cursor.from > pos) && !cursor.type.isError) return side < 0 ? Math.max(0, Math.min(cursor.to - 1, pos - 25)) : Math.min(tree.length, Math.max(cursor.from + 1, pos + 25));
		if (side < 0 ? cursor.prevSibling() : cursor.nextSibling()) break;
		if (!cursor.parent()) return side < 0 ? 0 : tree.length;
	}
}
function pushStackDedup(stack, newStacks) {
	for (let i = 0; i < newStacks.length; i++) {
		let other = newStacks[i];
		if (other.pos == stack.pos && other.sameState(stack)) {
			if (newStacks[i].score < stack.score) newStacks[i] = stack;
			return;
		}
	}
	newStacks.push(stack);
}
function pair(data, off) {
	return data[off] | data[off + 1] << 16;
}
function findFinished(stacks) {
	let best = null;
	for (let stack of stacks) {
		let stopped = stack.p.stoppedAt;
		if ((stack.pos == stack.p.stream.end || stopped != null && stack.pos > stopped) && stack.p.parser.stateFlag(stack.state, 2) && (!best || best.score < stack.score)) best = stack;
	}
	return best;
}
function getSpecializer(spec) {
	if (spec.external) {
		let mask = spec.extend ? 1 : 0;
		return (value, stack) => spec.external(value, stack) << 1 | mask;
	}
	return spec.get;
}
var Stack, StackContext, SimulatedStack, StackBufferCursor, CachedToken, nullToken, InputStream, TokenGroup, LocalTokenGroup, ExternalTokenizer, verbose, stackIDs, FragmentCursor, TokenCache, Parse, Dialect, id, ContextTracker, LRParser;
var init_dist = __esmMin((() => {
	init_dist$3();
	Stack = class Stack {
		constructor(p, stack, state, reducePos, pos, score, buffer, bufferBase, curContext, lookAhead = 0, parent) {
			this.p = p;
			this.stack = stack;
			this.state = state;
			this.reducePos = reducePos;
			this.pos = pos;
			this.score = score;
			this.buffer = buffer;
			this.bufferBase = bufferBase;
			this.curContext = curContext;
			this.lookAhead = lookAhead;
			this.parent = parent;
		}
		toString() {
			return `[${this.stack.filter((_, i) => i % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
		}
		static start(p, state, pos = 0) {
			let cx = p.parser.context;
			return new Stack(p, [], state, pos, pos, 0, [], 0, cx ? new StackContext(cx, cx.start) : null, 0, null);
		}
		get context() {
			return this.curContext ? this.curContext.context : null;
		}
		pushState(state, start) {
			this.stack.push(this.state, start, this.bufferBase + this.buffer.length);
			this.state = state;
		}
		reduce(action) {
			var _a;
			let depth = action >> 19, type = action & 65535;
			let { parser } = this.p;
			let lookaheadRecord = this.reducePos < this.pos - 25 && this.setLookAhead(this.pos);
			let dPrec = parser.dynamicPrecedence(type);
			if (dPrec) this.score += dPrec;
			if (depth == 0) {
				if (type < parser.minRepeatTerm && this.reducePos < this.pos) this.reducePos = this.pos;
				this.pushState(parser.getGoto(this.state, type, true), this.reducePos);
				if (type < parser.minRepeatTerm) this.storeNode(type, this.reducePos, this.reducePos, lookaheadRecord ? 8 : 4, true);
				this.reduceContext(type, this.reducePos);
				return;
			}
			let base = this.stack.length - (depth - 1) * 3 - (action & 262144 ? 6 : 0);
			let start = base ? this.stack[base - 2] : this.p.ranges[0].from;
			if (type < parser.minRepeatTerm && start == this.reducePos && this.reducePos < this.pos) this.reducePos = this.pos;
			let size = this.reducePos - start;
			if (size >= 2e3 && !((_a = this.p.parser.nodeSet.types[type]) === null || _a === void 0 ? void 0 : _a.isAnonymous)) {
				if (start == this.p.lastBigReductionStart) {
					this.p.bigReductionCount++;
					this.p.lastBigReductionSize = size;
				} else if (this.p.lastBigReductionSize < size) {
					this.p.bigReductionCount = 1;
					this.p.lastBigReductionStart = start;
					this.p.lastBigReductionSize = size;
				}
			}
			let bufferBase = base ? this.stack[base - 1] : 0, count = this.bufferBase + this.buffer.length - bufferBase;
			if (type < parser.minRepeatTerm || action & 131072) {
				let pos = parser.stateFlag(this.state, 1) ? this.pos : this.reducePos;
				this.storeNode(type, start, pos, count + 4, true);
			}
			if (action & 262144) this.state = this.stack[base];
			else {
				let baseStateID = this.stack[base - 3];
				this.state = parser.getGoto(baseStateID, type, true);
			}
			while (this.stack.length > base) this.stack.pop();
			this.reduceContext(type, start);
		}
		storeNode(term, start, end, size = 4, mustSink = false) {
			if (term == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
				let top = this.buffer.length;
				if (top > 0 && this.buffer[top - 4] == 0 && this.buffer[top - 1] > -1) {
					if (start == end) return;
					if (this.buffer[top - 2] >= start) {
						this.buffer[top - 2] = end;
						return;
					}
				}
			}
			if (!mustSink || this.pos == end) this.buffer.push(term, start, end, size);
			else {
				let index = this.buffer.length;
				if (index > 0 && (this.buffer[index - 4] != 0 || this.buffer[index - 1] < 0)) {
					let mustMove = false;
					for (let scan = index; scan > 0 && this.buffer[scan - 2] > end; scan -= 4) if (this.buffer[scan - 1] >= 0) {
						mustMove = true;
						break;
					}
					if (mustMove) while (index > 0 && this.buffer[index - 2] > end) {
						this.buffer[index] = this.buffer[index - 4];
						this.buffer[index + 1] = this.buffer[index - 3];
						this.buffer[index + 2] = this.buffer[index - 2];
						this.buffer[index + 3] = this.buffer[index - 1];
						index -= 4;
						if (size > 4) size -= 4;
					}
				}
				this.buffer[index] = term;
				this.buffer[index + 1] = start;
				this.buffer[index + 2] = end;
				this.buffer[index + 3] = size;
			}
		}
		shift(action, type, start, end) {
			if (action & 131072) this.pushState(action & 65535, this.pos);
			else if ((action & 262144) == 0) {
				let nextState = action, { parser } = this.p;
				this.pos = end;
				let skipped = parser.stateFlag(nextState, 1);
				if (!skipped && (end > start || type <= parser.maxNode)) this.reducePos = end;
				this.pushState(nextState, skipped ? start : Math.min(start, this.reducePos));
				this.shiftContext(type, start);
				if (type <= parser.maxNode) this.buffer.push(type, start, end, 4);
			} else {
				this.pos = end;
				this.shiftContext(type, start);
				if (type <= this.p.parser.maxNode) this.buffer.push(type, start, end, 4);
			}
		}
		apply(action, next, nextStart, nextEnd) {
			if (action & 65536) this.reduce(action);
			else this.shift(action, next, nextStart, nextEnd);
		}
		useNode(value, next, start) {
			let index = this.p.reused.length - 1;
			if (index < 0 || this.p.reused[index] != value) {
				this.p.reused.push(value);
				index++;
			}
			let end = this.reducePos = this.pos = start + value.length;
			this.pushState(next, start);
			this.buffer.push(index, start, end, -1);
			if (this.curContext) this.updateContext(this.curContext.tracker.reuse(this.curContext.context, value, this, this.p.stream.reset(this.pos - value.length)));
		}
		split() {
			let parent = this;
			let off = parent.buffer.length;
			if (off && parent.buffer[off - 4] == 0) off -= 4;
			while (off > 0 && parent.buffer[off - 2] > parent.reducePos) off -= 4;
			let buffer = parent.buffer.slice(off), base = parent.bufferBase + off;
			while (parent && base == parent.bufferBase) parent = parent.parent;
			return new Stack(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, buffer, base, this.curContext, this.lookAhead, parent);
		}
		recoverByDelete(next, nextEnd) {
			let isNode = next <= this.p.parser.maxNode;
			if (isNode) this.storeNode(next, this.pos, nextEnd, 4);
			this.storeNode(0, this.pos, nextEnd, isNode ? 8 : 4);
			this.pos = this.reducePos = nextEnd;
			this.score -= 190;
		}
		canShift(term) {
			for (let sim = new SimulatedStack(this);;) {
				let action = this.p.parser.stateSlot(sim.state, 4) || this.p.parser.hasAction(sim.state, term);
				if (action == 0) return false;
				if ((action & 65536) == 0) return true;
				sim.reduce(action);
			}
		}
		recoverByInsert(next) {
			if (this.stack.length >= 300) return [];
			let nextStates = this.p.parser.nextStates(this.state);
			if (nextStates.length > 8 || this.stack.length >= 120) {
				let best = [];
				for (let i = 0, s; i < nextStates.length; i += 2) if ((s = nextStates[i + 1]) != this.state && this.p.parser.hasAction(s, next)) best.push(nextStates[i], s);
				if (this.stack.length < 120) for (let i = 0; best.length < 8 && i < nextStates.length; i += 2) {
					let s = nextStates[i + 1];
					if (!best.some((v, i) => i & 1 && v == s)) best.push(nextStates[i], s);
				}
				nextStates = best;
			}
			let result = [];
			for (let i = 0; i < nextStates.length && result.length < 4; i += 2) {
				let s = nextStates[i + 1];
				if (s == this.state) continue;
				let stack = this.split();
				stack.pushState(s, this.pos);
				stack.storeNode(0, stack.pos, stack.pos, 4, true);
				stack.shiftContext(nextStates[i], this.pos);
				stack.reducePos = this.pos;
				stack.score -= 200;
				result.push(stack);
			}
			return result;
		}
		forceReduce() {
			let { parser } = this.p;
			let reduce = parser.stateSlot(this.state, 5);
			if ((reduce & 65536) == 0) return false;
			if (!parser.validAction(this.state, reduce)) {
				let depth = reduce >> 19, term = reduce & 65535;
				let target = this.stack.length - depth * 3;
				if (target < 0 || parser.getGoto(this.stack[target], term, false) < 0) {
					let backup = this.findForcedReduction();
					if (backup == null) return false;
					reduce = backup;
				}
				this.storeNode(0, this.pos, this.pos, 4, true);
				this.score -= 100;
			}
			this.reducePos = this.pos;
			this.reduce(reduce);
			return true;
		}
		findForcedReduction() {
			let { parser } = this.p, seen = [];
			let explore = (state, depth) => {
				if (seen.includes(state)) return;
				seen.push(state);
				return parser.allActions(state, (action) => {
					if (action & 393216);
					else if (action & 65536) {
						let rDepth = (action >> 19) - depth;
						if (rDepth > 1) {
							let term = action & 65535, target = this.stack.length - rDepth * 3;
							if (target >= 0 && parser.getGoto(this.stack[target], term, false) >= 0) return rDepth << 19 | 65536 | term;
						}
					} else {
						let found = explore(action, depth + 1);
						if (found != null) return found;
					}
				});
			};
			return explore(this.state, 0);
		}
		forceAll() {
			while (!this.p.parser.stateFlag(this.state, 2)) if (!this.forceReduce()) {
				this.storeNode(0, this.pos, this.pos, 4, true);
				break;
			}
			return this;
		}
		get deadEnd() {
			if (this.stack.length != 3) return false;
			let { parser } = this.p;
			return parser.data[parser.stateSlot(this.state, 1)] == 65535 && !parser.stateSlot(this.state, 4);
		}
		restart() {
			this.storeNode(0, this.pos, this.pos, 4, true);
			this.state = this.stack[0];
			this.stack.length = 0;
		}
		sameState(other) {
			if (this.state != other.state || this.stack.length != other.stack.length) return false;
			for (let i = 0; i < this.stack.length; i += 3) if (this.stack[i] != other.stack[i]) return false;
			return true;
		}
		get parser() {
			return this.p.parser;
		}
		dialectEnabled(dialectID) {
			return this.p.parser.dialect.flags[dialectID];
		}
		shiftContext(term, start) {
			if (this.curContext) this.updateContext(this.curContext.tracker.shift(this.curContext.context, term, this, this.p.stream.reset(start)));
		}
		reduceContext(term, start) {
			if (this.curContext) this.updateContext(this.curContext.tracker.reduce(this.curContext.context, term, this, this.p.stream.reset(start)));
		}
		emitContext() {
			let last = this.buffer.length - 1;
			if (last < 0 || this.buffer[last] != -3) this.storeNode(this.curContext.hash, this.reducePos, this.reducePos, -3, true);
		}
		emitLookAhead() {
			let last = this.buffer.length - 1;
			if (last < 0 || this.buffer[last] != -4) this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
		}
		updateContext(context) {
			if (context != this.curContext.context) {
				let newCx = new StackContext(this.curContext.tracker, context);
				if (newCx.hash != this.curContext.hash) this.emitContext();
				this.curContext = newCx;
			}
		}
		setLookAhead(lookAhead) {
			if (lookAhead <= this.lookAhead) return false;
			this.emitLookAhead();
			this.lookAhead = lookAhead;
			return true;
		}
		close() {
			if (this.curContext && this.curContext.tracker.strict) this.emitContext();
			if (this.lookAhead > 0) this.emitLookAhead();
		}
	};
	StackContext = class {
		constructor(tracker, context) {
			this.tracker = tracker;
			this.context = context;
			this.hash = tracker.strict ? tracker.hash(context) : 0;
		}
	};
	SimulatedStack = class {
		constructor(start) {
			this.start = start;
			this.state = start.state;
			this.stack = start.stack;
			this.base = this.stack.length;
		}
		reduce(action) {
			let term = action & 65535, depth = action >> 19;
			if (depth == 0) {
				if (this.stack == this.start.stack) this.stack = this.stack.slice();
				this.stack.push(this.state, 0, 0);
				this.base += 3;
			} else this.base -= (depth - 1) * 3;
			let goto = this.start.p.parser.getGoto(this.stack[this.base - 3], term, true);
			this.state = goto;
		}
	};
	StackBufferCursor = class StackBufferCursor {
		constructor(stack, pos, index) {
			this.stack = stack;
			this.pos = pos;
			this.index = index;
			this.buffer = stack.buffer;
			if (this.index == 0) this.maybeNext();
		}
		static create(stack, pos = stack.bufferBase + stack.buffer.length) {
			return new StackBufferCursor(stack, pos, pos - stack.bufferBase);
		}
		maybeNext() {
			let next = this.stack.parent;
			if (next != null) {
				this.index = this.stack.bufferBase - next.bufferBase;
				this.stack = next;
				this.buffer = next.buffer;
			}
		}
		get id() {
			return this.buffer[this.index - 4];
		}
		get start() {
			return this.buffer[this.index - 3];
		}
		get end() {
			return this.buffer[this.index - 2];
		}
		get size() {
			return this.buffer[this.index - 1];
		}
		next() {
			this.index -= 4;
			this.pos -= 4;
			if (this.index == 0) this.maybeNext();
		}
		fork() {
			return new StackBufferCursor(this.stack, this.pos, this.index);
		}
	};
	CachedToken = class {
		constructor() {
			this.start = -1;
			this.value = -1;
			this.end = -1;
			this.extended = -1;
			this.lookAhead = 0;
			this.mask = 0;
			this.context = 0;
		}
	};
	nullToken = new CachedToken();
	InputStream = class {
		constructor(input, ranges) {
			this.input = input;
			this.ranges = ranges;
			this.chunk = "";
			this.chunkOff = 0;
			this.chunk2 = "";
			this.chunk2Pos = 0;
			this.next = -1;
			this.token = nullToken;
			this.rangeIndex = 0;
			this.pos = this.chunkPos = ranges[0].from;
			this.range = ranges[0];
			this.end = ranges[ranges.length - 1].to;
			this.readNext();
		}
		resolveOffset(offset, assoc) {
			let range = this.range, index = this.rangeIndex;
			let pos = this.pos + offset;
			while (pos < range.from) {
				if (!index) return null;
				let next = this.ranges[--index];
				pos -= range.from - next.to;
				range = next;
			}
			while (assoc < 0 ? pos > range.to : pos >= range.to) {
				if (index == this.ranges.length - 1) return null;
				let next = this.ranges[++index];
				pos += next.from - range.to;
				range = next;
			}
			return pos;
		}
		clipPos(pos) {
			if (pos >= this.range.from && pos < this.range.to) return pos;
			for (let range of this.ranges) if (range.to > pos) return Math.max(pos, range.from);
			return this.end;
		}
		peek(offset) {
			let idx = this.chunkOff + offset, pos, result;
			if (idx >= 0 && idx < this.chunk.length) {
				pos = this.pos + offset;
				result = this.chunk.charCodeAt(idx);
			} else {
				let resolved = this.resolveOffset(offset, 1);
				if (resolved == null) return -1;
				pos = resolved;
				if (pos >= this.chunk2Pos && pos < this.chunk2Pos + this.chunk2.length) result = this.chunk2.charCodeAt(pos - this.chunk2Pos);
				else {
					let i = this.rangeIndex, range = this.range;
					while (range.to <= pos) range = this.ranges[++i];
					this.chunk2 = this.input.chunk(this.chunk2Pos = pos);
					if (pos + this.chunk2.length > range.to) this.chunk2 = this.chunk2.slice(0, range.to - pos);
					result = this.chunk2.charCodeAt(0);
				}
			}
			if (pos >= this.token.lookAhead) this.token.lookAhead = pos + 1;
			return result;
		}
		acceptToken(token, endOffset = 0) {
			let end = endOffset ? this.resolveOffset(endOffset, -1) : this.pos;
			if (end == null || end < this.token.start) throw new RangeError("Token end out of bounds");
			this.token.value = token;
			this.token.end = end;
		}
		acceptTokenTo(token, endPos) {
			this.token.value = token;
			this.token.end = endPos;
		}
		getChunk() {
			if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
				let { chunk, chunkPos } = this;
				this.chunk = this.chunk2;
				this.chunkPos = this.chunk2Pos;
				this.chunk2 = chunk;
				this.chunk2Pos = chunkPos;
				this.chunkOff = this.pos - this.chunkPos;
			} else {
				this.chunk2 = this.chunk;
				this.chunk2Pos = this.chunkPos;
				let nextChunk = this.input.chunk(this.pos);
				let end = this.pos + nextChunk.length;
				this.chunk = end > this.range.to ? nextChunk.slice(0, this.range.to - this.pos) : nextChunk;
				this.chunkPos = this.pos;
				this.chunkOff = 0;
			}
		}
		readNext() {
			if (this.chunkOff >= this.chunk.length) {
				this.getChunk();
				if (this.chunkOff == this.chunk.length) return this.next = -1;
			}
			return this.next = this.chunk.charCodeAt(this.chunkOff);
		}
		advance(n = 1) {
			this.chunkOff += n;
			while (this.pos + n >= this.range.to) {
				if (this.rangeIndex == this.ranges.length - 1) return this.setDone();
				n -= this.range.to - this.pos;
				this.range = this.ranges[++this.rangeIndex];
				this.pos = this.range.from;
			}
			this.pos += n;
			if (this.pos >= this.token.lookAhead) this.token.lookAhead = this.pos + 1;
			return this.readNext();
		}
		setDone() {
			this.pos = this.chunkPos = this.end;
			this.range = this.ranges[this.rangeIndex = this.ranges.length - 1];
			this.chunk = "";
			return this.next = -1;
		}
		reset(pos, token) {
			if (token) {
				this.token = token;
				token.start = pos;
				token.lookAhead = pos + 1;
				token.value = token.extended = -1;
			} else this.token = nullToken;
			if (this.pos != pos) {
				this.pos = pos;
				if (pos == this.end) {
					this.setDone();
					return this;
				}
				while (pos < this.range.from) this.range = this.ranges[--this.rangeIndex];
				while (pos >= this.range.to) this.range = this.ranges[++this.rangeIndex];
				if (pos >= this.chunkPos && pos < this.chunkPos + this.chunk.length) this.chunkOff = pos - this.chunkPos;
				else {
					this.chunk = "";
					this.chunkOff = 0;
				}
				this.readNext();
			}
			return this;
		}
		read(from, to) {
			if (from >= this.chunkPos && to <= this.chunkPos + this.chunk.length) return this.chunk.slice(from - this.chunkPos, to - this.chunkPos);
			if (from >= this.chunk2Pos && to <= this.chunk2Pos + this.chunk2.length) return this.chunk2.slice(from - this.chunk2Pos, to - this.chunk2Pos);
			if (from >= this.range.from && to <= this.range.to) return this.input.read(from, to);
			let result = "";
			for (let r of this.ranges) {
				if (r.from >= to) break;
				if (r.to > from) result += this.input.read(Math.max(r.from, from), Math.min(r.to, to));
			}
			return result;
		}
	};
	TokenGroup = class {
		constructor(data, id) {
			this.data = data;
			this.id = id;
		}
		token(input, stack) {
			let { parser } = stack.p;
			readToken(this.data, input, stack, this.id, parser.data, parser.tokenPrecTable);
		}
	};
	TokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
	LocalTokenGroup = class {
		constructor(data, precTable, elseToken) {
			this.precTable = precTable;
			this.elseToken = elseToken;
			this.data = typeof data == "string" ? decodeArray(data) : data;
		}
		token(input, stack) {
			let start = input.pos, skipped = 0;
			for (;;) {
				let atEof = input.next < 0, nextPos = input.resolveOffset(1, 1);
				readToken(this.data, input, stack, 0, this.data, this.precTable);
				if (input.token.value > -1) break;
				if (this.elseToken == null) return;
				if (!atEof) skipped++;
				if (nextPos == null) break;
				input.reset(nextPos, input.token);
			}
			if (skipped) {
				input.reset(start, input.token);
				input.acceptToken(this.elseToken, skipped);
			}
		}
	};
	LocalTokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
	ExternalTokenizer = class {
		constructor(token, options = {}) {
			this.token = token;
			this.contextual = !!options.contextual;
			this.fallback = !!options.fallback;
			this.extend = !!options.extend;
		}
	};
	verbose = typeof process != "undefined" && /\bparse\b/.test({}.LOG);
	stackIDs = null;
	FragmentCursor = class {
		constructor(fragments, minRepeat) {
			this.fragments = fragments;
			this.minRepeat = minRepeat;
			this.i = 0;
			this.fragment = null;
			this.safeFrom = -1;
			this.safeTo = -1;
			this.trees = [];
			this.start = [];
			this.index = [];
			this.lastRepeat = null;
			this.lastRepeatPos = -1;
			this.nextFragment();
		}
		nextFragment() {
			let fr = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
			if (fr) {
				this.safeFrom = fr.openStart ? cutAt(fr.tree, fr.from + fr.offset, 1) - fr.offset : fr.from;
				this.safeTo = fr.openEnd ? cutAt(fr.tree, fr.to + fr.offset, -1) - fr.offset : fr.to;
				while (this.trees.length) {
					this.trees.pop();
					this.start.pop();
					this.index.pop();
				}
				this.trees.push(fr.tree);
				this.start.push(-fr.offset);
				this.index.push(0);
				this.nextStart = this.safeFrom;
			} else this.nextStart = 1e9;
		}
		nodeAt(pos) {
			if (pos < this.nextStart) return null;
			while (this.fragment && this.safeTo <= pos) this.nextFragment();
			if (!this.fragment) return null;
			for (;;) {
				let last = this.trees.length - 1;
				if (last < 0) {
					this.nextFragment();
					return null;
				}
				let top = this.trees[last], index = this.index[last];
				if (index == top.children.length) {
					this.trees.pop();
					this.start.pop();
					this.index.pop();
					continue;
				}
				let next = top.children[index];
				let start = this.start[last] + top.positions[index];
				if (start > pos) {
					this.nextStart = start;
					return null;
				}
				if (next instanceof Tree) {
					let storeRepeat = start > this.lastRepeatPos && next.type.id >= this.minRepeat;
					if (start == pos || storeRepeat) {
						let end = start + next.length, lookahead;
						if (start >= this.safeFrom && end <= this.safeTo && (!(lookahead = next.prop(NodeProp.lookAhead)) || end + lookahead < this.fragment.to)) {
							if (storeRepeat) {
								this.lastRepeat = next;
								this.lastRepeatPos = start;
							}
							if (start == pos) return next;
						} else if (start == pos) return null;
					}
					this.index[last]++;
					if (start + next.length >= Math.max(this.safeFrom, pos)) {
						this.trees.push(next);
						this.start.push(start);
						this.index.push(0);
					}
				} else {
					this.index[last]++;
					this.nextStart = start + next.length;
				}
			}
		}
	};
	TokenCache = class {
		constructor(parser, stream) {
			this.stream = stream;
			this.tokens = [];
			this.mainToken = null;
			this.actions = [];
			this.tokens = parser.tokenizers.map((_) => new CachedToken());
		}
		getActions(stack) {
			let actionIndex = 0;
			let main = null;
			let { parser } = stack.p, { tokenizers } = parser;
			let mask = parser.stateSlot(stack.state, 3);
			let context = stack.curContext ? stack.curContext.hash : 0;
			let lookAhead = 0;
			for (let i = 0; i < tokenizers.length; i++) {
				if ((1 << i & mask) == 0) continue;
				let tokenizer = tokenizers[i], token = this.tokens[i];
				if (main && !tokenizer.fallback) continue;
				if (tokenizer.contextual || token.start != stack.pos || token.mask != mask || token.context != context) {
					this.updateCachedToken(token, tokenizer, stack);
					token.mask = mask;
					token.context = context;
				}
				if (token.lookAhead > token.end + 25) lookAhead = Math.max(token.lookAhead, lookAhead);
				if (token.value != 0) {
					let startIndex = actionIndex;
					if (token.extended > -1) actionIndex = this.addActions(stack, token.extended, token.end, actionIndex);
					actionIndex = this.addActions(stack, token.value, token.end, actionIndex);
					if (!tokenizer.extend) {
						main = token;
						if (actionIndex > startIndex) break;
					}
				}
			}
			while (this.actions.length > actionIndex) this.actions.pop();
			if (lookAhead) stack.setLookAhead(lookAhead);
			if (!main && stack.pos == this.stream.end) {
				main = new CachedToken();
				main.value = stack.p.parser.eofTerm;
				main.start = main.end = stack.pos;
				actionIndex = this.addActions(stack, main.value, main.end, actionIndex);
			}
			this.mainToken = main;
			return this.actions;
		}
		getMainToken(stack) {
			if (this.mainToken) return this.mainToken;
			let main = new CachedToken(), { pos, p } = stack;
			main.start = pos;
			main.end = Math.min(pos + 1, p.stream.end);
			main.value = pos == p.stream.end ? p.parser.eofTerm : 0;
			return main;
		}
		updateCachedToken(token, tokenizer, stack) {
			let start = this.stream.clipPos(stack.pos);
			tokenizer.token(this.stream.reset(start, token), stack);
			if (token.value > -1) {
				let { parser } = stack.p;
				for (let i = 0; i < parser.specialized.length; i++) if (parser.specialized[i] == token.value) {
					let result = parser.specializers[i](this.stream.read(token.start, token.end), stack);
					if (result >= 0 && stack.p.parser.dialect.allows(result >> 1)) {
						if ((result & 1) == 0) token.value = result >> 1;
						else token.extended = result >> 1;
						break;
					}
				}
			} else {
				token.value = 0;
				token.end = this.stream.clipPos(start + 1);
			}
		}
		putAction(action, token, end, index) {
			for (let i = 0; i < index; i += 3) if (this.actions[i] == action) return index;
			this.actions[index++] = action;
			this.actions[index++] = token;
			this.actions[index++] = end;
			return index;
		}
		addActions(stack, token, end, index) {
			let { state } = stack, { parser } = stack.p, { data } = parser;
			for (let set = 0; set < 2; set++) for (let i = parser.stateSlot(state, set ? 2 : 1);; i += 3) {
				if (data[i] == 65535) {
					if (data[i + 1] == 1) i = pair(data, i + 2);
					else {
						if (index == 0 && data[i + 1] == 2) index = this.putAction(pair(data, i + 2), token, end, index);
						break;
					}
				}
				if (data[i] == token) index = this.putAction(pair(data, i + 1), token, end, index);
			}
			return index;
		}
	};
	Parse = class {
		constructor(parser, input, fragments, ranges) {
			this.parser = parser;
			this.input = input;
			this.ranges = ranges;
			this.recovering = 0;
			this.nextStackID = 9812;
			this.minStackPos = 0;
			this.reused = [];
			this.stoppedAt = null;
			this.lastBigReductionStart = -1;
			this.lastBigReductionSize = 0;
			this.bigReductionCount = 0;
			this.stream = new InputStream(input, ranges);
			this.tokens = new TokenCache(parser, this.stream);
			this.topTerm = parser.top[1];
			let { from } = ranges[0];
			this.stacks = [Stack.start(this, parser.top[0], from)];
			this.fragments = fragments.length && this.stream.end - from > parser.bufferLength * 4 ? new FragmentCursor(fragments, parser.minRepeatTerm) : null;
		}
		get parsedPos() {
			return this.minStackPos;
		}
		advance() {
			let stacks = this.stacks, pos = this.minStackPos;
			let newStacks = this.stacks = [];
			let stopped, stoppedTokens;
			if (this.bigReductionCount > 300 && stacks.length == 1) {
				let [s] = stacks;
				while (s.forceReduce() && s.stack.length && s.stack[s.stack.length - 2] >= this.lastBigReductionStart);
				this.bigReductionCount = this.lastBigReductionSize = 0;
			}
			for (let i = 0; i < stacks.length; i++) {
				let stack = stacks[i];
				for (;;) {
					this.tokens.mainToken = null;
					if (stack.pos > pos) newStacks.push(stack);
					else if (this.advanceStack(stack, newStacks, stacks)) continue;
					else {
						if (!stopped) {
							stopped = [];
							stoppedTokens = [];
						}
						stopped.push(stack);
						let tok = this.tokens.getMainToken(stack);
						stoppedTokens.push(tok.value, tok.end);
					}
					break;
				}
			}
			if (!newStacks.length) {
				let finished = stopped && findFinished(stopped);
				if (finished) {
					if (verbose) console.log("Finish with " + this.stackID(finished));
					return this.stackToTree(finished);
				}
				if (this.parser.strict) {
					if (verbose && stopped) console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none"));
					throw new SyntaxError("No parse at " + pos);
				}
				if (!this.recovering) this.recovering = 5;
			}
			if (this.recovering && stopped) {
				let finished = this.stoppedAt != null && stopped[0].pos > this.stoppedAt ? stopped[0] : this.runRecovery(stopped, stoppedTokens, newStacks);
				if (finished) {
					if (verbose) console.log("Force-finish " + this.stackID(finished));
					return this.stackToTree(finished.forceAll());
				}
			}
			if (this.recovering) {
				let maxRemaining = this.recovering == 1 ? 1 : this.recovering * 3;
				if (newStacks.length > maxRemaining) {
					newStacks.sort((a, b) => b.score - a.score);
					while (newStacks.length > maxRemaining) newStacks.pop();
				}
				if (newStacks.some((s) => s.reducePos > pos)) this.recovering--;
			} else if (newStacks.length > 1) {
				outer: for (let i = 0; i < newStacks.length - 1; i++) {
					let stack = newStacks[i];
					for (let j = i + 1; j < newStacks.length; j++) {
						let other = newStacks[j];
						if (stack.sameState(other) || stack.buffer.length > 500 && other.buffer.length > 500) {
							if ((stack.score - other.score || stack.buffer.length - other.buffer.length) > 0) newStacks.splice(j--, 1);
							else {
								newStacks.splice(i--, 1);
								continue outer;
							}
						}
					}
				}
				if (newStacks.length > 12) {
					newStacks.sort((a, b) => b.score - a.score);
					newStacks.splice(12, newStacks.length - 12);
				}
			}
			this.minStackPos = newStacks[0].pos;
			for (let i = 1; i < newStacks.length; i++) if (newStacks[i].pos < this.minStackPos) this.minStackPos = newStacks[i].pos;
			return null;
		}
		stopAt(pos) {
			if (this.stoppedAt != null && this.stoppedAt < pos) throw new RangeError("Can't move stoppedAt forward");
			this.stoppedAt = pos;
		}
		tryReuse(stack, start, tree, repeatOnly) {
			if (!tree) return null;
			let strictCx = stack.curContext && stack.curContext.tracker.strict, cxHash = strictCx ? stack.curContext.hash : 0;
			for (; tree;) {
				let match = this.parser.nodeSet.types[tree.type.id] != tree.type ? -1 : this.parser.getGoto(stack.state, tree.type.id);
				if (match > -1 && tree.length && (!strictCx || (tree.prop(NodeProp.contextHash) || 0) == cxHash)) {
					stack.useNode(tree, match, start);
					return tree;
				}
				if (tree.children.length == 0 || tree.positions[0] > 0) break;
				let inner = tree.children[0];
				if (inner instanceof Tree && (!repeatOnly || inner.type.id >= this.parser.minRepeatTerm)) tree = inner;
				else break;
			}
			return null;
		}
		advanceStack(stack, stacks, split) {
			let start = stack.pos, { parser } = this;
			let base = verbose ? this.stackID(stack) + " -> " : "";
			if (this.stoppedAt != null && start > this.stoppedAt) return stack.forceReduce() ? stack : null;
			if (this.fragments) {
				let reused = stack.reducePos < start && stack.buffer.length && stack.buffer[stack.buffer.length - 2] <= stack.reducePos && this.fragments.lastRepeatPos == stack.reducePos && this.tryReuse(stack, stack.reducePos, this.fragments.lastRepeat, true) || this.tryReuse(stack, start, this.fragments.nodeAt(start), false);
				if (reused) {
					if (verbose) console.log(base + this.stackID(stack) + ` (via reuse of ${parser.getName(reused.type.id)})`);
					return true;
				}
			}
			let defaultReduce = parser.stateSlot(stack.state, 4);
			if (defaultReduce > 0) {
				stack.reduce(defaultReduce);
				if (verbose) console.log(base + this.stackID(stack) + ` (via always-reduce ${parser.getName(defaultReduce & 65535)})`);
				return true;
			}
			if (stack.stack.length >= 8400) while (stack.stack.length > 6e3 && stack.forceReduce());
			let actions = this.tokens.getActions(stack);
			for (let i = 0; i < actions.length;) {
				let action = actions[i++], term = actions[i++], end = actions[i++];
				let last = i == actions.length || !split;
				let localStack = last ? stack : stack.split();
				let main = this.tokens.mainToken;
				localStack.apply(action, term, main ? main.start : localStack.pos, end);
				if (verbose) console.log(base + this.stackID(localStack) + ` (via ${(action & 65536) == 0 ? "shift" : `reduce of ${parser.getName(action & 65535)}`} for ${parser.getName(term)} @ ${start}${localStack == stack ? "" : ", split"})`);
				if (last) return true;
				else if (localStack.pos > start) stacks.push(localStack);
				else split.push(localStack);
			}
			return false;
		}
		advanceFully(stack, newStacks) {
			let pos = stack.pos;
			for (;;) {
				if (!this.advanceStack(stack, null, null)) return false;
				if (stack.pos > pos) {
					pushStackDedup(stack, newStacks);
					return true;
				}
			}
		}
		runRecovery(stacks, tokens, newStacks) {
			let finished = null, restarted = false;
			for (let i = 0; i < stacks.length; i++) {
				let stack = stacks[i], token = tokens[i << 1], tokenEnd = tokens[(i << 1) + 1];
				let base = verbose ? this.stackID(stack) + " -> " : "";
				if (stack.deadEnd) {
					if (restarted) continue;
					restarted = true;
					stack.restart();
					if (verbose) console.log(base + this.stackID(stack) + " (restarted)");
					if (this.advanceFully(stack, newStacks)) continue;
				}
				let force = stack.split(), forceBase = base;
				for (let j = 0; j < 10 && force.forceReduce(); j++) {
					if (verbose) console.log(forceBase + this.stackID(force) + " (via force-reduce)");
					if (this.advanceFully(force, newStacks)) break;
					if (verbose) forceBase = this.stackID(force) + " -> ";
				}
				for (let insert of stack.recoverByInsert(token)) {
					if (verbose) console.log(base + this.stackID(insert) + " (via recover-insert)");
					this.advanceFully(insert, newStacks);
				}
				if (this.stream.end > stack.pos) {
					if (tokenEnd == stack.pos) {
						tokenEnd++;
						token = 0;
					}
					stack.recoverByDelete(token, tokenEnd);
					if (verbose) console.log(base + this.stackID(stack) + ` (via recover-delete ${this.parser.getName(token)})`);
					pushStackDedup(stack, newStacks);
				} else if (!finished || finished.score < force.score) finished = force;
			}
			return finished;
		}
		stackToTree(stack) {
			stack.close();
			return Tree.build({
				buffer: StackBufferCursor.create(stack),
				nodeSet: this.parser.nodeSet,
				topID: this.topTerm,
				maxBufferLength: this.parser.bufferLength,
				reused: this.reused,
				start: this.ranges[0].from,
				length: stack.pos - this.ranges[0].from,
				minRepeatType: this.parser.minRepeatTerm
			});
		}
		stackID(stack) {
			let id = (stackIDs || (stackIDs = new WeakMap())).get(stack);
			if (!id) stackIDs.set(stack, id = String.fromCodePoint(this.nextStackID++));
			return id + stack;
		}
	};
	Dialect = class {
		constructor(source, flags, disabled) {
			this.source = source;
			this.flags = flags;
			this.disabled = disabled;
		}
		allows(term) {
			return !this.disabled || this.disabled[term] == 0;
		}
	};
	id = (x) => x;
	ContextTracker = class {
		constructor(spec) {
			this.start = spec.start;
			this.shift = spec.shift || id;
			this.reduce = spec.reduce || id;
			this.reuse = spec.reuse || id;
			this.hash = spec.hash || (() => 0);
			this.strict = spec.strict !== false;
		}
	};
	LRParser = class LRParser extends Parser {
		constructor(spec) {
			super();
			this.wrappers = [];
			if (spec.version != 14) throw new RangeError(`Parser version (${spec.version}) doesn't match runtime version (14)`);
			let nodeNames = spec.nodeNames.split(" ");
			this.minRepeatTerm = nodeNames.length;
			for (let i = 0; i < spec.repeatNodeCount; i++) nodeNames.push("");
			let topTerms = Object.keys(spec.topRules).map((r) => spec.topRules[r][1]);
			let nodeProps = [];
			for (let i = 0; i < nodeNames.length; i++) nodeProps.push([]);
			function setProp(nodeID, prop, value) {
				nodeProps[nodeID].push([prop, prop.deserialize(String(value))]);
			}
			if (spec.nodeProps) for (let propSpec of spec.nodeProps) {
				let prop = propSpec[0];
				if (typeof prop == "string") prop = NodeProp[prop];
				for (let i = 1; i < propSpec.length;) {
					let next = propSpec[i++];
					if (next >= 0) setProp(next, prop, propSpec[i++]);
					else {
						let value = propSpec[i + -next];
						for (let j = -next; j > 0; j--) setProp(propSpec[i++], prop, value);
						i++;
					}
				}
			}
			this.nodeSet = new NodeSet(nodeNames.map((name, i) => NodeType.define({
				name: i >= this.minRepeatTerm ? void 0 : name,
				id: i,
				props: nodeProps[i],
				top: topTerms.indexOf(i) > -1,
				error: i == 0,
				skipped: spec.skippedNodes && spec.skippedNodes.indexOf(i) > -1
			})));
			if (spec.propSources) this.nodeSet = this.nodeSet.extend(...spec.propSources);
			this.strict = false;
			this.bufferLength = DefaultBufferLength;
			let tokenArray = decodeArray(spec.tokenData);
			this.context = spec.context;
			this.specializerSpecs = spec.specialized || [];
			this.specialized = new Uint16Array(this.specializerSpecs.length);
			for (let i = 0; i < this.specializerSpecs.length; i++) this.specialized[i] = this.specializerSpecs[i].term;
			this.specializers = this.specializerSpecs.map(getSpecializer);
			this.states = decodeArray(spec.states, Uint32Array);
			this.data = decodeArray(spec.stateData);
			this.goto = decodeArray(spec.goto);
			this.maxTerm = spec.maxTerm;
			this.tokenizers = spec.tokenizers.map((value) => typeof value == "number" ? new TokenGroup(tokenArray, value) : value);
			this.topRules = spec.topRules;
			this.dialects = spec.dialects || {};
			this.dynamicPrecedences = spec.dynamicPrecedences || null;
			this.tokenPrecTable = spec.tokenPrec;
			this.termNames = spec.termNames || null;
			this.maxNode = this.nodeSet.types.length - 1;
			this.dialect = this.parseDialect();
			this.top = this.topRules[Object.keys(this.topRules)[0]];
		}
		createParse(input, fragments, ranges) {
			let parse = new Parse(this, input, fragments, ranges);
			for (let w of this.wrappers) parse = w(parse, input, fragments, ranges);
			return parse;
		}
		getGoto(state, term, loose = false) {
			let table = this.goto;
			if (term >= table[0]) return -1;
			for (let pos = table[term + 1];;) {
				let groupTag = table[pos++], last = groupTag & 1;
				let target = table[pos++];
				if (last && loose) return target;
				for (let end = pos + (groupTag >> 1); pos < end; pos++) if (table[pos] == state) return target;
				if (last) return -1;
			}
		}
		hasAction(state, terminal) {
			let data = this.data;
			for (let set = 0; set < 2; set++) for (let i = this.stateSlot(state, set ? 2 : 1), next;; i += 3) {
				if ((next = data[i]) == 65535) {
					if (data[i + 1] == 1) next = data[i = pair(data, i + 2)];
					else if (data[i + 1] == 2) return pair(data, i + 2);
					else break;
				}
				if (next == terminal || next == 0) return pair(data, i + 1);
			}
			return 0;
		}
		stateSlot(state, slot) {
			return this.states[state * 6 + slot];
		}
		stateFlag(state, flag) {
			return (this.stateSlot(state, 0) & flag) > 0;
		}
		validAction(state, action) {
			return !!this.allActions(state, (a) => a == action ? true : null);
		}
		allActions(state, action) {
			let deflt = this.stateSlot(state, 4);
			let result = deflt ? action(deflt) : void 0;
			for (let i = this.stateSlot(state, 1); result == null; i += 3) {
				if (this.data[i] == 65535) {
					if (this.data[i + 1] == 1) i = pair(this.data, i + 2);
					else break;
				}
				result = action(pair(this.data, i + 1));
			}
			return result;
		}
		nextStates(state) {
			let result = [];
			for (let i = this.stateSlot(state, 1);; i += 3) {
				if (this.data[i] == 65535) {
					if (this.data[i + 1] == 1) i = pair(this.data, i + 2);
					else break;
				}
				if ((this.data[i + 2] & 1) == 0) {
					let value = this.data[i + 1];
					if (!result.some((v, i) => i & 1 && v == value)) result.push(this.data[i], value);
				}
			}
			return result;
		}
		configure(config) {
			let copy = Object.assign(Object.create(LRParser.prototype), this);
			if (config.props) copy.nodeSet = this.nodeSet.extend(...config.props);
			if (config.top) {
				let info = this.topRules[config.top];
				if (!info) throw new RangeError(`Invalid top rule name ${config.top}`);
				copy.top = info;
			}
			if (config.tokenizers) copy.tokenizers = this.tokenizers.map((t) => {
				let found = config.tokenizers.find((r) => r.from == t);
				return found ? found.to : t;
			});
			if (config.specializers) {
				copy.specializers = this.specializers.slice();
				copy.specializerSpecs = this.specializerSpecs.map((s, i) => {
					let found = config.specializers.find((r) => r.from == s.external);
					if (!found) return s;
					let spec = Object.assign(Object.assign({}, s), { external: found.to });
					copy.specializers[i] = getSpecializer(spec);
					return spec;
				});
			}
			if (config.contextTracker) copy.context = config.contextTracker;
			if (config.dialect) copy.dialect = this.parseDialect(config.dialect);
			if (config.strict != null) copy.strict = config.strict;
			if (config.wrap) copy.wrappers = copy.wrappers.concat(config.wrap);
			if (config.bufferLength != null) copy.bufferLength = config.bufferLength;
			return copy;
		}
		hasWrappers() {
			return this.wrappers.length > 0;
		}
		getName(term) {
			return this.termNames ? this.termNames[term] : String(term <= this.maxNode && this.nodeSet.types[term].name || term);
		}
		get eofTerm() {
			return this.maxNode + 1;
		}
		get topNode() {
			return this.nodeSet.types[this.top[1]];
		}
		dynamicPrecedence(term) {
			let prec = this.dynamicPrecedences;
			return prec == null ? 0 : prec[term] || 0;
		}
		parseDialect(dialect) {
			let values = Object.keys(this.dialects), flags = values.map(() => false);
			if (dialect) for (let part of dialect.split(" ")) {
				let id = values.indexOf(part);
				if (id >= 0) flags[id] = true;
			}
			let disabled = null;
			for (let i = 0; i < values.length; i++) if (!flags[i]) for (let j = this.dialects[values[i]], id; (id = this.data[j++]) != 65535;) (disabled || (disabled = new Uint8Array(this.maxTerm + 1)))[id] = 1;
			return new Dialect(dialect, flags, disabled);
		}
		static deserialize(spec) {
			return new LRParser(spec);
		}
	};
}));
//#endregion
export { TreeFragment as C, Tree as S, parseMixed as T, IterMode as _, dist_exports as a, NodeType as b, init_dist$1 as c, Tag as d, highlightTree as f, tags as g, tagHighlighter as h, init_dist as i, isCompatible as l, styleTags as m, ExternalTokenizer as n, getCoerced as o, init_dist$2 as p, LRParser as r, getCompatible as s, ContextTracker as t, isSatisfied as u, NodeProp as v, init_dist$3 as w, Parser as x, NodeSet as y };

//# sourceMappingURL=dist-CAwPjkp6.js.map