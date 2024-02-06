import './info.scss'
import githubLogo from '../../../assets/github.png'

export type InfoConfig = {
  twitter?: string
  github?: string
  description?: string
  title?: string
  documentTitle?: string
}

export class InfoUI {
  constructor(config: InfoConfig = {}) {
    if (config.documentTitle) {
      document.title = config.documentTitle
    }

    const container = document.createElement('div')
    container.classList.add('info-container')
    container.insertAdjacentHTML(
      'beforeend',
      `
${config.title ? `<h4>${config.title}</h4>` : ''}
<div class="social-container">
${
  config.github
    ? `<a href="${config.github}" class="social-button" target="_blank">
    <img src="${githubLogo}" alt="Github logo linking to repository" />
  </a>`
    : ``
}
</div>
    `
    )
    document.body.prepend(container)
  }
}
