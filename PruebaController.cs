using System.Collections.Specialized;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using AngularAspNetCoreSignalR;
using Microsoft.AspNetCore.SignalR;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PruebaAngular4.Controllers
{
  [Route("api/[controller]")]
  public class PruebaController : Controller
  {
    private readonly IHubContext<ChatHub> _context;
    public PruebaController(IHubContext<ChatHub> hubcontext)
    {
      HubContext = hubcontext;
    }

    private IHubContext<ChatHub> HubContext
    {
      get;
      set;
    }
    // GET: /<controller>/ 
    [HttpPost("Get")]
    public ActionResult Get([FromBody] JObject i)
    {
      string nombre = (string)i["nombre"];
      string namber = (string)i["namber"];

       this.HubContext.Clients.All.InvokeAsync("Send", "Hola", i);

      return Json("ok");
    }

    [HttpPost("Insert")]
    public ActionResult Insert([FromBody] JObject i)
    {

      //DbEngine context = HttpContext.RequestServices.GetService(typeof(PruebaAngular4.Utils.DbEngine)) as DbEngine;

      //string json = context.InsertMySQL_JSON("insert into actor(actor_id, first_name, last_name, last_update)  values('203', 'Pepep', 'Sanchis', '2006-02-17 04:34:33')");

      return Json("ok");
    }
  }
}

