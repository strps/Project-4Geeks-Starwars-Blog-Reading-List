from api.models import db, User, Planet, Character, Films, Vehicles, Starships, Species
from flask import Flask
import requests


app = Flask(__name__)

swapi_url = 'https://www.swapi.tech/api/'

def loading_bar(total_items, items_loaded):
    bar_length = 50
    filled_length = int(bar_length * items_loaded / total_items)
    bar = "=" * filled_length + ">" + " " * (bar_length - filled_length)
    print(f"[{bar}] {100 * items_loaded / total_items:.2f}%", end="\r")

def load_db():
    
    ##################### Lodad Films ############################
    # print("LOADING FILMS:")
    # response = requests.get("https://www.swapi.tech/api/films/")

    # if response.status_code == 200:
    #     for film in response.json()['result']:
    #         print('Title:' + film['properties']['title'])
    #         print('UID:' + film['uid'])
    #         new_film = Films(
    #             id = film['uid'], 
    #             director = film['properties']['director'], 
    #             episode_id = film['properties']['episode_id'],
    #             opening_crawl = film['properties']['opening_crawl'],
    #             producer = film['properties']['producer'],
    #             title = film['properties']['title']
    #         )
    #         db.session.add(new_film)
    #         db.session.commit()
    # else:
    #     print('Failed to retrieve content')

    ######################## Load Planets #########################

    #checks ho many registers are
    response = requests.get("https://www.swapi.tech/api/planets/")
    number_of_regitries = response.json()['total_records']
    print("There are " + str(number_of_regitries) + " planets")

