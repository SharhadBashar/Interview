using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shoelace.Models;
using Shoelace.Repositories;

namespace Shoelace.Services
{
    public class MultiImageCarouselAdService : IMultiImageCarouselAdService
    {
        private readonly IBaseGraphRepository _repository;
        /// <summary>
        /// Connect to Db
        /// </summary>
        /// <param name="repository"></param>
        public MultiImageCarouselAdService(IBaseGraphRepository repository)
        {
            this._repository = repository;
        }

        /// <summary>
        /// Reads the ad
        /// </summary>
        /// <returns></returns>
        public ActionResult<IEnumerable<MultiImageCarouselAd>> ReadAll()
        {
            return this._repository.Read<MultiImageCarouselAd>();
        }

        /// <summary>
        /// Creates the ad
        /// </summary>
        /// <param name="multiImageCarouselAd"></param>
        /// <returns></returns>
        public async Task<ActionResult<MultiImageCarouselAd>> Create(MultiImageCarouselAd multiImageCarouselAd)
        {
            return this._repository.Create<MultiImageCarouselAd>(multiImageCarouselAd);
        }

        /// <summary>
        /// Updates the ad
        /// </summary>
        /// <param name="multiImageCarouselAd"></param>
        /// <returns></returns>
        public async Task<ActionResult<MultiImageCarouselAd>> Update(MultiImageCarouselAd multiImageCarouselAd)
        {
            return this._repository.Update<MultiImageCarouselAd>(multiImageCarouselAd);
        }

        /// <summary>
        /// Deletes the ad
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult Delete(Guid id)
        {
            return this._repository.Delete<MultiImageCarouselAd>(id);
        }
    }
}
