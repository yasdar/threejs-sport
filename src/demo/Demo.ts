import { Engine } from '../engine/Engine'
import $ from 'jquery'
import * as THREE from 'three'
import { Box } from './Box'
import { Experience } from '../engine/Experience'
import { Resource } from '../engine/Resources'
//import github from '../../assets/github.png'
import { Terrain } from './Terrain'
import { Ob1 } from './ob1'
import { AngleBetweenTwoPointsInPlanXZ } from './utils'

export class Demo implements Experience {
  resources: Resource[] = []
  terrain!: Terrain
  box!: Box
  spot1!: THREE.SpotLight
  spot1Helper!: THREE.SpotLightHelper
  spot_options: any

  ray_caster!: THREE.Raycaster
  mousePosition!: THREE.Vector2
  rollOverMesh!: THREE.Mesh
  pointerIsDown: boolean = false
  selectedObg!: THREE.Object3D | null

  pickableObjects: THREE.Mesh[] = []
  intersectedObject!: THREE.Object3D | null

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
    /*const mousePositions = new  THREE.Vector2();
  $('#canvas').on('mousedown touchstart', (P:any) => {
    mousePositions.set(
      (P.clientX/this.engine.sizes.width)*2 -1,
      -(P.clientY/this.engine.sizes.height)*2 +1
      );
    console.log(mousePositions)
    console.log(P.clientX,P.clientY)
  })*/

    const axesHelper: THREE.AxesHelper = new THREE.AxesHelper(15)
    this.engine.scene.add(axesHelper)
    const Xcolor = new THREE.Color(0xffffff)
    const Ycolor = new THREE.Color(0x00ff00)
    const Zcolor = new THREE.Color(0x0000ff)
    axesHelper.setColors(Xcolor, Ycolor, Zcolor)

    this.addGrid()
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
    directionalLight.position.set(0, 7, 2)
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
    this.terrain.name = 'terrain'
    this.terrain.castShadow = true
    this.terrain.position.set(0, 0.2, 0)
    this.engine.scene.add(this.terrain)

    // console.log("terrain id",this.terrain.id)

    /*const _ob1 = new Ob1();
    _ob1.position.set(0, 2, 0)
    this.engine.scene.add(_ob1)*/

    /*this.box = new Box()
    this.box.name = 'box!'
    this.box.castShadow = true
    //box.rotation.y = Math.PI / 4
    this.box.position.set(0.5, 0, 0)
    this.engine.scene.add(this.box)*/

    this.spot_options = {
      penumbra: 0,
      intensity: 10,
      x: -8,
      y: 3,
      z: 0,
      angle: 1.0471975511965976,
      distance: 20,
    }

