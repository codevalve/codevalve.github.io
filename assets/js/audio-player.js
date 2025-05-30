// assets/js/audio-player.js

document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = document.getElementById('audioPlayer');
  const audioSource = document.getElementById('audioSource');
  const rows = document.querySelectorAll('.track');

  let currentTrack = null;

  // Inject data-title and idle icon into track cells
  document
    .querySelectorAll('.playlist-table td:first-child')
    .forEach((cell) => {
      const text = cell.textContent.trim();
      cell.setAttribute('data-title', text);
      cell.innerHTML = `<span class="icon idle">▶</span> ${text}`;
    });

  function resetAllIcons() {
    document
      .querySelectorAll('.playlist-table td:first-child')
      .forEach((cell) => {
        const title = cell.getAttribute('data-title');
        if (title) {
          cell.innerHTML = `<span class="icon idle">▶</span> ${title}`;
        }
      });
  }

  function updateIcon(row, symbol, statusClass) {
    resetAllIcons();
    const cell = row.querySelector('td:first-child');
    const title = cell.getAttribute('data-title');
    if (title) {
      cell.innerHTML = `<span class="icon ${statusClass}">${symbol}</span> ${title}`;
    }
  }

  rows.forEach((row) => {
    row.addEventListener('click', (event) => {
      // Prevent affecting player when clicking home recording link
      if (event.target.tagName === 'A') return;

      const newSrc = row.getAttribute('data-src');

      if (currentTrack === row && !audioPlayer.paused) {
        audioPlayer.pause();
        return;
      }

      currentTrack = row;
      audioSource.src = newSrc;

      rows.forEach((r) => r.classList.remove('active'));
      row.classList.add('active');

      audioPlayer.load();
      audioPlayer.play();
    });
  });

  audioPlayer.addEventListener('play', () => {
    if (currentTrack) updateIcon(currentTrack, '❚❚', 'playing');
  });

  audioPlayer.addEventListener('pause', () => {
    if (currentTrack) updateIcon(currentTrack, '▶', 'paused');
  });
});
