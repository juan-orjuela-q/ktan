import $ from "jquery"
//import spritespin from 'spritespin'
import defaultExport from 'spritespin'

export default class ToggleRealismo {
    constructor() {
        this.activarRealismo()

    }
    activarRealismo() {
        const btnCambioEscena = document.querySelector('#btn-cambioEscena'),
            maquetaRender = document.querySelector('#maqueta-render')

        let escRender = true,
            frameActual = 0

        let renders = []
        for (let i = 0; i < 120; i++) {
            const render = `maqRender/${i}.jpg`
            renders.push(render)
        }
        $(function () {

            

            $('#maqueta-render').spritespin({
                source: renders,
                width: 1920,
                height: 1080,
                // reverse interaction direction
                sense: -1,
                animate: false,
                onFrame: function (e, data) {
                    frameActual = data.frame
                }
            });
        })
        

        btnCambioEscena.addEventListener('click', event => {
            btnCambioEscena.classList.toggle('activo')
            maquetaRender.classList.toggle('activo')
            if (escRender) {

                escRender = false
            } else {
                escRender = true
            }
        })
    }
}