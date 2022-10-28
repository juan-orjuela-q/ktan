//Librerias
import * as THREE from 'three'
//Proyecto
import Maqueta from '../Maqueta.js'
import Ambiente from './Skins/Skin_Blanco/Ambiente.js'
import Mapa from './Mapa.js'
import Modelo from './Modelo.js'
import Materiales from './Skins/Skin_Blanco/Materiales.js'

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
        this.grupoManzanas = new THREE.Group()
        this.grupoTransitoFijo = new THREE.Group()
        this.grupoTransito = new THREE.Group()
        this.grupoEdificios = new THREE.Group()
        this.grupoEdificiosBajos = new THREE.Group()
        this.grupoArbolesCoord = new THREE.Group()
        this.grupoArboles = new THREE.Group()
        this.grupoArbolesParticulas = new THREE.Group()
        this.grupoPersonas = new THREE.Group()
        this.grupoProyecto = new THREE.Group()
        this.mascarasProyecto = new THREE.Group()
        

        this.crearHelper()

        // Esperar que cargue Recursos
        this.recursos.on('cargado', () => {
            // Setup
            
            this.crearTerreno()
            this.crearMapa()
            //this.crearVegetacion()
            this.crearVegetacionParticulas()
            this.crearModelos()
            this.crearPersonas()
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
            //new THREE.PlaneGeometry(150, 150, 30, 30),
            new THREE.CircleGeometry(75, 32),
            this.materiales.materialesContexto.piso
        )
        this.piso.receiveShadow = true
        this.piso.rotation.x = - Math.PI * 0.5
        this.piso.position.y = -0.01
        this.escena.add(this.piso)


        //Satelital
        /*this.satelital = new THREE.Mesh(
            new THREE.PlaneGeometry(55, 55, 30, 30),
            //new THREE.CircleGeometry(24, 32),
            this.materiales.materialesContexto.satelital
        )
        this.satelital.receiveShadow = true
        this.satelital.rotation.x = - Math.PI * 0.5
        this.satelital.rotation.z = Math.PI * 1
        this.satelital.position.y = 0.01
        this.escena.add(this.satelital)*/

        //Terreno con elevacion
        const elevacion = new THREE.Mesh(
            new THREE.PlaneGeometry(150, 150, 60, 60),
            this.materiales.materialesContexto.elevacion
        )
        elevacion.rotation.x = - Math.PI * 0.5
        elevacion.rotation.z = Math.PI * -0.5
        elevacion.position.y = -1
        this.escena.add(elevacion)

        //Nubes
        const nubesGeo = new THREE.SphereGeometry(130, 32, 16)
        this.nubes = new THREE.Mesh(nubesGeo, this.materiales.materialesContexto.nubes)
        this.escena.add(this.nubes);
        
    }
    rotarNubes() {
        this.nubes.rotation.z += 0.001
    }
    crearMapa() {
    //Andenes
    this.mapa.andenes = new Mapa(this.recursos.items.svg_andenes, this.materiales.materialesContexto.andenes, this.grupoAndenes, true, 0.1)
    this.grupoAndenes.position.set(0, 0, -0.2)
    this.grupoMapa.add(this.grupoAndenes)

    this.mapa.manzanas = new Mapa(this.recursos.items.svg_manzanas, this.materiales.materialesContexto.manzanas, this.grupoManzanas, true, 0.1)
    

    this.grupoMapa.add(this.grupoManzanas)

    //Vias
    //this.mapa.vias = new Mapa(this.recursos.items.svg_vias, this.materiales.materialesContexto.vias, this.grupoVias)
    //this.grupoVias.position.set(0, 0, -0.01)
    //this.grupoMapa.add(this.grupoVias)

    //Edificios
    this.mapa.edificios = new Mapa(this.recursos.items.svg_edificios, this.materiales.materialesContexto.edificios, this.grupoEdificios, true, 12, this.materiales.materialesContexto.edificiosLinea)
    this.mapa.vecinos = new Mapa(this.recursos.items.svg_vecinos, this.materiales.materialesContexto.vecinos, this.grupoEdificios, true, 12, this.materiales.materialesContexto.edificiosLinea)
    this.grupoEdificios.position.set(0, 0, -12)
    this.grupoMapa.add(this.grupoEdificios)

    //Edificios Bajos
    this.mapa.edificiosBajos = new Mapa(this.recursos.items.svg_edificios_bajos, this.materiales.materialesContexto.edificios, this.grupoEdificiosBajos, true, 4, this.materiales.materialesContexto.edificiosLinea)
    this.mapa.vecinosBajos = new Mapa(this.recursos.items.svg_vecinos_bajos, this.materiales.materialesContexto.vecinos, this.grupoEdificiosBajos, true, 4, this.materiales.materialesContexto.edificiosLinea)
    this.grupoEdificiosBajos.position.set(0, 0, -4)
    this.grupoMapa.add(this.grupoEdificiosBajos)

    //Transito
    this.mapa.transito = new Mapa(this.recursos.items.svg_transito, this.materiales.materialesContexto.transito, this.grupoTransito, false)
    this.grupoTransito.position.set(0, 0, 0.01)
    this.grupoMapa.add(this.grupoTransito)

    //Coord Arboles
        this.mapa.coord_arboles = new Mapa(this.recursos.items.svg_coord_arboles, this.materiales.materialesContexto.arboles, this.grupoArbolesCoord, false)
        this.grupoArbolesCoord.position.set(0, 0, 0.03)
        this.grupoMapa.add(this.grupoArbolesCoord)

        console.log(this.grupoArbolesCoord)

        
        //Configurar mapa

        this.grupoMapa.rotation.x = Math.PI * 0.5
        this.grupoMapa.position.set(-74.481, 0, -76.01)
        this.grupoMapa.scale.set(0.0696, 0.0696, 0.0696)

        this.escena.add(this.grupoMapa)
        
    }
    crearVegetacionParticulas(){

        const escala = 0.0696
        
        this.escena.add(this.grupoArbolesParticulas)
        
        this.vegetacionParticulas = {}
        this.vegetacionParticulas.vegetacionSVG = this.recursos.items.svg_coord_arboles

        const pathsSVG = this.vegetacionParticulas.vegetacionSVG.paths

        //Prueba particula

        //Geometria custom
        const particulasGeometriaCustom = new THREE.BufferGeometry(),
            numArboles = pathsSVG.length
   
        const posiciones = new Float32Array(numArboles * 3)

        for (let i = 0; i < numArboles; i++) {
            //x
            posiciones[i * 3] = pathsSVG[i].subPaths[0].currentPoint.x * escala -74.481
            //y
            posiciones[i * 3 + 1] = 0.15
            //z
            posiciones[i * 3 + 2] = pathsSVG[i].subPaths[0].currentPoint.y * escala -76.01

             //posiciones[i] = Math.random() * 10
        }


        
        particulasGeometriaCustom.setAttribute(
            'position',
            new THREE.BufferAttribute(posiciones, 3)
        )
        
        //
        const particulasGeometria = new THREE.SphereGeometry(10, 32, 32)

        const particulasMaterial = new THREE.PointsMaterial()
        particulasMaterial.size = 0.45
        particulasMaterial.sizeAttenuation = true
        particulasMaterial.map = this.recursos.items.textura_arbol_tipo1
        particulasMaterial.alphaMap = this.recursos.items.textura_arbol_tipo1_alpha
        particulasMaterial.transparent = true
        particulasMaterial.alphaTest = 0.001

        const particulas = new THREE.Points(particulasGeometriaCustom, particulasMaterial)

        this.grupoArbolesParticulas.add(particulas)
    }
    crearPersonas(){

        const escala = 0.0696
        
        this.escena.add(this.grupoPersonas)
        
        //this.vegetacionParticulas = {}
        this.personas = this.recursos.items.svg_coord_personas

        const pathsSVG = this.personas.paths

        //Prueba particula

        //Geometria custom
        const particulasGeometria = new THREE.BufferGeometry(),
            num = pathsSVG.length
   
        const posiciones = new Float32Array(num * 3)

        for (let i = 0; i < num; i++) {
            //x
            posiciones[i * 3] = pathsSVG[i].subPaths[0].currentPoint.x * escala -74.481
            //y
            posiciones[i * 3 + 1] = 0.1
            //z
            posiciones[i * 3 + 2] = pathsSVG[i].subPaths[0].currentPoint.y * escala -76.01

             //posiciones[i] = Math.random() * 10
        }


        
        particulasGeometria.setAttribute(
            'position',
            new THREE.BufferAttribute(posiciones, 3)
        )
        
        //
        //const particulasGeometria = new THREE.SphereGeometry(10, 32, 32)

        const particulasMaterial = new THREE.PointsMaterial()
        particulasMaterial.size = 0.1
        particulasMaterial.sizeAttenuation = true
        particulasMaterial.map = this.recursos.items.textura_personas_tipo1
        particulasMaterial.alphaMap = this.recursos.items.textura_personas_tipo1_alpha
        particulasMaterial.transparent = true
        particulasMaterial.alphaTest = 0.001

        const particulas = new THREE.Points(particulasGeometria, particulasMaterial)

        this.grupoPersonas.add(particulas)
    }
    crearVegetacion() {
        this.grupoArboles.scale.set(0.0696, 0.0696, 0.0696)

        
        this.grupoArboles.position.set(-74.1, 0, -89)
        
        
        this.vegetacion = {}

        this.vegetacion.vegetacionSVG = this.recursos.items.svg_coord_arboles
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
            child.material = this.materiales.materialesContexto.arboles
            //child.castShadow = true
        })
        for (let p = 0; p < posicionArboles.length; p++) {
            const n = this.numAleatorio(65, 100) / 100
            const r = (Math.random() * 2) * Math.PI
            const arbolito = new THREE.Object3D()
            this.vegetacion.vegetacionModelo1.scale.set(1,1,1)
            arbolito.add(this.vegetacion.vegetacionModelo1.clone())
            arbolito.position.set(posicionArboles[p].x, -0.05, posicionArboles[p].y)
            arbolito.children[0].children[0].scale.set(n, n, n)
            arbolito.children[0].children[0].rotation.y = r
            this.grupoArboles.add(arbolito)
        }

        this.escena.add(this.grupoArboles)
        //Agregar grupo 2
        this.vegetacion.vegetacionModelo2.traverse((child) => {
            child.material = this.materiales.materialesContexto.arboles
            //child.castShadow = true
        })
        for (let p = 0; p < posicionArboles2.length; p++) {
            const n = this.numAleatorio(45, 90) / 100
            const r = (Math.random() * 2) * Math.PI
            const arbolito = new THREE.Object3D()
            this.vegetacion.vegetacionModelo2.scale.set(1,1,1)
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
        this.arboles = new Modelo(this.recursos.items.modelo_arboles, this.materiales.materialesProyecto.arboles, this.grupoProyecto)

        this.cubierta_verde = new Modelo(this.recursos.items.modelo_cubierta_verde, this.materiales.materialesProyecto.cubierta_verde, this.grupoProyecto)
        
        //*this.piso1_bajada = new Modelo(this.recursos.items.modelo_piso1_bajada, this.materiales.materialesProyecto.piso1_bajada, this.grupoProyecto)
       


        this.piso1_entrada = new Modelo(this.recursos.items.modelo_piso1_entrada, this.materiales.materialesProyecto.piso1_entrada, this.grupoProyecto, false, false)
        this.piso1_muros = new Modelo(this.recursos.items.modelo_piso1_muros, this.materiales.materialesProyecto.piso1_muros, this.grupoProyecto, false, false)
        // this.piso1_parque = new Modelo(this.recursos.items.modelo_piso1_parque, this.materiales.materialesProyecto.piso1_parque, this.grupoProyecto, false, false)
        this.piso1_pergola = new Modelo(this.recursos.items.modelo_piso1_pergola, this.materiales.materialesProyecto.piso1_pergola, this.grupoProyecto, false, false)
        this.piso1_placa = new Modelo(this.recursos.items.modelo_piso1_placa, this.materiales.materialesProyecto.piso1_placa, this.grupoProyecto, false, false)
        this.piso1_ventanas = new Modelo(this.recursos.items.modelo_piso1_ventanas, this.materiales.materialesProyecto.piso1_ventanas, this.grupoProyecto, false, true)
        this.piso1 = new Modelo(this.recursos.items.modelo_piso1, this.materiales.materialesProyecto.piso1, this.grupoProyecto, false, false)

        
        
        this.rampa = new Modelo(this.recursos.items.modelo_rampa, this.materiales.materialesProyecto.rampa, this.grupoProyecto)

        this.torre1_balcon_plano = new Modelo(this.recursos.items.modelo_torre1_balcon_plano, this.materiales.materialesProyecto.torre1_balcon_plano, this.grupoProyecto, false, true)
        this.torre1_balcon = new Modelo(this.recursos.items.modelo_torre1_balcon, this.materiales.materialesProyecto.torre1_balcon, this.grupoProyecto, false, true)
        this.torre1_pergolas = new Modelo(this.recursos.items.modelo_torre1_pergolas, this.materiales.materialesProyecto.torre1_pergolas, this.grupoProyecto, false, true)
        this.torre1_ventanas = new Modelo(this.recursos.items.modelo_torre1_ventanas, this.materiales.materialesProyecto.torre1_ventanas, this.grupoProyecto, false, true)
        this.torre1 = new Modelo(this.recursos.items.modelo_torre1, this.materiales.materialesProyecto.torre1, this.grupoProyecto, true, true)

        this.torre2_balcon_plano = new Modelo(this.recursos.items.modelo_torre2_balcon_plano, this.materiales.materialesProyecto.torre2_balcon_plano, this.grupoProyecto, false, true)
        this.torre2_balcon = new Modelo(this.recursos.items.modelo_torre2_balcon, this.materiales.materialesProyecto.torre2_balcon, this.grupoProyecto, false, true)
        this.torre2_pergolas = new Modelo(this.recursos.items.modelo_torre2_pergolas, this.materiales.materialesProyecto.torre2_pergolas, this.grupoProyecto, false, true)
        this.torre2_ventanas = new Modelo(this.recursos.items.modelo_torre2_ventanas, this.materiales.materialesProyecto.torre2_ventanas, this.grupoProyecto, false, true)
        this.torre2 = new Modelo(this.recursos.items.modelo_torre2, this.materiales.materialesProyecto.torre2, this.grupoProyecto, true, true)

        this.torre3_balcon_plano = new Modelo(this.recursos.items.modelo_torre3_balcon_plano, this.materiales.materialesProyecto.torre3_balcon_plano, this.grupoProyecto, false, true)
        this.torre3_balcon = new Modelo(this.recursos.items.modelo_torre3_balcon, this.materiales.materialesProyecto.torre3_balcon, this.grupoProyecto, false, true)
        this.torre3_pergolas = new Modelo(this.recursos.items.modelo_torre3_pergolas, this.materiales.materialesProyecto.torre3_pergolas, this.grupoProyecto, false, true)
        this.torre3_ventanas = new Modelo(this.recursos.items.modelo_torre3_ventanas, this.materiales.materialesProyecto.torre3_ventanas, this.grupoProyecto, false, true)
        this.torre3 = new Modelo(this.recursos.items.modelo_torre3, this.materiales.materialesProyecto.torre3, this.grupoProyecto, true, true)

        //Configurar modelos
        this.grupoProyecto.scale.set(this.escalaProyecto.x, this.escalaProyecto.y, this.escalaProyecto.z)
        this.grupoProyecto.position.set(this.posicionProyecto.x, this.posicionProyecto.y, this.posicionProyecto.z)
        this.grupoProyecto.rotation.y = Math.PI * - 0.3
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
        this.mascarasProyecto.rotation.y = Math.PI * - 0.3
        this.escena.add(this.mascarasProyecto)
    }

    crearDebug() {
        if (this.debug.active) {
            //Helper
            this.debugProyecto.add(this.bolaHelper.position, 'x').min(-50).max(50).step(0.01).name('Helper x')
            this.debugProyecto.add(this.bolaHelper.position, 'y').min(-50).max(50).step(0.01).name('Helper y')
            this.debugProyecto.add(this.bolaHelper.position, 'z').min(-50).max(50).step(0.01).name('Helper z')

            this.debugProyecto.add(this.escalaProyecto, 'x').min(0.01).max(0.1).step(0.01).name('Proyecto scale x')
            this.debugProyecto.add(this.escalaProyecto, 'y').min(0.01).max(0.1).step(0.01).name('Proyecto scale y')
            this.debugProyecto.add(this.escalaProyecto, 'z').min(0.01).max(0.1).step(0.01).name('Proyecto scale z')

            this.debugProyecto.add(this.grupoEdificios.position, 'x').min(-100).max(100).step(1).name('Edificios x')
            this.debugProyecto.add(this.grupoEdificios.position, 'y').min(-100).max(100).step(1).name('Edificios y')
            this.debugProyecto.add(this.grupoEdificios.position, 'z').min(-100).max(100).step(1).name('Edificios z')

            this.debugMapa.add(this.grupoMapa.position, 'x').min(-100).max(100).step(0.001).name('Mapa x')
            this.debugMapa.add(this.grupoMapa.position, 'y').min(-100).max(100).step(0.001).name('Mapa y')
            this.debugMapa.add(this.grupoMapa.position, 'z').min(-100).max(100).step(0.001).name('Mapa z')

            this.debugMapa.add(this.grupoMapa.scale, 'x').min(0.0625).max(0.1).step(0.0001).name('Mapa scale x')
            this.debugMapa.add(this.grupoMapa.scale, 'y').min(0.0625).max(0.1).step(0.0001).name('Mapa scale y')
            this.debugMapa.add(this.grupoMapa.scale, 'z').min(0.0625).max(0.1).step(0.0001).name('Mapa scale z')

            this.debugMapa.add(this.grupoAndenes.position, 'x').min(-1000).max(100).step(0.1).name('Andenes x')
            this.debugMapa.add(this.grupoAndenes.position, 'y').min(-10).max(10).step(0.01).name('Andenes y')
            this.debugMapa.add(this.grupoAndenes.position, 'z').min(-100).max(100).step(0.1).name('Andenes z')

            this.debugMapa.add(this.grupoTransito.position, 'x').min(-100).max(100).step(0.1).name('Transito x')
            this.debugMapa.add(this.grupoTransito.position, 'y').min(-100).max(100).step(0.01).name('Transito y')
            this.debugMapa.add(this.grupoTransito.position, 'z').min(-100).max(100).step(0.1).name('Transito z')

            this.debugMapa.add(this.grupoArboles.position, 'x').min(-100).max(100).step(0.1).name('Arboles x')
            this.debugMapa.add(this.grupoArboles.position, 'y').min(-100).max(100).step(0.01).name('Arboles y')
            this.debugMapa.add(this.grupoArboles.position, 'z').min(-100).max(100).step(0.1).name('Arboles z')

            this.debugMapa.add(this.grupoArboles.scale, 'x').min(0.1).max(5).step(0.01).name('Arboles s x')
            this.debugMapa.add(this.grupoArboles.scale, 'y').min(0.1).max(5).step(0.01).name('Arboles s y')
            this.debugMapa.add(this.grupoArboles.scale, 'z').min(0.1).max(5).step(0.01).name('Arboles s z')

            
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
                    this.materiales.materialesContexto.piso.color.set(this.colores.coloresMundo.colorVias)
                })
                .name('Vias')

            this.debugColores
                .addColor(this.colores.coloresMundo, 'colorTerreno')
                .onChange(() => {
                    
                    this.materiales.materialesContexto.elevacion.color.set(this.colores.coloresMundo.colorTerreno)
                    this.materiales.materialesContexto.manzanas.color.set(this.colores.coloresMundo.colorTerreno)
                })
                .name('Terreno')

            this.debugColores
                .addColor(this.colores.coloresMundo, 'colorArboles')
                .onChange(() => {
                    this.materiales.materialesProyecto.arboles.color.set(this.colores.coloresMundo.colorArboles)
                    this.materiales.materialesContexto.arboles.color.set(this.colores.coloresMundo.colorArboles)
                })
                .name('Árboles')

            this.debugColores
                .addColor(this.colores.coloresMundo, 'colorProyecto')
                .onChange(() => {
                    this.materiales.materialesProyecto.torre1.color.set(this.colores.coloresMundo.colorProyecto)
                    this.materiales.materialesProyecto.torre2.color.set(this.colores.coloresMundo.colorProyecto)
                    this.materiales.materialesProyecto.torre3.color.set(this.colores.coloresMundo.colorProyecto)
                    
                })
                .name('Proyecto')

            this.debugColores
                .addColor(this.colores.coloresMundo, 'colorNubes')
                .onChange(() => {
                    this.materiales.materialesContexto.nubes.color.set(this.colores.coloresMundo.colorNubes)
                })
                .name('Nubes')

            /*this.debugColores
                .addColor(this.colores.coloresMundo, 'colorCarros')
                .onChange(() => {
                    this.materiales.materialesContexto.carros.color.set(this.colores.coloresMundo.colorCarros)
                })
                .name('Carros')*/
        }
    }
} 