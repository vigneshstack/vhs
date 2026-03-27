import { useState } from 'react';
import { User, Phone, Calendar, Mail, CheckCircle2, AlertCircle, ChevronRight, UserPlus, FileText, KeyRound, Building2 } from 'lucide-react';

// Mock Data for Categories and Doctors
const departments = [
    { id: 'cardio', name: 'Cardiology' },
    { id: 'ortho', name: 'Orthopedics' },
    { id: 'ped', name: 'Pediatrics' },
    { id: 'gp', name: 'General Medicine' }
];

const doctors = {
    cardio: [{ id: 'c1', name: 'Dr. Ramesh Kumar' }, { id: 'c2', name: 'Dr. Meena Iyer' }],
    ortho: [{ id: 'o1', name: 'Dr. Senthil Nathan' }],
    ped: [{ id: 'p1', name: 'Dr. Kavitha Rajan' }, { id: 'p2', name: 'Dr. Karthi Chidambaram' }],
    gp: [{ id: 'g1', name: 'Dr. Anbu Selvan' }, { id: 'g2', name: 'Dr. Priya Dhas' }]
};

export default function Registration() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');

    // Form data state
    const [formData, setFormData] = useState({
        name: '', age: '', gender: '', email: '', category: '', doctor: ''
    });

    // Valid statuses: 'idle', 'checking', 'existing_otp', 'existing_confirmed', 'new_info', 'new_dept', 'success'
    const [status, setStatus] = useState('idle');

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        setStatus('checking');
        setTimeout(() => {
            if (phone === '9999999999') {
                setStatus('existing_otp');
            } else {
                setStatus('new_info');
            }
        }, 1500);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setStatus('checking');
        setTimeout(() => setStatus('existing_confirmed'), 1000);
    };

    const handleNewInfoSubmit = (e) => {
        e.preventDefault();
        setStatus('new_dept');
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        setStatus('success');
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'category') {
            setFormData(prev => ({ ...prev, doctor: '' })); // Reset doctor when category changes
        }
    };

    const resetFlow = () => {
        setStatus('idle');
        setPhone('');
        setOtp('');
        setFormData({ name: '', age: '', gender: '', email: '', category: '', doctor: '' });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-primary-600 to-primary-800 -z-10 rounded-b-[40px] shadow-lg" />

            <div className="w-full max-w-md mt-6">
                <div className="text-center mb-8 text-white space-y-2">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm mb-2 ring-1 ring-white/20">
                        <FileText size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Patient Portal</h1>
                    <p className="text-primary-100 font-medium">Fast & secure self-registration</p>
                </div>

                <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden ring-1 ring-slate-100 relative min-h-[400px]">

                    {/* --- STEP 1: Phone Number --- */}
                    {(status === 'idle' || (status === 'checking' && !otp)) && (
                        <div className="p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <User size={20} className="text-primary-500" /> Let's get started
                            </h2>
                            <form onSubmit={handlePhoneSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Enter Mobile Number</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500">
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-lg font-medium outline-none"
                                            placeholder="e.g. 99999 99999"
                                            required pattern="[0-9]{10}"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-slate-500">We'll check if you are already registered. Try `9999999999` for existing.</p>
                                </div>
                                <button type="submit" disabled={status === 'checking' || phone.length < 10} className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-4 px-4 rounded-xl font-bold text-lg shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100">
                                    {status === 'checking' ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Continue <ChevronRight size={20} /></>}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* --- STEP 2A: Existing Patient OTP --- */}
                    {(status === 'existing_otp' || (status === 'checking' && otp)) && (
                        <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 flex gap-3 mb-6">
                                <KeyRound className="shrink-0 text-emerald-500 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-emerald-900">Verify it's you</h3>
                                    <p className="text-sm mt-1">We sent a 4-digit code to <b>{phone}</b>.</p>
                                </div>
                            </div>
                            <form onSubmit={handleOtpSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2 text-center">Enter OTP</label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="block w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 outline-none text-center text-2xl font-black tracking-widest"
                                        placeholder="••••"
                                        maxLength={4}
                                        required
                                    />
                                </div>
                                <button type="submit" disabled={status === 'checking' || otp.length < 4} className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-4 rounded-xl font-bold text-lg shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100">
                                    {status === 'checking' ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Verify & Proceed'}
                                </button>
                                <div className="pt-4 border-t border-slate-100 text-center">
                                    <p className="text-sm text-slate-500 mb-2">Not Karthik M.?</p>
                                    <button
                                        type="button"
                                        onClick={() => { setStatus('new_info'); setOtp(''); }}
                                        className="text-primary-600 font-bold hover:text-primary-700 text-sm transition-colors"
                                    >
                                        Register as a New Patient
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* --- STEP 3A: Existing Patient Confirmed (Success state 1) --- */}
                    {status === 'existing_confirmed' && (
                        <div className="p-8 text-center animate-in zoom-in-95 duration-500">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full mx-auto flex items-center justify-center mb-6 ring-8 ring-emerald-50">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back, Karthik!</h2>
                            <p className="text-slate-500 mb-8">Successfully verified. Please check the screen for your Token Number.</p>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                                <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">Your Token</p>
                                <div className="text-5xl font-mono font-black text-slate-900">E-105</div>
                            </div>
                            <button onClick={resetFlow} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold transition-all active:scale-[0.98]">
                                Done
                            </button>
                        </div>
                    )}

                    {/* --- STEP 2B: New Patient Personal Info --- */}
                    {status === 'new_info' && (
                        <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <UserPlus size={20} className="text-blue-500" /> New Patient
                                </h2>
                                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md">Step 1 of 2</span>
                            </div>

                            <form onSubmit={handleNewInfoSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                        <User size={14} /> Full Name*
                                    </label>
                                    <input type="text" required value={formData.name} onChange={e => handleInputChange('name', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900" placeholder="Karthik M." />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                            <Calendar size={14} /> Age*
                                        </label>
                                        <input type="number" required value={formData.age} onChange={e => handleInputChange('age', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900" placeholder="Years" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                            <User size={14} /> Gender*
                                        </label>
                                        <select required value={formData.gender} onChange={e => handleInputChange('gender', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 cursor-pointer appearance-none">
                                            <option value="" disabled>Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                                        <Mail size={14} /> Email
                                    </label>
                                    <input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900" placeholder="Optional" />
                                </div>

                                <div className="pt-2 flex gap-3">
                                    <button type="button" onClick={() => setStatus('idle')} className="w-1/3 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all">Back</button>
                                    <button type="submit" className="w-2/3 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-xl font-bold shadow-md transition-all active:scale-[0.98]">
                                        Next <ChevronRight size={18} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* --- STEP 3B: New Patient Department & Doctor --- */}
                    {status === 'new_dept' && (
                        <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <Building2 size={20} className="text-primary-500" /> Department
                                </h2>
                                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md">Step 2 of 2</span>
                            </div>

                            <form onSubmit={handleFinalSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category / Specialty*</label>
                                    <select
                                        required
                                        value={formData.category}
                                        onChange={e => handleInputChange('category', e.target.value)}
                                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 cursor-pointer"
                                    >
                                        <option value="" disabled>Choose a specialty</option>
                                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                    </select>
                                </div>

                                {formData.category && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Select Doctor*</label>
                                        <select
                                            required
                                            value={formData.doctor}
                                            onChange={e => handleInputChange('doctor', e.target.value)}
                                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 cursor-pointer"
                                        >
                                            <option value="" disabled>Choose a doctor</option>
                                            {doctors[formData.category].map(doc => (
                                                <option key={doc.id} value={doc.id}>{doc.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="bg-primary-50 text-primary-800 p-4 rounded-xl text-sm border border-primary-100 flex gap-2">
                                    <AlertCircle size={18} className="shrink-0 text-primary-500" />
                                    <p>Your registration fee will be collected at the counter.</p>
                                </div>

                                <div className="pt-2 flex gap-3">
                                    <button type="button" onClick={() => setStatus('new_info')} className="w-1/3 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all">Back</button>
                                    <button type="submit" disabled={!formData.category || !formData.doctor} className="w-2/3 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold shadow-md transition-all active:scale-[0.98] disabled:opacity-50">
                                        Confirm & Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* --- STEP 4B: New Patient Success (Success state 2) --- */}
                    {status === 'success' && (
                        <div className="p-8 text-center animate-in zoom-in-95 duration-500">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full mx-auto flex items-center justify-center mb-6 ring-8 ring-emerald-50">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Complete!</h2>
                            <p className="text-slate-500 mb-8">Your details are saved successfully.</p>

                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-10"><Building2 size={64} /></div>
                                <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2 relative z-10">Your Token</p>
                                <div className="text-5xl font-mono font-black text-slate-900 relative z-10">N-024</div>
                                {formData.doctor && (
                                    <p className="mt-3 text-sm font-medium text-slate-600 relative z-10">
                                        Please wait for {doctors[formData.category].find(d => d.id === formData.doctor)?.name}
                                    </p>
                                )}
                            </div>
                            <button onClick={resetFlow} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold transition-all active:scale-[0.98]">
                                Done
                            </button>
                        </div>
                    )}

                </div>

                <p className="text-center text-slate-400 text-sm mt-6 font-medium">Secured by VHS Multispeciality Hospital Integrated System</p>
            </div>
        </div>
    );
}
