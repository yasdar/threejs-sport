import { Engine } from '../engine/Engine'
import * as THREE from 'three'
import { Box } from './Box'
import { Experience } from '../engine/Experience'
import { Resource } from '../engine/Resources'
//import github from '../../assets/github.png'
import { Terrain } from './Terrain'

export class Demo implements Experience {
  resources: Resource[] = []
  terrain!: Terrain
  box!: Box
  spot1!: THREE.SpotLight
  spot1Helper!: THREE.SpotLightHelper
  spot_options: any
  constructor(private engine: Engine) {}

  init() {
    // set background color
    const Bcolor = new THREE.Color(0x000000)
    this.engine.scene.background = Bcolor

    /*const textTureLoader = new THREE.TextureLoader();
      textTureLoader.load(BG,(a:THREE.Texture)=>{
        //console.log(a);
      this.engine.scene.background = a;
    })*/

    /*const cubeTextTureLoader = new THREE.CubeTextureLoader();
    cubeTextTureLoader.load([BG,BG,BG,BG,BG,BG],(a:any)=>{
      //console.log(a);
    this.engine.scene.background = a;
  })*/

    const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(6)
    this.engine.scene.add(axesHelper)
    const Xcolor = new THREE.Color(0xffffff)
    const Ycolor = new THREE.Color(0x00ff00)
    const Zcolor = new THREE.Color(0x0000ff)
    axesHelper.setColors(Xcolor, Ycolor, Zcolor)

    const size = 14
    const divisions = 10
    const gridHelper = new THREE.GridHelper(size, divisions)
    //gridHelper.rotateZ(Math.PI/2)
    this.engine.scene.add(gridHelper)

    /*const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 4),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide, //will make the plane visible from top and bottom
      })
    )

    plane.rotation.x = -Math.PI / 2
    plane.receiveShadow = true
    this.engine.scene.add(plane)
*/
    /* const plane2 = new THREE.Mesh(
      new THREE.PlaneGeometry(1,2),
      new THREE.MeshStandardMaterial({ color: 0xffffff})
    )
    plane2.position.set(0,2,0)
    plane2.rotation.x = -Math.PI / 2
    plane2.receiveShadow = true

    this.engine.scene.add(plane2)
    */

    this.engine.scene.add(new THREE.AmbientLight(0x3333))

    let directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.castShadow = true
    directionalLight.position.set(0, 10, 0)
    this.engine.scene.add(directionalLight)
    directionalLight.shadow.camera.bottom = -4

    this.engine.scene.add(new THREE.DirectionalLightHelper(directionalLight))
    //this.engine.scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

    /* this.spot1 =  new THREE.SpotLight(0xffffff,10,20);//,Math.PI/7
    this.spot1.castShadow = true
    this.spot1.position.set(-8,3,0);
    this.engine.scene.add(this.spot1);
    this.spot1Helper = new THREE.SpotLightHelper(this.spot1);
    this.engine.scene.add(this.spot1Helper);
    this.engine.scene.add(new THREE.CameraHelper(this.spot1.shadow.camera));
    console.log('penumbra',this.spot1.penumbra)*/
    /*let spot2 =  new THREE.SpotLight(0xffffff,10,20);//,Math.PI/7
    spot2.castShadow = true
    spot2.position.set(8,3,0);
    this.engine.scene.add(spot2);
    this.engine.scene.add(new THREE.SpotLightHelper(spot2));*/
    //this.engine.scene.add(new THREE.CameraHelper(spot2.shadow.camera));

    this.terrain = new Terrain()
    this.terrain.castShadow = true
    this.terrain.position.set(0, 0.2, 0)
    this.engine.scene.add(this.terrain)

    this.box = new Box()
    this.box.castShadow = true
    //box.rotation.y = Math.PI / 4
    this.box.position.set(0, 1.5, 0)
    this.spot_options = {
      penumbra: 0,
      intensity: 10,
      x: -8,
      y: 3,
      z: 0,
      angle: 1.0471975511965976,
      distance: 20,
    }
    this.engine.debug.gui
      .add(this.box.position, 'x', -8, 8)
      .listen()
      .onChange((v: number) => {
        this.box.position.x = v
      })
      .name('Box x')

    this.engine.debug.gui.add(this.spot_options, 'penumbra', 0, 1)
    this.engine.debug.gui.add(this.spot_options, 'intensity', 0, 30)
    this.engine.debug.gui.add(this.spot_options, 'x', -8, 8)
    this.engine.debug.gui.add(this.spot_options, 'y', -8, 8)
    this.engine.debug.gui.add(this.spot_options, 'z', -8, 8)
    this.engine.debug.gui.add(
      this.spot_options,
      'angle',
      1.0471975511965976,
      Math.PI
    )
    this.engine.debug.gui.add(this.spot_options, 'distance', -30, 30)

    this.engine.scene.add(this.box)
  }

  resize() {}

  update() {
    this.box.rotation.y += 0.01

    /*this.spot1.position.set( this.spot_options.x, this.spot_options.y, this.spot_options.z);
    this.spot1.angle =  this.spot_options.angle;
    this.spot1.penumbra =  this.spot_options.penumbra;
    this.spot1.intensity =  this.spot_options.intensity;
    this.spot1.distance =  this.spot_options.distance;
    this.spot1Helper.update();*/
  }
}
