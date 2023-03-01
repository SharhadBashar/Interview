import os
from flask import Flask

app = Flask(__name__)

page = """
<html>
  <body>
    <h1> Hello World!</h1>
    I'm being run from <code>{}</code>.
  </body>
</html>
"""

@app.route("/")
def hello():
  return page.format(os.getcwd())

if __name__ == "__main__":
    app.run()
