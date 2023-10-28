import {NODE_TYPE, TOKEN} from "./constants";

export type Token = {
    type: typeof TOKEN[keyof typeof TOKEN];
    value: string;
}

export type Node = NumberLiteral | StringLiteral | CallExpression | Program;

export type NumberLiteral = {
    type: typeof NODE_TYPE.NUMBER_LITERAL;
    value: string;
}

export type StringLiteral = {
    type: typeof NODE_TYPE.STRING_LITERAL;
    value: string;
}

export type CallExpression = {
    type: typeof NODE_TYPE.CALL_EXPRESSION;
    name: string;
    params: Node[];
}

export type Program = {
    type: typeof NODE_TYPE.PROGRAM;
    body: Node[];
}

export type NewNode = 
    NumberLiteral | StringLiteral | CallExpressionWithCallee | NewProgram 
    | ExpressionStatement | Identifier;

export type Identifier = {
    type: typeof NODE_TYPE.IDENTIFIER;
    name: string;
}

export type CallExpressionWithCallee = {
    type: typeof NODE_TYPE.CALL_EXPRESSION;
    callee: Identifier;
    arguments: NewNode[];
}

export type NewProgram = {
    type: typeof NODE_TYPE.PROGRAM;
    body: NewNode[];
}

export type ExpressionStatement = {
    type: typeof NODE_TYPE.EXPRESSON_STATEMENT;
    expression: CallExpressionWithCallee;
}

export type WithContext<T> = T & {
    __context: NewNode[];
}

export type Visitor = {
    [NODE_TYPE.PROGRAM]?: {
        enter?: (node: Program, parent: Node) => void;
        exit?: (node: Program, parent: Node) => void;
    };
    [NODE_TYPE.CALL_EXPRESSION]?: {
        enter?: (node: CallExpression, parent?: Node) => void;
        exit?: (node: CallExpression, parent?: Node) => void;
    };
    [NODE_TYPE.NUMBER_LITERAL]?: {
        enter?: (node: NumberLiteral, parent?: Node) => void;
        exit?: (node: NumberLiteral, parent?: Node) => void;       
    };
    [NODE_TYPE.STRING_LITERAL]?: {
        enter?: (node: StringLiteral, parent?: Node) => void;
        exit?: (node: StringLiteral, parent?: Node) => void;       
    };
}


