import Maqueta from "../Maqueta.js"
import Cercanias from "./Cercanias.js"

export default class Interaccion {
    constructor() {
        this.maqueta = new Maqueta()
        this.cercanias = new Cercanias()
        this.tooltipApto = document.getElementById('tooltip-apto')
        this.tool_torre = this.tooltipApto.querySelector('.torre span')
        this.tool_apto = this.tooltipApto.querySelector('.apto span')
        this.tool_ac = this.tooltipApto.querySelector('.a-c span')
        this.tool_ap = this.tooltipApto.querySelector('.a-p span')
        this.tool_img = this.tooltipApto.querySelector('.tool-img')
        this.btnMostrarApto = document.querySelector('#tooltip-apto .btn-ir')
        this.btnCerrarTooltip = document.querySelector('#tooltip-apto .btn-cerrar')
    }
}

