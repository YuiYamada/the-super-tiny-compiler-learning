import { tokenizer } from "./modules/tokenizer.ts";
import { Token } from "./types.ts";

export const compiler = (code: string): Token[] => {
    const tokens = tokenizer(code);
    return tokens;
}