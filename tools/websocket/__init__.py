from . import websocket
class mywebsocket(websocket.websocket):
    def my_processing(self, date):
        return date + '.         hello'
mywebsocket().start()
