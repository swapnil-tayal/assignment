// Generated by CoffeeScript 2.7.0
(function() {
  var AppView, CityCollection, CityModel, CityView, appView, cityCollection, localStorageData, populateFromLocal;

  localStorageData = [];

  populateFromLocal = function() {
    var cityModel, i, j, k, ref, ref1;
    for (i = j = 0, ref = localStorage.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      localStorageData[i] = {
        city: localStorage.key(i),
        temp: localStorage.getItem(localStorage.key(i))
      };
    }

    // console.log(localStorageData)
    for (i = k = 0, ref1 = localStorageData.length; (0 <= ref1 ? k < ref1 : k > ref1); i = 0 <= ref1 ? ++k : --k) {
      cityModel = new CityModel({
        city: localStorageData[i].city,
        temperature: localStorageData[i].temp
      });
      cityCollection.add(cityModel);
    }
  };

  
  // console.log(cityCollection)
  CityModel = Backbone.Model.extend({
    defaults: {
      city: "",
      temperature: ""
    }
  });

  CityCollection = Backbone.Collection.extend({
    model: CityModel
  });

  cityCollection = new CityCollection();

  //view
  CityView = Backbone.View.extend({
    tagName: 'li',
    template: _.template("<%= city %> : <%= temperature %> <div><button class='delete'>Delete</button> <button class='update'>Update</button></div>"),
    events: {
      "click .delete": "deleteCity",
      "click .update": "updateCity"
    },
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "destroy", this.remove);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    deleteCity: function() {
      var cityName;
      cityName = this.model.get("city");
      localStorage.removeItem(cityName);
      this.model.destroy();
    },
    updateCity: async function() {
      var apiKey, cityName, data, error, response, temp;
      cityName = this.model.get("city");
      apiKey = "633be71e9ba941b4aba43319241004";
      try {
        response = (await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`));
        if (!response.ok) {
          throw new Error("Invalid city name");
        }
        data = (await response.json());
        temp = data.current.temp_c;
        localStorage.setItem(cityName, temp);
        this.model.set("temperature", temp);
      } catch (error1) {
        error = error1;
        alert(error.message);
      }
    }
  });

  AppView = Backbone.View.extend({
    el: "body",
    events: {
      "click #submitButton": "addCity"
    },
    initialize: function() {
      populateFromLocal();
      this.cityList = $("#cityList");
      this.render();
    },
    addCity: async function() {
      var apiKey, cityModel, cityName, data, error, response, temp;
      cityName = $("#cityInput").val().trim();
      if (localStorage.getItem(cityName) !== null) {
        alert("already in list");
        return;
      }
      apiKey = "633be71e9ba941b4aba43319241004";
      try {
        response = (await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`));
        if (!response.ok) {
          throw new Error("Invalid city name");
        }
        data = (await response.json());
        temp = data.current.temp_c;
        localStorage.setItem(cityName, temp);
        cityModel = new CityModel({
          city: cityName,
          temperature: temp
        });
        cityCollection.add(cityModel);
        this.render();
        return null;
      } catch (error1) {
        error = error1;
        return alert(error.message);
      }
    },
    render: function() {
      this.cityList.empty();
      cityCollection.each(function(cityModel) {
        var view;
        view = new CityView({
          model: cityModel
        });
        this.cityList.append(view.render().el);
        return null;
      }, this);
      return this;
    }
  });

  appView = new AppView();

}).call(this);
