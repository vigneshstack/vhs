import { useState, useEffect } from 'react';
import { Stethoscope, Bell, Clock, Users, ArrowRight, AlertTriangle, Info } from 'lucide-react';

export default function Queue() {
    const [currentTime, setCurrentTime] = useState(new Date());

    // Demo queue data
    const currentlyServing = {
        token: 'T-402',
        counter: 'Consultation Rm 3',
        doctor: 'Dr. Ramesh Kumar'
    };

    const nextTokens = [
        { token: 'T-403', status: 'Next', type: 'normal' },
        { token: 'T-404', status: 'Waiting', type: 'normal' },
        { token: 'T-405', status: 'Waiting', type: 'normal' },
        { token: 'E-105', status: 'Priority', type: 'priority' },
    ];

    const missedTokens = ['T-398', 'T-400', 'N-024'];

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-screen bg-slate-900 text-slate-100 flex flex-col overflow-hidden font-sans">

            {/* Header */}
            <header className="h-24 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 lg:px-12 flex-none">
                <div className="flex items-center gap-4">
                    <div className="bg-primary-600 p-3 rounded-2xl">
                        <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">VHS Multispeciality Hospital</h1>
                        <p className="text-primary-400 font-medium text-lg tracking-wide uppercase">Outpatient Department</p>
                    </div>
                </div>

                <div className="flex items-center gap-6 bg-slate-900 px-6 py-3 rounded-2xl border border-slate-800 flex-none shadow-inner">
                    <Clock className="w-6 h-6 text-slate-400" />
                    <div className="text-3xl font-bold font-mono tracking-widest text-slate-200">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </header>

            {/* Main Content Areas */}
            <main className="flex-1 flex flex-col md:flex-row p-6 md:p-8 gap-8 h-[calc(100vh-160px)]">

                {/* Left Side: Currently Serving */}
                <div className="flex-[5] flex flex-col gap-6">
                    <div className="bg-slate-800/40 rounded-[2rem] border border-slate-700/50 flex-1 flex flex-col items-center justify-center p-12 relative overflow-hidden shadow-2xl">
                        {/* Ambient Background Glow */}
                        <div className="absolute inset-0 bg-primary-900/10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50" />
                        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary-600/10 blur-[100px] rounded-full" />

                        <div className="relative z-10 text-center w-full max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-8 py-3 rounded-full uppercase tracking-widest text-lg mb-12 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                <Bell className="w-5 h-5 animate-pulse" />
                                Now Serving
                            </div>

                            <div className="text-[12rem] xl:text-[15rem] font-black leading-none tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] font-mono mb-10">
                                {currentlyServing.token}
                            </div>

                            <div className="flex flex-col gap-6 bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-2xl">
                                <div>
                                    <h2 className="text-5xl font-bold text-primary-400 mb-3 truncate">
                                        {currentlyServing.counter}
                                    </h2>
                                    <p className="text-3xl text-slate-300 font-medium flex items-center justify-center gap-3">
                                        <Users className="w-8 h-8 text-slate-500" />
                                        {currentlyServing.doctor}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Up Next & Missed */}
                <div className="flex-[3] flex flex-col gap-6">

                    {/* Up Next List */}
                    <div className="bg-slate-950/50 rounded-[2rem] border border-slate-800 p-8 flex-[2] flex flex-col overflow-hidden">
                        <h3 className="text-2xl font-bold text-slate-300 mb-6 flex items-center gap-3 tracking-wide uppercase">
                            Up Next
                            <ArrowRight className="w-6 h-6 text-slate-500" />
                        </h3>

                        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                            {nextTokens.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center justify-between px-6 py-5 rounded-2xl ${item.status === 'Next'
                                        ? 'bg-primary-900/40 border border-primary-500/30 shadow-lg shadow-primary-900/20'
                                        : item.type === 'priority'
                                            ? 'bg-amber-900/20 border border-amber-500/20'
                                            : 'bg-slate-800/30 border border-slate-700/50'
                                        }`}
                                >
                                    <div className={`text-5xl xl:text-6xl font-black font-mono tracking-tighter ${item.status === 'Next' ? 'text-white' : item.type === 'priority' ? 'text-amber-400' : 'text-slate-300'}`}>
                                        {item.token}
                                    </div>
                                    <div className={`px-4 py-2 rounded-xl text-md font-bold uppercase tracking-widest ${item.status === 'Next'
                                        ? 'bg-primary-500/20 text-primary-300 border border-primary-500/20'
                                        : item.type === 'priority'
                                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                            : 'text-slate-500'
                                        }`}>
                                        {item.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Missed Tokens Section */}
                    <div className="bg-rose-950/20 rounded-[2rem] border border-rose-900/30 p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-rose-500" />
                            <h3 className="text-xl font-bold text-rose-400 uppercase tracking-wide">
                                Missed Tokens
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-4">
                            {missedTokens.map((token, i) => (
                                <div key={i} className="bg-rose-950/40 border border-rose-800/50 text-rose-300 px-4 py-2 rounded-lg font-mono font-bold text-2xl line-through decoration-rose-500/50">
                                    {token}
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto bg-rose-500/10 rounded-xl p-4 flex items-start gap-3">
                            <Info className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                            <p className="text-rose-200/80 text-sm font-medium leading-relaxed">
                                If your token number is listed above, you have missed your turn. Please report to the <b>Help Desk / Reception</b> immediately to get a new Priority token.
                            </p>
                        </div>
                    </div>

                </div>

            </main>

            {/* Footer Ticker (Industry Standard) */}
            <footer className="h-16 bg-primary-950 border-t border-primary-900 flex items-center overflow-hidden flex-none">
                <div className="bg-primary-600 h-full flex items-center px-6 z-10 font-bold text-white uppercase tracking-wider shrink-0 shadow-lg relative">
                    Announcements
                    {/* CSS Triangle pointing right */}
                    <div className="content-[''] absolute top-0 -right-4 border-[1rem] border-transparent border-l-primary-600 h-full" />
                </div>
                <div className="flex-1 overflow-hidden relative h-full flex items-center">
                    {/* Simple CSS Marquee animation effect */}
                    <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] px-8 text-primary-300 text-lg font-medium tracking-wide flex gap-16">
                        <span>Welcome to VHS Multispeciality Hospital. Please maintain silence in the waiting area.</span>
                        <span>Ensure you have your vital signs checked before proceeding to your designated consultation room.</span>
                        <span>Masks are highly recommended if you are experiencing flu-like symptoms.</span>
                    </div>
                </div>
                <style dangerouslySetInnerHTML={{
                    __html: `
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}} />
            </footer>
        </div>
    );
}
