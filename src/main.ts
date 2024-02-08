import './style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Engine } from './engine/Engine'
import { Demo } from './demo/Demo'

new Engine({
  canvas: document.querySelector('#canvas') as HTMLCanvasElement,
  experience: Demo,
  info: {
    github: 'https://github.com/mayacoda/simple-threejs-typescript-starter',
    title: 'Sport Tools Threejs',
  },
})
