import {expect, test} from "bun:test";
import {Parser} from "../../../src/compiler/parser/Parser.ts";
import {TokenType} from "../../../src/compiler/lexer/TokenType.ts";
import type {Token} from "../../../src/compiler/lexer/Token.ts";
import type {VariableDeclaration} from "../../../src/compiler/parser/VariableDeclaration.ts";

test("An empty token array, still creates a valid parser", () => {
    const sut = new Parser([]);
    expect(sut).toBeDefined();
});

test("A source code only holding single number, still creates a valid parser", () => {
    const tokens: Token[] = [
        {type: TokenType.Number, value: "42", line: 1, column: 1},
        {type: TokenType.EOF, value: "", line: 1, column: 1}
    ];
    const sut = new Parser(tokens);
    expect(sut).toBeDefined();
});

test("let variable declaration without initialization", () => {
    // let x;

    const tokens: Token[] = [
        {type: TokenType.Let, value: "let", line: 1, column: 1},
        {type: TokenType.Identifier, value: "x", line: 1, column: 1},
        {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
        {type: TokenType.EOF, value: "", line: 1, column: 1}
    ];
    const sut = new Parser(tokens);
    const result = sut.parse();

    expect(result.type).toBe("Program");
    expect(result.body).toHaveLength(1);
    const xVariableDeclaration = result.body[0] as VariableDeclaration;
    expect(xVariableDeclaration.type).toBe("VariableDeclaration"); // variable declaration
    expect(xVariableDeclaration.kind).toBe("let");
    expect(xVariableDeclaration.name).toBe("x");
    expect(xVariableDeclaration.value).toBeUndefined();
});

test("const variable declaration without initialization", () => {
    //const y;

    const tokens: Token[] = [
        {type: TokenType.Const, value: "const", line: 1, column: 1},
        {type: TokenType.Identifier, value: "y", line: 1, column: 1},
        {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
        {type: TokenType.EOF, value: "", line: 1, column: 1}
    ];
    const sut = new Parser(tokens);
    const result = sut.parse();
    expect(result.type).toBe("Program");
    expect(result.body).toHaveLength(1);

    const yVariableDeclaration = result.body[0] as VariableDeclaration;
    expect(yVariableDeclaration.type).toBe("VariableDeclaration");
    expect(yVariableDeclaration.kind).toBe("const");
    expect(yVariableDeclaration.name).toBe("y");
});

// test("should parse let variable declaration with number initialization", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Let, value: "let", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "age", line: 1, column: 1},
//         {type: TokenType.Assign, value: "=", line: 1, column: 1},
//         {type: TokenType.Number, value: "25", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("VariableDeclaration");
//     expect((result.body[0] as any).name).toBe("age");
//     expect((result.body[0] as any).value).toEqual({
//         type: "NumberLiteral",
//         value: 25
//     });
// });

// test("should parse const variable declaration with string initialization", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Const, value: "const", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "name", line: 1, column: 1},
//         {type: TokenType.Assign, value: "=", line: 1, column: 1},
//         {type: TokenType.String, value: "John", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("VariableDeclaration");
//     expect((result.body[0] as any).name).toBe("name");
//     expect((result.body[0] as any).value).toEqual({
//         type: "StringLiteral",
//         value: "John"
//     });
// });

// test("should parse variable declaration with identifier initialization", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Let, value: "let", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "copy", line: 1, column: 1},
//         {type: TokenType.Assign, value: "=", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "original", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("VariableDeclaration");
//     expect((result.body[0] as any).value).toEqual({
//         type: "Identifier",
//         name: "original"
//     });
// });

// test("should throw error when variable name is missing", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Let, value: "let", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//
//     expect(() => parser.parse()).toThrow("Expected Identifier");
// });

// test("should throw error when semicolon is missing", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Let, value: "let", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "x", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//
//     expect(() => parser.parse()).toThrow("Expected Semicolon");
// });

// test("should parse function declaration with no parameters", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Function, value: "function", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "greet", line: 1, column: 1},
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.OpenCurlyBrace, value: "{", line: 1, column: 1},
//         {type: TokenType.CloseCurlyBrace, value: "}", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("FunctionDeclaration");
//     expect((result.body[0] as any).name).toBe("greet");
//     expect((result.body[0] as any).params).toEqual([]);
//     expect((result.body[0] as any).body).toEqual([]);
// });

// test("should parse function declaration with single parameter", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Function, value: "function", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "square", line: 1, column: 1},
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "x", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.OpenCurlyBrace, value: "{", line: 1, column: 1},
//         {type: TokenType.CloseCurlyBrace, value: "}", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("FunctionDeclaration");
//     expect((result.body[0] as any).name).toBe("square");
//     expect((result.body[0] as any).params).toEqual(["x"]);
// });

