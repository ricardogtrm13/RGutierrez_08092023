using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLayer
{
    public class AlumnoMateria
    {
        public static int Add(ModelLayer.AlumnoMateria alumnoMateria)
        {
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    DataLayer.AlumnoMaterium dbAlumnoMateria = new DataLayer.AlumnoMaterium();
                    dbAlumnoMateria.IdMateria = alumnoMateria.Materia.IdMateria;
                    dbAlumnoMateria.IdAlumno = alumnoMateria.Alumno.IdAlumno;

                    conexion.AlumnoMateria.Add(dbAlumnoMateria);
                    conexion.SaveChanges();
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
                throw;
            }
        }

        public static int Delete(int idAlumno, int idMateria)
        {
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    var dbQuery = (from alumnoMateria in conexion.AlumnoMateria
                                   where alumnoMateria.IdAlumno == idAlumno
                                   && alumnoMateria.IdMateria == idMateria
                                   select alumnoMateria).First();

                    conexion.AlumnoMateria.Remove(dbQuery);
                    conexion.SaveChanges();
                }
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
                throw;
            }
        }

        public static List<object> GetMateria(int idAlumno)
        {
            List<object> dbAlumnoMaterias = null;
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    var dbQuery = (from alumnoMateria in conexion.AlumnoMateria
                                   join materia in conexion.Materia on alumnoMateria.IdMateria equals materia.IdMateria
                                   where alumnoMateria.IdAlumno == idAlumno
                                   select new
                                   {
                                       IdAlumnoMateria = alumnoMateria.IdAlumnoMateria,
                                       IdMateria = materia.IdMateria,
                                       Nombre = materia.Nombre,
                                       Costo = materia.Costo,
                                   });
                    if (dbQuery != null)
                    {
                        dbAlumnoMaterias = new List<object>();
                        foreach (var item in dbQuery)
                        {
                            ModelLayer.AlumnoMateria alumnoMateria = new ModelLayer.AlumnoMateria();
                            alumnoMateria.IdAlumnoMateria = item.IdMateria;
                            alumnoMateria.Materia = new ModelLayer.Materia();
                            alumnoMateria.Materia.IdMateria = item.IdMateria;
                            alumnoMateria.Materia.Nombre = item.Nombre;
                            alumnoMateria.Materia.Costo = item.Costo.Value;

                            dbAlumnoMaterias.Add(alumnoMateria);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return dbAlumnoMaterias = null;
                throw;
            }
            return dbAlumnoMaterias;
        }

        public static List<object> GetMateriaSinAsignar(int idAlumno)
        {
            List<object> dbAlumnoMaterias = null;
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    var dbQuery = from materia in conexion.Materia
                                  where !conexion.AlumnoMateria
                                        .Where(am => am.IdAlumno == idAlumno)
                                        .Select(am => am.IdMateria)
                                        .Contains(materia.IdMateria)
                                  select new
                                  {
                                      materia.IdMateria,
                                      materia.Nombre,
                                      materia.Costo
                                  };
                    if (dbQuery != null)
                    {
                        dbAlumnoMaterias = new List<object>();
                        foreach (var item in dbQuery)
                        {
                            ModelLayer.AlumnoMateria alumnoMateria = new ModelLayer.AlumnoMateria();
                            alumnoMateria.IdAlumnoMateria = item.IdMateria;
                            alumnoMateria.Materia = new ModelLayer.Materia();
                            alumnoMateria.Materia.IdMateria = item.IdMateria;
                            alumnoMateria.Materia.Nombre = item.Nombre;
                            alumnoMateria.Materia.Costo = item.Costo.Value;

                            dbAlumnoMaterias.Add(alumnoMateria);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return dbAlumnoMaterias = null;
                throw;
            }
            return dbAlumnoMaterias;
        }
    }
}
