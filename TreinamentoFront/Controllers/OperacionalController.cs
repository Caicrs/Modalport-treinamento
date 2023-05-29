using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TreinamentoFront.Models;

namespace TreinamentoFront.Controllers
{
    public class OperacionalController : Controller
    {
        private readonly ILogger<OperacionalController> _logger;

        public OperacionalController(ILogger<OperacionalController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ConsultaVistorias()
        {
            return View();
        }

        public IActionResult RealizarVistoria()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}