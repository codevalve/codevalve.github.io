// assets/js/audio-player.js

document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = document.getElementById('audioPlayer');
  const audioSource = document.getElementById('audioSource');
  const rows = document.querySelectorAll('.track');

  let currentTrack = null;

  // Inject data-title into track cells
  document
    .querySelectorAll('.playlist-table td:first-child')
    .forEach((cell) => {
      if (!cell.getAttribute('data-title')) {
        cell.setAttribute('data-title', cell.textContent.trim());
      }
    });

  function resetAllIcons() {
    document.querySelectorAll('.track td:first-child').forEach((cell) => {
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
    row.addEventListener('click', () => {
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

// CSS suggestion for icon coloring:
// .icon.idle { color: #ccc; }
// .icon.paused { color: #FF5E49; }
// .icon.playing { color: #FF5E49; }
