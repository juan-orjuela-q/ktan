import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { Raycaster } from 'three'
import gsap from 'gsap'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'

console.log(DotScreenPass)
//Recorridos 360
const modalTour = document.querySelector('#modal-tour'),
    tourApto = modalTour.querySelector('.appicua-tour'),
    btnTour = document.querySelector('#btn-tour-360'),
    btnTourCerrar = modalTour.querySelector('.btn-cerrar-360')
/**
 * MAQUETA
 */
//Menu maqueta

//const anchoMaqueta = menuMaqueta.offsetWidth 
const menuMaqueta = document.querySelector('#maqueta-menu'),
    anchoMaqueta = 0,
    btnCerrar = menuMaqueta.querySelector('.btn-cerrar'),
    itemsMenu = menuMaqueta.querySelectorAll('.tipo-enlace'),
    hotspotsBtn = document.querySelectorAll('.hw-zonas .hotspot'),
    hotspotsBtnInfo = document.querySelectorAll('.hw-info .hotspot'),
    cargando = document.getElementById('pantalla-carga'),
    barraCarga = cargando.querySelector('.loading-barra')

// Debug
const gui = new dat.GUI()
let mapaFolder = gui.addFolder('Mapa'),
    lucesFolder = gui.addFolder('Luces'),
    aptosFolder = gui.addFolder('Aptos'),
    coloresFolder = gui.addFolder('Colores'),
    mapa_generalFolder = mapaFolder.addFolder('General'),
    mapa_arbolesFolder = mapaFolder.addFolder('Árboles'),
    mapa_andenesFolder = mapaFolder.addFolder('Andenes'),
    mapa_terrenosFolder = mapaFolder.addFolder('Terrenos'),
    mapa_contextoFolder = mapaFolder.addFolder('Contexto')

mapaFolder.close()
lucesFolder.close()
aptosFolder.close()
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()
/**
 * Loaders
 */

const loadingManager = new THREE.LoadingManager(
    //Cargado
    () => {
        console.log('MAQUETA LISTA');
        cargando.classList.add('cargado')
        setTimeout(_ => cargando.remove(), 1200)
    },
    //En progreso
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal
        barraCarga.style.transform = `scaleX(${progressRatio})`
    }
)
const dracoLoader = new DRACOLoader(loadingManager),
    gltfLoader = new GLTFLoader(loadingManager),
    svgloader = new SVGLoader(loadingManager),
    cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager),
    textureLoader = new THREE.TextureLoader(loadingManager)

dracoLoader.setDecoderPath('/draco/')
gltfLoader.setDRACOLoader(dracoLoader)
// Axes helper
const axesHelper = new THREE.AxesHelper(2)
//scene.add(axesHelper)
//Colores
const colores = {
    colorProyecto: '#EDE0CE',
    colorProyectoAlt: '#F5F5F5',
    contextoFillColor: '#FFFFFF',
    contextoLineColor: '#FFFFFF',
    colorVias: '#ffffff',
    colorTransito: '#222431',
    colorAlerta: '#C1403A',
    colorArboles: '#9faf97',
    colorAndenes: '#c2c8d0',
    colorCielo: '#fffdfa',
    colorBruma: '#fffdfa',
    mascara_1: '#458376',
    mascara_2: '#C1403A',
    mascara_3: '#313c90',
    colorTerreno: '#d1dbcc'
}

const paletaMascaras = [colores.mascara_1, colores.mascara_2, colores.mascara_3]

/**
 * Texturas
 */
const environmentMap = cubeTextureLoader.load([
    'env/px.png',
    'env/nx.png',
    'env/py.png',
    'env/ny.png',
    'env/pz.png',
    'env/nz.png'
])

/*scene.background = environmentMap*/


const matcapTexture = textureLoader.load('texturas/matcap-15.png'),
    matcapArboles = textureLoader.load('texturas/matcap-15.png'),
    matcapContexto = textureLoader.load('texturas/matcap-15.png')

const text_arboles = textureLoader.load('texturas/arboles.webp'),
    text_arbustos = textureLoader.load('texturas/arbustos.webp'),
    text_barandas = textureLoader.load('texturas/barandas.webp'),
    text_bbq = textureLoader.load('texturas/bbq.webp'),
    text_carros_abajo = textureLoader.load('texturas/carros_abajo.webp'),
    text_carros_arriba = textureLoader.load('texturas/carros_arriba.webp'),
    text_comunal = textureLoader.load('texturas/comunal.webp'),
    text_juegos = textureLoader.load('texturas/juegos.webp'),
    text_juegos_2 = textureLoader.load('texturas/juegos_2.webp'),
    text_luminarias = textureLoader.load('texturas/luminarias.webp'),
    text_torre_baja = textureLoader.load('texturas/torre_baja.webp'),
    text_torre_sole_1 = textureLoader.load('texturas/torre_sole_1.webp'),
    text_torre_sole_2 = textureLoader.load('texturas/torre_sole_2.webp'),
    text_urbano = textureLoader.load('texturas/urbano.webp'),
    text_arbol_1 = textureLoader.load('texturas/arbol_1.webp'),
    text_arbol_2 = textureLoader.load('texturas/arbol_2.webp'),
    text_vias_1 = textureLoader.load('texturas/vias_1.webp'),
    text_vias_2 = textureLoader.load('texturas/vias_2.webp'),
    text_bump_terreno = textureLoader.load('texturas/disp_terreno_4.jpg'),
    text_mapa = textureLoader.load('texturas/seamless-grass.jpg')


text_mapa.wrapS = THREE.RepeatWrapping;
text_mapa.wrapT = THREE.RepeatWrapping;
text_mapa.repeat.set(200, 200);

text_arboles.flipY = false
text_arbustos.flipY = false
text_barandas.flipY = false
text_bbq.flipY = false
text_carros_abajo.flipY = false
text_carros_arriba.flipY = false
text_comunal.flipY = false
text_juegos.flipY = false
text_juegos_2.flipY = false
text_luminarias.flipY = false
text_torre_baja.flipY = false
text_torre_sole_1.flipY = false
text_torre_sole_2.flipY = false
text_urbano.flipY = false
text_arbol_1.flipY = false
text_arbol_2.flipY = false
text_vias_1.flipY = false
text_vias_2.flipY = false
//matcapTexture.flipY = false


