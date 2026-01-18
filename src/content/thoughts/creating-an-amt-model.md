---
title: Creating a state of the art AMT model
date: 2026-01-18
description: My journey creating an AMT model from scratch.
slug: creating-a-state-of-the-art-amt-model
published: true
---

I recently left a rewarding yet time consuming job working as a software engineer at [spring.new](https://spring.new), and have been since using my free time to work on personal projects.

My magnum opus has been to create an app to convert audio to guitar tabs.

The popular community driven tab platform [Songsterr](https://songsterr.com) has recently added this feature to their website, and it has been suprisingly good.

The problem is that this feature is aggresively behind a paywall, and requires a pro membership to their platform to generate tabs more than 10 seconds long.

I have been committed to reverse engineering how they do it, and have been reading many recent research papers from data scientists who have dedicated their whole lives to the art of AMT (automatic music transcription).

After making Claude Opus 4.5 perform hours of deep research for me, I feel confident on how to create a state of the art pipeline for creating an automatic transcription model in 2026, using all the tools that are available.

There are a few important things to consider however:

1. Should the transcription support full band mixes, or just guitar?
2. Should the transcription reflect guitar techniques, such as pitch bends / legato / slides / hammer-ons pull offs, etc.

For supporting accurate transcriptions of full band mixes, it will be much more involved and require terrabytes of music data. However, for supporting raw guitar, it is realtively more straightforward.

The main idea is to first run the audio through a stem seperator model (demucs for example), then take the isolated guitar and send it to yourMT3+, a model from Magenta labs.

The yourMT3+ model should be fine-tuned on numerous datasets tailored for guitar specific transcriptions.

I am making excellent progress, using [Modal](https://modal.com) for all my inference / fine-tuning and model training purposes, and will continue updating my journey.
