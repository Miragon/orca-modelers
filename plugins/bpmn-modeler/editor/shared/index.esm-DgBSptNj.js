import { a as __toESM, t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { $t as closest, S as l, _ as S, a as T$1, b as X$1, c as g$1, d as x$1, f as y, g as R$1, h as M$1, i as P$1, l as h, m as F$1, n as A$1, o as _, p as C$2, r as F$2, rn as query, s as d, t as u, u as q$1, v as U$1, x as k$1, y as W$1 } from "./jsxRuntime.module-awBdvHUy.js";
import { C as isObject, M as set, S as isNumber, _ as init_dist, b as isFunction, g as has, i as assign, m as get$1, o as debounce, r as domify, v as isArray, w as isString, x as isNil, y as isDefined } from "./EscapeUtil-B1jzPlMc.js";
import { C as TreeFragment, S as Tree, T as parseMixed, _ as IterMode, b as NodeType, c as init_dist$4, d as Tag, f as highlightTree, g as tags, h as tagHighlighter, i as init_dist$3, l as isCompatible, m as styleTags, n as ExternalTokenizer, p as init_dist$2, r as LRParser, t as ContextTracker, v as NodeProp, w as init_dist$1, x as Parser, y as NodeSet } from "./dist-BWHN8Och.js";
// ../../node_modules/@marijn/find-cluster-break/src/index.js
init_dist();
var rangeFrom = [];
var rangeTo = [];
(() => {
	let numbers = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((s) => s ? parseInt(s, 36) : 1);
	for (let i = 0, n = 0; i < numbers.length; i++) (i % 2 ? rangeTo : rangeFrom).push(n = n + numbers[i]);
})();
function isExtendingChar(code) {
	if (code < 768) return false;
	for (let from = 0, to = rangeFrom.length;;) {
		let mid = from + to >> 1;
		if (code < rangeFrom[mid]) to = mid;
		else if (code >= rangeTo[mid]) from = mid + 1;
		else return true;
		if (from == to) return false;
	}
}
function isRegionalIndicator(code) {
	return code >= 127462 && code <= 127487;
}
var ZWJ = 8205;
function findClusterBreak$1(str, pos, forward = true, includeExtending = true) {
	return (forward ? nextClusterBreak : prevClusterBreak)(str, pos, includeExtending);
}
function nextClusterBreak(str, pos, includeExtending) {
	if (pos == str.length) return pos;
	if (pos && surrogateLow$1(str.charCodeAt(pos)) && surrogateHigh$1(str.charCodeAt(pos - 1))) pos--;
	let prev = codePointAt$1(str, pos);
	pos += codePointSize$1(prev);
	while (pos < str.length) {
		let next = codePointAt$1(str, pos);
		if (prev == ZWJ || next == ZWJ || includeExtending && isExtendingChar(next)) {
			pos += codePointSize$1(next);
			prev = next;
		} else if (isRegionalIndicator(next)) {
			let countBefore = 0, i = pos - 2;
			while (i >= 0 && isRegionalIndicator(codePointAt$1(str, i))) {
				countBefore++;
				i -= 2;
			}
			if (countBefore % 2 == 0) break;
			else pos += 2;
		} else break;
	}
	return pos;
}
function prevClusterBreak(str, pos, includeExtending) {
	while (pos > 0) {
		let found = nextClusterBreak(str, pos - 2, includeExtending);
		if (found < pos) return found;
		pos--;
	}
	return 0;
}
function codePointAt$1(str, pos) {
	let code0 = str.charCodeAt(pos);
	if (!surrogateHigh$1(code0) || pos + 1 == str.length) return code0;
	let code1 = str.charCodeAt(pos + 1);
	if (!surrogateLow$1(code1)) return code0;
	return (code0 - 55296 << 10) + (code1 - 56320) + 65536;
}
function surrogateLow$1(ch) {
	return ch >= 56320 && ch < 57344;
}
function surrogateHigh$1(ch) {
	return ch >= 55296 && ch < 56320;
}
function codePointSize$1(code) {
	return code < 65536 ? 1 : 2;
}
// ../../node_modules/@codemirror/state/dist/index.js
var Text = class Text {
	lineAt(pos) {
		if (pos < 0 || pos > this.length) throw new RangeError(`Invalid position ${pos} in document of length ${this.length}`);
		return this.lineInner(pos, false, 1, 0);
	}
	line(n) {
		if (n < 1 || n > this.lines) throw new RangeError(`Invalid line number ${n} in ${this.lines}-line document`);
		return this.lineInner(n, true, 1, 0);
	}
	replace(from, to, text) {
		[from, to] = clip(this, from, to);
		let parts = [];
		this.decompose(0, from, parts, 2);
		if (text.length) text.decompose(0, text.length, parts, 3);
		this.decompose(to, this.length, parts, 1);
		return TextNode.from(parts, this.length - (to - from) + text.length);
	}
	append(other) {
		return this.replace(this.length, this.length, other);
	}
	slice(from, to = this.length) {
		[from, to] = clip(this, from, to);
		let parts = [];
		this.decompose(from, to, parts, 0);
		return TextNode.from(parts, to - from);
	}
	eq(other) {
		if (other == this) return true;
		if (other.length != this.length || other.lines != this.lines) return false;
		let start = this.scanIdentical(other, 1), end = this.length - this.scanIdentical(other, -1);
		let a = new RawTextCursor(this), b = new RawTextCursor(other);
		for (let skip = start, pos = start;;) {
			a.next(skip);
			b.next(skip);
			skip = 0;
			if (a.lineBreak != b.lineBreak || a.done != b.done || a.value != b.value) return false;
			pos += a.value.length;
			if (a.done || pos >= end) return true;
		}
	}
	iter(dir = 1) {
		return new RawTextCursor(this, dir);
	}
	iterRange(from, to = this.length) {
		return new PartialTextCursor(this, from, to);
	}
	iterLines(from, to) {
		let inner;
		if (from == null) inner = this.iter();
		else {
			if (to == null) to = this.lines + 1;
			let start = this.line(from).from;
			inner = this.iterRange(start, Math.max(start, to == this.lines + 1 ? this.length : to <= 1 ? 0 : this.line(to - 1).to));
		}
		return new LineCursor(inner);
	}
	toString() {
		return this.sliceString(0);
	}
	toJSON() {
		let lines = [];
		this.flatten(lines);
		return lines;
	}
	constructor() {}
	static of(text) {
		if (text.length == 0) throw new RangeError("A document must have at least one line");
		if (text.length == 1 && !text[0]) return Text.empty;
		return text.length <= 32 ? new TextLeaf(text) : TextNode.from(TextLeaf.split(text, []));
	}
};
var TextLeaf = class TextLeaf extends Text {
	constructor(text, length = textLength(text)) {
		super();
		this.text = text;
		this.length = length;
	}
	get lines() {
		return this.text.length;
	}
	get children() {
		return null;
	}
	lineInner(target, isLine, line, offset) {
		for (let i = 0;; i++) {
			let string = this.text[i], end = offset + string.length;
			if ((isLine ? line : end) >= target) return new Line$1(offset, end, line, string);
			offset = end + 1;
			line++;
		}
	}
	decompose(from, to, target, open) {
		let text = from <= 0 && to >= this.length ? this : new TextLeaf(sliceText(this.text, from, to), Math.min(to, this.length) - Math.max(0, from));
		if (open & 1) {
			let prev = target.pop();
			let joined = appendText(text.text, prev.text.slice(), 0, text.length);
			if (joined.length <= 32) target.push(new TextLeaf(joined, prev.length + text.length));
			else {
				let mid = joined.length >> 1;
				target.push(new TextLeaf(joined.slice(0, mid)), new TextLeaf(joined.slice(mid)));
			}
		} else target.push(text);
	}
	replace(from, to, text) {
		if (!(text instanceof TextLeaf)) return super.replace(from, to, text);
		[from, to] = clip(this, from, to);
		let lines = appendText(this.text, appendText(text.text, sliceText(this.text, 0, from)), to);
		let newLen = this.length + text.length - (to - from);
		if (lines.length <= 32) return new TextLeaf(lines, newLen);
		return TextNode.from(TextLeaf.split(lines, []), newLen);
	}
	sliceString(from, to = this.length, lineSep = "\n") {
		[from, to] = clip(this, from, to);
		let result = "";
		for (let pos = 0, i = 0; pos <= to && i < this.text.length; i++) {
			let line = this.text[i], end = pos + line.length;
			if (pos > from && i) result += lineSep;
			if (from < end && to > pos) result += line.slice(Math.max(0, from - pos), to - pos);
			pos = end + 1;
		}
		return result;
	}
	flatten(target) {
		for (let line of this.text) target.push(line);
	}
	scanIdentical() {
		return 0;
	}
	static split(text, target) {
		let part = [], len = -1;
		for (let line of text) {
			part.push(line);
			len += line.length + 1;
			if (part.length == 32) {
				target.push(new TextLeaf(part, len));
				part = [];
				len = -1;
			}
		}
		if (len > -1) target.push(new TextLeaf(part, len));
		return target;
	}
};
var TextNode = class TextNode extends Text {
	constructor(children, length) {
		super();
		this.children = children;
		this.length = length;
		this.lines = 0;
		for (let child of children) this.lines += child.lines;
	}
	lineInner(target, isLine, line, offset) {
		for (let i = 0;; i++) {
			let child = this.children[i], end = offset + child.length, endLine = line + child.lines - 1;
			if ((isLine ? endLine : end) >= target) return child.lineInner(target, isLine, line, offset);
			offset = end + 1;
			line = endLine + 1;
		}
	}
	decompose(from, to, target, open) {
		for (let i = 0, pos = 0; pos <= to && i < this.children.length; i++) {
			let child = this.children[i], end = pos + child.length;
			if (from <= end && to >= pos) {
				let childOpen = open & ((pos <= from ? 1 : 0) | (end >= to ? 2 : 0));
				if (pos >= from && end <= to && !childOpen) target.push(child);
				else child.decompose(from - pos, to - pos, target, childOpen);
			}
			pos = end + 1;
		}
	}
	replace(from, to, text) {
		[from, to] = clip(this, from, to);
		if (text.lines < this.lines) for (let i = 0, pos = 0; i < this.children.length; i++) {
			let child = this.children[i], end = pos + child.length;
			if (from >= pos && to <= end) {
				let updated = child.replace(from - pos, to - pos, text);
				let totalLines = this.lines - child.lines + updated.lines;
				if (updated.lines < totalLines >> 4 && updated.lines > totalLines >> 6) {
					let copy = this.children.slice();
					copy[i] = updated;
					return new TextNode(copy, this.length - (to - from) + text.length);
				}
				return super.replace(pos, end, updated);
			}
			pos = end + 1;
		}
		return super.replace(from, to, text);
	}
	sliceString(from, to = this.length, lineSep = "\n") {
		[from, to] = clip(this, from, to);
		let result = "";
		for (let i = 0, pos = 0; i < this.children.length && pos <= to; i++) {
			let child = this.children[i], end = pos + child.length;
			if (pos > from && i) result += lineSep;
			if (from < end && to > pos) result += child.sliceString(from - pos, to - pos, lineSep);
			pos = end + 1;
		}
		return result;
	}
	flatten(target) {
		for (let child of this.children) child.flatten(target);
	}
	scanIdentical(other, dir) {
		if (!(other instanceof TextNode)) return 0;
		let length = 0;
		let [iA, iB, eA, eB] = dir > 0 ? [
			0,
			0,
			this.children.length,
			other.children.length
		] : [
			this.children.length - 1,
			other.children.length - 1,
			-1,
			-1
		];
		for (;; iA += dir, iB += dir) {
			if (iA == eA || iB == eB) return length;
			let chA = this.children[iA], chB = other.children[iB];
			if (chA != chB) return length + chA.scanIdentical(chB, dir);
			length += chA.length + 1;
		}
	}
	static from(children, length = children.reduce((l, ch) => l + ch.length + 1, -1)) {
		let lines = 0;
		for (let ch of children) lines += ch.lines;
		if (lines < 32) {
			let flat = [];
			for (let ch of children) ch.flatten(flat);
			return new TextLeaf(flat, length);
		}
		let chunk = Math.max(32, lines >> 5), maxChunk = chunk << 1, minChunk = chunk >> 1;
		let chunked = [], currentLines = 0, currentLen = -1, currentChunk = [];
		function add(child) {
			let last;
			if (child.lines > maxChunk && child instanceof TextNode) for (let node of child.children) add(node);
			else if (child.lines > minChunk && (currentLines > minChunk || !currentLines)) {
				flush();
				chunked.push(child);
			} else if (child instanceof TextLeaf && currentLines && (last = currentChunk[currentChunk.length - 1]) instanceof TextLeaf && child.lines + last.lines <= 32) {
				currentLines += child.lines;
				currentLen += child.length + 1;
				currentChunk[currentChunk.length - 1] = new TextLeaf(last.text.concat(child.text), last.length + 1 + child.length);
			} else {
				if (currentLines + child.lines > chunk) flush();
				currentLines += child.lines;
				currentLen += child.length + 1;
				currentChunk.push(child);
			}
		}
		function flush() {
			if (currentLines == 0) return;
			chunked.push(currentChunk.length == 1 ? currentChunk[0] : TextNode.from(currentChunk, currentLen));
			currentLen = -1;
			currentLines = currentChunk.length = 0;
		}
		for (let child of children) add(child);
		flush();
		return chunked.length == 1 ? chunked[0] : new TextNode(chunked, length);
	}
};
Text.empty = new TextLeaf([""], 0);
function textLength(text) {
	let length = -1;
	for (let line of text) length += line.length + 1;
	return length;
}
function appendText(text, target, from = 0, to = 1e9) {
	for (let pos = 0, i = 0, first = true; i < text.length && pos <= to; i++) {
		let line = text[i], end = pos + line.length;
		if (end >= from) {
			if (end > to) line = line.slice(0, to - pos);
			if (pos < from) line = line.slice(from - pos);
			if (first) {
				target[target.length - 1] += line;
				first = false;
			} else target.push(line);
		}
		pos = end + 1;
	}
	return target;
}
function sliceText(text, from, to) {
	return appendText(text, [""], from, to);
}
var RawTextCursor = class {
	constructor(text, dir = 1) {
		this.dir = dir;
		this.done = false;
		this.lineBreak = false;
		this.value = "";
		this.nodes = [text];
		this.offsets = [dir > 0 ? 1 : (text instanceof TextLeaf ? text.text.length : text.children.length) << 1];
	}
	nextInner(skip, dir) {
		this.done = this.lineBreak = false;
		for (;;) {
			let last = this.nodes.length - 1;
			let top = this.nodes[last], offsetValue = this.offsets[last], offset = offsetValue >> 1;
			let size = top instanceof TextLeaf ? top.text.length : top.children.length;
			if (offset == (dir > 0 ? size : 0)) {
				if (last == 0) {
					this.done = true;
					this.value = "";
					return this;
				}
				if (dir > 0) this.offsets[last - 1]++;
				this.nodes.pop();
				this.offsets.pop();
			} else if ((offsetValue & 1) == (dir > 0 ? 0 : 1)) {
				this.offsets[last] += dir;
				if (skip == 0) {
					this.lineBreak = true;
					this.value = "\n";
					return this;
				}
				skip--;
			} else if (top instanceof TextLeaf) {
				let next = top.text[offset + (dir < 0 ? -1 : 0)];
				this.offsets[last] += dir;
				if (next.length > Math.max(0, skip)) {
					this.value = skip == 0 ? next : dir > 0 ? next.slice(skip) : next.slice(0, next.length - skip);
					return this;
				}
				skip -= next.length;
			} else {
				let next = top.children[offset + (dir < 0 ? -1 : 0)];
				if (skip > next.length) {
					skip -= next.length;
					this.offsets[last] += dir;
				} else {
					if (dir < 0) this.offsets[last]--;
					this.nodes.push(next);
					this.offsets.push(dir > 0 ? 1 : (next instanceof TextLeaf ? next.text.length : next.children.length) << 1);
				}
			}
		}
	}
	next(skip = 0) {
		if (skip < 0) {
			this.nextInner(-skip, -this.dir);
			skip = this.value.length;
		}
		return this.nextInner(skip, this.dir);
	}
};
var PartialTextCursor = class {
	constructor(text, start, end) {
		this.value = "";
		this.done = false;
		this.cursor = new RawTextCursor(text, start > end ? -1 : 1);
		this.pos = start > end ? text.length : 0;
		this.from = Math.min(start, end);
		this.to = Math.max(start, end);
	}
	nextInner(skip, dir) {
		if (dir < 0 ? this.pos <= this.from : this.pos >= this.to) {
			this.value = "";
			this.done = true;
			return this;
		}
		skip += Math.max(0, dir < 0 ? this.pos - this.to : this.from - this.pos);
		let limit = dir < 0 ? this.pos - this.from : this.to - this.pos;
		if (skip > limit) skip = limit;
		limit -= skip;
		let { value } = this.cursor.next(skip);
		this.pos += (value.length + skip) * dir;
		this.value = value.length <= limit ? value : dir < 0 ? value.slice(value.length - limit) : value.slice(0, limit);
		this.done = !this.value;
		return this;
	}
	next(skip = 0) {
		if (skip < 0) skip = Math.max(skip, this.from - this.pos);
		else if (skip > 0) skip = Math.min(skip, this.to - this.pos);
		return this.nextInner(skip, this.cursor.dir);
	}
	get lineBreak() {
		return this.cursor.lineBreak && this.value != "";
	}
};
var LineCursor = class {
	constructor(inner) {
		this.inner = inner;
		this.afterBreak = true;
		this.value = "";
		this.done = false;
	}
	next(skip = 0) {
		let { done, lineBreak, value } = this.inner.next(skip);
		if (done && this.afterBreak) {
			this.value = "";
			this.afterBreak = false;
		} else if (done) {
			this.done = true;
			this.value = "";
		} else if (lineBreak) {
			if (this.afterBreak) this.value = "";
			else {
				this.afterBreak = true;
				this.next();
			}
		} else {
			this.value = value;
			this.afterBreak = false;
		}
		return this;
	}
	get lineBreak() {
		return false;
	}
};
if (typeof Symbol != "undefined") {
	Text.prototype[Symbol.iterator] = function() {
		return this.iter();
	};
	RawTextCursor.prototype[Symbol.iterator] = PartialTextCursor.prototype[Symbol.iterator] = LineCursor.prototype[Symbol.iterator] = function() {
		return this;
	};
}
var Line$1 = class {
	constructor(from, to, number, text) {
		this.from = from;
		this.to = to;
		this.number = number;
		this.text = text;
	}
	get length() {
		return this.to - this.from;
	}
};
function clip(text, from, to) {
	from = Math.max(0, Math.min(text.length, from));
	return [from, Math.max(from, Math.min(text.length, to))];
}
function findClusterBreak(str, pos, forward = true, includeExtending = true) {
	return findClusterBreak$1(str, pos, forward, includeExtending);
}
function surrogateLow(ch) {
	return ch >= 56320 && ch < 57344;
}
function surrogateHigh(ch) {
	return ch >= 55296 && ch < 56320;
}
function codePointAt(str, pos) {
	let code0 = str.charCodeAt(pos);
	if (!surrogateHigh(code0) || pos + 1 == str.length) return code0;
	let code1 = str.charCodeAt(pos + 1);
	if (!surrogateLow(code1)) return code0;
	return (code0 - 55296 << 10) + (code1 - 56320) + 65536;
}
function fromCodePoint(code) {
	if (code <= 65535) return String.fromCharCode(code);
	code -= 65536;
	return String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
}
function codePointSize(code) {
	return code < 65536 ? 1 : 2;
}
var DefaultSplit = /\r\n?|\n/;
var MapMode = (function(MapMode) {
	MapMode[MapMode["Simple"] = 0] = "Simple";
	MapMode[MapMode["TrackDel"] = 1] = "TrackDel";
	MapMode[MapMode["TrackBefore"] = 2] = "TrackBefore";
	MapMode[MapMode["TrackAfter"] = 3] = "TrackAfter";
	return MapMode;
})(MapMode || (MapMode = {}));
var ChangeDesc = class ChangeDesc {
	constructor(sections) {
		this.sections = sections;
	}
	get length() {
		let result = 0;
		for (let i = 0; i < this.sections.length; i += 2) result += this.sections[i];
		return result;
	}
	get newLength() {
		let result = 0;
		for (let i = 0; i < this.sections.length; i += 2) {
			let ins = this.sections[i + 1];
			result += ins < 0 ? this.sections[i] : ins;
		}
		return result;
	}
	get empty() {
		return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
	}
	iterGaps(f) {
		for (let i = 0, posA = 0, posB = 0; i < this.sections.length;) {
			let len = this.sections[i++], ins = this.sections[i++];
			if (ins < 0) {
				f(posA, posB, len);
				posB += len;
			} else posB += ins;
			posA += len;
		}
	}
	iterChangedRanges(f, individual = false) {
		iterChanges(this, f, individual);
	}
	get invertedDesc() {
		let sections = [];
		for (let i = 0; i < this.sections.length;) {
			let len = this.sections[i++], ins = this.sections[i++];
			if (ins < 0) sections.push(len, ins);
			else sections.push(ins, len);
		}
		return new ChangeDesc(sections);
	}
	composeDesc(other) {
		return this.empty ? other : other.empty ? this : composeSets(this, other);
	}
	mapDesc(other, before = false) {
		return other.empty ? this : mapSet(this, other, before);
	}
	mapPos(pos, assoc = -1, mode = MapMode.Simple) {
		let posA = 0, posB = 0;
		for (let i = 0; i < this.sections.length;) {
			let len = this.sections[i++], ins = this.sections[i++], endA = posA + len;
			if (ins < 0) {
				if (endA > pos) return posB + (pos - posA);
				posB += len;
			} else {
				if (mode != MapMode.Simple && endA >= pos && (mode == MapMode.TrackDel && posA < pos && endA > pos || mode == MapMode.TrackBefore && posA < pos || mode == MapMode.TrackAfter && endA > pos)) return null;
				if (endA > pos || endA == pos && assoc < 0 && !len) return pos == posA || assoc < 0 ? posB : posB + ins;
				posB += ins;
			}
			posA = endA;
		}
		if (pos > posA) throw new RangeError(`Position ${pos} is out of range for changeset of length ${posA}`);
		return posB;
	}
	touchesRange(from, to = from) {
		for (let i = 0, pos = 0; i < this.sections.length && pos <= to;) {
			let len = this.sections[i++], ins = this.sections[i++], end = pos + len;
			if (ins >= 0 && pos <= to && end >= from) return pos < from && end > to ? "cover" : true;
			pos = end;
		}
		return false;
	}
	toString() {
		let result = "";
		for (let i = 0; i < this.sections.length;) {
			let len = this.sections[i++], ins = this.sections[i++];
			result += (result ? " " : "") + len + (ins >= 0 ? ":" + ins : "");
		}
		return result;
	}
	toJSON() {
		return this.sections;
	}
	static fromJSON(json) {
		if (!Array.isArray(json) || json.length % 2 || json.some((a) => typeof a != "number")) throw new RangeError("Invalid JSON representation of ChangeDesc");
		return new ChangeDesc(json);
	}
	static create(sections) {
		return new ChangeDesc(sections);
	}
};
var ChangeSet = class ChangeSet extends ChangeDesc {
	constructor(sections, inserted) {
		super(sections);
		this.inserted = inserted;
	}
	apply(doc) {
		if (this.length != doc.length) throw new RangeError("Applying change set to a document with the wrong length");
		iterChanges(this, (fromA, toA, fromB, _toB, text) => doc = doc.replace(fromB, fromB + (toA - fromA), text), false);
		return doc;
	}
	mapDesc(other, before = false) {
		return mapSet(this, other, before, true);
	}
	invert(doc) {
		let sections = this.sections.slice(), inserted = [];
		for (let i = 0, pos = 0; i < sections.length; i += 2) {
			let len = sections[i], ins = sections[i + 1];
			if (ins >= 0) {
				sections[i] = ins;
				sections[i + 1] = len;
				let index = i >> 1;
				while (inserted.length < index) inserted.push(Text.empty);
				inserted.push(len ? doc.slice(pos, pos + len) : Text.empty);
			}
			pos += len;
		}
		return new ChangeSet(sections, inserted);
	}
	compose(other) {
		return this.empty ? other : other.empty ? this : composeSets(this, other, true);
	}
	map(other, before = false) {
		return other.empty ? this : mapSet(this, other, before, true);
	}
	iterChanges(f, individual = false) {
		iterChanges(this, f, individual);
	}
	get desc() {
		return ChangeDesc.create(this.sections);
	}
	filter(ranges) {
		let resultSections = [], resultInserted = [], filteredSections = [];
		let iter = new SectionIter(this);
		done: for (let i = 0, pos = 0;;) {
			let next = i == ranges.length ? 1e9 : ranges[i++];
			while (pos < next || pos == next && iter.len == 0) {
				if (iter.done) break done;
				let len = Math.min(iter.len, next - pos);
				addSection(filteredSections, len, -1);
				let ins = iter.ins == -1 ? -1 : iter.off == 0 ? iter.ins : 0;
				addSection(resultSections, len, ins);
				if (ins > 0) addInsert(resultInserted, resultSections, iter.text);
				iter.forward(len);
				pos += len;
			}
			let end = ranges[i++];
			while (pos < end) {
				if (iter.done) break done;
				let len = Math.min(iter.len, end - pos);
				addSection(resultSections, len, -1);
				addSection(filteredSections, len, iter.ins == -1 ? -1 : iter.off == 0 ? iter.ins : 0);
				iter.forward(len);
				pos += len;
			}
		}
		return {
			changes: new ChangeSet(resultSections, resultInserted),
			filtered: ChangeDesc.create(filteredSections)
		};
	}
	toJSON() {
		let parts = [];
		for (let i = 0; i < this.sections.length; i += 2) {
			let len = this.sections[i], ins = this.sections[i + 1];
			if (ins < 0) parts.push(len);
			else if (ins == 0) parts.push([len]);
			else parts.push([len].concat(this.inserted[i >> 1].toJSON()));
		}
		return parts;
	}
	static of(changes, length, lineSep) {
		let sections = [], inserted = [], pos = 0;
		let total = null;
		function flush(force = false) {
			if (!force && !sections.length) return;
			if (pos < length) addSection(sections, length - pos, -1);
			let set = new ChangeSet(sections, inserted);
			total = total ? total.compose(set.map(total)) : set;
			sections = [];
			inserted = [];
			pos = 0;
		}
		function process(spec) {
			if (Array.isArray(spec)) for (let sub of spec) process(sub);
			else if (spec instanceof ChangeSet) {
				if (spec.length != length) throw new RangeError(`Mismatched change set length (got ${spec.length}, expected ${length})`);
				flush();
				total = total ? total.compose(spec.map(total)) : spec;
			} else {
				let { from, to = from, insert } = spec;
				if (from > to || from < 0 || to > length) throw new RangeError(`Invalid change range ${from} to ${to} (in doc of length ${length})`);
				let insText = !insert ? Text.empty : typeof insert == "string" ? Text.of(insert.split(lineSep || DefaultSplit)) : insert;
				let insLen = insText.length;
				if (from == to && insLen == 0) return;
				if (from < pos) flush();
				if (from > pos) addSection(sections, from - pos, -1);
				addSection(sections, to - from, insLen);
				addInsert(inserted, sections, insText);
				pos = to;
			}
		}
		process(changes);
		flush(!total);
		return total;
	}
	static empty(length) {
		return new ChangeSet(length ? [length, -1] : [], []);
	}
	static fromJSON(json) {
		if (!Array.isArray(json)) throw new RangeError("Invalid JSON representation of ChangeSet");
		let sections = [], inserted = [];
		for (let i = 0; i < json.length; i++) {
			let part = json[i];
			if (typeof part == "number") sections.push(part, -1);
			else if (!Array.isArray(part) || typeof part[0] != "number" || part.some((e, i) => i && typeof e != "string")) throw new RangeError("Invalid JSON representation of ChangeSet");
			else if (part.length == 1) sections.push(part[0], 0);
			else {
				while (inserted.length < i) inserted.push(Text.empty);
				inserted[i] = Text.of(part.slice(1));
				sections.push(part[0], inserted[i].length);
			}
		}
		return new ChangeSet(sections, inserted);
	}
	static createSet(sections, inserted) {
		return new ChangeSet(sections, inserted);
	}
};
function addSection(sections, len, ins, forceJoin = false) {
	if (len == 0 && ins <= 0) return;
	let last = sections.length - 2;
	if (last >= 0 && ins <= 0 && ins == sections[last + 1]) sections[last] += len;
	else if (last >= 0 && len == 0 && sections[last] == 0) sections[last + 1] += ins;
	else if (forceJoin) {
		sections[last] += len;
		sections[last + 1] += ins;
	} else sections.push(len, ins);
}
function addInsert(values, sections, value) {
	if (value.length == 0) return;
	let index = sections.length - 2 >> 1;
	if (index < values.length) values[values.length - 1] = values[values.length - 1].append(value);
	else {
		while (values.length < index) values.push(Text.empty);
		values.push(value);
	}
}
function iterChanges(desc, f, individual) {
	let inserted = desc.inserted;
	for (let posA = 0, posB = 0, i = 0; i < desc.sections.length;) {
		let len = desc.sections[i++], ins = desc.sections[i++];
		if (ins < 0) {
			posA += len;
			posB += len;
		} else {
			let endA = posA, endB = posB, text = Text.empty;
			for (;;) {
				endA += len;
				endB += ins;
				if (ins && inserted) text = text.append(inserted[i - 2 >> 1]);
				if (individual || i == desc.sections.length || desc.sections[i + 1] < 0) break;
				len = desc.sections[i++];
				ins = desc.sections[i++];
			}
			f(posA, endA, posB, endB, text);
			posA = endA;
			posB = endB;
		}
	}
}
function mapSet(setA, setB, before, mkSet = false) {
	let sections = [], insert = mkSet ? [] : null;
	let a = new SectionIter(setA), b = new SectionIter(setB);
	for (let inserted = -1;;) if (a.done && b.len || b.done && a.len) throw new Error("Mismatched change set lengths");
	else if (a.ins == -1 && b.ins == -1) {
		let len = Math.min(a.len, b.len);
		addSection(sections, len, -1);
		a.forward(len);
		b.forward(len);
	} else if (b.ins >= 0 && (a.ins < 0 || inserted == a.i || a.off == 0 && (b.len < a.len || b.len == a.len && !before))) {
		let len = b.len;
		addSection(sections, b.ins, -1);
		while (len) {
			let piece = Math.min(a.len, len);
			if (a.ins >= 0 && inserted < a.i && a.len <= piece) {
				addSection(sections, 0, a.ins);
				if (insert) addInsert(insert, sections, a.text);
				inserted = a.i;
			}
			a.forward(piece);
			len -= piece;
		}
		b.next();
	} else if (a.ins >= 0) {
		let len = 0, left = a.len;
		while (left) if (b.ins == -1) {
			let piece = Math.min(left, b.len);
			len += piece;
			left -= piece;
			b.forward(piece);
		} else if (b.ins == 0 && b.len < left) {
			left -= b.len;
			b.next();
		} else break;
		addSection(sections, len, inserted < a.i ? a.ins : 0);
		if (insert && inserted < a.i) addInsert(insert, sections, a.text);
		inserted = a.i;
		a.forward(a.len - left);
	} else if (a.done && b.done) return insert ? ChangeSet.createSet(sections, insert) : ChangeDesc.create(sections);
	else throw new Error("Mismatched change set lengths");
}
function composeSets(setA, setB, mkSet = false) {
	let sections = [];
	let insert = mkSet ? [] : null;
	let a = new SectionIter(setA), b = new SectionIter(setB);
	for (let open = false;;) if (a.done && b.done) return insert ? ChangeSet.createSet(sections, insert) : ChangeDesc.create(sections);
	else if (a.ins == 0) {
		addSection(sections, a.len, 0, open);
		a.next();
	} else if (b.len == 0 && !b.done) {
		addSection(sections, 0, b.ins, open);
		if (insert) addInsert(insert, sections, b.text);
		b.next();
	} else if (a.done || b.done) throw new Error("Mismatched change set lengths");
	else {
		let len = Math.min(a.len2, b.len), sectionLen = sections.length;
		if (a.ins == -1) {
			let insB = b.ins == -1 ? -1 : b.off ? 0 : b.ins;
			addSection(sections, len, insB, open);
			if (insert && insB) addInsert(insert, sections, b.text);
		} else if (b.ins == -1) {
			addSection(sections, a.off ? 0 : a.len, len, open);
			if (insert) addInsert(insert, sections, a.textBit(len));
		} else {
			addSection(sections, a.off ? 0 : a.len, b.off ? 0 : b.ins, open);
			if (insert && !b.off) addInsert(insert, sections, b.text);
		}
		open = (a.ins > len || b.ins >= 0 && b.len > len) && (open || sections.length > sectionLen);
		a.forward2(len);
		b.forward(len);
	}
}
var SectionIter = class {
	constructor(set) {
		this.set = set;
		this.i = 0;
		this.next();
	}
	next() {
		let { sections } = this.set;
		if (this.i < sections.length) {
			this.len = sections[this.i++];
			this.ins = sections[this.i++];
		} else {
			this.len = 0;
			this.ins = -2;
		}
		this.off = 0;
	}
	get done() {
		return this.ins == -2;
	}
	get len2() {
		return this.ins < 0 ? this.len : this.ins;
	}
	get text() {
		let { inserted } = this.set, index = this.i - 2 >> 1;
		return index >= inserted.length ? Text.empty : inserted[index];
	}
	textBit(len) {
		let { inserted } = this.set, index = this.i - 2 >> 1;
		return index >= inserted.length && !len ? Text.empty : inserted[index].slice(this.off, len == null ? void 0 : this.off + len);
	}
	forward(len) {
		if (len == this.len) this.next();
		else {
			this.len -= len;
			this.off += len;
		}
	}
	forward2(len) {
		if (this.ins == -1) this.forward(len);
		else if (len == this.ins) this.next();
		else {
			this.ins -= len;
			this.off += len;
		}
	}
};
var SelectionRange = class SelectionRange {
	constructor(from, to, flags, goalColumn) {
		this.from = from;
		this.to = to;
		this.flags = flags;
		this.goalColumn = goalColumn;
	}
	get anchor() {
		return this.flags & 32 ? this.to : this.from;
	}
	get head() {
		return this.flags & 32 ? this.from : this.to;
	}
	get empty() {
		return this.from == this.to;
	}
	get assoc() {
		return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
	}
	get undirectional() {
		return (this.flags & 64) > 0;
	}
	get bidiLevel() {
		let level = this.flags & 7;
		return level == 7 ? null : level;
	}
	map(change, assoc = -1) {
		let from, to;
		if (this.empty) from = to = change.mapPos(this.from, assoc);
		else {
			from = change.mapPos(this.from, 1);
			to = change.mapPos(this.to, -1);
		}
		return from == this.from && to == this.to ? this : new SelectionRange(from, to, this.flags, this.goalColumn);
	}
	extend(from, to = from, assoc = 0) {
		if (from <= this.anchor && to >= this.anchor) return EditorSelection.range(from, to, void 0, void 0, assoc);
		let head = Math.abs(from - this.anchor) > Math.abs(to - this.anchor) ? from : to;
		return EditorSelection.range(this.anchor, head, void 0, void 0, assoc);
	}
	eq(other, includeAssoc = false) {
		return this.anchor == other.anchor && this.head == other.head && this.goalColumn == other.goalColumn && (!includeAssoc || !this.empty || this.assoc == other.assoc);
	}
	toJSON() {
		return {
			anchor: this.anchor,
			head: this.head
		};
	}
	static fromJSON(json) {
		if (!json || typeof json.anchor != "number" || typeof json.head != "number") throw new RangeError("Invalid JSON representation for SelectionRange");
		return EditorSelection.range(json.anchor, json.head);
	}
	static create(from, to, flags, goalColumn) {
		return new SelectionRange(from, to, flags, goalColumn);
	}
};
var EditorSelection = class EditorSelection {
	constructor(ranges, mainIndex) {
		this.ranges = ranges;
		this.mainIndex = mainIndex;
	}
	map(change, assoc = -1) {
		if (change.empty) return this;
		return EditorSelection.create(this.ranges.map((r) => r.map(change, assoc)), this.mainIndex);
	}
	eq(other, includeAssoc = false) {
		if (this.ranges.length != other.ranges.length || this.mainIndex != other.mainIndex) return false;
		for (let i = 0; i < this.ranges.length; i++) if (!this.ranges[i].eq(other.ranges[i], includeAssoc)) return false;
		return true;
	}
	get main() {
		return this.ranges[this.mainIndex];
	}
	asSingle() {
		return this.ranges.length == 1 ? this : new EditorSelection([this.main], 0);
	}
	addRange(range, main = true) {
		return EditorSelection.create([range].concat(this.ranges), main ? 0 : this.mainIndex + 1);
	}
	replaceRange(range, which = this.mainIndex) {
		let ranges = this.ranges.slice();
		ranges[which] = range;
		return EditorSelection.create(ranges, this.mainIndex);
	}
	toJSON() {
		return {
			ranges: this.ranges.map((r) => r.toJSON()),
			main: this.mainIndex
		};
	}
	static fromJSON(json) {
		if (!json || !Array.isArray(json.ranges) || typeof json.main != "number" || json.main >= json.ranges.length) throw new RangeError("Invalid JSON representation for EditorSelection");
		return new EditorSelection(json.ranges.map((r) => SelectionRange.fromJSON(r)), json.main);
	}
	static single(anchor, head = anchor) {
		return new EditorSelection([EditorSelection.range(anchor, head)], 0);
	}
	static create(ranges, mainIndex = 0) {
		if (ranges.length == 0) throw new RangeError("A selection needs at least one range");
		for (let pos = 0, i = 0; i < ranges.length; i++) {
			let range = ranges[i];
			if (range.empty ? range.from <= pos : range.from < pos) return EditorSelection.normalized(ranges.slice(), mainIndex);
			pos = range.to;
		}
		return new EditorSelection(ranges, mainIndex);
	}
	static cursor(pos, assoc = 0, bidiLevel, goalColumn) {
		return SelectionRange.create(pos, pos, (assoc == 0 ? 0 : assoc < 0 ? 8 : 16) | (bidiLevel == null ? 7 : Math.min(6, bidiLevel)), goalColumn);
	}
	static range(anchor, head, goalColumn, bidiLevel, assoc) {
		let flags = bidiLevel == null ? 7 : Math.min(6, bidiLevel);
		if (!assoc && anchor != head) assoc = head < anchor ? 1 : -1;
		if (assoc) flags |= assoc < 0 ? 8 : 16;
		return head < anchor ? SelectionRange.create(head, anchor, flags | 32, goalColumn) : SelectionRange.create(anchor, head, flags, goalColumn);
	}
	static undirectionalRange(from, to) {
		return SelectionRange.create(from, to, 64, void 0);
	}
	static normalized(ranges, mainIndex = 0) {
		let main = ranges[mainIndex];
		ranges.sort((a, b) => a.from - b.from);
		mainIndex = ranges.indexOf(main);
		for (let i = 1; i < ranges.length; i++) {
			let range = ranges[i], prev = ranges[i - 1];
			if (range.empty ? range.from <= prev.to : range.from < prev.to) {
				let from = prev.from, to = Math.max(range.to, prev.to);
				if (i <= mainIndex) mainIndex--;
				ranges.splice(--i, 2, range.anchor > range.head ? EditorSelection.range(to, from) : EditorSelection.range(from, to));
			}
		}
		return new EditorSelection(ranges, mainIndex);
	}
};
function checkSelection(selection, docLength) {
	for (let range of selection.ranges) if (range.to > docLength) throw new RangeError("Selection points outside of document");
}
var nextID = 0;
var Facet = class Facet {
	constructor(combine, compareInput, compare, isStatic, enables) {
		this.combine = combine;
		this.compareInput = compareInput;
		this.compare = compare;
		this.isStatic = isStatic;
		this.id = nextID++;
		this.default = combine([]);
		this.extensions = typeof enables == "function" ? enables(this) : enables;
	}
	get reader() {
		return this;
	}
	static define(config = {}) {
		return new Facet(config.combine || ((a) => a), config.compareInput || ((a, b) => a === b), config.compare || (!config.combine ? sameArray : (a, b) => a === b), !!config.static, config.enables);
	}
	of(value) {
		return new FacetProvider([], this, 0, value);
	}
	compute(deps, get) {
		if (this.isStatic) throw new Error("Can't compute a static facet");
		return new FacetProvider(deps, this, 1, get);
	}
	computeN(deps, get) {
		if (this.isStatic) throw new Error("Can't compute a static facet");
		return new FacetProvider(deps, this, 2, get);
	}
	from(field, get) {
		if (!get) get = (x) => x;
		return this.compute([field], (state) => get(state.field(field)));
	}
};
function sameArray(a, b) {
	return a == b || a.length == b.length && a.every((e, i) => e === b[i]);
}
var FacetProvider = class {
	constructor(dependencies, facet, type, value) {
		this.dependencies = dependencies;
		this.facet = facet;
		this.type = type;
		this.value = value;
		this.id = nextID++;
	}
	dynamicSlot(addresses) {
		var _a;
		let getter = this.value;
		let compare = this.facet.compareInput;
		let id = this.id, idx = addresses[id] >> 1, multi = this.type == 2;
		let depDoc = false, depSel = false, depAddrs = [];
		for (let dep of this.dependencies) if (dep == "doc") depDoc = true;
		else if (dep == "selection") depSel = true;
		else if ((((_a = addresses[dep.id]) !== null && _a !== void 0 ? _a : 1) & 1) == 0) depAddrs.push(addresses[dep.id]);
		return {
			create(state) {
				state.values[idx] = getter(state);
				return 1;
			},
			update(state, tr) {
				if (depDoc && tr.docChanged || depSel && (tr.docChanged || tr.selection) || ensureAll(state, depAddrs)) {
					let newVal = getter(state);
					if (multi ? !compareArray(newVal, state.values[idx], compare) : !compare(newVal, state.values[idx])) {
						state.values[idx] = newVal;
						return 1;
					}
				}
				return 0;
			},
			reconfigure: (state, oldState) => {
				let newVal, oldAddr = oldState.config.address[id];
				if (oldAddr != null) {
					let oldVal = getAddr(oldState, oldAddr);
					if (this.dependencies.every((dep) => {
						return dep instanceof Facet ? oldState.facet(dep) === state.facet(dep) : dep instanceof StateField ? oldState.field(dep, false) == state.field(dep, false) : true;
					}) || (multi ? compareArray(newVal = getter(state), oldVal, compare) : compare(newVal = getter(state), oldVal))) {
						state.values[idx] = oldVal;
						return 0;
					}
				} else newVal = getter(state);
				state.values[idx] = newVal;
				return 1;
			}
		};
	}
	get extension() {
		return this;
	}
};
function compareArray(a, b, compare) {
	if (a.length != b.length) return false;
	for (let i = 0; i < a.length; i++) if (!compare(a[i], b[i])) return false;
	return true;
}
function ensureAll(state, addrs) {
	let changed = false;
	for (let addr of addrs) if (ensureAddr(state, addr) & 1) changed = true;
	return changed;
}
function dynamicFacetSlot(addresses, facet, providers) {
	let providerAddrs = providers.map((p) => addresses[p.id]);
	let providerTypes = providers.map((p) => p.type);
	let dynamic = providerAddrs.filter((p) => !(p & 1));
	let idx = addresses[facet.id] >> 1;
	function get(state) {
		let values = [];
		for (let i = 0; i < providerAddrs.length; i++) {
			let value = getAddr(state, providerAddrs[i]);
			if (providerTypes[i] == 2) for (let val of value) values.push(val);
			else values.push(value);
		}
		return facet.combine(values);
	}
	return {
		create(state) {
			for (let addr of providerAddrs) ensureAddr(state, addr);
			state.values[idx] = get(state);
			return 1;
		},
		update(state, tr) {
			if (!ensureAll(state, dynamic)) return 0;
			let value = get(state);
			if (facet.compare(value, state.values[idx])) return 0;
			state.values[idx] = value;
			return 1;
		},
		reconfigure(state, oldState) {
			let depChanged = ensureAll(state, providerAddrs);
			let oldProviders = oldState.config.facets[facet.id], oldValue = oldState.facet(facet);
			if (oldProviders && !depChanged && sameArray(providers, oldProviders)) {
				state.values[idx] = oldValue;
				return 0;
			}
			let value = get(state);
			if (facet.compare(value, oldValue)) {
				state.values[idx] = oldValue;
				return 0;
			}
			state.values[idx] = value;
			return 1;
		}
	};
}
var initField = Facet.define({ static: true });
var StateField = class StateField {
	constructor(id, createF, updateF, compareF, spec) {
		this.id = id;
		this.createF = createF;
		this.updateF = updateF;
		this.compareF = compareF;
		this.spec = spec;
		this.provides = void 0;
	}
	static define(config) {
		let field = new StateField(nextID++, config.create, config.update, config.compare || ((a, b) => a === b), config);
		if (config.provide) field.provides = config.provide(field);
		return field;
	}
	create(state) {
		let init = state.facet(initField).find((i) => i.field == this);
		return ((init === null || init === void 0 ? void 0 : init.create) || this.createF)(state);
	}
	slot(addresses) {
		let idx = addresses[this.id] >> 1;
		return {
			create: (state) => {
				state.values[idx] = this.create(state);
				return 1;
			},
			update: (state, tr) => {
				let oldVal = state.values[idx];
				let value = this.updateF(oldVal, tr);
				if (this.compareF(oldVal, value)) return 0;
				state.values[idx] = value;
				return 1;
			},
			reconfigure: (state, oldState) => {
				let init = state.facet(initField), oldInit = oldState.facet(initField), reInit;
				if ((reInit = init.find((i) => i.field == this)) && reInit != oldInit.find((i) => i.field == this)) {
					state.values[idx] = reInit.create(state);
					return 1;
				}
				if (oldState.config.address[this.id] != null) {
					state.values[idx] = oldState.field(this);
					return 0;
				}
				state.values[idx] = this.create(state);
				return 1;
			}
		};
	}
	init(create) {
		return [this, initField.of({
			field: this,
			create
		})];
	}
	get extension() {
		return this;
	}
};
var Prec_ = {
	lowest: 4,
	low: 3,
	default: 2,
	high: 1,
	highest: 0
};
function prec(value) {
	return (ext) => new PrecExtension(ext, value);
}
var Prec = {
	highest: prec(Prec_.highest),
	high: prec(Prec_.high),
	default: prec(Prec_.default),
	low: prec(Prec_.low),
	lowest: prec(Prec_.lowest)
};
var PrecExtension = class {
	constructor(inner, prec) {
		this.inner = inner;
		this.prec = prec;
	}
	get extension() {
		return this;
	}
};
var Compartment = class Compartment {
	of(ext) {
		return new CompartmentInstance(this, ext);
	}
	reconfigure(content) {
		return Compartment.reconfigure.of({
			compartment: this,
			extension: content
		});
	}
	get(state) {
		return state.config.compartments.get(this);
	}
};
var CompartmentInstance = class {
	constructor(compartment, inner) {
		this.compartment = compartment;
		this.inner = inner;
	}
	get extension() {
		return this;
	}
};
var Configuration = class Configuration {
	constructor(base, compartments, dynamicSlots, address, staticValues, facets) {
		this.base = base;
		this.compartments = compartments;
		this.dynamicSlots = dynamicSlots;
		this.address = address;
		this.staticValues = staticValues;
		this.facets = facets;
		this.statusTemplate = [];
		while (this.statusTemplate.length < dynamicSlots.length) this.statusTemplate.push(0);
	}
	staticFacet(facet) {
		let addr = this.address[facet.id];
		return addr == null ? facet.default : this.staticValues[addr >> 1];
	}
	static resolve(base, compartments, oldState) {
		let fields = [];
		let facets = Object.create(null);
		let newCompartments = new Map();
		for (let ext of flatten(base, compartments, newCompartments)) if (ext instanceof StateField) fields.push(ext);
		else (facets[ext.facet.id] || (facets[ext.facet.id] = [])).push(ext);
		let address = Object.create(null);
		let staticValues = [];
		let dynamicSlots = [];
		for (let field of fields) {
			address[field.id] = dynamicSlots.length << 1;
			dynamicSlots.push((a) => field.slot(a));
		}
		let oldFacets = oldState === null || oldState === void 0 ? void 0 : oldState.config.facets;
		for (let id in facets) {
			let providers = facets[id], facet = providers[0].facet;
			let oldProviders = oldFacets && oldFacets[id] || [];
			if (providers.every((p) => p.type == 0)) {
				address[facet.id] = staticValues.length << 1 | 1;
				if (sameArray(oldProviders, providers)) staticValues.push(oldState.facet(facet));
				else {
					let value = facet.combine(providers.map((p) => p.value));
					staticValues.push(oldState && facet.compare(value, oldState.facet(facet)) ? oldState.facet(facet) : value);
				}
			} else {
				for (let p of providers) if (p.type == 0) {
					address[p.id] = staticValues.length << 1 | 1;
					staticValues.push(p.value);
				} else {
					address[p.id] = dynamicSlots.length << 1;
					dynamicSlots.push((a) => p.dynamicSlot(a));
				}
				address[facet.id] = dynamicSlots.length << 1;
				dynamicSlots.push((a) => dynamicFacetSlot(a, facet, providers));
			}
		}
		let dynamic = dynamicSlots.map((f) => f(address));
		return new Configuration(base, newCompartments, dynamic, address, staticValues, facets);
	}
};
function flatten(extension, compartments, newCompartments) {
	let result = [
		[],
		[],
		[],
		[],
		[]
	];
	let seen = new Map();
	function inner(ext, prec) {
		let known = seen.get(ext);
		if (known != null) {
			if (known <= prec) return;
			let found = result[known].indexOf(ext);
			if (found > -1) result[known].splice(found, 1);
			if (ext instanceof CompartmentInstance) newCompartments.delete(ext.compartment);
		}
		seen.set(ext, prec);
		if (Array.isArray(ext)) for (let e of ext) inner(e, prec);
		else if (ext instanceof CompartmentInstance) {
			if (newCompartments.has(ext.compartment)) throw new RangeError(`Duplicate use of compartment in extensions`);
			let content = compartments.get(ext.compartment) || ext.inner;
			newCompartments.set(ext.compartment, content);
			inner(content, prec);
		} else if (ext instanceof PrecExtension) inner(ext.inner, ext.prec);
		else if (ext instanceof StateField) {
			result[prec].push(ext);
			if (ext.provides) inner(ext.provides, prec);
		} else if (ext instanceof FacetProvider) {
			result[prec].push(ext);
			if (ext.facet.extensions) inner(ext.facet.extensions, Prec_.default);
		} else {
			let content = ext.extension;
			if (!content) throw new Error(`Unrecognized extension value in extension set (${ext}).`);
			if (content == ext) throw new Error(`Unrecognized extension value in extension set (${ext}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
			inner(content, prec);
		}
	}
	inner(extension, Prec_.default);
	return result.reduce((a, b) => a.concat(b));
}
function ensureAddr(state, addr) {
	if (addr & 1) return 2;
	let idx = addr >> 1;
	let status = state.status[idx];
	if (status == 4) throw new Error("Cyclic dependency between fields and/or facets");
	if (status & 2) return status;
	state.status[idx] = 4;
	let changed = state.computeSlot(state, state.config.dynamicSlots[idx]);
	return state.status[idx] = 2 | changed;
}
function getAddr(state, addr) {
	return addr & 1 ? state.config.staticValues[addr >> 1] : state.values[addr >> 1];
}
var languageData = Facet.define();
var allowMultipleSelections = Facet.define({
	combine: (values) => values.some((v) => v),
	static: true
});
var lineSeparator = Facet.define({
	combine: (values) => values.length ? values[0] : void 0,
	static: true
});
var changeFilter = Facet.define();
var transactionFilter = Facet.define();
var transactionExtender = Facet.define();
var readOnly = Facet.define({ combine: (values) => values.length ? values[0] : false });
var Annotation = class {
	constructor(type, value) {
		this.type = type;
		this.value = value;
	}
	static define() {
		return new AnnotationType();
	}
};
var AnnotationType = class {
	of(value) {
		return new Annotation(this, value);
	}
};
var StateEffectType = class {
	constructor(map) {
		this.map = map;
	}
	of(value) {
		return new StateEffect(this, value);
	}
};
var StateEffect = class StateEffect {
	constructor(type, value) {
		this.type = type;
		this.value = value;
	}
	map(mapping) {
		let mapped = this.type.map(this.value, mapping);
		return mapped === void 0 ? void 0 : mapped == this.value ? this : new StateEffect(this.type, mapped);
	}
	is(type) {
		return this.type == type;
	}
	static define(spec = {}) {
		return new StateEffectType(spec.map || ((v) => v));
	}
	static mapEffects(effects, mapping) {
		if (!effects.length) return effects;
		let result = [];
		for (let effect of effects) {
			let mapped = effect.map(mapping);
			if (mapped) result.push(mapped);
		}
		return result;
	}
};
StateEffect.reconfigure = StateEffect.define();
StateEffect.appendConfig = StateEffect.define();
var Transaction = class Transaction {
	constructor(startState, changes, selection, effects, annotations, scrollIntoView) {
		this.startState = startState;
		this.changes = changes;
		this.selection = selection;
		this.effects = effects;
		this.annotations = annotations;
		this.scrollIntoView = scrollIntoView;
		this._doc = null;
		this._state = null;
		if (selection) checkSelection(selection, changes.newLength);
		if (!annotations.some((a) => a.type == Transaction.time)) this.annotations = annotations.concat(Transaction.time.of(Date.now()));
	}
	static create(startState, changes, selection, effects, annotations, scrollIntoView) {
		return new Transaction(startState, changes, selection, effects, annotations, scrollIntoView);
	}
	get newDoc() {
		return this._doc || (this._doc = this.changes.apply(this.startState.doc));
	}
	get newSelection() {
		return this.selection || this.startState.selection.map(this.changes);
	}
	get state() {
		if (!this._state) this.startState.applyTransaction(this);
		return this._state;
	}
	annotation(type) {
		for (let ann of this.annotations) if (ann.type == type) return ann.value;
	}
	get docChanged() {
		return !this.changes.empty;
	}
	get reconfigured() {
		return this.startState.config != this.state.config;
	}
	isUserEvent(event) {
		let e = this.annotation(Transaction.userEvent);
		return !!(e && (e == event || e.length > event.length && e.slice(0, event.length) == event && e[event.length] == "."));
	}
};
Transaction.time = Annotation.define();
Transaction.userEvent = Annotation.define();
Transaction.addToHistory = Annotation.define();
Transaction.remote = Annotation.define();
function joinRanges(a, b) {
	let result = [];
	for (let iA = 0, iB = 0;;) {
		let from, to;
		if (iA < a.length && (iB == b.length || b[iB] >= a[iA])) {
			from = a[iA++];
			to = a[iA++];
		} else if (iB < b.length) {
			from = b[iB++];
			to = b[iB++];
		} else return result;
		if (!result.length || result[result.length - 1] < from) result.push(from, to);
		else if (result[result.length - 1] < to) result[result.length - 1] = to;
	}
}
function mergeTransaction(a, b, sequential) {
	var _a;
	let mapForA, mapForB, changes;
	if (sequential) {
		mapForA = b.changes;
		mapForB = ChangeSet.empty(b.changes.length);
		changes = a.changes.compose(b.changes);
	} else {
		mapForA = b.changes.map(a.changes);
		mapForB = a.changes.mapDesc(b.changes, true);
		changes = a.changes.compose(mapForA);
	}
	return {
		changes,
		selection: b.selection ? b.selection.map(mapForB) : (_a = a.selection) === null || _a === void 0 ? void 0 : _a.map(mapForA),
		effects: StateEffect.mapEffects(a.effects, mapForA).concat(StateEffect.mapEffects(b.effects, mapForB)),
		annotations: a.annotations.length ? a.annotations.concat(b.annotations) : b.annotations,
		scrollIntoView: a.scrollIntoView || b.scrollIntoView
	};
}
function resolveTransactionInner(state, spec, docSize) {
	let sel = spec.selection, annotations = asArray$2(spec.annotations);
	if (spec.userEvent) annotations = annotations.concat(Transaction.userEvent.of(spec.userEvent));
	return {
		changes: spec.changes instanceof ChangeSet ? spec.changes : ChangeSet.of(spec.changes || [], docSize, state.facet(lineSeparator)),
		selection: sel && (sel instanceof EditorSelection ? sel : EditorSelection.single(sel.anchor, sel.head)),
		effects: asArray$2(spec.effects),
		annotations,
		scrollIntoView: !!spec.scrollIntoView
	};
}
function resolveTransaction(state, specs, filter) {
	let s = resolveTransactionInner(state, specs.length ? specs[0] : {}, state.doc.length);
	if (specs.length && specs[0].filter === false) filter = false;
	for (let i = 1; i < specs.length; i++) {
		if (specs[i].filter === false) filter = false;
		let seq = !!specs[i].sequential;
		s = mergeTransaction(s, resolveTransactionInner(state, specs[i], seq ? s.changes.newLength : state.doc.length), seq);
	}
	let tr = Transaction.create(state, s.changes, s.selection, s.effects, s.annotations, s.scrollIntoView);
	return extendTransaction(filter ? filterTransaction(tr) : tr);
}
function filterTransaction(tr) {
	let state = tr.startState;
	let result = true;
	for (let filter of state.facet(changeFilter)) {
		let value = filter(tr);
		if (value === false) {
			result = false;
			break;
		}
		if (Array.isArray(value)) result = result === true ? value : joinRanges(result, value);
	}
	if (result !== true) {
		let changes, back;
		if (result === false) {
			back = tr.changes.invertedDesc;
			changes = ChangeSet.empty(state.doc.length);
		} else {
			let filtered = tr.changes.filter(result);
			changes = filtered.changes;
			back = filtered.filtered.mapDesc(filtered.changes).invertedDesc;
		}
		tr = Transaction.create(state, changes, tr.selection && tr.selection.map(back), StateEffect.mapEffects(tr.effects, back), tr.annotations, tr.scrollIntoView);
	}
	let filters = state.facet(transactionFilter);
	for (let i = filters.length - 1; i >= 0; i--) {
		let filtered = filters[i](tr);
		if (filtered instanceof Transaction) tr = filtered;
		else if (Array.isArray(filtered) && filtered.length == 1 && filtered[0] instanceof Transaction) tr = filtered[0];
		else tr = resolveTransaction(state, asArray$2(filtered), false);
	}
	return tr;
}
function extendTransaction(tr) {
	let state = tr.startState, extenders = state.facet(transactionExtender), spec = tr;
	for (let i = extenders.length - 1; i >= 0; i--) {
		let extension = extenders[i](tr);
		if (extension && Object.keys(extension).length) spec = mergeTransaction(spec, resolveTransactionInner(state, extension, tr.changes.newLength), true);
	}
	return spec == tr ? tr : Transaction.create(state, tr.changes, tr.selection, spec.effects, spec.annotations, spec.scrollIntoView);
}
var none$3 = [];
function asArray$2(value) {
	return value == null ? none$3 : Array.isArray(value) ? value : [value];
}
var CharCategory = (function(CharCategory) {
	CharCategory[CharCategory["Word"] = 0] = "Word";
	CharCategory[CharCategory["Space"] = 1] = "Space";
	CharCategory[CharCategory["Other"] = 2] = "Other";
	return CharCategory;
})(CharCategory || (CharCategory = {}));
var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
var wordChar;
try {
	wordChar = new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch (_) {}
function hasWordChar(str) {
	if (wordChar) return wordChar.test(str);
	for (let i = 0; i < str.length; i++) {
		let ch = str[i];
		if (/\w/.test(ch) || ch > "" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch))) return true;
	}
	return false;
}
function makeCategorizer(wordChars) {
	return (char) => {
		if (!/\S/.test(char)) return CharCategory.Space;
		if (hasWordChar(char)) return CharCategory.Word;
		for (let i = 0; i < wordChars.length; i++) if (char.indexOf(wordChars[i]) > -1) return CharCategory.Word;
		return CharCategory.Other;
	};
}
var EditorState = class EditorState {
	constructor(config, doc, selection, values, computeSlot, tr) {
		this.config = config;
		this.doc = doc;
		this.selection = selection;
		this.values = values;
		this.status = config.statusTemplate.slice();
		this.computeSlot = computeSlot;
		if (tr) tr._state = this;
		for (let i = 0; i < this.config.dynamicSlots.length; i++) ensureAddr(this, i << 1);
		this.computeSlot = null;
	}
	field(field, require = true) {
		let addr = this.config.address[field.id];
		if (addr == null) {
			if (require) throw new RangeError("Field is not present in this state");
			return;
		}
		ensureAddr(this, addr);
		return getAddr(this, addr);
	}
	update(...specs) {
		return resolveTransaction(this, specs, true);
	}
	applyTransaction(tr) {
		let conf = this.config, { base, compartments } = conf;
		for (let effect of tr.effects) if (effect.is(Compartment.reconfigure)) {
			if (conf) {
				compartments = new Map();
				conf.compartments.forEach((val, key) => compartments.set(key, val));
				conf = null;
			}
			compartments.set(effect.value.compartment, effect.value.extension);
		} else if (effect.is(StateEffect.reconfigure)) {
			conf = null;
			base = effect.value;
		} else if (effect.is(StateEffect.appendConfig)) {
			conf = null;
			base = asArray$2(base).concat(effect.value);
		}
		let startValues;
		if (!conf) {
			conf = Configuration.resolve(base, compartments, this);
			startValues = new EditorState(conf, this.doc, this.selection, conf.dynamicSlots.map(() => null), (state, slot) => slot.reconfigure(state, this), null).values;
		} else startValues = tr.startState.values.slice();
		let selection = tr.startState.facet(allowMultipleSelections) ? tr.newSelection : tr.newSelection.asSingle();
		new EditorState(conf, tr.newDoc, selection, startValues, (state, slot) => slot.update(state, tr), tr);
	}
	replaceSelection(text) {
		if (typeof text == "string") text = this.toText(text);
		return this.changeByRange((range) => ({
			changes: {
				from: range.from,
				to: range.to,
				insert: text
			},
			range: EditorSelection.cursor(range.from + text.length, -1)
		}));
	}
	changeByRange(f) {
		let sel = this.selection;
		let result1 = f(sel.ranges[0]);
		let changes = this.changes(result1.changes), ranges = [result1.range];
		let effects = asArray$2(result1.effects);
		for (let i = 1; i < sel.ranges.length; i++) {
			let result = f(sel.ranges[i]);
			let newChanges = this.changes(result.changes), newMapped = newChanges.map(changes);
			for (let j = 0; j < i; j++) ranges[j] = ranges[j].map(newMapped);
			let mapBy = changes.mapDesc(newChanges, true);
			ranges.push(result.range.map(mapBy));
			changes = changes.compose(newMapped);
			effects = StateEffect.mapEffects(effects, newMapped).concat(StateEffect.mapEffects(asArray$2(result.effects), mapBy));
		}
		return {
			changes,
			selection: EditorSelection.create(ranges, sel.mainIndex),
			effects
		};
	}
	changes(spec = []) {
		if (spec instanceof ChangeSet) return spec;
		return ChangeSet.of(spec, this.doc.length, this.facet(EditorState.lineSeparator));
	}
	toText(string) {
		return Text.of(string.split(this.facet(EditorState.lineSeparator) || DefaultSplit));
	}
	sliceDoc(from = 0, to = this.doc.length) {
		return this.doc.sliceString(from, to, this.lineBreak);
	}
	facet(facet) {
		let addr = this.config.address[facet.id];
		if (addr == null) return facet.default;
		ensureAddr(this, addr);
		return getAddr(this, addr);
	}
	toJSON(fields) {
		let result = {
			doc: this.sliceDoc(),
			selection: this.selection.toJSON()
		};
		if (fields) for (let prop in fields) {
			let value = fields[prop];
			if (value instanceof StateField && this.config.address[value.id] != null) result[prop] = value.spec.toJSON(this.field(fields[prop]), this);
		}
		return result;
	}
	static fromJSON(json, config = {}, fields) {
		if (!json || typeof json.doc != "string") throw new RangeError("Invalid JSON representation for EditorState");
		let fieldInit = [];
		if (fields) {
			for (let prop in fields) if (Object.prototype.hasOwnProperty.call(json, prop)) {
				let field = fields[prop], value = json[prop];
				fieldInit.push(field.init((state) => field.spec.fromJSON(value, state)));
			}
		}
		return EditorState.create({
			doc: json.doc,
			selection: EditorSelection.fromJSON(json.selection),
			extensions: config.extensions ? fieldInit.concat([config.extensions]) : fieldInit
		});
	}
	static create(config = {}) {
		let configuration = Configuration.resolve(config.extensions || [], new Map());
		let doc = config.doc instanceof Text ? config.doc : Text.of((config.doc || "").split(configuration.staticFacet(EditorState.lineSeparator) || DefaultSplit));
		let selection = !config.selection ? EditorSelection.single(0) : config.selection instanceof EditorSelection ? config.selection : EditorSelection.single(config.selection.anchor, config.selection.head);
		checkSelection(selection, doc.length);
		if (!configuration.staticFacet(allowMultipleSelections)) selection = selection.asSingle();
		return new EditorState(configuration, doc, selection, configuration.dynamicSlots.map(() => null), (state, slot) => slot.create(state), null);
	}
	get tabSize() {
		return this.facet(EditorState.tabSize);
	}
	get lineBreak() {
		return this.facet(EditorState.lineSeparator) || "\n";
	}
	get readOnly() {
		return this.facet(readOnly);
	}
	phrase(phrase, ...insert) {
		for (let map of this.facet(EditorState.phrases)) if (Object.prototype.hasOwnProperty.call(map, phrase)) {
			phrase = map[phrase];
			break;
		}
		if (insert.length) phrase = phrase.replace(/\$(\$|\d*)/g, (m, i) => {
			if (i == "$") return "$";
			let n = +(i || 1);
			return !n || n > insert.length ? m : insert[n - 1];
		});
		return phrase;
	}
	languageDataAt(name, pos, side = -1) {
		let values = [];
		for (let provider of this.facet(languageData)) for (let result of provider(this, pos, side)) if (Object.prototype.hasOwnProperty.call(result, name)) values.push(result[name]);
		return values;
	}
	charCategorizer(at) {
		let chars = this.languageDataAt("wordChars", at);
		return makeCategorizer(chars.length ? chars[0] : "");
	}
	wordAt(pos) {
		let { text, from, length } = this.doc.lineAt(pos);
		let cat = this.charCategorizer(pos);
		let start = pos - from, end = pos - from;
		while (start > 0) {
			let prev = findClusterBreak(text, start, false);
			if (cat(text.slice(prev, start)) != CharCategory.Word) break;
			start = prev;
		}
		while (end < length) {
			let next = findClusterBreak(text, end);
			if (cat(text.slice(end, next)) != CharCategory.Word) break;
			end = next;
		}
		return start == end ? null : EditorSelection.range(start + from, end + from);
	}
};
EditorState.allowMultipleSelections = allowMultipleSelections;
EditorState.tabSize = Facet.define({ combine: (values) => values.length ? values[0] : 4 });
EditorState.lineSeparator = lineSeparator;
EditorState.readOnly = readOnly;
EditorState.phrases = Facet.define({ compare(a, b) {
	let kA = Object.keys(a), kB = Object.keys(b);
	return kA.length == kB.length && kA.every((k) => a[k] == b[k]);
} });
EditorState.languageData = languageData;
EditorState.changeFilter = changeFilter;
EditorState.transactionFilter = transactionFilter;
EditorState.transactionExtender = transactionExtender;
Compartment.reconfigure = StateEffect.define();
function combineConfig(configs, defaults, combine = {}) {
	let result = {};
	for (let config of configs) for (let key of Object.keys(config)) {
		let value = config[key], current = result[key];
		if (current === void 0) result[key] = value;
		else if (current === value || value === void 0);
		else if (Object.hasOwnProperty.call(combine, key)) result[key] = combine[key](current, value);
		else throw new Error("Config merge conflict for field " + key);
	}
	for (let key in defaults) if (result[key] === void 0) result[key] = defaults[key];
	return result;
}
var RangeValue = class {
	eq(other) {
		return this == other;
	}
	range(from, to = from) {
		return Range.create(from, to, this);
	}
};
RangeValue.prototype.startSide = RangeValue.prototype.endSide = 0;
RangeValue.prototype.point = false;
RangeValue.prototype.mapMode = MapMode.TrackDel;
function cmpVal(a, b) {
	return a == b || a.constructor == b.constructor && a.eq(b);
}
var Range = class Range {
	constructor(from, to, value) {
		this.from = from;
		this.to = to;
		this.value = value;
	}
	static create(from, to, value) {
		return new Range(from, to, value);
	}
};
function cmpRange(a, b) {
	return a.from - b.from || a.value.startSide - b.value.startSide;
}
var Chunk = class Chunk {
	constructor(from, to, value, maxPoint) {
		this.from = from;
		this.to = to;
		this.value = value;
		this.maxPoint = maxPoint;
	}
	get length() {
		return last$1(this.to);
	}
	findIndex(pos, side, end, startAt = 0) {
		let arr = end ? this.to : this.from;
		for (let lo = startAt, hi = arr.length;;) {
			if (lo == hi) return lo;
			let mid = lo + hi >> 1;
			let diff = arr[mid] - pos || (end ? this.value[mid].endSide : this.value[mid].startSide) - side;
			if (mid == lo) return diff >= 0 ? lo : hi;
			if (diff >= 0) hi = mid;
			else lo = mid + 1;
		}
	}
	between(offset, from, to, f) {
		for (let i = this.findIndex(from, -1e9, true), e = this.findIndex(to, 1e9, false, i); i < e; i++) if (f(this.from[i] + offset, this.to[i] + offset, this.value[i]) === false) return false;
	}
	map(offset, changes, basePos, baseSide, spill) {
		let value = [], from = [], to = [], newPos = -1, maxPoint = -1;
		iter: for (let i = 0; i < this.value.length; i++) {
			let val = this.value[i], curFrom = this.from[i] + offset, curTo = this.to[i] + offset, newFrom, newTo;
			if (curFrom == curTo) {
				let mapped = changes.mapPos(curFrom, val.startSide, val.mapMode);
				if (mapped == null) continue;
				newFrom = newTo = mapped;
				if (val.startSide != val.endSide) {
					newTo = changes.mapPos(curFrom, val.endSide);
					if (newTo < newFrom) continue;
				}
			} else {
				newFrom = changes.mapPos(curFrom, val.startSide);
				newTo = changes.mapPos(curTo, val.endSide);
				if (newFrom > newTo || newFrom == newTo && val.startSide > 0 && val.endSide <= 0) continue;
			}
			if ((newTo - newFrom || val.endSide - val.startSide) < 0) continue;
			if (newPos < 0) newPos = newFrom;
			if (val.point) maxPoint = Math.max(maxPoint, newTo - newFrom);
			if ((newFrom - basePos || val.startSide - baseSide) >= 0) {
				value.push(val);
				from.push(newFrom - newPos);
				to.push(newTo - newPos);
				basePos = newTo;
				baseSide = val.endSide;
			} else {
				if (newFrom == newTo) for (let i = value.length; i > 0; i--) {
					if ((newFrom - (to[i - 1] + newPos) || val.startSide - value[i - 1].endSide) >= 0) {
						value.splice(i, 0, val);
						from.splice(i, 0, newFrom - newPos);
						to.splice(i, 0, newTo - newPos);
						continue iter;
					}
					if ((newFrom - (from[i - 1] + newPos) || val.endSide - value[i - 1].startSide) > 0) break;
				}
				spill(newFrom, newTo, val);
			}
		}
		return {
			mapped: value.length ? new Chunk(from, to, value, maxPoint) : null,
			pos: newPos
		};
	}
};
var RangeSet = class RangeSet {
	constructor(chunkPos, chunk, nextLayer, maxPoint) {
		this.chunkPos = chunkPos;
		this.chunk = chunk;
		this.nextLayer = nextLayer;
		this.maxPoint = maxPoint;
	}
	static create(chunkPos, chunk, nextLayer, maxPoint) {
		return new RangeSet(chunkPos, chunk, nextLayer, maxPoint);
	}
	get length() {
		let last = this.chunk.length - 1;
		return last < 0 ? 0 : Math.max(this.chunkEnd(last), this.nextLayer.length);
	}
	get size() {
		if (this.isEmpty) return 0;
		let size = this.nextLayer.size;
		for (let chunk of this.chunk) size += chunk.value.length;
		return size;
	}
	chunkEnd(index) {
		return this.chunkPos[index] + this.chunk[index].length;
	}
	update(updateSpec) {
		let { add = [], sort = false, filterFrom = 0, filterTo = this.length } = updateSpec;
		let filter = updateSpec.filter;
		if (add.length == 0 && !filter) return this;
		if (sort) add = add.slice().sort(cmpRange);
		if (this.isEmpty) return add.length ? RangeSet.of(add) : this;
		let cur = new LayerCursor(this, null, -1).goto(0), i = 0, spill = [];
		let builder = new RangeSetBuilder();
		while (cur.value || i < add.length) if (i < add.length && (cur.from - add[i].from || cur.startSide - add[i].value.startSide) >= 0) {
			let range = add[i++];
			if (!builder.addInner(range.from, range.to, range.value, false)) spill.push(range);
		} else if (cur.rangeIndex == 1 && cur.chunkIndex < this.chunk.length && (i == add.length || this.chunkEnd(cur.chunkIndex) < add[i].from) && (!filter || filterFrom > this.chunkEnd(cur.chunkIndex) || filterTo < this.chunkPos[cur.chunkIndex]) && builder.addChunk(this.chunkPos[cur.chunkIndex], this.chunk[cur.chunkIndex])) cur.nextChunk();
		else {
			if (!filter || filterFrom > cur.to || filterTo < cur.from || filter(cur.from, cur.to, cur.value)) {
				if (!builder.addInner(cur.from, cur.to, cur.value, false)) spill.push(Range.create(cur.from, cur.to, cur.value));
			}
			cur.next();
		}
		return builder.finishInner(this.nextLayer.isEmpty && !spill.length ? RangeSet.empty : this.nextLayer.update({
			add: spill,
			filter,
			filterFrom,
			filterTo
		}));
	}
	map(changes) {
		if (changes.empty || this.isEmpty) return this;
		let chunks = [], chunkPos = [], maxPoint = -1;
		let spilled;
		let spill = (from, to, value) => {
			if (!spilled) spilled = new RangeSetBuilder();
			spilled.addRange(from, to, value, false);
		};
		for (let i = 0; i < this.chunk.length; i++) {
			let start = this.chunkPos[i], chunk = this.chunk[i];
			let touch = changes.touchesRange(start, start + chunk.length);
			if (touch === false) {
				maxPoint = Math.max(maxPoint, chunk.maxPoint);
				chunks.push(chunk);
				chunkPos.push(changes.mapPos(start));
			} else if (touch === true) {
				let [prevPos, prevSide] = !chunks.length ? [-1, -1] : [last$1(chunkPos) + last$1(chunks).length, last$1(last$1(chunks).value).endSide];
				let { mapped, pos } = chunk.map(start, changes, prevPos, prevSide, spill);
				if (mapped) {
					maxPoint = Math.max(maxPoint, mapped.maxPoint);
					chunks.push(mapped);
					chunkPos.push(pos);
				}
			}
		}
		let next = this.nextLayer.map(changes);
		if (spilled) next = spilled.finishInner(next);
		return chunks.length == 0 ? next : new RangeSet(chunkPos, chunks, next || RangeSet.empty, maxPoint);
	}
	between(from, to, f) {
		if (this.isEmpty) return;
		for (let i = 0; i < this.chunk.length; i++) {
			let start = this.chunkPos[i], chunk = this.chunk[i];
			if (to >= start && from <= start + chunk.length && chunk.between(start, from - start, to - start, f) === false) return;
		}
		this.nextLayer.between(from, to, f);
	}
	iter(from = 0) {
		return HeapCursor.from([this]).goto(from);
	}
	get isEmpty() {
		return this.nextLayer == this;
	}
	static iter(sets, from = 0) {
		return HeapCursor.from(sets).goto(from);
	}
	static compare(oldSets, newSets, textDiff, comparator, minPointSize = -1) {
		let a = oldSets.filter((set) => set.maxPoint > 0 || !set.isEmpty && set.maxPoint >= minPointSize);
		let b = newSets.filter((set) => set.maxPoint > 0 || !set.isEmpty && set.maxPoint >= minPointSize);
		let sharedChunks = findSharedChunks(a, b, textDiff);
		let sideA = new SpanCursor(a, sharedChunks, minPointSize);
		let sideB = new SpanCursor(b, sharedChunks, minPointSize);
		textDiff.iterGaps((fromA, fromB, length) => compare(sideA, fromA, sideB, fromB, length, comparator));
		if (textDiff.empty && textDiff.length == 0) compare(sideA, 0, sideB, 0, 0, comparator);
	}
	static eq(oldSets, newSets, from = 0, to) {
		if (to == null) to = 1e9 - 1;
		let a = oldSets.filter((set) => !set.isEmpty && newSets.indexOf(set) < 0);
		let b = newSets.filter((set) => !set.isEmpty && oldSets.indexOf(set) < 0);
		if (a.length != b.length) return false;
		if (!a.length) return true;
		let sharedChunks = findSharedChunks(a, b);
		let sideA = new SpanCursor(a, sharedChunks, 0).goto(from), sideB = new SpanCursor(b, sharedChunks, 0).goto(from);
		for (;;) {
			if (sideA.to != sideB.to || !sameValues(sideA.active, sideB.active) || sideA.point && (!sideB.point || !cmpVal(sideA.point, sideB.point))) return false;
			if (sideA.to > to) return true;
			sideA.next();
			sideB.next();
		}
	}
	static spans(sets, from, to, iterator, minPointSize = -1) {
		let cursor = new SpanCursor(sets, null, minPointSize).goto(from), pos = from;
		let openRanges = cursor.openStart;
		for (;;) {
			let curTo = Math.min(cursor.to, to);
			if (cursor.point) {
				let active = cursor.activeForPoint(cursor.to);
				let openCount = cursor.pointFrom < from ? active.length + 1 : cursor.point.startSide < 0 ? active.length : Math.min(active.length, openRanges);
				iterator.point(pos, curTo, cursor.point, active, openCount, cursor.pointRank);
				openRanges = Math.min(cursor.openEnd(curTo), active.length);
			} else if (curTo > pos) {
				iterator.span(pos, curTo, cursor.active, openRanges);
				openRanges = cursor.openEnd(curTo);
			}
			if (cursor.to > to) return openRanges + (cursor.point && cursor.to > to ? 1 : 0);
			pos = cursor.to;
			cursor.next();
		}
	}
	static of(ranges, sort = false) {
		let build = new RangeSetBuilder();
		for (let range of ranges instanceof Range ? [ranges] : sort ? lazySort(ranges) : ranges) build.add(range.from, range.to, range.value);
		return build.finish();
	}
	static join(sets) {
		if (!sets.length) return RangeSet.empty;
		let result = last$1(sets);
		for (let i = sets.length - 2; i >= 0; i--) for (let layer = sets[i]; layer != RangeSet.empty; layer = layer.nextLayer) result = new RangeSet(layer.chunkPos, layer.chunk, result, Math.max(layer.maxPoint, result.maxPoint));
		return result;
	}
};
RangeSet.empty = new RangeSet([], [], null, -1);
function last$1(arr) {
	return arr[arr.length - 1];
}
function lazySort(ranges) {
	if (ranges.length > 1) for (let prev = ranges[0], i = 1; i < ranges.length; i++) {
		let cur = ranges[i];
		if (cmpRange(prev, cur) > 0) return ranges.slice().sort(cmpRange);
		prev = cur;
	}
	return ranges;
}
RangeSet.empty.nextLayer = RangeSet.empty;
var RangeSetBuilder = class RangeSetBuilder {
	finishChunk(newArrays) {
		this.chunks.push(new Chunk(this.from, this.to, this.value, this.maxPoint));
		this.chunkPos.push(this.chunkStart);
		this.chunkStart = -1;
		this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint);
		this.maxPoint = -1;
		if (newArrays) {
			this.from = [];
			this.to = [];
			this.value = [];
		}
	}
	constructor() {
		this.chunks = [];
		this.chunkPos = [];
		this.chunkStart = -1;
		this.last = null;
		this.lastFrom = -1e9;
		this.lastTo = -1e9;
		this.from = [];
		this.to = [];
		this.value = [];
		this.maxPoint = -1;
		this.setMaxPoint = -1;
		this.nextLayer = null;
	}
	add(from, to, value) {
		this.addRange(from, to, value, true);
	}
	addRange(from, to, value, strict) {
		if (!this.addInner(from, to, value, strict)) (this.nextLayer || (this.nextLayer = new RangeSetBuilder())).addRange(from, to, value, strict);
	}
	addInner(from, to, value, strict) {
		let diff = from - this.lastTo || value.startSide - this.last.endSide;
		if (strict && diff <= 0 && (from - this.lastFrom || value.startSide - this.last.startSide) < 0) throw new Error("Ranges must be added sorted by `from` position and `startSide`");
		if (diff < 0) return false;
		if (this.from.length == 250) this.finishChunk(true);
		if (this.chunkStart < 0) this.chunkStart = from;
		this.from.push(from - this.chunkStart);
		this.to.push(to - this.chunkStart);
		this.last = value;
		this.lastFrom = from;
		this.lastTo = to;
		this.value.push(value);
		if (value.point) this.maxPoint = Math.max(this.maxPoint, to - from);
		return true;
	}
	addChunk(from, chunk) {
		if ((from - this.lastTo || chunk.value[0].startSide - this.last.endSide) < 0) return false;
		if (this.from.length) this.finishChunk(true);
		this.setMaxPoint = Math.max(this.setMaxPoint, chunk.maxPoint);
		this.chunks.push(chunk);
		this.chunkPos.push(from);
		let last = chunk.value.length - 1;
		this.last = chunk.value[last];
		this.lastFrom = chunk.from[last] + from;
		this.lastTo = chunk.to[last] + from;
		return true;
	}
	finish() {
		return this.finishInner(RangeSet.empty);
	}
	finishInner(next) {
		if (this.from.length) this.finishChunk(false);
		if (this.chunks.length == 0) return next;
		let result = RangeSet.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(next) : next, this.setMaxPoint);
		this.from = null;
		return result;
	}
};
function findSharedChunks(a, b, textDiff) {
	let inA = new Map();
	for (let set of a) for (let i = 0; i < set.chunk.length; i++) if (set.chunk[i].maxPoint <= 0) inA.set(set.chunk[i], set.chunkPos[i]);
	let shared = new Set();
	for (let set of b) for (let i = 0; i < set.chunk.length; i++) {
		let known = inA.get(set.chunk[i]);
		if (known != null && (textDiff ? textDiff.mapPos(known) : known) == set.chunkPos[i] && !(textDiff === null || textDiff === void 0 ? void 0 : textDiff.touchesRange(known, known + set.chunk[i].length))) shared.add(set.chunk[i]);
	}
	return shared;
}
var LayerCursor = class {
	constructor(layer, skip, minPoint, rank = 0) {
		this.layer = layer;
		this.skip = skip;
		this.minPoint = minPoint;
		this.rank = rank;
	}
	get startSide() {
		return this.value ? this.value.startSide : 0;
	}
	get endSide() {
		return this.value ? this.value.endSide : 0;
	}
	goto(pos, side = -1e9) {
		this.chunkIndex = this.rangeIndex = 0;
		this.gotoInner(pos, side, false);
		return this;
	}
	gotoInner(pos, side, forward) {
		while (this.chunkIndex < this.layer.chunk.length) {
			let next = this.layer.chunk[this.chunkIndex];
			if (!(this.skip && this.skip.has(next) || this.layer.chunkEnd(this.chunkIndex) < pos || next.maxPoint < this.minPoint)) break;
			this.chunkIndex++;
			forward = false;
		}
		if (this.chunkIndex < this.layer.chunk.length) {
			let rangeIndex = this.layer.chunk[this.chunkIndex].findIndex(pos - this.layer.chunkPos[this.chunkIndex], side, true);
			if (!forward || this.rangeIndex < rangeIndex) this.setRangeIndex(rangeIndex);
		}
		this.next();
	}
	forward(pos, side) {
		if ((this.to - pos || this.endSide - side) < 0) this.gotoInner(pos, side, true);
	}
	next() {
		for (;;) if (this.chunkIndex == this.layer.chunk.length) {
			this.from = this.to = 1e9;
			this.value = null;
			break;
		} else {
			let chunkPos = this.layer.chunkPos[this.chunkIndex], chunk = this.layer.chunk[this.chunkIndex];
			let from = chunkPos + chunk.from[this.rangeIndex];
			this.from = from;
			this.to = chunkPos + chunk.to[this.rangeIndex];
			this.value = chunk.value[this.rangeIndex];
			this.setRangeIndex(this.rangeIndex + 1);
			if (this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint) break;
		}
	}
	setRangeIndex(index) {
		if (index == this.layer.chunk[this.chunkIndex].value.length) {
			this.chunkIndex++;
			if (this.skip) while (this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex])) this.chunkIndex++;
			this.rangeIndex = 0;
		} else this.rangeIndex = index;
	}
	nextChunk() {
		this.chunkIndex++;
		this.rangeIndex = 0;
		this.next();
	}
	compare(other) {
		return this.from - other.from || this.startSide - other.startSide || this.rank - other.rank || this.to - other.to || this.endSide - other.endSide;
	}
};
var HeapCursor = class HeapCursor {
	constructor(heap) {
		this.heap = heap;
	}
	static from(sets, skip = null, minPoint = -1) {
		let heap = [];
		for (let i = 0; i < sets.length; i++) for (let cur = sets[i]; !cur.isEmpty; cur = cur.nextLayer) if (cur.maxPoint >= minPoint) heap.push(new LayerCursor(cur, skip, minPoint, i));
		return heap.length == 1 ? heap[0] : new HeapCursor(heap);
	}
	get startSide() {
		return this.value ? this.value.startSide : 0;
	}
	goto(pos, side = -1e9) {
		for (let cur of this.heap) cur.goto(pos, side);
		for (let i = this.heap.length >> 1; i >= 0; i--) heapBubble(this.heap, i);
		this.next();
		return this;
	}
	forward(pos, side) {
		for (let cur of this.heap) cur.forward(pos, side);
		for (let i = this.heap.length >> 1; i >= 0; i--) heapBubble(this.heap, i);
		if ((this.to - pos || this.value.endSide - side) < 0) this.next();
	}
	next() {
		if (this.heap.length == 0) {
			this.from = this.to = 1e9;
			this.value = null;
			this.rank = -1;
		} else {
			let top = this.heap[0];
			this.from = top.from;
			this.to = top.to;
			this.value = top.value;
			this.rank = top.rank;
			if (top.value) top.next();
			heapBubble(this.heap, 0);
		}
	}
};
function heapBubble(heap, index) {
	for (let cur = heap[index];;) {
		let childIndex = (index << 1) + 1;
		if (childIndex >= heap.length) break;
		let child = heap[childIndex];
		if (childIndex + 1 < heap.length && child.compare(heap[childIndex + 1]) >= 0) {
			child = heap[childIndex + 1];
			childIndex++;
		}
		if (cur.compare(child) < 0) break;
		heap[childIndex] = cur;
		heap[index] = child;
		index = childIndex;
	}
}
var SpanCursor = class {
	constructor(sets, skip, minPoint) {
		this.minPoint = minPoint;
		this.active = [];
		this.activeTo = [];
		this.activeRank = [];
		this.minActive = -1;
		this.point = null;
		this.pointFrom = 0;
		this.pointRank = 0;
		this.to = -1e9;
		this.endSide = 0;
		this.openStart = -1;
		this.cursor = HeapCursor.from(sets, skip, minPoint);
	}
	goto(pos, side = -1e9) {
		this.cursor.goto(pos, side);
		this.active.length = this.activeTo.length = this.activeRank.length = 0;
		this.minActive = -1;
		this.to = pos;
		this.endSide = side;
		this.openStart = -1;
		this.next();
		return this;
	}
	forward(pos, side) {
		while (this.minActive > -1 && (this.activeTo[this.minActive] - pos || this.active[this.minActive].endSide - side) < 0) this.removeActive(this.minActive);
		this.cursor.forward(pos, side);
	}
	removeActive(index) {
		remove(this.active, index);
		remove(this.activeTo, index);
		remove(this.activeRank, index);
		this.minActive = findMinIndex(this.active, this.activeTo);
	}
	addActive(trackOpen) {
		let i = 0, { value, to, rank } = this.cursor;
		while (i < this.activeRank.length && (rank - this.activeRank[i] || to - this.activeTo[i]) > 0) i++;
		insert(this.active, i, value);
		insert(this.activeTo, i, to);
		insert(this.activeRank, i, rank);
		if (trackOpen) insert(trackOpen, i, this.cursor.from);
		this.minActive = findMinIndex(this.active, this.activeTo);
	}
	next() {
		let from = this.to, wasPoint = this.point;
		this.point = null;
		let trackOpen = this.openStart < 0 ? [] : null;
		for (;;) {
			let a = this.minActive;
			if (a > -1 && (this.activeTo[a] - this.cursor.from || this.active[a].endSide - this.cursor.startSide) < 0) {
				if (this.activeTo[a] > from) {
					this.to = this.activeTo[a];
					this.endSide = this.active[a].endSide;
					break;
				}
				this.removeActive(a);
				if (trackOpen) remove(trackOpen, a);
			} else if (!this.cursor.value) {
				this.to = this.endSide = 1e9;
				break;
			} else if (this.cursor.from > from) {
				this.to = this.cursor.from;
				this.endSide = this.cursor.startSide;
				break;
			} else {
				let nextVal = this.cursor.value;
				if (!nextVal.point) {
					this.addActive(trackOpen);
					this.cursor.next();
				} else if (wasPoint && this.cursor.to == this.to && this.cursor.from < this.cursor.to) this.cursor.next();
				else {
					this.point = nextVal;
					this.pointFrom = this.cursor.from;
					this.pointRank = this.cursor.rank;
					this.to = this.cursor.to;
					this.endSide = nextVal.endSide;
					this.cursor.next();
					this.forward(this.to, this.endSide);
					break;
				}
			}
		}
		if (trackOpen) {
			this.openStart = 0;
			for (let i = trackOpen.length - 1; i >= 0 && trackOpen[i] < from; i--) this.openStart++;
		}
	}
	activeForPoint(to) {
		if (!this.active.length) return this.active;
		let active = [];
		for (let i = this.active.length - 1; i >= 0; i--) {
			if (this.activeRank[i] < this.pointRank) break;
			if (this.activeTo[i] > to || this.activeTo[i] == to && this.active[i].endSide >= this.point.endSide) active.push(this.active[i]);
		}
		return active.reverse();
	}
	openEnd(to) {
		let open = 0;
		for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > to; i--) open++;
		return open;
	}
};
function compare(a, startA, b, startB, length, comparator) {
	a.goto(startA);
	b.goto(startB);
	let endB = startB + length;
	let pos = startB, dPos = startB - startA;
	let bounds = !!comparator.boundChange;
	for (let boundChange = false;;) {
		let dEnd = a.to + dPos - b.to, diff = dEnd || a.endSide - b.endSide;
		let end = diff < 0 ? a.to + dPos : b.to, clipEnd = Math.min(end, endB);
		if (a.point || b.point) {
			if (!(a.point && b.point && cmpVal(a.point, b.point) && sameValues(a.activeForPoint(a.to), b.activeForPoint(b.to)))) comparator.comparePoint(pos, clipEnd, a.point, b.point);
			boundChange = false;
		} else {
			if (boundChange) {
				comparator.boundChange(pos);
				boundChange = false;
			}
			if (clipEnd > pos && !sameValues(a.active, b.active)) comparator.compareRange(pos, clipEnd, a.active, b.active);
			if (bounds && clipEnd < endB && (dEnd || a.openEnd(end) != b.openEnd(end))) boundChange = true;
		}
		if (end > endB) break;
		pos = end;
		if (diff <= 0) a.next();
		if (diff >= 0) b.next();
	}
}
function sameValues(a, b) {
	if (a.length != b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] != b[i] && !cmpVal(a[i], b[i])) return false;
	return true;
}
function remove(array, index) {
	for (let i = index, e = array.length - 1; i < e; i++) array[i] = array[i + 1];
	array.pop();
}
function insert(array, index, value) {
	for (let i = array.length - 1; i >= index; i--) array[i + 1] = array[i];
	array[index] = value;
}
function findMinIndex(value, array) {
	let found = -1, foundPos = 1e9;
	for (let i = 0; i < array.length; i++) if ((array[i] - foundPos || value[i].endSide - value[found].endSide) < 0) {
		found = i;
		foundPos = array[i];
	}
	return found;
}
function countColumn(string, tabSize, to = string.length) {
	let n = 0;
	for (let i = 0; i < to && i < string.length;) if (string.charCodeAt(i) == 9) {
		n += tabSize - n % tabSize;
		i++;
	} else {
		n++;
		i = findClusterBreak(string, i);
	}
	return n;
}
function findColumn(string, col, tabSize, strict) {
	for (let i = 0, n = 0;;) {
		if (n >= col) return i;
		if (i == string.length) break;
		n += string.charCodeAt(i) == 9 ? tabSize - n % tabSize : 1;
		i = findClusterBreak(string, i);
	}
	return strict === true ? -1 : string.length;
}
// ../../node_modules/style-mod/src/style-mod.js
var C$1 = "ͼ";
var COUNT = typeof Symbol == "undefined" ? "__ͼ" : Symbol.for(C$1);
var SET = typeof Symbol == "undefined" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet");
var top = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : {};
var StyleModule = class {
	constructor(spec, options) {
		this.rules = [];
		let { finish } = options || {};
		function splitSelector(selector) {
			return /^@/.test(selector) ? [selector] : selector.split(/,\s*/);
		}
		function render(selectors, spec, target, isKeyframes) {
			let local = [], isAt = /^@(\w+)\b/.exec(selectors[0]), keyframes = isAt && isAt[1] == "keyframes";
			if (isAt && spec == null) return target.push(selectors[0] + ";");
			for (let prop in spec) {
				let value = spec[prop];
				if (/&/.test(prop)) render(prop.split(/,\s*/).map((part) => selectors.map((sel) => part.replace(/&/, sel))).reduce((a, b) => a.concat(b)), value, target);
				else if (value && typeof value == "object") {
					if (!isAt) throw new RangeError("The value of a property (" + prop + ") should be a primitive value.");
					render(splitSelector(prop), value, local, keyframes);
				} else if (value != null) local.push(prop.replace(/_.*/, "").replace(/[A-Z]/g, (l) => "-" + l.toLowerCase()) + ": " + value + ";");
			}
			if (local.length || keyframes) target.push((finish && !isAt && !isKeyframes ? selectors.map(finish) : selectors).join(", ") + " {" + local.join(" ") + "}");
		}
		for (let prop in spec) render(splitSelector(prop), spec[prop], this.rules);
	}
	getRules() {
		return this.rules.join("\n");
	}
	static newName() {
		let id = top[COUNT] || 1;
		top[COUNT] = id + 1;
		return C$1 + id.toString(36);
	}
	static mount(root, modules, options) {
		let set = root[SET], nonce = options && options.nonce;
		if (!set) set = new StyleSet(root, nonce);
		else if (nonce) set.setNonce(nonce);
		set.mount(Array.isArray(modules) ? modules : [modules], root);
	}
};
var adoptedSet = new Map();
var StyleSet = class {
	constructor(root, nonce) {
		let doc = root.ownerDocument || root, win = doc.defaultView;
		if (!root.head && root.adoptedStyleSheets && win.CSSStyleSheet) {
			let adopted = adoptedSet.get(doc);
			if (adopted) return root[SET] = adopted;
			this.sheet = new win.CSSStyleSheet();
			adoptedSet.set(doc, this);
		} else {
			this.styleTag = doc.createElement("style");
			if (nonce) this.styleTag.setAttribute("nonce", nonce);
		}
		this.modules = [];
		root[SET] = this;
	}
	mount(modules, root) {
		let sheet = this.sheet;
		let pos = 0, j = 0;
		for (let i = 0; i < modules.length; i++) {
			let mod = modules[i], index = this.modules.indexOf(mod);
			if (index < j && index > -1) {
				this.modules.splice(index, 1);
				j--;
				index = -1;
			}
			if (index == -1) {
				this.modules.splice(j++, 0, mod);
				if (sheet) for (let k = 0; k < mod.rules.length; k++) sheet.insertRule(mod.rules[k], pos++);
			} else {
				while (j < index) pos += this.modules[j++].rules.length;
				pos += mod.rules.length;
				j++;
			}
		}
		if (sheet) {
			if (root.adoptedStyleSheets.indexOf(this.sheet) < 0) root.adoptedStyleSheets = [this.sheet, ...root.adoptedStyleSheets];
		} else {
			let text = "";
			for (let i = 0; i < this.modules.length; i++) text += this.modules[i].getRules() + "\n";
			this.styleTag.textContent = text;
			let target = root.head || root;
			if (this.styleTag.parentNode != target) target.insertBefore(this.styleTag, target.firstChild);
		}
	}
	setNonce(nonce) {
		if (this.styleTag && this.styleTag.getAttribute("nonce") != nonce) this.styleTag.setAttribute("nonce", nonce);
	}
};
// ../../node_modules/w3c-keyname/index.js
var base = {
	8: "Backspace",
	9: "Tab",
	10: "Enter",
	12: "NumLock",
	13: "Enter",
	16: "Shift",
	17: "Control",
	18: "Alt",
	20: "CapsLock",
	27: "Escape",
	32: " ",
	33: "PageUp",
	34: "PageDown",
	35: "End",
	36: "Home",
	37: "ArrowLeft",
	38: "ArrowUp",
	39: "ArrowRight",
	40: "ArrowDown",
	44: "PrintScreen",
	45: "Insert",
	46: "Delete",
	59: ";",
	61: "=",
	91: "Meta",
	92: "Meta",
	106: "*",
	107: "+",
	108: ",",
	109: "-",
	110: ".",
	111: "/",
	144: "NumLock",
	145: "ScrollLock",
	160: "Shift",
	161: "Shift",
	162: "Control",
	163: "Control",
	164: "Alt",
	165: "Alt",
	173: "-",
	186: ";",
	187: "=",
	188: ",",
	189: "-",
	190: ".",
	191: "/",
	192: "`",
	219: "[",
	220: "\\",
	221: "]",
	222: "'"
};
var shift = {
	48: ")",
	49: "!",
	50: "@",
	51: "#",
	52: "$",
	53: "%",
	54: "^",
	55: "&",
	56: "*",
	57: "(",
	59: ":",
	61: "+",
	173: "_",
	186: ":",
	187: "+",
	188: "<",
	189: "_",
	190: ">",
	191: "?",
	192: "~",
	219: "{",
	220: "|",
	221: "}",
	222: "\""
};
var mac = typeof navigator != "undefined" && /Mac/.test(navigator.platform);
var ie$1 = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var i = 0; i < 10; i++) base[48 + i] = base[96 + i] = String(i);
for (var i = 1; i <= 24; i++) base[i + 111] = "F" + i;
for (var i = 65; i <= 90; i++) {
	base[i] = String.fromCharCode(i + 32);
	shift[i] = String.fromCharCode(i);
}
for (var code in base) if (!shift.hasOwnProperty(code)) shift[code] = base[code];
function keyName(event) {
	var name = !(mac && event.metaKey && event.shiftKey && !event.ctrlKey && !event.altKey || ie$1 && event.shiftKey && event.key && event.key.length == 1 || event.key == "Unidentified") && event.key || (event.shiftKey ? shift : base)[event.keyCode] || event.key || "Unidentified";
	if (name == "Esc") name = "Escape";
	if (name == "Del") name = "Delete";
	if (name == "Left") name = "ArrowLeft";
	if (name == "Up") name = "ArrowUp";
	if (name == "Right") name = "ArrowRight";
	if (name == "Down") name = "ArrowDown";
	return name;
}
// ../../node_modules/crelt/index.js
function crelt() {
	var elt = arguments[0];
	if (typeof elt == "string") elt = document.createElement(elt);
	var i = 1, next = arguments[1];
	if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
		for (var name in next) if (Object.prototype.hasOwnProperty.call(next, name)) {
			var value = next[name];
			if (typeof value == "string") elt.setAttribute(name, value);
			else if (value != null) elt[name] = value;
		}
		i++;
	}
	for (; i < arguments.length; i++) add(elt, arguments[i]);
	return elt;
}
function add(elt, child) {
	if (typeof child == "string") elt.appendChild(document.createTextNode(child));
	else if (child == null) {} else if (child.nodeType != null) elt.appendChild(child);
	else if (Array.isArray(child)) for (var i = 0; i < child.length; i++) add(elt, child[i]);
	else throw new RangeError("Unsupported child node: " + child);
}
// ../../node_modules/@codemirror/view/dist/index.js
var nav = typeof navigator != "undefined" ? navigator : {
	userAgent: "",
	vendor: "",
	platform: ""
};
var doc = typeof document != "undefined" ? document : { documentElement: { style: {} } };
var ie_edge = /Edge\/(\d+)/.exec(nav.userAgent);
var ie_upto10 = /MSIE \d/.test(nav.userAgent);
var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(nav.userAgent);
var ie = !!(ie_upto10 || ie_11up || ie_edge);
var gecko = !ie && /gecko\/(\d+)/i.test(nav.userAgent);
var chrome = !ie && /Chrome\/(\d+)/.exec(nav.userAgent);
var webkit = "webkitFontSmoothing" in doc.documentElement.style;
var safari = !ie && /Apple Computer/.test(nav.vendor);
var ios = safari && (/Mobile\/\w+/.test(nav.userAgent) || nav.maxTouchPoints > 2);
var browser = {
	mac: ios || /Mac/.test(nav.platform),
	windows: /Win/.test(nav.platform),
	linux: /Linux|X11/.test(nav.platform),
	ie,
	ie_version: ie_upto10 ? doc.documentMode || 6 : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : 0,
	gecko,
	gecko_version: gecko ? +(/Firefox\/(\d+)/.exec(nav.userAgent) || [0, 0])[1] : 0,
	chrome: !!chrome,
	chrome_version: chrome ? +chrome[1] : 0,
	ios,
	android: /Android\b/.test(nav.userAgent),
	webkit,
	webkit_version: webkit ? +(/\bAppleWebKit\/(\d+)/.exec(nav.userAgent) || [0, 0])[1] : 0,
	safari,
	safari_version: safari ? +(/\bVersion\/(\d+(\.\d+)?)/.exec(nav.userAgent) || [0, 0])[1] : 0,
	tabSize: doc.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
function combineAttrs(source, target) {
	for (let name in source) if (name == "class" && target.class) target.class += " " + source.class;
	else if (name == "style" && target.style) target.style += ";" + source.style;
	else target[name] = source[name];
	return target;
}
var noAttrs$1 = Object.create(null);
function attrsEq(a, b, ignore) {
	if (a == b) return true;
	if (!a) a = noAttrs$1;
	if (!b) b = noAttrs$1;
	let keysA = Object.keys(a), keysB = Object.keys(b);
	if (keysA.length - (ignore && keysA.indexOf(ignore) > -1 ? 1 : 0) != keysB.length - (ignore && keysB.indexOf(ignore) > -1 ? 1 : 0)) return false;
	for (let key of keysA) if (key != ignore && (keysB.indexOf(key) == -1 || a[key] !== b[key])) return false;
	return true;
}
function setAttrs(dom, attrs) {
	for (let i = dom.attributes.length - 1; i >= 0; i--) {
		let name = dom.attributes[i].name;
		if (attrs[name] == null) dom.removeAttribute(name);
	}
	for (let name in attrs) {
		let value = attrs[name];
		if (name == "style") dom.style.cssText = value;
		else if (dom.getAttribute(name) != value) dom.setAttribute(name, value);
	}
}
function updateAttrs(dom, prev, attrs) {
	let changed = false;
	if (prev) {
		for (let name in prev) if (!(attrs && name in attrs)) {
			changed = true;
			if (name == "style") dom.style.cssText = "";
			else dom.removeAttribute(name);
		}
	}
	if (attrs) {
		for (let name in attrs) if (!(prev && prev[name] == attrs[name])) {
			changed = true;
			if (name == "style") dom.style.cssText = attrs[name];
			else dom.setAttribute(name, attrs[name]);
		}
	}
	return changed;
}
function getAttrs(dom) {
	let attrs = Object.create(null);
	for (let i = 0; i < dom.attributes.length; i++) {
		let attr = dom.attributes[i];
		attrs[attr.name] = attr.value;
	}
	return attrs;
}
var WidgetType = class {
	eq(widget) {
		return false;
	}
	updateDOM(dom, view, from) {
		return false;
	}
	compare(other) {
		return this == other || this.constructor == other.constructor && this.eq(other);
	}
	get estimatedHeight() {
		return -1;
	}
	get lineBreaks() {
		return 0;
	}
	ignoreEvent(event) {
		return true;
	}
	coordsAt(dom, pos, side) {
		return null;
	}
	get isHidden() {
		return false;
	}
	get editable() {
		return false;
	}
	destroy(dom) {}
};
var BlockType = (function(BlockType) {
	BlockType[BlockType["Text"] = 0] = "Text";
	BlockType[BlockType["WidgetBefore"] = 1] = "WidgetBefore";
	BlockType[BlockType["WidgetAfter"] = 2] = "WidgetAfter";
	BlockType[BlockType["WidgetRange"] = 3] = "WidgetRange";
	return BlockType;
})(BlockType || (BlockType = {}));
var Decoration = class extends RangeValue {
	constructor(startSide, endSide, widget, spec) {
		super();
		this.startSide = startSide;
		this.endSide = endSide;
		this.widget = widget;
		this.spec = spec;
	}
	get heightRelevant() {
		return false;
	}
	static mark(spec) {
		return new MarkDecoration(spec);
	}
	static widget(spec) {
		let side = Math.max(-1e4, Math.min(1e4, spec.side || 0)), block = !!spec.block;
		side += block && !spec.inlineOrder ? side > 0 ? 3e8 : -4e8 : side > 0 ? 1e8 : -1e8;
		return new PointDecoration(spec, side, side, block, spec.widget || null, false);
	}
	static replace(spec) {
		let block = !!spec.block, startSide, endSide;
		if (spec.isBlockGap) {
			startSide = -5e8;
			endSide = 4e8;
		} else {
			let { start, end } = getInclusive(spec, block);
			startSide = (start ? block ? -3e8 : -1 : 5e8) - 1;
			endSide = (end ? block ? 2e8 : 1 : -6e8) + 1;
		}
		return new PointDecoration(spec, startSide, endSide, block, spec.widget || null, true);
	}
	static line(spec) {
		return new LineDecoration(spec);
	}
	static set(of, sort = false) {
		return RangeSet.of(of, sort);
	}
	hasHeight() {
		return this.widget ? this.widget.estimatedHeight > -1 : false;
	}
};
Decoration.none = RangeSet.empty;
var MarkDecoration = class MarkDecoration extends Decoration {
	constructor(spec) {
		let { start, end } = getInclusive(spec);
		super(start ? -1 : 5e8, end ? 1 : -6e8, null, spec);
		this.tagName = spec.tagName || "span";
		this.attrs = spec.class && spec.attributes ? combineAttrs(spec.attributes, { class: spec.class }) : spec.class ? { class: spec.class } : spec.attributes || noAttrs$1;
	}
	eq(other) {
		return this == other || other instanceof MarkDecoration && this.tagName == other.tagName && attrsEq(this.attrs, other.attrs);
	}
	range(from, to = from) {
		if (from >= to) throw new RangeError("Mark decorations may not be empty");
		return super.range(from, to);
	}
};
MarkDecoration.prototype.point = false;
var LineDecoration = class LineDecoration extends Decoration {
	constructor(spec) {
		super(-2e8, -2e8, null, spec);
	}
	eq(other) {
		return other instanceof LineDecoration && this.spec.class == other.spec.class && attrsEq(this.spec.attributes, other.spec.attributes);
	}
	range(from, to = from) {
		if (to != from) throw new RangeError("Line decoration ranges must be zero-length");
		return super.range(from, to);
	}
};
LineDecoration.prototype.mapMode = MapMode.TrackBefore;
LineDecoration.prototype.point = true;
var PointDecoration = class PointDecoration extends Decoration {
	constructor(spec, startSide, endSide, block, widget, isReplace) {
		super(startSide, endSide, widget, spec);
		this.block = block;
		this.isReplace = isReplace;
		this.mapMode = !block ? MapMode.TrackDel : startSide <= 0 ? MapMode.TrackBefore : MapMode.TrackAfter;
	}
	get type() {
		return this.startSide != this.endSide ? BlockType.WidgetRange : this.startSide <= 0 ? BlockType.WidgetBefore : BlockType.WidgetAfter;
	}
	get heightRelevant() {
		return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
	}
	eq(other) {
		return other instanceof PointDecoration && widgetsEq(this.widget, other.widget) && this.block == other.block && this.startSide == other.startSide && this.endSide == other.endSide;
	}
	range(from, to = from) {
		if (this.isReplace && (from > to || from == to && this.startSide > 0 && this.endSide <= 0)) throw new RangeError("Invalid range for replacement decoration");
		if (!this.isReplace && to != from) throw new RangeError("Widget decorations can only have zero-length ranges");
		return super.range(from, to);
	}
};
PointDecoration.prototype.point = true;
function getInclusive(spec, block = false) {
	let { inclusiveStart: start, inclusiveEnd: end } = spec;
	if (start == null) start = spec.inclusive;
	if (end == null) end = spec.inclusive;
	return {
		start: start !== null && start !== void 0 ? start : block,
		end: end !== null && end !== void 0 ? end : block
	};
}
function widgetsEq(a, b) {
	return a == b || !!(a && b && a.compare(b));
}
function addRange(from, to, ranges, margin = 0) {
	let last = ranges.length - 1;
	if (last >= 0 && ranges[last] + margin >= from) ranges[last] = Math.max(ranges[last], to);
	else ranges.push(from, to);
}
var BlockWrapper = class BlockWrapper extends RangeValue {
	constructor(tagName, attributes, rank) {
		super();
		this.tagName = tagName;
		this.attributes = attributes;
		this.rank = rank;
	}
	eq(other) {
		return other == this || other instanceof BlockWrapper && this.tagName == other.tagName && attrsEq(this.attributes, other.attributes);
	}
	static create(spec) {
		return new BlockWrapper(spec.tagName, spec.attributes || noAttrs$1, spec.rank == null ? 50 : Math.max(0, Math.min(spec.rank, 100)));
	}
	static set(of, sort = false) {
		return RangeSet.of(of, sort);
	}
};
BlockWrapper.prototype.startSide = BlockWrapper.prototype.endSide = -1;
function getSelection(root) {
	let target;
	if (root.nodeType == 11) target = root.getSelection ? root : root.ownerDocument;
	else target = root;
	return target.getSelection();
}
function contains(dom, node) {
	return node ? dom == node || dom.contains(node.nodeType != 1 ? node.parentNode : node) : false;
}
function hasSelection(dom, selection) {
	if (!selection.anchorNode) return false;
	try {
		return contains(dom, selection.anchorNode);
	} catch (_) {
		return false;
	}
}
function clientRectsFor(dom) {
	if (dom.nodeType == 3) return textRange(dom, 0, dom.nodeValue.length).getClientRects();
	else if (dom.nodeType == 1) return dom.getClientRects();
	else return [];
}
function isEquivalentPosition(node, off, targetNode, targetOff) {
	return targetNode ? scanFor(node, off, targetNode, targetOff, -1) || scanFor(node, off, targetNode, targetOff, 1) : false;
}
function domIndex(node) {
	for (var index = 0;; index++) {
		node = node.previousSibling;
		if (!node) return index;
	}
}
function isBlockElement(node) {
	return node.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(node.nodeName);
}
function scanFor(node, off, targetNode, targetOff, dir) {
	for (;;) {
		if (node == targetNode && off == targetOff) return true;
		if (off == (dir < 0 ? 0 : maxOffset(node))) {
			if (node.nodeName == "DIV") return false;
			let parent = node.parentNode;
			if (!parent || parent.nodeType != 1) return false;
			off = domIndex(node) + (dir < 0 ? 0 : 1);
			node = parent;
		} else if (node.nodeType == 1) {
			node = node.childNodes[off + (dir < 0 ? -1 : 0)];
			if (node.nodeType == 1 && node.contentEditable == "false") return false;
			off = dir < 0 ? maxOffset(node) : 0;
		} else return false;
	}
}
function maxOffset(node) {
	return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length;
}
function flattenRect(rect, toLeft) {
	let { left, right } = rect;
	if (left == right) return rect;
	let x = toLeft ? left : right;
	return {
		left: x,
		right: x,
		top: rect.top,
		bottom: rect.bottom
	};
}
function windowRect(win) {
	let vp = win.visualViewport;
	if (vp) return {
		left: 0,
		right: vp.width,
		top: 0,
		bottom: vp.height
	};
	return {
		left: 0,
		right: win.innerWidth,
		top: 0,
		bottom: win.innerHeight
	};
}
function getScale(elt, rect) {
	let scaleX = rect.width / elt.offsetWidth;
	let scaleY = rect.height / elt.offsetHeight;
	if (scaleX > .995 && scaleX < 1.005 || !isFinite(scaleX) || Math.abs(rect.width - elt.offsetWidth) < 1) scaleX = 1;
	if (scaleY > .995 && scaleY < 1.005 || !isFinite(scaleY) || Math.abs(rect.height - elt.offsetHeight) < 1) scaleY = 1;
	return {
		scaleX,
		scaleY
	};
}
function scrollRectIntoView(dom, rect, side, x, y, xMargin, yMargin, ltr) {
	let doc = dom.ownerDocument, win = doc.defaultView || window;
	for (let cur = dom, stop = false; cur && !stop;) if (cur.nodeType == 1) {
		let bounding, top = cur == doc.body;
		let scaleX = 1, scaleY = 1;
		if (top) bounding = windowRect(win);
		else {
			if (/^(fixed|sticky)$/.test(getComputedStyle(cur).position)) stop = true;
			if (cur.scrollHeight <= cur.clientHeight && cur.scrollWidth <= cur.clientWidth) {
				cur = cur.assignedSlot || cur.parentNode;
				continue;
			}
			let rect = cur.getBoundingClientRect();
			({scaleX, scaleY} = getScale(cur, rect));
			bounding = {
				left: rect.left,
				right: rect.left + cur.clientWidth * scaleX,
				top: rect.top,
				bottom: rect.top + cur.clientHeight * scaleY
			};
		}
		let moveX = 0, moveY = 0;
		if (y == "nearest") {
			if (rect.top < bounding.top + yMargin) {
				moveY = rect.top - (bounding.top + yMargin);
				if (side > 0 && rect.bottom > bounding.bottom + moveY) moveY = rect.bottom - bounding.bottom + yMargin;
			} else if (rect.bottom > bounding.bottom - yMargin) {
				moveY = rect.bottom - bounding.bottom + yMargin;
				if (side < 0 && rect.top - moveY < bounding.top) moveY = rect.top - (bounding.top + yMargin);
			}
		} else {
			let rectHeight = rect.bottom - rect.top, boundingHeight = bounding.bottom - bounding.top;
			moveY = (y == "center" && rectHeight <= boundingHeight ? rect.top + rectHeight / 2 - boundingHeight / 2 : y == "start" || y == "center" && side < 0 ? rect.top - yMargin : rect.bottom - boundingHeight + yMargin) - bounding.top;
		}
		if (x == "nearest") {
			if (rect.left < bounding.left + xMargin) {
				moveX = rect.left - (bounding.left + xMargin);
				if (side > 0 && rect.right > bounding.right + moveX) moveX = rect.right - bounding.right + xMargin;
			} else if (rect.right > bounding.right - xMargin) {
				moveX = rect.right - bounding.right + xMargin;
				if (side < 0 && rect.left < bounding.left + moveX) moveX = rect.left - (bounding.left + xMargin);
			}
		} else moveX = (x == "center" ? rect.left + (rect.right - rect.left) / 2 - (bounding.right - bounding.left) / 2 : x == "start" == ltr ? rect.left - xMargin : rect.right - (bounding.right - bounding.left) + xMargin) - bounding.left;
		if (moveX || moveY) {
			if (top) win.scrollBy(moveX, moveY);
			else {
				let movedX = 0, movedY = 0;
				if (moveY) {
					let start = cur.scrollTop;
					cur.scrollTop += moveY / scaleY;
					movedY = (cur.scrollTop - start) * scaleY;
				}
				if (moveX) {
					let start = cur.scrollLeft;
					cur.scrollLeft += moveX / scaleX;
					movedX = (cur.scrollLeft - start) * scaleX;
				}
				rect = {
					left: rect.left - movedX,
					top: rect.top - movedY,
					right: rect.right - movedX,
					bottom: rect.bottom - movedY
				};
				if (movedX && Math.abs(movedX - moveX) < 1) x = "nearest";
				if (movedY && Math.abs(movedY - moveY) < 1) y = "nearest";
			}
		}
		if (top) break;
		if (rect.top < bounding.top || rect.bottom > bounding.bottom || rect.left < bounding.left || rect.right > bounding.right) rect = {
			left: Math.max(rect.left, bounding.left),
			right: Math.min(rect.right, bounding.right),
			top: Math.max(rect.top, bounding.top),
			bottom: Math.min(rect.bottom, bounding.bottom)
		};
		cur = cur.assignedSlot || cur.parentNode;
	} else if (cur.nodeType == 11) cur = cur.host;
	else break;
}
function scrollableParents(dom, getX = true) {
	let doc = dom.ownerDocument, x = null, y = null;
	for (let cur = dom.parentNode; cur;) if (cur == doc.body || (!getX || x) && y) break;
	else if (cur.nodeType == 1) {
		if (!y && cur.scrollHeight > cur.clientHeight) y = cur;
		if (getX && !x && cur.scrollWidth > cur.clientWidth) x = cur;
		cur = cur.assignedSlot || cur.parentNode;
	} else if (cur.nodeType == 11) cur = cur.host;
	else break;
	return {
		x,
		y
	};
}
var DOMSelectionState = class {
	constructor() {
		this.anchorNode = null;
		this.anchorOffset = 0;
		this.focusNode = null;
		this.focusOffset = 0;
	}
	eq(domSel) {
		return this.anchorNode == domSel.anchorNode && this.anchorOffset == domSel.anchorOffset && this.focusNode == domSel.focusNode && this.focusOffset == domSel.focusOffset;
	}
	setRange(range) {
		let { anchorNode, focusNode } = range;
		this.set(anchorNode, Math.min(range.anchorOffset, anchorNode ? maxOffset(anchorNode) : 0), focusNode, Math.min(range.focusOffset, focusNode ? maxOffset(focusNode) : 0));
	}
	set(anchorNode, anchorOffset, focusNode, focusOffset) {
		this.anchorNode = anchorNode;
		this.anchorOffset = anchorOffset;
		this.focusNode = focusNode;
		this.focusOffset = focusOffset;
	}
};
function getScrollStack(target) {
	let stack = [];
	for (let cur = target; cur; cur = cur.nodeType == 11 ? cur.host : cur.parentNode) if (cur.nodeType == 1) stack.push({
		node: cur,
		left: cur.scrollLeft,
		top: cur.scrollTop
	});
	return stack;
}
function restoreScrollStack(stack, vert = true) {
	for (let { node, left, top } of stack) {
		if (vert && node.scrollTop != top) node.scrollTop = top;
		if (node.scrollLeft != left) node.scrollLeft = left;
	}
}
var preventScrollSupported = null;
if (browser.safari && browser.safari_version >= 26) preventScrollSupported = false;
function focusPreventScroll(dom) {
	if (dom.setActive) return dom.setActive();
	if (preventScrollSupported) return dom.focus(preventScrollSupported);
	let stack = getScrollStack(dom);
	dom.focus(preventScrollSupported == null ? { get preventScroll() {
		preventScrollSupported = { preventScroll: true };
		return true;
	} } : void 0);
	if (!preventScrollSupported) {
		preventScrollSupported = false;
		restoreScrollStack(stack);
	}
}
var scratchRange;
function textRange(node, from, to = from) {
	let range = scratchRange || (scratchRange = document.createRange());
	range.setEnd(node, to);
	range.setStart(node, from);
	return range;
}
function dispatchKey(elt, name, code, mods) {
	let options = {
		key: name,
		code: name,
		keyCode: code,
		which: code,
		cancelable: true
	};
	if (mods) ({altKey: options.altKey, ctrlKey: options.ctrlKey, shiftKey: options.shiftKey, metaKey: options.metaKey} = mods);
	let down = new KeyboardEvent("keydown", options);
	down.synthetic = true;
	elt.dispatchEvent(down);
	let up = new KeyboardEvent("keyup", options);
	up.synthetic = true;
	elt.dispatchEvent(up);
	return down.defaultPrevented || up.defaultPrevented;
}
function getRoot(node) {
	while (node) {
		if (node && (node.nodeType == 9 || node.nodeType == 11 && node.host)) return node;
		node = node.assignedSlot || node.parentNode;
	}
	return null;
}
function atElementStart(doc, selection) {
	let node = selection.focusNode, offset = selection.focusOffset;
	if (!node || selection.anchorNode != node || selection.anchorOffset != offset) return false;
	offset = Math.min(offset, maxOffset(node));
	for (;;) if (offset) {
		if (node.nodeType != 1) return false;
		let prev = node.childNodes[offset - 1];
		if (prev.contentEditable == "false") offset--;
		else {
			node = prev;
			offset = maxOffset(node);
		}
	} else if (node == doc) return true;
	else {
		offset = domIndex(node);
		node = node.parentNode;
	}
}
function isScrolledToBottom(elt) {
	if (elt instanceof Window) return elt.pageYOffset > Math.max(0, elt.document.documentElement.scrollHeight - elt.innerHeight - 4);
	return elt.scrollTop > Math.max(1, elt.scrollHeight - elt.clientHeight - 4);
}
function textNodeBefore(startNode, startOffset) {
	for (let node = startNode, offset = startOffset;;) if (node.nodeType == 3 && offset > 0) return {
		node,
		offset
	};
	else if (node.nodeType == 1 && offset > 0) {
		if (node.contentEditable == "false") return null;
		node = node.childNodes[offset - 1];
		offset = maxOffset(node);
	} else if (node.parentNode && !isBlockElement(node)) {
		offset = domIndex(node);
		node = node.parentNode;
	} else return null;
}
function textNodeAfter(startNode, startOffset) {
	for (let node = startNode, offset = startOffset;;) if (node.nodeType == 3 && offset < node.nodeValue.length) return {
		node,
		offset
	};
	else if (node.nodeType == 1 && offset < node.childNodes.length) {
		if (node.contentEditable == "false") return null;
		node = node.childNodes[offset];
		offset = 0;
	} else if (node.parentNode && !isBlockElement(node)) {
		offset = domIndex(node) + 1;
		node = node.parentNode;
	} else return null;
}
var DOMPos = class DOMPos {
	constructor(node, offset, precise = true) {
		this.node = node;
		this.offset = offset;
		this.precise = precise;
	}
	static before(dom, precise) {
		return new DOMPos(dom.parentNode, domIndex(dom), precise);
	}
	static after(dom, precise) {
		return new DOMPos(dom.parentNode, domIndex(dom) + 1, precise);
	}
};
var Direction = (function(Direction) {
	Direction[Direction["LTR"] = 0] = "LTR";
	Direction[Direction["RTL"] = 1] = "RTL";
	return Direction;
})(Direction || (Direction = {}));
var LTR = Direction.LTR;
var RTL = Direction.RTL;
function dec(str) {
	let result = [];
	for (let i = 0; i < str.length; i++) result.push(1 << +str[i]);
	return result;
}
var LowTypes = dec("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008");
var ArabicTypes = dec("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333");
var Brackets = Object.create(null);
var BracketStack = [];
for (let p of [
	"()",
	"[]",
	"{}"
]) {
	let l = p.charCodeAt(0), r = p.charCodeAt(1);
	Brackets[l] = r;
	Brackets[r] = -l;
}
function charType(ch) {
	return ch <= 247 ? LowTypes[ch] : 1424 <= ch && ch <= 1524 ? 2 : 1536 <= ch && ch <= 1785 ? ArabicTypes[ch - 1536] : 1774 <= ch && ch <= 2220 ? 4 : 8192 <= ch && ch <= 8204 ? 256 : 64336 <= ch && ch <= 65023 ? 4 : 1;
}
var BidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
var BidiSpan = class {
	get dir() {
		return this.level % 2 ? RTL : LTR;
	}
	constructor(from, to, level) {
		this.from = from;
		this.to = to;
		this.level = level;
	}
	side(end, dir) {
		return this.dir == dir == end ? this.to : this.from;
	}
	forward(forward, dir) {
		return forward == (this.dir == dir);
	}
	static find(order, index, level, assoc) {
		let maybe = -1;
		for (let i = 0; i < order.length; i++) {
			let span = order[i];
			if (span.from <= index && span.to >= index) {
				if (span.level == level) return i;
				if (maybe < 0 || (assoc != 0 ? assoc < 0 ? span.from < index : span.to > index : order[maybe].level > span.level)) maybe = i;
			}
		}
		if (maybe < 0) throw new RangeError("Index out of range");
		return maybe;
	}
};
function isolatesEq(a, b) {
	if (a.length != b.length) return false;
	for (let i = 0; i < a.length; i++) {
		let iA = a[i], iB = b[i];
		if (iA.from != iB.from || iA.to != iB.to || iA.direction != iB.direction || !isolatesEq(iA.inner, iB.inner)) return false;
	}
	return true;
}
var types = [];
function computeCharTypes(line, rFrom, rTo, isolates, outerType) {
	for (let iI = 0; iI <= isolates.length; iI++) {
		let from = iI ? isolates[iI - 1].to : rFrom, to = iI < isolates.length ? isolates[iI].from : rTo;
		let prevType = iI ? 256 : outerType;
		for (let i = from, prev = prevType, prevStrong = prevType; i < to; i++) {
			let type = charType(line.charCodeAt(i));
			if (type == 512) type = prev;
			else if (type == 8 && prevStrong == 4) type = 16;
			types[i] = type == 4 ? 2 : type;
			if (type & 7) prevStrong = type;
			prev = type;
		}
		for (let i = from, prev = prevType, prevStrong = prevType; i < to; i++) {
			let type = types[i];
			if (type == 128) {
				if (i < to - 1 && prev == types[i + 1] && prev & 24) type = types[i] = prev;
				else types[i] = 256;
			} else if (type == 64) {
				let end = i + 1;
				while (end < to && types[end] == 64) end++;
				let replace = i && prev == 8 || end < rTo && types[end] == 8 ? prevStrong == 1 ? 1 : 8 : 256;
				for (let j = i; j < end; j++) types[j] = replace;
				i = end - 1;
			} else if (type == 8 && prevStrong == 1) types[i] = 1;
			prev = type;
			if (type & 7) prevStrong = type;
		}
	}
}
function processBracketPairs(line, rFrom, rTo, isolates, outerType) {
	let oppositeType = outerType == 1 ? 2 : 1;
	for (let iI = 0, sI = 0, context = 0; iI <= isolates.length; iI++) {
		let from = iI ? isolates[iI - 1].to : rFrom, to = iI < isolates.length ? isolates[iI].from : rTo;
		for (let i = from, ch, br, type; i < to; i++) if (br = Brackets[ch = line.charCodeAt(i)]) {
			if (br < 0) {
				for (let sJ = sI - 3; sJ >= 0; sJ -= 3) if (BracketStack[sJ + 1] == -br) {
					let flags = BracketStack[sJ + 2];
					let type = flags & 2 ? outerType : !(flags & 4) ? 0 : flags & 1 ? oppositeType : outerType;
					if (type) types[i] = types[BracketStack[sJ]] = type;
					sI = sJ;
					break;
				}
			} else if (BracketStack.length == 189) break;
			else {
				BracketStack[sI++] = i;
				BracketStack[sI++] = ch;
				BracketStack[sI++] = context;
			}
		} else if ((type = types[i]) == 2 || type == 1) {
			let embed = type == outerType;
			context = embed ? 0 : 1;
			for (let sJ = sI - 3; sJ >= 0; sJ -= 3) {
				let cur = BracketStack[sJ + 2];
				if (cur & 2) break;
				if (embed) BracketStack[sJ + 2] |= 2;
				else {
					if (cur & 4) break;
					BracketStack[sJ + 2] |= 4;
				}
			}
		}
	}
}
function processNeutrals(rFrom, rTo, isolates, outerType) {
	for (let iI = 0, prev = outerType; iI <= isolates.length; iI++) {
		let from = iI ? isolates[iI - 1].to : rFrom, to = iI < isolates.length ? isolates[iI].from : rTo;
		for (let i = from; i < to;) {
			let type = types[i];
			if (type == 256) {
				let end = i + 1;
				for (;;) if (end == to) {
					if (iI == isolates.length) break;
					end = isolates[iI++].to;
					to = iI < isolates.length ? isolates[iI].from : rTo;
				} else if (types[end] == 256) end++;
				else break;
				let beforeL = prev == 1;
				let replace = beforeL == ((end < rTo ? types[end] : outerType) == 1) ? beforeL ? 1 : 2 : outerType;
				for (let j = end, jI = iI, fromJ = jI ? isolates[jI - 1].to : rFrom; j > i;) {
					if (j == fromJ) {
						j = isolates[--jI].from;
						fromJ = jI ? isolates[jI - 1].to : rFrom;
					}
					types[--j] = replace;
				}
				i = end;
			} else {
				prev = type;
				i++;
			}
		}
	}
}
function emitSpans(line, from, to, level, baseLevel, isolates, order) {
	let ourType = level % 2 ? 2 : 1;
	if (level % 2 == baseLevel % 2) for (let iCh = from, iI = 0; iCh < to;) {
		let sameDir = true, isNum = false;
		if (iI == isolates.length || iCh < isolates[iI].from) {
			let next = types[iCh];
			if (next != ourType) {
				sameDir = false;
				isNum = next == 16;
			}
		}
		let recurse = !sameDir && ourType == 1 ? [] : null;
		let localLevel = sameDir ? level : level + 1;
		let iScan = iCh;
		run: for (;;) if (iI < isolates.length && iScan == isolates[iI].from) {
			if (isNum) break run;
			let iso = isolates[iI];
			if (!sameDir) for (let upto = iso.to, jI = iI + 1;;) {
				if (upto == to) break run;
				if (jI < isolates.length && isolates[jI].from == upto) upto = isolates[jI++].to;
				else if (types[upto] == ourType) break run;
				else break;
			}
			iI++;
			if (recurse) recurse.push(iso);
			else {
				if (iso.from > iCh) order.push(new BidiSpan(iCh, iso.from, localLevel));
				computeSectionOrder(line, iso.direction == LTR != !(localLevel % 2) ? level + 1 : level, baseLevel, iso.inner, iso.from, iso.to, order);
				iCh = iso.to;
			}
			iScan = iso.to;
		} else if (iScan == to || (sameDir ? types[iScan] != ourType : types[iScan] == ourType)) break;
		else iScan++;
		if (recurse) emitSpans(line, iCh, iScan, level + 1, baseLevel, recurse, order);
		else if (iCh < iScan) order.push(new BidiSpan(iCh, iScan, localLevel));
		iCh = iScan;
	}
	else for (let iCh = to, iI = isolates.length; iCh > from;) {
		let sameDir = true, isNum = false;
		if (!iI || iCh > isolates[iI - 1].to) {
			let next = types[iCh - 1];
			if (next != ourType) {
				sameDir = false;
				isNum = next == 16;
			}
		}
		let recurse = !sameDir && ourType == 1 ? [] : null;
		let localLevel = sameDir ? level : level + 1;
		let iScan = iCh;
		run: for (;;) if (iI && iScan == isolates[iI - 1].to) {
			if (isNum) break run;
			let iso = isolates[--iI];
			if (!sameDir) for (let upto = iso.from, jI = iI;;) {
				if (upto == from) break run;
				if (jI && isolates[jI - 1].to == upto) upto = isolates[--jI].from;
				else if (types[upto - 1] == ourType) break run;
				else break;
			}
			if (recurse) recurse.push(iso);
			else {
				if (iso.to < iCh) order.push(new BidiSpan(iso.to, iCh, localLevel));
				computeSectionOrder(line, iso.direction == LTR != !(localLevel % 2) ? level + 1 : level, baseLevel, iso.inner, iso.from, iso.to, order);
				iCh = iso.from;
			}
			iScan = iso.from;
		} else if (iScan == from || (sameDir ? types[iScan - 1] != ourType : types[iScan - 1] == ourType)) break;
		else iScan--;
		if (recurse) emitSpans(line, iScan, iCh, level + 1, baseLevel, recurse, order);
		else if (iScan < iCh) order.push(new BidiSpan(iScan, iCh, localLevel));
		iCh = iScan;
	}
}
function computeSectionOrder(line, level, baseLevel, isolates, from, to, order) {
	let outerType = level % 2 ? 2 : 1;
	computeCharTypes(line, from, to, isolates, outerType);
	processBracketPairs(line, from, to, isolates, outerType);
	processNeutrals(from, to, isolates, outerType);
	emitSpans(line, from, to, level, baseLevel, isolates, order);
}
function computeOrder(line, direction, isolates) {
	if (!line) return [new BidiSpan(0, 0, direction == RTL ? 1 : 0)];
	if (direction == LTR && !isolates.length && !BidiRE.test(line)) return trivialOrder(line.length);
	if (isolates.length) while (line.length > types.length) types[types.length] = 256;
	let order = [], level = direction == LTR ? 0 : 1;
	computeSectionOrder(line, level, level, isolates, 0, line.length, order);
	return order;
}
function trivialOrder(length) {
	return [new BidiSpan(0, length, 0)];
}
var movedOver = "";
function moveVisually(line, order, dir, start, forward) {
	var _a;
	let startIndex = start.head - line.from;
	let spanI = BidiSpan.find(order, startIndex, (_a = start.bidiLevel) !== null && _a !== void 0 ? _a : -1, start.assoc);
	let span = order[spanI], spanEnd = span.side(forward, dir);
	if (startIndex == spanEnd) {
		let nextI = spanI += forward ? 1 : -1;
		if (nextI < 0 || nextI >= order.length) return null;
		span = order[spanI = nextI];
		startIndex = span.side(!forward, dir);
		spanEnd = span.side(forward, dir);
	}
	let nextIndex = findClusterBreak(line.text, startIndex, span.forward(forward, dir));
	if (nextIndex < span.from || nextIndex > span.to) nextIndex = spanEnd;
	movedOver = line.text.slice(Math.min(startIndex, nextIndex), Math.max(startIndex, nextIndex));
	let nextSpan = spanI == (forward ? order.length - 1 : 0) ? null : order[spanI + (forward ? 1 : -1)];
	if (nextSpan && nextIndex == spanEnd && nextSpan.level + (forward ? 0 : 1) < span.level) return EditorSelection.cursor(nextSpan.side(!forward, dir) + line.from, nextSpan.forward(forward, dir) ? 1 : -1, nextSpan.level);
	return EditorSelection.cursor(nextIndex + line.from, span.forward(forward, dir) ? -1 : 1, span.level);
}
function autoDirection(text, from, to) {
	for (let i = from; i < to; i++) {
		let type = charType(text.charCodeAt(i));
		if (type == 1) return LTR;
		if (type == 2 || type == 4) return RTL;
	}
	return LTR;
}
var clickAddsSelectionRange = Facet.define();
var dragMovesSelection$1 = Facet.define();
var mouseSelectionStyle = Facet.define();
var exceptionSink = Facet.define();
var updateListener = Facet.define();
var inputHandler$1 = Facet.define();
var focusChangeEffect = Facet.define();
var clipboardInputFilter = Facet.define();
var clipboardOutputFilter = Facet.define();
var perLineTextDirection = Facet.define({ combine: (values) => values.some((x) => x) });
var nativeSelectionHidden = Facet.define({ combine: (values) => values.some((x) => x) });
var scrollHandler = Facet.define();
var ScrollTarget = class ScrollTarget {
	constructor(range, y, x, yMargin, xMargin, isSnapshot = false) {
		this.range = range;
		this.y = y;
		this.x = x;
		this.yMargin = yMargin;
		this.xMargin = xMargin;
		this.isSnapshot = isSnapshot;
	}
	map(changes) {
		return changes.empty ? this : new ScrollTarget(this.range.map(changes), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
	}
	clip(state) {
		return this.range.to <= state.doc.length ? this : new ScrollTarget(EditorSelection.cursor(state.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
	}
};
var scrollIntoView$1 = StateEffect.define({ map: (t, ch) => t.map(ch) });
var setEditContextFormatting = StateEffect.define();
function logException(state, exception, context) {
	let handler = state.facet(exceptionSink);
	if (handler.length) handler[0](exception);
	else if (window.onerror && window.onerror(String(exception), context, void 0, void 0, exception));
	else if (context) console.error(context + ":", exception);
	else console.error(exception);
}
var editable = Facet.define({ combine: (values) => values.length ? values[0] : true });
var nextPluginID = 0;
var viewPlugin = Facet.define({ combine(plugins) {
	return plugins.filter((p, i) => {
		for (let j = 0; j < i; j++) if (plugins[j].plugin == p.plugin) return false;
		return true;
	});
} });
var ViewPlugin = class ViewPlugin {
	constructor(id, create, domEventHandlers, domEventObservers, buildExtensions) {
		this.id = id;
		this.create = create;
		this.domEventHandlers = domEventHandlers;
		this.domEventObservers = domEventObservers;
		this.baseExtensions = buildExtensions(this);
		this.extension = this.baseExtensions.concat(viewPlugin.of({
			plugin: this,
			arg: void 0
		}));
	}
	of(arg) {
		return this.baseExtensions.concat(viewPlugin.of({
			plugin: this,
			arg
		}));
	}
	static define(create, spec) {
		const { eventHandlers, eventObservers, provide, decorations: deco } = spec || {};
		return new ViewPlugin(nextPluginID++, create, eventHandlers, eventObservers, (plugin) => {
			let ext = [];
			if (deco) ext.push(decorations.of((view) => {
				let pluginInst = view.plugin(plugin);
				return pluginInst ? deco(pluginInst) : Decoration.none;
			}));
			if (provide) ext.push(provide(plugin));
			return ext;
		});
	}
	static fromClass(cls, spec) {
		return ViewPlugin.define((view, arg) => new cls(view, arg), spec);
	}
};
var PluginInstance = class {
	constructor(spec) {
		this.spec = spec;
		this.mustUpdate = null;
		this.value = null;
	}
	get plugin() {
		return this.spec && this.spec.plugin;
	}
	update(view) {
		if (!this.value) {
			if (this.spec) try {
				this.value = this.spec.plugin.create(view, this.spec.arg);
			} catch (e) {
				logException(view.state, e, "CodeMirror plugin crashed");
				this.deactivate();
			}
		} else if (this.mustUpdate) {
			let update = this.mustUpdate;
			this.mustUpdate = null;
			if (this.value.update) try {
				this.value.update(update);
			} catch (e) {
				logException(update.state, e, "CodeMirror plugin crashed");
				if (this.value.destroy) try {
					this.value.destroy();
				} catch (_) {}
				this.deactivate();
			}
		}
		return this;
	}
	destroy(view) {
		var _a;
		if ((_a = this.value) === null || _a === void 0 ? void 0 : _a.destroy) try {
			this.value.destroy();
		} catch (e) {
			logException(view.state, e, "CodeMirror plugin crashed");
		}
	}
	deactivate() {
		this.spec = this.value = null;
	}
};
var editorAttributes = Facet.define();
var contentAttributes = Facet.define();
var decorations = Facet.define();
var blockWrappers = Facet.define();
var outerDecorations = Facet.define();
var atomicRanges = Facet.define();
var bidiIsolatedRanges = Facet.define();
function getIsolatedRanges(view, line) {
	let isolates = view.state.facet(bidiIsolatedRanges);
	if (!isolates.length) return isolates;
	let sets = isolates.map((i) => i instanceof Function ? i(view) : i);
	let result = [];
	RangeSet.spans(sets, line.from, line.to, {
		point() {},
		span(fromDoc, toDoc, active, open) {
			let from = fromDoc - line.from, to = toDoc - line.from;
			let level = result;
			for (let i = active.length - 1; i >= 0; i--, open--) {
				let direction = active[i].spec.bidiIsolate, update;
				if (direction == null) direction = autoDirection(line.text, from, to);
				if (open > 0 && level.length && (update = level[level.length - 1]).to == from && update.direction == direction) {
					update.to = to;
					level = update.inner;
				} else {
					let add = {
						from,
						to,
						direction,
						inner: []
					};
					level.push(add);
					level = add.inner;
				}
			}
		}
	});
	return result;
}
var scrollMargins = Facet.define();
function getScrollMargins(view) {
	let left = 0, right = 0, top = 0, bottom = 0;
	for (let source of view.state.facet(scrollMargins)) {
		let m = source(view);
		if (m) {
			if (m.left != null) left = Math.max(left, m.left);
			if (m.right != null) right = Math.max(right, m.right);
			if (m.top != null) top = Math.max(top, m.top);
			if (m.bottom != null) bottom = Math.max(bottom, m.bottom);
		}
	}
	return {
		left,
		right,
		top,
		bottom
	};
}
var styleModule = Facet.define();
var ChangedRange = class ChangedRange {
	constructor(fromA, toA, fromB, toB) {
		this.fromA = fromA;
		this.toA = toA;
		this.fromB = fromB;
		this.toB = toB;
	}
	join(other) {
		return new ChangedRange(Math.min(this.fromA, other.fromA), Math.max(this.toA, other.toA), Math.min(this.fromB, other.fromB), Math.max(this.toB, other.toB));
	}
	addToSet(set) {
		let i = set.length, me = this;
		for (; i > 0; i--) {
			let range = set[i - 1];
			if (range.fromA > me.toA) continue;
			if (range.toA < me.fromA) break;
			me = me.join(range);
			set.splice(i - 1, 1);
		}
		set.splice(i, 0, me);
		return set;
	}
	static extendWithRanges(diff, ranges) {
		if (ranges.length == 0) return diff;
		let result = [];
		for (let dI = 0, rI = 0, off = 0;;) {
			let nextD = dI < diff.length ? diff[dI].fromB : 1e9;
			let nextR = rI < ranges.length ? ranges[rI] : 1e9;
			let fromB = Math.min(nextD, nextR);
			if (fromB == 1e9) break;
			let fromA = fromB + off, toB = fromB, toA = fromA;
			for (;;) if (rI < ranges.length && ranges[rI] <= toB) {
				let end = ranges[rI + 1];
				rI += 2;
				toB = Math.max(toB, end);
				for (let i = dI; i < diff.length && diff[i].fromB <= toB; i++) off = diff[i].toA - diff[i].toB;
				toA = Math.max(toA, end + off);
			} else if (dI < diff.length && diff[dI].fromB <= toB) {
				let next = diff[dI++];
				toB = Math.max(toB, next.toB);
				toA = Math.max(toA, next.toA);
				off = next.toA - next.toB;
			} else break;
			result.push(new ChangedRange(fromA, toA, fromB, toB));
		}
		return result;
	}
};
var ViewUpdate = class ViewUpdate {
	constructor(view, state, transactions) {
		this.view = view;
		this.state = state;
		this.transactions = transactions;
		this.flags = 0;
		this.startState = view.state;
		this.changes = ChangeSet.empty(this.startState.doc.length);
		for (let tr of transactions) this.changes = this.changes.compose(tr.changes);
		let changedRanges = [];
		this.changes.iterChangedRanges((fromA, toA, fromB, toB) => changedRanges.push(new ChangedRange(fromA, toA, fromB, toB)));
		this.changedRanges = changedRanges;
	}
	static create(view, state, transactions) {
		return new ViewUpdate(view, state, transactions);
	}
	get viewportChanged() {
		return (this.flags & 4) > 0;
	}
	get viewportMoved() {
		return (this.flags & 8) > 0;
	}
	get heightChanged() {
		return (this.flags & 2) > 0;
	}
	get geometryChanged() {
		return this.docChanged || (this.flags & 18) > 0;
	}
	get focusChanged() {
		return (this.flags & 1) > 0;
	}
	get docChanged() {
		return !this.changes.empty;
	}
	get selectionSet() {
		return this.transactions.some((tr) => tr.selection);
	}
	get empty() {
		return this.flags == 0 && this.transactions.length == 0;
	}
};
var noChildren = [];
var Tile = class {
	constructor(dom, length, flags = 0) {
		this.dom = dom;
		this.length = length;
		this.flags = flags;
		this.parent = null;
		dom.cmTile = this;
	}
	get breakAfter() {
		return this.flags & 1;
	}
	get children() {
		return noChildren;
	}
	isWidget() {
		return false;
	}
	get isHidden() {
		return false;
	}
	isComposite() {
		return false;
	}
	isLine() {
		return false;
	}
	isText() {
		return false;
	}
	isBlock() {
		return false;
	}
	get domAttrs() {
		return null;
	}
	sync(track) {
		this.flags |= 2;
		if (this.flags & 4) {
			this.flags &= -5;
			let attrs = this.domAttrs;
			if (attrs) setAttrs(this.dom, attrs);
		}
	}
	toString() {
		return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
	}
	destroy() {
		this.parent = null;
	}
	setDOM(dom) {
		this.dom = dom;
		dom.cmTile = this;
	}
	get posAtStart() {
		return this.parent ? this.parent.posBefore(this) : 0;
	}
	get posAtEnd() {
		return this.posAtStart + this.length;
	}
	posBefore(tile, start = this.posAtStart) {
		let pos = start;
		for (let child of this.children) {
			if (child == tile) return pos;
			pos += child.length + child.breakAfter;
		}
		throw new RangeError("Invalid child in posBefore");
	}
	posAfter(tile) {
		return this.posBefore(tile) + tile.length;
	}
	covers(side) {
		return true;
	}
	coordsIn(pos, side, rtl) {
		return null;
	}
	domPosFor(off, side) {
		let index = domIndex(this.dom);
		let after = this.length ? off > 0 : side > 0;
		return new DOMPos(this.parent.dom, index + (after ? 1 : 0), off == 0 || off == this.length);
	}
	markDirty(attrs) {
		this.flags &= -3;
		if (attrs) this.flags |= 4;
		if (this.parent && this.parent.flags & 2) this.parent.markDirty(false);
	}
	get overrideDOMText() {
		return null;
	}
	get root() {
		for (let t = this; t; t = t.parent) if (t instanceof DocTile) return t;
		return null;
	}
	static get(dom) {
		return dom.cmTile;
	}
};
var CompositeTile = class extends Tile {
	constructor(dom) {
		super(dom, 0);
		this._children = [];
	}
	isComposite() {
		return true;
	}
	get children() {
		return this._children;
	}
	get lastChild() {
		return this.children.length ? this.children[this.children.length - 1] : null;
	}
	append(child) {
		this.children.push(child);
		child.parent = this;
	}
	sync(track) {
		if (this.flags & 2) return;
		super.sync(track);
		let parent = this.dom, prev = null, next;
		let tracking = (track === null || track === void 0 ? void 0 : track.node) == parent ? track : null;
		let length = 0;
		for (let child of this.children) {
			child.sync(track);
			length += child.length + child.breakAfter;
			next = prev ? prev.nextSibling : parent.firstChild;
			if (tracking && next != child.dom) tracking.written = true;
			if (child.dom.parentNode == parent) while (next && next != child.dom) next = rm$1(next);
			else parent.insertBefore(child.dom, next);
			prev = child.dom;
		}
		next = prev ? prev.nextSibling : parent.firstChild;
		if (tracking && next) tracking.written = true;
		while (next) next = rm$1(next);
		this.length = length;
	}
};
function rm$1(dom) {
	let next = dom.nextSibling;
	dom.parentNode.removeChild(dom);
	return next;
}
var DocTile = class extends CompositeTile {
	constructor(view, dom) {
		super(dom);
		this.view = view;
	}
	owns(tile) {
		for (; tile; tile = tile.parent) if (tile == this) return true;
		return false;
	}
	isBlock() {
		return true;
	}
	nearest(dom) {
		for (;;) {
			if (!dom) return null;
			let tile = Tile.get(dom);
			if (tile && this.owns(tile)) return tile;
			dom = dom.parentNode;
		}
	}
	blockTiles(f) {
		for (let stack = [], cur = this, i = 0, pos = 0;;) if (i == cur.children.length) {
			if (!stack.length) return;
			cur = cur.parent;
			if (cur.breakAfter) pos++;
			i = stack.pop();
		} else {
			let next = cur.children[i++];
			if (next instanceof BlockWrapperTile) {
				stack.push(i);
				cur = next;
				i = 0;
			} else {
				let end = pos + next.length;
				let result = f(next, pos);
				if (result !== void 0) return result;
				pos = end + next.breakAfter;
			}
		}
	}
	resolveBlock(pos, side) {
		let before, beforeOff = -1, after, afterOff = -1;
		this.blockTiles((tile, off) => {
			let end = off + tile.length;
			if (pos >= off && pos <= end) {
				if (tile.isWidget() && side >= -1 && side <= 1) {
					if (tile.flags & 32) return true;
					if (tile.flags & 16) before = void 0;
				}
				if ((off < pos || pos == end && (side < -1 ? tile.length : tile.covers(1))) && (!before || !tile.isWidget() && before.isWidget())) {
					before = tile;
					beforeOff = pos - off;
				}
				if ((end > pos || pos == off && (side > 1 ? tile.length : tile.covers(-1))) && (!after || !tile.isWidget() && after.isWidget())) {
					after = tile;
					afterOff = pos - off;
				}
			}
		});
		if (!before && !after) throw new Error("No tile at position " + pos);
		return before && side < 0 || !after ? {
			tile: before,
			offset: beforeOff
		} : {
			tile: after,
			offset: afterOff
		};
	}
};
var BlockWrapperTile = class BlockWrapperTile extends CompositeTile {
	constructor(dom, wrapper) {
		super(dom);
		this.wrapper = wrapper;
	}
	isBlock() {
		return true;
	}
	covers(side) {
		if (!this.children.length) return false;
		return side < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1);
	}
	get domAttrs() {
		return this.wrapper.attributes;
	}
	static of(wrapper, dom) {
		let tile = new BlockWrapperTile(dom || document.createElement(wrapper.tagName), wrapper);
		if (!dom) tile.flags |= 4;
		return tile;
	}
};
var LineTile = class LineTile extends CompositeTile {
	constructor(dom, attrs) {
		super(dom);
		this.attrs = attrs;
	}
	isLine() {
		return true;
	}
	static start(attrs, dom, keepAttrs) {
		let line = new LineTile(dom || document.createElement("div"), attrs);
		if (!dom || !keepAttrs) line.flags |= 4;
		return line;
	}
	get domAttrs() {
		return this.attrs;
	}
	resolveInline(pos, side, forCoords) {
		let before = null, beforeOff = -1, after = null, afterOff = -1;
		function scan(tile, pos) {
			for (let i = 0, off = 0; i < tile.children.length && off <= pos; i++) {
				let child = tile.children[i], end = off + child.length;
				if (end >= pos) {
					if (child.isComposite()) scan(child, pos - off);
					else if ((!after || after.isHidden && (side > 0 && !(after.flags & 32) || forCoords && onSameLine(after, child))) && (end > pos || child.flags & 32 && side <= 1)) {
						after = child;
						afterOff = pos - off;
					} else if (off < pos || child.flags & 16 && !child.isHidden && side >= -1) {
						before = child;
						beforeOff = pos - off;
					}
				}
				off = end;
			}
		}
		scan(this, pos);
		let target = (side < 0 ? before : after) || before || after;
		return target ? {
			tile: target,
			offset: target == before ? beforeOff : afterOff
		} : null;
	}
	coordsIn(pos, side, rtl) {
		let found = this.resolveInline(pos, side, true);
		if (!found) return fallbackRect(this);
		return found.tile.coordsIn(Math.max(0, found.offset), side, rtl);
	}
	domIn(pos, side) {
		let found = this.resolveInline(pos, side);
		if (found) {
			let { tile, offset } = found;
			if (this.dom.contains(tile.dom)) {
				if (tile.isText()) return new DOMPos(tile.dom, Math.min(tile.dom.nodeValue.length, offset));
				return tile.domPosFor(offset, tile.flags & 16 ? 1 : tile.flags & 32 ? -1 : side);
			}
			let parent = found.tile.parent, saw = false;
			for (let ch of parent.children) {
				if (saw) return new DOMPos(ch.dom, 0);
				if (ch == found.tile) saw = true;
			}
		}
		return new DOMPos(this.dom, 0);
	}
};
function fallbackRect(tile) {
	let last = tile.dom.lastChild;
	if (!last) return tile.dom.getBoundingClientRect();
	let rects = clientRectsFor(last);
	return rects[rects.length - 1] || null;
}
function onSameLine(a, b) {
	let posA = a.coordsIn(0, 1), posB = b.coordsIn(0, 1);
	return posA && posB && posB.top < posA.bottom;
}
var MarkTile = class MarkTile extends CompositeTile {
	constructor(dom, mark) {
		super(dom);
		this.mark = mark;
	}
	get domAttrs() {
		return this.mark.attrs;
	}
	static of(mark, dom) {
		let tile = new MarkTile(dom || document.createElement(mark.tagName), mark);
		if (!dom) tile.flags |= 4;
		return tile;
	}
};
var TextTile = class TextTile extends Tile {
	constructor(dom, text) {
		super(dom, text.length);
		this.text = text;
	}
	sync(track) {
		if (this.flags & 2) return;
		super.sync(track);
		if (this.dom.nodeValue != this.text) {
			if (track && track.node == this.dom) track.written = true;
			this.dom.nodeValue = this.text;
		}
	}
	isText() {
		return true;
	}
	toString() {
		return JSON.stringify(this.text);
	}
	coordsIn(pos, side, rtl) {
		let length = this.dom.nodeValue.length;
		if (pos > length) pos = length;
		let from = pos, to = pos, flatten = 0;
		if (pos == 0 && side < 0 || pos == length && side >= 0) {
			if (!(browser.chrome || browser.gecko)) {
				if (pos) {
					from--;
					flatten = 1;
				} else if (to < length) {
					to++;
					flatten = -1;
				}
			}
		} else if (side < 0) from--;
		else if (to < length) to++;
		let rects = textRange(this.dom, from, to).getClientRects();
		if (!rects.length) return null;
		let rect = rects[(flatten ? flatten < 0 : side >= 0) ? 0 : rects.length - 1];
		if (browser.safari && !flatten && rect.width == 0) rect = Array.prototype.find.call(rects, (r) => r.width) || rect;
		return rtl == null ? rect : flattenRect(rect, (flatten ? flatten > 0 : side < 0) == rtl);
	}
	static of(text, dom) {
		let tile = new TextTile(dom || document.createTextNode(text), text);
		if (!dom) tile.flags |= 2;
		return tile;
	}
};
var WidgetTile = class WidgetTile extends Tile {
	constructor(dom, length, widget, flags) {
		super(dom, length, flags);
		this.widget = widget;
	}
	isWidget() {
		return true;
	}
	get isHidden() {
		return this.widget.isHidden;
	}
	covers(side) {
		if (this.flags & 48) return false;
		return (this.flags & (side < 0 ? 64 : 128)) > 0;
	}
	coordsIn(pos, side) {
		return this.coordsInWidget(pos, side, false);
	}
	coordsInWidget(pos, side, block) {
		let custom = this.widget.coordsAt(this.dom, pos, side);
		if (custom) return custom;
		if (block) return flattenRect(this.dom.getBoundingClientRect(), this.length ? pos == 0 : side <= 0);
		else {
			let rects = this.dom.getClientRects(), rect = null;
			if (!rects.length) return null;
			let fromBack = this.flags & 16 ? true : this.flags & 32 ? false : pos > 0;
			for (let i = fromBack ? rects.length - 1 : 0;; i += fromBack ? -1 : 1) {
				rect = rects[i];
				if (pos > 0 ? i == 0 : i == rects.length - 1 || rect.top < rect.bottom) break;
			}
			return flattenRect(rect, !fromBack);
		}
	}
	get overrideDOMText() {
		if (!this.length) return Text.empty;
		let { root } = this;
		if (!root) return Text.empty;
		let start = this.posAtStart;
		return root.view.state.doc.slice(start, start + this.length);
	}
	destroy() {
		super.destroy();
		this.widget.destroy(this.dom);
	}
	static of(widget, view, length, flags, dom) {
		if (!dom) {
			dom = widget.toDOM(view);
			if (!widget.editable) dom.contentEditable = "false";
		}
		return new WidgetTile(dom, length, widget, flags);
	}
};
var WidgetBufferTile = class extends Tile {
	constructor(flags) {
		let img = document.createElement("img");
		img.className = "cm-widgetBuffer";
		img.setAttribute("aria-hidden", "true");
		super(img, 0, flags);
	}
	get isHidden() {
		return true;
	}
	get overrideDOMText() {
		return Text.empty;
	}
	coordsIn(pos, side, rtl) {
		let rect = this.dom.getBoundingClientRect();
		return rtl == null ? rect : flattenRect(rect, side > 0 == rtl);
	}
};
var TilePointer = class {
	constructor(top) {
		this.index = 0;
		this.beforeBreak = false;
		this.parents = [];
		this.tile = top;
	}
	advance(dist, side, walker) {
		let { tile, index, beforeBreak, parents } = this;
		while (dist || side > 0) if (!tile.isComposite()) {
			let len = tile.length;
			if (index < len && dist) {
				let take = Math.min(dist, len - index);
				if (walker) walker.skip(tile, index, index + take);
				dist -= take;
				index += take;
			}
			if (index == len) {
				beforeBreak = !!tile.breakAfter;
				({tile, index} = parents.pop());
				index++;
			} else if (!dist) break;
		} else if (beforeBreak) {
			if (!dist) break;
			if (walker) walker.break();
			dist--;
			beforeBreak = false;
		} else if (index == tile.children.length) {
			if (!dist && !parents.length) break;
			if (walker) walker.leave(tile);
			beforeBreak = !!tile.breakAfter;
			({tile, index} = parents.pop());
			index++;
		} else {
			let next = tile.children[index], brk = next.breakAfter;
			if ((side > 0 ? next.length <= dist : next.length < dist) && (!walker || walker.skip(next, 0, next.length) !== false || !next.isComposite)) {
				beforeBreak = !!brk;
				index++;
				dist -= next.length;
			} else {
				parents.push({
					tile,
					index
				});
				tile = next;
				index = 0;
				if (walker && next.isComposite()) walker.enter(next);
			}
		}
		this.tile = tile;
		this.index = index;
		this.beforeBreak = beforeBreak;
		return this;
	}
	get root() {
		return this.parents.length ? this.parents[0].tile : this.tile;
	}
};
var OpenWrapper = class {
	constructor(from, to, wrapper, rank) {
		this.from = from;
		this.to = to;
		this.wrapper = wrapper;
		this.rank = rank;
	}
};
var TileBuilder = class {
	constructor(cache, root, blockWrappers) {
		this.cache = cache;
		this.root = root;
		this.blockWrappers = blockWrappers;
		this.curLine = null;
		this.lastBlock = null;
		this.afterWidget = null;
		this.pos = 0;
		this.wrappers = [];
		this.wrapperPos = 0;
	}
	addText(text, marks, openStart, tile) {
		var _a;
		this.flushBuffer();
		let parent = this.ensureMarks(marks, openStart);
		let prev = parent.lastChild;
		if (prev && prev.isText() && !(prev.flags & 8) && prev.length + text.length < 512) {
			this.cache.reused.set(prev, 2);
			let tile = parent.children[parent.children.length - 1] = new TextTile(prev.dom, prev.text + text);
			tile.parent = parent;
		} else parent.append(tile || TextTile.of(text, (_a = this.cache.find(TextTile)) === null || _a === void 0 ? void 0 : _a.dom));
		this.pos += text.length;
		this.afterWidget = null;
	}
	addComposition(composition, context) {
		let line = this.curLine;
		if (line.dom != context.line.dom) {
			line.setDOM(this.cache.reused.has(context.line) ? freeNode(context.line.dom) : context.line.dom);
			this.cache.reused.set(context.line, 2);
		}
		let head = line;
		for (let i = context.marks.length - 1; i >= 0; i--) {
			let mark = context.marks[i];
			let last = head.lastChild;
			if (last instanceof MarkTile && last.mark.eq(mark.mark)) {
				if (last.dom != mark.dom) last.setDOM(freeNode(mark.dom));
				head = last;
			} else {
				if (this.cache.reused.get(mark)) {
					let tile = Tile.get(mark.dom);
					if (tile) tile.setDOM(freeNode(mark.dom));
				}
				let nw = MarkTile.of(mark.mark, mark.dom);
				head.append(nw);
				head = nw;
			}
			this.cache.reused.set(mark, 2);
		}
		let oldTile = Tile.get(composition.text);
		if (oldTile) this.cache.reused.set(oldTile, 2);
		let text = new TextTile(composition.text, composition.text.nodeValue);
		text.flags |= 8;
		this.pos = composition.range.toB;
		head.append(text);
	}
	addInlineWidget(widget, marks, openStart) {
		let noSpace = this.afterWidget && widget.flags & 48 && (this.afterWidget.flags & 48) == (widget.flags & 48);
		if (!noSpace) this.flushBuffer();
		let parent = this.ensureMarks(marks, openStart);
		if (!noSpace && !(widget.flags & 16)) parent.append(this.getBuffer(1));
		parent.append(widget);
		this.pos += widget.length;
		this.afterWidget = widget;
	}
	addMark(tile, marks, openStart) {
		this.flushBuffer();
		this.ensureMarks(marks, openStart).append(tile);
		this.pos += tile.length;
		this.afterWidget = null;
	}
	addBlockWidget(widget) {
		this.getBlockPos().append(widget);
		this.pos += widget.length;
		this.lastBlock = widget;
		this.endLine();
	}
	continueWidget(length) {
		let widget = this.afterWidget || this.lastBlock;
		widget.length += length;
		this.pos += length;
	}
	addLineStart(attrs, dom) {
		var _a;
		if (!attrs) attrs = lineBaseAttrs;
		let tile = LineTile.start(attrs, dom || ((_a = this.cache.find(LineTile)) === null || _a === void 0 ? void 0 : _a.dom), !!dom);
		this.getBlockPos().append(this.lastBlock = this.curLine = tile);
	}
	addLine(tile) {
		this.getBlockPos().append(tile);
		this.pos += tile.length;
		this.lastBlock = tile;
		this.endLine();
	}
	addBreak() {
		this.lastBlock.flags |= 1;
		this.endLine();
		this.pos++;
	}
	addLineStartIfNotCovered(attrs) {
		if (!this.blockPosCovered()) this.addLineStart(attrs);
	}
	ensureLine(attrs) {
		if (!this.curLine) this.addLineStart(attrs);
	}
	ensureMarks(marks, openStart) {
		var _a;
		let parent = this.curLine;
		for (let i = marks.length - 1; i >= 0; i--) {
			let mark = marks[i], last;
			if (openStart > 0 && (last = parent.lastChild) && last instanceof MarkTile && last.mark.eq(mark)) {
				parent = last;
				openStart--;
			} else {
				let tile = MarkTile.of(mark, (_a = this.cache.find(MarkTile, (m) => m.mark.eq(mark))) === null || _a === void 0 ? void 0 : _a.dom);
				parent.append(tile);
				parent = tile;
				openStart = 0;
			}
		}
		return parent;
	}
	endLine() {
		if (this.curLine) {
			this.flushBuffer();
			let last = this.curLine.lastChild;
			if (!last || !hasContent(this.curLine, false) || last.dom.nodeName != "BR" && last.isWidget() && !(browser.ios && hasContent(this.curLine, true))) this.curLine.append(this.cache.findWidget(BreakWidget, 0, 32) || new WidgetTile(BreakWidget.toDOM(), 0, BreakWidget, 32));
			this.curLine = this.afterWidget = null;
		}
	}
	updateBlockWrappers() {
		if (this.wrapperPos > this.pos + 1e4) {
			this.blockWrappers.goto(this.pos);
			this.wrappers.length = 0;
		}
		for (let i = this.wrappers.length - 1; i >= 0; i--) if (this.wrappers[i].to < this.pos) this.wrappers.splice(i, 1);
		for (let cur = this.blockWrappers; cur.value && cur.from <= this.pos; cur.next()) if (cur.to >= this.pos) {
			let rank = cur.rank * 102 + cur.value.rank;
			let wrap = new OpenWrapper(cur.from, cur.to, cur.value, rank), i = this.wrappers.length;
			while (i > 0 && (this.wrappers[i - 1].rank - wrap.rank || this.wrappers[i - 1].to - wrap.to) < 0) i--;
			this.wrappers.splice(i, 0, wrap);
		}
		this.wrapperPos = this.pos;
	}
	getBlockPos() {
		var _a;
		this.updateBlockWrappers();
		let parent = this.root;
		for (let wrap of this.wrappers) {
			let last = parent.lastChild;
			if (wrap.from < this.pos && last instanceof BlockWrapperTile && last.wrapper.eq(wrap.wrapper)) parent = last;
			else {
				let tile = BlockWrapperTile.of(wrap.wrapper, (_a = this.cache.find(BlockWrapperTile, (t) => t.wrapper.eq(wrap.wrapper))) === null || _a === void 0 ? void 0 : _a.dom);
				parent.append(tile);
				parent = tile;
			}
		}
		return parent;
	}
	blockPosCovered() {
		let last = this.lastBlock;
		return last != null && !last.breakAfter && (!last.isWidget() || (last.flags & 160) > 0);
	}
	getBuffer(side) {
		let flags = 2 | (side < 0 ? 16 : 32);
		let found = this.cache.find(WidgetBufferTile, void 0, 1);
		if (found) found.flags = flags;
		return found || new WidgetBufferTile(flags);
	}
	flushBuffer() {
		if (this.afterWidget && !(this.afterWidget.flags & 32)) {
			this.afterWidget.parent.append(this.getBuffer(-1));
			this.afterWidget = null;
		}
	}
};
var TextStream = class {
	constructor(doc) {
		this.skipCount = 0;
		this.text = "";
		this.textOff = 0;
		this.cursor = doc.iter();
	}
	skip(len) {
		if (this.textOff + len <= this.text.length) this.textOff += len;
		else {
			this.skipCount += len - (this.text.length - this.textOff);
			this.text = "";
			this.textOff = 0;
		}
	}
	next(maxLen) {
		if (this.textOff == this.text.length) {
			let { value, lineBreak, done } = this.cursor.next(this.skipCount);
			this.skipCount = 0;
			if (done) throw new Error("Ran out of text content when drawing inline views");
			this.text = value;
			let len = this.textOff = Math.min(maxLen, value.length);
			return lineBreak ? null : value.slice(0, len);
		}
		let end = Math.min(this.text.length, this.textOff + maxLen);
		let chars = this.text.slice(this.textOff, end);
		this.textOff = end;
		return chars;
	}
};
var buckets = [
	WidgetTile,
	LineTile,
	TextTile,
	MarkTile,
	WidgetBufferTile,
	BlockWrapperTile,
	DocTile
];
for (let i = 0; i < buckets.length; i++) buckets[i].bucket = i;
var TileCache = class {
	constructor(view) {
		this.view = view;
		this.buckets = buckets.map(() => []);
		this.index = buckets.map(() => 0);
		this.reused = new Map();
	}
	add(tile) {
		let i = tile.constructor.bucket, bucket = this.buckets[i];
		if (bucket.length < 6) bucket.push(tile);
		else bucket[this.index[i] = (this.index[i] + 1) % 6] = tile;
	}
	find(cls, test, type = 2) {
		let i = cls.bucket;
		let bucket = this.buckets[i], off = this.index[i];
		for (let j = 0; j < bucket.length; j++) {
			let index = (j + off) % bucket.length, tile = bucket[index];
			if ((!test || test(tile)) && !this.reused.has(tile)) {
				bucket.splice(index, 1);
				if (index < off) this.index[i]--;
				this.reused.set(tile, type);
				return tile;
			}
		}
		return null;
	}
	findWidget(widget, length, flags) {
		let widgets = this.buckets[0];
		if (widgets.length) for (let i = 0, pass = 0;; i++) {
			if (i == widgets.length) {
				if (pass) return null;
				pass = 1;
				i = 0;
			}
			let tile = widgets[i];
			if (!this.reused.has(tile) && (pass == 0 ? tile.widget.compare(widget) : tile.widget.constructor == widget.constructor && widget.updateDOM(tile.dom, this.view, tile.widget))) {
				widgets.splice(i, 1);
				if (i < this.index[0]) this.index[0]--;
				if (tile.widget == widget && tile.length == length && (tile.flags & 497) == flags) {
					this.reused.set(tile, 1);
					return tile;
				} else {
					this.reused.set(tile, 2);
					return new WidgetTile(tile.dom, length, widget, tile.flags & -498 | flags);
				}
			}
		}
	}
	reuse(tile) {
		this.reused.set(tile, 1);
		return tile;
	}
	maybeReuse(tile, type = 2) {
		if (this.reused.has(tile)) return void 0;
		this.reused.set(tile, type);
		return tile.dom;
	}
	clear() {
		for (let i = 0; i < this.buckets.length; i++) this.buckets[i].length = this.index[i] = 0;
	}
};
var TileUpdate = class {
	constructor(view, old, blockWrappers, decorations, disallowBlockEffectsFor) {
		this.view = view;
		this.decorations = decorations;
		this.disallowBlockEffectsFor = disallowBlockEffectsFor;
		this.openWidget = false;
		this.openMarks = 0;
		this.cache = new TileCache(view);
		this.text = new TextStream(view.state.doc);
		this.builder = new TileBuilder(this.cache, new DocTile(view, view.contentDOM), RangeSet.iter(blockWrappers));
		this.cache.reused.set(old, 2);
		this.old = new TilePointer(old);
		this.reuseWalker = {
			skip: (tile, from, to) => {
				this.cache.add(tile);
				if (tile.isComposite()) return false;
			},
			enter: (tile) => this.cache.add(tile),
			leave: () => {},
			break: () => {}
		};
	}
	run(changes, composition) {
		let compositionContext = composition && this.getCompositionContext(composition.text);
		for (let posA = 0, posB = 0, i = 0;;) {
			let next = i < changes.length ? changes[i++] : null;
			let skipA = next ? next.fromA : this.old.root.length;
			if (skipA > posA) {
				let len = skipA - posA;
				this.preserve(len, !i, !next);
				posA = skipA;
				posB += len;
			}
			if (!next) break;
			if (composition && next.fromA <= composition.range.fromA && next.toA >= composition.range.toA) {
				this.forward(next.fromA, composition.range.fromA, composition.range.fromA < composition.range.toA ? 1 : -1);
				this.emit(posB, composition.range.fromB);
				this.builder.flushBuffer();
				this.cache.clear();
				this.builder.addComposition(composition, compositionContext);
				this.text.skip(composition.range.toB - composition.range.fromB);
				this.forward(composition.range.fromA, next.toA);
				this.emit(composition.range.toB, next.toB);
			} else {
				this.forward(next.fromA, next.toA);
				this.emit(posB, next.toB);
			}
			posB = next.toB;
			posA = next.toA;
		}
		if (this.builder.curLine) this.builder.endLine();
		return this.builder.root;
	}
	preserve(length, incStart, incEnd) {
		let activeMarks = getMarks(this.old), openMarks = this.openMarks;
		this.old.advance(length, incEnd ? 1 : -1, {
			skip: (tile, from, to) => {
				if (tile.isWidget()) {
					if (this.openWidget) this.builder.continueWidget(to - from);
					else {
						let widget = to > 0 || from < tile.length ? WidgetTile.of(tile.widget, this.view, to - from, tile.flags & 496, this.cache.maybeReuse(tile)) : this.cache.reuse(tile);
						if (widget.flags & 256) {
							widget.flags &= -2;
							this.builder.addBlockWidget(widget);
						} else {
							this.builder.ensureLine(null);
							this.builder.addInlineWidget(widget, activeMarks, openMarks);
							openMarks = activeMarks.length;
						}
					}
				} else if (tile.isText()) {
					this.builder.ensureLine(null);
					if (!from && to == tile.length && !this.cache.reused.has(tile)) this.builder.addText(tile.text, activeMarks, openMarks, this.cache.reuse(tile));
					else {
						this.cache.add(tile);
						this.builder.addText(tile.text.slice(from, to), activeMarks, openMarks);
					}
					openMarks = activeMarks.length;
				} else if (tile.isLine()) {
					tile.flags &= -2;
					this.cache.reused.set(tile, 1);
					this.builder.addLine(tile);
				} else if (tile instanceof WidgetBufferTile) this.cache.add(tile);
				else if (tile instanceof MarkTile) {
					this.builder.ensureLine(null);
					this.builder.addMark(tile, activeMarks, openMarks);
					this.cache.reused.set(tile, 1);
					openMarks = activeMarks.length;
				} else return false;
				this.openWidget = false;
			},
			enter: (tile) => {
				if (tile.isLine()) this.builder.addLineStart(tile.attrs, this.cache.maybeReuse(tile));
				else {
					this.cache.add(tile);
					if (tile instanceof MarkTile) activeMarks.unshift(tile.mark);
				}
				this.openWidget = false;
			},
			leave: (tile) => {
				if (tile.isLine()) {
					if (activeMarks.length) activeMarks.length = openMarks = 0;
				} else if (tile instanceof MarkTile) {
					activeMarks.shift();
					openMarks = Math.min(openMarks, activeMarks.length);
				}
			},
			break: () => {
				this.builder.addBreak();
				this.openWidget = false;
			}
		});
		this.text.skip(length);
	}
	emit(from, to) {
		let pendingLineAttrs = null;
		let b = this.builder, markCount = -1;
		let openEnd = RangeSet.spans(this.decorations, from, to, {
			point: (from, to, deco, active, openStart, index) => {
				if (deco instanceof PointDecoration) {
					if (this.disallowBlockEffectsFor[index]) {
						if (deco.block) throw new RangeError("Block decorations may not be specified via plugins");
						if (to > this.view.state.doc.lineAt(from).to) throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
					}
					markCount = active.length;
					if (openStart > active.length) b.continueWidget(to - from);
					else {
						let widget = deco.widget || (deco.block ? NullWidget.block : NullWidget.inline);
						let flags = widgetFlags(deco);
						let tile = this.cache.findWidget(widget, to - from, flags) || WidgetTile.of(widget, this.view, to - from, flags);
						if (deco.block) {
							if (deco.startSide > 0) b.addLineStartIfNotCovered(pendingLineAttrs);
							b.addBlockWidget(tile);
						} else {
							b.ensureLine(pendingLineAttrs);
							b.addInlineWidget(tile, active, openStart);
						}
					}
					pendingLineAttrs = null;
				} else pendingLineAttrs = addLineDeco(pendingLineAttrs, deco);
				if (to > from) this.text.skip(to - from);
			},
			span: (from, to, active, openStart) => {
				for (let pos = from; pos < to;) {
					let chars = this.text.next(Math.min(512, to - pos));
					if (chars == null) {
						b.addLineStartIfNotCovered(pendingLineAttrs);
						b.addBreak();
						pos++;
					} else {
						b.ensureLine(pendingLineAttrs);
						b.addText(chars, active, pos == from ? openStart : active.length);
						pos += chars.length;
					}
					pendingLineAttrs = null;
				}
				markCount = active.length;
			}
		});
		if (markCount > -1) this.openWidget = openEnd > markCount;
		if (!this.openWidget) b.addLineStartIfNotCovered(pendingLineAttrs);
		this.openMarks = openEnd;
	}
	forward(from, to, side = 1) {
		if (to - from <= 10) this.old.advance(to - from, side, this.reuseWalker);
		else {
			this.old.advance(5, -1, this.reuseWalker);
			this.old.advance(to - from - 10, -1);
			this.old.advance(5, side, this.reuseWalker);
		}
	}
	getCompositionContext(text) {
		let marks = [], line = null;
		for (let parent = text.parentNode;; parent = parent.parentNode) {
			let tile = Tile.get(parent);
			if (parent == this.view.contentDOM) break;
			if (tile instanceof MarkTile) marks.push(tile);
			else if (tile === null || tile === void 0 ? void 0 : tile.isLine()) line = tile;
			else if (tile instanceof BlockWrapperTile);
			else if (parent.nodeName == "DIV" && !line && parent != this.view.contentDOM) line = new LineTile(parent, lineBaseAttrs);
			else if (!line) marks.push(MarkTile.of(new MarkDecoration({
				tagName: parent.nodeName.toLowerCase(),
				attributes: getAttrs(parent)
			}), parent));
		}
		return {
			line,
			marks
		};
	}
};
function hasContent(tile, requireText) {
	let scan = (tile) => {
		for (let ch of tile.children) if ((requireText ? ch.isText() : ch.length) || scan(ch)) return true;
		return false;
	};
	return scan(tile);
}
function widgetFlags(deco) {
	let flags = deco.isReplace ? (deco.startSide < 0 ? 64 : 0) | (deco.endSide > 0 ? 128 : 0) : deco.startSide > 0 ? 32 : 16;
	if (deco.block) flags |= 256;
	return flags;
}
var lineBaseAttrs = { class: "cm-line" };
function addLineDeco(value, deco) {
	let attrs = deco.spec.attributes, cls = deco.spec.class;
	if (!attrs && !cls) return value;
	if (!value) value = { class: "cm-line" };
	if (attrs) combineAttrs(attrs, value);
	if (cls) value.class += " " + cls;
	return value;
}
function getMarks(ptr) {
	let found = [];
	for (let i = ptr.parents.length; i > 1; i--) {
		let tile = i == ptr.parents.length ? ptr.tile : ptr.parents[i].tile;
		if (tile instanceof MarkTile) found.push(tile.mark);
	}
	return found;
}
function freeNode(node) {
	let tile = Tile.get(node);
	if (tile) tile.setDOM(node.cloneNode());
	return node;
}
var NullWidget = class extends WidgetType {
	constructor(tag) {
		super();
		this.tag = tag;
	}
	eq(other) {
		return other.tag == this.tag;
	}
	toDOM() {
		return document.createElement(this.tag);
	}
	updateDOM(elt) {
		return elt.nodeName.toLowerCase() == this.tag;
	}
	get isHidden() {
		return true;
	}
};
NullWidget.inline = new NullWidget("span");
NullWidget.block = new NullWidget("div");
var BreakWidget = new class extends WidgetType {
	toDOM() {
		return document.createElement("br");
	}
	get isHidden() {
		return true;
	}
	get editable() {
		return true;
	}
}();
var DocView = class {
	constructor(view) {
		this.view = view;
		this.decorations = [];
		this.blockWrappers = [];
		this.dynamicDecorationMap = [false];
		this.domChanged = null;
		this.hasComposition = null;
		this.editContextFormatting = Decoration.none;
		this.lastCompositionAfterCursor = false;
		this.minWidth = 0;
		this.minWidthFrom = 0;
		this.minWidthTo = 0;
		this.impreciseAnchor = null;
		this.impreciseHead = null;
		this.forceSelection = false;
		this.lastUpdate = Date.now();
		this.updateDeco();
		this.tile = new DocTile(view, view.contentDOM);
		this.updateInner([new ChangedRange(0, 0, 0, view.state.doc.length)], null);
	}
	update(update) {
		var _a;
		let changedRanges = update.changedRanges;
		if (this.minWidth > 0 && changedRanges.length) {
			if (!changedRanges.every(({ fromA, toA }) => toA < this.minWidthFrom || fromA > this.minWidthTo)) this.minWidth = this.minWidthFrom = this.minWidthTo = 0;
			else {
				this.minWidthFrom = update.changes.mapPos(this.minWidthFrom, 1);
				this.minWidthTo = update.changes.mapPos(this.minWidthTo, 1);
			}
		}
		this.updateEditContextFormatting(update);
		let readCompositionAt = -1;
		if (this.view.inputState.composing >= 0 && !this.view.observer.editContext) {
			if ((_a = this.domChanged) === null || _a === void 0 ? void 0 : _a.newSel) readCompositionAt = this.domChanged.newSel.head;
			else if (!touchesComposition(update.changes, this.hasComposition) && !update.selectionSet) readCompositionAt = update.state.selection.main.head;
		}
		let composition = readCompositionAt > -1 ? findCompositionRange(this.view, update.changes, readCompositionAt) : null;
		this.domChanged = null;
		if (this.hasComposition) {
			let { from, to } = this.hasComposition;
			changedRanges = new ChangedRange(from, to, update.changes.mapPos(from, -1), update.changes.mapPos(to, 1)).addToSet(changedRanges.slice());
		}
		this.hasComposition = composition ? {
			from: composition.range.fromB,
			to: composition.range.toB
		} : null;
		if ((browser.ie || browser.chrome) && !composition && update && update.state.doc.lines != update.startState.doc.lines) this.forceSelection = true;
		let prevDeco = this.decorations, prevWrappers = this.blockWrappers;
		this.updateDeco();
		let decoDiff = findChangedDeco(prevDeco, this.decorations, update.changes);
		if (decoDiff.length) changedRanges = ChangedRange.extendWithRanges(changedRanges, decoDiff);
		let blockDiff = findChangedWrappers(prevWrappers, this.blockWrappers, update.changes);
		if (blockDiff.length) changedRanges = ChangedRange.extendWithRanges(changedRanges, blockDiff);
		if (composition && !changedRanges.some((r) => r.fromA <= composition.range.fromA && r.toA >= composition.range.toA)) changedRanges = composition.range.addToSet(changedRanges.slice());
		if (this.tile.flags & 2 && changedRanges.length == 0) return false;
		else {
			this.updateInner(changedRanges, composition);
			if (update.transactions.length) this.lastUpdate = Date.now();
			return true;
		}
	}
	updateInner(changes, composition) {
		this.view.viewState.mustMeasureContent = true;
		let { observer } = this.view;
		observer.ignore(() => {
			if (composition || changes.length) {
				let oldTile = this.tile;
				let builder = new TileUpdate(this.view, oldTile, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
				if (composition && Tile.get(composition.text)) builder.cache.reused.set(Tile.get(composition.text), 2);
				this.tile = builder.run(changes, composition);
				destroyDropped(oldTile, builder.cache.reused);
			}
			this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px";
			this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
			let track = browser.chrome || browser.ios ? {
				node: observer.selectionRange.focusNode,
				written: false
			} : void 0;
			this.tile.sync(track);
			if (track && (track.written || observer.selectionRange.focusNode != track.node || !this.tile.dom.contains(track.node))) this.forceSelection = true;
			this.tile.dom.style.height = "";
		});
		let gaps = [];
		if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length) {
			for (let child of this.tile.children) if (child.isWidget() && child.widget instanceof BlockGapWidget) gaps.push(child.dom);
		}
		observer.updateGaps(gaps);
	}
	updateEditContextFormatting(update) {
		this.editContextFormatting = this.editContextFormatting.map(update.changes);
		for (let tr of update.transactions) for (let effect of tr.effects) if (effect.is(setEditContextFormatting)) this.editContextFormatting = effect.value;
	}
	updateSelection(mustRead = false, fromPointer = false) {
		if (mustRead || !this.view.observer.selectionRange.focusNode) this.view.observer.readSelectionRange();
		let { dom } = this.tile;
		let activeElt = this.view.root.activeElement, focused = activeElt == dom;
		let selectionNotFocus = !focused && !(this.view.state.facet(editable) || dom.tabIndex > -1) && hasSelection(dom, this.view.observer.selectionRange) && !(activeElt && dom.contains(activeElt));
		if (!(focused || fromPointer || selectionNotFocus)) return;
		let force = this.forceSelection;
		this.forceSelection = false;
		let main = this.view.state.selection.main, anchor, head;
		if (main.empty) head = anchor = this.inlineDOMNearPos(main.anchor, main.assoc || 1);
		else {
			head = this.inlineDOMNearPos(main.head, main.head == main.from ? 1 : -1);
			anchor = this.inlineDOMNearPos(main.anchor, main.anchor == main.from ? 1 : -1);
		}
		if (browser.gecko && main.empty && !this.hasComposition && betweenUneditable(anchor)) {
			let dummy = document.createTextNode("");
			this.view.observer.ignore(() => anchor.node.insertBefore(dummy, anchor.node.childNodes[anchor.offset] || null));
			anchor = head = new DOMPos(dummy, 0);
			force = true;
		}
		let domSel = this.view.observer.selectionRange;
		if (force || !domSel.focusNode || (!isEquivalentPosition(anchor.node, anchor.offset, domSel.anchorNode, domSel.anchorOffset) || !isEquivalentPosition(head.node, head.offset, domSel.focusNode, domSel.focusOffset)) && !this.suppressWidgetCursorChange(domSel, main)) {
			this.view.observer.ignore(() => {
				if (browser.android && browser.chrome && dom.contains(domSel.focusNode) && inUneditable(domSel.focusNode, dom)) {
					dom.blur();
					dom.focus({ preventScroll: true });
				}
				let rawSel = getSelection(this.view.root);
				if (!rawSel);
				else if (main.empty) {
					if (browser.gecko) {
						let nextTo = nextToUneditable(anchor.node, anchor.offset);
						if (nextTo && nextTo != 3) {
							let text = (nextTo == 1 ? textNodeBefore : textNodeAfter)(anchor.node, anchor.offset);
							if (text) anchor = new DOMPos(text.node, text.offset);
						}
					}
					rawSel.collapse(anchor.node, anchor.offset);
					if (main.bidiLevel != null && rawSel.caretBidiLevel !== void 0) rawSel.caretBidiLevel = main.bidiLevel;
				} else if (rawSel.extend) {
					rawSel.collapse(anchor.node, anchor.offset);
					try {
						rawSel.extend(head.node, head.offset);
					} catch (_) {}
				} else {
					let range = document.createRange();
					if (main.anchor > main.head) [anchor, head] = [head, anchor];
					range.setEnd(head.node, head.offset);
					range.setStart(anchor.node, anchor.offset);
					rawSel.removeAllRanges();
					rawSel.addRange(range);
				}
				if (selectionNotFocus && this.view.root.activeElement == dom) {
					dom.blur();
					if (activeElt) activeElt.focus();
				}
			});
			this.view.observer.setSelectionRange(anchor, head);
		}
		this.impreciseAnchor = anchor.precise ? null : new DOMPos(domSel.anchorNode, domSel.anchorOffset);
		this.impreciseHead = head.precise ? null : new DOMPos(domSel.focusNode, domSel.focusOffset);
	}
	suppressWidgetCursorChange(sel, cursor) {
		return this.hasComposition && cursor.empty && isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset) && this.posFromDOM(sel.focusNode, sel.focusOffset) == cursor.head;
	}
	enforceCursorAssoc() {
		if (this.hasComposition) return;
		let { view } = this, cursor = view.state.selection.main;
		let sel = getSelection(view.root);
		let { anchorNode, anchorOffset } = view.observer.selectionRange;
		if (!sel || !cursor.empty || !cursor.assoc || !sel.modify) return;
		let line = this.lineAt(cursor.head, cursor.assoc);
		if (!line) return;
		let lineStart = line.posAtStart;
		if (cursor.head == lineStart || cursor.head == lineStart + line.length) return;
		let before = this.coordsAt(cursor.head, -1), after = this.coordsAt(cursor.head, 1);
		if (!before || !after || before.bottom > after.top) return;
		let dom = this.domAtPos(cursor.head + cursor.assoc, cursor.assoc);
		sel.collapse(dom.node, dom.offset);
		sel.modify("move", cursor.assoc < 0 ? "forward" : "backward", "lineboundary");
		view.observer.readSelectionRange();
		let newRange = view.observer.selectionRange;
		if (view.docView.posFromDOM(newRange.anchorNode, newRange.anchorOffset) != cursor.from) sel.collapse(anchorNode, anchorOffset);
	}
	posFromDOM(node, offset) {
		let tile = this.tile.nearest(node);
		if (!tile) return this.tile.dom.compareDocumentPosition(node) & 2 ? 0 : this.view.state.doc.length;
		let start = tile.posAtStart;
		if (tile.isComposite()) {
			let after;
			if (node == tile.dom) after = tile.dom.childNodes[offset];
			else {
				let bias = maxOffset(node) == 0 ? 0 : offset == 0 ? -1 : 1;
				for (;;) {
					let parent = node.parentNode;
					if (parent == tile.dom) break;
					if (bias == 0 && parent.firstChild != parent.lastChild) {
						if (node == parent.firstChild) bias = -1;
						else bias = 1;
					}
					node = parent;
				}
				if (bias < 0) after = node;
				else after = node.nextSibling;
			}
			if (after == tile.dom.firstChild) return start;
			while (after && !Tile.get(after)) after = after.nextSibling;
			if (!after) return start + tile.length;
			for (let i = 0, pos = start;; i++) {
				let child = tile.children[i];
				if (child.dom == after) return pos;
				pos += child.length + child.breakAfter;
			}
		} else if (tile.isText()) return node == tile.dom ? start + offset : start + (offset ? tile.length : 0);
		else return start;
	}
	domAtPos(pos, side) {
		let { tile, offset } = this.tile.resolveBlock(pos, side);
		if (tile.isWidget()) return tile.domPosFor(offset, side);
		return tile.domIn(offset, side);
	}
	inlineDOMNearPos(pos, side) {
		let before, beforeOff = -1, beforeBad = false;
		let after, afterOff = -1, afterBad = false;
		this.tile.blockTiles((tile, off) => {
			if (tile.isWidget()) {
				if (tile.flags & 32 && off >= pos) return true;
				if (tile.flags & 16) beforeBad = true;
			} else {
				let end = off + tile.length;
				if (off <= pos) {
					before = tile;
					beforeOff = pos - off;
					beforeBad = end < pos;
				}
				if (end >= pos && !after) {
					after = tile;
					afterOff = pos - off;
					afterBad = off > pos;
				}
				if (off > pos && after) return true;
			}
		});
		if (!before && !after) return this.domAtPos(pos, side);
		if (beforeBad && after) before = null;
		else if (afterBad && before) after = null;
		return before && side < 0 || !after ? before.domIn(beforeOff, side) : after.domIn(afterOff, side);
	}
	coordsAt(pos, side, rtl) {
		let { tile, offset } = this.tile.resolveBlock(pos, side);
		if (tile.isWidget()) {
			if (tile.widget instanceof BlockGapWidget) return null;
			return tile.coordsInWidget(offset, side, true);
		}
		return tile.coordsIn(offset, side, rtl);
	}
	lineAt(pos, side) {
		let { tile } = this.tile.resolveBlock(pos, side);
		return tile.isLine() ? tile : null;
	}
	coordsForChar(pos) {
		let { tile, offset } = this.tile.resolveBlock(pos, 1);
		if (!tile.isLine()) return null;
		function scan(tile, offset) {
			if (tile.isComposite()) for (let ch of tile.children) {
				if (ch.length >= offset) {
					let found = scan(ch, offset);
					if (found) return found;
				}
				offset -= ch.length;
				if (offset < 0) break;
			}
			else if (tile.isText() && offset < tile.length) {
				let end = findClusterBreak(tile.text, offset);
				if (end == offset) return null;
				let rects = textRange(tile.dom, offset, end).getClientRects();
				for (let i = 0; i < rects.length; i++) {
					let rect = rects[i];
					if (i == rects.length - 1 || rect.top < rect.bottom && rect.left < rect.right) return rect;
				}
			}
			return null;
		}
		return scan(tile, offset);
	}
	measureVisibleLineHeights(viewport) {
		let result = [], { from, to } = viewport;
		let contentWidth = this.view.contentDOM.clientWidth;
		let isWider = contentWidth > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1;
		let widest = -1, ltr = this.view.textDirection == Direction.LTR;
		let spaceAbove = 0;
		let scan = (tile, pos, measureBounds) => {
			for (let i = 0; i < tile.children.length; i++) {
				if (pos > to) break;
				let child = tile.children[i], end = pos + child.length;
				let childRect = child.dom.getBoundingClientRect(), { height } = childRect;
				if (measureBounds && !i) spaceAbove += childRect.top - measureBounds.top;
				if (child instanceof BlockWrapperTile) {
					if (end > from) scan(child, pos, childRect);
				} else if (pos >= from) {
					if (spaceAbove > 0) result.push(-spaceAbove);
					result.push(height + spaceAbove);
					spaceAbove = 0;
					if (isWider) {
						let last = child.dom.lastChild;
						let rects = last ? clientRectsFor(last) : [];
						if (rects.length) {
							let rect = rects[rects.length - 1];
							let width = ltr ? rect.right - childRect.left : childRect.right - rect.left;
							if (width > widest) {
								widest = width;
								this.minWidth = contentWidth;
								this.minWidthFrom = pos;
								this.minWidthTo = end;
							}
						}
					}
				}
				if (measureBounds && i == tile.children.length - 1) spaceAbove += measureBounds.bottom - childRect.bottom;
				pos = end + child.breakAfter;
			}
		};
		scan(this.tile, 0, null);
		return result;
	}
	textDirectionAt(pos) {
		let { tile } = this.tile.resolveBlock(pos, 1);
		return getComputedStyle(tile.dom).direction == "rtl" ? Direction.RTL : Direction.LTR;
	}
	measureTextSize() {
		let lineMeasure = this.tile.blockTiles((tile) => {
			if (tile.isLine() && tile.children.length && tile.length <= 20) {
				let totalWidth = 0, textHeight;
				for (let child of tile.children) {
					if (!child.isText() || /[^ -~]/.test(child.text)) return void 0;
					let rects = clientRectsFor(child.dom);
					if (rects.length != 1) return void 0;
					totalWidth += rects[0].width;
					textHeight = rects[0].height;
				}
				if (totalWidth) return {
					lineHeight: tile.dom.getBoundingClientRect().height,
					charWidth: totalWidth / tile.length,
					textHeight
				};
			}
		});
		if (lineMeasure) return lineMeasure;
		let dummy = document.createElement("div"), lineHeight, charWidth, textHeight;
		dummy.className = "cm-line";
		dummy.style.width = "99999px";
		dummy.style.position = "absolute";
		dummy.textContent = "abc def ghi jkl mno pqr stu";
		this.view.observer.ignore(() => {
			this.tile.dom.appendChild(dummy);
			let rect = clientRectsFor(dummy.firstChild)[0];
			lineHeight = dummy.getBoundingClientRect().height;
			charWidth = rect && rect.width ? rect.width / 27 : 7;
			textHeight = rect && rect.height ? rect.height : lineHeight;
			dummy.remove();
		});
		return {
			lineHeight,
			charWidth,
			textHeight
		};
	}
	computeBlockGapDeco() {
		let deco = [], vs = this.view.viewState;
		for (let pos = 0, i = 0;; i++) {
			let next = i == vs.viewports.length ? null : vs.viewports[i];
			let end = next ? next.from - 1 : this.view.state.doc.length;
			if (end > pos) {
				let height = (vs.lineBlockAt(end).bottom - vs.lineBlockAt(pos).top) / this.view.scaleY;
				deco.push(Decoration.replace({
					widget: new BlockGapWidget(height),
					block: true,
					inclusive: true,
					isBlockGap: true
				}).range(pos, end));
			}
			if (!next) break;
			pos = next.to + 1;
		}
		return Decoration.set(deco);
	}
	updateDeco() {
		let i = 1;
		let allDeco = this.view.state.facet(decorations).map((d) => {
			return (this.dynamicDecorationMap[i++] = typeof d == "function") ? d(this.view) : d;
		});
		let dynamicOuter = false, outerDeco = this.view.state.facet(outerDecorations).map((d, i) => {
			let dynamic = typeof d == "function";
			if (dynamic) dynamicOuter = true;
			return dynamic ? d(this.view) : d;
		});
		if (outerDeco.length) {
			this.dynamicDecorationMap[i++] = dynamicOuter;
			allDeco.push(RangeSet.join(outerDeco));
		}
		this.decorations = [
			this.editContextFormatting,
			...allDeco,
			this.computeBlockGapDeco(),
			this.view.viewState.lineGapDeco
		];
		while (i < this.decorations.length) this.dynamicDecorationMap[i++] = false;
		this.blockWrappers = this.view.state.facet(blockWrappers).map((v) => typeof v == "function" ? v(this.view) : v);
	}
	scrollIntoView(target) {
		if (target.isSnapshot) {
			let ref = this.view.viewState.lineBlockAt(target.range.head);
			this.view.scrollDOM.scrollTop = ref.top - target.yMargin;
			this.view.scrollDOM.scrollLeft = target.xMargin;
			return;
		}
		for (let handler of this.view.state.facet(scrollHandler)) try {
			if (handler(this.view, target.range, target)) return true;
		} catch (e) {
			logException(this.view.state, e, "scroll handler");
		}
		let { range } = target;
		let rect = this.coordsAt(range.head, range.assoc || (range.head > range.anchor ? -1 : 1)), other;
		if (!rect) return;
		if (!range.empty && (other = this.coordsAt(range.anchor, range.anchor > range.head ? -1 : 1))) rect = {
			left: Math.min(rect.left, other.left),
			top: Math.min(rect.top, other.top),
			right: Math.max(rect.right, other.right),
			bottom: Math.max(rect.bottom, other.bottom)
		};
		let margins = getScrollMargins(this.view);
		let targetRect = {
			left: rect.left - margins.left,
			top: rect.top - margins.top,
			right: rect.right + margins.right,
			bottom: rect.bottom + margins.bottom
		};
		let { offsetWidth, offsetHeight } = this.view.scrollDOM;
		scrollRectIntoView(this.view.scrollDOM, targetRect, range.head < range.anchor ? -1 : 1, target.x, target.y, Math.max(Math.min(target.xMargin, offsetWidth), -offsetWidth), Math.max(Math.min(target.yMargin, offsetHeight), -offsetHeight), this.view.textDirection == Direction.LTR);
		if (window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (rect.top > window.visualViewport.offsetTop + window.visualViewport.height || rect.bottom < window.visualViewport.offsetTop)) {
			let line = this.view.docView.lineAt(range.head, 1);
			if (line) {
				let stack = getScrollStack(line.dom);
				line.dom.scrollIntoView({ block: "nearest" });
				restoreScrollStack(stack, false);
			}
		}
	}
	lineHasWidget(pos) {
		let scan = (child) => child.isWidget() || child.children.some(scan);
		return scan(this.tile.resolveBlock(pos, 1).tile);
	}
	destroy() {
		destroyDropped(this.tile);
	}
};
function destroyDropped(tile, reused) {
	let r = reused === null || reused === void 0 ? void 0 : reused.get(tile);
	if (r != 1) {
		if (r == null) tile.destroy();
		for (let ch of tile.children) destroyDropped(ch, reused);
	}
}
function betweenUneditable(pos) {
	return pos.node.nodeType == 1 && pos.node.firstChild && (pos.offset == 0 || pos.node.childNodes[pos.offset - 1].contentEditable == "false") && (pos.offset == pos.node.childNodes.length || pos.node.childNodes[pos.offset].contentEditable == "false");
}
function findCompositionNode(view, headPos) {
	let sel = view.observer.selectionRange;
	if (!sel.focusNode) return null;
	let textBefore = textNodeBefore(sel.focusNode, sel.focusOffset);
	let textAfter = textNodeAfter(sel.focusNode, sel.focusOffset);
	let textNode = textBefore || textAfter;
	if (textAfter && textBefore && textAfter.node != textBefore.node) {
		let tileAfter = Tile.get(textAfter.node);
		if (!tileAfter || tileAfter.isText() && tileAfter.text != textAfter.node.nodeValue) textNode = textAfter;
		else if (view.docView.lastCompositionAfterCursor) {
			let tileBefore = Tile.get(textBefore.node);
			if (!(!tileBefore || tileBefore.isText() && tileBefore.text != textBefore.node.nodeValue)) textNode = textAfter;
		}
	}
	view.docView.lastCompositionAfterCursor = textNode != textBefore;
	if (!textNode) return null;
	let from = headPos - textNode.offset;
	return {
		from,
		to: from + textNode.node.nodeValue.length,
		node: textNode.node
	};
}
function findCompositionRange(view, changes, headPos) {
	let found = findCompositionNode(view, headPos);
	if (!found) return null;
	let { node: textNode, from, to } = found, text = textNode.nodeValue;
	if (/[\n\r]/.test(text)) return null;
	if (view.state.doc.sliceString(found.from, found.to) != text) return null;
	let inv = changes.invertedDesc;
	return {
		range: new ChangedRange(inv.mapPos(from), inv.mapPos(to), from, to),
		text: textNode
	};
}
function nextToUneditable(node, offset) {
	if (node.nodeType != 1) return 0;
	return (offset && node.childNodes[offset - 1].contentEditable == "false" ? 1 : 0) | (offset < node.childNodes.length && node.childNodes[offset].contentEditable == "false" ? 2 : 0);
}
var DecorationComparator$1 = class DecorationComparator {
	constructor() {
		this.changes = [];
	}
	compareRange(from, to) {
		addRange(from, to, this.changes);
	}
	comparePoint(from, to) {
		addRange(from, to, this.changes);
	}
	boundChange(pos) {
		addRange(pos, pos, this.changes);
	}
};
function findChangedDeco(a, b, diff) {
	let comp = new DecorationComparator$1();
	RangeSet.compare(a, b, diff, comp);
	return comp.changes;
}
var WrapperComparator = class {
	constructor() {
		this.changes = [];
	}
	compareRange(from, to) {
		addRange(from, to, this.changes);
	}
	comparePoint() {}
	boundChange(pos) {
		addRange(pos, pos, this.changes);
	}
};
function findChangedWrappers(a, b, diff) {
	let comp = new WrapperComparator();
	RangeSet.compare(a, b, diff, comp);
	return comp.changes;
}
function inUneditable(node, inside) {
	for (let cur = node; cur && cur != inside; cur = cur.assignedSlot || cur.parentNode) if (cur.nodeType == 1 && cur.contentEditable == "false") return true;
	return false;
}
function touchesComposition(changes, composition) {
	let touched = false;
	if (composition) changes.iterChangedRanges((from, to) => {
		if (from < composition.to && to > composition.from) touched = true;
	});
	return touched;
}
var BlockGapWidget = class extends WidgetType {
	constructor(height) {
		super();
		this.height = height;
	}
	toDOM() {
		let elt = document.createElement("div");
		elt.className = "cm-gap";
		this.updateDOM(elt);
		return elt;
	}
	eq(other) {
		return other.height == this.height;
	}
	updateDOM(elt) {
		elt.style.height = this.height + "px";
		return true;
	}
	get editable() {
		return true;
	}
	get estimatedHeight() {
		return this.height;
	}
	ignoreEvent() {
		return false;
	}
};
function groupAt(state, pos, bias = 1) {
	let categorize = state.charCategorizer(pos);
	let line = state.doc.lineAt(pos), linePos = pos - line.from;
	if (line.length == 0) return EditorSelection.cursor(pos);
	if (linePos == 0) bias = 1;
	else if (linePos == line.length) bias = -1;
	let from = linePos, to = linePos;
	if (bias < 0) from = findClusterBreak(line.text, linePos, false);
	else to = findClusterBreak(line.text, linePos);
	let cat = categorize(line.text.slice(from, to));
	while (from > 0) {
		let prev = findClusterBreak(line.text, from, false);
		if (categorize(line.text.slice(prev, from)) != cat) break;
		from = prev;
	}
	while (to < line.length) {
		let next = findClusterBreak(line.text, to);
		if (categorize(line.text.slice(to, next)) != cat) break;
		to = next;
	}
	return EditorSelection.undirectionalRange(from + line.from, to + line.from);
}
function posAtCoordsImprecise(view, contentRect, block, x, y) {
	let into = Math.round((x - contentRect.left) * view.defaultCharacterWidth);
	if (view.lineWrapping && block.height > view.defaultLineHeight * 1.5) {
		let textHeight = view.viewState.heightOracle.textHeight;
		let line = Math.floor((y - block.top - (view.defaultLineHeight - textHeight) * .5) / textHeight);
		into += line * view.viewState.heightOracle.lineLength;
	}
	let content = view.state.sliceDoc(block.from, block.to);
	return block.from + findColumn(content, into, view.state.tabSize);
}
function blockAt(view, pos, side) {
	let line = view.lineBlockAt(pos);
	if (Array.isArray(line.type)) {
		let best;
		for (let l of line.type) {
			if (l.from > pos) break;
			if (l.to < pos) continue;
			if (l.from < pos && l.to > pos) return l;
			if (!best || l.type == BlockType.Text && (best.type != l.type || (side < 0 ? l.from < pos : l.to > pos))) best = l;
		}
		return best || line;
	}
	return line;
}
function moveToLineBoundary(view, start, forward, includeWrap) {
	let line = blockAt(view, start.head, start.assoc || -1);
	let coords = !includeWrap || line.type != BlockType.Text || !(view.lineWrapping || line.widgetLineBreaks) ? null : view.coordsAtPos(start.assoc < 0 && start.head > line.from ? start.head - 1 : start.head);
	if (coords) {
		let editorRect = view.dom.getBoundingClientRect();
		let direction = view.textDirectionAt(line.from);
		let pos = view.posAtCoords({
			x: forward == (direction == Direction.LTR) ? editorRect.right - 1 : editorRect.left + 1,
			y: (coords.top + coords.bottom) / 2
		});
		if (pos != null) return EditorSelection.cursor(pos, forward ? -1 : 1);
	}
	return EditorSelection.cursor(forward ? line.to : line.from, forward ? -1 : 1);
}
function moveByChar(view, start, forward, by) {
	let line = view.state.doc.lineAt(start.head), spans = view.bidiSpans(line);
	let direction = view.textDirectionAt(line.from);
	for (let cur = start, check = null;;) {
		let next = moveVisually(line, spans, direction, cur, forward), char = movedOver;
		if (!next) {
			if (line.number == (forward ? view.state.doc.lines : 1)) return cur;
			char = "\n";
			line = view.state.doc.line(line.number + (forward ? 1 : -1));
			spans = view.bidiSpans(line);
			next = view.visualLineSide(line, !forward);
		}
		if (!check) {
			if (!by) return next;
			check = by(char);
		} else if (!check(char)) return cur;
		cur = next;
	}
}
function byGroup(view, pos, start) {
	let categorize = view.state.charCategorizer(pos);
	let cat = categorize(start);
	return (next) => {
		let nextCat = categorize(next);
		if (cat == CharCategory.Space) cat = nextCat;
		return cat == nextCat;
	};
}
function moveVertically(view, start, forward, distance) {
	let startPos = start.head, dir = forward ? 1 : -1;
	if (startPos == (forward ? view.state.doc.length : 0)) return EditorSelection.cursor(startPos, start.assoc);
	let goal = start.goalColumn, startY;
	let rect = view.contentDOM.getBoundingClientRect();
	let startCoords = view.coordsAtPos(startPos, start.assoc || ((start.empty ? forward : start.head == start.from) ? 1 : -1));
	let docTop = view.documentTop;
	if (startCoords) {
		if (goal == null) goal = startCoords.left - rect.left;
		startY = dir < 0 ? startCoords.top : startCoords.bottom;
	} else {
		let line = view.viewState.lineBlockAt(startPos);
		if (goal == null) goal = Math.min(rect.right - rect.left, view.defaultCharacterWidth * (startPos - line.from));
		startY = (dir < 0 ? line.top : line.bottom) + docTop;
	}
	let resolvedGoal = rect.left + goal;
	let halfText = view.viewState.heightOracle.textHeight >> 1, dist = distance !== null && distance !== void 0 ? distance : halfText;
	for (let scan = 0;; scan += halfText) {
		let y = startY + (dist + scan) * dir;
		let pos = posAtCoords(view, {
			x: resolvedGoal,
			y
		}, false, dir);
		if (forward ? y > rect.bottom : y < rect.top) return EditorSelection.cursor(pos.pos, pos.assoc);
		let posCoords = view.coordsAtPos(pos.pos, pos.assoc), mid = posCoords ? (posCoords.top + posCoords.bottom) / 2 : 0;
		if (!posCoords || (forward ? mid > startY : mid < startY)) return EditorSelection.cursor(pos.pos, pos.assoc, void 0, goal);
	}
}
function skipAtomicRanges(atoms, pos, bias) {
	for (;;) {
		let moved = 0;
		for (let set of atoms) set.between(pos - 1, pos + 1, (from, to, value) => {
			if (pos > from && pos < to) {
				let side = moved || bias || (pos - from < to - pos ? -1 : 1);
				pos = side < 0 ? from : to;
				moved = side;
			}
		});
		if (!moved) return pos;
	}
}
function skipAtomsForSelection(atoms, sel) {
	let ranges = null;
	for (let i = 0; i < sel.ranges.length; i++) {
		let range = sel.ranges[i], updated = null;
		if (range.empty) {
			let pos = skipAtomicRanges(atoms, range.from, 0);
			if (pos != range.from) updated = EditorSelection.cursor(pos, -1);
		} else {
			let from = skipAtomicRanges(atoms, range.from, -1);
			let to = skipAtomicRanges(atoms, range.to, 1);
			if (from != range.from || to != range.to) {
				if (range.undirectional) updated = EditorSelection.undirectionalRange(range.from, range.to);
				else updated = EditorSelection.range(range.from == range.anchor ? from : to, range.from == range.head ? from : to);
			}
		}
		if (updated) {
			if (!ranges) ranges = sel.ranges.slice();
			ranges[i] = updated;
		}
	}
	return ranges ? EditorSelection.create(ranges, sel.mainIndex) : sel;
}
function skipAtoms(view, oldPos, pos) {
	let newPos = skipAtomicRanges(view.state.facet(atomicRanges).map((f) => f(view)), pos.from, oldPos.head > pos.from ? -1 : 1);
	return newPos == pos.from ? pos : EditorSelection.cursor(newPos, newPos < pos.from ? 1 : -1);
}
var PosAssoc = class {
	constructor(pos, assoc) {
		this.pos = pos;
		this.assoc = assoc;
	}
};
function posAtCoords(view, coords, precise, scanY) {
	let content = view.contentDOM.getBoundingClientRect(), docTop = content.top + view.viewState.paddingTop;
	let { x, y } = coords, yOffset = y - docTop, block;
	for (;;) {
		if (yOffset < 0) return new PosAssoc(0, 1);
		if (yOffset > view.viewState.docHeight) return new PosAssoc(view.state.doc.length, -1);
		block = view.elementAtHeight(yOffset);
		if (scanY == null) break;
		if (block.type == BlockType.Text) {
			if (scanY < 0 ? block.to < view.viewport.from : block.from > view.viewport.to) break;
			let rect = view.docView.coordsAt(scanY < 0 ? block.from : block.to, scanY > 0 ? -1 : 1);
			if (rect && (scanY < 0 ? rect.top <= yOffset + docTop : rect.bottom >= yOffset + docTop)) break;
		}
		let halfLine = view.viewState.heightOracle.textHeight / 2;
		yOffset = scanY > 0 ? block.bottom + halfLine : block.top - halfLine;
	}
	if (view.viewport.from >= block.to || view.viewport.to <= block.from) {
		if (precise) return null;
		if (block.type == BlockType.Text) {
			let pos = posAtCoordsImprecise(view, content, block, x, y);
			return new PosAssoc(pos, pos == block.from ? 1 : -1);
		}
	}
	if (block.type != BlockType.Text) return yOffset < (block.top + block.bottom) / 2 ? new PosAssoc(block.from, 1) : new PosAssoc(block.to, -1);
	let line = view.docView.lineAt(block.from, 2);
	if (!line || line.length != block.length) line = view.docView.lineAt(block.from, -2);
	return new InlineCoordsScan(view, x, y, view.textDirectionAt(block.from)).scanTile(line, block.from);
}
var InlineCoordsScan = class {
	constructor(view, x, y, baseDir) {
		this.view = view;
		this.x = x;
		this.y = y;
		this.baseDir = baseDir;
		this.line = null;
		this.spans = null;
	}
	bidiSpansAt(pos) {
		if (!this.line || this.line.from > pos || this.line.to < pos) {
			this.line = this.view.state.doc.lineAt(pos);
			this.spans = this.view.bidiSpans(this.line);
		}
		return this;
	}
	baseDirAt(pos, side) {
		let { line, spans } = this.bidiSpansAt(pos);
		return spans[BidiSpan.find(spans, pos - line.from, -1, side)].level == this.baseDir;
	}
	dirAt(pos, side) {
		let { line, spans } = this.bidiSpansAt(pos);
		return spans[BidiSpan.find(spans, pos - line.from, -1, side)].dir;
	}
	bidiIn(from, to) {
		let { spans, line } = this.bidiSpansAt(from);
		return spans.length > 1 || spans.length && (spans[0].level != this.baseDir || spans[0].to + line.from < to);
	}
	scan(positions, getRects, recursed = false) {
		let lo = 0, hi = positions.length - 1, seen = new Set();
		let bidi = this.bidiIn(positions[0], positions[hi]);
		let above, below;
		let closestI = -1, closestDx = 1e9, closestRect;
		search: while (lo < hi) {
			let dist = hi - lo, mid = lo + hi >> 1;
			adjust: if (seen.has(mid)) {
				for (let i = 1; i < dist; i++) {
					let scan = mid + i;
					if (scan >= hi) scan -= dist;
					if (!seen.has(scan)) {
						mid = scan;
						break adjust;
					}
				}
				break search;
			}
			seen.add(mid);
			let rects = getRects(mid), side = 0;
			if (rects) for (let i = 0; i < rects.length; i++) {
				let rect = rects[i];
				if (rect.width == 0 && rects.length > 1) continue;
				if (rect.bottom < this.y) {
					if (!above || above.bottom < rect.bottom) above = rect;
					side = 1;
				} else if (rect.top > this.y) {
					if (!below || below.top > rect.top) below = rect;
					side = -1;
				} else {
					let off = rect.left > this.x ? this.x - rect.left : rect.right < this.x ? this.x - rect.right : 0;
					let dx = Math.abs(off);
					if (dx < closestDx) {
						closestI = mid;
						closestDx = dx;
						closestRect = rect;
					}
					if (off) side = off < 0 == (this.baseDir == Direction.LTR) ? -1 : 1;
				}
			}
			if (side == -1 && (!bidi || this.baseDirAt(positions[mid], 1))) hi = mid;
			else if (side == 1 && (!bidi || this.baseDirAt(positions[mid + 1], -1))) lo = mid + 1;
		}
		if (!closestRect) {
			if (!below && !above) return {
				i: positions[0],
				after: false
			};
			let side = above && (!below || this.y - above.bottom < below.top - this.y) ? above : below;
			this.y = (side.top + side.bottom) / 2;
			return this.scan(positions, getRects, true);
		}
		if (closestDx && !recursed) {
			let { top, bottom } = closestRect;
			if (above && above.bottom > (top + top + bottom) / 3) {
				this.y = above.bottom - 1;
				return this.scan(positions, getRects, true);
			}
			if (below && below.top < (top + bottom + bottom) / 3) {
				this.y = below.top + 1;
				return this.scan(positions, getRects, true);
			}
		}
		let ltr = (bidi ? this.dirAt(positions[closestI], 1) : this.baseDir) == Direction.LTR;
		return {
			i: closestI,
			after: this.x > (closestRect.left + closestRect.right) / 2 == ltr
		};
	}
	scanText(tile, offset) {
		let positions = [];
		for (let i = 0; i < tile.length; i = findClusterBreak(tile.text, i)) positions.push(offset + i);
		positions.push(offset + tile.length);
		let scan = this.scan(positions, (i) => {
			let off = positions[i] - offset, end = positions[i + 1] - offset;
			return textRange(tile.dom, off, end).getClientRects();
		});
		return scan.after ? new PosAssoc(positions[scan.i + 1], -1) : new PosAssoc(positions[scan.i], 1);
	}
	scanTile(tile, offset) {
		if (!tile.length) return new PosAssoc(offset, 1);
		if (tile.children.length == 1) {
			let child = tile.children[0];
			if (child.isText()) return this.scanText(child, offset);
			else if (child.isComposite()) return this.scanTile(child, offset);
		}
		let positions = [offset];
		for (let i = 0, pos = offset; i < tile.children.length; i++) positions.push(pos += tile.children[i].length);
		let scan = this.scan(positions, (i) => {
			let child = tile.children[i];
			if (child.flags & 48) return null;
			return (child.dom.nodeType == 1 ? child.dom : textRange(child.dom, 0, child.length)).getClientRects();
		});
		let child = tile.children[scan.i], pos = positions[scan.i];
		if (child.isText()) return this.scanText(child, pos);
		if (child.isComposite()) return this.scanTile(child, pos);
		return scan.after ? new PosAssoc(positions[scan.i + 1], -1) : new PosAssoc(pos, 1);
	}
};
var LineBreakPlaceholder = "￿";
var DOMReader = class {
	constructor(points, view) {
		this.points = points;
		this.view = view;
		this.text = "";
		this.lineSeparator = view.state.facet(EditorState.lineSeparator);
	}
	append(text) {
		this.text += text;
	}
	lineBreak() {
		this.text += LineBreakPlaceholder;
	}
	readRange(start, end) {
		if (!start) return this;
		let parent = start.parentNode;
		for (let cur = start;;) {
			this.findPointBefore(parent, cur);
			let oldLen = this.text.length;
			this.readNode(cur);
			let tile = Tile.get(cur), next = cur.nextSibling;
			if (next == end) {
				if ((tile === null || tile === void 0 ? void 0 : tile.breakAfter) && !next && parent != this.view.contentDOM) this.lineBreak();
				break;
			}
			let nextTile = Tile.get(next);
			if ((tile && nextTile ? tile.breakAfter : (tile ? tile.breakAfter : isBlockElement(cur)) || isBlockElement(next) && (cur.nodeName != "BR" || (tile === null || tile === void 0 ? void 0 : tile.isWidget())) && this.text.length > oldLen) && !isEmptyToEnd(next, end)) this.lineBreak();
			cur = next;
		}
		this.findPointBefore(parent, end);
		return this;
	}
	readTextNode(node) {
		let text = node.nodeValue;
		for (let point of this.points) if (point.node == node) point.pos = this.text.length + Math.min(point.offset, text.length);
		for (let off = 0, re = this.lineSeparator ? null : /\r\n?|\n/g;;) {
			let nextBreak = -1, breakSize = 1, m;
			if (this.lineSeparator) {
				nextBreak = text.indexOf(this.lineSeparator, off);
				breakSize = this.lineSeparator.length;
			} else if (m = re.exec(text)) {
				nextBreak = m.index;
				breakSize = m[0].length;
			}
			this.append(text.slice(off, nextBreak < 0 ? text.length : nextBreak));
			if (nextBreak < 0) break;
			this.lineBreak();
			if (breakSize > 1) {
				for (let point of this.points) if (point.node == node && point.pos > this.text.length) point.pos -= breakSize - 1;
			}
			off = nextBreak + breakSize;
		}
	}
	readNode(node) {
		let tile = Tile.get(node);
		let fromView = tile && tile.overrideDOMText;
		if (fromView != null) {
			this.findPointInside(node, fromView.length);
			for (let i = fromView.iter(); !i.next().done;) if (i.lineBreak) this.lineBreak();
			else this.append(i.value);
		} else if (node.nodeType == 3) this.readTextNode(node);
		else if (node.nodeName == "BR") {
			if (node.nextSibling) this.lineBreak();
		} else if (node.nodeType == 1) this.readRange(node.firstChild, null);
	}
	findPointBefore(node, next) {
		for (let point of this.points) if (point.node == node && node.childNodes[point.offset] == next) point.pos = this.text.length;
	}
	findPointInside(node, length) {
		for (let point of this.points) if (node.nodeType == 3 ? point.node == node : node.contains(point.node)) point.pos = this.text.length + (isAtEnd(node, point.node, point.offset) ? length : 0);
	}
};
function isAtEnd(parent, node, offset) {
	for (;;) {
		if (!node || offset < maxOffset(node)) return false;
		if (node == parent) return true;
		offset = domIndex(node) + 1;
		node = node.parentNode;
	}
}
function isEmptyToEnd(node, end) {
	let widgets;
	for (;; node = node.nextSibling) {
		if (node == end || !node) break;
		let view = Tile.get(node);
		if (!(view === null || view === void 0 ? void 0 : view.isWidget())) return false;
		if (view) (widgets || (widgets = [])).push(view);
	}
	if (widgets) for (let w of widgets) {
		let override = w.overrideDOMText;
		if (override === null || override === void 0 ? void 0 : override.length) return false;
	}
	return true;
}
var DOMPoint = class {
	constructor(node, offset) {
		this.node = node;
		this.offset = offset;
		this.pos = -1;
	}
};
var DOMChange = class {
	constructor(view, start, end, typeOver) {
		this.typeOver = typeOver;
		this.bounds = null;
		this.text = "";
		this.domChanged = start > -1;
		let { impreciseHead: iHead, impreciseAnchor: iAnchor } = view.docView, curSel = view.state.selection;
		if (view.state.readOnly && start > -1) this.newSel = null;
		else if (start > -1 && (this.bounds = domBoundsAround(view.docView.tile, start, end, 0))) {
			let selPoints = iHead || iAnchor ? [] : selectionPoints(view);
			let reader = new DOMReader(selPoints, view);
			reader.readRange(this.bounds.startDOM, this.bounds.endDOM);
			this.text = reader.text;
			this.newSel = selectionFromPoints(selPoints, this.bounds.from);
		} else {
			let domSel = view.observer.selectionRange;
			let head = iHead && iHead.node == domSel.focusNode && iHead.offset == domSel.focusOffset || !contains(view.contentDOM, domSel.focusNode) ? curSel.main.head : view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset);
			let anchor = iAnchor && iAnchor.node == domSel.anchorNode && iAnchor.offset == domSel.anchorOffset || !contains(view.contentDOM, domSel.anchorNode) ? curSel.main.anchor : view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset);
			let vp = view.viewport;
			if ((browser.ios || browser.chrome) && head != anchor && Math.min(head, anchor) <= curSel.main.from && Math.max(head, anchor) >= curSel.main.to && (vp.from > 0 || vp.to < view.state.doc.length)) {
				let from = Math.min(head, anchor), to = Math.max(head, anchor);
				let offFrom = vp.from - from, offTo = vp.to - to;
				if ((offFrom == 0 || offFrom == 1 || from == 0) && (offTo == 0 || offTo == -1 || to == view.state.doc.length)) {
					head = 0;
					anchor = view.state.doc.length;
				}
			}
			if (view.inputState.composing > -1 && curSel.ranges.length > 1) this.newSel = curSel.replaceRange(EditorSelection.range(anchor, head));
			else if (view.lineWrapping && anchor == head && !(curSel.main.empty && curSel.main.head == head) && view.inputState.lastTouchTime > Date.now() - 100) {
				let before = view.coordsAtPos(head, -1), assoc = 0;
				if (before) assoc = view.inputState.lastTouchY <= before.bottom ? -1 : 1;
				this.newSel = EditorSelection.create([EditorSelection.cursor(head, assoc)]);
			} else this.newSel = EditorSelection.single(anchor, head);
		}
	}
};
function domBoundsAround(tile, from, to, offset) {
	if (tile.isComposite()) {
		let fromI = -1, fromStart = -1, toI = -1, toEnd = -1;
		for (let i = 0, pos = offset, prevEnd = offset; i < tile.children.length; i++) {
			let child = tile.children[i], end = pos + child.length;
			if (pos < from && end > to) return domBoundsAround(child, from, to, pos);
			if (end >= from && fromI == -1) {
				fromI = i;
				fromStart = pos;
			}
			if (pos > to && child.dom.parentNode == tile.dom) {
				toI = i;
				toEnd = prevEnd;
				break;
			}
			prevEnd = end;
			pos = end + child.breakAfter;
		}
		return {
			from: fromStart,
			to: toEnd < 0 ? offset + tile.length : toEnd,
			startDOM: (fromI ? tile.children[fromI - 1].dom.nextSibling : null) || tile.dom.firstChild,
			endDOM: toI < tile.children.length && toI >= 0 ? tile.children[toI].dom : null
		};
	} else if (tile.isText()) return {
		from: offset,
		to: offset + tile.length,
		startDOM: tile.dom,
		endDOM: tile.dom.nextSibling
	};
	else return null;
}
function applyDOMChange(view, domChange) {
	let change;
	let { newSel } = domChange, { state } = view, sel = state.selection.main;
	let lastKey = view.inputState.lastKeyTime > Date.now() - 100 ? view.inputState.lastKeyCode : -1;
	if (domChange.bounds) {
		let { from, to } = domChange.bounds;
		let preferredPos = sel.from, preferredSide = null;
		if (lastKey === 8 || browser.android && domChange.text.length < to - from) {
			preferredPos = sel.to;
			preferredSide = "end";
		}
		let cmp = state.doc.sliceString(from, to, LineBreakPlaceholder), selEnd, diff;
		if (!sel.empty && sel.from >= from && sel.to <= to && (domChange.typeOver || cmp != domChange.text) && cmp.slice(0, sel.from - from) == domChange.text.slice(0, sel.from - from) && cmp.slice(sel.to - from) == domChange.text.slice(selEnd = domChange.text.length - (cmp.length - (sel.to - from)))) change = {
			from: sel.from,
			to: sel.to,
			insert: Text.of(domChange.text.slice(sel.from - from, selEnd).split(LineBreakPlaceholder))
		};
		else if (diff = findDiff(cmp, domChange.text, preferredPos - from, preferredSide)) {
			if (browser.chrome && lastKey == 13 && diff.toB == diff.from + 2 && domChange.text.slice(diff.from, diff.toB) == "￿￿") diff.toB--;
			change = {
				from: from + diff.from,
				to: from + diff.toA,
				insert: Text.of(domChange.text.slice(diff.from, diff.toB).split(LineBreakPlaceholder))
			};
		}
	} else if (newSel && (!view.hasFocus && state.facet(editable) || sameSelPos(newSel, sel))) newSel = null;
	if (!change && !newSel) return false;
	if ((browser.mac || browser.android) && change && change.from == change.to && change.from == sel.head - 1 && /^\. ?$/.test(change.insert.toString()) && view.contentDOM.getAttribute("autocorrect") == "off") {
		if (newSel && change.insert.length == 2) newSel = EditorSelection.single(newSel.main.anchor - 1, newSel.main.head - 1);
		change = {
			from: change.from,
			to: change.to,
			insert: Text.of([change.insert.toString().replace(".", " ")])
		};
	} else if (state.doc.lineAt(sel.from).to < sel.to && view.docView.lineHasWidget(sel.to) && view.inputState.insertingTextAt > Date.now() - 50) change = {
		from: sel.from,
		to: sel.to,
		insert: state.toText(view.inputState.insertingText)
	};
	else if (browser.chrome && change && change.from == change.to && change.from == sel.head && change.insert.toString() == "\n " && view.lineWrapping) {
		if (newSel) newSel = EditorSelection.single(newSel.main.anchor - 1, newSel.main.head - 1);
		change = {
			from: sel.from,
			to: sel.to,
			insert: Text.of([" "])
		};
	}
	if (change) return applyDOMChangeInner(view, change, newSel, lastKey);
	else if (newSel && !sameSelPos(newSel, sel)) {
		let scrollIntoView = false, userEvent = "select";
		if (view.inputState.lastSelectionTime > Date.now() - 50) {
			if (view.inputState.lastSelectionOrigin == "select") scrollIntoView = true;
			userEvent = view.inputState.lastSelectionOrigin;
			if (userEvent == "select.pointer") newSel = skipAtomsForSelection(state.facet(atomicRanges).map((f) => f(view)), newSel);
		}
		view.dispatch({
			selection: newSel,
			scrollIntoView,
			userEvent
		});
		return true;
	} else return false;
}
function applyDOMChangeInner(view, change, newSel, lastKey = -1) {
	if (browser.ios && view.inputState.flushIOSKey(change)) return true;
	let sel = view.state.selection.main;
	if (browser.android && (change.to == sel.to && (change.from == sel.from || change.from == sel.from - 1 && view.state.sliceDoc(change.from, sel.from) == " ") && change.insert.length == 1 && change.insert.lines == 2 && dispatchKey(view.contentDOM, "Enter", 13) || (change.from == sel.from - 1 && change.to == sel.to && change.insert.length == 0 || lastKey == 8 && change.insert.length < change.to - change.from && change.to > sel.head) && dispatchKey(view.contentDOM, "Backspace", 8) || change.from == sel.from && change.to == sel.to + 1 && change.insert.length == 0 && dispatchKey(view.contentDOM, "Delete", 46))) return true;
	let text = change.insert.toString();
	if (view.inputState.composing >= 0) view.inputState.composing++;
	let defaultTr;
	let defaultInsert = () => defaultTr || (defaultTr = applyDefaultInsert(view, change, newSel));
	if (!view.state.facet(inputHandler$1).some((h) => h(view, change.from, change.to, text, defaultInsert))) view.dispatch(defaultInsert());
	return true;
}
function applyDefaultInsert(view, change, newSel) {
	let tr, startState = view.state, sel = startState.selection.main, inAtomic = -1;
	if (change.from == change.to && change.from < sel.from || change.from > sel.to) {
		let side = change.from < sel.from ? -1 : 1, pos = side < 0 ? sel.from : sel.to;
		let moved = skipAtomicRanges(startState.facet(atomicRanges).map((f) => f(view)), pos, side);
		if (change.from == moved) inAtomic = moved;
	}
	if (inAtomic > -1) tr = {
		changes: change,
		selection: EditorSelection.cursor(change.from + change.insert.length, -1)
	};
	else if (change.from >= sel.from && change.to <= sel.to && change.to - change.from >= (sel.to - sel.from) / 3 && (!newSel || newSel.main.empty && newSel.main.from == change.from + change.insert.length) && view.inputState.composing < 0) {
		let before = sel.from < change.from ? startState.sliceDoc(sel.from, change.from) : "";
		let after = sel.to > change.to ? startState.sliceDoc(change.to, sel.to) : "";
		tr = startState.replaceSelection(view.state.toText(before + change.insert.sliceString(0, void 0, view.state.lineBreak) + after));
	} else {
		let changes = startState.changes(change);
		let mainSel = newSel && newSel.main.to <= changes.newLength ? newSel.main : void 0;
		if (startState.selection.ranges.length > 1 && (view.inputState.composing >= 0 || view.inputState.compositionPendingChange) && change.to <= sel.to + 10 && change.to >= sel.to - 10) {
			let replaced = view.state.sliceDoc(change.from, change.to);
			let compositionRange, composition = newSel && findCompositionNode(view, newSel.main.head);
			if (composition) {
				let dLen = change.insert.length - (change.to - change.from);
				compositionRange = {
					from: composition.from,
					to: composition.to - dLen
				};
			} else compositionRange = view.state.doc.lineAt(sel.head);
			let offset = sel.to - change.to;
			tr = startState.changeByRange((range) => {
				if (range.from == sel.from && range.to == sel.to) return {
					changes,
					range: mainSel || range.map(changes)
				};
				let to = range.to - offset, from = to - replaced.length;
				if (view.state.sliceDoc(from, to) != replaced || to >= compositionRange.from && from <= compositionRange.to) return { range };
				let rangeChanges = startState.changes({
					from,
					to,
					insert: change.insert
				}), selOff = range.to - sel.to;
				return {
					changes: rangeChanges,
					range: !mainSel ? range.map(rangeChanges) : EditorSelection.range(Math.max(0, mainSel.anchor + selOff), Math.max(0, mainSel.head + selOff))
				};
			});
		} else tr = {
			changes,
			selection: mainSel && startState.selection.replaceRange(mainSel)
		};
	}
	let userEvent = "input.type";
	if (view.composing || view.inputState.compositionPendingChange && view.inputState.compositionEndedAt > Date.now() - 50) {
		view.inputState.compositionPendingChange = false;
		userEvent += ".compose";
		if (view.inputState.compositionFirstChange) {
			userEvent += ".start";
			view.inputState.compositionFirstChange = false;
		}
	}
	return startState.update(tr, {
		userEvent,
		scrollIntoView: true
	});
}
function findDiff(a, b, preferredPos, preferredSide) {
	let minLen = Math.min(a.length, b.length);
	let from = 0;
	while (from < minLen && a.charCodeAt(from) == b.charCodeAt(from)) from++;
	if (from == minLen && a.length == b.length) return null;
	let toA = a.length, toB = b.length;
	while (toA > 0 && toB > 0 && a.charCodeAt(toA - 1) == b.charCodeAt(toB - 1)) {
		toA--;
		toB--;
	}
	if (preferredSide == "end") {
		let adjust = Math.max(0, from - Math.min(toA, toB));
		preferredPos -= toA + adjust - from;
	}
	if (toA < from && a.length < b.length) {
		let move = preferredPos <= from && preferredPos >= toA ? from - preferredPos : 0;
		from -= move;
		toB = from + (toB - toA);
		toA = from;
	} else if (toB < from) {
		let move = preferredPos <= from && preferredPos >= toB ? from - preferredPos : 0;
		from -= move;
		toA = from + (toA - toB);
		toB = from;
	}
	return {
		from,
		toA,
		toB
	};
}
function selectionPoints(view) {
	let result = [];
	if (view.root.activeElement != view.contentDOM) return result;
	let { anchorNode, anchorOffset, focusNode, focusOffset } = view.observer.selectionRange;
	if (anchorNode) {
		result.push(new DOMPoint(anchorNode, anchorOffset));
		if (focusNode != anchorNode || focusOffset != anchorOffset) result.push(new DOMPoint(focusNode, focusOffset));
	}
	return result;
}
function selectionFromPoints(points, base) {
	if (points.length == 0) return null;
	let anchor = points[0].pos, head = points.length == 2 ? points[1].pos : anchor;
	return anchor > -1 && head > -1 ? EditorSelection.single(anchor + base, head + base) : null;
}
function sameSelPos(selection, range) {
	return range.head == selection.main.head && range.anchor == selection.main.anchor;
}
var InputState = class {
	setSelectionOrigin(origin) {
		this.lastSelectionOrigin = origin;
		this.lastSelectionTime = Date.now();
	}
	constructor(view) {
		this.view = view;
		this.lastKeyCode = 0;
		this.lastKeyTime = 0;
		this.touchActive = false;
		this.lastTouchTime = 0;
		this.lastTouchX = 0;
		this.lastTouchY = 0;
		this.lastFocusTime = 0;
		this.lastScrollTop = 0;
		this.lastScrollLeft = 0;
		this.lastWheelEvent = 0;
		this.pendingIOSKey = void 0;
		this.lastIOSMomentumScroll = 0;
		this.tabFocusMode = -1;
		this.lastSelectionOrigin = null;
		this.lastSelectionTime = 0;
		this.lastContextMenu = 0;
		this.scrollHandlers = [];
		this.handlers = Object.create(null);
		this.composing = -1;
		this.compositionFirstChange = null;
		this.compositionEndedAt = 0;
		this.compositionPendingKey = false;
		this.compositionPendingChange = false;
		this.insertingText = "";
		this.insertingTextAt = 0;
		this.mouseSelection = null;
		this.draggedContent = null;
		this.handleEvent = this.handleEvent.bind(this);
		this.notifiedFocused = view.hasFocus;
		if (browser.safari) view.contentDOM.addEventListener("input", () => null);
		if (browser.gecko) firefoxCopyCutHack(view.contentDOM.ownerDocument);
	}
	handleEvent(event) {
		if (!eventBelongsToEditor(this.view, event) || this.ignoreDuringComposition(event)) return;
		if (event.type == "keydown" && this.keydown(event)) return;
		if (this.view.updateState != 0) Promise.resolve().then(() => this.runHandlers(event.type, event));
		else this.runHandlers(event.type, event);
	}
	runHandlers(type, event) {
		let handlers = this.handlers[type];
		if (handlers) {
			for (let observer of handlers.observers) observer(this.view, event);
			for (let handler of handlers.handlers) {
				if (event.defaultPrevented) break;
				if (handler(this.view, event)) {
					event.preventDefault();
					break;
				}
			}
		}
	}
	ensureHandlers(plugins) {
		let handlers = computeHandlers(plugins), prev = this.handlers, dom = this.view.contentDOM;
		for (let type in handlers) if (type != "scroll") {
			let passive = !handlers[type].handlers.length;
			let exists = prev[type];
			if (exists && passive != !exists.handlers.length) {
				dom.removeEventListener(type, this.handleEvent);
				exists = null;
			}
			if (!exists) dom.addEventListener(type, this.handleEvent, { passive });
		}
		for (let type in prev) if (type != "scroll" && !handlers[type]) dom.removeEventListener(type, this.handleEvent);
		this.handlers = handlers;
	}
	keydown(event) {
		this.lastKeyCode = event.keyCode;
		this.lastKeyTime = Date.now();
		if (event.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode)) return true;
		if (this.tabFocusMode > 0 && event.keyCode != 27 && modifierCodes.indexOf(event.keyCode) < 0) this.tabFocusMode = -1;
		if (browser.android && browser.chrome && !event.synthetic && (event.keyCode == 13 || event.keyCode == 8)) {
			this.view.observer.delayAndroidKey(event.key, event.keyCode);
			return true;
		}
		if (browser.ios && !event.synthetic && !event.altKey && !event.metaKey && (PendingKeys.some((key) => key.keyCode == event.keyCode) && !event.ctrlKey || EmacsyPendingKeys.indexOf(event.key) > -1 && event.ctrlKey)) {
			let mods = {
				ctrlKey: event.ctrlKey,
				altKey: event.altKey,
				metaKey: event.metaKey,
				shiftKey: event.shiftKey
			};
			if (mods.shiftKey && browser.ios && !/^(off|none)$/.test(this.view.contentDOM.autocapitalize) && iosVirtualKeyboardOpen(this.view.win)) mods.shiftKey = false;
			this.pendingIOSKey = {
				key: event.key,
				keyCode: event.keyCode,
				mods
			};
			setTimeout(() => this.flushIOSKey(), 250);
			return true;
		}
		if (event.keyCode != 229) this.view.observer.forceFlush();
		return false;
	}
	flushIOSKey(change) {
		let key = this.pendingIOSKey;
		if (!key) return false;
		if (key.key == "Enter" && change && change.from < change.to && /^\S+$/.test(change.insert.toString())) return false;
		this.pendingIOSKey = void 0;
		return dispatchKey(this.view.contentDOM, key.key, key.keyCode, key.mods);
	}
	ignoreDuringComposition(event) {
		if (!/^key/.test(event.type) || event.synthetic) return false;
		if (this.composing > 0) return true;
		if (browser.safari && !browser.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100) {
			this.compositionPendingKey = false;
			return true;
		}
		return false;
	}
	startMouseSelection(mouseSelection) {
		if (this.mouseSelection) this.mouseSelection.destroy();
		this.mouseSelection = mouseSelection;
	}
	update(update) {
		this.view.observer.update(update);
		if (this.mouseSelection) this.mouseSelection.update(update);
		if (this.draggedContent && update.docChanged) this.draggedContent = this.draggedContent.map(update.changes);
		if (update.transactions.length) this.lastKeyCode = this.lastSelectionTime = 0;
	}
	destroy() {
		if (this.mouseSelection) this.mouseSelection.destroy();
	}
};
function iosVirtualKeyboardOpen(win) {
	if (!win.visualViewport) return false;
	return win.visualViewport.height * win.visualViewport.scale / win.document.documentElement.clientHeight < .85;
}
function bindHandler(plugin, handler) {
	return (view, event) => {
		try {
			return handler.call(plugin, event, view);
		} catch (e) {
			logException(view.state, e);
		}
	};
}
function computeHandlers(plugins) {
	let result = Object.create(null);
	function record(type) {
		return result[type] || (result[type] = {
			observers: [],
			handlers: []
		});
	}
	for (let plugin of plugins) {
		let spec = plugin.spec, handlers = spec && spec.plugin.domEventHandlers, observers = spec && spec.plugin.domEventObservers;
		if (handlers) for (let type in handlers) {
			let f = handlers[type];
			if (f) record(type).handlers.push(bindHandler(plugin.value, f));
		}
		if (observers) for (let type in observers) {
			let f = observers[type];
			if (f) record(type).observers.push(bindHandler(plugin.value, f));
		}
	}
	for (let type in handlers) record(type).handlers.push(handlers[type]);
	for (let type in observers) record(type).observers.push(observers[type]);
	return result;
}
var PendingKeys = [
	{
		key: "Backspace",
		keyCode: 8,
		inputType: "deleteContentBackward"
	},
	{
		key: "Enter",
		keyCode: 13,
		inputType: "insertParagraph"
	},
	{
		key: "Enter",
		keyCode: 13,
		inputType: "insertLineBreak"
	},
	{
		key: "Delete",
		keyCode: 46,
		inputType: "deleteContentForward"
	}
];
var EmacsyPendingKeys = "dthko";
var modifierCodes = [
	16,
	17,
	18,
	20,
	91,
	92,
	224,
	225
];
var dragScrollMargin = 6;
function dragScrollSpeed(dist) {
	return Math.max(0, dist) * .7 + 8;
}
function dist(a, b) {
	return Math.max(Math.abs(a.clientX - b.clientX), Math.abs(a.clientY - b.clientY));
}
var MouseSelection = class {
	constructor(view, startEvent, style, mustSelect) {
		this.view = view;
		this.startEvent = startEvent;
		this.style = style;
		this.mustSelect = mustSelect;
		this.scrollSpeed = {
			x: 0,
			y: 0
		};
		this.scrolling = -1;
		this.lastEvent = startEvent;
		this.scrollParents = scrollableParents(view.contentDOM);
		this.atoms = view.state.facet(atomicRanges).map((f) => f(view));
		let doc = view.contentDOM.ownerDocument;
		doc.addEventListener("mousemove", this.move = this.move.bind(this));
		doc.addEventListener("mouseup", this.up = this.up.bind(this));
		this.extend = startEvent.shiftKey;
		this.multiple = view.state.facet(EditorState.allowMultipleSelections) && addsSelectionRange(view, startEvent);
		this.dragging = isInPrimarySelection(view, startEvent) && getClickType(startEvent) == 1 ? null : false;
	}
	start(event) {
		if (this.dragging === false) this.select(event);
	}
	move(event) {
		if (event.buttons == 0) return this.destroy();
		if (this.dragging || this.dragging == null && dist(this.startEvent, event) < 10) return;
		this.select(this.lastEvent = event);
		let sx = 0, sy = 0;
		let left = 0, top = 0, right = this.view.win.innerWidth, bottom = this.view.win.innerHeight;
		if (this.scrollParents.x) ({left, right} = this.scrollParents.x.getBoundingClientRect());
		if (this.scrollParents.y) ({top, bottom} = this.scrollParents.y.getBoundingClientRect());
		let margins = getScrollMargins(this.view);
		if (event.clientX - margins.left <= left + dragScrollMargin) sx = -dragScrollSpeed(left - event.clientX);
		else if (event.clientX + margins.right >= right - dragScrollMargin) sx = dragScrollSpeed(event.clientX - right);
		if (event.clientY - margins.top <= top + dragScrollMargin) sy = -dragScrollSpeed(top - event.clientY);
		else if (event.clientY + margins.bottom >= bottom - dragScrollMargin) sy = dragScrollSpeed(event.clientY - bottom);
		this.setScrollSpeed(sx, sy);
	}
	up(event) {
		if (this.dragging == null) this.select(this.lastEvent);
		if (!this.dragging) event.preventDefault();
		this.destroy();
	}
	destroy() {
		this.setScrollSpeed(0, 0);
		let doc = this.view.contentDOM.ownerDocument;
		doc.removeEventListener("mousemove", this.move);
		doc.removeEventListener("mouseup", this.up);
		this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
	}
	setScrollSpeed(sx, sy) {
		this.scrollSpeed = {
			x: sx,
			y: sy
		};
		if (sx || sy) {
			if (this.scrolling < 0) this.scrolling = setInterval(() => this.scroll(), 50);
		} else if (this.scrolling > -1) {
			clearInterval(this.scrolling);
			this.scrolling = -1;
		}
	}
	scroll() {
		let { x, y } = this.scrollSpeed;
		if (x && this.scrollParents.x) {
			this.scrollParents.x.scrollLeft += x;
			x = 0;
		}
		if (y && this.scrollParents.y) {
			this.scrollParents.y.scrollTop += y;
			y = 0;
		}
		if (x || y) this.view.win.scrollBy(x, y);
		if (this.dragging === false) this.select(this.lastEvent);
	}
	select(event) {
		let { view } = this, selection = skipAtomsForSelection(this.atoms, this.style.get(event, this.extend, this.multiple));
		if (this.mustSelect || !selection.eq(view.state.selection, this.dragging === false)) this.view.dispatch({
			selection,
			userEvent: "select.pointer"
		});
		this.mustSelect = false;
	}
	update(update) {
		if (update.transactions.some((tr) => tr.isUserEvent("input.type"))) this.destroy();
		else if (this.style.update(update)) setTimeout(() => this.select(this.lastEvent), 20);
	}
};
function addsSelectionRange(view, event) {
	let facet = view.state.facet(clickAddsSelectionRange);
	return facet.length ? facet[0](event) : browser.mac ? event.metaKey : event.ctrlKey;
}
function dragMovesSelection(view, event) {
	let facet = view.state.facet(dragMovesSelection$1);
	return facet.length ? facet[0](event) : browser.mac ? !event.altKey : !event.ctrlKey;
}
function isInPrimarySelection(view, event) {
	let { main } = view.state.selection;
	if (main.empty) return false;
	let sel = getSelection(view.root);
	if (!sel || sel.rangeCount == 0) return true;
	let rects = sel.getRangeAt(0).getClientRects();
	for (let i = 0; i < rects.length; i++) {
		let rect = rects[i];
		if (rect.left <= event.clientX && rect.right >= event.clientX && rect.top <= event.clientY && rect.bottom >= event.clientY) return true;
	}
	return false;
}
function eventBelongsToEditor(view, event) {
	if (!event.bubbles) return true;
	if (event.defaultPrevented) return false;
	for (let node = event.target, tile; node != view.contentDOM; node = node.parentNode) if (!node || node.nodeType == 11 || (tile = Tile.get(node)) && tile.isWidget() && !tile.isHidden && tile.widget.ignoreEvent(event)) return false;
	return true;
}
var handlers = Object.create(null);
var observers = Object.create(null);
var brokenClipboardAPI = browser.ie && browser.ie_version < 15 || browser.ios && browser.webkit_version < 604;
function capturePaste(view) {
	let parent = view.dom.parentNode;
	if (!parent) return;
	let target = parent.appendChild(document.createElement("textarea"));
	target.style.cssText = "position: fixed; left: -10000px; top: 10px";
	target.focus();
	setTimeout(() => {
		view.focus();
		target.remove();
		doPaste(view, target.value);
	}, 50);
}
function textFilter(state, facet, text) {
	for (let filter of state.facet(facet)) text = filter(text, state);
	return text;
}
function doPaste(view, input) {
	input = textFilter(view.state, clipboardInputFilter, input);
	let { state } = view, changes, i = 1, text = state.toText(input);
	let byLine = text.lines == state.selection.ranges.length;
	if (lastLinewiseCopy != null && state.selection.ranges.every((r) => r.empty) && lastLinewiseCopy == text.toString()) {
		let lastLine = -1;
		changes = state.changeByRange((range) => {
			let line = state.doc.lineAt(range.from);
			if (line.from == lastLine) return { range };
			lastLine = line.from;
			let insert = state.toText((byLine ? text.line(i++).text : input) + state.lineBreak);
			return {
				changes: {
					from: line.from,
					insert
				},
				range: EditorSelection.cursor(range.from + insert.length)
			};
		});
	} else if (byLine) changes = state.changeByRange((range) => {
		let line = text.line(i++);
		return {
			changes: {
				from: range.from,
				to: range.to,
				insert: line.text
			},
			range: EditorSelection.cursor(range.from + line.length)
		};
	});
	else changes = state.replaceSelection(text);
	view.dispatch(changes, {
		userEvent: "input.paste",
		scrollIntoView: true
	});
}
observers.scroll = (view) => {
	let iState = view.inputState;
	iState.lastScrollTop = view.scrollDOM.scrollTop;
	iState.lastScrollLeft = view.scrollDOM.scrollLeft;
	if (browser.ios && !iState.touchActive) iState.lastIOSMomentumScroll = Date.now();
};
observers.wheel = observers.mousewheel = (view) => {
	view.inputState.lastWheelEvent = Date.now();
};
handlers.keydown = (view, event) => {
	view.inputState.setSelectionOrigin("select");
	if (event.keyCode == 27 && view.inputState.tabFocusMode != 0) view.inputState.tabFocusMode = Date.now() + 2e3;
	return false;
};
observers.touchstart = (view, e) => {
	let iState = view.inputState, touch = e.targetTouches[0];
	iState.touchActive = true;
	iState.lastTouchTime = Date.now();
	if (touch) {
		iState.lastTouchX = touch.clientX;
		iState.lastTouchY = touch.clientY;
	}
	iState.setSelectionOrigin("select.pointer");
};
observers.touchmove = (view) => {
	view.inputState.setSelectionOrigin("select.pointer");
};
observers.touchend = (view, e) => {
	view.inputState.touchActive = false;
};
handlers.mousedown = (view, event) => {
	view.observer.flush();
	if (view.inputState.lastTouchTime > Date.now() - 2e3) return false;
	let style = null;
	for (let makeStyle of view.state.facet(mouseSelectionStyle)) {
		style = makeStyle(view, event);
		if (style) break;
	}
	if (!style && event.button == 0) style = basicMouseSelection(view, event);
	if (style) {
		let mustFocus = !view.hasFocus;
		view.inputState.startMouseSelection(new MouseSelection(view, event, style, mustFocus));
		if (mustFocus) view.observer.ignore(() => {
			focusPreventScroll(view.contentDOM);
			let active = view.root.activeElement;
			if (active && !active.contains(view.contentDOM)) active.blur();
		});
		let mouseSel = view.inputState.mouseSelection;
		if (mouseSel) {
			mouseSel.start(event);
			return mouseSel.dragging === false;
		}
	} else view.inputState.setSelectionOrigin("select.pointer");
	return false;
};
function rangeForClick(view, pos, bias, type) {
	if (type == 1) return EditorSelection.cursor(pos, bias);
	else if (type == 2) return groupAt(view.state, pos, bias);
	else {
		let visual = view.docView.lineAt(pos, bias), line = view.state.doc.lineAt(visual ? visual.posAtEnd : pos);
		let from = visual ? visual.posAtStart : line.from, to = visual ? visual.posAtEnd : line.to;
		if (to < view.state.doc.length && to == line.to) to++;
		return EditorSelection.undirectionalRange(from, to);
	}
}
var BadMouseDetail = browser.ie && browser.ie_version <= 11;
var lastMouseDown = null;
var lastMouseDownCount = 0;
var lastMouseDownTime = 0;
function getClickType(event) {
	if (!BadMouseDetail) return event.detail;
	let last = lastMouseDown, lastTime = lastMouseDownTime;
	lastMouseDown = event;
	lastMouseDownTime = Date.now();
	return lastMouseDownCount = !last || lastTime > Date.now() - 400 && Math.abs(last.clientX - event.clientX) < 2 && Math.abs(last.clientY - event.clientY) < 2 ? (lastMouseDownCount + 1) % 3 : 1;
}
function basicMouseSelection(view, event) {
	let start = view.posAndSideAtCoords({
		x: event.clientX,
		y: event.clientY
	}, false), type = getClickType(event);
	let startSel = view.state.selection;
	return {
		update(update) {
			if (update.docChanged) {
				start.pos = update.changes.mapPos(start.pos);
				startSel = startSel.map(update.changes);
			}
		},
		get(event, extend, multiple) {
			let cur = view.posAndSideAtCoords({
				x: event.clientX,
				y: event.clientY
			}, false), removed;
			let range = rangeForClick(view, cur.pos, cur.assoc, type);
			if (start.pos != cur.pos && !extend) {
				let startRange = rangeForClick(view, start.pos, start.assoc, type);
				let from = Math.min(startRange.from, range.from), to = Math.max(startRange.to, range.to);
				range = from < range.from ? EditorSelection.range(from, to, range.assoc) : EditorSelection.range(to, from, range.assoc);
			}
			if (extend) return startSel.replaceRange(startSel.main.extend(range.from, range.to, range.assoc));
			else if (multiple && type == 1 && startSel.ranges.length > 1 && (removed = removeRangeAround(startSel, cur.pos))) return removed;
			else if (multiple) return startSel.addRange(range);
			else return EditorSelection.create([range]);
		}
	};
}
function removeRangeAround(sel, pos) {
	for (let i = 0; i < sel.ranges.length; i++) {
		let { from, to } = sel.ranges[i];
		if (from <= pos && to >= pos) return EditorSelection.create(sel.ranges.slice(0, i).concat(sel.ranges.slice(i + 1)), sel.mainIndex == i ? 0 : sel.mainIndex - (sel.mainIndex > i ? 1 : 0));
	}
	return null;
}
handlers.dragstart = (view, event) => {
	let { selection: { main: range } } = view.state;
	if (event.target.draggable) {
		let tile = view.docView.tile.nearest(event.target);
		if (tile && tile.isWidget()) {
			let from = tile.posAtStart, to = from + tile.length;
			if (from >= range.to || to <= range.from) range = EditorSelection.undirectionalRange(from, to);
		}
	}
	let { inputState } = view;
	if (inputState.mouseSelection) inputState.mouseSelection.dragging = true;
	inputState.draggedContent = range;
	if (event.dataTransfer) {
		event.dataTransfer.setData("Text", textFilter(view.state, clipboardOutputFilter, view.state.sliceDoc(range.from, range.to)));
		event.dataTransfer.effectAllowed = "copyMove";
	}
	return false;
};
handlers.dragend = (view) => {
	view.inputState.draggedContent = null;
	return false;
};
function dropText(view, event, text, direct) {
	text = textFilter(view.state, clipboardInputFilter, text);
	if (!text) return;
	let dropPos = view.posAtCoords({
		x: event.clientX,
		y: event.clientY
	}, false);
	let { draggedContent } = view.inputState;
	let del = direct && draggedContent && dragMovesSelection(view, event) ? {
		from: draggedContent.from,
		to: draggedContent.to
	} : null;
	let ins = {
		from: dropPos,
		insert: text
	};
	let changes = view.state.changes(del ? [del, ins] : ins);
	view.focus();
	view.dispatch({
		changes,
		selection: {
			anchor: changes.mapPos(dropPos, -1),
			head: changes.mapPos(dropPos, 1)
		},
		userEvent: del ? "move.drop" : "input.drop"
	});
	view.inputState.draggedContent = null;
}
handlers.drop = (view, event) => {
	if (!event.dataTransfer) return false;
	if (view.state.readOnly) return true;
	let files = event.dataTransfer.files;
	if (files && files.length) {
		let text = Array(files.length), read = 0;
		let finishFile = () => {
			if (++read == files.length) dropText(view, event, text.filter((s) => s != null).join(view.state.lineBreak), false);
		};
		for (let i = 0; i < files.length; i++) {
			let reader = new FileReader();
			reader.onerror = finishFile;
			reader.onload = () => {
				if (!/[\x00-\x08\x0e-\x1f]{2}/.test(reader.result)) text[i] = reader.result;
				finishFile();
			};
			reader.readAsText(files[i]);
		}
		return true;
	} else {
		let text = event.dataTransfer.getData("Text");
		if (text) {
			dropText(view, event, text, true);
			return true;
		}
	}
	return false;
};
handlers.paste = (view, event) => {
	if (view.state.readOnly) return true;
	view.observer.flush();
	let data = brokenClipboardAPI ? null : event.clipboardData;
	if (data) {
		doPaste(view, data.getData("text/plain") || data.getData("text/uri-list"));
		return true;
	} else {
		capturePaste(view);
		return false;
	}
};
function captureCopy(view, text) {
	let parent = view.dom.parentNode;
	if (!parent) return;
	let target = parent.appendChild(document.createElement("textarea"));
	target.style.cssText = "position: fixed; left: -10000px; top: 10px";
	target.value = text;
	target.focus();
	target.selectionEnd = text.length;
	target.selectionStart = 0;
	setTimeout(() => {
		target.remove();
		view.focus();
	}, 50);
}
function copiedRange(state) {
	let content = [], ranges = [], linewise = false;
	for (let range of state.selection.ranges) if (!range.empty) {
		content.push(state.sliceDoc(range.from, range.to));
		ranges.push(range);
	}
	if (!content.length) {
		let upto = -1;
		for (let { from } of state.selection.ranges) {
			let line = state.doc.lineAt(from);
			if (line.number > upto) {
				content.push(line.text);
				ranges.push({
					from: line.from,
					to: Math.min(state.doc.length, line.to + 1)
				});
			}
			upto = line.number;
		}
		linewise = true;
	}
	return {
		text: textFilter(state, clipboardOutputFilter, content.join(state.lineBreak)),
		ranges,
		linewise
	};
}
var lastLinewiseCopy = null;
handlers.copy = handlers.cut = (view, event) => {
	if (!hasSelection(view.contentDOM, view.observer.selectionRange)) return false;
	let { text, ranges, linewise } = copiedRange(view.state);
	if (!text && !linewise) return false;
	lastLinewiseCopy = linewise ? text : null;
	if (event.type == "cut" && !view.state.readOnly) view.dispatch({
		changes: ranges,
		scrollIntoView: true,
		userEvent: "delete.cut"
	});
	let data = brokenClipboardAPI ? null : event.clipboardData;
	if (data) {
		data.clearData();
		data.setData("text/plain", text);
		return true;
	} else {
		captureCopy(view, text);
		return false;
	}
};
var isFocusChange = Annotation.define();
function focusChangeTransaction(state, focus) {
	let effects = [];
	for (let getEffect of state.facet(focusChangeEffect)) {
		let effect = getEffect(state, focus);
		if (effect) effects.push(effect);
	}
	return effects.length ? state.update({
		effects,
		annotations: isFocusChange.of(true)
	}) : null;
}
function updateForFocusChange(view) {
	setTimeout(() => {
		let focus = view.hasFocus;
		if (focus != view.inputState.notifiedFocused) {
			let tr = focusChangeTransaction(view.state, focus);
			if (tr) view.dispatch(tr);
			else view.update([]);
		}
	}, 10);
}
observers.focus = (view) => {
	view.inputState.lastFocusTime = Date.now();
	if (!view.scrollDOM.scrollTop && (view.inputState.lastScrollTop || view.inputState.lastScrollLeft)) {
		view.scrollDOM.scrollTop = view.inputState.lastScrollTop;
		view.scrollDOM.scrollLeft = view.inputState.lastScrollLeft;
	}
	updateForFocusChange(view);
};
observers.blur = (view) => {
	view.observer.clearSelectionRange();
	updateForFocusChange(view);
};
observers.compositionstart = observers.compositionupdate = (view) => {
	if (view.observer.editContext) return;
	if (view.inputState.compositionFirstChange == null) view.inputState.compositionFirstChange = true;
	if (view.inputState.composing < 0) view.inputState.composing = 0;
};
observers.compositionend = (view) => {
	if (view.observer.editContext) return;
	view.inputState.composing = -1;
	view.inputState.compositionEndedAt = Date.now();
	view.inputState.compositionPendingKey = true;
	view.inputState.compositionPendingChange = view.observer.pendingRecords().length > 0;
	view.inputState.compositionFirstChange = null;
	if (browser.chrome && browser.android) view.observer.flushSoon();
	else if (view.inputState.compositionPendingChange) Promise.resolve().then(() => view.observer.flush());
	else setTimeout(() => {
		if (view.inputState.composing < 0 && view.docView.hasComposition) view.update([]);
	}, 50);
};
observers.contextmenu = (view) => {
	view.inputState.lastContextMenu = Date.now();
};
handlers.beforeinput = (view, event) => {
	var _a, _b;
	if (event.inputType == "insertText" || event.inputType == "insertCompositionText") {
		view.inputState.insertingText = event.data;
		view.inputState.insertingTextAt = Date.now();
	}
	if (event.inputType == "insertReplacementText" && view.observer.editContext) {
		let text = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain"), ranges = event.getTargetRanges();
		if (text && ranges.length) {
			let r = ranges[0];
			applyDOMChangeInner(view, {
				from: view.posAtDOM(r.startContainer, r.startOffset),
				to: view.posAtDOM(r.endContainer, r.endOffset),
				insert: view.state.toText(text)
			}, null);
			return true;
		}
	}
	let pending;
	if (browser.chrome && browser.android && (pending = PendingKeys.find((key) => key.inputType == event.inputType))) {
		view.observer.delayAndroidKey(pending.key, pending.keyCode);
		if (pending.key == "Backspace" || pending.key == "Delete") {
			let startViewHeight = ((_b = window.visualViewport) === null || _b === void 0 ? void 0 : _b.height) || 0;
			setTimeout(() => {
				var _a;
				if ((((_a = window.visualViewport) === null || _a === void 0 ? void 0 : _a.height) || 0) > startViewHeight + 10 && view.hasFocus) {
					view.contentDOM.blur();
					view.focus();
				}
			}, 100);
		}
	}
	if (browser.ios && event.inputType == "deleteContentForward") view.observer.flushSoon();
	if (browser.safari && event.inputType == "insertText" && view.inputState.composing >= 0) setTimeout(() => observers.compositionend(view, event), 20);
	return false;
};
var appliedFirefoxHack = new Set();
function firefoxCopyCutHack(doc) {
	if (!appliedFirefoxHack.has(doc)) {
		appliedFirefoxHack.add(doc);
		doc.addEventListener("copy", () => {});
		doc.addEventListener("cut", () => {});
	}
}
var wrappingWhiteSpace = [
	"pre-wrap",
	"normal",
	"pre-line",
	"break-spaces"
];
var heightChangeFlag = false;
function clearHeightChangeFlag() {
	heightChangeFlag = false;
}
var HeightOracle = class {
	constructor(lineWrapping) {
		this.lineWrapping = lineWrapping;
		this.doc = Text.empty;
		this.heightSamples = {};
		this.lineHeight = 14;
		this.charWidth = 7;
		this.textHeight = 14;
		this.lineLength = 30;
	}
	heightForGap(from, to) {
		let lines = this.doc.lineAt(to).number - this.doc.lineAt(from).number + 1;
		if (this.lineWrapping) lines += Math.max(0, Math.ceil((to - from - lines * this.lineLength * .5) / this.lineLength));
		return this.lineHeight * lines;
	}
	heightForLine(length) {
		if (!this.lineWrapping) return this.lineHeight;
		return (1 + Math.max(0, Math.ceil((length - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight;
	}
	setDoc(doc) {
		this.doc = doc;
		return this;
	}
	mustRefreshForWrapping(whiteSpace) {
		return wrappingWhiteSpace.indexOf(whiteSpace) > -1 != this.lineWrapping;
	}
	mustRefreshForHeights(lineHeights) {
		let newHeight = false;
		for (let i = 0; i < lineHeights.length; i++) {
			let h = lineHeights[i];
			if (h < 0) i++;
			else if (!this.heightSamples[Math.floor(h * 10)]) {
				newHeight = true;
				this.heightSamples[Math.floor(h * 10)] = true;
			}
		}
		return newHeight;
	}
	refresh(whiteSpace, lineHeight, charWidth, textHeight, lineLength, knownHeights) {
		let lineWrapping = wrappingWhiteSpace.indexOf(whiteSpace) > -1;
		let changed = Math.abs(lineHeight - this.lineHeight) > .3 || this.lineWrapping != lineWrapping;
		this.lineWrapping = lineWrapping;
		this.lineHeight = lineHeight;
		this.charWidth = charWidth;
		this.textHeight = textHeight;
		this.lineLength = lineLength;
		if (changed) {
			this.heightSamples = {};
			for (let i = 0; i < knownHeights.length; i++) {
				let h = knownHeights[i];
				if (h < 0) i++;
				else this.heightSamples[Math.floor(h * 10)] = true;
			}
		}
		return changed;
	}
};
var MeasuredHeights = class {
	constructor(from, heights) {
		this.from = from;
		this.heights = heights;
		this.index = 0;
	}
	get more() {
		return this.index < this.heights.length;
	}
};
var BlockInfo = class BlockInfo {
	constructor(from, length, top, height, _content) {
		this.from = from;
		this.length = length;
		this.top = top;
		this.height = height;
		this._content = _content;
	}
	get type() {
		return typeof this._content == "number" ? BlockType.Text : Array.isArray(this._content) ? this._content : this._content.type;
	}
	get to() {
		return this.from + this.length;
	}
	get bottom() {
		return this.top + this.height;
	}
	get widget() {
		return this._content instanceof PointDecoration ? this._content.widget : null;
	}
	get widgetLineBreaks() {
		return typeof this._content == "number" ? this._content : 0;
	}
	join(other) {
		let content = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(other._content) ? other._content : [other]);
		return new BlockInfo(this.from, this.length + other.length, this.top, this.height + other.height, content);
	}
};
var QueryType = (function(QueryType) {
	QueryType[QueryType["ByPos"] = 0] = "ByPos";
	QueryType[QueryType["ByHeight"] = 1] = "ByHeight";
	QueryType[QueryType["ByPosNoHeight"] = 2] = "ByPosNoHeight";
	return QueryType;
})(QueryType || (QueryType = {}));
var Epsilon = .001;
var HeightMap = class HeightMap {
	constructor(length, height, flags = 2) {
		this.length = length;
		this.height = height;
		this.flags = flags;
	}
	get outdated() {
		return (this.flags & 2) > 0;
	}
	set outdated(value) {
		this.flags = (value ? 2 : 0) | this.flags & -3;
	}
	setHeight(height) {
		if (this.height != height) {
			if (Math.abs(this.height - height) > Epsilon) heightChangeFlag = true;
			this.height = height;
		}
	}
	replace(_from, _to, nodes) {
		return HeightMap.of(nodes);
	}
	decomposeLeft(_to, result) {
		result.push(this);
	}
	decomposeRight(_from, result) {
		result.push(this);
	}
	applyChanges(decorations, oldDoc, oracle, changes) {
		let me = this, doc = oracle.doc;
		for (let i = changes.length - 1; i >= 0; i--) {
			let { fromA, toA, fromB, toB } = changes[i];
			let start = me.lineAt(fromA, QueryType.ByPosNoHeight, oracle.setDoc(oldDoc), 0, 0);
			let end = start.to >= toA ? start : me.lineAt(toA, QueryType.ByPosNoHeight, oracle, 0, 0);
			toB += end.to - toA;
			toA = end.to;
			while (i > 0 && start.from <= changes[i - 1].toA) {
				fromA = changes[i - 1].fromA;
				fromB = changes[i - 1].fromB;
				i--;
				if (fromA < start.from) start = me.lineAt(fromA, QueryType.ByPosNoHeight, oracle, 0, 0);
			}
			fromB += start.from - fromA;
			fromA = start.from;
			let nodes = NodeBuilder.build(oracle.setDoc(doc), decorations, fromB, toB);
			me = replace(me, me.replace(fromA, toA, nodes));
		}
		return me.updateHeight(oracle, 0);
	}
	static empty() {
		return new HeightMapText(0, 0, 0);
	}
	static of(nodes) {
		if (nodes.length == 1) return nodes[0];
		let i = 0, j = nodes.length, before = 0, after = 0;
		for (;;) if (i == j) {
			if (before > after * 2) {
				let split = nodes[i - 1];
				if (split.break) nodes.splice(--i, 1, split.left, null, split.right);
				else nodes.splice(--i, 1, split.left, split.right);
				j += 1 + split.break;
				before -= split.size;
			} else if (after > before * 2) {
				let split = nodes[j];
				if (split.break) nodes.splice(j, 1, split.left, null, split.right);
				else nodes.splice(j, 1, split.left, split.right);
				j += 2 + split.break;
				after -= split.size;
			} else break;
		} else if (before < after) {
			let next = nodes[i++];
			if (next) before += next.size;
		} else {
			let next = nodes[--j];
			if (next) after += next.size;
		}
		let brk = 0;
		if (nodes[i - 1] == null) {
			brk = 1;
			i--;
		} else if (nodes[i] == null) {
			brk = 1;
			j++;
		}
		return new HeightMapBranch(HeightMap.of(nodes.slice(0, i)), brk, HeightMap.of(nodes.slice(j)));
	}
};
function replace(old, val) {
	if (old == val) return old;
	if (old.constructor != val.constructor) heightChangeFlag = true;
	return val;
}
HeightMap.prototype.size = 1;
var SpaceDeco = Decoration.replace({});
var HeightMapBlock = class extends HeightMap {
	constructor(length, height, deco) {
		super(length, height);
		this.deco = deco;
		this.spaceAbove = 0;
	}
	mainBlock(top, offset) {
		return new BlockInfo(offset, this.length, top + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
	}
	blockAt(height, _oracle, top, offset) {
		return this.spaceAbove && height < top + this.spaceAbove ? new BlockInfo(offset, 0, top, this.spaceAbove, SpaceDeco) : this.mainBlock(top, offset);
	}
	lineAt(_value, _type, oracle, top, offset) {
		let main = this.mainBlock(top, offset);
		return this.spaceAbove ? this.blockAt(0, oracle, top, offset).join(main) : main;
	}
	forEachLine(from, to, oracle, top, offset, f) {
		if (from <= offset + this.length && to >= offset) f(this.lineAt(0, QueryType.ByPos, oracle, top, offset));
	}
	setMeasuredHeight(measured) {
		let next = measured.heights[measured.index++];
		if (next < 0) {
			this.spaceAbove = -next;
			next = measured.heights[measured.index++];
		} else this.spaceAbove = 0;
		this.setHeight(next);
	}
	updateHeight(oracle, offset = 0, _force = false, measured) {
		if (measured && measured.from <= offset && measured.more) this.setMeasuredHeight(measured);
		this.outdated = false;
		return this;
	}
	toString() {
		return `block(${this.length})`;
	}
};
var HeightMapText = class HeightMapText extends HeightMapBlock {
	constructor(length, height, above) {
		super(length, height, null);
		this.collapsed = 0;
		this.widgetHeight = 0;
		this.breaks = 0;
		this.spaceAbove = above;
	}
	mainBlock(top, offset) {
		return new BlockInfo(offset, this.length, top + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
	}
	replace(_from, _to, nodes) {
		let node = nodes[0];
		if (nodes.length == 1 && (node instanceof HeightMapText || node instanceof HeightMapGap && node.flags & 4) && Math.abs(this.length - node.length) < 10) {
			if (node instanceof HeightMapGap) node = new HeightMapText(node.length, this.height, this.spaceAbove);
			else node.height = this.height;
			if (!this.outdated) node.outdated = false;
			return node;
		} else return HeightMap.of(nodes);
	}
	updateHeight(oracle, offset = 0, force = false, measured) {
		if (measured && measured.from <= offset && measured.more) this.setMeasuredHeight(measured);
		else if (force || this.outdated) {
			this.spaceAbove = 0;
			this.setHeight(Math.max(this.widgetHeight, oracle.heightForLine(this.length - this.collapsed)) + this.breaks * oracle.lineHeight);
		}
		this.outdated = false;
		return this;
	}
	toString() {
		return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
	}
};
var HeightMapGap = class HeightMapGap extends HeightMap {
	constructor(length) {
		super(length, 0);
	}
	heightMetrics(oracle, offset) {
		let firstLine = oracle.doc.lineAt(offset).number, lastLine = oracle.doc.lineAt(offset + this.length).number;
		let lines = lastLine - firstLine + 1;
		let perLine, perChar = 0;
		if (oracle.lineWrapping) {
			let totalPerLine = Math.min(this.height, oracle.lineHeight * lines);
			perLine = totalPerLine / lines;
			if (this.length > lines + 1) perChar = (this.height - totalPerLine) / (this.length - lines - 1);
		} else perLine = this.height / lines;
		return {
			firstLine,
			lastLine,
			perLine,
			perChar
		};
	}
	blockAt(height, oracle, top, offset) {
		let { firstLine, lastLine, perLine, perChar } = this.heightMetrics(oracle, offset);
		if (oracle.lineWrapping) {
			let guess = offset + (height < oracle.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (height - top) / this.height)) * this.length));
			let line = oracle.doc.lineAt(guess), lineHeight = perLine + line.length * perChar;
			let lineTop = Math.max(top, height - lineHeight / 2);
			return new BlockInfo(line.from, line.length, lineTop, lineHeight, 0);
		} else {
			let line = Math.max(0, Math.min(lastLine - firstLine, Math.floor((height - top) / perLine)));
			let { from, length } = oracle.doc.line(firstLine + line);
			return new BlockInfo(from, length, top + perLine * line, perLine, 0);
		}
	}
	lineAt(value, type, oracle, top, offset) {
		if (type == QueryType.ByHeight) return this.blockAt(value, oracle, top, offset);
		if (type == QueryType.ByPosNoHeight) {
			let { from, to } = oracle.doc.lineAt(value);
			return new BlockInfo(from, to - from, 0, 0, 0);
		}
		let { firstLine, perLine, perChar } = this.heightMetrics(oracle, offset);
		let line = oracle.doc.lineAt(value), lineHeight = perLine + line.length * perChar;
		let linesAbove = line.number - firstLine;
		let lineTop = top + perLine * linesAbove + perChar * (line.from - offset - linesAbove);
		return new BlockInfo(line.from, line.length, Math.max(top, Math.min(lineTop, top + this.height - lineHeight)), lineHeight, 0);
	}
	forEachLine(from, to, oracle, top, offset, f) {
		from = Math.max(from, offset);
		to = Math.min(to, offset + this.length);
		let { firstLine, perLine, perChar } = this.heightMetrics(oracle, offset);
		for (let pos = from, lineTop = top; pos <= to;) {
			let line = oracle.doc.lineAt(pos);
			if (pos == from) {
				let linesAbove = line.number - firstLine;
				lineTop += perLine * linesAbove + perChar * (from - offset - linesAbove);
			}
			let lineHeight = perLine + perChar * line.length;
			f(new BlockInfo(line.from, line.length, lineTop, lineHeight, 0));
			lineTop += lineHeight;
			pos = line.to + 1;
		}
	}
	replace(from, to, nodes) {
		let after = this.length - to;
		if (after > 0) {
			let last = nodes[nodes.length - 1];
			if (last instanceof HeightMapGap) nodes[nodes.length - 1] = new HeightMapGap(last.length + after);
			else nodes.push(null, new HeightMapGap(after - 1));
		}
		if (from > 0) {
			let first = nodes[0];
			if (first instanceof HeightMapGap) nodes[0] = new HeightMapGap(from + first.length);
			else nodes.unshift(new HeightMapGap(from - 1), null);
		}
		return HeightMap.of(nodes);
	}
	decomposeLeft(to, result) {
		result.push(new HeightMapGap(to - 1), null);
	}
	decomposeRight(from, result) {
		result.push(null, new HeightMapGap(this.length - from - 1));
	}
	updateHeight(oracle, offset = 0, force = false, measured) {
		let end = offset + this.length;
		if (measured && measured.from <= offset + this.length && measured.more) {
			let nodes = [], pos = Math.max(offset, measured.from), singleHeight = -1;
			if (measured.from > offset) nodes.push(new HeightMapGap(measured.from - offset - 1).updateHeight(oracle, offset));
			while (pos <= end && measured.more) {
				let len = oracle.doc.lineAt(pos).length;
				if (nodes.length) nodes.push(null);
				let height = measured.heights[measured.index++], above = 0;
				if (height < 0) {
					above = -height;
					height = measured.heights[measured.index++];
				}
				if (singleHeight == -1) singleHeight = height;
				else if (Math.abs(height - singleHeight) >= Epsilon) singleHeight = -2;
				let line = new HeightMapText(len, height, above);
				line.outdated = false;
				nodes.push(line);
				pos += len + 1;
			}
			if (pos <= end) nodes.push(null, new HeightMapGap(end - pos).updateHeight(oracle, pos));
			let result = HeightMap.of(nodes);
			if (singleHeight < 0 || Math.abs(result.height - this.height) >= Epsilon || Math.abs(singleHeight - this.heightMetrics(oracle, offset).perLine) >= Epsilon) heightChangeFlag = true;
			return replace(this, result);
		} else if (force || this.outdated) {
			this.setHeight(oracle.heightForGap(offset, offset + this.length));
			this.outdated = false;
		}
		return this;
	}
	toString() {
		return `gap(${this.length})`;
	}
};
var HeightMapBranch = class extends HeightMap {
	constructor(left, brk, right) {
		super(left.length + brk + right.length, left.height + right.height, brk | (left.outdated || right.outdated ? 2 : 0));
		this.left = left;
		this.right = right;
		this.size = left.size + right.size;
	}
	get break() {
		return this.flags & 1;
	}
	blockAt(height, oracle, top, offset) {
		let mid = top + this.left.height;
		return height < mid ? this.left.blockAt(height, oracle, top, offset) : this.right.blockAt(height, oracle, mid, offset + this.left.length + this.break);
	}
	lineAt(value, type, oracle, top, offset) {
		let rightTop = top + this.left.height, rightOffset = offset + this.left.length + this.break;
		let left = type == QueryType.ByHeight ? value < rightTop : value < rightOffset;
		let base = left ? this.left.lineAt(value, type, oracle, top, offset) : this.right.lineAt(value, type, oracle, rightTop, rightOffset);
		if (this.break || (left ? base.to < rightOffset : base.from > rightOffset)) return base;
		let subQuery = type == QueryType.ByPosNoHeight ? QueryType.ByPosNoHeight : QueryType.ByPos;
		if (left) return base.join(this.right.lineAt(rightOffset, subQuery, oracle, rightTop, rightOffset));
		else return this.left.lineAt(rightOffset, subQuery, oracle, top, offset).join(base);
	}
	forEachLine(from, to, oracle, top, offset, f) {
		let rightTop = top + this.left.height, rightOffset = offset + this.left.length + this.break;
		if (this.break) {
			if (from < rightOffset) this.left.forEachLine(from, to, oracle, top, offset, f);
			if (to >= rightOffset) this.right.forEachLine(from, to, oracle, rightTop, rightOffset, f);
		} else {
			let mid = this.lineAt(rightOffset, QueryType.ByPos, oracle, top, offset);
			if (from < mid.from) this.left.forEachLine(from, mid.from - 1, oracle, top, offset, f);
			if (mid.to >= from && mid.from <= to) f(mid);
			if (to > mid.to) this.right.forEachLine(mid.to + 1, to, oracle, rightTop, rightOffset, f);
		}
	}
	replace(from, to, nodes) {
		let rightStart = this.left.length + this.break;
		if (to < rightStart) return this.balanced(this.left.replace(from, to, nodes), this.right);
		if (from > this.left.length) return this.balanced(this.left, this.right.replace(from - rightStart, to - rightStart, nodes));
		let result = [];
		if (from > 0) this.decomposeLeft(from, result);
		let left = result.length;
		for (let node of nodes) result.push(node);
		if (from > 0) mergeGaps(result, left - 1);
		if (to < this.length) {
			let right = result.length;
			this.decomposeRight(to, result);
			mergeGaps(result, right);
		}
		return HeightMap.of(result);
	}
	decomposeLeft(to, result) {
		let left = this.left.length;
		if (to <= left) return this.left.decomposeLeft(to, result);
		result.push(this.left);
		if (this.break) {
			left++;
			if (to >= left) result.push(null);
		}
		if (to > left) this.right.decomposeLeft(to - left, result);
	}
	decomposeRight(from, result) {
		let left = this.left.length, right = left + this.break;
		if (from >= right) return this.right.decomposeRight(from - right, result);
		if (from < left) this.left.decomposeRight(from, result);
		if (this.break && from < right) result.push(null);
		result.push(this.right);
	}
	balanced(left, right) {
		if (left.size > 2 * right.size || right.size > 2 * left.size) return HeightMap.of(this.break ? [
			left,
			null,
			right
		] : [left, right]);
		this.left = replace(this.left, left);
		this.right = replace(this.right, right);
		this.setHeight(left.height + right.height);
		this.outdated = left.outdated || right.outdated;
		this.size = left.size + right.size;
		this.length = left.length + this.break + right.length;
		return this;
	}
	updateHeight(oracle, offset = 0, force = false, measured) {
		let { left, right } = this, rightStart = offset + left.length + this.break, rebalance = null;
		if (measured && measured.from <= offset + left.length && measured.more) rebalance = left = left.updateHeight(oracle, offset, force, measured);
		else left.updateHeight(oracle, offset, force);
		if (measured && measured.from <= rightStart + right.length && measured.more) rebalance = right = right.updateHeight(oracle, rightStart, force, measured);
		else right.updateHeight(oracle, rightStart, force);
		if (rebalance) return this.balanced(left, right);
		this.height = this.left.height + this.right.height;
		this.outdated = false;
		return this;
	}
	toString() {
		return this.left + (this.break ? " " : "-") + this.right;
	}
};
function mergeGaps(nodes, around) {
	let before, after;
	if (nodes[around] == null && (before = nodes[around - 1]) instanceof HeightMapGap && (after = nodes[around + 1]) instanceof HeightMapGap) nodes.splice(around - 1, 3, new HeightMapGap(before.length + 1 + after.length));
}
var relevantWidgetHeight = 5;
var NodeBuilder = class NodeBuilder {
	constructor(pos, oracle) {
		this.pos = pos;
		this.oracle = oracle;
		this.nodes = [];
		this.lineStart = -1;
		this.lineEnd = -1;
		this.covering = null;
		this.writtenTo = pos;
	}
	get isCovered() {
		return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
	}
	span(_from, to) {
		if (this.lineStart > -1) {
			let end = Math.min(to, this.lineEnd), last = this.nodes[this.nodes.length - 1];
			if (last instanceof HeightMapText) last.length += end - this.pos;
			else if (end > this.pos || !this.isCovered) this.nodes.push(new HeightMapText(end - this.pos, -1, 0));
			this.writtenTo = end;
			if (to > end) {
				this.nodes.push(null);
				this.writtenTo++;
				this.lineStart = -1;
			}
		}
		this.pos = to;
	}
	point(from, to, deco) {
		if (from < to || deco.heightRelevant) {
			let height = deco.widget ? deco.widget.estimatedHeight : 0;
			let breaks = deco.widget ? deco.widget.lineBreaks : 0;
			if (height < 0) height = this.oracle.lineHeight;
			let len = to - from;
			if (deco.block) this.addBlock(new HeightMapBlock(len, height, deco));
			else if (len || breaks || height >= relevantWidgetHeight) this.addLineDeco(height, breaks, len);
		} else if (to > from) this.span(from, to);
		if (this.lineEnd > -1 && this.lineEnd < this.pos) this.lineEnd = this.oracle.doc.lineAt(this.pos).to;
	}
	enterLine() {
		if (this.lineStart > -1) return;
		let { from, to } = this.oracle.doc.lineAt(this.pos);
		this.lineStart = from;
		this.lineEnd = to;
		if (this.writtenTo < from) {
			if (this.writtenTo < from - 1 || this.nodes[this.nodes.length - 1] == null) this.nodes.push(this.blankContent(this.writtenTo, from - 1));
			this.nodes.push(null);
		}
		if (this.pos > from) this.nodes.push(new HeightMapText(this.pos - from, -1, 0));
		this.writtenTo = this.pos;
	}
	blankContent(from, to) {
		let gap = new HeightMapGap(to - from);
		if (this.oracle.doc.lineAt(from).to == to) gap.flags |= 4;
		return gap;
	}
	ensureLine() {
		this.enterLine();
		let last = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
		if (last instanceof HeightMapText) return last;
		let line = new HeightMapText(0, -1, 0);
		this.nodes.push(line);
		return line;
	}
	addBlock(block) {
		this.enterLine();
		let deco = block.deco;
		if (deco && deco.startSide > 0 && !this.isCovered) this.ensureLine();
		this.nodes.push(block);
		this.writtenTo = this.pos = this.pos + block.length;
		if (deco && deco.endSide > 0) this.covering = block;
	}
	addLineDeco(height, breaks, length) {
		let line = this.ensureLine();
		line.length += length;
		line.collapsed += length;
		line.widgetHeight = Math.max(line.widgetHeight, height);
		line.breaks += breaks;
		this.writtenTo = this.pos = this.pos + length;
	}
	finish(from) {
		let last = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
		if (this.lineStart > -1 && !(last instanceof HeightMapText) && !this.isCovered) this.nodes.push(new HeightMapText(0, -1, 0));
		else if (this.writtenTo < this.pos || last == null) this.nodes.push(this.blankContent(this.writtenTo, this.pos));
		let pos = from;
		for (let node of this.nodes) {
			if (node instanceof HeightMapText) node.updateHeight(this.oracle, pos);
			pos += node ? node.length : 1;
		}
		return this.nodes;
	}
	static build(oracle, decorations, from, to) {
		let builder = new NodeBuilder(from, oracle);
		RangeSet.spans(decorations, from, to, builder, 0);
		return builder.finish(from);
	}
};
function heightRelevantDecoChanges(a, b, diff) {
	let comp = new DecorationComparator();
	RangeSet.compare(a, b, diff, comp, 0);
	return comp.changes;
}
var DecorationComparator = class {
	constructor() {
		this.changes = [];
	}
	compareRange() {}
	comparePoint(from, to, a, b) {
		if (from < to || a && a.heightRelevant || b && b.heightRelevant) addRange(from, to, this.changes, 5);
	}
};
function visiblePixelRange(dom, paddingTop) {
	let rect = dom.getBoundingClientRect();
	let doc = dom.ownerDocument, win = doc.defaultView || window;
	let left = Math.max(0, rect.left), right = Math.min(win.innerWidth, rect.right);
	let top = Math.max(0, rect.top), bottom = Math.min(win.innerHeight, rect.bottom);
	for (let parent = dom.parentNode; parent && parent != doc.body;) if (parent.nodeType == 1) {
		let elt = parent;
		let style = window.getComputedStyle(elt);
		if ((elt.scrollHeight > elt.clientHeight || elt.scrollWidth > elt.clientWidth) && style.overflow != "visible") {
			let parentRect = elt.getBoundingClientRect();
			left = Math.max(left, parentRect.left);
			right = Math.min(right, parentRect.right);
			top = Math.max(top, parentRect.top);
			bottom = Math.min(parent == dom.parentNode ? win.innerHeight : bottom, parentRect.bottom);
		}
		parent = style.position == "absolute" || style.position == "fixed" ? elt.offsetParent : elt.parentNode;
	} else if (parent.nodeType == 11) parent = parent.host;
	else break;
	return {
		left: left - rect.left,
		right: Math.max(left, right) - rect.left,
		top: top - (rect.top + paddingTop),
		bottom: Math.max(top, bottom) - (rect.top + paddingTop)
	};
}
function inWindow(elt) {
	let rect = elt.getBoundingClientRect(), win = elt.ownerDocument.defaultView || window;
	return rect.left < win.innerWidth && rect.right > 0 && rect.top < win.innerHeight && rect.bottom > 0;
}
function fullPixelRange(dom, paddingTop) {
	let rect = dom.getBoundingClientRect();
	return {
		left: 0,
		right: rect.right - rect.left,
		top: paddingTop,
		bottom: rect.bottom - (rect.top + paddingTop)
	};
}
var LineGap = class {
	constructor(from, to, size, displaySize) {
		this.from = from;
		this.to = to;
		this.size = size;
		this.displaySize = displaySize;
	}
	static same(a, b) {
		if (a.length != b.length) return false;
		for (let i = 0; i < a.length; i++) {
			let gA = a[i], gB = b[i];
			if (gA.from != gB.from || gA.to != gB.to || gA.size != gB.size) return false;
		}
		return true;
	}
	draw(viewState, wrapping) {
		return Decoration.replace({ widget: new LineGapWidget(this.displaySize * (wrapping ? viewState.scaleY : viewState.scaleX), wrapping) }).range(this.from, this.to);
	}
};
var LineGapWidget = class extends WidgetType {
	constructor(size, vertical) {
		super();
		this.size = size;
		this.vertical = vertical;
	}
	eq(other) {
		return other.size == this.size && other.vertical == this.vertical;
	}
	toDOM() {
		let elt = document.createElement("div");
		if (this.vertical) elt.style.height = this.size + "px";
		else {
			elt.style.width = this.size + "px";
			elt.style.height = "2px";
			elt.style.display = "inline-block";
		}
		return elt;
	}
	get estimatedHeight() {
		return this.vertical ? this.size : -1;
	}
};
var ViewState = class {
	constructor(view, state) {
		this.view = view;
		this.state = state;
		this.pixelViewport = {
			left: 0,
			right: window.innerWidth,
			top: 0,
			bottom: 0
		};
		this.inView = true;
		this.paddingTop = 0;
		this.paddingBottom = 0;
		this.contentDOMWidth = 0;
		this.contentDOMHeight = 0;
		this.editorHeight = 0;
		this.editorWidth = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.scrollOffset = 0;
		this.scrolledToBottom = false;
		this.scrollAnchorPos = 0;
		this.scrollAnchorHeight = -1;
		this.scaler = IdScaler;
		this.scrollTarget = null;
		this.printing = false;
		this.mustMeasureContent = true;
		this.defaultTextDirection = Direction.LTR;
		this.visibleRanges = [];
		this.mustEnforceCursorAssoc = false;
		let guessWrapping = state.facet(contentAttributes).some((v) => typeof v != "function" && v.class == "cm-lineWrapping");
		this.heightOracle = new HeightOracle(guessWrapping);
		this.stateDeco = staticDeco(state);
		this.heightMap = HeightMap.empty().applyChanges(this.stateDeco, Text.empty, this.heightOracle.setDoc(state.doc), [new ChangedRange(0, 0, 0, state.doc.length)]);
		for (let i = 0; i < 2; i++) {
			this.viewport = this.getViewport(0, null);
			if (!this.updateForViewport()) break;
		}
		this.updateViewportLines();
		this.lineGaps = this.ensureLineGaps([]);
		this.lineGapDeco = Decoration.set(this.lineGaps.map((gap) => gap.draw(this, false)));
		this.scrollParent = view.scrollDOM;
		this.computeVisibleRanges();
	}
	updateForViewport() {
		let viewports = [this.viewport], { main } = this.state.selection;
		for (let i = 0; i <= 1; i++) {
			let pos = i ? main.head : main.anchor;
			if (!viewports.some(({ from, to }) => pos >= from && pos <= to)) {
				let { from, to } = this.lineBlockAt(pos);
				viewports.push(new Viewport(from, to));
			}
		}
		this.viewports = viewports.sort((a, b) => a.from - b.from);
		return this.updateScaler();
	}
	updateScaler() {
		let scaler = this.scaler;
		this.scaler = this.heightMap.height <= 7e6 ? IdScaler : new BigScaler(this.heightOracle, this.heightMap, this.viewports);
		return scaler.eq(this.scaler) ? 0 : 2;
	}
	updateViewportLines() {
		this.viewportLines = [];
		this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (block) => {
			this.viewportLines.push(scaleBlock(block, this.scaler));
		});
	}
	update(update, scrollTarget = null) {
		this.state = update.state;
		let prevDeco = this.stateDeco;
		this.stateDeco = staticDeco(this.state);
		let contentChanges = update.changedRanges;
		let heightChanges = ChangedRange.extendWithRanges(contentChanges, heightRelevantDecoChanges(prevDeco, this.stateDeco, update ? update.changes : ChangeSet.empty(this.state.doc.length)));
		let prevHeight = this.heightMap.height;
		let scrollAnchor = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
		clearHeightChangeFlag();
		this.heightMap = this.heightMap.applyChanges(this.stateDeco, update.startState.doc, this.heightOracle.setDoc(this.state.doc), heightChanges);
		if (this.heightMap.height != prevHeight || heightChangeFlag) update.flags |= 2;
		if (scrollAnchor) {
			this.scrollAnchorPos = update.changes.mapPos(scrollAnchor.from, -1);
			this.scrollAnchorHeight = scrollAnchor.top;
		} else {
			this.scrollAnchorPos = -1;
			this.scrollAnchorHeight = prevHeight;
		}
		let viewport = heightChanges.length ? this.mapViewport(this.viewport, update.changes) : this.viewport;
		if (scrollTarget && (scrollTarget.range.head < viewport.from || scrollTarget.range.head > viewport.to) || !this.viewportIsAppropriate(viewport)) viewport = this.getViewport(0, scrollTarget);
		let viewportChange = viewport.from != this.viewport.from || viewport.to != this.viewport.to;
		this.viewport = viewport;
		update.flags |= this.updateForViewport();
		if (viewportChange || !update.changes.empty || update.flags & 2) this.updateViewportLines();
		if (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, update.changes)));
		update.flags |= this.computeVisibleRanges(update.changes);
		if (scrollTarget) this.scrollTarget = scrollTarget;
		if (!this.mustEnforceCursorAssoc && (update.selectionSet || update.focusChanged) && update.view.lineWrapping && update.state.selection.main.empty && update.state.selection.main.assoc && !update.state.facet(nativeSelectionHidden)) this.mustEnforceCursorAssoc = true;
	}
	measure() {
		let { view } = this, dom = view.contentDOM, style = window.getComputedStyle(dom);
		let oracle = this.heightOracle;
		let whiteSpace = style.whiteSpace;
		this.defaultTextDirection = style.direction == "rtl" ? Direction.RTL : Direction.LTR;
		let refresh = this.heightOracle.mustRefreshForWrapping(whiteSpace) || this.mustMeasureContent === "refresh";
		let domRect = dom.getBoundingClientRect();
		let measureContent = refresh || this.mustMeasureContent || this.contentDOMHeight != domRect.height;
		this.contentDOMHeight = domRect.height;
		this.mustMeasureContent = false;
		let result = 0, bias = 0;
		if (domRect.width && domRect.height) {
			let { scaleX, scaleY } = getScale(dom, domRect);
			if (scaleX > .005 && Math.abs(this.scaleX - scaleX) > .005 || scaleY > .005 && Math.abs(this.scaleY - scaleY) > .005) {
				this.scaleX = scaleX;
				this.scaleY = scaleY;
				result |= 16;
				refresh = measureContent = true;
			}
		}
		let paddingTop = (parseInt(style.paddingTop) || 0) * this.scaleY;
		let paddingBottom = (parseInt(style.paddingBottom) || 0) * this.scaleY;
		if (this.paddingTop != paddingTop || this.paddingBottom != paddingBottom) {
			this.paddingTop = paddingTop;
			this.paddingBottom = paddingBottom;
			result |= 18;
		}
		if (this.editorWidth != view.scrollDOM.clientWidth) {
			if (oracle.lineWrapping) measureContent = true;
			this.editorWidth = view.scrollDOM.clientWidth;
			result |= 16;
		}
		let scrollParent = scrollableParents(this.view.contentDOM, false).y;
		if (scrollParent != this.scrollParent) {
			this.scrollParent = scrollParent;
			this.scrollAnchorHeight = -1;
			this.scrollOffset = 0;
		}
		let scrollOffset = this.getScrollOffset();
		if (this.scrollOffset != scrollOffset) {
			this.scrollAnchorHeight = -1;
			this.scrollOffset = scrollOffset;
		}
		this.scrolledToBottom = isScrolledToBottom(this.scrollParent || view.win);
		let pixelViewport = (this.printing ? fullPixelRange : visiblePixelRange)(dom, this.paddingTop);
		let dTop = pixelViewport.top - this.pixelViewport.top, dBottom = pixelViewport.bottom - this.pixelViewport.bottom;
		this.pixelViewport = pixelViewport;
		let inView = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
		if (inView != this.inView) {
			this.inView = inView;
			if (inView) measureContent = true;
		}
		if (!this.inView && !this.scrollTarget && !inWindow(view.dom)) return 0;
		let contentWidth = domRect.width;
		if (this.contentDOMWidth != contentWidth || this.editorHeight != view.scrollDOM.clientHeight) {
			this.contentDOMWidth = domRect.width;
			this.editorHeight = view.scrollDOM.clientHeight;
			result |= 16;
		}
		if (measureContent) {
			let lineHeights = view.docView.measureVisibleLineHeights(this.viewport);
			if (oracle.mustRefreshForHeights(lineHeights)) refresh = true;
			if (refresh || oracle.lineWrapping && Math.abs(contentWidth - this.contentDOMWidth) > oracle.charWidth) {
				let { lineHeight, charWidth, textHeight } = view.docView.measureTextSize();
				refresh = lineHeight > 0 && oracle.refresh(whiteSpace, lineHeight, charWidth, textHeight, Math.max(5, contentWidth / charWidth), lineHeights);
				if (refresh) {
					view.docView.minWidth = 0;
					result |= 16;
				}
			}
			if (dTop > 0 && dBottom > 0) bias = Math.max(dTop, dBottom);
			else if (dTop < 0 && dBottom < 0) bias = Math.min(dTop, dBottom);
			clearHeightChangeFlag();
			for (let vp of this.viewports) {
				let heights = vp.from == this.viewport.from ? lineHeights : view.docView.measureVisibleLineHeights(vp);
				this.heightMap = (refresh ? HeightMap.empty().applyChanges(this.stateDeco, Text.empty, this.heightOracle, [new ChangedRange(0, 0, 0, view.state.doc.length)]) : this.heightMap).updateHeight(oracle, 0, refresh, new MeasuredHeights(vp.from, heights));
			}
			if (heightChangeFlag) result |= 2;
		}
		let viewportChange = !this.viewportIsAppropriate(this.viewport, bias) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
		if (viewportChange) {
			if (result & 2) result |= this.updateScaler();
			this.viewport = this.getViewport(bias, this.scrollTarget);
			result |= this.updateForViewport();
		}
		if (result & 2 || viewportChange) this.updateViewportLines();
		if (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) this.updateLineGaps(this.ensureLineGaps(refresh ? [] : this.lineGaps, view));
		result |= this.computeVisibleRanges();
		if (this.mustEnforceCursorAssoc) {
			this.mustEnforceCursorAssoc = false;
			view.docView.enforceCursorAssoc();
		}
		return result;
	}
	get visibleTop() {
		return this.scaler.fromDOM(this.pixelViewport.top);
	}
	get visibleBottom() {
		return this.scaler.fromDOM(this.pixelViewport.bottom);
	}
	getViewport(bias, scrollTarget) {
		let marginTop = .5 - Math.max(-.5, Math.min(.5, bias / 1e3 / 2));
		let map = this.heightMap, oracle = this.heightOracle;
		let { visibleTop, visibleBottom } = this;
		let viewport = new Viewport(map.lineAt(visibleTop - marginTop * 1e3, QueryType.ByHeight, oracle, 0, 0).from, map.lineAt(visibleBottom + (1 - marginTop) * 1e3, QueryType.ByHeight, oracle, 0, 0).to);
		if (scrollTarget) {
			let { head } = scrollTarget.range;
			if (head < viewport.from || head > viewport.to) {
				let viewHeight = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top);
				let block = map.lineAt(head, QueryType.ByPos, oracle, 0, 0), topPos;
				if (scrollTarget.y == "center") topPos = (block.top + block.bottom) / 2 - viewHeight / 2;
				else if (scrollTarget.y == "start" || scrollTarget.y == "nearest" && head < viewport.from) topPos = block.top;
				else topPos = block.bottom - viewHeight;
				viewport = new Viewport(map.lineAt(topPos - 500, QueryType.ByHeight, oracle, 0, 0).from, map.lineAt(topPos + viewHeight + 500, QueryType.ByHeight, oracle, 0, 0).to);
			}
		}
		return viewport;
	}
	mapViewport(viewport, changes) {
		let from = changes.mapPos(viewport.from, -1), to = changes.mapPos(viewport.to, 1);
		return new Viewport(this.heightMap.lineAt(from, QueryType.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(to, QueryType.ByPos, this.heightOracle, 0, 0).to);
	}
	viewportIsAppropriate({ from, to }, bias = 0) {
		if (!this.inView) return true;
		let { top } = this.heightMap.lineAt(from, QueryType.ByPos, this.heightOracle, 0, 0);
		let { bottom } = this.heightMap.lineAt(to, QueryType.ByPos, this.heightOracle, 0, 0);
		let { visibleTop, visibleBottom } = this;
		return (from == 0 || top <= visibleTop - Math.max(10, Math.min(-bias, 250))) && (to == this.state.doc.length || bottom >= visibleBottom + Math.max(10, Math.min(bias, 250))) && top > visibleTop - 2e3 && bottom < visibleBottom + 2e3;
	}
	mapLineGaps(gaps, changes) {
		if (!gaps.length || changes.empty) return gaps;
		let mapped = [];
		for (let gap of gaps) if (!changes.touchesRange(gap.from, gap.to)) mapped.push(new LineGap(changes.mapPos(gap.from), changes.mapPos(gap.to), gap.size, gap.displaySize));
		return mapped;
	}
	ensureLineGaps(current, mayMeasure) {
		let wrapping = this.heightOracle.lineWrapping;
		let margin = wrapping ? 1e4 : 2e3, halfMargin = margin >> 1, doubleMargin = margin << 1;
		if (this.defaultTextDirection != Direction.LTR && !wrapping) return [];
		let gaps = [];
		let addGap = (from, to, line, structure) => {
			if (to - from < halfMargin) return;
			let sel = this.state.selection.main, avoid = [sel.from];
			if (!sel.empty) avoid.push(sel.to);
			for (let pos of avoid) if (pos > from && pos < to) {
				addGap(from, pos - 10, line, structure);
				addGap(pos + 10, to, line, structure);
				return;
			}
			let gap = find(current, (gap) => gap.from >= line.from && gap.to <= line.to && Math.abs(gap.from - from) < halfMargin && Math.abs(gap.to - to) < halfMargin && !avoid.some((pos) => gap.from < pos && gap.to > pos));
			if (!gap) {
				if (to < line.to && mayMeasure && wrapping && mayMeasure.visibleRanges.some((r) => r.from <= to && r.to >= to)) {
					let lineStart = mayMeasure.moveToLineBoundary(EditorSelection.cursor(to), false, true).head;
					if (lineStart > from) to = lineStart;
				}
				let size = this.gapSize(line, from, to, structure);
				gap = new LineGap(from, to, size, wrapping || size < 2e6 ? size : 2e6);
			}
			gaps.push(gap);
		};
		let checkLine = (line) => {
			if (line.length < doubleMargin || line.type != BlockType.Text) return;
			let structure = lineStructure(line.from, line.to, this.stateDeco);
			if (structure.total < doubleMargin) return;
			let target = this.scrollTarget ? this.scrollTarget.range.head : null;
			let viewFrom, viewTo;
			if (wrapping) {
				let marginHeight = margin / this.heightOracle.lineLength * this.heightOracle.lineHeight;
				let top, bot;
				if (target != null) {
					let targetFrac = findFraction(structure, target);
					let spaceFrac = ((this.visibleBottom - this.visibleTop) / 2 + marginHeight) / line.height;
					top = targetFrac - spaceFrac;
					bot = targetFrac + spaceFrac;
				} else {
					top = (this.visibleTop - line.top - marginHeight) / line.height;
					bot = (this.visibleBottom - line.top + marginHeight) / line.height;
				}
				viewFrom = findPosition(structure, top);
				viewTo = findPosition(structure, bot);
			} else {
				let totalWidth = structure.total * this.heightOracle.charWidth;
				let marginWidth = margin * this.heightOracle.charWidth;
				let horizOffset = 0;
				if (totalWidth > 2e6) {
					for (let old of current) if (old.from >= line.from && old.from < line.to && old.size != old.displaySize && old.from * this.heightOracle.charWidth + horizOffset < this.pixelViewport.left) horizOffset = old.size - old.displaySize;
				}
				let pxLeft = this.pixelViewport.left + horizOffset, pxRight = this.pixelViewport.right + horizOffset;
				let left, right;
				if (target != null) {
					let targetFrac = findFraction(structure, target);
					let spaceFrac = ((pxRight - pxLeft) / 2 + marginWidth) / totalWidth;
					left = targetFrac - spaceFrac;
					right = targetFrac + spaceFrac;
				} else {
					left = (pxLeft - marginWidth) / totalWidth;
					right = (pxRight + marginWidth) / totalWidth;
				}
				viewFrom = findPosition(structure, left);
				viewTo = findPosition(structure, right);
			}
			if (viewFrom > line.from) addGap(line.from, viewFrom, line, structure);
			if (viewTo < line.to) addGap(viewTo, line.to, line, structure);
		};
		for (let line of this.viewportLines) if (Array.isArray(line.type)) line.type.forEach(checkLine);
		else checkLine(line);
		return gaps;
	}
	gapSize(line, from, to, structure) {
		let fraction = findFraction(structure, to) - findFraction(structure, from);
		if (this.heightOracle.lineWrapping) return line.height * fraction;
		else return structure.total * this.heightOracle.charWidth * fraction;
	}
	updateLineGaps(gaps) {
		if (!LineGap.same(gaps, this.lineGaps)) {
			this.lineGaps = gaps;
			this.lineGapDeco = Decoration.set(gaps.map((gap) => gap.draw(this, this.heightOracle.lineWrapping)));
		}
	}
	computeVisibleRanges(changes) {
		let deco = this.stateDeco;
		if (this.lineGaps.length) deco = deco.concat(this.lineGapDeco);
		let ranges = [];
		RangeSet.spans(deco, this.viewport.from, this.viewport.to, {
			span(from, to) {
				ranges.push({
					from,
					to
				});
			},
			point() {}
		}, 20);
		let changed = 0;
		if (ranges.length != this.visibleRanges.length) changed = 12;
		else for (let i = 0; i < ranges.length && !(changed & 8); i++) {
			let old = this.visibleRanges[i], nw = ranges[i];
			if (old.from != nw.from || old.to != nw.to) {
				changed |= 4;
				if (!(changes && changes.mapPos(old.from, -1) == nw.from && changes.mapPos(old.to, 1) == nw.to)) changed |= 8;
			}
		}
		this.visibleRanges = ranges;
		return changed;
	}
	lineBlockAt(pos) {
		return pos >= this.viewport.from && pos <= this.viewport.to && this.viewportLines.find((b) => b.from <= pos && b.to >= pos) || scaleBlock(this.heightMap.lineAt(pos, QueryType.ByPos, this.heightOracle, 0, 0), this.scaler);
	}
	lineBlockAtHeight(height) {
		return height >= this.viewportLines[0].top && height <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((l) => l.top <= height && l.bottom >= height) || scaleBlock(this.heightMap.lineAt(this.scaler.fromDOM(height), QueryType.ByHeight, this.heightOracle, 0, 0), this.scaler);
	}
	getScrollOffset() {
		return (this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top) * this.scaleY;
	}
	scrollAnchorAt(scrollOffset) {
		let block = this.lineBlockAtHeight(scrollOffset + 8);
		return block.from >= this.viewport.from || this.viewportLines[0].top - scrollOffset > 200 ? block : this.viewportLines[0];
	}
	elementAtHeight(height) {
		return scaleBlock(this.heightMap.blockAt(this.scaler.fromDOM(height), this.heightOracle, 0, 0), this.scaler);
	}
	get docHeight() {
		return this.scaler.toDOM(this.heightMap.height);
	}
	get contentHeight() {
		return this.docHeight + this.paddingTop + this.paddingBottom;
	}
};
var Viewport = class {
	constructor(from, to) {
		this.from = from;
		this.to = to;
	}
};
function lineStructure(from, to, stateDeco) {
	let ranges = [], pos = from, total = 0;
	RangeSet.spans(stateDeco, from, to, {
		span() {},
		point(from, to) {
			if (from > pos) {
				ranges.push({
					from: pos,
					to: from
				});
				total += from - pos;
			}
			pos = to;
		}
	}, 20);
	if (pos < to) {
		ranges.push({
			from: pos,
			to
		});
		total += to - pos;
	}
	return {
		total,
		ranges
	};
}
function findPosition({ total, ranges }, ratio) {
	if (ratio <= 0) return ranges[0].from;
	if (ratio >= 1) return ranges[ranges.length - 1].to;
	let dist = Math.floor(total * ratio);
	for (let i = 0;; i++) {
		let { from, to } = ranges[i], size = to - from;
		if (dist <= size) return from + dist;
		dist -= size;
	}
}
function findFraction(structure, pos) {
	let counted = 0;
	for (let { from, to } of structure.ranges) {
		if (pos <= to) {
			counted += pos - from;
			break;
		}
		counted += to - from;
	}
	return counted / structure.total;
}
function find(array, f) {
	for (let val of array) if (f(val)) return val;
}
var IdScaler = {
	toDOM(n) {
		return n;
	},
	fromDOM(n) {
		return n;
	},
	scale: 1,
	eq(other) {
		return other == this;
	}
};
function staticDeco(state) {
	let deco = state.facet(decorations).filter((d) => typeof d != "function");
	let outer = state.facet(outerDecorations).filter((d) => typeof d != "function");
	if (outer.length) deco.push(RangeSet.join(outer));
	return deco;
}
var BigScaler = class BigScaler {
	constructor(oracle, heightMap, viewports) {
		let vpHeight = 0, base = 0, domBase = 0;
		this.viewports = viewports.map(({ from, to }) => {
			let top = heightMap.lineAt(from, QueryType.ByPos, oracle, 0, 0).top;
			let bottom = heightMap.lineAt(to, QueryType.ByPos, oracle, 0, 0).bottom;
			vpHeight += bottom - top;
			return {
				from,
				to,
				top,
				bottom,
				domTop: 0,
				domBottom: 0
			};
		});
		this.scale = (7e6 - vpHeight) / (heightMap.height - vpHeight);
		for (let obj of this.viewports) {
			obj.domTop = domBase + (obj.top - base) * this.scale;
			domBase = obj.domBottom = obj.domTop + (obj.bottom - obj.top);
			base = obj.bottom;
		}
	}
	toDOM(n) {
		for (let i = 0, base = 0, domBase = 0;; i++) {
			let vp = i < this.viewports.length ? this.viewports[i] : null;
			if (!vp || n < vp.top) return domBase + (n - base) * this.scale;
			if (n <= vp.bottom) return vp.domTop + (n - vp.top);
			base = vp.bottom;
			domBase = vp.domBottom;
		}
	}
	fromDOM(n) {
		for (let i = 0, base = 0, domBase = 0;; i++) {
			let vp = i < this.viewports.length ? this.viewports[i] : null;
			if (!vp || n < vp.domTop) return base + (n - domBase) / this.scale;
			if (n <= vp.domBottom) return vp.top + (n - vp.domTop);
			base = vp.bottom;
			domBase = vp.domBottom;
		}
	}
	eq(other) {
		if (!(other instanceof BigScaler)) return false;
		return this.scale == other.scale && this.viewports.length == other.viewports.length && this.viewports.every((vp, i) => vp.from == other.viewports[i].from && vp.to == other.viewports[i].to);
	}
};
function scaleBlock(block, scaler) {
	if (scaler.scale == 1) return block;
	let bTop = scaler.toDOM(block.top), bBottom = scaler.toDOM(block.bottom);
	return new BlockInfo(block.from, block.length, bTop, bBottom - bTop, Array.isArray(block._content) ? block._content.map((b) => scaleBlock(b, scaler)) : block._content);
}
var theme$1 = Facet.define({ combine: (strs) => strs.join(" ") });
var darkTheme = Facet.define({ combine: (values) => values.indexOf(true) > -1 });
var baseThemeID = StyleModule.newName();
var baseLightID = StyleModule.newName();
var baseDarkID = StyleModule.newName();
var lightDarkIDs = {
	"&light": "." + baseLightID,
	"&dark": "." + baseDarkID
};
function buildTheme(main, spec, scopes) {
	return new StyleModule(spec, { finish(sel) {
		return /&/.test(sel) ? sel.replace(/&\w*/, (m) => {
			if (m == "&") return main;
			if (!scopes || !scopes[m]) throw new RangeError(`Unsupported selector: ${m}`);
			return scopes[m];
		}) : main + " " + sel;
	} });
}
var baseTheme$1$2 = buildTheme("." + baseThemeID, {
	"&": {
		position: "relative !important",
		boxSizing: "border-box",
		"&.cm-focused": { outline: "1px dotted #212121" },
		display: "flex !important",
		flexDirection: "column"
	},
	".cm-scroller": {
		display: "flex !important",
		alignItems: "flex-start !important",
		fontFamily: "monospace",
		lineHeight: 1.4,
		height: "100%",
		overflowX: "auto",
		position: "relative",
		zIndex: 0,
		overflowAnchor: "none"
	},
	".cm-content": {
		margin: 0,
		flexGrow: 2,
		flexShrink: 0,
		display: "block",
		whiteSpace: "pre",
		wordWrap: "normal",
		boxSizing: "border-box",
		minHeight: "100%",
		padding: "4px 0",
		outline: "none",
		"&[contenteditable=true]": { WebkitUserModify: "read-write-plaintext-only" }
	},
	".cm-lineWrapping": {
		whiteSpace_fallback: "pre-wrap",
		whiteSpace: "break-spaces",
		wordBreak: "break-word",
		overflowWrap: "anywhere",
		flexShrink: 1
	},
	"&light .cm-content": { caretColor: "black" },
	"&dark .cm-content": { caretColor: "white" },
	".cm-line": {
		display: "block",
		padding: "0 2px 0 6px"
	},
	".cm-layer": {
		userSelect: "none",
		position: "absolute",
		left: 0,
		top: 0,
		contain: "size style",
		"& > *": { position: "absolute" }
	},
	"&light .cm-selectionBackground": { background: "#d9d9d9" },
	"&dark .cm-selectionBackground": { background: "#222" },
	"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": { background: "#d7d4f0" },
	"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": { background: "#233" },
	".cm-cursorLayer": { pointerEvents: "none" },
	"&.cm-focused > .cm-scroller > .cm-cursorLayer": { animation: "steps(1) cm-blink 1.2s infinite" },
	"@keyframes cm-blink": {
		"0%": {},
		"50%": { opacity: 0 },
		"100%": {}
	},
	"@keyframes cm-blink2": {
		"0%": {},
		"50%": { opacity: 0 },
		"100%": {}
	},
	".cm-cursor, .cm-dropCursor": {
		borderLeft: "1.2px solid black",
		marginLeft: "-0.6px",
		pointerEvents: "none"
	},
	".cm-cursor": { display: "none" },
	"&dark .cm-cursor": { borderLeftColor: "#ddd" },
	".cm-selectionHandle": {
		backgroundColor: "currentColor",
		width: "1.5px"
	},
	".cm-selectionHandle-start::before, .cm-selectionHandle-end::before": {
		content: "\"\"",
		backgroundColor: "inherit",
		borderRadius: "50%",
		width: "8px",
		height: "8px",
		position: "absolute",
		left: "-3.25px"
	},
	".cm-selectionHandle-start::before": { top: "-8px" },
	".cm-selectionHandle-end::before": { bottom: "-8px" },
	".cm-dropCursor": { position: "absolute" },
	"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": { display: "block" },
	".cm-iso": { unicodeBidi: "isolate" },
	".cm-announced": {
		position: "fixed",
		top: "-10000px"
	},
	"@media print": { ".cm-announced": { display: "none" } },
	"&light .cm-activeLine": { backgroundColor: "#cceeff44" },
	"&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
	"&light .cm-specialChar": { color: "red" },
	"&dark .cm-specialChar": { color: "#f78" },
	".cm-gutters": {
		flexShrink: 0,
		display: "flex",
		height: "100%",
		boxSizing: "border-box",
		zIndex: 200
	},
	".cm-gutters-before": { insetInlineStart: 0 },
	".cm-gutters-after": { insetInlineEnd: 0 },
	"&light .cm-gutters": {
		backgroundColor: "#f5f5f5",
		color: "#6c6c6c",
		border: "0px solid #ddd",
		"&.cm-gutters-before": { borderRightWidth: "1px" },
		"&.cm-gutters-after": { borderLeftWidth: "1px" }
	},
	"&dark .cm-gutters": {
		backgroundColor: "#333338",
		color: "#ccc"
	},
	".cm-gutter": {
		display: "flex !important",
		flexDirection: "column",
		flexShrink: 0,
		boxSizing: "border-box",
		minHeight: "100%",
		overflow: "hidden"
	},
	".cm-gutterElement": { boxSizing: "border-box" },
	".cm-lineNumbers .cm-gutterElement": {
		padding: "0 3px 0 5px",
		minWidth: "20px",
		textAlign: "right",
		whiteSpace: "nowrap"
	},
	"&light .cm-activeLineGutter": { backgroundColor: "#e2f2ff" },
	"&dark .cm-activeLineGutter": { backgroundColor: "#222227" },
	".cm-panels": {
		boxSizing: "border-box",
		position: "sticky",
		left: 0,
		right: 0,
		zIndex: 300
	},
	"&light .cm-panels": {
		backgroundColor: "#f5f5f5",
		color: "black"
	},
	".cm-panels-top": { top: "0" },
	".cm-panels-bottom": { bottom: "0" },
	"&light .cm-panels-top": { borderBottom: "1px solid #ddd" },
	"&light .cm-panels-bottom": { borderTop: "1px solid #ddd" },
	"&dark .cm-panels": {
		backgroundColor: "#333338",
		color: "white"
	},
	".cm-dialog": {
		padding: "2px 19px 4px 6px",
		position: "relative",
		"& label": { fontSize: "80%" }
	},
	".cm-dialog-close": {
		position: "absolute",
		top: "3px",
		right: "4px",
		backgroundColor: "inherit",
		border: "none",
		font: "inherit",
		fontSize: "14px",
		padding: "0"
	},
	".cm-tab": {
		display: "inline-block",
		overflow: "hidden",
		verticalAlign: "bottom"
	},
	".cm-widgetBuffer": {
		verticalAlign: "text-top",
		height: "1em",
		width: 0,
		display: "inline"
	},
	".cm-placeholder": {
		color: "#888",
		display: "inline-block",
		verticalAlign: "top",
		userSelect: "none"
	},
	".cm-highlightSpace": {
		backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",
		backgroundPosition: "center"
	},
	".cm-highlightTab": {
		backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
		backgroundSize: "auto 100%",
		backgroundPosition: "right 90%",
		backgroundRepeat: "no-repeat"
	},
	".cm-trailingSpace": { backgroundColor: "#ff332255" },
	".cm-button": {
		verticalAlign: "middle",
		color: "inherit",
		fontSize: "70%",
		padding: ".2em 1em",
		borderRadius: "1px"
	},
	"&light .cm-button": {
		backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
		border: "1px solid #888",
		"&:active": { backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)" }
	},
	"&dark .cm-button": {
		backgroundImage: "linear-gradient(#393939, #111)",
		border: "1px solid #888",
		"&:active": { backgroundImage: "linear-gradient(#111, #333)" }
	},
	".cm-textfield": {
		verticalAlign: "middle",
		color: "inherit",
		fontSize: "70%",
		border: "1px solid silver",
		padding: ".2em .5em"
	},
	"&light .cm-textfield": { backgroundColor: "white" },
	"&dark .cm-textfield": {
		border: "1px solid #555",
		backgroundColor: "inherit"
	}
}, lightDarkIDs);
var observeOptions = {
	childList: true,
	characterData: true,
	subtree: true,
	attributes: true,
	characterDataOldValue: true
};
var useCharData = browser.ie && browser.ie_version <= 11;
var DOMObserver = class {
	constructor(view) {
		this.view = view;
		this.active = false;
		this.editContext = null;
		this.selectionRange = new DOMSelectionState();
		this.selectionChanged = false;
		this.delayedFlush = -1;
		this.resizeTimeout = -1;
		this.queue = [];
		this.delayedAndroidKey = null;
		this.flushingAndroidKey = -1;
		this.lastChange = 0;
		this.scrollTargets = [];
		this.intersection = null;
		this.resizeScroll = null;
		this.intersecting = false;
		this.gapIntersection = null;
		this.gaps = [];
		this.printQuery = null;
		this.parentCheck = -1;
		this.dom = view.contentDOM;
		this.observer = new MutationObserver((mutations) => {
			for (let mut of mutations) this.queue.push(mut);
			if ((browser.ie && browser.ie_version <= 11 || browser.ios && view.composing) && mutations.some((m) => m.type == "childList" && m.removedNodes.length || m.type == "characterData" && m.oldValue.length > m.target.nodeValue.length)) this.flushSoon();
			else this.flush();
		});
		if (window.EditContext && browser.android && view.constructor.EDIT_CONTEXT !== false && !(browser.chrome && browser.chrome_version < 126)) {
			this.editContext = new EditContextManager(view);
			if (view.state.facet(editable)) view.contentDOM.editContext = this.editContext.editContext;
		}
		if (useCharData) this.onCharData = (event) => {
			this.queue.push({
				target: event.target,
				type: "characterData",
				oldValue: event.prevValue
			});
			this.flushSoon();
		};
		this.onSelectionChange = this.onSelectionChange.bind(this);
		this.onResize = this.onResize.bind(this);
		this.onPrint = this.onPrint.bind(this);
		this.onScroll = this.onScroll.bind(this);
		if (window.matchMedia) this.printQuery = window.matchMedia("print");
		if (typeof ResizeObserver == "function") {
			this.resizeScroll = new ResizeObserver(() => {
				var _a;
				if (((_a = this.view.docView) === null || _a === void 0 ? void 0 : _a.lastUpdate) < Date.now() - 75) this.onResize();
			});
			this.resizeScroll.observe(view.scrollDOM);
		}
		this.addWindowListeners(this.win = view.win);
		this.start();
		if (typeof IntersectionObserver == "function") {
			this.intersection = new IntersectionObserver((entries) => {
				if (this.parentCheck < 0) this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3);
				if (entries.length > 0 && entries[entries.length - 1].intersectionRatio > 0 != this.intersecting) {
					this.intersecting = !this.intersecting;
					if (this.intersecting != this.view.inView) this.onScrollChanged(document.createEvent("Event"));
				}
			}, { threshold: [0, .001] });
			this.intersection.observe(this.dom);
			this.gapIntersection = new IntersectionObserver((entries) => {
				if (entries.length > 0 && entries[entries.length - 1].intersectionRatio > 0) this.onScrollChanged(document.createEvent("Event"));
			}, {});
		}
		this.listenForScroll();
		this.readSelectionRange();
	}
	onScrollChanged(e) {
		this.view.inputState.runHandlers("scroll", e);
		if (this.intersecting) this.view.measure();
	}
	onScroll(e) {
		if (this.intersecting) this.flush(false);
		if (this.editContext) this.view.requestMeasure(this.editContext.measureReq);
		this.onScrollChanged(e);
	}
	onResize() {
		if (this.resizeTimeout < 0) this.resizeTimeout = setTimeout(() => {
			this.resizeTimeout = -1;
			this.view.requestMeasure();
		}, 50);
	}
	onPrint(event) {
		if ((event.type == "change" || !event.type) && !event.matches) return;
		this.view.viewState.printing = true;
		this.view.measure();
		setTimeout(() => {
			this.view.viewState.printing = false;
			this.view.requestMeasure();
		}, 500);
	}
	updateGaps(gaps) {
		if (this.gapIntersection && (gaps.length != this.gaps.length || this.gaps.some((g, i) => g != gaps[i]))) {
			this.gapIntersection.disconnect();
			for (let gap of gaps) this.gapIntersection.observe(gap);
			this.gaps = gaps;
		}
	}
	onSelectionChange(event) {
		let wasChanged = this.selectionChanged;
		if (!this.readSelectionRange() || this.delayedAndroidKey) return;
		let { view } = this, sel = this.selectionRange;
		if (view.state.facet(editable) ? view.root.activeElement != this.dom : !hasSelection(this.dom, sel)) return;
		let context = sel.anchorNode && view.docView.tile.nearest(sel.anchorNode);
		if (context && context.isWidget() && context.widget.ignoreEvent(event)) {
			if (!wasChanged) this.selectionChanged = false;
			return;
		}
		if ((browser.ie && browser.ie_version <= 11 || browser.android && browser.chrome) && !view.state.selection.main.empty && sel.focusNode && isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset)) this.flushSoon();
		else this.flush(false);
	}
	readSelectionRange() {
		let { view } = this;
		let selection = getSelection(view.root);
		if (!selection) return false;
		let range = browser.safari && view.root.nodeType == 11 && view.root.activeElement == this.dom && safariSelectionRangeHack(this.view, selection) || selection;
		if (!range || this.selectionRange.eq(range)) return false;
		let local = hasSelection(this.dom, range);
		if (local && !this.selectionChanged && view.inputState.lastFocusTime > Date.now() - 200 && view.inputState.lastTouchTime < Date.now() - 300 && atElementStart(this.dom, range)) {
			this.view.inputState.lastFocusTime = 0;
			view.docView.updateSelection();
			return false;
		}
		this.selectionRange.setRange(range);
		if (local) this.selectionChanged = true;
		return true;
	}
	setSelectionRange(anchor, head) {
		this.selectionRange.set(anchor.node, anchor.offset, head.node, head.offset);
		this.selectionChanged = false;
	}
	clearSelectionRange() {
		this.selectionRange.set(null, 0, null, 0);
	}
	listenForScroll() {
		this.parentCheck = -1;
		let i = 0, changed = null;
		for (let dom = this.dom; dom;) if (dom.nodeType == 1) {
			if (!changed && i < this.scrollTargets.length && this.scrollTargets[i] == dom) i++;
			else if (!changed) changed = this.scrollTargets.slice(0, i);
			if (changed) changed.push(dom);
			dom = dom.assignedSlot || dom.parentNode;
		} else if (dom.nodeType == 11) dom = dom.host;
		else break;
		if (i < this.scrollTargets.length && !changed) changed = this.scrollTargets.slice(0, i);
		if (changed) {
			for (let dom of this.scrollTargets) dom.removeEventListener("scroll", this.onScroll);
			for (let dom of this.scrollTargets = changed) dom.addEventListener("scroll", this.onScroll);
		}
	}
	ignore(f) {
		if (!this.active) return f();
		try {
			this.stop();
			return f();
		} finally {
			this.start();
			this.clear();
		}
	}
	start() {
		if (this.active) return;
		this.observer.observe(this.dom, observeOptions);
		if (useCharData) this.dom.addEventListener("DOMCharacterDataModified", this.onCharData);
		this.active = true;
	}
	stop() {
		if (!this.active) return;
		this.active = false;
		this.observer.disconnect();
		if (useCharData) this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData);
	}
	clear() {
		this.processRecords();
		this.queue.length = 0;
		this.selectionChanged = false;
	}
	delayAndroidKey(key, keyCode) {
		var _a;
		if (!this.delayedAndroidKey) {
			let flush = () => {
				let key = this.delayedAndroidKey;
				if (key) {
					this.clearDelayedAndroidKey();
					this.view.inputState.lastKeyCode = key.keyCode;
					this.view.inputState.lastKeyTime = Date.now();
					if (!this.flush() && key.force) dispatchKey(this.dom, key.key, key.keyCode);
				}
			};
			this.flushingAndroidKey = this.view.win.requestAnimationFrame(flush);
		}
		if (!this.delayedAndroidKey || key == "Enter") this.delayedAndroidKey = {
			key,
			keyCode,
			force: this.lastChange < Date.now() - 50 || !!((_a = this.delayedAndroidKey) === null || _a === void 0 ? void 0 : _a.force)
		};
	}
	clearDelayedAndroidKey() {
		this.win.cancelAnimationFrame(this.flushingAndroidKey);
		this.delayedAndroidKey = null;
		this.flushingAndroidKey = -1;
	}
	flushSoon() {
		if (this.delayedFlush < 0) this.delayedFlush = this.view.win.requestAnimationFrame(() => {
			this.delayedFlush = -1;
			this.flush();
		});
	}
	forceFlush() {
		if (this.delayedFlush >= 0) {
			this.view.win.cancelAnimationFrame(this.delayedFlush);
			this.delayedFlush = -1;
		}
		this.flush();
	}
	pendingRecords() {
		for (let mut of this.observer.takeRecords()) this.queue.push(mut);
		return this.queue;
	}
	processRecords() {
		let records = this.pendingRecords();
		if (records.length) this.queue = [];
		let from = -1, to = -1, typeOver = false;
		for (let record of records) {
			let range = this.readMutation(record);
			if (!range) continue;
			if (range.typeOver) typeOver = true;
			if (from == -1) ({from, to} = range);
			else {
				from = Math.min(range.from, from);
				to = Math.max(range.to, to);
			}
		}
		return {
			from,
			to,
			typeOver
		};
	}
	readChange() {
		let { from, to, typeOver } = this.processRecords();
		let newSel = this.selectionChanged && hasSelection(this.dom, this.selectionRange);
		if (from < 0 && !newSel) return null;
		if (from > -1) this.lastChange = Date.now();
		this.view.inputState.lastFocusTime = 0;
		this.selectionChanged = false;
		let change = new DOMChange(this.view, from, to, typeOver);
		this.view.docView.domChanged = { newSel: change.newSel ? change.newSel.main : null };
		return change;
	}
	flush(readSelection = true) {
		if (this.delayedFlush >= 0 || this.delayedAndroidKey) return false;
		if (readSelection) this.readSelectionRange();
		let domChange = this.readChange();
		if (!domChange) {
			this.view.requestMeasure();
			return false;
		}
		let startState = this.view.state;
		let handled = applyDOMChange(this.view, domChange);
		if (this.view.state == startState && (domChange.domChanged || domChange.newSel && !sameSelPos(this.view.state.selection, domChange.newSel.main))) this.view.update([]);
		return handled;
	}
	readMutation(rec) {
		let tile = this.view.docView.tile.nearest(rec.target);
		if (!tile || tile.isWidget()) return null;
		tile.markDirty(rec.type == "attributes");
		if (rec.type == "childList") {
			let childBefore = findChild(tile, rec.previousSibling || rec.target.previousSibling, -1);
			let childAfter = findChild(tile, rec.nextSibling || rec.target.nextSibling, 1);
			return {
				from: childBefore ? tile.posAfter(childBefore) : tile.posAtStart,
				to: childAfter ? tile.posBefore(childAfter) : tile.posAtEnd,
				typeOver: false
			};
		} else if (rec.type == "characterData") return {
			from: tile.posAtStart,
			to: tile.posAtEnd,
			typeOver: rec.target.nodeValue == rec.oldValue
		};
		else return null;
	}
	setWindow(win) {
		if (win != this.win) {
			this.removeWindowListeners(this.win);
			this.win = win;
			this.addWindowListeners(this.win);
		}
	}
	addWindowListeners(win) {
		win.addEventListener("resize", this.onResize);
		if (this.printQuery) {
			if (this.printQuery.addEventListener) this.printQuery.addEventListener("change", this.onPrint);
			else this.printQuery.addListener(this.onPrint);
		} else win.addEventListener("beforeprint", this.onPrint);
		win.addEventListener("scroll", this.onScroll);
		win.document.addEventListener("selectionchange", this.onSelectionChange);
	}
	removeWindowListeners(win) {
		win.removeEventListener("scroll", this.onScroll);
		win.removeEventListener("resize", this.onResize);
		if (this.printQuery) {
			if (this.printQuery.removeEventListener) this.printQuery.removeEventListener("change", this.onPrint);
			else this.printQuery.removeListener(this.onPrint);
		} else win.removeEventListener("beforeprint", this.onPrint);
		win.document.removeEventListener("selectionchange", this.onSelectionChange);
	}
	update(update) {
		if (this.editContext) {
			this.editContext.update(update);
			if (update.startState.facet(editable) != update.state.facet(editable)) update.view.contentDOM.editContext = update.state.facet(editable) ? this.editContext.editContext : null;
		}
	}
	destroy() {
		var _a, _b, _c;
		this.stop();
		(_a = this.intersection) === null || _a === void 0 || _a.disconnect();
		(_b = this.gapIntersection) === null || _b === void 0 || _b.disconnect();
		(_c = this.resizeScroll) === null || _c === void 0 || _c.disconnect();
		for (let dom of this.scrollTargets) dom.removeEventListener("scroll", this.onScroll);
		this.removeWindowListeners(this.win);
		clearTimeout(this.parentCheck);
		clearTimeout(this.resizeTimeout);
		this.win.cancelAnimationFrame(this.delayedFlush);
		this.win.cancelAnimationFrame(this.flushingAndroidKey);
		if (this.editContext) {
			this.view.contentDOM.editContext = null;
			this.editContext.destroy();
		}
	}
};
function findChild(tile, dom, dir) {
	while (dom) {
		let curTile = Tile.get(dom);
		if (curTile && curTile.parent == tile) return curTile;
		let parent = dom.parentNode;
		dom = parent != tile.dom ? parent : dir > 0 ? dom.nextSibling : dom.previousSibling;
	}
	return null;
}
function buildSelectionRangeFromRange(view, range) {
	let anchorNode = range.startContainer, anchorOffset = range.startOffset;
	let focusNode = range.endContainer, focusOffset = range.endOffset;
	let curAnchor = view.docView.domAtPos(view.state.selection.main.anchor, 1);
	if (isEquivalentPosition(curAnchor.node, curAnchor.offset, focusNode, focusOffset)) [anchorNode, anchorOffset, focusNode, focusOffset] = [
		focusNode,
		focusOffset,
		anchorNode,
		anchorOffset
	];
	return {
		anchorNode,
		anchorOffset,
		focusNode,
		focusOffset
	};
}
function safariSelectionRangeHack(view, selection) {
	if (selection.getComposedRanges) {
		let range = selection.getComposedRanges(view.root)[0];
		if (range) return buildSelectionRangeFromRange(view, range);
	}
	let found = null;
	function read(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		found = event.getTargetRanges()[0];
	}
	view.contentDOM.addEventListener("beforeinput", read, true);
	view.dom.ownerDocument.execCommand("indent");
	view.contentDOM.removeEventListener("beforeinput", read, true);
	return found ? buildSelectionRangeFromRange(view, found) : null;
}
var EditContextManager = class {
	constructor(view) {
		this.from = 0;
		this.to = 0;
		this.pendingContextChange = null;
		this.handlers = Object.create(null);
		this.composing = null;
		this.resetRange(view.state);
		let context = this.editContext = new window.EditContext({
			text: view.state.doc.sliceString(this.from, this.to),
			selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, view.state.selection.main.anchor))),
			selectionEnd: this.toContextPos(view.state.selection.main.head)
		});
		this.handlers.textupdate = (e) => {
			let main = view.state.selection.main, { anchor, head } = main;
			let from = this.toEditorPos(e.updateRangeStart), to = this.toEditorPos(e.updateRangeEnd);
			if (view.inputState.composing >= 0 && !this.composing) this.composing = {
				contextBase: e.updateRangeStart,
				editorBase: from,
				drifted: false
			};
			let deletes = to - from > e.text.length;
			if (from == this.from && anchor < this.from) from = anchor;
			else if (to == this.to && anchor > this.to) to = anchor;
			let diff = findDiff(view.state.sliceDoc(from, to), e.text, (deletes ? main.from : main.to) - from, deletes ? "end" : null);
			if (!diff) {
				let newSel = EditorSelection.single(this.toEditorPos(e.selectionStart), this.toEditorPos(e.selectionEnd));
				if (!sameSelPos(newSel, main)) view.dispatch({
					selection: newSel,
					userEvent: "select"
				});
				return;
			}
			let change = {
				from: diff.from + from,
				to: diff.toA + from,
				insert: Text.of(e.text.slice(diff.from, diff.toB).split("\n"))
			};
			if ((browser.mac || browser.android) && change.from == head - 1 && /^\. ?$/.test(e.text) && view.contentDOM.getAttribute("autocorrect") == "off") change = {
				from,
				to,
				insert: Text.of([e.text.replace(".", " ")])
			};
			this.pendingContextChange = change;
			if (!view.state.readOnly) {
				let newLen = this.to - this.from + (change.to - change.from + change.insert.length);
				applyDOMChangeInner(view, change, EditorSelection.single(this.toEditorPos(e.selectionStart, newLen), this.toEditorPos(e.selectionEnd, newLen)));
			}
			if (this.pendingContextChange) {
				this.revertPending(view.state);
				this.setSelection(view.state);
			}
			if (change.from < change.to && !change.insert.length && view.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(context.text.slice(Math.max(0, e.updateRangeStart - 1), Math.min(context.text.length, e.updateRangeStart + 1)))) this.handlers.compositionend(e);
		};
		this.handlers.characterboundsupdate = (e) => {
			let rects = [], prev = null;
			for (let i = this.toEditorPos(e.rangeStart), end = this.toEditorPos(e.rangeEnd); i < end; i++) {
				let rect = view.coordsForChar(i);
				prev = rect && new DOMRect(rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top) || prev || new DOMRect();
				rects.push(prev);
			}
			context.updateCharacterBounds(e.rangeStart, rects);
		};
		this.handlers.textformatupdate = (e) => {
			let deco = [];
			for (let format of e.getTextFormats()) {
				let lineStyle = format.underlineStyle, thickness = format.underlineThickness;
				if (!/none/i.test(lineStyle) && !/none/i.test(thickness)) {
					let from = this.toEditorPos(format.rangeStart), to = this.toEditorPos(format.rangeEnd);
					if (from < to) {
						let style = `text-decoration: underline ${/^[a-z]/.test(lineStyle) ? lineStyle + " " : lineStyle == "Dashed" ? "dashed " : lineStyle == "Squiggle" ? "wavy " : ""}${/thin/i.test(thickness) ? 1 : 2}px`;
						deco.push(Decoration.mark({ attributes: { style } }).range(from, to));
					}
				}
			}
			view.dispatch({ effects: setEditContextFormatting.of(Decoration.set(deco)) });
		};
		this.handlers.compositionstart = () => {
			if (view.inputState.composing < 0) {
				view.inputState.composing = 0;
				view.inputState.compositionFirstChange = true;
			}
		};
		this.handlers.compositionend = () => {
			view.inputState.composing = -1;
			view.inputState.compositionFirstChange = null;
			if (this.composing) {
				let { drifted } = this.composing;
				this.composing = null;
				if (drifted) this.reset(view.state);
			}
		};
		for (let event in this.handlers) context.addEventListener(event, this.handlers[event]);
		this.measureReq = { read: (view) => {
			let sel = getSelection(view.root);
			if (sel && sel.rangeCount) this.editContext.updateSelectionBounds(sel.getRangeAt(0).getBoundingClientRect());
		} };
	}
	applyEdits(update) {
		let off = 0, abort = false, pending = this.pendingContextChange;
		update.changes.iterChanges((fromA, toA, _fromB, _toB, insert) => {
			if (abort) return;
			let dLen = insert.length - (toA - fromA);
			if (pending && toA >= pending.to) {
				if (pending.from == fromA && pending.to == toA && pending.insert.eq(insert)) {
					pending = this.pendingContextChange = null;
					off += dLen;
					this.to += dLen;
					return;
				} else {
					pending = null;
					this.revertPending(update.state);
				}
			}
			fromA += off;
			toA += off;
			if (toA <= this.from) {
				this.from += dLen;
				this.to += dLen;
			} else if (fromA < this.to) {
				if (fromA < this.from || toA > this.to || this.to - this.from + insert.length > 3e4) {
					abort = true;
					return;
				}
				this.editContext.updateText(this.toContextPos(fromA), this.toContextPos(toA), insert.toString());
				this.to += dLen;
			}
			off += dLen;
		});
		if (pending && !abort) this.revertPending(update.state);
		return !abort;
	}
	update(update) {
		let reverted = this.pendingContextChange, startSel = update.startState.selection.main;
		if (this.composing && (this.composing.drifted || !update.changes.touchesRange(startSel.from, startSel.to) && update.transactions.some((tr) => !tr.isUserEvent("input.type") && tr.changes.touchesRange(this.from, this.to)))) {
			this.composing.drifted = true;
			this.composing.editorBase = update.changes.mapPos(this.composing.editorBase);
		} else if (!this.applyEdits(update) || !this.rangeIsValid(update.state)) {
			this.pendingContextChange = null;
			this.reset(update.state);
		} else if (update.docChanged || update.selectionSet || reverted) this.setSelection(update.state);
		if (update.geometryChanged || update.docChanged || update.selectionSet) update.view.requestMeasure(this.measureReq);
	}
	resetRange(state) {
		let { head } = state.selection.main;
		this.from = Math.max(0, head - 1e4);
		this.to = Math.min(state.doc.length, head + 1e4);
	}
	reset(state) {
		this.resetRange(state);
		this.editContext.updateText(0, this.editContext.text.length, state.doc.sliceString(this.from, this.to));
		this.setSelection(state);
	}
	revertPending(state) {
		let pending = this.pendingContextChange;
		this.pendingContextChange = null;
		this.editContext.updateText(this.toContextPos(pending.from), this.toContextPos(pending.from + pending.insert.length), state.doc.sliceString(pending.from, pending.to));
	}
	setSelection(state) {
		let { main } = state.selection;
		let start = this.toContextPos(Math.max(this.from, Math.min(this.to, main.anchor)));
		let end = this.toContextPos(main.head);
		if (this.editContext.selectionStart != start || this.editContext.selectionEnd != end) this.editContext.updateSelection(start, end);
	}
	rangeIsValid(state) {
		let { head } = state.selection.main;
		return !(this.from > 0 && head - this.from < 500 || this.to < state.doc.length && this.to - head < 500 || this.to - this.from > 3e4);
	}
	toEditorPos(contextPos, clipLen = this.to - this.from) {
		contextPos = Math.min(contextPos, clipLen);
		let c = this.composing;
		return c && c.drifted ? c.editorBase + (contextPos - c.contextBase) : contextPos + this.from;
	}
	toContextPos(editorPos) {
		let c = this.composing;
		return c && c.drifted ? c.contextBase + (editorPos - c.editorBase) : editorPos - this.from;
	}
	destroy() {
		for (let event in this.handlers) this.editContext.removeEventListener(event, this.handlers[event]);
	}
};
var EditorView = class EditorView {
	get state() {
		return this.viewState.state;
	}
	get viewport() {
		return this.viewState.viewport;
	}
	get visibleRanges() {
		return this.viewState.visibleRanges;
	}
	get inView() {
		return this.viewState.inView;
	}
	get composing() {
		return !!this.inputState && this.inputState.composing > 0;
	}
	get compositionStarted() {
		return !!this.inputState && this.inputState.composing >= 0;
	}
	get root() {
		return this._root;
	}
	get win() {
		return this.dom.ownerDocument.defaultView || window;
	}
	constructor(config = {}) {
		var _a;
		this.plugins = [];
		this.pluginMap = new Map();
		this.editorAttrs = {};
		this.contentAttrs = {};
		this.bidiCache = [];
		this.destroyed = false;
		this.updateState = 2;
		this.measureScheduled = -1;
		this.measureRequests = [];
		this.contentDOM = document.createElement("div");
		this.scrollDOM = document.createElement("div");
		this.scrollDOM.tabIndex = -1;
		this.scrollDOM.className = "cm-scroller";
		this.scrollDOM.appendChild(this.contentDOM);
		this.announceDOM = document.createElement("div");
		this.announceDOM.className = "cm-announced";
		this.announceDOM.setAttribute("aria-live", "polite");
		this.dom = document.createElement("div");
		this.dom.appendChild(this.announceDOM);
		this.dom.appendChild(this.scrollDOM);
		if (config.parent) config.parent.appendChild(this.dom);
		let { dispatch } = config;
		this.dispatchTransactions = config.dispatchTransactions || dispatch && ((trs) => trs.forEach((tr) => dispatch(tr, this))) || ((trs) => this.update(trs));
		this.dispatch = this.dispatch.bind(this);
		this._root = config.root || getRoot(config.parent) || document;
		this.viewState = new ViewState(this, config.state || EditorState.create(config));
		if (config.scrollTo && config.scrollTo.is(scrollIntoView$1)) this.viewState.scrollTarget = config.scrollTo.value.clip(this.viewState.state);
		this.plugins = this.state.facet(viewPlugin).map((spec) => new PluginInstance(spec));
		for (let plugin of this.plugins) plugin.update(this);
		this.observer = new DOMObserver(this);
		this.inputState = new InputState(this);
		this.inputState.ensureHandlers(this.plugins);
		this.docView = new DocView(this);
		this.mountStyles();
		this.updateAttrs();
		this.updateState = 0;
		this.requestMeasure();
		if ((_a = document.fonts) === null || _a === void 0 ? void 0 : _a.ready) document.fonts.ready.then(() => {
			this.viewState.mustMeasureContent = "refresh";
			this.requestMeasure();
		});
	}
	dispatch(...input) {
		let trs = input.length == 1 && input[0] instanceof Transaction ? input : input.length == 1 && Array.isArray(input[0]) ? input[0] : [this.state.update(...input)];
		this.dispatchTransactions(trs, this);
	}
	update(transactions) {
		if (this.updateState != 0) throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
		let redrawn = false, attrsChanged = false, update;
		let state = this.state;
		for (let tr of transactions) {
			if (tr.startState != state) throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
			state = tr.state;
		}
		if (this.destroyed) {
			this.viewState.state = state;
			return;
		}
		let focus = this.hasFocus, focusFlag = 0, dispatchFocus = null;
		if (transactions.some((tr) => tr.annotation(isFocusChange))) {
			this.inputState.notifiedFocused = focus;
			focusFlag = 1;
		} else if (focus != this.inputState.notifiedFocused) {
			this.inputState.notifiedFocused = focus;
			dispatchFocus = focusChangeTransaction(state, focus);
			if (!dispatchFocus) focusFlag = 1;
		}
		let pendingKey = this.observer.delayedAndroidKey, domChange = null;
		if (pendingKey) {
			this.observer.clearDelayedAndroidKey();
			domChange = this.observer.readChange();
			if (domChange && !this.state.doc.eq(state.doc) || !this.state.selection.eq(state.selection)) domChange = null;
		} else this.observer.clear();
		if (state.facet(EditorState.phrases) != this.state.facet(EditorState.phrases)) return this.setState(state);
		update = ViewUpdate.create(this, state, transactions);
		update.flags |= focusFlag;
		let scrollTarget = this.viewState.scrollTarget;
		try {
			this.updateState = 2;
			for (let tr of transactions) {
				if (scrollTarget) scrollTarget = scrollTarget.map(tr.changes);
				if (tr.scrollIntoView) {
					let { main } = tr.state.selection;
					let { x, y } = this.state.facet(EditorView.cursorScrollMargin);
					scrollTarget = new ScrollTarget(main.empty ? main : EditorSelection.cursor(main.head, main.head > main.anchor ? -1 : 1), "nearest", "nearest", y, x);
				}
				for (let e of tr.effects) if (e.is(scrollIntoView$1)) scrollTarget = e.value.clip(this.state);
			}
			this.viewState.update(update, scrollTarget);
			this.bidiCache = CachedOrder.update(this.bidiCache, update.changes);
			if (!update.empty) {
				this.updatePlugins(update);
				this.inputState.update(update);
			}
			redrawn = this.docView.update(update);
			if (this.state.facet(styleModule) != this.styleModules) this.mountStyles();
			attrsChanged = this.updateAttrs();
			this.showAnnouncements(transactions);
			this.docView.updateSelection(redrawn, transactions.some((tr) => tr.isUserEvent("select.pointer")));
		} finally {
			this.updateState = 0;
		}
		if (update.startState.facet(theme$1) != update.state.facet(theme$1)) this.viewState.mustMeasureContent = true;
		if (redrawn || attrsChanged || scrollTarget || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) this.requestMeasure();
		if (redrawn) this.docViewUpdate();
		if (!update.empty) for (let listener of this.state.facet(updateListener)) try {
			listener(update);
		} catch (e) {
			logException(this.state, e, "update listener");
		}
		if (dispatchFocus || domChange) Promise.resolve().then(() => {
			if (dispatchFocus && this.state == dispatchFocus.startState) this.dispatch(dispatchFocus);
			if (domChange) {
				if (!applyDOMChange(this, domChange) && pendingKey.force) dispatchKey(this.contentDOM, pendingKey.key, pendingKey.keyCode);
			}
		});
	}
	setState(newState) {
		if (this.updateState != 0) throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
		if (this.destroyed) {
			this.viewState.state = newState;
			return;
		}
		this.updateState = 2;
		let hadFocus = this.hasFocus;
		try {
			for (let plugin of this.plugins) plugin.destroy(this);
			this.viewState = new ViewState(this, newState);
			this.plugins = newState.facet(viewPlugin).map((spec) => new PluginInstance(spec));
			this.pluginMap.clear();
			for (let plugin of this.plugins) plugin.update(this);
			this.docView.destroy();
			this.docView = new DocView(this);
			this.inputState.ensureHandlers(this.plugins);
			this.mountStyles();
			this.updateAttrs();
			this.bidiCache = [];
		} finally {
			this.updateState = 0;
		}
		if (hadFocus) this.focus();
		this.requestMeasure();
	}
	updatePlugins(update) {
		let prevSpecs = update.startState.facet(viewPlugin), specs = update.state.facet(viewPlugin);
		if (prevSpecs != specs) {
			let newPlugins = [];
			for (let spec of specs) {
				let found = prevSpecs.indexOf(spec);
				if (found < 0) newPlugins.push(new PluginInstance(spec));
				else {
					let plugin = this.plugins[found];
					plugin.mustUpdate = update;
					newPlugins.push(plugin);
				}
			}
			for (let plugin of this.plugins) if (plugin.mustUpdate != update) plugin.destroy(this);
			this.plugins = newPlugins;
			this.pluginMap.clear();
		} else for (let p of this.plugins) p.mustUpdate = update;
		for (let i = 0; i < this.plugins.length; i++) this.plugins[i].update(this);
		if (prevSpecs != specs) this.inputState.ensureHandlers(this.plugins);
	}
	docViewUpdate() {
		for (let plugin of this.plugins) {
			let val = plugin.value;
			if (val && val.docViewUpdate) try {
				val.docViewUpdate(this);
			} catch (e) {
				logException(this.state, e, "doc view update listener");
			}
		}
	}
	measure(flush = true) {
		if (this.destroyed) return;
		if (this.measureScheduled > -1) this.win.cancelAnimationFrame(this.measureScheduled);
		if (this.observer.delayedAndroidKey) {
			this.measureScheduled = -1;
			this.requestMeasure();
			return;
		}
		this.measureScheduled = 0;
		if (flush) this.observer.forceFlush();
		let updated = null;
		let scroll = this.viewState.scrollParent, scrollOffset = this.viewState.getScrollOffset();
		let { scrollAnchorPos, scrollAnchorHeight } = this.viewState;
		if (Math.abs(scrollOffset - this.viewState.scrollOffset) > 1) scrollAnchorHeight = -1;
		this.viewState.scrollAnchorHeight = -1;
		try {
			for (let i = 0;; i++) {
				if (scrollAnchorHeight < 0) {
					if (isScrolledToBottom(scroll || this.win)) {
						scrollAnchorPos = -1;
						scrollAnchorHeight = this.viewState.heightMap.height;
					} else {
						let block = this.viewState.scrollAnchorAt(scrollOffset);
						scrollAnchorPos = block.from;
						scrollAnchorHeight = block.top;
					}
				}
				this.updateState = 1;
				let changed = this.viewState.measure();
				if (!changed && !this.measureRequests.length && this.viewState.scrollTarget == null) break;
				if (i > 5) {
					console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
					break;
				}
				let measuring = [];
				if (!(changed & 4)) [this.measureRequests, measuring] = [measuring, this.measureRequests];
				let measured = measuring.map((m) => {
					try {
						return m.read(this);
					} catch (e) {
						logException(this.state, e);
						return BadMeasure;
					}
				});
				let update = ViewUpdate.create(this, this.state, []), redrawn = false;
				update.flags |= changed;
				if (!updated) updated = update;
				else updated.flags |= changed;
				this.updateState = 2;
				if (!update.empty) {
					this.updatePlugins(update);
					this.inputState.update(update);
					this.updateAttrs();
					redrawn = this.docView.update(update);
					if (redrawn) this.docViewUpdate();
				}
				for (let i = 0; i < measuring.length; i++) if (measured[i] != BadMeasure) try {
					let m = measuring[i];
					if (m.write) m.write(measured[i], this);
				} catch (e) {
					logException(this.state, e);
				}
				if (redrawn) this.docView.updateSelection(true);
				if (!update.viewportChanged && this.measureRequests.length == 0) {
					if (this.viewState.editorHeight) {
						if (this.viewState.scrollTarget) {
							this.docView.scrollIntoView(this.viewState.scrollTarget);
							this.viewState.scrollTarget = null;
							scrollAnchorHeight = -1;
							continue;
						} else {
							let diff = ((scrollAnchorPos < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(scrollAnchorPos).top) - scrollAnchorHeight) / this.scaleY;
							if ((diff > 1 || diff < -1) && !(browser.ios && this.inputState.lastIOSMomentumScroll > Date.now() - 100) && (scroll == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
								scrollOffset = scrollOffset + diff;
								if (!scroll) this.win.scrollBy(0, diff);
								else if (scrollAnchorPos < 0) scroll.scrollTop = scroll.scrollHeight;
								else scroll.scrollTop += diff;
								scrollAnchorHeight = -1;
								continue;
							}
						}
					}
					break;
				}
			}
		} finally {
			this.updateState = 0;
			this.measureScheduled = -1;
		}
		if (updated && !updated.empty) for (let listener of this.state.facet(updateListener)) listener(updated);
	}
	get themeClasses() {
		return baseThemeID + " " + (this.state.facet(darkTheme) ? baseDarkID : baseLightID) + " " + this.state.facet(theme$1);
	}
	updateAttrs() {
		let editorAttrs = attrsFromFacet(this, editorAttributes, { class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses });
		let contentAttrs = {
			spellcheck: "false",
			autocorrect: "off",
			autocapitalize: "off",
			writingsuggestions: "false",
			translate: "no",
			contenteditable: !this.state.facet(editable) ? "false" : "true",
			class: "cm-content",
			style: `${browser.tabSize}: ${this.state.tabSize}`,
			role: "textbox",
			"aria-multiline": "true"
		};
		if (this.state.readOnly) contentAttrs["aria-readonly"] = "true";
		attrsFromFacet(this, contentAttributes, contentAttrs);
		let changed = this.observer.ignore(() => {
			let changedContent = updateAttrs(this.contentDOM, this.contentAttrs, contentAttrs);
			let changedEditor = updateAttrs(this.dom, this.editorAttrs, editorAttrs);
			return changedContent || changedEditor;
		});
		this.editorAttrs = editorAttrs;
		this.contentAttrs = contentAttrs;
		return changed;
	}
	showAnnouncements(trs) {
		let first = true;
		for (let tr of trs) for (let effect of tr.effects) if (effect.is(EditorView.announce)) {
			if (first) this.announceDOM.textContent = "";
			first = false;
			let div = this.announceDOM.appendChild(document.createElement("div"));
			div.textContent = effect.value;
		}
	}
	mountStyles() {
		this.styleModules = this.state.facet(styleModule);
		let nonce = this.state.facet(EditorView.cspNonce);
		StyleModule.mount(this.root, this.styleModules.concat(baseTheme$1$2).reverse(), nonce ? { nonce } : void 0);
	}
	readMeasured() {
		if (this.updateState == 2) throw new Error("Reading the editor layout isn't allowed during an update");
		if (this.updateState == 0 && this.measureScheduled > -1) this.measure(false);
	}
	requestMeasure(request) {
		if (this.measureScheduled < 0) this.measureScheduled = this.win.requestAnimationFrame(() => this.measure());
		if (request) {
			if (this.measureRequests.indexOf(request) > -1) return;
			if (request.key != null) {
				for (let i = 0; i < this.measureRequests.length; i++) if (this.measureRequests[i].key === request.key) {
					this.measureRequests[i] = request;
					return;
				}
			}
			this.measureRequests.push(request);
		}
	}
	plugin(plugin) {
		let known = this.pluginMap.get(plugin);
		if (known === void 0 || known && known.plugin != plugin) this.pluginMap.set(plugin, known = this.plugins.find((p) => p.plugin == plugin) || null);
		return known && known.update(this).value;
	}
	get documentTop() {
		return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
	}
	get documentPadding() {
		return {
			top: this.viewState.paddingTop,
			bottom: this.viewState.paddingBottom
		};
	}
	get scaleX() {
		return this.viewState.scaleX;
	}
	get scaleY() {
		return this.viewState.scaleY;
	}
	elementAtHeight(height) {
		this.readMeasured();
		return this.viewState.elementAtHeight(height);
	}
	lineBlockAtHeight(height) {
		this.readMeasured();
		return this.viewState.lineBlockAtHeight(height);
	}
	get viewportLineBlocks() {
		return this.viewState.viewportLines;
	}
	lineBlockAt(pos) {
		return this.viewState.lineBlockAt(pos);
	}
	get contentHeight() {
		return this.viewState.contentHeight;
	}
	moveByChar(start, forward, by) {
		return skipAtoms(this, start, moveByChar(this, start, forward, by));
	}
	moveByGroup(start, forward) {
		return skipAtoms(this, start, moveByChar(this, start, forward, (initial) => byGroup(this, start.head, initial)));
	}
	visualLineSide(line, end) {
		let order = this.bidiSpans(line), dir = this.textDirectionAt(line.from);
		let span = order[end ? order.length - 1 : 0];
		return EditorSelection.cursor(span.side(end, dir) + line.from, span.forward(!end, dir) ? 1 : -1);
	}
	moveToLineBoundary(start, forward, includeWrap = true) {
		return moveToLineBoundary(this, start, forward, includeWrap);
	}
	moveVertically(start, forward, distance) {
		return skipAtoms(this, start, moveVertically(this, start, forward, distance));
	}
	domAtPos(pos, side = 1) {
		return this.docView.domAtPos(pos, side);
	}
	posAtDOM(node, offset = 0) {
		return this.docView.posFromDOM(node, offset);
	}
	posAtCoords(coords, precise = true) {
		this.readMeasured();
		let found = posAtCoords(this, coords, precise);
		return found && found.pos;
	}
	posAndSideAtCoords(coords, precise = true) {
		this.readMeasured();
		return posAtCoords(this, coords, precise);
	}
	coordsAtPos(pos, side = 1) {
		this.readMeasured();
		let line = this.state.doc.lineAt(pos), order = this.bidiSpans(line);
		let span = order[BidiSpan.find(order, pos - line.from, -1, side)];
		return this.docView.coordsAt(pos, side, span.dir == Direction.RTL);
	}
	coordsForChar(pos) {
		this.readMeasured();
		return this.docView.coordsForChar(pos);
	}
	get defaultCharacterWidth() {
		return this.viewState.heightOracle.charWidth;
	}
	get defaultLineHeight() {
		return this.viewState.heightOracle.lineHeight;
	}
	get textDirection() {
		return this.viewState.defaultTextDirection;
	}
	textDirectionAt(pos) {
		if (!this.state.facet(perLineTextDirection) || pos < this.viewport.from || pos > this.viewport.to) return this.textDirection;
		this.readMeasured();
		return this.docView.textDirectionAt(pos);
	}
	get lineWrapping() {
		return this.viewState.heightOracle.lineWrapping;
	}
	bidiSpans(line) {
		if (line.length > MaxBidiLine) return trivialOrder(line.length);
		let dir = this.textDirectionAt(line.from), isolates;
		for (let entry of this.bidiCache) if (entry.from == line.from && entry.dir == dir && (entry.fresh || isolatesEq(entry.isolates, isolates = getIsolatedRanges(this, line)))) return entry.order;
		if (!isolates) isolates = getIsolatedRanges(this, line);
		let order = computeOrder(line.text, dir, isolates);
		this.bidiCache.push(new CachedOrder(line.from, line.to, dir, isolates, true, order));
		return order;
	}
	get hasFocus() {
		var _a;
		return (this.dom.ownerDocument.hasFocus() || browser.safari && ((_a = this.inputState) === null || _a === void 0 ? void 0 : _a.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
	}
	focus() {
		this.observer.ignore(() => {
			focusPreventScroll(this.contentDOM);
			this.docView.updateSelection();
		});
	}
	setRoot(root) {
		if (this._root != root) {
			this._root = root;
			this.observer.setWindow((root.nodeType == 9 ? root : root.ownerDocument).defaultView || window);
			this.mountStyles();
		}
	}
	destroy() {
		if (this.root.activeElement == this.contentDOM) this.contentDOM.blur();
		for (let plugin of this.plugins) plugin.destroy(this);
		this.plugins = [];
		this.inputState.destroy();
		this.docView.destroy();
		this.dom.remove();
		this.observer.destroy();
		if (this.measureScheduled > -1) this.win.cancelAnimationFrame(this.measureScheduled);
		this.destroyed = true;
	}
	static scrollIntoView(pos, options = {}) {
		var _a, _b, _c, _d;
		return scrollIntoView$1.of(new ScrollTarget(typeof pos == "number" ? EditorSelection.cursor(pos) : pos, (_a = options.y) !== null && _a !== void 0 ? _a : "nearest", (_b = options.x) !== null && _b !== void 0 ? _b : "nearest", (_c = options.yMargin) !== null && _c !== void 0 ? _c : 5, (_d = options.xMargin) !== null && _d !== void 0 ? _d : 5));
	}
	scrollSnapshot() {
		let { scrollTop, scrollLeft } = this.scrollDOM;
		let ref = this.viewState.scrollAnchorAt(scrollTop);
		return scrollIntoView$1.of(new ScrollTarget(EditorSelection.cursor(ref.from), "start", "start", ref.top - scrollTop, scrollLeft, true));
	}
	setTabFocusMode(to) {
		if (to == null) this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1;
		else if (typeof to == "boolean") this.inputState.tabFocusMode = to ? 0 : -1;
		else if (this.inputState.tabFocusMode != 0) this.inputState.tabFocusMode = Date.now() + to;
	}
	static domEventHandlers(handlers) {
		return ViewPlugin.define(() => ({}), { eventHandlers: handlers });
	}
	static domEventObservers(observers) {
		return ViewPlugin.define(() => ({}), { eventObservers: observers });
	}
	static theme(spec, options) {
		let prefix = StyleModule.newName();
		let result = [theme$1.of(prefix), styleModule.of(buildTheme(`.${prefix}`, spec))];
		if (options && options.dark) result.push(darkTheme.of(true));
		return result;
	}
	static baseTheme(spec) {
		return Prec.lowest(styleModule.of(buildTheme("." + baseThemeID, spec, lightDarkIDs)));
	}
	static findFromDOM(dom) {
		var _a;
		let content = dom.querySelector(".cm-content");
		let tile = content && Tile.get(content) || Tile.get(dom);
		return ((_a = tile === null || tile === void 0 ? void 0 : tile.root) === null || _a === void 0 ? void 0 : _a.view) || null;
	}
};
EditorView.styleModule = styleModule;
EditorView.inputHandler = inputHandler$1;
EditorView.clipboardInputFilter = clipboardInputFilter;
EditorView.clipboardOutputFilter = clipboardOutputFilter;
EditorView.scrollHandler = scrollHandler;
EditorView.focusChangeEffect = focusChangeEffect;
EditorView.perLineTextDirection = perLineTextDirection;
EditorView.exceptionSink = exceptionSink;
EditorView.updateListener = updateListener;
EditorView.editable = editable;
EditorView.mouseSelectionStyle = mouseSelectionStyle;
EditorView.dragMovesSelection = dragMovesSelection$1;
EditorView.clickAddsSelectionRange = clickAddsSelectionRange;
EditorView.decorations = decorations;
EditorView.blockWrappers = blockWrappers;
EditorView.outerDecorations = outerDecorations;
EditorView.atomicRanges = atomicRanges;
EditorView.bidiIsolatedRanges = bidiIsolatedRanges;
EditorView.cursorScrollMargin = Facet.define({ combine: (inputs) => {
	let x = 5, y = 5;
	for (let i of inputs) if (typeof i == "number") x = y = i;
	else ({x, y} = i);
	return {
		x,
		y
	};
} });
EditorView.scrollMargins = scrollMargins;
EditorView.darkTheme = darkTheme;
EditorView.cspNonce = Facet.define({ combine: (values) => values.length ? values[0] : "" });
EditorView.contentAttributes = contentAttributes;
EditorView.editorAttributes = editorAttributes;
EditorView.lineWrapping = EditorView.contentAttributes.of({ "class": "cm-lineWrapping" });
EditorView.announce = StateEffect.define();
var MaxBidiLine = 4096;
var BadMeasure = {};
var CachedOrder = class CachedOrder {
	constructor(from, to, dir, isolates, fresh, order) {
		this.from = from;
		this.to = to;
		this.dir = dir;
		this.isolates = isolates;
		this.fresh = fresh;
		this.order = order;
	}
	static update(cache, changes) {
		if (changes.empty && !cache.some((c) => c.fresh)) return cache;
		let result = [], lastDir = cache.length ? cache[cache.length - 1].dir : Direction.LTR;
		for (let i = Math.max(0, cache.length - 10); i < cache.length; i++) {
			let entry = cache[i];
			if (entry.dir == lastDir && !changes.touchesRange(entry.from, entry.to)) result.push(new CachedOrder(changes.mapPos(entry.from, 1), changes.mapPos(entry.to, -1), entry.dir, entry.isolates, false, entry.order));
		}
		return result;
	}
};
function attrsFromFacet(view, facet, base) {
	for (let sources = view.state.facet(facet), i = sources.length - 1; i >= 0; i--) {
		let source = sources[i], value = typeof source == "function" ? source(view) : source;
		if (value) combineAttrs(value, base);
	}
	return base;
}
var currentPlatform = browser.mac ? "mac" : browser.windows ? "win" : browser.linux ? "linux" : "key";
function normalizeKeyName(name, platform) {
	const parts = name.split(/-(?!$)/);
	let result = parts[parts.length - 1];
	if (result == "Space") result = " ";
	let alt, ctrl, shift, meta;
	for (let i = 0; i < parts.length - 1; ++i) {
		const mod = parts[i];
		if (/^(cmd|meta|m)$/i.test(mod)) meta = true;
		else if (/^a(lt)?$/i.test(mod)) alt = true;
		else if (/^(c|ctrl|control)$/i.test(mod)) ctrl = true;
		else if (/^s(hift)?$/i.test(mod)) shift = true;
		else if (/^mod$/i.test(mod)) {
			if (platform == "mac") meta = true;
			else ctrl = true;
		} else throw new Error("Unrecognized modifier name: " + mod);
	}
	if (alt) result = "Alt-" + result;
	if (ctrl) result = "Ctrl-" + result;
	if (meta) result = "Meta-" + result;
	if (shift) result = "Shift-" + result;
	return result;
}
function modifiers(name, event, shift) {
	if (event.altKey) name = "Alt-" + name;
	if (event.ctrlKey) name = "Ctrl-" + name;
	if (event.metaKey) name = "Meta-" + name;
	if (shift !== false && event.shiftKey) name = "Shift-" + name;
	return name;
}
var handleKeyEvents = Prec.default(EditorView.domEventHandlers({ keydown(event, view) {
	return runHandlers(getKeymap(view.state), event, view, "editor");
} }));
var keymap = Facet.define({ enables: handleKeyEvents });
var Keymaps = new WeakMap();
function getKeymap(state) {
	let bindings = state.facet(keymap);
	let map = Keymaps.get(bindings);
	if (!map) Keymaps.set(bindings, map = buildKeymap(bindings.reduce((a, b) => a.concat(b), [])));
	return map;
}
var storedPrefix = null;
var PrefixTimeout = 4e3;
function buildKeymap(bindings, platform = currentPlatform) {
	let bound = Object.create(null);
	let isPrefix = Object.create(null);
	let checkPrefix = (name, is) => {
		let current = isPrefix[name];
		if (current == null) isPrefix[name] = is;
		else if (current != is) throw new Error("Key binding " + name + " is used both as a regular binding and as a multi-stroke prefix");
	};
	let add = (scope, key, command, preventDefault, stopPropagation) => {
		var _a, _b;
		let scopeObj = bound[scope] || (bound[scope] = Object.create(null));
		let parts = key.split(/ (?!$)/).map((k) => normalizeKeyName(k, platform));
		for (let i = 1; i < parts.length; i++) {
			let prefix = parts.slice(0, i).join(" ");
			checkPrefix(prefix, true);
			if (!scopeObj[prefix]) scopeObj[prefix] = {
				preventDefault: true,
				stopPropagation: false,
				run: [(view) => {
					let ourObj = storedPrefix = {
						view,
						prefix,
						scope
					};
					setTimeout(() => {
						if (storedPrefix == ourObj) storedPrefix = null;
					}, PrefixTimeout);
					return true;
				}]
			};
		}
		let full = parts.join(" ");
		checkPrefix(full, false);
		let binding = scopeObj[full] || (scopeObj[full] = {
			preventDefault: false,
			stopPropagation: false,
			run: ((_b = (_a = scopeObj._any) === null || _a === void 0 ? void 0 : _a.run) === null || _b === void 0 ? void 0 : _b.slice()) || []
		});
		if (command) binding.run.push(command);
		if (preventDefault) binding.preventDefault = true;
		if (stopPropagation) binding.stopPropagation = true;
	};
	for (let b of bindings) {
		let scopes = b.scope ? b.scope.split(" ") : ["editor"];
		if (b.any) for (let scope of scopes) {
			let scopeObj = bound[scope] || (bound[scope] = Object.create(null));
			if (!scopeObj._any) scopeObj._any = {
				preventDefault: false,
				stopPropagation: false,
				run: []
			};
			let { any } = b;
			for (let key in scopeObj) scopeObj[key].run.push((view) => any(view, currentKeyEvent));
		}
		let name = b[platform] || b.key;
		if (!name) continue;
		for (let scope of scopes) {
			add(scope, name, b.run, b.preventDefault, b.stopPropagation);
			if (b.shift) add(scope, "Shift-" + name, b.shift, b.preventDefault, b.stopPropagation);
		}
	}
	return bound;
}
var currentKeyEvent = null;
function runHandlers(map, event, view, scope) {
	currentKeyEvent = event;
	let name = keyName(event);
	let isChar = codePointSize(codePointAt(name, 0)) == name.length && name != " ";
	let prefix = "", handled = false, prevented = false, stopPropagation = false;
	if (storedPrefix && storedPrefix.view == view && storedPrefix.scope == scope) {
		prefix = storedPrefix.prefix + " ";
		if (modifierCodes.indexOf(event.keyCode) < 0) {
			prevented = true;
			storedPrefix = null;
		}
	}
	let ran = new Set();
	let runFor = (binding) => {
		if (binding) {
			for (let cmd of binding.run) if (!ran.has(cmd)) {
				ran.add(cmd);
				if (cmd(view)) {
					if (binding.stopPropagation) stopPropagation = true;
					return true;
				}
			}
			if (binding.preventDefault) {
				if (binding.stopPropagation) stopPropagation = true;
				prevented = true;
			}
		}
		return false;
	};
	let scopeObj = map[scope], baseName, shiftName;
	if (scopeObj) {
		if (runFor(scopeObj[prefix + modifiers(name, event, !isChar)])) handled = true;
		else if (isChar && (event.altKey || event.metaKey || event.ctrlKey) && !(browser.windows && event.ctrlKey && event.altKey) && !(browser.mac && event.altKey && !(event.ctrlKey || event.metaKey)) && (baseName = base[event.keyCode]) && baseName != name) {
			if (runFor(scopeObj[prefix + modifiers(baseName, event, true)])) handled = true;
			else if (event.shiftKey && (shiftName = shift[event.keyCode]) != name && shiftName != baseName && runFor(scopeObj[prefix + modifiers(shiftName, event, false)])) handled = true;
		} else if (isChar && event.shiftKey && runFor(scopeObj[prefix + modifiers(name, event, true)])) handled = true;
		if (!handled && runFor(scopeObj._any)) handled = true;
	}
	if (prevented) handled = true;
	if (handled && stopPropagation) event.stopPropagation();
	currentKeyEvent = null;
	return handled;
}
var RectangleMarker = class RectangleMarker {
	constructor(className, left, top, width, height) {
		this.className = className;
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}
	draw() {
		let elt = document.createElement("div");
		elt.className = this.className;
		this.adjust(elt);
		return elt;
	}
	update(elt, prev) {
		if (prev.className != this.className) return false;
		this.adjust(elt);
		return true;
	}
	adjust(elt) {
		elt.style.left = this.left + "px";
		elt.style.top = this.top + "px";
		if (this.width != null) elt.style.width = this.width + "px";
		elt.style.height = this.height + "px";
	}
	eq(p) {
		return this.left == p.left && this.top == p.top && this.width == p.width && this.height == p.height && this.className == p.className;
	}
	static forRange(view, className, range) {
		if (range.empty) {
			let pos = view.coordsAtPos(range.head, range.assoc || 1);
			if (!pos) return [];
			let base = getBase(view);
			return [new RectangleMarker(className, pos.left - base.left, pos.top - base.top, null, pos.bottom - pos.top)];
		} else return rectanglesForRange(view, className, range);
	}
};
function getBase(view) {
	let rect = view.scrollDOM.getBoundingClientRect();
	return {
		left: (view.textDirection == Direction.LTR ? rect.left : rect.right - view.scrollDOM.clientWidth * view.scaleX) - view.scrollDOM.scrollLeft * view.scaleX,
		top: rect.top - view.scrollDOM.scrollTop * view.scaleY
	};
}
function wrappedLine(view, pos, side, inside) {
	let coords = view.coordsAtPos(pos, side * 2);
	if (!coords) return inside;
	let editorRect = view.dom.getBoundingClientRect();
	let y = (coords.top + coords.bottom) / 2;
	let left = view.posAtCoords({
		x: editorRect.left + 1,
		y
	});
	let right = view.posAtCoords({
		x: editorRect.right - 1,
		y
	});
	if (left == null || right == null) return inside;
	return {
		from: Math.max(inside.from, Math.min(left, right)),
		to: Math.min(inside.to, Math.max(left, right))
	};
}
function rectanglesForRange(view, className, range) {
	if (range.to <= view.viewport.from || range.from >= view.viewport.to) return [];
	let from = Math.max(range.from, view.viewport.from), to = Math.min(range.to, view.viewport.to);
	let ltr = view.textDirection == Direction.LTR;
	let content = view.contentDOM, contentRect = content.getBoundingClientRect(), base = getBase(view);
	let lineElt = content.querySelector(".cm-line"), lineStyle = lineElt && window.getComputedStyle(lineElt);
	let leftSide = contentRect.left + (lineStyle ? parseInt(lineStyle.paddingLeft) + Math.min(0, parseInt(lineStyle.textIndent)) : 0);
	let rightSide = contentRect.right - (lineStyle ? parseInt(lineStyle.paddingRight) : 0);
	let startBlock = blockAt(view, from, 1), endBlock = blockAt(view, to, -1);
	let visualStart = startBlock.type == BlockType.Text ? startBlock : null;
	let visualEnd = endBlock.type == BlockType.Text ? endBlock : null;
	if (visualStart && (view.lineWrapping || startBlock.widgetLineBreaks)) visualStart = wrappedLine(view, from, 1, visualStart);
	if (visualEnd && (view.lineWrapping || endBlock.widgetLineBreaks)) visualEnd = wrappedLine(view, to, -1, visualEnd);
	if (visualStart && visualEnd && visualStart.from == visualEnd.from && visualStart.to == visualEnd.to) return pieces(drawForLine(range.from, range.to, visualStart));
	else {
		let top = visualStart ? drawForLine(range.from, null, visualStart) : drawForWidget(startBlock, false);
		let bottom = visualEnd ? drawForLine(null, range.to, visualEnd) : drawForWidget(endBlock, true);
		let between = [];
		if ((visualStart || startBlock).to < (visualEnd || endBlock).from - (visualStart && visualEnd ? 1 : 0) || startBlock.widgetLineBreaks > 1 && top.bottom + view.defaultLineHeight / 2 < bottom.top) between.push(piece(leftSide, top.bottom, rightSide, bottom.top));
		else if (top.bottom < bottom.top && view.elementAtHeight((top.bottom + bottom.top) / 2).type == BlockType.Text) top.bottom = bottom.top = (top.bottom + bottom.top) / 2;
		return pieces(top).concat(between).concat(pieces(bottom));
	}
	function piece(left, top, right, bottom) {
		return new RectangleMarker(className, left - base.left, top - base.top, Math.max(0, right - left), bottom - top);
	}
	function pieces({ top, bottom, horizontal }) {
		let pieces = [];
		for (let i = 0; i < horizontal.length; i += 2) pieces.push(piece(horizontal[i], top, horizontal[i + 1], bottom));
		return pieces;
	}
	function drawForLine(from, to, line) {
		let top = 1e9, bottom = -1e9, horizontal = [];
		function addSpan(from, fromOpen, to, toOpen, dir) {
			let fromCoords = view.coordsAtPos(from, from == line.to ? -2 : 2);
			let toCoords = view.coordsAtPos(to, to == line.from ? 2 : -2);
			if (!fromCoords || !toCoords) return;
			top = Math.min(fromCoords.top, toCoords.top, top);
			bottom = Math.max(fromCoords.bottom, toCoords.bottom, bottom);
			if (dir == Direction.LTR) horizontal.push(ltr && fromOpen ? leftSide : fromCoords.left, ltr && toOpen ? rightSide : toCoords.right);
			else horizontal.push(!ltr && toOpen ? leftSide : toCoords.left, !ltr && fromOpen ? rightSide : fromCoords.right);
		}
		let start = from !== null && from !== void 0 ? from : line.from, end = to !== null && to !== void 0 ? to : line.to;
		for (let r of view.visibleRanges) if (r.to > start && r.from < end) for (let pos = Math.max(r.from, start), endPos = Math.min(r.to, end);;) {
			let docLine = view.state.doc.lineAt(pos);
			for (let span of view.bidiSpans(docLine)) {
				let spanFrom = span.from + docLine.from, spanTo = span.to + docLine.from;
				if (spanFrom >= endPos) break;
				if (spanTo > pos) addSpan(Math.max(spanFrom, pos), from == null && spanFrom <= start, Math.min(spanTo, endPos), to == null && spanTo >= end, span.dir);
			}
			pos = docLine.to + 1;
			if (pos >= endPos) break;
		}
		if (horizontal.length == 0) addSpan(start, from == null, end, to == null, view.textDirection);
		return {
			top,
			bottom,
			horizontal
		};
	}
	function drawForWidget(block, top) {
		let y = contentRect.top + (top ? block.top : block.bottom);
		return {
			top: y,
			bottom: y,
			horizontal: []
		};
	}
}
function sameMarker(a, b) {
	return a.constructor == b.constructor && a.eq(b);
}
var LayerView = class {
	constructor(view, layer) {
		this.view = view;
		this.layer = layer;
		this.drawn = [];
		this.scaleX = 1;
		this.scaleY = 1;
		this.measureReq = {
			read: this.measure.bind(this),
			write: this.draw.bind(this)
		};
		this.dom = view.scrollDOM.appendChild(document.createElement("div"));
		this.dom.classList.add("cm-layer");
		if (layer.above) this.dom.classList.add("cm-layer-above");
		if (layer.class) this.dom.classList.add(layer.class);
		this.scale();
		this.dom.setAttribute("aria-hidden", "true");
		this.setOrder(view.state);
		view.requestMeasure(this.measureReq);
		if (layer.mount) layer.mount(this.dom, view);
	}
	update(update) {
		if (update.startState.facet(layerOrder) != update.state.facet(layerOrder)) this.setOrder(update.state);
		if (this.layer.update(update, this.dom) || update.geometryChanged) {
			this.scale();
			update.view.requestMeasure(this.measureReq);
		}
	}
	docViewUpdate(view) {
		if (this.layer.updateOnDocViewUpdate !== false) view.requestMeasure(this.measureReq);
	}
	setOrder(state) {
		let pos = 0, order = state.facet(layerOrder);
		while (pos < order.length && order[pos] != this.layer) pos++;
		this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - pos);
	}
	measure() {
		return this.layer.markers(this.view);
	}
	scale() {
		let { scaleX, scaleY } = this.view;
		if (scaleX != this.scaleX || scaleY != this.scaleY) {
			this.scaleX = scaleX;
			this.scaleY = scaleY;
			this.dom.style.transform = `scale(${1 / scaleX}, ${1 / scaleY})`;
		}
	}
	draw(markers) {
		if (markers.length != this.drawn.length || markers.some((p, i) => !sameMarker(p, this.drawn[i]))) {
			let old = this.dom.firstChild, oldI = 0;
			for (let marker of markers) if (marker.update && old && marker.constructor && this.drawn[oldI].constructor && marker.update(old, this.drawn[oldI])) {
				old = old.nextSibling;
				oldI++;
			} else this.dom.insertBefore(marker.draw(), old);
			while (old) {
				let next = old.nextSibling;
				old.remove();
				old = next;
			}
			this.drawn = markers;
			if (browser.webkit) this.dom.style.display = this.dom.firstChild ? "" : "none";
		}
	}
	destroy() {
		if (this.layer.destroy) this.layer.destroy(this.dom, this.view);
		this.dom.remove();
	}
};
var layerOrder = Facet.define();
function layer(config) {
	return [ViewPlugin.define((v) => new LayerView(v, config)), layerOrder.of(config)];
}
var selectionConfig = Facet.define({ combine(configs) {
	return combineConfig(configs, {
		cursorBlinkRate: 1200,
		drawRangeCursor: true,
		iosSelectionHandles: true
	}, {
		cursorBlinkRate: (a, b) => Math.min(a, b),
		drawRangeCursor: (a, b) => a || b
	});
} });
function drawSelection(config = {}) {
	return [
		selectionConfig.of(config),
		cursorLayer,
		selectionLayer,
		hideNativeSelection,
		nativeSelectionHidden.of(true)
	];
}
function configChanged(update) {
	return update.startState.facet(selectionConfig) != update.state.facet(selectionConfig);
}
var cursorLayer = layer({
	above: true,
	markers(view) {
		let { state } = view, conf = state.facet(selectionConfig);
		let cursors = [];
		for (let r of state.selection.ranges) {
			let prim = r == state.selection.main;
			if (r.empty || conf.drawRangeCursor && !(prim && browser.ios && conf.iosSelectionHandles)) {
				let className = prim ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary";
				let cursor = r.empty ? r : EditorSelection.cursor(r.head, r.assoc);
				for (let piece of RectangleMarker.forRange(view, className, cursor)) cursors.push(piece);
			}
		}
		return cursors;
	},
	update(update, dom) {
		if (update.transactions.some((tr) => tr.selection)) dom.style.animationName = dom.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink";
		let confChange = configChanged(update);
		if (confChange) setBlinkRate(update.state, dom);
		return update.docChanged || update.selectionSet || confChange;
	},
	mount(dom, view) {
		setBlinkRate(view.state, dom);
	},
	class: "cm-cursorLayer"
});
function setBlinkRate(state, dom) {
	dom.style.animationDuration = state.facet(selectionConfig).cursorBlinkRate + "ms";
}
var selectionLayer = layer({
	above: false,
	markers(view) {
		let markers = [], { main, ranges } = view.state.selection;
		for (let r of ranges) if (!r.empty) for (let marker of RectangleMarker.forRange(view, "cm-selectionBackground", r)) markers.push(marker);
		if (browser.ios && !main.empty && view.state.facet(selectionConfig).iosSelectionHandles) {
			for (let piece of RectangleMarker.forRange(view, "cm-selectionHandle cm-selectionHandle-start", EditorSelection.cursor(main.from, 1))) markers.push(piece);
			for (let piece of RectangleMarker.forRange(view, "cm-selectionHandle cm-selectionHandle-end", EditorSelection.cursor(main.to, 1))) markers.push(piece);
		}
		return markers;
	},
	update(update, dom) {
		return update.docChanged || update.selectionSet || update.viewportChanged || configChanged(update);
	},
	class: "cm-selectionLayer"
});
var selectionBg = browser.gecko && browser.gecko_version == 153 ? "#ffffff01" : "transparent";
var hideNativeSelection = Prec.highest(EditorView.theme({
	".cm-line": {
		"& ::selection, &::selection": { backgroundColor: `${selectionBg} !important` },
		caretColor: "transparent !important"
	},
	".cm-content": {
		caretColor: "transparent !important",
		"& :focus": {
			caretColor: "initial !important",
			"&::selection, & ::selection": { backgroundColor: "Highlight !important" }
		}
	}
}));
function iterMatches(doc, re, from, to, f) {
	re.lastIndex = 0;
	for (let cursor = doc.iterRange(from, to), pos = from, m; !cursor.next().done; pos += cursor.value.length) if (!cursor.lineBreak) while (m = re.exec(cursor.value)) f(pos + m.index, m);
}
function matchRanges(view, maxLength) {
	let visible = view.visibleRanges;
	if (visible.length == 1 && visible[0].from == view.viewport.from && visible[0].to == view.viewport.to) return visible;
	let result = [];
	for (let { from, to } of visible) {
		from = Math.max(view.state.doc.lineAt(from).from, from - maxLength);
		to = Math.min(view.state.doc.lineAt(to).to, to + maxLength);
		if (result.length && result[result.length - 1].to >= from) result[result.length - 1].to = to;
		else result.push({
			from,
			to
		});
	}
	return result;
}
var MatchDecorator = class {
	constructor(config) {
		const { regexp, decoration, decorate, boundary, maxLength = 1e3 } = config;
		if (!regexp.global) throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
		this.regexp = regexp;
		if (decorate) this.addMatch = (match, view, from, add) => decorate(add, from, from + match[0].length, match, view);
		else if (typeof decoration == "function") this.addMatch = (match, view, from, add) => {
			let deco = decoration(match, view, from);
			if (deco) add(from, from + match[0].length, deco);
		};
		else if (decoration) this.addMatch = (match, _view, from, add) => add(from, from + match[0].length, decoration);
		else throw new RangeError("Either 'decorate' or 'decoration' should be provided to MatchDecorator");
		this.boundary = boundary;
		this.maxLength = maxLength;
	}
	createDeco(view) {
		let build = new RangeSetBuilder(), add = build.add.bind(build);
		for (let { from, to } of matchRanges(view, this.maxLength)) iterMatches(view.state.doc, this.regexp, from, to, (from, m) => this.addMatch(m, view, from, add));
		return build.finish();
	}
	updateDeco(update, deco) {
		let changeFrom = 1e9, changeTo = -1;
		if (update.docChanged) update.changes.iterChanges((_f, _t, from, to) => {
			if (to >= update.view.viewport.from && from <= update.view.viewport.to) {
				changeFrom = Math.min(from, changeFrom);
				changeTo = Math.max(to, changeTo);
			}
		});
		if (update.viewportMoved || changeTo - changeFrom > 1e3) return this.createDeco(update.view);
		if (changeTo > -1) return this.updateRange(update.view, deco.map(update.changes), changeFrom, changeTo);
		return deco;
	}
	updateRange(view, deco, updateFrom, updateTo) {
		for (let r of view.visibleRanges) {
			let from = Math.max(r.from, updateFrom), to = Math.min(r.to, updateTo);
			if (to >= from) {
				let fromLine = view.state.doc.lineAt(from), toLine = fromLine.to < to ? view.state.doc.lineAt(to) : fromLine;
				let start = Math.max(r.from, fromLine.from), end = Math.min(r.to, toLine.to);
				if (this.boundary) {
					for (; from > fromLine.from; from--) if (this.boundary.test(fromLine.text[from - 1 - fromLine.from])) {
						start = from;
						break;
					}
					for (; to < toLine.to; to++) if (this.boundary.test(toLine.text[to - toLine.from])) {
						end = to;
						break;
					}
				}
				let ranges = [], m;
				let add = (from, to, deco) => ranges.push(deco.range(from, to));
				if (fromLine == toLine) {
					this.regexp.lastIndex = start - fromLine.from;
					while ((m = this.regexp.exec(fromLine.text)) && m.index < end - fromLine.from) this.addMatch(m, view, m.index + fromLine.from, add);
				} else iterMatches(view.state.doc, this.regexp, start, end, (from, m) => this.addMatch(m, view, from, add));
				deco = deco.update({
					filterFrom: start,
					filterTo: end,
					filter: (from, to) => from < start || to > end,
					add: ranges
				});
			}
		}
		return deco;
	}
};
var UnicodeRegexpSupport = /x/.unicode != null ? "gu" : "g";
var Specials = new RegExp("[\0-\b\n--­؜​‎‏\u2028\u2029‭‮⁦⁧⁩﻿￹-￼]", UnicodeRegexpSupport);
var Names = {
	0: "null",
	7: "bell",
	8: "backspace",
	10: "newline",
	11: "vertical tab",
	13: "carriage return",
	27: "escape",
	8203: "zero width space",
	8204: "zero width non-joiner",
	8205: "zero width joiner",
	8206: "left-to-right mark",
	8207: "right-to-left mark",
	8232: "line separator",
	8237: "left-to-right override",
	8238: "right-to-left override",
	8294: "left-to-right isolate",
	8295: "right-to-left isolate",
	8297: "pop directional isolate",
	8233: "paragraph separator",
	65279: "zero width no-break space",
	65532: "object replacement"
};
var _supportsTabSize = null;
function supportsTabSize() {
	var _a;
	if (_supportsTabSize == null && typeof document != "undefined" && document.body) {
		let styles = document.body.style;
		_supportsTabSize = ((_a = styles.tabSize) !== null && _a !== void 0 ? _a : styles.MozTabSize) != null;
	}
	return _supportsTabSize || false;
}
var specialCharConfig = Facet.define({ combine(configs) {
	let config = combineConfig(configs, {
		render: null,
		specialChars: Specials,
		addSpecialChars: null
	});
	if (config.replaceTabs = !supportsTabSize()) config.specialChars = new RegExp("	|" + config.specialChars.source, UnicodeRegexpSupport);
	if (config.addSpecialChars) config.specialChars = new RegExp(config.specialChars.source + "|" + config.addSpecialChars.source, UnicodeRegexpSupport);
	return config;
} });
function highlightSpecialChars(config = {}) {
	return [specialCharConfig.of(config), specialCharPlugin()];
}
var _plugin = null;
function specialCharPlugin() {
	return _plugin || (_plugin = ViewPlugin.fromClass(class {
		constructor(view) {
			this.view = view;
			this.decorations = Decoration.none;
			this.decorationCache = Object.create(null);
			this.decorator = this.makeDecorator(view.state.facet(specialCharConfig));
			this.decorations = this.decorator.createDeco(view);
		}
		makeDecorator(conf) {
			return new MatchDecorator({
				regexp: conf.specialChars,
				decoration: (m, view, pos) => {
					let { doc } = view.state;
					let code = codePointAt(m[0], 0);
					if (code == 9) {
						let line = doc.lineAt(pos);
						let size = view.state.tabSize, col = countColumn(line.text, size, pos - line.from);
						return Decoration.replace({ widget: new TabWidget((size - col % size) * this.view.defaultCharacterWidth / this.view.scaleX) });
					}
					return this.decorationCache[code] || (this.decorationCache[code] = Decoration.replace({ widget: new SpecialCharWidget(conf, code) }));
				},
				boundary: conf.replaceTabs ? void 0 : /[^]/
			});
		}
		update(update) {
			let conf = update.state.facet(specialCharConfig);
			if (update.startState.facet(specialCharConfig) != conf) {
				this.decorator = this.makeDecorator(conf);
				this.decorations = this.decorator.createDeco(update.view);
			} else this.decorations = this.decorator.updateDeco(update, this.decorations);
		}
	}, { decorations: (v) => v.decorations }));
}
var DefaultPlaceholder = "•";
function placeholder$1(code) {
	if (code >= 32) return DefaultPlaceholder;
	if (code == 10) return "␤";
	return String.fromCharCode(9216 + code);
}
var SpecialCharWidget = class extends WidgetType {
	constructor(options, code) {
		super();
		this.options = options;
		this.code = code;
	}
	eq(other) {
		return other.code == this.code;
	}
	toDOM(view) {
		let ph = placeholder$1(this.code);
		let desc = view.state.phrase("Control character") + " " + (Names[this.code] || "0x" + this.code.toString(16));
		let custom = this.options.render && this.options.render(this.code, desc, ph);
		if (custom) return custom;
		let span = document.createElement("span");
		span.textContent = ph;
		span.title = desc;
		span.setAttribute("aria-label", desc);
		span.className = "cm-specialChar";
		return span;
	}
	ignoreEvent() {
		return false;
	}
};
var TabWidget = class extends WidgetType {
	constructor(width) {
		super();
		this.width = width;
	}
	eq(other) {
		return other.width == this.width;
	}
	toDOM() {
		let span = document.createElement("span");
		span.textContent = "	";
		span.className = "cm-tab";
		span.style.width = this.width + "px";
		return span;
	}
	ignoreEvent() {
		return false;
	}
};
var Placeholder$1 = class extends WidgetType {
	constructor(content) {
		super();
		this.content = content;
	}
	toDOM(view) {
		let wrap = document.createElement("span");
		wrap.className = "cm-placeholder";
		wrap.style.pointerEvents = "none";
		wrap.appendChild(typeof this.content == "string" ? document.createTextNode(this.content) : typeof this.content == "function" ? this.content(view) : this.content.cloneNode(true));
		wrap.setAttribute("aria-hidden", "true");
		return wrap;
	}
	coordsAt(dom) {
		let rects = dom.firstChild ? clientRectsFor(dom.firstChild) : [];
		if (!rects.length) return null;
		let style = window.getComputedStyle(dom.parentNode);
		let rect = flattenRect(rects[0], style.direction != "rtl");
		let lineHeight = parseInt(style.lineHeight);
		if (rect.bottom - rect.top > lineHeight * 1.5) return {
			left: rect.left,
			right: rect.right,
			top: rect.top,
			bottom: rect.top + lineHeight
		};
		return rect;
	}
	ignoreEvent() {
		return false;
	}
};
function placeholder(content) {
	let plugin = ViewPlugin.fromClass(class {
		constructor(view) {
			this.view = view;
			this.placeholder = content ? Decoration.set([Decoration.widget({
				widget: new Placeholder$1(content),
				side: 1
			}).range(0)]) : Decoration.none;
		}
		get decorations() {
			return this.view.state.doc.length ? Decoration.none : this.placeholder;
		}
	}, { decorations: (v) => v.decorations });
	return typeof content == "string" ? [plugin, EditorView.contentAttributes.of({ "aria-placeholder": content })] : plugin;
}
var Outside = "-10000px";
var TooltipViewManager = class {
	constructor(view, facet, createTooltipView, removeTooltipView) {
		this.facet = facet;
		this.createTooltipView = createTooltipView;
		this.removeTooltipView = removeTooltipView;
		this.input = view.state.facet(facet);
		this.tooltips = this.input.filter((t) => t);
		let prev = null;
		this.tooltipViews = this.tooltips.map((t) => prev = createTooltipView(t, prev));
	}
	update(update, above) {
		var _a;
		let input = update.state.facet(this.facet);
		let tooltips = input.filter((x) => x);
		if (input === this.input) {
			for (let t of this.tooltipViews) if (t.update) t.update(update);
			return false;
		}
		let tooltipViews = [], newAbove = above ? [] : null;
		for (let i = 0; i < tooltips.length; i++) {
			let tip = tooltips[i], known = -1;
			if (!tip) continue;
			for (let i = 0; i < this.tooltips.length; i++) {
				let other = this.tooltips[i];
				if (other && other.create == tip.create) known = i;
			}
			if (known < 0) {
				tooltipViews[i] = this.createTooltipView(tip, i ? tooltipViews[i - 1] : null);
				if (newAbove) newAbove[i] = !!tip.above;
			} else {
				let tooltipView = tooltipViews[i] = this.tooltipViews[known];
				if (newAbove) newAbove[i] = above[known];
				if (tooltipView.update) tooltipView.update(update);
			}
		}
		for (let t of this.tooltipViews) if (tooltipViews.indexOf(t) < 0) {
			this.removeTooltipView(t);
			(_a = t.destroy) === null || _a === void 0 || _a.call(t);
		}
		if (above) {
			newAbove.forEach((val, i) => above[i] = val);
			above.length = newAbove.length;
		}
		this.input = input;
		this.tooltips = tooltips;
		this.tooltipViews = tooltipViews;
		return true;
	}
};
function tooltips(config = {}) {
	return tooltipConfig.of(config);
}
function windowSpace(view) {
	let docElt = view.dom.ownerDocument.documentElement;
	return {
		top: 0,
		left: 0,
		bottom: docElt.clientHeight,
		right: docElt.clientWidth
	};
}
var tooltipConfig = Facet.define({ combine: (values) => {
	var _a, _b, _c;
	return {
		position: browser.ios ? "absolute" : ((_a = values.find((conf) => conf.position)) === null || _a === void 0 ? void 0 : _a.position) || "fixed",
		parent: ((_b = values.find((conf) => conf.parent)) === null || _b === void 0 ? void 0 : _b.parent) || null,
		tooltipSpace: ((_c = values.find((conf) => conf.tooltipSpace)) === null || _c === void 0 ? void 0 : _c.tooltipSpace) || windowSpace
	};
} });
var knownHeight = new WeakMap();
var tooltipPlugin = ViewPlugin.fromClass(class {
	constructor(view) {
		this.view = view;
		this.above = [];
		this.inView = true;
		this.madeAbsolute = false;
		this.lastTransaction = 0;
		this.measureTimeout = -1;
		let config = view.state.facet(tooltipConfig);
		this.position = config.position;
		this.parent = config.parent;
		this.classes = view.themeClasses;
		this.createContainer();
		this.measureReq = {
			read: this.readMeasure.bind(this),
			write: this.writeMeasure.bind(this),
			key: this
		};
		this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null;
		this.manager = new TooltipViewManager(view, showTooltip, (t, p) => this.createTooltip(t, p), (t) => {
			if (this.resizeObserver) this.resizeObserver.unobserve(t.dom);
			t.dom.remove();
		});
		this.above = this.manager.tooltips.map((t) => !!t.above);
		this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((entries) => {
			if (Date.now() > this.lastTransaction - 50 && entries.length > 0 && entries[entries.length - 1].intersectionRatio < 1) this.measureSoon();
		}, { threshold: [1] }) : null;
		this.observeIntersection();
		view.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this));
		this.maybeMeasure();
	}
	createContainer() {
		if (this.parent) {
			this.container = document.createElement("div");
			this.container.style.position = "relative";
			this.container.className = this.view.themeClasses;
			this.parent.appendChild(this.container);
		} else this.container = this.view.dom;
	}
	observeIntersection() {
		if (this.intersectionObserver) {
			this.intersectionObserver.disconnect();
			for (let tooltip of this.manager.tooltipViews) this.intersectionObserver.observe(tooltip.dom);
		}
	}
	measureSoon() {
		if (this.measureTimeout < 0) this.measureTimeout = setTimeout(() => {
			this.measureTimeout = -1;
			this.maybeMeasure();
		}, 50);
	}
	update(update) {
		if (update.transactions.length) this.lastTransaction = Date.now();
		let updated = this.manager.update(update, this.above);
		if (updated) this.observeIntersection();
		let shouldMeasure = updated || update.geometryChanged;
		let newConfig = update.state.facet(tooltipConfig);
		if (newConfig.position != this.position && !this.madeAbsolute) {
			this.position = newConfig.position;
			for (let t of this.manager.tooltipViews) t.dom.style.position = this.position;
			shouldMeasure = true;
		}
		if (newConfig.parent != this.parent) {
			if (this.parent) this.container.remove();
			this.parent = newConfig.parent;
			this.createContainer();
			for (let t of this.manager.tooltipViews) this.container.appendChild(t.dom);
			shouldMeasure = true;
		} else if (this.parent && this.view.themeClasses != this.classes) this.classes = this.container.className = this.view.themeClasses;
		if (shouldMeasure) this.maybeMeasure();
	}
	createTooltip(tooltip, prev) {
		let tooltipView = tooltip.create(this.view);
		let before = prev ? prev.dom : null;
		tooltipView.dom.classList.add("cm-tooltip");
		if (tooltip.arrow && !tooltipView.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
			let arrow = document.createElement("div");
			arrow.className = "cm-tooltip-arrow";
			tooltipView.dom.appendChild(arrow);
		}
		tooltipView.dom.style.position = this.position;
		tooltipView.dom.style.top = Outside;
		tooltipView.dom.style.left = "0px";
		this.container.insertBefore(tooltipView.dom, before);
		if (tooltipView.mount) tooltipView.mount(this.view);
		if (this.resizeObserver) this.resizeObserver.observe(tooltipView.dom);
		return tooltipView;
	}
	destroy() {
		var _a, _b, _c;
		this.view.win.removeEventListener("resize", this.measureSoon);
		for (let tooltipView of this.manager.tooltipViews) {
			tooltipView.dom.remove();
			(_a = tooltipView.destroy) === null || _a === void 0 || _a.call(tooltipView);
		}
		if (this.parent) this.container.remove();
		(_b = this.resizeObserver) === null || _b === void 0 || _b.disconnect();
		(_c = this.intersectionObserver) === null || _c === void 0 || _c.disconnect();
		clearTimeout(this.measureTimeout);
	}
	readMeasure() {
		let scaleX = 1, scaleY = 1, makeAbsolute = false;
		if (this.position == "fixed" && this.manager.tooltipViews.length) {
			let { dom } = this.manager.tooltipViews[0];
			if (browser.safari) {
				let rect = dom.getBoundingClientRect();
				makeAbsolute = Math.abs(rect.top + 1e4) > 1 || Math.abs(rect.left) > 1;
			} else makeAbsolute = !!dom.offsetParent && dom.offsetParent != this.container.ownerDocument.body;
		}
		if (makeAbsolute || this.position == "absolute") {
			if (this.parent) {
				let rect = this.parent.getBoundingClientRect();
				if (rect.width && rect.height) {
					scaleX = rect.width / this.parent.offsetWidth;
					scaleY = rect.height / this.parent.offsetHeight;
				}
			} else ({scaleX, scaleY} = this.view.viewState);
		}
		let visible = this.view.scrollDOM.getBoundingClientRect(), margins = getScrollMargins(this.view);
		return {
			visible: {
				left: visible.left + margins.left,
				top: visible.top + margins.top,
				right: visible.right - margins.right,
				bottom: visible.bottom - margins.bottom
			},
			parent: this.parent ? this.container.getBoundingClientRect() : this.view.dom.getBoundingClientRect(),
			pos: this.manager.tooltips.map((t, i) => {
				let tv = this.manager.tooltipViews[i];
				return tv.getCoords ? tv.getCoords(t.pos) : this.view.coordsAtPos(t.pos);
			}),
			size: this.manager.tooltipViews.map(({ dom }) => dom.getBoundingClientRect()),
			space: this.view.state.facet(tooltipConfig).tooltipSpace(this.view),
			scaleX,
			scaleY,
			makeAbsolute
		};
	}
	writeMeasure(measured) {
		var _a;
		if (measured.makeAbsolute) {
			this.madeAbsolute = true;
			this.position = "absolute";
			for (let t of this.manager.tooltipViews) t.dom.style.position = "absolute";
		}
		let { visible, space, scaleX, scaleY } = measured;
		let others = [];
		for (let i = 0; i < this.manager.tooltips.length; i++) {
			let tooltip = this.manager.tooltips[i], tView = this.manager.tooltipViews[i], { dom } = tView;
			let pos = measured.pos[i], size = measured.size[i];
			if (!pos || tooltip.clip !== false && (pos.bottom <= Math.max(visible.top, space.top) || pos.top >= Math.min(visible.bottom, space.bottom) || pos.right < Math.max(visible.left, space.left) - .1 || pos.left > Math.min(visible.right, space.right) + .1)) {
				dom.style.top = Outside;
				continue;
			}
			let arrow = tooltip.arrow ? tView.dom.querySelector(".cm-tooltip-arrow") : null;
			let arrowHeight = arrow ? 7 : 0;
			let width = size.right - size.left, height = (_a = knownHeight.get(tView)) !== null && _a !== void 0 ? _a : size.bottom - size.top;
			let offset = tView.offset || noOffset, ltr = this.view.textDirection == Direction.LTR;
			let left = size.width > space.right - space.left ? ltr ? space.left : space.right - size.width : ltr ? Math.max(space.left, Math.min(pos.left - (arrow ? 14 : 0) + offset.x, space.right - width)) : Math.min(Math.max(space.left, pos.left - width + (arrow ? 14 : 0) - offset.x), space.right - width);
			let above = this.above[i];
			if (!tooltip.strictSide && (above ? pos.top - height - arrowHeight - offset.y < space.top : pos.bottom + height + arrowHeight + offset.y > space.bottom) && above == space.bottom - pos.bottom > pos.top - space.top) above = this.above[i] = !above;
			let spaceVert = (above ? pos.top - space.top : space.bottom - pos.bottom) - arrowHeight;
			if (spaceVert < height && tView.resize !== false) {
				if (spaceVert < this.view.defaultLineHeight) {
					dom.style.top = Outside;
					continue;
				}
				knownHeight.set(tView, height);
				dom.style.height = (height = spaceVert) / scaleY + "px";
			} else if (dom.style.height) dom.style.height = "";
			let top = above ? pos.top - height - arrowHeight - offset.y : pos.bottom + arrowHeight + offset.y;
			let right = left + width;
			if (tView.overlap !== true) {
				for (let r of others) if (r.left < right && r.right > left && r.top < top + height && r.bottom > top) top = above ? r.top - height - 2 - arrowHeight : r.bottom + arrowHeight + 2;
			}
			if (this.position == "absolute") {
				dom.style.top = (top - measured.parent.top) / scaleY + "px";
				setLeftStyle(dom, (left - measured.parent.left) / scaleX);
			} else {
				dom.style.top = top / scaleY + "px";
				setLeftStyle(dom, left / scaleX);
			}
			if (arrow) {
				let arrowLeft = pos.left + (ltr ? offset.x : -offset.x) - (left + 14 - 7);
				arrow.style.left = arrowLeft / scaleX + "px";
			}
			if (tView.overlap !== true) others.push({
				left,
				top,
				right,
				bottom: top + height
			});
			dom.classList.toggle("cm-tooltip-above", above);
			dom.classList.toggle("cm-tooltip-below", !above);
			if (tView.positioned) tView.positioned(measured.space);
		}
	}
	maybeMeasure() {
		if (this.manager.tooltips.length) {
			if (this.view.inView) this.view.requestMeasure(this.measureReq);
			if (this.inView != this.view.inView) {
				this.inView = this.view.inView;
				if (!this.inView) for (let tv of this.manager.tooltipViews) tv.dom.style.top = Outside;
			}
		}
	}
}, { eventObservers: { scroll() {
	this.maybeMeasure();
} } });
function setLeftStyle(elt, value) {
	let current = parseInt(elt.style.left, 10);
	if (isNaN(current) || Math.abs(value - current) > 1) elt.style.left = value + "px";
}
var baseTheme$3 = EditorView.baseTheme({
	".cm-tooltip": {
		zIndex: 500,
		boxSizing: "border-box"
	},
	"&light .cm-tooltip": {
		border: "1px solid #bbb",
		backgroundColor: "#f5f5f5"
	},
	"&light .cm-tooltip-section:not(:first-child)": { borderTop: "1px solid #bbb" },
	"&dark .cm-tooltip": {
		backgroundColor: "#333338",
		color: "white"
	},
	".cm-tooltip-arrow": {
		height: `7px`,
		width: `14px`,
		position: "absolute",
		zIndex: -1,
		overflow: "hidden",
		"&:before, &:after": {
			content: "''",
			position: "absolute",
			width: 0,
			height: 0,
			borderLeft: `7px solid transparent`,
			borderRight: `7px solid transparent`
		},
		".cm-tooltip-above &": {
			bottom: `-7px`,
			"&:before": { borderTop: `7px solid #bbb` },
			"&:after": {
				borderTop: `7px solid #f5f5f5`,
				bottom: "1px"
			}
		},
		".cm-tooltip-below &": {
			top: `-7px`,
			"&:before": { borderBottom: `7px solid #bbb` },
			"&:after": {
				borderBottom: `7px solid #f5f5f5`,
				top: "1px"
			}
		}
	},
	"&dark .cm-tooltip .cm-tooltip-arrow": {
		"&:before": {
			borderTopColor: "#333338",
			borderBottomColor: "#333338"
		},
		"&:after": {
			borderTopColor: "transparent",
			borderBottomColor: "transparent"
		}
	}
});
var noOffset = {
	x: 0,
	y: 0
};
var showTooltip = Facet.define({ enables: [tooltipPlugin, baseTheme$3] });
var showHoverTooltip = Facet.define({ combine: (inputs) => inputs.reduce((a, i) => a.concat(i), []) });
var HoverTooltipHost = class HoverTooltipHost {
	static create(view) {
		return new HoverTooltipHost(view);
	}
	constructor(view) {
		this.view = view;
		this.mounted = false;
		this.dom = document.createElement("div");
		this.dom.classList.add("cm-tooltip-hover");
		this.manager = new TooltipViewManager(view, showHoverTooltip, (t, p) => this.createHostedView(t, p), (t) => t.dom.remove());
	}
	createHostedView(tooltip, prev) {
		let hostedView = tooltip.create(this.view);
		hostedView.dom.classList.add("cm-tooltip-section");
		this.dom.insertBefore(hostedView.dom, prev ? prev.dom.nextSibling : this.dom.firstChild);
		if (this.mounted && hostedView.mount) hostedView.mount(this.view);
		return hostedView;
	}
	mount(view) {
		for (let hostedView of this.manager.tooltipViews) if (hostedView.mount) hostedView.mount(view);
		this.mounted = true;
	}
	positioned(space) {
		for (let hostedView of this.manager.tooltipViews) if (hostedView.positioned) hostedView.positioned(space);
	}
	update(update) {
		this.manager.update(update);
	}
	destroy() {
		var _a;
		for (let t of this.manager.tooltipViews) (_a = t.destroy) === null || _a === void 0 || _a.call(t);
	}
	passProp(name) {
		let value = void 0;
		for (let view of this.manager.tooltipViews) {
			let given = view[name];
			if (given !== void 0) {
				if (value === void 0) value = given;
				else if (value !== given) return void 0;
			}
		}
		return value;
	}
	get offset() {
		return this.passProp("offset");
	}
	get getCoords() {
		return this.passProp("getCoords");
	}
	get overlap() {
		return this.passProp("overlap");
	}
	get resize() {
		return this.passProp("resize");
	}
};
var showHoverTooltipHost = showTooltip.compute([showHoverTooltip], (state) => {
	let tooltips = state.facet(showHoverTooltip);
	if (tooltips.length === 0) return null;
	return {
		pos: Math.min(...tooltips.map((t) => t.pos)),
		end: Math.max(...tooltips.map((t) => {
			var _a;
			return (_a = t.end) !== null && _a !== void 0 ? _a : t.pos;
		})),
		create: HoverTooltipHost.create,
		above: tooltips[0].above,
		arrow: tooltips.some((t) => t.arrow)
	};
});
var hoverPlugin = Facet.define();
var HoverPlugin = class {
	constructor(view, source, field, locked, setHover, hoverTime) {
		this.view = view;
		this.source = source;
		this.field = field;
		this.locked = locked;
		this.setHover = setHover;
		this.hoverTime = hoverTime;
		this.hoverTimeout = -1;
		this.restartTimeout = -1;
		this.pending = null;
		this.lastMove = {
			x: 0,
			y: 0,
			target: view.dom,
			time: 0
		};
		this.checkHover = this.checkHover.bind(this);
		view.dom.addEventListener("mouseleave", this.mouseleave = this.mouseleave.bind(this));
		view.dom.addEventListener("mousemove", this.mousemove = this.mousemove.bind(this));
	}
	update(update) {
		if (this.pending) {
			this.pending = null;
			clearTimeout(this.restartTimeout);
			this.restartTimeout = setTimeout(() => this.startHover(), 20);
		}
	}
	get active() {
		return this.view.state.field(this.field);
	}
	checkHover() {
		this.hoverTimeout = -1;
		if (this.active.length) return;
		let hovered = Date.now() - this.lastMove.time;
		if (hovered < this.hoverTime) this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime - hovered);
		else this.startHover();
	}
	startHover() {
		clearTimeout(this.restartTimeout);
		let { view, lastMove } = this;
		let tile = view.docView.tile.nearest(lastMove.target);
		if (!tile) return;
		let pos, side = 1;
		if (tile.isWidget()) pos = tile.posAtStart;
		else {
			pos = view.posAtCoords(lastMove);
			if (pos == null) return;
			let posCoords = view.coordsAtPos(pos);
			if (!posCoords || lastMove.y < posCoords.top || lastMove.y > posCoords.bottom || lastMove.x < posCoords.left - view.defaultCharacterWidth || lastMove.x > posCoords.right + view.defaultCharacterWidth) return;
			let bidi = view.bidiSpans(view.state.doc.lineAt(pos)).find((s) => s.from <= pos && s.to >= pos);
			let rtl = bidi && bidi.dir == Direction.RTL ? -1 : 1;
			side = lastMove.x < posCoords.left ? -rtl : rtl;
		}
		this.activateHover(view, pos, side);
	}
	activateHover(view, pos, side, locked) {
		let open = this.source(view, pos, side);
		let done = (value) => {
			if (value && !(Array.isArray(value) && !value.length)) {
				let tooltips = Array.isArray(value) ? value : [value];
				if (locked) this.locked.set(tooltips, locked);
				view.dispatch({ effects: this.setHover.of(tooltips) });
			}
		};
		if (open && "then" in open) {
			let pending = this.pending = { pos };
			open.then((result) => {
				if (this.pending == pending) {
					this.pending = null;
					done(result);
				}
			}, (e) => logException(view.state, e, "hover tooltip"));
		} else done(open);
	}
	get tooltip() {
		let plugin = this.view.plugin(tooltipPlugin);
		let index = plugin ? plugin.manager.tooltips.findIndex((t) => t.create == HoverTooltipHost.create) : -1;
		return index > -1 ? plugin.manager.tooltipViews[index] : null;
	}
	mousemove(event) {
		var _a, _b;
		this.lastMove = {
			x: event.clientX,
			y: event.clientY,
			target: event.target,
			time: Date.now()
		};
		if (this.hoverTimeout < 0) this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime);
		let { active, tooltip } = this;
		if (active.length && !this.locked.has(active) && tooltip && !isInTooltip(tooltip.dom, event) || this.pending) {
			let { pos } = active[0] || this.pending, end = (_b = (_a = active[0]) === null || _a === void 0 ? void 0 : _a.end) !== null && _b !== void 0 ? _b : pos;
			if (pos == end ? this.view.posAtCoords(this.lastMove) != pos : !isOverRange(this.view, pos, end, event.clientX, event.clientY)) {
				this.view.dispatch({ effects: this.setHover.of([]) });
				this.pending = null;
			}
		}
	}
	mouseleave(event) {
		clearTimeout(this.hoverTimeout);
		this.hoverTimeout = -1;
		let { active } = this;
		if (active.length && !this.locked.has(active)) {
			let { tooltip } = this;
			if (!(tooltip && tooltip.dom.contains(event.relatedTarget))) this.view.dispatch({ effects: this.setHover.of([]) });
			else this.watchTooltipLeave(tooltip.dom);
		}
	}
	watchTooltipLeave(tooltip) {
		let watch = (event) => {
			tooltip.removeEventListener("mouseleave", watch);
			let { active } = this;
			if (active.length && !this.locked.has(active) && !this.view.dom.contains(event.relatedTarget)) this.view.dispatch({ effects: this.setHover.of([]) });
		};
		tooltip.addEventListener("mouseleave", watch);
	}
	destroy() {
		clearTimeout(this.hoverTimeout);
		clearTimeout(this.restartTimeout);
		this.view.dom.removeEventListener("mouseleave", this.mouseleave);
		this.view.dom.removeEventListener("mousemove", this.mousemove);
	}
};
var tooltipMargin = 4;
function isInTooltip(tooltip, event) {
	let { left, right, top, bottom } = tooltip.getBoundingClientRect(), arrow;
	if (arrow = tooltip.querySelector(".cm-tooltip-arrow")) {
		let arrowRect = arrow.getBoundingClientRect();
		top = Math.min(arrowRect.top, top);
		bottom = Math.max(arrowRect.bottom, bottom);
	}
	return event.clientX >= left - tooltipMargin && event.clientX <= right + tooltipMargin && event.clientY >= top - tooltipMargin && event.clientY <= bottom + tooltipMargin;
}
function isOverRange(view, from, to, x, y, margin) {
	let rect = view.scrollDOM.getBoundingClientRect();
	let docBottom = view.documentTop + view.documentPadding.top + view.contentHeight;
	if (rect.left > x || rect.right < x || rect.top > y || Math.min(rect.bottom, docBottom) < y) return false;
	let pos = view.posAtCoords({
		x,
		y
	}, false);
	return pos >= from && pos <= to;
}
function hoverTooltip(source, options = {}) {
	let setHover = StateEffect.define();
	let locked = new WeakMap();
	let hoverState = StateField.define({
		create() {
			return [];
		},
		update(value, tr) {
			let lock = locked.get(value);
			if (value.length) {
				if (options.hideOnChange && (tr.docChanged || tr.selection)) value = [];
				else if (lock && lock(tr)) value = [];
				else if (options.hideOn) value = value.filter((v) => !options.hideOn(tr, v));
			}
			if (tr.docChanged && value.length) {
				let mapped = [];
				for (let tooltip of value) {
					let newPos = tr.changes.mapPos(tooltip.pos, -1, MapMode.TrackDel);
					if (newPos != null) {
						let copy = Object.assign(Object.create(null), tooltip);
						copy.pos = newPos;
						if (copy.end != null) copy.end = tr.changes.mapPos(copy.end);
						mapped.push(copy);
					}
				}
				value = mapped;
			}
			for (let effect of tr.effects) {
				if (effect.is(setHover)) {
					value = effect.value;
					lock = void 0;
				}
				if (effect.is(closeHoverTooltipEffect) && !effect.value || effect.value == hoverState) value = [];
			}
			if (value.length && lock) locked.set(value, lock);
			return value;
		},
		provide: (f) => showHoverTooltip.from(f)
	});
	const plugin = ViewPlugin.define((view) => new HoverPlugin(view, source, hoverState, locked, setHover, options.hoverTime || 300));
	return {
		active: hoverState,
		extension: [
			hoverState,
			plugin,
			hoverPlugin.of(plugin),
			showHoverTooltipHost
		]
	};
}
function getTooltip(view, tooltip) {
	let plugin = view.plugin(tooltipPlugin);
	if (!plugin) return null;
	let found = plugin.manager.tooltips.indexOf(tooltip);
	return found < 0 ? null : plugin.manager.tooltipViews[found];
}
var closeHoverTooltipEffect = StateEffect.define();
var panelConfig = Facet.define({ combine(configs) {
	let topContainer, bottomContainer;
	for (let c of configs) {
		topContainer = topContainer || c.topContainer;
		bottomContainer = bottomContainer || c.bottomContainer;
	}
	return {
		topContainer,
		bottomContainer
	};
} });
var panelPlugin = ViewPlugin.fromClass(class {
	constructor(view) {
		this.input = view.state.facet(showPanel);
		this.specs = this.input.filter((s) => s);
		this.panels = this.specs.map((spec) => spec(view));
		let conf = view.state.facet(panelConfig);
		this.top = new PanelGroup(view, true, conf.topContainer);
		this.bottom = new PanelGroup(view, false, conf.bottomContainer);
		this.top.sync(this.panels.filter((p) => p.top));
		this.bottom.sync(this.panels.filter((p) => !p.top));
		for (let p of this.panels) {
			p.dom.classList.add("cm-panel");
			if (p.mount) p.mount();
		}
	}
	update(update) {
		let conf = update.state.facet(panelConfig);
		if (this.top.container != conf.topContainer) {
			this.top.sync([]);
			this.top = new PanelGroup(update.view, true, conf.topContainer);
		}
		if (this.bottom.container != conf.bottomContainer) {
			this.bottom.sync([]);
			this.bottom = new PanelGroup(update.view, false, conf.bottomContainer);
		}
		this.top.syncClasses();
		this.bottom.syncClasses();
		let input = update.state.facet(showPanel);
		if (input != this.input) {
			let specs = input.filter((x) => x);
			let panels = [], top = [], bottom = [], mount = [];
			for (let spec of specs) {
				let known = this.specs.indexOf(spec), panel;
				if (known < 0) {
					panel = spec(update.view);
					mount.push(panel);
				} else {
					panel = this.panels[known];
					if (panel.update) panel.update(update);
				}
				panels.push(panel);
				(panel.top ? top : bottom).push(panel);
			}
			this.specs = specs;
			this.panels = panels;
			this.top.sync(top);
			this.bottom.sync(bottom);
			for (let p of mount) {
				p.dom.classList.add("cm-panel");
				if (p.mount) p.mount();
			}
		} else for (let p of this.panels) if (p.update) p.update(update);
	}
	destroy() {
		this.top.sync([]);
		this.bottom.sync([]);
	}
}, { provide: (plugin) => EditorView.scrollMargins.of((view) => {
	let value = view.plugin(plugin);
	return value && {
		top: value.top.scrollMargin(),
		bottom: value.bottom.scrollMargin()
	};
}) });
var PanelGroup = class {
	constructor(view, top, container) {
		this.view = view;
		this.top = top;
		this.container = container;
		this.dom = void 0;
		this.classes = "";
		this.panels = [];
		this.syncClasses();
	}
	sync(panels) {
		for (let p of this.panels) if (p.destroy && panels.indexOf(p) < 0) p.destroy();
		this.panels = panels;
		this.syncDOM();
	}
	syncDOM() {
		if (this.panels.length == 0) {
			if (this.dom) {
				this.dom.remove();
				this.dom = void 0;
			}
			return;
		}
		if (!this.dom) {
			this.dom = document.createElement("div");
			this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom";
			let parent = this.container || this.view.dom;
			parent.insertBefore(this.dom, this.top ? parent.firstChild : null);
		}
		let curDOM = this.dom.firstChild;
		for (let panel of this.panels) if (panel.dom.parentNode == this.dom) {
			while (curDOM != panel.dom) curDOM = rm(curDOM);
			curDOM = curDOM.nextSibling;
		} else this.dom.insertBefore(panel.dom, curDOM);
		while (curDOM) curDOM = rm(curDOM);
	}
	scrollMargin() {
		return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - Math.max(0, this.view.scrollDOM.getBoundingClientRect().top) : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) - this.dom.getBoundingClientRect().top);
	}
	syncClasses() {
		if (!this.container || this.classes == this.view.themeClasses) return;
		for (let cls of this.classes.split(" ")) if (cls) this.container.classList.remove(cls);
		for (let cls of (this.classes = this.view.themeClasses).split(" ")) if (cls) this.container.classList.add(cls);
	}
};
function rm(node) {
	let next = node.nextSibling;
	node.remove();
	return next;
}
var showPanel = Facet.define({ enables: panelPlugin });
var GutterMarker = class extends RangeValue {
	compare(other) {
		return this == other || this.constructor == other.constructor && this.eq(other);
	}
	eq(other) {
		return false;
	}
	destroy(dom) {}
};
GutterMarker.prototype.elementClass = "";
GutterMarker.prototype.toDOM = void 0;
GutterMarker.prototype.mapMode = MapMode.TrackBefore;
GutterMarker.prototype.startSide = GutterMarker.prototype.endSide = -1;
GutterMarker.prototype.point = true;
var gutterLineClass = Facet.define();
var gutterWidgetClass = Facet.define();
var defaults$1 = {
	class: "",
	renderEmptyElements: false,
	elementStyle: "",
	markers: () => RangeSet.empty,
	lineMarker: () => null,
	widgetMarker: () => null,
	lineMarkerChange: null,
	initialSpacer: null,
	updateSpacer: null,
	domEventHandlers: {},
	side: "before"
};
var activeGutters = Facet.define();
function gutter(config) {
	return [gutters(), activeGutters.of({
		...defaults$1,
		...config
	})];
}
var unfixGutters = Facet.define({ combine: (values) => values.some((x) => x) });
function gutters(config) {
	let result = [gutterView];
	if (config && config.fixed === false) result.push(unfixGutters.of(true));
	return result;
}
var gutterView = ViewPlugin.fromClass(class {
	constructor(view) {
		this.view = view;
		this.domAfter = null;
		this.prevViewport = view.viewport;
		this.dom = document.createElement("div");
		this.dom.className = "cm-gutters cm-gutters-before";
		this.dom.setAttribute("aria-hidden", "true");
		this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px";
		this.gutters = view.state.facet(activeGutters).map((conf) => new SingleGutterView(view, conf));
		this.fixed = !view.state.facet(unfixGutters);
		for (let gutter of this.gutters) if (gutter.config.side == "after") this.getDOMAfter().appendChild(gutter.dom);
		else this.dom.appendChild(gutter.dom);
		if (this.fixed) this.dom.style.position = "sticky";
		this.syncGutters(false);
		view.scrollDOM.insertBefore(this.dom, view.contentDOM);
	}
	getDOMAfter() {
		if (!this.domAfter) {
			this.domAfter = document.createElement("div");
			this.domAfter.className = "cm-gutters cm-gutters-after";
			this.domAfter.setAttribute("aria-hidden", "true");
			this.domAfter.style.minHeight = this.view.contentHeight / this.view.scaleY + "px";
			this.domAfter.style.position = this.fixed ? "sticky" : "";
			this.view.scrollDOM.appendChild(this.domAfter);
		}
		return this.domAfter;
	}
	update(update) {
		if (this.updateGutters(update)) {
			let vpA = this.prevViewport, vpB = update.view.viewport;
			let vpOverlap = Math.min(vpA.to, vpB.to) - Math.max(vpA.from, vpB.from);
			this.syncGutters(vpOverlap < (vpB.to - vpB.from) * .8);
		}
		if (update.geometryChanged) {
			let min = this.view.contentHeight / this.view.scaleY + "px";
			this.dom.style.minHeight = min;
			if (this.domAfter) this.domAfter.style.minHeight = min;
		}
		if (this.view.state.facet(unfixGutters) != !this.fixed) {
			this.fixed = !this.fixed;
			this.dom.style.position = this.fixed ? "sticky" : "";
			if (this.domAfter) this.domAfter.style.position = this.fixed ? "sticky" : "";
		}
		this.prevViewport = update.view.viewport;
	}
	syncGutters(detach) {
		let after = this.dom.nextSibling;
		if (detach) {
			this.dom.remove();
			if (this.domAfter) this.domAfter.remove();
		}
		let lineClasses = RangeSet.iter(this.view.state.facet(gutterLineClass), this.view.viewport.from);
		let classSet = [];
		let contexts = this.gutters.map((gutter) => new UpdateContext(gutter, this.view.viewport, -this.view.documentPadding.top));
		for (let line of this.view.viewportLineBlocks) {
			if (classSet.length) classSet = [];
			if (Array.isArray(line.type)) {
				let first = true;
				for (let b of line.type) if (b.type == BlockType.Text && first) {
					advanceCursor(lineClasses, classSet, b.from);
					for (let cx of contexts) cx.line(this.view, b, classSet);
					first = false;
				} else if (b.widget) for (let cx of contexts) cx.widget(this.view, b);
			} else if (line.type == BlockType.Text) {
				advanceCursor(lineClasses, classSet, line.from);
				for (let cx of contexts) cx.line(this.view, line, classSet);
			} else if (line.widget) for (let cx of contexts) cx.widget(this.view, line);
		}
		for (let cx of contexts) cx.finish();
		if (detach) {
			this.view.scrollDOM.insertBefore(this.dom, after);
			if (this.domAfter) this.view.scrollDOM.appendChild(this.domAfter);
		}
	}
	updateGutters(update) {
		let prev = update.startState.facet(activeGutters), cur = update.state.facet(activeGutters);
		let change = update.docChanged || update.heightChanged || update.viewportChanged || !RangeSet.eq(update.startState.facet(gutterLineClass), update.state.facet(gutterLineClass), update.view.viewport.from, update.view.viewport.to);
		if (prev == cur) {
			for (let gutter of this.gutters) if (gutter.update(update)) change = true;
		} else {
			change = true;
			let gutters = [];
			for (let conf of cur) {
				let known = prev.indexOf(conf);
				if (known < 0) gutters.push(new SingleGutterView(this.view, conf));
				else {
					this.gutters[known].update(update);
					gutters.push(this.gutters[known]);
				}
			}
			for (let g of this.gutters) {
				g.dom.remove();
				if (gutters.indexOf(g) < 0) g.destroy();
			}
			for (let g of gutters) if (g.config.side == "after") this.getDOMAfter().appendChild(g.dom);
			else this.dom.appendChild(g.dom);
			this.gutters = gutters;
		}
		return change;
	}
	destroy() {
		for (let view of this.gutters) view.destroy();
		this.dom.remove();
		if (this.domAfter) this.domAfter.remove();
	}
}, { provide: (plugin) => EditorView.scrollMargins.of((view) => {
	let value = view.plugin(plugin);
	if (!value || value.gutters.length == 0 || !value.fixed) return null;
	let before = value.dom.offsetWidth * view.scaleX, after = value.domAfter ? value.domAfter.offsetWidth * view.scaleX : 0;
	return view.textDirection == Direction.LTR ? {
		left: before,
		right: after
	} : {
		right: before,
		left: after
	};
}) });
function asArray$1(val) {
	return Array.isArray(val) ? val : [val];
}
function advanceCursor(cursor, collect, pos) {
	while (cursor.value && cursor.from <= pos) {
		if (cursor.from == pos) collect.push(cursor.value);
		cursor.next();
	}
}
var UpdateContext = class {
	constructor(gutter, viewport, height) {
		this.gutter = gutter;
		this.height = height;
		this.i = 0;
		this.cursor = RangeSet.iter(gutter.markers, viewport.from);
	}
	addElement(view, block, markers) {
		let { gutter } = this, above = (block.top - this.height) / view.scaleY, height = block.height / view.scaleY;
		if (this.i == gutter.elements.length) {
			let newElt = new GutterElement(view, height, above, markers);
			gutter.elements.push(newElt);
			gutter.dom.appendChild(newElt.dom);
		} else gutter.elements[this.i].update(view, height, above, markers);
		this.height = block.bottom;
		this.i++;
	}
	line(view, line, extraMarkers) {
		let localMarkers = [];
		advanceCursor(this.cursor, localMarkers, line.from);
		if (extraMarkers.length) localMarkers = localMarkers.concat(extraMarkers);
		let forLine = this.gutter.config.lineMarker(view, line, localMarkers);
		if (forLine) localMarkers.unshift(forLine);
		let gutter = this.gutter;
		if (localMarkers.length == 0 && !gutter.config.renderEmptyElements) return;
		this.addElement(view, line, localMarkers);
	}
	widget(view, block) {
		let marker = this.gutter.config.widgetMarker(view, block.widget, block), markers = marker ? [marker] : null;
		for (let cls of view.state.facet(gutterWidgetClass)) {
			let marker = cls(view, block.widget, block);
			if (marker) (markers || (markers = [])).push(marker);
		}
		if (markers) this.addElement(view, block, markers);
	}
	finish() {
		let gutter = this.gutter;
		while (gutter.elements.length > this.i) {
			let last = gutter.elements.pop();
			gutter.dom.removeChild(last.dom);
			last.destroy();
		}
	}
};
var SingleGutterView = class {
	constructor(view, config) {
		this.view = view;
		this.config = config;
		this.elements = [];
		this.spacer = null;
		this.dom = document.createElement("div");
		this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
		for (let prop in config.domEventHandlers) this.dom.addEventListener(prop, (event) => {
			let target = event.target, y;
			if (target != this.dom && this.dom.contains(target)) {
				while (target.parentNode != this.dom) target = target.parentNode;
				let rect = target.getBoundingClientRect();
				y = (rect.top + rect.bottom) / 2;
			} else y = event.clientY;
			let line = view.lineBlockAtHeight(y - view.documentTop);
			if (config.domEventHandlers[prop](view, line, event)) event.preventDefault();
		});
		this.markers = asArray$1(config.markers(view));
		if (config.initialSpacer) {
			this.spacer = new GutterElement(view, 0, 0, [config.initialSpacer(view)]);
			this.dom.appendChild(this.spacer.dom);
			this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none";
		}
	}
	update(update) {
		let prevMarkers = this.markers;
		this.markers = asArray$1(this.config.markers(update.view));
		if (this.spacer && this.config.updateSpacer) {
			let updated = this.config.updateSpacer(this.spacer.markers[0], update);
			if (updated != this.spacer.markers[0]) this.spacer.update(update.view, 0, 0, [updated]);
		}
		let vp = update.view.viewport;
		return !RangeSet.eq(this.markers, prevMarkers, vp.from, vp.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(update) : false);
	}
	destroy() {
		for (let elt of this.elements) elt.destroy();
	}
};
var GutterElement = class {
	constructor(view, height, above, markers) {
		this.height = -1;
		this.above = 0;
		this.markers = [];
		this.dom = document.createElement("div");
		this.dom.className = "cm-gutterElement";
		this.update(view, height, above, markers);
	}
	update(view, height, above, markers) {
		if (this.height != height) {
			this.height = height;
			this.dom.style.height = height + "px";
		}
		if (this.above != above) this.dom.style.marginTop = (this.above = above) ? above + "px" : "";
		if (!sameMarkers(this.markers, markers)) this.setMarkers(view, markers);
	}
	setMarkers(view, markers) {
		let cls = "cm-gutterElement", domPos = this.dom.firstChild;
		for (let iNew = 0, iOld = 0;;) {
			let skipTo = iOld, marker = iNew < markers.length ? markers[iNew++] : null, matched = false;
			if (marker) {
				let c = marker.elementClass;
				if (c) cls += " " + c;
				for (let i = iOld; i < this.markers.length; i++) if (this.markers[i].compare(marker)) {
					skipTo = i;
					matched = true;
					break;
				}
			} else skipTo = this.markers.length;
			while (iOld < skipTo) {
				let next = this.markers[iOld++];
				if (next.toDOM) {
					next.destroy(domPos);
					let after = domPos.nextSibling;
					domPos.remove();
					domPos = after;
				}
			}
			if (!marker) break;
			if (marker.toDOM) {
				if (matched) domPos = domPos.nextSibling;
				else this.dom.insertBefore(marker.toDOM(view), domPos);
			}
			if (matched) iOld++;
		}
		this.dom.className = cls;
		this.markers = markers;
	}
	destroy() {
		this.setMarkers(null, []);
	}
};
function sameMarkers(a, b) {
	if (a.length != b.length) return false;
	for (let i = 0; i < a.length; i++) if (!a[i].compare(b[i])) return false;
	return true;
}
var lineNumberMarkers = Facet.define();
var lineNumberWidgetMarker = Facet.define();
var lineNumberConfig = Facet.define({ combine(values) {
	return combineConfig(values, {
		formatNumber: String,
		domEventHandlers: {}
	}, { domEventHandlers(a, b) {
		let result = Object.assign({}, a);
		for (let event in b) {
			let exists = result[event], add = b[event];
			result[event] = exists ? (view, line, event) => exists(view, line, event) || add(view, line, event) : add;
		}
		return result;
	} });
} });
var NumberMarker = class extends GutterMarker {
	constructor(number) {
		super();
		this.number = number;
	}
	eq(other) {
		return this.number == other.number;
	}
	toDOM() {
		return document.createTextNode(this.number);
	}
};
function formatNumber(view, number) {
	return view.state.facet(lineNumberConfig).formatNumber(number, view.state);
}
var lineNumberGutter = activeGutters.compute([lineNumberConfig], (state) => ({
	class: "cm-lineNumbers",
	renderEmptyElements: false,
	markers(view) {
		return view.state.facet(lineNumberMarkers);
	},
	lineMarker(view, line, others) {
		if (others.some((m) => m.toDOM)) return null;
		return new NumberMarker(formatNumber(view, view.state.doc.lineAt(line.from).number));
	},
	widgetMarker: (view, widget, block) => {
		for (let m of view.state.facet(lineNumberWidgetMarker)) {
			let result = m(view, widget, block);
			if (result) return result;
		}
		return null;
	},
	lineMarkerChange: (update) => update.startState.facet(lineNumberConfig) != update.state.facet(lineNumberConfig),
	initialSpacer(view) {
		return new NumberMarker(formatNumber(view, maxLineNumber(view.state.doc.lines)));
	},
	updateSpacer(spacer, update) {
		let max = formatNumber(update.view, maxLineNumber(update.view.state.doc.lines));
		return max == spacer.number ? spacer : new NumberMarker(max);
	},
	domEventHandlers: state.facet(lineNumberConfig).domEventHandlers,
	side: "before"
}));
function lineNumbers(config = {}) {
	return [
		lineNumberConfig.of(config),
		gutters(),
		lineNumberGutter
	];
}
function maxLineNumber(lines) {
	let last = 9;
	while (last < lines) last = last * 10 + 9;
	return last;
}
// ../../node_modules/@codemirror/language/dist/index.js
init_dist$1();
init_dist$2();
var _a;
var languageDataProp = new NodeProp();
function defineLanguageFacet(baseData) {
	return Facet.define({ combine: baseData ? (values) => values.concat(baseData) : void 0 });
}
var sublanguageProp = new NodeProp();
var Language = class {
	constructor(data, parser, extraExtensions = [], name = "") {
		this.data = data;
		this.name = name;
		if (!EditorState.prototype.hasOwnProperty("tree")) Object.defineProperty(EditorState.prototype, "tree", { get() {
			return syntaxTree(this);
		} });
		this.parser = parser;
		this.extension = [language$1.of(this), EditorState.languageData.of((state, pos, side) => {
			let top = topNodeAt(state, pos, side), data = top.type.prop(languageDataProp);
			if (!data) return [];
			let base = state.facet(data), sub = top.type.prop(sublanguageProp);
			if (sub) {
				let innerNode = top.resolve(pos - top.from, side);
				for (let sublang of sub) if (sublang.test(innerNode, state)) {
					let data = state.facet(sublang.facet);
					return sublang.type == "replace" ? data : data.concat(base);
				}
			}
			return base;
		})].concat(extraExtensions);
	}
	isActiveAt(state, pos, side = -1) {
		return topNodeAt(state, pos, side).type.prop(languageDataProp) == this.data;
	}
	findRegions(state) {
		let lang = state.facet(language$1);
		if ((lang === null || lang === void 0 ? void 0 : lang.data) == this.data) return [{
			from: 0,
			to: state.doc.length
		}];
		if (!lang || !lang.allowsNesting) return [];
		let result = [];
		let explore = (tree, from) => {
			if (tree.prop(languageDataProp) == this.data) {
				result.push({
					from,
					to: from + tree.length
				});
				return;
			}
			let mount = tree.prop(NodeProp.mounted);
			if (mount) {
				if (mount.tree.prop(languageDataProp) == this.data) {
					if (mount.overlay) for (let r of mount.overlay) result.push({
						from: r.from + from,
						to: r.to + from
					});
					else result.push({
						from,
						to: from + tree.length
					});
					return;
				} else if (mount.overlay) {
					let size = result.length;
					explore(mount.tree, mount.overlay[0].from + from);
					if (result.length > size) return;
				}
			}
			for (let i = 0; i < tree.children.length; i++) {
				let ch = tree.children[i];
				if (ch instanceof Tree) explore(ch, tree.positions[i] + from);
			}
		};
		explore(syntaxTree(state), 0);
		return result;
	}
	get allowsNesting() {
		return true;
	}
};
Language.setState = StateEffect.define();
function topNodeAt(state, pos, side) {
	let topLang = state.facet(language$1), tree = syntaxTree(state).topNode;
	if (!topLang || topLang.allowsNesting) {
		for (let node = tree; node; node = node.enter(pos, side, IterMode.ExcludeBuffers | IterMode.EnterBracketed)) if (node.type.isTop) tree = node;
	}
	return tree;
}
var LRLanguage = class LRLanguage extends Language {
	constructor(data, parser, name) {
		super(data, parser, [], name);
		this.parser = parser;
	}
	static define(spec) {
		let data = defineLanguageFacet(spec.languageData);
		return new LRLanguage(data, spec.parser.configure({ props: [languageDataProp.add((type) => type.isTop ? data : void 0)] }), spec.name);
	}
	configure(options, name) {
		return new LRLanguage(this.data, this.parser.configure(options), name || this.name);
	}
	get allowsNesting() {
		return this.parser.hasWrappers();
	}
};
function syntaxTree(state) {
	let field = state.field(Language.state, false);
	return field ? field.tree : Tree.empty;
}
var DocInput = class {
	constructor(doc) {
		this.doc = doc;
		this.cursorPos = 0;
		this.string = "";
		this.cursor = doc.iter();
	}
	get length() {
		return this.doc.length;
	}
	syncTo(pos) {
		this.string = this.cursor.next(pos - this.cursorPos).value;
		this.cursorPos = pos + this.string.length;
		return this.cursorPos - this.string.length;
	}
	chunk(pos) {
		this.syncTo(pos);
		return this.string;
	}
	get lineChunks() {
		return true;
	}
	read(from, to) {
		let stringStart = this.cursorPos - this.string.length;
		if (from < stringStart || to >= this.cursorPos) return this.doc.sliceString(from, to);
		else return this.string.slice(from - stringStart, to - stringStart);
	}
};
var currentContext = null;
var ParseContext = class ParseContext {
	constructor(parser, state, fragments = [], tree, treeLen, viewport, skipped, scheduleOn) {
		this.parser = parser;
		this.state = state;
		this.fragments = fragments;
		this.tree = tree;
		this.treeLen = treeLen;
		this.viewport = viewport;
		this.skipped = skipped;
		this.scheduleOn = scheduleOn;
		this.parse = null;
		this.tempSkipped = [];
	}
	static create(parser, state, viewport) {
		return new ParseContext(parser, state, [], Tree.empty, 0, viewport, [], null);
	}
	startParse() {
		return this.parser.startParse(new DocInput(this.state.doc), this.fragments);
	}
	work(until, upto) {
		if (upto != null && upto >= this.state.doc.length) upto = void 0;
		if (this.tree != Tree.empty && this.isDone(upto !== null && upto !== void 0 ? upto : this.state.doc.length)) {
			this.takeTree();
			return true;
		}
		return this.withContext(() => {
			var _a;
			if (typeof until == "number") {
				let endTime = Date.now() + until;
				until = () => Date.now() > endTime;
			}
			if (!this.parse) this.parse = this.startParse();
			if (upto != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > upto) && upto < this.state.doc.length) this.parse.stopAt(upto);
			for (;;) {
				let done = this.parse.advance();
				if (done) {
					this.fragments = this.withoutTempSkipped(TreeFragment.addTree(done, this.fragments, this.parse.stoppedAt != null));
					this.treeLen = (_a = this.parse.stoppedAt) !== null && _a !== void 0 ? _a : this.state.doc.length;
					this.tree = done;
					this.parse = null;
					if (this.treeLen < (upto !== null && upto !== void 0 ? upto : this.state.doc.length)) this.parse = this.startParse();
					else return true;
				}
				if (until()) return false;
			}
		});
	}
	takeTree() {
		let pos, tree;
		if (this.parse && (pos = this.parse.parsedPos) >= this.treeLen) {
			if (this.parse.stoppedAt == null || this.parse.stoppedAt > pos) this.parse.stopAt(pos);
			this.withContext(() => {
				while (!(tree = this.parse.advance()));
			});
			this.treeLen = pos;
			this.tree = tree;
			this.fragments = this.withoutTempSkipped(TreeFragment.addTree(this.tree, this.fragments, true));
			this.parse = null;
		}
	}
	withContext(f) {
		let prev = currentContext;
		currentContext = this;
		try {
			return f();
		} finally {
			currentContext = prev;
		}
	}
	withoutTempSkipped(fragments) {
		for (let r; r = this.tempSkipped.pop();) fragments = cutFragments(fragments, r.from, r.to);
		return fragments;
	}
	changes(changes, newState) {
		let { fragments, tree, treeLen, viewport, skipped } = this;
		this.takeTree();
		if (!changes.empty) {
			let ranges = [];
			changes.iterChangedRanges((fromA, toA, fromB, toB) => ranges.push({
				fromA,
				toA,
				fromB,
				toB
			}));
			fragments = TreeFragment.applyChanges(fragments, ranges);
			tree = Tree.empty;
			treeLen = 0;
			viewport = {
				from: changes.mapPos(viewport.from, -1),
				to: changes.mapPos(viewport.to, 1)
			};
			if (this.skipped.length) {
				skipped = [];
				for (let r of this.skipped) {
					let from = changes.mapPos(r.from, 1), to = changes.mapPos(r.to, -1);
					if (from < to) skipped.push({
						from,
						to
					});
				}
			}
		}
		return new ParseContext(this.parser, newState, fragments, tree, treeLen, viewport, skipped, this.scheduleOn);
	}
	updateViewport(viewport) {
		if (this.viewport.from == viewport.from && this.viewport.to == viewport.to) return false;
		this.viewport = viewport;
		let startLen = this.skipped.length;
		for (let i = 0; i < this.skipped.length; i++) {
			let { from, to } = this.skipped[i];
			if (from < viewport.to && to > viewport.from) {
				this.fragments = cutFragments(this.fragments, from, to);
				this.skipped.splice(i--, 1);
			}
		}
		if (this.skipped.length >= startLen) return false;
		this.reset();
		return true;
	}
	reset() {
		if (this.parse) {
			this.takeTree();
			this.parse = null;
		}
	}
	skipUntilInView(from, to) {
		this.skipped.push({
			from,
			to
		});
	}
	static getSkippingParser(until) {
		return new class extends Parser {
			createParse(input, fragments, ranges) {
				let from = ranges[0].from, to = ranges[ranges.length - 1].to;
				return {
					parsedPos: from,
					advance() {
						let cx = currentContext;
						if (cx) {
							for (let r of ranges) cx.tempSkipped.push(r);
							if (until) cx.scheduleOn = cx.scheduleOn ? Promise.all([cx.scheduleOn, until]) : until;
						}
						this.parsedPos = to;
						return new Tree(NodeType.none, [], [], to - from);
					},
					stoppedAt: null,
					stopAt() {}
				};
			}
		}();
	}
	isDone(upto) {
		upto = Math.min(upto, this.state.doc.length);
		let frags = this.fragments;
		return this.treeLen >= upto && frags.length && frags[0].from == 0 && frags[0].to >= upto;
	}
	static get() {
		return currentContext;
	}
};
function cutFragments(fragments, from, to) {
	return TreeFragment.applyChanges(fragments, [{
		fromA: from,
		toA: to,
		fromB: from,
		toB: to
	}]);
}
var LanguageState = class LanguageState {
	constructor(context) {
		this.context = context;
		this.tree = context.tree;
	}
	apply(tr) {
		if (!tr.docChanged && this.tree == this.context.tree) return this;
		let newCx = this.context.changes(tr.changes, tr.state);
		let upto = this.context.treeLen == tr.startState.doc.length ? void 0 : Math.max(tr.changes.mapPos(this.context.treeLen), newCx.viewport.to);
		if (!newCx.work(20, upto)) newCx.takeTree();
		return new LanguageState(newCx);
	}
	static init(state) {
		let vpTo = Math.min(3e3, state.doc.length);
		let parseState = ParseContext.create(state.facet(language$1).parser, state, {
			from: 0,
			to: vpTo
		});
		if (!parseState.work(20, vpTo)) parseState.takeTree();
		return new LanguageState(parseState);
	}
};
Language.state = StateField.define({
	create: LanguageState.init,
	update(value, tr) {
		for (let e of tr.effects) if (e.is(Language.setState)) return e.value;
		if (tr.startState.facet(language$1) != tr.state.facet(language$1)) return LanguageState.init(tr.state);
		return value.apply(tr);
	}
});
var requestIdle = (callback) => {
	let timeout = setTimeout(() => callback(), 500);
	return () => clearTimeout(timeout);
};
if (typeof requestIdleCallback != "undefined") requestIdle = (callback) => {
	let idle = -1, timeout = setTimeout(() => {
		idle = requestIdleCallback(callback, { timeout: 400 });
	}, 100);
	return () => idle < 0 ? clearTimeout(timeout) : cancelIdleCallback(idle);
};
var isInputPending = typeof navigator != "undefined" && ((_a = navigator.scheduling) === null || _a === void 0 ? void 0 : _a.isInputPending) ? () => navigator.scheduling.isInputPending() : null;
var parseWorker = ViewPlugin.fromClass(class ParseWorker {
	constructor(view) {
		this.view = view;
		this.working = null;
		this.workScheduled = 0;
		this.chunkEnd = -1;
		this.chunkBudget = -1;
		this.work = this.work.bind(this);
		this.scheduleWork();
	}
	update(update) {
		let cx = this.view.state.field(Language.state).context;
		if (cx.updateViewport(update.view.viewport) || this.view.viewport.to > cx.treeLen) this.scheduleWork();
		if (update.docChanged || update.selectionSet) {
			if (this.view.hasFocus) this.chunkBudget += 50;
			this.scheduleWork();
		}
		this.checkAsyncSchedule(cx);
	}
	scheduleWork() {
		if (this.working) return;
		let { state } = this.view, field = state.field(Language.state);
		if (field.tree != field.context.tree || !field.context.isDone(state.doc.length)) this.working = requestIdle(this.work);
	}
	work(deadline) {
		this.working = null;
		let now = Date.now();
		if (this.chunkEnd < now && (this.chunkEnd < 0 || this.view.hasFocus)) {
			this.chunkEnd = now + 3e4;
			this.chunkBudget = 3e3;
		}
		if (this.chunkBudget <= 0) return;
		let { state, viewport: { to: vpTo } } = this.view, field = state.field(Language.state);
		if (field.tree == field.context.tree && field.context.isDone(vpTo + 1e5)) return;
		let endTime = Date.now() + Math.min(this.chunkBudget, 100, deadline && !isInputPending ? Math.max(25, deadline.timeRemaining() - 5) : 1e9);
		let viewportFirst = field.context.treeLen < vpTo && state.doc.length > vpTo + 1e3;
		let done = field.context.work(() => {
			return isInputPending && isInputPending() || Date.now() > endTime;
		}, vpTo + (viewportFirst ? 0 : 1e5));
		this.chunkBudget -= Date.now() - now;
		if (done || this.chunkBudget <= 0) {
			field.context.takeTree();
			this.view.dispatch({ effects: Language.setState.of(new LanguageState(field.context)) });
		}
		if (this.chunkBudget > 0 && !(done && !viewportFirst)) this.scheduleWork();
		this.checkAsyncSchedule(field.context);
	}
	checkAsyncSchedule(cx) {
		if (cx.scheduleOn) {
			this.workScheduled++;
			cx.scheduleOn.then(() => this.scheduleWork()).catch((err) => logException(this.view.state, err)).then(() => this.workScheduled--);
			cx.scheduleOn = null;
		}
	}
	destroy() {
		if (this.working) this.working();
	}
	isWorking() {
		return !!(this.working || this.workScheduled > 0);
	}
}, { eventHandlers: { focus() {
	this.scheduleWork();
} } });
var language$1 = Facet.define({
	combine(languages) {
		return languages.length ? languages[0] : null;
	},
	enables: (language) => [
		Language.state,
		parseWorker,
		EditorView.contentAttributes.compute([language], (state) => {
			let lang = state.facet(language);
			return lang && lang.name ? { "data-language": lang.name } : {};
		})
	]
});
var LanguageSupport = class {
	constructor(language, support = []) {
		this.language = language;
		this.support = support;
		this.extension = [language, support];
	}
};
var indentService = Facet.define();
var indentUnit = Facet.define({ combine: (values) => {
	if (!values.length) return "  ";
	let unit = values[0];
	if (!unit || /\S/.test(unit) || Array.from(unit).some((e) => e != unit[0])) throw new Error("Invalid indent unit: " + JSON.stringify(values[0]));
	return unit;
} });
function getIndentUnit(state) {
	let unit = state.facet(indentUnit);
	return unit.charCodeAt(0) == 9 ? state.tabSize * unit.length : unit.length;
}
function indentString(state, cols) {
	let result = "", ts = state.tabSize, ch = state.facet(indentUnit)[0];
	if (ch == "	") {
		while (cols >= ts) {
			result += "	";
			cols -= ts;
		}
		ch = " ";
	}
	for (let i = 0; i < cols; i++) result += ch;
	return result;
}
function getIndentation(context, pos) {
	if (context instanceof EditorState) context = new IndentContext(context);
	for (let service of context.state.facet(indentService)) {
		let result = service(context, pos);
		if (result !== void 0) return result;
	}
	let tree = syntaxTree(context.state);
	return tree.length >= pos ? syntaxIndentation(context, tree, pos) : null;
}
var IndentContext = class {
	constructor(state, options = {}) {
		this.state = state;
		this.options = options;
		this.unit = getIndentUnit(state);
	}
	lineAt(pos, bias = 1) {
		let line = this.state.doc.lineAt(pos);
		let { simulateBreak, simulateDoubleBreak } = this.options;
		if (simulateBreak != null && simulateBreak >= line.from && simulateBreak <= line.to) {
			if (simulateDoubleBreak && simulateBreak == pos) return {
				text: "",
				from: pos
			};
			else if (bias < 0 ? simulateBreak < pos : simulateBreak <= pos) return {
				text: line.text.slice(simulateBreak - line.from),
				from: simulateBreak
			};
			else return {
				text: line.text.slice(0, simulateBreak - line.from),
				from: line.from
			};
		}
		return line;
	}
	textAfterPos(pos, bias = 1) {
		if (this.options.simulateDoubleBreak && pos == this.options.simulateBreak) return "";
		let { text, from } = this.lineAt(pos, bias);
		return text.slice(pos - from, Math.min(text.length, pos + 100 - from));
	}
	column(pos, bias = 1) {
		let { text, from } = this.lineAt(pos, bias);
		let result = this.countColumn(text, pos - from);
		let override = this.options.overrideIndentation ? this.options.overrideIndentation(from) : -1;
		if (override > -1) result += override - this.countColumn(text, text.search(/\S|$/));
		return result;
	}
	countColumn(line, pos = line.length) {
		return countColumn(line, this.state.tabSize, pos);
	}
	lineIndent(pos, bias = 1) {
		let { text, from } = this.lineAt(pos, bias);
		let override = this.options.overrideIndentation;
		if (override) {
			let overriden = override(from);
			if (overriden > -1) return overriden;
		}
		return this.countColumn(text, text.search(/\S|$/));
	}
	get simulatedBreak() {
		return this.options.simulateBreak || null;
	}
};
var indentNodeProp = new NodeProp();
function syntaxIndentation(cx, ast, pos) {
	let stack = ast.resolveStack(pos);
	let inner = ast.resolveInner(pos, -1).resolve(pos, 0).enterUnfinishedNodesBefore(pos);
	if (inner != stack.node) {
		let add = [];
		for (let cur = inner; cur && !(cur.from < stack.node.from || cur.to > stack.node.to || cur.from == stack.node.from && cur.type == stack.node.type); cur = cur.parent) add.push(cur);
		for (let i = add.length - 1; i >= 0; i--) stack = {
			node: add[i],
			next: stack
		};
	}
	return indentFor(stack, cx, pos);
}
function indentFor(stack, cx, pos) {
	for (let cur = stack; cur; cur = cur.next) {
		let strategy = indentStrategy(cur.node);
		if (strategy) return strategy(TreeIndentContext.create(cx, pos, cur));
	}
	return 0;
}
function ignoreClosed(cx) {
	return cx.pos == cx.options.simulateBreak && cx.options.simulateDoubleBreak;
}
function indentStrategy(tree) {
	let strategy = tree.type.prop(indentNodeProp);
	if (strategy) return strategy;
	let first = tree.firstChild, close;
	if (first && (close = first.type.prop(NodeProp.closedBy))) {
		let last = tree.lastChild, closed = last && close.indexOf(last.name) > -1;
		return (cx) => delimitedStrategy(cx, true, 1, void 0, closed && !ignoreClosed(cx) ? last.from : void 0);
	}
	return tree.parent == null ? topIndent : null;
}
function topIndent() {
	return 0;
}
var TreeIndentContext = class TreeIndentContext extends IndentContext {
	constructor(base, pos, context) {
		super(base.state, base.options);
		this.base = base;
		this.pos = pos;
		this.context = context;
	}
	get node() {
		return this.context.node;
	}
	static create(base, pos, context) {
		return new TreeIndentContext(base, pos, context);
	}
	get textAfter() {
		return this.textAfterPos(this.pos);
	}
	get baseIndent() {
		return this.baseIndentFor(this.node);
	}
	baseIndentFor(node) {
		let line = this.state.doc.lineAt(node.from);
		for (;;) {
			let atBreak = node.resolve(line.from);
			while (atBreak.parent && atBreak.parent.from == atBreak.from) atBreak = atBreak.parent;
			if (isParent(atBreak, node)) break;
			line = this.state.doc.lineAt(atBreak.from);
		}
		return this.lineIndent(line.from);
	}
	continue() {
		return indentFor(this.context.next, this.base, this.pos);
	}
};
function isParent(parent, of) {
	for (let cur = of; cur; cur = cur.parent) if (parent == cur) return true;
	return false;
}
function bracketedAligned(context) {
	let tree = context.node;
	let openToken = tree.childAfter(tree.from), last = tree.lastChild;
	if (!openToken) return null;
	let sim = context.options.simulateBreak;
	let openLine = context.state.doc.lineAt(openToken.from);
	let lineEnd = sim == null || sim <= openLine.from ? openLine.to : Math.min(openLine.to, sim);
	for (let pos = openToken.to;;) {
		let next = tree.childAfter(pos);
		if (!next || next == last) return null;
		if (!next.type.isSkipped) {
			if (next.from >= lineEnd) return null;
			let space = /^ */.exec(openLine.text.slice(openToken.to - openLine.from))[0].length;
			return {
				from: openToken.from,
				to: openToken.to + space
			};
		}
		pos = next.to;
	}
}
function delimitedIndent({ closing, align = true, units = 1 }) {
	return (context) => delimitedStrategy(context, align, units, closing);
}
function delimitedStrategy(context, align, units, closing, closedAt) {
	let after = context.textAfter, space = after.match(/^\s*/)[0].length;
	let closed = closing && after.slice(space, space + closing.length) == closing || closedAt == context.pos + space;
	let aligned = align ? bracketedAligned(context) : null;
	if (aligned) return closed ? context.column(aligned.from) : context.column(aligned.to);
	return context.baseIndent + (closed ? 0 : context.unit * units);
}
function continuedIndent({ except, units = 1 } = {}) {
	return (context) => {
		let matchExcept = except && except.test(context.textAfter);
		return context.baseIndent + (matchExcept ? 0 : units * context.unit);
	};
}
var DontIndentBeyond = 200;
function indentOnInput() {
	return EditorState.transactionFilter.of((tr) => {
		if (!tr.docChanged || !tr.isUserEvent("input.type") && !tr.isUserEvent("input.complete")) return tr;
		let rules = tr.startState.languageDataAt("indentOnInput", tr.startState.selection.main.head);
		if (!rules.length) return tr;
		let doc = tr.newDoc, { head } = tr.newSelection.main, line = doc.lineAt(head);
		if (head > line.from + DontIndentBeyond) return tr;
		let lineStart = doc.sliceString(line.from, head);
		if (!rules.some((r) => r.test(lineStart))) return tr;
		let { state } = tr, last = -1, changes = [];
		for (let { head } of state.selection.ranges) {
			let line = state.doc.lineAt(head);
			if (line.from == last) continue;
			last = line.from;
			let indent = getIndentation(state, line.from);
			if (indent == null) continue;
			let cur = /^\s*/.exec(line.text)[0];
			let norm = indentString(state, indent);
			if (cur != norm) changes.push({
				from: line.from,
				to: line.from + cur.length,
				insert: norm
			});
		}
		return changes.length ? [tr, {
			changes,
			sequential: true
		}] : tr;
	});
}
var foldService = Facet.define();
var foldNodeProp = new NodeProp();
function foldInside(node) {
	let first = node.firstChild, last = node.lastChild;
	return first && first.to < last.from ? {
		from: first.to,
		to: last.type.isError ? node.to : last.from
	} : null;
}
function syntaxFolding(state, start, end) {
	let tree = syntaxTree(state);
	if (tree.length < end) return null;
	let stack = tree.resolveStack(end, 1);
	let found = null;
	for (let iter = stack; iter; iter = iter.next) {
		let cur = iter.node;
		if (cur.to <= end || cur.from > end) continue;
		if (found && cur.from < start) break;
		let prop = cur.type.prop(foldNodeProp);
		if (prop && (cur.to < tree.length - 50 || tree.length == state.doc.length || !isUnfinished(cur))) {
			let value = prop(cur, state);
			if (value && value.from <= end && value.from >= start && value.to > end) found = value;
		}
	}
	return found;
}
function isUnfinished(node) {
	let ch = node.lastChild;
	return ch && ch.to == node.to && ch.type.isError;
}
function foldable(state, lineStart, lineEnd) {
	for (let service of state.facet(foldService)) {
		let result = service(state, lineStart, lineEnd);
		if (result) return result;
	}
	return syntaxFolding(state, lineStart, lineEnd);
}
function mapRange(range, mapping) {
	let from = mapping.mapPos(range.from, 1), to = mapping.mapPos(range.to, -1);
	return from >= to ? void 0 : {
		from,
		to
	};
}
var foldEffect = StateEffect.define({ map: mapRange });
var unfoldEffect = StateEffect.define({ map: mapRange });
function selectedLines(view) {
	let lines = [];
	for (let { head } of view.state.selection.ranges) {
		if (lines.some((l) => l.from <= head && l.to >= head)) continue;
		lines.push(view.lineBlockAt(head));
	}
	return lines;
}
var foldState = StateField.define({
	create() {
		return Decoration.none;
	},
	update(folded, tr) {
		if (tr.isUserEvent("delete")) tr.changes.iterChangedRanges((fromA, toA) => folded = clearTouchedFolds(folded, fromA, toA));
		folded = folded.map(tr.changes);
		let rangesToFold = [];
		for (let e of tr.effects) if (e.is(foldEffect) && !foldExists(folded, e.value.from, e.value.to)) rangesToFold.push(e.value);
		else if (e.is(unfoldEffect)) folded = folded.update({
			filter: (from, to) => e.value.from != from || e.value.to != to,
			filterFrom: e.value.from,
			filterTo: e.value.to
		});
		if (rangesToFold.length) {
			let { preparePlaceholder } = tr.state.facet(foldConfig);
			let decorations = rangesToFold.map((value) => {
				return (!preparePlaceholder ? foldWidget : Decoration.replace({ widget: new PreparedFoldWidget(preparePlaceholder(tr.state, value)) })).range(value.from, value.to);
			});
			folded = folded.update({ add: decorations });
		}
		if (tr.selection) folded = clearTouchedFolds(folded, tr.selection.main.head);
		return folded;
	},
	provide: (f) => EditorView.decorations.from(f),
	toJSON(folded, state) {
		let ranges = [];
		folded.between(0, state.doc.length, (from, to) => {
			ranges.push(from, to);
		});
		return ranges;
	},
	fromJSON(value) {
		if (!Array.isArray(value) || value.length % 2) throw new RangeError("Invalid JSON for fold state");
		let ranges = [];
		for (let i = 0; i < value.length;) {
			let from = value[i++], to = value[i++];
			if (typeof from != "number" || typeof to != "number") throw new RangeError("Invalid JSON for fold state");
			ranges.push(foldWidget.range(from, to));
		}
		return Decoration.set(ranges, true);
	}
});
function clearTouchedFolds(folded, from, to = from) {
	let touched = false;
	folded.between(from, to, (a, b) => {
		if (a < to && b > from) touched = true;
	});
	return !touched ? folded : folded.update({
		filterFrom: from,
		filterTo: to,
		filter: (a, b) => a >= to || b <= from
	});
}
function findFold(state, from, to) {
	var _a;
	let found = null;
	(_a = state.field(foldState, false)) === null || _a === void 0 || _a.between(from, to, (from, to) => {
		if (!found || found.from > from) found = {
			from,
			to
		};
	});
	return found;
}
function foldExists(folded, from, to) {
	let found = false;
	folded.between(from, from, (a, b) => {
		if (a == from && b == to) found = true;
	});
	return found;
}
function maybeEnable(state, other) {
	return state.field(foldState, false) ? other : other.concat(StateEffect.appendConfig.of(codeFolding()));
}
var foldCode = (view) => {
	for (let line of selectedLines(view)) {
		let range = foldable(view.state, line.from, line.to);
		if (range) {
			view.dispatch({ effects: maybeEnable(view.state, [foldEffect.of(range), announceFold(view, range)]) });
			return true;
		}
	}
	return false;
};
var unfoldCode = (view) => {
	if (!view.state.field(foldState, false)) return false;
	let effects = [];
	for (let line of selectedLines(view)) {
		let folded = findFold(view.state, line.from, line.to);
		if (folded) effects.push(unfoldEffect.of(folded), announceFold(view, folded, false));
	}
	if (effects.length) view.dispatch({ effects });
	return effects.length > 0;
};
function announceFold(view, range, fold = true) {
	let lineFrom = view.state.doc.lineAt(range.from).number, lineTo = view.state.doc.lineAt(range.to).number;
	return EditorView.announce.of(`${view.state.phrase(fold ? "Folded lines" : "Unfolded lines")} ${lineFrom} ${view.state.phrase("to")} ${lineTo}.`);
}
var foldAll = (view) => {
	let { state } = view, effects = [];
	for (let pos = 0; pos < state.doc.length;) {
		let line = view.lineBlockAt(pos), range = foldable(state, line.from, line.to);
		if (range) effects.push(foldEffect.of(range));
		pos = (range ? view.lineBlockAt(range.to) : line).to + 1;
	}
	if (effects.length) view.dispatch({ effects: maybeEnable(view.state, effects) });
	return !!effects.length;
};
var unfoldAll = (view) => {
	let field = view.state.field(foldState, false);
	if (!field || !field.size) return false;
	let effects = [];
	field.between(0, view.state.doc.length, (from, to) => {
		effects.push(unfoldEffect.of({
			from,
			to
		}));
	});
	view.dispatch({ effects });
	return true;
};
var foldKeymap = [
	{
		key: "Ctrl-Shift-[",
		mac: "Cmd-Alt-[",
		run: foldCode
	},
	{
		key: "Ctrl-Shift-]",
		mac: "Cmd-Alt-]",
		run: unfoldCode
	},
	{
		key: "Ctrl-Alt-[",
		run: foldAll
	},
	{
		key: "Ctrl-Alt-]",
		run: unfoldAll
	}
];
var defaultConfig = {
	placeholderDOM: null,
	preparePlaceholder: null,
	placeholderText: "…"
};
var foldConfig = Facet.define({ combine(values) {
	return combineConfig(values, defaultConfig);
} });
function codeFolding(config) {
	let result = [foldState, baseTheme$1$1];
	if (config) result.push(foldConfig.of(config));
	return result;
}
function widgetToDOM(view, prepared) {
	let { state } = view, conf = state.facet(foldConfig);
	let onclick = (event) => {
		let line = view.lineBlockAt(view.posAtDOM(event.target));
		let folded = findFold(view.state, line.from, line.to);
		if (folded) view.dispatch({ effects: unfoldEffect.of(folded) });
		event.preventDefault();
	};
	if (conf.placeholderDOM) return conf.placeholderDOM(view, onclick, prepared);
	let element = document.createElement("span");
	element.textContent = conf.placeholderText;
	element.setAttribute("aria-label", state.phrase("folded code"));
	element.title = state.phrase("unfold");
	element.className = "cm-foldPlaceholder";
	element.onclick = onclick;
	return element;
}
var foldWidget = Decoration.replace({ widget: new class extends WidgetType {
	toDOM(view) {
		return widgetToDOM(view, null);
	}
}() });
var PreparedFoldWidget = class extends WidgetType {
	constructor(value) {
		super();
		this.value = value;
	}
	eq(other) {
		return this.value == other.value;
	}
	toDOM(view) {
		return widgetToDOM(view, this.value);
	}
};
var foldGutterDefaults = {
	openText: "⌄",
	closedText: "›",
	markerDOM: null,
	domEventHandlers: {},
	foldingChanged: () => false
};
var FoldMarker = class extends GutterMarker {
	constructor(config, open) {
		super();
		this.config = config;
		this.open = open;
	}
	eq(other) {
		return this.config == other.config && this.open == other.open;
	}
	toDOM(view) {
		if (this.config.markerDOM) return this.config.markerDOM(this.open);
		let span = document.createElement("span");
		span.textContent = this.open ? this.config.openText : this.config.closedText;
		span.title = view.state.phrase(this.open ? "Fold line" : "Unfold line");
		return span;
	}
};
function foldGutter(config = {}) {
	let fullConfig = {
		...foldGutterDefaults,
		...config
	};
	let canFold = new FoldMarker(fullConfig, true), canUnfold = new FoldMarker(fullConfig, false);
	let markers = ViewPlugin.fromClass(class {
		constructor(view) {
			this.from = view.viewport.from;
			this.markers = this.buildMarkers(view);
		}
		update(update) {
			if (update.docChanged || update.viewportChanged || update.startState.facet(language$1) != update.state.facet(language$1) || update.startState.field(foldState, false) != update.state.field(foldState, false) || syntaxTree(update.startState) != syntaxTree(update.state) || fullConfig.foldingChanged(update)) this.markers = this.buildMarkers(update.view);
		}
		buildMarkers(view) {
			let builder = new RangeSetBuilder();
			for (let line of view.viewportLineBlocks) {
				let mark = findFold(view.state, line.from, line.to) ? canUnfold : foldable(view.state, line.from, line.to) ? canFold : null;
				if (mark) builder.add(line.from, line.from, mark);
			}
			return builder.finish();
		}
	});
	let { domEventHandlers } = fullConfig;
	return [
		markers,
		gutter({
			class: "cm-foldGutter",
			markers(view) {
				var _a;
				return ((_a = view.plugin(markers)) === null || _a === void 0 ? void 0 : _a.markers) || RangeSet.empty;
			},
			initialSpacer() {
				return new FoldMarker(fullConfig, false);
			},
			domEventHandlers: {
				...domEventHandlers,
				click: (view, line, event) => {
					if (domEventHandlers.click && domEventHandlers.click(view, line, event)) return true;
					let folded = findFold(view.state, line.from, line.to);
					if (folded) {
						view.dispatch({ effects: unfoldEffect.of(folded) });
						return true;
					}
					let range = foldable(view.state, line.from, line.to);
					if (range) {
						view.dispatch({ effects: foldEffect.of(range) });
						return true;
					}
					return false;
				}
			}
		}),
		codeFolding()
	];
}
var baseTheme$1$1 = EditorView.baseTheme({
	".cm-foldPlaceholder": {
		backgroundColor: "#eee",
		border: "1px solid #ddd",
		color: "#888",
		borderRadius: ".2em",
		margin: "0 1px",
		padding: "0 1px",
		cursor: "pointer"
	},
	".cm-foldGutter span": {
		padding: "0 1px",
		cursor: "pointer"
	}
});
var HighlightStyle = class HighlightStyle {
	constructor(specs, options) {
		this.specs = specs;
		let modSpec;
		function def(spec) {
			let cls = StyleModule.newName();
			(modSpec || (modSpec = Object.create(null)))["." + cls] = spec;
			return cls;
		}
		const all = typeof options.all == "string" ? options.all : options.all ? def(options.all) : void 0;
		const scopeOpt = options.scope;
		this.scope = scopeOpt instanceof Language ? (type) => type.prop(languageDataProp) == scopeOpt.data : scopeOpt ? (type) => type == scopeOpt : void 0;
		this.style = tagHighlighter(specs.map((style) => ({
			tag: style.tag,
			class: style.class || def(Object.assign({}, style, { tag: null }))
		})), { all }).style;
		this.module = modSpec ? new StyleModule(modSpec) : null;
		this.themeType = options.themeType;
	}
	static define(specs, options) {
		return new HighlightStyle(specs, options || {});
	}
};
var highlighterFacet = Facet.define();
var fallbackHighlighter = Facet.define({ combine(values) {
	return values.length ? [values[0]] : null;
} });
function getHighlighters(state) {
	let main = state.facet(highlighterFacet);
	return main.length ? main : state.facet(fallbackHighlighter);
}
function syntaxHighlighting(highlighter, options) {
	let ext = [treeHighlighter], themeType;
	if (highlighter instanceof HighlightStyle) {
		if (highlighter.module) ext.push(EditorView.styleModule.of(highlighter.module));
		themeType = highlighter.themeType;
	}
	if (options === null || options === void 0 ? void 0 : options.fallback) ext.push(fallbackHighlighter.of(highlighter));
	else if (themeType) ext.push(highlighterFacet.computeN([EditorView.darkTheme], (state) => {
		return state.facet(EditorView.darkTheme) == (themeType == "dark") ? [highlighter] : [];
	}));
	else ext.push(highlighterFacet.of(highlighter));
	return ext;
}
var TreeHighlighter = class {
	constructor(view) {
		this.markCache = Object.create(null);
		this.tree = syntaxTree(view.state);
		this.decorations = this.buildDeco(view, getHighlighters(view.state));
		this.decoratedTo = view.viewport.to;
	}
	update(update) {
		let tree = syntaxTree(update.state), highlighters = getHighlighters(update.state);
		let styleChange = highlighters != getHighlighters(update.startState);
		let { viewport } = update.view, decoratedToMapped = update.changes.mapPos(this.decoratedTo, 1);
		if (tree.length < viewport.to && !styleChange && tree.type == this.tree.type && decoratedToMapped >= viewport.to) {
			this.decorations = this.decorations.map(update.changes);
			this.decoratedTo = decoratedToMapped;
		} else if (tree != this.tree || update.viewportChanged || styleChange) {
			this.tree = tree;
			this.decorations = this.buildDeco(update.view, highlighters);
			this.decoratedTo = viewport.to;
		}
	}
	buildDeco(view, highlighters) {
		if (!highlighters || !this.tree.length) return Decoration.none;
		let builder = new RangeSetBuilder();
		for (let { from, to } of view.visibleRanges) highlightTree(this.tree, highlighters, (from, to, style) => {
			builder.add(from, to, this.markCache[style] || (this.markCache[style] = Decoration.mark({ class: style })));
		}, from, to);
		return builder.finish();
	}
};
var treeHighlighter = Prec.high(ViewPlugin.fromClass(TreeHighlighter, { decorations: (v) => v.decorations }));
var defaultHighlightStyle = HighlightStyle.define([
	{
		tag: tags.meta,
		color: "#404740"
	},
	{
		tag: tags.link,
		textDecoration: "underline"
	},
	{
		tag: tags.heading,
		textDecoration: "underline",
		fontWeight: "bold"
	},
	{
		tag: tags.emphasis,
		fontStyle: "italic"
	},
	{
		tag: tags.strong,
		fontWeight: "bold"
	},
	{
		tag: tags.strikethrough,
		textDecoration: "line-through"
	},
	{
		tag: tags.keyword,
		color: "#708"
	},
	{
		tag: [
			tags.atom,
			tags.bool,
			tags.url,
			tags.contentSeparator,
			tags.labelName
		],
		color: "#219"
	},
	{
		tag: [tags.literal, tags.inserted],
		color: "#164"
	},
	{
		tag: [tags.string, tags.deleted],
		color: "#a11"
	},
	{
		tag: [
			tags.regexp,
			tags.escape,
			tags.special(tags.string)
		],
		color: "#e40"
	},
	{
		tag: tags.definition(tags.variableName),
		color: "#00f"
	},
	{
		tag: tags.local(tags.variableName),
		color: "#30a"
	},
	{
		tag: [tags.typeName, tags.namespace],
		color: "#085"
	},
	{
		tag: tags.className,
		color: "#167"
	},
	{
		tag: [tags.special(tags.variableName), tags.macroName],
		color: "#256"
	},
	{
		tag: tags.definition(tags.propertyName),
		color: "#00c"
	},
	{
		tag: tags.comment,
		color: "#940"
	},
	{
		tag: tags.invalid,
		color: "#f00"
	}
]);
var baseTheme$2 = EditorView.baseTheme({
	"&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
	"&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
});
var DefaultScanDist = 1e4;
var DefaultBrackets = "()[]{}";
var bracketMatchingConfig = Facet.define({ combine(configs) {
	return combineConfig(configs, {
		afterCursor: true,
		brackets: DefaultBrackets,
		maxScanDistance: DefaultScanDist,
		renderMatch: defaultRenderMatch
	});
} });
var matchingMark = Decoration.mark({ class: "cm-matchingBracket" });
var nonmatchingMark = Decoration.mark({ class: "cm-nonmatchingBracket" });
function defaultRenderMatch(match) {
	let decorations = [];
	let mark = match.matched ? matchingMark : nonmatchingMark;
	decorations.push(mark.range(match.start.from, match.start.to));
	if (match.end) decorations.push(mark.range(match.end.from, match.end.to));
	return decorations;
}
function bracketDeco(state) {
	let decorations = [];
	let config = state.facet(bracketMatchingConfig);
	for (let range of state.selection.ranges) {
		if (!range.empty) continue;
		let match = matchBrackets(state, range.head, -1, config) || range.head > 0 && matchBrackets(state, range.head - 1, 1, config) || config.afterCursor && (matchBrackets(state, range.head, 1, config) || range.head < state.doc.length && matchBrackets(state, range.head + 1, -1, config));
		if (match) decorations = decorations.concat(config.renderMatch(match, state));
	}
	return Decoration.set(decorations, true);
}
var bracketMatchingUnique = [ViewPlugin.fromClass(class {
	constructor(view) {
		this.paused = false;
		this.decorations = bracketDeco(view.state);
	}
	update(update) {
		if (update.docChanged || update.selectionSet || this.paused) {
			if (update.view.composing) {
				this.decorations = this.decorations.map(update.changes);
				this.paused = true;
			} else {
				this.decorations = bracketDeco(update.state);
				this.paused = false;
			}
		}
	}
}, { decorations: (v) => v.decorations }), baseTheme$2];
function bracketMatching(config = {}) {
	return [bracketMatchingConfig.of(config), bracketMatchingUnique];
}
var bracketMatchingHandle = new NodeProp();
function matchingNodes(node, dir, brackets) {
	let byProp = node.prop(dir < 0 ? NodeProp.openedBy : NodeProp.closedBy);
	if (byProp) return byProp;
	if (node.name.length == 1) {
		let index = brackets.indexOf(node.name);
		if (index > -1 && index % 2 == (dir < 0 ? 1 : 0)) return [brackets[index + dir]];
	}
	return null;
}
function findHandle(node) {
	let hasHandle = node.type.prop(bracketMatchingHandle);
	return hasHandle ? hasHandle(node.node) : node;
}
function matchBrackets(state, pos, dir, config = {}) {
	let maxScanDistance = config.maxScanDistance || DefaultScanDist, brackets = config.brackets || DefaultBrackets;
	let tree = syntaxTree(state), node = tree.resolveInner(pos, dir);
	for (let cur = node; cur; cur = cur.parent) {
		let matches = matchingNodes(cur.type, dir, brackets);
		if (matches && cur.from < cur.to) {
			let handle = findHandle(cur);
			if (handle && (dir > 0 ? pos >= handle.from && pos < handle.to : pos > handle.from && pos <= handle.to)) return matchMarkedBrackets(state, pos, dir, cur, handle, matches, brackets);
		}
	}
	return matchPlainBrackets(state, pos, dir, tree, node.type, maxScanDistance, brackets);
}
function matchMarkedBrackets(_state, _pos, dir, token, handle, matching, brackets) {
	let parent = token.parent, firstToken = {
		from: handle.from,
		to: handle.to
	};
	let depth = 0, cursor = parent === null || parent === void 0 ? void 0 : parent.cursor();
	if (cursor && (dir < 0 ? cursor.childBefore(token.from) : cursor.childAfter(token.to))) do
		if (dir < 0 ? cursor.to <= token.from : cursor.from >= token.to) {
			if (depth == 0 && matching.indexOf(cursor.type.name) > -1 && cursor.from < cursor.to) {
				let endHandle = findHandle(cursor);
				return {
					start: firstToken,
					end: endHandle ? {
						from: endHandle.from,
						to: endHandle.to
					} : void 0,
					matched: true
				};
			} else if (matchingNodes(cursor.type, dir, brackets)) depth++;
			else if (matchingNodes(cursor.type, -dir, brackets)) {
				if (depth == 0) {
					let endHandle = findHandle(cursor);
					return {
						start: firstToken,
						end: endHandle && endHandle.from < endHandle.to ? {
							from: endHandle.from,
							to: endHandle.to
						} : void 0,
						matched: false
					};
				}
				depth--;
			}
		}
	while (dir < 0 ? cursor.prevSibling() : cursor.nextSibling());
	return {
		start: firstToken,
		matched: false
	};
}
function matchPlainBrackets(state, pos, dir, tree, tokenType, maxScanDistance, brackets) {
	if (dir < 0 ? !pos : pos == state.doc.length) return null;
	let startCh = dir < 0 ? state.sliceDoc(pos - 1, pos) : state.sliceDoc(pos, pos + 1);
	let bracket = brackets.indexOf(startCh);
	if (bracket < 0 || bracket % 2 == 0 != dir > 0) return null;
	let startToken = {
		from: dir < 0 ? pos - 1 : pos,
		to: dir > 0 ? pos + 1 : pos
	};
	let iter = state.doc.iterRange(pos, dir > 0 ? state.doc.length : 0), depth = 0;
	for (let distance = 0; !iter.next().done && distance <= maxScanDistance;) {
		let text = iter.value;
		if (dir < 0) distance += text.length;
		let basePos = pos + distance * dir;
		for (let pos = dir > 0 ? 0 : text.length - 1, end = dir > 0 ? text.length : -1; pos != end; pos += dir) {
			let found = brackets.indexOf(text[pos]);
			if (found < 0 || tree.resolveInner(basePos + pos, 1).type != tokenType) continue;
			if (found % 2 == 0 == dir > 0) depth++;
			else if (depth == 1) return {
				start: startToken,
				end: {
					from: basePos + pos,
					to: basePos + pos + 1
				},
				matched: found >> 1 == bracket >> 1
			};
			else depth--;
		}
		if (dir > 0) distance += text.length;
	}
	return iter.done ? {
		start: startToken,
		matched: false
	} : null;
}
var noTokens = Object.create(null);
var typeArray = [NodeType.none];
var warned = [];
var byTag = Object.create(null);
var defaultTable = Object.create(null);
for (let [legacyName, name] of [
	["variable", "variableName"],
	["variable-2", "variableName.special"],
	["string-2", "string.special"],
	["def", "variableName.definition"],
	["tag", "tagName"],
	["attribute", "attributeName"],
	["type", "typeName"],
	["builtin", "variableName.standard"],
	["qualifier", "modifier"],
	["error", "invalid"],
	["header", "heading"],
	["property", "propertyName"]
]) defaultTable[legacyName] = createTokenType(noTokens, name);
function warnForPart(part, msg) {
	if (warned.indexOf(part) > -1) return;
	warned.push(part);
	console.warn(msg);
}
function createTokenType(extra, tagStr) {
	let tags$1 = [];
	for (let name of tagStr.split(" ")) {
		let found = [];
		for (let part of name.split(".")) {
			let value = extra[part] || tags[part];
			if (!value) warnForPart(part, `Unknown highlighting tag ${part}`);
			else if (typeof value == "function") {
				if (!found.length) warnForPart(part, `Modifier ${part} used at start of tag`);
				else found = found.map(value);
			} else if (found.length) warnForPart(part, `Tag ${part} used as modifier`);
			else found = Array.isArray(value) ? value : [value];
		}
		for (let tag of found) tags$1.push(tag);
	}
	if (!tags$1.length) return 0;
	let name = tagStr.replace(/ /g, "_"), key = name + " " + tags$1.map((t) => t.id);
	let known = byTag[key];
	if (known) return known.id;
	let type = byTag[key] = NodeType.define({
		id: typeArray.length,
		name,
		props: [styleTags({ [name]: tags$1 })]
	});
	typeArray.push(type);
	return type.id;
}
Direction.RTL, Direction.LTR;
// ../../node_modules/@codemirror/autocomplete/dist/index.js
var CompletionContext = class {
	constructor(state, pos, explicit, view) {
		this.state = state;
		this.pos = pos;
		this.explicit = explicit;
		this.view = view;
		this.abortListeners = [];
		this.abortOnDocChange = false;
	}
	tokenBefore(types) {
		let token = syntaxTree(this.state).resolveInner(this.pos, -1);
		while (token && types.indexOf(token.name) < 0) token = token.parent;
		return token ? {
			from: token.from,
			to: this.pos,
			text: this.state.sliceDoc(token.from, this.pos),
			type: token.type
		} : null;
	}
	matchBefore(expr) {
		let line = this.state.doc.lineAt(this.pos);
		let start = Math.max(line.from, this.pos - 250);
		let str = line.text.slice(start - line.from, this.pos - line.from);
		let found = str.search(ensureAnchor(expr, false));
		return found < 0 ? null : {
			from: start + found,
			to: this.pos,
			text: str.slice(found)
		};
	}
	get aborted() {
		return this.abortListeners == null;
	}
	addEventListener(type, listener, options) {
		if (type == "abort" && this.abortListeners) {
			this.abortListeners.push(listener);
			if (options && options.onDocChange) this.abortOnDocChange = true;
		}
	}
};
function toSet(chars) {
	let flat = Object.keys(chars).join("");
	let words = /\w/.test(flat);
	if (words) flat = flat.replace(/\w/g, "");
	return `[${words ? "\\w" : ""}${flat.replace(/[^\w\s]/g, "\\$&")}]`;
}
function prefixMatch(options) {
	let first = Object.create(null), rest = Object.create(null);
	for (let { label } of options) {
		first[label[0]] = true;
		for (let i = 1; i < label.length; i++) rest[label[i]] = true;
	}
	let source = toSet(first) + toSet(rest) + "*$";
	return [new RegExp("^" + source), new RegExp(source)];
}
function completeFromList(list) {
	let options = list.map((o) => typeof o == "string" ? { label: o } : o);
	let [validFor, match] = options.every((o) => /^\w+$/.test(o.label)) ? [/\w*$/, /\w+$/] : prefixMatch(options);
	return (context) => {
		let token = context.matchBefore(match);
		return token || context.explicit ? {
			from: token ? token.from : context.pos,
			options,
			validFor
		} : null;
	};
}
var Option = class {
	constructor(completion, source, match, score) {
		this.completion = completion;
		this.source = source;
		this.match = match;
		this.score = score;
	}
};
function cur(state) {
	return state.selection.main.from;
}
function ensureAnchor(expr, start) {
	var _a;
	let { source } = expr;
	let addStart = start && source[0] != "^", addEnd = source[source.length - 1] != "$";
	if (!addStart && !addEnd) return expr;
	return new RegExp(`${addStart ? "^" : ""}(?:${source})${addEnd ? "$" : ""}`, (_a = expr.flags) !== null && _a !== void 0 ? _a : expr.ignoreCase ? "i" : "");
}
var pickedCompletion = Annotation.define();
function insertCompletionText(state, text, from, to) {
	let { main } = state.selection, fromOff = from - main.from, toOff = to - main.from;
	return {
		...state.changeByRange((range) => {
			if (range != main && from != to && state.sliceDoc(range.from + fromOff, range.from + toOff) != state.sliceDoc(from, to)) return { range };
			let lines = state.toText(text);
			return {
				changes: {
					from: range.from + fromOff,
					to: to == main.from ? range.to : range.from + toOff,
					insert: lines
				},
				range: EditorSelection.cursor(range.from + fromOff + lines.length)
			};
		}),
		scrollIntoView: true,
		userEvent: "input.complete"
	};
}
var SourceCache = new WeakMap();
function asSource(source) {
	if (!Array.isArray(source)) return source;
	let known = SourceCache.get(source);
	if (!known) SourceCache.set(source, known = completeFromList(source));
	return known;
}
var startCompletionEffect = StateEffect.define();
var closeCompletionEffect = StateEffect.define();
var FuzzyMatcher = class {
	constructor(pattern) {
		this.pattern = pattern;
		this.chars = [];
		this.folded = [];
		this.any = [];
		this.precise = [];
		this.byWord = [];
		this.score = 0;
		this.matched = [];
		for (let p = 0; p < pattern.length;) {
			let char = codePointAt(pattern, p), size = codePointSize(char);
			this.chars.push(char);
			let part = pattern.slice(p, p + size), upper = part.toUpperCase();
			this.folded.push(codePointAt(upper == part ? part.toLowerCase() : upper, 0));
			p += size;
		}
		this.astral = pattern.length != this.chars.length;
	}
	ret(score, matched) {
		this.score = score;
		this.matched = matched;
		return this;
	}
	match(word) {
		if (this.pattern.length == 0) return this.ret(-100, []);
		if (word.length < this.pattern.length) return null;
		let { chars, folded, any, precise, byWord } = this;
		if (chars.length == 1) {
			let first = codePointAt(word, 0), firstSize = codePointSize(first);
			let score = firstSize == word.length ? 0 : -100;
			if (first == chars[0]);
			else if (first == folded[0]) score += -200;
			else return null;
			return this.ret(score, [0, firstSize]);
		}
		let direct = word.indexOf(this.pattern);
		if (direct == 0) return this.ret(word.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
		let len = chars.length, anyTo = 0;
		if (direct < 0) {
			for (let i = 0, e = Math.min(word.length, 200); i < e && anyTo < len;) {
				let next = codePointAt(word, i);
				if (next == chars[anyTo] || next == folded[anyTo]) any[anyTo++] = i;
				i += codePointSize(next);
			}
			if (anyTo < len) return null;
		}
		let preciseTo = 0;
		let byWordTo = 0, byWordFolded = false;
		let adjacentTo = 0, adjacentStart = -1, adjacentEnd = -1;
		let hasLower = /[a-z]/.test(word), wordAdjacent = true;
		for (let i = 0, e = Math.min(word.length, 200), prevType = 0; i < e && byWordTo < len;) {
			let next = codePointAt(word, i);
			if (direct < 0) {
				if (preciseTo < len && next == chars[preciseTo]) precise[preciseTo++] = i;
				if (adjacentTo < len) {
					if (next == chars[adjacentTo] || next == folded[adjacentTo]) {
						if (adjacentTo == 0) adjacentStart = i;
						adjacentEnd = i + 1;
						adjacentTo++;
					} else adjacentTo = 0;
				}
			}
			let ch, type = next < 255 ? next >= 48 && next <= 57 || next >= 97 && next <= 122 ? 2 : next >= 65 && next <= 90 ? 1 : 0 : (ch = fromCodePoint(next)) != ch.toLowerCase() ? 1 : ch != ch.toUpperCase() ? 2 : 0;
			if (!i || type == 1 && hasLower || prevType == 0 && type != 0) {
				if (chars[byWordTo] == next || folded[byWordTo] == next && (byWordFolded = true)) byWord[byWordTo++] = i;
				else if (byWord.length) wordAdjacent = false;
			}
			prevType = type;
			i += codePointSize(next);
		}
		if (byWordTo == len && byWord[0] == 0 && wordAdjacent) return this.result(-100 + (byWordFolded ? -200 : 0), byWord, word);
		if (adjacentTo == len && adjacentStart == 0) return this.ret(-200 - word.length + (adjacentEnd == word.length ? 0 : -100), [0, adjacentEnd]);
		if (direct > -1) return this.ret(-700 - word.length, [direct, direct + this.pattern.length]);
		if (adjacentTo == len) return this.ret(-900 - word.length, [adjacentStart, adjacentEnd]);
		if (byWordTo == len) return this.result(-100 + (byWordFolded ? -200 : 0) + -700 + (wordAdjacent ? 0 : -1100), byWord, word);
		return chars.length == 2 ? null : this.result((any[0] ? -700 : 0) + -200 + -1100, any, word);
	}
	result(score, positions, word) {
		let result = [], i = 0;
		for (let pos of positions) {
			let to = pos + (this.astral ? codePointSize(codePointAt(word, pos)) : 1);
			if (i && result[i - 1] == pos) result[i - 1] = to;
			else {
				result[i++] = pos;
				result[i++] = to;
			}
		}
		return this.ret(score - word.length, result);
	}
};
var StrictMatcher = class {
	constructor(pattern) {
		this.pattern = pattern;
		this.matched = [];
		this.score = 0;
		this.folded = pattern.toLowerCase();
	}
	match(word) {
		if (word.length < this.pattern.length) return null;
		let start = word.slice(0, this.pattern.length);
		let match = start == this.pattern ? 0 : start.toLowerCase() == this.folded ? -200 : null;
		if (match == null) return null;
		this.matched = [0, start.length];
		this.score = match + (word.length == this.pattern.length ? 0 : -100);
		return this;
	}
};
var completionConfig = Facet.define({ combine(configs) {
	return combineConfig(configs, {
		activateOnTyping: true,
		activateOnCompletion: () => false,
		activateOnTypingDelay: 100,
		selectOnOpen: true,
		override: null,
		closeOnBlur: true,
		maxRenderedOptions: 100,
		defaultKeymap: true,
		tooltipClass: () => "",
		optionClass: () => "",
		aboveCursor: false,
		icons: true,
		addToOptions: [],
		positionInfo: defaultPositionInfo,
		filterStrict: false,
		compareCompletions: (a, b) => (a.sortText || a.label).localeCompare(b.sortText || b.label),
		interactionDelay: 75,
		updateSyncTime: 100
	}, {
		defaultKeymap: (a, b) => a && b,
		closeOnBlur: (a, b) => a && b,
		icons: (a, b) => a && b,
		tooltipClass: (a, b) => (c) => joinClass(a(c), b(c)),
		optionClass: (a, b) => (c) => joinClass(a(c), b(c)),
		addToOptions: (a, b) => a.concat(b),
		filterStrict: (a, b) => a || b
	});
} });
function joinClass(a, b) {
	return a ? b ? a + " " + b : a : b;
}
function defaultPositionInfo(view, list, option, info, space, tooltip) {
	let rtl = view.textDirection == Direction.RTL, left = rtl, narrow = false;
	let side = "top", offset, maxWidth;
	let spaceLeft = list.left - space.left, spaceRight = space.right - list.right;
	let infoWidth = info.right - info.left, infoHeight = info.bottom - info.top;
	if (left && spaceLeft < Math.min(infoWidth, spaceRight)) left = false;
	else if (!left && spaceRight < Math.min(infoWidth, spaceLeft)) left = true;
	if (infoWidth <= (left ? spaceLeft : spaceRight)) {
		offset = Math.max(space.top, Math.min(option.top, space.bottom - infoHeight)) - list.top;
		maxWidth = Math.min(400, left ? spaceLeft : spaceRight);
	} else {
		narrow = true;
		maxWidth = Math.min(400, (rtl ? list.right : space.right - list.left) - 30);
		let spaceBelow = space.bottom - list.bottom;
		if (spaceBelow >= infoHeight || spaceBelow > list.top) offset = option.bottom - list.top;
		else {
			side = "bottom";
			offset = list.bottom - option.top;
		}
	}
	let scaleY = (list.bottom - list.top) / tooltip.offsetHeight;
	let scaleX = (list.right - list.left) / tooltip.offsetWidth;
	return {
		style: `${side}: ${offset / scaleY}px; max-width: ${maxWidth / scaleX}px`,
		class: "cm-completionInfo-" + (narrow ? rtl ? "left-narrow" : "right-narrow" : left ? "left" : "right")
	};
}
var setSelectedEffect = StateEffect.define();
function optionContent(config) {
	let content = config.addToOptions.slice();
	if (config.icons) content.push({
		render(completion) {
			let icon = document.createElement("div");
			icon.classList.add("cm-completionIcon");
			if (completion.type) icon.classList.add(...completion.type.split(/\s+/g).map((cls) => "cm-completionIcon-" + cls));
			icon.setAttribute("aria-hidden", "true");
			return icon;
		},
		position: 20
	});
	content.push({
		render(completion, _s, _v, match) {
			let labelElt = document.createElement("span");
			labelElt.className = "cm-completionLabel";
			let label = completion.displayLabel || completion.label, off = 0;
			for (let j = 0; j < match.length;) {
				let from = match[j++], to = match[j++];
				if (from > off) labelElt.appendChild(document.createTextNode(label.slice(off, from)));
				let span = labelElt.appendChild(document.createElement("span"));
				span.appendChild(document.createTextNode(label.slice(from, to)));
				span.className = "cm-completionMatchedText";
				off = to;
			}
			if (off < label.length) labelElt.appendChild(document.createTextNode(label.slice(off)));
			return labelElt;
		},
		position: 50
	}, {
		render(completion) {
			if (!completion.detail) return null;
			let detailElt = document.createElement("span");
			detailElt.className = "cm-completionDetail";
			detailElt.textContent = completion.detail;
			return detailElt;
		},
		position: 80
	});
	return content.sort((a, b) => a.position - b.position).map((a) => a.render);
}
function rangeAroundSelected(total, selected, max) {
	if (total <= max) return {
		from: 0,
		to: total
	};
	if (selected < 0) selected = 0;
	if (selected <= total >> 1) {
		let off = Math.floor(selected / max);
		return {
			from: off * max,
			to: (off + 1) * max
		};
	}
	let off = Math.ceil((total - selected) / max);
	return {
		from: total - off * max,
		to: total - (off - 1) * max
	};
}
var CompletionTooltip = class {
	constructor(view, stateField, applyCompletion) {
		this.view = view;
		this.stateField = stateField;
		this.applyCompletion = applyCompletion;
		this.info = null;
		this.infoDestroy = null;
		this.placeInfoReq = {
			read: () => this.measureInfo(),
			write: (pos) => this.placeInfo(pos),
			key: this
		};
		this.space = null;
		this.currentClass = "";
		let cState = view.state.field(stateField);
		let { options, selected } = cState.open;
		let config = view.state.facet(completionConfig);
		this.optionContent = optionContent(config);
		this.optionClass = config.optionClass;
		this.tooltipClass = config.tooltipClass;
		this.range = rangeAroundSelected(options.length, selected, config.maxRenderedOptions);
		this.dom = document.createElement("div");
		this.dom.className = "cm-tooltip-autocomplete";
		this.updateTooltipClass(view.state);
		this.dom.addEventListener("mousedown", (e) => {
			let { options } = view.state.field(stateField).open;
			for (let dom = e.target, match; dom && dom != this.dom; dom = dom.parentNode) if (dom.nodeName == "LI" && (match = /-(\d+)$/.exec(dom.id)) && +match[1] < options.length) {
				this.applyCompletion(view, options[+match[1]]);
				e.preventDefault();
				return;
			}
			if (e.target == this.list) {
				let move = this.list.classList.contains("cm-completionListIncompleteTop") && e.clientY < this.list.firstChild.getBoundingClientRect().top ? this.range.from - 1 : this.list.classList.contains("cm-completionListIncompleteBottom") && e.clientY > this.list.lastChild.getBoundingClientRect().bottom ? this.range.to : null;
				if (move != null) {
					view.dispatch({ effects: setSelectedEffect.of(move) });
					e.preventDefault();
				}
			}
		});
		this.dom.addEventListener("focusout", (e) => {
			let state = view.state.field(this.stateField, false);
			if (state && state.tooltip && view.state.facet(completionConfig).closeOnBlur && e.relatedTarget != view.contentDOM) view.dispatch({ effects: closeCompletionEffect.of(null) });
		});
		this.showOptions(options, cState.id);
	}
	mount() {
		this.updateSel();
	}
	showOptions(options, id) {
		if (this.list) this.list.remove();
		this.list = this.dom.appendChild(this.createListBox(options, id, this.range));
		this.list.addEventListener("scroll", () => {
			if (this.info) this.view.requestMeasure(this.placeInfoReq);
		});
	}
	update(update) {
		var _a;
		let cState = update.state.field(this.stateField);
		let prevState = update.startState.field(this.stateField);
		this.updateTooltipClass(update.state);
		if (cState != prevState) {
			let { options, selected, disabled } = cState.open;
			if (!prevState.open || prevState.open.options != options) {
				this.range = rangeAroundSelected(options.length, selected, update.state.facet(completionConfig).maxRenderedOptions);
				this.showOptions(options, cState.id);
			}
			this.updateSel();
			if (disabled != ((_a = prevState.open) === null || _a === void 0 ? void 0 : _a.disabled)) this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!disabled);
		}
	}
	updateTooltipClass(state) {
		let cls = this.tooltipClass(state);
		if (cls != this.currentClass) {
			for (let c of this.currentClass.split(" ")) if (c) this.dom.classList.remove(c);
			for (let c of cls.split(" ")) if (c) this.dom.classList.add(c);
			this.currentClass = cls;
		}
	}
	positioned(space) {
		this.space = space;
		if (this.info) this.view.requestMeasure(this.placeInfoReq);
	}
	updateSel() {
		let cState = this.view.state.field(this.stateField), open = cState.open;
		if (open.selected > -1 && open.selected < this.range.from || open.selected >= this.range.to) {
			this.range = rangeAroundSelected(open.options.length, open.selected, this.view.state.facet(completionConfig).maxRenderedOptions);
			this.showOptions(open.options, cState.id);
		}
		let newSel = this.updateSelectedOption(open.selected);
		if (newSel) {
			this.destroyInfo();
			let { completion } = open.options[open.selected];
			let { info } = completion;
			if (!info) return;
			let infoResult = typeof info === "string" ? document.createTextNode(info) : info(completion);
			if (!infoResult) return;
			if ("then" in infoResult) infoResult.then((obj) => {
				if (obj && this.view.state.field(this.stateField, false) == cState) this.addInfoPane(obj, completion);
			}).catch((e) => logException(this.view.state, e, "completion info"));
			else {
				this.addInfoPane(infoResult, completion);
				newSel.setAttribute("aria-describedby", this.info.id);
			}
		}
	}
	addInfoPane(content, completion) {
		this.destroyInfo();
		let wrap = this.info = document.createElement("div");
		wrap.className = "cm-tooltip cm-completionInfo";
		wrap.id = "cm-completionInfo-" + Math.floor(Math.random() * 65535).toString(16);
		if (content.nodeType != null) {
			wrap.appendChild(content);
			this.infoDestroy = null;
		} else {
			let { dom, destroy } = content;
			wrap.appendChild(dom);
			this.infoDestroy = destroy || null;
		}
		this.dom.appendChild(wrap);
		this.view.requestMeasure(this.placeInfoReq);
	}
	updateSelectedOption(selected) {
		let set = null;
		for (let opt = this.list.firstChild, i = this.range.from; opt; opt = opt.nextSibling, i++) if (opt.nodeName != "LI" || !opt.id) i--;
		else if (i == selected) {
			if (!opt.hasAttribute("aria-selected")) {
				opt.setAttribute("aria-selected", "true");
				set = opt;
			}
		} else if (opt.hasAttribute("aria-selected")) {
			opt.removeAttribute("aria-selected");
			opt.removeAttribute("aria-describedby");
		}
		if (set) scrollIntoView(this.list, set);
		return set;
	}
	measureInfo() {
		let sel = this.dom.querySelector("[aria-selected]");
		if (!sel || !this.info) return null;
		let listRect = this.dom.getBoundingClientRect();
		let infoRect = this.info.getBoundingClientRect();
		let selRect = sel.getBoundingClientRect();
		let space = this.space;
		if (!space) {
			let docElt = this.dom.ownerDocument.documentElement;
			space = {
				left: 0,
				top: 0,
				right: docElt.clientWidth,
				bottom: docElt.clientHeight
			};
		}
		if (selRect.top > Math.min(space.bottom, listRect.bottom) - 10 || selRect.bottom < Math.max(space.top, listRect.top) + 10) return null;
		return this.view.state.facet(completionConfig).positionInfo(this.view, listRect, selRect, infoRect, space, this.dom);
	}
	placeInfo(pos) {
		if (this.info) {
			if (pos) {
				if (pos.style) this.info.style.cssText = pos.style;
				this.info.className = "cm-tooltip cm-completionInfo " + (pos.class || "");
			} else this.info.style.cssText = "top: -1e6px";
		}
	}
	createListBox(options, id, range) {
		const ul = document.createElement("ul");
		ul.id = id;
		ul.setAttribute("role", "listbox");
		ul.setAttribute("aria-expanded", "true");
		ul.setAttribute("aria-label", this.view.state.phrase("Completions"));
		ul.addEventListener("mousedown", (e) => {
			if (e.target == ul) e.preventDefault();
		});
		let curSection = null;
		for (let i = range.from; i < range.to; i++) {
			let { completion, match } = options[i], { section } = completion;
			if (section) {
				let name = typeof section == "string" ? section : section.name;
				if (name != curSection && (i > range.from || range.from == 0)) {
					curSection = name;
					if (typeof section != "string" && section.header) ul.appendChild(section.header(section));
					else {
						let header = ul.appendChild(document.createElement("completion-section"));
						header.textContent = name;
					}
				}
			}
			const li = ul.appendChild(document.createElement("li"));
			li.id = id + "-" + i;
			li.setAttribute("role", "option");
			let cls = this.optionClass(completion);
			if (cls) li.className = cls;
			for (let source of this.optionContent) {
				let node = source(completion, this.view.state, this.view, match);
				if (node) li.appendChild(node);
			}
		}
		if (range.from) ul.classList.add("cm-completionListIncompleteTop");
		if (range.to < options.length) ul.classList.add("cm-completionListIncompleteBottom");
		return ul;
	}
	destroyInfo() {
		if (this.info) {
			if (this.infoDestroy) this.infoDestroy();
			this.info.remove();
			this.info = null;
		}
	}
	destroy() {
		this.destroyInfo();
	}
};
function completionTooltip(stateField, applyCompletion) {
	return (view) => new CompletionTooltip(view, stateField, applyCompletion);
}
function scrollIntoView(container, element) {
	let parent = container.getBoundingClientRect();
	let self = element.getBoundingClientRect();
	let scaleY = parent.height / container.offsetHeight;
	if (self.top < parent.top) container.scrollTop -= (parent.top - self.top) / scaleY;
	else if (self.bottom > parent.bottom) container.scrollTop += (self.bottom - parent.bottom) / scaleY;
}
function score(option) {
	return (option.boost || 0) * 100 + (option.apply ? 10 : 0) + (option.info ? 5 : 0) + (option.type ? 1 : 0);
}
function sortOptions(active, state) {
	let options = [];
	let sections = null, dynamicSectionScore = null;
	let addOption = (option) => {
		options.push(option);
		let { section } = option.completion;
		if (section) {
			if (!sections) sections = [];
			let name = typeof section == "string" ? section : section.name;
			if (!sections.some((s) => s.name == name)) sections.push(typeof section == "string" ? { name } : section);
		}
	};
	let conf = state.facet(completionConfig);
	for (let a of active) if (a.hasResult()) {
		let getMatch = a.result.getMatch;
		if (a.result.filter === false) for (let option of a.result.options) addOption(new Option(option, a.source, getMatch ? getMatch(option) : [], 1e9 - options.length));
		else {
			let pattern = state.sliceDoc(a.from, a.to), match;
			let matcher = conf.filterStrict ? new StrictMatcher(pattern) : new FuzzyMatcher(pattern);
			for (let option of a.result.options) if (match = matcher.match(option.label)) {
				let matched = !option.displayLabel ? match.matched : getMatch ? getMatch(option, match.matched) : [];
				let score = match.score + (option.boost || 0);
				addOption(new Option(option, a.source, matched, score));
				if (typeof option.section == "object" && option.section.rank === "dynamic") {
					let { name } = option.section;
					if (!dynamicSectionScore) dynamicSectionScore = Object.create(null);
					dynamicSectionScore[name] = Math.max(score, dynamicSectionScore[name] || -1e9);
				}
			}
		}
	}
	if (sections) {
		let sectionOrder = Object.create(null), pos = 0;
		let cmp = (a, b) => {
			return (a.rank === "dynamic" && b.rank === "dynamic" ? dynamicSectionScore[b.name] - dynamicSectionScore[a.name] : 0) || (typeof a.rank == "number" ? a.rank : 1e9) - (typeof b.rank == "number" ? b.rank : 1e9) || (a.name < b.name ? -1 : 1);
		};
		for (let s of sections.sort(cmp)) {
			pos -= 1e5;
			sectionOrder[s.name] = pos;
		}
		for (let option of options) {
			let { section } = option.completion;
			if (section) option.score += sectionOrder[typeof section == "string" ? section : section.name];
		}
	}
	let result = [], prev = null;
	let compare = conf.compareCompletions;
	for (let opt of options.sort((a, b) => b.score - a.score || compare(a.completion, b.completion))) {
		let cur = opt.completion;
		if (!prev || prev.label != cur.label || prev.detail != cur.detail || prev.type != null && cur.type != null && prev.type != cur.type || prev.apply != cur.apply || prev.boost != cur.boost) result.push(opt);
		else if (score(opt.completion) > score(prev)) result[result.length - 1] = opt;
		prev = opt.completion;
	}
	return result;
}
var CompletionDialog = class CompletionDialog {
	constructor(options, attrs, tooltip, timestamp, selected, disabled) {
		this.options = options;
		this.attrs = attrs;
		this.tooltip = tooltip;
		this.timestamp = timestamp;
		this.selected = selected;
		this.disabled = disabled;
	}
	setSelected(selected, id) {
		return selected == this.selected || selected >= this.options.length ? this : new CompletionDialog(this.options, makeAttrs(id, selected), this.tooltip, this.timestamp, selected, this.disabled);
	}
	static build(active, state, id, prev, conf, didSetActive) {
		if (prev && !didSetActive && active.some((s) => s.isPending)) return prev.setDisabled();
		let options = sortOptions(active, state);
		if (!options.length) return prev && active.some((a) => a.isPending) ? prev.setDisabled() : null;
		let selected = state.facet(completionConfig).selectOnOpen ? 0 : -1;
		if (prev && prev.selected != selected && prev.selected != -1) {
			let selectedValue = prev.options[prev.selected].completion;
			for (let i = 0; i < options.length; i++) if (options[i].completion == selectedValue) {
				selected = i;
				break;
			}
		}
		return new CompletionDialog(options, makeAttrs(id, selected), {
			pos: active.reduce((a, b) => b.hasResult() ? Math.min(a, b.from) : a, 1e8),
			create: createTooltip,
			above: conf.aboveCursor
		}, prev ? prev.timestamp : Date.now(), selected, false);
	}
	map(changes) {
		return new CompletionDialog(this.options, this.attrs, {
			...this.tooltip,
			pos: changes.mapPos(this.tooltip.pos)
		}, this.timestamp, this.selected, this.disabled);
	}
	setDisabled() {
		return new CompletionDialog(this.options, this.attrs, this.tooltip, this.timestamp, this.selected, true);
	}
};
var CompletionState = class CompletionState {
	constructor(active, id, open) {
		this.active = active;
		this.id = id;
		this.open = open;
	}
	static start() {
		return new CompletionState(none$2, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
	}
	update(tr) {
		let { state } = tr, conf = state.facet(completionConfig);
		let active = (conf.override || state.languageDataAt("autocomplete", cur(state)).map(asSource)).map((source) => {
			return (this.active.find((s) => s.source == source) || new ActiveSource(source, this.active.some((a) => a.state != 0) ? 1 : 0)).update(tr, conf);
		});
		if (active.length == this.active.length && active.every((a, i) => a == this.active[i])) active = this.active;
		let open = this.open, didSet = tr.effects.some((e) => e.is(setActiveEffect));
		if (open && tr.docChanged) open = open.map(tr.changes);
		if (tr.selection || active.some((a) => a.hasResult() && tr.changes.touchesRange(a.from, a.to)) || !sameResults(active, this.active) || didSet) open = CompletionDialog.build(active, state, this.id, open, conf, didSet);
		else if (open && open.disabled && !active.some((a) => a.isPending)) open = null;
		if (!open && active.every((a) => !a.isPending) && active.some((a) => a.hasResult())) active = active.map((a) => a.hasResult() ? new ActiveSource(a.source, 0) : a);
		for (let effect of tr.effects) if (effect.is(setSelectedEffect)) open = open && open.setSelected(effect.value, this.id);
		return active == this.active && open == this.open ? this : new CompletionState(active, this.id, open);
	}
	get tooltip() {
		return this.open ? this.open.tooltip : null;
	}
	get attrs() {
		return this.open ? this.open.attrs : this.active.length ? baseAttrs : noAttrs;
	}
};
function sameResults(a, b) {
	if (a == b) return true;
	for (let iA = 0, iB = 0;;) {
		while (iA < a.length && !a[iA].hasResult()) iA++;
		while (iB < b.length && !b[iB].hasResult()) iB++;
		let endA = iA == a.length, endB = iB == b.length;
		if (endA || endB) return endA == endB;
		if (a[iA++].result != b[iB++].result) return false;
	}
}
var baseAttrs = { "aria-autocomplete": "list" };
var noAttrs = {};
function makeAttrs(id, selected) {
	let result = {
		"aria-autocomplete": "list",
		"aria-haspopup": "listbox",
		"aria-controls": id
	};
	if (selected > -1) result["aria-activedescendant"] = id + "-" + selected;
	return result;
}
var none$2 = [];
function getUpdateType(tr, conf) {
	if (tr.isUserEvent("input.complete")) {
		let completion = tr.annotation(pickedCompletion);
		if (completion && conf.activateOnCompletion(completion)) return 12;
	}
	let typing = tr.isUserEvent("input.type");
	return typing && conf.activateOnTyping ? 5 : typing ? 1 : tr.isUserEvent("delete.backward") ? 2 : tr.selection ? 8 : tr.docChanged ? 16 : 0;
}
var ActiveSource = class ActiveSource {
	constructor(source, state, explicit = false) {
		this.source = source;
		this.state = state;
		this.explicit = explicit;
	}
	hasResult() {
		return false;
	}
	get isPending() {
		return this.state == 1;
	}
	update(tr, conf) {
		let type = getUpdateType(tr, conf), value = this;
		if (type & 8 || type & 16 && this.touches(tr)) value = new ActiveSource(value.source, 0);
		if (type & 4 && value.state == 0) value = new ActiveSource(this.source, 1);
		value = value.updateFor(tr, type);
		for (let effect of tr.effects) if (effect.is(startCompletionEffect)) value = new ActiveSource(value.source, 1, effect.value);
		else if (effect.is(closeCompletionEffect)) value = new ActiveSource(value.source, 0);
		else if (effect.is(setActiveEffect)) {
			for (let active of effect.value) if (active.source == value.source) value = active;
		}
		return value;
	}
	updateFor(tr, type) {
		return this.map(tr.changes);
	}
	map(changes) {
		return this;
	}
	touches(tr) {
		return tr.changes.touchesRange(cur(tr.state));
	}
};
var ActiveResult = class ActiveResult extends ActiveSource {
	constructor(source, explicit, limit, result, from, to) {
		super(source, 3, explicit);
		this.limit = limit;
		this.result = result;
		this.from = from;
		this.to = to;
	}
	hasResult() {
		return true;
	}
	updateFor(tr, type) {
		var _a;
		if (!(type & 3)) return this.map(tr.changes);
		let result = this.result;
		if (result.map && !tr.changes.empty) result = result.map(result, tr.changes);
		let from = tr.changes.mapPos(this.from), to = tr.changes.mapPos(this.to, 1);
		let pos = cur(tr.state);
		if (pos > to || !result || type & 2 && (cur(tr.startState) == this.from || pos < this.limit)) return new ActiveSource(this.source, type & 4 ? 1 : 0);
		let limit = tr.changes.mapPos(this.limit);
		if (checkValid(result.validFor, tr.state, from, to)) return new ActiveResult(this.source, this.explicit, limit, result, from, to);
		if (result.update && (result = result.update(result, from, to, new CompletionContext(tr.state, pos, false)))) return new ActiveResult(this.source, this.explicit, limit, result, result.from, (_a = result.to) !== null && _a !== void 0 ? _a : cur(tr.state));
		return new ActiveSource(this.source, 1, this.explicit);
	}
	map(mapping) {
		if (mapping.empty) return this;
		let result = this.result.map ? this.result.map(this.result, mapping) : this.result;
		if (!result) return new ActiveSource(this.source, 0);
		return new ActiveResult(this.source, this.explicit, mapping.mapPos(this.limit), result, mapping.mapPos(this.from), mapping.mapPos(this.to, 1));
	}
	touches(tr) {
		return tr.changes.touchesRange(this.from, this.to);
	}
};
function checkValid(validFor, state, from, to) {
	if (!validFor) return false;
	let text = state.sliceDoc(from, to);
	return typeof validFor == "function" ? validFor(text, from, to, state) : ensureAnchor(validFor, true).test(text);
}
var setActiveEffect = StateEffect.define({ map(sources, mapping) {
	return sources.map((s) => s.map(mapping));
} });
var completionState = StateField.define({
	create() {
		return CompletionState.start();
	},
	update(value, tr) {
		return value.update(tr);
	},
	provide: (f) => [showTooltip.from(f, (val) => val.tooltip), EditorView.contentAttributes.from(f, (state) => state.attrs)]
});
function applyCompletion(view, option) {
	const apply = option.completion.apply || option.completion.label;
	let result = view.state.field(completionState).active.find((a) => a.source == option.source);
	if (!(result instanceof ActiveResult)) return false;
	if (typeof apply == "string") view.dispatch({
		...insertCompletionText(view.state, apply, result.from, result.to),
		annotations: pickedCompletion.of(option.completion)
	});
	else apply(view, option.completion, result.from, result.to);
	return true;
}
var createTooltip = completionTooltip(completionState, applyCompletion);
function moveCompletionSelection(forward, by = "option") {
	return (view) => {
		let cState = view.state.field(completionState, false);
		if (!cState || !cState.open || cState.open.disabled || Date.now() - cState.open.timestamp < view.state.facet(completionConfig).interactionDelay) return false;
		let step = 1, tooltip;
		if (by == "page" && (tooltip = getTooltip(view, cState.open.tooltip))) step = Math.max(2, Math.floor(tooltip.dom.offsetHeight / tooltip.dom.querySelector("li").offsetHeight) - 1);
		let { length } = cState.open.options;
		let selected = cState.open.selected > -1 ? cState.open.selected + step * (forward ? 1 : -1) : forward ? 0 : length - 1;
		if (selected < 0) selected = by == "page" ? 0 : length - 1;
		else if (selected >= length) selected = by == "page" ? length - 1 : 0;
		view.dispatch({ effects: setSelectedEffect.of(selected) });
		return true;
	};
}
var acceptCompletion = (view) => {
	let cState = view.state.field(completionState, false);
	if (view.state.readOnly || !cState || !cState.open || cState.open.selected < 0 || cState.open.disabled || Date.now() - cState.open.timestamp < view.state.facet(completionConfig).interactionDelay) return false;
	return applyCompletion(view, cState.open.options[cState.open.selected]);
};
var startCompletion = (view) => {
	if (!view.state.field(completionState, false)) return false;
	view.dispatch({ effects: startCompletionEffect.of(true) });
	return true;
};
var closeCompletion = (view) => {
	let cState = view.state.field(completionState, false);
	if (!cState || !cState.active.some((a) => a.state != 0)) return false;
	view.dispatch({ effects: closeCompletionEffect.of(null) });
	return true;
};
var RunningQuery = class {
	constructor(active, context) {
		this.active = active;
		this.context = context;
		this.time = Date.now();
		this.updates = [];
		this.done = void 0;
	}
};
var MaxUpdateCount = 50;
var MinAbortTime = 1e3;
var completionPlugin = ViewPlugin.fromClass(class {
	constructor(view) {
		this.view = view;
		this.debounceUpdate = -1;
		this.running = [];
		this.debounceAccept = -1;
		this.pendingStart = false;
		this.composing = 0;
		for (let active of view.state.field(completionState).active) if (active.isPending) this.startQuery(active);
	}
	update(update) {
		let cState = update.state.field(completionState);
		let conf = update.state.facet(completionConfig);
		if (!update.selectionSet && !update.docChanged && update.startState.field(completionState) == cState) return;
		let doesReset = update.transactions.some((tr) => {
			let type = getUpdateType(tr, conf);
			return type & 8 || (tr.selection || tr.docChanged) && !(type & 3);
		});
		for (let i = 0; i < this.running.length; i++) {
			let query = this.running[i];
			if (doesReset || query.context.abortOnDocChange && update.docChanged || query.updates.length + update.transactions.length > MaxUpdateCount && Date.now() - query.time > MinAbortTime) {
				for (let handler of query.context.abortListeners) try {
					handler();
				} catch (e) {
					logException(this.view.state, e);
				}
				query.context.abortListeners = null;
				this.running.splice(i--, 1);
			} else query.updates.push(...update.transactions);
		}
		if (this.debounceUpdate > -1) clearTimeout(this.debounceUpdate);
		if (update.transactions.some((tr) => tr.effects.some((e) => e.is(startCompletionEffect)))) this.pendingStart = true;
		let delay = this.pendingStart ? 50 : conf.activateOnTypingDelay;
		this.debounceUpdate = cState.active.some((a) => a.isPending && !this.running.some((q) => q.active.source == a.source)) ? setTimeout(() => this.startUpdate(), delay) : -1;
		if (this.composing != 0) {
			for (let tr of update.transactions) if (tr.isUserEvent("input.type")) this.composing = 2;
			else if (this.composing == 2 && tr.selection) this.composing = 3;
		}
	}
	startUpdate() {
		this.debounceUpdate = -1;
		this.pendingStart = false;
		let { state } = this.view, cState = state.field(completionState);
		for (let active of cState.active) if (active.isPending && !this.running.some((r) => r.active.source == active.source)) this.startQuery(active);
		if (this.running.length && cState.open && cState.open.disabled) this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(completionConfig).updateSyncTime);
	}
	startQuery(active) {
		let { state } = this.view;
		let context = new CompletionContext(state, cur(state), active.explicit, this.view);
		let pending = new RunningQuery(active, context);
		this.running.push(pending);
		Promise.resolve(active.source(context)).then((result) => {
			if (!pending.context.aborted) {
				pending.done = result || null;
				this.scheduleAccept();
			}
		}, (err) => {
			this.view.dispatch({ effects: closeCompletionEffect.of(null) });
			logException(this.view.state, err);
		});
	}
	scheduleAccept() {
		if (this.running.every((q) => q.done !== void 0)) this.accept();
		else if (this.debounceAccept < 0) this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(completionConfig).updateSyncTime);
	}
	accept() {
		var _a;
		if (this.debounceAccept > -1) clearTimeout(this.debounceAccept);
		this.debounceAccept = -1;
		let updated = [];
		let conf = this.view.state.facet(completionConfig), cState = this.view.state.field(completionState);
		for (let i = 0; i < this.running.length; i++) {
			let query = this.running[i];
			if (query.done === void 0) continue;
			this.running.splice(i--, 1);
			if (query.done) {
				let pos = cur(query.updates.length ? query.updates[0].startState : this.view.state);
				let limit = Math.min(pos, query.done.from + (query.active.explicit ? 0 : 1));
				let active = new ActiveResult(query.active.source, query.active.explicit, limit, query.done, query.done.from, (_a = query.done.to) !== null && _a !== void 0 ? _a : pos);
				for (let tr of query.updates) active = active.update(tr, conf);
				if (active.hasResult()) {
					updated.push(active);
					continue;
				}
			}
			let current = cState.active.find((a) => a.source == query.active.source);
			if (current && current.isPending) {
				if (query.done == null) {
					let active = new ActiveSource(query.active.source, 0);
					for (let tr of query.updates) active = active.update(tr, conf);
					if (!active.isPending) updated.push(active);
				} else this.startQuery(current);
			}
		}
		if (updated.length || cState.open && cState.open.disabled) this.view.dispatch({ effects: setActiveEffect.of(updated) });
	}
}, { eventHandlers: {
	blur(event) {
		let state = this.view.state.field(completionState, false);
		if (state && state.tooltip && this.view.state.facet(completionConfig).closeOnBlur) {
			let dialog = state.open && getTooltip(this.view, state.open.tooltip);
			if (!dialog || !dialog.dom.contains(event.relatedTarget)) setTimeout(() => this.view.dispatch({ effects: closeCompletionEffect.of(null) }), 10);
		}
	},
	compositionstart() {
		this.composing = 1;
	},
	compositionend() {
		if (this.composing == 3) setTimeout(() => this.view.dispatch({ effects: startCompletionEffect.of(false) }), 20);
		this.composing = 0;
	}
} });
var windows = typeof navigator == "object" && /Win/.test(navigator.platform);
var commitCharacters = Prec.highest(EditorView.domEventHandlers({ keydown(event, view) {
	let field = view.state.field(completionState, false);
	if (!field || !field.open || field.open.disabled || field.open.selected < 0 || event.key.length > 1 || event.ctrlKey && !(windows && event.altKey) || event.metaKey) return false;
	let option = field.open.options[field.open.selected];
	let result = field.active.find((a) => a.source == option.source);
	let commitChars = option.completion.commitCharacters || result.result.commitCharacters;
	if (commitChars && commitChars.indexOf(event.key) > -1) applyCompletion(view, option);
	return false;
} }));
var baseTheme$1 = EditorView.baseTheme({
	".cm-tooltip.cm-tooltip-autocomplete": { "& > ul": {
		fontFamily: "monospace",
		whiteSpace: "nowrap",
		overflow: "hidden auto",
		maxWidth_fallback: "700px",
		maxWidth: "min(700px, 95vw)",
		minWidth: "250px",
		maxHeight: "10em",
		height: "100%",
		listStyle: "none",
		margin: 0,
		padding: 0,
		"& > li, & > completion-section": {
			padding: "1px 3px",
			lineHeight: 1.2
		},
		"& > li": {
			overflowX: "hidden",
			textOverflow: "ellipsis",
			cursor: "pointer"
		},
		"& > completion-section": {
			display: "list-item",
			borderBottom: "1px solid silver",
			paddingLeft: "0.5em",
			opacity: .7
		}
	} },
	"&light .cm-tooltip-autocomplete ul li[aria-selected]": {
		background: "#17c",
		color: "white"
	},
	"&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": { background: "#777" },
	"&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
		background: "#347",
		color: "white"
	},
	"&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": { background: "#444" },
	".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
		content: "\"···\"",
		opacity: .5,
		display: "block",
		textAlign: "center",
		cursor: "pointer"
	},
	".cm-tooltip.cm-completionInfo": {
		position: "absolute",
		padding: "3px 9px",
		width: "max-content",
		maxWidth: `400px`,
		boxSizing: "border-box",
		whiteSpace: "pre-line"
	},
	".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
	".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
	".cm-completionInfo.cm-completionInfo-left-narrow": { right: `30px` },
	".cm-completionInfo.cm-completionInfo-right-narrow": { left: `30px` },
	"&light .cm-snippetField": { backgroundColor: "#00000022" },
	"&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
	".cm-snippetFieldPosition": {
		verticalAlign: "text-top",
		width: 0,
		height: "1.15em",
		display: "inline-block",
		margin: "0 -0.7px -.7em",
		borderLeft: "1.4px dotted #888"
	},
	".cm-completionMatchedText": { textDecoration: "underline" },
	".cm-completionDetail": {
		marginLeft: "0.5em",
		fontStyle: "italic"
	},
	".cm-completionIcon": {
		fontSize: "90%",
		width: ".8em",
		display: "inline-block",
		textAlign: "center",
		paddingRight: ".6em",
		opacity: "0.6",
		boxSizing: "content-box"
	},
	".cm-completionIcon-function, .cm-completionIcon-method": { "&:after": { content: "'ƒ'" } },
	".cm-completionIcon-class": { "&:after": { content: "'○'" } },
	".cm-completionIcon-interface": { "&:after": { content: "'◌'" } },
	".cm-completionIcon-variable": { "&:after": { content: "'𝑥'" } },
	".cm-completionIcon-constant": { "&:after": { content: "'𝐶'" } },
	".cm-completionIcon-type": { "&:after": { content: "'𝑡'" } },
	".cm-completionIcon-enum": { "&:after": { content: "'∪'" } },
	".cm-completionIcon-property": { "&:after": { content: "'□'" } },
	".cm-completionIcon-keyword": { "&:after": { content: "'🔑︎'" } },
	".cm-completionIcon-namespace": { "&:after": { content: "'▢'" } },
	".cm-completionIcon-text": { "&:after": {
		content: "'abc'",
		fontSize: "50%",
		verticalAlign: "middle"
	} }
});
var FieldPos = class {
	constructor(field, line, from, to) {
		this.field = field;
		this.line = line;
		this.from = from;
		this.to = to;
	}
};
var FieldRange = class FieldRange {
	constructor(field, from, to) {
		this.field = field;
		this.from = from;
		this.to = to;
	}
	map(changes) {
		let from = changes.mapPos(this.from, -1, MapMode.TrackDel);
		let to = changes.mapPos(this.to, 1, MapMode.TrackDel);
		return from == null || to == null ? null : new FieldRange(this.field, from, to);
	}
};
var Snippet = class Snippet {
	constructor(lines, fieldPositions) {
		this.lines = lines;
		this.fieldPositions = fieldPositions;
	}
	instantiate(state, pos) {
		let text = [], lineStart = [pos];
		let lineObj = state.doc.lineAt(pos), baseIndent = /^\s*/.exec(lineObj.text)[0];
		for (let line of this.lines) {
			if (text.length) {
				let indent = baseIndent, tabs = /^\t*/.exec(line)[0].length;
				for (let i = 0; i < tabs; i++) indent += state.facet(indentUnit);
				lineStart.push(pos + indent.length - tabs);
				line = indent + line.slice(tabs);
			}
			text.push(line);
			pos += line.length + 1;
		}
		return {
			text,
			ranges: this.fieldPositions.map((pos) => new FieldRange(pos.field, lineStart[pos.line] + pos.from, lineStart[pos.line] + pos.to))
		};
	}
	static parse(template) {
		let fields = [];
		let lines = [], positions = [], m;
		for (let line of template.split(/\r\n?|\n/)) {
			while (m = /[#$]\{(?:(\d+)(?::([^{}]*))?|((?:\\[{}]|[^{}])*))\}/.exec(line)) {
				let seq = m[1] ? +m[1] : null, rawName = m[2] || m[3] || "", found = -1;
				if (seq === 0) seq = 1e9;
				let name = rawName.replace(/\\[{}]/g, (m) => m[1]);
				for (let i = 0; i < fields.length; i++) if (seq != null ? fields[i].seq == seq : name ? fields[i].name == name : false) found = i;
				if (found < 0) {
					let i = 0;
					while (i < fields.length && (seq == null || fields[i].seq != null && fields[i].seq < seq)) i++;
					fields.splice(i, 0, {
						seq,
						name
					});
					found = i;
					for (let pos of positions) if (pos.field >= found) pos.field++;
				}
				for (let pos of positions) if (pos.line == lines.length && pos.from > m.index) {
					let snip = m[2] ? 3 + (m[1] || "").length : 2;
					pos.from -= snip;
					pos.to -= snip;
				}
				positions.push(new FieldPos(found, lines.length, m.index, m.index + name.length));
				line = line.slice(0, m.index) + rawName + line.slice(m.index + m[0].length);
			}
			line = line.replace(/\\([{}])/g, (_, brace, index) => {
				for (let pos of positions) if (pos.line == lines.length && pos.from > index) {
					pos.from--;
					pos.to--;
				}
				return brace;
			});
			lines.push(line);
		}
		return new Snippet(lines, positions);
	}
};
var fieldMarker = Decoration.widget({ widget: new class extends WidgetType {
	toDOM() {
		let span = document.createElement("span");
		span.className = "cm-snippetFieldPosition";
		return span;
	}
	ignoreEvent() {
		return false;
	}
}() });
var fieldRange = Decoration.mark({ class: "cm-snippetField" });
var ActiveSnippet = class ActiveSnippet {
	constructor(ranges, active) {
		this.ranges = ranges;
		this.active = active;
		this.deco = Decoration.set(ranges.map((r) => (r.from == r.to ? fieldMarker : fieldRange).range(r.from, r.to)), true);
	}
	map(changes) {
		let ranges = [];
		for (let r of this.ranges) {
			let mapped = r.map(changes);
			if (!mapped) return null;
			ranges.push(mapped);
		}
		return new ActiveSnippet(ranges, this.active);
	}
	selectionInsideField(sel) {
		return sel.ranges.every((range) => this.ranges.some((r) => r.field == this.active && r.from <= range.from && r.to >= range.to));
	}
};
var setActive = StateEffect.define({ map(value, changes) {
	return value && value.map(changes);
} });
var moveToField = StateEffect.define();
var snippetState = StateField.define({
	create() {
		return null;
	},
	update(value, tr) {
		for (let effect of tr.effects) {
			if (effect.is(setActive)) return effect.value;
			if (effect.is(moveToField) && value) return new ActiveSnippet(value.ranges, effect.value);
		}
		if (value && tr.docChanged) value = value.map(tr.changes);
		if (value && tr.selection && !value.selectionInsideField(tr.selection)) value = null;
		return value;
	},
	provide: (f) => EditorView.decorations.from(f, (val) => val ? val.deco : Decoration.none)
});
function fieldSelection(ranges, field) {
	return EditorSelection.create(ranges.filter((r) => r.field == field).map((r) => EditorSelection.range(r.from, r.to)));
}
function snippet(template) {
	let snippet = Snippet.parse(template);
	return (editor, completion, from, to) => {
		let { text, ranges } = snippet.instantiate(editor.state, from);
		let { main } = editor.state.selection;
		let spec = {
			changes: {
				from,
				to: to == main.from ? main.to : to,
				insert: Text.of(text)
			},
			scrollIntoView: true,
			annotations: completion ? [pickedCompletion.of(completion), Transaction.userEvent.of("input.complete")] : void 0
		};
		if (ranges.length) spec.selection = fieldSelection(ranges, 0);
		if (ranges.some((r) => r.field > 0)) {
			let active = new ActiveSnippet(ranges, 0);
			let effects = spec.effects = [setActive.of(active)];
			if (editor.state.field(snippetState, false) === void 0) effects.push(StateEffect.appendConfig.of([
				snippetState,
				addSnippetKeymap,
				snippetPointerHandler,
				baseTheme$1
			]));
		}
		editor.dispatch(editor.state.update(spec));
	};
}
function moveField(dir) {
	return ({ state, dispatch }) => {
		let active = state.field(snippetState, false);
		if (!active || dir < 0 && active.active == 0) return false;
		let next = active.active + dir, last = dir > 0 && !active.ranges.some((r) => r.field == next + dir);
		dispatch(state.update({
			selection: fieldSelection(active.ranges, next),
			effects: setActive.of(last ? null : new ActiveSnippet(active.ranges, next)),
			scrollIntoView: true
		}));
		return true;
	};
}
var clearSnippet = ({ state, dispatch }) => {
	if (!state.field(snippetState, false)) return false;
	dispatch(state.update({ effects: setActive.of(null) }));
	return true;
};
var defaultSnippetKeymap = [{
	key: "Tab",
	run: moveField(1),
	shift: moveField(-1)
}, {
	key: "Escape",
	run: clearSnippet
}];
var snippetKeymap = Facet.define({ combine(maps) {
	return maps.length ? maps[0] : defaultSnippetKeymap;
} });
var addSnippetKeymap = Prec.highest(keymap.compute([snippetKeymap], (state) => state.facet(snippetKeymap)));
function snippetCompletion$1(template, completion) {
	return {
		...completion,
		apply: snippet(template)
	};
}
var snippetPointerHandler = EditorView.domEventHandlers({ mousedown(event, view) {
	let active = view.state.field(snippetState, false), pos;
	if (!active || (pos = view.posAtCoords({
		x: event.clientX,
		y: event.clientY
	})) == null) return false;
	let match = active.ranges.find((r) => r.from <= pos && r.to >= pos);
	if (!match || match.field == active.active) return false;
	view.dispatch({
		selection: fieldSelection(active.ranges, match.field),
		effects: setActive.of(active.ranges.some((r) => r.field > match.field) ? new ActiveSnippet(active.ranges, match.field) : null),
		scrollIntoView: true
	});
	return true;
} });
var defaults = {
	brackets: [
		"(",
		"[",
		"{",
		"'",
		"\""
	],
	before: ")]}:;>",
	stringPrefixes: []
};
var closeBracketEffect = StateEffect.define({ map(value, mapping) {
	let mapped = mapping.mapPos(value, -1, MapMode.TrackAfter);
	return mapped == null ? void 0 : mapped;
} });
var closedBracket = new class extends RangeValue {}();
closedBracket.startSide = 1;
closedBracket.endSide = -1;
var bracketState = StateField.define({
	create() {
		return RangeSet.empty;
	},
	update(value, tr) {
		value = value.map(tr.changes);
		if (tr.selection) {
			let line = tr.state.doc.lineAt(tr.selection.main.head);
			value = value.update({ filter: (from) => from >= line.from && from <= line.to });
		}
		for (let effect of tr.effects) if (effect.is(closeBracketEffect)) value = value.update({ add: [closedBracket.range(effect.value, effect.value + 1)] });
		return value;
	}
});
function closeBrackets() {
	return [inputHandler, bracketState];
}
var definedClosing = "()[]{}<>«»»«［］｛｝";
function closing(ch) {
	for (let i = 0; i < 16; i += 2) if (definedClosing.charCodeAt(i) == ch) return definedClosing.charAt(i + 1);
	return fromCodePoint(ch < 128 ? ch : ch + 1);
}
function config(state, pos) {
	return state.languageDataAt("closeBrackets", pos)[0] || defaults;
}
var android = typeof navigator == "object" && /Android\b/.test(navigator.userAgent);
var inputHandler = EditorView.inputHandler.of((view, from, to, insert) => {
	if ((android ? view.composing : view.compositionStarted) || view.state.readOnly) return false;
	let sel = view.state.selection.main;
	if (insert.length > 2 || insert.length == 2 && codePointSize(codePointAt(insert, 0)) == 1 || from != sel.from || to != sel.to) return false;
	let tr = insertBracket(view.state, insert);
	if (!tr) return false;
	view.dispatch(tr);
	return true;
});
var deleteBracketPair = ({ state, dispatch }) => {
	if (state.readOnly) return false;
	let tokens = config(state, state.selection.main.head).brackets || defaults.brackets;
	let dont = null, changes = state.changeByRange((range) => {
		if (range.empty) {
			let before = prevChar(state.doc, range.head);
			for (let token of tokens) if (token == before && nextChar(state.doc, range.head) == closing(codePointAt(token, 0))) return {
				changes: {
					from: range.head - token.length,
					to: range.head + token.length
				},
				range: EditorSelection.cursor(range.head - token.length)
			};
		}
		return { range: dont = range };
	});
	if (!dont) dispatch(state.update(changes, {
		scrollIntoView: true,
		userEvent: "delete.backward"
	}));
	return !dont;
};
var closeBracketsKeymap = [{
	key: "Backspace",
	run: deleteBracketPair
}];
function insertBracket(state, bracket) {
	let conf = config(state, state.selection.main.head);
	let tokens = conf.brackets || defaults.brackets;
	for (let tok of tokens) {
		let closed = closing(codePointAt(tok, 0));
		if (bracket == tok) return closed == tok ? handleSame(state, tok, tokens.indexOf(tok + tok + tok) > -1, conf) : handleOpen(state, tok, closed, conf.before || defaults.before);
		if (bracket == closed && closedBracketAt(state, state.selection.main.from)) return handleClose(state, tok, closed);
	}
	return null;
}
function closedBracketAt(state, pos) {
	let found = false;
	state.field(bracketState).between(0, state.doc.length, (from) => {
		if (from == pos) found = true;
	});
	return found;
}
function nextChar(doc, pos) {
	let next = doc.sliceString(pos, pos + 2);
	return next.slice(0, codePointSize(codePointAt(next, 0)));
}
function prevChar(doc, pos) {
	let prev = doc.sliceString(pos - 2, pos);
	return codePointSize(codePointAt(prev, 0)) == prev.length ? prev : prev.slice(1);
}
function handleOpen(state, open, close, closeBefore) {
	let dont = null, changes = state.changeByRange((range) => {
		if (!range.empty) return {
			changes: [{
				insert: open,
				from: range.from
			}, {
				insert: close,
				from: range.to
			}],
			effects: closeBracketEffect.of(range.to + open.length),
			range: EditorSelection.range(range.anchor + open.length, range.head + open.length)
		};
		let next = nextChar(state.doc, range.head);
		if (!next || /\s/.test(next) || closeBefore.indexOf(next) > -1) return {
			changes: {
				insert: open + close,
				from: range.head
			},
			effects: closeBracketEffect.of(range.head + open.length),
			range: EditorSelection.cursor(range.head + open.length)
		};
		return { range: dont = range };
	});
	return dont ? null : state.update(changes, {
		scrollIntoView: true,
		userEvent: "input.type"
	});
}
function handleClose(state, _open, close) {
	let dont = null, changes = state.changeByRange((range) => {
		if (range.empty && nextChar(state.doc, range.head) == close) return {
			changes: {
				from: range.head,
				to: range.head + close.length,
				insert: close
			},
			range: EditorSelection.cursor(range.head + close.length)
		};
		return dont = { range };
	});
	return dont ? null : state.update(changes, {
		scrollIntoView: true,
		userEvent: "input.type"
	});
}
function handleSame(state, token, allowTriple, config) {
	let stringPrefixes = config.stringPrefixes || defaults.stringPrefixes;
	let dont = null, changes = state.changeByRange((range) => {
		if (!range.empty) return {
			changes: [{
				insert: token,
				from: range.from
			}, {
				insert: token,
				from: range.to
			}],
			effects: closeBracketEffect.of(range.to + token.length),
			range: EditorSelection.range(range.anchor + token.length, range.head + token.length)
		};
		let pos = range.head, next = nextChar(state.doc, pos), start;
		if (next == token) {
			if (nodeStart(state, pos)) return {
				changes: {
					insert: token + token,
					from: pos
				},
				effects: closeBracketEffect.of(pos + token.length),
				range: EditorSelection.cursor(pos + token.length)
			};
			else if (closedBracketAt(state, pos)) {
				let content = allowTriple && state.sliceDoc(pos, pos + token.length * 3) == token + token + token ? token + token + token : token;
				return {
					changes: {
						from: pos,
						to: pos + content.length,
						insert: content
					},
					range: EditorSelection.cursor(pos + content.length)
				};
			}
		} else if (allowTriple && state.sliceDoc(pos - 2 * token.length, pos) == token + token && (start = canStartStringAt(state, pos - 2 * token.length, stringPrefixes)) > -1 && nodeStart(state, start)) return {
			changes: {
				insert: token + token + token + token,
				from: pos
			},
			effects: closeBracketEffect.of(pos + token.length),
			range: EditorSelection.cursor(pos + token.length)
		};
		else if (state.charCategorizer(pos)(next) != CharCategory.Word) {
			if (canStartStringAt(state, pos, stringPrefixes) > -1 && !probablyInString(state, pos, token, stringPrefixes)) return {
				changes: {
					insert: token + token,
					from: pos
				},
				effects: closeBracketEffect.of(pos + token.length),
				range: EditorSelection.cursor(pos + token.length)
			};
		}
		return { range: dont = range };
	});
	return dont ? null : state.update(changes, {
		scrollIntoView: true,
		userEvent: "input.type"
	});
}
function nodeStart(state, pos) {
	let tree = syntaxTree(state).resolveInner(pos + 1);
	return tree.parent && tree.from == pos;
}
function probablyInString(state, pos, quoteToken, prefixes) {
	let node = syntaxTree(state).resolveInner(pos, -1);
	let maxPrefix = prefixes.reduce((m, p) => Math.max(m, p.length), 0);
	for (let i = 0; i < 5; i++) {
		let start = state.sliceDoc(node.from, Math.min(node.to, node.from + quoteToken.length + maxPrefix));
		let quotePos = start.indexOf(quoteToken);
		if (!quotePos || quotePos > -1 && prefixes.indexOf(start.slice(0, quotePos)) > -1) {
			let first = node.firstChild;
			while (first && first.from == node.from && first.to - first.from > quoteToken.length + quotePos) {
				if (state.sliceDoc(first.to - quoteToken.length, first.to) == quoteToken) return false;
				first = first.firstChild;
			}
			return true;
		}
		let parent = node.to == pos && node.parent;
		if (!parent) break;
		node = parent;
	}
	return false;
}
function canStartStringAt(state, pos, prefixes) {
	let charCat = state.charCategorizer(pos);
	if (charCat(state.sliceDoc(pos - 1, pos)) != CharCategory.Word) return pos;
	for (let prefix of prefixes) {
		let start = pos - prefix.length;
		if (state.sliceDoc(start, pos) == prefix && charCat(state.sliceDoc(start - 1, start)) != CharCategory.Word) return start;
	}
	return -1;
}
function autocompletion(config = {}) {
	return [
		commitCharacters,
		completionState,
		completionConfig.of(config),
		completionPlugin,
		completionKeymapExt,
		baseTheme$1
	];
}
var completionKeymap = [
	{
		key: "Ctrl-Space",
		run: startCompletion
	},
	{
		mac: "Alt-`",
		run: startCompletion
	},
	{
		mac: "Alt-i",
		run: startCompletion
	},
	{
		key: "Escape",
		run: closeCompletion
	},
	{
		key: "ArrowDown",
		run: moveCompletionSelection(true)
	},
	{
		key: "ArrowUp",
		run: moveCompletionSelection(false)
	},
	{
		key: "PageDown",
		run: moveCompletionSelection(true, "page")
	},
	{
		key: "PageUp",
		run: moveCompletionSelection(false, "page")
	},
	{
		key: "Enter",
		run: acceptCompletion
	}
];
var completionKeymapExt = Prec.highest(keymap.computeN([completionConfig], (state) => state.facet(completionConfig).defaultKeymap ? [completionKeymap] : []));
// ../../node_modules/@codemirror/commands/dist/index.js
init_dist$1();
var toggleComment = (target) => {
	let { state } = target, line = state.doc.lineAt(state.selection.main.from), config = getConfig(target.state, line.from);
	return config.line ? toggleLineComment(target) : config.block ? toggleBlockCommentByLine(target) : false;
};
function command(f, option) {
	return ({ state, dispatch }) => {
		if (state.readOnly) return false;
		let tr = f(option, state);
		if (!tr) return false;
		dispatch(state.update(tr));
		return true;
	};
}
var toggleLineComment = command(changeLineComment, 0);
var toggleBlockComment = command(changeBlockComment, 0);
var toggleBlockCommentByLine = command((o, s) => changeBlockComment(o, s, selectedLineRanges(s)), 0);
function getConfig(state, pos) {
	let data = state.languageDataAt("commentTokens", pos, 1);
	return data.length ? data[0] : {};
}
var SearchMargin = 50;
function findBlockComment(state, { open, close }, from, to) {
	let textBefore = state.sliceDoc(from - SearchMargin, from);
	let textAfter = state.sliceDoc(to, to + SearchMargin);
	let spaceBefore = /\s*$/.exec(textBefore)[0].length, spaceAfter = /^\s*/.exec(textAfter)[0].length;
	let beforeOff = textBefore.length - spaceBefore;
	if (textBefore.slice(beforeOff - open.length, beforeOff) == open && textAfter.slice(spaceAfter, spaceAfter + close.length) == close) return {
		open: {
			pos: from - spaceBefore,
			margin: spaceBefore && 1
		},
		close: {
			pos: to + spaceAfter,
			margin: spaceAfter && 1
		}
	};
	let startText, endText;
	if (to - from <= 100) startText = endText = state.sliceDoc(from, to);
	else {
		startText = state.sliceDoc(from, from + SearchMargin);
		endText = state.sliceDoc(to - SearchMargin, to);
	}
	let startSpace = /^\s*/.exec(startText)[0].length, endSpace = /\s*$/.exec(endText)[0].length;
	let endOff = endText.length - endSpace - close.length;
	if (startText.slice(startSpace, startSpace + open.length) == open && endText.slice(endOff, endOff + close.length) == close) return {
		open: {
			pos: from + startSpace + open.length,
			margin: /\s/.test(startText.charAt(startSpace + open.length)) ? 1 : 0
		},
		close: {
			pos: to - endSpace - close.length,
			margin: /\s/.test(endText.charAt(endOff - 1)) ? 1 : 0
		}
	};
	return null;
}
function selectedLineRanges(state) {
	let ranges = [];
	for (let r of state.selection.ranges) {
		let fromLine = state.doc.lineAt(r.from);
		let toLine = r.to <= fromLine.to ? fromLine : state.doc.lineAt(r.to);
		if (toLine.from > fromLine.from && toLine.from == r.to) toLine = r.to == fromLine.to + 1 ? fromLine : state.doc.lineAt(r.to - 1);
		let last = ranges.length - 1;
		if (last >= 0 && ranges[last].to > fromLine.from) ranges[last].to = toLine.to;
		else ranges.push({
			from: fromLine.from + /^\s*/.exec(fromLine.text)[0].length,
			to: toLine.to
		});
	}
	return ranges;
}
function changeBlockComment(option, state, ranges = state.selection.ranges) {
	let tokens = ranges.map((r) => getConfig(state, r.from).block);
	if (!tokens.every((c) => c)) return null;
	let comments = ranges.map((r, i) => findBlockComment(state, tokens[i], r.from, r.to));
	if (option != 2 && !comments.every((c) => c)) return { changes: state.changes(ranges.map((range, i) => {
		if (comments[i]) return [];
		return [{
			from: range.from,
			insert: tokens[i].open + " "
		}, {
			from: range.to,
			insert: " " + tokens[i].close
		}];
	})) };
	else if (option != 1 && comments.some((c) => c)) {
		let changes = [];
		for (let i = 0, comment; i < comments.length; i++) if (comment = comments[i]) {
			let token = tokens[i], { open, close } = comment;
			changes.push({
				from: open.pos - token.open.length,
				to: open.pos + open.margin
			}, {
				from: close.pos - close.margin,
				to: close.pos + token.close.length
			});
		}
		return { changes };
	}
	return null;
}
function changeLineComment(option, state, ranges = state.selection.ranges) {
	let lines = [];
	let prevLine = -1;
	ranges: for (let { from, to } of ranges) {
		let startI = lines.length, minIndent = 1e9, token;
		for (let pos = from; pos <= to;) {
			let line = state.doc.lineAt(pos);
			if (token == void 0) {
				token = getConfig(state, line.from).line;
				if (!token) continue ranges;
			}
			if (line.from > prevLine && (from == to || to > line.from)) {
				prevLine = line.from;
				let indent = /^\s*/.exec(line.text)[0].length;
				let empty = indent == line.length;
				let comment = line.text.slice(indent, indent + token.length) == token ? indent : -1;
				if (indent < line.text.length && indent < minIndent) minIndent = indent;
				lines.push({
					line,
					comment,
					token,
					indent,
					empty,
					single: false
				});
			}
			pos = line.to + 1;
		}
		if (minIndent < 1e9) {
			for (let i = startI; i < lines.length; i++) if (lines[i].indent < lines[i].line.text.length) lines[i].indent = minIndent;
		}
		if (lines.length == startI + 1) lines[startI].single = true;
	}
	if (option != 2 && lines.some((l) => l.comment < 0 && (!l.empty || l.single))) {
		let changes = [];
		for (let { line, token, indent, empty, single } of lines) if (single || !empty) changes.push({
			from: line.from + indent,
			insert: token + " "
		});
		let changeSet = state.changes(changes);
		return {
			changes: changeSet,
			selection: state.selection.map(changeSet, 1)
		};
	} else if (option != 1 && lines.some((l) => l.comment >= 0)) {
		let changes = [];
		for (let { line, comment, token } of lines) if (comment >= 0) {
			let from = line.from + comment, to = from + token.length;
			if (line.text[to - line.from] == " ") to++;
			changes.push({
				from,
				to
			});
		}
		return { changes };
	}
	return null;
}
var fromHistory = Annotation.define();
var isolateHistory = Annotation.define();
var invertedEffects = Facet.define();
var historyConfig = Facet.define({ combine(configs) {
	return combineConfig(configs, {
		minDepth: 100,
		newGroupDelay: 500,
		joinToEvent: (_t, isAdjacent) => isAdjacent
	}, {
		minDepth: Math.max,
		newGroupDelay: Math.min,
		joinToEvent: (a, b) => (tr, adj) => a(tr, adj) || b(tr, adj)
	});
} });
var historyField_ = StateField.define({
	create() {
		return HistoryState.empty;
	},
	update(state, tr) {
		let config = tr.state.facet(historyConfig);
		let fromHist = tr.annotation(fromHistory);
		if (fromHist) {
			let item = HistEvent.fromTransaction(tr, fromHist.selection), from = fromHist.side;
			let other = from == 0 ? state.undone : state.done;
			if (item) other = updateBranch(other, other.length, config.minDepth, item);
			else other = addSelection(other, tr.startState.selection);
			return new HistoryState(from == 0 ? fromHist.rest : other, from == 0 ? other : fromHist.rest);
		}
		let isolate = tr.annotation(isolateHistory);
		if (isolate == "full" || isolate == "before") state = state.isolate();
		if (tr.annotation(Transaction.addToHistory) === false) return !tr.changes.empty ? state.addMapping(tr.changes.desc) : state;
		let event = HistEvent.fromTransaction(tr);
		let time = tr.annotation(Transaction.time), userEvent = tr.annotation(Transaction.userEvent);
		if (event) state = state.addChanges(event, time, userEvent, config, tr);
		else if (tr.selection) state = state.addSelection(tr.startState.selection, time, userEvent, config.newGroupDelay);
		if (isolate == "full" || isolate == "after") state = state.isolate();
		return state;
	},
	toJSON(value) {
		return {
			done: value.done.map((e) => e.toJSON()),
			undone: value.undone.map((e) => e.toJSON())
		};
	},
	fromJSON(json) {
		return new HistoryState(json.done.map(HistEvent.fromJSON), json.undone.map(HistEvent.fromJSON));
	}
});
function history(config = {}) {
	return [
		historyField_,
		historyConfig.of(config),
		EditorView.domEventHandlers({ beforeinput(e, view) {
			let command = e.inputType == "historyUndo" ? undo : e.inputType == "historyRedo" ? redo : null;
			if (!command) return false;
			e.preventDefault();
			return command(view);
		} })
	];
}
function cmd(side, selection) {
	return function({ state, dispatch }) {
		if (!selection && state.readOnly) return false;
		let historyState = state.field(historyField_, false);
		if (!historyState) return false;
		let tr = historyState.pop(side, state, selection);
		if (!tr) return false;
		dispatch(tr);
		return true;
	};
}
var undo = cmd(0, false);
var redo = cmd(1, false);
var undoSelection = cmd(0, true);
var redoSelection = cmd(1, true);
var HistEvent = class HistEvent {
	constructor(changes, effects, mapped, startSelection, selectionsAfter) {
		this.changes = changes;
		this.effects = effects;
		this.mapped = mapped;
		this.startSelection = startSelection;
		this.selectionsAfter = selectionsAfter;
	}
	setSelAfter(after) {
		return new HistEvent(this.changes, this.effects, this.mapped, this.startSelection, after);
	}
	toJSON() {
		var _a, _b, _c;
		return {
			changes: (_a = this.changes) === null || _a === void 0 ? void 0 : _a.toJSON(),
			mapped: (_b = this.mapped) === null || _b === void 0 ? void 0 : _b.toJSON(),
			startSelection: (_c = this.startSelection) === null || _c === void 0 ? void 0 : _c.toJSON(),
			selectionsAfter: this.selectionsAfter.map((s) => s.toJSON())
		};
	}
	static fromJSON(json) {
		return new HistEvent(json.changes && ChangeSet.fromJSON(json.changes), [], json.mapped && ChangeDesc.fromJSON(json.mapped), json.startSelection && EditorSelection.fromJSON(json.startSelection), json.selectionsAfter.map(EditorSelection.fromJSON));
	}
	static fromTransaction(tr, selection) {
		let effects = none$1;
		for (let invert of tr.startState.facet(invertedEffects)) {
			let result = invert(tr);
			if (result.length) effects = effects.concat(result);
		}
		if (!effects.length && tr.changes.empty) return null;
		return new HistEvent(tr.changes.invert(tr.startState.doc), effects, void 0, selection || tr.startState.selection, none$1);
	}
	static selection(selections) {
		return new HistEvent(void 0, none$1, void 0, void 0, selections);
	}
};
function updateBranch(branch, to, maxLen, newEvent) {
	let start = to + 1 > maxLen + 20 ? to - maxLen - 1 : 0;
	let newBranch = branch.slice(start, to);
	newBranch.push(newEvent);
	return newBranch;
}
function isAdjacent(a, b) {
	let ranges = [], isAdjacent = false;
	a.iterChangedRanges((f, t) => ranges.push(f, t));
	b.iterChangedRanges((_f, _t, f, t) => {
		for (let i = 0; i < ranges.length;) {
			let from = ranges[i++], to = ranges[i++];
			if (t >= from && f <= to) isAdjacent = true;
		}
	});
	return isAdjacent;
}
function eqSelectionShape(a, b) {
	return a.ranges.length == b.ranges.length && a.ranges.filter((r, i) => r.empty != b.ranges[i].empty).length === 0;
}
function conc(a, b) {
	return !a.length ? b : !b.length ? a : a.concat(b);
}
var none$1 = [];
var MaxSelectionsPerEvent = 200;
function addSelection(branch, selection) {
	if (!branch.length) return [HistEvent.selection([selection])];
	else {
		let lastEvent = branch[branch.length - 1];
		let sels = lastEvent.selectionsAfter.slice(Math.max(0, lastEvent.selectionsAfter.length - MaxSelectionsPerEvent));
		if (sels.length && sels[sels.length - 1].eq(selection)) return branch;
		sels.push(selection);
		return updateBranch(branch, branch.length - 1, 1e9, lastEvent.setSelAfter(sels));
	}
}
function popSelection(branch) {
	let last = branch[branch.length - 1];
	let newBranch = branch.slice();
	newBranch[branch.length - 1] = last.setSelAfter(last.selectionsAfter.slice(0, last.selectionsAfter.length - 1));
	return newBranch;
}
function addMappingToBranch(branch, mapping) {
	if (!branch.length) return branch;
	let length = branch.length, selections = none$1;
	while (length) {
		let event = mapEvent(branch[length - 1], mapping, selections);
		if (event.changes && !event.changes.empty || event.effects.length) {
			let result = branch.slice(0, length);
			result[length - 1] = event;
			return result;
		} else {
			mapping = event.mapped;
			length--;
			selections = event.selectionsAfter;
		}
	}
	return selections.length ? [HistEvent.selection(selections)] : none$1;
}
function mapEvent(event, mapping, extraSelections) {
	let selections = conc(event.selectionsAfter.length ? event.selectionsAfter.map((s) => s.map(mapping)) : none$1, extraSelections);
	if (!event.changes) return HistEvent.selection(selections);
	let mappedChanges = event.changes.map(mapping), before = mapping.mapDesc(event.changes, true);
	let fullMapping = event.mapped ? event.mapped.composeDesc(before) : before;
	return new HistEvent(mappedChanges, StateEffect.mapEffects(event.effects, mapping), fullMapping, event.startSelection.map(before), selections);
}
var joinableUserEvent = /^(input\.type|delete)($|\.)/;
var HistoryState = class HistoryState {
	constructor(done, undone, prevTime = 0, prevUserEvent = void 0) {
		this.done = done;
		this.undone = undone;
		this.prevTime = prevTime;
		this.prevUserEvent = prevUserEvent;
	}
	isolate() {
		return this.prevTime ? new HistoryState(this.done, this.undone) : this;
	}
	addChanges(event, time, userEvent, config, tr) {
		let done = this.done, lastEvent = done[done.length - 1];
		if (lastEvent && lastEvent.changes && !lastEvent.changes.empty && event.changes && (!userEvent || joinableUserEvent.test(userEvent)) && (!lastEvent.selectionsAfter.length && time - this.prevTime < config.newGroupDelay && config.joinToEvent(tr, isAdjacent(lastEvent.changes, event.changes)) || userEvent == "input.type.compose")) done = updateBranch(done, done.length - 1, config.minDepth, new HistEvent(event.changes.compose(lastEvent.changes), conc(StateEffect.mapEffects(event.effects, lastEvent.changes), lastEvent.effects), lastEvent.mapped, lastEvent.startSelection, none$1));
		else done = updateBranch(done, done.length, config.minDepth, event);
		return new HistoryState(done, none$1, time, userEvent);
	}
	addSelection(selection, time, userEvent, newGroupDelay) {
		let last = this.done.length ? this.done[this.done.length - 1].selectionsAfter : none$1;
		if (last.length > 0 && time - this.prevTime < newGroupDelay && userEvent == this.prevUserEvent && userEvent && /^select($|\.)/.test(userEvent) && eqSelectionShape(last[last.length - 1], selection)) return this;
		return new HistoryState(addSelection(this.done, selection), this.undone, time, userEvent);
	}
	addMapping(mapping) {
		return new HistoryState(addMappingToBranch(this.done, mapping), addMappingToBranch(this.undone, mapping), this.prevTime, this.prevUserEvent);
	}
	pop(side, state, onlySelection) {
		let branch = side == 0 ? this.done : this.undone;
		if (branch.length == 0) return null;
		let event = branch[branch.length - 1], selection = event.selectionsAfter[0] || (event.startSelection ? event.startSelection.map(event.changes.invertedDesc, 1) : state.selection);
		if (onlySelection && event.selectionsAfter.length) return state.update({
			selection: event.selectionsAfter[event.selectionsAfter.length - 1],
			annotations: fromHistory.of({
				side,
				rest: popSelection(branch),
				selection
			}),
			userEvent: side == 0 ? "select.undo" : "select.redo",
			scrollIntoView: true
		});
		else if (!event.changes) return null;
		else {
			let rest = branch.length == 1 ? none$1 : branch.slice(0, branch.length - 1);
			if (event.mapped) rest = addMappingToBranch(rest, event.mapped);
			return state.update({
				changes: event.changes,
				selection: event.startSelection,
				effects: event.effects,
				annotations: fromHistory.of({
					side,
					rest,
					selection
				}),
				filter: false,
				userEvent: side == 0 ? "undo" : "redo",
				scrollIntoView: true
			});
		}
	}
};
HistoryState.empty = new HistoryState(none$1, none$1);
var historyKeymap = [
	{
		key: "Mod-z",
		run: undo,
		preventDefault: true
	},
	{
		key: "Mod-y",
		mac: "Mod-Shift-z",
		run: redo,
		preventDefault: true
	},
	{
		linux: "Ctrl-Shift-z",
		run: redo,
		preventDefault: true
	},
	{
		key: "Mod-u",
		run: undoSelection,
		preventDefault: true
	},
	{
		key: "Alt-u",
		mac: "Mod-Shift-u",
		run: redoSelection,
		preventDefault: true
	}
];
function updateSel(sel, by) {
	return EditorSelection.create(sel.ranges.map(by), sel.mainIndex);
}
function setSel(state, selection) {
	return state.update({
		selection,
		scrollIntoView: true,
		userEvent: "select"
	});
}
function moveSel({ state, dispatch }, how) {
	let selection = updateSel(state.selection, how);
	if (selection.eq(state.selection, true)) return false;
	dispatch(setSel(state, selection));
	return true;
}
function rangeEnd(range, forward) {
	return EditorSelection.cursor(forward ? range.to : range.from);
}
function cursorByChar(view, forward) {
	return moveSel(view, (range) => range.empty ? view.moveByChar(range, forward) : rangeEnd(range, forward));
}
function ltrAtCursor(view) {
	return view.textDirectionAt(view.state.selection.main.head) == Direction.LTR;
}
var cursorCharLeft = (view) => cursorByChar(view, !ltrAtCursor(view));
var cursorCharRight = (view) => cursorByChar(view, ltrAtCursor(view));
function cursorByGroup(view, forward) {
	return moveSel(view, (range) => range.empty ? view.moveByGroup(range, forward) : rangeEnd(range, forward));
}
var cursorGroupLeft = (view) => cursorByGroup(view, !ltrAtCursor(view));
var cursorGroupRight = (view) => cursorByGroup(view, ltrAtCursor(view));
typeof Intl != "undefined" && Intl.Segmenter;
function interestingNode(state, node, bracketProp) {
	if (node.type.prop(bracketProp)) return true;
	let len = node.to - node.from;
	return len && (len > 2 || /[^\s,.;:]/.test(state.sliceDoc(node.from, node.to))) || node.firstChild;
}
function moveBySyntax(state, start, forward) {
	let pos = syntaxTree(state).resolveInner(start.head);
	let bracketProp = forward ? NodeProp.closedBy : NodeProp.openedBy;
	for (let at = start.head;;) {
		let next = forward ? pos.childAfter(at) : pos.childBefore(at);
		if (!next) break;
		if (interestingNode(state, next, bracketProp)) pos = next;
		else at = forward ? next.to : next.from;
	}
	let bracket = pos.type.prop(bracketProp), match, newPos;
	if (bracket && (match = forward ? matchBrackets(state, pos.from, 1) : matchBrackets(state, pos.to, -1)) && match.matched) newPos = forward ? match.end.to : match.end.from;
	else newPos = forward ? pos.to : pos.from;
	return EditorSelection.cursor(newPos, forward ? -1 : 1);
}
var cursorSyntaxLeft = (view) => moveSel(view, (range) => moveBySyntax(view.state, range, !ltrAtCursor(view)));
var cursorSyntaxRight = (view) => moveSel(view, (range) => moveBySyntax(view.state, range, ltrAtCursor(view)));
function cursorByLine(view, forward) {
	return moveSel(view, (range) => {
		if (!range.empty) return rangeEnd(range, forward);
		let moved = view.moveVertically(range, forward);
		return moved.head != range.head ? moved : view.moveToLineBoundary(range, forward);
	});
}
var cursorLineUp = (view) => cursorByLine(view, false);
var cursorLineDown = (view) => cursorByLine(view, true);
function pageInfo(view) {
	let selfScroll = view.scrollDOM.clientHeight < view.scrollDOM.scrollHeight - 2;
	let marginTop = 0, marginBottom = 0, height;
	if (selfScroll) {
		for (let source of view.state.facet(EditorView.scrollMargins)) {
			let margins = source(view);
			if (margins === null || margins === void 0 ? void 0 : margins.top) marginTop = Math.max(margins === null || margins === void 0 ? void 0 : margins.top, marginTop);
			if (margins === null || margins === void 0 ? void 0 : margins.bottom) marginBottom = Math.max(margins === null || margins === void 0 ? void 0 : margins.bottom, marginBottom);
		}
		height = view.scrollDOM.clientHeight - marginTop - marginBottom;
	} else height = (view.dom.ownerDocument.defaultView || window).innerHeight;
	return {
		marginTop,
		marginBottom,
		selfScroll,
		height: Math.max(view.defaultLineHeight, height - 5)
	};
}
function cursorByPage(view, forward) {
	let page = pageInfo(view);
	let { state } = view, selection = updateSel(state.selection, (range) => {
		return range.empty ? view.moveVertically(range, forward, page.height) : rangeEnd(range, forward);
	});
	if (selection.eq(state.selection)) return false;
	let effect;
	if (page.selfScroll) {
		let startPos = view.coordsAtPos(state.selection.main.head);
		let scrollRect = view.scrollDOM.getBoundingClientRect();
		let scrollTop = scrollRect.top + page.marginTop, scrollBottom = scrollRect.bottom - page.marginBottom;
		if (startPos && startPos.top > scrollTop && startPos.bottom < scrollBottom) effect = EditorView.scrollIntoView(selection.main.head, {
			y: "start",
			yMargin: startPos.top - scrollTop
		});
	}
	view.dispatch(setSel(state, selection), { effects: effect });
	return true;
}
var cursorPageUp = (view) => cursorByPage(view, false);
var cursorPageDown = (view) => cursorByPage(view, true);
function moveByLineBoundary(view, start, forward) {
	let line = view.lineBlockAt(start.head), moved = view.moveToLineBoundary(start, forward);
	if (moved.head == start.head && moved.head != (forward ? line.to : line.from)) moved = view.moveToLineBoundary(start, forward, false);
	if (!forward && moved.head == line.from && line.length) {
		let space = /^\s*/.exec(view.state.sliceDoc(line.from, Math.min(line.from + 100, line.to)))[0].length;
		if (space && start.head != line.from + space) moved = EditorSelection.cursor(line.from + space);
	}
	return moved;
}
var cursorLineBoundaryForward = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, true));
var cursorLineBoundaryBackward = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, false));
var cursorLineBoundaryLeft = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, !ltrAtCursor(view)));
var cursorLineBoundaryRight = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, ltrAtCursor(view)));
var cursorLineStart = (view) => moveSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).from, 1));
var cursorLineEnd = (view) => moveSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).to, -1));
function toMatchingBracket(state, dispatch, extend) {
	let found = false, selection = updateSel(state.selection, (range) => {
		let matching = matchBrackets(state, range.head, -1) || matchBrackets(state, range.head, 1) || range.head > 0 && matchBrackets(state, range.head - 1, 1) || range.head < state.doc.length && matchBrackets(state, range.head + 1, -1);
		if (!matching || !matching.end) return range;
		found = true;
		let head = matching.start.from == range.head ? matching.end.to : matching.end.from;
		return extend ? EditorSelection.range(range.anchor, head) : EditorSelection.cursor(head);
	});
	if (!found) return false;
	dispatch(setSel(state, selection));
	return true;
}
var cursorMatchingBracket = ({ state, dispatch }) => toMatchingBracket(state, dispatch, false);
function extendSel(target, forward, how) {
	let selection = updateSel(target.state.selection, (range) => {
		if (range.undirectional && range.head >= range.anchor != forward) range = EditorSelection.range(range.head, range.anchor);
		let head = how(range);
		return EditorSelection.range(range.anchor, head.head, head.goalColumn, head.bidiLevel || void 0, head.assoc);
	});
	if (selection.eq(target.state.selection)) return false;
	target.dispatch(setSel(target.state, selection));
	return true;
}
function selectByChar(view, forward) {
	return extendSel(view, forward, (range) => view.moveByChar(range, forward));
}
var selectCharLeft = (view) => selectByChar(view, !ltrAtCursor(view));
var selectCharRight = (view) => selectByChar(view, ltrAtCursor(view));
function selectByGroup(view, forward) {
	return extendSel(view, forward, (range) => view.moveByGroup(range, forward));
}
var selectGroupLeft = (view) => selectByGroup(view, !ltrAtCursor(view));
var selectGroupRight = (view) => selectByGroup(view, ltrAtCursor(view));
var selectSyntaxLeft = (view) => {
	let forward = !ltrAtCursor(view);
	return extendSel(view, forward, (range) => moveBySyntax(view.state, range, forward));
};
var selectSyntaxRight = (view) => {
	let forward = ltrAtCursor(view);
	return extendSel(view, forward, (range) => moveBySyntax(view.state, range, forward));
};
function selectByLine(view, forward) {
	return extendSel(view, forward, (range) => view.moveVertically(range, forward));
}
var selectLineUp = (view) => selectByLine(view, false);
var selectLineDown = (view) => selectByLine(view, true);
function selectByPage(view, forward) {
	return extendSel(view, forward, (range) => view.moveVertically(range, forward, pageInfo(view).height));
}
var selectPageUp = (view) => selectByPage(view, false);
var selectPageDown = (view) => selectByPage(view, true);
var selectLineBoundaryForward = (view) => extendSel(view, true, (range) => moveByLineBoundary(view, range, true));
var selectLineBoundaryBackward = (view) => extendSel(view, false, (range) => moveByLineBoundary(view, range, false));
var selectLineBoundaryLeft = (view) => {
	let forward = !ltrAtCursor(view);
	return extendSel(view, forward, (range) => moveByLineBoundary(view, range, forward));
};
var selectLineBoundaryRight = (view) => {
	let forward = ltrAtCursor(view);
	return extendSel(view, forward, (range) => moveByLineBoundary(view, range, forward));
};
var selectLineStart = (view) => extendSel(view, false, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).from));
var selectLineEnd = (view) => extendSel(view, true, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).to));
var cursorDocStart = ({ state, dispatch }) => {
	dispatch(setSel(state, { anchor: 0 }));
	return true;
};
var cursorDocEnd = ({ state, dispatch }) => {
	dispatch(setSel(state, { anchor: state.doc.length }));
	return true;
};
var selectDocStart = ({ state, dispatch }) => {
	dispatch(setSel(state, {
		anchor: state.selection.main.anchor,
		head: 0
	}));
	return true;
};
var selectDocEnd = ({ state, dispatch }) => {
	dispatch(setSel(state, {
		anchor: state.selection.main.anchor,
		head: state.doc.length
	}));
	return true;
};
var selectAll = ({ state, dispatch }) => {
	dispatch(state.update({
		selection: {
			anchor: 0,
			head: state.doc.length
		},
		userEvent: "select"
	}));
	return true;
};
var selectLine = ({ state, dispatch }) => {
	let ranges = selectedLineBlocks(state).map(({ from, to }) => EditorSelection.undirectionalRange(from, Math.min(to + 1, state.doc.length)));
	dispatch(state.update({
		selection: EditorSelection.create(ranges),
		userEvent: "select"
	}));
	return true;
};
var selectParentSyntax = ({ state, dispatch }) => {
	let selection = updateSel(state.selection, (range) => {
		let tree = syntaxTree(state), stack = tree.resolveStack(range.from, 1);
		if (range.empty) {
			let stackBefore = tree.resolveStack(range.from, -1);
			if (stackBefore.node.from >= stack.node.from && stackBefore.node.to <= stack.node.to) stack = stackBefore;
		}
		for (let cur = stack; cur; cur = cur.next) {
			let { node } = cur;
			if ((node.from < range.from && node.to >= range.to || node.to > range.to && node.from <= range.from) && cur.next) return EditorSelection.undirectionalRange(node.from, node.to);
		}
		return range;
	});
	if (selection.eq(state.selection)) return false;
	dispatch(setSel(state, selection));
	return true;
};
function addCursorVertically(view, forward) {
	let { state } = view, sel = state.selection, ranges = state.selection.ranges.slice();
	for (let range of state.selection.ranges) {
		let line = state.doc.lineAt(range.head);
		if (forward ? line.to < view.state.doc.length : line.from > 0) for (let cur = range;;) {
			let next = view.moveVertically(cur, forward);
			if (next.head < line.from || next.head > line.to) {
				if (!ranges.some((r) => r.head == next.head)) ranges.push(next);
				break;
			} else if (next.head == cur.head) break;
			else cur = next;
		}
	}
	if (ranges.length == sel.ranges.length) return false;
	view.dispatch(setSel(state, EditorSelection.create(ranges, ranges.length - 1)));
	return true;
}
var addCursorAbove = (view) => addCursorVertically(view, false);
var addCursorBelow = (view) => addCursorVertically(view, true);
var simplifySelection = ({ state, dispatch }) => {
	let cur = state.selection, selection = null;
	if (cur.ranges.length > 1) selection = EditorSelection.create([cur.main]);
	else if (!cur.main.empty) selection = EditorSelection.create([EditorSelection.cursor(cur.main.head)]);
	if (!selection) return false;
	dispatch(setSel(state, selection));
	return true;
};
function deleteBy(target, by) {
	if (target.state.readOnly) return false;
	let event = "delete.selection", { state } = target;
	let changes = state.changeByRange((range) => {
		let { from, to } = range;
		if (from == to) {
			let towards = by(range);
			if (towards < from) {
				event = "delete.backward";
				towards = skipAtomic(target, towards, false);
			} else if (towards > from) {
				event = "delete.forward";
				towards = skipAtomic(target, towards, true);
			}
			from = Math.min(from, towards);
			to = Math.max(to, towards);
		} else {
			from = skipAtomic(target, from, false);
			to = skipAtomic(target, to, true);
		}
		return from == to ? { range } : {
			changes: {
				from,
				to
			},
			range: EditorSelection.cursor(from, from < range.head ? -1 : 1)
		};
	});
	if (changes.changes.empty) return false;
	target.dispatch(state.update(changes, {
		scrollIntoView: true,
		userEvent: event,
		effects: event == "delete.selection" ? EditorView.announce.of(state.phrase("Selection deleted")) : void 0
	}));
	return true;
}
function skipAtomic(target, pos, forward) {
	if (target instanceof EditorView) for (let ranges of target.state.facet(EditorView.atomicRanges).map((f) => f(target))) ranges.between(pos, pos, (from, to) => {
		if (from < pos && to > pos) pos = forward ? to : from;
	});
	return pos;
}
var deleteByChar = (target, forward, byIndentUnit) => deleteBy(target, (range) => {
	let pos = range.from, { state } = target, line = state.doc.lineAt(pos), before, targetPos;
	if (byIndentUnit && !forward && pos > line.from && pos < line.from + 200 && !/[^ \t]/.test(before = line.text.slice(0, pos - line.from))) {
		if (before[before.length - 1] == "	") return pos - 1;
		let drop = countColumn(before, state.tabSize) % getIndentUnit(state) || getIndentUnit(state);
		for (let i = 0; i < drop && before[before.length - 1 - i] == " "; i++) pos--;
		targetPos = pos;
	} else {
		targetPos = findClusterBreak(line.text, pos - line.from, forward, forward) + line.from;
		if (targetPos == pos && line.number != (forward ? state.doc.lines : 1)) targetPos += forward ? 1 : -1;
		else if (!forward && /[\ufe00-\ufe0f]/.test(line.text.slice(targetPos - line.from, pos - line.from))) targetPos = findClusterBreak(line.text, targetPos - line.from, false, false) + line.from;
	}
	return targetPos;
});
var deleteCharBackward = (view) => deleteByChar(view, false, true);
var deleteCharForward = (view) => deleteByChar(view, true, false);
var deleteByGroup = (target, forward) => deleteBy(target, (range) => {
	let pos = range.head, { state } = target, line = state.doc.lineAt(pos);
	let categorize = state.charCategorizer(pos);
	for (let cat = null;;) {
		if (pos == (forward ? line.to : line.from)) {
			if (pos == range.head && line.number != (forward ? state.doc.lines : 1)) pos += forward ? 1 : -1;
			break;
		}
		let next = findClusterBreak(line.text, pos - line.from, forward) + line.from;
		let nextChar = line.text.slice(Math.min(pos, next) - line.from, Math.max(pos, next) - line.from);
		let nextCat = categorize(nextChar);
		if (cat != null && nextCat != cat) break;
		if (nextChar != " " || pos != range.head) cat = nextCat;
		pos = next;
	}
	return pos;
});
var deleteGroupBackward = (target) => deleteByGroup(target, false);
var deleteGroupForward = (target) => deleteByGroup(target, true);
var deleteToLineEnd = (view) => deleteBy(view, (range) => {
	let lineEnd = view.lineBlockAt(range.head).to;
	return range.head < lineEnd ? lineEnd : Math.min(view.state.doc.length, range.head + 1);
});
var deleteLineBoundaryBackward = (view) => deleteBy(view, (range) => {
	let lineStart = view.moveToLineBoundary(range, false).head;
	return range.head > lineStart ? lineStart : Math.max(0, range.head - 1);
});
var deleteLineBoundaryForward = (view) => deleteBy(view, (range) => {
	let lineStart = view.moveToLineBoundary(range, true).head;
	return range.head < lineStart ? lineStart : Math.min(view.state.doc.length, range.head + 1);
});
var splitLine = ({ state, dispatch }) => {
	if (state.readOnly) return false;
	let changes = state.changeByRange((range) => {
		return {
			changes: {
				from: range.from,
				to: range.to,
				insert: Text.of(["", ""])
			},
			range: EditorSelection.cursor(range.from)
		};
	});
	dispatch(state.update(changes, {
		scrollIntoView: true,
		userEvent: "input"
	}));
	return true;
};
var transposeChars = ({ state, dispatch }) => {
	if (state.readOnly) return false;
	let changes = state.changeByRange((range) => {
		if (!range.empty || range.from == 0 || range.from == state.doc.length) return { range };
		let pos = range.from, line = state.doc.lineAt(pos);
		let from = pos == line.from ? pos - 1 : findClusterBreak(line.text, pos - line.from, false) + line.from;
		let to = pos == line.to ? pos + 1 : findClusterBreak(line.text, pos - line.from, true) + line.from;
		return {
			changes: {
				from,
				to,
				insert: state.doc.slice(pos, to).append(state.doc.slice(from, pos))
			},
			range: EditorSelection.cursor(to)
		};
	});
	if (changes.changes.empty) return false;
	dispatch(state.update(changes, {
		scrollIntoView: true,
		userEvent: "move.character"
	}));
	return true;
};
function selectedLineBlocks(state) {
	let blocks = [], upto = -1;
	for (let range of state.selection.ranges) {
		let startLine = state.doc.lineAt(range.from), endLine = state.doc.lineAt(range.to);
		if (!range.empty && range.to == endLine.from) endLine = state.doc.lineAt(range.to - 1);
		if (upto >= startLine.number) {
			let prev = blocks[blocks.length - 1];
			prev.to = endLine.to;
			prev.ranges.push(range);
		} else blocks.push({
			from: startLine.from,
			to: endLine.to,
			ranges: [range]
		});
		upto = endLine.number + 1;
	}
	return blocks;
}
function moveLine(state, dispatch, forward) {
	if (state.readOnly) return false;
	let changes = [], ranges = [];
	for (let block of selectedLineBlocks(state)) {
		if (forward ? block.to == state.doc.length : block.from == 0) continue;
		let nextLine = state.doc.lineAt(forward ? block.to + 1 : block.from - 1);
		let size = nextLine.length + 1;
		if (forward) {
			changes.push({
				from: block.to,
				to: nextLine.to
			}, {
				from: block.from,
				insert: nextLine.text + state.lineBreak
			});
			for (let r of block.ranges) ranges.push(EditorSelection.range(Math.min(state.doc.length, r.anchor + size), Math.min(state.doc.length, r.head + size)));
		} else {
			changes.push({
				from: nextLine.from,
				to: block.from
			}, {
				from: block.to,
				insert: state.lineBreak + nextLine.text
			});
			for (let r of block.ranges) ranges.push(EditorSelection.range(r.anchor - size, r.head - size));
		}
	}
	if (!changes.length) return false;
	dispatch(state.update({
		changes,
		scrollIntoView: true,
		selection: EditorSelection.create(ranges, state.selection.mainIndex),
		userEvent: "move.line"
	}));
	return true;
}
var moveLineUp = ({ state, dispatch }) => moveLine(state, dispatch, false);
var moveLineDown = ({ state, dispatch }) => moveLine(state, dispatch, true);
function copyLine(state, dispatch, forward) {
	if (state.readOnly) return false;
	let changes = [];
	for (let block of selectedLineBlocks(state)) if (forward) changes.push({
		from: block.from,
		insert: state.doc.slice(block.from, block.to) + state.lineBreak
	});
	else changes.push({
		from: block.to,
		insert: state.lineBreak + state.doc.slice(block.from, block.to)
	});
	let changeSet = state.changes(changes);
	dispatch(state.update({
		changes: changeSet,
		selection: state.selection.map(changeSet, forward ? 1 : -1),
		scrollIntoView: true,
		userEvent: "input.copyline"
	}));
	return true;
}
var copyLineUp = ({ state, dispatch }) => copyLine(state, dispatch, false);
var copyLineDown = ({ state, dispatch }) => copyLine(state, dispatch, true);
var deleteLine = (view) => {
	if (view.state.readOnly) return false;
	let { state } = view, changes = state.changes(selectedLineBlocks(state).map(({ from, to }) => {
		if (from > 0) from--;
		else if (to < state.doc.length) to++;
		return {
			from,
			to
		};
	}));
	let selection = updateSel(state.selection, (range) => {
		let dist = void 0;
		if (view.lineWrapping) {
			let block = view.lineBlockAt(range.head), pos = view.coordsAtPos(range.head, range.assoc || 1);
			if (pos) dist = block.bottom + view.documentTop - pos.bottom + view.defaultLineHeight / 2;
		}
		return view.moveVertically(range, true, dist);
	}).map(changes);
	view.dispatch({
		changes,
		selection,
		scrollIntoView: true,
		userEvent: "delete.line"
	});
	return true;
};
function isBetweenBrackets(state, pos) {
	if (/\(\)|\[\]|\{\}/.test(state.sliceDoc(pos - 1, pos + 1))) return {
		from: pos,
		to: pos
	};
	let context = syntaxTree(state).resolveInner(pos);
	let before = context.childBefore(pos), after = context.childAfter(pos), closedBy;
	if (before && after && before.to <= pos && after.from >= pos && (closedBy = before.type.prop(NodeProp.closedBy)) && closedBy.indexOf(after.name) > -1 && state.doc.lineAt(before.to).from == state.doc.lineAt(after.from).from && !/\S/.test(state.sliceDoc(before.to, after.from))) return {
		from: before.to,
		to: after.from
	};
	return null;
}
var insertNewlineAndIndent = newlineAndIndent(false);
var insertBlankLine = newlineAndIndent(true);
function newlineAndIndent(atEof) {
	return ({ state, dispatch }) => {
		if (state.readOnly) return false;
		let changes = state.changeByRange((range) => {
			let { from, to } = range, line = state.doc.lineAt(from);
			let explode = !atEof && from == to && isBetweenBrackets(state, from);
			if (atEof) from = to = (to <= line.to ? line : state.doc.lineAt(to)).to;
			let cx = new IndentContext(state, {
				simulateBreak: from,
				simulateDoubleBreak: !!explode
			});
			let indent = getIndentation(cx, from);
			if (indent == null) indent = countColumn(/^\s*/.exec(state.doc.lineAt(from).text)[0], state.tabSize);
			while (to < line.to && /\s/.test(line.text[to - line.from])) to++;
			if (explode) ({from, to} = explode);
			else if (from > line.from && from < line.from + 100 && !/\S/.test(line.text.slice(0, from))) from = line.from;
			let insert = ["", indentString(state, indent)];
			if (explode) insert.push(indentString(state, cx.lineIndent(line.from, -1)));
			return {
				changes: {
					from,
					to,
					insert: Text.of(insert)
				},
				range: EditorSelection.cursor(from + 1 + insert[1].length)
			};
		});
		dispatch(state.update(changes, {
			scrollIntoView: true,
			userEvent: "input"
		}));
		return true;
	};
}
function changeBySelectedLine(state, f) {
	let atLine = -1;
	return state.changeByRange((range) => {
		let changes = [];
		for (let pos = range.from; pos <= range.to;) {
			let line = state.doc.lineAt(pos);
			if (line.number > atLine && (range.empty || range.to > line.from)) {
				f(line, changes, range);
				atLine = line.number;
			}
			pos = line.to + 1;
		}
		let changeSet = state.changes(changes);
		return {
			changes,
			range: EditorSelection.range(changeSet.mapPos(range.anchor, 1), changeSet.mapPos(range.head, 1))
		};
	});
}
var indentSelection = ({ state, dispatch }) => {
	if (state.readOnly) return false;
	let updated = Object.create(null);
	let context = new IndentContext(state, { overrideIndentation: (start) => {
		let found = updated[start];
		return found == null ? -1 : found;
	} });
	let changes = changeBySelectedLine(state, (line, changes, range) => {
		let indent = getIndentation(context, line.from);
		if (indent == null) return;
		if (!/\S/.test(line.text)) indent = 0;
		let cur = /^\s*/.exec(line.text)[0];
		let norm = indentString(state, indent);
		if (cur != norm || range.from < line.from + cur.length) {
			updated[line.from] = indent;
			changes.push({
				from: line.from,
				to: line.from + cur.length,
				insert: norm
			});
		}
	});
	if (!changes.changes.empty) dispatch(state.update(changes, { userEvent: "indent" }));
	return true;
};
var indentMore = ({ state, dispatch }) => {
	if (state.readOnly) return false;
	dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
		changes.push({
			from: line.from,
			insert: state.facet(indentUnit)
		});
	}), { userEvent: "input.indent" }));
	return true;
};
var indentLess = ({ state, dispatch }) => {
	if (state.readOnly) return false;
	dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
		let space = /^\s*/.exec(line.text)[0];
		if (!space) return;
		let col = countColumn(space, state.tabSize), keep = 0;
		let insert = indentString(state, Math.max(0, col - getIndentUnit(state)));
		while (keep < space.length && keep < insert.length && space.charCodeAt(keep) == insert.charCodeAt(keep)) keep++;
		changes.push({
			from: line.from + keep,
			to: line.from + space.length,
			insert: insert.slice(keep)
		});
	}), { userEvent: "delete.dedent" }));
	return true;
};
var toggleTabFocusMode = (view) => {
	view.setTabFocusMode();
	return true;
};
var emacsStyleKeymap = [
	{
		key: "Ctrl-b",
		run: cursorCharLeft,
		shift: selectCharLeft,
		preventDefault: true
	},
	{
		key: "Ctrl-f",
		run: cursorCharRight,
		shift: selectCharRight
	},
	{
		key: "Ctrl-p",
		run: cursorLineUp,
		shift: selectLineUp
	},
	{
		key: "Ctrl-n",
		run: cursorLineDown,
		shift: selectLineDown
	},
	{
		key: "Ctrl-a",
		run: cursorLineStart,
		shift: selectLineStart
	},
	{
		key: "Ctrl-e",
		run: cursorLineEnd,
		shift: selectLineEnd
	},
	{
		key: "Ctrl-d",
		run: deleteCharForward
	},
	{
		key: "Ctrl-h",
		run: deleteCharBackward
	},
	{
		key: "Ctrl-k",
		run: deleteToLineEnd
	},
	{
		key: "Ctrl-Alt-h",
		run: deleteGroupBackward
	},
	{
		key: "Ctrl-o",
		run: splitLine
	},
	{
		key: "Ctrl-t",
		run: transposeChars
	},
	{
		key: "Ctrl-v",
		run: cursorPageDown
	}
];
var standardKeymap = [
	{
		key: "ArrowLeft",
		run: cursorCharLeft,
		shift: selectCharLeft,
		preventDefault: true
	},
	{
		key: "Mod-ArrowLeft",
		mac: "Alt-ArrowLeft",
		run: cursorGroupLeft,
		shift: selectGroupLeft,
		preventDefault: true
	},
	{
		mac: "Cmd-ArrowLeft",
		run: cursorLineBoundaryLeft,
		shift: selectLineBoundaryLeft,
		preventDefault: true
	},
	{
		key: "ArrowRight",
		run: cursorCharRight,
		shift: selectCharRight,
		preventDefault: true
	},
	{
		key: "Mod-ArrowRight",
		mac: "Alt-ArrowRight",
		run: cursorGroupRight,
		shift: selectGroupRight,
		preventDefault: true
	},
	{
		mac: "Cmd-ArrowRight",
		run: cursorLineBoundaryRight,
		shift: selectLineBoundaryRight,
		preventDefault: true
	},
	{
		key: "ArrowUp",
		run: cursorLineUp,
		shift: selectLineUp,
		preventDefault: true
	},
	{
		mac: "Cmd-ArrowUp",
		run: cursorDocStart,
		shift: selectDocStart
	},
	{
		mac: "Ctrl-ArrowUp",
		run: cursorPageUp,
		shift: selectPageUp
	},
	{
		key: "ArrowDown",
		run: cursorLineDown,
		shift: selectLineDown,
		preventDefault: true
	},
	{
		mac: "Cmd-ArrowDown",
		run: cursorDocEnd,
		shift: selectDocEnd
	},
	{
		mac: "Ctrl-ArrowDown",
		run: cursorPageDown,
		shift: selectPageDown
	},
	{
		key: "PageUp",
		run: cursorPageUp,
		shift: selectPageUp
	},
	{
		key: "PageDown",
		run: cursorPageDown,
		shift: selectPageDown
	},
	{
		key: "Home",
		run: cursorLineBoundaryBackward,
		shift: selectLineBoundaryBackward,
		preventDefault: true
	},
	{
		key: "Mod-Home",
		run: cursorDocStart,
		shift: selectDocStart
	},
	{
		key: "End",
		run: cursorLineBoundaryForward,
		shift: selectLineBoundaryForward,
		preventDefault: true
	},
	{
		key: "Mod-End",
		run: cursorDocEnd,
		shift: selectDocEnd
	},
	{
		key: "Enter",
		run: insertNewlineAndIndent,
		shift: insertNewlineAndIndent
	},
	{
		key: "Mod-a",
		run: selectAll
	},
	{
		key: "Backspace",
		run: deleteCharBackward,
		shift: deleteCharBackward,
		preventDefault: true
	},
	{
		key: "Delete",
		run: deleteCharForward,
		preventDefault: true
	},
	{
		key: "Mod-Backspace",
		mac: "Alt-Backspace",
		run: deleteGroupBackward,
		preventDefault: true
	},
	{
		key: "Mod-Delete",
		mac: "Alt-Delete",
		run: deleteGroupForward,
		preventDefault: true
	},
	{
		mac: "Mod-Backspace",
		run: deleteLineBoundaryBackward,
		preventDefault: true
	},
	{
		mac: "Mod-Delete",
		run: deleteLineBoundaryForward,
		preventDefault: true
	}
].concat(emacsStyleKeymap.map((b) => ({
	mac: b.key,
	run: b.run,
	shift: b.shift
})));
var defaultKeymap = [
	{
		key: "Alt-ArrowLeft",
		mac: "Ctrl-ArrowLeft",
		run: cursorSyntaxLeft,
		shift: selectSyntaxLeft
	},
	{
		key: "Alt-ArrowRight",
		mac: "Ctrl-ArrowRight",
		run: cursorSyntaxRight,
		shift: selectSyntaxRight
	},
	{
		key: "Alt-ArrowUp",
		run: moveLineUp
	},
	{
		key: "Shift-Alt-ArrowUp",
		run: copyLineUp
	},
	{
		key: "Alt-ArrowDown",
		run: moveLineDown
	},
	{
		key: "Shift-Alt-ArrowDown",
		run: copyLineDown
	},
	{
		key: "Mod-Alt-ArrowUp",
		run: addCursorAbove
	},
	{
		key: "Mod-Alt-ArrowDown",
		run: addCursorBelow
	},
	{
		key: "Escape",
		run: simplifySelection
	},
	{
		key: "Mod-Enter",
		run: insertBlankLine
	},
	{
		key: "Alt-l",
		mac: "Ctrl-l",
		run: selectLine
	},
	{
		key: "Mod-i",
		run: selectParentSyntax,
		preventDefault: true
	},
	{
		key: "Mod-[",
		run: indentLess
	},
	{
		key: "Mod-]",
		run: indentMore
	},
	{
		key: "Mod-Alt-\\",
		run: indentSelection
	},
	{
		key: "Shift-Mod-k",
		run: deleteLine
	},
	{
		key: "Shift-Mod-\\",
		run: cursorMatchingBracket
	},
	{
		key: "Mod-/",
		run: toggleComment
	},
	{
		key: "Alt-A",
		mac: "Ctrl-A",
		run: toggleBlockComment
	},
	{
		key: "Ctrl-m",
		mac: "Shift-Alt-m",
		run: toggleTabFocusMode
	}
].concat(standardKeymap);
// ../../node_modules/@codemirror/lint/dist/index.js
var SelectedDiagnostic = class {
	constructor(from, to, diagnostic) {
		this.from = from;
		this.to = to;
		this.diagnostic = diagnostic;
	}
};
var LintState = class LintState {
	constructor(diagnostics, panel, selected) {
		this.diagnostics = diagnostics;
		this.panel = panel;
		this.selected = selected;
	}
	static init(diagnostics, panel, state) {
		let diagnosticFilter = state.facet(lintConfig).markerFilter;
		if (diagnosticFilter) diagnostics = diagnosticFilter(diagnostics, state);
		let sorted = diagnostics.slice().sort((a, b) => a.from - b.from || a.to - b.to);
		let deco = new RangeSetBuilder(), active = [], pos = 0;
		let scan = state.doc.iter(), scanPos = 0, docLen = state.doc.length;
		for (let i = 0;;) {
			let next = i == sorted.length ? null : sorted[i];
			if (!next && !active.length) break;
			let from, to;
			if (active.length) {
				from = pos;
				to = active.reduce((p, d) => Math.min(p, d.to), next && next.from > from ? next.from : 1e8);
			} else {
				from = next.from;
				if (from > docLen) break;
				to = next.to;
				active.push(next);
				i++;
			}
			while (i < sorted.length) {
				let next = sorted[i];
				if (next.from == from && (next.to > next.from || next.to == from)) {
					active.push(next);
					i++;
					to = Math.min(next.to, to);
				} else {
					to = Math.min(next.from, to);
					break;
				}
			}
			to = Math.min(to, docLen);
			let widget = false;
			if (active.some((d) => d.from == from && (d.to == to || to == docLen))) {
				widget = from == to;
				if (!widget && to - from < 10) {
					let behind = from - (scanPos + scan.value.length);
					if (behind > 0) {
						scan.next(behind);
						scanPos = from;
					}
					for (let check = from;;) {
						if (check >= to) {
							widget = true;
							break;
						}
						if (!scan.lineBreak && scanPos + scan.value.length > check) break;
						check = scanPos + scan.value.length;
						scanPos += scan.value.length;
						scan.next();
					}
				}
			}
			let sev = maxSeverity(active);
			if (widget) deco.add(from, from, Decoration.widget({
				widget: new DiagnosticWidget(sev),
				diagnostics: active.slice()
			}));
			else {
				let markClass = active.reduce((c, d) => d.markClass ? c + " " + d.markClass : c, "");
				deco.add(from, to, Decoration.mark({
					class: "cm-lintRange cm-lintRange-" + sev + markClass,
					diagnostics: active.slice(),
					inclusiveEnd: active.some((a) => a.to > to)
				}));
			}
			pos = to;
			if (pos == docLen) break;
			for (let i = 0; i < active.length; i++) if (active[i].to <= pos) active.splice(i--, 1);
		}
		let set = deco.finish();
		return new LintState(set, panel, findDiagnostic(set));
	}
};
function findDiagnostic(diagnostics, diagnostic = null, after = 0) {
	let found = null;
	diagnostics.between(after, 1e9, (from, to, { spec }) => {
		if (diagnostic && spec.diagnostics.indexOf(diagnostic) < 0) return;
		if (!found) found = new SelectedDiagnostic(from, to, diagnostic || spec.diagnostics[0]);
		else if (spec.diagnostics.indexOf(found.diagnostic) < 0) return false;
		else found = new SelectedDiagnostic(found.from, to, found.diagnostic);
	});
	return found;
}
function hideTooltip(tr, tooltip) {
	let from = tooltip.pos, to = tooltip.end || from;
	let result = tr.state.facet(lintConfig).hideOn(tr, from, to);
	if (result != null) return result;
	let line = tr.startState.doc.lineAt(tooltip.pos);
	return !!(tr.effects.some((e) => e.is(setDiagnosticsEffect)) || tr.changes.touchesRange(line.from, Math.max(line.to, to)));
}
function maybeEnableLint(state, effects) {
	return state.field(lintState, false) ? effects : effects.concat(StateEffect.appendConfig.of(lintExtensions));
}
function setDiagnostics(state, diagnostics) {
	return { effects: maybeEnableLint(state, [setDiagnosticsEffect.of(diagnostics)]) };
}
var setDiagnosticsEffect = StateEffect.define();
var togglePanel = StateEffect.define();
var movePanelSelection = StateEffect.define();
var lintState = StateField.define({
	create() {
		return new LintState(Decoration.none, null, null);
	},
	update(value, tr) {
		if (tr.docChanged && value.diagnostics.size) {
			let mapped = value.diagnostics.map(tr.changes), selected = null, panel = value.panel;
			if (value.selected) {
				let selPos = tr.changes.mapPos(value.selected.from, 1);
				selected = findDiagnostic(mapped, value.selected.diagnostic, selPos) || findDiagnostic(mapped, null, selPos);
			}
			if (!mapped.size && panel && tr.state.facet(lintConfig).autoPanel) panel = null;
			value = new LintState(mapped, panel, selected);
		}
		for (let effect of tr.effects) if (effect.is(setDiagnosticsEffect)) {
			let panel = !tr.state.facet(lintConfig).autoPanel ? value.panel : effect.value.length ? LintPanel.open : null;
			value = LintState.init(effect.value, panel, tr.state);
		} else if (effect.is(togglePanel)) value = new LintState(value.diagnostics, effect.value ? LintPanel.open : null, value.selected);
		else if (effect.is(movePanelSelection)) value = new LintState(value.diagnostics, value.panel, effect.value);
		return value;
	},
	provide: (f) => [showPanel.from(f, (val) => val.panel), EditorView.decorations.from(f, (s) => s.diagnostics)]
});
var activeMark = Decoration.mark({ class: "cm-lintRange cm-lintRange-active" });
function lintTooltip(view, pos, side) {
	let { diagnostics } = view.state.field(lintState);
	let found, start = -1, end = -1;
	diagnostics.between(pos - (side < 0 ? 1 : 0), pos + (side > 0 ? 1 : 0), (from, to, { spec }) => {
		if (pos >= from && pos <= to && (from == to || (pos > from || side > 0) && (pos < to || side < 0))) {
			found = spec.diagnostics;
			start = from;
			end = to;
			return false;
		}
	});
	let diagnosticFilter = view.state.facet(lintConfig).tooltipFilter;
	if (found && diagnosticFilter) found = diagnosticFilter(found, view.state);
	if (!found) return null;
	return {
		pos: start,
		end,
		above: true,
		create() {
			return { dom: diagnosticsTooltip(view, found) };
		}
	};
}
function diagnosticsTooltip(view, diagnostics) {
	return crelt("ul", { class: "cm-tooltip-lint" }, diagnostics.map((d) => renderDiagnostic(view, d, false)));
}
var closeLintPanel = (view) => {
	let field = view.state.field(lintState, false);
	if (!field || !field.panel) return false;
	view.dispatch({ effects: togglePanel.of(false) });
	return true;
};
var lintPlugin = ViewPlugin.fromClass(class {
	constructor(view) {
		this.view = view;
		this.timeout = -1;
		this.set = true;
		let { delay } = view.state.facet(lintConfig);
		this.lintTime = Date.now() + delay;
		this.run = this.run.bind(this);
		this.timeout = setTimeout(this.run, delay);
	}
	run() {
		clearTimeout(this.timeout);
		let now = Date.now();
		if (now < this.lintTime - 10) this.timeout = setTimeout(this.run, this.lintTime - now);
		else {
			this.set = false;
			let { state } = this.view, { sources } = state.facet(lintConfig);
			if (sources.length) batchResults(sources.map((s) => Promise.resolve(s(this.view))), (annotations) => {
				if (this.view.state.doc == state.doc) this.view.dispatch(setDiagnostics(this.view.state, annotations.reduce((a, b) => a.concat(b))));
			}, (error) => {
				logException(this.view.state, error);
			});
		}
	}
	update(update) {
		let config = update.state.facet(lintConfig);
		if (update.docChanged || config != update.startState.facet(lintConfig) || config.needsRefresh && config.needsRefresh(update)) {
			this.lintTime = Date.now() + config.delay;
			if (!this.set) {
				this.set = true;
				this.timeout = setTimeout(this.run, config.delay);
			}
		}
	}
	force() {
		if (this.set) {
			this.lintTime = Date.now();
			this.run();
		}
	}
	destroy() {
		clearTimeout(this.timeout);
	}
});
function batchResults(promises, sink, error) {
	let collected = [], timeout = -1;
	for (let p of promises) p.then((value) => {
		collected.push(value);
		clearTimeout(timeout);
		if (collected.length == promises.length) sink(collected);
		else timeout = setTimeout(() => sink(collected), 200);
	}, error);
}
var lintConfig = Facet.define({ combine(input) {
	return {
		sources: input.map((i) => i.source).filter((x) => x != null),
		...combineConfig(input.map((i) => i.config), {
			delay: 750,
			markerFilter: null,
			tooltipFilter: null,
			needsRefresh: null,
			hideOn: () => null
		}, {
			delay: Math.max,
			markerFilter: combineFilter,
			tooltipFilter: combineFilter,
			needsRefresh: (a, b) => !a ? b : !b ? a : (u) => a(u) || b(u),
			hideOn: (a, b) => !a ? b : !b ? a : (t, x, y) => a(t, x, y) || b(t, x, y),
			autoPanel: (a, b) => a || b
		})
	};
} });
function combineFilter(a, b) {
	return !a ? b : !b ? a : (d, s) => b(a(d, s), s);
}
function linter(source, config = {}) {
	return [
		lintConfig.of({
			source,
			config
		}),
		lintPlugin,
		lintExtensions
	];
}
function forceLinting(view) {
	let plugin = view.plugin(lintPlugin);
	if (plugin) plugin.force();
}
function assignKeys(actions) {
	let assigned = [];
	if (actions) actions: for (let { name } of actions) {
		for (let i = 0; i < name.length; i++) {
			let ch = name[i];
			if (/[a-zA-Z]/.test(ch) && !assigned.some((c) => c.toLowerCase() == ch.toLowerCase())) {
				assigned.push(ch);
				continue actions;
			}
		}
		assigned.push("");
	}
	return assigned;
}
function renderDiagnostic(view, diagnostic, inPanel) {
	var _a;
	let keys = inPanel ? assignKeys(diagnostic.actions) : [];
	return crelt("li", { class: "cm-diagnostic cm-diagnostic-" + diagnostic.severity }, crelt("span", { class: "cm-diagnosticText" }, diagnostic.renderMessage ? diagnostic.renderMessage(view) : diagnostic.message), (_a = diagnostic.actions) === null || _a === void 0 ? void 0 : _a.map((action, i) => {
		let fired = false, click = (e) => {
			e.preventDefault();
			if (fired) return;
			fired = true;
			let found = findDiagnostic(view.state.field(lintState).diagnostics, diagnostic);
			if (found) action.apply(view, found.from, found.to);
		};
		let { name } = action, keyIndex = keys[i] ? name.indexOf(keys[i]) : -1;
		let nameElt = keyIndex < 0 ? name : [
			name.slice(0, keyIndex),
			crelt("u", name.slice(keyIndex, keyIndex + 1)),
			name.slice(keyIndex + 1)
		];
		return crelt("button", {
			type: "button",
			class: "cm-diagnosticAction" + (action.markClass ? " " + action.markClass : ""),
			onclick: click,
			onmousedown: click,
			"aria-label": ` Action: ${name}${keyIndex < 0 ? "" : ` (access key "${keys[i]})"`}.`
		}, nameElt);
	}), diagnostic.source && crelt("div", { class: "cm-diagnosticSource" }, diagnostic.source));
}
var DiagnosticWidget = class extends WidgetType {
	constructor(sev) {
		super();
		this.sev = sev;
	}
	eq(other) {
		return other.sev == this.sev;
	}
	toDOM() {
		return crelt("span", { class: "cm-lintPoint cm-lintPoint-" + this.sev });
	}
};
var PanelItem = class {
	constructor(view, diagnostic) {
		this.diagnostic = diagnostic;
		this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16);
		this.dom = renderDiagnostic(view, diagnostic, true);
		this.dom.id = this.id;
		this.dom.setAttribute("role", "option");
	}
};
var LintPanel = class LintPanel {
	constructor(view) {
		this.view = view;
		this.items = [];
		let onkeydown = (event) => {
			if (event.ctrlKey || event.altKey || event.metaKey) return;
			if (event.keyCode == 27) {
				closeLintPanel(this.view);
				this.view.focus();
			} else if (event.keyCode == 38 || event.keyCode == 33) this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
			else if (event.keyCode == 40 || event.keyCode == 34) this.moveSelection((this.selectedIndex + 1) % this.items.length);
			else if (event.keyCode == 36) this.moveSelection(0);
			else if (event.keyCode == 35) this.moveSelection(this.items.length - 1);
			else if (event.keyCode == 13) this.view.focus();
			else if (event.keyCode >= 65 && event.keyCode <= 90 && this.selectedIndex >= 0) {
				let { diagnostic } = this.items[this.selectedIndex], keys = assignKeys(diagnostic.actions);
				for (let i = 0; i < keys.length; i++) if (keys[i].toUpperCase().charCodeAt(0) == event.keyCode) {
					let found = findDiagnostic(this.view.state.field(lintState).diagnostics, diagnostic);
					if (found) diagnostic.actions[i].apply(view, found.from, found.to);
				}
			} else return;
			event.preventDefault();
		};
		let onclick = (event) => {
			for (let i = 0; i < this.items.length; i++) if (this.items[i].dom.contains(event.target)) this.moveSelection(i);
		};
		this.list = crelt("ul", {
			tabIndex: 0,
			role: "listbox",
			"aria-label": this.view.state.phrase("Diagnostics"),
			onkeydown,
			onclick
		});
		this.dom = crelt("div", { class: "cm-panel-lint" }, this.list, crelt("button", {
			type: "button",
			name: "close",
			"aria-label": this.view.state.phrase("close"),
			onclick: () => closeLintPanel(this.view)
		}, "×"));
		this.update();
	}
	get selectedIndex() {
		let selected = this.view.state.field(lintState).selected;
		if (!selected) return -1;
		for (let i = 0; i < this.items.length; i++) if (this.items[i].diagnostic == selected.diagnostic) return i;
		return -1;
	}
	update() {
		let { diagnostics, selected } = this.view.state.field(lintState);
		let i = 0, needsSync = false, newSelectedItem = null;
		let seen = new Set();
		diagnostics.between(0, this.view.state.doc.length, (_start, _end, { spec }) => {
			for (let diagnostic of spec.diagnostics) {
				if (seen.has(diagnostic)) continue;
				seen.add(diagnostic);
				let found = -1, item;
				for (let j = i; j < this.items.length; j++) if (this.items[j].diagnostic == diagnostic) {
					found = j;
					break;
				}
				if (found < 0) {
					item = new PanelItem(this.view, diagnostic);
					this.items.splice(i, 0, item);
					needsSync = true;
				} else {
					item = this.items[found];
					if (found > i) {
						this.items.splice(i, found - i);
						needsSync = true;
					}
				}
				if (selected && item.diagnostic == selected.diagnostic) {
					if (!item.dom.hasAttribute("aria-selected")) {
						item.dom.setAttribute("aria-selected", "true");
						newSelectedItem = item;
					}
				} else if (item.dom.hasAttribute("aria-selected")) item.dom.removeAttribute("aria-selected");
				i++;
			}
		});
		while (i < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0)) {
			needsSync = true;
			this.items.pop();
		}
		if (this.items.length == 0) {
			this.items.push(new PanelItem(this.view, {
				from: -1,
				to: -1,
				severity: "info",
				message: this.view.state.phrase("No diagnostics")
			}));
			needsSync = true;
		}
		if (newSelectedItem) {
			this.list.setAttribute("aria-activedescendant", newSelectedItem.id);
			this.view.requestMeasure({
				key: this,
				read: () => ({
					sel: newSelectedItem.dom.getBoundingClientRect(),
					panel: this.list.getBoundingClientRect()
				}),
				write: ({ sel, panel }) => {
					let scaleY = panel.height / this.list.offsetHeight;
					if (sel.top < panel.top) this.list.scrollTop -= (panel.top - sel.top) / scaleY;
					else if (sel.bottom > panel.bottom) this.list.scrollTop += (sel.bottom - panel.bottom) / scaleY;
				}
			});
		} else if (this.selectedIndex < 0) this.list.removeAttribute("aria-activedescendant");
		if (needsSync) this.sync();
	}
	sync() {
		let domPos = this.list.firstChild;
		function rm() {
			let prev = domPos;
			domPos = prev.nextSibling;
			prev.remove();
		}
		for (let item of this.items) if (item.dom.parentNode == this.list) {
			while (domPos != item.dom) rm();
			domPos = item.dom.nextSibling;
		} else this.list.insertBefore(item.dom, domPos);
		while (domPos) rm();
	}
	moveSelection(selectedIndex) {
		if (this.selectedIndex < 0) return;
		let selection = findDiagnostic(this.view.state.field(lintState).diagnostics, this.items[selectedIndex].diagnostic);
		if (!selection) return;
		this.view.dispatch({
			selection: {
				anchor: selection.from,
				head: selection.to
			},
			scrollIntoView: true,
			effects: movePanelSelection.of(selection)
		});
	}
	static open(view) {
		return new LintPanel(view);
	}
};
function svg(content, attrs = `viewBox="0 0 40 40"`) {
	return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${attrs}>${encodeURIComponent(content)}</svg>')`;
}
function underline(color) {
	return svg(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${color}" fill="none" stroke-width=".7"/>`, `width="6" height="3"`);
}
var baseTheme = EditorView.baseTheme({
	".cm-diagnostic": {
		padding: "3px 6px 3px 8px",
		marginLeft: "-1px",
		display: "block",
		whiteSpace: "pre-wrap"
	},
	".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
	".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
	".cm-diagnostic-info": { borderLeft: "5px solid #999" },
	".cm-diagnostic-hint": { borderLeft: "5px solid #66d" },
	".cm-diagnosticAction": {
		font: "inherit",
		border: "none",
		padding: "2px 4px",
		backgroundColor: "#444",
		color: "white",
		borderRadius: "3px",
		marginLeft: "8px",
		cursor: "pointer"
	},
	".cm-diagnosticSource": {
		fontSize: "70%",
		opacity: .7
	},
	".cm-lintRange": {
		backgroundPosition: "left bottom",
		backgroundRepeat: "repeat-x",
		paddingBottom: "0.7px"
	},
	".cm-lintRange-error": { backgroundImage: underline("#f11") },
	".cm-lintRange-warning": { backgroundImage: underline("orange") },
	".cm-lintRange-info": { backgroundImage: underline("#999") },
	".cm-lintRange-hint": { backgroundImage: underline("#66d") },
	".cm-lintRange-active": { backgroundColor: "#ffdd9980" },
	".cm-tooltip-lint": {
		padding: 0,
		margin: 0
	},
	".cm-lintPoint": {
		position: "relative",
		"&:after": {
			content: "\"\"",
			position: "absolute",
			bottom: 0,
			left: "-2px",
			borderLeft: "3px solid transparent",
			borderRight: "3px solid transparent",
			borderBottom: "4px solid #d11"
		}
	},
	".cm-lintPoint-warning": { "&:after": { borderBottomColor: "orange" } },
	".cm-lintPoint-info": { "&:after": { borderBottomColor: "#999" } },
	".cm-lintPoint-hint": { "&:after": { borderBottomColor: "#66d" } },
	".cm-panel.cm-panel-lint": {
		position: "relative",
		"& ul": {
			maxHeight: "100px",
			overflowY: "auto",
			"& [aria-selected]": {
				backgroundColor: "#ddd",
				"& u": { textDecoration: "underline" }
			},
			"&:focus [aria-selected]": {
				background_fallback: "#bdf",
				backgroundColor: "Highlight",
				color_fallback: "white",
				color: "HighlightText"
			},
			"& u": { textDecoration: "none" },
			padding: 0,
			margin: 0
		},
		"& [name=close]": {
			position: "absolute",
			top: "0",
			right: "2px",
			background: "inherit",
			border: "none",
			font: "inherit",
			padding: 0,
			margin: 0
		}
	},
	"&dark .cm-lintRange-active": { backgroundColor: "#86714a80" },
	"&dark .cm-panel.cm-panel-lint ul": { "& [aria-selected]": { backgroundColor: "#2e343e" } }
});
function severityWeight(sev) {
	return sev == "error" ? 4 : sev == "warning" ? 3 : sev == "info" ? 2 : 1;
}
function maxSeverity(diagnostics) {
	let sev = "hint", weight = 1;
	for (let d of diagnostics) {
		let w = severityWeight(d.severity);
		if (w > weight) {
			weight = w;
			sev = d.severity;
		}
	}
	return sev;
}
var lintHover = hoverTooltip(lintTooltip, { hideOn: hideTooltip });
var lintExtensions = [
	lintState,
	EditorView.decorations.compute([lintState], (state) => {
		let { selected, panel } = state.field(lintState);
		return !selected || !panel || selected.from == selected.to ? Decoration.none : Decoration.set([activeMark.range(selected.from, selected.to)]);
	}),
	lintHover,
	baseTheme
];
// ../../node_modules/mitt/dist/mitt.mjs
function mitt_default(n) {
	return {
		all: n = n || new Map(),
		on: function(t, e) {
			var i = n.get(t);
			i ? i.push(e) : n.set(t, [e]);
		},
		off: function(t, e) {
			var i = n.get(t);
			i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
		},
		emit: function(t, e) {
			var i = n.get(t);
			i && i.slice().map(function(n) {
				n(e);
			}), (i = n.get("*")) && i.slice().map(function(n) {
				n(t, e);
			});
		}
	};
}
// ../../node_modules/@bpmn-io/cm-theme/dist/index.js
init_dist$2();
var urlifyColor = (color) => color.startsWith("#") ? `%23${color.slice(1)}` : color;
var squiggle = (color) => `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='6' height='3'><path d='m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0' stroke='${urlifyColor(color)}' fill='none' stroke-width='1.2'/></svg>")`;
var createTheme = ({ variant, settings, styles }) => {
	return [EditorView.theme({
		"&": { color: settings.foreground },
		"& .cm-lintRange-error": { backgroundImage: squiggle(settings.error) },
		"& .cm-lintRange-warning": { backgroundImage: squiggle(settings.warning) }
	}, { dark: variant === "dark" }), syntaxHighlighting(HighlightStyle.define(styles))];
};
var feelLight = createTheme({
	variant: "light",
	settings: {
		foreground: "#24292f",
		warning: "#debd71",
		error: "#9f1c15"
	},
	styles: [
		{
			tag: tags.keyword,
			color: "#a31515"
		},
		{
			tag: tags.bool,
			color: "#a31515"
		},
		{
			tag: tags.null,
			color: "#a31515"
		},
		{
			tag: tags.typeName,
			color: "#a31515"
		},
		{
			tag: tags.string,
			color: "#1a7f37"
		},
		{
			tag: tags.special(tags.string),
			color: "#1a7f37"
		},
		{
			tag: tags.number,
			color: "#06704a"
		},
		{
			tag: tags.arithmeticOperator,
			color: "#0969da"
		},
		{
			tag: tags.compareOperator,
			color: "#0969da"
		},
		{
			tag: tags.special(tags.bracket),
			color: "#b54a00",
			fontWeight: "bold"
		},
		{
			tag: tags.variableName,
			color: "#0550ae"
		},
		{
			tag: tags.definition(tags.variableName),
			color: "#0550ae"
		},
		{
			tag: tags.special(tags.variableName),
			color: "#0550ae"
		},
		{
			tag: tags.propertyName,
			color: "#0550ae"
		},
		{
			tag: tags.definition(tags.propertyName),
			color: "#0550ae"
		},
		{
			tag: tags.function(tags.variableName),
			color: "#8250df"
		},
		{
			tag: tags.function(tags.special(tags.variableName)),
			color: "#8250df"
		},
		{
			tag: tags.function(tags.definition(tags.variableName)),
			color: "#8250df"
		},
		{
			tag: tags.function(tags.propertyName),
			color: "#8250df"
		},
		{
			tag: tags.lineComment,
			color: "#69727b"
		},
		{
			tag: tags.blockComment,
			color: "#69727b"
		},
		{
			tag: tags.heading,
			color: "#953800",
			fontWeight: "bold"
		},
		{
			tag: tags.strong,
			fontWeight: "bold"
		},
		{
			tag: tags.emphasis,
			fontStyle: "italic"
		},
		{
			tag: tags.strikethrough,
			textDecoration: "line-through"
		},
		{
			tag: tags.link,
			color: "#0969da",
			textDecoration: "underline"
		},
		{
			tag: tags.url,
			color: "#0969da"
		},
		{
			tag: tags.escape,
			color: "#0969da"
		},
		{
			tag: tags.quote,
			color: "#69727b"
		},
		{
			tag: tags.processingInstruction,
			color: "#69727b"
		},
		{
			tag: tags.contentSeparator,
			color: "#69727b",
			fontWeight: "bold"
		},
		{
			tag: tags.meta,
			color: "#69727b"
		},
		{
			tag: tags.inserted,
			color: "#1a7f37"
		},
		{
			tag: tags.deleted,
			color: "#a31515"
		},
		{
			tag: tags.tagName,
			color: "#953800"
		},
		{
			tag: tags.attributeName,
			color: "#953800"
		},
		{
			tag: tags.angleBracket,
			color: "#69727b"
		},
		{
			tag: tags.attributeValue,
			color: "#1a7f37"
		}
	]
});
var feelDark = createTheme({
	variant: "dark",
	settings: {
		foreground: "#adbac7",
		warning: "#fff890",
		error: "#ff0000"
	},
	styles: [
		{
			tag: tags.keyword,
			color: "#f47067"
		},
		{
			tag: tags.bool,
			color: "#f47067"
		},
		{
			tag: tags.null,
			color: "#f47067"
		},
		{
			tag: tags.typeName,
			color: "#f47067"
		},
		{
			tag: tags.string,
			color: "#aff5b4"
		},
		{
			tag: tags.special(tags.string),
			color: "#aff5b4"
		},
		{
			tag: tags.number,
			color: "#6bc46d"
		},
		{
			tag: tags.arithmeticOperator,
			color: "#89dceb"
		},
		{
			tag: tags.compareOperator,
			color: "#89dceb"
		},
		{
			tag: tags.special(tags.bracket),
			color: "#ffa657",
			fontWeight: "bold"
		},
		{
			tag: tags.variableName,
			color: "#79c0ff"
		},
		{
			tag: tags.definition(tags.variableName),
			color: "#79c0ff"
		},
		{
			tag: tags.special(tags.variableName),
			color: "#79c0ff"
		},
		{
			tag: tags.propertyName,
			color: "#79c0ff"
		},
		{
			tag: tags.definition(tags.propertyName),
			color: "#79c0ff"
		},
		{
			tag: tags.function(tags.variableName),
			color: "#dcbdfb"
		},
		{
			tag: tags.function(tags.special(tags.variableName)),
			color: "#dcbdfb"
		},
		{
			tag: tags.function(tags.definition(tags.variableName)),
			color: "#dcbdfb"
		},
		{
			tag: tags.function(tags.propertyName),
			color: "#dcbdfb"
		},
		{
			tag: tags.lineComment,
			color: "#8b949e"
		},
		{
			tag: tags.blockComment,
			color: "#8b949e"
		},
		{
			tag: tags.heading,
			color: "#e3b341",
			fontWeight: "bold"
		},
		{
			tag: tags.strong,
			fontWeight: "bold"
		},
		{
			tag: tags.emphasis,
			fontStyle: "italic"
		},
		{
			tag: tags.strikethrough,
			textDecoration: "line-through"
		},
		{
			tag: tags.link,
			color: "#89dceb",
			textDecoration: "underline"
		},
		{
			tag: tags.url,
			color: "#89dceb"
		},
		{
			tag: tags.escape,
			color: "#89dceb"
		},
		{
			tag: tags.quote,
			color: "#8b949e"
		},
		{
			tag: tags.processingInstruction,
			color: "#8b949e"
		},
		{
			tag: tags.contentSeparator,
			color: "#8b949e",
			fontWeight: "bold"
		},
		{
			tag: tags.meta,
			color: "#8b949e"
		},
		{
			tag: tags.inserted,
			color: "#aff5b4"
		},
		{
			tag: tags.deleted,
			color: "#f47067"
		},
		{
			tag: tags.tagName,
			color: "#e3b341"
		},
		{
			tag: tags.attributeName,
			color: "#e3b341"
		},
		{
			tag: tags.angleBracket,
			color: "#8b949e"
		},
		{
			tag: tags.attributeValue,
			color: "#aff5b4"
		}
	]
});
// ../../node_modules/@bpmn-io/lezer-feel/dist/index.js
init_dist$3();
init_dist$2();
var propertyIdentifier = 124;
var identifier = 125;
var nameIdentifier = 126;
var insertSemi = 127;
var expression0 = 131;
var ForExpression = 4;
var forExpressionStart = 134;
var ForInExpression = 7;
var Name = 8;
var Identifier = 9;
var AdditionalIdentifier = 10;
var forExpressionBodyStart = 140;
var IfExpression = 21;
var ifExpressionStart = 141;
var QuantifiedExpression = 25;
var quantifiedExpressionStart = 142;
var QuantifiedInExpression = 29;
var PositiveUnaryTest = 39;
var ArithmeticExpression = 43;
var arithmeticPlusStart = 145;
var arithmeticTimesStart = 146;
var arithmeticExpStart = 147;
var arithmeticUnaryStart = 148;
var VariableName = 49;
var PathExpression = 70;
var pathExpressionStart = 154;
var PathName = 71;
var FilterExpression = 73;
var filterExpressionStart = 155;
var FunctionInvocation = 75;
var functionInvocationStart = 156;
var ParameterName = 79;
var nil = 161;
var NumericLiteral = 82;
var StringLiteral = 83;
var BooleanLiteral = 84;
var listStart = 168;
var List$1 = 92;
var FunctionDefinition = 93;
var functionDefinitionStart = 170;
var Context = 100;
var contextStart = 172;
var ContextEntry = 101;
var PropertyName = 103;
var PropertyIdentifier = 104;
var LOG_PARSE = typeof process != "undefined" && /\bfparse(:dbg)?\b/.test({}.LOG);
var LOG_PARSE_DEBUG = typeof process != "undefined" && /\bfparse:dbg\b/.test({}.LOG);
var LOG_VARS = typeof process != "undefined" && /\bcontext\b/.test({}.LOG);
var spaceChars = [
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
var newlineChars = chars("\n\r");
var asterix = "*".charCodeAt(0);
var additionalNameChars = chars("'./-+*^");
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
var identifiersMap = {
	[identifier]: "identifier",
	[nameIdentifier]: "nameIdentifier"
};
var identifiers = new ExternalTokenizer((input, stack) => {
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
var propertyIdentifiers = new ExternalTokenizer((input, stack) => {
	LOG_PARSE_DEBUG && console.log("%s: T <propertyIdentifier>", input.pos);
	const start = stack.context.tokens;
	const match = parseIdentifier(input, 0, start.length > 0);
	if (match) {
		input.advance(match.offset);
		input.acceptToken(propertyIdentifier);
		LOG_PARSE && console.log("%s: MATCH <propertyIdentifier> <%s>", input.pos, match.token);
	}
});
var insertSemicolon = new ExternalTokenizer((input, stack) => {
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
var prefixedContextStarts = {
	[functionInvocationStart]: "FunctionInvocation",
	[filterExpressionStart]: "FilterExpression",
	[pathExpressionStart]: "PathExpression"
};
var contextStarts = {
	[contextStart]: "Context",
	[functionDefinitionStart]: "FunctionDefinition",
	[forExpressionStart]: "ForExpression",
	[listStart]: "List",
	[ifExpressionStart]: "IfExpression",
	[quantifiedExpressionStart]: "QuantifiedExpression"
};
var contextEnds = {
	[Context]: "Context",
	[FunctionDefinition]: "FunctionDefinition",
	[ForExpression]: "ForExpression",
	[List$1]: "List",
	[IfExpression]: "IfExpression",
	[QuantifiedExpression]: "QuantifiedExpression",
	[PathExpression]: "PathExpression",
	[FunctionInvocation]: "FunctionInvocation",
	[FilterExpression]: "FilterExpression",
	[ArithmeticExpression]: "ArithmeticExpression"
};
var ValueProducer = class ValueProducer {
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
var dateTimeIdentifiers = Object.keys({
	"date and time": 1,
	"date": 1,
	"time": 1,
	"duration": 1
});
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
var VariableContext = class {
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
var Variables = class Variables {
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
	resolveName(name) {
		const variable = this.tokens.join(" ");
		const parentScope = this.assign({ tokens: [] });
		const variableScope = this.of({
			name,
			parent: parentScope,
			value: this.get(variable),
			raw: variable
		});
		LOG_VARS && console.log("[%s] resolve %s <%s=%s>", name, variableScope.path, variable, variableScope.value);
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
			if (term === List$1) variables = variables.assign({ value: Context.of(...variables.children.map((c) => c?.computedValue())) });
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
			if (term === VariableName) return variables.resolveName("VariableName");
			if (term === PathName) return variables.resolveName("PathName");
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
var variableTracker = trackVariables({});
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
var feelHighlighting = styleTags({
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
	"\"?\"": tags.self,
	"DateTimeConstructor! SpecialFunctionName!": tags.standard(tags.function(tags.variableName)),
	"FunctionInvocation/VariableName!": tags.function(tags.variableName),
	"Name!": tags.definition(tags.variableName),
	"Key/Name! ContextEntryType/Name!": tags.definition(tags.propertyName),
	"PathExpression/PathName!": tags.propertyName,
	"FormalParameter/ParameterName!": tags.function(tags.definition(tags.variableName)),
	"( )": tags.paren,
	"[ ]": tags.squareBracket,
	"{ }": tags.brace,
	".": tags.derefOperator,
	", ;": tags.separator,
	"..": tags.punctuation
});
var spec_identifier = {
	__proto__: null,
	for: 10,
	in: 34,
	return: 40,
	if: 44,
	then: 46,
	else: 48,
	some: 52,
	every: 54,
	satisfies: 60,
	or: 64,
	and: 68,
	between: 76,
	instance: 90,
	of: 93,
	days: 105,
	time: 107,
	duration: 109,
	years: 111,
	months: 113,
	date: 115,
	list: 121,
	context: 127,
	function: 134,
	null: 162,
	true: 332,
	false: 332,
	"?": 176,
	external: 192,
	not: 217
};
var parser$4 = LRParser.deserialize({
	version: 14,
	states: "CvO`QYOOO`QYOOO$yQYOOOOQU'#Ce'#CeO%TQYO'#C`O&^QYO'#FTOOQQ'#Ff'#FfO&hQYO'#FfO`QYO'#DXOOQU'#Eq'#EqO(_Q^O'#D_OOQU'#D`'#D`OOQU'#D_'#D_OOQO'#Fn'#FnO*[QWO'#DyOOQQ'#EQ'#EQOOQQ'#ER'#EROOQQ'#ES'#ESO*aOWO'#EVO*[QWO'#ETOOQQ'#ET'#ETOOQQ'#Ft'#FtOOQQ'#Fr'#FrOOQQ'#Fz'#FzOOQQ'#EX'#EXO`QYO'#EZOOQQ'#FV'#FVO*iQ^O'#FVO,`QYO'#E[O,gQWO'#E]OOQP'#GO'#GOO,lQXO'#EdOOQQ'#F{'#F{OOQQ'#FU'#FUQOQWOOOOQQ'#FW'#FWOOQQ'#F_'#F_O`QYO'#CqOOQQ'#F`'#F`O%TQYO'#CuO,zQYO'#DzOOQQ'#Fs'#FsO-PQYO'#EUOOQO'#EU'#EUO`QYO'#EYO`QYO'#EXOOQO'#F|'#F|Q-XQWOOO-^QYO'#DTO.TQWO'#FbOOQO'#DV'#DVO.`QYO'#FfO.gQWOOO/^QYO'#CdO/kQYO'#FYOOQQ'#Cc'#CcO/pQYO'#FXOOQQ'#Cb'#CbO/xQYO,58zO`QYO,59kOOQQ'#Fc'#FcOOQQ'#Fd'#FdOOQQ'#Fe'#FeO`QYO,59sO`QYO,59sO`QYO,59sOOQQ'#Fl'#FlO/}QYO,5:`OOQQ'#Fm'#FmO`QYO,5:cO`QYO,59gO`QYO,59iO`QYO,59kO1|QYO,59kO2TQYO,59tOOQQ,5:l,5:lO2YQYO,59sOOQU-E8o-E8oO3|QYO'#FoOOQQ,5:e,5:eOOQQ,5:q,5:qOOQQ,5:o,5:oO4TQYO,5:uOOQQ,5;q,5;qO4_QYO,5:tO4lQWO,5:vO4qQYO,5:wOOQP'#Eh'#EhO5hQXO'#EgOOQO'#Ef'#EfO5oQWO'#EeO5tQWO'#GPO5|QWO,5;OO6RQYO,59]OOQQ'#Cy'#CyO6YQYO'#FaOOQQ'#Cx'#CxO6bQYO,59aO6gQYO,5:fO6lQYO,5:pO6qQYO,5:tO6xQYO,5:sO`QYO'#EzQ-XQWOOO`QYO'#EpO7oQWO,5;|O`QYOOOOQR'#Cf'#CfOOQQ'#Em'#EmO8iQYO,59OO`QYO,5;tOOQQ'#F['#F[O%TQYO'#EnO8yQYO,5;sO`QYO1G.fOOQQ'#F^'#F^O9pQYO1G/VO<gQYO1G/_O<qQYO1G/_O<{QYO1G/_O>oQYO'#DuOOQQ'#Du'#DuOOQQ1G/z1G/zO@iQYO1G/}O@pQYO1G/ROAyQYO1G/TOCSQYO1G/VO`QYO1G/VOOQQ1G/V1G/VOCjQYO1G/`ODXQ^O'#CdOEkQYO'#FqOOQO'#D}'#D}OEuQWO'#D|OEzQWO'#FpOOQO'#D{'#D{OOQO'#EO'#EOOFSQWO,5<ZOOQQ1G0a1G0aO`QYO1G0`O`QYO'#EvOFXQWO,5<]OOQQ1G0b1G0bOFdQWO'#E_OFoQWO'#F}OOQO'#E^'#E^OFwQWO1G0cOOQP'#Ex'#ExOF|QXO,5;RO`QYO,5;POGTQXO'#EyOG`QWO,5<kOOQQ1G0j1G0jO`QYO1G.wO%TQYO'#EoOGhQYO,5;{O`QYO1G.{OGpQYO1G0QOOQO1G0[1G0[OOQO,5;f,5;fOOQO-E8x-E8xOOQO,5;[,5;[OOQO-E8n-E8nOGuQWOOOOQQ-E8k-E8kOGzQYO'#CnOOQQ1G1`1G1`OOQQ,5;Y,5;YOOQQ-E8l-E8lOH[QYO7+$QOOQQ7+%i7+%iO`QYO7+$qOIRQYO,5:uOI`QWO7+$qOIeQYO'#D^OOQQ'#D]'#D]OKXQYO'#DaOK^QYO'#DaOKcQYO'#DaOKhQ`O'#DiOKmQ`O'#DlOKrQ`O'#DpOOQQ7+$z7+$zO`QYO,5:hO%TQYO'#EuOKwQWO,5<[OOQQ1G1u1G1uOL}QYO7+%zOM[QYO,5;bOOQO-E8t-E8tOCjQYO,5:yO%TQYO'#EwOMiQWO,5<iOMqQYO7+%}OOQP-E8v-E8vOMxQYO1G0kOOQO,5;e,5;eOOQO-E8w-E8wONSQYO7+$cOOQQ,5;Z,5;ZOOQQ-E8m-E8mONZQYO7+$gOOQO7+%l7+%lO`QYO,59YO! QQYO<<H]OOQQ<<H]<<H]O/}QYO'#ErO!!ZQYO,59xO!#}QYO,59{O!$SQYO,59{O!$XQYO,59{O!$^QYO,5:TO%TQYO,5:WO!${QbO,5:[O!%SQYO1G0SOOQO,5;a,5;aOOQO-E8s-E8sO!%^QYO<<IfOOQQ<<If<<IfOOQO1G0e1G0eOOQO,5;c,5;cOOQO-E8u-E8uO!(`QYO'#EaOOQQ<<Ii<<IiO`QYO<<IiO`QYO<<G}O!)VQYO1G.tOOQQ,5;^,5;^OOQQ-E8p-E8pO!)dQYO1G/gOOQQ1G/g1G/gO!)iQbO'#D_O!)zQ`O'#D^O!*VQ`O1G/oO!*[QWO'#DoO!*aQ`O'#FhOOQO'#Dn'#DnO!*iQ`O1G/rOOQO'#Ds'#DsO!*nQ`O'#FjOOQO'#Dr'#DrO!*vQ`O1G/vOOQQAN?TAN?TO!*{QYOAN=iOOQQ7+%R7+%RO!+rQ`O,59xOOQQ7+%Z7+%ZO!$^QYO,5:ZO%TQYO'#EsO!+}Q`O,5<SOOQQ7+%^7+%^O!$^QYO'#EtO!,VQ`O,5<UO!,_Q`O7+%bOOQO1G/u1G/uOOQO,5;_,5;_OOQO-E8q-E8qOOQO,5;`,5;`OOQO-E8r-E8rOCjQYO<<H|OOQQAN>hAN>hO/}QYO'#ErO!$^QYO<<H|O!,dQ`O7+%bO!,iQ`O1G/vO!${QbO,5:[O!,nQ`O'#Dp",
	stateData: "!-R~O#uOS#vOSPOSQOS~OTsO[VO]UOftOjvOkvOt}Ou}OxiO!V{O!W{O!XxO!ZzO!e!OO!j|O!lgO!syO!zjO#VnO#qRO#rRO$ZZO$i_O$j`O$k`O$laO$mbO~OTsO]UOftOjvOkvOt}Ou}OxiO!V{O!W{O!XxO!ZzO!e!OO!j|O!lgO!syO!zjO#VnO#qRO#rRO$ZZO$i_O$j`O$k`O$laO$mbO~O[!TO#`!UO~P#VO#qRO#rRO~OZ!dO[!^O]!^O^!_O_!_O`!`Oa!kOp!hOr!iOt!]Ou!]Ov!jO}!lO!l!fOx$bX~O#o#wX$t#wX~P%]O$i!mOT$YX[$YX]$YXf$YXj$YXk$YXt$YXu$YXx$YX!V$YX!W$YX!X$YX!Z$YX!e$YX!j$YX!l$YX!s$YX!z$YX#V$YX#q$YX#r$YX$Z$YX$j$YX$k$YX$l$YX$m$YX~O#qRO#rROZ!RX[!RX]!RX^!RX_!RX`!RXa!RXp!RXr!RXt!RXu!RXv!RXx!RX}!RX!l!RX#o!RX#s!RX$t!RX$P!RXc!RXz!RX!j!RXg!RXd!RX#U!RXh!RXn!RX~Ox!pO~O$j`O$k`O~O#s!uOZ#yX[#yX]#yX^#yX_#yX`#yXa#yXp#yXr#yXt#yXu#yXv#yXx#yX}#yX!l#yX#o#yX$t#yX$P#yXc#yXz#yX!j#yXg#yXd#yX#U#yXh#yXn#yX~O!j$eP~P`Ox!xO~O#p!yO$j`O$k`O#U$sP~Or#UO~Or#VOx!xX~O$t#YO~O#owX$PwX$twXzwXcwX!jwXgwXdwX#UwXhwXnwX~P%]O$P#[O#o$UXz$UX~O#o#_X~P&hOx#^O~OZ#_O[#_O]#_O^#_O_#_O`#_O#qRO#rRO#}#_O$]WX~OaWXzWX$PWX~P.lOa#cO~O$P#dOd#{X~Od#gO~O#qRO#rRO$ZZO~OTsO[VO]UOftOjvOkvOt}Ou}O!V{O!W{O!XxO!ZzO!e!OO!j|O!lgO!syO!zjO#VnO#qRO#rRO$ZZO$i_O$j`O$k`O$laO$mbO~Ox#sO~P0YO!O#uO~OZ!dO}!lO!l!fO[{a]{a^{a_{a`{aa{ap{ar{at{au{av{ax$bX#o{a$t{a$P{ac{az{a!j{ag{ad{a#U{ah{an{a~Oz$eP~P`Oc$POz$OO~P%]Oc$PO$P$QO!j$eX~P%]O!j$SO~O#qRO#rROz$qP~OZ#_O[#_O]#_O^#_O_#_O`#_O#p!yO#}#_O~O$]#ZX~P4|O$]$ZO~O$P$[O#U$sX~O#U$^O~Og$_O~P%]O$P$`On$TX~On$bO~O!Y$cO~O!V$dO~Oc$PO~P%]O#o!{a$t!{a$P!{ac!{az!{a!j!{ag!{ad!{a#U!{ah!{an!{a~P%]O$P#[O#o$Uaz$Ua~OZ#_O[#_O]#_O^#_O_#_O`#_O#qRO#rRO#}#_O~OaWa$]WazWa$PWa~P7zO$P#dOd#{a~OZ!dO[!^O]!^O^!_O_!_O`!`O}!lO!l!fOx$bX~Oasipsirsitsiusivsi#osi$tsi$Psicsizsi!jsigsidsi#Usihsinsi~P9ROZ!dO`!`O}!lO!l!fO[{i]{ia{ip{ir{it{iu{iv{ix$bX#o{i$t{i$P{ic{iz{i!j{ig{id{i#U{ih{in{i~O^!_O_!_O~P:yO^{i_{i~P:yOZ!dO}!lO!l!fO[{i]{i^{i_{i`{ia{ip{ir{it{iu{iv{ix$bX#o{i$t{i$P{ic{iz{i!j{ig{id{i#U{ih{in{i~O#qRO#rROZ!iX[!iX]!iX^!iX_!iX`!iXa!iXp!iXr!iXt!iXu!iXv!iXx!iX}!iX!l!iX#o!iX$t!iX$P!iXc!iXz!iX!j!iXg!iXd!iX#U!iXh!iXn!iX~O!j$pO~P%]Oa!kOr!iOt!]Ou!]Ov!jOpoi#ooi$toi$Poicoizoi!joigoidoi#Uoihoinoi~P9ROa!kOt!]Ou!]Ov!jOpqirqi#oqi$tqi$Pqicqizqi!jqigqidqi#Uqihqinqi~P9ROa!kOp!hOr$qOt!]Ou!]Ov!jO~P9RO!U$vO!X$wO!Z$xO!^$yO!a$zO!e${O#qRO#rRO$ZZO~OZ#eX[#eX]#eX^#eX_#eX`#eXa#eXp#eXr#eXt#eXu#eXv#eXx#eXz#eX}#eX!l#eX#q#eX#r#eX#s#eX$P#eX~P.lO$P$QOz$eX~P%]O$]$}O~O$P%OOz$dX~Oz%QO~O$P$QO!j$eaz$ea~O$]%UOz#RX$P#RX~O$P%VOz$qX~Oz%XO~O$]#Za~P4|O#p!yO$j`O$k`O~O$P$[O#U$sa~O$P$`On$Ta~O!W%bO~OzrO~Oc%cOdbX$PbXnbX~P%]O#oSq$tSq$PSqcSqzSq!jSqgSqdSq#USqhSqnSq~P%]Oc$POz$OO$PwX~P%]Oz%eO~OZ%fO[!QX]!QX^!QX_!QX`!QXa!QXp!QXr!QXt!QXu!QXv!QXx!QX}!QX!l!QX#o!QX$t!QX$P!QXc!QXz!QX!j!QXg!QXd!QX#U!QXh!QXn!QX~Or%hO~Or%iO~Or%jO~O!_%kO~O!_%lO~O!_%mO~O$P%OOz$da~OZ!dO[!^O]!^O^!_O_!_O`!`Oa!kOp!hOr!iOt!]Ou!]Ov!jO}!lOx$bX~Oz%rO!j%rO!l%qO~PLPO!j#ja$P#jaz#ja~P%]O$P%VOz$qa~O#S%xO~P`O#U#Xi$P#Xi~P%]Oh%yO~P%]O#oiq$tiq$Piqciqziq!jiqgiqdiq#Uiqhiqniq~P%]Oasypsyrsytsyusyvsy#osy$tsy$Psycsyzsy!jsygsydsy#Usyhsynsy~P9ROZ%fO[!Qa]!Qa^!Qa_!Qa`!Qaa!Qap!Qar!Qat!Qau!Qav!Qax!Qa}!Qa!l!Qa#o!Qa$t!Qa$P!Qac!Qaz!Qa!j!Qag!Qad!Qa#U!Qah!Qan!Qa~O!V%}O~O!Y%}O~O!V&OO~O!U$vO!X$wO!Z$xO!^$yO!a$zO!e&tO#qRO#rRO$ZZO~O![$^P~P!$^Oz!pi$P!pi~P%]OT$aXZ!|y[$aX]$aX^!|y_!|y`!|ya!|yf$aXj$aXk$aXp!|yr!|yt$aXu$aXv!|yx$aX}!|y!V$aX!W$aX!X$aX!Z$aX!e$aX!j$aX!l$aX!s$aX!z$aX#V$aX#o!|y#q$aX#r$aX$Z$aX$i$aX$j$aX$k$aX$l$aX$m$aX$t!|y$P!|yc!|yz!|yg!|yd!|y#U!|yh!|yn!|y~O#o#TX$t#TX$P#TXc#TXz#TX!j#TXg#TXd#TX#U#TXh#TXn#TX~P%]Odbi$Pbinbi~P%]O!W&^O~O#qRO#rROZ!RX![!RX$P!RX~OZ&oO![!QX$P!QX~O![&`O~O$]&aO~O$P&bO![$[X~O![&dO~O$P&eO![$^X~O![&gO~O#oe!R$te!R$Pe!Rce!Rze!R!je!Rge!Rde!R#Ue!Rhe!Rne!R~P%]OZ&oO![!Qa$P!Qa~O$P&bO![$[a~O$P&eO![$^a~O$_&mO~O$_&pO~O![&qO~O!_&sO~O$Z$j~$j$k`_$iZQP^Q~",
	goto: "E`$tPPPP$uP%m%p%v&W'qPPPPPPP'zPP$uPPP$uPP'}(QP$uP$uP$uPPP(WP(cP$u$uPP(l)R)^*g)RPPPPPPP)RPP)RP+m+p)RP+v+|$u,TP$uP$u,W-O-R-X-OP-a.X-a-a/W0OP$u0v$u1n1n2f2iP2oPP1n2u2{/S3PPP3XP3[3c3i3o3u5S5^5d5j5p5w5}6T6ZPPPPPPPP6a6j8n9f:^:aP:iP:l:o;g<_<b<g=T=r>bP?YP?]P?a@R@sAkAqAt$uAzAzPPPPPBr8nCjDbDeE]!kjOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%yR![SQ!YSR$m#dW!WSw#d$`W#x!p!x%O%VT&S%l&b#WXOPQWYilu|}!]!a!b!c!e!g!h!i!j!k#Y#[#^#b#f#l#s#u$P$Q$Z$_$b$q$}%U%X%c%f%k%m%x%y&P&a&e&m&o&p&sb!VSw!x#d$`%O%V%l&bU#`!V#a#vR#v!pU#`!V#a#vT$X!z$YR$l#bR#TwQ#RwR%_$`U!RQ#^#sQ#t!kR$g#[QrQQ$i#^R$s#sQ$|#uQ%s%UQ&R%kU&W%m&e&sQ&h&aT&n&m&pc$u#u%U%k%m&a&e&m&p&s!jkOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%yU$t#u%U&mS%{%f&o]&Q%k%m&a&e&p&s#Q[OPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s#u$P$Q$Z$_$b$q$}%U%X%c%f%k%m%x%y&a&e&m&o&p&sR#m!eR&V%lQ&T%lR&i&bQ&Z%mR&r&sS&X%m&sR&k&eR#n!e!k]OPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%yR#}!pQ#z!pR%o%OS#y!p%OT$T!x%V!keOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%y!jeOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%yQ!rbT!{o$[!kcOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%y!kdOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%y!khOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%y!kpOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%yR$W!xQ$U!xR%t%VQ%w%XR&[%xQ!}oR%[$[T!|o$[S!zo$[T$X!z$YRrQS#a!V#vR$j#aQ#e!YR$n#eQ$a#RR%`$aQ#]!RR$h#]!rYOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s#u$P$Q$Z$_$b$q$}%U%X%c%f%x%y&mU!oY#l&PQ#l!e_&P%k%m&a&e&o&p&sQ%g$tS%|%g&_R&_&QQ&c&TR&j&cQ&f&XR&l&fQ%P#zR%p%PS$R!v#wR%T$RQ%W$UR%u%WQ$Y!zR%Y$YQ$]!}R%]$]Q#Z!PR$f#ZQrOQ!PPR$e#YUTOP#YW!QQ!k#[#^Q!nWQ!tiQ!vlQ#PuQ#W|Q#X}Q#h!]Q#i!aQ#j!bQ#k!cQ#o!gQ#p!hQ#q!iQ#r!jQ#w!pQ$k#bQ$o#fQ$r#sQ%R$PQ%S$QQ%Z$ZQ%^$_Q%a$bQ%d$qQ%n$}S%v%X%xQ%z%cR&]%y!kqOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%y!kSOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%yR!ZSS!XS#dT#Qw$`R#b!WR#f![!kuOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%y!kwOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%yR#SwV!SQ#^#s!V!aT!Q!t!v#P#W#X#h#o#p#q#r#w$k$o$r%R%S%Z%^%a%d%n%v%z&]!X!bT!Q!t!v#P#W#X#h#i#o#p#q#r#w$k$o$r%R%S%Z%^%a%d%n%v%z&]!Z!cT!Q!t!v#P#W#X#h#i#j#o#p#q#r#w$k$o$r%R%S%Z%^%a%d%n%v%z&]!kWOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%yR&U%lT&Y%m&s!_!eT!Q!n!t!v#P#W#X#h#i#j#k#o#p#q#r#w$k$o$r%R%S%Z%^%a%d%n%v%z&]!_!gT!Q!n!t!v#P#W#X#h#i#j#k#o#p#q#r#w$k$o$r%R%S%Z%^%a%d%n%v%z&]!k^OPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%yQ!q^R!scR#{!pQ!wlR#|!p!kfOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%y!klOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%y!kmOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%yR$V!x!koOPQWilu|}!]!a!b!c!g!h!i!j!k!p#Y#[#^#b#f#s$P$Q$Z$_$b$q$}%X%c%x%yR#Oo",
	nodeNames: "⚠ LineComment BlockComment Expression ForExpression for InExpressions InExpression Name Identifier Identifier . ArithOp ArithOp ArithOp ArithOp ArithOp in IterationContext .. return IfExpression if then else QuantifiedExpression some every InExpressions InExpression satisfies Disjunction or Conjunction and Comparison CompareOp CompareOp between PositiveUnaryTest ( PositiveUnaryTests ) ArithmeticExpression InstanceOfExpression instance of Type QualifiedName VariableName BacktickIdentifier SpecialType days time duration years months date > ListType list < ContextType context ContextEntryTypes ContextEntryType FunctionType function ArgumentTypes ArgumentType PathExpression PathName ] FilterExpression [ FunctionInvocation SpecialFunctionName NamedParameters NamedParameter ParameterName PositionalParameters null NumericLiteral StringLiteral BooleanLiteral DateTimeLiteral DateTimeConstructor AtLiteral ? SimplePositiveUnaryTest Interval ParenthesizedExpression List FunctionDefinition FormalParameters FormalParameter external FunctionBody } { Context ContextEntry Key Name Identifier Expressions UnaryTests Wildcard not",
	maxTerm: 174,
	context: variableTracker,
	nodeProps: [
		[
			"group",
			-17,
			4,
			21,
			25,
			31,
			33,
			35,
			43,
			44,
			70,
			73,
			75,
			88,
			89,
			91,
			92,
			93,
			100,
			"Expr",
			49,
			"Expr Expr",
			-5,
			81,
			82,
			83,
			84,
			85,
			"Expr Literal"
		],
		[
			"closedBy",
			40,
			")",
			74,
			"]",
			99,
			"}"
		],
		[
			"openedBy",
			42,
			"(",
			72,
			"[",
			98,
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
	tokenData: ".v~RvXY#iYZ$^Z[#i]^$^pq#iqr$crs$nwx(Wxy(]yz(bz{(g{|(t|}(y}!O)O!O!P)]!P!Q*g!Q![,b![!],y!]!^-O!^!_-T!_!`$i!`!a-d!b!c-n!}#O-s#P#Q-x#Q#R(o#S#T-}#o#p.l#q#r.q$f$g#i#BY#BZ#i$IS$I_#i$I|$I}$^$I}$JO$^$JT$JU#i$KV$KW#i&FU&FV#i?HT?HU#i~#nY#u~XY#iZ[#ipq#i$f$g#i#BY#BZ#i$IS$I_#i$JT$JU#i$KV$KW#i&FU&FV#i?HT?HU#i~$cO#v~~$fP!_!`$i~$nOt~~$qXOY$nYZ%^Zr$nrs&zs#O$n#O#P'R#P;'S$n;'S;=`(Q<%lO$n~%aVOr%^rs%vs#O%^#O#P%{#P;'S%^;'S;=`&t<%lO%^~%{O$j~~&ORO;'S%^;'S;=`&X;=`O%^~&[WOr%^rs%vs#O%^#O#P%{#P;'S%^;'S;=`&t;=`<%l%^<%lO%^~&wP;=`<%l%^~'RO$j~$k~~'URO;'S$n;'S;=`'_;=`O$n~'bYOY$nYZ%^Zr$nrs&zs#O$n#O#P'R#P;'S$n;'S;=`(Q;=`<%l$n<%lO$n~(TP;=`<%l$n~(]O#}~~(bOx~~(gOz~~(lP_~z{(o~(tO`~~(yO]~~)OO$P~R)TP[P!`!a)WQ)]O$_Q~)bQZ~!O!P)h!Q![)m~)mOc~~)rR$i~!Q![)m!g!h){#X#Y){~*OR{|*X}!O*X!Q![*_~*[P!Q![*_~*dP$i~!Q![*_~*lQ^~z{*r!P!Q+y~*uTOz*rz{+U{;'S*r;'S;=`+s<%lO*r~+XVOz*rz{+U{!P*r!P!Q+n!Q;'S*r;'S;=`+s<%lO*r~+sOQ~~+vP;=`<%l*r~,OSP~OY+yZ;'S+y;'S;=`,[<%lO+y~,_P;=`<%l+y~,gS$i~!O!P,s!Q![,b!g!h){#X#Y){~,vP!Q![)m~-OO$]~~-TO$t~R-[P!_QuP!_!`-_P-dOuPR-kP![QuP!_!`-_~-sO$m~~-xO!l~~-}O!j~~.QTO#S-}#S#T.a#T;'S-};'S;=`.f<%lO-}~.fO$Z~~.iP;=`<%l-}~.qO#V~~.vO#U~",
	tokenizers: [
		propertyIdentifiers,
		identifiers,
		insertSemicolon,
		0,
		1
	],
	topRules: {
		"Expression": [0, 3],
		"Expressions": [1, 105],
		"UnaryTests": [2, 106]
	},
	dialects: { camunda: 2657 },
	dynamicPrecedences: {
		"33": -1,
		"70": 1,
		"75": -1,
		"77": -1
	},
	specialized: [{
		term: 125,
		get: (value) => spec_identifier[value] || -1
	}],
	tokenPrec: 2660
});
// ../../node_modules/@bpmn-io/lang-feel/dist/index.js
init_dist$4();
var snippets = [
	snippetCompletion$1("function(${params}) ${body}", {
		label: "function",
		detail: "definition",
		type: "keyword"
	}),
	snippetCompletion$1("for ${var} in ${collection} return ${value}", {
		label: "for",
		detail: "expression",
		type: "keyword"
	}),
	snippetCompletion$1("every ${var} in ${collection} satisfies ${condition}", {
		label: "every",
		detail: "quantified expression",
		type: "keyword"
	}),
	snippetCompletion$1("some ${var} in ${collection} satisfies ${condition}", {
		label: "some",
		detail: "quantified expression",
		type: "keyword"
	}),
	snippetCompletion$1("if ${condition} then ${value} else ${other value}", {
		label: "if",
		detail: "block",
		type: "keyword"
	}),
	snippetCompletion$1("{ ${key}: ${value} }", {
		label: "context",
		detail: "block",
		type: "keyword"
	}),
	snippetCompletion$1("null", {
		label: "null",
		detail: "literal",
		type: "keyword"
	}),
	snippetCompletion$1("true", {
		label: "true",
		detail: "literal",
		type: "keyword"
	}),
	snippetCompletion$1("false", {
		label: "false",
		detail: "literal",
		type: "keyword"
	})
];
function contextualKeyword(options) {
	const { context: nodes, after, before, keyword } = options;
	return ifInside({
		nodes,
		before,
		after,
		keyword
	}, completeFromList([{
		label: keyword,
		type: "keyword",
		boost: 10
	}]));
}
var keywordCompletions = [
	contextualKeyword({
		context: "InExpression",
		keyword: "in"
	}),
	contextualKeyword({
		context: "IfExpression",
		keyword: "then",
		after: "if",
		before: "else"
	}),
	contextualKeyword({
		context: "IfExpression",
		keyword: "else",
		after: "then"
	}),
	contextualKeyword({
		context: "QuantifiedExpression",
		keyword: "satisfies"
	}),
	contextualKeyword({
		context: "ForExpression",
		after: "InExpressions",
		keyword: "return"
	})
];
var dontCompleteExpression = [
	"Name",
	"StringLiteral",
	"LineComment",
	"BlockComment",
	"PathExpression",
	"Context",
	"Key",
	"ParameterName"
];
var doCompleteExpression = ["Expr", "ContextEntry"];
function ifNode(completionSource, { include, exclude }) {
	const allNodes = [...exclude, ...include];
	return (context) => {
		const { state, pos } = context;
		const match = matchUp(syntaxTree(state).resolveInner(pos, -1), allNodes);
		if (match) {
			const [_, name] = match;
			if (exclude.includes(name)) return null;
		}
		return completionSource(context);
	};
}
function ifExpression(completionSource) {
	return ifNode(completionSource, {
		include: doCompleteExpression,
		exclude: dontCompleteExpression
	});
}
function snippetCompletion(snippets) {
	return ifExpression(completeFromList(snippets));
}
function matchLeft(node, position, nodes) {
	return matchChildren(node, position, nodes, -1);
}
function matchRight(node, position, nodes) {
	return matchChildren(node, position, nodes, 1);
}
function matchChildren(node, position, nodes, direction) {
	let child = node[direction > 0 ? "childAfter" : "childBefore"](position);
	while (child) {
		if (nodes.includes(child.name)) return child;
		if (child.type.isError && child.firstChild) {
			if (nodes.includes(child.firstChild.name)) return child.firstChild;
		}
		child = child[direction > 0 ? "nextSibling" : "prevSibling"];
	}
	return null;
}
function matchUp(node, nodeNames) {
	if (!Array.isArray(nodeNames)) nodeNames = [nodeNames];
	for (; node; node = node.parent) {
		const nodeType = node.type;
		const matchedName = nodeNames.find((name) => name && nodeType.is(name));
		if (matchedName) return [node, matchedName];
		if (nodeType.isTop) break;
	}
	return null;
}
function ifInside(options, source) {
	const { nodes, before, after, keyword } = options;
	return (context) => {
		const { state, pos } = context;
		const match = matchUp(syntaxTree(state).resolveInner(pos, -1), nodes);
		if (!match) return null;
		const [node] = match;
		if (matchLeft(node, pos, [keyword, before])) return null;
		if (matchRight(node, pos, [keyword, after])) return null;
		if (after && !matchLeft(node, pos, [after])) return null;
		return source(context);
	};
}
var feelLanguage = LRLanguage.define({
	parser: parser$4.configure({ props: [indentNodeProp.add({
		"Context": delimitedIndent({ closing: "}" }),
		"List FilterExpression": delimitedIndent({ closing: "]" }),
		"ParenthesizedExpression FunctionInvocation": continuedIndent({ except: /^\s*\)/ }),
		"ForExpression QuantifiedExpression IfExpression": continuedIndent({ except: /^\s*(then|else|return|satisfies)\b/ }),
		"FunctionDefinition": continuedIndent({ except: /^\s*(\(|\))/ })
	}), foldNodeProp.add({
		Context: foldInside,
		List: foldInside,
		ParenthesizedExpression: foldInside,
		FunctionDefinition(node) {
			const last = node.getChild(")");
			if (!last) return null;
			return {
				from: last.to,
				to: node.to
			};
		}
	})] }),
	languageData: {
		indentOnInput: /^\s*(\)|\}|\]|then|else|return|satisfies)$/,
		commentTokens: {
			line: "//",
			block: {
				open: "/*",
				close: "*/"
			}
		}
	}
});
var unaryTestsLanguage = feelLanguage.configure({ top: "UnaryTests" }, "FEEL unary tests");
var expressionLanguage = feelLanguage.configure({ top: "Expression" }, "FEEL expression");
function feel$1(config = {}) {
	const language = config.dialect === "unaryTests" ? unaryTestsLanguage : expressionLanguage;
	const dialect = config.parserDialect;
	const contextTracker = trackVariables(config.context);
	const contextualLang = language.configure({
		contextTracker,
		dialect
	});
	return new LanguageSupport(contextualLang, [...(config.completions || [snippetCompletion(snippets), keywordCompletions].flat()).map((autocomplete) => contextualLang.data.of({ autocomplete }))]);
}
// ../../node_modules/@bpmn-io/feel-analyzer/dist/index.js
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
		else if (child.name === "VariableName" || child.name === "PathName") parts.push(nodeText(child, source));
	});
	return parts;
}
function getFilterBase(node) {
	const firstChild = node.firstChild;
	if (!firstChild) return null;
	if (firstChild.name === "FilterExpression") return firstChild;
	if (firstChild.name === "PathExpression") return getFilterBase(firstChild);
	return null;
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
var ITERATION_KEYWORDS$1 = new Set([
	"for",
	"return",
	"some",
	"every",
	"InExpressions",
	"satisfies"
]);
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
			const filterBase = getFilterBase(node);
			if (hasContextBase(node)) forEachChild(node, (child) => collectInputs(child, filterCtx));
			else if (filterBase) collectInputs(filterBase, filterCtx);
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
			const pathParts = collectPathParts(node, source);
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
		if (first?.name === "Context" || first?.name === "PathExpression" || first?.name === "FilterExpression") {
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
var ITERATION_KEYWORDS = new Set([
	"for",
	"return",
	"some",
	"every",
	"InExpressions",
	"satisfies"
]);
function analyzeForFunctions(node, source, builtinNames) {
	const functions = [];
	const scopes = [];
	const recordInvocation = (funcNameNode) => {
		const name = nodeText(funcNameNode, source);
		const type = !isInScope(name, scopes) && builtinNames.has(name) ? "builtin" : "user";
		const { from, to } = funcNameNode;
		functions.push({
			name,
			type,
			from,
			to
		});
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
	return functions.sort((a, b) => a.from - b.from);
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
function createContext$1(variables) {
	return variables.reduce((context, variable) => {
		context[variable.name] = () => {};
		return context;
	}, {});
}
var FeelAnalyzer = class {
	constructor(options = {}) {
		this.builtinNames = new Set(options.builtins?.map((b) => b.name) ?? []);
		const config = {
			top: options.dialect === "unaryTests" ? "UnaryTests" : "Expression",
			dialect: options.parserDialect
		};
		if (options.reservedNameBuiltins && options.reservedNameBuiltins.length > 0) config.contextTracker = trackVariables(createContext$1(options.reservedNameBuiltins));
		this.parser = parser$4.configure(config);
	}
	analyzeExpression(expression) {
		const tree = this.parser.parse(expression);
		return this.analyzeTree(tree, expression);
	}
	analyzeTree(tree, source) {
		const node = tree.topNode;
		return {
			valid: analyzeForValidity(node),
			inputs: analyzeForInputs(node, source, this.builtinNames),
			functions: analyzeForFunctions(node, source, this.builtinNames)
		};
	}
};
// ../../node_modules/@bpmn-io/feel-lint/dist/index.js
function lintSyntax(syntaxTree) {
	const lintMessages = [];
	syntaxTree.iterate({ enter: (ref) => {
		const node = ref.node;
		if (!node.type.isError) return;
		const parent = node.parent;
		const next = getNextNode(node);
		const message = {
			from: node.from,
			to: node.to,
			severity: "error",
			type: "Syntax Error"
		};
		if (node.from !== node.to) message.message = `Unrecognized token in <${parent.name}>`;
		else if (next) {
			message.message = `Unrecognized token <${next.name}> in <${parent.name}>`;
			message.to = next.to;
		} else message.message = `Incomplete <${(parent.enterUnfinishedNodesBefore(node.to) || parent).name}>`;
		lintMessages.push(message);
	} });
	return lintMessages;
}
function getNextNode(node) {
	if (!node) return null;
	return node.nextSibling || getNextNode(node.parent);
}
var RULE_NAME$1 = "first-item";
var firstItem = { create(context) {
	return { enter(node) {
		if (node.name !== "FilterExpression") return;
		const content = context.readContent(node.from, node.to);
		if (zeroIndexPattern().test(content)) {
			const { from, to } = node;
			context.report({
				from,
				to,
				message: "First item is accessed via [1]",
				severity: "warning",
				type: RULE_NAME$1,
				actions: [{
					name: "fix",
					apply(_, start = from, end = to) {
						context.updateContent(start, end, content.replace(zeroIndexPattern(), "[1]"));
					}
				}]
			});
		}
	} };
} };
function zeroIndexPattern() {
	return /\[\s*0\s*\]$/;
}
var RULES = [firstItem];
function lintRules(context) {
	const { readContent, syntaxTree, updateContent } = context;
	const lintMessages = [];
	const ruleContext = {
		readContent,
		report: (message) => {
			lintMessages.push(message);
		},
		updateContent
	};
	const rules = RULES.map((rule) => rule.create(ruleContext));
	syntaxTree.iterate({
		enter: (ref) => {
			for (const rule of rules) rule.enter && rule.enter(ref);
		},
		leave: (ref) => {
			for (const rule of rules) rule.leave && rule.leave(ref);
		}
	});
	return lintMessages;
}
var RULE_NAME = "compatibility";
function lintCompatibility(context = {}) {
	const { syntaxTree, expression, engines, builtins = [] } = context;
	if (!engines || !Object.keys(engines).length || !builtins.length) return [];
	const unavailable = getUnavailableBuiltins(builtins, engines);
	if (!unavailable.size) return [];
	const { valid, functions = [] } = new FeelAnalyzer({ builtins }).analyzeTree(syntaxTree, expression);
	if (!valid) return [];
	return functions.reduce((messages, fn) => {
		if (fn.type !== "builtin") return messages;
		const builtin = unavailable.get(fn.name);
		if (!builtin) return messages;
		messages.push({
			from: fn.from,
			to: fn.to,
			severity: "warning",
			type: RULE_NAME,
			message: `Function '${fn.name}' requires ${formatEngines(builtin.engines)}`
		});
		return messages;
	}, []);
}
function getUnavailableBuiltins(builtins, engines) {
	const unavailable = new Map();
	for (const builtin of builtins) if (builtin.engines && !isCompatible(builtin.engines, engines)) unavailable.set(builtin.name, builtin);
	return unavailable;
}
function formatEngines(engines) {
	return Object.entries(engines).map(([name, range]) => `${capitalize(name)} ${range}`).join(", ");
}
function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
function lintAll$1(context) {
	return [
		...lintSyntax(context.syntaxTree),
		...lintRules(context),
		...lintCompatibility(context)
	];
}
var cmFeelLinter = ({ builtins = [], engines } = {}) => (editorView) => {
	if (editorView.state.doc.length === 0) return [];
	return lintAll$1({
		syntaxTree: syntaxTree(editorView.state),
		expression: editorView.state.doc.toString(),
		builtins,
		engines,
		readContent: (from, to) => editorView.state.sliceDoc(from, to),
		updateContent: (from, to, content) => editorView.dispatch({ changes: {
			from,
			to,
			insert: content
		} })
	}).map((message) => ({
		...message,
		source: message.type
	}));
};
// ../../node_modules/@camunda/feel-builtins/dist/index.js
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
// ../../node_modules/@bpmn-io/feel-editor/dist/index.js
init_dist$4();
var theme = [EditorView.theme({
	"& .cm-content": { padding: "0px" },
	"& .cm-line": { padding: "0px" },
	"&.cm-editor.cm-focused": { outline: "none" },
	"& .cm-completionInfo": {
		whiteSpace: "pre-wrap",
		overflow: "hidden",
		textOverflow: "ellipsis"
	},
	"&.cm-editor": { height: "100%" },
	"& .cm-completionInfo > *": { whiteSpace: "normal" },
	"& .cm-completionInfo ul": {
		margin: 0,
		paddingLeft: "15px"
	},
	"& .cm-completionInfo pre": {
		marginBottom: 0,
		whiteSpace: "pre-wrap"
	},
	"& .cm-completionInfo p": { marginTop: 0 },
	"& .cm-completionInfo p:not(:last-of-type)": { marginBottom: 0 }
}), feelLight];
function _isEmpty(node) {
	return node && node.from === node.to;
}
function isEmpty(node, pos) {
	const nextNode = node.nextSibling;
	return _isEmpty(node) || nextNode && nextNode.from === pos && _isEmpty(nextNode);
}
function isVariableName(node) {
	return node && node.parent && node.parent.name === "VariableName";
}
function isPathExpression(node) {
	if (!node) return false;
	if (node.name === "PathExpression") return true;
	return isPathExpression(node.parent);
}
function pathExpressionCompletion({ variables }) {
	return (context) => {
		const nodeBefore = syntaxTree(context.state).resolve(context.pos, -1);
		if (!isPathExpression(nodeBefore)) return null;
		const expression = findPathExpression(nodeBefore);
		const from = nodeBefore === expression || nodeBefore.name === "." ? context.pos : nodeBefore.from;
		const path = getPath(expression, context);
		let options = variables;
		for (var i = 0; i < path.length - 1; i++) {
			var childVar = options.find((val) => val.name === path[i].name);
			if (!childVar) return null;
			if (childVar.isList !== "optional" && !!childVar.isList !== path[i].isList) return null;
			options = childVar.entries;
		}
		if (!options) return null;
		return {
			from,
			options: options.map((option) => ({
				label: option.name,
				type: "variable",
				info: option.info,
				detail: option.detail
			}))
		};
	};
}
function findPathExpression(node) {
	while (node) {
		if (node.name === "PathExpression") return node;
		node = node.parent;
	}
}
function getPath(node, context) {
	let path = [];
	for (let child = node.firstChild; child; child = child.nextSibling) {
		if (child.name === ".") continue;
		if (child.name === "PathExpression") path.push(...getPath(child, context));
		else if (child.name === "FilterExpression") path.push(...getFilter(child, context));
		else path.push({
			name: getNodeContent(child, context),
			isList: false
		});
	}
	return path;
}
function getFilter(node, context) {
	const list = node.firstChild;
	if (list.name === "PathExpression") {
		const path = getPath(list, context);
		const last = path[path.length - 1];
		last.isList = true;
		return path;
	}
	return [{
		name: getNodeContent(list, context),
		isList: true
	}];
}
function getNodeContent(node, context) {
	return context.state.sliceDoc(node.from, node.to);
}
function variableCompletion({ variables = [], builtins = [] }) {
	const options = getVariableSuggestions(variables, builtins);
	const validFor = /^[\w ]*$/;
	if (!options.length) return (context) => null;
	return (context) => {
		const { pos, state } = context;
		const nodeBefore = syntaxTree(state).resolve(pos, -1);
		if (isEmpty(nodeBefore, pos)) {
			if (isPathExpression(nodeBefore)) return null;
			return context.explicit ? {
				from: pos,
				options,
				validFor
			} : null;
		}
		if (!isVariableName(nodeBefore) || isPathExpression(nodeBefore)) return null;
		const typedInput = typeof context.matchBefore === "function" ? context.matchBefore(/\w[\w ]*$/) : null;
		return {
			from: typedInput ? typedInput.from : nodeBefore.from,
			options,
			validFor
		};
	};
}
function getVariableSuggestions(variables, builtins) {
	return [].concat(variables.map((v) => createVariableSuggestion(v)), builtins.map((b) => createVariableSuggestion(b)));
}
function createVariableSuggestion(variable, boost) {
	if (variable.type === "function") return createFunctionVariable(variable, boost);
	return {
		label: variable.name,
		type: "variable",
		info: variable.info,
		detail: variable.detail,
		boost
	};
}
function createFunctionVariable(variable, boost) {
	const { name, info, detail, params = [] } = variable;
	const paramsWithNames = params.map(({ name, type }, index) => ({
		name: name || `param ${index + 1}`,
		type
	}));
	return snippetCompletion$1(`${name}(${paramsWithNames.map((p) => "${" + p.name + "}").join(", ")})`, {
		label: `${name}(${paramsWithNames.map(({ name, type }) => type ? `${name}: ${type}` : name).join(", ")})`,
		type: "function",
		info,
		detail,
		boost
	});
}
function snippetCompletions() {
	return snippetCompletion(snippets);
}
function completions({ variables = [], builtins = [] }) {
	return [
		pathExpressionCompletion({ variables }),
		variableCompletion({
			variables,
			builtins
		}),
		snippetCompletions(),
		...keywordCompletions
	];
}
function language(options) {
	return feel$1(options);
}
function createContext(variables) {
	return variables.slice().reverse().reduce((context, builtin) => {
		context[builtin.name] = () => {};
		return context;
	}, {});
}
function lintExtension({ builtins = [], engines } = {}) {
	return linter(cmFeelLinter({
		builtins,
		engines
	}));
}
var builtinsFacet = Facet.define();
var variablesFacet = Facet.define();
var dialectFacet = Facet.define();
var parserDialectFacet = Facet.define();
var enginesFacet = Facet.define();
function configure({ dialect = "expression", parserDialect, variables = [], builtins = [], engines, completions: completions$1 }) {
	const context = createContext([...variables, ...builtins]);
	const completionSources = completions$1 ?? completions({
		builtins: availableBuiltins(builtins, engines),
		variables
	});
	return [
		dialectFacet.of(dialect),
		builtinsFacet.of(builtins),
		variablesFacet.of(variables),
		parserDialectFacet.of(parserDialect),
		enginesFacet.of(engines),
		language({
			dialect,
			parserDialect,
			context,
			completions: completionSources
		}),
		lintExtension({
			builtins,
			engines
		})
	];
}
function availableBuiltins(builtins, engines) {
	if (!engines || !Object.keys(engines).length) return builtins;
	return builtins.filter((builtin) => !builtin.engines || isCompatible(builtin.engines, engines));
}
function get(state) {
	return {
		builtins: state.facet(builtinsFacet)[0],
		variables: state.facet(variablesFacet)[0],
		dialect: state.facet(dialectFacet)[0],
		parserDialect: state.facet(parserDialectFacet)[0],
		engines: state.facet(enginesFacet)[0]
	};
}
var domifiedBuiltins = camundaBuiltins.map((builtin) => ({
	...builtin,
	info: () => domify(builtin.info)
}));
var coreConf = new Compartment();
var placeholderConf = new Compartment();
function FeelEditor$1({ extensions: editorExtensions = [], dialect = "expression", parserDialect, container, contentAttributes = {}, tooltipContainer, onChange = () => {}, onKeyDown = () => {}, onLint = () => {}, placeholder: placeholder$1 = "", readOnly = false, value = "", builtins = domifiedBuiltins, variables = [], engines }) {
	this._events = mitt_default();
	const changeHandler = EditorView.updateListener.of((update) => {
		if (update.docChanged) onChange(update.state.doc.toString());
	});
	const lintHandler = EditorView.updateListener.of((update) => {
		const diagnosticEffects = update.transactions.flatMap((t) => t.effects).filter((effect) => effect.is(setDiagnosticsEffect));
		if (!diagnosticEffects.length) return;
		const diagnostics = diagnosticEffects.flatMap((effect) => effect.value);
		this._events.emit("lint", { diagnostics });
	});
	const keyHandler = EditorView.domEventObservers({ keydown: onKeyDown });
	if (typeof tooltipContainer === "string") tooltipContainer = document.querySelector(tooltipContainer);
	const tooltipLayout = tooltipContainer ? tooltips({ tooltipSpace: function() {
		return tooltipContainer.getBoundingClientRect();
	} }) : [];
	const extensions = [
		autocompletion(),
		coreConf.of(configure({
			dialect,
			builtins,
			variables,
			parserDialect,
			engines
		})),
		bracketMatching(),
		indentOnInput(),
		closeBrackets(),
		EditorView.contentAttributes.of(contentAttributes),
		changeHandler,
		keyHandler,
		keymap.of([...defaultKeymap]),
		lintHandler,
		tooltipLayout,
		placeholderConf.of(placeholder(placeholder$1)),
		theme,
		...editorExtensions
	];
	if (readOnly) extensions.push(EditorView.editable.of(false));
	this.on("lint", ({ diagnostics }) => onLint(diagnostics));
	this._cmEditor = new EditorView({
		state: EditorState.create({
			doc: value,
			extensions
		}),
		parent: container
	});
	return this;
}
FeelEditor$1.prototype.setValue = function(value) {
	this._cmEditor.dispatch({ changes: {
		from: 0,
		to: this._cmEditor.state.doc.length,
		insert: value
	} });
};
FeelEditor$1.prototype.focus = function(position) {
	const cmEditor = this._cmEditor;
	cmEditor.contentDOM.focus();
	cmEditor.focus();
	if (typeof position === "number") {
		const end = cmEditor.state.doc.length;
		cmEditor.dispatch({ selection: { anchor: position <= end ? position : end } });
	}
};
FeelEditor$1.prototype.on = function(eventName, callback) {
	this._events.on(eventName, callback);
};
FeelEditor$1.prototype.off = function(eventName, callback) {
	this._events.off(eventName, callback);
};
FeelEditor$1.prototype.getSelection = function() {
	return this._cmEditor.state.selection;
};
FeelEditor$1.prototype.setVariables = function(variables) {
	const config = get(this._cmEditor.state);
	this._cmEditor.dispatch({ effects: [coreConf.reconfigure(configure({
		...config,
		variables
	}))] });
};
FeelEditor$1.prototype.setEngines = function(engines) {
	const config = get(this._cmEditor.state);
	this._cmEditor.dispatch({ effects: [coreConf.reconfigure(configure({
		...config,
		engines
	}))] });
	forceLinting(this._cmEditor);
};
FeelEditor$1.prototype.setPlaceholder = function(placeholder$1) {
	this._cmEditor.dispatch({ effects: placeholderConf.reconfigure(placeholder(placeholder$1)) });
};
// ../../node_modules/@bpmn-io/properties-panel/preact/compat/dist/compat.module.js
function g(n, t) {
	for (var e in t) n[e] = t[e];
	return n;
}
function E(n, t) {
	for (var e in n) if ("__source" !== e && !(e in t)) return !0;
	for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;
	return !1;
}
function C(n, t) {
	var e = t(), r = d({ t: {
		__: e,
		u: t
	} }), u = r[0].t, o = r[1];
	return _(function() {
		u.__ = e, u.u = t, R(u) && o({ t: u });
	}, [
		n,
		e,
		t
	]), h(function() {
		return R(u) && o({ t: u }), n(function() {
			R(u) && o({ t: u });
		});
	}, [n]), e;
}
function R(n) {
	try {
		return !((t = n.__) === (e = n.u()) && (0 !== t || 1 / t == 1 / e) || t != t && e != e);
	} catch (n) {
		return !0;
	}
	var t, e;
}
function x(n) {
	n();
}
function w(n) {
	return n;
}
function k() {
	return [!1, x];
}
var I = _;
function M(n, t) {
	this.props = n, this.context = t;
}
function N(n, e) {
	function r(n) {
		var t = this.props.ref;
		return t != n.ref && t && ("function" == typeof t ? t(null) : t.current = null), e ? !e(this.props, n) || t != n.ref : E(this.props, n);
	}
	function u(e) {
		return this.shouldComponentUpdate = r, k$1(n, e);
	}
	return u.displayName = "Memo(" + (n.displayName || n.name) + ")", u.__f = u.prototype.isReactComponent = !0, u.type = n, u;
}
(M.prototype = new C$2()).isPureReactComponent = !0, M.prototype.shouldComponentUpdate = function(n, t) {
	return E(this.props, n) || E(this.state, t);
};
var T = l.__b;
l.__b = function(n) {
	n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), T && T(n);
};
var A = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function D(n) {
	function t(t) {
		var e = g({}, t);
		return delete e.ref, n(e, t.ref || null);
	}
	return t.$$typeof = A, t.render = n, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
}
var F = function(n, t) {
	return null == n ? null : F$1(F$1(n).map(t));
};
var L = {
	map: F,
	forEach: F,
	count: function(n) {
		return n ? F$1(n).length : 0;
	},
	only: function(n) {
		var t = F$1(n);
		if (1 !== t.length) throw "Children.only";
		return t[0];
	},
	toArray: F$1
};
var O = l.__e;
l.__e = function(n, t, e, r) {
	if (n.then) {
		for (var u, o = t; o = o.__;) if ((u = o.__c) && u.__c) return t.__e ?? (t.__e = e.__e, t.__k = e.__k || []), u.__c(n, t);
	}
	O(n, t, e, r);
};
var U = l.unmount;
function V(n, t, e) {
	return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(n) {
		"function" == typeof n.__c && n.__c();
	}), n.__c.__H = null), null != (n = g({}, n)).__c && (n.__c.__P === e && (n.__c.__P = t), n.__c.__e = !0, n.__c = null), n.__k = n.__k && n.__k.map(function(n) {
		return V(n, t, e);
	})), n;
}
function W(n, t, e) {
	return n && e && (n.__v = null, n.__k = n.__k && n.__k.map(function(n) {
		return W(n, t, e);
	}), n.__c && n.__c.__P === t && (n.__e && e.appendChild(n.__e), n.__c.__e = !0, n.__c.__P = e)), n;
}
function P() {
	this.__u = 0, this.o = null, this.__b = null;
}
function j(n) {
	var t = n.__ && n.__.__c;
	return t && t.__a && t.__a(n);
}
function z(n) {
	var e, r, u, o = null;
	function i(i) {
		if (e || (e = n()).then(function(n) {
			n && (o = n.default || n), u = !0;
		}, function(n) {
			r = n, u = !0;
		}), r) throw r;
		if (!u) throw e;
		return o ? k$1(o, i) : null;
	}
	return i.displayName = "Lazy", i.__f = !0, i;
}
function B() {
	this.i = null, this.l = null;
}
l.unmount = function(n) {
	var t = n.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & n.__u && (n.type = null), U && U(n);
}, (P.prototype = new C$2()).__c = function(n, t) {
	var e = t.__c, r = this;
	r.o ??= [], r.o.push(e);
	var u = j(r.__v), o = !1, i = function() {
		o || r.__z || (o = !0, e.__R = null, u ? u(f) : f());
	};
	e.__R = i;
	var l = e.__P;
	e.__P = null;
	var f = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var n = r.state.__a;
				r.__v.__k[0] = W(n, n.__c.__P, n.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = l, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), n.then(i, i);
}, P.prototype.componentWillUnmount = function() {
	this.o = [];
}, P.prototype.render = function(n, e) {
	if (this.__b) {
		if (this.__v.__k) {
			var r = document.createElement("div"), o = this.__v.__k[0].__c;
			this.__v.__k[0] = V(this.__b, r, o.__O = o.__P);
		}
		this.__b = null;
	}
	var i = e.__a && k$1(S, null, n.fallback);
	return i && (i.__u &= -33), [k$1(S, null, e.__a ? null : n.children), i];
};
var H = function(n, t, e) {
	if (++e[1] === e[0] && n.l.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.l.size)) for (e = n.i; e;) {
		for (; e.length > 3;) e.pop()();
		if (e[1] < e[0]) break;
		n.i = e = e[2];
	}
};
function Z(n) {
	return this.getChildContext = function() {
		return n.context;
	}, n.children;
}
function Y(n) {
	var e = this, r = n.h;
	if (e.componentWillUnmount = function() {
		R$1(null, e.v), e.v = null, e.h = null;
	}, e.h && e.h !== r && e.componentWillUnmount(), !e.v) {
		for (var u = e.__v; null !== u && !u.__m && null !== u.__;) u = u.__;
		e.h = r, e.v = {
			nodeType: 1,
			parentNode: r,
			childNodes: [],
			__k: { __m: u.__m },
			contains: function() {
				return !0;
			},
			namespaceURI: r.namespaceURI,
			insertBefore: function(n, t) {
				this.childNodes.push(n), e.h.insertBefore(n, t);
			},
			removeChild: function(n) {
				this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), e.h.removeChild(n);
			}
		};
	}
	R$1(k$1(Z, { context: e.context }, n.__v), e.v);
}
function $(n, e) {
	var r = k$1(Y, {
		__v: n,
		h: e
	});
	return r.containerInfo = e, r;
}
(B.prototype = new C$2()).__a = function(n) {
	var t = this, e = j(t.__v), r = t.l.get(n);
	return r[0]++, function(u) {
		var o = function() {
			t.props.revealOrder ? (r.push(u), H(t, n, r)) : u();
		};
		e ? e(o) : o();
	};
}, B.prototype.render = function(n) {
	this.i = null, this.l = new Map();
	var t = F$1(n.children);
	n.revealOrder && "b" === n.revealOrder[0] && t.reverse();
	for (var e = t.length; e--;) this.l.set(t[e], this.i = [
		1,
		0,
		this.i
	]);
	return n.children;
}, B.prototype.componentDidUpdate = B.prototype.componentDidMount = function() {
	var n = this;
	this.l.forEach(function(t, e) {
		H(n, e, t);
	});
};
var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
var G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
var K = /[A-Z0-9]/g;
var Q = "undefined" != typeof document;
var X = function(n) {
	return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n);
};
function nn(n, t, e) {
	return t.__k ?? (t.textContent = ""), R$1(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
function tn(n, t, e) {
	return U$1(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
C$2.prototype.isReactComponent = !0, [
	"componentWillMount",
	"componentWillReceiveProps",
	"componentWillUpdate"
].forEach(function(t) {
	Object.defineProperty(C$2.prototype, t, {
		configurable: !0,
		get: function() {
			return this["UNSAFE_" + t];
		},
		set: function(n) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				value: n
			});
		}
	});
});
var en = l.event;
l.event = function(n) {
	return en && (n = en(n)), n.persist = function() {}, n.isPropagationStopped = function() {
		return this.cancelBubble;
	}, n.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, n.nativeEvent = n;
};
var rn;
var un = {
	configurable: !0,
	get: function() {
		return this.class;
	}
};
var on = l.vnode;
l.vnode = function(n) {
	"string" == typeof n.type && function(n) {
		var t = n.props, e = n.type, u = {}, o = -1 == e.indexOf("-");
		for (var i in t) {
			var l = t[i];
			if (!("value" === i && "defaultValue" in t && null == l || Q && "children" === i && "noscript" === e || "class" === i || "className" === i)) {
				var f = i.toLowerCase();
				"defaultValue" === i && "value" in t && null == t.value ? i = "value" : "download" === i && !0 === l ? l = "" : "translate" === f && "no" === l ? l = !1 : "o" === f[0] && "n" === f[1] ? "ondoubleclick" === f ? i = "ondblclick" : "onchange" !== f || "input" !== e && "textarea" !== e || X(t.type) ? "onfocus" === f ? i = "onfocusin" : "onblur" === f ? i = "onfocusout" : J.test(i) && (i = f) : f = i = "oninput" : o && G.test(i) ? i = i.replace(K, "-$&").toLowerCase() : null === l && (l = void 0), "oninput" === f && u[i = f] && (i = "oninputCapture"), u[i] = l;
			}
		}
		"select" == e && (u.multiple && Array.isArray(u.value) && (u.value = F$1(t.children).forEach(function(n) {
			n.props.selected = -1 != u.value.indexOf(n.props.value);
		})), null != u.defaultValue && (u.value = F$1(t.children).forEach(function(n) {
			n.props.selected = u.multiple ? -1 != u.defaultValue.indexOf(n.props.value) : u.defaultValue == n.props.value;
		}))), t.class && !t.className ? (u.class = t.class, Object.defineProperty(u, "className", un)) : t.className && (u.class = u.className = t.className), n.props = u;
	}(n), n.$$typeof = q, on && on(n);
};
var ln = l.__r;
l.__r = function(n) {
	ln && ln(n), rn = n.__c;
};
var fn = l.diffed;
l.diffed = function(n) {
	fn && fn(n);
	var t = n.props, e = n.__e;
	null != e && "textarea" === n.type && "value" in t && t.value !== e.value && (e.value = null == t.value ? "" : t.value), rn = null;
};
var an = { ReactCurrentDispatcher: { current: {
	readContext: function(n) {
		return rn.__n[n.__c].props.value;
	},
	useCallback: q$1,
	useContext: x$1,
	useDebugValue: P$1,
	useDeferredValue: w,
	useEffect: h,
	useId: g$1,
	useImperativeHandle: F$2,
	useInsertionEffect: I,
	useLayoutEffect: _,
	useMemo: T$1,
	useReducer: y,
	useRef: A$1,
	useState: d,
	useSyncExternalStore: C,
	useTransition: k
} } };
function sn(n) {
	return k$1.bind(null, n);
}
function hn(n) {
	return !!n && n.$$typeof === q;
}
function vn(n) {
	return hn(n) && n.type === S;
}
function dn(n) {
	return !!n && "string" == typeof n.displayName && 0 == n.displayName.indexOf("Memo(");
}
function mn(n) {
	return hn(n) ? W$1.apply(null, arguments) : n;
}
function pn(n) {
	return !!n.__k && (R$1(null, n), !0);
}
function yn(n) {
	return n && (n.base || 1 === n.nodeType && n) || null;
}
var _n = function(n, t) {
	return n(t);
};
var bn = function(n, t) {
	var r, u = l.debounceRendering;
	l.debounceRendering = function(n) {
		r = n;
	};
	try {
		var o = n(t);
		return r && r(), o;
	} finally {
		l.debounceRendering = u;
	}
};
var gn = {
	useState: d,
	useId: g$1,
	useReducer: y,
	useEffect: h,
	useLayoutEffect: _,
	useInsertionEffect: I,
	useTransition: k,
	useDeferredValue: w,
	useSyncExternalStore: C,
	startTransition: x,
	useRef: A$1,
	useImperativeHandle: F$2,
	useMemo: T$1,
	useCallback: q$1,
	useContext: x$1,
	useDebugValue: P$1,
	version: "18.3.1",
	Children: L,
	render: nn,
	hydrate: tn,
	unmountComponentAtNode: pn,
	createPortal: $,
	createElement: k$1,
	createContext: X$1,
	createFactory: sn,
	cloneElement: mn,
	createRef: M$1,
	Fragment: S,
	isValidElement: hn,
	isElement: hn,
	isFragment: vn,
	isMemo: dn,
	findDOMNode: yn,
	Component: C$2,
	PureComponent: M,
	memo: N,
	forwardRef: D,
	flushSync: bn,
	unstable_batchedUpdates: _n,
	StrictMode: S,
	Suspense: P,
	SuspenseList: B,
	lazy: z,
	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: an
};
// ../../node_modules/classnames/index.js
var require_classnames = __commonJSMin(((exports, module) => {
	/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
	*/
	(function() {
		"use strict";
		var hasOwn = {}.hasOwnProperty;
		function classNames() {
			var classes = "";
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (arg) classes = appendClass(classes, parseValue(arg));
			}
			return classes;
		}
		function parseValue(arg) {
			if (typeof arg === "string" || typeof arg === "number") return arg;
			if (typeof arg !== "object") return "";
			if (Array.isArray(arg)) return classNames.apply(null, arg);
			if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) return arg.toString();
			var classes = "";
			for (var key in arg) if (hasOwn.call(arg, key) && arg[key]) classes = appendClass(classes, key);
			return classes;
		}
		function appendClass(value, newClass) {
			if (!newClass) return value;
			if (value) return value + " " + newClass;
			return value + newClass;
		}
		if (typeof module !== "undefined" && module.exports) {
			classNames.default = classNames;
			module.exports = classNames;
		} else if (typeof define === "function" && typeof define.amd === "object" && define.amd) define("classnames", [], function() {
			return classNames;
		});
		else window.classNames = classNames;
	})();
}));
// ../../node_modules/@lezer/json/dist/index.js
var import_classnames = __toESM(require_classnames());
init_dist$3();
init_dist$2();
var jsonHighlighting = styleTags({
	String: tags.string,
	Number: tags.number,
	"True False": tags.bool,
	PropertyName: tags.propertyName,
	Null: tags.null,
	", :": tags.separator,
	"[ ]": tags.squareBracket,
	"{ }": tags.brace
});
var parser$3 = LRParser.deserialize({
	version: 14,
	states: "$bOVQPOOOOQO'#Cb'#CbOnQPO'#CeOvQPO'#ClOOQO'#Cr'#CrQOQPOOOOQO'#Cg'#CgO}QPO'#CfO!SQPO'#CtOOQO,59P,59PO![QPO,59PO!aQPO'#CuOOQO,59W,59WO!iQPO,59WOVQPO,59QOqQPO'#CmO!nQPO,59`OOQO1G.k1G.kOVQPO'#CnO!vQPO,59aOOQO1G.r1G.rOOQO1G.l1G.lOOQO,59X,59XOOQO-E6k-E6kOOQO,59Y,59YOOQO-E6l-E6l",
	stateData: "#O~OeOS~OQSORSOSSOTSOWQO_ROgPO~OVXOgUO~O^[O~PVO[^O~O]_OVhX~OVaO~O]bO^iX~O^dO~O]_OVha~O]bO^ia~O",
	goto: "!kjPPPPPPkPPkqwPPPPk{!RPPP!XP!e!hXSOR^bQWQRf_TVQ_Q`WRg`QcZRicQTOQZRQe^RhbRYQR]R",
	nodeNames: "⚠ JsonText True False Null Number String } { Object Property PropertyName : , ] [ Array",
	maxTerm: 25,
	nodeProps: [
		[
			"isolate",
			-2,
			6,
			11,
			""
		],
		[
			"openedBy",
			7,
			"{",
			14,
			"["
		],
		[
			"closedBy",
			8,
			"}",
			15,
			"]"
		]
	],
	propSources: [jsonHighlighting],
	skippedNodes: [0],
	repeatNodeCount: 2,
	tokenData: "(|~RaXY!WYZ!W]^!Wpq!Wrs!]|}$u}!O$z!Q!R%T!R![&c![!]&t!}#O&y#P#Q'O#Y#Z'T#b#c'r#h#i(Z#o#p(r#q#r(w~!]Oe~~!`Wpq!]qr!]rs!xs#O!]#O#P!}#P;'S!];'S;=`$o<%lO!]~!}Og~~#QXrs!]!P!Q!]#O#P!]#U#V!]#Y#Z!]#b#c!]#f#g!]#h#i!]#i#j#m~#pR!Q![#y!c!i#y#T#Z#y~#|R!Q![$V!c!i$V#T#Z$V~$YR!Q![$c!c!i$c#T#Z$c~$fR!Q![!]!c!i!]#T#Z!]~$rP;=`<%l!]~$zO]~~$}Q!Q!R%T!R![&c~%YRT~!O!P%c!g!h%w#X#Y%w~%fP!Q![%i~%nRT~!Q![%i!g!h%w#X#Y%w~%zR{|&T}!O&T!Q![&Z~&WP!Q![&Z~&`PT~!Q![&Z~&hST~!O!P%c!Q![&c!g!h%w#X#Y%w~&yO[~~'OO_~~'TO^~~'WP#T#U'Z~'^P#`#a'a~'dP#g#h'g~'jP#X#Y'm~'rOR~~'uP#i#j'x~'{P#`#a(O~(RP#`#a(U~(ZOS~~(^P#f#g(a~(dP#i#j(g~(jP#X#Y(m~(rOQ~~(wOW~~(|OV~",
	tokenizers: [0],
	topRules: { "JsonText": [0, 1] },
	tokenPrec: 0
});
// ../../node_modules/@codemirror/lang-json/dist/index.js
var jsonParseLinter = () => (view) => {
	try {
		JSON.parse(view.state.doc.toString());
	} catch (e) {
		if (!(e instanceof SyntaxError)) throw e;
		const pos = getErrorPosition(e, view.state.doc);
		return [{
			from: pos,
			message: e.message,
			severity: "error",
			to: pos
		}];
	}
	return [];
};
function getErrorPosition(error, doc) {
	let m;
	if (m = error.message.match(/at position (\d+)/)) return Math.min(+m[1], doc.length);
	if (m = error.message.match(/at line (\d+) column (\d+)/)) return Math.min(doc.line(+m[1]).from + +m[2] - 1, doc.length);
	return 0;
}
var jsonLanguage = LRLanguage.define({
	name: "json",
	parser: parser$3.configure({ props: [indentNodeProp.add({
		Object: continuedIndent({ except: /^\s*\}/ }),
		Array: continuedIndent({ except: /^\s*\]/ })
	}), foldNodeProp.add({ "Object Array": foldInside })] }),
	languageData: {
		closeBrackets: { brackets: [
			"[",
			"{",
			"\""
		] },
		indentOnInput: /^\s*[\}\]]$/
	}
});
function json() {
	return new LanguageSupport(jsonLanguage);
}
// ../../node_modules/@lezer/markdown/dist/index.js
init_dist$1();
init_dist$2();
var CompositeBlock = class CompositeBlock {
	static create(type, value, from, parentHash, end) {
		let hash = parentHash + (parentHash << 8) + type + (value << 4) | 0;
		return new CompositeBlock(type, value, from, hash, end, [], []);
	}
	constructor(type, value, from, hash, end, children, positions) {
		this.type = type;
		this.value = value;
		this.from = from;
		this.hash = hash;
		this.end = end;
		this.children = children;
		this.positions = positions;
		this.hashProp = [[NodeProp.contextHash, hash]];
	}
	addChild(child, pos) {
		if (child.prop(NodeProp.contextHash) != this.hash) child = new Tree(child.type, child.children, child.positions, child.length, this.hashProp);
		this.children.push(child);
		this.positions.push(pos);
	}
	toTree(nodeSet, end = this.end) {
		let last = this.children.length - 1;
		if (last >= 0) end = Math.max(end, this.positions[last] + this.children[last].length + this.from);
		return new Tree(nodeSet.types[this.type], this.children, this.positions, end - this.from).balance({ makeTree: (children, positions, length) => new Tree(NodeType.none, children, positions, length, this.hashProp) });
	}
};
var Type;
(function(Type) {
	Type[Type["Document"] = 1] = "Document";
	Type[Type["CodeBlock"] = 2] = "CodeBlock";
	Type[Type["FencedCode"] = 3] = "FencedCode";
	Type[Type["Blockquote"] = 4] = "Blockquote";
	Type[Type["HorizontalRule"] = 5] = "HorizontalRule";
	Type[Type["BulletList"] = 6] = "BulletList";
	Type[Type["OrderedList"] = 7] = "OrderedList";
	Type[Type["ListItem"] = 8] = "ListItem";
	Type[Type["ATXHeading1"] = 9] = "ATXHeading1";
	Type[Type["ATXHeading2"] = 10] = "ATXHeading2";
	Type[Type["ATXHeading3"] = 11] = "ATXHeading3";
	Type[Type["ATXHeading4"] = 12] = "ATXHeading4";
	Type[Type["ATXHeading5"] = 13] = "ATXHeading5";
	Type[Type["ATXHeading6"] = 14] = "ATXHeading6";
	Type[Type["SetextHeading1"] = 15] = "SetextHeading1";
	Type[Type["SetextHeading2"] = 16] = "SetextHeading2";
	Type[Type["HTMLBlock"] = 17] = "HTMLBlock";
	Type[Type["LinkReference"] = 18] = "LinkReference";
	Type[Type["Paragraph"] = 19] = "Paragraph";
	Type[Type["CommentBlock"] = 20] = "CommentBlock";
	Type[Type["ProcessingInstructionBlock"] = 21] = "ProcessingInstructionBlock";
	Type[Type["Escape"] = 22] = "Escape";
	Type[Type["Entity"] = 23] = "Entity";
	Type[Type["HardBreak"] = 24] = "HardBreak";
	Type[Type["Emphasis"] = 25] = "Emphasis";
	Type[Type["StrongEmphasis"] = 26] = "StrongEmphasis";
	Type[Type["Link"] = 27] = "Link";
	Type[Type["Image"] = 28] = "Image";
	Type[Type["InlineCode"] = 29] = "InlineCode";
	Type[Type["HTMLTag"] = 30] = "HTMLTag";
	Type[Type["Comment"] = 31] = "Comment";
	Type[Type["ProcessingInstruction"] = 32] = "ProcessingInstruction";
	Type[Type["Autolink"] = 33] = "Autolink";
	Type[Type["HeaderMark"] = 34] = "HeaderMark";
	Type[Type["QuoteMark"] = 35] = "QuoteMark";
	Type[Type["ListMark"] = 36] = "ListMark";
	Type[Type["LinkMark"] = 37] = "LinkMark";
	Type[Type["EmphasisMark"] = 38] = "EmphasisMark";
	Type[Type["CodeMark"] = 39] = "CodeMark";
	Type[Type["CodeText"] = 40] = "CodeText";
	Type[Type["CodeInfo"] = 41] = "CodeInfo";
	Type[Type["LinkTitle"] = 42] = "LinkTitle";
	Type[Type["LinkLabel"] = 43] = "LinkLabel";
	Type[Type["URL"] = 44] = "URL";
})(Type || (Type = {}));
var LeafBlock = class {
	constructor(start, content) {
		this.start = start;
		this.content = content;
		this.marks = [];
		this.parsers = [];
	}
};
var Line = class {
	constructor() {
		this.text = "";
		this.baseIndent = 0;
		this.basePos = 0;
		this.depth = 0;
		this.markers = [];
		this.pos = 0;
		this.indent = 0;
		this.next = -1;
	}
	forward() {
		if (this.basePos > this.pos) this.forwardInner();
	}
	forwardInner() {
		let newPos = this.skipSpace(this.basePos);
		this.indent = this.countIndent(newPos, this.pos, this.indent);
		this.pos = newPos;
		this.next = newPos == this.text.length ? -1 : this.text.charCodeAt(newPos);
	}
	skipSpace(from) {
		return skipSpace(this.text, from);
	}
	reset(text) {
		this.text = text;
		this.baseIndent = this.basePos = this.pos = this.indent = 0;
		this.forwardInner();
		this.depth = 1;
		while (this.markers.length) this.markers.pop();
	}
	moveBase(to) {
		this.basePos = to;
		this.baseIndent = this.countIndent(to, this.pos, this.indent);
	}
	moveBaseColumn(indent) {
		this.baseIndent = indent;
		this.basePos = this.findColumn(indent);
	}
	addMarker(elt) {
		this.markers.push(elt);
	}
	countIndent(to, from = 0, indent = 0) {
		for (let i = from; i < to; i++) indent += this.text.charCodeAt(i) == 9 ? 4 - indent % 4 : 1;
		return indent;
	}
	findColumn(goal) {
		let i = 0;
		for (let indent = 0; i < this.text.length && indent < goal; i++) indent += this.text.charCodeAt(i) == 9 ? 4 - indent % 4 : 1;
		return i;
	}
	scrub() {
		if (!this.baseIndent) return this.text;
		let result = "";
		for (let i = 0; i < this.basePos; i++) result += " ";
		return result + this.text.slice(this.basePos);
	}
};
function skipForList(bl, cx, line) {
	if (line.pos == line.text.length || bl != cx.block && line.indent >= cx.stack[line.depth + 1].value + line.baseIndent) return true;
	if (line.indent >= line.baseIndent + 4) return false;
	let size = (bl.type == Type.OrderedList ? isOrderedList : isBulletList)(line, cx, false);
	return size > 0 && (bl.type != Type.BulletList || isHorizontalRule(line, cx, false) < 0) && line.text.charCodeAt(line.pos + size - 1) == bl.value;
}
var DefaultSkipMarkup = {
	[Type.Blockquote](bl, cx, line) {
		if (line.next != 62) return false;
		line.markers.push(elt(Type.QuoteMark, cx.lineStart + line.pos, cx.lineStart + line.pos + 1));
		line.moveBase(line.pos + (space(line.text.charCodeAt(line.pos + 1)) ? 2 : 1));
		bl.end = cx.lineStart + line.text.length;
		return true;
	},
	[Type.ListItem](bl, _cx, line) {
		if (line.indent < line.baseIndent + bl.value && line.next > -1) return false;
		line.moveBaseColumn(line.baseIndent + bl.value);
		return true;
	},
	[Type.OrderedList]: skipForList,
	[Type.BulletList]: skipForList,
	[Type.Document]() {
		return true;
	}
};
function space(ch) {
	return ch == 32 || ch == 9 || ch == 10 || ch == 13;
}
function skipSpace(line, i = 0) {
	while (i < line.length && space(line.charCodeAt(i))) i++;
	return i;
}
function skipSpaceBack(line, i, to) {
	while (i > to && space(line.charCodeAt(i - 1))) i--;
	return i;
}
function isFencedCode(line) {
	if (line.next != 96 && line.next != 126) return -1;
	let pos = line.pos + 1;
	while (pos < line.text.length && line.text.charCodeAt(pos) == line.next) pos++;
	if (pos < line.pos + 3) return -1;
	if (line.next == 96) {
		for (let i = pos; i < line.text.length; i++) if (line.text.charCodeAt(i) == 96) return -1;
	}
	return pos;
}
function isBlockquote(line) {
	return line.next != 62 ? -1 : line.text.charCodeAt(line.pos + 1) == 32 ? 2 : 1;
}
function isHorizontalRule(line, cx, breaking) {
	if (line.next != 42 && line.next != 45 && line.next != 95) return -1;
	let count = 1;
	for (let pos = line.pos + 1; pos < line.text.length; pos++) {
		let ch = line.text.charCodeAt(pos);
		if (ch == line.next) count++;
		else if (!space(ch)) return -1;
	}
	if (breaking && line.next == 45 && isSetextUnderline(line) > -1 && line.depth == cx.stack.length && cx.parser.leafBlockParsers.indexOf(DefaultLeafBlocks.SetextHeading) > -1) return -1;
	return count < 3 ? -1 : 1;
}
function inList(cx, type) {
	for (let i = cx.stack.length - 1; i >= 0; i--) if (cx.stack[i].type == type) return true;
	return false;
}
function isBulletList(line, cx, breaking) {
	return (line.next == 45 || line.next == 43 || line.next == 42) && (line.pos == line.text.length - 1 || space(line.text.charCodeAt(line.pos + 1))) && (!breaking || inList(cx, Type.BulletList) || line.skipSpace(line.pos + 2) < line.text.length) ? 1 : -1;
}
function isOrderedList(line, cx, breaking) {
	let pos = line.pos, next = line.next;
	for (;;) {
		if (next >= 48 && next <= 57) pos++;
		else break;
		if (pos == line.text.length) return -1;
		next = line.text.charCodeAt(pos);
	}
	if (pos == line.pos || pos > line.pos + 9 || next != 46 && next != 41 || pos < line.text.length - 1 && !space(line.text.charCodeAt(pos + 1)) || breaking && !inList(cx, Type.OrderedList) && (line.skipSpace(pos + 1) == line.text.length || pos > line.pos + 1 || line.next != 49)) return -1;
	return pos + 1 - line.pos;
}
function isAtxHeading(line) {
	if (line.next != 35) return -1;
	let pos = line.pos + 1;
	while (pos < line.text.length && line.text.charCodeAt(pos) == 35) pos++;
	if (pos < line.text.length && line.text.charCodeAt(pos) != 32) return -1;
	let size = pos - line.pos;
	return size > 6 ? -1 : size;
}
function isSetextUnderline(line) {
	if (line.next != 45 && line.next != 61 || line.indent >= line.baseIndent + 4) return -1;
	let pos = line.pos + 1;
	while (pos < line.text.length && line.text.charCodeAt(pos) == line.next) pos++;
	let end = pos;
	while (pos < line.text.length && space(line.text.charCodeAt(pos))) pos++;
	return pos == line.text.length ? end : -1;
}
var EmptyLine = /^[ \t]*$/;
var CommentEnd = /-->/;
var ProcessingEnd = /\?>/;
var HTMLBlockStyle = [
	[/^<(?:script|pre|style)(?:\s|>|$)/i, /<\/(?:script|pre|style)>/i],
	[/^\s*<!--/, CommentEnd],
	[/^\s*<\?/, ProcessingEnd],
	[/^\s*<![A-Z]/, />/],
	[/^\s*<!\[CDATA\[/, /\]\]>/],
	[/^\s*<\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>|$)/i, EmptyLine],
	[/^\s*(?:<\/[a-z][\w-]*\s*>|<[a-z][\w-]*(\s+[a-z:_][\w-.]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*>)\s*$/i, EmptyLine]
];
function isHTMLBlock(line, _cx, breaking) {
	if (line.next != 60) return -1;
	let rest = line.text.slice(line.pos);
	for (let i = 0, e = HTMLBlockStyle.length - (breaking ? 1 : 0); i < e; i++) if (HTMLBlockStyle[i][0].test(rest)) return i;
	return -1;
}
function getListIndent(line, pos) {
	let indentAfter = line.countIndent(pos, line.pos, line.indent);
	let indented = line.countIndent(line.skipSpace(pos), pos, indentAfter);
	return indented >= indentAfter + 5 ? indentAfter + 1 : indented;
}
function addCodeText(marks, from, to) {
	let last = marks.length - 1;
	if (last >= 0 && marks[last].to == from && marks[last].type == Type.CodeText) marks[last].to = to;
	else marks.push(elt(Type.CodeText, from, to));
}
var DefaultBlockParsers = {
	LinkReference: void 0,
	IndentedCode(cx, line) {
		let base = line.baseIndent + 4;
		if (line.indent < base) return false;
		let start = line.findColumn(base);
		let from = cx.lineStart + start, to = cx.lineStart + line.text.length;
		let marks = [], pendingMarks = [];
		addCodeText(marks, from, to);
		while (cx.nextLine() && line.depth >= cx.stack.length) if (line.pos == line.text.length) {
			addCodeText(pendingMarks, cx.lineStart - 1, cx.lineStart);
			for (let m of line.markers) pendingMarks.push(m);
		} else if (line.indent < base) break;
		else {
			if (pendingMarks.length) {
				for (let m of pendingMarks) if (m.type == Type.CodeText) addCodeText(marks, m.from, m.to);
				else marks.push(m);
				pendingMarks = [];
			}
			addCodeText(marks, cx.lineStart - 1, cx.lineStart);
			for (let m of line.markers) marks.push(m);
			to = cx.lineStart + line.text.length;
			let codeStart = cx.lineStart + line.findColumn(line.baseIndent + 4);
			if (codeStart < to) addCodeText(marks, codeStart, to);
		}
		if (pendingMarks.length) {
			pendingMarks = pendingMarks.filter((m) => m.type != Type.CodeText);
			if (pendingMarks.length) line.markers = pendingMarks.concat(line.markers);
		}
		cx.addNode(cx.buffer.writeElements(marks, -from).finish(Type.CodeBlock, to - from), from);
		return true;
	},
	FencedCode(cx, line) {
		let fenceEnd = isFencedCode(line);
		if (fenceEnd < 0) return false;
		let from = cx.lineStart + line.pos, ch = line.next, len = fenceEnd - line.pos;
		let infoFrom = line.skipSpace(fenceEnd), infoTo = skipSpaceBack(line.text, line.text.length, infoFrom);
		let marks = [elt(Type.CodeMark, from, from + len)];
		if (infoFrom < infoTo) marks.push(elt(Type.CodeInfo, cx.lineStart + infoFrom, cx.lineStart + infoTo));
		for (let first = true, empty = true, hasLine = false; cx.nextLine() && line.depth >= cx.stack.length; first = false) {
			let i = line.pos;
			if (line.indent - line.baseIndent < 4) while (i < line.text.length && line.text.charCodeAt(i) == ch) i++;
			if (i - line.pos >= len && line.skipSpace(i) == line.text.length) {
				for (let m of line.markers) marks.push(m);
				if (empty && hasLine) addCodeText(marks, cx.lineStart - 1, cx.lineStart);
				marks.push(elt(Type.CodeMark, cx.lineStart + line.pos, cx.lineStart + i));
				cx.nextLine();
				break;
			} else {
				hasLine = true;
				if (!first) {
					addCodeText(marks, cx.lineStart - 1, cx.lineStart);
					empty = false;
				}
				for (let m of line.markers) marks.push(m);
				let textStart = cx.lineStart + line.basePos, textEnd = cx.lineStart + line.text.length;
				if (textStart < textEnd) {
					addCodeText(marks, textStart, textEnd);
					empty = false;
				}
			}
		}
		cx.addNode(cx.buffer.writeElements(marks, -from).finish(Type.FencedCode, cx.prevLineEnd() - from), from);
		return true;
	},
	Blockquote(cx, line) {
		let size = isBlockquote(line);
		if (size < 0) return false;
		cx.startContext(Type.Blockquote, line.pos);
		cx.addNode(Type.QuoteMark, cx.lineStart + line.pos, cx.lineStart + line.pos + 1);
		line.moveBase(line.pos + size);
		return null;
	},
	HorizontalRule(cx, line) {
		if (isHorizontalRule(line, cx, false) < 0) return false;
		let from = cx.lineStart + line.pos;
		cx.nextLine();
		cx.addNode(Type.HorizontalRule, from);
		return true;
	},
	BulletList(cx, line) {
		let size = isBulletList(line, cx, false);
		if (size < 0) return false;
		if (cx.block.type != Type.BulletList) cx.startContext(Type.BulletList, line.basePos, line.next);
		let newBase = getListIndent(line, line.pos + 1);
		cx.startContext(Type.ListItem, line.basePos, newBase - line.baseIndent);
		cx.addNode(Type.ListMark, cx.lineStart + line.pos, cx.lineStart + line.pos + size);
		line.moveBaseColumn(newBase);
		return null;
	},
	OrderedList(cx, line) {
		let size = isOrderedList(line, cx, false);
		if (size < 0) return false;
		if (cx.block.type != Type.OrderedList) cx.startContext(Type.OrderedList, line.basePos, line.text.charCodeAt(line.pos + size - 1));
		let newBase = getListIndent(line, line.pos + size);
		cx.startContext(Type.ListItem, line.basePos, newBase - line.baseIndent);
		cx.addNode(Type.ListMark, cx.lineStart + line.pos, cx.lineStart + line.pos + size);
		line.moveBaseColumn(newBase);
		return null;
	},
	ATXHeading(cx, line) {
		let size = isAtxHeading(line);
		if (size < 0) return false;
		let off = line.pos, from = cx.lineStart + off;
		let endOfSpace = skipSpaceBack(line.text, line.text.length, off), after = endOfSpace;
		while (after > off && line.text.charCodeAt(after - 1) == line.next) after--;
		if (after == endOfSpace || after == off || !space(line.text.charCodeAt(after - 1))) after = line.text.length;
		let buf = cx.buffer.write(Type.HeaderMark, 0, size).writeElements(cx.parser.parseInline(line.text.slice(off + size + 1, after), from + size + 1), -from);
		if (after < line.text.length) buf.write(Type.HeaderMark, after - off, endOfSpace - off);
		let node = buf.finish(Type.ATXHeading1 - 1 + size, line.text.length - off);
		cx.nextLine();
		cx.addNode(node, from);
		return true;
	},
	HTMLBlock(cx, line) {
		let type = isHTMLBlock(line, cx, false);
		if (type < 0) return false;
		let from = cx.lineStart + line.pos, end = HTMLBlockStyle[type][1];
		let marks = [], trailing = end != EmptyLine;
		while (!end.test(line.text) && cx.nextLine()) {
			if (line.depth < cx.stack.length) {
				trailing = false;
				break;
			}
			for (let m of line.markers) marks.push(m);
		}
		if (trailing) cx.nextLine();
		let nodeType = end == CommentEnd ? Type.CommentBlock : end == ProcessingEnd ? Type.ProcessingInstructionBlock : Type.HTMLBlock;
		let to = cx.prevLineEnd();
		cx.addNode(cx.buffer.writeElements(marks, -from).finish(nodeType, to - from), from);
		return true;
	},
	SetextHeading: void 0
};
var LinkReferenceParser = class {
	constructor(leaf) {
		this.stage = 0;
		this.elts = [];
		this.pos = 0;
		this.start = leaf.start;
		this.advance(leaf.content);
	}
	nextLine(cx, line, leaf) {
		if (this.stage == -1) return false;
		let content = leaf.content + "\n" + line.scrub();
		let finish = this.advance(content);
		if (finish > -1 && finish < content.length) return this.complete(cx, leaf, finish);
		return false;
	}
	finish(cx, leaf) {
		if ((this.stage == 2 || this.stage == 3) && skipSpace(leaf.content, this.pos) == leaf.content.length) return this.complete(cx, leaf, leaf.content.length);
		return false;
	}
	complete(cx, leaf, len) {
		cx.addLeafElement(leaf, elt(Type.LinkReference, this.start, this.start + len, this.elts));
		return true;
	}
	nextStage(elt) {
		if (elt) {
			this.pos = elt.to - this.start;
			this.elts.push(elt);
			this.stage++;
			return true;
		}
		if (elt === false) this.stage = -1;
		return false;
	}
	advance(content) {
		for (;;) if (this.stage == -1) return -1;
		else if (this.stage == 0) {
			if (!this.nextStage(parseLinkLabel(content, this.pos, this.start, true))) return -1;
			if (content.charCodeAt(this.pos) != 58) return this.stage = -1;
			this.elts.push(elt(Type.LinkMark, this.pos + this.start, this.pos + this.start + 1));
			this.pos++;
		} else if (this.stage == 1) {
			if (!this.nextStage(parseURL(content, skipSpace(content, this.pos), this.start))) return -1;
		} else if (this.stage == 2) {
			let skip = skipSpace(content, this.pos), end = 0;
			if (skip > this.pos) {
				let title = parseLinkTitle(content, skip, this.start);
				if (title) {
					let titleEnd = lineEnd(content, title.to - this.start);
					if (titleEnd > 0) {
						this.nextStage(title);
						end = titleEnd;
					}
				}
			}
			if (!end) end = lineEnd(content, this.pos);
			return end > 0 && end < content.length ? end : -1;
		} else return lineEnd(content, this.pos);
	}
};
function lineEnd(text, pos) {
	for (; pos < text.length; pos++) {
		let next = text.charCodeAt(pos);
		if (next == 10) break;
		if (!space(next)) return -1;
	}
	return pos;
}
var SetextHeadingParser = class {
	nextLine(cx, line, leaf) {
		let underline = line.depth < cx.stack.length ? -1 : isSetextUnderline(line);
		let next = line.next;
		if (underline < 0) return false;
		let underlineMark = elt(Type.HeaderMark, cx.lineStart + line.pos, cx.lineStart + underline);
		cx.nextLine();
		cx.addLeafElement(leaf, elt(next == 61 ? Type.SetextHeading1 : Type.SetextHeading2, leaf.start, cx.prevLineEnd(), [...cx.parser.parseInline(leaf.content, leaf.start), underlineMark]));
		return true;
	}
	finish() {
		return false;
	}
};
var DefaultLeafBlocks = {
	LinkReference(_, leaf) {
		return leaf.content.charCodeAt(0) == 91 ? new LinkReferenceParser(leaf) : null;
	},
	SetextHeading() {
		return new SetextHeadingParser();
	}
};
var DefaultEndLeaf = [
	(_, line) => isAtxHeading(line) >= 0,
	(_, line) => isFencedCode(line) >= 0,
	(_, line) => isBlockquote(line) >= 0,
	(p, line) => isBulletList(line, p, true) >= 0,
	(p, line) => isOrderedList(line, p, true) >= 0,
	(p, line) => isHorizontalRule(line, p, true) >= 0,
	(p, line) => isHTMLBlock(line, p, true) >= 0
];
var scanLineResult = {
	text: "",
	end: 0
};
var BlockContext = class {
	constructor(parser, input, fragments, ranges) {
		this.parser = parser;
		this.input = input;
		this.ranges = ranges;
		this.line = new Line();
		this.atEnd = false;
		this.reusePlaceholders = new Map();
		this.stoppedAt = null;
		this.rangeI = 0;
		this.to = ranges[ranges.length - 1].to;
		this.lineStart = this.absoluteLineStart = this.absoluteLineEnd = ranges[0].from;
		this.block = CompositeBlock.create(Type.Document, 0, this.lineStart, 0, 0);
		this.stack = [this.block];
		this.fragments = fragments.length ? new FragmentCursor(fragments, input) : null;
		this.readLine();
	}
	get parsedPos() {
		return this.absoluteLineStart;
	}
	advance() {
		if (this.stoppedAt != null && this.absoluteLineStart > this.stoppedAt) return this.finish();
		let { line } = this;
		for (;;) {
			for (let markI = 0;;) {
				let next = line.depth < this.stack.length ? this.stack[this.stack.length - 1] : null;
				while (markI < line.markers.length && (!next || line.markers[markI].from < next.end)) {
					let mark = line.markers[markI++];
					this.addNode(mark.type, mark.from, mark.to);
				}
				if (!next) break;
				this.finishContext();
			}
			if (line.pos < line.text.length) break;
			if (!this.nextLine()) return this.finish();
		}
		if (this.fragments && this.reuseFragment(line.basePos)) return null;
		start: for (;;) {
			for (let type of this.parser.blockParsers) if (type) {
				let result = type(this, line);
				if (result != false) {
					if (result == true) return null;
					line.forward();
					continue start;
				}
			}
			break;
		}
		let leaf = new LeafBlock(this.lineStart + line.pos, line.text.slice(line.pos));
		for (let parse of this.parser.leafBlockParsers) if (parse) {
			let parser = parse(this, leaf);
			if (parser) leaf.parsers.push(parser);
		}
		lines: while (this.nextLine()) {
			if (line.pos == line.text.length) break;
			if (line.indent < line.baseIndent + 4) {
				for (let stop of this.parser.endLeafBlock) if (stop(this, line, leaf)) break lines;
			}
			for (let parser of leaf.parsers) if (parser.nextLine(this, line, leaf)) return null;
			leaf.content += "\n" + line.scrub();
			for (let m of line.markers) leaf.marks.push(m);
		}
		this.finishLeaf(leaf);
		return null;
	}
	stopAt(pos) {
		if (this.stoppedAt != null && this.stoppedAt < pos) throw new RangeError("Can't move stoppedAt forward");
		this.stoppedAt = pos;
	}
	reuseFragment(start) {
		if (!this.fragments.moveTo(this.absoluteLineStart + start, this.absoluteLineStart) || !this.fragments.matches(this.block.hash)) return false;
		let taken = this.fragments.takeNodes(this);
		if (!taken) return false;
		this.absoluteLineStart += taken;
		this.lineStart = toRelative(this.absoluteLineStart, this.ranges);
		this.moveRangeI();
		if (this.absoluteLineStart < this.to) {
			this.lineStart++;
			this.absoluteLineStart++;
			this.readLine();
		} else {
			this.atEnd = true;
			this.readLine();
		}
		return true;
	}
	get depth() {
		return this.stack.length;
	}
	parentType(depth = this.depth - 1) {
		return this.parser.nodeSet.types[this.stack[depth].type];
	}
	nextLine() {
		this.lineStart += this.line.text.length;
		if (this.absoluteLineEnd >= this.to) {
			this.absoluteLineStart = this.absoluteLineEnd;
			this.atEnd = true;
			this.readLine();
			return false;
		} else {
			this.lineStart++;
			this.absoluteLineStart = this.absoluteLineEnd + 1;
			this.moveRangeI();
			this.readLine();
			return true;
		}
	}
	peekLine() {
		return this.scanLine(this.absoluteLineEnd + 1).text;
	}
	moveRangeI() {
		while (this.rangeI < this.ranges.length - 1 && this.absoluteLineStart >= this.ranges[this.rangeI].to) {
			this.rangeI++;
			this.absoluteLineStart = Math.max(this.absoluteLineStart, this.ranges[this.rangeI].from);
		}
	}
	scanLine(start) {
		let r = scanLineResult;
		r.end = start;
		if (start >= this.to) r.text = "";
		else {
			r.text = this.lineChunkAt(start);
			r.end += r.text.length;
			if (this.ranges.length > 1) {
				let textOffset = this.absoluteLineStart, rangeI = this.rangeI;
				while (this.ranges[rangeI].to < r.end) {
					rangeI++;
					let nextFrom = this.ranges[rangeI].from;
					let after = this.lineChunkAt(nextFrom);
					r.end = nextFrom + after.length;
					r.text = r.text.slice(0, this.ranges[rangeI - 1].to - textOffset) + after;
					textOffset = r.end - r.text.length;
				}
			}
		}
		return r;
	}
	readLine() {
		let { line } = this, { text, end } = this.scanLine(this.absoluteLineStart);
		this.absoluteLineEnd = end;
		line.reset(text);
		for (; line.depth < this.stack.length; line.depth++) {
			let cx = this.stack[line.depth], handler = this.parser.skipContextMarkup[cx.type];
			if (!handler) throw new Error("Unhandled block context " + Type[cx.type]);
			let marks = this.line.markers.length;
			if (!handler(cx, this, line)) {
				if (this.line.markers.length > marks) cx.end = this.line.markers[this.line.markers.length - 1].to;
				line.forward();
				break;
			}
			line.forward();
		}
	}
	lineChunkAt(pos) {
		let next = this.input.chunk(pos), text;
		if (!this.input.lineChunks) {
			let eol = next.indexOf("\n");
			text = eol < 0 ? next : next.slice(0, eol);
		} else text = next == "\n" ? "" : next;
		return pos + text.length > this.to ? text.slice(0, this.to - pos) : text;
	}
	prevLineEnd() {
		return this.atEnd ? this.lineStart : this.lineStart - 1;
	}
	startContext(type, start, value = 0) {
		this.block = CompositeBlock.create(type, value, this.lineStart + start, this.block.hash, this.lineStart + this.line.text.length);
		this.stack.push(this.block);
	}
	startComposite(type, start, value = 0) {
		this.startContext(this.parser.getNodeType(type), start, value);
	}
	addNode(block, from, to) {
		if (typeof block == "number") block = new Tree(this.parser.nodeSet.types[block], none, none, (to !== null && to !== void 0 ? to : this.prevLineEnd()) - from);
		this.block.addChild(block, from - this.block.from);
	}
	addElement(elt) {
		this.block.addChild(elt.toTree(this.parser.nodeSet), elt.from - this.block.from);
	}
	addLeafElement(leaf, elt) {
		this.addNode(this.buffer.writeElements(injectMarks(elt.children, leaf.marks), -elt.from).finish(elt.type, elt.to - elt.from), elt.from);
	}
	finishContext() {
		let cx = this.stack.pop();
		let top = this.stack[this.stack.length - 1];
		top.addChild(cx.toTree(this.parser.nodeSet), cx.from - top.from);
		this.block = top;
	}
	finish() {
		while (this.stack.length > 1) this.finishContext();
		return this.addGaps(this.block.toTree(this.parser.nodeSet, this.lineStart));
	}
	addGaps(tree) {
		return this.ranges.length > 1 ? injectGaps(this.ranges, 0, tree.topNode, this.ranges[0].from, this.reusePlaceholders) : tree;
	}
	finishLeaf(leaf) {
		for (let parser of leaf.parsers) if (parser.finish(this, leaf)) return;
		let inline = injectMarks(this.parser.parseInline(leaf.content, leaf.start), leaf.marks);
		this.addNode(this.buffer.writeElements(inline, -leaf.start).finish(Type.Paragraph, leaf.content.length), leaf.start);
	}
	elt(type, from, to, children) {
		if (typeof type == "string") return elt(this.parser.getNodeType(type), from, to, children);
		return new TreeElement(type, from);
	}
	get buffer() {
		return new Buffer(this.parser.nodeSet);
	}
};
function injectGaps(ranges, rangeI, tree, offset, dummies) {
	let rangeEnd = ranges[rangeI].to;
	let children = [], positions = [], start = tree.from + offset;
	function movePastNext(upto, inclusive) {
		while (inclusive ? upto >= rangeEnd : upto > rangeEnd) {
			let size = ranges[rangeI + 1].from - rangeEnd;
			offset += size;
			upto += size;
			rangeI++;
			rangeEnd = ranges[rangeI].to;
		}
	}
	for (let ch = tree.firstChild; ch; ch = ch.nextSibling) {
		movePastNext(ch.from + offset, true);
		let from = ch.from + offset, node, reuse = dummies.get(ch.tree);
		if (reuse) node = reuse;
		else if (ch.to + offset > rangeEnd) {
			node = injectGaps(ranges, rangeI, ch, offset, dummies);
			movePastNext(ch.to + offset, false);
		} else node = ch.toTree();
		children.push(node);
		positions.push(from - start);
	}
	movePastNext(tree.to + offset, false);
	return new Tree(tree.type, children, positions, tree.to + offset - start, tree.tree ? tree.tree.propValues : void 0);
}
var MarkdownParser = class MarkdownParser extends Parser {
	constructor(nodeSet, blockParsers, leafBlockParsers, blockNames, endLeafBlock, skipContextMarkup, inlineParsers, inlineNames, wrappers) {
		super();
		this.nodeSet = nodeSet;
		this.blockParsers = blockParsers;
		this.leafBlockParsers = leafBlockParsers;
		this.blockNames = blockNames;
		this.endLeafBlock = endLeafBlock;
		this.skipContextMarkup = skipContextMarkup;
		this.inlineParsers = inlineParsers;
		this.inlineNames = inlineNames;
		this.wrappers = wrappers;
		this.nodeTypes = Object.create(null);
		for (let t of nodeSet.types) this.nodeTypes[t.name] = t.id;
	}
	createParse(input, fragments, ranges) {
		let parse = new BlockContext(this, input, fragments, ranges);
		for (let w of this.wrappers) parse = w(parse, input, fragments, ranges);
		return parse;
	}
	configure(spec) {
		let config = resolveConfig(spec);
		if (!config) return this;
		let { nodeSet, skipContextMarkup } = this;
		let blockParsers = this.blockParsers.slice(), leafBlockParsers = this.leafBlockParsers.slice(), blockNames = this.blockNames.slice(), inlineParsers = this.inlineParsers.slice(), inlineNames = this.inlineNames.slice(), endLeafBlock = this.endLeafBlock.slice(), wrappers = this.wrappers;
		if (nonEmpty(config.defineNodes)) {
			skipContextMarkup = Object.assign({}, skipContextMarkup);
			let nodeTypes = nodeSet.types.slice(), styles;
			for (let s of config.defineNodes) {
				let { name, block, composite, style } = typeof s == "string" ? { name: s } : s;
				if (nodeTypes.some((t) => t.name == name)) continue;
				if (composite) skipContextMarkup[nodeTypes.length] = (bl, cx, line) => composite(cx, line, bl.value);
				let id = nodeTypes.length;
				let group = composite ? ["Block", "BlockContext"] : !block ? void 0 : id >= Type.ATXHeading1 && id <= Type.SetextHeading2 ? [
					"Block",
					"LeafBlock",
					"Heading"
				] : ["Block", "LeafBlock"];
				nodeTypes.push(NodeType.define({
					id,
					name,
					props: group && [[NodeProp.group, group]]
				}));
				if (style) {
					if (!styles) styles = {};
					if (Array.isArray(style) || style instanceof Tag) styles[name] = style;
					else Object.assign(styles, style);
				}
			}
			nodeSet = new NodeSet(nodeTypes);
			if (styles) nodeSet = nodeSet.extend(styleTags(styles));
		}
		if (nonEmpty(config.props)) nodeSet = nodeSet.extend(...config.props);
		if (nonEmpty(config.remove)) for (let rm of config.remove) {
			let block = this.blockNames.indexOf(rm), inline = this.inlineNames.indexOf(rm);
			if (block > -1) blockParsers[block] = leafBlockParsers[block] = void 0;
			if (inline > -1) inlineParsers[inline] = void 0;
		}
		if (nonEmpty(config.parseBlock)) for (let spec of config.parseBlock) {
			let found = blockNames.indexOf(spec.name);
			if (found > -1) {
				blockParsers[found] = spec.parse;
				leafBlockParsers[found] = spec.leaf;
			} else {
				let pos = spec.before ? findName(blockNames, spec.before) : spec.after ? findName(blockNames, spec.after) + 1 : blockNames.length - 1;
				blockParsers.splice(pos, 0, spec.parse);
				leafBlockParsers.splice(pos, 0, spec.leaf);
				blockNames.splice(pos, 0, spec.name);
			}
			if (spec.endLeaf) endLeafBlock.push(spec.endLeaf);
		}
		if (nonEmpty(config.parseInline)) for (let spec of config.parseInline) {
			let found = inlineNames.indexOf(spec.name);
			if (found > -1) inlineParsers[found] = spec.parse;
			else {
				let pos = spec.before ? findName(inlineNames, spec.before) : spec.after ? findName(inlineNames, spec.after) + 1 : inlineNames.length - 1;
				inlineParsers.splice(pos, 0, spec.parse);
				inlineNames.splice(pos, 0, spec.name);
			}
		}
		if (config.wrap) wrappers = wrappers.concat(config.wrap);
		return new MarkdownParser(nodeSet, blockParsers, leafBlockParsers, blockNames, endLeafBlock, skipContextMarkup, inlineParsers, inlineNames, wrappers);
	}
	getNodeType(name) {
		let found = this.nodeTypes[name];
		if (found == null) throw new RangeError(`Unknown node type '${name}'`);
		return found;
	}
	parseInline(text, offset) {
		let cx = new InlineContext(this, text, offset);
		outer: for (let pos = offset; pos < cx.end;) {
			let next = cx.char(pos);
			for (let token of this.inlineParsers) if (token) {
				let result = token(cx, next, pos);
				if (result >= 0) {
					pos = result;
					continue outer;
				}
			}
			pos++;
		}
		return cx.resolveMarkers(0);
	}
};
function nonEmpty(a) {
	return a != null && a.length > 0;
}
function resolveConfig(spec) {
	if (!Array.isArray(spec)) return spec;
	if (spec.length == 0) return null;
	let conf = resolveConfig(spec[0]);
	if (spec.length == 1) return conf;
	let rest = resolveConfig(spec.slice(1));
	if (!rest || !conf) return conf || rest;
	let conc = (a, b) => (a || none).concat(b || none);
	let wrapA = conf.wrap, wrapB = rest.wrap;
	return {
		props: conc(conf.props, rest.props),
		defineNodes: conc(conf.defineNodes, rest.defineNodes),
		parseBlock: conc(conf.parseBlock, rest.parseBlock),
		parseInline: conc(conf.parseInline, rest.parseInline),
		remove: conc(conf.remove, rest.remove),
		wrap: !wrapA ? wrapB : !wrapB ? wrapA : (inner, input, fragments, ranges) => wrapA(wrapB(inner, input, fragments, ranges), input, fragments, ranges)
	};
}
function findName(names, name) {
	let found = names.indexOf(name);
	if (found < 0) throw new RangeError(`Position specified relative to unknown parser ${name}`);
	return found;
}
var nodeTypes = [NodeType.none];
for (let i = 1, name; name = Type[i]; i++) nodeTypes[i] = NodeType.define({
	id: i,
	name,
	props: i >= Type.Escape ? [] : [[NodeProp.group, i in DefaultSkipMarkup ? ["Block", "BlockContext"] : ["Block", "LeafBlock"]]],
	top: name == "Document"
});
var none = [];
var Buffer = class {
	constructor(nodeSet) {
		this.nodeSet = nodeSet;
		this.content = [];
		this.nodes = [];
	}
	write(type, from, to, children = 0) {
		this.content.push(type, from, to, 4 + children * 4);
		return this;
	}
	writeElements(elts, offset = 0) {
		for (let e of elts) e.writeTo(this, offset);
		return this;
	}
	finish(type, length) {
		return Tree.build({
			buffer: this.content,
			nodeSet: this.nodeSet,
			reused: this.nodes,
			topID: type,
			length
		});
	}
};
var Element$2 = class {
	constructor(type, from, to, children = none) {
		this.type = type;
		this.from = from;
		this.to = to;
		this.children = children;
	}
	writeTo(buf, offset) {
		let startOff = buf.content.length;
		buf.writeElements(this.children, offset);
		buf.content.push(this.type, this.from + offset, this.to + offset, buf.content.length + 4 - startOff);
	}
	toTree(nodeSet) {
		return new Buffer(nodeSet).writeElements(this.children, -this.from).finish(this.type, this.to - this.from);
	}
};
var TreeElement = class {
	constructor(tree, from) {
		this.tree = tree;
		this.from = from;
	}
	get to() {
		return this.from + this.tree.length;
	}
	get type() {
		return this.tree.type.id;
	}
	get children() {
		return none;
	}
	writeTo(buf, offset) {
		buf.nodes.push(this.tree);
		buf.content.push(buf.nodes.length - 1, this.from + offset, this.to + offset, -1);
	}
	toTree() {
		return this.tree;
	}
};
function elt(type, from, to, children) {
	return new Element$2(type, from, to, children);
}
var EmphasisUnderscore = {
	resolve: "Emphasis",
	mark: "EmphasisMark"
};
var EmphasisAsterisk = {
	resolve: "Emphasis",
	mark: "EmphasisMark"
};
var LinkStart = {};
var ImageStart = {};
var InlineDelimiter = class {
	constructor(type, from, to, side) {
		this.type = type;
		this.from = from;
		this.to = to;
		this.side = side;
	}
};
var Escapable = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var Punctuation = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\u2010-\u2027]/;
try {
	Punctuation = new RegExp("[\\p{S}|\\p{P}]", "u");
} catch (_) {}
var DefaultInline = {
	Escape(cx, next, start) {
		if (next != 92 || start == cx.end - 1) return -1;
		let escaped = cx.char(start + 1);
		for (let i = 0; i < 32; i++) if (Escapable.charCodeAt(i) == escaped) return cx.append(elt(Type.Escape, start, start + 2));
		return -1;
	},
	Entity(cx, next, start) {
		if (next != 38) return -1;
		let m = /^(?:#\d+|#x[a-f\d]+|\w+);/i.exec(cx.slice(start + 1, start + 31));
		return m ? cx.append(elt(Type.Entity, start, start + 1 + m[0].length)) : -1;
	},
	InlineCode(cx, next, start) {
		if (next != 96 || start && cx.char(start - 1) == 96) return -1;
		let pos = start + 1;
		while (pos < cx.end && cx.char(pos) == 96) pos++;
		let size = pos - start, curSize = 0;
		for (; pos < cx.end; pos++) if (cx.char(pos) == 96) {
			curSize++;
			if (curSize == size && cx.char(pos + 1) != 96) return cx.append(elt(Type.InlineCode, start, pos + 1, [elt(Type.CodeMark, start, start + size), elt(Type.CodeMark, pos + 1 - size, pos + 1)]));
		} else curSize = 0;
		return -1;
	},
	HTMLTag(cx, next, start) {
		if (next != 60 || start == cx.end - 1) return -1;
		let after = cx.slice(start + 1, cx.end);
		let url = /^(?:[a-z][-\w+.]+:[^\s>]+|[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*)>/i.exec(after);
		if (url) return cx.append(elt(Type.Autolink, start, start + 1 + url[0].length, [
			elt(Type.LinkMark, start, start + 1),
			elt(Type.URL, start + 1, start + url[0].length),
			elt(Type.LinkMark, start + url[0].length, start + 1 + url[0].length)
		]));
		let comment = /^!--[^>](?:-[^-]|[^-])*?-->/i.exec(after);
		if (comment) return cx.append(elt(Type.Comment, start, start + 1 + comment[0].length));
		let procInst = /^\?[^]*?\?>/.exec(after);
		if (procInst) return cx.append(elt(Type.ProcessingInstruction, start, start + 1 + procInst[0].length));
		let m = /^(?:![A-Z][^]*?>|!\[CDATA\[[^]*?\]\]>|\/\s*[a-zA-Z][\w-]*\s*>|\s*[a-zA-Z][\w-]*(\s+[a-zA-Z:_][\w-.:]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*(\/\s*)?>)/.exec(after);
		if (!m) return -1;
		return cx.append(elt(Type.HTMLTag, start, start + 1 + m[0].length));
	},
	Emphasis(cx, next, start) {
		if (next != 95 && next != 42) return -1;
		let pos = start + 1;
		while (cx.char(pos) == next) pos++;
		let before = cx.slice(start - 1, start), after = cx.slice(pos, pos + 1);
		let pBefore = Punctuation.test(before), pAfter = Punctuation.test(after);
		let sBefore = /\s|^$/.test(before), sAfter = /\s|^$/.test(after);
		let leftFlanking = !sAfter && (!pAfter || sBefore || pBefore);
		let rightFlanking = !sBefore && (!pBefore || sAfter || pAfter);
		let canOpen = leftFlanking && (next == 42 || !rightFlanking || pBefore);
		let canClose = rightFlanking && (next == 42 || !leftFlanking || pAfter);
		return cx.append(new InlineDelimiter(next == 95 ? EmphasisUnderscore : EmphasisAsterisk, start, pos, (canOpen ? 1 : 0) | (canClose ? 2 : 0)));
	},
	HardBreak(cx, next, start) {
		if (next == 92 && cx.char(start + 1) == 10) return cx.append(elt(Type.HardBreak, start, start + 2));
		if (next == 32) {
			let pos = start + 1;
			while (cx.char(pos) == 32) pos++;
			if (cx.char(pos) == 10 && pos >= start + 2) return cx.append(elt(Type.HardBreak, start, pos + 1));
		}
		return -1;
	},
	Link(cx, next, start) {
		return next == 91 ? cx.append(new InlineDelimiter(LinkStart, start, start + 1, 1)) : -1;
	},
	Image(cx, next, start) {
		return next == 33 && cx.char(start + 1) == 91 ? cx.append(new InlineDelimiter(ImageStart, start, start + 2, 1)) : -1;
	},
	LinkEnd(cx, next, start) {
		if (next != 93) return -1;
		for (let i = cx.parts.length - 1; i >= 0; i--) {
			let part = cx.parts[i];
			if (part instanceof InlineDelimiter && (part.type == LinkStart || part.type == ImageStart)) {
				if (!part.side || cx.skipSpace(part.to) == start && !/[(\[]/.test(cx.slice(start + 1, start + 2))) {
					cx.parts[i] = null;
					return -1;
				}
				let content = cx.takeContent(i);
				let link = cx.parts[i] = finishLink(cx, content, part.type == LinkStart ? Type.Link : Type.Image, part.from, start + 1);
				if (part.type == LinkStart) for (let j = 0; j < i; j++) {
					let p = cx.parts[j];
					if (p instanceof InlineDelimiter && p.type == LinkStart) p.side = 0;
				}
				return link.to;
			}
		}
		return -1;
	}
};
function finishLink(cx, content, type, start, startPos) {
	let { text } = cx, next = cx.char(startPos), endPos = startPos;
	content.unshift(elt(Type.LinkMark, start, start + (type == Type.Image ? 2 : 1)));
	content.push(elt(Type.LinkMark, startPos - 1, startPos));
	if (next == 40) {
		let pos = cx.skipSpace(startPos + 1);
		let dest = parseURL(text, pos - cx.offset, cx.offset), title;
		if (dest) {
			pos = cx.skipSpace(dest.to);
			if (pos != dest.to) {
				title = parseLinkTitle(text, pos - cx.offset, cx.offset);
				if (title) pos = cx.skipSpace(title.to);
			}
		}
		if (cx.char(pos) == 41) {
			content.push(elt(Type.LinkMark, startPos, startPos + 1));
			endPos = pos + 1;
			if (dest) content.push(dest);
			if (title) content.push(title);
			content.push(elt(Type.LinkMark, pos, endPos));
		}
	} else if (next == 91) {
		let label = parseLinkLabel(text, startPos - cx.offset, cx.offset, false);
		if (label) {
			content.push(label);
			endPos = label.to;
		}
	}
	return elt(type, start, endPos, content);
}
function parseURL(text, start, offset) {
	if (text.charCodeAt(start) == 60) {
		for (let pos = start + 1; pos < text.length; pos++) {
			let ch = text.charCodeAt(pos);
			if (ch == 62) return elt(Type.URL, start + offset, pos + 1 + offset);
			if (ch == 60 || ch == 10) return false;
		}
		return null;
	} else {
		let depth = 0, pos = start;
		for (let escaped = false; pos < text.length; pos++) {
			let ch = text.charCodeAt(pos);
			if (space(ch)) break;
			else if (escaped) escaped = false;
			else if (ch == 40) depth++;
			else if (ch == 41) {
				if (!depth) break;
				depth--;
			} else if (ch == 92) escaped = true;
		}
		return pos > start ? elt(Type.URL, start + offset, pos + offset) : pos == text.length ? null : false;
	}
}
function parseLinkTitle(text, start, offset) {
	let next = text.charCodeAt(start);
	if (next != 39 && next != 34 && next != 40) return false;
	let end = next == 40 ? 41 : next;
	for (let pos = start + 1, escaped = false; pos < text.length; pos++) {
		let ch = text.charCodeAt(pos);
		if (escaped) escaped = false;
		else if (ch == end) return elt(Type.LinkTitle, start + offset, pos + 1 + offset);
		else if (ch == 92) escaped = true;
	}
	return null;
}
function parseLinkLabel(text, start, offset, requireNonWS) {
	for (let escaped = false, pos = start + 1, end = Math.min(text.length, pos + 999); pos < end; pos++) {
		let ch = text.charCodeAt(pos);
		if (escaped) escaped = false;
		else if (ch == 93) return requireNonWS ? false : elt(Type.LinkLabel, start + offset, pos + 1 + offset);
		else {
			if (requireNonWS && !space(ch)) requireNonWS = false;
			if (ch == 91) return false;
			else if (ch == 92) escaped = true;
		}
	}
	return null;
}
var InlineContext = class {
	constructor(parser, text, offset) {
		this.parser = parser;
		this.text = text;
		this.offset = offset;
		this.parts = [];
	}
	char(pos) {
		return pos >= this.end ? -1 : this.text.charCodeAt(pos - this.offset);
	}
	get end() {
		return this.offset + this.text.length;
	}
	slice(from, to) {
		return this.text.slice(from - this.offset, to - this.offset);
	}
	append(elt) {
		this.parts.push(elt);
		return elt.to;
	}
	addDelimiter(type, from, to, open, close) {
		return this.append(new InlineDelimiter(type, from, to, (open ? 1 : 0) | (close ? 2 : 0)));
	}
	get hasOpenLink() {
		for (let i = this.parts.length - 1; i >= 0; i--) {
			let part = this.parts[i];
			if (part instanceof InlineDelimiter && (part.type == LinkStart || part.type == ImageStart)) return true;
		}
		return false;
	}
	addElement(elt) {
		return this.append(elt);
	}
	resolveMarkers(from) {
		for (let i = from; i < this.parts.length; i++) {
			let close = this.parts[i];
			if (!(close instanceof InlineDelimiter && close.type.resolve && close.side & 2)) continue;
			let emp = close.type == EmphasisUnderscore || close.type == EmphasisAsterisk;
			let closeSize = close.to - close.from;
			let open, j = i - 1;
			for (; j >= from; j--) {
				let part = this.parts[j];
				if (part instanceof InlineDelimiter && part.side & 1 && part.type == close.type && !(emp && (close.side & 1 || part.side & 2) && (part.to - part.from + closeSize) % 3 == 0 && ((part.to - part.from) % 3 || closeSize % 3))) {
					open = part;
					break;
				}
			}
			if (!open) continue;
			let type = close.type.resolve, content = [];
			let start = open.from, end = close.to;
			if (emp) {
				let size = Math.min(2, open.to - open.from, closeSize);
				start = open.to - size;
				end = close.from + size;
				type = size == 1 ? "Emphasis" : "StrongEmphasis";
			}
			if (open.type.mark) content.push(this.elt(open.type.mark, start, open.to));
			for (let k = j + 1; k < i; k++) {
				if (this.parts[k] instanceof Element$2) content.push(this.parts[k]);
				this.parts[k] = null;
			}
			if (close.type.mark) content.push(this.elt(close.type.mark, close.from, end));
			let element = this.elt(type, start, end, content);
			this.parts[j] = emp && open.from != start ? new InlineDelimiter(open.type, open.from, start, open.side) : null;
			if (this.parts[i] = emp && close.to != end ? new InlineDelimiter(close.type, end, close.to, close.side) : null) this.parts.splice(i, 0, element);
			else this.parts[i] = element;
		}
		let result = [];
		for (let i = from; i < this.parts.length; i++) {
			let part = this.parts[i];
			if (part instanceof Element$2) result.push(part);
		}
		return result;
	}
	findOpeningDelimiter(type) {
		for (let i = this.parts.length - 1; i >= 0; i--) {
			let part = this.parts[i];
			if (part instanceof InlineDelimiter && part.type == type && part.side & 1) return i;
		}
		return null;
	}
	takeContent(startIndex) {
		let content = this.resolveMarkers(startIndex);
		this.parts.length = startIndex;
		return content;
	}
	getDelimiterAt(index) {
		let part = this.parts[index];
		return part instanceof InlineDelimiter ? part : null;
	}
	skipSpace(from) {
		return skipSpace(this.text, from - this.offset) + this.offset;
	}
	elt(type, from, to, children) {
		if (typeof type == "string") return elt(this.parser.getNodeType(type), from, to, children);
		return new TreeElement(type, from);
	}
};
InlineContext.linkStart = LinkStart;
InlineContext.imageStart = ImageStart;
function injectMarks(elements, marks) {
	if (!marks.length) return elements;
	if (!elements.length) return marks;
	let elts = elements.slice(), eI = 0;
	for (let mark of marks) {
		while (eI < elts.length && elts[eI].to < mark.to) eI++;
		if (eI < elts.length && elts[eI].from < mark.from) {
			let e = elts[eI];
			if (e instanceof Element$2) elts[eI] = new Element$2(e.type, e.from, e.to, injectMarks(e.children, [mark]));
		} else elts.splice(eI++, 0, mark);
	}
	return elts;
}
var NotLast = [
	Type.CodeBlock,
	Type.ListItem,
	Type.OrderedList,
	Type.BulletList
];
var FragmentCursor = class {
	constructor(fragments, input) {
		this.fragments = fragments;
		this.input = input;
		this.i = 0;
		this.fragment = null;
		this.fragmentEnd = -1;
		this.cursor = null;
		if (fragments.length) this.fragment = fragments[this.i++];
	}
	nextFragment() {
		this.fragment = this.i < this.fragments.length ? this.fragments[this.i++] : null;
		this.cursor = null;
		this.fragmentEnd = -1;
	}
	moveTo(pos, lineStart) {
		while (this.fragment && this.fragment.to <= pos) this.nextFragment();
		if (!this.fragment || this.fragment.from > (pos ? pos - 1 : 0)) return false;
		if (this.fragmentEnd < 0) {
			let end = this.fragment.to;
			while (end > 0 && this.input.read(end - 1, end) != "\n") end--;
			this.fragmentEnd = end ? end - 1 : 0;
		}
		let c = this.cursor;
		if (!c) {
			c = this.cursor = this.fragment.tree.cursor();
			c.firstChild();
		}
		let rPos = pos + this.fragment.offset;
		while (c.to <= rPos) if (!c.parent()) return false;
		for (;;) {
			if (c.from >= rPos) return this.fragment.from <= lineStart;
			if (!c.childAfter(rPos)) return false;
		}
	}
	matches(hash) {
		let tree = this.cursor.tree;
		return tree && tree.prop(NodeProp.contextHash) == hash;
	}
	takeNodes(cx) {
		let cur = this.cursor, off = this.fragment.offset, fragEnd = this.fragmentEnd - (this.fragment.openEnd ? 1 : 0);
		let start = cx.absoluteLineStart, end = start, blockI = cx.block.children.length;
		let prevEnd = end, prevI = blockI;
		for (;;) {
			if (cur.to - off > fragEnd) {
				if (cur.type.isAnonymous && cur.firstChild()) continue;
				break;
			}
			let pos = toRelative(cur.from - off, cx.ranges);
			if (cur.to - off <= cx.ranges[cx.rangeI].to) cx.addNode(cur.tree, pos);
			else {
				let dummy = new Tree(cx.parser.nodeSet.types[Type.Paragraph], [], [], 0, cx.block.hashProp);
				cx.reusePlaceholders.set(dummy, cur.tree);
				cx.addNode(dummy, pos);
			}
			if (cur.type.is("Block")) {
				if (NotLast.indexOf(cur.type.id) < 0) {
					end = cur.to - off;
					blockI = cx.block.children.length;
				} else {
					end = prevEnd;
					blockI = prevI;
				}
				prevEnd = cur.to - off;
				prevI = cx.block.children.length;
			}
			if (!cur.nextSibling()) break;
		}
		while (cx.block.children.length > blockI) {
			cx.block.children.pop();
			cx.block.positions.pop();
		}
		return end - start;
	}
};
function toRelative(abs, ranges) {
	let pos = abs;
	for (let i = 1; i < ranges.length; i++) {
		let gapFrom = ranges[i - 1].to, gapTo = ranges[i].from;
		if (gapFrom < abs) pos -= gapTo - gapFrom;
	}
	return pos;
}
var markdownHighlighting = styleTags({
	"Blockquote/...": tags.quote,
	HorizontalRule: tags.contentSeparator,
	"ATXHeading1/... SetextHeading1/...": tags.heading1,
	"ATXHeading2/... SetextHeading2/...": tags.heading2,
	"ATXHeading3/...": tags.heading3,
	"ATXHeading4/...": tags.heading4,
	"ATXHeading5/...": tags.heading5,
	"ATXHeading6/...": tags.heading6,
	"Comment CommentBlock": tags.comment,
	Escape: tags.escape,
	Entity: tags.character,
	"Emphasis/...": tags.emphasis,
	"StrongEmphasis/...": tags.strong,
	"Link/... Image/...": tags.link,
	"OrderedList/... BulletList/...": tags.list,
	"BlockQuote/...": tags.quote,
	"InlineCode CodeText": tags.monospace,
	"URL Autolink": tags.url,
	"HeaderMark HardBreak QuoteMark ListMark LinkMark EmphasisMark CodeMark": tags.processingInstruction,
	"CodeInfo LinkLabel": tags.labelName,
	LinkTitle: tags.string,
	Paragraph: tags.content
});
var parser$2 = new MarkdownParser(new NodeSet(nodeTypes).extend(markdownHighlighting), Object.keys(DefaultBlockParsers).map((n) => DefaultBlockParsers[n]), Object.keys(DefaultBlockParsers).map((n) => DefaultLeafBlocks[n]), Object.keys(DefaultBlockParsers), DefaultEndLeaf, DefaultSkipMarkup, Object.keys(DefaultInline).map((n) => DefaultInline[n]), Object.keys(DefaultInline), []);
tags.strikethrough, tags.processingInstruction;
tags.heading, tags.content, tags.processingInstruction;
tags.list, tags.atom;
tags.special(tags.content), tags.processingInstruction;
tags.special(tags.content), tags.processingInstruction;
tags.character;
// ../../node_modules/@lezer/html/dist/index.js
init_dist$3();
init_dist$2();
init_dist$1();
var scriptText = 55;
var StartCloseScriptTag = 1;
var styleText = 56;
var StartCloseStyleTag = 2;
var textareaText = 57;
var StartCloseTextareaTag = 3;
var EndTag = 4;
var SelfClosingEndTag = 5;
var StartTag = 6;
var StartScriptTag = 7;
var StartStyleTag = 8;
var StartTextareaTag = 9;
var StartSelfClosingTag = 10;
var StartCloseTag = 11;
var NoMatchStartCloseTag = 12;
var MismatchedStartCloseTag = 13;
var missingCloseTag = 58;
var IncompleteTag = 14;
var IncompleteCloseTag = 15;
var commentContent$1 = 59;
var Element$1 = 21;
var OpenTag = 37;
var Dialect_noMatch = 0;
var Dialect_selfClosing = 1;
var selfClosers = {
	area: true,
	base: true,
	br: true,
	col: true,
	command: true,
	embed: true,
	frame: true,
	hr: true,
	img: true,
	input: true,
	keygen: true,
	link: true,
	meta: true,
	param: true,
	source: true,
	track: true,
	wbr: true,
	menuitem: true
};
var implicitlyClosed = {
	dd: true,
	li: true,
	optgroup: true,
	option: true,
	p: true,
	rp: true,
	rt: true,
	tbody: true,
	td: true,
	tfoot: true,
	th: true,
	tr: true
};
var closeOnOpen = {
	dd: {
		dd: true,
		dt: true
	},
	dt: {
		dd: true,
		dt: true
	},
	li: { li: true },
	option: {
		option: true,
		optgroup: true
	},
	optgroup: { optgroup: true },
	p: {
		address: true,
		article: true,
		aside: true,
		blockquote: true,
		dir: true,
		div: true,
		dl: true,
		fieldset: true,
		footer: true,
		form: true,
		h1: true,
		h2: true,
		h3: true,
		h4: true,
		h5: true,
		h6: true,
		header: true,
		hgroup: true,
		hr: true,
		menu: true,
		nav: true,
		ol: true,
		p: true,
		pre: true,
		section: true,
		table: true,
		ul: true
	},
	rp: {
		rp: true,
		rt: true
	},
	rt: {
		rp: true,
		rt: true
	},
	tbody: {
		tbody: true,
		tfoot: true
	},
	td: {
		td: true,
		th: true
	},
	tfoot: { tbody: true },
	th: {
		td: true,
		th: true
	},
	thead: {
		tbody: true,
		tfoot: true
	},
	tr: { tr: true }
};
function nameChar(ch) {
	return ch == 45 || ch == 46 || ch == 58 || ch >= 65 && ch <= 90 || ch == 95 || ch >= 97 && ch <= 122 || ch >= 161;
}
var cachedName = null;
var cachedInput = null;
var cachedPos = 0;
function tagNameAfter(input, offset) {
	let pos = input.pos + offset;
	if (cachedPos == pos && cachedInput == input) return cachedName;
	let next = input.peek(offset), name = "";
	for (;;) {
		if (!nameChar(next)) break;
		name += String.fromCharCode(next);
		next = input.peek(++offset);
	}
	cachedInput = input;
	cachedPos = pos;
	return cachedName = name ? name.toLowerCase() : next == question || next == bang ? void 0 : null;
}
var lessThan = 60;
var greaterThan = 62;
var slash = 47;
var question = 63;
var bang = 33;
var dash = 45;
function ElementContext(name, parent) {
	this.name = name;
	this.parent = parent;
}
var startTagTerms = [
	StartTag,
	StartSelfClosingTag,
	StartScriptTag,
	StartStyleTag,
	StartTextareaTag
];
var elementContext = new ContextTracker({
	start: null,
	shift(context, term, stack, input) {
		return startTagTerms.indexOf(term) > -1 ? new ElementContext(tagNameAfter(input, 1) || "", context) : context;
	},
	reduce(context, term) {
		return term == Element$1 && context ? context.parent : context;
	},
	reuse(context, node, stack, input) {
		let type = node.type.id;
		return type == StartTag || type == OpenTag ? new ElementContext(tagNameAfter(input, 1) || "", context) : context;
	},
	strict: false
});
var tagStart = new ExternalTokenizer((input, stack) => {
	if (input.next != lessThan) {
		if (input.next < 0 && stack.context) input.acceptToken(missingCloseTag);
		return;
	}
	input.advance();
	let close = input.next == slash;
	if (close) input.advance();
	let name = tagNameAfter(input, 0);
	if (name === void 0) return;
	if (!name) return input.acceptToken(close ? IncompleteCloseTag : IncompleteTag);
	let parent = stack.context ? stack.context.name : null;
	if (close) {
		if (name == parent) return input.acceptToken(StartCloseTag);
		if (parent && implicitlyClosed[parent]) return input.acceptToken(missingCloseTag, -2);
		if (stack.dialectEnabled(Dialect_noMatch)) return input.acceptToken(NoMatchStartCloseTag);
		for (let cx = stack.context; cx; cx = cx.parent) if (cx.name == name) return;
		input.acceptToken(MismatchedStartCloseTag);
	} else {
		if (name == "script") return input.acceptToken(StartScriptTag);
		if (name == "style") return input.acceptToken(StartStyleTag);
		if (name == "textarea") return input.acceptToken(StartTextareaTag);
		if (selfClosers.hasOwnProperty(name)) return input.acceptToken(StartSelfClosingTag);
		if (parent && closeOnOpen[parent] && closeOnOpen[parent][name]) input.acceptToken(missingCloseTag, -1);
		else input.acceptToken(StartTag);
	}
}, { contextual: true });
var commentContent = new ExternalTokenizer((input) => {
	for (let dashes = 0, i = 0;; i++) {
		if (input.next < 0) {
			if (i) input.acceptToken(commentContent$1);
			break;
		}
		if (input.next == dash) dashes++;
		else if (input.next == greaterThan && dashes >= 2) {
			if (i >= 3) input.acceptToken(commentContent$1, -2);
			break;
		} else dashes = 0;
		input.advance();
	}
});
function inForeignElement(context) {
	for (; context; context = context.parent) if (context.name == "svg" || context.name == "math") return true;
	return false;
}
var endTag = new ExternalTokenizer((input, stack) => {
	if (input.next == slash && input.peek(1) == greaterThan) {
		let selfClosing = stack.dialectEnabled(Dialect_selfClosing) || inForeignElement(stack.context);
		input.acceptToken(selfClosing ? SelfClosingEndTag : EndTag, 2);
	} else if (input.next == greaterThan) input.acceptToken(EndTag, 1);
});
function contentTokenizer(tag, textToken, endToken) {
	let lastState = 2 + tag.length;
	return new ExternalTokenizer((input) => {
		for (let state = 0, matchedLen = 0, i = 0;; i++) {
			if (input.next < 0) {
				if (i) input.acceptToken(textToken);
				break;
			}
			if (state == 0 && input.next == lessThan || state == 1 && input.next == slash || state >= 2 && state < lastState && input.next == tag.charCodeAt(state - 2)) {
				state++;
				matchedLen++;
			} else if (state == lastState && input.next == greaterThan) {
				if (i > matchedLen) input.acceptToken(textToken, -matchedLen);
				else input.acceptToken(endToken, -(matchedLen - 2));
				break;
			} else if ((input.next == 10 || input.next == 13) && i) {
				input.acceptToken(textToken, 1);
				break;
			} else state = matchedLen = 0;
			input.advance();
		}
	});
}
var scriptTokens = contentTokenizer("script", scriptText, StartCloseScriptTag);
var styleTokens = contentTokenizer("style", styleText, StartCloseStyleTag);
var textareaTokens = contentTokenizer("textarea", textareaText, StartCloseTextareaTag);
var htmlHighlighting = styleTags({
	"Text RawText IncompleteTag IncompleteCloseTag": tags.content,
	"StartTag StartCloseTag SelfClosingEndTag EndTag": tags.angleBracket,
	TagName: tags.tagName,
	"MismatchedCloseTag/TagName": [tags.tagName, tags.invalid],
	AttributeName: tags.attributeName,
	"AttributeValue UnquotedAttributeValue": tags.attributeValue,
	Is: tags.definitionOperator,
	"EntityReference CharacterReference": tags.character,
	Comment: tags.blockComment,
	ProcessingInst: tags.processingInstruction,
	DoctypeDecl: tags.documentMeta
});
var parser$1 = LRParser.deserialize({
	version: 14,
	states: ",xOVO!rOOO!ZQ#tO'#CrO!`Q#tO'#C{O!eQ#tO'#DOO!jQ#tO'#DRO!oQ#tO'#DTO!tOaO'#CqO#PObO'#CqO#[OdO'#CqO$kO!rO'#CqOOO`'#Cq'#CqO$rO$fO'#DUO$zQ#tO'#DWO%PQ#tO'#DXOOO`'#Dl'#DlOOO`'#DZ'#DZQVO!rOOO%UQ&rO,59^O%aQ&rO,59gO%lQ&rO,59jO%wQ&rO,59mO&SQ&rO,59oOOOa'#D_'#D_O&_OaO'#CyO&jOaO,59]OOOb'#D`'#D`O&rObO'#C|O&}ObO,59]OOOd'#Da'#DaO'VOdO'#DPO'bOdO,59]OOO`'#Db'#DbO'jO!rO,59]O'qQ#tO'#DSOOO`,59],59]OOOp'#Dc'#DcO'vO$fO,59pOOO`,59p,59pO(OQ#|O,59rO(TQ#|O,59sOOO`-E7X-E7XO(YQ&rO'#CtOOQW'#D['#D[O(hQ&rO1G.xOOOa1G.x1G.xOOO`1G/Z1G/ZO(sQ&rO1G/ROOOb1G/R1G/RO)OQ&rO1G/UOOOd1G/U1G/UO)ZQ&rO1G/XOOO`1G/X1G/XO)fQ&rO1G/ZOOOa-E7]-E7]O)qQ#tO'#CzOOO`1G.w1G.wOOOb-E7^-E7^O)vQ#tO'#C}OOOd-E7_-E7_O){Q#tO'#DQOOO`-E7`-E7`O*QQ#|O,59nOOOp-E7a-E7aOOO`1G/[1G/[OOO`1G/^1G/^OOO`1G/_1G/_O*VQ,UO,59`OOQW-E7Y-E7YOOOa7+$d7+$dOOO`7+$u7+$uOOOb7+$m7+$mOOOd7+$p7+$pOOO`7+$s7+$sO*bQ#|O,59fO*gQ#|O,59iO*lQ#|O,59lOOO`1G/Y1G/YO*qO7[O'#CwO+SOMhO'#CwOOQW1G.z1G.zOOO`1G/Q1G/QOOO`1G/T1G/TOOO`1G/W1G/WOOOO'#D]'#D]O+eO7[O,59cOOQW,59c,59cOOOO'#D^'#D^O+vOMhO,59cOOOO-E7Z-E7ZOOQW1G.}1G.}OOOO-E7[-E7[",
	stateData: ",c~O!_OS~OUSOVPOWQOXROYTO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O|_O!eZO~OgaO~OgbO~OgcO~OgdO~OgeO~O!XfOPmP![mP~O!YiOQpP![pP~O!ZlORsP![sP~OUSOVPOWQOXROYTOZqO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O!eZO~O![rO~P#gO!]sO!fuO~OgvO~OgwO~OS|OT}OiyO~OS!POT}OiyO~OS!ROT}OiyO~OS!TOT}OiyO~OS}OT}OiyO~O!XfOPmX![mX~OP!WO![!XO~O!YiOQpX![pX~OQ!ZO![!XO~O!ZlORsX![sX~OR!]O![!XO~O![!XO~P#gOg!_O~O!]sO!f!aO~OS!bO~OS!cO~Oj!dOShXThXihX~OS!fOT!gOiyO~OS!hOT!gOiyO~OS!iOT!gOiyO~OS!jOT!gOiyO~OS!gOT!gOiyO~Og!kO~Og!lO~Og!mO~OS!nO~Ol!qO!a!oO!c!pO~OS!rO~OS!sO~OS!tO~Ob!uOc!uOd!uO!a!wO!b!uO~Ob!xOc!xOd!xO!c!wO!d!xO~Ob!uOc!uOd!uO!a!{O!b!uO~Ob!xOc!xOd!xO!c!{O!d!xO~OT~cbd!ey|!e~",
	goto: "%q!aPPPPPPPPPPPPPPPPPPPPP!b!hP!nPP!zP!}#Q#T#Z#^#a#g#j#m#s#y!bP!b!bP$P$V$m$s$y%P%V%]%cPPPPPPPP%iX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
	nodeNames: "⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
	maxTerm: 68,
	context: elementContext,
	nodeProps: [
		[
			"closedBy",
			-10,
			1,
			2,
			3,
			7,
			8,
			9,
			10,
			11,
			12,
			13,
			"EndTag",
			6,
			"EndTag SelfClosingEndTag",
			-4,
			22,
			31,
			34,
			37,
			"CloseTag"
		],
		[
			"openedBy",
			4,
			"StartTag StartCloseTag",
			5,
			"StartTag",
			-4,
			30,
			33,
			36,
			38,
			"OpenTag"
		],
		[
			"group",
			-10,
			14,
			15,
			18,
			19,
			20,
			21,
			40,
			41,
			42,
			43,
			"Entity",
			17,
			"Entity TextContent",
			-3,
			29,
			32,
			35,
			"TextContent Entity"
		],
		[
			"isolate",
			-11,
			22,
			30,
			31,
			33,
			34,
			36,
			37,
			38,
			39,
			42,
			43,
			"ltr",
			-3,
			27,
			28,
			40,
			""
		]
	],
	propSources: [htmlHighlighting],
	skippedNodes: [0],
	repeatNodeCount: 9,
	tokenData: "!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|caPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bXaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UVaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pTaPOv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!dpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({WaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!b`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!b`!dpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYlWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]`aP!b`!dp!_^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebiSlWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXiSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vciSaP!b`!dpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!ahaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WiiSlWd!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zblWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOb!R!R7tP;=`<%l7S!Z8OYlWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{iiSlWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbiSlWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QciSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXiSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TalWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOc!R!RAwP;=`<%lAY!ZBRYlWc!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbiSlWc!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbiSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXiSc!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!cxaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYliSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_kiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_XaP!b`!dp!fQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZiSgQaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!b`!dpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!b`!dp!ePOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!b`!dpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!b`!dpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!b`!dpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!b`!dpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!b`!dpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!b`!dpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!b`!dpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!dpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO|PP!-nP;=`<%l!-Sq!-xS!dp|POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!b`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!b`|POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!b`!dp|POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!b`!dpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!b`!dpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!b`!dpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!b`!dpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!b`!dpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!b`!dpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!dpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOyPP!7TP;=`<%l!6Vq!7]V!dpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!dpyPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!b`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!b`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!b`yPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!b`!dpyPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXjSaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",
	tokenizers: [
		scriptTokens,
		styleTokens,
		textareaTokens,
		endTag,
		tagStart,
		commentContent,
		0,
		1,
		2,
		3,
		4,
		5
	],
	topRules: { "Document": [0, 16] },
	dialects: {
		noMatch: 0,
		selfClosing: 515
	},
	tokenPrec: 517
});
// ../../node_modules/@bpmn-io/feelers-lint/lib/rules/lintEmptyInserts.js
function lintEmptyInserts(syntaxTree) {
	const lintMessages = [];
	syntaxTree.iterate({ enter: (node) => {
		if (node.type.name === "EmptyInsert") lintMessages.push({
			from: node.from,
			to: node.to,
			severity: "warning",
			message: "this insert is empty and will be ignored",
			type: "emptyInsert"
		});
	} });
	return lintMessages;
}
// ../../node_modules/@bpmn-io/feelers-lint/lib/cmFeelersLinter.js
function lintAll(syntaxTree) {
	return [...lintEmptyInserts(syntaxTree)];
}
function cmFeelersLinter() {
	const lintFeel = cmFeelLinter();
	return (editorView) => {
		const feelMessages = lintFeel(editorView);
		if (editorView.state.doc.length === 0) return [];
		const feelersMessages = lintAll(syntaxTree(editorView.state));
		return [...feelMessages, ...feelersMessages.map((message) => ({
			...message,
			source: "feelers linter"
		}))];
	};
}
// ../../node_modules/@bpmn-io/feelers-lint/lib/index.js
var feelersLinter = linter(cmFeelersLinter());
// ../../node_modules/@bpmn-io/lezer-feelers/lib/tokens.js
init_dist$3();
var CHAR_TABLE = {
	"{": 123,
	"}": 125
};
var isClosingFeelScope = (input, offset = 0) => {
	const isReadingCloseCurrent = input.peek(offset) === CHAR_TABLE["}"];
	const isReadingCloseAhead = input.peek(offset + 1) === CHAR_TABLE["}"];
	return isReadingCloseCurrent && isReadingCloseAhead || input.peek(offset) === -1;
};
var feelBlock = new ExternalTokenizer((input, _stack) => {
	let lookAhead = 0;
	while (!isClosingFeelScope(input, lookAhead)) lookAhead++;
	if (lookAhead > 0) {
		input.advance(lookAhead);
		input.acceptToken(2);
	}
});
var isClosingTextScope = (input, offset = 0) => {
	const isReadingOpenCurrent = input.peek(offset) === CHAR_TABLE["{"];
	const isReadingOpenAhead = input.peek(offset + 1) === CHAR_TABLE["{"];
	return isReadingOpenCurrent && isReadingOpenAhead || input.peek(offset) === -1;
};
var simpleTextBlock = new ExternalTokenizer((input, _stack) => {
	let lookAhead = 0;
	while (!isClosingTextScope(input, lookAhead)) lookAhead++;
	if (lookAhead > 0) {
		input.advance(lookAhead);
		input.acceptToken(3);
	}
});
var feel = new ExternalTokenizer((input, _stack) => {
	let lookAhead = 0;
	while (input.peek(lookAhead) !== -1) lookAhead++;
	if (lookAhead > 0) {
		input.advance(lookAhead);
		input.acceptToken(1);
	}
});
// ../../node_modules/@bpmn-io/lezer-feelers/lib/highlight.js
init_dist$2();
var feelersHighlighting = styleTags({
	ConditionalSpanner: tags.special(tags.bracket),
	ConditionalSpannerClose: tags.special(tags.bracket),
	ConditionalSpannerCloseNl: tags.special(tags.bracket),
	LoopSpanner: tags.special(tags.bracket),
	LoopSpannerClose: tags.special(tags.bracket),
	LoopSpannerCloseNl: tags.special(tags.bracket),
	EmptyInsert: tags.special(tags.bracket),
	Insert: tags.special(tags.bracket)
});
// ../../node_modules/@bpmn-io/lezer-feelers/lib/parser.js
init_dist$3();
var parser = LRParser.deserialize({
	version: 14,
	states: "$bOQOaOOOfOXO'#CbOOO`'#Cm'#CmOqOWO'#CcOvOWO'#CfOOO`'#Cp'#CpOOO`'#Ci'#CiO{OaO'#ClO!jOSOOQOOOOOO!oOPO,58{O!tOXO,58|OOO`,58|,58|O!|OQO,58}O#ROQO,59QOOO`-E6g-E6gOOO`1G.g1G.gO#WOPO1G.gOOO`1G.h1G.hO#]OaO1G.iO#qOaO1G.lOOO`7+$R7+$RO$VOPO7+$TO$_OPO7+$WOOO`<<Go<<GoOOO`<<Gr<<Gr",
	stateData: "$g~ORUO_WObPOeROgSO^`P~OQYO_ZOc[O~OQ]O~OQ^O~ORUObPOeROgSO^`XW`XX`XZ`X[`X~OPXO~Oc`O~OQaOcbO~OfcO~OfdO~OceO~ORUObPOeROgSOW`PX`P~ORUObPOeROgSOZ`P[`P~OWhOXhO~OZiO[iO~O",
	goto: "!ZePPPPPfflPPlPPrPPz!TPP!TXQOVcdXTOVcdUVOcdR_VQXOQfcRgdXUOVcd",
	nodeNames: "⚠ Feel FeelBlock SimpleTextBlock Feelers Insert EmptyInsert ConditionalSpanner ConditionalSpannerClose ConditionalSpannerCloseNl LoopSpanner LoopSpannerClose LoopSpannerCloseNl",
	maxTerm: 23,
	propSources: [feelersHighlighting],
	skippedNodes: [0],
	repeatNodeCount: 1,
	tokenData: "%X~RR!_!`[#o#pa#q#r$r~aO_~~dP#o#pg~lQb~str!P!Q!{~uQ#]#^{#`#a!^~!OP#Y#Z!R~!UPpq!X~!^Oe~~!aP#c#d!d~!gP#c#d!j~!mP#d#e!p~!sPpq!v~!{Og~~#OQ#]#^#U#`#a#u~#XP#Y#Z#[~#_P#q#r#b~#eP#q#r#h~#mPW~YZ#p~#uOX~~#xP#c#d#{~$OP#c#d$R~$UP#d#e$X~$[P#q#r$_~$bP#q#r$e~$jPZ~YZ$m~$rO[~R$uP#q#r$xR%PPcPfQYZ%SQ%XOfQ",
	tokenizers: [
		0,
		1,
		feel,
		feelBlock,
		simpleTextBlock
	],
	topRules: { "Feelers": [0, 4] },
	tokenPrec: 0
});
// ../../node_modules/@bpmn-io/lang-feelers/lib/mixedParser.js
init_dist$1();
var foldMetadata = {
	ConditionalSpanner: foldInside,
	LoopSpanner: foldInside
};
function createMixedLanguage(hostParser = void 0) {
	const _mixedParser = parser.configure({
		wrap: parseMixed((node) => {
			if (node.name == "Feel" || node.name == "FeelBlock") return { parser: parser$4 };
			if (hostParser && node.name == "SimpleTextBlock") return { parser: hostParser };
			return null;
		}),
		props: [foldNodeProp.add(foldMetadata)]
	});
	return LRLanguage.define({ parser: _mixedParser });
}
// ../../node_modules/@bpmn-io/lang-feelers/lib/index.js
function feelersLanguage(hostParser) {
	return new LanguageSupport(createMixedLanguage(hostParser), []);
}
// ../../node_modules/@bpmn-io/feelers-editor/lib/index.js
init_dist$1();
var markdownWithHtmlParser = parser$2.configure({ wrap: parseMixed((node) => node.name === "HTMLTag" || node.name === "HTMLBlock" ? { parser: parser$1 } : null) });
function FeelersEditor({ container, tooltipContainer, hostLanguage, hostLanguageParser, onChange = () => {}, onKeyDown = () => {}, onLint = () => {}, contentAttributes = {}, readOnly = false, value = "", enableGutters = false, singleLine = false, lineWrap = false, darkMode = false }) {
	this._events = mitt_default();
	this.on("lint", ({ diagnostics }) => onLint(diagnostics));
	const changeHandler = EditorView.updateListener.of((update) => {
		if (update.docChanged) onChange(update.state.doc.toString());
	});
	const lintHandler = EditorView.updateListener.of((update) => {
		const diagnosticEffects = update.transactions.flatMap((t) => t.effects).filter((effect) => effect.is(setDiagnosticsEffect));
		if (!diagnosticEffects.length) return;
		const diagnostics = diagnosticEffects.flatMap((effect) => effect.value);
		this._events.emit("lint", { diagnostics });
	});
	const contentAttributesExtension = EditorView.contentAttributes.of(contentAttributes);
	const keyHandler = EditorView.domEventHandlers({ keydown: onKeyDown });
	if (typeof tooltipContainer === "string") tooltipContainer = document.querySelector(tooltipContainer) || void 0;
	const _tooltipEl = tooltipContainer;
	const tooltipLayout = _tooltipEl ? tooltips({ tooltipSpace: function() {
		return _tooltipEl.getBoundingClientRect();
	} }) : [];
	const _getHostLanguageParser = (hostLanguage) => {
		switch (hostLanguage) {
			case "markdown": return markdownWithHtmlParser;
			default: return;
		}
	};
	const feelersLanguageSupport = feelersLanguage(hostLanguageParser || hostLanguage && _getHostLanguageParser(hostLanguage) || void 0);
	const extensions = [
		bracketMatching(),
		changeHandler,
		contentAttributesExtension,
		closeBrackets(),
		indentOnInput(),
		keyHandler,
		keymap.of([...defaultKeymap]),
		feelersLanguageSupport,
		feelersLinter,
		lintHandler,
		tooltipLayout,
		darkMode ? feelDark : feelLight,
		...enableGutters ? [lineNumbers()] : [],
		...singleLine ? [EditorState.transactionFilter.of((tr) => tr.newDoc.lines > 1 ? [] : tr)] : [],
		...lineWrap ? [EditorView.lineWrapping] : []
	];
	if (readOnly) extensions.push(EditorView.editable.of(false));
	if (singleLine && value) value = value.toString().split("\n")[0];
	this._cmEditor = new EditorView({
		state: EditorState.create({
			doc: value,
			extensions
		}),
		parent: container
	});
	return this;
}
FeelersEditor.prototype.setValue = function(value) {
	this._cmEditor.dispatch({ changes: {
		from: 0,
		to: this._cmEditor.state.doc.length,
		insert: value
	} });
};
FeelersEditor.prototype.focus = function(position) {
	const cmEditor = this._cmEditor;
	cmEditor.contentDOM.focus();
	cmEditor.focus();
	if (typeof position === "number") {
		const end = cmEditor.state.doc.length;
		cmEditor.dispatch({ selection: { anchor: position <= end ? position : end } });
	}
};
FeelersEditor.prototype.getSelection = function() {
	return this._cmEditor.state.selection;
};
FeelersEditor.prototype.on = function(eventName, callback) {
	this._events.on(eventName, callback);
};
FeelersEditor.prototype.off = function(eventName, callback) {
	this._events.off(eventName, callback);
};
// ../../node_modules/tabbable/dist/index.esm.js
/*!
* tabbable 6.4.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = [
	"input:not([inert]):not([inert] *)",
	"select:not([inert]):not([inert] *)",
	"textarea:not([inert]):not([inert] *)",
	"a[href]:not([inert]):not([inert] *)",
	"button:not([inert]):not([inert] *)",
	"[tabindex]:not(slot):not([inert]):not([inert] *)",
	"audio[controls]:not([inert]):not([inert] *)",
	"video[controls]:not([inert]):not([inert] *)",
	"[contenteditable]:not([contenteditable=\"false\"]):not([inert]):not([inert] *)",
	"details>summary:first-of-type:not([inert]):not([inert] *)",
	"details:not([inert]):not([inert] *)"
];
var candidateSelector = candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
	var _element$getRootNode;
	return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
	return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var _isInert = function isInert(node, lookUp) {
	var _node$getAttribute;
	if (lookUp === void 0) lookUp = true;
	var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
	return inertAtt === "" || inertAtt === "true" || lookUp && node && (typeof node.closest === "function" ? node.closest("[inert]") : _isInert(node.parentNode));
};
var isContentEditable = function isContentEditable(node) {
	var _node$getAttribute2;
	var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
	return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates(el, includeContainer, filter) {
	if (_isInert(el)) return [];
	var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
	if (includeContainer && matches.call(el, candidateSelector)) candidates.unshift(el);
	candidates = candidates.filter(filter);
	return candidates;
};
var _getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
	var candidates = [];
	var elementsToCheck = Array.from(elements);
	while (elementsToCheck.length) {
		var element = elementsToCheck.shift();
		if (_isInert(element, false)) continue;
		if (element.tagName === "SLOT") {
			var assigned = element.assignedElements();
			var nestedCandidates = _getCandidatesIteratively(assigned.length ? assigned : element.children, true, options);
			if (options.flatten) candidates.push.apply(candidates, nestedCandidates);
			else candidates.push({
				scopeParent: element,
				candidates: nestedCandidates
			});
		} else {
			if (matches.call(element, candidateSelector) && options.filter(element) && (includeContainer || !elements.includes(element))) candidates.push(element);
			var shadowRoot = element.shadowRoot || typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
			var validShadowRoot = !_isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
			if (shadowRoot && validShadowRoot) {
				var _nestedCandidates = _getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
				if (options.flatten) candidates.push.apply(candidates, _nestedCandidates);
				else candidates.push({
					scopeParent: element,
					candidates: _nestedCandidates
				});
			} else elementsToCheck.unshift.apply(elementsToCheck, element.children);
		}
	}
	return candidates;
};
var hasTabIndex = function hasTabIndex(node) {
	return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex(node) {
	if (!node) throw new Error("No node provided");
	if (node.tabIndex < 0) {
		if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) return 0;
	}
	return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex(node, isScope) {
	var tabIndex = getTabIndex(node);
	if (tabIndex < 0 && isScope && !hasTabIndex(node)) return 0;
	return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
	return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput(node) {
	return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput(node) {
	return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary(node) {
	return node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
		return child.tagName === "SUMMARY";
	});
};
var getCheckedRadio = function getCheckedRadio(nodes, form) {
	for (var i = 0; i < nodes.length; i++) if (nodes[i].checked && nodes[i].form === form) return nodes[i];
};
var isTabbableRadio = function isTabbableRadio(node) {
	if (!node.name) return true;
	var radioScope = node.form || getRootNode(node);
	var queryRadios = function queryRadios(name) {
		return radioScope.querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]");
	};
	var radioSet;
	if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") radioSet = queryRadios(window.CSS.escape(node.name));
	else try {
		radioSet = queryRadios(node.name);
	} catch (err) {
		console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
		return false;
	}
	var checked = getCheckedRadio(radioSet, node.form);
	return !checked || checked === node;
};
var isRadio = function isRadio(node) {
	return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio(node) {
	return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached(node) {
	var _nodeRoot;
	var nodeRoot = node && getRootNode(node);
	var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
	var attached = false;
	if (nodeRoot && nodeRoot !== node) {
		var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
		attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
		while (!attached && nodeRootHost) {
			var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
			nodeRoot = getRootNode(nodeRootHost);
			nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
			attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
		}
	}
	return attached;
};
var isZeroArea = function isZeroArea(node) {
	var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
	return width === 0 && height === 0;
};
var isHidden = function isHidden(node, _ref) {
	var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
	if (displayCheck === "full-native") {
		if ("checkVisibility" in node) return !node.checkVisibility({
			checkOpacity: false,
			opacityProperty: false,
			contentVisibilityAuto: true,
			visibilityProperty: true,
			checkVisibilityCSS: true
		});
	}
	if (getComputedStyle(node).visibility === "hidden") return true;
	var nodeUnderDetails = matches.call(node, "details>summary:first-of-type") ? node.parentElement : node;
	if (matches.call(nodeUnderDetails, "details:not([open]) *")) return true;
	if (!displayCheck || displayCheck === "full" || displayCheck === "full-native" || displayCheck === "legacy-full") {
		if (typeof getShadowRoot === "function") {
			var originalNode = node;
			while (node) {
				var parentElement = node.parentElement;
				var rootNode = getRootNode(node);
				if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) return isZeroArea(node);
				else if (node.assignedSlot) node = node.assignedSlot;
				else if (!parentElement && rootNode !== node.ownerDocument) node = rootNode.host;
				else node = parentElement;
			}
			node = originalNode;
		}
		if (isNodeAttached(node)) return !node.getClientRects().length;
		if (displayCheck !== "legacy-full") return true;
	} else if (displayCheck === "non-zero-area") return isZeroArea(node);
	return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
	if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
		var parentNode = node.parentElement;
		while (parentNode) {
			if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
				for (var i = 0; i < parentNode.children.length; i++) {
					var child = parentNode.children.item(i);
					if (child.tagName === "LEGEND") return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
				}
				return true;
			}
			parentNode = parentNode.parentElement;
		}
	}
	return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
	if (node.disabled || isHiddenInput(node) || isHidden(node, options) || isDetailsWithSummary(node) || isDisabledFromFieldset(node)) return false;
	return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
	if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) return false;
	return true;
};
var isShadowRootTabbable = function isShadowRootTabbable(shadowHostNode) {
	var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
	if (isNaN(tabIndex) || tabIndex >= 0) return true;
	return false;
};
var _sortByOrder = function sortByOrder(candidates) {
	var regularTabbables = [];
	var orderedTabbables = [];
	candidates.forEach(function(item, i) {
		var isScope = !!item.scopeParent;
		var element = isScope ? item.scopeParent : item;
		var candidateTabindex = getSortOrderTabIndex(element, isScope);
		var elements = isScope ? _sortByOrder(item.candidates) : element;
		if (candidateTabindex === 0) isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
		else orderedTabbables.push({
			documentOrder: i,
			tabIndex: candidateTabindex,
			item,
			isScope,
			content: elements
		});
	});
	return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
		sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
		return acc;
	}, []).concat(regularTabbables);
};
var tabbable = function tabbable(container, options) {
	options = options || {};
	var candidates;
	if (options.getShadowRoot) candidates = _getCandidatesIteratively([container], options.includeContainer, {
		filter: isNodeMatchingSelectorTabbable.bind(null, options),
		flatten: false,
		getShadowRoot: options.getShadowRoot,
		shadowRootFilter: isShadowRootTabbable
	});
	else candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
	return _sortByOrder(candidates);
};
var focusable = function focusable(container, options) {
	options = options || {};
	var candidates;
	if (options.getShadowRoot) candidates = _getCandidatesIteratively([container], options.includeContainer, {
		filter: isNodeMatchingSelectorFocusable.bind(null, options),
		flatten: true,
		getShadowRoot: options.getShadowRoot
	});
	else candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
	return candidates;
};
var isTabbable = function isTabbable(node, options) {
	options = options || {};
	if (!node) throw new Error("No node provided");
	if (matches.call(node, candidateSelector) === false) return false;
	return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = candidateSelectors.concat("iframe:not([inert]):not([inert] *)").join(",");
var isFocusable = function isFocusable(node, options) {
	options = options || {};
	if (!node) throw new Error("No node provided");
	if (matches.call(node, focusableCandidateSelector) === false) return false;
	return isNodeMatchingSelectorFocusable(options, node);
};
// ../../node_modules/focus-trap/dist/focus-trap.esm.js
/*!
* focus-trap 8.0.0
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _arrayWithoutHoles(r) {
	if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
	try {
		var i = n[a](c), u = i.value;
	} catch (n) {
		e(n);
		return;
	}
	i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
	return function() {
		var t = this, e = arguments;
		return new Promise(function(r, o) {
			var a = n.apply(t, e);
			function _next(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
			}
			function _throw(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
			}
			_next(void 0);
		});
	};
}
function _createForOfIteratorHelper(r, e) {
	var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (!t) {
		if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
			t && (r = t);
			var n = 0, F = function() {};
			return {
				s: F,
				n: function() {
					return n >= r.length ? { done: true } : {
						done: false,
						value: r[n++]
					};
				},
				e: function(r) {
					throw r;
				},
				f: F
			};
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var o, a = true, u = false;
	return {
		s: function() {
			t = t.call(r);
		},
		n: function() {
			var r = t.next();
			return a = r.done, r;
		},
		e: function(r) {
			u = true, o = r;
		},
		f: function() {
			try {
				a || null == t.return || t.return();
			} finally {
				if (u) throw o;
			}
		}
	};
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: true,
		configurable: true,
		writable: true
	}) : e[r] = t, e;
}
function _iterableToArray(r) {
	if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _regenerator() {
	/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
	var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
	function i(r, n, o, i) {
		var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype);
		return _regeneratorDefine(u, "_invoke", function(r, n, o) {
			var i, c, u, f = 0, p = o || [], y = false, G = {
				p: 0,
				n: 0,
				v: e,
				a: d,
				f: d.bind(e, 4),
				d: function(t, r) {
					return i = t, c = 0, u = e, G.n = r, a;
				}
			};
			function d(r, n) {
				for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
					var o, i = p[t], d = G.p, l = i[2];
					r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
				}
				if (o || r > 1) return a;
				throw y = true, n;
			}
			return function(o, p, l) {
				if (f > 1) throw TypeError("Generator is already running");
				for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
					i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
					try {
						if (f = 2, i) {
							if (c || (o = "next"), t = i[o]) {
								if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
								if (!t.done) return t;
								u = t.value, c < 2 && (c = 0);
							} else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
							i = e;
						} else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
					} catch (t) {
						i = e, c = 1, u = t;
					} finally {
						f = 1;
					}
				}
				return {
					value: t,
					done: y
				};
			};
		}(r, o, i), true), u;
	}
	var a = {};
	function Generator() {}
	function GeneratorFunction() {}
	function GeneratorFunctionPrototype() {}
	t = Object.getPrototypeOf;
	var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function() {
		return this;
	}), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
	function f(e) {
		return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
	}
	return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function() {
		return this;
	}), _regeneratorDefine(u, "toString", function() {
		return "[object Generator]";
	}), (_regenerator = function() {
		return {
			w: i,
			m: f
		};
	})();
}
function _regeneratorDefine(e, r, n, t) {
	var i = Object.defineProperty;
	try {
		i({}, "", {});
	} catch (e) {
		i = 0;
	}
	_regeneratorDefine = function(e, r, n, t) {
		function o(r, n) {
			_regeneratorDefine(e, r, function(e) {
				return this._invoke(r, n, e);
			});
		}
		r ? i ? i(e, r, {
			value: n,
			enumerable: !t,
			configurable: !t,
			writable: !t
		}) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
	}, _regeneratorDefine(e, r, n, t);
}
function _toConsumableArray(r) {
	return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r);
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}
var activeFocusTraps = {
	getActiveTrap: function getActiveTrap(trapStack) {
		if ((trapStack === null || trapStack === void 0 ? void 0 : trapStack.length) > 0) return trapStack[trapStack.length - 1];
		return null;
	},
	activateTrap: function activateTrap(trapStack, trap) {
		if (trap !== activeFocusTraps.getActiveTrap(trapStack)) activeFocusTraps.pauseTrap(trapStack);
		var trapIndex = trapStack.indexOf(trap);
		if (trapIndex === -1) trapStack.push(trap);
		else {
			trapStack.splice(trapIndex, 1);
			trapStack.push(trap);
		}
	},
	deactivateTrap: function deactivateTrap(trapStack, trap) {
		var trapIndex = trapStack.indexOf(trap);
		if (trapIndex !== -1) trapStack.splice(trapIndex, 1);
		activeFocusTraps.unpauseTrap(trapStack);
	},
	pauseTrap: function pauseTrap(trapStack) {
		var activeTrap = activeFocusTraps.getActiveTrap(trapStack);
		activeTrap === null || activeTrap === void 0 || activeTrap._setPausedState(true);
	},
	unpauseTrap: function unpauseTrap(trapStack) {
		var activeTrap = activeFocusTraps.getActiveTrap(trapStack);
		if (activeTrap && !activeTrap._isManuallyPaused()) activeTrap._setPausedState(false);
	}
};
var isSelectableInput = function isSelectableInput(node) {
	return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
};
var isEscapeEvent = function isEscapeEvent(e) {
	return (e === null || e === void 0 ? void 0 : e.key) === "Escape" || (e === null || e === void 0 ? void 0 : e.key) === "Esc" || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
};
var isTabEvent = function isTabEvent(e) {
	return (e === null || e === void 0 ? void 0 : e.key) === "Tab" || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
};
var isKeyForward = function isKeyForward(e) {
	return isTabEvent(e) && !e.shiftKey;
};
var isKeyBackward = function isKeyBackward(e) {
	return isTabEvent(e) && e.shiftKey;
};
var delay = function delay(fn) {
	return setTimeout(fn, 0);
};
var valueOrHandler = function valueOrHandler(value) {
	for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) params[_key - 1] = arguments[_key];
	return typeof value === "function" ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget(event) {
	return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
};
var internalTrapStack = [];
var createFocusTrap = function createFocusTrap(elements, userOptions) {
	var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
	var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
	var config = _objectSpread2({
		returnFocusOnDeactivate: true,
		escapeDeactivates: true,
		delayInitialFocus: true,
		isolateSubtrees: false,
		isKeyForward,
		isKeyBackward
	}, userOptions);
	var state = {
		containers: [],
		containerGroups: [],
		tabbableGroups: [],
		adjacentElements: new Set(),
		alreadySilent: new Set(),
		nodeFocusedBeforeActivation: null,
		mostRecentlyFocusedNode: null,
		active: false,
		paused: false,
		manuallyPaused: false,
		delayInitialFocusTimer: void 0,
		recentNavEvent: void 0
	};
	var trap;
	var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
		return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
	};
	var findContainerIndex = function findContainerIndex(element, event) {
		var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === "function" ? event.composedPath() : void 0;
		return state.containerGroups.findIndex(function(_ref) {
			var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
			return container.contains(element) || (composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function(node) {
				return node === element;
			});
		});
	};
	var getNodeForOption = function getNodeForOption(optionName) {
		var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref2$hasFallback = _ref2.hasFallback, hasFallback = _ref2$hasFallback === void 0 ? false : _ref2$hasFallback, _ref2$params = _ref2.params, params = _ref2$params === void 0 ? [] : _ref2$params;
		var optionValue = config[optionName];
		if (typeof optionValue === "function") optionValue = optionValue.apply(void 0, _toConsumableArray(params));
		if (optionValue === true) optionValue = void 0;
		if (!optionValue) {
			if (optionValue === void 0 || optionValue === false) return optionValue;
			throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
		}
		var node = optionValue;
		if (typeof optionValue === "string") {
			try {
				node = doc.querySelector(optionValue);
			} catch (err) {
				throw new Error("`".concat(optionName, "` appears to be an invalid selector; error=\"").concat(err.message, "\""));
			}
			if (!node) {
				if (!hasFallback) throw new Error("`".concat(optionName, "` as selector refers to no known node"));
			}
		}
		return node;
	};
	var getInitialFocusNode = function getInitialFocusNode() {
		var node = getNodeForOption("initialFocus", { hasFallback: true });
		if (node === false) return false;
		if (node === void 0 || node && !isFocusable(node, config.tabbableOptions)) {
			if (findContainerIndex(doc.activeElement) >= 0) node = doc.activeElement;
			else {
				var firstTabbableGroup = state.tabbableGroups[0];
				node = firstTabbableGroup && firstTabbableGroup.firstTabbableNode || getNodeForOption("fallbackFocus");
			}
		} else if (node === null) node = getNodeForOption("fallbackFocus");
		if (!node) throw new Error("Your focus-trap needs to have at least one focusable element");
		return node;
	};
	var updateTabbableNodes = function updateTabbableNodes() {
		state.containerGroups = state.containers.map(function(container) {
			var tabbableNodes = tabbable(container, config.tabbableOptions);
			var focusableNodes = focusable(container, config.tabbableOptions);
			var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0;
			var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0;
			var firstDomTabbableNode = focusableNodes.find(function(node) {
				return isTabbable(node);
			});
			var lastDomTabbableNode = focusableNodes.slice().reverse().find(function(node) {
				return isTabbable(node);
			});
			return {
				container,
				tabbableNodes,
				focusableNodes,
				posTabIndexesFound: !!tabbableNodes.find(function(node) {
					return getTabIndex(node) > 0;
				}),
				firstTabbableNode,
				lastTabbableNode,
				firstDomTabbableNode,
				lastDomTabbableNode,
				nextTabbableNode: function nextTabbableNode(node) {
					var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
					var nodeIdx = tabbableNodes.indexOf(node);
					if (nodeIdx < 0) {
						if (forward) return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function(el) {
							return isTabbable(el);
						});
						return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function(el) {
							return isTabbable(el);
						});
					}
					return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
				}
			};
		});
		state.tabbableGroups = state.containerGroups.filter(function(group) {
			return group.tabbableNodes.length > 0;
		});
		if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
		if (state.containerGroups.find(function(g) {
			return g.posTabIndexesFound;
		}) && state.containerGroups.length > 1) throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
	};
	var _getActiveElement = function getActiveElement(el) {
		var activeElement = el.activeElement;
		if (!activeElement) return;
		if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) return _getActiveElement(activeElement.shadowRoot);
		return activeElement;
	};
	var _tryFocus = function tryFocus(node) {
		if (node === false) return;
		if (node === _getActiveElement(document)) return;
		if (!node || !node.focus) {
			_tryFocus(getInitialFocusNode());
			return;
		}
		node.focus({ preventScroll: !!config.preventScroll });
		state.mostRecentlyFocusedNode = node;
		if (isSelectableInput(node)) node.select();
	};
	var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
		var node = getNodeForOption("setReturnFocus", { params: [previousActiveElement] });
		return node ? node : node === false ? false : previousActiveElement;
	};
	var findNextNavNode = function findNextNavNode(_ref3) {
		var target = _ref3.target, event = _ref3.event, _ref3$isBackward = _ref3.isBackward, isBackward = _ref3$isBackward === void 0 ? false : _ref3$isBackward;
		target = target || getActualTarget(event);
		updateTabbableNodes();
		var destinationNode = null;
		if (state.tabbableGroups.length > 0) {
			var containerIndex = findContainerIndex(target, event);
			var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
			if (containerIndex < 0) {
				if (isBackward) destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
				else destinationNode = state.tabbableGroups[0].firstTabbableNode;
			} else if (isBackward) {
				var startOfGroupIndex = state.tabbableGroups.findIndex(function(_ref4) {
					var firstTabbableNode = _ref4.firstTabbableNode;
					return target === firstTabbableNode;
				});
				if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) startOfGroupIndex = containerIndex;
				if (startOfGroupIndex >= 0) {
					var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
					var destinationGroup = state.tabbableGroups[destinationGroupIndex];
					destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
				} else if (!isTabEvent(event)) destinationNode = containerGroup.nextTabbableNode(target, false);
			} else {
				var lastOfGroupIndex = state.tabbableGroups.findIndex(function(_ref5) {
					var lastTabbableNode = _ref5.lastTabbableNode;
					return target === lastTabbableNode;
				});
				if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) lastOfGroupIndex = containerIndex;
				if (lastOfGroupIndex >= 0) {
					var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
					var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
					destinationNode = getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
				} else if (!isTabEvent(event)) destinationNode = containerGroup.nextTabbableNode(target);
			}
		} else destinationNode = getNodeForOption("fallbackFocus");
		return destinationNode;
	};
	var checkPointerDown = function checkPointerDown(e) {
		if (findContainerIndex(getActualTarget(e), e) >= 0) return;
		if (valueOrHandler(config.clickOutsideDeactivates, e)) {
			trap.deactivate({ returnFocus: config.returnFocusOnDeactivate });
			return;
		}
		if (valueOrHandler(config.allowOutsideClick, e)) return;
		e.preventDefault();
	};
	var checkFocusIn = function checkFocusIn(event) {
		var target = getActualTarget(event);
		var targetContained = findContainerIndex(target, event) >= 0;
		if (targetContained || target instanceof Document) {
			if (targetContained) state.mostRecentlyFocusedNode = target;
		} else {
			event.stopImmediatePropagation();
			var nextNode;
			var navAcrossContainers = true;
			if (state.mostRecentlyFocusedNode) {
				if (getTabIndex(state.mostRecentlyFocusedNode) > 0) {
					var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
					var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
					if (tabbableNodes.length > 0) {
						var mruTabIdx = tabbableNodes.findIndex(function(node) {
							return node === state.mostRecentlyFocusedNode;
						});
						if (mruTabIdx >= 0) {
							if (config.isKeyForward(state.recentNavEvent)) {
								if (mruTabIdx + 1 < tabbableNodes.length) {
									nextNode = tabbableNodes[mruTabIdx + 1];
									navAcrossContainers = false;
								}
							} else if (mruTabIdx - 1 >= 0) {
								nextNode = tabbableNodes[mruTabIdx - 1];
								navAcrossContainers = false;
							}
						}
					}
				} else if (!state.containerGroups.some(function(g) {
					return g.tabbableNodes.some(function(n) {
						return getTabIndex(n) > 0;
					});
				})) navAcrossContainers = false;
			} else navAcrossContainers = false;
			if (navAcrossContainers) nextNode = findNextNavNode({
				target: state.mostRecentlyFocusedNode,
				isBackward: config.isKeyBackward(state.recentNavEvent)
			});
			if (nextNode) _tryFocus(nextNode);
			else _tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
		}
		state.recentNavEvent = void 0;
	};
	var checkKeyNav = function checkKeyNav(event) {
		var isBackward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
		state.recentNavEvent = event;
		var destinationNode = findNextNavNode({
			event,
			isBackward
		});
		if (destinationNode) {
			if (isTabEvent(event)) event.preventDefault();
			_tryFocus(destinationNode);
		}
	};
	var checkTabKey = function checkTabKey(event) {
		if (config.isKeyForward(event) || config.isKeyBackward(event)) checkKeyNav(event, config.isKeyBackward(event));
	};
	var checkEscapeKey = function checkEscapeKey(event) {
		if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
			event.preventDefault();
			trap.deactivate();
		}
	};
	var checkClick = function checkClick(e) {
		if (findContainerIndex(getActualTarget(e), e) >= 0) return;
		if (valueOrHandler(config.clickOutsideDeactivates, e)) return;
		if (valueOrHandler(config.allowOutsideClick, e)) return;
		e.preventDefault();
		e.stopImmediatePropagation();
	};
	var addListeners = function addListeners() {
		if (!state.active) return Promise.resolve();
		activeFocusTraps.activateTrap(trapStack, trap);
		var promise;
		if (config.delayInitialFocus) promise = new Promise(function(resolve) {
			state.delayInitialFocusTimer = delay(function() {
				_tryFocus(getInitialFocusNode());
				resolve();
			});
		});
		else {
			promise = Promise.resolve();
			_tryFocus(getInitialFocusNode());
		}
		doc.addEventListener("focusin", checkFocusIn, true);
		doc.addEventListener("mousedown", checkPointerDown, {
			capture: true,
			passive: false
		});
		doc.addEventListener("touchstart", checkPointerDown, {
			capture: true,
			passive: false
		});
		doc.addEventListener("click", checkClick, {
			capture: true,
			passive: false
		});
		doc.addEventListener("keydown", checkTabKey, {
			capture: true,
			passive: false
		});
		doc.addEventListener("keydown", checkEscapeKey);
		return promise;
	};
	var collectAdjacentElements = function collectAdjacentElements(containers) {
		if (state.active && !state.paused) trap._setSubtreeIsolation(false);
		state.adjacentElements.clear();
		state.alreadySilent.clear();
		var containerAncestors = new Set();
		var adjacentElements = new Set();
		var _iterator = _createForOfIteratorHelper(containers), _step;
		try {
			for (_iterator.s(); !(_step = _iterator.n()).done;) {
				var container = _step.value;
				containerAncestors.add(container);
				var insideShadowRoot = typeof ShadowRoot !== "undefined" && container.getRootNode() instanceof ShadowRoot;
				var current = container;
				while (current) {
					containerAncestors.add(current);
					var parent = current.parentElement;
					var siblings = [];
					if (parent) siblings = parent.children;
					else if (!parent && insideShadowRoot) {
						siblings = current.getRootNode().children;
						parent = current.getRootNode().host;
						insideShadowRoot = typeof ShadowRoot !== "undefined" && parent.getRootNode() instanceof ShadowRoot;
					}
					var _iterator2 = _createForOfIteratorHelper(siblings), _step2;
					try {
						for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
							var child = _step2.value;
							adjacentElements.add(child);
						}
					} catch (err) {
						_iterator2.e(err);
					} finally {
						_iterator2.f();
					}
					current = parent;
				}
			}
		} catch (err) {
			_iterator.e(err);
		} finally {
			_iterator.f();
		}
		containerAncestors.forEach(function(el) {
			adjacentElements["delete"](el);
		});
		state.adjacentElements = adjacentElements;
	};
	var removeListeners = function removeListeners() {
		if (!state.active) return;
		doc.removeEventListener("focusin", checkFocusIn, true);
		doc.removeEventListener("mousedown", checkPointerDown, true);
		doc.removeEventListener("touchstart", checkPointerDown, true);
		doc.removeEventListener("click", checkClick, true);
		doc.removeEventListener("keydown", checkTabKey, true);
		doc.removeEventListener("keydown", checkEscapeKey);
		return trap;
	};
	var mutationObserver = typeof window !== "undefined" && "MutationObserver" in window ? new MutationObserver(function checkDomRemoval(mutations) {
		if (mutations.some(function(mutation) {
			return Array.from(mutation.removedNodes).some(function(node) {
				return node === state.mostRecentlyFocusedNode;
			});
		})) _tryFocus(getInitialFocusNode());
	}) : void 0;
	var updateObservedNodes = function updateObservedNodes() {
		if (!mutationObserver) return;
		mutationObserver.disconnect();
		if (state.active && !state.paused) state.containers.map(function(container) {
			mutationObserver.observe(container, {
				subtree: true,
				childList: true
			});
		});
	};
	trap = {
		get active() {
			return state.active;
		},
		get paused() {
			return state.paused;
		},
		activate: function activate(activateOptions) {
			if (state.active) return this;
			var onActivate = getOption(activateOptions, "onActivate");
			var onPostActivate = getOption(activateOptions, "onPostActivate");
			var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
			var preexistingTrap = activeFocusTraps.getActiveTrap(trapStack);
			var revertState = false;
			if (preexistingTrap && !preexistingTrap.paused) {
				var _preexistingTrap$_set;
				(_preexistingTrap$_set = preexistingTrap._setSubtreeIsolation) === null || _preexistingTrap$_set === void 0 || _preexistingTrap$_set.call(preexistingTrap, false);
				revertState = true;
			}
			try {
				if (!checkCanFocusTrap) updateTabbableNodes();
				state.active = true;
				state.paused = false;
				state.nodeFocusedBeforeActivation = _getActiveElement(doc);
				onActivate === null || onActivate === void 0 || onActivate();
				var finishActivation = function() {
					var _ref6 = _asyncToGenerator(_regenerator().m(function _callee() {
						return _regenerator().w(function(_context) {
							while (1) switch (_context.n) {
								case 0:
									if (checkCanFocusTrap) updateTabbableNodes();
									_context.n = 1;
									return addListeners();
								case 1:
									trap._setSubtreeIsolation(true);
									updateObservedNodes();
									onPostActivate === null || onPostActivate === void 0 || onPostActivate();
								case 2: return _context.a(2);
							}
						}, _callee);
					}));
					return function finishActivation() {
						return _ref6.apply(this, arguments);
					};
				}();
				if (checkCanFocusTrap) {
					checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
					return this;
				}
				finishActivation();
			} catch (error) {
				if (preexistingTrap === activeFocusTraps.getActiveTrap(trapStack) && revertState) {
					var _preexistingTrap$_set2;
					(_preexistingTrap$_set2 = preexistingTrap._setSubtreeIsolation) === null || _preexistingTrap$_set2 === void 0 || _preexistingTrap$_set2.call(preexistingTrap, true);
				}
				throw error;
			}
			return this;
		},
		deactivate: function deactivate(deactivateOptions) {
			if (!state.active) return this;
			var options = _objectSpread2({
				onDeactivate: config.onDeactivate,
				onPostDeactivate: config.onPostDeactivate,
				checkCanReturnFocus: config.checkCanReturnFocus
			}, deactivateOptions);
			clearTimeout(state.delayInitialFocusTimer);
			state.delayInitialFocusTimer = void 0;
			if (!state.paused) trap._setSubtreeIsolation(false);
			state.alreadySilent.clear();
			removeListeners();
			state.active = false;
			state.paused = false;
			updateObservedNodes();
			activeFocusTraps.deactivateTrap(trapStack, trap);
			var onDeactivate = getOption(options, "onDeactivate");
			var onPostDeactivate = getOption(options, "onPostDeactivate");
			var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
			var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
			onDeactivate === null || onDeactivate === void 0 || onDeactivate();
			var finishDeactivation = function finishDeactivation() {
				delay(function() {
					if (returnFocus) _tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
					onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
				});
			};
			if (returnFocus && checkCanReturnFocus) {
				checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
				return this;
			}
			finishDeactivation();
			return this;
		},
		pause: function pause(pauseOptions) {
			if (!state.active) return this;
			state.manuallyPaused = true;
			return this._setPausedState(true, pauseOptions);
		},
		unpause: function unpause(unpauseOptions) {
			if (!state.active) return this;
			state.manuallyPaused = false;
			if (trapStack[trapStack.length - 1] !== this) return this;
			return this._setPausedState(false, unpauseOptions);
		},
		updateContainerElements: function updateContainerElements(containerElements) {
			state.containers = [].concat(containerElements).filter(Boolean).map(function(element) {
				return typeof element === "string" ? doc.querySelector(element) : element;
			});
			if (config.isolateSubtrees) collectAdjacentElements(state.containers);
			if (state.active) {
				updateTabbableNodes();
				if (!state.paused) trap._setSubtreeIsolation(true);
			}
			updateObservedNodes();
			return this;
		}
	};
	Object.defineProperties(trap, {
		_isManuallyPaused: { value: function value() {
			return state.manuallyPaused;
		} },
		_setPausedState: { value: function value(paused, options) {
			if (state.paused === paused) return this;
			state.paused = paused;
			if (paused) {
				var onPause = getOption(options, "onPause");
				var onPostPause = getOption(options, "onPostPause");
				onPause === null || onPause === void 0 || onPause();
				removeListeners();
				trap._setSubtreeIsolation(false);
				updateObservedNodes();
				onPostPause === null || onPostPause === void 0 || onPostPause();
			} else {
				var onUnpause = getOption(options, "onUnpause");
				var onPostUnpause = getOption(options, "onPostUnpause");
				onUnpause === null || onUnpause === void 0 || onUnpause();
				(function() {
					var _ref7 = _asyncToGenerator(_regenerator().m(function _callee2() {
						return _regenerator().w(function(_context2) {
							while (1) switch (_context2.n) {
								case 0:
									updateTabbableNodes();
									_context2.n = 1;
									return addListeners();
								case 1:
									trap._setSubtreeIsolation(true);
									updateObservedNodes();
									onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
								case 2: return _context2.a(2);
							}
						}, _callee2);
					}));
					return function finishUnpause() {
						return _ref7.apply(this, arguments);
					};
				})()();
			}
			return this;
		} },
		_setSubtreeIsolation: { value: function value(isEnabled) {
			if (config.isolateSubtrees) state.adjacentElements.forEach(function(el) {
				var _el$getAttribute;
				if (isEnabled) switch (config.isolateSubtrees) {
					case "aria-hidden":
						if (el.ariaHidden === "true" || ((_el$getAttribute = el.getAttribute("aria-hidden")) === null || _el$getAttribute === void 0 ? void 0 : _el$getAttribute.toLowerCase()) === "true") state.alreadySilent.add(el);
						el.setAttribute("aria-hidden", "true");
						break;
					default:
						if (el.inert || el.hasAttribute("inert")) state.alreadySilent.add(el);
						el.setAttribute("inert", true);
				}
				else if (state.alreadySilent.has(el));
				else switch (config.isolateSubtrees) {
					case "aria-hidden":
						el.removeAttribute("aria-hidden");
						break;
					default: el.removeAttribute("inert");
				}
			});
		} }
	});
	trap.updateContainerElements(elements);
	return trap;
};
// ../../node_modules/@bpmn-io/properties-panel/dist/index.esm.js
init_dist();
function Arrow(props) {
	return u("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		...props,
		children: u("path", {
			fillRule: "evenodd",
			d: "M10,12 L3,12 C2.44771525,12 2,11.5522847 2,11 C2,10.4477153 2.44771525,10 3,10 L8,10 L8,5 C8,4.44771525 8.44771525,4 9,4 C9.55228475,4 10,4.44771525 10,5 L10,12 Z",
			transform: "rotate(-45 6 8)"
		})
	});
}
function Close(props) {
	return u("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		...props,
		children: u("path", {
			fillRule: "evenodd",
			d: "M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z",
			fill: "currentColor"
		})
	});
}
function Create(props) {
	return u("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		...props,
		children: u("path", {
			fillRule: "evenodd",
			d: "M9,13 L9,9 L9,9 L13,9 C13.5522847,9 14,8.55228475 14,8 C14,7.44771525 13.5522847,7 13,7 L9,7 L9,7 L9,3 C9,2.44771525 8.55228475,2 8,2 C7.44771525,2 7,2.44771525 7,3 L7,7 L7,7 L3,7 C2.44771525,7 2,7.44771525 2,8 C2,8.55228475 2.44771525,9 3,9 L7,9 L7,9 L7,13 C7,13.5522847 7.44771525,14 8,14 C8.55228475,14 9,13.5522847 9,13 Z"
		})
	});
}
function Delete(props) {
	return u("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		...props,
		children: u("path", {
			fillRule: "evenodd",
			d: "M9,4 L9,11 C9,12.1 8.6,12.55 7.5,12.55 L2.5,12.55 C1.4,12.55 1,12.1 1,11 L1,4 L9,4 Z M7.5,5.5 L2.5,5.5 L2.5,9.8 C2.5,10.46 3,11 3.61111111,11 L6.38888889,11 C7,11 7.5,10.46 7.5,9.8 L7.5,5.5 Z M10,1 L8,1 L7,0 L3,0 L2,1 L0,1 L0,2.5 L10,2.5 L10,1 Z",
			transform: "translate(3 2)"
		})
	});
}
function Drag(props) {
	return u("svg", {
		width: "16",
		height: "16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [
			u("path", {
				fill: "#fff",
				style: { mixBlendMode: "multiply" },
				d: "M0 0h16v16H0z"
			}),
			u("path", {
				fill: "#fff",
				style: { mixBlendMode: "multiply" },
				d: "M0 0h16v16H0z"
			}),
			u("path", {
				d: "M7 3H5v2h2V3zM11 3H9v2h2V3zM7 7H5v2h2V7zM11 7H9v2h2V7zM7 11H5v2h2v-2zM11 11H9v2h2v-2z",
				fill: "#161616"
			})
		]
	});
}
function ExternalLink(props) {
	return u("svg", {
		width: "16",
		height: "16",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: u("path", {
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: "M12.637 12.637v-4.72h1.362v4.721c0 .36-.137.676-.411.95-.275.275-.591.412-.95.412H3.362c-.38 0-.703-.132-.967-.396A1.315 1.315 0 0 1 2 12.638V3.362c0-.38.132-.703.396-.967S2.982 2 3.363 2h4.553v1.363H3.363v9.274h9.274ZM14 2H9.28l-.001 1.362h2.408L5.065 9.984l.95.95 6.622-6.622v2.409H14V2Z",
			fill: "currentcolor"
		})
	});
}
function Feel(props) {
	return u("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		...props,
		children: [u("path", {
			d: "M3.6168 11.9894C3.47957 12.6745 3.22473 13.1809 2.85227 13.5085C2.48961 13.8362 1.97012 14 1.29381 14H0L0.308751 12.4213H1.57316L3.08751 4.78085H2.17596L2.48471 3.20213H3.39626L3.6315 2.01064C3.76872 1.32553 4.01866 0.819149 4.38132 0.491489C4.75378 0.16383 5.27817 0 5.95448 0H7.2483L6.93954 1.57872H5.67514L5.35168 3.20213H6.61609L6.30734 4.78085H5.04293L3.6168 11.9894Z",
			fill: "currentcolor"
		}), u("path", {
			d: "M5.60492 11.0213L8.63361 6.86596L7.28099 3.20213H9.35403L10.0598 5.74894H10.2362L11.927 3.20213H14L10.986 7.25319L12.3239 11.0213H10.2509L9.54517 8.41489H9.36874L7.67796 11.0213H5.60492Z",
			fill: "currentcolor"
		})]
	});
}
function Info(props) {
	return u("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		"stroke-width": "2.2",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		...props,
		children: [
			u("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}),
			u("path", { d: "M12 16v-4" }),
			u("path", { d: "M12 8h.01" })
		]
	});
}
function Launch(props) {
	return u("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 32 32",
		...props,
		children: [u("path", { d: "M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z" }), u("polygon", { points: "20 2 20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2" })]
	});
}
function OpenPopup(props) {
	return u("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 16 16",
		...props,
		children: u("path", { d: "M6 15L6 14 2.7 14 7 9.7 6.3 9 2 13.3 2 10 1 10 1 15zM10 1L10 2 13.3 2 9 6.3 9.7 7 14 2.7 14 6 15 6 15 1z" })
	});
}
function translateFallback(template, replacements) {
	replacements = replacements || {};
	return template.replace(/{([^}]+)}/g, function(_, key) {
		return replacements[key] || "{" + key + "}";
	});
}
function Header(props) {
	const { element, headerProvider, translate = translateFallback } = props;
	const { getElementIcon, getDocumentationRef, getElementLabel, getTypeLabel } = headerProvider;
	const label = getElementLabel(element);
	const type = getTypeLabel(element);
	const documentationRef = getDocumentationRef && getDocumentationRef(element);
	const ElementIcon = getElementIcon(element);
	return u("div", {
		class: "bio-properties-panel-header",
		children: [
			u("div", {
				class: "bio-properties-panel-header-icon",
				children: ElementIcon && u(ElementIcon, {
					width: "32",
					height: "32",
					viewBox: "0 0 32 32"
				})
			}),
			u("div", {
				class: "bio-properties-panel-header-labels",
				children: [u("div", {
					class: "bio-properties-panel-header-type",
					children: type
				}), label ? u("div", {
					class: "bio-properties-panel-header-label",
					children: label
				}) : null]
			}),
			u("div", {
				class: "bio-properties-panel-header-actions",
				children: documentationRef ? u("a", {
					rel: "noreferrer",
					class: "bio-properties-panel-header-link",
					href: documentationRef,
					title: translate("Open documentation"),
					target: "_blank",
					children: u(ExternalLink, {})
				}) : null
			})
		]
	});
}
var DescriptionContext = X$1({
	description: {},
	getDescriptionForId: () => {}
});
var DiagnosticsContext = X$1({ diagnostics: {} });
var ErrorsContext = X$1({ errors: {} });
var EventContext = X$1({ eventBus: null });
var FeelLanguageContext = X$1({});
var LayoutContext = X$1({
	layout: {},
	setLayout: () => {},
	getLayoutForKey: () => {},
	setLayoutForKey: () => {}
});
var TooltipContext = X$1({
	tooltip: {},
	getTooltipForId: () => {}
});
function useTooltipContext(id, element) {
	const { getTooltipForId } = x$1(TooltipContext);
	return getTooltipForId(id, element);
}
var TOOLTIP_ID = "bio-properties-panel-tooltip";
function TooltipWrapper(props) {
	const { forId, element } = props;
	const contextDescription = useTooltipContext(forId, element);
	const value = props.value || contextDescription;
	if (!value) return props.children;
	return u(Tooltip, {
		...props,
		value,
		forId: `bio-properties-panel-${forId}`
	});
}
function Tooltip(props) {
	const { forId, value, parent, direction = "right", position, showDelay = 250, hideDelay = 250, focusable = true } = props;
	const [visible, setVisible] = d(false);
	const [tooltipPosition, setTooltipPosition] = d(null);
	const [arrowOffset, setArrowOffset] = d(null);
	const showTimeoutRef = A$1(null);
	const hideTimeoutRef = A$1(null);
	const wrapperRef = A$1(null);
	const tooltipRef = A$1(null);
	const show = (_, delay) => {
		clearTimeout(showTimeoutRef.current);
		clearTimeout(hideTimeoutRef.current);
		if (visible) return;
		if (delay) showTimeoutRef.current = setTimeout(() => {
			setVisible(true);
		}, showDelay);
		else setVisible(true);
	};
	const handleWrapperMouseEnter = (e) => {
		show(e, true);
	};
	const hide = (delay = false) => {
		clearTimeout(showTimeoutRef.current);
		clearTimeout(hideTimeoutRef.current);
		if (delay) hideTimeoutRef.current = setTimeout(() => {
			setVisible(false);
		}, hideDelay);
		else setVisible(false);
	};
	h(() => {
		return () => {
			clearTimeout(showTimeoutRef.current);
			clearTimeout(hideTimeoutRef.current);
		};
	}, []);
	h(() => {
		if (!visible) return;
		const handleClickOutside = (e) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target) && tooltipRef.current && !tooltipRef.current.contains(e.target)) hide(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [visible, hide]);
	_(() => {
		if (!visible || position) {
			setTooltipPosition(null);
			setArrowOffset(null);
			return;
		}
		if (!wrapperRef.current || !tooltipRef.current) return;
		const { tooltipPosition: newPosition, arrowOffset: newArrowOffset } = getTooltipPosition(wrapperRef.current, tooltipRef.current, direction);
		setTooltipPosition(newPosition);
		setArrowOffset(newArrowOffset);
	}, [visible, position]);
	const handleMouseLeave = ({ relatedTarget }) => {
		if (relatedTarget === wrapperRef.current || relatedTarget === tooltipRef.current || relatedTarget?.parentElement === tooltipRef.current) return;
		const selection = window.getSelection();
		if (selection && selection.toString().length > 0) {
			const selectionRange = selection.getRangeAt(0);
			if (tooltipRef.current?.contains(selectionRange.commonAncestorContainer) || tooltipRef.current?.contains(selection.anchorNode) || tooltipRef.current?.contains(selection.focusNode)) return;
		}
		hide(true);
	};
	const handleTooltipMouseEnter = () => {
		clearTimeout(hideTimeoutRef.current);
	};
	const handleFocusOut = (e) => {
		const { relatedTarget } = e;
		if (tooltipRef.current?.contains(relatedTarget) || wrapperRef.current?.contains(relatedTarget)) return;
		hide(false);
	};
	const hideTooltipViaEscape = (e) => {
		e.code === "Escape" && hide(false);
	};
	const renderTooltip = () => {
		const tooltipStyle = position || (tooltipPosition ? `right: ${tooltipPosition.right}; top: ${tooltipPosition.top}px;` : void 0);
		const arrowStyle = arrowOffset != null ? `margin-top: ${arrowOffset}px;` : void 0;
		return u("div", {
			class: `bio-properties-panel-tooltip bio-theme-parent ${direction}`,
			role: "tooltip",
			id: TOOLTIP_ID,
			"aria-labelledby": forId,
			style: tooltipStyle,
			ref: tooltipRef,
			onClick: (e) => e.stopPropagation(),
			onMouseEnter: handleTooltipMouseEnter,
			onMouseLeave: handleMouseLeave,
			children: [u("div", {
				class: "bio-properties-panel-tooltip-content",
				children: value
			}), u("div", {
				class: "bio-properties-panel-tooltip-arrow",
				style: arrowStyle
			})]
		});
	};
	return u("div", {
		class: "bio-properties-panel-tooltip-wrapper",
		tabIndex: focusable ? "0" : void 0,
		ref: wrapperRef,
		onMouseEnter: handleWrapperMouseEnter,
		onMouseLeave: handleMouseLeave,
		onFocusIn: show,
		onFocusOut: handleFocusOut,
		onKeyDown: hideTooltipViaEscape,
		children: [props.children, visible ? parent ? $(renderTooltip(), parent.current) : renderTooltip() : null]
	});
}
function getTooltipPosition(refElement, tooltipElement, direction) {
	if (!refElement) return {
		tooltipPosition: null,
		arrowOffset: null
	};
	const refPosition = refElement.getBoundingClientRect();
	const right = `calc(100% - ${refPosition.x}px)`;
	let top = refPosition.top - 10;
	let arrowOffset = null;
	if (tooltipElement && direction === "right") {
		const tooltipRect = tooltipElement.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const minTop = 0;
		const maxTop = viewportHeight - tooltipRect.height;
		const originalTop = top;
		if (top > maxTop) top = maxTop;
		if (top < minTop) top = minTop;
		if (top !== originalTop) arrowOffset = 16 - (top - originalTop);
	}
	return {
		tooltipPosition: {
			right,
			top
		},
		arrowOffset
	};
}
function useDescriptionContext(id, element) {
	const { getDescriptionForId } = x$1(DescriptionContext);
	return getDescriptionForId(id, element);
}
function useDebounce(callback, debounceFn) {
	const debouncedCallback = q$1(debounceFn(callback), [callback, debounceFn]);
	h(() => {
		return () => {
			debouncedCallback.flush?.();
		};
	}, [debouncedCallback]);
	return debouncedCallback;
}
var SEVERITIES = [
	"info",
	"warning",
	"error"
];
var ENTRY_SEVERITY_CLASS = {
	error: "has-error",
	warning: "has-warning"
};
var DEFAULT_SEVERITY = "error";
function getDiagnosticClass(diagnostic) {
	return ENTRY_SEVERITY_CLASS[diagnostic?.severity];
}
function toDiagnostic(value, severity = DEFAULT_SEVERITY) {
	if (!value) return null;
	if (isString(value)) return {
		severity,
		message: value
	};
	return {
		...value,
		message: value.message || "",
		severity: SEVERITIES.includes(value.severity) ? value.severity : severity
	};
}
var MAX_RANK = SEVERITIES.length - 1;
function getMostSevere(diagnostics) {
	let mostSevere = null;
	for (const value of diagnostics || []) {
		const diagnostic = toDiagnostic(value);
		if (!diagnostic) continue;
		if (!mostSevere || getRank(diagnostic) > getRank(mostSevere)) {
			mostSevere = diagnostic;
			if (getRank(mostSevere) === MAX_RANK) break;
		}
	}
	return mostSevere;
}
function toErrorDiagnostic(error) {
	if (!error) return null;
	const message = isString(error) ? error : error.message;
	return message ? {
		severity: DEFAULT_SEVERITY,
		message
	} : null;
}
function getMostSevereForIds(diagnostics, ids) {
	return getMostSevere(ids.flatMap((id) => diagnostics[id] || []));
}
function getGroupDiagnostic(diagnostics, entries) {
	return getMostSevereForIds(diagnostics, entries.map((entry) => entry.id));
}
function getListDiagnostic(diagnostics, items) {
	return getMostSevereForIds(diagnostics, items.flatMap((item) => [item.id, ...(item.entries || []).map((entry) => entry.id)]));
}
function getRank(diagnostic) {
	return SEVERITIES.indexOf(diagnostic.severity);
}
var NO_DIAGNOSTICS = [];
function useDiagnostics(id) {
	const { diagnostics } = x$1(DiagnosticsContext);
	const { errors } = x$1(ErrorsContext);
	const entryDiagnostics = diagnostics[id];
	if (entryDiagnostics && entryDiagnostics.length) return entryDiagnostics;
	const error = toErrorDiagnostic(errors[id]);
	return error ? [error] : NO_DIAGNOSTICS;
}
function useDisplayedDiagnostic(id) {
	return getMostSevere(useDiagnostics(id));
}
function useAllDiagnostics() {
	const { diagnostics } = x$1(DiagnosticsContext);
	const { errors } = x$1(ErrorsContext);
	return T$1(() => {
		const allDiagnostics = { ...diagnostics };
		for (const id in errors) {
			if (allDiagnostics[id] && allDiagnostics[id].length) continue;
			const error = toErrorDiagnostic(errors[id]);
			if (error) allDiagnostics[id] = [error];
		}
		return allDiagnostics;
	}, [diagnostics, errors]);
}
function useGroupDiagnostic(entries) {
	return getGroupDiagnostic(useAllDiagnostics(), entries);
}
function useListDiagnostic(items) {
	return getListDiagnostic(useAllDiagnostics(), items);
}
function useError(id) {
	const { errors } = x$1(ErrorsContext);
	return errors[id];
}
function useEvent(event, callback, eventBus) {
	const eventContext = x$1(EventContext);
	if (!eventBus) ({eventBus} = eventContext);
	const didMount = A$1(false);
	if (eventBus && !didMount.current) eventBus.on(event, callback);
	h(() => {
		if (eventBus && didMount.current) eventBus.on(event, callback);
		didMount.current = true;
		return () => {
			if (eventBus) eventBus.off(event, callback);
		};
	}, [
		callback,
		event,
		eventBus
	]);
}
function useKeyFactory(dependencies = []) {
	const map = T$1(() => new Map(), dependencies);
	const getKey = (el) => {
		let key = map.get(el);
		if (!key) {
			key = Math.random().toString().slice(-6);
			map.set(el, key);
		}
		return key;
	};
	return getKey;
}
function useLayoutState(path, defaultValue) {
	const { getLayoutForKey, setLayoutForKey } = x$1(LayoutContext);
	return [getLayoutForKey(path, defaultValue), q$1((newValue) => {
		setLayoutForKey(path, newValue);
	}, [setLayoutForKey])];
}
function usePrevious(value) {
	const ref = A$1();
	h(() => {
		ref.current = value;
	});
	return ref.current;
}
function useShowEntryEvent(id) {
	const { onShow } = x$1(LayoutContext);
	const ref = A$1();
	const focus = A$1(false);
	const onShowEntry = q$1((event) => {
		if (event.id === id) {
			onShow();
			if (!focus.current) focus.current = true;
		}
	}, [id]);
	h(() => {
		if (focus.current && ref.current) {
			if (isFunction(ref.current.focus)) ref.current.focus();
			if (isFunction(ref.current.select)) ref.current.select();
			focus.current = false;
		}
	});
	useEvent("propertiesPanel.showEntry", onShowEntry);
	return ref;
}
function getScrollContainer(ref, scrollContainerSelector) {
	return ref.current ? closest(ref.current, scrollContainerSelector, true) : null;
}
function useStickyIntersectionObserver(ref, scrollContainerSelector, setSticky) {
	const [scrollContainer, setScrollContainer] = d(null);
	const updateScrollContainer = q$1(() => {
		const newScrollContainer = getScrollContainer(ref, scrollContainerSelector);
		if (newScrollContainer !== scrollContainer) setScrollContainer(newScrollContainer);
	}, [
		ref,
		scrollContainerSelector,
		scrollContainer
	]);
	h(() => {
		updateScrollContainer();
	}, [updateScrollContainer]);
	useEvent("propertiesPanel.attach", updateScrollContainer);
	useEvent("propertiesPanel.detach", updateScrollContainer);
	h(() => {
		const Observer = IntersectionObserver;
		if (!Observer) return;
		const element = ref.current;
		if (!element || !scrollContainer) return;
		const observer = new Observer((entries) => {
			if (scrollContainer.scrollHeight === 0) return;
			entries.forEach((entry) => {
				if (entry.intersectionRatio < 1) setSticky(true);
				else if (entry.intersectionRatio === 1) setSticky(false);
			});
		}, {
			root: scrollContainer,
			rootMargin: "0px 0px 999999% 0px",
			threshold: [1]
		});
		observer.observe(element);
		return () => {
			observer.unobserve(element);
		};
	}, [
		ref,
		scrollContainer,
		setSticky
	]);
}
function useStaticCallback(callback) {
	const callbackRef = A$1(callback);
	_(() => {
		callbackRef.current = callback;
	});
	return q$1((...args) => callbackRef.current(...args), []);
}
function Group(props) {
	const { element, entries = [], id, label, shouldOpen = false, translate = translateFallback } = props;
	const groupRef = A$1(null);
	const [open, setOpen] = useLayoutState([
		"groups",
		id,
		"open"
	], shouldOpen);
	const onShow = q$1(() => setOpen(true), [setOpen]);
	const toggleOpen = () => setOpen(!open);
	const [edited, setEdited] = d(false);
	const [sticky, setSticky] = d(false);
	h(() => {
		const scheduled = requestAnimationFrame(() => {
			const hasOneEditedEntry = entries.find((entry) => {
				const { id, isEdited } = entry;
				const entryNode = query(`[data-entry-id="${id}"]`);
				if (!isFunction(isEdited) || !entryNode) return false;
				return isEdited(query(".bio-properties-panel-input", entryNode));
			});
			setEdited(hasOneEditedEntry);
		});
		return () => cancelAnimationFrame(scheduled);
	}, [entries, setEdited]);
	const diagnostic = useGroupDiagnostic(entries);
	useStickyIntersectionObserver(groupRef, "div.bio-properties-panel-scroll-container", setSticky);
	const propertiesPanelContext = {
		...x$1(LayoutContext),
		onShow
	};
	return u("div", {
		class: "bio-properties-panel-group",
		"data-group-id": "group-" + id,
		ref: groupRef,
		children: [u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-group-header", edited ? "" : "empty", open ? "open" : "", sticky && open ? "sticky" : ""),
			onClick: toggleOpen,
			children: [u("div", {
				class: "bio-properties-panel-group-header-title",
				children: u(TooltipWrapper, {
					value: props.tooltip,
					forId: "group-" + id,
					element,
					children: label
				})
			}), u("div", {
				class: "bio-properties-panel-group-header-buttons",
				children: [u(DataMarker, {
					edited,
					severity: diagnostic?.severity,
					translate
				}), u("button", {
					type: "button",
					title: translate("Toggle section"),
					class: "bio-properties-panel-group-header-button bio-properties-panel-arrow",
					children: u(Arrow, { class: open ? "bio-properties-panel-arrow-down" : "bio-properties-panel-arrow-right" })
				})]
			})]
		}), u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-group-entries", open ? "open" : ""),
			children: u(LayoutContext.Provider, {
				value: propertiesPanelContext,
				children: entries.map((entry) => {
					const { component: Component, id } = entry;
					return k$1(Component, {
						...entry,
						element,
						key: id
					});
				})
			})
		})]
	});
}
function DataMarker(props) {
	const { edited, severity, translate = translateFallback } = props;
	if (severity === "error") return u("div", {
		title: translate("Section contains an error"),
		class: "bio-properties-panel-dot bio-properties-panel-dot--error"
	});
	if (severity === "warning") return u("div", {
		title: translate("Section contains a warning"),
		class: "bio-properties-panel-dot bio-properties-panel-dot--warning"
	});
	if (edited) return u("div", {
		title: translate("Section contains edits"),
		class: "bio-properties-panel-dot"
	});
	return null;
}
function Placeholder(props) {
	const { text, icon: Icon } = props;
	return u("div", {
		class: "bio-properties-panel open",
		children: u("section", {
			class: "bio-properties-panel-placeholder",
			children: [Icon && u(Icon, { class: "bio-properties-panel-placeholder-icon" }), u("p", {
				class: "bio-properties-panel-placeholder-text",
				children: text
			})]
		})
	});
}
var DEFAULT_LAYOUT = {};
var DEFAULT_DESCRIPTION = {};
var DEFAULT_TOOLTIP = {};
function PropertiesPanel(props) {
	const { element, headerProvider, placeholderProvider, groups, layoutConfig, layoutChanged, descriptionConfig, descriptionLoaded, tooltipConfig, tooltipLoaded, eventBus } = props;
	const [layout, setLayout] = d(createLayout(layoutConfig));
	useUpdateLayoutEffect(() => {
		const newLayout = createLayout(layoutConfig);
		setLayout(newLayout);
	}, [layoutConfig]);
	h(() => {
		if (typeof layoutChanged === "function") layoutChanged(layout);
	}, [layout, layoutChanged]);
	const getLayoutForKey = (key, defaultValue) => {
		return get$1(layout, key, defaultValue);
	};
	const setLayoutForKey = (key, config) => {
		setLayout((prevLayout) => {
			const newLayout = assign({}, prevLayout);
			set(newLayout, key, config);
			return newLayout;
		});
	};
	const layoutContext = {
		layout,
		setLayout,
		getLayoutForKey,
		setLayoutForKey
	};
	const description = T$1(() => createDescriptionContext(descriptionConfig), [descriptionConfig]);
	h(() => {
		if (typeof descriptionLoaded === "function") descriptionLoaded(description);
	}, [description, descriptionLoaded]);
	const getDescriptionForId = (id, element) => {
		return description[id] && description[id](element);
	};
	const descriptionContext = {
		description,
		getDescriptionForId
	};
	const tooltip = T$1(() => createTooltipContext(tooltipConfig), [tooltipConfig]);
	h(() => {
		if (typeof tooltipLoaded === "function") tooltipLoaded(tooltip);
	}, [tooltip, tooltipLoaded]);
	const getTooltipForId = (id, element) => {
		return tooltip[id] && tooltip[id](element);
	};
	const tooltipContext = {
		tooltip,
		getTooltipForId
	};
	const [diagnostics, setDiagnostics] = d({});
	const onSetDiagnostics = ({ diagnostics }) => setDiagnostics(normalizeDiagnostics(diagnostics));
	useEvent("propertiesPanel.setDiagnostics", onSetDiagnostics, eventBus);
	const onSetErrors = ({ errors }) => setDiagnostics(toDiagnosticsMap(errors));
	useEvent("propertiesPanel.setErrors", onSetErrors, eventBus);
	const diagnosticsContext = T$1(() => ({ diagnostics }), [diagnostics]);
	const errorsContext = T$1(() => ({ errors: createErrors(diagnostics) }), [diagnostics]);
	const eventContext = { eventBus };
	const propertiesPanelContext = { element };
	if (placeholderProvider && !element) return u(Placeholder, { ...placeholderProvider.getEmpty() });
	if (placeholderProvider && isArray(element)) return u(Placeholder, { ...placeholderProvider.getMultiple() });
	return u(LayoutContext.Provider, {
		value: propertiesPanelContext,
		children: u(DiagnosticsContext.Provider, {
			value: diagnosticsContext,
			children: u(ErrorsContext.Provider, {
				value: errorsContext,
				children: u(DescriptionContext.Provider, {
					value: descriptionContext,
					children: u(TooltipContext.Provider, {
						value: tooltipContext,
						children: u(LayoutContext.Provider, {
							value: layoutContext,
							children: u(EventContext.Provider, {
								value: eventContext,
								children: u("div", {
									class: "bio-properties-panel bio-theme-parent",
									children: [headerProvider ? u(Header, {
										element,
										headerProvider
									}) : null, u("div", {
										class: "bio-properties-panel-scroll-container",
										children: groups.map((group) => {
											const { component: Component = Group, id } = group;
											return k$1(Component, {
												...group,
												key: id,
												element
											});
										})
									})]
								})
							})
						})
					})
				})
			})
		})
	});
}
function normalizeDiagnostics(diagnostics) {
	const normalized = {};
	for (const id in diagnostics) normalized[id] = asArray(diagnostics[id]).map((diagnostic) => toDiagnostic(diagnostic)).filter(Boolean);
	return normalized;
}
function toDiagnosticsMap(errors) {
	const diagnostics = {};
	for (const id in errors) {
		const error = toErrorDiagnostic(errors[id]);
		if (error) diagnostics[id] = [error];
	}
	return diagnostics;
}
function createErrors(diagnostics) {
	const errors = {};
	for (const id in diagnostics) {
		const error = diagnostics[id].find(({ severity }) => severity === "error");
		if (error) errors[id] = error.message;
	}
	return errors;
}
function asArray(value) {
	return isArray(value) ? value : [value];
}
function createLayout(overrides = {}, defaults = DEFAULT_LAYOUT) {
	return {
		...defaults,
		...overrides
	};
}
function createDescriptionContext(overrides = {}) {
	return {
		...DEFAULT_DESCRIPTION,
		...overrides
	};
}
function createTooltipContext(overrides = {}) {
	return {
		...DEFAULT_TOOLTIP,
		...overrides
	};
}
function useUpdateLayoutEffect(effect, deps) {
	const isMounted = A$1(false);
	_(() => {
		if (isMounted.current) return effect();
		else isMounted.current = true;
	}, deps);
}
function DropdownButton(props) {
	const { class: className, children, menuItems = [] } = props;
	const dropdownRef = A$1(null);
	const menuRef = A$1(null);
	const [open, setOpen] = d(false);
	const close = () => setOpen(false);
	function onDropdownToggle(event) {
		if (menuRef.current && menuRef.current.contains(event.target)) return;
		event.stopPropagation();
		setOpen((open) => !open);
	}
	function onActionClick(event, action) {
		event.stopPropagation();
		close();
		action();
	}
	useGlobalClick([dropdownRef.current], () => close());
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-dropdown-button", { open }, className),
		onClick: onDropdownToggle,
		ref: dropdownRef,
		children: [children, u("div", {
			class: "bio-properties-panel-dropdown-button__menu",
			ref: menuRef,
			children: menuItems.map((item, index) => u(MenuItem, {
				onClick: onActionClick,
				item
			}, index))
		})]
	});
}
function MenuItem({ item, onClick }) {
	if (item.separator) return u("div", { class: "bio-properties-panel-dropdown-button__menu-item bio-properties-panel-dropdown-button__menu-item--separator" });
	if (item.action) return u("button", {
		type: "button",
		class: "bio-properties-panel-dropdown-button__menu-item bio-properties-panel-dropdown-button__menu-item--actionable",
		onClick: (event) => onClick(event, item.action),
		children: item.entry
	});
	return u("div", {
		class: "bio-properties-panel-dropdown-button__menu-item",
		children: item.entry
	});
}
function useGlobalClick(ignoredElements, callback) {
	h(() => {
		function listener(event) {
			if (ignoredElements.some((element) => element && element.contains(event.target))) return;
			callback();
		}
		document.addEventListener("click", listener, { capture: true });
		return () => document.removeEventListener("click", listener, { capture: true });
	}, [...ignoredElements, callback]);
}
function HeaderButton(props) {
	const { children = null, class: classname, onClick = () => {}, ...otherProps } = props;
	return u("button", {
		type: "button",
		...otherProps,
		onClick,
		class: (0, import_classnames.default)("bio-properties-panel-group-header-button", classname),
		children
	});
}
function CollapsibleEntry(props) {
	const { element, entries = [], id, label, open: shouldOpen, remove, translate = translateFallback } = props;
	const [open, setOpen] = d(shouldOpen);
	const toggleOpen = () => setOpen(!open);
	const { onShow } = x$1(LayoutContext);
	const propertiesPanelContext = {
		...x$1(LayoutContext),
		onShow: q$1(() => {
			setOpen(true);
			if (isFunction(onShow)) onShow();
		}, [onShow, setOpen])
	};
	const placeholderLabel = translate("<empty>");
	const hasEntries = entries.length > 0;
	return u("div", {
		"data-entry-id": id,
		class: (0, import_classnames.default)("bio-properties-panel-collapsible-entry", open ? "open" : ""),
		children: [u("div", {
			class: "bio-properties-panel-collapsible-entry-header",
			onClick: hasEntries ? toggleOpen : null,
			children: [
				u("div", {
					class: (0, import_classnames.default)("bio-properties-panel-collapsible-entry-header-title", !label && "empty"),
					children: label || placeholderLabel
				}),
				hasEntries && u("button", {
					type: "button",
					title: translate("Toggle list item"),
					class: "bio-properties-panel-arrow  bio-properties-panel-collapsible-entry-arrow",
					children: u(Arrow, { class: open ? "bio-properties-panel-arrow-down" : "bio-properties-panel-arrow-right" })
				}),
				remove ? u("button", {
					type: "button",
					title: translate("Delete item"),
					class: "bio-properties-panel-remove-entry",
					onClick: remove,
					children: u(Delete, {})
				}) : null
			]
		}), u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-collapsible-entry-entries", open ? "open" : ""),
			children: u(LayoutContext.Provider, {
				value: propertiesPanelContext,
				children: entries.map((entry) => {
					const { component: Component, id } = entry;
					return k$1(Component, {
						...entry,
						element,
						key: id
					});
				})
			})
		})]
	});
}
function ListItem(props) {
	const { autoFocusEntry, autoOpen, translate = translateFallback } = props;
	h(() => {
		if (autoOpen && autoFocusEntry) {
			const entry = query(`[data-entry-id="${autoFocusEntry}"]`);
			const focusableInput = query(".bio-properties-panel-input", entry);
			if (focusableInput) {
				if (isFunction(focusableInput.select)) focusableInput.select();
				else if (isFunction(focusableInput.focus)) focusableInput.focus();
				focusableInput.scrollIntoView();
			}
		}
	}, [autoOpen, autoFocusEntry]);
	return u("div", {
		class: "bio-properties-panel-list-item",
		children: u(CollapsibleEntry, {
			...props,
			open: autoOpen,
			translate
		})
	});
}
var noop$6 = () => {};
var LIST_BADGE_SEVERITY_CLASS = {
	error: "bio-properties-panel-list-badge--error",
	warning: "bio-properties-panel-list-badge--warning"
};
function ListGroup(props) {
	const { add, element, id, items, label, shouldOpen = false, translate = translateFallback } = props;
	h(() => {
		if (props.shouldSort != void 0) console.warn("the property 'shouldSort' is no longer supported");
	}, [props.shouldSort]);
	const groupRef = A$1(null);
	const [open, setOpen] = useLayoutState([
		"groups",
		id,
		"open"
	], shouldOpen);
	const [sticky, setSticky] = d(false);
	const onShow = q$1(() => setOpen(true), [setOpen]);
	const [localItems, setLocalItems] = d([]);
	const [addTriggered, setAddTriggered] = d(false);
	const prevElement = usePrevious(element);
	const toggleOpen = q$1(() => setOpen(!open), [open]);
	const openItemIds = element === prevElement && open && addTriggered ? getNewItemIds(items, localItems) : [];
	h(() => {
		setLocalItems(items);
		setAddTriggered(false);
	}, [items]);
	useStickyIntersectionObserver(groupRef, "div.bio-properties-panel-scroll-container", setSticky);
	const hasItems = !!items.length;
	const propertiesPanelContext = {
		...x$1(LayoutContext),
		onShow
	};
	const handleAddClick = (e) => {
		setAddTriggered(true);
		setOpen(true);
		add(e);
	};
	const diagnostic = useListDiagnostic(items);
	return u("div", {
		class: "bio-properties-panel-group",
		"data-group-id": "group-" + id,
		ref: groupRef,
		children: [u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-group-header", hasItems ? "" : "empty", hasItems && open ? "open" : "", sticky && open ? "sticky" : ""),
			onClick: hasItems ? toggleOpen : noop$6,
			children: [u("div", {
				class: "bio-properties-panel-group-header-title",
				children: u(TooltipWrapper, {
					value: props.tooltip,
					forId: "group-" + id,
					element,
					children: label
				})
			}), u("div", {
				class: "bio-properties-panel-group-header-buttons",
				children: [
					add ? u("button", {
						type: "button",
						title: translate("Create new list item"),
						class: "bio-properties-panel-group-header-button bio-properties-panel-add-entry",
						onClick: handleAddClick,
						children: [u(Create, {}), !hasItems ? u("span", {
							class: "bio-properties-panel-add-entry-label",
							children: translate("Create")
						}) : null]
					}) : null,
					hasItems ? u("div", {
						title: translate(`List contains {numOfItems} item${items.length != 1 ? "s" : ""}`, { numOfItems: items.length }),
						class: (0, import_classnames.default)("bio-properties-panel-list-badge", LIST_BADGE_SEVERITY_CLASS[diagnostic?.severity]),
						children: items.length
					}) : null,
					hasItems ? u("button", {
						type: "button",
						title: translate("Toggle section"),
						class: "bio-properties-panel-group-header-button bio-properties-panel-arrow",
						children: u(Arrow, { class: open ? "bio-properties-panel-arrow-down" : "bio-properties-panel-arrow-right" })
					}) : null
				]
			})]
		}), u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-list", open && hasItems ? "open" : ""),
			children: u(LayoutContext.Provider, {
				value: propertiesPanelContext,
				children: items.map((item, index) => {
					if (!item) return;
					const { id } = item;
					const autoOpen = openItemIds.includes(item.id);
					return k$1(ListItem, {
						...item,
						autoOpen,
						element,
						index,
						key: id,
						translate
					});
				})
			})
		})]
	});
}
function getNewItemIds(newItems, oldItems) {
	const newIds = newItems.map((item) => item.id);
	const oldIds = oldItems.map((item) => item.id);
	return newIds.filter((itemId) => !oldIds.includes(itemId));
}
function Description(props) {
	const { element, forId, value } = props;
	const contextDescription = useDescriptionContext(forId, element);
	const description = value || contextDescription;
	if (description) return u("div", {
		class: "bio-properties-panel-description",
		children: description
	});
}
var SEVERITY_CLASS = {
	error: "bio-properties-panel-error",
	warning: "bio-properties-panel-warning",
	info: "bio-properties-panel-info"
};
function DiagnosticMessage(props) {
	const { diagnostic, forId, element } = props;
	if (!diagnostic) return null;
	const { action, message, severity } = diagnostic;
	return u("div", {
		class: SEVERITY_CLASS[severity],
		children: [u("span", {
			class: (0, import_classnames.default)("bio-properties-panel-error-message", "bio-properties-panel-diagnostic-message"),
			children: [severity === "info" && u(Info, {
				class: "bio-properties-panel-diagnostic-icon",
				"aria-hidden": "true"
			}), message]
		}), action && u(DiagnosticAction, {
			action,
			forId,
			element
		})]
	});
}
function DiagnosticAction(props) {
	const { action, forId, element } = props;
	const buttonRef = A$1();
	h(() => {
		return () => {
			const button = buttonRef.current;
			if (button && button === document.activeElement) {
				const field = document.getElementById(prefixId$a(forId));
				field && field.focus();
			}
		};
	}, [forId]);
	return u(TooltipWrapper, {
		value: action.tooltip,
		forId: `${forId}-diagnostic-action`,
		element,
		focusable: false,
		children: u("button", {
			type: "button",
			ref: buttonRef,
			id: prefixId$a(`${forId}-diagnostic-action`),
			class: (0, import_classnames.default)("bio-properties-panel-error-action", "bio-properties-panel-diagnostic-action"),
			onClick: action.onClick,
			"aria-label": action.ariaLabel,
			"aria-describedby": action.tooltip ? TOOLTIP_ID : void 0,
			children: action.label
		})
	});
}
function prefixId$a(id) {
	return `bio-properties-panel-${id}`;
}
function Checkbox(props) {
	const { id, label, onChange, disabled, value = false, onFocus, onBlur, tooltip } = props;
	const [localValue, setLocalValue] = d(value);
	const handleChangeCallback = ({ target }) => {
		onChange(target.checked);
	};
	const handleChange = (e) => {
		handleChangeCallback(e);
		setLocalValue(e.target.value);
	};
	h(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	const ref = useShowEntryEvent(id);
	return u("div", {
		class: "bio-properties-panel-checkbox",
		children: [u("input", {
			ref,
			id: prefixId$9(id),
			name: id,
			onFocus,
			onBlur,
			type: "checkbox",
			class: "bio-properties-panel-input",
			onChange: handleChange,
			checked: localValue,
			disabled
		}), u("label", {
			for: prefixId$9(id),
			class: "bio-properties-panel-label",
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			})
		})]
	});
}
function CheckboxEntry(props) {
	const { element, id, description, label, getValue, setValue, disabled, onFocus, onBlur, tooltip } = props;
	const value = getValue(element);
	const diagnostic = useDisplayedDiagnostic(id);
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-entry", "bio-properties-panel-checkbox-entry", getDiagnosticClass(diagnostic)),
		"data-entry-id": id,
		children: [
			u(Checkbox, {
				disabled,
				id,
				label,
				onChange: setValue,
				onFocus,
				onBlur,
				value,
				tooltip,
				element
			}, element),
			u(DiagnosticMessage, {
				diagnostic,
				forId: id,
				element
			}),
			u(Description, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
function isEdited$9(node) {
	return node && !!node.checked;
}
function prefixId$9(id) {
	return `bio-properties-panel-${id}`;
}
function CheckboxGroup(props) {
	const { element, id, label, description, tooltip, options = [], getValue, setValue, disabled, onFocus, onBlur } = props;
	const value = getValue(element) || [];
	const handleOptionChange = (optionValue, checked) => {
		const newValue = checked ? [...value, optionValue] : value.filter((v) => v !== optionValue);
		setValue(newValue);
	};
	return u("div", {
		class: "bio-properties-panel-entry bio-properties-panel-checkbox-group",
		"data-entry-id": id,
		children: [
			u("div", {
				class: "bio-properties-panel-group-header",
				children: u("p", {
					class: "bio-properties-panel-label",
					children: u(TooltipWrapper, {
						value: tooltip,
						forId: id,
						element,
						children: label
					})
				})
			}),
			u("div", {
				class: "bio-properties-panel-checkbox-group-entries",
				children: options.map((option) => u(CheckboxEntry, {
					id: `${id}-${option.value}`,
					label: option.label,
					setValue: (checked) => handleOptionChange(option.value, checked),
					getValue: () => value.includes(option.value),
					disabled,
					onFocus,
					onBlur,
					element
				}, option.value))
			}),
			u(Description, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
var ExternalChange = Annotation.define();
var parseJsonLinter = jsonParseLinter();
function JsonEditor(props) {
	const { id, label, debounce, value = "", onInput: commitValue, disabled, placeholder: placeholder$1, tooltip, element } = props;
	const containerRef = A$1(null);
	const viewRef = A$1(null);
	const editorRef = useShowEntryEvent(id);
	const handleChange = useDebounce(useStaticCallback((newValue) => {
		commitValue(newValue === "" ? void 0 : newValue);
	}), debounce);
	h(() => {
		const view = new EditorView({
			state: EditorState.create({
				doc: value,
				extensions: [
					highlightSpecialChars(),
					history(),
					drawSelection(),
					syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
					foldGutter(),
					bracketMatching(),
					closeBrackets(),
					keymap.of([
						...defaultKeymap,
						...historyKeymap,
						...closeBracketsKeymap,
						...foldKeymap
					]),
					EditorState.tabSize.of(2),
					EditorView.lineWrapping,
					EditorState.readOnly.of(!!disabled),
					...placeholder$1 ? [placeholder(placeholder$1)] : [],
					EditorView.updateListener.of((update) => {
						const isExternal = update.transactions.some((tr) => tr.annotation(ExternalChange));
						if (update.docChanged && !isExternal) handleChange(update.state.doc.toString());
					}),
					json(),
					linter((view) => {
						if (!view.state.doc.toString().trim()) return [];
						return parseJsonLinter(view);
					}, { delay: 300 })
				]
			}),
			parent: containerRef.current
		});
		viewRef.current = view;
		editorRef.current = view.contentDOM;
		const prefixedId = `bio-properties-panel-${id}`;
		view.contentDOM.setAttribute("id", prefixedId);
		view.contentDOM.setAttribute("aria-label", label);
		return () => {
			view.destroy();
		};
	}, []);
	h(() => {
		const view = viewRef.current;
		if (!view) return;
		const currentValue = view.state.doc.toString();
		if (value === currentValue) return;
		view.dispatch({
			changes: {
				from: 0,
				to: currentValue.length,
				insert: value || ""
			},
			annotations: ExternalChange.of(true)
		});
	}, [value]);
	const focusEditor = () => {
		viewRef.current && viewRef.current.focus();
	};
	return u("div", {
		class: "bio-properties-panel-json-editor",
		children: [u("label", {
			class: "bio-properties-panel-label",
			onClick: focusEditor,
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element,
				children: label
			})
		}), u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-input", value && "edited"),
			ref: containerRef
		})]
	});
}
function JsonEditorEntry(props) {
	const { element, id, description, debounce, label, getValue, setValue, disabled, placeholder, tooltip, validate, translate = translateFallback } = props;
	const diagnostics = useDiagnostics(id);
	let value = getValue(element);
	const [localDiagnostic, setLocalDiagnostic] = d(() => computeDiagnostic(isFunction(validate) ? validate(value) : null, value, translate));
	const [editorValue, setEditorValue] = d(value);
	h(() => {
		if (value === editorValue) return;
		setEditorValue(value);
		setLocalDiagnostic(computeDiagnostic(isFunction(validate) ? validate(value) : null, value, translate));
	}, [value, validate]);
	const onInput = useStaticCallback((newValue) => {
		setEditorValue(newValue);
		if (newValue !== getValue(element)) {
			const newValidationError = isFunction(validate) ? validate(newValue) : null;
			setValue(newValue, newValidationError);
			setLocalDiagnostic(computeDiagnostic(newValidationError, newValue, translate));
		}
	});
	const diagnostic = getMostSevere([...diagnostics, localDiagnostic]);
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-entry", getDiagnosticClass(diagnostic)),
		"data-entry-id": id,
		children: [
			u(JsonEditor, {
				id,
				label,
				debounce,
				value,
				onInput,
				disabled,
				placeholder,
				tooltip,
				element
			}, element),
			u(DiagnosticMessage, {
				diagnostic,
				forId: id,
				element
			}),
			u(Description, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
function isEdited$8(node) {
	return node && node.classList.contains("edited");
}
function computeDiagnostic(custom, value, translate) {
	return getMostSevere([custom, validateJson(value, translate)]);
}
function validateJson(value, translate = translateFallback) {
	if (!value || !value.trim()) return null;
	try {
		return isObject(JSON.parse(value)) ? null : translate("JSON contains errors");
	} catch (e) {
		return translate("JSON contains errors");
	}
}
function OpenPopupButton({ onClick, title, translate = translateFallback }) {
	title = title ?? translate("Open pop-up editor");
	return u("button", {
		type: "button",
		title,
		class: "bio-properties-panel-open-feel-popup",
		onClick,
		children: u(OpenPopup, {})
	});
}
var noop$5 = () => {};
var useBufferedFocus$1 = function(editor, ref) {
	const [buffer, setBuffer] = d(void 0);
	ref.current = T$1(() => ({ focus: (offset) => {
		if (editor) editor.focus(offset);
		else {
			if (typeof offset === "undefined") offset = Infinity;
			setBuffer(offset);
		}
	} }), [editor]);
	h(() => {
		if (typeof buffer !== "undefined" && editor) {
			editor.focus(buffer);
			setBuffer(false);
		}
	}, [editor, buffer]);
};
var TemplatingEditor = D((props, ref) => {
	const { onInput, disabled, tooltipContainer, enableGutters, value, onLint = noop$5, onOpenPopup = noop$5, popupOpen, contentAttributes = {}, hostLanguage = null, singleLine = false } = props;
	const inputRef = A$1();
	const [editor, setEditor] = d();
	const [localValue, setLocalValue] = d(value || "");
	useBufferedFocus$1(editor, ref);
	const handleInput = useStaticCallback((newValue) => {
		onInput(newValue);
		setLocalValue(newValue);
	});
	h(() => {
		let editor;
		editor = new FeelersEditor({
			container: inputRef.current,
			onChange: handleInput,
			value: localValue,
			onLint,
			contentAttributes,
			tooltipContainer,
			enableGutters,
			hostLanguage,
			singleLine,
			lineWrap: true
		});
		setEditor(editor);
		return () => {
			onLint([]);
			inputRef.current.innerHTML = "";
			setEditor(null);
		};
	}, []);
	h(() => {
		if (!editor) return;
		if (value === localValue) return;
		editor.setValue(value);
		setLocalValue(value);
	}, [value]);
	const handleClick = () => {
		ref.current.focus();
	};
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-feelers-editor-container", popupOpen ? "popupOpen" : null),
		children: [
			popupOpen && u("div", {
				class: "bio-properties-panel-feelers-editor__popup-placeholder",
				children: "Opened in popup"
			}),
			u("div", {
				name: props.name,
				class: (0, import_classnames.default)("bio-properties-panel-feelers-editor bio-properties-panel-input", localValue ? "edited" : null, disabled ? "disabled" : null),
				ref: inputRef,
				onClick: handleClick
			}),
			!disabled && u(OpenPopupButton, { onClick: () => onOpenPopup("feelers") })
		]
	});
});
var noop$4 = () => {};
var useBufferedFocus = function(editor, ref) {
	const [buffer, setBuffer] = d(void 0);
	ref.current = T$1(() => ({ focus: (offset) => {
		if (editor) editor.focus(offset);
		else {
			if (typeof offset === "undefined") offset = Infinity;
			setBuffer(offset);
		}
	} }), [editor]);
	h(() => {
		if (typeof buffer !== "undefined" && editor) {
			editor.focus(buffer);
			setBuffer(false);
		}
	}, [editor, buffer]);
};
var FeelEditor = D((props, ref) => {
	const { contentAttributes, enableGutters, value, onInput, onKeyDown: onKeyDownProp = noop$4, onBlur = noop$4, onFeelToggle = noop$4, onLint = noop$4, onOpenPopup = noop$4, placeholder, popupOpen, disabled, tooltipContainer, variables, feelLanguageContext, translate = translateFallback } = props;
	const inputRef = A$1();
	const [editor, setEditor] = d();
	const [localValue, setLocalValue] = d(value || "");
	const { builtins, dialect, parserDialect, engines } = feelLanguageContext || {};
	useBufferedFocus(editor, ref);
	const handleInput = useStaticCallback((newValue) => {
		onInput(newValue);
		setLocalValue(newValue);
	});
	const handleBlur = useStaticCallback(() => {
		onBlur();
	});
	h(() => {
		let editor;
		const onKeyDown = (e) => {
			onKeyDownProp(e);
			if (e.key !== "Backspace" || !editor) return;
			const selection = editor.getSelection();
			const range = selection.ranges[selection.mainIndex];
			if (range.from === 0 && range.to === 0) onFeelToggle();
		};
		editor = new FeelEditor$1({
			container: inputRef.current,
			onChange: handleInput,
			onKeyDown,
			onLint,
			placeholder,
			readOnly: disabled,
			tooltipContainer,
			value: localValue,
			variables,
			builtins,
			dialect,
			parserDialect,
			engines,
			extensions: [
				...enableGutters ? [lineNumbers()] : [],
				EditorView.lineWrapping,
				EditorView.domEventHandlers({ blur: handleBlur })
			],
			contentAttributes
		});
		setEditor(editor);
		return () => {
			onLint([]);
			inputRef.current.innerHTML = "";
			setEditor(null);
		};
	}, []);
	h(() => {
		if (!editor) return;
		if (value === localValue) return;
		editor.setValue(value);
		setLocalValue(value);
	}, [value]);
	h(() => {
		if (!editor) return;
		editor.setVariables(variables);
	}, [variables]);
	h(() => {
		if (!editor) return;
		editor.setPlaceholder(placeholder);
	}, [placeholder]);
	h(() => {
		if (!editor) return;
		editor.setEngines(engines);
	}, [engines]);
	const handleClick = () => {
		ref.current.focus();
	};
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-feel-editor-container", disabled ? "disabled" : null, popupOpen ? "popupOpen" : null),
		children: [
			popupOpen && u("div", {
				class: "bio-properties-panel-feel-editor__open-popup-placeholder",
				children: translate("Opened in editor")
			}),
			u("div", {
				name: props.name,
				class: (0, import_classnames.default)("bio-properties-panel-input", localValue ? "edited" : null),
				ref: inputRef,
				onClick: handleClick
			}),
			!disabled && u(OpenPopupButton, {
				onClick: () => onOpenPopup("feel"),
				translate
			})
		]
	});
});
function FeelIndicator(props) {
	const { active } = props;
	if (!active) return null;
	return u("span", {
		class: "bio-properties-panel-feel-indicator",
		children: "="
	});
}
var noop$3 = () => {};
function FeelIcon(props) {
	const { feel = false, active, disabled = false, onClick = noop$3, translate = translateFallback } = props;
	const feelRequiredLabel = translate("FEEL expression is mandatory");
	const feelOptionalLabel = translate(`Click to ${active ? "remove" : "set a"} dynamic value with FEEL expression`);
	const handleClick = (e) => {
		onClick(e);
		if (!e.pointerType) e.stopPropagation();
	};
	return u("button", {
		type: "button",
		class: (0, import_classnames.default)("bio-properties-panel-feel-icon", active ? "active" : null, feel === "required" ? "required" : "optional"),
		onClick: handleClick,
		disabled: feel === "required" || disabled,
		title: feel === "required" ? feelRequiredLabel : feelOptionalLabel,
		children: u(Feel, {})
	});
}
function isCmd(event) {
	if (event.altKey) return false;
	return event.ctrlKey || event.metaKey;
}
function isCmdWithChar(event) {
	return isCmd(event) && event.key.length === 1 && /^[a-zA-Z]$/.test(event.key);
}
function ToggleSwitch(props) {
	const { id, label, onInput, value, switcherLabel, inline, onFocus, onBlur, inputRef, tooltip } = props;
	const [localValue, setLocalValue] = d(value);
	const handleInputCallback = async () => {
		onInput(!value);
	};
	const handleInput = (e) => {
		handleInputCallback();
		setLocalValue(e.target.value);
	};
	h(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-toggle-switch", { inline }),
		children: [u("label", {
			class: "bio-properties-panel-label",
			for: prefixId$8(id),
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			})
		}), u("div", {
			class: "bio-properties-panel-field-wrapper",
			children: [u("label", {
				class: "bio-properties-panel-toggle-switch__switcher",
				children: [u("input", {
					ref: inputRef,
					id: prefixId$8(id),
					class: "bio-properties-panel-input",
					type: "checkbox",
					onFocus,
					onBlur,
					name: id,
					onInput: handleInput,
					checked: !!localValue
				}), u("span", { class: "bio-properties-panel-toggle-switch__slider" })]
			}), switcherLabel && u("p", {
				class: "bio-properties-panel-toggle-switch__label",
				children: switcherLabel
			})]
		})]
	});
}
function ToggleSwitchEntry(props) {
	const { element, id, description, label, switcherLabel, inline, getValue, setValue, onFocus, onBlur, tooltip } = props;
	const value = getValue(element);
	return u("div", {
		class: "bio-properties-panel-entry bio-properties-panel-toggle-switch-entry",
		"data-entry-id": id,
		children: [u(ToggleSwitch, {
			id,
			label,
			value,
			onInput: setValue,
			onFocus,
			onBlur,
			switcherLabel,
			inline,
			tooltip,
			element
		}, element), u(Description, {
			forId: id,
			element,
			value: description
		})]
	});
}
function isEdited$7(node) {
	return node && !!node.checked;
}
function prefixId$8(id) {
	return `bio-properties-panel-${id}`;
}
function NumberField(props) {
	const { debounce, disabled, displayLabel = true, id, inputRef, label, max, min, onInput, step, value = "", onFocus, onBlur, onKeyDown, tooltip } = props;
	const [localValue, setLocalValue] = d(value);
	const handleInputCallback = T$1(() => {
		return debounce((target) => {
			if (target.validity.valid) onInput(target.value ? parseFloat(target.value) : void 0);
		});
	}, [onInput, debounce]);
	const handleInput = (e) => {
		handleInputCallback(e.target);
		setLocalValue(e.target.value);
	};
	h(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	return u("div", {
		class: "bio-properties-panel-numberfield",
		children: [displayLabel && u("label", {
			for: prefixId$7(id),
			class: "bio-properties-panel-label",
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			})
		}), u("input", {
			id: prefixId$7(id),
			ref: inputRef,
			type: "number",
			name: id,
			spellCheck: "false",
			autoComplete: "off",
			disabled,
			class: "bio-properties-panel-input",
			max,
			min,
			onInput: handleInput,
			onFocus,
			onBlur,
			onKeyDown,
			step,
			value: localValue
		})]
	});
}
function NumberFieldEntry(props) {
	const { debounce, description, disabled, element, getValue, id, label, max, min, setValue, step, onFocus, onBlur, validate, tooltip } = props;
	const diagnostics = useDiagnostics(id);
	const [localDiagnostic, setLocalDiagnostic] = d(null);
	let value = getValue(element);
	h(() => {
		if (isFunction(validate)) {
			const newValidationError = validate(value) || null;
			setLocalDiagnostic(newValidationError);
		}
	}, [value, validate]);
	const onInput = (newValue) => {
		if (newValue !== value) {
			let newValidationError = null;
			if (isFunction(validate)) newValidationError = validate(newValue) || null;
			setValue(newValue, newValidationError);
			setLocalDiagnostic(newValidationError);
		}
	};
	const diagnostic = getMostSevere([...diagnostics, localDiagnostic]);
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-entry", getDiagnosticClass(diagnostic)),
		"data-entry-id": id,
		children: [
			u(NumberField, {
				debounce,
				disabled,
				id,
				label,
				onFocus,
				onBlur,
				onInput,
				max,
				min,
				step,
				value,
				tooltip
			}, element),
			u(DiagnosticMessage, {
				diagnostic,
				forId: id,
				element
			}),
			u(Description, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
function isEdited$6(node) {
	return node && !!node.value;
}
function prefixId$7(id) {
	return `bio-properties-panel-${id}`;
}
var noop$2 = () => {};
function FeelTextfield(props) {
	const { debounce, id, element, label, hostLanguage, onInput: commitValue, onBlur, onError, placeholder, feel, value = "", disabled = false, variables, singleLine, tooltipContainer, OptionalComponent = OptionalFeelInput, tooltip, translate } = props;
	const [localValue, setLocalValue] = d(getInitialFeelLocalValue(feel, value));
	const editorRef = useShowEntryEvent(id);
	const containerRef = A$1();
	const onInput = q$1((newValue) => {
		commitValue(newValue === "" || newValue === "=" ? void 0 : newValue);
	}, [commitValue]);
	const feelActive = isFeelActive(feel, localValue);
	const feelOnlyValue = getFeelValue(localValue);
	const feelLanguageContext = x$1(FeelLanguageContext);
	const [focus, _setFocus] = d(void 0);
	const { eventBus } = x$1(EventContext);
	const [isPopupOpen, setIsPopupOpen] = d(false);
	const setFocus = (offset = 0) => {
		const position = containerRef.current.contains(document.activeElement) ? document.activeElement.selectionStart : Infinity;
		_setFocus(position + offset);
	};
	const handleInput = useDebounce(onInput, debounce);
	const setAndCommitValue = (newValue) => {
		handleInput.cancel?.();
		setLocalValue(newValue);
		onInput(newValue);
	};
	const handleFeelToggle = useStaticCallback(() => {
		if (feel === "required") return;
		if (!feelActive) setAndCommitValue("=" + localValue);
		else setAndCommitValue(feelOnlyValue);
	});
	const handleInputChange = (newValue) => {
		if (feelActive) newValue = "=" + newValue;
		if (newValue === localValue) return;
		setLocalValue(newValue);
		handleInput(newValue);
		if (!feelActive && isString(newValue) && newValue.startsWith("=")) setFocus(-1);
	};
	const handleOptionalInputOnBlur = (e) => {
		if (e.target.type === "checkbox") setAndCommitValue(e.target.checked);
		else {
			const trimmedValue = e.target.value.trim();
			if (trimmedValue !== localValue) setAndCommitValue(trimmedValue);
			else handleInput.flush?.();
		}
		if (onBlur) onBlur(e);
	};
	const handleFeelEditorOnBlur = () => {
		handleInput.flush?.();
	};
	const handleOnKeyDown = (e) => {
		const isCommand = (e.ctrlKey || e.metaKey) && !e.getModifierState?.("AltGraph");
		if (e.key === "=" && !isCommand && !feelActive && isFeelOptional(feel) && !disabled && e.target.type === "number" && !e.target.value) {
			e.preventDefault();
			handleFeelToggle();
			_setFocus(Infinity);
			return;
		}
		if (isCmdWithChar(e)) handleInput.flush?.();
	};
	const handleLint = useStaticCallback((lint = []) => {
		if (lint.some((report) => report.type === "Syntax Error")) onError(translate("Unparsable FEEL expression."));
		else onError(void 0);
	});
	const handleOpenPopup = (type = "feel") => {
		const isOpen = eventBus.fire("propertiesPanel.openPopup", {
			element,
			entryId: id,
			hostLanguage,
			label,
			onInput: handleInputChange,
			singleLine,
			sourceElement: editorRef.current,
			tooltipContainer,
			type,
			value: feelOnlyValue,
			variables,
			feelLanguageContext
		});
		if (isOpen) eventBus.once("propertiesPanelPopup.close", () => {
			setIsPopupOpen(false);
		});
		setIsPopupOpen(isOpen === true);
	};
	h(() => {
		if (typeof focus !== "undefined") {
			editorRef.current.focus(focus);
			_setFocus(void 0);
		}
	}, [focus]);
	h(() => {
		if (value === localValue) return;
		if (!value) {
			setLocalValue(feelActive ? "=" : "");
			return;
		}
		setLocalValue(value);
	}, [value]);
	h(() => {
		return () => {
			eventBus.fire("propertiesPanel.closePopup");
		};
	}, []);
	h(() => {
		const copyHandler = (event) => {
			if (!feelActive) return;
			event.clipboardData.setData("application/FEEL", event.clipboardData.getData("text"));
		};
		const pasteHandler = (event) => {
			if (feelActive || isPopupOpen) return;
			if (event.clipboardData.getData("application/FEEL")) {
				setTimeout(() => {
					handleFeelToggle();
					setFocus();
				});
				return;
			}
			const target = event.target;
			if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) return;
			const isFieldEmpty = !target.value;
			const isAllSelected = target.selectionStart === 0 && target.selectionEnd === target.value.length;
			if (isFieldEmpty || isAllSelected) {
				const trimmedValue = event.clipboardData.getData("text").trim();
				setAndCommitValue(trimmedValue);
				if (!feelActive && isString(trimmedValue) && trimmedValue.startsWith("=")) setFocus(trimmedValue.length - 1);
				event.preventDefault();
			}
		};
		containerRef.current.addEventListener("copy", copyHandler);
		containerRef.current.addEventListener("cut", copyHandler);
		containerRef.current.addEventListener("paste", pasteHandler);
		return () => {
			containerRef.current.removeEventListener("copy", copyHandler);
			containerRef.current.removeEventListener("cut", copyHandler);
			containerRef.current.removeEventListener("paste", pasteHandler);
		};
	}, [
		containerRef,
		feelActive,
		handleFeelToggle,
		setFocus
	]);
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-feel-entry", { "feel-active": feelActive }),
		children: [u("label", {
			for: prefixId$6(id),
			class: "bio-properties-panel-label",
			onClick: () => setFocus(),
			children: [u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			}), u(FeelIcon, {
				label,
				feel,
				onClick: handleFeelToggle,
				active: feelActive,
				translate
			})]
		}), u("div", {
			class: "bio-properties-panel-feel-container",
			ref: containerRef,
			children: [u(FeelIndicator, {
				active: feelActive,
				disabled: !isFeelOptional(feel) || disabled,
				onClick: handleFeelToggle
			}), feelActive ? u(FeelEditor, {
				name: id,
				onInput: handleInputChange,
				onBlur: handleFeelEditorOnBlur,
				onKeyDown: handleOnKeyDown,
				contentAttributes: {
					"id": prefixId$6(id),
					"aria-label": label
				},
				disabled,
				popupOpen: isPopupOpen,
				onFeelToggle: () => {
					handleFeelToggle();
					setFocus(true);
				},
				onLint: handleLint,
				onOpenPopup: handleOpenPopup,
				placeholder,
				value: feelOnlyValue,
				variables,
				feelLanguageContext,
				ref: editorRef,
				tooltipContainer,
				translate
			}) : u(OptionalComponent, {
				...props,
				popupOpen: isPopupOpen,
				onInput: handleInputChange,
				onKeyDown: handleOnKeyDown,
				onBlur: handleOptionalInputOnBlur,
				contentAttributes: {
					"id": prefixId$6(id),
					"aria-label": label
				},
				value: localValue,
				ref: editorRef,
				onOpenPopup: handleOpenPopup,
				containerRef
			})]
		})]
	});
}
var OptionalFeelInput = D((props, ref) => {
	const { id, disabled, onInput, onKeyDown, value, onFocus, onBlur, placeholder } = props;
	const inputRef = A$1();
	ref.current = { focus: (position) => {
		const input = inputRef.current;
		if (!input) return;
		input.focus();
		if (typeof position === "number") {
			if (position > value.length) position = value.length;
			input.setSelectionRange(position, position);
		}
	} };
	return u("input", {
		id: prefixId$6(id),
		type: "text",
		ref: inputRef,
		name: id,
		spellCheck: "false",
		autoComplete: "off",
		disabled,
		class: "bio-properties-panel-input",
		onInput: (e) => onInput(e.target.value),
		onFocus,
		onKeyDown,
		onBlur,
		placeholder,
		value: value || ""
	});
});
var OptionalFeelNumberField = D((props, ref) => {
	const { id, debounce, disabled, onInput, value, min, max, step, onFocus, onBlur, onKeyDown } = props;
	const inputRef = A$1();
	ref.current = { focus: () => {
		const input = inputRef.current;
		if (!input) return;
		input.focus();
	} };
	return u(NumberField, {
		id,
		debounce,
		disabled,
		displayLabel: false,
		inputRef,
		max,
		min,
		onInput,
		step,
		value,
		onFocus,
		onBlur,
		onKeyDown
	});
});
var OptionalFeelTextArea = D((props, ref) => {
	const { id, disabled, onInput, value, onFocus, onBlur, placeholder } = props;
	const inputRef = A$1();
	ref.current = { focus: () => {
		const input = inputRef.current;
		if (!input) return;
		input.focus();
		input.setSelectionRange(0, 0);
	} };
	return u("textarea", {
		id: prefixId$6(id),
		type: "text",
		ref: inputRef,
		name: id,
		spellCheck: "false",
		autoComplete: "off",
		disabled,
		class: "bio-properties-panel-input",
		onInput: (e) => onInput(e.target.value),
		onFocus,
		onBlur,
		placeholder,
		value: value || "",
		"data-gramm": "false"
	});
});
D((props, ref) => {
	const { id, onInput, value, onFocus, onBlur, switcherLabel } = props;
	const inputRef = A$1();
	ref.current = { focus: () => {
		const input = inputRef.current;
		if (!input) return;
		input.focus();
	} };
	return u(ToggleSwitch, {
		id,
		value,
		inputRef,
		onInput,
		onFocus,
		onBlur,
		switcherLabel
	});
});
var OptionalFeelCheckbox = D((props, ref) => {
	const { id, disabled, onInput, value, onFocus, onBlur } = props;
	const inputRef = A$1();
	const handleChange = ({ target }) => {
		onInput(target.checked);
	};
	ref.current = { focus: () => {
		const input = inputRef.current;
		if (!input) return;
		input.focus();
	} };
	return u("input", {
		ref: inputRef,
		id: prefixId$6(id),
		name: id,
		onFocus,
		onBlur,
		type: "checkbox",
		class: "bio-properties-panel-input",
		onChange: handleChange,
		checked: value,
		disabled
	});
});
function FeelEntry(props) {
	const { element, id, description, debounce, disabled, feel, label, getValue, setValue, tooltipContainer, hostLanguage, singleLine, validate, show = noop$2, example, variables, onFocus, onBlur, placeholder, tooltip, translate = translateFallback } = props;
	const [validationDiagnostic, setValidationDiagnostic] = d(null);
	const [lintDiagnostic, setLintDiagnostic] = d(null);
	let value = getValue(element);
	h(() => {
		if (isFunction(validate)) {
			const newValidationError = validate(value) || null;
			setValidationDiagnostic(newValidationError);
		}
	}, [value, validate]);
	const onInput = useStaticCallback((newValue) => {
		if (newValue !== getValue(element)) {
			let newValidationError = null;
			if (isFunction(validate)) newValidationError = validate(newValue) || null;
			setValue(newValue, newValidationError);
			setValidationDiagnostic(newValidationError);
		}
	});
	const onError = q$1((err) => {
		setLintDiagnostic(err);
	}, []);
	const diagnostic = getMostSevere([
		...useDiagnostics(id),
		lintDiagnostic,
		validationDiagnostic
	]);
	return u("div", {
		class: (0, import_classnames.default)(props.class, "bio-properties-panel-entry", getDiagnosticClass(diagnostic)),
		"data-entry-id": id,
		children: [
			k$1(FeelTextfield, {
				...props,
				debounce,
				disabled,
				feel,
				id,
				key: element,
				label,
				onInput,
				onError,
				onFocus,
				onBlur,
				placeholder,
				example,
				hostLanguage,
				singleLine,
				show,
				translate,
				value,
				variables,
				tooltipContainer,
				OptionalComponent: props.OptionalComponent,
				tooltip
			}),
			u(DiagnosticMessage, {
				diagnostic,
				forId: id,
				element
			}),
			u(Description, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
function FeelNumberEntry(props) {
	return u(FeelEntry, {
		class: "bio-properties-panel-feel-number",
		OptionalComponent: OptionalFeelNumberField,
		...props
	});
}
function FeelTextAreaEntry(props) {
	return u(FeelEntry, {
		class: "bio-properties-panel-feel-textarea",
		OptionalComponent: OptionalFeelTextArea,
		...props
	});
}
function FeelCheckboxEntry(props) {
	return u(FeelEntry, {
		class: "bio-properties-panel-feel-checkbox",
		OptionalComponent: OptionalFeelCheckbox,
		...props
	});
}
function isEdited$5(node) {
	if (!node) return false;
	if (node.type === "checkbox") return !!node.checked || node.classList.contains("edited");
	return !!node.value || node.classList.contains("edited");
}
function prefixId$6(id) {
	return `bio-properties-panel-${id}`;
}
function isFeelOptional(feelType) {
	return feelType === "optional" || feelType === "optional-default-enabled";
}
function isFeelActive(feelType, localValue) {
	if (feelType === "required") return true;
	if (isString(localValue)) {
		if (localValue.startsWith("=")) return true;
	}
	return false;
}
function getFeelValue(value) {
	if (isString(value) && value.startsWith("=")) return value.substring(1);
	return value;
}
function getInitialFeelLocalValue(feelType, value) {
	if (feelType === "optional-default-enabled" && (value === void 0 || value === "")) return "=";
	return value;
}
function List(props) {
	const { id, element, items = [], component, label = "<empty>", open: shouldOpen, onAdd, onRemove, autoFocusEntry, translate = translateFallback, ...restProps } = props;
	const entryRef = A$1(null);
	const [open, setOpen] = d(!!shouldOpen);
	const [sticky, setSticky] = d(false);
	const hasItems = !!items.length;
	const toggleOpen = () => hasItems && setOpen(!open);
	const newItems = useNewItems(items, usePrevious(element) !== element);
	h(() => {
		if (open && !hasItems) setOpen(false);
	}, [open, hasItems]);
	function addItem(event) {
		event.stopPropagation();
		onAdd();
		if (!open) setOpen(true);
	}
	useStickyIntersectionObserver(entryRef, "div.bio-properties-panel-scroll-container", setSticky);
	return u("div", {
		"data-entry-id": id,
		class: (0, import_classnames.default)("bio-properties-panel-entry", "bio-properties-panel-list-entry", hasItems ? "" : "empty", open ? "open" : ""),
		ref: entryRef,
		children: [u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-list-entry-header", sticky && open ? "sticky" : ""),
			onClick: toggleOpen,
			children: [u("div", {
				class: (0, import_classnames.default)("bio-properties-panel-list-entry-header-title", open && "open"),
				children: label
			}), u("div", {
				class: "bio-properties-panel-list-entry-header-buttons",
				children: [
					u("button", {
						type: "button",
						title: translate("Create new list item"),
						onClick: addItem,
						class: "bio-properties-panel-add-entry",
						children: [u(Create, {}), !hasItems ? u("span", {
							class: "bio-properties-panel-add-entry-label",
							children: translate("Create")
						}) : null]
					}),
					hasItems && u("div", {
						title: translate(`List contains {numOfItems} item${items.length != 1 ? "s" : ""}`, { numOfItems: items.length }),
						class: "bio-properties-panel-list-badge",
						children: items.length
					}),
					hasItems && u("button", {
						type: "button",
						title: translate("Toggle list item"),
						class: "bio-properties-panel-arrow",
						children: u(Arrow, { class: open ? "bio-properties-panel-arrow-down" : "bio-properties-panel-arrow-right" })
					})
				]
			})]
		}), hasItems && u(ItemsList, {
			...restProps,
			autoFocusEntry,
			component,
			element,
			id,
			items,
			newItems,
			onRemove,
			open,
			translate
		})]
	});
}
function ItemsList(props) {
	const { autoFocusEntry, component: Component, element, id, items, newItems, onRemove, open, translate, ...restProps } = props;
	const getKey = useKeyFactory();
	const newItem = newItems[0];
	h(() => {
		if (newItem && autoFocusEntry) {
			const entry = query(`[data-entry-id="${id}"]`);
			const focusableInput = query(typeof autoFocusEntry === "boolean" ? ".bio-properties-panel-input" : autoFocusEntry, entry);
			if (focusableInput) {
				if (isFunction(focusableInput.select)) focusableInput.select();
				else if (isFunction(focusableInput.focus)) focusableInput.focus();
			}
		}
	}, [
		newItem,
		autoFocusEntry,
		id
	]);
	return u("ol", {
		class: (0, import_classnames.default)("bio-properties-panel-list-entry-items", open ? "open" : ""),
		children: items.map((item, index) => {
			const key = getKey(item);
			return u("li", {
				class: "bio-properties-panel-list-entry-item",
				children: [u(Component, {
					...restProps,
					element,
					id,
					index,
					item,
					open: item === newItem
				}), onRemove && u("button", {
					type: "button",
					title: translate("Delete item"),
					class: "bio-properties-panel-remove-entry bio-properties-panel-remove-list-entry",
					onClick: () => onRemove && onRemove(item),
					children: u(Delete, {})
				})]
			}, key);
		})
	});
}
function useNewItems(items = [], shouldReset) {
	const previousItems = usePrevious(items.slice()) || [];
	if (shouldReset) return [];
	return previousItems ? items.filter((item) => !previousItems.includes(item)) : [];
}
function Select(props) {
	const { id, label, onChange, options = [], value = "", disabled, onFocus, onBlur, tooltip } = props;
	const ref = useShowEntryEvent(id);
	const [localValue, setLocalValue] = d(value);
	const handleChangeCallback = ({ target }) => {
		onChange(target.value);
	};
	const handleChange = (e) => {
		handleChangeCallback(e);
		setLocalValue(e.target.value);
	};
	h(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	return u("div", {
		class: "bio-properties-panel-select",
		children: [u("label", {
			for: prefixId$4(id),
			class: "bio-properties-panel-label",
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			})
		}), u("select", {
			ref,
			id: prefixId$4(id),
			name: id,
			class: "bio-properties-panel-input",
			onInput: handleChange,
			onFocus,
			onBlur,
			value: localValue,
			disabled,
			children: options.map((option, idx) => {
				if (option.children) return u("optgroup", {
					label: option.label,
					children: option.children.map((child, idx) => u("option", {
						value: child.value,
						disabled: child.disabled,
						children: child.label
					}, idx))
				}, idx);
				return u("option", {
					value: option.value,
					disabled: option.disabled,
					children: option.label
				}, idx);
			})
		})]
	});
}
function SelectEntry(props) {
	const { element, id, description, label, getValue, setValue, getOptions, disabled, onFocus, onBlur, validate, tooltip } = props;
	const options = getOptions(element);
	const diagnostics = useDiagnostics(id);
	const [localDiagnostic, setLocalDiagnostic] = d(null);
	let value = getValue(element);
	h(() => {
		if (isFunction(validate)) {
			const newValidationError = validate(value) || null;
			setLocalDiagnostic(newValidationError);
		}
	}, [value, validate]);
	const onChange = (newValue) => {
		if (newValue !== value) {
			let newValidationError = null;
			if (isFunction(validate)) newValidationError = validate(newValue) || null;
			setValue(newValue, newValidationError);
			setLocalDiagnostic(newValidationError);
		}
	};
	const diagnostic = getMostSevere([...diagnostics, localDiagnostic]);
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-entry", getDiagnosticClass(diagnostic)),
		"data-entry-id": id,
		children: [
			u(Select, {
				id,
				label,
				value,
				onChange,
				onFocus,
				onBlur,
				options,
				disabled,
				tooltip,
				element
			}, element),
			u(DiagnosticMessage, {
				diagnostic,
				forId: id,
				element
			}),
			u(Description, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
function isEdited$3(node) {
	return node && !!node.value;
}
function prefixId$4(id) {
	return `bio-properties-panel-${id}`;
}
function Simple(props) {
	const { debounce, disabled, element, getValue, id, onBlur, onFocus, setValue, translate = translateFallback } = props;
	const value = getValue(element);
	const [localValue, setLocalValue] = d(value);
	const handleInputCallback = T$1(() => {
		return debounce((target) => setValue(target.value.length ? target.value : void 0));
	}, [setValue, debounce]);
	const handleInput = (e) => {
		handleInputCallback(e.target);
		setLocalValue(e.target.value);
	};
	h(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	return u("div", {
		class: "bio-properties-panel-simple",
		children: u("input", {
			id: prefixId$3(id),
			type: "text",
			name: id,
			spellCheck: "false",
			autoComplete: "off",
			disabled,
			class: "bio-properties-panel-input",
			onInput: handleInput,
			"aria-label": localValue || translate("<empty>"),
			onFocus,
			onBlur,
			value: localValue
		}, element)
	});
}
function prefixId$3(id) {
	return `bio-properties-panel-${id}`;
}
function TextArea(props) {
	const { id, element, label, debounce, onInput: commitValue, value = "", disabled, monospace, onFocus, onBlur, onPaste, autoResize = true, placeholder, rows = autoResize ? 1 : 2, tooltip, translate = translateFallback } = props;
	const [localValue, setLocalValue] = d(value);
	const ref = useShowEntryEvent(id);
	const containerRef = A$1();
	const localValueRef = A$1(localValue);
	localValueRef.current = localValue;
	const { eventBus } = x$1(EventContext);
	const [isPopupOpen, setIsPopupOpen] = d(false);
	const onInput = q$1((newValue) => {
		commitValue(newValue === "" ? void 0 : newValue);
	}, [commitValue]);
	const handleInput = useDebounce(onInput, debounce);
	const handleLocalInput = (e) => {
		if (e.target.value === localValue) return;
		setLocalValue(e.target.value);
		handleInput(e.target.value);
	};
	const handleOnBlur = (e) => {
		const trimmedValue = e.target.value.trim();
		handleInput.cancel?.();
		onInput(trimmedValue);
		setLocalValue(trimmedValue);
		if (onBlur) onBlur(e);
	};
	const handleOnPaste = (e) => {
		const input = e.target;
		const isFieldEmpty = !input.value;
		const isAllSelected = input.selectionStart === 0 && input.selectionEnd === input.value.length;
		if (isFieldEmpty || isAllSelected) {
			const trimmedValue = e.clipboardData.getData("text").trim();
			setLocalValue(trimmedValue);
			handleInput(trimmedValue);
			if (onPaste) onPaste(e);
			e.preventDefault();
			return;
		}
		if (onPaste) onPaste(e);
	};
	const handleOnKeyDown = (e) => {
		if (isCmdWithChar(e)) handleInput.flush?.();
	};
	const handlePopupInput = (newValue) => {
		if (newValue === localValueRef.current) return;
		setLocalValue(newValue);
		handleInput(newValue);
	};
	const handleOpenPopup = () => {
		const isOpen = eventBus.fire("propertiesPanel.openPopup", {
			element,
			entryId: id,
			label,
			onInput: handlePopupInput,
			sourceElement: ref.current,
			value: localValue
		});
		if (isOpen) eventBus.once("propertiesPanelPopup.close", () => {
			handleInput.flush?.();
			setIsPopupOpen(false);
		});
		setIsPopupOpen(isOpen === true);
	};
	h(() => {
		return () => {
			eventBus && eventBus.fire("propertiesPanel.closePopup");
		};
	}, []);
	h(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	return u("div", {
		class: "bio-properties-panel-textarea",
		children: [u("label", {
			for: prefixId$2(id),
			class: "bio-properties-panel-label",
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element,
				children: label
			})
		}), u("div", {
			class: (0, import_classnames.default)("bio-properties-panel-textarea-container", isPopupOpen ? "popupOpen" : null),
			ref: containerRef,
			children: [
				isPopupOpen && u("div", {
					class: "bio-properties-panel-textarea__open-popup-placeholder",
					children: translate("Opened in editor")
				}),
				u("textarea", {
					ref,
					id: prefixId$2(id),
					name: id,
					spellCheck: "false",
					class: (0, import_classnames.default)("bio-properties-panel-input", monospace ? "bio-properties-panel-input-monospace" : "", autoResize ? "auto-resize" : ""),
					onInput: handleLocalInput,
					onFocus,
					onKeyDown: handleOnKeyDown,
					onBlur: handleOnBlur,
					onPaste: handleOnPaste,
					placeholder,
					rows,
					value: localValue,
					disabled,
					"data-gramm": "false"
				}),
				eventBus && !disabled && u(OpenPopupButton, {
					onClick: handleOpenPopup,
					translate
				})
			]
		})]
	});
}
function TextAreaEntry(props) {
	const { element, id, description, debounce, label, getValue, setValue, rows, monospace, disabled, validate, onFocus, onBlur, onPaste, placeholder, autoResize, tooltip, translate } = props;
	const diagnostics = useDiagnostics(id);
	const [localDiagnostic, setLocalDiagnostic] = d(null);
	let value = getValue(element);
	h(() => {
		if (isFunction(validate)) {
			const newValidationError = validate(value) || null;
			setLocalDiagnostic(newValidationError);
		}
	}, [value, validate]);
	const onInput = useStaticCallback((newValue) => {
		if (newValue !== getValue(element)) {
			let newValidationError = null;
			if (isFunction(validate)) newValidationError = validate(newValue) || null;
			setValue(newValue, newValidationError);
			setLocalDiagnostic(newValidationError);
		}
	});
	const diagnostic = getMostSevere([...diagnostics, localDiagnostic]);
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-entry", getDiagnosticClass(diagnostic)),
		"data-entry-id": id,
		children: [
			u(TextArea, {
				id,
				label,
				value,
				onInput,
				onFocus,
				onBlur,
				onPaste,
				rows,
				debounce,
				monospace,
				disabled,
				placeholder,
				autoResize,
				tooltip,
				translate,
				element
			}, element),
			u(DiagnosticMessage, {
				diagnostic,
				forId: id,
				element
			}),
			u(Description, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
function isEdited$1(node) {
	return node && !!node.value;
}
function prefixId$2(id) {
	return `bio-properties-panel-${id}`;
}
function Textfield(props) {
	const { debounce, disabled = false, id, label, onInput: commitValue, onFocus, onBlur, onPaste, placeholder, value = "", tooltip } = props;
	const [localValue, setLocalValue] = d(value || "");
	const ref = useShowEntryEvent(id);
	const onInput = q$1((newValue) => {
		commitValue(newValue === "" ? void 0 : newValue);
	}, [commitValue]);
	const handleInput = useDebounce(onInput, debounce);
	const handleOnBlur = (e) => {
		const trimmedValue = e.target.value.trim();
		handleInput.cancel?.();
		onInput(trimmedValue);
		setLocalValue(trimmedValue);
		if (onBlur) onBlur(e);
	};
	const handleOnPaste = (e) => {
		const input = e.target;
		const isFieldEmpty = !input.value;
		const isAllSelected = input.selectionStart === 0 && input.selectionEnd === input.value.length;
		if (isFieldEmpty || isAllSelected) {
			const trimmedValue = e.clipboardData.getData("text").trim();
			setLocalValue(trimmedValue);
			handleInput(trimmedValue);
			if (onPaste) onPaste(e);
			e.preventDefault();
			return;
		}
		if (onPaste) onPaste(e);
	};
	const handleLocalInput = (e) => {
		if (e.target.value === localValue) return;
		setLocalValue(e.target.value);
		handleInput(e.target.value);
	};
	h(() => {
		if (value === localValue) return;
		setLocalValue(value);
	}, [value]);
	const handleOnKeyDown = (e) => {
		if (isCmdWithChar(e)) handleInput.flush?.();
	};
	return u("div", {
		class: "bio-properties-panel-textfield",
		children: [u("label", {
			for: prefixId$1(id),
			class: "bio-properties-panel-label",
			children: u(TooltipWrapper, {
				value: tooltip,
				forId: id,
				element: props.element,
				children: label
			})
		}), u("input", {
			ref,
			id: prefixId$1(id),
			type: "text",
			name: id,
			spellCheck: "false",
			autoComplete: "off",
			disabled,
			class: "bio-properties-panel-input",
			onInput: handleLocalInput,
			onFocus,
			onKeyDown: handleOnKeyDown,
			onBlur: handleOnBlur,
			onPaste: handleOnPaste,
			placeholder,
			value: localValue
		})]
	});
}
function TextfieldEntry(props) {
	const { element, id, description, debounce, disabled, label, getValue, setValue, validate, onFocus, onBlur, onPaste, placeholder, tooltip } = props;
	const diagnostics = useDiagnostics(id);
	const [localDiagnostic, setLocalDiagnostic] = d(null);
	let value = getValue(element);
	h(() => {
		if (isFunction(validate)) {
			const newValidationError = validate(value) || null;
			setLocalDiagnostic(newValidationError);
		}
	}, [value, validate]);
	const onInput = useStaticCallback((newValue) => {
		if (newValue !== getValue(element)) {
			let newValidationError = null;
			if (isFunction(validate)) newValidationError = validate(newValue) || null;
			setValue(newValue, newValidationError);
			setLocalDiagnostic(newValidationError);
		}
	});
	const diagnostic = getMostSevere([...diagnostics, localDiagnostic]);
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-entry", getDiagnosticClass(diagnostic)),
		"data-entry-id": id,
		children: [
			u(Textfield, {
				debounce,
				disabled,
				id,
				label,
				onInput,
				onFocus,
				onBlur,
				onPaste,
				placeholder,
				value,
				tooltip,
				element
			}, element),
			u(DiagnosticMessage, {
				diagnostic,
				forId: id,
				element
			}),
			u(Description, {
				forId: id,
				element,
				value: description
			})
		]
	});
}
function isEdited(node) {
	return node && !!node.value;
}
function prefixId$1(id) {
	return `bio-properties-panel-${id}`;
}
var DEFAULT_DEBOUNCE_TIME = 600;
function debounceInput(debounceDelay) {
	return function debounce$1(fn) {
		if (debounceDelay === false) return fn;
		var debounceTime = isNumber(debounceDelay) ? debounceDelay : DEFAULT_DEBOUNCE_TIME;
		return debounce(fn, debounceTime);
	};
}
debounceInput.$inject = ["config.debounceInput"];
var index$1 = { debounceInput: ["factory", debounceInput] };
function getPopupTitle({ element, label }) {
	let popupTitle = "";
	if (element && element.type) popupTitle = `${element.type} / `;
	return `${popupTitle}${label}`;
}
function createDragger(fn, dragPreview) {
	let self;
	let startX, startY;
	function onDragStart(event) {
		self = this;
		startX = event.clientX;
		startY = event.clientY;
		if (event.dataTransfer) event.dataTransfer.setDragImage(dragPreview || emptyCanvas(), 0, 0);
		document.addEventListener("dragover", onDrag, true);
		document.addEventListener("dragenter", preventDefault, true);
		document.addEventListener("dragend", onEnd);
		document.addEventListener("drop", preventDefault);
	}
	function onDrag(event) {
		const delta = {
			x: event.clientX - startX,
			y: event.clientY - startY
		};
		return fn.call(self, event, delta);
	}
	function onEnd() {
		document.removeEventListener("dragover", onDrag, true);
		document.removeEventListener("dragenter", preventDefault, true);
		document.removeEventListener("dragend", onEnd);
		document.removeEventListener("drop", preventDefault);
	}
	return onDragStart;
}
function preventDefault(event) {
	event.preventDefault();
	event.stopPropagation();
}
function emptyCanvas() {
	return domify("<canvas width=\"0\" height=\"0\" />");
}
var noop = () => {};
function PopupComponent(props, globalRef) {
	const { className, delayInitialFocus, position, width, height, onClose, onPostActivate = noop, onPostDeactivate = noop, returnFocus = true, closeOnEscape = true, allowFocusMove = () => true, title } = props;
	const focusTrapRef = A$1(null);
	const localRef = A$1(null);
	const popupRef = globalRef || localRef;
	const handleKeydown = (event) => {
		event.stopPropagation();
		if (closeOnEscape && event.key === "Escape") onClose();
	};
	const handleFocus = () => {
		if (focusTrapRef.current) focusTrapRef.current.activate();
	};
	const { top, left } = position || getCenterPosition(width, height);
	const style = {};
	if (isDefined(top) && isDefined(left)) {
		style.top = top + "px";
		style.left = left + "px";
	}
	if (width) style.width = width + "px";
	if (height) style.height = height + "px";
	h(() => {
		if (popupRef.current) popupRef.current.addEventListener("focusin", handleFocus);
		return () => {
			if (popupRef.current) popupRef.current.removeEventListener("focusin", handleFocus);
		};
	}, [popupRef]);
	h(() => {
		if (popupRef.current) {
			focusTrapRef.current = createFocusTrap(popupRef.current, {
				clickOutsideDeactivates: true,
				delayInitialFocus,
				fallbackFocus: popupRef.current,
				isKeyForward: (event) => isTab(event) && !event.shiftKey && allowFocusMove(event),
				isKeyBackward: (event) => isTab(event) && event.shiftKey && allowFocusMove(event),
				onPostActivate,
				onPostDeactivate,
				returnFocusOnDeactivate: returnFocus
			});
			focusTrapRef.current.activate();
		}
		return () => focusTrapRef.current && focusTrapRef.current.deactivate();
	}, [popupRef]);
	return u("div", {
		"aria-label": title,
		tabIndex: -1,
		ref: popupRef,
		onKeyDown: handleKeydown,
		role: "dialog",
		class: (0, import_classnames.default)("bio-properties-panel-popup", "bio-theme-parent", className),
		style,
		children: props.children
	});
}
var Popup$1 = D(PopupComponent);
Popup$1.Title = Title;
Popup$1.Body = Body;
Popup$1.Footer = Footer;
function Title(props) {
	const { eventBus } = x$1(EventContext);
	const { children, className, draggable, title, showCloseButton = false, closeButtonTooltip = "Close popup", onClose, ...rest } = props;
	const context = A$1({
		startPosition: null,
		newPosition: null
	});
	const dragPreviewRef = A$1();
	const titleRef = A$1();
	const onMove = (event, delta) => {
		cancel(event);
		const { x: dx, y: dy } = delta;
		const newPosition = {
			x: context.current.startPosition.x + dx,
			y: context.current.startPosition.y + dy
		};
		const popupParent = getPopupParent(titleRef.current);
		popupParent.style.top = newPosition.y + "px";
		popupParent.style.left = newPosition.x + "px";
		eventBus?.fire("feelPopup.dragover", {
			newPosition,
			delta
		});
	};
	const onMoveStart = (event) => {
		createDragger(onMove, dragPreviewRef.current)(event);
		event.stopPropagation();
		const bounds = getPopupParent(titleRef.current).getBoundingClientRect();
		context.current.startPosition = {
			x: bounds.left,
			y: bounds.top
		};
		eventBus?.fire("feelPopup.dragstart");
	};
	const onMoveEnd = () => {
		context.current.newPosition = null;
		eventBus?.fire("feelPopup.dragend");
	};
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-popup__header", draggable && "draggable", className),
		ref: titleRef,
		draggable,
		onDragStart: onMoveStart,
		onDragEnd: onMoveEnd,
		...rest,
		children: [
			draggable && u(S, { children: [u("div", {
				ref: dragPreviewRef,
				class: "bio-properties-panel-popup__drag-preview"
			}), u("div", {
				class: "bio-properties-panel-popup__drag-handle",
				children: u(Drag, {})
			})] }),
			u("div", {
				class: "bio-properties-panel-popup__title",
				children: title
			}),
			children,
			showCloseButton && u("button", {
				type: "button",
				title: closeButtonTooltip,
				class: "bio-properties-panel-popup__close",
				onClick: onClose,
				children: u(Close, {})
			})
		]
	});
}
function Body(props) {
	const { children, className, ...rest } = props;
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-popup__body", className),
		...rest,
		children
	});
}
function Footer(props) {
	const { children, className, ...rest } = props;
	return u("div", {
		class: (0, import_classnames.default)("bio-properties-panel-popup__footer", className),
		...rest,
		children: props.children
	});
}
function getCenterPosition(width, height) {
	if (!width || !height) return {};
	const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	return {
		left: Math.max(0, (viewportWidth - width) / 2),
		top: Math.max(0, (viewportHeight - height) / 2)
	};
}
function isTab(event) {
	return event.key === "Tab";
}
function getPopupParent(node) {
	return node.closest(".bio-properties-panel-popup");
}
function cancel(event) {
	event.preventDefault();
	event.stopPropagation();
}
var FEEL_POPUP_WIDTH = 700;
var FEEL_POPUP_HEIGHT = 400;
function FeelPopup(props) {
	const { entryId, onInput, onClose, title, type, value, links, variables, hostLanguage, singleLine, sourceElement, tooltipContainer, feelLanguageContext } = props;
	const editorRef = A$1();
	const popupRef = A$1();
	const isAutoCompletionOpen = A$1(false);
	const handleSetReturnFocus = () => {
		sourceElement && sourceElement.focus();
	};
	const onKeyDownCapture = (event) => {
		if (event.key === "Escape") isAutoCompletionOpen.current = autoCompletionOpen(event.target);
	};
	const onKeyDown = (event) => {
		if (event.key === "Escape") {
			if (!isAutoCompletionOpen.current) {
				onClose();
				isAutoCompletionOpen.current = false;
			}
		}
	};
	h(() => {
		if (editorRef.current) editorRef.current.focus();
	}, [editorRef]);
	return u(Popup$1, {
		className: "bio-properties-panel-feel-popup",
		title,
		returnFocus: false,
		closeOnEscape: false,
		delayInitialFocus: false,
		allowFocusMove: (event) => !isSnippetNavigation(event),
		onPostDeactivate: handleSetReturnFocus,
		height: FEEL_POPUP_HEIGHT,
		width: FEEL_POPUP_WIDTH,
		ref: popupRef,
		children: [u(Popup$1.Title, {
			title,
			showCloseButton: true,
			closeButtonTooltip: "Save and close",
			onClose,
			draggable: true,
			children: u(S, { children: (links || []).map((link, index) => {
				return u("a", {
					rel: "noreferrer",
					href: link.href,
					target: "_blank",
					class: "bio-properties-panel-feel-popup__title-link",
					children: [link.title, u(Launch, {})]
				}, index);
			}) })
		}), u(Popup$1.Body, { children: u("div", {
			onKeyDownCapture,
			onKeyDown,
			class: "bio-properties-panel-feel-popup__body",
			children: [type === "feel" && u(FeelEditor, {
				enableGutters: true,
				name: entryId,
				onInput,
				value,
				variables,
				feelLanguageContext,
				ref: editorRef,
				tooltipContainer
			}), type === "feelers" && u(TemplatingEditor, {
				contentAttributes: { "aria-label": title },
				enableGutters: true,
				hostLanguage,
				name: entryId,
				onInput,
				value,
				ref: editorRef,
				singleLine,
				tooltipContainer
			})]
		}) })]
	});
}
function autoCompletionOpen(element) {
	const editor = element.closest(".cm-editor");
	return editor ? editor.querySelector(".cm-tooltip-autocomplete") : null;
}
function isSnippetNavigation(event) {
	const editor = event.target.closest(".cm-editor");
	return !!(editor && editor.querySelector(".cm-snippetField"));
}
var TEXT_POPUP_WIDTH = 700;
var TEXT_POPUP_HEIGHT = 400;
function TextPopup(props) {
	const { entryId, onInput, onClose, title, value, sourceElement } = props;
	const editorRef = A$1();
	const popupRef = A$1();
	const handleSetReturnFocus = () => {
		sourceElement && sourceElement.focus();
	};
	h(() => {
		if (editorRef.current) editorRef.current.focus();
	}, [editorRef]);
	return u(Popup$1, {
		className: "bio-properties-panel-text-popup",
		title,
		returnFocus: false,
		closeOnEscape: true,
		delayInitialFocus: false,
		onClose,
		onPostDeactivate: handleSetReturnFocus,
		height: TEXT_POPUP_HEIGHT,
		width: TEXT_POPUP_WIDTH,
		ref: popupRef,
		children: [u(Popup$1.Title, {
			title,
			showCloseButton: true,
			closeButtonTooltip: "Save and close",
			onClose,
			draggable: true
		}), u(Popup$1.Body, { children: u("textarea", {
			id: prefixId(entryId),
			name: entryId,
			class: "bio-properties-panel-input",
			ref: editorRef,
			onInput: (e) => onInput(e.target.value),
			value: value || "",
			spellCheck: "false",
			autoComplete: "off",
			"aria-label": title,
			"data-gramm": "false"
		}) })]
	});
}
function prefixId(id) {
	return `bio-properties-panel-popup-${id}`;
}
var DEFAULT_POPUP_TYPE = "text";
var DEFAULT_PRIORITY = 1e3;
var LOW_PRIORITY = 500;
var Popup = class {
	constructor(eventBus, config = {}) {
		this._eventBus = eventBus;
		this._config = config;
		this._isOpen = false;
		this.registerProvider("feel", LOW_PRIORITY, FeelPopup);
		this.registerProvider("feelers", LOW_PRIORITY, FeelPopup);
		this.registerProvider("text", LOW_PRIORITY, TextPopup);
		eventBus.on("propertiesPanel.openPopup", (_, context) => {
			return this.open(context.entryId, context, context.sourceElement);
		});
		eventBus.on(["propertiesPanel.closePopup", "propertiesPanel.detach"], () => {
			this.close();
		});
	}
	registerProvider(type, priority, provider) {
		if (!provider) {
			provider = priority;
			priority = DEFAULT_PRIORITY;
		}
		this._eventBus.on("propertiesPanelPopup.getProviders." + type, priority, function(event) {
			event.providers.push(provider);
		});
	}
	_getProviders(type) {
		const event = this._eventBus.createEvent({
			type: "propertiesPanelPopup.getProviders." + type,
			providers: []
		});
		this._eventBus.fire(event);
		return event.providers;
	}
	isOpen() {
		return this._isOpen;
	}
	open(entryId, popupConfig, sourceElement) {
		this.close();
		return this._openPopup({
			...popupConfig,
			entryId,
			sourceElement
		});
	}
	close() {
		this._closePopup();
	}
	_openPopup(context) {
		const { element, label, sourceElement, type = DEFAULT_POPUP_TYPE } = context;
		const component = this._getProviders(type)[0];
		if (!component) return false;
		this._isOpen = true;
		this._eventBus.fire("propertiesPanelPopup.open", {
			container: this._config.feelPopupContainer,
			config: {
				...context,
				component,
				links: this._config.getFeelPopupLinks?.(type) || [],
				onClose: () => {
					this._closePopup();
					setTimeout(() => {
						sourceElement && sourceElement.focus();
					}, 0);
				},
				title: getPopupTitle({
					element,
					label
				})
			}
		});
		return true;
	}
	_closePopup() {
		if (this._isOpen) {
			this._isOpen = false;
			this._eventBus.fire("propertiesPanelPopup.close");
		}
	}
};
Popup.$inject = ["eventBus", "config.propertiesPanel"];
var PopupRenderer = class {
	constructor(eventBus) {
		this._eventBus = eventBus;
		this._container = null;
		this._element = null;
		eventBus.on("propertiesPanelPopup.open", (context) => {
			this._renderPopup(context);
		});
		eventBus.on("propertiesPanelPopup.close", () => {
			this._removePopup();
		});
	}
	_renderPopup(context) {
		let { container, config } = context;
		container = this._container = getContainer(container) || document.body;
		const element = this._element = createElement();
		container.appendChild(element);
		this._emit("feelPopup.open");
		const Component = config.component;
		R$1(u(EventContext.Provider, {
			value: { eventBus: this._eventBus },
			children: u(Component, {
				...config,
				eventBus: this._eventBus
			})
		}), element);
		this._emit("feelPopup.opened", { domNode: element });
	}
	_removePopup() {
		if (!this._container) return;
		this._emit("feelPopup.close", { domNode: this._element });
		R$1(null, this._element);
		this._container.removeChild(this._element);
		this._container = null;
		this._element = null;
		this._emit("feelPopup.closed");
	}
	_emit(event, context) {
		this._eventBus.fire(event, context);
	}
};
PopupRenderer.$inject = ["eventBus"];
function createElement() {
	const element = document.createElement("div");
	element.classList.add("bio-properties-panel-popup-container");
	return element;
}
function getContainer(container) {
	if (isString(container)) return query(container);
	return container;
}
var index = {
	__init__: ["feelPopup", "feelPopupRenderer"],
	feelPopup: ["type", Popup],
	feelPopupRenderer: ["type", PopupRenderer]
};
export { isEdited$3 as A, require_classnames as B, TextfieldEntry as C, index$1 as D, index as E, isEdited$9 as F, camundaReservedNameBuiltins as G, gn as H, useError as I, parser$4 as J, FeelAnalyzer as K, useLayoutState as L, isEdited$6 as M, isEdited$7 as N, isEdited as O, isEdited$8 as P, usePrevious as R, TextAreaEntry as S, TooltipWrapper as T, FeelEditor$1 as U, $ as V, camundaBuiltins as W, EditorView as X, trackVariables as Y, ListGroup as _, Create as a, SelectEntry as b, FeelEntry as c, FeelTextAreaEntry as d, Group as f, List as g, JsonEditorEntry as h, CollapsibleEntry as i, isEdited$5 as j, isEdited$1 as k, FeelLanguageContext as l, HeaderButton as m, CheckboxEntry as n, DropdownButton as o, Header as p, VariableContext as q, CheckboxGroup as r, FeelCheckboxEntry as s, Arrow as t, FeelNumberEntry as u, NumberFieldEntry as v, ToggleSwitchEntry as w, Simple as x, PropertiesPanel as y, useShowEntryEvent as z };

//# sourceMappingURL=index.esm-DgBSptNj.js.map