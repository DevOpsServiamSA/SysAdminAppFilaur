document.addEventListener("DOMContentLoaded", () => {
    const $boton = document.querySelector("#btnCrearPdf");
    $boton.addEventListener("click", () => {

        const $elementoParaConvertir = document.getElementById("affidavit"); // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                //pagebreak: { mode: 'avoid-all', before: '#page2el' },
                margin: 0,
                filename: 'affidavit.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 2, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'portrait' // landscape o portrait
                    //orientation: 'p',
                    //unit: 'mm',
                    //format: 'a4',
                    //putOnlyUsedFonts: true,
                    //floatPrecision: 16
                }

               
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});


$(document).ready(function () {
    mostrarLoader(); 
    var html = "";
    $.ajax({
        type: "POST",
        url: '/SysMenuApp/Comercial/ObtenerCliente',
        // url: '/Comercial/ObtenerCliente',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.lstCliente.length > 0) {
                html += "<option value=''>--Seleccione--</option>";
                for (var i = 0; i < data.lstCliente.length; i++) {
                    html += "<option value='" + data.lstCliente[i].Cliente + "'>" + data.lstCliente[i].Nombre + "</option>";
                }
                document.getElementById("idCliente").innerHTML = html;
                
            }
            ocultarLoader();
        
        },


        error: function (ex) {
            ocultarLoader();
        }
    });
});


function obtenerPedido(IdCliente) {
    var html = "";
    $.ajax({
        type: "POST",
        // url: '/Comercial/ObtenerPedido',
        url: '/SysMenuApp/Comercial/ObtenerPedido',
        data: '{IdCliente: ' + JSON.stringify(IdCliente) + '}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.lstOrden.length > 0) {
                html += "<option value=''>--Seleccione--</option>";
                for (var i = 0; i < data.lstOrden.length; i++) {
                    html += "<option value='" + data.lstOrden[i].Pedido + "'>" + data.lstOrden[i].Pedido + "</option>";
                }
                document.getElementById("orden").innerHTML = html;
            }
        },
        error: function (ex) {
            ocultarLoader();
        }
    });
};

function obtenerArticulo(IdPedido) {
    var html = "";
    $.ajax({
        type: "POST",
        url: '/SysMenuApp/Comercial/ObtenerArticulo',
        // url: '/Comercial/ObtenerArticulo',
        data: '{IdPedido: ' + JSON.stringify(IdPedido) + '}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.lstArticulo.length > 0) {
                html += " ";
                for (var i = 0; i < data.lstArticulo.length; i++) {
                    html += "<option value='" + data.lstArticulo[i].Articulo + "'>" + data.lstArticulo[i].Descripcion + "</option>";
                }
                document.getElementById("articulo").innerHTML = html;
            }
        },
        error: function (ex) {
            ocultarLoader();
        }
    });
};

function generarAffidavit() {

    var objFiltroReporte = {};
    objFiltroReporte.Cliente = document.getElementById("idCliente").value;
    objFiltroReporte.Pedido = document.getElementById("orden").value;
    objFiltroReporte.Articulo = document.getElementById("articulo").value;

    var html = "";
    $.ajax({
        type: "POST",
        url: '/SysMenuApp/Comercial/obtenerAffidavit',
        // url: '/Comercial/obtenerAffidavit',
        data:  JSON.stringify(objFiltroReporte),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.lstReporteAffi.length > 0) {
                var combo = document.getElementById("idCliente");
                var selected = combo.options[combo.selectedIndex].text;
                document.getElementById("NombreCliente").innerHTML = selected;
                var desc = document.getElementById("descripcion").value;
                document.getElementById("descripcionLinea").innerHTML = desc;
                var numeroMenor = 0;
                var numeroMayor = 0;
                var annioMenor = 0;
                var annioMayor = 0;
                var cant = data.lstReporteAffi.length;
                for (var i = 0; i < data.lstReporteAffi.length; i++) {
                    
                    html += "<tr>"
                    html += "<td>" + data.lstReporteAffi[i].Peso_Neto + " </td>"
                    html += "<td>" + data.lstReporteAffi[i].Fecha_Factura + " </td>"
                    html += "<td>" + data.lstReporteAffi[i].Factura + " </td>"
                    html += "<td>" + data.lstReporteAffi[i].Guia_Remision + " </td>"
                    html += "<td>" + data.lstReporteAffi[i].Pedido + " </td>"
                    html += "</tr>"
                }

                numeroMenor   = data.lstReporteAffi[0].Fecha_Factura.split('/')[1];
                annioMenor    = data.lstReporteAffi[0].Fecha_Factura.split('/')[2];

                numeroMayor   = data.lstReporteAffi[cant-1].Fecha_Factura.split('/')[1];
                annioMayor    = data.lstReporteAffi[cant-1].Fecha_Factura.split('/')[2];

                textoNumMenor = obtenerNombreMes(numeroMenor);
                textoNumMayor = obtenerNombreMes(numeroMayor);

                document.getElementById("fInicio").innerHTML = "     " + textoNumMenor + " " + annioMenor + "     ";
                document.getElementById("fFin").innerHTML = "     " + textoNumMayor + " " + annioMayor + "     ";

                document.getElementById('affidavit').style.display = 'block';
                document.getElementById("grillaAffidavit").innerHTML = html;
            }
        },
        error: function (ex) {
            ocultarLoader();
        }
    });
};

function obtenerNombreMes(data) {
    if (data == '01') {
        return "JANUARY";
    }
    if (data == '02') {
        return "FEBRUARY";
    }
    if (data == '03') {
        return "MARCH";
    }
    if (data == '04') {
        return "APRIL";
    }
    if (data == '05') {
        return "MAY";
    }
    if (data == '06') {
        return "JUNE";
    }
    if (data == '07') {
        return "JULY";
    }
    if (data == '08') {
        return "AUGUST";
    }
    if (data == '09') {
        return "SEPTEMBER";
    }
    if (data == '10') {
        return "OCTOBER";
    }
    if (data == '11') {
        return "NOVEMBER";
    }
    if (data == '12') {
        return "DECEMBER";
    }
}

function GuardarAuditoria() {

    mostrarLoader();
        var div = document.getElementById("affidavit").innerHTML;
        var encrypted = CryptoJS.AES.encrypt(div, "MyPass").toString();
        var objFiltroReporte = {};
        objFiltroReporte.Cliente = document.getElementById("idCliente").value;
        objFiltroReporte.Pedido = document.getElementById("orden").value;
        objFiltroReporte.Reporte = encrypted;
    
        $.ajax({
            type: "POST",
            url: '/SysMenuApp/Comercial/GuardarAuditoria',
            // url: '/Comercial/GuardarAuditoria',
            data: JSON.stringify(objFiltroReporte),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

            },
            error: function (ex) {
                ocultarLoader();
            }
        });
    ocultarLoader();
};