
import React, { useState } from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';
import Loader from './Loader';

interface BookPromptProps {
  onStartWriting: (prompt: string) => void;
  isLoading: boolean;
}

const BookPrompt: React.FC<BookPromptProps> = ({ onStartWriting, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onStartWriting(prompt.trim());
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4 tracking-tight">Let's Write a Book</h2>
            <p className="text-lg text-slate-400 mb-8">
                Describe your story idea. What's the genre? Who are the main characters? What's the basic plot?
                The more detail you give, the better your first chapter will be.
            </p>
            <form onSubmit={handleSubmit} className="w-full">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A sci-fi noir about a detective on Mars solving the mystery of a missing android..."
                    className="w-full h-40 p-4 bg-slate-800 border-2 border-slate-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200 text-slate-200 placeholder-slate-500"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="mt-6 w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                    disabled={isLoading || !prompt.trim()}
                >
                    {isLoading ? (
                        <>
                            <Loader />
                            <span>Conjuring Chapter...</span>
                        </>
                    ) : (
                        <>
                            <MagicWandIcon className="h-6 w-6" />
                            <span>Start Writing</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    </div>
  );
};

export default BookPrompt;
