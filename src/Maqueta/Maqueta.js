//Librerias
import * as THREE from 'three'
import { Raycaster } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import gsap from 'gsap'
//Proyecto
import Camara from './Camara.js'
import Renderer from './Renderer.js'
import Tamanos from "./Utils/Tamanos.js"
import Tiempo from "./Utils/Tiempo.js"
import Colores from "./Mundo/Skins/Skin_2/Colores.js"
import Mundo from './Mundo/Mundo.js'
import Recursos from './Utils/Recursos.js'
import sources from './sources.js'
import Debug from './Utils/Debug.js'
import Materiales from './Mundo/Skins/Skin_2/Materiales.js'
import Interaccion from './Interaccion/Interaccion.js'
import Hotspots from './Interaccion/Hotspots.js'
import Inventario from './Inventario.js'



let instancia = null

export default class Maqueta {
    constructor(canvas) {
        if (instancia) {

            return instancia
        }

        instancia = this

        //Acceso global
        window.maqueta = this
        //Opciones
        this.canvas = canvas

        //Configuracion
        this.debug = new Debug()
        this.tamanos = new Tamanos()
        this.tiempo = new Tiempo()
        this.escena = new THREE.Scene()
        this.camara = new Camara()
        this.colores = new Colores()
        this.renderer = new Renderer()
        this.recursos = new Recursos(sources)
        this.mundo = new Mundo()
        this.materiales = new Materiales()
        this.raycaster = new Raycaster()
        this.hotspots = new Hotspots().hotspots
        this.frustum = new THREE.Frustum()
        this.inventario = new Inventario()
        this.raycasterAptos = new Raycaster()
        this.raycasterAptos.layers.set(1)
        this.mouse = new THREE.Vector2()
        this.interseccionActual = null
        this.brujula_dir = new THREE.Vector3()
        this.brujula_sph = new THREE.Spherical()
        this.brujula = document.getElementById('brujula')
        


        this.stats = Stats()

        if (this.debug.active) {
            document.body.appendChild(this.stats.dom)
        }

        this.tamanos.on('redimensionar', () => {
            this.redimensionar()
        })

        this.tiempo.on('tick', () => {
            this.actualizar()

            if (this.debug.active) {
                this.actualizarStats()
            }
        })



        // Esperar que cargue Recursos
        this.recursos.on('cargado', () => {
            this.interaccion = new Interaccion()
            window.addEventListener('mousemove', (event) => {
                this.mouse.x = event.clientX / this.tamanos.ancho * 2 - 1
                this.mouse.y = - (event.clientY / this.tamanos.alto) * 2 + 1
            })
            //
            this.canvas.addEventListener('click', () => {
                if (this.interseccionActual) {
                    const aptoActivo = this.interseccionActual.object
                    this.interaccion.quitarAislamiento(false)
                    
                    this.interaccion.aislarApto(aptoActivo.userData.id)
                }
            })
            //
            this.interaccion.btnCerrarTooltip.addEventListener('click', (event) => {
                event.preventDefault()
                this.interaccion.quitarAislamiento(true)
            })
            //
            this.iniciar()
        })
    }
    iniciar() {
        //Quitar loading
        const pantallaCarga = document.getElementById('pantalla-carga'),
        logo = pantallaCarga.querySelector('.logo')

        pantallaCarga.classList.add('cargado')
        
        //Mover camara
        const controles = this.camara.controles
        controles.enabled = false
        gsap.to(this.camara.instancia.position, {
            duration: 5,
            delay: 3,
            ease: "power3.out",
            x: -2.65,
            y: 1.87,
            z: -0.515,
            onUpdate: function () {
                controles.update()
            },
            onComplete: function () {
                controles.maxDistance = 4
                controles.enabled = true
                logo.classList.add('cargado')

                setTimeout(()=>{pantallaCarga.style.display = 'none'}, 1000)
            }
        })
    }

