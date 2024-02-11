import * as THREE from 'three'
import grass1 from '../../assets/t2.jpeg'
import land from '../../assets/land.jpeg'
import { Box } from './Box'

export class Terrain extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxGeometry(12, 0.2, 7) //12, 7, 0.2

    const textTureLoader = new THREE.TextureLoader()
    const materials = [
      new THREE.MeshBasicMaterial({ map: textTureLoader.load(land) }),
      new THREE.MeshBasicMaterial({ map: textTureLoader.load(land) }),
      new THREE.MeshBasicMaterial({ map: textTureLoader.load(grass1) }),
      new THREE.MeshBasicMaterial({ map: textTureLoader.load(grass1) }),
      new THREE.MeshBasicMaterial({ map: textTureLoader.load(land) }),
      new THREE.MeshBasicMaterial({ map: textTureLoader.load(land) }),
    ]

    // const textTureLoader = new THREE.TextureLoader();

    const material = new THREE.MeshStandardMaterial({
      //wireframe:true,
      color: 0xff0000,
      transparent: false,
      opacity: 1,
      //transparent:true,
      // color:0xffffff,
      // opacity:1,
      // map:textTureLoader.load(grass1)
    })

    super(geometry, materials)
    // this.rotation.x = -Math.PI / 2

    let boxinsideTerrain = new Box()
    boxinsideTerrain.name = 'box0'
    boxinsideTerrain.castShadow = true
    boxinsideTerrain.position.set(6, 0, 0)
    this.add(boxinsideTerrain)
  }
}
