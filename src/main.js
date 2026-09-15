import Phaser from 'phaser'
import './style.css'

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload() {
  this.load.spritesheet(
  'playerIdle',
  'src/assets/player/player-idle.png',
  {
    frameWidth: 333,
    frameHeight: 724
  }
)

this.load.spritesheet(
  'playerWalk',
  'src/assets/player/player-walk.png',
  {
    frameWidth: 362,
    frameHeight: 724
  }
)

this.load.spritesheet(
  'playerAttack',
  'src/assets/player/player-attack.png',
  {
    frameWidth: 560,
    frameHeight: 746
  }
)

this.load.spritesheet(
  'playerJump',
  'src/assets/player/player-jump.png',
  {
    frameWidth: 543,
    frameHeight: 724
  }
)

this.load.spritesheet(
  'playerDash',
  'src/assets/player/player-dash.png',
  {
    frameWidth: 543,
    frameHeight: 724
  }
)


this.load.spritesheet(
  'playerDeath',
  'src/assets/player/player-death.png',
  {
    frameWidth: 362,
    frameHeight: 724
  }
)

this.load.spritesheet(
  'enemy1Idle',
  'src/assets/enemies/enemy1-idle.png',
  {
    frameWidth: 258,
    frameHeight: 360
  }
)

this.load.spritesheet(
  'enemyWalk',
  'src/assets/enemies/enemy-walk.png',
  {
    frameWidth: 260,
    frameHeight: 360
  }
)


this.load.spritesheet(
  'enemyAttack',
  'src/assets/enemies/enemy-attack.png',
  {
    frameWidth: 600,
    frameHeight: 650
  }
)

this.load.spritesheet(
  'enemyDeath',
  'src/assets/enemies/enemy-death.png',
  {
    frameWidth: 297,
    frameHeight: 655
  }
)

this.load.spritesheet(
  'bossIdle',
  'src/assets/boss/boss-idle.png',
  {
    frameWidth: 360,
    frameHeight: 733
  }
)

this.load.spritesheet(
  'bossWalk',
  'src/assets/boss/boss-walk.png',
  {
    frameWidth: 360,
    frameHeight: 733
  }
)

this.load.image(
  'bossAttack1',
  'src/assets/boss/boss-attack-clean-1.png'
)

this.load.image(
  'bossAttack2',
  'src/assets/boss/boss-attack-clean-2.png'
)

this.load.image(
  'bossAttack3',
  'src/assets/boss/boss-attack-clean-3.png'
)

this.load.image(
  'bossAttack4',
  'src/assets/boss/boss-attack-clean-4.png'
)

this.load.on('filecomplete-spritesheet-bossAttack', () => {
  const texture = this.textures.get('bossAttack')
  const source = texture.getSourceImage()

  console.log('BOSS ATTACK ACTUAL SIZE:', source.width, source.height)
})
  this.load.image('mainBackground', 'src/assets/background/main-background.png')
  this.load.image('bridgeForeground', 'src/assets/environment/bridge-foreground.png')
  this.load.image('fire', 'src/assets/hazards/fire.png')
  this.load.image('healthPotion', 'src/assets/pickups/health-potion.png')  
  this.load.image('playerHud', 'src/assets/ui/player-hud.png')
  this.load.image('platformArt', 'src/assets/environment/platform.png')
  this.load.image('columnArt', 'src/assets/environment/column.png')
  this.load.image('bossFloorArt', 'src/assets/environment/boss-floor.png')

this.load.image('bossDeath01', 'src/assets/boss/boss-death-01.png')
this.load.image('bossDeath02', 'src/assets/boss/boss-death-02.png')
this.load.image('bossDeath03', 'src/assets/boss/boss-death-03.png')
this.load.image('bossDeath04', 'src/assets/boss/boss-death-04.png')
this.load.image('bossDeath05', 'src/assets/boss/boss-death-05.png')
this.load.image('bossDeath06', 'src/assets/boss/boss-death-06.png')
this.load.image('bossDeath07', 'src/assets/boss/boss-death-07.png')
this.load.image('bossDeath08', 'src/assets/boss/boss-death-08.png')
this.load.image('bossDeath09', 'src/assets/boss/boss-death-09.png')
this.load.image('bossDeath10', 'src/assets/boss/boss-death-10.png')
this.load.image('bossDeath11', 'src/assets/boss/boss-death-11.png')



















}

  
  create() {
    
    const walkImage = this.textures.get('playerWalk').getSourceImage()

console.log(
  'PLAYER WALK SIZE:',
  walkImage.width,
  walkImage.height
)

    this.physics.world.setBounds(0, 0, 6000, 1400)
    
    // Keep camera inside the level
    this.cameras.main.setBounds(0, 0, 6000, 1400)
    

    // Background
    this.background = this.add.image(0, 0, 'mainBackground')
    this.background.setOrigin(0, 0)
    this.background.setDisplaySize(6000, 1400)
    this.background.setDepth(-10)
    // Main bridge artwork
    this.bridgeForeground = this.add.image(2600, 300, 'bridgeForeground')
    this.bridgeForeground.setDisplaySize(5200, 700)
    this.bridgeForeground.setOrigin(0.5, 0)
    this.bridgeForeground.setDepth(-5)

    // Ground
    this.ground = this.add.rectangle(2600, 665, 5200, 80, 0x444444)
    this.physics.add.existing(this.ground, true)
    this.ground.setVisible(false)

    // Separate enemy ground so enemy feet align with bridge artwork
    this.enemyGround = this.add.rectangle(2600, 725, 5200, 80, 0x444444)
    this.physics.add.existing(this.enemyGround, true)
    this.enemyGround.setVisible(false)
    
    
    
  // =====================
  // BOSS ARENA FLOOR
  // =====================

  // Player collision floor
  // Slightly higher so the knight's feet sit on the visible stone surface
  this.bossFloor = this.add.rectangle(5200, 1195, 1600, 80, 0x444444)
  this.physics.add.existing(this.bossFloor, true)
  this.bossFloor.setVisible(false)

  // Separate boss collision floor
  // Slightly lower so the boss sits correctly on the stone
  this.bossGround = this.add.rectangle(5200, 1245, 1600, 80, 0x444444)
  this.physics.add.existing(this.bossGround, true)
  this.bossGround.setVisible(false)

  // Boss floor artwork
  this.bossFloorArt = this.add.image(5200, 1000, 'bossFloorArt')
  this.bossFloorArt.setDisplaySize(1600, 400)
  this.bossFloorArt.setOrigin(0.5, 0)
  this.bossFloorArt.setDepth(-2)
        
    // Boss visual sprite
this.boss = this.add.sprite(4800, 1100, 'bossIdle')

this.boss.setDisplaySize(180, 365)
this.boss.setOrigin(0.5, 1)
this.boss.setDepth(10)


// Invisible boss physics body
this.bossBody = this.add.rectangle(
  4800,
  1055,
  110,
  300,
  0xff0000,
  0
)

this.physics.add.existing(this.bossBody)

this.bossBody.body.setCollideWorldBounds(true)

this.physics.add.collider( this.bossBody, this.bossGround)

// Boss sword attack hitbox
this.bossAttackHitbox = this.add.rectangle(
  this.bossBody.x,
  this.bossBody.y,
  260,
  180,
  0xff0000,
  0
)

this.physics.add.existing(this.bossAttackHitbox)

this.bossAttackHasHit = false


    
    // Invisible barrier that blocks regular enemies from entering boss arena
    this.enemyBossBarrier = this.add.rectangle(5150, 340, 40, 680, 0xff0000, 0)
    this.physics.add.existing(this.enemyBossBarrier, true)
    this.bossHealth = 1000
    this.bossIsAttacking = false
    this.bossNextAttack = 0
    
// =====================
// BOSS HEALTH BAR
// =====================

// Boss name
this.bossNameText = this.add.text(
  640,
  545,
  'WRAITH KNIGHT',
  {
    fontFamily: 'Georgia',
    fontSize: '22px',
    color: '#d6d0c4'
  }
)

this.bossNameText.setOrigin(0.5)
this.bossNameText.setScrollFactor(0)
this.bossNameText.setDepth(102)
this.bossNameText.setVisible(false)


// Dark background behind boss health
this.bossHealthBarBackground = this.add.rectangle(
  240,
  575,
  800,
  18,
  0x111111
)

this.bossHealthBarBackground.setOrigin(0, 0)
this.bossHealthBarBackground.setScrollFactor(0)
this.bossHealthBarBackground.setDepth(101)
this.bossHealthBarBackground.setVisible(false)


// Boss health fill
this.bossHealthBar = this.add.graphics()
this.bossHealthBar.setScrollFactor(0)
this.bossHealthBar.setDepth(102)
this.bossHealthBar.setVisible(false)
    
    // =====================
// MAIN LEVEL PLATFORMS
// =====================

// Cluster 1
this.platform = this.add.rectangle(700, 518, 220, 30, 0x666666)
this.physics.add.existing(this.platform, true)
this.platform.setVisible(false)
this.platformArt1 = this.add.image(700, 560, 'platformArt')
this.platformArt1.setDisplaySize(220, 70)
// Left column
this.columnArt1Left = this.add.image(615, 610, 'columnArt')
this.columnArt1Left.setDisplaySize(50, 140)
this.columnArt1Left.setDepth(-1)

// Right column
this.columnArt1Right = this.add.image(785, 610, 'columnArt')
this.columnArt1Right.setDisplaySize(50, 140)
this.columnArt1Right.setDepth(-1)

// Platform 2
this.platform2 = this.add.rectangle(1000, 458, 220, 30, 0x666666)
this.physics.add.existing(this.platform2, true)
this.platform2.setVisible(false)

this.platformArt2 = this.add.image(1000, 500, 'platformArt')
this.platformArt2.setDisplaySize(220, 70)

this.columnArt2Left = this.add.image(915, 580, 'columnArt')
this.columnArt2Left.setDisplaySize(50, 200)
this.columnArt2Left.setDepth(-1)

this.columnArt2Right = this.add.image(1085, 580, 'columnArt')
this.columnArt2Right.setDisplaySize(50, 200)
this.columnArt2Right.setDepth(-1)


// Platform 3
this.platform3 = this.add.rectangle(1300, 398, 220, 30, 0x666666)
this.physics.add.existing(this.platform3, true)
this.platform3.setVisible(false)

this.platformArt3 = this.add.image(1300, 440, 'platformArt')
this.platformArt3.setDisplaySize(220, 70)

this.columnArt3Left = this.add.image(1215, 550, 'columnArt')
this.columnArt3Left.setDisplaySize(50, 260)
this.columnArt3Left.setDepth(-1)

this.columnArt3Right = this.add.image(1385, 550, 'columnArt')
this.columnArt3Right.setDisplaySize(50, 260)
this.columnArt3Right.setDepth(-1)


// =====================
// CLUSTER 2
// =====================

// Platform 4
this.platform4 = this.add.rectangle(1800, 518, 250, 30, 0x666666)
this.physics.add.existing(this.platform4, true)
this.platform4.setVisible(false)

this.platformArt4 = this.add.image(1800, 560, 'platformArt')
this.platformArt4.setDisplaySize(250, 70)

this.columnArt4Left = this.add.image(1705, 610, 'columnArt')
this.columnArt4Left.setDisplaySize(50, 140)
this.columnArt4Left.setDepth(-1)

this.columnArt4Right = this.add.image(1895, 610, 'columnArt')
this.columnArt4Right.setDisplaySize(50, 140)
this.columnArt4Right.setDepth(-1)


// Platform 5
this.platform5 = this.add.rectangle(2100, 438, 250, 30, 0x666666)
this.physics.add.existing(this.platform5, true)
this.platform5.setVisible(false)

this.platformArt5 = this.add.image(2100, 480, 'platformArt')
this.platformArt5.setDisplaySize(250, 70)

this.columnArt5Left = this.add.image(2005, 570, 'columnArt')
this.columnArt5Left.setDisplaySize(50, 220)
this.columnArt5Left.setDepth(-1)

this.columnArt5Right = this.add.image(2195, 570, 'columnArt')
this.columnArt5Right.setDisplaySize(50, 220)
this.columnArt5Right.setDepth(-1)


// Platform 6
this.platform6 = this.add.rectangle(2400, 518, 250, 30, 0x666666)
this.physics.add.existing(this.platform6, true)
this.platform6.setVisible(false)

this.platformArt6 = this.add.image(2400, 560, 'platformArt')
this.platformArt6.setDisplaySize(250, 70)

this.columnArt6Left = this.add.image(2305, 610, 'columnArt')
this.columnArt6Left.setDisplaySize(50, 140)
this.columnArt6Left.setDepth(-1)

this.columnArt6Right = this.add.image(2495, 610, 'columnArt')
this.columnArt6Right.setDisplaySize(50, 140)
this.columnArt6Right.setDepth(-1)


// =====================
// CLUSTER 3
// =====================

// Platform 7
this.platform7 = this.add.rectangle(3100, 518, 250, 30, 0x666666)
this.physics.add.existing(this.platform7, true)
this.platform7.setVisible(false)

this.platformArt7 = this.add.image(3100, 560, 'platformArt')
this.platformArt7.setDisplaySize(250, 70)

this.columnArt7Left = this.add.image(3005, 610, 'columnArt')
this.columnArt7Left.setDisplaySize(50, 140)
this.columnArt7Left.setDepth(-1)

this.columnArt7Right = this.add.image(3195, 610, 'columnArt')
this.columnArt7Right.setDisplaySize(50, 140)
this.columnArt7Right.setDepth(-1)


// Platform 8
this.platform8 = this.add.rectangle(3400, 458, 250, 30, 0x666666)
this.physics.add.existing(this.platform8, true)
this.platform8.setVisible(false)

this.platformArt8 = this.add.image(3400, 500, 'platformArt')
this.platformArt8.setDisplaySize(250, 70)

this.columnArt8Left = this.add.image(3305, 580, 'columnArt')
this.columnArt8Left.setDisplaySize(50, 200)
this.columnArt8Left.setDepth(-1)

this.columnArt8Right = this.add.image(3495, 580, 'columnArt')
this.columnArt8Right.setDisplaySize(50, 200)
this.columnArt8Right.setDepth(-1)


// Platform 9
this.platform9 = this.add.rectangle(3700, 398, 250, 30, 0x666666)
this.physics.add.existing(this.platform9, true)
this.platform9.setVisible(false)

this.platformArt9 = this.add.image(3700, 440, 'platformArt')
this.platformArt9.setDisplaySize(250, 70)

this.columnArt9Left = this.add.image(3605, 550, 'columnArt')
this.columnArt9Left.setDisplaySize(50, 260)
this.columnArt9Left.setDepth(-1)

this.columnArt9Right = this.add.image(3795, 550, 'columnArt')
this.columnArt9Right.setDisplaySize(50, 260)
this.columnArt9Right.setDepth(-1)


// =====================
// FINAL PLATFORM
// =====================

this.platform10 = this.add.rectangle(4500, 518, 250, 30, 0x666666)
this.physics.add.existing(this.platform10, true)
this.platform10.setVisible(false)

this.platformArt10 = this.add.image(4500, 560, 'platformArt')
this.platformArt10.setDisplaySize(250, 70)

this.columnArt10Left = this.add.image(4405, 610, 'columnArt')
this.columnArt10Left.setDisplaySize(50, 140)
this.columnArt10Left.setDepth(-1)

this.columnArt10Right = this.add.image(4595, 610, 'columnArt')
this.columnArt10Right.setDisplaySize(50, 140)
this.columnArt10Right.setDepth(-1)


// =====================
// BOSS ARENA PLATFORMS
// =====================

// Boss Platform 1 - Left
this.bossPlatform1 = this.add.rectangle(4700, 1118, 250, 30, 0x666666)
this.physics.add.existing(this.bossPlatform1, true)
this.bossPlatform1.setVisible(false)

this.bossPlatformArt1 = this.add.image(4700, 1160, 'platformArt')
this.bossPlatformArt1.setDisplaySize(250, 70)

this.bossColumn1Left = this.add.image(4605, 1220, 'columnArt')
this.bossColumn1Left.setOrigin(0.5, 1)
this.bossColumn1Left.setDisplaySize(50, 90)
this.bossColumn1Left.setDepth(-1)

this.bossColumn1Right = this.add.image(4795, 1220, 'columnArt')
this.bossColumn1Right.setOrigin(0.5, 1)
this.bossColumn1Right.setDisplaySize(50, 90)
this.bossColumn1Right.setDepth(-1)





// Boss Platform 3 - Right
this.bossPlatform3 = this.add.rectangle(5700, 1118, 250, 30, 0x666666)
this.physics.add.existing(this.bossPlatform3, true)
this.bossPlatform3.setVisible(false)

this.bossPlatformArt3 = this.add.image(5700, 1160, 'platformArt')
this.bossPlatformArt3.setDisplaySize(250, 70)

this.bossColumn3Left = this.add.image(5605, 1220, 'columnArt')
this.bossColumn3Left.setOrigin(0.5, 1)
this.bossColumn3Left.setDisplaySize(50, 90)
this.bossColumn3Left.setDepth(-1)

this.bossColumn3Right = this.add.image(5795, 1220, 'columnArt')
this.bossColumn3Right.setOrigin(0.5, 1)
this.bossColumn3Right.setDisplaySize(50, 90)
this.bossColumn3Right.setDepth(-1)
        
// =====================
// PLAYER ANIMATIONS
// =====================

this.anims.create({
  key: 'player-idle',
  frames: this.anims.generateFrameNumbers('playerIdle', {
    start: 0,
    end: 0
  }),
  frameRate: 6,
  repeat: -1
})

this.anims.create({
  key: 'player-walk',
  frames: this.anims.generateFrameNumbers('playerWalk', {
    start: 0,
    end: 7
  }),
  frameRate: 5,
  repeat: -1
})

this.anims.create({
  key: 'player-attack',
  frames: this.anims.generateFrameNumbers('playerAttack', {
    start: 0,
    end: 3
  }),
  frameRate: 10,
  repeat: 0
})

this.anims.create({
  key: 'player-jump',
  frames: this.anims.generateFrameNumbers('playerJump', {
    start: 0,
    end: 3
  }),
  frameRate: 6,
  repeat: 0
})

this.anims.create({
  key: 'player-dash',
  frames: this.anims.generateFrameNumbers('playerDash', {
    start: 0,
    end: 3
  }),
  frameRate: 10,
  repeat: 0
})

this.anims.create({
  key: 'player-death',
  frames: this.anims.generateFrameNumbers('playerDeath', {
    start: 0,
    end: 5
  }),
  frameRate: 6,
  repeat: 0
})

this.anims.create({
  key: 'enemy1-idle',
  frames: this.anims.generateFrameNumbers('enemy1Idle', {
    start: 2,
    end: 2
  }),
  frameRate: 6,
  repeat: -1
})

this.anims.create({
  key: 'enemy-walk',
  frames: this.anims.generateFrameNumbers('enemyWalk', {
    start: 0,
    end: 7
  }),
  frameRate: 8,
  repeat: -1
})


this.anims.create({
  key: 'enemy-attack',
  frames: this.anims.generateFrameNumbers('enemyAttack', {
    start: 0,
    end: 6
  }),
  frameRate: 10,
  repeat: 0
})

this.anims.create({
  key: 'enemy-death',
  frames: this.anims.generateFrameNumbers('enemyDeath', {
    start: 0,
    end: 6
  }),
  frameRate: 8,
  repeat: 0
})

this.anims.create({
  key: 'boss-idle',
  frames: this.anims.generateFrameNumbers('bossIdle', {
    start: 1,
    end: 1
  }),
  frameRate: 6,
  repeat: -1
})

this.anims.create({
  key: 'boss-walk',
  frames: this.anims.generateFrameNumbers('bossWalk', {
    start: 0,
    end: 5
  }),
  frameRate: 6,
  repeat: -1
})

this.boss.play('boss-idle')

this.anims.create({
  key: 'boss-attack',
  frames: [
    { key: 'bossAttack1' },
    { key: 'bossAttack2' },
    { key: 'bossAttack3' },
    { key: 'bossAttack4' }
  ],
  frameRate: 6,
  repeat: 0
})

this.anims.create({
  key: 'boss-death',
  frames: [
    { key: 'bossDeath01' },
    { key: 'bossDeath02' },
    { key: 'bossDeath03' },
    { key: 'bossDeath04' },
    { key: 'bossDeath05' },
    { key: 'bossDeath06' },
    { key: 'bossDeath07' },
    { key: 'bossDeath08' },
    { key: 'bossDeath09' },
    { key: 'bossDeath10' },
    { key: 'bossDeath11' }
  ],
  frameRate: 6,
  repeat: 0
})

    // Player
    this.player = this.add.sprite(200, 500, 'playerIdle')
    
    this.playerBody = this.add.rectangle(
    this.player.x,
    this.player.y,
    30,
    60,
    0xffffff,
    0
  )

this.physics.add.existing(this.playerBody)

this.playerBody.body.setCollideWorldBounds(true)

// Temporary for this setup step so it doesn't fall through the map yet
this.playerBody.body.setAllowGravity(false)
    
    
    this.player.setDisplaySize(80, 120)


    
    this.player.setOrigin(0.5, 0.75)
    this.physics.add.existing(this.player)
    
    // Smaller player hurtbox
     this.player.body.setSize(30, 60, true)

    this.player.body.setCollideWorldBounds(true)
    this.player.play('player-idle')
    this.physics.add.overlap(
  this.player,
  this.bossAttackHitbox,
  () => {

    if (
      this.bossIsAttacking &&
      !this.bossAttackHasHit &&
      this.canTakeDamage &&
      !this.isInvulnerable &&
      !this.isDead
    ) {

      this.playerHealth = Math.max(
        0,
        this.playerHealth - 75
      )

      this.bossAttackHasHit = true

      if (this.playerHealth === 0) {
        this.isDead = true
      }

      this.canTakeDamage = false

      this.time.delayedCall(500, () => {
        this.canTakeDamage = true
      })
    }
  }
)
    this.cameraTarget = this.add.zone(this.player.x, this.player.y, 1, 1)
    this.cameras.main.startFollow(this.cameraTarget, true, 0.1, 0.1)
    this.cameras.main.setDeadzone(120, 80)

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
    this.deathAnimationStarted = false
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

// =====================
// PLAYER HUD
// =====================




// =====================
// HEALTH BAR
// =====================



// Inner dark background
this.healthBarBackground = this.add.rectangle(
  115,
  59,
  295,
  17,
  0x161616
)
this.healthBarBackground.setOrigin(0, 0)
this.healthBarBackground.setScrollFactor(0)
this.healthBarBackground.setDepth(101)

// Glossy rounded health bar
this.healthBar = this.add.graphics()
this.healthBar.setScrollFactor(0)
this.healthBar.setDepth(102)

// HUD image frame
this.playerHud = this.add.image(20, 15, 'playerHud')
this.playerHud.setOrigin(0, 0)
this.playerHud.setDisplaySize(420, 130)
this.playerHud.setScrollFactor(0)
this.playerHud.setDepth(103)

// =====================
// STAMINA BAR
// =====================



// Inner dark background
this.staminaBarBackground = this.add.rectangle(
  115,
  87,
  180,
  13,
  0x161616
)

this.staminaBarBackground.setOrigin(0, 0)
this.staminaBarBackground.setScrollFactor(0)
this.staminaBarBackground.setDepth(101)

// Glossy rounded stamina bar
this.staminaBar = this.add.graphics()
this.staminaBar.setScrollFactor(0)
this.staminaBar.setDepth(102)



      


// =====================
// HEALTH PICKUPS
// =====================


// Pickup 1 - Ground
this.healthPickup = this.add.image(1400, 620, 'healthPotion')
this.healthPickup.setDisplaySize(50, 50)
this.physics.add.existing(this.healthPickup, true)


// Pickup 2 - Platform 3
this.healthPickup2 = this.add.image(1300, 385, 'healthPotion')
this.healthPickup2.setDisplaySize(50, 50)
this.physics.add.existing(this.healthPickup2, true)


// Pickup 3 - Platform 4
this.healthPickup3 = this.add.image(1800, 505, 'healthPotion')
this.healthPickup3.setDisplaySize(50, 50)
this.physics.add.existing(this.healthPickup3, true)


// Pickup 4 - Platform 5
this.healthPickup4 = this.add.image(2100, 425, 'healthPotion')
this.healthPickup4.setDisplaySize(50, 50)
this.physics.add.existing(this.healthPickup4, true)


// Pickup 5 - Platform 6
this.healthPickup5 = this.add.image(2400, 505, 'healthPotion')
this.healthPickup5.setDisplaySize(50, 50)
this.physics.add.existing(this.healthPickup5, true)


// Pickup 6 - Platform 7
this.healthPickup6 = this.add.image(3100, 505, 'healthPotion')
this.healthPickup6.setDisplaySize(50, 50)
this.physics.add.existing(this.healthPickup6, true)


// Pickup 7 - Platform 8
this.healthPickup7 = this.add.image(3400, 445, 'healthPotion')
this.healthPickup7.setDisplaySize(50, 50)
this.physics.add.existing(this.healthPickup7, true)


// Pickup 8 - Platform 9
this.healthPickup8 = this.add.image(3700, 385, 'healthPotion')
this.healthPickup8.setDisplaySize(50, 50)
this.physics.add.existing(this.healthPickup8, true)


// Pickup 9 - Platform 10
this.healthPickup9 = this.add.image(4500, 505, 'healthPotion')
this.healthPickup9.setDisplaySize(50, 50)
this.physics.add.existing(this.healthPickup9, true)


// Pickup 10 - Boss Platform 1
this.healthPickup10 = this.add.image(4700, 1105, 'healthPotion')
this.healthPickup10.setDisplaySize(50, 50)
this.physics.add.existing(this.healthPickup10, true)





// Pickup 12 - Boss Platform 3
this.healthPickup12 = this.add.image(5700, 1105, 'healthPotion')
this.healthPickup12.setDisplaySize(50, 50)
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
  
  this.healthPickup12
]

