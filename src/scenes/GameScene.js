import Phaser from 'phaser'

const PLAYER_SPEED = 320
const COIN_INTERVAL = 900

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  create() {
    this.score = 0
    this.isGameOver = false
    this.lastCoinAt = 0

    this.player = this.physics.add.sprite(
      this.scale.width / 2,
      this.scale.height - 60,
      'player',
    )
    this.player.setCollideWorldBounds(true)

    this.coins = this.physics.add.group()
    this.spikes = this.physics.add.group()

    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '22px',
      color: '#ffffff',
    })

    this.cursors = this.input.keyboard.createCursorKeys()
    this.wasd = this.input.keyboard.addKeys('W,A,S,D')

    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      null,
      this,
    )
    this.physics.add.overlap(
      this.player,
      this.spikes,
      this.hitSpike,
      null,
      this,
    )
  }

  update(time) {
    if (this.isGameOver) return

    const left = this.cursors.left.isDown || this.wasd.A.isDown
    const right = this.cursors.right.isDown || this.wasd.D.isDown

    if (left) {
      this.player.setVelocityX(-PLAYER_SPEED)
    } else if (right) {
      this.player.setVelocityX(PLAYER_SPEED)
    } else {
      this.player.setVelocityX(0)
    }

    if (time > this.lastCoinAt + COIN_INTERVAL) {
      this.lastCoinAt = time
      this.spawnCoin()
      if (this.score > 3 && Phaser.Math.Between(0, 2) === 0) {
        this.spawnSpike()
      }
    }

    this.coins.getChildren().forEach((coin) => {
      if (coin.y > this.scale.height + 40) coin.destroy()
    })
    this.spikes.getChildren().forEach((spike) => {
      if (spike.y > this.scale.height + 40) spike.destroy()
    })
  }

  spawnCoin() {
    const x = Phaser.Math.Between(40, this.scale.width - 40)
    const coin = this.coins.create(x, -20, 'coin')
    coin.setVelocityY(Phaser.Math.Between(150, 240))
    coin.setCircle(12)
  }

  spawnSpike() {
    const x = Phaser.Math.Between(40, this.scale.width - 40)
    const spike = this.spikes.create(x, -20, 'spike')
    spike.setVelocityY(Phaser.Math.Between(200, 300))
  }

  collectCoin(_player, coin) {
    coin.destroy()
    this.score += 1
    this.scoreText.setText(`Score: ${this.score}`)
  }

  hitSpike() {
    this.isGameOver = true
    this.physics.pause()
    this.player.setTint(0xff0000)

    const { width, height } = this.scale
    this.add
      .text(width / 2, height / 2 - 30, 'Game Over', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '52px',
        color: '#f87171',
      })
      .setOrigin(0.5)
    this.add
      .text(width / 2, height / 2 + 30, `Final score: ${this.score}`, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(0.5)
    this.add
      .text(width / 2, height / 2 + 80, 'Press SPACE to play again', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        color: '#9ca3af',
      })
      .setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => this.scene.restart())
  }
}