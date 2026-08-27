import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Star, CheckCircle2, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RatingModal({ isOpen, onClose, resourceName, onSubmitRating }) {
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (onSubmitRating) {
            onSubmitRating(rating, review);
        }
        toast.success('Trust Score Updated: 94 → 95 pts! 🏆', { duration: 3000 });
        setTimeout(() => {
            setSubmitted(false);
            onClose();
        }, 1500);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Rate Exchange • ${resourceName}`}>
            {submitted ? (
                <div className="py-8 text-center space-y-3">
                    <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-900">Rating Submitted!</h3>
                    <p className="text-xs text-slate-600">Your feedback has been recorded. Trust Score updated to <strong>95/100</strong>.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="text-center space-y-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">How was your exchange experience?</span>
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                                >
                                    <Star size={28} fill={star <= rating ? 'currentColor' : 'none'} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                            Optional Review & Owner Feedback
                        </label>
                        <textarea
                            rows={3}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="e.g. Very smooth exchange! Priya was punctual and the camera was in pristine condition."
                            className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        ></textarea>
                    </div>

                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-900">
                        <Award size={18} className="text-emerald-600 shrink-0" />
                        <span>Submitting a review awards <strong>+1 Trust Score Point</strong> to both members.</span>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="secondary" onClick={onClose}>Skip</Button>
                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                            Submit Rating & Update Trust Score
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
}
