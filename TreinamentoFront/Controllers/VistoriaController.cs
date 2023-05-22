using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TreinamentoFront.Models;

namespace TreinamentoFront.Controllers
{
    public class VistoriaController : Controller
    {
        private readonly ILogger<VistoriaController> _logger;

        public VistoriaController(ILogger<VistoriaController> logger)
        {
            _logger = logger;
        }

        public IActionResult Create()
        {
            ViewData["Message"] = "Your application create page.";
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}