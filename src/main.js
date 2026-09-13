import Phaser from 'phaser'
import './style.css'

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  create() {
    
    this.physics.world.setBounds(0, 0, 6000, 1400)
    
    // Ground
    this.ground = this.add.rectangle(2600, 680, 5200, 80, 0x444444)
    this.physics.add.existing(this.ground, true)
    
    // Boss arena floor
    this.bossFloor = this.add.rectangle(5200, 1260, 1600, 80, 0x444444)
    this.physics.add.existing(this.bossFloor, true)
    this.boss = this.add.rectangle(4800, 1100, 100, 160, 0x800080)
    this.physics.add.existing(this.boss)
    this.boss.body.setCollideWorldBounds(true)
    this.physics.add.collider(this.boss, this.bossFloor)

    this.bossHealth = 1000
    
    
    // Platforms
    this.platform = this.add.rectangle(700, 560, 220, 30, 0x666666)
    this.physics.add.existing(this.platform, true)
    this.platform2 = this.add.rectangle(1000, 450, 220, 30, 0x666666)
    this.physics.add.existing(this.platform2, true)
    

    // Player
    this.player = this.add.rectangle(200, 500, 50, 80, 0xffffff)
    this.physics.add.existing(this.player)

    this.player.body.setCollideWorldBounds(true)
    this.cameras.main.startFollow(this.player)

    // Player facing direction
    this.facing = 'right'
    this.isDodging = false
    this.canDodge = true
    this.isInvulnerable = false
    this.playerHealth = 500
    this.maxStamina = 100
    this.stamina = 100
    this.canTakeDamage = true
    this.isDead = false
    this.isAttacking = false
    this.swordDamage = 150
    this.attackHasHit = false
    this.swordHitbox = this.add.rectangle(0, 0, 40, 60, 0xffff00)
    this.physics.add.existing(this.swordHitbox)
    this.swordHitbox.body.setAllowGravity(false)
    this.swordHitbox.setVisible(false)
    this.swordHitbox.body.enable = false

    // Player / ground collision
    this.physics.add.collider(this.player, this.ground)
    this.physics.add.collider(this.player, this.platform)
    this.physics.add.collider(this.player, this.platform2)
    this.physics.add.collider(this.player, this.bossFloor)
   
   
    // Controls
    this.cursors = this.input.keyboard.createCursorKeys()

    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
      dodge: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      restart: Phaser.Input.Keyboard.KeyCodes.R,
      attack: Phaser.Input.Keyboard.KeyCodes.W
    })

    // Title
    this.add.text(20, 20, 'SHATTERED SOULS - Prototype', {
      fontFamily: 'Arial',
      fontSize: '28px',
      color: '#ffffff'
    })
      
    // Health Text
    this.healthText = this.add.text(20, 60, 'Health: 500', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ff0000'
    }).setScrollFactor(0)

    // Stamina Text
this.staminaText = this.add.text(20, 90, 'Stamina: 100', {
  fontFamily: 'Arial',
  fontSize: '24px',
  color: '#00ff00'
}).setScrollFactor(0)

    this.hazard = this.add.rectangle(800, 620, 80, 80, 0xff0000)
    this.physics.add.existing(this.hazard, true)

    this.physics.add.overlap(this.player, this.hazard, () => {
  

  if (this.canTakeDamage && !this.isInvulnerable) {
    this.playerHealth = Math.max(0, this.playerHealth - 25)
    this.healthText.setText(`Health: ${this.playerHealth}`)
    if (this.playerHealth === 0) {
  this.isDead = true

  this.add.text(640, 300, 'SOULS SHATTERED', {
    fontFamily: 'Arial',
    fontSize: '64px',
    color: '#ff0000'
  }).setOrigin(0.5)
}
    
    this.canTakeDamage = false

    this.time.delayedCall(500, () => {
      this.canTakeDamage = true
      
    })
  }
})
 
// Basic test enemy
this.enemy = this.add.rectangle(1000, 580, 50, 80, 0x00ff00)
this.physics.add.existing(this.enemy)
this.physics.add.collider(this.enemy, this.ground)
this.enemyHealth = 300
this.physics.add.overlap(this.player, this.enemy, () => {
  if (this.canTakeDamage && !this.isInvulnerable) {
    this.playerHealth = Math.max(0, this.playerHealth - 50)
    this.healthText.setText(`Health: ${this.playerHealth}`)
    if (this.playerHealth === 0) {
  this.isDead = true
  this.enemy.body.setVelocityX(0)

  this.add.text(640, 300, 'SOULS SHATTERED', {
    fontFamily: 'Arial',
    fontSize: '64px',
    color: '#ff0000'
  }).setOrigin(0.5)
}
    this.canTakeDamage = false

    this.time.delayedCall(500, () => {
      this.canTakeDamage = true
    })
  }
})
this.physics.add.overlap(this.swordHitbox, this.enemy, () => {
  if (!this.attackHasHit) {
    this.enemyHealth = Math.max(0, this.enemyHealth - this.swordDamage)
    this.attackHasHit = true
    console.log(`Enemy Health: ${this.enemyHealth}`)
    
    if (this.enemyHealth === 0) {
    this.enemy.destroy()
}
  }
})

