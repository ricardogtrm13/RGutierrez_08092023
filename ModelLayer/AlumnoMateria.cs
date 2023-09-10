using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLayer
{
    public class AlumnoMateria
    {
        public int IdAlumnoMateria { get; set; }
        public ModelLayer.Alumno Alumno { get; set; }
        public ModelLayer.Materia Materia { get; set; }
        public List<object>? AlumnosMaterias { get; set; }

    }
}