    const rollOverGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    let rollOverMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: 0.8,
      transparent: true,
    })
    this.rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial)
    this.engine.scene.add(this.rollOverMesh)

    /*this.engine.debug.gui
      .add(this.box.position, 'x', -8, 8)
      .listen()
      .onChange((v: number) => {
        this.box.position.x = v
      })
      .name('Box x')*/

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

    this.mousePosition = new THREE.Vector2()
    this.ray_caster = new THREE.Raycaster()

    $('#canvas').on('mousemove', (event) => {
      this.mousePosition.x = (event.clientX / this.engine.sizes.width) * 2 - 1
      this.mousePosition.y = -(event.clientY / this.engine.sizes.height) * 2 + 1

      // console.log(this.mousePosition)
    })

    $('#canvas').on('pointerdown', (event: any) => {
      this.pointerIsDown = true

      console.log('pointerIsDown', this.pointerIsDown)
      this.mousePosition.x = (event.clientX / this.engine.sizes.width) * 2 - 1
      this.mousePosition.y = -(event.clientY / this.engine.sizes.height) * 2 + 1
    })
    $('#canvas').on('pointerup', () => {
      this.pointerIsDown = false
      this.engine.camera.controls.enabled = true
      this.selectedObg = null
      console.log('pointerIsDown', this.pointerIsDown)
      //this.mousePosition.x = (event.clientX / this.engine.sizes.width) * 2 - 1
      //this.mousePosition.y = -(event.clientY / this.engine.sizes.height) * 2 + 1
      // console.log(this.mousePosition)
    })

    $('#car').on('pointerdown', () => {
      this.addObjectFix(new THREE.Vector3(3, 1, 0))
    })
  }
  addGrid() {
    const size = 14
    const divisions = 28
    const gridHelper = new THREE.GridHelper(
      size,
      divisions,
      new THREE.Color(0xffff00),
      new THREE.Color(0xffff00)
    )
    gridHelper.position.y = 0.4
    this.engine.scene.add(gridHelper)
  }
  addObject(intersect: THREE.Intersection) {
    console.log('add object')
    /* const map = new THREE.TextureLoader().load( worker );
				map.colorSpace = THREE.SRGBColorSpace;
				let cubeGeo = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
				let cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, map: map } );

              const voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
						  voxel.position.copy( intersect.point );
						  voxel.position.divideScalar( 0.5).floor().multiplyScalar( 0.5 ).addScalar( 0.5 );
						  this.engine.scene.add( voxel );*/

    const _ob1 = new Ob1()
    _ob1.position.copy(intersect.point)
    _ob1.position.y = 0.7
    this.engine.scene.add(_ob1)
  }

  addObjectFix(p: THREE.Vector3) {
    const _ob1: any = new Ob1()
    _ob1.position.copy(p)
    this.engine.scene.add(_ob1)

    this.pickableObjects = _ob1.obMesh
    this.pickableObjects.push(this.terrain)
    this.pickableObjects.push(_ob1.obgCube)
    this.pickableObjects.push(_ob1.obgRot)
  }
  resize() {}

  update() {
    // this.box.rotation.y += 0.01
    if (
      this.mousePosition &&
      this.engine.camera.instance &&
      this.engine.scene &&
      this.ray_caster
    ) {
      this.ray_caster.setFromCamera(
        this.mousePosition,
        this.engine.camera.instance
      )

      //const intersects2 =  this.ray_caster.intersectObject( object, true );

      const intersetcs = this.ray_caster.intersectObjects(
        this.pickableObjects,
        false
      )

      /*const intersetcs = this.ray_caster.intersectObjects(
        this.engine.scene.children,false
      )*/

      if (intersetcs) {
        for (let i: number = 0; i < intersetcs.length; i++) {
          if (intersetcs[0].object.name == 'obgg') {
            console.log('higlight', 'obgg')
          }

          if (intersetcs[i].object.name == 'obgCube' && this.pointerIsDown) {
            console.log('higlight', 'obgCube')
            this.engine.camera.controls.enabled = false
            this.selectedObg = intersetcs[i].object.parent.currentObg
            intersetcs[i].object.parent.currentObg.scale.setScalar(0.22)
          }
          if (intersetcs[i].object.name == 'obmove') {
            //intersetcs[i].object.parent.position.copy(intersetcs[i].point)
          }
          if (intersetcs[0].object.name == 'obrot' && this.pointerIsDown) {
            if (intersetcs[i].object.parent.name == 'player') {
              this.engine.camera.controls.enabled = false
              console.log(
                intersetcs[i].object.parent.position,
                intersetcs[i].point
              )

              console.log(
                '--> obrot',
                AngleBetweenTwoPointsInPlanXZ(
                  intersetcs[i].point,
                  intersetcs[i].object.parent.position
                )
              )

              intersetcs[i].object.parent.rotation.y =
                AngleBetweenTwoPointsInPlanXZ(
                  intersetcs[i].point,
                  intersetcs[i].object.parent.position
                )
            }
            //console.log(intersetcs[i].object.parent.name , intersetcs[i].object.parent.position)

            //console.log("intersetc",intersetcs[i].point)
            //console.log("obg pos",intersetcs[i].object.parent.position);
            //intersetcs[i].object.parent.rotation.y += 0.1
            // console.log("mose",this.mousePosition)
            // console.log("pp",intersetcs[i].object.parent?.position)
          }

          if (intersetcs[i].object.name == 'cari') {
            intersetcs[i].object.rotation.y += 0.1
          }
          if (intersetcs[i].object.name == 'terrain') {
            console.log('terrain')
            if (this.selectedObg) {
              //add object
              //this.pointerIsDown = false
              //this.addObject(intersetcs[i]);

              this.selectedObg.parent.position.copy(intersetcs[i].point)
              this.selectedObg.parent.position.y = 1
            }
            // console.log('----------comparing-------')
            //console.log("rollOverMesh",this.rollOverMesh.position)
            // console.log("intersetc",intersetcs[i].point)
            //this.rollOverMesh.position.copy(intersetcs[i].point)
            /* this.rollOverMesh.position
              .divideScalar(0.5)
              .floor()
              .multiplyScalar(0.5)
              .addScalar(0.5)*/
          }
        }
      }
    }

    /*this.spot1.position.set( this.spot_options.x, this.spot_options.y, this.spot_options.z);
    this.spot1.angle =  this.spot_options.angle;
    this.spot1.penumbra =  this.spot_options.penumbra;
    this.spot1.intensity =  this.spot_options.intensity;
    this.spot1.distance =  this.spot_options.distance;
    this.spot1Helper.update();*/
  }
}
