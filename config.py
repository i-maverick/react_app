import yaml
# import redis


def load_config():
    with open('config.yml', 'r') as stream:
        return yaml.load(stream)

# cfg = load_config()
# red = redis.StrictRedis(cfg['redis']['host'], cfg['redis']['port'], charset='utf-8', decode_responses=True)

# tanks = [red.hgetall(name=id) for id in red.keys('tanks:*')]
# premium = [t for t in tanks if t['is_premium'] == 'True']
# rus = [t['name_i18n'] for t in premium if t['nation'] == 'ussr']
# print('\n'.join(rus))
