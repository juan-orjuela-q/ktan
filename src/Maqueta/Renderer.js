//Librerias
import * as THREE from 'three'
//Proyecto
import Maqueta from './Maqueta.js'

export default class Renderer
{
    constructor()
    {
        this.maqueta = new Maqueta()
        this.tamanos = this.maqueta.tamanos
        this.escena = this.maqueta.escena
        this.canvas = this.maqueta.canvas
        this.camara = this.maqueta.camara
        this.colores = this.maqueta.colores
        
        this.crearInstanciaRenderer()

        
        
    }

    crearInstanciaRenderer()
    {
        this.instancia = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instancia.physicallyCorrectLights = true
        this.instancia.outputEncoding = THREE.sRGBEncoding
        this.instancia.toneMapping = THREE.CineonToneMapping
        this.instancia.toneMappingExposure = 1.75
        this.instancia.shadowMap.enabled = true
        this.instancia.shadowMap.type = THREE.PCFSoftShadowMap
        this.instancia.setSize(this.tamanos.ancho, this.tamanos.alto)
        this.instancia.setPixelRatio(Math.min(this.tamanos.pixelRatio, 2))
        this.instancia.setClearColor(this.colores.paleta.color3)
    }

    redimensionar()
    {
        this.instancia.setSize(this.tamanos.ancho, this.tamanos.alto)
        this.instancia.setPixelRatio(Math.min(this.tamanos.pixelRatio, 2))
    }

    actualizar()
    {
        this.instancia.render(this.escena, this.camara.instancia)
    }
    
}