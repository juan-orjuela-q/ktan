//Librerias
import * as THREE from 'three'
//Proyecto
import Maqueta from '../Maqueta.js'
import Ambiente from './Ambiente.js'
import Mapa from './Mapa.js'
import Modelo from './Modelo.js'
import Materiales from './Materiales.js'

export default class Mundo {
    constructor() {
        this.maqueta = new Maqueta()
        this.escena = this.maqueta.escena
        this.colores = this.maqueta.colores
        this.recursos = this.maqueta.recursos
        

        //Test Mesh
        const bolaHelper = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 16, 16),
            new THREE.MeshStandardMaterial({ color: this.colores.paleta.color2 })
        )
        this.escena.add(bolaHelper)
        
        // Esperar que cargue Recursos
        this.recursos.on('cargado', () =>
        {
            // Setup
            this.mapa = new Mapa()
            this.crearModelos()

            this.ambiente = new Ambiente()
        })
    }
    crearMapa(){
        
    }
    crearModelos() {
        this.materiales = new Materiales()
        //Proyecto
        this.torre_baja = new Modelo(this.recursos.items.modelo_torre_baja, this.materiales.materialesProyecto.torre_baja)
        this.torre_sole_1 = new Modelo(this.recursos.items.modelo_torre_sole_1, this.materiales.materialesProyecto.torre_sole_1)
        this.torre_sole_2 = new Modelo(this.recursos.items.modelo_torre_sole_2, this.materiales.materialesProyecto.torre_sole_2)
        
    }
} 