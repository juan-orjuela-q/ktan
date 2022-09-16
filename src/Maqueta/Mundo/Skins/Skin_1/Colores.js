export default class Colores 
{
    constructor()
    {
        this.paleta = {
            color1: '#222431',
            color2: '#F9E2D0',
            color3: '#C1403A',
            color4: '#458376',
            color5: '#313c90',
            color6: '#cfcfc9'
            
        },
        this.luces = {
            ambient: '#FFFFFF',
            point: '#FFFFFF',
            directional: '#FFFFFF'
        },
        this.mascaras = {
            mascara1: '#222431',
            mascara2: '#F9E2D0',
            mascara3: '#C1403A',
            mascara4: '#458376',
            mascara5: '#313c90',
            mascaraHover: '#ffffff',
            mascaraClick: '#ffffff',
            mascaraLinea: this.paleta.color1
        }
        this.coloresMundo = {
            blanco: '#FFFFFF',
            colorAmbiente: '#FFFFFF',
            colorProyecto: '#FFFFFF',//'#94a0a4
            colorProyectoAlt: this.paleta.color3,
            colorEdificios: '#e5e5e0',//c7cbd1
            colorEdificiosLinea: '#ffffff',
            colorVias: '#f1f2f8',
            colorTransito: '#222431',
            colorAlerta: '#C1403A',
            colorArboles: '#ffffff',//#d3ddc0
            colorAndenes: '#c8c6c0',
            colorCielo: '#f5f3ea',
            colorBruma: '#f2efe8',
            colorTerreno: '#dbdbdb',
            colorNubes: '#dbdbdb',
            //Colores version alterna
            colorBarandas: '#ffffff',
            colorBbq: '#84889f',
            colorCarros: '#dfd8c8',
            colorComunal: '#ffffff',//#f3f1e8
            colorJuegos: '#84889f',
            colorLuminarias: '#222431',
            colorTorres: '#ffffff',//#f3f1e8
            colorTorresLineas: '#ffffff',
            colorUrbano: '#ffffff'
        }
    }
}
