---
layout: post
title: "Beginning to Forget: Imagining the Elvis Songs That Never Were – With a Little Help from AI"
date: 2025-05-01
categories: [music, AI, elvis]
author: codevalve
image:
    path: "/assets/img/mid-century-console-beginning-to-forget-720.png"
    alt: "A photo of a record console that has the album cover laying on the top."
---

## The Heart Behind the Tracks

Elvis’s catalog is rich and revered, but scattered among the studio sessions and live performances are intimate recordings — tapes of him playing at home, rehearsing with friends, or casually strumming through favorite tunes. Some of these songs were never released commercially. Others were merely captured in fleeting moments, unfinished and raw.

This project aims to honor those forgotten corners of his repertoire. Titles like **“I’m Beginning to Forget You,”** **“The Titles Will Tell,”** and **“Apron Strings”** may not top streaming charts, but to devoted fans, they carry emotional weight and curiosity. What if he had gone into RCA Studio B and recorded them with full backing?

## Where AI Steps In

To explore that “what if,” we turned to [**Suno.com**](https://suno.com), a cutting-edge AI music generation platform. Rather than merely cover these songs ourselves or use impersonators, we used AI to *simulate* the production style and vocal timbre that might have surrounded Elvis had these tracks been recorded during his Hawaii years — the golden-era energy of *Blue Hawaii*, *Fun in Acapulco*, and *Viva Las Vegas*.

The result? An evocative, stylized sonic portrait of what these songs *could* have sounded like — lush with ukuleles, steel guitar, harmony stacks, and period-correct rhythm sections. While AI can’t replace the King, it can give us a beautifully rendered glimpse into an alternate musical timeline.

## Designing the Fantasy

![Beginning to forget cover](/assets/img/beginning-to-forget-250.png)

To complete the experience, we designed custom album and track covers in a mid-century modern Hawaiian style — vibrant, playful, and era-authentic. Each song was given its own artwork to mirror the aesthetic of Elvis’s cinematic years, evoking surfboard sunsets, tropical florals, and retro fonts reminiscent of 1960s vinyl jackets.

## Why This Matters (And Who It’s For)

This project is twofold in purpose:

1. **For the fans**: A creative tribute to Elvis’s lesser-known songs, celebrating his voice and musical curiosity through the lens of new technology.
2. **For the curious**: A testbed for exploring the current capabilities and limitations of AI in music generation. What can tools like Suno achieve when guided by careful prompting and respectful intent? Can AI help us rediscover cultural artifacts in meaningful ways?

<h3>🎧 Listen to "Beginning to Forget"</h3>

<style>
  .playlist-container {
    max-width: 700px;
    border: 1px solid #ccc;
    padding: 1em;
    border-radius: 8px;
    font-family: sans-serif;
  }
  .playlist-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1em;
  }
  .playlist-table th,
  .playlist-table td {
    text-align: left;
    padding: 0.5em;
    vertical-align: top;
  }
  .playlist-table tr:hover {
    background-color: #f9f9f9;
    cursor: pointer;
  }
  .playlist-table .active {
    font-weight: bold;
    background-color: #e0f7fa;
  }
</style>

<div class="playlist-container">
  <audio id="audioPlayer" controls style="width: 100%;">
    <source id="audioSource" src="/assets/audio/im-beginning-to-forget-you.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>

  <table class="playlist-table">
    <thead>
      <tr>
        <th>AI Version</th>
        <th>Based on Home Recording Source</th>
      </tr>
    </thead>
    <tbody id="playlist">
      <tr class="track active" data-src="/assets/audio/im-beginning-to-forget-you.mp3">
        <td>I'm Beginning to Forget You</td>
        <td>Graceland Reel-to-Reel Tape</td>
      </tr>
      <tr class="track" data-src="/assets/audio/apron-strings-blue-hawaii.mp3">
        <td>Apron Strings (Blue Hawaii)</td>
        <td>Informal Rehearsal (1960)</td>
      </tr>
      <tr class="track" data-src="/assets/audio/theres-no-tomorrow.mp3">
        <td>There's No Tomorrow</td>
        <td>Radio Performance Rehearsal</td>
      </tr>
      <tr class="track" data-src="/assets/audio/i-understand.mp3">
        <td>I Understand...</td>
        <td>Graceland Piano Demo</td>
      </tr>
      <tr class="track" data-src="/assets/audio/the-titles-will-tell.mp3">
        <td>The Titles Will Tell</td>
        <td>Private Home Tape</td>
      </tr>
      <tr class="track" data-src="/assets/audio/apron-strings-vegas-review.mp3">
        <td>Apron Strings (Vegas Review)</td>
        <td>Dressing Room Cassette</td>
      </tr>
      <tr class="track" data-src="/assets/audio/apron-strings-fun-in-acapulco.mp3">
        <td>Apron Strings (Fun in Acapulco)</td>
        <td>Movie Set Rehearsal (1962)</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
  const audioPlayer = document.getElementById("audioPlayer");
  const audioSource = document.getElementById("audioSource");
  const rows = document.querySelectorAll(".track");

  rows.forEach(row => {
    row.addEventListener("click", () => {
      rows.forEach(r => r.classList.remove("active"));
      row.classList.add("active");
      const newSrc = row.getAttribute("data-src");
      audioSource.src = newSrc;
      audioPlayer.load();
      audioPlayer.play();
    });
  });
</script>

## Looking Ahead

AI-generated music is still in its infancy, but it’s evolving fast. *Beginning to Forget* shows that — with the right direction — AI can serve as a time machine, not just a novelty. It can resurrect lost possibilities and help us appreciate the past with new ears.

We’re not claiming to recreate Elvis. But we are inviting listeners to dream, to imagine, and to listen closely to the songs that history almost forgot.

Next up, we’re working on a companion project: **Memories of Grace**, a set of gospel-inspired tracks crafted in the same spirit. These are songs we hope the King would smile to hear — a heartfelt tribute to the side of Elvis that found solace, strength, and joy in gospel music.
