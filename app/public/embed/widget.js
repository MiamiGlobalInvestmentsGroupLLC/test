(function () {
  if (window.__MGI_WIDGET__) return;
  window.__MGI_WIDGET__ = true;

  var style = document.createElement('style');
  style.textContent = `
    @keyframes mgi-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
    .mgi-bubble { position: fixed; bottom: 20px; right: 20px; width: 64px; height: 64px; border-radius: 9999px;
      background: linear-gradient(135deg,#ff62a1,#7a5cff,#00c2ff); box-shadow: 0 10px 30px rgba(0,0,0,.25); cursor: pointer; z-index: 2147483647; display:flex; align-items:center; justify-content:center; animation: mgi-bounce 2s infinite; }
    .mgi-bubble:hover { transform: scale(1.05); }
    .mgi-frame { position: fixed; bottom: 100px; right: 20px; width: 380px; height: 560px; border: none; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,.3); z-index: 2147483647; display: none; overflow: hidden; }
    .mgi-close { position:absolute; top:8px; right:8px; background: rgba(255,255,255,.9); border:none; border-radius: 8px; padding:6px 10px; font-weight:600; cursor:pointer; }
  `;
  document.head.appendChild(style);

  var bubble = document.createElement('div');
  bubble.className = 'mgi-bubble';
  bubble.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M20 2H4a2 2 0 0 0-2 2v17l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>';
  document.body.appendChild(bubble);

  var iframe = document.createElement('iframe');
  iframe.className = 'mgi-frame';
  var src = (window.MGI_CHAT_BASE || window.location.origin) + '/embed/frame';
  iframe.src = src;
  document.body.appendChild(iframe);

  bubble.addEventListener('click', function(){
    iframe.style.display = iframe.style.display === 'none' || iframe.style.display === '' ? 'block' : 'none';
  });
})();
