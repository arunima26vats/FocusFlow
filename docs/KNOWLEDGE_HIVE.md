# 🧠 The Knowledge Hive (Editor & Graph System)

The **Knowledge Hive** is FocusFlowZ's Obsidian + Notion hybrid note-taking environment. It is designed to turn fragmented study notes into an interconnected network of personal knowledge.

---

## 📝 TipTap Rich Text Architecture

The editor is powered by **TipTap v3** (built atop ProseMirror) in [`NoteEditor.jsx`](../src/pages/NoteEditor.jsx) and [`SessionNotesEditor.jsx`](../src/components/SessionNotesEditor.jsx).

### Installed Extensions:
* **StarterKit**: Paragraphs, bold, italic, strike, code, bullet lists, ordered lists, blockquotes, horizontal rules.
* **CodeBlockLowlight**: Syntax highlighting for code blocks using `lowlight`.
* **TaskList & TaskItem**: Interactive markdown-style checkable todo items.
* **Tables**: `Table`, `TableRow`, `TableHeader`, `TableCell` for structured tabular data.
* **BubbleMenu**: Context-aware floating formatting toolbar on text selection.
* **Placeholder & CharacterCount**: Minimal visual cues and live word counters.

---

## 🔗 Internal Wiki-Link System (`InternalLinkMark`)

Unlike standard editors that wrap links in read-only inline blocks with `contenteditable="false"` (which break cursor movement, selection, and undo history), FocusFlowZ implements a custom **TipTap Mark Extension**:

* **Source File**: [`src/extensions/InternalLinkMark.js`](../src/extensions/InternalLinkMark.js)
* **Mark Name**: `internalLink`
* **Attributes**:
  * `noteId`: Target note UUID.
  * `title`: Target note title.
* **Rendered DOM**:
  ```html
  <span class="ne-internal-link" data-note-id="UUID" data-title="Note Title">Note Title</span>
  ```

### Why a Mark Instead of a Node?
1. **Fluid Cursor Navigation**: The cursor flows naturally through words without stopping at node boundaries.
2. **Text Coexistence**: Formats like bold, italics, and custom fonts coexist cleanly with internal links.
3. **Native Undo/Redo**: Works seamlessly with ProseMirror's transaction history.
4. **Structured Storage**: Serializes directly into the note's `links: TEXT[]` array in PostgreSQL for indexed graph querying.

---

## 🌐 2D Force-Directed Knowledge Graph

* **Source File**: [`src/components/GraphView.jsx`](../src/components/GraphView.jsx) & [`src/hooks/useGraphData.js`](../src/hooks/useGraphData.js)
* **Visual Engine**: `react-force-graph-2d`

### Graph Construction Logic:
1. Every note in `user_notes` is converted into a graph **node**:
   ```javascript
   { id: note.id, title: note.title, group: note.subject, val: note.word_count || 10 }
   ```
2. Edges are derived from the note's `links` array:
   ```javascript
   { source: note.id, target: linkedNoteId }
   ```
3. Dangling or broken references (links pointing to deleted notes) are filtered out automatically.
4. Duplicate bi-directional edges are unified.

---

## 📁 Hierarchical Collections (Folders)

* **Source File**: [`src/lib/collectionTree.js`](../src/lib/collectionTree.js)
* Note collections support unlimited nesting using a `parent_id` foreign key.
* The client builds an in-memory tree structure:
  ```javascript
  buildCollectionTree(flatCollections) -> nested nodes with children []
  ```
* Supports badge counters displaying both direct note counts and recursive descendant note counts.

---

## 💾 Debounced Autosave Engine

* **Source File**: [`src/hooks/useAutosave.js`](../src/hooks/useAutosave.js)
* **Debounce Window**: `1200ms`.
* **Features**:
  * **Stale Closure Immunity**: Uses `useRef` to capture the latest editor snapshot.
  * **Race Condition Prevention**: Instantiates an `AbortController` before each save to cancel in-flight saves when new keystrokes arrive.
  * **Exponential Backoff**: Automatically retries up to 3 times on transient network drops (`500ms`, `1000ms`, `2000ms`).
