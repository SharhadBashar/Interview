using MediatR;
using Microsoft.AspNetCore.Mvc;
using Montrium.Connect.ClinicalDirectory.Models;
using Montrium.Connect.ClinicalDirectory.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Montrium.Connect.ClinicalDirectory.Commands
{

    // DDD and CQRS patterns comment: Note that it is recommended to implement immutable Commands
    // In this case, its immutability is achieved by having all the setters as private
    // plus only being able to update the data just once, when creating the object through its constructor.
    // References on Immutable Commands:  
    // http://cqrs.nu/Faq
    // https://docs.spine3.org/motivation/immutability.html 
    // http://blog.gauffin.org/2012/06/griffin-container-introducing-command-support/
    // https://msdn.microsoft.com/en-us/library/bb383979.aspx
    public class UpdateStudyCommandHandler : IRequestHandler<UpdateStudyCommand, ActionResult<Study>>
    {
        private readonly IMediator _mediator;
        private readonly IStudyService _studyService;

        public UpdateStudyCommandHandler(IMediator mediator, IStudyService studyService)
        {
            this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this._studyService = studyService ?? throw new ArgumentNullException(nameof(studyService));
        }

        public Task<ActionResult<Study>> Handle(UpdateStudyCommand message, CancellationToken cancellationToken)
        {
            return _studyService.UpdateStudy(message.Study);
        }
    }
}
