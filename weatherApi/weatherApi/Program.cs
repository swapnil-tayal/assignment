using Microsoft.AspNetCore.Cors;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Dynamic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
var app = builder.Build();

app.UseCors(
     options => options.WithOrigins("*").AllowAnyMethod()
);


app.MapGet("/", () => "Hello World!");

app.MapGet("/getCity/{city}", async context =>
{
    string city = context.Request.RouteValues["city"] as string;
    using (HttpClient client = new HttpClient())
    {
        try
        {
            // Specify the URI of the API endpoint you want to call
            string apiUrl = $"http://api.weatherapi.com/v1/current.json?key=633be71e9ba941b4aba43319241004&q=${city}&aqi=no";

            // Send a GET request to the API endpoint and wait for the response
            HttpResponseMessage response = await client.GetAsync(apiUrl);

            // Check if the response is successful (status code 200)
            if (response.IsSuccessStatusCode)
            {
                // Read the content of the response as a string
                string responseBody = await response.Content.ReadAsStringAsync();

                dynamic data = JsonConvert.DeserializeObject(responseBody);
                double temperatureCelsius = (double)data.current.temp_c;

                await context.Response.WriteAsync(temperatureCelsius + "");
            }
            else
            {
                Console.WriteLine("Failed to call the API. Status code: " + response.StatusCode);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("An error occurred: " + ex.Message);
        }
    }
});

app.Run();
