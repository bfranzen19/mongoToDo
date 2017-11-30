console.log('js is linked')

var mainVM = new Vue({
  el: '#app',
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
      this.newItem = ''
    },

    removeItem: function(item) {
      $.post('/removeItem', item, function(data) {
        mainVM.getFreshData()
      })
    },

    crossOut: function(item) {
      $.post('/crossOut', {itemText: item, isDone: true}, function(data) {
        console.log('completed: ', data)
      })
    },

    created: function() {
      this.getFreshData()
    },
  }, // end of methods
}) // end of mainVM
