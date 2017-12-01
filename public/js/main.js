console.log('js is linked')

var mainVM = new Vue({
  el: '#app',

    beforeCreate() {
      $.get('/currentList', function(listFromServer) {
        console.log(listFromServer)
        mainVM.items = listFromServer
      })
    },


  data: {
    items: [],
    newItem: '',
  },  // end of data

  methods: {
    postNewItem: function(event) {
      event.preventDefault()
      $.post('/newItem', {itemText: mainVM.newItem}, function(dataFromServer) {
        mainVM.items.push(dataFromServer)
        console.log('$.post() - ',dataFromServer)
      })
      mainVM.getFreshData()
      this.text = ''
    },

    getFreshData: function() {
      $.get('/currentList', function(data) {
        mainVM.items = data
        console.log('fresh data from the server: ', data)
      })
      mainVM.newItem = ''
    },

    removeItem: function(item) {
      $.post('/removeItem', item, function(data) {
        mainVM.getFreshData()
      })
    },

    crossOut: function(item) {
      console.log(item._id)
      console.log(item.isDone)

      $.post('/crossOut', {item}, function(dataFromServer) {
        console.log(dataFromServer)
      })

    },

    // created: function() {
    //   this.getFreshData()
    // },
  }, // end of methods
}) // end of mainVM
