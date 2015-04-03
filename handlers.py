#coding: utf-8
from __future__ import division
import tornado.web, tornado.gen
from tornado.escape import json_encode, json_decode
from tornado import ioloop
from tornado.httpclient import AsyncHTTPClient
import user_agents
from tornadwwo import wwo
import time
import datetime
import motor
from uuid import uuid4
from passlib.hash import pbkdf2_sha512 # if you want more security, use bcrypt or download scrypt module.

days = ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]
db = motor.MotorClient().meteo

class MainHandler(tornado.web.RequestHandler):
    def initialize(self):
        a = self.request.headers["User-Agent"]
        self.mobile = user_agents.parse(a).is_mobile
        self.name = user_agents.parse(a).browser.family
        self.version = user_agents.parse(a).browser.version[0]
        if self.name in ["Chrome", "Firefox", "Opera", "Chrome Mobile", "Firefox Mobile", "Opera Mobile"] and self.version > 25:
            x_real_ip = self.request.headers.get("x-forwarded-for")
            self.now = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            self.remote_ip = self.request.remote_ip if not x_real_ip else x_real_ip
            self.jour = (datetime.datetime.utcnow()+ datetime.timedelta(hours=1)).weekday()
            self.today = (datetime.datetime.utcnow()+ datetime.timedelta(hours=1)).today()
            self.key = "got get your key"
            self.heure = (datetime.datetime.utcnow()+ datetime.timedelta(hours=1)).hour
            

class IndexHandler(MainHandler):
    @tornado.gen.coroutine
    def get(self):
        if self.name not in ["Chrome", "Firefox", "Opera", "Chrome Mobile", "Firefox Mobile", "Opera Mobile"]:
            if self.name == "IE":
                self.redirect("/iedanger")
            else:
                self.write("<h1>روح تيليشارجي كروم ولا أوبرا ولا فايرفوكس و رواح</h1>")
        else:
            if self.version > 25:
                if (yield db.visit.find_one({"_id":self.remote_ip})) and (yield db.visit.find_one({"_id":self.remote_ip}))["ban"] > 4:
                    self.redirect("/bsod")
                else:
                    fox = ""
                    if self.name == "Firefox":
                        fox = "fox"
                    http_client = AsyncHTTPClient()
                    response = yield http_client.fetch("http://ip-api.com/json/{0}".format(self.remote_ip)) # use this when you deploy
                    res = json_decode(response.body)
                    info = [res["countryCode"], res["country"], res["isp"]]
                    yield db.visit.update({"_id":self.remote_ip},
                                       {
                                        "$set":{"info":info},
                                        "$addToSet":{"brow":[self.name, self.version]},
                                        "$inc":{"num":1, "ban":0}},
                                        upsert=True)
                    
                    exist = yield db.users.find_one({"_id":"vil"})
                    if (exist and self.now < (exist["tm"] + datetime.timedelta(hours=5))):
                        req = exist["rq"]
                        self.render("index.html",
                                    res=req["data"]["weather"],
                                    days=days,
                                    jour=self.jour,
                                    heure=self.heure,
                                    fox=fox)
                    else:
                        wwo.request(key=self.key,
                                    q="setif",
                                    format="json",
                                    showlocaltime="yes",
                                    cc="no",
                                    tp=6,
                                    extra="isDayTime",
                                    includelocation="yes")
                        yield tornado.gen.Task(ioloop.IOLoop.instance().add_timeout, time.time() + 2)
                        h = json_encode(wwo.result)
                        yield db.users.update({"_id":"vil"},
                                                   {"$set":{"tm":datetime.datetime.utcnow() + datetime.timedelta(hours=1),
                                                            "rq":json_decode(h)}},
                                                    upsert=True)
                        self.render("index.html",
                                    res=wwo.result["data"]["weather"],
                                    days=days,
                                    jour=self.jour,
                                    heure=self.heure,
                                    fox=fox)    
            else:
                self.write("<h1>دير ميزاجور بركاك ماراك تعيش في العصر الحجري</h1>")

class Hack(MainHandler):
    @tornado.gen.coroutine
    def get(self):
        self.render("hack.html")
        
class IE(MainHandler):
    def get(self):
        self.render("iedanger.html")


class DetailModule(tornado.web.UIModule):
    def render(self, res):
        tps = [' 01:00 الليل', ' 07:00 الصباح', ' 13:00 لعشية', ' 19:00 الليل']
        return self.render_string("modules/detail.html", tps=tps, res=res)


class JawModule(tornado.web.UIModule):
    def render(self, code, sun):    
        return self.render_string("meteo/{0}.html".format(code), sun=sun, code=code)


class AstroModule(tornado.web.UIModule):
    def render(self, res):
        jour = (datetime.datetime.utcnow()+ datetime.timedelta(hours=1)).weekday()
        return self.render_string("modules/astro.html", res=res, days=days, jour=jour)

class Geo(tornado.web.UIModule):
    def render(self):    
        return self.render_string("modules/geo.html")