// test("should parse function declaration with multiple parameters", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Function, value: "function", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "add", line: 1, column: 1},
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "a", line: 1, column: 1},
//         {type: TokenType.Comma, value: ",", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "b", line: 1, column: 1},
//         {type: TokenType.Comma, value: ",", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "c", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.OpenCurlyBrace, value: "{", line: 1, column: 1},
//         {type: TokenType.CloseCurlyBrace, value: "}", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("FunctionDeclaration");
//     expect((result.body[0] as any).name).toBe("add");
//     expect((result.body[0] as any).params).toEqual(["a", "b", "c"]);
// });

// test("should parse function declaration with body statements", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Function, value: "function", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "test", line: 1, column: 1},
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.OpenCurlyBrace, value: "{", line: 1, column: 1},
//         {type: TokenType.Let, value: "let", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "x", line: 1, column: 1},
//         {type: TokenType.Assign, value: "=", line: 1, column: 1},
//         {type: TokenType.Number, value: "5", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.Return, value: "return", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "x", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.CloseCurlyBrace, value: "}", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("FunctionDeclaration");
//     expect((result.body[0] as any).body).toHaveLength(2);
//     expect((result.body[0] as any).body[0].type).toBe("VariableDeclaration");
//     expect((result.body[0] as any).body[1].type).toBe("ReturnStatement");
// });

// test("should throw error when function name is missing", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Function, value: "function", line: 1, column: 1},
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.OpenCurlyBrace, value: "{", line: 1, column: 1},
//         {type: TokenType.CloseCurlyBrace, value: "}", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//
//     expect(() => parser.parse()).toThrow("Expected Identifier");
// });

// test("should parse return statement without value", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Return, value: "return", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("ReturnStatement");
//     expect((result.body[0] as any).value).toBeUndefined();
// });

// test("should parse return statement with number value", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Return, value: "return", line: 1, column: 1},
//         {type: TokenType.Number, value: "42", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("ReturnStatement");
//     expect((result.body[0] as any).value).toEqual({
//         type: "NumberLiteral",
//         value: 42
//     });
// });

// test("should parse return statement with string value", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Return, value: "return", line: 1, column: 1},
//         {type: TokenType.String, value: "hello", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("ReturnStatement");
//     expect((result.body[0] as any).value).toEqual({
//         type: "StringLiteral",
//         value: "hello"
//     });
// });

// test("should parse return statement with identifier value", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Return, value: "return", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "result", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("ReturnStatement");
//     expect((result.body[0] as any).value).toEqual({
//         type: "Identifier",
//         name: "result"
//     });
// });

// test("should parse expression statement with number literal", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "123", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("ExpressionStatement");
//     expect((result.body[0] as any).expression).toEqual({
//         type: "NumberLiteral",
//         value: 123
//     });
// });

// test("should parse expression statement with string literal", () => {
//     const tokens: Token[] = [
//         {type: TokenType.String, value: "test", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("ExpressionStatement");
//     expect((result.body[0] as any).expression).toEqual({
//         type: "StringLiteral",
//         value: "test"
//     });
// });

// test("should parse expression statement with identifier", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Identifier, value: "x", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("ExpressionStatement");
//     expect((result.body[0] as any).expression).toEqual({
//         type: "Identifier",
//         name: "x"
//     });
// });

// test("should parse number literal", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "3.14", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("ExpressionStatement");
//     expect((result.body[0] as any).expression).toEqual({
//         type: "NumberLiteral",
//         value: 3.14
//     });
// });

