from flask import Flask,escape,request,Response
from urllib.parse import unquote
app = Flask(__name__)

@app.route("/",methods=["GET"])
def write_file():
    resp=Response()
    resp.headers["Access-Control-Allow-Origin"]="*"
    data=unquote(request.query_string.decode("utf-8"))
    file=open("bounties.json","w")
    file.write(data)
    file.close()
    return resp

if __name__=="__main__":
    print("Flask app is online")
    app.run(host="localhost",port="2017")
