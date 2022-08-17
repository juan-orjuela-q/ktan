import * as THREE from 'three'
import Maqueta from '../../../Maqueta.js'

export default class Ambiente {
    constructor() {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores
        this.materiales = this.maqueta.materiales
        this.recursos = this.maqueta.recursos
        this.debug = this.maqueta.debug

        //Debug
        if (this.debug.active) {
            this.debugLuces = this.debug.ui.addFolder('Luces')
            this.debugCielo = this.debug.ui.addFolder('Cielo')
        }

        //Crear cielo
        this.crearCielo()
        // Crear luces
        this.crearAmbientLight()
        this.crearDirectionalLight()
        this.crearDirectionalLightSombra()
        //this.crearPointLight()

        //Crear environment map
        //this.crearEnvironmentMap()
        //this.aplicarEnvironmentMap()
    }



    crearCielo() {
        const niebla = new THREE.Fog(this.colores.coloresMundo.colorBruma, 2, 130)
        this.escena.fog = niebla

        

        if (this.debug.active) {
            //console.log(niebla)
            this.debugCielo.add(niebla, 'near').min(0).max(200).step(1).name('Niebla near')
            this.debugCielo.add(niebla, 'far').min(5).max(500).step(5).name('Niebla far')

            this.debugCielo
                .addColor(this.colores.coloresMundo, 'colorBruma')
                .onChange(() => {
                    niebla.color.set(this.colores.coloresMundo.colorBruma)
                })
                .name('Niebla')
        }
    }

    crearAmbientLight() {
        const ambientLight = new THREE.AmbientLight(this.colores.luces.ambient, 0.65)
        this.escena.add(ambientLight)

        //Debug
        if (this.debug.active) {
            this.debugLuces.add(ambientLight, 'intensity').min(0).max(5).step(0.05).name('Amb. Intensity')
        }
    }

    crearDirectionalLight() {
        const directionalLight = new THREE.DirectionalLight(this.colores.luces.directional, 0.4)

        directionalLight.position.set(-20.42, 25.76, 20.14)
        directionalLight.castShadow = false
        // directionalLight.shadow.camera.near = 10
        // directionalLight.shadow.camera.far = 100
        // directionalLight.shadow.camera.top = 10
        // directionalLight.shadow.camera.right = 10
        // directionalLight.shadow.camera.bottom = -10
        // directionalLight.shadow.camera.left = -10

        // directionalLight.shadow.radius = 5
        // directionalLight.shadow.blurSamples = 8
        
        // directionalLight.shadow.mapSize.width = 2048
        // directionalLight.shadow.mapSize.height = 2048

        

        this.escena.add(directionalLight)
        

        //Debug

        if (this.debug.active) {
            this.debugLuces.add(directionalLight, 'intensity').min(0).max(5).step(0.01).name('Dir. Intensity')
            this.debugLuces.add(directionalLight.position, 'x').min(-25).max(250).step(0.01).name('Dir. x')
            this.debugLuces.add(directionalLight.position, 'y').min(0.1).max(250).step(0.01).name('Dir. y')
            this.debugLuces.add(directionalLight.position, 'z').min(-25).max(250).step(0.01).name('Dir. z')
        }
    }
    crearDirectionalLightSombra() {
        const directionalLightSombra = new THREE.DirectionalLight(this.colores.luces.directional, 0.1)

        directionalLightSombra.position.set(-20.42, 25.76, 20.14)
        directionalLightSombra.shadow.camera.near = 10
        directionalLightSombra.shadow.camera.far = 100
        directionalLightSombra.shadow.camera.top = 10
        directionalLightSombra.shadow.camera.right = 10
        directionalLightSombra.shadow.camera.bottom = -10
        directionalLightSombra.shadow.camera.left = -10

        directionalLightSombra.shadow.radius = 5
        directionalLightSombra.shadow.blurSamples = 8
        directionalLightSombra.castShadow = true
        directionalLightSombra.shadow.mapSize.width = 2048
        directionalLightSombra.shadow.mapSize.height = 2048

        const directionalLightSombraCameraHelper = new THREE.CameraHelper(directionalLightSombra.shadow.camera)
        directionalLightSombraCameraHelper.visible = false

        this.escena.add(directionalLightSombra)
        this.escena.add(directionalLightSombraCameraHelper)

        //Debug

        if (this.debug.active) {
            this.debugLuces.add(directionalLightSombra, 'intensity').min(0).max(5).step(0.01).name('Dir. S Intensity')
        }
    }

    crearPointLight() {
        const pointLight = new THREE.PointLight(this.colores.luces.point, 0.2, 116, 2)
        pointLight.position.set(0, 13.01, 0)
        this.escena.add(pointLight)

        const pointLight2 = new THREE.PointLight(this.colores.luces.point, 0.7, 50, 2)
        this.escena.add(pointLight2)
    }

    crearEnvironmentMap() {

        this.environmentMap = {}
        this.environmentMap.intensity = .25
        this.environmentMap.texture = this.recursos.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding


        this.escena.background = this.environmentMap.texture


    }

    aplicarEnvironmentMap() {
        this.escena.environment = this.environmentMap.texture
        this.environmentMap.updateMaterials = () => {
            this.escena.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()
    }
}





