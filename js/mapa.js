       
        
    //Mapa inicial donde se carga toda la info
    var map = L.map('map', {zoomControl: false}).setView([20.4791, -98.9621,], 8);

    //Mapa Base
    var osm= L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: ''
}).addTo(map);




    //Funciones para coropletas
    //color Poblacion total
    function getColor(d) {
  if (d === 1) {
    return '#9ACD32';
  } else if (d === 2) {
    return '#FFD200';
  } else if (d === 3) {
    return '#FF0000';
  } else {
    return '#FFEDA0'; // Color por defecto si no coincide con ninguna de las opciones anteriores
  }
}

//estilos
function generateStyleFunction(suffix) {
  return function(feature) {
    return {
      fillColor: getColor(feature.properties['m1_1_' + suffix]), // Cambiar a cualquier color que desees
      fillOpacity: 1, // Cambiar la opacidad del relleno
      color: '#235b4e', // Cambiar el color del borde
      weight: 1, // Cambiar el grosor del borde
    };
  };
}

indicadores=7
// Generar funciones de estilo para m1_1_1 a m1_1_7
var styleFunctions = [];
for (var i = 1; i <= indicadores; i++) {
  styleFunctions.push(generateStyleFunction(i.toString()));
}

// Ejemplo de uso: obtener el estilo para m1_1_3
var style1 = styleFunctions[0]; // el índice 2 corresponde a m1_1_3
var style2 = styleFunctions[1]
var style3 = styleFunctions[2]
var style4 = styleFunctions[3]
var style5 = styleFunctions[4]
var style6 = styleFunctions[5]
var style7 = styleFunctions[6]


//EVENTO PARA RESALTAR CON HOVER Y REGRESAR AL ESTILO PRINCIPAL CUANDO SE QUITA EL HOVER
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    var layer = e.target;
    var style = layer.options.style(layer.feature);

    layer.setStyle(style);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

//SECCIÓN CAPAS
//Capa geojson población
var estructuras = [];

// Generar las variables de estructura en un bucle
for (var i = 1; i <= indicadores; i++) {
  var estructura = L.geoJson(estructura1_1, {
    style: window['style' + i],
    onEachFeature: onEachFeature
  });
  estructuras.push(estructura);
}

// Ejemplo de uso: acceder a las variables de estructura
var estructura1 = estructuras[0];
var estructura2 = estructuras[1];
var estructura3 = estructuras[2];
var estructura4 = estructuras[3];
var estructura5 = estructuras[4];
var estructura6 = estructuras[5];
var estructura7 = estructuras[6];
// ... estructura4, estructura5, estructura6, estructura7




///Caja con información

function valorToCircle(valor) {
    var colorClass;
    switch(valor) {
        case 1: 
            colorClass = 'green-circle';
            break;
        case 2: 
            colorClass = 'yellow-circle';
            break;
        case 3: 
            colorClass = 'red-circle';
            break;
        default: 
            return valor; 
    }
    return `<div class="circle ${colorClass}"></div>`;
}


var info = L.control({position:'bottomright'});

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = `<div class="info">
        <img src="img/icon/location.gif" alt="Location icon">
        <h4>Indicadores Sobre el tema "Estructura" | Módulo 1</h4>
        ${props ?
        `<div class="locality-name">${props.NOMGEO.toUpperCase()}</div>
        <ul>
            <li><b>Bando, Policia y Gobierno:</b> ${valorToCircle(props.m1_1_1)}</li>
            <li><b>Manuales de organización:</b> ${valorToCircle(props.m1_1_2)}</li>
            <li><b>Tabulador de sueldos:</b> ${valorToCircle(props.m1_1_3)}</li>
            <li><b>Unidades administrativas existentes:</b> ${valorToCircle(props.m1_1_4)}</li>
            <li><b>Personal municipal total:</b> ${valorToCircle(props.m1_1_5)}</li>
            <li><b>Nivel salarial del Presidente municipal:</b> ${valorToCircle(props.m1_1_6)}</li>
            <li><b>Participación de las mujeres en puestos de mando:</b> ${valorToCircle(props.m1_1_7)}</li>
        </ul>`
        : 'Selecciona algún municipio'}
    </div>`;
};
info.addTo(map);



// Sección de LEYENDAS
// Leyenda de la capa población
var legend = L.control({ position: 'bottomleft' });

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  var grades = [1, 2, 3];
  var labels = [];

  // Agregar título más pequeño
  div.innerHTML = '<strong>Semaforización</strong><br>';

  // Generar etiquetas para la leyenda basadas en los valores de 'grades'
  for (var i = 0; i < grades.length; i++) {
    var grade = grades[i];
    var label;
    switch (grade) {
      case 1: label = 'Óptimo'; break;
      case 2: label = 'En Proceso'; break;
      case 3: label = 'Rezago'; break;
      default: label = 'N/A';
    }

    // Usar span en lugar de h6 para hacerlo más compacto
    labels.push(
      '<i style="background:' + getColor(grade) + '; width: 10px; height: 10px; display: inline-block; border-radius: 50%;"></i> ' +
      '<span>' + label + '</span>'
    );
  }

  // Añadir 'No medible' y 'No disponible' con un estilo más compacto
  labels.push(
    '<i style="background:white; border: 1px solid black; width: 10px; height: 10px; display: inline-block; border-radius: 50%;"></i> ' +
    '<span>No medible</span>'
  );
  labels.push(
    '<i style="background:gray; width: 10px; height: 10px; display: inline-block; border-radius: 50%;"></i> ' +
    '<span>No disponible</span>'
  );

  div.innerHTML += labels.join('<br>');
  return div;
};




