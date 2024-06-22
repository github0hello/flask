#!/usr/bin/python3
# 主要功能：创建1个基本的websocket server, 符合asyncio 开发要求
import asyncio
import websockets
from datetime import datetime

# Set of connected clients
connected_clients = set()

async def handler(websocket, path):
    # Add the client to the connected clients set
    connected_clients.add(websocket)
    try:
        # Keep listening for incoming messages from the client
        async for message in websocket:
            # Broadcast the message to all connected clients
            await broadcast(message)
    finally:
        connected_clients.remove(websocket)

        
async def broadcast(message):
    # Broadcast the message to all connected clients
    for client in connected_clients:
        print(message)
        await client.send(message)

async def main():
    async with websockets.serve(handler, "localhost", 5000):
        await asyncio.Future()  # run forever
        loop = asyncio.get_running_loop() #获取当前event_loop对象
        loop.create_task(broadcast())     # 添加新的异步广播任务

if __name__ == "__main__":
    asyncio.run(main())

