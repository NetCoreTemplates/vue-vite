using Funq;
using MyApp.ServiceInterface;

[assembly: HostingStartup(typeof(MyApp.AppHost))]

namespace MyApp;

public class AppHost() : AppHostBase("MyApp", typeof(MyServices).Assembly), IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) => {
            services.ConfigureNonBreakingSameSiteCookies(context.HostingEnvironment);
            
            services.AddPlugin(new SpaFeature {
                EnableSpaFallback = true
            });
            services.AddPlugin(new CorsFeature(allowOriginWhitelist:new[]{ 
                "http://localhost:5000",
                "http://localhost:5174", "http://127.0.0.1:5174", //vite
                "https://localhost:5001",
                "https://" + Environment.GetEnvironmentVariable("DEPLOY_CDN")
            }, allowCredentials:true));
        });

    public override void Configure(Container container)
    {
        SetConfig(new HostConfig {
            UseSameSiteCookies = !HostingEnvironment.IsDevelopment()
        });

        ConfigurePlugin<UiFeature>(feature => {
            feature.Info.BrandIcon.Uri = "/assets/img/logo.svg";
            feature.Info.BrandIcon.Cls = "inline-block w-8 h-8 mr-2";
        });
    }
}
