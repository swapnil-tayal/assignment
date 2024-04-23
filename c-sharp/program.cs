        public static List<BlueprintRow> Fetch()
        {
            var mySqlHelper = new OptmyzrMySqlHelper();
            var listOfAllUsers = OptmyzrUser.GetAllActiveUsers();
            var blueprints = new List<BlueprintRow>();
            foreach(var user in listOfAllUsers)
            {
                var bluePrintRows = mySqlHelper.GetAllBlueprintsForUser(user.UserId.ToString());
                Console.WriteLine(bluePrintRows);
                blueprints.AddRange(bluePrintRows);
            }
            return blueprints;
        }
        public static List<BlueprintTaskRow> Fetch2()
        {
            var mySqlHelper = new OptmyzrMySqlHelper();
            List<BlueprintRow> blueprintrows = Fetch();
            var bluePrintsTask = new List<BlueprintTaskRow>();
            
            foreach(var blueprintrow in blueprintrows)
            {
                var bluePrintTask = mySqlHelper.GetAllPendingTasksForBP(
                    blueprintrow.user_id.ToString(), blueprintrow.id.ToString()
                );
                bluePrintsTask.AddRange(bluePrintTask);
            }
            return bluePrintsTask;
        }

        [Route("FetchblueprintTask")]
        public Stream FetchblueprintTask()
        {
            List<BlueprintTaskRow> blueprintTaskRows = Fetch2();
            string jsonResponse = JsonConvert.SerializeObject(blueprintTaskRows);
            return new MemoryStream(Encoding.UTF8.GetBytes(jsonResponse));
        }

        [Route("Fetchblueprint")]
        public Stream Fetchblueprint()
        {
            List<BlueprintRow> blueprintrows = Fetch();
            string jsonResponse = JsonConvert.SerializeObject(blueprintrows);
            return new MemoryStream(Encoding.UTF8.GetBytes(jsonResponse));
        }

        [Route("getCity/{city}")]
        public Stream getCity(string city)
        {
            string apiKey = "633be71e9ba941b4aba43319241004";
            string apiUrl = $"http://api.weatherapi.com/v1/current.json?key={apiKey}&q={city}&aqi=no";

            using (var client = new HttpClient())
            {
                HttpResponseMessage response = client.GetAsync(apiUrl).Result;

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = response.Content.ReadAsStringAsync().Result;
                    dynamic data = JsonConvert.DeserializeObject(responseBody);
                    double temperatureCelsius = (double)data.current.temp_c;

                    string jsonResponse = "{\"status\":\"" + city + "\", \"temperature\":" + temperatureCelsius + "}";
                    return new MemoryStream(Encoding.UTF8.GetBytes(jsonResponse));
                }
                else
                {
                    string errorMessage = $"Failed to fetch weather data for {city}. Status code: {response.StatusCode}";
                    string jsonResponse = "{\"error\":\"" + errorMessage + "\"}";
                    return new MemoryStream(Encoding.UTF8.GetBytes(jsonResponse));
                }
            }
        }