/**
* Materiales
*/
const mat_arboles = new THREE.MeshBasicMaterial({ map: text_arboles }),
    mat_arbustos = new THREE.MeshBasicMaterial({ map: text_arbustos }),
    mat_barandas = new THREE.MeshBasicMaterial({ map: text_barandas, }),
    mat_bbq = new THREE.MeshBasicMaterial({ map: text_bbq }),
    mat_carros_abajo = new THREE.MeshBasicMaterial({ map: text_carros_abajo }),
    mat_carros_arriba = new THREE.MeshBasicMaterial({ map: text_carros_arriba }),
    mat_comunal = new THREE.MeshBasicMaterial({ map: text_comunal }),
    mat_juegos = new THREE.MeshBasicMaterial({ map: text_juegos }),
    mat_juegos_2 = new THREE.MeshBasicMaterial({ map: text_juegos_2 }),
    mat_luminarias = new THREE.MeshBasicMaterial({ map: text_luminarias }),
    mat_torre_baja = new THREE.MeshBasicMaterial({ map: text_torre_baja }),
    mat_torre_sole_1 = new THREE.MeshBasicMaterial({ map: text_torre_sole_1 }),
    mat_torre_sole_2 = new THREE.MeshBasicMaterial({ map: text_torre_sole_2 }),
    mat_urbano = new THREE.MeshBasicMaterial({ map: text_urbano })
//Materiales color
const materialLinea = new THREE.LineBasicMaterial({ color: colores.contextoLineColor, linewidth: 1, transparent: true, opacity: .75 });

const mat_arbol1 = new THREE.MeshStandardMaterial({ color: colores.colorArboles }),
    mat_arbol2 = new THREE.MeshStandardMaterial({ color: colores.colorArboles }),
    mat_vias1 = new THREE.MeshStandardMaterial({ color: colores.colorVias }),
    mat_vias2 = new THREE.MeshStandardMaterial({ color: colores.colorAndenes }),
    mat_piso = new THREE.MeshStandardMaterial({ color: colores.colorTerreno, bumpMap: text_mapa, bumpScale: .015 })


const contextoMaterial = new THREE.MeshStandardMaterial({
    color: colores.contextoFillColor,
    transparent: true,
    opacity: .95,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
})

const mat_vias = new THREE.MeshBasicMaterial({
    color: colores.colorVias,
    transparent: false,
    side: THREE.DoubleSide,
    depthWrite: true
})

const mat_andenes = new THREE.MeshStandardMaterial({
    color: colores.colorAndenes,
    transparent: false,
    side: THREE.DoubleSide,
    depthWrite: true
    
})

const mat_transito = new THREE.MeshBasicMaterial({
    color: colores.colorTransito,
    transparent: false,
    side: THREE.DoubleSide,
    depthWrite: true
})

const mat_acceso = new THREE.MeshBasicMaterial({
    color: colores.colorAlerta,
    transparent: false,
    side: THREE.DoubleSide,
    depthWrite: true
})

const mat_terreno = new THREE.MeshStandardMaterial({
    displacementMap: text_bump_terreno,
    displacementScale: 20,
    //wireframe: true,
    color: colores.colorTerreno,
    
})


//Version matcap
/*const mat_arbol1 = new THREE.MeshMatcapMaterial({ matcap: matcapArboles, color: '#c3d1a8' }),
    mat_arbol2 = new THREE.MeshMatcapMaterial({ matcap: matcapArboles, color: '#c3d1a8' }),
    mat_vias1 =new THREE.MeshMatcapMaterial({ matcap: matcapTexture }),
    mat_vias2 =new THREE.MeshMatcapMaterial({ matcap: matcapTexture }),
    mat_piso =new THREE.MeshMatcapMaterial({ matcap: matcapArboles, color: '#dfe7d0' }),
    mat_andenes =new THREE.MeshMatcapMaterial({ matcap: matcapTexture, color: '#c2c8d0' }),
    mat_transito =new THREE.MeshMatcapMaterial({ matcap: matcapTexture }),
    mat_acceso =new THREE.MeshMatcapMaterial({ matcap: matcapTexture }),
    mat_terreno =new THREE.MeshMatcapMaterial({ matcap: matcapArboles, displacementMap: text_bump_terreno, displacementScale: 30, rougness: 0.2, color: '#dfe7d0'  })

    const mat_vias = new THREE.MeshBasicMaterial({
        color: colores.colorVias,
        transparent: false,
        side: THREE.DoubleSide,
        depthWrite: true
    })

    const contextoMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapContexto,
        transparent: true,
        opacity: 1,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
    })*/


//Mapa


/**
 * Modelos
 */

//Escena principal
const pModX = 3
const pModY = 0
const pModZ = -5.75

const escenaPrincipal = new THREE.Group();
escenaPrincipal.position.y = 0.02
scene.add(escenaPrincipal)

// Carga modelos
gltfLoader.load(
    'modelos/arboles.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_arboles
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/arbustos.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_arbustos
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/barandas.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_barandas
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/bbq.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_bbq
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/carros_abajo.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_carros_abajo
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/carros_arriba.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_carros_arriba
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)
gltfLoader.load(
    'modelos/comunal.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_comunal
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)
gltfLoader.load(
    'modelos/juegos_2.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_juegos_2
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)
gltfLoader.load(
    'modelos/juegos.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_juegos
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/luminarias.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_luminarias
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/torre_baja.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_torre_baja
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/torre_sole_1.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_torre_sole_1
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)
gltfLoader.load(
    'modelos/torre_sole_2.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_torre_sole_2
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

gltfLoader.load(
    'modelos/urbano.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_urbano
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY, pModZ)
        escenaPrincipal.add(gltf.scene)
    }
)

//Contexto
const contexto = new THREE.Group();
scene.add(contexto)

gltfLoader.load(
    'modelos/vecinos/vecinos.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = contextoMaterial
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY + 0.05, pModZ)

        contexto.add(gltf.scene)
        //Agregar bordes
        for (let i = 0; i < gltf.scene.children.length; i++) {
            var geo = new THREE.EdgesGeometry(gltf.scene.children[i].geometry);
            var wireframe = new THREE.LineSegments(geo, materialLinea);
            gltf.scene.children[i].add(wireframe)
        }
    }
)

