
import React, { useState } from 'react';
import { Widget } from './Layout';

// --- Account Sub-components ---

const OverviewContent = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-4">
      <Widget title="User Profile" className="h-40">
        <div className="p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">User ID</span>
            <span className="mono text-[var(--text-primary)]">8294105</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Email</span>
            <span className="text-[var(--text-primary)]">trader@titan.trade</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Tier Level</span>
            <span className="text-emerald-500 font-bold">VIP 2</span>
          </div>
        </div>
      </Widget>
      <Widget title="Security Status" className="h-40">
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-secondary)]">2FA (Google)</span>
            <span className="bg-emerald-500/20 text-emerald-500 px-2 rounded-full text-[9px] font-bold">ENABLED</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-secondary)]">Anti-Phishing Code</span>
            <span className="text-rose-500 font-bold text-[9px]">NOT SET</span>
          </div>
        </div>
      </Widget>
      <Widget title="Wallet Estimated Value" className="h-40">
        <div className="p-4 flex flex-col items-center justify-center">
          <div className="text-2xl font-black text-[var(--text-primary)] mono">4.5537 XBT</div>
          <div className="text-[var(--text-muted)] mono text-[10px]">≈ $285,942.21 USD</div>
        </div>
      </Widget>
    </div>
    
    <Widget title="Recent Account Activity">
      <table className="w-full text-left mono text-[10px]">
        <thead className="bg-slate-500/10 text-[var(--text-muted)] uppercase font-bold sticky top-0">
          <tr>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">IP Address</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)]">
          {[1,2,3,4,5].map(i => (
            <tr key={i} className="hover:bg-slate-500/5">
              <td className="px-4 py-2 text-[var(--text-secondary)]">2023-11-24 14:22:01</td>
              <td className="px-4 py-2 text-[var(--text-primary)] font-bold">LOGIN</td>
              <td className="px-4 py-2">192.168.1.{10 + i}</td>
              <td className="px-4 py-2 text-[var(--text-muted)]">TOKYO, JP</td>
              <td className="px-4 py-2 text-emerald-500">SUCCESS</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Widget>
  </div>
);

const SecurityContent = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <Widget title="Two-Factor Authentication">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[var(--text-primary)] font-bold">Google Authenticator</div>
              <div className="text-[var(--text-muted)] text-[9px]">Used for withdrawals and security modifications.</div>
            </div>
            <button className="text-emerald-500 font-bold uppercase text-[10px] hover:underline">Change</button>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
            <div>
              <div className="text-[var(--text-primary)] font-bold">SMS Authentication</div>
              <div className="text-[var(--text-muted)] text-[9px]">Receive codes via mobile phone.</div>
            </div>
            <button className="text-[var(--text-secondary)] font-bold uppercase text-[10px] hover:text-[var(--text-primary)]">Enable</button>
          </div>
        </div>
      </Widget>
      <Widget title="Password & Sessions">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[var(--text-primary)] font-bold">Login Password</div>
              <div className="text-[var(--text-muted)] text-[9px]">Last changed 42 days ago.</div>
            </div>
            <button className="text-[var(--text-secondary)] font-bold uppercase text-[10px] hover:text-[var(--text-primary)]">Reset</button>
          </div>
          <div className="pt-4 border-t border-[var(--border-color)]">
            <button className="w-full bg-rose-500/10 text-rose-500 py-2 font-bold uppercase text-[10px] rounded-sm hover:bg-rose-500/20 transition-colors">
              Log Out All Other Sessions
            </button>
          </div>
        </div>
      </Widget>
    </div>
    <Widget title="Active Login Sessions">
      <table className="w-full text-left mono text-[10px]">
        <thead className="bg-slate-500/10 text-[var(--text-muted)] uppercase font-bold">
          <tr>
            <th className="px-4 py-2">Device</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">IP Address</th>
            <th className="px-4 py-2">Last Access</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)]">
          <tr className="hover:bg-slate-500/5">
            <td className="px-4 py-2 text-[var(--text-primary)]">Chrome (Windows)</td>
            <td className="px-4 py-2 text-[var(--text-secondary)]">Tokyo, JP</td>
            <td className="px-4 py-2">103.14.22.1</td>
            <td className="px-4 py-2 text-[var(--text-muted)]">Current Session</td>
            <td className="px-4 py-2">-</td>
          </tr>
        </tbody>
      </table>
    </Widget>
  </div>
);

