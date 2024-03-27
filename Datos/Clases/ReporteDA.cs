using Entidades;
using System.Collections.Generic;
using System.Linq;
using Datos.Modelos;
using System.Data.SqlClient;

namespace Datos.Clases
{
    public class ReporteDA
    {
        public List<MovimientosMPCLS> GenerarReporteMP(FiltrosReporte objFiltros)
         {
            List<MovimientosMPCLS> lstReporte = new List<MovimientosMPCLS>();
            using (var db = new EXACTUSEntities())
            {
                lstReporte = db.Database.SqlQuery<MovimientosMPCLS>(
                "exec FILASUR.XTUS_PA_COSTOMOVIMIENTOS_LISTAR_MOVIMIENTOS_MP_T @P_FECHA_INICIAL, @P_FECHA_FINAL",
                new SqlParameter("@P_FECHA_INICIAL", objFiltros.Finicio),
                new SqlParameter("@P_FECHA_FINAL", objFiltros.Ffin)).ToList();
            }
            return lstReporte;
        }

        public List<MovimientosMPCLS> GenerarReportePT(FiltrosReporte objFiltros)
        {
            List<MovimientosMPCLS> lstReporte = new List<MovimientosMPCLS>();
            using (var db = new EXACTUSEntities())
            {
                lstReporte = db.Database.SqlQuery<MovimientosMPCLS>(
                "exec FILASUR.XTUS_PA_COSTOMOVIMIENTOS_LISTAR_MOVIMIENTOS_PT_NEW @P_FECHA_INICIAL, @P_FECHA_FINAL",
                new SqlParameter("@P_FECHA_INICIAL", objFiltros.Finicio),
                new SqlParameter("@P_FECHA_FINAL", objFiltros.Ffin)).ToList();
            }
            return lstReporte;
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
    }
}
