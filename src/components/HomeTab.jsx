import { Plus } from "lucide-react";
import React, { useState } from "react";
import PromptLine from "./PromptLine";
import { useEffect } from "react";

const HomeTab = ({ setCurrTab }) => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    try {
      chrome.storage.sync.get(["entries"], (result) => {
        let entries = result.entries || [];
        setPrompts(entries);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 mb-2 sticky top-0 bg-white">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Prompts
          </h2>
        </div>
        <button
          onClick={() => setCurrTab("form")}
          type="button"
          className="rounded-lg bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <Plus className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div style={{ minHeight: 300 }}>
        {prompts.map((prompt) => (
          <PromptLine prompt={prompt} />
        ))}
      </div>
    </div>
  );
};

export default HomeTab;
