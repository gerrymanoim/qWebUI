function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}


Vue.component('connform', {
  props: ['connection_text', 'hostport'],
  template: '#connform',
  methods: {
    qconnect: function(event) {
      console.log(this.hostport);
      app.wsconnect(this.hostport);
    }
  }
});

Vue.component('codeediting', {
  // camelCase in JavaScript
  props: ['lastmsg', 'codetosend'],
  template: '#repl',
  methods: {
    qsend: function(event) {
      app.wssend(this.codetosend);
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    conn: null,
    connection_text: 'Not connected.', 
    lastmsg: 'Waiting for input',
    hostport: getURLParameter("hostport"),
    codetosend: getURLParameter("q"),
    shareurl: document.location.origin + document.location.pathname + "?hostport=" + this.hostport +"&q=" + this.codetosend
  },
  methods: {
    wsconnect: function(hostport) {
      console.log("Grabbed the connection event");
      this.conn = new WebSocket("ws://" + hostport + "/");
      this.conn.onmessage = this.wsmessage;
      this.connection_text = 'Connected to ' + hostport;
    },
    wssend: function(codetosend) {
      console.log(codetosend);
      this.conn.send(codetosend);
    },
    wsmessage: function(message) {
      console.log('wsmessage', message);
      this.lastmsg = message.data;
      console.log('wsmessage this',this);
    }
  }
});