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
    public interface IMultiImageSliderAdService
    {
        ActionResult<IEnumerable<MultiImageSliderAd>> ReadAll();
        Task<ActionResult<MultiImageSliderAd>> Create(MultiImageSliderAd multiImageSliderAd);
        Task<ActionResult<MultiImageSliderAd>> Update(MultiImageSliderAd multiImageSliderAd);
        ActionResult Delete(Guid id);
    }
}
