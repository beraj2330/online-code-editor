import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("light");
  const [output, setOutput] = useState("");

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const runCode = async () => {
    try {
        const response = await axios.post("http://localhost:3000/execute", {
            language,
            code,
        });
        
        setOutput(response.data.output || response.data.error);
    } catch (error) {
        setOutput("Error executing code.")
    }
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ padding: "10px", background: "#f4f4f4", display: "flex", justifyContent: "space-between" }}>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: "5px" }}>
          <option value="javascript">Javascript</option>
          <option value="python">Python</option>
        </select>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Toggle Theme
        </button>
        <button onClick={runCode} style={{ padding: "5px 10px" }}>
            Run Code
        </button>
      </div>
      <Editor
        height="70%"
        defaultLanguage="javascript"
        language={language}
        theme={theme}
        value={code}
        onChange={handleEditorChange}
      />
      <div style={{ padding: "10px", background: "#000", color: "#0f0", height: "30%", overflow: "auto" }}>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
