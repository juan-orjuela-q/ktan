//Librerias
import * as THREE from 'three'
import { Raycaster } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
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



let instancia = null

export default class Maqueta 
{
    constructor(canvas)
    {
        if(instancia) {

            return instancia
        }

        instancia =  this
        
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

  
        this.stats = Stats()
        
        if(this.debug.active) {
            document.body.appendChild(this.stats.dom)
        }
        
        
        
        this.tamanos.on('redimensionar', () => {
            this.redimensionar()
        })

        this.tiempo.on('tick', () => {
            this.actualizar()
            
            if(this.debug.active) {
                this.actualizarStats()
            }
        })

        // Esperar que cargue Recursos
        this.recursos.on('cargado', () => {
            this.interaccion = new Interaccion()
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
        //this.mundo.rotarNubes()
    }
    actualizarStats() {
        this.stats.update()
    }
    probando() {
        console.log(this.hotspots)
    }
    posicionarHotspots(){
        for (const hotspot of this.hotspots) {
            const screenPosition = hotspot.position.clone()
            screenPosition.project(this.camara.instancia)
    
            this.raycaster.setFromCamera(screenPosition, this.camara.instancia)
            //const intersects = raycaster.intersectObjects(escenaPrincipal.children, true)
            /*if (intersects.length === 0) {
                if (frustum.containsPoint(hotspot.position)) {
                    hotspot.element.classList.add('visible')
                } else {
                    hotspot.element.classList.remove('visible')
                }
                //hotspot.element.classList.add('visible')
            } else {
                const intersectionDistance = intersects[0].distance
                const hotspotDistance = hotspot.position.distanceTo(camera.position)
    
                //if (intersectionDistance < hotspotDistance || cameraX > 8 || cameraY > 7 || cameraZ > 8) {
                if (intersectionDistance < hotspotDistance) {
                    hotspot.element.classList.remove('visible')
                }
                else {
                    hotspot.element.classList.add('visible')
                }
            }*/
    
            const translateX = screenPosition.x * this.tamanos.ancho * 0.5
            const translateY = screenPosition.y * this.tamanos.alto * - 0.5
            hotspot.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }
}