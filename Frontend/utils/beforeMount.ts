const darkColors = {
  primary: "#7C3AED", // Violet-600
  primaryHover: "#6D28D9", // Violet-700
  accent: "#8B5CF6", // Violet-500
  background: "#0F0F0F", // Near black
  cardBg: "#1A1A1A", // Dark gray
  cardBgSecondary: "#212121", // Slightly lighter dark gray
  borderColor: "#2D2D2D", // Medium gray
  accentBorder: "#7C3AED", // Violet-600
  textPrimary: "#F9FAFB", // Gray-50
  textSecondary: "#E5E7EB", // Gray-200
  textMuted: "#9CA3AF", // Gray-400
  textAccent: "#A78BFA", // Violet-400
};

const lightColors = {
  primary: "#7C3AED", // Keep violet as primary
  primaryHover: "#6D28D9", // Violet-700
  accent: "#111111", // Black accent
  background: "#F2E8FF", // Warmer pastel violet background
  cardBg: "#FAF3FF", // Warmer, lighter pastel violet for cards
  cardBgSecondary: "#EBE0FF", // Warmer secondary violet
  borderColor: "#D8CAF0", // Warmer violet border
  accentBorder: "#111111", // Black accent border
  textPrimary: "#2D2235", // Warm dark violet, almost black
  textSecondary: "#4A3960", // Warmer dark violet for secondary text
  textMuted: "#786A92", // Warmer medium violet for muted text
  textAccent: "#111111", // Black accent text
};

const beforeMount = (monaco: any) => {
  // Register Solidity language if not already registered
  if (
    !monaco.languages.getLanguages().some((lang: any) => lang.id === "solidity")
  ) {
    monaco.languages.register({ id: "solidity" });

    // Basic Solidity syntax highlighting
    monaco.languages.setMonarchTokensProvider("solidity", {
      keywords: [
        "pragma",
        "solidity",
        "contract",
        "interface",
        "library",
        "is",
        "public",
        "private",
        "internal",
        "external",
        "view",
        "pure",
        "payable",
        "constant",
        "immutable",
        "constructor",
        "function",
        "modifier",
        "event",
        "struct",
        "enum",
        "mapping",
        "if",
        "else",
        "for",
        "while",
        "do",
        "break",
        "continue",
        "return",
        "emit",
        "uint",
        "uint256",
        "int",
        "int256",
        "bool",
        "address",
        "string",
        "bytes",
        "memory",
        "storage",
        "calldata",
        "delete",
        "new",
        "require",
        "revert",
        "assert",
        "this",
        "super",
        "selfdestruct",
      ],

      operators: [
        "=",
        ">",
        "<",
        "!",
        "~",
        "?",
        ":",
        "==",
        "<=",
        ">=",
        "!=",
        "&&",
        "||",
        "++",
        "--",
        "+",
        "-",
        "*",
        "/",
        "&",
        "|",
        "^",
        "%",
        "<<",
        ">>",
        ">>>",
        "+=",
        "-=",
        "*=",
        "/=",
        "&=",
        "|=",
        "^=",
        "%=",
        "<<=",
        ">>=",
        ">>>=",
      ],

      symbols: /[=><!~?:&|+\-*\/\^%]+/,

      tokenizer: {
        root: [
          [
            /[a-z_$][\w$]*/,
            {
              cases: {
                "@keywords": "keyword",
                "@default": "identifier",
              },
            },
          ],
          [/[A-Z][\w\$]*/, "type.identifier"],
          { include: "@whitespace" },
          [/[{}()\[\]]/, "@brackets"],
          [/[<>](?!@symbols)/, "@brackets"],
          [
            /@symbols/,
            {
              cases: {
                "@operators": "operator",
                "@default": "",
              },
            },
          ],
          [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
          [/0[xX][0-9a-fA-F]+/, "number.hex"],
          [/\d+/, "number"],
          [/[;,.]/, "delimiter"],
          [/"([^"\\]|\\.)*$/, "string.invalid"],
          [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],
        ],

        string: [
          [/[^\\"]+/, "string"],
          [/\\./, "string.escape"],
          [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
        ],

        whitespace: [
          [/[ \t\r\n]+/, "white"],
          [/\/\*/, "comment", "@comment"],
          [/\/\/.*$/, "comment"],
        ],

        comment: [
          [/[^\/*]+/, "comment"],
          [/\*\//, "comment", "@pop"],
          [/[\/*]/, "comment"],
        ],
      },
    });

    // Set Solidity editor theme for dark mode
    monaco.editor.defineTheme("solidityDarkTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "A78BFA" },
        { token: "string", foreground: "65B741" },
        { token: "number", foreground: "61DAFB" },
        { token: "comment", foreground: "6B7280" },
        { token: "type.identifier", foreground: "38BDF8" },
      ],
      colors: {
        "editor.background": darkColors.cardBg,
        "editor.foreground": "#F9FAFB",
        "editorCursor.foreground": "#F9FAFB",
        "editor.lineHighlightBackground": "#2D2D2D40",
        "editorLineNumber.foreground": "#6B7280",
        "editor.selectionBackground": "#7C3AED40",
        "editor.inactiveSelectionBackground": "#6D28D940",
      },
    });

    // Set Solidity editor theme for light mode
    monaco.editor.defineTheme("solidityLightTheme", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "7C3AED" },
        { token: "string", foreground: "8B5CF6" },
        { token: "number", foreground: "6D28D9" },
        { token: "comment", foreground: "786A92" },
        { token: "type.identifier", foreground: "9F67FF" },
      ],
      colors: {
        "editor.background": lightColors.cardBg,
        "editor.foreground": "#2D2235",
        "editorCursor.foreground": "#2D2235",
        "editor.lineHighlightBackground": "#EBE0FF",
        "editorLineNumber.foreground": "#786A92",
        "editor.selectionBackground": "#C4B5FC40",
        "editor.inactiveSelectionBackground": "#C4B5FC30",
      },
    });
  }
};

export default { beforeMount, darkColors, lightColors };
