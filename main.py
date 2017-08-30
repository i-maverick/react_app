from tasks import load_config
import redis

cfg = load_config()
red = redis.StrictRedis(cfg['redis']['host'], cfg['redis']['port'], charset='utf-8', decode_responses=True)

# tanks = [red.hgetall(name=id) for id in red.keys('tanks:*')]
# premium = [t for t in tanks if t['is_premium'] == 'True']
# rus = [t['name_i18n'] for t in premium if t['nation'] == 'ussr']
# print('\n'.join(rus))
