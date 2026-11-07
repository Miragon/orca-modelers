import { createHash } from "node:crypto";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const FEATURE_TIPS = [
  "chat-ui-here",
  "agent-session-search",
  "orca-cli",
  "cmd-j-palette",
  "voice-dictation",
];
const CONTEXTUAL_TOURS = [
  "workspace-board",
  "workspace-agent-sessions",
  "browser",
  "client-hosted-browser",
  "tasks",
  "automations",
  "floating-workspace",
  "workspace-creation",
  "projects-collapse-all",
];

// Orca keeps a profile's state as JSON documents in SQLite. Each row carries the SHA-256 of its
// payload, and no row may be newer than the profile's revision. Edit it only while Orca is stopped.
export class ProfileState {
  #database;

  constructor(home) {
    this.#database = new DatabaseSync(
      join(
        home,
        "config",
        "orca",
        "profiles",
        "local-default",
        "profile-state.db",
      ),
    );
  }

  skipIntroductions() {
    this.#write("onboarding", {
      ...this.#read("onboarding"),
      flowVersion: 4,
      closedAt: Date.now(),
      outcome: "completed",
      lastCompletedStep: 5,
    });
    const ui = this.#read("ui");
    for (const key of Object.keys(ui)) {
      if (key.endsWith("Dismissed")) ui[key] = true;
    }
    this.#write("ui", {
      ...ui,
      pluginsAlphaNoticeDismissed: true,
      featureTipsSeenIds: FEATURE_TIPS,
      contextualToursSeenIds: CONTEXTUAL_TOURS,
    });
  }

  useTheme(theme) {
    this.#write("settings", { ...this.#read("settings"), theme });
  }

  close() {
    this.#database.close();
  }

  #revision() {
    const row = this.#database
      .prepare("SELECT value FROM profile_state_meta WHERE key = 'revision'")
      .get();
    if (!row) throw new Error("Orca's profile has no revision yet");
    return Number(row.value);
  }

  #read(domain) {
    const row = this.#database
      .prepare("SELECT payload FROM profile_state_documents WHERE domain = ?")
      .get(domain);
    return row ? JSON.parse(row.payload) : {};
  }

  #write(domain, document) {
    const payload = JSON.stringify(document);
    this.#database
      .prepare(
        `INSERT INTO profile_state_documents
           (domain, payload, domain_version, revision, updated_at, content_hash)
         VALUES (?, ?, 1, ?, ?, ?)
         ON CONFLICT(domain) DO UPDATE SET payload = excluded.payload,
           revision = excluded.revision, updated_at = excluded.updated_at,
           content_hash = excluded.content_hash`,
      )
      .run(
        domain,
        payload,
        this.#revision(),
        Date.now(),
        createHash("sha256").update(payload).digest("hex"),
      );
  }
}
