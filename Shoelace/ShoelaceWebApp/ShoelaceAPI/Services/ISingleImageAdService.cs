using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shoelace.Models;

namespace Shoelace.Services
{
    /// <summary>
    /// Interface for the methods
    /// </summary>
    public interface ISingleImageAdService
    {
        ActionResult<IEnumerable<SingleImageAd>> ReadAll();
        Task<ActionResult<SingleImageAd>> Create(SingleImageAd singleImageAd);
        Task<ActionResult<SingleImageAd>> Update(SingleImageAd singleImageAd);
        ActionResult Delete(Guid id);
    }
}
