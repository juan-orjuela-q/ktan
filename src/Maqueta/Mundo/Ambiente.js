import * as THREE from 'three'
import Maqueta from '../Maqueta.js'

export default class Ambiente {
    constructor() {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores
        this.recursos = this.maqueta.recursos

        // Crear luces
        this.crearAmbientLight()
        this.crearDirectionalLight()
        this.crearPointLight()

        //Crear environment map
        this.crearEnvironmentMap()
        this.aplicarEnvironmentMap()
    }

    crearAmbientLight() {
        const ambientLight = new THREE.AmbientLight(this.colores.luces.ambient, 0.74)
        this.escena.add(ambientLight)
    }

    crearDirectionalLight() {
        const directionalLight = new THREE.DirectionalLight(this.colores.luces.directional, 0.1)

        directionalLight.position.set(-20.42, 25.76, 20.14)
        directionalLight.shadow.camera.near = 10
        directionalLight.shadow.camera.far = 100
        directionalLight.shadow.camera.top = 10
        directionalLight.shadow.camera.right = 10
        directionalLight.shadow.camera.bottom = -10
        directionalLight.shadow.camera.left = -10

        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048

        const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
        directionalLightCameraHelper.visible = false

        this.escena.add(directionalLightCameraHelper)
    }

    crearPointLight() {
        const pointLight = new THREE.PointLight(this.colores.luces.point, 0.2, 116, 2)
        pointLight.position.set(0, 13.01, 0)
        this.escena.add(pointLight)
    }

    crearEnvironmentMap() {

        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
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





