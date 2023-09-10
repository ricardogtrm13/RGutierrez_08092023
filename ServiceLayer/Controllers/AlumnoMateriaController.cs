using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceLayer.Controllers
{
    [Route("api/alumnomateria")]
    [ApiController]
    public class AlumnoMateriaController : ControllerBase
    {
        // GET api/<AlumnoMateriaController>/5
        [HttpGet]
        [Route("getmaterias/{idAlumno}")]
        public ActionResult GetMaterias(int idAlumno)
        {
            List<object> getMaterias = BussinesLayer.AlumnoMateria.GetMateria(idAlumno);
            if (getMaterias.Count > 0)
            {
                return Ok(getMaterias);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<AlumnoMateriaController>
        [HttpPost]
        [Route("add")]
        public ActionResult Add([FromBody] ModelLayer.AlumnoMateria alumnoMateria)
        {
            int respuesta = BussinesLayer.AlumnoMateria.Add(alumnoMateria);
            if (respuesta > 0)
            {
                return Ok(respuesta);
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE api/<AlumnoMateriaController>/5
        [HttpDelete]
        [Route("delete/{idAlumno},{idMateria}")]
        public ActionResult Delete(int idAlumno,int idMateria)
        {
            int respuesta = BussinesLayer.AlumnoMateria.Delete(idAlumno, idMateria);
            if (respuesta > 0)
            {
                return Ok(respuesta);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("getmateriassinasignar/{idAlumno}")]
        public ActionResult GetMateriasSinAsignar(int idAlumno)
        {
            List<object> getMaterias = BussinesLayer.AlumnoMateria.GetMateriaSinAsignar(idAlumno);
            if (getMaterias.Count > 0)
            {
                return Ok(getMaterias);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
