using Entidades;
using System.Collections.Generic;
using System.Linq;
using Datos.Modelos;


namespace Datos.Clases
{
    public class UsuariosDA
    {
        public List<UsuariosCLS> ListarUsuarios()
        {
            List<UsuariosCLS> lstUsuarios = null;
            using (var db = new EXACTUSEntities())
            {
                lstUsuarios = db.Database.SqlQuery<UsuariosCLS>("FILASUR.Usp_ListarUsuarios").ToList();
            }
            return lstUsuarios;
        }

        public List<CalatogoCLS> CargaInicial()
        {
            List<CalatogoCLS> lstCatalogo = null;
            using (var db = new EXACTUSEntities())
            {
                lstCatalogo = (from catalogo in db.XTUS_DatoGeneralDetalle
                               where catalogo.Habilitado == true && catalogo.DatoGeneralId == 1
                               select new CalatogoCLS
                               {
                                   IdItem = catalogo.DatoGeneralDetalleId,
                                   ValorItem = catalogo.ValorTabla.ToString(),
                                   NombreItem = catalogo.Descripcion,
                                   IdTabla = (int)catalogo.DatoGeneralId
                               }).ToList();
                return lstCatalogo;
            }
        }

        public UsuariosCLS ObtenerDatosUsuario(string usser, string pass)
        {
            UsuariosCLS objUsuariosCLS = new UsuariosCLS();
            using (var db = new EXACTUSEntities())
            {
                XTUS_USUARIO oUsuario = db.XTUS_USUARIO.Where(p => p.Usser.ToUpper().Trim() == usser.ToUpper().Trim() && p.Password == pass).SingleOrDefault();

                if (oUsuario != null)
                {
                    objUsuariosCLS.IdUsuario = oUsuario.IdUsuario;
                    objUsuariosCLS.NombreUsuario = oUsuario.NombreUsuario;
                    objUsuariosCLS.ApPaternoUsuario = oUsuario.ApPaternoUsuario;
                    objUsuariosCLS.ApMaternoUsuario = oUsuario.ApMaternoUsuario;
                    objUsuariosCLS.EmailUsuario = oUsuario.EmailUsuario;
                    objUsuariosCLS.TelefonoUsuario = oUsuario.TelefonoUsuario;
                    objUsuariosCLS.Usser = oUsuario.Usser;
                    objUsuariosCLS.IdRol = oUsuario.IdRol;
                }
            }
            return objUsuariosCLS;
        }
        public bool validarUsuario(string nombreUsuario)
        {
            List<UsuariosCLS> lstUsuario = null;
            bool rpta = true;
            using (var db = new EXACTUSEntities())
            {
                lstUsuario = (from usu in db.XTUS_USUARIO
                              where usu.EstadoEliminacion == false && usu.EstadoUsuario == true && usu.Usser.ToUpper().Equals(nombreUsuario.ToUpper())
                              select new UsuariosCLS
                              {
                                  IdRol = usu.IdUsuario

                              }).ToList();

                if (lstUsuario.Count > 0)
                {
                    rpta = false;
                }
            }
            return rpta;
        }

        

    }
}
