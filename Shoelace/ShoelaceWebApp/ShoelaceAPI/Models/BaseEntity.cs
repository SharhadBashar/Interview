using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.ComponentModel.DataAnnotations;

namespace Shoelace.Models
{
    public abstract class BaseGraphEntity
    {
        /// <summary>
        /// Every entity in the graph DB has its own Guid
        /// </summary>
        [Required]
        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }

        [JsonIgnore]
        public virtual string Label
        {
            get { return this.GetType().Name.ToLowerInvariant(); }
        }

        public abstract void Load(Guid id, JObject jo);

        /// <summary>
        /// Create an item in the Gremlin DB
        /// </summary>
        /// <param name="includeId"></param>
        /// <returns></returns>
        public string ToGremlinPropertyChain(bool includeId)
        {
            string gremlinPropertyChain = string.Empty;

            dynamic jobj = JObject.FromObject(this);
            ;

            foreach (var item in jobj.Properties())
            {
                if (!includeId && item.Name == "id")
                {
                    continue;
                }

                gremlinPropertyChain += string.Format(".property('{0}', '{1}')", item.Name, item.Value);

            }

            return gremlinPropertyChain;
        }
    }
}
