using Entidades;
using System.Web.Mvc;

namespace SysMenuApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            UsuariosCLS objUsuarioCLS = new UsuariosCLS();
            objUsuarioCLS = (UsuariosCLS)HttpContext.Session["Usuario"];
            ViewBag.Usuario = objUsuarioCLS;
            return View();
        }
    }
}