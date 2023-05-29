using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TreinamentoFront.Models;



namespace TreinamentoFront.Controllers
{
    public class CadastrosController : Controller
    {
        private readonly ILogger<CadastrosController> _logger;

        public CadastrosController(ILogger<CadastrosController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {

            return View();
        }

        public IActionResult ModelosVistoria()
        {
            ViewBag.ItensOptions = Models.ItensOptions.GetItemTypeList();
            ItensOptions model = new ItensOptions
            {
                CustomClass = "custom",
                DropDownCssClass = "customDropDown",
                HobbyList = new List<string>
        {
            "Reading",
            "Painting",
            "Sports",
            "Cooking"
        }
            };
            return View(model);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}