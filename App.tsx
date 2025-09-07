
import React, { useState, useCallback } from 'react';
import { type Chat } from '@google/genai';
import { type Chapter } from './types';
import { startBook, continueBook } from './services/geminiService';
import BookPrompt from './components/BookPrompt';
import BookDisplay from './components/BookDisplay';
import Header from './components/Header';

const App: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isContinuing, setIsContinuing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const handleStartWriting = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { chat: newChat, firstChapter } = await startBook(prompt);
      setChat(newChat);
      setChapters([firstChapter]);
      setIsStarted(true);
    } catch (e) {
      console.error(e);
      setError('Failed to start the book. Please check your prompt and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleContinueWriting = useCallback(async () => {
    if (!chat) {
      setError('Chat session not found. Please start a new book.');
      return;
    }
    setIsContinuing(true);
    setError(null);
    try {
      const nextChapter = await continueBook(chat);
      setChapters(prev => [...prev, nextChapter]);
    } catch (e) {
      console.error(e);
      setError('Failed to generate the next chapter. Please try again.');
    } finally {
      setIsContinuing(false);
    }
  }, [chat]);

  const handleReset = () => {
    setChapters([]);
    setChat(null);
    setIsStarted(false);
    setError(null);
    setIsLoading(false);
    setIsContinuing(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 flex flex-col">
      <Header onNewBook={handleReset} showNewBookButton={isStarted} />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col">
        {!isStarted ? (
          <BookPrompt onStartWriting={handleStartWriting} isLoading={isLoading} />
        ) : (
          <BookDisplay
            chapters={chapters}
            onContinueWriting={handleContinueWriting}
            isContinuing={isContinuing}
            error={error}
          />
        )}
      </main>
    </div>
  );
};

export default App;
