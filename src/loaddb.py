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
    
    #################### Lodad Films ############################
    print("LOADING FILMS:")
    response = requests.get("https://www.swapi.tech/api/films/")

    if response.status_code == 200:
        for film in response.json()['result']:
            print('Title:' + film['properties']['title'])
            print('UID:' + film['uid'])
            new_film = Films(
                id = film['uid'], 
                director = film['properties']['director'], 
                episode_id = film['properties']['episode_id'],
                opening_crawl = film['properties']['opening_crawl'],
                producer = film['properties']['producer'],
                title = film['properties']['title']
            )
            db.session.add(new_film)
            db.session.commit()
    else:
        print('Failed to retrieve content')

    element_types = {
        'people': Character,
        'planets': Planet,
        'starships': Starships,
        'vehicles': Vehicles,
        'species' : Species,
    } 

    def load_data(e_type, db_model):
        resp = requests.get(f"https://www.swapi.tech/api/{e_type}/")
        number_of_regitries = resp.json()['total_records']
        print(f"Loading {str(number_of_regitries)} {e_type}")
        resp = requests.get(f"https://www.swapi.tech/api/{e_type}?page=1&limit="+str(number_of_regitries))
        count = 0
        for element in resp.json()['results']:
            count += 1
            loading_bar(number_of_regitries, count)
            element_res = requests.get(element['url'])
            planet = db_model()
            setattr(planet, 'id', element_res.json()['result']['uid'])
            for key, value in element_res.json()['result']['properties'].items():
                setattr(planet, key, value)
            db.session.add(planet)
            db.session.commit()
        print('\n')
        
    for key, val in element_types.items():
        load_data(key, val)
        
                 


