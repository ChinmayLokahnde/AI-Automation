import { nodeRegistry } from "../lib/nodeRegistry";
import VariablePicker from "./VariablePicker";
import { useState } from "react";

export default function NodeConfig({node, updateNodeConfig}){
  const [showPicker, setShowPicker] = useState(false);
  const [activeField, setActiveField] = useState("");
  
  if (!node) {
    return (
      <div className="w-80 border-l p-4">
          Select node
      </div>
    );
  }

  const config = node.data.config || {};
  
  const updateField = (field, value) =>{
    updateNodeConfig(node.id, {...config, [field]: value,})
  }

  const insertVariable = (variable) => {
  const value = config[activeField] || "";

  updateField(
    activeField,
    value + variable
  );

  setShowPicker(false);
};

  return (
    <div className="w-80 border-l p-4 bg-white">
      <h2 className="font-bold text-lg mb-4">{node.data.label}</h2>


          {node.data.kind === "webhook" && (
                    <>
                <label className="block mb-2">Webhook URL</label>

                <input
                  readOnly
                  value={node.data.webhookUrl || "Save workflow first"}
                  className="border p-2 w-full mb-3 bg-gray-100"
                />

                <button
                  className="bg-black text-white p-2 rounded w-full"
                  onClick={() =>
                    navigator.clipboard.writeText(node.data.webhookUrl)
                  }
                >
                  Copy URL
                </button>

                <div className="mt-4">
                  <p className="font-semibold mb-2">
                    Example Payload
                  </p>

                  <pre className="bg-gray-100 p-3 rounded text-sm">
            {`{
              "name": "John",
              "email": "john@gmail.com",
              "company": "OpenAI"
            }`}
                  </pre>
                </div>
              </>
            )}

    {node.data.kind === "http" && (
  <>

    <label className="block mb-2">URL</label>

    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1"
        placeholder="https://api.example.com"
        value={config.url || ""}
        onChange={(e) => updateField("url", e.target.value)}
      />

      <button
        type="button"
        className="border px-3 rounded hover:bg-gray-100"
        onClick={() => {
          setActiveField("url");
          setShowPicker(true);
        }}
      >
        +
      </button>
    </div>

    <label className="block mb-2">Method</label>

    <select
      className="border p-2 w-full mb-4"
      value={config.method || "GET"}
      onChange={(e) => updateField("method", e.target.value)}
    >
      <option>GET</option>
      <option>POST</option>
      <option>PUT</option>
      <option>PATCH</option>
      <option>DELETE</option>
    </select>

    <label className="block mb-2 font-semibold">
      Headers
    </label>

    {(config.headers || []).map((header, index) => (
      <div
        key={index}
        className="flex gap-2 mb-2"
      >
        <input
          className="border p-2 w-1/2"
          placeholder="Key"
          value={header.key}
          onChange={(e) => {
            const headers = [...(config.headers || [])];
            headers[index].key = e.target.value;
            updateField("headers", headers);
          }}
        />

        <input
          className="border p-2 w-1/2"
          placeholder="Value"
          value={header.value}
          onChange={(e) => {
            const headers = [...(config.headers || [])];
            headers[index].value = e.target.value;
            updateField("headers", headers);
          }}
        />
      </div>
    ))}

    <button
      className="border rounded px-3 py-1 mb-4 hover:bg-gray-100"
      onClick={() => {
        updateField("headers", [
          ...(config.headers || []),
          {
            key: "",
            value: "",
          },
        ]);
      }}
    >
      + Add Header
    </button>

    {config.method !== "GET" && (
      <>
        <label className="block mb-2">
          JSON Body
        </label>

        <div className="flex gap-2">
          <textarea
            className="border p-2 flex-1"
            rows={7}
            placeholder='{"name":"{{webhook.name}}"}'
            value={config.body || ""}
            onChange={(e) =>
              updateField("body", e.target.value)
            }
          />

          <button
            type="button"
            className="border px-3 rounded h-10"
            onClick={() => {
              setActiveField("body");
              setShowPicker(true);
            }}
          >
            +
          </button>
        </div>
      </>
    )}
  </>
)}

    {node.data.kind === "email" && (
      <>
        <label className="block mb-2">To</label>

        <div className="flex gap-2 mb-4">

          <input
            className="border p-2 flex-1"
            value={config.to || ""}
            onChange={(e)=>updateField("to", e.target.value)}
          />

          <button
            type="button"
            className="border px-3 rounded hover:bg-gray-100"
            onClick={()=>{
              setActiveField("to");
              setShowPicker(true);
            }}
          >
            +
          </button>

        </div>

        <label className="block mb-2">Subject</label>

              <div className="flex gap-2 mb-4">

              <input
                className="border p-2 flex-1"
                value={config.subject || ""}
                onChange={(e)=>updateField("subject",e.target.value)}
              />

              <button
                type="button"
                className="border px-3 rounded hover:bg-gray-100"
                onClick={()=>{
                    setActiveField("subject");
                    setShowPicker(true);
                }}
              >
              +
              </button>
            </div>

        <div className="flex gap-2">

          <textarea
              className="border p-2 flex-1"
              rows={5}
              value={config.body || ""}
              onChange={(e)=>updateField("body",e.target.value)}
          />

          <button
          type="button"
          className="border px-3 rounded h-10"
          onClick={()=>{
              setActiveField("body");
              setShowPicker(true);
          }}
          >
          +
          </button>

          </div>
      </>
    )}

    {node.data.kind === "openAi" && (
      <>
        <label className="block mb-2">Prompt</label>

          <div className="flex gap-2 mb-4">
            <textarea
              className="border p-2 flex-1"
              rows={5}
              value={config.prompt || ""}
              onChange={(e) =>
                updateField("prompt", e.target.value)
              }
            />

            <button
              type="button"
              className="border px-3 rounded h-10 hover:bg-gray-100"
              onClick={() => {
                setActiveField("prompt");
                setShowPicker(true);
              }}
            >
              +
            </button>
          </div>

        <label className="block mb-2">
          Model
        </label>

        <select
          className="border p-2 w-full"
          value={config.model || "openai/gpt-oss-20b"}
          onChange={(e) =>
            updateField("model", e.target.value)
          }
        >
          <option value="openai/gpt-oss-20b">
            GPT-OSS 20B (Groq)
          </option>

          <option value="llama-3.3-70b-versatile">
            Llama 3.3 70B
          </option>

          <option value="gemini-2.5-flash-lite">
            Gemini Flash Lite
          </option>
        </select>
      </>
    )}

    {node.data.kind === "if" && (
  <>
    <label className="block mb-2">Field</label>

    <div className="flex gap-2 mb-4">

      <input
        className="border p-2 flex-1"
        placeholder="{{webhook.amount}}"
        value={config.field || ""}
        onChange={(e) =>
          updateField("field", e.target.value)
        }
      />

      <button
        type="button"
        className="border px-3 rounded hover:bg-gray-100"
        onClick={() => {
          setActiveField("field");
          setShowPicker(true);
        }}
      >
        +
      </button>

    </div>

    <label className="block mb-2">
      Operator
    </label>

    <select
      className="border p-2 w-full mb-4"
      value={config.operator || "=="}
      onChange={(e) =>
        updateField(
          "operator",
          e.target.value
        )
      }
    >
      <option value="==">Equals</option>
      <option value="!=">Not Equals</option>
      <option value=">">Greater Than</option>
      <option value="<">Less Than</option>
      <option value="contains">Contains</option>
      <option value="startsWith">Starts With</option>
      <option value="endsWith">Ends With</option>
      <option value="exists">Exists</option>
      <option value="empty">Is Empty</option>
    </select>

    <label className="block mb-2">
      Compare Value
    </label>

    <input
      className="border p-2 w-full"
      placeholder="1000"
      value={config.value || ""}
      onChange={(e) =>
        updateField("value", e.target.value)
      }
    />
  </>
)}

    {node.data.kind === "schedule" && (
      <>
        <label className="block mb-2">
          Cron Expression
        </label>

        <input
          className="border p-2 w-full"
          placeholder="0 * * * *"
          value={config.cron || ""}
          onChange={(e) =>
            updateField("cron", e.target.value)
          }
        />
      </>
    )}
          {showPicker && (
            <VariablePicker
              onSelect={insertVariable}
            />
          )}
    </div>
  )
}