    redimensionar() {
        this.camara.redimensionar()
        this.renderer.redimensionar()
    }

    actualizar() {
        this.camara.actualizar()
        this.renderer.actualizar()
        this.posicionarHotspots()
        this.interactuarMascaras()
        this.moverBrujula()
        //console.log(this.camara.instancia.position)
        //this.mundo.rotarNubes()
    }
    actualizarStats() {
        this.stats.update()
    }

    posicionarHotspots() {
        //Evitar problema con hostspots fuera de cámara
        this.frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(this.camara.instancia.projectionMatrix, this.camara.instancia.matrixWorldInverse))
        //Controlar hotspots
        for (const hotspot of this.hotspots) {
            const screenPosition = hotspot.position.clone()
            screenPosition.project(this.camara.instancia)

            this.raycaster.setFromCamera(screenPosition, this.camara.instancia)
            const intersects = this.raycaster.intersectObjects(this.mundo.grupoProyecto.children, true)
            if (intersects.length === 0) {
                if (this.frustum.containsPoint(hotspot.position)) {
                    hotspot.element.classList.add('visible')
                } else {
                    hotspot.element.classList.remove('visible')
                }
            } else {
                const intersectionDistance = intersects[0].distance
                const hotspotDistance = hotspot.position.distanceTo(this.camara.instancia.position)

                if (intersectionDistance < hotspotDistance) {
                    hotspot.element.classList.remove('visible')
                }
                else {
                    hotspot.element.classList.add('visible')
                }
            }

            const translateX = screenPosition.x * this.tamanos.ancho * 0.5
            const translateY = screenPosition.y * this.tamanos.alto * - 0.5
            hotspot.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }
    interactuarMascaras() {
        if (this.mundo.mascarasProyecto.children.length > 0) {
            this.raycasterAptos.setFromCamera(this.mouse, this.camara.instancia)
            const objetosEvaluar = this.mundo.mascarasProyecto.children,
                intersecciones = this.raycasterAptos.intersectObjects(objetosEvaluar, true)
            if (intersecciones.length) {
                this.interseccionActual = intersecciones[0]
                
                if (this.interseccionActual.object.type === 'Mesh') {
                    for (const objeto of objetosEvaluar) {
                        for (const hijo of objeto.children) {
                            if (hijo.userData.activo === false) {
                                hijo.material = this.materiales.materialesProyecto.mascaras
                            }
                        }
                    }
                    if (this.interseccionActual.object.userData.activo === false) {
                        this.interseccionActual.object.material = this.materiales.materialesProyecto.mascaraHover
                    }
                }
            } else {
                if (this.interseccionActual) {
                    for (const objeto of objetosEvaluar) {
                        for (const hijo of objeto.children) {
                            if (hijo.userData.activo === false) {
                                hijo.material = this.materiales.materialesProyecto.mascaras
                            }
                        }
                    }
                }
                this.interseccionActual = null
            }
        }
    }
    moverBrujula() {
        this.camara.instancia.getWorldDirection(this.brujula_dir)
        this.brujula_sph.setFromVector3(this.brujula_dir)
        this.brujula.style.transform = `rotate(${THREE.Math.radToDeg(this.brujula_sph.theta) - 180}deg)`;
    }
    /*aislarApto(identificador) {

        const filasResultados = Array.from(document.querySelectorAll('#modal-unidades tbody tr'))
        const filasFavoritos = Array.from(document.querySelectorAll('#modal-favoritos tbody tr'))

        if (filasResultados) {
            filasResultados.forEach(fila => fila.classList.remove('activo'))
            let fila = filasResultados.find(fila => fila.dataset.apto === identificador)
            fila.classList.add('activo')
        }

        this.mundo.mascarasProyecto.traverse((child) => {

            if (child.type === "Mesh") {
                //Limpiar mascaras

                //Poner mascara
                if (child.userData.id === identificador) {
                    child.userData.activo = true
                    child.material = this.materiales.materialesProyecto.mascaraClick

                    this.moverCamara(child)


                    //Mostrar tooltip

                    this.interaccion.tooltipApto.classList.add('activo')
                    this.interaccion.btnMostrarApto.dataset.destino = identificador
                    //Pintar info

                    let obj = this.recursos.items.inventario.find(obj => obj.id === identificador)

                    this.interaccion.tool_torre.innerHTML = obj.torre
                    this.interaccion.tool_apto.innerHTML = obj.apto_tit
                    this.interaccion.tool_ac.innerHTML = obj.area_ac
                    this.interaccion.tool_ap.innerHTML = obj.area_ap
                    this.interaccion.tool_img.innerHTML = `<img src="${obj.img_planta}" alt="Planta de unidad">`
                }
            }
        })
    }*/
    moverCamara(child) {
        //Mover camara
        const aptoX = child.position.x * this.mundo.mascarasProyecto.scale.x + (this.tamanos.posicionProyecto.x * 1),
            aptoY = child.position.y * this.mundo.mascarasProyecto.scale.y + (this.tamanos.posicionProyecto.y * -1),
            aptoZ = child.position.z * this.mundo.mascarasProyecto.scale.z + (this.tamanos.posicionProyecto.z * 1)

        const controles = this.camara.controles
        controles.enabled = false

        //Cambiar posicion y target de camara
        if (child.userData.torre === "1") {
            this.tamanos.posicionCamara.x = 1.5
        } else if (child.userData.torre === "2") {
            this.tamanos.posicionCamara.x = -1
        } else if (child.userData.torre === "3") {
            this.tamanos.posicionCamara.x = -3
        } else {
            console.log('No salio bien')
        }

        /*if (child.userData.vista === "Norte") {
            camaraZ = -6
        } else {
            camaraZ = 6
        }*/

        gsap.to(this.camara.instancia.position, {
            duration: 1,
            /*x: this.tamanos.posicionCamara.x,
            y: this.tamanos.posicionCamara.y,
            //z: this.tamanos.posicionCamara.z,
            z: 6,*/
            x: -1.54,
            y: 2.154,
            z: 2.58,
            onUpdate: function () {
                controles.update()
            },
            onComplete: function () {
                controles.enabled = true
            }
        })

        gsap.to(controles.target, {
            duration: 1,
            x: aptoX,
            y: aptoY,
            z: aptoZ,
            onUpdate: function () {
                controles.update();
            },
            onComplete: function () {
                controles.enabled = true;
            }
        })

    }
    /*quitarAislamiento(animarCamara) {
        this.interaccion.tooltipApto.classList.remove('activo')
        this.interaccion.btnMostrarApto.dataset.destino = ''

        const filasResultados = Array.from(document.querySelectorAll('#modal-unidades tbody tr'))
        const filasFavoritos = Array.from(document.querySelectorAll('#modal-favoritos tbody tr'))

        if (filasResultados) {
            filasResultados.forEach(fila => fila.classList.remove('activo'))
        }

        this.mundo.mascarasProyecto.traverse((child) => {
            if (child.type === "Mesh") {
                child.material = this.materiales.materialesProyecto.mascaras
                child.userData.activo = false
                //child.visible = false
            }
        })

        if (animarCamara) {
            const controles = this.camara.controles
            controles.enabled = false
            gsap.to(controles.target, {
                duration: 1,
                x: 0,
                y: 0,
                z: 0,
                onUpdate: function () {
                    controles.update();
                },
                onComplete: function () {
                    controles.enabled = true;
                }
            })

            gsap.to(this.camara.instancia.position, {
                duration: 1,
                x: this.camara.instancia.position.x,
                y: this.camara.instancia.position.y,
                z: this.camara.instancia.position.z * 1.5,
                onUpdate: function () {
                    controles.update()
                },
                onComplete: function () {
                    controles.enabled = true
                }
            })
        }

    }*/
}