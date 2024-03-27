using System.Collections.Generic;
using Datos.Clases;
using Entidades;

namespace Negocio
{
    public class UsuariosNE
    {
        private static UsuariosDA obj = new UsuariosDA();
        public List<UsuariosCLS> ListarUsuarios()
        {
            return obj.ListarUsuarios();
        }
        public List<CalatogoCLS> CargaInicial()
        {
            return obj.CargaInicial();
        }
        public UsuariosCLS ObtenerDatosUsuario(string usser, string pass)
        {
            return obj.ObtenerDatosUsuario(usser, pass);
        }
    }
}
