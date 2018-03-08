using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.Rewrite.Internal;
using CoreMVC.Data.Voting;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using CoreMVC.Data.Voting.Service;
using Microsoft.Extensions.FileProviders;
using System.IO;
using System.IdentityModel.Tokens.Jwt;
using IdentityServer4.AccessTokenValidation;

namespace updatedAngularCoreTemplate
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc()
                    .AddJsonOptions(options => {
                        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    });
            services.AddDbContext<VotingDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("VotingDataStore")));
                //options.UseInMemoryDatabase());

            services.AddAuthorization(options =>
            {
                options.AddPolicy("dataAdmin", adminPolicy =>
                {
                    adminPolicy.RequireClaim("role", "dataEventRecords.admin");
                });
                options.AddPolicy("dataUser", userPolicy =>
                {
                    userPolicy.RequireClaim("role", "dataEventRecords.user");
                });
                options.AddPolicy("test", userPolicy =>
                {
                    userPolicy.RequireClaim("role", "user");
                });
            });

            services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader()));

            
            services.AddScoped<IVoteEventRepository, VoteEventRepository>();
            services.AddScoped<IVoteRecordRepository, VoteRecordRepository>();
            //services.AddNodeServices(options =>
            //{
            //    options.ProjectPath = "C:\\Program Files\nodejs";
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, VotingDbContext voteDbContext)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();



            //app.UseRewriter(new RewriteOptions
            //{
            //    Rules =
            //{
            //    new RewriteRule(".*", "/", true)
            //}
            //});
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            //app.UseStaticFiles(new StaticFileOptions()
            //{
            //    FileProvider=new PhysicalFileProvider(Path.Combine(env.ContentRootPath,@"node_modules")),
            //    RequestPath=new Microsoft.AspNetCore.Http.PathString("/node_modules")

            //});

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            // ClientCreditential
            app.UseIdentityServerAuthentication(new IdentityServerAuthenticationOptions
            {
                Authority = "http://localhost:5000",
                AllowedScopes = new List<string> { "voteEventData", "api1" },
                ApiSecret = "myVote",

                SupportedTokens = SupportedTokens.Both,
                RequireHttpsMetadata = false,
                ApiName = "voteEventData",
                AutomaticChallenge = true,
                AutomaticAuthenticate = true
            });
            VoteSeedData.addVoteSeedData(voteDbContext);
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
