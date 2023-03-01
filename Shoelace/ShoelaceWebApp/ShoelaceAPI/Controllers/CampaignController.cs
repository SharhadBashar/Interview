using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Gremlin.Net.Process.Traversal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shoelace.Models;
using Shoelace.Repositories;
using Shoelace.Services;

namespace Shoelace.Controllers
{
    /// <summary>
    /// The Controller for manupulating Campaigns
    /// </summary>
    [ApiController]
    [Produces("application/json")]
    [Route("/api/[controller]")]
    public class CampaignController : Controller
    {
        private readonly IBaseGraphRepository _baseGraphRepository;
        private readonly ISingleImageAdService _singleImageAdService;
        private readonly IMultiImageCarouselAdService _multiImageCarouselAdService;
        private readonly IMultiImageSliderAdService _multiImageSliderAdService;

        /// <summary>
        /// Gets the services for the templates and database
        /// </summary>
        /// <param name="baseGraphRepository"></param>
        /// <param name="singleImageAdService"></param>
        /// <param name="multiImageCarouselAdService"></param>
        /// <param name="multiImageSliderAdService"></param>
        public CampaignController(IBaseGraphRepository baseGraphRepository, ISingleImageAdService singleImageAdService, IMultiImageCarouselAdService multiImageCarouselAdService, IMultiImageSliderAdService multiImageSliderAdService)
        {
            this._baseGraphRepository = baseGraphRepository ?? throw new ArgumentNullException(nameof(baseGraphRepository));
            this._singleImageAdService = singleImageAdService ?? throw new ArgumentNullException(nameof(singleImageAdService));
            this._multiImageCarouselAdService = multiImageCarouselAdService ?? throw new ArgumentNullException(nameof(multiImageCarouselAdService));
            this._multiImageSliderAdService = multiImageSliderAdService ?? throw new ArgumentNullException(nameof(multiImageSliderAdService));
        }

        /// <summary>
        /// The get all Method
        /// Dont have it working yet.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<IEnumerable<T>> GetAll()
        {
            //return _baseGraphRepository.ReadEverything();
            return BadRequest();
        }

        /// <summary>
        /// Gets campaigns by template
        /// </summary>
        /// <param name="templateType"></param>
        /// <returns></returns>
        [Route("/api/{templateType}/[controller]")]
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public dynamic GetCampaign([FromRoute]string templateType)
        {
            if (string.IsNullOrEmpty(templateType))
            {
                return NotFound();
            }
            if (templateType.ToLower().Equals("singleimagead"))
            {
                return _singleImageAdService.ReadAll();
            }
            else if (templateType.ToLower().Equals("multiimagecarouselad"))
            {
                return _multiImageCarouselAdService.ReadAll();
            }
            else if (templateType.ToLower().Equals("multiimagesliderad"))
            {
                return _multiImageSliderAdService.ReadAll();
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Creates Single Ad Campaign
        /// </summary>
        /// <param name="templateType"></param>
        /// <param name="singleImageAd"></param>
        /// <returns></returns>
        [Route("/api/singleimagead/[controller]")]
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(SingleImageAd))]
        [ProducesResponseType(400)] // Bad Request
        [ProducesResponseType(409)] // Conflict - already exists
        public async Task<ActionResult> PostSingleAd([FromRoute]string templateType, [FromBody]SingleImageAd singleImageAd)
        {
            _singleImageAdService.Create(singleImageAd);
            return Created(new Uri(String.Format(CultureInfo.InvariantCulture, "/api/campaign/{0}", singleImageAd.Id), UriKind.Relative), singleImageAd);
        }