healthPickups.forEach((pickup) => {
  this.physics.add.overlap(this.player, pickup, () => {
    if (pickup.active) {
      this.playerHealth = Math.min(1000, this.playerHealth + 100)
      
      pickup.destroy()
    }
  })
})



// =====================
// FIRE HAZARDS
// =====================

// Hazard 1
this.hazard = this.add.image(800, 635, 'fire')
this.hazard.setDisplaySize(100, 100)
this.physics.add.existing(this.hazard, true)

// Hazard 2
this.hazard2 = this.add.image(1900, 635, 'fire')
this.hazard2.setDisplaySize(100, 100)
this.physics.add.existing(this.hazard2, true)

// Hazard 3
this.hazard3 = this.add.image(3300, 635, 'fire')
this.hazard3.setDisplaySize(100, 100)
this.physics.add.existing(this.hazard3, true)

// Hazard 4
this.hazard4 = this.add.image(4300, 635, 'fire')
this.hazard4.setDisplaySize(100, 100)
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
      

      if (this.playerHealth === 0) {
        this.isDead = true

        this.add.text(640, 300, 'SOULS SHATTERED', {
          fontFamily: 'Arial',
          fontSize: '64px',
          color: '#ff0000'
        }).setOrigin(0.5).setScrollFactor(0)
      }

      this.canTakeDamage = false

      this.time.delayedCall(650, () => {
        this.canTakeDamage = true
      })
    }
  })
})
 
