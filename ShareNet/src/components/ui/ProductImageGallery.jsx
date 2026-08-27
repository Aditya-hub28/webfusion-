import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export default function ProductImageGallery({ images, title }) {
    const galleryImages = images && images.length === 5 ? images : [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800&auto=format&fit=crop&q=80'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="space-y-3">
            {/* Main Preview Container */}
            <div className="relative group overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 aspect-video sm:h-72">
                <img
                    src={galleryImages[currentIndex]}
                    alt={`${title} - View ${currentIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 cursor-pointer"
                    onClick={() => setLightboxOpen(true)}
                />

                {/* Counter Tag */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-700 shadow-md">
                    {currentIndex + 1} / {galleryImages.length} Photos
                </div>

                {/* Lightbox Expand Button */}
                <button
                    onClick={() => setLightboxOpen(true)}
                    className="absolute top-3 right-3 p-2 bg-slate-950/80 backdrop-blur-md text-white rounded-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Maximize2 size={16} />
                </button>

                {/* Prev/Next Controls */}
                <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-slate-950/80 backdrop-blur-md text-white rounded-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-600"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-950/80 backdrop-blur-md text-white rounded-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-600"
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* 5-Thumbnail Selectors */}
            <div className="grid grid-cols-5 gap-2">
                {galleryImages.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all ${
                            currentIndex === idx ? 'border-emerald-500 scale-95 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                    >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-6 right-6 p-3 text-white bg-slate-800 rounded-full hover:bg-red-600 transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
                        <img
                            src={galleryImages[currentIndex]}
                            alt={`Fullscreen ${currentIndex + 1}`}
                            className="max-h-[75vh] w-auto object-contain rounded-2xl border border-slate-800 shadow-2xl"
                        />
                        <div className="mt-4 text-white text-xs font-mono font-bold">
                            {title} • Photo {currentIndex + 1} of 5
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
