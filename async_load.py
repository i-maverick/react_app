from config import load_config
import aiohttp
import asyncio
import logging
import redis


async def fetch(url, params):
    print('fetch', url)
    async with session.get(url, params=params) as response:
        if response.status == 200:
            return await response.json()
    return None


async def parse_data(json, type):
    for id in json['data']:
        for key in json['data'][id]:
            await red.hset('{}:{}'.format(type, id), key, json['data'][id][key])


async def parse_info(json, type, account_id):
    account_data = json[str(account_id)]
    for record in account_data:
        id = record['tank_id']
        for key in record:
            await red.hset('{}:{}'.format(type, id), key, record[key])


async def task(type, obj, account_id = None):
    main_url = cfg['wot']['main_url']
    url = '{}/{}/{}/'.format(main_url, type, obj)
    params = {'application_id': cfg['wot']['application_id']}
    if account_id:
        params['account_id'] = cfg['wot']['account_id']

    print('loading:', url)

    json = await fetch(url, params)

    if json:
        if type == 'encyclopedia':
            await parse_data(json, type)
        elif type == 'tanks':
            await parse_info(json, type, account_id)
        elif type == 'ratings':
            await parse_info(json, type, account_id)
        return 'success:', url

    return 'error:', url


async def main():
    tasks = [
        task('encyclopedia', 'tanks'),
        task('encyclopedia', 'vehicles'),
        task('encyclopedia', 'arenas'),
        task('encyclopedia', 'tankengines'),
        task('encyclopedia', 'tankturrets'),
        task('encyclopedia', 'tankradios'),
        task('encyclopedia', 'tankchassis'),
        task('encyclopedia', 'tankguns'),
        task('tanks', 'stats'),
        task('tanks', 'achievements'),
        task('ratings', 'accounts')
    ]

    completed, pending = await asyncio.wait(tasks)
    for item in completed:
        print(item.result())


if __name__ == '__main__':
    cfg = load_config()
    red = redis.StrictRedis(cfg['redis']['host'], cfg['redis']['port'], charset='utf-8', decode_responses=True)

    try:
        red.get(None)
    except (redis.exceptions.ConnectionError, redis.exceptions.BusyLoadingError):
        print('Error: cannot connect to redis')
        exit(-1)

    loop = asyncio.get_event_loop()
    session = aiohttp.ClientSession(loop=loop)

    try:
        loop.run_until_complete(main())
    finally:
        loop.stop()
        session.close()
