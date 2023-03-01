using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Shoelace.Models;
using Newtonsoft.Json.Linq;

namespace Shoelace.Models
{
    /// <summary>
    /// Model for Multi Image Caraosel Ad
    /// </summary>
    public class MultiImageCarouselAd : BaseGraphEntity
    {
        public MultiImageCarouselAd() { }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "template")]
        public string Template { get; set; }

        [JsonProperty(PropertyName = "adTitle_1")]
        public string AdTitle_1 { get; set; }
        [JsonProperty(PropertyName = "adTitle_2")]
        public string AdTitle_2 { get; set; }
        [JsonProperty(PropertyName = "adTitle_3")]
        public string AdTitle_3 { get; set; }

        [JsonProperty(PropertyName = "adCopy_1")]
        public string AdCopy_1 { get; set; }
        [JsonProperty(PropertyName = "adCopy_2")]
        public string AdCopy_2 { get; set; }
        [JsonProperty(PropertyName = "adCopy_3")]
        public string AdCopy_3 { get; set; }

        [JsonProperty(PropertyName = "image_1")]
        public Uri Image_1 { get; set; }
        [JsonProperty(PropertyName = "image_2")]
        public Uri Image_2 { get; set; }
        [JsonProperty(PropertyName = "image_3")]
        public Uri Image_3 { get; set; }

        [JsonProperty(PropertyName = "campaignObjective")]
        public CampaignObjectives CampaignObjective { get; set; }

        public override void Load(Guid id, JObject jo)
        {
            this.Id = id;
            this.Name = (string)jo["name"][0]["value"];
            this.Template = (string)jo["template"][0]["value"];

            this.AdTitle_1 = (string)jo["adTitle_1"][0]["value"];
            this.AdTitle_2 = (string)jo["adTitle_2"][0]["value"];
            this.AdTitle_3 = (string)jo["adTitle_3"][0]["value"];

            this.AdCopy_1 = (string)jo["adCopy_1"][0]["value"];
            this.AdCopy_2 = (string)jo["adCopy_2"][0]["value"];
            this.AdCopy_3 = (string)jo["adCopy_3"][0]["value"];

            this.Image_1 = (Uri)jo["image_1"][0]["value"];
            this.Image_2 = (Uri)jo["image_2"][0]["value"];
            this.Image_3 = (Uri)jo["image_3"][0]["value"];

            this.CampaignObjective = (CampaignObjectives)((int)jo["campaignObjective"][0]["value"]);
        }
    }
}
