// alert("perro")


function ItemsListViewModel() {
    var self = this;

    self.items = ko.observableArray([
        // 'Example item 1', 
        // 'Example item 2',
        // 'Example item 3',
        // 'Example item 4',
    ]);

    self.fetchItems = function(callback) {
        console.log("Se lanza la función desde el padre :D")
        setTimeout(function() {
            var MOCK_RESPONSE = {
                items: [
                    "async item 1",
                    "async item 2",
                    "async item 3",
                ]
            }
            callback(MOCK_RESPONSE.items)
        }, 2000)
    }

    self.onNewItems = function(newItems) {
        self.items(newItems)
    }
}

ko.components.register("loading-button", {
    template: [
        '<button data-bind="click: onClick, css: {loading: isLoading }" class="LoadingButton">',
            '<span data-bind="text: buttonText"></span>',
        '</button>'
    ].join(''),

    viewModel: function(params) {
       var self = this;
       self.buttonText = ko.observable(params.buttonText);

       self.isLoading = ko.observable(false);

       self.onClick = function() {
           self.isLoading(true)
           params.action(function(data) {
                self.isLoading(false)
                params.onDone(data)
           });
       }
    }
})

const knockoutApp = document.querySelector("#knockout-app");
ko.applyBindings(new ItemsListViewModel(), knockoutApp);