const IdentificationContent = () => (
  <div className="max-w-4xl space-y-6">
    <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
        </div>
        <div>
          <h2 className="text-xl font-black text-[var(--text-primary)]">Verified Account</h2>
          <p className="text-[var(--text-muted)] text-[11px]">Your identity has been confirmed. You have access to all trading features.</p>
        </div>
      </div>
      <div className="bg-emerald-500 text-slate-900 px-4 py-1.5 font-black uppercase rounded-sm text-[10px]">LEVEL 2</div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <Widget title="Personal Information">
        <div className="p-4 space-y-3">
          <div className="flex justify-between border-b border-[var(--border-color)] pb-2">
            <span className="text-[var(--text-muted)] uppercase text-[9px] font-bold">Full Name</span>
            <span className="text-[var(--text-primary)]">Satoshi N.</span>
          </div>
          <div className="flex justify-between border-b border-[var(--border-color)] pb-2">
            <span className="text-[var(--text-muted)] uppercase text-[9px] font-bold">Nationality</span>
            <span className="text-[var(--text-primary)]">Japan</span>
          </div>
          <div className="flex justify-between border-b border-[var(--border-color)] pb-2">
            <span className="text-[var(--text-muted)] uppercase text-[9px] font-bold">ID Number</span>
            <span className="text-[var(--text-primary)] mono">**** **** 1234</span>
          </div>
        </div>
      </Widget>
      <Widget title="Verification Limits">
        <div className="p-4 space-y-4">
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-[var(--text-muted)] uppercase font-bold">Daily Withdrawal</span>
              <span className="text-emerald-500 font-bold">100.00 XBT</span>
            </div>
            <div className="w-full h-1.5 bg-slate-500/20 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[0.5%]"></div>
            </div>
          </div>
          <button className="w-full border border-[var(--border-color)] text-[var(--text-primary)] py-2 font-bold uppercase text-[10px] rounded-sm hover:bg-slate-500/10 transition-colors">
            Upgrade to Level 3
          </button>
        </div>
      </Widget>
    </div>
  </div>
);

const ApiKeysContent = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-black text-[var(--text-primary)]">API Access Management</h2>
      <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 font-black uppercase rounded-sm text-[10px] shadow-lg">
        Create New API Key
      </button>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Widget title="Live Keys [01]">
        <div className="p-4 space-y-4">
          <div className="bg-[var(--bg-main)] p-4 border border-emerald-500/20 rounded-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-emerald-500 font-bold uppercase text-[10px]">Main Trading Key</div>
                <div className="text-[var(--text-muted)] text-[9px] mt-1">Created on 2023-10-15</div>
              </div>
              <div className="flex gap-2">
                <button className="text-[var(--text-secondary)] hover:text-white uppercase text-[9px] font-bold">Edit</button>
                <button className="text-rose-500 hover:text-rose-400 uppercase text-[9px] font-bold">Delete</button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[9px] text-[var(--text-muted)] uppercase font-bold">API Key</div>
              <div className="bg-slate-900 p-2 mono text-[10px] text-slate-300 break-all select-all border border-slate-800">
                titan_live_8f239a2b001c4d92a01f5e2d1a3c
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[9px] text-[var(--text-secondary)] uppercase font-bold">Trading Enabled</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[9px] text-[var(--text-secondary)] uppercase font-bold">Withdrawals Disabled</span>
              </div>
            </div>
          </div>
        </div>
      </Widget>
      <Widget title="Usage & Rate Limits">
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-secondary)] text-[10px] uppercase font-bold">REST Rate Limit</span>
            <span className="text-[var(--text-primary)] mono">300 Req/min</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-secondary)] text-[10px] uppercase font-bold">WebSocket Latency</span>
            <span className="text-emerald-500 mono font-bold">12ms (Avg)</span>
          </div>
          <div className="pt-4 border-t border-[var(--border-color)]">
            <p className="text-[var(--text-muted)] text-[10px] leading-relaxed italic">
              * Rates are recalculated every 24 hours based on Tier Level. VIP users enjoy 2x limits.
            </p>
          </div>
        </div>
      </Widget>
    </div>
  </div>
);

