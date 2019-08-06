from flask import Flask,escape,request,Response
#from urllib.parse import unquote
from sys import version
if version[0]=="3": from urllib.parse import unquote
else: from urlparse import urlparse
app = Flask(__name__)

@app.route("/",methods=["GET"])
def load_file():
    content="[]"
    try:
        file=open("bounties.json","r")
        content=file.read()
        file.close()
    if len(content)==0: content="[]"
    resp=Response(content)
    resp.headers["Access-Control-Allow-Origin"]="*"
    return resp

@app.route("/write",methods=["GET"])
def write_file():
    resp=Response()
    resp.headers["Access-Control-Allow-Origin"]="*"
    if(version[0]=="3"): data=unquote(request.query_string.decode("utf-8"))
    else: data=urlparse(request.query_string.decode("utf-8")).geturl()
    file=open("bounties.json","w")
    file.write(data)
    file.close()
    return resp

if __name__=="__main__":
    print("Flask app is online")
    app.run(host="localhost",port="2017")
