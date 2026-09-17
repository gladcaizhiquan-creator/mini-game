import Phaser from 'phaser'

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

    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('GameScene'))
  }
}