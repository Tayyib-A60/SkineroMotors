using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SkineroMotors.Controllers.Resources;
using SkineroMotors.Core;
using SkineroMotors.Core.Models;

namespace SkineroMotors.Controllers {
    [Route("/api/skineroVehicles/contactUs")]
    [ApiController]
    public class ContactUsController : Controller {
        private IContactUsRepository _repository { get; }
        private IUnitOfWork _unitOfWork { get; }
        private IMapper _mapper { get; }
        public ContactUsController (IContactUsRepository repository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> CreateContactUs(ContactUsResource contactUsResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var contactUs = _mapper.Map<ContactUsResource, ContactUs>(contactUsResource);
            _repository.Add(contactUs);

            await _unitOfWork.CompleteAsync();
            contactUs = await _repository.GetContact(contactUs.Id);
            return Ok(contactUs);
        }
        [HttpGet]
        public async Task<IEnumerable<ContactUsResource>> GetContacts ()
        {
            var contactUs = await _repository.GetContacts();
            return _mapper.Map<IEnumerable<ContactUs>, IEnumerable<ContactUsResource>>(contactUs);
        }
    }
}