gltfLoader.load(
    'modelos/vecinos/proyecto_vecino.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = contextoMaterial
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY + 0.05, pModZ)

        contexto.add(gltf.scene)
        //Agregar bordes
        for (let i = 0; i < gltf.scene.children.length; i++) {
            var geo = new THREE.EdgesGeometry(gltf.scene.children[i].geometry);
            var wireframe = new THREE.LineSegments(geo, materialLinea);
            gltf.scene.children[i].add(wireframe)
        }
    }
)
gltfLoader.load(
    'modelos/vecinos/comercio.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = contextoMaterial
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY + 0.05, pModZ)

        contexto.add(gltf.scene)
        //Agregar bordes
        for (let i = 0; i < gltf.scene.children.length; i++) {
            var geo = new THREE.EdgesGeometry(gltf.scene.children[i].geometry);
            var wireframe = new THREE.LineSegments(geo, materialLinea);
            gltf.scene.children[i].add(wireframe)
        }
    }
)
gltfLoader.load(
    'modelos/vecinos/vias_1.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_vias2
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY + 0.015, pModZ)

        contexto.add(gltf.scene)

    }
)
gltfLoader.load(
    'modelos/vecinos/vias_2.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = mat_vias1
        })
        gltf.scene.scale.set(0.05, 0.05, 0.05)
        gltf.scene.position.set(pModX, pModY + 0.017, pModZ)

        contexto.add(gltf.scene)
        //Agregar bordes
    }
)
//Mapa
const mapa = new THREE.Group();
const vias = new THREE.Group();
const andenes = new THREE.Group();
const transito_fijo = new THREE.Group();
const transito = new THREE.Group();
const arqui = new THREE.Group();

//Vias
svgloader.load(
    'mapa/mapa_vias.svg',
    function (data) {
        const pathsSVG = data.paths
        for (let i = 0; i < pathsSVG.length; i++) {
            const path = pathsSVG[i]

            const shapes = SVGLoader.createShapes(path)
            for (let j = 0; j < shapes.length; j++) {

                const shape = shapes[j]
                const geometry = new THREE.ShapeGeometry(shape)
                const mesh = new THREE.Mesh(geometry, mat_vias)
                vias.add(mesh)
            }
        }
        vias.position.z = -0.01
        mapa.add(vias)

    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado vias')
    },
    function (error) {
        console.log('Algo malo pasa con las vias')
    }
)

//Andenes
svgloader.load(
    'mapa/mapa_andenes_ex.svg',
    function (data) {
        const pathsSVG = data.paths
        for (let i = 0; i < pathsSVG.length; i++) {
            const path = pathsSVG[i]
            const shapes = SVGLoader.createShapes(path)

            for (let j = 0; j < shapes.length; j++) {
                const shape = shapes[j]
                /*const geometry = new THREE.ShapeGeometry(shape)
                const mesh = new THREE.Mesh(geometry, mat_andenes)
                andenes.add(mesh)*/

                const meshGeometry = new THREE.ExtrudeBufferGeometry(shape, {
                    depth: .075,
                    bevelEnabled: false
                })
                const mesh = new THREE.Mesh(meshGeometry, mat_andenes)

                andenes.add(mesh)
            }
        }
        andenes.position.set(4, 25.9, 0)
        mapa_andenesFolder.add(andenes.position, 'x').min(-200).max(200).step(0.1).name('andenes X')
        mapa_andenesFolder.add(andenes.position, 'y').min(-200).max(200).step(0.1).name('andenes Y')
        mapa_andenesFolder.add(andenes.position, 'z').min(-2).max(2).step(0.01).name('andenes Z')
        mapa.add(andenes)

    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado andenes')
    },
    function (error) {
        console.log('Algo malo pasa con los andenes')
    }
)
//Tránsito
svgloader.load(
    'mapa/mapa_transito.svg',
    function (data) {
        const pathsSVG = data.paths
        for (let i = 0; i < pathsSVG.length; i++) {

            const path = pathsSVG[i]
            const shapes = SVGLoader.createShapes(path)

            for (let j = 0; j < shapes.length; j++) {

                const shape = shapes[j]
                const geometry = new THREE.ShapeGeometry(shape)
                const mesh = new THREE.Mesh(geometry, mat_acceso)
                transito.add(mesh)
            }
        }
        transito.position.set(87.3, 91.5, -0.13)

        /*gui.add(transito.position, 'x').min(-200).max(200).step(0.1).name('transito X')
        gui.add(transito.position, 'y').min(-200).max(200).step(0.1).name('transito Y')
        gui.add(transito.position, 'z').min(-2).max(2).step(0.01).name('transito Z')

        gui.add(transito.scale, 'x').min(-200).max(200).step(0.1).name('transito sc X')
        gui.add(transito.scale, 'y').min(-200).max(200).step(0.1).name('transito sc Y')
        gui.add(transito.scale, 'z').min(-2).max(2).step(0.01).name('transito sc Z')*/

    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado transito')
    },
    function (error) {
        console.log('Algo malo pasa con los transito')
    }
)
//Tránsito Fijo
svgloader.load(
    'mapa/mapa_transito_fijo.svg',
    function (data) {
        console.log(data)
        const pathsSVG = data.paths

        for (let i = 0; i < pathsSVG.length; i++) {

            const path = pathsSVG[i]
            const shapes = SVGLoader.createShapes(path)

            for (let j = 0; j < shapes.length; j++) {

                const shape = shapes[j]
                const geometry = new THREE.ShapeGeometry(shape)
                const mesh = new THREE.Mesh(geometry, mat_transito)
                transito_fijo.add(mesh)
            }
        }
        transito_fijo.position.set(87.65, 85.6, -0.13)

        /*gui.add(transito_fijo.position, 'x').min(-200).max(200).step(0.1).name('transito fijo X')
        gui.add(transito_fijo.position, 'y').min(-200).max(200).step(0.1).name('transito fijo Y')
        gui.add(transito_fijo.position, 'z').min(-2).max(2).step(0.01).name('transito fijo Z')

        gui.add(transito_fijo.scale, 'x').min(-200).max(200).step(0.1).name('transito fijo sc X')
        gui.add(transito_fijo.scale, 'y').min(-200).max(200).step(0.1).name('transito fijo sc Y')
        gui.add(transito_fijo.scale, 'z').min(-2).max(2).step(0.01).name('transito fijo sc Z')*/

        mapa.add(transito_fijo)

    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado transito fijo')
    },
    function (error) {
        console.log('Algo malo pasa con los transito fijo')
    }
)

//Arqui


