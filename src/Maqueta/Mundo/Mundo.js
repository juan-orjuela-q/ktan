//Librerias
import * as THREE from 'three'
//Proyecto
import Maqueta from '../Maqueta.js'
import Ambiente from './Skins/Skin_1/Ambiente.js'
import Mapa from './Mapa.js'
import Modelo from './Modelo.js'
import Materiales from './Skins/Skin_1/Materiales.js'

export default class Mundo {
    constructor() {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores
        this.recursos = this.maqueta.recursos
        this.escalaProyecto = this.maqueta.tamanos.escalaProyecto
        this.posicionProyecto = this.maqueta.tamanos.posicionProyecto
        this.materiales = new Materiales()
        this.mapa = {}
        this.debug = this.maqueta.debug

        //Debug
        if (this.debug.active) {
            this.debugColores = this.debug.ui.addFolder('Colores')
            this.debugProyecto = this.debug.ui.addFolder('Proyecto')
            this.debugTerreno = this.debug.ui.addFolder('Terreno')
            this.debugMapa = this.debug.ui.addFolder('Mapa')
        }

        this.grupoMapa = new THREE.Group()
        this.grupoVias = new THREE.Group()
        this.grupoAndenes = new THREE.Group()
        this.grupoTransitoFijo = new THREE.Group()
        this.grupoTransito = new THREE.Group()
        this.grupoEdificios = new THREE.Group()
        this.grupoArboles = new THREE.Group()
        this.grupoProyecto = new THREE.Group()
        this.mascarasProyecto = new THREE.Group()

        this.crearHelper()

        // Esperar que cargue Recursos
        this.recursos.on('cargado', () => {
            // Setup
            //this.mapa = new Mapa()
            this.crearTerreno()
            this.crearMapa()
            //this.crearVegetacion()
            this.crearModelos()
            this.crearMascaras()
            this.crearDebug()
            this.ambiente = new Ambiente()
        })
    }
    numAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    crearHelper() {
        const axesHelper = new THREE.AxesHelper(2)
        //this.escena.add(axesHelper)

        //Test Mesh
        this.bolaHelper = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 16, 16),
            new THREE.MeshStandardMaterial({ color: this.colores.paleta.color3})
        )
        //this.escena.add(this.bolaHelper)

    }
    crearTerreno() {
        //Piso
        this.piso = new THREE.Mesh(
            //new THREE.CircleGeometry(36, 32),
            new THREE.CircleGeometry(120, 32),
            this.materiales.materialesContexto.piso
        )
        this.piso.receiveShadow = true
        this.piso.rotation.x = - Math.PI * 0.5
        this.piso.position.y = -0.01
        this.escena.add(this.piso)

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

        //Plataforma
        // const plataforma = new THREE.Mesh(
        //     new THREE.BoxGeometry(15, 7.5, 0.05),
        //     this.materiales.materialesContexto.andenes
        // )
        // plataforma.rotation.x = - Math.PI * 0.5
        // plataforma.position.y = 0.0025
        // plataforma.position.z = -2
        // plataforma.receiveShadow = true
        //this.escena.add(plataforma)
        //Satelital
        // const satelital = new THREE.Mesh(
        //     new THREE.PlaneGeometry(160, 90, 60, 60),
        //     this.materiales.materialesContexto.satelital
        // )
        // satelital.rotation.x = - Math.PI * 0.5
        // satelital.position.y = 0.0025
        // satelital.receiveShadow = true
        //this.escena.add(satelital)
    }
    rotarNubes() {
        this.nubes.rotation.z += 0.001
    }
    crearMapa() {
        //Andenes
        this.mapa.andenes = new Mapa(this.recursos.items.svg_andenes, this.materiales.materialesContexto.andenes, this.grupoAndenes, true, 0.075)
        this.grupoAndenes.position.set(4, 25.9, 0)
        this.grupoMapa.add(this.grupoAndenes)

        //Vias
        this.mapa.vias = new Mapa(this.recursos.items.svg_vias, this.materiales.materialesContexto.vias, this.grupoVias)
        this.grupoVias.position.set(0, 0, -0.01)
        this.grupoMapa.add(this.grupoVias)
        //Edificios
        this.mapa.edificios = new Mapa(this.recursos.items.svg_edificios, this.materiales.materialesContexto.edificios, this.grupoEdificios, true, 0.75, this.materiales.materialesContexto.edificiosLinea)
        this.grupoEdificios.position.set(5.3, 28.7, - 0.76)
        this.grupoMapa.add(this.grupoEdificios)
        //Edificios Altos
        this.mapa.edificiosAltos = new Mapa(this.recursos.items.svg_edificios_altos, this.materiales.materialesContexto.edificios, this.grupoEdificios, true, 3.75, this.materiales.materialesContexto.edificiosLinea)
        //this.grupoMapa.add(this.grupoEdificiosAltos)
        //Agregar arboles
        const arboles = ''
        //Configurar mapa
        this.grupoMapa.rotation.x = Math.PI * 0.5
        //this.grupoMapa.position.set(-68.5, 0.01, -62.8)
        this.grupoMapa.position.set(-72.9, 0.01, -50.9)
        this.grupoMapa.rotation.z = -0.07
        this.grupoMapa.scale.set(0.64, 0.64, 0.64)
        this.escena.add(this.grupoMapa)
        if (this.debug.active) {
            this.debugMapa.add(this.grupoMapa.position, 'x').min(-1000).max(100).step(0.1).name('Mapa x')
            this.debugMapa.add(this.grupoMapa.position, 'y').min(-10).max(10).step(0.01).name('Mapa y')
            this.debugMapa.add(this.grupoMapa.position, 'z').min(-100).max(100).step(0.1).name('Mapa z')

        }
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
            child.material = this.materiales.materialesProyecto.arboles
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
            child.material = this.materiales.materialesProyecto.arboles
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
        this.cubierta_verde = new Modelo(this.recursos.items.modelo_cubierta_verde, this.materiales.materialesProyecto.cubierta_verde, this.grupoProyecto)
        
        this.piso1_bajada = new Modelo(this.recursos.items.modelo_piso1_bajada, this.materiales.materialesProyecto.piso1_bajada, this.grupoProyecto)
        this.piso1_entrada_vehiculos = new Modelo(this.recursos.items.modelo_piso1_entrada_vehiculos, this.materiales.materialesProyecto.piso1_entrada_vehiculos, this.grupoProyecto)
        this.piso1_entrada = new Modelo(this.recursos.items.modelo_piso1_entrada, this.materiales.materialesProyecto.piso1_entrada, this.grupoProyecto)
        this.piso1_muros = new Modelo(this.recursos.items.modelo_piso1_muros, this.materiales.materialesProyecto.piso1_muros, this.grupoProyecto)
        this.piso1_parque = new Modelo(this.recursos.items.modelo_piso1_parque, this.materiales.materialesProyecto.piso1_parque, this.grupoProyecto)
        this.piso1_pergola = new Modelo(this.recursos.items.modelo_piso1_pergola, this.materiales.materialesProyecto.piso1_pergola, this.grupoProyecto)
        this.piso1_placa = new Modelo(this.recursos.items.modelo_piso1_placa, this.materiales.materialesProyecto.piso1_placa, this.grupoProyecto)
        this.piso1_ventanas = new Modelo(this.recursos.items.modelo_piso1_ventanas, this.materiales.materialesProyecto.piso1_ventanas, this.grupoProyecto)
        this.piso1 = new Modelo(this.recursos.items.modelo_piso1, this.materiales.materialesProyecto.piso1, this.grupoProyecto)

        //this.primer_piso = new Modelo(this.recursos.items.modelo_primer_piso, this.materiales.materialesProyecto.primer_piso, this.grupoProyecto)
        this.rampa = new Modelo(this.recursos.items.modelo_rampa, this.materiales.materialesProyecto.rampa, this.grupoProyecto)

        this.torre1_balcon_plano = new Modelo(this.recursos.items.modelo_torre1_balcon_plano, this.materiales.materialesProyecto.torre1_balcon_plano, this.grupoProyecto, false, true)
        this.torre1_balcon = new Modelo(this.recursos.items.modelo_torre1_balcon, this.materiales.materialesProyecto.torre1_balcon, this.grupoProyecto, false, true)
        this.torre1_pergolas = new Modelo(this.recursos.items.modelo_torre1_pergolas, this.materiales.materialesProyecto.torre1_pergolas_color, this.grupoProyecto)
        this.torre1_ventanas = new Modelo(this.recursos.items.modelo_torre1_ventanas, this.materiales.materialesProyecto.torre1_ventanas, this.grupoProyecto, false, true)
        this.torre1 = new Modelo(this.recursos.items.modelo_torre1, this.materiales.materialesProyecto.torre1_color, this.grupoProyecto)

        this.torre2_balcon_plano = new Modelo(this.recursos.items.modelo_torre2_balcon_plano, this.materiales.materialesProyecto.torre2_balcon_plano, this.grupoProyecto, false, true)
        this.torre2_balcon = new Modelo(this.recursos.items.modelo_torre2_balcon, this.materiales.materialesProyecto.torre2_balcon, this.grupoProyecto, false, true)
        this.torre2_pergolas = new Modelo(this.recursos.items.modelo_torre2_pergolas, this.materiales.materialesProyecto.torre2_pergolas_color, this.grupoProyecto)
        this.torre2_ventanas = new Modelo(this.recursos.items.modelo_torre2_ventanas, this.materiales.materialesProyecto.torre2_ventanas, this.grupoProyecto, false, true)
        this.torre2 = new Modelo(this.recursos.items.modelo_torre2, this.materiales.materialesProyecto.torre2_color, this.grupoProyecto)

        this.torre3_balcon_plano = new Modelo(this.recursos.items.modelo_torre3_balcon_plano, this.materiales.materialesProyecto.torre3_balcon_plano, this.grupoProyecto, false, true)
        this.torre3_balcon = new Modelo(this.recursos.items.modelo_torre3_balcon, this.materiales.materialesProyecto.torre3_balcon, this.grupoProyecto, false, true)
        this.torre3_pergolas = new Modelo(this.recursos.items.modelo_torre3_pergolas, this.materiales.materialesProyecto.torre3_pergolas_color, this.grupoProyecto)
        this.torre3_ventanas = new Modelo(this.recursos.items.modelo_torre3_ventanas, this.materiales.materialesProyecto.torre3_ventanas, this.grupoProyecto, false, true)
        this.torre3 = new Modelo(this.recursos.items.modelo_torre3, this.materiales.materialesProyecto.torre3_color, this.grupoProyecto)

        //Configurar modelos
        this.grupoProyecto.scale.set(this.escalaProyecto.x, this.escalaProyecto.y, this.escalaProyecto.z)
        this.grupoProyecto.position.set(this.posicionProyecto.x, this.posicionProyecto.y, this.posicionProyecto.z)
        //this.grupoProyecto.rotation.y = Math.PI * 0.25
        if (this.debug.active) {
            this.debugProyecto.add(this.grupoProyecto.position, 'x').min(-10).max(10).step(0.01).name('Proyecto x')
            this.debugProyecto.add(this.grupoProyecto.position, 'y').min(-10).max(10).step(0.01).name('Proyecto y')
            this.debugProyecto.add(this.grupoProyecto.position, 'z').min(-10).max(10).step(0.01).name('Proyecto z')

        }
        this.escena.add(this.grupoProyecto)
    }
    crearMascaras() {
        this.mascarasProyecto.scale.set(this.escalaProyecto.x, this.escalaProyecto.y, this.escalaProyecto.z)
        this.mascarasProyecto.position.set(this.posicionProyecto.x, this.posicionProyecto.y, this.posicionProyecto.z)
        this.escena.add(this.mascarasProyecto)
    }

    crearDebug() {
        if (this.debug.active) {
            //Helper
            this.debugProyecto.add(this.bolaHelper.position, 'x').min(-10).max(10).step(0.01).name('Helper x')
            this.debugProyecto.add(this.bolaHelper.position, 'y').min(-10).max(10).step(0.01).name('Helper y')
            this.debugProyecto.add(this.bolaHelper.position, 'z').min(-10).max(10).step(0.01).name('Helper z')

            
            //Colores
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

            this.debugColores
                .addColor(this.colores.coloresMundo, 'colorCarros')
                .onChange(() => {
                    this.materiales.materialesContexto.carros.color.set(this.colores.coloresMundo.colorCarros)
                })
                .name('Carros')
        }
    }
} 