using Entidades;
using Negocio;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace SysMenuApp.Controllers
{
    public class ComercialController : Controller
    {
        UsuariosNE objUsuarios = new UsuariosNE();
        ComercialNE objComercial = new ComercialNE();
        
        List<ComercialCLS> lstReporte = new List<ComercialCLS>();
        List<AuditoriaCLS> lstAuditoria = new List<AuditoriaCLS>();
        // GET: Comercial
        public ActionResult Index()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            var listaTipomov = objComercial.CargaInicial();
            listaTipomov.Insert(0, new CalatogoCLS { NombreItem = "TODOS", ValorItem = "0" });
            ViewBag.listaTipomov = listaTipomov;

            var listaUsuarios = objUsuarios.ListarUsuarios();
            listaUsuarios.Insert(0, new UsuariosCLS { Usser = "TODOS", NombreUsuario = "TODOS" });
            ViewBag.listaUsuarios = listaUsuarios;

            // return View();
            return View("ReporteAffidavit");
        }
        public ActionResult ReporteAffidavit()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            var listaUsuarios = objUsuarios.ListarUsuarios();
            listaUsuarios.Insert(0, new UsuariosCLS { Usser = "TODOS", NombreUsuario = "TODOS" });
            ViewBag.listaUsuarios = listaUsuarios;
            return View();
        }

        [HttpPost]
        public JsonResult ObtenerCliente()
        {
            lstReporte = objComercial.GenerarReporteAffidavit();

            Session["lstReporte"] = lstReporte;//almacena dentro del storage

            var lstCliente = lstReporte.Select(cliente => new { cliente.Cliente, cliente.Nombre }).Distinct();

            var json = Json(new { lstCliente, JsonRequestBehavior.AllowGet });
            json.MaxJsonLength = 50000000;
            return json;
        }

        [HttpPost]
        public JsonResult GenerarAuditoriaAffidavit(FiltrosComercial objFiltro)
        {
            var lstAuditoria = objComercial.GenerarAuditoriaAffidavit(objFiltro);
            var json = Json(new { lstAuditoria, JsonRequestBehavior.AllowGet });
            json.MaxJsonLength = 50000000;
            return json;
        }

        [HttpPost]
        public JsonResult ObtenerPedido(string IdCliente)
        {

            lstReporte = (List<ComercialCLS>)Session["lstReporte"];
            var Cliente = lstReporte.Where(x => x.Cliente.Equals(IdCliente)).ToList();

            var lstOrden = Cliente.Select(pedido => new { pedido.Pedido }).Distinct();

            var json = Json(new { lstOrden, JsonRequestBehavior.AllowGet });
            json.MaxJsonLength = 50000000;
            return json;
        }

        [HttpPost]
        public JsonResult ObtenerArticulo(string IdPedido)
        {

            lstReporte = (List<ComercialCLS>)Session["lstReporte"];
            var Pedido = lstReporte.Where(x => x.Pedido !=null && x.Pedido.Equals(IdPedido)).ToList();

            var lstArticulo = Pedido.Select(articulo => new { articulo.Articulo, articulo.Descripcion }).Distinct();

            var json = Json(new { lstArticulo, JsonRequestBehavior.AllowGet });
            json.MaxJsonLength = 50000000;
            return json;
        }

        [HttpPost]
        public JsonResult obtenerAffidavit(string Cliente, string Pedido, string Articulo)
        {          

            lstReporte = lstReporte = (List<ComercialCLS>)Session["lstReporte"];

            var lstReport = lstReporte.Where(x => x.Cliente.Equals(Cliente) && x.Pedido.Equals(Pedido) && x.Articulo.Equals(Articulo)).ToList();

            var lstReporteAffi = lstReport.Select(reporte => new { reporte.Peso_Neto, reporte.Fecha_Factura, reporte.Factura, reporte.Guia_Remision, reporte.Pedido });

            var json = Json(new { lstReporteAffi, JsonRequestBehavior.AllowGet });
            json.MaxJsonLength = 50000000;
            return json;
        }


        public ActionResult AuditoriaAffidavit()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            var listaUsuarios = objUsuarios.ListarUsuarios();
            listaUsuarios.Insert(0, new UsuariosCLS { Usser = "TODOS", NombreUsuario = "TODOS" });
            ViewBag.listaUsuarios = listaUsuarios;
            return View();
        }

        [HttpPost]
        public JsonResult GuardarAuditoria(AuditoriaCLS objAuditoriaCLS)
        {
           UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            objAuditoriaCLS.Usuario = objUsuarioCLS.NombreUsuario;
            var codigoRpt = objComercial.GuardarAuditoria(objAuditoriaCLS);
            return Json(new { Code = codigoRpt, JsonRequestBehavior.AllowGet });
        }
    }
}