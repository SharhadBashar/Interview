using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shoelace
{
    /// <summary>
    /// Campaign Objectives
    /// </summary>
    public enum CampaignObjectives
    {
        LeadGeneration,
        Conversation,
        Impression
    }

    /// <summary>
    /// Template properties
    /// </summary>
    public class TemplateProperties
    {
        public string Name { get; set; }
        public string[] Title { get; set; }
        public string[] AdCopy { get; set; }
        public CampaignObjectives CampaignObjective { get; set; }
    }

    /// <summary>
    /// The templates
    /// </summary>
    public class Templates
    {
        /// <summary>
        /// Dictionary containing the templates. Add new Temaplte here
        /// </summary>
        public static Dictionary<int, TemplateProperties> templates = new Dictionary<int, TemplateProperties>()
        {
            {1, new TemplateProperties{Name = "Single Image Ad", Title = new string[1] {"Default Title"}, AdCopy = new string[1] {"Default Text"}, CampaignObjective = CampaignObjectives.LeadGeneration } },
            {2, new TemplateProperties{Name = "Multi Image Carousel Ad", Title = new string[3] {"Default Title1", "Default Title2", "Default Title3"}, AdCopy = new string[3] {"Default Text1", "Default Text2", "Default Text3"}, CampaignObjective = CampaignObjectives.Conversation } },
            {3, new TemplateProperties{Name = "Multi Image Slider Ad", Title = new string[3] {"Default Title1", "Default Title2", "Default Title3"}, AdCopy = new string[3] {"Default Text1", "Default Text2", "Default Text3"}, CampaignObjective = CampaignObjectives.Impression } }
        };
    }
}