// test("should parse integer and decimal numbers", () => {
//     const testCases = [
//         ["0", 0],
//         ["42", 42],
//         ["-5", -5],
//         ["3.14159", 3.14159],
//         ["2.5", 2.5]
//     ];
//
//     testCases.forEach(([input, expected]) => {
//         const tokens: Token[] = [
//             {type: TokenType.Number, value: input as string, line: 1, column: 1},
//             {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//             {type: TokenType.EOF, value: "", line: 1, column: 1}
//         ];
//         const parser = new Parser(tokens);
//         const result = parser.parse();
//
//         expect((result.body[0] as any).expression.value).toBe(expected);
//     });
// });

// test("should parse string literal", () => {
//     const tokens: Token[] = [
//         {type: TokenType.String, value: "Hello, World!", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("ExpressionStatement");
//     expect((result.body[0] as any).expression).toEqual({
//         type: "StringLiteral",
//         value: "Hello, World!"
//     });
// });

// test("should parse empty string", () => {
//     const tokens: Token[] = [
//         {type: TokenType.String, value: "", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression.value).toBe("");
// });

// test("should parse identifier", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Identifier, value: "myVariable", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("ExpressionStatement");
//     expect((result.body[0] as any).expression).toEqual({
//         type: "Identifier",
//         name: "myVariable"
//     });
// });

// test("should parse parenthesized expression", () => {
//     const tokens: Token[] = [
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.Number, value: "42", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("ExpressionStatement");
//     expect((result.body[0] as any).expression).toEqual({
//         type: "NumberLiteral",
//         value: 42
//     });
// });

// test("should throw error for unexpected token", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Plus, value: "+", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//
//     expect(() => parser.parse()).toThrow("unexpected token: Plus");
// });

// test("should throw error when closing parenthesis is missing", () => {
//     const tokens: Token[] = [
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.Number, value: "42", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//
//     expect(() => parser.parse()).toThrow("Expected CloseParenthesis");
// });

// test("should parse simple addition", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "5", line: 1, column: 1},
//         {type: TokenType.Plus, value: "+", line: 1, column: 1},
//         {type: TokenType.Number, value: "3", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body[0]!.type).toBe("ExpressionStatement");
//     expect((result.body[0] as any).expression).toEqual({
//         type: "BinaryExpression",
//         operator: "+",
//         left: {type: "NumberLiteral", value: 5},
//         right: {type: "NumberLiteral", value: 3}
//     });
// });

// test("should parse subtraction", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "10", line: 1, column: 1},
//         {type: TokenType.Minus, value: "-", line: 1, column: 1},
//         {type: TokenType.Number, value: "4", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression).toEqual({
//         type: "BinaryExpression",
//         operator: "-",
//         left: {type: "NumberLiteral", value: 10},
//         right: {type: "NumberLiteral", value: 4}
//     });
// });

// test("should parse multiplication", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "6", line: 1, column: 1},
//         {type: TokenType.Multiply, value: "*", line: 1, column: 1},
//         {type: TokenType.Number, value: "7", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression).toEqual({
//         type: "BinaryExpression",
//         operator: "*",
//         left: {type: "NumberLiteral", value: 6},
//         right: {type: "NumberLiteral", value: 7}
//     });
// });

// test("should parse division", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "20", line: 1, column: 1},
//         {type: TokenType.Divide, value: "/", line: 1, column: 1},
//         {type: TokenType.Number, value: "4", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression).toEqual({
//         type: "BinaryExpression",
//         operator: "/",
//         left: {type: "NumberLiteral", value: 20},
//         right: {type: "NumberLiteral", value: 4}
//     });
// });

// test("should parse equality comparison", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "5", line: 1, column: 1},
//         {type: TokenType.Equals, value: "==", line: 1, column: 1},
//         {type: TokenType.Number, value: "5", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression).toEqual({
//         type: "BinaryExpression",
//         operator: "==",
//         left: {type: "NumberLiteral", value: 5},
//         right: {type: "NumberLiteral", value: 5}
//     });
// });

