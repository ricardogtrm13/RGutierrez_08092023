using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLayer
{
    public class Alumno
    {
        public static int Add(ModelLayer.Alumno alumno)
        {
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    DataLayer.Alumno dbAlumno = new DataLayer.Alumno();
                    dbAlumno.IdAlumno = alumno.IdAlumno;
                    dbAlumno.Nombre = alumno.Nombre;
                    dbAlumno.ApellidoPaterno = alumno.ApellidoPaterno;
                    dbAlumno.ApellidoMaterno = alumno.ApellidoMaterno;

                    conexion.Alumnos.Add(dbAlumno);
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

        public static int Delete(int idAlumno)
        {
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    var dbQuery = (from alumno in conexion.Alumnos
                                   where alumno.IdAlumno == idAlumno
                                   select alumno).First();

                    conexion.Alumnos.Remove(dbQuery);
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

        public static List<object> GetAll()
        {
            List<object> dbAlumnos = null;
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    var dbQuery = (from alumno in conexion.Alumnos
                                   select new
                                   {
                                       IdAlumno = alumno.IdAlumno,
                                       Nombre = alumno.Nombre,
                                       ApellidoPaterno = alumno.ApellidoPaterno,
                                       ApellidoMaterno = alumno.ApellidoMaterno
                                   });
                    if (dbQuery != null)
                    {
                        dbAlumnos = new List<object>();
                        foreach (var item in dbQuery)
                        {
                            ModelLayer.Alumno alumno = new ModelLayer.Alumno();
                            alumno.IdAlumno = item.IdAlumno;
                            alumno.Nombre = item.Nombre;
                            alumno.ApellidoPaterno = item.ApellidoPaterno;
                            alumno.ApellidoMaterno = item.ApellidoMaterno;

                            dbAlumnos.Add(alumno);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return dbAlumnos;
                throw;
            }
            return dbAlumnos;
        }

        public static object GetById(int idAlumno)
        {
            object dbAlumno = null;
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    var dbQuery = (from alumno in conexion.Alumnos
                                   where alumno.IdAlumno == idAlumno
                                   select new
                                   {
                                       IdAlumno = alumno.IdAlumno,
                                       Nombre = alumno.Nombre,
                                       ApellidoPaterno = alumno.ApellidoPaterno,
                                       ApellidoMaterno = alumno.ApellidoMaterno
                                   }).FirstOrDefault();

                    if (dbQuery != null)
                    {
                        ModelLayer.Alumno alumno = new ModelLayer.Alumno();
                        alumno.IdAlumno = dbQuery.IdAlumno;
                        alumno.Nombre = dbQuery.Nombre;
                        alumno.ApellidoPaterno = dbQuery.ApellidoPaterno;
                        alumno.ApellidoMaterno = dbQuery.ApellidoMaterno;

                        dbAlumno = alumno;
                    }
                }
            }
            catch (Exception ex)
            {
                return dbAlumno;
                throw;
            }
            return dbAlumno;
        }

        public static int Update(ModelLayer.Alumno alumno)
        {
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    var query = (from dataAlumno in conexion.Alumnos
                                 where dataAlumno.IdAlumno == alumno.IdAlumno
                                 select dataAlumno).SingleOrDefault();

                    if (query != null)
                    {
                        query.Nombre = alumno.Nombre;
                        query.ApellidoPaterno = alumno.ApellidoPaterno;
                        query.ApellidoMaterno = alumno.ApellidoMaterno;

                        conexion.SaveChanges();

                        return 1;
                    }
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
                throw;
            }
        }

        public static object GetByNombre(string nombre)
        {
            object dbAlumno = null;
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    var dbQuery = (from alumno in conexion.Alumnos
                                   where alumno.Nombre == nombre
                                   select new
                                   {
                                       IdAlumno = alumno.IdAlumno,
                                       Nombre = alumno.Nombre,
                                       ApellidoPaterno = alumno.ApellidoPaterno,
                                       ApellidoMaterno = alumno.ApellidoMaterno
                                   }).FirstOrDefault();

                    if (dbQuery != null)
                    {
                        ModelLayer.Alumno alumno = new ModelLayer.Alumno();
                        alumno.IdAlumno = dbQuery.IdAlumno;
                        alumno.Nombre = dbQuery.Nombre;
                        alumno.ApellidoPaterno = dbQuery.ApellidoPaterno;
                        alumno.ApellidoMaterno = dbQuery.ApellidoMaterno;

                        dbAlumno = alumno;
                    }
                }
            }
            catch (Exception ex)
            {
                return dbAlumno;
                throw;
            }
            return dbAlumno;
        }
    }
}
