using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Shoelace.Repositories;
using Shoelace.Models;

namespace Shoelace.Services
{
    public class SingleImageAdService : ISingleImageAdService
    {
        private readonly IBaseGraphRepository _repository;
        /// <summary>
        /// Connect to Db
        /// </summary>
        /// <param name="repository"></param>
        public SingleImageAdService(IBaseGraphRepository repository)
        {
            this._repository = repository;
        }

        /// <summary>
        /// Reads the ad
        /// </summary>
        /// <returns></returns>
        public ActionResult<IEnumerable<SingleImageAd>> ReadAll()
        {
            return this._repository.Read<SingleImageAd>();
        }

        /// <summary>
        /// Creates the ad
        /// </summary>
        /// <param name="singleImageAd"></param>
        /// <returns></returns>
        public async Task<ActionResult<SingleImageAd>> Create(SingleImageAd singleImageAd)
        {
            return this._repository.Create<SingleImageAd>(singleImageAd);
        }

        /// <summary>
        /// Updates the Ad
        /// </summary>
        /// <param name="singleImageAd"></param>
        /// <returns></returns>
        public async Task<ActionResult<SingleImageAd>> Update(SingleImageAd singleImageAd)
        {
            return this._repository.Update<SingleImageAd>(singleImageAd);
        }

        /// <summary>
        /// Deletes the ad
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult Delete(Guid id)
        {
            return this._repository.Delete<SingleImageAd>(id);
        }
    }
}
