#-*- coding:utf-8 -*-

import tornado.ioloop
import tornado.httpserver
from tornado.options import define, options
import handlers,os


#ip   = os.environ['OPENSHIFT_PYTHON_IP']
#port = int(os.environ['OPENSHIFT_PYTHON_PORT'])
define("port",default=8000,type=int)
define("address",default="localhost") 
# if you want to test on your machine, avoid localhost, use your wifi address,
# so you can test easily offline app, by stopping the server.

urls = [
    (r"/", handlers.IndexHandler),
    (r"/latlon", handlers.LatLon),
    (r"/msg", handlers.Message),
    (r"/admination", handlers.Admin), # please avoid making admin pages named admin ...
    (r"/reg", handlers.Register),
    (r"/login", handlers.Login),
    (r"/comments", handlers.Comments),
    (r"/iedanger", handlers.IE),
    (r"/bsod", handlers.BSOD),
    (r"/(.*)", tornado.web.StaticFileHandler, {"path":r"{0}".format(os.path.join(os.path.dirname(__file__),"static"))}),
]

settings = dict({
    "template_path": os.path.join(os.path.dirname(__file__),"templates"),
    "static_path": os.path.join(os.path.dirname(__file__),"static"),
    "cookie_secret": os.urandom(12),
    "xsrf_cookies": True,
    "debug": True,
    "compress_response": True,
    "login_url": "/admination",
    "ui_modules":
    {'Detail': handlers.DetailModule,
     'Jaw': handlers.JawModule,
     'Astro': handlers.AstroModule,
     'Modals': handlers.Modals,
     'Geo': handlers.Geo,
     'Contact': handlers.Contact,
    }
    
})

application = tornado.web.Application(urls,**settings)


if __name__ == "__main__":
    options.parse_command_line()
    server = tornado.httpserver.HTTPServer(application)
    server.listen(port, ip)
    tornado.ioloop.IOLoop.instance().start()
