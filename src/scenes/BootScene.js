import Phaser from 'phaser'

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  preload() {
    this.load.setBaseURL('')
  }

  create() {
    this.generateTextures()
    this.scene.start('MenuScene')
  }

  generateTextures() {
    const g = this.make.graphics({ x: 0, y: 0, add: false })

    g.fillStyle(0x4ade80, 1)
    g.fillRoundedRect(0, 0, 32, 32, 8)
    g.generateTexture('player', 32, 32)
    g.clear()

    g.fillStyle(0xfacc15, 1)
    g.fillCircle(12, 12, 12)
    g.generateTexture('coin', 24, 24)
    g.clear()

    g.fillStyle(0xf87171, 1)
    g.fillTriangle(16, 0, 32, 32, 0, 32)
    g.generateTexture('spike', 32, 32)
    g.destroy()
  }
}