// =====================
// REGULAR ENEMIES 1-7
// =====================

this.enemies = [
  this.createEnemy(1000, 585, 300, 50),
  this.createEnemy(1900, 585, 450, 50),
  this.createEnemy(2500, 585, 600, 75),
  this.createEnemy(3100, 585, 450, 50),
  this.createEnemy(3600, 585, 600, 75),
  this.createEnemy(4100, 585, 300, 100),
  this.createEnemy(4600, 585, 750, 100)
]

// Keep old enemy names available
;[
  this.enemy,
  this.enemy2,
  this.enemy3,
  this.enemy4,
  this.enemy5,
  this.enemy6,
  this.enemy7
] = this.enemies

// Player sword damage against all regular enemies
this.enemies.forEach((enemy, index) => {
  this.physics.add.overlap(this.swordHitbox, enemy.hurtbox, () => {
    if (!this.attackHasHit && enemy.active) {
      enemy.health = Math.max(0, enemy.health - this.swordDamage)
      this.attackHasHit = true

      console.log(`Enemy ${index + 1} Health: ${enemy.health}`)

      if (enemy.health === 0 && !enemy.isDying) {
  enemy.isDying = true

  // Stop all enemy movement and attacks
  enemy.body.setVelocity(0, 0)
  enemy.body.setAllowGravity(false)

  // Disable the permanent hurtbox
  enemy.hurtbox.body.enable = false

  // Play death animation
  enemy.play('enemy-death')

  // Remove the enemy only after the animation finishes
  enemy.once('animationcomplete-enemy-death', () => {
    if (enemy.hurtbox) {
      enemy.hurtbox.destroy()
    }

    enemy.destroy()
  })
}
    }
  })
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
this.physics.add.overlap(this.swordHitbox, this.bossBody, () => {

  if (!this.attackHasHit && !this.bossIsDead) {

    this.bossHealth = Math.max(
      0,
      this.bossHealth - this.swordDamage
    )

    this.attackHasHit = true

    console.log('Boss Health:', this.bossHealth)

    if (this.bossHealth === 0) {

      // Mark boss as dead
      this.bossIsDead = true
      this.bossIsAttacking = false

      // Stop and disable boss physics
      this.bossBody.body.setVelocityX(0)
      this.bossBody.body.enable = false

      // Hide boss health HUD
      this.bossNameText.setVisible(false)
      this.bossHealthBarBackground.setVisible(false)
      this.bossHealthBar.setVisible(false)

      // Play the full Wraith Knight death animation
      this.boss.play('boss-death')

      // Wait until death animation finishes
      this.boss.once('animationcomplete-boss-death', () => {

        this.boss.destroy()

        this.isVictorious = true

        this.add.text(640, 260, 'SOUL RESTORED', {
          fontFamily: 'Arial',
          fontSize: '64px',
          color: '#00aaff'
        }).setOrigin(0.5).setScrollFactor(0)

        this.add.text(
          640,
          330,
          'The shattered soul has been reclaimed.',
          {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#00aaff'
          }
        ).setOrigin(0.5).setScrollFactor(0)

        this.add.text(640, 390, 'Press R to Play Again', {
          fontFamily: 'Arial',
          fontSize: '24px',
          color: '#00aaff'
        }).setOrigin(0.5).setScrollFactor(0)

      })
    }
  }
})

this.physics.add.overlap(this.player, this.bossBody, () => {

  if (
    this.canTakeDamage &&
    !this.isInvulnerable &&
    !this.bossIsDead
  ) {

    this.playerHealth = Math.max(
      0,
      this.playerHealth - 75
    )

    if (this.playerHealth === 0) {

      this.isDead = true

      this.bossBody.body.setVelocityX(0)

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

// end of create method// Boss collision and health management
this.physics.add.overlap(this.swordHitbox, this.bossBody, () => {

  if (!this.attackHasHit && !this.bossIsDead) {

    this.bossHealth = Math.max(
      0,
      this.bossHealth - this.swordDamage
    )

    this.attackHasHit = true

    console.log('Boss Health:', this.bossHealth)

    if (this.bossHealth === 0) {

      // Mark boss as dead
      this.bossIsDead = true
      this.bossIsAttacking = false

      // Stop and disable boss physics
      this.bossBody.body.setVelocityX(0)
      this.bossBody.body.enable = false

      // Hide boss health HUD
      this.bossNameText.setVisible(false)
      this.bossHealthBarBackground.setVisible(false)
      this.bossHealthBar.setVisible(false)

      // Play the full Wraith Knight death animation
      this.boss.play('boss-death')

      // Wait until death animation finishes
      this.boss.once('animationcomplete-boss-death', () => {

        this.boss.destroy()

        this.isVictorious = true

        this.add.text(640, 260, 'SOUL RESTORED', {
          fontFamily: 'Arial',
          fontSize: '64px',
          color: '#00aaff'
        }).setOrigin(0.5).setScrollFactor(0)

        this.add.text(
          640,
          330,
          'The shattered soul has been reclaimed.',
          {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#00aaff'
          }
        ).setOrigin(0.5).setScrollFactor(0)

        this.add.text(640, 390, 'Press R to Play Again', {
          fontFamily: 'Arial',
          fontSize: '24px',
          color: '#00aaff'
        }).setOrigin(0.5).setScrollFactor(0)

      })
    }
  }
})

this.physics.add.overlap(this.player, this.bossBody, () => {

  if (
    this.canTakeDamage &&
    !this.isInvulnerable &&
    !this.bossIsDead
  ) {

    this.playerHealth = Math.max(
      0,
      this.playerHealth - 75
    )

    if (this.playerHealth === 0) {

      this.isDead = true

      this.bossBody.body.setVelocityX(0)

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

createEnemy(x, y, health, damage) {
  const enemy = this.add.sprite(x, y, 'enemy1Idle')

  enemy.setDisplaySize(110, 155)
  enemy.setOrigin(0.5, 0.75)

  this.physics.add.existing(enemy)

  enemy.body.setSize(80, 100, true)

  this.physics.add.collider(enemy, this.ground)
  this.physics.add.collider(enemy, this.enemyBossBarrier)

  enemy.health = health
  enemy.damage = damage
  enemy.aggro = false
  enemy.nextAttack = 0
  enemy.isDying = false

  enemy.play('enemy1-idle')

  // Permanent invisible hurtbox
  enemy.hurtbox = this.add.zone(enemy.x, enemy.y, 80, 100)

  this.physics.add.existing(enemy.hurtbox)

  enemy.hurtbox.body.setAllowGravity(false)

  return enemy
}


  update() {
  
    this.playerBody.setPosition(
    this.player.x,
    this.player.y
  )


  this.cameraTarget.setPosition(
  this.player.body.center.x,
  this.player.body.center.y
)

  if (this.isDead) {
  this.player.body.setVelocity(0, 0)

  if (!this.deathAnimationStarted) {
    this.deathAnimationStarted = true
    this.player.play('player-death')
  }

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
  this.player.play('player-attack', true)
  this.player.setDisplaySize(80, 120)
  this.player.body.setSize(30, 60, true)
  this.stamina -= 20
  
  this.attackHasHit = false

  const swordX =
    this.facing === 'right'
      ? this.player.x + 45
      : this.player.x - 45

this.swordHitbox.body.enable = true
this.swordHitbox.body.reset(swordX, this.player.y)
this.swordHitbox.setVisible(false)

  this.time.delayedCall(250, () => {
    
    this.isAttacking = false
    this.swordHitbox.setVisible(false)
    this.swordHitbox.body.enable = false
  })
}
   
    if (dodgePressed && !this.isDodging && this.canDodge && this.stamina >= 30) {
      this.isDodging = true
      this.player.play('player-dash', true)
      this.player.body.setSize(30, 60, true)
      this.stamina -= 30
      
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
    this.player.setFlipX(true)

    if (this.player.body.blocked.down && !this.isAttacking) {
      this.player.play('player-walk', true)
      //this.player.setDisplaySize(95, 140)
    }

  } else if (movingRight) {
    this.player.body.velocity.x += acceleration
    this.facing = 'right'
    this.player.setFlipX(false)

    if (this.player.body.blocked.down && !this.isAttacking) {
      this.player.play('player-walk', true)
      //this.player.setDisplaySize(95, 140)
    }

  } else {
    if (this.player.body.blocked.down && !this.isAttacking) {
      this.player.play('player-idle', true)
      //this.player.setDisplaySize(80, 120)
    }

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

  if (!this.isAttacking) {
    this.player.play('player-jump', true)
  }
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

// =====================
// REGULAR ENEMY AI
// Enemies 1-7
// =====================

this.enemies.forEach((enemy) => {
  if (!enemy.active || enemy.isDying) return

  enemy.hurtbox.setPosition(enemy.x, enemy.y)

  const distanceX = Math.abs(this.player.x - enemy.x)
  const distanceY = Math.abs(this.player.y - enemy.y)
  
  // If the player is too far above or below the enemy,
  // stop moving and return to idle.
if (distanceY > 90) {
  enemy.body.setVelocityX(0)

  if (enemy.anims.currentAnim?.key !== 'enemy1-idle') {
    enemy.play('enemy1-idle')
  }

  return
}

  // Permanently aggro once player gets close
  if (!enemy.aggro && distanceX <= 500) {
    enemy.aggro = true
  }

  if (!enemy.aggro) {
    enemy.body.setVelocityX(0)
    return
  }

  const stopDistance = 70

  // Face player
  enemy.setFlipX(this.player.x < enemy.x)

  // ATTACK
  if (distanceX <= stopDistance && distanceY <= 90) {
    enemy.body.setVelocityX(0)

    if (
      this.time.now >= enemy.nextAttack &&
      (
        enemy.anims.currentAnim?.key !== 'enemy-attack' ||
        !enemy.anims.isPlaying
      )
    ) {
      enemy.nextAttack = this.time.now + 1200

      enemy.body.setVelocity(0, 0)
      enemy.body.setAllowGravity(false)

      enemy.play('enemy-attack')
      enemy.setScale(0.37)

      

      this.time.delayedCall(300, () => {
        if (!enemy.active) return

        const attackDistanceX = Math.abs(this.player.x - enemy.x)
        const attackDistanceY = Math.abs(this.player.y - enemy.y)

        if (
          attackDistanceX <= 90 &&
          attackDistanceY <= 90 &&
          this.canTakeDamage &&
          !this.isInvulnerable
        ) {
          this.playerHealth = Math.max(
            0,
            this.playerHealth - enemy.damage
          )

          this.canTakeDamage = false

          if (this.playerHealth === 0) {
  this.isDead = true
  enemy.body.setVelocityX(0)

  this.add.text(640, 300, 'SOULS SHATTERED', {
    fontFamily: 'Arial',
    fontSize: '64px',
    color: '#ff0000'
  })
    .setOrigin(0.5)
    .setScrollFactor(0)
}

          this.time.delayedCall(500, () => {
            this.canTakeDamage = true
          })
        }
      })
    }

  // PLAYER MOVED AWAY — CHASE
  } else {
    enemy.body.setAllowGravity(true)
    enemy.setDisplaySize(110, 155)
    enemy.body.setSize(80, 100, true)

    if (enemy.anims.currentAnim?.key !== 'enemy-walk') {
  enemy.play('enemy-walk')
}

    if (this.player.x < enemy.x) {
      enemy.body.setVelocityX(-100)
    } else {
      enemy.body.setVelocityX(100)
    }
  }
})





// Show boss HUD when player enters boss arena
if (this.player.y > 900 && this.boss.active) {
  this.bossNameText.setVisible(true)
  this.bossHealthBarBackground.setVisible(true)
  this.bossHealthBar.setVisible(true)
}



if (this.boss.active && this.bossBody.active) {

  const bossYOffset = this.bossIsAttacking ? 215 : 180

  this.boss.setPosition(
    this.bossBody.x,
    this.bossBody.y + bossYOffset
  )

}

// Boss movement towards player
if (
  this.boss.active &&
  this.player.x >= 4400 &&
  !this.bossIsDead
) {

  const bossDistanceX = Math.abs(
    this.player.x - this.bossBody.x
  )

  const bossStopDistance = 140

  // Face the player

this.boss.setFlipX(
  this.player.x < this.bossBody.x
)
const bossFacingLeft =
  this.player.x < this.bossBody.x

const bossAttackOffset = 200

this.bossAttackHitbox.setPosition(
  this.bossBody.x +
    (bossFacingLeft ? -bossAttackOffset : bossAttackOffset),
  this.bossBody.y + 180
)

this.bossAttackHitbox.body.enable =
  this.bossIsAttacking

if (this.bossIsAttacking) {

  // Freeze the boss completely while the attack animation plays
  this.bossBody.body.setVelocityX(0)

} else if (bossDistanceX <= bossStopDistance) {

  this.bossBody.body.setVelocityX(0)

  if (this.time.now >= this.bossNextAttack) {

    this.bossIsAttacking = true

    this.boss.play('boss-attack', true)
    this.bossAttackHasHit = false
    this.time.delayedCall(330, () => {

  if (!this.boss.active || this.isDead) return

  const attackDistanceX = Math.abs(
    this.player.x - this.bossBody.x
  )

  const attackDistanceY = Math.abs(
    this.player.y - this.bossBody.y
  )

  if (
    attackDistanceX <= 200 &&
    attackDistanceY <= 250 &&
    !this.bossAttackHasHit &&
    this.canTakeDamage &&
    !this.isInvulnerable
  ) {

    this.playerHealth = Math.max(
      0,
      this.playerHealth - 75
    )

    this.bossAttackHasHit = true

    this.canTakeDamage = false

    if (this.playerHealth === 0) {
  this.isDead = true

  this.add.text(640, 300, 'SOULS SHATTERED', {
    fontFamily: 'Arial',
    fontSize: '64px',
    color: '#ff0000'
  })
    .setOrigin(0.5)
    .setScrollFactor(0)
}

    this.time.delayedCall(500, () => {
      this.canTakeDamage = true
    })
  }
})

    this.boss.once('animationcomplete-boss-attack', () => {
  this.bossIsAttacking = false
  this.bossNextAttack = 0
})

  } else {

    this.boss.play('boss-idle', true)

  }

} else if (this.player.x < this.bossBody.x) {

  this.bossBody.body.setVelocityX(-75)
  this.boss.play('boss-walk', true)

} else {

  this.bossBody.body.setVelocityX(75)
  this.boss.play('boss-walk', true)

}

}



// Stamina regeneration

if (this.stamina < this.maxStamina) {

  this.stamina = Math.min(this.maxStamina, this.stamina + 0.5)

}
  // Update health bar
const healthPercent = this.playerHealth / 1000
const healthWidth = 295 * healthPercent

this.healthBar.clear()

// Main rounded red fill
this.healthBar.fillStyle(0x8b1515, 1)
this.healthBar.fillRoundedRect(
  115,
  59,
  healthWidth,
  17,
  8
)

// Glossy highlight
this.healthBar.fillStyle(0xffffff, 0.22)
this.healthBar.fillRoundedRect(
  117,
  61,
  Math.max(0, healthWidth - 4),
  5,
  3
)

const staminaPercent = this.stamina / this.maxStamina
const staminaWidth = 180 * staminaPercent

this.staminaBar.clear()

// Main rounded green fill
this.staminaBar.fillStyle(0x2f7f3f, 1)
this.staminaBar.fillRoundedRect(
  115,
  87,
  staminaWidth,
  13,
  6
)

// Glossy highlight
this.staminaBar.fillStyle(0xffffff, 0.22)
this.staminaBar.fillRoundedRect(
  117,
  89,
  Math.max(0, staminaWidth - 4),
  4,
  2
)

 // Update boss health bar
if (this.boss.active && this.player.y > 900) {

  const bossHealthPercent = this.bossHealth / 1000
  const bossHealthWidth = 800 * bossHealthPercent

  this.bossHealthBar.clear()

  // Main red fill
  this.bossHealthBar.fillStyle(0x8b1515, 1)

  this.bossHealthBar.fillRoundedRect(
    240,
    575,
    bossHealthWidth,
    18,
    9
  )

  // Glossy highlight
  this.bossHealthBar.fillStyle(0xffffff, 0.20)

  this.bossHealthBar.fillRoundedRect(
    243,
    578,
    Math.max(0, bossHealthWidth - 6),
    5,
    3
  )
}

  }
}

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#111111',

   scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },

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