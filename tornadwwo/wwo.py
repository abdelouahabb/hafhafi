# -*- coding: utf-8 -*-
from tornado.httputil import url_concat
from tornado.httpclient import AsyncHTTPClient
from json import loads
from xml.etree.ElementTree import fromstring

http_client = AsyncHTTPClient()
url = "http://api.worldweatheronline.com/free/v2/weather.ashx?"
api = ""
result = ""


def request(**kwargs):
    '''
    forecast(key="your api key", arguments)
    q = US Zipcode, UK Postcode, Canada Postcode, IP, Lat/Long, city name;
    optional args https://developer.worldweatheronline.com/page/explorer-free:
    format=[json, xml, csv, tab]; extra=[localObsTime, isDayTime, utcDateTime];
    num_of_days=int; date=ISO Date; fx=[yes, no]; cc=[yes, no]; mca=[yes, no];
    fx24=[yes, no]; includelocation=[yes, no]; show_comments=[yes, no];
    tp=[3, 6, 12, 24]; showlocaltime=[yes, no];
    lang=[ar,bn,bg,zh,zh_tw,cs,nl,fi,fr,de,el,
         hi,hu,it,ja,jv,ko,zh_cmn,mr,pl,pt,pa,ro,ru,sr,si,
         sk,es,sv,ta,te,tr,uk,ur,vi,zh_wuu,zh_hsn,zh_yue,zu]
    '''
    global api
    api = url_concat(url, kwargs)
    http_client.fetch(api, handle_request)


def handle_request(response):
    global result
    if response.error:
        result = response.code
    else:
        if response.body.startswith('{'):
            # the result is JSON, use wwo.result to see it
            result = loads(response.body)

        elif response.body.startswith('<'):
            # the result is XML, parse the wwo.result to work on the nodes
            # or, use wwo.response to see the raw result
            result = fromstring(response.body)
    
        elif response.body.startswith('#The CSV'):
            # the result is CSV, check wwo.result to see it
            result = response.body
    
        elif response.body.startswith('#The TAB'):
            # the result is in TAB format
            result = response.body
    
        else:
            print 'Sorry, no valid response!'

        
