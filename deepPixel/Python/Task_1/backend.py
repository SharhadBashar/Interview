'''
My Web application using Flask on Python
'''

from flask import Flask, Response, json, request


app = Flask (__name__)

#A general root page hit point
@app.route("/")
def hello_world():
  return "Hello. This is my flask server built using Python"

#The get method
@app.route("/read", methods = ['GET'])
def getPhrase():
  phrases = {}
  jsonList = []
  with open("storage.txt","r") as file:
    i = 1
    for line in file:
      j = {}
      j["id: " + str(i)] = "phrase: " + line.rstrip("\n")
      i += 1
      jsonList.append(j)
  phrases["phrases"] = jsonList
  js = json.dumps(phrases)
  resp = Response(js, status = 200, mimetype='application/json')
  return resp

#the write method
@app.route("/write", methods = ['POST'])
def writePhrase():
  with open("storage.txt","a") as file:
    requestJson = request.get_json()
    phraseValue = requestJson.get('phrase')
    file.write(phraseValue + "\n")
  counter = lineCounter("storage.txt")

  writeResponse = {}
  writeResponse["id: "] = counter
  js = json.dumps(writeResponse)
  resp = Response(js, status = 200, mimetype='application/json')
  return resp

#The delete method
@app.route("/delete/<lineNumber>", methods = ['DELETE'])
def deletePhrase(lineNumber):
  lineNumber = int(lineNumber)
  counter = 0
  with open("storage.txt","r") as file:
    phrases = []
    for line in file:
      counter += 1
      phrases.append(line.rstrip("\n"))
  if counter > lineNumber:
    del phrases[lineNumber - 1]
    with open("storage.txt","w") as file:
      for line in phrases:
        file.write(line + "\n")

    writeResponse = {}
    writeResponse["success: "] = "true"
  else:
    writeResponse = {}
    writeResponse["success: "] = "false"

  js = json.dumps(writeResponse)
  resp = Response(js, status = 200, mimetype='application/json')
  return resp

#Counts the number of lines
def lineCounter(fileName):
  counter = 0
  with open(fileName,"r") as file:
    for line in file:
      counter += 1
  return counter

app.run(port=8080)




