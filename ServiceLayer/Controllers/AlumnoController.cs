using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceLayer.Controllers
{
    [Route("api/alumno")]
    [ApiController]
    public class AlumnoController : ControllerBase
    {
        // GET: api/<AlumnoController>
        [HttpGet]
        [Route("getall")]
        public ActionResult GetAll()
        {
            List<object> getAlumnos = BussinesLayer.Alumno.GetAll();
            if (getAlumnos.Count > 0 )
            {
                return Ok(getAlumnos);
            }
            else
            {
                return NotFound();
            }
        }

        // GET api/<AlumnoController>/5
        [HttpGet]
        [Route("getbyid/{idAlumno}")]
        public ActionResult GetById(int idAlumno)
        {
            object respuesta = BussinesLayer.Alumno.GetById(idAlumno);
            if (respuesta != null)
            {
                return Ok(respuesta);
            }
            else
            {
                return NotFound();
            }
        }
        
        [HttpGet]
        [Route("getbynombre/{nombre}")]
        public ActionResult GetByNombre(string nombre)
        {
            object respuesta = BussinesLayer.Alumno.GetByNombre(nombre);
            if (respuesta != null)
            {
                return Ok(respuesta);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<AlumnoController>
        [HttpPost]
        [Route("add")]
        public ActionResult Add([FromBody] ModelLayer.Alumno alumno)
        {
            int respuesta = BussinesLayer.Alumno.Add(alumno);
            if (respuesta > 0)
            {
                return Ok(respuesta);
            }
            else
            {
                return NotFound();
            }
        }

        // PUT api/<AlumnoController>/5
        [HttpPut]
        [Route("update")]
        public ActionResult Update([FromBody] ModelLayer.Alumno alumno)
        {
            int respuesta = BussinesLayer.Alumno.Update(alumno);
            if (respuesta > 0)
            {
                return Ok(respuesta);
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE api/<AlumnoController>/5
        [HttpDelete]
        [Route("delete/{idAlumno}")]
        public ActionResult Delete(int idAlumno)
        {
            int resupuesta = BussinesLayer.Alumno.Delete(idAlumno);
            if (resupuesta > 0)
            {
                return Ok(resupuesta);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
