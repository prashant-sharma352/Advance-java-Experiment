import React, { useState } from 'react';

// 1. Live Track Courier Modal
export const TrackCourierModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  awb: string;
}> = ({ isOpen, onClose, orderId, awb }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#283044]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#c3c6d7]/40 animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-[#f2f3ff] p-4 border-b border-[#c3c6d7]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[22px]">
              near_me
            </span>
            <div>
              <h3 className="font-manrope text-base font-bold text-[#131b2e]">
                Live Courier Radar
              </h3>
              <p className="text-xs text-[#737686] font-mono-code">
                {orderId} • AWB: {awb}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#737686] hover:bg-[#eaedff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Mock Simulated Map View */}
        <div className="relative h-56 bg-slate-100 flex items-center justify-center overflow-hidden border-b border-[#c3c6d7]/30">
          {/* Stylized vector map grid */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#004ac6_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Roads simulation */}
          <svg className="absolute inset-0 w-full h-full stroke-slate-300" strokeWidth="6">
            <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="#cbd5e1" strokeWidth="8" />
            <line x1="20%" y1="90%" x2="80%" y2="10%" stroke="#cbd5e1" strokeWidth="6" />
            <path d="M 50 180 Q 150 120 220 140 T 350 70" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="6 4" />
          </svg>

          {/* Destination Pin */}
          <div className="absolute top-[30%] right-[22%] flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#007f36] text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-100">
              <span className="material-symbols-outlined text-[18px]">home</span>
            </div>
            <span className="bg-white px-2 py-0.5 rounded shadow text-[10px] font-bold text-[#131b2e] mt-1 border border-slate-200">
              Cyber City, BLR
            </span>
          </div>

          {/* Courier Van Icon */}
          <div className="absolute bottom-[35%] left-[30%] flex flex-col items-center animate-bounce">
            <div className="w-9 h-9 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-lg ring-4 ring-blue-100">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <span className="bg-[#00174b] text-white px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 shadow-sm">
              6 mins away
            </span>
          </div>
        </div>

        {/* Courier Details & OTP Box */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl border border-[#c3c6d7]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm">
                RK
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#131b2e]">Rajesh Kumar</h4>
                <p className="text-xs text-[#434655]">BlueDart Priority Delivery Exec</p>
                <p className="text-xs text-[#007f36] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#007f36] animate-pulse" />
                  Vehicle En Route
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#737686] block font-mono-code uppercase">Delivery OTP</span>
              <span className="font-mono-code font-extrabold text-lg text-[#004ac6] tracking-widest bg-white px-2.5 py-1 rounded-md border border-[#c3c6d7]">
                7412
              </span>
            </div>
          </div>

          <div className="text-xs text-[#434655] bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-start gap-2">
            <span className="material-symbols-outlined text-amber-600 text-[18px]">verified_user</span>
            <span>
              <strong>ApexTech Secure Tamper Protocol:</strong> Verify that the green anti-tamper holographic sticker is intact prior to providing the 4-digit OTP to the courier.
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#004ac6] hover:bg-[#1d4ed8] text-white py-2.5 rounded-lg text-sm font-semibold transition-all shadow-xs"
          >
            Close Live Radar
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Price Alert Modal
export const PriceAlertModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  currentPrice: number;
}> = ({ isOpen, onClose, productName, currentPrice }) => {
  const [targetPrice, setTargetPrice] = useState((currentPrice * 0.9).toFixed(0));
  const [emailAlert, setEmailAlert] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#283044]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[#c3c6d7]/40">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[22px]">
              notifications_active
            </span>
            <h3 className="font-manrope text-base font-bold text-[#131b2e]">
              Set Target Price Drop Alert
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737686] hover:bg-[#eaedff]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-[#007f36] rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">check</span>
            </div>
            <h4 className="font-bold text-base text-[#131b2e]">Target Alert Active!</h4>
            <p className="text-xs text-[#434655]">
              We will notify you immediately when {productName} drops to ₹{Number(targetPrice).toLocaleString('en-IN')}.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-[#2563eb] text-white px-5 py-2 rounded-lg text-sm font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-[#737686]">Tracking Device</p>
              <p className="font-bold text-sm text-[#131b2e]">{productName}</p>
              <p className="text-xs text-[#007f36] mt-0.5">
                Current Best Price: ₹{currentPrice.toLocaleString('en-IN')}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                Notify me when price drops below:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-sm text-[#737686]">
                  ₹
                </span>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-full bg-[#f2f3ff] border border-[#c3c6d7] rounded-lg pl-8 pr-3 py-2 text-sm font-mono-code font-bold text-[#131b2e] focus:outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="email-notif"
                checked={emailAlert}
                onChange={(e) => setEmailAlert(e.target.checked)}
                className="rounded text-[#2563eb]"
              />
              <label htmlFor="email-notif" className="text-xs text-[#434655]">
                Send instant notification to rohit.rajput@techmail.io
              </label>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2 text-sm border border-[#c3c6d7] rounded-lg text-[#434655]"
              >
                Cancel
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 py-2 text-sm bg-[#004ac6] text-white rounded-lg font-semibold hover:bg-[#1d4ed8]"
              >
                Activate Alert
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 3. Comparison Export PDF Modal
export const ComparisonExportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#283044]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[#c3c6d7]/40 text-center">
        <div className="w-12 h-12 bg-blue-100 text-[#004ac6] rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="material-symbols-outlined text-[28px]">picture_as_pdf</span>
        </div>
        <h3 className="font-manrope text-lg font-bold text-[#131b2e]">
          Export Benchmark Dossier
        </h3>
        <p className="text-xs text-[#434655] mt-1 max-w-xs mx-auto">
          Generated technical comparison summary for Galaxy S25 Ultra vs iPhone 16 Pro Max with verified lab metrics.
        </p>

        <div className="mt-4 p-3 bg-[#f2f3ff] rounded-xl text-left font-mono-code text-xs text-[#434655] space-y-1">
          <div className="flex justify-between">
            <span>Report ID:</span>
            <span className="font-bold">#APX-CMP-2026-904</span>
          </div>
          <div className="flex justify-between">
            <span>Geekbench 6 Delta:</span>
            <span className="text-[#007f36]">+8.8% Multi (S25 Ultra)</span>
          </div>
          <div className="flex justify-between">
            <span>Endurance Winner:</span>
            <span className="text-[#007f36]">Galaxy S25 Ultra (16h 42m)</span>
          </div>
          <div className="flex justify-between">
            <span>Security Hash:</span>
            <span>SHA-256 Verified</span>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm border border-[#c3c6d7] rounded-lg text-[#434655]"
          >
            Close
          </button>
          <button
            onClick={() => {
              window.print();
              onClose();
            }}
            className="flex-1 py-2 text-sm bg-[#004ac6] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Live Specialist Support Modal
export const SupportChatModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: 'Hello Rohit! I am Dev, Hardware Specialist at ApexTech Labs. How can I assist you with your benchmark evaluations or order today?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: 'Just now' },
    ]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: `Regarding "${userMsg}": Our lab tested this with sustained 100% compute loads over 45 minutes. The Snapdragon 8 Elite sustained 82% thermal efficiency without thermal throttling. Let me know if you would like the raw Geekbench / AnTuTu logs!`,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-[#283044]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full h-[520px] flex flex-col shadow-2xl border border-[#c3c6d7]/40 overflow-hidden">
        {/* Header */}
        <div className="bg-[#004ac6] text-white p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
            </div>
            <div>
              <h3 className="font-bold text-sm">24x7 Hardware Specialist</h3>
              <p className="text-[11px] text-blue-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Engineer Online
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#faf8ff]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#2563eb] text-white rounded-tr-xs'
                    : 'bg-white text-[#131b2e] border border-[#c3c6d7]/40 rounded-tl-xs shadow-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#737686] mt-0.5 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-[#c3c6d7]/40 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask an engineer anything about specs, thermals..."
            className="flex-1 bg-[#f2f3ff] border border-[#c3c6d7] rounded-lg px-3 py-2 text-xs text-[#131b2e] focus:outline-none focus:border-[#2563eb]"
          />
          <button
            type="submit"
            className="bg-[#004ac6] text-white px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-[#1d4ed8]"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
