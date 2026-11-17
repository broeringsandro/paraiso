import { todas } from "./dicionario";

export const es: Record<string, string> = Object.fromEntries(Object.entries(todas).map(([k, v]) => [k, v[1]]));
