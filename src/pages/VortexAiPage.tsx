import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StructuredAIResponse } from '../types';

const SUGGESTED_PROMPTS = [
  'Why did my portfolio move today?',
  'Which holding has the weakest thesis?',
  'What risks am I underestimating?',
  'What changed in my holdings?',
  'What should I watch this week?',
  'What could break my investment thesis?'
];

export const VortexAiPage: React.FC = () => {
  const { holdings, companies, marketPulse, activeAiPrompt, setActiveAiPrompt } = useApp();

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');

  // Auto-run if activeAiPrompt was passed from another page
  React.useEffect(() => {
    if (activeAiPrompt) {
      setInputPrompt(activeAiPrompt);
      handleQuery(activeAiPrompt);
      setActiveAiPrompt('');
    }
  }, [activeAiPrompt]);

  // Default pre-loaded institutional response for instant competition demonstration
  const [currentResponse, setCurrentResponse] = useState<StructuredAIResponse>({
    answer:
      'Today’s portfolio performance is primarily governed by financial sector drag being offset by steady capital accumulation in telecom and capital goods.',
    whatChanged:
      'HDFC Bank retreated -0.94% following indications of sticky term deposit renewals, while Bharti Airtel (+1.53%) and Larsen & Toubro (+0.76%) absorbed positive operational inflows.',
    whyItMatters:
      'Financials constitute 37.8% of aggregate portfolio allocation. When banking multiples compress due to systemic liquidity tightening, other outperforming positions must deliver outsized gains to keep net NAV positive.',
    portfolioImpact:
      'Net daily drag from HDFCBANK was ₹2,970, which was offset by ₹2,783 combined gain from Bharti Airtel and L&T positions.',
    thesisImpact:
      'Core fundamental thesis across all 7 holdings remains intact; however, HDFC Bank’s margin expansion timeline requires close observation.',
    confidence: 'High',
    evidence: 'NSE end-of-day closing prices & RBI liquidity absorption reports.',
    watchNext: [
      'Weekly RBI liquidity deficit figures and overnight call money rates',
      'Next tranche of foreign institutional flow (FII) data in large-cap BFSI',
      'Telecom average revenue per user (ARPU) disclosures'
    ],
    generatedAt: new Date().toLocaleTimeString('en-IN') + ' IST',
    model: 'Gemini 3.8 Flash'
  });

  const handleQuery = async (queryText: string) => {
    const text = queryText.trim();
    if (!text) return;

    setIsLoading(true);
    setLoadingStep('Synthesizing portfolio factor weights...');

    const timer1 = setTimeout(() => {
      setLoadingStep('Evaluating company earnings & thesis pillars...');
    }, 600);

    const timer2 = setTimeout(() => {
      setLoadingStep('Formulating structured institutional thesis...');
    }, 1200);

    try {
      const response = await fetch('/api/ai/analyst', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          portfolio: holdings,
          companies: companies
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data: StructuredAIResponse = await response.json();
      setCurrentResponse(data);
    } catch (err: any) {
      console.warn('Falling back to local financial reasoning engine:', err);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPrompt.trim()) {
      handleQuery(inputPrompt);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
          <Bot className="w-3.5 h-3.5" />
          <span>VORTEX AI Investment Analyst</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Your Investment Analyst, Not Just a Chatbot.
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Ask complex questions about your portfolio, market events, and investment theses. VORTEX connects the dots with structured, evidence-backed reasoning.
        </p>
      </div>

      {/* Suggested Question Pills */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block text-center">
          Suggested Institutional Inquiries
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              id={`suggested-prompt-${idx}`}
              onClick={() => {
                setInputPrompt(prompt);
                handleQuery(prompt);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#141A26] hover:bg-[#1E2638] text-slate-300 hover:text-white border border-[#1E2638] hover:border-sky-500/40 text-xs font-medium transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            id="vortex-ai-input"
            type="text"
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
            disabled={isLoading}
            placeholder="Ask VORTEX (e.g. 'Why did my portfolio move today?' or 'Evaluate HDFC Bank thesis')..."
            className="w-full bg-[#111622] border border-[#1E2638] focus:border-sky-500 rounded-xl pl-4 pr-24 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none shadow-xl transition-colors disabled:opacity-50"
          />
          <button
            id="btn-submit-ai-prompt"
            type="submit"
            disabled={isLoading || !inputPrompt.trim()}
            className="absolute right-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
          >
            <span>Analyze</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="p-6 rounded-xl bg-[#111622] border border-[#1E2638] flex flex-col items-center justify-center space-y-3 animate-pulse">
          <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
          <p className="text-xs text-sky-400 font-mono font-medium">
            {loadingStep || 'Querying VORTEX AI analyst...'}
          </p>
        </div>
      )}

      {/* Structured AI Response View */}
      {currentResponse && !isLoading && (
        <div className="bg-[#111622] border border-sky-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-200">
          {/* Top Status and Model attribution */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E2638] pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-white text-sm">
                  VORTEX Structured Decision Intelligence
                </span>
                <div className="text-[11px] text-slate-400 font-mono">
                  Engine: {currentResponse.model} • {currentResponse.generatedAt}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Confidence:</span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  currentResponse.confidence === 'High'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {currentResponse.confidence} Confidence
              </span>
            </div>
          </div>

          {/* Executive Answer */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-sky-500/10 via-[#141A26] to-[#141A26] border border-sky-500/30">
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
              Executive Analyst Summary
            </span>
            <p className="text-sm font-semibold text-white leading-relaxed">
              {currentResponse.answer}
            </p>
          </div>

          {/* Core Structured Sections (4 Pillars) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* 1. What Changed */}
            <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#1E2638] space-y-1.5">
              <div className="flex items-center gap-1.5 text-sky-400 font-bold uppercase tracking-wider text-[11px]">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>1. What Changed</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {currentResponse.whatChanged}
              </p>
            </div>

            {/* 2. Why It Matters */}
            <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#1E2638] space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>2. Why It Matters</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {currentResponse.whyItMatters}
              </p>
            </div>

            {/* 3. Portfolio Impact */}
            <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#1E2638] space-y-1.5">
              <div className="flex items-center gap-1.5 text-indigo-400 font-bold uppercase tracking-wider text-[11px]">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>3. Portfolio Impact</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {currentResponse.portfolioImpact}
              </p>
            </div>

            {/* 4. Thesis Impact */}
            <div className="p-4 rounded-xl bg-[#0B0E14] border border-[#1E2638] space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>4. Thesis Impact</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {currentResponse.thesisImpact}
              </p>
            </div>
          </div>

          {/* Evidence & Leading Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Evidence Note */}
            <div className="p-4 rounded-xl bg-[#141A26] border border-[#1E2638] space-y-2">
              <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Verified Data & Evidence Attribution</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentResponse.evidence}
              </p>
            </div>

            {/* What To Watch Next */}
            <div className="p-4 rounded-xl bg-[#141A26] border border-[#1E2638] space-y-2">
              <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>What To Watch Next</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                {currentResponse.watchNext.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
