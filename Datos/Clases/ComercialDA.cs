using Datos.Modelos;
using Entidades;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Datos.Clases
{
    public class ComercialDA
    {
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

        public List<ComercialCLS> GenerarReporteAffidavit()
        {
            List<ComercialCLS> lstReporte = new List<ComercialCLS>();
            using (var db = new EXACTUSEntities())
            {
                
                lstReporte = db.Database.SqlQuery<ComercialCLS>(
                "exec FILASUR.USP_AFFIDAVIT").ToList();
            }
            return lstReporte;
        }

        public List<AuditoriaCLS> GenerarAuditoriaAffidavit(FiltrosComercial objFiltros)
        {
            List<AuditoriaCLS> lstReporte = null;
            using (var db = new EXACTUSEntities())
            {

                lstReporte = db.Database.SqlQuery<AuditoriaCLS>(
                "exec FILASUR.USP_AUDITORIA_AFFIDAVIT @FechaInicio, @FechaFin",
                new SqlParameter("@FechaInicio", objFiltros.Finicio),
                new SqlParameter("@FechaFin", objFiltros.Ffin)).ToList();
            }
            return lstReporte;
        }

        public int GuardarAuditoria(AuditoriaCLS objAuditoriaCLS)
        {
            int CodResult = 0;
            try
            {
                using (var db = new EXACTUSEntities())
                {
                    {
                        XTUS_AUDITORIA_AFFIDAVIT objAuditoria= new XTUS_AUDITORIA_AFFIDAVIT();
                        objAuditoria.CLIENTE = objAuditoriaCLS.Cliente;
                        objAuditoria.PEDIDO = objAuditoriaCLS.Pedido;
                        objAuditoria.FECHA = DateTime.Now;
                        objAuditoria.USUARIO = objAuditoriaCLS.Usuario;
                        objAuditoria.REPORTE = objAuditoriaCLS.Reporte;
                        db.XTUS_AUDITORIA_AFFIDAVIT.Add(objAuditoria);
                        db.SaveChanges();
                        CodResult = 1;
                    }

                }

            }
            catch (Exception ex)
            {

                CodResult = 0;
            }
            return CodResult;
        }
    }
}
