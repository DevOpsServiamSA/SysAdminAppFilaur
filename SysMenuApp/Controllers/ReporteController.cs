using Entidades;
using Negocio;
using System.Web.Mvc;

namespace SysMenuApp.Controllers
{
    public class ReporteController : Controller
    {
        ReporteNE objReporte = new ReporteNE();
        UsuariosNE objUsuarios = new UsuariosNE();
        // GET: Reporte
        public ActionResult Index()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            var listaTipomov = objReporte.CargaInicial();
            listaTipomov.Insert(0, new CalatogoCLS { NombreItem = "TODOS", ValorItem = "0" });
            ViewBag.listaTipomov = listaTipomov;

            var listaUsuarios = objUsuarios.ListarUsuarios();
            listaUsuarios.Insert(0, new UsuariosCLS { Usser = "TODOS", NombreUsuario = "TODOS" });
            ViewBag.listaUsuarios = listaUsuarios;
            // return View();
            return View("/Views/Home/index.cshtml");
        }

         public ActionResult ReporteMovimientosMP()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;

            var listaUsuarios = objUsuarios.ListarUsuarios();
            listaUsuarios.Insert(0, new UsuariosCLS { Usser = "TODOS", NombreUsuario = "TODOS" });
            ViewBag.listaUsuarios = listaUsuarios;
            return View();
        }

        public ActionResult ReporteMovimientosPT()
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
        public JsonResult GenerarReporteMP(FiltrosReporte objFiltro)
        {
            var lstReporte = objReporte.GenerarReporteMP(objFiltro);
            var json = Json(new { lstReporte, JsonRequestBehavior.AllowGet });
            json.MaxJsonLength = 50000000;
            return json;
        }

        [HttpPost]
        public JsonResult GenerarReportePT(FiltrosReporte objFiltro)
        {
            var lstReporte = objReporte.GenerarReportePT(objFiltro);
            var json = Json(new { lstReporte, JsonRequestBehavior.AllowGet });
            json.MaxJsonLength = 50000000;
            return json;
        }

    }
}