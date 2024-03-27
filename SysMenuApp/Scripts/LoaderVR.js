function mostrarLoader() {
    const contenedor_loader = document.querySelector('.contenedor_loader');
    contenedor_loader.style.opacity = 100;
    contenedor_loader.style.visibility = 'visible';
}
function ocultarLoader() {
    const contenedor_loader = document.querySelector('.contenedor_loader');
    contenedor_loader.style.opacity = 0;
    contenedor_loader.style.visibility = 'hidden';
}

//VALIDACIONES

function soloNumeros(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        toastr.error('Solo se admiten números', 'Error');
        return false;
    }
    return true;
};

function cambiarMaxLenght(valor, nombreTxt) {
    mostrarLoader();
    $("#" + nombreTxt).val("");

    var imputTxt = document.getElementById(nombreTxt);
    var IdTipoDocumento = parseInt(valor);

    if (IdTipoDocumento != "0") {
        imputTxt.readOnly = false;
        $.ajax({
            type: "POST",
            url: "/TipoDocumento/ObtenerTipoDocumentoPorId",
            data: '{tipoDoc: ' + IdTipoDocumento + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                $("#" + nombreTxt).attr('maxlength', response.tipoDocCLS.LongitudTipoDocumento);
                ocultarLoader();
            },
            error: function () {
                toastr.error('Ocurrió un error, vuelve a intentar', 'Error');
                ocultarLoader();
            }
        });
    } else {
        imputTxt.readOnly = true;
        ocultarLoader();
    }   
};