import {TOKEN} from "../constants.ts";
import { Token } from "../types.ts";

export const tokenizer = (input: string): Token[] => {
    let current = 0;
    const tokens: Token[] = [];

    const getChar= (): string  => input[current];
    const consumeChar = (): string  => input[current++];

    while (current < input.length) {

        // 空白を飛ばす
        const WHITESPACE = /(\s|\r\n|\n|\r)/;
        if (WHITESPACE.test(getChar())){ // string.testで正規表現のチェック
            while(WHITESPACE.test(getChar())){
                consumeChar(); // なにこれ 変数に入れていない
            }
            continue;
        }

        // 丸括弧
        if(getChar() === "(" || getChar() === ")"){
            tokens.push({
                type: TOKEN.PAREN,
                value: getChar(),
            });
            current++;
            continue;
        }

        // 数字
        const NUMBERS = /[0-9]/;
        if(NUMBERS.test(getChar())){
            let value = "";
            while(NUMBERS.test(getChar())){ // 繋がった数字を足していっている
                value += consumeChar();
            }

            tokens.push({
                type: TOKEN.NUMBER,
                value // 変数名とkey名が同じだから省略して書けている？
            })
            continue;
        }

        // シングルクオーテーション、ダブルクォーテーション
        const QUOTES = /["']/;
        if(QUOTES.test(getChar())){
            const quote = consumeChar();
            let value = "";

            while(quote !== getChar()){
                value += consumeChar();
            }
            consumeChar();

            tokens.push({
                type: TOKEN.STRING,
                value
            })
            continue;
        }

        // 文字
        const LETTERS = /[a-z_-]/i;
        if(LETTERS.test(getChar())){
            let value = "";

            while(LETTERS.test(getChar())){
                value += consumeChar();
            }

            tokens.push({
                type: TOKEN.NAME,
                value
            })
            continue;
        }

        throw new TypeError("I dont know what this character is: " + getChar());
    }
    return tokens;
};