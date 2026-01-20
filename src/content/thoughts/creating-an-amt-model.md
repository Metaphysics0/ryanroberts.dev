---
title: Creating a state of the art AMT model with Modal
date: 2026-01-18
description: My journey creating an AMT model from scratch.
slug: creating-a-state-of-the-art-amt-model
published: true
---

I recently left a rewarding yet time consuming career working as a founding engineer at [spring.new](https://spring.new) (AI native workspace for businesses building internal tools), and I have been since using my free time to work on personal projects.

My magnum opus has been to create a state of the art app for converting audio signal to guitar tabs. This field of data science is called AMT - Automatic Music Transcription.

The popular community driven tab platform [Songsterr](https://songsterr.com) has recently added this feature to their website, and it has been suprisingly good.

The problem is that this feature is aggresively behind a paywall, and requires a pro membership to their platform to generate tabs more than 10 seconds long.

I have been committed to reverse engineering how they do it, and have been reading many recent research papers from data scientists who have dedicated their whole lives to the art of AMT (automatic music transcription).

After making Claude Opus 4.5 perform hours of deep research for me ([paper 1](https://claude.ai/public/artifacts/fc3ac10d-f21a-4934-baef-9ec59e4bd94c) and [paper 2](https://claude.ai/public/artifacts/f7f95a84-621e-4299-956e-47128267acab)), I feel confident on how to create a state of the art pipeline for creating a state-of-the-art automatic transcription model in 2026, using all the tools and datasets that are publicly available.

There are a few important things to consider however:

1. Should the transcription support full band mixes, or just guitar?
2. Should the transcription reflect guitar techniques, such as pitch bends / legato / slides / hammer-ons pull offs, etc.

For supporting accurate transcriptions of full band mixes, it will be much more involved and require terrabytes of music data. However, for supporting raw guitar, it is realtively more straightforward.

## The Plan:

The main idea is to first run the audio through a stem separator model ([demucs](https://github.com/facebookresearch/demucs) for example), then take the isolated guitar and send it to [yourMT3+](https://huggingface.co/papers/2407.04822), a model from Magenta labs.

The yourMT3+ model should be fine-tuned on numerous datasets tailored for guitar specific transcriptions.
Some research backed datasets include:

1. [GOAT](https://arxiv.org/abs/2509.22655) - 35.4 hours of paired audio with actual tablature annotations, including technique labels for bends, slides, vibrato, hammer-ons, pull-offs, and palm mutes.
2. [GuitarSet](https://audias.ii.uam.es/2023/05/19/guitarset-a-dataset-for-guitar-transcription/) - 3.5 hours of acoustic guitar with hexaphonic per-string annotations.
3. [GAPS](https://www.semanticscholar.org/paper/Towards-Automatic-Transcription-of-Polyphonic-A-New-Chen-Hsiao/8b9f24fd8e31c0dff25670ae2102201d3620a940) - 14 hours of classical guitar from 200+ YouTube performers—largest real guitar dataset.
4. [EGDB](https://www.semanticscholar.org/paper/Towards-Automatic-Transcription-of-Polyphonic-A-New-Chen-Hsiao/8b9f24fd8e31c0dff25670ae2102201d3620a940) - 2 hours of electric guitar through 6 amplifier tones—addresses tonal variation.
5. [Guitar-TECHS](https://arxiv.org/pdf/2501.03720) - 5+ hours with technique annotations and multi-perspective recordings.
6. [SynthTab](https://synthtab.dev/) - 6,700 hours of synthetic audio across 15,211 tracks and 23 timbres.

### Execution phases:

- **Phase 1 (MVP)**: Fine-tune YourMT3+ on GuitarSet + GOAT for solo guitar transcription. Implement Fretting-Transformer for tablature generation. Target 85% F1 on clean recordings—sufficient for a practice/learning tool.
- **Phase 2 (Differentiation)**: Add technique detection using TART's approach or Basic Pitch's pitch bend output. Implement a user correction interface. This closes the gap with Songsterr's quality.
- **Phase 3 (Full Competition)**: Train on SynthTab's hundreds of hours of synthetic data for cross-genre generalization. Add style-specific models (rock, jazz, fingerpicking). Consider multi-modal input (video of fretboard + audio) for maximum accuracy.

I am making excellent progress, using [Modal](https://modal.com) for all my inference / fine-tuning and model training purposes, and will continue updating my journey.

## Modal??

After researching various platforms to provide the AI Infrastructure for this task, I narrowed down my requirements.

1. On demand GPU rentals, paying only for the compute time used.
2. Ability to deploy inference HTTP endpoints, like Replicate.
3. Fine-tuning models with Python.
4. A developer friendly SDK.

A few platforms I found were [VastAI](https://vast.ai/), [Runpod](https://www.runpod.io/), and last but not least, [Modal](https://modal.com).

Without diving too much into the other platforms, what captured me right away with Modal was the **incredible developer experience** - the lightning fast iterative feedback loop for training models, immediate serverless deployment GPU access, sandboxed containerized environments, with an experience that **almost feels local** - i am at a loss for words.

I am not a data scientist, and have never done any traditional ML work in my life, and the fact that I'm able to get working examples of my end vision in mere seconds with just a few lines of Python is absolutely incredible. A single developer using Modal today can replace a whole team of data scientists.

The same way that [Vercel](https://vercel.com) figured out everything related to the web development infrastructure, Modal figured out for AI and ML.

They are my dream company to work for, and the engineering team behind the platform is absolutely rock-solid. I watched tons of videos of their CEO Erik Bernhardsson, and have been learning a lot in the process.
