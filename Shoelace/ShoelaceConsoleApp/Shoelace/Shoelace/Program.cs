using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;


namespace Shoelace
{
    class Program
    {
        /// <summary>
        /// Main method. Taks all the user inputs and creates the campaign
        /// </summary>
        /// <param name="args"></param>
        static void Main(string[] args)
        {
            string campaignTemplate = "";
            List<string> campaignAdTitle = new List<string>();
            List<string> campaignAdCopy = new List<string>();
            List<Uri> campaignImage = new List<Uri>();
            CampaignObjectives campaignObjective = new CampaignObjectives();

            Dictionary<int, TemplateProperties> templates = Templates.templates;
            Dictionary<int, CampaignProperties> campaigns = Campaign.campaigns;
            int campaignsOnFile = GetCampaigns();

            Console.WriteLine("Hello, please select a Template from the following list for your Campaign:");

            for (int i = 1; i <= templates.Count; i++)
            {
                Console.WriteLine(i + ". " + templates[i].Name);
            }
            int templateNum = 0;
            bool templateSelected = false;
            while (!templateSelected)
            {
                templateNum = Convert.ToInt32(Console.ReadLine());
                if (templateNum > 0 && templateNum <= templates.Count)
                {
                    templateSelected = true;
                    campaignTemplate = templates[templateNum].Name;
                    campaignObjective = templates[templateNum].CampaignObjective;
                    break;
                }
                Console.WriteLine("Template does not exist. Please try again");
            }
            Console.WriteLine(String.Format("You picked {0}", templates[templateNum].Name));
            
            Console.WriteLine("Please enter the Ad Title(s):");
            for (int i = 0; i < templates[templateNum].Title.Count(); i++)
            {
                Console.Write((i+1) + ": ");
                campaignAdTitle.Add(Console.ReadLine());
            }

            Console.WriteLine("Please enter the Ad Copy(s):");
            for (int i = 0; i < templates[templateNum].AdCopy.Count(); i++)
            {
                Console.Write((i+1) + ": ");
                campaignAdCopy.Add(Console.ReadLine());
            }

            Console.WriteLine("Please enter the Ad Image(s):");
            for (int i = 0; i < templates[templateNum].Title.Count(); i++)
            {
                Console.Write((i+1) + ": ");
                campaignImage.Add(new Uri(Console.ReadLine()));
            }
            Campaign.campaigns.Add(campaignsOnFile + 1, new CampaignProperties { Name = "Campaign " + (campaignsOnFile + 1),
                                                                                 Template = campaignTemplate,
                                                                                 AdTitle = campaignAdTitle,
                                                                                 AdCopy = campaignAdCopy,
                                                                                 Image = campaignImage,
                                                                                 CampaignObjective = campaignObjective});

            bool isDone = writeCampaigns(campaigns);
            if (isDone)
            {
                Console.WriteLine("Campaign written to file: ");
                Console.WriteLine("[ID: {0}, Name: {1}, Template: {2}, Ad Title: {3}, Ad Copy: {4}, Image: {5}, Campaign Objective: {6}]", campaigns.Keys.First(),
                                                                                                                                  campaigns[campaigns.Keys.First()].Name,
                                                                                                                                  string.Join(",", campaigns[campaigns.Keys.First()].Template),
                                                                                                                                  string.Join(",", campaigns[campaigns.Keys.First()].AdTitle),
                                                                                                                                  string.Join(",", campaigns[campaigns.Keys.First()].AdCopy),
                                                                                                                                  string.Join(",", campaigns[campaigns.Keys.First()].Image),
                                                                                                                                  campaigns[campaigns.Keys.First()].CampaignObjective);
            }
            Console.ReadLine();
        }

        /// <summary>
        /// Saves Campaign to file
        /// </summary>
        /// <param name="campaigns"></param>
        /// <returns></returns>
        public static bool writeCampaigns(Dictionary<int, CampaignProperties> campaigns)
        {
            string exePath = System.IO.Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            using (StreamWriter file = new StreamWriter(string.Format(@"{0}\Campaigns.txt",exePath), true))
                
            file.WriteLine("[ID: {0}, Name: {1}, Template: {2}, Ad Title: {3}, Ad Copy: {4}, Image: {5}, Campaign Objective: {6}]", campaigns.Keys.First(),
                                                                                                                                  campaigns[campaigns.Keys.First()].Name,
                                                                                                                                  string.Join(",", campaigns[campaigns.Keys.First()].Template),
                                                                                                                                  string.Join(",", campaigns[campaigns.Keys.First()].AdTitle),
                                                                                                                                  string.Join(",", campaigns[campaigns.Keys.First()].AdCopy),
                                                                                                                                  string.Join(",", campaigns[campaigns.Keys.First()].Image),
                                                                                                                                  campaigns[campaigns.Keys.First()].CampaignObjective);
            return true;
        }

        /// <summary>
        /// REads the campaign file.
        /// </summary>
        /// <returns></returns>
        public static int GetCampaigns()
        {
            string exePath = System.IO.Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            string path = string.Format(@"{0}\Campaigns.txt",exePath);
            try
            {
                string[] lines = System.IO.File.ReadAllLines(path);
                return lines.Length;
            }
            catch (FileNotFoundException)
            {
                var myFile = File.Create(path);
                myFile.Close();
                return 0;
            }
        }
    }
}
