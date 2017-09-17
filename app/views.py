from flask import render_template
from app import app
import json


@app.route('/')
def index():
    tanks = [app.redis.hgetall(name=id) for id in app.redis.keys('tanks:*')]
    tanks = list(filter(lambda t: not t['name'].endswith('_bot'), tanks))
    items = sorted(tanks, key=lambda t: [int(t['level']), t['nation_i18n']])
    return render_template('index.html', title='Home', tanks=items)


@app.route('/details/<tank_id>')
def details(tank_id):
    tank = app.redis.hgetall(name='tanks:{}'.format(tank_id))
    vehicle = app.redis.hgetall(name='vehicles:{}'.format(tank_id))
    next_tanks_ids = json.loads(vehicle['next_tanks'].replace("'",'"')) if vehicle['next_tanks'] != 'None' else []
    next_tanks = [app.redis.hgetall(name='tanks:{}'.format(id)) for id in next_tanks_ids]
    return render_template('details.html', title='Details', tank=tank, vehicle=vehicle, next_tanks=next_tanks)
