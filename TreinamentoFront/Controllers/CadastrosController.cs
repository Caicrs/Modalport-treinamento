using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Reflection;
using System.Xml.Linq;
using TreinamentoFront.Models;



namespace TreinamentoFront.Controllers
{
    public class CadastrosController : Controller
    {
        private static HttpClient _CLIENT;
        public void RequestSender()
        {
            if (_CLIENT == null)
            {
                _CLIENT = new HttpClient();
                _CLIENT.BaseAddress = new Uri("http://example.com/api/");
            }
        }

        private readonly ILogger<CadastrosController> _logger;

        public CadastrosController(ILogger<CadastrosController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            Console.WriteLine("DROP-2 >>>>>>>>>>");
            return View();
        }

        public IActionResult Processos()
        {
            return View();
        }


        public IActionResult ModelosVistoria()
        {
            Console.WriteLine("DROP-3 >>>>>>>>>>");
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

        // Action method for handling the login form submission
        [HttpPost]
        public async Task<IActionResult> Login(string username, string password)
        {
            ViewBag.Message = "DROP-4 >>>>>>>>>>";
            if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
            {
                return ModelosVistoria();
            }
            else
            {
                return View("Index");
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}