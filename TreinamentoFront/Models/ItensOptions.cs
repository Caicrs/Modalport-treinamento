namespace TreinamentoFront.Models
{
    public class ItensOptions
    {
        // Define your GetCities method here
        public static List<string> GetItemTypeList()
        {
            // Perform logic to retrieve the list of cities
            // For demonstration purposes, let's return a sample list of cities
            List<string> typesList = new List<string>
        {
            "1 - Foto",
            "2 - Texto",
            "3 - Multipla escolha",
            "4 - Numérico",
            "5 - Assinatura",
            "6 - Única Escolha"
        };

            return typesList;
        }

        public string CustomClass { get; set; }
        public string DropDownCssClass { get; set; }
        public List<string> HobbyList { get; set; }
    }
}
