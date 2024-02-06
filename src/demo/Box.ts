import * as THREE from 'three'
//import vertexShader from './shader.vert'
//import fragmentShader from './shader.frag'
//import github from '../../assets/github.png'
//import twitter from '../../assets/twitter.png'

export class Box extends THREE.Mesh {
  constructor() {
    // console.log(vertexShader)
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    /*const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      
      
    })*/

    /*const textTureLoader = new THREE.TextureLoader()
    const materials = [
      new THREE.MeshBasicMaterial({ map: textTureLoader.load(github) }),
      new THREE.MeshBasicMaterial({ map: textTureLoader.load(twitter) }),
      new THREE.MeshBasicMaterial({ map: textTureLoader.load(twitter) }),
      new THREE.MeshBasicMaterial({ map: textTureLoader.load(github) }),
      new THREE.MeshBasicMaterial({ map: textTureLoader.load(github) }),
      new THREE.MeshBasicMaterial({ map: textTureLoader.load(twitter) }),
    ]
*/
    // const textTureLoader = new THREE.TextureLoader();

    /*const material = new THREE.MeshStandardMaterial({
      //wireframe:true,
     //color:0xfff00,transparent:true,opacity:1,
     //transparent:true,
     color:0xffffff,
     opacity:1,
     map:textTureLoader.load(github)
    });*/

    const material = new THREE.MeshStandardMaterial({
      //wireframe:true,
      color: 0xffff00,
      transparent: true,
      opacity: 1,
    })

    super(geometry, material)
  }
}
