//------------------------------------------------------------------------------
// <auto-generated>
//    Este código se generó a partir de una plantilla.
//
//    Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//    Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Datos.Modelos
{
    using System;
    using System.Collections.Generic;
    
    public partial class XTUS_DatoGeneral
    {
        public int DatoGeneralId { get; set; }
        public string Dominio { get; set; }
        public string Descripcion { get; set; }
        public Nullable<bool> PuedeCrecer { get; set; }
        public Nullable<bool> Habilitado { get; set; }
        public string UsuarioRegistra { get; set; }
        public Nullable<System.DateTime> FechaRegistra { get; set; }
        public string UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModifica { get; set; }
    }
}