// test("should parse inequality comparison", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Identifier, value: "x", line: 1, column: 1},
//         {type: TokenType.NotEquals, value: "!=", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "y", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression).toEqual({
//         type: "BinaryExpression",
//         operator: "!=",
//         left: {type: "Identifier", name: "x"},
//         right: {type: "Identifier", name: "y"}
//     });
// });

// test("should parse less than comparison", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Identifier, value: "a", line: 1, column: 1},
//         {type: TokenType.LessThan, value: "<", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "b", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression.operator).toBe("<");
// });

// test("should parse greater than comparison", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Identifier, value: "a", line: 1, column: 1},
//         {type: TokenType.GreaterThan, value: ">", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "b", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression.operator).toBe(">");
// });

// test("should parse less than or equal comparison", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Identifier, value: "a", line: 1, column: 1},
//         {type: TokenType.LessThanOrEquals, value: "<=", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "b", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression.operator).toBe("<=");
// });

// test("should parse greater than or equal comparison", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Identifier, value: "a", line: 1, column: 1},
//         {type: TokenType.GreaterThanOrEqual, value: ">=", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "b", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression.operator).toBe(">=");
// });

// test("should respect multiplication precedence over addition", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "2", line: 1, column: 1},
//         {type: TokenType.Plus, value: "+", line: 1, column: 1},
//         {type: TokenType.Number, value: "3", line: 1, column: 1},
//         {type: TokenType.Multiply, value: "*", line: 1, column: 1},
//         {type: TokenType.Number, value: "4", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     const expr = (result.body[0] as any).expression;
//     expect(expr).toEqual({
//         type: "BinaryExpression",
//         operator: "+",
//         left: {type: "NumberLiteral", value: 2},
//         right: {
//             type: "BinaryExpression",
//             operator: "*",
//             left: {type: "NumberLiteral", value: 3},
//             right: {type: "NumberLiteral", value: 4}
//         }
//     });
// });

// test("should respect division precedence over subtraction", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "10", line: 1, column: 1},
//         {type: TokenType.Minus, value: "-", line: 1, column: 1},
//         {type: TokenType.Number, value: "8", line: 1, column: 1},
//         {type: TokenType.Divide, value: "/", line: 1, column: 1},
//         {type: TokenType.Number, value: "2", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     const expr = (result.body[0] as any).expression;
//     expect(expr.operator).toBe("-");
//     expect(expr.left).toEqual({type: "NumberLiteral", value: 10});
//     expect(expr.right.type).toBe("BinaryExpression");
//     expect(expr.right.operator).toBe("/");
// });

// test("should respect comparison precedence over arithmetic", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "5", line: 1, column: 1},
//         {type: TokenType.Plus, value: "+", line: 1, column: 1},
//         {type: TokenType.Number, value: "3", line: 1, column: 1},
//         {type: TokenType.LessThan, value: "<", line: 1, column: 1},
//         {type: TokenType.Number, value: "10", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     const expr = (result.body[0] as any).expression;
//     expect(expr).toEqual({
//         type: "BinaryExpression",
//         operator: "<",
//         left: {
//             type: "BinaryExpression",
//             operator: "+",
//             left: {type: "NumberLiteral", value: 5},
//             right: {type: "NumberLiteral", value: 3}
//         },
//         right: {type: "NumberLiteral", value: 10}
//     });
// });

// test("should respect equality precedence over comparison", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "5", line: 1, column: 1},
//         {type: TokenType.LessThan, value: "<", line: 1, column: 1},
//         {type: TokenType.Number, value: "10", line: 1, column: 1},
//         {type: TokenType.Equals, value: "==", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "condition", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     const expr = (result.body[0] as any).expression;
//     expect(expr).toEqual({
//         type: "BinaryExpression",
//         operator: "==",
//         left: {
//             type: "BinaryExpression",
//             operator: "<",
//             left: {type: "NumberLiteral", value: 5},
//             right: {type: "NumberLiteral", value: 10}
//         },
//         right: {type: "Identifier", name: "condition"}
//     });
// });

