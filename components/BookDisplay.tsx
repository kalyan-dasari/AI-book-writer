
import React from 'react';
import { type Chapter } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import Loader from './Loader';

interface BookDisplayProps {
  chapters: Chapter[];
  onContinueWriting: () => void;
  isContinuing: boolean;
  error: string | null;
}

const BookDisplay: React.FC<BookDisplayProps> = ({ chapters, onContinueWriting, isContinuing, error }) => {
    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="space-y-12">
                {chapters.map((chapter, index) => (
                    <article key={index} className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-headings:text-amber-200">
                        <h2 className="font-serif !mb-4">{chapter.title}</h2>
                        {chapter.content.split('\n').map((paragraph, pIndex) => (
                            paragraph.trim() && <p key={pIndex}>{paragraph}</p>
                        ))}
                    </article>
                ))}
            </div>

            <div className="mt-12 text-center">
                {error && <p className="text-red-400 mb-4">{error}</p>}
                <button
                    onClick={onContinueWriting}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-700 text-amber-100 font-bold rounded-lg hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                    disabled={isContinuing}
                >
                    {isContinuing ? (
                        <>
                            <Loader />
                            <span>Writing Next Chapter...</span>
                        </>
                    ) : (
                        <>
                            <BookOpenIcon className="h-6 w-6" />
                            <span>Continue Writing</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default BookDisplay;
