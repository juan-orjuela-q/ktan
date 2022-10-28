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
            color6: '#cfd0d9'
            
        },
        this.luces = {
            ambient: '#fff7e0',//#fff7e0
            point: '#FFFFFF',
            directional: '#fff7e0'
        },
        this.mascaras = {
            mascara1: '#ffffff',
            mascara2: '#F9E2D0',
            mascara3: '#C1403A',
            mascara4: '#458376',
            mascara5: '#313c90',
            mascaraHover: '#FCF29C',
            mascaraClick: '#FCF29C',
            mascaraLinea: '#ffffff'
        }
        this.coloresMundo = {
            blanco: '#FFFFFF',
            colorAmbiente: '#FFFFFF',
            colorProyecto: '#A0AAB4',
            colorProyectoAlt: this.paleta.color3,
            colorVecinos: '#dbe1e6',//c7cbd1
            colorEdificios: '#dbe1e6',//c7cbd1
            colorEdificiosLinea: '#ffffff',
            colorVias: '#BEC5CC',
            colorTransito: '#222431',
            colorAlerta: '#C1403A',
            colorArboles: '#afb992',
            colorAndenes: '#DCE1E5',
            colorCielo: '#f8f5f0',//fbfaea
            colorBruma: '#f0e8cc',//ebeee2
            colorTerreno: '#bfc8a7',
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
