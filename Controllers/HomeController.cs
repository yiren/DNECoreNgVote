using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;
using CoreMVC.Data.Voting.Service;

namespace updatedAngularCoreTemplate.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment env;
        private readonly IVoteEventRepository eventRepo;

        public HomeController(IHostingEnvironment env, IVoteEventRepository eventRepo)
        {
            this.env = env;
            this.eventRepo = eventRepo;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetItemFiles()
        {
            return Ok(eventRepo.GetItemFileList());
        }

        [HttpPost]
        public IActionResult Upload(IFormFile formFile)
        {
            var uploadPath=Path.Combine(env.WebRootPath, "upload");

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(formFile.FileName).ToLower();
            var filePath = Path.Combine(uploadPath, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                formFile.CopyTo(stream);
            };
            

            return Ok(eventRepo.SaveUploadedItemFile(fileName));
        }
        public IActionResult GetDneUsers()
        {

            var projectPath = env.ContentRootPath + "/data/identity";
            var filePath = System.IO.Path.Combine(projectPath, "userdata.json");
            var json = System.IO.File.ReadAllText(filePath);
            return new ContentResult
            {
                Content = json,
                ContentType = "application/json",
                StatusCode = 200
            };
        }
    }
}
