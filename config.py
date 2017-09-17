import yaml


def load_config():
    with open('config.yml', 'r') as stream:
        return yaml.load(stream)
