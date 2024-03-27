using Datos.Clases;
using Entidades;
using System.Collections.Generic;

namespace Negocio
{
    public class ComercialNE
    {
        ComercialDA obj = new ComercialDA();
        public List<CalatogoCLS> CargaInicial()
        {
            return obj.CargaInicial();
        }
        public List<ComercialCLS> GenerarReporteAffidavit()
        {
            return obj.GenerarReporteAffidavit();
        }

        public List<AuditoriaCLS> GenerarAuditoriaAffidavit(FiltrosComercial objFiltros)
        {
            return obj.GenerarAuditoriaAffidavit(objFiltros);
        }

        public int GuardarAuditoria(AuditoriaCLS objAuditoriaCLS)
        {
            return obj.GuardarAuditoria(objAuditoriaCLS);
        }
    }
    
}
