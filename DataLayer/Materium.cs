using System;
using System.Collections.Generic;

namespace DataLayer;

public partial class Materium
{
    public int IdMateria { get; set; }

    public string Nombre { get; set; } = null!;

    public decimal? Costo { get; set; }

    public virtual ICollection<AlumnoMaterium> AlumnoMateria { get; set; } = new List<AlumnoMaterium>();
}
