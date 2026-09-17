function output(sound) {
  return sound.masterMuteNode || sound.masterVolumeNode || sound.context.destination
}

function resume(sound) {
  if (sound.context && sound.context.state === 'suspended') {
    sound.context.resume()
  }
}

function tone(sound, opts) {
  const ctx = sound.context
  if (!ctx) return

  const {
    type = 'square',
    from = 440,
    to = from,
    duration = 0.15,
    gain = 0.2,
    delay = 0,
  } = opts

  const t0 = ctx.currentTime + delay
  const osc = ctx.createOscillator()
  const amp = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(from, t0)
  if (to !== from) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(to, 1), t0 + duration)
  }

  amp.gain.setValueAtTime(0.0001, t0)
  amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.012)
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)

  osc.connect(amp)
  amp.connect(output(sound))

  osc.start(t0)
  osc.stop(t0 + duration + 0.03)
}

export function playCoin(sound) {
  if (!sound || !sound.context) return
  resume(sound)
  tone(sound, { type: 'triangle', from: 988, to: 988, duration: 0.07, gain: 0.22 })
  tone(sound, { type: 'triangle', from: 1319, to: 1319, duration: 0.14, gain: 0.22, delay: 0.06 })
}

export function playStart(sound) {
  if (!sound || !sound.context) return
  resume(sound)
  const notes = [523, 659, 784, 1047]
  notes.forEach((freq, i) => {
    tone(sound, {
      type: 'square',
      from: freq,
      to: freq,
      duration: 0.12,
      gain: 0.18,
      delay: i * 0.08,
    })
  })
}

export function playHit(sound) {
  if (!sound || !sound.context) return
  resume(sound)
  tone(sound, { type: 'sawtooth', from: 320, to: 60, duration: 0.45, gain: 0.28 })
  tone(sound, { type: 'square', from: 180, to: 40, duration: 0.5, gain: 0.18, delay: 0.02 })
}

export function playGameOver(sound) {
  if (!sound || !sound.context) return
  resume(sound)
  const notes = [392, 330, 262, 196]
  notes.forEach((freq, i) => {
    tone(sound, {
      type: 'triangle',
      from: freq,
      to: freq,
      duration: 0.18,
      gain: 0.2,
      delay: i * 0.14,
    })
  })
}
