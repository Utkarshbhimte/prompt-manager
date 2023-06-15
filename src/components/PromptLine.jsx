import React from "react";
import { Plus, Copy, CopyCheck } from "lucide-react";
import { useEffect, useState } from "react";
import classname from "classnames";

const PromptLine = ({ prompt }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    // copy the prompt to the clipboard
    navigator.clipboard.writeText(prompt.prompt);
    setIsCopied(true);

    // set a timeout to reset the isCopied state
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div
      onClick={handleClick}
      key={prompt.createdAt}
      className={classname(
        "px-4 py-2 rounded-lg group cursor-pointer flex items-center transition-all duration-300",
        !isCopied && "hover:bg-gray-100",
        isCopied && "hover:bg-green-100 bg-green-100"
      )}
    >
      <div className="flex-1">
        <div className="text-md">{prompt.title}</div>
      </div>
      {!isCopied && (
        <Copy className="h-4 w-4 text-gray-400 transition-all duration-300 opacity-0 group-hover:opacity-100" />
      )}
      {!!isCopied && (
        <CopyCheck className="h-4 w-4 text-gray-600 transition-all duration-300" />
      )}
    </div>
  );
};

export default PromptLine;