svgloader.load(
    'mapa/mapa_arqui.svg',
    function (data) {
        console.log(data)
        const pathsSVG = data.paths

        for (let i = 0; i < pathsSVG.length; i++) {

            const path = pathsSVG[i]

            const shapes = SVGLoader.createShapes(path)
            // Opcion 1
            /*
            for ( let j = 0; j < shapes.length; j ++ ) {

                const shape = shapes[ j ]
                const geometry = new THREE.ShapeGeometry( shape )
                const mesh = new THREE.Mesh( geometry, material )
                arqui.add( mesh )
                
            }
            */
            // Opcion extrute
            for (let j = 0; j < shapes.length; j++) {

                const shape = shapes[j]
                const meshGeometry = new THREE.ExtrudeBufferGeometry(shape, {
                    depth: .75,
                    bevelEnabled: false
                })
                const linesGeometry = new THREE.EdgesGeometry(meshGeometry)
                const mesh = new THREE.Mesh(meshGeometry, contextoMaterial)
                const lines = new THREE.LineSegments(linesGeometry, materialLinea)
                arqui.add(mesh, lines)
            }
            //Fin extrute
        }

        arqui.position.set(5.3, 28.7, - 0.76)

        mapa_contextoFolder.add(arqui.position, 'x').min(-200).max(200).step(0.1).name('arqui X')
        mapa_contextoFolder.add(arqui.position, 'y').min(-200).max(200).step(0.1).name('arqui Y')
        mapa_contextoFolder.add(arqui.position, 'z').min(-2).max(2).step(0.01).name('arqui Z')

        mapa.add(arqui)

    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado arqui')
    },
    function (error) {
        console.log('Algo falla con arqui')
    }
)

//Arboles
function numAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const losArboles = new THREE.Group();
scene.add(losArboles)
/*
svgloader.load(
    'test/rects_test_b.svg',
    function (data) {
        console.log(data)
        const pathsSVG = data.paths

        for (let i = 0; i < pathsSVG.length; i++) {

            const path = pathsSVG[i]
            const shapes = SVGLoader.createShapes(path)

            for (let j = 0; j < shapes.length; j++) {

                const shape = shapes[j]
                const geometry = new THREE.ShapeGeometry(shape)
                const mesh = new THREE.Mesh(geometry, mat_transito)
                mesh.scale.set(0.05, 0.05, 0.05)
                scene.add(mesh)
            }
        }
    }
)*/



svgloader.load(
    'mapa/mapa_arboles.svg',
    function (data) {
        const pathsSVG = data.paths
        let posicionArboles = []
        let posicionArboles2 = []
        for (let i = 0; i < pathsSVG.length; i++) {
            const path = pathsSVG[i]
            const ran = numAleatorio(1, 2)
            //console.log(path.subPaths[0].currentPoint)
            if (ran === 1) {
                posicionArboles.push(path.subPaths[0].currentPoint);
            } else {
                posicionArboles2.push(path.subPaths[0].currentPoint);
            }

        }
        gltfLoader.load('modelos/arbol_1.glb', agregarArboles)
        gltfLoader.load('modelos/arbol_2.glb', agregarArboles2)
        function agregarArboles(gltf) {
            gltf.scene.traverse((child) => {
                child.material = mat_arbol1

            })
            for (let p = 0; p < posicionArboles.length; p++) {
                const n = numAleatorio(65, 100) / 100
                const r = (Math.random() * 2) * Math.PI
                const arbolito = new THREE.Object3D()
                gltf.scene.scale.set(0.1, 0.1, 0.1)
                arbolito.add(gltf.scene.clone())
                arbolito.position.set(posicionArboles[p].x, -0.05, posicionArboles[p].y)
                arbolito.children[0].children[0].scale.set(n, n, n)
                arbolito.children[0].children[0].rotation.y = r
                //arbolito.scale.set(n, n, n)
                losArboles.add(arbolito)
            }
        }
        function agregarArboles2(gltf) {
            gltf.scene.traverse((child) => {
                child.material = mat_arbol2

            })
            for (let p = 0; p < posicionArboles2.length; p++) {
                const n = numAleatorio(45, 90) / 100
                const r = (Math.random() * 2) * Math.PI
                const arbolito = new THREE.Object3D()
                gltf.scene.scale.set(0.1, 0.1, 0.1)
                arbolito.add(gltf.scene.clone())
                arbolito.position.set(posicionArboles2[p].x, -0.05, posicionArboles2[p].y)
                arbolito.children[0].children[0].scale.set(n, n, n)
                arbolito.children[0].children[0].rotation.y = r
                losArboles.add(arbolito)
            }
        }
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado árboles pos')
    },
    function (error) {
        console.log('Algo malo pasa con los árboles pos')
        console.log(error)
    }
)

losArboles.position.set(-67.2, 0.01, -70.7)

losArboles.scale.set(0.64, 0.64, 0.64)

losArboles.rotation.y = 0.07;

mapa_arbolesFolder.add(losArboles.position, 'x').min(-200).max(200).step(0.1).name('losArboles X')
mapa_arbolesFolder.add(losArboles.position, 'y').min(-2).max(2).step(0.01).name('losArboles Y')
mapa_arbolesFolder.add(losArboles.position, 'z').min(-200).max(200).step(0.1).name('losArboles Z')

mapa_arbolesFolder.add(losArboles.rotation, 'y').min(-200).max(200).step(0.01).name('losArboles Rot')

mapa_arbolesFolder.add(losArboles.scale, 'x').min(0.5).max(0.9).step(0.01).name('scale losArboles X')
mapa_arbolesFolder.add(losArboles.scale, 'z').min(0.5).max(0.9).step(0.01).name('scale losArboles Z')
mapa_arbolesFolder.add(losArboles.scale, 'y').min(0.5).max(0.9).step(0.01).name('scale losArboles Y')


//Configurar mapa
mapa.rotation.x = Math.PI * 0.5
mapa.position.set(-68.5, 0.01, -62.8)
mapa.rotation.z = -0.07
mapa.scale.set(0.64, 0.64, 0.64)

mapa_generalFolder.add(mapa.position, 'x').min(-200).max(200).step(0.1).name('mapa X')
mapa_generalFolder.add(mapa.position, 'z').min(-200).max(200).step(0.1).name('mapa Z')
mapa_generalFolder.add(mapa.rotation, 'z').min(-200).max(200).step(0.01).name('mapa Rot Z')

mapa_generalFolder.add(mapa.scale, 'x').min(0.5).max(0.9).step(0.01).name('scale mapa X')
mapa_generalFolder.add(mapa.scale, 'z').min(0.5).max(0.9).step(0.01).name('scale mapa Z')
mapa_generalFolder.add(mapa.scale, 'y').min(0.5).max(0.9).step(0.01).name('scale mapa Y')

scene.add(mapa)
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.619)
lucesFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient')

scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.496)

directionalLight.position.set(-7.4, 14, 6.56)

