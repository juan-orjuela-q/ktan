//Librerias
import * as THREE from 'three'
//Proyecto
import Maqueta from '../Maqueta.js'

export default class Mapa {
    constructor() {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores
        this.recursos = this.maqueta.recursos

        //Test Mesh
        this.crearHelper()
    }
    crearHelper() 
    {
        const axesHelper = new THREE.AxesHelper(2)
        this.escena.add(axesHelper)

    }
} 