var baseMaps = {

   /* "Mapa clásico": osm,*/
    
};
var baseMaps1 = {
};
var pobla = {
    //"<img src='img/icon/clues.png' style='max-width: 18px;' />   Indicadores Sobre el tema "Estructura": markers,
    " 1.1.1 Bando, Policia y Gobierno": estructura1.addTo(map),
    " 1.1.2 Manuales de organización": estructura2, 
    "1.1.3 Tabulador de sueldos con la <br>estructura salarial del personal<br> de la administración pública municipal": estructura3,
    " 1.1.4 Unidades administrativas existentes<br>en función del número de <br>unidades administrativas promedio": estructura4,  
    " 1.1.5 Personal municipal total por cada <br>1000 habitantes": estructura5,  
    " 1.1.6 Nivel salarial del Presidente municipal": estructura6,  
    " 1.1.7 Participación de las mujeres<br>en puestos de mando medio y superior  <br>de la administración pública municipal": estructura7,  
};


//Se agrega un Control de capas
//var layerControl = L.control.layers(baseMaps, pobla,{collapsed: false, position: 'bottomleft'}).addTo(map);
// Se agrega una barra de escala
//L.control.scale({position: 'bottomleft'}).addTo(map);

// Agregar el control de leyenda al mapa
legend.addTo(map);


    //Marca de Agua SIGEH
    L.Control.Watermark = L.Control.extend({
    onAdd: function(map) {
        var img = L.DomUtil.create('img');

        img.src = 'img/sigeh_centro.png';
        img.style.width = '400px';

        return img;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.control.watermark = function(opts) {
    return new L.Control.Watermark(opts);
}

//L.control.watermark({ position: 'bottomleft' }).addTo(map);


var searchControl = new L.Control.Search({
       layer: estructura1,
       propertyName: 'NOMGEO',
       circleLocation: true,
       position: 'bottomright'
});

searchControl.on('search_locationfound', function(e) {
       e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
})



//Funciones extras muy importantes

map.addControl(searchControl);
const sidepanelLeft = L.control.sidepanel('mySidepanelLeft', {
			tabsPosition: 'left',
			startTab: 'tab-5',
      darkMode: true,
		}).addTo(map);
const sidepanelRight = L.control.sidepanel('mySidepanelRight', {
			panelPosition: 'right',
			tabsPosition: 'top',
			pushControls: true,
			darkMode: false,
			startTab: 1
		}).addTo(map);

var DropdownControl = L.Control.extend({
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'dropdown');
        var select = L.DomUtil.create('select', 'dropdown-menu', container);

        // Agrega las opciones al menú desplegable
        var options = [
            { value: '', text: 'Selecciona aquí un indicador para mapearlo' },
            { value: 'modulo1', text: '1.1.1 Bando, Policia y Gobierno' },
            { value: 'modulo2', text: '1.1.2 Manuales de organización' },
            { value: 'modulo3', text: '1.1.3 Tabulador de sueldos con la estructura salarial del personal de la administración pública municipal' },
            { value: 'modulo4', text: '1.1.4 Unidades administrativas existentes en función del número de unidades administrativas promedio' },
            { value: 'modulo5', text: '1.1.5 Personal municipal total por cada 1000 habitantes' },
            { value: 'modulo6', text: '1.1.6 Nivel salarial del Presidente municipal' },
            { value: 'modulo7', text: '1.1.7 Participación de las mujeres en puestos de mando medio y superior de la administración pública municipal' },
        ];

        options.forEach(function(option) {
            var optionElement = L.DomUtil.create('option', '', select);
            optionElement.value = option.value;
            optionElement.text = option.text;
        });

        // Posiciona el control en el centro superior del mapa
        var controlPosition = container.style;
        controlPosition.position = 'absolute';
        controlPosition.top = '20px';
        controlPosition.left = '50%';
        controlPosition.transform = 'translateX(-50%)';
        controlPosition.zIndex = '1000';

        // Detiene la propagación de eventos del control para evitar conflictos con el mapa
        L.DomEvent.disableClickPropagation(container);

        // Evento para detectar cambios en la selección del menú desplegable
        select.addEventListener('change', function(event) {
            var selectedValue = event.target.value;

            // Verifica si se seleccionó "Módulo 2 | Hacienda"
            if (selectedValue === 'modulo2') {
                // Activa la capa "Estructura 2"
                estructura2.addTo(map);
            } else {
                // Remueve la capa "Estructura 2" si está agregada
                if (map.hasLayer(estructura2)) {
                    map.removeLayer(estructura2);
                }
            }
        });

        return container;
    }
});

// Crea una instancia del control personalizado
var dropdownControl = new DropdownControl();

// Agrega el control al mapa Leaflet
dropdownControl.addTo(map);


jQuery(document).ready(function(){
    jQuery('ul.sf-menu').superfish();
  });

  //para sustitur el id=mapa por los htmls
  document.getElementById("showFrameLink").addEventListener("click", function() {
    // Ocultar el mapa
    document.getElementById("map").style.display = "none";
    
    // Mostrar el iframe
    document.getElementById("frameDiv").style.display = "block";
});

document.getElementById("showMapLink").addEventListener("click", function() {
    // Ocultar el iframe
    document.getElementById("frameDiv").style.display = "none";

    // Mostrar el mapa
    document.getElementById("map").style.display = "block";
});

