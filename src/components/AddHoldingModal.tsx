import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Company } from '../types';

interface AddHoldingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddHoldingModal: React.FC<AddHoldingModalProps> = ({ isOpen, onClose }) => {
  const { companies, addHolding } = useApp();

  const [selectedSymbol, setSelectedSymbol] = useState(companies[0]?.symbol || 'RELIANCE');
  const [quantity, setQuantity] = useState<string>('50');
  const [avgPrice, setAvgPrice] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const selectedCompany = companies.find(c => c.symbol === selectedSymbol) || companies[0];

  const handleCompanyChange = (sym: string) => {
    setSelectedSymbol(sym);
    const comp = companies.find(c => c.symbol === sym);
    if (comp) {
      setAvgPrice(comp.currentPrice.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(quantity, 10);
    const price = parseFloat(avgPrice || selectedCompany.currentPrice.toString());

    if (isNaN(qty) || qty <= 0) return;
    if (isNaN(price) || price <= 0) return;

    addHolding({
      symbol: selectedCompany.symbol,
      companyName: selectedCompany.name,
      sector: selectedCompany.sector,
      quantity: qty,
      avgPrice: price,
      currentPrice: selectedCompany.currentPrice,
      thesisHealth: selectedCompany.thesisHealthScore,
      notes: notes.trim() || `Core holding in ${selectedCompany.sector}.`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#141A26] border border-[#263147] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1E2638] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Add Portfolio Holding</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Select Indian Equity
            </label>
            <select
              value={selectedSymbol}
              onChange={e => handleCompanyChange(e.target.value)}
              className="w-full bg-[#0B0E14] border border-[#1E2638] focus:border-sky-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            >
              {companies.map(c => (
                <option key={c.symbol} value={c.symbol}>
                  {c.symbol} — {c.name} ({c.sector})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Quantity (Shares)
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                placeholder="e.g. 50"
                className="w-full bg-[#0B0E14] border border-[#1E2638] focus:border-sky-500 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Avg Buy Price (₹)
              </label>
              <input
                type="number"
                step="0.05"
                min="1"
                required
                value={avgPrice || selectedCompany.currentPrice}
                onChange={e => setAvgPrice(e.target.value)}
                placeholder={selectedCompany.currentPrice.toString()}
                className="w-full bg-[#0B0E14] border border-[#1E2638] focus:border-sky-500 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          {/* Current quote preview */}
          <div className="p-3 rounded-lg bg-[#0B0E14] border border-[#1E2638] text-xs flex items-center justify-between text-slate-400">
            <span>Market Quote:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-white">
                ₹{selectedCompany.currentPrice.toLocaleString('en-IN')}
              </span>
              <span
                className={`font-semibold ${
                  selectedCompany.dayChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {selectedCompany.dayChangePercent >= 0 ? '+' : ''}
                {selectedCompany.dayChangePercent}%
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Investment Notes / Thesis Core
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g., Long-term compounding, dominant market share..."
              className="w-full bg-[#0B0E14] border border-[#1E2638] focus:border-sky-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#1C2436] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-sky-500/20"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Add to Portfolio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
