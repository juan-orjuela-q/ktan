//Librerias
import * as THREE from 'three'
//Proyecto
import Maqueta from '../Maqueta.js'

export default class Materiales
{
    constructor()
    {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores
        this.recursos = this.maqueta.recursos

        this.materialesProyecto = {}
        this.materialesContexto = {}
        
        this.materialesProyecto.torre_baja = new THREE.MeshStandardMaterial({ map:  this.recursos.items.textura_torre_baja})
        this.materialesProyecto.torre_sole_1 = new THREE.MeshStandardMaterial({ map:  this.recursos.items.textura_torre_sole_1})
        this.materialesProyecto.torre_sole_2 = new THREE.MeshStandardMaterial({ map:  this.recursos.items.textura_torre_sole_2})
        

    }
}

/**
* Materiales

const mat_arboles = new THREE.MeshBasicMaterial({ map: text_arboles }),
    mat_arbustos = new THREE.MeshBasicMaterial({ map: text_arbustos }),
    mat_barandas = new THREE.MeshBasicMaterial({ map: text_barandas, alphaMap: text_barandasAlpha, transparent: true }),
    mat_bbq = new THREE.MeshBasicMaterial({ map: text_bbq }),
    mat_carros_abajo = new THREE.MeshBasicMaterial({ map: text_carros_abajo }),
    mat_carros_arriba = new THREE.MeshBasicMaterial({ map: text_carros_arriba }),
    mat_comunal = new THREE.MeshStandardMaterial({ color: '#ffffff', map: amb_comunal }),
    mat_juegos = new THREE.MeshBasicMaterial({ map: text_juegos }),
    mat_juegos_2 = new THREE.MeshBasicMaterial({ map: text_juegos_2 }),
    mat_luminarias = new THREE.MeshBasicMaterial({ map: text_luminarias }),
    mat_torre_baja = new THREE.MeshBasicMaterial({ map: amb_torre_baja }),
    mat_torre_sole_1 = new THREE.MeshBasicMaterial({ map: amb_torre_sole_1 }),
    mat_torre_sole_2 = new THREE.MeshBasicMaterial({ map: amb_torre_sole_2 }),
    mat_urbano = new THREE.MeshBasicMaterial({ map: text_urbano })

//Materiales alternos
const mat_arbolesAlt = new THREE.MeshStandardMaterial({ color: colores.mainArboles }),
    mat_arbustosAlt = new THREE.MeshStandardMaterial({ color: colores.mainArbustos }),
    mat_barandasAlt = new THREE.MeshStandardMaterial({ color: colores.mainBarandas, alphaMap: text_barandasAlpha, transparent: true }),
    mat_bbqAlt = new THREE.MeshStandardMaterial({ color: colores.mainBbq }),
    mat_carrosAlt = new THREE.MeshStandardMaterial({ color: colores.mainCarros }),
    mat_comunalAlt = new THREE.MeshStandardMaterial({ color: colores.mainComunal }),
    mat_juegosAlt = new THREE.MeshStandardMaterial({ color: colores.mainJuegos }),
    mat_luminariasAlt = new THREE.MeshStandardMaterial({ color: colores.mainLuminarias }),
    mat_torresAlt = new THREE.MeshStandardMaterial({ color: colores.mainTorres }),
    mat_urbanoAlt = new THREE.MeshStandardMaterial({ color: colores.mainUrbano, transparent: true, opacity: 0 }),
    mat_torresLineas = new THREE.LineBasicMaterial({ color: colores.mainTorresLineas, linewidth: 1, transparent: true, opacity: 0 })
//Materiales color
const materialLinea = new THREE.LineBasicMaterial({ color: colores.contextoLineColor, linewidth: 1, transparent: true, opacity: .35 });

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

const mat_vias = new THREE.MeshStandardMaterial({
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
    displacementMap: text_disp_terreno,
    displacementScale: 27,
    //wireframe: true,
    color: colores.colorTerreno,

})*/