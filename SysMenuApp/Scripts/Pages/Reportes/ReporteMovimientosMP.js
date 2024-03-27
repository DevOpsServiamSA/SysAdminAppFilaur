var app_ReporteMovimientosMP = (function (win, doc) {

    const data = {
        urlGenerarReporte: '/SysMenuApp/Reporte/GenerarReporteMP/'
       //urlGenerarReporte: '/Reporte/GenerarReporteMP'
    }

    function init() {
        document.getElementById("btnExportarMovimientoMP").style.display = "none";
        formatoRangoFecha();
        document.getElementById("btnBuscarMovimientoMP").addEventListener("click", listarMovimientoMP);
        document.getElementById("btnExportarMovimientoMP").addEventListener("click", ExportarExcel);

    }

    function ExportarExcel() {
        mostrarLoader();
        var objFiltro = {};
        objFiltro.Finicio = document.getElementById("fInicio").value;
        objFiltro.Ffin = document.getElementById("fFin").value;

        var htmls = "";
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
        var base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        };

        var format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        };
        htmls = "<table border='2px'>";
        htmls += "<thead>";
        htmls += "<tr>";
        htmls += "<th>Fecha Inicio</th>";
        htmls += "<th>Fecha Fin</th>";
        htmls += "<tbody>";
        htmls += "<tr>";
        htmls += "<td>" + $("#fInicio").val() + "</td>"
        htmls += "<td>" + $("#fFin").val() + "</td>"
        htmls += "</tr>";
        htmls += "<tr></tr>";
        htmls += "<tr></tr>";
        htmls += "</tbody>";
        htmls += "</tr>"
        htmls += "</thead>"
        htmls += "</table>";
        htmls += "";
        htmls += "";
        htmls += "<table border='2px'>"
        htmls += "<thead>";
        htmls += "<tr bgcolor='#87AFC6'><th>Aplicación</th><th>Fecha</th><th>Consecutivo</th><th>Artículo</th><th>Cantidad</th><th>Unidad</th><th>Descripción</th><th>Atributo</th><th>Tipo_Movimiento</th>"+
            "<th>Cuenta_Contable</th><th>Costo_Promedio</th><th>Centro_Costo</th><th>Proveedor</th><th>Referencia</th><th>Fac_Embarque</th><th>Articulo_Cuenta</th><th>Desc_Art_Cta</th><th>Linea_Negocio</th>" +
            "<th>Desc_Linea_Neg</th><th>Mat_Prima</th><th>Lote</th><th>Bodega</th><th>Color</th><th>Tipo_Teñ</th></tr></thead> ";
        htmls += "<tbody>";

        $.ajax({
            type: "POST",
            url: data.urlGenerarReporte,
            //url: '/~/Reporte/GenerarReporte/',
            data: '{objFiltro: ' + JSON.stringify(objFiltro) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //debugger;

                if (data.lstReporte.length > 0) {
                    for (var i = 0; i < data.lstReporte.length; i++) {
                        htmls += '<tr>';
                        htmls += '<td>' + data.lstReporte[i].Documento + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Fecha + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Ope + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Articulo + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Cantidad + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Unidad + '</td>';
                        htmls += '<td>' + data.lstReporte[i].DescripcionLote + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Atributo + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Movimiento + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Cuenta_Contable + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Costo_Promedio + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Centro_Costo + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Proveedor + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Referencia + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Fac_Embarque + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Articulo_Cuenta + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Desc_Art_Cta + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Linea_Negocio + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Desc_Linea_Neg + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Mat_Prima + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Lote + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Bodega + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Color + '</td>';
                        htmls += '<td>' + data.lstReporte[i].Tipo_Teñ + '</td>';
                        htmls += '</tr>';
                    }
                    htmls += "</tbody>";
                    htmls += "</table>";
                    var ctx = {
                        worksheet: 'MovimientoMP',
                        table: htmls
                    }
                    var link = document.createElement("a");
                    link.download = "ReporteMovimientoMP.xls";
                    link.href = uri + base64(format(template, ctx));
                    link.click();
                    toastr.success('Registros exportados correctamente');
                }
                else {
                    toastr.error('No hubo resultados;');
                }
                ocultarLoader();
            },
            error: function (ex) {
                alert(ex.responseText);
                ocultarLoader();
            }
            
        });
    };

    function formatoRangoFecha() {
        //********************LÓGICA PARA OBTENER FECHA ACTUAL******************
        var fecha = new Date(); //Fecha actual
        var mes = fecha.getMonth() + 1; //obteniendo mes
        var dia = fecha.getDate(); //obteniendo dia
        var ano = fecha.getFullYear(); //obteniendo año
        if (dia < 10)
            dia = '0' + dia; //agrega cero si el menor de 10 (DIA)
        if (mes < 10)
            mes = '0' + mes //agrega cero si el menor de 10 (MES)
        //********************LÓGICA PARA OBTENER FECHA ACTUAL******************
        document.getElementById("fInicio").value = ano + '-' + mes + '-' + dia;
        document.getElementById("fFin").value = ano + '-' + mes + '-' + dia;
    }

    function listarMovimientoMP() {
       mostrarLoader();
        var objFiltro = {};
        objFiltro.Finicio = document.getElementById("fInicio").value;
        objFiltro.Ffin = document.getElementById("fFin").value;
        
        $.ajax({
            type: "POST",
            // url: data.urlGenerarReporte,
            url: '/SysMenuApp/Reporte/GenerarReporteMP',
            data: '{objFiltro: ' + JSON.stringify(objFiltro) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                const rpta = data.lstReporte;
               
                if (rpta.length > 0) {
                    crearTabla(rpta);
                    
                    document.getElementById("btnExportarMovimientoMP").style.display = "block";
                    toastr.success('Registros obtenidos correctamente');
                } else {
                    $('#tbListaMovimientoMP').DataTable().clear().destroy();
                    toastr.error('No existe registros para este filtro, intente otro');
                    document.getElementById("btnExportarMovimientoMP").style.display = "none";
                }
                ocultarLoader();
            },
            error: function (ex) {
                ocultarLoader();
            }
        });
        //ocultarLoader();
    }

    function crearTabla(data) {
        let tbody = '';
        const thead = `<thead>
                                    <th data-width="100px">Aplicación</th>
                                    <th data-width="10px">Fecha</th>
                                    <th data-width="100px">Consec.</th>
                                    <th data-width="10px">Artículo</th>
                                    <th data-width="40px">Cantidad</th>
                                    <th data-width="100px">Unidad</th>
                                    <th data-width="10px">Descripción</th>
                                    <th data-width="100px">Atributo</th>
                                    <th data-width="10px">Movimiento</th>
                                    <th data-width="40px">Cta. Contable</th>
                                    <th data-width="100px">Costo %</th>
                                    <th data-width="10px">Cto. Costo</th>
                                    <th data-width="100px">Proveedor</th>
                                    <th data-width="10px">Referencia</th>
                                    <th data-width="40px">Fac. Embarque</th>
                                    <th data-width="100px">Artículo Cta.</th>
                                    <th data-width="10px">Descripción</th>
                                    <th data-width="100px">Linea_Negocio</th>
                                    <th data-width="10px">Descripción</th>
                                    <th data-width="40px">Mat. Prima</th>
                                    <th data-width="100px">Lote</th>
                                    <th data-width="10px">Bodega</th>
                                    <th data-width="40px">Color</th>
                                    <th data-width="40px">Teñido</th>
                                </tr>
                            </thead>`;
        if (data !== null) {
            tbody = data.map(x => {
                return `<tr>
                                <td data-width="100px">${x.Documento}</td>
                                <td data-width="10px">${x.Fecha}</td>
                                <td data-width="100px">${x.Ope}</td>
                                <td data-width="10px">${x.Articulo}</td>
                                <td data-width="40px">${x.Cantidad}</td>
                                <td data-width="100px">${x.Unidad}</td>
                                <td data-width="10px">${x.DescripcionLote}</td>
                                <td data-width="100px">${x.Atributo}</td>
                                <td data-width="10px">${x.Movimiento}</td>
                                <td data-width="40px">${x.Cuenta_Contable}</td>
                                <td data-width="100px">${x.Costo_Promedio}</td>
                                <td data-width="10px">${x.Centro_Costo}</td>
                                <td data-width="100px">${x.Proveedor}</td>
                                <td data-width="10px">${x.Referencia}</td>
                                <td data-width="40px">${x.Fac_Embarque}</td>
                                <td data-width="100px">${x.Articulo_Cuenta}</td>
                                <td data-width="10px">${x.Desc_Art_Cta}</td>
                                <td data-width="40px">${x.Linea_Negocio}</td>
                                <td data-width="10px">${x.Desc_Linea_Neg}</td>
                                <td data-width="40px">${x.Mat_Prima}</td>
                                <td data-width="10px">${x.Lote}</td>
                                <td data-width="40px">${x.Bodega}</td>
                                <td data-width="10px">${x.Color}</td>
                                <td data-width="40px">${x.Tipo_Teñ}</td>
                            </tr>`;
            }).join('');
        }
        const table = `<table id="tbListaMovimientoMP" class ="table table-bordered table-hover" style="width:1350px">${thead}<tbody id="bodyTbListaMovimientoMP">${tbody}</tbody></table>`;
        document.getElementById("div_tbListaMovimientoMP").innerHTML = table;
        fotmatTable();
    }

    function fotmatTable() {
        $('#tbListaMovimientoMP').DataTable({
            "order": [[3, "asc"]],
            "language": {
                "lengthMenu": "Mostrar _MENU_ Entradas",
                "zeroRecords": "Sin información - Lo sentimos",
                "info": "Mostrando página _PAGE_ de _PAGES_",
                "infoEmpty": "No records available",
                "infoFiltered": "Buscar _MAX_ ",
                "search": "Buscar:",
                "processing": "Traitement en cours...",
                "paginate": {
                    first: "Primero",
                    previous: "Anterior",
                    next: "Siguiente",
                    last: "Último"
                },
            }
        });
    }


  
    //funcion de inicio
    init();

})(window, document);