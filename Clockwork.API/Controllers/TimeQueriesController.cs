using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Clockwork.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Clockwork.API.Controllers
{
    //[Produces("application/json")]
    [Route("api/TimeQueries")]
    public class TimeQueriesController : Controller
    {
        // GET: api/TimeQueries
        [HttpGet]
        public IActionResult GetTimeQueries()
        {
            List<CurrentTimeQuery> timeQueries = new List<CurrentTimeQuery>();
            using (var db = new ClockworkContext())
            {
                var query = db.CurrentTimeQueries;
                foreach (CurrentTimeQuery timeQuery in query)
                {
                    timeQueries.Add(timeQuery);
                }
            }

            return Ok(timeQueries);
        }

    }
}
