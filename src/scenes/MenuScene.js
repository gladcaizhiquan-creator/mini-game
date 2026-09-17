import Phaser from 'phaser'
import { playStart } from '../audio/sfx.js'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene')
  }

  create() {
    const { width, height } = this.scale

    this.add
      .text(width / 2, height / 2 - 60, 'Coin Collector', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '48px',
        color: '#ffffff',
      })
      .setOrigin(0.5)

    const hint = this.add
      .text(width / 2, height / 2 + 20, 'Press SPACE to start', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '22px',
        color: '#9ca3af',
      })
      .setOrigin(0.5)

    this.tweens.add({
      targets: hint,
      alpha: 0.2,
      duration: 700,
      yoyo: true,
      repeat: -1,
    })

    this.input.keyboard.once('keydown-SPACE', () => {
      playStart(this.sound)
      this.scene.start('GameScene')
    })

    this.input.keyboard.on('keydown-M', () => {
      this.sound.mute = !this.sound.mute
    })

    this.add
      .text(width / 2, height - 24, 'M: mute / unmute', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#6b7280',
      })
      .setOrigin(0.5)
  }
}