const WalletsContent = () => (
  <div className="space-y-4">
    <div className="flex gap-4">
      <div className="flex-1 bg-emerald-500 text-slate-900 p-6 rounded-sm shadow-xl flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-black opacity-60">Available Balance</div>
          <div className="text-3xl font-black mono leading-none mt-1">4.4191 XBT</div>
          <div className="text-[10px] font-bold opacity-70 mt-2">≈ $278,124.50 USD</div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-slate-900 text-white px-6 py-2 font-black uppercase text-[10px] rounded-sm hover:scale-105 transition-transform">Deposit</button>
          <button className="bg-slate-900/10 text-slate-900 border border-slate-900/20 px-6 py-2 font-black uppercase text-[10px] rounded-sm hover:bg-slate-900/20">Withdraw</button>
        </div>
      </div>
      <div className="w-72 bg-[var(--bg-surface)] p-6 rounded-sm border border-[var(--border-color)]">
        <div className="text-[var(--text-muted)] text-[10px] uppercase font-black">Margin Reserved</div>
        <div className="text-xl font-black text-[var(--text-primary)] mono mt-1">0.1346 XBT</div>
        <div className="mt-4 flex flex-col gap-1">
          <div className="flex justify-between text-[9px] font-bold">
            <span className="text-[var(--text-muted)]">POSITION MARGIN</span>
            <span className="text-[var(--text-primary)]">0.1124 XBT</span>
          </div>
          <div className="flex justify-between text-[9px] font-bold">
            <span className="text-[var(--text-muted)]">ORDER MARGIN</span>
            <span className="text-[var(--text-primary)]">0.0222 XBT</span>
          </div>
        </div>
      </div>
    </div>
    
    <Widget title="Asset Breakdown">
      <table className="w-full text-left mono text-[10px]">
        <thead className="bg-slate-500/10 text-[var(--text-muted)] uppercase font-bold">
          <tr>
            <th className="px-4 py-3">Asset</th>
            <th className="px-4 py-3">Total Balance</th>
            <th className="px-4 py-3">Available</th>
            <th className="px-4 py-3">On Order</th>
            <th className="px-4 py-3">BTC Value</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)]">
          {[
            { a: 'XBT', name: 'Bitcoin', t: '4.5537', av: '4.4191', o: '0.1346', v: '4.5537' },
            { a: 'ETH', name: 'Ethereum', t: '12.5000', av: '12.5000', o: '0.0000', v: '0.6621' },
            { a: 'USDT', name: 'Tether', t: '25,402.11', av: '25,402.11', o: '0.0000', v: '0.4045' },
            { a: 'SOL', name: 'Solana', t: '412.05', av: '300.00', o: '112.05', v: '0.9412' },
          ].map((item, i) => (
            <tr key={i} className="hover:bg-slate-500/5">
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="text-[var(--text-primary)] font-black">{item.a}</span>
                  <span className="text-[var(--text-muted)] text-[9px]">{item.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-[var(--text-primary)]">{item.t}</td>
              <td className="px-4 py-3 text-emerald-400">{item.av}</td>
              <td className="px-4 py-3 text-[var(--text-muted)]">{item.o}</td>
              <td className="px-4 py-3 text-[var(--text-primary)] font-bold">{item.v}</td>
              <td className="px-4 py-3">
                <button className="text-emerald-500 uppercase text-[9px] font-bold hover:underline">Transfer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Widget>
  </div>
);

const SubAccountsContent = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-black text-[var(--text-primary)]">Sub-Accounts Overview</h2>
      <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 font-black uppercase rounded-sm text-[10px] shadow-lg">
        Create Sub-Account
      </button>
    </div>
    
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-slate-500/5 border border-[var(--border-color)] p-4 rounded-sm">
        <div className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Total Sub-accounts</div>
        <div className="text-2xl font-black text-[var(--text-primary)] mt-1">2</div>
      </div>
      <div className="bg-slate-500/5 border border-[var(--border-color)] p-4 rounded-sm col-span-3">
        <div className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Total Assets Across Subs</div>
        <div className="text-2xl font-black text-emerald-500 mt-1">0.4412 XBT</div>
      </div>
    </div>

    <Widget title="Managed Accounts">
      <table className="w-full text-left mono text-[10px]">
        <thead className="bg-slate-500/10 text-[var(--text-muted)] uppercase font-bold">
          <tr>
            <th className="px-4 py-3">Account Email</th>
            <th className="px-4 py-3">Label</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Equity (XBT)</th>
            <th className="px-4 py-3">2FA</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)]">
          <tr className="hover:bg-slate-500/5">
            <td className="px-4 py-3 text-[var(--text-primary)]">sub_01_trader@titan.trade</td>
            <td className="px-4 py-3 text-[var(--text-secondary)]">Algo Trading Bot</td>
            <td className="px-4 py-3 text-[var(--text-muted)]">2023-10-11</td>
            <td className="px-4 py-3 text-[var(--text-primary)] font-bold">0.1245</td>
            <td className="px-4 py-3 text-emerald-500">Active</td>
            <td className="px-4 py-3 text-emerald-500">Operational</td>
            <td className="px-4 py-3 text-right space-x-2">
              <button className="text-emerald-500 uppercase font-bold text-[9px] hover:underline">Transfer</button>
              <button className="text-[var(--text-secondary)] uppercase font-bold text-[9px] hover:text-white">Settings</button>
            </td>
          </tr>
          <tr className="hover:bg-slate-500/5">
            <td className="px-4 py-3 text-[var(--text-primary)]">sub_02_scalp@titan.trade</td>
            <td className="px-4 py-3 text-[var(--text-secondary)]">Manual Scalping</td>
            <td className="px-4 py-3 text-[var(--text-muted)]">2023-11-02</td>
            <td className="px-4 py-3 text-[var(--text-primary)] font-bold">0.3167</td>
            <td className="px-4 py-3 text-rose-500">Disabled</td>
            <td className="px-4 py-3 text-emerald-500">Operational</td>
            <td className="px-4 py-3 text-right space-x-2">
              <button className="text-emerald-500 uppercase font-bold text-[9px] hover:underline">Transfer</button>
              <button className="text-[var(--text-secondary)] uppercase font-bold text-[9px] hover:text-white">Settings</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Widget>
  </div>
);

