import './style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'

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

$(function () {
  console.log('ready!')
  /*** bottom tools */
  $('.bottomTools').on('mouseover', function () {
    $('.content-one').show()
    $('.bottomTools').css('opacity', '1')
  })

  $('.bottomTools').on('mouseout', function () {
    $('.content-one').hide()
    $('.bottomTools').css('opacity', '0.01')
  })

  $('.content-one').hide()
  $('.bottomTools').css('opacity', '0.01')

  /***right tools ***/
  $('.rightTools').on('mouseover', function () {
    $('.content-two').show()
    $('.rightTools').css('opacity', '1')
  })

  $('.rightTools').on('mouseout', function () {
    $('.content-two').hide()
    $('.rightTools').css('opacity', '0.01')
  })

  $('.content-two').hide()
  $('.rightTools').css('opacity', '0.01')
})