        /// <summary>
        /// Creates A Multi Image Carousel Ad
        /// </summary>
        /// <param name="templateType"></param>
        /// <param name="multiImageCarouselAd"></param>
        /// <returns></returns>
        [Route("/api/multiimagecarouselad/[controller]")]
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(MultiImageCarouselAd))]
        [ProducesResponseType(400)] // Bad Request
        [ProducesResponseType(409)] // Conflict - already exists
        public async Task<ActionResult> PostMultiCarousel([FromRoute]string templateType, [FromBody]MultiImageCarouselAd multiImageCarouselAd)
        {
            _multiImageCarouselAdService.Create(multiImageCarouselAd);
            return Created(new Uri(String.Format(CultureInfo.InvariantCulture, "/api/campaign/{0}", multiImageCarouselAd.Id), UriKind.Relative), multiImageCarouselAd);

        }

        /// <summary>
        /// Creates Multi Image Slider Ad
        /// </summary>
        /// <param name="templateType"></param>
        /// <param name="multiImageSliderAd"></param>
        /// <returns></returns>
        [Route("/api/multiimagesliderad/[controller]")]
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(MultiImageSliderAd))]
        [ProducesResponseType(400)] // Bad Request
        [ProducesResponseType(409)] // Conflict - already exists
        public async Task<ActionResult> PostMultiSlider([FromRoute]string templateType, [FromBody]MultiImageSliderAd multiImageSliderAd)
        {
            _multiImageSliderAdService.Create(multiImageSliderAd);
            return Created(new Uri(String.Format(CultureInfo.InvariantCulture, "/api/campaign/{0}", multiImageSliderAd.Id), UriKind.Relative), multiImageSliderAd);
        }

        /// <summary>
        /// Updates Single Ad Campaign
        /// </summary>
        /// <param name="templateType"></param>
        /// <param name="singleImageAd"></param>
        /// <returns></returns>
        [Route("/api/singleimagead/[controller]")]
        [HttpPut("{id:Guid}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)] // Not Found
        public async Task<ActionResult> PutSingleAd([FromRoute]string templateType, [FromBody]SingleImageAd singleImageAd)
        {
            if (string.IsNullOrEmpty(templateType))
            {
                return NotFound();
            }
            if (templateType.ToLower().Equals("singleimagead"))
            {
                _singleImageAdService.Update(singleImageAd);
                return Accepted(new Uri(String.Format(CultureInfo.InvariantCulture, "/api/campaign/{0}", singleImageAd.Id), UriKind.Relative), singleImageAd);
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Updates A Multi Image Carousel Ad
        /// </summary>
        /// <param name="templateType"></param>
        /// <param name="multiImageCarouselAd"></param>
        /// <returns></returns>
        [Route("/api/multiimagecarouselad/[controller]")]
        [HttpPut("{id:Guid}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)] // Not Found
        public async Task<ActionResult> PutMultiCarousel([FromRoute]string templateType, [FromBody]MultiImageCarouselAd multiImageCarouselAd)
        {
            if (string.IsNullOrEmpty(templateType))
            {
                return NotFound();
            }
             if (templateType.ToLower().Equals("multiimagecarouselad"))
            {
                _multiImageCarouselAdService.Update(multiImageCarouselAd);
                return Accepted(new Uri(String.Format(CultureInfo.InvariantCulture, "/api/campaign/{0}", multiImageCarouselAd.Id), UriKind.Relative), multiImageCarouselAd);
            }
            
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Updates Multi Image Slider Ad
        /// </summary>
        /// <param name="templateType"></param>
        /// <param name="multiImageSliderAd"></param>
        /// <returns></returns>
        [Route("/api/multiimagesliderad/[controller]")]
        [HttpPut("{id:Guid}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)] // Not Found
        public async Task<ActionResult> PutMultiSlider([FromRoute]string templateType, [FromBody]MultiImageSliderAd multiImageSliderAd)
        {
            if (string.IsNullOrEmpty(templateType))
            {
                return NotFound();
            }
            if (templateType.ToLower().Equals("multiimagesliderad"))
            {
                _multiImageSliderAdService.Update(multiImageSliderAd);
                return Accepted(new Uri(String.Format(CultureInfo.InvariantCulture, "/api/campaign/{0}", multiImageSliderAd.Id), UriKind.Relative), multiImageSliderAd);
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Deletes a Campaign
        /// </summary>
        /// <param name="templateType"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id:Guid}")]
        public ActionResult Delete([FromRoute]string templateType, Guid id)
        {
            if (id == null || id == Guid.Empty || (string.IsNullOrEmpty(templateType)))
            {
                return BadRequest();
            }
            if (templateType.ToLower().Equals("singleimagead"))
            {
                return _singleImageAdService.Delete(id);
            }
            else if (templateType.ToLower().Equals("multiimagecarouselad"))
            {
                return _multiImageCarouselAdService.Delete(id);
            }
            else if (templateType.ToLower().Equals("multiimagesliderad"))
            {
                return _multiImageSliderAdService.Delete(id);
            }
            else
            {
                return BadRequest();
            }
        }

    }    
}