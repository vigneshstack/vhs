import { useState } from 'react';
import { Star, MessageSquare, Send, ThumbsUp, MapPin, Check } from 'lucide-react';
import clsx from 'clsx';

const POSITIVE_TAGS = ['Quick Service', 'Friendly Staff', 'Clean Environment', 'Great Doctor'];
const NEGATIVE_TAGS = ['High Wait Time', 'Staff Behavior', 'Cleanliness', 'Doctor Consultation'];

export default function Feedback() {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const isPositive = rating >= 4;
    const isNegative = rating > 0 && rating <= 3;
    const currentTags = isPositive ? POSITIVE_TAGS : NEGATIVE_TAGS;

    const handleTagToggle = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        setSelectedTags([]); // Reset tags when rating category changes
        setFeedback('');
    };

    const handleSubmitInternal = (e) => {
        e.preventDefault();
        // Simulate sending internal feedback (tags + text)
        setSubmitted(true);
    };

    const handleGoogleRedirect = () => {
        // In a real app, this would be the hospital's Google Maps Review link
        window.open('https://maps.google.com', '_blank');
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-[24px] shadow-xl p-8 text-center ring-1 ring-slate-100 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full mx-auto flex items-center justify-center mb-6 ring-8 ring-emerald-50">
                        <ThumbsUp size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h2>
                    <p className="text-slate-500 mb-8">
                        Your feedback helps us continuously improve our services. We appreciate your time.
                    </p>

                    {isPositive && (
                        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                            <MapPin size={32} className="text-blue-500 mb-3" />
                            <h3 className="font-bold text-slate-900 mb-2">Help others find us!</h3>
                            <p className="text-sm text-slate-600 mb-6">
                                Would you mind sharing your 5-star experience on Google? It takes less than a minute.
                            </p>
                            <button
                                onClick={handleGoogleRedirect}
                                className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                            >
                                Post on Google
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative scroll-smooth">

            {/* Decorative background */}
            <div className="absolute top-0 inset-x-0 h-[250px] bg-gradient-to-br from-indigo-500 to-purple-700 -z-10 rounded-b-[40px] shadow-lg" />

            <div className="w-full max-w-md">

                {/* Header content */}
                <div className="text-center mb-8 text-white">
                    <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full backdrop-blur-sm mb-4 ring-1 ring-white/20">
                        <MessageSquare size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Patient Feedback</h1>
                    <p className="text-indigo-100 font-medium">VHS Multispeciality Hospital</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-1 ring-slate-100 overflow-hidden">

                    <div className="p-6 sm:p-8 border-b border-slate-100">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Rate your recent visit</h2>
                            <p className="text-slate-500 text-sm">How satisfied were you with our service and care today?</p>
                        </div>

                        {/* Star Rating */}
                        <div className="flex justify-center gap-1 sm:gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => handleRatingChange(star)}
                                    className="focus:outline-none transition-transform active:scale-90 p-1"
                                >
                                    <Star
                                        size={44}
                                        className={clsx(
                                            "transition-all duration-300 cursor-pointer",
                                            (hoveredRating || rating) >= star
                                                ? "fill-amber-400 text-amber-400 drop-shadow-md scale-110"
                                                : "fill-transparent text-slate-200 hover:text-amber-200"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative transition-all duration-500 bg-slate-50">
                        {rating === 0 && (
                            <div className="h-[200px] flex items-center justify-center text-slate-400 text-sm font-medium animate-pulse">
                                Select a star rating to continue
                            </div>
                        )}

                        {rating > 0 && (
                            <form onSubmit={handleSubmitInternal} className="p-6 sm:p-8 animate-in slide-in-from-bottom-8 fade-in duration-500 flex flex-col">

                                {/* Dynamic Header based on rating */}
                                <div className="mb-6">
                                    {isPositive ? (
                                        <div className="text-emerald-700 bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100 font-medium text-sm flex items-start gap-3">
                                            <ThumbsUp className="shrink-0 text-emerald-500 mt-0.5" size={18} />
                                            We're so glad you had a great experience! What did you like the most?
                                        </div>
                                    ) : (
                                        <div className="text-amber-800 bg-amber-50 px-4 py-3 rounded-xl border border-amber-100 font-medium text-sm flex items-start gap-3">
                                            <MessageSquare className="shrink-0 text-amber-500 mt-0.5" size={18} />
                                            We apologize that we didn't meet your expectations. What can we improve?
                                        </div>
                                    )}
                                </div>

                                {/* Quick Tags */}
                                <div className="mb-6">
                                    <p className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Quick Feedback</p>
                                    <div className="flex flex-wrap gap-2">
                                        {currentTags.map(tag => {
                                            const isSelected = selectedTags.includes(tag);
                                            return (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => handleTagToggle(tag)}
                                                    className={clsx(
                                                        "px-4 py-2 rounded-full text-sm font-medium border transition-all active:scale-95 flex items-center gap-1.5",
                                                        isSelected
                                                            ? (isPositive ? 'bg-emerald-100 border-emerald-300 text-emerald-800 shadow-sm' : 'bg-rose-100 border-rose-300 text-rose-800 shadow-sm')
                                                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                                    )}
                                                >
                                                    {isSelected && <Check size={14} className={isPositive ? "text-emerald-600" : "text-rose-600"} />}
                                                    {tag}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Comment Textarea (Prominent) */}
                                <div className="mb-6 group">
                                    <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider flex justify-between">
                                        Additional Comments
                                        <span className="text-slate-400 font-normal text-xs normal-case">{isPositive ? '(Optional)' : '(Required)'}</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder={isPositive ? "Tell us more about your visit..." : "Please describe what went wrong..."}
                                            required={isNegative}
                                            rows={4}
                                            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-slate-400 resize-none font-medium text-slate-900 group-focus-within:shadow-md"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isNegative && feedback.trim() === '' && selectedTags.length === 0}
                                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] text-lg mt-auto"
                                >
                                    <Send size={20} />
                                    Submit Feedback
                                </button>
                                <p className="text-center text-xs text-slate-400 mt-4 font-medium">Your feedback is securely transmitted.</p>
                            </form>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}
