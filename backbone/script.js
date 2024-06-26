const localStorageData = [];

const populateFromLocal = () => {
  for (var i = 0; i < localStorage.length; i++) {
    localStorageData[i] = {
      city: localStorage.key(i),
      temp: localStorage.getItem(localStorage.key(i)),
    };
  }
  // console.log(localStorageData);

  for (var i = 0; i < localStorageData.length; i++) {
    const cityModel = new CityModel({
      city: localStorageData[i].city,
      temperature: localStorageData[i].temp,
    });
    cityCollection.add(cityModel);
  }
  // console.log(cityCollection);
};

const CityModel = Backbone.Model.extend({
  defaults: {
    city: "",
    temperature: "",
  },
});

// Collection
const CityCollection = Backbone.Collection.extend({
  model: CityModel,
});

const cityCollection = new CityCollection();

// View
const CityView = Backbone.View.extend({
  tagName: "li",
  template: _.template(
    "<%= city %> : <%= temperature %> <div><button class='delete'>Delete</button> <button class='update'>Update</button></div>"
  ),
  events: {
    "click .delete": "deleteCity",
    "click .update": "updateCity",
  },
  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "destroy", this.remove);
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  deleteCity: function () {
    const cityName = this.model.get("city");
    localStorage.removeItem(cityName);
    this.model.destroy();
  },
  updateCity: async function () {
    const cityName = this.model.get("city");
    const apiKey = "633be71e9ba941b4aba43319241004";
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`
      );
      if (!response.ok) {
        throw new Error("Invalid city name");
      }
      const data = await response.json();
      const temp = data.current.temp_c;
      localStorage.setItem(cityName, temp);
      this.model.set("temperature", temp);
    } catch (error) {
      alert(error.message);
    }
  },
});

// Main App View
const AppView = Backbone.View.extend({
  el: "body",
  events: {
    "click #submitButton": "addCity",
  },
  initialize: function () {
    populateFromLocal();
    this.cityList = $("#cityList");
    this.render();
  },
  addCity: async function () {
    const cityName = $("#cityInput").val().trim();

    if (localStorage.getItem(cityName) != null) {
      alert("already in list");
      return;
    }

    const apiKey = "633be71e9ba941b4aba43319241004";
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`
      );
      if (!response.ok) {
        throw new Error("Invalid city name");
      }
      const data = await response.json();
      const temp = data.current.temp_c;
      // console.log(temp);
      localStorage.setItem(cityName, temp);
      const cityModel = new CityModel({
        city: cityName,
        temperature: temp,
      });
      cityCollection.add(cityModel);
      // console.log(localStorage.getItem(cityName));
      this.render();
    } catch (error) {
      alert(error.message);
    }
  },
  render: function () {
    this.cityList.empty();
    cityCollection.each(function (cityModel) {
      const view = new CityView({ model: cityModel });
      this.cityList.append(view.render().el);
    }, this);
    return this;
  },
});

const appView = new AppView();
