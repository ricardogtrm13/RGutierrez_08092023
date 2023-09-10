using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLayer
{
    public class Materia
    {
        public static int Add(ModelLayer.Materia materia)
        {
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    DataLayer.Materium dbMateria = new DataLayer.Materium();
                    dbMateria.IdMateria = materia.IdMateria;
                    dbMateria.Nombre = materia.Nombre;
                    dbMateria.Costo = materia.Costo;

                    conexion.Materia.Add(dbMateria);
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

        public static int Delete(int idMateria)
        {
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    var dbQuery = (from materia in conexion.Materia
                                   where materia.IdMateria == idMateria
                                   select materia).First();

                    conexion.Materia.Remove(dbQuery);
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
            List<object> dbMaterias = null;
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    var dbQuery = (from materia in conexion.Materia
                                   select new
                                   {
                                       IdMateria = materia.IdMateria,
                                       Nombre = materia.Nombre,
                                       Costo = materia.Costo,
                                   });
                    if (dbQuery != null)
                    {
                        dbMaterias = new List<object>();
                        foreach (var item in dbQuery)
                        {
                            ModelLayer.Materia materia = new ModelLayer.Materia();
                            materia.IdMateria = item.IdMateria;
                            materia.Nombre = item.Nombre;
                            materia.Costo = item.Costo.Value;

                            dbMaterias.Add(materia);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return dbMaterias = null;
                throw;
            }
            return dbMaterias;
        }

        public static object GetById(int idMateria)
        {
            object dbMateria = null;
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    var dbQuery = (from materia in conexion.Materia
                                   where materia.IdMateria == idMateria
                                   select new
                                   {
                                       IdMateria = materia.IdMateria,
                                       Nombre = materia.Nombre,
                                       Costo = materia.Costo
                                   }).FirstOrDefault();

                    if (dbQuery != null)
                    {
                        ModelLayer.Materia materia = new ModelLayer.Materia();
                        materia.IdMateria = dbQuery.IdMateria;
                        materia.Nombre = dbQuery.Nombre;
                        materia.Costo = dbQuery.Costo.Value;

                        dbMateria = materia;
                    }
                }
            }
            catch (Exception ex)
            {
                return dbMateria = null;
                throw;
            }
            return dbMateria;
        }

        public static int Update(ModelLayer.Materia materia)
        {
            try
            {
                using (DataLayer.ControlEscolarContext conexion = new DataLayer.ControlEscolarContext())
                {
                    var query = (from dataMateria in conexion.Materia
                                 where dataMateria.IdMateria == materia.IdMateria
                                 select dataMateria).SingleOrDefault();

                    if (query != null)
                    {
                        query.Nombre = materia.Nombre;
                        query.Costo = materia.Costo;

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

    }
}
