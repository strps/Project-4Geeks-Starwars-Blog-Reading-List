"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import math
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Planet, Species, Vehicles, Starships, Films, Favorites_Characters, Favorites_Films, Favorites_Planets, Favorites_Species, Favorites_Starships, Favorites_Vehicles, BlockedTokens
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, get_jwt
from api.utils import generate_sitemap, APIException

from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
app = Flask(__name__)
crypto = Bcrypt(app)


################ Home Route ################

@api.route('/')
def get_home():
    '''Get home informations'''
    characters = Character.query.limit(5).all()
    planets = Planet.query.limit(5).all()
    species = Species.query.limit(5).all()
    vehicles = Vehicles.query.limit(5).all()
    starships = Starships.query.limit(5).all()
    films = Films.query.limit(5).all()
    return jsonify({
        'characters': [character.serialize_c() for character in characters],
        'planets': [planet.serialize_c() for planet in planets],
        'species': [species.serialize_c() for species in species],
        'vehicles': [vehicle.serialize_c() for vehicle in vehicles],
        'starships': [starship.serialize_c() for starship in starships],
        'films': [film.serialize_c() for film in films],
    })

################ Characters Routes ################

@api.route('/characters')
def get_characters():
    limit = request.args.get("limit", 10 ,type=int)
    page = request.args.get("page", 1 ,type=int)
    total_characters = Planet.query.count()
    total_pages = math.ceil(total_characters/ limit)
    if page > total_pages:
        return jsonify({'msg':'page not found'}), 404

    characters = Character.query.offset(limit*(page-1)).limit(limit).all()
    response_body = list(map(lambda p: p.serialize_c(), characters))
    return jsonify({
        "total_records": total_characters,
        'total pages': total_pages,
        'results':response_body})

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
    page = request.args.get("page", 1 ,type=int)
    total_planets = Planet.query.count()
    total_pages = math.ceil(total_planets/ limit)
    if page > total_pages:
        return jsonify({'msg':'page not found'}), 404

    planets = Planet.query.offset(limit*(page-1)).limit(limit).all()
    response_body = list(map(lambda p: p.serialize_c(), planets))
    return jsonify({
        "total_records": total_planets,
        'total pages': total_pages,
        'results':response_body})

@api.route('/planets/<int:id>')
def get_planet(id):
    planet = Planet.query.get(id).serialize_c()
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
    return jsonify([film.serialize_c() for film in films])

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
    page = request.args.get("page", 1 ,type=int)
    total_starships = Planet.query.count()
    total_pages = math.ceil(total_starships/ limit)
    if page > total_pages:
        return jsonify({'msg':'page not found'}), 404

    starships = Character.query.offset(limit*(page-1)).limit(limit).all()
    response_body = list(map(lambda p: p.serialize_c(), starships))
    return jsonify({
        "total_records": total_starships,
        'total pages': total_pages,
        'results':response_body})

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
    page = request.args.get("page", 1 ,type=int)
    total_vehicles = Planet.query.count()
    total_pages = math.ceil(total_vehicles/ limit)
    if page > total_pages:
        return jsonify({'msg':'page not found'}), 404

    vehicles = Character.query.offset(limit*(page-1)).limit(limit).all()
    response_body = list(map(lambda p: p.serialize_c(), vehicles))
    return jsonify({
        "total_records": total_vehicles,
        'total pages': total_pages,
        'results':response_body})



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
    page = request.args.get("page", 1 ,type=int)
    total_species = Planet.query.count()
    total_pages = math.ceil(total_species/ limit)
    if page > total_pages:
        return jsonify({'msg':'page not found'}), 404

    species = Character.query.offset(limit*(page-1)).limit(limit).all()
    response_body = list(map(lambda p: p.serialize_c(), species))
    return jsonify({
        "total_records": total_species,
        'total pages': total_pages,
        'results':response_body})

################ Users Routes ################

@api.route('/signup', methods=['POST'])
def new_user():
    print("signing up")
    email = request.json.get('email')
    password = request.json.get('password')
    password = crypto.generate_password_hash(password, 10).decode('utf-8')
    print(email)
    user = User(email=email, password = password, is_active = True)
    db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({'msg':"email already in use"}), 500
    return jsonify({'msg':"user created"}), 200


