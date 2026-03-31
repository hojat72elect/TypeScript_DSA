import {useState} from 'react'
import {Lexer} from "./compiler/lexer/Lexer.ts";
import {Parser} from "./compiler/parser/Parser.ts";

export function App() {
    const [text, setText] = useState("");
    const [tokenizeHovered, setTokenizeHovered] = useState(false);
    const [parseHovered, setParseHovered] = useState(false);

    const onTextChanged = (event: any) => {
        // Update the text state
        setText(event.target.value);
    };

    return (
        <>
            <section className="input-section">

                <textarea
                    id="user-input"
                    value={text}
                    onChange={onTextChanged}
                    placeholder="Type something..."
                    className="text-input"
                    style={{
                        width: '100%',
                        maxWidth: '500px',
                        height: '400px',
                        padding: '8px 8px',
                        borderRadius: '12px',
                        border: '2px solid #e0e0e0',
                        fontSize: '18px',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        fontFamily: 'inherit',
                        textAlign: "start",
                        resize: 'none'
                    }}
                />

            </section>

            <button
                style={{
                    padding: '14px 32px',
                    margin: '8px 12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: tokenizeHovered ? '#7c4dff' : '#6200ee',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: tokenizeHovered ? '0 6px 16px rgba(98, 0, 238, 0.4)' : '0 4px 12px rgba(98, 0, 238, 0.3)',
                    fontFamily: 'inherit',
                    transform: tokenizeHovered ? 'translateY(-2px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setTokenizeHovered(true)}
                onMouseLeave={() => setTokenizeHovered(false)}
                onClick={() => {
                    const lexer = new Lexer(text);
                    const tokens = lexer.tokenize();

                    for (const token of tokens) {
                        console.log(`{type: ${token.type}, value: ${token.value}, line: ${token.line}, column: ${token.column}}`);
                    }


                }}
            >
                Tokenize
            </button>

            <button
                style={{
                    padding: '14px 32px',
                    margin: '8px 12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: parseHovered ? '#18ffff' : '#03dac6',
                    color: '#000',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: parseHovered ? '0 6px 16px rgba(3, 218, 198, 0.4)' : '0 4px 12px rgba(3, 218, 198, 0.3)',
                    fontFamily: 'inherit',
                    transform: parseHovered ? 'translateY(-2px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setParseHovered(true)}
                onMouseLeave={() => setParseHovered(false)}
                onClick={() => {
                    const lexer = new Lexer(text);
                    const tokens = lexer.tokenize();
                    const parser = new Parser(tokens);
                    const program = parser.parse();
                    console.log(program.toString());

                }}
            >
                Parse
            </button>
        </>
    )
}


