using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shoelace.Models;
using Shoelace.Repositories;

namespace Shoelace.Services
{
    public class MultiImageSliderAdService : IMultiImageSliderAdService
    {
        private readonly IBaseGraphRepository _repository;
        /// <summary>
        /// Connect to DB
        /// </summary>
        /// <param name="repository"></param>
        public MultiImageSliderAdService(IBaseGraphRepository repository)
        {
            this._repository = repository;
        }

        /// <summary>
        /// Reads the Ad
        /// </summary>
        /// <returns></returns>
        public ActionResult<IEnumerable<MultiImageSliderAd>> ReadAll()
        {
            return this._repository.Read<MultiImageSliderAd>();
        }

        /// <summary>
        /// Creates the ad
        /// </summary>
        /// <param name="multiImageSliderAd"></param>
        /// <returns></returns>
        public async Task<ActionResult<MultiImageSliderAd>> Create(MultiImageSliderAd multiImageSliderAd)
        {
            return this._repository.Create<MultiImageSliderAd>(multiImageSliderAd);
        }

        /// <summary>
        /// Updates the ad
        /// </summary>
        /// <param name="multiImageSliderAd"></param>
        /// <returns></returns>
        public async Task<ActionResult<MultiImageSliderAd>> Update(MultiImageSliderAd multiImageSliderAd)
        {
            return this._repository.Update<MultiImageSliderAd>(multiImageSliderAd);
        }

        /// <summary>
        /// Deletes the ad
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult Delete(Guid id)
        {
            return this._repository.Delete<MultiImageSliderAd>(id);
        }
    }
}
