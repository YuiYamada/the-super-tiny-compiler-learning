import { CallExpression, Node, Program } from "../types.ts";
import { NODE_TYPE, TOKEN } from "../constants.ts";
import { Token } from "../types.ts";

export const parser = (tokens: Token[]): Program => {
    const ast: Program = {
        type: NODE_TYPE.PROGRAM,
        body: [],
    };

    let current = 0;

    const getToken = () => tokens[current];
    const consumeToken = () => tokens[current++];

    const walk = (): Node => {
        let token = getToken();
        const node: CallExpression = {
            type: NODE_TYPE.CALL_EXPRESSION,
            name: getToken().value,
            params: [],
        };

        if(token.type === TOKEN.NUMBER){
            consumeToken();
            return {
                type: NODE_TYPE.NUMBER_LITERAL,
                value: token.value,
            }
        }
        return node;
    }
    return ast;
}