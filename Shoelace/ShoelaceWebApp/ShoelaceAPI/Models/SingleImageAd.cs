using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using Shoelace.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Shoelace.Models
{
    /// <summary>
    /// Model for Single Image Ad
    /// </summary>
    public class SingleImageAd : BaseGraphEntity
    {
        public SingleImageAd() { }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "template")]
        public string Template { get; set; }

        [JsonProperty(PropertyName = "adTitle")]
        public string AdTitle { get; set; }

        [JsonProperty(PropertyName = "adCopy")]
        public string AdCopy { get; set; }

        [JsonProperty(PropertyName = "image")]
        public Uri Image { get; set; }

        [JsonProperty(PropertyName = "campaignObjective")]
        public CampaignObjectives CampaignObjective { get; set; }

        public override void Load(Guid id, JObject jo)
        {
            this.Id = id;
            this.Name = (string)jo["name"][0]["value"];
            this.Template = (string)jo["template"][0]["value"];
            this.AdTitle = (string)jo["adTitle"][0]["value"];
            this.AdCopy = (string)jo["adCopy"][0]["value"];
            this.Image = (Uri)jo["image"][0]["value"];
            this.CampaignObjective = (CampaignObjectives)((int)jo["campaignObjective"][0]["value"]);
        }
    }
}
