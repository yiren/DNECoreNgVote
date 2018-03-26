using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;
using CoreMVC.Data.Voting.Service;
using ngVoteCore.Services.User;
using Microsoft.Extensions.Configuration;

namespace updatedAngularCoreTemplate.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment env;
        private readonly IVoteEventRepository eventRepo;
        private readonly IConfiguration configuration;

        public HomeController(IHostingEnvironment env, IVoteEventRepository eventRepo, IConfiguration configuration)
        {
            this.env = env;
            this.eventRepo = eventRepo;
            this.configuration = configuration;
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

        LdapUserService ldapUserService = new LdapUserService();
        public IActionResult QueryLdapUser([FromQuery]string user)
        {
            var isDneUser = ldapUserService.QueryLdapUser(
                user,
                configuration["ldap:searchBase"],
                configuration["ldap:adServerAddress"],
                configuration["ldap:username"],
                configuration["ldap:password"]
                );
            return new JsonResult(new {
                isDneUser=isDneUser
            });
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