// test("should parse complex expression with multiple precedence levels", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "2", line: 1, column: 1},
//         {type: TokenType.Multiply, value: "*", line: 1, column: 1},
//         {type: TokenType.Number, value: "3", line: 1, column: 1},
//         {type: TokenType.Plus, value: "+", line: 1, column: 1},
//         {type: TokenType.Number, value: "4", line: 1, column: 1},
//         {type: TokenType.Divide, value: "/", line: 1, column: 1},
//         {type: TokenType.Number, value: "2", line: 1, column: 1},
//         {type: TokenType.LessThan, value: "<", line: 1, column: 1},
//         {type: TokenType.Number, value: "10", line: 1, column: 1},
//         {type: TokenType.Equals, value: "==", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "result", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     const expr = (result.body[0] as any).expression;
//     expect(expr.type).toBe("BinaryExpression");
//     expect(expr.operator).toBe("==");
//     expect(expr.left.type).toBe("BinaryExpression");
//     expect(expr.left.operator).toBe("<");
//     expect(expr.right.type).toBe("Identifier");
// });

// test("should handle left-associative operators correctly", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "1", line: 1, column: 1},
//         {type: TokenType.Minus, value: "-", line: 1, column: 1},
//         {type: TokenType.Number, value: "2", line: 1, column: 1},
//         {type: TokenType.Minus, value: "-", line: 1, column: 1},
//         {type: TokenType.Number, value: "3", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     const expr = (result.body[0] as any).expression;
//     expect(expr).toEqual({
//         type: "BinaryExpression",
//         operator: "-",
//         left: {
//             type: "BinaryExpression",
//             operator: "-",
//             left: {type: "NumberLiteral", value: 1},
//             right: {type: "NumberLiteral", value: 2}
//         },
//         right: {type: "NumberLiteral", value: 3}
//     });
// });

// test("should override precedence with parentheses", () => {
//     const tokens: Token[] = [
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.Number, value: "2", line: 1, column: 1},
//         {type: TokenType.Plus, value: "+", line: 1, column: 1},
//         {type: TokenType.Number, value: "3", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.Multiply, value: "*", line: 1, column: 1},
//         {type: TokenType.Number, value: "4", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     const expr = (result.body[0] as any).expression;
//     expect(expr).toEqual({
//         type: "BinaryExpression",
//         operator: "*",
//         left: {
//             type: "BinaryExpression",
//             operator: "+",
//             left: {type: "NumberLiteral", value: 2},
//             right: {type: "NumberLiteral", value: 3}
//         },
//         right: {type: "NumberLiteral", value: 4}
//     });
// });

// test("should handle nested parentheses", () => {
//     const tokens: Token[] = [
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.Number, value: "1", line: 1, column: 1},
//         {type: TokenType.Plus, value: "+", line: 1, column: 1},
//         {type: TokenType.Number, value: "2", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.Multiply, value: "*", line: 1, column: 1},
//         {type: TokenType.Number, value: "3", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     const expr = (result.body[0] as any).expression;
//     expect(expr.type).toBe("BinaryExpression");
//     expect(expr.operator).toBe("*");
//     expect(expr.left.type).toBe("BinaryExpression");
//     expect(expr.left.operator).toBe("+");
// });

// test("should parse program with multiple statements", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Let, value: "let", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "x", line: 1, column: 1},
//         {type: TokenType.Assign, value: "=", line: 1, column: 1},
//         {type: TokenType.Number, value: "5", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//
//         {type: TokenType.Let, value: "let", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "y", line: 1, column: 1},
//         {type: TokenType.Assign, value: "=", line: 1, column: 1},
//         {type: TokenType.Number, value: "10", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//
//         {type: TokenType.Identifier, value: "x", line: 1, column: 1},
//         {type: TokenType.Plus, value: "+", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "y", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body).toHaveLength(3);
//     expect(result.body[0]!.type).toBe("VariableDeclaration");
//     expect(result.body[1]!.type).toBe("VariableDeclaration");
//     expect(result.body[2]!.type).toBe("ExpressionStatement");
// });

