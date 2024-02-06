import { Engine } from './Engine'
import { EventEmitter } from './utilities/EventEmitter'

type Sizing = 'cover' | 'contain'

export class Sizes extends EventEmitter {
  public width!: number
  public height!: number
  public pixelRatio: number = Math.min(window.devicePixelRatio, 2)
  public aspectRatio!: number

  public sizing: Sizing = 'cover'

  constructor(private engine: Engine) {
    super()
    this.setContainsSizing()

    window.addEventListener('resize', () => {
      this.correctSize()
    })
  }

  public correctSize() {
    this.resize()
    this.engine.resize()
    this.emit('resize')
  }
  public setContainsSizing() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.aspectRatio = this.width / this.height
  }

  public setCoverSizing() {
    const maxWidth = window.innerWidth * 0.8
    const maxHeight = window.innerHeight * 0.8

    if (maxWidth / maxHeight < this.aspectRatio) {
      this.width = maxWidth
      this.height = maxWidth / this.aspectRatio
    } else {
      this.width = maxHeight * this.aspectRatio
      this.height = maxHeight
    }
  }

  setAspectRatio(aspectRatio: number) {
    this.aspectRatio = aspectRatio
  }

  setSizing(sizing: Sizing) {
    console.log('setSizing')
    this.sizing = sizing

    this.resize()
  }

  resize() {
    console.log('resize')
    if (this.sizing === 'contain') {
      this.setContainsSizing()
    } else {
      this.setCoverSizing()
    }
  }
}
