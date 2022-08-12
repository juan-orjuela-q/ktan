//Librerias
import * as dat from 'lil-gui'
import Stats from 'three/examples/jsm/libs/stats.module'

export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#appicua-debug'
        if(this.active){
            this.ui = new dat.GUI()
        }
    }
}