// test("should parse complete function with variable declarations and return", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Function, value: "function", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "calculateArea", line: 1, column: 1},
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "width", line: 1, column: 1},
//         {type: TokenType.Comma, value: ",", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "height", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.OpenCurlyBrace, value: "{", line: 1, column: 1},
//
//         {type: TokenType.Let, value: "let", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "area", line: 1, column: 1},
//         {type: TokenType.Assign, value: "=", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "width", line: 1, column: 1},
//         {type: TokenType.Multiply, value: "*", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "height", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//
//         {type: TokenType.Return, value: "return", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "area", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//
//         {type: TokenType.CloseCurlyBrace, value: "}", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body).toHaveLength(1);
//     const func = result.body[0] as any;
//     expect(func.type).toBe("FunctionDeclaration");
//     expect(func.name).toBe("calculateArea");
//     expect(func.params).toEqual(["width", "height"]);
//     expect(func.body).toHaveLength(2);
//     expect(func.body[0].type).toBe("VariableDeclaration");
//     expect(func.body[1].type).toBe("ReturnStatement");
// });

// test("should parse nested function calls", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Function, value: "function", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "outer", line: 1, column: 1},
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.OpenCurlyBrace, value: "{", line: 1, column: 1},
//
//         {type: TokenType.Function, value: "function", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "inner", line: 1, column: 1},
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.OpenCurlyBrace, value: "{", line: 1, column: 1},
//
//         {type: TokenType.Return, value: "return", line: 1, column: 1},
//         {type: TokenType.Number, value: "42", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//
//         {type: TokenType.CloseCurlyBrace, value: "}", line: 1, column: 1},
//
//         {type: TokenType.Return, value: "return", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "inner", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//
//         {type: TokenType.CloseCurlyBrace, value: "}", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.body).toHaveLength(1);
//     const outerFunc = result.body[0] as any;
//     expect(outerFunc.type).toBe("FunctionDeclaration");
//     expect(outerFunc.body).toHaveLength(2);
//     expect(outerFunc.body[0].type).toBe("FunctionDeclaration");
//     expect(outerFunc.body[1].type).toBe("ReturnStatement");
// });

// test("should handle empty input", () => {
//     const tokens: Token[] = [
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect(result.type).toBe("Program");
//     expect(result.body).toEqual([]);
// });

// test("should provide detailed error messages with line and column", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Let, value: "let", line: 2, column: 5},
//         {type: TokenType.Multiply, value: "*", line: 2, column: 8},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//
//     expect(() => parser.parse()).toThrow("Expected Identifier, got Multiply at line 2, column 8");
// });

// test("should handle unexpected tokens in expressions", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: "5", line: 1, column: 1},
//         {type: TokenType.OpenCurlyBrace, value: "{", line: 1, column: 1},
//         {type: TokenType.Number, value: "3", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//
//     expect(() => parser.parse()).toThrow();
// });

// test("should handle malformed function declarations", () => {
//     const tokens: Token[] = [
//         {type: TokenType.Function, value: "function", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "test", line: 1, column: 1},
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.Identifier, value: "param", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//
//     expect(() => parser.parse()).toThrow();
// });

// test("should handle very long identifier names", () => {
//     const longName = "a".repeat(1000);
//     const tokens: Token[] = [
//         {type: TokenType.Identifier, value: longName, line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression.name).toBe(longName);
// });

// test("should handle very large numbers", () => {
//     const largeNumber = "999999999999999999999";
//     const tokens: Token[] = [
//         {type: TokenType.Number, value: largeNumber, line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression.value).toBe(parseFloat(largeNumber));
// });

// test("should handle special characters in strings", () => {
//     const specialString = "Hello\nWorld\t!";
//     const tokens: Token[] = [
//         {type: TokenType.String, value: specialString, line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression.value).toBe(specialString);
// });

// test("should handle deeply nested expressions", () => {
//     const tokens: Token[] = [
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.OpenParenthesis, value: "(", line: 1, column: 1},
//         {type: TokenType.Number, value: "1", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.CloseParenthesis, value: ")", line: 1, column: 1},
//         {type: TokenType.Semicolon, value: ";", line: 1, column: 1},
//         {type: TokenType.EOF, value: "", line: 1, column: 1}
//     ];
//     const parser = new Parser(tokens);
//     const result = parser.parse();
//
//     expect((result.body[0] as any).expression).toEqual({
//         type: "NumberLiteral",
//         value: 1
//     });
// });
