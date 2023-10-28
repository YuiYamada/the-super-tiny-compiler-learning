import { compiler } from "./mod.ts";
import { Token } from "./types.ts";

const convertedChar: Token[]  = compiler("(add 2 (subtract 4 2))");
console.log(convertedChar);
