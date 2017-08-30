from tasks import load_config
from flask import Flask
import redis

app = Flask(__name__)
app.cfg = load_config()
app.redis = redis.StrictRedis(app.cfg['redis']['host'],
                              app.cfg['redis']['port'],
                              charset='utf-8',
                              decode_responses=True)


from app import views
