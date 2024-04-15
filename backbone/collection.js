var book = Backbone.Collections.extend({
    url:"/books",
    parse:function(data){
        return data.books;
    }
});

var object = {};
_.extend(object, Backbone.Events);

// events
object.on('alert', function(msg){
    alert('Triggreed' + msg);
});

object.trigger('alert', 'an event'); 

// removing an event from an object
object.off('change', onChange);
// remove all change events
object.off('change');
// remove onChange for all events
object.off(null, onChange);
// remove all callback
object.off();


// trigger
// object.trigger(event, [*args]);

// once they are called in lifetime
object.once(event, callback, [context]);

// tells an object to stop listening to events
visualViewport.stopListening();
visualViewport.stopListening(model);

// listenOnlyOnce
object.listenToOnce(other, event, callback);


// backbone events
var sideBar = Backbone.Model.extend({
    promptColor: function(){
        var cssColor = prompt('enter color');
        this.set({color: cssColor});
    }
});
window.sidebar = new Sidebar;
sidebar.on('change:color', function(model, color){
    $('sidebar').css({background: color});
});
sidebar.set({color: 'white'});
sidebar.promptColor();

// model
var Note = Backbone.Model.extend({

    initialize: function(){},
    author: function(){},
    coordinates: function(){},
    allowedToEdit: function(account){
        return true;
    }
});
var PrivateNote = Node.extend({
    allowedToEdit: function(account){
        return account.owns(this);
    }
});


// get set
note.get("title");
note.set({title: 'march 20', content:'in his eyes'});

// id not to be assessed directly
model.id // x
model.set('id', 'any value');

// default value
var meal = Backbone.Model.extend({
    defaults:{
        "appetizer": "dededded",
        "hello": "bur",
    }
});
alert("derert will be" + (new Meal).get('dessert'));


// to json
var artist = new Backbone.Model({
    firstName: 'swapnil',
    lastName: 'Tayal'
});
artist.set({ birthday: "december 12" });
alert(JSON.stringify(artist));


// validation
var chapter = Backbone.Model.extend({
    valiate: function(attrs, options){
        if(attrs.end < attrs.start){
            return "error cant do this";
        }
    }
});

var one = new chapter({
    title: "chapter one"
});

one.set({
    start: 15,
    end: 10,
});

if(!one.isValid){
    alert(one.get("title") + " " + one.validateError);
}



book.on('change', function(){
    if(book.hasChanged('title')){

    }
});


// collection
var library = Backbone.Collection.extend({
    model: function(attrs, option){
        if(condition){
            return new PublicDocument(attrs, options);
        }else{
            return new PrivateDocument(attrs, options);
        }
    }
});

// preinitialize
class Library extends Backbone.Collection{
    preinitialize(){
        this.on("add", function(){
            console.log("Add model event got fired!");
        });
    }
}

// toJSON
var collection = new Backbone.Collection([
    {name: "Tim", age: 5},
    {name: "Ida", age: 26},
    {name: "Eva", age: 23},
])
alert(JSON.stringify(collection));


// add
var ships = new Backbone.Collections;
ships.on("add", function(ship){
    alert("Ahoy" + ship.get("name") + "!");
});

ships.add([
    {name: "swapnil"},
    {name: 'rhythm'}
])


// get model from collection by an id, or cid 
var book = library.get(id);

// comparator

var chapters = Backbone.Model;
var chapters = new Backbone.Collection;
chapters.compatator = 'page';

chapters.add(new chapters({ page: 9, title: "end" }));
chapters.add(new chapters({ page: 5, title: "middle" }));
chapters.add(new chapters({ page: 1, title: "begin" }));

alert(chapters.pluck('title'));

// pluck 
var stooges = new Backbone.Collections([
    {name: "Curly"},
    {name: "Larry"},
    {name: "dwapniv"},
]);
var name = stooges.pluck("name");
alert(JSON.stringify(names));

var friends = new Backbone.Collection([
    {name: 'swapnil', job: 'SDE'},
    {name: 'harsh', job: 'SDE'},
    {name: 'yakshit', job: 'SDET'},
])
var employee = friends.where({ job: 'SDE' });
alert(friends.lenght);

// fetch 
Backbone.sync = function(method, model){
    alert(method + " " + model.url);
};

var account = new Backbone.Collection;
accounts.url = '/accounts';
account.fetch();


// views

var DocumentRow = Backbone.View.extend({

    tagName: "li",
    className: "document-row",
    events:{
        "click .icon": "open",
        "click .button.edit": "openEditDislog",
        "click .buton.delete": "destroy"
    },
    initialize: function(){
        this.listenTo(this.model, "change", this.render);
    },
    render:function(){

    }
});


class Document extends Backbone.View{

    preinitialize({autoRender}){
        this.autoRender = autoRender;
    }
    initialize(){
        if(this.autoRender){
            this.listenTo(this.model, "change", this.render);
        }
    }
}

var doc = document.first();
new DocumentRow({
    model: doc,
    id:"document-row-" + doc.id
})

var ItemView = Backbone.View.extend({
    tagName: 'li'
});
var BodyView = Backbone.View.extend({
    el: 'body'
})
var item = new ItemView();
var body = new BodyView();

alert(item.el + ' ' + body.el);

view.$el.show();
listView.$el.append(itemView.el);

var LibraryView = Backbone.View.extend({
    template: _.template()
})

var BookMark = Backbone.View.extend({
    template: _.template(),
    render: function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});

var ENTER_KEY = 13;
var InputView = Backbone.View.extend({

    tagName: 'input',
    events:{
        'keydown': 'keyAction',
    },
    render: function(){

    },
    keyAction: function(e){
        if(e.which === ENTER_KEY){
            this.collection.add({ text: this.$el.val() });
        }
    }
});

var DocumentView = Backbone.View.extend({
    events:{
        "dbclick": "open",
        "click .icon.doc": "select",
        "contextmenu .icon.doc" : "showMenu",
        "click .show__notes": "togleNotes",
        "click .title .lock": "editAccessLevel",
        "mouseover .title .date": "showTooltip"
    },
    render: function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    open: function(){
        window.open(this.model.get('viewer_url'));
    },
    select: function(){
        this.model.set({selected: true});
    }
});

    