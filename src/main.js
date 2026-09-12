import Phaser from 'phaser'
import './style.css'

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  create() {
    // Ground
    this.ground = this.add.rectangle(640, 680, 1280, 80, 0x444444)
    this.physics.add.existing(this.ground, true)

    // Player
    this.player = this.add.rectangle(200, 500, 50, 80, 0xffffff)
    this.physics.add.existing(this.player)

    this.player.body.setCollideWorldBounds(true)

    // Player / ground collision
    this.physics.add.collider(this.player, this.ground)

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys()

    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE
    })

    // Title
    this.add.text(20, 20, 'SHATTERED SOULS - Prototype', {
      fontFamily: 'Arial',
      fontSize: '28px',
      color: '#ffffff'
    })
  }

  update() {
    const speed = 300

    // Horizontal movement
    if (this.keys.left.isDown || this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed)
    } else if (this.keys.right.isDown || this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed)
    } else {
      this.player.body.setVelocityX(0)
    }

    // Jump
    const wantsToJump =
      Phaser.Input.Keyboard.JustDown(this.keys.jump) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.up)

    if (wantsToJump && this.player.body.blocked.down) {
      this.player.body.setVelocityY(-600)
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#111111',

  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        x: 0,
        y: 1200
      },
      debug: false
    }
  },

  scene: GameScene
}

new Phaser.Game(config)