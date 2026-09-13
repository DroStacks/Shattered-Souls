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
    // Invisible barrier that blocks regular enemies from entering boss arena
    this.enemyBossBarrier = this.add.rectangle(5150, 340, 40, 680, 0xff0000, 0)
    this.physics.add.existing(this.enemyBossBarrier, true)
    this.bossHealth = 1000
    
    
    // =====================
// MAIN LEVEL PLATFORMS
// =====================

// Cluster 1
this.platform = this.add.rectangle(700, 560, 220, 30, 0x666666)
this.physics.add.existing(this.platform, true)

this.platform2 = this.add.rectangle(1000, 500, 220, 30, 0x666666)
this.physics.add.existing(this.platform2, true)

this.platform3 = this.add.rectangle(1300, 440, 220, 30, 0x666666)
this.physics.add.existing(this.platform3, true)


// Cluster 2
this.platform4 = this.add.rectangle(1800, 540, 250, 30, 0x666666)
this.physics.add.existing(this.platform4, true)

this.platform5 = this.add.rectangle(2100, 480, 250, 30, 0x666666)
this.physics.add.existing(this.platform5, true)

this.platform6 = this.add.rectangle(2400, 540, 250, 30, 0x666666)
this.physics.add.existing(this.platform6, true)


// Cluster 3
this.platform7 = this.add.rectangle(3100, 560, 250, 30, 0x666666)
this.physics.add.existing(this.platform7, true)

this.platform8 = this.add.rectangle(3400, 500, 250, 30, 0x666666)
this.physics.add.existing(this.platform8, true)

this.platform9 = this.add.rectangle(3700, 440, 250, 30, 0x666666)
this.physics.add.existing(this.platform9, true)


