import Maqueta from "../Maqueta.js"
import Cercanias from "./Cercanias.js"
import gsap from 'gsap'
import { getItemDescriptor } from "@babel/core/lib/config/item.js"

export default class Interaccion {
    constructor() {
        this.maqueta = new Maqueta()
        this.cercanias = new Cercanias()
        this.mundo = this.maqueta.mundo
        this.materiales = this.maqueta.materiales
        this.camara = this.maqueta.camara
        this.inventario = this.maqueta.recursos.items.inventario
        //Elementos
        this.menuFlotante = document.getElementById('menuflotante')
        this.menuFlotanteBtns = this.menuFlotante.querySelectorAll('a')
        this.btnsCerrar = document.querySelectorAll('.btnCerrar-modal')
        this.btnFiltrar = document.getElementById('filtrar')
        this.modalUnidades = document.getElementById('modal-unidades')
        this.btnNuevaBusqueda = document.getElementById('btn-nueva-busqueda')
        this.tablaResultados = document.querySelector('#resultados tbody')
        this.filasApto = document.querySelectorAll('.listado-resultados tbody tr')
        this.btnMostrarZonas = document.getElementById('btnZonas')
        //Modal hotspot zonas
        this.modalHotspot = document.querySelector('#modal-hotspots')
        this.hotImg = this.modalHotspot.querySelector('.hotspot-img')
        this.hotLabel = this.modalHotspot.querySelector('.hotspot-label')
        this.hotspotZonasBtn = document.querySelectorAll('.hw-zonas .hotspot')

        this.hotspotZonasBtn.forEach(item => {
            item.addEventListener('click', event => {
                event.preventDefault()
                this.modalHotspot.classList.add('activo')
                //this.hotImg.innerHTML = `<img src="${item.img}" alt="Planta">`
                this.hotImg.innerHTML = `<img src="img/piscina.jpg" alt="Planta">`
                this.hotLabel.innerHTML = 'Piscina'
            })
        })

        //Tooltip y modal aptos
        this.tooltipApto = document.getElementById('tooltip-apto')
        this.tool_torre = this.tooltipApto.querySelector('.torre span')
        this.tool_apto = this.tooltipApto.querySelector('.apto span')
        this.tool_ac = this.tooltipApto.querySelector('.a-c span')
        this.tool_ap = this.tooltipApto.querySelector('.a-p span')
        this.tool_img = this.tooltipApto.querySelector('.tool-img')
        this.btnMostrarApto = document.querySelector('#tooltip-apto .btn-ir')
        this.btnCerrarTooltip = document.querySelector('#tooltip-apto .btn-cerrar')
        this.modalApto = {}
        this.modalApto.contenedor = document.querySelector('#modal-aptos')
        this.modalApto.apto_tit = document.querySelector('#modal-aptos h2')
        this.modalApto.pre_tit = document.querySelector('#modal-aptos .prefijo_tit')
        this.modalApto.suf_tit = document.querySelector('#modal-aptos .sufijo_tit')
        this.modalApto.area_ac = document.querySelector('#modal-aptos .area_ac span')
        this.modalApto.area_ap = document.querySelector('#modal-aptos .area_ap span')
        this.modalApto.area_b = document.querySelector('#modal-aptos .area_b span')
        this.modalApto.atributos = document.querySelector('#modal-aptos .atributos')
        this.modalApto.img_planta = document.querySelector('#modal-aptos .img_planta')
        this.modalApto.btnVolver = document.querySelector('#modal-aptos .btn-volver-apto')
        this.modalApto.btnVolver.addEventListener('click', (event) => {
            event.preventDefault()
            this.modalApto.contenedor.classList.remove('activo')
            this.limpiarInfo()
        })


        //Menu flotante
        this.menuFlotanteBtns.forEach(item => {
            item.addEventListener('click', event => {
                event.preventDefault()
                const destino = document.querySelector(item.dataset.destino)
                if (destino) {
                    //Mostrar Pop up
                    destino.classList.add('activo')
                    //Ocultar menu
                    this.menuFlotante.classList.add('ocultar')
                }

            })
        })
        //Cerrar modales
        this.btnsCerrar.forEach(item => {
            item.addEventListener('click', event => {
                event.preventDefault()
                let modal = item.parentNode
                modal.classList.remove('activo')
                this.menuFlotante.classList.remove('ocultar')
            })
        })
        //Agregar filtrar
        this.btnFiltrar.addEventListener('click', () => { this.filtrar(this) }, false)
        //Mostrar Apto
        this.btnMostrarApto.addEventListener('click', () => { this.mostrarApto(this) }, false)
        //Mostrar Zonas
        this.btnMostrarZonas.addEventListener('click', () => { this.mostrarZonas(this) }, false)
        //Ver ejemplo de inventario
        console.log('Ejemplo inventario: ', this.inventario[0])

    }
    // Depende de inventario
    filtrar(interaccion) {
        event.preventDefault();
        interaccion.quitarAislamiento();
        //Limpiar máscaras
        interaccion.maqueta.mundo.mascarasProyecto.traverse(child => {
            if (child.type === "Mesh") {
                child.visible = false
            }
        })
        interaccion.tablaResultados.innerHTML = ''
        //Consultar json
        for (let i = 0; i < interaccion.inventario.length; i++) {
            const infoID = interaccion.inventario[i].id

            //Prender los aptos del JSON
            interaccion.maqueta.mundo.mascarasProyecto.traverse(child => {
                if (child.type === "Mesh") {
                    if (child.userData.id === infoID) {
                        child.visible = true
                        child.layers.enable(1)
                    }
                }
            })
            //Pintar tabla
            const resultado =
                `<tr data-apto="${interaccion.inventario[i].id}">
                <td>${interaccion.inventario[i].torre}</td>
                <td>${interaccion.inventario[i].apto_tit}</td>
                <td>${interaccion.inventario[i].tipo_tit}</td>
                <td>${interaccion.inventario[i].habitaciones}</td>
                <td>${interaccion.inventario[i].piso}</td>
                <td>${interaccion.inventario[i].area_ac}</td>
                <td>$${Intl.NumberFormat('de-DE').format(interaccion.inventario[i].valor)}</td>
                <td>
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.625 1.18751C11.2782 1.17842 12.6875 2.00754 12.6875 4.68751C12.6875 7.36748 6.99995 11.25 6.99995 11.25C6.99995 11.25 1.3125 7.36748 1.3125 4.68751C1.3125 2.00754 2.72178 1.1892 4.375 1.18751C5.25 1.18662 6.45391 1.7364 7.00005 2.50001C7.54609 1.7364 8.74018 1.19238 9.625 1.18751Z" stroke="#70676F" stroke-linejoin="round" />
                    </svg>
                </td>
            </tr>`


            const tablaResultadosActual = interaccion.tablaResultados.innerHTML
            interaccion.tablaResultados.innerHTML = tablaResultadosActual + resultado
            //Actualizar filasApto
            interaccion.filasApto = document.querySelectorAll('.listado-resultados tbody tr')

            interaccion.filasApto.forEach(item => {
                item.addEventListener('click', () => interaccion.activarFila(event, interaccion), false)
            })
        }
        //Mostrar resultados
        interaccion.modalUnidades.classList.add('mostrando-resultados')
    }
    //
    activarFila(e, interaccion) {
        e.preventDefault()
        e.stopPropagation()
        const fila = e.target,
            identificador = fila.dataset.apto
        if (identificador) {
            interaccion.aislarApto(identificador)
        }
    }
    // Depende de inventario
    aislarApto(identificador) {
        //this ya se refiere a Interaccion
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

                    this.maqueta.moverCamara(child)
                    //Mostrar tooltip

                    this.tooltipApto.classList.add('activo')
                    this.btnMostrarApto.dataset.destino = identificador
                    //Pintar info
                    let obj = this.inventario.find(obj => obj.id === identificador)

                    this.tool_torre.innerHTML = obj.torre
                    this.tool_apto.innerHTML = obj.apto_tit
                    this.tool_ac.innerHTML = obj.area_ac
                    this.tool_ap.innerHTML = obj.area_ap
                    this.tool_img.innerHTML = `<img src="${obj.img_planta}" alt="Planta de unidad">`
                }
            }
        })
    }
    //
    quitarAislamiento(animarCamara) {
        this.tooltipApto.classList.remove('activo')
        this.btnMostrarApto.dataset.destino = ''

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
    }
    // Depende de inventario
    mostrarApto(interaccion) {

        // Si es por ID se debe usar el de abajo
        const aptoActivo = interaccion.btnMostrarApto.dataset.destino
        let obj = interaccion.inventario.find(obj => obj.id === aptoActivo)
        //Pintar info
        interaccion.modalApto.contenedor.classList.add('activo')
        interaccion.modalApto.apto_tit.innerHTML = obj.apto_tit
        interaccion.modalApto.pre_tit.innerHTML = 'Torre ' + obj.torre
        interaccion.modalApto.suf_tit.innerHTML = 'Apto tipo ' + obj.tipo
        interaccion.modalApto.area_ac.innerHTML = obj.area_ac
        interaccion.modalApto.area_ap.innerHTML = obj.area_ap
        interaccion.modalApto.img_planta.innerHTML = `<img src="${obj.img_planta}" alt="Planta de unidad">`
        //area_b.innerHTML = obj.area_b
        /*interaccion.modalApto.atributos.innerHTML = `<li>Habitaciones: ${obj.habitaciones}</li><li>Baños: ${obj.banos}</li>`
        if (obj.atributos) {
            let atrs = obj.atributos.split(',');
    
            atrs.forEach((item) => {
                let li = document.createElement("li");
                li.innerText = item;
                atributos.appendChild(li);
            })
        }*/
        //Agregar tour
        /*if (obj.tour_url) {
            btnTour.classList.add('visible')
            tourApto.setAttribute('src', obj.tour_url)
        } else {
            btnTour.classList.remove('visible')
            tourApto.setAttribute('src', '')
        }*/
    }
    //
    limpiarInfo() {

        this.modalApto.apto_tit.innerHTML = ''
        this.modalApto.area_ac.innerHTML = ''
        this.modalApto.area_ap.innerHTML = ''
        //this.modalApto.area_b.innerHTML = ''
        this.modalApto.atributos.innerHTML = ''
        this.modalApto.img_planta.innerHTML = ''
        //this.modalApto.img_piso.innerHTML = ''
    }
    mostrarZonas(interaccion) {
        const mundo = interaccion.mundo,
            elementos = [mundo.mascarasProyecto, mundo.torre1, mundo.torre1_balcon, mundo.torre1_balcon_plano, mundo.torre1_pergolas, mundo.torre1_ventanas, mundo.torre2, mundo.torre2_balcon, mundo.torre2_balcon_plano, mundo.torre2_pergolas, mundo.torre2_ventanas, mundo.torre3, mundo.torre3_balcon, mundo.torre3_balcon_plano, mundo.torre3_pergolas, mundo.torre3_ventanas]

        const controles = this.camara.controles

        //mundo.piso1_muros.modelo.material = this.materiales.materialesProyecto.zonasSeleccionadas
        function resaltar() {
            mundo.piso1_muros.modelo.traverse(child => {
                if (child.type === "Mesh") {
                    child.material = interaccion.materiales.materialesProyecto.zonasSeleccionadas
                }
            })
            mundo.piso1.modelo.traverse(child => {
                if (child.type === "Mesh") {
                    child.material = interaccion.materiales.materialesProyecto.pisoSeleccionado
                }
            })
            mundo.cubierta_verde.modelo.traverse(child => {
                if (child.type === "Mesh") {
                    child.visible = false
                }
            })
            mundo.piso1_placa.modelo.traverse(child => {
                if (child.type === "Mesh") {
                    child.visible = false
                }
            })
        }



        controles.enabled = false
        gsap.to(this.camara.instancia.position, {
            duration: 2,
            x: -4.4829,
            y: 4.284,
            z: -1.846,
            onUpdate: function () {
                controles.update()
            },
            onComplete: function () {
                controles.enabled = true
                resaltar()
                elementos.forEach(elevar)
                document.querySelector('.hw-zonas').classList.add('activo')
            }
        })


        function elevar(item, index, arr) {

            if (item.type === 'Group') {
                gsap.to(item.position, {
                    duration: 1,
                    y: 80
                })
            } else {
                gsap.to(item.modelo.position, {
                    duration: 1,
                    y: 80
                })
            }


        }
    }
}