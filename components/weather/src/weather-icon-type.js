import icons from "../../../constants/icons"

const getIconName = (state) => {
    switch (state) {
        case 'Muitas nuvens com chuva isolada':
            return icons.cloudRain
            break;

        case 'Muitas nuvens com possibilidade de chuva isolada':
            return icons.cloudRain
            break;

        case 'Muitas nuvens com chuva isolada':
            return icons.cloudRain
            break;

        case 'Muitas nuvens':
            return icons.dayCloudy
            break;

        case 'Nublado com pancadas de chuva':
            return icons.cloudRain
            break;

        case 'Muitas nuvens com pancadas de chuva isoladas':
            return icons.cloudRain
            break;

        case 'Muitas nuvens com pancadas de chuva e trovoadas isoladas':
            return icons.cloudRainLightning
            break;

        case 'Muitas nuvens com pancadas de chuva e trovoadas':
            return icons.cloudRainLightning
            break;

        case 'Poucas nuvens':
            return icons.daySunny
            break;

        case 'Claro':
            return icons.daySunny
            break;
        
        case 'Muitas nuvens com névoa úmida':
            return icons.cloudy
            break

        case 'Nublado':
            return icons.cloudy
            break;

        case 'Encoberto':
            return icons.cloudy
            break;

        case 'Muitas nuvens com nevoeiro':
            return icons.cloudy
            break;

        case 'Poucas nuvens com nevoeiro ou névoa úmida':
            return icons.cloudy
            break;
    
        default:
            return icons.error
            break;
    }
}

export default getIconName