lucesFolder.add(directionalLight.position, 'x').min(-25).max(25).step(0.01).name('Directional x')
lucesFolder.add(directionalLight.position, 'y').min(0.1).max(25).step(0.01).name('Directional y')
lucesFolder.add(directionalLight.position, 'z').min(-25).max(25).step(0.01).name('Directional z')
lucesFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('Directional inten')

scene.add(directionalLight)


/**
 * Floor
 */

const particulas = new THREE.PlaneGeometry(250, 250, 50, 50)
const particulasMaterial = new THREE.PointsMaterial({
    size: 2,
    sizeAttenuation: false
})
particulasMaterial.color = new THREE.Color('#ffffff')
const pisoParticulas = new THREE.Points(particulas, particulasMaterial)


const piso = new THREE.Mesh(
    new THREE.CircleGeometry(120, 32),
    mat_piso

)
/*piso.receiveShadow = true*/
piso.rotation.x = - Math.PI * 0.5
piso.position.y = -0.01

scene.add(piso)

/**
 * Terreno
 */
const terreno = new THREE.Mesh(
    new THREE.PlaneGeometry(360, 360, 60, 60),
    mat_terreno
)
terreno.rotation.x = - Math.PI * 0.5
terreno.position.y = -0.03
mapa_terrenosFolder.add(terreno.material, 'displacementScale')
scene.add(terreno)
/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth - anchoMaqueta,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    if (!menuMaqueta.classList.contains('oculta')) {
        sizes.width = window.innerWidth - anchoMaqueta
    } else {
        sizes.width = window.innerWidth
    }
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    //Actualizar hotspot wrapper
    hotspotsWrapper.style.width = sizes.width + 'px'

})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2500)
//const camera = new THREE.OrthographicCamera( sizes.width / - 2, sizes.width / 2, sizes.height / 2, sizes.height / - 2, 1, 1000 );
camera.position.set(3.38, 1.33, 2.91)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 4
controls.maxDistance = 10

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.antialias = true
renderer.setClearColor(colores.colorCielo)

//Niebla
const niebla = new THREE.Fog(colores.colorBruma, 2, 180)
scene.fog = niebla

/**
 * Hotspots
 */
const raycaster = new Raycaster()
const hotspotsWrapper = document.querySelector('.hotspots-wrapper')

hotspotsWrapper.style.width = sizes.width + 'px'
const hotspots = [{
    position: new THREE.Vector3(3.34, 0.72, -0.5),
    element: document.querySelector('.hotspot-0'),
    label: 'Terraza BBQ',
    img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/terraza.jpg'
},
{
    position: new THREE.Vector3(3.84, 0.45, -0.06),
    element: document.querySelector('.hotspot-1'),
    label: 'Social Kitchen',
    img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/social-kitchen.jpg'
},
{
    position: new THREE.Vector3(4.7, 0.13, -0.26),
    element: document.querySelector('.hotspot-2'),
    label: 'Lobby',
    img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/lobby.jpg'
},
{
    position: new THREE.Vector3(3.5, 0.45, -0.06),
    element: document.querySelector('.hotspot-3'),
    label: 'Salón de juegos',
    img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/salon-juegos.jpg'
},
{
    position: new THREE.Vector3(3.79, 0.13, -0.06),
    element: document.querySelector('.hotspot-4'),
    label: 'Salón social',
    img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/salon-social.jpg'
},
{
    position: new THREE.Vector3(4.24, 0.45, -0.06),
    element: document.querySelector('.hotspot-5'),
    label: 'Piscina',
    img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/piscina.jpg'
},
{
    position: new THREE.Vector3(-5.9, 0.55, -2.82),
    element: document.querySelector('.hotspot-6')
},
{
    position: new THREE.Vector3(1.68, 0.63, 4.8),
    element: document.querySelector('.hotspot-7')
}
    , {
    position: new THREE.Vector3(15, 0.6, 15),
    element: document.querySelector('.hotspot-8')
},
{
    position: new THREE.Vector3(-50, 0.6, 15),
    element: document.querySelector('.hotspot-9')
},
{
    position: new THREE.Vector3(6, 0.6, 48),
    element: document.querySelector('.hotspot-10')
},
{
    position: new THREE.Vector3(14, 0.6, -45),
    element: document.querySelector('.hotspot-11')
}]

/*
const bolaHelper = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
bolaHelper.position.set(1, 1, 3)
scene.add(bolaHelper)
gui.add(bolaHelper.position, 'x', -70, 70, 0.01)
gui.add(bolaHelper.position, 'y', -70, 70, 0.01)
gui.add(bolaHelper.position, 'z', -70, 70, 0.01)*/


/**
 * Apartamentos
 */
const aptosMaster = new THREE.Group();
aptosMaster.scale.set(0.05, 0.05, 0.05)
aptosMaster.position.set(pModX, pModY, pModZ)
scene.add(aptosMaster)

// COGNIS
const apto_tipo_1 = new THREE.Group();
apto_tipo_1.userData.tipo = 'apto_tipo_1'

const apto_tipo_2 = new THREE.Group();
apto_tipo_2.userData.tipo = 'apto_tipo_2'

const apto_tipo_3 = new THREE.Group();
apto_tipo_3.userData.tipo = 'apto_tipo_3'



const materialFill_a1 = new THREE.MeshStandardMaterial({
    color: paletaMascaras[0],
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide
})

const materialLineas_a1 = new THREE.LineBasicMaterial({ color: paletaMascaras[0], linewidth: 1 });

const materialFill_a2 = new THREE.MeshStandardMaterial({
    color: paletaMascaras[1],
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide
})

const materialLineas_a2 = new THREE.LineBasicMaterial({ color: paletaMascaras[1], linewidth: 1 });

const materialFill_a3 = new THREE.MeshStandardMaterial({
    color: paletaMascaras[2],
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide
})

const materialLineas_a3 = new THREE.LineBasicMaterial({ color: paletaMascaras[2], linewidth: 1 });

const mascaraHover = new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: '0.8' })
//let mascaras = []

const archivos = ['1', '1a', '1b', '1c', '2', '2a', '2b', '2c', '3', '3a', '3b', '3c']