// Final platform near boss entrance
this.platform10 = this.add.rectangle(4500, 520, 250, 30, 0x666666)
this.physics.add.existing(this.platform10, true)

    // Boss Arena Platform 1
        this.bossPlatform1 = this.add.rectangle(4700, 1100, 250, 30, 0x666666)
        this.physics.add.existing(this.bossPlatform1, true)

    // Boss Arena Platform 2
        this.bossPlatform2 = this.add.rectangle(5200, 980, 250, 30, 0x666666)
        this.physics.add.existing(this.bossPlatform2, true)

    // Boss Arena Platform 3
        this.bossPlatform3 = this.add.rectangle(5700, 1100, 250, 30, 0x666666)
        this.physics.add.existing(this.bossPlatform3, true)
        
        
        

    // Player
    this.player = this.add.rectangle(200, 500, 50, 80, 0xffffff)
    this.physics.add.existing(this.player)
    // Smaller player hurtbox
    this.player.body.setSize(30, 60, true)

    this.player.body.setCollideWorldBounds(true)
    this.cameras.main.startFollow(this.player)

    // Player facing direction
    this.facing = 'right'
    this.isDodging = false
    this.canDodge = true
    this.isInvulnerable = false
    this.playerHealth = 1000
    this.maxStamina = 100
    this.stamina = 100
    this.canTakeDamage = true
    this.isDead = false
    this.isVictorious = false
    this.isAttacking = false
    this.swordDamage = 207
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
    this.physics.add.collider(this.player, this.platform3)
    this.physics.add.collider(this.player, this.platform4)
    this.physics.add.collider(this.player, this.platform5)
    this.physics.add.collider(this.player, this.platform6)
    this.physics.add.collider(this.player, this.platform7)
    this.physics.add.collider(this.player, this.platform8)
    this.physics.add.collider(this.player, this.platform9)
    this.physics.add.collider(this.player, this.platform10)
    
    // Boss arena collisions
    this.physics.add.collider(this.player, this.bossPlatform1)
    this.physics.add.collider(this.player, this.bossPlatform2)
    this.physics.add.collider(this.player, this.bossPlatform3)
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

    
      
    // Health Text
    this.healthText = this.add.text(20, 60, 'Health: 1000', {
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

    // =====================
// HEALTH PICKUPS
// =====================

// Pickup 1 - Ground
this.healthPickup = this.add.rectangle(1400, 620, 30, 30, 0xff69b4)
this.physics.add.existing(this.healthPickup, true)

// Pickup 2 - Platform 3
this.healthPickup2 = this.add.rectangle(1300, 400, 30, 30, 0xff69b4)
this.physics.add.existing(this.healthPickup2, true)

// Pickup 3 - Platform 4
this.healthPickup3 = this.add.rectangle(1800, 500, 30, 30, 0xff69b4)
this.physics.add.existing(this.healthPickup3, true)

// Pickup 4 - Platform 5
this.healthPickup4 = this.add.rectangle(2100, 440, 30, 30, 0xff69b4)
this.physics.add.existing(this.healthPickup4, true)

// Pickup 5 - Platform 6
this.healthPickup5 = this.add.rectangle(2400, 500, 30, 30, 0xff69b4)
this.physics.add.existing(this.healthPickup5, true)

// Pickup 6 - Platform 7
this.healthPickup6 = this.add.rectangle(3100, 520, 30, 30, 0xff69b4)
this.physics.add.existing(this.healthPickup6, true)

// Pickup 7 - Platform 8
this.healthPickup7 = this.add.rectangle(3400, 460, 30, 30, 0xff69b4)
this.physics.add.existing(this.healthPickup7, true)

// Pickup 8 - Platform 9
this.healthPickup8 = this.add.rectangle(3700, 400, 30, 30, 0xff69b4)
this.physics.add.existing(this.healthPickup8, true)

// Pickup 9 - Platform 10
this.healthPickup9 = this.add.rectangle(4500, 480, 30, 30, 0xff69b4)
this.physics.add.existing(this.healthPickup9, true)

// Pickup 10 - Boss Platform 1
this.healthPickup10 = this.add.rectangle(4700, 1060, 30, 30, 0xff69b4)
this.physics.add.existing(this.healthPickup10, true)

// Pickup 11 - Boss Platform 2
this.healthPickup11 = this.add.rectangle(5200, 940, 30, 30, 0xff69b4)
this.physics.add.existing(this.healthPickup11, true)

// Pickup 12 - Boss Platform 3
this.healthPickup12 = this.add.rectangle(5700, 1060, 30, 30, 0xff69b4)
this.physics.add.existing(this.healthPickup12, true)


// All health pickups
const healthPickups = [
  this.healthPickup,
  this.healthPickup2,
  this.healthPickup3,
  this.healthPickup4,
  this.healthPickup5,
  this.healthPickup6,
  this.healthPickup7,
  this.healthPickup8,
  this.healthPickup9,
  this.healthPickup10,
  this.healthPickup11,
  this.healthPickup12
]

healthPickups.forEach((pickup) => {
  this.physics.add.overlap(this.player, pickup, () => {
    if (pickup.active) {
      this.playerHealth = Math.min(1000, this.playerHealth + 100)
      this.healthText.setText(`Health: ${this.playerHealth}`)
      pickup.destroy()
    }
  })
})



    // =====================
// FIRE HAZARDS
// =====================

// Hazard 1
this.hazard = this.add.rectangle(800, 620, 80, 80, 0xff0000)
this.physics.add.existing(this.hazard, true)

// Hazard 2
this.hazard2 = this.add.rectangle(1900, 620, 80, 80, 0xff0000)
this.physics.add.existing(this.hazard2, true)

// Hazard 3
this.hazard3 = this.add.rectangle(3300, 620, 80, 80, 0xff0000)
this.physics.add.existing(this.hazard3, true)

// Hazard 4
this.hazard4 = this.add.rectangle(4300, 620, 80, 80, 0xff0000)
this.physics.add.existing(this.hazard4, true)

const hazards = [
  this.hazard,
  this.hazard2,
  this.hazard3,
  this.hazard4
]

hazards.forEach((hazard) => {
  this.physics.add.overlap(this.player, hazard, () => {
    if (this.canTakeDamage && !this.isInvulnerable) {
      this.playerHealth = Math.max(0, this.playerHealth - 25)
      this.healthText.setText(`Health: ${this.playerHealth}`)

      if (this.playerHealth === 0) {
        this.isDead = true

        this.add.text(640, 300, 'SOULS SHATTERED', {
          fontFamily: 'Arial',
          fontSize: '64px',
          color: '#ff0000'
        }).setOrigin(0.5).setScrollFactor(0)
      }

      this.canTakeDamage = false

      this.time.delayedCall(500, () => {
        this.canTakeDamage = true
      })
    }
  })
})
 
// Enemy collision and health management
this.enemy = this.add.rectangle(1000, 580, 50, 80, 0x00ff00)
this.physics.add.existing(this.enemy)
this.physics.add.collider(this.enemy, this.ground)
this.enemyHealth = 300
this.enemyAggro = false
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

// Second Enemy collision and health management
this.enemy2 = this.add.rectangle(1900, 580, 50, 80, 0x00ff00)
this.physics.add.existing(this.enemy2)
this.physics.add.collider(this.enemy2, this.ground)
this.enemy2Health = 450
this.enemy2Aggro = false
this.physics.add.overlap(this.player, this.enemy2, () => {
  if (this.canTakeDamage && !this.isInvulnerable) {
    this.playerHealth = Math.max(0, this.playerHealth - 50)
    this.healthText.setText(`Health: ${this.playerHealth}`)

    if (this.playerHealth === 0) {
      this.isDead = true
      this.enemy2.body.setVelocityX(0)

      this.add.text(640, 300, 'SOULS SHATTERED', {
        fontFamily: 'Arial',
        fontSize: '64px',
        color: '#ff0000'
      }).setOrigin(0.5).setScrollFactor(0)
    }

    this.canTakeDamage = false

    this.time.delayedCall(500, () => {
      this.canTakeDamage = true
    })
  }
})

this.physics.add.overlap(this.swordHitbox, this.enemy2, () => {
  if (!this.attackHasHit) {
    this.enemy2Health = Math.max(0, this.enemy2Health - this.swordDamage)
    this.attackHasHit = true
    console.log(`Enemy 2 Health: ${this.enemy2Health}`)

    if (this.enemy2Health === 0) {
      this.enemy2.destroy()
    }
  }
})

// Enemy 3 collision and health management
this.enemy3 = this.add.rectangle(2500, 580, 50, 80, 0x00ff00)
this.physics.add.existing(this.enemy3)
this.physics.add.collider(this.enemy3, this.ground)
this.enemy3Health = 600
this.enemy3Aggro = false

this.physics.add.overlap(this.player, this.enemy3, () => {
  if (this.canTakeDamage && !this.isInvulnerable) {
    this.playerHealth = Math.max(0, this.playerHealth - 75)
    this.healthText.setText(`Health: ${this.playerHealth}`)

    if (this.playerHealth === 0) {
      this.isDead = true
      this.enemy3.body.setVelocityX(0)

      this.add.text(640, 300, 'SOULS SHATTERED', {
        fontFamily: 'Arial',
        fontSize: '64px',
        color: '#ff0000'
      }).setOrigin(0.5).setScrollFactor(0)
    }

    this.canTakeDamage = false

    this.time.delayedCall(500, () => {
      this.canTakeDamage = true
    })
  }
})

this.physics.add.overlap(this.swordHitbox, this.enemy3, () => {
  if (!this.attackHasHit) {
    this.enemy3Health = Math.max(0, this.enemy3Health - this.swordDamage)
    this.attackHasHit = true
    console.log(`Enemy 3 Health: ${this.enemy3Health}`)

    if (this.enemy3Health === 0) {
      this.enemy3.destroy()
    }
  }
})
// End of Enemy 3 collision and health management

// Enemy 4
this.enemy4 = this.add.rectangle(3100, 580, 50, 80, 0x00bfff)
this.physics.add.existing(this.enemy4)
this.physics.add.collider(this.enemy4, this.ground)
this.enemy4Health = 450
this.enemy4Aggro = false

this.physics.add.overlap(this.player, this.enemy4, () => {
  if (this.canTakeDamage && !this.isInvulnerable) {
    this.playerHealth = Math.max(0, this.playerHealth - 50)
    this.healthText.setText(`Health: ${this.playerHealth}`)

    if (this.playerHealth === 0) {
      this.isDead = true
      this.enemy4.body.setVelocityX(0)

      this.add.text(640, 300, 'SOULS SHATTERED', {
        fontFamily: 'Arial',
        fontSize: '64px',
        color: '#ff0000'
      }).setOrigin(0.5).setScrollFactor(0)
    }

    this.canTakeDamage = false

    this.time.delayedCall(500, () => {
      this.canTakeDamage = true
    })
  }
})

this.physics.add.overlap(this.swordHitbox, this.enemy4, () => {
  if (!this.attackHasHit) {
    this.enemy4Health = Math.max(0, this.enemy4Health - this.swordDamage)
    this.attackHasHit = true
    console.log(`Enemy 4 Health: ${this.enemy4Health}`)

    if (this.enemy4Health === 0) {
      this.enemy4.destroy()
    }
  }
})


// Enemy 5
this.enemy5 = this.add.rectangle(3600, 575, 60, 90, 0xffa500)
this.physics.add.existing(this.enemy5)
this.physics.add.collider(this.enemy5, this.ground)
this.enemy5Health = 600
this.enemy5Aggro = false
this.physics.add.overlap(this.player, this.enemy5, () => {
  if (this.canTakeDamage && !this.isInvulnerable) {
    this.playerHealth = Math.max(0, this.playerHealth - 75)
    this.healthText.setText(`Health: ${this.playerHealth}`)

    if (this.playerHealth === 0) {
      this.isDead = true
      this.enemy5.body.setVelocityX(0)

      this.add.text(640, 300, 'SOULS SHATTERED', {
        fontFamily: 'Arial',
        fontSize: '64px',
        color: '#ff0000'
      }).setOrigin(0.5).setScrollFactor(0)
    }

    this.canTakeDamage = false

    this.time.delayedCall(500, () => {
      this.canTakeDamage = true
    })
  }
})

this.physics.add.overlap(this.swordHitbox, this.enemy5, () => {
  if (!this.attackHasHit) {
    this.enemy5Health = Math.max(0, this.enemy5Health - this.swordDamage)
    this.attackHasHit = true
    console.log(`Enemy 5 Health: ${this.enemy5Health}`)

    if (this.enemy5Health === 0) {
      this.enemy5.destroy()
    }
  }
})


// Enemy 6
this.enemy6 = this.add.rectangle(4100, 590, 45, 70, 0xff00ff)
this.physics.add.existing(this.enemy6)
this.physics.add.collider(this.enemy6, this.ground)
this.enemy6Health = 300
this.enemy6Aggro = false
this.physics.add.overlap(this.player, this.enemy6, () => {
  if (this.canTakeDamage && !this.isInvulnerable) {
    this.playerHealth = Math.max(0, this.playerHealth - 100)
    this.healthText.setText(`Health: ${this.playerHealth}`)

    if (this.playerHealth === 0) {
      this.isDead = true
      this.enemy6.body.setVelocityX(0)

      this.add.text(640, 300, 'SOULS SHATTERED', {
        fontFamily: 'Arial',
        fontSize: '64px',
        color: '#ff0000'
      }).setOrigin(0.5).setScrollFactor(0)
    }

    this.canTakeDamage = false

    this.time.delayedCall(500, () => {
      this.canTakeDamage = true
    })
  }
})

this.physics.add.overlap(this.swordHitbox, this.enemy6, () => {
  if (!this.attackHasHit) {
    this.enemy6Health = Math.max(0, this.enemy6Health - this.swordDamage)
    this.attackHasHit = true
    console.log(`Enemy 6 Health: ${this.enemy6Health}`)

    if (this.enemy6Health === 0) {
      this.enemy6.destroy()
    }
  }
})


// Enemy 7
this.enemy7 = this.add.rectangle(4600, 575, 70, 100, 0xff4500)
this.physics.add.existing(this.enemy7)
this.physics.add.collider(this.enemy7, this.ground)
this.enemy7Health = 750
this.enemy7Aggro = false

this.physics.add.overlap(this.player, this.enemy7, () => {
  if (this.canTakeDamage && !this.isInvulnerable) {
    this.playerHealth = Math.max(0, this.playerHealth - 100)
    this.healthText.setText(`Health: ${this.playerHealth}`)

    if (this.playerHealth === 0) {
      this.isDead = true
      this.enemy7.body.setVelocityX(0)

      this.add.text(640, 300, 'SOULS SHATTERED', {
        fontFamily: 'Arial',
        fontSize: '64px',
        color: '#ff0000'
      }).setOrigin(0.5).setScrollFactor(0)
    }

    this.canTakeDamage = false

    this.time.delayedCall(500, () => {
      this.canTakeDamage = true
    })
  }
})

this.physics.add.overlap(this.swordHitbox, this.enemy7, () => {
  if (!this.attackHasHit) {
    this.enemy7Health = Math.max(0, this.enemy7Health - this.swordDamage)
    this.attackHasHit = true
    console.log(`Enemy 7 Health: ${this.enemy7Health}`)

    if (this.enemy7Health === 0) {
      this.enemy7.destroy()
    }
  }
})

// Enemy boss barrier collisions
this.physics.add.collider(this.enemy, this.enemyBossBarrier)
this.physics.add.collider(this.enemy2, this.enemyBossBarrier)
this.physics.add.collider(this.enemy3, this.enemyBossBarrier)
this.physics.add.collider(this.enemy4, this.enemyBossBarrier)
this.physics.add.collider(this.enemy5, this.enemyBossBarrier)
this.physics.add.collider(this.enemy6, this.enemyBossBarrier)
this.physics.add.collider(this.enemy7, this.enemyBossBarrier)



// Boss collision and health management
this.physics.add.overlap(this.swordHitbox, this.boss, () => {
  if (!this.attackHasHit) {
    this.bossHealth = Math.max(0, this.bossHealth - this.swordDamage)
    this.attackHasHit = true
    console.log('Boss Health:', this.bossHealth)
    if (this.bossHealth === 0) {
  this.boss.destroy()
  this.isVictorious = true

  this.add.text(640, 260, 'SOUL RESTORED', {
    fontFamily: 'Arial',
    fontSize: '64px',
    color: '#00aaff'
  }).setOrigin(0.5).setScrollFactor(0)

  this.add.text(640, 330, 'The shattered soul has been reclaimed.', {
    fontFamily: 'Arial',
    fontSize: '28px',
    color: '#00aaff'
  }).setOrigin(0.5).setScrollFactor(0)

  this.add.text(640, 390, 'Press R to Play Again', {
    fontFamily: 'Arial',
    fontSize: '24px',
    color: '#00aaff'
  }).setOrigin(0.5).setScrollFactor(0)
}
  }
})

this.physics.add.overlap(this.player, this.boss, () => {
  if (this.canTakeDamage && !this.isInvulnerable) {
    this.playerHealth = Math.max(0, this.playerHealth - 75)
    this.healthText.setText(`Health: ${this.playerHealth}`)
    if (this.playerHealth === 0) {
  this.isDead = true
  this.boss.body.setVelocityX(0)

  this.add.text(640, 300, 'SOULS SHATTERED', {
    fontFamily: 'Arial',
    fontSize: '64px',
    color: '#ff0000'
  }).setOrigin(0.5).setScrollFactor(0)
}

    this.canTakeDamage = false

    this.time.delayedCall(500, () => {
      this.canTakeDamage = true
    })
  }
})

// end of create method
}

  update() {
  
  if (this.isDead) {
  this.player.body.setVelocity(0, 0)

  if (Phaser.Input.Keyboard.JustDown(this.keys.restart)) {
    this.scene.restart()
  }

  return

}

 if (this.isVictorious) {
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

// Enemy 1 aggro + movement
if (this.enemy.active) {
  const distanceToEnemy = Math.abs(this.player.x - this.enemy.x)

  if (!this.enemyAggro && distanceToEnemy <= 500) {
    this.enemyAggro = true
  }

  if (this.enemyAggro) {
    if (this.player.x < this.enemy.x) {
      this.enemy.body.setVelocityX(-100)
    } else {
      this.enemy.body.setVelocityX(100)
    }
  } else {
    this.enemy.body.setVelocityX(0)
  }
}

// Enemy 2 aggro + movement
if (this.enemy2.active) {
  const distanceToEnemy2 = Math.abs(this.player.x - this.enemy2.x)

  if (!this.enemy2Aggro && distanceToEnemy2 <= 500) {
    this.enemy2Aggro = true
  }

  if (this.enemy2Aggro) {
    if (this.player.x < this.enemy2.x) {
      this.enemy2.body.setVelocityX(-100)
    } else {
      this.enemy2.body.setVelocityX(100)
    }
  } else {
    this.enemy2.body.setVelocityX(0)
  }
}


// Enemy 3 aggro + movement
if (this.enemy3.active) {
  const distanceToEnemy3 = Math.abs(this.player.x - this.enemy3.x)

  if (!this.enemy3Aggro && distanceToEnemy3 <= 500) {
    this.enemy3Aggro = true
  }

  if (this.enemy3Aggro) {
    if (this.player.x < this.enemy3.x) {
      this.enemy3.body.setVelocityX(-100)
    } else {
      this.enemy3.body.setVelocityX(100)
    }
  } else {
    this.enemy3.body.setVelocityX(0)
  }
}


// Enemy 4 aggro + movement
if (this.enemy4.active) {
  const distanceToEnemy4 = Math.abs(this.player.x - this.enemy4.x)

  if (!this.enemy4Aggro && distanceToEnemy4 <= 500) {
    this.enemy4Aggro = true
  }

  if (this.enemy4Aggro) {
    if (this.player.x < this.enemy4.x) {
      this.enemy4.body.setVelocityX(-100)
    } else {
      this.enemy4.body.setVelocityX(100)
    }
  } else {
    this.enemy4.body.setVelocityX(0)
  }
}


// Enemy 5 aggro + movement
if (this.enemy5.active) {
  const distanceToEnemy5 = Math.abs(this.player.x - this.enemy5.x)

  if (!this.enemy5Aggro && distanceToEnemy5 <= 500) {
    this.enemy5Aggro = true
  }

  if (this.enemy5Aggro) {
    if (this.player.x < this.enemy5.x) {
      this.enemy5.body.setVelocityX(-90)
    } else {
      this.enemy5.body.setVelocityX(90)
    }
  } else {
    this.enemy5.body.setVelocityX(0)
  }
}


// Enemy 6 aggro + movement
if (this.enemy6.active) {
  const distanceToEnemy6 = Math.abs(this.player.x - this.enemy6.x)

  if (!this.enemy6Aggro && distanceToEnemy6 <= 500) {
    this.enemy6Aggro = true
  }

  if (this.enemy6Aggro) {
    if (this.player.x < this.enemy6.x) {
      this.enemy6.body.setVelocityX(-130)
    } else {
      this.enemy6.body.setVelocityX(130)
    }
  } else {
    this.enemy6.body.setVelocityX(0)
  }
}


// Enemy 7 aggro + movement
if (this.enemy7.active) {
  const distanceToEnemy7 = Math.abs(this.player.x - this.enemy7.x)

  if (!this.enemy7Aggro && distanceToEnemy7 <= 500) {
    this.enemy7Aggro = true
  }

  if (this.enemy7Aggro) {
    if (this.player.x < this.enemy7.x) {
      this.enemy7.body.setVelocityX(-80)
    } else {
      this.enemy7.body.setVelocityX(80)
    }
  } else {
    this.enemy7.body.setVelocityX(0)
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