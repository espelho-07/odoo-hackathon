import React, { useState } from 'react';
import { policies } from '../data/policies';
import { FileText, ChevronDown, ChevronUp, Shield, Clock, Calendar, Briefcase } from 'lucide-react';

export default function Policies() {
    const [expandedId, setExpandedId] = useState(null);

    const togglePolicy = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const getIcon = (category) => {
        switch (category) {
            case 'Time Off': return Calendar;
            case 'Security': return Shield;
            case 'Behavior': return Briefcase;
            case 'General': return Clock;
            default: return FileText;
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="mb-8 text-center md:text-left">
                <h2 className="text-2xl font-bold text-[#012970] mb-2 font-display">Company Policies</h2>
                <p className="text-gray-500">Guidelines and rules for all Dayflow employees.</p>
            </div>

            <div className="space-y-4">
                {policies.map((policy) => {
                    const Icon = getIcon(policy.category);
                    const isExpanded = expandedId === policy.id;

                    return (
                        <div
                            key={policy.id}
                            className={`bg-white rounded-lg border transition-all duration-200 overflow-hidden ${isExpanded ? 'border-l-4 border-l-[#4154f1] shadow-md' : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <button
                                onClick={() => togglePolicy(policy.id)}
                                className="w-full flex items-center justify-between p-5 text-left focus:outline-none bg-white"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${isExpanded ? 'bg-blue-50 text-[#4154f1]' : 'bg-gray-100 text-gray-500'}`}>
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-semibold ${isExpanded ? 'text-[#012970]' : 'text-gray-700'}`}>
                                            {policy.title}
                                        </h3>
                                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                                            {policy.category} • Updated: {policy.lastUpdated}
                                        </span>
                                    </div>
                                </div>
                                <div className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out bg-gray-50 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 border-t border-gray-100 text-gray-600 leading-relaxed text-sm">
                                    {policy.content}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                <p className="text-sm text-[#012970]">
                    <strong>Note:</strong> By using the Dayflow portal, you acknowledge that you have read and agreed to adhere to these policies.
                </p>
            </div>
        </div>
    );
}