@api.route('/login', methods = ['POST'])
def login():
    print('login')
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter(User.email == email).first()
    if user is None:
        return jsonify({'msg':"Login fail"}), 401
    if not crypto.check_password_hash(user.password, password):
        return jsonify({'msg':"Login fail"}), 401
    token = create_access_token(identity = user.id)
    refresh_token = create_refresh_token(identity= user.id)
    return jsonify({'accessToken':token, 'refreshToken': refresh_token})

@api.route('/users')
def get_users():
    users = User.query.all()
    response_body = list(map(lambda u: u.serialize(), users))
    return jsonify(response_body)


@api.route("/favorites", methods = ['POST'])
@jwt_required()
def post_favorites():
    user_id = get_jwt_identity()
    element_type = request.json.get('element')
    element_id = request.json.get('id')
    msg = ""
    match element_type:
        case 'character':
            favorite = Favorites_Characters(user_id= user_id, element_id = element_id)
        case 'films':
            favorite = Favorites_Films(user_id= user_id, element_id = element_id)
        case 'species':
            favorite = Favorites_Species(user_id= user_id, element_id = element_id)
        case 'planets':
            favorite = Favorites_Planets(user_id= user_id, element_id = element_id)
        case 'vehicles':
            favorite = Favorites_Vehicles(user_id= user_id, element_id = element_id)
        case 'starships':
            favorite = Favorites_Starships(user_id= user_id, element_id = element_id)
        case _:
            return jsonify({'msg': 'element type not recognised'}), 400

    db.session.add(favorite)
    try:
        db.session.commit()
    except:
        return 'Favorite already in user favorites', 200

    return 'Favorite added', 200

@api.route("/favorites", methods = ['DELETE'])
@jwt_required()
def delete_favorites():
    user_id = get_jwt_identity()
    element_type = request.json.get('element')
    element_id = request.json.get('id')
    msg = ""
    match element_type:
        case 'characters':
            favorite = Favorites_Characters(user_id= user_id, element_id = element_id)
        case 'films':
            favorite = Favorites_Films(user_id= user_id, element_id = element_id)
        case 'species':
            favorite = Favorites_Species(user_id= user_id, element_id = element_id)
        case 'planets':
            favorite = Favorites_Planets(user_id= user_id, element_id = element_id)
        case 'vehicles':
            favorite = Favorites_Vehicles(user_id= user_id, element_id = element_id)
        case 'starships':
            favorite = Favorites_Starships(user_id= user_id, element_id = element_id)
        case _:
            print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            return jsonify({'msg': 'element type not recognised'}), 400
    
    try:
        db.session.add(favorite)
        db.session.commit()
    except:
        return 'Hola', 400
    return 'Favorite added', 200


@api.route("/favorites")
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    #Querying for user favorites
    characters = Favorites_Characters.query.filter(Favorites_Characters.user_id == user_id).all()
    films = Favorites_Films.query.filter(Favorites_Films.user_id == user_id).all()
    species = Favorites_Species.query.filter(Favorites_Species.user_id == user_id).all()
    planets = Favorites_Planets.query.filter(Favorites_Planets.user_id == user_id).all()
    vehicles = Favorites_Vehicles.query.filter(Favorites_Vehicles.user_id == user_id).all()
    starships = Favorites_Starships.query.filter(Favorites_Starships.user_id == user_id).all()

    response = jsonify({
        'characters' : ([character.serialize() for character in characters]),
        'films' : ([film.serialize() for film in films]),
        'species' : ([specie.serialize() for specie in species]),
        'planets' : ([planet.serialize() for planet in planets]),
        'vehicles' : ([vehicle.serialize() for vehicle in vehicles]),
        'starships' : ([starship.serialize() for starship in starships]),}
    )

    return response

@api.route("/refresh")
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    db.session.add(BlockedTokens(token_id = get_jwt()['jti']))
    db.session.commit()
    access_token = create_access_token(identity = identity)
    refresh_token = create_refresh_token(identity = identity)
    return jsonify({'access_token': access_token, 'refresh_token': refresh_token} )


