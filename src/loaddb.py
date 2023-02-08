from api.models import db, User, Planet, Character, Films, Vehicles, Starships, Species

swapi_url = 'https://www.swapi.tech/api/'

def loading_bar(total_items, items_loaded):
    bar_length = 50
    filled_length = int(bar_length * items_loaded / total_items)
    bar = "=" * filled_length + ">" + " " * (bar_length - filled_length)
    print(f"[{bar}] {100 * items_loaded / total_items:.2f}%", end="\r")
