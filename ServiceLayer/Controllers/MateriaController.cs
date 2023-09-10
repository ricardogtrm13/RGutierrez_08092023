using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServiceLayer.Controllers
{
    [Route("api/materia")]
    [ApiController]
    public class MateriaController : ControllerBase
    {
        // GET: api/<MateriaController>
        [HttpGet]
        [Route("getall")]
        public ActionResult GetAll()
        {
            List<object> getMaterias = BussinesLayer.Materia.GetAll();
            if (getMaterias.Count > 0)
            {
                return Ok(getMaterias);
            }
            else
            {
                return NotFound();
            }
        }

        // GET api/<MateriaController>/5
        [HttpGet]
        [Route("getbyid/{idMateria}")]
        public ActionResult GetById(int idMateria)
        {
            object materia = BussinesLayer.Materia.GetById(idMateria);
            if (materia != null)
            {
                return Ok(materia);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<MateriaController>
        [HttpPost]
        [Route("add")]
        public ActionResult Add([FromBody] ModelLayer.Materia materia)
        {
            int respuesta = BussinesLayer.Materia.Add(materia);
            if (respuesta > 0)
            {
                return Ok(respuesta);
            }
            else
            {
                return NotFound();
            }
        }

        // PUT api/<MateriaController>/5
        [HttpPut]
        [Route("update")]
        public ActionResult Update([FromBody] ModelLayer.Materia materia)
        {
            int respuesta = BussinesLayer.Materia.Update(materia);
            if (respuesta > 0)
            {
                return Ok(respuesta);
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE api/<MateriaController>/5
        [HttpDelete]
        [Route("delete/{idMateria}")]
        public ActionResult Delete(int idMateria)
        {
            int respuesta = BussinesLayer.Materia.Delete(idMateria);
            if (respuesta > 0)
            {
                return Ok(respuesta);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
