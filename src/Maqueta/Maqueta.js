//Librerias
import * as THREE from 'three'
//Proyecto
import Camara from './Camara.js'
import Renderer from './Renderer.js'
import Tamanos from "./Utils/Tamanos.js"
import Tiempo from "./Utils/Tiempo.js"
import Colores from "./Utils/Colores.js"
import Mundo from './Mundo/Mundo.js'
import Recursos from './Utils/Recursos.js'
import sources from './sources.js'
import Debug from './Utils/Debug.js'


let instancia = null

export default class Maqueta 
{
    constructor(canvas)
    {
        if(instancia) {

            return instancia
        }

        instancia =  this
        
        //Acceso global
        window.maqueta = this
        //Opciones
        this.canvas = canvas

        //Configuracion
        this.debug = new Debug()
        this.tamanos = new Tamanos()
        this.tiempo = new Tiempo()
        this.escena = new THREE.Scene()
        this.camara = new Camara()
        this.colores = new Colores()
        this.renderer = new Renderer()
        this.recursos = new Recursos(sources)
        this.mundo = new Mundo()
        

        this.tamanos.on('redimensionar', () => {
            this.redimensionar()
        })

        this.tiempo.on('tick', () => {
            this.actualizar()
        })
    }

    redimensionar() {
        this.camara.redimensionar()
        this.renderer.redimensionar()
    }

    actualizar() {
        this.camara.actualizar()
        this.renderer.actualizar()
    }
}