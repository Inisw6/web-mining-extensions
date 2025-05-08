// 저장된 클릭 기록 불러와서 화면에 출력
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get({ clickedBlocks: [] }, data => {
      const list = data.clickedBlocks;
      const output = document.getElementById('output');
      if (!list.length) {
        output.textContent = '아직 클릭 기록이 없습니다.';
      } else {
        output.textContent = JSON.stringify(list, null, 2);
      }
    });
  
    // JSON 다운로드
    document.getElementById('exportBtn').addEventListener('click', () => {
      chrome.storage.local.get({ clickedBlocks: [] }, data => {
        const blob = new Blob([JSON.stringify(data.clickedBlocks, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
          url,
          filename: `clicked_blocks_${new Date().toISOString().replace(/[:.]/g,'-')}.json`,
          saveAs: true
        });
      });
    });
  });