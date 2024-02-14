import * as THREE from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
//import BasicCar_m from '../../assets/OBJ/BasicCar.mtl';
//import BasicCar_o from '../../assets/OBJ/BasicCar.obj';
import circlar from '../../assets/rot.png'

export class Ob1 extends THREE.Object3D {
  currentObg!: any
  obgRot!: THREE.Mesh
  obgCube!: THREE.Mesh
  obMesh: Array<any> = []
  constructor() {
    super()
    this.name = 'player'
    this.addOBG()
  }
  addOBG() {
    //rotation
    //obg container, used for the selection and moving
    const textTureLoader = new THREE.TextureLoader()

    let texture = textTureLoader.load(circlar)
    let circleMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    })

    this.obgRot = new THREE.Mesh(new THREE.CircleGeometry(1.5), circleMat)
    this.obgRot.rotation.x = -Math.PI / 2
    this.obgRot.position.set(0, -0.5, 0)
    this.obgRot.name = 'obrot'
    this.add(this.obgRot)

    this.obgCube = new THREE.Mesh(
      new THREE.CircleGeometry(0.8),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        opacity: 1,
      })
    )
    this.obgCube.position.set(0, -0.49, 0)
    this.obgCube.name = 'obgCube'
    this.add(this.obgCube)
    this.obgCube.rotation.x = -Math.PI / 2

    //load the object
    new MTLLoader()
      .setPath('../../assets/OBJ')
      .load('/RaceCar.mtl', (materials) => {
        materials.preload()
        new OBJLoader()
          .setMaterials(materials)
          .setPath('../../assets/OBJ')
          .load(
            '/RaceCar.obj',
            (object) => {
              /*object.children.forEach( (child:any)=>{
              if ((child as THREE.Mesh).isMesh) {
                this.obMesh.push(child);
                child.name="obgg";
              }
            })*/

              //object.position.y = - 0.95;
              this.add(object)
              this.currentObg = object
              object.receiveShadow = true
              object.scale.setScalar(0.2)
              object.position.set(-0.25, -0.2, 0.1) //-0.25, -0.2, 0
              // object.name = 'cari'
              // object.position.x =  1;
              //object.rotation.set(0, -10, 0)
              /*let mm:any = object.children[0];
                             mm.material.color ={
                              b: 0,
                              g: 0,
                              isColor: true,
                              r: 255
                             }*/
            },
            this.onProgress
          )
      })
  }
  onProgress(xhr: any) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100
      console.log(percentComplete.toFixed(2) + '% downloaded')
    }
  }
}
