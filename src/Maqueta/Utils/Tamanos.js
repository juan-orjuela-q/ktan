import EventEmitter from "./EventEmitter"

export default class Tamanos extends EventEmitter {
    constructor() {
        super()
        this.anchoModal = 0
        this.ancho = window.innerWidth - this.anchoModal
        this.alto = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.escalaProyecto = {
            x: 0.025,
            y: 0.025,
            z: 0.025
        }
        this.posicionProyecto = {
            x: -2.6,
            y: 0.5,
            z: -0.6
        }
        this.posicionCamara = {
            x: 5,
            y: 4,
            z: -6
        }

        //Redimensionar
        window.addEventListener('resize', () => {
            this.ancho = window.innerWidth
            this.alto = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.trigger('redimensionar')
        })
    }
}