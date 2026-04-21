// zenian.js — shared Zenian modal, include on any page
(function(){
  const CSS=`
#zenian-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:1000;backdrop-filter:blur(6px)}
#zenian-modal{display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#08080f;border:1px solid #6b21a8;border-radius:14px;z-index:1001;width:min(560px,95vw);max-height:88vh;overflow-y:auto;font-family:'Segoe UI',system-ui,sans-serif;scrollbar-width:thin;scrollbar-color:#1e1e2e #080810}
#zenian-modal::-webkit-scrollbar{width:4px}
#zenian-modal::-webkit-scrollbar-track{background:#080810}
#zenian-modal::-webkit-scrollbar-thumb{background:#1e1e2e;border-radius:2px}
.zm-header{display:flex;align-items:center;justify-content:space-between;padding:1.4rem 1.4rem 0}
.zm-logo{display:flex;align-items:center;gap:12px}
.zm-logo-icon{width:44px;height:44px;background:linear-gradient(135deg,#6b21a8,#a855f7);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.zm-name{font-size:20px;font-weight:900;color:#f0f0f0;letter-spacing:-0.02em}
.zm-tagline{font-size:11px;color:#555;letter-spacing:0.05em;margin-top:2px}
.zm-close{background:none;border:none;color:#444;font-size:20px;cursor:pointer;padding:4px 8px;transition:color .2s;line-height:1}
.zm-close:hover{color:#f0f0f0}
.zm-pricing{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:1.2rem 1.4rem}
.zm-plan{background:#0e0e1a;border:.5px solid #1e1e2e;border-radius:8px;padding:10px;text-align:center;transition:border-color .2s}
.zm-plan.featured{border-color:#6b21a8}
.zm-plan-name{font-size:10px;letter-spacing:0.15em;color:#555;text-transform:uppercase;margin-bottom:4px}
.zm-plan-price{font-size:18px;font-weight:800;color:#f0f0f0;letter-spacing:-0.02em;font-family:'Courier New',monospace}
.zm-plan-price span{font-size:11px;color:#555;font-weight:400}
.zm-plan.featured .zm-plan-price{color:#a855f7}
.zm-stats{display:flex;gap:0;border-top:.5px solid #1a1a2a;border-bottom:.5px solid #1a1a2a;margin:0 1.4rem}
.zm-stat{flex:1;padding:12px;text-align:center;border-right:.5px solid #1a1a2a}
.zm-stat:last-child{border-right:none}
.zm-stat-num{display:block;font-size:22px;font-weight:900;color:#6b21a8;font-family:'Courier New',monospace;letter-spacing:-0.02em}
.zm-stat-label{font-size:9px;letter-spacing:0.2em;color:#444;text-transform:uppercase;margin-top:2px;display:block}
.zm-features-title{font-size:10px;letter-spacing:0.2em;color:#6b21a8;text-transform:uppercase;padding:1.2rem 1.4rem 0.6rem;border-top:.5px solid #1a1a2a;margin-top:1rem}
.zm-features{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 1.4rem}
.zm-feature{background:#0e0e1a;border:.5px solid #1a1a2a;border-radius:8px;padding:10px 12px;display:flex;gap:10px;align-items:flex-start;transition:border-color .2s}
.zm-feature:hover{border-color:#6b21a8}
.zm-fi{font-size:18px;flex-shrink:0;margin-top:1px}
.zm-feature strong{display:block;font-size:12px;color:#f0f0f0;margin-bottom:3px;font-weight:700}
.zm-feature p{font-size:11px;color:#555;line-height:1.5;margin:0}
.zm-hiring{background:#0c0c18;border:.5px solid #1e1e2e;border-radius:10px;margin:1.2rem 1.4rem 0;padding:1.2rem}
.zm-hiring-title{font-size:12px;font-weight:700;color:#f0f0f0;margin-bottom:0.6rem;letter-spacing:0.02em}
.zm-hiring p{font-size:12px;color:#666;line-height:1.6}
.zm-tiers{display:flex;gap:8px;margin-top:0.8rem;flex-wrap:wrap}
.zm-tier{background:#0e0e1a;border:.5px solid #1e1e2e;border-radius:6px;padding:8px 12px;display:flex;align-items:center;gap:8px;flex:1;min-width:120px}
.zm-tier-icon{font-size:16px}
.zm-tier strong{display:block;font-size:12px;color:#f0f0f0}
.zm-tier span{font-size:10px;color:#555}
.zm-footer{display:flex;align-items:center;gap:10px;padding:1.2rem 1.4rem;border-top:.5px solid #1a1a2a;margin-top:1.2rem;flex-wrap:wrap}
.zm-btn{display:inline-block;padding:9px 20px;border-radius:6px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;transition:background .2s,border-color .2s}
.zm-btn.primary{background:#6b21a8;color:#fff}
.zm-btn.primary:hover{background:#7c3aed}
.zm-btn.secondary{background:transparent;border:.5px solid #2a2a3a;color:#ccc}
.zm-btn.secondary:hover{border-color:#6b21a8;color:#fff}
.zm-dev{margin-left:auto;font-size:10px;color:#2a2a3a;letter-spacing:0.1em}
.zenian-badge{display:inline-flex;align-items:center;gap:5px;background:linear-gradient(135deg,rgba(107,33,168,0.15),rgba(168,85,247,0.1));border:.5px solid rgba(107,33,168,0.4);border-radius:20px;padding:4px 12px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#a855f7;cursor:pointer;transition:border-color .2s,background .2s;user-select:none}
.zenian-badge:hover{border-color:#a855f7;background:rgba(107,33,168,0.25)}
@media(max-width:480px){.zm-features{grid-template-columns:1fr}.zm-pricing{grid-template-columns:repeat(2,1fr)}.zm-tiers{flex-direction:column}}
`;
  const style=document.createElement('style');style.textContent=CSS;document.head.appendChild(style);

  const HTML=`
<div id="zenian-overlay" onclick="closeZenian()"></div>
<div id="zenian-modal">
  <div class="zm-header">
    <div class="zm-logo">
      <div class="zm-logo-icon">⚡</div>
      <div>
        <div class="zm-name">Zenian</div>
        <div class="zm-tagline">The ultimate all-in-one Discord management bot</div>
      </div>
    </div>
    <button class="zm-close" onclick="closeZenian()">✕</button>
  </div>

  <div class="zm-pricing">
    <div class="zm-plan"><div class="zm-plan-name">Free</div><div class="zm-plan-price">$0</div></div>
    <div class="zm-plan"><div class="zm-plan-name">Basic</div><div class="zm-plan-price">$2.99<span>/mo</span></div></div>
    <div class="zm-plan featured"><div class="zm-plan-name">Premium</div><div class="zm-plan-price">$4.99<span>/mo</span></div></div>
    <div class="zm-plan"><div class="zm-plan-name">Lifetime</div><div class="zm-plan-price">Available</div></div>
  </div>

  <div class="zm-stats">
    <div class="zm-stat"><span class="zm-stat-num">235+</span><span class="zm-stat-label">Commands</span></div>
    <div class="zm-stat"><span class="zm-stat-num">24/7</span><span class="zm-stat-label">Uptime</span></div>
    <div class="zm-stat"><span class="zm-stat-num">80+</span><span class="zm-stat-label">Event Logs</span></div>
  </div>

  <div class="zm-features-title">What Zenian can do</div>
  <div class="zm-features">
    <div class="zm-feature"><span class="zm-fi">🎮</span><div><strong>Roblox Integration</strong><p>Verification, group role sync and rank management directly in your server.</p></div></div>
    <div class="zm-feature"><span class="zm-fi">🎫</span><div><strong>Ticket System</strong><p>Transcripts, staff claiming, priority routing and full ticket category management.</p></div></div>
    <div class="zm-feature"><span class="zm-fi">🛡️</span><div><strong>Auto Mod & Anti-Raid</strong><p>Advanced automod, anti-raid protection and cross-server network blacklists.</p></div></div>
    <div class="zm-feature"><span class="zm-fi">📊</span><div><strong>Leveling System</strong><p>XP, leaderboards, role rewards and customizable level-up announcements.</p></div></div>
    <div class="zm-feature"><span class="zm-fi">🎭</span><div><strong>Role Management</strong><p>Auto roles, reaction roles with buttons & dropdowns, requests and server stats.</p></div></div>
    <div class="zm-feature"><span class="zm-fi">🔔</span><div><strong>Twitch & YouTube Alerts</strong><p>Per-server live notifications for both platforms with custom messages.</p></div></div>
    <div class="zm-feature"><span class="zm-fi">🎉</span><div><strong>Engagement Tools</strong><p>Giveaways, suggestions, bug reports, invite tracking with bonuses and sticky messages.</p></div></div>
    <div class="zm-feature"><span class="zm-fi">🖥️</span><div><strong>Web Dashboard</strong><p>Full management dashboard at zenian.org — configure everything from the browser.</p></div></div>
  </div>

  <div class="zm-hiring">
    <div class="zm-hiring-title">📣 We're Hiring Support Reps!</div>
    <p>Active, helpful, and want to be part of a growing bot community? Handle tickets, guide users, report bugs and earn perks — including a staff role, dashboard keys and access to the support panel at zenian.org.</p>
    <div class="zm-hiring-title" style="margin-top:1rem">💼 Become a Reseller</div>
    <p>Sell Zenian keys and earn commission through a tiered system with weekly payouts via PayPal, CashApp or Robux.</p>
    <div class="zm-tiers">
      <div class="zm-tier"><span class="zm-tier-icon">🥉</span><div><strong>Starter</strong><span>15% commission</span></div></div>
      <div class="zm-tier"><span class="zm-tier-icon">🥈</span><div><strong>Pro</strong><span>25% + 25% off retail</span></div></div>
      <div class="zm-tier"><span class="zm-tier-icon">🥇</span><div><strong>Elite</strong><span>35% + 35% off retail</span></div></div>
    </div>
    <p style="margin-top:0.8rem;font-size:11px;color:#444">Open a ticket in the Discord to apply for either role!</p>
  </div>

  <div class="zm-footer">
    <a href="https://zenian.org" target="_blank" class="zm-btn primary">Visit zenian.org</a>
    <a href="https://discord.gg/zenian" target="_blank" class="zm-btn secondary">Join Discord</a>
    <div class="zm-dev">by George__Washington</div>
  </div>
</div>`;

  const div=document.createElement('div');div.innerHTML=HTML;
  document.body.appendChild(div);

  window.openZenian=function(){
    document.getElementById('zenian-overlay').style.display='block';
    document.getElementById('zenian-modal').style.display='block';
  };
  window.closeZenian=function(){
    document.getElementById('zenian-overlay').style.display='none';
    document.getElementById('zenian-modal').style.display='none';
  };
  document.addEventListener('keydown',e=>{if(e.key==='Escape')window.closeZenian();});
})();
