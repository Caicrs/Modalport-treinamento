using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Reflection;
using System.Xml.Linq;
using TreinamentoFront.Models;
using TreinamentoFront.Models.Auth;



namespace TreinamentoFront.Controllers
{
    public class CadastrosController : Controller
    {

        private List<LoginViewModel> LoginList = new List<LoginViewModel> { };

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
        public bool Login(LoginViewModel model)
        {
            try
            {
                if (string.IsNullOrEmpty(model.Username))
                    throw new Exception("Username is empty!");
                if (string.IsNullOrEmpty(model.Password))
                    throw new Exception("Password is empty!");

                LoginList.Add(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}