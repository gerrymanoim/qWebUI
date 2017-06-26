# q WebUI

A simple web interface for a running q instance. Meant for easy sharing and exploratory analysis. Requires a browser that can run websockets. 

Loosely based on [q websockets cookbook](http://code.kx.com/q/cookbook/websockets/).


## Get Started

In your q session, set a port and add a `z.ws` handler. 

```
q)\p 8888
q).z.ws:{neg[.z.w]@[.Q.s value@;x;{`"`'`"`,x,`"`\n`"`}]}
```

Then launch `qwebui.html`. Connect to your instance and send some valid queries. 

## Todo:

- Make lastMsg an array that displays the entire session history. 
- Size limits?