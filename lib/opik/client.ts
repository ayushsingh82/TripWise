// Opik client for trip planning observability (ref: encodehack)
// Set OPIK_API_KEY and install "opik" to enable; otherwise no-op.
let opikClient: { trace: (config: any) => any; flush?: () => Promise<void> } | null = null;
let initialized = false;

const noopTrace = () => ({
  update: () => {},
  end: () => {},
  span: () => ({ update: () => {}, end: () => {} }),
});

function initializeOpik() {
  if (initialized) return opikClient;
  initialized = true;

  const apiKey = process.env.OPIK_API_KEY;
  if (!apiKey) {
    console.warn("OPIK_API_KEY not set. Opik tracing disabled.");
    return null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Opik } = require("opik");
    const projectName = process.env.OPIK_PROJECT_NAME || "tripwise-agent";
    const client = new Opik({ apiKey, projectName });
    opikClient = {
      trace: (config: any) => client.trace(config),
      flush: () => (client.flush ? client.flush() : Promise.resolve()),
    };
    return opikClient;
  } catch (_) {
    return null;
  }
}

export function getOpikClient() {
  return initializeOpik();
}

export const opikClientSafe = {
  trace: (config: any) => {
    const c = getOpikClient();
    if (!c) return noopTrace();
    return c.trace(config);
  },
  flush: async () => {
    const c = getOpikClient();
    if (c?.flush) await c.flush();
  },
};
