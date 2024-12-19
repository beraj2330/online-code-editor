import { Editor } from "@monaco-editor/react";
import { useState } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("dark");

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ padding: "10px", background: "#f4f4f4", display: "flex", justifyContent: "space-between" }}>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: "5px" }}>
          <option value="javascript">Javascript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Toggle Theme
        </button>
      </div>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        language={language}
        theme={theme}
        value={code}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
