using System.ComponentModel.DataAnnotations;

namespace TreinamentoFront.Models.Auth
{
    public class LoginViewModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
