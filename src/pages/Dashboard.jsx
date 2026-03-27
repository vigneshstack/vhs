import { useState } from 'react';
import { LayoutDashboard, Users, CalendarCheck, Clock, CheckCircle, ChevronRight, UserCircle2 } from 'lucide-react';

// Mock Data
const kpiData = {
    totalBookings: 142,
    completedConsultations: 89,
    avgWaitTime: '24 min',
    doctorsActive: 12
};

const doctorBookings = [
    { id: 'd1', name: 'Dr. Ramesh Kumar', dept: 'Cardiology', total: 24, completed: 18 },
    { id: 'd2', name: 'Dr. Meena Iyer', dept: 'Cardiology', total: 18, completed: 10 },
    { id: 'd3', name: 'Dr. Senthil Nathan', dept: 'Orthopedics', total: 32, completed: 25 },
    { id: 'd4', name: 'Dr. Kavitha Rajan', dept: 'Pediatrics', total: 45, completed: 20 },
];

const initialQueue = [
    { token: 'T-402', patient: 'Karthik M.', doctor: 'Dr. Ramesh Kumar', status: 'In Consultation', time: '10:15 AM' },
    { token: 'T-403', patient: 'Ananya S.', doctor: 'Dr. Ramesh Kumar', status: 'Waiting', time: '10:30 AM' },
    { token: 'E-105', patient: 'Arun Prakash', doctor: 'Dr. Senthil Nathan', status: 'Waiting (Priority)', time: '10:35 AM' },
    { token: 'T-404', patient: 'Divya R.', doctor: 'Dr. Kavitha Rajan', status: 'Waiting', time: '10:45 AM' },
];

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('overview'); // overview, queue
    const [queue, setQueue] = useState(initialQueue);

    const markCompleted = (tokenToComplete) => {
        setQueue(currentQueue => {
            const updatedQueue = currentQueue.map(item => {
                if (item.token === tokenToComplete) {
                    return { ...item, status: 'Completed' };
                }
                return item;
            });

            // Auto-assign next waiting patient for this doctor to "In Consultation"
            const completedItem = updatedQueue.find(i => i.token === tokenToComplete);
            if (completedItem) {
                const nextPatientIndex = updatedQueue.findIndex(i =>
                    i.doctor === completedItem.doctor &&
                    (i.status === 'Waiting' || i.status === 'Waiting (Priority)')
                );

                if (nextPatientIndex !== -1) {
                    updatedQueue[nextPatientIndex].status = 'In Consultation';
                }
            }

            return updatedQueue;
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">

            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex-none flex flex-col">
                <div className="p-6 border-b border-slate-800 flex items-center gap-3 text-white">
                    <div className="bg-primary-600 p-2 rounded-lg">
                        <LayoutDashboard size={24} />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Staff Portal</span>
                </div>

                <nav className="p-4 flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'overview' ? 'bg-primary-600/10 text-primary-400' : 'hover:bg-slate-800 hover:text-white'}`}
                    >
                        <Users size={20} /> KPI Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('queue')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'overview' ? 'hover:bg-slate-800 hover:text-white' : 'bg-primary-600/10 text-primary-400'}`}
                    >
                        <CalendarCheck size={20} /> Active Queue
                    </button>
                </nav>

                <div className="mt-auto p-6 border-t border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                        <UserCircle2 size={24} className="text-slate-400" />
                    </div>
                    <div>
                        <p className="text-white font-medium text-sm">Admin User</p>
                        <p className="text-xs text-slate-500">Receptionist Desk</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 lg:p-10 overflow-auto">

                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 tabular-nums tracking-tight">
                        {activeTab === 'overview' ? "Today's Overview" : "Queue Management"}
                    </h1>
                    <p className="text-slate-500 mt-1">Live data feed from VHS Multispeciality Hospital</p>
                </header>

                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <Users size={24} />
                                </div>
                                <p className="text-slate-500 text-sm font-medium">Total Bookings</p>
                                <p className="text-3xl font-black text-slate-900 mt-1">{kpiData.totalBookings}</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 relative z-10">
                                    <CheckCircle size={24} />
                                </div>
                                <p className="text-slate-500 text-sm font-medium relative z-10">Completed</p>
                                <p className="text-3xl font-black text-slate-900 mt-1 relative z-10">{kpiData.completedConsultations}</p>

                                {/* Progress bar background visual */}
                                <div className="absolute bottom-0 left-0 h-1 bg-emerald-500" style={{ width: `${(kpiData.completedConsultations / kpiData.totalBookings) * 100}%` }} />
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                                    <Clock size={24} />
                                </div>
                                <p className="text-slate-500 text-sm font-medium">Avg Wait Time</p>
                                <p className="text-3xl font-black text-slate-900 mt-1">{kpiData.avgWaitTime}</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                                    <CalendarCheck size={24} />
                                </div>
                                <p className="text-slate-500 text-sm font-medium">Doctors Active</p>
                                <p className="text-3xl font-black text-slate-900 mt-1">{kpiData.doctorsActive}</p>
                            </div>
                        </div>

                        {/* Doctor Breakdown Table */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-slate-900">Bookings by Doctor</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500 text-sm">
                                            <th className="px-6 py-4 font-medium">Doctor Name</th>
                                            <th className="px-6 py-4 font-medium">Department</th>
                                            <th className="px-6 py-4 font-medium">Total Bookings</th>
                                            <th className="px-6 py-4 font-medium">Completed</th>
                                            <th className="px-6 py-4 font-medium">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {doctorBookings.map((doc) => {
                                            const percentage = Math.round((doc.completed / doc.total) * 100);
                                            return (
                                                <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                                                            {doc.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                        </div>
                                                        {doc.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600">
                                                        <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                                                            {doc.dept}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-900 font-medium">{doc.total}</td>
                                                    <td className="px-6 py-4 text-slate-900 font-medium">{doc.completed}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-full bg-slate-100 rounded-full h-2 max-w-[120px]">
                                                                <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                                            </div>
                                                            <span className="text-xs text-slate-500 font-medium w-8">{percentage}%</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'queue' && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Clock className="text-primary-500" size={20} /> Today's Turnstile
                            </h2>
                            <div className="flex gap-2">
                                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live
                                </span>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white text-slate-500 text-sm border-b border-slate-200">
                                        <th className="px-6 py-4 font-medium">Token</th>
                                        <th className="px-6 py-4 font-medium">Patient Name</th>
                                        <th className="px-6 py-4 font-medium">Assigned Doctor</th>
                                        <th className="px-6 py-4 font-medium">Time</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {queue.map((item, idx) => (
                                        <tr key={idx} className={`transition-colors ${item.status === 'Completed' ? 'opacity-50 bg-slate-50' : 'hover:bg-slate-50/50'}`}>
                                            <td className="px-6 py-4 font-bold font-mono text-slate-900">{item.token}</td>
                                            <td className="px-6 py-4 font-medium text-slate-700">{item.patient}</td>
                                            <td className="px-6 py-4 text-slate-600">{item.doctor}</td>
                                            <td className="px-6 py-4 text-slate-500 text-sm">{item.time}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${item.status === 'In Consultation' ? 'bg-blue-100 text-blue-700' :
                                                    item.status === 'Waiting (Priority)' ? 'bg-amber-100 text-amber-700' :
                                                        item.status === 'Completed' ? 'bg-slate-200 text-slate-600' :
                                                            'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {item.status === 'In Consultation' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {item.status === 'In Consultation' ? (
                                                    <button
                                                        onClick={() => markCompleted(item.token)}
                                                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95"
                                                    >
                                                        <CheckCircle size={16} /> Mark Complete
                                                    </button>
                                                ) : (
                                                    <button disabled className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-400 px-4 py-2 rounded-lg text-sm font-bold opacity-50 cursor-not-allowed">
                                                        -
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
