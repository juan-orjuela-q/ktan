import * as THREE from 'three'

export default class Hotspots {
    constructor() {
        this.hotspots = [{
            position: new THREE.Vector3(-0.94, 0.2, 0.41),
            element: document.querySelector('.hotspot-0'),
            label: 'Terraza BBQ',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/terraza.jpg'
        },
        {
            position: new THREE.Vector3(-0.94, 0.2, 0.85),
            element: document.querySelector('.hotspot-1'),
            label: 'Social Kitchen',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/social-kitchen.jpg'
        },
        {
            position: new THREE.Vector3(-0.42, 0.2, 0.85),
            element: document.querySelector('.hotspot-2'),
            label: 'Lobby',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/lobby.jpg'
        },
        {
            position: new THREE.Vector3(-0.42, 0.2, 0.13),
            element: document.querySelector('.hotspot-3'),
            label: 'Salón de juegos',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/salon-juegos.jpg'
        },
        {
            position: new THREE.Vector3(0.37, 0.2, 0.13),
            element: document.querySelector('.hotspot-4'),
            label: 'Salón social',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/salon-social.jpg'
        },
        {
            position: new THREE.Vector3(0.85, 0.2, -0.43),
            element: document.querySelector('.hotspot-5'),
            label: 'Piscina',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/piscina.jpg'
        },
        {
            position: new THREE.Vector3(1.79, 0.34, -9.38),
            element: document.querySelector('.hotspot-6')//PriceSmart
        },
        {
            position: new THREE.Vector3(2.36, 0.96, 21.2),
            element: document.querySelector('.hotspot-7')//Maloka
        }
            , {
            position: new THREE.Vector3(30, 0.38, 16.58),
            element: document.querySelector('.hotspot-8')//Simon Bolivar
        },
        {
            position: new THREE.Vector3(31, 0.96, -20.23),
            element: document.querySelector('.hotspot-9')//J Botanico
        },
        {
            position: new THREE.Vector3(-23, 0.96, -43.07),
            element: document.querySelector('.hotspot-10')//Aeropuerto
        },
        {
            position: new THREE.Vector3(4.46, 0.96, 6.39),
            element: document.querySelector('.hotspot-11')//C.C Arrecife
        },
        {
            position: new THREE.Vector3(-16.43, 0.2, 19.76),
            element: document.querySelector('.hotspot-12')//Terminal
        },
        //Vias
        {
            position: new THREE.Vector3(1.91, 0.05, -4.28),
            element: document.querySelector('.hotspot-13')
        },
        {
            position: new THREE.Vector3(-8.19, 0.05, -4.28),
            element: document.querySelector('.hotspot-14')
        }
            , {
            position: new THREE.Vector3(-0.33, 0.05, 4.59),
            element: document.querySelector('.hotspot-15')
        },
        {
            position: new THREE.Vector3(-5.36, 0.05,  13.55),
            element: document.querySelector('.hotspot-16')
        }
    ]
    }
}