for (let n = 0; n < archivos.length; n++) {

    const nArchivo = archivos[n]
    const grupo = nArchivo.includes('1') ? 1 : nArchivo.includes('2') ? 2 : nArchivo.includes('3') ? 3 : null
    let materialFill
    let materialLineas

    if (grupo === 1) {
        materialFill = materialFill_a1
        materialLineas = materialLineas_a1
    } else if (grupo === 2) {
        materialFill = materialFill_a2
        materialLineas = materialLineas_a2
    } else {
        materialFill = materialFill_a3
        materialLineas = materialLineas_a3
    }


    //Cargar
    gltfLoader.load(
        `modelos/aptos/apto_tipo_${nArchivo}.glb`,
        (gltf) => {
            gltf.scene.traverse((child) => {
                child.material = materialFill
            })
            //Loop
            for (let a = 0; a < gltf.scene.children.length; a++) {
                // COGNIS
                gltf.scene.children[a].userData.subtipo = `apto_tipo_${nArchivo}`
                gltf.scene.children[a].userData.mascara = `mascara_${grupo}`
                //Agregar Linea
                /*var geo = new THREE.EdgesGeometry(gltf.scene.children[a].geometry);
                var wireframe = new THREE.LineSegments(geo, materialLineas);
                gltf.scene.children[a].add(wireframe)*/
            }
            //Fin Loop
            apto_tipo_1.add(gltf.scene)
            if (grupo === 1) {
                apto_tipo_1.add(gltf.scene)
            } else if (grupo === 2) {
                apto_tipo_2.add(gltf.scene)
            } else if (grupo === 3) {
                apto_tipo_3.add(gltf.scene)
            } else {
                console.log('Error al añadir al grupo de máscaras')
            }
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + `% cargado apto ${nArchivo}`)
        },
        function (error) {
            console.log(`Algo malo pasa con el apto ${nArchivo}`)
        }
    )
    //Fin carga
}


/**
 * Raycaster aptos
 */
const raycasterAptos = new Raycaster()
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1

})
//Elementos modal Aptos
const modalApto = document.querySelector('#modal-aptos')
const apto_tit = modalApto.querySelector('h2')
const area_ac = modalApto.querySelector('.area_ac span')
const area_ap = modalApto.querySelector('.area_ap span')
const area_b = modalApto.querySelector('.area_b span')
const atributos = modalApto.querySelector('.atributos')
const img_planta = modalApto.querySelector('.img_planta')
//const img_piso = modalApto.querySelector('.img_piso')

//Elementos modal Hotspot
const modalHotspot = document.querySelector('#modal-hotspots')
const hotImg = modalHotspot.querySelector('.hotspot-img')
const hotLabel = modalHotspot.querySelector('.hotspot-label')
//Inventario
//COGNIS
const infoTipologias = [
    {
        id: 'apto_1',
        tipologia: 'apto_tipo_1',
        apto_tit: 'Apartamento 1',
        tipo_tit: 'Apto tipo 1',
        area_ac: '106.52',
        area_ap: '93.72',
        area_b: '',
        atributos: ['3 habitaciones', '3 Baños', 'Balcón'],
        img_planta: ['https://chromastudio.co/sole/wp-content/uploads/2022/04/sole-apto-1.jpg', 'https://chromastudio.co/sole/wp-content/uploads/2022/04/sole-apto-1a.jpg', 'https://chromastudio.co/sole/wp-content/uploads/2022/04/sole-apto-1b.jpg', 'https://chromastudio.co/sole/wp-content/uploads/2022/04/sole-apto-1c.jpg'],
        img_piso: '',
        tour_url: ''

    },
    {
        id: 'apto_2',
        tipologia: 'apto_tipo_2',
        apto_tit: 'Apartamento 2',
        tipo_tit: 'Apto tipo 2',
        area_ac: '96.78',
        area_ap: '85.83',
        area_b: '',
        atributos: ['3 habitaciones', '3 Baños', 'Balcón'],
        img_planta: ['https://chromastudio.co/sole/wp-content/uploads/2022/04/sole-apto-2.jpg', 'https://chromastudio.co/sole/wp-content/uploads/2022/04/sole-apto-2a.jpg', 'https://chromastudio.co/sole/wp-content/uploads/2022/04/sole-apto-2b.jpg', 'https://chromastudio.co/sole/wp-content/uploads/2022/04/sole-apto-2c.jpg'],
        img_piso: '',
        tour_url: 'https://recorridos.constructoracolpatria.com/recorridos/sole/apto2-marzo31/tour.html'

    },
    {
        id: 'apto_3',
        tipologia: 'apto_tipo_3',
        apto_tit: 'Apartamento 3',
        tipo_tit: 'Apto tipo 3',
        area_ac: '86.59',
        area_ap: '76.66',
        area_b: '',
        atributos: ['3 habitaciones', '2 Baños', 'Balcón'],
        img_planta: ['https://chromastudio.co/sole/wp-content/uploads/2022/04/sole-apto-3.jpg', 'https://chromastudio.co/sole/wp-content/uploads/2022/04/sole-apto-3a.jpg', 'https://chromastudio.co/sole/wp-content/uploads/2022/04/sole-apto-3b.jpg', 'https://chromastudio.co/sole/wp-content/uploads/2022/04/sole-apto-3c.jpg'],
        img_piso: '',
        tour_url: 'https://recorridos.constructoracolpatria.com/recorridos/sole/apto3-marzo31/tour.html'

    }
]
//Cargar al dar click en el apto
/**
 * Post processing
 */
 const effectComposer = new EffectComposer(renderer)
 effectComposer.setSize(sizes.width, sizes.height)
 effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
 
 const renderPass = new RenderPass(scene, camera)
 effectComposer.addPass(renderPass)
 
 
 
 const bokehPass = new BokehPass(scene, camera, {
     focus: 12,
     aperture: 0.0001,
     maxblur: 0.0075,
     width: sizes.width,
     height: sizes.height
 })
