//Librerias
import * as THREE from 'three'
//Proyecto
import Maqueta from '../Maqueta.js'
import Ambiente from './Skins/Skin_2/Ambiente.js'
import Mapa from './Mapa.js'
import Modelo from './Modelo.js'
import Materiales from './Skins/Skin_2/Materiales.js'

export default class Mundo {
    constructor() {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores
        this.recursos = this.maqueta.recursos
        this.materiales = new Materiales()
        this.mapa = {}
        this.debug = this.maqueta.debug

        //Debug
        if (this.debug.active) {
            this.debugColores = this.debug.ui.addFolder('Colores')
            this.debugProyecto = this.debug.ui.addFolder('Proyecto')
        }

        this.grupoMapa = new THREE.Group()
        this.grupoVias = new THREE.Group()
        this.grupoAndenes = new THREE.Group()
        this.grupoTransitoFijo = new THREE.Group()
        this.grupoTransito = new THREE.Group()
        this.grupoEdificios = new THREE.Group()
        this.grupoArboles = new THREE.Group()
        this.grupoProyecto = new THREE.Group()

        //this.crearHelper()

        

        // Esperar que cargue Recursos
        this.recursos.on('cargado', () => {
            // Setup
            //this.mapa = new Mapa()
            this.crearTerreno()
            this.crearMapa()
            this.crearVegetacion()
            this.crearModelos()
            this.crearDebug()
            this.ambiente = new Ambiente()
        })
    }
    numAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    crearHelper() {
        const axesHelper = new THREE.AxesHelper(2)
        this.escena.add(axesHelper)

        //Test Mesh
        const bolaHelper = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 16, 16),
            new THREE.MeshStandardMaterial({ color: this.colores.paleta.color2 })
        )
        this.escena.add(bolaHelper)

    }
    crearTerreno() {
        //Piso
        const piso = new THREE.Mesh(
            new THREE.CircleGeometry(120, 32),
            this.materiales.materialesContexto.piso
        )
        piso.receiveShadow = true
        piso.rotation.x = - Math.PI * 0.5
        piso.position.y = -0.01
        this.escena.add(piso)

        //Terreno con elevacion
        const elevacion = new THREE.Mesh(
            new THREE.PlaneGeometry(360, 360, 60, 60),
            this.materiales.materialesContexto.elevacion
        )
        elevacion.rotation.x = - Math.PI * 0.5
        elevacion.position.y = -1
        this.escena.add(elevacion)
        //Nubes
        const nubesGeo = new THREE.SphereGeometry(130, 32, 16)
        this.nubes = new THREE.Mesh(nubesGeo, this.materiales.materialesContexto.nubes)
        this.escena.add(this.nubes);
    }
    rotarNubes(){
        this.nubes.rotation.z += 0.001
    }
    crearMapa() {
        //Andenes
        this.mapa.andenes = new Mapa(this.recursos.items.svg_andenes, this.materiales.materialesContexto.andenes, this.grupoAndenes, true, 0.075)
        this.grupoAndenes.position.set(4, 25.9, 0)
        //DEBUG
        this.grupoMapa.add(this.grupoAndenes)

        //Vias
        this.mapa.vias = new Mapa(this.recursos.items.svg_vias, this.materiales.materialesContexto.vias, this.grupoVias)
        this.grupoVias.position.set(0, 0, -0.01)
        this.grupoMapa.add(this.grupoVias)
        //Edificios
        this.mapa.edificios = new Mapa(this.recursos.items.svg_edificios, this.materiales.materialesContexto.edificios, this.grupoEdificios, true, 0.75, this.materiales.materialesContexto.edificiosLinea)
        this.grupoEdificios.position.set(5.3, 28.7, - 0.76)
        this.grupoMapa.add(this.grupoEdificios)
        //Agregar arboles
        const arboles = ''
        //Configurar mapa
        this.grupoMapa.rotation.x = Math.PI * 0.5
        this.grupoMapa.position.set(-68.5, 0.01, -62.8)
        this.grupoMapa.rotation.z = -0.07
        this.grupoMapa.scale.set(0.64, 0.64, 0.64)
        this.escena.add(this.grupoMapa)
    }
    crearVegetacion() {
        this.grupoArboles.position.set(-67.2, 0.01, -70.7)
        this.grupoArboles.scale.set(0.64, 0.64, 0.64)
        this.grupoArboles.rotation.y = 0.07;
        //Arboles
        this.vegetacion = {}

        this.vegetacion.vegetacionSVG = this.recursos.items.svg_arboles
        this.vegetacion.vegetacionModelo1 = this.recursos.items.modelo_arbol_1.scene
        this.vegetacion.vegetacionModelo2 = this.recursos.items.modelo_arbol_2.scene

        const pathsSVG = this.vegetacion.vegetacionSVG.paths

        //Distribuir arboles en dos grupos

        let posicionArboles = [],
            posicionArboles2 = []


        for (let i = 0; i < pathsSVG.length; i++) {
            const path = pathsSVG[i]
            const ran = this.numAleatorio(1, 2)
            //console.log(path.subPaths[0].currentPoint)
            if (ran === 1) {
                posicionArboles.push(path.subPaths[0].currentPoint);
            } else {
                posicionArboles2.push(path.subPaths[0].currentPoint);
            }

        }

        //Agregar grupo 1
        this.vegetacion.vegetacionModelo1.traverse((child) => {
            child.material = this.materiales.materialesContexto.arbol1
            child.castShadow = true
        })
        for (let p = 0; p < posicionArboles.length; p++) {
            const n = this.numAleatorio(65, 100) / 100
            const r = (Math.random() * 2) * Math.PI
            const arbolito = new THREE.Object3D()
            this.vegetacion.vegetacionModelo1.scale.set(0.1, 0.1, 0.1)
            arbolito.add(this.vegetacion.vegetacionModelo1.clone())
            arbolito.position.set(posicionArboles[p].x, -0.05, posicionArboles[p].y)
            arbolito.children[0].children[0].scale.set(n, n, n)
            arbolito.children[0].children[0].rotation.y = r
            this.grupoArboles.add(arbolito)
        }

        this.escena.add(this.grupoArboles)
        //Agregar grupo 2
        this.vegetacion.vegetacionModelo2.traverse((child) => {
            child.material = this.materiales.materialesContexto.arbol2
            child.castShadow = true
        })
        for (let p = 0; p < posicionArboles2.length; p++) {
            const n = this.numAleatorio(45, 90) / 100
            const r = (Math.random() * 2) * Math.PI
            const arbolito = new THREE.Object3D()
            this.vegetacion.vegetacionModelo2.scale.set(0.1, 0.1, 0.1)
            arbolito.add(this.vegetacion.vegetacionModelo1.clone())
            arbolito.position.set(posicionArboles2[p].x, -0.05, posicionArboles2[p].y)
            arbolito.children[0].children[0].scale.set(n, n, n)
            arbolito.children[0].children[0].rotation.y = r
            this.grupoArboles.add(arbolito)
        }

        this.escena.add(this.grupoArboles)

    }
    crearModelos() {

        //Proyecto
        this.torre_baja = new Modelo(this.recursos.items.modelo_torre_baja, this.materiales.materialesProyecto.torre_baja, this.grupoProyecto, true)
        this.torre_sole_1 = new Modelo(this.recursos.items.modelo_torre_sole_1, this.materiales.materialesProyecto.torre_sole_1, this.grupoProyecto, true)
        this.torre_sole_2 = new Modelo(this.recursos.items.modelo_torre_sole_2, this.materiales.materialesProyecto.torre_sole_2, this.grupoProyecto, true)

        this.arboles = new Modelo(this.recursos.items.modelo_arboles, this.materiales.materialesProyecto.arboles, this.grupoProyecto)
        this.arbustos = new Modelo(this.recursos.items.modelo_arbustos, this.materiales.materialesProyecto.arbustos, this.grupoProyecto)
        this.barandas = new Modelo(this.recursos.items.modelo_barandas, this.materiales.materialesProyecto.barandas, this.grupoProyecto)
        this.bbq = new Modelo(this.recursos.items.modelo_bbq, this.materiales.materialesProyecto.bbq, this.grupoProyecto)
        this.carros_abajo = new Modelo(this.recursos.items.modelo_carros_abajo, this.materiales.materialesProyecto.carros_abajo, this.grupoProyecto)
        this.carros_arriba = new Modelo(this.recursos.items.modelo_carros_arriba, this.materiales.materialesProyecto.carros_arriba, this.grupoProyecto)
        this.comunal = new Modelo(this.recursos.items.modelo_comunal, this.materiales.materialesProyecto.comunal, this.grupoProyecto, true)

        this.juegos = new Modelo(this.recursos.items.modelo_juegos, this.materiales.materialesProyecto.juegos, this.grupoProyecto)
        this.juegos_2 = new Modelo(this.recursos.items.modelo_juegos_2, this.materiales.materialesProyecto.juegos_2, this.grupoProyecto)
        this.luminarias = new Modelo(this.recursos.items.modelo_luminarias, this.materiales.materialesProyecto.luminarias, this.grupoProyecto)

        this.comercio = new Modelo(this.recursos.items.modelo_comercio, this.materiales.materialesProyecto.vecinos, this.grupoProyecto, true)
        this.proyecto_vecino = new Modelo(this.recursos.items.modelo_proyecto_vecino, this.materiales.materialesProyecto.vecinos, this.grupoProyecto, true)
        this.vecinos = new Modelo(this.recursos.items.modelo_vecinos, this.materiales.materialesProyecto.vecinos, this.grupoProyecto, true)

        //Configurar modelos
        this.grupoProyecto.scale.set(0.05, 0.05, 0.05)
        this.grupoProyecto.position.set(2.84, 0.025, -5.67)
        if (this.debug.active) {
            this.debugProyecto.add(this.grupoProyecto.position, 'x').min(-10).max(10).step(0.01).name('Proyecto x')
            this.debugProyecto.add(this.grupoProyecto.position, 'y').min(-1).max(1).step(0.001).name('Proyecto y')
            this.debugProyecto.add(this.grupoProyecto.position, 'z').min(-10).max(10).step(0.01).name('Proyecto z')

        }

        this.escena.add(this.grupoProyecto)
    }
    crearDebug() {
        if (this.debug.active) {


            this.debugColores
                .addColor(this.colores.coloresMundo, 'colorAndenes')
                .onChange(() => {
                    this.materiales.materialesContexto.andenes.color.set(this.colores.coloresMundo.colorAndenes)
                })
                .name('Andenes')

            this.debugColores
                .addColor(this.colores.coloresMundo, 'colorEdificios')
                .onChange(() => {
                    this.materiales.materialesContexto.edificios.color.set(this.colores.coloresMundo.colorEdificios)
                })
                .name('Edificios')

            this.debugColores
                .addColor(this.colores.coloresMundo, 'colorVias')
                .onChange(() => {
                    this.materiales.materialesContexto.vias.color.set(this.colores.coloresMundo.colorVias)
                })
                .name('Vias')

            this.debugColores
                .addColor(this.colores.coloresMundo, 'colorTerreno')
                .onChange(() => {
                    this.materiales.materialesContexto.piso.color.set(this.colores.coloresMundo.colorTerreno)
                    this.materiales.materialesContexto.elevacion.color.set(this.colores.coloresMundo.colorTerreno)
                })
                .name('Terreno')

            this.debugColores
                .addColor(this.colores.coloresMundo, 'colorArboles')
                .onChange(() => {
                    this.materiales.materialesContexto.arbol1.color.set(this.colores.coloresMundo.colorArboles)
                    this.materiales.materialesContexto.arbol2.color.set(this.colores.coloresMundo.colorArboles)
                    this.materiales.materialesProyecto.arboles.color.set(this.colores.coloresMundo.colorArboles)
                    this.materiales.materialesProyecto.arbustos.color.set(this.colores.coloresMundo.colorArboles)
                })
                .name('Árboles')

                this.debugColores
                .addColor(this.colores.coloresMundo, 'colorProyecto')
                .onChange(() => {
                    this.materiales.materialesProyecto.torre_baja.color.set(this.colores.coloresMundo.colorProyecto)
                    this.materiales.materialesProyecto.torre_sole_1.color.set(this.colores.coloresMundo.colorProyecto)
                    this.materiales.materialesProyecto.torre_sole_2.color.set(this.colores.coloresMundo.colorProyecto)
                    this.materiales.materialesProyecto.comunal.color.set(this.colores.coloresMundo.colorProyecto)
                })
                .name('Proyecto')

                this.debugColores
                .addColor(this.colores.coloresMundo, 'colorNubes')
                .onChange(() => {
                    this.materiales.materialesContexto.nubes.color.set(this.colores.coloresMundo.colorNubes)
                })
                .name('Nubes')
        }
    }
} 