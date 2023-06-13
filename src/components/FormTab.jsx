import React from "react";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const FormTab = ({ setCurrTab }) => {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdAt = new Date().toISOString();

    if (!title.length) return;
    if (!prompt.length) return;

    const newEntry = { title, prompt, createdAt };

    chrome.storage.sync.get(["entries"], (result) => {
      let entries = result.entries || [];
      entries.push(newEntry);
      chrome.storage.sync.set({ entries }, function () {
        console.log("Data is stored in Chrome storage");
        setTitle("");
        setPrompt("");
      });
    });

    setCurrTab("home");
  };
  return (
    <div>
      <div
        onClick={() => setCurrTab("home")}
        className="flex items-center justify-between p-4 border-b border-gray-200 mb-2"
      >
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Prompts
          </h2>
        </div>
        <button
          onClick={() => setCurrTab("form")}
          type="button"
          className="rounded-lg  p-1 shadow-sm text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-4">
          <div className="sm:col-span-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="off"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="prompt"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Prompt
            </label>
            <div className="mt-2">
              <textarea
                id="prompt"
                name="prompt"
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about yourself.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 border-t border-gray-200 py-2 px-4">
          <button
            onClick={() => setCurrTab("home")}
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTab;
