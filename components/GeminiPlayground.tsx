
import React, { useState } from 'react';
import { generateContent } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

const GeminiPlayground: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [thinkingMode, setThinkingMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) {
            setError('Por favor, introduce una consulta.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult('');

        const response = await generateContent(prompt, thinkingMode);
        
        if (response.startsWith('Error:')) {
            setError(response);
        } else {
            setResult(response);
        }
        setIsLoading(false);
    };

    const ThinkingSpinner = () => (
        <div className="flex items-center space-x-2">
            <motion.div
                className="w-4 h-4 rounded-full border-2 border-t-transparent border-blue-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-blue-300">
                {thinkingMode ? "Pensando profundamente..." : "Generando..."}
            </span>
        </div>
    );
    
    return (
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-black/20 border border-blue-800/50 rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-2 text-blue-300">Prueba Nuestra IA</h3>
            <p className="text-center text-gray-400 mb-6">Experimenta el poder de Gemini. Haz una pregunta compleja.</p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ej: Crea un plan de negocios para una startup que utiliza IA para optimizar la logística en LATAM..."
                    className="w-full h-32 p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
                    disabled={isLoading}
                />
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-3">
                        <label htmlFor="thinking-mode-toggle" className="text-sm font-medium text-gray-300">
                            Modo Pensamiento Profundo (gemini-2.5-pro)
                        </label>
                        <button
                            type="button"
                            onClick={() => setThinkingMode(!thinkingMode)}
                            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${thinkingMode ? 'bg-blue-600' : 'bg-gray-600'}`}
                            id="thinking-mode-toggle"
                            disabled={isLoading}
                        >
                            <span
                                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${thinkingMode ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? <ThinkingSpinner /> : 'Generar'}
                    </button>
                </div>
            </form>
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-md"
                    >
                        {error}
                    </motion.div>
                )}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-md"
                    >
                        <h4 className="font-bold text-lg mb-2 text-blue-400">Resultado:</h4>
                        <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GeminiPlayground;
