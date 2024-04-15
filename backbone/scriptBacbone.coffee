localStorageData = []

populateFromLocal = () ->
  for i in [0...localStorage.length]
    localStorageData[i] =
      city: localStorage.key(i)
      temp: localStorage.getItem(localStorage.key(i))
  
  # console.log(localStorageData)
  
  for i in [0...localStorageData.length]
    cityModel = new CityModel
      city: localStorageData[i].city
      temperature: localStorageData[i].temp
    cityCollection.add(cityModel)
  
  return 
  # console.log(cityCollection)



CityModel = Backbone.Model.extend
  defaults:
    city: "",
    temperature: ""

CityCollection = Backbone.Collection.extend
  model : CityModel

cityCollection = new CityCollection

#view
CityView = Backbone.View.extend
  tagName: 'li',
  template: _.template(
    "<%= city %> : <%= temperature %> <div><button class='delete'>Delete</button> <button class='update'>Update</button></div>"
  )
  events:
    "click .delete": "deleteCity"
    "click .update": "updateCity"

  initialize: () ->
    this.listenTo(this.model, "change", this.render)
    this.listenTo(this.model, "destroy", this.remove) 
    return
  render: () -> 
    this.$el.html(this.template(this.model.toJSON()))
    this
  deleteCity: () ->
    cityName = this.model.get("city")
    localStorage.removeItem(cityName)
    this.model.destroy()
    return 

  updateCity: () -> 
    cityName = this.model.get("city")
    apiKey = "633be71e9ba941b4aba43319241004";
    try
      response = await fetch(
              "http://api.weatherapi.com/v1/current.json?key=#{apiKey}&q=#{cityName}&aqi=no"
            )
      if !response.ok
        throw new Error("Invalid city name")

      data = await response.json()
      temp = data.current.temp_c
      localStorage.setItem(cityName, temp)
      this.model.set("temperature", temp)
      return 

    catch error
      alert(error.message)
      return 

AppView = Backbone.View.extend  
  el: "body",
  events: 
    "click #submitButton": "addCity"

  initialize: () -> 
    populateFromLocal();
    this.cityList = $("#cityList")
    this.render()
    return;

  addCity: () -> 
    cityName = $("#cityInput").val().trim()
    if localStorage.getItem(cityName) != null
      alert("already in list");
      return

    apiKey = "633be71e9ba941b4aba43319241004";
    try
      response = await fetch(
              "http://api.weatherapi.com/v1/current.json?key=#{apiKey}&q=#{cityName}&aqi=no"
            )
      if !response.ok
        throw new Error("Invalid city name")

      data = await response.json()
      temp = data.current.temp_c
      localStorage.setItem(cityName, temp)
      cityModel = new CityModel
        city: cityName
        temperature: temp
      cityCollection.add(cityModel)
      this.render()
      return null;
    catch error 
      alert(error.message)

  render: () -> 
    this.cityList.empty()
    cityCollection.each( (cityModel) -> 
      view = new CityView({model: cityModel})
      this.cityList.append(view.render().el)
      return null
    ,this)
    this
      
appView = new AppView()

      
