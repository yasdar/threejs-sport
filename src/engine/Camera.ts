import { Engine } from './Engine'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GameEntity } from './GameEntity'

export class Camera implements GameEntity {
  public instance!: THREE.PerspectiveCamera
  private controls!: OrbitControls

  constructor(private engine: Engine) {
    this.initCamera()
    this.initControls()
  }

  private initCamera() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1, //Near
      1000 //Far
    )
    this.instance.position.z = 10
    this.instance.position.x = 0
    this.instance.position.y = 2
    this.engine.scene.add(this.instance)
  }

  private initControls() {
    this.controls = new OrbitControls(this.instance, this.engine.canvas)
    //vertical rotation
    this.controls.maxPolarAngle = Math.PI / 2 - Math.PI / 20

    //zoom
    this.controls.minDistance = 3 //camera z = 3
    //this.controls.maxDistance = 10 //camera z = 7

    this.controls.update()
  }

  resize() {
    this.instance.aspect = this.engine.sizes.aspectRatio
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
    //console.log(this.controls.getPolarAngle())
  }
}
