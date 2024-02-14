import $ from 'jquery'
//import gsap from "gsap";
import { Engine } from './Engine'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GameEntity } from './GameEntity'

export class Camera implements GameEntity {
  public instance!: THREE.PerspectiveCamera
  public controls!: OrbitControls

  //bar controle
  private _rotateC: boolean = false
  private _rotateAC: boolean = false
  private ToYaxe: { hypo: number; angle: number } = { hypo: 10, angle: 0 }

  public _rotateCX: boolean = false
  private _rotateACX: boolean = false
  private ToXaxe: { hypo: number; angle: number } = { hypo: 10, angle: 0 }
  private ToZaxe: { hypo: number; angle: number } = { hypo: 10, angle: 0 }

  private Rspeed: number = 0.005

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
    this.instance.position.set(0, 8, 10)

    this.engine.scene.add(this.instance)
  }

  private initControls() {
    this.controls = new OrbitControls(this.instance, this.engine.canvas)
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.LEFT,
      MIDDLE: undefined,
      RIGHT: undefined,
    }
    //vertical rotation
    this.controls.maxPolarAngle = Math.PI / 2 - Math.PI / 20
    //zoom
    this.controls.minDistance = 3 //camera z = 3
    this.controls.maxDistance = 20 //camera z = 7

    this.controls.update()

    this.controls.addEventListener('change', () => {
      this.calculateSteps()
    })

    this.calculateSteps()
    this.initBarControls()
  }

  resize() {
    this.instance.aspect = this.engine.sizes.aspectRatio
    this.instance.updateProjectionMatrix()
  }

  update() {
    if (this.controls) {
      this.controls.update()
    }

    if (this._rotateC) {
      this.rotateC()
    }
    if (this._rotateAC) {
      this.rotateAC()
    }

    if (this._rotateCX) {
      this.rotateCX()
    }
    if (this._rotateACX) {
      this.rotateACX()
    }

    ///console.log(this.controls.getPolarAngle(),this.instance.rotation.y)
    //this.instance.ro

    //rotate on X
    //if(this.Teta < Math.PI/2){
    //this.Teta+=0.01;
    // this.instance.position.set(0,10*Math.sin(this.Teta),10*Math.cos(this.Teta))
    // }
    // this.instance.position.set(0,10*Math.sin(Math.PI/3),10*Math.cos(Math.PI/3))

    //console.log(this.instance.position);
    /* let CameraProp = {
      hypo:Math.SQRT2(this.instance.position.x+this.instance.position.z);
    }

    console.log(CameraProp.hypo);*/
  }
  //rotate clockwise
  rotateC() {
    this.ToYaxe.angle += this.Rspeed
    this.cameraAroundY()
  }
  //rotate anti-clockwise
  rotateAC() {
    this.ToYaxe.angle -= this.Rspeed
    this.cameraAroundY()
  }

  rotateCX() {
    this.cameraAroundXZ(1)
  }
  rotateACX() {
    this.cameraAroundXZ(-1)
  }

  initBarControls() {
    $('#bt_rotateC').on('mousedown touchstart', () => {
      this._rotateC = true
    })
    $('#bt_rotateC').on('mouseout mouseup touchend', () => {
      this._rotateC = false
    })
    $('#bt_rotateAC').on('mousedown touchstart', () => {
      this._rotateAC = true
    })
    $('#bt_rotateAC').on('mouseout mouseup touchend', () => {
      this._rotateAC = false
    })

    $('#bt_rotateCX').on('mousedown touchstart', () => {
      this._rotateCX = true
    })
    $('#bt_rotateCX').on('mouseout mouseup touchend', () => {
      this._rotateCX = false
    })
    $('#bt_rotateACX').on('mousedown touchstart', () => {
      this._rotateACX = true
    })
    $('#bt_rotateACX').on('mouseout mouseup touchend', () => {
      this._rotateACX = false
    })
  }
  cameraAroundY() {
    //console.log(this.ToYaxe.angle)
    //normalize
    if (this.ToYaxe.angle > Math.PI * 2) {
      this.ToYaxe.angle = this.ToYaxe.angle - Math.PI * 2
    }
    //next camera position
    let nextZ = Math.cos(this.ToYaxe.angle) * this.ToYaxe.hypo
    let nextX = Math.sin(this.ToYaxe.angle) * this.ToYaxe.hypo
    this.instance.position.set(nextX, this.instance.position.y, nextZ)
    //console.log(nextX,this.instance.position.y,nextZ)
  }
  cameraAroundXZ(inc: number) {
    //X or Z
    // console.log("conmape x ",this.instance.position.x ,"z ", this.instance.position.z)
    if (
      Math.abs(this.instance.position.x) < Math.abs(this.instance.position.z)
    ) {
      //console.log(this.ToXaxe.angle)
      //console.log("arrond x")
      this.ToXaxe.angle += this.Rspeed * inc

      if (this.ToXaxe.angle > Math.PI / 2 && this.ToYaxe.angle < Math.PI / 4) {
        this.ToXaxe.angle = Math.PI / 2
        return
      }
      if (this.ToXaxe.angle < 0.15 && this.ToYaxe.angle < Math.PI / 4) {
        this.ToXaxe.angle = 0.15
        return
      }

      if (
        this.ToXaxe.angle > Math.PI - 0.15 &&
        this.ToYaxe.angle > Math.PI / 4
      ) {
        this.ToXaxe.angle = Math.PI - 0.15
        return
      }
      if (
        this.ToXaxe.angle < Math.PI * 0.51 &&
        this.ToYaxe.angle > Math.PI / 4
      ) {
        this.ToXaxe.angle = Math.PI * 0.51
        return
      }

      //next camera position
      let nextZ = Math.cos(this.ToXaxe.angle) * this.ToXaxe.hypo
      let nextY = Math.sin(this.ToXaxe.angle) * this.ToXaxe.hypo
      this.instance.position.set(this.instance.position.x, nextY, nextZ)
      //console.log(this.instance.position.x,nextY,nextZ)
      //console.log("arrond x",this.ToXaxe.angle,'angle Y',this.ToYaxe.angle);
    } else {
      this.ToZaxe.angle += this.Rspeed * inc

      if (
        this.ToZaxe.angle > Math.PI * 0.49 &&
        this.ToYaxe.angle < Math.PI * 0.6
      ) {
        this.ToZaxe.angle = Math.PI * 0.49
        return
      }
      if (this.ToZaxe.angle < 0.15 && this.ToYaxe.angle < Math.PI * 0.6) {
        this.ToZaxe.angle = 0.15
        return
      }
      if (this.ToZaxe.angle > Math.PI * 0.9 && this.ToYaxe.angle > Math.PI) {
        this.ToZaxe.angle = Math.PI * 0.9
        return
      }

      //next camera position
      let nextX = Math.cos(this.ToZaxe.angle) * this.ToZaxe.hypo
      let nextY = Math.sin(this.ToZaxe.angle) * this.ToZaxe.hypo

      this.instance.position.set(nextX, nextY, this.instance.position.z)
      // console.log(nextX,nextY,this.instance.position.z)
      //console.log("arrond z",this.ToZaxe.angle,"angle Y",this.ToYaxe.angle);
    }
  }
  calculateSteps() {
    let hypo = Math.sqrt(
      this.instance.position.x * this.instance.position.x +
        this.instance.position.z * this.instance.position.z
    )
    let angleToY = Math.atan2(
      this.instance.position.x,
      this.instance.position.z
    )
    if (angleToY < 0) {
      angleToY = Math.PI + (Math.PI + angleToY)
    }
    this.ToYaxe = { hypo: hypo, angle: angleToY }

    //console.log("change hypo",this.ToYaxe.angle);

    let hypo2 = Math.sqrt(
      this.instance.position.y * this.instance.position.y +
        this.instance.position.z * this.instance.position.z
    )
    let angleToX = Math.atan2(
      this.instance.position.y,
      this.instance.position.z
    )
    if (angleToX < 0) {
      angleToX = Math.PI + (Math.PI + angleToX)
    }
    this.ToXaxe = { hypo: hypo2, angle: angleToX }

    let hypo3 = Math.sqrt(
      this.instance.position.y * this.instance.position.y +
        this.instance.position.x * this.instance.position.x
    )
    let angleToZ = Math.atan2(
      this.instance.position.y,
      this.instance.position.x
    )
    if (angleToZ < 0) {
      angleToZ = Math.PI + (Math.PI + angleToZ)
    }
    this.ToZaxe = { hypo: hypo3, angle: angleToZ }

    //console.log('this.ToXaxe',this.ToXaxe)

    // console.log('this.ToZaxe',this.ToZaxe)
  }
}

//gsap.to(this.instance.position,{z:nextZ,x:nextX,duration:2})
