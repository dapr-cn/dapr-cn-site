// The node network behind the home hero ("signal field"). The same seeded layout draws the static
// SVG poster on the server and seeds the WebGL field in the browser, so the first live frame
// matches the poster and nothing jumps when the canvas fades in.

export interface SignalNode {
  x: number;
  y: number;
  /** 0 to 1. Nodes near the left edge are quieter so the headline stays readable over the field. */
  weight: number;
}

export interface SignalEdge {
  a: number;
  b: number;
}

export interface SignalLayout {
  width: number;
  height: number;
  nodes: SignalNode[];
  edges: SignalEdge[];
}

/** Small seeded generator (mulberry32): the same seed always gives the same layout. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smoothstep = (lo: number, hi: number, v: number): number => {
  const t = Math.min(1, Math.max(0, (v - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
};

/**
 * Lays `count` nodes on a jittered grid in a space that is `aspect * 100` wide and 100 tall, and
 * links each node to its nearest neighbours. The space is 100 tall at any aspect so the browser
 * can scale it to the canvas with one factor.
 */
export function signalLayout(count: number, seed: number, aspect: number): SignalLayout {
  const random = seededRandom(seed);
  const width = Math.round(aspect * 100);
  const height = 100;
  const cols = Math.max(2, Math.round(Math.sqrt(count * aspect)));
  const rows = Math.max(2, Math.ceil(count / cols));
  const cellW = width / cols;
  const cellH = height / rows;

  const nodes: SignalNode[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (nodes.length >= count) break;
      const x = (col + 0.5 + (random() - 0.5) * 0.76) * cellW;
      const y = (row + 0.5 + (random() - 0.5) * 0.76) * cellH;
      nodes.push({ x, y, weight: 0.25 + 0.75 * smoothstep(0.12, 0.55, x / width) });
    }
  }

  const reach = Math.hypot(cellW, cellH) * 1.15;
  const seen = new Set<string>();
  const edges: SignalEdge[] = [];
  nodes.forEach((node, a) => {
    const near = nodes
      .map((other, b) => ({ b, d: Math.hypot(node.x - other.x, node.y - other.y) }))
      .filter(({ b, d }) => b !== a && d <= reach)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3);
    for (const { b } of near) {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ a, b });
    }
  });

  return { width, height, nodes, edges };
}
