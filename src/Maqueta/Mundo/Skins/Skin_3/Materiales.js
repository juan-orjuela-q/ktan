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
        const texturaArboles = this.recursos.items.leather
        texturaArboles.wrapS = THREE.RepeatWrapping
        texturaArboles.wrapT = THREE.RepeatWrapping
        texturaArboles.repeat.set(1, 1)

        const texturaAndenes = this.recursos.items.darkBrickWall
        texturaAndenes.wrapS = THREE.RepeatWrapping
        texturaAndenes.wrapT = THREE.RepeatWrapping
        texturaAndenes.repeat.set(2, 2)

        texturaAndenes.rotation = Math.PI * 1.25

        const texturaProyecto = this.recursos.items.cardboard2
        texturaProyecto.wrapS = THREE.RepeatWrapping
        texturaProyecto.wrapT = THREE.RepeatWrapping
        texturaProyecto.repeat.x = 12
        texturaProyecto.repeat.y = 12
        //texturaVecinos.flipY = false

        //Materiales proyecto
        this.materialesProyecto.torre_baja = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_torre_baja,
            color: this.colores.coloresMundo.colorProyecto,
            map: texturaProyecto
           
        })

        this.materialesProyecto.torre_sole_1 = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_torre_sole_1,
            color: this.colores.coloresMundo.colorProyecto,
            map: texturaProyecto
        })

        this.materialesProyecto.torre_sole_2 = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_torre_sole_2,
            color: this.colores.coloresMundo.colorProyecto,
            map: texturaProyecto
        })

        this.materialesProyecto.comunal = new THREE.MeshStandardMaterial({
           // map: this.recursos.items.textura_comunal,
           color: this.colores.coloresMundo.colorProyecto,
           map: texturaProyecto
        })

        this.materialesProyecto.arboles = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_arboles,
            map: texturaArboles,
            color: this.colores.coloresMundo.colorArboles
        })

        this.materialesProyecto.arbustos = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_arbustos,
            map: texturaArboles,
            color: this.colores.coloresMundo.colorArboles
        })

        this.materialesProyecto.barandas = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_barandas,
            color: this.colores.coloresMundo.colorEdificiosLinea,
            transparent: true,
            alphaMap: this.recursos.items.textura_barandas_alpha
        })

        this.materialesProyecto.bbq = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_bbq,
            color: this.colores.coloresMundo.colorBbq
        })

        this.materialesContexto.carros = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_carros_abajo,
            color: this.colores.coloresMundo.colorCarros
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
        

        

        this.materialesProyecto.vecinos = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorEdificios,
            map: texturaArboles,
            transparent: true,
            opacity: .85,
            //polygonOffset: true,
            //polygonOffsetFactor: 1,
            //polygonOffsetUnits: 1
        })

        //Materiales contexto
        this.materialesContexto.elevacion = new THREE.MeshStandardMaterial({
            displacementMap: this.recursos.items.textura_terreno_elevacion,
            displacementScale: 27,
            color: this.colores.coloresMundo.colorTerreno,
        })

        const texturaPisoBump = this.recursos.items.textura_terreno_bump
        texturaPisoBump.wrapS = THREE.RepeatWrapping
        texturaPisoBump.wrapT = THREE.RepeatWrapping
        texturaPisoBump.repeat.set(200, 200)

        const texturaPiso = this.recursos.items.cartographer
        texturaPiso.wrapS = THREE.RepeatWrapping
        texturaPiso.wrapT = THREE.RepeatWrapping
        texturaPiso.repeat.set(100, 100)

        this.materialesContexto.piso = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorTerreno,
            //map: texturaPiso,
            bumpMap: texturaPiso,
            bumpScale: .025
        })
        //Andenes
        this.materialesContexto.andenes = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorAndenes,
            map: texturaAndenes,
            side: THREE.DoubleSide,
            depthWrite: true,
            
        })
        //Vias
        const texturaVias = this.recursos.items.asfaltDark
        texturaVias.wrapS = THREE.RepeatWrapping
        texturaVias.wrapT = THREE.RepeatWrapping
        texturaVias.repeat.set(.5, .5)

        this.materialesContexto.vias = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorVias,
            map: texturaVias,
            transparent: false,
            side: THREE.DoubleSide,
            depthWrite: true
        })

        const texturaEdificios = this.recursos.items.cardboard
        texturaEdificios.wrapS = THREE.RepeatWrapping
        texturaEdificios.wrapT = THREE.RepeatWrapping
        texturaEdificios.repeat.x = .5
        texturaEdificios.repeat.y = .3

        this.materialesContexto.edificios = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorEdificios,
            map: texturaEdificios,
            transparent: true,
            opacity: .85,
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
        //Arboles

        this.materialesContexto.arbol1 = new THREE.MeshStandardMaterial({
            map: texturaArboles,
            color: this.colores.coloresMundo.colorArboles,

        })

        this.materialesContexto.arbol2 = new THREE.MeshStandardMaterial({
            map: texturaArboles,
            color: this.colores.coloresMundo.colorArboles
        })
        //Nubes
        const texturaNubes = this.recursos.items.textura_nubes
        texturaNubes.wrapS = THREE.RepeatWrapping
        texturaNubes.wrapT = THREE.RepeatWrapping
        texturaNubes.repeat.x = 10
        texturaNubes.repeat.y = 10

        this.materialesContexto.nubes = new THREE.MeshBasicMaterial({
            color: this.colores.coloresMundo.colorNubes,
            side: THREE.DoubleSide,
            map: texturaNubes,
            transparent: true
        });


    }
}
