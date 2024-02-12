import * as THREE from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
//import BasicCar_m from '../../assets/OBJ/BasicCar.mtl';
//import BasicCar_o from '../../assets/OBJ/BasicCar.obj';

export class Ob1 extends THREE.Object3D {
  constructor() {
    console.log('rr')

    super()

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
              //object.position.y = - 0.95;
              this.add(object)
              console.log(object)
              object.receiveShadow = true
              object.name = 'cari'
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

    this.scale.setScalar(0.2)
  }
  onProgress(xhr: any) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100
      console.log(percentComplete.toFixed(2) + '% downloaded')
    }
  }
}
