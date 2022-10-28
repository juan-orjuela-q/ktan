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
        this.debug = this.maqueta.debug

        this.materialesProyecto = {}
        this.materialesContexto = {}

        this.recursos.on('cargado', () => {
            this.crearMateriales()

        })

        //Debug
        if (this.debug.active) {
            this.debugMateriales = this.debug.ui.addFolder('Materiales')
        }



    }
    crearMateriales() {
        /*const texturaProyecto = this.recursos.items.cardboard2
        texturaProyecto.wrapS = THREE.RepeatWrapping
        texturaProyecto.wrapT = THREE.RepeatWrapping
        texturaProyecto.repeat.x = 12
        texturaProyecto.repeat.y = 12*/

        const texturaEdificios = this.recursos.items.cartonEdificios
        texturaEdificios.wrapS = THREE.RepeatWrapping
        texturaEdificios.wrapT = THREE.RepeatWrapping
        texturaEdificios.repeat.x = .125
        texturaEdificios.repeat.y = .125

        const texturaVias = this.recursos.items.textil
        texturaVias.wrapS = THREE.RepeatWrapping
        texturaVias.wrapT = THREE.RepeatWrapping
        texturaVias.repeat.set(150, 150)

        const texturaCartographer = this.recursos.items.cartographer
        texturaCartographer.wrapS = THREE.RepeatWrapping
        texturaCartographer.wrapT = THREE.RepeatWrapping
        texturaCartographer.repeat.set(0.05, 0.05)
        //texturaVecinos.flipY = false
        //******************
        //Materiales proyecto
        //******************
        this.materialesProyecto.arboles = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_arboles,
            color: this.colores.coloresMundo.colorArboles
        })
        this.materialesProyecto.cubierta_verde = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_cubierta_verde,
            //color: this.colores.coloresMundo.colorTerreno
        })
        //Piso 1
        
        this.materialesProyecto.piso1_entrada_vehiculos = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_piso1_entrada_vehiculos
            //color: this.colores.coloresMundo.colorProyectoAlt
        })
        this.materialesProyecto.piso1_entrada = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_piso1_entrada,
            color: this.colores.coloresMundo.colorProyectoAlt
        })
        this.materialesProyecto.piso1_muros = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_piso1_muros,
            color: this.colores.coloresMundo.colorProyectoAlt
        })
        this.materialesProyecto.piso1_parque = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_piso1_parque,
            //wireframe: true,
            //color: this.colores.coloresMundo.colorProyectoAlt
        })
        this.materialesProyecto.piso1_pergola = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_piso1_pergola
            color: this.colores.coloresMundo.colorProyectoAlt
        })
        this.materialesProyecto.piso1_placa = new THREE.MeshStandardMaterial({
            //map: this.recursos.items.textura_piso1_placa
        })
        this.materialesProyecto.piso1_ventanas = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_piso1_ventanas
        })
        this.materialesProyecto.piso1 = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_piso1,
            //wireframe: true,
            //color: this.colores.coloresMundo.colorTerreno
        })
        
        this.materialesProyecto.rampa = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_rampa,
            //color: this.colores.coloresMundo.colorTerreno
        })
        //Torre 1
        this.materialesProyecto.torre1_balcon_plano = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre1_balcon_plano
        })
        this.materialesProyecto.torre1_balcon = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre1_balcon
        })
        this.materialesProyecto.torre1_pergolas = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre1_pergolas
        })
        this.materialesProyecto.torre1_ventanas = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre1_ventanas
        })
        this.materialesProyecto.torre1 = new THREE.MeshStandardMaterial({
           map: this.recursos.items.textura_torre1,
           color: this.colores.coloresMundo.colorProyecto
        })
        //Torre 2
        this.materialesProyecto.torre2_balcon_plano = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre2_balcon_plano
        })
        this.materialesProyecto.torre2_balcon = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre2_balcon
        })
        this.materialesProyecto.torre2_pergolas = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre2_pergolas
        })
        this.materialesProyecto.torre2_ventanas = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre2_ventanas
        })
        this.materialesProyecto.torre2 = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre2,
            color: this.colores.coloresMundo.colorProyecto
        })
        //Torre 3
        this.materialesProyecto.torre3_balcon_plano = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre3_balcon_plano
        })
        this.materialesProyecto.torre3_balcon = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre3_balcon
        })
        this.materialesProyecto.torre3_pergolas = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre3_pergolas_color
        })
        this.materialesProyecto.torre3_ventanas = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre3_ventanas
        })
        this.materialesProyecto.torre3 = new THREE.MeshStandardMaterial({
            map: this.recursos.items.textura_torre3,
            color: this.colores.coloresMundo.colorProyecto
        })
        
        //Mascaras
        this.materialesProyecto.mascaras = new THREE.MeshBasicMaterial({
            color: this.colores.mascaras.mascara1,
            transparent: true,
            opacity: .5
        })
        this.materialesProyecto.mascaraHover = new THREE.MeshBasicMaterial({
            color: this.colores.mascaras.mascaraHover,
            transparent: true,
            opacity: .5
        })
        this.materialesProyecto.mascaraClick = new THREE.MeshBasicMaterial({
            color: this.colores.mascaras.mascaraClick
        })

        this.materialesProyecto.zonasSeleccionadas = new THREE.MeshStandardMaterial({
           color: this.colores.coloresMundo.colorProyectoAlt
        })
        this.materialesProyecto.pisoSeleccionado = new THREE.MeshStandardMaterial({
           color: this.colores.coloresMundo.colorProyectoAlt
        })

        //Ajustar materiales proyecto
        const brillos = {}
        brillos.materialMetalness = .4
        brillos.materialRoughness = 0.01

        this.materialesProyecto.torre1_ventanas.metalness = brillos.materialMetalness
        this.materialesProyecto.torre1_ventanas.roughness = brillos.materialRoughness
        this.materialesProyecto.torre1_balcon.metalness = brillos.materialMetalness
        this.materialesProyecto.torre1_balcon.roughness = brillos.materialRoughness
        this.materialesProyecto.torre1_balcon_plano.metalness = brillos.materialMetalness
        this.materialesProyecto.torre1_balcon_plano.roughness = brillos.materialRoughness
        this.materialesProyecto.torre1_balcon_plano.transparent = true
        this.materialesProyecto.torre1_balcon_plano.opacity = 0.5

        this.materialesProyecto.torre2_ventanas.metalness = brillos.materialMetalness
        this.materialesProyecto.torre2_ventanas.roughness = brillos.materialRoughness
        this.materialesProyecto.torre2_balcon.metalness = brillos.materialMetalness
        this.materialesProyecto.torre2_balcon.roughness = brillos.materialRoughness
        this.materialesProyecto.torre2_balcon_plano.metalness = brillos.materialMetalness
        this.materialesProyecto.torre2_balcon_plano.roughness = brillos.materialRoughness
        this.materialesProyecto.torre2_balcon_plano.transparent = true
        this.materialesProyecto.torre2_balcon_plano.opacity = 0.5

        this.materialesProyecto.torre3_ventanas.metalness = brillos.materialMetalness
        this.materialesProyecto.torre3_ventanas.roughness = brillos.materialRoughness
        this.materialesProyecto.torre3_balcon.metalness = brillos.materialMetalness
        this.materialesProyecto.torre3_balcon.roughness = brillos.materialRoughness
        this.materialesProyecto.torre3_balcon_plano.metalness = brillos.materialMetalness
        this.materialesProyecto.torre3_balcon_plano.roughness = brillos.materialRoughness
        this.materialesProyecto.torre3_balcon_plano.transparent = true
        this.materialesProyecto.torre3_balcon_plano.opacity = 0.5

        this.materialesProyecto.piso1_ventanas.transparent = true
        this.materialesProyecto.piso1_ventanas.opacity = .5
        this.materialesProyecto.piso1_ventanas.metalness = brillos.materialMetalness
        this.materialesProyecto.piso1_ventanas.roughness = brillos.materialRoughness


        this.materialesProyecto.torre1.transparent = true
        this.materialesProyecto.torre1_balcon.transparent = true
        this.materialesProyecto.torre1_balcon_plano.transparent = true
        this.materialesProyecto.torre1_pergolas.transparent = true

        this.materialesProyecto.torre2.transparent = true
        this.materialesProyecto.torre2_balcon.transparent = true
        this.materialesProyecto.torre2_balcon_plano.transparent = true
        this.materialesProyecto.torre2_pergolas.transparent = true

        this.materialesProyecto.torre3.transparent = true
        this.materialesProyecto.torre3_balcon.transparent = true
        this.materialesProyecto.torre3_balcon_plano.transparent = true
        this.materialesProyecto.torre3_pergolas.transparent = true

        if (this.debug.active) {
            this.debugMateriales.add(brillos, 'materialMetalness').min(0).max(1).step(0.01).name('Metalness')
            this.debugMateriales.add(brillos, 'materialRoughness').min(0).max(1).step(0.01).name('Roughness')
        }

        //******************
        //Materiales contexto
        //******************

        this.materialesContexto.elevacion = new THREE.MeshStandardMaterial({
            displacementMap: this.recursos.items.textura_terreno_elevacion,
            displacementScale: 5,
            color: this.colores.coloresMundo.colorTerreno
        })



        this.materialesContexto.piso = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorVias,
            map: texturaVias,
            //wireframe: true
        })
        //Andenes
        this.materialesContexto.manzanas = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorTerreno,
            bumpMap: texturaCartographer,
            bumpScale: .0125,
        })
        this.materialesContexto.andenes = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorAndenes,
        })
        //Transito
        this.materialesContexto.transito = new THREE.MeshBasicMaterial({
            color: '#FFFFFF',
            side: THREE.DoubleSide,
        })
        //Vias


        this.materialesContexto.vias = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorVias,
            map: texturaVias,
            transparent: false,
            side: THREE.DoubleSide,
            depthWrite: true
        })



        this.materialesContexto.edificios = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorEdificios,
            map: texturaEdificios,
            transparent: true,
            opacity: .95,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        })
        this.materialesContexto.vecinos = new THREE.MeshStandardMaterial({
            color: this.colores.coloresMundo.colorVecinos,
            map: texturaEdificios,
            transparent: true,
            opacity: .55,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1
        })

        this.materialesContexto.edificiosLinea = new THREE.LineBasicMaterial({
            color: this.colores.coloresMundo.colorEdificiosLinea,
            linewidth: 1,
            transparent: true,
            opacity: .65
        })
        //Arboles

        this.materialesContexto.arboles = new THREE.MeshStandardMaterial({
            //map: texturaArboles,
            //wireframe: true,
            color: this.colores.coloresMundo.colorArboles,
            side: THREE.DoubleSide,

        })

        this.materialesContexto.arbol2 = new THREE.MeshStandardMaterial({
            //map: texturaArboles,
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
        })
        //Satelital
        //    const texturaSatelital = this.recursos.items.satelital
        //    texturaSatelital.flipY = true
        //    this.materialesContexto.satelital = new THREE.MeshStandardMaterial({
        //        map: texturaSatelital
        //    })
    }
}
