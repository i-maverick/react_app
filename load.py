import aiohttp
import asyncio

loop = asyncio.get_event_loop()
client = aiohttp.ClientSession(loop=loop)


async def fetch(url):
    print('fetch', url)
    async with client.get(url) as response:
        if response.status == 200:
            return await response.read()
    return None


def parse_ip(data):
    print('parse_ip')
    return True


def parse_uuid(data):
    print('parse_uuid')
    return True


def parse_user_agent(data):
    print('parse_user_agent')
    return True


def parse_headers(data):
    print('parse_headers')
    return True


async def worker(url, parse):
    print('worker', url)
    data = await fetch(url)
    if data and parse(data):
        return 'success:', url
    return 'error:', url


async def main(workers):
    completed, pending = await asyncio.wait(workers)
    for item in completed:
        print(item.result())


url_ip = 'http://httpbin.org/ip'
url_uuid = 'http://httpbin.org/uuid'
url_user_agent = 'http://httpbin.org/user-agent'
url_headers = 'http://httpbin.org/headers'

workers = [
    worker(url_ip, parse_ip),
    worker(url_uuid, parse_uuid),
    worker(url_user_agent, parse_user_agent),
    worker(url_headers, parse_headers)
]

try:
    loop.run_until_complete(main(workers))
finally:
    loop.stop()
    client.close()
    print('exit')
