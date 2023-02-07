"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Planet, Species, Vehicles, Starships, Films

from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)



################ Characters Routes ################

@api.route('/characters')
def get_characters():
    characters = Character.query.all()
    response_body = list(map(lambda c: c.serialize(), characters))
    return jsonify(response_body)

@api.route('/characters/<int:id>')
def get_character(id):
    character = Character.query.get(id).serialize()
    if character is None:
        return jsonify({"msg":"character not found"}), 404
    return jsonify(character)


################ Planets Routes ################

@api.route('/planets')
def get_planets():
    limit = request.args.get("limit", 10 ,type=int)
    offset = request.args.get("offset", 0 ,type=int)

    planets = Planet.query.offset(offset).limit(limit).all()
    response_body = list(map(lambda p: p.serialize(), planets))
    return jsonify(response_body)

@api.route('/planets/<int:id>')
def get_planet(id):
    planet = Planet.query.get(id).serialize()
    if planet is None:
        return jsonify({"msg":"planet not found"}), 404
    return jsonify(planet), 200

@api.route("/planets", methods=['POST'])
def create_planet():
    name = request.json.get('name')
    gravity = request.json.get('gravity')
    created_by_id = request.json.get("created_by_id")
    new_planet = Planet(name = name, gravity = gravity, created_by_id = created_by_id)
    db.session.add(new_planet)
    db.session.commit()
    return "ok" , 201

@api.route("/planets/<int:id>", methods = ['PATCH'])
def update_planet(id):
    planet = Planet.query.get(id)
    if planet is None:
        return jsonify({"msg":"planet not found"}), 404
    if request.json.get('name') is not None:
        planet.name = request.json.get('name')
    if request.json.get('gravity') is not None:
        planet.gravity = request.json.get("gravity")
    if request.json.get('grcreated_by_idavity') is not None:
        planet.created_by_id = request.json.get("created_by_id")

    db.session.add(planet)
    db.session.commit()

    return jsonify(planet.serialize()), 200

@api.route('/planets/<int:id>', methods=['DELETE'])
def delete_planet(id):
    planet = Planet.query.get(id)
    if planet is None:
        return jsonify({"msg":"planet not found"}), 404
    db.session.delete(planet)
    db.session.commit()
    return jsonify({"msg":"Planet deleted"})

################ Films Routes ################

@api.route('/films/<int:film_id>', methods=['GET'])
def get_film(film_id):
    film = Films.query.get(film_id)
    if not film:
        return jsonify({'msg': 'Film not found'}), 404
    return jsonify(film.serialize())

@api.route('/films')
def get_films():
    limit = request.args.get("limit", 10 ,type=int)
    offset = request.args.get("offset", 0 ,type=int)

    films = Films.query.offset(offset).limit(limit).all()
    return jsonify([film.serialize() for film in films])

################ Starships Routes ################

@api.route('/starships/<int:id>', methods=['GET'])
def get_starship_by_id(id):
    starship = Starships.query.get(id)
    if not starship:
        return jsonify({'msg': 'Starship not found'}), 404
    return jsonify(starship.serialize())

@api.route('/starships')
def get_starships():
    limit = request.args.get("limit", 10 ,type=int)
    offset = request.args.get("offset", 0 ,type=int)

    starships = Starships.query.offset(offset).limit(limit).all()
    return jsonify([starship.serialize() for starship in starships])

################ Vehicles Routes ################

@api.route('/vehicles/<int:id>', methods=['GET'])
def get_vehicle(id):
    vehicle = Vehicles.query.get(id)
    if not vehicle:
        return jsonify({'msg': 'Vehicle not found'}), 404
    return jsonify(vehicle.serialize())

@api.route('/vehicles')
def get_vehicles():
    limit = request.args.get("limit", 10 ,type=int)
    offset = request.args.get("offset", 0 ,type=int)

    vehicles = Vehicles.query.offset(offset).limit(limit).all()
    return jsonify([vehicle.serialize() for vehicle in vehicles])



################ Species Routes ################

@api.route('/species/<int:id>', methods=['GET'])
def get_specie(id):
    species = Species.query.get(id)
    if not species:
        return jsonify({'msg': 'Species not found'}), 404
    return jsonify(species.serialize())

@api.route('/species')
def get_species():
    limit = request.args.get("limit", 10 ,type=int)
    offset = request.args.get("offset", 0 ,type=int)

    species = Species.query.offset(offset).limit(limit).all()
    return jsonify([species.serialize() for species in species])

################ Users Routes ################

@api.route('/users')
def get_users():
    users = User.query.all()
    response_body = list(map(lambda u: u.serialize(), users))
    return jsonify(response_body)

@api.route("/users/favorites")
def get_favorites():
    return 'Favorites', 200

@api.route("/favorite/planet/<int:planet_id>", methods= ["POST"])
def add_favorite_planet():
    '''Add favorite planet'''

@api.route("/favorite/character/<int:planet_id>", methods= ["POST"])
def add_favorite_character():
    '''Add Favorite Character'''

@api.route("/favorite/planet/<int:planet_id>", methods= ["DELETE"])
def delete_favorite_planet():
    '''Delete Favorite Planet'''

@api.route("/favorite/character/<int:planet_id>", methods= ["DELETE"])
def delete_favorite_character():
    '''Delete Favorite Character'''


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200