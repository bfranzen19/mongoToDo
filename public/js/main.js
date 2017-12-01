console.log('js is linked')

var mainVM = new Vue({
  el: '#app',
  data: {
    items: [],
    newItem: '',
    nothing: '',
    isDone: false,
    styleObject: {
      textDecoration: 'line-through'
    },
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

    crossOut: function(value, event) {
      console.log(value.isDone)
      if(value === 'false') {
        this.isDone === true
      } else {
        this.isDone === false
      }
    },

    created: function() {
      this.getFreshData()
    },
  }, // end of methods
}) // end of mainVM