this.physics.add.overlap(this.swordHitbox, this.boss, () => {
  if (!this.attackHasHit) {
    this.bossHealth = Math.max(0, this.bossHealth - this.swordDamage)
    this.attackHasHit = true
    console.log('Boss Health:', this.bossHealth)
    if (this.bossHealth === 0) {
        this.boss.destroy()
    }
  }
})


}

  update() {
  
  if (this.isDead) {
  this.player.body.setVelocity(0, 0)

  if (Phaser.Input.Keyboard.JustDown(this.keys.restart)) {
    this.scene.restart()
  }

  return
}
  const maxSpeed = 300
  const acceleration = 20
  const drag = 25

  const movingLeft =
    this.keys.left.isDown || this.cursors.left.isDown

  const movingRight =
    this.keys.right.isDown || this.cursors.right.isDown
    
   const dodgePressed =
    Phaser.Input.Keyboard.JustDown(this.keys.dodge)

  const attackPressed =
    Phaser.Input.Keyboard.JustDown(this.keys.attack)
    
  if (attackPressed && !this.isAttacking && !this.isDodging && this.stamina >= 20) {
  this.isAttacking = true
  this.stamina -= 20
  this.staminaText.setText(`Stamina: ${this.stamina}`)
  this.attackHasHit = false

  const swordX =
    this.facing === 'right'
      ? this.player.x + 45
      : this.player.x - 45

this.swordHitbox.body.enable = true
this.swordHitbox.body.reset(swordX, this.player.y)
this.swordHitbox.setVisible(true)

  this.time.delayedCall(250, () => {
    this.isAttacking = false
    this.swordHitbox.setVisible(false)
    this.swordHitbox.body.enable = false
  })
}
   
    if (dodgePressed && !this.isDodging && this.canDodge && this.stamina >= 30) {
      this.isDodging = true
      this.stamina -= 30
      this.staminaText.setText(`Stamina: ${this.stamina}`)
      this.canDodge = false
      this.isInvulnerable = true
      this.player.body.setVelocityX(this.facing === 'right' ? 650 : -650)
      
      this.time.delayedCall(300, () => {
      this.isDodging = false
  })

      this.time.delayedCall(250, () => {
      this.isInvulnerable = false
      
})

      this.time.delayedCall(600, () => {
      this.canDodge = true
})
      
}

  
if (!this.isDodging) {
  if (movingLeft) {
    this.player.body.velocity.x -= acceleration
    this.facing = 'left'
  } else if (movingRight) {
    this.player.body.velocity.x += acceleration
    this.facing = 'right'
  } else {
    if (this.player.body.velocity.x > 0) {
      this.player.body.velocity.x -= drag

      if (this.player.body.velocity.x < 0) {
        this.player.body.velocity.x = 0
      }
    } else if (this.player.body.velocity.x < 0) {
      this.player.body.velocity.x += drag

      if (this.player.body.velocity.x > 0) {
        this.player.body.velocity.x = 0
      }
    }
  }
}
  if (!this.isDodging) {
  this.player.body.velocity.x = Phaser.Math.Clamp(
    this.player.body.velocity.x,
    -maxSpeed,
    maxSpeed
  )
}
    // Jumping
  const jumpPressed =
  Phaser.Input.Keyboard.JustDown(this.keys.jump) ||
  Phaser.Input.Keyboard.JustDown(this.cursors.up)

const jumpHeld =
  this.keys.jump.isDown ||
  this.cursors.up.isDown

if (jumpPressed && this.player.body.blocked.down) {
  this.player.body.setVelocityY(-600)
}

// If the player releases jump early while still moving upward,
// reduce upward speed to create a shorter hop.
if (!jumpHeld && this.player.body.velocity.y < -250) {
  this.player.body.setVelocityY(-250)
}

// Make falling a little heavier/faster than rising.
if (this.player.body.velocity.y > 0) {
  this.player.body.velocity.y += 20
}

// Enemy movment towards player
if (this.enemy.active) {
  if (this.player.x < this.enemy.x) {
    this.enemy.body.setVelocityX(-100)
  } else {
    this.enemy.body.setVelocityX(100)
  }
}

// Boss movement towards player
if (this.boss.active && this.player.y > 900) {
  if (this.player.x < this.boss.x) {
    this.boss.body.setVelocityX(-75)
  } else {
    this.boss.body.setVelocityX(75)
  }
}

// Stamina regeneration
if (this.stamina < this.maxStamina) {
  this.stamina = Math.min(this.maxStamina, this.stamina + 0.5)
  this.staminaText.setText(`Stamina: ${Math.floor(this.stamina)}`)
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