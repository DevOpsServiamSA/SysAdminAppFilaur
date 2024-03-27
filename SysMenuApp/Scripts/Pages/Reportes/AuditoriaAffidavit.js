var app_AuditoriaAffidavit = (function (win, doc) {

    const data = {
        //urlAuditoriaAffidavit: '/Comercial/GenerarAuditoriaAffidavit/'
        urlAuditoriaAffidavit: '/SysMenuApp/Comercial/GenerarAuditoriaAffidavit/'
        /*  urlGenerarReporte: '/Reporte/GenerarReporteMP/'*/
    }

    function init() {
        formatoRangoFecha();
        document.getElementById("btnBuscarAuditoria").addEventListener("click", listarAuditoriaAffidavit);


    }

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


    function listarAuditoriaAffidavit() {
        mostrarLoader();
        var objFiltro = {};
        //objFiltro.Cliente = document.getElementById("idCliente").value;
        objFiltro.Finicio = document.getElementById("fInicio").value;
        objFiltro.Ffin = document.getElementById("fFin").value;


        $.ajax({
            type: "POST",
            // url: data.urlAuditoriaAffidavit,
            url: '/SysMenuApp/Comercial/GenerarAuditoriaAffidavit',
            data: '{objFiltro: ' + JSON.stringify(objFiltro) + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                const rpta = data.lstAuditoria;

                if (rpta.length > 0) {
                    crearTabla(rpta);

                    toastr.success('Registros obtenidos correctamente');
                } else {
                    $('#tbListaAuditoria').DataTable().clear().destroy();
                    toastr.error('No existe registros para este filtro, intente otro');
                }
                ocultarLoader();
            },
            error: function (ex) {
                ocultarLoader();
            }
        });
    }

    function crearTabla(data) {
        let tbody = '';
        const thead = `<thead>
                                    <th data-width="10px">#</th>
                                    <th data-width="50px">Cliente</th>
                                    <th data-width="100px">Nombre Cliente</th>
                                    <th data-width="80px">Orden Compra</th>
                                    <th data-width="50px">Usuario</th>
                                    <th data-width="80px">Fecha Impresión</th>
                                    <th data-width="50px">Descargar Reporte Affidavit</th>
                                </tr>
                            </thead>`;
        if (data !== null) {
            tbody = data.map(x => {
              /*  var encrypted = CryptoJS.AES.encrypt(x.Reporte, "MyPass");*/
                return `<tr>
                                <td data-width="10px">${x.IdAffidavit}</td>
                                <td data-width="50px">${x.Cliente}</td>
                                <td data-width="100px">${x.Nombre}</td>
                                <td data-width="80px">${x.Pedido}</td>
                                <td data-width="50px">${x.Usuario}</td>
                                <td data-width="80px">${x.Fecha}</td>                               
                                <td data-width="50px"><button onclick = 'descargarPdf("${ x.Reporte }");' class="btn btn-primary btn-lg px-2">DESCARGAR</button></td>
                            </tr>`;
            }).join('');
        }
        const table = `<table id="tbListaAuditoria" class ="table table-bordered table-dark">${thead}<tbody id="bodyTbListaAuditoria">${tbody}</tbody></table>`;
        document.getElementById("div_tbListaAuditoria").innerHTML = table;
        fotmatTable();
    }

    function fotmatTable() {
        $('#tbListaAuditoria').DataTable({
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



    init();
})(window, document);

