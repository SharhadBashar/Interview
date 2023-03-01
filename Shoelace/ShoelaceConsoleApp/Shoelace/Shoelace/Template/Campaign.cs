using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Shoelace
{
    /// <summary>
    /// Campaign Properties
    /// </summary>
    public class CampaignProperties
    {
        public string Name { get; set; }
        public string Template { get; set; }
        public List<string> AdTitle { get; set; }
        public List<string> AdCopy { get; set; }
        public List<Uri> Image { get; set; }
        public CampaignObjectives CampaignObjective { get; set; }
    }

    /// <summary>
    /// Campaigns
    /// </summary>
    public class Campaign
    {
        /// <summary>
        /// Dictionary for campaigns
        /// </summary>
        public static Dictionary<int, CampaignProperties> campaigns = new Dictionary<int, CampaignProperties>();
    }
}
