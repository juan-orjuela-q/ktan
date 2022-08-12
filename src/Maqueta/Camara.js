//Librerias
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//Proyecto
import Maqueta from './Maqueta.js'

export default class Camara
{
    constructor()
    {
        this.maqueta = new Maqueta()
        this.tamanos = this.maqueta.tamanos
        this.escena = this.maqueta.escena
        this.canvas = this.maqueta.canvas
        
        this.crearInstanciaCamara()
        this.crearOrbitControls()
    }

    crearInstanciaCamara()
    {
        this.instancia = new THREE.PerspectiveCamera(35, this.tamanos.ancho / this.tamanos.alto, 0.01, 250)
        this.instancia.position.set(4.38, 2.33, 4.91)
        this.escena.add(this.instancia)
    }

    crearOrbitControls()
    {
        this.controles = new OrbitControls(this.instancia, this.canvas)
        this.controles.enableDamping = true
    }
    
    redimensionar() {
        this.instancia.aspecto = this.tamanos.ancho / this.tamanos.alto
        this.instancia.updateProjectionMatrix()
    }

    actualizar() {
        this.controles.update()
    }
}