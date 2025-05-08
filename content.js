// 즉시 실행 함수로 감싸기
(() => {
    // 클릭 요소 정보를 팝업과 공유하기 위해 storage에 저장
    function saveClick(info) {
      chrome.storage.local.get({ clickedBlocks: [] }, data => {
        const updated = data.clickedBlocks;
        updated.push(info);
        chrome.storage.local.set({ clickedBlocks: updated });
      });
    }
  
    // 클릭 이벤트 리스너
    document.addEventListener('click', event => {
      const el = event.target.closest('div, section, article, li, button') || event.target;
      const info = {
        tag: el.tagName.toLowerCase(),
        className: el.className || null,
        id: el.id || null,
        text: (el.innerText || '').trim().slice(0, 200),
        url: location.href,
        timestamp: new Date().toISOString()
      };
  
      // 화면 우측 상단에 디버깅용 오버레이 표시
      let overlay = document.getElementById('click-debug-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'click-debug-overlay';
        Object.assign(overlay.style, {
          position: 'fixed',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          zIndex: 999999,
          maxWidth: '300px',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace'
        });
        document.body.appendChild(overlay);
      }
      overlay.textContent = 
        `✽ tag: <${info.tag}>\n` +
        `✽ class: ${info.className || '(없음)'}\n` +
        `✽ id: ${info.id || '(없음)'}\n` +
        `✽ text: ${info.text || '(빈 문자열)'}\n` +
        `✽ time: ${info.timestamp}`;
  
      // storage에 저장
      saveClick(info);
    });
  })();