//COGNIS
window.addEventListener('click', () => {
    if (interseccionActual) {
        //Si es por tipologia
        const tipoActivo = interseccionActual.object.parent.parent.userData.tipo
        const nombreMalla = interseccionActual.object.userData.subtipo

        //console.log(interseccionActual.object)
        //console.log(tipoActivo)
        //console.log(nombreMalla)

        let obj = infoTipologias.find(obj => obj.tipologia == tipoActivo)

        // Si es por ID se debe usar el de abajo
        //const aptoActivo = interseccionActual.object.userData.name
        //let obj = infoTipologias.find(obj => obj.id == aptoActivo);

        

        //Pintar info
        if (obj) {
            modalApto.classList.add('activo');
            apto_tit.innerHTML = obj.apto_tit
            area_ac.innerHTML = obj.area_ac
            area_ap.innerHTML = obj.area_ap
            //area_b.innerHTML = obj.area_b
            if (obj.atributos) {
                obj.atributos.forEach((item) => {
                    let li = document.createElement("li");
                    li.innerText = item;
                    atributos.appendChild(li);
                })
            }


            const sufijo = nombreMalla.charAt(nombreMalla.length - 1);
            //console.log(sufijo);

            if (sufijo === 'a') {
                img_planta.innerHTML = `<img src="${obj.img_planta[1]}" alt="Planta">`
            } else if (sufijo === 'b') {
                img_planta.innerHTML = `<img src="${obj.img_planta[2]}" alt="Planta">`
            } else if (sufijo === 'c') {
                img_planta.innerHTML = `<img src="${obj.img_planta[3]}" alt="Planta">`
            } else {
                img_planta.innerHTML = `<img src="${obj.img_planta[0]}" alt="Planta">`
            }

            //img_piso.innerHTML = `<img src="${obj.img_piso}" alt="piso">`
            //Agregar tour
            if (obj.tour_url) {
                btnTour.classList.add('visible')
                tourApto.setAttribute('src', obj.tour_url)
            } else {
                btnTour.classList.remove('visible')
                tourApto.setAttribute('src', '')
            }
        }
    }
})
//Mostrar recorrido
btnTour.addEventListener('click', (event) => {
    event.preventDefault()
    modalTour.classList.add('activo')
})
btnTourCerrar.addEventListener('click', (event) => {
    event.preventDefault()
    modalTour.classList.remove('activo')
    //tourApto.setAttribute('src', '')
})
//Cerrar Apto
const btnVolver = modalApto.querySelector('.btn-volver-apto')


btnVolver.addEventListener('click', (event) => {
    event.preventDefault()
    modalApto.classList.remove('activo')
    limpiarInfo()

})
function limpiarInfo() {
    apto_tit.innerHTML = ''
    area_ac.innerHTML = ''
    area_ap.innerHTML = ''
    //area_b.innerHTML = ''
    atributos.innerHTML = ''
    img_planta.innerHTML = ''
    //img_piso.innerHTML = ''
}

//Menu maqueta
//COGNIS
itemsMenu.forEach(item => {
    item.addEventListener('click', event => {

        event.preventDefault();

        const tipo = item.dataset.tipo
        let mascara

        

        if (tipo === 'apto_tipo_1') {
            mascara = apto_tipo_1
        }
        else if (tipo === 'apto_tipo_2') {
            mascara = apto_tipo_2
        }
        else if (tipo === 'apto_tipo_3') {
            mascara = apto_tipo_3
        } else {
            mascara = false
        }


        if (mascara) {
            if (item.classList.contains('activo')) {
                item.classList.remove('activo')
                aptosMaster.remove(mascara)
                //effectComposer.removePass(bokehPass);
                
            } else {
                //effectComposer.addPass(bokehPass);
                item.classList.add('activo')
                aptosMaster.add(mascara)
                //console.log(aptosMaster)
                //Inicio cambio de camara
                controls.enabled = false;
                gsap.to(camera.position, {
                    duration: 1,
                    x: 3.99,
                    y: 2.67,
                    z: 1.66,
                    onUpdate: function () {
                        controls.update();
                    },
                    onComplete: function () {
                        controls.enabled = true;
                    }
                })
                //Fin cambio de camara
            }
        }
    })
})
//Menu secundario
const menuSecundario = document.getElementById('menu-secundario')
const menuSecundarioItems = menuSecundario.querySelectorAll('a')
let acceso = false;

menuSecundarioItems.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault()
        const itemID = item.id

        if (item.classList.contains('activo')) {
            item.classList.remove('activo')
        } else {
            if (!(itemID === 'btnVista')) {
                item.classList.add('activo')
            }
        }

        if (itemID === 'btnInfo') {
            mostrarInfo(item)
        } else if (itemID === 'btnAcceso') {
            mostrarAcceso(item)
        } else if (itemID === 'btnVista') {
            mostrarVista(item)
        } else {
            console.log('Este boton no tiene acciones')
        }


    })
})

function mostrarInfo(el) {
    const hwInfo = document.querySelector('.hw-info')
    if (hwInfo.classList.contains('activo')) {
        hwInfo.classList.remove('activo')
    } else {
        hwInfo.classList.add('activo')
        controls.enabled = false;
        gsap.to(camera.position, {
            duration: 1,
            x: -8.5,
            y: 4.01,
            z: 4.2,
            onUpdate: function () {
                controls.update();
            },
            onComplete: function () {
                controls.enabled = true;
            }
        });
    }
}

function mostrarAcceso(el) {
    console.log(camera)
    if (!acceso) {
        controls.enabled = false;
        gsap.to(camera.position, {
            duration: 1,
            x: -3.9008822056589083,
            y: 6.7032028411231215,
            z: 5.549154796004263,
            onUpdate: function () {
                controls.update();

            },
            onComplete: function () {
                controls.enabled = true;
            }
        });
        mapa.add(transito)
        acceso = true
    } else {
        mapa.remove(transito)
        acceso = false
    }

}

function mostrarVista(el) {
    console.log('Mostrar vista')
    controls.enabled = false;
    gsap.to(camera.position, {
        duration: 1,
        x: -8.5,
        y: 4.01,
        z: 4.2,
        onUpdate: function () {
            controls.update();
        },
        onComplete: function () {
            controls.enabled = true;
            modalHotspot.classList.add('activo')
            hotImg.innerHTML = '<img src="https://chromastudio.co/sole/wp-content/uploads/2022/03/CPT-LECO-NO-VIS-AEREA-V2.jpg" style="object-fit: cover;" alt="Planta">'
            hotLabel.innerHTML = 'Vista aerea'
        }
    });

}

// FIN COGNIS
//Hotspots
for (let h = 0; h < hotspotsBtn.length; h++) {
    hotspotsBtn[h].addEventListener('click', event => {
        event.preventDefault();
        const hotX = hotspots[h].position.x
        const hotY = hotspots[h].position.y
        const hotZ = hotspots[h].position.z
        //Modificar minDistance de camara
        controls.minDistance = 2
        //Inicio cambio de camara
        controls.enabled = false;
        gsap.to(camera.position, {
            duration: 1,
            x: 4.057,
            y: 1.399,
            z: 1.686,
            onUpdate: function () {
                controls.update();
            },
            onComplete: function () {
                controls.enabled = true;
            }
        });
        gsap.to(controls.target, {
            duration: 1,
            x: hotX,
            y: hotY,
            z: hotZ,
            onUpdate: function () {
                controls.update();
            },
            onComplete: function () {
                controls.enabled = true;
                //Mostrar popup
                modalHotspot.classList.add('activo')
                hotImg.innerHTML = `<img src="${hotspots[h].img}" alt="Planta">`
                hotLabel.innerHTML = hotspots[h].label
            }
        });
        //Fin cambio de camara controls.target.set(0, 0.75, 0)
    })
}
const btnVolverHot = modalHotspot.querySelector('.btn-volver-hot')
btnVolverHot.addEventListener('click', (event) => {
    event.preventDefault()
    modalHotspot.classList.remove('activo')
    gsap.to(controls.target, {
        duration: 1,
        x: 0,
        y: 0.75,
        z: 0,
        onUpdate: function () {
            controls.update();
        },
        onComplete: function () {
            controls.enabled = true;
            //Mostrar popup
        }
    });
    controls.minDistance = 4
    limpiarModalHot()
})
function limpiarModalHot() {
    hotImg.innerHTML = ''
    hotLabel.innerHTML = ''
}



