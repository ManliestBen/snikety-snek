const mmm = new Audio('../assets/audio/mmm.mp3')
const yummy = new Audio('../assets/audio/yummy.mp3')
const yumYumYum = new Audio('../assets/audio/yumYumYum.mp3')
const ohNo = new Audio('../assets/audio/ohNo.mp3')
const ohNo2 = new Audio('../assets/audio/ohNo2.mp3')
const ohNo3 = new Audio('../assets/audio/ohNo3.mp3')


const appleSounds = [mmm, yummy, yumYumYum]
const collisionSounds = [ohNo, ohNo2, ohNo3]

function playAppleSound() {
  let audio = appleSounds[Math.floor(Math.random() * appleSounds.length)]
  audio.volume = 0.25
  audio.play()
}

function playCollisionSound() {
  let audio = collisionSounds[Math.floor(Math.random() * collisionSounds.length)]
  audio.volume = 0.25
  audio.play()
}

export {
  playAppleSound,
  playCollisionSound
}