import { Link } from 'react-router-dom';
import { Users, Monitor, MessageSquareHeart } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
            <div className="max-w-4xl w-full mx-auto space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        VHS <span className="text-primary-600">Multispeciality Hospital</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        Digital patient registration, smart queue management, and automated feedback system interfaces.
                    </p>
                </header>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    {/* Registration Card */}
                    <Link to="/register" className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md hover:ring-primary-500 transition-all duration-300">
                        <div className="h-12 w-12 bg-blue-50 text-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Users size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Patient Registration</h3>
                        <p className="text-slate-500 text-sm">
                            Mobile-friendly self-registration via QR code with existing patient detection.
                        </p>
                    </Link>

                    {/* Queue System Card */}
                    <Link to="/queue" className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md hover:ring-primary-500 transition-all duration-300">
                        <div className="h-12 w-12 bg-purple-50 text-secondary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Monitor size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Queue Display</h3>
                        <p className="text-slate-500 text-sm">
                            Smart TV-optimized real-time queue display and token management.
                        </p>
                    </Link>

                    {/* Feedback Card */}
                    <Link to="/feedback" className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md hover:ring-primary-500 transition-all duration-300">
                        <div className="h-12 w-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <MessageSquareHeart size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Patient Feedback</h3>
                        <p className="text-slate-500 text-sm">
                            Smart review collection with Google Business redirect for satisfied patients.
                        </p>
                    </Link>

                    {/* Staff Dashboard Card */}
                    <Link to="/dashboard" className="group rounded-2xl bg-slate-900 p-6 shadow-sm ring-1 ring-slate-800 hover:shadow-md hover:ring-primary-500 transition-all duration-300">
                        <div className="h-12 w-12 bg-white/10 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Users size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Staff Dashboard</h3>
                        <p className="text-slate-400 text-sm">
                            KPI overview and active queue management for doctors and receptionists.
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
