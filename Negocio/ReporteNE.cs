using Datos.Clases;
using Entidades;
using System.Collections.Generic;

namespace Negocio
{
    public class ReporteNE
    {
        ReporteDA obj = new ReporteDA();
        public List<MovimientosMPCLS> GenerarReporteMP(FiltrosReporte objFiltros)
        {
            return obj.GenerarReporteMP(objFiltros);
        }

        public List<MovimientosMPCLS> GenerarReportePT(FiltrosReporte objFiltros)
        {
            return obj.GenerarReportePT(objFiltros);
        }

        public List<CalatogoCLS> CargaInicial()
        {
            return obj.CargaInicial();
        }
    }
}
