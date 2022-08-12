//Librerias
import * as THREE from 'three'
//Proyecto
import Maqueta from '../Maqueta.js'

export default class Modelo {
    constructor(recurso, material) {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores

        this.recurso = recurso

        this.crearModelo(material)

    }
    crearModelo(material) {

        this.modelo = this.recurso.scene
        // //this.modelo.scale.set(escala.x, escala.y, escala.z)

        this.modelo.traverse((child) => {
            child.material = material
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
        this.escena.add(this.modelo)
    }

} 