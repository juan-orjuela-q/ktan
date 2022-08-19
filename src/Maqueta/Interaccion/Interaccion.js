import Maqueta from "../Maqueta.js"
import Cercanias from "./Cercanias.js"

export default class Interaccion {
    constructor() {
        this.maqueta = new Maqueta()
        this.cercanias = new Cercanias()
    }
}

