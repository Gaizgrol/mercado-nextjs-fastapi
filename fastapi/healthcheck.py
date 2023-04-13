import aiohttp
import asyncio

if __name__ != '__main__':
    raise RuntimeError('This script should be run directly from the interpreter!')
    
async def main():
    async with aiohttp.ClientSession() as session:
        async with session.get('http://localhost:8000/healthcheck') as response:
            if response.status != 200:
                raise ConnectionError('Service is not healthy!')

asyncio.run(main())