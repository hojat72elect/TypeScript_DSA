import type {TokenType} from "./TokenType.ts";

interface Token {
    type: TokenType;
    value: string;
    line: number;
    column: number;
}