class LatLon(MainHandler):
    @tornado.gen.coroutine
    def post(self):
        exist = yield db.users.find_one({"_id":self.remote_ip})
        e = self.get_cookie("_thd")
        if exist:
            if (e != None and self.now < (exist["tm"] + datetime.timedelta(hours=5))):
                w = str(exist["tm"] + datetime.timedelta(hours=5))[10:16]
                a = '''
                <div class="ui basic modal" id="back"><div class="header"><i class="announcement icon"></i> أصبر شوي
                </div><div class="content"><div class="image"><i class="wait icon"></i></div><div class="description">
                <h1> باش تلڤى الجديد ولي على {}  </h1></div></div><div class="actions"><div class="one fluid ui inverted buttons">
                <div class="ui green ok basic inverted massive button"><i class="thumbs outline up icon"></i>  نستنى </div></div></div></div>'''.format(w)
                self.write(a)
            elif (e == None and len(exist["rq"]) > 10 and self.now < (exist["tm"] + datetime.timedelta(hours=5))):
                req = (yield db.users.find_one({"_id":self.remote_ip}))["rq"]
                a = json_decode(req)
                self.set_cookie("_thd", str(uuid4())) # this is to handle different browsers in the same ip
                self.write(json_encode(a))
            else:
                lat = self.get_argument("lat")
                lon = self.get_argument("lon")
                wwo.request(key=self.key,
                            q="{},{}".format(lat, lon),
                            format="json",
                            showlocaltime="yes",
                            cc="no",
                            tp=6,
                            extra="isDayTime",
                            includelocation="yes")
                yield tornado.gen.Task(ioloop.IOLoop.instance().add_timeout, time.time() + 2)
                h = json_encode(wwo.result)
                yield db.users.update({"_id":self.remote_ip},
                                           {"$set":{"tm":datetime.datetime.utcnow() + datetime.timedelta(hours=1),
                                                    "rq":json_decode(h)}},
                                            upsert=True)
                self.set_cookie("_thd", str(uuid4())) # this is to handle different browsers in the same ip
                self.write(json_encode(wwo.result))
        else:
            lat = self.get_argument("lat")
            lon = self.get_argument("lon")
            wwo.request(key=self.key,
                        q="{},{}".format(lat, lon),
                        format="json",
                        showlocaltime="yes",
                        cc="no",
                        tp=6,
                        extra="isDayTime",
                        includelocation="yes")
            yield tornado.gen.Task(ioloop.IOLoop.instance().add_timeout, time.time() + 2)
            h = json_encode(wwo.result)
            yield db.users.update({"_id":self.remote_ip},
                                       {"$set":{"tm":datetime.datetime.utcnow() + datetime.timedelta(hours=1),
                                                "rq":json_decode(h)}},
                                        upsert=True)
            self.set_cookie("_thd", str(uuid4())) # this is to handle different browsers in the same ip
            self.write(json_encode(wwo.result))
            

class Contact(tornado.web.UIModule):
    def render(self):    
        return self.render_string("modules/contact.html")
    

class Message(MainHandler):
    @tornado.gen.coroutine
    def post(self):
        global visit
        msg = self.get_argument("msg")
        if len(msg) > 4 :
            resp = '''
            <div class="header">
            <i class="red heart icon"></i></div><div class="content"><div class="description"><h1>صحيــــت</h1></div></div>'''
            info = (yield db.visit.find_one({"_id":self.remote_ip}))["info"]
            yield db.message.update({"_id":self.remote_ip},
                                    {"$push":{"tm":datetime.datetime.utcnow() + datetime.timedelta(hours=1),"msg":msg},
                                    "$set":{"info": info}},
                                    upsert=True)
        else:
            if (yield db.visit.find_one({"_id":self.remote_ip}))["ban"] < 5:
                yield db.visit.update({"_id":self.remote_ip},
                                           {"$inc":{"ban":1}})
                resp = '''
                <div class="header">
                <i class="huge yellow frown icon"></i></div><div class="content"><div class="description"><h1>لاه راك تدير هكذا !</h1></div></div>'''
            else:
                resp = '''
                <div class="header">
                <i class="huge red frown icon"></i></div><div class="content"><div class="description"><h1>لاه راك تدير هكذا !</h1></div></div>'''
        self.write(resp)
        

class Admin(MainHandler):
    @tornado.gen.coroutine
    def get(self):
        admin = yield db.admin.find().count()
        if admin == 0:
            self.render("register.html")
        elif admin == 1:
            self.render("login.html")


# some surprise for hackers...
class BSOD(MainHandler):
    @tornado.gen.coroutine
    def get(self):
        self.render("bsod.html")


# admin space

class Register(MainHandler):
    @tornado.gen.coroutine
    def post(self):
        id = self.get_argument("email")
        pwd = self.get_argument("pass1") # trust the admin, no need for server-side validation
        ps = pbkdf2_sha512.encrypt(pwd, salt_size = 32, rounds = 1000) # put some big rounds here!
        yield db.admin.insert({"_id":id,
                              "pwd":ps
                              })
        self.redirect("/admination")


class Login(MainHandler):
    @tornado.gen.coroutine
    def post(self):
        id = self.get_argument("email")
        pwd = self.get_argument("pass1") # trust the admin, no need for server-side validation
        dbpwd = (yield db.admin.find_one({"_id":id}))["pwd"] # trust the admin, no need to verify!
        print dbpwd
        if pbkdf2_sha512.verify(pwd, dbpwd) == True:
	    self.set_secure_cookie("admin", id)
            self.redirect("/comments")
        else:
            self.write("baaaaad!")
        
        
class Comments(MainHandler):
    @tornado.gen.coroutine
    def get(self):
        cursor = db.message.find()
        comments = yield cursor.to_list(length=None)
        self.render("comments.html", comments = comments)
       
class Auth(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("admin")
        
# let the magic of multiple inheritece ;)
class Comments(MainHandler, Auth):
    @tornado.web.authenticated
    @tornado.gen.coroutine
    def get(self):
        cursor = db.message.find()
        comments = yield cursor.to_list(length=None)
        self.render("comments.html", comments = comments)
        
        
