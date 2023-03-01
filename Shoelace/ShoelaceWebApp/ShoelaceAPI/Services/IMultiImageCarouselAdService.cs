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
    public interface IMultiImageCarouselAdService
    {
        ActionResult<IEnumerable<MultiImageCarouselAd>> ReadAll();
        Task<ActionResult<MultiImageCarouselAd>> Create(MultiImageCarouselAd multiImageCarouselAd);
        Task<ActionResult<MultiImageCarouselAd>> Update(MultiImageCarouselAd multiImageCarouselAd);
        ActionResult Delete(Guid id);
    }
}
