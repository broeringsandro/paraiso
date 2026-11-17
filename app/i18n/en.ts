import { todas } from "./dicionario";

export const en: Record<string, string> = Object.fromEntries(Object.entries(todas).map(([k, v]) => [k, v[0]]));