export const AccountView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('Overview');

  const subTabs = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Security', label: 'Security' },
    { id: 'Identification', label: 'Identification' },
    { id: 'ApiKeys', label: 'API Keys' },
    { id: 'Wallets', label: 'Wallets' },
    { id: 'SubAccounts', label: 'Sub-accounts' },
  ];

  const renderAccountSubContent = () => {
    switch (activeSubTab) {
      case 'Overview': return <OverviewContent />;
      case 'Security': return <SecurityContent />;
      case 'Identification': return <IdentificationContent />;
      case 'ApiKeys': return <ApiKeysContent />;
      case 'Wallets': return <WalletsContent />;
      case 'SubAccounts': return <SubAccountsContent />;
      default: return <OverviewContent />;
    }
  };

  return (
    <div className="flex-1 flex gap-1 overflow-hidden h-full">
      <div className="w-64 bg-[var(--bg-surface)] border-r border-[var(--border-color)] p-4 flex flex-col gap-1 shrink-0 theme-transition">
        <div className="text-[10px] font-black uppercase text-[var(--text-muted)] mb-3 px-3 tracking-widest">Account Center</div>
        {subTabs.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveSubTab(tab.id)}
            className={`text-left px-3 py-2.5 rounded-sm text-[11px] transition-all duration-200 ${
              activeSubTab === tab.id 
                ? 'bg-emerald-500/10 text-emerald-500 font-bold border-l-2 border-emerald-500' 
                : 'text-[var(--text-secondary)] hover:bg-slate-500/10 hover:text-[var(--text-primary)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
        
        <div className="mt-auto p-4 bg-slate-500/5 rounded-sm border border-[var(--border-color)]">
          <div className="text-[9px] text-[var(--text-muted)] uppercase font-bold">Referral Program</div>
          <div className="text-emerald-500 font-black text-lg mt-1">20% COMMISSION</div>
          <button className="mt-2 text-[9px] text-[var(--text-secondary)] hover:text-white uppercase font-bold">Get My Link</button>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-auto bg-[var(--mono-bg)] theme-transition">
        <div className="max-w-6xl mx-auto">
          {renderAccountSubContent()}
        </div>
      </div>
    </div>
  );
};

// --- References Sub-components ---

const GettingStartedDoc = () => (
  <div className="space-y-6 max-w-3xl">
    <h1 className="text-3xl font-black text-[var(--text-primary)]">Getting Started with Titan Trade</h1>
    <p className="text-[var(--text-secondary)] leading-relaxed">
      Titan Trade is a high-performance cryptocurrency derivative trading platform. We offer perpetual and fixed-maturity futures contracts on a wide variety of digital assets.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-slate-500/5 border border-[var(--border-color)] rounded-sm">
        <div className="text-emerald-500 font-bold mb-2">1. Fund Your Account</div>
        <p className="text-[9px] text-[var(--text-muted)]">Navigate to the Wallets tab to generate a deposit address for XBT, ETH, or USDT.</p>
      </div>
      <div className="p-4 bg-slate-500/5 border border-[var(--border-color)] rounded-sm">
        <div className="text-emerald-500 font-bold mb-2">2. Transfer to Margin</div>
        <p className="text-[9px] text-[var(--text-muted)]">Titan Trade uses a sub-account model for risk management. Transfer funds to your trading wallet.</p>
      </div>
      <div className="p-4 bg-slate-500/5 border border-[var(--border-color)] rounded-sm">
        <div className="text-emerald-500 font-bold mb-2">3. Set Your Leverage</div>
        <p className="text-[9px] text-[var(--text-muted)]">Choose between Isolated and Cross margin modes. Up to 100x leverage available on major pairs.</p>
      </div>
      <div className="p-4 bg-slate-500/5 border border-[var(--border-color)] rounded-sm">
        <div className="text-emerald-500 font-bold mb-2">4. Place Your First Trade</div>
        <p className="text-[9px] text-[var(--text-muted)]">Use the order form to enter a Limit or Market order. Monitor your positions in the real-time panel.</p>
      </div>
    </div>
  </div>
);

const IntroductionToFuturesDoc = () => (
  <div className="space-y-6 max-w-3xl">
    <h1 className="text-3xl font-black text-[var(--text-primary)]">Introduction to Perpetual Futures</h1>
    <p className="text-[var(--text-secondary)] leading-relaxed">
      A Perpetual Contract is a derivative product that is similar to a traditional Futures Contract, but has a few key differences:
    </p>
    <ul className="list-disc pl-5 space-y-3 text-[var(--text-secondary)]">
      <li><strong>No Expiry:</strong> Unlike traditional futures, perpetual contracts do not have a settlement date. You can hold a position as long as you maintain sufficient margin.</li>
      <li><strong>Funding Rates:</strong> To ensure the perpetual price stays close to the underlying index price, we use a "Funding Rate" mechanism where longs pay shorts (or vice-versa) every 8 hours.</li>
      <li><strong>Mark Price:</strong> PnL calculation and liquidations are based on the "Mark Price" (a weighted index of several spot exchanges) to prevent manipulation.</li>
    </ul>
    <Widget title="Contract Specs Comparison">
      <table className="w-full text-left mono text-[10px]">
        <thead className="bg-slate-500/10 text-[var(--text-muted)] uppercase font-bold">
          <tr><th className="px-4 py-2">Feature</th><th className="px-4 py-2">Perpetual</th><th className="px-4 py-2">Quarterly Futures</th></tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-primary)]">
          <tr><td className="px-4 py-2">Expiry</td><td className="px-4 py-2">Never</td><td className="px-4 py-2">End of Quarter</td></tr>
          <tr><td className="px-4 py-2">Funding</td><td className="px-4 py-2">Periodic Payments</td><td className="px-4 py-2">None</td></tr>
          <tr><td className="px-4 py-2">Basis</td><td className="px-4 py-2">Convergence via Funding</td><td className="px-4 py-2">Convergence via Expiry</td></tr>
        </tbody>
      </table>
    </Widget>
  </div>
);

const MarginVsCrossDoc = () => (
  <div className="space-y-6 max-w-3xl">
    <h1 className="text-3xl font-black text-[var(--text-primary)]">Margin Modes: Isolated vs. Cross</h1>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-emerald-500">Isolated Margin</h2>
        <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
          In Isolated Margin mode, the margin assigned to a position is limited to the initial amount. If a position is liquidated, you only lose the margin specifically allocated to that position.
        </p>
        <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-sm italic text-[10px] text-[var(--text-muted)]">
          "Best for high-leverage scalping where you want to strictly limit potential loss per trade."
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-500">Cross Margin</h2>
        <p className="text-[var(--text-secondary)] text-[11px] leading-relaxed">
          Cross Margin uses your entire available balance to prevent liquidation. All positions share the same margin pool. If the margin balance falls below maintenance requirements, all positions risk liquidation.
        </p>
        <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-sm italic text-[10px] text-[var(--text-muted)]">
          "Best for long-term swing trading and multi-asset hedging strategies."
        </div>
      </div>
    </div>
  </div>
);

const LiquidationRulesDoc = () => (
  <div className="space-y-6 max-w-3xl">
    <h1 className="text-3xl font-black text-[var(--text-primary)]">Liquidation & Risk Management</h1>
    <p className="text-[var(--text-secondary)] leading-relaxed">
      Liquidation occurs when a trader's account equity falls below the <strong>Maintenance Margin</strong> requirement.
    </p>
    <Widget title="The Liquidation Process">
      <div className="p-4 space-y-4">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold shrink-0">1</div>
          <p className="text-[11px] text-[var(--text-secondary)]"><strong>Margin Call:</strong> When equity reaches 1.5x Maintenance Margin, you receive a notification to add collateral or reduce size.</p>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold shrink-0">2</div>
          <p className="text-[11px] text-[var(--text-secondary)]"><strong>System Takeover:</strong> If the Mark Price hits the Liquidation Price, the position is taken over by the Titan Risk Engine.</p>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold shrink-0">3</div>
          <p className="text-[11px] text-[var(--text-secondary)]"><strong>Insurance Fund:</strong> If the position is closed at a price worse than the bankruptcy price, the Titan Insurance Fund covers the deficit to prevent socialized losses.</p>
        </div>
      </div>
    </Widget>
  </div>
);

const TradingFeesDoc = () => (
  <div className="space-y-6 max-w-3xl">
    <h1 className="text-3xl font-black text-[var(--text-primary)]">Trading Fee Schedule</h1>
    <p className="text-[var(--text-secondary)] leading-relaxed">
      Titan Trade uses a Maker/Taker model. Maker orders provide liquidity to the order book, while Taker orders remove it.
    </p>
    <Widget title="Fee Tiers">
      <table className="w-full text-left mono text-[10px]">
        <thead className="bg-slate-500/10 text-[var(--text-muted)] uppercase font-bold">
          <tr>
            <th className="px-4 py-3">Tier</th>
            <th className="px-4 py-3">30D Volume (USD)</th>
            <th className="px-4 py-3">Maker</th>
            <th className="px-4 py-3">Taker</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-primary)]">
          <tr><td className="px-4 py-3">Standard</td><td className="px-4 py-3">&lt; $1M</td><td className="px-4 py-3 text-emerald-500">-0.025%</td><td className="px-4 py-3">0.075%</td></tr>
          <tr><td className="px-4 py-3">Bronze</td><td className="px-4 py-3">$1M - $5M</td><td className="px-4 py-3 text-emerald-500">-0.015%</td><td className="px-4 py-3">0.065%</td></tr>
          <tr><td className="px-4 py-3">Silver</td><td className="px-4 py-3">$5M - $25M</td><td className="px-4 py-3 text-emerald-500">-0.010%</td><td className="px-4 py-3">0.055%</td></tr>
          <tr><td className="px-4 py-3">Gold</td><td className="px-4 py-3">$25M - $100M</td><td className="px-4 py-3 text-emerald-500">0.000%</td><td className="px-4 py-3">0.045%</td></tr>
          <tr><td className="px-4 py-3">Platinum</td><td className="px-4 py-3">&gt; $100M</td><td className="px-4 py-3 text-emerald-500">0.005% (Rebate)</td><td className="px-4 py-3">0.035%</td></tr>
        </tbody>
      </table>
    </Widget>
  </div>
);

const DepositWithdrawalFeesDoc = () => (
  <div className="space-y-6 max-w-3xl">
    <h1 className="text-3xl font-black text-[var(--text-primary)]">Deposit & Withdrawal Fees</h1>
    <p className="text-[var(--text-secondary)] leading-relaxed">
      Titan Trade does not charge fees for deposits. Withdrawal fees are adjusted dynamically based on network congestion.
    </p>
    <Widget title="Network Fees (Estimated)">
      <table className="w-full text-left mono text-[10px]">
        <thead className="bg-slate-500/10 text-[var(--text-muted)] uppercase font-bold">
          <tr><th className="px-4 py-3">Asset</th><th className="px-4 py-3">Min. Withdrawal</th><th className="px-4 py-3">Fee</th></tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-primary)]">
          <tr><td className="px-4 py-3 font-bold">XBT</td><td className="px-4 py-3">0.001 XBT</td><td className="px-4 py-3">0.0004 XBT</td></tr>
          <tr><td className="px-4 py-3 font-bold">ETH</td><td className="px-4 py-3">0.02 ETH</td><td className="px-4 py-3">0.005 ETH</td></tr>
          <tr><td className="px-4 py-3 font-bold">USDT (ERC20)</td><td className="px-4 py-3">50 USDT</td><td className="px-4 py-3">15 USDT</td></tr>
          <tr><td className="px-4 py-3 font-bold">USDT (TRC20)</td><td className="px-4 py-3">10 USDT</td><td className="px-4 py-3">1 USDT</td></tr>
          <tr><td className="px-4 py-3 font-bold">SOL</td><td className="px-4 py-3">0.1 SOL</td><td className="px-4 py-3">0.01 SOL</td></tr>
        </tbody>
      </table>
    </Widget>
  </div>
);

export const ReferencesView: React.FC = () => {
  const [activeRefTab, setActiveRefTab] = useState('GettingStarted');

  const refSections = [
    { 
      title: 'Getting Started', 
      items: [
        { id: 'GettingStarted', label: 'Overview' },
        { id: 'IntroFutures', label: 'Introduction to Futures' },
        { id: 'MarginMode', label: 'Margin vs Cross Margin' },
        { id: 'Liquidation', label: 'Liquidation Rules' }
      ]
    },
    { 
      title: 'Fee Schedule', 
      items: [
        { id: 'TradingFees', label: 'Trading Fees' },
        { id: 'DepositFees', label: 'Deposit/Withdrawal Fees' }
      ]
    }
  ];

  const renderRefContent = () => {
    switch (activeRefTab) {
      case 'GettingStarted': return <GettingStartedDoc />;
      case 'IntroFutures': return <IntroductionToFuturesDoc />;
      case 'MarginMode': return <MarginVsCrossDoc />;
      case 'Liquidation': return <LiquidationRulesDoc />;
      case 'TradingFees': return <TradingFeesDoc />;
      case 'DepositFees': return <DepositWithdrawalFeesDoc />;
      default: return <GettingStartedDoc />;
    }
  };

  return (
    <div className="flex-1 flex gap-1 overflow-hidden h-full">
      <div className="w-72 bg-[var(--bg-surface)] border-r border-[var(--border-color)] p-6 overflow-auto theme-transition shrink-0">
        <div className="text-xl font-black text-[var(--text-primary)] mb-8 tracking-tighter">Knowledge Base</div>
        <div className="space-y-8">
          {refSections.map((section, idx) => (
            <div key={idx}>
              <div className="text-[10px] font-black uppercase text-emerald-500 mb-3 px-1 tracking-widest">{section.title}</div>
              <ul className="space-y-1">
                {section.items.map(item => (
                  <li key={item.id}>
                    <button 
                      onClick={() => setActiveRefTab(item.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-sm text-[11px] transition-all duration-200 ${
                        activeRefTab === item.id 
                          ? 'bg-emerald-500/10 text-emerald-500 font-bold border-l-2 border-emerald-500' 
                          : 'text-[var(--text-secondary)] hover:bg-slate-500/10 hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-4 bg-slate-500/5 rounded-sm border border-[var(--border-color)]">
          <div className="text-[9px] text-[var(--text-muted)] uppercase font-bold mb-2">Need Help?</div>
          <button className="w-full bg-emerald-600 text-white py-1.5 font-bold uppercase text-[9px] rounded-sm hover:bg-emerald-500">Contact Support</button>
        </div>
      </div>
      <div className="flex-1 p-10 overflow-auto bg-[var(--mono-bg)] theme-transition">
        <div className="max-w-4xl mx-auto">
          {renderRefContent()}
        </div>
      </div>
    </div>
  );
};

// --- Contracts Sub-component ---

export const ContractsView: React.FC = () => (
  <div className="flex-1 p-4 overflow-auto bg-[var(--mono-bg)] theme-transition">
    <div className="max-w-6xl mx-auto">
      <Widget title="Active Contract Specifications">
        <table className="w-full text-left mono text-[10px]">
          <thead className="bg-slate-500/10 text-[var(--text-muted)] uppercase font-bold sticky top-0">
            <tr>
              <th className="px-4 py-3">Symbol</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Tick Size</th>
              <th className="px-4 py-3">Contract Value</th>
              <th className="px-4 py-3">Max Leverage</th>
              <th className="px-4 py-3">Funding Rate</th>
              <th className="px-4 py-3">Settlement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {[
              { s: 'XBTUSD', t: 'Perpetual', ts: '0.5', cv: '1 USD', ml: '100x', fr: '0.0100%', st: 'Real-time' },
              { s: 'ETHUSD', t: 'Perpetual', ts: '0.01', cv: '1 USD', ml: '50x', fr: '0.0125%', st: 'Real-time' },
              { s: 'SOLUSD', t: 'Perpetual', ts: '0.001', cv: '1 SOL', ml: '25x', fr: '-0.0042%', st: 'Real-time' },
              { s: 'ADAUSD', t: 'Perpetual', ts: '0.0001', cv: '1 ADA', ml: '25x', fr: '0.0100%', st: 'Real-time' },
              { s: 'XBTZ23', t: 'Futures', ts: '0.5', cv: '1 USD', ml: '100x', fr: 'N/A', st: '2023-12-29' },
            ].map((c, i) => (
              <tr key={i} className="hover:bg-slate-500/5">
                <td className="px-4 py-3 font-black text-emerald-500">{c.s}</td>
                <td className="px-4 py-3 text-[var(--text-primary)]">{c.t}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{c.ts}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{c.cv}</td>
                <td className="px-4 py-3 text-[var(--text-primary)] font-bold">{c.ml}</td>
                <td className="px-4 py-3 text-emerald-400">{c.fr}</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{c.st}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Widget>
    </div>
  </div>
);

// --- API Sub-component ---

export const ApiView: React.FC = () => (
  <div className="flex-1 p-4 flex flex-col gap-4 overflow-auto bg-[var(--mono-bg)] theme-transition">
    <div className="max-w-6xl mx-auto w-full space-y-4">
      <div className="flex justify-between items-center bg-[var(--bg-surface)] p-4 border border-[var(--border-color)] rounded-sm">
        <div>
          <h2 className="text-lg font-black text-[var(--text-primary)]">API Management</h2>
          <p className="text-[var(--text-muted)] text-[10px]">Access our high-performance low-latency trading endpoints.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 font-bold uppercase rounded-sm text-[10px]">
          Create New API Key
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Widget title="Active Keys">
          <div className="p-4 space-y-4">
            <div className="bg-[var(--bg-main)] p-3 border border-emerald-500/20 rounded-sm">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-emerald-500">Production Key 01</span>
                <span className="text-rose-500 font-bold uppercase text-[9px] cursor-pointer">Revoke</span>
              </div>
              <div className="mono text-[10px] text-[var(--text-secondary)] break-all select-all">
                titan_live_8f239a2b001c4d92a01...
              </div>
              <div className="mt-2 flex gap-2">
                <span className="bg-slate-500/20 px-2 py-0.5 rounded text-[8px] text-[var(--text-muted)]">READ</span>
                <span className="bg-slate-500/20 px-2 py-0.5 rounded text-[8px] text-[var(--text-muted)]">TRADE</span>
              </div>
            </div>
          </div>
        </Widget>
        
        <Widget title="Developer Documentation Quickstart">
          <div className="p-4 space-y-4 font-mono text-[11px]">
            <div className="text-emerald-500 font-bold uppercase text-[9px]">Endpoint Example (POST /v1/order)</div>
            <pre className="bg-slate-900 text-slate-300 p-4 rounded-sm overflow-x-auto text-[10px]">
{`{
  "symbol": "XBTUSD",
  "orderQty": 100,
  "price": 62794.5,
  "ordType": "Limit",
  "side": "Buy"
}`}
            </pre>
            <div className="text-emerald-500 font-bold uppercase text-[9px]">Response</div>
            <pre className="bg-slate-900 text-slate-300 p-4 rounded-sm overflow-x-auto text-[10px]">
{`{
  "orderID": "550e8400-e29b-41d4-a716-446655440000",
  "transactTime": "2023-11-24T14:22:01.000Z",
  "status": "Accepted"
}`}
            </pre>
          </div>
        </Widget>
      </div>
    </div>
  </div>
);
