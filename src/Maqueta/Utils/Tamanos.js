import EventEmitter from "./EventEmitter"

export default class Tamanos extends EventEmitter
{
    constructor()
    {
        super()
        this.ancho = window.innerWidth
        this.alto = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        //Redimensionar
        window.addEventListener('resize', () => {
            this.ancho = window.innerWidth
            this.alto = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('redimensionar')
        })
    }
}