btnCerrar.addEventListener('click', (event) => {
    event.preventDefault();
    if (menuMaqueta.classList.contains('oculta')) {
        menuMaqueta.classList.remove('oculta');
        // Update sizes
        sizes.width = window.innerWidth - anchoMaqueta

    } else {
        menuMaqueta.classList.add('oculta');
        //Dimensionar maqueta
        // Update sizes
        sizes.width = window.innerWidth
    }
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    //Actualizar hotspots
    hotspotsWrapper.style.width = sizes.width + 'px'
})
//Brujula
const brujula_dir = new THREE.Vector3(),
    brujula_sph = new THREE.Spherical(),
    brujula = document.getElementById('brujula')
/**
 * Debug Colores
 */
coloresFolder
    .addColor(colores, 'mascara_1')
    .onChange(() => {
        materialFill_a1.color.set(colores.mascara_1)
        materialLineas_a1.color.set(colores.mascara_1)
    })
    .name('Mascara 1')

coloresFolder
    .addColor(colores, 'mascara_2')
    .onChange(() => {
        materialFill_a2.color.set(colores.mascara_2)
        materialLineas_a2.color.set(colores.mascara_2)
    })
    .name('Mascara 2')

coloresFolder
    .addColor(colores, 'mascara_3')
    .onChange(() => {
        materialFill_a3.color.set(colores.mascara_3)
        materialLineas_a3.color.set(colores.mascara_3)
    })
    .name('Mascara 3')

coloresFolder
    .addColor(colores, 'colorTerreno')
    .onChange(() => {
        terreno.material.color.set(colores.colorTerreno)
        piso.material.color.set(colores.colorTerreno)
    })
    .name('Terreno')

coloresFolder
    .addColor(colores, 'colorBruma')
    .onChange(() => {
        niebla.color.set(colores.colorBruma)
    })
    .name('Bruma')

coloresFolder
    .addColor(colores, 'colorCielo').onChange(() => {
        renderer.setClearColor(colores.colorCielo)
    }).name('Cielo')

coloresFolder
    .addColor(colores, 'colorArboles').onChange(() => {
        mat_arbol1.color.set(colores.colorArboles)
        mat_arbol2.color.set(colores.colorArboles)
    }).name('Arboles')

coloresFolder
    .addColor(colores, 'colorAndenes').onChange(() => {
        mat_andenes.color.set(colores.colorAndenes)
        mat_vias2.color.set(colores.colorAndenes)
    }).name('Andenes')

coloresFolder
    .addColor(colores, 'colorVias').onChange(() => {
        mat_vias.color.set(colores.colorVias)
        mat_vias1.color.set(colores.colorVias)
    }).name('Vías')

coloresFolder
    .addColor(colores, 'colorTransito').onChange(() => {
        mat_transito.color.set(colores.colorTransito)

    }).name('Vías')

coloresFolder
    .addColor(colores, 'contextoFillColor').onChange(() => {
        contextoMaterial.color.set(colores.contextoFillColor)
    }).name('Vecinos')

coloresFolder
    .addColor(colores, 'contextoLineColor').onChange(() => {
        materialLinea.color.set(colores.contextoLineColor)
    }).name('Vecinos Línea')
coloresFolder.add(materialLinea, 'opacity').min(0).max(1).step(0.05).name('Vecinos Línea Op')





//coloresFolder.add(mat_piso, 'map').mapa
//Bug Hotspots
var frustum = new THREE.Frustum();



/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0
let interseccionActual = null

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Brujula
    camera.getWorldDirection(brujula_dir)
    brujula_sph.setFromVector3(brujula_dir)
    brujula.style.transform = `rotate(${THREE.Math.radToDeg(brujula_sph.theta) - 180}deg)`;

    //Aptos interactividad
    if (aptosMaster.children.length > 0) {

        raycasterAptos.setFromCamera(mouse, camera)
        const objetosEvaluar = aptosMaster.children,
            intersecciones = raycasterAptos.intersectObjects(objetosEvaluar, true)

        if (intersecciones.length) {

            interseccionActual = intersecciones[0]
            if (interseccionActual.object.type === 'Mesh') {
                for (const objeto of objetosEvaluar) {
                    for (const hijo of objeto.children) {
                        for (const nieto of hijo.children) {
                            //hijo.material.color.set('#00ffff')
                            if (nieto.userData.mascara === 'mascara_1') {
                                nieto.material = materialFill_a1
                            } else if (nieto.userData.mascara === 'mascara_2') {
                                nieto.material = materialFill_a2
                            } else if (nieto.userData.mascara === 'mascara_3') {
                                nieto.material = materialFill_a3
                            } else {
                                console.log('Problema en Raycaster')
                            }
                        }
                    }
                }
                interseccionActual.object.material = mascaraHover
            }

        } else {
            if (interseccionActual) {
                //console.log('mouse leave')
            }
            interseccionActual = null

        }


    }


    // Update controls
    controls.update()

    //let cameraX = Math.abs(camera.position.x)
    //let cameraY = Math.abs(camera.position.y)
    //let cameraZ = Math.abs(camera.position.z)

    frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));



    for (const hotspot of hotspots) {
        const screenPosition = hotspot.position.clone()
        screenPosition.project(camera)

        raycaster.setFromCamera(screenPosition, camera)
        const intersects = raycaster.intersectObjects(escenaPrincipal.children, true)
        if (intersects.length === 0) {
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
        }

        const translateX = screenPosition.x * sizes.width * 0.5
        const translateY = screenPosition.y * sizes.height * - 0.5
        hotspot.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    }



    // Render
    //renderer.render(scene, camera)
    effectComposer.render()

    //console.log(camera.position)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()