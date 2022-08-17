//Librerias
import * as THREE from 'three'
//Proyecto
import Maqueta from '../../../Maqueta.js'

export default class Materiales {
    constructor() {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores
        this.recursos = this.maqueta.recursos

        this.materialesProyecto = {}
        this.materialesContexto = {}


        this.recursos.on('cargado', () => {
            this.crearMateriales()

        })




    }
    crearMateriales() {
        //Materiales proyecto
        this.materialesProyecto.torre_baja = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre_baja
        })

        this.materialesProyecto.torre_sole_1 = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre_sole_1
        })

        this.materialesProyecto.torre_sole_2 = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre_sole_2
        })

        this.materialesProyecto.arboles = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_arboles,
            color: this.colores.coloresMundo.colorArboles
        })

        this.materialesProyecto.arbustos = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_arbustos,
            color: this.colores.coloresMundo.colorArboles
        })

        this.materialesProyecto.barandas = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_barandas,
            transparent: true,
            alphaMap: this.recursos.items.textura_barandas_alpha
        })

        this.materialesProyecto.bbq = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_bbq,
            color: this.colores.coloresMundo.colorBbq
        })

        this.materialesProyecto.carros_abajo = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_carros_abajo,
            color: this.colores.coloresMundo.colorCarros
        })
        this.materialesProyecto.carros_arriba = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_carros_arriba,
            color: this.colores.coloresMundo.colorCarros
        })

        this.materialesProyecto.comunal = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_comunal
        })

        this.materialesProyecto.juegos = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_juegos,
            color: this.colores.coloresMundo.colorJuegos
        })
        this.materialesProyecto.juegos_2 = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_juegos_2,
            color: this.colores.coloresMundo.colorJuegos
        })

        this.materialesProyecto.luminarias = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_luminarias,
            color: this.colores.coloresMundo.colorLuminarias
        })

        //Materiales contexto
        this.materialesContexto.elevacion = new THREE.MeshStandardMaterial({
            displacementMap: this.recursos.items.textura_terreno_elevacion,
            displacementScale: 27,
            color: this.colores.coloresMundo.colorTerreno,
        })

        const texturaPiso = this.recursos.items.textura_terreno_bump
            texturaPiso.wrapS = THREE.RepeatWrapping
            texturaPiso.wrapT = THREE.RepeatWrapping
            texturaPiso.repeat.set(200, 200)

        this.materialesContexto.piso = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorTerreno,
            bumpMap: texturaPiso, 
            bumpScale: .015
        })

        this.materialesContexto.andenes = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorAndenes,
            transparent: false,
            side: THREE.DoubleSide,
            depthWrite: true
        })

        this.materialesContexto.vias = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorVias,
            transparent: false,
            side: THREE.DoubleSide,
            depthWrite: true
        })

        this.materialesContexto.edificios = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorEdificios,
            transparent: true,
            opacity: .95,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        })

        this.materialesContexto.edificiosLinea = new THREE.LineBasicMaterial({
            color: this.colores.coloresMundo.colorEdificiosLinea,
            linewidth: 1,
            transparent: true,
            opacity: .35
        })

        this.materialesContexto.arbol1 = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorArboles
        })

        this.materialesContexto.arbol2 = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorArboles
        })
    }
}
