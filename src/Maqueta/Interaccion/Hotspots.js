import * as THREE from 'three'

export default class Hotspots {
    constructor() {
        this.hotspots = [{
            position: new THREE.Vector3(0.6, 0.2, 1.22),
            element: document.querySelector('.hotspot-0'),
            label: 'Terraza BBQ',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/terraza.jpg'
        },
        {
            position: new THREE.Vector3(-0.11, 0.2, 1.22),
            element: document.querySelector('.hotspot-1'),
            label: 'Social Kitchen',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/social-kitchen.jpg'
        },
        {
            position: new THREE.Vector3(-0.11, 0.2, -1.21),
            element: document.querySelector('.hotspot-2'),
            label: 'Lobby',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/lobby.jpg'
        },
        {
            position: new THREE.Vector3(0.58, 0.2, -0.83),
            element: document.querySelector('.hotspot-3'),
            label: 'Salón de juegos',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/salon-juegos.jpg'
        },
        {
            position: new THREE.Vector3(0.04, 0.2, -2),
            element: document.querySelector('.hotspot-4'),
            label: 'Salón social',
            img: 'https://chromastudio.co/sole/wp-content/uploads/2022/03/salon-social.jpg'
        },
        {
            position: new THREE.Vector3(1.08, 0.2, 2.38),
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
    }
}


