
import React from 'react';
import { WriteIcon } from './icons/WriteIcon';

interface HeaderProps {
    onNewBook: () => void;
    showNewBookButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNewBook, showNewBookButton }) => {
    return (
        <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700">
            <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <WriteIcon className="h-8 w-8 text-amber-400" />
                    <h1 className="text-2xl font-bold text-amber-100 tracking-tight">AI Book Writer</h1>
                </div>
                {showNewBookButton && (
                    <button
                        onClick={onNewBook}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors duration-200 text-sm font-semibold"
                    >
                        Start New Book
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
